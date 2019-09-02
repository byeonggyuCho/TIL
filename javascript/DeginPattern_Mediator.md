# Mediator

## Intro
여러 객체를 관리하는 패턴이다.
Mediator가 객체를 관리하는 컨테이너라고 볼 수 있다.


## Example
파티 주최자가 참가자들을 서로 소개시켜주는 시뮬레이션.


```js

// 객체(손님)를 관리하는 Mediator객체(host)
var Host = (function(){
    function Host() {
        this.targets = []
    }
    //객체를 담는 컨테이너. 
    //관리 대상 객체를 등록한다.
    Host.prototype.invite = function(target){
        this.targets.push(target)
    }

    //관리 대상 객체에게 수행할 메서드. 정의
    Host.prototype.meetUp = function(user){

        const that = this;
        
        this.targets.forEach(function(target,i){

            let j = i+1;
            for(;j<that.targets.length;j++){
                if(!target.hadMet(that.targets[j])){
                    target.sayHello(that.targets[j]);
                    target.meet(that.targets[j]);
                }
            }
        })
    }


    return Host
})();


var User = (function(){
    function User(name) {
        this.name = name;
        this.friends = [];
    }

    User.prototype.sayHello = function(friend){
        console.log(`안녕 ${friend.name}, 난 ${this.name}이야.`)
    }

    //만난것을 기억
    User.prototype.meet = function(friend){
        this.friends.push(friend);
    }

    //만난적 있는지 확인
    User.prototype.hadMet = function(friend){
        return this.friends.includes(friend)
    }

    return User
})();



var host = new Host();
host.invite(new User('박보영'))
host.invite(new User('한예슬'))
host.invite(new User('안소희'))

host.meetUp();

```


### REF
https://www.zerocho.com/category/JavaScript/post/57edfc3381d46f0015d3f0cc