# JSX

## Intro
자바스크립트의 확장 문법으로 번들링 과정에서 javascript문법으로 변환합니다.


```jsx
var a = (
    <div>
        <h1>Awesome
            <b>Reacot</b>
        <h1>
    </div>
)
```
위 코드를 바벨로 변환하면 다음 형식이 됩니다.


```js
var a = React.createElement(
    "div",
    null,
    React.createElement(
        "h1",
        null,
        "Awesome ",
        React.createElement(
            "b",
            null,
            "React"
        )
    )
);
```


## 1.특징
1. 보기 쉽고 익숙하다.

## 2.문법

### 2.1 감싸인 요소
컴포넌트에 여러 요소가 있다면 부모 요소 하나로 꼭 감싸야한다.  
감싸는 테그가 피룡한 이유는 Virtual Dom에서 컴포넌트 변화를 감지해 낼 때 효율적으로 비교할 수 있도록 컴포넌트 내부는 DOMㅌ트리 구조 하나여야 한다는 규칙이 있기 때문이다.

```jsx
render() {
    return ()
        <div>
            <h1>리액트 안녕!</h1>
            <h1>hellow React</h1>
        </div>
    )
})
```


### 2.2 Fragment
리액트 v16이상에서 Fragment컴포넌트가 도입되엇다. div같은 것으로 감싸지 않고 여러 요소를 렌더링 하고 싶을 때 사용할 수 있다.
```jsx
import React, { Component, Fragment } from 'react';

class App extends Component {
    render () {
        return (
            <Fragment>
                <h1>리액트 안녕!</h1>
                <h1>hellow React</h1>
            </Frgment>
        );
    }
}

export default App;
```


### 2.3 자바스크립트 표현
JSX 안에서 자바스크립트 표현식을 사용하는 방법이 있다. JSX 내부에서 코드를 `{}`로 감싸면 된다.
```jsx
import React, { Component, Fragment } from 'react';

class App extends Component {
    render () {
        const text = 'Hellow React!';
        return (
            <Fragment>
                <h1>리액트 안녕!</h1>
                <h1>{text}</h1>
            </Frgment>
        );
    }
}
export default App;
```

### 2.4 조건문 
JSX 내부의 자바스크립트 표현식에서 if문을 사용할 수 없습니다. 조건에 따라 다른 것을 렌더링 할 때는 JSX 밖에서 if문을 사용하여 작업하거나
`{}`내부에서는 삼항 연산자를 사용하면 된다.

```jsx
import React, { Component, Fragment } from 'react';

class App extends Component {
    render () {
        const text = 'Hellow React!';
        const condition = true;

        return (
            <Fragment>
                <h1>리액트 안녕!</h1>
                <h1>{text}</h1>
                {
                    condition ? '참' : '거짓'
                }
            </Frgment>
        );
    }
}
export default App;
```

### 2.5 &&를 사용한 조건부 랜더링
조건에 따라 DOM 요소를 랜더링하는 상황에서 다음과 같이 사용할 수 있습니다.
```js
import React, { Component, Fragment } from 'react';

class App extends Component {
    render () {
        const text = 'Hellow React!';
        const isLogged = true;

        return (
            <Fragment>
                <h1>리액트 안녕!</h1>
                <h1>{text}</h1>
                {
                    isLogged && <div>로그아웃</div>
                }
            </Frgment>
        );
    }
}
export default App;
```

### 2.6 인라인 스타일링
리액트에서 DOM 요소에 스타일링을 적용할 때는 문자열로 적용할 수 없습니다. 그 대신 CSS 스타일을 자바스크립트 객체 형식으로 만들어 적용해야합니다.  
스타일 속성명에서 자바스크립트의 객체키로 `-`을 사용할 수 없음으로 카멜표현식으로 작성됨을 기억해 주시기 바랍니다.

```jsx
import React, { Component, Fragment } from 'react';

class App extends Component {
    render () {
        const text = 'Hellow React!';
        const isLogged = true;
        const style = {
            backgroundColor: 'gray',
            border: '1px solid black',
            height: Math.round(Math.random() * 300) + 50;
            width: Math.round(Math.random() * 300) +50,
            WebkitTransition: 'all',
            MozTransition: 'all',
            msTransition: 'all'
        };

        return (
            <Fragment>
                <h1>리액트 안녕!</h1>
                <h1>{text}</h1>
                {
                    isLogged && <div>로그아웃</div>
                }
                <div style={style}/>
            </Frgment>
        );
    }
}
export default App;
```


### 2.7 class 대신 className
Dom 요소에 class를 지정하는 방법을 알아보겠습니다.  
리액트에서는 class 대신에 calssName 이라는 속성명을 사용해야하는데요. 자바스크립트에 class라는 예약어가 있기 때문입니다.

```css
/* src/App.css */
.my-div {
    background-color: aqua;
    font-size: 15px;
}
```

```js
/* src/App.js */
import React, { Component } from 'react';
import './App.css';

class App extends Component {
    render () {
        const text = 'Hellow React!';
        const isLogged = true;

        return (
            <div className = "my-div">
                <h1>리액트 안녕!</h1>
                <h1>{text}</h1>
                {
                    isLogged && <div>로그아웃</div>
                }
                <div style={style}/>
            </div>
        );
    }
}
export default App;
```


### 2.8 꼭 닫아야 하는 테그

HTML에서는 개행을 하는 테그인 `<br>`를 사용할 때 태그를 닫지 않아도 문제가 되지 않습니다  
하지만 JSX에서는 태그를 닫지 않으면 Virtual DOM에서 트리 형태의 구조를 만들지 못해서 오류가 발생합니다.  
따라서 항상 테그를 닫아주어야 합니다.

```jsx
<form>
    First name: <br/>
    <input type="text" name="firstname"/><br/>
    Last name: <br/>
    <input type="text" name="lastname"/>
</form>
```