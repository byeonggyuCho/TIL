# re-rendering

## Intro
렌더링 최적화에 대해 알아보자

- React.Memo
- React.Lazy

## React.memo
개발자가 지정한 Props가 바뀌었을때만 리렌더링해준다. 
```jsx
import React from 'react';

const User = React.memo(function User({ user, onRemove, onToggle }) {
  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black'
        }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
});

function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map(user => (
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default React.memo(UserList);
```
이 떄 이벤트핸들러를 동적으로 생성하도록 하면 랜더링이 될때마다 이 함수들이 생성되어 리랜더링이된다.  

useCalblack이나 useMemo등이 함수에 적용되어야한다. 그렇지 않으면 함수가 바뀌어서 리렌더링이 된다.  


```jsx
const onCreate = useCallback(() => {
  const user = {
    id: nextId.current,
    username,
    email
  };
  setUsers(users.concat(user));

  setInputs({
    username: '',
    email: ''
  });
  nextId.current += 1;
}, [users, username, email]);

const onRemove = useCallback(
  id => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    setUsers(users.filter(user => user.id !== id));
  },
  [users]
);
const onToggle = useCallback(
  id => {
    setUsers(
      users.map(user =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  },
  [users]
);
```
이렇게 할 경우 onCreate의 useCallback Depth에 users가 들어있기 때문에 
users가 변경될때마다 onCreate를 새로 생성합니다.  

이걸 막기 위해선 `함수형업데이트`를 사용하면 됩니다.  
이렇게 하면 setUsers에 최신 users를 전달해서 deps배열에 users를 빼도 됩니다.  

```jsx
import React, { useRef, useState, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });
  const { username, email } = inputs;
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setInputs(inputs => ({
      ...inputs,
      [name]: value
    }));
  }, []);
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
  ]);

  const nextId = useRef(4);
  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers(users => users.concat(user));

    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  }, [username, email]);

  const onRemove = useCallback(id => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    setUsers(users => users.filter(user => user.id !== id));
  }, []);
  const onToggle = useCallback(id => {
    setUsers(users =>
      users.map(user =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  }, []);
  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;
```
useCallback, useMemo, React.memo 각 기능은 리액트의 최적화를 위해 사용되는 기능이지만 불필요한 경우 연산낭비가 될 수 있습니다.  
따라서 실제로 연산을 줄일수 있는 곳에 사용해야합니다.  




## useSelector
스토어에서 관리중인 상탯값을 조회할 떄 useSelector를 사용합니다.  
그리고 이 값에 변화가 생겼을때 리렌더링이 발생하는데 이것을 최적화 할 수 있습니다.  
```js
const { number, diff } = useSelector(state => ({
  number: state.counter.number,
  diff: state.counter.diff
}));
```
이런 구조라면 항상 de-structure를 통해 항상 새로운 객체를 반환하기 때문에 상탯값의 변화를 확인하지 못하고 리렌더링을 수행합니다.  

이런 경우 각 상태값을 각각 따로 작성해주면 됩니다.  
```jsx
const number = useSelector(state => state.counter.number);
const diff = useSelector(state => state.counter.diff);
```
이 경우 각 상탯값이 변경되었을 때 렌더링이 발생합니다.  

다른 방법은 `react-redux`의 `shallowEqual`함수를 `useSelector`의 두번째 인자도 전달하면 됩니다.  
```jsx
import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease, setDiff } from '../modules/counter';

function CounterContainer() {
  // useSelector는 리덕스 스토어의 상태를 조회하는 Hook입니다.
  // state의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물과 동일합니다.
  const { number, diff } = useSelector(
    state => ({
      number: state.counter.number,
      diff: state.counter.diff
    }),
    shallowEqual
  );
```
`useSelector`의 두번째 파라미터는 equalityFn입니다.  
```ts
equalityFn?: (left: any, right: any) => boolean
```
이 두번째 파라미터로 전달한 함수의 반환값이 true면 리렌더링을 하지 않고 false면 리렌더링을 합니다.  
이전 값과 다음 값을 비교하여 true가 나오면 리렌더링을 하지 않고 false가 나오면 리렌더링을 합니다.
`shallowEqual`은 react-redux에 내장되어있는 함수로서, 객체 안의 가장 겉에 있는 값들을 모두 비교해줍니다.


## REF 
- [useSelect 최적화](https://react.vlpt.us/redux/08-optimize-useSelector.html)
- [React.memo](https://velog.io/@johnque/React.memo)
- [React.lazy](https://engineering.huiseoul.com/react-16-6-new-features-memo-lazy-etc-452c78ace739)
- [React.memo와 React.lazy](https://huurray.github.io/react/2018/12/10/react-memo/)