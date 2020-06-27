# React에서 Redux전에 배워야할 8가지.

## TL;DR
**상태관리라이브러리 도입에 고려할점**  
- 지역상태 구조에서 상태 전달에 따른 문제점에 대한 이해. (Lifting State Up, props drilling)
- 특정 컴포넌트의 상태에 대한 다른 컴포넌트의 의존도로 인한 복잡도 증가.
- 상태관리 라이브러리의 컨셉과 동작이해

## intro
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
React 컴포넌트는 초기 상태를 생성자에서 정의합니다. 그런 후에 `this.setSate()`메소드를 사용해서 갱신할 수 있습니다. 상태 객체의 갱신은 `shallw merge`로 수행됩니다. 그러므로 지역 상태 객체를 부분적으로 갱신하고도 상태 객체의 다른 프로퍼티는 손대지 않고 그대로 유지할 수 있습니다. 상태가 갱신된 후에는 컴포넌트가 다시 렌더링을 수행합니다. 앞에서 예로 든 코드에서는 `this.state.counter`의 갱신된 값을 보여줄 것입니다. 이 예제에서는 react의 단방향 데이터 흐름을 사용해 하나의 닫힌 루프를 작성했습니다.


## 2. React Local State 변경하기.
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
이런 에러가 생길 수 있다는 말이죠. 비동기 함수를 사용할떄 발생하는 흔한 실수입니다. 이 문제는 다음과 같은 처리로 해결할 수 있습니다.

```js
this.setState(previousState => ({ counter: previousState.counter + 1 }));
```

`property`에 의해 상태값을 변경해야하는 경우가 있을 수 있습니다. 이런 경우에는 이렇게 처리하면 됩니다.
```js
this.setState((prevState, props) => ({ counter: prevState.counter + props.addition }));
```
`this.setState(fn)`을 이용하면 상태를 갱신하는 방법을 격리된 상태에서 테스트 해볼 수 있습니다.



## 3. React의 State와 Property
상태는 컴포넌트 안에서 관리됩니다.이 상태는 다른 컴포넌트에 프로퍼티로 전달할 수 있습니다. 전달된 프로퍼티는 다시 하위 컴포넌트에 전달할 수 있습니다. 프로퍼티로 함수를 전달받으면 부모 컴포넌트의 콜백 함수를 전달 받을 수도 있습니다. 이렇게 전달 받은 함수를 사용하면 부모 컴포넌트의 지역 상태를 변경할 수도 있습니다. 하위 컴포넌트에서는 프로퍼티로 전달한 함수를 사용해서 상태를 관리하는 컴포넌트까지 거슬러 올라와 상태를 변경할 수 있습니다. 갱신된 상태는 프로퍼티로 다시 하위 컴포넌트로 전달됩니다.  

상위 컴포넌트의 콜백함수를 프로퍼티로 전달받아 하위 컴포넌트에서 부모 컴포넌트의 생태를 갱신할 수 있지만, 출처가 모호해집니다. 콜백이 어떤 동작을 하는지도 알 수 없죠. 컴포넌트간 직접 상태값을 주고받았을때 생기는 문제입니다.   

컴포넌트에서 사용되는 모든 속성은 상태 아니면 프로퍼티입니다. 무엇이든 상호작용이 필요한 경우에는 상태에 보관되어야하고 그 외에는 모두 프로퍼티에 보관되어야합니다.  

컴포넌트 트리를 따라 프로퍼티를 내려본 경험을 상태관리 라이브러리의 필요성을 배울 수 있습니다.  최상위 컴포넌트에서 최하위 컴포넌트에 프로퍼티를 전달해야할 때는 어떻게 해야할까요? 수 많은 중간 컴포넌트를 지나쳐가야합니다. 이런 불편함에서 '직접 전달하지 않고 제 3자를 통해 전달할순 없을까?'라는 발상에서 상태관리 라이브러리가 나왔습니다.
`

## 4. Lifting State up
이 전략은 컴포넌트의 계층구조에서 하나의 컴포넌트가 상위 또는 하위 컴포넌트의 상태값을 관리한다는 전략이다.
A 컴포넌트 하위에 B와 C라는 자식 컴포넌트가 있다고 하자. 이때 A에서 B와 C의 상태값을 관리하며 하위 컴포넌트에는 프로퍼티로 전달한다. 
B와 C에는 A의 상태값을 변경할 수 있는 함수를 제공한다(Reduce). 지금 구조에서 A는 C와 B의 상태값을 관리하 역할을한다(Store). 하지만
A와 C가 직계 혈통이 아니라 2대 3대 라면 어떨까? 중간에 2개의 컴포넌트가 있고 C가 A의 4대 자손이라고 생각해보자. 이렇게되면 상태를 관리하는 A에서 2대, 3대를 거쳐 프로퍼티를 C에게 전달해야합니다. 이런 구조에서는 차리리 C가 스스로 자신의 상태를 관리하는것이 낫습니다. 
필요에 따라 자신의 직계 자손처럼 가까운 컴포넌트의 상태값만 관리하는 구조가  됐습니다.  

이런 케이스도 생각해볼 수 있습니다.
마찬가지로 최상위 컴포넌트 A가 있고 B,C가 하위 컴포넌트로 있다고 가정해봅시다. 그리고 이번엔 C에서 자신의 상태를 관리하고 있습니다. 
이런 구조에서 B가 C의 상태가 필요하다면 C는 컴포넌트 계층 구조를 따라 B와 C의 공통부모인 A까지 올라간뒤에 B로 다시 내려가야합니다. 이런 구조에서는 보통 공통부모인 A에서 C의 상태값을 관리하고 C의 상태값을 B가 의존하는경우 A에서 제공해줍니다.


## 5. React의 고차 컴포넌트
Redux를 익히기전에 React의 고차 컴포넌트 패턴에 대해 연습해보는 것이 좋습니다. 이 패턴은 추상적인 기능이 필요할 때 사용할 수 있고 여러 컴포넌트에서 선택적으로 기능이 필요할 때 활용할 수 있습니다. 고차 컴포넌트는 추상적인 컴포넌트를 전달받아 구체적이고 기능이 추가된 컴포넌트를 반환한다고 생각하면 쉽습니다. Redux에서 React의 view Layer와 라이브러리의 상태 관리 계층을 연결하게 되면서 고차 컴포넌트를 사용해 처리하기 때문에 이 패턴에 대한 시고를 충분히 연습하시는게 좋습니다.


## 6. React의 Context API
잘 사용되지는 않지만 이해가 한번쯤 필요한 API입니다. context는 컴포넌트 트리에서 속성을 묵시적으로 전달할 때 사용됩니다. 부모 컴포넌트에서 속성을 context로 선언하면 컴포넌트 트리 아래에 있는 자식 컴포넌트에서 활용할 수 있습니다. 명시적으로 각각의 컴포넌트 계층에 일일이 전달할 필요 없이 부모 자식 관계라면 부모 컴포넌트가 생성한 context를 자식 컴포넌트가 사용할 수 있습니다. 모든 컴포넌트 트리에 걸쳐 언제든 꺼내서 쓸 수 있는 보이지 않는 컨테이너가 존재합니다.  이 컨테이너 덕분에 컴포넌트에서 필요하지 않는 프로퍼티는 접근할 일이 없어지기 때문에 계층구조를 따라 프로퍼티를 전달하는(props drilling)을 피할 수 있습니다.  

이 기능이 Redux와 어떤 연관이 있을까요? Redux같은 상태 관리 라이브러리를 사용하다보면 어떤 시점에서 상태 관리 계층을 ViewLayer에 붙여야 하는 상황이 생깁니다. 모든 컴포넌트에서 이 상태 컨테이너에 접근할 수 있도록 붙이기 위해선 어떻게 해야할까요? 이런 상황에서 context API를 상요할 수 있습니다. 최상위 컴포넌트(루트 컴포넌트)에서 상태 컨테이너를 context로 지정합니다. 이제 컴포넌트 트리에 있는 모든 컴포넌트에 직접 전달하지 않으면서 모두 접근할 수 있게 되었습니다. 이런 과정은 react프로바이터 패턴으로 적용할 수 있습니다.

물론 Redux같은 상태관리 라이브러리를 사용할 때마다 React의 context를 직접 제어해야 할 필요가 있다는 건 아닙니다. 이런 라이브러리는 이미 모든 컴포넌트에서 상태 컨테이너에 접근 가능하도록 모든 기능이 함께 제공되고 있습니다. 하지만 이 기능이 보이지 않는 곳에서 어떤 방식으로 동작하고 있는지 이해하게 된다면 여러 컴포넌트에서 상태를 제어하면서 도대체 이 상태 컨테이너는 어디서 오는 것일까 걱정할 필요가 없어지게 됩니다.


## 7. React의 상태 컴포넌트.
React 컴포넌트에는 Class형과 함수형이 있습니다. 함수형 컴포넌트는 props를 인자로 받고 JSX를 반환합니다. 상태값이 없고 Life Cycle 메서드도 없죠.


```js
function Conuter({ counter }) {
  return (
    <div>
      {counter}
    </div>
  )
}
```
이번엔 Class형 컴포넌트를 보겠습니다. Class형 컴포넌트는 `this.sate`와 `this.setState()`메소드로 상태에 접근하고 변경할 수 있습니다. 


```js
class FocusedInputField extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.input.focus();
  }

  render() {
    return (
      <input
        type="text"
        value={this.props.value}
        ref={node => this.input = node}
        onChange={event => this.props.onChange(event.target.value)}
      />
    );
  }
}
```

## 8.컨테이너와 프레젠터 패턴
컴포넌트를 컨테이너와 프레젠터로 구분합니다. 컨테이너 컴포넌트는 어떻게 동작하는가를, 프레젠터 컴포넌트는 어떻게 보이는 가를 정의합니다. 컨테이너 컴포넌트는 ES6 클래스 컴포넌트로 구현되어 이젹 상태를 관리합니다. 프레젠터 컴포넌트는 함수형 컴포넌트로 작성하여 프로퍼티로 받은 내용을 표현하고 부모 컴포넌트로 부터 받은 함수 몇가지를 실행하는 역할을 합니다.  

상태 관리 라이브러리는 컴포넌트를 상태와 연결해줍니다. 상태 관리 계층과 연결된 컴포넌트를 Conneted Component라는 용어로 부르기도 합니다. 이 컴포넌트는 어떻게 보이는가는 신경쓰지 않지만 어떻게 동작하는 가를 집중하게 됩니다. 이런 컴포넌트가 바로 컨테이너 컴포넌트의 역할이빈다.


## Ref
- [해석](https://edykim.com/ko/post/learn-react-before-using-redux/)
- [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
- [React Context, Provider Pattern](https://www.robinwieruch.de/react-provider-pattern-context/)
- [HigherOrderComponents](https://www.robinwieruch.de/react-higher-order-components)
- [LiftingSateUp](https://reactjs.org/docs/lifting-state-up.html)
- [theOriginalText](https://www.robinwieruch.de/learn-react-before-using-redux/)
- [YouMightNotNeedRedux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)