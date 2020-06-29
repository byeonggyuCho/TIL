## Scope & Scope Chain

    ECMA Script3에서는 함수객체는 [[scope]]라는 프로퍼티를 가지며 [[scope]]는 함수객체가 생성되는 시점과 관련된 Object Reference 정보를 가지며 Object Reference정보들을 Scope Chain이라 정의한다.
    즉 scope는 함수객체가 접근 가능한 Valiable Object의 유효범위이며 Valiable Object들의 집합을 Scope Chain이라고 한다.
함수객체는 생성과정에서 함수구문 내에서 선언된 지역변수들을 `Valiable Object`라는 객체에 저장한다. 그리고 `Global Object`의 `Valiable Object`와 연결된다. 전역 객체의 `Valiable Object`는 전역객체 자신이다.  
이때 이 `Valiable Object`들에 대한 연결들을 `Scope Chain`으로 관리하고 `[[scope]]`를 통해 `Scope Chain`을 참조하여 함수객체가 가지는 유효범위를 설정하게 된다.


## Intro
- 실행 컨텍스트




## 스코프란?
변수를 탐색하는 방법에 대한 규칙이라고 할 수 있다.  
스코프를 이용하여 변수를 캡슐화하거나 네임스페이스에서 충돌을 피할 수 있다.

## 함수 스코프
함수를 통해 경계가 나눠진 스코프를 말한다.  

```js
var x = 1;

function foo(z) {
    var y = 10;
    return x + y + z;
}

foo(100);
```
위 예제코드에서 foo()함수객체가 생성딜 떄의 `[[Scope]]`와 `Scope Chain`에 대한 연결은 아래 다이어그램을 보면 이해할 수 있다.

![](/resource/img/javascript/scopeChain.jpeg)  
변수 검색은 이 `Scope Chain`에서만 탐색된다. 자바스크립트에서는 `Scope Chain`의 하부에서 부터 상위로 등록된 변수가 있는지 찾아가며 가장 처음 탐색되는 scope에 등록된 변수를 이용한다. 즉 `Scope Chain`에의해 탐색되지 않는 변수는 `undefined`이며 그런 이유로 위 예제에서 `console.log(z)`를 호출했을떄 ReferenceError가 발생한다.  

함수의 스코프를 코드로 표현해보면 다음과 같다.
```js
foo.[[SCOPE]] = {
    arguments: ['z'],       //인자
    locals: ['y'],          //지역변수
    [[Parent]]: global      //생성당시 Excution Context
}
```
함수 foo가 호출될 때 실행 컨텍스트가 생성되는데 함수 내부의 코드가 실행되면서 등장하는 변수 이름을 찾는 메모리 공간으로 사용됩니다. 이때 실행 컨텍스트는 호출된 함수객체에 내장된 스코프 객체`foo.[[SCOPE]]`를 이용해 만들어집니다.  
이때 부모함수의 실행 컨텍스트가 `[[Parent]]`속성에 기록되어 스코프 체인시에 참조된다.  
`foo()`의 실행시 생성되는 실행 컨텍스트는 다음과 같다.

```js
EC_foo = {
  this: window,
  arguments: {0:100, length:1},
  z: 100                    //인수에 arguments값 할당.
  y: undefined,            //지역변수에 undefined 할당하여 초기화.
  [[Parent]]:global        //생성시 Excution Context
}
```

1. `this`: 컨텍스트 객체가 참조된다.
2. `arguments`: 인자의 리스트가 생성된다.
3. 인수에 `arguments`를 순서대로 할당한다.
4. 지역변수가 키로 정리되고 `undefined`가 할당된다.
5. `[[Parent]]`: 함수 생성당시 부모함수의 실행컨텍스트가 할당된다.



### var 키워드
자바스크립트에서 `var`키워드는 스코프를 설정하는 역할을 한다. `var`키워드를 입력하면 현재 실행문맥(Execute context)에 변수가 등록이 되며 생략하면 `Global Scope`에 등록된다.  
 
```js
x = 1;      // Global

function sum() {
    y = 2 // Global
    var z = 3 // this Scope
    
    return x+y+z;
}

console.log(sum())      // 6
console.log(x+y)        // 3
console.log(x+y+z)      //ReferenceError

 ```
 위 예제에서 변수`z`는 현재 스코프 즉 코드 블럭의 주인(sum)인 객체의 `Valiable Object`에 등록되기때문에 로컬변수가 된다.




```js
function parent(){
  var scope = "p";
  return function child( $scope ){
        console.log(scope);
        scope = $scope;
  };
}
 
var p1 = parent();

p1('c')
```



## 블록 스코프
- 코드블록(`{}`)을 통해 경계가 나눠진 스코프다.  
- let, const, class로 선언된 변수는 블록 스코프의 영향을 받는다.  


### let
```js
{
  let person = {
    name: 'Ted'
  }
  console.log(1,person.name)
}
console.log(2,person.name)
```

### const
```js
{
  const person = {
    name: 'Ted'
  }
  console.log(1,person.name)
}
console.log(2,person.name)
```
### class
```js
{
  class Person = {
      constructor(name) {
        this.name = name;
      }
  }
  
  let ted = new Person('Ted')
  console.log(1,ted.name)
}
let ted = new Person('Ted')
console.log(2,ted.name)
```


## 스코프의 동작방식

### 렉시컬 스코프(Lexical Scope)
컴파일타임(정확히는 렉싱 타임)에 정의되어 코드를 작성할 때 함수가 선언된 위치에 따라 참조하는 식별자가 결정되는 스코프  
쉽게 말하면 함수의 스코프는 선언하는 시점에 정해진다는 말이다.  
```js
var name = 'Bill';
function log() {
  console.log(name);
}

function wrapper() {
  var name = 'Ted';
  log();
}
wrapper(); // Bill
```
함수는 선언하는 순간에 스코프가 결정된다.  이것을 렉시컬 스코프라고 한다.  
위 코드를 살펴보면 log함수의 스코프는 다음처럼 설명할 수 있다.
```js
log.[[SCOPE]] = {
    arguments: [],       //인자
    locals: [],          //지역변수
    [[Parent]]: global      //생성당시 Excution Context
}
```
log의 렉시컬 스코프에서 탐색할 수 없음으로 부모의 스코프에서 탐색하게 되어 'Bill'이 나온다.  


### 다이나믹 스코프(Dynamic Scope)
함수가 실행되는 컨텍스트에 따라 식별자가 결정되는 스코프를 말한다.  
- this키워드만 해당함.
- 화살표 함수를 이용하면 this가 다이나믹스코프가 아닌 렉시컬 스코프로 적용된다.  
  - 함수를 선언하는 스코프의 this가 참조중인 객체를 참조한다.







### REF
- [scope에 대한 간단 정리](https://thisblogfor.me/javascript/scope/)
- [javascript Basic](http://insanehong.kr/post/javascript-scope/)
- [scope](https://www.bsidesoft.com/?p=320)