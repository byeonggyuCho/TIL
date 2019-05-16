

# security(보안)
- 인증,권한,비밀번호 암호화.
- 보안	Authentication(인증)->Authorization(허가,승인)
- 기본적인 방식 : session에 데이터를 저장하고 그것으로 구분한다.

## Authentication
1) Credential 기반 인증(자극증을 수여하다)
    ->아이디 = Principal
    ->패스워드=Credential

2) Two-factor 기반 인증(한가지 방식이 아니라 두가지 방식으로 인증을 하는 방식/ 로그인외에 공인인증서를 통안 2차 인증 등)
3) Physical 기반 인증(물리적 기반 인증 : 홍체인식,지문인식, 목소리인식)





### 시큐리티는 기본적으로 aop를 깔고 간다.
- intercepter를 이용한 주입..
- Spring security 모듈에는 자주 사용되는 보안코드를 정리되어있다.

