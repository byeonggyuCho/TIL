# position

요소의 위치를 지정하는 유형을 설정한다.

## 값
- static : 유형 없음, 배치 불가능
- relative: 요소 자신을 기준으로 배치
- absolbute: 위치상 부모요소를 기준으로 배치한다.
-  fixed:  브라우져(뷰포트)기준으로 배치한다.
- sticky: 스크롤 영역 기준으로 배치한다.


```html

```

```css
.child{
    width: 150px;
    height: 100px;
    background: tomato;
    border-radius:10px;
    position:absolute;
    left: 100px;
}
```





## top
요소의 position기준에 맞는 위쪽에서 거리를 설정

- auto: 브라우저가 계산한다.
- %: 부모요소의 세로너비의 비율로 지정, 음수 값 허용     

## bottom
요소 postion기준에 맞는 '아래쪽'에서의 거리를 설정

- auto: 브라우저가 계산한다.
- %: 부모요소의 세로너비의 비율로 지정, 음수 값 허용     


## left
요소 postion기준에 맞는 '왼쪽'에서의 거리를 설정


- auto: 브라우저가 계산한다.
- %: 부모요소의 가로너비의 비율로 지정, 음수 값 허용     


## left
요소 postion기준에 맞는 '오른쪽'에서의 거리를 설정

- auto: 브라우저가 계산한다.
- %: 부모요소의 가로너비의 비율로 지정, 음수 값 허용     




## relative
위치를 이동하더라도 실제로 원래 위치에 존재하고 있음
- 주변에 영향을 주기때문에 주의해서 써야한다.
```html
<div class="box">1</div>
<div class="box relative">2</div>
<div class="box">3</div>
```

```css
.box{
    width: 100px;
    height: 100px;
    background: tomato;
    border: 4px dashed red;
    border-radius: 10px;
    justify-content: center;
    align-items: center;    
    font-size:30px;
}

.relative{
    position: relative;
    top: 20px;
    left: 150px;
}
```


## absolute
위치상의 부모요소를 기준으로 한다.  
- 위치상 부모에 postion속성이 부여되어있어야 기준으로 작용한다.
- 따라서 absolute 요소의 부모 요소는 postion 속성이 정의되어있어야한다.
- 아래 예제에서는 parent 클래스에 position relative를 부여했다.
- 기준이 될 수 있는 position 값은 relative, absolute, sticky가 될 수 있다.
- 이때 위치상 부모는 반드시 직계부모를 의미하지 않는다.
- 만일 parent에 position속성이 정의되지 않았다면 그 상위 요소인 grand-parent의 postion을 기준으로 삼는다.
- 계속 거슬러 올라가서 postion을 찾지 못하면 viewport가 기준이 된다.
- absolute를 사용할 때는 항상 부모요소의 position 속성을 확인하자


```html
    <div class="grand-parent">
        <div class="parent">
            <div class="child">1</div>
            <div class="child absolute">2</div>
            <div class="child">3</div>
        </div>
    </div>
    <div class=""></div>

```

```css
.ground-parent {
    width: 400px;
    height: 300px;
    padding: 30px 100px 100px 30px
    border: 4px dashed lightgray
}

.parent {
    width: 400px;
    height: 300px;
    border: 4px dashed gray;
    position: relative;
}

.child {
    width: 120px;
    height: 80px;
    background: tomato;
    border: 4px dashed red;
    border-radius: 10px;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.absolute {
    position: absolute;
    top: 50px;
    left: 100px;
}

```


## fixed
view port를 기준으로 위치를 선정한다.

## sticky
스크롤영역 기준으로 배치한다.  
- 스크롤영역에 맞닿아야 동작한다.
- top, bottom, left, right중 한개가 존재해야한다.
    - 스크롤 기준으로 상하좌우 어디에 배치할 것인지???
- IE는 지원불가능.

```html
<div class="section">
    <h1>Title 1 </h1>
</div>
<div class="section">
    <h1>Title 2 </h1>
</div>
<div class="section">
    <h1>Title 3 </h1>
</div>
<div class="section">
    <h1>Title 3 </h1>
</div>
<div class="section">
    <h1>Title 4 </h1>
</div>
<div class="section">
    <h1>Title 5 </h1>
</div>
<div class="section">
    <h1>Title 6 </h1>
</div>
<div class="section">
    <h1>Title 7 </h1>
</div>
<div class="section">
    <h1>Title 8 </h1>
</div>

```

```css
.section{
    height: 200px;
    border: 4px dashed lightgray;
}
.section h1{
    text-align: center;
    line-height: 2;
    font-size: 24px;
    font-weight: bold;
    position: skticky;
    top: 0;
}

.container{
     width: 400px;
     height:400px;
     border: 4px solid red;
     overflow: auto;
     margin:50px;
}

```



```html
    <div class="container">
        <div class="section">
            <h1>Title 1 </h1>
        </div>
        <div class="section">
            <h1>Title 2 </h1>
        </div>
        <div class="section">
            <h1>Title 3 </h1>
        </div>
        <div class="section">
            <h1>Title 3 </h1>
        </div>
        <div class="section">
            <h1>Title 4 </h1>
        </div>
        <div class="section">
            <h1>Title 5 </h1>
        </div>
        <div class="section">
            <h1>Title 6 </h1>
        </div>
        <div class="section">
            <h1>Title 7 </h1>
        </div>
        <div class="section">
            <h1>Title 8 </h1>
        </div>

    </div>
```



## 요소 쌓임 순서(Stack order)
요소가 쌓여 있는 순서를 통해 어떤 요소가 사용자와 가깝게 잇는지를 결정한다.

1. static을 제외한 position 속성의 값이 있을 경우 가장 위에 쌓임(값은 무관)
2. position이 모두 존재하면 z-index속성의 숫자 값이 높을 수록 위에 쌓임.
3. position속성의 값이 있고 z-index속성의 숫자 값이 같다면 HTML의 마지막 코드일 수록 위에 쌓인다. 
    - 나중에 작성한 요소 


```html
<div class="box-ground">
    <div class="box box1">1</div>
    <div class="box box2">2</div>
    <div class="box box3">3</div>
    <div class="box box4">4</div>
    <div class="box box5">5</div>
</div>
```
```CSS
.box-group {
    dispaly: flex; 
}
.box-group .box{
    width: 100px;
    height: 100px;
    background: tomato;
    border: 4px dashed red;
    border-radius 
    display: flex;
    justify-content: center;
    align-items:center;
    margin-right: -30px;
    box-shadow: 0 0 10px rgba(255,0,0, .7)
}

.box-group .box:nth-child(2n) {
    margin-top:30px;
}

.box1{
    position: relative; 
}
.box2{
    position: relative; 
    z-index:3;
}
.box3{
    position: relative; 
    z-index:2;
}
.box4{
    position: relative; 
    z-index:1;
}
.box5{
    position: relative; 
}
```
- position이 있으면 없는 요소보다 위에 쌓인다.
- position이 있는 요소들끼리는 코드 작성시점이 기준이다.
- z-index는 position이 있어야 작동한다.
- position이 있는 요소들에 z-index를 부여하면 이 값이 기준이 된다.


## display 수정
absolute, flexed 속성 값이 적용된 요소는 display속성의 값이 대부분 block으로 수정된다. 

```html
<span>INLINE<span>
```

```css
span{
    width:100px;
    height:100px;
    background: tomato;
    margin: 30px 0;
    position: absolute;
}
```
기본속성이 display block으로 바뀐다.