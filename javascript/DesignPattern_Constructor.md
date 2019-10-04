# Constructor


## First knowledge
- Object.create
- prototype
- constructor
- apply

## Intro
상속을 필요로 할때 사용하는 구조에서 사용할 수 있는 패턴.  
혹은 prototype 패턴



```js
var Vehicle = (function(){
    function Vehicle(name, speed) {
        this.name = name;
        this.speed = speed;
    }

    Vehicle.prototype.drive = function(){
        console.log(this.name + ' runs at ' + this.speed)
    };

    return Vehicle;
})()

var tico = new Vehicle('tico', 50);
tico.drive();


function Sedan(name, speed, maxSpeed) {
    Vihicle.apply(this, arguments);     
    this.maxSpeed = maxSpeed;
}

Sedan.protoType = Obeject.create(Vihicle.prototype);
Sedan.protoType.constructor = Sedan;
Sedan.protoType.boost = function(){
    console.log(this.name + ' boosts its speed at ' + this.maxSpeed);
}

var sonata = new Sedan('sonata', 100, 200);
sonata.drive();
sonata.boost();
```

      


### 설명

```js
Vihicle.apply(this, arguments);
```
Vihicle 생성함수에 Sedan의 this와 arguments를 적용한다.

```js
Sedan.prototype = Object.create(Vehicle.prototype);
```

Sedan의 prototype속성에 Vehicle의 prototype속성을 연결한다.  
이로써 Vehicle의 모든 prototype속성을 Sedan이 사용가능하다 (여기선 drive function)  
Object.create(Vehicle.prototype)는 Vehicle.prototype와 똑같은 객체를 생성한다고 보면 된다.  
이때 객체를 만들되 생성자는 실행하지 않는다.  
이 시점에서 Vehicle의 constructor가 함께 생성되는데 이것을 수정해줘야한다.

```js
Sedan.prototype.constructor = Sedan;
```
Sedan.prototype = Object.create(Vehicle.prototype)과정에서 함께 복사된 Vehicle.prototype.constructor를 수정한다.
