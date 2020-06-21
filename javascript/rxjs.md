## Rxjs

## intro
비동기 프로그램과 이벤트 기반 프로그램의 조합  
이 포스팅에서는 기존의 javascript의 문제점을 rxjs가 어떻게 해결하는지, 브라우저 환경에서 어떻게 적용될 수 있는지에 포커스를 맞춘다.  


## 프로미스의 한계
1. 마우스 움직임이나 파일 스트림의 바이트 시퀀스처럼 둘 이상의 값을 생성하는 데이터 소스(data sources)를 처리할 수 없다.
2. 에러 발생시 재실행하는 기능이 없으며 Promise가 불변이라 취소할 수 없다.

## Rxjs를 통해 해결할 수 있는 문제
1. 에러 발생시 재시도 로직 구현 가능 (보다 쉽게)
2. 요청을 취소할 수 있다.
3. 스로틀링 디바운싱을 손쉽게 할 수 있다.
4. 방대해진 이벤트 리스너를 관리하여 브라우저의 메모리 관리를 돕는다. 
    - 현대의 web은 자바스크립트 비중이 커졌고 따라서 사용되는 메모리양도 크게 증가.



## 개념

### 옵져버블
구독 가능한 모든 객체를 말한다.  
파일 읽기, 웹 서비스 호출, DB쿼리, 시스템 통지 푸시, 사용자 입력 처리 원소 컬랠션 탐색, 단순 문자열 파싱등으로 비롯된 ㅣㅂ동기 이벤트를 구독할 수 있다.  
어떤 자료형이라도 옵저버블을 이용해 스트림으로 바꿀 수 있다.
- 함수형과 리액티브 프로그래밍을 하나로 묶는다.
### 모나드


### 스트림
 시간의 흐름에 따라 발생하는 이벤트의 순차열


### 기본형
 ```js

 RxObservable.range(1,3)
    .subscribe(
        x => console.log(`다음: ${x}`),
        err => console.log(`에러: ${err}`),
        () => console.log('완료');
    )
```

```js
const square = Rx.Observable.wrap(function*(n) {
    for(let i =1; i <= n, i++) {
        return yeild Observable.just(i * i);
    }
});

squares(3).subscribe(x => console.log(`다음: ${x}`));
```


### 입력 처리
필드 입력값을 캐치해서 검증하는 로직
```js
document.querySelector('#studnet-ssn')
    .addEventListener('change', function(event){
        let value = event.target.value;
        value = value.replace(/^\s*|\-|\s*$/g/,'');
        console.log(value.length !== 9 ? '맞음' : '틀림')
    })
```
이 코드를 RxJS로 표현하면 다음과 같다.

```js
Rx.Observable.fromEvent(
    document.querySelector('#student-ssn'),'change')
    .map(cleanInput)
    .map(checkInput)
    .map(checkLengthSsn)
    .subscribe(
        ssn => ssn.isRight ? console.log('Vaild') : console.log('Invalid'); 
    )
)
```


### RsJS와 프로미스
```js
Rx.Observable.fromPromise(getJSON('/students'))
    .map(R.sortBy(R.compose(R.toLower, R.prop('firstname'))))
    .flatMapLastest(student => Rx.Observable.from(student))
    .subscribe(
        student => console.log(student.fullname),
        err => console.log(err)
    );
```


## REF
- [learn-rxjs](https://tienne.gitbooks.io/learnrxjs/)
- [rxJS](https://hyunseob.github.io/2016/10/09/understanding-reactive-programming-and-rxjs/)
- [poiemaweb](https://poiemaweb.com/angular-rxjs)
- [rsjs를 사용하는 이유](https://code-masterjung.tistory.com/70)