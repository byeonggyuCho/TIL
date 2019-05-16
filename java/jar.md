
##JAR 기본명령어		
-c (압축) :새 아카이브를 생성합니다.
-v (상세정보)표준 출력에 상세정보 출력을 생성합니다.
-f	아카이브 파일 이름을 지정합니다. (저장할 파일명을 지정할 수 있다)

jar cvf 파일명.jar 클래스명1.class 클래스명2.class
(파일명으로 압축하겠다. 클래스1과 클래스2를)
폴더명이나 파일명.


jar cvf BookPack.jar Bookpack



**확장자
zip,aaa등 임의로 설정해도 되지만
jar로 해주는것이 알아보기 쉽다.




##jar를 시스템변수걸기
압축파일 이름까지.
.;C:\Users\student\Desktop\yesman\JAVASE\2.ControlStatement\Bookpack.jar

그다음에
java Bookpack.BookTest 명령어를 입력하면 어디서든 실행된다.


그 다음
<.;>만 남기면 됨...



#압축해제
=>알집이든 뭐든 아무거나 해도된다.
=>jar 쓸꺼면...  xvf bookpack.jar
=>실행만 할꺼면 압축 안풀어도된다.

 **METa-INF는 작업내용이 적혀있음 지워도 됨..




테스트코드는 지우셈..
=>메인클래스.




**정리.
이제 A출판사에서 작성된 모듈을 받았다.(Book.java)고 가정

상황연출을 위해, BookTest를 A출판사의 메인프로그램이라고 생각해보자.
BookTest를 A출판사의 메인클래스라고 가정...

1.일단 BookTest 자바 소스를 상위폴더에 저장한다.
(Bookpack에는 book클래스와 book자바파일만 있다.) 자바파일만 남겨도 된다 클래스파일은 새로 생기니까
(모듈만 남는다는 얘기...)

-book.java 파일에 Bookpack이라는 패키지선언을 해준다.
-그다음 컴파일...



그 다음 booktest 클래스에서 메인메소드만 남기고 싹다 날린다.
-딱 메인메소드만 남기셈..




booktest 컴파일

cannot find simbol (변수를 찾을수 없습니다.)
클래스앞에 패키지를 써주자. (Book->BookPack.Book)


cannot be accesed from outside package
(패키지 외부에서 접근이 불가능합니다.)

접근제한자가 default로 설정되어있다.
default값은 같은 페키지 내에서만 접근이 가능하다.
접근제한자를 public으로 수정한다.


이때 생산자,매소드에 모두 public을 붙여야한다.



**라이브러리 클래스
-지금 까지 만든 모듈.


위치적문제 -> 클래스패스로 해결.
클래스사용할때 페키지이름을 붙여야한다.
온전한 이름(Qualified Name) 페키지 이름을 붙여야한다.


java.lang.System.out.println("...");

java 패키지임
근데 이거 왜 생략?
유일하게 자바에서 가장 기본적이 페키지기때문에 생략해도 봐준다.
얘를 제외한 나머지는 반드시 명시해야함!!!!




**패키지
1.java.lang	
2.java.util	많이알면 알수록 프로그래밍이 쉬워진다.
java.io
java.math
java.net (network)


**패키지안의 패키지


**패키지 이름
=>관례: 패키지는 무조건 소문자로 쓴다.(여러단어더라도 무조건소문자)

-d 원하는 디렉토리, 패키지가 되있는건 자동으로 폴더가 만들어지겠금한다.
. 현재위치
javac -d  . PackageTest.java
//패키지 컬파일, 하면자동으로 폴더도 생성됨.
//사실 이렇게 할필요는 없음... 이클립스가 알아서 해준다.

