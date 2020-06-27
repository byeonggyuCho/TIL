# media

#intro
다양한 미디어 유형이나 장치에 따라, 서로 다른 스타일 규칙을 적용한다.  
미디어의 유형이나 상황에 따라 조건을 부여할 수 있다. 

```
@media 미디어 타입 and 미디어 특성 {
    css code
}
```

스크린의 최대너비가 1200px이하일때 적용.
```css
@media screan and (max-width: 1200px) {
    body {
        color: red;
    }
}
```

## 미디어 타입
- 타겟, 어떤 미디어?(what)

| 타입 | 의미 | 기본값 |
|------|:----:|:-------: |
| `all` | 모든 미디어 타입에 적용 | `all` |
| `screan` | 컴퓨터 화면, 타블렛, 스마트폰 등 |  |
| `print` | 인쇄 전용 |  |

## 미디어 특성
- 조건, 어떻게 됐을때(When)

| 특성 | 의미 |  
|:------|:----|
| `width`       | 부포트의 가로 너비 |
| `max-width`   | 뷰포트 최대 가로 너비(이하) |
| `min-width`   | 뷰포트 최소 가로 너비(이상) |
| `height`      | 뷰포트 세로 너비   |
| `max-height`  | 뷰포트 최대 세로 너비(이하)  |
| `max-height`  | 뷰포트 최소 세로 너비(이하)   |
| `orientation` | 뷰포트 방향(portrait, landscape)   |


### orientation
- portrait: 세로가 더 긴상태
- landscape: 가로가 더 긴 상태
- 스마트폰 가로보기를 지원할 수 있다.   

```css
@media screen and (orientation:portrait) {
    .container {
        height: 300px;
        background: blue;
    }
}
```

## Media Options
디바이스 종류에 따른 단위는 기획/디자인 단게에서 결정하는 것이 효과적입니다.  

| 종류 | 디바이스 | 단위(px) |
|------|:----:|:-------: |
| `Large Devices`   | Desktops | 1024px 이상 |
| `Medium Devices`  | Tablets | 1024px 이하 |
| `Small Devices`   | Tablets+Phones  | 768px 이하 |