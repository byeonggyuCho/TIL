


# String
1) Java에서는 문자열을 객체로 취급한다.
	- 클래스로 만들어져있다
	- 즉슨 다양한기능을 제공한다.
	- 항상 도트연산자(.)를 달고 다닌다. (다양한 기능의 메소드를 호출한다.) 변수나 메서드
	- 객체가 아닌것들것들도 .을 달고 다니는데 그건폴더
	- 폴더가 .을 달고있으면 클래스나 객체


2) 동일한 데이터값에 대해서 인스턴스를 중복해서 생성하지 않는다.
	- 기존에 생성한 인스턴스와 저장된 데이터가 동일하다면 기존의 인스턴스를 참조한다.
	- 참고)new 연산자를 통한 선언을했을시 값이 같더라도 개별적인 인스턴스가 생성된다

		((new를 통해 인스턴스를 생성한다면 같은값이 있어도 별도의 인스턴스를 생성한다.
	- String str2= new Stirng("java"); 기존 str1과 데이터값이 같더라도 별도의 인스턴스 생성..))

3) 절대로 수정불가능.
	- (일단 생성되서 값이 생성되면 이 값을 수정할수 없다.)
	- (만약 String참조값을 같는 변수에 새로운 문자열을 입력한다면
	기존의 메모리에 대한 참조값을 버리고 새로운 인스턴스를 생성하여 다시 참조한다.)
	- (따라서 기존의 메모리공간은 참조변수를 잃고 쓰레기가 된다)

4) StringBuffer, StringBulder
	- 반드시 new연산자로 생성해야한다.
	- 디폴트값이 String 값이기 때문이다.
	- 따라서 StringBuffer sb2 = "java"; 이런식의 사용이 불가능함.





## java.lang.System.out.println()
- java 폴더
- lang 폴더
- System 클래스
- out 객체	(next 매소드or 변수)
- println() 매서드


- 실제 java라는 폴더는 어디에 있을까?
	- C:\Program Files\Java\jdk1.8.0_121에 있는 src.zip이라는 폴더속...


### 비객체
- 객체가 아닌것들은 무엇이 있을까?
- 데이터타입 (기본 데이터타입)
- 자바에서 유일하게 클래스가 아닌것들은 기본 데이터타입이다.



## snull문자
- 공백문자
- 참조형변수에서 주소값이 없을때 null로 초기화 가능.



	#String str1= "java";
	 String str2= str1.concat(" is love");
	
- str1 와  str2 참조값이 같을까?
- 왜 다를까?(맹점은?)
- java is love라는 데이터를 저장한 새로운 인스턴스를 생성한다.
- String 인스턴스는 값을 수정할수없다.
- 로운 메모리를 할당하여 새로운 값(java is love)을 생성한다.
- 그렇다면 데이터를 수정해야할때마다 쓰래기값이 생긴다는건데 이런 문제를 해결할 수없을까??
	(StringBuffer)





## 문자열수정이 가능한 클래스
- StringBuffer

- equals
	- 변수의 주소값을 비교한다.
	- 예외가 있는데 String의 경우 값을 비교한다.

- String과 StringBuffer와의 차이점.
	- new 연산자를 사용해야한다.
	- equals는 주소를 비교한다.(StringBuffer)
	- equals는 값을 비교한다(String)
	-  '=='도 주소를 비교한다. StringBuffer



## String Method
- charAt(int index) 
- compareTo(String anotherString)  
- compareToIgnoreCase(String str) 
- concat(String str) 
- contains(CharSequence s)  
- endsWith(String suffix)  
- startsWith(String prefix)  
- startsWith(String prefix, int toffset) 
- equals(Object anObject)  
- equalsIgnoreCase(String anotherString) 
- getBytes(Charset charset) 
- getBytes(int srcBegin, int srcEnd, byte[] dst, int dstBegin) 
- Deprecated.  (더이상쓰지말라는 얘기다.)
- indexOf(int ch) 
- indexOf(int ch, int fromIndex)   
- lastIndexOf(int ch)  
- isEmpty()  
- length()  
- matches(String regex)  
- replace(char oldChar, char newChar) 
- split(String regex) 
- substring(int beginIndex) 
- toLowerCase() 
- toUpperCase()  
- valueOf(boolean b) 

	Returns the string representation of the boolean argument. 

- trim() 

	Returns a string whose value is this string, with any leading and trailing whitespace removed. 

### 참고
- (DOC)[http:- docs.oracle.com/javase/8/docs/api/index.html]