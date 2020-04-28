# Template Literal




## 함수에 전달한 경우.

```js
const red = '빨간색';
const blue = '파란색';
function favoriteColors(texts, ...values) {
  console.log(texts);
  console.log(values);
}
favoriteColors`제가 좋아하는 색은 ${red}과 ${blue}입니다.`

// (3) ["제가 좋아하는 색은 ", "과 ", "입니다.", raw: Array(3)]
// (2) ["빨간색", "파란색"]0: "빨간색"1: "파란색"length: 2__proto__: Array(0)
```



## ${}에 함수를 전달한 경우.
```js
function sample(texts, ...fns) {
  const mockProps = {
    title: '안녕하세요',
    body: '내용은 내용내용 입니다.'
  };
  return texts.reduce((result, text, i) => `${result}${text}${fns[i] ? fns[i](mockProps) : ''}`, '');
}
sample`
  제목: ${props => props.title}
  내용: ${props => props.body}
`

/*
"
  제목: 안녕하세요
  내용: 내용은 내용내용 입니다.
"
*/
```