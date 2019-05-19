
# Git
1.  working Directory : 현재 작업중인 상태

2.  Staging Area : 	실제 저장하기 전에 임시로 보관하는 임시저장소

3.  .git directory
	내가 작업한 프로젝트가 저장되는 저장소.
	네트워크가 연결되어있지않아도 작업을 할 수 있다.

	
## 버전
1. trunk
    - 현재 개발중인 프로젝트
    - merger : 기존기능에 확장된것을 더해서 개발한다.
       - ex) 1.1 snapshot
2. tag
    - 개발완료된 프로젝트를 배포(relase)하는 단계.
3. branch
    - 실제버전과 독립적으로 추가 기능을 만들때 branch한다고 한다.
    - 완성버전을 브런치한다.
    - 기본소스를 복사에서 brach를 더한다음에 서버의 소스와 합친다.
    - 이 기본 소스를 master라고 부른다.


~~~ 
$ git config -- global user.name "CaterJo"
$ git config -- global user.email kin7729@gamil.com
~~~

## 간단한 리눅스 명령어.
~~~
$ dir index.html
$ Is indenx.html
$ cd FirstProject
$ git add *.c
~~~

   
- 스테이지 올려놓는것.
- work pj에서 staging pj로 옮기는것.
- add라는 명령어로 준비하는것.


~~~
$ git add index.*
~~~
- 모든 파일을 올린다는것.
- 스테이지에 올라간다.
- 커밋해주기전에 한다.
- 현재 내가 프로젝트에 작업하던것을 스테이지에 올린다는것.


~~~
$ git commit -m 'message'
~~~

 저장소에 보관할때는 기록이 필요하다. <br>
 m속성은 메세지를 입력하는데 현재 내가 저장한 내용을 저장소에 보관할때 어떤 내용인지 적어준다.<br>
 -m '메세지'를 치면 편집기가 뜨지 않는다.


## 2.2	수정하고 저장소에 저장하기
- untrack	: git와 관련이 없는 상태. 관리되지 않는다.
- track	: 저장소에 보관되어 관리가 되고 있는 상태.
    - unmodified	: 수정안됨.
    - modified		: 수정됨
    - staged		: 스테이지 상태.
~~~
$ git status
~~~
status로 상태변화를 확인할 수 있다.<br>
commit은  staged상태에서만 가능하다.<br>
mofied상태에서 staged상태로 이동할때도 add명령어를 사용한다.



## Git Hub
repository를 프로젝트 단위로 만든다.


1. 프로젝트 폴더 안으로 들어가서 gitBash를 실행한다.
~~~
$ git remote - v
~~~
생성된것을 확인한다.
~~~            
$ git remote add origin https://github.com/CaterJo/FirstProject.git
~~~    
서버를 추가한다. 
처음에 만들때는 orgin이라는 이름으로 만든다.
~~~
$ git remote - v
~~~
다시 확인한다.


- push : 내 프로젝트를 원격으로 올리는것
- fetch : 서버에서 가지고오는것. 가지고와서 저장만한다.
- pull :  가지고 오는것. 가지고 와서 나의 소스와 합쳐준다.


### STATUS
올리기전에 내 프로젝트가 전부 commit이 되어있는지 확인해야한다.
~~~
    $ git status
~~~

### ADD
스테이지에 올라오지 않은게  있다면 add하자.
~~~
$ git add *
~~~

### COMMIT
~~~
$ git commit - m "브런치 커밋"
~~~    

### PUSH
나의 작업을 공유하기 위해 서버에 올릴때.
~~~
$ git push origin master
~~~    

### CLONE, REMOTE
서버에 있는 프로젝트를 받아오기
~~~
$ git clone 주소
$ git remote - v 	:확인하기
~~~

### PULL
~~~
$ git pull origin master
~~~

clone하면서 서버가 등록된다 이때의 이름이 origin이다.<br>

commit에서 나갈때 <br>
- shift + , + W + Q


서버에 올릴때는 정보가 commit되어야 수정된내용이 업데이트 된다.

~~~ 
$ git commit -a -m 'added new benchmarks'
~~~
- staging단계를 패스하기 위해선 -a를 붙여라.




### 삭제하기
관리만 안할건지
~~~
$ git rm -- cached README
~~~

파일까지 삭제 할것인지
~~~
$ rm git.gemspec		
~~~



### 작업내용 추적하기.
    log를 통해서
~~~
$ git log
~~~


### 커밋 되돌리기
~~~
$ git commit -- amend
~~~

### 스테이지에서 끌어내리기

1. 수정하기
2. reset
~~~
$ git reset
~~~

### 업로드
업로드를 할때는 내가 다운받을때와 같은버전일때만 가능하다.<br>
서버에 새로운 업데이트가 되어있다면 새로 받아서 올려야함.


### 브랜치 생성
~~~
$ git branch feature1   
~~~
### 브랜치 이동
~~~
$ git branch checkout
~~~
### 헤드가 바뀐게 뭘 의미하는겨?
현재 작업중인것을 나타낸다.

### 합치기
~~~
$ git merge feature
~~~
### readme가 있으면?
서버에서 받고 repository를 시작해야한다.



### INIT
~~~
 $ git init
~~~
초기화, .git생성된다.


### 서버연결
~~~
$ git remote add origin https://github.com/CaterJo/ThirdProject.git
~~~


### MERGE
마스터를 먼저 받은다음에 feature1(branch)를 받으면 자동으로 합병된다.

### BRANCH 관리
~~~
$ git branch
~~~
### branch 삭제
~~~
$ git branch -d testing
~~~