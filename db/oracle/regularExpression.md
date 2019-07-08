# RegularExpression

1. regexp_like

– Syntax : regexp_like(목적 문자열, Pattern [, Match를 시도할 때의 옵션]);

– 옵션

• C는 대소문자 구별(기본값입니다), I는 대소문자 무시

• N은 .이 개행 문자와 일치, M은 검색 문자열을 멀티라인으로 간주

– 예) ok로 시작하는 모든 문장 찾기

• SELECT * FROM TEST_REGEX WHERE REGEXP_LIKE(name, '^ok*');

2. regexp_instr

– 지정한 조건(정규 표현)을 만족하는 부분의 최초의 위치(무슨 문자인지)를 반환

– Syntax : regexp_instr(목적 문자열, Pattern [, 검색 시작 위치 [, 발생 횟수[, 반환 옵션 [, Match를 시도할 때의 옵션]]]]);

– 시작 위치는 1이 기본값

– 반환 옵션은 0일 때는 시작 부분, 0이 아니면 끝부분이 반환

– 매치 옵션 : regexp_like의 옵션과 동일

– 예)B(b)또는 C(c)가 2번 이상 문자열에 들어 있는 데이터 검색

• SELECT * FROM TEST_REGEX WHERE REGEXP_INSTR(name, '[b-c]', 1, 2, 0, I)>0;

3. regexp_substr

– 지정한 정규 표현을만족하는 부분 문자열을 리턴

– Syntax : regexp_substr(목적 문자열, Pattern [, 검색 시작 위치 [, 발생 횟수[, 반환 옵션 [, Match를 시도할 때의 옵션]]]]

– 옵션 : regexp_instr 과 동일

– 예)B(b)또는 C(c)가 2번 이상 문자열에 들어 있는 데이터 검색

• SELECT * FROM TEST_REGEX WHERE REGEXP_SUBSTR(name, '[b-c]', 1, 2, 0, I)>0;

4. regexp_replace

– 지정한 정규 표현을 만족하는 부분을, 지정한 다른 문자열로 치환

– Syntax : regexp_instr(목적 문자열, Pattern, 치환문자열, [, 검색 시작 위치 [, 발생 횟수[, 반환 옵션 [, Match를 시도할 때의 옵션]]]]);

– 옵션 : regexp_instr과 동일

– 예)B(b)또는 C(c)가 2번 이상 문자열에 들어 있는 데이터 검색하고 이를 aa 로 치환

• SELECT * FROM TEST_REGEX WHERE REGEXP_REPLACE(name, '[b-c]', ‘aa’1, 2, 0, I) > 0;