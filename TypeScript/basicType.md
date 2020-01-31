# Basic Types

## Boolean
```ts
let isDone: boolean = false;
```


## Number
typescript에서는 ES6에서 지원하는 2진수 및 8진수 문자도 지원한다.
```ts
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

## String
```ts
let color: string = "blue";
color = 'red';
```

**template strings**도 지원한다. backtick(\`)으로 문자열을 둘러싸고 변수를 참조할 때는 `${}`표현식에 넣으며 된다.
```ts
let fullName: string = `Cater Cho`;
let age: number = 30;
let sentence: string = `Hello, my name is ${ fullName }

I'll be ${age + 1} years old next month`;
```


## Array
typescript에서는 두가지 방식을 이용해 배열에 오는 인덱스의 자료형을 지정할 수 있다.  
```ts
let list: number[] = [1,2,3];
let list: Array<number> = [1,2,3];
```

## Tuple
Tuple은 배열에 서로 다른 복수의 자료형을 지정하는 방법이다. 이때 선언 순서에 맞추어 자료형을 검증하는 걸 주의해야한다.
```ts
let x: [string, number];

x = ['hello', 10];
x = [10, 'hello'];       // Error
```

```ts
console.log(x[0].substring(1)); // OK
console.log(x[1].substring(1)); // Error, 'number' does not have 'substring'
```

지정한 인덱스 크기를 벗어나면 오류가 발생한다.
```ts
x[3] = "world";                 // Error, Property '3' does not exist on type '[string, number]'.
console.log(x[5].toString());   // Error, Property '5' does not exist on type '[string, number]'.
```


## Enum
유용한 열거형 데이터 타입이 추가되었다. 변수에 할당되는 number type의 데이터를 제한할 수 있고 기본값을 지정할 수도 있다.  
첫번째 값을 기준으로 다음값이 1씩 더해진다.
```ts
enum Color {Red, Green, Blue};
let c: Color = Color.Green;
```

첫번째 값을 기준으로 1씩 더해진다.
```ts
enum Color {Red = 1, Green, Blue };
let c: Color = Color.Green;     // 2;
```

기본값으로 0이 셋팅되지만 변경할 수 있다.
```ts
enum Color {Red = 1, Green = 2, Blue = 4};
let c: Color = Color.Green;
```

값을 입력하면 속성명을 반환받을 수 있다.
```ts
enum Color {Red = 1, Geen, Blue};
let colorName: string = Color[2];   // Green;
```


## Any
Any는 동적으로 자료형이 바뀌거나 3rd party Lib를 사용할 때 처럼 자료형을 알 수 없는 경우에 사용한다.  
이 타입은 유형 검사를 피하고 컴파일 검사를 통과하는 목적으로 사용한다.
```ts
let notSure: any = 4;
notSure = 'maybe a string instead';
notSure = false;
```

`Object` 타입도 `any`비슷하게 동작할꺼라 생각할 수 있지만, Object 유형의 변수만 할당 할 수 있다.
```ts
let notSure: any = 4;
notSure.ifItExists();
notSure.toFixed();

let prettySure: Object = 4;
prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object';
```


```ts
let list: any[] = [1, true, 'free'];
list[1] = 100;
```


## Void
`void`는 'any'와 약간 다르다. 어떤 타입도 전혀 같지 않는다. 일반적으로 반환값이 없는 함수에 사용된다.

```ts
function warnUser(): void {
    console.log("This is my waring message");
}
```

## Null and Undefined
`null`과 `undefined`도 개별적인 Typescript 유형이 존재하긴 하지만 `void`처럼 그닥 유용하진 않다.
```ts
let u: undefined = undefined;
let n: null = null;
```

기본적으로 `null`과 `undefined`는 다른 모든 유형의 하위 유형이기 때문에 할당할 수 없다. 하지만 `--stritcNullChecks` 플래그를 사용할때 `null`과 `undefined`는 `any`와 해당 유형에만 할당할 수 있다. (단 예외가 있는데 `undefined`는 `void`에 할당할 수 있다.) 이런 도움들은 많은 에러를 피할 수 있다. 공식 문서에서는 가능한 `--strictNullCheck`를 사용하는것을 권장한다.

## Never
`never`타입은 절대 발생하지 않을 유형을 나타낸다.  `never`은 항상 예외를 발생시키거나 반환값이 없는 함수 표현식이나 화살표 함수에 대한 반환값이다.  
`never` 타입은 모든 타입의 하위 유형이며 할당될수 있는 유형이며 이 타입의 하위 유형이나 할당 가능한 유형은 없다. 심지어 `any`유형도 `never`에 할당할 수 없다.

```ts
// Function returning never must have unreachable end point
function error(message: string): never {
    throw new Error(message);
}


// Inferred rturn type is never
function fail() {
    return error("Somthing failed");
}

// Function returning never must have unreachable end point
function infiniteLoop(): never {
    while (true) {

    }
}
```


## Object
`object`는 원시타입이 아닌 타입을 나타낸다. ( number, string, boolean, biginit, symbol, null, undefined가 아닌 유형)  
`object` 유형을 사용하면 `Object.create`유형을 잘 표현할 수 있다.
```ts
declare function create(o: object | null): void;

create({ prop: 0 });
create(null);   // OK

create(42); // Error
create('string'); // Error
create(false); // Error
create(undefined); // Error
```


## Type assertions
`Type assertion`은 변수 선언 시점엔 하위 타입이고 변수 호출 시점에 하위 보다 상위타입을 지정해서 사용해야할 때 해당 유형을 구체화하는 용도로 사용한다.



`angle-bracket`문법
```ts
let someValue: any = 'this is a string';
let strLength: number = (<String>someValue).length;
```

`as`문법
```ts
let someValue: any = 'this is a string';
let strLength: number = (someValue as string).length
```

두 표현 모두 동일한 기능을 하지만 JSX에서는 `as`표현만 사용 가능하다.