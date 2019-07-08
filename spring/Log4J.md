
# Log4J	
- print.out메서드를 대체해서 손쉽게 사용할 수 있다.
(로그를  추적하느 기술)
1) 설정방법
	- .properties	(Old)
		- 응용프로젝트에서는 이방식을 권장. 웹프로젝트에서는 xml 권장
		- ex) log4j.properties	
		- (경로는 클래스패스가 걸려있는곳이면 읽어들인다.)
	- .xml	(new)
		

2) 구성 요소
	1) Logger 		: 출력할 메세지를 Appender에게 전달.
	2) Appender 	: 전달된 로그를 어디에 출력할지를 결정한다.  
	3) Layout		: 로그를 어떤 형식으로 출력할지를 결정한다.

3) 로그 레벨
	1) Fatal
	2) Error
	3) Warm
	4) Info 	: 정상적인 메세지..
	5) Debug : 
	6) Trace



#### META- INF	: Spring외에도 여러가지 설정파일을 모아두는 폴더다.
#### XML파일 생성하기 : Spring Bean Configuration File (스프링작업을 하도록 셋팅되어있는 xml파일)

#### p라는 기능(프로퍼티를 간단하게 할 수 있다)
- 화면 하단 탭에 'NameSpace'란에서 checkbox에서 p를 선택.
- 이 설정을 하면 하위태그를 사용하지 않고 프로퍼티를 태그의 속성을 사용하여 입력 할 수 있다.

