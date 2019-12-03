# Object create

## Intro
객체를 정의하는 다양한 방법과 각 상황에서 어떻게 정의하는 것이 좋은지 비교해본다.



## 1.Object literal
```js
const circle = {
    radius : 1,
      location : {
        x: 1,
          y : 1
    },
      draw : function (){ // method
        console.log('draw');
    }
};

```
- 키와 값으로 이뤄져있다.
- 속성과 메서드는 콤마로 부분한다.
- key와 value는 세미콜론으로 구분한다.
- 속성은 dot notation으로 접근한다.
- 객체를 변수에 할당할때는 마지막에 세미콜론을 붙인다.
- property와 method를 정의한다.
    - 프로퍼티의 경우 값을 가지고 있는 경우 사용되고 로직을 정의하는 경우 메소드라고 한다.

## 2. new Object()
```js
var obj = new object();
console.log(o.constructor === Object);      //true

var obj2 = new Object(1);
console.log(obj2.constructor === Number);   //true
console.log(obj2.toFixed(2))

var obj3 = new Object("I'm not wearing hockey pads");
console.log(obj3.constructor === String);   // true
console.log(typeof obj3.substring);         //function

var obj4 = new Object(true);
console.log(o.constructor === Boolean);     //true
```
객체 생성자를 이용한 방법과 맅터럴을 이용한 방법에는 차이가 있다.  



## 3. Object.create()




## 4. 사용자 정의함수.
```js
var Person = function(name){
    this.name = name;
    this.say = function(){
        return `I am ${this.name}..`
    };
}

var tony = new Person("IronMan");
tony.say();
```
동작원리는 이렇다.
 
1. 빈객가 생성딘다. 이 객체는 this라는 변수로 차조할수 있고 해당함수의 프로토타입을 상속받는다.
2. this로 참조되는 객체에 속성과 메서드가 추가된다.
3. 마지막에 다른 객체가 명시적으로 반환되지 않는 경우 this로 참조된 이 객체가 반환된다.

```js
var Person = function(name){
    var this = Object.create(Person.prototype); //Person의 프로토타입을 상속받는다.

    this.name = name;
    this.say = function(){
        return `I am ${this.name}..`
    };

    //return this;
}
```
처럼 생략된걸로 생각할 수있다. 이때 say메서드는 인스턴스마다 생성이 됨으로 프로토타입객체에 등록하는것이 낫다.

```js
Person.prototype.say = function(){
    return `I am ${this.name}`;
}
```


**생성자의 반환값**  
생성자 함수를 new와 함께 호출하면 항상 객체가 반환된다. 기본값은 this로 참조되는 객체다. 함수 내의 return문을 쓰지 안ㅇㅎ더라도 생성자는 암묵적으로 this를 반환한다. 그러나 반환값이 될 객체를 따로 정할 수 도 있다.

```js
var Objectmaker = function(){
    this.name = "This is it";
    var that = {};
    that.name = "And that's that";
    return that;
}

var obj = new Objectmaker();
console.log(obj.name);
```




## 5.new연산자 없이 생성자 함수 호출하기.


### 5.1 that 사용하기.

```js
var testA = new Waffle();
console.log(testA);

var testB = Waffle();
testB.tastes = "change Value";

console.log(testA.tastes); // yummy
console.log(testB.tastes); // change Value

var testC = Waffle();
console.log(testC.tastes); // yummy
```

### 5.2 재귀호출이용하기.
생성자 내부에서 this가 해당 생성자 인스턴스인지 확인하고 그렇지 않은 경우 new와 함께 스스로를 재호출하는 패턴이다.
```js
function Waffle() {
  if(!(this instanceof Waffle)) {
    return new Waffle();
  }
  this.tastes = "yummy";
}
Waffle.prototype.wantAnother = true;

var first = new Waffle(),
  second = Waffle();

console.log(first.tastes); // "yummy"
console.log(second.tastes); // "yummy"

console.log(first.wantAnother); // true
console.log(second.wantAnother); // true
```


## 6.같은 양식의 객체를 만드는 방법.
같은 구조의 객체를 여러개 생성해야할 떄 사용하는 방법이다.  
Factory Function과 사용자정의함수 (Constructor Function)을 이용한 방법이 있다.


### 6.1 Factory Functoin
```js
function createCircle(radius){
    return {
        radius : radius,
        draw : function(){
            console.log('draw')
        }
    };
}

var circle1 = createCircle(1);
var circle2 = createCircle(2);
```


### 6.2 Constructor Function
```js
function Circle(radius){
    this.radius = radius;
    this.draw = function() {
        console.log('draw');
    }
}
// return this;  자동으로 this객체가 리턴됨

var circle = new Circle(1);
```

- 생성자함수는 반드시 대문자로 시작해야한다.
- property를 지정하기 위해서 `this`연산자를 사용한다.
    - `this`는 코드를 실행시키고 있는 개체를 가리키는 역할
- 메모리에 빈객체를 가지고 있고 `this`를 해당 빈 객체를 가리키게 한후 dot notation을 사용해서 여러 property를 정한다.
- `new`연산자를 이용해여 새로운 인스턴스를 만든다.

**new 연산자가 하는일** 
1. new는 먼저 빈 객체를 만든다.
2. this가 해당 객체를 기리키게 만든다. 기본값으로 `this`는 전역 객체를 기리키고 있다.
    - 브라우저에서 전역객체는 window이기 때문에 new를 사용하지 않으면 `this`는 Window를 가리킨다.
3. 그 후 함수에서 해당 객체를 반환한다.



## 정리 
각 방법으로 각각 객체를 선언해봄.

```js

//변수 선언
var o;

//1. 프로토타입이 null인 객체 생성.
// __proto__ 속성이 없음.
o = Obecjt.create(null);


//2. 객체 리터럴 타입 생성.
o = {};


//3. Object.prototype을 prototype으로하는 객체 생성.
o = Object.create(Object.prototype);


//4. 속성 두개를 갖는 객체를 생성.
// (2)와 동일함.
Object.create(Object.prototype);

o = Object.create(Object.prototype, {
    foo : {
        writable : true,        // 할당 연산자를 이용해 재할당가능여부.
        configurable : true,    // 삭제및수정 가능여부
        enumeralbe,: false,     // 열거가능 여부
        value: 'hello'          // 값
    },
    bar : {
        configurable : true,
        get : function(){
            return 10;
        },
        set: function(vale){
            console.log('Setting `o.bar` to ', value);
        }

    }
})

// 5. 생성자 함수를 이용한 객체생성.
function Constructor(){}
o = new Constructor();
//위와 같은 결과, 하지만 생성자함수에 초기화 코드와 속성이 있으면 Object.create 사용 불가능함.
o = Object.create(Constructor.prototype);


// 6. {}가 프로토타입인 새로운 객체를 생성하고 속성하나를 추가함.
//  enumeralbe, configurable 기본값은 false임, 
o = Object.create({}, 
        {p: {value: 42}
    });



// configurable = false, 수정안됨.
o.p = 99;
console.log(o.p);       //42

// writeable = true, 할당 가능함.
o.k = 33;
console.log(o.k);


console.log(o.hasOwnProperty('p'))
console.log('p' in o)
// enumeralbe = false, 열거 안됨
console.log(Object.keys(o))


for (prop in o) {
    console.log(prop);

}

delete o.p;     //false
```


### ref
- [MDN_Object.defineProperty](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
- [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
- [객체의 생성](https://velog.io/@doondoony/JavaScript-Object)
- [velog](https://velog.io/@imacoolgirlyo/JS-Object-Constructors)
- [코드 재활용패턴](http://frontend.diffthink.kr/2016/05/blog-post_42.html)