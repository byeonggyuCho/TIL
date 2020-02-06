# Generics

## Intro
소프트웨어 공학의 중요한 부분은 명확하고 일관된 API 뿐만 아니라 재사용할 수 있는 컴포넌트를 구축하는 것입니다.
현재의 데이터 뿐만 아니라 미래의 데이터에서 동작 가능한 컴포넌트는 큰 소프트웨어 시스템을 구축하기 위한 유연함을 제공할 것입니다.  

C#이나 자바같은 언어에서 재사용할수있는 컴포넌트는 만들기 위한 중요 도구중 하나는 제네릭입니다. 제네릭은 다양한 타입에서 동작 할 수 있는 컴포넌트를 만들 수 있습니다.  
이를 통해 사용자는 이런 컴포넌트를 이용하고 자신의 타입을 사용할 수 있습니다.  


### Hello World of Generics
우런 식별자 함수 제네릭의 "hellow world"를 만듭시다. 
식별자 함수는 전달받은것을 그대로 반환하는 함수입니다. `enco`커맨드와 비슷한 방식이라고 생각할 수 있습니다.  

제네릭이 없으면 식별자 함수에 특정 타입을 부여해야 합니다.
```ts
function identity(arg: number): number {
    return arg;
}
```
이렇게 하거나 식별자 함수를 `any`타입을 이용해서 설명할 수 있습니다.
```ts
function identity(arg: number): any {
    return arg;
}
```

`any`를 사용하는 것은 함수가 `arg`에 대해서 모든 타입을 수용한다는 점에서 확실히 포괄적이지만 함수가 반환될 때 타입 대한 정보를 잃습니다. 
 숫자를 전달할때 어떤 타입이 반환될지 모르는 겁니다. 

반환타입을 지정하는 방법으로 인수 타입을 정하는 방법이 필요합니다.
값이 아닌 타입에서 처리하는 특별한 종류의 변수 같은 **타입변수**를 사용할 것입니다.  
```ts
function identity<T>(arg: T) : T {
    return arg;
}
```
이제 identity 함수에 대한 타입변수 `T`를 얻었습니다.  
`T`를 통해 사용자가 제공하는 타입을 캡쳐할 수 있습니다. 그리고 그 정보를 나중에 쓸 수 있습니다.  
여기서 `T`를 반환타입으로 다시 사용합니다. 이제 인자와 반환값에 같은 타입이 사용된걸 알 수 있습니다.  
제네릭은 함수에 타입정보를 전달하고 밖으로 내보낼 수 있게 해줍니다.  

identity 함수 버전이 포괄적이라고 말합니다.  
타입의 범주를 넘어서 동작하니까요. `any`를 사용하는 것과 달리 인자와 반환타입에 숫자를 사용한 첫번째 식별함수 만큼이나 정밀합니다.  
(입력한 타입에 대한 정보를 잃어버리지 않습니다.)

이 함수을 호출하는 두가지 방법이 있습니다. 
첫번째는 타입 인수를 포함하여 모든 인수를 함수에 전달하는 방법입니다.
```ts
let output = identity<string>("myString");      // type of output will be 'string'
```

여기서 명시적으로 함수 호출에 대한 인자들중 하나로서 `T`에 `string`을 설정했으며 `()`가 아닌 `<>`로 둘러싸서 나타냈습니다.  

두번째 방법은 아마 가장 일반적인 방법입니다. 
여기선 **type arguments inference**를 사용합니다.  
이 방법은 컴파일러가 전달한 인자의 타입에 기반해서 자동으로 `T`의 값을 설정합니다.
```ts
let output = identity("myString") // type of output will be 'string'
```

명시적으로  꺽쇠안에 유형을 전달할 필요가 없습니다.  
컴파일러는 `"myString"`의 값을보고  `T`의 타입을 셋팅합니다. **type arguments inference**가  코드를 짧게 해줄수 있고 더 읽기 쉽지만 더 복잡한 예제에서는 컴파일러가 타입을 추론하지 못하면 명시적으로 전달해야할 수도 있습니다.  


## Working with Generic Type Variables
제네릭 사용을 시작할때, `identity`같은 제네릭 함수를 만들때 , 컴파일러는 함수 내부에 제네릭으로 타입이 지정된 매개변수를 올바르게 사용하도록 합니다.
```ts
function identity<T>(arg: T): T {
    return arg;
}
```
매 호출마다 `arg`인자의 길이를 로그하고싶으면 어떻게 해야할까요? 이렇게 하고싶을 겁니다.
```ts
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);  // Error: T doesn't have .length
    return arg;
}
```
컴파일러는 `arg`의 멤버로 `.length`를 사용했지만 `arg`가 이 멤버를 가지고 있다고 말한 곳이 없다는 에러를 반환할 겁니다.   
이런 타입 변수가 어떤 타입이든 될 수 있다고 했는데 이 함수를 사용하는 사람이 숫자타입을 대신 전달 했을 수도 있습니다. 

이 함수가 `T`가 아닌 `T`배열에서 동작하게 가정해보겠습니다.  
배열이 동작해야함으로, `.length`멤버를 사용할수 있을 겁니다. 
다른 유형의 배열을 생성하는 것처럼 설명할 수 있습니다.

```ts
function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}
```
제네릭 함수 `loggingIdentity`는 파라미터 T와 T배열 인자 arg 전달 받으면서 T배열을 반환합니다.  
숫자배열을 넘기면 `T`에 숫자가 바인딩되기 때문에 숫자 배열을 받을 것입니다.  제네릭 타입 변수 `T`를 전체 타입이 아닌 현재 작업중인 타입으로 사용할 수 있음으로 유연성이 향상됩니다.  

이런 방법으로 예제를 쓸수 있습니다.
```ts
function loggingIndentity<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);    // Array has a .length so no more error
    return arg;
}
```
다른 언어에 의해 이미 이런 스타일에 더 친숙할 수 있습니다. 다음 섹션에서 `Array<T>`같은 제네릭타입을 만드는 방법을 다뤄보겠습니다.


## Generic Types
이전 섹션에서 다양한 변수에서 동작하는 제네릭 identity함수를 만들었습니다.  
이번 섹션에서 함수의 타입과 제네릭 인터페이스를 만드는 방법을 알아보겠습니다.  

제네릭함수의 타입은 제네릭 타입이 아닌것들과 동일합니다. 파라미터 리스트를 먼저 나열합니다
```ts
function identity<T>(arg: T): T{
    return arg;
}
let myIdentity: <T>(arg: T) => T = identity;
```

타입변수의 수와 타입변수를 사용하는 방식이 일치하는한 제네릭 타입 파라미터의 이름으로 다른 이름을 사용할 수 있습니다.  
```ts
function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: <U>(arg: U) => U = identity;
```  

제네릭타입을 객체리터럴의 호출 형식처럼 작성할 수 있습니다.
```ts
function identity<T>(arg: T): T {
    return arg;
}
let myIdentity: {<T>(arg: T):T} = identity;
```  

첫번째 제네릭 인터페이스를 작성하게 됩니다. 
이전 예제에서 객체 리터럴을 가져와 인터페이스에 이동해 봅시다.
```ts
interface GenericIdentityFn {
    <T>(arg0]: T): T;
}

function indentity<T>(arg: T):T {
    return arg;
}

let myIdentity: GenericIdentityFn = identity;
```
비슷한 예제로 전체 인터페이스의 파라미터가 되기 위해서 제네릭 파라미터를 옮기고 싶을 수 있습니다.   
이렇게 하면 제네릭하고싶은 타입을 알아볼 수 있습니다. 모든 인터페이스의 다른 멤버가 타입 파라미터를 볼 수 있습니다.

```ts
interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identity<T>(arg: T): T{
    return arg;
}

let myIdentity: GenericIdentityFn<number> = indentity;
```

예제를 약간 바꿔보겠습니다.   
제네릭 함수 대신 비 제네릭 함수 형식으로 설명하겠습니다. 
`GenericIdentityFn`를 사용할때 이제 해당 타입 인수도 지정해야하며 호출 형식을 효과적으로 고정시킬 것입니다. 
타입 파라미터를 호출 특징에 직접 배치해야 하는 시기와 인터페이스 자체에 배치해야하는 시기를 이해하는 것은 타입의 제네릭 측명을 설명하는데 도움이 될것입니다.  


## Generic Classes
제네릭 클래스는 제네릭 인터페이스와 비슷합니다. 제네릭 클래스는 클래스 이름 다음에 꺽쇠(`<>`)안에 제네릭 파라미터 목록을 가집니다.
```ts
class GenricNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T
}

let myGenricNumber = new GenericNumber<number>();
myGenricNumber.zeroValue = 0;
myGenricNumber.add = function(x,y) { 
    return x + y;
}
```
이 예제에서는 문자 그대로 `GenericNumber`클래스를 사용했지만 `number` 타입만 사용하도록 강제하진 않았다는걸 알 수 있습니다.  
`string`타입이나 더 복잡한 객체를 사용해도 됐을겁니다.

```ts
let stringNumberic = new GenericNumber<string>();
stringNumberic.zeroValue = "";
stringNumberic.add = function(x,y) {
    return x + y;
}
console.log(stringNumberic.add(stringNumberic.zeroValuem "test"));
```
단지 인터페이스로서 타입 파라미터를 클래스에 넣음으로서 이 클래스의 모든 속성이 같은 타입으로 동작하도록 할 수 있습니다.  
클래스 섹션에서 다뤘던 것첨  클래스는 타입에 대해 두가지 면이 있습니다. 정적인 면과 인스턴스면이요.  
제니릭 클래스는 static 측면이 아닌 인스턴스 측면입니다.  
그래서 클래스와 함께 동작할때 static 멤버를 클래스의 타입 파라미터로 사용할 수 없습니다.


### Generic Constraints
타입들이 어떤 기능이 있는지 알고있는 타입에서 작동하는 제네릭함수를 작성하려는 경우가 있습니다.  
`loggingIdentity`예제에서 `arg`를 `.length`속성으로 접근하고 싶었지만 컴파일러가 컴파일러는 모든 타입이 `.length`속성을 가진다는걸 알 수 없었습니다. 그래서 경고를 줬었죠.  

```ts
function loggingIdentity<T>(arg: T): T{
    console.log(arg.length);    // Error: T dosen't have .length
    return arg;
}
```
모든 타입에 동작하는것 대신에 `.length`속성을 가지는 모든 타입에서 동작하게 하기 위해서 함수를 제한하고 싶습니다.  
타입이 이 멤버를 가지고 있을때만 허용해야 합니다.  
그러기 위해서 `T`가 될 수 있는 타입이라는 제약조건에 대한 요구조건 리스트가 필요합니다.  

그러기 위해 제약조건을 설명하는 인스턴스를 만들어야 합니다.  
제약조건을 설명하기 위해 `.length`속성 하나를 가지는 인터턴스를 만든 다음에 이 인스터스와 `extend`키워드를 사용해야합니다.
```ts
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T) : T {
    console.log(arg.length); // NOw we know it has a .length property, so no more error
    return arg;
}
```
이제 제네릭 함수에 제약이 걸렸기 때문에 더이상 모든 타입이 동작하지 않습니다.
```ts
loggingIdentity(3) // Error, number does't have a .length property
```
대신 필요한 속성을 모두 포함하는 값은 전달해야합니다.
```ts
loggingIdentity({length:10, value:3})
```

### Using Type Parameters in Generic Constraints
다른 타입 파라미터에 의해 제약이 걸린 타입 파라미터를 선언할 수 있습니다.  
예를 들어 객체에서 그 이름을 가진속성을 얻고 싶습니다.  obj에 없는 속성을 접근하지 못하게 하려고 합니다. 
그래서 두 타입 사이에 제약조건을 넣을 것입니다.

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K){
    return obj[key];
}

let x = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
};

getProperty(x, "a"); // okay
getProperty(x, "m"); // error: Argument of type 'm' isn't assginable to 'a' | 'b' | 'c' | 'd'
```

## Usding Class Types in Generic
제네릭을 이용해서 타입스크립트에서 팩토리를 만들때 생성자 함수를 사용하여 클래스타입을 참조해야 합니다.  
```ts
function create<T>(c: {new(): T;}): T{
    return new();
}
```

더 응용된 예제는 프로토타입 프로퍼티를사용하여 생성자 함수와 클래스 타입의 인스턴스 측면 사이를 추론하고 제한 합니다
```ts
class BeeKeeper {
    hasMask: boolean;
}

class ZooKeeper {
    nametag: string;
}

class Animal {
    numLegs: number;
}

class Bee extends Animal {
    keeper: BeeKeeper;
}

class Lion extends Animal {
    keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
}

createInstance(Lion).keeper.nametag;  // typechecks!
createInstance(Bee).keeper.hasMask;   // typechecks!


```

## ref
- [typescript handbook, generic](https://www.typescriptlang.org/docs/handbook/generics.html)
- [typescript handbook-KR]https://typescript-kr.github.io/pages/Generics.html