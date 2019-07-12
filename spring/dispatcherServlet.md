# Dispatcher Servlet

- Spring에서 제공하는 프론트 컨트롤러
- web.xml에서 생성. 


## web.xml의 역할의 축소
1) 기존 	
	- 서블릿을 URL로 활용하기 위해서 반드시 web.xml에 등록해야했다.
2) 스프링	
	- DispatcerServlet이 해당 어플리케이션으로 들어오는 요청을 모두 핸들링한다.
	- 따라서 web.xml에 프론트 컨트롤러 역할을 하는 DispatcherServlet만 등록하면 된다.
	- DispatcherServlet의 적용범위를 web.xml에 설정한다.
	- \<filter\>나 \<listener\>를 web.xml에 등록한다.


## Spring 프론트 컨트롤러 패턴의 요청경로

![](/resource/img/spring/STS.jpg)

1. 요청 
2. dispatcher Servlet으로 이동 
	- 이동경로 설정은 "-servlet. xml"에서 bean을 생성하여 정한다. 
	- 요청의 해결방식을 자문하는 곳있다. (경로의 방향을 정해주는곳)
		=>HandlerMapping이라는 클래스에서 프론트에 들어와서 어떤 하위 컨트롤러로 이동할지 정한다. 

3.  하위 컨트롤러

4. 모델
	- request값을 전달받아서 처리를 한뒤 처리결과를 리턴한다. 

5. 하위 컨트롤러

6. dispatcher Servlet
	- 어떤 view로 보낼지 어떻게 정할까?
	- 하위 컨트롤러에서 이동할 view의 주소값을 내장해야한다. 
	- 이때 view의 방향을 결정할때 자문을 하는곳도 있다. 
		=>ViewResolver
		=>이 곳에 자문을 구해서 view의 경로를 정한다. 




**왜 Controller를 상속받은 컨트롤러를 프론트컨트롤러 역할로 사용하지 않는거지?
7. view로 이동. . .  



*DispatcherServlet의 처리과정

1) 클라이언트 요청<br>
클라이언트가 해당 어플리케이션에 접근하면 접근한 URL 요청을 DispatcherServlet이 가로챈다.
이렇게 요청을 가로챌 수 있는 이유는 web.xml에 등록된 DispatcherServlet의 \<url-pattern\>이 '/'와 같이 해당 어플리케이션의 모든 URL로 등록되었기 때문입니다.
만약 특정 URL만 적용하고 싶다면 \<url-pattern\>의 내용을 바꿔서 범위를 변경하면 된다.

2) HandlerMapping<br>
가로챈 정보를 HandlerMapping에게 보내 해당 요청을 처리할 수 있는 Controller(handler)를 찾습니다.
(스프링은 기본적으로 5가지의 핸들러 매핑이 있다) 
이 부분은 스프링의 디폴트 전략에 의해 BeanNameUrlHandlerMapping과 DefaultAnnotationHandlerMapping이 
기본으로 스프링 MVC에 탑재되있기 떄문에 특별한 경우가 아니라면 따로 설정할 필요가 없다.

3) Controller<br>
핸들러매핑이 해당 요청을 처리할 컨트롤러를 찾아냈다면 요청을 컨트롤러에 보낸다.
컨트롤러는 사용자가 직접 구현해주는 부분이다.
@MVC는 매우 다양한 코딩방식과 직관적이고 편리한 컨트롤러 작성방법을 제공하므로 이 부분에 대해서는 차후 심층적인 분석하여 자신에게 맞는 알맞은 전략을 선정해야한다.

4) ViewResolver<br>
컨트롤러가 해당 요청을 처리한 후에 보통 컨트롤러는 요청을 응답받을 viewname을 리턴한다
이는 핸들러 매핑전략에 따라 달라진다.
그 때 이 viewname을 viewResolver가 받아 해당하는 view가 있는지 검색한다.

5) 요청 처리<br>
해당하는 view가 있다면 처리결과를 view에게 보낸후 처리결과를 Dispatcherservlet에 보낸 후 DispatcherServlet은 최종결과를 클라이언트에게 전송한다.




### 프론트 컨트롤러 패턴
	- 공통점이 있는  컨트롤러를 교통정리해주는 프론트 컨트롤러를 만든다. 