# Currying

## intro


```js
function volume( l, w, h ) {
  return l * w * h;
}

var curried = curry( volume );

curried( 1 )( 2 )( 3 ); // 6
```
이 함수를 동작하게 하기 위해선 어떻게 해야할까?  
커링이란 여러개의 인자를 가진 함수를 호출할 때 파라미터의 수보다 적은 수의 파라미터를 인자로 받으면 누락된 파라미터를 인자로 받는 기법을 말합니다.  
이제 커링이 뭔지 알았는데 이걸 어디에 써먹어야할까요?  

제가 생각하는 자바스크립트에서 커링의 용도는 다음과 같습니다.  
1. 실행 시점을 미룰 수 있다.
2. 특정 값을 고정한 채 함수를 재활용할 수 있다. 

예를 통해서 하나씩 알아보겠습니다. 

## Example: 실행시점 연기.

```js
const server = address => loginInfo => {

    const loginToken;
    return request => {
        // loginToken을 사용해서 서버의 특정 requsest를 요청한다.
    }
}

const connect = server("/loginCheck");

const request = connect({"username": "kevin", "password": "1111"});
const request2 = connect({"username": "tom", "password": "1234"});
```
`server`라는 함수에 urlRequest를 입력하여 사용자 정보를 입력하면 로그인 정보를 반환하는 `connect`를 만들었습니다.  
이렇게 인자를 하나씩 나눔으로서 일종의 단계를 구분할 수 있습니다. 데이터가 준비되면 하나씩 완성해 나가는 식이죠.  
위 에제에서는 서버요청경로를 초기화한뒤, 사용자정보를 보내서 loginToekn을 초기화합니다.  
그리고 `request`함수를 이용해서 `loginToken`의 정보를 기반으로 서버에 요청을 보낼 수 있습니다.



## Example: 재활용성 

```js
function curry( fn ) {
    var arity = fn.length;

    return (function resolver() {
        var memory = Array.prototype.slice.call(arguments);
        return function doing() {
            var local = memory.slice();
            Array.prototype.push.apply( local, arguments);
            next = local.length >= arity
                    ? fn
                    : resolver;
            return next.apply(null, local)
        }
    }());
}
```
위 함수는 일반함수를 커링함수로 만들어주는 함수입니다. 

```js
function volume(z,w,h){
    return 1 * w * h;
};

var curriedVolum = curry( volume );
var result = curriedVolum(1)(2)(3);
```
이렇게 사용할 수 있는 함수이죠.  
여기서 `curry`함수를 이용하면 다른 방식의 재활용도 가능해집니다.  

```js
var curriedVolum = curry( volume );

var getArea = curriedVolum(1);
var getDuble = getArea(2);

var area = getArea(2)(10);      // 20
var dubleValue = getDuble(3);   // 6
```
이런식으로 중간단계의 함수에 의미를 부여할 수도 있습니다.


## 정리 
제가 자료를 찾아보며 정리한 커링에 대한 사용에 대해서 정리해봤습니다.  
쉽게 말해서 함수 재활용성을 높히는 기술이라는 생각이 듭니다.  
좀더 유용한 활용 예제를 발견하면 포스팅을 보강해보겠습니다!



## ref
- [자바스크립트에서 커링을 어디에 써머어야하나요?](https://www.facebook.com/notes/kevin-lee/currying-%EC%96%B4%EB%94%B0-%EC%8D%A8%EB%A8%B9%EB%83%90%EA%B5%AC%EC%9A%94/214522735556858/)
- https://sujinlee.me/currying-in-functional-javascript/
- https://edykim.com/ko/post/writing-a-curling-currying-function-in-javascript/
- https://www.zerocho.com/category/JavaScript/post/579236d08241b6f43951af18