# Rendering Optimization





## 재조정 피하기.
컴포넌트의 props나 state가 변경되면 리액트는 새로 반환된 엘리먼트를 이전에 렌더링된것과 비교해서 실제 돔을 업데이트의 필요여부를 결정합니다.  

일부 경우에서는 shouldComponentUpdate를 오버라이딩하여 최적화할 수 있습니다.  
이 라이프사이클함수는 컴포넌트가 리 랜더링되기 직전에 실행되는 함수입니다.  
일부 경우에 컴포넌트 업데이트가 필요없는 경우 false를 반환하여 이 컴포넌트를 포함한 하위 컴포넌트에서 호출하는 render함수를 스큅하여 렌더링 프로세스를 스킬할 수 있습니다. 

```js
shouldComponentUpdate(nextProps, nextState) {
  return true;
}
```

### shouldComponentUpdate 동작설명

![](../resource/img/etc/should-component-update.png)
이 컴포넌트 트리로 shouldComponentUpdate의 동작을 이해해보겠습니다. 이 트리에서 `SCU`는 shouldComponentUpdate의 반환값을 의미합니다. true를 반환하면 녹색, false를 반환하면 적색입니다.  
vDOMEq는 가상돔의 일치여부입니다. 녹색은 일치, 적색은 불일치입니다. 
따라서 shouldComponentUpdate 녹색 vDOMEq가 적색인 컴포넌트가 리렌더링의 대상이 됩니다.  

C2부터 보겠습니다 SCU가 적색임으로 이 컴포넌트를 포함한 서브트리는 리 렌더링을 하지 않습니다.  

C1, C3는 녹색임으로 가상돔을 비교합니다. C1, C3는 가상돔이 일치하지 않음으로 리 렌더링 대상이 됩니다. 또 하위 컴포넌트도 체크를 해봐야합니다. 하위컴포넌트중애서는 C6이 가상돔 불일치로 리렌더링이 됩니다.  

여기서 주목해야하는건 C8입니다.  
C3의 서브트리이기 때문에 가상돔을 비교했지만 변화된 내용이 없음으로 비교연산이 불필요합니다.  


### 예제
```js
class CounterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}

```
props.color, state.count를 기준으로 반환값을 결정했습니다.  
즉 이 값들이 변하지 않으면 컴포넌트 업데이트를 하지않습니다.  
이런 렌링여부 결정방법은 React.PureComponent에서 헬퍼함수를 제공하여 아랴처럼 작성할 수 있습니다.  
```js
class CounterButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}
```

하지만 복잡한 구조에서는 문제가 생길 수 있습니다.  
예를 들어, 버튼을 클릭해서 목록에 단어를 추가할 수 있는 부모 컴포넌트인 WordAdder 와 콤마로 구분된 목록인 단어를 렌더링하는 ListOfWords 컴포넌트가 있다고 합시다. 이 코드는 제대로 동작하지 않습니다.
```jsx
class ListOfWords extends React.PureComponent {
  render() {
    return <div>{this.props.words.join(',')}</div>;
  }
}

class WordAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: ['marklar']
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // This section is bad style and causes a bug
    const words = this.state.words;
    words.push('marklar');
    this.setState({words: words});
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick} />
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}
```
뭐가 문제일까요??  
문제는 PureComponent 컴포넌트가 this.props.words 의 이전 값과 신규 값을 얕은비교를 한다는 것입니다.  
즉 `this.state.words`의 레퍼런스가 동일하기 때문에 변경을 알아차릴 수 없습니다.  



### 변하지 않는 데이터
이 문제를 해결하기 위해선 state에 불변성이 있어야합니다.  
즉, 기존의 상태를 수정하는게 아니라 새로운 상태를 생성해야함을 말합니다.  
이 예제에서는 기존 배열에 인덱스를 추가하는 대신에 새로운 인덱스가 더해진 배열을 생성해야합니다.  
```js
handleClick() {
  this.setState(prevState => ({
    words: prevState.words.concat(['marklar'])
  }));
}

```
ES6의 spead문법으로 나타내면 더 간결해집니다.  
```js
handleClick() {
  this.setState(prevState => ({
    words: [...prevState.words, 'marklar'],
  }));
};
```

객체라면 Object.assign 메서드를 사용할 수 있습니다.  
```js
function updateColorMap(colormap) {
  return Object.assign({}, colormap, {right: 'blue'});
}
```
혹은 전개 연산자를 사용하면 됩니다.  
```js
function updateColorMap(colormap) {
  return {...colormap, right: 'blue'};
}
```

### 불변 데이터 구조 사용하기.


##  REF
- [React 렌더링 이해 및 최적화](https://medium.com/vingle-tech-blog/react-%EB%A0%8C%EB%8D%94%EB%A7%81-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-f255d6569849)
- [React 렌더링과 성능 알아보기](https://meetup.toast.com/posts/110)
- [성능 최적화](https://reactjs-kr.firebaseapp.com/docs/optimizing-performance.html)