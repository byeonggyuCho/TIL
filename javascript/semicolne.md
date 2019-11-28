# SemiColone


## Intro
프로그래밍 언어에서 세미콜론은 한 문장이 끝났음을 알리는 기호입니다. 자바와 같은 컴파일 언어에서는 세미콜론을 필수로 붙여야하지만 자바스크립는 세미콜론 자동삽입 규칙(ASI, automatic semicolon insertion)에 따라 세미콜론을 삽입해주기 때문에 생략된 표현이 가능합니다.  


*(ASI, automatic semicolon insertion)*  
자바스크립트에서 세미콜론이 생략되어있는 경우 소스코드를 해석하기 전에 세미콜론을 삽입하는 것을 말합니다.   
아래 예제를 보면 ASI의 대략적인 동작은 이해할 수 있습니다.
```js
var a
a
=
3
console.log(a)
```

```js
var a; a = 3; console.log(a);
```
이런 특징때문에 세미콜론을 지워야한다. 붙여야한다 갑을논박이 펼쳐지집니다만 저는 붙이는 쪽을 지지합니다. 

```js
function getName() {
    return
        {
            name: 'cater'
        }
}

// 파서가 생각하는 코드
function getName() {
    return;
        {
            name: 'cater'
        };
}
```
이런 경우처럼 동작이 모호해지는 경우를 방지하기 위해서입니다. ASI의 동작을 기대하고 코드를 짜다보면 복잡한 삽입룰을 생각하지




## 요약
- 반드시 필요한 경우를 제외하면 ㅍ 가능하긴하지만 문맥이 모호해지는걸 방지하기 위해 명시적으로 달아주자!
- 하지만 이건 개인 기호의 문제다.
- 세미콜론이 문제가 되는 경우는 개행에 대한 ASI의 처리방식이다. 이 부분은 세미콜론 유무와 상관없이 발생한다.
- ASI 문제를 피하려면 ASI의 동작 원리를 이해하고 그에 맞게 코딩 스타일을 정립하는 것이 중요하다. 세미콜론 삽입을 강제할 필요는 없다.
- 쓰면 안된다는 측 주장은 쓰면 안되는 위치에 삽입해야할지 말아야할지 고민을 해야하기 떄문이라는 것.
- 행의 시작을 `[`,`(`,`로 하지말것, 꼭해야한다면 행의 시작에서 세미콜론을 붙여줄것.

<br><br>


## Use Case

### 1) 필수적인경우
- 세미콜론은 같은 줄에 둘 이상의 명령이 있을때 필수다.

```js
var i = 0; i++

var i = 0
    i++
```


### 2) 선택적인 경우
명령문을 분리하는데 사용되지만, 명령문 다음에 줄바꿈이 있으면 생략할 수 있다.
```js
var i;                        // variable declaration
i = 5;                        // value assignment
i = i + 1;                    // value assignment
i++;                          // same as above
var x = 9;                    // declaration & assignment
var fun = function() {...};   // var decl., assignmt, and func. defin.
alert("hi");                  // function call
```

### 3) 예외적인 경우.

```js
var y = x + f
(a + b).toString()
```

```js
var y = x + f(a + b).toString();
```


### 4) 권고하지 않는 경우.

#### 4.1) {}가 닫힌 뒤.
```js
// bad case
if(work){

};

while(work){

};

function makeCoffee(){

};
```
위와 같이 스코프가 닫힌 뒤에는 문법적으로나 명시적으로나 세미콜론을 넣을 필요가 없습니다.
단 `var obj = {};`와 같이 데이터 할당에 대해서는 세미콜론을 붙여야합니다.

#### 4.2) if, for, while, switch의 괄호후에 명령문
조건문이나 반복문에서 조건절뒤에 세미콜론을 붙이면 안됩니다.

```js
if(work);
{
    // do something
}

while(work);
{
    //do something;
}
```
이 경우 스코프의 내용이 실행되지 않고 종료됩니다.




## ASI 규칙.
- 다음 줄에 나오는 공백 아닌 첫 문자를 현재 문장과 이어서 해석할 수 없는 경우 세미콜론을 붙인다.
- 문장이 (, [, /, +, -로 시작할 경우 자바스크립트 인터프리터는 해당 문장을 이전 문장에 이어서 해석한다.

### 예외
- return, break, continue를 사용했을경우
- ++, --같은 전위연산이나 후위연산을 사용하는 경우

return, break, continue문을 사용하고 바로 다음에 줄바꿈이 오는 경우에는 자바스크립트가 줄바꿈으로 해석한다.

```js
function foo(){
    return
        "foo"
}

function bar(){
    return "bar"
}

```
여기서 foo는 return;로 해석되기 떄문에 undefined가 나온다.
return, break, continue문을 사용하는 경우 다음 토큰까지 이어서 붙여 쓰고 줄바꿈을 하지 말아야한다.

```js
x
++
y
```
위 코드는 상당히 모호하다.x의 전위연산자인가  y의 후위연산자인가? 정답은 `x; ++y`이다. 이 경우 첫번째 개행은 세미콜론으로 해석하여 ++연산자가 y를 연산한다. 





## 기타.

1. 변수선언시 
```js
const bill = {}
const jake = {}
const menlist = [bill, jake]
menlist.forEach(men => {
    men.hasGirlfrend = true;
})

const bill = {};
const jake = {};
const menlist = [bill, jake];
menlist.forEach(men => {
    men.hasGirlfrend = true;
});
```

2. 스코프
```js
const msg = "조회중입니다.."
(async function dosometingAsync() {

})())

const msg = "조회중입니다..";
(async function dosometingAsync() {

})());
```
3. 함수

```js
function foo() {
    return
        'foo'
}

function foo(){
    return 'foo';
}
```





## 권장.
세미콜론 자동삽입규칙에 맞추어 명시적으로 세미콜론을 삽입하는것을 추천함.
- 문장이(, [, /, +, - 로 시작하는 경우 방어적으로 ;콜론을 붙이는걸 추천한다.
- 세미콜론 자동삽입에 대한 규칙이 상당히 모호하기때문에 이걸 계산해서 세미콜론을 생략하는것은 굉장히 피곤하다. 명시적으로 삽입하는 것을 추천한다.

### REF
- [semicolon usecase on javascript](https://bakyeono.net/post/2018-01-19-javascript-use-semicolon-or-not.html)
- [semicolon guid](http://webframeworks.kr/tutorials/translate/javascript-semicolon/)