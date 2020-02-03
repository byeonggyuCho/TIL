# Classes

## Intro
전통적인 자바스크립트는 프로토타입 기반의 상송을 사용하여 재사용 가능한 요소를 만들었지만 이 방식은 꽤 불편한 방식이다.  
`클래스`는 더 편하고 객체지향적은 접근 방식으로  객체를 상속할 수 있다.  
ES6에서부터 지원된 이 문법은 타입스크립트에서도 사용가능하며 그 하위 버전의 자바스크립트에서 동작하도록 컴파일한다. 


## Classes
```ts
const Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello," + this.greeting;
    }
}

let greeter = new Greeter("word");
```
클래스에서 멤버를 참조할 때 `this`를 통해 인스턴스의 멤버에 접근한다.  
마지막 줄에 `Greeter`클래스를 통해서 인스턴스를 생성할때 `new`를 사용했다. 이건 새로운 객체를 만들고 객체를 초기화하기 위해 생성자 함수를 호출한다. 



### Inheritance
타입스크립트에서 일반적인 객체지향적 패턴을 사용할 수 있다. 클래스 베이스의 프로그래밍에서 가장 기본적인 방식은 기존의 클래스를 확장하는것이다.  

```ts
class Animal {
    move(distanceInMeters: number = 0){
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}

class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!')
    }
}

const dob = new Dog();
dog.bark();
dog.move(10);
dog.bark()
```

이 예제는 기본적인 상속의 기능을 보여준다.  클래시는 메서드와 속성을 상속받는다. 여기 `Dog`는 `Animal`로부터 기능을 확장했다. 이제 `Animal`을 상속받은 `Dog`로 부터 `bark()` `move()`를 사용할 수 있는 인스턴스를 생성할 수 있다.


```ts
class Animal {
    name: string,
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`)
    }
}

class Snake extends Animal {
    constructor(name: string) { super(name)o; }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal {
    constructor(nane: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(dsitanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);
```
위 예제를 보시죠. `extends`키워드를 이ㅛㅇ해 `Horse`와 `Snake`라는 하위 클래스를 생성했습니다.  

이전 예제와 다른 점은 각 클래스의 생성자 함수에서 `super()`를 호출하고 있습니다. `super()`는 상위 클래스의 생성자 함수를 호출합니다. 이건 타입스크립트에서 강제하는 중요한 규칙입니다.  

또 예제는 메서드 오버라이드를 하고 있습니다. `Snake`와 `Horse`에서 `Animal`의 `move()`를 오버라이드해서 각각 다른 기능을 구현했습니다. `tom`의 타입으로 `Animal`을 지정했지만 `Horce`의 인스턴스를 할당했고 오버라이딩된 `move()`를 실행한것을 주목해야하빈다. 

```ts
Slithering...
Sammy the Python moved 5m.
Galloping...
Tommy the Palomino moved 34m.
```


## Public, private, and proteced modifiers  
### Public by default
지금까지 에제에서 자유롭게 멤버에 접근할 수 있었다. 클래스 문법을 사용하는 다른 언어를 해봤다면 `public`키워드가 사용되지 않았다고 생각할 수 있다.  
타입스크립트에서는 각 멤버에 `public`은 기본값이다.  

`public`을 쓰고 싶으면 쓸 수 있다. 위에서 다뤄본 `Animal`을 다음 처럼 작성할 수 있다.
```ts
class Animal {
    public name: string;
    public constructor(theName string) {this.name = theName; }
    public move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m`)
    }
}
```

## ECAMScript Private Fileds

타입스크립트 3.8에서 타입스크립트는 자바스크립트의 새로운 `private` 필드 문법을 제공한다.
```ts
class Animal {
    #name: string;
    constructor(theName: string){this.#name = theName}
}

new Animal("Cat").#name // #name속성은 클래스 밖에서 접근할 수 없다.
```

이 문법은 자바스크립트 실행환경에 내장되어있고 각 필드의 격리를 보장할 수 있다.


## TypeScript private
타입 스크립트에서는 `private`를 표시함으로써 비공개 멤버를 선언할 수 있다.
```ts
class Animal {
    private name: string;
    constructor(theName:string) { thie.name = theName; }
}
new Animal("Cat").name;
```
다른 타입을 비교할 때 멤버의 출처와 무관하게 모든 멤버가 호환된다면 그 타입이 호환된다고 말한다.  

그러나 `private`와 `protected`맴버를 비교할때 그들의 타입을 다르게 ㄷ룬다. 두 타입의 호환성을 비교하기 위해서 `private`맴버가 있으면 다른 타입도  같은 선언에서 유래한 `private`맴버가 있어야한다.  `proteced`멤버 역시 마찬가지다.

```ts
class Animal {
    private name: string;
    constructor(theName: string) {
        this.name = theName;
    }
}

class Rhino extends Animal {
    constructor() {
        super("Rhino");
    }
}

class Employee {
    private name: string;
    constructor (theName: string) {
        this.name = theName;
    }
}

let animal = new Animal("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino;
animal = employee; // Error: 'Aniaml' 과 `Employee`는 호환되지 않는다.
```

예제에서 `Animal`를 상속받은 하위클래스 `Rhino`를 만들었다. 또 `Employee`라는 똑같은 모양의 클래스를 만들었다. 이 클래스들의 인스턴스들을 만들고 각각 할당했다.  
 `Animal`과 `Rhino`는 `private` 사이드를 공유하기 때문에 호환된다. 하지만 `Employee`의 경우에는 다르다. `Employee`를 `Animal`로 할당하려 했을때 타입이 호환되지 않는다는 에러가 발생한다. `Emploee`가 `name`이라는 `private` 맴버를 가자ㅣ고 있어도 이건 `Animal`에 선언된것 이 아니다.


### Understanding protected
```ts
class Person {
    protected name: string;
    constructor(name: string) {this.name = name }; 
}

class Employee entends Person {
    private department: string;

    constructor(name: string, deaprtment: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I  work in ${this.department}.`;
    }
}

let howard = new Employee("HOward", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name);       // error
```
`Person`외부에서는 `name`을 사용할 수 없지만 `Person`을 상속받은 `Employee`의 메서드 안에서는 사용이 가능하다는 점을 주목해야한다.
`Person`의 생성자 함수에 `protected`가 마크되는데 이 멤버는 클래스 밖에서는 사용이 불가능하지만 `extend`는 가능하다

```ts
class Person {
    protected name: string;
    protected constructor(theName: string) {
        this.name = theName;
    }
}

// Employee can extend Person
class Employee extends Person {
    private deaprtment: string;

    constructor(name: string, department: string) {
        super(name);
        this.deaprtment = department;
    }
}

let howard = new Employee("Howard", "Sales");
let jogn = new Person("Jogn") // Error: Person constructor is protected
```