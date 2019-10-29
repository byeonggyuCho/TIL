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

collection이라는 객체를 Default Iterator로 정의합니다. Default Iterator는 Generator인  Symbol.iterator 메서드에 의해 생성됩니다. Generator는 for-of 루프를 사용하여 this.items의 값을 반복하고 yield를 사용하여 각각을 리턴합니다. collection 객체는 수동으로 반복하여 collenction의 Default Iterator에 대한 값을 정의하는 대신, this.items의 Default Iterator를 사용하여 작업을 수행합니다.

## 

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