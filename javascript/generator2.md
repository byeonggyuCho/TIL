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
  







```js
//test
function sayMaker (msg){

    return function(instance, resolve){
        console.log(msg);

        //종료시점을 알린다. 반드시 마지막 파라미터로 해야함.
        resolve(instance);
    }
}

function asyncMaker(fn,args){
    return function(){
        setTimeout(fn,0,args);
    }
}

var $say1       = sayMaker(1);
var $asyncSay2  = asyncMaker(sayMaker,2);
var $say3       = sayMaker(3);


var works = [
    $say1,
    $asyncSay2,
    $say3
];


var gen = Generator(works, function(){

    var item;
    while(itme = this.data.pop()){
        this.Yeild(item);
    }
    // this.Yeild($say1);
    // this.Yeild($asyncSay2);
    // this.Yeild($say3); 
})

gen.next();
gen.next();
gen.next();
```
이게 순서대로 나오면 성공임.








비동기 연산 제어를 위한 버전.
이전 함수가 종료되지 않았을때 호출을하면 대기열에 올렸다가 콜백으로 호출을한다.
모든 함수 마지막 인자에 콜백함수를 디폴트로 전다하고 종료가 되는 시점에 실행을 해야한다.


- next를 호출했을때 다음번 yeild가 수행된다.
- next의 파라미터로 yeild에 전달한 인자를 전달할 수 있다.
- next의 결과는 콜백으로 받는다.
- 제너레이터가 아니라 스탭을 나눠놓은 타스크 러너.
```js

var Generator = (function(){

    //var STORE_MAP = new HashMap();
    var DEFAULT_RESULT = {value: undefined,    done:true};
    var WAITING = "WAITING"
    var PENDING = "PENDING"
    var RESOLVE = "RESOLVE"


    /*
        Yeild가 실행되면 전달받은 함수와 매개변수를 임시저장소에 보관한다.
        next가 호출될때 대기중인 작업을 실행한다.
    */
	var Yeild = function Yeild(){
        
        ++this.yeildCnt
        
		var args = Array.prototype.slice.call(arguments);
        var fn;
        //var store = STORE_MAP.get(this);

        //현재프레임 종료여부 확인후 미종료시 wating에 추가한다.
        //현재 프레임의 실행여부 확인.
       
		if(this.yeildCnt > this.currentFrame) return WAITING;
        

		if( typeof arguments[0]  === 'function'){
            fn = args.shift();
			args.push(this);		//해당 인스턴스 전달
            args.push(resolve);		//인스턴스 종료 함수 전달.

            this.store.Yeild[this.currentFrame] = this.store.Yeild[this.currentFrame] || {};

            var state = this.store.Yeild[this.currentFrame].state;
            
            //이전 프레임 종료여부 확인.
            if(state === PENDING){
                console.log('[Runner]','pending,',this.currentFrame);
                this.store.Yeild[this.currentFrame+1] = {state: WAITING};
                this.waitingList.push({
                    fn: fn,
                    args : args
                });
            }else if(state === WAITING){
                this.store.Yeild[this.currentFrame] = {state: RESOLVE};
                console.log('[Runner]','start,',this.yeildCnt);

                //next로 넘어온 현재 프레임의 파라미터를 넘긴다.
                args.push(this.args);
                fn.apply(this, args);
            }
        }
        
        //return RESOLVE
    }

	//인스턴스 종료함수.
	//반환값을 어떻게ㅔ 전달할것인지?
	var resolve = function(self,param){

        //인덱스로 구분해야한다.
        /**
         * 각 함수에서 콜백으로 호출을하기 때문에 스코프체인으로 찾아야한다.
         * 여기선 this를 사용해서 인스턴스에 접근할 수 없음.
         */
        //var store = STORE_MAP.get(self);
        var store = self.store;

        console.log("[Runner]","done,",self.currentFrame);
        self.store.Yeild[self.currentFrame].state = RESOLVE;     //종료처리.
        ++self.currentFrame;

        //next Callback 실행.
        if(self.callback){
            self.callback(param);
        }

        // 대기중인 함수가 있으면 실행한다.
		var nextTask = self.waitingList.shift(); 
		if(nextTask)
            nextTask.fn.apply(self, nextTask.args);
    }


    function Generator(data,_fn){

		var instance = (this instanceof Generator) ? this : new Generator(data,_fn);
		instance.Yeild = Yeild;
        instance.yeildCnt = 0;      //next호출시마다 매번 실행마다 카운트
        instance.currentFrame = 1;  //현재 실행중인 프레임.
        instance.waitingList = [];  //현재프레임이 실행중에 요청이 들어온 프레임.
        
        // STORE_MAP.setAll(instance, {
		// 	fn : _fn,
		// 	Yeild : {}//현재 실행 위치, 종료여부.
        // });
        instance.store =  {
			fn : _fn,
			Yeild : {}//현재 실행 위치, 종료여부.
        }

        //프레임에 대한 정보를 기록한다. instance.store.Yeild를 이걸로 치환하자.
        instance.frame = {};
        instance.data = data;
        instance.next = Generator.prototype.next;

		return instance;
    }

    /*
        next를 호출할때 WAITE 상태의 프레임을 생성한다.
        프레임을 생성하고 대기열에 오른 작업을 실행하며 이전 프레임이 작업중일떄는 대기열에 올린다.=
        콜백함수의 인자로 결과값을 반환해야한다.
    */
    Generator.prototype.next = function next(){

        //var fn = STORE_MAP.get(this,'fn');
        var args = Array.prototype.slice.call(arguments)
        var fn = this.store.fn;
        var r = DEFAULT_RESULT;


        //프레임 생성.
        this.store.Yeild[this.currentFrame] = {state: WAITING};
        
        if(typeof args[args.length-1] === 'function') {
            this.callback   = args.pop();       //현재 프레임으 콜백
        }
        this.args       = args;         //현재 프레임의 인자.
		this.yeildCnt   = 0;            //실행 타겟 작업을 구분하기 위한 인자. 현재프레임과 비교한다.

        if(fn) {
            fn.call(this,this.data);

            // if(v) {
            //     r = {value: v,       done:false};
            // }else{
            //     //STORE_MAP.remove(this);
            //     delete this.store;

            //     //연산비용 절감을 위해 재정의
            //     this.next =  function(){
            //         console.log('[intance] next')
            //         return Object.assign({},DEFAULT_RESULT);
            //     };
            // }
        }
    }

    return Generator;
})()


function sayMaker (msg){

    return function(instance, resolve){
        console.log(msg);

        //종료시점을 알린다. 반드시 마지막 파라미터로 해야함.
        resolve(instance);
    }
}

function asyncMaker(fn,args){
    return function(instance, resolve){
        setTimeout(fn,0,instance, resolve);
    }
}

var $say1       = sayMaker(1);
var $say2       = sayMaker(2);
var $asyncSay2  = asyncMaker($say2);
var $say3       = sayMaker(3);


var works = [
    $say1,
    $asyncSay2,
    $say3
];


var gen = Generator(works, function(data){

    var item;
    var cnt = 0;
    while(item = data.pop()){
		
		debugger;
        this.Yeild(item);
    }
    // this.Yeild($say1);
    // this.Yeild($asyncSay2);
    // this.Yeild($say3); 
})

var  nextCb = function(){
    console.log("[Next_callback]")
}

gen.next(nextCb);


gen.next(nextCb); //pending
gen.next(nextCb); 
```







## ref
- [generator1](https://www.bsidesoft.com/?p=2053)
- [generator2](https://www.bsidesoft.com/?p=5494)
- [generator3](https://www.bsidesoft.com/?p=6037)
- [generatorForES3 (1)](https://www.bsidesoft.com/?p=2332)
- [generatorForES3 (2)](https://www.bsidesoft.com/?p=2337)
