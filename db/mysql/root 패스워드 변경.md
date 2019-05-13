# Mysql 초기화 이후  root 비밀번호 설정
    초기화 이후 root의 비밀번호를 바꾸고 싶을때
    다음과 같은 에러가 난다면...

## ERROR 1054 (42S22): Unknown column 'password' in 'field list' 
    password 대신 authentication_string 필드가 존재할 것이므로 
    update user set authentication_string=password('1234') where user='root'; 
    을 이용하면 된다.


1. user 테이블 조회
~~~ mysql
mysql> describe user;
~~~
2. authentication_string 필드 확인


3. update 명령어로 페스워드 변경
~~~
mysql> update user set authentication_string=password('1234') where user='root';
~~~

4. 변경사항 적용

~~~
mysql> flush privileges;
mysql> quti;
~~~




