# Typescript


## intro
리액트 환경에서 타입스크립트를 적용하는 팁과 구간을 정리해본다.

## Component

### useState 
```jsx
type Information = { name: string; description: string };
const [info, setInformation] = useState<Information | null>(null);
```
useState를 사용하여 상태를 지정할때 제네릭을 이용해 이렇게 지정할 수 있습니다.  
null을 허용하려면 유니온 타입을 사용하면 됩니다. 


### Presentinal Component
```tsx
interface TagsProps {
  tags : string[]
}

const Tags:React.FC<TagsProps> = ({ tags }) => {
  return (
    <TagsBlock>
      {tags.map(tag => (
        <Link className="tag" to={`/?tag=${tag}`} key={tag}>
          #{tag}
        </Link>
      ))}
    </TagsBlock>
  );
}; 
```
프리젠테이셔널 컴포넌트에서 타입 체크를 하는 부분입니다.  
props에 올바른 값이 전달됐는지 확인합니다.  

### Container Component
```tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../actions/user';
import {RootState} from '../../reducers'
import {Dispatch} from'redux'

const HeaderContainer = () => {
  const dispatch:Dispatch = useDispatch();
  const { user } = useSelector(({ user }:RootState) => ({ user: user.user }));
  const onLogout = () => {
    dispatch(logout());
  };
  return <Header user={user} onLogout={onLogout} />;
};
```
컨테이너 컴포넌트에서는 스토어에 접근하기 때문에 스토어에 등록된 모든 state의 타입정보가 필요합니다.  
그게 `RootState`입니다.  


*reducers/index.ts*
```ts
const rootReducer = combineReducers({
  auth,
  loading,
  user,
  write,
  post,
  posts,
});


export type RootState = ReturnType<typeof rootReducer>;
```
reducers/index.ts에서 모든 리듀서를 Combine한뒤 타입을 뽑아내야합니다.  



## Redux
### Action
```ts
const INCREASE = 'counter/INCREASE' as const;
const DECREASE = 'counter/DECREASE' as const;
const INCREASE_BY = 'counter/INCREASE_BY' as const;
```
뒤에 `as const`를 붙여줍니다. 이렇게 되면 변수의 타입이 `string`이 아니라 문자리터럴 타입이 됩니다.  
즉 INCREASE의 타입이 string이 아닌 `counter/INCREASE`이 되어 다른 string타입과 구분이 됩니다.  
이 부분이 reducer에서 액션의 타입을 구분할때 이용됩니다.  

### Actions Creator
```ts
export const changeField = createAction(CHANGE_FIELD,
  (form:{form:string,key:string,value:string})=> form  
)();
```
여기서 해줄 작업은 action의 payload타입을 지정하는 일입니다.  
컴포넌트으에서 올바른 payload를 전달하고 누락이 되지는 않는지 확인합니다.  
이 로직은 `typesafe-actions`의 함수를 이용한 모습입니다.  
다른 라이브러리를 사용하더라도 이처럼 payload의 타입을 체크하는게 좋습니다.  

```ts
export const REGISTER = {
  REQEUST:  'auth/REGISTER_REQUEST', 
  SUCCESS:  'auth/REGISTER_SUCCESS', 
  FAILURE:  'auth/REGISTER_FAILURE', 
} as const;

export const register = createAsyncAction(
  [REGISTER.REQEUST, (req:User)=>req ],
  [REGISTER.SUCCESS, (res:boolean)=>res ],
  [REGISTER.FAILURE, (err:Error)=>err ]
)()
```
비동기 액션의 경우 `createAsyncAction`를 통해 타입을 체크합니다.  
각 액션별 payload의 타입을 지정하여 reducer에서 타입체크가 가능합니다.  


### Actions UnionTypes
reducer에서 action별 payload를 확인하기 위해 action의 Union타입을 만들어야한다.  
```ts
// actions creator를 하나의 객체로 묶는다.
const actions = {
  changeField,
  initializeForm,
  login,
  register
}

type AuthAction = ActionType<typeof actions>
```
`ActionType`는 `typesafe-actions`에서 제공하는 타입이다.  
모든 액션 생성자함수의 유니온타입을 반환해준다.  


### initState
```ts


export interface StateAuth {
  register: {
    username: string
    password: string
    passwordConfirm: string
  },
  login: {
    username: string
    password: string
  },
  auth: any,
  authError: any
}

const initialState:StateAuth = {
  register: {
    username: '',
    password: '',
    passwordConfirm: ''
  },
  login: {
    username: '',
    password: ''
  },
  auth: null,
  authError: null
};
```
모듈별 `initialState`의 인터페이스를 작성해준다.  
이 인터페이스는 각 컴포넌트에서 스토어의 상탯값에 접근할때 타입을 체크하는 용도로 사용된다.  
이 인터페이스에 등록하지 않은 속성을 컴포넌트에서 접근할 경우 타입에러가 발생한다.  


### Reducer
```ts
const auth = createReducer<StateAuth, AuthAction>(initialState, 
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value; // 예: state.register.username을 바꾼다
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null // 폼 전환 시 회원 인증 에러 초기화
    }),
    // 회원가입 성공
    [REGISTER.SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth
    }),
    // 회원가입 실패
    [REGISTER.FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error
    }),
    // 로그인 성공
    [LOGIN.SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth
    }),
    // 로그인 실패
    [LOGIN.FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error
    })
  }
);

```


## 정리...
타입의 적용에 대한 정규화된 룰은 없다.  스토어에서 관리중인 상탯값이 많거나 컴포넌트가 많다면 이런 타입체크의 효용성을 크게 느낄것 같다.  
한가지 어려웠던점은 서브파티 라이브러리를 적용할떄 이다.  
웬만하면 type을 지원하지만 그 적용이 애매하거나 빠진 부분이 있어서 개발자가 직접 타입을 적용해야하는 경우가 더러있다.  
이런 부분이 유형화되기전에는 자료를 찾아보느라 꽤 많은 시간을 썼다.  
개발기간이 짧고 규모가 작은 프로젝트일 경우 이런 점을 고려하여 타입스크립트를 적용하지 않는것도 나쁘지 않다는 생각이 든다.  







## Ref
- [type check](https://ko.reactjs.org/docs/static-type-checking.html)
- [ts-react-redux-turoial](https://github.com/velopert/ts-react-redux-tutorial)
- [Typescript-pro-tips](https://medium.com/@martin_hotell/10-typescript-pro-tips-patterns-with-or-without-react-5799488d6680#78b9)
- [Rudux에서 타입스크립트 프로처럼사용하기](https://velog.io/@velopert/use-typescript-and-redux-like-a-pro)
- [typesciptWithReact](https://medium.com/@martin_hotell/10-typescript-pro-tips-patterns-with-or-without-react-5799488d6680#78b9) 
- [typescriptWithSaga](https://jonir227.github.io/develop/2019/06/04/redux-saga%EC%99%80-typescript-%ED%8E%B8%ED%95%98%EA%B2%8C-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0.html)
- [CUSTOM_typescript and redux](https://godsenal.com/posts/redux,-redux-saga%EC%99%80-typescript%EB%A5%BC-%ED%8E%B8%ED%95%98%EA%B2%8C-%EC%93%B0%EA%B8%B0%EC%9C%84%ED%95%9C-%EB%85%B8%EB%A0%A5/)
- [ts+redux 셋팅가이드](https://blog.woolta.com/categories/1/posts/197)
- [react_handbooks](https://react.vlpt.us/using-typescript/06-ts-redux-middleware.html)
- [셈플코드_1](https://gist.github.com/Jonir227/b7fc8b5b0646b7a90c26bd73a70c12b9)
- [셈플코드_2](https://github.com/velopert/ts-react-redux-tutorial)
- [김정환 블로그 리애트에 타입스크립트 환경 구축하기](http://jeonghwan-kim.github.io/dev/2019/06/25/react-ts.html)
- [김장환 블로그 리액트 라우터 with Ts](http://jeonghwan-kim.github.io/dev/2019/07/08/react-router-ts.html) 
- [김정환 블로그 TS_리덕스에 적용하기](http://jeonghwan-kim.github.io/dev/2019/07/15/react-redux-ts.html)