# Observer

## Intro
관찰대상을 subscribe한다.<br>
관찰 대상은 특정행동을 할때 자신의 행동을 publish한다.<br>
publish한 행동은 Subscribe한 사람들에게 전달된다.<br>
어플리케이션의 한 부분이 번경되었을 때 다른 부분들도 같이 변경되어야 하는 경우.<br>
객체가 수정되었을 때 객체의 변경 사항을 브로드 캐스트한다.<br>
Obserber가 늘어날 수록 성능 급감할 수 있다.

- 클래스를 여러개 작성하였을때 각 클래스들간의 연관성을 유지하기 위해 결합도를 높이는 대신 객체의 상태를 관찰하는 방법.

    
<br><br>


## 예제1 
```js

var Subject = (function (){

    function Subject(){
       this.observers = [];
    }

    Subject.prototype.subscribeObserver = function(observer){
        this.observers.push(observer)
    }
    
    Subject.prototype.unsubscribeObserver = function(observer){
        var idx = this.observers.indexOf(observer)
        if(idx > -1) {
            this.observers.splice(idx, 1);
        }
    }

    Subject.prototype.notifyObserver = function(observer){
        var idx = this.observers.indexOf(observer);
        if(idx > -1){
            this.observers[idx].notify(idx)
        }
    }

    Subject.prototype.notifyAllObservers = function(){
        this.observers.forEach(function(observer, i){
            observer.notify(i)
        })
    }

    return Subject;
})()

var Observer = (function() {

    function Observer (){}

    Observer.prototype.notify = function(idx){
        console.log("Observer",idx, "is notified!")
    }

    return Observer;
})()


var subject = new Subject();

var observer1 = new Observer();
var observer2 = new Observer();
var observer3 = new Observer();
var observer4 = new Observer();



subject.subscribeObserver(observer1);
subject.subscribeObserver(observer2);
subject.subscribeObserver(observer3);
subject.subscribeObserver(observer4);


subject.notifyObserver(observer2);
subject.notifyAllObservers();
```





## 예제2
아래 예제는 5시 50분만 되면 추노를 시도하는 조대리에게 바친다.


```js
// 상태변화 관찰대상.
var Subscriber = (function(){
    function Subscriber(name){
        this.observers = [];
        this.name = name || ""
    }

    function todayLucky() {
        return Math.floor(Math.random() * 100) +1;
    }

    //observer에게 상태변화를 알린다.
    Subscriber.prototype.publish = function() {
        var self = this;

        if(todayLucky()> 40){
            console.log(`${this.name}가 추노에 성공했습니다.`);
        }else{
            console.log(`${this.name}의 추노가 발각되었습니다.`);
            
            this.observers.every(function(observer){
                observer.fire(self);
                return true;
            })
        }
    };

    // 나를 관찰중인 담당 observer를 등록한다.
    Subscriber.prototype.register = function(target){
       this.observers.push(target);
    }

    Subscriber.prototype.howMany = function(){
        console.log(`${this.observers.length}명이 ${this.name}을 관찰중임`);
    }

    return Subscriber;
})();


var Observer = (function(){
    function Observer(name){
        this.subscribers = [];
        this.name = name || "";
    }

    // 타겟을 관찰한다.
    Observer.prototype.subscribe = function(target){
        this.subscribers.push({
            target: target,
            point:0
        });
        console.log(`${this.name}이 ${target.name}을 관찰하기 시작합니다.`);
        target.register(this);
    };

    // 관찰 대상을 제외한다.
    Observer.prototype.unsubscribe = function(target){
         console.log(`${target.name}을 관찰을 중단합니다.`);

        this.subscribers = this.subscribers.filter(function(subscriber) {
            return subscriber.target !== target;
        });
    }

    // 타겟의 상태변화에 대한 이벤트 핸들러.
    Observer.prototype.fire = function(target) {

        var that = this;
        this.subscribers.some(function(subscriber) {

            if (subscriber.target === target) {

                ++subscriber.point;
                console.log(`${that.name}이 ${subscriber.point}번째 경고를 합니다.`);
                return true;
            }
        })
    };

    return Observer;
})();


var observer1 = new Observer("김부장");
var observer2 = new Observer("박부장");
var subscriber = new Subscriber("조대리");

//관찰시작
observer1.subscribe(subscriber);
observer2.subscribe(subscriber);
subscriber.publish();


observer.list;
    
```


### REF
- https://itstory.tk/entry/%EA%BC%AD-%EC%95%8C%EC%95%84%EC%95%BC%ED%95%98%EB%8A%94-Javascript-%EB%94%94%EC%9E%90%EC%9D%B8-%ED%8C%A8%ED%84%B4-4%EA%B0%80%EC%A7%80
- https://joshua1988.github.io/web-development/javascript/javascript-pattern-design/#observer-%ED%8C%A8%ED%84%B4
