# Code re-use pattern

## 프로토타입 상속


```js
function Parent(name) {
  this.name = name || 'cater';
}

Parent.prototype.say = function() {
  return this.name;
}

function Child(name) {}

inherit(Child, Parent); 
```

## 1. 기본패턴.
부모 생성자 함수를 사용해 객체를 생성하고 나서, 이 객체를 자식의 프로토타입에 할당하는 방법.

```js
function inherit(C, P) {
  C.prototype = new P();            //(A)
}

function Parent(name) {
  this.name = name || 'Adam';
}

Parent.prototype.say = function() {
  return this.name;
}

function Child(name) {}

inherit(Child, Parent);
```
포인트는 `(A)`에서 자식객체의 프로토타입이 부모 생성자함수가 아니라 생성자 함수로 생성한 인스턴스라는 점이다.



- 프로토타입 상속과정 자세히 풀어보기.
- new연산자.

## ref
- [코드 재사용패턴](http://frontend.diffthink.kr/2016/06/blog-post_29.html)