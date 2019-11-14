# HigherOrderComponent

## Info
컴포넌트도 함수처럼 재사용할 수 있다. 그런데 컴포넌트 기능 상에서도, 자주 반복되는 코드들이 나타날 수 있다.  
이런 코드들을 HOC를 만들어 해결할 수 있다. HOC는 하나으 ㅣ함수다. 함수를 통해 컴포넌트에 우리가 준비한 특정 기능을 부여한다. 


```js
import React, { Component } from 'react';
import axios from 'axios';

class Post extends Component {
  state = {
    data: null
  }
  
  async initialize() {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
      this.setState({
        data: response.data
      });
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.initialize();  
  }


  render() {
    const { data } = this.state;
    
    if (!data) return null;

    return (
      <div>
        { JSON.stringify(data) }    
      </div>
    );
  }
}


export default Post;
```


```js
import React, { Component } from 'react';
import axios from 'axios';

class Comments extends Component {
  state = {
    data: null
  }

  async initialize() {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/comments?postId=1');
      this.setState({
        data: response.data
      });
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.initialize();
  }


  render() {
    const { data } = this.state;

    if (!data) return null;

    return (
      <div>
        {JSON.stringify(data)}
      </div>
    );
  }
}


export default Comments;
```

위 두개의 컴포넌트는 데이터를 가지고오는 로직이 중복되어있습니다. 이 로직을 HOC로 공통소스로 분리하여 컴포넌트를 좀더 간결하게 만들 수 있습니다.
각 컴포넌트의 중복 로직을 추상화하여 HOC에 작성하는게 핵심입니다. 추상화를 잘 할 수록 HOC의 재사용성이 높아집니다. 
이제 HOC를 만들어 중보로직을 제거 해보겠습니다.

## HOC
HOC에는 명시적으로 구분하기 위해 이름에 `with`을 붙여 줍니다. HOC의 원리는 파라미터로 커포넌트를 받아오고 함수 내부에서 새 컴포넌트를 만든 다음 해당 컴포넌트 안에서 파라미터로 받아온 컴포넌트를 렌더링하는 것입니다. 받아온  `props`들을 그대로 파라미터로받아온 컴포넌트에게 다시 주입해주고 필요에 따라 추가 `props`도 넣어줍니다.


```js
import React, { Component } from 'react';

const withRequest = (url) => (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <WrappedComponent {...this.props}/>
      )
    }
  }
}

export default withRequest;

```
위 코드는 함수에서 다른 함수를 리턴하고 있습니다. 이렇게 함수를 반환하는 구조는 나중에 여러개의 HOC를 조합하여 사용할 수 있어 재사용성을 높히는 방법입니다.


```js
import React, { Component } from 'react';
import axios from 'axios';

const withRequest = (url) => (WrappedComponen) => {
  return class extends Component {

    state = {
      data: null
    }

    async initialize() {
      try {
        const response = await axios.get(url);
        this.setState({
          data: response.data
        });
      } catch (e) {
        console.log(e);
      }
    }

    componentDidMount() {
      this.initialize();
    }

    render() {
      const { data } = this.state;
      return (
        <WrappedComponent {...this.props} data={data}/>
      )
    }
  }
}

export default withRequest;
```


이제 `withReuest`를 사용하여 Post.js와 Common.js에 적용시켜보겠습니다.

```js
import React, { Component } from 'react';
import withRequest from './withRequest';

class Post extends Component {
  render() {
    const { data } = this.props;
    
    if (!data) return null;

    return (
      <div>
        { JSON.stringify(this.props.data) }    
      </div>
    );
  }
}


export default withRequest('https://jsonplaceholder.typicode.com/posts/1')(Post);
```


```js
import React, { Component } from 'react';
import withRequest from './withRequest';

class Comments extends Component {
  render() {
    const { data } = this.props;

    if (!data) return null;

    return (
      <div>
        {JSON.stringify(data)}
      </div>
    );
  }
}


export default withRequest('https://jsonplaceholder.typicode.com/comments?postId=1')(Comments);

```


## Ref
- [HOC](https://velopert.com/3537)