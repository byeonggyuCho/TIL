Mybatis
=======
개발자가 지정한 SQL, 저장프로시저 그리고 몇가지 고급 매핑을 지원하는 퍼시스턴트 프레임워크다.

마이바티스는 JDBC로 처리하는 상당부분의 코드와 파라미터 설정 및 결과 매핑을 대신해준다.

마이바티스는 레코드에 원시타입과 Map 인터페이스 그리고 자바를 설정해서 매핑하기 위해 XMl과 애노테이션을 사용할 수 있다.



![이미지](../../resource/img/mybatis.png "book")

## 1. MyBatis 주요 API
1. MyBatis 주요컴포넌트
    - 설정파일 (MyBatis-Config.xml)
        - 마이바티스 동작설정을 지정
    - **Mapper Interface**
        - 매핑 파일이나 애너테이션에 정의한 SQL에 대응하는 자바 인터페이스
    - **Mapping XML**
        - SQL과 객체의 매핑 정의를 기술하는 XML파일, SQL을 애너테이션에 지정하는 경우는 사용하지 않음
    - 경로
        - org.apache.ibatis.session
    - **SqlSession**
        - 하나의 SqlSession객체가 생성되고 트랜잭션이 동작하는 동안 지속적으로 사용
        - SQL 발행이나 트랜잭션 제어용 API 제공 컴포넌트
        - 스프링 프레임워크에서 사용하는 경우에는 마이바티스의 트랜잭션 제어  API는 사용하지 않음
        - 세션이 종료되면 Rollback되거나 Commit된다.
    - **SqlSessionFactory**
        - SqlSessionTemplate을 찍어내는 공장(factory)
        - 트랜잭션당 하나의 SqlSession을 생성한다.
        - 세션을 한번 생성하면 매핑구문을 실행하거나 커밋 또는 롤백을 하기 위해 세션을 사용할수 있다. 마지막으로 더 이상 필요하지 않은 상태가 되면 세션을 닫는다. (재활용)
    - **SqlSessionFactoryBuilder**
        - SqlSessionFactory를 생성하는 컴포넌트
        - 마이바티스 설정파일을 참조한다.

2. MyBatis-Spring 연동모듈 주요컴포넌트
    - 경로
        - org.mybatis.spring
    - **SqlSessionFactoryBean**
        - SqlSessionFactoryBuilder역할.
        - SqlSessionFactory를 구축하고 스프링 DI 컨테이너에 객체를 저장
        - 쉽게 말해 DAO의 구현체 객체가 저장된다.
    - **SqlSessionTemplate**
        - SqlSessionTemplate은 SqlSession을 구현하고 코드에서 SqlSession를 대체하는 역할을 한다.
        - SqlSessionTemplate은 필요한 시점에 세션을 닫고, 커밋하거나 롤백하는 것을 포함한 세션의 생명주기를 관리.
    - **mapper.MapperFactoryBean**
        - 스프링 트랜잭션 관리하에 SQL을 실행하는 Mapper객체를 빈으로 생성하기 위한 컴포넌트








## 2.실행흐름

1. 생성흐름
    - SqlSessionFactoryBean
        - SqlSessionBuilder를 사용해서 SqlSessionBean으로 생성
        - DI 컨테이너에 빈이 된 데이터 소스를 인젝션해서 조작 대상 데이터베이스를 지정

    - SqlSessionBuilder & MyBatis 설정파일
        - MyBatis 설정파일의 정의에 따라 SqlSessionFactory 생성
        - 생성된 SqlSessionFactory는 DI 컨테이너에 의해 관리
    
    - MapperFactoryBean
        - SessionTemplate 생성 & SQL을 실행하는 Mapper 객체 생성
        - 스프링의 트랜잭션 관리하에 마이바티스 표준의 SqlSession을 취급
2. 실행흐름
    1. Client 요청
    2. Mapper 객체
        - Mapper 객체는 호출된 메서드에 대응하는 SqlSession(구현클래스 SqlSessionTemplate)의 메서드를 호출
        - SqlSessionTemplate
            - SqlSessionFactory를 통해서 MyBatis 표준 SqlSession 취득 (SQL을 같은 트랜잭션에서 조작하는 경우 같은 SqlSession 공유)
            - SqlSessionFactory를 통해서 취득한 SqlSession을 실행중인 트랜잭션에 할당함으로 같은 트랜잭션에서 같은 SqlSession이 사용되도록 제어 (JDK 동적프락시구조 이용)
            - 프락시화 된 SqlSession을 통해 MyBatis 표준 SqlSession 메서드를 호출해서 애플리케이션에서 호출된 Mapper 객체의 메서드에 대응하는 SQL 실행을 의뢰 


## 용어정리
    - 트랜잭션
    - 프릭시
    - sqlSession
    - DataSourceTransactionManager

## 참조
- [마이바티스](http://www.mybatis.org/)


## DataSourceTransactionManager
    * 마이바티스 스프링 연동모듈
    