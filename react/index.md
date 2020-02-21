# React

## intro
지속해서 데이터가 변화하는 대규모 애플리케이션을 구축하기 위한 도구.  
이 도구가 제공하는 자동화 환경을 통해서  
DOM의 상태관리를 최소화하고 기능과 사용자 인터페이스에 집중할 수있다.

- 참고 : https://velopert.com/3612


## 특징


## why react
1. 사용자 인터랙션이 많은 애플리케이션에 권장
리액트에서는 DOM을 직접 제어할 필요가 없고 역할에 따라 코드를 나눠 작성할 수 있게 해준다
- 데이터 변경을 상태관리 라이브러리에 위임 하는식
- React 컴포넌트와 액션 생성자, 리듀서, 스토어를 분리하면서 코드가 한 가지 역할에 집중
2. 코드 재활용성 우수
3. 테스트하기 수월함

## 연관 키워드
- spa
- Virtual dom
- redux
- Flux
- mobile app
- hybrid app
- client side rendering



## 1. Virtual Dom
![](../resource/img/react/virtualDom.png)
브라우저의 엔진이 잦은 빈도의 Dom 랜더링을 원활하게 만들어주는 도구.  
자바스크립트로 가상 돔을 만들고 변화가 필요한 곳에만  브라우저가 업데이트를 해주는 구조를 갖음으로서 작업을 최소화한다.  
시시각각 변하는 웹애플리케이션을 브라우저 엔진으로 구현하기 위한 꼼수(?)라고 볼 수 있다.


## 2.redux
FLUX패턴을 위한 상태관리 라이브러리  


## 3.코드 스플리팅
SPA에서 로딩속도에 대한 이슈를 해결하기 위해서 등장  
코드를 분할해서 필요한 시점에 로딩하는 기술.  


## 4.Hook


## 사용 기업
- 쿠팡
- 뱅크 샐러드
- [네이버 메일](https://d2.naver.com/helloworld/4966453)
- 인스타그램

## 앞으로 다뤄볼 주제
- hot loader
- next.js
- 최적화 가이드
- 테스트 가이드


## 리액트 커뮤니티
- [doc-kr](https://reactjs-kr.firebaseapp.com/docs/thinking-in-react.html)
- [docs](https://reactjs.org/docs/hello-world.html)
- [tutorialspoint](https://www.tutorialspoint.com/reactjs)
- [벨로퍼트와 함께하는 모던 리액트](https://react.vlpt.us/)
- [redux-saga-in-korean](https://github.com/mskims/redux-saga-in-korean/blob/master/transition-progress.md)
- [한국어로 배우는 리액트](https://github.com/reactkr/learn-react-in-korean)
- [[튜토리얼] 리액트 도움닫기](https://github.com/sujinleeme/the-road-to-learn-react-korean)
- [react-starter](https://github.com/webpack/react-starter)
- [react-redux-starter-kit)](https://github.com/davezuko/react-redux-starter-kit)

## ref
- [react Architecture](https://jbee.io/react/react-0-intro/)
- [리액트는 어떻게 동작할까](https://d2.naver.com/helloworld/9297403)
- [Thinking in React](https://reactjs.org/docs/thinking-in-react.html)