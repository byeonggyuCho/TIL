# Generator

## Intro
비동기적인 실행을 동기화 구문과 연결되어 처리하는 기법을 제공

제너레이터는 단순히 여러번 값을 반환하는 기능의 축약구문이 아니라 함수의 실행 중 동기 명령을 대기시키고 외부 컨텍스트 실행을 하다가 다시 next가 호출될 때 명령을 이어서 실행할 수 있는 네이티브적인 기능.

제너레이터의 등장으로 ES5에선 컨텍스트를 유지하기 위해서 객체나 클로져가 필요했지만 이제 그냥 인자나 지역변수만으로도 컨텍스트를 유지할 수 있게 되었다.
```js
var generator = function* (data){
  let item;
  while(item = data.pop()) yield item;
}
 
var iterator = generator([1,2,3]);

var action = function(){
  let result = iterator.next();
  console.log(result);
  if(!result.done) setTimeout(action, 1);
}
setTimeout(action, 1);
```
이 예제에서 data와 item라는 지역변수 만으로 역할수행을 하고 있다.

이 코드를 ES5에서 구현했다면 다음과 같았을겁니다. 클로져를 이용하기 위해 스코프를 유지할 함수를 정의해야합니다.
```js
var makeAction = function(data){
  
  return function invoke(){
    var v = data.pop();
    console.log(v);
    if(v) setTimeout(invoke);
  }
};

var action = makeAction([1,2,3]);
setTimeout(action);
```
위 코드에서는 makeAction에서 data, invoke라는 함수가 클로져가 되어 setTimeout을 통한 프레임간 실행에서 실행컨텍스트를 유지하는 역할을 하고 있다. 


```js
var Generator = (function(){

    //Private Member
    var callbackList = [];
    var id = [];
    var DEFAULT_RESULT = {value: undefined,    done:true};
    
    function Generator(fn){
        id.push(this);
        callbackList.push(fn);

        this.next = Generator.prototype.next;
    }

    Generator.prototype.next = function(){

        var idx = id.indexOf(this);
        var fn = callbackList[idx];
        var v;
        var r = DEFAULT_RESULT;

        console.log('[Prototype] next')

        if(fn) {
            v = fn();

            if(v) {
                r = {value: v,       done:false};
            }else{
                delete id[idx];
                delete callbackList[idx];

                //연산비용 절감을 위해 재정의
                this.next =  function(){
                    console.log('[intance] next')
                    return DEFAULT_RESULT;
                };
            }
        }

        return r;
    }

    return Generator;
})()

var generator = function(data){


    return new Generator(function(){

        var item;
        while(item = data.pop())     return item;
    });
}

var iterator = generator([1,2,3]);


console.log(iterator);
var action = function(){
  let result = iterator.next();
  console.log(result);
  if(!result.done) setTimeout(action);
}
setTimeout(action);
```
제너레이터가 해주는 역할을 좀더 명확하게 비교하게 위해서 generator라는 함수를 만들어봤다. 위 예제에서 클로져로 `data`를 기록했듯이 
ES6의 제너레이터가 입력받은 데이터를 기록하고 있음을 알 수 있다.







## ref
- [generator1](https://www.bsidesoft.com/?p=2053)
- [generator2](https://www.bsidesoft.com/?p=5494)
- [generator3](https://www.bsidesoft.com/?p=6037)
