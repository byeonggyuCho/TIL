# Debouncing and Throttling



## Intro

디바운스와 스로틀은 함수 호출의 빈도수를 컨트롤 하는 기술이다.<br>
대표적인 예로 스크롤 이벤트 리스너는 1초에 30회 이상 호출된다.<br>
이런 불필요한 호출이 발생하는 상황을 해결할 수 있는 방법이 쓰로틀링과 디바운스다.<br>
둘은 비슷한 기능을 하지만 약간의 차이가 있다.<br>

*Debouncing* : 연이어 호출되는 함수들 중 마지막 함수(또는 제일 처음)만 호출하도록 하는 것<br>
*Throttling* : 마지막 함수가 호출된 후 일정 시간이 지나기 전에 다시 호출되지 않도록 하는 것<br>


## #Debounce
디바운스는 연속적으로 중첩되는 요청을 하나로 그룹화할 수 있게 해준다.
정확히는 디바운스는 함수가 실행되기전에 일정한 대기시간(trigger gap)을 갖는데, 이 지연이 끝나기전에 다시 호출이되면 대기시간이 초기화되는 식이다.
즉 연속적인 실행요청이 무시된다.
함수가 다시 호출되기 전까지 시간 간격을 두어 성능을 개선할 수 있다.

지연시간을 지속효과에 비유하면 이해가 쉽다.
(e.g. 30초 동안 유지되는 버프스킬이 있을때 10초가 남은시점에 중첩 사용을 하면 다시 30초부터 카운팅된다.)
이런 트리거갭은 필요에따라 즉시실행이 필요할 떄도 있는데 디바운스기능을 제공하는 라이브러리(jQuery, Lodash, underscroe)등에서 옵션값으로 기능을 제공한다.
하지만 일반적으로 후행처리가 필요한 경우가 많다.



###  Use Case
1. 사용자가 브라우저 리사이징을 멈추는 시점에 이벤트를 발생하고 싶을때
2. 자동완성처럼 사용자가 타이핑을 멈춘뒤 ajax요청을 보내고 싶을떄.
3. 스크롤 포지션을 계산하고 매 50ms마다 이벤트를 걸어야할떄.
4. key down 이벤트가 중첩실행되는 것을 막고싶을때.
5. 자동저장 기능
  - 사용자가 업데이트를 하거나 변화가 생겼을때 상태를 저장하려고 할것이다.
  - 상태변화가 발생하지 않으면 이벤트가 발생할 필요가 없다.
  - 이 처럼 불필요한 이벤트 처리를 막음으로서 성능향상을 할 수 있다.
6. 패스워드 검증 (타이핑이 끝난 시점에 이벤트발생.)


```js

// 이벤트를 감쌀 디바운씽 함수.
function debounce(fn, delay) {
    
    let inDebounce;

    //timer에 접근이 가능한 클로져 함수..
    return function() {
        
        // 클로져 함수안에서 this와 arguments 변수로 디바운싱 함수의 스코프 변수를 접근한다.
        let context = this;
        let args = arguments;

        // 만약 이벤트가 호출되면 타이머를 초기화하고 다시 시작한다.
        clearTimeout(inDebounce);
        inDebounce = setTimeout(function(){
            fn.apply(context, args);
        }, delay);

    }
}


// 이벤트 함수를 디바운싱 함수로 감싸서 2초 마다 발생하도록 한다.
debounceBtn.addEventListener('click', debounce(function() {
  console.info('Hey! It is', new Date().toUTCString());
}, 3000));

```


## #쓰로틀링

- 정기적인 함수 호출을 보장한다.(인터벌.)
함수가 호출되기 전에 특정 시간을 기다리는 것만 제외하고는 디바운싱과 비슷하다.<br>
N초의 시간동안 한번 발생하게 하는게 쓰로틀링이다.<br>
만약 5초에 한번 실행가능한 함수가 있다고 하자.<br>
1초에 2번 호출하더라도 최초실행이후 5초 이후에 실행된다.<br>
즉 함수가 호출되는 횟수를 제한하는 기술이다.<br>
함수가 한번 호출되고 딜레이 시간동안에는 n번 호출하더라고 딜레이가 종료된 뒤 한번만 호출된다.
<br><br>
쓰로틀링은 첫번째 실행에 바로 발생한다.
그리고 제한시간을 설정한다.<br>
이 제한시간 사이에 다시 쓰로틀링을 호출할수 있지만 실행은 제한시간이 끝난뒤에 딱 한번 발생한다.
즉 n회 호출하더라도 한번만 호출되고 나머지는 무시된다.<br>

<br><br>
e.g. : 10초에 한번만 실행하게 하고 싶다.
사용자가 1초에 20번의 클릭을 해도 1초에 한번만 실행하게 만들 수 있다.





### USE CASE
- 매 초마다 지속적인 실행을 보장한다. (200ms마다 스크롤 위치를 확인해서 CSS 애니메이션을 트리거하는 것처럼)
- 버튼클릭
- API 호출
- mouceMove, touchmove 이벤트 핸들러
- 무한스크롤에서 사용자가 바닥과의 갭사이 거리를 체크할때(새로운 컨텐츠를 로드할 타이밍을 체크.)

```js
const throttle = (func, limit) => {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

throttleBtn.addEventListener('click', throttle(function() {
  return console.log('Hey! It is', new Date().toUTCString());
}, 1000));

```


```js

// lodash
var debounce = require('./debounce'),
    isObject = require('./isObject');

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide an options object to indicate whether
 * `func` should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

module.exports = throttle;



```




## #requestAnimationFrame(rAF)
- 스로틀의 제안이 될 수 있다.
- 화면의 요소를 재계산 및 렌더링을 하고 원활한 변경 또는 애니메이션을 보장하는 경우 사용된다.
- 함수실행 속도를 제한하는 방법중 하나.
- 쓰로틀링과 유사하지만 네이티브 API라는 점이 주목할만하다.
- 쓰로틀의 대안이 될 수 있는 기능.
- 60fps(16mx 프레임)을 목표로 하지만 내부적으로 렌더링 스케줄링에 대한 최적의 타이밍을 결정한다.
- 전문화된 API기 때문에 일반적인 라이브러리에서는 이 기능을 적용하지 않는다.
- 16ms의 쓰로틀과 비교했을때 더 나은성능을 제공한다.

- 고려사항.
  - 브라우저 탭이 활성화되어 잇지 않으면 실행되지 않는다.
  - 실행과 종료를 직접 관리해야한다.
  - IE9에선 제공하지 않는다. 오페라미니나 구형 안드로이드도 지원하지 않는다.
  - 노드에서 지원하지 않는다. 따라서 서버에서 사용할 수 없다.(쓰로틀 파일시스템 이벤트에서)


- 사용예
  - 페인팅
  - 속성을 애니메이션할때 요소의 위치값을 재계산하는 것.
  - CSS 애니메이션을 트리거하는 Ajax요청을 하거나 클래스 추가 제거를 결정하려 할때, 좀더 나은 퍼포먼스의 쓰로틀, 디바운스 를 고려할때.



### REF
- https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf#.ly8uqz8v4
- https://css-tricks.com/the-difference-between-throttling-and-debouncing/
- https://css-tricks.com/debouncing-throttling-explained-examples/
- https://remysharp.com/2010/07/21/throttling-function-calls

- https://joshua1988.github.io/web-development/javascript/javascript-interview-3questions/
- https://www.zerocho.com/category/JavaScript/post/59a8e9cb15ac0000182794fa