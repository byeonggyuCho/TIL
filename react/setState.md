# setState


## 재조정
setState()에 전달한 객체를 현재 상태로 합친다. 그러면 reconciliation을 시작한다. 새로운 리액트 엘리먼트 트리 (UI의 객체 표현)를 만들고, 새 트리를 이전(old) 트리와 비교하고, setState()에 전달한 객체를 기반으로 변경된 부분을 파악한 다음 DOM을 최종적으로 업데이트한다.

## setState는 비동기다

만일 setState를 다음과 같이 연속해서 3번 호출했다고 생각해보자.  
의도한 결과는 score가 3이되는 것일것이다.  
하지만 이 코드를 실행해보면 score는 1이된다.  
```js
state = {score : 0};
// multiple setState() calls
increaseScoreBy3 () {
 this.setState({score : this.state.score + 1});
 this.setState({score : this.state.score + 1});
 this.setState({score : this.state.score + 1});
}
```
그 이유는 setState가 배치과정을 통해 merge되기 때문인데 오브젝트 컴포지션(object composition)으로 설명할 수 있다.
```js
// object composition
const singleObject = Object.assign(
  {}, 
  objectFromSetState1, 
  objectFromSetState2, 
  objectFromSetState3
);
```
이런 코드가 있을때 중복된 key가 있다면 
가장 마지막 파라미터가 기준이 된다.  
예를들어 다음코드에서 name이 Your name이 되는 것이다.

```js
const me  = {name : "Justice"}, 
      you = {name : "Your name"},
      we  = Object.assign({}, me, you);
we.name === "Your name"; //true
console.log(we); // {name : "Your name"}
```
즉 변화할 내용을 취합해서 한번에 반영한다는 건데 여기서 
key를 덮어쓰게 됨으로써 문제가 생긴다.



## setState에 함수를 전달하는 이유
- 업데이트는 큐(queue)에 쌓이고 추후에 호출 된 순서대로 실행된다. 
- 업데이트 순서를 보장받을 수 있다.
- 이전 상태를 알고 있을 필요가 없다.
- 업데이트 로직을 모듈화 할 수 있다.

업데이트를 처리하는 방식이 다르다.

1. 값을전달한 경우: 처리결과를 병합하여 한번에 업데이트, key중복 발생
2. 함수를전달한 경우: 큐에 쌓인뒤 순차적으로 실행

```jsx
const updateQueue = [
  (state) => ({score : state.score + 1}),
  (state) => ({score : state.score + 1}),
  (state) => ({score : state.score + 1})
];
```


### 상태 변경을 컴포넌트 클래스와 분리해서 작성하라
아래 코드는 Dan Abramov의 트윗에서 발췌했다.
함수형 setState를 사용하면 더이상 업데이트 로직을 컴포넌트 안에 선언할 필요가 없다.  
외부에서 import해서 사용할 수 있다. 이로 인해 상태변경에 대한 테스트 코드를 작성할 수 있다.


#### setState로직 모듈화
```jsx
function increment(state, props) {
	return {
		value: state.value + props.step
	}
}

function decrement(state, props) {
	return {
		value: state.value - props.step
	}
}


class Counter extends React.Component {
	state = { value: 0 };
	handleIncrement = () => {
		this.setState(increment)
	}
	handleDeCrement = () => {
		this.setState(decrement)
	}
	render() {
		return (
			<div>
				<button conClick={this.handleIncrement}>+</button>
				<h1>{this.state.value}></h1>
				<button conClick={this.handleDeCrement}>-</button>			
			</div>
		)
	}

	ReactDOM.render(
		<Conter> setep={5} />,
		document.getElementById('root')
	)
}
```


#### 고차함수 활용하기
```jsx
const multiplyBy = (multiplier) => (state) => {
	value: state.value * multiplier
}



class Counter extends React.Component {
	state = { value: 0 };


    handleMultiplyByFice = () => {
        this.setState(multiplyBy(5))
    }
	render() {
		return (
			<div>
				<button conClick={this.handleIncrement}>+</button>
				<h1>{this.state.value}></h1>
				<button conClick={this.handleDeCrement}>-</button>			
			</div>
		)
	}

	ReactDOM.render(
		<Conter> setep={5} />,
		document.getElementById('root')
	)
}
```

#### setState로직 테스트
```jsx
function increment(state, props) {
	return {
		value: state.value + props.step
	}
}

function decrement(state, props) {
	return {
		value: state.value - props.step
	}
}

expect(increment({value: 0},{step: 5})).teBe(5)
```




# ref
- [setState는 비동기로 실행된다.](https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous)
- [setState 함수전달하기](https://medium.com/@saturnuss/setstate-%EB%A5%BC-%ED%95%A8%EC%88%98%ED%98%95%EC%9C%BC%EB%A1%9C-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-763402cbc3e5)
- [setState await가능할까](https://medium.com/@saturnuss/setstate-%EB%8A%94-await%EC%99%80-%EC%82%AC%EC%9A%A9%EC%9D%B4-%EA%B0%80%EB%8A%A5%ED%95%A0%EA%B9%8C-7b02581f6df4)
- [함수형 setState가 리액트(React)의 미래이다](https://www.vobour.com/%ED%95%A8%EC%88%98%ED%98%95-setstate%EA%B0%80-%EB%A6%AC%EC%95%A1%ED%8A%B8-react-%EC%9D%98-%EB%AF%B8%EB%9E%98%EC%9D%B4%EB%8B%A4-functiona)