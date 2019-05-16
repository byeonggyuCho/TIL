
# Maven
- Spring이란 프레임워크를 유지보수하기 위한 툴.
- 프로젝트 생성과 유지보수까지(요람에서 무덤까지!)
- Ant, Gradle

1) 목표 및 특징.
    1) 빌드절차를 간소화시킬 수 있다: 통합된 빌드 시스템 제공
    2) Quility Project Information 제공.
        : 개발에 있어서 Best Practice를 위한 지침 제공
    3)프로젝트 관리 도구
    4)모듈간의 의존성을 관리하는 매커니즘을 제공
        - (lib버전충돌 해결)lib를 하나의 lib에 저장하고 project간에 같은 lib를 사용할 수 있게끔 한다.
        - 서버에 저장된 lib를 서버주소를 이용해서 사용 할 수 있다.
    5)소스코드 디렉토리의 구조를 표준화
    ....



2) 문법

    제대로 공부하려면 일주일정도는 공부해야함...
1) POM.XML (project object Model)
      - Maven은 pom에 project에 대한 모든 정보를 기술되어있다.	
     - 프로젝트 환경설정파일이라고 생각하면된다.
~~~ XML
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>3.8.1</version>
    <scope>test</scope>
</dependency>
~~~

pom.xml에서 이 <dependency>태그 부분에서 lib를 자동으로 준비해준다.
- 서버에 들어가서 lib를 다운받는다.
-  www.mvnrepository.com 이 홈페이지에서 웬만한 양식은 모두 찾을 수 있다.
- Like this... <https://mvnrepository.com/artifact/mysql/mysql- connector- java/5.1.42>
- 이런식으로  <dependency>태그를 pom.xml에 추가하면 자동으로 lib가 준비된다.

** Spring툴 받기 :http://spring.io/tools/sts/all 



* 리모트 레포지토리
    - 서버에 lib가 저장된 장소를 "리모트 레포지토리"라고 부른다.

* 로컬 레포지토리
    로컬에 라이브러리를 저장하고 그 폴더에 있는 lib를 프로젝트에 공유하는 방법
    이때 로컬의 lib폴더를 "로컬 레포지토리"라고 한다.
    기본위치: "\c/.m2"라는 폴더가 자동으로 생긴다.
    이곳에 다운받은 라이브러리가 저장된다.


- mvn을 실행할때는 porm.xml이 있는곳에서 실행해야한다.
    'mvn compile'
- packaging하기
    'mvn package'


### Goal
-  complie package같은 기능을 Goal이라 부른다.


2) Build Lifecycle & Pase
    validate
    initialize
    generate- sources
    ...
    compile			//컴파일
    process- classes
    ...
    test- compile
    test
    package			//패키지
    ...
    verify
    install
    deploy			//배포.
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    clean			//싹 지워버린다.

    - 이 순서대로 단계가 진행된다.

3) Maven의 기본구조
    Project Root
        src
            main
                java
                resources
                filters
                asseambly
                config
                webapp
            test
                java
                resources
                filters
            site
        
    *ResourcesFolder에 SpringXMLfile를 생성한다
        - 스피링에 맞는 xml 형식이 갖추어져 있당.
        - xsd: 스키마 : 다양한 기능이 필요할때 체크해주면 제공 받을 수 있다.
            =>코딩이 손쉬워진당.				
        - 요기에 facotory의 역할을 써준다.ㅇ


3.플러그인 과 끝 
mvn resources:resources
mvn javadoc:jar
...

pom.xml에서 실제 파일명에 영향을 주는테그.
<finalName>

*mvn clean package
(이런식으로 goal을 연속적으로 실행 할 수 있다)


##http://spring.io/tools/sts/all

**mvn site
프로젝트를 소개할 수 있는 홈페이지를 자동으로 만들어준다.
- 제작자 등등...


**자체적인 서버기능 보유
- jetty


**프로젝트의 기본틀을 잡아준다.
**라이브러리를 공용으로 사용하게 만들어준다.


**spring은 교제를 자체적으로 구매해서 공부하는게 좋다...
인터넷으로 자료를 취합하기 어렵기때문..		




**EX1) 응용프로젝트
mvn archetype:generate - DgroupId=mygroup1 - DartifactId=myproject1 - DarchetypeArtifactId=maven- archetype- quickstart

1) DgroupId : 임의의 식별자 지정.
2) DartifactId
3) DarchetypeArtifactId: 프로젝트 종류
maven- archetype- quickstart: 응용프로그램 만들때 쓰는 타입.

- 같은 형태로 프로젝트로 작업을 시작 할 수 있다.
- main에서 실행하고 test에서 test한다.
    - 항상 test를 하면서 작업 하도록하는구조.

EX2) 웹프로젝트
mvn archetype:generate - DgroupId=mygroup2 - DartifactId=myproject2 - DarchetypeArtifactId=maven- archetype- webapp

packaging이 war넹.
