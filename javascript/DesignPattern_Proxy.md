# Proxy


## Info
사용자가 원하는 행동을 하기 전에 한번 거쳐가는 단계
(대리인을 통해 전달한다는 의미)<br>

- 사용자의 요청을 캐싱할 수 있다.
- 에러를 잡을 수 있다.
- 사용자의 요청을 왜곡하여 다른 동작을 하도록 할 수 있다.
- 대리인처럼 중간단계를 거쳐 원래 타겟에게 전달하는 패턴
- 중간에 정보를 왜곡할 수 있다.
- Lazy Initialization (게으른 초기화) 로 어플리케이션의 부하를 줄여준다.


```js

var Server = (function(){

    function Server(){};
        Server.prototype.send = function(msg) {
        console.log('Server',msg);
    }
    return Server
})
var ProxyServer = (function() {
    function ProxyServer(master) {
        this.master = master;
        this.server = new Server();
    }
    ProxyServer.prototype.send = function(origin) {
        /**
        1.캐싱
        2.데이터 가공
        3. 필터링
        4. 예외처리
        **/
        console.log('orgine Request', origin)
        var fakeData = 'fake'
        this.server.report(fakeData);
    }
    return ProxyServer;
})();

var server = new ProxyServer();
server.send('originData');

```