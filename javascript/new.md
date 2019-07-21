# new
new 연산자는 사용자 정의 객체(user-defined object) 또는 내장 객체(built-in object)의 인스턴스를 생성한다.<br> 
new 연산자를 사용할때 다음의 4가지 일이 순차적으로 일어난다.<br><br>
**new연산자를 이용한 객체 생성**
1. 빈 객체(plain Object)를 생성한다.
2. 생성자 함수의 this를 새로 만들어진 객체에 binding한다.
3. 새로 만들어진 객체에 생성자 함수의 prototype 객체를 참조하는 \_\_proto\_\_  property를 추가한다. (즉 생성자함수의 Prototype을 상속받는다.)
4. 생성자함수에 별도의 반환값이 없으면 마지막에 'return this'를 추가하여 새로 생성한 객체를 반환한다.

```js
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
  //return this
}

var car1 = new Car('Eagle', 'Talon TSi', 1993);

console.log(car1.make);
// console> "Eagle"
```

## 1.구문

```js
new constructor[([arguments])]
```
**constructor**<br>
객체 인스턴스틔 타입을 기술하는 함수.

**arguments**<br>
constructor와 함께 호출될 값 목록.


## 2.설명
사용자 정의 객체를 생성에는 두 단계가 필요하다.

1. 함수를 작성하여 사용자객체를 정의한다.
2. new 연산자로 객체의 인스턴스를 생성한다.<br>

객체를 정의하기 위해, 객체의 이름과 속성을 명세하는 함수를 만든다. <br>
이렇게 새로운 객체타입을 정의하기 위해 속성을 명세한 함수를 **생성자함수**라 한다.<br>
생성자함수를 통해 만들어진 객체는 객체의 명세를 공유하며, 동적으로 새로운 속성을 추가 할 수 있다.
<br><br>

**Example**<br>
new Foo()를 실행하면 다음의 일이 일어난다.
```js
new Foo();
```
1. Foo.prototype을 상속하는 새로운 객체가 하나 생성된다.
2. 생성자 함수 Foo는 매개변수 그리고 this가 바인딩된 새로운 객체와 함께 호출된다.
new Foo는 new Foo()와 동일한데 차이는 매개변수의 유무이다.
3. 생성자 함수에 의해 반환된 객체는 전체 new 호출 결과가 된다.<br>
생성자 함수가 명시적으로 객체를 리턴하지 않으면, STEP1에서 생성된 객체가 대신 사용된다.
(일반적으로 생성자는 값을 리턴하지 않는다. 그러나 일반적인 객체 생성을 재정의 하기 위해 생성자함수가 값을 리턴하기도 한다.)


이렇게 new연산자로 생성된 객체에 속성을 추가할 수 있다.
```js
carl.color = 'black'
```
car1객체에 color속성을 추가하고 color속성에 'black'이란 값을 할당했다.<br>
이렇게 되면 Car의 모든 인스턴스중에 car1 객체가 가지는 유니크한 속성이 생기게 된다.<br>
만약 동일한 타입의 모든 객체들에게 새로운 속성을 추가하려면 Car객체 타입의 정의에 이 속성을 추가해야한다.<br>

Function.prototype 속성을 사용하여 이전에 정의된 객체 타입에 공유 속성을 추가할 수 있다.<br>
이건 객체 타입의 인스턴스 하나에만 적용되는 것이 아니라 이 함수로 생성하는 모든 객체와 공유하는 속성을 정의한다.

다음의 코드는 Car의 모든 인스턴스에 'original color'값을 갖는 color 속성을 추가한다.<br>
그리고 car1 객체에만 이 값을 문자열'black'으로 덮어쓴다(overwrite). 


```js
function Car() {}
car1 = new Car();
car2 = new Car();
 
console.log(car1.color);    // undefined
 
Car.prototype.color = "original color";
console.log(car1.color);    // original color
 
car1.color = 'black';
console.log(car1.color);   // black

console.log(car1.__proto__.color) //original color
console.log(car2.__proto__.color) //original color
console.log(car1.color)  // black
console.log(car2.color) // original color

```
<br><br><br>

### 예제

#### EX.1 객체 타입과 객체 인스턴스
자동차 객체를 생성하기 위해 생성자 함수를 정의한다고 생각해보자.<br>
생성자 함수 이름은 Car이고 속성으로 make, model, year을 추가하고 싶다.

```js
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
```
이제 다음과 같이 mycar로 불리는 객체를 생성할 수 있다.

```js
var mycar = new Car("Eagle", "Talon TSi", 1993);
```
이 구문은 mycar를 생성하고 매개변수를 속성값으로 반환한다.
mycar의 속성에 매개변수로 입력한 값들이 할당된걸 확인해보자.

이제 Car 생성자함수를 통해 자동자 객체를 쉽게 생성할 수 있다.
```js
var kenscar = new Car("Nissan", "300ZX", 1992);
```


#### EX.2 속성 그 자신이 다른 객체인 객체의 속성.
person이라는 객체를 다음과 같이 정의해보자.

```js
function Person(name, age, sex){
  this.name = name;
  this.age = age;
  this.sex = sex;
}
```
그리고 다음과 같이 두 개의 person의인스턴스를 새롭게 생성한다.

```js
var rand = new Person("Rand McNally", 33, "M");
var ken = new Person("Ken Jones", 39, "M");
```
그런 다음 owner 속성을 포함하는 car의 정의를 다시 쓸 수 있다.<br> 
그리고 이 owner 속성에 person 객체를 할당한다.

```js
function Car(make, model, year, owner) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.owner = owner;
}
 
```
새로운 객체의 인스턴스를 생성하기 위해 다음과 같이 사용한다.

```js
var car1 = new Car("Eagle", "Talon TSi", 1993, rand);
var car2 = new Car("Nissan", "300ZX", 1992, ken);
```
새로운 객체를 생성할 때 문자열이나 숫자 값을 넘겨주는 대신 위의 구문은 owner를 위한 매개변수로 rand와 ken 객체를 넘겨준다. 
car2의 ownder name을 확인해보기 위해서 다음 코드처럼 접근할 수 있다.

```js
car2.owner.name 
```


### 이 문서는 MDN의 문서를 번역했음을 밝힙니다.