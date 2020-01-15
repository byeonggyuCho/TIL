# Generator

## Intro
비동기적인 실행을 동기화 구문과 연결되어 처리하는 기법을 제공

제너레이터는 단순히 여러번 값을 반환하는 기능의 축약구문이 아니라 함수의 실행 중 동기 명령을 대기시키고 외부 컨텍스트 실행을 하다가 다시 next가 호출될 때 명령을 이어서 실행할 수 있는 네이티브적인 기능.

제너레이터의 등장으로 ES5에선 컨텍스트를 유지하기 위해서 객체나 클로져가 필요했지만 이제 그냥 인자나 지역변수만으로도 컨텍스트를 유지할 수 있게 되었다.  

제너레이터의 핵심적인 기능은 실행컨텍스트를 중단할 수 있다는 것이다.


1. 실행문맥 기록을 어떻게 할 것인가???
2. 그밖에 다른 API와 제너레이터와의 연동.
3. 비동기함수와 동기함수가 혼합되어있는 경우에 시퀀시하게 처리하도록.
4. yield*에 대한 처리.
5. 전역에 Yeild등의 함수가 생성되는 문제.


제한적으로 구현할수 밖에 없음.

함수를 루프 돌릴때 마지막 파라미터로 콜백함수를 전달한다.
 이 콜백함수가 실행을 하면 현재 프레임이 종료됐다는것을 알린다.

next를 호출했을때 이전 프레임의 종료여부를 체크하고 종료가 되지 않았으면 대기스택에 쌓는다.

현재 프레임이 종료되면 대기열에 있는 프레임을 실행시킨다.





-  비동기로직이 끼어있으면 반환값을 콜백으로 받을수 밖에 없음.


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

    //[Private Member] Intance Information
    var callbackList = [];
    var id = [];
    var DEFAULT_RESULT = {value: undefined,    done:true};
    
    function Generator(data,fn){
        id.push(this);
        callbackList.push(fn);
        this.data = data;
        this.next = Generator.prototype.next;
    }

    Generator.prototype.next = function(){

        var idx = id.indexOf(this);
        var fn = callbackList[idx];
        var v;
        var r = DEFAULT_RESULT;

        console.log('[Prototype] next')

        if(fn) {
            v = fn.call(this,this.data);

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
/* 

var generator = function(data){

    return new Generator(function(){

        console.log("[GEN]",this)
        var item;
        while(item = data.pop())     return item;
    });
}  */




var iterator = new Generator([1,2,3],function(){

    var item;
    while(item = this.data.pop()){
        return item;
    }   
});


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


## suspend
실행중인 실행환경(execute Environment)를 중지시키는 것을 어떻게 ES3에서 표현할까??

```js
var result = 0;
var generator = Gene(function(v){
  Yield(1);
  Yield(2);
  Yield(3);
});
For.Of(generator(), function(v){
  result += v;
});
 
console.log(result); //6
```
이런 코드를 동작하게 하기 위해선 어떻게 짜야할까?


```js


var Generator = function(f, ec){
  //상동
  var self = this;
  this.f = f;
  this.ec = ec || {};
  this.value = undefined;
  this.done = false;
 
  //1. Yield의 id를 관리할 구조체
  this.yieldIDs = {}
 
  //2. 이번 호출시 활성화된 yield여부
  this.isYieldActive= false;
 
  //3. 고유하게 부여한 id의 seed값
  this.yieldID = 1;
 
  //4. Yield함수는 실행시마다 id를 확인하고 해당 id의 카운터와 이번 호출시 활성화된 id가 있는지 검사한다.
  this.Yield = function(v){
    //4-1. 이미 활성화된 yield가 있으면 패스한다.
    if(self.isYieldActive) return true;
 
    //4-2. 자신의 id를 얻는다.
    var id = self.yieldID++;
 
    //4-3. yieldIDs 에 없으면 등록한다.
    if(!self.yieldIDs.hasOwnProperty(id)) self.yieldIDs[id] = 1; //1번만 실행하도록 카운트설정
     
    //4-4. 카운트를 다 소진했으면 패스한다.
    if(!self.yieldIDs[id]) return true;
 
    //4-5. 카운트를 감소시킨다.
    self.yieldIDs[id]--;
 
    //4-6. Yield를 활성화시키고 참을 반환한다.
    self.isYieldActive = true;
     
    //4-7. 원래 Yield가 하던걸 한다.
    self.result = v;
    return false;
  };
};


var noYield = {};
Generator.prototype.next = function(){
  //상동
  if(this.done) return this;
  this.result = noYield;
  var preYield = window.Yield;
  window.Yield = this.Yield;
 
  //아이디초기화 및 비활성상태
  this.yieldID = 0;
  this.isYieldActive = false;
 
  //상동
  this.f(this.ec);
  window.Yield = prevYield;
  if(this.result === noYield) this.value = undefined, this.done = true;
  else this.value = this.result;
  return this;
};
 

var Gene = function(f){
  if(typeof f != 'function') throw new TypeError();
  return function(ec){
    return new Generator(f, ec);
  };
};


var gene = Gene(function(){
  Yield(1); //내부 id = 1, 호출 0
  Yield(2); //내부 id = 2, 호출 0
  Yield(3); //내부 id = 3, 호출 0
});
var iterator = gene();

iterator.next();



```




```js
var Gene = (function(){
  var done = {done:true};
  var noYield = {}
  var SELF;
  var pool = []
  var Generator = function(){}
  
  Generator.prototype.init = function(f, ec){
    this.f = f;
    this.ec = ec || {};
    this.ids = {};
    this.value = undefined;
    this.done = false;
  };

  Generator.prototypefn.next = function(){
    var result, stack, prevSelf;
    if(this.done) return this;
    if(this.stack){
      result = this.stack.next();
      if(result.done) this.stack = null;
      else return result;
    }

    this.isYieldActive = false;
    this.seed = 1;
    this.result$ = this.result = noYield;
    prevSelf = SELF, SELF = this;
    this.f(this.ec);
    SELF = prevSelf;
    if(this.result !== noYield){
      this.value = this.result;
      return this;
    }
    if(this.y$ !== noYield){
      result = this.result$.next();
      if(!result.done){
        this.stack = this.result$;
        return result;
      }
    }
    return pool[pool.length] = this, done;
  };

  var check = function(cnt){
    var id;
    if(SELF.isYieldActive) return true;
    id = 'Y' + (SELF.seed++);
    if(SELF.ids[id] === undefined) SELF.ids[id] = cnt ? cnt < 0 ? 100000 : cnt : 1;
    if(!SELF.ids[id]) return true;
    SELF.ids[id]--;
    SELF.isYieldActive = true;
  };

  window.Yield = function(v, cnt){
    if(check(cnt)) return true;
    SELF.result = v;
    return false;
  };
  window.Yield$ = function(v, cnt){
    if(check(cnt)) return true;
    if(v[Symb.iterator]) v = v[Symb.iterator]();
    SELF.result$ = v;
    return false;
  };
  window.Unused = function(){
    var id = 'U' + (SELF.seed++);
    if(SELF.ids[id]) return false;
    return SELF.ids[id] = true;
  };

  return function(f){
    return function(ec){
      var g = pool.length 
                ? pool.pop() 
                : new Generator();
      g.init(f, ec);
      return g;
    };
  };
})();


```



```js
var main = Gene(function(ec){
  switch(true){
  case Unused():
    if(ec.i < ec.j) Yield(ec.i++, ec.j);
    break;
  case Unused():
    Yield$(ec.sub);
    break;
  case Unused():
    Yield(6);
  }
});
var sub = Gene(function(ec){
  Yield$([3,4,5]);
});
 
var iterator = main({i:0, j:3, sub:sub()});
 
For.Of(iterator, function(v){
  console.log(v); //0,1,2,3,4,5,6 차례로 출력
});


```


```js
var Iter = (function(){
  var done = Object.freeze({value:undefined, done:true})
  var strNext = function(){ //문자열용 charAt버전
    if(this.c < this.v.length) {

        this.value = this.v.charAt(this.c++);
        return{
            done: this.done,
            value: this.value
        }
    }
    return done;
  };

  var idxNext = function(){ //인덱스 타는 버전
    if(this.c < this.v.length) {
        this.value = this.v[this.c++];
        return{
            done: this.done,
            value: this.value
        }
    }

    return done;
  };

  return function Iterator(v){
    var instance = this instanceof Iterator ? this : new Iterator();
    instance.v = v;
    instance.done = !v.length;
    instance.c = 0;
 
    //여기서 next 선택
    if(typeof v == 'string'){
      instance.next = strNext;
      instance.value = v.charAt(0);
    }else{
      instance.next = idxNext;
      instance.value = v[0];
    }
    return instance;
  };
})();

var itor = Iterator([1,2,3]);
itor.next()
itor.next()
itor.next()
```






객체 참조주소를 키로 헤시맵을 반환하는 데이터컬랙션.
```js
var HashMap = (function(){
    
    var ID = [];
    var STORE = [];

    var get = function(context,key){
        var idx = ID.indexOf(context);
        return STORE[idx][key];
    }

    var put = function(context,key, value){  

        var idx = ID.push(context);

        STORE[idx] = STORE[idx] || {};
        STORE[idx][key] = value;

        return true;
    }

    var remove = function(context){

        var idx = ID.indexOf(context);
        
        if(idx){
            delete ID[idx]
            delete STORE[idx]
            return true;
        }

        return false;

    }

    var putAll = function(context, obj){

        var idx = ID.indexOf(context);
        
        if(idx){
            STORE[idx] = obj;
        }else{
            var i = ID.push(context);
            STORE[i] = obj;
        }    
    }

    return function HashMap(){

        this.put = put;
        this.get = get;
        this.remove = remove;
        this.putAll = putAll;
    }

})()
```
  





### 최종 결과

비동기 연산 제어를 위한 버전.
이전 함수가 종료되지 않았을때 호출을하면 대기열에 올렸다가 콜백으로 호출을한다.
모든 함수 마지막 인자에 콜백함수를 디폴트로 전다하고 종료가 되는 시점에 실행을 해야한다.


- next를 호출했을때 다음번 yeild가 수행된다.
- next의 파라미터로 yeild에 전달한 인자를 전달할 수 있다.
- next의 결과는 콜백으로 받는다.
- 제너레이터가 아니라 스탭을 나눠놓은 타스크 러너.
```js
/*

TODO
(o) 프레임간 반환값 전달. 
(o) 제너레이터를 루프 로직
- 제너레이터가 종료된다음 메모리를 비우는 처리.
*/

var Generator = (function(){

    var DEFAULT_RESULT = {value: undefined,    done:true};
    var INIT    = "INIT";       // 프레임 초기생성
    var WAITING = "WAITING"     // 이전 프레임이 팬딩일 경우
    var PENDING = "PENDING"     // 프레임 작업중
    var DONE    = "DONE"        // 프레임 작업 종료


    /*
        제너레이터의 중단지점이자 재시작 지점.  
        next에서 프레임을 생성하고 Yield에서 생성된 프레임을 실행한다.
        현재 수행중인 프레임이 있을때는 다음 프레임이 생성되면 대기 스택에 올린다.
    */
    var Yield = function Yield(){
        
        var idx = this.yieldCnt++;      
        var args = Array.prototype.slice.call(arguments);
        var work;
        var currentFrame = this.frame[idx];
        var prevFrame    = this.frame[idx-1];
        var state =  currentFrame && currentFrame.state
        var boundDone = done.bind(this);
        var item =  arguments[0];
        
        if(currentFrame === undefined) return {}               //프레임 미생성.
        else if(currentFrame.state === DONE   ) return currentFrame.result  //프레임 만료
        else if(currentFrame.state === PENDING) return currentFrame.result  //프레임 실행중
        else if(currentFrame.state === WAITING) return currentFrame.result  //이전 프레임 미완료 현재 프레임 등록.

        //이전프레임 미완료
        if(prevFrame){

            if(currentFrame.state === INIT && prevFrame.state !== DONE){

                console.log('[System]', idx-1,'pending');
                currentFrame.state = WAITING;

                work = args.shift();
                args.push(boundDone);     //인스턴스 종료 함수 전달.
                
                this.workList.push({
                    do    : work,
                    args  : args
                });
                return {};
            }
        }

       
        if( typeof item  === 'function'){
            work = args.shift();

            if(state === INIT){
                currentFrame.state = PENDING;
                console.log('[System]',idx,'start');

                //next메서드의 파라미터는 이전 프레임의 반환값이 된다.
                if(prevFrame)
                    prevFrame.result.value = currentFrame.args[0];

                args = argmuentFormatter(args,this);

                if(args.length === 0) args.push(null);

                args.push(boundDone);     //인스턴스 종료 함수 전달.
                work.apply(this, args);
                return currentFrame.result;
            }
        }
        
    }


    var argmuentFormatter = function  argmuentFormatter (args, target){

        var idx;
        var item;
        var result = [];
        for (idx=0; idx<args.length; idx++){
            item = args[idx];

            if(typeof item === 'object' && item.Symbol === target)
              item = item.value;
            
            result.push(item);
        }

        return result;
    }


    //프레임 종료를 알리는 함수.
    var done = function done (re){

        /*
          각 함수에서 콜백으로 호출을하기 때문에 스코프체인으로 찾아야한다.
          여기선 this를 사용해서 인스턴스에 접근할 수 없음.
        */
        var work = null;
        var idx = this.targetFrameIndex;
        var currentFrame = this.frame[idx];
        var postFrame    = this.frame[idx+1];
        var allFrameDone = this.targetFrameIndex+1 === this.data.length;

        console.log("[System]",idx,"done");
        currentFrame.state = DONE;     //종료처리.
        currentFrame.result.value = re;
        ++this.targetFrameIndex;

        //next Callback 실행.
        if(currentFrame.callback)
            currentFrame.callback({
                done    : allFrameDone,
                value   : re
            });
        

        // 대기중인 작업이 있으면 실행한다.
        if(this.workList.length > 0){
            work = this.workList.shift(); 

            //다음 프레임의 next파라미터가 함수에 전달되어야한다.
            if(postFrame)
                currentFrame.result.value = postFrame.args[0];

            //object형태의 전달값을 value만 전달한다.
            work.args = argmuentFormatter(work.args, this);

            work.do.apply(this, work.args);
        }   
    }


    function Generator(constructor){

        var instance = (this instanceof Generator) 
                        ? this 
                        : new Generator().instance

        // property
        instance.targetFrameIndex = 0;
        instance.workList = [];     // 현재프레임이 실행중에 요청이 들어온 프레임.
        instance.frame = [];        // 프레임 진행정보를 보관한다.
        instance.fn =  constructor; // 제너레이터 정의함수.
        //instance.data = data;       // 이터레이블 객체

        // method
        instance.Yield = Yield;
        instance.next = Generator.prototype.next;


        var genMaker = function genMaker(arr){
          instance.data = arr;
          return instance
        }

        genMaker.instance = instance;

        return genMaker;
    }

    /**
        next를 호출할때 WAITE 상태의 프레임을 생성한다.
        콜백함수의 인자로 프레임의 실행 결과를 반환한다.
        - next의 인자는 이전 프레임의 반환값이 된다.
        @example 
        iter.next(function(result){

          console.log(result.value);
        })
    */
    Generator.prototype.next = function next(){

        var args = Array.prototype.slice.call(arguments);
        var hasNext      = this.data.length > this.frame.length;
        var allFrameDone = this.targetFrameIndex === this.data.length;
        var fn = this.fn;
        var callback = (typeof args[0] === 'function')
                          ? args.shift()
                          : null;

        this.yieldCnt   = 0;            //Yield 호출횟수            

        
        if(hasNext){

            var newFrame = {
                state       : INIT,
                args        : args,
                callback    : callback,
                result      : {
                    value  : undefined,
                    Symbol : this
                }
            }
            //프레임 생성.
            this.frame.push(newFrame);
        }//모든 프레임 생성.
        else if (callback){
          
          if(allFrameDone)
              return callback(DEFAULT_RESULT);
          else 
              this.workList.push({
                  do  : callback,
                  args: [DEFAULT_RESULT]
              })
        }
        
        
        if(fn) {
            var frameIdx = this.frame.length -1;
            var copy_data = this.data.slice();

            console.log('[System]',frameIdx, 'next');
            fn.call(this, copy_data);
        }
    }


    /**
      제너레이터를 연속실행하기 위한 헬퍼함수.
      이전 프레임의 반환값을 다음 프레임에 전달한다.
      @example 
        iter.forEach(function(prev, current, idx){

          return 
        })
    */
    Generator.prototype.forEach = function(fn, initParam){

      var iter = this;
      var idx = 0;

      function resumIter (callbackFn, preVal){
          iter.next(function next_CB(result){

            var curVal = result.value;
            curVal = callbackFn(preVal, curVal, idx++) || curVal;

            if(!result.done)
              resumIter(callbackFn, curVal)
            
          }, preVal);
      }

      resumIter(fn,initParam);
    }


    return Generator;
})()


function sayMaker (msg){

    return function say( preVal, done){
        
        //비지니스 로직.
        //msg = (conf) ? conf + " " + msg : msg;

        console.log('[say] previousValue:', preVal);
        console.log('[say] msg:', msg);

        done(msg);
    }
}

function asyncMaker(fn){
    return function asyncFn( conf, done){
        
        setTimeout( fn, 1000, conf, done);
    }
}

var $say1       = sayMaker('Pen');
var $say2       = sayMaker('Pineapple');
var $asyncSay2  = asyncMaker($say2);
var $say3       = sayMaker('Apple');
var $say4       = sayMaker('Pen!!');

var works = [
    $say1,
    $asyncSay2,
    $say3,
    $say4
];


var generator = Generator ( function(list){

    // var re1 = this.Yield($say1);
    // var re2 = this.Yield($asyncSay2, re1);
    // var re3 = this.Yield($say3,re2);
    // var re4 = this.Yield($say4,re3);

    var item;
    var preVal;
    while(item = list.shift()){
      
      preVal = this.Yield(item, preVal);
    }

})

var iter = generator(works);

//example 1 반복문
iter.forEach(function(prev, cur, idx){
    
    var result = prev 
                ? [prev, cur].join(" ")
                : cur;

    console.log('[forEach]', idx, result);
    return result
})


/*
var defaultCallback =  function(rtn){
    console.log("[callback]", rtn)
}


iter.next(defaultCallback);
iter.next(defaultCallback); //async Function
iter.next(defaultCallback); 
iter.next(defaultCallback); 

//종료
iter.next(defaultCallback); 
*/

```







## ref
- [generator1](https://www.bsidesoft.com/?p=2053)
- [generator2](https://www.bsidesoft.com/?p=5494)
- [generator3](https://www.bsidesoft.com/?p=6037)
- [generatorForES3 (1)](https://www.bsidesoft.com/?p=2332)
- [generatorForES3 (2)](https://www.bsidesoft.com/?p=2337)
