##  What is the value of foo.x and why?
```js
var foo = {n: 1};
var bar = foo;
foo.x = foo = {n: 2};
```

## What is a promise?
promise는 값이 resloved인지 not resolved인지 상태를 반환해주는 객체다. not resolved인 경우에는 그 이유를 함께 반환한다.
문법은 아래와 같음

```js
const promise = new Promise(function(reslove, reject) {

})

```

## Why do you need a promsie?
`promise`문법은 비동기 연산을 다룬다. Callback 패턴에 대한 대안으로 사용되며 callback Hell을 줄이고 클린코드를 작성할 수 있게 도와준다.


## Why do you need callbacks?
자바스크립트 엔진이 single Thread 환경에서 Event-driven방식으로 실행되기 때문에 callback은 반드시 필요하다.
이 말은 자바스크립트가 이벤트의 응답을 기다리는 시간동안에 다른 작업을 수행할 수 있다는 것을 의미한다.

```js
function firstFunction(){
  // Simulate a code delay
  setTimeout( function(){
    console.log('First function called');
  }, 1000 );
}
function secondFunction(){
  console.log('Second function called');
}
firstFunction();
secondFunction();

// Second function called
// First function called
```
만약 자바스크립트에서 callback함수를 사용하지 않고 모든 함수가 동기적으로 실행됐다면 `secondFunction`은 `firstFunction`이 종료된 뒤에 실행되어야한다. 하지만 비동기실행환경에서 `firstFunction`의 응답이 오기전에 `secondFunction`이 실행됐음을 알 수 있다.

## What are thre main rules of promise?
1. promise는 thenable 객체이어야한다.
2. `pending`상태인 promise는 `fulfilled`이나 `rejected`상태로 변경될 수 있다.
3. `fulfiled`혹은 `rejected`상태의 promise는 다른 상태로 변경될 수 업다.
4. 일단 promise의 상태가 정해지면 value는 변하지 않는다.



## What is promise chaining?
Promise를 이용하여 비동기작업을 순차적으로 실행하는것을 promise chaine이라고 한다. 

```js
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000);

}).then(function(result) {

  console.log(result); // 1
  return result * 2;

}).then(function(result) {

  console.log(result); // 2
  return result * 3;

}).then(function(result) {

  console.log(result); // 6
  return result * 4;

});

```

## What ar the pros and cons of promisses over callback?

1. 장점  
- callback hell을 피할 수 있다.
- `then()`메서드를 이용해서 순차적인 비동기 코드를 작성하기 쉽다.
- `Pomiseall()`을 이용해서 병렬적으로 실행되는 비동기코드를 작성하기 쉽다.
- 콜백의 몇가지 문제를 해결할 수 있다. (콜백 요청이 너무 늦는것, 너무 빠른것, 에러가 여러번 호출되는 것)

2. 단점  
- 코드가 약간 복잡하다.
- ES6를 지원하는 환경아 아니라면 polyfill이 필요하다.


## What is strict mode? What are some of the advantages/disadvantages of using it?
Strict Mode는 ES5에서 새로 나온 기능으로 함수나 JS프로그램이 보다 엄격한 문맥에서 동작하도록 하는 기능이다. 
Strict Mode를 사용하면 에러가 발생하는 동작을 막을 수 있다.  
String Mode는 나쁜 구문을 실제 에러로 알려주어 안전한 자바스크립트를 작성하는데 도움을준다. 



## What is sever-sent events?
Server-sent events는 브라우저가 polling에 의존하지 않고 HTTP를 통해 서버로부터 자동 업데이트를 수신할 수 있는 서버 push기술이다. SSE는 서버에서 클라이언트로만 흐르는 단방향 통신 채널이다.



##  What does the following code print?
```js
console.log('one');
setTimeout(function() {
  console.log('two');
}, 0);
Promise.resolve().then(function() {
  console.log('three');
})
console.log('four');

```


###  What is the difference between these four promises?
```js
doSomething().then(function () {
  return doSomethingElse();
});

doSomething().then(function () {
  doSomethingElse();
});

doSomething().then(doSomethingElse());

doSomething().then(doSomethingElse);
```

첫번째는 `doSomethingElse`의 반환값이 Promise value로 전달된다.
두번째는 `doSomethingElse`이 실행되고 반환값은 null이다.
세번째는 `doSomethingElse`이 함수를 를 반환하고 반환된 함수가 then 메서드의 콜백으로 실행된다.
네번째는 `doSomethingElse`가 실행되며 매개변수로 `doSomething`의 결과값이 전달된다.

###  What will the code below output to the console and why?
```js
(function(){
  var a = b = 3;
})();

console.log("a defined? " + (typeof a !== 'undefined'));
console.log("b defined? " + (typeof b !== 'undefined'));
```


###  Consider the two functions below. Will they both return the same thing? Why or why not?
```js
function foo1()
{
  return {
      bar: "hello"
  };
}

function foo2()
{
  return
  {
      bar: "hello"
  };
}

```


## What is a service worker?

## What is IndexedDB?



## Explain how this works in JavaScript.

## Can you give an example of one of the ways that working with this has changed in ES6?

## Explain how prototypal inheritance works.

## What's the difference between a variable that is: null, undefined or undeclared?
- How would you go about checking for any of these states?

## What is a closure, and how/why would you use one?
closure는 외부 함수의 문맥을 참조하는 내부함수를 의미한다. 변수 밀실화를 위해 사용될 수 있다.

## What language constructions do you use for iterating over object properties and array items?
- Can you describe the main difference between the Array.forEach() loop and Array.map() methods and why you would pick one versus the other?
## What's a typical use case for anonymous functions?
```js
function delaySayHello(msg){
  return setTimeout(function(){
    console.log(msg);
  },0)
}
```

## What's the difference between host objects and native objects?


## Explain the difference between: function Person(){}, var person = Person(), and var person = new Person()?

`function Person(){}`는 함수객체를 생성한다.  
`var person = Person()`함수의 반환값을 변수에 할당한다.  
`var person = new Person()`은 새로운 객체를 생성하고 Person Sope 문맥의 this를 새롭게 생성한 객체로 바인딩하여 리턴한다.


## Explain the differences on the usage of foo between function foo() {} and var foo = function() {}
`function foo() {}`은 함수 선언문을 의미한다. 실행과 동시에 초기화되며 호이스팅 대상이다.
`var foo = function() {}`은 함수 표현식이다. 변수 foo는 호이스팅되지만 초기화 되지 않아 호이스팅 되더라도 함수로 실행이 불가능하다.

## Can you explain what Function.call and Function.apply do? What's the notable difference between the two?

`Function.prototype.call`
`Function.prototype.apply`


## Explain Function.prototype.bind.
파라미터로 전달된 인자를 `this`에 할당한 랩퍼 함수를 반환합니다.
```js
var foo = function(){
  var name = "";
  console.log(name)
}

var personInfo = {
  name : "sam"
}

var newFoo = foo.bind(personInfo);

newFoo.sayHelloe();

```

## What are the differences between cookie, local storage and session storage?

**Feature** | **Cookie** | **Local storage** | **Session storage** 
---|:---:|:---:|:---:
Accession | Server& client|client|client
Lifetime | As configured using Expires option | until deleted | until tab is closed
SSL support | Supported | Not supported | Not supported
Maximum data size | 4KB | 5MB | 5MB


## What is main difference between localStorage and session Storage?
LocalStorage는 브라우져가 닫혀도 유지가 되지만, Session storage는 페이지 세션이 종료되면 데이터가 날아간다.


## Why do you need web storage?
Web storage는 Cookie보다 안전하고 더 많은 데이터를 저장할 수 있으면서 웹사이트 성능에 영향을 주지 않는다. 또 데이터가 서버로 전달되지 않는다. 

## What's the difference between feature detection, feature inference, and using the UA string?

## Explain "hoisting".
호이스팅은 변수와 함수 선언이 코드 실행전에 해당 스코프의 최상단으로 이동하는 것을 말합니다. 호이스팅은 선언만 이동하고 초기화는 되지 않습니다. 따라서 호이스팅된 변수와 함수는 `undefinded`상태 입니다. 

```js

console.log(name)
var name = 'cater';
```
위 코드는 실제 실행에서 아래 코드처럼 동작합니다.
```js
var name;
console.log(name);
name = 'cater';
```


## What is prototype chain?
자바스크립트에서 객체는 자신의 원형이되는 Prototype Object에 대한 link를 갖습니다.  
프로토타입 체인이란 객체의 속성이나 메서드에 접근할때 prototype link를 참조하여 prototype object의 속성과 메서드를 함께 탐색하는 것을 말하빈다.

## What is a first class function?

## What is unary function?

## How do you redeclare variables in switch block without an error?

## What is Temporal Dead Zone?

## What is the benefit of using moudules?
js파일의 호출순서와 namespace문제에서 벗어날 수 있습니다.

## What is an evnet flow?
Event Flow는 웹 페이지에서 이벤트를 수신하는 순서이다. 

### Ref
- [javascript evnet flow](tutorialspark.com/javascript/JavaScript_Event_Flow.php) 


## What is event bubbling?
![](/resource/img/javascript/bubbling.png)  
이벤트가 돔 트리에서 최하위 노드에서 시작했을 때 이벤트는 최상위 노드까지 확산된다. 브라우저는 특정 화면 요소에서 이벤트가 발생했을 때 이벤트를 최상위 요소까지 이벤트를 전파한다(버블링)

## What is event capturing?
![](/resource/img/javascript/capturing.png)  
event Bubbling의 반대의 경우를 event capturing이라고 한다.  최상위 노드에서 이벤트가 발생하고 최하위 노드까지 이벤트를 전달한다.  현대 브라우저에서는 event capturing이 막혀 있다. 따라서 이런 동작을 해야할 때는 event bubbling으로 구현해야 한다. 

## How to prevent event bubbling?
`e.stopPropagation()`를 사용하면 이벤트 전달을 중단한다. 이벤트 버블링의 경우에는 클릭한 요소의 이벤트만 발생시키고 상위 요소로 전달하지 않는다.


## What is event delegation.
Event delegation(이벤트 위임), 하위 요소에 각각 이벤트를 붙이지 않고 상위 요소에서 하위 요소의 이벤트들을 제어하는 방식.  
하위 노드에서 발생하는 이벤트를 상위 노드에서 감지하여 처리하는 방식을 말한다. 하위 노드에 각각 이벤트를 할당해야하는 상황에서 상위노드로 이벤트를 위임함으로써 공통으로 제어할 수 있다.

```html
<html>
	<head>
		<style>
			html{border:5px solid red;padding:30px;}
			body{border:5px solid green;padding:30px;}
			fieldset{border:5px solid blue;padding:30px;}
			input{border:5px solid black;padding:30px;}
		</style>
	</head>
	<body>
		<fieldset>
			<legend>event propagation</legend>
			<input type="button" id="target" value="target">			
		</fieldset>
		<script>
		function handler(event){
			var phases = ['capturing', 'target', 'bubbling']
			console.log(event.target.nodeName, this.nodeName, phases[event.eventPhase-1]);
		}
		document.getElementById('target').addEventListener('click', handler, false);
		document.querySelector('fieldset').addEventListener('click', handler, false);
		document.querySelector('body').addEventListener('click', handler, false);
		document.querySelector('html').addEventListener('click', handler, false);
		</script>
	</body>
</html>
```


## What are PWA?
Progressive web applications은 웰을 통해 전달된 모바일 앱의 한 종류입니다. pwa는 일반적인 웹기술(HTML, CSS, javascript)을 사용해 만들어집니다. 이런 PWA들을 서버로 배포되어 URL로 접근 가능하고 검색엔진에서 검색이 가능합니다.


## What is an arguments object?
`arguments`객체는 함수에 전달된 인자에 접근할 수 있는 유사배열 객체입니다.  
```js
function sum(){
  var total = 0;
  for (var i = 0;, length = arguments.length; i< length; i++) {

  }
  return total;
}

sum(1,2,3)
```


## What are thre pros and cons of for loop?

1. 장점
- 모든 환경에서 작동합니다.  
- `continue`, `break` 연산자 사용가능.

2. 단점  
- 너무 장황합니다.

## What are the benefits of keeping declarations aat the top?
변수나 함수 선언은 스크립트 테그 최상단이나 함수 최상단에 선언하는 것을 추천합니다. 이에 대한 이점은 다음과 같습니다.  


1. 클린코드
2. 지역변수를 한눈에 볼 수 있음.
3. 글로벌 변수를 의도치않게 생성하는 걸 방지함.
4. 변수를 재선언하는 실수를 막을 수 있음.


## What are benefits of initializing variables?
1. 클린코드
2. 초기화된 변수를 한눈에 볼 수 있음.
3. 선언 안된 변수를피할 수 있음.



## How do get query string values in javascript?
`URLSearchParams`객체를 사용하면 queryString을 얻을 수 있습니다.
```js
const urlParams = new URLSearchParams(window.location.search);
const clientCode = urlParams.get('clientCode');
```

## What is tree shaking?
`tree shaking`은 불필요한 코드를 제거하는 하나의 양식입니다. 프로세스를 빌드할 때 사용하지 않는 모듈을 번들에 포함되지 않으며, 이를 위해 ES6 모듈 구문은 Static 구조를 가져야합니다. 


## What is the need of tree shaking?
애플리케이션의 코드 사이즈를 줄일 수 있습니다. 축소된 애플리케이션은 성능향상으로 이어집니다.


## What's the difference between an "attribute" and a "property"?  
`Attribute`는 HTML 마크업에 정의되어있는 반면 `property`는 DOM에 정의되어있다. 예를 들어 아래 HTML 엘리먼트는 2개의 `attribute`와 `value`를 가진다.
```html
<input type="text" value="Name:">
```
이 엘리먼트에 아래처럼 접근 가능하다.
```js
const input = document.querySelector('input');
console.log(input.getAttribute('value')); 
console.log(input.value); 
```
정리하자면 `attribute`는 HTML문서에 정의된 테그의 속성을 나타내는 요소이고, `property`는 HTML이 DOM으로 파싱되었을 떄 테그에 해당하는 DOM 노드의 속성을 의미한다.


## What is the difference between proto and ptototyupe?
`__proto__`는 객체의 메소드나 속성을 찾기 위해 prototype chaine을 하기 위해 사용되는 객체다.  
반면 `prototype`은 새로운 객체를 만들 때 `__proto__`를 부여하기 위한 속성이다.


## What are the pros and cons of extending built-in JavaScript objects?

## What is the difference between == and ===?
`===`은 추가적으로 자료형을 비교하여 자동 형변환에 의한 모호함을 제거할 수 있다.
```js
var a = 1;
var b = '1';

console.log(a == b);    //true
console.log(a === b);   //false
```

## Explain the same-origin policy with regards to JavaScript.
`same orgin policy`는 자바스크립트가 다른 도메인에 요청하는 것을 막는 정책이다. 여기서 `origin`이란 URI스키마, hostname과 포트번호의 조합을 말한다. 이 정책은 다른 페이지의 악의적인 스크립트가 DOM을 이용하여 다른 사이트의 데이터를 얻는 것을 막을 수 있다.


## What is the purpose of void 0?
Void(0)은 페이지가 리프레쉬 되는것을 막기위해 사요오딘다. `void(0)`은 사이드 이팩트를 막는데 도움이 된다. 이 코드는 일반적으로 HTML document 엘리먼트에 `herf=JavaScript:Vide(0);`를 넣어서 사용된다. 아래 예는 이 코드를 사용하여 브라우저 리프레쉬를 막는 예이다.
```js
<a href="JavaScript:void(0);" onclick="alert('Well done!')">Click Me!</a>
```


## Is JavaScript a compiled or interpreted language?
자바스크립트는 컴파일언어가 아닌 인터프린트 언어다. 브라우저에서 인터프린터는 자바스크립트 코드를 읽고 각 라인을 해석한 뒤 실행한다.  
요즘 현대 브라우저는 `Just-In-Time(JIT)`라고 불리는 기술을 사용한다. 이 기술은 자바스크립트를 실행할 때, 자바스크립트 소스를 실행가능 한 바이트코드로 컴파일한따.

## Is Javascript a case-sensitive language?
자바스크립트는 case-senitive 언어이다. 키워드 변수, 함수와 객체이름, 그리고 식별자는 항상 일관된 문자로 입력되어야한다.


## What is the use of preventDefault method?
`preveentDefault()`메소드는 이벤트를 취소할 수 있다. 예를들면 submit 버튼을 클릭했을떄 submission되는 걸 막을 수 있다. 

```js
var linkElem = document.getElementById("link");

linkElem.addEventListener("click", function(event){
  event.preventDefault();
});
```


## What is the use of stopPropagation method?
`stopTpropagation`은 이벤트 체인에서 `event bubbling`을 막는데 사용된다. 말 그대로 이벤트가 전달되는 것을 막는다.
내부의 div를 클릭했을때 외부 Div에 이벤트 전파가 되는것을 막는 예제이다.
```html
<p>Click DIV1 Element</p>
<div onclick="secondFunc()">DIV 2
  <div onclick="firstFunc(event)">DIV 1</div>
</div>

<script>
function firstFunc(event) {
  alert("DIV 1");
  event.stopPropagation();
}

function secondFunc() {
  alert("DIV 2");
}
</script>
```


## What are the steps involved in return false usage?
이벤트 핸들러에서 `return false;`는 아래 단계를 수행합니다.  
1. 브라우저의 기본 동작을 멈춥니다.
2. 이벤트가 DOM에 전달되는걸 막습니다.
3. 콕백이 실행되는걸 막고 호출됐을때 바로 종료됩니다.


## Why is it called a Ternary operator, what does the word "Ternary" indicate?



## What are some of the advantages/disadvantages of writing JavaScript code in a language that compiles to JavaScript?

## What tools and techniques do you use debugging JavaScript code?
브라우저 개발자 도구에서 브레이크포인트를 찍거나 `debugger`연산자를 이용하여 실행문맥을 확인하는 방법을 가장 좋아합니다.

## Explain the difference between mutable and immutable objects.
- What is an example of an immutable object in JavaScript?
- What are the pros and cons of immutability?
- How can you achieve immutability in your own code?
## Explain the difference between synchronous and asynchronous functions.
## What is event loop?
- What is the difference between call stack and task queue?
## What are the differences between variables created using let, var or const?


## What are the differences between ES6 class and ES5 function constructors?

## Can you offer a use case for the new arrow => function syntax? How does this new syntax differ from other functions?

언제 `function`키워드를 쓰고 언제 Arrow function을 사용할까?

1. 생성자 함수로 사용해야 할떄는 `function`을 사용해야한다.
```js
const Person = () => {
  this.name = 'cater'
}

var p1 = new Person();
//Uncaught TypeError: Person is not a constructor
```

2. Arrow function을 이용하면 상위 스코프의 `this`를 Arrow function의 `this`가 참조한다.
```js
function Person (){

	this.name = 'cater';
	this.sayHello = ()=>setTimeout(()=>{
		console.log(this.name);
    },0)
}
```

- [arrowFunction](https://happycording.tistory.com/entry/Arrow-function-%EB%B9%84%EB%B0%80%EC%9D%84-%ED%8C%8C%ED%97%A4%EC%B3%90%EB%B3%B4%EC%9E%90-ES6)

## What advantage is there for using the arrow syntax for a method in a constructor?
`this`에 대한 참조를 명시적으로 선언하지 않아도 된다.
ES6이전에 메서드에서 `this`를 참조하기 위해서
```js

var self = this;
function Person () {

  this.sayHello

}


```

## What is the definition of a higher-order function?


## Can you give an example for destructuring an object or an array?
```js
let person = {name : 'cater', age:29, gender: 'M', skill : ['javascript','reactJs','Typescript']}

// destructuring object
let {name, skill} = person;
// destructuring array
let [firstSkill, secondSkill] = skill;

console.log(name)
console.log(firstSkill)

```

## Can you give an example of generating a string with ES6 Template Literals?

## Can you give an example of a curry function and why this syntax offers an advantage?

## What are the benefits of using spread syntax and how is it different from rest syntax?
Spread는 ES5에서 `apply`로 대체될 수 있습니다. 

```js
function sum(x,y,z){
  return x + y + z;
}

const numbers = [1,2,3];

console.log(sum(...numbers))
console.log(sum.apply(null, numbers)
```
`Function.prototype.apply`를 이용하는 것 보다 직관적이고 쉽게 이해가 가능합니다.  


Rest문법은 Spread와 비슷하지만 여러 인자들을 하나의 배열로 반환합니다. 그리고 반드시 매개변수에서 가장 마지막에 사용해야합니다.
```js
function sum(...args) {
  return args.reduce((prev, cur) => {
    return prev+cur;
  })
}

console.log(sum(1,2,3))
console.log(sum(1,2,4))

```

## How can you share code between files?

## Why you might want to create static class members?

## What is the difference between while and do-while loops in JavaScript?

## What is the difference between naive, host user object?
`Native objects`는 ECMAScript 명세서에 정의된 자바스크립트 객체다. 예를들면 String Math, RegExp, Object, Function등의 중요 객체등이 있다.
`Host objects`는 브라우져나 NodeJs같은 실해환경에서 제공하는 객체다. 예를 들면 window,XmlHttpRequeset DOM nodes등이 있다.  
`User objects`는 자바스크립트 코드로 정의된 객체를 말한다.









## Coding Qeustions

1. Make this work.
```js
duplicate([1,2,3,4,5]); // [1,2,3,4,5,1,2,3,4,5]
```

2. Create a for loop that iterates up to 100 while outputting "fizz" at multiples of 3, "buzz" at multiples of 5 and "fizzbuzz" at multiples of 3 and 5
3. what will be returned by each of these?
```js
console.log("hello"|| "world")
console.log("foo" && "bar")
```
3. Write an immediately invoked function expression



## TODO
- web worker
- PWA
- requestAnnimationFrame

## Ref
- [javascript interview](https://github.com/sudheerj/javascript-interview-questions)