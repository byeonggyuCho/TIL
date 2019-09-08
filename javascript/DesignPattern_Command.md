# Command


## Intro
수행할 동작을 모아두었다가 한번에 실행하거나 기존에 등록된 동작을 추출하는 로직이 가능하다.<br>




## Example
카페 사장이 메니져를 통해 카페를 경영하는 것을 시뮬레이션했다.



```js

var CEO = (function(){

    function CEO() {}


    CEO.prototype.approve = function(Manager) {
        Manager.execute();
    }
    return CEO;
})()


var Manager = (function(){
    function Manager() {
        this.commands = [];
    }

    //명령을 실행한다.
    Manager.prototype.execute = function(){
        this.commands.forEach(function(command) {
           command();
        });
    };

    Manager.prototype.do = function(coammand, args){
        this.commands.push(function() {
            //coammand(args);

            //this의 참조값을 변경이 필요할때.
            coammand.call(null, args);  
        });
    }

    //앞 명령을 취소한다.
    Manager.prototype.undo = function(){
        this.commands.pop();
    };

    return Manager;
})()


var caffe = (function(){
    
    var status
    var total = 0;

    return {
        open : function(){
            status = 'run';
            console.log('카페를 열었습니다')
        },
        close : function(){
            status = 'destory';
            console.log(`카페를 닫습니다.\n 총 ${total}잔의 커피를 팔았습니다.`)
        },
        sellCoffe : function(num){
            total+= num;
            console.log(`커피를 ${num}잔 팔았다.`);
        }
    }
})();


var CEO = new CEO();
var Manager = new Manager();

Manager.do(caffe.open)
Manager.undo()
Manager.do(caffe.open)
Manager.do(caffe.sellCoffe, 3)
Manager.do(caffe.sellCoffe, 2)
Manager.do(caffe.close)

CEO.approve(Manager);
```