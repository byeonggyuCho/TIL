# Iterator

## Intro
- 순서가 있는 것들을 편하게 탐색할 수 있다.
- 객체의 내부구조가 복잡하더라도 개별 속성에 쉽게 접근하기 위한 패턴


## Eaxample

```js

var Avatar = (function(){

    function Avatar(name){
        this.index = 0;
        this.x = 0;
        this.y = 0;
        this.name = name;
    }

    Avatar.prototype.setCommand = function(commandList){
        this.commandList = commandList;
    }

    Avatar.prototype.rewind = function(){
        this.index = 0;
        this.x = 0;
        this.y = 0;
    }

    Avatar.prototype.crrent = function(){
        return this.commandList[this.index]
    }

    Avatar.prototype.next = function() {

        if(this.hasNext()){
            var command = this.commandList[this.index++];
            switch(command){
                case 'UP' : 
                    ++this.y;
                    break;
                case 'DOWN' : 
                    --this.y;
                    break;
                case 'LEFT' : 
                    --this.x;
                    break;
                case 'RIGHT' : 
                    ++this.x;
                    break;
            }

            console.log(`${this.name}이  ${command}을 수행합니다.`);
        }
    }

    Avatar.prototype.hasNext = function() {

        var hasNext = this.commandList.length > this.index;

        if(hasNext){
            console.log(`${this.name}가 이동을 끝냈습니다. \n 현재 위치는 ${this.x},${this.y}입니다.`);
        }

        return  hasNext;
    }

    return Avatar

})()



var commandList = ['UP','DOWN','UP','DOWN','UP','UP','DOWN','DOWN','LEFT','UP']
var avatar = new Avatar('초롱이');

avatar.setCommand(commandList);

while(!avatar.done()){
    avatar.next();
}

```



## REF
- https://joshua1988.github.io/web-development/javascript/javascript-pattern-design/#iterator-%ED%8C%A8%ED%84%B4
- https://www.zerocho.com/category/JavaScript/post/57df7063dfe17f0015e44121