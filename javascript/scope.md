## Scope & Scope Chain

    ECMA Script3에서는 함수객체는 [[scope]]라는 프로퍼티를 가지며 [[scope]]는 함수객체가 생성되는 시점과 관련된 Object Reference 정보를 가지며 Object Reference정보들을 Scope Chain이라 정의한다.
    즉 scope는 함수객체가 접근 가능한 Valiable Object의 유효범위이며 Valiable Object들의 집합을 Scope Chain이라고 한다.
함수객체는 생성과정에서 함수구문 내에서 선언된 지역변수들을 `Valiable Object`라는 객체에 저장한다. 그리고 `Global Object`의 `Valiable Object`와 연결된다. 전역 객체의 `Valiable Object`는 전역객체 자신이다. 이때 이 `Valiable Objec`들에 대한 연결들을 `Scope Chain`으로 관리하고 `[[scope]]`를 통해 `Scope Chain`을 참조하여 함수객체가 가지는 유효범위를 설정하게 된다.


## Intro
- 실행 컨텍스트


```js
var x = 1;

function foo() {
    var y = 10;
    return x + y;
}

foo();
```
위 예제코드에서 foo()함수객체가 생성딜 떄의 `[[Scope]]`와 `Scope Chain`에 대한 연결은 아래 다이어그램을 보면 이해할 수 있다.

![](/resource/img/javascript/scopeChain.jpeg)  
변수 검색은 이 `Scope Chain`에서만 탐색된다. 자바스크립트에서는 `Scope Chain`의 하부에서 부터 상위로 등록된 변수가 있는지 찾아가며 가장 처음 탐색되는 scope에 등록된 변수를 이용한다. 즉 `Scope Chain`에의해 탐색되지 않는 변수는 `undefined`이며 그런 이유로 위 예제에서 `console.log(z)`를 호출했을떄 ReferenceError가 발생한다.  

함수의 스코프를 코드로 표현해보면 다음과 같다.
```js
foo.[[SCOPE]] = {
    arguments: [],
    locals: ['y'],
    [[Parent]]: global
}
```
함수 foo가 호출이 될때 실행 컨텍스트가 생성되는데 함수 내부의 코드가 실행되면서 등장하는 변수 이름을 찾는 메모리 공간으로 사용됩니다. 이때 실행 컨텍스트는 호출된 함수객체에 내장된 스코프 객체`foo.[[SCOPE]]`를 이용해 만들어집니다. 이때 부모함수의 실행 문맥이 `[[Parent]]`속성에 기록되어 스코프 체인시에 참조된다.  
`foo()`의 실행시 생성되는 실행 컨텍스트는 다음과 같다.

```js
foo_EXECUTE_CONTEXT = {
  this: global,
  arguments: { length:0},
  y: 10,
  [[Parent]]:global
}
```



## 변수선언에 사용되는 var 키워드
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








### REF
- [javascript Basic](http://insanehong.kr/post/javascript-scope/)