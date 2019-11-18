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

## ## What is strict mode? What are some of the advantages/disadvantages of using it?
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


## Explain event delegation.

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

## What is a first class function?

## What is unary function?

## How do you redeclare variables in switch block without an error?

## What is Temporal Dead Zone?

## What is the benefit of using moudules?



## Describe event bubbling.

## Describe event capturing.

## What's the difference between an "attribute" and a "property"?

## What are the pros and cons of extending built-in JavaScript objects?
## What is the difference between == and ===?

## Explain the same-origin policy with regards to JavaScript.

## Why is it called a Ternary operator, what does the word "Ternary" indicate?



## What are some of the advantages/disadvantages of writing JavaScript code in a language that compiles to JavaScript?

## What tools and techniques do you use debugging JavaScript code?

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
## What advantage is there for using the arrow syntax for a method in a constructor?
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

## How can you share code between files?

## Why you might want to create static class members?

## What is the difference between while and do-while loops in JavaScript?


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