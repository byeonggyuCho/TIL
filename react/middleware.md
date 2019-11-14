# Middleware

## Info

![](../resource/img/react/redux-middleware.png)
미들웨어는 액션이 디스패치되어서 리듀서에서 이를 처리하기전에 사전에 지정된 작업을 설정하빈다. 미들웨어를 액션과 리듀서 사이에 실행되는 프로그램이라 생각하시면 되겠습니다.  

미들웨어가 하는일은 보통 전달받은 액션을 콘솔에 기록할 수도 있고 전달받은 액션에 기반하여 액션을 아예 취소시켜버리거나 다른 종류의 액션들을 추가적으로 디스패치할 수도 있습니다.
이제부터 미들웨어를 이해하기위해 간단하게 로그를 찍는 미들웨어를 만들어보겠습니다.

```js
const loggerMiddleware = store => next => action => {
    /* 미들웨어 내용 */
}
```
여기서 `next`는 dispath와 비슷한 역할을 합니다. 차이점은 `next(ation)`을 했을 떄에는 바로 리듀서로 넘기거나, 혹은 미들웨어가 더 있다면 다음 미들웨어 처리가 되도록 진행됩니다. 하지만 `dispatch`의 경우 처음부터 다시 액션이 디스패치되는 것이기 떄문에 현재 미들웨어를 다시 한번 처리하게 됩니다.

![](../resource/img/react/next-vs-dispatch.png)


```js
const loggerMiddleware = store => next => action => {
    // 현재 스토어 상태값 기록
    console.log('현재 상태', store.getState());
    // 액션 기록
    console.log('액션', action);

    // 액션을 다음 미들웨어, 혹은 리듀서로 넘김
    const result = next(action);

    // 액션 처리 후의 스토어 상태 기록
    console.log('다음 상태', store.getState());
    console.log('\n'); // 기록 구분을 위한 비어있는 줄 프린트

    return result; // 여기서 반환하는 값은 store.dispatch(ACTION_TYPE) 했을때의 결과로 설정됩니다
}

export default loggerMiddleware; // 불러와서 사용 할 수 있도록 내보내줍니다.
```


그럼 이제 미들웨어를 적용해봅시다. 미들웨어는 store를 생성을 합니다. redux 모듈 안에 들어있는 `applyMiddleware`를 사용하여 설정할 수 있습니다.

```js
import { createStore, applyMiddleware } from 'redux';
import modules from './modules';
import loggerMiddleware from './lib/loggerMiddleware';

// 미들웨어가 여러개인경우에는 파라미터로 여러개를 전달해주면 됩니다. 예: applyMiddleware(a,b,c)
// 미들웨어의 순서는 여기서 전달한 파라미터의 순서대로 지정됩니다.
const store = createStore(modules, applyMiddleware(loggerMiddleware))

export default store;
```

미들웨어를 사용하면 액션의 정보에 따라 skip할 수 있고 액션의 정보를 가로채서 수정 한 다음 리듀서로 전달시켜 줄 수 있습니다. 미들웨어는 특히 비동기 작업을 처리할 때 유용합니다.


## 비동기 작업을 처리하기 위한 미들웨어
 redux-thunk, redux-promise-middleware, redux-pender에 대해 다뤄보겠습니다.

 ### 2-1 redux-thunk
 `redux-thunk`는 뭘하는 미들웨어일까요? 이 미들웨어는 객체 대신 함수를 생성하는 액션 생성함수를 작성 할 수 있게 해줍니다. 
일반 액션 생성자는 다음과 같이 파라미터를 가지고 액션 객체를 생성하는 작업만 합니다.
```js
const actionCreator = (payload) => ({action: 'ACTION', payload});
```
만약 특정 액션이 몇초뒤에 실행되게 하거나, 현재 상태에 따라 아예 액션이 무시되어야할 때 `redux-thunk`를 사용하면 됩니다.


몇초 뒤에 실행하는 미들웨어
```js
const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

function incrementAsync() {
  return dispatch => { // dispatch 를 파라미터로 가지는 함수를 리턴합니다.
    setTimeout(() => {
      // 1 초뒤 dispatch 합니다
      dispatch(increment());
    }, 1000);
  };
}
```


이번엔 조건에 따라 액션을 디스패치하거나 무시하는 코드입니다.
```js
function incrementIfOdd() {
  return (dispatch, getState) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}
```
`incrementIfOdd`처럼 반환되는 함수의 파라미터로 `dispatch`, `getState`를 받게 하면 스토어 상태에 접근하여 상태값에 따라 `dispatch`될 지 정할 수 있습니다.  

이때 `dispatch`와 `getState`는 redux-thunk미들웨어에서 전달받은 액션이 함수 형태일 떄, 그 함수에 `dispath`와 `getState`를 넣어 실행해줍니다. 다음은 react-thunk의 코드입니다.


```js

function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;
export default thunk;
```


### 카운터를 비동기적으로 만들어보기.

#### counter.js
```js
import { handleActions, createAction } from 'redux-actions';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);


export const incrementAsync = () => dispatch => {
    // 1초 뒤 액션 디스패치
    setTimeout(
        () => { dispatch(increment()) },
        1000
    );
}

export const decrementAsync = () => dispatch => {
    // 1초 뒤 액션 디스패치
    setTimeout(
        () => { dispatch(decrement()) },
        1000
    );
}

export default handleActions({
    [INCREMENT]: (state, action) => state + 1,
    [DECREMENT]: (state, action) => state - 1
}, 0);
```

#### App.js
```js
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as counterActions from './modules/counter';


class App extends Component {
    render() {
        const { CounterActions, number } = this.props;

        return (
            <div>
                <h1>{number}</h1>
                <button onClick={CounterActions.incrementAsync}>+</button>
                <button onClick={CounterActions.decrementAsync}>-</button>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        number: state.counter
    }),
    (dispatch) => ({
        CounterActions: bindActionCreators(counterActions, dispatch)
    })
)(App);
```


### 웹 요청 처리하기.
redux-thunk를 사용하여 웹 요청을 해보겠습니다. 

#### post.js
```js
import { handleActions } from 'redux-actions';

import axios from 'axios';

function getPostAPI(postId) {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
}

const GET_POST_PENDING = 'GET_POST_PENDING';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_FAILURE = 'GET_POST_FAILURE';

export const getPost = (postId) => dispatch => {
    // 먼저, 요청이 시작했다는것을 알립니다
    dispatch({type: GET_POST_PENDING});

    // 요청을 시작합니다
    // 여기서 만든 promise 를 return 해줘야, 나중에 컴포넌트에서 호출 할 때 getPost().then(...) 을 할 수 있습니다
    return getPostAPI(postId).then(
        (response) => {
            // 요청이 성공했을경우, 서버 응답내용을 payload 로 설정하여 GET_POST_SUCCESS 액션을 디스패치합니다.
            dispatch({
                type: GET_POST_SUCCESS,
                payload: response
            })
        }
    ).catch(error => {
        // 에러가 발생했을 경우, 에로 내용을 payload 로 설정하여 GET_POST_FAILURE 액션을 디스패치합니다.
        dispatch({
            type: GET_POST_FAILURE,
            payload: error
        });
    })

}

const initialState = {
    pending: false,
    error: false,
    data: {
        title: '',
        body: ''
    }
}

export default handleActions({
    [GET_POST_PENDING]: (state, action) => {
        return {
            ...state,
            pending: true,
            error: false
        };
    },
    [GET_POST_SUCCESS]: (state, action) => {
        const { title, body } = action.payload.data;

        return {
            ...state,
            pending: false,
            data: {
                title, body
            }
        };
    },
    [GET_POST_FAILURE]: (state, action) => {
        return {
            ...state,
            pending: false,
            error: true
        }
    }
}, initialState);
```




## Ref
- [리덕스 미들웨어](https://velopert.com/3401)