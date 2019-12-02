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

inherit(Child, Parent); 
```




## 1. 기본패턴.
부모 생성자 함수를 사용해 객체를 생성하고 나서, 이  객체를 자식의 프로토타입에 할당하는 방법.

```js
function inherit(C, P) {
  C.prototype = new P();    //(A)
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
포인트는 `(A)`에서 자식객체의 프로토타입이 부모 생성자함수가 아니라 생성자 함수로 생성한 인스턴스라는 점이다. 
new 연산자를 이용해서 부모의 복제 객체를 생성하고, 그 객체의 물리적 메모리 주소를 자식 `prototype`이 참조한다. 또 new연산자를 통해 자식의 복제 객체를 생성하고 그 객체의 물리적 메모리 주소를 kids가 받고 있다.



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

var article = new Article();
function BlogPost() {}
BlogPost.prototype = article;

var blog = new BlogPost();

function StaticPage() {
  Article.call(this);
}

var page = new StaticPage();

console.log(article.tags);
console.log(blog.tags);
console.log(page.tags);

console.log(article.hasOwnProperty('tags')); // true
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
function Person(name) {
  this.name = name;
}

Person.prototype.say = function(){
  console.log(`I'm ${this.name}.`)
}

var tony = new Person('Iron Man');
tony.say();   // I'm Iron Man


function Employee(name, type, career){
  Person.apply(this, arguments)   //(A) 부모의 속성을 받아온다. 현재 문맥의 this에 추가함.
  this.type = type;
  this.career = career;
  this.working = false;
}

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