
# How doen browser work?

![](/resource/img/javascript/browerEnv.png)  

## 1.java Script runTime Evironment
자바스크립트는 자바스크립트 엔진 외에 다양한 실행환경 속에서 실행된다. 따라서 이런 실행환경에 대한 이해가 있어야 정확한 실행흐름을 생각하고 효과적인 소스를 작성할 수 있다.



### 1.1 Javascript Engine
#### 1.1.1 Call Stack
자바스크립트는 하나의 호출 스택을 사용한다. 이러한 특징 때문에 자바스크립트의 함수가 실행되는 방식을 "Run to Completion"라고 한다. 이는 하나의 함수가 실행되면 이 함수의 실행이 끝날 떄까지 다른 어떤 task도 수행될 수 업ㅁㅅ다는 의미이다. 요청이 들어올 때마다 해당 요청을 순차적으로 호출 스택에 담아 처리한다. 메소드가 실행될때, 호출스택에 새로운 스택 프레임이 push생기고 실행이 끝나면 해당 프레임이 pop뙤는 원리다.

#### 1.1.2  Heep
똥적으로 생성된 객체는 `heap`에 할당된다. 구주화되지 않은 더비같은 메모리 영역을 `heap`이라 표현한다.

### 1.2 Web APIs
- DOM Events
- AJAX	(XMLHttpRequest)
- Timer



### 1.3 Task Queue(Event Que)

자바스크립트 실행환경에서는 처리해야하는 Task들을 임시적으로 저장하는 Queue가 존재한다. 그 Queue를 Task Que라고 한다. 그리고 Call Stack이 비어졌을 때 대기열에 들어온 순서대로 수행된다.
```js
 setTimeout(function(){
	 console.log(1);
 },0)
 console.log(2);

 //2
 //1
```
위 실행결과는 비동기로 호출되는 함수들이 `Call Stack`에 쌓이지 않고 `Task Queue`에 적재된다. 자바스크립트에서는 이벤트에 의해 실행되는 함수들이 비동기로 실행된다. 자바스크립트 엔진이 아닌 Web API로 분류되는 함수들은 비동기로 실행된다.


```js
function fn1() {
	console.log(1)
	fn2();
}

function fn2() {
	let timer = setTimeout(function callbackFn(){
		console.log(2)
	},0);
	fn3();
}

function fn3(){
	console.log(3)
}

fn1();
//1
//3
//2

```
위 코드를 설명하면 `setTimeout`함수가 실행되고 `Call Stack`에 적재된다음 바로 빠져나온다. 그리고 내부에 걸려있던 핸들러는 콜스택에 들어가서 바로 실행되지 않는다. 이 핸들러는 콜스택영역이 아닌 이벤트큐 영역으로 들어간다. 그 다음 `fn3()`가 콜스택으로 들어간다.   

`fn3()`가 실행되면서 3이 찍히고 작업을 모두 마친 `fn3`가 콜스택에서 사라진다. 이어서 `fn2`와 `fn1`이 콜스택에서 비워지면서 콜스택이 완전히 비워지게된다. 바로 이 시점에 `Task Queue`에서 대기중인 task를 꺼내와 `Call stack`에 적재한다. 위 예제에서 이 Task가 `setTimeout`의 콜백인 `callbackFn`가 된다. 이제야 이 콜백함수가 실행되면서 콘솔에 2가 찍힌다.  

즉 `call stack`에 적재된 모든 함수가 종료된 뒤 `Event Loop`가 `Taks Queue`에서 콜백함수를 가져와 call Stack에 적재하고 실행시킨다.
그러므로 이벤트에 걸려있는 핸들러는 절대 먼저 실행될 수 없다.

```js
while (queue.waitFormessage()) {
	queue.processNextMessage();
}
```
이런 식으로 이벤트 루프는 현재 실행중인 타스크가 없는지와 `Task Queue`에 타스크가 있는지를 반복적으로 확인한다.
`Task Queue`에 처리해야할 작업이 존재하면 While루프안으로 들어가서 해당하는 이벤트를 처리하거나 작업을 수행한다 그리고 다시 `Task Queue`로 돌아와 새로운 이벤트가 존재하는지 파악하는 것이다. Task Queue에서 대기하고 있는 작업들은 한번에 하나씩 콜스택에 호출되어 처리된다.  

위 코드의 `waiteForMessage()`는 현재 실행중인 Task가 없을 때 다음 Task가 Task Queue에 추가될 떄까지 대기하는 역할을한다. 이런 식으로 이벤트 루프는 현재 실행중인 Task가 없는지, TaskQueue에 Task가있는지를 반복적으로 확인한다. 

- 모든 비동기 API들은 작업이 완료되면 콜백 함수를 Task Queue에 추가한다.
- 이벤트 루프는 현재 실행중이 Task가 없을때 주로 호출 스택이 비워졌을 떄 Task Queue의 첫번째 Task를 꺼내와 실행한다.



### 1.4 Event Loop
**특징**
- Single Thread
- HTML 스팩

**수행역할**  
1. 완료된 비동기API의 작업이 끝나면 콜백을 전달받아 Task Queue에 넣는다.
2. 현재 실행중인 타스크가 없으면 (호출스택이 비면)  `Task Queue`에서 타스크하나 가져와 `Call stack`에 추가한다.

**설명**  
`Event Loop`는 자바스크립트 런타임의 중심에서 `Call Stack`과 백그라운드 간의 업무처리를 돕는 중개자 역할을 한다.  
싱글스레드 환경의 자바스크립트 엔진과 상호연동하기 위한 장치이다.
현재 실행중인 태스크가 없을 때 (주로 호출 스택이 비워졌을 때) `Task Queue`의 첫 번째 태스크를 꺼내와 실행한다.





## 2.비동기API의 실행흐름.


### 1.Background
수 많은 작업을 하는 별개의 일종의 멀티 스레드이다. 
엔진이 코드를 수행하는 동안 API호출을 통해 전달받은 작업을 멀티스레드에서 동시다발적 수행한다.  
`Call Stack`에서 받은 명령을 `Call Stack`이 진행되는 동안  수행한다(이를 통해 동시성 연출)

**실행순서**  
1. 백그라운드 작업이 끝나면 전달받은 콜백을 `Event Loop`에 전달한다.
2. 각 백그라운드 작업을 마치면, 비동기API (i.g.setTimeout)가 호출될 때 전달받은 콜백함수를 타스크 큐에 삽입하기 위해 `Event Loop`에 전달한다.
	`setTiemout(fn,1000)`인 경우 10초를 계산하는 곳이 이 백그라운드다.
3. 백그라운드에서는 연산이 끝나면 `Evnet Queue`로 연산결과를 보낸다.
4. 비동기 db조회를 예를 들자면, 디비 통신이 끝난시점에 태스크큐에 콜백함수와 DB조회결과가 이동한다고 보면된다.( ajax요청,이벤트 리스너, 파일리더 등)
5. 백그라운드는 비동기 api가 작업을 완료하면 콜백 함수를 `Task Queue`에 추가한다.

**역할**  
1) 타임작업(setTimeout) : 타임동작이 끝나면 함께 받은 콜백을 전달한다.
2) Event Listener : 이벤트를 감지하면 전달받은 콜백을 전달한다.
3) Promise : 프로미스 안에 담긴 작업을 수행 완ㄹ하면 then()으로 전달받은 콜백을 전달한다.




### 4.Micro Task Queue
- 프로미스의 then() 메소드는 콜백메서드를 `Micro Task Queue`에 추가한다. `Event Loop`는 `Task Queue`전에 `Micro Task Queue`가 비었는지 확인한다. 즉 `Task Queue`보다 실행 우선순위가 높다.(HTML 스펙의 perform a microtask checkpoint 참조.)
 프로미스는 자바스크립트의 스펙이지만 `Micro Task Queue`는 Html의 스펙이다. 이 연관관계는 불명확하다.


```js
setTimeout(function callbackA() { 
    console.log('A');
}, 0);

Promise.resolve()
.then(function callbackB() { 
    console.log('B');
}).then(function callbackC() { 
    console.log('C');
});
```

쉽게 말해 일반 타스크보다 더 높은 우선순위를 갖는 타스크라고 할 수 있다. 즉 `Task Queue`에 대기중인 타스크가 있더라도 `Micro Task`가 먼저 실행된다.
이벤트 루프는 `Task Queue`대신 `Micro Queue`가 비었는지 먼저 확인하고 큐에 있는 콜백B을 실행한다. 콜백B가 실행되고 나면 두번째 `then()`메소드가 콜백C를 `Micro Task Queue`에 추가한다. 이벤트 루프는 다시 `Micro Task Queue`를 확인하고 큐에 있는 콜백C를 실행한다. 이후에 `Micro Task Queue`가 비었는지 확인한다음 `Task Queue`에서 콜백A를 꺼내 실행한다.


### Message Polling

### setTimeout()의 두번째 파라미터는 '최소'지연시간을 보장한다.
이 말은 호출스택에 현재 실행중인 함수가 있을 경우에 대기 해야함을 의미한다.
	
### setTimeout(fn,0)의 의미에 대해서.
브라우저 환경에서는 자바스크립트 엔진뿐만 아니라 다른 여러가지 프로세스가 함께 구동된다. 따라서 실행흐름이 JS엔진 외에 Web API등의 다른 프로세스가 개입했을 때 실행흐름을 착각할 수 있다.
 예를들면 랜더링 엔진같은 경우가 JS와 별도로 동작하는데 렌더링 엔진의 태스크는 자바스크립트 엔진과 동일한 단일 태스크 큐를 통해 관리된다.
따라서 렌더링요청을 보내면 태스크 큐로 이동하게 되고 태스크큐는 호출스택이 비워지기를 기다린다. 이로 인해 렌더링시점이 달라질 수 있다.
 이때 `setTimeout(fn,0)`을 이용해서 `Call Stack`에 쌓여있을 스택들을 `Task Queue`로 보내면 원하는 방향으로 실행흐름을 만들 수 있다.



### Job que

### 자바스크립트의 잡 큐를 어떻게 `Event Loop`와 연동할까

### 최적화를 위한 프로그래밍
- v8엔진의 구동원리에 대한 이해.
- 히든 클래스
- 동적프로그래밍은 추가비용이 발생한다. 미리 알 수 있는 정보들은 미리 정의하는게 가장 좋다.

1. 객체 속성정의는 가능한 객체 생성시점에서 한다.  
 동적속성을 추가할시에 추가되는 속성의 순서를 맞춰주는게 더 빠르다.
2. 여러가지 함수를 호출하는것보다 한가지 이미 호출되었던 함수를 반복 호출하는것이 낫다.  
함수를 SOLID 원칙에 따라 정의해서 재활용성을 높혀라. 동적 속성추가는 비용이 많이 든다.


##  용어정리.

### 메모리 힙 :
- 동적으로 만들어진 변수와 객체에 대한 메모리에 할당되는 곳
- 두조화 되지 않은 더미같은 메모리 영역


### 호출 스택(Call Stack)
- 코드가 실행될 때 호출 스택에 순차적으로 쌓인다. LIFO(Last In First Out) 구조
- Run to Completion : 하나의 함수가 실행되면 함수 실행이 끝날 때까지 다른 타스크가 실행될 수 없다.

### 스택프레임
- 콜 스택에 쌓이는 하나의 스택을 말한다.
### 스택 트레이스
- 예외가 발생했을 때 `Call Stack`의 상태.
- 즉 에러발생 시점의 콜 스택의 구조를 확인함으로써 함수 호출과정을 통해 디버깅할 수 있다.

### 스택 날림(Blowing the stack)
- 스택 오버플로우가 발생했을때 스택을 날리는 현상을 말한다.

### 세션스택
- 웹앱의 실행과정을 순차적으로 기록하고 확인가능한 서비스, 유로다.

### 스택 오버플로우
- Uncaught RangeError: Maximum call stack size exceeded
- 호출 스택에 스택이 너무 많이 쌓여서 허용범위를 넘어서 범람했을때 나는 오류

### 비동기 콜백
- 단일 스택, 싱글 스레드 환경에서 동시성(Concurrency)을 연출하기위한 방법중 하나.
- 만일 콜 스택에 수행시간이 긴 함수가 있을때 싱글 스레드 환경에서 끊김없는 환경을 연출하려면 어떻게 해야할까




### 참고
- [javascript Runtime](http://jaynewho.com/post/25)
- [Event Loop란?](https://meetup.toast.com/posts/89)
- [Evnet Loop를 이용한 동시성](https://developer.mozilla.org/ko/docs/Web/JavaScript/EventLoop)
- [자바스크립트의 Event Loop](https://asfirstalways.tistory.com/362)
- [브라우저는 어떻게 동작할까?](https://d2.naver.com/helloworld/59361)