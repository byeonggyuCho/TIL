# bind

bind() 메서드는 새로운 함수를 생성합니다.<br>
함수의 this 참조값을 bind의 매개변수로 설정한다.<br>
<br>
바인드로 생성한 함수를 호출하면 원래 함수를 래핑한 함수를 호출한다.


## Sytax
```js
func.bind(thisArg,arg1, arg2, ...)
```


### thisArg
호출되는 함수의 this변수에 전달될 값을 의미합니다.<br>
하지만 바인딩 함수를 new로 생성할 경우에는 이 매핑값이 무시됩니다.<br>

bind를 사용하여 setTimeout 내에 콜백 함수를 만들 때 this로 전달된 원시 값은 객체로 변환된다.<br>
bind할 인수(arguments)가 제공되지 않으면 실행 스코프 내의 this는 새로운 함수의 thisArg로 처리된다.<br>


### arg1, arg2..
대상함수가 실행될 때 인수로 적용될 인수.<br><br>



##  Description
bind() 메소드로 함수를 호출하면 새로운 함수가 생성된다고 앞서 설명했습니다.<br>
좀 더 정확히는 새롭게 생성되는 함수는 원래 함수를 감싸고있는(warp) 함수입니다.<br>
이렇게 생성된 바인딩 함수에는 내부 동작을 설명해줄 속성들이 있습니다.<br><br>

### Property

- \[\[BoundTargetFunction\]\] : 바인딩으로 감싼 원본 함수 객체.
- \[\[BoundThis\]\] : 바인딩 함수를 호출을 때 this 변수에 전달되는 값.
- \[\[BoundArguments\]\] : 바인딩 함수가 호출될 때 첫번째 매개변수로 전달된 arguments 객체.
- \[\[Call\]\] : 이 객체와 관련된 코드 실행. Functoin.prototype.call에 의해 호출됩니다. <br>
이 때 전달되는 매개변수들은 this변수와 
함수표현식에 의해 전달된 매개변수 리스트입니다.

바인딩된 함수가 호출될 때 \[\[BoundTargetFunction\]\]의 내부 메소드 \[\[Call\]\]을 호출합니다.<br>
\[\[Call\]\] 메소드는  Call(boundThis,args)와 같이 두개의 매개변수를 갖습니다.<br>
이 때 boundThis는 \[\[BoundThis\]\]이고 args는 함수가 호출될 대 전달되어 오는 \[\[BoundArguments\]\]이다.<br><br>


바인딩된 함수는 new 연산자를 사용하여 생성될 수도 있다. 그렇게 하면 대상함수가 마치 대신 생성된 것처럼 행동합니다.<br>
즉 전달된 this값은 무시되지만 앞에 붙인 매개변수들은 함수에 전달됩니다.<br>


## Example

### 바인딩된 함수 생성하기
bind()를 하는 가장 간단한 방법은 특정 this값으로 호출되는 함수를 만드는 것입니다.
이 때 주의해야할 점이 있습니다.<br>
특정 객체에서 추출한 메소드가 있다고 할때, 이 메소드를 실행하면 메소드 내부의 this는
원래 객체를 가르킬까요? 전역객체(window)를 가르킬까요?<br>

이렇게 추출된 메소드에서는 원래객체에 대한 참조를 잃어버립니다.<br>
즉 this값이 전역객체를 참조한다는 말이죠.<br>
이런 상황에서 bind()메소드를 이용하여 함수를 만들면 해결 할 수 있습니다.<br>

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


### 부분 적용 함수
다음으로 간단한 bind()의 방법은 특정 초기 인자가 있는 함수를 만드는 방법입니다.<br>
특정 초기 인수는 제공된 this값을 참조하며 바인딩 함수에 전달되어 바인딩 함수가 호출될 떄마다 대상 함수의 인수 앞에 삽입됩니다.<br>

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


### setTimeout과 함께 사용

window.setTimeout()내에서 기본으로 this 키워드는 window 객체로 설정된다.<br>
클래스 인스컨스를 참조하는 this를 필요로 하는 클래스 메소드로 작업하는 경우 인스턴스유지를 위해 명시해서 this를 콜백 함수에 바인딩 할 수 있다.<br>

```js
function LateBloomer(){
    this.petalCount = Math.ceil(Meth.random() * 12) +1;
}

// 1초 지체 후 bloom 선언
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


### 바로가기 생성.
bind()는 특정 this값을 필요로 하는 함수의 바로가기를 만들고 싶은 경우에 도움이 된다.<br>
가령 배열 같은 객체를 실제 배열로 변환하는데 사용하고 싶은 Array.prototype.slice를 취해라.<br>
이와같이 바로가기를 만들 수 있다.<br>

```js
var slice = Array.prototype.slice;

slice.apply(arguments)


```
위 로직은 bind()로 단순화할 수 있따. 다음 코드에서 slice는 Function.prototype의 apply() 함수에 바인된 함수다.<br>
this값을 Array.prototype의 slice함수로 설정한채 추가 apply()호출은 삭제될 수 있음을 의미한다.<br>

```js

var unboundSlice = Array.prototype.slice;
var slice = Function.prototype.apply.bind(unboundSlice)

slice(arguments)
```



### 생성자로 쓰이는 바인딩 함수.
new와 함께 쓰기 위한 바인딩 함수는 만들기 위해 특별별한 일을 할 필요가 전혀 없다.
그 결과 분명히 호출되는 바인딩 함수를 만들기 위해 특별하 아무것도 할 필요가 없다.
오히려 new를 사용해서만 호출되는 바인딩 함수를 요구하는 경우에도.
오로지 new를 사용하거나 호출해서만 바인딩 함수의 사용을 지원하고 싶은 경우 대상 함수는 그 제한을 강제해야한다.

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
```

```js
// Example can be run directly in your JavaScript console
// ...continuing from above

// Can still be called as a normal function 
// (although usually this is undesired)
YAxisPoint(13);

emptyObj.x + ',' + emptyObj.y;
// >  '0,13'

```


### shortcuts 만들기


```js
// same as "slice" in the previous example
var unboundSlice = Array.prototype.slice;
var slice = Function.prototype.apply.bind(unboundSlice);

// ...

slice(arguments);

```


### REF
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind