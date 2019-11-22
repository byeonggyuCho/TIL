# Animation

## Intro
웹에서 CSS와 자바스크립트로 애니메이션을 만들 수 있습니다. 어느 것을 사용할지는 프로젝트의 종속성과 원하는 효과의 종류에 따라 결정됩니다.

**요약**
1. UI요소 상태전환과 같은 간단한 one-shot 전환에는 CSS 애니메이션을 사용합니다.  
CSS 전환 및 애니메이션은 측면에 탐색 메뉴를 나타내거나 도움말을 표시하는데 적합합니다. 자바스크립트를 사용하여 상태를 제어할 수 있지만 애니메이션 자체는 CSS로 처리합니다.
2. 애니메이션을 세밀하게 제어해야하는 경우 자바스크립트를 사용합니다.
Web Animations API는 표준 기반의 접근 방식이며, 복잡한 객체 지향 애플리케이션에 이상적입니다. 자바스크ㅡ립트는 중지, 일시 중지, 감속 또는 되감기를 해야 하는 경우에도 유용합니다.  
3. 전체 화면을 손으로 조정하려는 경우에는 `requestAnimationFrame`을 직접 사용합니다.  
게임을 빌드하거나 HTML Canvas를 그리는 경우 유용한 기능입니다.

대부분의 기본 애니메이션은 CSS 또는 자바스크립트로 만들 수 있지만 투자하는 노력과 시간은 다릅니다.


## CSS로 애니메이션 만들기.

클릭을하면 `move`클래스를 토글하면서 엘리먼트를 이동시키는 예제입니다. `transition`은 동작시간에 대한 옵션입니다. 이동시간은 `500ms`가 걸리도록 해보겠습니다.
```css
.box {
  -webkit-transform: translate(0, 0);
  -webkit-transition: -webkit-transform 500ms;

  transform: translate(0, 0);
  transition: transform 500ms;
}

.box.move {
  -webkit-transform: translate(100px, 100px);
  transform: translate(100px, 100px);
}
```

```js
function move(element){

    if(element.classList.contains('move'))
        element.classList.remove('move');
    else
        element.classList.add('move');
}

var box = document.querySelector('.box');
box.addEventListener('transitionend', onTransitionEnd, false);

function onTransitionEnd() {
  // Handle the transition finishing.
}


```
CSS 애니메이션을 이용하면 애니메이션 `keyframes`, 기간 및 반복을 훨씬 세밀하게 제어할 수 있습니다.


```css
/**
 * This is a simplified version without
 * vendor prefixes. With them included
 * (which you will need), things get far
 * more verbose!
 */
.box {
  /* Choose the animation */
  animation-name: movingBox;

  /* The animation’s duration */
  animation-duration: 1300ms;

  /* The number of times we want
      the animation to run */
  animation-iteration-count: infinite;

  /* Causes the animation to reverse
      on every odd iteration */
  animation-direction: alternate;
}

@keyframes movingBox {
  0% {
    transform: translate(0, 0);
    opacity: 0.3;
  }

  25% {
    opacity: 0.9;
  }

  50% {
    transform: translate(100px, 100px);
    opacity: 0.2;
  }

  100% {
    transform: translate(30px, 30px);
    opacity: 0.8;
  }
}
```
css애니메이션으로 애니메이션 자체를 대상 요소와 독립적으로 정의하고 animation-name속성을사용하여 필요한 애니메이션을 선택할 수 있습니다.



## 자바스크립트로 애니메이션 만들기.




## Ref
- [애니메이션 성능비교](https://developers.google.com/web/fundamentals/design-and-ux/animations/animations-and-performance?hl=ko#css-vs-javascript-performance)
- [CSS와 자바스크립트 애니메이션](https://developers.google.com/web/fundamentals/design-and-ux/animations/css-vs-javascript?hl=ko)
- [JavaScript animations](https://javascript.info/js-animation)
- [JavaScript animations](https://www.tutorialspoint.com/javascript/javascript_animation.htm)
- [CSS Animation vs Javascript Animation](https://frontdev.tistory.com/entry/Animation-CSS-Animation-vs-Javascript-Animation)
- [Simple Javascript Animation](https://medium.com/allenhwkim/animate-with-javascript-eef772f1f3f3)
- https://daybrush.com/scenejs/release/latest/doc/
- [CSS and JavaScript Animation Tips with Examples](https://levelup.gitconnected.com/css-and-javascript-animation-tips-with-an-example-in-angular-678246901752)