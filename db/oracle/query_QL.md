


### SELECT 
1) 기능
    - 검색, 조회를 위한 기능.
2) 기본 문법

    ### 조회 권한부여
~~~
    select 필드명, from[소유자].테이블명
    select empno, ename, mgr,comm FROM emp;
    //조회 권한 부여
    ///관리자 계정으로  scott의 테이블조회 권한 부여
    grant select on scott.emp to hr;
~~~ 
    
~~~
select*from 테이블명
~~~

- 필드의 가공처리가 가능하다.
- 필드가 있는그대로 검색만 하는게 아니라 변형해서 사용할 수 있다.
  
    ex)  사원의 사번, 이름, 급여를 조회하세요
    단, 급여는 현재 급여에 100$를 추가하여 조회하시오.
~~~
//기존 셀러리에서 100추가한 값을 함께 조회함.
SELECT empno, ename, sal,sal+100 FROM emp;
~~~

### alias
- 필드에 alias(별명)  부여 가능.
- 원래 필드명대신에 부연설명을 가능함 다른이름으로~~~ (좀더 직관적으로 이해하기 쉬운이름) 
~~~
//별명에 공백이나 특수문자가 있으면 ""로 묶자.
//필드명 별명   or   필드명 "별명"
//필드명 as 별명  or 필드명 as "별명"  

SELECT empno 사번, ename 이름, sal,sal+100 as"100$인상된 급여" FROM emp;
~~~

### 중복된 값 제거

~~~ 
//기본값 여기에서... 
select job FROM emp;

//이렇게 필드 앞에 쓰세요
select distinct job FROM emp;
~~~ 	



3) 확장 문법

    - 정렬 기능.
        ~~~
        ORDER BY 필드명[, 필드명] [ASC|DESC]
        //필드명 여러개 입력가능. ASC:오름(기본값) ,DESC :내림]
        ~~~
        ------------
        EX)  급여가 많은 순으로 사번, 이름, 급여를 조회하시오.	(기본문법+ 확장문법) 
        ~~~ 
        sqlplus SELECT empno, ename, sal FROM emp ORDER BY sal DESC;
        ~~~ 
    
    
        +2차정렬 3차정렬 가능.
        (급여가 같은사람중에서 이름을 알파벳순서로 정렬 등등..) 

            EX)  부서별로 급여가 적은 순으로 이름, 급여, 부서코드를 조회
            

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



#### 순서에서 정렬은 항상 마지막에 들어간다.


### 연산 순서

### 직계함수?

-매치가 되어야 한다.
-where절은 하나하나 집어서 순서대로 처리한다.
-where절과 함께 사용할수 없다. 
-사용하는 타이밍의 순서가 맞아야한다.
-얘는 묶어서 처리한다.
-여러개의 레코드를 한번에 묶어서 사용한다.
-조건이 처리된다음에 실행되어야한다.


### 순서.
1.데이터가지고온다.
2,조건식을 비교한다.
3.그룹처리한다.
4.그룹처리후 조건식
5.오더바이 정렬
6.select에 의해 조회. 출력.


~~~ 
select job, sum(sal)  from emp group by job having sum(sal) >5000 and job!='SALESMAN';
~~~ 
- 데이터를 다들고온뒤 솎아낸다..
- 일반적으로 효율이 떨어진다.

~~~ 
select job, sum(sal)  from emp where job<>'SALESEMAN' group by job having sum(sal) >5000;
~~~ 
- 필터링을해서 들고온다, 성능차이가 발생한다.
- 미리 걸러버린다음에 그룹으로 묶어버린다.
