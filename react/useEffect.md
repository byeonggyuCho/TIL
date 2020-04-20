# UseEffect


## intro
단순히 life cycle과 일대일 매칭이되는 hook으로 생각하다가 삽질을 해서 포스팅을 해야겠다는 생각이 들었다.
내가 겪은 문제는 useEffect로 componentDidMount시점의 로직을 작성할때 mount시점에 로직이 실행된다는 점이다.  
예를 들어 초기 랜더링 시점에는 실행되지 않고 update시점에만 실행되는 로직을 어떻게 useEffect를 이용해 구현할것인가? 하는 부분이다.  
이밖에 effect에 대한 개념과 함께 자세히 알아보자.


## 이런 경우 어떻게 처리할까?
- componentDidUpdate 와 componentDidMount를 구분해야할 때.
- componentDidUpdate시에만 실행되는 로직이 필요할떄.


## sideEffect란?
React 컴포넌트가 화면에 렌더링된 이후에 비동기로 처리되어야 하는 부수적인 효과들을 흔히 Side Effect라고 일컽습니다.  
대표적인 예로 어떤 데이터를 가져오기 위해서 외부 API를 호출하는 경우, 일단 화면에 렌더링할 수 있는 것은 먼저 렌더링하고 실제 데이터는 비동기로 가져오는 것이 권장됩니다.  
초기렌더링을 보장함으로써 연동하는 API가 응답이 늦어지거나 응답이 없을 경우에도 영향을 최소화 시킬 수 있어서 사용자 경험 측면에서 유리하기 때문입니다.


## useEffect에서 Effect란?
useEffect에서 Effect는 useEffect에 전달하는 함수를 말합니다.  
useEffect는 컴포넌트의 렌더링 이후시점에 실행되는데 이후에 컴포넌트에서 발생하는 side effect에 대한 처리를 이 함수(effect)에서 한다는 취지입니다.  
Hook의 관점은 컴포넌트의 생명주기가 아니라 코드의 목적에 있습니다.  
즉 어떤 effect를 처리할 것인가를 useEffect를 사용해 서술하는 것입니다.  
effect를 여러개 정의한 경우 선언순서에 따라 처리됩니다.

### 정리 
- class형 컴포넌트는 작업을 언제 수행해야할까? 에 포커스
- useEffect는 뭘 처리할까에 포커스
- effect는 컴포넌트 랜더링 이후에 일어나는 로직을 정의한 함수
- 랜더링 이후에 데이터조회, 이벤트핸들러 등록, 돔 조작, 타이머, 로깅, 사이드 이팩트를 Effect를 정의하여 처리
- 라이프 사이클 관점이 아니라 로직의 행위에 포커스를 두어 로직을 나눌 수 있다.


```jsx
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  // ...
}
```
위 코드를 보면 관심사에 따라 useEffect를 두번 써서 나눈 것을 알 수 있습니다.



## uesEffect는 동기적으로 실행된다. 
useEffect는 브라우저가 화면을 업데이트하는 것을 블로킹하지 않는다.  
만약 레이아웃 측정 등의 목적으로 동기적 실행이 필요한 경우 useLayoutEffect를 사용하면된다. 


## cleanUp
cleanUp은 컴포넌트가 리랜더링 되는 시점에 발생합니다.  
클래스형 컴포넌트만을 사용했다면 왜 마운트 해제시점이 아니라 모든 리렌더링 시점에 실행이 될까? 궁금할 수 있다.  
이는 cleanup이 개별적인 effect에 대한 후처리 작업이라는 관점에서 이해해야 한다.  
useEffect는 effect라는 목적에 포커스를 두기 때문에 그 행위마다 각각의 cleanup로직이 필요하다.  
즉 `subscribe`라는 로직이 필요할 때 하나의 effect를 정의하고 이에 대한 cleanup을 정의하는 식이다.  
```jsx
function FriendStatus(props) {
  // ...
  useEffect(() => {
    // ...
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
```
컴포넌트의 라이프사이클 중심 사고가 아니라 effect를 선언하여 관심사를 분리한다는 관점에서 접근해야한다.  



## Effect 최적화
선언한 모든 effect가 랜더링 시점에 실행된다면 불필요한 로직이 실행되는 경우가 생긴다.  
클래스형 컴포넌트에서는 이런 문제를 componentDidUpdate함수의 prevProps와 prevState 매개변수를 통해 비교하여 해결했다.  
```js
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```
useEffect는 해당 effect를 발생시킬 값을 구독하여 그 값이 변할때만 effect를 실행시키도록 할 수 있다.  
```js
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // count가 바뀔 때만 effect를 재실행합니다.
```
이런식으로 두번째 인자로 배열에 변화를 감지해서 effect를 발생시킬 항목을 전달하면 이 값이 변할 때만 effect를 실행합니다.  
배열에 여러개의 값을 전달할 경우 하나의 값만 변경되도 effect를 실행합니다.  
이때 주의사항이 있는데 이 배열에 effect에서 실행되는 모든 값을 포함시켜야 한다는 것입니다.  
그렇지 않을 경우 이전 렌더링시점의 값을 참조하게 됩니다.  

이 최적화 방법을 응용해 componentDidMount와 componentWillUnmount시점을 잡을 수 있습니다.  
구독 배열을 빈값으로 넘기게되면 구독값이 없기 때문에 re-rendering시점에는 effect가 실행되지 않습니다.  


- list of dependencies

## 리랜더링 시점에만 동작하는 로직이 필요하다면?
class Component에서 componentDidMount, componentDidUpdate시점을 분리하여 리랜더링 시점에만 동작하는 코드를 작성할 수 있다.  

## 참고

1. ComponentDidMount

```js
// Class
class Example extends React.Component {
    componentDidMount() {
        ...
    }
}

// Hook
const Example = () => {
    useEffect(() => {
        ...
    }, []);
}
```

2. ComponentWillUnmount
```js
// Class
class Example extends React.Component {
    componentWillUnmount() {
        ...
    }
}

// Hook
const Example = () => {
    useEffect(() => {
        return () => {
            ...
        };
    }, []);
}

```


3. ComponentWillReceiveProps


```js
// Class
class Example extends React.Component {
    componentWillReceiveProps(nextProps) {
        ...
    }
    or
    UNSAFE_componentWillReceiveProps(nextProps) {
        ...
    }
}

// Hook
const Example = (props) => {
    const { value } = props;
    useEffect(() => {
        ...
    }, [value]);
}
```


4. ShouldComponentUpdate

```js
// Class
class Example extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.value !== this.props.value;
    }
}

/* 
class 컴포넌트의 shouldComponentUpdate() 메서드와 달리, areEqual 함수는 props들이 서로 같으면 true를 반환하고, props들이 서로 다르면 false를 반환합니다. 이것은 shouldComponentUpdate와 정반대의 동작입니다.
 */
// Hook
const Example = React.memo(() => {
    ...
}, (prevProps, nextProps) => {
    return nextProps.value === prevProps.value;
})
```

5. ComponentDidUpdate
```js
// Class
class Example extends React.Component {
    componentDidUpdate(prevProps, prevState) {
        ...
    }
}

// Hook
const Example = () => {
    useEffect(() => {
        ...
    });
}
```

## 추가
1. compoenentWillMount 시점, 렌더링 이전 시점에 대한 로직이 필요한경우에는?
2. shouldComponentUpdate


## ref
- [a-complete-guide-to-useeffect](https://rinae.dev/posts/a-complete-guide-to-useeffect-ko#tldr-too-long-didnt-read---%ec%9a%94%ec%95%bd) 
- [useEffect](https://www.daleseo.com/react-hooks-use-effect/)
- [whatIsDifferentUseEffectAndComponentDidUpdate](https://linguinecode.com/post/react-componentdidupdate-vs-useeffect) 
- [참고](https://ko.reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often)
- [참고2](https://salgum1114.github.io/reactjs/2019-11-28-react-class-equivalents/)
- [react-component-lifecycle-methods-vs-hooks](https://tsh.io/blog/react-component-lifecycle-methods-vs-hooks/)
- [getting-started-with-react-useeffect](https://linguinecode.com/post/getting-started-with-react-useeffect)