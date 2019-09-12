# Memoization

## Info
연산결과를 기억하는 프로그래밍 기법을 말한다.<br>
앞에서 연산했던것을 메모리에 등록하여 계산이 중복되는것을 피한다.


## 예제
팩토리알연산에서 메모리제이션을 이용해 연산을 줄인것을 확인할 수 있다.

```js
var factorial = (function() {
  var save = {};
  var fact = function(number) {
    if (number > 0) {
      var saved = save[number - 1] || fact(number - 1);
      var result = number * saved;
      save[number] = result;
      console.log(saved, result);
      return result;
    } else {
      return 1;
    }
  };
  return fact;
})();
factorial(7); 
factorial(7); 
```

## REF

https://www.zerocho.com/category/JavaScript/post/579248728241b6f43951af19