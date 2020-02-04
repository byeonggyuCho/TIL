# Interface

## intro
"duck typing" "structural subtyping"


### First Interface
```ts
function printLabel(labeledObj: { label: string}) {
    console.log(labledObj.label);
}

let myObj = {size: 10, label: 'Size 10 Object'};
printLabel(myObj);
```
type checker는 printLabel에 대한 호출을 확인한다. printLabel의 인자는 문자열 타입의 label 속성이 있는 객체를 전달받아야한다.  
예제에서 실제로 전달하는 myObj에는 더 많은 속성(`size`)가 있지만 컴파일러는 필요한 변수와 타입만 확인한다.  

위 예제를 `interface`문법을 이용해서 다시 작성해보겠다.
```ts
interface LabeledValue {
    label: string;
}

function printLabel(labeledObj: LabeledValue) {
    console.log(labeledObj.label);
}

let myObj = {size: 10, label: 'Size 10 Object'};
printLabel(myObj);
```
LabeledValue는 필수값을 설명해주기 위한 이름이다. 여전히 `label`이라는 문자열 변수 하나만 있다. 
printLabel에 파라미터를 전달할때 이 인터페이스의 구조를 확인한다. 이 때 중요한것은 함수에 인자에 필수요소의 포함여부와 인자의 자료형이다.  
이 예제에서 처럼 필수조건인 label이라는 조건만 충족하면 size라는 속성이 있는것과 별개로 타입체크를 통과한다.  
이때 인자의 순서는 상관없다 중요한 것은 필수인자의 유무와 인자의 타입이다.


### Optoinal Properties
모든 요소가 필수요소는 아닐 수도 있다. "option bags"와 같은 상황에서 이런 기능이 필요하다. 

```ts
interface SquareConfig {
    color?: string;
    width?: number;
}

interface SquareTemplate {
    color: string;
    area: number;
}

function createSquare(config: SquareConfig): SquareTemplate {
    let newSquare: SquareTemplate = { color: 'white', area: 100 };
    if(config.color) {
        newSquare.color = config.color;
    }

    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
};

let mySquare = createSquare({color: 'black'});
```
선택옵션을 지정하려면 인터페이스의 속성명의 끝자리에 `?`를 써주면 된다.  
선택적 속성을 사용하면 해당 인자를 설명할 수 있고 미리 선언하지 않은 속성이 전달되는 것을 방지할 수 있다.  
예를 들어 `{color: 'white', width:100}`을 직접 선언하는 것보다 `SquareConfig`를 입력하는 것이 가독성이 더 좋다.


```ts
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string, area: number } {
    let newSquare = { color: 'white', arae: 100};

    if (config.clor) {
        // Error: Property 'clor' does not exist on type 'SquareConfig'
        newSquare.color = config.clor;
    }
    if (config.width) {
        newSquare.area = config.width * cofig.width;
    }
    return newSquare;
} 

let mySquare = createSquare({color: 'black'});
```


### Readonly properties
읽기 전용 속성을 선언하는 방법을 알아보자. 인터페이스의 속성명 앞에 `readonly`라는 키워드를 입력하면 된다.
 

 ```ts
interface Point {
    readlonly x: number;
    readlonly y: number;
}
```

이 인터페이스를 사용하면 초기화 이후에는 수정이 불가능하다.
```ts
let p1: Point = { x:10, y:20 };
p1.x = 5; // error;
```

TypeScript에는 `ReadonlyArray<T>` 타입을 제공하는데 읽기전용 배열을 생성할 수 있다.
```ts
let a: number[] = [1,2,3,4];
let re: ReadonlyArray<number> = a;
re[0] = 12; // error!
re.push(5); // error!
re.length = 100; // error!
a = re; // error!
```

위 sippet의 마지막 줄을 보면 ReadonlyArray를 일반 배열에 할당하는 것도 허용하지 않는다는걸 알 수 있다.  
이런 경우에는 아래 처럼 정의해야한다.
```ts
a = ro as number[];
```

`const`의 용도와 `readonly`의 용도가 헷갈리 수 있다. 이경우 구분짓는 가장 중요한 기준은 
변수에는 `const`를 속성에는 `readonly`를 부여하는 것이다.


### Excess property Checks
앞서 `optional properties`에 대해서 배웠는데 이 기능을 사용할 때 주의해야할 점이 있다. 
```ts
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig: { color: string; area: number } ) {
    // ...
}

let mySquare = createSquare({ colour: 'red', width: 100});
```
이 코드에서 createSquare의 인자로 `colour`를 넘겼다. 이 경우 타입스크립트 컴파일러는 어떻게 반응할까? 
정답은 오류다. SquareConfig 인터페이스에 `colour`라는 속성이 없기 때문에 오류가 난다.  

```ts
// error: Object literal may only specify known properties, but 'colour' does not exist in type 'SquareConfig'. Did you mean to write 'color'?
let mySquare = createSquare({ colour: "red", width: 100 });
```

이런 에러를 피하기 위해선 다음 처럼 작성할 수 있다.

```ts
let mySquare = createSquare({ width:100, opacity: 0.5 } as SquareConfig);
```

더 좋은 방법은 SquareConfig 인터페이스에 여분의 속성을 등록하는 것이다. 
```ts
interface SquareConfig {
    color?: string;
    width;: number;
    [propName: string]: any;
}
```

이런 유형검사를 피하는 마지막 방법은 그 대상을 다른 변수에 할당하는 것이다.
```ts
let squareOptions = { colour: 'red', width: 100 };
let mySquare = createSquare(squareOptions);
```
위 해결책은 squareOptions과 SquareConfig에 공통된 속성이 존재하는한 문제없이 동작한다. 
따라서 squareOptions에서 width를 제거하면 오류가 난다.
```ts
let squareOptions = { colour: 'red' };
let mySquare = createSquare(squareOptions);
```

하지만 이런 방식으로 타입체크를 우회하는 것은 추천하는 방식은 아니다.  
대부분의 경우에서 `colour`같은 속성은 버그이다.


### Function Types
지금까지 속성을 가진 객체를 정의하는 인터페이스만 다뤄왔지만 함수 타입도 정의할 수 있다.  
함수 타입을 정의하기 위해서 함수 선언과 마찬가지로 파라미터의 목록과 파라미터의 이름, 타입을 정의해야하고 반환값의 유형을 정의해야한다.

```ts
interface SearchFunc {
    (source:string, subString: stirng): boolean;
}
```

아래는 인터페이스를 이용해서 함수를 정의한 예제이다.
```ts
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string): boolean {
    let result = source.search(subString);
    return result > -1;
}
```

인터페이스로 정의한 함수는 매개변수의 자료형과 함수 반환값의 자료형을 정의하지 않아도 암묵적으로 인터페이스의 정의를 따라간다.
```ts
let mySearch: SearchFunc;
mySearch = function(source, subString) {
    let result = source.search(subString);
    return result > -1;
}
```

당연한 얘기만 반환값이나 매개변수의 자료형을 다르게 사용하면 오류가 난다.  
아래는 반환값의 자료형을 문자열로 했을때의 상황이다.
```ts
let mySearch: SearchFunc;

// error: Type '(src: string, sub: string) => string' is not assignable to type 'SearchFunc'.
// TYpe 'string' is not assignable to type 'boolean'
mySearch = function(src, sub) {
    let result = src.search(sub);
    return 'string';
};
```


### Inedxalbe Types

배열과 같이 인덱스로 요소를 접근하는 자료형에서 인덱스의 자료형과 반환값의 자료형을 지정할 수 있다.
```ts
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ['Bod', 'Fred'];

let myStr: string = myArray[0];
```
위 예제에서 `StringArray`는 number타입으로 인덱싱하면 문자열을 반환한다고 설명하고있다.
인덱스로 지원하는 자료형은 숫자와 문자열이 있다.  두가지 유형의 인덱서를 모두 지원할 수는 있지만 숫자로 인덱싱하는 경우 문자열 인덱서에서 반환되는 유형의 하위 유형이어야한다.  
왜냐하면 자바스크립트에서 숫자로 인덱싱하면 내부적으로 숫자를 문자열로 치환하여 인덱시하기 때문이다. 가령 0인덱스가 '0'인덱스로 치환되는 것이다.  때문에
아래 예제처럼 숫자 인덱싱이 문자인덱싱위 상위 유형이면 안된다.  

```ts
class Animal {
    name: string;
}

class Dog extends Animal {
    breed: string;
}


// Error
interface NotOkay {
    [x: number]: Animal;
    [x: string]: Dog;
}
```

다음과 같은 경우 반환타입이 숫자로 한정되어 문자열을 반환할 수 없다.
```ts
interface NumberDictionary {
    [index: string]: number;
    length: number;
    name: string;       // 문자열을 반환할 수 없다.
}
```

그러나 다음 예제처럼 인덱싱 시그니쳐에 자료형을 추가로 등록하면 사용가능하다.
```ts
interface NumberDictionary {
    [index: string]: number | string;
    length: number;
    name: string;       // 문자열을 반환할 수 없다.
}
```

마지막으로 인덱싱 시그니쳐에 `readonly`를 부여하는 방법을 알아보자.
```ts
interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = ["Alice", "Bob"];
myArray[2] = "Mallory"; // error
```


### Class Types
타입스크립트에서도 자바나 C#같은 언어 처럼  인터페이스를 이용해서 Class의 구조를 명시적으로 강제하는 것이 가능 하다.

```ts
interface ClockInterface {
    crrentTime: Date;
}

class Clock implements ClockInterface {
    currentTime: Date = new Date();
    constructor(h: number, m: number) { }
}
```

클래스에서 구현할 메서드도 인터페이스에서 선언할 수 있다.
```ts
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date): void;
}

class Clock implements ClockInterface {
    currentTime: Date = new Date();
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m:number){}
}
```

인터페이스는 private한 부분 보다는 public한 부분을 묘사한다. 


#### static과 클래스의 인스턴스의 차이
클래스와 인터페이스로 작업을 할때는 클래스가 static side와 intance side 타입 두가지 타입을 가진다는 것을 주의해야한다.  
생성자 시그니처가 있는 인터페이스를 만들고 인터페이스를 구현한 클래스를 만들려고 하면 에러가 난다.

```ts
interface ClockConstructor {
    new (hour: number, minute: number)
}

class Clock implements ClockConstructor {
    currentTime: Date,
    constructor(h: number, m: number) { }
}
```
왜냐하면 클래스가 인터페이스를 구현하려고 할때 클래스의 인터페이스 쪽만 정검하는데
생성자는 static 쪽에 위치하기 때문에 정검에서 벗어난다.  

대신에 클래스의 static side를 직접 작업할 필요가 있다.  
예를 들어 생성자에 대한 인터페이스(`ClockConstructor`)를 만들고 인스턴스 메서드(`ClockInterface`)를 위한 인터페이스를 생성하는 식이다.
그 다음에 편의를 위해 전달되는 유형의 인스턴스를 생성하는 생성자함수(`createClock`)를 정의한다.

```ts
// static side
interface ClockConstructor {
    new (hour: number, minute:number): CockInterface;
}

// interface side
interface ClockInterface {
    tick(): void;
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute)
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}

class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) {}
    tick() {
        console.log("tick tick");
    }
}

let disital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
```

 `createClock`의 첫번째 파라미터의 타입이 `ClockConstructor`이기 때문에 `AnalogClock`이 올바른 생성자 시그니쳐를 가지고 있는지 확인한다.  
 다른 방법은 클래스 표현을 사용하는 것이다.

 ```ts
interface ClockConstructor {
    new (hour: number, minute: number);
}

interface ClockInterface {
    tick();
}

const Clock: ClockConstructor = class Clock implements ClockInterface {
    constructor(h: number, m: number) {}
    tick() {
        console.log("beep beep")
    }
}
 ```


 ### Extending Interfaces
 클래스처럼 인터페이스는 서로 확장할 수 있다. 확장을 통해 다른 인터페이스의 멤버를 복사할 수 있다.  
 이 기능은 인터페이스를 재사용 가능한 요소로 분리할 때 유연함을 제공한다.

 ```ts
interface Shape {
    color: string
}

interface Square extends Shape {
    sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
 ```

 한번에 여러개의 인터페이스를 확장할 수 있다.
 ```ts
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.color = 10;
square.color = 5.0;
 ```


 ### Hybrid Types
 ```ts
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = (function (start: number) {}) as Counter;
    counter.interval = 123;
    counter.reset = function () {};
    return counter;
}

let c = getCounter;
c(10);
c.reset();
c.interval = 5.0;

 ```
 서드파티 자바스크립트와 인터페이싱을 할때  유형의 shape를 완전히 묘사하기 위해서 위와 같은 패턴을 사용해야한다.  


 ### Interface Extending Classes 
클래스 타입으로 인터페이스를 확장할 때 클래스의 요소는 상속되지만 구현은 상속되지 않는다.  인터페이스는 클래스의 private멤버와 protected 멤버까지 상속받는다.  
이 말은 클래스를 상속받은 인터페이스를 상속받을 때, 인터페이스 타입이 인터페이스 타입이 클래스나 그 하위 클래스에 의해서만 구현될 수 있다는 얘기다.
이 기느은 상속 계층이 큰 경우에 유용하며 특정 속성을 가진 하위 클래스에서만 코드가 작동되려고 지정할 때 유용하다. 하위 계층은 기본 계층에서 상속되는 것외에 관련이 없다.  

```ts
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

class TextBox extends Control {
    select() { }
}

// Error: Property 'state' is missing in type 'Image'.
class Image implements SelectableControl {
    private state: any;
    select() { }
}

class Location {

}
```
위 에에서 `SelectableControl`은 private state속성을 포함해서 `Control`의 모든 멤버를가지고 있다.  
`state`는 private member이기 때문에 `Control`의 후손만 `SelectableControl`을 구현할 수 있다.  이것 은 `Control`의 후손은 `state` private member를 가지고 있기 때문인데 이것은 pivate member의 양립조건이다.  


`Control`클래스안에서 `SelectableControl`인스턴스를 통해서 `state member`에 접근할 수 있다. 효과적으로 `SelectableControl`은 `Control`처럼 동작한다.  
`Button`과 `TextBox`클래스는 `SelectableControl`의 서브타입이지만 `Image`와 `Location`클래스는 아니다.