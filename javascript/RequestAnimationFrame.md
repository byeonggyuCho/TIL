# requestAnimationFrame

## Info

![](/resource/img/javascript/final-fps.gif)
[출처](https://dribbble.com/shots/1945400-FPS-frames-per-second)

보통의 디바이스는 60fps를 지원한다. 이말은 단일 프레임은 16ms안에 수행해야함을 말한다.  
![](/resource/img/javascript/frame-full.jpg)
브라우저의 랜더링과정을 간단하게 축약해보면
1. Javascript : JS 로직을 연산
2. Style:  CSS스타일 요소를 계산.
3. Layout: 브라우저에 요소 배치를 계산(reflow)
4. Pint : 픽셀을 채움(redraw)
5. Composite : 개별적으로 진행된 이전 단계들을 합치는 단계

이 기능이 나오기전엔 `setTimeout`이용해 애니메이션을 구현했지만 이 방법엔 단점이 있습니다.
프레임을 보장하지 않는 다는 얘기죠. 무슨말이냐면 자바스크립트 엔진의 상황에 따라 프레임수가 60fps 밑으로 떨어질 수 있음을 의미합니다.

![](/resource/img/javascript/render_setTimeout.jpeg)  
종종 프레임이 누락되거나 버벅이게 되는거죠.  

`requestAnimationFrame`은 실제 화면이 갱신되어 표시되는 repaint주기에 따라 호출되기 때문에 60fps를 보장할 수 있습니다.



## polyfill
```js
window.requestAnimFrame = (function(callback) {
      return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) { window.setTimeout(callback, 1000 / 60); };
})();

```





## REF
- [requestAnimationFrame](https://fullest-sway.me/blog/2019/01/28/requestAnimationFrame/)