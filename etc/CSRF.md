# Cross Site Request Forgery

## TR;DR;

1. 사용자가 브라우저에 로그인해있다(유효한 쿠기보유)
2. 사용자가 공격용 URL이 img의 src 속성값으로 박혀있는 페이지에 접근
3. 사용자의 인증정보(쿠키)를 사용한 스크립트가 실행
4. 서버는 공격명령을 사용자의 요청으로 인식하고 실행

## 참고

- HSTS헤더

## 방어방법

### Double-Submit Cookie Pattern

1. 브라우저는 get요청으로 토큰값과 \_csrf(시크릿키)값을 서버로 부터 받는다
2. 브라우저에서 write요청시 header에 토큰값을 주고 쿠키값에 시크릿키를 부여하여 서버의 미들웨어에서 토큰값을 decode해서 decode한 시크릿키가 쿠키값과 일치하는지 체크한다

## REF

- [CSRF](https://velog.io/@jeong3320/CSRF-%EA%B3%B5%EA%B2%A9)
