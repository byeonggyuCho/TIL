## react-testing-library

## intro

React Testing Library는 Jest를 기반으로 UI테스트를 지원해주는 DOM Testing Library에 React Component를 위한 API들이 추가된 것이다.  
모든 테스트를 DOM 위주로 진행합니다

통합테스트

## 설치

```
$ yarn add react-testing-library jest-dom

yarn add @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- jest-dom 은 jest 확장으로서, DOM 에 관련된 matcher 를 추가해줍니다.

## redux 예제

```jsx
import React from "react";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import { render as rtlRender, screen, fireEvent } from "@testing-library/react";

// counter.js
const Counter = ({ dispatch, count }) => {
  const increment = () => {
    dispatch({ type: "INCREMENT" });
  };

  const decrement = () => {
    dispatch({ type: "DECREMENT" });
  };

  return (
    <div>
      <h2>Counter</h2>
      <div>
        <button onClick={decrement}>-</button>
        <span data-testid="count-value">{count}</span>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
};

// normally this would be:
// export default connect(state => ({count: state.count}))(Counter)
// but for this test we'll give it a variable name
// because we're doing this all in one file
const ConnectedCounter = connect((state) => ({ count: state.count }))(Counter);

// app.js
const initialReducerState = {
  count: 0,
};

function reducer(state = initialReducerState, action) {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + 1,
      };
    case "DECREMENT":
      return {
        count: state.count - 1,
      };
    default:
      return state;
  }
}

// normally here you'd do:
// const store = createStore(reducer)
// ReactDOM.render(
//   <Provider store={store}>
//     <Counter />
//   </Provider>,
//   document.getElementById('root'),
// )
// but for this test we'll umm... not do that :)

// Now here's what your test will look like:

// this is a handy function that I normally make available for all my tests
// that deal with connected components.
// you can provide initialState or the entire store that the ui is rendered with
function render(
  ui,
  {
    initialState = initialReducerState,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

test("can render with redux with defaults", () => {
  render(<ConnectedCounter />);
  fireEvent.click(screen.getByText("+"));
  expect(screen.getByTestId("count-value")).toHaveTextContent("1");
});

test("can render with redux with custom initial state", () => {
  render(<ConnectedCounter />, {
    initialState: { count: 3 },
  });
  fireEvent.click(screen.getByText("-"));
  expect(screen.getByTestId("count-value")).toHaveTextContent("2");
});

test("can render with redux with custom store", () => {
  // this is a silly store that can never be changed
  const store = createStore(() => ({ count: 1000 }));
  render(<ConnectedCounter />, {
    store,
  });
  fireEvent.click(screen.getByText("+"));
  expect(screen.getByTestId("count-value")).toHaveTextContent("1000");
  fireEvent.click(screen.getByText("-"));
  expect(screen.getByTestId("count-value")).toHaveTextContent("1000");
});
```

## redux 예제2

### 컴포넌트

```jsx
// counter.js
import React from "react";
import { connect } from "react-redux";

const Counter = ({ dispatch, count }) => {
  const increment = () => {
    dispatch({ type: "INCREMENT" });
  };

  const decrement = () => {
    dispatch({ type: "DECREMENT" });
  };

  return (
    <div>
      <h2>Counter</h2>
      <div>
        <button onClick={decrement}>-</button>
        <span data-testid="count-value">{count}</span>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
};

export default connect((state) => ({ count: state.count }))(Counter);
```

### reducer

```jsx
// reducer.js
export const initialState = {
  count: 0,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + 1,
      };
    case "DECREMENT":
      return {
        count: state.count - 1,
      };
    default:
      return state;
  }
}
```

### test-utils.js

```jsx
// test-utils.js
import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { initialState as reducerInitialState, reducer } from "./reducer";

function render(
  ui,
  {
    initialState = reducerInitialState,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { render };
```

### counter.test.js

```jsx
// counter.test.js
import React from "react";
import { createStore } from "redux";
// We're using our own custom render function and not RTL's render
// our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, fireEvent, screen } from "./test-utils";
import "@testing-library/jest-dom/extend-expect";
import Counter from "./counter";

test("can render with redux with defaults", () => {
  render(<Counter />);
  fireEvent.click(screen.getByText("+"));
  expect(screen.getByTestId("count-value")).toHaveTextContent("1");
});

test("can render with redux with custom initial state", () => {
  render(<Counter />, {
    initialState: { count: 3 },
  });
  fireEvent.click(screen.getByText("-"));
  expect(screen.getByTestId("count-value")).toHaveTextContent("2");
});

test("can render with redux with custom store", () => {
  // this is a silly store that can never be changed
  const store = createStore(() => ({ count: 1000 }));
  render(<Counter />, {
    store,
  });
  fireEvent.click(screen.getByText("+"));
  expect(screen.getByTestId("count-value")).toHaveTextContent("1000");
  fireEvent.click(screen.getByText("-"));
  expect(screen.getByTestId("count-value")).toHaveTextContent("1000");
});
```

## REF

- [DOC-testing-library](https://testing-library.com/docs/recipes)
- [GIT-react-testing-library](https://github.com/testing-library/react-testing-library)
- [벨로퍼트-react-testing-library 를 사용한 리액트 컴포넌트 테스트](https://velog.io/@velopert/react-testing-library)
- [React Testing Library로 TDD개발환경 구축하기](https://medium.com/@benjaminwoojang/react-testing-library%EB%A1%9C-tdd%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%B6%95%ED%95%98%EA%B8%B0-26e55fe33e01)
