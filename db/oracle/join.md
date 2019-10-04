JOIN
======

서로 다른 테이블간에 설정된 관계가 결합하여 1개 이상의 테이블에서 데이터를 조회하기 위해 사용 됩니다.   
이 때 테이블간의 상호 연결을 조인이라고 하는데요.   
각각의 테이블에 분리된 연관성 있는 데이터를 연결하거나 조합해야 하는데 이러한 일련의 작업들을 조인이라고 합니다.  


1) 종류 
- **Cartesian Product JOIN** (데카르트 곱 조인) 
- **EQUI JOIN**
    - 공통 필드의 레코드를 가져오는 방법.	
    - (중복된것을 가져오는것) 
    - Inner JOIN(Natural JOIN)  			
    - (중복된것을 빼고 가지고온다.) 

- **NON EQUI JOIN**
    - 공통필드가 없을 경우,공통되지 않은 레코드를 가져오는 방법	
    - OUTER JOIN
        - Inner JOIN의 확장이다.
        - Inner JOIN+공통되지 않은 레코드도 가져온다.
    - OUTER JOIN의 종류
        - Left OUTER JOIN	
            - (공통되는것일단가지고옴, 나머지 공통안된것 왼쪽걸 가지고옴) 
        - RIGHT OUTER JOIN
            - (공통된것 가지고옴,나머지 공통되지 않은것 오른쪽걸 가지고옴) 
        - Full OUTER JOIN
            - (왼쪽,오른쪽 둘다 가지고온다) 

        - Self JOIN
        - ANSI 조인
        - 크로스 조인 ( Cross JOIN )
        - 안티 조인 ( Anti JOIN )
        - 세미 조인 ( Semi JOIN )
---------------------------------------------------------

Ex)  uesr1에 테이블 생성하기
~~~ sql
CREATE TABLE tblA(
    id	    number null,		/*null을 넣어도 된다는 default 설정 있음*/
    value	number not null
);


CREATE TABLE tblB(
    id  	number,
    value	number
);


CREATE TABLE tblC(
    id	    number,
    value	number
);		


/*tblA*/
INSERT INTO tblA VALUES(1,10) ;
INSERT INTO tblA VALUES(2,20) ;
INSERT INTO tblA VALUES(3,30) ;
INSERT INTO tblA VALUES(5,50) ;
INSERT INTO tblA VALUES(7,70) ;
/*tblB*/
INSERT INTO tblB VALUES(1,10) ;
INSERT INTO tblB VALUES(2,20) ;
INSERT INTO tblB VALUES(4,40) ;
INSERT INTO tblB VALUES(5,50) ;
INSERT INTO tblB VALUES(8,80) ;
/*tblC*/
INSERT INTO tblC VALUES(1,10) ;
INSERT INTO tblC VALUES(2,20) ;
INSERT INTO tblC VALUES(7,70) ;
INSERT INTO tblC VALUES(8,80) ;
INSERT INTO tblC VALUES(9,90) ;



ID   |  VALUE
---------- ----------
1|10
2|20
3|30
5|50
7|70
~~~
-------------------------------------------------------


## 1. INNER JOIN

~~~ sql
/*INNER JOIN이 기본값이다. 생략가능*/
SELECT id, value 
FROM tblA  JOIN tblB		
ON tblA.id=tblB.id;			/*A,B 중 같은걸 가지고 오겠다.*/
~~~
~~~ sql
/*두 테이블의 공통된 필드값만 가지고오는것이 INNER JOIN*/
/* ERRO 필드값이 같아서 '열의정의가 애매합니다'*/
/* 콕 집어서 명시해줘야한다.*/
SELECT tblA.id, tblB.value 
FROM tblA A INNER JOIN tblB B
ON A.id = B.id;				
/*별명을 줘서 간결하게 처리.*/
/*별명을 주면 테이블명을 사용못함, 별명만씀*/
~~~

~~~ sql
/* PL-SQL 방식으로 바꿔보자.(오라클 방식)  */
/*inner JOIN 생략, ON대신 WHERE*/
SELECT tblA.id, tblB.value 
FROM tblA a, tblB b
WHERE tblA.id = tblB.id;
~~~

----------------------------------------------
ex) 직원의 사번, 이름, 업무, 부서번호, 부서명을 조회하세요.

- 보조테이블 : DEPT
    - 공통 필드 : DEPTNO
    - 요구 필드 : DNAME


#### step.1 베이스필드
~~~ sql
/*공통필드 : dept*/
SELECT empno, ename, job, deptno  
FROM emp;
~~~


#### step.2 조인으로 컬럼추가.
~~~ sql
/* 추가필드 dname */
SELECT empno, ename, job, emp.deptno, dname
FROM emp INNER JOIN dept
ON emp.deptno = dept.deptno;
~~~

- 데카르트곱 조인(하나가 여러개의 값과 연산한다.) 
- 조건이 생략되었을경우.



ex) 직원의 사번, 이름, 업무, 부서번호, 부서명을 조회하세요
단 SALES만 조회.

~~~ sql
/* STYLE1 조인 + 조건문*/
SELECT empno, ename, job, emp.deptno, dname
FROM emp INNER JOIN dept
ON emp.deptno = dept.deptno	
AND emp.job='SALESMAN';

/* STYLE2 조인 + 조건문*/
/*경우에따라서 다른결과가 나올 수 있다*/
/*추가조건일 경우에는 WHERE로 추가 할 수 있다.*/
SELECT empno, ename, job, emp.deptno, dname
FROM emp INNER JOIN dept
ON emp.deptno = dept.deptno	
WHERE emp.job='SALESMAN';
~~~


#### 3개의 테이블 조인하기


1) 표준방법

~~~ sql
SELECT tblA.id, tblA.value
FROM tblA INNER JOIN tblB
ON tblA.id=tblB.id			/*이너조인은 한번에 2개까지밖에 안된다.*/
JOIN tblC			        /*결과값 1,2,5에 대해 다시 C와 조인한다.*/
ON tblB.id=tblC.id;
~~~

2) 비표준방법 (오라클st) 
~~~ sql
/*더 간결해졌다.*/
SELECT tblA.id, tblA.value
FROM tblA ,tblB,tblC
WHERE tblA.id=tblB.id 
AND tblB.id = tblC.id;
~~~
-------------------------------------------  

## 2. OUTER JOIN

### 2.1 LEFT
1) 표준		
~~~ sql
SELECT tblA.id, tblB.value
FROM tblA LEFT OUTER JOIN tblB
ON tblA.id=tblB.id;
~~~

2) 비표준	(오라클st 레프트 아웃터)
~~~ sql
SELECT tblA.id, tblB.value
FROM tblA, tblB
WHERE tblA.id=tblB.id(+) ;
~~~


### 2.2 RIGHT

1) 표준		
~~~ sql
SELECT tblA.id, tblB.value
FROM tblA RIGHT OUTER JOIN tblB
ON tblA.id=tblB.id;
~~~


2) 비표준	(오라클st RIGHT 아웃터) 
~~~ sql
SELECT tblA.id, tblB.value
FROM tblA, tblB
WHERE tblA.id(+) =tblB.id;
~~~


###  2.3 FULL

1) 표준		
~~~ sql
SELECT tblA.id, tblB.value
FROM tblA full OUTER JOIN tblB
ON tblA.id=tblB.id;
~~~


2) 비표준	(오라클st ) 
FUllOUTER를 지원하지 않는다.


ex) 이름, 급여, 부서명,근무지를 조회하시오
단, 부서명과 근무지는 모두 출력할 수 있도록 하시오.
~~~ sql
SELECT ename, sal, dname,loc
FROM emp RIGHT OUTER JOIN dept
ON emp.deptno = dept.deptno;
~~~


-------------------------------------------

### 3. NON-EQL JOIN	
공통된 필드가 없는상태에서 JOIN하는 방법

ex)  직원의 사번, 이름, 급여, 급여등급을 조회.
~~~ sql
SELECT empno, ename, sal, grade, losal, hisal
FROM emp INNER JOIN salgrade
ON sal>=losal AND sal <= hisal;
~~~

-----------
### 4. SELF JOIN	  
자신을 복사해서 조인한다.   
셀프조인은 이름의 구분해줘야하기 때문에 별명을 준다.  

ex)  직원의 사번, 이름, 업무, 직속상사 사번, 직속상사 이름을 조회
~~~ sql
SELECT e1.empno, e1.ename, e1.job, e1.mgr, e2.ename
FROM emp e1 INNER JOIN emp e2
ON e1.mgr = e2.empno;
~~~

-----------------------------------------------------------------

### 5. SET 연산자 집합.
- 잘 안쓰는 방법
- 조인은 합친다음 컴파일해서 결과를 가지고온다.
- 각각의 테이블을 컴파일해서 실행한다. 
- 그렇게 나온 결과를 합친다.
- UNION		합집합	(중복 불포함) 
- UNION ALL	중복 포함
- INTERSECT	교집합.	
- MINUS		차집합.

-------------------------------------------------------------------
ex)  --필드는 같은 형식이어야한다.--
~~~ sql
SELECT deptno FROM dept
UNION
SELECT deptno FROM emp;

SELECT deptno FROM dept
UNION ALL
SELECT deptno FROM emp;

SELECT deptno FROM dept
INTERSECT
SELECT deptno FROM emp;

SELECT deptno FROM dept
MINUS
SELECT deptno FROM emp;

~~~