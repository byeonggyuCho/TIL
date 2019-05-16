

# Annotation(어노테이션,애노테이션)

1) @Component, @Controller, @Repository, @Service, @Configuration
    - Class단에서 사용된다.
    - @Compoenent : Bean을 자동으로 생성한다.
    - @Controller :  Controller
    - @Repository: DAO
    - @Serviece: Controller와 DAO를 분리할 수 있는 중간단계.
    - @Configuraion 설정파일에서 해야할 일을 자바에서 할수 있는 역할을 제공한다.
    - component, controller,ropository,service 모두 bean의 자동생성이 가능하다. 약간의 차이는 있을듯.?
    - 역할에 따라서 구분하는것이 좋다. 가독성을 위해서.
    - 응용프로그래밍에서는 차이가 없지만 웹프로그래밍에서는 기능적 차이가 생긴다.
    
        
2) @Value
3) @Autowired, @Qualifier()
    - 형식으로 연결
    - 필드, 생성, 메서드(일반, setter) 어디든!!!!
    - @Qualifier를 이용해서 이름으로 연결한다.
    - required 기본값을 true인데 false로 지정하면 반드시 인자를 넘겨받지 않아도된다.
    - 매개변수가 불필요한 경우에 false로 지정해서 실행한다. 필수여부를 지정한다.		


4) @Inject, @Named	
    - @Inject: @Autowired
    - @Named : @Qualifier,@Component	//같은기능을한다.
    - JSR330에 정의되어있습니다. // 따라서 자바코드이기때문에 스프링이 아닌곳에서도 상용할수 있습니다!
    - 범용적인 사용이 가능합니다.
    - 하지만 스프링을 상요할때는 Autowired와 Qualifer를 사용하는것이 기능에 접근성이 더 좋습니다.
    - @Named 는 Inject와 사용될때는 @Qualifier의 기능으로 상용되지만 독립적으로 사용할때는
        @Component처럼 Class를 지목할때 상요할 수 있습니다.


    - 라이브러리는 mvc레포지토리에서 받으세용.
    
5) @Resource	(p114)
    -  이름을 연결한다.
    -  이렇게 하면 1차적으로 이름으로 찾는다.
    -  JSR250에 정의
    - 필드, setter에만 사용할수 있다.

6) @Scope, @Lazy, @DepensOn...
    -  bean태그에서...
    - scope 태그 속성을 어노테이션으로 처리 할 수 있다.
    - lazy- init속성 : 인스턴스생성을 늦춘다.
    - container가 생성될때 그 안에서 사용하게 되는 bean도 함께 생성이된다.
    - 그런데 lazy- init로 지연을  한다면...? bean이 호출되는 시점을 늦출 수있다.
    - 그런데 container가 생성될때 일괄적으로 생성하는것이 디버깅에 수월하다. 일일이 찾을필요가 없으니까.
    
    ~~~ java
    @Coponent
    @Scope(value="ConfigurableBeanFactory.SCOPE_PROTOTYPE")
    public class Aclass{
        ...
    }
    @Coponent
    @Lazy(value=true)
    public class Aclass{
        ...
    }		
    //이런식으로 Lazy 속성을 자바코드에서 추가할 수 있다.	

    Depense on 속성
    <bean depense on ="msgkr">
    - msgkr bean을 먼저 생성한뒤에 해당 빈이 생성되야합니다!

    @Compenent
    @DepenseOn (value={"beanA", "beanB")
    public class Ccalss{
        ...
    }
    //이런식으로 자바코드에서 사용하면 생성순서를 조절 할 수 있다.
    ~~~

7) SpEL
    - 출력을 쉽고 간단하게 하는 Spring식 EL 표현식!!!
    문법형식  :	#{식}
    ㅌ

