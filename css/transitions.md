# transition
css속성의 시작과 끝점을 지정하여 중간 값을 애니메이션  

- transition-proerty: 전환 효과를 사용할 속성 이름
- transition-duration: 전환효과의 지속시간 설정
- transition-timing-function: 타이밍 함 지정
- transition-delay: 전환효과의 대기시간 설정


## trasition-proerty
전환 효과를 사용할 속성의 이름을 설정한다.  

```html
<div class="box"> </div>
```

```css
.box {
    width: 100px;
    height: 100px;
    background: tomato;
    margin: 50px;
    transition: width 1s, background 1s;
}

.box:hover {
    width: 300px;
    background: dodgerblue;
}
```

## transitoin-duration
전환 효과의 지속시간을 결정한다.

## transition-timing-function
ease: 빠르게-느리게
linear: 일정하게
ease-in: 느리게 빠르게
ease-out: 빠르게-느리게 
ease-in-out: 느리게-빠르게-느리게
cubic-bezier(n,n,n,n): 자신만의 값을 정의
steps(n): n번 분할된 애니메이션

```html
<div class="box"> </div>
```

```css
.box {
    width: 100px;
    height: 100px;
    background: tomato;
    margin: 50px;
    transition:2s linear;
}

.box:hover {
    width: 300px;
    background: dodgerblue;
}
```


## transform
요소의 변화를 지정
```
transform: 변환함수1 변환함수2 변환함수3
transform: 원근법 이동 크기 회전 기울임
```
```css
.box{
    transition: rotate(20deg) translate(10px,0);
}
```


### 2D변환함수

| 변환함수 | 의미 | 단위 |
|:--------|:--------|:--------|
| tanslate(x, y)    | 이동(x축, y축)    | 단위  |
| tanslate(x)       | 이동(x축)         | 단위  |
| tanslate(y)       | 이동(y축)         | 단위  |
| scale(x, y)       | 크기(x축, y축)    | 없음(배수)  |
| scale(x)          | 크기(x축)         | 없음(배수)  |
| scale(y)          | 크기(y축)         | 없음(배수)  |
| rotate(drgree)    | 회전(각도)        | deg  |
| scale(x-deg,y-deg)| 기울임(x축,y축)   | deg  |
| scale(x-deg)      | 기울임(x축)       | deg  |
| scale(x-deg)      | 기울임(y축)       | deg  |
| matrix(n,n,n,n,n,n) | 2차원 변환효과    | 없음  |



```html
<div class="box">123</div>
```
```css
.box{
    width: 200px;
    height: 200px;
    background: tomato;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:30px;
    transition: 1s;
    /* transform:rotate(90deg); */
    /* transform:translate(100px, 30px); */
    margin:100px;
}
.box:hover{
    /* transform: tarnslate(30px, 30px); */
    /* transform: scale(0.8);*/
    transform: skewY(45deg);
}
```