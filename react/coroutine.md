# Coroutine

## intro
코루틴은 루틴의 일종으로서, 협동 루틴이라 할 수 있다(코루틴의 "Co"는 with 또는 togather를 뜻한다).  
풀어서 설명하면 제어권을 서러 넘겨다며 협동하여 실행하는 상호 연계 프로그램이란 표현이 가능하다. 


코루틴은 suspend/resume가 가능하다.

## 1.왜 코루틴이 필요할까?

## 2.Coroutine in Javascript
- async
- generator

### 2.1 generator
Iterator를 쉽게 만들 수 있는 문법으로 잘 알려진 Generator는 사실 코루틴의 한 형태이다.

### 2.2async

## ref
- [코루틴-소개](https://medium.com/@jooyunghan/%EC%BD%94%EB%A3%A8%ED%8B%B4-%EC%86%8C%EA%B0%9C-504cecc89407)
- [js-async-generator-코루틴](https://medium.com/@jooyunghan/js-async-generator-%EC%BD%94%EB%A3%A8%ED%8B%B4-cabb4f5ffaff)
- [async_function](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function)
- [왜-제네레이터-함수를-써야-하는가](https://velog.io/@rohkorea86/Generator-%ED%95%A8%EC%88%98%EB%A5%BC-%EC%9D%B4%ED%95%B4%ED%95%B4%EB%B3%B4%EC%9E%90-%EC%9D%B4%EB%A1%A0%ED%8E%B8-%EC%99%9C-%EC%A0%9C%EB%84%A4%EB%A0%88%EC%9D%B4%ED%84%B0-%ED%95%A8%EC%88%98%EB%A5%BC-%EC%8D%A8%EC%95%BC-%ED%95%98%EB%8A%94%EA%B0%80)
- [제너레이터와 프라미스를 이용한 비동기 처리](http://jeonghwan-kim.github.io/2016/12/15/coroutine.html)