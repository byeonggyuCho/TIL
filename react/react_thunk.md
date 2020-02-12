# redux-thunk

## Intro

    이 문서는 redux-thunk공식문서의 예제를 다루고 있으며 필요한 부분을 부분적으로 보강했음을 알립니다.

기본적인 redux store에서는 간단한 동기적 작업만 할 수 있었습니다.  
react-thunk는 스토어의 기능을 확장시키며 비동기로직을 가능하게 합니다.  
스토어 접근이 필요한 복잡한 동기로직, ajax같은 간단한 비동기 로직등 thunk는 리덕스 사이드 이펙트를 위해 추천되는 미들웨어입니다.  
혹 Reducer에서 dispatch를 하면 안될까? 하는 생각을 할 순있지만 이것은 권장되는 패턴이 아닙니다. reducer에서는 상태값 변경이라는 목적만 이행해야합니다.  

thunk를 통한 이점을 다음과 같습니다.  
- dispatch를 연기할 수 있습니다.
- 동기와 비동기로직을 순차적으로 작업할 수 있습니다.
- dispatch에 조건을 부여할 수 있습니다.
- router transition
- 컴포넌트, 액션 생성자 등에 사이드 이펙트를 일읠만한 소스를 미들웨어레벨로 이동시킬 수 있다.
    - 다른 요소들이 순수하게 유지된다. 


## Why redux-thunk is needed?

### 1.Problem
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
위 예제에서 보는 것처럼 액션생성자에서 비동기 로직을 작성하면 액션을 전달할 방법이 없습니다.  
dispatch의 인자로 전달받은 프로미스를 redux가 처리할 방법이 없죠.

### 2. First Thought: Call Async Directly
비동기 핸들러에서 `store.dispatch`를 호출하면 어떨까요?

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


#### Con A: Inconsistent API
이렇게 사용하게 되면 상황에 따라 호출해야하는 API가 달라집니다.  
`store.disptach(syncActionCreator())` 혹은 `doSomeAsyncThing()`을 호출해야하게된 것이죠.  
이렇게 사용하면 안되는 이유가 있습니다.

1. 후자의 경우 store에 dispatch하는것이 불명확합니다.  
한 눈에 Redux 액션을 파악할 수 없기때문에 앱의 데이터 흐름이 불투명해집니다.
2. 이건 유지보수의 문제와 연결됩니다.  
나중에 함수가 비동기에서 동기로 혹은 동기에서 비동기로 수정된 경우 이 함수가 사용된 컴포넌트를 찾아다니며 수정을 해야합니다.  

우리가 원하는건 비동기 액션에서도 `store.dispatch(actionCreator())`를 사용하는 것입니다.


#### Con B: Impurity
`asyncLogin`함수는 순수함수가 아닙니다. 사이드 이펙트가 있죠.  
물론 발견하고 결국 해결책을 찾긴 할겁니다.  하지만 컴포넌트에 있는 사이드 이펙트는 컴포넌트가 더 동작하기 어렵게 만듭니다.  
예를들어 단위테스트에서 `axios`를 차단하거나 수정해야할 수도 있습니다. 그렇지 않으면 컴포넌트가 네트워크 호출을 수행합니다.  


#### Con C: Tight Couping
`asyncLogin` 함수는 `store`의 스코프에 단단히 연결되어 있기 때문에 재활용할 수 없다.  
만약 이 액션 생성자를 서버사이드 렌더링에서 사용하는 것 처럼 2개 이상의 리덕스 스토어에서 사용하거나 
mock처럼 스토어가 없는 곳에서 사용한다면 어떻게 해야할 까요?


#### Better: Thunks
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
썬크를 사용함으로서 단독 API로 돌아왔으며 `thunkedLogin`이 순수함수가 되었다.
호출되면 함수가 반환되고 즉각적인 부작용이 발생하지 않는다

반환되는것이 액션객체가 아니라 thunk함수라는것이 의아할수 있습니다
리덕스는 액션객체만 이해하니깐요. 또 여전히 결합도가 높은것같구요 

맞습니다 thunk가 동작하기 위해선 몇가지 코드가 더 필요합니다.  
값이 리덕스 스토어에 전달될때마다 먼저 미들웨어를 통과합니다.

### Redux-thunk Middleware
redux-thunk 미들웨어는 다음처럼 동작합니다
```js
actionOrThunk =>
  typeof actionOrThunk === 'function'
    ? actionOrThunk(dispatch, getState)
    : passAlong(actionOrThunk);
```
- 일반 액션객체가 전달되면 redux-thunk는 그냥 전달합니다
- 함수가 전달되면 함수에  스토어의 `dispatch`와 `getstate`을 전달하여 호출합니다. thunk를 리듀서에 전달ㄹ하지않습니다

이제 액션생성자가 객체나 함수를 반환할 수 있습니다.
 thunk가 미들웨어에 의해 실행되면 비동기 로직을 수행합니다.
 비동기로직이 완료되면 콜백 또는 핸들러가 액션을 스토어에 전달할수 있습니다
따라서 thunk는 비동기 핸들러를 사용하여 정상적인 Redux 루프를 일시적으로 "피하도록" 한다.


### Dependency Injection
thunk를 사용하여 API를 통합하고 액션생성자가 순수하게 유지할수 있다는 것을 알았습니다
그러나 여전히 특정 store를 사용하는 문제가 있습니다.
redux-thunk 미들웨어는 의존성 주입(DI)이라는 한가지 해결책을 줍니다. 
DI는 코드 결합도를 완화하는 방법인데요.  
의존성을 pull in하는 대신에 코드에 의존성이 제공됩니다
이런 역할의 역전은 제어역전보다 일반적인 개념의 예입니다.  

Thunk는 일반적으로 파라미터가 없습니다. 추가 입력없이 수행 준비가 된상태죠.
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
액션 생성자가 수동으로 store를 탐색할 필요가 없습니다. 그래서 이 액션생성자는  다른 스토어들에 사용될수 있습니다.  



<br>
<br>

#### getState
`getState`가 사용되는 것을 못 봤는데 남용하기 쉽기 때문입니다.  
많은 리덕스 앱에서 새로운 상태값을 결정하기위해 이전 상태값을 사용하는 것은 리듀서에서하는게 더 적절합니다.  


## Why Thunk Middleware, and not Promise Middleware?  
프로미스들은 자바스크립트에서 표준이되었으며 비동기적 값의 조합가능한 표현이다.  
`redux-promise-middleware`와 `redux-promise`패키지는 프로미스나 프로미스가 체이닝된 액션 객체를 보낼 수 있다.  
둘 다 좋은 기능을 가지고 있고 리덕스에서 비동기를 더 편하게 다룰 수 있다.
그러나 둘다 불순물에 대한 문제는 다루지 않는다.  
프로미스는 이미 초기화된 비동기 액션을 나타낸다.  


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










## Motivation
리덕스 thunk를 이용하면 액션 대신에 함수를 반환하는 액션 생성자를 작성할 수 있습니다.  
thunk는 dispath에 지연시간을 부여하거나 정확한 조건이 충족됐을 때 dispatch하게 할 수 있습니다.  
내부 함수는 `dispatch`와 `getState`를 파라미터로 받습니다.


### Ex1. 비동기 dispatch를 수행하기 위한 액션 생성자입니다. 
```js
const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

const increment = () => ({type: INCREMENT_COUNTER});

const incrementAsync = () => (dispatch) => {
    setTimeout(() => {
        
        dispatch(increment());
    }, 1000)
}

```

### Ex2. 조건이 있는 dispatch를 수행하기 위한 액션 생성자입니다.
```js
function incrementIfOdd(){
    return (dispatch, getState) => {
        const { counter } = getState();

        if( counter % 2 === 0 ){
            return;
        }

        dispatch(increment());
    }
}
```


## What is a thunk?
thunk는 평가를 지연시키기 위해서 식을 감싸는 함수입니다.
```js
// calculaction of 1 + 2 is immediate
// x === 3
let x = 1 + 2;

// calculation of 1 + 2 is delayed
// foo can be called later to perform the calculation
// foo is a thunk
let foo = () => 1 + 2;
```



## Composition
내부함수의 반환값은 `dispatch`의 반환값으로 사용될 수 있습니다.  
이 기능은 비동기 흐름에 이점을 줍니다.  

```js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

function fetchSecretSauce() {
    return fetch('https://www.google.com/search?q=secret+sauce');
}

function makeBugger(forPerson, secretSauce) {
    return {
        type: 'MAKE_BUGGER',
        forPerson,
        secretSauce
    };
};

function apologize( fromPerson, toPerson, error) {
    return {
        type: 'APOLOGIZE',
        fromPerson,
        toPerson,
        error,
    };
}


function withdrawMoney(amount) {
    return {
        type: 'WITHDRAW',
        amount
    }
}
// Even without middleware, you can dispatch an action
store.dispatch(withdrawMoney(100));


// thunk를 반환하는 액션 생성자 함수입니다. 
// 이 내부함수가 dispatch에 전달되면 thunk 미들웨어는 이 함수를 가로채고, dispatch와 getState인자와 함께 호출합니다. 
// thunk 함수에게 로직을 실행하고 store에 접근할 수 있는 기능을 부여합니다. 
const makeBuggerWithSecretSauce = ( forPerson ) => (dispatch) => {
    fetchSecretSauce().then(
        (source) => dispatch(makeBugger(forPerson, sauce)),
        (error) => dispatch(apologize('The Bugger Shop', forPerson, error))
    )
}

// thunk 미들웨어를 통해 비동기 액션을 dispatch할 수 있습니다. 
store.dispatch(makeBuggerWithSecretSauce('Me'));

// dispatch에서 프로미스를 반환함으로 프로미스 체인을 연결할 수 있습니다.
store.dispatch(makeBuggerWithSecretSauce('My partner')).then( ()=>{
    console.log('Done!')
})

// 다른 액션 생성자로부터 액션과 비동기 액션을 dispatch하는 액션 생성자를 작성할 수 있습니다.
const  makeBuggeresForEverybody = () => (disaptch, getState) => {

    let { buggers, myMoney } = getState();

    if( !buggers.isShopOpen ) {
        // 프로미스를 반환할 필요는 없지만 호출자가 언제든 .then()을 호출 할 수있어서 편리합니다. 
        return Promise.resolve()
    }

    // 평범한 객체 액션과 다른 thunk를 dispatch할 수 있습니다. 
    // 이 덕분에 비동기 액션들을 한번에 구성할 수 있습니다.
    return dispatch(makeBuggerWithSecretSauce('My Grandma'))
    .then(()=>
        Promise.all([
            dispatch(makeBuggerWithSecretSauce('Me')), // async
            disaptch(makeBuggerWithSecretSauce('My wife')), // async
        ])
    )
    .then(() => disaptch(makeBuggerWithSecretSauce('Our kids'))) // async
    .then(() => 
        dispatch(
            myMoney > 42
                ? withdrawMoney(42) // sync
                : apologize('Me', 'The Bugger Shop') // sync
        )
    )
};

// 데이터가 사용가능할 때까지 기다릴 수 있기 때문에 이 기능은 서버 사이드 렌더링에 유용합니다.
// 데이터가 도착한 다음에 동기적으로 앱을 랜더합니다.  
store
    .dispatch(makeBuggeresForEverybody())
    .then(()=>
        resoponse.send(ReactDOMServer.renderToString(<MyApp store={store}/>))
    );


import { connect } from 'react-redux';
import { Component } from 'react';

class BuggerShop extends Component {
    componentDidDMount() {

        let {dispatch, forPerson} = this.props

        dispatch(
            makeBuggerWithSecretSauce(forPerson);
        )
    }

    componentDidUpdate(prevProps) {
        if (prevProps.forPerson !== this.props.forPerson) {
            this.props.dispatch(makeBuggerWithSecretSauce(this.props.forPerson))
        }
    }

    render() {
        return <p>{this.props.buggeres.join('mustard')}</p>
    }
}

export default connect((state) => {
    buggeres: state.buggeres
}))(BuggerShop);

```



## react-thunk의 한계.

1. action이 비지니스 로직이 들어가서 재활용성이 떨어집니다. 





## ref 
https://react.vlpt.us/redux-middleware/05-redux-thunk-with-promise.html
- [thunk and saga](https://ideveloper2.tistory.com/53)
- [understanding redux thunk](https://codeburst.io/understanding-redux-thunk-6dbae0241817)
- [thunk and saga](https://medium.com/humanscape-tech/redux%EC%99%80-%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4-thunk-saga-43bb012503e4)
- [Thunk in redux : the Basic](https://medium.com/fullstack-academy/thunks-in-redux-the-basics-85e538a3fe60)
- [redux-thunk-doc](https://github.com/reduxjs/redux-thunk) 
- [Managing side effects in react + redux usin sagas](https://jaysoo.ca/2016/01/03/managing-processes-in-redux-using-sagas/)
- [why using saga](https://orezytivarg.github.io/from-redux-thunk-to-sagas/)
- [why do we need middleware for async flow in redux](https://stackoverflow.com/questions/34570758/why-do-we-need-middleware-for-async-flow-in-redux/34599594#34599594)
- [thunk VS saga](https://velog.io/@dongwon2/Redux-Thunk-vs-Redux-Saga%EB%A5%BC-%EB%B9%84%EA%B5%90%ED%95%B4-%EB%B4%85%EC%8B%9C%EB%8B%A4-)