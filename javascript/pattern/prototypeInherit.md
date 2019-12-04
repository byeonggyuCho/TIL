# Prototype_inherit



## 프로토타입 상속


```js
function Parent(name) {
  this.name = name || 'cater';
}

Parent.prototype.say = function() {
  return this.name;
}

function Child(name) {}

Child.prototype = new Parent();
```

1. 자식 클래스의 인스턴스는 부모 클래스의 인스턴스이어야한다.
2. 자식 클래스의 속성과 메서드가 부모클래스에 영향을 주며 안된다.
3. 자식 클래스는 부모의 속성과 메서드를 모두 물려받으며 새로운 속성과 메서드를 추가할 수있다.
4. 자식 클래스는 부모 클래스의 메서드를 오버라이드할 수 있다.
5. 인스턴스를 통해 클래스를 확인 가능해야한다.


## 1. 생성자 빌려쓰기 패턴.

```js
function Person(name,age){
  this.name = name;
  this.age = age
}

Person.prototype.say = function(){
  console.log("Hi I'm " + this.name)
}

function Employee(name, age, job,career){
  
  var obj = new Person();   //obj의 프로토타입은 Peson

  //덮어쓴다.
  obj.name = name
  obj.age = age
  obj.job = job
  obj.career = career;

  return obj;  
}

Employee.prototype.introduce = function(){
  console.log('My job is '+ this.job + "\n")
}

var worker = new Employee('cater',29,'programer',2)

console.log('worker is instance of Employee ', worker instanceof Employee)
console.log('worker is instance of Person ', worker instanceof Person)

worker.say()
worker.introduce()    //Typeerror: worker.introduce is not a function
```
가장 초기에 사용했던 상속방법이다. this를 반환하는 대신 새로운 obj를 반환하는 방식으로 상속을 구현했다.  
이 방법의 단점은 worker가 Employee의 인스턴스라는 걸 알 수 없다는 것이다. 이건 객체지향 관점에서 치명적인 점이다.  
또 introduce같은 메서드를 프로토타입 객체에 등록할 수 없다. 이를 위해선 크래스의 메서드로 등록해야하는데 이럴 경우 각 인스턴스마다 새로운 메서드가 생성된다.  





## 2. 부모의 프로토타입 참조.
```js
var person_Prototype = {
  name: "anonymous",
  age:"99",
  say: function(){
    console.log("Hi i'm "+ this.name);
  }
}

function Interviewer(name,age, dep, position){
  this.name = name;
  this.age = age;
  this.dep = dep;
  this.position = position;
}

Interviewer.prototype = person_Prototype;

Interviewer.prototype.pass = function(){
  console.log(" You are passed")
}

var interviewer = new Interviewer('Jake');;
interviewer.pass()


function Applicant(name,age,major, gender){
  name && (this.name = name);     //(A)
  age && (this.age = age);

  this.major = major;
  this.gender = gender;

  this.introduce = function(){
    console.log('My major is ' + this.major);
  }
}

Applicant.prototype = person_Prototype;


var app1 = new Applicant('cater', 29, 'programmer');

person.say()
app1.say();
app1.introduce();

console.log(app1 instanceof Applicant);   //true
```
이후 자바스크립트는 function에 기본으로 들어있는 프로토타입 속성을 새로운 객체로 설정하여 상속하는 방식을 사용했다.
새로운 객체로 선언하듯이 상속하고자 하는 객체를 하위 객체의 프로토타입 속성으로 설정하면 된다.  

이 방법에도 여전히 문제가 남아있는데 부모의 생성자 함수를 실행하는 것이 아니기 때문에 Applicant에서 부모 클래스의 속성인 (name, age)에 대해서 다시 작성했다. 이것을 우리가 통상적으로 알고 있는 객체지향 언어의 상속과는 다르다. 부모클래스의 속성을 오버라이딩할 목적이 아니라면 부모 클래스의 생성자를 실행하여 초기화작업이 이뤄져야한다.  인스턴스가 참조하는 공통 메서드를 작성할 수 없다는것도 여전히 문제다.  

`pass`같은 상속받은 클래스의 메서드를 등록할때 `parent`를 직접 참조하고 있기때문에 프로토타입이 변형된다. 객체 복사를 통해 불변성을 유지할 필요성이 있다.




### 3. 자식 클래스의 프로토타입을 부모 클래스의 인스턴스로 설정하는 방법.

```js
function Person(name) {
  this.name = name || 'anonymous';
}

Person.prototype.say = function() {
  console.log("Hi I'm ", this.name);
}

function Interviewer(name, dep) {
  this.name = name;
  this.dep = dep;
}

Interviewer.prototype = new Person();     //(A)

Interviewer.prototype.introduce = function(){
  console.log('My job is '+ this.dep)
}


//console.log( '자식의 say 함수 : ' + Interviewer.prototype.say() );

var interviewer = new Interviewer('cater','R&D');
console.log('interviewer is instance of Interviewer ', interviewer instanceof Interviewer)
console.log('interviewer is instance of Person ', interviewer instanceof Person)
console.log('prototype of interviewer is ', Object.getPrototypeOf(interviewer))
interviewer.say();
interviewer.introduce();

var p1 = new Person('Jake');
p1.say();
p1.introduce()
```
포인트는 `(A)`에서 자식객체의 프로토타입이 부모의 생성자함수가 아니라 부모의 인스턴스라는 점이다. 
new 연산자를 이용해서 부모의 복제 객체를 생성하고, 그 객체의 물리적 메모리 주소를 자식 `prototype`이 참조한다. 또 new 연산자를 통해 자식의 복제 객체를 생성하고 그 객체의 물리적 메모리 주소를 interviewer 받고 있다.


### 4. Object.create
자식 클래스의 내부에서 부모 클래스의 생성자로 객체를 생성하면 연결이 인스턴스와 자식 클래스와의 연결이 깨진다. 
(위 예제에서 `Object.getPrototypeOf`를 통해 프트토타입 객체를 확인해보면 Person의 `Protptype Object`가 나온다. Interviewer가 프로토타입이 아니라는 점에서 모호함이 남는다.)  
이런 이유로 만들어진 것이 `Object.create`이다. 이 함수는 객체와 객체간의 상속을 시켜주는 함수이다. 
내부적 구조의 불완정성 이외에도 new라는 키워드 자체가 자바스크립트 답지 않다는 의견에 의해 객체의 상속하여 생성할 수 있는 함수를 별도로 제공하게 된것이다. 

`Object.create`의 기본적인 동작은 다음과 같다.
```js
Object.create = function(obj){
  function F(){
    F.prototype = obj;
    return new F();
  }
}
```
인자로 넘겨받은 객체를 프로토타입으로 하는 객체를 생성하여 반환한다.


```js
function Person(name) {
  this.name;
}

Person.prototype = {
  say : function(){
    console.log("Hi I'am ", this.name);
  }
};

var interviewer = Object.create(Person.prototype);
interviewer.name = "Cater";   //(A)
interviewer.say();
```
`Object.create`의 인자가 Person의 생성자 함수가 아니라 프로토타입 객체이다. 생성자함수가 아닌 객체를 전달하는 것은 `Object.create`에서 임의의 Froxy객체의 프로토타입 객체로 사용되기 떄문이다.  `(A)`를 보면 객체의 속성을 부가적으로 추가했는데 이런점은 `Object.create`의 두번째 속성을 이용해 속성을 정의할 수 있다.  
소스코드를 보면 new 키워드가 사라졌다. 이는 함수호출로 객체를 생성하여 소스에서 생성자의 개념이 약해지고 객체의 인스턴스 간의 상속을 강조하는 것이 `Object.create`의 특징이다.  

`Object.create`함수를 통해 만든 객체의 상속여부를 확인하는 방법을 소개한다. new 연산자를 통한 객체 생성과 만찬가지로 `instanceof`를 통해 확인가능한데 `instanceof`의 표준명세를 살펴보면 생성자를 비교하는것이 아니라 프로토타입을 비교하기 떄문에 new 여난자와 동일하게 확인 가능하다.
하지만 인자로 `Person.prototype`을 받고 `instanceof`로 생성자함수를 비교하는 것이 직관성이 떨어져보인다.

```js
var p1 = Object.create(Person.prototype);
console.log(p1 instanceof Person);   

// 생성을 위한 인자값과 생성후 비교를 위한 인자가 다르기 때문에 동작원리가 바로 이해가지 않을 수 있다.
```
이것을 위해 `prototype Object`를 넘기고 `prototype Object`를 꺼내봐 비교하기 위해서 `Object.getPrototypeOf()`함수가 등장했다. 
객체의 프로토타입이 반환된다.


```js
var person_Prototype = {
  say: function(){
    console.log("Hi I'm "+ this.name)
  }
}

var p1 = Object.create(person_Prototype)
console.log(Object.getPrototypeOf(p1))
console.log(p1 instanceof personPrototypeObject)    
// TypeError
// instanceof 는 인자로 함수를 전달해야한다.
```

반대로 프로토타입의 입장에서 생성된 객체를 확인하기 위해선 `Object.isPrototypeOf`를 사용할 수 있따.
```js
console.log(person_Prototype.isPrototypeOf(p1))
```


#### Obeject.create 초기화.
`Object.create`를 이용해 객체를 생성할 때 프로퍼티를 정의하는 방법에 대해 소개한다.  

```js
function Person(name) {
  this.name = name;
}

Person.prototype.say = function(){
  console.log("Hi I'm "+ this.name)
}

var cater = Object.create(Person.prototype,{
  name: {
    value: "Cater"
  }
});


cater.say();
cater.name = "Cater Cho"
cater.say()     // 기본속성을 읽기전용이기떄문에 값을 수정할 수 없다.
```


#### Obeject.create와 new 연산자 조합.
```js
function Person(name){
  this.name = "anonymous"
}

function Interviewer(name){
  this.name = name;
}

/*
이것보다 수정 불가 속성을 추가하기위해 Object.create의 두번째 인자로 속성을 정의하는것이 낫다.
Interviewer.prototype = Object.create(Person.prototype);
Interviewer.constructor = Interviewer;
*/

Interviewer.prototype = Object.create(Person.prototype,{
  constructor:{
    value: Interviewer,
    writable : false      //기본값이 false이지만 애해를 위한 명시적인 이유로 써놓음.
  }
});

var interviewer = new Interviewer("cater");
console.log(interviewer instanceof Interviewer)
console.log(interviewer instanceof Person)
console.log(interviewer.constructor);
```
















**프로토타입 체인**  
```js
function Foo(){}
var foo = new Foo();
```
!(/resource/img/javascript/JavaScript_Protoytpe_Constructor_Relationship.png)  
위 패턴에서는 부모 객체의 프로토타입에 추가된 속성과 메서드들과 함께 부모 객체 자신의 속성도 모두 물려받는다.  
`prototype`은 어떤 객체든 만들어 질 때 `prototype Object`가 생성되는데 function에서 `prototype Property`로 접근이 가능하다.  
enw Foo();가 하는 일은   
1. 새로운 객체를 생성한다.
2. 그 객체에 `__proto__`라는 속성을 추가한다.
3. `__proto__`는 Foo.prototype을 참조한다.
4. `__proto__`에 있는 contructor를 실행한다. (이때 constructor함수 내부에서의 this는 방금 생성한 객체임)

따라서 변수 `foo`는 위 과정을 거쳐 생성된 객체를 잠조한다. 모든 객체는 `__proto__`속성을 가지는데 이 속성은 `prototype Object`를 참조하기 때문에 메소드나 속성에 접근할 수있다.(프로토타입 체인)  

앞서 설명한것처럼 생성자함수 `Foo`를 정의하는 순간 `prototype Property`이 추가되는데 이 속성이 참조하는 `prototype Object`에는  `construcor`와 `__proto__`속성이 있다. `constructor`는 생성자함수를 정의할때 이 함수를 복제한 것이다.  

new Foo()를 하면 새로운 객체에 `__proto__`라는 속성이 생성자함수(Foo)의 `prototype Property`를 참조하고 어떤 객체든 `__proto__`를 통해 속성과 메서드에 접근할 수 있기 때문에 `Foo.prototype`에 선언되어 있는 것들을 사용할 수 있는것임.  
이건 복제가 아니라 물리적 메모리 주소를 참조하고 있는것임.


다시 예제로 돌아와서 
```js
function inherit(C, P) {
  C.prototype = new P();
}

function Parent(name) {
  this.name = name || 'Adam';
}

Parent.prototype.say = function() {
  return this.name;
}

function Child(name) {}

inherit(Child, Parent);
console.log( '자식의 say 함수 : ' + Child.prototype.say() );

var kids = new Child();
console.log( kids.say() );
```

1. Child의 `prototype Property`에 new Parent()를 했기 때문에, `Child.prototype.__proto__`에 `Parent.prototype`이 참조된다. 
즉 Child.prototype이 Parent.prototye에 접근할 수 있게 된다.
2. kids = new Child();를 하면 new연산자 과정을 거치고 kids.__proto__에는 `Child.prototype`을 참조하게 된다.
3. `Child.propertype`를 `kids.__proto__`가 참조함으로 `Parent`의 속성에 프로토타입체인을 통해 접근이 가능하다.

**프로토타입 체인**  
여기서의 프로토타입 체인에 대해 설명하면  
1. kids.__proto__는  Child.prototype을 참조한다.
2. Child.prototype.__proto__는 Parent.prototype을 참조한다.
이렇게 볼 수있다. 즉 `kids.__proto__.__proto__.constructor`가 되기 때문에 프로토타입 체인이라 부르는 거임


```js
var underInherit = {};
underInherit.__proto__ = {
  x : 10,
  xfn : function() {
    console.log('first proto-xfn')
  },
  __proto__ : {
    y : 20,
    xfn : function() {
      console.log('second proto-xfn')
    },
    yfn : function() {
      console.log('second proto-yfn')
    }
  }
};
console.log(underInherit.x);
console.log(underInherit.y);

console.log(underInherit.xfn());
console.log(underInherit.yfn());
```
이 예제를 실행해보면 좀더 직관적인 이해가 가능함.  이때 xfn이 중복되었는데 가까운것이 먼저 실행됐음을 알 수 있다.

```js
var underInherit = {};
underInherit = {
  z : 10,
  __proto__ : {
    x : 10,
    xfn : function() {
      console.log('first proto-xfn')
    },
    __proto__ : {
      y : 20,
      xfn : function() {
        console.log('second proto-xfn')
      },
      yfn : function() {
        console.log('second proto-yfn')
      }
    }
  }
}

console.log(underInherit.hasOwnProperty('z'));      //true
console.log(underInherit.hasOwnProperty('x'));      //false
```
여기서는 z속성이 underIngerit바로 아래에 있는데 프로토타입 객체가 아닌 나 자신에게 추가됐음을 알 수있다.


이 패턴에는 단점이 있는데 부모객체의 this에 추가된 속성과 `prototype`을 모두 그대로 받기 때문에 재사용 방법이 꽤 불편하다.
```js
var c1 = new Child('jake');
s.say();        //Adam
```


<br><br>

## 2. 생성자 빌려쓰기.
```js
function Article() {
  this.tags = ['js', 'css'];
}
Article.prototype.name = function() { 
    console.log(this.tags); 
}

function BlogPost() {}
BlogPost.prototype = new Article();

var blog = new BlogPost();

function StaticPage() {
  Article.call(this);
}

var page = new StaticPage();

console.log(BlogPost.prototype .tags);
console.log(blog.tags);
console.log(page.tags);

console.log(BlogPost.prototype .hasOwnProperty('tags')); // true
console.log(blog.hasOwnProperty('tags')); // false
console.log(page.hasOwnProperty('tags')); // true
```

기본 패턴을 적용한 blog객체는 tags를 자기 자신의 속성으로 가진 것이 아니라 prototype을 통해 접근하기 떄문에,
hasOwnProperty()는 false이고 생성자만 빌려쓰는 방식으로 상속받은 page객체는 부모의 tags멤버에 대한 참조를 얻는 것이 아니라 복사본을 얻게 되므로 자기 자신의 tags속성을 가지게 된다.

즉 blog.tags를 변경하면 article.tags도 변경되지만 page.tags는 변경되지 않는다.  
이것은 page가 Article함수와 프로토타입링크(__proto__)로 연결되지 않기 때문에, Article의 name함수를 사용할 수 없다.
포인트는 prototype의 속성과 메서드는 사용할 수 없지만 부모의 속성(tags)이 복사 된다는 것이다.
이 패턴에서 prototype의 메서드를 사용하고자 하려면 Article함수의 메서드로 추가해야한다.

```js
function Article() {
  this.tags = ['js', 'css'];
  this.name = function() { console.log(this.tags); }
}

var article = new Article();
function BlogPost() {}
BlogPost.prototype = article;

var blog = new BlogPost();

function StaticPage() {
  Article.call(this);
}

var page = new StaticPage();
page.tags = ['change Value'];

console.log( article.name() ); // ['js', 'css']
console.log( blog.name() ); // ['js', 'css']
console.log( page.name() ); // ['change Value']
```

```js
function Parent(name) {
  this.name = name || 'Adam';
}

Parent.prototype.say = function() {
  return this.name;
}

function Child(name) {
  Parent.apply(this, arguments);
}

var kids = new Child('세호');
console.log( kids.name );
```
사용자 빌려쓰기 패턴은 생성자함수의 속성은 복제가 되지만 프로토타입은 상속되지 않는다.


<br><br>




## 3. 생상자 빌려쓰고 프로토타입 지정해주기.

```js
function Parent(name) {
  this.name = name || 'Jake';
}

Parent.prototype.say = function() {
  return this.name;
}

function Child(name) {
  Parent.apply(this, arguments);
}
Child.prototype = new Parent();

var kids = new Child('cater'); 
console.log( kids.name );           // cater
console.log( Child.prototype.name)  //Jake
```
이 패턴은 생성자함수의 속성도 개별적으로 복사하면서 prototype또 상속받는 패틴이다.  
부모의 속성을 덮어쓰지 않는다.


### 3.1 Objcet.create를 이용해 프로토타입 복제
```js
// 상위 클래스
function Person(name) {
  this.name = name;
}

Person.prototype.say = function(){
  console.log(`I'm ${this.name}.`)
}

var tony = new Person('Iron Man');
tony.say();   // I'm Iron Man

// 하위클래스.
function Employee(name, type, career){
  Person.apply(this, arguments)   //(A) 부모 생성자함수 호출, super()
  this.type = type;
  this.career = career;
  this.working = false;
}

// 하위클래스 확장.
Employee.prototype = Object.create(Person.prototype);   // (B) 부모의 프로토타입 객체를 복제함.
Employee.prototype.constructor = Employee;              // (C) 생성자 함수를 수정함.(B에서 덮어써서 지워졌기 때문)
Employee.prototype.work = function(){
  this.working = true;
  console.log(`${this.name} Start work!`)
}
Employee.prototype.getOffWork = function(){
  this.working = false;
  console.log(`${this.name} are leaving the office!`)
}

var emp1 = new Employee('cater','front-end',2);
emp1.say();
emp1.work();
emp1.getOffWork();
```

1. A: 부모객체의 this에 추가된 속성과 메소드를 자식 객체에 추가합니다.
2. B: 부모객체의 프로토타입과 자식객체의 프로토타입을 연결시킴, 부모객체의 프로토타입 객체에 등록된 속성과 함수를 사용할 수 있음.
  - 이때 `Object.create(Persion.prototype)`의 의미는 `Person.prototype`을 상속하는 새로운 객체를 만든다는 것임
  - 부모객체의 `Prototype Object`를 상속한 객체를 `Prototype Object`로 설정해서 부모의 프로토타입 속성과 메서드를 사용가능함.
  - `Employee.prototype = new Person()`과 `Employee.prototype = Object.crate(Person.prototype)`의 차이는 객체를 만들지만 생성자를 실행하지 않는 차이가 있음

  - ![](../../resource/img/javascript/object.create.png)
  - 위 결과처럼 생성자 함수의 속성이 없는 걸 볼 수 있음, `prototype Object`에 생성자 함수의 속성이 추가되는걸 막음.
3. C: B단게에서 `Prototype Object`를 변경했으니 당연히 `constructor`도 `Person`이 되었음. 생성자함수는  `Employee`이어햐 함으로 수정함.


<br><br>


## 4. 프로토타입 공유.
```js
function Parent(name) {
  this.name = name || 'Jake';
}

Parent.prototype.say = function() {
  return this.name;
}

function Child(name) {}
Child.prototype = Parent.prototype;     //프로토타입 참조.

var kids = new Child('Cater');

console.log( kids.say() );
Child.prototype.say = function() { 
    console.log('change'); 
}

console.log( kids.say() ); 
console.log( Parent.prototype.say() ); // Parent 교체됨.
```
prototype을 공유해 버리면 모든 객체가 동일한 프로토타입을 공유하기 때문에 프로토타입 객체는 공유가 되지만 생성자함수의 속성은 복사가 안된다.



## 5. 임시 생성자.
```js
function Parent(name) {
  this.name = name || 'Adam';
}

Parent.prototype.say = function() {
  return this.name;
}

function Child() {}

var F = function() {}
F.prototype = Parent.prototype;
Child.prototype = new F();

var kids = new Child();

console.log( kids.say );
Child.prototype.say = function() { console.log('change'); }

console.log( kids.say ); // 자식 영향 안받음.
console.log( Parent.prototype.say ); // Parent 교체 안됨.
```

프록시 패틴으로도 불리느 패턴이다. 프로토타입 체인의 장점을 유지하면서 실제 Child.prototype의 직접 링크는 끊어버리는 방법이다.

### 5.1 상위 클래스 저장
프록시 패턴을 기반으루 부모 원본에 대한 참조 추가도 가능하다. 즉 상위 클래스에 대한 접근 경로를 가지는 것이다. 
경우에 따라 매우 편리할 수 있지만, 접근해서 무엇인가를 변경하면 상속받고 있는 모든 객체들이 변경되기 때문에 위험한 방법이다.

```js
function Parent(name) {
  this.name = name || 'Adam';
}

Parent.prototype.say = function() {
  return this.name;
}

function Child() {}

var F = function() {}
F.prototype = Parent.prototype;
Child.prototype = new F();
Child.super_prototype = Parent.prototype;

var kids = new Child();

```


### 5.2 생성자 재설정
생성자 포인터를 재설정하지 않으면 모든 자식객체들의 생성자는 Parent()로 지정되기 때문에 보완을 할 필요가 있다.

```js
function Parent(name) {
    this.name = name || 'Cater';
}

Parent.prototype.say = function(){
    return this.name;
}

function Child() {}

var Froxy = function(){}
Froxy.prototype = Parent.prototype;
Child.prototype = new Froxy();
Child.super_prototype = Parent.prototype;
Child.prototype.constructor = Child;

var kids = new Child();
```

상속패턴은 재사용이 목적이다. 물려받는 기능이나 속성들의 값이 어떤 일에 의해 훼손되는 것은 위험하다.






- 프로토타입 상속과정 자세히 풀어보기.
- new연산자.

## ref
- [코드 재사용패턴](http://frontend.diffthink.kr/2016/06/blog-post_29.html)
- [자바스크립트 프로토타입](https://muckycode.blogspot.com/2015/05/javascript-prototype.html)
- [자바스크릅티 상속](https://frontierdev.tistory.com/31)