# redux-saga
![](../resource/img/react/Redux-Saga-Logo-Landscape.png)
## Intro
왜 saga를 써야 할까요?  
saga는 쉽게 말해 쉽게 말해 이벤트 리스너라고 할 수 있습니다.  
액션을 모니터링하다가 액션이 발생하면 액션에 따라 자바스크립트를 실행하거나 다른액션을 디스패치하는 등의 방식으로 동작합니다.  

지금 thunk를 사용하고 있더라도 saga를 써야하는 이유는 충분합니다. 
thunk에서 못했던 작업들이 가능해졌기 때문입니다.  
1. 비동기 작업을 할 때 기존 요청을 취소 처리 할 수 있습니다.
2. 특정액션이 발생 했을때 이에 따라 다른 액션이 디스패치되게끔 하거나 자바스크립트 코드를 실행할 수 잇습니다.
3. 웹소켓을 사용하는 경우 Channel이라는 기능을 사용하여 더욱 효율적으로 코드관리를 할수 있습니다.
4. API 요청을 실패했을 때 재요청하는 작업을 할수 있습니다.
5. 순차적 액션 dispatch
6. Action을 모아서 dispatch하고 싶다.
7. 다른 프레임워크, 라이브러리와 잘 어울리게 하고 싶다
8. 재사용이 가능해진다
9. 더 작은 코드로 분할할 수 있다.
10. 병렬처리
11. 동기적 구조에서 오는 테스트의 용이성

이 장점들을 종합하면 `사이드 이펙트 관리`라는 말로 정리 할 수 있습니다.  
여기서 사이드 이펙트란 순수하지 않은 함수에서 발생하는 예상 밖의 동작을 말하는데 예를 들어 비동기 작업, 브라우저 캐시등이 있습니다.  함수가 일관된 결과를 보장하지 못하거나, 함수 외부 어디든지 조금이라도 영향을 주는 경우 모두 사이드 이펙트를 갖습니다.  
이런 사이드 이펙트에 대한 관리를 redux-saga에 몰아줌으로서 다른 부분들은 순수한 형태로 유지 할 수 있습니다.  
결과적으로 redux-saga도입하면 액션 생성자와 리듀서가 순수 함수 형태로 돌아갑니다.  
Saga의 관심은 오로지 애플리케이션의 변수로 작용 할 여지가 있는 작업(사이드 이팩트)의 관리에 있습니다.
![](../resource/img/react/react-saga-flow.png)


## Redux에서 데이터 처리를 할때 고려할 점
1. 어디서 통신처리를 적을 것인가?
2. 어디로부터 통신처리를 불러올 것인가?
3. 통신처리의 상태를 어떻게 가지게 할 것인가?   
이 중 세번째 항목은 "loding..."메세지를 사용자에게 보여주기 위해 필요한 부분입니다. 
즉 비동기 요청의 상태를 요청,성공,실패 등의 단계로 나누어 redux 상태를 변경해야합니다.  


## redux-thunk의 한계
- action에게 과도한 책임을 준다는 점
- 그 책임으로 인해 action을 나타내는 코드를 이해하기 힘든 상태로 만든다

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





## 용어
1. effect  
이펙트는 사가의 미들웨어가 실행할 명령들을 포함하고 있는 평범한 자바스크립트 객체이다.

2. task  
테스크는 백그라운드에서 실행되는 프로세스와 같다.  
리덕스 사가 기반의 애플리케이션은 여러 테스크들을 병렬로 실행시킬 수 있다. fork 함수를 통해 이러한 테스크들을 생성할 수 있다.

3. non-blocking  
블로킹 호출은 Saga가 이펙트를 yield 하면 실행에 대한 결과를 기다렸다가 제네레이너 내부에서 다음의 명령어의 실행을 재개한다.
논블로킹 호출은 Saga가 이펙트를 yield한 이후 바로 실행을 재개한다는 것을 의미한다.  

4. watcher/worker  
- watcher: 디스패치된(dispatched) 액션을 관찰하고 모든 액션에 대해 워커(worker)를 포크합니다.
- worker: 액션을 처리하고 종료합니다.


## Effect

### Select
state에서 필요한 데이터를 꺼낸다

### Put
액션을 디스패치한다.
```ts
function* writePostSaga (){
  try {
    yield put({
      type: WRITE_POST_REQUEST,
      payload: post
    })
  } catch(e){
    console.error(e.stack)
    yield put({
      type: WRITE_POST_FAILURE,
      payload: e
    })
  }

}

```


### Task
비동기 액션이 dispatch되는 것을 기다린다.
```js
yield take([ADD_CART, REMOVE_CART, CLEAR_CART]);
const cart = yield select(selectCart);
localStorage.setItem('cartCache', JSON.stringify(cart));
```


### call
프로미스 완료를 기다린다


### fork
다른 task를 실헹한다
```js
export function* initDeliveryAt() {
  while (true) {
    yield take(LOAD_AVAILABLE_DATES);
    yield fork(initAvailableDatesFlow);
  }
}
...
​
export function* initAvailableDatesFlow() {
  ...
}

```
### join 
다른 task종료를 기다린다



### Heller Effect

saga에서 지원하는 Helper Effect에 대해서 알아보자.


```js
import { call, put } from 'redux-saga/effects'

export function* fetchData(action) {
   try {
      const data = yield call(Api.fetchUser, action.payload.url)
      yield put({type: "FETCH_SUCCEEDED", data})
   } catch (error) {
      yield put({type: "FETCH_FAILED", error})
   }
}
```


#### taskEvery
모든 액션마다 실행된다

```js
function* takeEvery(pattern, saga, ...args) {
  const task = yield fork(function* () {
    while (true) {
      const action = yield take(pattern)
      yield fork(saga, ...args.concat(action))
    }
  })
  return task
}
```
이 구현체에서 알 수 있듯이 takeEvery는 여려개의 saga가 동시에 fork되게 합니다.


```js
import { takeEvery } from 'redux-saga/effects'

function* watchFetchData() {
  yield takeEvery('FETCH_REQUESTED', fetchData)
}
```

#### taskLatest
액션 호출시에 같은 액션이 실행 중이면 그 액션은 파기되고 마지막 호출만 실행됩니다. POST, PUT, DELETE 같은 리소스 변경 메소드에 사용합니다.
어느 순간에도 단 하나의 태스크만 실행됩니다. 마지막으로 시작된 태스크가 되겠죠. 

```js
function* takeLatest(pattern, saga, ...args) {
  const task = yield fork(function* () {
    let lastTask
    while (true) {
      const action = yield take(pattern)
      if (lastTask)
        yield cancel(lastTask) // cancel is no-op if the task has already terminated

      lastTask = yield fork(saga, ...args.concat(action))
    }
  })
  return task
}
```
`takeLatest`의 구현체를 살펴보겠습니다.  
새로운 액션이 dispatch되면 자신을 제외한 이전 모든 fork된 태스크를 취소합니다.  
따라서 가장 나중의 응답만 받을 수 있습니다.


```js
import { takeLatest } from 'redux-saga/effects'

function* watchFetchData() {
  yield takeLatest('FETCH_REQUESTED', fetchData)
}
```


### all
사가 함수를 동시에 실행한다.
```ts
function* rootSaga() {

    yield console.log('[SYSTEM] rootSaga created')

    yield all([
        fork(baseSaga),
        fork(editorSaga),
        fork(postSaga),
    ])
}
```


## 병렬 이펙트

## Flow
![](../resource/img/react/saga-flow.jpeg)


## Q&A



# ref
- [TDD-saga](https://www.vobour.com/00-redux-saga-)
- [redux-saga-interview](https://survivejs.com/blog/redux-saga-interview/)
- [saga-book-kor](https://mskims.github.io/redux-saga-in-korean/introduction/BeginnerTutorial.html)
- [saga-docs](https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html)
- [Redux-Saga: 사이드 이펙트 관리](https://meetup.toast.com/posts/136)
- [Redux-Saga: 제너레이터와 이펙트](https://meetup.toast.com/posts/140)
- [from-redux-thunk-to-sagas](https://medium.com/@deeepakampolu/from-redux-thunk-to-sagas-2896c0abc676#.ptlov4222)
- [thunk and saga](https://ideveloper2.tistory.com/53)
- [saga](https://react.vlpt.us/redux-middleware/10-redux-saga.html)
- [thunk와 saga비교해봅시다.](https://velog.io/@dongwon2/Redux-Thunk-vs-Redux-Saga%EB%A5%BC-%EB%B9%84%EA%B5%90%ED%95%B4-%EB%B4%85%EC%8B%9C%EB%8B%A4-)
- [deal-with-async-process- by-redux-saga](https://github.com/reactkr/learn-react-in-korean/blob/master/translated/deal-with-async-process-by-redux-saga.md)
- [Managing process in redux using sagas](https://jaysoo.ca/2016/01/03/managing-processes-in-redux-using-sagas/)
- [redux and middleware](https://medium.com/humanscape-tech/redux%EC%99%80-%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4-thunk-saga-43bb012503e4)
- [Managing side effects in react + redux usin sagas](https://jaysoo.ca/2016/01/03/managing-processes-in-redux-using-sagas/)
- [why do we need middleware for async flow in redux](https://stackoverflow.com/questions/34570758/why-do-we-need-middleware-for-async-flow-in-redux/34599594#34599594)
- [TDD wiwh Redux-Saga](https://www.vobour.com/00-redux-saga-)