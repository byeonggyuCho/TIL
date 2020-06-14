# Monad

## Info
모나드는 순서가 있는 연산을 처리하는데 사용되는 패턴이다. 모나드는 함수형 프로그래밍 언어에서 부작을 관리하기 위해 광범위하게 사용되며 복합 체계언어에서도 보잡도를 제어하기 위해 사용된다.  

모나드는 타입으로 감싸 빈 값을 자동으로 전파하거나 비동기 코드를 단순화하는 등의 행동을 추가하는 역할을 한다. 
모나드를 위해선 다음 세가지 코드 구조에 대한 조건을 만족해야한다.
1. 타입 생성자 : 기초타입을 위한 모나드화된 타입을 생성하는 기능
    - number일 경우 `Mabe<number>`타입으로 정의하는 것.
2. unit 함수 : 기초 타입의 값을 감싸 모나드에 넣음.
    - 


## REF 
- [monad](https://biz.chosun.com/site/data/html_dir/2018/07/24/2018072401981.html)
- [Javascript in Moand](https://curiosity-driven.org/monads-in-javascript)
- [Ramda and Lodash](https://engineering.huiseoul.com/%EB%9E%8C%EB%8B%A4-ramda-%EC%99%80-%EB%A1%9C%EB%8B%A4%EC%8B%9C-lodash-%EA%B7%B8%EB%A6%AC%EA%B3%A0-%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-709ef969c9a5)