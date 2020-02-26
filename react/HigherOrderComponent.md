# HigherOrderComponent

## Info
컴포넌트도 함수처럼 재사용할 수 있다. 컴포넌트 기능 상에서도, 자주 반복되는 코드들이 나타날 수 있다.  
이런 코드들을 고차 컴포넌트를 만들어 해결할 수 있다. 고차 컴포넌트는 하나의 함수다. 함수를 통해 컴포넌트에 우리가 준비한 특정 기능을 부여한다.  
컨테이너 프리젠테이셔널 컴포넌트 패턴에 익숙하다면 고차컴포넌트는 기능이 추가된 컨테이너 컴포넌트를 반환하는 함수라고 이해할 수 있다.



## 고차컴포넌트는 기능을 덫붙이는 컨테이너 함수입니다.
```js
class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      // "DataSource" is some global data source
      comments: DataSource.getComments()
    };
  }

  componentDidMount() {
    // Subscribe to changes
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    // Clean up listener
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    // Update component state whenever the data source changes
    this.setState({
      comments: DataSource.getComments()
    });
  }

  render() {
    return (
      <div>
        {this.state.comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    );
  }
}
```


```js
class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      blogPost: DataSource.getBlogPost(props.id)
    };
  }

  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    this.setState({
      blogPost: DataSource.getBlogPost(this.props.id)
    });
  }

  render() {
    return <TextBlock text={this.state.blogPost} />;
  }
}
```
CommentList는 댓글목록을 랜더링하는 컴포넌트 입니다. BlogPost는 포스팅 목록을 랜더링하죠.  
두 컴포넌트는 data 목록을 랜더링한다는 추상적인 기능을 공유합니다. 이런것들이 고차 컴포넌트로 리팩토링할만한 부분입니다.  

1. 마운트되면, change 리스너를 DataSource에 추가합니다.
2. 리스너 안에서, 데이터 소스가 변경되면 setState를 호출합니다.
3. 마운트 해제되면 change 리스너를 제거합니다

위 과정에서 보듯이 DataSource를 구독하고 setState 를 호출하는 패턴이 반복되고 있습니다.  
공통화의 대상이죠! 


각 컴포넌트에 DataSource를 구독하는 기능을 부여하는 함수를 만들어 보겠습니다.  
```js
const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource) => DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id)
);
```
첫번째 파라미터는 래핑될 대상 컴포넌트를 넣고 두번째 파라미터는 DataSource에서 관심있는 데이터를 반환하는 함수를 전달합니다. 

```jsx
// This function takes a component...
function withSubscription(WrappedComponent, selectData) {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      // ... that takes care of the subscription...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}
```

주의할 것은 원본 컴포넌트는 수정이나 상속을 하지 않았다는 겁니다.  고차 컴포넌트는 원본 컴포넌트를 래핑하여 기능을 추가하는 역할을 하는 순수함수입니다. 




## 원본 함수를 변형하면 안됩니다.  
```jsx
function logProps(InputComponent) {
  InputComponent.prototype.componentWillReceiveProps = function(nextProps) {
    console.log('Current props: ', this.props);
    console.log('Next props: ', nextProps);
  };
  // The fact that we're returning the original input is a hint that it has
  // been mutated.
  return InputComponent;
}

// EnhancedComponent will log whenever props are received
const EnhancedComponent = logProps(InputComponent);
```
이 패턴에는 문제점이 있습니다.  
원본 컴포넌트가 변형된다는 것과 또다른 고차컴포넌트를 사용할때 `componentWillReceiveProps`를 오버라이드하면 `logProps`에서 부여한 기능이 사라진다는 것이죠.  
고차컴포넌트의 핵심은 원본 컴포너트를 변경하지 않고 추상화를 통하여 기능을 추가하는 것입니다. 
그러기위해 원본 컴포넌트를 컨테이너 컴포넌트로 래핑해야합니다.  

```jsx
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentWillReceiveProps(nextProps) {
      console.log('Current props: ', this.props);
      console.log('Next props: ', nextProps);
    }
    render() {
      // Wraps the input component in a container, without mutating it. Good!
      return <WrappedComponent {...this.props} />;
    }
  }
}
```
이제 prototype을 수정했던 버전과 같은 기능을 하면서 충돌가능성이 없어졌습니다.  
그리고 순수 함수 이기 때문에 다른 고차함수를 사용할 수도 있습니다.



## 주의사항

### render메서드 안에서 고차 컴포넌트를 사용하면 안된다.

React의 비교 알고리즘은 컴포넌트 ID를 사용하여 기존 서브트리를 업데이트해야할지 버리고 새로운 노드를 마운트해야 하는지를 결정합니다.  
render 에서 반환된 컴포넌트가 기존 렌더링된 컴포넌트와 동일하다면 React가 새 트리와 비교하여 반복적으로 서브트리를 업데이트합니다. 
만약 동일하지 않다면 이전 서브트리는 완전히 마운트 해제됩니다.
```js
render() {
  // A new version of EnhancedComponent is created on every render
  // EnhancedComponent1 !== EnhancedComponent2
  const EnhancedComponent = enhance(MyComponent);
  // That causes the entire subtree to unmount/remount each time!
  return <EnhancedComponent />;
}
```
여기서 컴포넌트가 다시 마운트 되면 기존 컴포넌트의 state와 하위 항목이 날아갑니다.  
따라서 컴포넌트 정의 외부에서 컴포넌트를 적용하여 컴포넌트가 한번만 생성되게 해야합니다.  
그래야 컴포넌트 ID가 랜더링간 유지 됩니다.  


### 정적 메서드는 복사해야한다. 
리액트 컴포넌트에서 정적 메서드를 사용할 때가 있는데 고차 컴포넌트를 사용할 때는 정적 메서드를 복사해야합니다. 

```js
// Define a static method
WrappedComponent.staticMethod = function() {/*...*/}
// Now apply a HOC
const EnhancedComponent = enhance(WrappedComponent);

// The enhanced component has no static method
typeof EnhancedComponent.staticMethod === 'undefined' // true
```

일차적으로 이렇게 직접 레퍼런스를 복사하는 방법이 있습니다.
```js
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  // Must know exactly which method(s) to copy :(
  Enhance.staticMethod = WrappedComponent.staticMethod;
  return Enhance;
}
```
일일이 복사하는게 번거롭다면 hoist-non-react-statics를 이용해 일괄 복사하는 방법도 있습니다. 
```js
import hoistNonReactStatic from 'hoist-non-react-statics';
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  hoistNonReactStatic(Enhance, WrappedComponent);
  return Enhance;
}
```

아니면 정적 메서드를 별도로 export하는 방법도 있습니다
```js
// Instead of...
MyComponent.someFunction = someFunction;
export default MyComponent;

// ...export the method separately...
export { someFunction };

// ...and in the consuming module, import both
import MyComponent, { someFunction } from './MyComponent.js';
```


## Ref
- [HOC](https://velopert.com/3537)
- [higher-order-components](https://reactjs.org/docs/higher-order-components.html)
- [리액트 HOC 집중 탐구](https://meetup.toast.com/posts/137)
- [리액트 HOC 집중 탐구_2](https://meetup.toast.com/posts/144)