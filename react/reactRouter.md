# router

## Info
클라이언트 사이드 라우팅에 대해서 다뤄보겠습니다. SPA구조에서 페이지를 나누기 위한 개념이라고 보시면 될것 같습니다.
SPA에서는 어플리케이션 초기로딩시 앱을 브라우저에 띄운뒤 부분적인 렌더링작업만 합니다. 이런 구조에서 페이지를 나누기 위해서 내부에 프레임을 나누는 전략을 사용하고 각각의 프레임을 라우터로 나누는것이죠. 리액트_라우터에서는 클라이언트 라우터에서 파라미터를 전달하는 방법과 페이지는 관리하는 방법, 서버_라우터와 충돌을 막기 위한 방법을 다룹니다.

다른 주소에 따라 다른 뷰를 보여주는 것을 라우팅이라고 합니다. 


    서버사이드 라우터와 경로가 중복되지는 않을까? 링크를 주소창에 입력하면 서버라우트를 타게 된다. 그러면 서버쪽에서 리액트 앱으로 연결시켜줘야한다. 실제 서버에서는 우리가 설정한 리액트_라우터가 요청됐을때 리액트 앱이 보이는 페이지를 연결하거나, 
    서버_라우트를 제외함 모든 요청을 리액트 앱으로 연결하는 작업을 해야한다. 그렇지 않으면 서버_라우트를 요청하게 되면서 엉뚱한 페이지로 이동하거나 404 Not Found에러가 뜨게된다.

예제를 만들기 위해 컴포넌트를 만들어보겠습니다.

### App.js
```js
import React, { Component } from 'react';

class App extends Component {
    render() {
        return (
            <div>
                Hello React-Router
            </div>
        );
    }
}

export default App;
```


### Root.js
```js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from 'shared/App';

const Root = () => (
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);

export default Root;


```

### index.js
```js
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './client/Root';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
```


### Home.js
```js
import React from 'react';

const Home = () => {
    return (
        <div>
            <h2>
                홈
            </h2>
        </div>
    );
};

export default Home;

```

### About.js
```js
import React from 'react';

const About = () => {
    return (
        <div>
            <h2>About</h2>
        </div>
    );
};

export default About;
```


### src/pages/index.js
```js
export { default as Home } from './Home';
export { default as About } from './About';
```


### src/shared/App.js

```js
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, About } from 'pages';


class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
            </div>
        );
    }
}

export default App;
```

### Ref
- [리액트 라우터](https://velopert.com/3417)