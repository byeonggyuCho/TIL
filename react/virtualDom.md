# Virtual DOM

## intro
가상돔은 사용자 인터렉션이 활발하여 리페인트, 리플로 과정이 빈번하게 일어나는 애플리케이션에서 랜더링 최적화를 위해 리액트나 뷰같은 spa 프레임워크에서 도입한 개념이다.  
개발자는 직접 Dom을 수정하는 대신에 가상돔을 한다.  
리액트는 가상돔의 변화가 종합된 최종 상태를 실제 DOM에 한번에 반영하여 리플로와 리페인트를 최소화해서 렌더링 횟수를 줄인다.


## 가상돔은 어떻게 랜더링 횟수를 줄여주나?
간단한 예로 가상돔의 동작을 설명해 보겠다.

```html
<!DOCTYPE html>
<html>
  <head> </head>
  <body>
    <div id="root">
      <ul class="list">
        <li>apple</li>
        <li>banana</li>
        <li>mango</li>
      </ul>
    </div>
  </body>
</html>
```
여기서 li노드의 택스트노드를 다음과 같이 수정할 것이다.

```html
<!DOCTYPE html>
<html>
  <head> </head>
  <body>
    <div id="root">
      <ul class="list">
        <li>red apple</li>
        <li>yellow banana</li>
        <li>yellow mango</li>
      </ul>
    </div>
  </body>
</html>
```

우선 DOM api를 통해 직접 수정을 해보겠다. 
```js
const root = document.querySelector('#root')
const liTags = root.querySelectorAll('li')

// 화면 렌더링 발생 1
liTags[0].textContent = 'red apple'

// 화면 렌더링 발생 2
liTags[1].textContent = 'yellow banana'

// 화면 렌더링 발생 3
liTags[2].textContent = 'yellow mango'
```
이 코드에서는 각각의 텍스트 노드를 수정할때 마다 리페인트가 발생한다.  

이제 가상돔을 이용한 적업을 비교해보자.
```js
const root = document.querySelector('#root')
const virtualDOM = document.createElement('ul')
virtualDOM.classList.add('list')

const appleLI = document.createElement('li')
appleLI.textContent = 'red apple'

const bananaLI = document.createElement('li')
bananaLI.textContent = 'yellow banana'

const mangoLI = document.createElement('li')
mangoLI.textContent = 'yellow mango'

virtualDOM.appendChild(appleLI)
virtualDOM.appendChild(bananaLI)
virtualDOM.appendChild(mangoLI)

// 이 때 한번 뷰가 다시 렌더링 되어 진다.
root.replaceChild(virtualDOM, root.querySelector('ul'))s
```
가상돔의 핵심 컨셉은 수정이 발생한 돔을 지워버리고 새로 생성한다는 것에 있다.  
즉 일일이 수정해서 리페인트를 반복하느니 수정이 발생한 노드를 날려버리고 새로 생성한다는 것이다.  
위 예에서는 단 한번의 렌더링이 발생한다.  
가상돔은 개발자가 직접 랜더링 횟수를 고려하여 최적화하는 수고를 덜어준다.


## Reconciliation
Virtual DOM을 만든 후 Virtual DOM을 갱신할 때 Reconciliation 작업을 한다. Reconciliation 작업은 Virtual DOM과 DOM을 비교해 DOM을 갱신하는 작업이다. Virtual DOM을 갱신하는 방법은 2가지이고 갱신하는 유형도 2가지다.




## ref
- [실제 돔과 가상돔이 얼마차 차이나나](https://www.youtube.com/watch?v=BYbgopx44vo)
- [가상돔을 이해하기 위한 브라우저 랜더링의 이해](https://bscnote.tistory.com/72)
- [가상돔은 어떻게 렌더링횟수를 줄여줄까](https://paduckk-blog.netlify.com/development/%EC%99%9C%20Virtual%20DOM%EC%9D%80%20%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%20%EB%A0%8C%EB%8D%94%EB%A7%81%20%ED%9A%9F%EC%88%98%EB%A5%BC%20%EC%A4%84%EC%97%AC%EC%A3%BC%EB%8A%94%EA%B0%80/)
- [리액트 동작원리](https://d2.naver.com/helloworld/9297403)
- [React 작동 방법](https://d2.naver.com/helloworld/9297403#ch1-2-2)
- [setState가 리액트(React)의 미래이다](https://-www.vobour.com/%ED%95%A8%EC%88%98%ED%98%95-setstate%EA%B0%80-%EB%A6%AC%EC%95%A1%ED%8A%B8-react-%EC%9D%98-%EB%AF%B8%EB%9E%98%EC%9D%B4%EB%8B%A4-functiona)
- [how-to-write-your-own-virtual-dom](https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060)