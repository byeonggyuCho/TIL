# ORDER BY 

## 1.기본 사용법

~~~ sql
ORDER BY [ASC|DESC]
~~~

예제
~~~ sql
SELECT * FROM EMP ORDER BY JOB
-- 오름차순 (ASC 기본값)
SELECT * FROM EMP ORDER BY JOB ASC
-- 오름차순
SELECT * FROM EMP ORDER BY JOB DESC
-- 내림차순
~~~


## 2.데이타형에 따른 정렬

 
1. 문자열
- ASC : 오름차순
- DESC :  내림차순


2. 정수, 시룻
- ASC : 작은것부터
- DESC : 큰것부터

3. 날짜
- ASC : 과거부터
- DESC : 미래부터

4. NULL
- ASC : 맨뒤
- DESC : 맨 앞

 

※ ASC일때 NULL 값을 맨앞에 하는 방법
~~~ sql
 ORDER BY name nulls first
 ORDER BY nvl(name,' ')
~~~

※ DESC일때 NULL 값을 맨뒤에 하는 방법
~~~ sql
ORDER BY name nulls last
~~~

 

### 3. 특별한 사용법

※ 정렬기준이 2개 이상일 때.
~~~ sql
 SELECT * FROM table_name ORDER BY a,b;
~~~~

- a를 오름차순으로 정렬한상태에서 a의 값이 중복인 레코드는 
다시 b를 오름차순으로 정렬한다.
- a의 값이 중복값이 없을때는 b는 오름차순하지 않는다.



※ 임의의 필드로 정렬하기 ORDER BY 뒤에 숫자가 나오면 현재 조회된  쿼리의 첫번째 필드를 기준으로 정렬한다.
~~~ sql
SELECT * FROM emp ORDER BY 1 DESC;
~~~
 


※ ORDER BY 뒤에 앨리어스(별명)을 두어 정렬이 됩니다.
~~~ SQL
SELECT A AA,B FROM ORDER BY AA;
~~~


 
※ DECODE 함수로 원하는 값에 우선순위 주기
~~~ SQL
SELECT * FROM TABLE_NAME 
WHERE ID IN('084', '081', '079', '077', '127')

ORDER BY DECODE(ID, '084', 1, '081', 2, '079', 3, '077', 4, '127', 5);
 ~~~