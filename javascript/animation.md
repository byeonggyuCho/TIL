# Animation

## Intro
웹에서 CSS와 자바스크립트로 애니메이션을 만들 수 있습니다. 어느 것을 사용할지는 프로젝트의 종속성과 원하는 효과의 종류에 따라 결정됩니다.


**Web Animations API**  


**요약**
1. UI요소 상태전환과 같은 간단한 one-shot 전환에는 CSS 애니메이션을 사용합니다.  
CSS 전환 및 애니메이션은 측면에 탐색 메뉴를 나타내거나 도움말을 표시하는데 적합합니다. 자바스크립트를 사용하여 상태를 제어할 수 있지만 애니메이션 자체는 CSS로 처리합니다.
2. 애니메이션을 세밀하게 제어해야하는 경우 자바스크립트를 사용합니다.
Web Animations API는 표준 기반의 접근 방식이며, 복잡한 객체 지향 애플리케이션에 이상적입니다. 자바스크ㅡ립트는 중지, 일시 중지, 감속 또는 되감기를 해야 하는 경우에도 유용합니다.  
3. 전체 화면을 손으로 조정하려는 경우에는 `requestAnimationFrame`을 직접 사용합니다.  
게임을 빌드하거나 HTML Canvas를 그리는 경우 유용한 기능입니다.

대부분의 기본 애니메이션은 CSS 또는 자바스크립트로 만들 수 있지만 투자하는 노력과 시간은 다릅니다.


## 1.CSS Animation

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



## 2. Javascript Animation

자바스크립트 에니메이션은 루프를 통해 프레임을 연출한다. 이때 사용되는 API가 2개가 있는데 `setTiemout`과 `requestAnimationFrame`이다. 


### setTimeout vs. reqeustAnimationFrame
다음 두 예제를 비교해보자.

```js
var count = 10;
var previousTime = 0;
function animateSetTimeout(){
  setTimeout( function animate() {
    if (count--) {
      
      let diff;
      let currentTime = new Date().getTime();
      if(count === 9){
        diff = 0;
      }else{
        diff = currentTime - previousTime
      }

      previousTime = currentTime

      console.log(`setTimeout ${count}: ${diff}`);
      setTimeout(animate);
    }
  })
}

animateSetTimeout();
```

```js
var count = 10;
var previousTime = 0;
function animateRequestAnimationFrame(){
  requestAnimationFrame( function animate() {
    if (count--) {

      let diff;
      let currentTime = new Date().getTime();
      if(count === 9){
        diff = 0;
      }else{
        diff = currentTime - previousTime
      }

      previousTime = currentTime

      console.log(`requestAnimationFrame ${count}: ${diff}`);
      requestAnimationFrame(animate);
    }
  })
}

animateRequestAnimationFrame();
```

위 예제를 실행시켜보면 `settimeout`은 브라우저의 상황에 따라 다음 프레임이 지연될 수 있지만, `requestAnimationFrame`의 경우 브라우저의 repaint주기에 따라 비교적 일정한 간격으로 실행되는것을 알 수 있다.


**window.requestAnimationFrame(callbak);**  
  이 API는 브라우저가 다음 repaint를 수행하기전에 콜백을 요청한다.
  콜백의 횟수는 보통 60fps이다.



### 2.1 animate() function
애니메이션을 구현하기위한 간단한 함수를 하나 만들었다. 
```js
function animate({timing, draw, duration}) {
  const start = performance.now();
  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) {
      timeFraction = 1;
    }
    let progress = timing(timeFraction);
    draw(progress); // draw it

    if (timeFraction < 1) {
      requestAnimationFrame(animate)
    };
  });
}
```
각 인자는 다음과 같다.
- deration : 총 애니메이션 동작시간.
- timing : 애니메이션 진척도를 계산하는 함수, 현재시간을 인자로 받아들이고 0과 1사이 숫자를 반환한다.
- draw : 함수를 실행한다. `timing`함수의 반환값을 인자로 받는다.


이 함수의 셈플을 보자.
```js
animate({
  duration: 2000,
  timing: function(t) { 
    return t 
  },
  draw: pct => {
    const air = document.querySelector('.air');
    const ball = document.querySelector('.ball');
    ball.style.left = pct * (air.offsetWidth-30) + 'px';
  }
});
```

`timing`과 `draw`함수르 이용하면 바운싱이나 가속도같은 복잡한 애니메이션 로직을 구현할 수 있다.


### 2.2 animate() function 응용
응용버전을 소개한다. 


- `timing`함수 기본값 제공 
- 기본 duration, 250ms
- draw함수만 인자로 넘기는 기능 제공.
- 애니메이션이 끝난뒤 콜백을 시점을 제공하기 위해 프로미스를 리턴
- timing 한글파라미터 제공.()


timing.js
```js
export const timing = {
  'linear': function(k) {
    return k;
  }, 
  'ease-in': function(k) {
    return Math.pow(k, 1.675);
  }, 
  'ease-out': function(k) {
    return 1 - Math.pow(1 - k, 1.675);
  }, 
  'ease-in-out': function(k) {
    return .5*(Math.sin((k - .5)*Math.PI) + 1);
  },
  'bounce-sta': function(k) {
    return 1 - Math.sin((1 - k)*s)/Math.sin(s);
  }, 
  'bounce-end': function(k) {
    return Math.sin(k*e)/Math.sin(e);
  }, 
  'bounce-sta-end': function(k) {
    return (Math.sin(k*(e - s) + s) 
      - Math.sin(s))/(Math.sin(e) - Math.sin(s));
  },
  'in-quad': function(n){
    return n * n;
  },
  'out-quad': function(n){
    return n * (2 - n);
  },
  'in-out-quad': function(n){
    n *= 2;
    if (n < 1) return 0.5 * n * n;
    return - 0.5 * (--n * (n - 2) - 1);
  },
  'in-cube': function(n){
    return n * n * n;
  },
  'out-cube': function(n){
    return --n * n * n + 1;
  },
  'in-out-cube': function(n){
    n *= 2;
    if (n < 1) return 0.5 * n * n * n;
    return 0.5 * ((n -= 2 ) * n * n + 2);
  },
  'in-quart': function(n){
    return n * n * n * n;
  },

  'out-quart': function(n){
    return 1 - (--n * n * n * n);
  },

  'in-out-quart': function(n){
    n *= 2;
    if (n < 1) return 0.5 * n * n * n * n;
    return -0.5 * ((n -= 2) * n * n * n - 2);
  };

  'in-quint':  function(n){
    return n * n * n * n * n;
  },

  'out-quint': function(n){
    return --n * n * n * n * n + 1;
  },

  'in-out-quint': function(n){
    n *= 2;
    if (n < 1) return 0.5 * n * n * n * n * n;
    return 0.5 * ((n -= 2) * n * n * n * n + 2);
  },

  'in-sine':  function(n){
    return 1 - Math.cos(n * Math.PI / 2 );
  },

  'out-sine': function(n){
    return Math.sin(n * Math.PI / 2);
  },

  'in-out-sine':  function(n){
    return .5 * (1 - Math.cos(Math.PI * n));
  },

  'in-expo': function(n){
    return 0 == n ? 0 : Math.pow(1024, n - 1);
  };

  'out-expo': function(n){
    return 1 == n ? n : 1 - Math.pow(2, -10 * n);
  },

  'in-out-expo': function(n){
    if (0 == n) return 0;
    if (1 == n) return 1;
    if ((n *= 2) < 1) return .5 * Math.pow(1024, n - 1);
    return .5 * (-Math.pow(2, -10 * (n - 1)) + 2);
  },

  'in-circ': function(n){
    return 1 - Math.sqrt(1 - n * n);
  },

  'out-circ': function(n){
    return Math.sqrt(1 - (--n * n));
  },

  'in-out-circ': function(n){
    n *= 2
    if (n < 1) return -0.5 * (Math.sqrt(1 - n * n) - 1);
    return 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1);
  }
}
```

```js
// timing functions = easein etc
import {timings} from './timins.js';

export function animate({duration = 1000, timing, draw}) {

  // if we only have one argument as a function given
  if(typeof arguments[0] === 'function'){
    draw = arguments[0];
  }

  //set timing function
  if(typeof timing === 'string'){
    timing = timings[timing];
  }

  const start = performance.now();
  return new Promise(resolve => {
    reqeustAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;

      if(timeFraction > 1){
        timeFraction = 1;
      }

      draw(timing(timeFraction));

      if( timeFraction < 1 ){
        reqeustAnimationFrame(animate);
      }else{
        resolve(true);
      }

    });
  });
}

```

이런식으로 실행해보면 된다.
```js
animate({
  duration: 2200,
  timing: 'ease-out',
  draw: pct => carEl.style.left = pct * (roadEl.offsetWidth - 100) + 'px'
}).then(showDone)
```











## 3. CSS vs Javascript


자바스크립트 애니메이션은 CSS에 비해서 브라우저에 최적화되진 않았습니다. 이럴 떄 사용하세요!
- CSS animation : slide in, slide out
- JS animation : bouncing, stop, pause, rewind 등의 좀더 복잡한 애니메이션



CSS코드가 자바스크립트보다 간단한 코드로 구현할 수 있는것 같지만 애니메이션 동작이 복잡해지면 자바스크립트보다 장황해집니다.  
바운싱을 하는 CSS코드를 보시겠습니다.

### 3.1 복잡한 동작은 javascript를 사용하는것이 낫습니다.


```css
.bounce-in-left {
	animation: bounce-in-left 1.1s both;
}

@keyframes bounce-in-left {
  0% {
    transform: translateX(-600px);
    animation-timing-function: ease-in;
    opacity: 0;
  }
  38% {
    transform: translateX(0);
    animation-timing-function: ease-out;
    opacity: 1;
  }
  55% {
    transform: translateX(-68px);
    animation-timing-function: ease-in;
  }
  72% {
    transform: translateX(0);
    animation-timing-function: ease-out;
  }
  81% {
    transform: translateX(-28px);
    animation-timing-function: ease-in;
  }
  90% {
    transform: translateX(0);
    animation-timing-function: ease-out;
  }
  95% {
    transform: translateX(-8px);
    animation-timing-function: ease-in;
  }
  100% {
    transform: translateX(0);
    animation-timing-function: ease-out;
  }
}
```
왼쪽에서 오른쪽으로 튕기는 애니메이션을 위한 코드입니다. 그런데 만약에 오른쪽으로 튕긴다거나 가속도를 적용해야할 떄는 어떻게 해야할까요? 아마 코드가 굉장히 복잡해질것 같습니다.  
이런 동작을 구현할 떄는 오히려 자바스크립트가 낫습니다.


### CSS를 동적으로 컨트롤해야할 때 자바스크립트를 사용하는게 낫습니다.
이런경우 자바스크립트가 낫습니다.
- `display`속성을 none에서 block으로 바꾼다
- height속성을 조절하는것 같은것을 구현할 때

`opacity`, `visibility`,`max-height`등의 속성이 CSS의 제약사항에 도움이 되긴하지만 한계가 분명 있습니다.
성능 최적화를 하기 위한게 아니라면 자바스크립트를 쓰는게 낫습니다.









## Ref
- [JavaScript animations](https://javascript.info/js-animation)
- [Simple Javascript Animation](https://medium.com/allenhwkim/animate-with-javascript-eef772f1f3f3)


- [애니메이션 성능비교](https://developers.google.com/web/fundamentals/design-and-ux/animations/animations-and-performance?hl=ko#css-vs-javascript-performance)
- [CSS와 자바스크립트 애니메이션](https://developers.google.com/web/fundamentals/design-and-ux/animations/css-vs-javascript?hl=ko)
- [JavaScript animations](https://www.tutorialspoint.com/javascript/javascript_animation.htm)
- [CSS Animation vs Javascript Animation](https://frontdev.tistory.com/entry/Animation-CSS-Animation-vs-Javascript-Animation)
- https://daybrush.com/scenejs/release/latest/doc/
- [CSS and JavaScript Animation Tips with Examples](https://levelup.gitconnected.com/css-and-javascript-animation-tips-with-an-example-in-angular-678246901752)
- [Web Animation](https://drafts.csswg.org/web-animations/)