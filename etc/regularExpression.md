
# 정규표현식(regular expression)
- 내가 임의로 형식을 만들 수있다.
- 'abc__zz__110'과 같은 폼으로 검색등이 가능해진다.
- java.lang.string 클래스가 정규표현식의 표현법을 빌려다 사용할수 있다.
	- 내가 원하는 패턴을 만들 수 있다.
- java.util.regex.Match/java.util.regex.Pattern.
#데이터검증..
	- 이메일의 형식을 지정한다.
	- 이럴때도 정규표현식이 사용할 수 있다.
	- 파싱할때
	- 특정 패턴을 임의로 만들어서 원하는 데이터를 뽑아 낼 수 있다.
		

1) 지원 클래스
	1) java.lang.String
		matchs() , replaceAll(), replaceFirst(), split()

	2) java.util.regext
		Matcher, Pattern 이라는 두개의 클래스.
		
2) 기호
	1) .	: 임의의 한 문자. 임의의 어떤 문자든 올 수 있는 BLANK를 의미한다.
		  ex) h.s-  has, hbs, hcs, ...
	2) *	:  *바로 앞의문자가 0개 이상의문자가 올 수있다는뜻이다.(바로 앞의 문자를 가리킴)]
		ex) 즉.... hello* -   hell, hello, helloo, hellooo.....
		ex) ab*c		- ac, abc, abbc,abbbc
		ex) *b		- 잘못된표현!! 반드시 앞에 문자가 와야한다.
	3) +	: 1개 이상의 문자가 와야한다.
		hello+ -  hell(x), hello, helloo, hellooo,....
	4) ?	: 한개가 있거나 없거나.(once or not at all.)
		ex) a?c -  c, ac
		ex)hello?-  hell, hello
	5) ^ 	:해당문자부터 시작해야한다. 시작하는 첫글자!
		ex) ^hello		: hello로 시작하는 줄을 찾겠다는 의미.

	6) $	:문장의 마지막
		World$: 문장의 마지막에는 world라는 단어로 끝나야한다.

	7) []	:[]안에 문자 중 일치하는 것을 매칭한다.
		 [abcdef]	: 이 문자중 일치하는것을 찾는다.
		 [a- f] 	: a~f까지의 범위를 하이픈으로지정할 수 있따.
		 [0- 9]	: 0~9까지의 범위중 어떤 숫자도 올 수있다.
		 [abc]- 	: 대괄호밖에서 사용되는 '- '는 그냥문자
		 [ab\- c]	: 여기서\- 는 - 을 의미한다.!(원래 '- '의 의미에서 탈출시키는 escape문자를 앞에 붙여준다)
		 [af- ]	: 대괄호 안에서  맨끝에 사용되면 '- '는 그냥 문자로 처리한다.
		[- abc]de	: 대괄호밖 문장의처음, 여기서는 abc를 제외한...
			즉de를 찾되 abcde는 찾ㄴ지마라. de를 찾아라.

	8) {} :반복횟수
		- hel{2}o -  hell0.
		- he{3,}0 -  hello,helllllo., helllllld,
		-  hel{2,4} -  hello, helllo, hellllo.


	9) ():그룹으로 묶을때hellow 
		(hello){3}:
		(hello)* -  null,hello, hello 
		

	10    |	:or연산
		man/woman	=>
		(chapte\section) [1- 9]		


	11) 대소문자도 다른의미로 받아들인다.
	

	12) 문자 클래스	: 간단하게 이런식으로 표현가능, 
	[a- zA- Z]		[[:alpaha:]]	\p{Alpha}
	[0- 9]		[[:digit:]]		\p{Digit}
	[a- zA- z0- 9]	[[:alnum:]]		\p{Alnum}
	공백		[[:space:]]		\p{Space}	


	#### 정규표현식 테스트사이트.
	http://regexr.com/
	