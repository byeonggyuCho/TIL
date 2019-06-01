# REDUX

![](../resource/img/redux.png)

FLUX 아키텍쳐를 편하게 사용할 수 있게 해주 상태관리 라이브러리.
그리고 react-redux는 리액트에서 redux를 쉽게 사용하기 위한 라이브러리다.<br>
redux를 사용함으로서 기존의 구조에서 컴포넌트간 상태전달을 위해서 직계 부모를 거쳐 전달하는 상태관리의 단점을 극복할 수 있다.<br>
redux를 이해하기 위해서 몇가지 용어를 이해해야한다.<br>


## 개념

1. Store
    - 어플리케이션의 상태값을 저장한다.

2. Action
    - 상태를 변화시킬 때 참조하는 객체
    - 일으킬 변화에 대한 명세가 담겨있다고 볼 수있다.

3. Dispatch
    - 스토어에 액션 객체를 전달하는 과정
    - 스토어를 구독중정인 컴포넌트에 변화가 생기면 액션객체을를 디스패치를 통해 스토어에 전달한다.
    - ex) store.dispatch(action);

4. Reducer
    - 리듀서 : 변형하는 것
    - 리덕스 내에서 변화를 일으키는 함수
    - 액션객체를 기반으로 상태변경을 결정한다.
    - 상태관리 데이터가 변형되었을때 리듀서가 실행되며 이때 실행에 대한 상세 명세는 액션객체를 따른다.

5. Subscription
    - 상태값을 Store를 통해 관리가 필요한 컴포넌트는
    Store를 구독(Subscription)한다.
    - 상태값이 변경되면 스토어를 구독중인 컴포넌트를 리랜더링한다.
    - 정확하게는 전달받은 리스너를 호출한다.
    - 이 리스너를 통해서 컴포넌트를 새롭게 변경된 상태값을 받고 리랜더링한다.
    - store.subscribe(listener);

   
## 요약
리덕스 패턴은 스토어에 상태 정보를 가진 객체를 넣어두고 액션이 디스패치되었을 때<br> 리듀서 함수를 이용하여 상태를 변화시키는것<br> 
그리고 상태가 변화될 때마다 스토어에 구독된 함수를 실행한다.<br> 




### FLUX 아키텍쳐

- https://blog.coderifleman.com/2015/06/19/mvc-does-not-scale-use-flux-instead/
- https://taegon.kim/archives/5288
- https://bestalign.github.io/2015/10/06/cartoon-guide-to-flux/


# 기술 발전 시리즈

1. 페이스북이 MVC대신에 FLUX 아키텍쳐를 선택한 이유
2. FLUX 라이브러리 redux
3. redux를 편하게 사용하기 위한 react-redux, react-actions
4. 객체 불변성을 편리하게 구현하기 위한 immulate.js
5. 미들웨어를 사용하기 위한react-thunk
6. 비동기 통신을 위한 axios 라이브러리