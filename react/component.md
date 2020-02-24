# Component

단방향 데이터 흐름

## intro
리액트는 함수형 프로그래밍을 지향한다.  
리액트의 많은 곳에 함수형 프로그래밍의 철학이 묻어 있으며, 상태 관리 라이브러리인 리덕스 또한 순수 함수와 불변성을 강조하며 함수형에 가까운 프로그래밍 스타일을 권장하고 있다.   
함수형 프로그래밍의 관점에서 각 컴포넌트는 입력값으로 props 를 받고, ReactElement 트리를 반환하는 순수 함수이다.  

    All React components must act like pure functions with respect to their props.

그렇기 때문에 컴포넌트는 State가 같다면 항상 같은 UI를 렌더링한다. 
독립된 모듈이기 때문에 다른 화면에서 재사용이 가능하며 고차함수와 마찬가지로 개별적인 컨포넌트를 조합하여 고차 컴포넌트를 만들어 기능을 확장할 수 있다. 
결국 리액트 애플리케이션에서 UI는 개별적인 컴포넌트의 조합이다.  


## 특징
![](../resource/img/react/component-propAndState.png)
- 특정 state, props에 따른 render 결과가 바뀌지 않는다.
- 컴포넌트는 상태에 따른 가변적인 엘라먼트에 대한 정의다.
- 컴포넌트 간 합성을 할 수 있다.
- 컴포넌트 단위 테스트가 가능하다.
- 가독성이 좋다



## Baisic

### prop VS state

### 상태 관리

### 클래스 기반 컴포넌트 vs 함수형 컴포넌트
함수형 컴포넌트가 클래스 기반의 컴포넌트와 다른점은 무엇일까?  
함수형 컴포넌트는 클래스 기반의 컴포넌트와 달리, state, Life cycle method(componetDidMount, shouldComponentUpdate 등등..)와 ref 콜백을 사용 할 수 없다(context는 사용 할 수 있다)  

그럼 왜 함수형 컴포넌트를 쓸까?  
함수형 컴포넌트를 사용하면 컴포넌트를 간결하게 작성할 수 있으며, 개별 상태가 없으므로 이해하기 쉽고 예측이 용이하여 테스트를 간단히 할 수 있다.  
또한 라이프사이클을 사용하지 않으므로 불필요한 검사 및 메모리 할당을 줄일 수 있다.  
따라서 React에서는 함수형 컴포넌트 컴포넌트를 많이 사용하고 클래스 컴포넌트는 적게 사용하는것을 권고한다.  
(참고:[react-stateless-functional-components](https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc))

리액트는 왜 클래스 컴포넌트를 디자인했을까?  
컴포넌트의 상태를 관리하거나 생명주기(Life Cycle)에 훅(Hook)을 걸어 원하는 시점에 특정 함수를 실행하려면 순수 함수만으로는 구현이 어려울 것이다.  
그렇기 때문에 처음 리액트가 나왔을 때는 createClass 함수를 이용하여 컴포넌트를 생성하도록 API가 설계되었다. 또 기존 객제지향 개발자들에게 함수형 프로그래밍은 익숙하지 않기 때문에 좀더 익숙한 클래스 형태의 API를 제공한 것이다. 



### 고차 컴포넌트 (Higher Order Component)

컴포넌트를 입력받고 컴포넌트를 반환하는하는 함수다.  
여러 컴포넌트에서 공통으로 사용하는 로직을 한 컴포넌트의 역할로 분리하여 컴포넌트의 내부 로직을 간결하고 명확하게 유지하게 한다. 이를 통해 컴포넌트들의 재사용성을 높힐 수 있다.  

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

컴포넌트가 화면에 대한 정의를 넘어서 데이터 fetching까지 담당하게 되면 특수성이 부여되어 재사용성이 떨어진다.  
또한 로직과 Lifecycle이 복잡해져 컴포넌트의 정의가 난해해진다.  

이 패턴은 이러한 문제점을 해결하고 컴포넌트 테스트를 더욱 쉽게 한다.  
핵심 아이디어는 한 컴포넌트 내에 존재하는 render와 관련된 로직과 데이터와 관련된 로직을 각각 Presentational 컴포넌트, Container 컴포넌트로 분리하는 것이다.  

### Presentational 컴포넌트
- 컴포넌트의 뷰만 신경쓴다
- DOM 마크업이 존재
- render에 필요한 데이터는 존재한다고 가정.
- UI를 위한 state가 존재할 수 있습니다.
- 의존성 독립

### Container 컴포넌트
- 데이터를 다룬다
- 동작을 설명한다.
- DOM markup이 거의 없다
- 스타일 코드가 없다
- 데이터, 이벤트 컨테이너 컴포넌트를 제공



## Q&A

### 1. 컴포넌트란?
ui기능을 분할한 순수함수.

### 2. 컴포넌트 단위 개발의 이점은?
1. 재사용성: 상태관리 로직을 포함하고 있어 재사용에 용이함
2. 테스트: 독립된 모듈임으로 테스트에 용이함
3. 가독성: 


### 3.props와 state를 어떻게 구분하여 사용하는지?
1. prop:  
props
props는 컴포넌트에서 사용할 데이터 중 변경되지 않는 데이터를 다룰때 사용한다.
컴포넌트 간에는 무조건 props를 통해서만 데이터를 주고받고 props는 컴포넌트 내부에서 변경되지 않습니다.

2. state
컴포넌트에서 관리하는 상태 값으로 유동적인 데이터를 다룰 때, state 를 사용한다. 

지금 컴포넌트에서 필요한 값이 props인지 state인지 판단하고 어느 Lifecycle과 관련이 있는지 이 값을 어떤 컴포넌트에 어떻게 넘겨줄지만 생각하여 코드를 작성하면 컴포넌트를 완성할 수 있다.
### 4. 왜 setState는 비동기인가?

### 5. 고차 컴포넌트를 사용하는 이점이 뭔가?
재활용성 확대

### 6. 언제 고차 컴포넌트를 사용하는가?
- 간단한 예를 든다면?


### 7. presentational components:

### 8. 클래스형 컴포넌트를 써야하만하는 구체적인 상황은?

### 9. 왜 함수형 컴포넌트를 쓸까?

### 10. 컴포넌트를 최적화하려면?
리랜더링 최소화

### 11. UI를 설계할 때 어떤 기준으로 컴포넌트를 분리 할까?
- 기능 
- 재활용성 


### 12. 재사용 가능한 컴포넌트란?
1. 프리젠테이션 컴포넌트
- 데이터 로드 로직이 분리
2. 컨테이너 컴포넌트


## ref
- [리액트 HOC 집중 탐구](https://meetup.toast.com/posts/137)
- [리액트 HOC 집중 탐구_2](https://meetup.toast.com/posts/144)
- [react의-기본-컴포넌트를-알아보자](https://medium.com/little-big-programming/react%EC%9D%98-%EA%B8%B0%EB%B3%B8-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EB%A5%BC-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90-92c923011818)
- [how-are-function-components-different-from-classes](https://overreacted.io/how-are-function-components-different-from-classes/)
- [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
- [React 컴포넌트 상태 객체](https://velog.io/@kyusung/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B5%90%EA%B3%BC%EC%84%9C-React-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%99%80-%EC%83%81%ED%83%9C-%EA%B0%9D%EC%B2%B4)
- [component-vs-purecomp](https://www.vobour.com/%EB%A6%AC%EC%95%A1%ED%8A%B8-react-%EC%9D%B4%ED%95%B4-%EA%B8%B0%EC%B4%88-component-vs-purecomp)
- [React 애플리케이션 아키텍처](https://www.slideshare.net/byungdaesohn/react-76078368?from_action=save)
- [React Stateless Functional Components](https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc)