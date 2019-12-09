# Sandbox

## Info
애플리케이션 전역 객체가 단 하나의 전역 변수에 의존하기 때문에 네임스페이스 패턴으로는 동일한 애플리케이션이나 라이브러리의 두 가지 버전을 한 페이지에 실행시키는 것이 불가능하다.  
샌드박스 패턴은 모듈간 영향을 미치지 않고 동작 할 수 있는 환경을 위한 패턴이다.


```js
function Sandbox(){

    var args = Array.prototype.slice.call(arguments);
    var callback = args.pop();
    var modules = (args[0] && typeof args[0] === 'string') 
                    ? args
                    : args[0]
    var i;

    if(!(this instanceof Sandbox)){
        return new Sandbox(modules, callback);
    }

    this.a;
    this.b;

    
    if(!modules || modules === '*' || modules[0] === '*'){
        modules = [];
        for(i in Sandbox.modules){
            if(Sandbox.modules.hasOwnProperty(i)){
                modules.push(i);
            }
        }
    }

    modules.forEach(function(module){
          Sandbox.modules[module](this)
    })
    
    callback(this);
}

Sandbox.prototype = {
    name : "application",
    version: "1.0",
    getName: function(){
        return this.name;
    }
};

Sandbox.modules = {
  dom : function(box) {
    box.getElement = function() {};
    box.getStyle = function() {};
    box.foo = "bar";
  },

  event : function(box) {
    box.attachEvent = function() {};
    box.detachEvent = function() {};
  },

  ajax : function(box) {
    box.makeRequest = function() { };
    box.getResponse = function() { };
  }
};

var MYAPP1 = Sandbox('ajax', function() { console.log('ajax 모듈만 쓸거야'); });
var MYAPP2 = Sandbox('ajax', 'dom', function() { console.log('ajax랑 dom 다 쓸거야'); });


```

생성자 내부에서 this에 모듈을 추가한다.  
샌드박스에 자주 사용되고 필수의 유틸리티들이 모두 모여 있고 필요한 모듈만 따로 떼어 생성자를 통해 박스로 전달해주면 사용자는 필요한 모듈만 골라 사용할 수 있다.