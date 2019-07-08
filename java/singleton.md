

## 싱글톤 패턴
- 하나의 해당클래스에서 단 하나의 인스턴스만 만들도록 보장하는 방식
- 하나의 인스턴스를 재사용하게 된다.
- 불필요한 자원낭비나 오버해드를 방지한다.
- 데이터베이스 연동(DAO 클래스) 하여 사용할때 자주 사용된다.

1. 인스턴스 생성
	->외부에서 접근이 불가능하고 유일한 인스턴스를 생성한다.
	private static instance = new Singleton();

2. 생성자 선언
	->외부접근이 불가능한 생성자를 만든다.
	->private Singleton(){}

3. getMethod 생성
	->생성된 인스턴스를 반환한다.
~~~ java
public static Singleton getInstance(){
return instance;
}
~~~

