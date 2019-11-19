# Client Side Routing

## Info
CSR은 브라우저에서 이뤄지나.


## How 

1. 서버사이드 라우팅을 막아야한다.
    - 특정 URL 패턴에 대해서 페이지 리로딩이 되지 않아야한다.
2. 브라우저에서 history stack이 변화한 것을 감지해야한다.
3. 라우터별 기능을 정의한다.
    - 상품의 구분을 어떻게 할것인가?
    - 상품코드가 URL에 노출된다. (worflow.do/p001/01)



```js
window.onpageshow = function (event) {
    if (event.persisted) {
    	// 뒤로가기로 페이지 로드 시
        console.log(event.persited);
    }
    else {
    	// 새로운 페이지 로드 시
    }
}
```

### Ref
- [What is differences between server side Routing and client Routing](https://www.codementor.io/chinemeremnwoga/server-side-routing-vs-client-side-routing-yne57eq9a)
https://www.slideshare.net/frontenders-valtech/accessible-client-side-routing-nick-colley