# database



# 오라클
오랜만에 DB를 하려다 멘붕이 와서... 적어봄.

## 용어
- 필드<레코드<테이블<DB<DataBank

- 필드[열,column,속성] : 같은 형식의 데이터를 묶어서 관리한다.
    - 데이터베이스 관점에서 쪼갤 수 없는 최소의 단위
    - 데이터는 행으로 묶여야한다.(홍길동이란 정보를 이름, 주소, 번호 등등 이런식..) 
    - 레코드(튜플)  필드를 묶어서 관련있는것을 묶어놓았다
    
- 레코드 : 한 줄, 필드의 모음
- 테이블 : 레코드의 모음
    - 테이블에서 데이터 몇개냐고 하면 레코드 단위로 말한다.


    ----------------------------------------------------------------------------

### 1.오라클 서버
- 오라클 엔진과 dataBase
- 즉 오라클 엔진이 설치된 PC를 말한다.
- 실제 데이터베이스가 존재하는 곳

### 2.오라클 클라이언트
- 오라클 DB 서버에 접속하기 위한 매개체
- 오라클 서버의 정보를 입력하면 오라클 DB서버에 접속 가능
- 서버 이외의 컴퓨터에서 서버에 접근하기 위한 프로그램




### 3.명령어
	EDIT			        //내가 적었던것을 수정할 수 있다.
	rollback;			//명령어를 취소 ctrl+Z와 비슷함.
	select * from tab;		//해당 아이디에 테이블 보기
	select * from emp;		//emp의 모든것을 조회한다.
	distinct() 			//중복제거
	subst(name,1,1) 		//name에서 1인덱스부터 1길이 만큼 추출
	decode				//?






# 1.DataBase


## 1.2 DBMS (DataBase Management System) 
	DBMS(데이터베이스를 관리하는 프로그램.) 
	
1)  Oaracle
    - 8i, 9i - 10g- 11g- 12c 	(internet-grid-cloud) 
    - full version
    - express version
    - target
    - 개발자, 관리자


2)  MS-SQL Server
3)  MySQL	
    - MariaDB(MySQL과 거의 비슷.) 
4)  DB2
5)  Informix
6)  Sybase
7)  Timax(쿡산) 

	

## 1.2 다큐먼트
    Developer's Guide	Click to show summary. 
    Application Express Developer's Guide	
    Java Developer's Guide





## 1.3 설치
- 설치는 쉽지만 언인스톨은 복잡하여 차라리 포멧하는게 편하다
- 때문에 백업을 하는습관을 들이자.




## 1.4 발전 단계
1)  파일 처리
- 접근이 복잡하다...

2)  계층형 DB(HierarchyDB) 
- 특정형식을 갖추어서 저장한다.(데이터 연산이 편리해졌다) 
- 트리형태. 
- 쉽게 사용할 수 있다.
- 조회가 쉬워야하는데 그런면에서 좀 힘들다. (데이터가 많아질수록 비효율적임.) 


3) 네트워크 DB (NDB : Network data base) 
-graph 형식으로 이어져있다. (그물구조 net) 
-실제로 거의 상용화되지 못했다
-사용이 어렵고 유지보수가 힘들다...


4) 관계형 DB (RDB :relational DB) 
- 테이블 형식.
- 지금까지 사용된다.

5) 객체형 DB (ODB : object DataBase) : 어려워서 잘 못쓰는편 


6) 객체관계형 DB
- 객체형 DB의 사용어려움을 보완하여 나왔다.




### 1.5 접속 방법.
1) sqlplus(클라이언트 프로그램) 
- command Line

2) Sqldeveloper
- 윈도우용 프로그램

3) Toad
- 오라클 접속용 클라이언트 프로그램(유료) 

4) Sqlgate


### 1.6 SQL 
  - 데이터 베이스를 사용하기위한 언어를 배워야한다.
  - 구조화된비절차적언어.(Structured Query Language) 
	- cf) (절차적언어) - 자바,c언어 



 1) DDL (data definition language)  : 데이터 정의어
 - 데이터를 만들수 있게 준비를 해주는언어.
 - 데이터를 저장할 수 있는 통을 만든다.
 - 문법 3개 (super simple) 
    1) creat 만들기
    2) alter (데이터를 관리하는 환경을 수정.) 
    3) drop  (데이터 관리하는 환경을 삭제하기) 


 2) DML(Data Manipulation...) :데이터 조작어
- 저장된 데이터를 사용(수정,사용,삽입) ]
- 문법
 1) insert(삽입) 
 2) update(업데이트, 실제 데이터를 수정.) 
 3) delete(실제 데이터를 삭제) 
 3) DCL(Data Control Language) 
	- 권한관리(GRANT,  REVOKE) 
	- 보안, 백업.
	- 관리자용 언어.

 4) QL(Query Language)  : 조회, 검색.
	-명령어




### 1.7 SqlPlus 사용법
1) 접속방법
~~~  database
$ sqlplus root
$ sqlplus root/password
$ sqlplus root/password@hostname
~~~ 
- 여기서 호스트란 접속하고자 하는 서버다.
- 다른서버에 원격으로 접속을 시도할때 호스트명을 반드시 써준다.

2) 접속 해제 및 다른 접속 연결

~~~ 
	 $ DB> exit
	 $ DB> quit
~~~ 

*연결을 끊지않고 다른 사용자로 재연결하려고 할때
~~~ 
	$ DB> connect USER_ID
~~~ 

*어떤아이디로 접속했는지 알고싶을때
~~~ 
	$ DB>  show user
~~~ 
	

3)  계정관리
- 반드시 관리자로 접속해야한다.

	1) system으로접속
		기존 사용자 조회
	~~~ 
		DESC DBA_USERS; (현제 이 테이블의 구조를 확인한다) 
	~~~ 
	cf. DESC : DESCRIBE(서술하다)
	~~~ 
		SELECT username,password FROM dba_user
	~~~ 
	~~~ 
		CREATE USER 사용자id IDENTIFIED BY 페스워드
	~~~ 
	사용자 추가
	~~~ 	
		GRANT connect TO hong
	~~~ 
	테이블 접속권한부여
	~~~ 
		SELECT * FROM tab;
	~~~ 		

	**리소스 작업권한 부여 행 추가 권한 등
	~~~ 
	GRANT resource TO hong;
	~~~ 

	**접속, 리소스권한 동시에 부여하기
	~~~ 
	GRANT connect, resource TO 사용자id;
	~~~ 
	- 사용자 삭제 drop! (create로 만든건 drop) 
	~~~ 
	DROP USER 사용자id;
	~~~ 

	### **CASCADE
 	테이블을 생성해서 리소스가 걸려있기때문에 바로 지울 수 없다.(일종읜 안전장치) 
	
	- 방법1)  hong에 들어가서 테이블을 싹 다지운뒤 계정삭제
	- 방법2)  CASCADE 
	~~~ 
	DROP USER 사용자id[CASCADE];
	~~~ 


	- 사용자 페스워드 수정.
	- scott의 페스워드를 2222로 바꿔보기.
	-  alter user 사용자ID identified by 2222;


	## 계정잠그기 lock, unlock
	~~~ 
	  alt user ROOT account lock
	~~~ 

	## 관리자 비번 분실
	- 직접 서버에 접속이 가능할 경우에만...
	- 로컬에서만 가능하다.
	- **system as sysdba[/no log]**
	~~~ 
	sqlplus system as sysdba nolog.
	select empno
	~~~ 


	

	

4) 코드 작성 및 컴파일
	#### edit
	- 방금 전에 작성된 코드(버퍼에 있는 코드) 를 메모장으로 불러옴.
	- edit 파일명 파일에 있는 코드를 불러옴
	- 메모장을 종료하는순간 버퍼라는 메모리에 저장된다.
	- 버퍼에 작성된 데이터를 메모장으로 불러들여서 수정할 수 있다.
~~~ 
edit c:\netsong\test.sql (이런식의 경로설정도 가능하다) 

@c:\netsong\test.sql (이런식으로 실행도 가능하다) 

@파일명 : 해당 파일에 있는 코드를컴파일 및 실행.		
~~~ 


- run이라는 키워드 대신
- 시스템으로 정의되는 테이블 겁나많음
- 이걸 조회가능하다
- 관리하고 있는 기능.

관리가능할걸 검색한다.
~~~ 
select*From table;
~~~ 
- 사용자가 사용가능한 테이블의 종류
- tab 정보를 담고 있는 테이블





## 데이터베이스 설치확인

- Service(local) 실행목록 중에서
- 'OracleOraDb11g_home1TNSListener' 확인
- 'OracleServoieORCL' 실행 확인
- 클라이언트의 호출을 기다리는 리스너 상태


### 서버용 DB, 로컬용 DB
로컬용DB(Access) 

