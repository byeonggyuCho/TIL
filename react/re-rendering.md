# re-rendering

## Intro
렌더링 최적화에 대해 알아보자

- React.Memo
- React.Lazy

## React.memo
개발자가 지정한 Props가 바뀌었을때만 리렌더링해준다. 
```jsx
export default React.memo(function이름);
```
이 떄 useCalblack이나 useMemo등이 함수에 적용되어야한다. 그렇지 않으면 함수가 바뀌어서 리렌더링이 된다.  



## REF 
- [React.memo](https://velog.io/@johnque/React.memo)
- [React.lazy](https://engineering.huiseoul.com/react-16-6-new-features-memo-lazy-etc-452c78ace739)
- [React.memo와 React.lazy](https://huurray.github.io/react/2018/12/10/react-memo/)