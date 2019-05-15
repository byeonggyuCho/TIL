
# Data integrity(데이터 무결성) 
	
	- 결점없이 데이터를 보관하겠다.
	

1) what	//뭘지킬것인가.

	1. 실체 무결성 (entity)  	
		- 실체란 실제 데이터를 보관하는객체 즉, 테이블(테이블에 데이터가 들어오는것을 지킨다) 
		- 중복된 데이터 방지	(수정,삭제시 문제발생) 
		- Primary Key, Unique 필드에 이런 속성을 추가한다.


	1. 영역 무결성 (domain) 	
		- 데이터 입력에 대한 범위설정을 할수있다  ex) 나이 1~150
		- Check


	1. 참조 무결성 (reference) 
		- 하나 이상의 두개 이상의 테이블
		- 서로 다른 테이블끼리 정보를 공유하면서 무결성을 유지한다.
		- 참조관계를 만들면 연동이 되어서 잘못된 데이터를 막을 수 있다.
		- 이때 참조를 할 수 있도록 기준이되는 필드(외래키) 가 있어야한다.
		- 자식테이블 :참조하는 테이블.
		- 부모테이블 :참조받는 테이블.
		
		- Foreign key	(제약, constraint) 
		


2) How
	- 컬럼의 속성
	1) NN(NOT NULL) 속성 : 필수입력.
		~~~ Primary Key~~~ 
		-자체적인 해결방법이 있다.
		-Not null 이란 기능이 있다.

	2) ND(NOT Duplicate) 속성
		- 중복 불가.
		- Primary Key
		- Unique
		
	3) NC(NO Change) 속성
		- 수정 불가.
		- 참조 당하는상황 (부모테이블일 경우) 
		- Foreign Key
		

3) Primary Key(기본키) 
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

----
### 행 삽입 하는법
	~~~
	insert into tblExam(name)  VALUEs('홍길동') ;		//안됨, id가 not null이라서.
	insert into tblExam(id,name)  VALUEs(1,'홍길동') ;		//당연히됨
	insert into tblExam(id,name)  VALUEs(1,'홍길동') ;		//중복된값도 됨
	~~


### 테이블 만든뒤에 수정하는법
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

			- 중복된 데이터 불가 확인
			- not null 확인.			//insert into tblExam(name)  VALUES('임꺽정') ;
			- 하지만 이런식으로 생성된 테이블은 문제가 있다.
			- 직접 이름을 줘는것이 좋다.(직관적으로 제약을 확인 할 수 있도록) 
		
		삭제 : DROP TABLE tblExam;


		Create TABLE tblExam(
			id	number 		CONSTRAINT pk_id PRIMARY KEY,
			name 	varchar2(10) 	null
		) ;


		

------------------------------------------------------------
### 가장 좋은 방식.	
- 뭐가 다를까?
- 하나의 필드에 여러가지를 묶을수 있다.

~~~
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

//기본키는 NN속성과 ND속성을 확실하게 지켜준다.
~~~ 

### 기본키 제거하기.
1. 제약 삭제하기

~~~
ALTER TABLE tblExam
	DROP CONSTRAINT pk_id;
~~~

2. 제약 추가하기
~~~
ALTER TABLE tblExam
	add CONSTRAINT pk_id;
~~~
	
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

----

	
4) Unique
	1)  중복 방지.
	2)  하나의 테이블에 여러개를 설정 가능.
	~~~
	Drop table tblExam;

	CREATE TABLE tblExam(
		id	number(3) ,
		name	varchar2(10) ,
		CONSTRAINT uk_id UNIQUE(id) 
	) ;
	~~~
	//유니크의 관례어 uk

	~~~
	insert into tblExam(id,name)  VALUEs(1,'홍길동') ;	
	insert into tblExam(id,name)  VALUEs(1,'홍길동') ;		//무결성 제약 조건(USER1.UK_ID) 에 위배됩니다.
	
	//못막음 ㅋ
	insert into tblExam(id,name)  VALUEs(NULL,'홍길동') ;	
	//중복도 못막음. 이건 제품마다 다름. 
	//오라클에선 null은 값이 아님
	insert into tblExam(id,name)  VALUEs(NULL,'홍길동') ;	
						
							
	//유니크는 nd(no duplicate) 속성을 	지원한다.
	//프라이머리키는 테이블에서 딱 한번만 사용가능하다
	~~~


5)  default(기본값을 줄수 있다.) 
~~~
	drop table tblExam;
		
	CREATE TABLE tblExam(
		id	number(3) 		default 0,
		name	varchar2(10) 	default '무명씨'
	) ;

	
	insert into tblExam(id)  values(1) ;
	insert into tblExam(name)  values('홍길동') ;
	SELECT * FROM tblExam;
~~~
	

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


6) Sequence(시퀀스) 	

	-일련번호 매기기-
	-중복을 예방해주는 도구!
	- 테이블에 종속이되는게 아니라 자기만의 독립적인 메모리에 만들어진다.
	- 메모리에서 카운팅을 한다.
	- 데이터 베이스 안에서 작업이 일어날때 마다 카운팅을 하고 불러다쓴다.


	CREATE SEQUENCE seq_id;
	- 숫자를 1부터 시작하던지 100부터 시작하던지
	- 따로지정하지 않으면 1씩 증가한다.
	

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



7) Check
	- 정해진 범위안의것만 사용할 수 있게.

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
	


8)  Foreign Key (참조키) 
~~~
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
~~~
	-------------------------------------------------------------
~~~
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
~~~ 0행이 갱신되었습니다.~~~ -  안바뀜 ㅋㅋ

--부모테이블의 참조당하는 컬럼값이 변하지 않는다-
--심지어 삭제도안된다.--

	
~~~
	### 컬럼값 삭제하기
	- drop table tblDeptno;
	- 캐스케이드로는 삭제가 될수는 있지만 위험함.

	
	


	
- DD
-검색해주는 기능.
-desc 테이블 조회.
- uesc user_contraints;
select constraint_name, table_name
	from user_constraints;




	-일단테이블을 모두 가지고와서
	필요한부분만 select 선택해서 보여준다.-

