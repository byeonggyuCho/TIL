# GeneratorAndAsyncFunction

## Coroutine

여러개의 함수를 반환값 없이 중단 및 실행 시킬수 있는 제어구조.

Generator를 이요한 Promise를 동기방식으로 연출할때 코루틴과 비슷한 형태로 로직을 짜야한다.

차이가 있다면 멈출때 돌아갈 위치를 직접 지저앟ㄹ 수 없고 단순히 호출자에게 제어권을 넘겨주게된다.
```js
const co = gen => Promise(resolve => {
    const g = gen();

    //제너레이터에 파라미터와 제어권을 넘긴다.
    const onFullfilled = res => {
        const result = g.next(res);
        next(result);
    }

    /**
        *제너레이터의 종료여부를 확인하고 프로미스체인을 통해 비동기호출을 연결한다.
        *마치 재귀함수처럼 보인다.
        */ 
    const next = result => {

        let promise = result.value;

        if (result.done)
            return resolve(promise)
        else
            return promise.then(onFullfilled)
    }

    onFullfilled();
})

co(gen).then(user => console.log(user));
```
`onFullfilled()` 과   `next()`이 서로 호출하고 있다.

`next()`에서 제너레이터가 종료될때 co()가 종료된다.

프로미스를 yield하는 제너레이터를 사용하기 위해서는 제너레이터가 보내준 프로미스를 해결하고 이 값을 다시 제너레이터로 넘겨주는 반복작업을 수행한다.

예제
```js
const co = require('co')

co(function* gen () {
    const id = yield getId();
    const name = yield getNameById(id);
    return {id, name};
}).then(user => console.log(user));
```

## Generator를 이용한 비동기 프로그래밍

자바스크립트는 싱글스레드를 기반으로 하는 비동기 방식의 언어다.

이런 특징은 콜백지옥으로 만들었고 이를 해결하기 위한 노력으로 ES6의 프로미스가 추가되었다.

이런 배경지식이 있다는 전제하에  generator를 이용하여 promise를 좀더 스마트하게 사용하는 방법을 소개한다.

myGen 제너레이터는 실행될 때 이터레이터를 반환한다. 그리고 이터레이터의 next()함수가 호출될 때마다 호출되는 곳의 위치를 기억해둔 채로 실행된다. 그리고 함수 내부에서 yeeld를 만날 때마다 기억해둔 위치로 제어권을 넘겨준다. 이런식으로 next()→yield→next()→yield라는 순환 흐름이 만들어지고 이 흐름을 따라 해당 함수가 끝날 떄까지 진행된다.

여기서 주목해야할 점은 next()와 yield가 서로 데이터를 주고 받을 수 있다는 점이다.  yield 키워드 뒤에 오는 값은 next() 함수의 반환값으로 전달된다.
```js
function *myGen() {
    const x = yield 1;       // x = 10
    const y = yield (x + 1); // y = 20
    const z = yield (y + 2); // z = 30
    return x + y + z;
}

const myItr = myGen();
console.log(myitr.next());   // {value:1, done:false}
console.log(myitr.next(10)); // {value:11, done:false}
console.log(myitr.next(20)); // {value:22, done:false}
console.log(myitr.next(30)); // {value:60, done:true}
```
아래 코드를 보자. 

커피주문 시스템을 시뮬레이션한 코드이다. 이 코드를 generator를 이용해 보다 가독성 좋은 코드로 바꿀것이다.
```js
function getId(phoneNumber, callback) { /* … */ }
function getEmail(id, callback) { /* … */ }
function getName(email, callback) { /* … */ }
function order(name, menu, callback) { /* … */ }

function orderCoffee(phoneNumber, callback) {
    getId(phoneNumber, function(id) {
        getEmail(id, function(email) {
            getName(email, function(name) {
                order(name, 'coffee', function(result) {
                    callback(result);
                });
            });
        });
    });
}
```
### 1. 프로미스 적용

이런 패턴은 프로미스의 적용으로 상당 부분 완화되었다. 
```js
const getIdByPhoneNumber = (phoneNumber) => new Promise(resolve => {
    // ....
  setTimeout(() => resolve({id: '0001'}), 1000);
});
const getEmailById = (id) => new Promise(resolve => {
    // ....
  setTimeout(() => resolve({email:'aaa@gmail.com'}), 1000);
});
const getNameByEmail = (email) => new Promise(resolve => {
    // ....
  setTimeout(() => resolve({name:'Peter'}), 1000);
});
const orderByName = (name) => new Promise(resolve => {
  setTimeout(() => resolve({coffee: 1}), 1000);
});


function orderCoffee(phoneNumber) {
    return getIdByPhoneNumber(phoneNumber)
        .then( getEmailById)
        .then( getNameByEmail)
        .then( orderByName);
}
```
이 형태가 아마도 Promise를 이용한 가장 깔끔한 코드일 것이다.  
하지만 이런 형태에는 단점이 있는데 then chain에의 파라미터와 반환값이 연결되어야 한단다는 점에서 문제가 된다.  
예를들면 getEmailById의 반환값을 orderByName에서 사용해야한다면 어떻게 해야할까?  
orderCoffee 함수 외부에 변수를 두어 저장하거나 getNameByEmail의 반환값으로 전달해줘야한다.  
이런 해결방법은 코드의 기능을 모호하게 만들기때문에 그닥 추천할만한 방법은 아니다.  
여기서 하난계 더 나아가 프로미스에 제너레이터를 이용하면 보다 직관적이면서 활용도 높은 코드를 짤수 있다.  


### 2. 제너레이터 적용하기
```js
function* orderCoffee(phoneNumber) {
    const id = yield getIdByPhoneNumber(phoneNumber);
    const email = yield getEmailById(id);
    const name = yield getNameByEmail(email);
    const result = yield orderByName(name, 'coffee');
    return result;
}
```
만약 이런식으로 순차적으로 promise함수가 실행된다면 어떨까요? 
이제 각 반환값을 id, email같은 변수에 저장하기 때문에 이전에 지적한 상황에 대응할 수 있고 각 프로미스함수도 수정하지 않아도 됩니다.

```js
let iter = orderCoffee('010-5555-8888');

iter.next().value
.then(result => 
    iter.next(result).value
    .then(result => 
        iter.next(result).value 
        // ...
    )

)

```
이 코드를 순차적으로 실행하기 위해선 이런 구조가 되어야하는데 헬퍼함수가 필요해보입니다.  
이터레이터가 끝나지 않았으면 `next().value`로 반환되는 promise에 then메소드를 체인하는 식의 추상화 코드가 있으면
깔끔해질 것같습니다.


### 3. 프로미스와 제너레이터 조합하기.
```js
function run(generator, ...args) {
  const iter = generator(args);

  function resumeIter(prevRes) {
    const next = iter.next(prevRes);
    if (next.done) return Promise.resolve(next.value);

    Promise.resolve(next.value)
      .then(res => {
        resumeIter(res);
      });
  }

  resumeIter();
}

run(orderCoffee,'010-1010-1111')
```
이제 헬퍼함수를 통해 프로미스를 반환하는 이터레이터를 순차적으로 실행할 수 있습니다.  
그러나 아직 `run`함수에는 문제가 있습니다.  
에러처리 로직이 없고 여러개의 generator를 동시에 처리할 수 없으며 여러개의 Promise를 병렬적으로 실행시키지도 못합니다.  
아래는 위 로직을 조금 수정한 함수입니다.  

```js
function run(generator, ...args) {
  const iter = generator(args)
  function fulfilledHandler(res) {
    const next = iter.next(res);
    if (next.done) return Promise.resolve(next.value);
    Promise.resolve(next.value)
      .then(fulfilledHandler, rejectedHandler);         // (A)
  }

  function rejectedHandler(err) {
    const next = iter.throw(err);
    if (next.done) return Promise.resolve(next.value);
    Promise.resolve(next.value)
      .then(fulfilledHandler, rejectedHandler);
  }

  return fulfilledHandler();
}
```


모든 함수가 프로미스를 반환하도록 수정합니다.  
next.value에 프로미스를 리턴하고 then메서드에서 재귀호출을 하는 스타일입니다. (A)
프로미스와 제너레이터를 함께 사용해서 각각 함수에서 제너레이터를 신경쓰지 않고 외부에서 제어할 수 있습니다. 
이제 제너레이터를 활용하여 비동기 코드를 동기식으로 작성할 수 있습니다.  

프로미스와 제너레이터 조합에서 핵심은  yield를 호출해 멈춘 Generator를 Promise가 제어하는 것압니다.  



## REF
- [ES6의 제너레이터를 사용한 비동기 프로그래밍](https://meetup.toast.com/posts/73)
- [Promise와 Generator을 활용한 async programming](https://suhwan.dev/2018/04/18/JS-async-programming-with-promise-and-generator/)
- [Async Generator 코루틴](https://medium.com/@jooyunghan/js-async-generator-%EC%BD%94%EB%A3%A8%ED%8B%B4-cabb4f5ffaff)
- [Adapting Observable to Async Iteration in JavaScript](https://medium.com/@jooyunghan/adapting-observable-to-async-iteration-in-javascript-2-b8df3c7f7260)
- [김정환블로그 - 제너레이터와 프로미스를 이용한 비동기 처리](http://jeonghwan-kim.github.io/2016/12/15/coroutine.html)
- [A STUDY ON SOLVING CALLBACKS WITH JAVASCRIPT GENERATORS](https://jlongster.com/A-Study-on-Solving-Callbacks-with-JavaScript-Generators)