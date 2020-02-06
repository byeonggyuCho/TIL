# Type Inference


## Intro
이번 섹션에서 타입스크립트의 타입 추론에 대해서 다루겠습니다. 즉, 타입을 추론하는 위치와 방법에 대해서 다루겠습니다.

## Basics
타입스크립트에서 명시적인 타입 어노테이션이 없는 곳에서 타입 정보를 제공하기 위해 타입 추론이 사용되는 곳이 있습니다.
```js
let x = 3;
```
변수 `x`의 타입은 `number`로 추론됩니다.  
이런 추론은 변수나 멤버를 초기화하거나 파라미터 기본값을 설정하거나  함수의 반혼 유형을 정할때 발생합니다.


## Best common type
몇 포현식에서 타입 추론이 될 때, "가장 일반적인 타입"을 계산하기 위해 표현식의 타입이 사용됩니다.
```ts
let x = [0,1, null];
```
`x`의 타입을 추론하기 위해서 각 배열 요소의 타입을 고려해야합니다.  
배열의 타입에 대해  `number`와 `null`이라는 두가지 선택이 있습니다.  
가장 일반적인 타입 알고리즈은 각 후보 유형을 고려하며모든 후보 유형이 호호나될 수 있는 타입을 고릅니다.  

제공된 후보 타입에서 가장 일반적인 타입을 골라야 하기때문에, 모든 유형이 공통된 구조를 공유하는 경우도 있지만 모든 후보 타입의 상위 타입이 없는 경우도 있습니다.  
```ts
let zoo= [new Rhino(), new Elephant(), new Snake()];
```
이상적으로 `zoo`가 `Animal[]`로 추론되길 원하지만 배열에 `Animal` 타입 객체가 없기 때문에 배열 요소 타입으로 추론할 수 없습니다.  
이것을 해결하기 위해서 다른 후보 타입의 상위 타입이 없을 때, 명시적으로 타입을 제공합니다. 
```ts
let zoo: Animal[] = [new Rhino(), new Elephant(), new Snake()];
```
가장 일반적인 타입을 찾을 수 없을 때, 유니온 배열 타입으로 추론됩니다. `(Rhino | Elephant | Snake)[]`  

## Contextual Typing
타입스크립트에서 "다른 방향"에서도 타입추론이 작동합니다. "contextual typing"으로 알려져 있습니다.  
Contextual typing은 표현식의 타입이 해당 위치에 암시된 경우에 발생합니다. 

```ts
window.onmousedown = function(mosuseEvent){
    console.log(mouseEvent.button);
    console.log(mouseEvent.kangaroo);   // Error
}
```
타입스크립트 타입 검사기는 오른쪽에 할당된 함수표현식의 타입을 추론하기 위해서 `window.onmousedown`함수의 타입을 사용합니다.  
그렇게 했을때 `button`속성을 포함하고 있지만 `kangaroo`속성은 없는 `mouseEvent`파라미터의 타입을 추론될 수 있습니다.  

타입스크립트는 다른 문맥도 추론할 수 있습니다.
```ts
window.onscroll = function(uiEvent) {
    console.log(uiEvent.button); // Error
}
```
위 함수가 `window.onscroll`에 할당되는거 근거로 타입스크립트는 `uiEvnet`가 `UIEvent`이며 `MouseEvent`가 아니란 것을 압니다. 
`UIEvent` 객체는 `btton`프로퍼티가 없으며 타입스크립트는 에러를 발생시킬 겁니다.  

이 기능이 상황적으로 입력된 위치에 있지 않은 경우에, 함수의 인자는 암묵적으로 `any`타입을 갖으며 에러가 발생하지 않습니다.  
(`--noImplicitAny` 옵션을 사용하지 않는 경우에 한정합니다.)  

```ts
const handler = function(uiEvent) {
    console.log(uiEvent.button);
}
```

문맥적 타입을 재정의하기 위해서 함수의 인자에 정보를 제공할 수 있습니다.
```ts
window.onscroll = function(uiEvent: any) {
    console.log(uiEvent.button);  //<- Now, no error is given
};
```

그러나 이 코드는 `uiEvent`가 `btton`속성을 가지고 있지 않기 때문에 `undefined`를 기록할 것입니다.  
문맥적 타입추론은 다양한 경우에 적용됩니다.  
일반적인 경우에는 함수 호출에 대한 인수, 우할당 표현식, 타입 단언(Type Assertions), 각 객체 및 배열 리터럴, 그리고 반환문입니다.  
문맥적 타입추론은 가장 일반적인 유형의 후보 유형으로 작동합니다.  

```ts
function createZoo(): Animal({
    return [new Rhino(), new Elephant(), new Snake()]
})
```
이 예에서 가장 일반적인 타입은 네개(Rhino, Elephant, Snake, Animal)로 구성됩니다.  
이 중에서 타입 알고리즘에 의해 `Animal`이 될 수 있습니다. 