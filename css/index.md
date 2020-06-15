# CSS


## 인라인(inline)방식
```html
<div style="color: red; font-size: 20px; font-weight: bold;" > HELLO</div>
```

## 내장(embeded) 방식
```html
<head>
    <style>
        div {
            color: red;
            font-size: 20px;
            font-weight: bold;
        }
    </style>
</head>

<body>
    <div>HELLO</div>
</body>
```

## 링크(link) 방식
- link테그는 비동기로 요청을 한다.

```html
<head>
    <link rel="stylesheet" href="css/common.css">
</head>
<body>
    <div>HELLO</div>
</body>

```

```css
/* common.css */
div {
    color: red;
    font-size: 20px;
    font-weight: bold;
}
```


## @import 방식
CSS @import를 이용해서 외부 문서로 CSS를 불러와 적용하는 방식
- css파일에서 css파일을 불러오는 방식
- 동기식을 요청을 한다. 즉 앞에서 요청한 파일이 완료가 될때까지 기다린다.
- 이 호출방식은 CSS간의 서로 결합도가 있을 경우에 적합하다.(의존성)

```html
<head>
    <link rel="stylesheet" href="css/common.css">
</head>
<body>
    <div>HELLO</div>
</body>
```

```css
/* common1.css*/
@import url("./common2.css")
```

```css
/* common2.css*/
div {
    color: red;
    font-size: 20px;
    font-weight: bold;
}
```