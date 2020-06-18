
## JS


###  프로미스가 뭐예요?
자바스크립트에서 비동기 처리를 다루기 위한 패턴입니다.
promise.all을 이용해 병렬 비동기 로직을 쉽게 작성할 수 있고 then과 catch를 이용하여 비동기 호출 체인에서 예외처리를 콜백패턴보다 쉽게 할 수있습니다.


```js
function asyncFn (msg) {

    return new Promise(resolve, reject) {

        setTimeout(function(){
            resolve(msg)
        },1000)
    }
}

asyncFn('Hello').then((result)=>{
    console.log(result,"World")
})
```

### promise.all을 쓰는 상황을 코드로 보여주세요

promise.all은 비동기처리를 병렬적으로 실행하여 모든 프로미스가 resolve되는 시점을 잡을 수 있습니다. 
복수의 URL에 동시에 요청을 보내고, 다운로드가 모두 완료된 후에 콘텐츠를 처리할 때 promise.all을 사용할 수 있습니다.

```js
let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
    // 모든 응답이 성공적으로 이행되었습니다.
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // 모든 url의 응답코드가 200입니다.
    }

    return responses;
  })
  // 응답 메시지가 담긴 배열을 response.json()로 매핑해, 내용을 읽습니다.
  .then(responses => Promise.all(responses.map(r => r.json())))
  // JSON 형태의 응답 메시지는 파싱 되어 배열 'users'에 저장됩니다.
  .then(users => users.forEach(user => alert(user.name)));
```


### Promise와 Callback의 차이점은 무엇이며 각각의 장단점에 대해 설명해달라. 



**프로미스**  
1. 장점
- Promise.all()을 사용하여 병렬 비동기 코드를 쉽게 작성할 수 있습니다.
2. 딘점
- ES2015를 지원하지 않는 이전 브라우저에서 이를 사용하기 위해서는 polyfill을 로드해야 합니다.

**콜백패턴**
1. 단점
-  콜백헬
```js
step1(function(value1) {
  step2(value1, function(value2) {
    step3(value2, function(value3) {
      step4(value3, function(value4) {
        step5(value4, function(value5) {
            // value5를 사용하는 처리
        });
      });
    });
  });
});
```
- 에러 처리 한계
```js
try {
  setTimeout(() => { throw new Error('Error!'); }, 1000);
} catch (e) {
  console.log('에러를 캐치하지 못한다..');
  console.log(e);
}
```
예외는 호출스택을 따라 호출자에게 전파되는데 실행이 종료되어 호출스택에서 빠지면 에러를 전달하지 못한다.




###  비동기가 뭐예요?
특정 코드의 연산이 끝날 때까지 코드의 실행을 멈추지 않고 다음 코드를 먼저 실행하는 것을 말합니다.  
비동기 코드의 연산이 끝난 시점에 처리해야하는 로직은 콜백, 프로미스, async/await으로 처리합니다.


### 자바스크립트에서는 왜 비동기 처리로 처리해야하나요?
자바스크립트 엔진이 싱글 스레드이기 때문에 동시에 여러가지 일을 처리하기위해선 이벤트 루프를 이용한 비동기 처리를 해야합니다.



### 클로저 뭐에요?
중첩 함수구조에서 외부함수가 내부함수를 반환할때, 외부함수의 실행 컨텍스트(구체적으로는 context variable object)는 내부함수의 스코프체인에 의해 참조되어 사라지지 않습니다.  
이때 외부함수의 실행컨텍스트를 클로저라고 합니다.
즉 중첩 함수구조에서 내부함수가 참조하는 외부함수의 실행 컨텍스트가 클로저입니다.  
실행컨텍스트에서 varialbe object는 arguments, variable, 함수 선언문으로 구성되는데 이 모두 클로저의 대상이다.  

호출이 끝난 context는 execution stack에서 사라진다.  
하지만 다른 context에서 해당 context의 variable object를 참조중이라면 해당 varible object는 garbage collection의 대상이 되지 않기때문에 계속 참조할 수 있다.  다시말해 스코프체인으로 참조중인 객체가 있다면 메모리에 유지되는것이다.

- [참고](https://medium.com/@pks2974/javascript-%EC%99%80-function-%ED%95%A8%EC%88%982-%EC%8B%A4%ED%96%89-%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8-execution-context-51d4037b7fdc)

### 클로저는 언제쓰나요?
자바스크립트에는 private 변수를 선언할 수 없는데 클로저를 이용하면 데이터를 캡슐화 할 수 있습니다.  


### Class는 무엇인가? ES5 스펙으로 Class를 구현할수 있는가?
prototype 기반 문법을 객체지향으로 표현하기 위한 방법이다.
이런 면에서 Class 문법을 문법설탕라고 할 수 있겠으나 몇가지 차이점이 존재한다.



**기능** | **ES5** | **ES6** 
:---:|:---:|:---:
 constructor를 함수로 실행| O |  X
 spuerClass의 constructor 호출| X(유사 연출) |  O
 method 상속 | O | O
 methods를 생성자함수로 싱행| O |  X
 static methods:상속 | O | X
 stric method를 생성자함수로 실행 | O  |  X
 methods:superClass의메소드호출| X(유사 연출) | O 
 hoisting | O  |  O
 TDZ | X  | O
 

1. ES6에서 class의 method는 일반함수가 아니기 때문에 new 연산자로 생성자 함수처럼 사용할 수 없다.
```js
class Parent {
  static staticMethod() {
    this.s = 11;
    return 'static method';
  }
  method() {
    this.m = 12;
    return 'method';
  }
}

var p1 = new Parent.prototype.method(); // VM216:1 Uncaught TypeError: fn is not a constructor
```
2. staticMehtod를 상속하기 복잡해진다.
3. class문법은 호이스팅이 안된다.
```js
// ES6
const es6 = new ES6();
class ES6 {
  constructor() {
    this.a = 1;
  }
}
console.log(es6);  // Uncaught ReferenceError
```
4. class문법은 블록스코프에 영향을 받는다.
```js
class A {
  constructor(){ this.a = 1; }
}
{
  class A {
    constructor(){ this.a = 2; }
  }
  console.log(new A());    // A {a: 2}
}
console.log(new A());      // A {a: 1}
```

### 이벤트 위임에 대해 설명하세요.
이벤트 위임(Event Delegation)은 다수의 자식 요소에 각각 이벤트 핸들러를 바인딩하는 대신 하나의 부모 요소에 이벤트 핸들러를 바인딩하는 방법이다

- 자식요소를 동적으로 추가하는 경우
- 자식요소가 많은 경우.
- 이벤트를 자식요소에 할당하지 않고부모 요소로 위임함.
- 버블링을 통해 부모요소에서 핸들러가 실행되도록 유도.


### JavaScript로 컴파일되는 언어로 JavaScript 코드를 작성하는 경우의 장단점은 무엇인가요?
**장점**  
1. 정적타입 사용가능
2. 추가적인 기능을 제공받으면서 라이브러리를 사용하지않기 때문에 통일된 코드로 작성하면서 의존성을 극복할 수 있음
**단점**  
1. 템플릿 문법에 대한 러닝커브에 의한 생산성 하락
2. 서브파티 라이브러리와 호완성문제
3. IDE 지원이 미흡할 수 있음
4. 빌드 컴파일 프로세스를 위한 초기 작업 환경셋팅이 필요함



### 실행 컨텍스트(Execution Context)에 대해 설명해달라  

코드가 실행되기 위한 환경으로 변수객체, 함수선언, 스코프, this로 구성된다.  

풀어서 말하자면 자바스크립트 엔진이 코드를 실행하기 위한 정보를 의미힌다. 즉 코드의 실행문맥이다.  
문맥에 따라 코드의 결과값이 달라진다. 그렇기에 코드의 문맥을 알고있어야 정확한 결과를 낼 수 있다.
자바스크립트 엔진은 실행 컨텍스트를 물리적 객체의 형태로 관리한다. 


**구성**  
1. Variable Object
    - variable: 로컬 지역변수
    - arguments:  
        - Functional Context 한정
    - 함수 선언문

2. Scope Chain  
스코프 체인은 실행 컨텍스트가 참조할 수 있는 변수, 함수 선언 등의 정보를 담고 있는 리스트를 가르킨다.  
자바스크립트 엔진은 스코프 체인을 통해 렉시컬 스코프를 파악한다. 이 덕분에 상위 스코프를 참조할 수 있는 것이다.  
`[[Scopes]]` 으로 표현되며, 배열로 저장한다.

3. this value  
this 프로퍼티는 this 값이 할당되는데 할당되는 값은 런타임에 함수가 실행되는 5가지 경우의 컨텍스트에 따라 결정된다.
- global: 전역객체가 this
- functionInvocation: 
- call,apply,bind: 명시적 할당되는 객체가 this
- Construction: new에 의해 생성된 객체가 this
- MethodInvocation : 메소드를 포함하는 객체가 this.



**종류**  
- global context
- Functional Context
- eval 컨텍스트


- [참고](https://velog.io/@imacoolgirlyo/JS-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%9D%98-Hoisting-The-Execution-Context-%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85-%EC%8B%A4%ED%96%89-%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8-6bjsmmlmgy)
- [참고2](https://m.blog.naver.com/PostView.nhn?blogId=gi_balja&logNo=221261731281&proxyReferer=https%3A%2F%2Fwww.google.com%2F)

- [참고3](https://medium.com/@pks2974/javascript-%EC%99%80-function-%ED%95%A8%EC%88%982-%EC%8B%A4%ED%96%89-%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8-execution-context-51d4037b7fdc)



### ajax란?
비동기 웹 응용 프로그램을 만들기 위해 클라이언트 측에서 사용되는 웹 개발 기술의 집합입니다. Ajax를 사용하면 웹 애플리케이션은 기존 페이지의 화면 및 동작을 방해하지 않으면서 백그라운드에서 비동기적으로 서버로 데이터를 보내고 서버에서 데이터를 받아올 수 있습니다. Ajax는 프리젠테이션 레이어에서 데이터 교환 레이어를 분리함으로써, 웹페이지 및 확장 웹 애플리케이션이 전체 페이지를 다시 로드 할 필요 없이 동적으로 컨텐츠를 변경할 수 있도록 합니다. 

### JSONP가 어떻게 동작하는지(그리고 Ajax와 어떻게 다른지)를 설명하세요.

### curry 함수의 예를 들어 줄 수 있나요? 그리고 이 문법은 어떤 이점을 가지고 있나요?
currying은 둘 이상의 매개 변수가 있는 함수가 여러 함수로 분리된 패턴으로, 직렬로 호출하면, 필요한 모든 매개 변수가 한 번에 하나씩 누적됩니다. 이 기법은 함수형 스타일로 작성된 코드를 읽고, 합성하기 더 쉬워진 경우 유용할 수 있습니다. 함수를 currying하려면, 하나의 함수로 시작하여, 하나의 매개 변수를 취하는 일련의 함수로 분리해야 합니다.


```js
function curry(fn) {
  if (fn.length === 0) {
    return fn
  }

  function _curried(depth, args) {
    return function(newArgument) {
      if (depth - 1 === 0) {
        return fn(...args, newArgument)
      }
      return _curried(depth - 1, [...args, newArgument])
    }
  }

  return _curried(fn.length, [])
}

function add(a, b) {
  return a + b
}

var curriedAdd = curry(add)
var addFive = curriedAdd(5)

var result = [0, 1, 2, 3, 4, 5].map(addFive) // [5, 6, 7, 8, 9, 10]

```
### 생성자의 메서드에 화살표 문법을 사용하면 어떤 이점이 있나요?
this 바인딩을 별도로 처리하지 않아도 됩니다.  
화살표함수의 경우 상위 스코프의 this를 참조하기 때문입니다.  


### event bubbling에 대해 설명하세요.
DOM 요소에서 이벤트가 트리거되면 리스너가 연결되어 있는 경우 이벤트 처리를 시도한 다음, 해당 이벤트가 부모에게 bubbling되고 부모에서 같은 이벤트가 발생합니다. 
이 bubbling은 요소의 최상단 부모요소인 document까지 계속적으로 발생시킵니다. 이벤트 bubbling은 이벤트 위임의 작동 메커니즘입니다.


### ES6 클래스와 ES5 함수 생성자의 차이점은 무엇인가요?

### 호이스팅에 대해 설명하세요.

### 고차 함수(higher-order function)의 정의는 무엇인가요?
고차 함수는 다른 함수를 매개 변수로 사용하여 데이터를 처리하거나, 결과로 함수를 반환하는 함수입니다. 
고차 함수는 반복적으로 수행되는 어떤 연산을 추상화하기 위해 사용합니다. Array Api중 forEach, filter, reduce, map등이 있습니다
이중 map은 고차 함수를 사용하여 배열의 각 항목을 변환하고, 변환된 데이터로 새로운 배열을 반환합니다. 

### 자바스크립트에서 This는 몇가지로 추론 될수 있는가, 아는대로 말해달라.
자바스크립트에서 this는 실행 컨텍스트가 생기는 시점에 할당된다

1. 생성자  
함수를 호출할 때 new 키워드를 사용하는 경우, 함수 내부에 있는 this는 완전히 새로운 객체입니다.
2. 명시적 할당  
apply, call, bind가 함수의 호출/생성에 사용되는 경우, 함수 내의 this는 인수로 전달된 객체입니다.
3. 메서드  
obj.method()와 같이 함수를 메서드로 호출하는 경우, this는 함수가 프로퍼티인 객체입니다.
4. 자유함수  
수가 자유함수로 호출되는 경우, 즉, 위의 조건 없이 호출되는 경우 this는 전역 객체입니다. 
브라우저에서는 window 객체입니다. 엄격 모드('use strict') 일 경우, this는 전역 객체 대신 undefined가 됩니다.

5. 화살표 함수
 화살표 함수인 경우 위의 모든 규칙을 무시하고 생성된 시점에서 주변 스코프의 this값을 받습니다.


### 프로토타입이 어떻게 동작하는가?
 모든 JavaScript 객체는 다른 객체에 대한 참조인 prototype 프로퍼티를 가지고 있습니다. 객체의 프로퍼티에 접근할 때, 해당 객체에 해당 프로퍼티가 없으면 JavaScript 엔진은 객체의 prototype과 prototype의 prototype등을 보고 프로퍼티 정의가 있을 때까지 찾고, 만약 객체의 프로퍼티에 접근할 때 해당 객체에 해당 프로퍼티가 없으면 프로토타입 체인 중 하나에 있거나 프로토타입 체인의 끝에 도달할 때까지 찾습니다.

### JWT
- 왜 사용했는지
- 토큰과 쿠키/세션 차이
- JWT 토큰을 열어본 적 있는지





##  What is the value of foo.x and why?
```js
var foo = {n: 1};
var bar = foo;
foo.x = foo = {n: 2};
```

이 예제를 이해하기 위해선 할당연산자(Assignment operator)의 결합성 우선순위를 알아야한다.
할당 연산자는 우결합성 즉 연속해서 사용됐을때 우측부터 실행된다.
풀어서 보면 다음과 같이 생각해 볼 수 있다.
```js
foo.x = (foo = {n:2})
```
우측의 연산이 끝나면 할당 연산자의 반환값인 `{n:2}`가 foo.x에 할당된다. 할당 연산자는 할당한 값을 반환하기 때문에 풀어서 생각해보면 다음처럼 생각할 수 있다.
```js
foo = {n:2}
foo.x = {n:2}
```
하지만 실제 연산은 이것과 다르다. 두번째 줄에서 foo가 참조하는 객체가 `{n:1}`이기 때문이다. 두번째 줄의 연산은 `bar`를 통해 콘솔에서 확인할 수있다.  

연산을 여러번 해보면 차이를 좀 더 쉽게 알 수있다.  
![](/resource/img/javascript/javascript_operatorPrecedence.png)  


연산자의 우선순위를 나타나는 결합성은 연산자마다 다르다.  
(c.f.[Operator_Precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence))


## What is a promise?
promise는 값이 resloved인지 not resolved인지 상태를 반환해주는 객체다. not resolved인 경우에는 그 이유를 함께 반환한다.
문법은 아래와 같음

```js
const promise = new Promise((reslove, reject) => {

})
```

## Why do you need a promsie?
`promise`문법은 비동기 연산을 다룬다. Callback 패턴에 대한 대안으로 사용되며 callback Hell을 줄이고 클린코드를 작성할 수 있게 도와준다.

- 단점 요청을 취소할 수 없다.

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
만약 자바스크립트에서 callback함수를 사용하지 않고 모든 함수가 동기적으로 실행됐다면 `secondFunction`은 `firstFunction`이 종료된 뒤에 실행되어야한다. 하지만 비동기 실행환경에서 `firstFunction`의 응답이 오기전에 `secondFunction`이 실행됐음을 알 수 있다.

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
- 요청 취소가 안된다.


## What is strict mode? 
- What are some of the advantages/disadvantages of using it?

Strict Mode는 ES5에서 새로 나온 기능으로 함수나 JS프로그램이 보다 엄격한 문맥에서 동작하도록 하는 기능이다.  
Strict Mode를 사용하면 에러가 발생하는 동작을 막을 수 있다.  
String Mode는 나쁜 구문을 실제 에러로 알려주어 안전한 자바스크립트를 작성하는데 도움을준다. 



## What is sever-sent events?
Server-sent events는 브라우저가 polling에 의존하지 않고 HTTP를 통해 서버로부터 자동 업데이트를 수신할 수 있는 서버 push기술이다. SSE는 서버에서 클라이언트로만 흐르는 단방향 통신 채널이다.



##  What does the following code print?
```js
console.log('1');
setTimeout(function() {
  console.log('2');
}, 0);

Promise.resolve()
.then(function() {
  console.log('3');
})

console.log('4');
```

답은 1,4,3,2다. 이 순서를 설명하기 위해선 micro task Queue에 대해 설명해야한다. 간단히 설명하자면 Task Queue에도 우선순위가 존재하는데
Micro TaskQueue가 일반 Task Queue보다 높으며 `promise`체인의 실행시점은 Micro TaskQueque가 담당한다.


##  What is the difference between these four promises?
```js
doSomething().then( () => doSomethingElse());

doSomething().then(() => {
  doSomethingElse();
});

doSomething().then(doSomethingElse());

doSomething().then(doSomethingElse);
```

첫번째는 `doSomethingElse`의 반환값이 Promise value로 전달된다.  
두번째는 `doSomethingElse`이 실행되고 반환값은 null이다.  
세번째는 `doSomethingElse`이 함수를 반환하고 반환된 함수가 then 메서드의 콜백으로 실행된다.  
네번째는 `doSomethingElse`가 실행되며 매개변수로 `doSomething`의 결과값이 전달된다.  

##  What will the code below output to the console and why?
```js
(function(){
  var a = b = 3;
})();

console.log("a defined? " + (typeof a !== 'undefined'));
console.log("b defined? " + (typeof b !== 'undefined'));
```
b에만 3에 할당된다. 할당 연산자(assignment operator)의 결합성 우선순위와 자바스크립트의 변수선언에 대한 개념을 묻는 질문이다.  

결합성(Associativity)은 같은 우선순위를 가진 연산자의 처리 순서를 결정합니다. 
```
a 연산자 b 연산자 c
```
연산자별로 우결함성, 좌결합성이 나뉘며 할당 연산자의 경우 우결합성이다.

할당 연산자(assignment operator) 풀어서 생각해보면 다음과 같다.
```js
b = 3;
a = (b = 3);
```
할당 연산자는 할당한값이 반환된다는걸 기억해야한다. 즉 a에는 3이 반환된다.
이때 b가 `var`없이 생성됨으로 `b`는 글로벌 변수로 선언되어 함수 스코프 밖에서 참조가 가능하다.


- ref : [Operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)


###  Consider the two functions below. Will they both return the same thing? Why or why not?
```js
function foo()
{
  return {
      foo: "hello"
  };
}

function bar()
{
  return
  {
      bar: "hello"
  };
}
```
위 차이는 자바스크립트의 세미콜론 삽입 규칙에 따라 개행을 했을떄 세미콜론이 삽입되기 때문이다. 실제 코드가 실행될떄는 다음과 같이 파싱되어 실행된다.

```js
function bar()
{
  return;
  {
    bar: "hello"
  };
}

```


## What is a service worker?

## What is IndexedDB?

## Explain how `this` works in JavaScript.
자바스크립트에서 this는 함수의 호출방식에 따라서 바인딩되는 값이 달라진다.


1. 일반함수가 참조하는 this
```js
var spot = 'global'
function foo (){
  var spot = 'local'
  console.log(`${this.spot}`);
}

console.log(foo());
```
가장 기본적으로 일반함수에서 this는 전역변수에 바인딩된다. 이게 가장 기본값으로 생각하고 출발한다.


2. 메소드가 참조하는 this
```js
var person = {
  name : 'cater',
  age : 29,
  sayHello : function (){
    console.log(`Hi I am ${this.name}.`)
  }
}
console.info(person.sayHello());
```
객체의 메소드에서  this 해당 메소드를 호출하는 객체에 바인딩된다.  
부연 설명을 하자면 `var person = {};`은 `var person = new Object();`의 리터럴 표현으로 볼 수 있다. 
자바스크립트에서 객체를 생성하려면 `new`연산자를 사용해야하는데 이 연산자를 사용하면 새로운 객체를 생성하고 생성자 함수에서 사용된 `this`를 새로 생성된 객체에 바인딩한다. 즉 `this`의 바인딩 타겟인 `window`에서 새로 생성한 객체로 바인딩됨을 알 수 있다.



3. 이벤트 리스너 콜백에서 참조하는 this

```js
var cancelElememt = document.getElementById("btn_cancel");

cancelElememt.addEventListener("click", function(event){
  
  console.log(`${this}`);
});
```
이벤트 리스너의 콜백에서 this는 해당 이벤트가 바인딩된 엘리먼트이다.






## Can you give an example of one of the ways that working with `this` has changed in ES6?

대표적으로 arrow function이 있다. 일반함수에서 this는 전역객체인 window를 참조한다.  
그렇기 때문에 아래같은 예제에서 this참조에대한 오류가 있었다.
```js
function Person(){
	this.name = 'cater'
}

Person.prototype.sayHello = function(){

	console.log(1,this.name)


	setTimeout(function(){
		console.log(2, this.name)
  },0)
}

var p1 = new Person();

p1.sayHello();
```

화살표 함수에서는 this가 상위 스코프의 this를 참조하기 떄문에 콜백을 화살표함수로 바꾸는것만으로 해결이 된다.

```js
function Person(){
	this.name = 'cater'
}

Person.prototype.sayHello = function(){

	console.log(1,this.name)

	setTimeout(() => {
		console.log(2,this.name)
  },0)
}

var p1 = new Person();

p1.sayHello();
```



## Explain how prototypal inheritance works.


## What's the difference between a variable that is: null, undefined or undeclared?
- How would you go about checking for any of these states?

우선 `undefined`는 변수는 선언됐지만 값이 할당되지 않음을 의미한다. 즉 초기화를 하지 않은 상태이다.  
`null`은 변수가 참조하는 값이 없다는 것을 명시적으로 나타낸다. `undefined`와 달리 초기화가 되어있다.  
`undeclared`는 변수자체가 선언되지 않음을 의미한다.

```js

let b;
let c = null;
//undeclared
console.log(a);     // Uncaught ReferenceError: a is not defined
// undefined
console.log(b);     // undefined
// null
console.log(c);     // null
```

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


## Explain the difference between: function Person(){}, var person = Person(), and var person = new Person()?

`function Person(){}`는 함수객체를 생성한다.  
`var person = Person()`함수의 반환값을 변수에 할당한다.  
`var person = new Person()`은 새로운 객체를 생성하고 Person Sope 문맥의 this를 새롭게 생성한 객체로 바인딩하여 리턴한다.


## Explain the differences on the usage of foo between function foo() {} and var foo = function() {}
`function foo() {}`은 함수 선언문을 의미한다. 실행과 동시에 초기화되며 호이스팅 대상이다.
`var foo = function() {}`은 함수 표현식이다. 변수 foo는 호이스팅되지만 초기화 되지 않아 호이스팅 되더라도 함수로 실행이 불가능하다.

## Can you explain what Function.call and Function.apply do? What's the notable difference between the two?

실행문맥에서 this바인딩을 셋팅한다는 기능은 같으나 인자전달 방식이 다르다.  
`call`의 경우 개별적인 n개의 인자를 전달하고 `apply`의 경우 인자 배열을 전달한다. 
`argument`객체같은 유사배열도 가능하기 때문에 인자갯수가 동적으로 변할때 사용하면 편리하다.

```js
function sum (x,y,z){
  return x + y + z;
}

console.info('call',sum.call(null,1,2,3));
console.info('apply',sum.apply(null,[1,2,3]));
```



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
호이스팅은 `Lexical Context`생성시 내부에서 사용된 변수와 함수를  생성하는 것을 말한다. 이떄 각 변수는 `undefined`로 초기화되며 실제 초기화된 위치에 인터프린터가 이동했을 때 재할당된다.

```js

console.log(name)
var name = 'cater';
```
위 코드는 실제 실행에서 아래 코드처럼 동작합니다.
```js
var name = undefined;
console.log(name);
name = 'cater';
```


## What is prototype chain?
자바스크립트에서 객체는 자신의 원형이되는 Prototype Object에 대한 link를 갖습니다.  
프로토타입 체인이란 객체의 속성이나 메서드에 접근할때 prototype link를 참조하여 prototype object의 속성과 메서드를 함께 탐색하는 것을 말하빈다.

## What is a first class function?

## What is unary operator?
(+) 연산자는 변수를 순자로 변환할때 사용됩니다. 변수를 바꿀 수 없는 경우에는 NaN으로 변환한힙니다.
```js
var x = "100";
var y = + x;
console.log(typeof x, typeof y); // string, number

var a = "Hello";
var b = + a;
console.log(typeof a, typeof b, b); // string, number, NaN
```

## How do you redeclare variables in switch block without an error?

## What is Temporal Dead Zone?
```js
console.log(name); // Uncaught ReferenceError: Cannot access 'name' before initialization
let name = 'cater'
```

프로그래밍 언어에서는 변수를 생성할때 변수를 담을 메모리공간을 확보해야한다. 

자바스크립트에서 변수는 3가지 단계를 걸쳐 생성된다.
1. 선언(Declaration) : 스코프와 변수 객체가 생성되고 스코프가 변수 객체를 참조한다.
2. 초기화(Initalization) : 변수 객체가 가질 값을 위해 메모리에 공간을 할당한다. 이떄 할당되는 값은 `undefined`이다.
3. 할당(Assignment) : 변수 객체에 값을 할당한다.

`var`키워드는 선언과 초기화가 동시에 이루어진다. 선언이 되자마자 `undefined`로 값이 초기화된다.  
`let`키워드나 `const`키워드로 생성된 변수는 선언만 되고 초기화되지 않는다. 소스코드상 선언위치로 이동했을 떄 초기화되는것이다. 
이때 초기화되기전까지의 갭이 존재하게 되는데 이것을 TDZ라고 한다.  

정리하자면 선언은 되었지만 아직 초기화 되지않아 변수에 담길 값을 위한 공간이 메모리에 할당되지 않은 상태를 말한다.


- [TDZ](https://evan-moon.github.io/2019/06/18/javascript-let-const/)


## What is the benefit of using moudules?
js파일의 호출순서와 namespace문제에서 벗어날 수 있습니다.

## What is an evnet flow?
Event Flow는 웹 페이지에서 이벤트를 수신하는 순서이다. 

### ref
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
```html
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
![](/resource/img/javascript/async.jpeg)

동기반식은 요청을 보낸 후 응답을 받아야지만 다음 동작이 이루어지는 방식이다. 어떤 일을 처리할 동안 다른 프로그램이 정지한다. 
싱글 스레드인 자바스크립트에서 어떤 동기함수의 처리시간이 길어지면 병목현상이 생길 수 있다.  

요청을 보낸 후 응답과는 상관없이 다음 방식을 동작하는 방식이다. 겨로가가 주어지는데 시간이 걸리더라도 그 시간 동안 다른 작업을 할 수 있다. 비동기방식은 비동기식 처리를 요청할 때 할일이 끝난 후 처리 결과를 알려주는 콜백함수를 통해 제어흐름을 되찾는다.
이때 제어흐름을 컨트롤하는것이 `event loop`이다. 비동기 함수의 처리가 끝났을 때 콜백함수의 처리순서를 `call stack`에 끼워넣는 역할을 한다.


## What are the differences between variables created using let, var or const?
`var`는 현재 context에 변수를 만든다는것을 의미한다. `var`키워드가 없으면 전역변수를 생성한다. 기본적으로 자바스크립트에서는 function내부에서 새로운 context가 생성된다. 따라서 function 내부의 선언된 변수만이 지역변수였다.  
`var`와 달리 `let`는 block Scope를 제공한다. 블럭으로 변수를 구분한다. 또 같은 Context안에서 같은 이름의 변수를 선언할 수 없다.
`const`는 기본적으로 `let`의 기능을 모두 포함하지만 재할당이 불가능한 기능이 덫붙는다. 하지만 자료형이 객체일 경우 객체 속성에 대한 수정은 할 수 있다.



## What are the differences between ES6 class and ES5 function constructors?

**기능** | **ES5** | **ES6** 
:---:|:---:|:---:
 constructor를 함수로 실행| O |  X
 spuerClass의 constructor 호출| X(유사 연출) |  O
 method 상속 | O | O
 methods를 생성자함수로 싱행| O |  X
 static methods:상속 | O | X
 stric method를 생성자함수로 실행 | O  |  X
 methods:superClass의메소드호출| X(유사 연출) | O 
 hoisting | O  |  O
 TDZ | X  | O



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
let person = {
  name : 'cater', 
  age:29, 
  gender: 'M', 
  skill : ['javascript','reactJs','Typescript']
}

// destructuring object
let {name, skill} = person;
// destructuring array
let [firstSkill, secondSkill] = skill;

console.log(name)
console.log(firstSkill)

```

## Can you give an example of generating a string with ES6 Template Literals?
템플릿 리터럴(`Template Literals`)은 백틱(backtick)무자 ``\`를 이용한 문자 표기법이다.
일반적인 문자열과 달리 여러 줄에 걸쳐 문자열을 작성할 수 있으며 문자열과 변수를 혼용하여 사용하는 새로운 방법을 제공한다.
이를 문자열 인터폴레이션(String Interpolation)이라고 한다.
```js
let name = 'Cater'

console.log(`My name is ${name}`);
```

## Can you give an example of a curry function and why this syntax offers an advantage?


## What is a rest parameter?
rest 파라미터는 함수의 파라미터를 처리하는 향상된 방법입니다. Rest파라미터를 이용하면 많은 인수를 배열의 형태로 표현할 수 있다.
```js
function total(...args){
  let sum = 0;
  args.forEach(arg=>{
    sum+=arg;
  })

  return sum;
}
```

## What is a spread operator?
Spread연산자는 이터레이터를 단일 연산자나 단일 요소로 만들어 줄 수 있습니다.
```js
function calulateSum(x,y,z) {
  return x + y + z;
}

const numbers = [1,2,3];

console.log(calulateSum(...numbers));
```



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

## How do you determine two values same or not using object?
`Object.prototype.is`는 두 값이 같은지 아닌지 결졍합니다.

```js
Object.is('hello', 'hello');     // true
Object.is(window, window);   // true
Object.is([], []) // false
```
다음과 같은 경우에 같음으로 간주합니다.  
1. 둘다 undefined
2. 둘 다 null
3. 둘 다 true 이거나 false
4. 문자열인 경우 길이가 깉고 같은 인덱스의 값이 같아야한다.
5. 객체인 경우 해당 객체가 참조하는 값이 같아야한다.
6. 숫자인 경우 둘다 +0 -0이 아니고 둘다 NaN이 아닐 떄 값이 동일해야한다.


## How do you copy properties from one object to other?
`Object.assign()`을 사용할 수 있다. 이 메서드는 target의 값과 속성을 복사하여 새로운 객체를 반환한다. 

```js
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };

const returnedTarget = Object.assign(target, source);

console.log(target); // { a: 1, b: 3, c: 5 }

console.log(returnedTarget); // { a: 1, b: 3, c: 5 }
```
만일 공통 속성이 있는 경우 덮어쓰게 된다. 위 예제에서 속성 b가 `source`객체의 속성으로 수정된걸 알 수 있다.

## What are the applicaations of assign method?

`assign`메소드는 서로다른 두개의 객체를 병합하여 새로운 객체를 반환한다.
```js
var obj1 = {
  a: 1,
  b: 2
}

var obj2 = {
  b: 3,
  d: 4,
  e: 5
}

var mergedObj = Object.assign(obj1,obj2);
console.log(mergedObj)
```
만약 위 예제와 같이 동일한 프로퍼티가 있다면 두번째 객체를 기준으로 덮어쓴다.  이 메소드는 새로운 객체를 반환하기때문에 
객체의 얕은 복사에 사용될 수 있다.

```js
class Person {

  constructor(name){
    this.name = name
  }
}

var p1 = new Person('cater');
var newP1 = Object.assign({},p1);

console.log(newP1.name);

newP1.name = 'Jake';

console.log(newP1.name);
console.log(p1.name);
```



## How do you create an object with prototype?
`Object.create()`는 새로운 객체를 생성합니다.  이 메서드는 존재하는 객체를 새롭게 생성하는 객체의 프로토타입으로 만들 수 있습니다. 

```js
const user = {
  name : 'John',
  printInfo : function(){
    console.log(`My name is ${this.name}`);
  }
}

const admin = Object.create(user);

admin.name = 'Nick';
admin.printInfo();

```

## What is an anonymous function?
익명함수는 이름이 없는 함수다. 익명함수는 보통 변수 할당하거나 콜백으로 사용된다.

```js
function (optionalPrarameters) {

}

// 익명함를 변수에 할당.
const myFunction = function(){

}

// 익명함수를 콜백함수로 사용.
[1,2,3].map(function(elements){ 

})


```

## How do you define property on Object constructor?
`Object.prototype.defineProperty()`는 객체에 직접적으로 새로운 속성을 정의하거나 이미 존재하는 속성을 변경하거나 객체를 반환할 때 사용됩니다.

```js
const newObect = {};

Object.defineProtperty(newObject, 'newProperty', [
  value: 100,
  writable: false
])

console.log(newObject.newProperty); //100

newObject.newProperty = 200;    // It throws an error in strict mode due to writable setting

```


## What is the difference between get and defineProperty?
두 가지 기능은 클래스를 쓰지 않는 이상 비슷한 결과가 나왼다. 만약 `get`

## What is the purpose of switch-case?

`switch`는 때로는 `if`문 보다 편할떄가 있다.

```js
switch (expression)
{
    case value1:
        statement1;
        break;
    case value2:
        statement2;
        break;
    .
    .
    case valueN:
        statementN;
        break;
    default:
        statementDefault;
}
```

`switch`를 사용하기 위해서는 조건이 있다.
1. expression은 숫자나 문자이어야한다.
2. expression이 중복되면 안된다.
3. `default`는 선택이다.
4. `braek`는 `switch`의 해당 시퀀스를 종료하기 위해 사용한다.
5. `break`는 선택값이지만 다음 케이스가 실행된다.



## What is an Iterator?
이터레이터는 순차적으로 값을 반환하면서 종료여부를 확인할 수 있는 객체 프로토콜입니다. `next()`메서드를 호출하면 `value`와 `done`속성을 가진 객체를 반환합니다. 

## What is an event loop?

![](/resource/img/javascript/browerEnv.png)  

단일 스레드인 자바스크립트에서 동시성(Concurrency)를 지원하기 위한 장치이다. 
자바스크립트에는 이벤트 루프가 없다. 이벤트 루프는 자바스크립트 엔진을 구동하는 환경(브라우저, node.js)에서 제공한다. 위 그림은 브라우저 환경을 간단하게 도식화한 것이다. 

자바스크립트가 단일 스레드 기반의 언어라는 말은 자바스크립트 엔진이 단일 호출 스택을 사용한다는 관점에서만 사실이다. 실제 자바스크립트가 구동되는 환경(브라우저,node.js)에서는 여러 개의 스레드가 사용되며 이러한 구동 환경이 단일 호출 스택을 사용하는 자바스크립트 엔진과 상호 연동하기 위해 사용하는 장치가 이벤트 루프다.



#### Ref
- [toast](https://meetup.toast.com/posts/89)
- [Task, mcrotasks, queues](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
- [Concurrency model and the event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)

## What is an event queue?
Task Queue라고도 불린다. 자바스크립트 엔진은 싱글스레드로 실행되는데 동시성을 제공하기위해 자바스크립트 실행환경에서 백그라운드에서 실행한 함수의 콜백함수를 자바스크립트 엔진이 처리하기 전에 대기하는 영역이 있는데 그곳이 Task Queue이다. 이곳에 대기중인 Task를 이벤트 루프가 콜스택이 비워졌을때 채워넣는다.


## How do you get meta data of a module?
`import.meta`는 자바스크립트 모듈에 대한 메타데이터 정보를 볼 수 있는 객체이다. 현재 모듈(모듈의 URL같은 )에 대한 정보를 볼 수 있다. 

```html
<script type="module" src="welcome-module.js"></script>
<script>
  console.log(import.meta); // { url: "file:///home/user/welcome-module.js" }
</script>
```

## What are the advantages of typescript over javascript
1. TypeScript은 컴파일에러를 개발하는 시점에 알 수 있고 런타임 에러를 줄일 수 있다.
2. TypeScript는 컴파일의 정확성을 높히는 정적 타입을 지원한다.
3. TypeScript 컴파일러는 ts파일을 ES3,ES4,ES5,ES6로 컴파일 할 수 있다.



## What is contructor method in class?
생성자 메소드는 클래스 안에 생성된 객체를 만들고 초기화하는 특별한 메소드입니다. 생성자 메소드가 필요 없으면 default 생성자 메소드를 사용할 수 있습니다.

```js
class Employee {
  constructor() {
    this.name = "John";
  }
}

var employeeObject = new Employee();

console.log(employeeObject.name); // John
```


### What happens if you write constructor more than once in a class?
생성자 메소드는 클래스에서 한번만 정의해야 합니다. 생성자 메소드를 여러번 쓰면 문법 오류가 발생합니다.

```js
class Employee {
   constructor() {
     this.name = "John";
   }
   constructor() {   //  Uncaught SyntaxError: A class may only have one constructor
     this.age = 30;
   }
 }

 var employeeObject = new Employee();

 console.log(employeeObject.name);
```

## What are the advantages of module loaders?
1. 동적인 로딩
2. 상태 분리
3. 전역 네임스페이스 분리
4. Compilation hooks
5. Nested virtualization


## How do you call the constructor of parent class?
부모 클래스의 생성자 함수를 호출하기 위해 `super`키워드를 사용할 수 있습니다. `super()`를 `this`를 사용하기 전에 호출하지 않으면 참조 오류를 발생합니다.

```js
class Square extends Rectangle {
  constructor(length) {
    super(length, length);
    this.name = 'Square';
  }

  get area() {
    return this.width * this.height;
  }

  set area(value) {
    this.area = value;
  }
}

```

## How do you extend classes?
`extends`키워드는 다른 클래스의 자식 클래스를 생성할때 사용됩니다. 기본 제공 객체뿐만 아니라 사용자 정의 객체도 하위클래스화할 수 있습니다.

```js
 class Square extends Rectangle {
   constructor(length) {
     super(length, length);
     this.name = 'Square';
   }

   get area() {
     return this.width * this.height;
   }

   set area(value) {
     this.area = value;
   }
 }
```

## How to get value frome get parameters?
`new URL()`객체는 searchParams 속성을 통해 인수들에 접근할 수 있다.

```js
let urlString = "http://www.some-domain.com/about.html?x=1&y=2&z=3"; //window.location.href
let url = new URL(urlString);
let parameterZ = url.searchParams.get("z");
console.log(parameterZ); // 3
```


## How do you load CSS and JS files dynamically?
Dom에 링크와 스크립트 엘리먼트를 만들수 있고 해드테그의 자식테그로 추가할 수 있다.   
리소스의 로드시점을 어떻게 잡을 수 있을까?

```js
function loadAssets(filename, filetype) {
  var fileReference = null;

  if(filetype === 'css'){
      fileReference = document.createElement("link")
      fileReference.sestAttribute('rel', 'stylesheet');
      fileReference.sestAttribute('type', 'text/css');
      fileReference.sestAttribute('src', filename);

  }else if(filetype === 'js') {
      fileReference = document.createElement('script');
      fileReference.sestAttribute('type', 'text/javascript');
      fileReference.sestAttribute('src', filename);
  }

  if(fileReference){
    var headNode = document.getElementsByTagName("head")[0];
    headNode.appendChild(fileReference);
  }

}

```


## How do you get the prototype of an object?
`Object.getPrototypeOf(obj)`메소드를 사용하면 prototypeObject를 반환받을 수 있습니다. 상속된 속성이 없으면 `null`을 반환합니다.
상속받은 프로토타입 객체가 없으면 Null을 반환합니다.

```js
const newPrototype = {};
const newObject = Object.create(newPrototype);

console.log(Object.getPrototypeOf(newObject) === newPrototype) // true
```


## How do you set prototype of one object to acother?
`Object.setprototypeOf()`메소드를 사용하면 프로토타입을 셋팅할 수 있다. 

```js
const newObject = {};
console.log(Object.isExtensible(newObject)); //true

```


## How do you define multiple properties on an object?
`Object.defineProperties()`메소드는 새로운 프로퍼티를 생성하거나 존재하는 프로퍼티를 변경할때 사용할 수 있다.

```js
const newObject = {};

Object.defineProperties(newObject, {
  newProperty1:{
    value : 'cater',
    writable : true;
  },
  newProperty2: {}
})
```

## Whay do you need Obfuscation?
1. 코드 크기를 줄일 수 있다. 
2. 비지니스 로직을 숨겨서 외부로 부터 보호할 수 있다.
3. 리버스 엔지니어링을 어렵게 만들 수 있다.
4. 다운로드 시간이 줄어든다.





## How can you share code between files?

## Why you might want to create static class members?

## What is the difference between while and do-while loops in JavaScript?

## What is the difference between naive, host user object?
`Native objects`는 ECMAScript 명세서에 정의된 자바스크립트 객체다. 예를들면 String Math, RegExp, Object, Function등의 중요 객체등이 있다.
`Host objects`는 브라우져나 NodeJs같은 실해환경에서 제공하는 객체다. 예를 들면 window,XmlHttpRequeset DOM nodes등이 있다.  
`User objects`는 자바스크립트 코드로 정의된 객체를 말한다.


## What is a thunk function?
`thunk`는 원하는 동작을 하기 전에 미들웨어같은 어떤 작업을 끼워넣는 랩퍼 함수라고 볼 수 있다.

```js
const add = (x,y) => x + y;
const thunk = () => add(2,3);

thunk();    //5
```

## What are asynchronus thunk?
비동기 `thunk`는 네트워크 요청시 유용하다. 

```js
function fetchData(fn){
  fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => fn(json))
}

const asyncThunk = function (){
   return fetchData(function getData(data){
      console.log(data)
  })
}

asyncThunk()

```
`getData`함수는 즉시 호출되지 않고 `fetch`API로 데이터를 조회해와서 데이터가 준비되었을때 프로미스 체인에 의해 호출된다. 비동기 `thunk`를 이해하기위한 가장 좋은 예는 `redux`라고 하는 상태관리 라이브러리를 사용해보는거이다. `redux`에서는 비동기 `thunk`를 액션을 전달하는것을 지연하기위해 사용된다.

## What is the output of below function calls?

## What is the difference between reflow and repaint?
`repaint`는 요소의 가시성에 영향을 미치지만 요소의 레이아웃에는 영향을 미치지 않는 변경이 있을 때 발생한다. (예를 들면 outline, visibility, 배경색 변경같은 상황)  
`relfow`는 페이지의 레이아웃에 영향을 미치는 변경사항이 포함된다. 브라우져의 윈도우를 리사이즈하거나 폰트를 변경하는 것, 컨텐트를 변경하는것 스타일을 계산하는 자바스크립트 메서드를 사용했을때, 돔요소를 지웠을때나 엘리먼트 클래스를 변경하는 작업들이 `reflow`를 발생시킨다. 
엘리먼트의 `reflow`는 자신의 부모 엘리먼트나 자식 엘리먼트에 후속적인 `reflow`를 만든다.


## What is the difference between Shallow and Deep Copy?
얕은복사란 리터럴타입이 아닌 객체의 주소값을 복사하는것을 말한다. 얕은 복사의 경우 참조주소에 의해 연동되어 있기떄문에 원본 객체가 수정되면 참조값에도 영향을 받는다. 반면 깊은복사는 같은 값을 가지는 새로운 객체를 메모리에 생성하는 것을 말한다.

```js
var obj = {
  name : 'cater',
  age : 29
}

var p1 = obj;   //Shallow copy

p1.age = 30;

console.log(obj.age)
```



## What is the purpose of Error object?

## What is the purpose of double tilde operator?


## What is ArrayBuffer?

```js
let buffer = new ArrayBuffer(16); // create a buffer of length 16
alert(buffer.byteLength); // 16

//Create a DataView referring to the buffer
 let view = new DataView(buffer);
```


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