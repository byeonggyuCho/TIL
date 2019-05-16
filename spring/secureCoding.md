# Secure Coding(보안코딩)
Statement 대신 prepareStatement 사용하는것도 보안코딩

- 4개의 라이브러리를 다운받아야한다.
~~~ xml
<!-- Spring Security Taglibs -->
<!-- Spring Security Config -->
<!-- Spring Security Web -->
<!-- Spring Security Core  -->
~~~



## CSRF (Cross-site request forgery)
- 피씽사이트등의 해킹 공격을 방지하기 위한 값
- 해당 데이터가 위조된것인지 확인이 가능하다.

~~~ html
	<input name="_csrf" type="hidden" value="5a8094a2-fca5-4716-88da-b877c78de5ac" />
~~~

access="permitAll"
