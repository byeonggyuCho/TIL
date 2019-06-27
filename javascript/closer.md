# Closure

클로저란 함수 실행이 종료되더라도 함수의 지역 변수 및 변수 스코프 객체의 체인 관계를 유지할 수 있는 구조를 말한다.<br>
클러저를 만들기 위해선 아래 조건을 만족해야한다.

1. 외부함수는 내부함수를 반환한다.
2. 내부함수는 외부함수의 실행환경에서 실행된다.
3. 내부함수에서 사용되는 변수는 외부함수의 context에 있다.

이렇게 반환된 내부함수는 외부함수의 실행 환경을 공유한다.<br>
따라서 이 내부함수를 통해 외부함수의 context에 접근할 수 있다.

Inner function has access to the varialbes in the oter function scope even after  outer function has returned.<br>
Why that is possible, Execution environment of outer Function is maintained.



```js
function Person(_name){
    var name = _name;
    return {
        "greeting" : function(message){
            console.log(message+" " +name );
        }
    }
};

var person = Person('John');
person.greeting('Hello ');
person.greeting('Hi '); 
```

## 용어정리
- private member : (i.g) name 
- inner function : (i.g) greeting
- outer  function : (i.g) Person
