# Function Pattern

## Intro

**특징**  
- 실행환경에서 동적으로 생성할 수 있다.
- 변수에 할당할 수 있고, 다른 변수에 참조를 복사할 수 있고, 확장가능하며, 몇몇 특별한 경우를 제외하면 삭제가 가능하다.
- 다른 함수의 인자로 전달할 수 있고, 다른 함수의 반환 값이 될 수 있다.
- 자기 자신의 속성과 긴으을 가질 수 있다.



## 용어정리

### 1.기명 함수 표현식
```js
var add = function addFn (a,b) {
    return a + b;
};

add.name    //addFn
```
함수 객체에 이름을 부여했다고 보면된다. `name`프로퍼티에 할당이 되기때문에 함수를 인자로 전달한 경우에 구분이 가능하다.  
함수를 변수에 할당하는 것임으로 뒤에 세미콜론을 달아주는게 좋다.

### 2. 무명 함수 표현식
```js
var add = function(){
    return a + b;
};
```


### 3. 함수 선언문(fuction declaration)
```js
function foo() {

}
```
함수 선언문에서는 함수명이 필수값이다. 입력하지 않을 경우 크롬브라우저 기준 이런 에러가 나온다.  
`Uncaught SyntaxError: Function statements require a function name`




### 4.호이스팅.
호이스팅이란 실행문맥이 생성될때 지역변수와 함수를 생성하고 초기화하는 동작을 말합니다.  
이 동작에 우선순위가 있기 때문에 이걸 간과하며 런타임에러가 발생할 수 있습니다.  
 앞서 정리한 함수 표현식과 함수 선언식이 있는데 각각 호이스팅의 우선순위가 다릅니다. 
함수 표현식의 경우 변수가 undefined로 초기화되고 소스코드상 위치에 인터프린터가 도달했을 때 함수가 변수에 재할당됩니다. 
```js
var add = function(a,b){
  return a + b
}
```

```js
var add = undefined;
add = function(a, b){
  return a + b;
}
```
반면 함수 선언식의 경우에는 변수생성과 함수 초기화가 동시에 발생하여 소스코드상 함수 정의 시점보다 윗줄에서도 함수호출이 가능합니다.  
```js
function add(a,b){  
    return a+b;
}
```
```js
var add = function add(a,b){
  return a + b;
}
```
함수 선언문 호이스팅에서 다음과 과정을 거칩니다.
1. 같은 이름의 지역변수를 생성한다.
2. 함수객체를 만든다.
3. 그 함수객체의 이름속성에 이름을 넣어준다.
함수 선언문이 실제 정의 시점보다 윗줄에서 호출이 가능한 이유는 단지 다른 변수보다 우선순위가 높아서 먼저 처리 되기 때문입니다. 함수 표현식의 경우에는 변수가 undefined로 초기화되었다가 실제 위치에서 재할당되지만 함수 선언식은 바로 함수로 초기화되는 것이 차이입니다.







## 1.동적 생성
```js
var add = new Function('a, b','return a+b');
add(1,2)
```
이 방법은 다음의 문제로 인해 권고되지 않는 방법이다.

- 코드가 문자열로 전달되어 평가한다.
- 따옴표를 이스케이프 해야한다.
- 가독성을 높이기 위해 함수 본문을 들여쓰기 하려고 신경을 써야한다.


## 2.콜백 패턴
자바스크립트에서 함수는 객체이기 때문에 다른 함수에 인자로 전달이 가능하다.  
콜백 패턴은 이벤트리스너, setTimeout등 싱글 스레드 구조의 자바스크립트에서 자주 사용되는 패턴이다.

```js
function foo (cb) {

    //do something
    cb();
}

function bar () {
    console.log('bar');
}

foo(bar);
```

### 2.1 콜백함수의 this
```js
var person = {
    name : 'cater',
    age : 29,
    sayHello : function(){
        console.log(`Hi I'm ${this.name}`)
    }
};


function foo (fn){

    if(typeof fn === 'function'){
        fn();
    }
}

foo(person.sayHello);
```
자바스크립트의 this는 실행문맥에 따라 결정된다. 따라서 객체의 메서드를 콜백으로 전달할 경우 `this`는 전역객체를 참조한다.
이 경우 메소드를 소유하는 객체를 함께 넘겨야한다.

```js
var person = {
    name : 'cater',
    age : 29,
    sayHello : function(){
        console.log(`Hi I'm ${this.name}`)
    }
};


function foo (fn, obj){

    if(typeof fn === 'function'){
        fn.call(obj);
    }
}

foo(person.sayHello, person);
```


## 3.함수 반환 패턴.

함수를 반환하는 패턴이다. 주로 클로저를 생성하여 변수를 캡슐화하여 사용한다.
```js
var setup = function() {
  var count = 0;
  return function() {
    return (count += 1);
  };
};

var next = setup();
next(); // 1 반환
next(); // 2 반환
next(); // 3 반환
```


## 4. 자기 자신을 정의하는 패턴.

```js
var scareMe = function() {
  console.log("init!");
  scareMe = function() {
    console.log('used');
  }
}

scareMe(); // init!
scareMe(); // used!
```

새로운 함수를 만들어 기존 함수에 덮어씌운다. 이 패턴은 함수가 초기작업을 한번만 수행할 경우에 유용하다.  
이 패턴에는 단점이 있는데 자기 자신을 재정의한 이후에는 이전의 원본 함수에 추가했던 모든 속성을 잃게 된다는 것이다.

## 5.즉시실행 패턴.

이 패턴은 선언과 동시에 실행되도록 하는 문법이다. 
외부에서 간섭이 없는 상태를 유지할 수 있기떄문에 일회성 기능함수나 변수의 밀실화를 할떄 유용하다. 2가지 형태의 표현이 가능하다.
```js
(function() {
    console.log('hi')
})()
```

```js
(function() {
    console.log('hi')
}())
```

페이지 로딩이 완료된후 이벤트 핸들러를 등록, 객체 생성등의 작업에 사용된다.

### 5.1 매개변수
```js
(function (global) {
  // 
}(this));
```
이런식으로 this를 통해 전역객체를 전달받을 수 있다. `window`객체를 작성하지 않았기 때문에 브라우저가 아닌 실행환경에서도 코드를 공통으로 사용 가능하다.


### 5.2 즉시실행 함수의 반환값

```js
var age = 29;

var isAdult = (function(_age){
    return (_age>18);
})(age)

console.log(`My age ${age} and I'm adult = ${isAdult}`)
```
이런 패턴은 어떤 연산을 통해 값을 할당해야하는 경우 유용하다.

```js
var result = function(){
    return 2;
}()
```
이런식으로도 가능하다. 이게 어떻게 되는지는.. 좀 신기하다.


```js
var Person = function(name, age){
    this.name = name;
    this.age = age;
    this.isAdult = (function(_age){
        return (_age>19);
    })(this.age)
}

var p1 = new Person('cater', 29);

console.log(p1.isAdult);
```




**다음의 차이를 설명하시오**  
```js
//객체와 객체 표현식에 대한 차이 이해.

function(){
    return 1;
}()

(function(){
    return 2;
})

var foo  = function(){
    return 1;
}();

var foo = (function(){
    return 1;
})()
```


## 6.즉시 객체 초기화.
전역공간이 난잡해지지 않도록 보호하는 방법으로 직시실행함수와 비슷한 패턴이다.
이 패턴의 단점은 자바스크립트 압축 도구가 즉시 실행 함수패턴에 비해 효과적으로 압축하지 못한다는데 있다.  
namespace에 변수가 등록되지 않음으로 좋다!


```js
({
    runtimeEnv: 'local',
    step1: function(){
        if(this.runtimeEnv === 'local'){
            console.log('runtimeEnv is local')
        }else{
            console.log('runtimeEnv is real')
        }

        // do somthing....
        console.log('step1...');
    },
    step2: function(){
        console.log('step2...')
    },

    init: function(){
        this.step1();
        this.step2();

        console.log('application init is done');
    }

}).init();
```



## 7.초기화 시점 분기.
이 패턴은 최적화 패턴이다. 어떤 조건이 프로그램의 생명주기 동안 변경되지 않는게 확실할 경우 조건을 단 한번만 확인한느 것이 바랍직하다.

브라우저 환경에서 어떤 기능을 지원하는지 확인하는 로직이 있다고 하자. 브라우저 실행환경이 변하지 않기 때문에 이 검증로직을 매번 실행할 필요가 없다.
XMLHttpReqeust를 지원하는지 검증하는 로직으로 예를 들어 보겠다.


```js
var utils = {
  addListener: function(el, type, fn) {
    if (typeof window.addEventListener === 'function') {
      el.addEventListener(type, fn, false);
    } else if (typeof document.attachEvent === 'function') {
      el.attachEvent('on' + type, fn);
    } else {
      el['on' + type] = fn;
    }
  },
  removeListener: function(el, type, fn) {
    // .... 동일한 분기체크를 통해 이벤트를 삭제 한다.
  }
}

```


```js
var utils = { addListener: null, removeListener: null };

if( typeof window.addEventListener === 'function') {
  util.addListener = function(el, type, fn) {
    el.addEventListener(type, fn, false);
  };
  util.removeListener = function(el, type, fn) {
    el.removeEventListener(type, fn, false);
  };
} else if( typeof document.attachEvent === 'function') {
  util.addListener = function(el, type, fn) {
    el.attachEvent('on' + type, fn);
  };
  util.removeListener = function(el, type, fn) {
    el.detachEvent('on' + type, fn);
  };
} else {
  util.addListener = function(el, type, fn) {
    el['on' + type] = fn;
  };
  util.removeListener = function(el, type, fn) {
    el['on' + type] = null;
  };
}
```

## 8.메모리제이션 패턴
함수는 객체이므로 속성을 가질 수 있다. 함수 속성에 cache를 등록해서 복잡한 로직을 피할 수 있다.


```js
var foo = function(jsonString){
    if(!foo.isInit){
        var jsonData = JSON.parse(jsonString);

        // 연산이 많이 드는 작업 수행....
        //jsonData 가공중....

        foo.inInit = true;
        foo.cache.result = jsonData;
    }
    return foo.cache.result;
}
```

## 9.설정객체 패턴.

함수의 파라미터가 여러개인 경우 객체의 프로퍼티로 설정하여 넘기는 방식이다.

```js
var registEmploee(name, age, type, gender, addr){

}

registEmploee('cater',29, 'Web front-end', 'M', null);
```
이런 경우 매개변수의 순서를 외워야하고 가독성도 좋지않다. 하나의 객체를 만들어 인수들 전달하는 것이 나은데 이때 이 객체를 설정(configration)의 의미로 conf라고 한다.


```js
var registEmploee( conf )

var empData = {
    name : 'cater',
    age : 29,
    type : 'Web front-end',
    gener: 'M',
    addr :null
}

registEmploee(empData);
```

이 패턴에는 장단점이 있는데 다음과 같다.

**장점**  
- 매개변수의 순서를 기억할 필요가 없다.
- 선택적으로 매개변수를 생략할 수 있다.
- 읽기 쉽고 유지보수가 편하다.
- 매개변수를 추가하거나 제거하기 편하다.

**단점**
- 매개변수의 이름을 기억해야한다.
- 속성이름은 압축되지 않는다.





## ref
- [함수 패턴](http://frontend.diffthink.kr/2016/05/blog-post_20.html)
- [코드 재사용 패턴](http://frontend.diffthink.kr/2016/06/blog-post_29.html)