# CommonJS Module

node.js에서 지원하는 모듈시스템.


## 1.복수 객체 

### 1.1 내보내기
```js
//util.js
function isEmpty (val) {
    return val === "" 
        || val === null
        || typeof val === 'undefined'
}

function isString (str) {
	return typeof str === 'string';
}

exports.isString = isString 
exports.isEmpty = isEmpty 
```


###  1.2 불러오기

```js
const util = require('./util')

console.log(util.isString("apple"));    //true
console.log(util.isEmpty(30));          //false
```


## 2. 단일객체


### 2.1 내보내기
```js
/**
 *  util.js
 */
const util = {}
util.isEmpty = function (val) {
    return val === "" 
        || val === null
        || typeof val === 'undefined'
}

util.isString = function(str){
    return typeof str === 'string';
}
module.exports = util
```


### 2.2. 불러오기.

```js
const util = require('./util')

console.log(util.isString("apple"));    //true
console.log(util.isEmpty(30));          //false
```