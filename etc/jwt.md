# JSON Web Token

## Intro

JWT은 쉽게 말해 토큰의 한 종류입니다.  
많이 들어는 봤지만 토큰이 뭔지? 인증에 쓰는건 알겠는데 왜 쓰는건지? 전통적인 인증 방식으로 잘 하고 있었는데 무슨 차이가 있는지?
이런 궁금증을 해결하기에 앞서 토큰에 대한 정의에서 부터 한번 알아보도록 하겠습니다.

이 글을 [이 포스팅](https://velopert.com/2389)을 개인적으로 정리한 글임을 밝힙니다.

## 토큰이란?

토큰이란 간단히 정리해서 암호화되어있는 인증정보로 정리할 수 있습니다.  
이전의 전통적인 방식에서는 서비스를 제공하는 서버에서 이런 인증정보를 보관하고 있었지만 몇가지 문제로 인해 새로운 방법을 고안해냈는데 그게 바로 토큰입니다.  
서버가 아니라 암호화하여 클라이언트가 정보를 가지고 있는 것이죠.  
우선 토큰을 왜 쓰게 됐는지 이해하기 위해 전통적인 인증 방법에 대해서 알아보도록 하겠습니다.

### 서버기반 인증

![](/resource/img/etc/loginLogic.png)
기존의 인증 시스템에서는 서버에서 사용자들의 정보를 기억하고 있어야합니다.  
이 세션을 유지하기 위해서 메모리 디스크 데이터 베이스등의 여러가지 방법이 사용됩니다.  
아직도 많이 사용되는 방식이지만 이 방식에는 몇 가지 문제가 있습니다.

### 서버 기반 인증의 문제점

#### 1. 서버 과부하

유저가 인증을 할 때, 서버는 이 기록을 서버에 저장해야합니다. 이를 세션이라고 합니다.  
대부분의 경우에 메모리에 세션을 저장하는데 이 방법은 사용자가 늘어날때마다 메모리를 할당해야하는 문제가 생깁니다.  
즉 서버의 가상 메모리 공간이 과부하가 될 수 있는 구조입니다.  
이를 피하기위해 데이터베이스에 시스템에 저장하기도 하지만 이 방법 역시 유저의 데이터 수가 많으면 데이터베이스 성능에 무리를 줄 수 있습니다.

#### 2. 서버의 확장성

세션을 이용해 사용자 인증정보를 서버에서 관리하는 구조에서는 서버의 확장성이 떨어집니다.  
여기서 말하는 확장이란 더 많은 트래픽을 감당하기 위하여 여러개의 프로세스를 돌리거나 여러 대의 서버 컴퓨터를 추가하는 것을 의미합니다.  
세션을 사용해 분산된 시스템을 설게하는 것은 과정이 복잡합니다.

#### 3.CORS

웹 어플리케이션에서 세션을 관리할 떄 자주 사용되는 쿠키는 단일 도메인 및 서브 도메인에서만 작동하도록 설계되어있습니다.  
따라서 쿠키를 여러 도메인에서 관리하는 것은 번거롭습니다.

## 토큰 기반시스템의 작동원리

지금까지 전통적 인증방식의 문제점에 대해 알아봤습니다.  
이제 토큰이란 기능이 어떻게 동작하는지? 앞서 알아본 문제점을 어떻게 해결할 수 있는지 살펴보겠습니다.  
session을 이용해 인증정보를 저장하는 서버를 stateful서버라고 합니다. 즉 어떤 상태값을 가지고 있다는 말입니다.
반면 토큰 기반의 Stateless서버에서는 상태를 유지하지 않습니다. 이것만으로도 지금까지 나열한 세션기반 인증의 문제점이 상당부분 해결됩니다.  
인증정보를 서버에서 보관하지 않기때문에 자원을 절약할수 있고 클라이언트와의 종속성이 사라져 확장성을 확보할 수 있습니다.

토큰 기반의 대략적인 인증로직은 다음과 같습니다.

![](/resource/img/etc/token-diagram.png)

1. 사용자가 id와 password를 입력하여 로그인을 시도합니다.
2. 서버는 요청을 확인하고 secret key를 통해 Access token을 발급합니다.
3. JWT 토큰을 클라이언트에 전달 합니다.
4. 클라이언트에서 API 을 요청할때 클라이언트가 Authorization header에 Access token을 담아서 보냅니다.
5. 서버는 JWT Signature를 체크하고 Payload로부터 사용자 정보를 확인해 데이터를 반환합니다.
6. 클라이언트의 로그인 정보를 서버 메모리에 저장하지 않기 때문에 토큰기반 인증 메커니즘을 제공합니다.
   인증이 필요한 경로에 접근할 때 서버 측은 Authorization 헤더에 유효한 JWT 또는 존재하는지 확인한다.
   JWT에는 필요한 모든 정보를 토큰에 포함하기 때문에 데이터베이스과 같은 서버와의 커뮤니케이션 오버 헤드를 최소화 할 수 있습니다.
   Cross-Origin Resource Sharing (CORS)는 쿠키를 사용하지 않기 때문에 JWT를 채용 한 인증 메커니즘은 두 도메인에서 API를 제공하더라도 문제가 발생하지 않습니다.
   일반적으로 JWT 토큰 기반의 인증 시스템은 위와 같은 프로세스로 이루어집니다.
   처음 사용자를 등록할 때 Access token과 Refresh token이 모두 발급되어야 합니다.

## 토큰의 특징

### Stateless 서버

사용자 인증을 하는 가장 흔한 방법은 사용자 정보를 session에 보관하는 것입니다.  
이렇게 클라이언트에게서 요청을 받을 때마다 클라이언트의 상태를 계속 유지하면서 정보를 제공하는 서버를 stateful 서버라고 부릅니다.  
정리하자면 정보를 서버에 저장하는 서버라고 할 수 있습니다. 이럴 경우 서버의 메모리 혹은 데이터베이스에 정보를 보관해야하는데 이때 서버 자원이 사용됩니다.
반대로 Stateless서버는 사용자 정보를 유지하지 않는 서버라 할 수 있습니다.  
이렇게 보관중인 상태가 없는 경우 클라이언트와 서버의 커플링이 사라져 서버의 확장성이 높아집니다.

### 모바일 어플리케이션에 적합하다.

만약 모바일 어플리케이션을 개발한다면 안전한 API를 만들기 위해 쿠키같은 인증스시템은 이상적이지 않습니다.  
토큰 기반의 인증을 도입하면 쿠키 컨테이너를 만들어야하는 번거로움을 해결할 수 있습니다.

### 보안

토큰 기반 인증 시스템을 사용하여 어플리케이션의 보안을 높일 수 있습니다.

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

분산 마이크로 서비스 환경에서 중앙 집붕식 인증 서버오 데이터베이스에 의존하지 않는 쉬운 인증 및 인가를 제공합니다.

## JWT이란?

이제 전통적 인증방식과 토큰기반 시스템을 거쳐 이 포스팅의 주제인 JWT을 알아볼 차례입니다.

- JSON Web Token (JWT) 은 웹표준 (RFC 7519) 으로서 두 개체에서 JSON 객체를 사용하여 가볍고 자가수용적인 (self-contained) 방식으로 정보를 안전성 있게 전달해줍니다.
- JWT는 서버와 클라이언트 간 정보를 주고 받을 때 HTTP Request Header에 JSON 토큰을 넣은 후 서버는 별도의 인증 과정없이 헤더에 포함되어 있는 JWT 정보를 통해 인증한다.
- 이때 사용되는 JSON 데이터는 URL-Safe 하도록 URL에 포함할 수 있는 문자만으로 만든다.
- 사용자 인증에 필요한 모든 정보를 토큰 자체에 포함하기 떄문에 별도의 인증 저장소가 필요없다.

### 자기 수용적

인증에 필요한 모든 정보를 자체적으로 가지고 있기 때문에 별도의 인증 저장소가 필요하지 않습니다.
JWT 시스템에서 발급된 토큰은, 토큰에 대한 기본정보, 전달 할 정보 그리고 토큰이 검증됐다는 것을 증명해주는 signature를 포함하고 있습니다.

### 전달이 쉽다.

JWT의 자기숭요적 특성은 두 개체 사이에서 손쉽게 전달 될 수 있다는 것을 의미합니다.  
웹서버의 경우 HTTP의 헤더에 넣어서 전달할 수 있고 URL의 파라미터로도 전달이 가능합니다.

## JWS ( JSON WEB SIGNATURE) 와 JWE ( JSON WEB ENCRYPTION)

JSON Web Signature (JWS)는 JSON 데이터 구조를 사용하는 서명 표준이며  
JSON Web Encryption (JWE)는 JSON 데이터 구조를 사용하는 암호화 방법입니다.  
JWS (JSON Web Signature)은 간단히 말하면 “JSON으로 전자 서명을하여 URL-safe 문자열로 표현한 것”입니다.
JWE (JSON Web Encryption)는 “JSON을 암호화하여 URL-safe 문자열로 표현한 것” 입니다.
서명은 서명 할 때 사용한 키를 사용하여 JSON이 손상되지 않았는지 확인 할 수 있도록하는 것입니다.
URL Safe는 말 그대로 URL에 포함 할 수없는 문자를 포함하지 않는 것입니다.

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

3. signature  
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
  typ: "JWT",
  alg: "HS256",
};

// encode to base64
const encodedPayload = new Buffer(JSON.stringify(payload))
  .toString("base64")
  .replace("=", "");
console.log("payload: ", encodedPayload);

/* Result:
header: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9
*/
```

## 정보(payload)

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

공개 클레임들은 중복되지 않은 이름을 가지고 있어야합니다. 충돌을 방지하기 위해서는 클레임 일므을 URI 형식으로 짓습니다.

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
  iss: "velopert.com",
  exp: "1485270000000",
  "https://velopert.com/jwt_claims/is_admin": true,
  userId: "11028373727102",
  username: "velopert",
};

// encode to base64
const encodedPayload = new Buffer(JSON.stringify(payload))
  .toString("base64")
  .replace("=", "");

console.log("payload: ", encodedPayload);

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
HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret);
```

이렇게 만든 해쉬를 base64형태로 나타내면 됩니다.  
이떄 hex->base64인코딩을 해야함을 주의해야합니다.

```js
const crypto = require("crypto");
let secretKey = "admin123";
let encodedHeader = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9";
let encodeedPayload =
  "eyJpc3MiOiJ2ZWxvcGVydC5jb20iLCJleHAiOiIxNDg1MjcwMDAwMDAwIiwiaHR0cHM6Ly92ZWxvcGVydC5jb20vand0X2NsYWltcy9pc19hZG1pbiI6dHJ1ZSwidXNlcklkIjoiMTEwMjgzNzM3MjcxMDIiLCJ1c2VybmFtZSI6InZlbG9wZXJ0In0";
const signature = crypto
  .createHmac("sha256", secretKey)
  .update(encodedHeader + "." + encodedPayload)
  .digest("base64")
  .replace("=", "");
console.log("signature: ", signature);
// WE5fMufM0NDSVGJ8cAolXGkyB5RmYwCto1pQwDIqo2w
```

헤더와 payload의 사이에 `.`을 넣어주고 이 값을 secretKey로 해싱하고 base64로 인코딩을 했습니다.  
여기서도 마찬가지로 Base64의 padding (`=`)을 지워주는 작업을 해주는걸 잊으면 안됩니다.

이제 최종적으로 완성된 JWT입니다.

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ2ZWxvcGVydC5jb20iLCJleHAiOiIxNDg1MjcwMDAwMDAwIiwiaHR0cHM6Ly92ZWxvcGVydC5jb20vand0X2NsYWltcy9pc19hZG1pbiI6dHJ1ZSwidXNlcklkIjoiMTEwMjgzNzM3MjcxMDIiLCJ1c2VybmFtZSI6InZlbG9wZXJ0In0.WE5fMufM0NDSVGJ8cAolXGkyB5RmYwCto1pQwDIqo2w
```

[https://jwt.io/ ](https://jwt.io/)에서 예제로 생성한 JWT을 확인 가능합니다.

## 장점

JWT 의 주요한 이점은 사용자 인증에 필요한 모든 정보는 토큰 자체에 포함하기 때문에 별도의 인증 저장소가 필요없다는 것입니다.
분산 마이크로 서비스 환경에서 중앙 집중식 인증 서버와 데이터베이스에 의존하지 않는 쉬운 인증 및 인가 방법을 제공합니다.
개별 마이크로 서비스에는 토큰 검증과 검증에 필요한 비밀 키를 처리하기위한 미들웨어가 필요합니다. 검증은 서명 및 클레임과 같은 몇 가지 매개 변수를 검사하는 것과 토큰이 만료되는 경우로 구성됩니다.
토큰이 올바르게 서명되었는지 확인하는 것은 CPU 사이클을 필요로하며 IO 또는 네트워크 액세스가 필요하지 않으며 최신 웹 서버 하드웨어에서 확장하기가 쉽습니다.

JSON 웹 토큰의 사용을 권장하는 몇 가지 이유는 다음과 같다.

- URL 파라미터와 헤더로 사용
- 수평 스케일이 용이
- 디버깅 및 관리가 용이
- 트래픽 대한 부담이 낮음
- REST 서비스로 제공 가능
- 내장된 만료
- 독립적인 JWT

## 단점

- 토큰은 클라이언트에 저장되어 데이터베이스에서 사용자 정보를 조작하더라도 토큰에 직접 적용할 수 없습니다.
- 더 많은 필드가 추가되면 토큰이 커질 수 있습니다.
- 비상태 애플리케이션에서 토큰은 거의 모든 요청에 대해 전송되므로 데이터 트래픽 크기에 영향을 미칠 수 있습니다.

## 토큰을 어디에 저장할까?

1. 웹스토리지( localStorage, sessionStorage)
2. 쿠키

### 1.웹스토리지

- 하나의 도메인에 제한되지 않는다.
- XSS 공격을 통하여 토큰이 탈취 될 수 있다.

### 2.쿠키

쿠키를 정보 전송수단으로 사용한다.  
서버측에서 응답을 하면서 쿠키를 설정 해 줄 때 `httpOnly` 값을 활성화를 해주면, 네트워크 통신 상에서만 해당 쿠키가 붙게 됩니다.  
 따라서, 브라우저상에서는, 자바스크립트로 토큰값에 접근하는것이 불가능해지죠.

- XSS 공격을 방어할 수있다.

#### 문제1. 토큰을 전달할 수 없기 때문에 쿠키가 한정된 도메인에서만 사용이 된다.

- SOL) 토큰을 다른 도메인에 사용할 상황에서는 현재 쿠키에 있는 토큰을 사용하여 새 토큰을 문자열로 받아올 수 있게 하는 API를 구현하면 된다

#### 문제2. CSRF(Cross-site request forgery) 공격의 위험성이 생긴다.

- SOL) CSRF는 HTTP 요청 referer 체크하고 , CSRF 토큰을 사용해서 방지할 수 있습니다.

## 맺는글

예제에서는 이해를 위해 직접 base64인코딩을 하거나 해싱을 했지만 실제 JWT서비스를 이용할 떄는 이런 작업을 알아서 해줍니다.

## 보안은 어떻게 뚫리나?

### XSS

해커가 클라이언트 브라우저에 자바스크립트를 삽입해서 실행하는 공격이다.  
해커가 토큰을 탈취하거나 로그인되어있는 브라우저에 코드를 실행하여 사용자인 척 행세할 수 있다.

### CSRF

해커가 클라이언트 브라우저에 저장된 유저 인증정보를 서버로 보내면 다른 사이트에서 사용자만 가능한 요청을 할 수 있다.

## REF

- [JWT 이해](https://backend-intro.vlpt.us/4/)
- [JWT](https://velopert.com/2389)
- [JWT기반 인증](https://velopert.com/2350)
- [보다 제사한 정보..](http://www.opennaru.com/opennaru-blog/jwt-json-web-token/)
- [조대협블로그-1](https://bcho.tistory.com/999)
- [조대협블로그-2](https://bcho.tistory.com/1000)
- [안전한 JWT 웹 서비스 인증 구현하기](https://diokun.wordpress.com/2017/04/07/%EC%95%88%EC%A0%84%ED%95%9C-jwt-%EC%9B%B9%EC%84%9C%EB%B9%84%EC%8A%A4-%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%9D%B8%EC%A6%9D-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0/)
- [ACCESS Token 저장위치에 대한 고찰](https://velog.io/@ehdrms2034/Access-Token-%EC%A0%80%EC%9E%A5-%EC%9C%84%EC%B9%98%EC%97%90-%EB%8C%80%ED%95%9C-%EA%B3%A0%EC%B0%B0)

- https://blog.aliencube.org/ko/2015/02/12/can-json-web-token-jwt-alter-session-object/
- https://idlecomputer.tistory.com/242
- https://nesoy.github.io/articles/2020-03/JWT
