# Apply

## 설명
주어진 this값과 배열로 재공되는  argumensts로 함수를 호출한다.


## 구문
```js
fn.apply(thisArg, [argsArray])
```

### 매개변수.


#### thisArg
호출하는 함수의 this변수에 할당할 this값. <br>


#### argsArray
호출되는 함수에 전달될 유사 배열 객체 <br>
함수에 제공되는 인수가 없을 경우 null, undefined를 전달한다.


#### 반환값
함수를 호출한 결과값.



## 설명
apply를 사용하면 새로운 객체마다 메소드를 작성할 필요없이 함번만 작성해서 다른 객체를 상속시킬 수 있다.
arguments 대신 Array를 파라미터로 사용할 수 있다는 점이 call과 다르다.<br>







### REF
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
