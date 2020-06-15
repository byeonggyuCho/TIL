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



### 3D변환함수

| 변환함수 | 의미 | 단위 |
|:--------|:--------|:--------|
| tanslate3d(x, y)    | 이동(x축, y축,z축)    | 단위  |
| tanslateZ(z)       | 이동(Z축)         | 단위  |
| scale3D(x, y,z)       | 크기(x축, y축,Z축)    | 없음(배수)  |
| scaleZ(x)          | 크기(Z축)         | 없음(배수)  |
| rotate3d(x,y,z,a)    | 회전(X벡터,Y벡터,Z벡터,각도)        | 없음,deg  |
| rotateX(x)    | 회전(X축))        | deg  |
| rotateY(y)    | 회전(Y축)        | deg  |
| rotateZ(y)    | 회전(Z축)        | deg  |
| perspective(n)      | 원근법(거리)       | deg  |
| matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n) | 3차원 변환효과    | 없음  |

```html
<img
    src="../resource/img/etc/bono.jpg"
    alt="logo"
>
```

```css
img {
    width: 300px;
    border: 1px solid lightgray;
    transform:  perspective(500px) rotateX(45deg);
}
```

- perspective함수는 transformt속성에 가장 앞쪽에 나와야한다.


### transform 변환 속성

| 변환함수 | 의미 | 
|:--------|:--------|
| transform-orgin | 요소 변환의 기준점을 설정     | 
| transform-style | 3D 변환 요소의 자식요소도 3D 변환을 사용할지 설정   | 
| perspective | 하위 요소를 관찰하는 원근 거리를 설정     | 
| perspective-origin | 원근 거리의 기준점을 설정     | 
| backface-visibility| 3D변환으로 회전된 요소의 뒷면을 숨김으로 설정     |



#### 1.transform-orgin 
요소 변환의 기준점을 설정.

- X축: left, right, center, %, 단위
- Y축: top, bottom, center, %, 단위
- Z축: 단위




```html
<img
    src="../resource/img/etc/bono.jpg"
    alt="logo"
>
```

```css
img {
    width: 200px;
    border: 1px solid lightgray;
    transition:1s;
    transform:  rotate(45deg);
    /* transform-origin: 0% 0%; */
    transform-origin: left, top;
}
```
회전의 기준이 이미지의 좌측 상단으로 바뀌었다.  



### transcform-style
3D 변환 요소의 자식요소도 3D 변환을 사용할지 설정

- flat: 자식요소의 3D 변환을 사용하지 않음
- preserve-3d: 자식 요소의 3D변환을 사용함.




```html
<div class="perspective">
    <div class="grand-parent">
        <div class="parent">
            <img
                src="../resource/img/etc/bono.jpg"
                alt="logo"
            >
        </div>
    </div>
</div>

```

```css

.perspective {
    width: 200px;
    perspective: 500px;
    padding:70px;
}

.grand-parent {
    width: 200px;
    border: 3px solid dodgerblue;
    transition: 1s; 
    transform: rotate(-45deg);
    transform-style:preserve-3d;
}

.parent {
    width:200px;
    border:3px solid tomato;
    transition:1s;
    transform:rotate(45deg);
    transform-style:preserve-3d;
}


img {
    width: 200px;
    border: 1px solid lightgray;
    transition:1s;
    transform:  rotateX(45deg);
    /* transform-origin: 0% 0%; */
    transform-origin: left, top;
}

```


### perspective
하위 요소를 관찰하는 원근 거리를 설정
- 단위: px, em,  cm등


```html
<div class="perspective">
    <div class="grand-parent">
        <div class="parent">
            <img
                src="../resource/img/etc/bono.jpg"
                alt="logo"
            >
        </div>
    </div>
</div>

```

```css

.perspective {
    width: 200px;
    /* 상위요소에 등록한다, 자식요소의 원근감. */
    perspective: 600px; 
    padding:70px;
}

.grand-parent {
    width: 200px;
    border: 3px solid dodgerblue;
    transition: 1s; 
    transform: rotate(-45deg);
    transform-style:preserve-3d;
}

.parent {
    width:200px;
    border:3px solid tomato;
    transition:1s;
    transform:rotate(45deg);
    transform-style:preserve-3d;
}


img {
    width: 200px;
    border: 1px solid lightgray;
    transition:1s;
    transform:  rotateX(45deg);
    /* transform-origin: 0% 0%; */
    transform-origin: left, top;
}

```


#### perspective 속성과 함수의 차이점

1. perspective: 

| 속성/함수 | 적용대상 |기준점 설정 |
|:--------|:--------|:--------|
| perspective | 관찰 대상의 부모요소 | perspective-origin |
| transform: perspective()| 관찰대상  | transform-origin

    perspective속성은 관찰 대상의 부모 요소에 적용하여 하위요소들을 관찰하여 원근거리를 서정하며,
    transform: perspective() 변환함수는 관찰 대상에 직접 적용하여 그 대상을 관찰하는 원근 거리를 설정한다.  


### perspective-origin
원근 거리의 기준점 설정.

| 값      |     의미 |  기본값 |
|:--------|:--------|:--------|
| X축 | left, right, center, %, 단위 | 50% |
| Y축 | top, bottom center, %, 단위 | 50% |


```html
<div class="perspective">
    <div class="grand-parent">
        <div class="parent">
            <img
                src="../resource/img/etc/bono.jpg"
                alt="logo"
            >
        </div>
    </div>
</div>

```

```css

.perspective {
    width: 200px;
    /* 상위요소에 등록한다, 자식요소의 원근감. */
    perspective: 600px; 
    perspective-origin: 0 50%
    padding:70px;
}

.grand-parent {
    width: 200px;
    border: 3px solid dodgerblue;
    transition: 1s; 
    transform: rotate(-45deg);
    transform-style:preserve-3d;
}

.parent {
    width:200px;
    border:3px solid tomato;
    transition:1s;
    transform:rotate(45deg);
    transform-style:preserve-3d;
}


img {
    width: 200px;
    border: 1px solid lightgray;
    transition:1s;
    transform:  rotateX(45deg);
    /* transform-origin: 0% 0%; */
    transform-origin: left, top;
}

```

시선을 어디에 두고 관찰대상을 볼것인가에 따라 달라지는 원근감을 표현한다.  



### backface-visibility
3D 변환으로 회전된 요소의 뒷면 숨김을 설정


| 값      |     의미 |  기본값 |
|:--------|:--------|:--------|
| visible | 뒷면 숨기지 않음 | visiblie|
| hidden | 뒷면 숨김|  |



```html
    <img
        src="../resource/img/etc/bono.jpg"
        alt="logo"
    >

```

```css


img {
    width: 300px;
    border: 1px solid lightgray;
    transition:1s;
    transform:  perspective(400px) rotateY(180deg);
    backface-visibility: hidden;
}

```
- ` backface-visibility: hidden;`를 주니까 요소가 사라짐.


### matrix(a,b,c,d,e,f)
요소의 2차원 효과를 지정
scale(), skew(), translate(), rotate()를 지정.

    요소에 일반 변환 함수를 사용하더라도 브라우저에 의해 matrix함수로 계산되어 적용된다. (2D변환함수는 matrix로 3D 변환 함수는 matrix3d로)
    따라서 일반적인 경우는 matrix함수가 아닌 일반 변환 함수를 사용하며 된다.  

