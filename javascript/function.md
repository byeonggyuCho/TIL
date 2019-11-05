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
4. (--assertion: 새로 만들어진 `calleeCOntext`가 현재 running execution context이다.)
5. `this`를 바인딩한다. (OrdinaryCallBindThis)
6. 함수 코드를 수행하고 `result`에 그 결과를 저장한다.(OrdinaryCallEvaluateBody)
7. `calleeContext`를 execution context stack에서 제거하고, `callerContext`를 다시 running execution context로 저장한다.
8. `result`를 반환한다.

위 동작에서 Execution Context, execution context stack, running execution context내용이 조금 난해할 수 있을 것같다.
 우선은 이런게 있다 정도로 생각하자.

 함수 호출을 조금더 쉽게 정리해보면 다음과 같다.

 1. 함수를 호출하면 이에 맞춰서 함수를 실행할 수 있느 환경을 만들고 초기화한다.
 2. `this`를 바인딩한다(`this`가 어떤 객체를 참조해야 할지 정한다.)
 3. 실제 함수 코드를 수행하고 그 결과를 `result`에 저장한다.
 4. 이 함수를 호출했던 곳으로 돌아간다.
 5. `result`를 반환한다.

 ## Execution Context
 Execution Context는 스코프와 기본 객체들(intrinsic objects -Array, Object등의 기본 생성자와 그 프로토타입)을 가지고 있는 Realm등 코드 수행환경에 대한 여러 정보를 가지고 어떤 장치라고 생각하면 된다. 결국 EC는 ECMAScript에서 코드 수행 메커니즘을 표현하ㅣ 위한 것이며, 실제 스트립트엔진들은 이 명세와 완벽히 일치하지 않을 수 있다.  

 자바스크립트가 단일 스레드 환경으로 코드를 컴파일하고 실행할 때 call stack을 만드는 것과 같이 EC Stack을 만든다고 생각해보자. 가장 밑바탕에는 Global 코드 환경에 대한 EC가 있을 것이고, 그 위로 함수가 호출될 때마다 그에 맞는 EC가 하나씩 추가되고 빠지기를 반복할 것이다. 그리고 각 시점에 stack의 최상위에 있는 EC가 바로 running execution context인 것이다.  

 다음과 같은 코드에서 EC stack이 어떻게 변하는지 살펴보자.
```js
function foo() {

	function bar(){
		return 'bar'
	}
	return bar();
}

foo();
```
 
 ```
                      |--------|
                      | bar    |
           |--------| |--------| |--------| 
           | foo    | | foo    | | foo    | 
|--------| |--------| |--------| |--------| |--------|
| global | | global | | global | | global | | global |
|--------| |--------| |--------| |--------| |--------|
 ```
ECMAScript 코드 수행을 위한 EC에는 LexicalEnvironment와 VariableEnvironment라는 커포넌트가 존재한다. 간단히 변수와 참조를 기록하는 황경이라고 생각하며 된다. LexicalEvironment와 VariableEnvironment가 서로 나누어져있지만, 사실은 초기화 시에 같은 객체를 바라보고 있다. `with`와 같은 특별한 문장을 만나면 block내부에서는 새로 만들어진 LexicalEnvironment를 참조한다.

## OrdinaryCall
위에서 알아본 `[[Call]]`의 동작에서 OrdinaryCall이라는 단어가 3번 등장했다.

1. PrepareForOrdinayCall
2. OrdinayCallBindThis
3. OrdinayCallEvaluateBody

위 3개는 ECMAScrip에서 정의하고 있는 내부 동작인데 하나씩 살펴볼 필요가 있을것 같다.

### PrepareForOrdinayCall
PrepareForOrdinayCall결국 EC를 만들고 초기화시키는 내용을 가진 동작을 추상적으로 표현한 것인데 조금 더 자세히 보면 아래 3단계를 갖는다.

1. 새로운 EC를 생성한다. (`calleeContext`)
2. `calleeContext`에 들어갈 Lexical Environment를 생성한다.
3. `calleeContext`를 EC Stack에 추가한다. 따라서 `calleeContext`가 running execution context가 된다.

### OrdinaryCallBindThis
OrdinaryCallBindThis는 함수 객체의 `[[ThisMode]]`에 따른 `this`값 참조를 결정한다. Arrow Function, Stric mode, Environment와 연결된다.

1. `[[ThisMode]]`가 lexical인 경우는 다른 처리를 하지 않는다. (arrowFunction)
2. `[[ThisMode]]`가 stric인 경우 인자로 넘어온 thisArgument를 Environment record에 설정한다.
3. `[[ThisMode]]`가 lexical도 아니고 stric도 아닌 경우 global에 있는 `[[thisValue]]`를 Environment record에 설정한다.

### OrdinaryCallEvaluateBody
OrdinaryCallEvaluateBody는 다음 두 개 동작으로 나눌 수 있다.

1. 변수 선언 초기화 (FunctionDeclationInstantiation)
2. 코드 수행 및 결과 반환

변수 선언 초기화는 결국 Environment Record(식별자 이름과 값의 매칭을 위한 표 정도)를 채우는 동작인데 꽤 복잡한 동작들이 작성돼 있다. 특히 arguments객체가 필요한지 아닌지 기본값 매개변수가 있는지 없는지에 따라 분기가 나뉘는데 결국에는 또 EC의 LexicalEvironment와 VariableEnvironment로 이어지게된다.



## Lexical Environment

### Lexical Environment
Lexical Environment는 자바스크립트 코드에서 변수나 함수 등의 식별자를 정의하는데 사용하느 객체로 생각하면 쉽다. 
Lexical Evironment는 식별자와 참조 혹은 값을 기록하는 `Environment Record`와 `outer`라는 또 다른 Lexical Environment를 참조하는 포인터로 구성된다. `outer`는 외부 Lexical Envronment를 참조하는 포인터로, 중첩된 자바스크립트 코드에서 스코프탐색을 위해 사용한다.  

`Environment Record`와 `outer`를 조금 더 이해하기 쉽게 아래 구조를 살패보자. 

```js
function foo() {
  const a = 1;
  const b = 2;
  const c = 3;
  function bar() {}

  // 2. Running execution context

  // ...
}

foo(); // 1. Call
```

```js
// Running execution context의 LexicalEnvironment

{
  environmentRecord: {
    a: 1,
    b: 2,
    c: 3,
    bar: <Function>
  },
  outer: foo.[[Environment]]
}
```
위 구조에서는 단순히 함수 호출 한 번에 하나의 Lexical Environment를 나타내고 있지만 실제로는 함수 `BlockStatement`, `catch`, `with`등과 같은 여러 코드 구분과 상황에 따라 생성됐다 파괴되기도 한다.  

### 함수의 Lexical Environment는 언제 만들어질까?
이전 글에서 함수의 호출 - `F.[[Call]]`에는 크게 3가지 단계가 있다고 설명했다.
1. PrepareForOrdinayCall
2. OrdinaryCallBindThis
3. OrdinayCallEvaluateBody

그리고 `PrepareForOrdinayCall`에서 Executon Context를 새로 만단다고만 하였는데, 사실은 Lexical Environment 역시 함께 만들어서 Execution Context에 저장한다. 그럼 이제 `F.[[Call]]`에서 `PrepareForOrdinayCall`을 조금 더 자세히 살펴보자.

```js
// PrepareForOrdinayCall(F, newTarget)

callerContext = runningExecutionContext;
calleeContext = new ExecutionContext;
calleeContext.Function = F;

// 바로 여기, Execution Context를 만든 직후 Lexical Environment를 생성한다.
localEnv = NewFunctionEnvironment(F, newTarget);

// --- LexicalEnvironment와 VariableEnvironment의 차이는 서두에 있는 링크를 참고하자.
calleeContext.LexicalEnvironment = localEnv;
calleeContext.VariableEnvironment = localEnv;

executionContextStack.push(calleeContext);
```

### NewFunctionEnvironment
이제 NewFunctionEnvironment의 동작을 살펴보자.

```js
/ NewFunctionEnvironment(F, newTarget)

env = new LexicalEnvironment;
envRec = new functionEnvironmentRecord;
envRec.[[FunctionObject]] = F;

if (F.[[ThisMode]] === lexical) {
  envRec.[[ThisBindingStatus]] = 'lexical';
} else {
  envRec.[[ThisBindingStatus]] = 'uninitialized';
}

home = F.[[HomeObject]];
envRec.[[HomeObject]] = home;
envRec.[[NewTarget]] = newTarget;

env.EnvironmentRecord = envRec.
env.outer = F.[[Environment]];

return env;
```






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


	
내부함수는 외부함수의 렉시컬스코프를 참조한다.
만약 내부함수가 반횐되어 변수에 할당된 경우 내부함수를 통하여 외부함수의 렉시컬 스코프에 접근할 수 있다. 
모든 변수가 public접근 권한을 가지는 자바스크립트에서 이런 패턴을 이용해 private 변수를 연출한다.