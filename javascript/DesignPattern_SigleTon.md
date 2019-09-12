# Singleton

## Intro
객체가 하나만 존재한다.<br>
모듈패턴에서 살짝 응용된 패턴이다.<br>
하나의 플로우에서 객체의 상태값을 유지하고 싶을 때 사용하면 적절하다.


```js

var singleton = (function() {

    var instance;
    var name = 'cater';

    function initiate() {

        return {
            name: ,
            getName: function() {
                console.log(name);
            }
        };
    }

    return {
        getInstance: function(){
            if (!instance) {
                instance = initiate();
            }
            return instance;
        }
    }
})();

var first = singleton.getInstance();
var second = singleton.getInstance();

console.log(first === second);      // true;
```






## REF
https://www.zerocho.com/category/JavaScript/post/57541bef7dfff917002c4e86