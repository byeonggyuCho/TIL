# Facade

## Intro
복잡한 것들 세부적인것들은 감추고 간단한것만 노출 시키는 패턴.
복잡한 로직은 내부적으로 알아서 처리한다.
프로그램은 이처럼 최소한의 API만 공개하는 것이 좋다.
이렇게 일부만 노출하는 패턴을 퍼사드 패턴이라고 한다.


```js

var Player = (function()) {
    function() Player{
        this.units = [];
        this.units.push(new Unit('Zergling'))
        this.units.push(new Unit('Zergling'))
        this.units.push(new Unit('Zergling'))
        this.units.push(new Unit('Zergling'))
    }


    //진군
    Player.porototype.march = function(){
        this.units.forEach(function(unit){
            unit.supply();
            unit.makeFormation();
            unit.goFoward();
        })
    }
    //공격
    Player.porototype.attack = function(){
        this.units.forEach(function(unit){
            unit.makeFormation();
            unit.pullOutSord();
            unit.runToEnemy();
        })
    }
    //정지
    Player.porototype.halt = function(){
        this.units.forEach(function(unit){
            unit.halt();
        })
    }

    //후퇴
    Player.porototype.reteat = function(){
        this.units.forEach(function(unit){
            unit.reteat();
        })
    }
    return Player;
})()


var Unit = (function(){

    function Unit(name) {
        this.name = name;
    }
    //외부에 노출되지 않는 복잡한 로직의 메서드들.
    Unit.porototype.supply = function(){
        
    }
    Unit.porototype.makeFormation = function(){

    }
    Unit.porototype.pullOutSord = function(){

    }
    Unit.porototype.runToEnemy = function(){

    }
    Unit.porototype.goFoward = function(){

    }
    Unit.porototype.halt = function(){

    }

    Unit.porototype.reteat = function(){

    }

    return Unit;
})()



```
