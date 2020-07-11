# import 'react-app-polyfill/ie9';

## 1.react-app-polyfill

1. react-app-polyfill

   npm install react-app-polyfill

```js
// index.js import 설정
// IE9의 경우
import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
```

2. 기타 polyfill 추가.

3. node_modules/.cache를 삭제한다.

## 2. babel-polyfill

- 제너레이터
- async awatie

  npm install core-js regenerator-runtime

### 1.core-js

### 2.regenerator-runtime

```js
import "raf/polyfill";
```

```js
//index.js import 설정
import "core-js/stable";
import "regenerator-runtime/runtime";
import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
```

## window10에서 IE테스트하기

### 1.Hyper-v

### 2.MS에서 제공하는 가상머신

- https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/

## ref

- [크로스브라우징](https://velog.io/@pks787/react-IE%EC%97%90%EC%84%9C-%EC%9E%91%EB%8F%99%EC%8B%9C%ED%82%A4%EA%B8%B0)
- [React for IE9 IE11](https://gojjc.tistory.com/entry/React-ie9-ie11-%ED%98%B8%ED%99%98%EC%8B%9C%ED%82%A4%EB%8A%94-%EB%B0%A9%EB%B2%95)
- [window가상머신 돌리기](https://www.codingfactory.net/11501)
