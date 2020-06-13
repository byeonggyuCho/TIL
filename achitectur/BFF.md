## Backend for FrontEnd



## intro
![](/resource/img/etc/BFF.png)
특정 frontend 애플리케이션 또는 인터페이스에서 사용할 별도의 서비스를 만드는 패턴이다.



## why?
서로 다른 인터페이스(디바이스)에서 같은 API를 사용하려고 할때 발생하는 문제를 해결하기 위해서 사용한다.
디바이스 환경에 맞게 각각의 API GateWay를 구현한다.


## BFF를 사용하지 않는 경우 어떤 문제가 있을까?
![](/resource/img/etc/backend-for-frontend.png)

- 웹, 모바일에서 범용적으로API를 사용할 경우 수정사항이 생길 때마다 backends 서비스가 개발 프로세스의 병목 지점이 될 수 있다.

- 다른 디바이스에 대한 로직을 수정해도 범용 API기 때문에 모든 디바이스에 대해 테스트를 해야함

- 각 디바이스별로 팀이 나눠진 경우 API수정시 다른 팀과의 충돌이 발생할 수도 있으며, 업데이트 과정에 대해 부담감을 느낄 수 있다.

- 관리해야하는 소스가 늘어난다.


### BFF를 썼을때 이점.
- 인터페이스당 하나의 backends 서비스를 만든다.
- 각 인터페이스에 따라 발생하는 요구조건의 반영이 자유로움.
- 별도의 backends서비스가 있기때문에 다른 인터페이스에 자유로움


ELK Stack

## REF
- [1](https://sarc.io/index.php/cloud/1984-cdp-bff)
- [2](https://brunch.co.kr/@springboot/38)
- [BFF을 선택한 이유.](https://medium.com/@giljae/back-end-for-front-end-pattern-bff-4b73f29858d6)
- [3](https://docs.microsoft.com/ko-kr/dotnet/architecture/microservices/architect-microservice-container-applications/direct-client-to-microservice-communication-versus-the-api-gateway-pattern)