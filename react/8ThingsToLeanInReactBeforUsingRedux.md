# React에서 Redux전에 배워야할 8가지.

React는 컴포넌트의 상태값을 관리합니다. 그런데 애플리케이션이 복잡해지면 각각의 컴포넌트가 자신의 상태값을 직접 관리하게 되면 코드가 복잡해지게 되죠. 그래서 `Redux`같은 상태관리 솔루션을 사용하게 됐습니다. 이글은 `Redux`를 시작하기 전에 `React`에서 경험 해봐야하는 부분들을 정리했습니다.

1. 왜 생태관리 솔루션이 필요한가?
    - 사용하지 않았을 때 local component는 어떻게 상태값을 관리하는가?
2. Local Component의 상태값 관리하는 방법.
    - 언제 Local state를 사용하는가?


리덕스를 사용하게 되면 보일러플레이트가 발생합니다. 초기작업이 많아지죠. 그럼 꼭 Redux를 사용해야만 할까요?
그렇지 않습니다. Redux같은 상태관리 솔루션은 컴포넌트 구조가 복잡한 대형 애플리케이션을 위한 도구입니다. [YouMightNotNeedRedux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)에서 이 내용을 잘 다뤘으니 참고 바랍니다.  

하지만 `Reudx`는 `React`로 애플리케이션을 만드는 개발자가 반드시 알고 있어야하는 도구이긴 합니다.
그래서 Redux를 쓰기 전에 React에서 알아야할 내용을 정리했습니다.

1. React에서의 Local state는 자연스럽다.,
2. React 함수형 Local State
3. React의 State와 Property
4. React State 옮기기.
5. React 고차 커포넌트
6. React의 Context API
7. React의 상태 컴포넌트.
8. 컨테이너와 프레젠터 패턴.

9. MobX 아니면 Redux?

## 1. React에서의 Local state는 자연스럽다.
```js
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  render() {
    return (
      <div>
        Counter: {this.state.counter}

        <button
          type="button"
          onClick={() => this.setState({ counter: this.state.counter + 1 })}>
          Click!
        </button>
      </div>
    );
  }
}
```
React 컴포넌트는 초기 상태를 생성자에서 정의합니다. 그런 후에 `this.setSate()`메소드를 사용해서 갱ㅅ힌할 수 있습니다. 상태 객체의 갱신은 `shallw merge`로 수행되니다. 그러므로 지역 상태 객체를 부분적으로 갱신하고도 상태 객체의 다른 프로퍼티는 손대지 ㅇ낳고 그대로 유지할 수 있습니다. 상태가 갱신된 후에는 컴포넌트가 다시 렌더링을 수행합니다. 앞에서 예로 든 코드에서는 `this.state.counter`의 갱신된 값을 보여줄 것입니다. 이 예제에서는 react의 단방향 데이터 흐름을 사용해 하나의 닫힌 루프를 작성했습니다.


## 2. React 함수형에서 Local State
`this.setState()`메소드는 지역상태를 비동기적으로 갱신합니다.  
컴포넌트의 다음 상태를 위해 연산을 하는데 현재 지역 상태에 의존한다고 가정해봅시다. 앞서 작성했던 예제에서는 다음처럼 작성했습니다.
```js
this.setState({ counter: this.state.counter + 1});
```
지역상태(`this.state.counter`)는 연산에서 바로 그 시점의 상태로 사용했습니다. `this.setState()`를 사용해서 상태를 갱신하긴 했지만 지역 상태는 비동기 실행이 수행되기 전의 이전값을 상태값으로 사용해 연산합니다. 

```js
this.setState({ counter: this.state.counter + 1 }); // this.state: { counter: 0 }
this.setState({ counter: this.state.counter + 1 }); // this.state: { counter: 0 }
this.setState({ counter: this.state.counter + 1 }); // this.state: { counter: 0 }

// 예상한 상태: { counter: 3 }
// 실제 갱신된 상태: { counter: 1 }
```
이런 에러가 생길 수 있다는 말이죠.


## Ref
- [해석](https://edykim.com/ko/post/learn-react-before-using-redux/)
- [theOriginalText](https://www.robinwieruch.de/learn-react-before-using-redux/)
- [YouMightNotNeedRedux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)