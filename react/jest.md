# Jest

## react component testing

1. 특정 props에 따라 컴포넌트가 충돌없이 렌더링 되는지 확인
2. 이전 렌더링 결과와 지금 렌더링 결과가 일치하는지 확인.
3. 특정 DOM이벤트르 시뮬레이트하여 원하는 변화가 제대로 발생하는지 확인.
4. 렌더링 결과물을 이미지로 저장하여 픽셀을 하나하나 확인해서 모두 일치하는 지 확인.

## package.json

package.json에 아래 설정을 추가한다.  
상세한 설정은 jest 공식 페이지를 알아보자.

```json
"jest": {
    "transform": {
      "^.+\\.ts$": "ts-jest"
    },
    "testRegex": "\\.test\\.ts$",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "json"
    ],
    "globals": {
      "ts-jest": {
        "diagnostics": true
      }
    }
  }
```

## 옵션

![configuring](https://jestjs.io/docs/en/configuration)

### coverage

```
jest --watch --coverage
```

istanbul를 이용한 커버리지 츠겅.

## 함수

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

- [DOC-Jest](https://jestjs.io/docs/en/expect.html)
- [GitBooks-Jest](https://jestjs.io/docs/en/using-matchers)
- [jest-mocking](https://www.daleseo.com/jest-mock-modules/)
- [jest-비동기 테스트](https://www.daleseo.com/jest-async/)
- [jest-fn-spy-on](https://www.daleseo.com/jest-fn-spy-on/)
- [How to test axios in Jest](robinwieruch.de/axios-jest)
- [벨로퍼트-비동기테스트](https://velog.io/@velopert/react-testing-library-%EC%9D%98-%EB%B9%84%EB%8F%99%EA%B8%B0%EC%9E%91%EC%97%85%EC%9D%84-%EC%9C%84%ED%95%9C-%ED%85%8C%EC%8A%A4%ED%8A%B8)
- [react-testing](https://velopert.com/3587)
