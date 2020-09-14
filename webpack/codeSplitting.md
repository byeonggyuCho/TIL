# Code Spliting

## TODO

## TL;DR

- 코드 스플리팅은 한번애 불필요한 파일이 로드되는걸 막기 위해서 파일을 분할하는 것.
- 분할기준은 라우터

## intro

SPA는 초기 로딩 때 해당 웹의 모든 자원을 불러와야한다.  
이를 위해 번들러로 하나의 파일로 번들리했지만
한번에 다 쓸것도 아닌데 전부 로드를 해야하는게 비효율적인것 같다.  
이런 문제를 극복하기 위한 방법이 코드 스플리팅이다.  
코드 스플리팅은 `라우트`를 기준으로 코드를 나눠서 관련된 모듈들을 로딩하도록 하는것이다.

## dynamic import

### React.lazy()

```jsx
import React, { lazy } from "react";

const NewPopup = lazy(() => import("./views/NewPopup"));

const MainComponent = () => (
  <>
    <NewPopup />
  </>
);
```

### Suspense

동적 임포트가 이뤄지는 동안 다른 컴포넌트를 보여주는 기능이다.

- lazy컴포넌트를 여러개 넣을 수도 있다.

```jsx
import React, { lazy, Suspense } from "react";

const NewPopup = lazy(() => import("./views/NewPopup"));

const loading = () => <p>Loading</p>;

const MainComponent = () => (
  <Suspense fallback={loading()}>
    <NewPopup />
  </Suspense>
);
```

- https://medium.com/humanscape-tech/react%EC%97%90%EC%84%9C-%ED%95%B4%EB%B3%B4%EB%8A%94-%EC%BD%94%EB%93%9C-%EC%8A%A4%ED%94%8C%EB%A6%AC%ED%8C%85-code-splitting-56c9c7a1baa4

## chunk

## react-loadable

## cashing

- 같은 청크를 여러번 받지 않기 위해서 캐싱처리하는 방법에 대해서 알아보자.
- https://www.zerocho.com/category/Webpack/post/58ad4c9d1136440018ba44e7

## plugin

- babel-plugin-syntax-dynamic-import
- SplitChunksPlugin

## ref

- [DOC](https://webpack.js.org/guides/code-splitting/)
- [react-code-splitting](https://velog.io/@velopert/react-code-splitting)
- https://velopert.com/3421
- https://velog.io/@velopert/react-code-splitting
- [React에서 해보는 코드 스플리팅](https://medium.com/humanscape-tech/react%EC%97%90%EC%84%9C-%ED%95%B4%EB%B3%B4%EB%8A%94-%EC%BD%94%EB%93%9C-%EC%8A%A4%ED%94%8C%EB%A6%AC%ED%8C%85-code-splitting-56c9c7a1baa4)
- [코드 스플리팅을 통해 사이트의 효율성을 높이는 방법](https://ui.toast.com/weekly-pick/ko_20200128/)
- [동적 임포트 설정 예제](https://syaku.tistory.com/356)
