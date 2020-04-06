# 왜 Redux-Saga를 쓰는가??

## Intro
그동안 thunk를 사용하면서 모든 비동기처리를 해결했고 더이상 새로운 방식을 학습할 필요성을 느끼지 못했을지도 모른다.  
언듯 생각했을때 saga의 철학이 와닿지 않을 수 있다.  
아래 포스팅은 [이 글](https://github.com/reactkr/learn-react-in-korean/blob/master/translated/deal-with-async-process-by-redux-saga.md)의 내용을 개인적으로 매끄럽게 정리한 내용이다.  
주된 내용은 saga로 비동기처리를 하게됐을때 얻게되는 효용성에 대한 구체적인 묘사이다.  




리덕스 사가는 액션에 위임된 책임을 수행하여 action과 리듀에서 발생하는 사이드 이펙트를 제거한다.  
보다 자세한 이해를 위해 같은 동작을 하는 로직을 redux-thunk와 redux-saga로 비교해보자.  

**api.js**
```js
export function user(id) {
  return fetch(`http://localhost:3000/users/${id}`)
    .then(res => res.json())
    .then(payload => ({ payload }))
    .catch(error => ({ error }));
}
```

**actions.js**
```js
export function fetchUser(id) {
  return dispatch => {
    dispatch(requestUser(id));
    API.user(id).then(res => {
      const { payload, error } = res;
      if (payload && !error) {
        dispatch(successUser(payload));
      } else {
        dispatch(failureUser(error));
      }
    });
  };
}
```

위 흐름을 보면 
1. `fetchUser`함수의 반환값을 dispatch 한다.
```js
  dispatch(fetchUser());
```
2. `redux-thunk`는 dispatch로 전달받은 `fetchUser` 반환값을 실행한다.
```js

let fetchUser_result = dispatch => {
    dispatch(requestUser(id));  // (1) REUEQST

    API.user(id).then(res => {  // (2) API Call
      const { payload, error } = res;
      if (payload && !error) {
        dispatch(successUser(payload)); // (3) SUCCESS
      } else {
        dispatch(failureUser(error));   // (4) FAILURE
      }
    })


// redux-thunk에서....
fetchUser_result(dispatch)
```

3. 통신을 요청하기 전에 action을 dispatch한다.  
  - (1)파트
4. API.user함수를 호출해서 통신을 요청한다.  
  - (2)파트
5. 완료되면 SUCCESS_USER 혹은 FAILURE_USER Action을 dispatch한다.


여기서 `fectchUser`은 액션 생성자입니다. 그런데 redux-thunk에서는 액션 객체가 아닌 비동기 로직이 적힌 함수를 반환합니다.  
Action Creator는 Action객체를 생성하는 역할인데 redux-thunk의 구조에서는 비동기로직을 품게 되었습니다.  
이런 구조는 비동기 로직의 복잡도가 증가한 상황에서 상당히 위험할 수 있습니다.  
이제 이런 상황을 redux-saga는 어떻게 해결하는지 알아보겠습니다.   

**sagas.js**
```js
function* handleRequestUser() {
  while (true) {
    const action = yield take(REQUEST_USER);
    const { payload, error } = yield call(API.user, action.payload);
    if (payload && !error) {
      yield put(successUser(payload));
    } else {
      yield put(failureUser(error));
    }
  }
}

export default function* rootSaga() {
  yield fork(handleRequestUser);
}
```
마찬가지로 흐름을 살펴보겠습니다. 
1. `redux-saga`에서 rootSaga Task를 실행시킨다.
2. `fork` Effect로 인해 handleRequestUser Task가 시작된다.
3. `take` Effect로 REQUEST_USER Action이 dispatch되길 기다린다.
4. 컴포넌트에서 REQUEST_USER Action을 dispatch한다.
5. call Effect로 API.user 함수를 불러와서 통신처리의 완료를 기다린다.
6. 통신이 완료된다.
7. put Effect를 사용하여 SUCCESS_USER 혹은 FAILURE_USER Action을 dispatch한다.
8. while 루프에 따라 3번으로 돌아간다.


이 코드에서는 병행으로 동작하는 2개의 Task(rootSaga와 handleRequestUser)가 있습니다.  
Task는 Redux의 Store가 작성 된 후, redux-saga의 Middleware가 기동 될 때 1번만 불러와집니다.  
그리고 fork Effect을 사용하여 redux-saga에게 다른 Task를 기동할 것을 요청합니다.  
앞서 설명한듯이, Task내에는 실제 처리를 행하지 않으므로, fork함수로부터 생성된 것은 단순한 오브젝트입니다. 



```js
console.log(fork(handleRequestUser));

{
  Symbol<IO>: true,
  FORK: {
    context: ...,
    fn: <func>,
    args: [...]
  }
}
```
이 객체는 task의 실행환경인 미들웨어로 넘겨져서 새로운 Task로써 기동시킵니다.  
fork Effect는 지정한 Task의 완료를 기다리지 않습니다. 그러므로 yield는 곧 제어로 돌아옵니다. 
하지만 `rootSaga` Task는 `handleRequestUser` Task의 기동 이외에 할 일이 없습니다. 그때문에 rootSaga Task내에는 fork를 사용하여 기동된 모든 Task가 종료 될 때까지 기다립니다. 이런 실행모델은 연쇄적인 Task의 취소를 구현하기위해 필요합니다.  
이것은 부모 Task, 자식 Task, 손자 Task 3개에서, 부모가 자식을 Fork하고, 자식이 손자를 Fork 할 때 부모 Task를 취소하면 제대로 손자Task까지 취소를 알려주는 편리한 기능입니다. 만약 자식Task의 완료를 의도적으로 기다리고 싶지 않다면 spawn을 사용하여 Task를 기동하면 됩니다.  


`handleRequestUser` Task를 기동시키면 금방 REQUEST_USER Action을 기다리기 위해 take Effect가 불러와집니다.  
take Effect가 요청을 기다리기 때문에 비동기처리를 동기적으로 쓸 수있게 됩니다.  
redux-saga에서는 Generator를 이용해 처리 흐름을 멈춥니다. 이러한 기능 덕분에 싱글 스레드인 javascript로 복수의 Task를 만들어
각각 Action을 기다리거나 통신처리 결과를 기다려도 밀리지 않게 됩니다.  



...
(중략...)
...




### 어떤점이 달라졌나?
1. Action Creator가 순수함수로 돌아갔다.
2. redux-thunk를 쓸때 redux미들웨어중 가장 먼저 와야한다는 제약이 사라졌다.  
-  redux-thunk의 경우 액션을 반환하는 함수를 반환하는데 일반적인 redux구조에서 처럼 action이 dispatch되는것이 아니기 때문에 다른 미들웨어는 이 함수를 처리하지 못한다. 떄문에 가장 첫번째 미들웨어로 thunk가 와야한다.
- 이 제약은 thunk이전에 처리해야하는 미들웨어가 있을시에 걸림돌이 된다.
- redux-saga를 dispatch로 전달하는 데이터를 다시 Action객체로 돌릴 수 있기 때문에 이런 문제가 해결된다.
3. redux-saga는 이후 로직이 복잡해질수록 진가를 발휘한다.  



### 조금더 복잡한 상황을 다뤄봅시다.
아래 예제는 통신결과에 따라 다른 통신처리를 개시하는 예제입니다.  
유저의 정보를 조회한 이후에 유저 정보에 포함된지역명을 사용해서 같은 지역에 살고있는 다른 유저를 검색해서 보여주는 기능에 대한 구현입니다.  


**redux-thunk**
`api.js`
```js
export function searchByLocation(name) {
  return fetch(`http://localhost:3000/users/${id}/following`)
    .then(res => res.json())
    .then(payload => { payload })
    .catch(error => { error });
}
```

**action.js**
```js
export function fetchUser(id) {
  return dispatch => {
    // 유저 정보를 읽어들인다
    dispatch(requestUser(id));
    API.user(id).then(res => {
      const { payload, error } = res;
      if (payload && !error) {
        dispatch(successUser(payload));

        // 체인: 지역명으로 유저를 검색
        dispatch(requestSearchByLocation(id));
        API.searchByLocation(id).then(res => {
          const { payload, error } = res;
          if (payload && !error) {
            dispatch(successSearchByLocation(payload));
          } else {
            dispatch(failureSearchByLocation(error));
          }
        });
      } else {
        dispatch(failureUser(error));
      }
    });
  };
}
```
언뜻보기에도 상당히 장황하고 관리가 수월한 형태는 아닌것같습니다.  
우선 `fetchUser`이라는 ActionCreator에서 사용자를 검색하고 거주지역의 다른 사용자를 검색하는등 부가적인 기능이 많습니다.  
본래의 ActionCreator라는 정의에서 꽤 멀어졌네요.  
미들웨어를 이용해서 리펙토링을 할수 있겠지만(구체적으로 어떻게인지는 모르겠음) redux-thunk의 구조에서는 복잡도가 증가하는 통신 후처리방식과 
일괄적이지 않은 스타일이 생길 가능성이 큽니다.  

이제 이 코드가 redux-saga를 만나면 어떻게 되는지 봅시다.  

`sagas.js`
```js
// 추가
function* handleRequestSearchByLocation() {
  while (true) {
    const action = yield take(SUCCESS_USER);
    const { payload, error } = yield call(API.searchByLocation, action.payload.location);
    if (payload && !error) {
      yield put(successSearchByLocation(payload));
    } else {
      yield put(failureSearchByLocation(error));
    }
  }
}

// 변경없음!
function* handleRequestUser() {
  while (true) {
    const action = yield take(REQUEST_USER);
    const { payload, error } = yield call(API.user, action.payload);
    if (payload && !error) {
      yield put(successUser(payload));
    } else {
      yield put(failureUser(error));
    }
  }
}

export default function* rootSaga() {
  yield fork(handleRequestUser);
  yield fork(handleRequestSearchByLocation); // 추가
}
```
위 로직의 처리흐름은 이렇습니다.  
1. redux-saga의 미들웨어가 rootSaga Task를 기동시킨다.
2. `fork` Effect에 따라 `handleRequestUser`와 `handleRequestSearchByLocation` Task가 기동된다.
3. 각각의 Task에 대해 task Effect로부터 REQUEST_USER와 SUCCESS_USER Action이 dispatch되는 것을 기다린다.  
4. 컴포넌트에서 REQUEST_USER Action을 dispatch한다.
5. call Effect로 API.user함수를 호출해서 통신처리가 끝나길 기다린다.
6. 통신처리가 완료된다.
7. `put` Effect를 사용하여 SUCCESS_USER Action을 dispatch한다.
8. handleRequestSearchByLocation Task가 다시 시작되어, `call` Effect로 API.searchByLocation 함수를 불러와서 통신처리가 끝나길 기다린다.
9. 통신처리가 완료된다.
10. put Effect를 사용하여 SUCCESS_SEARCH_BY_LOCATION Action을 dispath한다. 
11. 각각 Task에서 while 루프가 처음으로 돌아가 task로 Action의 dispatch를 기다린다.  

이제 각각의 Task가 각자 한가지 비동기 작업을 수행하기 때문에 관리가 편리해졌습니다.  
또 비동기 체인을 확장하거나 체인의 순서를 바꾸는일도 쉬워졌습니다. 각 Task가 하나만 집중하고 있으믈 다른일에 영향을 받지 않습니다.  
redux-saga의 구조에서는 Task가 커지기 전에 잘라서 나누는것이 관리에 좋습니다. 


## Set-Up

### redux-saga의 적용
store에 saga미들웨어 추가.

```js
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import rootSaga from './sagas';

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(
      sagaMiddleware
    )
  );
  sagaMiddleware.run(rootSaga);
  return store;
};
```
위 코드에서 미들웨어가 구동되는 시점은 `sagaMiddleware.run(rootSaga)`시점입니다.  
미들웨어를 생성하고 Store가 초기화된 이후에 run메소드를 호출해서 미들웨어를 기동합니다.  


### Store 초기화
`store.js`
```js
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  applyMiddleware(
    sagaMiddleware, logger()
  )
);
sagaMiddleware.run(rootSaga);
export default store;
```


`sagas.js`
```js
export default function* rootSaga() {
  yield fork(loadData);
}
```
초기화시 데이터를 읽어들이는 Task입니다. 

```jsx
import store from './store.js';


const el = document.getElementById('container');
if (el) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
}
```
위 구성에서는 Provider컴포넌트의 마운트여부에 상관ㅇ벗이 store가 초기화되어 Middleware도 초기화됩니다.  
그래서 기동시 데이터를 요청하는 Task의 요청시점이 틀어지게 됩니다.  



## 실전 예제
실제 프로젝트에서 사용되는 몇가지 상황을 다뤄보겠습니다.  


### 1.자동 완성
이 예제는 기존에 작성된 자동완성코드를 좀더 나은방식으로 고쳐나가는 과정을 설명합니다. 


#### 초기구현
**sagas.js**
```js
function* handleRequestSuggests() {
  while (true) {
    const { payload } = yield take(REQUEST_SUGGEST);
    const { data, error } = yield call(API.suggest, payload);
    if (data && !error) {
      yield put(successSuggest({ data }));
    } else {
      yield put(failureSuggest({ error }));
    }
  }
}

export default function* rootSaga() {
  yield fork(handleRequestSuggests);
}
```
이 코드에는 문제가 있습니다.  
통신처리의 완룔르 기다리는 동안 dispatch되는 Action을 흘려보냅니다.


#### 버그수정하기. 
```js
function* runRequestSuggest(text) {
  const { data, error } = yield call(API.suggest, text);
  if (data && !error) {
    yield put(successSuggest({ data }));
  } else {
    yield put(failureSuggest({ error }));
  }
}

function* handleRequestSuggest() {
  while (true) {
    const { payload } = yield take(REQUEST_SUGGEST);
    yield fork(runRequestSuggest, payload);
  }
}

export default function* rootSaga() {
  yield fork(handleRequestSuggest);
}
```
위 문제를 이렇게 해결했습니다.  
Action을 감시하는 Task와 통신을 처리하는 Task로 나누었습니다.  


#### 다른 해결방법
위의 패턴이 빈번하게 등장하기 때문에 redux-saga에서는 taskEvery라는 Effect를 제공합니다.  
이 effect를 사용해서 처리해보겠습니다.  

```js
import { call, put, fork, takeEvery } from 'redux-saga/effects';

function* runRequestSuggest(action) {
  const { data, error } = yield call(API.suggest, action.payload);
  if (data && !error) {
    yield put(successSuggest({ data }));
  } else {
    yield put(failureSuggest({ error }));
  }
}

function* handleRequestSuggest() {
  yield takeEvery(REQUEST_SUGGEST, runRequestSuggest);
}

export default function* rootSaga() {
  yield fork(handleRequestSuggest);
}
```
takeEvery는 지정한 Action의 Dispatch를 기다리고 Action을 인수로써 Task를 기동합니다.  


#### 좀더 나은 구현
이제 버그를 고쳤으니 동작에 대한 시나리오를 정리해봅시다. 

1. 1글자를 입력한다.
2. 바로 리퀘스트를 날리지 않는다.
3. 몇 글자 더 입력한다.
4. 아직 리퀘스트를 보내지 않는다.
5. 아무것도 입력이 없는 상태가 일정시간 지속되면 리퀘스트를 날린다.  

이런 흐름을 지연실행이라고 합니다.  
일정 시간 기다리면서 리퀘스트를 개시하는지연실행 Task를 정의하고 입력이 있을때 마다 그것을 기동하게 됩니다.  
단 기존의 입력이 있었을떄 이미 지연 Task가 그것을 취소하고 새로운 Task를 기동시킬 필요가 있습니다.  
즉 일정시간동안 지연실행 Task를 아무리 많아도 마지막 1개가 실행됩니다.  

```js
import { delay } from 'redux-saga';
import { call, put, fork, take } from 'redux-saga/effects';

function* runRequestSuggest(text) {
  const { data, error } = yield call(API.suggest, text);
  if (data && !error) {
    yield put(successSuggest({ data }));
  } else {
    yield put(failureSuggest({ error }));
  }
}

function forkLater(task, ...args) {
  return fork(function* () {
    yield call(delay, 1000);
    yield fork(task, ...args);
  });
}

function* handleRequestSuggest() {
  let task;
  while (true) {
    const { payload } = yield take(REQUEST_SUGGEST);
    if (task && task.isRunning()) {
      task.cancel();
    }
    task = yield forkLater(runRequestSuggest, payload);
  }
}

export default function* rootSaga() {
  yield fork(handleRequestSuggest);
}
```
주목할 포인트는 2개입니다.  
1. forkLater  
forkLater함수는 fork Effect를 돌려주는 함수입니다. call Effect로 delay함수를 불러와 일정시간을 기다리고 delay가 반환되는 Promise가 resolve되면 제어가 돌아와서 Task를 fork합니다.  
2. handleRequestSuggest  
handleRequestSuggest Task에 실행의 지연실행 Task가 있는 경우 그것을 취소하고나서 기동시키는 부분입니다.


원하는 동작은 구현됐지만 
handleRequestSuggest Task가 Action을 기다리는 리퀘스트를 시작한다라는 역할을 명시적으로 나타나지않아 알아보기 어렵습니다.  
초기의 형태처럼 하고싶은 의도를 직접적으로 전달할 수 있는 코드면 좋을 것같습니다.  
참고를 위해 이전의 handleRequestSuggest의 코드를 첨부합니다. 

```js
// 이전의 형태....

function* handleRequestSuggest() {
  while (true) {
    const { payload } = yield take(REQUEST_SUGGEST);
    yield fork(runRequestSuggest, payload);
  }
}
```


#### 개선하기
이제 좀더 명시적인 형태로 수정할것입니다.  
handleRequestSuggest Task에 흩어진 취소를 처리하는 부분을 분리시킵니다.  
이제 1개의 Task로 처리하는 일을 줄여서 역할을 명확하게 해보겠습니다.  

**saga.js**
```js
function* runRequestSuggest(text) {
  const { data, error } = yield call(API.suggest, text);
  if (data && !error) {
    yield put(successSuggest({ data }));
  } else {
    yield put(failureSuggest({ error }));
  }
}

function createLazily(msec = 1000) {
  let ongoing;
  return function* (task, ...args) {
    if (ongoing && ongoing.isRunning()) {
      ongoing.cancel();
    }
    ongoing = yield fork(function* () {
      yield call(delay, msec);
      yield fork(task, ...args);
    });
  }
}

function* handleRequestSuggest() {
  const lazily = createLazily();
  while (true) {
    const { payload } = yield take(REQUEST_SUGGEST);
    yield fork(lazily, runRequestSuggest, payload);
  }
}

export default function* rootSaga() {
  yield fork(handleRequestSuggest);
}

```
handleRequestSuggest가 Task가 깔끔해진것을 볼수 있습니다.
fork Effect에 `fork(lazily, runRequestSuggest, payload)`를 전달함으로써 지연호출이라는 의도를 보다 명확하게 전달할 수 있습니다.  

아직 고민해볼 문제
- 지연실행이 시작되기까지 아무것도 표시되지 않는문제를 해결한다.
- taskLastest 함수를 써서 다시 쓴다. 



### 2. API요청시 스로틀링.
이 예제는 [이 글](https://github.com/kuy/redux-saga-examples/tree/master/throttle)을 다루고 있습니다.
리스트와 같이 많은 컨텐츠를 한번에 읽어와서 각각 컨텐츠마다 다시 비동기 요청을 보내게 된다면 엄청난 통신비용이 발생합니다.  
또 대량으로 발생하는 Action에 따른 Task의 동시실행 가능한 수 이상ㅇ은 시작하지 않고 기다리게 만들어서 앞선 Task가 완료되면 순서대로 다음 Task를 실행시키는 큐가 피요할떄가 있습니다.  
이번 에제는 기동중인 Task의 수를 조절하는 스로틀링을 redux-saga로 구현합니다.  

**saga.js**
```js
const newId = (() => {
  let n = 0;
  return () => n++;
})();

function something() {
  return new Promise(resolve => {
    const duration = 1000 + Math.floor(Math.random() * 1500);
    setTimeout(() => {
      resolve({ data: duration });
    }, duration);
  });
}

function* runSomething(text) {
  const { data, error } = yield call(something);
  if (data && !error) {
    yield put(successSomething({ data }));
  } else {
    yield put(failureSomething({ error }));
  }
}

function* withThrottle(job, ...args) {
  const id = newId();
  yield put(newJob({ id, status: 'pending', job, args }));
}


function* handleThrottle() {
  while (true) {
    yield take([NEW_JOB, RUN_JOB, SUCCESS_JOB, FAILURE_JOB, INCREMENT_LIMIT]);
    while (true) {
      const jobs = yield select(throttleSelector.pending);
      if (jobs.length === 0) {
        break; // No pending jobs
      }

      const limit = yield select(throttleSelector.limit);
      const num = yield select(throttleSelector.numOfRunning);
      if (limit <= num) {
        break; // No rooms to run job
      }

      const job = jobs[0];
      const task = yield fork(function* () {
        yield call(job.job, ...job.args);
        yield put(successJob({ id: job.id }));
      });
      yield put(runJob({ id: job.id, task }));
    }
  }
}

function* handleRequestSomething() {
  while (true) {
    yield take(REQUEST_SOMETHING);
    yield fork(withThrottle, runSomething);
  }
}

export default function* rootSaga() {
  yield fork(handleRequestSomething);
  yield fork(handleThrottle);
}
```
자동완성 예제에서는 1개의 Task만 동시에 실행시키고 새로운 Task가 오면 처리중인 Task를 취소하고 기동했습니다.  
이미 Task가 기동중인지 아닌지 판정하기 위해서 상태를 가질 필요가 있었고 그것을 클로져 내에서 다루게 하는 방식이었습니다.  

스로틀링으로도 실행중인 Task를 파알할 필요가 있기 떄문에 무엇인가의 상태를 기다릴 필요가 있는 점은 같습니다.  
하지만 이번엔 다른 접근방식으로 상태를 Task 내부에서 가리지 않고 store에다 넣어둡니다. 이렇게하면 실행상태가 뷰에서 실시간 표시가 가능합니다.  


**reducer.js**
```js
import { combineReducers } from 'redux';
import {
  NEW_JOB, RUN_JOB, SUCCESS_JOB, FAILURE_JOB,
  TOGGLE_PRODUCER, INCREMENT_LIMIT, DECREMENT_LIMIT
} from './actions';
import * as throttleSelector from './selectors/throttle';

const initial = {
  app: {
    producer: true
  },
  throttle: {
    jobs: [],
    limit: 3
  },
};

function swapJob(list, newJob) {
  let pos = list.findIndex(job => job.id === newJob.id);
  return [ ...list.slice(0, pos), newJob, ...list.slice(pos + 1) ];
}

const handlers = {
  app: {
    [TOGGLE_PRODUCER]: state => {
      return { ...state, producer: !state.producer };
    },
  },
  throttle: {
    [NEW_JOB]: (state, action) => {
      return { ...state, jobs: [ ...state.jobs, action.payload ] };
    },
    [RUN_JOB]: (state, action) => {
      const job = throttleSelector.job(action.payload.id)({ throttle: state });
      const newJob = { ...job, status: 'running' };
      return { ...state, jobs: swapJob(state.jobs, newJob) };
    },
    [SUCCESS_JOB]: (state, action) => {
      const job = throttleSelector.job(action.payload.id)({ throttle: state });
      const newJob = { ...job, status: 'success' };
      return { ...state, jobs: swapJob(state.jobs, newJob) };
    },
    [FAILURE_JOB]: (state, action) => {
      const job = throttleSelector.job(action.payload.id)({ throttle: state });
      const newJob = { ...job, status: 'failure' };
      return { ...state, jobs: swapJob(state.jobs, newJob) };
    },
    [INCREMENT_LIMIT]: state => {
      return { ...state, limit: state.limit + 1 };
    },
    [DECREMENT_LIMIT]: state => {
      if (0 < state.limit) {
        return { ...state, limit: state.limit - 1 };
      } else {
        return state;
      }
    }
  }
};

function throttle(state = initial.throttle, action) {
  const handler = handlers.throttle[action.type];
  if (!handler) { return state; }
  return handler(state, action);
}

function app(state = initial.app, action) {
  const handler = handlers.app[action.type];
  if (!handler) { return state; }
  return handler(state, action);
}

export default combineReducers(
  { app, throttle }
);

```

**2개의 Task**  
구현을 크게 나누면 Task, handleRequestSomething과 handleTrottle로 나뉩니다.  
1. handleRequestSomething  
handleRequestSomething은 REQUEST_SOMETHING Action의 dispatch를 감시하여 실행해야할 Task만을 보내줍니다. 
2. handleTrottle
handleRequestSomething Task로 부터 실행 요청된 Task를 일단 큐에 넣어두고, 동시 실행 수를 조정하면서 처리해갑니다.  
스로틀링이 없는 실행 fork(runSomethin)과 스로틸링이 있는 실행 fork(withTrottle, runSomething)에선 코드의 차이가 조금만 있도록 만들었습니다.  

**2중 while루프**  
handleTrottle Task를 보면 조금 낯설은 2중 while루플가 있습니다. 첫번째 루프는 익숙한 패턴입니다.  
2번쨰 루프는 실행가능한 job의 수에 여유가 있는한 job의 실행을 시작하기 위한 것입니다.  
코드 가독성을 위해 while루프를 만들었지만 실행가능한 job의 수와 대기 상태의 job을 만들어 한번에 실행해도 됩니다.  



### 3. 인증정차(세션유지) 
인증처리하는 로직을 다뤄보겠습니다.  
예제의 시나리오는 이렇습니다.  
1. 로그인
2. 인증
3. 성공하면 화면 전환 실패하면 이유 표시
4. 로그아웃하면 다시 대기 상태로 돌아감

이런 처리를 서버사이드에서 구현하면 쿠키같은 토큰을 가지고 날아온 리퀘스트가 어떤 유저로부터 온 것인지를 식별할 필요가 있습니다.  
즉 처리 자체는 리퀘스트 단위로되어 토막난 상태입니다. 그것을 사가의 task가 일시정지시키는게 가능하다는 특징을 살려서 인증 라이프사이클 전체를 1개의 Task가 관리하도록 만들어 볼것입니다.  
한마디로 세션유지에 Task를 쓰는 방식입니다.  


**sagas.js**
```js
import { push } from 'react-router-redux';

function* authSaga() {
  while (true) {
    // 로그인 할 때 까지 기다린다.
    const { user, pass } = yield take(REQUEST_LOGIN);

    // 인증처리 요청 (여기선 try-catch를 쓰지않고, 리턴 값에 에러정보가 포함되는 스타일）
    const { token, error } = yield call(authorize, user, pass);
    if (!token && error) {
      yield put({ type: FAILURE_LOGIN, payload: error });
      continue; // 인증에 실패하면 재시도와 함께 처음으로 돌아갑니다.
    }

    // 로그인 성공의 처리 (토큰 유지 등)
    yield put({ type: SUCCESS_LOGIN, payload: token });

    // 로그아웃 할 때까지 기다린다.
    yield take(REQUEST_LOGOUT);

    // 로그아웃 처리 (토큰 정리등)
    yield call(SUCCESS_LOGOUT);
  }
}

function* pageSaga() {
  while (true) {
    // 로그인에 성공할 때까지 기다린다.
    yield take(SUCCESS_LOGIN);

    // 대시보드로 이동한다.
    yield put(push('/dashboard'));
  }
}
```  
해야하는 일은 인정처리의 라이프사이클을 관리하는것과 로그인 성공시 페이지를 이동하는 것입니다.  
1개의 Task로 구현이 가능하지만 역할별로 Task를 나눠서 authSaga와 pageSaga로 정의했습니다.  

지금까지의 예제에서는 필요에 따라 Task내부에 외부의 상태를 가지고 있었습니다. 
이번 에제는 인증처리 라이프사이클이 어디까지 되어있나를 상태로 가지는 것을 적극적으로 활용합니다.  
1개의 처리는 1개의 Task가 항상 붙어있게 되는데 redux-saga가 제공하는 Task 실행환경 덕분입니다.  

**고민할문제**  
- 복수의 세션 유지는 어떻게 할까?


## 결론
redux-saga를 사용하면 redux-thunk보다 구조화된 코드로 비동기 처리를 task라는 실행단위로 기술하는것이 가능해집니다.  
Mock을 써야하는 테스트가 줄고 테스트하고 싶은 로직에 집중할 수 있습니다.  
하지만 모든 미들웨어를 redux-saga로 바꾸는것은 불가능합니다.  



## REF 
- [비동기사용의 고공분투](https://github.com/reactkr/learn-react-in-korean/blob/master/translated/deal-with-async-process-by-redux-saga.md)