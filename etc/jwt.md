# JSON Web Token



## 토큰이란?

### Stateless 서버
사용자 인증을 하는 가장 흔한 방법은 사용자 정보를 session에 보관하는 것입니다.  
이렇게 클라이언트에게서 요청을 받을 때마다 클라이언트의 상태를 계속 유지하면서 정보를 제공하는 서버를 stateful 서버라고 부릅니다.  
정리하자면 정보를 서버에 저장하는 서버라고 할 수 있습니다.  이럴 경우 서버의 메모리 혹은 데이터베이스에 정보를 보관해야하는데 이때 서버 자원이 사용됩니다. 
반대로 Stateless서버는 사용자 정보를 유지하지 않는 서버라 할 수 있습니다.  
이렇게 보관중인 상태가 없는 경우 클라이언트와 서버의 커플링이 사라져 서버의 확장성이 높아집니다.  


### 모바일 어플리케이션에 적합하다.  
만약 모바일 어플리케이션을 개발한다면 안전한 API를 만들기 위해 쿠키같은 인증스시템은 이상적이지 않습니다.  
토큰 기반의 인증을 도입하면 쿠키 컨테이너를 만들어야하는 번거로움을 해결할 수 있습니다. 

### 인증정보를 다른 어플리케이션으로 전달할 수 있다.
페이스북/구글 같은 소셜 계정들을 이용하여 다른 웹서비스에서 로그인하는 서비스를 제공할 수 있습니다.  
소셜 로그인 기능이죠

### 보안 
토큰 기반 인증 시스템을 사용하여 어플리케이션의 보안을 높일 수 있습니다.  



## 왜 쓰게 됐을까?
토큰의 탄생을 알아보기전에 과거 인증시스템을 살펴볼 필요가 있습니다.  

### 서버기반 인증 

![](/resource/img/etc/loginLogic.png)
기존의 인증 시스템에서는 서버에서 사용자들의 정보를 기억하고 있어야하빈다.  
이 세션을 유지하기 위해서 메모리 디스크 데이터 베이스등의 여러가지 방법이 사용됩니다.  


아직도 많이 사용되는 방식이지만 이 방식에는 몇 가지 문제가 있습니다.

### 서버 기반 인증의 문제점


#### 1. 세션
유저가 인증을 할 때, 서버는 이 기록을 서버에 저장해야합니다. 이를 세션이라고 합니다.  
대부분의 경우에 메모리에 세션을 저장하는데 이 방법은 사용자가 늘어날때마다 메모리를 할당해야하는 문제가 생깁니다.  
즉 서버의 가상 메모리 공간이 과부하가 될 수 있는 구조입니다.  
이를 피하기위해 데이터베이스에 시스템에 저장하기도 하지만 이 방법 역시 유저의 데이터 수가 많으면 데이터베이스 성능에 무리를 줄 수 있습니다.  

#### 2.확장성
세션을 이용해 사용자 인증정보를 서버에서 관리하는 구조에서는 서버의 확장성이 떨어집니다.  
여기서 말하는 확장이란 더 많은 트래픽을 감당하기 위하여 여러개의 프로세스를 돌리거나 여러 대의 서버 컴퓨터를 추가하는 것을 의미합니다.  
세션을 사용해 분산된 시스템을 설게하는 것은 과정이 복잡합니다. 


#### 3.CORS
웹 어플리케이션에서 세션을 관리할 떄 자주 사용되는 쿠키는 단일 도메인 및 서브 도메인에서만 작동하도록 설계되어있습니다.  
따라서 쿠키를 여러 도메인에서 관리하는 것은 번거롭습니다.  

### 토큰 기반시스템의 작동원리
토큰 기반의 Stateless서버에서는 상태를 유지하지 않습니다. 이것만으로도 지금까지 나열한 세션기반 인증의 문제점이 상당부분 해결됩니다.  
인증정보를 서버자원을 통해 보관하지 않음으로 보다 쾌적하고 클라이언트와의 종속성이 사라져 확장성을 확보할 수 있습니다.  

토큰 기반의 대략적인 인증로직은 다음과 같습니다.  

1. 사용자가 로그인 요청을 한다.
2. 서버에서 사용자 정보를 검증한다.
3. 계정정보가 인증되면 서버에서 signed토큰을 발급합니다.  
4. 클라이언트 측에서 전달받은 토큰을 저장해두고 서버에 요청을 할때마다 토큰을 함께 서버에 전달합니다.  
5. 서버는 토큰을 검증하고 요청에 응답합니다.  
    - 웹서버에서 토큰을 서버에 전달 할 때, HTTP요청의 헤더에 토큰값을 포함시켜 전달한다.


![](/resource/img/etc/token-diagram.png)



## 토크의 장점

### 여러 플램폼 및 도메인
CORS의 문제를 토큰을 통해해결할 수 있습니다.  
어플리케이션과 서비스의 규모가 커지면 여러 디바이스를 호환시키고 더 많은 종류의 서비스를 제공하게 됩니다. 토큰을 사용하면 다른 디바이스나 다른 도메인에서도 토큰의 유효성을 검증하여 인증을 처리할 수 있습니다.  
단 크로스 도메인을 위해 서버측 어플리케이션 응답부분에 다음 헤더를 포함시켜야합니다. 
```
Access-Control-Allow-Origin: *
```
이런 구조라면 서버가 오직 API만 다루도록 설계가 가능합니다.  


### 웹 표준 기반
토큰 기반 인증 시스템의 구현체인 JWT는 웹표준에 등록된 기술입니다.  
따라서 여러 환경에서 지원이 됩니다.  


### 서버의 확장성
인증정보를 서버에 보관하지 않기때문에 클라이언트와의 종속성이 사라졌습니다.  
이렇게 되면 여러개의 서버에 세션을 공유하기 위해 분산처리를 하지 않더라도 개별적인 서버에서 인증정보를 확인할 수 있습니다.  


### 인증정보의 확장성
인증정보의 확작성이란 소셜로그인을 가능함을 뜻합니다.  
즉, 로그인 정보가 사용되는 분야를 확장하는게 가능합니다. 다른 서비스에서도 권한을 공유할 수 있는 것이죠. 




## JWT이란?
- JSON Web Token (JWT) 은 웹표준 (RFC 7519) 으로서 두 개체에서 JSON 객체를 사용하여 가볍고 자가수용적인 (self-contained) 방식으로 정보를 안전성 있게 전달해줍니다.
- JWT는 서버와 클라이언트 간 정보를 주고 받을 때 HTTP Request Header에 JSON 토큰을 넣은 후 서버는 별도의 인증 과정없이 헤더에 포함되어 있는 JWT 정보를 통해 인증한다.
- 이때 사용되는 JSON 데이터는 URL-Safe 하도록 URL에 포함할 수 있는 문자만으로 만든다.



이 글을 [이 포스팅](https://velopert.com/2389)을 개인적으로 정리한 글임을 밝힙니다. 

### 자기 수용적
필요한 모든 정보를 자체적으로 가지고 있습니다.  
JWT 시스템에서 발급된 토큰은, 토큰에 대한 기본정보, 전달 할 정보 그리고 토큰이 검증됐다는 것을 증명해주는 signature를 포함하고 있습니다.  


### 전달이 쉽다.
JWT의 자기숭요적 특성은 두 개체 사이에서 손쉽게 전달 될 수 있다는 것을 의미합니다.  
웹서버의 경우 HTTP의 헤더에 넣어서 전달할 수 있고 URL의 파라미터로도 전달이 가능합니다. 


## 언제 쓸까? 

### 1. 회원인증
1. 사용자 로그인
2. 서버는 유저 정보를 기반으로 토큰 발급
3. 유저가 서버에 요청을 할 때 마다 JWT를 포함하여 전달.  
4. 서버가 클라이언트의 요청을 받을 때마다 해당 토큰의 유효성과 사용자의 작업 권한 검증.

인증에 사용될 경우 서버에 유저의 세션을 유지 할 필요가 없다. 유저가 보낸 토큰만 검증하면 된다.  
세션 관리 비용을 절약해서 서버자원을 아낄 수 있다.  


### 2. 정보교류
JWT는 두 개체 사이에서 안정성 있게 정보를 교환하기에 좋은 방법입니다.  
정보다 sign이 되어있기 때문에 정보를 보낸이가 바뀌진 않았는지 또 정보가 도중에 조작되지는 않았는지 검증할 수 있다.  



## JWT 장점
- 사용자 인증에 필요한 모든 정보를 토큰 자체에 포함하기 떄문에 별도의 인증 저장소가 필요없다.  



## 구성
```
    aaaa.bbbb.cccc
```
.을 구분자로 3가지 문자열로 되어있습니다.  
각각 헤더, 내용, 서명을 의미합니다.  

1. header  
토큰의 타입과 해시 암호화 알고리즘으로 구성되어 있다.

2. payload  
토큰에 담을 클레임 정보를 포함하고 있다. name-Value 한 쌍으로 이루어져 있고 여러개의 클래임들을 넣을 수 있다.

2. signature  
secret key를 포함하여 암호화되어 있다.  


## 1.헤더 
헤더는 두가지 정보를 가지고 있다. 토큰의 타입과 해싱 알고르짐을 지정합니다.  
해싱 알고리즘에는 보통 HMAC SHA256 혹은 RSA가 사용되며, 이 알고리즘은 signature를 통해 토큰을 검증할 때 사용됩니다.  

```js
{
  "typ": "JWT",
  "alg": "HS256"
}
```

이 정보를 base64로 인코딩합니다.  

```js
const header = {
  "typ": "JWT",
  "alg": "HS256"
};

// encode to base64
const encodedPayload = new Buffer(JSON.stringify(payload))
                            .toString('base64')
                            .replace('=', '');
console.log('payload: ',encodedPayload);

/* Result:
header: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9
*/
```


## 정보
payload에는 토큰에 담을 정보가 있습니다.  
이때 name-value의 쌍으로 이루어진 정보의 단위를 클레임(claim)이라고 부릅니다.  
토큰은 여러개의 클레임을 넣을 수 있습니다.  
클레임은 크게 3가지로 분류할 수 있습니다.  

1. 등록된 클레임
2. 공개 클레임
3. 비공개 클레임 

### 1. 등록됨 클레임
등록된 클레임들은 서비스에 필요한 정보가 아닌 토큰에 대한 정보를 담기 위하여 이름이 이미 정해진 클레임 들입니다.  
등록된 클레임의 사용은 모두 선택적이며, 종류는 다음과 같습니다.  

- iss: 토큰 발급자 (issuer)
- sub: 토큰 제목 (subject)
- aud: 토큰 대상자(audience)
- exp: 토큰 만료시간(expiraton), 시간은 NumberDate 형식으로 되어있어야하며 현재 시간보다 이후로 설정되어야합니다. 
- nbf: not Before를 의미하며, 토큰의 활성 날짜와 비슷한 개념입니다. 여기에도 NumbericDate형식으로 날짜를 지정하며, 이 날짜가 지나기 전까지는 토큰이 유효하다 처리하지 않습니다.  
- iat: 토큰이 발급된 시간, 이 값을 사용하여 토큰의 age가 얼마나 되었는지 판단할 수 있다.
- jti : JWT의 고유 식별자로서, 주로 중복적인 처리를 방지하기 위하여 사용된다. 욀회용토큰에 유용하다. 



### 2. 공개 클레임
공개 클레임들은 중복되지 않은 이름을 가지고 있어야합니다.  충돌을 방지하기 위해서는 클레임 일므을 URI 형식으로 짓습니다.  
```js
{
    "https://velopert.com/2389/is_admin": true
}
```

### 3. 비공개 클레임
양 측간의 협의하에 사용되는 클레임 이름들입니다. 공개 클레임과는 달리 이름이 중복되어 충돌이 생길 수 있습니다.  
```json
{
    "username": "cater"
}
```

이제 payload의 모든 구성을 알아봤습니다.  
다음은 이 포스팅에서 사용할 payload의 셈플입니다. 
```json
{
    "iss": "velopert.com",
    "exp": "1485270000000",
    "https://velopert.com/jwt_claims/is_admin": true,
    "userId": "11028373727102",
    "username": "velopert"
}
```
2개의 등록된 클레임, 공개클래임 1개, 비공개클래임 2개로 구성되어있습니다.  
이제 header와 마찬가지로 base64로 인코딩합니다.  

```js
const payload = {
    "iss": "velopert.com",
    "exp": "1485270000000",
    "https://velopert.com/jwt_claims/is_admin": true,
    "userId": "11028373727102",
    "username": "velopert"
};

// encode to base64
const encodedPayload = new Buffer(JSON.stringify(payload))
                            .toString('base64')
                            .replace('=', '');

console.log('payload: ',encodedPayload);

/* result
payload:  eyJpc3MiOiJ2ZWxvcGVydC5jb20iLCJleHAiOiIxNDg1MjcwMDAwMDAwIiwiaHR0cHM6Ly92ZWxvcGVydC5jb20vand0X2NsYWltcy9pc19hZG1pbiI6dHJ1ZSwidXNlcklkIjoiMTEwMjgzNzM3MjcxMDIiLCJ1c2VybmFtZSI6InZlbG9wZXJ0In0
*/
```

```
base64로 인코딩을 할떄 dA== 처럼 =문자가 한두개 붙을 떄가 있습니다.  
이 문자는 padding을 의미하는 문자로 생략을 해도 내용이 변하지 않습니다.  
JWT토큰을 URL의 파라미터로 전달 될 때도 있는데 이때 =문자가 url-safe하지 않으므로 제거해야 오작동을 막을 수 있습니다. 
```


## 서명
서명은 헤더의 인코딩값과 정보의 인코딩값을 함친 후 주어진 비밀키로 해쉬를 하여 생성합니다.  
```js
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```
이렇게 만든 해쉬를 base64형태로 나타내면 됩니다.  
이떄 hex->base64인코딩을 해야함을 주의해야합니다.  


```js
const crypto = require('crypto');
let secretKey = 'admin123'
let encodedHeader = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9'
let encodeedPayload = 'eyJpc3MiOiJ2ZWxvcGVydC5jb20iLCJleHAiOiIxNDg1MjcwMDAwMDAwIiwiaHR0cHM6Ly92ZWxvcGVydC5jb20vand0X2NsYWltcy9pc19hZG1pbiI6dHJ1ZSwidXNlcklkIjoiMTEwMjgzNzM3MjcxMDIiLCJ1c2VybmFtZSI6InZlbG9wZXJ0In0';
const signature = crypto.createHmac('sha256', secretKey)
             .update(encodedHeader + '.' + encodedPayload)
             .digest('base64')
             .replace('=', '');
console.log('signature: ',signature);
// WE5fMufM0NDSVGJ8cAolXGkyB5RmYwCto1pQwDIqo2w
```
헤더와 payload의 사이에 `.`을 넣어주고 이 값을 secretKey로 해싱하고 base64로 인코딩을 했습니다.  
여기서도 마찬가지로 Base64의 padding (`=`)을 지워주는 작업을 해주는걸 잊으면 안됩니다.  

이제 최종적으로 완성된 JWT입니다.  
```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ2ZWxvcGVydC5jb20iLCJleHAiOiIxNDg1MjcwMDAwMDAwIiwiaHR0cHM6Ly92ZWxvcGVydC5jb20vand0X2NsYWltcy9pc19hZG1pbiI6dHJ1ZSwidXNlcklkIjoiMTEwMjgzNzM3MjcxMDIiLCJ1c2VybmFtZSI6InZlbG9wZXJ0In0.WE5fMufM0NDSVGJ8cAolXGkyB5RmYwCto1pQwDIqo2w
```
[https://jwt.io/ ](https://jwt.io/)에서 예제로 생성한 JWT을 확인 가능합니다.  



## 맺는글
예제에서는 이해를 위해 직접 base64인코딩을 하거나 해싱을 했지만 실제 JWT서비스를 이용할 떄는 이런 작업을 알아서 해줍니다.  



## REF
- [JWT](https://velopert.com/2389)
- [JWT기반 인증](https://velopert.com/2350)