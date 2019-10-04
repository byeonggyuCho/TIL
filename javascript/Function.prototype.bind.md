# bind

bind() 메서드는 새로운 함수를 생성합니다.  
함수의 this 참조값을 bind의 매개변수로 설정한다.  
  
바인드로 생성한 함수를 호출하면 원래 함수를 래핑한 함수를 호출한다.


## Sytax
```js
func.bind(thisArg,arg1, arg2, ...)
```


### thisArg
호출되는 함수의 this변수에 전달될 값을 의미합니다.  
하지만 바인딩 함수를 new로 생성할 경우에는 이 매핑값이 무시됩니다.  

bind를 사용하여 setTimeout 내에 콜백 함수를 만들 때 this로 전달된 원시 값은 객체로 변환된다.  
bind할 인수(arguments)가 제공되지 않으면 실행 스코프 내의 this는 새로운 함수의 thisArg로 처리된다.  


### arg1, arg2..
대상함수가 실행될 때 인수로 적용될 인수.    



##  Description
bind() 메소드로 함수를 호출하면 새로운 함수가 생성된다고 앞서 설명했습니다.  
좀 더 정확히는 새롭게 생성되는 함수는 원래 함수를 감싸고있는(warp) 함수입니다.  
이렇게 생성된 바인딩 함수에는 내부 동작을 설명해줄 속성들이 있습니다.    

### Property

- **\[\[BoundTargetFunction\]\]** : 바인딩으로 감싼 원본 함수 객체.
- **\[\[BoundThis\]\]** : 바인딩 함수를 호출을 때 this 변수에 전달되는 값.
- **\[\[BoundArguments\]\]** : 바인딩 함수가 호출될 때 첫번째 매개변수로 전달된 arguments 객체.
- **\[\[Call\]\]** : 이 객체와 관련된 코드 실행. Functoin.prototype.call에 의해 호출됩니다.   
이 때 전달되는 매개변수들은 this변수와 
함수표현식에 의해 전달된 매개변수 리스트입니다.

바인딩된 함수가 호출될 때 **\[\[BoundTargetFunction\]\]** 의 내부 메소드 **\[\[Call\]\]** 을 호출합니다.  
**\[\[Call\]\]** 메소드는  Call(boundThis,args)와 같이 두개의 매개변수를 갖습니다.  
이 때 boundThis는 **\[\[BoundThis\]\]** 이고 args는 함수가 호출될 대 전달되어 오는 **\[\[BoundArguments\]\]** 이다.    


바인딩된 함수는 new 연산자를 사용하여 생성될 수도 있다. 그렇게 하면 대상함수가 마치 대신 생성된 것처럼 행동합니다.  
즉 전달된 this값은 무시되지만 앞에 붙인 매개변수들은 함수에 전달됩니다.  


## Example

### Ex1.바인딩된 함수 생성하기
bind()를 하는 가장 간단한 방법은 특정 this값으로 호출되는 함수를 만드는 것입니다.
이 때 주의해야할 점이 있습니다.  
특정 객체에서 추출한 메소드가 있다고 할때,   
이 메소드를 실행하면 메소드 내부의 this는 원래 객체를 가르킬까요? 전역객체(window)를 가르킬까요?  

이렇게 추출된 메소드에서는 원래객체에 대한 참조를 잃어버립니다.  
즉 this값이 전역객체를 참조한다는 말이죠.  
이런 상황에서 bind()메소드를 이용하여 함수를 만들면 해결 할 수 있습니다.  

```js
this.x = 9;
var module = {
  x: 81,
  getX: function() { 
      return this.x; 
  }
};

module.getX(); // 81


var retrieveX = module.getX;     //객체로 부터 메소드 추출.
retrieveX();                     // 9  전역 스코프에서 호출됐음

// module과 바인딩된 'this'가 있는 새로운 함수 생성
// 메소드 내의 this가 module을 가르키므로 객체 내부 속성인 x를 참조한다.
var boundGetX = retrieveX.bind(module);
boundGetX(); // 81
```


### Ex2. 부분 적용 함수
다음으로 간단한 bind()의 방법은 특정 초기 인자가 있는 함수를 만드는 방법입니다.  
특정 초기 인수는 제공된 this값을 참조하며 바인딩 함수에 전달되어 바인딩 함수가 호출될 떄마다 대상 함수의 인수 앞에 삽입됩니다.  

```js
function list(){
    return Array.prototype.slice.call(arguments)
}

function addArguments(arg1, arg2){
    return arg1 + arg2
}


var list1 = list(1,2,3);                //[1,2,3]
var result1 = addArguments(1,2);        //3

// Create a function with a preset leading argument
var leadingFiveList = list.bind(null, 5);
var list2 = leadingFiveList();          //[5]
var list3 = leadingFiveList(1,2,3);     //[5,1,2,3]



// Create a function with a preset first argument.
var addFive = addArguments.bind(null, 5);
var result2 = addFive(1);        // 5+1 = 6
var result3 = addFive(1,3);      // 5+1 = 6 (두번째 변수 무시)
```


### Ex3. setTimeout과 함께 사용

window.setTimeout()내에서 기본으로 this 키워드는 window 객체로 설정된다.  
this가 인스턴스를 참조해야하는 경우, 인스턴스를 유지하기 위해 콜백함수에 명시적으로 바인딩 할 수 있습니다.  

```js
function LateBloomer(){
    this.petalCount = Math.ceil(Meth.random() * 12) +1;
}

// 1초 지체 후 bloom 선언
// bind를 이용해서 callback문맥에서 LateBloomer를 참조함.
LateBloomer.prototype.bloom = function(){
    window.setTimeout(this.declare.bind(this), 1000);
}


LateBloomer.prototype.declare = function(){
    console.log('I am a beatiful flower with '+ this.petalCount, ' petals!');
}

var flower = new LateBloomer();
flower.bloom();
// 1초 뒤에 declare  메소드 실행

```


### Ex4.  shortcuts 만들기

bind()는 특정한 this값을 요구하는 함수에 대한  shortcuts를 만들때 사용할 수 있습니다.
  
 Array.prototype.slice를 이용해서 유사배열 객체를 배열로 변환하는 예제에서 다음처럼 shorcuts를 만들 수 있습니다.
 
```js
var slice = Array.prototype.slice;

// ...

slice.apply(arguments);
```

bind()를 이용하면 위 소스는 아래처럼 단순화 할 수있습니다.  
다음 코드에서 slice는 Function.ptrototype.apply 메소드에 대한 바운딩 함수입니다.  
이때 this 값은 Array.prototype.slice로 설정했습니다.  
이건 apply()메소드를 추가적으로 호출하는걸 줄일 수 있음을 의미합니다.  

```js
// same as "slice" in the previous example
var unboundSlice = Array.prototype.slice;
var slice = Function.prototype.apply.bind(unboundSlice);

// ...

slice(arguments);
```



#### 참고 : Array.prototype.Slice를 이용한 유사배열 객체 다루기.
slice 메서드는 유사배열객체를 배열로 바꿀 때 사용할 수 있다.

```js
function list() {
  return Array.prototype.slice.call(arguments);
}

var list1 = list(1, 2, 3); // [1, 2, 3]
```

바인딩은 Function.prototype.call의 기능으로 수행할 수 있으며,  
Array.prototype.slice.call 대신 [].slice.call(arguments)를 사용하여 코드를 줄일 수 있다.  

```js
var unboundSlice = Array.prototype.slice;
var slice = Function.prototype.call.bind(unboundSlice);

function list() {
  return slice(arguments);
}

var list1 = list(1, 2, 3); // [1, 2, 3]
```




### Ex5. 생성자로 쓰이는 바인딩 함수.


타겟함수가 만든 새로운 인스턴스를 구성할때, 바인딩 함수는 new 연산자와 함께 쓰면 좋습니다.  
바인딩 함수가 값을 구성하는데 사용되는 경우, 제공된 this는 무시되지만 arguments는 생성자를 호출할때 앞부분에 전달됩니다.  

```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function() { 
  return this.x + ',' + this.y; 
};

var p = new Point(1, 2);
p.toString(); // '1,2'

// not supported in the polyfill below,

// works fine with native bind:

var YAxisPoint = Point.bind(null, 0/*x*/);


var emptyObj = {};
var YAxisPoint = Point.bind(emptyObj, 0/*x*/);

var axisPoint = new YAxisPoint(5);
axisPoint.toString(); // '0,5'

axisPoint instanceof Point; // true
axisPoint instanceof YAxisPoint; // true
new Point(17, 42) instanceof YAxisPoint; // true


// Can still be called as a normal function 
// (although usually this is undesired)
YAxisPoint(13);

emptyObj.x + ',' + emptyObj.y;
//   '0,13'

```

new 연산자와 함께 쓰기 위한 바인딩 함수를 만들기 위해서 특별히 할게 없습니다.  
호출되는 바인딩 함수를만들기 위해 특별히 할 작업이 없습니다.  
오히려 new를 사용해서만 호출되는 바인딩 함수를 요구하는 경우에도 마찬가지입니다.  
  
반드시 new연산자를 사용해야하는 경우나 함수호출에서만 바인딩 함수를 지원하고 싶은 경우에는
타겟 함수는 그 제한을 강제해야합니다.
  








### REF
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice