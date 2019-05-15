#  DML
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


### 예제
- 사용자 추가 : 
~~~
user1(connect, resource 권한 부여) 
~~~
- 테이블 작성 : 
~~~
create table tbltest(
    id		number,
    name		varchar2(10),
    hiredate	date
    ) ;
~~~


- 데이터
~~~
insert into tbltest(id, name, hiredate)  values(1, '홍길동',sysdate) ;
insert into tbltest(id, name)  values(2,'임꺽정') ;
insert into tbltest(id, name, hiredate)  values(3, '김유신',null) ;
insert into tbltest values(4, '신돌석','2017/2/5') ;
~~~

- update
~~~
update tbltest
set hiredate=sysdate
where id=2;
~~~

----


4) SubQuery
    - order by는 맨 마지막에 실행되어야하기 때문에..
    1) 다른 query문에 포함된 query
    2) 반드시 () 를 사용해야한다.
    3) 연산자의 오른쪽에 와야한다.
    4) order by를 사용할 수 없다.
    5) 종류
        - SubQuery
        - 상관 SubQuery 
        (상관 SubQuery:외부쿼리가 먼저 실행되어 결과값을 리턴해서 안쪽에 있는 쿼리가 실행되고 
        그 결과를 다시 리턴받아서 외부쿼리가 실행된다, 즉 3번의 실행) 
        (서브쿼리를 복사해서 실행했을때 안되면 상관서브쿼리다. 연결되어있기때문에 독립적사용못함) 

    6) 유형
        - 단일행
        - 다중행
        - 다중열

    7) 연산자
        - 단일행
          -  =,<, >, >=, <=, -, <>,...
        - 다중행
            in	//=
            any	//or의미 , <=,>,< 등 적용가능
            all
            exists	//해당연산자가 존재하는지 확인한다.
            not

--------------------------------------------------------------
####  ex) Scott의 급여보다 더 많이 받는 직원의 이름,업무, 급여를 조회.
1. 스캇이 얼마 받는지?
~~~
select sal from emp where ename='Scott';
 - 3000	   
~~~
   
2. 3000보다 많이 받는사람은?
~~~
select ename sal from emp where sal>3000;
~~~
    
    # 이렇게 중첩된 쿼리를 '서브쿼리' 라한다.
    select ename sal from emp where sal>(select sal from emp where ename='Scott') 	
    - 서브쿼리가 먼저실행된다.
    - 결과값을 리턴받아 다른 쿼리가 실행된다.


----------------------------------------------------------
    ex)  사번이 7521의 업무와 같고, 급여가 7934보다 많은직원의 사번, 이름 업무, 급여를 조회
~~~
select empno, ename, job,sal from emp where empno=7521;	//salesman;

select empno, ename, job,sal from emp where empno=7934	//sal 1300;

select empno, ename, job,sal from emp where job='SALESMAN'and sal>1300;

select empno, ename, job,sal from emp 
where job=(select  job from emp where empno=7521) 	
and sal>(select sal from emp where empno=7934) ;
~~~


    

서브쿼리만 실행했을때 결과값으로 나오는 레코드의 갯수
- 이게 유형으로 정리된다.
- 단일행.



------------------------------------------------------------------------------
ex) 업부별로 최소급여를 받는 직원의 사번, 이름, 급여, 부서번호 조회
//업무별 최소급여를 받는사람을 뽑고 그중에서 가장 적은 급여를 받는사람을 뽑아라.
~~~
select empno, ename, sal, deptno from emp group by job order by sal desc;
select job, sal from emp order by sal;
~~~


1) 각 업무별 최저급액 리스트
~~~
select job, min(sal)  from emp group by job;
~~~
800,1250,5000,2450,3000


2) 해당 리스트의 금액과 같은 금액을 받고있는 사람들의 리스트 출력.
~~~
SELECT empno, ename, sal, deptno, from emp 
where sal=800 or sal=1250 or sal=5000 or sal=2450 or sal= 3000;
- where sal IN(800,1250,5000, 2450,3000) ;
~~~
~~~
SELECT empno, ename, sal, deptno, from emp 
where sal=(select job, min(sal)  from emp group by job) ;
~~~
- 이 결과가 5개가 나온다. 따라서 다중행이된다.	(800, 1250, 5000, 2450, 3000) 
-  '='이건 단행 연산자다 1:1
-  'in' 이건 다중행 연산자.
~~~
SELECT empno, ename, sal, deptno from emp 	
where sal in(select  min(sal)  from emp group by job) ;
~~~
----------------------------------------------
### 업무별 최저급여 보다 많이 받는사람.
~~~
select job, min(sal)  from emp group by job;

SELECT empno, ename, sal, deptno, from emp 
where sal>800 or sal>1250 or sal>5000 or sal>2450 or sal> 3000;

//sub 적용
SELECT empno, ename, sal, deptno from emp 
where sal >any(select min(sal)  from emp group by job) ;
~~~

-----------------------------------------------------------------------
### 업무별 최대급여 보다 많거나 똑같이 받는사람.

~~~
select job, max(sal)  from emp group by job;

SELECT empno, ename, sal, deptno, from emp 
where sal>=1300 or sal>1600 or sal>5000 or sal>2975 or sal> 3000;

SELECT empno, ename, sal, deptno from emp where sal>= all( select  max(sal)  from emp group by job ) ;
- select에서 job을 빼야...
~~~
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


---------------------------------------------------------------
ex) 적어도 한명의 직원으로부터 보고를 받을 수 있는 직원의 이름, 업무, 입사일자, 급여를 조회
//밑에 부사수가 한명이라도 있는 사람들 MGR(메니져) 

1. 명단의 사람들의 메니져 사원번호를 검색한다.
2. 해당 사원번호의 사람을 출력한다.


~~~
select MGR from emp group by MGR;
select distinct mgr from emp;	
~~~

            MGR
----------
        7839
        7782
        7698
        7902
        7566
        7788

~~~
select ename, job, hiredate, sal, MGR from emp
where empno in(7839,7782,7698,7902,7566,7788) ;

select ename, job, hiredate, sal, MGR from emp e
where exists(select * from emp where e.empno=mgr) ;
~~~
//이런선택도 가능하다.
//불필요하게 어렵다.
//외부커리와 내부커리에 별개의 emp가 생기기때문에 별명으로 구분해준다.
//될수있으면 상관서브커리는 사용하지 않는편이 좋다.

