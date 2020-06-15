
## background-repeat;
배경 이미지를 수직과 수평을 반복한다.  
- repeat-x: 배경 이미지를 수평으로 반복
- repeat-y: 배경 이미지를 수직으로 반복
- no-repeat: 딱 한번만 나옴.

```html
<div class= "box"></div>
```

```css
.box {
    width: 550px;
    height: 350px; 
    border: 2px dashed lightgray;
    background-image: url("resource/img/etc/bono.jpg");
    background-repeat: no-repeat;
    background-position: right top;

}

```

## backgorund-positoin
배경 이미지의 배치를 설정한다.

- %: 왼쪽 상당 모서리는 0%, 0%
    - %의 경우 부모요소가 기준이 된다.
- 방향: 방향을 입력하여 위치 설정 (center, left, top, bottom, right)
- 단위: px, em, cm 등 단위로 지정
    - x축, y축
- 단위와 방향을 동시에 사용할 수 있다.
    - `50px bottom`
    - `left 100px;`
    - 이 경우에 값의 순서에 따라 x축과 y축이 된다.


## backgorund-attachment
요소가 스크롤 될 때 배경 이미지의 스크롤 여부를 설정한다.  
네비게이션이 스크롤을 내렸을때 고정이 되듯이 배경이미지를 고정될지 설정(이미지는 view-port에 고정된다.)
스크롤을 올렸을때 말려올라가게 할지 결정하는것

- scroll: 배경 이미지가 요소를 떠나서 같이 스크롤 된다.
- fixed: 배경 이미지가 뷰포트에 고정되어, 요소와 같이 스크롤되지 않음
- local: 요소 내 스크롤 시 배경 이미지가 같이 스크롤 됨

```html
<div class="box"></div>
```

```css
body {
    height: 3000px;
}

.box {
    width: 500px;
    height: 350px;
    border: 2px dashed lightgray;
    background-image: url("resource/img/etc/bono.jpg");
    background-attachment: scroll;
}
```html
<section class="section1"></section>
<section class="section2"></section>
<section class="section3"></section>
<section class="section4"></section>
<section class="section5"></section>
```

```css
section {
    height: 300px;
    border: 2px dashed lightgary;
}

.section2{
    background-image:url("\resource\img\etc\mob_fav_prod_bg_new.jpg");
    background-size: auto 100%;
    background-position: right bottom;
    background-attachment: fixed
}


.section3{
    background-image:url("\resource\img\etc\reserve_bg.jpg");
    background-size: auto 100%;
    background-position: right bottom;
    background-attachment: fixed

}
```


```html
<div class="container">
    <div class="for-scroll"> </div>
</div>
```


```css
.container{
    width: 400px;
    height: 300px;
    border: 4px solid red;
    margin: 50px;
    overflow: auto;
    background-image: url("resource/image/etc/bono.jpg");
    background-size: 50%;
    background-attachment: local;
}

.for-scroll {
    height: 2000px;
}
```
블럭에서 스크롤을 할때 background image가 같이 스크롤이 된다.