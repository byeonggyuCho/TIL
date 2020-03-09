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
Virtual DOM을 만든 후 Virtual DOM을 갱신할 때 Reconciliation 작업을 한다. Reconciliation 작업은 Virtual DOM과 DOM을 비교해 DOM을 갱신하는 작업이다.
 Virtual DOM을 갱신하는 방법은 2가지이고 갱신하는 유형도 2가지다.

### 비교알고리즘

#### 다른 타입
```jsx
<div>
  <Counter />
</div>

<span>
  <Counter />
</span>
```
위처럼 div가 span으로 바뀐것처럼 타입이 달라진 경우입니다.  
루트 엘리먼트가 다른 타입을 가질때마다 리액트는 오래된 트리를 해체하고 새로운 트리를 처음부터 빌드합니다.  
트리를 해체할 때 이전 돔 노드는 제거되고 새롭게 생성된 돔 노드로 대체됩니다.  

이때 이전 컴포넌트 인스턴스는 `componentWillUnmount`가 실행되고 새롭게 생성된 컴포넌트 인스턴스는 `componentWillMount`와 `componentDidMount`가 순차적으로 실행되며 이전 트리의 state는 손실됩니다.


#### 같은 타입 돔 엘리먼트
타입은 같으나 속성이 달리진 경우 입니다.  
이 경우 기존 돔 노드가 유지되고 변경된 속성만 업데이트합니다. 
```jsx
<div className="before" title="stuff" />

<div className="after" title="stuff" />
```
위 예제에서는 두 엘리먼트를 비교하여 리액트는 돔 노드에서 className만 합니다. 



#### 같은 타입의 컴포넌트 엘리먼트
컴포넌트가 업데아트될 때 인스턴스가 동일하게 유지되면 렌더링간 state가 유지된다.  
리액트는 컴포넌트 인스턴스의 prop를 업데이트하고 `componentWillReceiveProps`와 `componentWillUpdate`를 호출합니다.  
다음으로 `render`가 호출됩니다.


#### 자식에서 반복
기본적으로 돔 노드의 자식에 대해 반복할 때 리액트는 동시에 두 자식 목록을 반복하여 실행하고 차이가 있을때 변형을 생성합니다.  


두번째 li노드인 second까지 동일하고 세번째 li노드가 추가된 상황입니다.  
자식의 끝에 엘리먼트를 추가하는 것은 잘 동작합니다.
```html
<ul>
  <li>first</li>
  <li>second</li>
</ul>

<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
```
이 경우 두번째 li노드는 유지되며 새롭게 추가된 li노드만 생성되어 추가됩니다.  

하지만 첫번째 위치에 li노드를 추가하는 경우 다르게 동작합니다.  
```html
<ul>
  <li>Duke</li>
  <li>Villanova</li>
</ul>

<ul>
  <li>Connecticut</li>
  <li>Duke</li>
  <li>Villanova</li>
</ul>
```
이 경우처럼 첫번째 자식 노드가 변경된 경우 모든 하위 엘리먼트가 리 랜더링됩니다.
Duke, Villanova를 그대로 유지할 수 있음을 알지 못합니다.  


#### keys
앞서 소개한 이슈를 해결하기 위한 속성이 key입니다.  
이 속성은 자식 노드의 변경이 생겨 비교를 하는 상황에 이용됩니다. 위 예제에 적용하여 설명하겠습니다.  
```js
<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>

<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
```
이렇게 되면 리액트는 key를 통해서 Duke, Villanova는 기존에 있는 엘리먼트이고 Connecticut가 새로 생긴 엘리먼트라는걸 알 수 있습니다.  




## ref
- [reconciliation](https://reactjs-kr.firebaseapp.com/docs/reconciliation.html)
- [실제 돔과 가상돔이 얼마차 차이나나](https://www.youtube.com/watch?v=BYbgopx44vo)
- [가상돔을 이해하기 위한 브라우저 랜더링의 이해](https://bscnote.tistory.com/72)
- [가상돔은 어떻게 렌더링횟수를 줄여줄까](https://paduckk-blog.netlify.com/development/%EC%99%9C%20Virtual%20DOM%EC%9D%80%20%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%20%EB%A0%8C%EB%8D%94%EB%A7%81%20%ED%9A%9F%EC%88%98%EB%A5%BC%20%EC%A4%84%EC%97%AC%EC%A3%BC%EB%8A%94%EA%B0%80/)
- [리액트 동작원리](https://d2.naver.com/helloworld/9297403)
- [React 작동 방법](https://d2.naver.com/helloworld/9297403#ch1-2-2)
- [setState가 리액트(React)의 미래이다](https://-www.vobour.com/%ED%95%A8%EC%88%98%ED%98%95-setstate%EA%B0%80-%EB%A6%AC%EC%95%A1%ED%8A%B8-react-%EC%9D%98-%EB%AF%B8%EB%9E%98%EC%9D%B4%EB%8B%A4-functiona)
- [how-to-write-your-own-virtual-dom](https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060)