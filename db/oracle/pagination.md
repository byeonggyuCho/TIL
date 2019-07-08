
# 페이징 기법
GET방식의 페이징.
- url이 더러워진다.

POST
- 폼으로 페이징 기법을 전달하자.
- 기존의방식: 모든 글을 조회한뒤에 화면에서 잘라서 보여주는 방식...
- 새로운방식: DB에서 끊어서 조회를 한다. 1~10까지 조회 2~20번까지 조회같은 방식으로 진행한다!


1) MySQL을 이용해서 page 출력 SQL
	Select * from TABLE_NAME
	Where ...
	Order by...
	limit 시작데이터, 데이터 갯수

	ex) select *from tblSpringBoard
	    Order by seq desc
	    limit 0, 10
	//첫번째글(0)부터 10개를 뽑아온다.

	ex) select *from tblSpringBoard
	    Order by seq desc
	    limit 11, 10
	//11번째 글부터 10개를 뽑아온다.


2) Oracle DB를 이용한 page 출력 SQL
	//테이블을 서브쿼리로 처리한당
	//내장함수 활용
	//검색된 결과에 넘버링을 붙인다 row_num
	//그 번호를 골라놓고 거기서 골라온다.
	//화면에 뿌려질 글의 갯수를 결정짓고 시작한다.

	Select * 
	From (select e.*, row_number over (order by 1) as num FROM Table_Name e)
	Where num between 1 and 10
	Order by seq desc;



3) 시작 데이터 번호
	1페이지 		10, 10
	2페이지		20, 10
	3페이지		30, 10
		(페이지 번호-1) * 페이지당 보여질 글의 갯수
		


4) 페이지 계산
	예를 들어 현재 페이지가 13페이지인 경우
	startPage= 11, endPage = 20
	
	13/10(perPageNum)=1.3
	1.3을 올림 ->2page
	2*10 (페이지  번호의 갯수) =20
'	20-9=11	

	-endPage 구하기
	endPage = (int) (Math.ceil(cri.getPage()/(double)displayPageNum) * displayPageNum)   *  displayPage;
	=>끝페이지는 변동이 심하다. (전체글의 갯수,한 블럭의 크기)

	-startPage 구하기
	(endPage - displayPageNum)+1
	

	-최종 endPage 구하기
	int finalEndPage=
	(int) (Math.ceil(totalCount / (double)cri.getPerPageNum()));

	if(endPage>finalEndPage){
		endPage = finalEndPage;
	}
	
	


5) UriComponentBuilder
->파라미터를 깔끔하게 전달하기...

