# Select

옵션의 선택메뉴나 자동완성을 제공한다.

## Select
옵션을 선택하는 매뉴

| 속성 | 의미 | 값 | 기본값|
|------|:----:|:-------: |:-------:|
| `autocomplete`|사용자가 이전에 입력한 값으로 자동 완성 기능을 사용할 것인지 여부		|  `on, off` | `on`|
| `disabled`| 	선택메뉴를 비활성화	|  Boolean | |
| `form`| 	선택 메뉴가 속할 하나 이상의 form의 id 속성값|   | |
| `multiple`| 	다중 선택 여부	|  Boolean | |
| `name`| 	선택메뉴의 이름	|  Boolean | |
| `size`| 한번에 볼 수 있는 행의 개수	| Number | 0(1과 같음0)|



## optgroup
option을 그룹화한다.  

| 속성 | 의미 | 값 |
|------|:----:|:-------: |
| `label`|(필수)옵션 그룹의 이름	|  `on, off` | 
| `disabled`|옵션 그룹을 비활성화	|  Boolean | 

## option
선택 메뉴 select나 자동완성 datalist에서 사용될 옵션
- 선택적 빈 태그로 사용가능. 


| 속성 | 의미 | 값 | 특성|
|------|:----:|:-------: |:-------:|
| `disabled`| 옵션을 비활성화		| Boolean  | |
| `label`| 표시될 옵션의 제목		|   | 생략되면 포함된 텍스트를 표시 |
| `selected`| 옵션이 선택되었음을 표시	| Boolean  | |
| `value`|	양식으로 제출될 값	|   | 생략되면 포함된 텍스트를 값으로 사용한다. |


```html
<select>
    <optgroup lable="Coffee">
        <option>Americano</option>
        <option>Caffe Mocha</option>
        <option label="Cappuccino" value="Cappuccino"></option>
    </optgroup>
    <optgroup lable="Latte">
        <option>Caffe Latte</option>
        <option>Vanilla Latte</option>
    </optgroup>
</select>
```


## dataList
input에 미리 정의된 옵션을 지정하여 자동완성 기능을 제공하는데 사용된다.
- input의 list 속성에 바인딩
- option을 포함하여 정의된 옵션을 지정

```html
<input type="text" list="fruits">

<datalist id="fruits">
    <option>Apple</option>
    <option>Orange</option>
    <option>Banana</option>
    <option>Mango</option>
    <option>Fieapple</option>
</datalist>
```