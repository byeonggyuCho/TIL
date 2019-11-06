# this
자바스크립트에서 모든 함수는 실행될 때마다 함수 내부에 this라는 객체가 추가된다.   
arguments라는 유사 배열 객체와 함께 함수 내부로 암묵적으로 전달된다.  
this는 기본적으로 window 객체를 참조하며  call, bind, apply 등의 API에 의해 참조값이 변한다.  
이외에 this객체가  참조하는 객체가 달라지는 상황이 있는데 각 상황은 다음과 같다.


## Case1 객체의 메서드
객체의 프로퍼티가 함수일 경우 메서드라고 부른다.   
이 때의 this는 메서드를 실행할 때 메서드를 소유하고 있는 객체(메소드를 포함하고 있는 인스턴스)를 참조한다.   
즉 해당 메서드를 호출한 객체로 바인딩된다. A.B일 때 B함수 내부에서의 this는 A를 가리키는 것이다.


```js
var myObject = {
  name: "foo",
  sayName: function() {
    console.log(this);
  }
};
myObject.sayName();
// console> Object {name: "foo"}
```

이런 경우는 어떨까?
```js
var myObject = {
  name: "foo",
  sayName: function() {
    console.log(this);
  }
};

var sayNameFn = myObject.sayName;
sayNameFn();
```
메서드가 변수에 할당되며는 순간 일반함수가 된다. 따라서 sayNameFn은 일반함수임으로 `this`의 참조값은 `window`객체가 된다. 이런 특이점은 메서드를 콜백으로 넘길때 간과하기 쉽다.

```js
var obj = {
  name: 'chris',
  hello: function sayName() {
    console.log(this.name);
  }
};

setTimeout(obj.hello, 1000); 

var name = 'global context!';
```
`setTimeout`의 입장에서는 `obj`객체와 상관없이 `sayName`이라는 함수객체만 알고 있을 뿐이다. 따라서 콜백으로 실행되는 `sayName`의 실행환경에서 `this`가 참조하는 값은 전역변수인 global context가 된다.


## Case2 함수
특정 객체의 메서드가 아닌 함수를 호출하면, 해당 함수 내부 코드에서 사용된 this 는 전역객체에 바인딩 된다. A.B일 때 A가 전역 객체가 되므로 B함수 내부에서의 this는 당연히 전역 객체에 바인딩 되는 것이다.

```js
var value = 100;
var myObj = {
  value: 1,
  func1: function() {
    console.log(`func1's this.value: ${this.value}`);

    var func2 = function() {
      console.log(`func2's this.value ${this.value}`);
    };
    func2();
  }
};

myObj.func1();
// console> func1's this.value: 1
// console> func2's this.value: 100
```
func1에서의 this는 func1이 정의된 객체인 myObj이다. myObj가 this로 바인딩되기 때문에 this.value는 1이 된다. 하지만 func2는 myObj의 메서드가 아니다. 따라서 메서드가 아닌 함수의 this는 전역객체를 참조하게 되고  value는 100가 된다.


## Case3 생성자 함수를 통해 객체를 생성
함수 호출이 아닌 new연산자를 통해 **생성자 함수**를 호출할 때는 또 this가 다르게 바인딩 된다. new 키워드를 통해서 호출된 함수 내부에서의 this는 객체 자신이 된다. 생성자 함수를 호출할 때의 this 바인딩은 생성자 함수가 동작하는 방식을 통해 이해할 수 있다.  

*cf.* **생성자함수** : new 연산자에 의해 호출되는 함수.  

new 연산자를 통해 함수를 생성자로 호출하게 되면, 일단 빈 객체가 생성되고 this 가 바인딩 된다. 이 객체는 함수를 통해 생성된 객체이며, 함수의 부모인 프로토타입 객체와 연결되어 있다. 그리고 return 문이 명시되어 있지 않은 경우에는 this로 바인딩 된 새로 생성한 객체가 리턴된다.

```js
var Person = function(name) {
  console.log(this);
  this.name = name;
};

var foo = new Person("foo"); // Person
console.log(foo.name); // foo
```

## Case4 apply, call, bind 를 통한 호출
this를 자바스크립트 코드로 주입 또는 설정할 수 있는 방법이다.   
Case2에서 사용했던 예제 코드를 다시 한 번 보고 오자. func2를 호출할 때, func1에서의 this 를 주입하기 위해서 위 세가지 메소드를 사용할 수 있다. 그리고 세 메소드의 차이점을 파악하기 위해 func2에 파라미터를 받을 수 있도록 수정한다.

### 4.1 bind 메소드 사용
함수 선언시 함수의 this 참조객체와 매개변수를 변경한 새로운 함수를 반환한다.
```js
var value = 100;
var myObj = {
  value: 1,
  func1: function() {
    console.log(`func1's this.value: ${this.value}`);

    var func2 = function(val1, val2) {
      console.log(`func2's this.value ${this.value} and ${val1} and ${val2}`);
    }.bind(this, `param1`, `param2`);
    func2();
  }
};

myObj.func1();
// console> func1's this.value: 1
// console> func2's this.value: 1 and param1 and param2
```


### 4.2 call 메소드 사용
함수 호출시 동적으로 this참조를 변경할 수 있다.  
call의 첫번째 파라미터가 this의 참조값이 된다.
```js
var value = 100;
var myObj = {
  value: 1,
  func1: function() {
    console.log(`func1's this.value: ${this.value}`);

    var func2 = function(val1, val2) {
      console.log(`func2's this.value ${this.value} and ${val1} and ${val2}`);
    };
    // func2의 this가 window에서 myObj를 참조한다.
    func2.call(this, `param1`, `param2`);
  }
};

myObj.func1();
// console> func1's this.value: 1
// console> func2's this.value: 1 and param1 and param2
```


### 4.3 apply 메소드 사용
함수 호출시 동적으로 this참조를 변경할 수 있다.
```js
var value = 100;
var myObj = {
  value: 1,
  func1: function() {
    console.log(`func1's this.value: ${this.value}`);

    var func2 = function(val1, val2) {
      console.log(`func2's this.value ${this.value} and ${val1} and ${val2}`);
    };
    func2.apply(this, [`param1`, `param2`]);
  }
};

myObj.func1();
// console> func1's this.value: 1
// console> func2's this.value: 1 and param1 and param2
```
bind vs apply, call 우선 bind는 함수를 선언할 때, this와 파라미터를 지정해줄 수 있으며, call과 apply는 함수를 호출할 때, this와 파라미터를 지정해준다.

apply vs bind, call apply 메소드에는 첫번째 인자로 this를 넘겨주고 두번째 인자로 넘겨줘야 하는 파라미터를 배열의 형태로 전달한다. bind메소드와 call메소드는 각각의 파라미터를 하나씩 넘겨준다.



### this 바인딩의 우선순위

#### 1.임시적 바인딩보다 명시적 바인딩이 우선순위가 높다.
```js
function hello() {
  console.log(this.name);
}

var obj = {
  name: 'chris',
  hello: hello
};

obj.hello(); // 'chris'
obj.hello.call({name: 'alice'}); // 'alice
```

#### 2. New 바인딩
자바스크립트 함수 앞에 `new`연산자를 붙여서 실행하면 다음과 같은 일이 일어난다.
- 새로운 객체를 반환한다.
- 새로운 객체는 객체의 메소드를 호출시 `this`로 바인딩된다.

```js
function Person(name){
  this.name = name
}

Person.prototype.hello = function() {
  console.log(this.name)
}

var man = new Person('cater')
man.hello();
```
`new Person(name)`을 실행해 생성된 새로운 객체를 변수 `man`에 할당했다.
`man.hello`를 실행하면 `hello()`함수의 실행환경에서 `this`는 `man`과 바인딩된다.


#### 3. 임시적 바인딩과 new 바인딩의 우선순위.
```js
function setName(name) {
  this.name = name
}

var p1 = {
  setName: setName
};

p1.setName('Jimmy');
console.log(p1.name); // Jimmy

var p2 = new p1.setName('Cater')
console.log(p1.name); // Jimmy
console.log(p2.name); // Cater
```
위 예제에서 객체의 메서드의 실행환경에서 `this`는 메서드를 소유하는 객체를 참조하기 때문에 `p1.setName`의 `this`가 p1이라는 것은 명백하다. 
그렇다면 객체의 메서드에 `new`연산자를 붙여서 실행하면 `this`는 뭘 참조할까???  
`new`연산자를 통해 새로운 객체를 생성하고 `this`는 새로운 객체를 참조하기떄문에 당연히 p1 메소드에서 `this`의 참조값과는 별개로 `this`는 새롭게 생성된 객체를 참조한다.


#### 4. 명시적 바인딩과 new 바인딩의 우선순위.

```js

function setName(name) {
  this.name = name
}

var p1 = {}

var setNameFn = setName.bind(p1);
setNameFn('chris');
console.log(p1.name); // chris

var p2 = new setNameFn('alice')
console.log(p1.name); // chris
console.log(p2.name); // alice
```
위 예에서 `setNameFn`에서 `this`는 `p1`을 참조한다.  
이때 `new`연산자를 통해 새로운 객체를 생성했다. 이때 `p2.name`은 뭘 참조할것인가??? 
결과는 보다싶이 새로운 객체를 참조한다.


#### 정리.

1. `new`연산자로 함수를 호출하면 반환값이 this가 된다.
2. `call`,`bind`,`apply`로 함수츨 호출하면 넘겨준 인자가 this가 된다.
3. 객체의 메서드를 실행하면 메서드를 소유하는 객체가 this다.
4. 이외의 상황에서는 `window`가 this다.



#### Arrow Function
기존에는 컨텍스트 실행 시점에 바인딩 규칙이 정해지는 `동적 바인딩`이지만  
화살표 함수는 선언시점에 바인딩이 정해지는 `정적 바인딩`이다. 
  Arrow Function은 코사등 상위 블록의 컨텍스트를 this로 바인딩한다.






### REF
- [this바인딩 우선순위](http://jeonghwan-kim.github.io/2017/10/22/js-context-binding.html)
- [javascript_this](https://github.com/FEDevelopers/tech.description/wiki/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%97%90%EC%84%9C-%EC%82%AC%EC%9A%A9%EB%90%98%EB%8A%94-this%EC%97%90-%EB%8C%80%ED%95%9C-%EC%84%A4%EB%AA%85-1#31-%EB%A9%94%EC%86%8C%EB%93%9C-%EC%8B%A4%ED%96%89%EC%97%90%EC%84%9C%EC%9D%98-this)
- [Gentle Explanation of this Keyword in JavaScript](https://dmitripavlutin.com/gentle-explanation-of-this-in-javascript/)
- [intro](http://bonsaiden.github.io/JavaScript-Garden/ko/#function.constructors)
