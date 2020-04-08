# redux-observable


## intro
자바스크립트의 비동기 요청은 시대에 따라 콜백패턴, promise, async/await등 다양한 방법으로 해결을 시도해왔다.  
기존의 방식과는 다른 또다른 해결책이 소개하는 것이 RxJS다.  
RxJs를 이용하면 데이터를 병합하거나 취소, 쪼개는 작업이 가능하다.  



##  사전지식
1. 함수형프로그래밍
2. Reactive Promgramming


## 용어정리
1. 데이터스트림  
2. Obserber  
    - 디자인 패턴 참조
3. Observable  
    - 특정 객체를 관찰하는 옵저버에게 여러 이벤트나 값을 전파하는 역할 
4. Pull
    - Consumer가 Procuder의 데이터를 당겨온다.
5. Push
    -  Procuder가 Consumer에게 데이터를 민다.
6. single
    - 하나의 값이나 데이터를 다룸
7. multiple
    - 여러 개의 값이나 이벤트를 다룸.
8. LINQ(Language Intergrated Query)


## 장점
- 이벤트를 구독을 취소하고 모든 이벤트를 하나의 스트림으로 제어할 수 있다.
- 비동기 에벤트 등 데이터를 컬렉션 처럼 다루며 순수함수인 연산자를 통해 합성이 가능하여 쉽게 비동기 로직을 제어할 수 있다.


## Reactive Promgramming이란?
- 데이터 흐름과 상태 변경을 전파한다는 생각에 근간을 둔 패러다임
비동기 데이터 스트림에 기반을 둔 프로그래밍 패러다임.  
데이터 스트림이란 연속적인 데이터의 흐름을 말하며 리액티브 프로그래밍은 기본적으로 모든 것을 데이터 스트림으로 본다.  

리액티브 프로그래밍은 동기/비동기와 관계없이 데이터를 생산하는 것이라면 무엇이든 시간축을 따라 연속적으로 흐르는 데이터 스트림으로 처리한다. 리액티브 프로그래밍은 다양한 데이터를 데이터 스트림이라는 하나의 일관된 형식으로 만들고, 이 데이터 스트림을 구독(subscribe)하여 데이터 스트림의 상태 변화에 반응하는 방식으로 동작하는 애플리케이션을 작성하는 것을 말한다.  


## Reactive X
Reactive Programming Paradigm을 Observable 과 Observer 및 Operator 등의 개념을 통해 실현할 수 있도록 해주는 라이브러리다.  
Rx는 특히 비동기 데이터를 처리하는 데 있어서 장점을 갖는데, 기존의 프로미스 기반의 비동기 처리 방식은 다음과 같은 문제점을 갖고 있다.
1. 연속성을 갖는 데이터를 처리할 수 없다.
2. 한번 보낸 요청을 취소할 수 없다.

Rx는 이러한 한계를 보완할 수 있고, 여러 Operator들을 이용한 코드 작성은 최근에 각광을 받고 있는 functional programming paradigm에 매우 잘 부합한다고 생각한다. 


## Observable & Observer
Reactive Programming(약칭 RP)이란 하나의 커다란 데이터의 흐름이 있고, 이 데이터의 변화에 어떻게 반응하는 지를 프로그래밍 하는 것을 뜻한다.  
이를 설명하기 위한 두가지 개념이 있는데 Observble과 Observer이다.  
Observable은 데이터를 생산하고 Observer는 보내는 대상과 데이터를 수신하여 가공합니다.  
일반적인 배열이나 객체부터 element의 event나 비동기 promise 등을 모두 Observable로 생성할 수 있고, Rx에서 제공하는 다양한 함수들은 굉장히 쉽게, 그리고 함수형 프로그래밍 방식으로 observable을 생산하도록 돕는다.Observer의 개념은 이후 Subscribe의 개념과 함께 설명하는게 좋을 것 같다.


## Observable
- push형태의 비동기 데이터를 Iterate하는 인터페이스
- 이 때 Iterate하는 순서는 시간 순이 된다.
- 스트림이라 이해하면 된다.

## Subscribe
Subscribe는 "observer가 observable을 관찰하는 행위" 정도로 얘기할 수 있다.  
observable을 구독하고 있는 observer는 observable에서 notification을 방출 여부를 계속 관찰하고 있다가, 
notification이 발신 때마다 observer function을 수행함으로써 방출된 데이터를 수신하고, 가공하는 작업을 거친다. 
기본적으로 Rx의 observable들은 subscribe가 되어야한 observer가 데이터를 수신할 수 있는 cold observable이다.


## Operator
Operator는 observable을 파라미터로 받아서 다른 형태의 observable로 변환해 리턴하는 함수이다. Rx는 굉장히 다양한 operator function들을 지원하고 있고, rx기반 코드를 가독성 있고 아름답게 만드는 일등 공신이라고 생각한다. 
 데이터 스트림의 개념과 그 위에서 작동하는 operator의 개념을 모식적으로 나타내면 아래와 같다.  

 ![](./resource/img/react/rxjs_stream.png)  
 더블클릭 스로틀링에 대한 데이터 데이터 처리로직이다.  
 이런식으로 흘러들어오는 데이터 스트림을 조작할 수 있다.  




## 연삱자.


### of

### from

### fromEvent

### defer

### range

### interval

### timer


### empty

### never

### throwError

### filter


### first

### last

### take

### takeUntil

### takeWhile

### takeLast

### skip

### skipUntil

### skipWhile

### debounce

### debounceTime

### distinct

### distinctUntilChanged

### sample

### sampleTime

### pluck

### mergeMap
### switchMap
### concatMap
### scan
### partition
### groupBy
### buffer
### bufferCount
### window
### windowCount


## REF
- [RxJs](https://velog.io/@dvmflstm/RxJS-Practice)
- [rxjs-현섭](https://hyunseob.github.io/2016/10/09/understanding-reactive-programming-and-rxjs/)
- [DOC](https://redux-observable.js.org/)
- [reactivex.io](http://reactivex.io/intro.html)
- [sagaVSobservable](https://wonism.github.io/redux-saga-vs-redux-observable/)
- [sagaVSobservable2](https://hackmd.io/@2qVnJRlJRHCk20dvVxsySA/H1xLHUQ8e?type=view)
- [RxJs의 모든것](https://gracefullight.dev/2019/04/30/RxJS%EC%9D%98-%EB%AA%A8%EB%93%A0-%EA%B2%83/)
- [Learn RxJs](https://github.com/btroncone/learn-rxjs)
- [MS는 왜 RxJs를 만들었나?](https://huns.me/development/2051)
- [redux with RxJs](https://alexband.tistory.com/57)