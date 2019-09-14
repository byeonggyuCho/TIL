# bind


bind() 메서드는 새로운 함수를 생성한다.
함수의 this 참조값을 bind의 매개변수로 설정한다.

바인드로 생성한 함수를 호출하면 원래 함수를 래핑한 함수를 호출한다.


## 매개변수

thisArg
바인딩 함수가 대상 함수의 this에 매핑할 값.
바인딩 함수를 new로 생성할 경우에는 이 매핑값이 무시된다.
bind를 사용하여 setTimeout 내에 콜백 함수를 만들 때 this로 전달된 원시 값은 객체로 변환된다.
bind할 인수(arguments)가 제공되지 않으면 실행 스코프 내의 this는 새로운 함수의 thisArg로 처리된다.


arg1, arg2..
대상함수의 인수로 적용될 인수.


## Property

- [[BoundTargetFunction]] : 바인딩으로 감싼 원본 함수 객체
- [[BoundThis]] : 감싸진 함수를 호출ㅎㅆ을 떄 항상 전달되는 값.
- [[BoundArguments]] : 감싸진 함수가 호출될 때 첫번째 인수로 사용되는 값들의 목록
- [[Call]] : 이 객체와 관련된 코드 실행. 함수 호출 식을 통해 호출된다. 내부 메소드의 인수는 this 값 및 호출식으로 함수에 전달되는 인수를 포함하는 목록이다.


바인딩된 함수가 호출될떄 [[BoundTargetFunction]]의 내부 메소드 [[Call]]을 호출한다.
[[Call]]은 Call(boundThis,args)와 같은 인자를 가진다. 이 때 boundThis는 [[BoundThis]]이고 args는 함수가 호출될 대 전달되어 오는 
[[BoundArguments]]]이다.


바인딩된 함수는 new 연산자를 사용하여 생성될 수도 있다. 그렇게 하면 대상함수가 마치 대신 생성된 것처럼 행동한다.
제공된 this값은 무시된다.
앞에 붙인 prepend 인수는 에뮬레이트된 함수에 제공된다.


## Example

### 바인딩된 함수 생성하기
호출 방법과 관계없이 특정 this값으로 호출하는 함수를 생성하기.
특정 객체의 메소드를 추출한뒤 실행하면 원본 객체의 this값을 상실한다.
이를 위해 bind를 사용할 수 있다.


```js
this.x = 9;
var module = {
  x: 81,
  getX: function() { return this.x; }
};

module.getX(); // 81

var retrieveX = module.getX;
retrieveX();
// 9 반환 - 함수가 전역 스코프에서 호출됐음

// module과 바인딩된 'this'가 있는 새로운 함수 생성
// 신입 프로그래머는 전역 변수 x와
// module의 속성 x를 혼동할 수 있음
var boundGetX = retrieveX.bind(module);
boundGetX(); // 81



```


### 부분 적용 함수
미리 지정된 초기 인수가 있는 함수를 만드는 방법
지정될 초기 인수가 있다면 제공된 this값을 따르고 바인딩 된 함수에 전달되어 바인딩 된 함수가 호출될 떄마다 대상 함수의 인수앞에 삽입된다.

```js
function list(){
    return Array.prototype.slice.call(arguments)
}

var list1 = list(1,2,3);

// 선행될 인수를 설정하여 함수를 생성한다.
var leadingThirtySevenList = list.bind(null, 37);
var list2 = leadingThirtySevenList();
var list3 = leadingThirtySevenList(1,2,3);


function addArguments(arg1, arg2){
    return arg1 + arg2
}

var result1 = addArguments(1,2);

//첫 번째 인수를 지정하여 함수를 생성한다.
var addThirtySeven = addArguments.bind(null, 37);

var result2 = addThirtySeven(5);

// 두 번쨰 인수는 무시된다.
var result3 = addThirtySeven(5,10);

```


### setTimeout과 함께 사용

window.setTimeout()내에서 기본으로 this 키워드는 window 객체로 설정된다.
클래스 인스컨스를 참조하는 this를 필요로 하는 클래스 메소드로 작업하는 경우 인스턴스유지를 위해 명시해서 this를 콜백 함수에 바인딩 할 수 있다.

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
bind()는 특정 this값을 필요로 하는 함수의 바로가기를 만들고 싶은 경우에 도움이된다.
가령 배열 같은 객체를 실제 배열로 변환하는데 사용하고 싶은 Array.prototype.slice를 취해라.
이와같이 바로가기를 만들 수 있다.

```js
var slice = Array.prototype.slice;

slice.apply(arguments)


```
위 로직은 bind()로 단순화할 수 있따. 다음 코드에서 slice는 Function.prototype의 apply() 함수에 바인된 함수다.
this값을 Array.prototype의 slice함수로 설정한채 추가 apply()호출은 삭제될 수 있음을 의미한다.

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




### REF

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/bind