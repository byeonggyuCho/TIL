# evnet Delay

## intro
이벤트를 지연호출을 해서 최적화하는 방법을 소개한다.
1. throttle
2. debouncing
3. requestAnimationFrame

## Throttle

```jsx
import throttle from 'lodash.throttle';

class LoadMoreButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickThrottled = throttle(this.handleClick, 1000);
  }

  componentWillUnmount() {
    this.handleClickThrottled.cancel();
  }

  render() {
    return <button onClick={this.handleClickThrottled}>Load More</button>;
  }

  handleClick() {
    this.props.loadMore();
  }
}

```


## debouncing

```jsx
import debounce from 'lodash.debounce';

class Searchbox extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.emitChangeDebounced = debounce(this.emitChange, 250);
  }

  componentWillUnmount() {
    this.emitChangeDebounced.cancel();
  }

  render() {
    return (
      <input
        type="text"
        onChange={this.handleChange}
        placeholder="Search..."
        defaultValue={this.props.value}
      />
    );
  }

  handleChange(e) {
    // React는 이벤트를 모으기 때문에, debounce 하기 전에 값을 읽습니다.
    // `event.persist()`를 호출한 후 전체 이벤트를 전달하는 방법도 있습니다.
    // 더 상세한 내용은 reactjs.org/docs/events.html#event-pooling에 있습니다.
    this.emitChangeDebounced(e.target.value);
  }

  emitChange(value) {
    this.props.onChange(value);
  }
}

```


## requestAnimationFrame 




## REF
- [이벤트 바인딩이 필요한  이유](https://ko.reactjs.org/docs/faq-functions.html)