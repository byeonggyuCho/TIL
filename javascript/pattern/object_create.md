# Object create

## Intro
같은 구조를 가지는 객체를 만들기 위해선 어떻게 해야할까?  
Factory Function과 Constructor Function을 이용한 방법이 있다.



## Object literal
```js
const circle = {
    radius : 1,
      location : {
        x: 1,
          y : 1
    },
      draw : function (){ // method
        console.log('draw');
    }
};

```
- 키와 값으로 이뤄져있다.
- 속성은 dot notation으로 접근한다.
- property와 method를 정의한다.
    - 프로퍼티의 경우 값을 가지고 있는 경우 사용되고 로직을 정의하는 경우 메소드라고 한다.


## Factory Functoin
```js
function createCircle(radius){
    return {
        radius : radius,
        draw : function(){
            console.log('draw')
        }
    };
}

var circle1 = createCircle(1);
var circle2 = createCircle(2);
```


## Constructor Function
```js
function Circle(radius){
    this.radius = radius;
    this.draw = function() {
        console.log('draw');
    }
}
// return this;  자동으로 this객체가 리턴됨

var circle = new Circle(1);
```

- 생성자함수는 반드시 대문자로 시작해야한다.
- property를 지정하기 위해서 `this`연산자를 사용한다.
    - `this`는 코드를 실행시키고 있는 개체를 가리키는 역할
- 메모리에 빈객체를 가지고 있고 `this`를 해당 빈 객체를 가리키게 한후 dot notation을 사용해서 여러 property를 정한다.
- `new`연산자를 이용해여 새로운 인스턴스를 만든다.

**new 연산자가 하는일** 
1. new는 먼저 빈 객체를 만든다.
2. this가 해당 객체를 기리키게 만든다. 기본값으로 `this`는 전역 객체를 기리키고 있다.
    - 브라우저에서 전역객체는 window이기 때문에 new를 사용하지 않으면 `this`는 Window를 가리킨다.
3. 그 후 함수에서 해당 객체를 반환한다.


### ref
- [velog](https://velog.io/@imacoolgirlyo/JS-Object-Constructors)