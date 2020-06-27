## progress

## intro
로딩바
작업의 완료 진행률을 표시한다.


| 속성 | 의미 | 값 | 특성|
|------|:----:|:-------: |:-------:|
| `max`| 작업의 총량		| Number  | |
| `value`|	작업의 진행량	| Number  | max 속성을 생략할 경우 0~1 사이의 숫자여야한다.|

```html
<progress value="0" max="100"> </progress>
<script>
    const progress = document.querySelector('progress');
    const interval = setinterval(function() {
        progress.value += 10;
        if( progress.value >= 100 ) clearInterval(interval);
    }, 1000)
</script>
```