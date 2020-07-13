## float

- 요소를 수평정렬하는 용도로 많이 사용한다.
- 최근에는 flex를 이용해서 많이 한다.
- clear 속성
- 공중에 뜨는게 문제다 그래서 곂친다. - 이때 clear을 해서 해제를 해서 사용해야한다.
- clear : both;를 쓰면 왼쪽이든 오른쪽이든 해제하기 때문에 쉽다.
- float소성이 적용된 요소의 주위로 다른 요소들이 흐르게 되는데 이를 방지하기 위해 속성을 해제해야한다.
- 좌우 배치할 때 쓴다.
- absolute나 fied된 요소는 float non처리된다는것에 유의한다.


## 속성
1. none: 띄우지 않음
2. left: 왼쪽으로 띄움
3. right: 오른쪽으로 띄움

## float를 해제하는 방법 3가지

1. 형제 요소에 clear (left, right, both)를 추가하여 해제

- float속성이 추가된 요소의 다음 형제 요소에 clear속성 추가.

2. 부모요소에 overflow: (hidden,auto) 추가하여 해제 (비추)

- Float 요소를 감사는 부모요소에 overflow: hidden을 추가하면 된다.

3. 부모요소에 clearfix클래스 추가하여 해제

- after 가상요소 선택자에 clear: both 속성을 부여하는 방식.
- 이 방식을 적용하기 위해선 clearfix안에는 float요소만 있어야한다.

```html
<div class="clearfix">
  <div class="float-box">1</div>
  <div class="float-box">2</div>
  <div class="float-box">3</div>
  <div class="float-box">4</div>
</div>
<div class="new-box"></div>
```

```css
.float-box {
  width: 100px;
  height: 100px;
  background: orage;
  margin: 10px;
  float: left;
}

.new-box {
  width: 250px;
  height: 250px;
  background: red;
}

.clearfix::after {
  content: "";
  clear: both;
  display: block; /** 가상요소의 기본속성은 inline이다. **/
}
.child {
  foat: fleft;
}
```

## display 속성

- float속성이 있는 요소 대부분은 display 속성이 block으로 바뀐다.
- display: flex; 는 예외

## clear

clear속성으로 제거를 해줘야한다.

1. box-sizing

vw : viewport width
vh: viewport heigt

vmax : viewport에서 더 긴것을 기준

margin: 요소의 바깥쪽의 여백

## display: flex

## position: relitive

## box-sizing

- padding, border등 요소의 크기가 증가하는 요소를 사용할때 쓰면 편하당.

## display

- block
- inline
- inline-blox
- flex
- none

## border

- 두께가 늘어나면 요소의 크기가 늘어난다.
- box-sizing: border-box; //이거 쓰면 안늘어난다.

## overflow

요소의 크기 이상으로 자식요소가 넘쳤을때 내용의 보여짐을 어떻게 처리할 것인지 제어한다.

## opacity

- 투명도

## justify-content
