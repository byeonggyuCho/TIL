
# Maven
![](/resource/img/etc/maven.jpeg)

자바 프로젝트의 빌드(build)를 자동화 해주는 빌드 툴<br>
즉, 자바 소스를 compile하고 package해서 deploy하는 일을 자동화 해주는 것


*cf.* build tool: Ant, Gradle, Gulp, Webpack

## 1. Goal and Feature
### 1.1 빌드 절차 간소화
### 1.2 통합된 빌드 시스템 제공
### 1.3  Quility Project Information 제공
### 1.4 개발에 있어서 Best Practice를 위한 가이드 제공
### 1.5 소스코드 디렉토리 구조 표준화
### 1.6 의존성 관리
<br><br><br>

## 2. Description
1) POM.XML (Project Object Model)
    - Maven은 pom에 project에 대한 모든 정보를 기술되어있다.	
    - 프로젝트 환경설정파일이라고 생각하면된다.
~~~ XML
<project 
xmlns="http://maven.apache.org/POM/4.0.0"   
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
xsi:schemaLocation="http://maven.apache.org/POM/4.0.0   
http://maven.apache.org/xsd/maven-4.0.0.xsd">
<modelVersion>4.0.0</modelVersion>

    <groupId>com.javatpoint.application1</groupId>  
    <artifactId>my-application1</artifactId>  
    <version>1.0</version>  
    <packaging>jar</packaging>
    <name>Maven Quick Start Archetype</name>  

    <url>http://maven.apache.org</url>

    <dependencies>  
        <dependency>  
            <groupId>junit</groupId>  
            <artifactId>junit</artifactId>  
            <version>4.8.2</version>  
            <scope>test</scope>  
        </dependency>  
    </dependencies>
</project>
~~~

pom.xml에서 이 <dependency>태그 부분에서 lib를 자동으로 준비해준다.
- 서버에 들어가서 lib를 다운받는다.
-  www.mvnrepository.com 이 홈페이지에서 웬만한 양식은 모두 찾을 수 있다.
    -  <https://mvnrepository.com/artifact/mysql/mysql- connector- java/5.1.42>
- 이런식으로  <dependency>태그를 pom.xml에 추가하면 자동으로 lib가 준비된다.

** Spring툴 받기 :http://spring.io/tools/sts/all 



**리모트 레포지토리**<br>
서버에 lib가 저장된 장소를 "리모트 레포지토리"라고 부른다.<br><br>

**로컬 레포지토리**<br>
로컬에 라이브러리를 저장하고 그 폴더에 있는 lib를 프로젝트에 공유하는 방법<br>
이때 로컬의 lib폴더를 "로컬 레포지토리"라고 한다.<br>
기본위치: "\c/.m2"라는 폴더가 자동으로 생긴다.<br>
이곳에 다운받은 라이브러리가 저장된다.<br>


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

## 4. Maven Standard Directory Layout
   ![](/resource/img/etc/mavenFolderStructure.jpg)
        
    *ResourcesFolder에 SpringXMLfile를 생성한다
        - 스피링에 맞는 xml 형식이 갖추어져 있당.
        - xsd: 스키마 : 다양한 기능이 필요할때 체크해주면 제공 받을 수 있다.
            =>코딩이 손쉬워진당.				
        - 요기에 facotory의 역할을 써준다.


## 3.플러그인 과 끝 
mvn resources:resources
mvn javadoc:jar
...

pom.xml에서 실제 파일명에 영향을 주는테그.
<finalName>

*mvn clean package
(이런식으로 goal을 연속적으로 실행 할 수 있다)


- http://spring.io/tools/sts/all

**mvn site
프로젝트를 소개할 수 있는 홈페이지를 자동으로 만들어준다.
- 제작자 등등...


**자체적인 서버기능 보유
- jetty


**프로젝트의 기본틀을 잡아준다.
**라이브러리를 공용으로 사용하게 만들어준다.





**What is build**<br>
0. copling
1. Linking
2. packaging

    *Bulid tools are programs that automate thre creation of excutalbe applications from source code --techopedia.com*


## 참조
- https://maven.apache.org/what-is-maven.html
- https://medium.com/@dulajdilshan/do-you-know-maven-a-dependency-manager-or-a-build-tool-what-is-pom-bd7dd8b43e80