# Styled Component

## TL;DR
- Css-in-Js 라이브러리
- 자주 사용되는 코드패턴 정리
- 스타일과 컴포넌트 사이의 연결(mapping)을 제거한다.  



## Css-in-Js
CSS-in-JS는 자바스크립트 파일 안에 css를 작성하는 형태이다.  
좀 더 풀어서 말하자면 현대 웹에서는 문서를 페이지 단위가 아니라 컴포넌트 단위로 개발을 하고 그에 맞는 css작성에 대한 새로운 접근법이라 할 수 있다.  **CSS-in-JS는 CSS 모델을 문서 수준이 아닌 구성 요소 수준으로 추상화한다.**  

구조와 스타일을 분리하는 것과 합치는 것에 대해서는 양측의 의견이 갈리는 부분이다.  
페이지가 아닌 컴포넌트 단위에서는 구조와 스타이일을 나누는 관심분리의 의미가 희석될 수 있고 이런 단점보다 스타일을 나눴을 때 생기는 
전역 스타일 관리에 따른 코드 복잡도 증가가 더 큰 단점이 될 수 있다고 생각한다.


### 기존 css의 문제점

#### 1. CSS 클래스 중복 문제
- 네임스페이스를 공유하기때문에 css충돌이 생기기 쉽다.
- 서드파티 css를 사용하는 경우 
#### 2. 스타일 상속에 의한 중복 문제
- 의도치않은 상속으로 사이드이펙트가 생기기 쉽다.

#### 3. !important 문제

#### 4. 코드 최적화 문제
1. 미사용 Class를 구분하기 어려워서 지울 수 없다.
2. 코드 재활용성이 떨어진다. 
3. 코드 재활용성을 고려하다보면 class가 많아진다.

#### 5. 자바스크립트와 변수를 공유할 수 없는 문제
1. 자바크립트와 공유가 가능하면 조건부 스타일링이 수월해진다.  
2. 특정 색상값을 반복해서 사용한다면? (Sass에서 해결.)

#### 6. 격리하여 관리하기 어려운 문제



### Sass의 한계
Sass나 Less를 이용한 CSS 구조 설계와 같은 방식들이 유용하기는 하지만 조건부 스타일링의 방법 등 여전히 제한적인 문제가 있었습니다.  
그러나 Styled-Components 라이브러리는 위의 문제들을 해결할 수 있는 방법을 제시하고 있습니다.

**해결하지 못한 문제**
- 정해진 가이드가 없으면 구조가 복잡해진다.
- CSS 클래스 명에 대한 고민은 여전하다.
- 여전히 CSS 클래스로 조건부 스타일링을 하고 있다.




### Css-in-Js의 장점

1. 컴포넌트로 생각하기
    -  더이상 스타일시트의 묶음을 유지보수 할 필요가 없습니다. CSS-in-JS는 CSS 모델을 문서 레벨이 아니라 컴포넌트 레벨로 추상화합니다(모듈성).
2. CSS-in-JS는 JavaScript 환경을 최대한 활용하여 CSS를 향상시킵니다.
3. 진정한 분리 법칙
    - 스코프가 있는 선택자로는 충분하지 않습니다. CSS에는 명시적으로 정의 하지 않은 경우, 부모 요소에서 자동으로 상속되는 속성이 있습니다. 대부분의 CSS-in-JS프레임워크는 부모 요소의 속성을 상속하지않는 기능을 제공합니다.
4. 스코프가 있는 선택자
    - CSS는 하나의 전역 네임스페이스만 있습니다. 복잡한 애플리케이션 내에서 선택자 충돌을 피할 수 없습니다. BEM과 같은 네이밍 컨벤션은 한 프로젝트 내에서는 도움이 되지만, 서드파티 코드를 통합할 때는 도움이 되지 않습니다. JSS는 JSON으로 표현된 것을 CSS로 컴파일 할 때, 기본적으로 고유한 이름을 생성합니다(해쉬값).
5. 벤더 프리픽스
    - 생성된 CSS 규칙은 자동적으로 벤더 프리픽스가 붙어있으므로 생각할 필요가 없습니다.
6. 코드 공유
    - JavaScript와 CSS사이에 상수와 함수를 쉽게 공유할 수 있습니다.
7. 현재 화면에 사용중인 스타일만 DOM에 있습니다(react-jss).
8. CSS 유닛 테스트!
9. HTTP 요청 수 감소
    -  CSS-in-JS는 자산과 리소스를로드하기 위해 HTTP 요청을하지 않아도됨을 의미합니다.
10. 스타일링 조각화 
    -  CSS-in-JS를 사용하면 호환성 문제에 대한 걱정없이 자유롭게 스타일을 작성할 수 있습니다.
11. 미사용 스타일을 쉽게 추적가능.
    - 기존 익스터널방식에서는 미사용 class를 추적하기 어렵다.




### Css in js의 단점

1. 페이지 로드 시 자바스크립트를 분석하여 CSS 생성
- CSS 생성 오버헤드 - 규모가 클수록 영향
2. 렌더링 되는 시점에 스타일 코드가 추가됨
- CSS 파일을 캐시 할 수 없음 (파일 자체가 없음)
- Head영역이 아닌 Body영역에서 렌더링 됨 -> 스타일 없는 컴포넌트가 렌더링 되고 스타일이 뒤늦게 적용됨 (안 이쁨) -> SSR 설정으로 해결 가능



    





## Styled Component의 장점

### 1. 컴포넌트
- 컴포넌트별로 스타일을 분리해서 관리
- 클래스 이름을 자동으로 생성하고 중복 문제가 해결됨
### 2. CSS 코드 최적화
- 페이지에서 사용하는 컴포넌트의 스타일만 사용
- 불필요한 스타일은 제거
### 3. 자바스크립트 사용
- CSS를 코딩할 수 있음
- 변수나 함수를 만들고 자바스크립트 코드와 상수를 공유할 수 있음
- 조건부 스타일링이 수월해진다.
### 4. 테스트 코드 작성 가능
### 5. Vendor prefix
- moz, -webkit같은 벤더 프리픽스를 자동으로 붙여준다.

### 6. React Native 와도 스타일 공유 가능




### 예제


#### 1.기본 컴포넌트에 스타일 적용하기
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



#### 2.프로퍼티를 전달하기
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



#### 3. Global Style
Body 의 margin 이나 background-color 와 같이 Global 하게 적용되야할 스타일이 있다면 createGlobalStyle 을 사용한다.
```jsx

import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 50px;
    padding: 50px;
    background-color: black;
  }
`;
...
const App = () => {
  return (
    <Container>
      <GlobalStyle />
      <Button>버튼1</Button>
      <Button color="red">버튼2</Button>
    </Container>
  );
};
```

#### 4. 상속
기존에 작성한 스타일 컴포넌트에서 속성을 추가하거나 수정한 컴포넌트를 만들땐 상속(extend)를 한다.  
다음은 그림자 속성을 부여하는 예제이다.  

```jsx
render() {
  return(
    <div>
      <ShadowedButton> Shadowed Button </ShadowedButton>
    </div>
  );
}


const ShadowedButton = Button.extend`
  box-shadow: 0px 5px 15px rgba(0, 0, 0, .3);
`; 
```

간혹 상속을 하면서 태그를 변경하고 싶은 경우가 있다.  
그런 경우에는 withComponent를 사용하면 된다.  
다음 예제에서 Button태그를 a태그로 변경했다.  
태그의 기본속성이 있어 스타일이 망가질 경우가 있다. 그런 상황에서는 extend를 통해 속성을 수정하면 된다.

```jsx
render() {
  return(
    <div>
      <LinkButton href='https://hudi.kr'> Go to Hudi.kr </LinkButton>
    </div>
  );
}


const LinkButton = Button.withComponent('a').extend`
  text-decoration: none;
`;
```

```jsx
 <LongButton as="a" href="https://hudi.kr"> Go to Hudi.kr </LongButton>
```
as라는 속성으로 태그를 변경해주는 방법도 있다.  이 경우 스타일 수정은 어떻게 해주는지..?



#### 5. Mixin
CSS의 코드블럭 객체를 만들어 재사용 가능하게 하는 방법  
hoverShadow에 CSS 코드블록 객체를 할당해서 스타일 컴포넌트에 재활용할 수 있다.
```jsx
import styled, { css } from 'styled-components';


render() {
  return(
    <div>
      <HoverButton> hover button </HoverButton>
    </div>
  );
}

//  & 은 SASS 문법중 하나로, 부모 선택자를 레퍼런스 할때 사용된다. 여기서 부모는 HoverButton 가 된다.
const hoverShadow = css`
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, .5);
  }
`;

const HoverButton = Button.extend`
  ${hoverShadow}
`

```

이 기능은 파라미터를 전달하여 좀더 쉽게 스타일 추상화를 통한 코드 재활용을 할 수 있습니다.
```jsx
const RingVariant = (radius, stroke = "10") => css`
  position: absolute;
  border-radius: 50%;
  height: ${radius * 2}px;
  width: ${radius * 2}px;
  border: ${stroke}px solid rgba(0, 0, 0, 0.5);
`;

const ShapeRing1 = styled.div`
  ${RingVariant(40, 15)};
  top: 30%;
  left: 0;
  transform: translateX(-50%);
`;

const ShapeRing2 = styled.div`
  ${RingVariant(60, 15)};
  top: 15%;
  left: 0;
  transform: translateX(50%);
`;
```


#### 6. Theme
Theme 은 여러 컴포넌트가 동일한 CSS value 를 공유할 수 있게 해준다.

```jsx
import styled, { ThemeProvider } from 'styled-components';
import theme from './theme';

class App extends Component {
  render() {
    return(
      <ThemeProvider theme={theme}>
        <div>
          <Button> default button </Button>
          <Button success> success button </Button>
          <Button danger> danger button </Button>
        </div>
      </ThemeProvider>
    );
  }
}

const Button = styled.button`
  padding: 10px 15px;
  margin: 0 5px;
  border: none;
  border-radius: 5px;
  background-color: ${props => {
    if (props.success) return theme.successColor; //#249D3D
    else if (props.danger) return theme.dangerColor; //#D72E3D
    else return theme.defaultColor; //#868e96
  }};
  color: #FFFFFF;
  font-size: 15pt;
`;

export default App;
```
JSX 의 최상위 레벨을 ThemeProvider에 Theme을 제공하면 그 하위 컴포넌트에서 접근이 가능하다.  

#### 7.다른 컴포넌트 참조(Nesting)
다른 컴포넌트를 참조하여 스타일을 수정할 수 있다.  
`${스타일컴포넌트명}{ 스타일 지정; }`

```jsx
const Box = styled.div`
    border: 2px solid black;
    background-color: #eee;
    color:green;
    ${RedButtun}{
    	background-color:red;
        border:none;
        ...
        &:hover {
        cursor:pointer;}
     }
```


#### 8.추가적인속성(Additional Attributes)
스타일 컴포넌트를 선언하는 시점에 속성을 부여할 수 있다.

```jsx
render() {
  return(
    <div>
      <Input />
      <Input placeholder="i have a placeholder." />
    </div>
  );
}

/* ... */

const Input = styled.input.attrs({
  placeholder: "default placeholder"
})`
  border: 1px solid #C7CED5;
  border-radius: 5px;
  padding: 10px;
  font-size: 13pt;
`;

```

#### 9.조건부 스타일링
스타일 컴포넌트에서 조건부 스타일링을 하는 에제이다. 


```jsx
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: lightgray;
  width: 100%;
  height: 100vh;
`;

const Button = styled.button`
  color: white;
  min-width: 120px;

  /* props로 넣어 준 값을 직접 전달해 줄 수 있습니다. */
  background-color: ${props => props.color || "blue"};

  /* & 문자를 사용하여 Sass 처럼 자기 자신 선택이 가능합니다. */
  &:hover {
    background-color: white;
    color: black;
  }
  & + button {
    margin-left: 1rem;
  }
`;

const App = () => {
  return (
    <Container>
      <Button>버튼1</Button>
      <Button color="red">버튼2</Button>
    </Container>
  );
};

export default App;
```

#### 10. 컴포넌트 재활용
자주 사용하는 레이아웃 스타일을 export하여 코드를 재활용할 수 있습니다. 

```jsx
export const ContentLayout = styled.div`
      display: block;
      height: 100%;
      max-width: 1220px;
      margin-left: auto;
      margin-right: auto;
`;

export const FeatureTitle = styled.div`
      font-family: Handon3gyeopsal600g;
      font-size: 58px;
      letter-spacing: -2.07px;
`;

export const FeatureDesc = styled.div`
  font-family: Handon3gyeopsal300g;
   color: #454f5d;
   font-size: 38px;
   line-height: 1.39;
   letter-spacing: -1.35px;
`;
```



## Ref
- [1.styled-components 소개](https://blog.nerdfactory.ai/2019/10/25/react-styled-components.html)
- [2.Css-In-JS에 관해 알아야할 모든것](https://d0gf00t.tistory.com/22)
- [3.styled-components선택한 이유](https://analogcoding.tistory.com/181)
- [Css-In-Js를 선택하는 이유](https://d0gf00t.tistory.com/22)
- [styled-components 소개2](https://hudi.kr/styled-components-%EC%8A%A4%ED%83%80%EC%9D%BC%EC%9D%84-%ED%92%88%EC%9D%80-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8/)
- [styled-component를 쓰는 이유](https://analogcoding.tistory.com/181)
- [What is styled-components ?](https://medium.com/@lee.ellen0814/styled-components-b90710b05e22)
- [2019 기술리뷰](https://subicura.com/2020/01/07/2019-dev-summary.html)
- [styledComponent](https://react.vlpt.us/styling/03-styled-components.html)
- [sass와 styleComponent비교](https://velog.io/@hwang-eunji/Styled-Components-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%8A%A4%ED%83%80%EC%9D%BC-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8)