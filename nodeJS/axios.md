# Axios

## intro
비동기 호출을 위한 라이브러리.  
fetch와 비슷해보이는데 Axios의 장점은 무엇을까???  


## Axios
- promise를 기반으로 하여 async/awaite문법을 조합하면 쉽게 XHR 요청을 보낼 수 있다.
- 구형브라우저에서 지원함.
- timeout 설정을 할 수 있다.
- CSRF 보호기능이 내장되어있다.
- JSON데이터 자동변환
- 취소 요청
- 요청/응답 차단(Intercept)
- catch에 걸렸을 때, .then을 실행하지 않고, console창에 해당 에러 로그를 보여준다.

## Fetch
1. 잦은 업데이트로 인한 라이브러리 호환성에서 자유로움
2. timeout기능을 구현할 수 없다. 
    - 계속 기다려야함
3. 지원하지 않는 브라우저가있다.
4. promise기반
5. Error핸들링에 문제가 있다.
    - catch에 걸렸을 때 .then절이 실행된다.


## 코드비교
```js
let url = 'https://someurl.com';
let options = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                property_one: value_one,
                property_two: value_two
            })
        };
let response = await fetch(url, options);
let responseOK = response && response.ok;
if (responseOK) {
    let data = await response.json();
    // do something with data
}
```


```js
let url = 'https://someurl.com';
let options = {
            method: 'POST',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                property_one: value_one,
                property_two: value_two
            }
        };
let response = await axios(options);
let responseOK = response && response.status === 200 && response.statusText === 'OK';
if (responseOK) {
    let data = await response.data;
    // do something with data
}
```
언뜻 보기에 비슷해보인다.

## 요청취소 시나리오
이전 페이지에서 요청한 데이터가 다음페이지로 넘어갔는데 응답이 오지 않는다면 어떻게 될까?  
일반적으로 웹 브라우저에서 동시에 요청할 수 있는 수는 6개 정도로 제한된다. 떄문에 이는 사용자 경험 저하로 이어진다.  
이 문제는 서버 응답속도를 개선하는것, 요청을 취소하는 방법으로 개선할 수 있다.  
그런데  fetch API에서는 취소요청을 할 수 없다...
Axios에서 취소를 어떻게 하나 알아보자.  

프로미스에서는 요청상태를 취소하는 마땅한 방법이 없다.
그럼 실제 Axios에서는 어떤 방법으로 요청을 취소할까  
현재 공식적으로 promise에서 제공하는 요청 취소방법이 없다.  
과거 취소가능한 프로미스(cancelable-promise)에 대한 자바스크립트 기술위원회(TC39)에 명세에 추가 [제안](https://github.com/tc39/proposal-cancelable-promises)을 했으나 철회되었다.  
axios는 이 철회된 방식을 기반으로 취소가능한 프로미스를 제공한다.  
[참고](https://ahnheejong.name/articles/ecmascript-tc39/)





## 참고 기술
- [tasks](https://github.com/rpominov/fun-task)
- [superagent]()
- [observable]()
- [ Speculation](https://github.com/ericelliott/speculation)


## REF
- [axios guide](https://yamoo9.github.io/axios/guide/cancellation.html)
- [내가 fetch대신 axios를 선택한 이유](https://medium.com/little-big-programming/%EB%82%B4%EA%B0%80-fetch-api%EB%A5%BC-%EC%93%B0%EC%A7%80-%EB%AA%BB%ED%96%88%EB%8D%98-%EC%9D%B4%EC%9C%A0-3c23f0ec6b82)
- [What-is-a-Promise](https://velog.io/@cadenzah/What-is-a-Promise)
- [비동기요청 취소하기](https://falsy.me/%EB%B9%84%EB%8F%99%EA%B8%B0-%EC%9A%94%EC%B2%AD-%EC%B7%A8%EC%86%8C%ED%95%98%EA%B8%B0-%EA%B7%B8%EB%A6%AC%EA%B3%A0-abortcontroller/)
- [axios Tutorial](https://velog.io/@rohkorea86/%EB%B9%84%EB%8F%99%EA%B8%B0-%EB%B9%84%EB%8F%99%EA%B8%B0%EC%97%90-%EB%8C%80%ED%95%B4%EC%84%9C-%EC%B0%A8%EA%B7%BC%EC%B0%A8%EA%B7%BC-%EB%8B%A4%EB%A3%A8%EB%A0%A4%EA%B3%A0-%ED%95%A9%EB%8B%88%EB%8B%A4)