## style-loader

.css파일을 style태그로 만든뒤 head태그 안에 선언해주는

## url-loader

## node-sass

sass 를 css 파일로 컴파일 해준다

## MiniCssExtractPlugin

css를 별도의 파일로 추출해줌 (style-loader 는 head태그 안 style로 넣어줌…)

## style-loader

CSS를 `<style`> 태그로 출력한다.

## css-loader

자바스크립트 안에 CSS를 해석하고, 모든 의존성을 해결 합니다.

## ts-loader

react: 리액트
react-dom: 브라우저 DOM 메서드를 제공한다.
react-prop-types (React props 타입을 체크하기 위함)
react-hot-loader : dev-server 를 켜둔 상태에서수정사항이 생겼을 때 페이지 새로고침을 하지 않고 변경된 부분만 바꿔주도록 하는 lib
babel-core: Babel 핵심 의존성 라이브러리이다. Babel(바벨)은 자바스크립트 ES6를 ES5로 컴파일하여 현재 브라우저가 이해할 수 있도록 변환하는 도구다.
babel-loader: babel과 webpack을 사용해 자바스크립트 파일을 컴파일한다.
babel-preset-env: ES2015, ES2016, ES2017 버전을 지정하지 않아도 바벨이 자동으로 탐지해 컴파일한다.
babel-preset-react: 리액트를 사용한다는 것을 바벨에게 말해준다.
html-webpack-plugin: 생성된 .html파일과 .favicon파일을 번들링과정에 포함시키는 플러그인 이다
webpack: 모듈 번들러(Module bundler)
webpack-cli: Webpack 4.0.1 이상에서 필요한 커맨드라인 인터페이스다.
webpack-dev-server: 애플리케이션 개발 서버를 제공한다.
node-sass : sass 를 css 파일로 컴파일 해준다
style-loader: sass, css 파일을 <style> 태그로 만들어 html의 head 태그 내부에 선언해준다.
sass-loader: import/require()처럼 @import와 url() 해석한다.

## ref

- [웹팩 핸드북](https://joshua1988.github.io/webpack-guide/devtools/source-map.html)
- [보일러플레이트 만들기](https://p-iknow.netlify.app/front-end/react-webpack-config)
