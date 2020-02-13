## why does we need redux_thunk?

## 1.Problem
일반적인 액션 생성자에서는 비동기 통신을 할 방법이 없습니다.
```js
const asyncLogin = () =>
    axios.get('/api/auth/me')
    .then(res => res.data)
    .then(user => {
        // how do we use thi `user` object
    })

// somewhere in component
sotore.dispatch(asyncLogin()) // nope; `asyncLogin()` is a promsie, not action
```
위 예제에서 보는 것처럼 액션 생성자에서 비동기 로직을 작성하면 액션을 전달할 방법이 없습니다.  
dispatch의 인자로 전달받은 프로미스를 redux가 처리할 방법이 없죠.

## 2. First Thought: Call Async Directly
비동기 핸들러에서 직접 `store.dispatch`를 호출하면 어떨까요?

```js
// in an action creator moudle
import store from '../store'

const simpleLogin = user => ({ type: LOGIN, user })
const asyncLogin = () => 
    axios.get('/api/auth/me')
    .then(res => res.data)
    .then(user => {
        store.dispatch(simpleLogin(user))
    })

// somewhere in component
asyncLogin();
```
괜찮아 보일지 모르겠지만 몇가지 걸리는 것이 있습니다.  


### Con A: Inconsistent API
이렇게 사용하게 되면 상황에 따라 호출해야하는 API가 달라집니다.  
`store.disptach(syncActionCreator())` 혹은 `doSomeAsyncThing()`을 호출하게된 것이죠.  
이렇게 사용하면 안되는 이유가 있습니다.  

1. 후자의 경우 store에 dispatch하는 것이 불명확합니다.  
한 눈에 Redux 액션을 파악할 수 없기 때문에 앱의 데이터 흐름이 불투명해집니다.
2. 이건 유지보수의 문제와 연결됩니다.  
나중에 함수가 비동기에서 동기로 혹은 동기에서 비동기로 수정된 경우 이 함수가 사용된 컴포넌트를 찾아다니며 수정을 해야합니다.  

우리가 원하는건 비동기 액션에서도 `store.dispatch(actionCreator())`를 사용하는 것입니다.  
쉽게말해 일관된 API를 사용해야합니다.


### Con B: Impurity
`asyncLogin`함수는 순수함수가 아닙니다. 사이드 이펙트가 있죠.  
물론 발견하고 결국 해결책을 찾긴 할겁니다.  
하지만 컴포넌트에 있는 사이드 이펙트는 컴포넌트가 더 동작하기 어렵게 만듭니다.  
예를들어 단위 테스트에서 `axios`를 차단하거나 수정해야할 수도 있습니다. 그렇지 않으면 컴포넌트가 네트워크 호출을 수행합니다.  


### Con C: Tight Couping
`asyncLogin` 함수는 `store`의 스코프에 단단히 연결되어 있기 때문에 재활용할 수 없습니다.  
만약 이 액션 생성자를 서버 사이드 렌더링에서 사용하는 것 처럼 2개 이상의 리덕스 스토어에서 사용하거나 
mock처럼 스토어가 없는 곳에서 사용한다면 어떻게 해야할 까요?


### Better: Thunks
네트워크 호출을 만드는 대신에 나중에 실행할 수 있는 함수를 반환합니다.  
```js
// in an action creator moudle
import store from '../store' // still coupled (for now...)

const simpleLogin = user => ({ type: LOGIN, user })

const thunkedLogin = () =>         // action creator
    () =>                          // return a thunk, whick when inked
        axios.get('/api/auth/me')  // performs the actual effect     
        .then(res => res.data)      
        .then(user => {
            store.dispatch(simpleLogin(user))
        })

// somewhere in component
store.dispatch(thunkedLogin())  // dispatches the thunk to the store.

// The thunk는 아직 호출되지 않는다. 
```
thunk를 사용함으로서 단독 API로 돌아왔으며 `thunkedLogin`이 순수함수가 되었습니다.
호출되면 함수가 반환되고 즉각적인 부작용이 발생하지 않습니다

반환되는것이 액션객체가 아니라 thunk함수라는것이 의아할수 있습니다
리덕스는 액션객체만 이해하니깐요. 또 여전히 결합도가 높은것 같구요 

맞습니다 thunk가 동작하기 위해선 몇가지 코드가 더 필요합니다.  
값이 리덕스 스토어에 전달될 때마다 먼저 미들웨어를 통과합니다.



## Redux-thunk Middleware
redux-thunk 미들웨어는 다음처럼 동작합니다
```js
actionOrThunk =>
  typeof actionOrThunk === 'function'
    ? actionOrThunk(dispatch, getState)
    : passAlong(actionOrThunk);
```
- 일반 액션객체가 전달되면 redux-thunk는 그냥 전달합니다
- 함수가 전달되면 함수에  스토어의 `dispatch`와 `getstate`을 전달하여 호출합니다. thunk를 리듀서에 전달하지않습니다

이제 액션 생성자가 객체나 함수를 반환할 수 있습니다.
 thunk가 미들웨어에 의해 실행되면 비동기 로직을 수행합니다.
 비동기로직이 완료되면 콜백 또는 핸들러가 액션을 스토어에 전달할수 있습니다
따라서 thunk는 비동기 핸들러를 사용하여 정상적인 Redux 루프를 일시적으로 "피하도록" 합니다.


## Dependency Injection
thunk를 사용하여 API를 통합하고 액션생성자가 순수하게 유지할수 있다는 것을 알았습니다
그러나 여전히 특정 store를 사용하는 문제가 있습니다.
redux-thunk 미들웨어는 의존성 주입(DI)이라는 한가지 해결책을 줍니다. 
DI는 코드 결합도를 완화하는 방법인데요.  
의존성을 pull in하는 대신에 코드에 의존성이 제공됩니다
이런 역할의 역전은 제어역전보다 일반적인 개념의 예입니다.  

Thunk는 일반적으로 파라미터가 없습니다. 추가 입력없이 수행 준비가된 상태죠.
그러나 react-thunk는 이 규칙을 어기고 `dispatch`와 `getstate`를 전달합니다. 
그러므로 thunked action 생성자의 기본 패턴에선 범위가 한정된 store가 필요없습니다.  
`dispatch`와 `getstate`를 주입하고 있기때문에 store에 직접 접근할 필요가 없습니다.

```js
// in an action creator module:
const simpleLogin = user => ({ type: LOGIN, user })

// Look, no store import!

const thunkedLogin = () =>     // action creator, when invoked…
  dispatch =>                  // …returns thunk; when invoked with `dispatch`…
    axios.get('/api/auth/me')  // …performs the actual effect.
    .then(res => res.data)
    .then(user => {
      dispatch(simpleLogin(user))
    })

// somewhere in component:
store.dispatch(thunkedLogin()) // dispatches the thunk to the store.

// The thunk itself (`dispatch => axios.get…`) has not yet been called.
// When it reaches the middleware, `redux-thunk` will intercept & invoke it,
// passing in the store's `dispatch`.
```

어떻게 이게 동작할까요?  어디서 `dispatch`가 넘어오는 걸까요?  
간단히 말하자면 `redux-thunk`미들웨어는 스토어에 접근할수 있기때문에 store에 있는 disaptch와 getstate를 전달할 수 있습니다 thunk가 실행될 때.  
미들웨어는 thunk로 의존성이 주입되는 것을 책임지고 있습니다.
액션 생성자가 수동으로 store를 탐색할 필요가 없습니다. 그래서 이 액션생성자는 다른 스토어들에 사용될수 있습니다.  



<br>
<br>

#### getState
`getState`가 사용되는 것을 못 봤는데 남용하기 쉽기 때문입니다.  
많은 리덕스 앱에서 새로운 상태값을 결정하기위해 이전 상태값을 사용하는 것은 리듀서에서 하는게 더 적절합니다.  


## Why Thunk Middleware, and not Promise Middleware?  
프로미스들은 자바스크립트에서 표준이되었으며 비동기적 값의 조합가능한 표현입니다.  
`redux-promise-middleware`와 `redux-promise`패키지는 프로미스나 프로미스가 체이닝된 액션 객체를 보낼 수 있습니다.  
둘 다 좋은 기능을 가지고 있고 리덕스에서 비동기를 더 편하게 다룰 수 있습니다.
그러나 둘다 불순물에 대한 문제는 다루지 않습니다.  
프로미스는 이미 초기화된 비동기 액션을 나타냅니다.  


## Native Promises Use
리덕스에서 thunk없이 프로미스를 사용하려면 다음과 같을 것입니다.
```js
// in an action creator module:
import store from '../store'

const simpleLogin = user => ({ type: LOGIN, user })

const promiseLogin = () =>  // action creator…
  axios.get('/api/auth/me') // …returns a promise.
  .then(res => res.data)
  .then(user => {
    store.dispatch(simpleLogin(user))
  })

// somewhere in component:
store.dispatch(promiseLogin()) // Nope, still not good
```
이 예제는 앞서 다뤘던 비동기 직접호출하는 방식과 유사합니다.  `promiseLogin`함수는 결국 성공 핸들러에서 액션을 보냅니다.  
초기화한 프로미스를 스토어에 보내지만 어떻게 미들웨어가 프로미스를 처리 할까요?  
가상의 미들웨어가 프로미스를 처리하게 하고 싶습니다. 가능은 하지만 몇가지 간과한 것들이 있습니다.

- 직접 비동기를 호출하면 컴포넌트와 액션 생성자가 불순해지고 작업과 테스트를 어렵게 만든다
- `promiseLogin`이 여전히 특정 store에 연결되어있다
- 액션 객체와 프로미스 객체를 구분하는게 까다롭다.  



## Smarter Promise Usege
`redux-promise `와 `redux-promise-middleware`는 가상의 `redux-promise-naive`보다 똑똑합니다.  
이 미들웨어를 통해서 프로미스나 액션에 payload.promise를 보내고 프로미스가 이행됐을 때 미들웨어가 보통의 액션을 보내는 것을 할 수 있습니다.  

```js
// with `redux-promise-middleware` active:

const promiseLogin = () => ({
  type: 'LOGIN',
  payload: {
    promise: axios.get('/api/auth/me').then(res => res.data)
  }
})

// somewhere in component:
store.dispatch(promiseLogin());
```

`redux-promise-middleware`는 액션에서 명시적으로 선언된 `payload.promise`를 감지할 것입니다.  
이 라이브러리는 액션이 곧바로 리듀서에 가는 것을 막고 대신 별도의 `LOGIN_PENDING`액션을 보냅니다.  
그리고 프로미스가 처리 될 때까지 기다렸다가 payload로 `LOGIN_FULFILLED`나 `LOGIN_REJECT`를 보냅니다.  
이로서 로딩 스피너나 에러 알람같은 기능 구현이 가능해 졌습니다.  

불행히도 `redux-promise-middleware`는 아직 사이드 이펙트가 있습니다.  
`promiseLogin`는 즉각적인 네트워크 통신을 하는데요. 이건 리덕스 베이스 프로미스의 틀림없는 약점이며, 
컴포넌트들이 다시 불순해졌고 테스트나 재사용을 위해 수정이 필요해졌습니다.

## Thanked Promises
다시 thunk미들웨어가 등장할 차례입니다.  
프로미스 생성을 딜레이 함으로서 laziness of thunk와 `redux-promise-middleware`의 자동화된 액션 발송을 얻습니다.  

```js
const thunkedPromiseLogin = () => // instead of returning an action…
  dispatch =>                     // …returns a thunk, which when invoked…
    dispatch({                    // …dispatches an action…
      type: 'LOGIN',
      payload: {
        promise: axios.get('/api/auth/me').then(r => r.data) // …with an effect.
      }
    })

// somewhere in component:
store.dispatch(thunkedPromiseLogin())
```

여기서 집고 넘어갈것이 있습니다.
꼭 두개의 라이브러리가 필요할까요?
리덕스에서 이펙트를 처리하기 위해서 꼭 특정 코드패턴을 외워야 할까요?  
이 질문에 대답하기전에 프로미스와 thunk에 대해 다뤄봐야할 것이 있습니다.  

## Returning Promises from Thunks
`redux-thunk`를 사용할 때, 전달된 thunk가 프로미스를 반환하면 `dispatch`가 그 프로미스를 반환할 것입니다.  
```js
const thunkedLogin = () => dispatch =>
    axios.get('/api/auth/me')
    .then(res => res.data)
    .then(user => {
      dispatch(simpleLogin(user))
    })

// somewhere in component:
store.dispatch(thunkedLogin())
.then(() => console.log('async from component A fulfilled'))
```
이 패턴은 남용되기 쉽습니다.  
일반적으로 리액트 컴포넌트는 가능한 순수하게 유지되도록 하는데 비동기 핸들러(then)를 추가하는 것은 한걸음 물러나는 느낌입니다.
또 API를 일관되지 않게 만들죠.  

그러나 `dispatch` 호출에서 반환된 프로미스를 사용하는것 좋을 때가있습니다.



## REF
- [thunks-in-redux-the-basics](https://medium.com/fullstack-academy/thunks-in-redux-the-basics-85e538a3fe60)