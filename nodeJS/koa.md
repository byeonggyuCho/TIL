# Koa

- async/await 기능을 사용할 수 있다.
- Generator함수를 사용하여 요청과 응답을 처리한다.
- 메모리를 덜 먹고 표현력이 좋다.
- 다른 프레임워크에 비해 미들웨어 작성이 쉽다. 
기본적으로 뼈대 프레임워크라서 제공되는 미들웨어와 함께 사용해야만 하는 Express와 Hapi와 달리, 개발자가 필요한 미들웨어만 구성해 사용할 수 있다. ES6를 도입하고 있어 ES6 제너레이터를 사용할 수 있다.
- 미들웨어를 직접 작성할 수 있는게 장점일 수 있지만 단점일 수도 있다. 

## Info
ES6의 문법중 제너레이터를 적극적으로 활용하고 있는 웹 프레임워크다. 모든 요청과 처리를 제너레이터를 활용해 파이프라인을 만든느 것이 특징이다.  
그 덕분에 깔끔한 async코드를 손쉽게 작성할 수 있다. Express만큼은 아니더라도 다양한 라이브러리를 제공한다. Express의 라이브러리나 미들웨어도 thenfy나 co로 변환해서 사용이 가능할만큼 학장성이 높다.


## Generator
ES6의 Generator 실행 중간에 값을 반환할 수 있고, 다른 작업을처리한 후에 다시 그 위에서 코드를 시작할 수있다.

```js
function* nTimesTable(n) {
  for(var i = 1; i <= 9; i++) yield n * i;
}

let nineTimesTable = nTimesTable(9);

var result = nineTimesTable.next();
console.log(result); // { value: 9, done: false }
result = nineTimesTable.next();
console.log(result); // { value: 18, done: false }
result = nineTimesTable.next();
console.log(result); // { value: 27, done: false }

// keep calling...

result = nineTimesTable.next();
console.log(result); // { value: 72, done: false }
result = nineTimesTable.next();
console.log(result); // { value: 81, done: false }
result = nineTimesTable.next();
console.log(result); // { value: undefined, done: true }
```


```js
function caller(iter) {
  var result, value;
  while(result = iter.next()) {
    if(result.done) 
        break;
    else
        value = result.value || value;
  }
  return value;
}

var result = caller(nTimesTable(3));        //최종값.
console.log(result); // 27
```
`caller`는 done이 true를 반환할 떄까지 해당 이터레이터를 실행한다. (이터레이터를 모두 실행하고 최종값을 반환한다.)
만약 매 반복에서 특정 함수를 실행하고 싶다면 다음처럼 작성할 수 있다.



```js
function * nTimesTable(n) {
    for(var i = 1; i <= 9; i++) {
        yield { 
            n: n, 
            i: i, 
            result: n * i 
        };
    }
}

function caller(iter, func) {
  var result, value;
  while(result = iter.next()) {
    if(result.done)  break;

    value = result.value || value;

    if(func) func(value);
  }
  return value;
}

caller(nTimesTable(3), value => {
  console.log('%d x %d = %d', value.n, value.i, value.result);
});
```
위 `caller`는 제너레이터 내의 yield에 대해서는 처리를 하지 못한다. 제너레이터에서 이터레이터를 반환하고 진행을 중단했을 떄 해당 이터레이터를 처리해서 다시 반환해야 한다. 결과를 넣고 다시 진행할 수 있도록 작성해야 한다.

```js
function* getAnimalInCage() {
  yield "Wombat";
  yield "Koala";
  return "Kangaroo";
}

function* Cage() {
  var cageAnimals = getAnimalInCage();

  var first = yield cageAnimals;
  var second = yield cageAnimals;
  var third = yield cageAnimals;

  console.log(first, second, third);
}

```
`Cage`제너레이터를 실행하면 `yield`를 3번 사용했기 때문에 최종 `console.log`가 출력하는 결과를 보기까지 4번에 걸쳐 실행된다.

```js
let cage - Cage();
let firstStop = cage.next();        //{value: iterator, done: false}
```

첫번쨰 yield 결과 firstStop에 저장되었ㄷ. cageAnimals는 위 코드와 같이 getAnimalInCage 제너레이터가 생성한 이터레이터다. 이 이터레이터에 next() 메소드로 값을 반등ㄴ 후, 그 값을 다시 first 변수에 다음과 같이 반환한다.

```js
var firstAnimal = firstStop.value.next();
// firstAnimal: {value: "Wombat", done: false}
var secondStop = cage.next(firstAnimal.value);
```
`next`의 인자값으로 처 결과인 Wombat을 넣었다. 이전에 멈췄던 위치인 첫 번째 yield로 돌아가 함수 내 first에는 Wombat이 저장된다.

```js
var secondAnimal = secondStop.value.next();
// secondAnimal: { value: 'Koala', done: false }

var thirdStop = cage.next(secondAnimal.value);
var thirdAnimal = thirdStop.value.next();
// thirdAnimal: { value: 'Kangaroo', done: true }

var lastStop = cage.next(thirdAnimal.value);

// Wombat Koala Kangaroo
```
마지막 Kangaroo는 yield가 아닌 return이기 떄문에 done이 true를 반환한다. 앞서 직접 호출해서 확인할 코드는 반환하는 값이나 호출하는 형태가 일정한 것을 볼 수 있다. 즉 재상요 가능한 형태로 만들 수 있다.


다음은 `catchEscapedAnimal()`과 `getTodaysZookeepr()`함수를 이용한 `Zoo`제너레이터의 예시다.


```js
function catchEscapedAnimal() {
  return function(done) {
    setTimeout(function() {
      done(null, {name: 'Kuma', type: 'Bear'});
    }, 1000);
  };
}

function* getTodaysZookeeper() {
  yield {status: 'loading'};
  return {status: 'loaded', name: 'Edward'};
}

function* Zoo() {
  var animal = yield catchEscapedAnimal();
  var zookeeper = yield getTodaysZookeeper();

  console.log('%s catches by %s', animal.name, zookeeper.name);
}
```
`catchEscapedAnimal()`은 비동기 프로세스를 가정해 `setTimeout`을 이용해 연출했다. `getTodaysZookeeper()`는 일반적인 ㅈ베너레이터 함수로 첫 호출에는 loading을, 두번쨰 호출에는 최종 값을 전송한다. `Zoo`도 앞서 본 `Cage`처럼 중간에 yield를 사용한다. 이 함수를 처리하기 위한 `compose`함수느 다음과 같다.

```js
function catchEscapedAnimal() {
  return function(done) {
    setTimeout(function() {
      done(null, {name: 'Kuma', type: 'Bear'});
    }, 1000);
  };
}

function* getTodaysZookeeper() {
  yield {status: 'loading'};
  return {status: 'loaded', name: 'Edward'};
}

function* Zoo() {
  var animal = yield catchEscapedAnimal();
  var zookeeper = yield getTodaysZookeeper();

  console.log('%s catches by %s', animal.name, zookeeper.name);
}
```

이 `compose`함수는 다음과 같은 경우의 수를 다룬다.
- yield된 값이 함수일때, 호출 체인을 연결할 수 있도록 next함수를 넘겨줌
- yield된 값이 이터레이터일 때, 이터레이터가 done을 반환할 떄까지 호출 한 후 최종값을 반환
- 그 이외의 결과를 반환할 떄, 해당 값을 이터레이터에 넣고 다시 `compose`를 호추라.
- 이터레이터가 종료 되었을떄 next함수가 있다면 해당 함수로 호출을 진행하고 없으면 최종 값을 반환하고 종료.


```js
compose(Z00());
```




-----
## 1. 제너레이터를 코루티으로
`co`는 제너레이터를 코루틴처럼 사용할 수 있도록 돕는 라이브러리로 앞서 작성했던 `compose`함 수와 같은 역할을한다.

```js
const co = require('co');
co(Zoo());
```
이 라이브러리는 내부적으로 Promsie패턴을 사용하고 있어서 callback이든 Promise든 제너레이터든 모두 잘 처리한다.


## 2. Koa
`Koa`는 앞서 `co`라이브러리를 기본적으로 적용하고 있는 HTTP미들웨어 라이브러리로 경량에 간단한 기능을 제공하는 것을 특징으로 한다. 제너레이터를 기본적으로 사용할 수 있다.

```js
var koa = require('koa');
var app = koa();

function catchEscapedAnimal() {
  return function(done) {
    setTimeout(function() {
      done(null, {name: 'Kuma', type: 'Bear'});
    }, 50);
  };
}

function* getTodaysZookeeper() {
  yield {status: 'loading'};
  return {status: 'loaded', name: 'Edward'};
}

function* Zoo() {
  var animal = yield catchEscapedAnimal();
  var zookeeper = yield getTodaysZookeeper();

  this.body = { message: animal.name + ' catches by ' + zookeeper.name };
}

app.use(Zoo);
app.listen(3000);
```
Koa의 의 모든 추가 기능은 미들웨어 구조로 제너레이터를 통해 작성된다. 


```js
app.use(function* (next) {
  yield next;
  if(this.body) {
    this.body.ok = true;
  } else {
    this.body = { ok : false };
  }
});
```

```js
app.use(function* (next) {
  var requestToken = this.request.get("Authorization");
  var accessToken = yield AccessTokensModel.findAccessTokenAsync(token);
  if(accessToken) {
    yield next;
  } else {
    this.body = { error: 'invalid_token' };
  }
});
```



## REF
- [Koa와 Generator](https://edykim.com/ko/post/introducing-javascript-generator-and-koa.js/)
- [koajs](https://koajs.com/)
- [koaWiki](https://github.com/koajs/koa/wiki)