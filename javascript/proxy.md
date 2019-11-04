# Proxy

## Intro
EcamScript5이전에는 `noneumerable`, `nonwritable`객체 속속이 있었지만 개발자는 자체적으로 해당 속성을 정의할 수는 없었죠. EcmaScript5에 들어서면서 javasciprt 엔진이 수행하던 작업을 개발자가 할수있도록 `Object.defineProperty()메서드가 제공되었습니다.  

ECMAscript6에선 Built-in객체에만 사용할 수 있었던 javascript엔진 기능에 접근할 수 있습니다. Javascript는 프록시를 통해 객체의 내부 동작을 노출할 수 있습니다. 프록시는 Javscript 엔진의 저수준동작을 가로 채고 변경할 수있는 래퍼입니다. 이 장에서는 프록시에서 세부적으로 다루어야 할 문제를 설명한 다음 프록시를 효과적으로 만들고 사용하는 방법에 대해 설명합니다.  

프록시를 이용하면 기본동작을 수정해서 사용자가 원하는 방식으로 동작하게 할 수 있다.





## Array의 문제점
ECMAScript6 이전에 javaScript Array 객체는 개발자가 Array객체를 모방할 수 없는 방식으로 동작합니다. Array의 `length` 프로퍼티는 특정 Array 항목에 값을 할당할 때 영향을 받으며 `length`프로퍼티를 수정하여 Array항목에 값을 할할당때 영향을 받으며 `length`프로퍼티를 수정하여 Array항목을 수정할 수 있습니다.
```js
let colors = ["red", "green", "blue"];
console.log(colors.length);         // 3
colors[3] = "black";
console.log(colors.length);         // 4
console.log(colors[3]);             // "black"
colors.length = 2;
console.log(colors.length);         // 2
console.log(colors[3]);             // undefined
console.log(colors[2]);             // undefined
console.log(colors[1]);             // "green"
```
위 예제에서 `color`의 `length`프로퍼티를 수정하면 두 항목이 제거되고 처음 두 항목만 남게됩니다. Ecmascript5에서는 개발자가 작성한 객체에서 이러한 동작이 불가능하지만 프록시를 사용하면 가능합니다.



## 용어 설명

1. handler
    - trap을 가진 Placeholer object 
2. traps
    - 프로퍼티에 접근할 수 있는 메서드들
3. target
    - 

## Proxy and Reflection

`new Proxy()`를 호출하여 다른 객체 대신 사용할 프록시를 생성할 수 있습니다. 프록시는 대상을 가상화하여 프록시와 대상이 사용하는 기능을 동일한 객체로 표시하도록 합니다.  

프록시를 사용하면 JavaScript 엔진의 내부에 있는 대상에서 하위 수준의 객체 작업을 가고챌수 있습니다. 이러한 하위수준 작업은 특정 작업에 응답하는 기능인 Trap을 사용하여 가로 채어집니다.  

`Reflect`객체로 표현되는 리플렉션 API는 프록시가 오버라이드 할 수있는 것과 동일한 로우 레벨 연산에 대한 기본동작을 제공하는 메서드 컬렉션입니다. 모든 프록시 Trap에 대해 `Reflect`메서드가 있습니다. 이러한 메서드는 동일한 이름을 가지며 각 프록시 Trap과 동일한 파라미터가 전달됩니다.
 
각 Trap은 Javascript객체의 Built-in동작을 재정의하므로 동작을 가로채고 수정할 수 있습니다. 그래도 Buit-in동작을 사용해야하는 경우 해당하는 리플렉션 API메서드를 사용할 수있습니다. 프록시 생성과 리플렛션 API간의 관계는 프록시 생성을 시작할 떄 명확 해집니다. 그래서 몇가지 예를 살펴보는것이 좋습니다.


### Method of the handler object
handler객체는 Proxy를 위한 trap들을 포함하고 있는 객체이다. 

1. handler.getPrototypeOf();
    - A trap for `Object.getPrototypeOf`
2. handler.setPrototypeOf()
    - A trap for `Object.setPrototypeOf`
3. handler.isExtensible()
    - A trap for `Obejct.isExtensible`
4. handler.preventExtensions()
    - A trap for `Object.preventExtensions`
5. handler.getOwnPropertyDescriptor()
    - A trap for `Object.getOwnPropertyDescriptor`
6. handler.defineProperty()
    - A trap for `Object.defineProperty()`
7. handler.has()
    - A trap for the `in`operator
8. handler.get()
    - A trap for getting property values.
9. handler.set()
    - A trap for setting property valuse
10. handler.deleteProperty()
    - A trap for the `delete` operator
11. handler.ownKeys()
    - A trap for `Object.getOwnPropertyNames`and `Object.getOwnPropertySybols`
12. handler.apply()
    - A trap for a function call
13. handler.construct()
    - A trap for the `new` operator



## Create simple Proxy

`Proxy`생성자를 사용하여 프록시를 만들 때, 두 개의 파라미터 즉 대상과 핸들러를 넘깁니다. 핸들러는 하나 이상의 Trap을 정의하는 객체입니다. 프록시는 해당작업에 대해 Trap이 정의된 경우를 제외하고 모든 작업데 대해 기본 동작을 사용합니다. 간단한 forworading프록시를 만들려면 Trap없이 핸들러를 사용할 수 있습니다.

```js
let target = {};
let proxy = new Proxy(target, {});
proxy.name = "proxy";
console.log(proxy.name);        // "proxy"
console.log(target.name);       // "proxy"
target.name = "target";
console.log(proxy.name);        // "target"
console.log(target.name);       // "target"
```


## set Trap을 사용한 프로퍼
프로퍼티 값이 숫자여야 하는 객체를 만들고 싶다고 가정 해보겠습니다. 즉, 객체에 추가된 모든 새로운 프로퍼티에 대해 유효성 검사를 해야하며 값이 숫자가 아닌 경우 오류가 발생되어야합니다. 이 기능을 구현하기 위해 값을 설정하는 기본 동작을 무시하는 `set`Trap을 정의 할 수 있습니다. `set`Trap은 네개의 파라미터를 받습니다.

1. `trapTarget` : 프로퍼티를 수신하는 객체(프록시의 타겟)
2. `key` : 프로퍼티의 키 (문자열 또는 Symbol)
3. `value` : 프로퍼티 값.
4. `reciver` : 조작이 발생된 객체(일반적으로 프록시)

`Reflect.set()`은 `set` Trap에 대응하는 리플렉션 메서드이며, 이연산의 기본동작입니다. `Reflect.set()`메서드는 `set`프록시 Trap과 동일한 네개의 파라미터를 받아 Trap내부에서 메서드를 사용하기 쉽게 만듭니다. `set`프록시 Trap과 동일한 네개의 파라미터를 받아 Trap 내부에서 메서드를 사용하기 쉽게 만듭니다. Trap은 프로퍼티가 설정되면 `true`를 반환하고 그렇지 않으면 `false`를 반환합니다. (`Reflect.set()` 메서드는 작업이 성공했는지 여부에 따라 올바른 값을 반환합니다.)  

프로퍼티의 값을 검증하기 위해서는 `set` Trap을 사용하고 입력된 `value`를 검사해야합니다.
```js
let target = {
    name: "target"
};
let proxy = new Proxy(target, {
    set(trapTarget, key, value, receiver) {
        // 기존 프로퍼티를 무시하므로 영향을주지 않습니다.
        if (!trapTarget.hasOwnProperty(key)) {
            if (isNaN(value)) {
                throw new TypeError("Property must be a number.");
            }
        }
        // 프로퍼티를 추가합니다.
        return Reflect.set(trapTarget, key, value, receiver);
    }
});
// 새로운 프로퍼티를 추가합니다.
proxy.count = 1;
console.log(proxy.count);       // 1
console.log(target.count);      // 1
// 이미 대상에 존재하기 때문에 name에 지정할 수 있습니다.
proxy.name = "proxy";
console.log(proxy.name);        // "proxy"
console.log(target.name);       // "proxy"
// throws an error
proxy.anotherName = "proxy";
```
이 코드는 target에 추가되는 새로운 프로퍼티의 ㅌ값을 확인하는 프록시 Trap을 정의합니다. `proxy.count=1`이 실행되면 `set`Trap이 호출됩니다. `trapTarget`값은 `target`과 같고 `key`는 `count`,`value`는 1이며 `receiver`는 `proxy`입니다. `target`에 `count`라는 이름의 기존 프로퍼티가 없으므로 프록시는 `isNaN()`에 전달하여 값의 유효성을 검사합니다. 결과가 `NaN`의 경우, 숫자값이 아니기 때문에 에러가 발생됩니다. 이 코드는 `count`를 `1`로 설정하기 때문에, 프로시는 새 프로퍼티를 추가하기 위해 Trap에 전달된 네개의 파라미터를 사용하여 `Reflect.set()`을 호출합니다.   

`proxy.name`에 문자열이 지정되어도 작업은 성공적으로 완료됩니다. `target`은 이미 `name`프로퍼티를 가지고 있기 때문에, `trapTarget.hasOwnProperty()`메소드를 호출함으로써 유효성 체크에서 그 프로퍼티를 생략합니다. 이렇게 하면 기존의 NaN 프로퍼티 값이 계속 지원됩니다.  

그러나 `proxy.anotherName`에 문자열이 할당되면 오류가 발생합니다. `anotherName`프로퍼티는 `target`에 없으므로 해당 값의 유효성을 검사 해야합니다. 유효성 검사에서 `"proxy"`가 숫자 값이 아니기 때문에 오류가 발생합니다.  

프로퍼티가 쓰여질 떄 `set`프록시 Trap이 가로챌수 있고, `get`프록시 Trap은 프로퍼티가 읽혀질 때 가로 챌 수 있습니다.


## get Trap을 사용하여 객체 모양 유효성 검사.

Javascript에서는 선언되지 않은 객체 프로퍼티에 접근할떄 `undefined`값이 나옵니다. 이렇게 오류가 나지 않는다는 점이 치명적일 때가 있죠
```js
let target = {};
console.log(target.name) // undefined
```
이런 상황에서 프록시를 사용하여 객체 모양의 유효성 검사를 통해 문제를 해결할 수 있습니다.  

객체 모양은 객체에서 사용할 수 있는 프로퍼티 및 메서드의 모음입니다. JavaScript엔진은 객체 모양을 사용하여 코드를 최적화 하고 종종 객체를 나타내는 클래스를 만듭니다. 객체가 항상 동일한 프로퍼티 및 메서드 (`Object.preventExtensions()`메서드, `Object.seal()`메서드또는 `Obejct.freeze()`메서드로 적용 할 수 있는 동작)를 항상 가지고 있다고 가정할 수 있는 경우, 존재하지 않는 프로퍼티에 접근하려는 시도에 오류를 발생하면 도움이 될 수 있습니다. 프록시를 이용하면 객체 모양 유효성 검사를 쉽게 만들 수 있습니다.   

프록시 검즈은 프로퍼티가 읽혀질 때만 발생해야 하기 때문에 `get`Trap을 사용합니다. `get`Trap프로퍼티가 개ㅑㄱ체 상에 존재하지 않더라도 프로퍼티가 읽힐 때 호출되며 세개의 파라미터를 받습니다.

1. `trapTarget` : 프로퍼티를 읽어내는 객체
2. `key` : 프로퍼티 키(문자열 또는 *Symbol*)
3. `recevier` : 조작이 발생된 객체(일반적으로 프록시)

이 파라미터는 `set`Trap의 파라미터와 유사하지만 차이점이 있습니다. `get`Trap은 값을 쓰지 않기 때문에 `value`는 여기서 아무런 가치가 없습니다. `Reflect.get()`메서드는 `get`Trap과 동일한 세개의 파라미터를 방아들이고 프로퍼티의 기본값을 반환합니다.  

다음과 같이 `get`Trap과 `Reflect.get()`를 사용하여 프로퍼티가 대상에 없을때 에러를 발생시킬 수 있습니다.

```js
let proxy = new Proxy({}, {
        get(trapTarget, key, receiver) {
            if (!(key in receiver)) {
                throw new TypeError("Property " + key + " doesn't exist.");
            }
            return Reflect.get(trapTarget, key, receiver);
        }
    });
// 프로퍼티 추가는 잘 됩니다.
proxy.name = "proxy";
console.log(proxy.name);            // "proxy"
// 존재하지 않는 프로퍼티는 에러를 던집니다.
console.log(proxy.nme);             // throws error
```
이 예제에서 `get`Trap은 프로퍼티 읽기 연산을 가로 챕니다. `in`연산자는 프로퍼티가 이미 `receiver`에 존재하는지를 결정하는데 사용됩니다.`receiver`는 `receiver`가 `has` Trap을 가진 프록시인 경우 `trapTarget` 대신 `in`과 함께 사용됩니다. 이 경우 `trapTarget`을 사용하면 `has` Trap을 회피하고 잠재적으로 잘못된 결과를 줄 수 있습니다. 프로퍼티가 없으면 오류가 발생하고 그렇지 않으면 기본 처리가 사용됩니다.  

이 코드를 사용하면 `proxy.name`과 같은 새 프로퍼티는 아무 문제없이 추가하고 수정 및 읽을 수 있습니다. 마지막 줄에는 `nme`에 접근해서 등록되지 않은 프로퍼티에 접근했을때의 에러처리를 확인했습니다.



## has Trap을 사용하여 프로퍼티 숨기기.
`in`연산자느 주어진 객체에 프로퍼티가 존재하는지 여부를 판단하고, 이름이나 Symbol과 일치하는 자체 프로퍼티 프로터 타입 프로퍼티가 있으면 true를 반환합니다. 

```js
let target = {
    value: 42;
}
console.log("value" in target);     // true
console.log("toString" in target);  // true
```
위 에제에서 `value`는 target의 자체 프로퍼티고 `toString`은 Object에서 상속받은 프로토타입 프로퍼티입니다. 프록시를 사용하면 이 작업을 가로 채서 has Trap을 사용하여 `in`에 다른값을 반환할 수 있습니다.  

`has`Trap은 `in`연산자가 사용될 떄마다 호출됩니다. 호출될 때 두개의 파라미터가 `has`Trap에 전달됩니다. 

1. `trapTarget` : 프로퍼티의 read객체(프록시 타켓)
2. `key` : 체크 대상의 프로퍼티 키(문자열 또는 Sybole)

`Reflect.has()`메서드는 동일한 파라미터를 받아 들여 `in`연산자에 대한 기본 응답을 반환합니다. `has`Trap과 `Reflect.has()`를 사용하면 일부 프로퍼티는 `in`동작을 변경하고 다른 프로퍼티는 기본 동작을 되돌릴 수 있습니다. 예를 들면 `value`프로퍼티를 숨기고 싶다고 생각하면 다음과 같이 작성할 수 있습니다.


```js
let target = {
    name: "target",
    value: 42
};
let proxy = new Proxy(target, {
    has(trapTarget, key) {
        if (key === "value") {
            return false;
        } else {
            return Reflect.has(trapTarget, key);
        }
    }
});
console.log("value" in proxy);      // false
console.log("name" in proxy);       // true
console.log("toString" in proxy);   // tru
```
위 코드에서 `in`연산자로 `value`프로퍼티를 확인하면 false가 나옵니다. has Trap으로 프로퍼티를 숨긴것이죠.



## deleteProperty Trap을 사용하여 프로퍼티 삭제 방지하기.
`delete`연산자는 객체에서 프로퍼티를 제거하고, 성공하면 true, 실패하면 false를 반환합니다. strict모드에서 `delete` 연산자는 `nonconfigurable` 프로퍼티를 던질 때 에러를 던집니다.



```js
let target = {
    name: "target",
    value: 42
};
Object.defineProperty(target, "name", { configurable: false });
console.log("value" in target);     // true
let result1 = delete target.value;
console.log(result1);               // true
console.log("value" in target);     // false
// Note: 아래 라인은 strict 모드에서 에러가 발생합니다.
let result2 = delete target.name;
console.log(result2);               // false
console.log("name" in target);      // true
```

`deleteProperty` Trap은 객체 속성에서 `delete`연산자가 사용될 때마다 호출됩니다. Trap에는 두개의 파라미터가 전달됩니다. 

1. `trapTarget` : 프로퍼티를 삭제해야 할 객체
2. `key` : 삭제하는 프로퍼티의 키.

`Reflect.deletepProerty()` 메서드는 `deleteProperty` Trap의 기본 구현을 제공하고 동일한 두개의 파라미터를 받아들입니다. `Reflect.deleteProterty()`와 `deleteProperty` Trap을 결합하여 `delete`연산자가 동작하는 방식을 변경할 수 있습니다. 예를 들면 특정 프로퍼티를 삭제하지 못하게 할 수 있죠.


```js
let target = {
    name: "target",
    value: 42
};
let proxy = new Proxy(target, {
    deleteProperty(trapTarget, key) {
        if (key === "value") {
            return false;
        } else {
            return Reflect.deleteProperty(trapTarget, key);
        }
    }
});
// Attempt to delete proxy.value
console.log("value" in proxy);      // true
let result1 = delete proxy.value;
console.log(result1);               // false
console.log("value" in proxy);      // true
// Attempt to delete proxy.name
console.log("name" in proxy);       // true
let result2 = delete proxy.name;
console.log(result2);               // true
console.log("name" in proxy);       // false
```
이 접근법은 strict모드에서 오류를 던지지 않고 프로퍼티를 삭제되지 않도록 보호하려는 경우에 유용합니다.




## 프로토 타입 프록시 Trap의 작동방식
이 Trap들에는 몇가지 제한사항이 있습니다. 첫째, `getPrototypeOf`Trap은 객체 또는 `null`을 반환해야하고, 다른 반환 값은 런타임 오류를 발생시킵니다. 반호나값 검사는 `Object.getPrototypeOf()`가 항상 예상값을 반혼하도록 보장합니다. 비슷하게, 연산이 성공하지 못하면 `setPrototypeOf`Trap의 반환값은 false이어야합니다. `setPrototypeOf`가 false를 반환하면, `Object.setprototypeOf()`는 에러를 던집니다. `setPrototypeOf`가 false가 아닌 다른 값을 반호나하면 `Object.setPrototypeOf()`는 연산이 성공했다고 가정합니다.  

다음 예제는 항상 `null`을 반환하여 프록시의 프로토 타입을 숨기며 프로토타입을 변경할 수 없습니다.

```js
let target = {};
let proxy = new Proxy(target, {
    getPrototypeOf(trapTarget) {
        return null;
    },
    setPrototypeOf(trapTarget, proto) {
        return false;
    }
});
let targetProto = Object.getPrototypeOf(target);
let proxyProto = Object.getPrototypeOf(proxy);
console.log(targetProto === Object.prototype);      // true
console.log(proxyProto === Object.prototype);       // false
console.log(proxyProto);                            // null
// succeeds
Object.setPrototypeOf(target, {});
// throws error
Object.setPrototypeOf(proxy, {});
```
이 코드는 `target`과 `proxy`의 동작 사이의 차이점을 강조합니다. `Object.getPrototypeOf()`은 `target`에 대한 값을 반환하는 동안 `getProtptypeOf` Trap이 호출되기 때문에 `proxy`에 대해 `null`을 리턴합니다. 비슷하게 `ObejctsetPrototypeOf()`는 `target`에서 사용될 떄 성공하지만 `setPrototypeOf` Trap으로 인해 `proxy`에서 사용될 떄 에러를 던집니다.   

이 두 Trap의 기본동작을 사용하려면 `Reflect`에서 해당 메서드를 사용해야 합니다. 예를 들어, 이 코드는 `getPrototype` 및 `setProtypeOf`Trap의 기본동작을 구현합니다.

```js
let target = {};
let proxy = new Proxy(target, {
    getPrototypeOf(trapTarget) {
        return Reflect.getPrototypeOf(trapTarget);
    },
    setPrototypeOf(trapTarget, proto) {
        return Reflect.setPrototypeOf(trapTarget, proto);
    }
});
let targetProto = Object.getPrototypeOf(target);
let proxyProto = Object.getPrototypeOf(proxy);
console.log(targetProto === Object.prototype);      // true
console.log(proxyProto === Object.prototype);       // true
// succeeds
Object.setPrototypeOf(target, {});
// also succeeds
Object.setPrototypeOf(proxy, {});
```
이 예에서 `getPrototypeOf` 및 `setPrototypeOf`Trap이 기본 실행을 사용하기 위해 통과하고 있기 때문에 `target`과 `proxy`를 교대로 사용할 수 있고 같은 결과를 얻을 수 있습니다. 이 예제는 몇가지 중요한 차이점 때문에 `Object`에서 같은 이름의 메서드보다는 `Reflect.getPrototypeOf()`와 `Reflect.setPrototypeOf()`메서드를 사용하는 것이 중요합니다.





## REF
- [proxyAndReflectionApi](https://infoscis.github.io/2018/02/27/ecmascript-6-proxies-and-the-reflection-api)
- [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)