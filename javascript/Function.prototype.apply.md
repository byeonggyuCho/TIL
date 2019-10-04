# Apply

## 설명
주어진 this값과 배열로 재공되는  argumensts로 함수를 호출한다.


## 구문
```js
fn.apply(thisArg, [argsArray])
```

### 매개변수.


#### thisArg
호출되는 함수의 this변수로 제공된다   
이 매개변수는 입력하는 값과 실질적으로 적용되는 값이 달라지는데
실질적 적용은 다음과 같다.  
non-strict Mode에서는 null and undefined는 global object로 치환된다.  
이 값은 필수값이다.

#### argsArray
Optional. 호출되는 함수에 제공할 매개변수값.  
유사배열객체나 값이 없을 경우 null or undefined



#### 반환값
함수를 호출한 결과값.



## 설명
apply를 사용하면 이미 선언된 함수의 this변수에 다른값을 참조시켜서 호출할 수 있습니다.  
또 객체의 메소드를 다른 객체가 상속받도록 할 수 있습니다.  
다시 말해 새로운 객체에 똑같은 메소드를 중복해서 쓰지 않아도 되는거죠!    

apply는 call()과 비슷합니다.  
차이점은 call()은 두 번째 매개변수로*arguments* 타입만 지원한다는 거죠.  
apply에서는*arguments* 대신에*arguments Array*를 사용할 수 있습니다!  
또 Array literal이나 Array Object를 사용할 수도 있죠.

```js
// Array literal
func.apply(this, ['eat', 'banana'])

// Array Object
func.apply(this, new Array('eat', 'banana'));
```

물론 *arguments*도 사용가능합니다.  
*arguments*에 대해 간략히 술명하자면 함수의 로컬 변수입니다.  
호출된 함수에서 매개변수로 정의되지 않은 변수들까지 사용 가능하죠.

그렇기 때문에 apply 메소드를 사용할때 호출된 함수의 매개변수들을 다 알 필요가 없습니다.
*arguments*에 담겨 있기 때문이죠.  
*arguments*만 사용하면 호출된 함수에 전달된 모든 매개변수들을 전달할 수 있습니다.  

EC5 이후로 여러분은 유사 배열 객체또한 사용가능합니다.  
예를 들면  Dom의 NodeList나  { 'length': 2, '0': 'eat', '1': 'bananas' }같은 커스텀 객체가 사용가능하다는 얘기죠.  

    <NOTE>
    NodeList는 Array가 아닙니다. 하지만 배열과 비슷하죠.
    그래서 유사배열(array-like)이라고 합니다.
    배열의 메소드를 사용하고 싶다면
    Array.from()메소드를 이용해 Array로 바꾼뒤 사용하면 됩니다!

    하지만 위 두가지는 구닥다리 브라우저에서 지원을 안할지 모르니.
    웹 호환성을 고려한 NodeList 루프 방법을 하나 소개합니다.
    이 포스팅의 주제와도 맞물려 있으니 참고 바랍니다.

```js
//call메소드를 이용한 Array.prototype.foreEach 호출.
var list = document.querySelectorAll('input[type=checkbox]');
Array.prototype.forEach.call(list, function (checkbox) {
  checkbox.checked = true;
});
```




## 예제

### Apply를 이용하여 배열 병합.
배열에 요소를 추가할때 Array.prototype.push를 사용하면 됩니다. 가장 쉬운 방법이죠.  
물론 *push*메소드는 복수 매개변수도 한번에 추가할 수  있습니다.  
```js
var array = ['a','b'];
array.push('c','d')
```
하지만 *push*를 이용해 배열의 요소를 추가해야할 때는 어떻게 할까요?  
```js
var array = ['a','b'];
array.push(['c','d']);
```
이런 방식은 우리가 원하는 결과와 좀 다릅니다.  
우리가 원하는건 개별적인 요소가 추가되는 것이데
Array Object를 하나의 element로 추가되죠.  
Array의 element로 Array가 들어가는 꼴이 되는겁니다.  

물론 Array.prototype.concat을 이용하면 병합이 가능합니다.
하지만 기존의 Array에 요소가 추가되는 것이 아니라.  
요소가 추가된 Array가 복제되죠.  

이런 경우, *apply*를 이용하면 간단히 해결 가능합니다.
```js
var array = ['a','b']
var elements = ['c','d','e'];
array.push.apply(array, elements);
```
개인적으로 첫번째 파라미터에 array를 넣는것이 헷깔려서 첨언합니다.  
push의 타겟 즉 push를 호출할 객체가 첫번째 매개변수가 되어야하니
array가 첫번째 매개변수로 전달하는 것이죠.  



### 내장 함수(functions built-in)에 사용  
apply를 잘 사용하면 내장함수를 응용할 수 있습니다.  
apply를 사용하면 배열의 형태로 매개변수를 전달할 수 있다는 점을 응용한거죠.  
이렇게 하면 불필요하게 루프로직을 짤일이 많이 줄어듭니다.  
한 가지 예로 *Math.max*, *Math.min*을 보여드리죠.  
    

```js
var numbers = [5,6,2,3,7]

//Math.max(numbers[0],numbers[1],numbers[2],numbers[3],numbers[4]);
//Math.max(5,6,2,3,7);
var max = Math.max.apply(null, numbers);
var min = Math.min.apply(null, numbers);


// min, max Algorithm
var max, 
    min;

for (var i = 0; i < numbers.length; i++) {
  if (numbers[i] > max) {
    max = numbers[i];
  }
  if (numbers[i] < min) {
    min = numbers[i];
  }
}
```
*apply*를 이용해서 못 생긴 코드를 쌈박하게 바꿔봤습니다.  
하지만 *apply*를 사용할 때 조심해야할 점이 있습니다.  
자바스크립트 엔진의 매개변수 제한이 있다는 점이죠.  
매개변수의 한도는 자바스크립트 엔진에 따라 다릅니다.  
따라서 어떤 엔진에서는 예외가 생길 수 있습니다.  
혹은 멋대로 파라미터수를 제한 할 수도 있죠. 5만개를 지원할 경우 5만 1개부터는 전달이 안된다는 식으로요.  

예를 위해 매개변수의 갯수제한이 4개인 예를 들어봅시다.  
 

```js
function minOfArray(arr) {
  var min = Infinity;
  var QUANTUM = 32768;

  for (var i = 0, len = arr.length; i < len; i += QUANTUM) {
    var submin = Math.min.apply(null,  arr.slice(i, Math.min(i+QUANTUM, len)));
    min = Math.min(submin, min);
  }

  return min;
}

var min = minOfArray([5, 6, 2, 3, 7]);


```

### constructors chain에 사용하기.
여러분은 자바스크립트 처럼 객체의 생성자함수 체인에 apply를 사용할 수 있습니다!  
아래 예제에서는 global *Function*객체의 메소드를 만들겁니다.  
매개변수의 리스트를 개별적으로 전달하는 대신에 유사배열을 전달하는 식으로 만들어보죠.
    

```js
Function.prototype.construct = function(aArgs) {
  var oNew = Object.create(this.prototype);
  this.apply(oNew, aArgs);
  return oNew;
};
```

예제에서 사용한 *Object.crate()*메소드가 생소하게 느껴질 수 있습니다.  
아래의 코드는 *Object.crate()*의 대안으로 사용할 수 있습니다.    


```js
// Object.__proto__
Function.prototype.construct = function (aArgs) {
  var oNew = {};
  oNew.__proto__ = this.prototype;
  this.apply(oNew, aArgs);
  return oNew;
};


// closures
Function.prototype.construct = function(aArgs) {
  var fConstructor = this, fNewConstr = function() { 
    fConstructor.apply(this, aArgs); 
  };
  fNewConstr.prototype = fConstructor.prototype;
  return new fNewConstr();
};

// Function객체의 생성자(constructor)
Function.prototype.construct = function (aArgs) {
  var fNewConstr = new Function("");
  fNewConstr.prototype = this.prototype;
  var oNew = new fNewConstr();
  this.apply(oNew, aArgs);
  return oNew;
};
```

다시 본론으로 들어와서 앞서 만든 construct메소드를 사용하는
예제입니다.    


```js
function MyConstructor() {
  for (var nProp = 0; nProp < arguments.length; nProp++) {
    this['property' + nProp] = arguments[nProp];
  }
}

var myArray = [4, 'Hello world!', false];
var myInstance = MyConstructor.construct(myArray);

console.log(myInstance.property1);                // logs 'Hello world!'
console.log(myInstance instanceof MyConstructor); // logs 'true'
console.log(myInstance.constructor);              // logs 'MyConstructor'
```


    <NOTE>
    위 예제에서 사용한 Function.construct 메소드는 Date같은 네이티브 생성자함수에서 작동을 안 합니다. 
    이런 경우에는 Function.prototype.bind 메소드를 사용해야하죠.

    예를 들어 Date 생성자에 [2012, 11, 4]를 매개변수로 전달해야한다고 생각해봅시다.
    이 경우

    new (Function.prototype.bind.apply(Date, [null].concat([2012, 11, 4])))()

    이렇게 사용할 수 있습니다.
    물론 이건 최선의 방법은 아니죠.
    아마 몇몇 환경에서는 동작도 안 할겁니다.



### 후기.
mnd 참 친절하다.  
그리고 번역 생각보다 빡세다.  
중간에 말투가 바뀌었는데 작업을 끊어서 해서 그렇다.  
다중이처럼 보일 수 있으니 수정해야지 오늘은 말고.


### REF
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply#Using_apply_and_built-in_functions
