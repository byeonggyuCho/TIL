# Class : How to different between ES5 function and ES6 Classes?

## Info
Class 문법은 prototype 상속과 어떻게 다른가? 단지 prototype 상속의 `Syntatic Sugar`일까? 지금부터 차이를 알아보자.

## 한줄 요약.
- 문법적 사용범위에 제약을 둬서 코드가 모호해지는 상황을 예방한다.
- 객체간의 상속관계가 복잡한 프로그램을 설계시 Class 문법의 차이가 극명해진다.
    - 좀 더 유연한 상속관계를 표현할 수 있다.


## Constructor


### 1) new Operater
ES6의 `constructor`는 기존 생성자 함수와 동일하게 동작합니다.
```js
function ES5(name) {
  this.name = name;
}

class ES6 {
  constructor(name) {
    this.name = name;
  }
}

const es5 = new ES5('ES5');
const es6 = new ES6('ES6');
console.log(es5.name, es6.name);    // ES5 ES6
```

하지만 ES5에서는 생성자 함수를 직접 호출해서 일반 함수로서 동작했던 것과 달리 
`class`는 반드시 `new`연산자와 함께 호출해야합니다.  
생성자함수로 설계된 함수는 오직 생성자함수로 사용되도록 강제한다고 볼 수 있습니다.

```js
function ES5(name) {
  this.name = name;
  return name + ' es5';
}

class ES6 {
  constructor(name) {
    this.name = name;
    return name + ' es6';
  }
}

console.log(ES5('ES5'));                        // ES5 es5
console.log(ES5.prototype.constructor('ES5'));  // ES5 es5
console.log(ES6('ES6'));                        // Uncaught TypeError
console.log(ES6.prototype.constructor('ES6'));  // Uncaught TypeError

//Uncaught TypeError: Class constructor ES6 cannot be invoked without ‘new’(…)
```
따라서 `constructor`함수에서 `return`연산자로 값을 반환할 수 없습니다. (이에 대한 내용은 new연산자의 동작원리를 이해하면 도움이 됩니다.)



### 2) 'super' and 'extends'
프로토타입 상속에서는 자식클래스의 생성자 함수가 부모클래스의 생성자 함수의 내용을 덮어씌우는 식으로 동작합니다. 
따라서 부모클래스의 생성자함수를 자식클래스의 생성자함수에서 호출한 것 같은 효과를 얻을 수 없습니다. 

```js
function Parent() {
  this.a = 1;
}
function Child() {
  this.b = 2;
}

Child.prototype = new Parent();
Child.prototype.constructor = Child;
var obj = new Child();
console.log(obj.a, obj.b);              // 1 2
console.log(obj.hasOwnProperty('a'));   // false
console.log(obj.hasOwnProperty('b'));   // true
```
prototype chain에 의해 `a`프로퍼티를 참조하지만 `hasOwnProperty`를 통해 `obj`에 `a`프로퍼티가 없다는걸 확인할 수 있습니다. 
이건 정확히 따지자면 상속이라고 보긴 어렵습니다. prototype chain에 의해 참조를 하고 있을 뿐이죠. 상속의 포인트는 소유권에 있습니다. 
그럼 실제로 부모 클래스의 속성을 상속받기 위해선 어떻게 해야할까요?  
자식 클래스에서 부모 클래스의 생성자함수를 그대로 차용하여 실행하기를 원한다면 다음과 같이 해야합니다.

```js
function Parent(){
  this.a = 1;
}

function Child(){
  var parentObj = Object.getPrototypeOf(this);
  for(let i in parentObj){
    this[i] = parentObj[i];
  }
  this.b = 2;
}

Child.prototype = new Parent();
Child.prototype.constructor = Child;
var obj = new Child();
console.log(obj.a, obj.b);              // 1 2
console.log(obj.hasOwnProperty('a'));   // true
console.log(obj.hasOwnProperty('b'));   // true
```
하지만 이런 표현 마저도 부모 클래스의 값을 복제한 것이지 부모 클래스의 생성자함수를 차용한 것과는 다릅니다.  
ES6에서는 `extends`키워드와 `super`키워드를 사용하면 부모 클래스의 생성자함수를 자식클래스에서 호출하는게 가능합니다.

```js
class Parent {
  constructor(){
    this.a = 1;
  }
}

class Child extends Parent {
  constructor(){
    super();
    this.b = 2;
  }
}

const obj = new Child();
console.log(obj.a, obj.b);              // 1 2
console.log(obj.hasOwnProperty('a'));   // true
console.log(obj.hasOwnProperty('b'));   // true
```
여기서 Child는 Parent의 인스턴스를 상속받은 것이 아니라 Parent의 메소드만 상속받는 것으로 Child 인스턴스의 프로토타입 체인에서 Parent constructor의 실행 결과는 존재하지 않게 됩니다.  

```js
let childPrototype = Object.getPrototypeOf(obj);
console.log(childPrototype.a );  // undefined
console.log(childPrototype.hasOwnProperty('a'));  // false
```

ES5에서 좀 더 정확한 subClass를 구현하기 위해선 임시생성자를 활용하는 방법이 있습니다.
```js
function Parent() { this.a = 1; }
function Child() { this.a = 2; }
function Proxy() { }

Proxy.prototype = new Parent();
Child.prototype.constructor = Child;
Child.superClass = Parent.prototype;
```

위 프록시 패턴에서 프록시 객체를 재활용하기 위해 모듈 패턴을 적용했습니다.
```js
var inherit = (function() {
  function F(){ }

  return function(C, P) {
    F.prototype = P.prototype;
    C.prototype = new F();
    C.constructor.prototype = C;
    C.superClass = P.prototype;
  }
})();

function Parent() { 
    this.a = 1; 
}
function Child() { 
    this.a = 2; 
}

inherit(Child, Parent);
```
<br><br>



## Method

### 1) static method
ES5에서 Static method를 구현하면 다음과 같이 작성해야합니다.  

```js
function Parent() {}
Parent.staticMethod = function() {
  this.s = 11;
  return 'static method';
}
Parent.prototype.method = function() {
  this.m = 12;
  return 'method';
}

function Child() { }
Child.prototype = new Parent();
Child.prototype.constructor = Child;

var obj = new Child();
```


이제 ES6에서의 방법을 보시겠습니다.
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

class Child extends Parent { }
const obj = new Child();
```

method의 출력결과는 같습니다.
```js
console.log(obj.method());                   // 'method'
console.log(Child.prototype.method());       // 'method'
console.log(Parent.prototype.method());      // 'method'
```

그러나 static method의 경우는 결과가 다릅니다.
```js
// ES5
console.log(obj.staticMethod());             // Uncaught TypeError
console.log(Child.staticMethod());           // Uncaught TypeError
console.log(Parent.staticMethod());          // 'static'
// ES6
console.log(obj.staticMethod());             // Uncaught TypeError
console.log(Child.staticMethod());           // 'static'
console.log(Parent.staticMethod());          // 'static'
```

ES5환경에서 static Method상속을 구현하기 위해서는 Parent의 메소드를 Child에 복사해야합니다. Child와 같은 이름의 static이 있는 경우 OverWtring되는 것을 방지하기 위해 접두어나 접미어를 붙여야합니다. 혹은 프로토타입 체이닝을 통해 직접 superClass에 접근해야합니다.

```js
var inherit = (function() {
  function F(){ }
  return function(C, P) {
    F.prototype = P.prototype;
    C.prototype = new F();
    C.constructor.prototype = C;
    C.superClass = P.prototype;
    for(var static in P) {
      C['super_' + static] = P[static];
    }
  }
})();

function Parent() { this.a = 1; }
Parent.method = function(){ console.log('super static'); };
function Child() { this.a = 2; }
Child.method = function(){ console.log('sub static'); };
inherit(Child, Parent);
Child.method();                         // sub static method
Child.super_method();                   // super static method
Child.superClass.constructor.method();  // super static method
```
이 역시 완벽한 대안은 아니며 자식클래스의 static method내에서 부모 클래스의 method를 이용할 때 다른 방법을 고민해야합니다.
클래스간 상속관계가 복잡해질 수록 상황이 복잡해집니다.


### 2) 생성자 함수.

ES5의 static method 및 method는 그 자체로 함수이기 때문에 별개의 생성자함수를 사용할 수 있습니다.
```js
var methodObj = new ES5Parent.prototype.method();
var staticObj = new ES5Parent.staticMethod();
console.log(staticObj);    // P…t.staticMethod {s: 11}
console.log(methodObj);    // P…t.method {m: 12}
```

반면 ES6의 static method 및 method는 생성자함수로 활용할 수 없습니다.
```js
var methodObj = new ES6Parent.prototype.method();
var staticObj = new ES6Parent.staticMethod();
console.log(staticObj);    // Uncaught TypeError
console.log(methodObj);    // Uncaught TypeError
```
static Method의 속성을 보면 그 차이가 좀 더 명확합니다.
arguments, caller등 함수 기본 속성값이 없으며 prototype도 없습니다. 이는 ES5에서는 없던 새로운 종류의 함수라 볼 수 있습니다.
ES5에서 일반함수로 method의 기능을 연출했던것과 달리 태생적으로 method로 구분되어있습니다. 기능이 제한되어 오직 method로만 사용 가능한 함수이죠.



### 3) superClass 메소드 차용.

```js
function Parent() { }
Parent.prototype.method = function() {
  return 'super';
}

function Child() { }
Child.prototype = new Parent();
Child.prototype.constructor = Child;
Child.prototype.method = function() {
  return Object.getPrototypeOf(this).method() + ' sub';
}

var obj = new Child();
console.log(obj.method());      // 'super sub sub'
```

ES5에서 부모클래스와 자식클래스가 동일한 메소드를 정의하면 부모의 메소드를 자식에서 호출하기 위해서 탐색과정을 거쳐야합니다.
Child의 인스턴스 obj에서 method를 탐색하는 과정을 설명해보겠습니다. `obj.method`가 호출하면 최초실행시 `this`는 obj가 할당되어있다가 재귀적으로 `Child.prototype`이 할당되었다가 다시 `Parent.prototype`이 할당되기 때문에 'spuer sub sub'가 나오게 됩니다.  

이런 `this`를 사용하면서 생기는 문제는 ES6에서 똑같이 확인됩니다.
```js
class Parent {
  method() {
    return 'super';
  }
}
class Child extends Parent {
  method() {
    return Object.getPrototypeOf(this).method() + ' sub';
  }
}
var obj = new Child();
console.log(obj.method());      // 'super sub sub'
```
하지만 `super`키워드를 이용해 `this`활용시 문제를 해결할 수 있습니다.
```js
class Parent {
  method() {
    return 'super';
  }
}
class Child extends Parent {
  method() {
    return super.method() + ' sub';
  }
}
var obj = new Child();
console.log(obj.method());      // 'super sub'
```
`super`키워드는 상위클래스만을 가리키므로 재귀적으로 여러번 호출될 염려없이 오직 부모클래스의 메소드만 상속받을 수 있습니다.



<br><br>


## Hoisting

### 1) ReferenceError
```js
// ES5
var es5 = new ES5();
function ES5() {
  this.a = 1;
}
console.log(es5);    // ES5 {a: 1}
```

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

### 2) Block Scope

ES5의 경우 `'use strict'`일 경우에만 블록 스코프의 영향을 받습니다.
```js
function A(){ 
    this.a = 1; 
}


{
  function A(){ this.a = 2; }
  console.log(new A());    // A {a: 2}
}
console.log(new A());      // A {a: 2}

```

```js
'use strict';
function A(){ 
    this.a = 1; 
}

{
  function A(){ this.a = 2; }
  console.log(new A());    // A {a: 2}
}

console.log(new A());      // A {a: 1}
```

반면 Class는 언제나 블록스코프에 종속되는걸 확인할 수 있습니다.
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


### 3) hoisting

```js
let a = 'global';
{
    console.log(a);
}

// global
```
당연한 결과죠? 그럼 다음 예제을 봅시다.

```js
let a = 'global';
{
    console.log(a);
    let a = 'local';
}
// Uncaught ReferenceError: Cannot access 'a' before initialization
```
이상합니다. 스코프 체인에 의해 전역변수를 참조하지 않고 Refferencce Error를 뱉습니다. 
이 현상을 설명하기 위해선 TDZ(Temploral Dead Zone)에 대해 알아야합니다.  

`var`는 LexcialEvironment가 형성될 때 생성되며 동시에 `undefined`로 초기화 됩니다. 
반면 `let`과 `const`는 `LexicalEnvironment`가 형성될 때 함께 생성되지만, 이 변수들의 `LexicalBinding`이 평가되기 전까지는 접근할 수 없습니다. 
`LexicalBinding`이 평가되어야 초기값이 할당됩니다. 정리해보면 생성은 됐지만 접근할 수 없는 시점이 생깁니다.  

`hoisting`의 정의는 `Lexical Environment`가 형성될 때 변수가 생성된다는 것입니다. 즉 `let`이나 `const`도 호이스팅이 됩니다. 차이는
앞서 말했다 싶이 초기화시점입니다. `var`는 `hoisting`과 동시에 초기화가 되지만 `let`과 `const`는 `LexicalBinding`이 되어야 초기화되기 되기때문에 접근 불가능한 시점이 생기는데 이걸 `TDZ`라 합니다.  

그럼 다시 예제로 돌아와서 생각해 봅시다.  첫번째 예제에서 블럭스코프 안에 선언된  변수 a는 없습니다. 따라서 스코프체인에 따라 전역변수를 참조합니다.  두번째 예제에는 전역변수와 별개로 지역변수 a가 선언되어있으며 이 변수는 `LexicalEnvironment`가 생성된 시점에 `hoisting`에 의해 생성되기 때문에 `console.log(a)`가 실행되는 시점에는 비할당 시점입니다. 즉 `TDZ`입니다.

정리하자면 `var`는 `hosting`과 초기화가 동시에 일어나지만 `let`과 `const`는 `hosting`이 일어난 뒤 `LexicalBinding`시점에 초기화되기때문에 일시적으로 초기화가 되지않는 틈이 생깁니다.  

이런 `hoisting`에 대한 문제는 `function`과 `class`에서도 똑같이 나타납니다.

```js
function A(){
    this.a = 1;
}

{
    console.log(new A());  // A {a: 2}
    function A(){ 
      this.a = 2;   
    }
}

```

\
```js
class A {
  constructor(){ this.a = 1; }
}
{
  console.log(new A());  // Uncaught ReferenceError: A is not defined

  class A {
    constructor(){ 
        this.a = 2; 
    }
  }
}
```







## Ref
- [ES6 Overview in 350 Bullet Points](https://github.com/bevacqua/es6#classes)
- [class](https://poiemaweb.com/es6-class)
- [es6 class](https://gomugom.github.io/is-class-only-a-syntactic-sugar/)
- [ES6 Classes in Depth](https://ponyfoo.com/articles/es6-classes-in-depth)
- [classes just syntatic sugar for prototypeal pattern in javascript?](https://stackoverflow.com/questions/36419713/are-es6-classes-just-syntactic-sugar-for-the-prototypal-pattern-in-javascript)
- [ES6의 class가 문법설탕이 아닌 이유](https://www.bsidesoft.com/?p=5370)