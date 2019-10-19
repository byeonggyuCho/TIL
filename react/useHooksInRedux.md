# redux Hooks


## Info
기존에는 react-redux에서 connect로 redux-store에 연결했었지만 Hook을 사용하면 컴포넌트 내부에서 Store에 쉽게 접근할 수 있다.


## 1. useSelector
이 Hook을 통하여 redux Store의 상태에 접근할 수 있다.

```js
const result : any = useSelector(selector : Function,  deps : any[])
```
여기서 selector는 기존의 connect를 사용 할 때 `mapStateToProps`와 비슷하다고 생각하면 된다. deps배열은 어떤 값이 바뀌었을 때 selector를 재정의 할 지 설정해준다.
deps 값을 생략하면 매번 렌더링 될 때마다 selector 함수도 새로 정의된다. 기존의 `useCallback`이나 `useMemo`에서의 deps랑 동일하다고 보면 된다.  
selector함수를 선언하는데 큰 리소스가 들어가지 않기 때무에 기본적으로 deps를 넣지 않아도 큰 문제는 없다. 최적화를 위해서 두번째 파라미터에 `[]`를 넣는 것이 좋다.


## 2.useDispatch
`useDispatch`는 컴포넌트 내에서 dispatch를 사용할 수 있게 해준다.
```js
import {useDispatch} from 'react-redux';
const dispatch = useDispatch();
```

```js
import React from 'react'
import { useDispatch } from 'react-redux'

export const CounterComponent = ({ value }) => {
  const dispatch = useDispatch()

  return (
    <div>
      <span>{value}</span>
      <button onClick={() => dispatch({ type: 'increment-counter' })}>
        Increment counter
      </button>
    </div>
  )
}
```

## 3. useStore
`useStore`은 컴포넌트 내에서 store을 사용할 수 있게 해준다.
```js
import {useStore} from 'react-redux'
const store = = useStore();
```

```js
import React from 'react'
import { useStore } from 'react-redux'

export const CounterComponent = ({ value }) => {
  const store = useStore()

  // EXAMPLE ONLY! Do not do this in a real app.
  // The component will not automatically update if the store state changes
  return <div>{store.getState()}</div>
}
```




### ref
- [react-redux에 Hooks적용하기](https://velog.io/@velopert/react-redux-hooks)
- [reactDoc-Hook](https://react-redux.js.org/next/api/hooks#recipe-useactions)