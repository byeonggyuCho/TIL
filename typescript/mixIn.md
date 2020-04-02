

## Intro 
Mixin은 행위의 분리입니다. 
필요한 행위를 클래스 계통과 상관없이 독립된 클래스로부터 얻어와 행위를 탑재할 수 있다면 훨씬 유연한 코드 재사용 패틴이 됩니다.  
믹스인은 특정 기능만을 담당하는 클래스로 단독 사용이 아닌 다른 클래스에 탑재되어 사용될 목적으로 작성된 클래스를 의미한다.

```ts
// Disposable 믹스인
class Disposable {
    isDisposed: boolean = false;
    dispose() {
        this.isDisposed = true;
    }

}

// Activatable 믹스인
class Activatable {
    isActive: boolean = false;
    activate() {
        this.isActive = true;
    }
    deactivate() {
        this.isActive = false;
    }
}

// 두가지 클래스를 결합한 결과를 처리할 클래스.
class SmartObject implements Disposable, Activatable {
    constructor() {
        setInterval(() => console.log(this.isActive + " : " + this.isDisposed), 500);
    }

    interact() {
        this.activate();
    }

    // Disposable
    isDisposed: boolean = false;
    dispose: () => void;
    // Activatable
    isActive: boolean = false;
    activate: () => void;
    deactivate: () => void;
}
applyMixins(SmartObject, [Disposable, Activatable]);

let smartObj = new SmartObject();
setTimeout(() => smartObj.interact(), 1000);

////////////////////////////////////////
// 런타임 라이브러리 어딘가에
////////////////////////////////////////

// 헬퍼함수.
function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}

```


또 다른 자바스크립트 예제


```js
// 나는 행위를 담당하는 Mixin
const FlyToMixin = (superclass) => class extends superclass {
    flyTo(destination){
        console.log(`${this.name} is flying to the ${destination}`);
    }
}

// 먹는 행위를 담당하는 Mixin
const EatMixin = (superclass) => class extends superclass {
    eat(food){
        console.log(`${this.name} is eating ${food}`);
    }
}

// 헤엄치는 행위를 담당하는 Mixin
const SwimAtMixin = (superclass) => class extends superclass {
    swimAt(place){
        console.log(`${this.name} is swiming at the ${place}`)
    }
}

```


```js
// 믹스인을 탑재한 Mouse
class Mouse extends SwimAtMixin(EatMixin(Animal)) { /*...*/ }

const mickyMouse = new Mouse('Micky Mouse');
mickyMouse.swimAt('river');
```


## SmartObject에 왜 extends가 아닌 implements를 써야하나?
클래스를 인터페이스로 다루고 구현이 아닌 Disable과 Actiavtable의 타입만 사용하기 때문이다.
SmartObject에서 속성에 대한 정의만 한다.  
applyMixins에서 속성을 주입할때 타입스크립트 컴파일러가 에러를 내지 않게 하기 위함이다. 




## 다중 상속과 어떻게 다른가?
다중 상속의 문제들이 있는데, 언어별로 다중상속의 문제를 해결하기 위해 선택하는 방법중 하나가 mixin이다. 


## 리액트에서는 왜 Mix인을 안쓰나?

1. 의존성에 의한 유지보수 관리의 어려움.  
믹스인은 한 컴포넌트에 있는 파일이 아니기 때문에 종속성이 생기고, 문서화하기 어렵다. 왜냐하면 해당 코드를 찾으려는 개발자는 혼합된 믹스인을 다 찾아봐야 하기 때문이다.

2. 오버라이딩에 의한 충돌.  
타 패키지나, 믹스인 심지어 믹스인이 적용될 컴포넌트까지 메소드명이 충돌될 수 있다!
- 작성된 mixins는 제거하거나 변경하기가 어렵습니다.

3. 종속성에 의한 복잡도 증가.  
서로 종속되어 있는 믹스인을 수정하다보면 코드에 대한 복잡도가 증가한다.
이는 캡슐화 경계를 침식시킨다.  
믹스인의 기능을 확장하면서 점점 다른 믹스인이 생겨나게 되고, 결과적으로 믹스인들끼리는 강한 종속성이 생겨버린다. 


**정리**  
믹스인은 복잡하고 암묵적이며 충돌을 일으킨다.



### HOC와 MixIn의 대비점
기능 조합한 하나의 클래스를 만들것인가?
기존의 클래스를 래핑해서 추가 기능을 덫붙일 것인가?의 차이..

- HOC는 기존의 구조를 덮어쓰거나, 제약사항을 만들지 않는다.
- HOC는 입력 컴포넌트를 수정하지 않으며 상속을 사용하여 동작을 복사하지도 않는다
- HOC는 변형된 버전과 동일하게 움직이지만 충돌 가능성은 배제하고있습니다. 




## 고차함수
```js

function add(x, y) {
 return x + y;
}
​
function multiply(x, y) {
 return x * y;
}
​
function withLogging(wrappedFunction) {
    return function(x, y) {
        var result = wrappedFunction(x, y);
        console.log('result:', result);
        return result;
    };
}
​
// Equivalent to writing addAndLog by hand:
var addAndLog = withLogging(add);
​
// Equivalent to writing multiplyAndLog by hand:
var multiplyAndLog = withLogging(multiply);
```



## HOC의 기본 골격
```js
enhance = (ComposedComponent) => {
    return class extends React.Component {
        // 생성자 및 기타 공통 라이프 사이클
        constructor() {...}
        componentDidMount() {...}
        //...

        // 내부 컴포넌트를 렌더링
        render() {
            return <ComposedComponent {...this.props} />;
        }
    }
}

```


### 리액트의 HOC
```jsx
class MyComponent extends React.Component {
  // 주입 받은 props 활용

  // 실제 렌더링
  render() {
    return <div>My Component</div>;
  }
}

export default Enhance(MyComponent);
```


### HOC
- state 재사용 패턴, 코드 재사용을 위해 고안된 방법.
- 테스트가 수월함. 
- 단점 : Wrapper hell (DOM 구조가 복잡해짐.) - Huge Components
    - 디버깅을 어렵게 만든다.
    - 컴포넌트의 레이어를 복잡하게 만드낟.

관심사 분리??

종속성이 있기때문에 mixin은 문제가 있다.

## Hooks의 도입배경
1. 복잡한 컴포넌트
    - HOC를 많이 사용하다보면 Wapper Hell이 될 수 있는데 hook을 사용하면 Wapper hell없이 상탯값 재사용이 손쉬움.
2. 로직 중복
3. 클래스
    - this의 부작용.
4. 장점
    - 가독성
    - 디버깅 용이



## 객체 지향 소프트웨어 개발에서 횡단 관심사 또는 크로스커팅 관심사(cross-cutting concerns)
- 구현하려고 하는 비즈니스 기능들을 Primary(Core) Concern, 보안, 로그, 인증과 같이 시스템 전반적으로 산재된 기능들을 Cross-cutting concern이라고 부른다.
- Cross cutting concerns의 해결방법
    1. AOP
    2. MixIn
    3. HOC




## REF
- [React Mixin은 해롭다](https://itmining.tistory.com/124)
- [Higher Order Components](https://ui.toast.com/weekly-pick/ko_20160624/)
- [HOF란](https://dev-momo.tistory.com/entry/HigherOrder-Function-%EC%9D%B4%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80?category=536788)
- https://dev-momo.tistory.com/entry/React-Hooks
- https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889
- [typescrpit-mixin](https://typescript-kr.github.io/pages/Mixins.html)
- [mixIn-HOC](https://joshua1988.github.io/vue-camp/reuse/mixins-vs-hoc.html#hoc-vs-mixins)
- [리액트 패턴](https://godsenal.github.io/2018/07/17/React%EC%9D%98-%EC%A7%84%ED%99%94%ED%95%98%EB%8A%94-%ED%8C%A8%ED%84%B4%EB%93%A4-Evolving-Patterns-in-React/)
- [HOCd의 문제점 ](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce?gi=e27090c3baf5)
- [Vue에 Hoc적용해보기](https://wormwlrm.github.io/2019/09/08/Higher-Order-Component-pattern-in-Vue.html) 
- [AOP란?](https://devkmm24.tistory.com/entry/Aspect-Oriented-Programming-AOP)​