

# springMVC
1) DispatcherServlet
2) HandlerMapping
- 여러개 있어서 어떤 클래스냐에 따라서 역할이 달라진다. 
- "org.springfaramework.web.servlet.handler"경로에 다양한 handler가 있다.
    - BeanNameUrlHandlerMapping(default) 
        - Bean의 이름을 가지고 url을 정한다.
    - SimpleUrlHandlerMapping
        - Url을 기준으로 mapping을 한다.
    - DefaultAnnotaionHandlerMapping
    ....
3)  controller(org.springframwork.web.servlet.mvc) 
    - Controller(interface) 
    - AbstractController		:인터페이스를 상속받는것보다는 이런 자식클래스를 상속받는게 낫다.
                :인터페이스 구조상 프로그래밍이 난잡해지기 쉬워서 잘 안사용되는 추세
                :단 하나의 메서드만 생성이가능하기때문에~~


4)  ViewResolver	
    - 처리결과를 가지고 컨트롤러로 돌아왔을때 어느 view로 갈것인가 결정해준다.
    - (org.springframework.web.servlet.view) 
    - InternalResourceView	(default) 
    - ResourceBundleViewResolver
    - XmlViewResolver
    - BeanNameViewResolver

    - org.springframework.web.servlet.view.tiles.velocity.velocityViewResolver
    - org.springframework.web.servlet.view.tiles.freemarker.FreeMarkerViewResolver

5)  View(org.springframework.web.servlet.view) 
    - 최종적으로 도착하는 View의 객체!!

    - InternalResourceView(default) 		- JSP일 경우에 지원한다.
    - JstlView
    - org.springframework.web.servlet.view.tiles.TilesView
    - org.springframework.web.servlet.view.tiles.velocity.velocityView
    - org.springframework.web.servlet.view.tiles.freemarker.FreeMarkerView



6) DB 프레임 워크
    - 별도의 프로그램을 통해서 작업을 새로 하기 위함..
    - ORM MAPPER(데이터베이스를 전문적으로 처리해준다) 
    - 프로젝트와 별도로 떨어진 곳에서 작업을 할 수 있다.
    -  반드시 써야하는 필수적인 트랜드이다.
    - 수십가지가 있습니다.
    - 가장 인지도가 좋은것은 2개가 있음

    1) Hibernate(하이버네이트)

    2) Mybatis(구 Ibatis) 
        - http://blog.mybatis.org
        - MVN레포지토리.
        - 모든 DB작업을 mybatis에 전임할 수 있다.
        - 연결까지는 Spring을 통해서 한뒤 나머지 작업을 mybatis에 넘길 수 있다.
        - 여러가지 전략이 존재한다.
        -  우선 mybatis에게 모든걸 전임하는 방식으로 진행하자.

        
~~~ xml
<!--  https://mvnrepository.com/artifact/org.mybatis/mybatis -->
    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis</artifactId>
        <version>3.4.4</version>
    </dependency>
~~~
