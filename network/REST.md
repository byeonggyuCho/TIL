
# REST
- REpresentational State Transfer
- 네트워크 아키텍쳐 원리(웹자원을 의미함)의 모음
- 웹에 존재하는 모든자원(이미지, 동영상, DB자원)에 고유한 url을 부여해 활용
- 자원을 정의하고 자원에 대한 주소를 지정하는 방법론
- 애플리케이션 분리 및 통합, 다양한 클라이언트 등장.
- 체계적 관리
- 주소만 봐도 유추가능
- REST API로 만들어 놓으면 언어 상관없이 HTTP프로토콜을 이용하는 플렛폼에서 사용가능함.


## REST의 구성
- 자원(Resouce) :URI
- 행위(Verb) 
- HTTP Method
- 표현(Representations)	

**REST API**<br> 
rest의 특징을 지키면서 api를 제공하는 것


**RESTFUL**<br>
rest의 원칙을 따른다는 뜻이다.


## REST API 가이드
1. URI는 정보의 자원을 표현해야 한다.
2. 자원에 대한 행위는 HTTP Method(GET, POST, PUT, DELETE)로 표현한다.<br>
단 명확한 표준이 없기때문에 개발하는 서비스의 특징과 개발집단의 환경을 고려하여 설계하는것이 중요하다.

<br><br>
## 특징 
### 1.Uniform(유니폼 인터페이스)
url로 지정한 리소스에 대한 조작을 통일되고 한정적인 인터페이스로 수행하는 아키텍쳐 스타일을 말한다.


### 2.Stateless(무상태성)
- rest는 무상태성 성격을 갖는다 다시 말해 작업을 위한 상태정보를 따로 저장하고 관리하지 않는다.
- 세션정보나 쿠리정보를 별도로 저장하고 관리하지 않기 떄문에 API서버는 들어오는 요청만을 단순히 처리하면된다.
- 따라서 서비스의 자유도가 높아지고 서버에서 불필요한 정보를 관리하지 않음으로써 구현이 단순해진다.

### 3.Cacheable(캐시 기능)
- REST의 가장 큰 특징중 하나는 HTTP라는 기존 웹표준을 그대로 사용하기에, 웹에서 사용하는 기존 인프라를 그대로 활용 가능하다.
- 따라서 HTTP가 가진캐싱 기능이 적용 가능하다.
- HTTP프로토콜 표전에서  사용하는 Last-Modified태그나 E-Tag를 이용하면 캐싱 구현이 가능하다.
- 캐쉬를 사용하게 되면 네트워크 응답시간 뿐만 아니라 Rest 컴포넌트가 위치한 서버에 트랜젝션을 발생시키지 않기 때문에 전체 응답시간과 성능 서버자원 사용률을 향상시킬 수 있다.

### 4.Self-descripttiveness(자체표현구조)
REST의 또 다른 큰 특징 중 하나는 REST API 메시지만 보고도 이를 쉽게 이해 할 수 있는 자체 표현 구조로 되어 있다는 것입니다.


### 5.Client-Server 구조
REST 서버는 API 제공, 클라이언트는 사용자 인증이나 컨텍스트(세션, 로그인 정보)등을 직접 관리하는 구조로 각각의 역할이 확실히 구분되기 때문에 클라이언트와 서버에서 개발해야 할 내용이 명확해지고 서로간 의존성이 줄어들게 됩니다.


### 6.계층형 구조
REST 서버는 다중 계층으로 구성될 수 있으며 보안, 로드 밸런싱, 암호화 계층을 추가해 구조상의 유연성을 둘 수 있고 PROXY, 게이트웨이 같은 네트워크 기반의 중간매체를 사용할 수 있게 합니다.

<br><br>

## REST API 서버 설계

### 1. 최대 2depth
### 2. URI에 리소스명은 동사보다 명사를 사용한다.
1. HTTP Post : /dogs
2. HTTP Get : /dogs
3. HTTP Put : /dogs
4. HTTP Delete : /dogs
<br><br><br>



## REST의 문제점

### RDBMS에 적용의 어려움
- DB테이블이 복합키 구조인 경우 RESTFULL한 설계가 어려워진다.
    - i.e. HTTP Get : /Users/{이름}/{핸드폰번호}
- 이 경우 Alternative Key(의미가 없는 유니크한 식별키, 시퀀스같은)를 사용하는것이 일반적인 해결방법이나 이는 디비 테이블의 수정을 필요로 한다.

### 호환성
- 구형 브라우저가 PUT, DELETE등의 메소드를 지원하지 못함
- 따라서 범용적 사용이 필요한 OPEN API에서는 REST스타일을 따르지 않는 경우가 많음

<br><br><br>



## REST 보안


### 1. 인증 (Authentication)
누가 서비스를 사용하는지 확인하는 절차

#### 1_1 서비스키(API KEY)
서비스키가 노출되면 보안이 뚫려버린다.

#### 2_2  API Token방식
![](/resource/img/network/API_token.png)
- API사용기간을 설정한 API Token을 발급하여 요청을 처리한다.

1. API Client가 사용자 인증정보를 보내서 API 호출을 위한 API 토큰을 발급받는다.
2. API 인증서버는 사용자 인증정보로 사용자인증을 한다(유효성검사)
3. 인증된 사용자에 대해서 API Token을 발급한다.(유효기간)
4. API client는 API Token으로 API를 호출한다. API Server는 API Token이 유효한지를 API Token 관리 서버에 문의하고 API Token이 유효하면 API호출에 응답한다.



**Digest access Authentication**<br>
클라이언트가 인증을 요청할 때 클라이언트가 서버로부터 nonce라는 일정의 난소값을 받은 후에 (서버와 클라이언트는 이 난수를 알고 있다.) 사용자 ID와 PASSWORD를 이 난수를 이용해 HASH해서 서버로 전송하는 방식
이 경우 ID와 PASSWORD가  평문으로 날아가지 않기 때문에 해커가 중간에 PASSWORD를 탈취 할 수 없고 HASH알고리즘을 알고 있다고 하더라도 HASH된 값에서 반대로 PASSWORD를 추출하기가 어렵기 때문에 보안이 강력하다.
<br>
![](/resource/img/network/DigestAccessAuthentication.png)<br>


1. 클라이언트가 서버에 리소스를 요청한다.
2. 서버는 해당 세션에 대한 nonce값을 생성하여 저장한 후에, 클라이언트에 리턴한다. 이때 realm을 같이 리턴하는데 realm은 인정의 범위로 하나의 웹서버에 car.war와 market.war가 각각 http:myweb/car, http://myweb/market이라는 URL로 배포가 되었다고 하면 이 웹사이트는 각각 애플리케이션 car.war와 market.war에 대해서 다른 인증 realm을 갖는다.

    해당 session에 대해서 nonce값을 유지 저장해야 하기 때문에 서버쪽에서는 상태 유지에 대한 부담이 생긴다.
    <br>
    HTTP Session을 이용하거나 서버간에 메모리 공유(memcached나 redis등)을 넣어서 서버간에 상태 정보를 유지할 수 있는 설계가 필요하다.
    <br>

3.	클라이언트는 앞에서 서버로부터 받은 realm과 nonce값으로 Hash 값을 생성하는데, 

    HA1 = MD5(사용자이름:realm:비밀번호)<br>
    HA2 = MD5(HTTP method:HTTP URL)<br>
    response hash = MD5(HA1:nonce:HA2)<br>
    를 통해서 response hash 값을 생성한다.

    예를 들어서 /car/index.html 페이지를 접근하려고 했다고 하자,<br> 
    서버에서 nonce값을 dcd98b7102dd2f0e8b11d0f600bfb0c093를 리턴하였고, <br>
    realm은 car_realm@myweb.com 이라고 하자. <br>
    그리고 사용자 이름이 terry, 비밀 번호가 hello world하면

    HA1 = MD5(terry:car_realm@myweb.com:hello world)로 7f052c45acf53fa508741fcf68b5c860 값이 생성되고<br>
    HA2 = MD5(GET:/car/index.html) 으로 0c9f8cf299f5fc5c38d5a68198f27247 값이 생성된다.<br>
    Response Hash는MD5(7f052c45acf53fa508741fcf68b5c860: dcd98b7102dd2f0e8b11d0f600bfb0c093:0c9f8cf299f5fc5c38d5a68198f27247) 로 결과는 <br>95b0497f435dcc9019c335253791762f 된다.

    클라이언트는 사용자 이름인 “terry”와 앞서 받은 <br>
    nonce값인 dcd98b7102dd2f0e8b11d0f600bfb0c093와 <br>
    계산된 hash값인 95b0497f435dcc9019c335253791762f 값을 서버에게 전송한다.


4.	서버는 먼저 3에서 전달된 nonce값이 이 세션을 위해서 서버에 저장된 nonce 값과 같은지 비교를 한후, 전달된 사용자 이름인 terry와 nonce값 그리고 서버에 저장된 사용자 비밀 번호를 이용해서 3번과 같은 방식으로 response hash 값을 계산하여 클라이언트에서 전달된 hash값과 같은지 비교를 하고 같으면 해당 리소스를 (/car/index.html 파일)을 리턴한다. 


**참고**<br>
-  digest access authentication은 qop (quality of protection)이라는 레벨에 따라서 여러가지 변종(추가적인 보안)을 지원한다.
-  언뜻 보면 복잡해서 보안 레벨이 높아보이지만 사실 Hash 알고리즘으로 MD5를 사용하는데, 
- 이 MD5는 보안 레벨이 낮기 때문에 미정부 보안 인증 규격인 FIPS인증 (http://csrc.nist.gov/publications/fips/fips140-2/fips1402annexa.pdf) 에서 인증하고 있지 않다. 
- FIPS 인증에서는 최소한 SHA-1,SHA1-244,SHA1-256 이상의 해쉬 알고리즘을 사용하도록 권장하고 있다.
- MD5 해쉬의 경우에는 특히나 Dictionary Attack에 취약하다





### 2. 인가 (Authorization)
- 해당 리소스에 대해서 사용자가 그 리소스를 사용할 권한이 잇는지 체크하는 과정
- 사용자 정보의 경우 해당 사용자만 열람할 수 있어야한다.

### 3. 네트워크 레벨 암호화
- 인증 인가 과정이 끝나서 API를 호출하게 되면 네트워크를 통해서 데이터를 주고받는데, 해커가 중간에 낚아 채서 데이터를 엿볼 수 있다.
- 이를 막기 위해 네트워크 프로토콜에서 처리하는 것을 네트워크 레벨 암호화라고 한다.
- HTTP에서의 네트워크 레벨 암호화는 일반적으로 HTTPS 기반의 보안 프로토콜을 사용한다.
- API서버에서 제공하는 인증서를 이용하여 API 클라이언트와 서버간에 암호회된 네트워크를 연결한다.

![](/resource/img/network/https.png)


### 4. 메세지 무결성보장
- 메세지가 해커에 의해 변조되어서는 안된다.
- 메세지에 대한 해쉬코드를 함께보내고 API서버에서 해쉬코드와 메세지를 비교하여 무결성 여부를 검증한다.

### 5. 메세지 본문 암호화
- 전체 메세지 암호화와 특정 필드 암호화가 있다.
- 전체 메세지 암호화는 연산비용이 크고 어렵기 때문에 특정 필드를 암호화하는 것이 좋다.






#### ref
- https://bcho.tistory.com/954?category=252770
- https://bcho.tistory.com/955?category=252770