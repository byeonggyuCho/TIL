# Rendering




## ReactDOM.render
 ReactDOM.render() 함수를 호출하면 Virtual DOM을 만든다.
```jsx
 ReactDOM.render(
      <App/>,
    document.getElementById('root')
  )
```
위 `JSX`코드는 아래의 자바스크립트 코드로 변환된다.
```js
 ReactDOM.render(
    React.createElement(App)
  , document.getElementById('root'));
```
여기서 전달된 ` ReactDOM.render`는 전달된 리액트 엘리먼트로 리액트 컴포넌트 객체를 생성한다.  
1. ReactCompositeComponent  
DOM이 아닌 컴포넌트를 생성할때 사용됨
2. ReactDOMComponent  
DOM을 만들 때 생성하는 컴포넌트다.


## ReactReconciler.mountComponent
render() 함수가 생성한 컴포넌트를 React 컴포넌트에 마운트하기 위해 ReactReconciler.mountComponent() 메서드를 호출한다. ReactReconciler.mountComponent() 메서드에서는 실제 ReactCompositeComponent 객체와 ReactDOMComponent 객체의 mountComponent() 메서드를 호출하며, 이 시점에 주요 작업이 시작된다.  

- constructor() 메서드 실행
- componentWillMount() 메서드 실행
- 렌더링 실행
- 배치 처리 작업(ReactReconcileTransaction 객체)에 메서드나 속성 등록
- componentDidMount() 메서드가 있으면 componentDidMount() 메서드 등록
- ref 속성이 있으면 attachRefs 속성 등록
- 하위 ReactComponent 객체가 있으면 ReactComponent 객체를 생성하고 다시 ReactReconciler.mountComponent() 메서드를 실행


## 리액트 엘리먼트가 돔 엘리먼트로 변하는 과정
### 1.렌더 단계(Reconciliation)
- 가상 돔
- 실제 돔에 반영할 데이터를 파악하는 단계
- reactDom.render와 setState에의해 이뤄 진다.


### 2.커밋단계
- 파악한 데이터를 반영하는 단계


## 가상돔
- 리액트 엘리먼트 트리구조를 나타낸 자바스크립트 객체
- 가상돔을 비교하여 돔을 랜더링한다 즉 개발자가 값을 비교하고 돔에 반영하는 과정을 자동화 해준다.
- 이 비교를 통해 국소부위만 업테이트 할수 있ㄱ 때문에 렌더링을 최소화할수 있다.
- 꼭 필요한 작업만 선별한다.

## element
element는 리액트 앱의 가장 작은 구성요소입니다.
```js
const element = <h1>Hello, wor5ld</h1>;
```
Dom Element와 달리 React element는 순수한 객체이며 생성비용이 저렴합니다. React Dom은 react Element와 일치하도록 DOM을 업데이트합니다.  

Component와 Element는 다릅니다. 

## element rendering
기본적으로 리액트 애플리케이션에는 모든 리액트 element가 들어가는 root Dom노드가 있습니다.  
```js
<div id="root"></div>
```
리액트 애플리케이션에서는 단일 root Dom node를 가지는게 일반적이지만, 기존앱에 리액트를 통합하는 경우 2개이상의 root가 존재할 수 있습니다.  
리액트 element를 Root에 렌더링하고 싶으면 ReactDOM.render() 에 전달하면 됩니다.
```js
const element = <h1>Hello, world</h1>;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

## rendering element update
react Elmement는 변경 불가능합니다.  
영화에 비유하자면 단일 프레임이라 생각할 수 있는데 react Elmement는 특정 시간대의 UI를 보여주기 때문입니다. 
따라서 업데이트를 하기 위해서는 새로 랜더링을 해야합니다. 


## Reconciliation

## react는 필요한 부분만 렌더링한다.  
React DOM은 요소와 그 자식을 이전 요소와 비교하고, DOM을 원하는 상태로 만드는 데 필요한 DOM 업데이트만 적용합니다.

```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}


ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

1. `<Clock>`이 `ReactDOM.render`에 전달될 때, React는 `Clock` 컴포넌트의 생성자 함수를 호출합니다.  
Clock이 현 시간 화면에 보여질 때, 현 시간을 포함하는 `this.state` 객체를 초기화합니다. 이 state는 추후 업데이트합니다.

2. React가 Clock 컴포넌트의 `render` 메서드를 호출합니다. 그다음 React는 Clock의 렌더링 출력과 일치하도록 DOM을 업데이트합니다.

3. Clock 출력이 DOM에 주입되었을 때, React는 `componentDidMount`을 호출합니다. 내부에서 Clock 컴포넌트는 브라우저에게 컴포넌트의 `tick` 메서드를 초당 한번 호출하는 타이머를 설정하라고 요구합니다.

4. 브라우저에서 매 초마다 tick() 메서드를 호출합니다. 내부에서 Clock 컴포넌트는 setState를 호출하여 UI 업데이트를 예약합니다.  
`setState` 호출 덕분에, React는 상태가 변경된 걸 알고 있고, `render` 메서드를 다시 한번 호출해 스크린에 무엇이 있어야 하는 지 알 수 있습니다. 이번에는, render() 메서드 내의 `this.state.date` 가 달라지므로 렌더 출력에 업데이트된 시간이 포함됩니다. React는 그에 따라 DOM을 업데이트합니다.

5. Clock 컴포넌트가 DOM에서 삭제되면, React는 `componentWillUnmount`을 호출하고 타이머를 멈춥니다.

## REF
- [state-and-lifecycle](https://reactjs-kr.firebaseapp.com/docs/state-and-lifecycle.html)
- [React 작동 방법](https://d2.naver.com/helloworld/9297403)