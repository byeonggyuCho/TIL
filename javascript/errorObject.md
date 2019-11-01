# Error 

## 종류
1. EvalError  
전역 함수 `eval()`에서 발생하는 오류의 인스턴스를 생성합니다.

2. InternalError  
Javascript 엔진의 내부에서 오류가 발생했음을 나타내는 오류 인스턴스를 생성합니다.

3. RangeError  
숫자 변수나 매개변수가 유요한 ㅓㅁ위를 벗어났음을 나타내는 오류 인스턴스를 생성합니다.

4. ReferenceError  
잘못된 참조를 했음을 나타내는 오류 인스턴스를 생성합니다.

5. SytaxError  
`eval()`이 코드를 분석하는 중 잘못된 구문을 만났음을 나타내는 오류 인스턴스를  생성합니다.

6. TypeError  
변수나 매개변수가 유효한 자료형이 아님을 나타내는 오류 인스턴스를 생성합니다.

7. URLError  
`encodeURI()`나 `decodeURI()` 함수에 부적절한 매개변수를 제공했을 때 발생하는 오류 의 인스턴스를 생성합니다.



## 특정 오류 처리하기

```js
try {
  foo.bar();
} catch (e) {
  if (e instanceof EvalError) {
    alert(e.name + ": " + e.message);
  } else if (e instanceof RangeError) {
    alert(e.name + ": " + e.message);
  }
  // ... etc
}
```

### 사용자 정의 에러 타입.
    Babel7이하의 환경에서 사용자 정의 오류 클래스를 처리하려면 Obeject.defineProperty()메서드를 사용해서 정의해야합니다.

ES6 이후
```js
class CustomError extends Error {
  constructor(foo = 'bar', ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    // Custom debugging information
    this.foo = foo;
    this.date = new Date();
  }
}

try {
  throw new CustomError('baz', 'bazMessage');
} catch(e){
  console.log(e.foo); //baz
  console.log(e.message); //bazMessage
  console.log(e.stack); //stacktrace
}
```

ES6 이전

```js
function CustomError(foo, message, fileName, lineNumber) {
  var instance = new Error(message, fileName, lineNumber);
  instance.foo = foo;
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, CustomError);
  }
  return instance;
}

CustomError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
});

if (Object.setPrototypeOf){
  Object.setPrototypeOf(CustomError, Error);
} else {
  CustomError.__proto__ = Error;
}


try {
  throw new CustomError('baz', 'bazMessage');
} catch(e){
  console.log(e.foo); //baz
  console.log(e.message) ;//bazMessage
}

```


## REF
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Error
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Control_flow_and_error_handling#%EC%98%88%EC%99%B8%EC%B2%98%EB%A6%AC%EB%AC%B8
- [What's a good way to extend Error in Javascript](https://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript)