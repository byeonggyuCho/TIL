# Functions

## Intro
함수는 자바스크립트의 핵심적인 빌딩 블록입니다. 추상화 계층을구성하고 클래스 정보 숨기기 및모듈을 흉내내는 방법입니다.  
타입스크립트에서 클래스 네임스페이스 모듈 및 모듈이있지만 함수는 동작방식을 설명하는데 중요한 역할을 한다. 타입 스크립트에는 자바스크립트에 몇가지 새로운 기능을 추가하여 더 작업이 쉬워졌습니다.


## Funtctions
자바스크립트 처럼 타입스크립 함수는 익명함수와 무명함수를 만들 수 있습니다. 애플레케이션에 따라서 더 적절한 방법을 사용하시면 됩니다. 함수 API에서 리스트를작성하든 다른 함수로 전달하기 위해 구축하기 위해 일회성 함수를 만들든 상관없이 사용할 수 있습니다.  

```ts
function add(x,y){
    return x+y;
}

let myAdd = function(x,y) { return x+y};
```
자바스크립트 처럼 함수는 함수 본문 밖에 있는 변수를 참조할 수 있습니다. 이렇게 하면 이 변수들을 포착한다고 합니다.

```ts
let z = 100;

function addToZ(x, y) {
    return x + y +z;
}
```

## Function Types
### Typing the function
이전 예제에 자료형을 추가해 봅시다.
```ts
function add(x: number ,y: number): number {
    return x+y;
}

let myAdd = function(x: number, y:number ): number { 
    return x+y
};
```
각 매개변수에 타입을 추가할수 있고 함수 자체에 반환 타입을 추가할 수 있습니다. 타입스크립트는 반환문을 보고 이 유형을 파악할 수 있음으로 선택적으로 반환 유형을 해제할 수 있습니다.

### Writing the function type각 합수의 
함수의 각 부분을 보고 함수의 풀타입을 작성해보겠습니다.  
```ts
let myAdd: (x: number, y:number) => number = function(x:number, y:number): number {
    return x + y;
};
```
함수의 타입은 두 부분으로 구성됩니다. 인자의 타입과 반환 타입입니다. 전체의 함수 타입을 작성할때 두 타입은 필수입니다. 각 파라미터의 이름과 유형을 지정하여 매개변수 리스트 처럼 매개변수의 타입을 작성합니다. 이름은 읽기 좋아야하기 때문에 구체적인 이름으로 변경했습니다
```ts
let myAdd: (baseValue: number, increment: number) => number =
function(x:number, y: number): number {
    return x + y;
}
```
매개변수의 이름과 상관없이 매개변수 타입이 정해지면 함수에 유효한 타입으로 간주됩니다.  

두번째로 반환타입을 봅시다.  파라미터와 반환타입 사이에 화살표를 사용하여 반환타입을 명확하게 했습니다. 
이전에 언급한것 처럼 이건 함수 타입의 필수적인 부분입니다. 만약에 함수가 반환값이 없으면 `void`를 사용할 수 있습니다.  

물론 파라미터와 반환타입만 함수 타입을 구성합니다. 캡쳐된 변수는 타입에 반영되지 않습니다. 실제로 캡쳐된 변수는 모든 함수의 수겨진 상테에 속하며 API를 구성하지 않습니다.


### Inferring the types
등식의 한쪽에만 유형에 있는 경우에도 타입스크립트 컴파일러를 통해 유형을 확인할 수 있습니다.  
```ts
// myAdd has the full function type
let myAdd = function(x: number, y: number): number { return  x + y; };

// The parameters 'x' and 'y' have the type number
let myAdd: (baseValue: number, increment: number) => number =
    function(x, y) { return x + y; };
```

이걸 "contextual typing"이라고 하며 형식추론의 한 형태입니다. 이렇게 하면 타이핑하는 노력을 줄일 수 있습니다.

## Optional and Default Parameters
타입스크립트에서 모든 파라미터들은 함수에 의해 요구되는것으로 가정됩니다. 이건 `null`이나 `undefined`를 넘길수 없다는 말이 아닙니다. 대신 함수가 호출되면 컴파일러는 사용자가 각파라미터에 대한 값을 제공했는지 확인합니다. 컴파일러는 파라미터들이 함수를 통과할 것인지 추론합니다. 간단히 말해서 인자의 숫자가 맞는지 확인합니다.  

```ts
function buildName(firstName: string, lastName: string) {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // error, too few parameters
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");         // ah, just right
```
자바스크립트에서 모든 파라미터는 선택적이고 사용자는 파라미터를 넘기지 않을 수 있습니다. 파라미터를 넘기지 않으면 인자는 `undefined`가 됩니다. 파라미터의 끝에 `?`를 넣어서 선택적인 파라미터를 명세할 수 있습니다.
```ts
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}

let result1 = buildName("Bob");                  // works correctly now
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
```

초기화 파라미터를 사용하는 경우에는 매개변수 타입을 입력하지 않아도 됩니다. 초기화 값의 타입이 곧 매개변수의 타입이 되기 때문이죠.
```ts
function buildName(firstName: string, lastName?: string) {
    // ...
}
```

```ts
function buildName(firstName: string, lastName = "Smith") {
    // ...
}
```
위 두 코드는 모든 파라미터가 같은 타입(string)을 공유합니다. `lastName`의 기본값은 형식이 매개 변수가 선택 사항이라는 사실만 남습니다.  

옵션 파라미터와 달리 초기화 파라미터는 필수 매개 변수 이후에 발생할 필요가 없습니다. 만약 초기화 파라미터가 필수 파라미터 뒤에 온다면 사용자는 초기화 값을 가져오기 위해서 정의되지 않은 상태(undefined)로 명시적으로 전달해야합니다.

```ts
function buildName(firstName = "Will", lastName: string) {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // error, too few parameters
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");         // okay and returns "Bob Adams"
let result4 = buildName(undefined, "Adams");     // okay and returns "Will Adams"
```


## Rest Parameters
필수, 선택적 기본 파라미터 모두 한가지 공통점이 있습니다. 한번에 하나의 파라미터를 다룬다는 거죠. 떄로 그룹처럼 다양한 파라미터가 작동하기 원하거나 파라미터 수를 모를때 사용할 수 있습니다. 자바스크립트에서 모든 함수 본문에 표시되는 `arguments` 변수를 이용하여 매개변수를 직접적으로 사용할 수 있습니다.  

타입 스크립트에서는 하나의 변수에 변수를 모을 수 있습니다.
```ts
function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}

// employeeName will be "Joseph Samuel Lucas MacKinzie"
let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```
`Rest Parameter`는 무한한 선택적 파라미터를 다룹니다. 파라미털르 전달할때 원하는 만큼 전달할 수 있고 하나도 전달 안해도 됩니다.  
컴파일러는 줄임표(...)뒤에 지정된 이름으로 전달된 인수 배열을 작성하여 사용자가 함수에 사용할 수 있도록합니다.  

줄임표는 rest Parameter와 함께 함수 타입에서 사용됩니다. 
```ts
function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}

let buildNameFun: (fname: string, ...rest: string[]) => string = buildName;
```


## this
타입스크립트는 자바스크립트를 지원하기 때문에 타입스크립트 개발자도 `this`의 사용법과 제대로 사용되지 않을때 찾는 방법을 배워야합니다.  
타입스크립트를 사용하면 몇가지 테크닉을 사용하여 개발자가 `this`를 잘못 사용하는것을 확인할 수 있습니다. 만약  `this`의 자바스크립트에서 작동방식을 배우고 싶으면 이 링크를 읽어보세요  [Understanding javascript Function Invocation and "this"](http://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/)  


### `this` and arrow function
자바스크립트에서 `this`는 함수를 호출할때 셋팅되는 변수입니다. 강력하고 유연한 기능을 제공하지만 함수의 실행 문맥에 대한 학습비용이 동반됩니다. 특히 함수를 반환하거나 함수를 인자로 전달했을 때 혼란스럽습니다.

```ts
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        return function() {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```

`createCardPicker`는 함수를 반환하는 함수입니다. 이 예제를 실행하면 `alert`대신 에러가 발생할겁니다. 
 이건 `this`에 `deck`대신 `window`가 셋팅되기 때문입니다. `cardPicker()`를 호출했기 때문이죠. 지금처럼 메서드가 아닌 최상위 문법에서는 `this`에 `window`를 할당합니다.  

 사용할 함수를 반환하거 전에 올바른 `this`가 바인딩되었는지 확인함으로써 해결할 수 있습니다. 이 방법을 사용하면 `deck`객체를 참조할 수 있습니다. 
 작업을 위해서 함수표현식을 ES6의 화살표 문법으로 바꿔야합니다. 화살표 함수는 함수가 실행되는 곳이 아닌 생성된 곳의 `this`를 캡쳐합니다.  

```ts
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```
타입스크립트는 `--noImplicitThis`플래그를 컴파일러에 전달하면 이런 오류를 경고합니다. `this.suits[pickedSuti]`의 `this`는 `any`타입을 가리킬 것입니다. 

### `this` parameters
불행히도 `this.suits[pickedSuit]`타입은 여전히 `any`이빈다. 이건 `this`가 객체 리터럴 안에 있는 함수 표현식에서 오기 때문인데요. 이걸 수정하기 위해서 명환한 `this` 파라미터를 전달해야합니다. `this`파라미터는 함수의 파라미터 리스트에서 첫번째로 오는 가짜 파라미터입니다.  
```ts
function f(this: void) {
    // make usre 'this' is unusable in this standalone function
}
```
타입을 명확하게하고 재사용을 쉽게 하기 위해서 위 예제에서 인터페이스 `Card`와 `Deck` 인터페이스를 추가해보자.

```ts
interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    card: Array(52),
    // NOTE: The function now dxplicitly specifies that its callee must be of type Deck

    createCardPicker: function(this: Deck) {
        return() => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuti = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: picked % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pcikedCard.card + " of " + pickedCard.suit);
```
이제 타입스트립트는 `createCardPicker`가 `Deck`객체에서 호출될 것이란걸 알고있습니다.  이건 `this`가 `any`가 아니라 `Deck` 타입이라는 말인데요. 따라서 `--noImplicitThis`가 에러가 발생하지 않습니다.



### `this`parameters in callbacks

나중에 호출된 라이브러리에 함수를 전달할때 콜백에서 `this`를 사용하면 에러가 날 수 있습니다. 콜백을 호출하는 라이브러리가 보통 함수처럼 실행하기 때문에 `this`가 `undefined`가 됩니다. 앞서 났던 에러들 처럼요. 먼저 라이브러리 저자는 콜백의 타입을 `this`와 함께 주석으로 달아놔야합니다.
```ts
interface UIElement {
    addClickListener(onclick: (this: void, e: Event) => void ): void;
}
```
`this: void`는 `addClickListener`가 `onclick`이 `this`가 필요없는 함수일 것으로 예상하는걸 말합니다.  
두번째로 `this`와 함께 호출하는 함수를 주석 달아 놓으세요

```ts
class Handler {
    info: stirng;
    onClickBad(this: Handler, e: Event) {
        // oops, used `this` here. using this callback would crash at runtime
        this.info = e.message;
    }
}
let h = new Handler();
uniElement.addClickListener(h.onClickBad); // eror
```
`this`를 주석 닮으로서  `onClickBad`가 반드시 `Handler`의 인스턴스를 호출해야 한다는걸 명확하게 할 수 있다. 
그 다음 타입스크립트는 `addClickListener`가 `this: void`를 가진 함수가 필요하다는것을 발견할 것입니다. 이 에러를 수정하기 위해서 `this`의 타입을 바꿉니다.

```ts
class Handler {
    info: string;
    onClickGood(this: void, e: Event) {
        // can't use `this` here because it's of type void!
        console.log('clicked!');
    }
}
let h = new Handler();
uiElement.addClickListener(h.onClickGood);
```
`onClickGood`가 `this`의 타입을 `void`로 명세했기 때문에 `addClickListener`에 전달할 수 있게 되었습니다. 물론 이건 `this.info`를 사용하지 않는다는 말입니다. 만약 둘다 필요한 경우라면 화살표 할수를 써야할 것입니다.

```ts
class Hnadler {
    info: string;
    onClickGood = (e: Event) => { this.info = e.message }
}
```
이건 화살표 함수가 외부의 `this`를 사용하기 때문에 `this:void`로 예상되는걸 항상 전달할 수 있다는 뜻입니다. 단점은 핸들러 타입의 개체당 하나의 화살표 함수가 생성된다는 것입니다. 한 편 메서드는 한번만 생성되고 핸들러의 포로토타입에 부탁됩니다. 이런 객체는 핸들러 유형의 모든 객첵간에 공유됩니다.


## Overloads
자바스크립트는 본질적으로 동적인 언어입니다. 자바스크립트 함수가 전달된 인수의 모양을 기준으로 다른 유형의 객체를 반한하는 것은 드문 경우가 아닙니다.


```ts
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, thiy gave tue deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }

    // Oterwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { 
            suit: sutis[pickedSuit],
            card: x % 13
        };
    }
}

let myDeck = [
    {suit: "diamonds", card: 2},
    {suit: "spades", card: 10},
    {suit: "hearts", card: 4},
];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
```
`pickCard`함수는 사용자가 전달한 것에 따라서 두개의 결과를 반환한다. 사용자가 덱에 표현된 객체를 전달하면 함수는 카드를 고를 것입니다. 
사용자가 카드를 고르면 사용자가 고른 카드를 말해줄 것입니다. 그러나 이걸 어떻게 타입 시스템에서 표현할 수 있을까요?

오버로드 목록같은 여러가지 함수 유형들을 제공하면 해당 함수에 제공하면 됩니다. 이 리스트는 컴파일러가 함수호출을 해결할때 사용할 것입니다. `pickCard`가 수용하는것과 반환하는 것을 설명하는 오버로드 목록을 만들어 보겠습니다.  

```ts
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: {suit: stirng; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number;}
function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
```
이렇게 하면 오버로드로 인해 `pickCard`에 검증된 타입이 입력됩니다.  
컴파일러가 오랍른 타입 검증을 고르기 위해서 기본 자바스크립트와 유사한 절차를 따릅니다. 오버로드 리스트를 살펴보고 첫번째 오버로드를 전달하면서 제공된 파라미터와 함께 함수 호출을 시도합니다. 이게 맞으면 이 오버로드를 올바른 오버로드로 고릅니다. 이런 이유때문에 오버로드는 가장 구체적인 것부터 덜 구체적인것으로 나열하는것이 관례입니다.  

`function pickCard(x):any`는 오버로드 리스트의 구성요소가 아닙니다. 그래서 오직 두가지 오버로드를 가지고 있습니다. 하나는 객체를 가져가는 것이고 하나는 숫자를 가져가는 것인데요. `pickCard`를 다른 파라미터와 함께호출하는 것은 에러를 발생시킵니다.