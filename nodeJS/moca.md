# Moca

## Info
test runner,
```
npm i mocha --save-dev
```

### package dependencies
npm은 프로젝트에 사용하는 노드 패키지 모듈을 package.json에 기록한다.


dependencies
서버에 애플리케이션을 배포하면 서버에서 **npm install --production**을 실행하여 노트 패키지를 설치한다.
이때 **production** 옵션은 dependencies에 등록된 패키징만 설치하도록 하는 옵션이다.

devDependencies
이 리스트는 개발에 필요한 패키지 리스트를 의미한다.
즉 서버에 배포되지 않지만 개발시 필요한 패키지를 관리한다.




보통 파일명에 spec이 들어가면 테스트 코드다.
테스트 코드 자체가 테스트 대상의 명세서(Sepcification)이 되기 때문이다.


### Supertest
 API테스트를 하기위한 노드 패키지
 익스프레스 서버를 구동한뒤 HTTP요청을 보내고 응답을 받는 구조.
 서버 역할을 하는 익스프레스 객체를 가져와야한다.

### assert 모듈
node 기본 모듈, 이것보단 should 모듈을 사용하는게 더 좋다.(node 공식홈페이지)






 ### REF
 - [모카](https://mochajs.org/)