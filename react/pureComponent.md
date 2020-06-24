# pureComonent

## intro
- 이전 프레임의 state/props를 얕은 비교하여 리랜더링 여부를 결정한다.
- shouldComponentUpdate가 내부에 선언되어있다.
- 얕은 비교를 하기 때문에 불변성을 지켜야한다.
- 불필요한 재조정을 피해서 랜더링을 최적화하는 방법이다.  



## Ex

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

위 에에서 handleClick에 문제가 있다.  
words를 직접 변경하기 때문에 참조가 유지되어 얕은비교를 통과하게 된다.  

```jsx
  handleClick() {
    // This section is bad style and causes a bug
    const words = this.state.words;
    words.push('marklar');
    this.setState({words: words});
  }
```
다시 말해 재조정이 필요한 상황인데 재조정을 하지 않게 된다는 말이다.  
이런 경우 객체 불변성을 보장하기 위해 다음과 같이 바꾸면 해결된다.  

```jsx
handleClick() {
  this.setState(state => ({
    words: [...state.words, 'marklar'],
  }));
};
```