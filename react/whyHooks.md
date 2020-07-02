# why Hooks?

## TL;DR
1. Huge and Complex Componets
    -  state를 재활용하기 위해HOC, render props를 이용하면 컴포넌트가 너무 복잡해진다!
2. Duplicated Logic
    - class형 컴포넌트의 라이프사이클 메서드를 이용하면 중복코드가 많이 생긴다!
3. Class
    - Calss 문법이 가지는 다양한 사이드 이펙트
    - `this`로 인한 사이드 이펙트 해결.


## intro
Hook의 도입배경과 장단점에 대해서 생각해본다.
Hooks에 대해 이야기하기 전에 간단하게 정리하면 좋은 개념이 있다.
HOC와 reder props 패턴이다.

HOC은 고차 컴포넌트로 공통적인 기능을 추상화해서 재활용 하는 패턴을 말한다. 
```jsx
import { Enhance } from "./Enhance";

class MyComponent {
  render() {
    if (!this.data) 
      return <div>Waiting...</div>;
    
    return <div>{this.data}</div>;
  }
}

export default Enhance(MyComponent); // Enhanced component
```
이렇게 감싸서 반환을 하면 고차함수의 기능이 추가된다!
추상화를 통해 로직을 재활용하기 위한 패턴이다. `react-redux`를 사용해봤다면 `react-redux`의 `connect`함수가 고차함수다.  

Render Props 패턴으로 구현된 컴포넌트는 자체적으로 rendering 로직을 구현하는 대신 React element 요소를 반환하고, 이를 호출하는 함수를 사용한다.  

HOC과 render props의 공통된 문제는 구조도를 복잡하게 만든다는 것이다.(Wrapper Hell)  
Hooks는 로직 재활용을 할 수 있는 새로운 방법을 제공한다.  


## 등장배경

### 1. Huge and Complex Componets
state 재활용을 위해 HOC, render props같은 방법을 사용했지만 
이 방법을 사용하면 Wrapper Hell로 인해 컴포넌트가 거대해지고 복잡도가 증가한다.  
이런 현상은 디버깅을 어렵게 만듭니다.  

이 문제는 Mixin을 이용하면 해결가능하긴 합니다.  
하지만 Mixin을 적용하는 것에는 문제가 있습니다. 그 내용에 대해서는 [ Mixins Considered Harmful](https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html#why-mixins-are-broken)이 글을 참고하시길 바랍니다.  그래서 페이스북 팀이 새로운 API를 만들기로 결정했고 그렇게 탄생한 것이 Hooks입니다!


### 2.Duplicated Logic


#### useEffect
    useEffect를 이용하면 라이프사이클 로직을 통합할 수 있다.

클래스형 컴포넌트의 라이프사이클 메서드에서는 중복코드가 발생하기 쉽다.  
이건 클래스형 컴포넌트가 컴포넌트의 **시점**에 주목하기 때문인데 
이렇기 때문에 라이프 사이클상 같은 동작이 발생하는 시점이 발생한다.  

```jsx
class Example extends React.Component { 
    constructor(props) { 
        super(props); 
        this.state = { count: 0 }; 
    } 
    componentDidMount() { 
        document.title = `You clicked ${this.state.count} times`; 
    } 
    componentDidUpdate() { 
        document.title = `You clicked ${this.state.count} times`; 
    } 
    render() { 
        return ( 
            <div> 
                <p>You clicked {this.state.count} times</p> 
                <button onClick={() => this.setState({ count: this.state.count + 1 })}> 
                    Click me 
                </button> 
            </div> 
        ); 
    } 
}
```
위 코드에서 보면 `componentDidMount`, `componentDidUpdate`에서 같은 코드를 사용했는데
이 두 메서드가 비슷한 **시점**이기 때문이다. 클래스형 컴포넌트에서는 이런 경우가 자주생긴다.

그럼 Hooks에서는 어떻게 로직을 재활용할까?  
Hooks에서는 위와 같은 상황에서 `useEffect`를 사용하서 코드를 재활용할 수 있다.  
`useEffect`는 렌더링이 될때 마다 실행된다.  
이 Hook은 앞서 설명한 라이프사이클 메서드와는 관점의 차이가 있는데 
`useEffect`는 **무엇**에 집중한다.  
이 Hook은 의존성 배열을 인자로 전달함으로써 컴포넌트의 특정 데이터가 변경되었을때 실행되게 할 수 있는데 이 말을 다시 하면 **무엇이 변경되었는가?**에 대해 주목한다는 얘기가 된다.  
결과적 얘기처럼 들릴수 있겠지만 이렇게 컴포넌트의 관심사를 시점에서 무엇으로 바꾸었을 때 중복로직이 줄어든다. 
```jsx
import { useState, useEffect } from 'react'; 

function Example() { 
    const [count, setCount] = useState(0); 
    useEffect(() => { 
        document.title = `You clicked ${count} times`; 
    }); 
    return ( 
        <div> 
            <p>You clicked {count} times</p> 
            <button onClick={() => setCount(count + 1)}> 
                Click me 
            </button> 
        </div> 
    );
}
```

#### useReducer
    useReducer를 이용하면 상태변경 로직을 모듈화할 수 있다.

useReducer를 이용해서 중복로직을 제거하는 케이스를 소개한다.  
리듀서를 사용하면 상태변경의 코드를 컴포넌트 외부에 선언할 수 있다.  
`reducer`를 하나의 모듈파일에서 관리하고 컴포넌트에서 import해서 사용하면 
로직을 재활용할 수 있다.  

```jsx
import React, { useReducer } from 'react';

function reducer(state, action) {
  // action.type 에 따라 다른 작업 수행
  switch (action.type) {
    case 'INCREMENT':
      return { value: state.value + 1 };
    case 'DECREMENT':
      return { value: state.value - 1 };
    default:
      // 아무것도 해당되지 않을 때 기존 상태 반환
      return state;
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0 });

  return (
    <div>
      <p>
        현재 카운터 값은 <b>{state.value}</b> 입니다.
      </p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
    </div>
  );
};

export default Counter;
```




### 3. Class
class를 다루면서 생기는 문제가 뭘까?  
이 질문을 한 단어로 대답하면 **this**라고 답하고 싶다.  
class문법에서는 this로 인해 다양한 side effect가 생기며 자바스크립트에서는 동적 바인딩이 되기때문에 this binding에 신경을 써야한다.  
가장 쉽게 들 수 있는 예가 class의 메서드를 다른 컴포넌트의 이벤트 핸들러로 할당하는 케이스다.  

```js

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Basic extends Component {
  constructor(props) {
    super(props);
    this.onClickButton = this.onClickButton.bind(this);
  }

  onClickButton() {
    console.log(this)
  }

  render() {
    return (
      <div>
        <button onClick={this.onClickButton}>클릭</button>
      </div>
    );
  }
}

export default Basic;
```
위 경우 처럼 동적 바인딩이 되는 this에 대한 처리로 `bind`메서드를 사용하거나 
`@babel/plugin-proposal-class-properties`을 이용해 화살표 함수를 사용해야한다.  

```jsx
//plugin-proposal-class-propertie
    onClickButton = () => {
        console.log(this)
    }
```
또 `this`는 인스턴스에 대한 참조임으로 클래스 컴포넌트에서 `시점`이 문제가 되기도 한다.  
좀 더 풀어서 얘기하자면 이벤트를 triger했을 시점의 값과 이벤트 핸들러 내부에서 this를 참조하는 시점의 값이 달라 질 수 있다. 즉 `let that = this;`등의 방법으로 특정 시점의 this를 기록해야하는 경우가 생긴다. 이런 문제들이 고질적인 `this`의 사이드이펙트이며 Hook에서는 이런 문제를 함수형 프로그래밍의 관점에서 해결하고자 한다. 




## Hooks의 단점

### 1. 미지원 기능이 있다.
- getSnapshotBeforeUpdate나 componentDidCatch가 지원되지 않습니다.





## 번외 "Hooks를 쓰면 Container Component가 필요없을까?"

Container패턴를 쓰는 이유는 컴포넌트간 관심분리를 통한 프리젠테이셔널 컴포넌트의 재활용성 확보라고 생각한다.  
이 관점에선 굳이 Container Component를 프리젠테이셔널과 통합할 이유가 있을까 라고 생각한다.



## EX
Hooks를 사용했을 때 어떻게 코드가 변하는가에 대한 셈플이다.

### 클래스형 컴포넌트
```jsx
import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const App = () => {
  return (
    <div className="App">
      <Timer />
    </div>
  );
};

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
  }

  tick = () => {
    this.setState(state => ({
      seconds: state.seconds + 1
    }));
  };

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <div>Seconds: {this.state.seconds}</div>;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

### 함수형 컴포넌트 with Hooks
```jsx
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const App = () => {
  return (
    <div className="App">
      <Timer />
    </div>
  );
};

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);
  return <div>Seconds: {seconds}</div>;
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```





- [컨테이너 컴포넌트를 제거하자](https://medium.com/humanscape-tech/%EC%8A%AC%EC%8A%AC-hooks%EB%A1%9C-%EC%9D%B4%EC%82%AC-%EA%B0%80%EC%85%94%EC%95%BC%EC%A3%A0-34be22e2962f)


## REF
- [hooks-intro](https://ko.reactjs.org/docs/hooks-intro.html)
- [why we switched to React Hooks](https://blog.bitsrc.io/why-we-switched-to-react-hooks-48798c42c7f)
- [Hooks가 뭔가요?](https://medium.com/humanscape-tech/hooks-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-usestate-useeffect-811636d1035e)
- [why hooks](https://dev-momo.tistory.com/entry/React-Hooks)
- [Making Sense of React Hooks](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889)
- [Why Mixins are Broken](https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html#why-mixins-are-broken)
- [reason-whey-react-hooks](https://blog.rhostem.com/posts/2019-08-18-reason-whey-react-hooks-opt-in)