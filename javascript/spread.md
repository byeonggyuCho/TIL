# Spread


## 1. Apply의 대안
`Function.prototype.apply`를 호출할 때, 인자를 배열로 전달하기 떄문에 인자들을 배열레 세팅해야한다.

```js
function doSomething (x,y,z){}

var args = [0,1,2];

// use apply
doSomething.apply(null,args);
// use spread
doSomething(...args);
```
불필요한 null을 생략해서 코드가 짧아지고 단순해졌다.!


## 2. 배열 합치기.
```js
var arr1 = ['one','two'];
var arr2 = ['three','four']
arr1.push(...arr2)          //arr2의 항목들을 뒤에 추가한다.
arr1.unshift(...arr2)       //arr2의 항목들을 앞에 추가한다.

var arr3 = ['one','two', ...arr2, 'five'];  //중간에 삽입하는 것도 가능하다.
```

## 3. 배열 복사하기.
ES5에서는 배열을 복사하기 위해서 `Array.prototype.slice`를 사용하곤 했다. Spead문법을 쓰면 이렇게 할 수 있다.  
단 object는 참조값을 복사한다는 것을 기억해야한다.
```js
var arr = [1,2,3]
var arr2 = [...arr];        //복사
arr2.push(4)
console.log(arr2);
```

## 4. 유사배열 배열로 변환하기.
`Array.prototype.slice`를 이용해서 유사배열 객체를 배열로 변환했던 작업을 spread로 할 수 있게 됐다.
```js
var divArray = [...document.querySelectorAll('div')]
```
이 작업은 `Array.prototype.from`을 이용해서도 가능하다.

## 5. destructing
비구조화 할당에서 응용될 수 있다. 
```js
let {x, y, ...z} = {x:1,y:2,a:3,b:4};
console.log(x); //1
console.log(y); //2
console.log(z); // {a:3, :4}
```
나머지 프로퍼티드이 spread문법에 의해 z에 하당되었다.






## Ref
- [6 greate uses of the spread operator](https://orezytivarg.github.io/6-great-uses-of-the-spread-operator/)