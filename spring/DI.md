
# DI 패턴
- 의존성 주입 :Dependency Injection

    의존 관계가 소스코드 내부가 아닌 외부의 설정파일 등을 통해 정의되게 하는 디자인 패턴이다.
    의존성을 줄여서 내가 사용하고 있는 Class에 영향을 끼지치 않게 하기 위한 패턴.
- 객체의 주입.


### 의존성을 떨어뜨리는 방법
- Class 중간에 매개체 역할을 하는 Class를 추가한다. 
- 이 때 매개체 역할은 Bean의 부모 Class가 좋다. (Class대신에 Interface)


### 의존관계를 줄이는것이 좋다.
- 인스턴스 선언을 한곳에서만 하는것이 좋다. 여러곳에 걸쳐있으면 유지보수가 어려워진다.
- 직접적으로 인스턴스를 생성한다는 것은 의존관계를 형성하기 때문에 유지보수에 장애로 작용한다.

### 만약 MessageBean을 확장하여 MessageBeanEx를 만들었을 경우
- MessageBean이 선언된 모든 Class에 접근하여 수정을 해야는 작업이 생긴다.
- 이런것이 직접적인 의존관계에서 불가피한 상황임... 쉽게 말해서 인스턴스 생성을 하는 클래스가 많지 않아야한다.



### 완전히 의존성을 분리시키기 위해선
 펙토리패턴을 사용한다( 인터페이스를 외부에서 생성하고  주입하는 패턴)


### spring은 test기능을 굉장히 잘 지원한다.
- test방식으로 프로그램을 개발하는 방식.
- TDD(Test Driven Development)



1) Ioc (Inversion Of Control)  
	- 제어권을 넘겨서 제어를 당한다는 의미다.
    - 스프링을 'Ioc 컨테이너'라고도 한다.
	- ex) callBack Method

2) DI를 구현하는 두가지 방법.
	* Factory메소드패턴 처럼 객체를 외부에서 만들어서 주입방법 2가지가 있습니다.!
	1) 생성자 방식.
        - (Constructor-based dependency injection)
	2) 메소드 방식.
        - (Setter- based dependency injection)

스프링에 이미 factory메서드가 있어서 간단하고 쉽게 사용할 수 있습니다.!
(우리가 할 것을 쉽게 할 수 있게 해줌 ㅎ.)

3) APPlicationContext	(Interface)
	- 이 객체를 생성해야지 스프링이 돌아갈수 있는 공간이 생긴다.


4) bean Lifecycle
	1) BeanNameAware
		void 	setBeanName(String name)
			//Bean의 이름이 정해졌을때 쯤 호출된다.
	2) BeanFactoryAware
		void	setBeanFactory(BeanFactory beanFactory)
	3) InitializingBean
		void	afterPropertiesSet()
	4) DisposableBean
		void	destroy()
	 		//Bean이 사라졌을때 호출된다.
	5) BenPostProcessor
		Object	postProcessAfterInitialization(Object bean, String beanName)
		Object	postProcessBeforeInitialization(Object bean, String beanName)
	

