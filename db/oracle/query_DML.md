#  DML

1) INSERT
~~~ SQL
INSERT into 테이블명(필드명, ...)  Values(값,...)  
-- 필드에 값을 넣는다.
INSERT into 테이블명 values(값,...) 		
-- 필드생성 순서대로 값을 대입된다.
~~~

2) UPDATE
~~~ SQL
UPDATE 테이블명
set 필드명 =값,필드명=값, ...
WHERE 조건식
~~~

    
3) DELETE
~~~ SQL
DELETE FROM 테이블명 (WHERE 조건식) ;	
-- 테이블에 있는 데이터가 통으로 삭제된다.
~~~

    
----------------------------------------


### 예제
- 사용자 추가 : 
~~~ SQL
user (connect, resource 권한 부여) 
~~~
- 테이블 작성 : 
~~~ SQL
CREATE TABLE tbltest(
    id		number,
    name		varchar2(10),
    hiredate	date
    ) ;
~~~


- 데이터
~~~ SQL
INSERT into tbltest(id, name, hiredate)  values(1, '홍길동',SYSDATE) ;
INSERT into tbltest(id, name)  values(2,'임꺽정') ;
INSERT into tbltest(id, name, hiredate)  values(3, '김유신',null) ;
INSERT into tbltest values(4, '신돌석','2017/2/5') ;
~~~

- UPDATE
~~~ SQL
UPDATE tbltest
set hiredate=SYSDATE
WHERE id=2;
~~~

----


4) SubQuery (서브쿼리)

     ORDER BY는 맨 마지막에 실행되어야하기 때문에..
    1) 다른 query문에 포함된 query
    2) 반드시 ()를 사용해야한다.
    3) 연산자의 오른쪽에 와야한다.
    4) ORDER BY를 사용할 수 없다.
    5) 종류
    
        - 상관 SubQuery <br>
        외부쿼리가 먼저 실행되어 결과값을 리턴해서 안쪽에 있는 쿼리가 실행되고 
        그 결과를 다시 리턴받아서 외부쿼리가 실행된다, 즉 3번의 실행

        - 서브쿼리를 복사해서 실행했을때 안되면 상관서브쿼리다. <br> 연결되어있기때문에 독립적 사용못함

    6) 유형
        - 단일행 (Single-Row Subquery )
        - 다중행 (Multiple-Row Subquery)
        - 다중열 (Multiple-Column Subquery)
        - Inline View (FROM절 Subquery)  
        - Scalar Subquery  

    7) 연산자
        - 단일행
        
            =,<, >, >=, <=, -, <>,...
        - 다중행
        ~~~ SQL
        IN	        -- =
        ANY	        -- or의미 , <=,>,< 등 적용가능
        ALL
        EXISTS	        -- 해당연산자가 존재하는지 확인한다.
        NOT
        ~~~
--------------------------------------------------------------
  ex) Scott의 급여보다 더 많이 받는 직원의 이름,업무, 급여를 조회.
1. 스캇이 얼마 받는지?
~~~ SQL
SELECT SAL FROM emp WHERE ename='Scott';
 -- 3000	   
~~~
   
2. 3000보다 많이 받는사람은?
~~~ SQL
SELECT ename SAL FROM emp WHERE SAL>3000;
~~~

#### 이렇게 중첩된 쿼리를 '서브쿼리' 라한다.
~~~ SQL
SELECT ename SAL 
FROM emp 
WHERE 
    SAL > (SELECT SAL FROM emp WHERE ename='Scott');	
~~~
- 서브쿼리가 먼저실행된다.
- 결과값을 리턴받아 다른 쿼리가 실행된다.


----------------------------------------------------------
ex)  사번이 7521의 업무와 같고, 급여가 7934보다 많은직원의 사번, 이름 업무, 급여를 조회
~~~ SQL
SELECT empno, ename, job,SAL 
FROM emp 
WHERE empno=7521;
-- SALesman;

SELECT empno, ename, job,SAL 
FROM emp 
WHERE empno=7934	
-- SAL 1300;

SELECT empno, ename, job,SAL 
FROM emp 
WHERE job='SALESMAN'
    AND SAL>1300;

SELECT empno, ename, job,SAL 
FROM emp 
WHERE job=(SELECT  job FROM emp WHERE empno=7521) 	
    AND SAL>(SELECT SAL FROM emp WHERE empno=7934) ;
~~~


    

서브쿼리만 실행했을때 결과값으로 나오는 레코드의 갯수
- 이게 유형으로 정리된다.
- 단일행.



------------------------------------------------------------------------------
ex) 업부별로 최소급여를 받는 직원의 사번, 이름, 급여, 부서번호 조회
~~~ SQL
-- 업무별 최소급여를 받는사람을 뽑고 그중에서 가장 적은 급여를 받는사람을 뽑아라.

SELECT empno, ename, SAL, deptno 
FROM emp 
GROUP BY job 
ORDER BY SAL DESC;

SELECT job, SAL FROM emp ORDER BY SAL;
~~~


1) 각 업무별 최저급액 리스트
~~~ SQL
SELECT job, min(SAL)  FROM emp GROUP BY job;

----------------------
800,1250,5000,2450,3000
~~~


2) 해당 리스트의 금액과 같은 금액을 받고있는 사람들의 리스트 출력.
~~~ SQL
SELECT empno, ename, SAL, deptno, 
FROM emp 
WHERE  SAL = 800 
    or SAL = 1250 
    or SAL = 5000 
    or SAL = 2450 
    or SAL = 3000;

SELECT empno, ename, SAL, deptno, 
FROM emp
WHERE SAL IN(800,1250,5000, 2450,3000);
~~~
~~~ SQL
SELECT empno, ename, SAL, deptno, 
FROM emp 
WHERE SAL= (SELECT job, min(SAL)  FROM emp GROUP BY job) ;
~~~
- 이 결과가 5개가 나온다. 따라서 다중행이된다.	(800, 1250, 5000, 2450, 3000) 
-  '='이건 단행 연산자다 1:1
-  'in' 이건 다중행 연산자.

~~~ SQL
SELECT empno, ename, SAL, deptno FROM emp 	

WHERE SAL in(SELECT  min(SAL)  FROM emp GROUP BY job) ;
~~~
----------------------------------------------
### 업무별 최저급여 보다 많이 받는사람.
~~~ SQL
SELECT job, min(SAL)  FROM emp GROUP BY job;

SELECT empno, ename, SAL, deptno, FROM emp 
WHERE SAL>800 
or SAL>1250 
or SAL>5000 
or SAL>2450 
or SAL> 3000;

-- sub 적용
SELECT empno, ename, SAL, deptno FROM emp 
WHERE SAL >ANY(SELECT min(SAL)  FROM emp GROUP BY job) ;
~~~

-----------------------------------------------------------------------
### 업무별 최대급여 보다 많거나 똑같이 받는사람.

~~~ SQL
SELECT job, max(SAL)  FROM emp GROUP BY job;

SELECT empno, ename, SAL, deptno 
FROM emp 
WHERE SAL>=1300 
    or SAL>1600 
    or SAL>5000 
    or SAL>2975 
    or SAL> 3000;

SELECT empno, ename, SAL, deptno 
FROM emp 
WHERE SAL>= all( SELECT  max(SAL)  FROM emp GROUP BY job ) ;
-- SELECT에서 job을 빼야...
~~~
-----------------------------------------------------------------------------




## 다중열!!	(다중열을 기준으로) 


ex) 밀러의 데이터를 수정한다.
~~~ SQL
UPDATE emp set SAL=1500, comm=300
WHERE ename='MILLER';

UPDATE emp set SAL=1300, comm = null
WHERE ename='MILLER';
~~~


-------------------------------------------------------------------------------------
ex)  급여와 보너스가 30번 부서에 있는 직원의 
급여와 보너스가 같은 직원에 대해 사번, 이름, 부서번호, 급여,보너스 조회

#### 30번부서 사람
~~~ SQL
SELECT empno, ename, deptno, SAL, comm FROM emp WHERE deptno=30;
~~~

#### '30번부서의 급여'와 급여가 같은 사람들.
~~~ SQL
SELECT empno, ename, deptno, SAL, comm FROM emp 
WHERE SAL in(SELECT SAL FROM emp WHERE deptno=30) ;
~~~


### SELECT 
~~~ SQL
SELECT empno, ename, deptno, SAL, comm FROM emp 
WHERE  SAL in(SELECT SAL FROM emp WHERE deptno=30)  
AND comm in (SELECT comm FROM emp WHERE deptno=30) ;
~~~
- 밀러가 나오면 안된다.
- 그리고 30번부서 6명이 모두 나와야한다.
- 왜 이런 잘못된 결과가 나왔을까?
- 각각 따로따로 비교했을때 같은사람이 있음.. (동시에 같은사람을 찾기 위해선 어떻게 해야할까?) 
- 비교인자를 다중열로 설정해야한다.

~~~ SQL
SELECT empno, ename, deptno, SAL, comm FROM emp 
WHERE  (SAL,comm)  in (SELECT SAL, comm FROM emp WHERE deptno=30) ;

-- 이렇게 묶고 싶은 열을 괄호로 묶어주면 끝..
-- 2마리 빠졌는데 얘들은 comm이 null 값이기 때문, is null 을 통해서 null을 0로 만들어주고 계산하자.

~~~

---------------------------------------------------------------
ex) 적어도 한명의 직원으로부터 보고를 받을 수 있는 직원의 이름, 업무, 입사일자, 급여를 조회
-- 밑에 부사수가 한명이라도 있는 사람들 MGR(메니져) 

1. 명단의 사람들의 메니져 사원번호를 검색한다.
2. 해당 사원번호의 사람을 출력한다.


~~~ SQL
SELECT MGR 
FROM emp 
GROUP BY MGR;

SELECT distinct mgr FROM emp;	

        MGR
-----------------
        7839
        7782
        7698
        7902
        7566
        7788
~~~

~~~ SQL
SELECT ename, job, hiredate, SAL, MGR 
FROM emp
WHERE empno in(7839,7782,7698,7902,7566,7788) ;

SELECT ename, job, hiredate, SAL, MGR 
FROM emp e
WHERE EXISTS ( SELECT * FROM emp WHERE e.empno=mgr) ;
-- 이런선택도 가능하다.
-- 불필요하게 어렵다.
-- 외부커리와 내부커리에 별개의 emp가 생기기때문에 별명으로 구분해준다.
-- 될수있으면 상관서브커리는 사용하지 않는편이 좋다.
~~~

