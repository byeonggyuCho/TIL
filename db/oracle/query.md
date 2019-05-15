#  Oracle


# 명령어
    EDIT			        //내가 적었던것을 수정할 수 있다.
    rollback;			//명령어를 취소 ctrl+Z와 비슷함.
    select * from tab;		//해당 아이디에 테이블 보기
    select * from emp;		//emp의 모든것을 조회한다.
    distinct() 			//중복죽이는 명령어
디코드 decode

subst(name,1,1) 		//이름에서 첫번째껄 뽑아라 하나만.





# 1.DataBase

	(DB의 기본연산) 
	삽입, 삭제, 수정, 조회
	
	--------------------------------------
	DBMS(데이터베이스를 관리하는 프로그램.) 



# 2. DBMS (DataBase Management System) 
1)  Oaracle
    - 8i, 9i ->10g->11g->12c 	(internet-grid-cloud) 
    - full version
    - express version
    - target
    - 개발자(어떤것에 포커스를 맞출것인가!) 
    - 관리자


2)  MS-SQL Server
3)  MySQL	
    - MariaDB(MySQL과 거의 비슷.) 
4)  DB2
5)  Informix
6)  Sybase
7)  Timax(쿡산) 

	

### 다큐먼트
    Developer's Guide	Click to show summary. 
    Application Express Developer's Guide	
    Java Developer's Guide





###설치
- 설치는 쉽지만 언인스톨은 복잡하여 차라리 포멧하는게 편하다
- 때문에 백업을 하는습관을 들이자.




3. 발전 단계
1)  파일 처리
->접근이 복잡하다...

2)  계층형 DB(HierarchyDB) 
->특정형식을 갖추어서 저장한다.(데이터 연산이 편리해졌다) 
->트리형태. 
->쉽게 사용할 수 있다.
->조회가 쉬워야하는데 그런면에서 좀 힘들다. (데이터가 많아질수록 비효율적임.) 


3) 네트워크 DB (NDB : Network data base) 
-graph 형식으로 이어져있다. (그물구조 net) 
-실제로 거의 상용화되지 못했다
-사용이 어렵고 유지보수가 힘들다...


4) 관계형 DB (RDB :relational DB) 
->테이블 형식.
->지금까지 사용된다.

5) 객체형 DB (ODB : object DataBase) 
->어려워서 잘 못쓰는편 ㅋㅋㅋ


6) 객체관계형 DB
->객체형 DB의 사용어려움을 보완하여 나왔다.



4.접속 방법.
1) sqlplus(클라이언트 프로그램) 
->도스용이라서 명령어 쳐야함

2) Sqldeveloper
->윈도우용 프로그램
->명령어를 몰라도 사용가능~~

3) Toad
->오라클 접속용 클라이언트 프로그램(유료) 

4) Sqlgate


5.SQL 
  - 데이터 베이스를 사용하기위한 언어를 배워야한다.
  - 쉬우니까 쫄지말것 		cf) (절차적언어) ->자바,c언어 
  - 비절차적언어.(규약이 없다.) 
  - (Structured Query Language) 
  - 구조화된 비절차적언어



 1) DDL (data definition language)  : 데이터 정의어
 ->데이터를 만들수 있게 준비를 해주는언어.
 ->데이터를 저장할 수 있는 통을 만든다.
 ->문법 3개 (super simple) 
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
	권한(GRANT,  REVOKE->권한 뺏기) 
	보안, 백업.
	관리자용 언어.

 4) QL(Query Language)  : 조회, 검색.
	-명령어
	1) Select




6.SqlPlus 사용법
1) 접속방법
	- 명령어 : sqlplus 아이디
	패스워드:xxxxxx
	- 명령어 : sqlplus 아이디/패스워드
	- 명령어 : sqlplus 아이디/패스워드@호스트명
	(여기서 호스트란 접속하고자 하는 서버다.) 
	(다른서버에 원격으로 접속을 시도할때 호스트명을 반드시 써준다.) 


2) 접속 해제 및 다른 접속 연결
	명령어 : exit, quit
	
	- 연결을 끊지않고 다른 사용자로 재연결하려고 할때
	->명령어 connect 사용자id

	- show user
	->어떤아이디로 접속했는지 알고싶을때
	

(3)  계정관리
->반드시 관리자로 접속해야한다.

	1) system으로접속
		기존 사용자 조회
		DESC DBA_USERS; (현제 이 테이블의 구조를 확인한다) 
				(DESCRIBE-서술하다) 
		SELECT username,password FROM dba_user

		- 사용자 추가
		CREATE USER 사용자id IDENTIFIED BY 페스워드
		
		- 접속권한부여 (아이디만들었다고 걍 들억다고 그런거 아님) 
		GRANT connect TO hong

		- 어떤 테이블 관리 가능?
		SELECT * FROM tab;

		- 행 만드는거 권한 어떻게 부여하나...
		-역할을 준다.
		resource 

		- 리소스 작업권한 부여
		GRANT resource TO hong;

		- 접속, 리소스권한 동시에 부여하기
		GRANT connect, resource TO 사용자id;
		
		- 사용자 삭제 drop! (create로 만든건 drop) 
		DROP USER 사용자id;
		(삭제하려면 CASCADE를 지정하여야합니다) 
		ㄴ 테이블을 생성해서 리소스가 걸려있기때문에 바로 지울 수 없다.(일종읜 안전장치) 
		
		방법1)  hong에 들어가서 테이블을 싹 다지운뒤 계정삭제
		방법2)  CASCADE (안에 뭐가 있든 상관없으니까 닥치고 지워 라는 명령어) 
		ㄴDROP USER 사용자id[CASCADE];


		- 사용자 페스워드 수정.
		->scott의 페스워드를 2222로 바꿔보기.
		-> alter user 사용자ID identified by 2222;


		# 계정잠그기 lock, unlock
		-  alt user scott account lock


		# 관리자 비번 분실
		- 직접 서버에 접속이 가능할 경우에만...
		- 로컬에서만 가능하다.
		system as sysdba[/no log]

		sqlplus system as sysdba nolog.
		


		select empno

		

(4) 코드 작성 및 컴파일
	edit: 방금 전에 작성된 코드(버퍼에 있는 코드) 를 메모장으로 불러옴.
	edit 파일명 파일에 있는 코드를 불러옴
	- 메모장을 종료하는순간 버퍼라는 메모리에 저장된다.
	- 버퍼에 작성된 데이터를 메모장으로 불러들여서 수정할 수 있다.

	edit c:\netsong\test.sql (이런식의 경로설정도 가능하다) 
	
	@c:\netsong\test.sql (이런식으로 실행도 가능하다) 

	@파일명 : 해당 파일에 있는 코드를컴파일 및 실행.		


	- run이라는 키워드 대신 /

-시스템으로 정의되는 테이블 겁나많음
-이걸 조회가능하다
-관리하고 있는 기능.

관리가능할걸 검색한다.
Select*From tab; (tab:테이블의 종류) 
->사용자가 사용가능한 테이블의 종류
->tab 정보를 담고 있는 테이블





# # 데이터베이스 설치확인하기

시작-'서비스'검색.	(제어판에 잘찾아보면 있음) 

서비스(로컬)  목록에서
'OracleOraDb11g_home1TNSListener'이 있어야한다.
- 클라이언트의 호출을 기다리는 상태!(리스너 상태!) 
'OracleServoieORCL' 이것도 실행되고 있어야한다.



### 서버용 DB, 로컬용 DB
로컬용DB(Access) 






7.SQL문법
Query Language

(1)  SELECT 문법
	1) 검색, 조회를 위한 기능.
	2) 기본 문법


		# 권한부여(조회) 

			select 필드명, from[소유자].테이블명
			select empno, ename, mgr,comm FROM emp;
			<<다른 사용자가 scott의 테이블조회가 가능할까?>>
			ㄴ 서로 다른 사용자끼리는 접근이 안된다.
			ㄴ 관리자가 허락해줘야한다.
			ㄴ 관리자는 된다.
			<<grant select on scott.emp to hr;>>		//조회 권한 부여
		

			<모든필드를 다 일일이 적어서 조회가능하게 하면 귀찮이니까 이렇게하셈>>
			select*from 테이블명


			필드의 가공처리가 가능하다.
			->필드가 있는그대로 검색만 하는게 아니라 변형해서 사용할 수 있다.
			-----------------------------------------------------------------------------
			ex)  사원의 사번, 이름, 급여를 조회하세요
			단, 급여는 현재 급여에 100$를 추가하여 조회하시오.
		
			SELECT empno, ename, sal,sal+100 FROM emp;
			//기존 셀러리에서 100추가한 값을 함께 조회함.


			### 필드에 alias(별명)  부여 가능.
			->원래 필드명대신에 부연설명을 가능함 다른이름으로~~~(좀더 직관적으로 이해하기 쉬운이름) 
			-------------------------------------------------------------------------------
			필드명 별명   or   필드명 "별명"
			필드명 as 별명  or 필드명 as "별명"   //별명에 공백이나 특수문자가 있으면 ""로 묶자.
	
			SELECT empno 사번, ename 이름, sal,sal+100 as"100$인상된 급여" FROM emp;


			### 중복된 값 제거가능
			------------------------------------------------------------------------------
			기본값 여기에서... <<select job FROM emp;>>
			<<select distinct job FROM emp;>>	//이렇게 필드 앞에 쓰세요
		


	3) 확장 문법

		- 정렬 기능.
			ORDER BY 필드명[, 필드명] [ASC|DESC]
			//필드명 여러개 입력가능. ASC:오름(기본값) ,DESC :내림]
			------------------------------------------------------------------------
			EX)  급여가 많은 순으로 사번, 이름, 급여를 조회하시오.	(기본문법+ 확장문법) 
			SELECT empno, ename, sal FROM emp ORDER BY sal DESC;
		
		
			+2차정렬 3차정렬 가능.
			(급여가 같은사람중에서 이름을 알파벳순서로 정렬 등등..) 

			EX)  부서별로 급여가 적은 순으로 이름, 급여, 부서코드를 조회
			- 부서별로 누가 원급을 많이 받아먹나, 누굴 잘라야하나.ㅋㅋ.... 슬프다

			1차기준: 부서
			2차기준: 급여
		
			<<SELECT ename, sal, deptno FROM emp ORDER BY deptno ASC, sal ASC;>>




	
		- 조건 기능(레코드 필터링) 
			->내가 원하는 필드만 불러오기~~
			Where 조건식(필드명 연산자 값)  //필드명이 왼쪽에 와야함.
			기본 연산자 : >,<, >=, <=, =,(!=,<>,^=) 
			논리 연산자 : and,or,not
			SQL 연산자. : between and,in,is null,like

			like wild card
					%: 0개 이상의 문자를 대체
					_: 1개의 문자를 대체
			ex)  beau% : beau, beaut, beauti, beautif...
			    be_u_: beaut, bebub, ...
			    (_의 자리에 반드시 글자가 와야한다.) 

			ex)  %L	(앞은 모르겠고 뒤는 L로 끝난다) 
			    L%	(앞은 L로 시작하지만 뒤는 모른다) 
			   %L%	(앞뒤에 뭐가 있는지는 모르지만 L이 들어간다) 

		-----------------------------------------------------------------------------------
			EX)  급여가 3000$이상인 직원의 사번, 이름, 급여를 조회하시오
		  	 (단 급여가 많은순으로 정렬) 
		
			select empno, ename, sal FROM emp 
			WHERE sal>= 3000 
			order by sal ASC;

		
			Q) 조건먼저? 정렬먼저?
			->가장 마지막에 작성되는건 언제나 정렬.
	


			EX2)  업무가 메니져인 사원의 이름, 부서, 업무, 급여를 조회.
			<<select empno, deptno,job,sal from emp WHERE job='MANAGER';>>
			->저장된값은 대소문자를 가린다.
			->SQL은 쌍따옴표를 쓰지 않고 홑따옴표만사용한다.

		

			EX3)  1982년 1월 1일 이후에 입사한 직원의 이름, 부서 , 입사일자 조회.
			<<  select ename,deptno,hiredate from emp where hiredate>'1982/1/1';  >>
			-> SQL에서 날짜는 문자로 캐스팅된다.
		

			EX4)  부서가 20이고 업무가 analyst인 직원의 이름, 부서, 입사일자 조회
			<< select ename, deptno, hiredate from emp where deptno=20 and job='ANALYST'; >>




		- 용어정리..
		필드<레코드<테이블<DB<DataBank

		필드[열,column,속성] : 같은 형식의 데이터를 묶어서 관리한다.
		- 데이터베이스 관점에서 쪼갤 수 없는 최소의 단위
		- 데이터는 행으로 묶여야한다.(홍길동이란 정보를 이름, 주소, 번호 등등 이런식..) 
		- 레코드(튜플)  필드를 묶어서 관련있는것을 묶어놓았다
		
		레코드를 묶인게 테이블

		필드 모여 레코드, 레코드 모여 테이블(물리적으로는 파일) 

		테이블에서 데이터 몇개냐고 하면 레코드 단위로 말한다.
		

		-----------------------------------------------------------------------------------
	
		# # between
		Ex) 급여가 1500이상 2500이하를 받는 직원의 이름, 부서 업무 급여를 조회하라.
		<<  select ename, deptno, job, sal, from emp where sal>='1500' and sal<='2500'; >>

		select ename, deptno, job, sal from emp
		where sal between 1500 and 2500;

	`	--between 조건 : and 조건이 이상 이하 일때만 사용가능.--

		

		# # in
		Ex) 업무가 clerk, salesman, analyst인 직원의 이름, 부서, 업무를 조회.
		<< select ename, deptno, job from emp where job='CLERK' or job='SALESMAN' or job = 'ANALYST'; >>
		<< select ename, deptno, job from emp where job in('CLERK','SALESMAN','ANALYST') ; >>
		// in  'or 조건'과 '같다'라는 조건에서만 사용가능하다.

		


		Ex)  직원의 사번, 이름, 부서, 업무, 급여, 보너스를 조회하라.
		<<  select empno, ename, deptno, job, sal, comm from emp;  >>

		-같은 데이터로 많은 생각이라.. 데이터 마이닝?-

		- DB에서의 Null : 값이 없다는걸 표시하는값. - 

		
		# #  is null(조건에서의 ) 
		Ex)  보너스를 받지 못하는 직원의 이름, 부서, 업무 급여 보너스 조회
		- null값을 조회해야겟네..

		<< select ename, deptno, job, sal, comm from emp  where comm is null; >>
		--null은 값이 아니기때문에 =연산자로 사용할 수 없다.
		
		<< select ename, deptno, job, sal, comm from emp  where job != 'SALESMAN'; >>
		<< select ename, deptno, job, sal, comm from emp  where not(job = 'SALESMAN') ; >>
		--이런 표현도 가능하다.


		<< select ename, deptno, job, sal, comm from emp  where comm is not null; >>
		--반대로 커미션을 받는사람만..

		
		Ex)  이름이 s로 시작되는 직원의 이름, 업무, 급여를 조회해라.
		<< select ename, job, sal from emp where ename like 'S%';  >>
		//like는 문자만 사용가능하다.







(2)  functions
  1) single row functions
  -하나의 레코드에 대해서만 적용되는 함수.

  # 문자함수: lower() , upper() , 
  	     substr() , 
	     lenggth() , 
	     instr() , 
	     ltrim() , 
	     rtrim() , 
	     translate() ,
	--------------------------------
	ex) 이름이 scott인 직원의 이름, 부서, 급여를 조회.
	단, 대소문자 구별없이 검색할 수 있도록 한다.
	upper()  사용해야하네
	
	<<  select ename,deptno, sal from emp where ename=upper('scott') ;  >>
	
	--만약 데이터베이스에 저장된값이 대소문자가 섞여있다면..?
	
	<<  select ename,deptno, sal from emp where upper(ename) =upper('scott') ;  >>





	ex)  다음 주민번호에서 성별에 해당하는 것을 추출해라.
	    '9012121010111'	//7번째 데이터
	    
	<<select substr('9012121010111',7,1)  from emp;		//7번째 위치에서 1개뽑아내겠다.
	
	//select 기본문법상 테이블을 써줘야하는데... 
	//테이블과 상관없이 사용하때 - 이런 테이블을 쓰세요 dual;
	//dual 테스트용으로 값을 하나만 뽑아내기 위해서 사용하는 가상테이블.
	
	<<select substr('9012121010111',7,1)  from dual; >>
	<<select length('안녕하세요... sql입니다.')  from dual; >>



	ex)  instr
	select instr('MiLLER','L')  FROM dual;
	select instr('MiLLER','K')  FROM dual;		//문자가 있는지 없는지 찾는목적
	select instr('MiLLER','L',1,2)  FROM dual;		//중복된값이 있다면 두번째값의 위치	
	select instr('MiLLER','L',4,1)  FROM dual;		//시작을 4번째부터.


	//3번째 찾을 데이터의 시작위치.
	 4번째 만약에 찾은 데이터가 2개 이상일때 몇번째 값을 조회할것인가?
	//sql에서는 숫자가 1부터 시작함.
	//해당문자가 있는지 없는지 찾아보기 위한 목적으로 많이 쓴다.
	



	ex)  문자나 공백 제거 하기
	ltrim() , rtrim() , trim() 
	select ltrim('MILLER','M')  from dual;
	select ltrim('MILLER','d')  from dual;		//안된다.
	select ltrim('  MILLER  ')  from dual;



ex)  문자열의 재배치

	-> translate 특정문자를 원하는 문자로 대치한다.

	select translate('MILLER','L','*') FROM dual;
	select replace('MILLER','L','*') FROM dual;


	select translate(sal, '0123456789','영일이삼사오육칠팔구')  from emp;
	//각각 자리에 맞추어서 바뀌어짐.
	//번역의 의미 값을 하나하나따지면서 2번째인자와 3번째 인자의 수가 같아서 매칭되어야한다.


	select replace(sal, '0123456789','영일이삼사오육칠팔구')  from emp;
	//인자를 통째로 덩어리로 인식한다.
	//얘는 안바뀌네..?


	select replace('JACK and JUE', 'J','BL')  from emp;
	select translate('JACK and JUE', 'J','BL')  from emp;
	//translate는 매칭이 되어야한다그래서 j와 매칭되는 b만 바뀌었다.) 


- .아스키코드 변환
	select chr(65) , chr(97)  from dual;
	select ascii('a') , ascii('A')  from dual;






  # 숫자함수
	소숫점 처리 : round() , trunc() ,floor() ,ceil() 
	mod() 
	power() 
	sign() 
	
	-------------------------------------------------------------
	- .소숫점 자리수
	 round() 
	ex) select round(4567.678,0)  from dual;
	
	- 자릿수(두번째 인자) 를 생략하면 소숫점 첫번째 자리를 반올림한다.

	ex)  select round(4567.678,2)  from dual;		- 세번째 자리에서 반올림하겠다는것.
	ex)  select round(4567.678,-2)  from dual;		- 정수방향 반올림.
	ex)  select trunc(4567.678)  from dual;			//버림!
	ex)  select trunc(4567.678,2)  from dual;
	ex)  select floor(4567.678)  from dual;			//무조건 내림
	ex)  select cell(4567.678)  from dual;			//무조건 올린다.


	----------------------------------------------------------------------
	select mod(10,3)  from dual;		//나머지 연산
	
	select power(2,10)  from dual;		//2^10;
	
	select sign(100) ,sign(-15)  from dual;	//양수1 음수-1 영 0





  # 날짜함수
		sysdate			//현재 시간을 알려준다.
		months_between() 	//
		add_months() 		
		next_day() 
		last_day() 
		round() ,trunc() 
------------------------------------------------------------------
	select sysdate From dual;				//현재날짜
	
	select sysdate +100 from dual;			//N일 후

	select months_between(sysdate, '2017/2/20')  from dual;	//날짜간격
	
	select add_months(sysdate, 21)  from dual;		//N달 후
	
	select next_day('2017/1/8','금') from dual; 		//돌아오는 요일

	select last_day(sysdate)  from dual;			//이달 마지막날.
	
	select round(sysdate)  from dual;			//오늘하루의 반 12시간이 지나서 4/5이 출력되었음.
	
	select round('2017/04/08')  from dual;			//날짜형식은 상관없는데 문자열이라서 컴파일오류

	select round(to_date('2017/04/08') )  from dual;		//그대로 17/04/08출력됨.

	select round(to_date('2017/04/16') ,'MONTH')  from dual;	//월을 기준으로 반올림한다는것.

	select round(to_date('2017/07/16') ,'year')  from dual;





  # 변환함수
		cast() 
		to_char() 
		to_date() 
		to_number() 
----------------------------------------------------------------------------------------------
		select ename, sal, to_char(sal)  from emp;	//문자로 캐스팅.
		select ename, sal, to_char(sal, '$999,999') from emp;	
		//이때 두번째 인자의 9는 단순히 형식적인 의미이다.
		//이렇게 형식을 제공할 수 있다.
		//현재 지역에 맞게 통화표시를 하고싶다면?(현재 운영체제를 바탕으로.) 
		
		select ename, sal, to_char(sal, 'L999,999') from emp;
		// L locate를 의미한다.(시스템 지역에 맞는값이 출력된다) 

		

		select to_char(sysdate,'YYYY MM DD HH"시" MI"분" SS"초"')  from dual;
		//이때 시,분,초 등을 추가할때는 쌍따옴표를 사용한다.



  # 기타.


	nvl()  
	decode() 
-----------------------------------------------------------

	ex)  직원의 이름, 급여, 보너스, 총급여를 조회하세요.
	<< select ename, sal, comm, (sal+comm)  as Total from emp;>>
	->널값을 피하려면 어떻게 해야할까?

	 select ename, sal, comm, (sal+nvl(comm,0) )  as Total from emp;
	 -  nvl(변수,0)  해당변수값이 null일때 두번째 인자값으로 대치해라.

	 //decode()  자바의 스위치문과 비슷하다.
	 ->무조건 '같다'라는 조건만 가능하다.
 
	ex) 현재 업무가 salesman 이면 영업이라고 출력하고 그렇지 않으면 일반이라고 출력.
	<< select ename, decode(job,'SALESMAN','영업','일반')   from emp;	>>





  2) aggregation function
  	- 다중행,집합함수
  	- 복수의 레코드에 적용한다.

	   sum() ,avg() , max() , min() , count() 
		-select의 확장문법
			group by 필드명[, 필드명, ...]		//이곳에는 where 조건은 사용할수 없다.
			having 조건식	//group by에서만 사용가능한 조건식이다.


	------------------------------------------------
	ex) 업무가 세일즈맨인 직원들의 급여평균, 최고액, 최저액, 합계를 조회하라.
	
	<< select avg(sal) , max(sal) , min(sal)  from emp where job='SALESMAN'; >>
	
	ex)  직원이 총 몇명인가?
	<< select empno from emp;>>	//원시적

	<< select count(empno)  from emp; >>
	<< select count(comm)  from emp; >>  	//널값은 카운트에서 제외다.
	<< select count(*) from emp; >>		//가장 많이 나오는수로 카운트한다.. 애매할 수 있는 연산이다.
	

	ex)  부서별로 급여평균, 최저급여, 최고급여, 급여합계를 조회한다.
	->몇개의 부서가 있을까...?

	<< select distinct deptno from emp; >>
	//어떤 부서가 있는지 조회한다. 10,20,30이 있다.

	<< select avg(sal) , min(sal) , max(sal) , sum(sal)  from emp where deptno=10;>>
	<< select avg(sal) , min(sal) , max(sal) , sum(sal)  from emp where deptno=20;>>
	<< select avg(sal) , min(sal) , max(sal) , sum(sal)  from emp where deptno=30;>>
	//각 부서별 급여평균, 최저급여 , 최고급여, 급여합계를 개별적으로 입력한다.


	//쌈박하게 처리하기
	<<select deptno, avg(sal) , min(sal) , max(sal) , sum(sal)  from emp group by deptno;>>
	//select의 확장문법, 쌈박하네.



	ex) 부서별 직원 수 조회.
	<<select deptno, count(deptno)  from emp group by deptno;>>

	<< select deptno, sum(sal) ,avg(sal)  from emp group by deptno; >>



	ex) 부서별로 급여평균, 최고 급여를 조회하는데, 단 급여평균이 높은순으로 조회.
	<< select avg(sal) , max(sal)  from emp group by deptno order by avg(sal)  desc; >>



	ex) 전체 급여의 합계가 5000을 초과하는 업무에 대해 급여 합계를 조회
	->업무별로..

	<<select job, sum(sal)  from emp where sum(sal)  >5000 group by job;>>
	->처리순서때문에 오류남.
	->먼저 그룹별로 묶은다음에 조건을 걸어야하는데.. where는 다되지만 group by 뒤에는 올수없다.
	->대신 having이 와야한다.

	<<select job, sum(sal)  from emp group by job having sum(sal) >5000;>>



	ex) 전체 급여의 합계가 5000을 초과하는 업무에 대해 급여 합계를 조회
	   (단 세일즈맨은 제외하시오) 


	# 직계함수?
	<>

	-매치가 되어야 한다.
	-where절은 하나하나 집어서 순서대로 처리한다.
	-where절과 함께 사용할수 없다. 
	-사용하는 타이밍의 순서가 맞아야한다.
	-얘는 묶어서 처리한다.
	-여러개의 레코드를 한번에 묶어서 사용한다.
	-조건이 처리된다음에 실행되어야한다.


	# 순서.
	1.데이터가지고온다.
	2,조건식을 비교한다.
	3.그룹처리한다.
	4.그룹처리후 조건식
	5.오더바이 정렬
	6.select에 의해 조회. 출력.


<<select job, sum(sal)  from emp group by job having sum(sal) >5000 and job!='SALESMAN';>>
->데이터를 다들고온뒤 솎아낸다..
->일반적으로 효율이 떨어진다.

<<select job, sum(sal)  from emp where job<>'SALESEMAN' group by job having sum(sal) >5000;>>
->필터링을해서 들고온다, 성능차이가 발생한다.
->미리 걸러버린다음에 그룹으로 묶어버린다.



### 순서에서 정렬은 항상 마지막에 들어간다.







(3)  DML
	1) insert
		insert into 테이블명(필드명, ...)  Values(값,...)  //필드에 값을 넣는다.
		insert into 테이블명 values(값,...) 		 //필드생성 순서대로 값을 대입된다.

		2) update
		update 테이블명
		set 필드명 =값,필드명=값, ...
		where 조건식

		
	3) delete
		delete from 테이블명 (where 조건식) ;	//테이블에 있는 데이터가 통으로 삭제된다.

		
----------------------------------------

- 실습준비.
	-사용자 추가 : user1(connect, resource 권한 부여) 
	-테이블 작성 : create table tbltest(
			id		number,
			name		varchar2(10) ,
			hiredate	date
			) ;


	- insert
		insert into tbltest(id, name, hiredate)  values(1, '홍길동',sysdate) ;
		insert into tbltest(id, name)  values(2,'임꺽정') ;
		insert into tbltest(id, name, hiredate)  values(3, '김유신',null) ;
		insert into tbltest values(4, '신돌석','2017/2/5') ;


	- update
		update tbltest
		set hiredate=sysdate
		where id=2;




(4) SubQuery
	1) 다른 query문에 포함된 query
	2) 반드시 () 를 사용해야한다.
	3) 연산자의 오른쪽에 와야한다.
	4) order by를 사용할 수 없다.
	->order by는 맨 마지막에 실행되어야하기 때문에..
	5) 종류
		-SubQuery
		-상관 SubQuery 
		(상관 SubQuery:외부쿼리가 먼저 실행되어 결과값을 리턴해서 안쪽에 있는 쿼리가 실행되고 
		그 결과를 다시 리턴받아서 외부쿼리가 실행된다, 즉 3번의 실행) 
		(서브쿼리를 복사해서 실행했을때 안되면 상관서브쿼리다. 연결되어있기때문에 독립적사용못함) 

	6) 유형
		-단일행
		-다중행
		-다중열

	7) 연산자
		-단일행
			=,<, >, >=, <=, -, <>,...
		-다중행
			in	//=
			any	//or의미 , <=,>,< 등 적용가능
			all
			exists	//해당연산자가 존재하는지 확인한다.
			not

	--------------------------------------------------------------
	ex) Scott의 급여보다 더 많이 받는 직원의 이름,업무, 급여를 조회.
	   1.스캇이 얼마 받는지?
	   select sal from emp where ename='Scott';
	   - 3000	   

	   2.3000보다 많이 받는사람은?
	   select ename sal from emp where sal>3000;

	   
	   # 이렇게 중첩된 쿼리를 '서브쿼리' 라한다.
	    select ename sal from emp where sal>(select sal from emp where ename='Scott') 	
	   - 서브쿼리가 먼저실행된다.
	   - 결과값을 리턴받아 다른 쿼리가 실행된다.


	----------------------------------------------------------
	ex)  사번이 7521의 업무와 같고, 급여가 7934보다 많은직원의 사번, 이름 업무, 급여를 조회
	select empno, ename, job,sal from emp where empno=7521;	//salesman
	select empno, ename, job,sal from emp where empno=7934	//sal 1300
	select empno, ename, job,sal from emp where job='SALESMAN'and sal>1300;

	
	select empno, ename, job,sal from emp 
	where job=(select  job from emp where empno=7521) 	
	and 	
	sal>(select sal from emp where empno=7934) ;
		

	서브쿼리만 실행했을때 결과값으로 나오는 레코드의 갯수
	- 이게 유형으로 정리된다.
	- 단일행.


	
	------------------------------------------------------------------------------
	ex) 업부별로 최소급여를 받는 직원의 사번, 이름, 급여, 부서번호 조회
	//업무별 최소급여를 받는사람을 뽑고 그중에서 가장 적은 급여를 받는사람을 뽑아라.

	select empno, ename, sal, deptno from emp group by job order by sal desc;
	select job, sal from emp order by sal;

	
	1) 각 업무별 최저급액 리스트
	select job, min(sal)  from emp group by job;
	
	800,1250,5000,2450,3000
	
	
	2) 해당 리스트의 금액과 같은 금액을 받고있는 사람들의 리스트 출력.

	SELECT empno, ename, sal, deptno, from emp 
	where sal=800 or sal=1250 or sal=5000 or sal=2450 or sal= 3000;
	- where sal IN(800,1250,5000, 2450,3000) ;


	
	SELECT empno, ename, sal, deptno, from emp 
	where sal=(select job, min(sal)  from emp group by job) ;
	
	- 이 결과가 5개가 나온다. 따라서 다중행이된다.	(800, 1250, 5000, 2450, 3000) 
	-  '='이건 단행 연산자다 1:1
	-  'in' 이건 다중행 연산자.

	SELECT empno, ename, sal, deptno from emp 	
	where sal in(select  min(sal)  from emp group by job) ;


	----------------------------------------------------------------
	# 업무별 최저급여 보다 많이 받는사람.

	1) select job, min(sal)  from emp group by job;

	2) SELECT empno, ename, sal, deptno, from emp 
	where sal>800 or sal>1250 or sal>5000 or sal>2450 or sal> 3000;

	3) sub 적용
	SELECT empno, ename, sal, deptno from emp 
	where sal >any(select min(sal)  from emp group by job) ;
	

	-----------------------------------------------------------------------
	# 업무별 최대급여 보다 많거나 똑같이 받는사람.
	
	
	1) select job, max(sal)  from emp group by job;

	2) SELECT empno, ename, sal, deptno, from emp 
	where sal>=1300 or sal>1600 or sal>5000 or sal>2975 or sal> 3000;

	3) SELECT empno, ename, sal, deptno from emp where sal>= all( select  max(sal)  from emp group by job ) ;
	- select에서 job을 빼야...

	-----------------------------------------------------------------------------



■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
4/5 (다중열, 조인) 


	# # 다중열!!	(다중열을 기준으로) 
	

	ex) 밀러의 데이터를 수정한다.
		update emp set sal=1500, comm=300
		where ename='MILLER';

		update emp set sal=1300, comm=null
		where ename='MILLER';



	-------------------------------------------------------------------------------------
	ex)  ▶급여와 보너스가 30번 부서에 있는 직원◀의 
		급여와 보너스가 같은 직원에 대해 사번, 이름, 부서번호, 급여,보너스 조회

	  # 30번부서 사람
	  select empno, ename, deptno, sal, comm from emp where deptno=30;
	
	 
	  # '30번부서의 급여'와 급여가 같은 사람들.
	  select empno, ename, deptno, sal, comm from emp 
	  where sal in(select sal from emp where deptno=30) ;


	# select 
	 select empno, ename, deptno, sal, comm from emp 
	 where  sal in(select sal from emp where deptno=30)  
		and 
		comm in (select comm from emp where deptno=30) ;

	- 밀러가 나오면안된다.
	- 그리고 30번부서 6명이 모두 나와야한다.
	- 왜 이런 잘못된 결과가 나왔을까?
	- 각각 따로따로 비교했을때 같은사람이 있음.. (동시에 같은사람을 찾기 위해선 어떻게 해야할까?) 
	- 비교인자를 다중열로 설정해야한다.

	
	 select empno, ename, deptno, sal, comm from emp 
	 where  (sal,comm)  in (select sal, comm from emp where deptno=30) ;

	//이렇게 묶고 싶은 열을 괄호로 묶어주면 끝..
	//2마리 빠졌는데 얘들은 comm이 null 값이기 때문, is null 을 통해서 null을 0로 만들어주고 계산하자.


	--------------------------------------------------------------------------------------
	ex) 적어도 한명의 직원으로부터 보고를 받을 수 있는 직원의 이름, 업무, 입사일자, 급여를 조회
	//밑에 부사수가 한명이라도 있는 사람들 MGR(메니져) 
	
	1.명단의 사람들의 메니져 사원번호를 검색한다.
	2.해당 사원번호의 사람을 출력한다.

	
	
	select MGR from emp group by MGR;

	select distinct mgr from emp;	


	       MGR
	----------
	      7839
	      7782
	      7698
	      7902
	      7566
	      7788


	# select ename, job, hiredate, sal, MGR from emp
	 where empno in(7839,7782,7698,7902,7566,7788) ;

	
	# select ename, job, hiredate, sal, MGR from emp e
	 where exists(select * from emp where e.empno=mgr) ;
	
	//이런선택도 가능하다.
	//불필요하게 어렵다.
	//외부커리와 내부커리에 별개의 emp가 생기기때문에 별명으로 구분해준다.
	//될수있으면 상관서브커리는 사용하지 않는편이 좋다.




(5) Join 
	->하나의 테이블에 모든데이터를 전부 담지 않고 쪼개 놓는다.
	->그렇기때문에 필요에 따라서 JOIN할 필요가 있다.

	1) 여러 개의 테이블을 병합하여 하나의 결과를 도출하기 위한 방법.
	2) 종류 
		- Cartesian Product Join(데카르트 곱 조인) 
		- Equi Join
			- 공통 필드의 레코드를 가져오는 방법.	(중복된것을 가져오는것) 
			- Inner Join(Natural Join)  			(중복된것을 빼고 가지고온다.) 
			
		- Non Equi Join
			- 공통되지 않은 레코드를 가져오는 방법	(공통필드가 없을 경우) 
		- Outer Join
			->Inner Join의 확장이다.: Inner Join+공통되지 않은 레코드도 가져온다.
			->종류
				Left Outer Join	
				(공통되는것일단가지고옴, 나머지 공통안된것 왼쪽걸 가지고옴) 
				Right Outer Join
				(공통된것 가지고옴,나머지 공통되지 않은것 오른쪽걸 가지고옴) 
				Full Outer Join
				(왼쪽,오른쪽 둘다 가지고온다) 

		- Self Join
	-------------------------------------------------------------------------------------
	Ex)  uesr1에 테이블 생성하기

		CREATE TABLE tblA(
			id	number null,		//null을 넣어도 된다는 default 설정 있음
			value	number not null
		) 


		CREATE TABLE tblB(
			id	number,
			value	number
		) ;


		CREATE TABLE tblC(
			id	number,
			value	number
		) ;		



		INSERT INTO tblA VALUES(1,10) ;
		INSERT INTO tblA VALUES(2,20) ;
		INSERT INTO tblA VALUES(3,30) ;
		INSERT INTO tblA VALUES(5,50) ;
		INSERT INTO tblA VALUES(7,70) ;

		INSERT INTO tblB VALUES(1,10) ;
		INSERT INTO tblB VALUES(2,20) ;
		INSERT INTO tblB VALUES(4,40) ;
		INSERT INTO tblB VALUES(5,50) ;
		INSERT INTO tblB VALUES(8,80) ;

		INSERT INTO tblC VALUES(1,10) ;
		INSERT INTO tblC VALUES(2,20) ;
		INSERT INTO tblC VALUES(7,70) ;
		INSERT INTO tblC VALUES(8,80) ;
		INSERT INTO tblC VALUES(9,90) ;


 
        ID      VALUE
---------- ----------
         1         10
         2         20
         3         30
         5         50
         7         70

-------------------------------------------------------


		# INNER JOIN

			SELECT id, value 
			from tblA (INNER)  JOIN tblB		//inner join이 기본값이다. 그래서 생략가능
			on tblA.id=tblB.id;			//A,B 중 같은걸 가지고 오겠다.
			
			
			SELECT id, value 
			from tblA INNER JOIN tblB		
			on tblA.id=tblB.id;	
			
			//필드값이 같아서 '열의정의가 애매합니다'오류
			//콕찝어서 명시해줘야한다.

			SELECT tblA.id, tblB.value 
			from tblA INNER JOIN tblB		
			on tblA.id=tblB.id;		
			
			//두 테이블의 공통된 필드값만 가지고오는것이 INNER JOIN
			//필드앞에 이름붙이는걸 피하기위해서... 별명주기


			SELECT tblA.id, tblB.value 
			from tblA a INNER JOIN tblB b
			on a.id=b.id;				//별명을 줘서 간결하게 처리.
								//별명을 주면 테이블명을 사용못함, 별명만씀
			

			-----------------------------------------------------
			# # PL-SQL 방식으로 바꿔보자.(오라클 방식) 


			SELECT tblA.id, tblB.value 
			from tblA a, tblB b
			where tblA.id=tblB.id;

			//inner join 생략, on대신 where


			----------------------------------------------
			ex) 직원의 사번, 이름, 업무, 부서번호, 부서명을 조회하세요.
			
		 	# # 보조테이블 : DEPT
			-공통 필드 : DEPTNO
			-요구 필드 : DNAME

			
			# step.1  베이스필드
			select empno, ename, job, deptno,  from emp;

			-공통필드 : dept


			select empno, ename, job, emp.deptno, dname
			from emp INNER JOIN dept
			on emp.deptno = dept.deptno;
			
			- 조인해서 한 테이블로 결과 출력함.

			


			- 데카르트곱 조인(하나가 여러개의 값과 연산한다.) 
			- 조건이 생략되었을경우.



			ex) 직원의 사번, 이름, 업무, 부서번호, 부서명을 조회하세요
			단 SALES만 조회.

			select empno, ename, job, emp.deptno, dname
			from emp INNER JOIN dept
			on emp.deptno = dept.deptno	
			AND emp.job='SALESMAN';
			//조인하는 타이밍에 동시에 조건처리

			select empno, ename, job, emp.deptno, dname
			from emp INNER JOIN dept
			on emp.deptno = dept.deptno	
			Where emp.job='SALESMAN';
			//조인을 한다음에 조건처리		(경우에따라서 다른결과가 나올 수 있다) 
			//추가조건일 경우에는 where로 추가 할 수 있다.


			--결과 검증과정 : 이게 옳바른 경과인지 검증을해야한다...--
			--결과값이 많을경우 셈플링을 해서 검증절차를 밟는다.--


			--------------------------------------------------------------------
			ex)  a,b,c 테이블을 inner조인하면 어떤결과가 나올까?
			- 1,2만 나올듯
			


			# # 3개의 테이블 조인하기


			1) 표준방법

			select tblA.id, tblA.value
			from tblA INNER JOIN tblB
			ON tblA.id=tblB.id			//이너조인은 한번에 2개까지밖에 안된다.
			JOIN tblC				//결과값 1,2,5에 대해 다시 C와 조인한다.
			ON tblB.id=tblC.id;
			

			2) 비표준방법(오라클st) 
			//더 간결해졌다.

			select tblA.id, tblA.value
			from tblA ,tblB,tblC
			WHERE tblA.id=tblB.id AND tblB.id = tblC.id;
			
			
	
	# OUTER JOIN

		# # LEFT
		1) 표준		
		SELECT tblA.id, tblB.value
		FROM tblA LEFT OUTER JOIN tblB
		ON tblA.id=tblB.id;


		2) 비표준	(오라클st 레프트 아웃터) 
		SELECT tblA.id, tblB.value
		FROM tblA, tblB
		where tblA.id=tblB.id(+) ;



		# # RIGHT

		1) 표준		
		SELECT tblA.id, tblB.value
		FROM tblA RIGHT OUTER JOIN tblB
		ON tblA.id=tblB.id;


		2) 비표준	(오라클st right 아웃터) 
		SELECT tblA.id, tblB.value
		FROM tblA, tblB
		where tblA.id(+) =tblB.id;
		

		# # FULL

		1) 표준		
		SELECT tblA.id, tblB.value
		FROM tblA full OUTER JOIN tblB
		ON tblA.id=tblB.id;


		2) 비표준	(오라클st ) 
		- FIllouter를 지원하지 않는다.
		

		-----------------------------------------------------------

		ex) 이름, 급여, 부서명,근무지를 조회하시오
		단, 부서명과 근무지는 모두 출력할 수 있도록 하시오.
		
		select ename, sal, dname,loc
		from emp right outer join dept
		on emp.deptno = dept.deptno;

		
		
		---------------------------------------------------------------

	# # non-eqi join	(공통된 필드가 없는상태에서 join하는 방법) 

		ex)  직원의 사번, 이름, 급여, 급여등급을 조회.
		select empno, ename, sal, grade,losal,hisal
		from emp INNER JOIN salgrade
		ON sal>=losal AND sal <= hisal;

		---------------------------------------------------------------
	# # self join	(같은테이블을 조인한다) 
		->나와 같은걸 복사해서 조인한다.
		->셀프조인은 이름의 구분해줘야하기때문에 별명을 준다.
		
		ex)  직원의 사번, 이름, 업무, 직속상사 사번, 직속상사 이름을 조회
		select e1.empno, e1.ename, e1.job, e1.mgr, e2.ename
		from emp e1 INNER JOIN emp e2
		ON e1.mgr = e2.empno;
		
		-----------------------------------------------------------------

	3) SET 연산자.		//집합.(잘안씁니다.) 
		-UNION		//합집합	(중복 불포함) 
		-UNION ALL	//중복 포함
		-INTERSECT	//교집합.	
		-MINUS		//차집합.
	
		- 조인은 합친다음 컴파일해서 결과를 가지고온다.
		- 각각의 테이블을 컴파일해서 실행한다. 그렇게 나온결과를 합친다.

		-------------------------------------------------------------------
		ex)  --필드는 같은 형식이어야한다.--

		    select deptno FROM dept
		    UNION
		    select deptno FROM emp;

		    select deptno FROM dept
		    UNION ALL
		    select deptno FROM emp;

		    select deptno FROM dept
		    INTERSECT
		    select deptno FROM emp;

		    select deptno FROM dept
		    MINUS
		    select deptno FROM emp;


		



■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■




8.Transaction
->컴퓨터가 처리하는 작업의 단위.	(thread와 어떻게 다를까? 성향이 다르다. all or nothing) 

(1) All or Nothing!
- 작업을 완전히 끝내던가 시작도 하질 말던가 (확실해야한다는것) 


	### 트랜젝션 log
	->작업내용을 기록하는것.

(2) 오라클에서의 데이터베이스 구성.
	데이터파일 : .dbf
	로그파일 : .log	(여기에 Transaction log가 기록된다 // dml만 기록이 된다(update, delet등..) 


	### ORCL
	->우리가 설치한 데이터베이스 
	->C:\app\student\oradata\orcl
	->.DBF,LOG가 있다.


(3) 관련 명령어
	-commit		(메모리에만 기록되었던것이 commit이 실행되면 일이 끝마쳐지고 파일에 기록된다) 
		
	-rollback		(처음으로 돌아갈수 있다. 어느 시점으로 갈수 있는지?) 
			(작업마다 bookmark를 하고 돌아가는 시점을 저장할수 있다, 아니면 무조건 초기화) 
			

	--보통 접속부터 트렌젝션 시작, 접속종료하면 트렌젝션 종료--
	-- commit이 실행되면 트랜젝션이 종료되고 새로운 트랜젝션을 시작한다. 이제 롤백할수 없다--


(4) 동기화
	->동시접속으로 인해 값이 달라지는걸 막는다.
	->한번에 하나의 처리만 한다.(하나의 독립적인 처리만 한다.) 
	->시스템적 처리가 자동으로 이루어지기 때문에 작어자가 해야할건 없음
	->동기화의 가장높은등급은 조회도 한번에 한명씩만 가능함.
	->동시접속을 했을때 다른 사용자가 commit을 해야지 다른 사용자가 확인이 가능하다.



	### 테이블삭제
	- drop table tbla;
	- create로 만든건 rollback이 안된다.
	- 휴지통에 들어간다. 다시 살릴수 있다.
	- 완전 삭제되어도 돌릴수있다.(전문가) 


	- flashback(오라클에만 있다) 
		-'flash_recovery_date'폴더에 저장된다.
		flashback table tblA to before drop;


	### 휴지통보기
	show recyclebin;
	

	### 휴지통비우기
	-> purge recyclebin;
	



9.Data integrity(데이터 무결성) 
	
	->결점없이 데이터를 보관하겠다.
	

(1) what	//뭘지킬것인가.

	1) 실체 무결성 (entity)  	
		->실체란 실제 데이터를 보관하는객체 즉, 테이블(테이블에 데이터가 들어오는것을 지킨다) 
		->중복된 데이터 방지	(수정,삭제시 문제발생) 
		->Primary Key, Unique 필드에 이런 속성을 추가한다.


	2) 영역 무결성 (domain) 	
		->데이터 입력에 대한 범위설정을 할수있다  ex) 나이 1~150
		->Check


	3) 참조 무결성 (reference) 
		->하나 이상의 두개 이상의 테이블
		->서로 다른 테이블끼리 정보를 공유하면서 무결성을 유지한다.
		->참조관계를 만들면 연동이 되어서 잘못된 데이터를 막을 수 있다.
		->이때 참조를 할 수 있도록 기준이되는 필드(외래키) 가 있어야한다.
		- 자식테이블 :참조하는 테이블.
		- 부모테이블 :참조받는 테이블.
		
		->Foreign key	(제약, constraint) 
		


(2) How
	->컬럼의 속성
	1) NN(NOT NULL) 속성 : 필수입력.
		<<Primary Key>>
		-자체적인 해결방법이 있다.
		-Not null 이란 기능이 있다.

	2) ND(NOT Duplicate) 속성
		-중복 불가.
		-Primary Key
		-Unique

		
	3) NC(NO Change) 속성
		-수정 불가.
		-참조 당하는상황 (부모테이블일 경우) 
		-Foreign Key
		

(3) Primary Key(기본키) 
	- 거의 모든테이블에서 모든 테이블에서 기본키를 반드시 가진다.
	- 개인적이고 중복이 되지 않는 정보 (민증번호, 라이센스넘버) 		
	- 2개이상의 필드를 묶어서설정가능.(성별과 이름과 전화가 같은사람.) 

	1)  하나의 테이블에는 단 한개만 설정 가능하다.
	2)  여러 개의 필드를 묶어서 설정가능하다.
	-----------------------------------------------------------

	EX)  user1으로 접속 후 테이블 작성
		create table tblExam(
			id	number	not null,
			name	varchar2(10)  null
		) ;	

	# # 행 삽입 하는법
	insert into tblExam(name)  VALUEs('홍길동') ;		//안됨, id가 not null이라서.
	insert into tblExam(id,name)  VALUEs(1,'홍길동') ;		//당연히됨
	insert into tblExam(id,name)  VALUEs(1,'홍길동') ;		//중복된값도 됨



      # # 테이블 만든뒤에 수정하는법
	'alter'!!!(update와 구분하자) 
		
	ALTER table tblExam  
		ADD CONSTRAINT		pk_id	 PRIMARY KEY(id) ;
		- 관례 'pk_, id(컬럼이름) '
	//이미 중복된 데이터가 있으면 안된다.

	DELETE FROM tblExam;
	//중복된 데이터 지우기.
	
	

	
	Create TABLE tblExam(
		id	 number 		PRIMARY KEY,
		name 	varchar2(10) 	null
	) ;

		-중복된 데이터 불가 확인
		-not null 확인.			//insert into tblExam(name)  VALUES('임꺽정') ;
		-하지만 이런식으로 생성된 테이블은 문제가 있다.
		-직접 이름을 줘는것이 좋다.(직관적으로 제약을 확인 할 수 있도록) 
	
	삭제 : DROP TABLE tblExam;


	Create TABLE tblExam(
		id	number 		CONSTRAINT pk_id PRIMARY KEY,
		name 	varchar2(10) 	null
	) ;


	

	------------------------------------------------------------
	# 가장 좋은 방식.	
	->뭐가 다를까?
	->하나의 필드에 여러가지를 묶을수 있다.


	Create TABLE tblExam(
		id	number(3) ,
		name 	varchar2(10) 	null,
		CONSTRAINT pk_id PRIMARY KEY(id,name) 
	) ;



	//number(3)  	: 정확하게 쓰고자 하는 자릿수를 지정할 수 있다.
	//number(3,2) 	: 실수표현가능 정수자리 3자리, 소수자리 2자리.

	
	- 컬럼삭제
	alter table tblExam
		drop column gender;


	<<기본키는 NN속성과 ND속성을 확실하게 지켜준다.) 

     # 기본키 제거하기.
	제약 삭제하기
	ALTER TABLE tblExam
		DROP CONSTRAINT pk_id;

	-추가할떄는 add

	
    # 컬럼 추가하기.
	- 데이터가 이미 들어가있으면 테이블을 함부로 지울수가 없다!

	ALTER TABLE tblExam
		ADD gender char(4)  not null;

	- 확인하기
	 DESC tblExam;

	//기본문법이라 add만하면 컬럼을 추가하는줄 안다.




	- 차이
	char(2) 	 	-고정문자열 (초기 선언을 할때 정한 데이터 크기가 고정) 
	- 고정이 확실히다면 char() 을 쓴다.
	- 주민등록번호,전화번호등...

	varchar(10) 	-가변길이  (메모리의 길이가 저장되는 데이터에 따라서 정해진다) 
	- 시스템에게 추가작업을 요청하면서 성능적 차이가 발생한다.			

     # 컬럼 수정

	ALTER TABLE tblExam
		MODIFY gender char(4)  not null;

	- desc로 확인해보세요.



	
(4) Unique
	1)  중복 방지.
	2)  하나의 테이블에 여러개를 설정 가능.
	-------------------------------------------
	Drop table tblExam;

	CREATE TABLE tblExam(
		id	number(3) ,
		name	varchar2(10) ,
		CONSTRAINT uk_id UNIQUE(id) 
	) ;

	//유니크의 관례어 uk


	insert into tblExam(id,name)  VALUEs(1,'홍길동') ;	
	insert into tblExam(id,name)  VALUEs(1,'홍길동') ;		//무결성 제약 조건(USER1.UK_ID) 에 위배됩니다.
	
	insert into tblExam(id,name)  VALUEs(NULL,'홍길동') ;	//못막음 ㅋ
	insert into tblExam(id,name)  VALUEs(NULL,'홍길동') ;	//중복도 못막음. 이건 제품마다 다름. 
							//오라클에선 null은 값이 아님
		-------- 유니크는 nd(no duplicate) 속성을 	지원한다.------------

		--------프라이머리키는 테이블에서 딱 한번만 사용가능하다----------



(4)  default(기본값을 줄수 있다.) 

	drop table tblExam;
		
	CREATE TABLE tblExam(
		id	number(3) 		default 0,
		name	varchar2(10) 	default '무명씨'
	) ;

	
	insert into tblExam(id)  values(1) ;
	insert into tblExam(name)  values('홍길동') ;
	SELECT * FROM tblExam;

	

	- default 삭제하기.
	- 그냥 컬럼수정하면된다.
	- 똑같이 써주고 default를 빼주고 써준다.
	- 그리고 제약 검색에서 안나온다.
	- null이 될수 없다 default값이 존재하니까.
	-------------------------
	- 정정.. default값으로 지정하면 수정이 안된다.
	- null값으로 insert하면 되긴하다.

	- 최종정정
	  -default를 삭제할순없다.
	  -default를 null로 바꾸면됨...


(5) Sequence(시퀀스) 	

	-일련번호 매기기-
	-중복을 예방해주는 도구!
	->테이블에 종속이되는게 아니라 자기만의 독립적인 메모리에 만들어진다.
	->메모리에서 카운팅을 한다.
	->데이터 베이스 안에서 작업이 일어날때 마다 카운팅을 하고 불러다쓴다.


	CREATE SEQUENCE seq_id;
	->숫자를 1부터 시작하던지 100부터 시작하던지
	->따로지정하지 않으면 1씩 증가한다.
	

	alter table tblExam
		Modify id number(3) ;
	

	- 확인..	
	select * from tblexam;

	
	insert into tblExam(id)  values(seq_id.nextVal) ;
	//시퀸스를 쓰려면 처음부터 시퀸스를 써야지 중복이 발생하지 않는다.


	values(seq_message_msgid.nextVal) ;


	DESC USER_OBJECTS;		//사용자가 만든 모든제약을 볼수 있게 보여준다.
	SELECT object_name, object_type FROM user_objects;
	//내가 만든 모든객체를 볼 수 있다.




	# 지우기
	drop sequence seq_mem_id;

	# 조건넣기.
	create sequence seq_id
		increment by 10			//10씩 증기 하게 하기.
		start with 100			//시작값을 100부터.



(6) Check
	->정해진 범위안의것만 사용할 수 있게.

	-----------------------------------
	CREATE TABLE tblExam(
		id	number(3) 	,
		name	varchar2(10) ,
		city	varchar2(10) 
	constraint ck_city CHECK(city='서울'or city='경기'or city='인천' ) 
	) ;

	//딱 4개의 도시만 쓰겠금 하고싶다. 
	//괄호안에 조건을 넣어준다.


insert into tblExam(city)  VALUES('서울') ;		
insert into tblExam(city)  VALUES('수원') ;		//이렇게 하면 초기 조건에 위배된다.



	ex)  age라는 필드를 추가하여 나이를 10~40세까지만 입력받을 수 있게 하라.
	
	- 필드 추가방법...
	
	insert into tblExam(age)  VALUES(NULL) ;
	
	constraint ck_age CHECK( age between 10 and 40) ;	//between으로 범위지정하기.
	


(7)  Foreign Key (참조키) 
	
	CREATE TABLE tblDept(
		deptno	char(3) ,
		dname	varchar2(10) 
	) ;

	Insert into tblDept VALUES('100','영업부') ;
	Insert into tblDept VALUES('100','마케팅부') ;



	CREATE TABLE tblEmp(
		empno	number,
		ename	varchar2(10) ,
		hiredate	date,
		deptno	char(3) 
	) ;
	-------------------------------------------------------------

	INSERT INTO tblEmp VALUES(seq_id.nextVal, '홍길동',sysdate, '100') ;
	INSERT INTO tblEmp VALUES(seq_id.nextVal, '임꺽정',sysdate, '120') ;
	//아직 방어장치가 없어서 됨. 100하고 110만 입력받아야함 ㅠ
	//deptno에서 확인해야한다. 즉 참조를 해야한다는뜻.
	//참조키는 자식에 달아줘야한다.
	//이때 deptno의 형식이 똑같아야한다. 다르면 달수 없다.
	//그런데 이미 잘못된 데이터가 있으면 참조키를 달 수 없다다.

	

	//이름이 길어지더라도 참조키에 대한 정보를 이름으로 써줘야 편함.
	ALTER TABLE tblEmp
		add Constraint fk_deptno_emp_deptno_emp_dept FOREIGN KEY(deptno) 
		REFERENCES tblDept(deptno) ;
	//tblEmp테이블에 depto라는 컬럼은 tblDept테이블의 deptno컬럼의 참조한다.
	//부모테이블: tblDept	키:deptno
	//자식테이블: tblEmp	참조키:deptno

 
	- 참조해줄 수 있는 키의 조건
		-유니크 조건이 달려있다.
		-기본키다.

	ALTER TABLE tblDept
		add Constraint pk_deptno PRIMARY KEY(deptno) ;



	//나중에 참조를 할때 애먹을 수 있다.
	//옳은 데이터를 넣어야만하기때문..
	//참조키가 컬럼의 NC속성을 지켜준다. 참조당하는 값은 변경할 수 없다.
	

	### 업데이트를 이용해서 부모의 참조필드를 변경시도 해보자.
	
	UPDATE  tblDept
	Set deptno='300'
	where deptno='100';
	<<0행이 갱신되었습니다.>>-  안바뀜 ㅋㅋ
	
	--부모테이블의 참조당하는 컬럼값이 변하지 않는다-
	--심지어 삭제도안된다.--

	

	### 컬럼값 삭제하기
	- drop table tblDeptno;
	- 캐스케이드로는 삭제가 될수는 있지만 위험함.

	
	# 디비설계
	- 다른프로그램도 무결성에 대한 부분이 지켜져 있지 않다면
	데이터베이스가 뚫린다.
	그렇기 때문에 디비에 무결성의 속성이 있어야한다.
	안전한 관리를 위해선 무결성을 해야한다.
	


	--------------------------------------------------
	스택을 보고 테이블을 만들어라.
	
	


	
- DD
-검색해주는 기능.
-desc 테이블 조회.
- uesc user_contraints;
select constraint_name, table_name
	from user_constraints;




	-일단테이블을 모두 가지고와서
	필요한부분만 select 선택해서 보여준다.-




9.View

(1) 가상테이블
	-내가 필요한 정보만으로 구성된 가상의 테이블을 만들수 있다.!
	-잘 활용하면 데이터 관리가 수월해진다.
	-보안: 특정 중요한 필드를 보여주지 않기 위해서!
	-맞춤 거울이라고 생각할수 있지 않을까. 내가 보여주고싶은것만 비춰지는거울..

(2) 실제 테이블을 가지고 여러 관점에서 다양하게 사용할 수 있게 하는 개념.
(3) 목적
	1) 사용자의 편의
	2) 관리와 보안!

(4) 스키마 수정 불가.		- 스키마:설계.
->수정이되는것이 아니라 삭제,재생성.



(5) 문법
	CREATE [OR REPLACE] VIEW 뷰이름	[{컬럼명,...}]	//이미 뷰가 기존에 있다면 덮어씌운다. 없으면 생성한다.
	AS
	SELECT문
	

###  실습

	CREATE OR REPLACE VIEW viewEmp20
	AS 
	select empno, ename, deptno, job, sal, hiredate
	from emp
	where deptno=20;

- 이 형식을 자주사용한다면 이걸 뷰로 만들어버린다.
- 테이블이 아니라 뷰가 생성되는것임.
	<<권한이 불충분합니다.>>
	->일반 사용자는 함부로 뷰를 만들수 없다.

- 권한부여하기
GRANT create view TO scott;


->select * from viewEmp20;		//이렇게 조회가능
-> desc user_objects 	//조회가능.



	





(6) 주의할 점: insert, update, delate
	1) view를 통해 입력되지 않은 컬럼에 대한 설정.
	->뷰에는 보이지 않는 필수항목이 누락될수 있음.	
	2) view를 통해 계산된 컬럼이나 파생된 컬럼의 수정.
	3) view를 통해 여러 테이블 수정
	4) 범위를 벗어난 수정 (수정되면 안되는데 수정이 되는경우) 


	1) 테스트
	
	# 뷰생성
	CREATE OR REPLACE VIEW viewTest
	AS 
	select ename, deptno, job from emp 
	where deptno=30;

	# 삽입하기
	INSERT INTO viewTest(ename, deptno, job) 
	VALUES('홍길동',40,'CLERK') ;

	--오류 : NULL을 ~~안에 삽입할 수 없습니다.	
	-- DESC EMP; 확인
	-- NOT NULL인 'EMPNO'가 결핍되었기때문.
	

	INSERT INTO viewTest(empno, ename, depto,job) 
	vallues(1,'홍길동,40,'CLERK') ;
	->이런식으로 보이지 않는 필수항목 'EMPNO'에 대한 입력을 해줘야함.



	
	

	2) 테스트

		
	CREATE OR REPLACE VIEW VIEWTEST
	as
	select ename, deptno, sal+nvl(comm,0)  as total
		from emp where deptno =30;

	-----생성

	//의미없이 껍데기(뷰) 만 바꾼다. 원본데이터의 정보는 수정되지 않는다.
	update viewTest
	set total=2000
	where ename='ALLEN';
	-----수정(원본데이터가 수정되지는 않는다.) 
	
	



	3) 테스트

	CREATE OR REPLACE VIEW VIEWTEST
	as
	select ename, sal, job, dname, loc
		from emp, dept where emp.deptno=dept.deptno;
	
	확인
	SELECT * FROM VIEWTEST;


	UPDATE viewTest
	SET job='ANALYST', loc='강남구'
	where ename='홍길동';

	//동시에 수정작업이 일어난다 강남구(dept) , enmae(emp)  이기 때문...
	//락을 걸어버리던가.. 하는 조치가 필요하다.
		


	

	EX4) 

	CREATE OR REPLACE VIEW viewtest
	as
	select empno, ename, deptno, job, sal
		from emp WHERE deptno=30;

	
	---생성


	update viewTest
	set deptno=20
	where empno=7499;

	---- 수정 시도! (되네?) 

	

	select * from viewtest;
	- 기존의 정보가 바뀌는 경우가 생긴다.
	- 조회자체에서 allen이 나오지 않는다.
	- 기존 view의 정보는 보존되어야하는데 그렇게 안됌.
	- 따라서 범위에 맞게 수정해서 초기에 보여줬던 뷰가 보존이 되겟금 해야한다.
	


	rollback;
	-----다시 롤백
	
	

	이런 사고를 막을 수 있는 방법이 잇다.
	->즉 범위 안의 수정.
	->옵션을 넣어서 범위에서 벗어나는 수정을 하지 못하도록 한다.
	->	with CHECK OPTION; (범위안에서만 체크가되서 수정이 될수 있겠금) 

	
	CREATE OR REPLACE VIEW viewtest
	as
	select empno, ename, deptno, job, sal
		from emp WHERE deptno=30
	with CHECK OPTION;


	--------재생성

	update viewTest
	set deptno=20
	where empno=7499;
	

	--------조건에 따라서 리미트가 생긴다!


	---이런 수정편집에 의한 오류를 막기으려면 아예 읽기전용으로 편집이 불가능하도록 하던가.---


	- 읽기전용으로 만들기
	-WITH READ ONLY;





10.Procedure	(stored Procedure) 
	->개념적으로 매서드와 비슷하다.
	->미리 컴파일을 해놓는다.
	->이 개념속에서는 조건문, 반복문이 가능해진다.
	->유지보수하기가 번거롭다... DB에 접근해서 고쳐야하기때문에..
	   (접속권한, 접근) 
	

(1)  PL/SQ의 절차적인 구조
	[DECLARE
		선언부]
	BEGIN
		코드작성(처리) 
	[EXCEPTION
		예외 처리]
	END;


(2) 문법
	CREATE [OR REPLAVE] PROCEDURE 프로시저명[(파라미터,..) ]
	IS
	BEGIN
		내용
	END;


(3)  실습
	1) 사번이 7788인 사원의 급여를 3500로 수정하는 프로시저
	//오라클도 sp를 씀 그래서 관례상 usp
	//오라클에 하나의 객체로 저장이된다.
	//컴파일을 할때 필요한 명령어가 /이다.

		CREATE OR REPLACE PROCEDURE usp_sal
		IS
		BEGIN
		
			UPDATE emp
			SET sal= 3500
			where empno=7788
		END;
	/

	- 에러보기
	show error;

	- 수정
	edit


	execute(exec) 	//프로시져를 실행하겠다는 명령어
	EXEC usp_sal;	// pl/sql 처리가 정상적으로 완료되었습니다.
	



	2) 1번 예제를 개선해서 매개변수를 사용할 수 있도록 해보자.
	

		CREATE OR REPLACE PROCEDURE usp_sal
		(p_sal IN number,p_empno IN number) 
		IS
		BEGIN
		
			UPDATE emp
			SET sal= p_sal
			where empno=p_empno;
		END;

	//이름이 같으면 매개변수와 상관없이 replace 된다. (참/거짓) 
	//처리된 인원수가 필요하다면?

	

	==============================================================================

	3) 2번 예제를 개선하여 몇명이 처리되었는지 메세지 출력
		//메세지출력에 대한 부분은 관리자에게 필요한기능.
	

		CREATE OR REPLACE PROCEDURE usp_sal
		(p_sal IN emp.sal%type ,p_empno IN emp.emp%type) 
		IS
		BEGIN
		
			UPDATE emp
			SET sal= p_sal
			where empno=p_empno;

		
			IF sql%notfound then
				dbms_output.put_line(p_empno || '는 없는 사원번호') ;
			else
				dbms_output.put_line(sql%rowcount ||'명 처리됨') ;
			end if;


		END;

		//	SET SERVEROUTPUT ON
		//이 기능을 켜야한다.

		

	//매개변수의 데이터타입을 알수 없다면 어떻게 해야할까?
	-> emp.sal%type (emp테이블의 sal값과 같은 데이터 타입으로 설정해라) 

	//전역변수를 사용할수 있다.
	- 처리한 결과에 대해서 true false를 반환한다. 
	- sql%notfound 

	//몇명처리됬는지 알려주는 변수가 있음
	sql%rowcount


	//PL SQL의 조건문.
	//조건식에 해당하는게 있는지 없는지 확인하는방법	
		




	없는 사원번호를 쳐보자.
	exec ups_sal(3000,100) ;
	//왜 없는 사원번호라고 안나옴?

	- 설정이 필요하다.
	- SET SERVEROUTPUT ON



	==============================================================================

	4)  값을 리턴하는 경우
	->세금 계산 프로시저 작성
	   특정한 수의 7%의 세금을 계산하여 그 결과를 똘려주는 프로시져


		

		CREATE OR REPLACE PROCEDURE usp_tax
		(p_money IN number, p_result OUT number) 		

		IS
		BEGIN
			p_result := p_money * 0.07;				
	
		END;
		

	
		//  := 대입연산자 
		//in은 매개변수처럼 받고 out 은 내보낸다.




	### 변수 선언 var g_result number;		//외부에서 사용하는 임시변수
	### exec usp_tax(3500, :g_result) ;		//전달받기위한 변수 g_result
		


	### print :g_result				//결과출력, 콜론을 붙여야햔다.




	=================================================================================

	
	5) 사원 등록 프로시져
	사원의 이름, 업무, 직속상사, 급여를 입력받는다.
	부서번호는 직속상사의 부서번호와 같다.
	보너스는 SALESMAN일 경우 0, 그외에는 NULL로 처리
	
		//is와 begine 사이 이곳이 변수 선언부
		//var는 외부에서 변수선을 할 때만..

		CREATE SEQUENCE seq_empno START WITH 800;

		CREATE OR REPLACE PROCEDURE usp_register
		(p_ename IN emp.ename%type,
		 p_job IN emp.job%type,
		 p_mgr IN emp.mgr%type,
		 p_sal IN emp.sal%type) 
		IS

			v_deptno		emp.deptno%type;
			v_comm		emp.comm%type;


		BEGIN

			SELECT deptno INTO v_deptno From emp WHERE empno=p_mgr;


			IF p_job = 'SALESAMN' THEN
				v_comm:=0;
		
			ELSE
				v_comm:= null;

			END IF;
		
			INSERT INTO emp(empno, ename, job, mgr, 
					hiredate, sal,comm,deptno) 
			VALUES(seq_empno.nextVal, p_ename, p_job,
				p_mgr, sysdate, p_sal, v_comm, v_deptno) ;
		END;
		
	show error;
	//에러수정 어디서 나는지... 수정할것
	//기텁에 올라온 코드 확인 비교할것.


	EXEC usp_register('임꺽정','CLERK',7788, 300) 
	//프로시져 호출

	
	select empno, ename, deptno from emp;




	==============================================================================
	6)  5번문제를 개선하여 예외처리 추가.
	




	CREATE SEQUENCE seq_empno START WITH 800;

		CREATE OR REPLACE PROCEDURE usp_register
		(p_ename IN emp.ename%type,
		 p_job IN emp.job%type,
		 p_mgr IN emp.mgr%type,
		 p_sal IN emp.sal%type) 
		IS

			v_deptno		emp.deptno%type;
			v_comm		emp.comm%type;
			v_job_err		EXCEPTION;

		BEGIN

			SELECT deptno INTO v_deptno From emp WHERE empno=p_mgr;

			IF p_job NOT IN('CLREK, 'SALESMAN', 'PRESIDENT', 'MANAGER','ANALYST')  THEN
				RAISE v_job_err;

			ELSIF p_job = 'SALESAMN' THEN
				v_comm:=0;
		
			ELSE
				v_comm:= null;

			END IF;
		
			INSERT INTO emp(empno, ename, job, mgr, 
					hiredate, sal,comm,deptno) 
			VALUES(seq_empno.nextVal, p_ename, p_job,
				p_mgr, sysdate, p_sal, v_comm, v_deptno) ;

		EXCEPTION
			WHEN v_job_err THEN
				dbms_output.put_line('잘못된 업무가 입력되었음') ;
			WHEN no_data_found THEN
				dbms_output.put.line('입력된 데이터 없음') ;
			WHEN OTHERS THEN
				dbms_output.put.line('기타 오류') ;
		END;


	==============================================================================
	7)  이름을 입력받아 그 직원의 부서명과 급여를 검색하는 프로시져


		// 수정된 예제. 잘 실행된다.


			CREATE OR REPLACE PROCEDURE usp_search
			( p_ename IN emp.ename%type,
   			  p_dname OUT dept.dname%type,
			  p_sal OUT emp.sal%type) 
			
			IS
				v_deptno		emp.deptno%type;
			BEGIN
				SELECT sal, deptno INTO p_sal, v_deptno 
				FROM emp WHERE ename = UPPER(p_ename) ; 
 
				SELECT dname INTO p_dname FROM dept
				WHERE deptno = v_deptno;
			
			END;
		

		//







		테스트
		var g_dname 	varchar2(14) 
		var g_sal		number
		exec usp_search('scott', :g_dname, : g_sal) 
		print :g_dname
		print :g_sal

		


	=============================================================================
	8)  숫자를 입력받아서 전화번호 형식으로 리턴하느 프로시져

		CREATE OR REPLACE PROCEDURE usp_tel (p_tel IN OUT verchar2) 
		IS
		BEGIN

			p_tel := substr(p_tel, 1, 3)  || '-' substr(p_tel, 4) ;
		
		END;
		
		테스트
		var g_tel varchar2(20) 
		begin
		:g_tel := 1234567;
		end;
		/
		

		exec usp_tel(:g_tel) 
		print:g_tel

	================================================================================

	



11.Trigger
	- 자동화기능을 만든다.
	- 관리자를 편리하게 만들어주는 기능.
	- 시스템이 호출한다.(일종의 콜백이다. 이벤트발생시점에서 자동호출) 	



	(1)  이벤트에 의해서 자동으로 호출되는 프로시져
		-DML(insert, update, delete) 

	(2)  문법
		CREATE [OR REPLACE] TRIGGER 트리거명 {BEFORE | AFTER}
			트리거 이벤트 ON 테이블명
			[반복문]

		BEGIN
			raise_application_error(-20506, '수정된 값이 범위에 맞지 않다.') ;
		END;



	(3) DD : USER_TRIGGERS
		
	(4) 트리거는 2개의 임시테이블을 가지고 있다.
		OLD(:old) , NEW(:new) 		//필요할때 만들었다가 사라지는 임시 테이블.
	

	Trigger에서 임시테이블이 형성되어 INSERT, DELETE,UPDATE가 이루어지 논리.
			
	

	===============================================================================
	(5) 실습
		1) emp테이블에서 급여를 수정할 때 현재의 값보다 적게 수정 할 수 없고
		  현재의 값보다 10%이상 높게 수정할 수 없도록 제한하는 트리거를 만들어라.

		  	CREATE OR REPLACE TRIGGER tri_sal_update 
				before update ON emp
				FOR EACH ROW
					WHEN(NEW.sal <OLD.sal OR  NEW.sal >OLD.sal*1.1) 

			BEGIN
				raise_application_error(-20506. '수정된값이 범위에 맞지 않습니다.') 
			END;
	
	//뭔가 결핍됨... 다시 할것...
	// -20506은 에러넘버를 말한다.
	//트리거를통해 에러의 종류를 정의했다. 에러넘버는 2000이후의 숫자를 임의로 사용할 수 있다.
	

	트리거 삭제
	DROP TRIGGER tri_sal_update;
	==============================================================================
		2) emp테이블을 사용할 수 있는 시간은 월요일부터 금요일까지	
		09시부터 18시까지만 사용할 수 있도록 하는 트리거

		CREATE OR REPLACE TRIGGER tri_resource
			BEFORE update OR insert OR delete ON emp
		BEGIN
			IF to_char(sysdate, 'dy')  in('토', '일')  OR 
				to_number(to_char(sysdate, 'HH24') )  NOT BETWEEN 9 and 16 THEN
				raise_application_error(-20506, '허용된 시간이 아닙니다.') ;
			END IF;
			
		END;
	

		
		DROP TRIGGER tri_resource;



	-----------
	# 트리거의 활용
	
	->통계자료를 만들때 트리거를 활용할 수 있다.
	->트리거가 많으면 많을수록 서버가 느려진다.	(시스템이 항상모니터링하고있기때문.) 
	
	
	- SQL의 종류
		-ansi	SQL	(표준 SQL) 
		-제품별  SQL	(오라클: PL-sql, ms-sqlserver : t-sql) 
	 



	3) Analystic Function	
	->당장 쓸일은 없습니다.
	->똑같은 데이터로 어떻게 분석을 할것인가?
	



	# 명령어
	desc user_objects
	

	select object_name, object_type from user_objects;
	//이런식으로 가능합니다.


■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■


13.데이터 베이스 설계(modeling) 
->데이터 중복성 제거.

미팅-요구사항수집-요구사항정리-DB설계(논리,물리,개념) -프로그램코딩-테스트 디버깅-납품-유지보수



	### 이론적 설계 3단계.
	(1) 개념적 설계
	->요구사항정리.(미팅내용을 잘 정리) 
	->그림으로 표현하는것이 편리함.(ERD.) 

	(2) 논리적 설계
	(3) 물리적 설계


	- ERD( entity relation diagram) 
	-데이터의 도식화 표준.
	-테이블간의 관계망.
	-간략한것은 그냥 순서도라고 생각하면됨.


	### 주식별자
	-기본키. (primary key) 


	### 관계망.
	->공통필드의 유무.


	1) 일대일
	->대부분 합친다.
	->합치지 않는 경우는 자주쓰지 않는경우.

	
	2) 일대다.
	->일반적으로 일대다의 관계가 많다.
	->부모자식관계라고도 한다.

	
	3) 다대다
	->기형적 형태.
	->엄청난 중복을 야기한다. cause a lot of 중복.


	### 관계(마름모) 도 상황에 따라 테이블이 될 수 있다.



	### Entity뽑기
	-명사,형용사,동사를 분리해낸다.
	-명사는 테이블이 될 확률이 높다.
	



### 정규화
->노하우가 집약되어있는 가이드라인.
->보편적 설계를 할 수 있게 도와준다.
->일반적으로 제 3정규화까지 실무에서 적용된다.
basicly it used to apply  the 3 normalization in the fild.


(1) 제 1 정규화
	-속성값은 반드시 원자값이어야한다.(하나의 필드에 여러개의 값이 들어가면 안된다) 
	  - 이런 경우 2개의 테이블로 쪼개라.

(2) 제 2 정규화
	-기본키가 여러개의 필드로 묶여있는 경우.
	-기본키가 복합키 일때, 복합키의 일부분이 다른 속성의 결정자인지 여부 판단.
	-모든 키가 아닌 컬럼은 기본키 전체에 의존적이어야 한다.
	-기본키의 일부분에 의존적이어서는 안된다.

	ex) 사번,프로젝트번호를 묶어서 기본키를 설정한 경우.
	- 이때 테이블 안에 사번이나 프로젝트 필드 한가지에만 관계가 있는 필드가 있어서는 안된다.
	- 이렇게 기본키중 일부에만 관계를 가지는 필드가 있는경우 외부테이블로 독립시킨다.
	- 독립시킬때 테이블간의 관계망을 반드시 생각해야한다(일반적으로 일대다의 관계) 
	

(3) 제 3 정규화
	-키가 아닌 컬럼은 '키가 아닌 컬럼'에 의존적이어서는 안된다.
	-오직 기본키와 의존적 관계가 형성 되어야한다.
	-기본키와 독립적인 필드가 있으면 안된다.
	-모든 필드는 반드시 기본키에 의존적이어야 한다.
	

	
	
(4) 제 4 정규화
	-다대다를 일대다로 변환
		

(5) 제 5 정규화

	### 몇몇 예외 정규화경우.
	-꼭 나누는것만이 정규화가 아니다. 트랜드, 상황에 따라 정규화형태는 다양해질 수 있다.
	-자주 조인을 하는경우 (조인을 피하기위해 중복필드를 생성한다) 
	-L자 테이블.




# # ERD툴: ER-WIN, EX-ERD(토마토,http://ko.exerd.com/) 

### ER-win
->표기법(미국방성 표기프로젝트IDEF1X , IE 'infromation Enginering') 
	-식별관계(주로 일대일관계)  , 비식별 관계(구별할 수 없다, 주로 일대다관계.) 


### 동그라미없음 : 널값 비허용.
### 동그라미 : 널값 허용.
### 점선 : 비식별
### 실선 : 식별

### 일대일 식별관계로 설정하는방법





# 프로젝트 우클릭-new-other-exerd-exerdfile-next-어느프젝트에서 만들것인가
-대상DBMS(오라클) -프로젝트 선택, 파일명 아무거나~ -




# 산출물
(1)  발표ppt
	-조원 소개
	-연할 분담
	-후기
	-실행화면 챕쳐(3개정도 이상) 
(2)  ERD
	-개념적
	-물리적 (논리적은 따로 ㄴㄴ) 

(3) 자바 소스(자바 Doc 포함할것)  , sql 소스 

(4) 프로시저 spec
-만약에 프로시저를 만들었을때만.


(5) 테이블 상세 스키마.
-테이블모양으로 그려서 설명을 써라
-특별한 형식 ㄴㄴ


(6) UML
-자바 클래스, 프로그램에 대한 설계도.
-코딩이 다 끝난다음에
-클래스 다이어그램
-시퀀스 다이어그램

(7) 샘플 데이터는 최소 50개 이상.


(8)  10개 문항을 테스트
- 기본적으로 요구사항을 베이스로 한다.


# 프로젝트일지를 작성한다.
->팀원별로.... 








14.JDBC : 자바 DB연동
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
 ->DriverManager 클래스
 ->Connection con = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:orcl","scott","1111") ;
 ->이건 다큐먼트 참고!!!




(1) JDBC 표준문법 : java.sql
	-Connection : 연결정보
		DB와의 연결 정보를 제공하는 클래스.

	-Statement : 명령어(sql)  전달, 실행.

	-ResultSet : 결과값(select) 을 임시로 저장한다.

(2)  ResultSet
	1) DB로부터 가져온 결과값을 임시로 저장한다.
	2) 하나의 테이블을 저장할수 있는구조.
	3) 연결 지향적.(DB와 연결이 되어있는 동안만 존재한다) 
	4) 반드시 처음에는 next() 사용해야한다. (다음 레코드로 이동) 
	

(3)  Satement
	1) executeQuery()  : select 일때
	2) executeUpdate()  :insert, update, delete 일때.
	


(4) PreparredStatement
->이제 Statement 쓰지마라.
->이걸 대신해서 써라.
->변하지 않는 문자열들을 DB에 보내서 미리 컴파일을 해서 준비한다.
->나중에 입력받는것은 나중에 따로보낸다.

	1) 쿼리의 복잡함을 단순화 시킨다.
	2) 보안 : 쿼리문과 데이터를 섞어쓰면 보안에 취약함.

	### 단 like 연산자를 사용할때는 statement를 사용해야한다.




(5) CallableStatement
->DB에 미리 만들어 놓은 프로시져를 호출할때.

	1) 프로시저 호출
	2) 문법
		{call 프로시져명}
		{call 프로시저명(?,?,...) }
		{?=call 프로시져명(?,?,...) }	//리턴값이 있을경우.

