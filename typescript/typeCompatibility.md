# Type Compatibility

## inro
타입스크립트에서 타입 호환은 구조적인 하위타입을 기반으로 합니다.  
구조적 타이핑은 구성원만 기반으로 하는 타입 연관 기법입니다.  
이건 명시적 타이핑과 대조적입니다.


```ts
interface Named {
    name: string;
}

class Person {
    name: string;
}

let p: Named;
// OK, because of structural typing
p = new Person();
```
자바나 C#같은 명시적 타입 언어에서 같은 코드는 에러가 될 수 있습니다.  
`Person`클래스가 명시적으로 `Named`인터페이스의 구현체로서 설명되지 않았기 때문입니다.  

타입스크립트의 구조적 탗입 스시템은 자바스크립트의 전형적인 작성 기법에 근거해서 디자인 됐습니다.  
자바스크립트가 함수 표현식이나 객체 리터럴같은 익명 객체를 사용하기 때문에 
자바스크립트 라이브러리에서 발견되는 관계를 구조적 타입 시스템으로 표현하는게 더 자연스럽습니다.  

### A Note on Soundness  
타입스크립트의 타입 시스템은 컴파일 시점에 알 수 없는 특정 작업을 안전하게 수행할 수 있습니다.
타입 시스템이 이 속성을 가질 때, 타입시스템이 경고를 합니다.  
타입스크립트가 비정상적인 동작을 허용하는 장소를 신중하게 고려했으며  
이 문서를 통해 이러한 현상이 어디서 발생하는지 그리고 그 뒤에 나타나는 동기부여 시나리오에 대해 설명하겠습니다.  


## Staring out 
타입스크립트의 구조적 타입 시스템의 기본 규칙은 `y`가 최소한 같은 `x`와 같은 매머를 가지고 있으면 `x`는`y`에 호환됩니다. 
```ts
interface Named {
    name: string;
}

let x: Named;
// y's inferred type is { name: string; location: string; }
let y = {
    name: "Alice",
    location: "Seattle"
};
x = y;
```
`y`을 `x`에 할당할 수 있는지 검증하기 위해서 컴파일러는 `y`에서 `x`의 각 속성과 호환되는 속성을 찾습니다.  
이 에제에서 `y`는 `name`이라는 문자열 맴버를 가지고 있습니다. 그래서 할당이 된겁니다.  

함수 호출 인자들은 확인할때도 할당에 대한 같은 규칙이 사용됩니다.  
```ts
function greet(n: Named) {
    console.log("Hello, "+ n.name);
}
greet(y); // OK
```
`y`는 `location`이라는 여분의 속성이 있습니다만 에러를 발생시키지 않습니다.  
호환성을 검증할때 타겟 타입의 멤버들만 고려됩니다.  
이 비교 프로세ㅅ는 각 멤버와 하위 멤버의 타입을 탐색하면서 반복적으로 진행됩니다.  

## Comparing two functions
원시 타입과 객체타입을 비교하는것은 상대적으로 직관적인 반면에 함수가 호환될지 고려하는것은 복잡합니다.  
파라미터가 다른 두 함수로 시작해 봅시다.  

```ts
let x = (a: number) => 0;
let y = (b: nubmer, s: string) => 0;

y = x;  
x = y;  // Error
```

`x`를 `y`에 할당할수 있는지 확인하기 위해서 첫번째로 파라미터 목록을 봐야합니다.  
`x`안의 각 파라미터에는  `y`의 파라미터중 호환가능한 타입이 있어야합니다.  
파라미터의 이름은 고려되지 않으며 오직 파라미터의 타입만 고려됩니다.  

이 경우에 `x`의 모든 파라미터는 `y`의 파라미터의 호환 가능한 파라미터를 가집니다. 그러므로 할당됩니다.  

두번째 할당은 에러입니다. `y`가 `x`에 없는 필수 파라미터를 가지고 있기 때문에 할당아 안 됩니다.  

버려지는 파라미터를 허용하는 이유가 궁금할 수 있습니다.  
이런 할당을 허용하는 이유는 여분의 함수 파라미터를 무시하는것은 자바스크립트에서 흔한 일이기 때문입니다.  
예를들어 `Array.prototype.forEach`는 콜백함수에 세개의 파라미터를 제공합니다. 배열 요소, 인덱스, 그리고 컨테이너 배열이요.  
그럼에도 첫번째 파라미터만 사용하는 콜백을 제공하는것은 유용합니다.  

```ts
let items = [1,2,3];

// Don't force these extra parameter;
items.forEach((item, index, array)) => console.log(item));

// Should be OK!
item.forEach(item => console.log(itme))
```

이제 반환 타입이 다른 두 함수를 사용하여 처리된 타입을 반환하는 방법을 알아봅시다. 

```ts
let x = () => ({name: "Alice"})
let y = () => ({name: "Alice", location: "Seattle"});

x = y; // OK
y = x; // Error, because x() lacks a location prperty
```
타입시스템을 강제로 소스 함수의 반환타입이 타겟 반환타입의 하위 타입이 되도록 합니다.  

## Function Parameter Bivariance 
함수 파라미터들을 비교할 때, 소스 파라미터가 타겟파라미터를 할당할 수 있거나 그 반대인 경우 할당할 수 있다.  

호출한 측에서 에게 더 특수화된 타입을 취하는 함수가 제공될 수 있지만 덜 특화된 타입의 함수를 호출할 수 있기 때문에 바람직하지 않습니다  

```ts
enum EventType { Mouse, Keyboard }

interface Event { timestamp: number; }
interface MouseEvent extends Event { x: number; y: number }
interface KeyEvent extends Event { keyCode:number }

function listenEvent (eventType: EventType, handle: (n: Event) => void) {

}

// Unsound, but useful and common
listenEvent(EventType.Mouse, (e: MouseEvent) => console.log(e.x + "," + e.y));

// Undesirable alternatives in presence of soundness
listenEvent(EventType.Mouse, (e: Event) => console.log((e as MouseEvent).x + "," + (e as MouseEvent).y));
listenEvent(EventType.Mouse, ((e: MouseEvent) => console.log(e.x + "," + e.y)) as (e: Event) => void);

// Still disallowed (clear error). Type safety enforced for wholly incompatible types
listenEvent(EventType.Mouse, (e: number) => console.log(e));
```

컴파일러 플래그 `strincFunctionTypes`를 통해서 타입스크립트가 에러를 내게 할 수 있습니다.


### Optional Parameters and Rest Parameters
호환성을 위해 함수를 비교할 때 옵션 파라미터와 필수 파라미터는 교환할 수있습니다.  
소스 타입의 추가 옵션 파라미터는 오류가 아니며 소스 타입에서 일치하는 파라미터가 없는 대상 타입의 옵션 파라미터는 오류가 아닙니다.  

함수가 rest파라미터를 가지면 무한의 옵션 파라미터가 있는것 처럼 처리된다.  
이는 타입 시스템의 관점에서 보면 중요하지 않지만 런타임 관점에서 선택적 파라미터의 개념은 일반적으로 잘 적용되지 않습니다.
왜냐면 그 위치에 `undefined`가 통과하는 것이 대부분의 함수가 같기 때문입니다.  

설명하는 예제는 콜백을 수행하고 일부 예측 가능하지만 알 수 없는 인수(`args`)를 사용하여 호출하는 함수의 일반적인 패턴입니다.
```ts
function invokeLater(args: any[], callback: (...args: any[]) => void) {
    /* ... Invoke callback with 'args' ... */
}

// Unsound - invokeLater "might" provide any number of arguments
invokeLater([1, 2], (x, y) => console.log(x + ", " + y));

// Confusing (x and y are actually required) and undiscoverable
invokeLater([1, 2], (x?, y?) => console.log(x + ", " + y));
```


### Functions with overloads
함수에 오버로드가 있는 경우 각 오버로드는 대상 타입의 호환가능한 특징에 반드시 일치해야합니다.  
대상 함수가 모든 같은 상황에서 원본 함수로 호출 될 수 있다는 것을 보장하게 됩니다. 

## Enums
Enums은 숫자와 오환되며 숫자는 enum과 호환됩니다. 다른 enum타입에서의 enum 값은 호환할 수 없는 것으로 간주됩니다.  

```ts
enum States { Ready, Waiting };
enum Color { Red, Blue, Green };

let status = Status.Ready;
status = Color.Green; // Error
```

## Classes
클래스는 한가지 예외만 빼면 객체 리터럴과 인터페이스와 비슷하게 작동한다.  
클래스는 static과 인스턴스 타입이 있다. 두 클래스 타입 객체를 컴파일 할때 인스턴스 멤버들만 비교된다.  
Static 멤머와 생성자는 호환성에 영향을 주지 않는다.  

```ts
 class Animal {
    feet: number;
    constructor(name: string, numFeet: number) { }
}

class Size {
    feet: number;
    constructor(numFeet: number) { }
}

let a: Animal;
let s: Size;

a = s;  // OK
s = a;  // OK
```

### pravate and proteced members in classes
클래스에서 private와 proteced 멤버는 호환성에 영향을 준다.  
클래스의 인스턴스가 호환성 검증을 받을 때 대상 타입이 private 멤버를 가지고 있으면 원본 타입은 반드시 같은 클래스에서 파생된 private 멤버를 가지고 있어야한다.  
비슷하게 protected 멤버에도 적용된다.   
이렇게 하면 클래스가 상위 클래스와는 호환이 되지만 다른 모양을 가진 상속계층의 클래스와는 호환이 되지 않는다.  


## Generics 
타입스크립트는 구조적 타입 시스템이기 때문에 
타입 파라미터는 멤버의 타입의 일부로서 사용될 때 결과 타입에만 영향을 준다.
```ts
interface Empty<T> {
}
let x: Empty<number>;
let y: Empty<string>;

x = y;  // OK, because y matches structure of x
```
위 예제에서 `x`와 `y`는  각각의 구조가 인수 타입을 차별화된 방식으로 사용하지 않기 때문에 호환된다.  
`Empty<T>`에 멤버를 더해서 예제를 바꾸면 동작 원리가 이해됩니다.

```ts
interface NotEmpty<T> {
    data: T;
}
let x: NotEmpty<number>;
let y: NotEmpty<string>;

x = y; // Error, beacouse x and y are not compatible
```
이 방법에서 타입 인자를 구체화 하는 제네릭 타입은 비 제네릭 타입 처럼 동작합니다.  
인자들의 타입을 구체화하지 않는 제네릭 타입때문에 호환성은 정의되자 않은 타입 인자들을 `any`로 구체화 함으로서 검증합니다.  
 비 제네릭 타입처럼 산출된 타입은 호환성에 대해 검증됩니다.  

 ```ts
let identity = function<T>(x: T): T {
    // ...
}

let reverse = function<U>(y: U): U {
    // ...
}

identity = reverse;  // OK, because (x: any) => any matches (y: any) => any
 ```


 ## Advanced Topics
 ### Subtype vs Assignment
지금까지 "호환성(compatible)"이란 용어를 사용했지만 이건 타입스크립트 명세서에 정의된 용어가 아닙니다.  
타입스크립트에서 두가지 종류의 호환성이 있는데 하위타입과 할당입니다.  
이러한 설정은 해당 할당에서만 하위 타입 호환성을 확장하여 `any`에 대한할당과 해당 숫자 값의 `enum`에 대한 할당을 가능하게 합니다.

언어의 다른 장소들은 상황에 따라 두 가지 호환성 메커지늠 중 하나를 사용합니다.  
실제로 `implements`및 `extends`절의 경우에도 타입 호환성은 할당 호환성에 의해 결정됩니다.