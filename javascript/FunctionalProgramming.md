# FunctionalProgramming


## 개요
함수형 프로그래밍은 계산을 수학적 함수의 조합으로 생각하는 방식이다.<br>
이것은 일반적인 프로그래밍 언어에서 특정 동작을 수행하는 역할을 담당하는 것과는 반대도는 개념으로, 함수를 수행해도 함수 외부의 값이 변경될 수 없다. 즉 불변성을 갖는다.<br>

함수형 프로그래밍은 순수 함수(pure function) 를 조합하고 공유 상태(shared state), 변경 가능한 데이터(mutable data) 및 부작용(side-effects) 을 피하여 소프트웨어를 만드는 프로세스다.<br>
함수형 프로그래밍은 명령형(imperative) 이 아닌 선언형(declarative) 이며 애플리케이션의 상태는 순수 함수를 통해 전달된다<br><br>

*규칙*<br>
- 모든 데이터는 변경이 불가능 해야한다.
- 함수는 순수함수로 만든다. 인자를 적어도 하나 이상 받게 만들고, 데이터나 다른 함수를 반환해야한다.
- 루프보다 재귀를 사용한다.


## 프로그래밍 패러다임

### 1. 명령형 프로그래밍
프로그래밍의 상태와 상태를 변경시키는 구문의 관점에서 연산을 설명하는 방식이다.<br>
명령형 프로그래밍은 어떻게 할 것인가를 표현한다.

1. 절차지향 프로그래밍 <br>
수행되어야 할 연속적인 계산 과정을 포함하는 방식
2. 객체지향 프로그래밍<br>
객체들의 집합으로 프로그램의 상호작용을 표현

### 2. 선언형 프로그래밍
어떤 방법으로 해야 하는지를 나타내기보다 무엇을과 같은지를 설명하는 방식.<br>
선언형 프로그래밍은 무엇을 할 것인가를 표현한다.
- 함수형 프로그래밍<br>
순수 함수를 조합하고 소프트웨어를 만드는 방식이다.(클로저, 하스켈, 리스프)





## 배경
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

## 선수 지식

### 1급객체 (First Object)
- 변수나 데이터 구조안에 담을 수 있다.
- 파라미터로 전달 할 수 있다.
- 반환값으로 사용할 수 있다.
- 할당에 사용돈 이름과 관계없이 고유한 구별이 가능하다.
- 동적으로 프로퍼티 할당이 가능하다.

### 고차함수 (High-Order Function)
- 고차 함수는 1급함수의 부분집합이다.
- 람다 계산법에서 만들어진 용어로 아래 조건을 만족하는 함수
    - 함수에 함수를 파라미터로 전달할 수 있다.
    - 함수의 반환값으로 함수를 사용할 수 있다.

### 불변성 (Immutablility)
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


## 데이터 변환방법
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


## 합성 함수(Function composition)
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


*함수형 프로그래밍을 구현하는 방법*<br>
함수형 프로그래밍은 순수 함수를 조합하고 공유 상태, 변경 가능한 데이터(mutable data) 및 부작용(side-effects) 을 피하여 소프트웨어를 만드는 프로세스다. 함수형 프로그래밍은 명령형(imperative)이 아닌 선언형(declarative) 이며 애플리케이션 상태는 순수 함수를 통해 전달된다.


## 예제

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


## ref
- https://velog.io/@kyusung/%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%EC%9A%94%EC%95%BD
- https://medium.com/@jooyunghan/%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%EC%9D%B4%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80-fab4e960d263
- https://academy.realm.io/kr/posts/daniel-steinberg-altconf-2017-why-the-func/
- https://futurecreator.github.io/2018/10/05/why-functional-programming/
- https://www.zerocho.com/category/JavaScript/post/576cafb45eb04d4c1aa35078