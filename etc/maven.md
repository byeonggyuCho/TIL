
# Maven
![](/resource/img/etc/maven.jpeg)

자바 프로젝트의 빌드(build)를 자동화 해주는 빌드 툴<br>
즉, 자바 소스를 compile하고 package해서 deploy하는 일을 자동화 해주는 것<br>
표준화된 빌드와 산출물 리포지토리 모델을 제공하며 프로젝트를 관리하고 그에 관해서 설명할 수 있는 엔진을 포함하는 도구<br>
프로젝트 산출물을 빌드 테스트 배포하는 표준 라이프 사이클을 정의하고 이를 따르는 프로젝트에 공통적인 빌드로직을 쉽게 재사용할 수 있게 해주는 프레임워크<br>
공식 홈페이지에서 설명하는 메이븐의 6가지 특성은 다음과 같다.
- 1 빌드 절차 간소화
- 2 통합된 빌드 시스템 제공
- 3 Quility Project Information 제공
- 4 개발에 있어서 Best Practice를 위한 가이드 제공
- 5 소스코드 디렉토리 구조 표준화
- 6 의존성 관리


**주요기능**<br>
1. Build
    - 소스 코드를 컴파일 한다.
    - 테스트 코드를 컴파일한다.
    - 기타 패키지 생성을 위한 바이너리를 생성한다.
2. Package
    - 배포 가능한 JAR, WAR, EAR 파일 등을 생성한다.
3. Test
    - 단위 테스트 등을 실행한다.
    - 빌드 결과가 정상적인지 점검한다.
4. Report
    - 빌드/패키지/테스트 결과를 정리하고 빌드 수행 리포트를 생성한다.
5. Release
    - 빌드 후 생섣된 아티팩트(artifact)를 로컬 혹은 원격 저장소에 저장(배포)한다
 
*cf.* build tool: Ant, Gradle, Gulp, Webpack





## 1. 주요개념

``` xml
<build>
    <plugins>
        <plugin>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>2.1</version>
            <configuration>
                <source>1.6</source>
                <tartget>1.6</target>
            </configuration>
        </plugin>
    </plugins>
</bild>

```

### 1-1 플러그인(plugin)
- 메이븐은 플러그인 실행 프레임워크이다.
- 메이븐의 플러그인 메커니즘에 의해 기능이 확장된다. (모든 작업은 플러그인이 수행한다)
- 사용자 관점에서는 앤트(ant)의 타스크(task)혹은 타겟(target)과 유사하다
- 플러그인은 다른 산출출(artifacts)와 같이 저장소에서 관리된다.
- 플러그인은 골(goal)의 집합니다.
### 1-2 모조(Mojo)
- 메이븐은 여러 가지 프러그인으로 구성되어 있으며, 각각의 플러그인은 하나 이상의 goal(명령, 작업)을 포함하고 있다.
- Goal은 플러그인과  goal 명칭의 조합으로 실행할 수 있다.
    - i.e. mvn archetype:generate
- 메이븐은 어러 goal을 묶어 라이프 사이클 단계(lifecycle phases)로 만고 실행한다.
    - i.e. mvn install
### 1-3 라이프사이클(lifecycle)
- 메이븐의 동작 방식은 일련의 단계에 연계된 goal을 실행하는 것이며, 논리적인 작업 흐름인 단계의 집합이 라이프 사이클이다.
    - 빌드 단계들은 사전 정의된 순서대로 살행된다.
    - 모든 빌드 단계는 이전 단계가 성곡적으로 실행되었을 때, 실행된다.
- 빌드 단계는 goal들로 구성된다.
    - Goal은 특정 작업, 최소한의 실행 단위(task)이다.
    - 각 단계는 0개 이상의 goal과 연관(associate)된다.
- 메이븐은 3개의 표준 라이프사이클을 제공한다.
    - clean : 빌드 시 생던되었던 산출물을 지운다.
    - default : 일반적인 빌드 프로세스를 위한 모델이다.
    - site : 프로젝트 문서와 사이트 작성을 수행한다.
### 1-4 단계(phase)
- 단계는 논리적인 개념이며, 실질적인 작업을 수행하는 것은 각각의 단계에 연결 플러그인 goal이다.
- 패키지 타입에 따라 각 단계에서 수행하는 goal이 달라질 수 있다.
- default 라이프 사이클은 jar를 생성하는 작업들을 수행하며, 다음과 같은 goal들로 구성된다.
- 우리가 maven을 실행할 때는 보통 빌드 라이프 사이클의 단계를 지정해서 실행한다.
- 여기서 주의할 점은 빌드 후반부에 있는 단계를 실행할 경우 자동적으로 전반부에 있는 단계도 실행 된다는 점이다.
- 테스트를 건너뛰려면 어떻게 해야할까
    - 명령행에 -Dmaven.test.skip=true 파라미터를 출가한다.



~~~
    mvn compile
    mvn proecess-resources
    mvn package
~~~


![](/resource/img/etc/mavenLifeCycle.jpeg)
![](/resource/img/etc/mavenLifeCyle2.png)


**defulat Lifecycle**<br>
1. validate <br>
프로젝트의 상태가 정상인지 여부와 빌듳에 필요한 모든 정보가 존재하는 지 검사한다. 이 과정은 pom.xml 파일 트리 구조를 검증한다.
2. initailize <br>
빌드 상태를 초기화한다. 속성을 설정하거나, 작업 디렉터리 등을 생성하는 작업을 수행한다.
3. generate-sources<br>
컴파일에 필요한 소스를 생성한다.
4. process-sources<br>
필요한 모든 값에 대한 필터링 처리등 소스코드를 가공한다. 소스의 파싱, 수정, 변경을 제공한다. 일반 코드 또는 생성된 코드 모두 여기서 처리된다.
5. generate-resources<br> 
패키지에 포함될 자원들을 생성한다. 보통 메타데이터 파일과 설정 파일을 포함한다.
6. process-resources <br>
패키지 작업을 준비하기 위해 자원들을 대상 디렉터리로 복사하고 가공한다.
7. compile<br>
프로젝트의 소스를 컴파일한다. 컴파일된 클래스들은 타킷 디렉터리 트리 구조에 저장된다.
8. process-classes<br>
컴파일 된 파일들에 대한 후처리(post-process)를 수행한다.
(i.e. 자바 클래스에 대한 byte0code enhancement)
9. generate-test-sources<br>
컴파일 하기 위해 테스를 위한 소스 코드를 생성한다.
10. process-test-sources<br>
필요한 값에 대한 필터링 처리 등 테스트 소스 코드를 가공한다.
11. generate-test-resources<br>
테스트 수행을 위한 자원을 생성한다.
12. process-test-resources<br>
테스트 대상 디렉터리에 자원을 복사하고 가공한다.
13. test-compile<br>
테스트 소스 코드를 컴파일하고 대상 디렉터리에 담는다.
14. process-test-classes<br>
컴파일 된 테스트 파일들에 대한 후처리(post-process)를 수행한다.
15. test<br>
적합한 단위 테스트 프레임워크를 이용해 테스를 수행한다. 테스트 코드는 패키지 되거나 배포된 패키지 없이 실행될 수 있어야한다.
16. prepare-package<br>
실제 패키지 생성을 수행하기 전에 필요한 사전 작업을 수행한다.
17. package<br>
실행 가능한 비이너리 파일들을 JAR나 WAR같은 배포용 압축파일로 묶는다.
18. pre-integration-test<br>
통합 테스트를 준비한다. 이 경우 통합 테스트는 실제 배치 환경의 코드를 테스트 하는 것을 말한다.
이 단계에서 위에서 묶은 압축 파일을 서버에 배치할 수 있다.
19. integration-test<br>
실제 통합 테스트를 수행한다.
20. post-integration-test<br>
통합 테스트 수행 이후의 후처리 작업을 수행한다. (환경 설정 해제 등의 작업)
이것은 테스트 환경의 리셋 또는 재초기화 과정을 포함할 수 있다.
21. verify <br>
패키지가 품질 기준에 적합한지 여부를 검사하는 작업을 수행한다.
22. install<br>
다른 프로젝트에서 참조하고 사용할 수 있도록 패키지를 로컬 저장소에 설치한다.
23. deploy <br>
다른 개발자 혹은 프로젝트와 공유할 수 있도록 원격 저장소에 최정 패키지를 배포한다.


**clean_lifecycle**
1. pre-clean <br>
clean 작업을 수행하기에 앞서 필요한 사전 작업을 수행한다.
2. clean<br>
이전 빌드에서 생성된 모든 파일들을 삭제한다.
3. post-clean<br>
프로젝트 clean작업을 끝내기 위해 필요한 작업을 수행한다.


**site_lifecycle**
1. pre-site<br>
사이트 생성을 수행하기에 앞서 필요한 사전 작업을 수행한다.
2. site<br>
프로젝트 사이트 문서를 생성한다.
3. post-site<br>
프로젝트 사이트 생성을 긑내기 위해 필요한 작업을수행하고 배포를 위한 사전 작업을 수행한다.
4. site-deploy<br>
생성된 사이트 문서를 대상 웹 서버에 배포한다.


### 1-5 의존성(dependency)
- 라이브러리 다운로드 자동화
    - 더이상 의존성이 연류된 라이브러리를 일일이 다운로드 받을 필요가 없다. 필요하다고 선언만 하면 메이븐이 자동으로 다운받는다.
- 메이븐은 선언적이다.
    - 사용하는 jar파일들을 어디서 다운로드 받고, 어느 버전인지 명시하면, 코딩을 하지 않아도 메이븐이 알아서 관리한다(재 다운로드, 최신버전 설치등)
- 메이븐이 관리한다.
    - 라이브러리 디렉터리를 생성할 필요가 없다.
    - 이클립스 내에서 라이브러리 클래스 패스 환경설정을 할 필요가 없다.

### 1-6 프로파일(profile)
- 서로 다른 대상 환경을 위한 다른 빌드 설정
    - 다른 운영체제
    - 다른 배포 환경
- 동작 방식
    - -P명령행 실행환경(CLI) 옵션
- 메이븐은 정상 절차 이외에 프로파일을 위한 절차를 추가로 수행한다.

### 1-7 CoC
- Convention over Configuartion
- 관습으로 인해 더 편해진다.
    - 개발자는 소스나 실행 파일 디렉터리 명칭을 그냥 보고 알 수 있다.
    - 개발자들의 관습 혹은 암묵적으로 알고 있는 디렉터리나 위치 정보를 빌드 도구들도 똑같이 사용하자.
    - 설정 작업이 좀더 간결해지고 쉬워진다.

<br>
<br>
<br>





## 2. Description
###  POM.XML (Project Object Model)
- Maven은 pom에 project에 대한 모든 정보를 기술되어있다.	
- 프로젝트 환경설정파일이라고 생각하면된다.
- 프로젝트 관계설정
    - groupId, artifactId, version
    - 모듈
    - 상속
    - 의존 라이브러리 관리.
    - 의존 프로젝트(상위, 하위, 모듈 등)
- 프로젝트 기본설정
    - 프로젝트 이름
    - 프로젝트 URL
    - 프로젝트 참여자
    - 라이센스
- 빌드설정
    - 소스/테스트 디렉토리
    - 리소스 디렉토리
    - 플러그인 
- 빌드환경설정
    - 빌드할 환경에 따른 정보
    - 프로파일

~~~ XML
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
 
    <groupId>com.example</groupId>
    <artifactId>demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>jar</packaging>
 
    <name>demo</name>
    <description>Demo project for Spring Boot</description>
 
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.0.5.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
 
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <java.version>1.8</java.version>
    </properties>
 
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
 
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
 
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
~~~

1. 프로젝트 정보 항목
    - name : 프로젝트 이름
    - url : 프로젝트 사이트 url

2. 프로젝트 연관정보
    - groupId : 프로젝트 그룹 아이디, 도메인이나 특정한 정보로 식별. 일반적으로 풀 도멘인 이름을 쓴다.
    - artifactId : 프로젝트 Artifact ID 설정, 프로젝트에 의해 생성되는 Artifact명-version, packaging의 형태로 Artifact 파일이 생성
    - version : 버전 설정. i.e. SampleApp-0.0.1-SNAPSHOT.jar중 0.0.1-SNAPSHOT이 version임
    - packaging : 패키징 타입 설정. jar뿐만 아니라 웹 어플리케이션을 위한 war JEE를 위한 EAR등의 패키징 타입을 정할 수 있다.

3. dependenceis : 이 프로젝트에서 의존하는 다른 프로젝트 정보를 기술
    - dependency : 의존하는 프로젝트 POM 정보를 기술
        - groupId : 의존하는 프로젝트의 그룹 ID
        - artifactId : 의존하는 프로젝트의 artifact Id
        - version : 의존하는 프로젝트의 버전
        - scope: 의존하는 범위 (complie, runtime, provied, test로 scope가 나뉨)

4. 빌드 설정
    - build : 프로젝트 빌드와 관련한 기본적인 소스 디렉토리 구조, 빌드 산출물 디렉토리 구조, 빌드시 사용할 플러그인 정보를 관리.
        1. sourceDirectory : 실제 서비스를 담당하는 자바 소스코드를 관리하는 디렉토리
        2. testSourceDirectory : 테스트 소스를 관리하기 위한 디렉토리 메이븐 빌드 툴은 서지스 소스 코드와 테스트 소스 코드를 분리해서 관리하며, 배포시 테스트 소스코드가 같이 배포되지 않게한다
        3. outputDirectory: sourceDirectory의 소스를 컴파일한 결과물이 위치하는 디렉토리
        4. resources : 서비스에 사용되는 자원을 관리하는 디렉토리
        5. testResources : 테스트 시에 필요한 자원을 관리하기 위한 디렉토리
        6. pluginManagement : 빌드 설정 파일에서 관리하는 플러그인 목록. 이 엘리먼트에 설정되어 있다고 해서 반드시 사용하는 것은 아님
        7. repositories : 빌드할 때 접근할 저장소의 위치를 관리한다.

**의존성전이**<br>
Spring이나 JDBC처럼 의존관계가 축라되는 라이브러리등은 해당 타켓 라이브러리만 지정해주면 maven이 자동으로 타켓이 의존하는 라이브러리를 설정해준다.
- 중앙 저장소에서 라이브러리를 다운받을 때 *.pom도 같이 다운로드 하게 되는데 이 pom을 통해 명시된 의존관의 모듈도 함께 다운받는다.
- 따라서 의존관계에 있는 라이브러리들도 함께 받는다.

![](/resource/img/etc/maven_dependency.jpeg)

<br>
<br>
<br>

### 의존범위(SCOPE)

의존 범위는 쉽게 생각하면 서버측 구동 자원이 로컬에만 필요할 경우 그것을 구분하기 위한 범위 설정이라고 보면된다.

- compile : 기본 scope. 컴파일 할 떄 필요. 배포 시에도 배포되는 라이브러리
- provided : 컴파일 할 떄 필요하지만, 컨테이너 등에서 기본으로 제공되는 모듈임을 의미한다.  배포시 제외된다.
    - i.e. servlet-api.jar
- runtime : 컴파일시에는 필요하지 않지만 런타임에는 필요하다. 배포시 포함.
- test : 테스트 단계에 필요한 라이브러리 (배포시 제외된다.)
- system : provided와 비슷하다. 단지 우리가 직접 jar 파일을 제공해야한다. 따라서 이 스코프의 jar 파일은 저장소에서 관리되지 않을 수 있다.
- import : 다른 POM설정 파일에 정의되어 있는 의존 관계 설저을 현재 프로젝트로 가져온다. 





**리모트 레포지토리**<br>
서버에 lib가 저장된 장소를 "리모트 레포지토리"라고 부른다.<br><br>

**로컬 레포지토리**<br>
로컬에 라이브러리를 저장하고 그 폴더에 있는 lib를 프로젝트에 공유하는 방법<br>
이때 로컬의 lib폴더를 "로컬 레포지토리"라고 한다.<br>
기본위치: "\c/.m2"라는 폴더가 자동으로 생긴다.<br>
이곳에 다운받은 라이브러리가 저장된다.<br>


## 3. Maven Standard Directory Layout
   ![](/resource/img/etc/mavenFolderStructure.jpg)

- src/main/java : 자바 소스코드
- src/main/resouce : 프로젝트에서 사용하는 리소스. 클래스 파일과 같이 패키지 된다. 프로퍼티파일, 설정 파일이 대표적인 리소스다.
- src/main/filters : 리소스에 대한 필터. 리소스 파일내에서 사용하는 변수와 그 값을 가지고 있다.
- src/main/config : 설정 파일들
- src/main/webapp : War 프로젝트에서 사용되는 웹 어플리케이션 디렉토리
- src/test/java : 자바 유닛 테스를 위한 소스코드
- src/test/java : 유닛 테스트에서 사용되는 리소스
- src/test/java : 유닌 테스트 리소스용 필터
- src/site : 메이븐 프로젝트 웹사이트를 만들기 위한 파일

- .m2/settings.xml : 이 파일은 인증, 저장소들과 메이븐 기능을 커스터마이즈할 수 있는 다른 정보를 포함하고 있다.
- .m2/repository/ 
    - 이 디렉토리는 메이븐의 로컬저장소 이다.
    - 원격 메이븐 저장소에서 디펜던시를 다운로드할 때, 이곳에 디펜던시의 복사본을 저장한다.





## 아키타입(archetype)
메이븐에서 제공하는 여러가지 구조의 프로젝트 템플릿.


    *Bulid tools are programs that automate thre creation of excutalbe applications from source code --techopedia.com*


## 참조
- https://maven.apache.org/what-is-maven.html
- https://medium.com/@dulajdilshan/do-you-know-maven-a-dependency-manager-or-a-build-tool-what-is-pom-bd7dd8b43e80
- https://dsmoon.tistory.com/entry/Maven-Quick-Guide
- https://unabated.tistory.com/entry/Maven-%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%83%9D%EC%84%B1-%EB%B0%8F-%ED%99%9C%EC%9A%A9
- https://jeong-pro.tistory.com/168