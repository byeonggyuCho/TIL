# Component


## intro
    UI = View(State)

리액트에서 컴포넌트는 UI를 구성하는 독립된 모듈이다.  
이런 관점에서 봤을때 컴포넌트를 함수로 볼 수 있으며 순수 함수를 유지하는 컴포넌트는 View를 State가 같다면 항상 같은 UI를 렌더링한다.  
또 독립된 모듈이기 때문에 개별적인 컨포넌트를 조합하여 UI를 조합하는 것이 가능하다.

- 특정 state, props에 따른 render 결과가 바뀌지 않습니다.
- JSX를 통해 어떻게 화면을 그릴지 정의합니다.
- 컴포넌트 간 합성을 할 수 있습니다.
- 컴포넌트 단위 테스트가 가능하다.
- 가독성(이전보다 더 많은 타이핑을 필요로 할 수 있지만 코드를 쓸 일보다 읽을 일이 더 많다는 사실을 기억하세요. 모듈화되고 명시적인 코드는 정말 읽기 쉬워집니다.)



## Baisic
![](../resource/img/react/redux-flow.png)

## 고차 컴포넌트 (Higher Order Component)

컴포넌트를 input으로 하고 컴포넌트를 output으로 하는 함수라고 생각하시면 됩니다.  
여러 컴포넌트에서 공통으로 사용하는 로직을 한 컴포넌트의 역할로 분리하여 컴포넌트의 내부 로직을 간결하고 명확하게 유지하게 합니다. 이를 통해 컴포넌트들의 재사용성이 올라갑니다.  

```js


import { Component } from "React";

export var Enhance = ComposedComponent => class extends Component {
  constructor() {
    this.state = { data: null };
  }
  componentDidMount() {
    this.setState({ data: 'Hello' });
  }
  render() {
    return <ComposedComponent {...this.props} data={this.state.data} />;
  }
};
```

```js
Enhance.js hosted with ❤ by GitHub
import { Enhance } from "./Enhance";

class MyComponent {
  render() {
    if (!this.data) return <div>Waiting...</div>;
    return <div>{this.data}</div>;
  }
}

export default Enhance(MyComponent); // Enhanced component

```


## Presentational and Container Components

컴포넌트가 화면에 대한 정의를 넘어서 데이터 fetching까지 담당하게 되면 specialize 하게 되어 재사용성이 떨어집니다. 또한 로직과 Lifecycle이 복잡해져 무엇을 하는 컴포넌트인지 이해하기 어려워집니다.  

트 패턴은 이러한 문제점을 해결하고 컴포넌트 테스트를 더욱 쉽게 합니다. 핵심 아이디어는 한 컴포넌트 내에 존재하는 render와 관련된 로직과 데이터와 관련된 로직을 각각 Presentational 컴포넌트, Container 컴포넌트로 분리하는 것이지요.


- 재사용성


### Presentational 컴포넌트는
- 컴포넌트의 뷰만 신경쓴다
- DOM 마크업이 존재
- render에 필요한 데이터는 이미 존재한다고 가정합니다.
- UI를 위한 state가 존재할 수 있습니다.
- 의존성 독립

### Container 컴포넌트는
- 동작을 설명한다.
- DOM markup이 거의 없다/,
- 스타일 코드가 없다
- 데이터, 이벤트 컨테이너 컴포넌트를 제공

## Q&A

### 1. 컴포넌트란?

### 2. 컴포넌트 단위 개발에서 이점은?
1. 재사용성 : 하이오더 컴포넌트
2. 테스트: 단일책임원칙 의존성 독립
3. 가독성: 
### 3.props와 state를 어떻게 구분하여 사용하는지?
1. prop:  
props
props는 컴포넌트에서 사용할 데이터 중 변경되지 않는 데이터를 다룰때 사용한다.
컴포넌트 간에는 무조건 props를 통해서만 데이터를 주고받고 props는 컴포넌트 내부에서 변경되지 않습니다.

2. state
컴포넌트에서 관리하는 상태 값으로 유동적인 데이터를 다룰 때, state 를 사용한다. 


지금 컴포넌트에서 필요한 값이 props인지 state인지 판단하고 어느 Lifecycle과 관련이 있는지 이 값을 어떤 컴포넌트에 어떻게 넘겨줄지만 생각하여 코드를 작성하면 컴포넌트를 완성할 수 있습니다.
### 4. 왜 setState는 비동기인가?

### 5. 고차 컴포넌트를 사용하는 이점이 뭔가?

### 6. 언제 고차 컴포넌트를 사용하는가?
- 간단한 예를 든다면.


### 7. presentational components:

### 8. 클래스형 컴포넌트를 써야하만하는 상황는?

### 9. 함수형 컴포넌트의 이점은?

## ref
- [react의-기본-컴포넌트를-알아보자](https://medium.com/little-big-programming/react%EC%9D%98-%EA%B8%B0%EB%B3%B8-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EB%A5%BC-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90-92c923011818)
- [how-are-function-components-different-from-classes](https://overreacted.io/how-are-function-components-different-from-classes/)
- [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
- [React 컴포넌트 상태 객체](https://velog.io/@kyusung/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B5%90%EA%B3%BC%EC%84%9C-React-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%99%80-%EC%83%81%ED%83%9C-%EA%B0%9D%EC%B2%B4)
- [component-vs-purecomp](https://www.vobour.com/%EB%A6%AC%EC%95%A1%ED%8A%B8-react-%EC%9D%B4%ED%95%B4-%EA%B8%B0%EC%B4%88-component-vs-purecomp)