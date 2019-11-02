# Promise

![](/resource/img/javascript/promise.png)

자바스크립트 비동기(asynchronous code)에 사용되는 객체  


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




### Example

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



### REF
- [infoscis.github.io](https://infoscis.github.io/2018/02/27/ecmascript-6-promises-and-asynchronous-programming/)
- [Understanding EcmaScript](https://leanpub.com/understandinges6/read#leanpub-auto-promises-and-asynchronous-programming)