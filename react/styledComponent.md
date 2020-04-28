

### 기본 컴포넌트에 스타일 적용하기
```jsx
import React from 'react';
import styled from 'styled-components';

const Circle = styled.div`
  width: 5rem;
  height: 5rem;
  background: black;
  border-radius: 50%;
`;

function App() {
  return <Circle />;
}

export default App;
```



### 프로퍼티를 전달하기
```jsx
import React from 'react';
import styled from 'styled-components';

const Circle = styled.div`
  width: 5rem;
  height: 5rem;
  background: ${props => props.color || 'black'};
  border-radius: 50%;
`;

function App() {
  return <Circle color="blue" />;
}

export default App;
```



## REF
- [styledComponent](https://react.vlpt.us/styling/03-styled-components.html)