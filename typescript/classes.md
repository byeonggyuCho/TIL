# Classes

## Intro
전통적인 자바스크립트는 프로토타입 기반의 상속을 사용하여 재사용 가능한 요소를 만들었지만 이 방식은 꽤 불편한 방식입니다.  
`class`는 더 편하고 객체지향적은 접근 방식으로 객체를 상속할 수 있습니다.  
ES6에서부터 지원된 이 문법은 타입스크립트에서도 사용가능하며 하위 버전의 자바스크립트에서 동작하도록 컴파일합니다. 


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
클래스에서 멤버를 참조할 때 `this`를 통해 인스턴스의 멤버에 접근합니다.  
마지막 줄에 `Greeter`클래스를 통해서 인스턴스를 생성할때 `new`를 사용했습니다. `new`연산자는  새로운 객체를 만들고 객체를 초기화하기 위해 생성자 함수를 호출합니다. 



### Inheritance
타입스크립트에서 일반적인 객체지향적 패턴을 사용할 수 있습니다. 클래스 기반의 프로그래밍에서 가장 기본적인 방식은 기존의 클래스를 확장하는 것입니다.  

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

이 예제는 기본적인 상속의 기능을 보여줍니다.  클래스는 메서드와 속성을 상속받습니다.  
`Dog`는 `Animal`에서 파생된 **파생클래스 입니다**.  
파생클래스는 하위클래스(subClasses)라고 하며 기본 클래스는 슈퍼클래스(superclasses)라고도 합니다.  
이제 `Animal`을 상속받은 `Dog`로 부터 `bark()`와 `move()`를 사용할 수 있는 인스턴스를 생성할 수 있습니다.


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
위 예제를 보시죠. `extends`키워드를 이용해 `Horse`와 `Snake`라는 하위 클래스를 생성했습니다.  

이전 예제와 다른 점은 각 클래스의 생성자 함수에서 `super()`를 호출하고 있습니다. `super()`는 상위 클래스의 생성자 함수를 호출합니다. 

또 메서드 오버라이드를 하고 있습니다. `Snake`와 `Horse`에서 `Animal`의 `move()`를 오버라이드해서 각각 다른 기능을 구현했습니다.  
`tom`의 타입으로 `Animal`을 지정했지만 `Horce`의 인스턴스를 할당했고 오버라이딩된 `move()`를 실행한것을 주목해야하빈다. 

```ts
Slithering...
Sammy the Python moved 5m.
Galloping...
Tommy the Palomino moved 34m.
```


## Public, private, and proteced modifiers  
### Public by default
지금까지 예제에서 자유롭게 멤버에 접근할 수 있었습니다.  
클래스 문법을 사용하는 다른 언어를 해봤다면 `public`키워드가 사용되지 않았다고 생각할 수 있습니다.  
타입스크립트에서는 각 멤버에대한 접근제한자는 `public`이 기본값입니다.  

명확하게 `public`을 쓰고 싶으면 쓸 수 있습니다.  
위에서 다뤄본 `Animal`을 다음 처럼 작성할 수 있습니다.
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

타입스크립트 3.8에서 타입스크립트는 자바스크립트의 새로운 `private` 필드 문법을 제공합니다.
```ts
class Animal {
    #name: string;
    constructor(theName: string){this.#name = theName}
}

new Animal("Cat").#name // #name속성은 클래스 밖에서 접근할 수 없다.
```
이 문법은 자바스크립트 실행환경에 내장되어있고 필드의 격리를 보장할 수 있습니다.


## TypeScript private
타입 스크립트에서는 `private`를 표시함으로써 private 멤버를 선언할 수 있습니다.
```ts
class Animal {
    private name: string;
    constructor(theName:string) { thie.name = theName; }
}
new Animal("Cat").name;
```
다른 타입을 비교할 때 멤버의 출처와 무관하게 모든 멤버가 호환된다면 그 타입이 호환된다고 합니다.  

그러나 `private`와 `protected`맴버를 비교할때 그들의 타입을 다르게 다룹니다. 두 타입의 호환성을 비교하기 위해서 `private`맴버가 있으면 다른 타입도  같은 선언에서 유래한 `private`맴버가 있어야합니다.  `proteced`멤버 역시 마찬가지다.

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
예제에서 `Animal`를 상속받은 하위클래스 `Rhino`를 만들었습니다. 또 `Employee`라는 똑같은 모양의 클래스를 만들었습니다. 이 클래스들의 인스턴스들을 만들고 각각 변수에 할당했습니다.  
 `Animal`과 `Rhino`는 `private` 사이드를 공유하기 때문에 호환되지만 `Employee`의 경우에는 다릅니다 `Employee`를 `Animal`로 할당하려 했을때 타입이 호환되지 않는다는 에러가 발생합니다. `Emploee`가 `name`이라는 `private` 맴버를 가지고 있어도 이건 `Animal`에 선언된것이 아니기 때문입니다.


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
`Person`외부에서는 `name`을 사용할 수 없지만 `Person`을 상속받은 `Employee`의 메서드 안에서는 사용이 가능하다는 점을 주목해야 합니다.
`Person`의 생성자 함수에 `protected`가 마크되는데 이 멤버는 클래스 밖에서는 사용이 불가능하지만 `extend`는 가능합니다.

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

## Readonly modifier
`readonly` 키워드를 이용해서 읽기 전용 속성을 만들수 있습니다. 읽기 전용 속성은 반드시 생성자에서 초기화 되어야합니다.

```ts
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor (theName: string) {
        this.name = theName;
    }
}

let dad = new Octopus("Man with the 8 strong legs");
dad.name "Man with the 3-piece suit" // error! name is readonly;
```

### Parameter Properties
마지막 예제에서 `Octopus`클래스에 `name`이라는 읽기전용 멤버와 생성자의 파라미터 `theName`을 선언했습니다. 
이건 `Optopus`생성자가 실행된 후에 `theName`에 접근하기 위해서 필요합니다. 
매개변수 속성을 이용해서 맴버의 값을 초기화하고 생성할 수 있습니다.  
다음은 위 예제를 수정한 버전입니다.
```ts
class Octopus {
    readonly numberOfLegs: number = 8;
    constructor(readonly name: string) {

    }
}
```

`theName`를 모두 삭제하고 단축된 읽기 전용 `name`문자열 매개변수를 사용하여 `name` 맴버를 만들고 초기화합니다.  
선언문과 할당을 한 곳에 통합했습니다.  

매개변수 속성들은 이해하기 쉬운 수식어를 접두사로 지정하여 선언됩니다. `private` 키워드를 매개변수에 사용하여 비공개 맴버를 선언과 초기화를 합니다. 
`public`, `protected`그리고 `readonly`도 동일하게 동작합니다.  


## Accessors
타입스크립트는 객체의 멤버에 대한 접근을 가로채는 방법으로 getter setter를 지원합니다. 이렇게 하면 각 객체의 맴버에 접근하는 방법을 보다 세부적으로 제어할 수 있습니다.  

다음 클래스를 `set`과 `get`을 이용해서 바꿔봅시다. 우선 getter와 setter없이 진행해 봅시다.
```ts
class Employee {
    fullName: string;
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}
```
사용자가 임의로 `fullName`을 설정하는게 편할 수 있지만 어떤 상황에서는 강제로 제약을 걸어야할 수도 있습니다.  
이번 버전에서 데이터베이스 필드의 최대길이에 호환되는지 확인하기 위해 변수의 길이를 확인하는 setter를 추가할 겁니다.

```ts
const fullNameMaxLength = 10;

class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (newName && newName.length > fullNameMaxLength) {
            throw new Error("fullName has a max length of " + fullNameMaxLength);
        }
        
        this._fullName = newName;
    }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}
```
접근자가  변수 길이를 체크하고 있는지 증명하기 위해서 변수길이를 10자보다 길게 할당하고 에러가 발생하는 것을 확인해야합니다.  
접근자에 대해서 몇가지 주의사항이 있습니다.

1. 접근자는 컴파일러를 ES5보다 높은 버전으로 셋팅해야 합니다. ES3에서는 지원하지 않습니다.
2. `get` 접근자만 사용한 경우엔 읽기전용으로 취급합니다.  



## Static Properties
지금까지 클래스의 인스턴스 맴버에 대해서 애기했다. 클래스에 static 맴버를 만들 수 있는데 클래스 이름을 통해 접근 할 수있다.
이 예제에서는 모든 그리드의 일반값으로서 `static`을 origin에 사용합니다. 각 인스턴스는 클래스 이름을 접두어로 사용해서 `static` 맴버에 접근할 수 있습니다.
`this.`을 이용해서 인스턴스에 접근했던 것과 비슷하게 `Grid.`을 이용해서 `static`맴버에 접근할 수 있습니다.


```ts
class Grid {
    static origin = {x: 0, y: 0};
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor (public scale: number) { }
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));
```


## Abstract Classes
추상 클래스는 다른 클래스를 파생할 수 있는 기본 클래스입니다. 추상클래스는 직접 인스턴스화 하지 않습니다.  
인터페이스와 달리 추상 클래스는 세부적인 멤버에 대한 구현을 포함합니다. `abstract`키워드는 추상 클래스를 정의하기 위해 사용되고 추상 클래스 안의 추상 메서드에도 사용됩니다.

```ts
abstract class Animal {
    abstract makeSound(): void;
    move(): void {
        console.log("roaming the earth...");
    }
}
```

`abstract` 키워드가 붙은 추상 클래스 안의 메서드는 구현을 포함하지 않고 반드시 파생된 클래스에서 구현됩니다. 추상 메서드는 인터페이스 메서드와 공통점이 있습니다. 둘 다 메서드 본문을 정의하지 않고 메서드 시그니쳐를 정의합니다. 그러나 추상 메서드는 만드시 `abstract`키워드를 포함해야하고 선택적으로 접근자 수식어를 포함합니다.

```ts
abstract class Department {

    constructor(public name: string) {
    }

    printName(): void {
        console.log("Department name: " + this.name);
    }

    abstract printMeeting(): void; // must be implemented in derived classes
}

class AccountingDepartment extends Department {

    constructor() {
        super("Accounting and Auditing"); // constructors in derived classes must call super()
    }

    printMeeting(): void {
        console.log("The Accounting Department meets each Monday at 10am.");
    }

    generateReports(): void {
        console.log("Generating accounting reports...");
    }
}

let department: Department; // ok to create a reference to an abstract type
department = new Department(); // error: cannot create an instance of an abstract class
department = new AccountingDepartment(); // ok to create and assign a non-abstract subclass
department.printName();
department.printMeeting();
department.generateReports(); // error: method doesn't exist on declared abstract type
```



## Advanced Techniques


### Constructor functions
타입스크립트에서 클래스를 정의할 때 사실 동시에 여러개의 선언문을 만듭니다. 첫번째는 클래스의 인스턴스 타입입니다.

```ts
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter: Greeter;
greeter = new Greeter("world");
console.log(greeter.greet()); // "Hello, world""
```
`let greeter: Greeter`를 할때 `Greeter`클래스의 인스턴스 타입으로 `Greeter`를 사용하빈다.
이건 다른 객체지향 언어를 하다가 온 사람들 두 번 사용했다고 생각할겁니다.
또 생성자 함수라고 부르는 다른 값을 생성하고 있습니다. 이 함수는 클래스의 인스턴스를 생성할 때 호출되는 함수입니다.  

실제로 이 현상이 어떻게 보이는지 알아보기 위해 다음의 예제를 보겠습니다.
```ts
let Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
})();

let greeter;
greeter = new Greeter("world");
console.log(greeter.greet()); // "Hello, world"
```
`let Greeter`는 생성자 함수가 할당될 것입니다.  
`new`를 호출하고 생성자 함수를 실행할때, 클래스의 인스턴스를 얻습니다.  
생성자 함수는 클래스의 모든 `static`멤버를 포함하고 있습니다.  
각 클래스를 생각하는 다른 방법은 `instance`측면과 `static`측면 입니다.  

차이를 알아보기 위해 다음 예제를 봅시다.
```ts
class Greeter {
    static standardGreeting = "Hello, there";
    greeting: string;
    greet() {
        if (this.greeting) {
            return "Hello, " + this.greeting;
        }
        else {
            return Greeter.standardGreeting;
        }
    }
}

let greeter1: Greeter;
greeter1 = new Greeter();
console.log(greeter1.greet()); // "Hello, there"

let greeterMaker: typeof Greeter = Greeter;
greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter = new greeterMaker();
console.log(greeter2.greet()); // "Hey there!"
```
이 예에서 `greeter`는 전과 비슷하게 동작합니다. `Greeter`클래스를 초기화했고 이 객체를 사용합니다. 이전에 예제에서 봤던것들입니다.  

다음엔 클래스를 직접 사용합니다. 새로운 변수 `greeterMaker`를 생성합니다.  
이 변수는 클래스를 참조합니다.  

`typeof Greeter`를 사용했는데 이건 인스턴스 타입이 아닌 "`Greeter`클래스의 타입"이라는 의미입니다.  
보다 정확하게는 "Greeter라는 심볼의 타입"이 생성자 함수의 타입입니다.  
이 타입에는 `Greeter`클래스의 인스턴스를 생성하는 생성자와 함꼐 `Greeter`의 모든 static멤버가 포함됩니다.  
`new`를 `greeterMaker`에 사용하고 `Greeter`의 새로운 인스턴스를 생성했고 이전 처럼 실행했습니다.


### Using a class as an interface
이전 섹션에서 다뤘던 것처럼 클래스 선언은 두가지를 생성합니다.:  클래스의 인스턴스를 보여주는 타입과 생성자 함수를요.  
왜냐하면 클래스는 타입을 생성하기 떄문에 원하는 장소에 사용할 수 있습니다.


```ts
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```