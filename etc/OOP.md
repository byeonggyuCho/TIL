# Object-Oriented Programming

## TL;DR
프로그램을 수많은 객체라는 단위로 나누고 객체들의 상호작용으로 서술하는 프로그래밍 방식.

## intro
`객체 지향 프로그래밍`은 프로그램을 어떻게 설계해야 하는지에 대한 방법론이며,
효율적으로 프로그램을 짜기 위해 코드를 객체(Object)라는 단위로 나누고,
별도 개발 후 레고 블록 조립하듯 코딩하는 방법론입니다.  

순서대로 프로그래밍을 하며 순서가 어긋나거나 앞단계에서 문제가 생기면 스파게티소스가 되어버리는 절차지향 프로그래밍의 단점을 경험하고
"기능별로 나눠서 따로 개발하고 합치면 편하지 않을까?"하는 발상에서 출발한 방법이 "객체 지향 프로그래밍"입니다.  
"객체 (Object)"에 담아 부품을 따로 따로 제작을 하게 됩니다.
그 후, 마치 레고 블록을 조립하듯 기능을 하나씩 조립하여 프로그램을 완성합니다.
즉, 프로그램을 수많은 "객체"라는 기본 단위로 나누고 이 객체들의 상호작용으로 서술하는 방식입니다.  

OOP로 작성한 프로그램은 응집력과 결합력을 갖습니다.
**응집력(cohesion)**  
프로그램의 한 요소가 특정 목적을 위해 밀접하게 연관된 기능들이 모여서 구현되어 있고, 지나치게 많은 일을 하지 않으면 그것을 응집력이 높다고 표현한다.

**결합력(coupling)**  
프로그램 코드의 한 요소가 다른 것과 얼마나 강력하게 연결되어 있는지, 얼마나 의존적인지를 나타내는 정도. 결합력이 낮다는 것은 한 요소가 다른 요소들과 관계를 크게 맺고 있지 않은 상태를 의미한다.  


### OOP의 장단점

#### 장점
1. 코드 재상용성  
남이 만든 클래스를 가져와 이용할 수 있고 상속을 통해 확장가능함
2. 유지보수하기 쉬움  
절차 지향 프로그래밍에서는 코드를 수정해야할 때 일일이 찾아 수정해야하는 반면 객체 지향 프로그래밍에서는 수정해야 할 부분이 클래스 내부에 멤버 변수혹은 메서드로 있기 때문에 해당 부분만 수정하면 됨. 
3. 대형 프로젝트에 적합하다. 
클래스단위로 모듈화시켜서 개발할 수 있으므로 대형 프로젝트처럼 여러명, 여러회사에서 개발이 필요할 시 업무 분담하기 쉽다.

#### 단점
1. 처리속도가 상대적으로 느리다
2. 객체가 많오면 용량이 커질 수 있음
3. 설계가 어려움.





## 구성요소  
- 클래스  
같은 종류의 집단에 속하는 속성과 행위를 정의한 것.  다른 클래스와 독립적으로 디자인해야한다.  

- 객체  
클래스의 인스턴스 상위 클래스의 속성을 가지고 있으면서 개별적인 특성과 행위도 가지고 있다.  

- 메서드  
클래스로부터 생성된 객체를 사용하는 방법. 객체의 속성을 조작하는 데 사용된다. 


## 1.특성

### 캡슐화(Encapsulation)
데이터 구조와 데이터를 다루는 방법들을 결합 시켜 묶는 것. 다시 한번 말하자면 변수와 함수를 하나로 묶는것을 말한다.
데이터를 절대로 외부에서 직접 접근을 하면 안되고 오로지 함수를 통해서만 접근해야하는데 이를 가능하게 해주는 것이 바로 캡슐화이다.  아래 예제에서는 `level`이라는 변수를 메서드를 통햐서만 접근 가능하다.

```js
var Monster = function({name, id}){

	var level = 1;
	this.name = name
	this.id = id

	this.getLevel = function(){
		return level;
	}
}

var m1 = new Monster({name:'pika',id:1});
```

ES2019에 private라는 속성이 공식적으로 등록되었지만 그 이전 자바스크립트의 모든 변수는 public이다.  
그래서 앞서 클로저를 이용한 변수 은닉으로 private를 연출했다.  
자바스크립트의 상위호환 언어인 타입스크립트에서는 ES2019보다 직관적인 private 문법을 제공한다.  

```ts
class Monster {
    private level: number;

    constructor(theName:string, id:string) {
		this.id = id;
		this.name = theName; 
		this.level = 1;
	}

	getLevel(){
		return this.level
	}
}

const m1 = new Monster("pika","0006");

console.log(m1.level);
console.log(m1.getLevel())
```



### 추상화(Abstraction)
추상화는 객체들이 가진 공통의 특성들을 파악하고 불필요한 특성들을 제거하는 과정을 말한다.  
객체들이 가진 동작들을 기준으로 이용자들이 동작만 쉽게 구동할 수 있도록 한다. 

이러한 추상화 과정을 통해 이용자들은 프로그래머가 만든 객체를 더 쉽게 사용할 수 있게 된다.

추상화를 할 때 주의할 점은 속성 위주가 아닌 동작 위주로 정의하는 작업을 하는 것이다. 객체의 동작에 연관이 되지 않는 속성들은 결국은 불필요하다. 따라서 불필요한 속성들을 걸러내기 위해 동작을 먼저 정의하고 동작에 필요한 속성들을 정리하는 것이 좋다.  

```js
var  Monster = function({name, id}){

	var level = 1;
	this.name = name
	this.id = id

	this.getLevel = function(){
		return level;
	}
}
```
이 코드에서 모든 몬스터가 가지는 속성 level, name, id를 선언한 것이 추상화를 한것이다.  
추상화의 목적은 코드 재사용성에 있다. 공통된 요소를 추려낸뒤, 상황에 맞게 구체화하여 사용해야한다.  



### 상속성, 재사용(Inheritance)
OOP의 가장 큰 특성 중 하나가 바로 코드의 재사용성과 상속의 개념이다. 같은 객체를 여러 개 만들어야 하는 경우, 한 번 작성된 코드를 활용하여 동일한 객체를 만들 수 있다.  
자바스크립트에서 같은 객체를 반복해서 만드는 방법은 생성자함수와 팩토리함수를 이용하는 방법이 있다.
```js
function Monster () {
  this.healthPoint = 100;
  this.level = 1;
}
Monster.prototype.levelUp = function () {
  this.level++;
}
var m1 = new Monster();
var m2 = new Monster();
var m2 = new Monster();
```

```js
var monsterPrototype = {
  levelUp : function () {
    this.level++;
  }
}
function createMonster () {
  var monster = Object.create(monsterPrototype);
  monster.level = 1;
  return monster;
}
var m1 = createMonster();
var m2 = createMonster();
var m3 = createMonster();
```


상속이라는 개념은 하위개념의 특징을 물려받아 확장하는 것에 있다.  
이를테면 자동차의 특징을 상속받아 스포츠카를 생성하는 식이다.  

```js
function Monster () {
  this.healthPoint = 100;
  this.level = 1;
}
Monster.prototype.levelUp = function () {
  this.level++;
}


function Pikachu (){
	Monster.apply(this,arguments)
	this.hibit = 'electronic';
}

Pikachu.prototype = Object.create(Monster.prototype);
Pikachu.prototype.constructor = Pikachu;
Pikachu.prototype.bawl = function(){
	console.log('pika pika!')
}
```
위 예제에서 monster를 상속하여 pickchu를 생성했다.

### 다형성(Polymorphism)
하나의 변수명, 함수명 등이 상황에 따라 다른 의미로 해석될 수 있는 것이다.  

다형성은 상속을 통해 기능을 확장하거나 변경하는 것을 가능하게 해준다.   
이를 통해 코드의 재사용, 코드길이 감소가 되어 유지보수가 용이하도록 도와주는 개념이다.






## 2. SOLID
객체지향 설계 원칙



### 1. SRP(Single Responsibility)
단일책임의 원칙, 클래스는 단 한개의 책임을 가져야한다.  



### 2. OCP(Open Close Principle)
 개방-폐쇄의 원칙  
 확장에는 열려있고 수정에는 닫혀있어야한다.
 
1. 확장에 대해서는 Open
요구사항이 변경 될 때, 새로운 동작이나 기능을 추가 할 수 있어야한다.

2. 변경에 대해 닫혀 있다.
기능 확장으로 인해서 그 모듈의 코드가 변경되는 일이 일어나는것은 아니다.  
즉, 클래스를 수정하지 않으면서 확장이 가능해야한다.



### 3. LSP(The Liskov Substitution Principle)
리스코프 치환 원칙  
부모 클래스에서 자식 클래스 객체를 대입해 사용해도 프로그램은 정상적으로 동작해야한다.  
자식과 부모 클래스 사이에 행위에는 일관성이 있어야한다.  

#### 이 원칙에 위배되면...
- 자식클래스 객체를 파라미터로 전달 했을때 프로그램이 정상적으로 동작하지 않는다.
- 향후 기능을 변경하거나 확장시 코드를 수정해야한다.

### 4. ISP(Interface Segregation Principle)
- 인터페이스 분리의 원칙.

클래스는 자신이 사용하지 않는 인터페이스는 구현하지 말야아한다.  
하나의 인터페이스로 모든것을 처리하는 것보다는 작은 여러개의 인터페이스를 처리하는것이 낫다.  


### 5. DIP(Dependency Inversion Principle)
 - 의존 역전의 원칙.

상위 모듈이 하위 모듈의 구현이 의존해서는 안된다.  
둘다 추상타입에 의존해야한다.  
실제 사용관계는 바뀌지 않으나 관계를 최대한 느슨하게 만드는것이 목적이다. (유연함)  
클래스와 클래스는 밀접한 관계를 맺고 있으면안된다.  
DI패턴을 구현하기위해서 인터페이스를 통해서 상속을 받는다.  
클래스와 클래스 사이에 인터페이스가 끼어들어야한다.  
연결된 클래스가 수정되어도 직접적인 오류가 나지 않는다.  
상위 클래스인 인퍼터페이스를 매개체로 연결되어있기 때문이다.  





## REF
- [1](https://velog.io/@cyranocoding/%EA%B0%9D%EC%B2%B4-%EC%A7%80%ED%96%A5-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8DOOP-Object-Oriented-Programming-%EA%B0%9C%EB%85%90-%EB%B0%8F-%ED%99%9C%EC%9A%A9-%EC%A0%95%EB%A6%AC-igjyooyc6c)
- [알고보면 재미있는 OOP](https://evan-moon.github.io/2019/08/24/what-is-object-oriented-programming/)
- [객체지향프로그래밍](https://developerdk.tistory.com/4)