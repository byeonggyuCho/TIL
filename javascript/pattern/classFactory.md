# Class Factory


## Intro

```js
//각 속성별 메서드를 만들어 주는 함수.
function maker(prop){

    return function(){
        return arguments.length
            ? (this[prop] = arguments[0])
            : this[prop];
    }
}


function Display() {
    this.x = 0;
    this.y = 0;
}
Display.prototype.X = maker('x');
Display.prototype.Y = maker('y');


function Box(){
    this.width = 100;
    this.height = 100;
}
Box.prototype = Object.create(Display.prototype,{
    constructor:{
        value: Box
    },
    W:{
        value: maker('width')
    },
    H:{
        value: maker('heigth')
    }
})

```


## REF
- [자바스크립트 클래스 펙토리](https://www.bsidesoft.com/?p=320#%25ec%259e%2590%25eb%25b0%2594%25ec%258a%25a4%25ed%2581%25ac%25eb%25a6%25bd%25ed%258a%25b8-%25eb%25aa%25a8%25eb%2593%2588)