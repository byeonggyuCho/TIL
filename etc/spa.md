# Single page application


## intro
단일 페이지 애플리케이션(Single Page Application, SPA)는 모던 웹의 패러다임이다.  
SPA는 기본적으로 단일 페이지로 구성되며 기존의 서버 사이드 렌더링과 비교할 때, 배포가 간단하며 네이티브 앱과 유사한 사용자 경험을 제공할 수 있다는 장점이 있다. 
 **SPA에서 단일 페이지란 물리적 문서(HTML문서)가 하나인 것을 말한다.**  
SPA에서도 page가 존재하지만 이 페이지는 별도의 HTML문서가 있는것이 아니라 초기로딩 시점에 내려받은 HTML문서 위에서 요소를 새로 렌더링한다.  
다시말해 같은 문서를 재활용한다.  
SPA는 최초에 html과 모든 정적 리소스를 로드받은 뒤에 모든 화면이 동적으로 그려지는데 결국 하나의 html문서 위에서 엘리먼트들이 그려졌다가 지워졌다가 하는 것이다.  


**SPA의 핵심가치**  
- SPA의 핵심 가치는 사용자 경험(UX) 향상
- 모바일 환경


## 등장배경
1. **모바일 웹시장** 성장
2. 보다 나은 사용자 경험을 위한 아키텍쳐가 필요해짐.
3. 클라이언트 랜더링을 통해 서버 트래픽을 최소화하는 식으로 사용자 경험을 향상시킴.

스마트폰이 보급되면서 모바일 웹의 수요가 증가했습니다.  
이에따라 모바일 웹에서 제공하는 컨텐츠 또한 많아졌는데 
데스크탑보다 느린 스마트폰에서 매번 새로운 페이지를 로드해서 랜더링하는 전통적인 웹방식은 모바일 환경에서 좋은 사용자 경험을 제공하기에 한계가 있었습니다.  
그래서 렌더링을 하는 역할을 서버로 넘기지 않고 브라우저가 하는 방법을 생각합니다.  
브라우저는 페이지가 처음 로딩 될 시 필요한 리소스를 다운 받은 후에 정보가 필요해질 경우에만 서버에게 정보를 요청해서 트래픽을 최소화 할 수 있습니다.  


## 전통적 웹과의 차이.
![](/resource/img/etc/serversideRendering.png)  

1. MPA(Multi Page Application)  
라우터 별로 새로운 HTML파일과 리소스를 요청한다.  

2. SPA  
초기 로딩시 한번의 HTML요청과 모든 정적 리소스를 요청한 뒤에 
필요한 데이터만 받아서 뷰를 업데이트한다. 



## 장단점

### 장점
#### 1.플래시현상 극복
- 전체 페이지를 래더링 하지 않고 변경 부분만 업데이트를 한다.
- 사용자의 경험이 좋아진다.

#### 2.백엔드 서버가 독립적임
- 멀티 플랫폼 지원 가능
- 백엔드 코드를 여러 플랫폼에서 범용적으로 사용가능하다.

#### 3.SPA는 모든 로컬스토리지를 효율적으로 캐시할 수 있습니다

#### 4.전반적 트래픽 감소
- 웹페이지를 요청하는게 아니라 필요한 데이터만 요청하기 때문에 통신비용이 줄어든다.


#### 5.컴포넌트 단위 개발로 생산성 향상


### 단점
#### 1. 초기로딩속도 증가
모든 정적 리소스를 쵤초에 다운로드하기 때문에 초기 구동 속도가 대적으로 느리다.   
**코드 스플리팅**을 이용해서 라우트별로 파일을 나눠서 트래픽과 로딩속도를 개선할 수 있다.  
- chunk cashing을 추가하면 라우터별로 한번만 다운 받으면된다.

#### 2. 보안

1. XSS   
    - 서버사이드에서 스크립트 태그를 검색하는 로직을 추가
    - 꺽쇠를 입력받을 때 다른 문자로 치환한다.

2. 핵심로직이 자바스크립트로 구현된다.  
    - 보안에 관련되는 로직을 백엔드로 옮겨서 구현한다.  
    - SPA에서 비지니스 로직을 반드시 프론트에서 작성해야할 이유가 없다.  


#### 3. 메모리관리가 안되면 어플리케이션 속도가 느려질 수 있다.
- 메모리관리 전략을 세워야한다.
- 리액트에서는 어떻게 메모리관리를 할까?

#### 4. SEO
- prerender.io(상용솔루션)
- server side rendering


## REF
- [poiemaweb-SPA](https://poiemaweb.com/js-spa)
- [JS로 SPA만들어보기 ](https://medium.com/better-programming/js-vanilla-script-spa-1b29b43ea475)
- [react-router](https://velopert.com/3417)
- [a-netflix-web-performance-case-study](https://medium.com/dev-channel/a-netflix-web-performance-case-study-c0bcde26a9d9)
- [1](https://isme2n.github.io/devlog/2017/05/19/about-spa/)
- [2](https://brownbears.tistory.com/406)
- [3](https://eastflag.co.kr/fullstack-spa_definition/)
- [4](https://code.i-harness.com/ko-kr/q/14d96a6)
- [5](todomvc.com)
- [6](https://9105lgm.tistory.com/127)
- [7](https://techaffinity.com/blog/single-page-application-angular/)
- [8](https://www.slideshare.net/chandruaskutty/single-page-application-and-framework)