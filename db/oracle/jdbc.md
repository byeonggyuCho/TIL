
## JDBC : 자바 DB연동
-호환성 : 어떤 DB든 상관없이 프로그래밍을 할수있다.

### 드라이버
-middleware에게 드라이버를 제공한다.
-middleware는 DB와 프로그램 사이에 있는 표준규약. 일종의 컨버터 기능을 한다.
-드라이버를 임의의 이클립스 폴더에 넣고 클래스패스 설정을 한다.
  ㄴ(이클립스 안에서 패스를 걸어야한다. 제어판에서 하는 패스설정은 안먹힌다.) 
  ㄴ우클릭 configure bild path
  ㄴ라이브러리 탭
  ㄴ 우측에 ADD JARS// ADD EXTERNAL JARS
  ㄴ Referenced Libraries가 생성됨.
 


### 드라이버로드

-강제적으로 클래스를 메모리로 올려주는것
- Class 클래스
-  Class.forName() ;

- Class.forName("oracle.jdbc.driver.OracleDriver") ;
- 이게 로드가 제대로 되어면 JDBC사용가능.

- 어떤 프로그램이 어떤 데이터베이스가 필요한가?
 - DriverManager 클래스
 - Connection con = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:orcl","scott","1111") ;
 - 이건 다큐먼트 참고!!!




1) JDBC 표준문법 : java.sql
	- Connection : 연결정보
		DB와의 연결 정보를 제공하는 클래스.

	- Statement : 명령어(sql)  전달, 실행.

	- ResultSet : 결과값(select) 을 임시로 저장한다.

2)  ResultSet
	1) DB로부터 가져온 결과값을 임시로 저장한다.
	2) 하나의 테이블을 저장할수 있는구조.
	3) 연결 지향적.(DB와 연결이 되어있는 동안만 존재한다) 
	4) 반드시 처음에는 next() 사용해야한다. (다음 레코드로 이동) 
	

3)  Satement
	1) executeQuery()  : select 일때
	2) executeUpdate()  :insert, update, delete 일때.
	


4) PreparredStatement
- 이제 Statement 쓰지마라.
- 이걸 대신해서 써라.
- 변하지 않는 문자열들을 DB에 보내서 미리 컴파일을 해서 준비한다.
- 나중에 입력받는것은 나중에 따로보낸다.

	1) 쿼리의 복잡함을 단순화 시킨다.
	2) 보안 : 쿼리문과 데이터를 섞어쓰면 보안에 취약함.

- 단 like 연산자를 사용할때는 statement를 사용해야한다.


5) CallableStatement
- DB에 미리 만들어 놓은 프로시져를 호출할때.

	1) 프로시저 호출
	2) 문법
	~~~
	{call 프로시져명}
	{call 프로시저명(?,?,...) }
	{?=call 프로시져명(?,?,...) }	//리턴값이 있을경우.
	~~~

