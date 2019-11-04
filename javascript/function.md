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







this : 실행컨텍스트를 참조한다.

arguments.callee

caller : 해당함수를 호출한 함수에 대한 참조를 저장한다.

apply() :
call() 매개변수를 전달해 호출하는 것이 아닌 this를 바꾼다.
즉 해당 함수가 참조하는 실행 컨텍스르를 바꾼다.

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
------


**함수 정의
	1) 해당 함수에 Constructor 자격부여
		-new를 통해 객체를 만들어 낼 수 있게 됩니다.
		-이것이 함수만 new 키워드를 사용할 수 있는 이유다.

	2)해당 함수의 Prototype Object 생성 및 연결
		-함수를 정의하면 Prototype Object도 같이 생성된다
	
	생성된 함수는 prototype이라는 속성을 통해 Prototype Object라는 객체에 접근할 수 있다.
	

	**PrototypeObject
	=>일반적인 객체와 같으며 기본적인 속성으로 constructor와 _proto_를 가지고 있다.
		constructor : Prototype Object와 같이 생성되었던 함수를 가리킨다.
		_proto_     : Prototype Link다.
	=>일반적인 객체이므로 속성을 마음대로 추가/삭제 할 수 있다.
	

	**_proto
		객체가 생성될 때 조상이었던 함수의 Prototype Object를 가리킨다.
		

	**프토로타입 체인
		_proto_속성을 통해 상위 프로토타입과 연결되어있는 형태

	



## REF

- [Toast_function1](https://meetup.toast.com/posts/118)
- [Toast_function2](https://meetup.toast.com/posts/123)
- [Toast_function3](https://meetup.toast.com/posts/129)
- [qodot_function](https://gist.github.com/qodot/1845fd02f14807d2eee9c58270ff1b2a)
- [EcamInternational.org](https://www.ecma-international.org/ecma-262/8.0/index.html)


	

