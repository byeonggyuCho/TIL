# Functor
펑터는 함수형 프로그맹의 개념 중 하나다.
프로그래머들의 귀차니즘을 해소해주기위해 도입된 개념이다.
펑터를 사용하면 코드의 재사용성이 비약적으로 상승한다.



## Lifting
함수형 프로그맹의 개념중 하나.
펑터를 이해하는데 중요한 개념이다.
리프팅은 특정 타입을 다루는 함수를 특정타입과 관련된 다른 타입을 다루는 함수로 변화시키는 기술이다.
코드 재사용성을 높혀주는 기술이다.
어떤 타입 A의 값을 다루는 함수가 있을 때 이 함수를 A와 관련된 다른 타입 F\<A\>의 값에도 적용하고 싶다면 그 타입을 지원하기 위한 코드가 들어간 새 함수를 만드는게 일반적인데 이런 상황에서 '어떻게 함수를 꾸며야 하는지'를 한번만 리프팅 함수를 통해 서술하면 앞으로 어떤 타입의 값을 다루는 함수를 가져와도 리프팅 함수를 통해 쉽게 변환시킬수 있게 된다.

다시말해, 리프팅은 A타입의 값을 다루는 함수를 가지고 F\<A\> 타입의 값을 다루는 함수를 정말 간단하게 유도할 수 있게 해준다.

```js
function add10(x: number): number {
    return x + 10;
}

add10(1)
add10(10)
add10(100)
```
배열 안에 들어간 number 타입의 값을 다루려면 어떻게 해야할까?
다른 값 안에 들어있어도 number 타입의 값은 number 타입이니 add10을 사용하고 싶다
하지만 add10은 배열을 사용할 수 없다.
add10의 배열버전을 만들어보자.

```js
function add10ForArray(xArr: number[]): number[] {
    const resultArr: number[] = [];

    for (const x of xArr) {
        resultArr.push(add10(x))
    }

    return resultArr;
}
```
이렇게 number[] 타입의 값과도 상호작용 할 수 있게 되었다.


이번엔 문자열 끝에 'a'를 더하는 addA를 살펴보자.
```js
function addA(x: string): string {
    return x +'a';
}

```
마찬가지로 배열속에 문자열이 있는 구조를 만들어보자

```js
function addAForArr(xArr: string[]): string[] {
    const resultArr: string[] = [];

    for (const x of xArr){
        resultArr.push(addA(x));
    }

    return resultArr;
}
```

add10ForArray와 addAForArr는 자료형을 제외한 똑같은 로직을 같는다.
추상화를 통해 함수를 재활용해보자.

```js
function tranFunctionForArr<P, R>(f: (x: P) => R): (x: P[])=> R[] {
    return (xArr: P[]): R[] => {
        const resultArr: R[] = [];

        for(const x of xArr) {
            resultArr.push(f(x));
        }

        return resultArr;
    }
}

const add10ForArr = tranFunctionForArr<number, number>(add10);
const addAForArr = tranFunctionForArr<string, string>(addA);
```
이때 tranFunctionForArr의 역할이 리프팅이다.




## Functor
- 다른 타입을 하나 받아서 구성되는 타입이다.
- 자신을 구성하는 타입의 값을 다루는 함수를 리프팅하거나 자신에게 적용하는 방법을 제공해야한다.
- 펑터(Functor): 리프팅이 가능한 F\<A\> 꼴의 선언을 갖는 타입


### Eaxample
```
F<T>
(f: (x: A) => B) => (tx: F<A>) => F<B>  
(f: (x: A) => B, tx: F<A>) => F<B>
```
이런 꼴의 함수를 지원해야한다.



배열도 하나의 펑터다.
다른 타입을 하나 받아서 구성된다. Array<T>나 T[]
자신을 구성하는 타입의 값을 다루는 함수를리프팅하거나 자신에게 적용하는 방법을 제공한다.
Array.prototype.map의 타입 시그니처는 \<U\>(f:(x: T))=> U): U[] 이다.

정리하자면 펑터는 리프팅이 가능한 F\<A\>꼴의 선얼을 갖는 타입이다.



### Eaxmple
Fantasy Land명세 : Javascript/TypeScript 모듈 간에 대수 구조들에 대한 상호 운용성을 성립 시키기 위한 명세로 쉽게 말해 리프트 함수 같이 함수형 프로그래밍에 특수한목적으로 쓰이는 함수들의 이름을 미리 정하여 함수형 프로그맹 모듈 간의 호환성을 형성하기 위한 명세다.


```js
import { map } from 'fantasy-land';

abstract class Maybe<A> {
    [map]<B>(f: (x: A) => B): Maybe<B> {
        if (this instanceof Just) {
            const { value } = this;

            return new Just(f(value));
        } else {
            return new Nothing;
        }
    }
}

class Just<A> extends Maybe<A> {
    constructor(public value: A) {
        super();
    }
}

class Nothing<A> extends Maybe<A> {}

```
Maybe타입 : 계산 실패를 의미하는 null이나 undefined를 Nothing이라는 특별한 값으로 대체 시킨 타입이다.


```ts
import { map } from 'fantasy-land';

function parseBool(x: string): Maybe<boolean> {
    const isTrue = /^true$/;
    const isFalse= /^false$/;
    const caseIgnoredX = x.toLowerCase();

    if (isTrue.test(caseIgnoredX)){
        return new Just(true);
    } else if(isFalse.text(caseIgnoredX)){
        return new Jsut(false);
    } else{
        return new Nothing;
    }
}


function not(x: boolean): boolean {
    return !x;
}

parseBool('true')[map](not); // Just(false)
parseBool('false')[map](not); // Just(true)
parseBool('Jaewon seo')[map](not); // Nothing

```
Maybe를 사용하면 실패할 수 있는 연산을 쉽게 다룰 수 있다.
힘들게 실패한 케이스를 반복적으로 핸들링할 필요가 없다.





### REF
- https://github.com/fantasyland/static-land
- http://adit.io/posts/2013-04-17-functors,_applicatives,_and_monads_in_pictures.html
- https://blog.merovius.de/2018/01/08/monads-are-just-monoids.html#footnote2_back
https://chodragon9.github.io/blog/functional/?fbclid=IwAR223e5B7hwtbM-NEapIlf61ZZ0umTFlGrctuq14ErgN_aVWAMyYiRW1R4c

- https://overcurried.netlify.com/%EA%B7%80%EC%B0%A8%EB%8B%88%EC%8A%A4%ED%8A%B8%EB%A5%BC%20%EC%9C%84%ED%95%9C%20%ED%8E%91%ED%84%B0/?fbclid=IwAR29kKvfH0D8VcmL9LyT_4VwWpricjutVQQlIYyU87YmY8dGCjMFbnkBnP8

