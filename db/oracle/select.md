


### SELECT 
1) 검색, 조회를 위한 기능.
2) 기본 문법


    ### 권한부여(조회) 
~~~
    select 필드명, from[소유자].테이블명
    select empno, ename, mgr,comm FROM emp;
~~~ 
        
- 다른 사용자가 scott의 테이블조회가 가능할까?~~~ 
-  서로 다른 사용자끼리는 접근이 안된다.
-  관리자가 허락해줘야한다.
-  관리자는 된다.
~~~ 
//조회 권한 부여
grant select on scott.emp to hr;
~~~ 		
    

    <모든필드를 다 일일이 적어서 조회가능하게 하면 귀찮이니까 이렇게하셈~~~ 
    select*from 테이블명


    필드의 가공처리가 가능하다.
    - 필드가 있는그대로 검색만 하는게 아니라 변형해서 사용할 수 있다.
    -----------------------------------------------------------------------------
    ex)  사원의 사번, 이름, 급여를 조회하세요
    단, 급여는 현재 급여에 100$를 추가하여 조회하시오.

    SELECT empno, ename, sal,sal+100 FROM emp;
    //기존 셀러리에서 100추가한 값을 함께 조회함.


    ### 필드에 alias(별명)  부여 가능.
    - 원래 필드명대신에 부연설명을 가능함 다른이름으로~~~ (좀더 직관적으로 이해하기 쉬운이름) 
    -------------------------------------------------------------------------------
    필드명 별명   or   필드명 "별명"
    필드명 as 별명  or 필드명 as "별명"   //별명에 공백이나 특수문자가 있으면 ""로 묶자.

    SELECT empno 사번, ename 이름, sal,sal+100 as"100$인상된 급여" FROM emp;


    ### 중복된 값 제거가능
    ------------------------------------------------------------------------------
    기본값 여기에서... ~~~ select job FROM emp;~~~ 
    ~~~ select distinct job FROM emp;~~~ 	//이렇게 필드 앞에 쓰세요



3) 확장 문법

    - 정렬 기능.
        ORDER BY 필드명[, 필드명] [ASC|DESC]
        //필드명 여러개 입력가능. ASC:오름(기본값) ,DESC :내림]
        ------------------------------------------------------------------------
        EX)  급여가 많은 순으로 사번, 이름, 급여를 조회하시오.	(기본문법+ 확장문법) 
        ~~~ 
        sqlplus SELECT empno, ename, sal FROM emp ORDER BY sal DESC;
        ~~~ 
    
    
        +2차정렬 3차정렬 가능.
        (급여가 같은사람중에서 이름을 알파벳순서로 정렬 등등..) 

        EX)  부서별로 급여가 적은 순으로 이름, 급여, 부서코드를 조회
        - 부서별로 누가 원급을 많이 받아먹나, 누굴 잘라야하나.ㅋㅋ.... 슬프다

        1차기준: 부서
        2차기준: 급여

        ~~~ 
        sqlplus SELECT ename, sal, deptno FROM emp ORDER BY deptno ASC, sal ASC;
        ~~~ 



    - 조건 기능(레코드 필터링) 
        Where 조건식(필드명 연산자 값)  //필드명이 왼쪽에 와야함.
        - 기본 연산자 : >, <, >=, <=, =,(!=,<>,^=) 
        - 논리 연산자 : and, or, not
        - SQL 연산자. : between A and B, in, is null, like

        like wild card
        - %: 0개 이상의 문자를 대체
        - _: 1개의 문자를 대체
        ex)  beau% : beau, beaut, beauti, beautif...
            be_u_: beaut, bebub, ...
            (_의 자리에 반드시 글자가 와야한다.) 

        ex)  %L	(앞은 모르겠고 뒤는 L로 끝난다) 
            L%	(앞은 L로 시작하지만 뒤는 모른다) 
            %L%	(앞뒤에 뭐가 있는지는 모르지만 L이 들어간다) 

    --------
        EX1)  급여가 3000$이상인 직원의 사번, 이름, 급여를 조회하시오
            (단 급여가 많은순으로 정렬) 
    
    ~~~ 
        select empno, ename, sal FROM emp 
        WHERE sal>= 3000 
        ORDER BY sal ASC;
    ~~~ 

        Q) 조건먼저? 정렬먼저?
        - 가장 마지막에 작성되는건 언제나 정렬.
        
        EX2)  업무가 메니져인 사원의 이름, 부서, 업무, 급여를 조회.

~~~ 
sqlplus select empno, deptno,job,sal from emp WHERE job='MANAGER';
~~~ 
- 저장된값은 대소문자를 가린다.
- SQL은 쌍따옴표를 쓰지 않고 홑따옴표만사용한다.



    EX3)  1982년 1월 1일 이후에 입사한 직원의 이름, 부서 , 입사일자 조회.
~~~ 
sqlplus  select ename,deptno,hiredate from emp where hiredate>'1982/1/1';
~~~ 
        -  SQL에서 날짜는 문자로 캐스팅된다.
    

EX4)  부서가 20이고 업무가 analyst인 직원의 이름, 부서, 입사일자 조회

        ~~~  
        sqlplus select ename, deptno, hiredate from emp where deptno=20 and job='ANALYST'; 
        ~~~ 




#### 용어
- 필드<레코드<테이블<DB<DataBank

- 필드[열,column,속성] : 같은 형식의 데이터를 묶어서 관리한다.
    - 데이터베이스 관점에서 쪼갤 수 없는 최소의 단위
    - 데이터는 행으로 묶여야한다.(홍길동이란 정보를 이름, 주소, 번호 등등 이런식..) 
    - 레코드(튜플)  필드를 묶어서 관련있는것을 묶어놓았다
    
- 레코드 : 한 줄, 필드의 모음
- 테이블 : 레코드의 모음
    - 테이블에서 데이터 몇개냐고 하면 레코드 단위로 말한다.


    ----------------------------------------------------------------------------

## between
and 조건이 이상 이하 일때만 사용가능.

    Ex) 급여가 1500이상 2500이하를 받는 직원의 이름, 부서 업무 급여를 조회하라.
~~~ 
sqlplus  select ename, deptno, job, sal, from emp 
where sal>='1500' and sal<='2500'; 
~~~ 

~~~ 
select ename, deptno, job, sal from emp
where sal between 1500 and 2500;
~~~ 


    

## in
'or 조건'과 '같다'라는 조건에서만 사용가능하다.

        Ex) 업무가 clerk, salesman, analyst인 직원의 이름, 부서, 업무를 조회.
    
~~~ 
sqlplus select ename, deptno, job from emp 
where job='CLERK' or job='SALESMAN' or job = 'ANALYST'; 

sqlplus select ename, deptno, job from emp 
where job in('CLERK','SALESMAN','ANALYST') ;
~~~ 


    Ex)  직원의 사번, 이름, 부서, 업무, 급여, 보너스를 조회하라.
~~~ 
sqlplus select empno, ename, deptno, job, sal, comm from emp;  
~~~ 

- 같은 데이터로 많은 생각이라.. 데이터 마이닝?-

- DB에서의 Null : 값이 없다는걸 표시하는값. - 


##  is null(조건에서의 ) 
    Ex)  보너스를 받지 못하는 직원의 이름, 부서, 업무 급여 보너스 조회
- null값을 조회하자.

~~~  
sqlplus select ename, deptno, job, sal, comm from emp  
where comm is null; 
~~~ 
- null은 값이 아니기때문에 =연산자로 사용할 수 없다.
~~~ 
sqlplus select ename, deptno, job, sal, comm from emp  
where job != 'SALESMAN';

sqlplus select ename, deptno, job, sal, comm from emp 
    where not(job = 'SALESMAN');

sqlplus select ename, deptno, job, sal, comm from emp  
where comm is not null;
~~~ 

-  반대로 커미션을 받는사람만..

    
Ex)  이름이 s로 시작되는 직원의 이름, 업무, 급여를 조회해라.
~~~ 
    select ename, job, sal from emp where ename like 'S%';  
~~~ 
- like는 문자만 사용가능하다.







### 순서에서 정렬은 항상 마지막에 들어간다.
