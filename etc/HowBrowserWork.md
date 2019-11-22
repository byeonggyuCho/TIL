# How Browsers Work

## 브라우저의 주요기능
브라우저의 주요 기능은 사요자가 선택한 자원을 서버에 요청하고 브라우저에 표시하는 것이다. 자원은 보통 HTML 문서지만 PDF나 이미지 또는 다른 형태일 수 있다. 자원의 주소는 URI에 의해 정해진다. 

브라우저는 HTML과 CSS명세에 따라 HTML파일을 해석해서 표시하는데 이 명세는 웹 표준화 기구인 W3C(World Wide Web Consortium)에서 정한다. 과거에는 브라우저들이 일부만 이 명세에 따라 구현하고 독자적인 방법으로 확장함으써 웹 제작자가 심각한 호환성 문제를 겪었지만 최근에는 대부분 브라우저가 표준 명세를 따른다.

브라우저의 사용자 인터페이스는 표준 명세가 없음에도 불구하고 수 년간 서로의 장점을 모방하며 현재에 이르게 되었다. HTML5 명세는 주소 표시줄, 상태 표시줄, 도구 모음과 같은 일반적인 요소를 제외하고 브라우저의 필수 UI를 정의하지 않는다.


## 브라우저의 기본 구조.


![](/resource/img/browser/browserStructure.png)

### 1.User Interface
주소 표시줄, 이전/다음 버튼, 북마크 메뉴 등. 요청한 페이지를 보여주는 창을 제외한 나머지 모든 부분.

### 2. 브라우저 엔진
렌더링 엔진에 작업을 요청하고 다루는 인터페이스 부분.

### 3.렌더링 엔진
- 요청된 컨텐츠를 화면에 표시하기 위해 필수적인 부분.
- 예를 들어 요청된 페이지가 HTML이라 할 때 렌더링 엔진은 HTML과 CSS를 파싱하고 화면에 파싱된 컨텐츠를 표현한느 역할을 수행한다.

### 4.Network
- HTTP reques와 같은 네트워크 호출을 위해 필요한 부분.
- 각 플랫폼에 의존적인 부분과 플랫프ㅗㅁ에 독립적인 인터페이스 부분으로 구성된다.

### 5.UI 백엔드
- 콤보박스나 윈도우와 같은 기분 위젯을 화면에 그리는데 필요함.

### 6.자바스크립트 해석기
- 자바스크립트 코드를 해석하고 실행한다.

### 7. Data Storage
이 부분은 자료를 저장하는 계층이다. 쿠키를 저장하는 것과 같이 모든 종류의 자원을 하드 디스크에 저장할 필요가 있다. HTML5명세에는 브라우저가 지원하는 웹데이터 베이스가 정의되어있다. indexed DataBase, Web SQL Database, Web Storage (like as localStorage, Session Storage)등이 있다.


<br><br>

## 브라우저가 하는일
### 웹 엔진
대부분의 웹브라우저는 HTML을 처리하는 부분과 UI를 구분하여 설계한다. 그 이유는 HTML처리는 웹브라우저 뿐만 아니라 이메일 편집기 위젯 실행 등에 사용되기 때문이다.
- 웹 서버에 저장된 HTML문서를 다운로드 받아 특정 윈도우 영역에 표시하는 것.

좀 더 자세히 설명하자면 다음과 같은 작업을 수행한다.
1. Source Loading  
HTTP 모듈 또는 파일시스템으로 전달받은 리소스 스트림(resource steam)을 읽는 과정이다. Loade가 이 역할을 수행한다. 로더는 단순히 읽는 것이 아니라 이미 데이터를 읽었는지도 확인하고 팝업창을 열지 말지 또는 파일을 다운받을 지를 결정한다.  

2. Pasing to Dom tree
DOM Tree를 만드는 과정을 파싱이라고 한다. 일반적으로 웹 엔진은 HTML, XML파서를 각각 가지고 있다. HTML파서는 말 그대로 HTML문서를 파싱하는데 사용되고 XML파서는 XML형식을 따르는 SVG, MathML등을 처리하는데 사용한다.  

3. Producing a render tree
파싱으로 생성된 DOM Tree는 HTML/XML문서의 내용을 트리 형태로 자료 구조화한 것이다.
 실제 이 내용을 화면에 표시하기 위해서는 다른 형태의 데이터 구조가 필요하다. DOM트리는 내용자체를 저장하고 있고 화면에 표시하기 위한 위치와 크기 정보 그리기 순서등을 저장하기 위한 별도의 트리구조가 필요하다. 이를 일반적으로 렌더링 트리라 부른다.

4. Style Resolution  
CSS는 HTML의 문서에서 내용과 별도로 표현을 나타내기 위해 만들어졌다.  
- CSS스타일은 셀렉터 정의에 따라 적용되는 태그가 다를 수 있어서 모든 ㅊㄴㄴ 스타일을 분석하여 최종적으로 어떤 태그에 어떤 스타일을 적용할지 결졍해야한다.

5. Layout  
렌더링 트리가 생성될떄, 각 렌더 객체는 위치나 크기를 가지고 있지 않다. 각 렌더 객체가 위치와 크기가 갖게 되는 과정을 레이아웃이라고 한다.

6. Painting  
그리기 단계는 렌더링 트리를 탐색하면서 특정 메모리 공간에 RGB값을 채우는 과정이다 . 마치 그릴대상을 적은 카드 뭉치에서 맨 윗 장부터 하나씩 꺼내어 적힌 대상을 빈 종이에 그린 것과 비슷하다 볼 수 있다.



## 렌더링 엔진.
대표적인 브라우저 렌더링 엔진은 모질라에서 만든 게코(Gechko)엔진과 크림이 만든 웹킷(Webkit)엔진이 있다.  
렌더링 엔진은 네트워크 계층으로부터 요청된 페이지의 컨텐트를 얻어 오는데 대략 8k 크기의 단위로 수행한다.  

### 기본 흐름.
1. Parsing HTML to construct the DOM tree  
렌더링 엔진은 HTML문서를 파싱할 것이고 DOM tree라 불리는 트리형태로 DOM노드를 생성한다.

2. REnder tree construction  
HTML의 스타일 정보들을 별도의 reder tree로 구성된다. Render tree는 생상이나 Dimestion들을 포함하는 그래픽적 속성들의 사각형을 포함하며 사각형들은 올바른 순서대로 화면에 표시된다.  
3. Layout of the render tree  
렌더트리를 생성한 후에 랜더트리의 레이아웃 과정을 수행한다. 다시 말해서 각 노드들이 화면상에서 정확히 그들이 놓여야할 할 곳에 위치하게 된다.
4. Painting the render tree  
이 과정에서 렌더 트리를 순회하면서 스타일 정보를 찾아서 UI백엔드를 이용하여 각 노드들을화면상에 표현하게 된다.


**웹킷**  
- 애플, 노키아, 어도비, 구글등에 의해 공동 개발된 오픈소스기반 웹브라우저 엔진이다.



![](/resource/img/browser/webkitWorkFlow.png)  




### Ref
- [Webkit](webkit.org)
- [브라우저는 어떻게 동작할까?](https://d2.naver.com/helloworld/59361)
- [How Brosers Work](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/)
- [문맥 자유 문법](https://ko.wikipedia.org/wiki/%EB%AC%B8%EB%A7%A5_%EC%9E%90%EC%9C%A0_%EB%AC%B8%EB%B2%95)
- https://youtu.be/401E5A4Tges
- https://www.slideshare.net/JinKyoungHeo/1-2-53043752
- https://jinbroing.tistory.com/86
- https://vallista.kr/2019/05/06/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80-%EB%A0%8C%EB%8D%94%EB%A7%81-%EA%B3%BC%EC%A0%95/