# class Component 

## intro
이제는 함수형 컴포넌트가 더 대중적이지만 때떄로 클래스형 컴포넌트를 써야할 경우가 있습니다.  
그리고 형수형 컴포넌트도 내부적으로 클래스형 컴포넌트가 랩핑된 것이기 때문에 클래스 컴포넌트의 동작을 이해하는것이 여러모로 도움이 됩니다.  



## 클래스형 컴포넌트 만들기
```jsx
import React, { Component } from 'react';

class Hello extends Component {
  render() {
    const { color, name, isSpecial } = this.props;
    return (
      <div style={{ color }}>
        {isSpecial && <b>*</b>}
        안녕하세요 {name}
      </div>
    );
  }
}

Hello.defaultProps = {
  name: '이름없음'
};

export default Hello;
```



1. React.Component  
클래스형 컴포넌트는 `React.Component`를 상속받아 선업합니다.  
이 클래스 안에 라이프사이클 메서드와 렌더함수가 선언되어 있습니다.  

2. Render function  
또 눈에 띄는 차이가 render함수인데 render함수가 JSX를 자바스크립트로 변환합니다.  

3. props
props는 `this.props`를 통해 접근합니다.  

4. this
컴포넌트의 인스턴스를 가르킵니다.  

5. super(props)
`React.Component`의 속성과 메서드를 상속받습니다.  
상속을 받아야 lifeCycle메서드와 render함수를 사용할 수 있습니다.   


## 기본값 설정하기.

기본값 설정에는 두가지 방법이 있습니다.  
첫번째로 `stitic`키워드와 함꼐 사용하는 방법이 있습니다.  
```jsx
import React, { Component } from 'react';

class Hello extends Component {
  static defaultProps = {
    name: '이름없음'
  };
  render() {
    const { color, name, isSpecial } = this.props;
    return (
      <div style={{ color }}>
        {isSpecial && <b>*</b>}
        안녕하세요 {name}
      </div>
    );
  }
}

export default Hello;
```

다른 방법으로는 함수형 컴포넌트와 마찬가지로 `defaultProps`에 등록하면 됩니다.

```jsx
import React, { Component } from 'react';

class Hello extends Component {
  render() {
    const { color, name, isSpecial } = this.props;
    return (
      <div style={{ color }}>
        {isSpecial && <b>*</b>}
        안녕하세요 {name}
      </div>
    );
  }
}

Hello.defaultProps = {
  name: '이름없음'
};

export default Hello;
```



## 메서드 만들기.
```jsx
import React, { Component } from 'react';

class Counter extends Component {
  handleIncrease() {
    console.log('increase');
  }

  handleDecrease() {
    console.log('decrease');
  }

  render() {
    return (
      <div>
        <h1>0</h1>
        <button onClick={this.handleIncrease}>+1</button>
        <button onClick={this.handleDecrease}>-1</button>
      </div>
    );
  }
}

export default Counter;
```
이런식으로 커스텀 메서드를 등록할 수 있습니다.  
메서드는 인스턴스에 포함되기 때문에 `this`를 통해 접근해야합니다.  
클래스형 컴포넌트에서 메서드를 사용할 때 한가지 문제가 있습니다. 메서드 내부에서 this가 인스턴스를 참조하지 않는 문제입니다.  
메서드를 dom 이벤트로 등록하는 과정에서 바인딩이 끊기게 되는데 이 문제는 3가지 방법으로 해결할 수 있습니다.  


*1. bind*  
```jsx
import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.handleIncrease = this.handleIncrease.bind(this);
    this.handleDecrease = this.handleDecrease.bind(this);
  }

  handleIncrease() {
    console.log('increase');
    console.log(this);
  }

  handleDecrease() {
    console.log('decrease');
  }

  render() {
    return (
      <div>
        <h1>0</h1>
        <button onClick={this.handleIncrease}>+1</button>
        <button onClick={this.handleDecrease}>-1</button>
      </div>
    );
  }
}

export default Counter;
```

*2. 화살표함수 사용하기.*
```jsx
import React, { Component } from 'react';

class Counter extends Component {
  handleIncrease = () => {
    console.log('increase');
    console.log(this);
  };

  handleDecrease = () => {
    console.log('decrease');
  };

  render() {
    return (
      <div>
        <h1>0</h1>
        <button onClick={this.handleIncrease}>+1</button>
        <button onClick={this.handleDecrease}>-1</button>
      </div>
    );
  }
}

export default Counter;
```
화살표 함수를 이용해 메서드를 구현하는 것은 `class-properties`라는 문법인데 이 문법은 자바스크립트의 정식 문법이 아니라. CRA로 만든 프로젝트에서만 사용할 수 있는 문법입니다.  


*3. 이벤트 핸들러를 직접 선언하기*
```jsx
return (
  <div>
    <h1>0</h1>
    <button onClick={() => this.handleIncrease()}>+1</button>
    <button onClick={() => this.handleDecrease()}>-1</button>
  </div>
);
```
마지막 방법은 직접 선언하는 방법인데 이렇게 할 경우에 렌더링할 때마다 함수가 새로 만들어지고 가독성도 덜어지기 때문에 잘 사용하진 않는 방법입니다.  

## 상태선언하기.
```jsx
import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
  }
  handleIncrease = () => {
    console.log('increase');
    console.log(this);
  };

  handleDecrease = () => {
    console.log('decrease');
  };

  render() {
    return (
      <div>
        <h1>{this.state.counter}</h1>
        <button onClick={this.handleIncrease}>+1</button>
        <button onClick={this.handleDecrease}>-1</button>
      </div>
    );
  }
}

export default Counter;
```
상태를 선언할 떄는 `constructor`에서 `this.state`에 객체형태로 등록을 합니다.  
`class-properties`문법을 사용하면 this바인딩이 연결되어 있기 때문에 `constructor`내부에 선언할 필요가 없습니다.  

```jsx
import React, { Component } from 'react';

class Counter extends Component {
  state = {
    counter: 0
  };
  handleIncrease = () => {
    console.log('increase');
    console.log(this);
  };

  handleDecrease = () => {
    console.log('decrease');
  };

  render() {
    return (
      <div>
        <h1>{this.state.counter}</h1>
        <button onClick={this.handleIncrease}>+1</button>
        <button onClick={this.handleDecrease}>-1</button>
      </div>
    );
  }
}

export default Counter;
```


## 상태 업데이트
```jsx
import React, { Component } from 'react';

class Counter extends Component {
  state = {
    counter: 0
  };
  handleIncrease = () => {
    this.setState({
      counter: this.state.counter + 1
    });
  };

  handleDecrease = () => {
    this.setState({
      counter: this.state.counter - 1
    });
  };

  render() {
    return (
      <div>
        <h1>{this.state.counter}</h1>
        <button onClick={this.handleIncrease}>+1</button>
        <button onClick={this.handleDecrease}>-1</button>
      </div>
    );
  }
}

export default Counter;
```
`this.setState`를 통해 상태를 업데이트 할 수 있습니다.  
이때 알아야할 점이 몇가지 있습니다.  
*1. setState는 비동기로 실행된다.*   
```jsx
import React, { Component } from 'react';

class Counter extends Component {
  state = {
    counter: 0,
    fixed: 1
  };
  handleIncrease = () => {
    this.setState(state => ({
      counter: state.counter + 1
    }));
    this.setState(state => ({
      counter: state.counter + 1
    }));
  };

  handleDecrease = () => {
    this.setState(state => ({
      counter: state.counter - 1
    }));
  };

  render() {
    return (
      <div>
        <h1>{this.state.counter}</h1>
        <button onClick={this.handleIncrease}>+1</button>
        <button onClick={this.handleDecrease}>-1</button>
        <p>고정된 값: {this.state.fixed}</p>
      </div>
    );
  }
}

export default Counter;
```
`handleIncrease`에서 처럼 setState를 연속적으로 호출하면 상탯값 업데이트를 보장할 수 없다.  



*2. 상탯값을 객체형태일 경우 불변성을 위해 업데이트를 해줘야합니다.*   
```jsx
state = {
  counter: 0,
  fixed: 1,
  updateMe: {
    toggleMe: false,
    dontChangeMe: 1
  }
};

handleToggle = () => {
  this.setState({
    updateMe: {
      ...this.state.updateMe,
      toggleMe: !this.state.updateMe.toggleMe
    }
  });
};
```


*3. 상탯값을 연속으로 업데이트를 할 경우에는 함수형으로 업데이트 해야한다.*   
```jsx
import React, { Component } from 'react';

class Counter extends Component {
  state = {
    counter: 0,
    fixed: 1
  };
  handleIncrease = () => {
    this.setState(state => ({
      counter: state.counter + 1
    }));
  };

  handleDecrease = () => {
    this.setState(state => ({
      counter: state.counter - 1
    }));
  };

  render() {
    return (
      <div>
        <h1>{this.state.counter}</h1>
        <button onClick={this.handleIncrease}>+1</button>
        <button onClick={this.handleDecrease}>-1</button>
        <p>고정된 값: {this.state.fixed}</p>
      </div>
    );
  }
}

export default Counter;
```