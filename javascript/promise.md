# Promise

![](/resource/img/javascript/promise.png)

자바스크립트 비동기(asynchronous code)에 사용되는 객체  


## intro
```js
doSomething().then( () => doSomethingElse());

doSomething().then(() => {
  doSomethingElse();
});

doSomething().then(doSomethingElse());

doSomething().then(doSomethingElse);
```

첫번째는 `doSomethingElse`의 반환값이 Promise value로 전달된다.  
두번째는 `doSomethingElse`이 실행되고 반환값은 null이다.  
세번째는 `doSomethingElse`이 함수를 반환하고 반환된 함수가 then 메서드의 콜백으로 실행된다.  
네번째는 `doSomethingElse`가 실행되며 매개변수로 `doSomething`의 결과값이 전달된다.  

이 포스팅은 위 스닛코드를 이해하는 과정을 다룬다.  



## 등장배경
단일 스레드의 Event Loop개념을 기반으로 으로 하는 JavaScript엔진에서 작업순서를 제어하기 위해 비동기 프로그래밍을 도입습니다.
Promise는 비동기 프로그맹을 좀 더 깔끔하게 사용할 수있는 패턴입니다.

## 상태코드
![](/resource/img/javascript/promiseStatus.jpg)

- Pending(대기) : 비동기 처리 로직이 아직 완료되지 않은 상태
- Fulfilled(이행) : 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태
- Rejected(실패) : 비동기 처리가 실패하거나 오류가 발생한 상태


~~~ js
const age = 10
const user = {name: 'chuchu'}

const checkCoffeeAble = new Promise((resolve, reject) => {
  if (age >= 18) {
    resolve(user)
  } else {
    reject("cannot have coffee")
  }
})

const canHaveCoffee = (result) => {
  localStorage('coffee_drinker', result.name)
}

const cannotHaveCoffee = (result) => {
  console.log(result)
}


checkCoffeeAble.then(canHaveCoffee).catch(cannotHaveCoffee);
~~~


## then Method
Promise has then Method.<br/>
When Promise is fullfilled or rejected the respective handler function (onFulfilled or onRejected) will be called asynchronously.  
Then Method return new Promise, it has following features.


### 1. Parameter
- onFulfilled : 'fulfillment value'가 매개변수로 전달된다.
- onRejected  : 'rejection reason'이 매개변수로 전달된다.
### 2. Return Value
- then이 return하면 resolved Promise를 반환한다.
- then의 return value가 있을때, resolved Promise의 값이 된다.
- then의 return value가 없을때, resolved Promise의 값은 undefined이다.
- then throws an error, rejected Promise를 반환한다.
- returns an already rejected promise, rejected Promise를 반환하며 value는 already rejected promise의 value와 같다.


## Promise Chaining
![](/resource/img/javascript/promiseChain.png)
~~~ js
let getData = ()=>{

    return new Pomise({
        let status;
        if(status === 200){
            resolve();
        }else{
            reject();
        }
    })
};

getData().then((resolve)=>{

}).then((resolve)=>{
    
}).then((resolve)=>{
    
}).catch((error)=>{
    //예외처리
});
~~~






## Method

### 1. Promise.resolve
- resolved Promise object를 반환한다.
- 매개변수가 프로미스면 그 프로미스를 리턴한다.
- 매개변수가 then메소드 가졌으면 리턴되는 프로미스는 thenable을 따른다.
- 타입을 프로미스로 캐스팅할 때 사용된다.

***thenalbe object***  
Promise형식의 then 메서드를 가진 객체를 말한다.  
따라서 Promise객체는 thenable object다.
``` js
var thenable = { then: function(resolve) {
  resolve('Resolving');
  throw new TypeError('Throwing');
}};
```


아래 예제는 Promise.resovle의 특징을 이해하는데 도움이 된다.
``` js
const p = new Promise(resovle => setTimeout(resovle));

new Promise(resolve => resolve(p)).then(() => {
  console.log("tick 3");
});

p.then(() => {
  console.log("tick 1");
}).then(() => {
  console.log("tick 2");
});

/*
  tick 1
  tick 2
  tick 3
*/
```


``` js
const p = new Promise(resovle => setTimeout(resovle));

Promise.resolve(p).then(() => {
  console.log("tick 3");
});

p.then(() => {
  console.log("tick 1");
}).then(() => {
  console.log("tick 2");
});

/*
  tick 3
  tick 1
  tick 2
*/
```

위 예제에서 
new Promise(resolve => resolve(p))와 Promise.resolve(p)의 차이는 <br/>
새로운 Promise객체를 생성하는가?에 있다.<br/>
앞서 말한바와 같이 Promise.resolve()의 매개변수로 Promise가 전달될 경우<br/>
전달받은 Promise를 그대로 return한다.<br/>
따라서 이 경우에는 새로운 Promise가 생기지 않는다.



### 2. Promise.all
- 주어진 이터러블 객체의 프로미스가 모두 이루어질 때 프로미스를 반환하는 메서드
- 비동기 코드를 병렬처리할 수 있다.  
- 프로미스중 하나라도 reject가 발생하면 reject프로미스르 반환한다.
- Promise.all은 AND 조건이다. 즉 모두 성공할때 resolve값을 반환한다. 하나라도 실패하면 Reject를 반환한다.

```js
Promise.all([
  fetch('/template.html'),
  fetch('/style.css'),
  fetch('/data.json')
]).then(render); // render 메서드는 fetch 결과 전부가 있어야 제대로 동작합니다.
```


### 3. Promise.allSettled
- 모든 프로미스가 처리될 때까지 기다린다. 
- 배열을 반환하며 다음과 같은 요소를 갖는다.

```js
// 응답성공
{status:"fulfilled", value:result}

// 응답실패
{status:"rejected", reason:error}

```

```js
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
  .then(results => { 
    results.forEach((result, num) => {
      if (result.status == "fulfilled") {
        alert(`${urls[num]}: ${result.value.status}`);
      }
      if (result.status == "rejected") {
        alert(`${urls[num]}: ${result.reason}`);
      }
    });
  });
```

**Promise.allSettled의 폴리필**  
```js
if(!Promise.allSettled) {
  Promise.allSettled = function(promises) {
    return Promise.all(promises.map(p => Promise.resolve(p).then(value => ({
      state: 'fulfilled',
      value
    }), reason => ({
      state: 'rejected',
      reason
    }))));
  };
}
```



### 4. Promise.race
- 가장 먼저 처리되는 프라미스의 결과(혹은 에러)를 반환합니다.
```js
let promise = Promise.race(iterable);
```
- 실사용 예를 들어봐라.

```js

Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("에러 발생!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```




### Example Promise Advance

#### 1.비동기 호출 루프돌리기.
```js

const items = ['a','b','c','d']

const promiseFactory = function(fn){

  return new Promise((resolve,reject)=>{
      fn(resolve,reject);
  })
}

const forEachPromise = function(items){
  
  return items.reduce((promise, item, idx )=>){

    return promise.then(rtn =>promiseFactory((resolve,reject)=>{
      setTimeout(resolve,3000)
    }))

  },Promise.resolve())
}
```

#### 2.재시도 로직.
- 서버 요청이 실패 했을 때 재시도를 하는 로직을 구현해보자..

```js
const fetchUsers = async (userId) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/');
  // const response = await fetch('https://jsonplaceholder.typicode.com/users/wrong-url');
  if (response.ok) {
    return response.json();
  } else {
    throw response;
  }
}

const retry = (func, params = [], maxRetriesCount = 5, interval = 500) => new Promise((resolve, reject) => {
  func(...params)
    .then((response) => resolve(response))
    .catch((err) => {
      if (maxRetriesCount === 0) {
        reject(err); 
        return;
      }
      setTimeout(() => {
        console.log('retry!');
        retry(func, params, maxRetriesCount - 1).then(resolve, reject);
      }, interval);
   });
});

(async function(){
  try {
    const users = await retry(fetchUsers);
    document.write(JSON.stringify(users));
    console.log('response', users);
  } catch(err) {
    console.log('error:', err);
  }
})();

```


#### 3. 타임아웃 구현하기
**Promise.race**를 이용하면 타입아웃을 구현할 수 있습니다.
```js
const timeout = new Promise((resolve, reject) => {
  const id = setTimeout(() => {
    clearTimeout(id);
    reject('timeout!');
  }, 500);
});

const promise = new Promise((resolve, reject) => {
  const id = setTimeout(() => {
    clearTimeout(id);
    resolve('response!');
  }, 700);
});

Promise.race([promise, timeout]).then(response => {
  console.log(response);
}).catch(err => {
  console.log(err) //timeout!
});
```

#### 4.비동기 병렬처리.
![](../javascript/promissAll.png)
```js
 
  Promise.all(
    fetch('https://jsonplaceholder.typicode.com/users/1').then(res => res.json()),
    fetch('https://jsonplaceholder.typicode.com/users/2').then(res => res.json()),
    fetch('https://jsonplaceholder.typicode.com/users/3').then(res => res.json()),
  ).then(([user1, user2, user3]) => {
    console.log('user1:', user1);
    console.log('user2:', user2);
    console.log('user3:', user3);
  });

```




### REF
- [javascript leaning guid](https://helloworldjavascript.net/pages/285-async.html)
- [What is Promise](https://velog.io/@cadenzah/What-is-a-Promise)
- [infoscis.github.io](https://infoscis.github.io/2018/02/27/ecmascript-6-promises-and-asynchronous-programming/)
- [Understanding EcmaScript](https://leanpub.com/understandinges6/read#leanpub-auto-promises-and-asynchronous-programming)