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
