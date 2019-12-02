# Json (JavaScript Object Notation)	
자바스크립트식 데이터 표현방법.


## Info
백엔드와 데이터르 전송하기위함 표준이다. 오직 데이터를 다루기때문에 자바스크립트 객체러럼 메소드를 추가할 수없으며 이밖의 차이가 존재한다.

## 자료형
- 수(Number)
- 문자열(String)
- 참/거짓(Boolean)
- 배열(Array)
- 객체(Object)
- NULL

``` json
{
	"hello": "world",
	"t": true ,
	"f": false,
	"n": null,
	"i": 123,
	"pi": 3.1416,
	"a": [1, 2, 3, 4],
	"gamescore": {"osu": 2154942, "Cytus": 862411}
}
```



## 객체 리터럴 표기법과 차이.
1. JSON은 `"key": value`로 속성을 정의해야합니다. 속성을 반드시 큰 따옴표로 묶어야합니다.
2. JSON에서 허용되는 자료형은 문자열,숫자,배열,true,false,null,JSON Object 입니다.
3. 함수를 JSON의 속성으로 할당할 수 없습니다.
4. Date같은 객체는 JSON.parse()후에 문자열로 변경됩니다.
5. JSON.parse()는 계산된 속성명을 거부하고 오류가 발생됩니다.
6. ES6에서 추가된 계산된 프로퍼티명(Computed property name)을 지원하지 않습니다.