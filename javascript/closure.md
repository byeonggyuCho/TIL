# Closure

클로저란 함수 실행이 종료되더라도 함수의 지역 변수 및 변수 스코프 객체의 체인 관계를 유지할 수 있는 구조를 말한다.  
외부함수의 실행 컨텍스트에서 내부함수가 참조중인 변수의 그룹을 closure라고한다.  
즉 closure의 기본은 내부에 함수를 선언하는 것이다.  
클러저를 만들기 위해선 아래 조건을 만족해야한다.

1. 외부함수는 내부함수를 반환한다.
2. 내부함수는 외부함수의 실행환경에서 실행된다.
3. 내부함수에서 사용되는 변수는 외부함수의 context에 있다.

이렇게 반환된 내부함수는 외부함수의 실행 환경을 공유한다.  
따라서 이 내부함수를 통해 외부함수의 context에 접근할 수 있다.




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
함수의 컨텍스트는 선언 시점에 결정된다.
따라서 Person(외부함수)에서 리턴되는 내부함수의 scope chain은
Person 변수객체가 포함되어있다.  
따라서 내부함수는 선언시점에 결정된 scope chain에 의해 private memeber(name)에 접근 가능하다.


```js
for (var i = 0; i < 5; i++) {
  $('#target' + i).on('click', function() {
    alert(i);
  });
}
```
이벤트에 할당할 함수가 변수 i를 참조하는걸 어떻게 막을 수 있을까?  
Closure를 이용해 함수의 scopeChain에 새롭게 생성된 변수를 끼워넣으면 된다.

```js
for (var i = 0; i < 5; i++) {
  (function(j) {
    $('#target' + j).on('click', function() {
      alert(j);
    });
  })(i);
}
```
이렇게 되면 j는 i를 참조하지 않은 독립적인 변수가 되고  
이벤트로 할당하는 함수는 외부함수의 context를 참조함으로써 문제를 해결할 수 있다.


## 클로저를 만들때 주의할 점.
메모리릭  
클로저를 저장하는 변수를 제 때 비워주지 않으면 메모리 문제가 생길 수 있다.
위 예제에서 사용이 끝난 시점에 person = null;을 해야한다.



## 용어정리
- private member : 매개변수가 아닌 외부함수에서 선언된 변수(i.g) name
- inner function : (i.g) greeting
- outer  function : (i.g) Person

## 예제


### 1. 카운터

1. 객체 리터럴 방식
```js
    var counter = {
        _count: 0,
         count: function() {
            return this._count += 1;
        }
    }

    console.log(counter.count()); // 1
    console.log(counter.count()); // 2
```


2. 생성자 함수 방식.
```js
    function Counter(){
        this._count = 0;
    }

    Counter.prototype.count = function() {
        return this._count += 1;
    };

    var counter = new Counter();
    var counter2 = new Counter();

    console.log(counter.count()) //1
    console.log(counter.count()) //2
    console.log(counter2.count()) //1
```

3. 클로저를 이용한 카운터
```js
  var counter = (function() {
      var _count = 0;

      return function() {
          return _count += 1;
      };
  })();

  console.log(counter());
  console.log(counter());
```

```js
    function counterFactory() {
        var _count = 0;

        return function() {
            _count += 1;

          return _count;
       };
    }

    var counter = counterFactory();
    var counter2 = counterFactory();

    console.log(counter()); //1
    console.log(counter()); //2
    console.log(counter2()); //1


  var counter = counterFactory();

    var app = {
        counter: counter
    };

    var app2 = {
        counter: counter
    };

    console.log(app.counter()); //1
    console.log(app.counter()); //2

    console.log(app2.counter()); //3
```
- 내부 변수(_count)를 은닉화 했다


4. 커링을 이용한 카운터

```js
    function counterFactoryMaker(incValue) {
        return function factory(initValue) {
            var _count = initValue;

            return function counter() {
                return _count += incValue;
            };
        };
    }

    var counterFactory = counterFactoryMaker(2);
    var counter = counterFactory(0);
    var counter2 = counterFactory(1);

    console.log(counter()); // 2
    console.log(counter()); // 4

    console.log(counter2()); // 3
    console.log(counter2()); // 5
```

5. 객체와 클로저를 혼영한 카운터(모듈패턴)
```js
    function counterFactory2() {
        var _count = 0;

        function count(value) {
            _count = value || _count;

            return _count;
        }

        return {
            count: count,
            inc: function() {
                return count(count() + 1);
            },
            dec: function() {
                return count(count() - 1);
            }
        };
    }

    var counter = counterFactory2();

    console.log(counter.inc());
    console.log(counter.inc());
    console.log(counter.dec());
```

```js
   function counterFactory2Ext() {
        var counter = counterFactory2();
        var count = counter.count;

        counter.inc = function() {
            return count(count() + 2);
        };

        return counter;
    }

    var counterExt = counterFactory2Ext();

    console.log(counterExt.inc()); // 2
    console.log(counterExt.inc()); // 4
    console.log(counterExt.inc()); // 6
    console.log(counterExt.dec()); // 5
```

6. 생성자함수와 함께쓴 클로저
```js
    function Counter() {
        var _count = 0;

        this.count = function(value) {
            _count = value || _count;
            return _count;
        }
    }

    Counter.prototype.inc = function() {
        var count = this.count;

        return count(count() + 1);
    };

    Counter.prototype.dec = function() {
        var count = this.count;

        return count(count() - 1);
    };

    var counter = new Counter();

    console.log(counter.inc()); // 1
    console.log(counter.inc()); // 2
    console.log(counter.inc()); // 3
```


## REF
- [closure](https://blog.shiren.dev/2016-06-27-%ED%81%B4%EB%A1%9C%EC%A0%80,-%EA%B7%B8%EB%A6%AC%EA%B3%A0-%EC%BA%A1%EC%8A%90%ED%99%94%EC%99%80-%EC%9D%80%EB%8B%89%ED%99%94/)
- [스코프와 클로져 by toast](https://meetup.toast.com/posts/86)