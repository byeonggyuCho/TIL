# FunctionalProgramming


## TL;DR

  함수형 프로그래밍은 순수 함수(pure function)를 조합하고 공유 상태(shared state), 변경 가능한 데이터(mutable data) 및 부작용(side-effects) 을 피하여 소프트웨어를 만드는 프로세스다.  



## 개요
함수형 프로그래밍은 계산을 수학적 함수의 조합으로 생각하는 방식이다.  
이것은 일반적인 프로그래밍 언어에서 특정 동작을 수행하는 역할을 담당하는 것과는 반대되는 개념으로, 함수를 수행해도 함수 외부의 값이 변경될 수 없다. 즉 불변성을 갖는다.  

함수형 프로그래밍은 순수 함수(pure function)를 조합하고 공유 상태(shared state), 변경 가능한 데이터(mutable data) 및 부작용(side-effects) 을 피하여 소프트웨어를 만드는 프로세스다.  
함수형 프로그래밍은 명령형(imperative) 이 아닌 선언형(declarative) 이며 애플리케이션의 상태는 순수 함수를 통해 전달된다    

*규칙*  
- 모든 데이터는 변경이 불가능 해야한다.
- 함수는 순수함수로 만든다. 인자를 적어도 하나 이상 받게 만들고, 데이터나 다른 함수를 반환해야한다.
- 루프보다 재귀를 사용한다.


*선언형 함수*  
역할을 부여한 함수.

**컨셉**  
변경 가능한 상태를 불변상태(Immutab)로 만들어 SideEffect를 없애자.
모든 것은 객체이다.
코드를 간결하게 하고 가독성을 높여 구현할 로직에 집중 시키자.
동시성 작업을 보다 쉽게 안전하게 구현 하자



## 1.프로그래밍 패러다임

### 1-1 명령형 프로그래밍
프로그래밍의 상태와 상태를 변경시키는 구문의 관점에서 연산을 설명하는 방식이다.  
명령형 프로그래밍은 어떻게 할 것인가를 표현한다.

1. 절차지향 프로그래밍   
수행되어야 할 연속적인 계산 과정을 포함하는 방식
2. 객체지향 프로그래밍  
객체들의 집합으로 프로그램의 상호작용을 표현

### 1-2 선언형 프로그래밍
어떤 방법으로 해야 하는지를 나타내기보다 무엇을과 같은지를 설명하는 방식.  
선언형 프로그래밍은 무엇을 할 것인가를 표현한다.
- 함수형 프로그래밍  
순수 함수를 조합하고 소프트웨어를 만드는 방식이다.(클로저, 하스켈, 리스프)









## 2. 배경
- 알론소 처치의 람다 계산법



```js
// 명령형
function double (arr) {
  let results = []
  for (let i = 0; i < arr.length; i++){
    results.push(arr[i] * 2)
  }
  return results
}

function add (arr) {
  let result = 0
  for (let i = 0; i < arr.length; i++){
    result += arr[i]
  }
  return result
}

$("#btn").click(function() {
  $(this).toggleClass("highlight")
  $(this).text() === 'Add Highlight'
    ? $(this).text('Remove Highlight')
    : $(this).text('Add Highlight')
})

```


```js
// 선언형
function double (arr) {
  return arr.map((item) => item * 2)
}

function add (arr) {
  return arr.reduce((prev, current) => prev + current, 0)
}

<Btn
  onToggleHighlight={this.handleToggleHighlight}
  highlight={this.state.highlight}>
    {this.state.buttonText}
</Btn>
```

## 3.선수 지식


### 3-1 함수란?
함수는 하나의 동작 단위이다.

- 계산하는 동작
- 값을 대신 전달하는 동작
- 함수를 대신 실행하는 동작

이 모든 동작을 함수에게 역할을 부여할 수 있다.

함수는 3가지로 구성된다.
1. 동작을 의미하는 함수명
2. 함수의 외부에서 내부로 전달하는 매개변수(인자)
3. 함수의 내부에서 외부로 전달하는 반환값  
함수는 외부 변수를 접근하지 않는 코드로 구현된다. 그래서 항상 반환값이 존재한다.


**매개변수와 반환값**  
인자와 반환값은 연관관계가 있다. 인자를 기준으로 반환값은 항상 대응된다.
인자는 두 개 이상의 반환값에 대응되면 안된다.
함수가 실행될 때 마다 다른 반환값을 가지는 것은 외부 변수가 접근한다는 것을 의미한다.

인자와 반환값을 갖는 함수의 구조는 합성함수를 가능하게 한다.  
```
y = f(x)
z = g(y)

z = g(f(x))
```


### 3-2 프로시저와 함수

#### 1. 프로시저   
프로시저는 정해진 절차에 따라 내부 변수를 변경하는 동작 단위를 의미한다.  
내부 변수를 변경함으로 독립적으로 존재할 수 없고 객체의 메서드형태로 존재한다.  
프로시저는 내부변수의 값을 변경하기 떄문에 반환값이 없다.  
반환값이 없기때문에 커맨드라고도 한다.

```js
const counter = {
  count :0,    //내부 변수
  up() {
    ++this.count
  },
  down () {
    --this.count
  } 
}

counter.up();
counter.down();


```

#### 2. 함수
함수는 변수를 직접 변경하지 않는다.
그리고 함수는 항상 반환값을 반환한다. 즉 직접 변수를 수정하지 않고 반환값을 통해 외부에서 변수를 수정하게 한다.(불변성)
항상 반환값을 반환하기 때문에 쿼리(Query)라는 이름도 가진다.

함수는 반환값을 통해 외부에서 변수를 수정하게 한다.
```js
const up = count => ++count
const down = count => --count


let count = 0;

count = up(count);
count = down(count);
```



### 3-3 1급객체 (First Object)
- 변수나 배열, 객체등의 데이터 구조안에 담을 수 있다.
- 파라미터로 전달 할 수 있다.
- 함수의 반환값으로 사용할 수 있다.
- 할당에 사용돈 이름과 관계없이 고유한 구별이 가능하다.
- 동적으로 프로퍼티 할당이 가능하다.

### 3-4 고차함수 (High-Order Function)
- 고차 함수는 1급함수의 부분집합이다.
- 람다 계산법에서 만들어진 용어로 아래 조건을 만족하는 함수
    - 함수에 함수를 파라미터로 전달할 수 있다.
    - 함수의 반환값으로 함수를 사용할 수 있다.

### 3-5 불변성 (Immutablility)
- 함수형 프로그래밍에서는 데이터가 변할 수 없는데, 이를 불변성 데이터라고 한다.
- 데이터 변경이 필요한 경우, 원본 데이터의 구조를 변경하지 않고 그 데이터의 복사본을 만들어 일부를 변경하고 변경한 복사본을 사용해 작업을 진행한다.

```js
// 불변이 아닌 변하는(Mutatable) 데이터
function rateColor(color, rating) {
  color.rating = rating;
  return color;
}

console.log(rateColor(color_lawn, 5), rating) // 5
console.log(color_lawn.rating) // 5
```

```js
// 불변성 데이터
function rateColor(color, ratring) {
  return Object.assign({}, color, {ratring:ratring});
}

console.log(rateColor(color_lawn, 5), rating) // 5
console.log(color_lawn.rating) // 0  *변하지 않음*
```

## 순수 함수(Pure function)

1. 같은 입력에는 항상 같은 결과가 나와야 한다.
2. 함수의 실행은 프로그램의 실행에 영향을 미치지 않아야한다.(Side Effect가 없어야한다.)
    - 참조값을 직접 변경해서는 안된다.
    - 즉 this 같은 참조값을 사용해야할 때는 순수함수를 작성할 수 없다.
3. 하나 이상의 인자를 받고, 받은 인자를 처리하여 반드시 결과를 돌려주어야한다.
4. 인자를 제외한 다른 변수를 사용하면 안 된다.

- 순수 함수를 호출하면 프로그램의 어떠한 변화도 없고, 입력 값에 대한 결과를 에상할 수 있어서 테스트하기 쉽다.


```js
// 순수하지 않은 함수, DOM을 변경하는 부수효과를 발생시킴
function Header(text) {
  let h1 = document.createElement('h1');
  h1.innerText = text;
  document.body.appendChild(h1);
}
```

```js
// 순수한 함수, 부수효과를 발생시키지 않음
// DOM을 변경하는 책임은 애플리케이션의 다른 부분이 담당하도록 한다.
const Header = (props) => <h1>{props.title}</h1>
```








## 4. 데이터 변환방법
- 함수형 프로그래밍은 데이터 변경이 불가능하기 떄문에 기존 데이터의 복사본을 만들어주는 도구들이 필요하다.
- Array.map, Array.reduce처럼 복사본을 만드는 함수를 이용하면 데이터 참조를 끊을 수 있다.


```js
const schools = [
  "Yorktown"
  "Washington",
  "Wakefield"
];


// Array.join (합치기): 콤마(,)로 각 학교를 구분한 문자열 얻기
console.log(schools.join(",")); // "Yorktown", "Washington", "Wakefield"

// Array.filter (걸러내기): 'W'로 시작하는 학교만 있는 새로운 배열 만들기
// 원소를 제거하는 경우 Array.pop, Array.slice가 아닌 순수함수인 filter를 사용할 것
console.log(schools.filter(school => school[0] === "W")); // ["Washington", "Wakefield"]

// Array.map (맵핑): 모든 원소에 'High School' 문자열 추가된 새로운 배열 만들기
const highSchools = (schools.map(school => `${school} High School`));
console.log(highSchools.join("\n"));

// Array.reduce (축약): 배열에서 최대 값 찾기 (배열을 하나의 수로 변환)
const result = [21, 18, 42, 40, 64, 63, 24].reduce((max, num) => num > max ? num : max, 0);
console.log(result); // 64
```


## 5. 합성 함수(Function composition)
- 합성 함수란 새로운 함수를 만들어거나 계산하기 위해 둘 이상의 함수를 조합하는 과정을 말한다. 함수형 프로그램은 여러 작은 순수 함수들로 이루어져있기 때문에 이 함수들을 연쇄적으로 또는 병렬로 호출해서 더 큰 함수를 만드는 과정으로 전체 프로그램을 구축해야 한다.
- 메서드 체이닝 방식의 합성함수


```js
const sum = (a, b) => a + b
const square = x => x * x
const addTen = x => x + 10

const computeNumbers = addTen(square(sum(3, 5))) // 74

// compose는 함수를 연쇄적으로 호출하면서 반환값을 전달한다 
const compose = (...fns) =>
  fns.reduce((prevFn, nextFn) =>
    (...args) => nextFn(prevFn(...args)),
    value => value
  );

// compose의 사용
const compute = compose(
  addTen,
  square,
  sum
)
compute(3, 5) // 74

```


*함수형 프로그래밍을 구현하는 방법*  
함수형 프로그래밍은 순수 함수를 조합하고 공유 상태, 변경 가능한 데이터(mutable data) 및 부작용(side-effects) 을 피하여 소프트웨어를 만드는 프로세스다. 함수형 프로그래밍은 명령형(imperative)이 아닌 선언형(declarative) 이며 애플리케이션 상태는 순수 함수를 통해 전달된다.


### E.G

```js
var sum = 0;
for (var i = 1; i <= 10; i++) {
  sum += i;
```

```js
function add(sum, count) {
  sum += count;
  if (count > 0) {
    return add(sum, count - 1);
  } else {
    return sum;
  }
}
add(0, 10); // 55
```

### 5-1함수 조립기법

#### 1. 함수로만 조립하기.
함수로만 조립하는 것은 일렬로 함수를나열하여 동작을 작성하는 방법이다.

```js
const extract = ({a,b}) =>[a, b];
const add = ([a,b]) => a + b;
const isEven = num => num %2 === 0;

const obj = {a:2, b:4}
const nums = extract(obj)
const total = add(nums)

isEven(total)
```



#### 2.Compose
함수 조립 도구 중 하나, 합성함수라고 보면된다.  
Compose의 구성은 함수 타입의 매개변수와 매개변수를 주입받을 수 있는 함수를 반환값으로 한다.
반환값이 생성되면 Compose의 인자들을 모두 실행하여 계산 결과를 반환한다.

- 매개변수 : 함수
- 반환값 : 매개변수를 받을 수 있는 함수
  - 이 함수의 반환값 : Compse의 매개변수로 받은 함수를 모두 실행시켜 반환.

```js
const compose = (f1,f2,f3) => value =>{
  return f1(f2(f3(value)))
}
```
대략 이런 구조다


```js
const extract = ({a, b}) => [a, b]
const add = ([a, b]) => a + b
const isEven = num => num % 2 === 0
const isEvenObj = compose(isEven, add, extract)

const obj = {a: 2, b: 4}
isEvenObj(obj) // true
```

#### 3. Pipe로 조립하기.
Pipe는 함수를 조립하는 도구중 하나다.
Compose와 동일한 구성이다. 하지만 다른 점이 있다.
Pipe는 Compose와 다르게 첫번째 인자를 시작해서 마지막 인자를 순서로 함수를 실행한다.
코드로 표현하면 다음과 같다.

```js
// 파라미터 순서가 중요하다.
const pipe = (f1,f2,f3) => value => {
  return f3(f2(f1(value)))
}
```

```js
const extract = ({a,b}) => [a,b]
const add = ([a,b]) => a + b
const isEven = num => num %2 === 0
const isEvenObj = pipe(extract,add,isEven)

const obj = {a:2,b:4}
isEvenObj(obj)
```


### 5-3 함수로 만들 수 있는 도구


#### 클로저
비공개 변수(자유변수)를 만들어 함수를 생성하는 함수를 만들 수 있다.

```js
var addMaker = function(a){
  return function(b){
    return a + b;
  }
}

var add10 = addMaker(10);
var add5  = addMaker(5);

add10(5);
add5(5);

```


#### 커링
두개 이상의 매개변수를 받는 함수에 이용된다.
커리는 함수의 각 인자를 대응하는 클로저를 반환하는 함수이다.
```js
const curry = fn => a => b => fn(a,b);

// 에로우 펑션이 헷깔리면 풀어서 생각해보자...
var curry = function(fn){
  return function(a){
      return function(b){
        return fn(a,b)
      }
  }
}
```

```js
//asis
const add = (a,b) => a + b;
add(1,2)


//curry style
const curriedAdd = curry(add);
curriedAdd(1)(2)

```



#### 부분적용
부분적으로 실행을 마친 다음에 나머지 인자와 함께 즉시 실행한 상태가 되는 함수.   
부분 적용은 첫 번째 매개변수로 함수를 주입받고, 두 번째 매개변수로 기억할 인자를 받는다.
그리고 부분 적용의 반환값은 클로저이다.   
클로저를 실행하면 첫 번째 파라미터로 받았던 함수에 비공개변수와 나머지 매개변수들을 주입하여 실행한다.   
부분적용은 partial라는 이름으로 사용한다.

```js
const partial = (fn, x) => y => fn(x,y)
```

```js
const add = (a,b) => a+b
const add10 = partial(add,10)   //10을 비공개변수로 기억한다.

add10(5);
```


## 6.컨테이너 패턴
잠재적으로 위험한 코드 주위에 컨테이너를 설치하는 것이다.
값을 컨테이너 화하는 행위는 함수형프로그램의 기본 디자인 패턴이다.
값을 안정적으로 다루고 다루는 불변성을 지키기 위해 직접 접근을 차단하는 것이다.
이렇게 감싼 값에 접근한느 유일한 방법은 연산을 컨테이너에 매핑하는것이다.


```js
//함수조립

const f = x => x + 2;
const g = x => x * x;

g(f(2))   //16
g(f())    //NaN
```
이 처럼 인자를 전달하지 않았을때 의도하지 않은 반환값이 발생한다.
이제 같은 연산을 컨테이너 패턴을 통해 표현해보자.
자바스크립의 Array로 컨테이너를 만들 수 있다.
그리고 함수 조립은 map 메소드를 통해 가능하다.



```js
//컨테이너 패턴
const f = x => x + 2;
const g = x => x * x;

[2].map(f).map(g) // [16];
[].map(f).map(g) // []

```
컨테이너(array)를 사용함으로서 비정상적인 오류가 생기는걸 막을 수 있다.
함수만 조립하는것 보다 예측하기 쉬운 조립이다.



## 7. 상태변화
함수형은 상태 변화를 완전히 제거하는게 아니라 변화가 발생하는 지역을 최소화하는 것을 목표로 한다.
상태 변화는 값을 담을 수 있는 변수, 배열, 객체가 변경되는 것을 의미한다.
자바스크립트에서는 DOM, Ajax 처럼 사이드이펙트를 조작하기도 한다. 이 사이드 이펙트는 완전히 제거할 수 없다. 그래서 부수 효과가 발생하는 부분과 발생하지 않는 부분을 분리하는게 상태 변화의 핵심이다.


### 7.1 관심분리
사이드 이펙트가 발생하는 분과 발생하지 않는 부분을 분리하는 것은 관심 분리라고 한다. 관심이란 소프으웨어의 기능이나 목적을 뜻한다. 관심을 분리하는 것은 각 관심과 관련된 코드를 모으는 것이다. 관련된 코드를 모아 독립된 모듈을 만든다. 독립된 모듈을 통해 다른 모듈과 분리하는 게 관심분리다.

함수형 프로그래밍은 추상화 단위를 함수로 한다. 함수들을 조립해서 고수준의 동작을 구현한다. 자료구조를 새로 만들어 어떤 요건을 충족시키는 게 아니라 배열/객체/문자열/ 등의 흔한 자료구조를 이용해 문제를 해결한다.

함수형 프로그래밍에서 함수는 수학적함수를 의미한다. 수학적 함수는 입력과 출력이 모두 존재해야하고, 입력에 따른 따른 출력은 항상 동일하게 대응되어야한다.

실용적인 함수형 프로그래밍은 어떤 시스템에서 상태 변화를 완전히 제거하는 것이 아니라 변이가 발생하는 지역을 가능한 최소화하는 것을 목표로 한다.





## ref
- https://velog.io/@kyusung/%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%EC%9A%94%EC%95%BD
- https://medium.com/@jooyunghan/%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%EC%9D%B4%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80-fab4e960d263
- https://academy.realm.io/kr/posts/daniel-steinberg-altconf-2017-why-the-func/
- https://futurecreator.github.io/2018/10/05/why-functional-programming/
- https://www.zerocho.com/category/JavaScript/post/576cafb45eb04d4c1aa35078
- https://futurecreator.github.io/2018/10/05/why-functional-programming/
- https://programmers.co.kr/learn/courses/7637
- https://github.com/CaterJo/functional-javascript
- https://chodragon9.github.io/blog/easy-code/?fbclid=IwAR2y2xpeTxAux0UWJdIlyG__r606Zo6Y9WpWPVN7gJUkrioZ81ykjUTP934#함수형-프로그래밍
- https://chodragon9.github.io/blog/functional/