# MVC, FLUX

## intro

두 패턴의 차이에 대해 자세히 알아본다.  
흔히 redux에 대한 소개글에서 한두문장의 글로 차이를 설명하는 경우가 많아 자세한 차이를 공감하고자 포스팅을 한다.

```js
class ModelConuter (){
    constructor(){
        this.value = 1
    }

    increaseValue(delta) {
        this.value +=delta
    }
}

class ControllerCounter{

    constructor ({model_counter}){
        this.model_counter = model_counter;
        this.observers = []
    }

    getValue(){
        return model_counter.value
    }

    increaseValue(delta) {
        this.model_counter.increaseValue(delta)
    }


    notifyObservers(){
        this.observers.forEach(obj =>{
             obj.notify(this)
        })
    }

    registerObserver(observer){
        this.observer.push(observer)
    }

}


class ViewCounterButton(){
    constructor({controller_counter, button_class}){
        this.controller_counter = controller_counter;
        this.button_class = button_class ||  'button_counter';
        this.controller_counter.registerObserver(this)
    }

    render (){
        const elm = document.querySelector('.btn')
        elm.addEventListener('click', function(){
            controller_counter.increaseValue(1)
        })
        return elm
    }

    notify (){
         const elm = document.querySelector('.btn');
         elm.replaceWith(this.render)

    }
}

```

## ref

- [Flux Design Pattern](https://blog.naver.com/backsajang420/221368106022)
- [FLUX와 MVC비교](https://62che.com/blog/architecture/mvw-redux-viper-%EB%B9%84%EA%B5%90.html#redux-flux)
- [FLUX와 MVC비교2](https://beomy.tistory.com/44)
- [1](https://dogbirdfoot.tistory.com/14)
- [2](https://taegon.kim/archives/5288)
