

### 프론트엔드를 하고싶은 이유가 뭔가요?
사용자가 피부로 느끼는 웹 경험을 개선하는일에 더 관심이 있습니다.  
사용자 경험에 가장 큰 비중을 차지하는 것이 웹 디자인과 프론트엔드 프로세스라고 생각합니다.  


### 프론트엔드 개발자의 직무범위가 어디까지라고 생각하나요?




### 왜 SPA수요가 늘어났다고 생각하는가?

### 최근 경험해 본 프론트엔트 프레임 웍은?
react입니다. 가장 커뮤니티가 활성화되어있어 학습하기에 좋을것같아 선택했습니다.

### 반응형 웹과 적응형 웹의 차이점은?

### api broken pipe 발생 원인과 해결 방법은 무엇일까?


### Cross-Site Scripting (XSS)을 설명하고, 해결 방안은 무엇인지 말해보라. 
사이트에 스크립트코드를 삽입한 URL을 다른 사용자가 실행하도록 유도하여 정보를 빼내는 방법 
방어 방법으로 입력값 검증을 하거나 htmlentities을 사용해서 스크립트코드의 유입 경로를 차단하는 방법이 있다.


### CORS에 대해 설명할 수 있나?
다른 도메인의 정보를 요청하는 것을 말합니다.  
이런 상황에서는 프록시서버를 두거나 서버에서 해당 도멘인이 유효한 접근임을 확인하는 처리를 해야합니다.  

### SPA(Single Page Application)로 구성된 페이지에서 SEO(Search Engine Optimization)를 할 수 있는 방법은 무엇일까?
서버 사이드 랜더링을 통해 해결한다.

### SSR(Server Side Rendering)은 무엇이고 사용 목적은 무엇인가?
전통적인 웹과 달리 프론트 프레임워크를 이용한 SPA구조에서는 브라우저에서 랜더링을 수행한다.  
이를 client side rendering이라고 하는데 반대로 서버에서 html마크업을 작성하여 브라우저에 보내는 방식을
SSR이라고 한다.  

SPA환경에서 SSR을 지원하는 이유는 빠른 초기랜더링과 검색 엔진 최적화를 위해 사용한다.

### OOP에 특징에 대해 설명해달라
절차지향 프로그래밍의 단점을 극복하고자 나온 개발 방법으로 독립적인 기능을 수행하는 객체 단위로 개발한뒤 레고처럼 조립하여 프로그램을 완성하는 방법을 말합니다. 캡슐화, 다형성, 재상용성의 특징을 갖는 응집력 높은 코드를 작성할 수 있다.


### 브라우저 랜더링 과정 설명해보라

- html 파싱과정 
통신을 통해 문서의 내용을 받아 온뒤 
HTML 문서를 파싱하여 DOM tree를 만들고 병렬적으로 CSS 요소를 파싱하여 CSSOM를 만든다.  
Dom과 CSSOM를 기반으로 렌더트리를 생성한다. 이때 화면에 불필요한 노드들은 렌더트리에서 빠집니다.  
 각 노드가 화면의 정확한 위치에 표시되도록 레이아웃을 계산하고 
UI백엔드에서 렌더 트리의 각 노드를 그린다. 이 작업은 병렬적으로 이루어지는데 모든 HTML을 파싱하면서 배치와 페인트과정이 동시에 일어납니다. 


## CSS
- CSS float을 해제하지 않으면 안되는 이유
- IE에서 가장 좋아하는 기능은 무엇인가요?
- meta태그들

### http 프로토콜에서 https이미지를 불러올 수 있나? 불러온다면 어떠한 문제가 있을까. warning을 없앨 수 있는 방법은 무엇일까?




## 보안
### 보안은 서버쪽에서 많이 신경쓰고 있지만, 프론트엔드 개발에서 보안관련 이슈는 어떠한 것들이 있는가
1. XSS

### Wireshark에 대해 알고 있는가

### 간단한 데이터를 클라이언트로만 관리 할수 있는가, 이와 관련해서 브라우저 에서 어떠한 것들을 지원하고 있는가, 예를 들면 소셜 로그인같은 것들에 대한 브라우저 종료시 발생하는 문제에 대응 경험이 있는가? 
- localstorage
- indexDB






## ref
- https://velog.io/@chris/front-end-interview-handbook-js-2
- https://velog.io/@chris/front-end-interview-handbook-js-3
- https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/FrontEnd
- https://taegon.kim/archives/5770
- https://blex.kr/@yoyounn18/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%A7%81%EA%B5%B0-%EC%9B%B9%EA%B0%9C%EB%B0%9C%EC%9E%90-%EB%A9%B4%EC%A0%91%EC%A7%88%EB%AC%B8-%EB%AA%A8%EC%9D%8C-%EB%8B%B5%EB%B3%80-%EB%8B%AC%EC%95%84%EB%B3%B4%EA%B8%B0
- https://velog.io/@honeysuckle/%EC%8B%A0%EC%9E%85-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EB%A9%B4%EC%A0%91-%EC%A7%88%EB%AC%B8-%EB%AA%A8%EC%9D%8C

- https://velog.io/@tmmoond8/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B0%9C%EB%B0%9C%EC%9E%90-%EC%9D%B8%ED%84%B0%EB%B7%B0-%ED%9B%84%EA%B8%B0-%EB%A9%B4%EC%A0%91-%EC%A7%88%EB%AC%B8-%EC%A0%95%EB%A6%AC-%EC%9E%91%EC%84%B1-%EC%A4%91

- https://yoon.site/react-node-js-fullstack-%EA%B0%9C%EB%B0%9C%EC%A7%81%EA%B5%B0-%EB%A9%B4%EC%A0%91-%ED%9B%84%EA%B8%B0/

