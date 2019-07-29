## Same-Origin Policy
동일 출처정책
다른 웹페이지로 접근할 때는 같은 출저, 프로토콜, 호스트명, 포트 의 페이지에만 접근이 가능하다.
따라서 같은 서버로만 데이터를 요청할 수 있다.
- https://www.w3.org/Security/wiki/Same_Origin_Policy


### solution
타겟서버의 도움 없이 Same-Origin policy를 회피하는 방법


0. 브라우저
- 외부 서버로 요청을 할 경우에 클라이언트인 웹 브라우저가 요청을 해도 되는지 판단해서 결정한다.
- 브라우저에서 외부 도메인 요청 가능 여부를 확인하는 동작을 무시하도록 설정할수 있다.


1. JSONP 방식
- 서버쪽에서 작업을 못할 경우 하는 방식
- css나 js같은 리소스 파일을 json으로 변환하여 호출한다.
- 리소스를 get방식으로만 불러올 수 있따.
 
2. 서버사이드에서 데이터 요청을한다. 
- Cross Origin Requests for RESTful WebService


### CORS (Cross-Origin Resource Sharing)
- 웹 브라우저에서 외부 도메인 서버와 통신하기 위한 방식을 표준화한 스펙
- 서버와 클라이언트가 정해진 헤더를 통해 서로 요청이나 응답에 반응할지 결정하는 방식
- 요청 받은 웹서버가 허용할 경우에 다른 도메인에서 자원을 주고받을 수 있게 해준다.

### preflight request (사전요청)
요청하려는  URL이 외부 도메인일 경우 웹 브라우저는 preflight요청을 먼저 날리게 된다.
preflight요청은 실제로 요청하려는 경로와 같은 ㅕURL에 대해 OPTIONS메서드로 요청을 미리 날려보고 요청을 할 수 있는 권한이 있는지 확인한다.

위와 같이 CORS 요청을 편법없이 하기 위해서는 클라이언트의 처리만으로는 안되고 해당 서버측에서의 추가 처리 사항이 필요하다.



### 서버에서 CORS요청 핸들링하기


- Access-Control-Allow-Origin: 요청을 허용하는 출처, *이면 모든 곳에 공개되어있음을 의미한다.
- Access-Control-Allow-Credentials : 클라이언트 요청이 쿠키를 통해서 자격 증명을 해야 하는 경우에 true, true를 응답받은 클라이언트는 실제 요청 시 서버에서 정의된 규격의 인증값이 담긴 쿠키를 같이 보내야한다.
- Access-Control-Allow-Expose-Headers: 클라이언트 요청에 포함되어도 되는 사용자 정의 헤더.
- Access-Control-Max-Age : 클라이언트에서 preflight의 요청 결과를 저장할 기간을 지정. 클라이어트에서 preflight 요청의 결과를 저장하고 있을 시간이다. 해당 시간 동안은 preflight요청을 다시 하지 않게 된다.


- Access-Control-Allow-Methods : GET, POST, PUT, DELETE, OPTIONS
- Access-Control-Allow-Headers : Origin,Accept,X-Requested-With,Content-TypemAccess-Control-Request-Method,Access-Control-Request-Headers,Authorizion





https://spring.io/guides/gs/rest-service-cors/
https://spring.io/blog/2015/06/08/cors-support-in-spring-framework
- https://brunch.co.kr/@adrenalinee31/1
- https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS


- https://ooz.co.kr/232
- https://developer.mozilla.org/ko/docs/Web/HTTP/Access_control_CORS

- https://www.html5rocks.com/en/tutorials/cors/
- https://ooz.co.kr/232