Mybatis
=======
개발자가 지정한 SQL, 저장프로시저 그리고 몇가지 고급 매핑을 지원하는 퍼시스턴트 프레임워크다.

마이바티스는 JDBC로 처리하는 상당부분의 코드와 파라미터 설정 및 결과 매핑을 대신해준다.

마이바티스는 레코드에 원시타입과 Map 인터페이스 그리고 자바를 설정해서 매핑하기 위해 XMl과 애노테이션을 사용할 수 있다.

마이바티스의 응용 팁이나, 시행착오를 기록하자.


![이미지](../../resource/img/mybatis.png "book")

## 1. MyBatis 주요 API
1. [MyBatis 주요컴포넌트]
    - 설정파일 (Config)
        - 마이바티스 동작설정을 지정
    - Mapper Interface
        - 매핑 파일이나 애너테이션에 정의한 SQL에 대응하는 자바 인터페이스
    Mapping XML
    - SQL과 객체의 매핑 정의를 기술하는 XML파일, SQL을 애너테이션에 지정하는 경우는 사용하지 않음
    - org.apache.ibatis.session.SqlSession
        - SQL 발행이나 트랜잭션 제어용 API 제공 컴포넌트
        - 스프링 프레임워크에서 사용하는 경우에는 마이바티스의 트랜잭션 제어  API는 사용하지 않음
    - org.apache.ibatis.session.SqlSessionFactory
        - SqlSession 생성하기 위한 컴포넌트
    - org.apache.ibatis.session.SqlSessionFactoryBuilder
        - 마이바티스 설정파일을 읽어들여 SqlSessionFactory를 생성하기 위한 컴포넌트
2. [MyBatis-Spring 주요컴포넌트]
    - org.mybatis.spring.SqlSessionFactoryBean
        - SqlSessionFactory를 구축하고 스프링 DI 컨테이너에 객체를 저장
    - org.mybatis.spring.SqlSessionTemplate
        - 스프링 트랜잭션 관리하에 마이바티스 표준의 SqlSession을 취급하기 위한 컴포넌트 (스레드안전)
    - org.mybatis.spring.mapper.MapperFactoryBean
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
    - Client 요청
    - Mapper 객체
        - Mapper 객체는 호출된 메서드에 대응하는 SqlSession(구현클래스 SqlSessionTemplate)의 메서드를 호출
        - SqlSessionTemplate
            - SqlSessionFactory를 통해서 MyBatis 표준 SqlSession 취득 (SQL을 같은 트랜잭션에서 조작하는 경우 같은 SqlSession 공유)
            - SqlSessionFactory를 통해서 취득한 SqlSession을 실행중인 트랜잭션에 할당함으로 같은 트랜잭션에서 같은 SqlSession이 사용되도록 제어(JDK동적프락시구조이용)
            - 프락시화 된 SqlSession을 통해 MyBatis 표준 SqlSession 메서드를 호출해서 애플리케이션에서 호출된 Mapper 객체의 메서드에 대응하는 SQL 실행을 의뢰 
