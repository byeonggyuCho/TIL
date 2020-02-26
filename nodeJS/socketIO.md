

## intro
websocket이란 웹 서버와 웹 브라우저간 실시간 양방향 통신환경을 제공해주는 실시간 통신 기술입니다. 양방향으로 원할때 요청을 보낼 수 있으며 stateless한 HTTP에 비해 오버헤드가 적으므로 유용하게 사용할 수 있습니다.

전형적인 브라우저 렌더링 방식은 HTTP 요청(HTTP Request)에 대한 HTTP 응답(HTTP Response)을 받아서 브라우저의 화면을 깨끗하게 지우고 받은 내용을 새로 표시하는 방식이다. 내용을 지우고 다시 그리면 브라우저의 깜빡임이 생기게 된다. 이러한 깜빡임 없이 원하는 부분만 다시 그리며 실시간으로 사용자와 상호작용하는 방식이 나타나고 사용자와 상호작용하는 웹 서비스를 선호하는 사용자가 증가하면서 RIA(Rich Internet Application) 기술의 발달이 촉진되었다.  

상호작용하는 웹 서비스를 위해 숨겨진 프레임(Hidden Frame)을 이용한 방법이나 Long Polling, Stream 등 다양한 방법을 사용했다. 그러나 이러한 방식은 브라우저가 HTTP 요청를 보내고 웹 서버가 이 요청에 대한 HTTP 응답를 보내는 단방향 메세지 교환 '규칙'을 변경하지 않고 구현한 방식이다. 그렇기 때문에 상호작용하는 웹 페이지를 복잡하고 어려운 코드로 구현해야 했다. 

보다 쉽게 상호작용하는 웹 페이지를 만들려면 브라우저와 웹 서버 사이에 더 자유로운 양방향 메시지 송수신(bi-directional full-duplex communication)이 필요하다. 그래서 HTML5 표준안의 일부로 WebSocket API(이후 WebSocket)가 등장했다.

## WebSocket 프로토콜

## REF
- [WebSocket과 Socket.io](https://d2.naver.com/helloworld/1336)
- [](http://www.secmem.org/blog/2019/08/17/websocket-socketio/)
- [HTTP에서부터 WEBSOCKET까지](https://medium.com/@chullino/http%EC%97%90%EC%84%9C%EB%B6%80%ED%84%B0-websocket%EA%B9%8C%EC%A7%80-94df91988788)