# class for ES3

## Intro 
ES5에서 자바문법같은 new 연산자를 지양하면서 Object.create를 이용한 객체 생성방식을 제안했지만 
ES6에서 결국 OOP적 접근방식을 토대로 자바스크립트의 프로토타입의 개념을 은닉화하고 추상화하여 개발자가 신경을 덜 쓰도록 만들었습니다.  
class문법의 특징을 다시 정리해보면서 ES6에서는 어떻게 표현할 수 있는지 알아보겠습니다.


## ES5의 클래스 문법.
철저하게 new연산자를 지양해서 객체를 생성하는 방법을 소개합니다. 기존에 유일하게 `__proto__`를 할당하는 방법이었던 new연산자 외에 
Object.create라는 새로운 API로 프로토타입체인을 할당할 수 있게 되었습니다.

```js
var prototypeObject = {
    method1: function(){},
    method2: function(){}
};

var property = {
    a:{value:0, writable:true},
    b:{value:0, writable:true}
};

var initializer = function(obj,a,b){

    //프로퍼티 이름을 하드코딩할 수 밖에 없음.
    obj.a = a;
    obj.b = b;
    return obj;
}

// 1.인스턴스 생성
var instance = Object.create(prototypeObject, property);

// 2.속성 초기화.
initializer(instance,2,3);
```
new연산자를 완벽히 빼고 인스턴스를 생성하다보니 `initalizer`라는 애매한 함수가 생겼습니다.  
이런 모호한 시절을 지나 ES6에서는 다시 new연산자를 적극적으로 사용했고 Class라는 문법을 만들었습니다.  
프로토타입의 개념을 은닉하고 런타임 안정성을 확장했으며 extends, super등의 개념을 도입하여 OOP적 환경을 제공한것이죠.  
완벽한 태도전홥입니다.


## ES6의 Class
이제 ES6의 Class문법을 알아보겠습니다. 사실 깊이 알아보려면 꽤 복잡한 내용입니다. 간단하게 얼마나 달라졌는지 비교해보겠습니다.

```js
var Parent = class{

    static who() {
        return "[Parent]"
    }

    constructor(name){
        this.name = name||'anonymous'
    }

    getName(){
        return this.name;
    }
}

var Child = class extends Parent{
    static who(){
        return "[Child] " + super.who();        //1
    }
    constructor(name, age){
        super(name);                            //2
        this.age = age;
    }

    getName(){
        return this.age + super.getName();      //3
    }
}

var c1 = new Child('cater',29)
c1.getName()
Child.who()
```
위 예제에서 사용된 super는 함수의 유형에 따라 동작합니다.  
ES6에서는 엔진내부에서 생성자, 메서드, 일반함수등 함수의 종류를 구분합니다.

1. static Method  
static Method에서 super는 부모클래스를 의미합니다. 따라서 `Parent.who`와 동일합니다.
2. constructor  
생성자에서 super는 부모 클래스의 생성자함수를 의미합니다. `Parent.apply(this)`로 볼 수 있습니다.
3. Method  
method에서의 super는 부모의 프로토타입에 해당합니다. `Parent.prototype.getName.apply(this)`와 동일합니다.  


super에 대한 할당은 정적할당이기때문에 `extends`키워드로 부모클래스를 지정해줍니다.  

이 외에도 함수의 종류를 나눴기 떄문에 생성자 함수가 아닌 함수는 new 연산자를 통해 객체를 생성할 수 없고 인스턴스 생성시 반드시 new연산자를 사용해야합니다.
```js
Parent();                       //TypeError
new Parent.who();               //TypeError
new Parent.prototype.getName(); //TypeError
```

마지막으로 제너레이터 메소드에 this 바인딩이 확정되는 기능이 있습니다.

```js
var Child = class{
    constructor(limit = 10){
        this.limit = limit;
    }

    check(){
        return this.limit--;
    }

    *iterator(){
        const v = this.check();
        if(v) {
            yield v;
        }
    }
}

var c1 = new CHild(5);

for(var v of c1.iterator()){
    console.log(v);
}
```




## Class함수의 기본구조

```js
var Parent = Class({
  'static testA':function(){
     return 'parent::testA';
  },
  constructor:function(){
     this.a = 1;
  },
  print:function(){
    return this.a;
  }
});
var Child = Class(Parent, {
  'static testA':function(){
    return 'child::' + super.testA();
  },
  constructor:function(b){
    Super();
    this.b = b || 5;
  },
  print:function(){
    return this.b + super.print();
  },
  '*iterator':function(ec){
    if(this.b--) Yield(this.b);
  }
});
```
이런 인터페이스의 함수를 만들어 보자.





```js
var protoInit = {};
var Class = function(){
    var _parent;
    var _prop;
    var _constructor;


    if(typeof arguments[0] === 'function'){
        parent = arguments[0];
        prop = arguments[1];
    }else{
        prop = arguments[0]
    }


    if(prop && prop.constructor){
        _constructor = prop.constructor;
    }

    //실제 클래스
    var Class = function(v){

        if(v === protoInit ) return;

        //new 없이 호출하면 예외처리
        if(!(this instanceof Class)) throw new TypeError();

        //생성자가 있는 경우 super처리후 apply
        if(_constructor){
            var self = this;
            var prev = window.Super;

            window.Super = function(){
                if(parent){
                    parent.apply(self, arguments);
                }
            };
            _constructor.apply(self, arguments);
            window.Super = prev;
        }
    }

    //부모가 있으면 체이닝
    if(parent){
        Class.prototype = new parent(protoInit);
    }

    //최종클래스 반환.
    return Class;
}
```

1. new없이 호출시 예외발생함.
2. 생성자를 넘기지 않아도 작동해야함.
3. 생정자 내부에서의 `super`를 ES6와 비슷하게 사용함.


```js
var Parent = Class({
  constructor:function(a){
    this.a = a;
  }
});
var Child = Class(Parent, {
  constructor:function(a, b){
    Super(a);
    this.b = b;
  }
});
 
var test = new Child(1, 2);
 
console.log(test.a, test.b); // 1, 2
console.log(test instanceof Parent); //true
console.log(test instanceof Child); //true
 
Parent(); //TypeError
Child(); //TypeError
```


## 정적메소드와 그냥 메소드 추가.
```js
var protoInit = {};
var Class = function(){
  //상동
  var parent, prop, cstrt;
  if(typeof arguments[0] == 'function') parent = arguments[0];
  prop = arguments[parent ? 1 : 0];
  if(prop && prop['constructor']) {
    cstrt = prop['constructor'];
  }

  var cls = function(v){
    if(v === protoInit) return;
    if(!(this instanceof cls)) throw new TypeError();

    if(cstrt){
      var self = this;
      var prev = window.Super;

      window.Super = function(){
        if(parent) parent.apply(self, arguments);
      };
      cstrt.apply(self, arguments);
      window.Super = prev;
    }
  }
  if(parent) cls.prototype = new parent(protoInit);
  var k;
 
  //1. 부모가 있으면 메소드용 super객체를 만들어야한다.
  var methodSuper = {self:null};
  if(parent){
 
    //부모의 프로토타입을 순회한다.
    var proto = parent.prototype;
    for(k in proto){
        if(proto.hasOwnProperty(k)){
 
            //각 메소드는 methodSuper의 self키에 할당된 컨텍스트를 this로 바인딩하게 재작성됨.
            //methodSuper의 self를 각 메소드 호출에서 this로 할당해줌.
            methodSuper[k] =(function(f){
                return function(){
                            return f.apply(methodSuper.self, arguements);
                        };
            })(proto[k]);
        }
    }
  
    for(k in prop) {
        if(k != 'constructor' && prop.hasOwnProperty(k)){
    
            //2. 우선 정적 메소드를 골라낸다.
            if(k.substr(0, 7) == 'static '){
        
                //정적메소드이므로 클래스에 넣어주면 되지만 Super를 정의해야함
                cls[k.substr(7)] = (function(f){
                    return function(){
                        var result;
                        var prev = window.Super; //스택관리
                
                        //super는 부모가 된다. 아니면 Object로 처리
                        window.Super = parent || {};
                
                        //정적메소드의 this는 클래스다.
                        result = f.apply(cls, arguments);
                
                        //스택복귀
                        window.Super = prev;
                
                        return result;
                    };
                })(prop[k]);
        
            //3. 아니면 메소드다
            }else{
                cls.prototype[k] = (function(f){
                    return function(){
                        var result, prev = W.Super;
                        //위에서 생성한 메소드용 super에 this를 설정한다.
                        methodSuper.self = this;
                        //이제 super는 메소드용 super고 이때 this는 현재 인스턴스가 된다.
                        window.Super = methodSuper;
                
                        result = f.apply(this, arguments);
                        window.Super = prev;
                
                        return result;
                    };
                })(prop[k]);
        
            }
        }
  }
  return cls;
};



var Parent = Class({
  constructor:function(a){
    this.a = a;
  },
  'static testA':function(){
    return 1;
  },
  testB:function(){
    return 1;
  }
});
var Child = Class(Parent, {
  constructor:function(a, b){
    Super(a);
    this.b = b;
  }
  'static testA':function(){
    return 2 + Super.testA();
  },
  testB:function(){
    return 2 + Super.test();
  }
});
 
var test = new Child(1, 2);
 
console.log(Child.testA()); //3
console.log(test.testB()); //3

```


## 정리

```js
var Class = (function(){
  var protoInit = {};

  var SC = (function(){ //생성자용 super처리
    var ext;
    var self;
    var sc = function(){
        ext.apply(self, arguments);
    } 

    var root = function(){};


    return function(s, e){
        window.Super = e ? (self = s, ext = e, sc) : root;
     };
  })();


  //methodSuper용 메소드래퍼
  var mkSM = function(sm, f){
        return function(){
            return f.apply(sm['^self^'], arguments);
        };
    };


  //정적메소드 생성기
  var mkS = function(c, ext, f){
    return function(){
      var r;
      var prev = window.Super;
      window.Super = parent;
      r = f.apply(c, arguments);
      window.Super = prev;
      return r;
    };
  };


  //일반메소드 생성기
  var mkM = function(f, sm){
    return function(){
      var r;
      var prev = window.Super;
      sm['^self^'] = this;
      window.Super = sm;
      r = f.apply(this, arguments);
      window.Super = prev;

      return r
    };
  };

  return function(){
    var a = arguments;
    var parent = typeof a[0] == 'function' ? a[0] : null
    var prop = a[ext ? 1 :0];
    var cstrt = prop && prop ['constructor']
    var cls;
    var methodSuper;
    var fn;
    var k;
    var proto;

    cls = function(v){
      var prev;
      if(v === protoInit) return;
      if(!(this instanceof cls)) throw 'only new';

      if(cstrt){
        prev = window.Super
        SC(this, parent);

        cstrt.apply(this, arguments);
        window.Super = prev;
      }
    };

    methodSuper = {'^self^':null};
    if(parent){
        proto = parent.prototype;
        for(k in proto) {
            if(proto.hasOwnProperty(k)) 
                methodSuper[k] = mkSM(methodSuper, proto[k])
        };
        cls.prototype = new parent(protoInit);
    }
    fn = cls.prototype;

    if(prop) {
        for(k in prop){
            if(k != 'constructor' && prop.hasOwnProperty(k)){
                if(k.substr(0, 7) == 'static ') 
                    cls[k.substr(7)] = mkS(cls, parent, prop[k]);
                else 
                    fn[k] = mkM(prop[k], methodSuper);
            }
        } 
    }

    return c;
  };
})();


```




## ref
- [ES3를 위한 Class문법](https://www.bsidesoft.com/?p=2339)