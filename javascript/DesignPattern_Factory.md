# Factory Method



## intro
- 비슷한 객체를 공장에서 찍어내듯이 반복적으로 생성할 수 있다.

## TODO
팩토리에 상품을 주입해서 펙토리 메이커 함수를 만들어보자.


```js
var coffeeFactory = (function(){

    var CafeLatee = (function(){
        
        function CafeLatee (){
            this.price = 3000;
        }

        CafeLatee.prototype.getPrice = function() {
            return this.price;
        }

        return CafeLatee;
    })();


    var CaramelLatee = (function(){

        function CaramelLatee(){
            this.price = 5000;
        }

        CaramelLatee.prototype.getPrice = function(){
            return this.price;
        }
        return CaramelLatee;
    })()


        
    return {
        create: function(latteType){
            var coffee;

            switch(latteType){
                case 'cafe':
                    coffee = new CafeLatee();
                    break;
                case 'caramel' :
                    coffee = new CaramelLatee();
                    break;
            }
            return coffee
        }
    }
})()




```




## REF

https://joshua1988.github.io/web-development/javascript/javascript-pattern-design/#observer-%ED%8C%A8%ED%84%B4
https://dev-momo.tistory.com/entry/%ED%8C%A9%ED%86%A0%EB%A6%AC-%EB%A9%94%EC%84%9C%EB%93%9C-%ED%8C%A8%ED%84%B4-Factory-Method-Pattern?category=582457