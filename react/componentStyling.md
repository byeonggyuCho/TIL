# Styling in React

## intro

React에서는 전역 CSS 네임스페이스를 피하기위한 여러가지 방법이 있다.  
전통적인 웹에서도 항상 CSS class네임은 골칫거리였고 BEM등의 방법을 도입하기도 했다.  
React에서는 이 문제를 어떻게 해결하는지 알아본다.

    클레스명 중복을 어떻게 피할것인가?

## CSS 임포트

컴포넌트에 `import "./App.css";`를 선언하면 해당 css가 적용된다.

```jsx
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
```

```css
.App {
  text-align: center;
}

.App-logo {
  animation: App-logo-spin infinite 20s linear;
  height: 40vmin;
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

## CSS 계층구조를 이용해 스타일 선언하기.

하나의 기준이 되는 클래스를 선언하고 그 클래스를 기준으로 계층구주로 접근하는 방식입니다.  
클래스명이 과도하게 생기는것을 막을 수 있습니다.

```css
.App {
  text-align: center;
}

/*.App 안에 들어있는 .logo*/
.App .logo {
  animation: App-logo-spin infinite 20s linear;
  height: 40vmin;
}

/* .App 안에 들어있는 header */
.App header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

/* .App 안에 들어있는 a 태그 */
.App a {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

```jsx
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <img src={logo} className="logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
```

## Sass 이용하기

## CSS Module

CSS Module 은 CSS 클래스를 불러와서 사용 할 때 [파일이름]\_[클래스이름]\_\_[해쉬값] 형태로 클래스네임을 자동으로 고유한 값으로 만들어주어서 컴포넌트 스타일 중첩현상을 방지해주는 기술입니다. 이를 사용하기 위해선, [파일이름].module.css 이런식으로 파일을 저장하셔야 합니다.

```css
/* src/CSSModule.module.css */
.wrapper {
  background: black;
  padding: 1rem;
  color: white;
  font-size: 2rem;
}

/* 글로벌 CSS 를 작성하고 싶다면 */

:global .something {
  font-weight: 800;
  color: aqua;
}
```

```jsx
import React from "react";
import styles from "./CSSModule.module.css";
const CSSModule = () => {
  return (
    <div className={styles.wrapper}>
      안녕하세요, 저는 <span className="something">CSS Module!</span>
    </div>
  );
};

export default CSSModule;
```

### classNames

classNames 는 CSS 클래스를 조건부로 설정 할 때 매우 유용한 라이브러리입니다. 그리고, CSS Module 을 사용 할 때 이 라이브러리를 함께 사용 한다면 여러 클래스를 적용할 때 편해집니다.

```js
import classNames from "classnames";

classNames("one", "two"); // 'one two'
classNames("one", { two: true }); // 'one two'
classNames("one", { two: false }); // 'one'
classNames("one", ["two", "three"]); // 'one two three'

const myClass = "hello";
classNames("one", myClass, { myCondition: true }); //'one hello myCondition'
```

Before

```jsx
const MyComponent = ({ highlighted, theme }) => {
  <div className={`MyComponent ${theme} ${highlighted ? "highlighted" : ""}`}>
    Hello
  </div>;
};
```

After

```jsx
const MyComponent = ({ highlighted, theme }) => {
  <div className={classNames("MyComponent", { highlighted }, theme)}>
    Hello
  </div>;
};
```

2. Sass  
   자주 사용되는 CSS 전처리기 중 하나이며, 확장된 CSS 문법들을 통하여 CSS 코드를 더욱 용이하게 작성하고, 추가적으로 이를 CSS Module 처럼 사용하는 방법도 알아보겠습니다.
3. CSS in jS  
   styled-components:요즘 인기있는 컴포넌트 스타일링 방식 중 하나인, JS 코드 내부에서 스타일을 정의하는 방식입니다

## CSS-in-JS

자바스크립트 파일 안에 CSS 를 작성하는 형태입니다.

```jsx
import React from "react";
import styled, { css } from "styled-components";

const Box = styled.div`
  /* props 로 넣어준 값을 직접 전달해줄 수 있습니다. */
  background: ${(props) => props.color || "blue"};
  padding: 1rem;
  display: flex;
`;

const Button = styled.button`
  background: white;
  color: black;
  border-radius: 4px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 600;

  /* & 문자를 사용하여 Sass 처럼 자기 자신 선택 가능 */
  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }

  /* 다음 코드는 inverted 값이 true 일 때 특정 스타일을 부여해줍니다. */
  ${(props) =>
    props.inverted &&
    css`
      background: none;
      border: 2px solid white;
      color: white;
      &:hover {
        background: white;
        color: black;
      }
    `};
  & + button {
    margin-left: 1rem;
  }
`;

const StyledComponent = () => (
  <Box color="black">
    <Button>안녕하세요</Button>
    <Button inverted={true}>테두리만</Button>
  </Box>
);

export default StyledComponent;
```

## ref

- https://velopert.com/3447s
- https://velog.io/@velopert/react-component-styling
