1.윈도우 프로그래밍
(1) 도구
	AWT(abstract Window Toolkit)
	=>추상적(속이 비었다. 내가 채워넣기위해서)
	=>약점(호환성이 떨어진다)

	SWING(100% 자바로)
	

	JavaFX
	-현재시점 최신기술.
	-별도의 라이브러리

(2)학습포인트
	1)재료(component)
	2)디자인(Layout)
	3)동작(Event)

(3)Component
-클래스들의 집합 Component(큰 단위의 모듈화)
-이 맥락에서는 윈도우를 만들때의 부품.
-java.awt.Component (가장 부모클래스!)

	[Sub]
	Button		//Label과 별다를게없다.
	Canvas
	Checkbox (Radio)
	Choice		//항목을 감춰놨다가 보여주는것. 단일선택
	Container	//다른 컴포넌트를 담기위한 컴포넌트.


		Panel 	//디자인을 편리하게 하기 위해서 사용
			**Applet(메인)-인터넷에서 실행가능한 프로그램,요새는 전혀 사용하지 않는다고보면됨.
		Window
			Dialog		//상속을 받아쓰자.
				1)작성방식
					-Common Dialog(System Dialog)
					-User Define Dialog  //내 입맛대로..
				2)실행방식
					- Modal		//현재 실행중인 다이얼로그 종료하기전엔 다른작업불가
					- Modaless	//다른작업가능 (Ctrl+F)
					


				FileDialog
			**Frame(메인)-일반적 응용프로그램

		-setSize()		-크기만정할수있다.
		-setBounds()		-크기와 함께 실행되는 위치도 정할 수 있다.
		
		-show()	-기능중복으로 Deprecated
		-setVisible(true);
		

		
	Label
	List		//처음부터 항목을 오픈하는것. 다중선택
	Scrollbar
	TextComponent
		-TextArea
		-TextField


		**CBD 방식
		-component based development
		-부품화해서 개발하자!
		
			



**상속을 사용할때는
상의 클래스의 기능을 살펴보자.


Dialog(Frame owner, String title, boolean modal)
Constructs an initially invisible Dialog with the specified owner Frame, title and modality.


owner =나를 호출하는 클래스의 주소.
title = 다이얼로그의 제목
modal = 모달여부..




(4) Layout
	1)재료(컴포넌트)를 원하는 위치에 배치.
	2)Layout Manager
		-FlowLayout
			=>위에서 아래로, 왼쪽에서 오른쪽으로 순서대로 배치
			=>패널에 기본 레이아웃

		-BorderLayout
			테두리를 기준으로 배치
			(동,서,남,북,가운데) 어디에 놓을것인지!
			Window의 기본 레이아웃

		-GridLayout
			행과 열의 갯수를 나눠놓고 배치한다.(체계적 배치가능)
		-GridBagLayout
			행과 열의 갯수를 불규칙하게 배치할 수 있다.(더 자유도가 높다)
			단점은 쓰기 더럽게 어렵다.
		-CardLayout
			한곳에서 여러가지 화면을 보여줄수 있는 기능
			탭기능..





(5) Event
->운영체제에서 생기는 모든사건.
->Click

	1) 이벤트 소스 	//사건이 발생한 위치.(대부분 컴포넌트)
	2) 이벤트 클래스.(어떤 사건인지 알아내는것... 클릭인지 드래그인지 등등)
		java.util.EventObject
			java.awt.AwtEvent


	   [sub]
	 ActionEvent     : 컴퍼넌트가 활성화, 재료가 활성화되면 실행된다.
	 AdjustmentEvent : 스크롤바와 같이 조정 가능한 컴펀넌트에서 발생.
	 ComponentEvent	 : 
		ContainerEvent : 컨테이너에 다른 컴퍼넌트가 추가/삭제, 동적 디자인을 요구할때 발생하는 이벤트
		FocusEvent : 컴퍼넌트에 포커스가 들어왔을때 발생하는 이벤트.(텍스트박스)
		InputEvent : 입력받았을때,
			KeyEvent : 키보드 눌렀을때 발생
			MouseEvent :마우스 사용했을때 발생.
		PaintEvent: 컴퍼넌트가 다시 그려질때 발생하는 이벤트.(윈도창이 곂치는것을 생각하면된다 눈속임)
		WindowEvent:윈도우가 활성화하거나 닫힐 때. 줄이거나 닫을때.
	ItemEvent: List나 Choice처럼 선택항목이 존재하는 컴퍼넌트에서 발생.
	TextEvent: TextComponent에서 내용이 변화할 때 발생. 내용이 바뀔때마다.


	3)이벤트 핸들러 : 인터페이스
	-이벤트는 서로 중복되기 쉽상이다. 중복되는 이벤트중 선택을 하는것이 이벤트 핸들러다.
	-미리 만들어놓을수가 없는데... 어떻게 처리할까
	-상황에 따라 오버라이딩할 수 있도록!
	-이벤트 처리.
	-이벤트 클래스명 Listener
	-이벤트 소스와 이벤트핸들러의 연결
		이벤트소스.add이벤트 클래스명 Listenr(핸들러의 위치)
		

	4)이벤트 처리 방식
		-이벤트소스와 이밴트 핸들러가 같은 클래스인 경우
		-이벤트소스와 이밴트 핸들러가 다른 클래스인 경우, 모듈화.
		-내부 클래스 (중첩클래스)	//외부클래스를 독단적으로 사용할때.
		-무명 클래스 (신규문법, 즉석에서 한번 사용하겠다는 의미다.)


	5)Adapter 클래스
		-어댑터의 역할을 하는 클래스.. 중간에서 연결을 시켜주는 역할..
		-미리 인터페이스를 상속받아서 오버라이딩을 해놓는다.(이게 어뎁터 클래스.)
		-인터페이스와 클래스 사이에서 어뎁터(변환)
		-윈도우리스너 대신에 윈도우 어뎁터.
		-두개 이상되는것만 어뎁터가 있다. 단독인 경우는 어뎁터를 만들필요가 없징.




(6) 메뉴
	1)Pull-Down Menu(고정식)
		=>3가지클래스를 조립한다.

		-MenuBar	(메뉴가 들어서는 바)
		-Menu		(어떤 항목이 보이는지.. 실제 실행기능은없다)
		-MenuItem	(실제 실행기능)

	2)Pop-Up Menu(Context Menu) (이동식)
	=>마우스 우클릭!
	
	






#모듈화
-메서드를 만드는 이유중 하나.
-재사용이 확실해야함.
-유지보수에 용이
-연산속도 저하에 따른 성능저하.



인스턴스를 생성했을때
현재의 인스턴스와 구분하기 위해서
현재 인스턴스 =this


#메듈화
-가독성을 위해서 모듈화를 하기도 한다.

