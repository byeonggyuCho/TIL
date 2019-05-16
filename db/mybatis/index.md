# Mybatis
    개발자가 지정한 SQL, 저장프로시저 그리고 몇가지 고급 매핑을 지원하는 퍼시스턴트 프레임워크다.
    마이바티스는 JDBC로 처리하는 상당부분의 코드와 파라미터 설정 및 결과 매핑을 대신해준다.
    마이바티스는 레코드에 원시타입과 Map 인터페이스 그리고 자바를 설정해서 매핑하기 위해 XMl과 애노테이션을 사용할 수 있다.

마이바티스의 응용 팁이나, 시행착오를 기록하자.



1) 어플리케이션이 SqlSessionFacforyBuilder를 사용해서 SqlSessionFactory 생성준비
2) 애플리케이션이 요청하면 SqlSessionFactoryBuilder는 데이터 접속 정보등이 기제된 Mybatis 설정파일을 읽는다.
3) 설정파일을 기반으로 SqlSessionFactory를 생성한다.
4)애플리케이션은 생성된 SqlSessionFoctory에 SqlSession의 제공을 의뢰한다.
5) SqlSessionFactory는 SqlSession을 생성해서 어플리케이션에 제공
6) 애플리케이션은 SqlSession의 Sql 발생을 지시
7) Mapper인터페이스를 이용할 때는 SqlSession에 Mapper의 생성을 의뢰하고 Mapper인터페이스 메소드 호출
8) 내부에서 SqlSession에 Sql발생이 지시
9) SqlSession은 지시된 SQL을 매핑파일에서 찾아서 SQL발행.(id를 key로 사용한다)
