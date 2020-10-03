# 웹팩 바벨 설정

## intro

바벨은 최신 자바스크립트을 구형 브라우저에서 이용가능하도록 바꿔주는 트랜스파일러입니다.

## preset

프리셋은 필요한 플로그인의 묶음이다.  
예를들어 `@babel/preset-react`는 리액트를 트랜스파일링하는데 필요한 바벨 플러그인의 묶음이다.

## 바벨 필수 패키지

### @babel/core

@babel/cli, babel-loader에서 실질적으로 `@babel/core`를 실행한다.

### @babel/cli

터미널에서 babel을 실행하기 위한 모듈

## 1.로더

### babel-loader

바벨을 웹팩 빌드 과정에서 사용할 수 있게 해주는 로더입니다.  
로더를 이용해 트랜스파일링을 하면 직접 babel-ci를 통해 트랜스파일링할 필요가 없습니다.

## 2.플러그인

### @babel/preset-env

필요한 플러그인들을 프로젝트 지원 환경에 맞춰서 동적으로 결정해 준다.

### babel/plugin-transform-runtime

뭔지 모르겠음.

## 3.폴리필

### @babel/polyfill

core-js와 regenerator-runtime을 합쳐서 만든 폴리필이다.

- 전역공간에 폴리필을 채워 넣는 방식이기 때문에 전역공간이 오염되어 폴리필 충돌 가능성이 있다는 단점이 있다.
- 부라우저에서 이미 구현된 필요하지 않은 폴리필까지 전부 번들에 포함되어 번들 크기가 커지는 단점이 있다.

### @babel/plugin-transform-runtime

이 폴리필을 사용하면 바벨이 es6의 문법들을 자체 구현한 함수로 트랜스파일링 한다.

- 인스턴스의 메소드를 제대로 트랜스파일링하지 못하는 이슈가 존재한다.
- 이 플러그인은 전역공간에 폴리필을 채우지않는데 이 경우 해당 기능을 사용하는 서드파티 라이브러리가 있을 때 문제가 된다.
  - webpack 번들링 룰에서 해당 라이브러리를 따로 뺴줘야하는데 일일이 처리하기가 번거롭다.

### core-js@3

가장 근래에 나온 폴리필 지원 방식이다.  
앞서 언급된 두가지 방법의 문제를 개선했다.

## REF

- [심재철-core-js@3](https://medium.com/@simsimjae/%EA%B0%9C%EB%B0%9C%EC%9D%84-%ED%95%98%EB%8B%A4%EB%B3%B4%EB%8B%88-%EC%9D%B4%EB%9F%B0-%EC%97%90%EB%9F%AC%EA%B0%80-%EC%83%9D%EA%B2%A8%EC%84%9C-%EC%9B%90%EC%9D%B8%EC%9D%84-%EC%B0%BE%EB%8B%A4%EA%B0%80-%ED%8F%B4%EB%A6%AC%ED%95%84-%EB%AC%B8%EC%A0%9C%EB%9D%BC%EB%8A%94%EA%B1%B8-%EA%B9%A8%EB%8B%AB%EA%B3%A0-%EC%A0%95%EB%A6%AC%ED%95%A9%EB%8B%88%EB%8B%A4-217a207f8181)
