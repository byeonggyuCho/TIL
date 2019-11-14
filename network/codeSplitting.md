# Code-Splitting


## Info 

번들링.
SPA의 단점은 앱의 규모가 커지면서 자바스크립트 파일 사이즈가 너무 커진다는 것입니다. 유저가 실제로 방문하지 않을수도 있는 페이지에 관련된 렌더링 관련 스크립트도 불러오기 때문이죠.


Code-Splitting을 얘기하기 앞서 Bundling에 대해서 먼저 얘기해야합니다.  
번들링은 웹페이지를 띄우는데 필요한 리소스만 요청하기 위해서 필요한 리소스를 웹페이지 병합하는 프로세스입니다.
`A.html`을 띄우기 위해서 `common.js`와 `jQery-core.js`를 사용해야 할때, 각 js모듈에서 필요한 부분을 `A.html`에 병합하는 식입니다.

예를 하나 들어보죠.


```js
// math.js
exprot function add(a, b) {
    return a + b;
}
```


```js
// app.js
improt { add } from './math.js';

console.log( add(16, 26))   //42
```
app.js를 띄우기 위해선 `math.js`의 add 함수를 사용합니다. 번들링이 되지 않은 애플리케이션에서는 
`add()`함수 하나를 사용하기 위해 `math.js`를 모두 다운받아야하기 때문에 로딩이 느리죠.

이 문제를 번들링을 통해 다음과 같이 해결할 수 있습니다.


```js
function add(a, b) {
  return a + b;
}

console.log(add(16, 26)); // 42
```
그 페이지에서 사용하는 리소스를 페이지에 병합하여 필요한 것만 다운받겠다는 전략입니다. 굉장히 합리적이네요!


코드스플리팅
SPA의 단점은 자바스크립트번들 파일에 어플리케이션에 대한 모든 로직을 불러와서 규모가 커지면 용량이 커지기 때문에 로딩속도가 지연될 수 있다는 것입니다. 코드 스플리팅의 원리는 한개의 파일에서 
## Code Splitting
code splitting을 하면 사용자가 현재 필요로 하는것만 `lazy-laod`할 수 있으므로 앱의 성능을 크게 향상시킬 수 있스빈다. 앱의 전체 코드 양을 줄이지는 않지만 사용자가 필요로하지 않는 코드를 로드하는 것을 피하고, 초기 페이지 로드시 필요한 코드만 받게 됩니다.  

code splitting은 번들링을 할 때 큰 번들이 생기는걸 방지할 수 있습니다. 


## How To Code Splliting

### import()
어플리케이션에서 `code splliting`을 도입하는 가장 좋은 방법은 동적으로 `import()`구문을 이용하는 것입니다.

#### before
```js
import { add } from './math';

console.log(add(16, 26));
```


#### after
```js
import("./math").then(math => {
  console.log(math.add(16, 26));
});
```

## Ref
- [velopert](https://velopert.com/3421)
- [code spliting](https://reactjs.org/docs/code-splitting.html)
- [web Pack Guide](https://webpack.js.org/guides/code-splitting/)