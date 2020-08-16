# Jest

## react component testing

1. 특정 props에 따라 컴포넌트가 충돌없이 렌더링 되는지 확인
2. 이전 렌더링 결과와 지금 렌더링 결과가 일치하는지 확인.
3. 특정 DOM이벤트르 시뮬레이트하여 원하는 변화가 제대로 발생하는지 확인.
4. 렌더링 결과물을 이미지로 저장하여 픽셀을 하나하나 확인해서 모두 일치하는 지 확인.

## mocking을 하는 이유

1. 프로젝트의 규모가 켜져서 한 번에 실행해야 할 테스트 케이스가 많이지면 이러한 작은 속도 저하들이 모여 큰 이슈가 될 수 있으며, CI/CD 파이프라인의 일부로 테스트가 자동화되어 자주 실행되야 한다면 더 큰 문제가 될 수 있습니다.

2. 테스트 자체를 위한 코드보다 데이터베이스와 연결을 맺고 트랜잭션을 생성하고 쿼리를 전송하는 코드가 더 길어질 수 있습니다. 즉, 배보다 배꼽이 더 커질 수 있습니다.

3. 만약 테스트 실행 순간 일시적으로 데이터베이스가 오프라인 작업 중이었다면 해당 테스트는 실패하게 됩니다. 따라서 테스트가 인프라 환경에 영향을 받게됩니다. (non-deterministic)

4. 테스트가 종료 직 후, 데이터베이스에서 변경 데이터를 직접 원복하거나 트렌잭션을 rollback 해줘야 하는데 상당히 번거로운 작업이 될 수 있습니다.

## 옵션

json파일이나 js파일 혹은 package.json에서 설정할 수 있다.

```json
// jest.config.json
{
  "transform": {
    "^.+\\.ts$": "ts-jest"
  },
  "testRegex": "\\.test\\.ts$",
  "moduleFileExtensions": ["ts", "tsx", "js", "json"],
  "globals": {
    "ts-jest": {
      "diagnostics": true
    }
  }
}
```

package.json에서는 `jest`라는 키워드에 설정을 넣는다.

```json
// package.json
{
  "jest": {
    "transform": {
      "^.+\\.ts$": "ts-jest"
    },
    "testRegex": "\\.test\\.ts$",
    "moduleFileExtensions": ["ts", "tsx", "js", "json"],
    "globals": {
      "ts-jest": {
        "diagnostics": true
      }
    }
  }
}
```

###

![configuring](https://jestjs.io/docs/en/configuration)

### coverage

```
jest --watch --coverage
```

항목 설명

- Statements(Stmts) 각 구문의 실행을 확인
- Branches If, Switch 같은 조건문의 각 분기 실행을 확인
- Functions(Funcs) 각 함수 호출을 확인
- Lines 각 라인의 실행을 확인(Statements와 비슷)
- Uncovered Line 테스트를 통해 실행되지 않은 코드 라인을 표시

istanbul를 이용한 커버리지 츠겅.

### runInBand

### detectOpenHandles

열려있는 리소스를 모두 닫아준다.

### forceExit

테스트가 끝나면 강제종료를 한다.

## 함수

### 전후처리

beforeAll과 afterAll은 선언된 describe 범위 안에서 전후 동작하며,
beforeEach와 afterEach는 선언된 describe 범위 안에서 각 test 단위 전후로 동작합니다.

### describe

### it

### expect

### Matcher

- toEqual
- toBeTruthy

### 비동기 호출 테스트

프론트에서 비동기호출은 mock데이터를 이용하여 서버 호출을 대체한다.  
실제 API의 동작여부는 서버 테스트에서 담당해야하는 부분이며 Front에서는 해당 서버요청이 정상적으로 동작한다는 가정을 하고 데이터 연동이 올바르게 되는지를 확인한다.

- axios-mock-adapter

### mock

```js
const mockFn = jest.fn()
mockFn()
mockFn(1)
mockFn("a")
mockFn([1, 2], { a: "b" })

mockFn.mockReturnValue("I am a mock!")

expect(mockFn).toBeCalledTimes(2)
expect(mockFn).toBeCalledWith("a")
expect(mockFn).toBeCalledWith(["b", "c"]

```

- mockFn는 호출이 기록된다.
- 몇번 호출됐는지?
- 어떤 파라미터와 호출됐는지?

### spy.on

- mockFn를 만드는게 아니라, 특정 객체의 메서드의 행동을 추적할 때 사용한다.

```js
const calculator = {
  add: (a, b) => a + b,
};

const spyFn = jest.spyOn(calculator, "add");

const result = calculator.add(2, 3);

expect(spyFn).toBeCalledTimes(1);
expect(spyFn).toBeCalledWith(2, 3);
expect(result).toBe(5);
```

### 반복가능한 테스트코드

```js
const userChangeCases = [{
  name: 'Test1',
  props: { toLowercase: true },
  value: 'testPre',
  result: 'testpre'
}];
const props = {
  onDataChange: jest.fn()
};
describe('Testing TextComponent', () => {
  let wrapper = null;
  beforeEach(() => {
    wrapper = mount(<TextComponent {...props} />);
  });
  describe('On Change Cases', () => {
    userChangeCases.forEach(item => {
      test(item.name, () => {
        wrapper.setProps(item.props);
        const input = wrapper.find('input');
        input.simulate('change',
          { target: { value: item.value } });
        expect(props.onDataChange).
          toBeCalledWith(item.resultValue);
    });
  });
});
```

## REF

- [JEST-한글](https://heropy.blog/2020/05/20/vue-test-with-jest/)
- [DOC-Jest](https://jestjs.io/docs/en/expect.html)
- [GitBooks-Jest](https://jestjs.io/docs/en/using-matchers)
- [jest-mocking](https://www.daleseo.com/jest-mock-modules/)
- [jest-비동기 테스트](https://www.daleseo.com/jest-async/)
- [jest-fn-spy-on](https://www.daleseo.com/jest-fn-spy-on/)
- [How to test axios in Jest](robinwieruch.de/axios-jest)
- [벨로퍼트-비동기테스트](https://velog.io/@velopert/react-testing-library-%EC%9D%98-%EB%B9%84%EB%8F%99%EA%B8%B0%EC%9E%91%EC%97%85%EC%9D%84-%EC%9C%84%ED%95%9C-%ED%85%8C%EC%8A%A4%ED%8A%B8)
- [react-testing](https://velopert.com/3587)
