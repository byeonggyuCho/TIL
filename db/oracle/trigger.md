


## Trigger
	- 자동화기능을 만든다.
	- 관리자를 편리하게 만들어주는 기능.
	- 시스템이 호출한다.(일종의 콜백이다. 이벤트발생시점에서 자동호출) 	



	(1)  이벤트에 의해서 자동으로 호출되는 프로시져
		-DML(insert, update, delete) 

	(2)  문법
		CREATE [OR REPLACE] TRIGGER 트리거명 {BEFORE | AFTER}
			트리거 이벤트 ON 테이블명
			[반복문]

		BEGIN
			raise_application_error(-20506, '수정된 값이 범위에 맞지 않다.') ;
		END;



	(3) DD : USER_TRIGGERS
		
	(4) 트리거는 2개의 임시테이블을 가지고 있다.
		OLD(:old) , NEW(:new) 		//필요할때 만들었다가 사라지는 임시 테이블.
	

	Trigger에서 임시테이블이 형성되어 INSERT, DELETE,UPDATE가 이루어지 논리.
			
	

	===============================================================================
	(5) 실습
		1) emp테이블에서 급여를 수정할 때 현재의 값보다 적게 수정 할 수 없고
		  현재의 값보다 10%이상 높게 수정할 수 없도록 제한하는 트리거를 만들어라.

		  	CREATE OR REPLACE TRIGGER tri_sal_update 
				before update ON emp
				FOR EACH ROW
					WHEN(NEW.sal <OLD.sal OR  NEW.sal >OLD.sal*1.1) 

			BEGIN
				raise_application_error(-20506. '수정된값이 범위에 맞지 않습니다.') 
			END;
	
	//뭔가 결핍됨... 다시 할것...
	// -20506은 에러넘버를 말한다.
	//트리거를통해 에러의 종류를 정의했다. 에러넘버는 2000이후의 숫자를 임의로 사용할 수 있다.
	

	트리거 삭제
	DROP TRIGGER tri_sal_update;
	==============================================================================
		2) emp테이블을 사용할 수 있는 시간은 월요일부터 금요일까지	
		09시부터 18시까지만 사용할 수 있도록 하는 트리거

		CREATE OR REPLACE TRIGGER tri_resource
			BEFORE update OR insert OR delete ON emp
		BEGIN
			IF to_char(sysdate, 'dy')  in('토', '일')  OR 
				to_number(to_char(sysdate, 'HH24') )  NOT BETWEEN 9 and 16 THEN
				raise_application_error(-20506, '허용된 시간이 아닙니다.') ;
			END IF;
			
		END;
	

		
		DROP TRIGGER tri_resource;



	-----------
	# 트리거의 활용
	
	- 통계자료를 만들때 트리거를 활용할 수 있다.
	- 트리거가 많으면 많을수록 서버가 느려진다.	(시스템이 항상모니터링하고있기때문.) 
	
	
	- SQL의 종류
		-ansi	SQL	(표준 SQL) 
		-제품별  SQL	(오라클: PL-sql, ms-sqlserver : t-sql) 
	 



	3) Analystic Function	
	- 당장 쓸일은 없습니다.
	- 똑같은 데이터로 어떻게 분석을 할것인가?
	



	# 명령어
	desc user_objects
	

	select object_name, object_type from user_objects;
	//이런식으로 가능합니다.


