# SSR

## Intro
리액트에서는 왜 서버사이드 랜더링을 고려했을까?  
ajax가 등장하기 전의 웹은 전체 HTML을 만드는 방식이 일반적이었으나 ajax가 등장이후 javaScript를 이용한 동적 HTML 렌더링의 시대가 열림.

js를 이용해 테그를 동적으로 삽입하는 방식은 `<script>`를 삽입할 수 있게 되는 이슈(XSSCross-Site Scripting Injection)가 발생함.  
이를 막기 위해 
```js
var htmlString = '';
htmlString += '<div>';
htmlString += '  <p>' + data.name.replace('<', '&lt;').replace('>', '&gt;') + '</p>';
if (data.image) {
  htmlString += '  <p><img src="' + data.image.replace('<', '&lt;').replace('>', '&gt;') + '"></p>';
} else {
  htmlString += '  <p><img src="/images/avatar.jpg"></p>';
}
htmlString += '</div>';

$('#profile').append(htmlString);
```
이처럼 꺽쇠를 치환하는 보안코딩을 했으니 가독성이 떨어짐.  
이런 문제의 해결방법으로 Template engine이 유행하기 시작함.

![](/resource\img\etc\template-engine.png)



## FrameWork
웹환경의 고도화에 따라 자바스크립트 로직의 복작성을 해소하기 위해 프론트엔드에서 자바스크립트 MVC가 등장함.
- Backbone.js
- Angualar.js

### AngularJS
기존 라이브러리나 프레임워크들과는 다르긔 DOM을 조작하거나 제어하는 방식에 초점을 맞추지 않고 데이터의 변화에 초점을 맞추는 새로운 접근방법을 제시함.  
이 프레임워크의 도입으로 인해서 

#### 장점
1. 개발속도가 빨라짐
    - 특별한 코드 추가 없이 변수 할당만으로 양방향 데이터 바인딩지원. get/set함수 필요없음
    - 별도의 템플릿 코드 분리 없이 뷰-데이터 연동가능.
    - Dependency Injection 패턴 사용, new같은 연산자 없고 그냥 인자로 넘기면 됨.
    - 모듈화가 잘 되어 재사용이 편리함.
    - 플러그인이 엄청 많음

2. 유지보수가 쉬움
    - Javascript 코딩량이 적음
    - MVC패턴이 잘 정리되어있어 개발자간 코드가 비슷함.
    - controller, Directive, Filter, Service 모듈 구분이 명확함.

3. 테스트 코드 작성이 쉬움
    - 모듈별 테스트 코드 작성이 쉬움. 튜토리얼도 테스트코드부터 시작함.
    - 데이터 로딩 시점이 비동기인 경우 end-to-end테스트가 까다로운경우가 있는데 Protractor를 사용하면 간단함

4. 프로젝트 분리.
    - 백엔드를 API서버로 사용하여 프론트와 완전히 분리할 수 있음.
    - 테믈릿을 스트립트 테그나 JS에서 관리하지 않고 HTML을 그대로 사용하여 퍼블리셔 협업도 좋음.

#### 단점
1. 속도가 느림 (특히 모바일환경)
2. 러닝커브가 높음(Directive)
3. 페이지 깜빡임 이슈(Flash of unstyled content)
4. 컨텐츠 렌더링 시점을 정확히 제어하기 어려워 애니메이션적용이 쉽지 않음.
5. SEO이슈. 로딩전 빈페이지만 바라보는 이슈가 생김
6. 뒤로가기하면 페이지 새로 로딩함. history API를 이용한 페이지 이동이 실제로는 페이지를 동적으로 로딩하는 구조임.
7. 외부 서비스 콜백처리
    - 이메일 회원가입 확인 페이지는 어떻게함?
    - 결제 페이지 이동은 어떻게 함?
    - 외부 로그인후 돌아오는 페이지는 어떻게 처리함?


이러한 문제들은 사실 웹앱의 단점임.  
애초부터 웹앱에 적합한 프레임워크였고 요즘엔 성능이 크게 중요하지 않은 어드민이나 내부 서비스에서나 사용된다고 함.


### React
오직 User Interface(View)를 만드는 라이브러리  


#### 장점
- 낮은 러닝커브
- Virtual DOM을 이용한 빠른 렌더링
- 단방향 바인딩 지원. 컴포넌트 구성이 쉬움.
- 서버사이드 렌더링 지원이 좋음

 
![](/resource\img\react\CSR.png)
![](/resource\img\react\SSR.png)


### REF
- [Veloper](https://velopert.com/3425)
- [React를 이용하여 Server Side Rendering 구현](https://www.popit.kr/react-%EC%84%9C%EB%B2%84%EC%82%AC%EC%9D%B4%EB%93%9C-%EB%A0%8C%EB%8D%94%EB%A7%81/)
