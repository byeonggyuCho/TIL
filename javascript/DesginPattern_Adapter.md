# Adapter


## Intro
구조를 쉽게 전환하기 위한 패턴<br>
인터페이스의 호환성을 높히는데 유용하다.<br>
adapter를 적용함으로서 최소한의 변경으로 변화에 대응할 수 있다.<br>
adapter는 변압기의 역할을 한다.


## 예제
어떤 프린터를 사용하던 프린팅이 되도록 프린트 어댑터를 만들었다.<br>
ASIS 시스템을 사용하던 중 새로운 TOBE시스템을 도입해야하고 그때 필요한 어댑터를 생각해보자.<br>



```js

//Adapter
var HashTagAdapter = (function(){
    function HashTagAdapter(printer){
        this.printer = printer;
    }

    HashTagAdapter.prototype.write = function(text){
       this.printer.write(text);
    }

    HashTagAdapter.prototype.print = function(){
        return this.printer.printWithHash();
    }
    return HashTagAdapter;
})();



// ASIS SYSTEM
var Printer = (function(){
    function Printer(){
        this.textArr = [];
    }

    Printer.prototype.write = function(text){
        this.textArr.push(text);
    }

    Printer.prototype.print = function(){
        return this.textArr.join(" ");
    }

    return Printer;
})()


// TOBE SYSTEM
var HashTagPrinter  = (function(){
    function HashTagPrinter(){
        this.textArr = [];
    }

    HashTagPrinter.prototype.write = function(text){
        this.textArr.push(text);
    }

    HashTagPrinter.prototype.printWithHash = function(){
        return this.textArr.map(function(text){
            return `#${text}`
        }).join(" ");
    }

    return HashTagPrinter;
})()



var asisPrinter = new Printer();

asisPrinter.write("좋아요");
asisPrinter.write("구독");
asisPrinter.write("알람");
var result =  asisPrinter.print();

console.log(result);


var hashTagPrinter = new HashTagPrinter();
var tobePrinter = new HashTagAdapter(hashTagPrinter);

tobePrinter.write("좋아요");
tobePrinter.write("구독");
tobePrinter.write("알람");
var result =  tobePrinter.print();

console.log(result);


```



### REF
- https://dev-momo.tistory.com/entry/Adapter-Pattern-%EC%96%B4%EB%8C%91%ED%84%B0-%ED%8C%A8%ED%84%B4
