# layout

- IE지원을 위해 flexbox안쓰는 방법

## 가변 레이아웃

```html
<div class="box1">box1</div>
<div class="box2">box2</div>
```

```css
body {
  border: 3px solid red;
  overflow: hidden;
}
.box1 {
  width: 100px;
  padding: 2em;
  background: #abc;
  float: left;
}
.box2 {
  width: auto;
  padding: 2em;
  background: #ccb;
  float: none;
}
```

### ref

- [고정+가변레이아웃](http://uxuiz.cafe24.com/wp/archives/5275)
- [가변영역+고정영역](http://rwdb.kr/columnlayout/)

## 사이드 늘어나게

- height auto
- height 100%

## inline-flex

컨텐츠 영역의 크기를 기준으로 좌우 너비를 잡는 방법

## margin을 이용한 중앙중렬

magin을 이용한 중앙 정렬.

- 반드시 가로 사이즈가 정의되어야한다.
- 좌우 마진을 auto로 주는것이 핵심이다.

```css
.center {
  max-width: 300px;
  margin: 0 auto;
}
```
