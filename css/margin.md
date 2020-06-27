# margin
	 요소의 외부 여백을 지정한다.  


## 속성값
| 값 | 의미 | 기본값 |
|------|:----:|:-------: |
| `단위`| `px`, `em`, `cm`등 단위로 지정		|  `0` |
| `auto`| 브라우저 너비를 계산					| 1024px 이하 |
| `%`   | 부모 요소의 너비에 대한 비율로 지정	| 768px 이하 |

```
margin: 위 우 아래 좌;
margin: 위 [좌, 우] 좌;
margin: [위, 아래] [좌, 우];
margin: [위, 아래, 좌, 우];
```


```html
<div class="parent">
	<div class="child"></div>
</div>
```
```css
.parent {
	width: 400px;
	height: 200px;
	border: 4px solid red;
	display:relative;
}

.child {
	width: 100px;
	height: 100px;
	border: 4px solid;
	margin: 50%
}
```

- %를 margin값을 입력할 경우 부모요소의 가로너비가 %의 기준이 된다. 




## margin 중복 (곂쳐짐)
- 형제 요소의 위아래는 중복됨
	-> 절대값이 더 큰 쪽으로 결정된다.
	-> 30px과 10px은 30px
	-> -30px 과 -10px은 -30px
	-> 양수와 음수는 더한다.
		-> -30px 10px는 -20px가 된다.
- 부모 자식의 같은 방향은 중복됨.
	-> 자식에 선언했는데 부모에 적용된다.
	->
- 형제 요소들의 margin-top과 margin-bottom이 만났을 때
- 부모 요소의 margin-top과 자식 요소의 margin-top이 만났을 때
- 부모 요소의 margin-bottom과 자식요소의 margin-bottom이 만났을때