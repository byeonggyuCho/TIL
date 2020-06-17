## 버튼
```css

/* inline-flex를 이용한 중앙정렬*/

.btn {
    height: 34px;
    background: #eee linear-gradient(to bottom, #fcfcfc, #eee);
    border: 1px solid #d5d5d5;
    border-radius: 4px;
    display: inline-flex;
    align-items: center;
    padding: 0 12px;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.5;
    box-sizing: border-box;
    position: relative;
}

.btn:hover::before {
    content: "";
    position: absolute;
    top: 0;
    width: 0;
    height: 100%;
    background: rgba(0,0,0,0.07);
}

.btn.byn--primary {
    border: 1px solid #65b836;
    color: #fff;
    background: #55a532 linear-gradient(#91dd70, #55ae2e)
}
```


## INPUT

```css

.input--text {
    font-size: 16px;
    height: 34px;
    padding: 0 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
    /* box-shadow: inset 0 1px 2px rgba(0,0,0,0.075); */
    box-shadow: inset 0 1px 2px rgba(0,0,0,0.075);
    outline: none;
}



.input--text:focus {
    border-color: #51a7e8;
    /* 다중 그림자를 삽입함.*/
    box-shadow: inset 0 1px 2px rgba(0,0,0,0.075), 
                0 0 5px rgba(81, 167, 232, 0.5);
}
```