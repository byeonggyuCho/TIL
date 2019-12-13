# Corutines

## Intro

```js
const iterator = (function*(){
  let a = 3, b = 5;
  a = 10
  yield a;
  b = 10
  yield [a, b];
})();


iterator.next();
iterator.next();
iterator.next();
```

위 코드를 [바벨사이트](https://babeljs.io/)에서 변환해보면 다음과 같은 로직이 됩니다. 
```js
var iterator =
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var a, b; // 여기!!!!!
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          a = 3, b = 5;
          a = 10;
          _context.next = 4;
          return a;
 
        case 4:
          b = 10;
          _context.next = 7;
          return [a, b];
 
        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})();

```
이 문법상에서는 컨티뉴에이션아리는 제너레이터의 상태를 관리해준즌 객체가 필요하니다.






## ref
- [코루틴](https://www.bsidesoft.com/?p=8135)
- [babel](https://babeljs.io/)
- [kotlin](https://kotlinlang.org/)