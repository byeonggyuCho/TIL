# Same-Origin Policy
![](/resource/img/javascript/sameOriginPolicy.png)  
동일 출처정책  
다른 웹페이지로 접근할 때는 같은 출저, 프로토콜, 호스트명, 포트 의 페이지에만 접근이 가능하다.  
따라서 같은 서버로만 데이터를 요청할 수 있다.


다른 도메인으로부터 리소스가 요청될 경우 해당 리소스는 cross-origin HTTP 요청에 의해 요청된다. 하지만 대부분의 브라우저들은 보안 상의 이유로 스크립트에서의 cross-origin HTTP 요청을 제한한다.   
이것을 **Same-Origin-Policy**(동일 근원 정책)이라고 한다.   
요청을 보내기 위해서는 요청을 보내고자 하는 대상과 프로토콜과 포트가 같아야 함을 의미한다.(이 때, 서브 도메인 네임은 상관없다.)  
초기에는 웹 사이트 보안을 위한 좋은 방법이으로 생각되었으나 요즘은 여러 도메인에 걸쳐서 구성되는 대규모 웹 프로젝트가 늘어나고 REST API등을 이용한 외부 호출이 많아지는 상황에서는 거추장스러운 기술이 되고 있는게 현실이다.  

이러한 문제를 해결하기 위해 과거에는 flash를 proxy로 두고 타 도메인간 통신을 했다.  
하지만 모바일 운영체제의 등장으로 flash로는 힘들어졌다. (IOS 는 전혀 플래시를 지원하지 않는다.) 대체제로 나온 기술이 JSONP(JSON-padding)이다.  
jQuery v.1.2 이상부터 jsonp형태가 지원되 ajax 를 호출할 때 타 도메인간ㅍ 호출이 가능해졌다.  
JSONP에는 타 도메인간 자원을 공유할 수 있는 몇 가지 태그가 존재한다. 예를들어 img, iframe, anchor, script, link 등이 존재한다.

SOP에 대한 해결방법중 하나는 CORS(Cross-Origin Resource Sharing)이다. 서버에서 외부 요청을 허용할 경우 ajax요청이 가능해진다.

## Solution
타겟서버를 핸들링 할 수 없을때, Same-Origin policy를 회피하는 방법


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
- [ajax 크로스 도메인 요청.](https://brunch.co.kr/@adrenalinee31/1)

- https://www.w3.org/Security/wiki/Same_Origin_Policy
