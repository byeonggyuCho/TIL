# Same-Origin Policy
![](/resource/img/javascript/sameOriginPolicy.png)
동일 출처정책
다른 웹페이지로 접근할 때는 같은 출저, 프로토콜, 호스트명, 포트 의 페이지에만 접근이 가능하다.
따라서 같은 서버로만 데이터를 요청할 수 있다.
- https://www.w3.org/Security/wiki/Same_Origin_Policy


## Solution
타겟서버의 도움 없이 Same-Origin policy를 회피하는 방법


### 1. 브라우저
- 외부 서버로 요청을 할 경우에 클라이언트인 웹 브라우저가 요청을 해도 되는지 판단해서 결정한다.
- 브라우저에서 외부 도메인 요청 가능 여부를 확인하는 동작을 무시하도록 설정할수 있다.


### 2. JSONP 방식
- 서버쪽에서 작업을 못할 경우 하는 방식
- css나 js같은 리소스 파일을 json으로 변환하여 호출한다.
- 리소스를 get방식으로만 불러올 수 있따.

## 3. 서버사이드에서 데이터 요청을한다. 
- (CORS) Cross Origin Requests for RESTful WebService
- API 서버에 요청한다.

## 4. Proxy 를 이용하는 방식
![](/resource/img/javascript/proxy.png)


Same-Origin Policy에 의한 타겟서버와 자바스크립트가 호스팅 되는 서버의 URL이 다르기 때문에 발생한다. 
따라서 앞단에 Reverse Proxy등을 넣어서 전체 URL을 같게 만들어 주면된다.
- proxy를 이용하여 자바스크립트가 로딩된 사이트와 호출하는 사이트의 도메인을 같게 만들어준다.
- 이 방식은 자사 웹사이트를 서비스하는 경우에만 가능하다.
- OEPN REST API에는 부적합하다.




#### ref
- https://bcho.tistory.com/955?category=252770