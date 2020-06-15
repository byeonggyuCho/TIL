# Selector

## 1.태그 선택자

## 2.클래스 선택자.

## 3.형제 선택자

## 4.nth:

## 5.가상요소

### after

### before

## 6.속성 선택자

### [attr], [attr=value]

### [attr^=vlaue], [attr$=value]


## 7. Ingeritance
조상요소로 부터 상속받을 수 있다.
- 조상요소의 특성이 하위 요소에 미칠 수 있다.
- 그러나 모든 하위 요소에 적용되지는 않는다.
```css
.ecosystem {
    color: red;
}
```

```html
<div class="ecosystem">
    <div class="animal"> 동물
        <div class="tiger">호랑이</div>
        <div class="lion">사자</div>
        <div class="elephant">코끼리</div>
    </div>
    <div class="plant">식물</div>
</div>
```

### 상속되는 속성
- font
    - font-size
    - font-sytle
    - font-weight
    - font-height
    - font-family
- color
- text-align
- text-indent
- text-decoration
- letter-spacing
- opacity


### 강제 상속
```html
<div class="parent">
    <div class="parent"></div>
</div>
```

```css
.parent {
    position: inherit /*강제 상속 받아 부모의 속성값을 사용해라*/
}
```