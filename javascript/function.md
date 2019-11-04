# function


## Info
	자바스크립의 함수는 그냥 객체 제향도 가능한 일급 함수다.

EcmaSciprt에서 함수 객체란 서브루틴으로 수행될 수 있는 객체를 말한다. 동작을 나타내는 실행코드와 상태를 포함하고 있으며 객체 지향의 생성자 역할도 할 수 있다. 기본적으로 자바스크립트의 일반적인 객체와 동일한 동작을 할 수 있다.  
즉, EcmaScript함수는 일반 객체의 확장이며, 함수로 동작하기 위한 추가적인 기능을 가지고 있다.  
함수 객체는 다음과 같은 데이터들을 내부에 추가로 저장한다.

1. 클로저로 묶이는 렉시컬 환경(LexicalEvironment) - `[[Environment]]`
2. 함수코드 - `[[ECMAScriptCode]]`
3. 함수종료 - `[[FunctionKine]]` : 'normal', 'classConstructor','generator','aync'
4. 생성자종류 - `[[ConstructorKind]]` : 'base', 'derived'
5. `this`의 참조상태 - `[[ThisMdoe]]`
6. strict mdoe 여부 - `[[Strict]]`
7. `super`참조 - `[[HomeObject]]`
8. 기타 등등

이 외에 실제로 함수를 실행시켜주는 `[[Call]]`, `[[Construct]]` 내부 메서드가 있다. 단순하게 함수를 호출하면 함수 객체 내부의 `[[Call]]`이 호출되고 `new`또는 `super`연산자와 함께 호출되면 `[[Construct]]`가 호출된다.  

`[[Call]]`이 구현된 객체를 `callable`이라고 부르고, `[[Construct]]`가 구현된 객체를 `constructor`라 부르는데, 자바스크립트 함수는 `callbable`이면서 `constructor`일 수도있고 아닐 수도 있다 대표적으로 화살표함수는 `callable`이면서 `non-constructor`이다.


## 함수 생성.
자바스크립트는 함수를 생성할 때 기본적으로 6가지 정보를 사용한다.
1. 함수 생성방식
	- Normal
	- Arrow
	- Method
2. 함수의 매개변수 리스트
3. 함수 몸체
4. 스코프(Lexical Environment)
5. strict mode여부
6. 함수 객체의 프로토 타입
	- FunctionPrototype
	- Generator
	- AsyncFunctionPrototype

```js
function foo() { // bar 함수의 스코프는 foo의 Lexical Environment

  // bar는 일반적인 함수 선언식 - 함수 생성 방식은 Normal, 프로토타입은 Function.prototype
  function bar(/* 매개변수 리스트 */) {
    "use strict"; // bar는 strict function

    console.log('foo'); // 함수의 몸체
  }
}
```
ECMAScript는 이런 정보를 기반으로 함수를 생성한다.

1. 함수 생성 방식을 통해 생성자가 될 수 있는지를 판단한다.
2. `strict`여부와 함수의 종류를 구분하여 저장한다.(일반함수, 제너레이터함수, async함수)
3. 함수 객체의 프로토타입을 저장한다.
	- functionPrototype,Generator, AsyncFunctionPrototype
	- 여기에서의 프로토타입은 bind, apply, call등과 같은 메서드를 가지고 있는 함수 자체의 프로토타입이다.
4. 그리고 마지막 Environment, 파라미터, 함수 몸체, `this`참조 방식 등의 정보를 저장한다.


이떄 함수를 구분하는 방식에서 조금 혼란이 있을 수도 있다. 함수를 생성  방식과 함수 자체의 종류 두 가지를 사용한다. 함수 자체의 종류는 앞서 언급한 `[[FunctionKind]]`와 같으며, 함수 생성방식은 생성 시에만 구분하여 사용하고 따로 저장하지 않는다.  

### 함수 생성 방식
함수 생성 방식은 ES5, ES6를 기준으로 생각하면 쉽다.  ES5까지 함수 표현(function)은 모두 `Nomal`이고, ES6d의 `Arrow`, 객체 리터럴에서 메서드 문법 `Method`가 된다.

```js
function foo(){}		//Nomal
const foo1 = () => {} 	//Arrow
const person = {
	// ...
	sayName() {}		//Method
}
```
함수 생성을 구분는 이유는 `Arrow`나 `Method`인 경우 생성자로 동작하지못하도록 방지(-`[[Construct]]`메서드를 구현하지 않고)하고 함수의 `this`참조 방식을 결정하기 위해서다.  

기존의 ES5까지는 함수가 생성자 혹은 일반 함수 두 경우 모두 호출 가능하였으나, ES6부터 이런 혼란을 줄이고자 구분하기 시작했다.
즉, ECMAScript6 이후 함수를 어떻게 생성하는가에 따라 생성자로 쓰일 수 있는지 없는지가 결정되며, 이는 함수 생성시 **함수 할당(FunctionAllocate))**이라 부르는 단계에서 결정한다.

주의할점은 Babel과 같은 트랜스파일러를 사용하느 경우, ECMAScript 명세와 다르게 동작할 수 있다. 예를 들어 화살표 함수는 `[[Construct]]`메소드가 엇기 때문에 생성자로 사용할 경우 에러가 발생해야 하지만 트랜스파일링이 수행됐다면 에러가 발생하지 않을 수 있다.


다음 코드를 크롬 개발자도우에서 실행해 보면 에러가 발생한다.
```js
const Foo = () => {};
var foo = new Foo(); // Uncaught TypeError: Foo is not a constructor
```
하지만 Babel로 변환된 코드를 보면 아래와 같다. 에러가 발생하지 않는다.

```js
"use strict";

var Foo = function Foo() {};
var foo = new Foo();
```
메서드 문법도 마찬가지로 생성자로 사용할 경우 에러가 발생해야 하지만 트랜스파일링으로 변환된 코드는 에러가 발생하지 않을 수있다.

```js
var obj = {
    Foo() {}
};
new obj.Foo(); // Uncaught TypeError: obj.Foo is not a constructor
```
다음은 변환된 코드이다. 에러가 발생하지 않는다.

```js
"use strict";

var obj = {
  Foo: function Foo() {}
};

new obj.Foo();
```
변환된 코드는 `Nomal`함수로 처리하기 때문에 에러가 발생하지 않는다. 사실 ㅎ화살표 함수나 메서드 문법으로 생성자를 정의하고 사용하는 경우는 없겠지만, 혹시라도 이런 코드는 작성하지 않도록 주의해야한다. 


### 정리
1. 함수는 일반 객체를 특별하게 확장한 객체이다.
2. 함수를 생성할 때 생성자로 사용할 수 있는지 아닌지를 결정한다.
3. 우리가 흔히 사용하는 트랜스파일러는 ECMAScript의 에러를 모두 표현하지는 못하므로 주의해야한다.
4. 함수가 생성될 떄 여러 내부 데이터들을 저장하는데, 여기에는 함수의 스코프나, this참조 방식 등 함수의 동작 방식을 이해하는데 중요한 여러 데이터가 있다.


## 함수 호출 Call - Call(F,V, [, argumentsList])
ECMAScript2017은 함수 호출을 `Call(F,V, [, argumentsList])`으로 표현한다. `Call`은 함수 객체의 내부 `[[Call]]`메서드를 수행하는 동작으로 `F, V, argumentsList`를 인자로 받는다. `F`는 함수 객체 `V`는 `[[Call]]`의 `this`값, `argumentsList`는 함수 호출 시 전달한 인자로 기본값은 빈 리스트이다.  

1. `argumentsList`가 전달되지 않앗다면 빈 리스트로 지정한다.
2. `F`가 `Callable`이 아니라면 에러를 발생시킨다.
3. `F.[[Call]](V, argumentsList)` 수행 결과를 반환한다.

3번에서 알 수 있듯 실질적인 함수의 호출과 그 동작은 `F.[[Call]]`에 나타나 있다. 이제 `F.[[Call]]`을 알아보자.

참고로 ECMAScript에서 함수를 호출하는 동작을 위와 같이 표현한 것일뿐, 실제 자바스크립트 엔진이 ECMAScript2017의 `Call`이라는 연산을 위와 똑같이 정의한 것은 아니다.  



## 함수 객체의 [[Call]] - F.[[Call]](thisArguments, argumentsList)
`[[Call]]]`은 함수 객체의 내부 메서드다. 인자로 `this`값과 `argumentsList`를 받는다.  

1. `F.[[FunctionKind]]`가 "classConstructor"라며 에러를 발생시킨다.
2. `callerContext`는 현재 실행 중인 실행 컨텍스트
3. `calleeContext`에 새로운 실행 컨택스트를 생성하여 지정한다. (PrepareForOrdinaryCall)
4. 




### apply()
 매개변수로 소유자 함수에 넘길 this.와 매개변수 배열을 받는다.
``` js
function sum(num1, num2){
    return num1 + num2;
}

function callSum1(num1, num2){
    return sum.apply(this, arguments);
}

console.log(callSum1(10,10));
```


### bind()
새로운 함수 인스턴스를 생성한다.  
이때 새로 생성된 함수의 this는 bind함수의 매개변수로 전달된 객체의 실행컨텍스가 된다.


``` js
window.color = "red"; 
var o = { color: "blue" }; 

function sayColor(){ 
    alert(this.color); 
} 

var objectSayColor = sayColor.bind(o); 

objectSayColor(); // blue
```



## REF

- [Toast_function1](https://meetup.toast.com/posts/118)
- [Toast_function2](https://meetup.toast.com/posts/123)
- [Toast_function3](https://meetup.toast.com/posts/129)
- [qodot_function](https://gist.github.com/qodot/1845fd02f14807d2eee9c58270ff1b2a)
- [EcamInternational.org](https://www.ecma-international.org/ecma-262/8.0/index.html)


	

