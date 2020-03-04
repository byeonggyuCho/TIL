# Redering Optimizing

## 리플로 최소화 방법



- 스타일이 복잡할수록 화면에 페인팅되는 시간이 늘어난다.  
- 자바스크립트를 만나면 실행이 완료 될 때까지 렌더링이 지연된다.  따라서 자바스크립트를 비동기로 설정하고 주요 렌더링 경로에 불필요한 자바스크립트를 제거해야한다.  

- dom의 Depth를 최소화한다.  
돔의 깊이와 크기를 작게 구성할수록 재배치(리플로)가 빨리된다.  

- 스타일 변경을 한번에 처리한다.  
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

- 주변에 영향을 주는 요소를 제한한다. 
인터렉션의 의해 크기나 위치가 변경되는 요소는 변경될때 주변 요소들이 최대한 영향받지 않도록 정의한ㄷ.  

- 개발자도구를 이용한 분석
리플로나 리페인트가 얼마나 발생하는지 개발자 도구를 통해 확인하여 최적화를 한다.

- 라이브러리를 사용한다.  


## ref
- [브라우저 렌더링](https://12bme.tistory.com/140)
- [](https://jee-goo.tistory.com/entry/WEB-%EC%9B%B9-%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80-%EB%A0%8C%EB%8D%94%EB%A7%81)