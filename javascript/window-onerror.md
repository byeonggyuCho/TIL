# window.onerror

클라이언트 사이드의 에러를 서버에서 확인하는 손쉬운 방법을 소개합니다.  

window.onerror는 글로벌 try...catch문처럼 동작하면서 예외를 잡을 수 있습니다.

window 객체의 onerror 이벤트에 콜백함수를 할당하면 됩니다.
```js
window.onerror = function(msg, url, lineNO, columnNo, error){
//error report

return false;
}
```

에러가 발생했을 때 콜백함수에 다음 매개변수가 전달됩니다.

1. msg : 에러메세지
    - i.g. "Uncaout ReferenceError: foo is not defined"
2. url : 에러가 발생한 문서의 URL
    - i.g.  "/dist/app.js"

3. lineNo : The line number
4. columnNo  : The column number
5. error : The Error object

- Uncaught exceptions
    - throw "some message"
    - call_something_undefined()
    - cross_origin_iframe.contentWindow.document, a security exception
- Compile error
    - `<script>{</script>`
    - `<script>for(;)</script>`
    - `<script>"oops</script>setTimeout("{", 10)`, it will attempt to compile the first argument as a script


<br><br>
## 2. try/catch를 이용하여 stack 속성 획득하기.

window.onerror를 통해 에러를 캣치할 수 있지만 디버깅에 가장 중요한 error stack을 알 수없다.

대안으로 다른 에러 추적방법을 소개한다.

우선 에러 발생시 서버로 전송하기 위해  captureError함수를 만든다.
```js
function captureError(ex) {
  var errorData = {
    name: ex.name, // e.g. ReferenceError
    message: ex.line, // e.g. x is undefined
    url: document.location.href,
    stack: ex.stack // stacktrace string; remember, different per-browser!
  };
  $.post('/logger/js/', {
    data: errorData
  });
}
```
```js
function invoke(obj, method, args){
  try{
    return obj[method].apply(this, args)
  } catch(e) {
    captureError(e)// report thre error
    throw e;	
  }

}
invoke(Math, 'highest', [1, 2]); // throws error, no method Math.highest
```
에러가 발생했을 때 catch스코프안에 captureError를 넣는 로직이 상당히 번거롭다.

이런 번거로움을 줄이기 위해 wrapErrors를 만들었다.
```js
    function wrapErrors(fn) {
    	if (!fn.__wrapped__) {
    		fn.__wrapped__ = function() {
    			try {
    			} catch(e){
    				captureError(e);
    				throw e;
    			}
    		});
    	}
    	
    	return fn.__wrapped__;
    }
    
    var invoke = wrapError(function(obj, method, args) {
    	return obj[method].apply(this,agrs)
    });
    
    invoke(Math, 'highest',[1,2])
```
자바스크립트는 싱글스레드기 때문에 wrap함수를 모든곳에 사용할 필요는 없다.

새로운 스택이 시작될 때만 사용하면 된다.

다음과 같은 상황에서 사용할 수 있다.

- 어플리케이션을 시작할때
    - i.g. document.ready
- 이벤트 핸들러
    - i.g. elements.addEventListener
- 타이머 콜백
    - i.g. setTimeout, requestAnnimationFraem
```js
$(wrapErrors(function () { // application start
  doSynchronousStuff1(); // doesn't need to be wrapped
  setTimeout(wrapErrors(function () {
    doSynchronousStuff2(); // doesn't need to be wrapped
  });
  $('.foo').click(wrapErrors(function () {
    doSynchronousStuff3(); // doesn't need to be wrapped
  });
}));
```
이렇게 wrapper 함수를 씌우는것 자체가 번거롭게 느껴진다면 오픈소스 라이브러를 사용할 수 있다.

log it tor a file or store it in a database

### 고려사항

1.window.onerror 는 콘솔에서 바로 실행되지 않는다.

setTimeout을 통해 실행된다.

2. 다른 라이브러리에서 window.onerror를 사용하는것을 어떻게 해결할것인지?

3. window.onerror는 같은 context를 갖지 않는다.

4. 서버에 배포된 파일이 minifed됐으면 lineNumber를 찾을 수 없다.

- Error: 'a'is undefined Script : build.js Line:3

5. error 객체에 stack property를 표시하기 위해선 어떻게 해야할까?

- 라이브러리 (i.g. stacktrace.js)
- helper method (i.g invoke)


## REF

[https://blog.sentry.io/2016/01/04/client-javascript-reporting-window-onerror](https://blog.sentry.io/2016/01/04/client-javascript-reporting-window-onerror)

[https://dzone.com/articles/capture-and-report-javascript-errors-with-windowon](https://dzone.com/articles/capture-and-report-javascript-errors-with-windowon) 

[https://danlimerick.wordpress.com/2014/01/18/how-to-catch-javascript-errors-with-window-onerror-even-on-chrome-and-firefox/](https://danlimerick.wordpress.com/2014/01/18/how-to-catch-javascript-errors-with-window-onerror-even-on-chrome-and-firefox/)

[https://dev.opera.com/articles/better-error-handling-with-window-onerror/](https://dev.opera.com/articles/better-error-handling-with-window-onerror/)