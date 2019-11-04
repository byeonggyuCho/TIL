# Set and Map

## Intro
Set은 중복을 포함할 수 없는 값의 목록입니다. 일반적으로 Array의 항목처럼 Set은 개별 항목에 접근하지 않습니다. 대신 값이 있는지 확인하기 위해 Set을 확인하는 것이 일반적입니다.  
Map은 특정 값에 해당하는 키의 모음입니다. 따라서 Map의 각 항목에는 두 개의 데이터가 저장되고 값은 읽을 키를 지정하여 검색됩니다. Map은 캐시로 자주 사용되어 나중에 빠르게 검색할 데이터를 저장하기도 합니다.


## ECAM Script5에서 Set과 Map
```js
let set = Object.create(null);
set.foo = true;
// 존재 확인하기
if (set.foo) {
    // do something
}
```
- set은 상속 프로퍼티가 없습니다. (null프로토 타입)


```js
let map = Object.create(null);
map.foo = "bar";
// 값을 추출
let value = map.foo;
console.log(value);         // "bar"
```
Set과 달리 Map은 키의 존재를 확인하기 보다는 정보를 검색하는 데 주로 사용됩니다.



### ES5의 Set과 Map의 문제점


#### 숫자를 key로 사용하는 경우.
```js
let map = Object.create(null);
map[5] = "foo";
console.log(map["5"]);      // "foo"
```
객체의 키에 숫자를 입력해도 내부적으로 문자열로 변환된다. 즉 `map[5]`와 `map["5"]`를 구분할 수 없다는 말이된다.


#### 객체를 key로 사용하는 경우
```js
let map = Object.create(null),
    key1 = {},
    key2 = {};
map[key1] = "foo";
console.log(map[key2]);     // "foo"
```
마찬가지의 이유로 서로 다른 객체를 키 프로퍼티로 입력하더라도 내부적으로 `"[object Object]"`로 변환된다. 


#### 콜렉션에 값이 입력됐는지 확인이 모호함.

```js
let map = Object.create(null);
map.count = 1;
// "count"값이 존재하는지 또는 0이 아닌지 어떤걸 체크 하나요?
if (map.count) {
    // ...
}
```
위 예제에서 `map.count`에 0으로 초기화되었는지 비할당인지 구분이 모호하다.



## 등장배경
Set과 Map의 등장배경에는 ES5의 콜렉션으로 대규모 애플리케이션을 만들때 모호함을 줄여서 유지관리 비용을 줄임에 있습니다.



## ES6에서 Set
`Set`을 이용하면 중복되지 않은 목록을 만들 수 있습니다. 불연속값을 추적하기 쉽죠.


```js
let set = new Set();
set.add(5);
set.add("5");
console.log(set.size);    // 2
```
이렇게 데이터 타입이 다른 값을 구분할 수 있습니다. 유일한 예외는 -0과 +0을 구분하지 못한다는 겁니다.


```js
let set = new Set(),
    key1 = {},
    key2 = {};
set.add(key1);
set.add(key2);
console.log(set.size);    // 2
```
서로 다른 객체도 구분하는 걸 볼 수 있습니다. 객체의 참조값을 식별한다는걸 알 수 있죠


```js
let set = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
console.log(set.size);    // 5
```
Array를 이용한 set객체 초기화입니다. 보다싶이 중복값이 걸려졌음을 알 수 있습니다.

    Set constructor는 Iterable Object를 인수로 받습니다. Set 생성자가 Iterator를 이용해 인수에서 값을 추출한다고 보시면 됩니다.


```js
let set = new Set();
set.add(5);
set.add("5");
console.log(set.has(5));    // true
console.log(set.has(6));    // false
```
`has()`메서드를 이용해 값을 체크할 수 있습니다.


```js
let set = new Set();
set.add(5);
set.add("5");
console.log(set.has(5));    // true
set.delete(5);
console.log(set.has(5));    // false
console.log(set.size);      // 1
set.clear();
console.log(set.has("5"));  // false
console.log(set.size);      // 0
```
`clear()`와 `delete()`를 이용해 값을 지을 수 있습니다.


### forEach
array의 `forEach`와 차이점이 있습니다 콜백함수의 파라미터에서 첫번째와 두번째 값이 같다는것이죠.  
`set`에는 key프로퍼티가 없기 때문입니다.

```js
let set = new Set([1, 2]);
set.forEach(function(value, key, ownerSet) {
    console.log(key + " " + value);
    console.log(ownerSet === set);
});
```

```js
let set = new Set([1, 2]);
let processor = {
    output(value) {
        console.log(value);
    },
    process(dataSet) {
        dataSet.forEach(function(value) {
            this.output(value);
        }, this);
    }
};
processor.process(set);
```
`forEach`에서 this를 사용하려면 두번째파라미터로 전달하면됩니다. 물론 `Arrow Function`을 이용하면 두번째 파라미터를 생략할 수 있습니다.

```js
let set = new Set([1, 2]);
let processor = {
    output(value) {
        console.log(value);
    },
    process(dataSet) {
        dataSet.forEach((value) => this.output(value));
    }
};
processor.process(set);
```


### Set을 Array로 변환하기
```js
let set = new Set([1, 2, 3, 3, 3, 4, 5]),
    array = [...set];
console.log(array);             // [1,2,3,4,5]
```
이 방법을 이용해 배열의 중복값을 제거 할 수 있습니다.

이렇게 말이죠
```js
function eliminateDuplicates(items) {
    return [...new Set(items)];
}
let numbers = [1, 2, 3, 3, 3, 4, 5],
    noDuplicates = eliminateDuplicates(numbers);
console.log(noDuplicates);      // [1,2,3,4,5]
```


## MAP
- has(key) : 지정된 키가 Map에 있는지 확인합니다.
- delete(key) : Map에서 키와 과련 값을 제거합니다.
- clear(key) : Map에서 모든 키와 값을 제거합니다.

```js
let map = new Map();
map.set("name", "Nicholas");
map.set("age", 25);
console.log(map.size);          // 2
console.log(map.has("name"));   // true
console.log(map.get("name"));   // "Nicholas"
console.log(map.has("age"));    // true
console.log(map.get("age"));    // 25
map.delete("name");
console.log(map.has("name"));   // false
console.log(map.get("name"));   // undefined
console.log(map.size);          // 1
map.clear();
console.log(map.has("name"));   // false
console.log(map.get("name"));   // undefined
console.log(map.has("age"));    // false
console.log(map.get("age"));    // undefined
console.log(map.size);          // 0
```

### MAP 초기화
Map 생성자에 Array를 전달하여 Map을 초기화할 수 있다. Array의 첫번째항목은 key Array의 두번째 항목은 value이다.
```js
let map = new Map([["name", "Nicholas"], ["age", 25]]);
console.log(map.has("name"));   // true
console.log(map.get("name"));   // "Nicholas"
console.log(map.has("age"));    // true
console.log(map.get("age"));    // 25
console.log(map.size);          // 2
```


### MAP forEach
map의 forEach에서 콜백함수의 매개변수는 다음을 의미한다.
1. Map의 다음위치값ㄷ.
2. 그 값의 키
3. 값을 읽는 map


```js
let map = new Map([ ["name", "Nicholas"], ["age", 25]]);
map.forEach(function(value, key, ownerMap) {
    console.log(key + " " + value);
    console.log(ownerMap === map);
});

```


### WeakMap



### Private Data

WeakMap이용하면 private data를 만들수 있다.
ES6에서 모든 데이터는 `public`이다. 그동안 하나의 약속으로 속성이름 앞에 `_`를 붙임으로서 private data라는것을 명시해왔지만, 
수정이 불가능하도록 강제한것은 아니다. 얼마든지 덮어쓸 수 있다.

```js
function Person(name) {
    this._name = name;
}
Person.prototype.getName = function() {
    return this._name;
};
```


ES5에서 private data를 만들기 위해서 다음과 같은 패턴을 사용했다.
```js
var Person = (function() {
    var privateData = {},
        privateId = 0;
    function Person(name) {
        Object.defineProperty(this, "_id", { value: privateId++ });
        privateData[this._id] = {
            name: name
        };
    }
    Person.prototype.getName = function() {
        return privateData[this._id].name;
    };
    return Person;
}());

```
이 예제에서는 두 개의 Prvate변수 `privateData`와 `privateId`를 만들었다.
`privateData` 객체는 각 인스턴스에 대한 정보를 저장한다.  
`privateId`는 각 인스턴스에 대한 고유 ID를 생성하는데 사용되는 시퀀스값이다.  

`privateData`는 IIFE 외부에서 접근이 불가능하기 때문에 `_id`가 노출되도 수정이 불가능하다.

하지만 이 패턴의 문제는 객체 인스턴스가 사용되지 않는 시점을 알 수 없기 때문에 
privateData의 데이터가 계속 누적된다는 것이다.  (i.g. `Person`생성자를 통해 생성된 p1인스턴스가 있다고 할때,
p1인스턴스가 만료되어도 privateData에는 p1의 정보가 계속 누적되어있다. )
이런 문제를 `WeakMap`을 통해 해결 가능하다.


*WeakMap을 이용한 PrvateData*
```js
let Person = (function() {
    let privateData = new WeakMap();
    function Person(name) {
        privateData.set(this, { name: name });
    }
    Person.prototype.getName = function() {
        return privateData.get(this).name;
    };
    return Person;
}());
```
이전버전과의 차이점을 보자. 우선 객체 인스턴스를 키로 사용할 수 있기때문에 별도의 id가 불필요하다. 그냥 `this`를 키로 사용하면 된다. 
이 방법을 사용하면 개인 정보를 비공개로 유지하면서 관련 인스턴스가 사라지면 정보가 사라지게 할 수 있다.


### WeakMap의 제한 사항.




## REF

[https://infoscis.github.io/2018/01/27/ecmascript-6-sets-and-maps/](https://infoscis.github.io/2018/01/27/ecmascript-6-sets-and-maps/)