
# 경과시간 구하기 셈플


###
11g 동작확인.

~~~ sql
SELECT dd|| '일'|| SUBSTR (hms, 1, 2)|| '시'|| SUBSTR (hms, 3, 2)|| '분'|| SUBSTR (hms, 5, 2)|| '초' day
  FROM (
         SELECT TRUNC (end_date - start_date) dd,
                TO_CHAR (TO_DATE (TRUNC ( MOD(end_date - start_date, 1) * 24 * 60 * 60), 'sssss'), 'hh24miss') hms
           FROM (
                 SELECT TO_DATE ('2006-06-20 09:07:34', 'yyyy-mm-dd hh24:mi:ss') end_date,
                        TO_DATE ('2006-06-18 14:45:30', 'yyyy-mm-dd hh24:mi:ss') start_date
                   FROM DUAL
                )
       )

~~~