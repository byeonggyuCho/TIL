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

