# Promise

![](/resource/img/javascript/promise.png)

프로미스는 자바스크립트 비동기 처리에 사용되는 객체<br>


## 왜?
callback Hell에서 벗어나기 위한 패턴.<br>
ES6에서 부터 공식 기능으로 적용됨.


## 상태코드
- Pending(대기) : 비동기 처리 로직이 아직 완료되지 않은 상태
- Fulfilled(이행) : 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태
- Rejected(실패) : 비동기 처리가 실패하거나 오류가 발생한 상태



## Promise Chaining
![](/resource/img/javascript/promiseChain.png)
~~~ js
let getData = ()=>{

    return new Pomise({
        //비동기 통신.
        let status;
        if(status === 200){
            resolve();
        }else{
            reject();
        }

    })
};

getData().then((resolve,reject)=>{

}).then((resolve,reject)=>{
    
}).then((resolve,reject)=>{
    
}).catch(()=>{
    //예외처리
});
~~~


## PromiseAll


## 예외처리
