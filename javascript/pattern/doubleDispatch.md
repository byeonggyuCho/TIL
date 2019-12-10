# Double Dispatch

## Intro
- 상태패턴
- 데코레이터 패턴.


```js
function Alert( $msg ){
 
  //스스로를 재정의한다.
  Alert = function( $msg ){
    var result;
    result = {_msg:$msg, action:action};
    return result;
  };
 
  function action(){
    alert( this._msg );
  }
 
  return Alert( $msg );
}
 
var temp = Alert( "hello" );
temp.action(); //hello

```


```js
var logger = (function(){

    //dom로딩여부 체크
    var isLoaded = false;

    //로딩되지 전까지 이 배열에 로그를 담겠음.
    var queue = [];


    //돔이 로딩됐는지 체크
    if(document){
        isLoaded = true;
    }


    //반환될 래퍼객체.
    var wrapper = {
        log: function log(msg){
            if(!isLoaded){
                queue.push(msg);
                return;
            }

            var logDiv = document.querySelector("#log");

            if( que.length > 0){
                logDiv.innerHTML = queue.join('<br>');
            }

            //dom로딩이 됐으니 재정의
            wrapper.log = function log(msg){
                logDiv.innerHTML += (msg +'<br>');
            };
        }
    };

    return wrapper;
})()


logger.log("aaaa")
```

1. 익명함수가 wrapper를 호트스코드에게 포인터로 알려준다.
2. 호스트코드에서는 warpper를 직접 사용하지 않고 log를 통해 사용함으로서 런타임에는 내부 포인터 참조연산을 매번 새로 해준다.


전달된 포인터와 호스트 코드가 사용하는 포인터가 다르기떄문에 랩퍼 내부에서 log에 할다될 객체를 교체해도 호스트코드에서는 알지 못한다.


## REF 
- [자바스크립트 클래스](https://www.bsidesoft.com/?p=320#%25ec%259e%2590%25eb%25b0%2594%25ec%258a%25a4%25ed%2581%25ac%25eb%25a6%25bd%25ed%258a%25b8-%25eb%25aa%25a8%25eb%2593%2588)