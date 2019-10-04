SELECT 
=======

1) 기능  
    검색, 조회를 위한 기능.
2) 기본 문법
    1. 조회 권한부여

    ~~~ SQL
    SELECT 필드명, FROM[소유자].테이블명
    SELECT empno, ename, mgr,comm FROM emp;
    //조회 권한 부여
    ///관리자 계정으로  scott의 테이블조회 권한 부여
    GRANT SELECT on scott.emp to hr;
    ~~~ 
        
    ~~~ SQL
    SELECT * FROM 테이블명
    ~~~

    - 필드의 가공처리가 가능하다.
    - 필드가 있는그대로 검색만 하는게 아니라 변형해서 사용할 수 있다.
  
    ex)  사원의 사번, 이름, 급여를 조회하세요.  
    단, 급여는 현재 급여에 100$를 추가하여 조회하시오.
    ~~~ sql
    //기존 셀러리에서 100추가한 값을 함께 조회함.
    SELECT empno, ename, sal, sal+100 FROM emp;
    ~~~

    2. ALIAS : 별명
    - 필드에 alias(별명)  부여 가능.
    - 별명에 공백이나 특수문자가 있으면 ""로 묶자.
    - 필드명 별명 or 필드명 "별명"
    - 필드명 as 별명  or 필드명 as "별명"  

    ~~~
    SELECT empno 사번, ename 이름, sal,sal+100 as"100$인상된 급여" FROM emp;
    ~~~

    3. DISTINCT : 중복값 제거

    ~~~ SQL
    /* 이렇게 필드 앞에 쓰세요 */
    SELECT DISTINCT JON FROM EMP;
    ~~~ 	



3) 확장 문법

    1.  **ORDER BY** 
          
        필드명 여러개 입력가능.  
        **ASC**  오름(기본값)  
        **DESC** 내림   
        쿼리조회가 끝난뒤에 최종적으로 정렬이 된다.
            
        2차정렬 3차정렬 가능.  
        (급여가 같은사람중에서 이름을 알파벳순서로 정렬 등등..) 

        ~~~ sql
        ORDER BY 필드명, 필드명 [ASC|DESC]
        ~~~
        EX)  급여가 많은 순으로 사번, 이름, 급여를 조회하시오.
        ~~~ SQL
        SELECT empno, ename, sal FROM emp ORDER BY sal DESC;
        ~~~ 


        EX)  부서별로 급여가 적은 순으로 이름, 급여, 부서코드를 조회
        - 1차기준: 부서(deptno)
        - 2차기준: 급여(sql)

        ~~~ sql
        SELECT ename, sal, deptno 
        FROM emp 
        ORDER BY deptno ASC, sal ASC;
        ~~~ 



    2. **WHERE**

        ~~~ sql
        WHERE 조건식 (필드명 연산자 값)
        ~~~
        - 필드명이 왼쪽에 온다.
        - 기본 연산자 : >, <, >=, <=, =,(!=,<>,^=) 
        - 논리 연산자 : AND, or, not
        - SQL 연산자 : between A AND B, in, is NULL, like

        - like wild card
            - % : 0개 이상의 문자를 대체
            - _ : 1개의 문자를 대체
            - _의 자리에 반드시 글자가 와야한다.
            - ex)  beau% : beau, beaut, beauti, beautif...
            be_u_: beaut, bebub, ...

            - %L  : L로 끝난다
            - L%  :	L로 시작한다
            - %L% : L이 들어간다.
    -----------------------------
    EX1)  급여가 3000$이상인 직원의 사번, 이름, 급여를 조회하시오  
    (단 급여가 많은순으로 정렬) 
    
    ~~~ sql
    SELECT empno, ename, sal FROM emp 
    WHERE sal>= 3000 
    ORDER BY sal ASC;
    ~~~ 

    EX2)  업무가 메니져인 사원의 이름, 부서, 업무, 급여를 조회.
    ~~~ sql
    SELECT EMPNO, DEPTNO, JON, SAL 
    FROM EMP 
    WHERE JOB = 'MANAGER';
    ~~~ 
    - 저장된값은 대소문자를 구분한다.
    - SQL은 쌍따옴표를 쓰지 않고 홑따옴표만 사용한다.

    EX3)  1982년 1월 1일 이후에 입사한 직원의 이름, 부서 , 입사일자 조회.
    ~~~ sql
    SELECT ename,deptno,hiredate 
    FROM emp 
    WHERE hiredate>'1982/1/1'
    ~~~ 
    SQL에서 날짜는 문자로 캐스팅된다.
    

    EX4)  부서가 20이고 업무가 analyst인 직원의 이름, 부서, 입사일자 조회

    ~~~ sql
    SELECT ename, deptno, hiredate 
    FROM emp 
    WHERE deptno=20 
        AND job='ANALYST'
    ~~~ 

    
      


    3. **BEWEEN**

    AND 조건이 이상 이하 일때만 사용가능하다

    --------------------------------------------------
    Ex) 급여가 1500이상 2500이하를 받는 직원의 이름, 부서 업무 급여를 조회하라.
    ~~~ sql
    SELECT ename, deptno, job, sal, 
    FROM emp 
    WHERE sal>='1500' 
        AND sal<='2500'; 

    SELECT ename, deptno, job, sal 
    FROM emp
    WHERE sal between 1500 AND 2500;
    ~~~ 

      
      
    

    4. **IN**

    'or 조건'과 '같다'라는 조건에서만 사용가능하다.

    -------------------------------------------------
    Ex) 업무가 clerk, salesman, analyst인 직원의 이름, 부서, 업무를 조회.
        
    ~~~ sql
    SELECT ename, deptno, job FROM emp 
    WHERE job ='CLERK' 
        OR job ='SALESMAN' 
        OR job = 'ANALYST'; 

    SELECT ename, deptno, job FROM emp 
    WHERE job IN('CLERK','SALESMAN','ANALYST');
    ~~~ 


    Ex)  직원의 사번, 이름, 부서, 업무, 급여, 보너스를 조회하라.

    ~~~ sql
    SELECT empno, ename, deptno, job, sal, comm 
    FROM emp;  
    ~~~ 
      
      

    5.  **IS NULL**

    - NULL은 값이 아니기때문에 =연산자로 사용할 수 없다.

    -----
    Ex)  보너스를 받지 못하는 직원의 이름, 부서, 업무 급여 보너스 조회

    ~~~ sql
    SELECT ename, deptno, job, sal, comm 
    FROM emp  
    WHERE comm IS NULL; 
    ~~~ 
    ~~~ sql
    SELECT ename, deptno, job, sal, comm 
    FROM emp  
    WHERE job != 'SALESMAN';

    SELECT ename, deptno, job, sal, comm 
    FROM emp 
    WHERE NOT (job = 'SALESMAN');

    SELECT ename, deptno, job, sal, comm 
    FROM emp  
    WHERE comm IS NOT NULL;
    ~~~ 
        
    Ex)  이름이 S로 시작되는 직원의 이름, 업무, 급여를 조회해라.
    
    ~~~ sql
    /* like는 문자만 사용가능하다.*/
    SELECT ename, job, sal
    FROM emp 
    WHERE ename like 'S%';  
    ~~~ 

    6. **WHEN**

    조건문이라고 생각하면 쉬움.

    Ex) 봉급이 3000만원 미만이면 가입가능한 금융상품 대상자.
    ~~~ sql
    SELECT 
    CASE 
        WHEN sal < 3000 TEHN '가능'         
        WEHN sal > 3000 THEN '불가능' 
    END 'JOIN_YN'
    FROM EMP
    ~~~


### 직계함수?

- 매치가 되어야 한다.
- WHERE절은 하나하나 집어서 순서대로 처리한다.
- WHERE절과 함께 사용할수 없다. 
- 사용하는 타이밍의 순서가 맞아야한다.
- 얘는 묶어서 처리한다.
- 여러개의 레코드를 한번에 묶어서 사용한다.
- 조건이 처리된다음에 실행되어야한다.


### GROUP BY 시점
시점에 따른 성능차이를 비교해보자.

~~~ sql
SELECT job, sum(sal)  
FROM emp 
GROUP BY job 
HAVING sum(sal) >5000 
    AND job!='SALESMAN';
~~~ 
- 데이터를 다들고온뒤 솎아내는 방식으로 효율이 떨어진다.

~~~ sql
SELECT job, sum(sal) 
FROM emp 
WHERE job<>'SALESEMAN' 
GROUP BY job 
HAVING sum(sal) > 5000;
~~~ 
- 필터링을해서 들고온다, 성능차이가 발생한다.
- 미리 걸러버린 다음에 그룹으로 묶어버린다.




### 계층쿼리

1. START WITH 절   
    계층 구조의 데이터를 읽어나가는데 있어 시작점을 지정합니다.

2. CONNECT BY   
CONNECT BY 절은 다음에 읽을 자식 데이터를 지정한다.   
즉 CONNECT BY 절의 조건을 만족하는 데이터를 읽어나갑니다.

    - CONNECT BY  **'PRIOR 자식컬럼 = 부모컬럼'** 형태   
    계층 구조의 데이터를 **부모->자식** 방향으로 내려가는 순방향 조회를 합니다.

    - CONNECT BY 절의 조건식에 **'PRIOR 부모컬럼 = 자식컬럼'** 형태  
    계층 구조의 데이터를 **자식->부모** 방향으로 올라가는 역방향 조회를 합니다.

3. NOCYCLE   
데이터를 읽어가면서 이미 조회했던 동일한 데이터를 다시 읽게 될 경우 CYCLE(사이클)이 형성되었다고 하는데 NOCYCLE 을 명시할 경우 사이클이 발생한 이후의 데이터는 읽지 않습니다.

4. ORDER SIBLINGS BY   
 ORDER BY 와 다르게 형제(SIBLINGS) 노드   
 즉, 동일한 LEVEL의 데이터 사이에서 정렬을 합니다.


~~~ SQL
SELECT 컬럼명, ......
FROM 테이블
WHERE ......
START WITH condition
CONNECT BY [NOCYCLE] condition AND condition
[ORDER SIBLINGS BY 컬럼명, ......]
~~~


## LISTAGG
- 다건 조회 결과를 한 줄로 표현하고 싶을때.

~~~ SQL
SELECT st_food, LISTAGG(st_kind,',') WITHIN GROUP(ORDER BY st_key) AS st_kind
FROM sample_table
GROUP BY st_food;
~~~







### 쿼리 실행 순서
SELECT문 실행순서, 오라클기준.


### 1. FROM table [alias]

FROM 절에 사용된 테이블을 인식하여 데이터 딕셔너리에서 관련된 정보들을 파악

### 2. [WHERE condition(s)]

 WHERE절에서 조건에 맞는 데이터를 추출

 

### 3. [GROUP BY column(s)]

GROUP BY절이 추가되면 GROUP BY절에 사용된 항목별로 데이터의 정렬이 일어남

 

### 4. [HAVING condition(s)]

HAVING 절은 GROUP BY절로 정렬이 된 데이터를 대상으로 조건을 정의.

 

### 5. SELECT {*, column(s) [alias],...}

- 대부분의 RDBMS가 ROW(로우)기준 저장구조입니다. 
- SELECT이전까지 원하지 않는 칼럼까지도 데이터베이스의 메모리에 저장.

 

### 6. [ORDER BY column(s) [alias] [DESC],.....];

- ORDER BY절이 가장 나중에 실행.

- SELECT절에서 선택되지 않은 칼럼이나 연산도 데이터베이스의 메모리에 저장되어있으므로 ORDER BY절에서 사용

 

 

 

### 요약

1. FROM 절에서 테이블의 목록을 가져옴
2. WHERE 절에서 검색 조건에 불일치 하는 행 제외
3. GROUP BY 절에서 명시된 행의 값을 그룹화
4. HAVING 절이 GROUP BY 절의 결과 행 중 검색 조건에 불일치 하는 행  제외
5. SELECT 절에서 명시된 열을 정리 
6. ORDER BY 절에서 열을 기준으로 출력할 대상을 정렬 후 출력


 

 

 
# 데이터 마이닝

- 같은데이터로 많이 생각할 것
- 데이터 마이닝(data mining)은 대규모로 저장된 데이터 안에서 체계적이고 자동적으로 통계적 규칙이나 패턴을 찾아 내는 것이다
 

