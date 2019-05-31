

## Swing
1) javax.swing.*

	=>javax는 나중에 나온기능이라고 보면됩니다. (x extend)
	=>끄는 엑스버튼 기능이 자동추가되었다. (그러나 종료는 아니다. 주의..)


	*이미지처리 : 이미지를 저장하기 위한 저장공간
	(ImageIcon)
	-이미지 삽입 : 기준 위치가 프로그램의 위치.(일종의 상대경로)
	getClass() : 프로그램의 시작주소를 가지고 있다.
	getResource() : src폴더로 접근한다.(src : 소스를 모아놓은 폴더)

	setIcon():버튼에 이미지를 띄워주는 메서드
	setpressedIcon 눌렀을때 다른이미지로.

	*윈도우 종료기능.
	=>별도의 이벤트클래스없이 종료를 할수 있다.
	=> setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	



