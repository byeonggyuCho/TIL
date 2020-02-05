# Flow vs Typescript


## 왜?
- 정확성과 생산성 사이의 균형을 노린다!
    - 어떤 경우에서는 정확성을 오히려 희생한다. 
- 안정성을 일부 희생하면서 사용성을 극대화 시키는 선택으로 생산성 희생없이 안정한 코드를 작성할 수있다.

## 선수지식.
### 컴파일언어
- 컴파일러는 고급 언어로 작성된 프로그램 전체를 목적 프로그램으로 번역한 후 링킹 작업을 통해 컴퓨터에서 실행 가능한 프로그램을 생성한다.
-  번역과 실행 과정을 거쳐야하기 떄무넹 번역 과정이 번거롭고 번역 시간이 오래 걸리지만 한번 번역한 후에는 다시 번역하지 않으므로 실행 속도가 빠르다.

### 인터프린터
- 인터프린터는 고급 언어로 작성된 프로그램을 한줄 단위로 받아들여 번역하고 번역과 동시에 프로그램을 한줄 한줄 실행시키는 프로그램
- 프로그램이 직접 실행되므로 목적 프로그램이 생성되지 않는다.
- 줄 단위로 번역 실행되기 때문에 시분할 시스템에 유용하며 원시 프로그램의 변화에 대한 반응이 빠르다.
- 번역 속도는 빠르지만 프로그램 실행 시마다 번역해야 하므로 실행속도는 느리다.
- CPU 사용 시간의 낭비가 크다.


## etc
- babylon.js



## ref
- [우리가 TypeScript를 선택한 이유](https://medium.com/@constell99/%EC%9A%B0%EB%A6%AC%EA%B0%80-typescript%EB%A5%BC-%EC%84%A0%ED%83%9D%ED%95%9C-%EC%9D%B4%EC%9C%A0-b0a423654f1e)
- [Typesciprt를 채택 두 프로세스 비교](https://blog.rhostem.com/posts/2017-06-11-adopting-flow-and-typescript)
- [TypeScript와 Flow](https://www.slideshare.net/HeejongAhn/typescript-flow-81799404)
- [안희종- why typescript](https://ahnheejong.gitbook.io/ts-for-jsdev/01-introducing-typescript/why-typescript)