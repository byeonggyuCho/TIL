# Class Factory


## Intro

```js
//속성의 setter함수를 만드는 메이커 함수.
function setterMaker(prop){

    return function(){
        return arguments.length
            ? (this[prop] = arguments[0])
            : this[prop];
    }
}


function Display() {
    this.x = 0;
    this.y = 0;
}
Display.prototype.X = setterMaker('x');
Display.prototype.Y = setterMaker('y');


function Box(){
    Display.call(this);
    this.width = 100;
    this.height = 100;
}

Box.prototype = Object.create(Display.prototype,{
    constructor:{
        value: Box
    },
    W:{
        value: setterMaker('width')
    },
    H:{
        value: setterMaker('height')
    }
})

var box1 = new Box();
box1.W(200);
box1.H(200);
console.log('1',box1);

box1.width = 999;       //(A)
box1.height = 999;
console.log('2',box1);

```
위 예제에서 setterMaker를 통해서 인스턴스의 속성을 을 수정하는 메서드를 만들었다.  
문제점은 `A`에서 처럼 속성에 바로 접근이 가능하다는 점이다.


## 개선안 1
```js
function Display(){

    //인스턴스별 속성 저장소.
    var x = [];
    var y = [];

    //객체 메모리주소를 인덱스로 보관하는 배열.
    var id = [];

    function Display(){

        var i = id.length;
        id[i] = this;

        //해당 위치의 변수를 초기화.
        x[i] = 0;
        y[i] = 0;
    }

    Display.prototype.X = function(){

        var i = id.indexOf(this);

        return arguments.length
                ? (x[i] = arguments[0])
                : x[i];
    }


    Display.prototype.Y = function(){

        var i = id.indexOf(this);

        return arguments.length
                ? (y[i] = arguments[0])
                : y[i];
    }

    return Display;
}

```
이 방법은 속성을 밀실화 시킬 수 있지만 메서드를 사용할 떄마다 indexOf를 이용한 탐색과정을 거쳐야하는다는 단점이 있습니다.  
인스턴스의 수가 많아질 수록 탐색시간이 길어집니다.




## 개선안2

```js
function Display(){

    //인스턴스별 속성 저장소.
    var x = [];
    var y = [];

    //속성 저장소 배열의 인덱스 위치를 기록.
    var id = 0;

    function Display(){

        //인덱스 위치를 인스턴스 속성으로 부여.
        this.__id = id++;

        //해당 위치의 변수를 초기화.
        x[this.__id] = 0;
        y[this.__id] = 0;
    }

    Display.prototype.X = function(){

        var i = this.__id;

        return arguments.length
                ? (x[i] = arguments[0])
                : x[i];
    }


    Display.prototype.Y = function(){

        var i = this.__id;

        return arguments.length
                ? (y[i] = arguments[0])
                : y[i];
    }

    return Display;
}
```
인스턴스 키를 속성의 배열 인덱스로 수정하여 indexOf의 과정을 생략함. 하지만 이럴 경우 인스턴스의 `__id`속성만 수정하면 다른 인스턴스의 속성에 접근할 수 있으니 좀 더 나은 방법이 필요해보임.




## 개선안3
```js
var Display = (function (){

    //인스턴스 속성 저장소.
    var x = [];
    var y = [];

    //인스턴스의 속성저장소 배열의 인덱스를 기록.
    var id = 0;

    //래퍼함수.
    function makeGetId( $id){
        return function(){
            return $id;
        }
    }

    function Display(){

        this.id = makeGetId(id++);

        var i = this.id();

        //초기화.
        x[i] = 0;
        y[i] = 0;
    }

    Display.prototype = Object.create(Display.prototype,{
        X:{
            value: function(){

                var i = this.id();

                return arguments.length
                    ? (x[i] = arguments[0])
                    : x[i];
            };
        },
        Y:{
            value:  function(){

                var i = this.id();

                return arguments.length 
                    ? (y[i] = arguments[0]) 
                    : y[i];
            };
        }
    })


    return Display;
})();

var d = new Display();

d.X(50)
console.log(d.X());


var Box = (function(){

    var width = [];
    var height = [];

    function Box(){
        Display.call( this );
        var i = this.id();      //상속받음.
        width[i] = 100;
        height[i] = 100;
    }

    Box.prototype = Object.create(Display.prototype,{
        constructor:{
            value: Box
        },
        W:{
            value: function(){
                var i = this.id();
                return arguments.length
                    ? (width[i] = arguments[0])
                    : width(i);
            }
        },
        H:{
            value: function(){
                var i = this.id();
                return arguments.length
                    ? (height[i] = arguments[0])
                    : height(i);
            }
        }
    })

    return Box;
})()

var b1 = new Box();


b1.X(30)
b1.W(30)


```
큰 메모리 비용을 내면서 함수호출이라는 연산비용을 지불합니다. 하지만 indexOf보다는 작고 비교적 변수를 보호할 수 있습니다.



## 정리
결국 메모리를 아낄것인지 연산을 아낄것인지 결정을 해야합니다.  

1. 첫번째 방법은 indexOf에 대한 연산비용이 들지만 인스턴스의 키를 노출시키지 않습니다.
2. 두번째 방법은 인스턴스마다 키를 생성해야하지만 속성 호출시 연산비용이 주어들게 됩니다.
3. 세번째 방법은 id에 함수객체를 할당하여 메모리를 지불하고 함수호출시 id를 찾는 연산을 해야하지만 indexOf보다는 저렵합니다.

각 상황에 맞는 전략을 선택하는것이 좋겠습니다. 만일 속성을 호출하는 로직이 자주 사용된다면 메모리에 아이디를 등록하고 연산을 절약하는 것이 낫습니다.
예제를 정리하며 느낀점은 자바스크립트에서 지원하는 데이터콜렉션이 한정적이어서 추가 연산이나 추가 메모리가 사용되는게 아쉽습니다. 예를들어 객체의 주소값을 키로 설정하여 값을 저정할 수 있다면 indexOf의 연산을 피하면서 아이드를 생성하지 않을 수 있습니다.



## REF
- [자바스크립트 클래스 펙토리](https://www.bsidesoft.com/?p=320#%25ec%259e%2590%25eb%25b0%2594%25ec%258a%25a4%25ed%2581%25ac%25eb%25a6%25bd%25ed%258a%25b8-%25eb%25aa%25a8%25eb%2593%2588)