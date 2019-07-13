
## (3)자바에서 지원하는 네트워크 관련 클래스.
	1)java.net.*	패키지.

	InetAddress	(IP를 클래스화 시킨것.)


	*네트워크 명령어.
		  ipconfig
		  ping ip주소 or 도메인주소.
		  nslookup ip주소 or 도메인주소 (도메인이름을 구별해주는 서버.)
		  


	2)InetAddress
	3)TCP
		
		클라이언트가 요청(request)하면 서버가 응답한다.
		서버에는 소켓이있는데 이 안에 아이피와 포트를 주고받을 수 있는 기능이 있음
		서버는 소켓을 준비하고 기다린다 (Listening)
		포트를 공개하고 아이피를 열어 놓으면 소켓을 통해 서버의 프로그램으로 접근할 수 있다.
		
		클라이언트도 포트와 서버의 정보를 가진 소켓이 있다.
		이 서로간의 소켓을 통해 연결이 이루어진다.
		
		*서버용소켓.
		-손님을 맞이하는 역할만한다.
		-손님을 맞고 바로 접속을 끊어버린다.
		-그리고 끊기전에 '다른 소켓'(클라이언트형소켓, 데이터형소켓)으로 데이터를 넘긴다.
		-그리고 다른 클라이언트를 맞이한다.
		
				
		
		-Socket		(아이피와 포트를 주고받을 수 있는것)
		-ServerSocket	


	4.URL   (웹에서 정보를 읽어오기 위한기능이 있는 클래스)


	5.UDP	-DatagramSocket, DatagramPacket

	->연결을 깔지않고 그냥 데이터를 보낸다.(어떻게 이게 가능할까?)
	->데이터안에 주소를 넣어둔다.
	->이때의 데이터를 패킷(헤더정보, 누가보냈고 등등의 정보가 담긴것)의 형태로 보낸다.
	->패킷을 보낼때 이 패킷을 분할해서 보낸다.그리고 패킷을 다 다운받아서 사용한다.

	=>서버용소켓, 클라이언트형소켓의 구분이없이 하나의 소켓만 있다.
	=>데이터를 보낼때 담아서 보내야하는데 데이타그램 패킷으로 담아서 보낸다.	
	
	
	DatagramPacket(byte[] buf, int length)
	=>받을때


	DatagramPacket(byte[] buf, int length, InetAddress address, int port)
	=>보낼때, 3~4번째 인자가 받는이에 대한정보.