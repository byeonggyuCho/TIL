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
- [understanding redux thunk](https://codeburst.io/understanding-redux-thunk-6dbae0241817)
- [thunk and saga](https://medium.com/humanscape-tech/redux%EC%99%80-%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4-thunk-saga-43bb012503e4)
- [Thunk in redux : the Basic](https://medium.com/fullstack-academy/thunks-in-redux-the-basics-85e538a3fe60)
- [redux-thunk-doc](https://github.com/reduxjs/redux-thunk) 
- [Managing side effects in react + redux usin sagas](https://jaysoo.ca/2016/01/03/managing-processes-in-redux-using-sagas/)
- [why using saga](https://orezytivarg.github.io/from-redux-thunk-to-sagas/)
- [why do we need middleware for async flow in redux](https://stackoverflow.com/questions/34570758/why-do-we-need-middleware-for-async-flow-in-redux/34599594#34599594)