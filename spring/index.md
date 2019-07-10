
# 스프링(Spring)
- 프로젝트의 표준안을 제공함.
- 전자정부 프레임워크로 Spring을 지정됐기 때문에 국가단위 프로젝트를 할때 사용됨.
- 유지보수에 용이하다. 어떤 회사 사람이 오든 같은방식으로 사용하기 때문에.
- 디버깅을 할때 stack of flow나 구글링을 통해서 오류를 해결하는 방법밖에 없다.
- 오류방식이 Fram이란 구조 속에 숨어있기때문에 직접적으로 알기 어렵기때문...



## 1.설치방법
1) 개발 툴
    - intelliJ + Plug_in
    - 이클립스 + Plug_in
    - STS (string의 옷을 입힌 eclipse라고 보면된다) 
        - 무거움... 
        - string.io에서 다운받자.
        - TC server라는 자체 내장 서버를 제공한다.
    

## 2. 특징
1) 참고 
    - 공식사이트
        - (string.io)
    - https://www.egovframe.go.kr/
        - 국내 전자정부 사이트, 때때로 무료교육도 시행하는데 굉장히 인기 있기때문에 신청을 서둘러야한다
    - 오픈 커뮤니티 
        - https://open.egovframe.go.kr/
        - 내가 만든 프로젝트가 규격에 맞는지 확인도 해준다

2) 전자정부 프레임 워크
    - 모든 개발 분야에서 사용할 수 있는 프레임 워크


3) EJB - Spring
    - 여러서버에 분산하여 bean을 사용한다.
    - 이런 방식을 사용할때는 굉장히 큰 규모의 프로젝트르 진행할때..
    - 굉장히 무겁고 복잡함....

4) 정의 
    - 엔터프라이즈 어플리케이션에서 필요로 하는 기능을 제공하는 프레임워크 

5) J2EE가 제공하는 다수의 기능을 제공한다.
    - SE : standard edition
    - EE : enterprise edition
    - ME : micro edition

6) 경량 프레임워크
    - EJB에 비하면 가볍다

7) DI : 의존성 독립.

8) AOP: 중복코드를 최소화하는 패턴

9) POJO (Plain Old Java Object)
    - 순수하게 자바를 가지고 구현을 한다.
    - 특정 환경이나 플렛폼을 타지 않는다.

10) Transaction처리를 위한 일관성 있는 방법을 제공한다.
    - All or nothing(말던가 다하던가)
    - try{~~~} catch{ rollback(); commit();}
    - 데이터가 변질되면 안되는 중요한 처리.

11) 영속성(Data Persistence)과 관련된 다양한 API제공
    - DB에 연동해서 사용할 수 있는 함수를 제공한다.
    - 요즘 트랜드는 DB전용 프레임워크를 사요한다.
    - 이런 기능은 자체적인 테스트 정도로 사용한다.



## 3. 장단점
1) 이점
	- 일관성있는작업(협업에 편함)
	- 생산 효율성
2) 단점
	- 변화에 적응하기 힘들다.
	- 배우기가 힘들다.


    
### 전자정부 프레임워크
- Spring에서 정부에서 만든 plate form을 상속받아서 그 규격이 맞추어 만들었느냐 하는것....




## Spring project
- maven프로젝트를 기반으로 한다.	
- spring starter 프로젝트 
    - 스프링을 신속하게 시작할 수 있게 설정을 잡아준다.
    - 설정파일 생성및, 폴더 생성및 등등..

### www.spring.org
- spring boot

    스프링을 쉽게 시작할 수 있게 기반을 잡아준다.<br>
    이것을 기반으로 한 프로젝트가 spring starter프로젝트<br>
    스프링을 잘 모르는 사람들을 위한 기술.<br>
    대신에 기초설정및 cumstumizing을 하기 번거롭다.<br>

- spring legacy

    기초설정을 사용자가 셋팅해야한다.<br>
    선택할때 template을 mvc가 깔려있는 start legacy mvc 를 선택한다.<br>
    시작도메인에 페키지 이름을 정한다. com.yesman.팩키지명 <br>


