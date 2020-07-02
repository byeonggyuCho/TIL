# key property


## TL;DR
- key를 부여하면 변경사항을 빠르게 파악할 수 있다.
- key가 없으면 배열 요소에서 DOM변경사항을 일일이 비교해야한다. 
- 기본값은 인덱스로 부여된다.
- 형제요소 사이에서만 유일하면 된다.

## intro

    key는 엘리먼트의 배열을 만들 때 포함해야 하는 특별한 문자열입니다. 
    key는 React가 어떤 항목을 변경, 추가 혹은 삭제할지 식별하는 것을 돕습니다. 
    엘리먼트들을 안정적으로 식별할 수 있도록 배열 내의 엘리먼트에 key를 제공해야 합니다.

    Key는 같은 배열에 포함된 다른 요소 사이에서만 고윳값을 가지면 됩니다. 
    전체 애플리케이션 또는 단일 컴포넌트 전체에서 고윳값을 가질 필요는 없습니다.
출처: 리액트 공식페이지

리액트에서 props와 state가 변하면 UI를 갱신한다.  
갱신을 하기 위해 이전 화면과 비교해야한다.  
이때 key는 개발자가 여러 렌더링 사이에서 어떤 자식 엘리먼트가 변경되지 않아야 할지 표시해줄 수 있는 방법이다.  
즉 key를 부여하면 불필요한 DOM과 인스턴스의 재생성을 막을 수 있다.



## 왜 Key를 부여해야할까?
Key는 React가 어떤 항목을 변경, 추가 또는 삭제할지 식별하는 것을 돕습니다.  
반대로 얘기하면 Key가 없으면 React가 어떤 항목을 변경할지 확인하기 위해서 불필요한 작업을 하게 됨을 의미합니다.  
그렇게 때문에 Key는 형제요소에서 고유 식별키를 Key로 사용하는것이 가장 좋습니다.  


## index를 key로 부여하면 안되는 이유
만일 요소의 순서가 바뀐다면 어떻게 될까?

### 1.성능저하
```html
<!-- Before-->
<ul>
  <li key="0">Duke</li>
  <li key="1">Villanova</li>
</ul>

<!-- After-->
<ul>
  <li key="0">Connecticut</li>
  <li key="1">Duke</li>
  <li key="2">Villanova</li>
</ul>
```
인덱스를 key로 사용할 때 요소의 순서가 바뀌면 변함이 없는 요소의 key가 변하게 된다.  
이 경우 렌더링에 비효율이 생김

### 2.state유실
리액트는 컴포넌트를 리랜더링한뒤 이전 state를 index를 기준으로 매핑을 하게 된다.  
이때 index의 순서가 뒤틀리면 state가 유실될 수 있는 상황이 생긴다.  
예를 들어 아래의 예제에서 철수의 데이터가 영희에게 밀릴 수 있다.


```jsx
import React, {useEffect, useState} from 'react';

const Example = () => {
    
    const [list, setList] = useState([
        {name: '철수'},
        {name: '영희'},
        {name: '민수'},
    ])

    const addItem = () => {
        setList([{name: '정국'}, ...list]);
    }

    const delItem = () => {
        setList(list.filter(l => l.name != "철수"));
    }

    return (
        <>
            {/* 추가 버튼과 삭제 버튼*/}
            <input type="button" value="추가" onClick={addItem} />
            <input type="button" value="삭제" onClick={delItem} />

            <h2> Show Problem Example</h2>
            {list.map((v, index) => 
                /*  div 태그의 key로 배열의 index 사용*/
                <div key={index}> {v.name}, idx: {index} <input type="text" /> </div> 
            )}
        </>
    )
}

```



## Ex 

```jsx
const articleList = articles.map(article => (
	<Article
		title={article.title}
		writer={article.writer}
		key={article.id}
	>)
})
```



## REF
- [index를 key로 사용하는것이 안티패턴인 이유](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318)
- [index를 key에 매핑하면 안되는이유-kor](https://medium.com/sjk5766/react-%EB%B0%B0%EC%97%B4%EC%9D%98-index%EB%A5%BC-key%EB%A1%9C-%EC%93%B0%EB%A9%B4-%EC%95%88%EB%90%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-3ce48b3a18fb)