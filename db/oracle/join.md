## Join
    서로 다른 테이블간에 설정된 관계가 결합하여 1개 이상의 테이블에서 데이터를 조회하기 위해 사용 됩니다. 
    이 때 테이블간의 상호 연결을 조인이라고 하는데요. 
    각각의 테이블에 분리된 연관성 있는 데이터를 연결하거나 조합해야 하는데 이러한 일련의 작업들을 조인이라고 합니다.

- 여러 개의 테이블을 병합하여 하나의 결과를 도출하기 위한 방법.
- 하나의 테이블에 모든데이터를 전부 담지 않고 쪼개 놓는다.
- 그렇기때문에 필요에 따라서 JOIN할 필요가 있다.

- 내부 조인 ( Inner Join )
- 외부 조인 ( Outer Join )
- 크로스 조인 ( Cross Join )
- 셀프 조인 ( Self - Join )
- 안티 조인 ( Anti Join )
- 세미 조인 ( Semi Join )
- ANSI 조인





1) 종류 
    - Cartesian Product Join(데카르트 곱 조인) 
    - Equi Join
        - 공통 필드의 레코드를 가져오는 방법.	(중복된것을 가져오는것) 
        - Inner Join(Natural Join)  			(중복된것을 빼고 가지고온다.) 
        
    - Non Equi Join
        - 공통되지 않은 레코드를 가져오는 방법	(공통필드가 없을 경우) 
    - Outer Join
        - Inner Join의 확장이다.: Inner Join+공통되지 않은 레코드도 가져온다.
        - 종류
            Left Outer Join	
            (공통되는것일단가지고옴, 나머지 공통안된것 왼쪽걸 가지고옴) 
            Right Outer Join
            (공통된것 가지고옴,나머지 공통되지 않은것 오른쪽걸 가지고옴) 
            Full Outer Join
            (왼쪽,오른쪽 둘다 가지고온다) 

    - Self Join
-------------------------------------------------------------------------------------
Ex)  uesr1에 테이블 생성하기
~~~
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
~~~
-------------------------------------------------------


1. INNER JOIN

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
        
------      

2. OUTER JOIN

    ## LEFT
    1) 표준		
    SELECT tblA.id, tblB.value
    FROM tblA LEFT OUTER JOIN tblB
    ON tblA.id=tblB.id;


    2) 비표준	(오라클st 레프트 아웃터) 
    SELECT tblA.id, tblB.value
    FROM tblA, tblB
    where tblA.id=tblB.id(+) ;



    ## RIGHT

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
    

    ex) 이름, 급여, 부서명,근무지를 조회하시오
    단, 부서명과 근무지는 모두 출력할 수 있도록 하시오.
    
    select ename, sal, dname,loc
    from emp right outer join dept
    on emp.deptno = dept.deptno;

    
    
    ----

3. non-eqi join	(공통된 필드가 없는상태에서 join하는 방법) 

    ex)  직원의 사번, 이름, 급여, 급여등급을 조회.
    select empno, ename, sal, grade,losal,hisal
    from emp INNER JOIN salgrade
    ON sal>=losal AND sal <= hisal;

    -----------
4. self join	(같은테이블을 조인한다) 
    - 나와 같은걸 복사해서 조인한다.
    - 셀프조인은 이름의 구분해줘야하기때문에 별명을 준다.
    
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

