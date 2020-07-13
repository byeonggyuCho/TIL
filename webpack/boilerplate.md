# Webpack

# 소스맵

소스맵은 원본 소스와 난독화된 소스를 매핑해주는 방법 중 하나이다.
\*.map 파일을 통해 제공되고, json 형태로 돼있다.

## webpack

- 모든 리액트 파일을 하나의 컴파일된 자바스크립트 파일에 넣기 위해

## webpack-cli

- build 스크립트를 통해 webapck커맨드를 사용하기 위해

# Loader

## file-loader

- file-loader는 모듈을 그대로 복사해서 dist폴더 밑에 복사본을 만들고, 모듈을 사용하는 쪽에는 그 경로를 넘겨줍니다.

## url-loader

이미지파일을 번들파일에 포함시키면 브라우저의 파일요청횟수를 줄일 수 있습니다.
하지만 번들파일 크기가 너무 커지면 실행속도에 문제가 생길 수 있으므로 크기제한을 두는게 좋습니다.
url-loader을 이용하면 크기가 작은 이미지파일만 번들파일에 포함시킬 수 있습니다.  
file-loader부분을 url-loader가 대체하도록 바꿨습니다. url-loader는 options의

limit크기보다 작을 경우 base64로 바꿔서 번들파일에 포함시켜줍니다.
limit보다 크기가 클 경우 fallback옵션을 이용해 다른 loader를 이용하게 해줍니다.

```js
const path = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      // ...
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              fallback: require.resolve("file-loader"),
            },
          },
        ],
      },
      //...
    ],
  },
  mode: "production",
};
```

## eslint-loader

## style-loader

- css정의를 style요소 형식으로 변환한다.
- 렌더링시에 이를 HTML 헤더에 출력할 수 있다.

## css-loader

자바스크립트 안에 CSS를 해석하고, 모든 의존성을 해결 합니다.

- css파일을 import할 때 모듈로서 다루어 의존 관계를 해결한다.
- class이름 id이름의 지역범위화를 실현한다.

### css-module

```js
       modules: true,
       localIdentName: '[path][name]__[local]--[hash:base64:5]'
```

localIdentName: 클래스명의 형식을 지정해준다.

## raw-loader

- text파일 빌드

## url-loader

- 이미지파일,

## postcss-loader

모듈 함수 사용자정의 프로퍼티등 향상된기능

## node-sass

- sass 를 css 파일로 컴파일 해준다

## sass-loader

import/require()처럼 @import와 url() 해석한다.

## ts-loader

react: 리액트
react-dom: 브라우저 DOM 메서드를 제공한다.
react-prop-types (React props 타입을 체크하기 위함)

## react-hot-loader

- dev-server 를 켜둔 상태에서 수정사항이 생겼을 때 페이지 새로고침을 하지 않고 변경된 부분만 바꿔주도록 하는 lib

## Babel

### @babel/plugin-proposal-class-properties

- state를 사용가능하게 해준다

### babel-plugin-module-resolver

역할 뭐야

### babel-core

- Babel 핵심 의존성 라이브러리이다. Babel(바벨)은 자바스크립트 ES6를 ES5로 컴파일하여 현재 브라우저가 이해할 수 있도록 변환하는 도구다.
- 리액트는 es6를 사용하므로 여러 브라우저에서 사용가능하도록 es5문법으로 바꿔줌

### babel-loader

#### options

```js
options:{cacheDirectory: true,
cacheCompression: false,
babelrc: false,
configFile: false,
compact: false}
```

- 바벨과 웹팩을 연결해준다
  babel과 webpack을 사용해 자바스크립트 파일을 컴파일한다.

### babel-preset-env

- 최신 JavaScript를 사용가능하게 해준다
- 자바스크립트 파일을 babel preset/plugin과 webpack을 사용하여 es5로 컴파일 해주는 plugin
- es6 뿐 아니라 브라우저에 따라 알아서 컴파일 해줌
- ES2015, ES2016, ES2017 버전을 지정하지 않아도 바벨이 자동으로 탐지해 컴파일한다.
- [참고](https://velog.io/@pop8682/%EB%B2%88%EC%97%AD-%EC%99%9C-babel-preset%EC%9D%B4-%ED%95%84%EC%9A%94%ED%95%98%EA%B3%A0-%EC%99%9C-%ED%95%84%EC%9A%94%ED%95%9C%EA%B0%80-yhk03drm7q)

### babel-preset-react

- jsx -> javascript로 바꿔줌

html-webpack-plugin: 생성된 .html파일과 .favicon파일을 번들링과정에 포함시키는 플러그인 이다
webpack: 모듈 번들러(Module bundler)
webpack-cli: Webpack 4.0.1 이상에서 필요한 커맨드라인 인터페이스다.
webpack-dev-server: 애플리케이션 개발 서버를 제공한다.

---

# Plug-in

## OptimizeCSSAssetsPlugin

## ForkTsCheckerWebpackPlugin

## WorkboxWebpackPlugin.GenerateSW

## webpack.IgnorePlugin

## webpack.DefinePlugin

## InterpolateHtmlPlugin

## InlineChunkHtmlPlugin

## split-chunks-plugin

## ExtractCSS

- 추출을 해서 새로운 styles.css파일을 만든다

## CleanWebpackPlugin

- build시 마다 dist 청소해주기

## DefinePlugin

- 빌드 타임에 결정되는 환경 변수를 어플리케이션에 주입하기 위함.
  빈 객체를 넘겨도 process.env.NODE_ENV는 웹팩의 mode로 들어감.

## UglifyJsPlugin

## HtmlWebpackPlugin

- index.html 구성해주기 + favicon도 넣어보자
- index.html을 자동으로 생성한다.
- template을 지정할 수 있다.

## MiniCssExtractPlugin

css를 별도의 파일로 추출해줌 (style-loader 는 head태그 안 style로 넣어줌…)

- 스타일시트를 js에서 분리하여 파일을 작성한다.
- 빌드된 js파일에서 css파일만 떼어내주는 플러그인. 파일이 커지는 걸 방지해주고 효율적인 관리를 도와줍니다.

---

# Webpack dev server

## Hot Module Replace

## classnames package

```js
classNames("foo", "bar"); // => 'foo bar'
classNames("foo", { bar: true }); // => 'foo bar'
classNames({ "foo-bar": true }); // => 'foo-bar'
classNames({ "foo-bar": false }); // => ''
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'
classNames(["foo", "bar"]); // => 'foo bar'

// 동시에 여러개의 타입으로 받아올 수 도 있습니다.
classNames("foo", { bar: true, duck: false }, "baz", { quux: true }); // => 'foo bar baz quux'

// false, null, 0, undefined 는 무시됩니다.
classNames(null, false, "bar", undefined, 0, 1, { baz: null }, ""); // => 'bar 1'
```

## ref

- [참고](https://velog.io/@lllen/Webpack-z1tdfqep)
- [웹팩 핸드북](https://joshua1988.github.io/webpack-guide/devtools/source-map.html)
- [보일러플레이트 만들기](https://p-iknow.netlify.app/front-end/react-webpack-config)
