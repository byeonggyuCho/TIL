


# Procedure	(stored Procedure) 
	- 개념적으로 매서드와 비슷하다.
	- 미리 컴파일을 해놓는다.
	- 이 개념속에서는 조건문, 반복문이 가능해진다.
	- 유지보수하기가 번거롭다... DB에 접근해서 고쳐야하기때문에..
	   (접속권한, 접근) 
	

1)  PL/SQ의 절차적인 구조
	[DECLARE
		선언부]
	BEGIN
		코드작성(처리) 
	[EXCEPTION
		예외 처리]
	END;


2) 문법
	CREATE [OR REPLAVE] PROCEDURE 프로시저명[(파라미터,..) ]
	IS
	BEGIN
		내용
	END;


3)  실습
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
	-  emp.sal%type (emp테이블의 sal값과 같은 데이터 타입으로 설정해라) 

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
	- 세금 계산 프로시저 작성
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
