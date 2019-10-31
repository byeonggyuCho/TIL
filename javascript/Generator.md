# Generator

Iterator를 반환하는 함수입니다. 함수는  Generator객체를 반환하며 이 객체는 Iteration protocol을 준수합니다. Generator함수는 function 키워드 다음에 별표(*)가 추가되고 새로운 yield 키워드를 사용합니다. 별표가 function바로 앞에 있는지 또는 * 와 function 사이에 공백이 있는지는 중요하지 않습니다. 아래 예제를 보겠습니다.

Generator문법은 ES5에서 아래처럼 만들던 Iterator를 쉽게 만들 수 있는 도구입니다.

    function createIterator(items) {
        var i = 0;
        return {
            next: function() {
                var done = (i >= items.length);
                var value = !done ? items[i++] : undefined;
                return {
                    done: done,
                    value: value
                };
            }
        };
    }
    var iterator = createIterator([1, 2, 3]);
    console.log(iterator.next());         // "{ value: 1, done: false }"
    console.log(iterator.next());         // "{ value: 2, done: false }"
    console.log(iterator.next());         // "{ value: 3, done: false }"
    console.log(iterator.next());         // "{ value: undefined, done: true }"
    // for all further calls
    console.log(iterator.next());         // "{ value: undefined, done: true }"

## 0. 루프의 문제점

중첩 반복문을 작성할때 여러 변수를 추적하기 복잡하여 가독성이 떨어진다.

## 1. Grammer

    function* myGen() {
      yield 1;
      yield 2;
      yield 3;
      return 4;
    }
    
    const myItr = myGen();
    console.log(myItr.next());  // {value:1, done:false}
    console.log(myItr.next());  // {value:2, done:false}
    console.log(myItr.next());  // {value:3, done:false}
    console.log(myItr.next());  // {value:4, done:true}

함수명 앞에 있는 *은 함수를 Generator로 만든다. yield키워드는 next()가 호출될 때 결과 Iterator가 리턴 해야하는 값을 리턴될 순서대로 지정합니다. 이 예제에서 생성된  Iterator는 next()메서드를 연속적으로 호출할 때 세가지 다른 값을 리턴합니다. Generator는 interator를 생성할 때 본것처럼 다른 샇ㅁ수와 똑같이 호출할 수 있습니다.

Generator의 흥미로운 부분은 yield문 다음에 실행을 멈추는 것입니다. next()가 호출되면 실행되어 yield에서 호출자에 값을 전달하며 실행을 멈춘다. 다시 next()가 호출되면 아까 멈춘 위치에서 실행을 시작하여 다음 yield까지 실행되고 또 멈춘다. yield 키워드는 모든 값이나 표현식과 함께 사용할  수 있으므로 항목을 하나씩 나열하지 않고  Iterator에 항목을 추가하는 Generaotr함수를 작성할 수 있다. 예를 들면 for루프에 사용할 수 있다,.

    function *createIterator(items) {
        for (let i = 0; i < items.length; i++) {
            yield items[i];
        }
    }
    let iterator = createIterator([1, 2, 3]);
    console.log(iterator.next());           // "{ value: 1, done: false }"
    console.log(iterator.next());           // "{ value: 2, done: false }"
    console.log(iterator.next());           // "{ value: 3, done: false }"
    console.log(iterator.next());           // "{ value: undefined, done: true }"

단 yield문은 Generator 내부에서만 사용할 수 있다. 다시말해 중첩함수의 내부에는 사용할 수 없다.

    function *createIterator(items) {
        items.forEach(function(item) {
            // syntax error
            yield item + 1;
        });
    }

Arrow함수를 이용해 Generator를 만들수 없다.

## 2. Method

1. Generator.prototype.next()
    - yield 표현을 통해 yield값을 반환합니다.
2. Generator.prototype.return()
    - 주어진 값을 반환하고 generator를 종료합니다.
3. Generator.prototype.throw()
    - 생성기로 에러를 throw합니다.

## Iterables과 for~of

Iterator와 밀접하게 관련된 Iterable은 Symbol.iterator 프로퍼티를 가진 객체입니다. 잘 알려진 Symbol.iterator  Sybol은 주어진 객체에 대한 Iterator를 반환하는 함수를 지정합니다. Iterable은  ES6에서 추가된 for-of 루프를 사용할 수 있씁니다.

Generator가 기본적으로 Sybol.iterator프로퍼티를 할당하므로 Generator가 만든 모든 Iterator도  Iterable이다.

for-of 루프는 루프가 실행될 때마다 Iterable에서 next()를 호출하고 결과 객체의 value를 변수에 저장합니다. 루프는 반환된 객체의 done 프로퍼티 값이 true가 될 떄까지 이과정을 계속합니다. 

    let values = [1, 2, 3];
    for (let num of values) {
        console.log(num);
    }

이  for-of루프는 values를 Array에  Symbol.iterator ㅁ메서드를 먼저 호출하여 Iterator를 검색합니다. 

(Symbol.iterator에 대한 호출은 javascript 엔진 자체에서 발생합니다.)그러면 interator.next()가 ㅅ호출되고 Iterator의 결과 객체에 있는 value프로퍼티가 num으로 읽혀집니다. done이 true일 때 루프가 끝나기 때문에 num이 undefined가 되진 않습니다.

for-of문은  Non-iterable객체, null또는 undefined에서 사용될 때 에러를 전진다.

## Default  Iterator 액세스하기

Symbol.iterator를 사용하여 다음과 같이 객체 Default Iterator를 만들수 있습니다.

    let values = [1, 2, 3];
    let iterator = values[Symbol.iterator]();
    console.log(iterator.next());         // "{ value: 1, done: false }"
    console.log(iterator.next());         // "{ value: 2, done: false }"
    console.log(iterator.next());         // "{ value: 3, done: false }"
    console.log(iterator.next());         // "{ value: undefined, done: true }"

이 코드는 values에 대한 Default Iteraotr를 가져오고 이를 사용하여 Array의 각항목을 반복합니다. 이것은 for-of 루프를 사용할 때 배ㅅ후에서 일어나느 것과 같은 방식입니다.

Symbol.iterator는 Default Iterator를 지정하므로 이를 사용하여 객체가 다음과 같이 반복가능한지 여부를 확인할 수 있습니다.

    function isIterable(object) {
        return typeof object[Symbol.iterator] === "function";
    }
    console.log(isIterable([1, 2, 3]));     // true
    console.log(isIterable("Hello"));       // true
    console.log(isIterable(new Map()));     // true
    console.log(isIterable(new Set()));     // true
    console.log(isIterable(new WeakMap())); // false
    console.log(isIterable(new WeakSet())); // false

isIterable()함수는 객체에 Default Iterator가 존재하는지를 확인하는 함수입니다.  for-of루프는 실행 전에 비슷한 검사를 수행합니다.

### Iterable만들기

개발자가 정의한 객체는 기본적으로 반복 가능하지 않지만 Generator가 포함된 Symbol.iterator 프로퍼티를 만들어 반복 가능하게 만들수 있습니다.
```js
    let collection = {
        items: [],
        *[Symbol.iterator]() {
            for (let item of this.items) {
                yield item;
            }
        }
    };
    collection.items.push(1);
    collection.items.push(2);
    collection.items.push(3);
    for (let x of collection) {
        console.log(x);
    }
```
collection이라는 객체를 Default Iterator로 정의합니다. Default Iterator는 Generator인  Symbol.iterator 메서드에 의해 생성됩니다. Generator는 for-of 루프를 사용하여 this.items의 값을 반복하고 yield를 사용하여 각각을 리턴합니다. collection 객체는 수동으로 반복하여 collenction의 Default Iterator에 대한 값을 정의하는 대신, this.items의 Default Iterator를 사용하여 작업을 수행합니다.




### 내장 Iterator

대부분의 빌트인 타입에 대해서는 언어 레벨에서 기본적으로 Iterator를 포함하고 있습니다. 따라서 기본 제공되는 Iterator가 목적에 부합하지 않을 때만 Iterator를 만들어야하며, 이는 자신만의 객체나 클래스를 정의할 때 발생합니다. 가장 일반적인 Iterator는 컬렉션에서 작동하는 Iterator이다.

## 컬렉션 Iteraotr
ES6에서는 Array, Map, Set 세가지 타입의 컬렉션 객체가 있습니다. 세가지 모두 내용을 탐색하는데 도움이 되는 기본 Iterator를 제공합니다.
- entries() : 값이 키-값 쌍인 Iterator를 반환합니다.
- values(): 값이 컬렉션의 value인 Iterator를 반환합니다.
- key() : 값이 컬렉션에 포함된 key인 Iteraotr를 반환합니다.

### entries() Iterator
`entries()` Iterator는 `next()`가 호출될 떄마다 두개의 아이템 Array를 반환합니다. 두개의 아이템 Array는 컬렉션의 각 항목에 대한 키와 값을 나타냅니다. Array의 경우 첫 번째 항목은 숫자 인덱스입니다. Set의 경우 첫 번째 항목은 값이기도 합니다. Map의 경우 첫 번째 항목은 키입니다.

```js
let colors = [ "red", "green", "blue" ];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();
data.set("title", "Understanding ECMAScript 6");
data.set("format", "ebook");

for (let entry of colors.entries()) {
    console.log(entry);
}

for (let entry of tracking.entries()) {
    console.log(entry);
}

for (let entry of data.entries()) {
    console.log(entry);
}
```
위 예제는 각 컬렉션 타입에 대해 `entries()` 메소드를 사용하여 Iterator를 검색하고 `for-of`루프를 사용하여 반복합니다. console출력은 각 객체에 대해 어떻게 키와 값이 쌍으로 리턴되는지 보여줍니다.


### values() Iterator
`values()` Iterator는 컬렉션에 지정된 값을 반환합니다.
```js
let colors = [ "red", "green", "blue" ];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();
data.set("title", "Understanding ECMAScript 6");
data.set("format", "ebook");
for (let value of colors.values()) {
    console.log(value);
}
for (let value of tracking.values()) {
    console.log(value);
}
for (let value of data.values()) {
    console.log(value);
}
```
위 예제에서 처럼 `values()`Iterator를 호출하면 컬렉션의 해당 데이터 위치에 대한 정보없이 각 컬렉션에 포함된 정확한 데이터가 반환됩니다.


### key() Iterator

`keys()`Iterator는 컬렉션에 있는 각 키를 반환합니다. Array의 경우 숫자 키만 반환하며 Array의 다른 프로퍼티는 반환하지 않습니다.  
Set의 경우 키는 값과 동일함으로 `keys()` 및 `values()`는 동일한 Iterator를 반환합니다. Map의 경우, `keys()` Iterator는 각 고유 키를 리컨합니다. 다음은 이 세가지를 모두 보여주는 예입니다.

```js
let colors = [ "red", "green", "blue" ];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();
data.set("title", "Understanding ECMAScript 6");
data.set("format", "ebook");
for (let key of colors.keys()) {
    console.log(key);
}
for (let key of tracking.keys()) {
    console.log(key);
}
for (let key of data.keys()) {
    console.log(key);
}
```
`keys()` Iterator는 `color`, `tracking` 및 `data`에서 각 키를 가져오며, 이 키들은 세개의 `for-of` 루프 내부에서 출력됩니다. Array의 경우 숫자색인만 출력되며 Array에 명명된 (name)프로퍼티를 추가한 경우에도 숫자 색인만 출력합니다. 이것은 `for-in`루프는 수자 인덱스가 아닌 프로퍼티를 반복하기 떄문에 `for-in`에서 Array를 사용하는 방식과 다릅니다.


<br><br>


## 컬렉션 타입에 대한 Default Iterator

각 컬렉션 타입에는 Iterator가 명시적으로 지정되지 않은 경우 `for-of`에 의해 사용되는 Default Iterator가 있습니다. `values()`메서드는 Array와 
Default Iterator이며, `entries()`메서드는 Map의 Default Iterator입니다. 이러한 기본값은 `for-of` 루프에서 컬렉션객체를 사용하는 것을 좀더 쉽게 만듭니다.

```js
let colors = [ "red", "green", "blue" ];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();
data.set("title", "Understanding ECMAScript 6");
data.set("format", "print");
// colors.values()를 사용하는 것과 같습니다.
for (let value of colors) {
    console.log(value);
}
// tracking.values()를 사용하는 것과 같습니다.
for (let num of tracking) {
    console.log(num);
}
// data.entries()를 사용하는 것과 같습니다.
for (let entry of data) {
    console.log(entry);
}

```
Iterator가 지정되지 않았기 때문에 Default Iterator가 사용됩니다. Array, Set 및 Map의 Default Iterator는 이러한 객체 초기화되는 방식을 반영하도록 설계되었음으로 아래 처럼 출력된다.

```js
"red"
"green"
"blue"
1234
5678
9012
["title", "Understanding ECMAScript 6"]
["format", "print"]
```
Array와 Set은 기본적으로 값을 반환하고, Map은 `map`생성장네 전달할 수 있는 것과 동일한 Array형태를 반환합니다. 반대로 Week Set과 Week Map에는 Built-in Iterator가 없습니다. 약한 참조를 관리한다는 것은 이러한 컬렉션에 정확히 얼마나 많은 값이 있는지 알 수있는 방법이 없다는 것을 의미합니다. 또한 이들을 반복할 방법이 없다는 것을 의미합니다.


## Destructing과 for-of루프
Map에 대한 Default Iterator의 동작은 다음 예와 같이 Destructoring이 있는 `for-of`루프에 사용될 떄도 유용합니다.

```js
let data = new Map();
data.set("title", "Understanding ECMAScript 6");
data.set("format", "ebook");
// data.entries()을 사용하는 것과 같습니다.
for (let [key, value] of data) {
    console.log(key + "=" + value);
}

```
이 코드의 `for-of`fnvmsms Destructured Array를 사용하여 Map의 각 항목에 대해 `key`와 `value`를 지정합니다. 이 방법으로 두 항목 Array에 접근하거나 Map에서 키 또는 값을 가져오지 않고도 키와 값을 사용하여 쉽게 작업할 수 있습니다. Map에 대해 Destructured Array를 사용하여 `for-of`루프가 Set과 Array의 경우와 마찬가지로 Map에 똑같이 유용할 수 있습니다.



## NodoList Iterator

Dom에는 문서의 요소 컬렉션을 나타내는 `NodeList`타입이 있습니다.JavaScript를 웹 브라우저에서 실행하는 사람들에게는 `NodeList`객체와 Array의 차이점을 이해하는 것이 어려웠습니다. `NodeList` 객체와 Array는 항목의 수를 나타내기 위해 length프로퍼티를 사용하며, 둘다 괄표 표기법을 사용하여 개별 항목에 접근합니다. 그러나 내부적으로 `NodeList`와 Array는 완전히 다르게 작동하므로 많은 혼란을 겪습니다.

ECMAScript6에 Default Iterator가 추가된 `NodeList`의 DOM정의에는 Array Default Iterator와 같은 방식으로 작동하는 Default Iterator가 포함되어 있습니다. 즉 `for-of`루프 또는 객체의 Default Iterator를 사용하는 다른 부분에서 아래오 같이 `NodeLIst`를 사용할 수 있습니다.

```js
var divs = document.getElementsByTagName("div");
for (let div of divs) {
    console.log(div.id);
}
```
이 코드는 `getElementszbyTagName()`을 호출하여 `document`객체의 모든 `<div>`요소를 나타내는 `NodeList`를 검색합니다. `for-of`루프는 각 요소를 반복하고 엘리먼트 ID를 출력하므로 표준 Array의 코드와 동일합니다.


## Spread 연산자와 None-Array Iterables

다음처럼 Spread연산자(...)를 사용하여 Set을 Array로 변환할 수 있습니다.
```js
let set = new Set([1,2,3,4,5,6,7]),
    array = [...set];

    console.log(array)
```
이 코드는 Array 리터럴의 Spead연산자를 사용하여 해당 Array을 set의 값으로 채웁니다. Spread연산자는 모든 Iterable에서 작동하고 default Iterator를 사용하여 포함할 값을 결정합니다. 모든 값은 Iterator에서 읽혀지고 Iteraotr에서 값이 리턴된 순서대로 Array에 삽입됩니다. 이 예제는 Set이 Iterable이기 떄문에 작동했습니다. 그리고 모든 Iterable에서 똑같이 작동합니다. 다른 예를 살펴보겠습니다.
```js
let map = new Map([ ["name", "Nicholas"], ["age", 25]]),
    array = [...map];
console.log(array);         // [ ["name", "Nicholas"], ["age", 25]]
```
여기에서 Spread연산자는 `map`을 Array의 Array로 변환합니다. Map에 대한 Default Iterator는 키-값 쌍으로 반환하기 때문에 Array는 `new Map()` 호출중에 전달된 Array처럼 보입니다.  
Array 리터럴에서 원하는 만큼 여러번 Spread연산자를 사용할 수 있으며 Iterable에서 여러 항목을 삽입하는 곳이면 어디에서나 사용할 수 있습니다. 이러한 항목은 Spread연산자의 위치에 있는 새로운 Array에 순서대로 나타납니다.

```js
let smallNumbers = [1, 2, 3],
    bigNumbers = [100, 101, 102],
    allNumbers = [0, ...smallNumbers, ...bigNumbers];
console.log(allNumbers.length);     // 7
console.log(allNumbers);    // [0, 1, 2, 3, 100, 101, 102]
```
Spread연산자는 어떤 Iteralbe에서도 사용할 수 있기 떄문에 Iteralbe을 Array로 변환하는 가장 쉬운 방법입니다. 문자열을 문자 Array 및 브라우저의`NodeList`객체를 Node Array로 변환할 수 있습니다.  

`for-of`연산자와 Spread 연산자를 포함하여 Iterator가 작동하는 기본 사항을 이해 했으므로 이제는 Iterator를 좀 더 복작하게 살펴볼 차례입니다.




## Iterator의 고급 기능
Iterator는 Generator를 이용하여 쉽게 만들고 기본 기능을 이용하여 Iterator를 쉽게 사용할 수 있습니다 그러나 Iterator는 단순히 값의 모음을 반복하는것 이외의 작업에 사용될 때 훨씬 강력합니다. 




### Iterator에 파라미터 넘기기.
Iterator의 `next()`메소드를 통해 값을 전달받거나 Generator의 `yield`를 사용하는 모습을 보여줬습니다. 그러나 `next()`메서드를 통해 Iterator에 파라미터를 전달할 수도 있ㅅ그빈다. 파라미터가 `next()`메서드에 전달되면, 그 파라미터는 Genrator내부의 `yield`문의 값이 됩니다. 이 기능은 비동기 프로그래과 같은 고급 기능에 중요합니다.

```js
function *createIterator() {
    let first = yield 1;
    let second = yield first + 2;       // 4 + 2
    yield second + 3;                   // 5 + 3
}
let iterator = createIterator();
console.log(iterator.next());           // "{ value: 1, done: false }"
console.log(iterator.next(4));          // "{ value: 6, done: false }"
console.log(iterator.next(5));          // "{ value: 8, done: false }"
console.log(iterator.next());           // "{ value: undefined, done: true }"
```


### Generator의 Return문

```js
function *createIterator() {
    yield 1;
    return;
    yield 2;
    yield 3;
}
let iterator = createIterator();
console.log(iterator.next());           // "{ value: 1, done: false }"
console.log(iterator.next());           // "{ value: undefined, done: true }"
```
Generator에서 `return`을 만나면 아래의 `yield`를 무시하고 리턴값이 `done: true`로 나오는것을 볼 수 있다.


```js

function *createIterator() {
    yield 1;
    return 42;
}
let iterator = createIterator();
console.log(iterator.next());           // "{ value: 1, done: false }"
console.log(iterator.next());           // "{ value: 42, done: true }"
console.log(iterator.next());           // "{ value: undefined, done: true }"
```
`return`에 값을 넘길 경우에 `value`프로퍼티로 확인이 가능하다.



### Generator 위임
경우에 따라 두개의 Iterator값을 하나로 결합하는 것이 유용할 수 있습니다. Generator는 별(*)문자로 `yield`라는 특수 형식을 사용하여 다른 Iterator에 위임할 수 있습니다. 

```js
function *createNumberIterator() {
    yield 1;
    yield 2;
}
function *createColorIterator() {
    yield "red";
    yield "green";
}
function *createCombinedIterator() {
    yield *createNumberIterator();
    yield *createColorIterator();
    yield true;
}
var iterator = createCombinedIterator();
console.log(iterator.next());           // "{ value: 1, done: false }"
console.log(iterator.next());           // "{ value: 2, done: false }"
console.log(iterator.next());           // "{ value: "red", done: false }"
console.log(iterator.next());           // "{ value: "green", done: false }"
console.log(iterator.next());           // "{ value: true, done: false }"
console.log(iterator.next());           // "{ value: undefined, done: true }"
```


```js
function *createNumberIterator() {
    yield 1;
    yield 2;
    return 3;
}
function *createRepeatingIterator(count) {
    for (let i=0; i < count; i++) {
        yield "repeat";
    }
}
function *createCombinedIterator() {
    let result = yield *createNumberIterator();
    yield *createRepeatingIterator(result);
}
var iterator = createCombinedIterator();
console.log(iterator.next());           // "{ value: 1, done: false }"
console.log(iterator.next());           // "{ value: 2, done: false }"
console.log(iterator.next());           // "{ value: "repeat", done: false }"
console.log(iterator.next());           // "{ value: "repeat", done: false }"
console.log(iterator.next());           // "{ value: "repeat", done: false }"
console.log(iterator.next());           // "{ value: undefined, done: true }"

```


```js
function *createNumberIterator() {
    yield 1;
    yield 2;
    return 3;
}
function *createRepeatingIterator(count) {
    for (let i=0; i < count; i++) {
        yield "repeat";
    }
}
function *createCombinedIterator() {
    let result = yield *createNumberIterator();
    yield result;
    yield *createRepeatingIterator(result);
}
var iterator = createCombinedIterator();
console.log(iterator.next());           // "{ value: 1, done: false }"
console.log(iterator.next());           // "{ value: 2, done: false }"
console.log(iterator.next());           // "{ value: 3, done: false }"
console.log(iterator.next());           // "{ value: "repeat", done: false }"
console.log(iterator.next());           // "{ value: "repeat", done: false }"
console.log(iterator.next());           // "{ value: "repeat", done: false }"
console.log(iterator.next());           // "{ value: undefined, done: true }"
```


## 비동기작업 실행

### 간단한 작업
`yield`는 실행을 멈추고 다시 시작하기 전에 `next()`메서드가 호출되기를 기다리기 떄문에 콜백을 관리하지 ㅇ낳고 비동기 호출을 구현할 수 있습니다. 시작하려면 Generator를 호출하고 다음과 같이 Iterator를 시작할 수 있는 함수가 필요합니다.


```js
/**
 * @param {object} taskDef : generator함수.
 */
function run (taskDef){

    //iterator를 만들고 다른곳에서 사용할 수 있게 합니다.
    let task = taskDef();

    //타스크 시작
    let result = task.next();

    // next() 호출을 계속하는 재귀함수
    function step() {

        (!result.done) {
            result = task.next();
            step();
        }
    }
    // proces를 시작.
    step();
}

```
`run()`함수는 타스크 정의(Generator함수)를 파라미터로 받아들입니다. 


위에 구현한 `run()`을 다음과 같이 여러 `yield`문이 포함된 generator로 실핼할 수 있습니다.
```js
run(function*() {
    console.log(1);
    yield;
    console.log(2);
    yield;
    console.log(3);
});
```
이 예제는 간단히 `next()`에 대한 모든 호출이 이루어지는 것을 보여줍니다.


### 데이터를 가진 타스크 실행하기
타스크 실행에 데이터를 전달하는 가장 쉬운 방법은 `yield`에 의해 지정된 값을 `next()`메서드에 대한 호출에 전달하는 것입니다. 이렇게 하면 이 코드와 같이 `result.value`만 전달하면 됩니다.


```js
function run(taskDef) {
    // iterator를 만들고 다른곳에서 사용할 수 있게 합니다.
    let task = taskDef();
    // 태스크 시작
    let result = task.next();
    // next() 호출을 계속하는 재귀 함수
    function step() {
        // 더해야 할 일이 있다면
        if (!result.done) {
            result = task.next(result.value);
            step();
        }
    }
    // process 시작
    step();
}
```
이제 `result.value`가 파라미터로 `next()`에 전달되었으므로 다음과 같이 `yield`호출간에 데이터를 전달할 수 있습니다.

```js
run(function*() {
    let value = yield 1;
    console.log(value);         // 1
    value = yield value + 3;
    console.log(value);         // 4
});
```
이 예제는 콘솔에 두개 의 값을 출력합니다. 값 1은 `yield 1`에서 나오는데, 1은 `value`변수로 바로 전달됩니다. 4는 `value`에 3을 더하고 그 결과를 `value`에 전달함으로써 계산됩니다. 데이터가 `yield`호출 사이에서 흐르고 있으므로 비동기 호출을 허용하려면 작은 변경만 하면 됩니다.

### 비동기 타스크 실행
앞의 예제는 정적 데이터가 `yield`호출 사이에서 왔다 갔다했지만 비동기 프로세스를 기다르는 것은 약간 다릅니다. 타스크 러너는 콜백 및 그 사용법을 알아야합니다. 
그리고 `yield`표현식은 값을 태스크 러너로 전달하기 때문에 어떤 함수 호출이라도 호출이 태스크 러너가 기다려야하는 비동기 연ㅇ산임을 나타내는 값을 리턴해야함을 의미합니다.

다음은 값이 비동기 작업임을 알리는 한가지 방법입니다.
```js
function fetchData() {
    return function(callback){
        callback(null, "")
    }
}
```
이 예제의 목적을 위해, 태스크 러너에 의해 호출되는 모든 함수는 callback을 실행하는 함수를 리턴합니다. `fetchData()`함수는 콜백함수를 파라미터로 받아들이는 함수를 리턴합니다. 반화니된 함수가 호출되면, 단일데이터로 콜백함수를 실행합니다. `callback`파라미터는 콜백을 실행하는 것이 기본 iterator와 정확하게 상호작용 하는지를 확인하기 위해 타스크러너로부터 올 필요가 있습니다. `featch Data()`함수는 동기식이지만, 다음과 같이 약간의 지연만으로 콜백을 호출하여 쉽게 비동기식으로 확장할 수 있습니다.

```js
function fetchData(){
    return function(callback){
        setTimeout(function(){
            callback(null,"hi");
        },50)
    }
}
```
이 버전의 `fetchData()`는 콜백을 호출하기 전에 50ms의 지연을 가져와 이 패턴이 동기 및 비동기 코드에서 똑같이 잘 동작함을 보여줍니다. `yield`를 사용하여 호출하려는 각 함수가 동일한 패턴을 따르는지 확인해야합니다.


함수가 비동기 프로세스라는 신호를 보내는 방법을 잘 이해하려면 타스크 러너를 수장하여 해당 사실을 고려할 수 있습니다. `result.value`가 함수 일때 마다, 태스크 러너는 그 값을 `next()`메서드로 전달하는 대신에 실행할 것입니다.

```js
function run(taskDef) {
    // iterator를 만들고 다른곳에서 사용할 수 있게 합니다.
    let task = taskDef();
    // 태스크 시작
    let result = task.next();
    // next() 호출을 계속하는 재귀 함수
    function step() {
        // 더해야 할 일이 있다면
        if (!result.done) {
            if (typeof result.value === "function") {
                result.value(function(err, data) {
                    if (err) {
                        result = task.throw(err);
                        return;
                    }
                    result = task.next(data);
                    step();
                });
            } else {
                result = task.next(result.value);
                step();
            }
        }
    }
    // 프로세스 시작
    step();
}
```
`result.value`가 함수이면 콜백함수가 호출됩니다. 이 콜백함수는 가능한 오류를 첫번째 인수로 전달하고 결과를 두번째 인수로 전달하는 node.js의 규칙을 따릅니다. `err`가 있어 오류가 발생하면 `task.throw()`가 `task.next()`대신에 오류 객체와 함께 호출되므로 ㅈ더오학한 위치에 오류가 발생합니다. 오류가 없으면 `data`가 `task.next()`에 전달되고 그 결과가 저장됩니다. 그런다음 `step()`이 호출되어 프로세스가 계속 진행됩니다. `result.value`가 함수가 아니라면 `next()`메소드에 직접 전달됩니다.

이 새로운 버전의 태스크 러너는 모든 ㅣㅂ동기 태스크에 대한 준비가 되어있습니다. node.js에서 파일로부터 데이터를 읽으려면 이 섹션의 시작 부분에 `fetchData()` 함수와 유사한ㄴ 함수를 반환하는 `fs.readFeile()`을 감싸는 레퍼를 생성해야합니다.

```js
let fs = require("fs");
function readFile(filename) {
    return function(callback) {
        fs.readFile(filename, callback);
    };
}
```


### ref

- [https://infoscis.github.io/2018/01/31/ecmascript-6-iterators-and-generators/](https://infoscis.github.io/2018/01/31/ecmascript-6-iterators-and-generators/)
- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)
- [http://hacks.mozilla.or.kr/2015/08/es6-in-depth-generators/](http://hacks.mozilla.or.kr/2015/08/es6-in-depth-generators/)
- [http://hacks.mozilla.or.kr/2016/02/es6-in-depth-generators-continued/](http://hacks.mozilla.or.kr/2016/02/es6-in-depth-generators-continued/)
- [http://hacks.mozilla.or.kr/2015/08/es6-in-depth-generators/](http://hacks.mozilla.or.kr/2015/08/es6-in-depth-generators/)
- [https://jlongster.com/A-Study-on-Solving-Callbacks-with-JavaScript-Generators](https://jlongster.com/A-Study-on-Solving-Callbacks-with-JavaScript-Generators)
- [https://github.com/nhn/fe.javascript](https://github.com/nhn/fe.javascript)
- [http://jeonghwan-kim.github.io/2016/12/15/coroutine.html](http://jeonghwan-kim.github.io/2016/12/15/coroutine.html)
- [https://suhwan.dev/2018/04/18/JS-async-programming-with-promise-and-generator/](https://suhwan.dev/2018/04/18/JS-async-programming-with-promise-and-generator/)
- [https://medium.com/@jooyunghan/js-async-generator-코루틴-cabb4f5ffaff](https://medium.com/@jooyunghan/js-async-generator-%EC%BD%94%EB%A3%A8%ED%8B%B4-cabb4f5ffaff)
- [https://jlongster.com/A-Study-on-Solving-Callbacks-with-JavaScript-Generators](https://jlongster.com/A-Study-on-Solving-Callbacks-with-JavaScript-Generators)
- [https://medium.com/@jooyunghan/자바스크립트-제너레이터의-재미-246553cadfbd](https://medium.com/@jooyunghan/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%A0%9C%EB%84%88%EB%A0%88%EC%9D%B4%ED%84%B0%EC%9D%98-%EC%9E%AC%EB%AF%B8-246553cadfbd)
- https://leanpub.com/understandinges6/read#leanpub-auto-promises-and-asynchronous-programming