

# Transaction
#### 컴퓨터가 처리하는 작업의 단위.	
- thread와 구분


1) All or Nothing!
- 작업을 완전히 끝내던가 시작도 하질 말던가 (확실해야한다는것) 

	### 트랜젝션 log
	- 작업내용을 기록하는것.

2) 오라클에서의 데이터베이스 구성.
	데이터파일 : .dbf
	로그파일 : .log	(여기에 Transaction log가 기록된다 // dml만 기록이 된다(update, delet등..) 


	### ORCL
	- 우리가 설치한 데이터베이스 
	- C:\app\student\oradata\orcl
	- .DBF,LOG가 있다.


3) 관련 명령어
	- commit		
		- 메모리에만 기록되었던것이 commit이 실행되면 일이 끝마쳐지고 파일에 기록된다
		
	- rollback
		- 처음으로 돌아갈수 있다. 어느 시점으로 갈수 있는지?) 
		- 작업마다 bookmark를 하고 돌아가는 시점을 저장할수 있다, 아니면 무조건 초기화

	- 보통 접속부터 트렌젝션 시작, 접속종료하면 트렌젝션 종료 
	- commit이 실행되면 트랜젝션이 종료되고 새로운 트랜젝션을 시작한다. 이제 롤백할수 없다


4) 동기화
	- 동시접속으로 인해 값이 달라지는걸 막는다.
	- 한번에 하나의 처리만 한다.(하나의 독립적인 처리만 한다.) 
	- 시스템적 처리가 자동으로 이루어지기 때문에 작어자가 해야할건 없음
	- 동기화의 가장높은등급은 조회도 한번에 한명씩만 가능함.
	- 동시접속을 했을때 다른 사용자가 commit을 해야지 다른 사용자가 확인이 가능하다.



	### 테이블삭제
	- drop table tbla;
	- create로 만든건 rollback이 안된다.
	- 휴지통에 들어간다. 다시 살릴수 있다.
	- 완전 삭제되어도 돌릴수있다.(전문가) 


	- flashback(오라클에만 있다) 
		-'flash_recovery_date'폴더에 저장된다.
		flashback table tblA to before drop;


	### 휴지통보기
	~~~
	show recyclebin;
	~~~

	### 휴지통비우기
	~~~
	purge recyclebin;
	~~~