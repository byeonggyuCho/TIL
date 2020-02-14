# Middleware

## Info

![](../resource/img/react/redux-middleware.png)
미들웨어는 액션이 디스패치되어서 리듀서에서 이를 처리하기전에 사전에 지정된 작업을 설정합니다.  
미들웨어를 액션과 리듀서 사이에 실행되는 프로그램이라 생각하시면 되겠습니다.  

미들웨어가 하는 일은 보통 전달받은 액션을 콘솔에 기록할 수도 있고 전달받은 액션에 기반하여 액션을 아예 취소 시켜버리거나 
다른 종류의 액션들을 추가적으로 디스패치할 수도 있습니다.
이제부터 미들웨어를 이해하기위해 간단하게 로그를 찍는 미들웨어를 만들어보겠습니다.

```js
const loggerMiddleware = store => next => action => {
    /* 미들웨어 내용 */
}
```
여기서 `next`는 dispath와 비슷한 역할을 합니다. 차이점은 `next(ation)`을 했을 때에는 바로 리듀서로 넘기거나, 혹은 미들웨어가 더 있다면 다음 미들웨어 처리가 되도록 진행됩니다. 하지만 `dispatch`의 경우 처음부터 다시 액션이 디스패치되는 것이기 때문에 현재 미들웨어를 다시 한번 처리하게 됩니다.  
![](../resource/img/react/next-vs-dispatch.png)


## 미들웨어 이해하기

```js
const loggerMiddleware = store => next => action => {
    /* 미들웨어 내용 */
}
```
최종적으로 이런식으로 구현되는 미들웨어의 구조를 이해하기 위해서 커스텀 미들웨어를 만들어보며 설명하겠습니다.  
예에서 만들 미들웨어는   리덕스의 상태값이 변할때 기록을 남기는 기능을 가진 로그미들웨어입니다.  

    단 이 예제에서 store에 대한 접근은 명시적으로 전달된 상황을 가정합니다.

### step1: 직접 로깅하기

todo 앱에 이런 디패치가 있다고 가정해 봅시다
```js
store.dispatch(addTodo('Use Redux'));
```
1차원적인 접근 방식으로 이렇게 사용할지 모릅니다.

```js
let action = addTodo('Use Redux');

console.log('dispatching', action);
store.dispatch(action);
console.log('next state', store.getState());
```

### step2: 함수로 감싸기
step1에서 약간 발전한 모습입니다

```js
function dispatchAndLog(store, action) {
  console.log('dispatching', action);
  store.dispatch(action);
  console.log('next state', store.getState());
}
```
이제 각 컴포넌트에서 `store.dispatch`대신 이렇세 사용할 수 있습니다.
```js
dispatchAndLog(store, addTodo('Use Redux'));
```
물론 아직 권장할만한 모습은 아닙니다.


### step3: 몽키패치하기
api을 `store.dispatch`로 통일하기 위해 dispatch 함수를 오버라이딩 했습니다.
```js
let next = store.dispatch;
store.dispatch = function dispatchAndLog(action) {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
};

```

### step4: 다중 기능 추가
몽키 패칭을 통해서 로깅을 하는 함수(dispatchAndLog)를 덮어씌워서 기능을 추가했습니다.  
이제 통일된 API로 호출할 수 있겠네요!  

여거서 로그 기능을 추가한 것처럼 다른 기능을 또 추가하려면 어떻게 해야할까요?  
dispatch과정에서 에러가 났을때 서버에 리포팅을 하는 기능을 추가해보겠습니다.  
그리고 step4의 주제에 맞추어 로깅과 에러 보고 기능을 각각의 독립된 모듈로 분리해서 작성하겠습니다.

```js
function patchStoreToAddLogging(store) {
  let next = store.dispatch;
  store.dispatch = function dispatchAndLog(action) {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
  };
}

function patchStoreToAddCrashReporting(store) {
  let next = store.dispatch;
  store.dispatch = function dispatchAndReportErrors(action) {
    try {
      return next(action);
    } catch (err) {
      console.error('Caught an exception!', err);
      Raven.captureException(err, {
        extra: {
          action,
          state: store.getState()
        }
      });
      throw err;
    }
  };
}
```
이 함수들을 보면 각각 `store.dispatch`를 오버라이딩하며 기능을 추가하고 있음을 알 수 있습니다.  
```js
patchStoreToAddLogging(store);
patchStoreToAddCrashReporting(store);
```
이렇게 두 개의 함수를 호출하면 로깅과 에러보고 기능이 추가 됩니다.  


### step5: 몽키패칭 숨기기  
지금까지는 `store.dispatch`를 몽키패칭하여 새로운 기능을 추가했습니다.  
함수에서 직접 오버라이딩하는 대신에 기능이 추가된 새로운 dispatch를 반환하면 어떨까요?  
```js
function logger(store) {
  let next = store.dispatch;

  return function dispatchAndLog(action) {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
  };
}
```
이렇게 새로운 함수(dispatchAndLog)를 반환하도록 수정했습니다  
```js
store.dispatch = logger(store)
store.dispatch = crashReporter(store)
```
이제 이런 식으로 사용될텐데 좀 더 쉽게 적용하기 위해 새로운 함수를 만들었습니다.  


```js
function applyMiddlewareByMonkeypatching(store, middlewares) {
  middlewares = middlewares.slice();
  middlewares.reverse();

  // 각각의 미들웨어로 디스패치 함수를 변환합니다.
  middlewares.forEach(middleware =>
    store.dispatch = middleware(store)
  );
}
```
`applyMiddlewareByMonkeypatching`에서 forEach를 순회하며 몽키패칭을 하고 있습니다  
실제로 `react-redux`에는 비슷한 가능을 하는 함수를 제공합니다.  
이제 이렇게 사용하면 됩니다

```js
applyMiddlewareByMonkeypatching(store, [logger, crashReporter]);
```


### step6: 몽키패칭 제거하기
지금까지 왜 몽키패칭이 필요했는지 생각해볼 시점입니다.  
왜냐면 그래야 다른 미들웨어에서 기능을 덫붙일 수 있기때문이었죠  
```js
    crashReporter(logger(dispatch))
```

다시 앞서 다뤘던 logger함수를 보겠습니다.  
여기서 중요한것은 `store.dispatch`를 직접 접근한다는 것인데요.
```js
function logger(store) {
  // 반드시 앞의 미들웨어에 의해 반환된 함수를 가리켜야 합니다:
  let next = store.dispatch;

  return function dispatchAndLog(action) {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
  };
}
```

위 코드를 추상화를 통해서 몽키패킹을 제거 할 수 있습니다.  
쉽게말해 직접 `store.dispatch`에 접근 하는 대신 인수로 전달받아 주입받는 것입니다.  

```js
function logger(store) {
  return function wrapDispatchToAddLogging(next) {
    return function dispatchAndLog(action) {
      console.log('dispatching', action);
      let result = next(action);
      console.log('next state', store.getState());
      return result;
    };
  }
}
```
위 코드를 ES6문법으로 정리하면 아래와 같습니다.  

```js 
const logger = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
};

const crashReporter = store => next => action => {
  try {
    return next(action);
  } catch (err) {
    console.error('Caught an exception!', err);
    Raven.captureException(err, {
      extra: {
        action,
        state: store.getState()
      }
    });
    throw err;
  }
}
```
이게 Redux 미들웨어의 최종적인 모양입니다.  
이제 미들웨어들은 next로 전달된 함수에 기능을 부여합니다.  


## step7: 미들웨어 적용하기  

이제 미들웨어를 적용하는 함수(applyMiddlewareByMonkeypatching)를 수정해야합니다.  
`applyMiddleware(store,[logger,crashReporter])`를 적용하면 미들웨어가 적용된 store가 반환됩니다.

```js
function applyMiddleware(store, middlewares) {
  middlewares = middlewares.slice();
  middlewares.reverse();

  let dispatch = store.dispatch;
  middlewares.forEach(middleware =>
    dispatch = middleware(store)(dispatch)
  );

  return Object.assign({}, store, { dispatch });
}

```  

위 applyMiddleware는 `react-redux`의 함수와 다른 부분이 있습니다.  
- store API의 일부만을 미들웨어에 노출합니다: dispatch(action) 와 getState()
- 미들웨어 안에서 next(action)대신 store.dispatch(action)를 호출할 경우 액션이 현재 미들웨어를 포함한 전체 미들웨어 체인을 다시 따라가도록 꼼수를 써뒀습니다.
- 여러분이 미들웨어를 한번만 적용하도록 하기 위해, store 자체보다는 createStore()상에서 작동합니다. 그래서 용법은 (store, middlewares) => store 대신 (...middlewares) => (createStore) => createStore입니다.

## 최종
```js
const logger = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
};

const crashReporter = store => next => action => {
  try {
    return next(action);
  } catch (err) {
    console.error('Caught an exception!', err);
    Raven.captureException(err, {
      extra: {
        action,
        state: store.getState()
      }
    });
    throw err;
  }
}
```


```js
import { createStore, combineReducers, applyMiddleware } from 'redux';

// applyMiddleware 는 createStore()를 받아서 
// 호환되는 API를 가진 함수를 반환합니다.
let createStoreWithMiddleware = applyMiddleware(logger, crashReporter)(createStore);

// 이것을 createStore()처럼 사용하면 됩니다.
let todoApp = combineReducers(reducers);
let store = createStoreWithMiddleware(todoApp);
```
```js
// 흐름이 logger와 crashRepoter 미들웨어 둘 다 지나가게 됩니다!
store.dispatch(addTodo('Use Redux'));
```



## Ref
- [리덕스 미들웨어-veloper](https://velopert.com/3401)
- [미들웨어-redux korea](https://lunit.gitbook.io/redux-in-korean/advanced/middleware)
- [redux-middleware](https://react.vlpt.us/redux-middleware/)