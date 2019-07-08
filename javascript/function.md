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
------


**함수 정의
	1) 해당 함수에 Constructor 자격부여
		-new를 통해 객체를 만들어 낼 수 있게 됩니다.
		-이것이 함수만 new 키워드를 사용할 수 있는 이유다.

	2)해당 함수의 Prototype Object 생성 및 연결
		-함수를 정의하면 Prototype Object도 같이 생성된다
	
	생성된 함수는 prototype이라는 속성을 통해 Prototype Object라는 객체에 접근할 수 있다.
	

	**PrototypeObject
	=>일반적인 객체와 같으며 기본적인 속성으로 constructor와 _proto_를 가지고 있다.
		constructor : Prototype Object와 같이 생성되었던 함수를 가리킨다.
		_proto_     : Prototype Link다.
	=>일반적인 객체이므로 속성을 마음대로 추가/삭제 할 수 있다.
	

	**_proto
		객체가 생성될 때 조상이었던 함수의 Prototype Object를 가리킨다.
		

	**프토로타입 체인
		_proto_속성을 통해 상위 프로토타입과 연결되어있는 형태

	



#참고자료

*프로토타입
http://insanehong.kr/post/javascript-prototype/
https://medium.com/@bluesh55/javascript-prototype-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-f8e67c286b67


*함수
https://gist.github.com/qodot/1845fd02f14807d2eee9c58270ff1b2a


*스크립트 개념
http://bonsaiden.github.io/JavaScript-Garden/ko/
		
	
*this의 개념.
https://github.com/FEDevelopers/tech.description/wiki/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%97%90%EC%84%9C-%EC%82%AC%EC%9A%A9%EB%90%98%EB%8A%94-this%EC%97%90-%EB%8C%80%ED%95%9C-%EC%84%A4%EB%AA%85-1#31-%EB%A9%94%EC%86%8C%EB%93%9C-%EC%8B%A4%ED%96%89%EC%97%90%EC%84%9C%EC%9D%98-this

http://bonsaiden.github.io/JavaScript-Garden/ko/#function.constructors