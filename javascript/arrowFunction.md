# Arrow Function

## Info

ES6에서 function의 변화를 살펴보면 여러가지 기능을 동시에 하던 funtion을 각각 역할만을 수행하는 제한적인 기능을 제공하는 문법으로 나눠 놓은 것을 알 수있다. 화살표함수도 그런데 철저하게 함수로만 사용되도록 기능이 제한되어있다. ES5에서는 일반함수를 생성자함수, 메세드, 함수로 사용했지만 ES6에서 클래스, 축약메서드, 화살표함수가 등장하면서 기능을 나눠놓은것을 알 수 있다. 기능을 제한하여 오류발생 가능성을 줄였다.
일반함수와 Arrow function의 차이에 대해서 알아보자.




## 1.호출
화살표 함수는 익명함수로만 작성할 수 있다. 따라서 화살표함수를 호출하기 위해서는 함수 표현식을 사용해야한다.


```js
const pow = x => x * x;
console.info(pow(10));
```


## 2.this


### 2.1 일반함수의 this
함수 호출 방식에 의해 this가 동적으로 바인딩된다. 다시말해, 함수를 선언할 때 this에 바인딩할 객체가 결정되는게 아니라 실행시점에 함수를 어떻게 호출하는지에 따라 결정된다.

```js

function Prefixer(prefix) {
    this.prefix = prefix;
}

Prefixer.prototype.prefixArray = function () {

    return arr.map(function () {
        return this.prefix  + ' ' x;
    })
}

var pre = enw Prefixer('Hi');
console.info(pre.prefixArray(['Lee', 'Kim'])
```
일반함수에서 객체의 인스턴스에서 콜백을 호출했을 경우, 콜백내에서 this는 window객체를 참조한다.  이런 문제를 해결하기 위한 방법이 몇가지 있다.


**Solution 1:that**  
```js
function Prefixer(prefix) {
    this.prefix = prefix;
}

Prefixer.prototype.prefixArray = function (arr) {
    var that = this;    //인스턴스

    return arr.map(function(x){
        return that.prefix + ' ' + x;
    })
}

var pre = enw Prefixer('Hi');
console.info(pre.prefixArray(['Lee', 'Kim'])
```


**Solution 2: map(func, this))**  
```js
unction Prefixer(prefix) {
  this.prefix = prefix;
}

Prefixer.prototype.prefixArray = function (arr) {
  return arr.map(function (x) {
    return this.prefix + ' ' + x;
  }, this); // this: Prefixer 생성자 함수의 인스턴스
};

var pre = new Prefixer('Hi');
console.log(pre.prefixArray(['Lee', 'Kim']));
```


**Solution3: bind**  
```js
function Prefixer(prefix) {
  this.prefix = prefix;
}

Prefixer.prototype.prefixArray = function (arr) {
  return arr.map(function (x) {
    return this.prefix + ' ' + x;
  }.bind(this)); // this: Prefixer 생성자 함수의 인스턴스
};

var pre = new Prefixer('Hi');
console.log(pre.prefixArray(['Lee', 'Kim']));
```


### 2.2 화살표함수의 this

일반함수와 달리 화살표함수는 함수 선언 시점에 this가 바인딩된다. 이때 this는 상위 스코프의 this를 가리키는데 
내부적으로는 bind를 사용한다. (즉 Syntactic sugar이다.)

```js
function Prefixer(prefix) {
  this.prefix = prefix;
}

Prefixer.prototype.prefixArray = function (arr) {
  // this는 상위 스코프인 prefixArray 메소드 내의 this를 가리킨다.
  return arr.map(x => `${this.prefix}  ${x}`);
};

const pre = new Prefixer('Hi');
console.log(pre.prefixArray(['Lee', 'Kim']));
```

추가적으로 화살표 함수는 call, apply, bind 메소드를 사용하여 this바인딩을 변경할 수 없다.




## 3 화살표 함수를 사용하면 안되는 경우.


### 3.1 객체의 메소드

```js
const person = {
    name : 'Cater',
    sayHi : function(){ console.log(`Hi ${this.name}`)}
}

person.sayHi();
```
일반함수로 작성하면 객체의 메서드에서 this의 참조는 메서드를 소유한 객체가된다.

```js
const person = {
    name : 'Cater',
    sayHi : () => console.log(`Hi ${this.name}`)
}

person.sayHi();
```
하지만 ES6의 화살표 함수를 사용하게 되면 객체의 메소드가 참조하는 this는 window객체이다. 따라서 화살표함수로 메서드를 작성하지 않는것이 좋다.  
좀 더 간결한 표현을 위해 나온 문법이 있는데 ES6의 축약 메소드 표현이다.  
이렇게 생성된 메소드는 자바스크립트 엔진 내부적으로 일반함수와 구분된다.(기능적인 차이가 있다.)


```js
const person = {
    name: 'Cater',
    sayHi() {
        console.log(`Hi ${this.name});
    }
}
```

### 3.2 prototype
화살표 함수로 정의된 메소드를 prototype에 할당하는 경우에도 this의 참조가 전역객체가 된다.

```js
const person = {
  name: 'Lee',
};

Object.prototype.sayHi = () => console.log(`Hi ${this.name}`);

person.sayHi(); // Hi undefined
```

```js

const person = {
  name: 'Lee',
};

Object.prototype.sayHi = function() {
  console.log(`Hi ${this.name}`);
};

person.sayHi(); // Hi Lee
```
이런 경우 일반함수를 할당해야한다.


### 3.3 생성자 함수.
화살표 함수는 생성자 함수로 사용이 불가능하다. 생성자 함수는 prototype프로퍼티를 가지며 prototype프로퍼티가 가리키는 프로토타입 객체의  constructor를 사용해야한다. 하지만 화살표 함수는 prototype 프로퍼티가 없다.  ES6에서는 생성자함수라 필요할떄 class문법을 사용하는것을 권고한다.



```js
const Foo = () {};

console.log(Foo.hasOwnProperty('prototype')); //false

const foo = new Foo(); // TypeError: Foo is not a constructor
```


### 3.4 addEventListener 함수의 콜백함수
이벤트 리스터의 콜백함수를 화살표함수로 정의하면 this는 상위컨텍스트인 전역객체를 가리키게 된다.

```js
var button = document.getElementById('myButton');

button.addEventListener('click', () => {
  console.log(this === window); // => true
  this.innerHTML = 'Clicked button';
});
```


```js
var button = document.getElementById('myButton');

button.addEventListener('click', function() {
  console.log(this === button); // => true
  this.innerHTML = 'Clicked button';
});
```
따라서 일반함수를 사용해야 this로 엘리먼트를 참조하게된다.




### 정리
일반함수는 `new`연산자와 함께 생성자함수로 사용될 수 있고 그밖에 일반함수 메서드등의 사용에 따라 동작이 달라진다. 한가지 문법에서 여러가지 기능을 하는건 문맥적 모호함으로 느껴질 수 있다. ES6에서 Arrow Function의 등장은 이런 모호함에 대한 구체화로 생각할 수 있을것같다.



