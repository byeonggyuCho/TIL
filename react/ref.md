# Ref와 Dom

## intro

React 컴포넌트인스턴스가 아니라 리얼 DOM 엘리먼트에 접근하고 싶을때 사용한다.

## 언제쓰나?

- 포커스, 텍스트 선택영억, 혹은 미디어의 재생을관리할 때
- 애니메이션을 직접적으로 실행시킬 떄
- 서드 파티 돔 라이브러리를 리액트와 같이 사용할 때 (차트 플레이어등))
- 특정 돔의 스크롤 위치를 가져오거나 설정해야 할.

하지만 선언적으로 해결될 수 있는 문제는 ref의 사용을 지양해야합니다.
ref의 사용은 사이드이팩트를 만들 수 있습니다. 따라서 한정적인 용도로 꼭 필요한 상황에서 사용하는게 중요합니다.

## Ref 생성하기

React.createRef로 생성하고 타겟 리액트 엘리먼트의 ref 속성에 추가한다.

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```

## Ref에 접근하기

해당 노드에 대한 참조는 ref의 current에 담긴다.

```js
const node = this.myRef.current;
```

## 유형에 따른 ref

1. HTML 엘리먼트  
   생성자에서 React.createRef()로 생성된 ref는 자신을 전달받은 DOM엘리먼트를 current프로퍼티의 값으로 받는다.

2. 커스텀 클래스형 컴포넌트  
   ref 객체는 마운트된 컴포넌트의 인스턴스를 current 프로퍼티의 값으로 받는다.

3. 함수형 컴포넌트  
   함수형 컴포넌트는 인스턴스가 없기 떄문에 ref를 사용할 수 없다.

## 예제

### Dom 엘리먼트에 Ref 사용하기.

```jsx
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // textInput DOM 엘리먼트를 저장하기 위한 ref를 생성합니다.
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // DOM API를 사용하여 명시적으로 text 타입의 input 엘리먼트를 포커스합니다.
    // 주의: 우리는 지금 DOM 노드를 얻기 위해 "current" 프로퍼티에 접근하고 있습니다.
    this.textInput.current.focus();
  }

  render() {
    // 타겟 Dom 엘리먼트의 ref 속성에 생성한 this.textInput을 입력합니다.
    // 이제 해당 객체를 통해서 돔에 접근할 수 있습니다.
    return (
      <div>
        <input type="text" ref={this.textInput} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

컴포넌트가 마운드 될때 React는 current 프로퍼티에 돔 엘리먼트를 대입하고 컴포넌트가 마운트 해제될 떄 current 프로퍼티를 null로 돌려놓는다.  
ref에 대한 수정작업은 componentDidMount또는 ComponentDidUpdate 생명주기 메서드가 호출되기 전에 이뤄진다.

### 클래스 컴포넌트에 Ref사용하기.

자식 컴포넌트의 메서드를 부모메서드에서 호출할 수 있다.  
다음 상황은 customTextInput 컴포넌트의 인스턴스가 마운트된 뒤 부모 컴포넌트은 AutoFocusTextInput에서 ref를 이용해 focusTextInput 메서드에 접근하는 상황이다.

```jsx
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focusTextInput();
  }

  render() {
    return <CustomTextInput ref={this.textInput} />;
  }
}
```

단 이 로직은 CustomTextInput이 클래스형 컴포넌트일 때만 작동한다.

### 함수형 컴포넌트.

함수형 컴포넌트에서 ref를 사용하려면 클래스형 컴포넌트로 전환하거나 `forwardRef`, useImperativehandle을 함께 사용해야합니다.  
함수형 컴포넌트에서 ref를 통해 클래스형 컴포넌트의 인스턴스에 접근하는 것은 가능합니다.  
useRef hook은 내부적으로 `createRef()`를 이용합니다.

```jsx
function CustomTextInput(props) {
  // textInput은 ref 어트리뷰트를 통해 전달되기 위해서
  // 이곳에서 정의되어야만 합니다.
  const textInput = useRef(null);

  function handleClick() {
    textInput.current.focus();
  }

  return (
    <div>
      <input type="text" ref={textInput} />
      <input type="button" value="Focus the text input" onClick={handleClick} />
    </div>
  );
}
```

아래는 forwardRef를 이용해서 함수형 컴포넌트에 접근하는 예제입니다.

```jsx
import React, { forwardRef, useRef } from "react";

const User = () => {
  const idReferenece = useRef();
  const passwordReference = useRef();

  // ...

  return (
    <form>
      <LabelInput text="id:" type="text" ref={idReference} />
      <LabelInput text="password:" type="password" ref={passwordReference} />
    </form>
  );
};

const LabeledInput = forwardRef(({ text, type }, ref) => (
  <label>
    {text}
    <input type={type} ref={ref} />
  </label>
));
```

예제에서 보듯이 forwardRef를 감싸줘야합니다.

## 부모 컴포넌트게 DOM ref 공개하기.

부모 컴포넌트에서 자식컴포넌트의 DOM 노드에 접근하려는 경우가 있을 수 있습니다.  
이런 상황은 컴포넌트의 캡슐화를 피과하는 방법이기 때문에 권장하지는 않습니다. 하지만 자식 컴포넌트의 DOM노드를 포커스하는 일이나 크기 또는 위치를 계산하느 일 등을 할 때 사용될 수 있습니다.

자식 컴포넌트에 ref 프로퍼티를 사용할 수 있지만 이건 DOM노드가 아니라 컴포넌트의 인스턴스를 가져옵니다. 또 자식 컴포넌트가 함수형 컴포넌트일 경우 동작하지 않죠.  
리액트 16.3이후 버전에서는 ref forwarding을 사용하면 됩니다. REF 전달하기는 컴포넌트가 자식 컴포넌트의 ref를 자신의 ref로서 외부에 노출시키게 합니다.  
자세한 내용은 [이 글](https://ko.reactjs.org/docs/forwarding-refs.html#forwarding-refs-to-dom-components)을 참고해주시길 바랍니다.  
그 이전 버전에서는 이런 [대안](https://gist.github.com/gaearon/1a018a023347fe1c2476073330cc5509)이 있습니다.  
다시한번 말하지만 가능하면 DOM노드를 외부에 공개하는 일을 지양해야합니다. 이는 자식 컴포넌트의 코드 수정이 필요하게 되는데 만약 코드를 수정할 수 없으면 findDomNode()라는 방법이 있지만
권장하지 않는 방법이며 StricMode에서는 사용이 불가능합니다.

## 콜백 REF

Ref가 설정되고 해제디ㅗ는 상황을 자세하게 다룰 수 있는 콜백 ref라는 Ref설정방법이 있습니다.

콜백 ref는 ref어트리뷰트에 react.createRef()를 통해 생성된 객체를 전달하는 대신 함수를 전달합니다.  
이 함수는 리액트 컴포넌트의 인스턴스나 dom 에릴먼트를 인자로 받습니다.

```jsx
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);

    this.textInput = null;

    this.setTextInputRef = (element) => {
      this.textInput = element;
    };

    this.focusTextInput = () => {
      // DOM API를 사용하여 text 타입의 input 엘리먼트를 포커스합니다.
      if (this.textInput) this.textInput.focus();
    };
  }

  componentDidMount() {
    // 마운트 되었을 때 자동으로 text 타입의 input 엘리먼트를 포커스합니다.
    this.focusTextInput();
  }

  render() {
    // text 타입의 input 엘리먼트의 참조를 인스턴스의 프로퍼티
    // (예를 들어`this.textInput`)에 저장하기 위해 `ref` 콜백을 사용합니다.
    return (
      <div>
        <input type="text" ref={this.setTextInputRef} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

컴포넌트의 인스턴스가 마운트 될 때 리액트는 ref 콜백을 돔 엘리먼트와 함께 호출합니다. 그리고 인스턴스의 마운트가 해제될 때 ref콜백을 null과 함께 호출합니다.  
ref콜백들은 componentDidMount 또는 componentDidUpdate가 호출되기 전에 호출됩니다.

콜백 ref 또한 React.createRef()를 통해 생성했었던 객체 ref와 같이 다른 컴포넌트에게 전달할 수 있습니다.

```jsx
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  render() {
    return <CustomTextInput inputRef={(el) => (this.inputElement = el)} />;
  }
}
```

위 예에서 Parent는 자신의 콜백ref를 CustomTextInput에 inputRef prop로 전달합니다.
그리고 CustomTextInput은 전달받은 함수를 input 돔 엘리먼트에 ref어트리뷰트로 전달합니다.  
결과적으로 Parent의 this.inputElement가 CustomTextInput의 input엘리먼트에 대응하는 DOM노드가 됩니다.

## ref

- [react docs](https://ko.reactjs.org/docs/refs-and-the-dom.html)
- [ref with hooks](https://velog.io/@marvin-j/React-ref-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
- [useRef](https://velog.io/@public_danuel/trendy-react-useref)
