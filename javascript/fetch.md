
# Fetch API 
웹은 어떤 리소스를 비동기적으로 요청하기 위해서 XHR객체를 사용했다.
그러나 XHR은 요청의 상태나 변경을 구독하려면 이벤트를 등록해서 변경사항을 받아야했고
요청의 성공이나 실패 여부나 상태에 따라서 처리하는 로직이 들어가기 불편했다.
이를 보안하기위해 Fetch API를 도입하였는데 이는 HTTP요청에 최적화 도어 있고 상태도 잘 추상화 되어있다.
Promise를 기반으로 하기때문에 상태에 따른 로직을 추가하고 처리하기 간편한다.
- Headers, Request, Response같은 객체를 직접 다룰 수 있다.

```js
fetch('http://myStie.me/users')
.then(res => res.json())
.then(data => data.filter(item => item.isRequired));
```



#### ref
- https://www.zerocho.com/category/HTML&DOM/post/595b4bc97cafe885540c0c1c
- https://medium.com/@kkak10/javascript-fetch-api-e26bfeaad9b6