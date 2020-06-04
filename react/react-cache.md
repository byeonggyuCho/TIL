# react-cache

## TODO

## intro
react-cache는 React 앱을 위한 기본 캐시 모듈로, 보다 진보된 캐시 기능 구현체의 참조 대상으로도 사용될 수 있다.

다음은 react-cache를 사용하는 간략한 예제 코드이다. 
```jsx
// React Cache for simple data fetching (not final API)
import {unstable_createResource} from 'react-cache';

// Tell React Cache how to fetch your data
const TodoResource = unstable_createResource(fetchTodo);  
```