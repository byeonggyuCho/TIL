# Static Member

## Info
스태틱 속성과 기능함수는 변경하거나 변형되지 않고 사용되는 속성과 기능함수를 말한다. 즉 변경하지 않기를 바라는  속성과 함수이다.  
스태틱 변수와 메서드는 인스턴스를 생성하지 않고 사용이 가능해야한다. 이런점에서 prototype 객체에 메서드를 등록하는 것과 차이가 있다.  
또 스태틱 변수는 클래스를 통해서만 접근 가능해야한다.


## 공개 스태틱 멤버
생성자 속성에 추가함으로써 클래스 기반 언어와 동일한 문법을 사용할 수 있다.

```js
var Person = function(){};

// static Member
Person.say = function(){
    console.log("[static] Hi")
}

Person.prototype.say = function(){
    console.log("[prototype] Hi")
}

Person.say();

var p1 = new Person();
p1.say();
```

## 비공개 스태틱 멤버
모듈화 패턴을 사용하여 스태틱변수를 밀실화할 수 있다.

- 동일한 생성자 함수로 생성된 객체들이 공유하는 속성 또는 함수.
- 생성자 외붕체서는 접근 할 수 없다.


```js
var Person = (function(){

    //스태틱 변수.
    var counter = 0;
    var lastOne = null;
    var Person = function(name){
        counter++;
        lastOne = name;
        this.name = name || 'anonymous'
    }

    Person.getCount = function(){
        return counter;
    }

    Person.getLastOne = function(){
        return lastOne;
    }
    return Person;
}())

var p1 = new Person("Janny");
var p2 = new Person("Peter");
var p3 = new Person("Cater");

Person.getCount();
Person.getLastOne();
```



## QnA
- static 메서드를 수정 불가능하게 할순 없을까???

## Ref
- [](http://frontend.diffthink.kr/2016/06/blog-post.html)