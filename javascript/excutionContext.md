# Execution Context


## Intro
Execution Context란 뭘까?  
간단히 말하자면 문맥이다. 여기서의 문맥이란 어떤 시점에 어떤 scope를 참조한다는 룰 정도로 얘기할 수 있다.  
다음의 예제는 자바스크립트에서 context가 어떻게 만들어지는지 잘 보여준다.

``` js
var scope = 'global'; 
function func1() { 
  console.log(scope); 
}
function func2 () { 
  var scope = 'local'; 
  func1(); 
}
say(); //global
```
자바스크립트에서 Execution Context은 선언시점에 결정된다.  
즉 위 예제에서 함수 func1이 참조하는 변수 `scope`은 전역변수이다.  
다시 말해 func1의 스코프 체인에는 func2의 컨텍스트가 포함되지 않는다.  
지금부터 이러한 Context가 형성되는 과정에 대해서 자세히 알아본다.



## 1. 실행 컨텍스트
실행 가능한 코드를 형상화하고 구분하는 추상적인 개념  
실행 가능한 코드가 실행되기 위해 필요한 환경

**실행가능한 코드**   
- 전역코드 : 전역 영역에 존재하는 코드
- Eval코드 : eval 함수로 실행되는 코드
- 함수코드 : 함수 내에 전재하는 코드



자바스크립트 엔진은  실행에 필요한 정보(변수객체(전역변수, 지역분셔, 매개변수, 객체프로퍼티), 함수 선언, 변수 유효범위, this)를 형상화하고 구분하기 위해
실행 컨텍스트를 물리적 객체 형태로 관리한다.
``` js
var x = 'xxx';

function foo () {
  var y = 'yyy';

  function bar () {
    var z = 'zzz';
    console.log(x + y + z);
  }
  bar();
}
foo();
```
위 코드에선 아래와 같은 실행 컨텍스트 스택이 생성하고 소멸한다.  
현재 실행중인 컨텍스트에서 이 컨텍스트와 관련없는 코드가 실행되면 새로운 컨텍스트가 생성된다.


![](/resource/img/javascript/ec_1.png)

1. 컨트롤이 실행 가능한 코드로 이동하면 논리적 스택 구조를 가지는 새로운 실행 컨텍스트 스택이 생성된다.

2. 전역 코드(Global code)로 컨트롤이 진입하면 전역 실행 컨텍스트가 생성되고 실행 컨텍스트 스택에 쌓인다. 전역 실행 컨텍스트는 애플리케이션이 종료될 때까지 유지된다.

3. 함수를 호출하면 해당 함수의 실행 컨텍스트가 생성되며 직전에 실행된 코드 블록의 실행 컨텍스트 위에 쌓인다.

4. 함수 실행이 끝나면 해당 함수의 실행 컨텍스트를 파기하고 직전의 실행 컨텍스트에 컨트롤을 반환한다.






## 2.실행컨텍스트의 3가지 객체

실행 컨텍스트가 생성되면 자바스크립트 엔진은 실행에 필요한 정보를 담을 물리적 객체를 생성한다.
이것은 객체의 형태를 가지며 Varialbe Object, Scope chain, thisValue 3가지 속성을 가진다.
![](/resource/img/javascript/excute_context_structure.png)

### 2.1 Variable object(VO)
실행 컨텍스트가 생성되면 자바스크립트 엔진은 실행에 필요한 정보를 담을 객체를 생성한다.
이를 Variable Object라고 한다.  
Variable Object는 코드가 실행될때 엔진에 의해 참조되며 코드에서는 접근 할 수 없다.  
Variable Object는 아래 정보를 답는다.
- 변수
- 매개변수(parameter)와 인수 정보(arguments)
- 함수 선언(함수표현식 제외)


    **전역 컨텍스트**  
    Variable Object는 유일하며 최상위에 위치하고 모든 전역 변수, 전역 함수 등을 포함하는 전역객체 (Global Object)를 가리킨다. 전역객체는 전역에 선언된 전역 변수와 전역 함수르 프로퍼티로 소유한다.  
    ![](/resource/img/javaScript/globalContext.png)

    **함수 컨텍스트**  
    Variable Object는 Activation Object(활성 객체)를 가리키며 매개변수와 인수들의 정보를 배열의 형태로 담고 있는 객체 arguments object가 추가된다.  
    ![](/resource/img/javaScript/functionContext.png)



### 2.2 Scrope Chain

    스코프 체인은 식별자 중에서 객체의 프로퍼티가 아닌 식별자, 즉 변수를 검색하는 메커니즘
![](/resource/img/javascript/ec-sc.png)

스코프 체인은 일종의 리스트로서 전역객체와 중첩된 함수의 스코프 레퍼런스를 차례로 저장하고 있다.
다시 말해, 스코프 체인은 해당 전역 또는 함수가 참조할 수 있는 변수, 함수 선언 등의 정보를 담고 있는 전역객체또는 활성객체의 리스트를 가리킨다.
현재 실행 컨텍스트의 활성객체를 선두로 하여 순차적으로 상위 컨텍스트의 활성객체를 가리키며 마지막 리스트는 전역객체를 가리킨다.  
엔진은 스코프 체인을 통해 렉시컬 스코프르 ㄹ파악한다. 함수가 중첩 상태일 때 하위 하위함수 내에서 상위함술의 스코프와 전역 스코프까지 참조할 수 있는데 이것은 스코프 체인 검색을 통해 가능하다.
함수가 중첩되어 있으면 중첩될 때마다 부모함수의 Scope가 자식 함수의 스코프 체인에 포함된다. 함수 실행중 변수를 만나면 그 변수를 우선 현재 Scope, 즉 Activation obejct에서 검색해보고, 만약 검색에 실패하면 스코프 체인에 담겨진 순서대로 그 검색을 이어가게 되는 것이다.
이것이 스코프 체인이라고 불리는 이유다.

예를 들어 함수 내의 코드에서 변수를 참조하면 엔진은 스코프 체인의 첫번째 리스트가 가리키는 Activation Object에 접근하여 변수를 검색한다. 이와 같이 순차적으로 스코프 체인에서 변수를 검색하는데 결구 검색에 실패하면 정의 되지 않은 변수에 접근한느 것으로 판단하여 Reference 에러를 발생시킨다. 스코프 체인은 함수의 감춰진 프로퍼티인 [[Scope]]로 참조 할 수 있다.

    **프로토타입 체인**



### 2.3 this value
this 프로퍼티에는 this값이 할당된다. this에 할당되는 값은 함수 호출 패턴에 의해 결정된다. this는 현재 실행 컨텍스트를 가리킨다.



## 3.실행 컨텍스트가 생성과정

```js
var x = 'xxx';

function foo () {
  var y = 'yyy';

  function bar () {
    var z = 'zzz';
    console.log(x + y + z);
  }
  bar();
}

foo();
```







### 3.1 전역코드로 진입
컨트롤이 실행 컨텍스트에 진입하기 이전에 유일한 객체인 전역객체가 생성된다.  
젼역객체는 단일 사본으로 존재하며 이 객체의 프로퍼티는 코드의 어떠한 곳에서도 접근할 수 있다. 초기 상태의 전역 객체에는 빌트인 객체(Math, String, Array 등)와 BOM,DOM이 설정되어 있다.  

전역객체가 생성된 이후, 전역 코드로 컨트롤이 진입하면 전역 실행 컨텍스트가 생성되고 실행컨텍스트 스택에 쌓이다.
그리고 이 실행 컨텍스트를 바탕으로 이하의 처리가 쌓인다.
1. 스코프 체인의 생성과 초기화.
2. Variable Instantiation(변수 객체화) 실행
3. this value 결정.

![](/resource/img/javascript/ec_3.png)
![](/resource/img/javascript/ec_2.png)


### 3.1.1 스코프 체인의 생성과 초기화.

실행 컨텍스트가 생성된 이후 가장 먼저 스코프 체인의 생성과 초기화가 실행된다.
이때 스코프 체인은 전역 객체의 레퍼런스를 포함하는 리스트가 된다.

![](/resource/img/javascript/ec_5.png)


### 3.1.2 Variable Instantiation (변수 객체화) 실행
스코프 체인의 생성과 초기화가 종료되면 변수 객체화가 실행된다.
Variable Instantiation은 Variable Object에 프로퍼티와 값을 추가하는 것을 의미한다.
변수객체화라고 변역하기도 하는데 이는 변수, 매개변수와 인수 정보, 함수 선언을 Variable Object에 추가하여 객체화하기 때문이다.

전역 코드인 경우, Variable Object는 Gloabl Object를 가리킨다.
Variable Instantiation은 아래의 순서로 Variable Object에 프로퍼티와 값을 설정한다.

1. Function Code인 경우 매개변수가 Variable Object의 프로퍼티로 인수(arguments)가 값으로 설정된다.
2. 대상 코드 내의 함수 선언(함수 표현식 제외)을 대상으로 함수명이 Variable Object의 프로퍼티로, 생성된 함수 객체가 값으로 설정된다.(함수 호이스팅)
3. 대상 코드 내의 변수 선언을 대상으로 변수명이 Variable Object의 프로퍼티로, undefined가 값으로 설정된다. (변수 호이스팅)

위 예제 코드를 보면 전역 코드에 변수x와 함수 foo가 선언되어있다.
Variable Instantiation의 실행 순서 상, 우선 2. 함수 foo의 선언이 처리되고 
(함수 코드가 아닌 전역 코드이기 때문에 1. 매개변수 처리는 실행되지 않는다.)
그후 3. 변수 x의 선언이 처리된다.

![](/resource/img/javascript/ec_6.png)

### 3.1.2.1 함수 foo의 선언처리

함수 선은언은 Variable Instantiation 실행순서 2.와 같이 선언된 함수명 foo가 Variable Object(전역 코드인 경우 Global Object)의 프로퍼티로 생성된 함수 객체가 값으로 설정된다.

![](/resource/img/javascript/ec_7.png)




생성된 함수 객체는 [[Scopes]]프로퍼티를 가지게 된다. [[Scopes]]프로퍼티는 함수 객체만이 소유하는 내부 프로퍼티로서 함수객체가 실행되는 환경을 가리킨다. 따라서 현재 실행 컨텍스트의 스코프 체인이 참조하고 있는 객체를 값으로 설정한다 내부 함수 [[Scopes]]프로퍼티는 자신의 실행환경 (Lexical Enviroment)과 자신을 포함하는 외부 함수으 ㅣ실행 환경과 전역 객체를 가리키는데 이때 자신을 포함하는 외부 함수의 실행 컨텍스트가 소멸하여도 [[Scopes]]프로퍼티가 가리키는 외부 함수의 실행환경(Activation object)은 소멸하지 않고 참조할 수 있다. 이것이 클로저 이다.


지금까지 살펴본 실행컨텍스는 아직 코드가 실행되기 이전이다.
하지만 스코프 체인이 가리키는 변수 객체(VO)에 이미 함수가 등록되어 있으므로 코드를 실행할 때 함수 선언식으로 이전에 호출할 수 있게 되었다.


이떄 알 수 있는 것은 함수선언식의 경우 변수 객체에 함수표현식과 동일하게 함수명을 프로퍼티로 함수 객체를 할당한다는 것이다. 단, 함수순언식은 변수 객체에 함수명을 프로퍼티로 추가하고 즉시 함수 객체를 즉시 할당하지만 함수 표현식은 일반 변수의 방식을 따른다.
 따라서 함수선언식의 경우, 선언문 이전에 함수를 호출할 수 있다.
 이러한 현상을 함수 호이스팅(Function Hoisting)이라 한다.


### 3.1.2.2
변수 선언은 Variable Instantiation 실행순서 3.과 같이 선언된 변수명이 Variable Object의 프로퍼티로, undefined가 값으로 설정된다.
이것을 좀더 세분화 해보면 아래와 같다.

1. 선언 단게(Declartion phase)
    - 변수 객체(Variable Object)에 변수를 등록한다. 이 변수 객체는 스코프가 참조할 수 있는 대상이 된다.

2. 초기화 단계 (Initialization phase)
    - 변수 객체(Variable Object)에 등록된 변수를 메모리에 할당한다.
    - 이 단게에서 변수는 undefined로 초기화된다.
3. 할당 단계(Assignment phase)
    - undefined로 초기화된 변수에 실제값을 할당한다.

var 키워드로 선언된 변수는 선언 단계와 초기화 단계가 한번에 이뤄진다.
다시 말해 스코프 체인이 가리키는 변수 객체에 변수가 등록되고 변수는 undefined로 초기화 된다. 따라서 변수 선언문 이전에 변수에 접근하여도 Variable Object에 변수가 존재하기 때문에 에러가 발새하지 않는다. 다만 undefined를 반환한다.
이러한 현상을 변수 호이스팅(Variable Hosting)이라한다.

아직 변수x는 'xxx'로 초기화되지 않았다.
이후 변수 할당문에 도달하면 비로소 값의 할당이 이뤄진다.


![](/resource/img/javascript/ec_8.png)

### 3.1.3 this value 결정
변수 선언 처리가 끝나면 다음은 this value가 결정된다. this value가 결정되기 이전에 this는 전역 객체를 가리키고 있다가 함수 호출 패턴에 의해 this에 할당되는 값이 결정된다. 전역 코드의 경우 this는 전역 객체를 가리킨다.


전역 컨텍스트의 경우 Variable Object, Scope Chaine, this value는 언제나 전역객체다.



![](/resource/img/javascript/ec_9.png)
### 3.2 전역 코드의 실행
지금까지는 코드 실행 환경을 갖추기 위한 사전 준비였다.
코드의 실행은 지금부터 시작된다.
``` js
var x = 'xxx';

function foo () {
  var y = 'yyy';

  function bar () {
    var z = 'zzz';
    console.log(x + y + z);
  }
  bar();
}

foo();
```

### 3.2.1 변수 값의 할당

전역 변수x에 문자열 'xxx'를 할당할 때, 현재 실행 컨텍스트의 스코프 체인이 참조하고 있는 Varible Object를 선두부터 검색하여 변수명에 해당하는 프로퍼티가 발견되면 값을 할당한다.
![](/resource/img/javascript/ec_10.png)

### 3.2.2 함수 foo의 실행
전역 코드의 함수 foo가 실행되기 시작하면 새로운 함수 실행 컨텍스트가 생성된다.
함수 foo의 실행컨텍스르로 컨트롤이 이동하면 전역 코드의 경우와 마찬가지로 
1. 스코프체인의 생성과 초기화.
2. Variable Instantiation 실행.
3. this value 결정
이 순차적으로 실행된다.

단, 전역 코드와 다른 점은 이번 실행되는 코드는 함수코드라는 것이다.
따라서
1. 스코프 체인 생성과 초기화.
2. Variable Instantiation 실행.
3. this value 결정
은 전역 코드의 룰이 아닌 함수 코드의 룰이 적용된다.

![](/resource/img/javascript/ec_11.png)


### 3.2.2.1 스코프 케인의 생성과 초기화.
함수 코드의 스코프 체인의 생성과 초기화는 우선 Activation Object에 대한 레퍼런스를 스코프 체인의 선두에 설정하는 것으로 시작된다.
Activation Object는 우선 arguments 프로퍼티 초기화를 실행하고 그 후,
Varible Instantiation가 실행된다. Activation Object는 스펙 상의 개념으로 프로그램이  Activation Object에 직접 접근할 수 없다.(Activation Object의 프로퍼티로의 접급은 가능하다.)



그후 Caller(전역컨텍스트)의 Scope Chain이 참조하고 있는 객체가 스코프 체인에 push된다. 따라서 이 경우 함수 foo를 실행한 직후 실행 컨텍스트의 스코프 체인은 Activation Object(함수 foo의 실행으로 만들어진 AO-1)과 전역 객체를 순차적으로 참조하게 된다.

![](/resource/img/javascript/ec_12.png)
![](/resource/img/javascript/ec_13.png)


### 3.2.2.2 Variable Instantiation 실행
Function Code의 경우, 스코프 체인의 생성과 초기화에서 생성된 Actiavtion Object를 Variable Object에 바인딩한다. (프로퍼티는 bar , 값은 새로 생송된 Function Object bar function object의 [[Scope]]프로퍼티 값은 AO-1과 Global Object를 참조하는 리스트)

변수 y를 Variable Obejct에 설정한다. 이때 프로퍼티 y, 값은 undefined이다.

![](/resource/img/javascript/ec_14.png)
![](/resource/img/javascript/ec_15.png)

### 3.2.2.3 this Value 결정

![](/resource/img/javascript/ec_16.png)
변수 선언 처리가 끝나면 다음은 this value가 결정된다.
this에 할당되는 값은 함수 호출 패턴에 의해 결정된다.
내부 함수의 경우, this의 value는 전역 객체이다.


### 3.3 foo 함소 코드의 시행
이제 함수 foo의 코드 블록 내 구문이 실행된다.
위 에제를 보면 변수 y에 문자열 'yyy'의 할당과 함께 bar가 실행된다.

### 3.3.1 변수 값의 할당

![](/resource/img/javascript/ec_17.png)
지역 변수 y에 문자열 'yyy'를할당할때 현재 실행 컨텍스트의 스코프 체인이 참조하고 있는 Variable Object를 ㅅ건두부터 검색하여 변수명에 ㅅ해당하는 프로퍼티가 발견되면 'yyy'를 할당한다.


### 3.3.2 함수 bar의 실행

![](/resource/img/javascript/ec_18.png)
![](/resource/img/javascript/ec_19.png)
함수 bar가 실행되기 시작하면 새로운 실행 컨텍스트가 생성된다.

이전 함수 foo의 실행과정과 동일하게
1. 스코프 체인 생성과 초기화.
2. Variable Instantiation 실행.
3. this value 결정
이 순차적으로 실행된다.


이 단게에서 console.log(x+y+z); 구문의 실행결과는 xxxyyyzzzz가 된다.
- x : AO-2에서 x검색 실패 ->AO-1에서 x검색 실패 ->Go에서 x검색 성공(값 'xxx')
- y : AO-2에서 y 검색 실패 ->AO-1에서  y검색 성공(값 : 'yyy')
- z : AO-2에서 xxx성공
y 검색 실패 ->AO-1에서  y검색 성공(값 : 'yyy')
 yz

실행 가능한  z검색 성공

실행 가능한 코드
- 전역코드
- Eval 코드
- 함수 코드

변수를 선언하면 변수를 현재 실행 컨텍스트에 추가한다.
var로 선언한 변수는 가장 가까운 컨텍스트에 추가된다.
var를 쓰지 않고 변수를 초기화하면 전역컨텍스트에 추가된다.




## 활성객체



## Lexical scoping
scope의 범위는 선언시점에 생긴 context의 Scope Chain을 따른다.
즉 scope Chain을 따라 변수를 참조한다.

## function Context
함수를 호출하면 생성되는 컨텍스트
실행 컨텍스트에는 변수객체가 연결되어 있는데 이 변수객체에는
실행 컨텍스트에서 정의된 모든 변수와 함수를 저장하고 있다.



## ref
- [활성객체 생성 시각적 확인](https://ui.dev/javascript-visualizer/)
- [Javascript Execution context](https://poiemaweb.com/js-execution-context)
- [Execution context](https://m.blog.naver.com/PostView.nhn?blogId=gi_balja&logNo=221261731281&proxyReferer=https%3A%2F%2Fwww.google.com%2F)