# Object



## 1. Object.creaate

```js
var person = {
 isHuman: false,
 print: function () { 
     console.log(this.name + ", " + this.isHuman);}
};
var me = Object.create(person);
me.name = "Matthew";
me.isHuman = true; // can be overwritten
me.print(); // Matthew, true
console.log(me.__proto__ === person) // true
console.log(JSON.stringify(me)); //{"name":"Matthew","isHuman":true}
console.log(JSON.stringify(person));//{"isHuman":false}
```


## 2. Object.defineProperty

``` js
var object1 = {};
Object.defineProperty(object1, 'property1', {
 value: 42,
 writable: false        //수정가능한지?
});
object1.property1 = 77;
// throws an error in strict mode
console.log(object1.property1); // 42
```

## 3. Object.defineProperties
``` js
var o1 = {};
Object.defineProperties(o1, {
 prop1: { value: 42, writable: true},
 prop2: {}
});
console.log(o1.prop1); // 42
```


## 4.Object.getPrototypeOf
```js
var prototype1 = {};
var object1 = Object.create(prototype1);
var object2 = Object.getPrototypeOf(object1)
console.log(object2 === prototype1); //true
console.log(object2 === object1.__proto__); //true
```


## 5.Object.keys

```js
var arr = ['a', 'b', 'c']; // simple array
console.log(Object.keys(arr)); // ['0', '1', '2']
var obj = { 0: 'a', 1: 'b' }; // array like object
console.log(Object.keys(obj)); // ['0', '1' ]
// array like object with random key ordering
var anObj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.keys(anObj)); // ['2', '7', '100']
```



## 6.Object.seal

```js
var o1 = { prop1: 42 };
var o2 = Object.seal(o1);
console.log(o1 === o2); // true
console.log(o1.prop1 + " " + o2.prop1); // 42 42
o1.prop1 = 33;
console.log(o1.prop1 + " " + o2.prop1); // 33 33
delete o1.prop1; // cannot delete
console.log(o1.prop1 + " " + o2.prop1); // 33 33
```


## 7. Object.freeze

```js
var o1 = { prop1: 42 };
var o2 = Object.freeze(o1);
console.log(o1 === o2); // true
console.log(o1.prop1 + " " + o2.prop1); // 42 42
o1.prop1 = 33; // error in strict mode
console.log(o1.prop1 + " " + o2.prop1); // 42 42
delete o1.prop1; // cannot delete
console.log(o1.prop1 + " " + o2.prop1); // 42 42
```

## 8.Object.preventExtensions

```js
var o1 = {};
Object.preventExtensions(o1);

try {
 Object.defineProperty(o1, 'prop1', {value: 42});
} catch (e) {
 console.log(e);
 //TypeError: Cannot define property prop1,
 // object is not extensible
}
```

## 9.Object.isSealed

```js
var o1 = { prop1: 42 }
console.log(Object.isSealed(o1)); // false
Object.seal(o1);
console.log(Object.isSealed(o1)); // true
```


## 10.Object.isFrozen

```js
var o1 = { prop1: 42 }
console.log(Object.isFrozen(o1)); // false
Object.freeze(o1);
console.log(Object.isFrozen(o1)); // true
```


## 11.Object.isExtensible

```js
var o1 = { prop1: 42 }
console.log(Object.isExtensible(o1)); // true
Object.preventExtensions(o1);
console.log(Object.isExtensible(o1)); // false
```

## 12.Object.getOwnPropertyDescriptor

```js
var obj1 = { prop1: 42 }
var desc1 = Object.getOwnPropertyDescriptor(obj1, 'prop1');
console.log(desc1.configurable); // true
console.log(desc1.value); // 42
```


## 13. Object.getOwnPropertyNames

```js
var o1 = { a: 1, b: 2, c: 3 };
console.log(Object.getOwnPropertyNames(o1)); 
```


## 14. Object.is()

```js
console.log(+0 === -0); // true
console.log(Object.is(+0, -0)); // false
console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true
```


## 15.Object.assign()

```js
function mixin(target, source) {
 Object.keys(source).forEach(function(key) {
 target[key] = source[key];
 });
 return target;
}
var ret = mixin({}, {prop:'a'});
var ret1 = Object.assign({}, {prop:'a'});
```


## 16.Object.setPrototypeOf()
## 17.Object.getPrototypeOf()
## 18.Object.entries()
