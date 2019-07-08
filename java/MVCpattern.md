# MVC 
- Model
- View
- Controller

## 등장배경

![](/resource/img/java/webHistory.jpg)




## 1. Servlet
 - 클라이언트가 어떠한 요청을 하면 그에 대한 결과를 다시 
 전송
 - Servlet 소스에서 HTML을 처리함
 - 비지니스 로직과 프리젠테이션 로직이 분리되지 않음

## 2. JSP 등장
- JSP 모델-1
- Java Server Page
- Servlet 소스에서 처리하던 HTML을 JSP 스트립팅 기술로 대체
- 여전히 비지니스 로직과 프리젠테이션 로직 분리가 어려움

## 3. MCV 패턴
- JSP 모델-2 방식
- **Model** : 자바클래스(DAO,DTO)
- **View** : JSP,JSTL
- **Controller** : Servelt


## 4. Framework
- **스트러츠**
- **스프링**
- **하이버네이트**
- **아이바티스**




## Model
데이터와 데이터사이  실제적인 처리

## View
똑같은 데이터를 어떻게 보여줄것인가 디자인적인것.

## Controller
모델과 뷰 사이에서 잘 작동하도록 조절하는 역할.

- 하나의 데이터를 가지고 다양하게보여준다. 데이터 따로 보여지는것따로