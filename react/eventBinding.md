# Arrow function

## TL;DR
- 리액트에서 화살표 함수를 사용하는 이유.
- 리액트에서 bind메서드를 사용하는 이유.
- 리액트는 strict모드에서 실행된다.  
- strict 모드에서 this값이 null 또는 undefined인 경우 전역객체(window)로 변환되지 않는다.

## 바인딩이 필요한 이유

```js
class Person {

    say(){
        console.log('say',this)
    }
}

var p1 = new Person();
var p2 = p1.say;

p1.say();
// Person {}
p2()
// undefined
```
이 처럼 this는 동적방인딩이 되기때문에 메서드를 다른 변수에 할당했을 때 this가 바뀌기 때문에 bind를 해야한다.   
 `따라서 다른 컴포넌트에 메서드를 전달해 줄 때는 바인딩을 해야한다. ` 





## 1.Bind
핸들러를 할당할 때 `bind`를 통해 this를 전달하지 않으면 null이 나온다.  
- bind메서드는 생성자 함수에서 하는게 좋다. Render 함수에서 할 경우 매번 새로운 함수를 생성하기 떄문이다.  


```jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Basic extends Component {
  constructor(props) {
    super(props);
    this.onClickButton = this.onClickButton.bind(this);
  }

  onClickButton() {
    console.log(this)
  }

  render() {
    return (
      <div>
        <button onClick={this.onClickButton}>클릭</button>
      </div>
    );
  }
}

export default Basic;
```
이 코드에서 `this.onClickButton = this.onClickButton.bind(this);`를 해주는 이유가 뭘까요?  
이유는 Reder 메소드에서 `this.onClickButton`을 호출할 때 함수의 this가 `undefined`이기 때문입니다.  

그럼 다시 왜 이  때 this가 `undefined`가 될까요?  
해당 코드의 실행환경을 알아야하는데 `this.onClickButton`가 실행되는 순간 즉시실행함수로 
`(function() { this.setState(() => ({ hidden: true })); })();`실행되기 때문입니다.  
이때 의 this는 window지만 리액트에서는 엄격모드(strict mode)에서 실행되기 떄문에  `undefined`가 됩니다.


## arrow function
이 기능을 이용하면 bind함수로 래핑하는 작업을 간소화 할 수 있습니다.   
이 문법은 바벨에서 제공하는 [babel-plugin-transform-class-properties](https://babeljs.io/docs/en/babel-plugin-transform-class-properties/)이다.
```jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Basic extends Component {
  constructor(props) {
    super(props);
    this.onClickButton = this.onClickButton.bind(this);
  }

  onClickButton = () => {
    console.log(this)
  }

  render() {
    return (
      <div>
        <button onClick={this.onClickButton}>클릭</button>
      </div>
    );
  }
}

export default Basic;
```




## REF
- [이벤트 바인딩이 필요한  이유](https://ko.reactjs.org/docs/faq-functions.html)
- [Understanding JavaScript Bind](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/)
- [understading java script this](https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/)