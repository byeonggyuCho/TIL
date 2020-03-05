# Redering Optimizing


## dom의 Depth를 최소화한다.  
돔의 깊이와 크기를 작게 구성할수록 재배치(리플로)가 빨리된다.  

## 스타일이 복잡할수록 화면에 페인팅되는 시간이 늘어난다.  
## 자바스크립트를 만나면 실행이 완료 될 때까지 렌더링이 지연된다.  
따라서 자바스크립트를 비동기로 설정하고 주요 렌더링 경로에 불필요한 자바스크립트를 제거해야한다.  



## 주변에 영향을 주는 요소를 제한한다. 
인터렉션의 의해 크기나 위치가 변경되는 요소는 변경될때 주변 요소들이 최대한 영향받지 않도록 정의한ㄷ.  

## 개발자도구를 이용한 분석
리플로나 리페인트가 얼마나 발생하는지 개발자 도구를 통해 확인하여 최적화를 한다.


## 스타일 변경을 한번에 처리한다.  
```js
var myelement = document.getElementById('myelement');
myelement.width = '100px';
myelement.height = '200px';
myelement.style.margin = '10px';
```
대신에 
```css
.newstyles {
    width: 100px;
    height: 200px;
    margin: 10px;
}
``
```js
var myelement = document.getElementById('myelement');
myelement.classList.add('newstyles');
```

## display속성을 이용한다.  
이 방법은 변경 대상 노드를 렌더 트리에서 제거한뒤, 모든 작업이 끝났을때 다시 렌더트리에 추가하는 방법이다.
즉 대상 노드를 `dispaly="none"`로 수정하여 렌더트리에서 제거한뒤 작업이 끝나고 display값을 복원한다.  
렌더트리에서 빠진 상태에서 작업이 이뤄짐으로 리-랜더링을 유발하는 작업을 n번하더라도 마지막 시점에 한번만 렌더링된다.

```js
var element = document.getElementById("box1"); 

for(var i=50; i<100; i++) {     
    element.style.width = i + "px"; 
} 

for(i=1; i<=50; i++) {     
    element.style.borderWidth = i + "px"; 
}
```
이 코드를 실행하먄 루프를 반복할때마다 리렌더링이 발생한다.  

반면 아래 코드는  앞뒤로 diplay값을 수정하여 렌더트리에서 제거하면 리렌더링은 한번만 발생한다.
```js

var element = document.getElementById("box1"); 
element.style.display = "none"; 

for(var i=50; i<100; i++) {     
    element.style.width = i + "px"; 
} 

for(i=1; i<=50; i++) {     
    element.style.borderWidth = i + "px"; 
}

element.style.display = "block";
```

## 노드를 복제한다. 
앞서 소개한 display를 조작하는 방법과 비슷한 발상이다.  
변경하려는 노드를 복제한뒤 리플로, 리페인트를 유발하는 작업을 처리한뒤 원래 노드와 치환하는 방법이다.  
복제된 노드는 DOM트리에 추가된 상태가 아니므로 렌더링 성능에 영향을 주는 작업을 하더라도 리플로 리페인트가 발생하지 않는다.
치환시점에 단 한번의 렌더링이 발생한다.  

```js
var element = document.getElementById("box1");
var clone = element.cloneNode(true);     // 원본 노드를 복제한다.

for(var i=0; i < 100; i++) {
    clone.style.width = i + "px";
}

// 변경된 복제 노드를 DOM 트리에 반영하기 위해 기존 노드와 치환한다.
parentNode.replaceChild(clone, element);
```

## 캐싱
특정 속성이나 메서드는 리랜더링을 유발합니다.  
이런 속성이나 메서드가 반복적으로 호출하는 대신 변수에 저장하여 반복호출을 피하는 방법입니다. 

```js
// 아래와 같이 반복 구문에서 리플로 유발 속성을 요청하는 것은 피해야 한다.
for(condition) {
    el.style.width = el.scrollWidth + "px";
    el.style.left - el.scrollLeft + "px";
}
```

```js
// 리플로를 유발할 수 있는 scrollWidth 속성과 scrollLeft 속성의 값은 
// 반복 구문을 실행하기 전에 변수에 캐싱해 리플로 발생을 최소화한다. 
var nWidth = el.scrollWidth, nLeft = el.scrollLeft; 

for(condition) {     
    el.style.width = nWidth + "px";     
    el.style.left = nLeft + "px"; 
}
```

### 라이브러리를 사용한다.  
가상돔을 사용하는 리액트나 뷰같은 라이브러리를 사용한다. 


## ref
- [브라우저 렌더링](https://12bme.tistory.com/140)
- [](https://jee-goo.tistory.com/entry/WEB-%EC%9B%B9-%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80-%EB%A0%8C%EB%8D%94%EB%A7%81)