# View

1) 가상테이블
	-내가 필요한 정보만으로 구성된 가상의 테이블을 만들수 있다.!
	-잘 활용하면 데이터 관리가 수월해진다.
	-보안: 특정 중요한 필드를 보여주지 않기 위해서!
	-맞춤 거울이라고 생각할수 있지 않을까. 내가 보여주고싶은것만 비춰지는거울..

2) 실제 테이블을 가지고 여러 관점에서 다양하게 사용할 수 있게 하는 개념.
3) 목적
	1) 사용자의 편의
	2) 관리와 보안!

4) 스키마 수정 불가.		
- 스키마:설계.
- 수정이되는것이 아니라 삭제,재생성.



5) 문법
~~~
	CREATE [OR REPLACE] VIEW 뷰이름	[{컬럼명,...}]	
	 -- 이미 뷰가 기존에 있다면 덮어씌운다. 없으면 생성한다.
	AS
	SELECT문
~~~

###  실습

	CREATE OR REPLACE VIEW viewEmp20
	AS 
	select empno, ename, deptno, job, sal, hiredate
	from emp
	where deptno=20;

- 이 형식을 자주사용한다면 이걸 뷰로 만들어버린다.
- 테이블이 아니라 뷰가 생성되는것임.


#### 권한이 불충분합니다.
- 일반 사용자는 함부로 뷰를 만들수 없다.

- 권한부여하기
~~~
GRANT create view TO scott;

/* 이렇게 조회가능 */
- select * from viewEmp20;		
/* 조회가능. */
- desc user_objects 	
~~~


	





6) 주의할 점: insert, update, delate
	1) view를 통해 입력되지 않은 컬럼에 대한 설정.
	- 뷰에는 보이지 않는 필수항목이 누락될수 있음.	
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
	~~~
	INSERT INTO viewTest(ename, deptno, job) 
	VALUES('홍길동',40,'CLERK') ;

	--오류 : NULL을 ~~안에 삽입할 수 없습니다.	
	-- DESC EMP; 확인
	-- NOT NULL인 'EMPNO'가 결핍되었기때문.
	

	INSERT INTO viewTest(empno, ename, depto,job) 
	vallues(1,'홍길동,40,'CLERK') ;
	- 이런식으로 보이지 않는 필수항목 'EMPNO'에 대한 입력을 해줘야함.

	~~~

	
	

	2) 테스트
~~~
		
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
	
~~~	



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
~~~
	CREATE OR REPLACE VIEW viewtest
	as
	select empno, ename, deptno, job, sal
		from emp WHERE deptno=30;
~~~

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
- 즉 범위 안의 수정.
- 옵션을 넣어서 범위에서 벗어나는 수정을 하지 못하도록 한다.
- 	with CHECK OPTION; (범위안에서만 체크가되서 수정이 될수 있겠금) 


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
