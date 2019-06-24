# 자바가상머신 (JVM)
- 자바 바이트 코드(class file)를 실행할 수 있는 주체다.
- 운영체계가 이해할 수 있는 기계어로 바꿔 실행한느 역할.
- CPU나 운영체제(플랫폼)의 종류와 무관하게 실행이 가능하다. (멀티 디바이스.)



## JVM 구성
![](/resource/img/java/jvmStructure.png)



### 1. Class Loader

자바에서 소스를 작성하면 Person.java 처럼 .java파일이 생성된다.
.java 소스를 자바컴파일러가 컴파일하면 Person.class 같은 .class파일(바이트 코드)이 생성된다.<br>

이렇게 생성된 클래스파일들을 엮어서 JVM이 운영체제로부터 할당받은 메모리영역인 Runtime Data Area로 적재하는 역할을 Class Loader가 한다. (자바 애플리케이션이 실행중일 때 이런 작업이 수행된다.)



### 2. Execution Engine

Class Loader에 의해 메모리에 적재된 클래스(바이트 코드)들을 기계어로 변경해 명령어 단위로 실행하는 역할을 한다.<br>

명령어를 하나 하나 실행하는 인터프리터(Interpreter)방식이 있고 JIT(Just-In-Time) 컴파일러를 이용하는 방식이 있다.<br>

JIT 컴파일러는 적절한 시간에 전체 바이트 코드를 네이티브 코드로 변경해서 Execution Engine이 네이티브로 컴파일된 코드를 실행하는 것으로 성능을 높이는 방식이다.



### 3. Garbage Collector

Garbage Collector(GC)는 Heap 메모리 영역에 생성(적재)된 객체들 중에 참조되지 않는 객체들을 탐색 후 제거하는 역할을 한다.<br>

GC가 역할을 하는 시간은 정확히 언제인지를 알 수 없다. (참조가 없어지자마자 해제되는 것을 보장하지 않음)<br>

또 다른 특징은 GC가 수행되는 동안 GarbageCollection을 수행하는 쓰레드가 아닌 다른 모든 쓰레드가 일시정지된다.<br>

특히 Full GC가 일어나서 수 초간 모든 쓰레드가 정지한다면 장애로 이어지는 치명적인 문제가 생길 수 있는 것이다. (GC와 관련된 내용은 아래 Heap영역 메모리를 설명할 때 더 자세히 알아본다.)<br>




## 4. RunTime Data Area

JVM의 메모리 영역으로 자바 애플리케이션을 실행할 때 사용되는 데이터들을 적재하는 영역이다.<br>

이 영역은 크게 Method Area, Heap Area, Stack Area, PC Register, Native Method Stack로 나눌 수 있다.


![](/resource/img/java/javaRuntimeMemoryArea.png)


### 4.1  Method area (메소드 영역)

클래스 멤버 변수의 이름, 데이터 타입, 접근 제어자 정보같은 필드 정보와 메소드의 이름, 리턴 타입, 파라미터, 접근 제어자 정보같은 메소드 정보, Type정보(Interface인지 class인지), Constant Pool(상수 풀 : 문자 상수, 타입, 필드, 객체 참조가 저장됨), static 변수, final class 변수등이 생성되는 영역이다.

### 4.2 Heap area (힙 영역)

new 키워드로 생성된 객체와 배열이 생성되는 영역이다.<br>
메소드 영역에 로드된 클래스만 생성이 가능하고 Garbage Collector가 참조되지 않는 메모리를 확인하고 제거하는 영역이다.<br>

### 4.3 Stack area (스택 영역)

지역 변수, 파라미터, 리턴 값, 연산에 사용되는 임시 값등이 생성되는 영역이다.<br>
int a = 10; 이라는 소스를 작성했다면 정수값이 할당될 수 있는 메모리 공간을 a라고 잡아두고 그 메모리 영역에 값이 10이 들어간다.<br>
즉, 스택에 메모리에 이름이 a라고 붙여주고 값이 10인 메모리 공간을 만든다.<br>

클래스 Person p = new Person(); 이라는 소스를 작성했다면 Person p는 스택 영역에 생성되고 new로 생성된 Person 클래스의 인스턴스는 힙 영역에 생성된다.

그리고 스택영역에 생성된 p의 값으로 힙 영역의 주소값을 가지고 있다.<br>
즉, 스택 영역에 생성된 p가 힙 영역에 생성된 객체를 가리키고(참조하고) 있는 것이다.<br>
메소드를 호출할 때마다 개별적으로 스택이 생성된다.

### 4.4 PC Register (PC 레지스터)

Thread(쓰레드)가 생성될 때마다 생성되는 영역으로 Program Counter 즉, 현재 쓰레드가 실행되는 부분의 주소와 명령을 저장하고 있는 영역이다.<br>
이것을 이용해서 쓰레드를 돌아가면서 수행할 수 있게 한다.<br>


###  4.5 Native method stack

자바 외 언어로 작성된 네이티브 코드를 위한 메모리 영역이다.<br>
보통 C/C++등의 코드를 수행하기 위한 스택이다. (JNI)


