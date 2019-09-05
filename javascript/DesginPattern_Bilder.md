# Builder
여러 옵션을 넣어 객체를 생성할 때 유용하다.<br>
요리재료를 넣는다는 느낌으로 코드를 짤 수 있다.



```js
var cupNoodle = function(otp){

    this.egg    = otp.egg;
    this.water  = otp.water;           //300~500
    this.noodle = otp.noodle;
    this.time   = otp.time;            //3
    //this.powderedSoup = 0   //0~1
    //this.temperature

    cupNoodle.prototype.open = function(){

        var status = false;
        var msg;
        
        if(!this.water){
            msg = '물이 없다.'
        } else if(!this.noodle){
            msg = '라면이 없다!'
        } else if(this.time<2){
            msg = '라면이 덜 익었다.'
        } else if(this.time>4){
            msg = '라면이 불었다.'
        } else if(this.water<300){
            msg = '라면이 짜다'
        } else if(this.water>500){
            msg = '라면이 싱거워!'
        } else{
            status = true;

            if(this.egg ){
                msg = '계란 라면이당~ㅎㅎ';
            }else{
                msg = '너모 맛이쪙-!'
            }
        }

        console.log(msg);
        return status;
    }
}


var makeCupNoodle = function(){
    var ingredients =  {};

    return{
        addNoodle : function(){
            ingredients['noodle'] = true;
            return this;
        },
        addWater : function(_water){
            ingredients['water'] = _water;
            return this;
        },
        addEgg : function(){
            ingredients['egg'] = true;
            return this;
        },
        waitForMinutes : function( minutes ){
            ingredients['time'] = minutes;
            return this;
        },
        bild : function(){
            return new cupNoodle(ingredients);
        }
    }
}

```


## 결과확인

```js
var cupNoodle1 = makeCupNoodle()
                    .addNoodle()
                    .addWater(300)
                    .waitForMinutes(3)
                    .addEgg()
                    .bild();
cupNoodle1.open();
// 계란 라면이당~ㅎㅎ



var cupNoodle2 =  makeCupNoodle()
                    .addNoodle()
                    .addWater(300)
                    .waitForMinutes(1)
                    .addEgg()
                    .bild();

cupNoodle2.open();
//라면이 덜 익었다.

```
