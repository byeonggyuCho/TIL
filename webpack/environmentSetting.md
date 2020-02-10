# Environment Setting Guide

## intro
webpack4를 이용한 개발환경 셋팅  
이 포스팅은 [프론트엔드 개발환경 만들기](https://meetup.toast.com/posts/153)을 거의 그대로 정리한 것이며 
추후에 알게된 내용을 덫붙여 수정하기 위해 작성된 포스팅임을 밝힙니다. ₩₩



## 기본 환경 셋팅.
### src/index.js
```js
import sayHello from './sayHello';
console.log(sayHello());
```

### src/sayhello.js
```js
export default function sayHello() {
    return 'HELLO WEBPACK4'
}
```

```
npx webpack --mode development
```
`npx`는 현재 프로젝트에 설치된 디펜던시를 path를 잡아 놓은 것처럼 바로사용할 수 있게 해주는 명령이다  
npm엥 포함되어있다. mode 옵션을 `development`로 해주었다.  
명령어를 수행하면 dist폴더에 main.js가 번들링된다.  


### mode를 이용한 webpack.config.js
기본 설정값을 수정하기 위해서 `webpack.config.js`파일에 커스텀 설정을 해야한다.  

```js
const path = require('path');

module.export = {
    entry: {
        app: ['./src/index.js']
    },
    output: {
        filename: '[name].bundle.js'
        path: path.resolve(__dirname, 'dist')
    }
}
```
커스텀 설정으로 달라진 부분은 번들링 파일의 이름이 `app.bundle.js`로 바뀐것 뿐이다.  
위 설정은 커맨드라인 명령에 `--mode`옵션을 반드시 넘겨야한다. 빌드에 따라 개별적인 설정파일을 작성할 수도 있는데 이 경우에는 
개별 설정 파일에 mode옵션을 추가해야한다.  
```js
// webpack.config.dev.js

module.exports = {
    mode: 'development' // production 설정일 경우 'production'
}
```
이렇게 모드를 설정하면 커맨드라인에 `--mode`옵션을 추가하지 않아도 된다.  
설정파일을 생성후 이 설정을 참고하기 위해선 `--config`옵셔을 추가해야한다.  
```
npx webpack --config webpack.config.div.js
```

한개의 설정파일에서 옵션값에 따라 mode를 분기처리할 수 도 있다. 
```js
module.exports = (env, options) => {
    const config = {
        entry: {
            app: ['./src.index.js']
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist')
        }
    }

    if(option.mode === 'development'){

    }else{

    }
    return config;
}
```


## Productions 빌드 설정
웹팩4부터는 `UglifyWebpackPlugin`이 내장되어 따로 설치할 필요가 없다.  
이 예제에서느 빌드마다 dist 폴도를 지워주는 플러그인을 추가했다.  
```
npm i --save-dev clean-webpack-plugin
```
플러그 인을 설치한 뒤 설정파일에 간단한 설정을 추가하며 된다.
```js

const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = (env, option) => {

    if(option.mode === 'development'){

    }else{
        config.plugins = [
            new CleanWebpackPlugin(['dist'])
        ]
    }

    return config;
}
```

## Development 설정 
development 모드에는 개발 서버 설정해야한다.  
`webpack-dev-server`를 위한 설정을 하고 `htmlWebpackPlugin`으로 서버를 띄울떄 마다 임시의 `index.html`파일을 만들어 사용한다.  
Hot Module Replacement(HMR)설정도 가능한데 이 기능은 코드에 변경이 생겨 다시 빌드할 때마다 매번 브라우저를 리로드할 필요 없이 변경된 모듈만 바로 교체하는 기능이다. 이외에는 소스맵 설정이 필요하다.  
우선 `htmlWebpackPlugin`과 `webpack-dev-server`를 설치한다.  
```
npm i --save-dev html-webpack-plugin webpack-dev-server
```

```js
const webpack = requirs('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, options) => {

    if(optoin.mode === 'development') {
        config.plugins = [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                titile: 'Development',
                showErrors: true // 에러 발생시 메세지가 브라우저에 노출된다. 
            })
        ];

        config.devtool = 'inline-source-map';

        config.devSever = {
            hot: true,      // 서버에서 HMR을 켠다.
            host: '0.0.0.0' // 기본값은 'localhost'이다. 외부에서 개발서버에 접속하기 위해서는 '0.0.0.0'으로 설정해야한다. 
            contentBase: './dist',
            stats: {
                color: true
            }
        }
    }else {
        // product config
    }

    return config;
}

```

## split Chunks
기존에 `CommonsChunkPlugin`을 이용해서 번들링했던 기능을 `splitChunk`옵션을 통해 할 수 있게 되었다.  
이 기능을 이용하면 대형프로젝트에서 거대한 번들 파일을 적절히 분리하고 나눌 수 있다. 파일 사이즈, 비동기 요청 횟수 등의 옵션에 따라 자동으로 분리할 수 도 있고 정규식에 따라서 특정 파일들만 분리할 수 있고 특정 엔트리 포인트를 분리할 수 있다.  번들파일을 분리하면 캐시를 활용하여 초기 로딩속도를 최적화 할 수 있다.  

```js
module.exports = (env, options) => {
    const config ={


        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        optimization: {
            slitChunks: {
                cacheGroups:{
                    commons:{
                        test: /[\\/]node_module[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        }
    }
}
```
`cachGroups`는 명시적으로 특정 파일들을 청크로 분리할 때 사용한다.  여기서는 common이란 청크를 분리한다.  
각 속성을 살펴보자.  
`test`를 사용해 대상이 되는 파일을정규식으로 잡는다. 여기서는 `node_module`폴더에 있는 파일이다.  
`name`속성은 청크로 분리할 때 이름으로 사용될 파일명이다.  위 설정대로 번들링을 하면 
`output.filename`의 `[name]`이 대치되어 `vendors.bundle.js`가 된다.  
`chunk`옵션은 모듈의 종류에 따라 청크에 포함할지 말지를결정하는 옵션이다. `initial`과 `async`, `all`이 있다.  
여기서 사용된 `all`은 `test`옵션의 조건에 해당하는 모든 것을 분리하겠다는 뜻이다. 
`initial`을 초기 로딩이 필요한 경우, `async`는 `import()`를 이용해 다이나믹하게 사용되는 경우에 분리한다.  

분리된 파일들은 서버가 열리면 `HtmlWebpackPlugin`이 알아서 index.html에 주입해준다. 


## package.json에 scirpt추가하기. 
package.json에 script옵ㅈ션을 추가해서 웹팩을 쉽게 실행해보자.

```json
"main": "index.js",
"scripts": {
    "build-dev": "webpack --mode development",
    "build": "webpack --mode production",
    "dev": "webpack-dev-server --open --mode development"
}
```
이제 터미널에서 `npm run dev`를 입력하면 웹팩 개발서버거 실행되고 `--open`옵션으로 서버가 뜨면 자동으로 브라우저가 열리면서 서버에 접속까지 해준다. 
빌드를 할 때는 각각 상황에 맞게 `npm run build`와 `npm run build-dev`를 실행하면 된다.


## ref
- [프론트엔드 개발환경 만들기](https://meetup.toast.com/posts/153)
- [Development 환경 구성](https://brightparagon.wordpress.com/2018/06/27/webpack-v4-development-configuration/)