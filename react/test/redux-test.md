# Redux test

## intro

- 액션 생성 함수
- 리듀서
- 컨테이너 컴포넌트
- 프리젠테이셔널 컴포넌트, props 에 따라 제대로 보여지는지 테스트
- 액션 생성함수, 우리가 의도했던 대로 액션을 잘 만들어주는지 테스트
- 리듀서, 상태와 액션을 전달해주면, 의도했던 대로 업데이트를 해주는지 테스트
- 컨테이너 컴포넌트, 통합 테스팅을 통하여 모든게 잘 되는지 테스트
  액션 생성 함수들이 액션을 잘 만드는가?
  리듀서가 상태 변화를 제대로 일으키는가?
  컴포넌트는 제대로 렌더링 되는가?
  버튼이 클릭 됐을 때, 실제로 액션이 디스패치 되는가?

상태를 위한 테스트
뷰를 위한 테스트

- 우리가 컴포넌트 테스트 코드를 작성 할 땐, props 가 전달되었을 때 올바르게 그려주는지 테스팅
- 리덕스 관련 테스트 코드를 작성 할 땐, 우리가 만든 액션이 디스패치 됐을 때 상태가 원하는 형태로 변경되는지를 테스팅

## ref

- [TOAST-REACT-TEST](https://meetup.toast.com/posts/180)
- [JEST로 reducer테스트하기](https://pewww.tistory.com/24)
- [React로 TDD 쵸큼 맛보기](https://www.slideshare.net/jeokrang/react-tdd-76066004?next_slideshow=1)
- [React + Redux 앱 테스트](https://velopert.com/3591)
- [프론트엔드, 무엇을 테스트 할 것인가](https://jbee.io/react/testing-1-react-testing/)
- [프론트엔드, 어떻게 테스트 할 것인가](https://jbee.io/react/testing-2-react-testing/)
- [Store와 비즈니스 로직 테스트](https://jbee.io/react/testing-3-react-testing/)
- [컴포넌트 테스트와 검증](https://jbee.io/react/testing-4-react-testing/)
