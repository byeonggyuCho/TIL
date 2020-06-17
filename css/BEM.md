# BEM (Block Element Modifier)

## 1. 포함관계 표현
```
    부모__자식
```
- 종속관계, 구조적 일부분

```html
<div class="container">
    <div class="container__item">
    </div>
</div>
```

```css{
    .container{

    }

    .container__item{

    }
}
```

## 2. 상태표현 
```
대상--상태
```
- 상태 표현


```css
    .btnsuccess{

    }
    .btn--danger{

    }
    .btn--warning{

    }

```

## 3. 띄어쓰기
```
    hello-world
```
- *-*로 구분함.

```css {
    .header-info{
        
    }
}

## REF
- [BEM방법론](https://medium.com/witinweb/css-%EB%B0%A9%EB%B2%95%EB%A1%A0-1-bem-block-element-modifier-1c03034e65a1)
- [BEM](https://mytory.net/html-css-js/2015/05/07/mindbemding-getting-your-head-round-bem-syntax.html)