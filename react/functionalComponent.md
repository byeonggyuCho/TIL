# how-are-function-components-different-from-classes


## intro
아 글은 [함수형 클래스형 어떻게 다른가](https://overreacted.io/ko/how-are-function-components-different-from-classes/)에 대한 개인적인 정리 글입니다.  

이 포스팅에선 각 패턴의 장단점이 아닌 구조적 차이에서 나오는 특징을 설명합니다.  



## 함수형 컴포넌트는 렌더링된 값들을 고정시킨다.
간단한 컴포넌트를 통해 비교해 보겠습니다.  


함수형
```js
function ProfilePage(props) {
  const showMessage = () => {
    alert('Followed ' + props.user);
  };

  const handleClick = () => {
    setTimeout(showMessage, 3000);
  };

  return (
    <button onClick={handleClick}>Follow</button>
  );
}
```

클래스형
```js
class ProfilePage extends React.Component {
  showMessage = () => {
    alert('Followed ' + this.props.user);
  };

  handleClick = () => {
    setTimeout(this.showMessage, 3000);
  };

  render() {
    return <button onClick={this.handleClick}>Follow</button>;
  }
}
```
간단히 설명하면 클릭하면 전달받은 prop를 alert으로 띄워주는 버튼 컴포넌트입니다.  
근데 얼핏 같은 기능을 하는 것 처럼 보이는 두 컴포넌트는 약간의 차이가 있습니다.


## 문제점
시나리오를 생각해 봅시다.  
클래스 형 컴포넌트의 경우 다음의 시나리오대로 진행됩니다.  
1. ProfilePage에 `"Dan"`을 전달합니다.  
`<ProfilePage user={"Dan"}/>`
2. 이제 ProfilePage를 클릭합니다.
3. 이벤트 핸들러가 응답하기전에 prop에 새로운 값을 전달합니다.  
`<ProfilePage user={"Sophie"}/>`
4. alert에 `"Dan"`이 아닌 `"Sophie"`가 나왔습니다.  

이런 현상이 생기는 이유는 클래스형 컴포넌트가 this를 통해 변경된 prop를 반영받기 때문입니다.  
보다 지세히 말하면 이 경우 this 바인딩이 끊겨서 새로 갱신된 값을 불러왔기 때문이죠.

정상적인 시나리오라면 이벤트 핸들러는 트리거된 시점의 상태값이 기록되어 있다가 비동기 작업이 끝났을 때 사용이되어야합니다.  
즉 현재 브라우저에 랜더링된 결과물이 현재 애플리케이션의 상태를 반영하고 있으며 이벤트 핸들러 역시 랜더링 결과물에 종속되어 있어야합니다. 

하지만 위 예에서는 화면과 이벤트 핸들러 간의 종속성이 깨지고 새로운 prop를 출력했다. 
```js
  handleClick = () => {
    setTimeout(() => {
        alert('Followed ' + this.props.user);
    }, 3000);
  };
```
이 부분에서 setTimeout의 인자로 전달한 콜백함수에서 this바인딩이 깨진것이다.  
클래스형 컴포넌트에서 이 문제를 해결하려면 어떻게 해야할까?


### Sol) 이전 상태 기록하기
```js
class ProfilePage extends React.Component {
  showMessage = (user) => {
    alert('Followed ' + user);
  };

  handleClick = () => {
    const {user} = this.props;
    setTimeout(() => this.showMessage(user), 3000);
  };

  render() {
    return <button onClick={this.handleClick}>Follow</button>;
  }
}
```
값을 기록한 뒤 콜백함수가 참도하도록 할 수 있다.

**한계**
- 코드를 복잡하게 만드며 시간이 지날수록 에러에 노출될 가능성이 높아진다. 
- 여러 개의 prop에 접근해야 하거나 state까지 접근해야 하면 코드의 복잡도가 이에 비례하게 증가할 것이다
- 코드를 쉽게 쪼갤 수 있으면서 호출했을 때의 props와 state를 유지할 수 있는 구조를 찾아야 한다.


### Sol2) 클로저
```js
class ProfilePage extends React.Component {
  render() {
    // props의 값을 고정!
    const props = this.props;

    // Note: 여긴 *render 안에* 존재하는 곳이다!
    // 클래스의 메서드가 아닌 render의 메서드
    const showMessage = () => {
      alert('Followed ' + props.user);
    };

    const handleClick = () => {
      setTimeout(showMessage, 3000);
    };

    return <button onClick={handleClick}>Follow</button>;
  }
}
```
props 값을 render될 때의 값으로 고정해둔 것이다.  
클로저 안에 있는 코드들은 render될 당시의 props를 그대로 사용할 수 있다.  
뭐 이렇게 하면 문제는 해결되지만 이렇게 까지해서 클래스 형을 고집할 이유가 있을까하는 생각이 든다.  

다시 함수형으로 돌아와 보자.
```js
function ProfilePage(props) {
  const showMessage = () => {
    alert('Followed ' + props.user);
  };

  const handleClick = () => {
    setTimeout(showMessage, 3000);
  };

  return (
    <button onClick={handleClick}>Follow</button>
  );
}

```
값이 인자로 전달됐기 때문에 props는 보존된다.  
클래스의 this와는 다르게, 함수가 받는 인자는 리액트가 변경할 수 없다.  
만약 부모 컴포넌트가 다른 props를 이용해 ProfilePage를 또 다시 render하게 되면 리액트는 ProfilePage를 새로 호출한다.  
그래도 이전에 클릭했던 버튼의 이벤트 핸들러는 이전 render에 종속돼있기 때문에 이전의 user값들을 사용하게된다. 그 값들은 변경되지 않기 때문이다.


## 만약 변경될 다음 상태값을 사용하고싶다면?
ref를 이용하면 함수형 프로그래밍에서 최신 변경값을 사용할 수 있다.

```js
function MessageThread() {
  const [message, setMessage] = useState('');
  const latestMessage = useRef('');

  const showMessage = () => {
    alert('You said: ' + latestMessage.current);
  };

  const handleSendClick = () => {
    setTimeout(showMessage, 3000);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    latestMessage.current = e.target.value;
  };

```



## 결론
1. 함수형 컴포넌트는 현재 애풀리케이션의 상태 값을 기록한다.  
2. 클래스형에서도 같은 연출이 가능하지만 구조가 복잡해지기 때문에 굳이 클래스형을 고집할 이유가 없다.

## REF

- [how-are-function-components-different-from-classes](https://overreacted.io/how-are-function-components-different-from-classes/)