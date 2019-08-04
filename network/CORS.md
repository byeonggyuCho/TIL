
# Cross-Origin Resource Sharing, CORS


![](/resource/img/network/CORS.png)


- 웹 브라우저에서 외부 도메인 서버와 통신하기 위한 방식을 표준화한 스펙
- 서버와 클라이언트가 정해진 헤더를 통해 서로 요청이나 응답에 반응할지 결정하는 방식
- 요청 받은 웹서버가 허용할 경우에 다른 도메인에서 자원을 주고받을 수 있게 해준다.

CORS는 HTTP에 추가정보를 넣음으로서 다른 도메인에 대한 접근권한을 확인하는 방법이다.<br>
웹 애플리케이션은 다른 서버의 리소스를 요청할때 cross origin HTTP요청을 한다.
<br>
예를 들어 http://domain-a.com에서 XMLHttpRequest를 이용해서 http://api.domain-b.com/data.json에 요청을 보낸다고 해보자.<br>
보안상의 이유로 브라우저는 cross-origin HTTP requests을 할 수 없을 것이다.<br>
따라서 CORS해더를 사용하지 않으면 웹 브라우저는 애플리케이션이 로딩된 도메인과 같은 도메인에서만 API를 요청할 수 없다.<br>


![](/resource/img/network/CORS_principle.png)


**CORS의 용도**<br>
1. XMLHttpRequest나 Fetch API등으로 cross domain 요청을 할때.
2. Web Fonts
3. WebGL textures.
4. Images/video frames drawn to a canvas using drawImage().



## 1. 개요
CORS를 이용하기 위해선 HTTP해더를 추가해야한다.<br>
이 헤더에는 Client 도메인이 타겟 도메인의 정보에 대한 요청권한이 있음을 알리는 정보가 담겨있다.
CORS에서는 서버데이터의 사이드이펙트를 야기하는 HTTP 요청(GET, MIME types를 포함한 POST요청등)에 대해서  Client 브라우저는 "preflight"을 해야한다.
"preflight"란 HTTP OPTIONS 메소드를 이용하여 API Server에 요청권한을 확인하고 서버로 부터 승인이 떨어졌을때 실제 요청을 하는것을 말한다.<br>
Preflight Request는 실제 요청 전에 인증 헤더를 전송하여 서버의 허용 여부를 미리 체크하는 테스트 요청이다.<br>
이 요청으로 트래픽이 증가할 수 있는데 서버의 헤더 설정으로 캐쉬가 가능하다.
preflight 요청은 HTTP 의 OPTIONS 메서드를 사용하며 Access-Control-Request-* 형태의 헤더로 전송한다.
<br>
또 서버는 해당 요청에 대한 인증정보(credentials, Cookies나 HTTP Authentication data)가 포함되어야 하는지를 알려준다.

서버 측에서는 브라우저가 해당 도메인에서 CORS 를 허용하는지 알아보기 위해 preflight 요청을 보내는데 이에 대한 처리가 필요하다. 

<br>
이는 브라우저가 강제하며 HTTP OPTION 요청 메서드를 이용해 서버로부터 지원 중인 메서드들을 내려 받은 뒤, 서버에서 approval(승인) 시에 실제 HTTP 요청 메서드를 이용해 실제 요청을 전송하는 것이다.<br>



**preflight request**<br>
요청하려는  URL이 외부 도메인일 경우 웹 브라우저는 preflight요청을 먼저 날리게 된다.
preflight요청은 실제로 요청하려는 경로와 같은 URL에 대해 OPTIONS메서드로 요청을 미리 날려보고 요청을 할 수 있는 권한이 있는지 확인한다.<br><br><br>



## 2.HTTP 요청헤더

### 1. Origin
요청이 초기화 된곳에서 서버를 가리키는 URL 서버이름만 포함한다.

### 2.Access-Control-Request-Method
실제 요청이 일어나는 경우 어떤 HTTP 메서드가 사용될 것인지 서버에 알리기 위해 사전 전달시 사용

### 3.Access-Control-Request-Headers
실제 요청이 일어나는 경우 어떤 HTTP 헤더가 사용될것인지 서버에 알리기 위해 사전 전달 요청시 사용
<br><br><br>



## 3.HTTP 응답헤더

### 1. Access-Control-Allow-Origin
요청을 허용하는 출처, *이면 모든 곳에 공개되어있음을 의미한다.

```
Access-Control-Allow-Origin: http://mozilla.org
```
### 2. Access-Control-Allow-Credentials 
클라이언트 요청이 쿠키를 통해서 자격 증명을 해야 하는 경우에 true, true를 응답받은 클라이언트는 실제 요청 시 서버에서 정의된 규격의 인증값이 담긴 쿠키를 같이 보내야한다.

```
Access-Control-Allow-Credentials: true
```

### 3. Access-Control-Expose-Headers
클라이언트 요청에 포함이 가능한 사용자 정의 헤더.

```
Access-Control-Expose-Headers: X-My-Custom-Header, X-Another-Custom-Header
```
### 4.Access-Control-Max-Age 
클라이어트에서 preflight 요청의 결과를 저장하고 있을 시간이다. <br>
preflight 결과를 캐싱처리함으로서 트래픽이 증가하는것을 피한다.

```
Access-Control-Max-Age: <delta-seconds>
```

### 5.Access-Control-Allow-Methods

```
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
```

### 6.Access-Control-Allow-Headers
preflight 요청의 응답으로 사용된다.
실제 요청에서 허용되는 헤더 목록을 알려준다.

```
Access-Control-Allow-Headers: Origin,Accept,X-Requested-With, Content-TypemAccess-Control-Request-Method, Access-Control-Request-Headers, Authorizion
```



## 4.예제

### 1. Simple requests
preflight를 요청하지 않는 경우이다.

이 케이스에는 제약사항이 따른다.

1. HTTP method는 GET, HEAD, POST만 사용 가능하다.
2. Content-Type
    - application/x-www-form-urlencoded
    - multipart/form-data
    - text/plain
3. 추가적으로 설정 가능한 헤더는 다음과 같다
    - Accept
    - Accept-Language
    - Content-Language
    - Content-Type
    - Downlink
3. ReadableStream object를 요청에 사용할 수 없다.
4.  XMLHttpRequestUpload 이벤트 리스너를 사용할 수 없다.


다음은 http://foo.example에서  http://bar.other의 컨텐츠를 요청하는 셈플이다.

```js
const invocation = new XMLHttpRequest();
const url = 'http://bar.other/resources/public-data/';
   
function callOtherDomain() {
  if (invocation) {    
    invocation.open('GET', url, true);
    invocation.onreadystatechange = handler;
    invocation.send(); 
  }
}

```

![](/resource/img/network/cors_ex1.png)


요청 헤더
```
GET /resources/public-data/ HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.5; en-US; rv:1.9.1b3pre) Gecko/20081130 Minefield/3.1b3pre
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7
Connection: keep-alive
Referer: http://foo.example/examples/access-control/simpleXSInvocation.html
Origin: http://foo.example
```

Origin 속성을 통해 요청 도메인을 확인할 수 있다.


응답
```
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 00:23:53 GMT
Server: Apache/2.0.61 
Access-Control-Allow-Origin: *
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Transfer-Encoding: chunked
Content-Type: application/xml
```
 Access-Control-Allow-Origin: * 임으로 모든 도메인으로 부터 요청이 가능하다.




 ### 2. Preflighted requests
 앞서 예제와 달리 이번 예제에서는 실제 요청을 보내기 전에 사전 확인 절차를 거치는데
 이를 preflighted Request라고 한다.<br>
 preflighted Request는 HTTP OPTION 메소드를 이용해서 preflighted Request를 먼저 보내서 실제 요청을 보낼 수 있는지 여부를 확인하는 요청을 말한다.


다음 조건중 하나가 만족할때. preflighted Request을 보낸다.

1. 다음 HTTP Method를 이용하는 경우.
    - PUT
    - DELETE
    - CONNECT
    - OPTOINS
    - TRACE
    - PATCH

2. user agent에 의해 자동설정되는 헤더외에 다음의 목록이 아닌 헤더가 포함되는 경우.
    - Accept
    - Accept-Language
    - Content-Language
    - Content-Type
    - Downlink

3. Content-Type 헤더의 값이 다음 목록과 다른 경우
    - application/x-www-form-urlencoded
    - multipart/form-data
    - text/plain

4. XMLHttpRequestUpload 객체에 하나이상의 이벤트 리스터가 등록된 경우.

5. 요청에 ReadableStream 객체를 사용한 경우.


```js
var invocation = new XMLHttpRequest();
var url = 'http://bar.other/resources/post-here/';
var body = '<?xml version="1.0"?><person><name>Arun</name></person>';
    
function callOtherDomain(){
  if(invocation)
    {
      invocation.open('POST', url, true);
      invocation.setRequestHeader('X-PINGOTHER', 'pingpong');
      invocation.setRequestHeader('Content-Type', 'application/xml');
      invocation.onreadystatechange = handler;
      invocation.send(body); 
    }
}
```
이 예제에서는 Content-Type을 application/xml으로 한 것과 X-PINGOTHER라는 커스텀 헤더를 사용했기때문에
preflighted request를 보낸다는 점을 주목하자.
(식별되지 않은 요청임으로 확인절차를 거쳐야한다)
<br><br>

![](/resource/img/network/cors_ex2.png)

preflight
```
OPTIONS /resources/post-here/ HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.5; en-US; rv:1.9.1b3pre) Gecko/20081130 Minefield/3.1b3pre
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7
Connection: keep-alive
Origin: http://foo.example
Access-Control-Request-Method: POST
Access-Control-Request-Headers: X-PINGOTHER


HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: http://foo.example
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: X-PINGOTHER
Access-Control-Max-Age: 1728000
Vary: Accept-Encoding, Origin
Content-Encoding: gzip
Content-Length: 0
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain
```


real request
```
POST /resources/post-here/ HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.5; en-US; rv:1.9.1b3pre) Gecko/20081130 Minefield/3.1b3pre
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7
Connection: keep-alive
X-PINGOTHER: pingpong
Content-Type: text/xml; charset=UTF-8
Referer: http://foo.example/examples/preflightInvocation.html
Content-Length: 55
Origin: http://foo.example
Pragma: no-cache
Cache-Control: no-cache

<?xml version="1.0"?><person><name>Arun</name></person>


HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:40 GMT
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: http://foo.example
Vary: Accept-Encoding, Origin
Content-Encoding: gzip
Content-Length: 235
Keep-Alive: timeout=2, max=99
Connection: Keep-Alive
Content-Type: text/plain
```


preflight요청을 살펴보자.
OPTIONS 메소드 서버로부터 실제요청을 수용할지 알아보기위해 사용되는 HTTP 1.1메서드이다. 
이 요청에서 다음의 헤더에 주목하자.
```
Access-Control-Request-Method: POST
Access-Control-Request-Headers: X-PINGOTHER
```
위 두개의 헤더는 실제 요청이 POST이라는 것과
비 표준 헤더인  X-PINGOTHER를 사용한다는것을 서버에 알리는 것을 의미한다.


이에 대한 서버의 응답으로 수용 가능한 요청정보(도메인, 메서드, 비 표준 헤더)를 반환한다. <br>
Access-Control-Max-Age는 캐쉬처리를 하는 시간을 의미하는데 각 브라우저마다 최대값을 가지고 있고
최대값 이상 설정하면 브라우저의 최대값으로 설정된다.
```
Access-Control-Allow-Origin: http://foo.example
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
Access-Control-Max-Age: 86400
```


모든 브라우저가 CORS 프로토콜을 완벽하게 지원하진 않는다.
따라서 Cross domain를 회피하기 위한 몇가지 방법이 있다.

1. 서버에서 preflight가 필요하지 않도록 수정한다. (컨트롤 권한이 있는 경우)
2. preflight가 필요하지 않도록  request를 수정한다. (i.g. Simple Request)

이런 방법들은 서버에서 인증헤더(Authorization header)를 요청하는 경우에만 유용한 방법이다.


### ref
- https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
- https://ooz.co.kr/232
- https://brunch.co.kr/@adrenalinee31/1
- https://spring.io/guides/gs/rest-service-cors/
- https://spring.io/blog/2015/06/08/cors-support-in-spring-framework
- https://www.html5rocks.com/en/tutorials/cors/