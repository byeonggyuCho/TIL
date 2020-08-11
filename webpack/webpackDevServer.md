# webpack Development Server

## Intro

node express로 만들어진 webserver다.  
파일의 변경을 감지해서 리 컴파일한다. 추가적인 미들웨어를 설정해서 넣을 수도 있다.

왜 webpack-dev-server가 필요할까?

- webpack-dev-server는 Webpack 설정을 통해 Front-end만의 개발용 Node.js 서버를 손쉽게 구축하도록 돕는다.
- 실질적으로 물리적인 파일을 Build해내는 것이 아니라, Memory내에 Cache 한 결과를 라우팅하기 때문에 watch를 통해 변경사항을 매번 빌드하는 것에 비해 쾌적한 개발 환경을 구축할 수 있다.
- 개발시 react 애츨리케이션 빌드 자동화
  - 트랜스파일링(babel)
- HMR (Hot Module Replacement)
- 빠른 개발 및 협업을 위해 프론트엔드와 백엔드 분리 개발
- 프록시 서버로 이용가능하여 백엔드 서버와 연동이 쉬움

## json-server

- https://react.vlpt.us/redux-middleware/08-json-server.html

```
$ yarn global add json-server
$ json-server ./data.json --port 4000
```

## 개발서버 설치

```
npm install –dev webpack-dev-server
```

## 개발서버 셋팅

webpack-dev-server-dev

## 개발환경 설정

- proxy 서버 설정
- 벡엔드 서버에 CORS 설정

## proxy 설정

- https://react.vlpt.us/redux-middleware/09-cors-and-proxy.html
- https://zuminternet.github.io/ZUM-Webpack-dev-proxy-part2/

## 옵션 설명

### 1. host

    - 사용될 호스트 지정

```
webpack-dev-server –host 127.0.0.1
```

### 2. contentBase

- 콘텐츠를 제공할 경로지정 (정적파일을 제공하려는 경우에만 필요)

```
webpack-dev-server –content-base /path/to/content/dir
```

### 3.compress

- 모든 항목에 대해 gzip압축 사용

```
webpack-dev-server –compress
```

### 4.hot

- webpack의 HMR 기능 활성화

### 5.inline

- inline 모드 활성화

```
webpack-dev-server –inline=true
```

### 6. port

- 접속 포트 설정

```
webpack-dev-server –port 9000
```

### 7. open

- dev server 구동 후 브라우저 열기

```
webpack-dev-server –open
```

## REF

- [webpack.js.org](https://webpack.js.org/configuration/dev-server/#devserverproxy)
- [Webpack dev server를 이용한 개발 환경 구성-1](https://zuminternet.github.io/ZUM-Webpack-dev-proxy-part1/)
- [Webpack dev server를 이용한 개발 환경 구성-2](https://zuminternet.github.io/ZUM-Webpack-dev-proxy-part2/)
- [learn-webpack](https://velog.io/@jeff0720/React-%EA%B0%9C%EB%B0%9C-%ED%99%98%EA%B2%BD%EC%9D%84-%EA%B5%AC%EC%B6%95%ED%95%98%EB%A9%B4%EC%84%9C-%EB%B0%B0%EC%9A%B0%EB%8A%94-Webpack-%EA%B8%B0%EC%B4%88)
- [guide-development](https://webpack.js.org/guides/development/)
- [docs- webpack dev server](https://github.com/webpack/docs/wiki/webpack-dev-server)
- [dev-server](https://webpack.js.org/configuration/dev-server/)
- [개발환경 구성](https://brightparagon.wordpress.com/2018/06/27/webpack-v4-development-configuration/)
