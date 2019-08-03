
# Cross-Origin Resource Sharing, CORS


![](/resource/img/network/CORS.png)

- 웹 브라우저에서 외부 도메인 서버와 통신하기 위한 방식을 표준화한 스펙
- 서버와 클라이언트가 정해진 헤더를 통해 서로 요청이나 응답에 반응할지 결정하는 방식
- 요청 받은 웹서버가 허용할 경우에 다른 도메인에서 자원을 주고받을 수 있게 해준다.


다른 도메인으로부터 리소스가 요청될 경우 해당 리소스는 cross-origin HTTP 요청 에 의해 요청된다. 하지만 대부분의 브라우저들은 보안 상의 이유로 스크립트에서의 cross-origin HTTP 요청을 제한한다. 이것을 **Same-Origin-Policy**(동일 근원 정책)이라고 한다. <br>
요청을 보내기 위해서는 요청을 보내고자 하는 대상과 프로토콜도 같아야 하고, 포트도 같아야 함을 의미한다.(이 때, 서브 도메인 네임은 상관없다.)

이러한 문제를 해결하기 위해 과거에는 flash 를 proxy 로 두고 타 도메인간 통신을 했다. 하지만 모바일 운영체제의 등장으로 flash 로는 힘들어졌다. (iOS 는 전혀 플래시를 지원하지 않는다.) 대체제로 나온 기술이 JSONP(JSON-padding)이다. jQuery v.1.2 이상부터 jsonp형태가 지원되 ajax 를 호출할 때 타 도메인간 호출이 가능해졌다. JSONP에는 타 도메인간 자원을 공유할 수 있는 몇 가지 태그가 존재한다. 예를들어 img, iframe, anchor, script, link 등이 존재한다.
<br>
여기서 CORS는 타 도메인 간에 자원을 공유할 수 있게 해주는 것이다. Cross-Origin Resource Sharing 표준은 웹 브라우저가 사용하는 정보를 읽을 수 있도록 허가된 출처 집합을 서버에게 알려주도록 허용하는 특정 HTTP 헤더를 추가함으로써 동작한다.
<br>
- HTTP Header	                    Description
- Access-Control-Allow-Origin	    접근 가능한 url 설정
- Access-Control-Allow-Credentials	접근 가능한 쿠키 설정
- Access-Control-Allow-Headers  	접근 가능한 헤더 설정
- Access-Control-Allow-Methods	    접근 가능한 http method 설정
- Preflight Request
<br>

실제 요청을 보내도 안전한지 판단하기 위해 preflight 요청을 먼저 보내는 방법을 말한다. <br>
즉, Preflight Request는 실제 요청 전에 인증 헤더를 전송하여 서버의 허용 여부를 미리 체크하는 테스트 요청이다. <br>
이 요청으로 트래픽이 증가할 수 있는데 서버의 헤더 설정으로 캐쉬가 가능하다. 서버 측에서는 브라우저가 해당 도메인에서 CORS 를 허용하는지 알아보기 위해 preflight 요청을 보내는데 이에 대한 처리가 필요하다. preflight 요청은 HTTP 의 OPTIONS 메서드를 사용하며 Access-Control-Request-* 형태의 헤더로 전송한다.

<br>
이는 브라우저가 강제하며 HTTP OPTION 요청 메서드를 이용해 서버로부터 지원 중인 메서드들을 내려 받은 뒤, 서버에서 approval(승인) 시에 실제 HTTP 요청 메서드를 이용해 실제 요청을 전송하는 것이다.<br>



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




### ref
- https://spring.io/guides/gs/rest-service-cors/
- https://spring.io/blog/2015/06/08/cors-support-in-spring-framework
- https://brunch.co.kr/@adrenalinee31/1
- https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
- https://ooz.co.kr/232
- https://developer.mozilla.org/ko/docs/Web/HTTP/Access_control_CORS
- https://www.html5rocks.com/en/tutorials/cors/