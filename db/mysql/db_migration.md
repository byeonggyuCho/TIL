# mySql to Oracle
      마이그레이션을 위한 치트시트


## 1.Data Type
Type | mySql | Oracle
---|:---:|---:
`NUMERIC` | BIGINT | NUMBER(19,0)
`NUMERIC` | DECIMAL | FLOAT(24)
`NUMERIC` | DOUBLE | FLOAT(24)
`NUMERIC` | DOUBLE_PRECISION | FLOAT(24)
`NUMERIC` | ENUM | VARCHAR2
`NUMERIC` | FLOAT | FLOAT
`NUMERIC` | INT | NUMBER(10,0)
`NUMERIC` | MEDIUMINT | NUMBER(7,0)
`NUMERIC` | INTEGER | NUMBER(10,0)
`NUMERIC` | NUMERIC | NUMBER
`NUMERIC` | REAL | FLOAT(24)
`NUMERIC` | SMALLINT | NUMBER(5,0)
`NUMERIC` | TINYINT | NUMBER(3,0)
`NUMERIC` | BIT | RAW
`STRING` | CHAR | CHAR
`STRING` | BLOB | BLOB,RAW
`STRING` | LONGBLOB | BLOB,RAW
`STRING` | LONGTEXT | CLOB,RAW
`STRING` | MEDIUMBLOB | BLOB,RAW
`STRING` | TEXT | VARCHAR2,CLOB
`STRING` | MEDIUMTEXT | CLOB,RAW
`STRING` | TINYBLOB | RAW
`STRING` | TINYTEXT | VARCHAR2
`STRING` | VARCHAR | VARCHAR2,CLOB
`STRING` | SET | VARCHAR2
`DATA` | DATE | DATE
`DATA` | DATETIME | DATE
`DATA` | TIME | DATE
`DATA` | TIMESTAMP | DATE
`DATA` | YEAR | NUMBER

## 2.Function / Stataements

Oracle | mySql | Example(Oracle) | Example(mySql)
---|:---:|:---:| ---
`NVL` |  `IFNULL` | SELECT **NVL( MAX( logging_time ) , SYSDATE )** last_time FROM xapm_server_time | SELECT **IFNULL( MAX( logging_time ), now() )** last_time FROM mjlee9.xapm_server_time
`SYSDATE` | `NOW()` |  SELECT **SYSDATE** FROM DUAL; | SELECT **now()**;
`\|\|` | `CONCAT()` |  A\|\|B | **CONCAT(A, B)**
`TO_DATE` | `STR_TO_DATE` | SELECT  **TO_DATE('2013-02-11',  'YYYY- MM-DD')**  FROM  dual; | SELECT  **STR_TO_DATE('2013-02-11', '%Y-%m-%d')**;
`TO_CHAR` | `DATE_FORMAT` | SELECT  **TO_CHAR(SYSDATE,‘YYYY-MM-DD')** credate  FROM  DUAL | SELECT  **DATE_FORMAT(NOW(),'%Y-%m-%d')**
`TO_CHAR()` | `CAST` | SELECT  to_char(1111)  from  dual |SELECT  cast(1111  as  char)
`TO_NUMBER()` | `CAST` | SELECT  to_number(1111)  from  dual | SELECT  cast(1111  as  unsigned)
`TO_DATE()` | `CAST` | SELECT  to_date(‘2015’)  from  dual | SELECT  cast(‘2015’  as  datetime)
`DECODE` | `CASE  THEN` | SELECT  DECODE(foods,'한식',1,'중식',2,' 양식',3,4) | SELECT  CASE  foods WHEN  '한식'  THEN  1 WHEN  '중식'  THEN  2 WHEN  '양식'  THEN  3 ELSE  4 END"
`JOIN(+)` | `OUTER  JOIN` | SELECT  t1.*,  t2.*  FROM  t1,  t2  where t1.i1  =  t2.i2(+)  ; SELECT  t1.*,  t2.*  FROM  t1,  t2  where t1.i1(+)  =  t2.i2  ; | SELECT  t1.*,  t2.*  FROM  t1  LEFT  OUTER JOIN  t2  ON  t1.i1  =  t2.i2  ; SELECT  t1.*,  t2.*  FROM  t1  RIGHT OUTER  JOIN  t2  ON  t1.i1  =  t2.i2  ;
`ROWNUM` | `LIMIT` | SELECT  *    FROM  TABLE  WHERE ROWNUM >=1 AND  ROWNUM  <=5 | SELECT  * FROM  TABLE  LIMIT  1,10  ;
`REGEXP_SUBSTR` | `REGEXP_SUBSTR` | SELECT  REGEXP_SUBSTR('ab12cd','[0-9]+')  FROM  DUAL; | SELECT  REGEXP_SUBSTR('ab12cd','[0-9]+');
`REGEXP_INSTR` | `REGEXP_INSTR` | SELECT  REGEXP_INSTR('abc','b')  FROM DUAL; | SELECT  REGEXP_INSTR('abc','b');"
`TRUNC` | `TRUNCATE` | TRUNC(TO_NUMBER(b.playtime)/60) | TRUNCATE(cast(b.playtime  as unsigned)/60,0)"
`CHR()` | `CHAR()` | SELECT  chr(100)  from  dual | SELECT  char(100  using  ascii)
`REGEXP_LIKE` | `REGEXP` | |







