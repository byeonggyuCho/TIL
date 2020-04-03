# Hook



## 사전지식
- 함수형 컴포넌트


## Intro
state의 라이프 사이클을 다루기 위해서 Class를 사용해왔다.  
그러나 기존의 클래스형 컴포넌트에는 여러 문제점이 있었는데 그 문제점은 다음과 같다.
1. 로직을 재사용이 어렵다
2. 코드가 길고 복잡하다.
    - construnctor,this,binding
    - Life Cycle Method로 인한 복잡성.
3. 성능.

이러한 기존 문제점들을 해결하기 위해 Hook이 Class없이 React의 기능을 사용할 수 있게 나왔다. 
Hook을 적용하여 얻을 수 있는 장점은 아래와같다.

1. 작성해야할 코드가 줄어든다.
2. 가독성이 좋다.
3. 재사용 가능한 로직을 쉽게 만들 수 있다.
4. 정적 타입 언어로 타입을 정의하기 쉽다.

정리하자면 Hook를 이용한 함수형 컴포넌트는 기존의 리액트 상태와 라이프사이클 특성을 없앨 수 있게 도와준다. 

## Rules of Hooks
### 1. Top-level에서만 Hook을 사용하세요
루프, 조건문, 중첩된 함수에서 훅을 사용하지 마세요.  
훅은 리액트 함수의 최상위 레벨에서만 사용해야합니다. 이 규칙을 지킴으로써 훅이 컴포넌트가 렌더링될 때마다 동일한 순서로 호출되는걸 보장할 수 있습니다. 

### 2. Hook은 리액트 함수에서만 호출해야합니다.
Hook을 일반 자바스크립트 함수에서 호출하지 마세요.  
Hook이 호출될 수 있는 곳은 두가지 뿐입니다.
- 리액트 함수 컴포넌트
- 커스텀 Hooks



## Method

### 1. useState
useState는 함수형 컴포넌트에서도 가변적인 상태를 지니고 있을 수 있게 해준다.  
이제 우리는 Hook을 사용해 Class없이 함수만으로 state를 처리할 수 있다.  
예제를 통해 Hook을 적용했을때 코드가 어떻게 달라지는 지 알아보자.  


`클래스형 컴포넌트`
```js
import React from "react";

class Counter extends React.Component {  
  constructor(props) {
    // 리액트의 컴포넌트와 연결하기 위해 super를 사용합니다.
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        // 버튼을 누르면 count의 숫자가 올라가게 state를 교체한다.
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}

```

`함수형 컴포넌트`
```js
import React, { useState } from 'react';

// ES6버전에서 사용하는 화살표 함수를 사용했습니다.
const Counter = () => {
  // 새로운 state 변수를 선언하고, count라 부르겠습니다.
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

한 눈에봐도 코드가 간결해진 것을 알 수있다.  
`useState`는 state변수와 해당 변수를 갱신할 수 있는 함수를 쌍으로 반환한다.

위 예제에서 사용된 `배열 구조분해`를 풀어서 보면 이렇다.
```js
//사이즈가 2인 배열을 반환한다.
const countSateVariable = useState(0);
//0인덱스는 state 변수이며 초기값은 useState의 인수이다.
const count = countSateVariable[0];
//1인데스는 state 변수를 갱신할 수 있는 함수다.
const setCount = countSateVariable[1];
```


### 2.useEffect
`useEffect`는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 할 수 있는 Hook이다.  
클래스형 컴포넌트의 `componentDidMount`와 `componentDidUpdate`를 합친 형태로 이해해도 무방하다.  


```js
import React, { useState, useEffect } from 'react';

const Info = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  useEffect(() => {
    console.log('렌더링이 완료되었습니다!');
    console.log({
      name,
      nickname
    });
  });

  const onChangeName = e => {
    setName(e.target.value);
  };

  const onChangeNickname = e => {
    setNickname(e.target.value);
  };

  return (
    (...)
  );
};

export default Info;
```


#### 2.1 componentDidMount 시점에만 실행하고 싶을 때.
초기 렌더링 시점에만 실행하고 componentDidUpdate 시점에는 실행하고 싶지 않을 때는 함수의 두번째 파라미터로 비어있는 배열을 넣으면 된다.  

```js
useEffect(() => {
    console.log('마운트 될 때만 실행됩니다.');
  }, []);
```


#### 2.2 특정 상태값이 업데이트 시점에만 실행하고 싶을때.

만약 클래스형 컴포넌트였다면 다음과 같이 했을 것이다.  
```js
componentDidUpdate(prevProps, prevState) {
  if (prevProps.value !== this.props.value) {
    doSomething();  
  }
```
이 코드를 `useEffect`를 적용하면 어떻게 해야할까?  
`use Effect`의 두번째 파라미터로 전달되는 배열 안에 검사하고 싶은 값을 넣어주면 된다.  


```js
  useEffect(() => {
    console.log(name);
  }, [name]);
```


#### 2.3 cleanup
`useEffect`는 기본적으로 렌더링 되고난 직후에 실행됩니다.  
두번쨰 파라미터 배열에 무엇을 넣느냐에 따라 실행 조건이 달라집니다.

만약 컴포넌트가 언마운트되기 전이나, 업데이트 되기 직전에 어떠한 작업을 수행하고 싶으면 `useEffect`에서  `cleanup`합수를 반환해 주어야합니다.

```js
useEffect(() => {
    console.log('effect');
    console.log(name);
    return () => {
      console.log('cleanup');
      console.log(name);
    };
  });
```

만약 언마운트 될 때만 `cleanup`을 호출하고 싶으면 `useEffect`함수의 두번째 파라미터에 비어있는 배열을 넣으면 됩니다.

```js
useEffect(() => {
    console.log('effect');
    console.log(name);
    return () => {
      console.log('cleanup');
      console.log(name);
    };
  }, []);
```



### 3.useContext
이 Hook을 사용하면 함수형 컴포넌트에서 Context를 보다 쉽게 사용할 수 있습니다.  

#### ContextSample.js
```js
import React, { createContext, useContext } from 'react';

const ThemeContext = createContext('black');
const ContextSample = () => {
  const theme = useContext(ThemeContext);
  const style = {
    width: '24px',
    height: '24px',
    background: theme
  };
  return <div style={style} />;
};

export default ContextSample;
```

#### App.js
```js
import React from 'react';
import ContextSample from './ContextSample';

const App = () => {
  return <ContextSample />;
};

export default App;
```




### 4. useReducer
`useReducer`는 `useState`보다 컴포넌트에서 더 다양한 상황에 따라 다양한 상태를 다른 값으로 업데이트 해주고 싶을 때 사용하는 Hook다.  
Reducer는 현재 상태와 업데이트를 위해 필요한 정보를 담은 액션값을 전달 받아 새로운 상태를 반환하는 함수입니다.  
리듀서 함수에서 새로운 상태를 만들 때는 꼭 불변성을 지켜줘야한다.  

```js
function reducer(state, action){
    return {};  //불변성을 지키면서 업데이트한 새로운 상태를 반환합니다.
}
```

액션값은 주로 다음과 같은 형태로 이루어져 있습니다.
```js
{
    type: 'INCREMENT'
}
```

Redux에서는 액션객체에는 어떤 액션인지 알려주는 type필드가 꼭 있어야한다.  
하지만 `useReducer`에서 사용하는 액션 객체는 꼭 type을 지니고 있을 필요가 없다.  
심지어 객체가 아니라 문자열이나 숫자여도 상관없다.


#### 4.1 카운터 구현하기
기존의 Counter 컴포넌트를 `useReducer`를 사용해 수정해보자.

##### counter.js
```js

import React, { useReducer } from 'react';

function reducer(state, action) {
  // action.type 에 따라 다른 작업 수행
  switch (action.type) {
    case 'INCREMENT':
      return { value: state.value + 1 };
    case 'DECREMENT':
      return { value: state.value - 1 };
    default:
      // 아무것도 해당되지 않을 때 기존 상태 반환
      return state;
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0 });

  return (
    <div>
      <p>
        현재 카운터 값은 <b>{state.value}</b> 입니다.
      </p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
    </div>
  );
};

export default Counter;
```
`useReducer`의 첫번째 파라미터는 리듀서 함수, 두번째 파라미터는 해당 리듀서의 기본값이다.  
이 Hook을 사용하면 state값과 dispatch 함수를 받아오게 되는데 여기서 state는 현재 가르키고 있는 상태고, dispatch는 액션을 발생시키는 함수다.  
dispatch와 같은 형태로, 함수 안에 파라미터로 액션 값을 넣어주면 리듀서 함수가 호출되는 구조다.

`useReducer`를 사용했을 때 가장 큰 장점은 컴포넌트 업데이터 로직을 컴포넌트 바깥으로 빼낼 수 있다는 점이다.  


코드를 테스트해보자.
```js
import React from 'react';
import Counter from './Counter';

const App = () => {
  return <Counter />;
};

export default App;
```

#### 4.2 인풋 상태 관리하기.
이번에는 `useReducer`를 사용하여 Info 컴포넌트에서 인풋상태를 관리해보자.  

기존에는 인풋이 여러개여서 `useSate`를 여러번 사용했다.  
`useReducer`를 사용하면 우리가 기존에 클래스형 컴포넌트에서 input 태그에 name을 할당하고 e.target.name을 참조하여 setSate를 해준 것과 유사한 방식으로 작업을 처리할 수 있다.


##### Info.js
```js
import React, { useReducer } from 'react';

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value
  };
}

const Info = () => {
  const [state, dispatch] = useReducer(reducer, {
    name: '',
    nickname: ''
  });
  const { name, nickname } = state;
  const onChange = e => {
    dispatch(e.target);
  };

  return (
    <div>
      <div>
        <input name="name" value={name} onChange={onChange} />
        <input name="nickname" value={nickname} onChange={onChange} />
      </div>
      <div>
        <div>
          <b>이름:</b> {name}
        </div>
        <div>
          <b>닉네임: </b>
          {nickname}
        </div>
      </div>
    </div>
  );
};

export default Info;
```

`useReducer`에서의 액션은 그 어떤 값이되어도 된다.  
그래서 이번에 우리는 이벤트 객체가 지니고있는 e.target 값 자체를 액션값으로 사용했다.  

이런 식으로 인풋을 관리하면, 아무리 인풋 개수가 많아도 코드를 짧고 깔끔하게 유지 할 수 있다.  
코드를 다 작성했으면 App.js에서 확인을 해보자.

```js
import React from 'react';
import Info from './Info';

const App = () => {
  return <Info />;
};

export default App;
```


### 5. useMemo
메모리제이션을 편리하게 사용하기 위한 hook이다.  
첫번째 파라미터로 전달하는 함수의 반환값을 기록하는 용도이다.  
두번째 파라미터로 전달된 배열에는 타겟 연산에 의존성이 있는 값의 목록을 전달한다. 
useMemo를 사용하면 함수형 컴포넌트 내부에서 발생하는 연산을 최적화 할 수 있다.  
먼저 리스트에서 숫자들을 추가하면 해당 숫자들의 평균을 나타내는 함수형 컴포넌트를 작성해보자.


**Average.js**
```js
import React, { useState } from 'react';

const getAverage = numbers => {
  console.log('평균값 계산중..');
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState('');

  const onChange = e => {
    setNumber(e.target.value);
  };
  const onInsert = e => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber('');
  };

  return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균 값:</b> {getAverage(list)}
      </div>
    </div>
  );
};

export default Average;
```

테스트를 해보자.

```js
import React from 'react';
import Average from './Average';

const App = () => {
  return <Average />;
};

export default App;
```

위 로직에서는 인풋 내용이 바뀔떄마다 getAverage함수가 호출된다.  
`useMemo`를 사용하면 이런 불필요한 연산을 줄이고 최적화 할 수 있다.  
렌더링 하는 과정에서 특정 값이 바뀌었을 때만 연산을 실행하고 만약에 원하는 값이 아니라면 이전에 연산했던 결과를 다시 사용하는 방식이다.  
수정된 코드는 다음과 같다.

*Average.js*
```js
import React, { useState, useMemo } from 'react';

const getAverage = numbers => {
  console.log('평균값 계산중..');
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState('');

  const onChange = e => {
    setNumber(e.target.value);
  };
  const onInsert = e => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber('');
  };

  const avg = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균 값:</b> {avg}
      </div>
    </div>
  );
};

export default Average;
```
이제는 list배열의 내용이 바뀔 때에만 getAverage 함수가 호출된다.  
useMemo로 전달된 함수는 렌더링 중에 실행된다. 렌더링중에는 하지 않는 작업은 useMemo를 사용하면 안된다.  
예를들어 데이터를 요청하는 비동기 작업은 렌더링이 끝난시점에 실행되어야 하기 때문에 useEffect에서 사용하는 것이 맞다.  

두번째 파라미터로 넘기는 의존성 데이터목록에 빈 배열을 넘기면 렌더링 시점마다 연산을 새로한다.  
함수에 전달되는 모든 값은 의존성 값의 배열에 전달해야한다. 

### 6.useCallback
useCallback은 메모리제이션을 이용해 이벤트핸들러를 메모리에 기록하는 용도로 사용하여 최적화를 할 수 있다.
메모리제니션을 한다는 점에서 `useCallback`은 `useMemo`와 상당히 비슷하다.  
주로 렌더링 성능을 최적화해야 하는 상황에서 사용하는데, 이 Hook을 사용하면 이벤트 핸들러 함수를 필요할 때만 생성할 수 있다.  
우리가 방금 구현한 Average 컴포넌트를 보면, onChange와 onInsert라는 함수를 선언해주었다.  
이렇게 선언하게 되면 컴포넌트가 리랜더링 될 때마다 이 함수들이 새로 생성된다.  
대부분의 경우에는 이러한 방식이 문제가 되지 않지만 컴포넌트의 렌더링이 자주 발생하거나 렌더링 해야할 컴포넌트의 개수가 많아진다면 이 부분을 최적화 해주는 것이 좋다.

```js
import React, { useState, useMemo, useCallback } from 'react';

const getAverage = numbers => {
  console.log('평균값 계산중..');
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState('');

  const onChange = useCallback(e => {
    setNumber(e.target.value);
  }, []); // 컴포넌트가 처음 렌더링 될 때만 함수 생성
  const onInsert = useCallback(
    e => {
      const nextList = list.concat(parseInt(number));
      setList(nextList);
      setNumber('');
    },
    [number, list]
  ); // number 혹은 list 가 바뀌었을 때만 함수 생성

  const avg = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <input value={number} onChange={onChange}  />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값:</b> {avg}
      </div>
    </div>
  );
};

export default Average;
```
`useCallback`에는 첫번째 파라미터에 생성하고싶은 함수를 넣고, 두번째 파라미터에는 배열을 넣어주면 되는데 이 배열에는 어떤 값이 바뀌었을 때 함수를 새로 생성해주어야 하는지 명시해주어야한다.  

만약 onChange처럼 비어있는 배열을 넣게 되면 컴포넌트가 렌더링 될 때 단 한번만 함수가 생성된다.  
이점이 `useMemo`와 다르다.  
onInsert처럼 배열 안에 number와 list를 넣게 되면 인풋 내용이 바뀌거나 새로운 항목이 추가 될 때마다 함수가 생성된다.  

함수 내부에서 기존의 상태 값을 의존해야 할 때는 꼭 두번째 파라미터 안에 포함을 시켜주어야 한다.
예를 들어 onChange의 경우엔 기존의 값을 조회하는 일이 없고 바로 설정만 하기 떄문에 배열이 비어있어도 상관없지만 onInsert는 기존 number와 list를 조회해서 nextList를 생성하기 때문에 배열 안에 number와 list를 꼭 넣어야한다.


다음 두 코드는 완벽히 똑같은 코드다.
```js
useCallback(() => {
  console.log('hello world!');
}, [])

useMemo(() => {
  const fn = () => {
    console.log('hello world!');
  };
  return fn;
}, [])
```
`useCallback`은 결국 `useMemo`에서 함수를 반환하는 상황에서 더 편하게 사용할 수 있는 Hook이다. 숫자, 문자열, 객체처럼 일반 값을 재사용하기 위해서는 `useMemo`를, 그리고 함수를 재사용 하기 위해서는 `useCallback`을 사용하면 된다.



### 7.useRef
`useRef`는 함수형 컴포넌트에서 ref를 쉽게 사용 할 수 있게 해준다.  
Average 컴포넌트에서 등록 버튼을 눌렀을 때 포커스가 인풋 쪽으로 넘어가도록 코드를 작성해 보자.

```js
import React, { useState, useMemo, useRef } from 'react';

const getAverage = numbers => {
  console.log('평균값 계산중..');
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState('');
  const inputEl = useRef(null);

  const onChange = useCallback(e => {
    setNumber(e.target.value);
  }, []); // 컴포넌트가 처음 렌더링 될 때만 함수 생성
  const onInsert = useCallback(
    e => {
      const nextList = list.concat(parseInt(number));
      setList(nextList);
      setNumber('');
      inputEl.current.focus();
    },
    [number, list]
  ); // number 혹은 list 가 바뀌었을 때만 함수 생성


  const avg = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <input value={number} onChange={onChange} ref={inputEl} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균 값:</b> {avg}
      </div>
    </div>
  );
};

export default Average;
```
`useRef`를 사용하여 ref를 설정하면 `useRef`를 통해 만든 객체 안에 current 값이 실제 엘리먼트를 가르키게 된다.



#### 7.1 로컬 변수 사용하기
컴포넌트 로컬 변수를 사용해야 할 때도 `useRef`를 활용할 수 있다. 여기서 로컬변수는 렌더링이랑은 관계 없이 바뀔 수 있는 값을 의미한다. 만약에 클래스 형태의 컴포넌트로 따지면 다음과 같은 코드다.

```js
import React, { Component } from 'react';

class MyComponent extends Component {
  id = 1
  setId = (n) => {
    this.id = n;
  }
  printId = () => {
    console.log(this.id);
  }
  render() {
    return (
      <div>
        MyComponent
      </div>
    );
  }
}

export default MyComponent;
```
위 코드를 함수형 컴포넌트로 작성하면 다음 처럼 작성할 수 있다.

```js
import React, { useRef } from 'react';

const RefSample = () => {
  const id = useRef(1);
  const setId = (n) => {
    id.current = n;
  }
  const printId = () => {
    console.log(id.current);
  }
  return (
    <div>
      refsample
    </div>
  );
};

export default RefSample;
```
주의할 점은 이렇게 넣은 ref안의 값은 바뀌어도 컴포넌트가 렌더링 되지 않는다는 점이다.
렌더링과 관련되지 않은 값을 관리할 때만 이러한 방식으로 코드를 작성하는게 좋다.


## 미지원 기능
- getSnapshotBeforeUpdate
- componentDidCatch

## 유의점
- 테스트 [참고](https://edykim.com/ko/post/react-hooks-whats-going-to-happen-to-my-tests/)


### REF
- [hook에대한 고찰](https://ddwroom.tistory.com/75)
- [hooks-state](https://ko.reactjs.org/docs/hooks-state.html)
- [리액트의 Hooks 완전 정복하기.](https://velog.io/@velopert/react-hooks)
- [React의 새로운 패러다임 Hooks](https://velog.io/@vies00/React-Hooks)
- [Hooks](https://ko.reactjs.org/docs/hooks-reference.html)
- [React - Functional Component의 장점, Hook](https://boxfoxs.tistory.com/395)