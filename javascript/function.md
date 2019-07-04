# function

함수의 내부에는 arguments, this라는 객체가 있다.




this : 실행컨텍스트를 참조한다.

arguments.callee

caller : 해당함수를 호출한 함수에 대한 참조를 저장한다.

apply() :
call() 매개변수를 전달해 호출하는 것이 아닌 this를 바꾼다.
즉 해당 함수가 참조하는 실행 컨텍스르를 바꾼다.

### apply()
 매개변수로 소유자 함수에 넘길 this.와 매개변수 배열을 받는다.
``` js
function sum(num1, num2){
    return num1 + num2;
}

function callSum1(num1, num2){
    return sum.apply(this, arguments);
}

console.log(callSum1(10,10));
```


### bind()
새로운 함수 인스턴스를 생성한다.<br>
이때 새로 생성된 함수의 this는 bind함수의 매개변수로 전달된 객체의 실행컨텍스가 된다.


``` js
window.color = "red"; 
var o = { color: "blue" }; 

function sayColor(){ 
    alert(this.color); 
} 

var objectSayColor = sayColor.bind(o); 

objectSayColor(); // blue
```
