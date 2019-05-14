### Oracle Stored Procedure 호출이 제대로 되지 않음

- 원인 : Stored Procedure에 입출력되는 VARCHAR 변수의 초기화가 되지 않음
- 조치 : Stored Procedure 입력, 출력 VARCHAR 변수의 Length를 반드시 설정
(TMS에 문제를 일으키는 것으로 보임)

### exec TMS_ORACLE7 -A: Failed. 
- 원인 : ORACLE에서 DB 사용자에게 GRANT(사용허가권)가 없어서 발생하는 문제임. 
ORACLE LIB에서 문제가 생길 수도 있다. 
- 조치 : ORACLE의 VIEW중에 V$XATRANS$라는 VIEW를 GRANT시켜주면 조치됨. 
ORACLE의 DBA권한에서 실행가능함. 
방법: grant all on V$XATRANS$ TO SCRJPCS
여기서 SCRJPCS는 DB USER-ID임. 

### DataBase에 연결하지 못한다. 
- 원인 : 
1. 해당 DataBase에 필요한 환경 설정이 잘못되어 있다. (INVAL Error발생)
2. 환경 파일에 환경 설정이 잘못되어 있다. (INVAL Error)
3. DataBase에 권한이 없다. 
4. DataBase가 기동되지 않았다. 
- 조치 : 
1. set 명령으로 필요한 환경변수 설정을 확인한다. 
    - Oracle : ORACLE_HOME, ORACLE_SID, ORA_NLS
    - Informix : INFORMIXDIR, INFORMIXSERVER
2. 구성파일에 설정되어 있는 ENVFILE을 확인한다. 
3. 해당 User에게 DataBase 권한을 부여한다. 
    - ORACLE : "v$xatrans$"라는 VIEW에 대하여 해당 User에게 권한을 부여한다. 
    - INFORMIN : 해당 DB를 사용할 수 있는 권한을 User에게 부여한다. 
4. DataBase를 기동하고 Server를 새로 띄운다. 

### LINE/COL ERROR
    0/0 PLS-00801: Message 801 not found; product=PLSQL; facility=PCM
    22/9 PL/SQL: SQL Statement ignored
    28/17 PLS-00201: identifier 'JWONRYO. JWONMAS' must be declared
    62/9 PL/SQL: SQL Statement ignored
- 원인 : 현 Database의 Domain 밖에 있는 Table을 Handling하는 경우에 권한이 없는
경우에 발생
- 조치 : 접근할 수 있는 권한을 부여한다. 

### LINE/COL ERROR
    135/5 PL/SQL: Statement ignored
    135/9 PLS-00365: 'AVSQLCODE' is an OUT parameter and cannot be read
- 원인 : OUT parameter를 IN parameter로 사용하고 그 값을 읽은 경우. 
- 조치 : OUT parameter를 IN OUT parameter로 선언. 

### ORA-0020
- 원인 : 프로세스 수를 프로세스를 초과한 경우. 
- 조치 : 프로세스 수를 들여줌. 

### ORA-00023: session references process's private memory; cannot detach session
- 원인 : XA library를 사용하는데 Oracle이 dedicator server로 설치된 경우 발생
- 조치 : XA library를 사용할려면 Oracle을 MTS mode로 설치되어야 한다. 

###  ORA-0054 resource busy and acquire with NOWAIT specified
###  ORA-0054 WHEN DROP A TABLE(SESSION KILL)
- 원인 : 
1. Oracle 사용자가 어떤 Row을 Lock를 했는데, 다른 Oracle 사용자가 NOWAIT문을 이용하여
동일한 Row를 Lock를 한 경우에 발생
2. TABLE에 LOCK이 걸려 DML 및 DDL 명령 사용시
- 조치 : LOCK을 걸고있는 SESSION들을 KILL

### ORA-0059
- 원인 : DB_FILES 값에 도달한 경우
- 조치 : init. ora 의 DB_FILES 를 늘려주고 DB 를 Restartup 하면 해결

### ORA-00210: cannot open control file '/dev/vx/rdsk/oracle/v_ctl1'
ORA-07368: sfofi: open error, unable to open database file. 
- 원인 : Sequent Symmetry or NUMA-Q platform이 very large file (O/S에서 2GB
이상의 file system 지원)을 지원하기 위해 VLFS patch를 적용했거나
VLFS를 이미 지원하는 O/S Version일 경우 오라클 master node가 정상적으로
startup 되고 나서 다른 node가 startup parallel이 될 때 먼저 startup 된
master node가 shared disk 의 모든 오라클 관련 file을
none-shared mode로 open 하기 때문에 위의 현상이 발생됨. 
- 조치 : 1. PTX/Cluster V1. 3. 2일 경우
* Oracle V7. 3. x : O/S상에서 VLFS patch적용하지 않았을 경우는 관계
없으나, 이미 적용되었다면 추가적으로 O/S patch FP#23373
적용하여야 함
2. PTX/Cluster running DYNIX/PTX 4. 4. x 일 경우
* Oracle V7. 3. 3 : 현재 fix된 patch는 없으며 다음과 같은
workaround 방법으로 해결이 가능함. 
Workaround)
--- $ORACLE_HOME/rdbms/lib/ins_rdbms. mk file에 아래의 추가된 부분만
삽입하여 오라클 kernel relink 실시
(예:make -f ins_rdbms ioracle)
oracle: $(ORALIBD) $(CORELIBD) $(NETLIBD) $(KSMS) $(CONFIG)
$(PSOLIBLIST) opimai. o @$(ECHO) $(LINK) -o $@ $(LDFLAGS)
$(LDFLAGS_ORA) opimai. o $(CONFIG) \
-llkseqora \ ---> 추가된 부분
$(LLIBSERVER) $(LLIBORA) $(LLIBKNLOPT) $(LLIBSLAX)
$(LLIBPLSQL) \
$(LLIBSICX) $(LLIBSOWSUTL) \
$(LLIBSICX) $(LLIBSOWSUTL) \
. . . . . . . . . . . 
. . . . . . . . . . . 
* Oracle V7. 3. 4 :
Oracle V7. 3. 4 일 경우는 문제가 없으나 patchset을 적용할 경우
V7. 3. 4. 2에서는 V7. 3. 3과 같은 방법으로 oracle kernel을 relink하면
문제가 해결됨. 

### ORA-0376 : file %s cannot be read at this time
- 원인 : DBF가 파손됨. 
- 조치 : Check the state of the file.  Bring it online

### ORA-00376: file 29 cannot be read at this time
ORA-01110: data file 29: '/db/GICORP_4/axix01. dbf'
- 원인 : datafile의 size가 os에서 허용하는 filesize를 초과해서 발생. 
- 조치 : unix의 ulimit filesize를 확인해 보시기 바랍니다. 
그리고 datafile size 보다 크도록 수정해 주어야 합니다. 
1. unix ulimit filesize를 증가 시킨다
C shell인 경우
% limit filesize
Bourne 이나 Korn shell 인 경우
$ ulimit -f
2. archivelog mode인지 확인합니다
SVRMGR> select * from v$database;
NAME CREATED LOG_MODE CHECKPOINT ARCHIVE_CH
  --  
GICORP 05/17/00 13:44:56 ARCHIVELOG 36290290 36284249
1 row selected. 
3. media recovery가 필요한 datafiles를 찾습니다
SVRMGR> select * from v$recover_file;
FILE# ONLINE ERROR CHANGE# TIME
 -- ---  
9 OFFLINE 36287415 12/20/00 23:30:55
23 OFFLINE 36289350 12/21/00 08:40:54
28 OFFLINE 36287415 12/20/00 23:30:55
29 OFFLINE 36287415 12/20/00 23:30:55
37 OFFLINE 36287415 12/20/00 23:30:55
5 rows selected. 
4. 각각의 datafile에 대해서 다음을 실행해 줍니다
SVRMGR> recover datafile '/db/GICORP_4/axix01. dbf';
Media recovery complete. 
SVRMGR> alter database datafile '/db/GICORP_4/axix01. dbf' ONLINE;
Statement processed. 
5. database를 restart합니다
SVRMGR> shutdown
Database closed. 
Database dismounted. 
ORACLE instance shut down. 
SVRMGR> startup
ORACLE instance started. 
Total System Global Area 54578916 bytes
Fixed Size 69348 bytes
Variable Size 20783104 bytes
Database Buffers 33554432 bytes
Redo Buffers 172032 bytes
Database mounted. 
Database opened. 
SVRMGR>

### ORA-0312,0313 에러(ONLINE LOG CRASH)
- 원인 : 1. 데이타베이스 STARTUP 시 발생
- 조치 : [ ONLINE LOG 가 손상되었을때 DB에 OPERATION 이 없었던 경우는 다음과 같은 절차로 DB을
OPEN 할수있다 - 확률 70% ]
1. CONTROLFILE 생성
-.  손상된 online log 는 포함시키지 않는다. 
-. resetlogs option 으로 생성한다. 
-. reuse option 은 생략하고 기존 controlfile 은 다른이름으로 move 시킴. 

sqldba> startup mount
sqldba> alter database backup controlfile to trace;
위와 같이 명령을 입력하면 ORACLE_HOME/rdbms/log 디렉토리에 트레이스 화일이
생긴다.  그 트레이스 화일에서 create controlfile 명령부분을 남기고 삭제한다. 
콘트롤화일 생성 문장 예 - : GROUP 1 이 ONLINE LOG 라고 가정

CREATE CONTROLFILE DATABASE "RC722" RESETLOGS NOARCHIVELOG
MAXLOGFILES 32 ********
MAXLOGMEMBERS 2
MAXDATAFILES 30
MAXINSTANCES 8
MAXLOGHISTORY 800
LOGFILE
GROUP 2 '/oracle/oracle/dbs/log2RC722. dbf' SIZE 5M,
GROUP 3 '/oracle/oracle/dbs/log3RC722. dbf' SIZE 5M
DATAFILE
'/oracle/oracle/dbs/systRC722. dbf',
'/oracle/oracle/dbs/rbsRC722. dbf',
'/oracle/oracle/dbs/toolRC722. dbf',
'/oracle/oracle/dbs/usrRC722. dbf',
'/oracle/oracle/dbs/tempRC722. dbf',
'/oracle/oracle/rcdata. dbf'
;
2. 절차
$ sqldba lmode=y
SQLDBA> connect internal
SQLDBA> shutdown abort
SQLDBA> startup nomount
statement processed
SQLDBA> @cnt
SQLDBA> recover database using backup controlfile until cancel;
. . . . 
. . . 
CANCEL (Return)
Recovery canceled
SQLDBA> alter database open resetlogs;
: 만일 정상적으로 open 되면 log file 추가
SQLDBA> alter database add logfile '?/dbs/log1ORA722. dbf' size 1M;
: 정상적으로 open 안되면 RC에 다시 연락

### ORA-0439
- 원인 : BITMAP INDEXES 생성 시 option 이 인스톨되지 않아서 발생
- 조치 : 반드시 Oracle 8 Enterprise Edition 에서만 사용이 가능하다. 
Oracle 8i 에서도 동일하게 적용된다. 

### ORA-0600[3339] DATA BLOCK CORRUPTION DETECTION
[3339] [arg1] [arg2] [] [] [] []
ORA-1578 : Data block corrupted in file # block #
- 원인 : 1. ORACLE이 직접 버퍼로 데이타를 읽어들일 때 읽은 블럭의 DBA(Data Block Address)가 잘못
되었음(INVALID)을 의미
2. ORACLE의 문제가 아니라 OS나 HW의 문제인 경우가 많다. 

### ORA-0604: error occurred at recursive SQL level %s
- 원인 : 1. 내부적으로 SQL명령이 실행될 때 발생(현재 할당된 익스텐트가 가득 차서 다음 익스텐트를
할당 받으려고 할 때 오라클이 다음 익스텐트의 크기와 위치를 결정하기 위하여 SELECT
명령을 내리게 되는 것과 같은 경우)
2. init. ora 화일의 파라미터 가운데 DC_FREE_EXTENTS 나 ROW_CACHE_ENQUEUES 의 값이 너무
작게 설정
3. 테이블 스페이스가 가득 차거나 Extent 갯수의 최대 허용값을 초과해서 에러가 발생하는
경우 ORA-604 에러가 함께 발생
- 조치 : 1. ?/dbs/init. ora 화일에 지정된 open_cursors 의 크기를 알아보는 것이다.  이 값이
설정이 안되어 있으면 Default가 50이므로
open_cursors=255
-
2. DC_FREE_EXTENTS 나 ROW_CACHE_ENQUEUES들의 값을 크게 설정
3. 에러의 - 원인을 찾기 위해서 init. ora 화일에 다음과 같은 라인을 추가한다. 
events = "604 trace name errorstack"
이렇게 init. ora를 변경하고 DB를 Shutdown 하고 Startup 하면 ORA-0604 에러가 발생하는
경우에 자세한 정보를 Trace 화일에 기록해 주므로 이 화일을 검사하여 에러의 - 원인을
찾을 수 있다. 

### ORA-0901 invalid CREATE command
- 원인 : CREATE 뒤에 오는 KeyWord를 식별하지 못한 경우

### ORA-0902 invalid dadatype
- 원인 : Oracle에서 제공되지 않은 datatype를 사용한 경우

### ORA-0903 invalid table name
- 원인 : 테이블의 이름이 Oracle object 명명에 대한 필요조건을 만족시키지 못한 경우

### ORA-0904 열명이 부적합합니다. 
- 원인 : 컬럼이 테이블에 존재하지 컬럼을 사용한 경우

### 083147. gold!stmkdjc. 22031: LIBTUX_CAT:522: INFO: Default tpsvrdone() function
used
ORA-0904 : invalid column name
ORA-1003 : no statement parsed
- 원인 : 1. 해당 Table에 존재하지 않은 Field를 사용한 경우
2. Host Variable 앞에 ":"를 덧붙지지 않은 경우
3. 해당 Table를 변경하고 관련된 프로그램을 컴파일하지 않은 경우
- 조치 : 1. 해당 Table에 Column이 존재하는지 확인
2. Host Variable 앞에 ":"를 덧붙인다. 
3. 해당 Table에 관련된 프로그램를 컴파일한다. 

### ORA-0906 missing left parenthesis
- 원인 : 왼쪽 괄호를 찾지 못한 경우에 발생

### ORA-0907 missing right parenthesis
- 원인 : 오른쪽 괄호를 찾지 못한 경우에 발생

### ORA-0910 specified legth too long for its datatype
- 원인 : 특정 datatype의 길이가 허용 최대 길이를 초과한 경우

### ORA-0911 invalid character
- 원인 : Oracle이 뮤효 문자라고 간주하는 것을 만날 때 발생한 에러로 실제문제는 없어진 문자때문

### ORA-0913 too many value
- 원인 : INSERT문에서 지정된 열의 수보다 열 값의 수가 적으면 발생

### ORA-0917 missing comma
- 원인 : 1. Comma를 기대하고 있는 SQL문에 comma가 없는 경우
2. 오른쪽 괄호가 없는 경우에도 발생

### ORA-0918 column ambiguously defined
- 원인 : 1. 둘 이상의 테이블이 한 SQL문에서 참조될 때 발생
2. 한개 이상의 지정된 테이블에 존재하는 어떤 열이 해당 테이블로 한정받지 못한 경우

### ORA-0920 invalid relational operator
- 원인 : 관계 연산자를 식별하지 못한 경우

### ORA-0921 unexpected end of SQL command
- 원인 : 불완전한 SQL문일 경우에 발생

### ORA-0922 missing or invalid option
- 원인 : option에 임의의 문자가 삽입됨(예:NOT NULL --> NOT_NULL)

### ORA-0932 inconsistent datatype
- 원인 : 1. 어떤 연산자를 어떤 열에 적용시키려고 하는데 그것의 datatype을 연산자와 함께 사용한 경우
2. ORA-0997 illegal use of LONG datatype을 복귀시킬 가능성

### ORA-00933: SQL command not properly ended
- 원인:

### ORA-0934 group function is not allowed here
- 원인 : SQL문의 WHERE구나 GROUP BY구에서 Group function를 사용한 경우

### ORA-0936 missing expression
- 원인 : 1. Comma 기술 뒤에 열이나 표현식이 존재하지 않은 경우에 발생
2. ORA-0917 missing comma을 복귀시킬 가능성

### ORA-0937 not a single-group group function
- 원인 : 어떤 SQL문의 선택 list는 어떤 열이 GROUP BY구에서 참조되지 않으면 그열과 Group function를
포함할 수 없다. 

### ORA-0938 not enough arguments for function
- 원인 : SQL문이 불충분한 수의 인수로 함수를 호출한 경우에 발생

### ORA-0942 : table or view does not exist(테이블 또는 뷰가 존재하지 않습니다. )
- 원인 : Oracle은 테이블이나 뷰가 존재하지만 사용자가 테이블이나 뷰를 위한 오브젝트 특권(Grant)을 부여하지 않음
- 조치 : Table 생성 및 권한부여

### ORA-0947 not enough values
- 원인 : INSERT문에서 지정된 열의 수가 열 값의 수보다 클때 발생

### ORA-0979 not GROUP BY expression
- 원인 : 어떤 query의 선택 list 안의 한 열이 GROUP BY구에 들어있고 다른 열은 들어있지 않은 경우에 발생

### ORA-0997 illegal use of LONG datatype
- 원인 : 1. 어떤 기능들은 datatype이 LONG인 열에서 수행되지 않는다. 
2. Long column은 2G까지 지원을 하지만,
SQL*Plus에서 insert into 문장을 이용하여 long column에 넣을 문자열을
single quote(') 안에 기술 시, 2000 characters가 넘으면 ora-1704 에러가 난다. 
- 조치 : 1. TABLE의 COPY는 가능하지 않으므로,LONG COLUMN을 가진 테이블을 COPY하고자 할 때,
32KBytes 이하의 size라면 다음의 PL/SQL을 사용하면 가능하다. 
2. PL/SQL을 이용해야 하며, 경우에 따라 Pro*C, SQL*Loader 등을 이용하여 insert해야만 한다. 

### ORA-1001 Invalid Cursor
- 원인 : Typing 에러, 잘못된 메모리 관리 등의 여러가지 - 원인에 의해서 발생. 
- 조치 : 1. 환경에서 조치할 사항
- PRECOMPILE 옵션 가운데 MAXOPENCURSORS 를 늘려준다. 
- init. ora 화일에서 OPEN_CURSORS 파라미터 값을 늘려준다. 
- 사용되지 않는 CURSOR는 OPEN 상태로 두지 말고 CLOSE 시켜준다. 
- 지금은 거의 사용되지 않지만 ORACLE V6 를 사용한다면 PRECOMPILE 옵션 가운데
AREASIZE를 512K 정도로 크게 늘려주도록 한다.  그리고 init. ora 에서
CONTEXT_AREA 값도 늘려준다 . 
- TRACE FILE을 이용하면 문제의 - 원인을 찾는데 있어 유용할 때가 있다. 
2. 그 밖의 경우
- OPEN 되지 않은 CURSOR 에 대해서 작업을 할 때
- 존재하지 않는 OBJECT에 대해서 SQL 명령을 실행할 때
- CURSOR CACHE로부터 삭제된 경우
- CURSOR CACHE로부터 삭제된 또다른 경우
PRECOMPILE 옵션 가운데에서 MAXOPENCUSORS 를 늘려주거나
HOLD_CURSOR=YES, RELEASE_CURSOR=NO 로 설정
- XA/TUXEDO 환경에서 ORA-1001 에러가 발생하는 경우(일부 ORACLE 버젼에서 발생)

### ORA-1002 FETCH OUT OF SEQUENCE IN PRO*C(stop[]:리스너를 중단합니다. 
- 원인 : 1. user가 더이상 유효하지 않은 cursor로부터 fetch를 하려고 하기 때문
2. ORA-1403 등과 같이 NO DATA FOUND를 return하는 fetch작업을 수행할때
3. SELECT FOR UPDATE를 가진 cursor 의 fetch작업내에 commit이 있는 경우
- 조치 : 3. commit을 fetch loop의 바깥쪽으로 빼거나 select for update문을 사용하지 않아야 한다. 

### ORA-1012 Error( not logged on )가 발생
- 원인 : 1. tpbegin()이 되어 있지 않음
2. PC쪽에서 NOTRAN Mode로 Service를 호출
- 조치 : 1. Program을 확인한다. 
2. flag를 0으로 Setting한다. (TRAN Mode로 Service 호출)
3. Service절에 Default에 AUTOTRAN을 "Y"로 설정하고 해당 Service명을 기술한다. 

### ORA-1027 bind variables not allowed for data definition operations
- 원인 : WHERE에 BIND_VAR 를 이용한 CREATE VIEW 는 불가능
- 조치 : 이 경우 EXEC SQL CREATE TABLE IMAGE
(EMPNO NUMBER(4) NOT NULL, BITMAP LONG RAW)
END-EXEC. 
이 처럼 create 해야 한다. 

### ORA-1031 insufficient privileges
- 원인 : 사용자가 테이블이나 뷰와 연관된 적어도 한 개의 object 특권을 부여받았지만 SQL문에서 지정된
특권을 부여받지 않았을 때 발생
1. ORACLE의 SYSTEM 유저에 POWERBUILDER의 BASE TABLE 5개가 생성이 되어 있지
않은 경우
2. SYSTEM 유저로 접속한 후에도 일반 유저가 접속이 되지 않을 경우
- 조치 : 1. 5개 base table(pbcatcol, pbcattbl, pbcatfmt, pbcatvld, pbcatedt)을
drop한 다음 system 유저로 접속을 하고, 다시 일반 유저로 접속하는 방법. 
2. system 유저로 들어가서 5개 base table에 대한 사용 권한을
일반 유저에게 주는 방법. 
$sqlplus system/manager
SQL>grant all on pbcatcol to public;
SQL>grant all on pbcatedt to public;
SQL>grant all on pbcatfmt to public;
SQL>grant all on pbcattbl to public;
SQL>grant all on pbcatvld to public;

### ORA-1034, "ORACLE not available"
ORA-7320, "smsget: shmat error when trying to attach sga. "
ORA-7429, "smsgsg: shmget() failed to get segment. "
- 원인 : ORACLE DBA 사용자만 데이타베이스를 ACESS할수 있고 다른 사용자는 SQL*PLUS 등을 통하여
CONNECT를 하려고 할때 다음 에러가 발생 할경우

### TPFAILED . . . . . . . . . . . . . . . . . . . . . . 
sqlca. sqlcode ==> -1036
ORACLE에서 단독으로 실행하면 문제가 발생되지 않고 OUTPUT을 정확하게 출력하지만
TP/M와 함께 실행이 되면 SQL SELECT문을 수행하지 못하고 sqlca. sqlcode ==> -1036의
MESSAGE를 뿌리고 실행을 멈춘다. 
- 원인 : ORACLE에서 Version간의 Segment 정의부분이 다르기 때문
- 조치 : makefile 혹은 proc. mk file에서
sqlcheck=semantic userid=scrjpcs/scrjpcs를 포함시킨다. 

### ORA-1039: insufficient privileges on underlying objects of the view. 
- 원인 : SYS user가 아닌 다른 user로 SQL Analyze에 로그인하여 SQL statement에 대한 explain plan 옵션을 사용할 때 다음과 같은 에러가 발생
- 조치 : 1. dictionary table/view들을 validate시켜 놓으려면 dba가 read 권한만 SQL Analyze를 수행하는 user에게 grant하면 충분하다. 
2. SYS user로서 SQL explaining을 수행하는 것이다. 

### ORA-9992 scumnt: failed to open
ORA-9993 scumnt: failed to lock
ORA-1102 cannot mount database in exclusive mode
- 원인 : 서로 독립적인 두개의 instance가 동일한 database file들을 동기화 (synchronisation)없이 access할 수 있기 때문에 database corruption을 유발시킬 수 있었다. 
- 조치 : database의 db_name이 변경되면 각각의 lk file을 생성. 

### ORA-01118: cannot add any more database files: limit of XXX exceeded
- 원인 : 데이타 화일의 갯수가 MAXDATAFILES 값에 도달한 경우 발생
- 조치 : MAXDATAFILES를 늘리기 위해서는 DB를 새로 만들어야 하며 그 이후 버젼을 사용중이라면 콘트롤
화일을 새로 만들어서 MAXDATAFILES를 늘릴 수 있다

### ORA-1157 : cannot identify data file 11 - file not found
ORA-1110 : data file 11 : '/user1/oracle7/dbs/user2. dbf'
- 원인 : OS 명령으로 DATA FILE 을 삭제한 경우
- 조치 : DATABASE STARTUP시 STARTUP MOUNT 단계까지 실행한 후, 문제의 데이타 화일을 OFFLINE 시킨다. 
데이타베이스를 오픈한다.  단 데이타베이스 오픈이 정상적으로 수행되면 문제가 발생한 데이타
화일을 포함하고 있는 TABLESPACE를 DROP하지 않을 경우에는 DATABASE STARTUP시 항상 데이타
화일의 오픈 단계에서 에러가 발생된다.  따라서, 문제의 데이타 화일의 OFFLINE과 TABLESPACE의
DROP전에 반드시 해당 TABLESPACE를 사용하고 있는 USER의 데이타 백업을 수행해야 한다. 
데이타 화일의 OFFLINE과 관련된 명령은 다음과 같다. 
SQLDBA를 COMMAND LINE MODE로 기동시킨다. 
$ sqldba lmode=y
SQLDBA> CONNECT INTERNAL;
SQLDBA> STARTUP MOUNT;
ORACLE instance started. 
Database mounted. 
SQLDBA> ALTER DATABASE DATAFILE '/user1/oracle7/dbs/user2. dbf'
OFFLINE DROP;
Statement processed. 
SQLDBA> ALTER DATABASE OPEN;
Statement processed. 
SQLDBA> DROP TABLESPACE tablespace_name INCLUDING CONTENTS;
Statement

### ORA-01237 cannot extend datafile %s
- 원인 : O/S 레벨에서는 file size를 1TB 이상 지원한다고 하는데, oracle datafile을 2G 이상으로 resize하려고 한다거나 tablespace에 datafile을 추가하거나 생성할 때, 2G 이상 주면 file size limit에 걸리는 현상 발생
- 조치 : 화일 시스템에서 large file을 사용하기 위해서는 화일 시스템을 'largefiles' option으로 mount해야 한다. 

### ORA-1400 primary key or mandatory(NOT NULL) column is missing or NULL during insert
- 원인 : 어떤 필수적인 열을 위한 값을 공급하지 않은 경우

### ORA-1401 inserted value too large for column(열에 입력한 값이 너무 큽니다. )
- 원인 : 문자열을 할당하고자 할때 길이가 최대치를 초과한 경우

### ORA-1403 no dada found
- 원인 : 사실상 전혀 Error가 아니다. 

### ORA-1405 fetched column value is NULL
- 원인 : ERROR 가 아니고 WARNING MESSAGE 이다. 
- 조치 : dbms=v6 를 PRECOMPILER OPTION 에 추가해준다.  dbms=v6 로 SETTING 할경우는 HOST 변수에
NULL 이 RETURN 되더라도 sqlca. sqlcode 는 0 이 된다. 

### ORA-1407 cannot update mandatory(NOT NULL) column to NULL
- 원인 : 필수적인 열의 값을 NULL에 설정한 경우에 발생

### ORA-1408 such column list already indexed
- 원인 : 이미 동일한 열 List에 기초한 Index를 갖고 있는 Table에서 Index를 작성하고자 하는 경우에 발생

### ORA-1410 invalid ROWID
- 원인 : 1. 적절한 Format으로 ROWID를 상술하지 않은 경우에 발생
2. 지정된 ROWID가 존재하지 않은 경우에 발생

### ORA-01438: 지정한 정도를 초과한 값이 열에 지정되었습니다. 
- 원인 : 지정한 자릿수를 초과한 Column이 존재한 경우에 발생

### ORA-01422: exact fetch returns more than requested number of rows
ORA-06512: at "SYS. STANDARD", line 648
ORA-06512: at "BETH. BETH", line 6
ORA-06512: at line 1
- 원인 : SELECT 문에서 조건에 해당하는 row가 2건 이상
return되었을 때 발생하는 TOO_MANY_ROWS 에러와 동일한 에러이다. 
- 조치 : 확인한 결과 DUAL table에서는 비록 2개의 ROWID를 볼 수는 없지만,
실제 2개의 row가 DUAL table에 존재하는 상황이다. 
따라서, 다음 명령을 이용하여 여분의 필요없는 row를 delete해야 한다. 

### ORA-1449 column contains NULL values; cannot alter to NOT NULL
- 원인 : 어떤 열을 필수적인 것으로 변경하고자 하나 적어도 테이블 내의 한 행이 그 열을 위한 NULL값을
가질 때 발생

### ORA-1452 cannot CREATE UNIQUE INDEX; duplicate keys found
- 원인 : 값이 독특하지 않은 일련의 열에서 독특한 인덱스를 작성한 경우에 발생

### ORA-1453 SET TRANSACTION must be first statement of transaction
- 원인 : 모종의 다른 SQL문 이후에 SET TRANSACTION문을 기동할 때 발생

### ORA-01458 Invalid length inside variable character string
- 원인 : DB Table field의 길이와 Host Variable의 길이 차이가 있을때 발생한다. 
그러므로 Table field의 길이와 Host Variable의 길이를 비교해 본다.  혹은 Stored
Procedure의 Input Parameter가 Null 값으로 넘겨질 때도 발생한다. 
- 조치 : DB Table field와 Host Variable의 길이를 조정한다. 
Stored Procedure의 Input Parameter에 Null값을 0의 값을 채워서 넘긴다. 
주의 : Stored Procedure에서 Cursor를 사용할 때
FOR . . .  LOOP를 사용할 때 주의를 해야한다. 
FOR i IN 1. . batch_size LOOP
FETCH get_emp
INTO
emp_name( i )
,job( i )
,sql( i )
;
IF get_emp%NOTFOUND THEN -- if no row was found
CLOSE get_emp;
done_fetch := 100; -- indicate all none
EXIT;
ELSE
done_fetch := 900; -- indicate all none
found := found + 1; -- count row
END IF;
END LOOP;
에서 Fetch Array의 0번째에 Data를 저장할 때 문제가 생긴다. 
그러므로, emp_name( 0 )이라고 하면 Error를 발생한다. 

### ORA-01476: divisor is equal to zero
- 원인 : Zero값으로 임의의 수를 나누었을때 발생

### ORA-01480: trailing null missing from STR bind value
- 원인 : 1. 해당 Column의 Size 보다 더 큰 값이 들어온 경우에 발생
2. Character Type(CHAR, VARCHAR)의 Host variable인 경우 변수 선언시 Table의 Column size 만큼의 변수길이를 선언한 경우 발생
- 조치 : 1. 해당 Column의 Size와 해당값을 확인
2. Character Type(CHAR, VARCHAR)의 Host variable인 경우 변수 선언시 Table의 Column size에 1를 더해 주어야 한다. 
(데이터의 마지막에 NULL 문자를 포함해야 하기 때문에)

### ORA-1481 invalid number format model
- 원인 : 어떤 숫자 Format Model이 미정의 문자를 포함한 경우에 발생

### ORA-1547 : Failed to allocate extent of size 'num' in tablespace 'TOOLS
- 원인 : TABLESPACE가 에러에 명시된 ORACLE block 수 만큼의 요청된 EXTENT를 할당할 충분한 FREE
SPACE를 갖고있지 못할 경우에 발생
- 조치 : 1. 해당 TABLESPACE내에서 연속된 영역의 ORACLE block 할당할 수 있도록 데이타 화일을 추가
2. TABLE의 STORAGE PARAMETER에서 INITIAL EXTENT, NEXT EXTENT의 크기를 조정하여 TABLE을
재구축
3. 다음의 방법으로는 관련 TABLESPACE를 재구성하는 것

### ORA-1552 (CANNOT USE SYSTEM ROLLBACK SEGMENT FOR NON-SYSTEM TABLESPACE '%S')
- 원인 : SYSTEM TABLESPACE 이외의 TABLESPACE를 포함한 OPERATION을 위하여 SYSTEM TABLESPACE의
ROLLBACK SEGMENT를 사용할 경우에 발생
- 조치 : SYSTEM TABLESPACE에 하나 이상의 ROLLBACK SEGMENT를 추가한 다음, 데이타베이스 오브젝트를
생성

### ORA-1555 Snapshot Too Old
- 원인 : 
1. 데이타의 변경이 심한 데이타베이스에서 롤백 세그먼트의 갯수와 크기가 작을 경우에 발생
2. 롤백 세그먼트가 손상되어 읽을 수 없게 된 경우
3. Fetch Across Commit(테이블에 대하여 Query가 커서를 열고 루프 내에서 데이타를 Fetch
하고 변경하고 커밋하는 과정에서 발생)
4. Delayed Block Clean Out(데이타 블럭이 변경되고 커밋되면 오라클은 롤백세그먼트 헤더에
그 트랜잭션이 커밋되었다고 기록하지만 데이타 블럭을 바로 변경하지는 않는다 (Fast
Commit).  그리고 다음 트랜잭션이 변경된 블럭을 요구할 때야 비로소 변경 시키는것
- 조치 : 1. 커서가 Open된 상태에서는 커밋을 자주하지 않고 롤백 세그먼트 크기를 키워 나가도록
2. 커서를 사용하기 전에 Full Table Scan을 해주면 예방이 가능

### ORA-1562(Failed to extend rollback segment(id = %s))
- 원인 : 1. 사용중인 ACTIVE 상태의 ROLLBACK SEGMENT가 다음 EXTENT를 할당하고자 할 경우
2. 해당 ROLLBACK SEGMENT에 대하여 발생 가능한 최대 EXTENT 수를 초과할때 발생
- 조치 : ROLLBACK SEGMENT의 재생성

### ORA-01578: ORACLE data block corrupted (file # 6, block # 3)
ORA-01110: data file 6: '/tmp/ts_corrupt. dbf'
- 원인 :
- 조치 : 해당 objects를 drop하고 recreate하여 처리

### ORA-01578
- 원인 : data block 에 corruption 이 생긴 경우에 발생. 
- 조치 :
 1. 최선의 해결책은 backup 받아둔 file 을 restore 한 후 recover 작업을 하는 것이다. 
2. backup datafile 을 restore 하고 recover 하지 않을 것이라면 우선, 어떤 object 에서 corruption 이 발생하였는지 확인해야 한다. 
3. 해당 segment 가 non-data dictionary index 라면, 해당 index 를 drop 한 후 재생성한다. 
4. 해당 segment 가 table 이라면, corruption 이 발생한 block 의 data 는 소실된 것이다. 
5. 만약 해당 table 에 대한 최근의 export dump file 이 존재한다면, 해당 table 을 drop 한 후 import 함으로써 복구할 수 있다. 
6. corruption 이 발생한 non-clustered table 에서 corrupted block 을
access 하지 않고 나머지 data 들을 select 할 수 있도록 ROWID 를 이용할
수 있다. 
7. 만약 data dictionary 에 속하는 table, index 또는 rollback segment에
corrupted block 이 발생하였다면 Oracle Support 의 지원을 받는다. 
8. 일반적으로, ORA-1578 은 hardware 의 문제때문에 유발된다.  하지만 만약에
ORA-600[3374] 가 발생한다면 memory 상에서 corruption 이 발생한
경우이다.  이 경우 database 를 restartup 하면 문제가 해결될 수 있다. 

### ORA-1591(Pending Transaction의 처리)
- 원인 : 분산 트랜잭션의 경우 2 phase commit수행 단계중에 fail이 발생하게 되면 관여된 일부 database에서는 rollback 혹은 commit이 되고, 일부는 distributed lock이 걸린 상태로 계속 지속될 수 있다. 
이렇게 pending된 transaction에 대해서는 기본적으로 Oracle의 background process인 RECO process가 자동으로 정리하여 주나, 경우에 따라 자동으로 정리가 되지 못하는 상황이 발생
- 조치 : STEP 1: alert. log file을 check한다. 
STEP 2: network 환경을 확인한다. 
STEP 3: RECO process가 떠 있는지 확인한다. 
STEP 4: DBA_2PC_PENDING을 조회해 본다. 
STEP 5: DBA_2PC_NEIGHBORS view를 조회해 본다. 
STEP 6: commit point site를 확인한다. 
STEP 7: DBA_2PC_PENDING의 MIXED column을 확인한다. 
STEP 8: DBA_2PC_PENDING의 STATE column의 값을 확인한다. 
STEP 9: 불일치 사항을 파악하고 DBA_2PC_PENDING을 정리한다. 
2PC에서 1st phase commit(xa_prepare)이 정상적으로 종료되면 Oracle의 dba_pending_transaction에 해당
Transaction에 대한 정보가 나타난다. 
formatid 40
globalid 636861656A750000000000000000000000000000000000
5B5103A6BEC9900000DE8
branchid 0000006600000065
이 상태에서 일정한 시간 내에 2nd phase commit(xa_commit)에 끝나지 않으면 dba_2pc_pending에도 이
Transaction이 나타난다. 
local_tran_id 4. 24. 3026
global_tran_id 40. 636861656A750000000000000000000000000000000000
5B5103A6BEC9900000DE8
state prepared
mixed no
advice
tran_comment
fail_time
force_time
retry_time
os_user jun
os_termina
host chaeju
db_user
commit# 5332231
위에서 "일정한 시간"이란 용어를 사용했는데 Oracle의 문서에는 이에 관한 정확한 언급은 없다. 
다만, 다른 Transaction에서 해당 레코드를 참조하려고 할 때 이미 lock이 걸려 있으므로 대기하는
시간에 대해서는 init. ora에서 지정하는 distributed_lock_timeout에 대해서만 언급하고 있다.  그런데
oracle 8. 1. 7에서는 distributed_lock_timeout을 설정하면 obsolete로 나온다. 
이 시간 동안에 해당 레코드에 대한 lock이 풀리지 않으면 아래와 같은 에러를 만난다. 
ORA-02049: time-out: distributed transaction waiting for lock
위의 에러가 발생한 이후에 이 레코드를 참조하려고 하면 1591 에러가 나타난다. 
ORA-01591: lock held by in-doubt distributed transaction '4. 24. 3026'
보는 것처럼 ORA-01591 에러 메시지에는 local_tran_id가 있다.  이를 이용하여 dba_2pc_pending에서
global_tran_id를 조회하고, 이 데이터는 dba_pending_transaction의 formatid와 globalid로 이루어져
있으므로 이를 이용하여 dba_pending_transaction에서 branchid도 얻을 수 있다. 
이들로 부타 아래와 같이 XID를 얻을 수 있다. 
xid. formatid = dba_pending_transactions. formatid
xid. gtrid_length = len(dba_pending_transactions. globalid)
xid. bqual_length = len(dba_pending_transactions. branchid)
xid. data = dba_pending_transactions. globalid + dba_pending_transactions. branchid
여기까지는 Oracle로 부터 XID를 얻는 과정이다. 
tpconvert(str, (char *)&xid, TPTOSTRING | TPCONVXID)를 이용하여 XID의 string 표현을 얻을 수 있고
이값을 이용하여 . TMIB 서비스를 호출하면 아래와 같은 정보를 얻을 수 있다. 
TA_ERROR 0
TA_MORE 0
TA_OCCURS 1
TA_GRPCOUNT 2
TA_GRPINDEX 0
TA_GRPNO 102
TA_GRPNO 101
TA_TIMEOUT 9
TA_COORDGRPNO 102
TA_CLASS T_TRANSACTION
TA_STATE READY
TA_COORDLMID SITE1
TA_GSTATE READY
TA_GSTATE READY
TA_TPTRANID 0x0 0x3a6bec99 0xde8 0x28 0x0 0x0
TA_XID 0x0 0x3a6bec99 0xde8 0x28 0x66
TA_COORDSRVGRP APPGRP2
TA_LMID SITE1
TA_SRVGRP APPGRP2
TA_SRVGRP APPGRP1
위의 경우에는 아직 Tuxedo가 transaction에 대한 정보를 가지고 있기 때문에 별다른 조치가 필요없다. 
하지만, Oracle의 dba_2pc_pending에는 있는데 Tuxedo에서 해당 Transaction에 대한 정보를 가지고
있지 않은 경우에는 Oracle에서 rollback force나 commit force를 이용하여 pending transaction을
정리해 주어야만 lock이 풀린다. 

### ORA-1628, 00000, "max # extents (%s) reached for rollback segment %s"
ORA-1630, 00000, "max # extents (%s) reached in temp segment in tablespace %s"
ORA-1631, 00000, "max # extents (%s) reached in table %s. %s"
ORA-1632, 00000, "max # extents (%s) reached in index %s. %s"
- 원인 : 오브젝트의 익스텐트가 MAX # 에 도달 했기 때문에 발생되며 오브젝트의 MAXEXTENTS는
STORAGE 의 MAXEXTENTS 파라미터에 의해 결정
- 조치 : ALTER TABLE . .  STORAGE (MAXEXTENTS n)를 사용하여 최대 MAXEXTENTS 값보다 작은 수로
MAXEXTENTS를 늘려준다. 

### ORA-1652, 00000, "unable to extend temp segment by 6144 in tablespace "VESSEL"
- 원인 : 테이블이나 인덱스 등을 만들 때 자신의 TEMP TABLESPACE 가 아닌 곳에서 ORA-1652(temp
tablespace가 부족함) 에러가 발생
- 조치 : 에러메시지에서 보여주는 대로 해당 테이블스페이스에 Temporary Segment 가 생성될 만한
연속된 공간을 마련하여 주는 것

### ORA-1653
- 원인 : 특정 tablespace 에 space 가 부족해서 table의 extent가 일어나지 못해서 발생
- 조치 : user의 default tablespace 를 변환한 후, 이 default tablespace
안에 create table을 다시 한 후 sql*loader 를 실행한다

### ORA-1654 ERROR ON INDEX SEGMENT
- 원인 : tablespace가 적어 extent 영역을 할당할 수 없어서 발생
- 조치 : datafile을 추가 시 이전값 이상의 사이즈를 추가해야 함. 

### ORA-1722 invalid number
- 원인 : 수치값이 불법일 경우

### ORA-1747 열명을 올바르게 지정해 주십시요. 
- 원인 : 열명이 다른 경우(SQL문장 기술시 첫번째 열명 앞에 Comma를 삽입한 경우)

### tb_ra315 insert error ORA-02291: integrity constraint (SCRJAPPR. A315_E007_FK)
violated - parent . . . . 
- 원인 : Table과 관련된 Reference 관계로 parent table의 data가 없는 관계로 data 입력불가
- 조치 : Reference 관계를 끈어주든지 아니면 관계된 Table에 Data를 모두 입력하는 방법. 

### ORA-02303: cannot drop or replace a type with type or table dependents
- 원인 : Type이나 table의 dependency가 있는 type을 drop하거나 replace하고자 할 때 발생. 
- 조치 : SQL Reference guide에 의하면 DROP TYPE FORCE 옵션은 recommend하지 않는다. 
왜냐하면 이 옵션을 쓰게 되면 복구가 불가능하고 dependency가 있던 table들은
access하지 못하는 결과를 초래한다. 

### ORA-03113: end-of-file on communication channel
- 원인 : 
1. 이전에 작동했던 해당 instance의 shared memory segment들이 아직 system에 남아있어서 발생. 
2. 서버의 Oracle 쉐도 프로세스가 예기치 않게 종료된 경우 발생. 
3. SQL*NET 드라이버가 Unix의 ORACLE 실행 파일과 연결되지 않아 발생한 경우. 
4. 서버쪽의 기계 손상이나 네트워크 고장인 경우. 
5. 네트워크에서 두 서버가 같은 노드 이름을 가질 때에도 이 오류가 발생. 
6. 모든 - 원인은 결국 클라이언트가 서버로부터 어떤 정보를 읽으러 갔다가 거기서 더 이상 연결이 없음을 발견했다는 뜻임. 
7. Oracle XA를 사용하는 AP 서버 혹은 TMS 서버가 떠 있는 상황에서 연결된 DB를 재기동 시키거나 혹은 다른 문제로 인해서 데이터베이스와의 연결이 끊어진 경우에 발생
- 조치 : shared memory를 check하여 oracle이 소유하고 있는 shared memory segment를 삭제하여 문제를 해결. 
자동으로 재접속을 하기 위해서는 TUXWA4ORACLE(WorkAround For Oracle) 환경변수를 1로 설정하면 해당 서버가 오라클에 접근하여 3113 에러가 발생하는 순간에 재접속이 이루어진다. 
(XA 서버에만 해당되며 Non-XA 서버의 경우는 사용자 coding에 의해서 동일한 기능을 구현할 수 있다. )

### ORA-3114 Error( not connected to ORACLE )가 발생
- 원인 : ORACLE이 Shutdown 되었다. 
- 조치 : ORACLE이 떠 있는지 확인하고, Server를 새로 기동한다. 

### ORA-3121
- 원인 : SQL*NET V2를 통해 연결하려 할 때 연결 스트링에 'tns:'net접두어를 사용하지 않은 경우
- 조치 : 구버전인 SQL*NET V1의 net 접두어 (SQL*Net TCP/IP에 대한 "t:"등)를 사용하지 않도록 주의
하십시요. 

### ORA-4068 existing state of packages%s%s%s has been discarded
- 원인 : 응용프로그램 실행 중에 사용하고 있는 Stored Procedure를 Compile하는 경우에 발생
- 조치 : 응용프로그램을 재기동시킨다. 

### ORA-4091 table name is mutating, trigger/function may not see it
- 원인 : DataBase Trigger가 Transaction 내에서 변경된 테이블에 대하여 Query를 기동할 때 발생
- 조치 : 1. PL/SQL table을 생성한다. 
2. BEFORE STATEMENT trigger를 생성한다. 
3. AFTER ROW trigger를 생성한다. 
4. AFTER STATEMENT trigger를 생성한다. 
5. data insert 및 확인

### ORA-4092 cannot COMMIT or ROLLBACK in a trigger
- 원인 : 1. Trigger가 COMMIT or ROLLBACK을 실행하고자 할 때 발생
2. Trigger가 내장 프로시저, COMMIT나 ROLLBACK될 함수, 패캐지 서브프로그램을 호출한 경우

### ORA-6106,ORA-6120 NETTCP : socket creation failure
- 원인 : WIN V1. X용 SQL*NET TCP/IP는 SQLTCP. DLL과 SQLTCP1. DLL들은 ORACLE용 연결 스트링이 TCP/IP
프로토콜 스트링으로 변환되면 OCI DLL에 의해 작업 진행중에 올려집니다.  ORACLE INTERFACE
DLL은 SQLTCP. DLL을 먼저 올리려고 합니다.  이것이 실패하면 DOS TSR 버전의 드라이버를
찾습니다.  두 가지 모두 실패하면 ORA-3121 메세지가 나옵니다. 

### ORA-6108
- 원인 : 1. 부적절한 machine, 또는 machine는 맞지만 틀린 포트를 지정할 때 발생
2. TCP/IP 레이어는 모든 연결 요구를 Listener의 소켓 큐에 넣을 수 없을 경우 발생
3. 네트워크가 아주 혼잡하고 호스트에 도달하려는 중에 시간이 종료할 경우
- 조치 : 1. 클라이언트에서 호스트 Machine에 대해 ping을 실행하십시요.  대부분의 PC TCP/IP업체는
"ping" 유틸리티를 제공합니다.  클라이언트 Machine에서 다음을 입력하십시요
ping
이 방법으로 잘 되지 않으면 아마도 호스트 machine이 down된 것입니다.  IP 주소를 사용
하여 호스트에 대해 ping을 성공적으로 실행할 수 없으면, 서버의 호스트 이름을 사용하여
ping을 실행해 보십시요. 
ping
호스트 이름을 사용하여 ping을 실할 수 없으면 TCP/IP 구성을 점검하십시요.  호스트 이름
을 가지고 ping을 실행할 수 없으면, 연결 스트링에 호스트 이름을 사용하여 SQL*NET와
연결할 수 없습니다. 
2. SQL*NET TCP/IP Listener가 해당 서버에서 실행중인지 점검하십시요.  서버의 UNIX프롬프트
에서 다음을 입력하면 됩니다. 
ps -al|grep "orasrv"
이 때 최소한 한 행이 표시되어야 합니다.  그렇지 않으면 UNIX 프롬프트에서 "orasrv"
또는 "tcpctl start"를 입력하여 수화자를 띄우십시요.  SYSADMIN 특권을 가지고 해당 기계
에 로그인해야 합니다. 
3. 서버쪽에서 루프백을 할 수 있는 지, 다시 말해서 PC 클라이언트에서 지정한 것과 같은
연결 스트링을 사용하여 서버의 툴을 연결할 수 있는지 점검하십시요.  예를 들면, 서버의
SQLPLUS 또는 SQLDBA를 호출하고 서버의 SQLPLUS 또는 SQLDBA 프롬프트에서 다음을 입력
하십시요. 
CONNECT USERNAME/PASSWORD@t:/:
4. 루프백 성사되면 호스트 서버의 ORASRV 포트 번호를 확인하십시요.  (대부분의 기계에서
SERVICE 파일은 /etc 디렉토리에 있습니다. ) 또한 "tcpctl" 유틸리티를 사용하면 대부분의
UNIX 기계에서 ORACLE Listener를 시작하거나 멈출 수 있습니다.  "tcpctl stop"로 Listener
를 종료하십시요.  "tcpctl start"으로 다시 시작하십시요.  이때 시작 포트에 관한 정보가
표시됩니다. 
5. 이것이 성공하면 포트를 지정하지 말고 포트를 연결해 보십시요. 
t::
연결되지 않으면 클라이언트에서 SERVICE 파일을 정확하게 설정하 않았기 때문입니다. 
a)WINDOWS\WIN. INI를 점검하여 [Oracle] 부분의 ORA_CONFIG 매개 변수가 어떤 구성 파일을
지시하고 는지 알아보십시요.  이폴트는 다음과 같습니다. 
[Oracle]
ORA_CONFIG=C:\WINDOWS\ORACLE. INI
b)ORACLE. INI 파일을 보고 TCP_SERVICES_FILE 매개변수가 설정되었고 SERVICES 파일을 지시
하고 있는 지 확인하십시요. 
c)SERVICES 파일을 보고 다음 항목이 있는 지 확인하십시요. 
orasrv 1525/tcp oracle
6. 또한 서버가 SQL*NET V2가 아니라 SQL*NET V1을 실행중인지 확인하십시요. 
7. 결 스트링의 재시도 매개변수를 증가시켜 보십시요.  재시도 횟수를 지정하는 구문은 다음과
같습니다. 
t:host[/service]:SID[,buffer-size][:conn-retries]
conn-retries의 디폴트는 1입니다. 
8. VAX에 연결할 경우에는 VAX config. ora 파일에 다음행이 있는지 확인하십시요. 
SQLNET USERNAMEMAP*=*
이것은 VAX account가 없는 PC가 디폴트 사용자 account을 사용하여 연결 할 수 있게 해
줍니다. 

### ORA-6110 "NETTCP: message send failure"
- 원인 : Windows 클라이언트의 TCP/IP사이에 버퍼 조정문제가 있을 때 발생
- 조치 : 1. 버퍼 크기를 연결 스트링에 포함시켜 일정한 크기로 고정하는 것
t::,
연결 스트링에 버퍼 크기를 포함시킨 후에도 여전히 ORA-6110이 발생하면 더 작은 값을
사용해 보십시요.  WINDOWS용 SQL*NET TCP/IP의 기본 버퍼 크기는 4096입니다.  이것을
1024로 사용하면 대개 ORA-6110에러가 없어집니다. 
2. 서버쪽
1)서버에서 루프백을 수행할 수 있습니까? 다시 말해서 PC 클라이언트에서 지정한 것과
같은 연결 스트링을 사용하여 서버의 툴을 연결할 수 있습니까? 예를 들어 서버에서
SQLPLUS 또는 SQLDBA를 호출하고 에러가 없어집니다. 
CONNECT USERNAME/PASSWORD@t::
루프백을 실행하면 실제 문제를 더 잘 보여주는 다른 에러가 나타나는 수도 있습니다. 
2)ORA-6110은 Oracle실행 파일에 사용 권한이 정확하게 설정 되어 있지 않으면 Unix 서버에
연결할 때도 발생할 수 있습니다.  Oracle과 orasrv의 사용권한은 다음과 같이 설정되어야
합니다. 
>chmod 6755 oracle
>chmod 6755 orasrv
이 때, Permission는 다음과 같이 설정됩니다. 
-rwsr-xr-x 1 oracle dba . . . size . . . date oracle
-rwsr-xr-x 1 root dba . . . size . . . date oracle
3)ORA-6110과 틀린 네트워크 주소
TCP/IP 네트워크에서 중복 IP주소가 살아 있으면 ORA6110이 발생할 수 있습니다.  네트
워크의 모든 IP주소가 고유의 것인지 확인하십시요. 

### ORA-6122 "NETTCP: setup failure
- 원인 : SQL*NET 구성이 적절하게 설정되지 않은 상태에서 WINDOWS용 SQL*NET TCP/IP를 가지고 연결
하려 할 때 발생
- 조치 : 1. WINDOWS\WIN. INI를 조사해 보십시요.  ORA_CONFIG 매개 변수를 정의하는 ORACLE 부분이
있어야 합니다
[Oracle]
ORA_CONFIG=C:\WINDOWS\ORACLE. INI
2. ORACLE. INI(또는 ORA_CONFIG 매개변수가 지시하는 파일)을 보십시요.  ORACLE_HOME이
WINDOWS용 SQL*NET TCP/IP와 다른 Oracle Windows 응용 프로그램이 설 된 디렉토리를
지시하는 지 확인하십시요.  디폴트는 다음과 같습니다. 
ORACLE_HOME=\ORAWIN
3. 또한 ORACLE. INI에 TCP_VENDOR를 정확하게 설정했는지도 확인하십시요. 
4. 경로에 C:\ORAWIN\BIN(또한 ORACLE_HOME을 설정한 BIN 디렉토리)이 있는지 확인하십시요. 
DOS프롬프트에서 SET을 입력하고 을 누르면 됩니다.  이명령은 경로를 보여줍니다. 
5. ORAWIN\BIN 디렉토리에 SQLTCP. DLL과 SQLTCP1. DLL이 모두 있는지 확인하십시요. 
6. 경로의 다른 어떤 디렉토리에도 SQLTCP. DLL이 없는 것을 확인하십시요. 
7. ORAWIN\BIN 디렉토리와 경로의 다른 디렉토리에 MSOCKLIB. DLL이 있는 지 확인하십시요. 
또한 파일의 두 복사본을 가지고 있지 않도록 하십시요.  복사본이 둘일 경우, 이전 복사본
의 이름을 바 면 문제가 줄어들 수 있습니다. 
8. WINDOWS 디렉토리에 VSL. INI 파일이 있는지 확인하십시요.  만약 없으면 ORACLE INSTALLER
를 통해 SQL*NET를 다시 입력하십시요. 

### ORA-6136, 00000, "NETTCP: error during connection handshake"
- 원인 : 1. Client and Server 환경에서 간혹 SQL*NET으로 Server에 접속하려고 할 경우
2. Unix Server에서 $tcpctl stop 으로 orasrv의 Process를 정지시키려고 해도 아무런 반응
없이 Holding되는 경우가 발생
- 조치 : 1. TCPCTL Utility를 이용하여 다음의 Option을 부여하여 Start하는 방법. 
$tcpctl start listen=30 timeout=30 forkon listen=이며, 청취자 열의
크기를 지정. 
timeout=이며, 지정된 시간에 orasrv와의 응답 확인 시간을 나타냄. 
forkon SQL*net이 orasrv process에 접근하는 방법을 나타냄. 
System에 따라서 forkon option이 적용 않되는 경우도 있음. 
2. Client에서 접속을 하여 사용 다가 비정상 종료(Session이 맺어진 상태에서 Client의
Power Off)를 하여 Server에 Processor가 남아 있고, orasrv를 통해 접속할 수 있는
Session의 수가 점점 줄어들 경우가 있는 데 이러한 경우에는 orasrv를(tcpctl stop or
UNIX kill command를 이용)강제로 종료 시고 다음과 같이 Start 시켜 주십시오. 
#nohup tcpctl start ( Client의 비정상 종료가 Orasrv에는 영향을 미치지 않음)
또는
#orasrv (ORACLE_HOME\bin directory에서 직접 orasrv processor를 띄운다)

### ORA-06502 : PL/SQL : 값(수치) 오류입니다. 
- 원인 : DB Column과 Host variableㅇ의 길이가 맞지 않은 경우. 
- 조치 : DB Column과 Host variableㅇ의 길이를 확인하고 길이를 동일하게 한다. 

### ORA-06533: Subscript beyond count
- 원인 : VARRAY는 default 로 3개의 element 이상을 가져 올수 없기 때문. 
- 조치 : EXTEND method를 이용하여 해결할 수 있다. 

### ORA-06571
- 원인 : SQL문 안에서 Stored function을 call하여 사용하는 경우 발생. 
- 조치 : 기본적으로 stored function이나 procedure, package에서의
DML 문장의 사용은 보장이 되는 기능이나, sql list에서의 stored function의
사용은 몇 가지 제약 조건을 가지고 수행이 가능합니다. 

### ORA-1119: error in creating database file
ORA-7515: sfccf UIC GROUP <= MAXSYSGROUP - file operations not allowed
- 원인 : VMS에서만 발생하는 에러로 DATAFILE을 생성하려는 Directory의 Owner가 DBA user가 아닐때 발생. 
- 조치 : Datafile을 생성하려는 Directory의 Owner를 Oracle DBA user로 변경시켜 주어야 한다. 

### ORA-9241, ORA-9301
- 원인 : 개발툴이 해당 툴 또는 SQL*NET에 필요한 메세지 화일을 찾을 수 없을 때 발생
- 조치 : ORACLE. INI 파일에 LOCAL = 을 추가한다.  만일 ORACLE. INI 파일에 LOCAL
파라미터를 추가한 후에도 계속 ora-9301 에러가 계속 발생한다면 autoexec. bat 파일에 SET
CONFIG = \ORACLE. INI를 추가한다. 
[주의 1]CONFIG가 ORACLE. INI를 지시하도록 설정하면 나중에 다시 설치할 문제가 발생할 수
있다.  그럴 때는 AUTOEXEC. BAT 에서 SET CONFIG 행을 삭제하고 다시 Booting 한후
설치를 시작한다. 
[주의 2]MS ACCESS를 이용하여 ORACLE의 데이타를 질의할 경우는 환경변수를 다음과 같이
설정한다. 
SET CONFIG_FILES = \ORACLE. INI
[주의 3]SET 다음의 CONFIG 나 CONFIG_FILES 은 반드시 대문자 이어야 한다. 

### ORA-9352
- 원인 : nt 에서 service 의 problem 발생. 
- 조치 : 1. background services and processes 를 띄우기
dos>oradim80 -startup -sid SID -starttype srvc,inst -usrpwd password -pfile filename
2. 여러 개의 instance 를 띄우고자 하는 경우
- ORACLE_SID 를 setting 한다. 
c:\> set oracle_sid =sid
- server manager 실행
c:\>svrmgr30
svrmgr>connect internal/passwd

### ORA-12004/ORA-12034
- 원인 : master table의 snapshot log가 있는 table에 대해서, snapshot이 추가로
생성되고 나면 snapshot을 생성하기 시작한 시간과, 기존의 snapshot이 log를
refresh해간 시간을 비교하여 새로운 snapshot 생성시작 시간이 더 빠르면
ora-12004가 발생
- 조치 : 생성하고자 하는 snapshot에 대한 master table의 다른 snapshot들을 refresh하지 못하도록 하거나, refresh하지 않는 시간에 새로운 snapshot을 생성하여야 한다. 
refresh 못하도록 막는 방법으로는 일시적으로 snapshot job을 broken시킨 후 snapshot이 생성된 후 다시 broken을 false로 하면 된다. 

### ORA-12154
- 원인 : tnsnames. ora 파일의 Alias처럼 정의된 Connect String으로 사용하는 db_alias를 찾지 못할 경우 발생

### TNS-12203 "TNS:unable to connect to destination"
- 원인 : 1. WINDOWS용 TCP/IP 어댑터를 설치하지 않은 상태에서 연결하려 할
2. TNS-12203 에러는 WINDOWS용 ORACLE SQL*NET소프트웨어가 ORACLE 홈 디 렉토리를 찾을 수
없다는 의미일 수 있습니다. 
3. TNSNAMES. ORA가 ORACLE 홈 디렉토리 아래의 NETWORK\ADMIN에 있는지 확인하십시요. 
4. 서버쪽에서 실행중인 SQL*NET V2 TCP/IP Listener가 없어도 TNS-12203이 발생
5. 연결할 SERVICES 이름에 대해 CONNECT DESCRIPTOR에 정확한 ADDRESS 매개변수를 지정했는지
확인하십시요. 
6. JSB VSL 소켓이 초기화되지 않으면 TNS-12203 이 발생할 수 있습니다. 
7. TNS-12203에 이어 실제 문제가 무엇인지 더 자세하게 나타내 주는 또 다른 에러가 발생할 수
있습니다. 
- 조치 : 1. SQL*NET TCP/IP V2는 SQL*NET V2와 V2 TCP/IP 어댑터 등 두가지 제품으로 구성됩니다. 
이들은 별도의 두 키트로 되어 있는데, 반드시 두 키트를 모두 설치해야 합니다. 
2. WIN. INI파일의 ORACLE 부분에 다음 항목이 있는지 확인하십시요. 
[ORACLE]
ORA_CONFIG=C:\WINDOWS\ORACLE. INI
WINDOWS디렉토리가 C:\WINDOWS가 아니면, 위 행의 C:\WINDOWS 부분을 그 이름으로 바꾸십시요
그런 다음, ORACLE 소프트웨어를 다시 설치하십시요.  ORACLE. INI 파일이 있으면 ORACLE. INI
파일에 다음 행이 있는지 확인하십시요. 
ORACLE_HOME=C:\ORAWIN
ORACLE 홈 디렉토리가 C:\ORAWIN이 아니면 위 행의 C:\ORAWIN 부분을 이름으로 바꾸십시요. 
3. ORACLE 홈 디렉토리는 ORACLE. INI(또는 WIN. INI의 ORA_CONFIG매개변수가 지시하는 파일)의
ORACLE_HOME 에 의해 정의됩니다. 
4. 서버쪽에서 실행중인 SQL*NET V2가 있는지 확인하십시요.  서버쪽에서 Listener Control 유틸
리티(LSNRCTL)를 사용하면 서버의 V2 Listener가 실행중인지 확인할 수 있습니다.  서버에서
"LSNRCTL STATUS"명령을 실행하십시요.  Listener Control이 유틸리티 대해서는 SQL*NET
Administrator's Guide를 참조하십시요. 
5. 정확한 ADDRESS 매개변수를 사용중인지 확인하는 방법은, WINDOWS 클라이언트에서 사용 할 것
과 같은 ADDRESS 매개 변수를 가진 TNSNAMES. ORA를 사용하여 서버에서 루프백을 해 보는 것
입니다.  루프백을 수행한다는 것은 데이타베이스와 같은 기계에서 SQL*DBA 등을 호출하고
연결 스트링을 지정함으로써 SQL*NET V2를 통해 연결한다는 뜻입니다. 
6. 문제를 해결하려면 다음 사항을 점검하여 JSB VSL 레이어가 정확하게 초기화되었는지 확인
하십시요. 
1)ORACLE. INI 파일(또는 WIN. INI의 ORA_CONFIG 매개변수가 지시하는 파일)의 업체키 매개
변수 TCP_VENDOR가 정확하게 설정되었는 지 확인하십시요
2)ORACLE_HOME\BIN 디렉토리에 MSOCKLIB. DLL이 있는지 확인하십시요. 
3)ORACLE_HOME\BIN 디렉토리에 선택된 JSB 업체 특유의 DLL이 있는지, 또는그 JSB 업체 특유
의 TSR 파일이 실행되는 지 확인하십시요. 
4)WINDOWS 홈 디렉토리에 VSL. INI 파일이 있는 지 확인하십시요. 
7. 화면에서 다른 에러가 보이지 않으면 ORACLE_HOME\NETWORK\LOG 디렉토리의 SQLNET. LOG 파일을
점검하십시요. 

### TNS-12533
- 원인 : TNSNAMES. ORA에서 기술자의 ADDRESS 부분에 프로토콜 CONNECT DESCRIPTOR의 매개 변수가 틀릴
때 발생
- 조치 :

### ORA-12541: TNS:no listener
- 원인 : listener가 떠 있지 않은 경우에 발생. 
- 조치 :

### TNS-12545 "TNS:name lookup failure
- 원인 : TNSNAMES. ORA에서 기술자의 ADDRESS 부분에 프로토콜 CONNECT DESCRIPTOR의 매개 변수가 틀릴
때 발생TCP/IP 프로토콜 어댑터를 가진 SQL*NET V2를 통해 툴에서 연결하려는 데 TCP/IP
프로토콜 어댑터가 TNSNAMES. ORA 파일의 ADDRESS 부분에 제공된 호스트 이름을 분석할 수 없을
때 발생

### ORA-01034: ORACLE not available
ORA-27101: shared memory realm does not exist
- 원인 : OPENINFO의 DB에 접속하는 계정이 존재하지 않은 경우. 
- 조치 : DB에 접속하는 계정을 확인하여 OPENINFO의 DB 접속계정을 재설정 해야됨. 
1. $ORACLE_HOME/bin directory의 "oracle"과 "orasrv" (orasrv가 없는
경우에는 "tnslsnr"을 확인해 보아야 한다. )의 permission과 ownership
을 check. 
2. file system이 no set uid로 mount되어 있는지 확인. 
3. oracle user의 "umask"를 확인. 
4. $ORACLE_HOME/bin 에 존재하는 실행모듈의 ownership 을 확인. 
5. 모든 oracle file이 dba group으로 되어 있는지 확인. 
6. ORACLE_HOME의 path에 존재하는 모든 directory가 755 mask로 setting
되어 있는지 확인. 

### 0509-036,0509-022,0509-026,ORA-12547
- 원인 : 1. Oracle 계정이 아닌 일반 계정으로 unix에 접속하여 svrmgrl을 수행 시 발생. 
2. $ORACLE_HOME/bin/oracle 실행 화일에 대한 permission이 적당하지 않을 수 있고,
unix 계정의 . profile 또는 . login 화일에 ORA_NLS33 파라미터를 셋팅하지
않았기 때문에 발생
- 조치 : 1. $ORACLE_HOME/bin/oracle 화일의 sticky bit가 제대로 셋팅되었는지 확인. 
2. ORA_NLS33 파라미터가 제대로 셋팅되어 있는지 확인. 
user가 오라클 database에 login할 때, oracle 실행 프로그램을 사용하여
오라클 계정으로 shadow process를 생성한다. 

### ORA-24777: use of non-migratable database link not allowed. 
- 원인 : Remote database를 사용하는데 Oracle이 dedicator server로 설치된 경우 발생(DB-Link사용할 경우)
- 조치 : Remote database를 사용하여 transaction를 보장 받을려면 Oracle을 MTS mode로 설치되어야 한다. 

### ORA-29701(OGMS관련 ORACLE ERROR)
- 원인 : 1. 오라클에서 GMS에 접속할 수 없을 경우 발생한다. 
2. lmon( GMS client )이 communication file의 위치를 찾지 못할 경우 발생한다. 
3. 기타 발생 - 원인은 GMS에 틀린 internal function(skgxn)이 사용되거나
GMS가 local request에 대한 서비스를 할 수 없거나 CM subsystem에 문제가 있을
경우 등
- 조치 : 1. Oracle이 startup 될 때, GMS가 실행되지 않고 있을 때 발생한다.  이와
같은 경우에는 'ogmsctl status' 명령을 상용하여 GMS가 startup되었는지 확인
하여야 한다. 
2. 기본적으로 사용하는 디렉토리인 /tmp/. ogms를 사용하지 않을 경우 GMS home이
지정되어야 한다.  OGMS home directory를 별도로 지정하여 사용할 경우에는
init. ora 파라미터 파일에서 ogms_home 파라미터 값을 지정해 주어야 한다. 

### ORA-29702 ERROR(OGMS관련 ORACLE ERROR)
- 원인 : 1. 오라클에서 GMS에 접속할 수 없을 경우 발생한다. 
2. lmon( GMS client )이 communication file의 위치를 찾지 못할 경우 발생한다. 
3. 기타 발생 - 원인은 GMS에 틀린 internal function(skgxn)이 사용되거나
GMS가 local request에 대한 서비스를 할 수 없거나 CM subsystem에 문제가 있을
경우 등
- 조치 : GMS 서비스에 예상치 못한 에러가 발생했을 경우 로그에 남게 된다.  GMS가 실행
중인지를 확인해 보고, 내부 에러로 인해 GMS가 스스로 shutdown 되었다면
daemon file에 기록된 트레이스 정보를 살펴보아야 한다. 




출처: http://cafe. naver. com/sist6/



=======================================================================================



00000,0, "성공적인 정상 종료입니다"
00001,0, "유일성 제약조건(%s. %s)에 위배됩니다"
00017,0, "트레이스 이벤트 설정이 세션에 요구되었습니다"
00018,0, "최대 세션 수를 초과했습니다"
00019,0, "최대 세션 라이선스 수를 초과했습니다"
00020,0, "최대 프로세스 수(%s)를 초과했습니다"
00021,0, "세션이 다른 프로세스에 첨부되어 있음; 세션을 변경할 수 없습니다"
00022,0, "부적절한 세션 번호; 액세스가 거절되었습니다"
00023,0, "세션이 프로세스 고유의 메모리를 참조함; 세션을 분리할 수 없습니다"
00024,0, "단일 프로세스 모드에서는 하나 이상의 프로세스가 로그인할 수 없습니다"
00025,0, "%s에 메모리를 할당하는데 실패했습니다"
00026,0, "누락 혹은 부적합한 세션 번호"
00027,0, "현 세션을 제거할 수 없습니다"
00028,0, "세션이 제거되었습니다"
00029,0, "사용자 세션이 아닙니다"
00030,0, "사용자 세션 ID가 존재하지 않습니다"
00031,0, "세션이 중단될 것입니다"
00032,0, "부적합한 세션 MIGRATION PASSWORD"
00033,0, "현세션이 MIGRATION PASSWORD를 갖고있지 않습니다"
00034,0, "PL/SQL 세션에서 %s를 할 수 없습니다"
00035,0, "LICENSE_MAX_USERS가 현재의 사용자 수보다 적을 수 없습니다"
00050,0, "엔큐를 하는 동안 O/S 오류가 발생했음.  o/s 오류를 확인하십시오"
00051,0, "자원 대기 중 시간 초과입니다"
00052,0, "최대 엔큐 자원 수(%s)를 초과했습니다"
00053,0, "최대 엔큐 수를 초과했습니다"
00054,0, "자원이 사용중이고, NOWAIT가 지정되어 있습니다"
00055,0, "최대 DML 잠금 수를 초과했습니다"
00056,0, "개체 '%s. %s'에 대한 DDL 잠금이 비호환 모드로 되어 있습니다"
00057,0, "최대 임시 테이블 잠금 수가 초과했습니다"
00058,0, "이 데이타베이스를 마운트하기 위해서 DB_BLOCK_SIZE가 %s이어야 함(%s 아님). "
00059,0, "최대 DB_FILES 수를 초과했습니다"
00060,0, "자원 대기중 데드록이 검출되었습니다"
00061,0, "다른 하나의 인스턴스가 다른 DML_LOCKS을 설정하고 있습니다"
00062,0, "DML 전(full) 테이블 잠금을 취할 수 없습니다.  DML_LOCKS은 0 입니다"
00063,0, "최대 LOG_FILES 수를 초과했습니다"
00064,0, "현 O/S (%s,%s)에 할당하기에는 개체가 너무 큽니다"
00065,0, "FIXED_DATE의 초기화에 실패했습니다"
00066,0, "LOG_FILES는 %s이지만 호환성을 위해 %s 이어야합니다"
00067,0, "값 %s은 파라미터 %s에 대해 부적당하며, 최소한 %s 이어야 합니다"
00068,0, "값 %s은 파라미터 %s에 대해 부적당하며, %s와 %s 사이의 값이어야 합니다"
00069,0, "잠글 수 없습니다 -- %s에 대해 테이블 잠금을 할 수 없습니다"
00070,0, "명령어 %s 은 적당하지 않습니다"
00071,0, "프로세스 번호은 1 과 %s 사이어야 합니다"
00072,0, "프로세스 \"%s\" 은 활동적인 것이 아닙니다"
00073,0, "명령어 %s은 %s 와 %s 인수를 가지고 옵니다"
00074,0, "지정된 프로세스가 없습니다"
00075,0, "프로세스 \"%s\" 은 이 인스턴스에서 찾을 수 없습니다"
00076,0, "덤프 %s 을 찾을 수 없습니다"
00077,0, "덤프 %s 은 적당하지 않습니다"
00078,0, "이 이름으로 변수를 덤프 할 수 없습니다"
00079,0, "변수 %s 가 없습니다"
00080,0, "레벨 %s 로 지정된 글로벌 영역이 부적당합니다"
00081,0, "주소 범위 [%s, %s)은 읽기가능한 것이 아닙니다"
00082,0, "%s의 메모리 크기는 적당한 [1], [2], [4]%s%s%s%s%s의 설정으로 되어 있지 않습니다"
00083,0, "경고: 맵된 SGA가 손상한것 같습니다"
00084,0, "글로벌 영역이 PGA, SGA, 또는 UGA 이어야만 합니다"
00085,0, "현재 호출이 존재하지 않습니다"
00086,0, "사용자 호출이 존재하지 않습니다"
00097,0, "Oracle SQL 기능에서 사용하고 있는것이 SQL92 %s 레벨서 존재하고 있지 않습니다"
00100,0, "데이터가 없습니다"
00101,0, "시스템 파라미터 'mts_dispatchers'에 대한 사용 문법이 부적합합니다"
00102,0, "'%s' 네트워크 프로토콜이 디스패쳐에 의해 사용될 수 없습니다"
00103,0, "부적합한 네트워크 프로토콜; 디스패쳐에 의해 사용되도록 예약되었음"
00104,0, "데드록이 검출되었음; 모든 공유서버가 자원을 기다리고 있습니다"
00105,0, "디스패칭 기법이 '%s' 네트워크 프로토콜을 지원하도록 되어있지 않습니다"
00106,0, "디스패쳐에 연결되었을때는 데이타베이스를 기동/중지시킬 수 없습니다"
00107,0, "ORACLE의 리스너 프로세스에 연결하지 못했습니다"
00108,0, "비동기 연결이 가능하도록 디스패쳐를 설정하지 못했습니다"
00111,0, "최대 서버수는 %s입니다; %s개의 서버 추가중"
00112,0, "경고: %s (지정 최대치) 디스패쳐만으로 생성되었습니다"
00113,0, "프로토콜명 '%s'가 너무 깁니다"
00114,0, "시스템 파라미터 mts_service에 대한 값이 없습니다"
00115,0, "연결이 거절됨; 디스패쳐 연결 레이블이 FULL 상태입니다"
00116,0, "mts_service명이 너무 깁니다"
00117,0, "시스템 파라미터 'mts_servers'의 범위를 벗어납니다"
00118,0, "시스템 파라미터 'mts_dispatchers'의 범위를 벗어납니다"
00119,0, "mts_listener_address 시스템 파라미터에 지정이 부적합합니다"
00120,0, "디스패칭 기법이 사용불가 혹은 설치되어있지 않습니다"
00121,0, "mts_dispatchers를 제외하고 mts_servers가 지정되었습니다"
00122,0, "네트워크 구성을 초기화할 수 없습니다"
00123,0, "비작업중인 공유 서버를 종료합니다"
00124,0, "mts_dispatchers가 mts_max_servers 없이 지정되었습니다"
00150,0, "중복된 트랜잭션 ID"
00151,0, "부적합한 트랜잭션 ID"
00152,0, "현 세션이 요구된 세션과 일치하지 않습니다"
00200,0, "제어 화일 '%s'을 생성할 수 없습니다"
00201,0, "제어 화일 버전 '%s'은 ORACLE 버전 %s과 호환되지 않습니다"
00202,0, "제어화일: '%s'"
00203,0, "잘못된 제어화일을 사용하였습니다"
00204,0, "제어 화일 '%s' (블록 %s, 블록 수 %s) 읽기 오류입니다"
00205,0, "제어 화일 '%s' 식별 오류입니다"
00206,0, "제어 화일 '%s' (블록 %s, 블록 수 %s) 쓰기 오류입니다"
00207,0, "제어화일이 현재 사용중인 데이타베이스용이 아닙니다"
00208,0, "제어 화일명이 최대수 %s 를 초과했습니다"
00209,0, "블록 크기 %s 가 최대 %s 바이트를 초과했습니다"
00210,0, "제어 화일 '%s' 를 열 수 없습니다"
00211,0, "제어 화일 '%s' 가 앞의 제어 화일과 일치하지 않습니다"
00212,0, "블록 크기 %s가 최소한 필요한 크기 %s 바이트 미만입니다"
00213,0, "제어 화일 '%s' 재사용 불가; 구 화일 크기 %s, %s가 필요합니다"
00214,0, "제어 화일 '%s'의 버전 %s는 화일 '%s' 버전 %s와 일치하지 않습니다"
00215,0, "적어도 한 개의 제어 화일이 필요합니다"
00216,0, "제어 화일 '%s' 에 대한 물리 블록 크기를 확정할 수 없습니다"
00217,0, "제어 화일 '%s'의 물리적 블록 크기 %s가 %s와 일치하지 않습니다"
00218,0, "제어 화일 '%s'는 블록 크기를 %s로 작성되었지만 현재는 %s 입니다. "
00219,0, "필요한 제어 화일 크기 %s 가 최대치 %s 보다 큽니다"
00220,0, "제어화일 '%s'가 첫 인스턴스에 의해 사용한 것과 일치하지 않습니다"
00221,0, "제어화일에의 쓰기오류"
00222,0, "디스패쳐로 제어화일을 조회할 수 없습니다"
00223,0, "변환 데이타화일이 부적합하거나 틀린 버전입니다"
00224,0, "명시된 화일이 제어 화일이 아닙니다"
00225,0, "기대된 크기 %s 은( 제어화일 '%s' 관한) 실제 크기 %s 와 다릅니다"
00250,0, "아카이버가 작동되지 않았습니다"
00251,0, "사용되지 않는 오류"
00252,0, "로그 %s (쓰레드 %s의)는 비었습니다.  아카이브할 수 없습니다"
00253,0, "제한치 %s가 길이 %s로 초과되었습니다 (아카이브 스트링 '%s'의) "
00254,0, "아카이브 제어 스트링 '%s' 오류입니다"
00255,0, "로그 %s(쓰레드 %s, 시퀀스 번호 %s)의 아카이브 오류"
00256,0, "아카이브 텍스트 스트링 '%s'의 변환시 오류가 발생했습니다"
00257,0, "아카이버 오류.  해제되기 전에는 내부 연결만 가능"
00258,0, "NOARCHIVELOG 모드에서의 수동 아카이브는 로그를 지정해야합니다"
00259,0, "로그 %s(개방 쓰레드 %s의)가 현재 로그이므로 아카이브할 수 없습니다"
00260,0, "온라인 로그 시퀀스 %s(쓰레드 %s의)를 발견할 수 없습니다"
00261,0, "로그 %s(쓰레드 %s의)가 아카이브중이거나 수정중입니다"
00262,0, "현재 로그 %s(닫힌 쓰레드 %s의)를 스위치할 수 없습니다"
00263,0, "쓰레드 %s를 위해 아카이빙이 필요한 로그가 없습니다"
00264,0, "복구가 필요하지 않습니다"
00265,0, "인스턴스 복구가 요구됩니다.  ARCHIVELOG모드를 지정할 수 없습니다"
00266,0, "아카이브된 로그 화일의 이름을 필요로 합니다"
00267,0, "아카이브된 로그 화일의 이름을 필요로 하지 않습니다"
00268,0, "지정된 로그화일이 존재하지 않습니다 '%s'"
00269,0, "지정된 로그화일은 쓰레드 %s의 (%s가 아닌) 부분임"
00270,0, "아카이브 로그 생성시 오류"
00271,0, "아카이브를 필요로 하는 로그가 없습니다"
00272,0, "아카이브 로그 기록시 오류"
00273,0, "로그되지 않은 직접 로드 데이타의 매체 복구"
00274,0, "부적절한 복구 옵션 %s"
00275,0, "매체 복구가 이미 시작되었습니다"
00276,0, "키워드 CHANGE가 지정되었으나 변환 번호가 주어지지 않았습니다"
00277,0, "UNTIL 복구 플래그 %s에 부적절한 옵션"
00278,0, "현 복구를 위해 로그화일 %s는 더이상 필요하지 않습니다"
00279,0, "변환 %s가 (%s에서 생성된) 쓰레드 %s에 필요합니다"
00280,0, "변환 %s(쓰레드 %s를 위한)가 시퀀스번호 %s에 있습니다"
00281,0, "매체 복구는 디스패쳐를 사용하여 수행되지 않습니다"
00282,0, "UPI %s 호출이 지원되지 않으니, ALTER DATABASE RECOVER를 사용하십시요"
00283,0, "복구 세션이 오류로 인하여 취소되었습니다"
00284,0, "복구 세션이 진행중입니다"
00285,0, "TIME 키워드가 지정되었으나 시간이 주어지지 않았습니다"
00286,0, "이용가능한 멤버가 없거나, 적합한 데이타를 포함하고 있지 않습니다"
00287,0, "지정된 변환 번호 %s가 쓰레드 %s에 없습니다"
00288,0, "복구를 계속하려면 ALTER DATABASE RECOVER CONTINUE를 입력하십시요"
00289,0, "제안 : %s"
00290,0, "로그화일을 아카이브 하려고 할때, O/S 오류가 발생했습니다"
00291,0, "PARALLEL 옵션에 숫자값이 필요로합니다"
00292,0, "병렬 복구 기능이 설치되지 않았습니다"
00293,0, "제어 화일과 리두로그가 동기화 상태에서 벗어나 있습니다"
00300,0, "부적합한 리두 로그 블록 크기 %s가 지정됨 - 한계 %s 초과"
00301,0, "로그 화일 '%s'를 추가 작성할 수 없습니다"
00302,0, "로그의 최대수 %s 를 초과했습니다"
00304,0, "요구된 인스턴스 번호는 사용중입니다"
00305,0, "로그 %s(쓰레드 %s의)는 일관되지 않습니다.  이것은 다른 데이타베이스에 속합니다"
00306,0, "이 데이타베이스에서는 %s 인스턴스가 한계입니다"
00307,0, "요구된 인스턴스 번호가 범위를 벗어납니다(최대치는 %s)"
00308,0, "아카이브된 로그 '%s'를 열 수 없습니다"
00309,0, "로그가 잘못된 데이타베이스에 속해 있습니다"
00310,0, "아카이브된 로그는 시퀀스 %s를 포함하고 있습니다 시퀀스 %s가 필요합니다. "
00311,0, "아카이브 로그로부터 헤더 정보를 읽을 수 없습니다"
00312,0, "온라인 로그 %s 쓰레드 %s: '%s'"
00313,0, "로그 그룹 %s (쓰레드 %s의)의 멤버를 여는데 실패했습니다"
00314,0, "로그 %s(쓰레드 %s의, 시퀀스번호가 %s일)는 %s와 일치하지 않습니다"
00315,0, "로그 %s (쓰레드 %s의) 헤더의 쓰레드 번호 %s가 틀립니다"
00316,0, "로그 %s (쓰레드 %s의) 헤더내의 유형 %s는 로그화일이 아닙니다"
00317,0, "헤더에 있는 화일형 %s가 로그화일이 아닙니다"
00318,0, "로그 %s (쓰레드 %s의, 화일 크기가 %s인)가 %s와 맞지 않습니다"
00319,0, "로그 %s(쓰레드 %s의)가 틀린 로그 재설정 상태를 가지고 있습니다"
00320,0, "로그 %s(쓰레드 %s의)로부터 화일 헤더를 읽을 수 없습니다"
00321,0, "로그 %s(쓰레드 %s의)에서 로그화일 헤더를 수정할 수 없습니다"
00322,0, "로그 %s(쓰레드 %s의)는 현시점의 것이 아닙니다"
00323,0, "쓰레드 %s의 현 로그는 사용불가하며, 나머지 전부도 아카이브하여야 합니다"
00324,0, "로그 화일 '%s'의 변환명 '%s'가 너무 깁니다, 문자수 %s가 %s를 초과했습니다. "
00325,0, "쓰레드 %s으로 아카이브된 로그가 헤더내에 틀린 쓰레드 번호 %s를 가지고 있습니다"
00326,0, "변환 %s에서 시작된 아카이브 로그, 이전의 변환 %s를 필요로 합니다"
00327,0, "로그 %s(쓰레드 %s의), 물리적인 크기 %s가 필요한 %s보다 작습니다"
00328,0, "변환 %s에서 끝난 아카이브 로그, 이후의 변환 %s를 필요로 합니다"
00329,0, "변환 %s에서 시작된 아카이브 로그, 변환 %s를 필요로 합니다"
00330,0, "변환 %s에서 끝난 아카이브 로그, 변환 %s를 필요로 합니다"
00331,0, "로그 버전 %s가 ORACLE 버전 %s와 호환성이 없습니다"
00332,0, "아카이브된 로그가 너무 작음 - 완전하게 아카이브되지 않았습니다"
00333,0, "재실행 로그 읽기 오류(블록 %s 카운트 %s)"
00334,0, "아카이브된 로그: '%s'"
00335,0, "온라인 로그 %s: 이 번호의 로그가 존재하지 않습니다"
00336,0, "로그 화일의 크기 %s가 최소 블록 수 %s 보다 작습니다"
00337,0, "로그 화일 '%s'가 존재하지 않고 크기가 지정되어 있지 않습니다"
00338,0, "로그 %s(쓰레드 %s의)가 제어화일보다 최근의 것입니다"
00339,0, "아카이브 로그가 REDO 로그를 포함하고 있지 않습니다"
00340,0, "온라인 로그 '%s'(쓰레드 %s의) 처리시 IO 오류입니다"
00341,0, "로그 %s(쓰레드 %s의)에 대한  헤더내에 로그 번호 %s가 틀립니다"
00342,0, "아카이브된 로그가 마지막 RESETLOGS 전에 생성되었습니다"
00343,0, "너무 많은 오류 발생, 로그 멤버가 클로즈됐습니다"
00344,0, "온라인 로그 '%s'를 재생성할 수 없습니다"
00345,0, "REDO 로그 쓰기(write) 오류, 블록 %s 카운트 %s"
00346,0, "로그 멤버가 STALE로 표시되었습니다"
00347,0, "로그 '%s'(쓰레드 %s의)의 예상 블록크기 %s는 %s와 일치하지 않습니다"
00348,0, "단일 프로세스 REDO 실패입니다 인스턴스를 중지해야 합니다. "
00349,0, "'%s' 의 블록 크기 확보 실패입니다"
00350,0, "로그 %s(쓰레드 %s의)를 아카이브해야 합니다"
00351,0, "지정된 시간으로의 복구가 불가능합니다"
00352,0, "쓰레드 %s에 대한 모든 로그가 아카이브되어야 함 - 가용화할 수 없습니다"
00353,0, "블록 %s 변경 %s 시간 %s 부근에서 로그가 깨졌습니다"
00354,0, "REDO 로그의 블록헤더가 깨짐"
00355,0, "변환 번호가 잘못됨"
00356,0, "변환 설명내에 일치하지 않는 길이"
00357,0, "로그화일에 너무 많은 수의 멤버가 지정됨 (최대치는 %s)"
00358,0, "너무 많은 화일 멤버가 지정됨 (최대치는 %s)"
00359,0, "로그화일 그룹 %s가 존재하지 않습니다"
00360,0, "로그화일 멤버가 아닙니다 %s"
00361,0, "마지막 로그 멤버 %s는 그룹 %s를 옮길수 없습니다"
00362,0, "그룹 %s내에 정당한 로그화일을 형성하기 위해 멤버를 필요로 합니다"
00363,0, "로그가 아카이브 버전이 아닙니다"
00364,0, "새로운 로그 멤버에 헤더를 기록할 수 없습니다"
00365,0, "지정한 로그가 다음 로그가 아닙니다"
00366,0, "로그 %s, 쓰레드 %s의, 화일 헤더에 체크섬 오류가 있습니다"
00367,0, "로그 화일 헤더에 체크섬 오류가 있습니다"
00368,0, "리두 로그 블록에 체크섬 오류가 있습니다"
00369,0, "쓰레드 %s의 현재 로그는 사용불가이며 다른 로그가 지워지고 있습니다"
00370,0, "kcbchange 작업수행시 데드록의 가능성이 있습니다"
00371,0, "빈 버퍼의 사용이 불가합니다"
00372,0, "화일 %s는 지금 수정될 수 없습니다"
00373,0, "온라인 로그 버전 %s가 ORACLE 버전 %s와 호환되지 않습니다"
00374,0, "지정된 파라미터 db_block_size = %s 가 부적절함 - 가능한 범위[%s. . %s]"
00375,0, "디폴트 db_block_size의 값을 얻을수 없습니다"
00376,0, "현재 화일 %s를 읽을 수 없습니다"
00390,0, "로그 %s(쓰레드 %s의)는 지워질것이므로 현재 로그가 될 수 없습니다"
00391,0, "전체 쓰레드는 동시에 새로운 로그 포맷으로 전환해야 합니다"
00392,0, "로그 %s(쓰레드 %s의)는 지워질것이므로 작업이 허용되지 않습니다"
00393,0, "오프라인 데이타화일 복구에 로그 %s(쓰레드 %s의)가 필요합니다"
00400,0, "RELEASE 값 %s는 파라미터 %s에 부적절합니다"
00401,0, "이번 RELEASE에서 지원되지 않은 파라미터 %s에 대한 값입니다"
00402,0, "%s RELEASE에 변경된 데이타베이스는 %s RELEASE에 사용될 수 없습니다"
00403,0, "%s (%s) 는 다른 인스턴스(%s)와 같지 않습니다"
00404,0, "변환 데이타 화일이 없습니다 '%s'"
00405,0, "호환 가능한 유형 \"%s\""
00406,0, "COMPATIBLE 파라미터는 %s 이상이어야 합니다"
00407,0, "릴리즈 %s. %s 에서 %s. %s로 향상이 허용되지 않습니다"
00408,0, "파라미터 %s는 TRUE로 설정되었습니다"
00436,0, "ORACLE이 라이센스되어 있지 않습니다 ORACLE사에 연락해 주십시오. "
00437,0, "ORACLE의 기능이 라이센스되어 있지 않습니다.  ORACLE사에 연락해 주십시오"
00443,0, "백그라운 프로세스 \"%s\"가 시작되지 않았습니다"
00444,0, "백그라운드 프로세스 \"%s\" 기동중 장애가 발생했습니다"
00445,0, "백그라운드 프로세스 \"%s\"가 %s초 후 기동되지 않았습니다"
00446,0, "백그라운드 프로세스가 부적절하게 기동되었습니다"
00447,0, "백그라운드 프로세스에 치명적인 오류가 발생했습니다"
00448,0, "백그라운드 프로세스가 정상 종료했습니다"
00449,0, "백그라운드 프로세스 '%s' 가 오류 %s 와 함께 종료되었습니다"
00470,0, "LGWR 프로세스가 오류로 종료되었습니다"
00471,0, "DBWR 프로세스가 오류로 종료되었습니다"
00472,0, "PMON 프로세스가 오류로 종료되었습니다"
00473,0, "ARCH 프로세스가 오류로 종료되었습니다"
00474,0, "SMON 프로세스가 오류로 종료되었습니다"
00475,0, "TRWR 프로세스가 오류로 종료되었습니다"
00476,0, "RECO 프로세스가 오류로 종료되었습니다"
00477,0, "SNP* 프로세스가 오류로 종료되었습니다"
00480,0, "LCK* 프로세스가 오류로 종료되었습니다"
00483,0, "정지 처리중 프로세스가 오류로 종료되었습니다"
00568,0, "인터럽트 처리기의 최대수를 초과했습니다"
00574,0, "osndnt: $CANCEL 실패 (break)"
00575,0, "osndnt: $QIO 실패 (send out-of-band break)"
00576,0, "인-밴드 브레이크 프로토콜 오류"
00577,0, "아웃-밴드 브레이크 프로토콜 오류"
00578,0, "재설정 프로토콜 오류"
00579,0, "osndnt: 서버가 잘못된 연결요구를 받았습니다"
00580,0, "프로토콜 버전이 일치하지 않습니다"
00581,0, "osndnt: 문맥 영역을 할당할 수 없습니다"
00582,0, "osndnt: 문맥 영역을 해제할 수 없습니다"
00583,0, "osndnt: $TRNLOG 실패"
00584,0, "연결을 끊을 수 없습니다"
00585,0, "잘못된 유형의 호스트명입니다"
00586,0, "osndnt: LIB$ASN_WTH_MBX 실패"
00587,0, "원격 호스트에 연결할 수 없습니다"
00588,0, "호스트로부터의 메시지가 너무 짧습니다"
00589,0, "호스트로부터의 메시지가 잘못된 데이타 길이를 갖습니다"
00590,0, "호스트로부터의 메시지가 잘못된 데이타 유형을 갖습니다"
00591,0, "틀린 바이트 수가 기록되었습니다"
00592,0, "osndnt: $QIO 실패 (mailbox queue)"
00593,0, "osndnt: $DASSGN 실패 (network device)"
00594,0, "osndnt: $DASSGN 실패 (mailbox)"
00595,0, "osndnt: $QIO 실패 (receive)"
00596,0, "osndnt: $QIO 실패 (send)"
00597,0, "osndnt: $QIO 실패 (mailbox requeue)"
00598,0, "osndnt: $QIO 실패 (mailbox read)"
00600,0, "내부 오류 코드, 인수 : [%s], [%s], [%s], [%s], [%s], [%s], [%s], [%s]"
00601,0, "크린업 잠금이 충돌했습니다"
00602,0, "내부 프로그래밍 오류입니다 - BUG로 등록하세요"
00603,0, "ORACLE 서버 세션이 치명적인 오류로 종료되었습니다"
00604,0, "순환 SQL 레벨 %s 에 오류가 발생했습니다"
00606,0, "내부 오류코드"
00701,0, "데이타베이스의 기동에 필요한 개체를 변경할 수 없습니다"
00702,0, "부트스트랩 버전 '%s'가 버전 '%s'와 일치하지 않습니다"
00703,0, "행 캐쉬 인스턴스 잠금의 최대 수를 초과했습니다"
00704,0, "부트스트랩 프로세스 실패"
00816,0, "오류 메세지 해석 오류입니다"
00900,0, "SQL 문이 부적합합니다"
00901,0, "CREATE 명령어가 부적합합니다"
00902,0, "데이타유형이 부적합합니다"
00903,0, "테이블명이 부적합합니다"
00904,0, "열명이 부적합합니다"
00905,0, "키워드가 없습니다"
00906,0, "좌괄호가 없습니다"
00907,0, "우괄호가 없습니다"
00908,0, "NULL 키워드가 없습니다"
00909,0, "인수의 개수가 부적합합니다"
00910,0, "데이타형에 지정된 길이가 너무 깁니다"
00911,0, "문자가 부적합합니다"
00913,0, "값의 수가 너무 많습니다"
00914,0, "ADD 키워드가 없습니다"
00915,0, "네트워크을 통한 DICTIONARY TABLE 액세스는 허가되지 않습니다"
00917,0, "코머가 누락되었습니다"
00918,0, "열의 정의가 애매합니다"
00919,0, "함수가 부적합합니다"
00920,0, "관계 연산자가 부적합합니다"
00921,0, "SQL 명령어가 불완전합니다"
00922,0, "옵션이 부적합하거나 없습니다"
00923,0, "FROM 키워드가 있어야할 곳에 없습니다"
00924,0, "BY 키워드가 없습니다"
00925,0, "INTO 키워드가 없습니다"
00926,0, "VALUES 키워드가 없습니다"
00927,0, "등호가 없습니다"
00928,0, "SELECT 키워드가 없습니다"
00929,0, "마침표(. )가 없습니다"
00930,0, "'*' 가 없습니다"
00931,0, "식별자가 없습니다"
00932,0, "데이타 유형이 일치하지 않습니다"
00933,0, "SQL 명령어가 올바르게 종료되지 않았습니다"
00934,0, "그룹 함수는 허가되지 않습니다"
00935,0, "그룹 함수의 내포 레벨이 너무 깊습니다"
00936,0, "식이 없습니다"
00937,0, "단일 그룹의 그룹 함수가 아닙니다"
00938,0, "함수의 인수가 충분하지 않습니다"
00939,0, "함수의 인수가 너무 많습니다"
00940,0, "ALTER 명령어가 부적합합니다"
00941,0, "클러스터 명이 없습니다"
00942,0, " 테이블 또는 뷰가 존재하지 않습니다"
00943,0, "클러스터가 존재하지 않습니다"
00944,0, "클러스터 열의 수가 충분하지 않습니다"
00945,0, "지정한 클러스터 열이 존재하지 않습니다"
00946,0, "TO 키워드가 없습니다"
00947,0, "값의 수가 충분하지 않습니다"
00948,0, "ALTER CLUSTER 문은 제공되어 있지 않습니다"
00949,0, "원격 데이타베이스는 참조할 수 없습니다"
00950,0, "DROP 옵션이 부적합합니다"
00951,0, "클러스터가 비어 있지 않습니다"
00952,0, "GROUP 키워드가 없습니다"
00953,0, "색인명이 부적합합니다"
00954,0, "IDENTIFIED 키워드가 없습니다"
00955,0, "이미 사용된 개체명입니다"
00956,0, "감사 옵션이 부적합하거나 없습니다"
00957,0, "열명이 중복되었습니다"
00958,0, "CHECK 키워드가 없습니다"
00959,0, "테이블 영역 '%s' 가 존재하지 않습니다"
00960,0, "선택 리스트에 애매한 열명이 있습니다"
00962,0, "너무 많은 group-by / order-by 식이 있습니다"
00964,0, "FROM 리스트에 테이블명이 없습니다"
00965,0, "'*'에 대한 열의 별명은 사용할 수 없습니다"
00966,0, "TABLE 키워드가 없습니다"
00967,0, "WHERE 키워드가 없습니다"
00968,0, "INDEX 키워드가 없습니다"
00969,0, "ON 키워드가 없습니다"
00970,0, "WITH 키워드가 없습니다"
00971,0, "SET 키워드가 없습니다"
00972,0, "식별자의 길이가 너무 깁니다"
00973,0, "행수의 추정이 잘못되었습니다"
00974,0, "PCTFREE 값(백분율)이 부적합합니다"
00975,0, "날짜와 날짜의 가산은 할 수 없습니다"
00976,0, "LEVEL, PRIOR, ROWNUM 은 사용 할 수 없습니다"
00977,0, "감사 옵션이 중복되었습니다"
00978,0, "GROUP BY 구 없이 그룹 함수가 내포되었습니다"
00979,0, "GROUP BY 의 식이 없습니다"
00980,0, "동의어의 해석이 불가능합니다"
00981,0, "테이블 및 시스템 감사 옵션은 함께 지정될 수 없습니다"
00982,0, "'+' 부호가 없습니다"
00984,0, "열을 사용할 수 없습니다"
00985,0, "프로그램명이 부적합합니다"
00986,0, "그룹명이 부적합하거나 없습니다"
00987,0, "사용자명이 부적합하거나 없습니다"
00988,0, "암호가 틀립니다"
00989,0, "사용자명에 대한 암호가 너무 많습니다"
00990,0, "권한이 부적합합니다"
00991,0, "MAC 권한만이 프로시저에게 권한부여해 줍니다"
00992,0, "REVOKE 명령어의 형식이 부적합합니다"
00993,0, "GRANT 키워드가 없습니다"
00994,0, "OPTION 키워드가 없습니다"
00995,0, "동의어의 식별자가 부적합합니다"
00996,0, "연접 연산자는 | 이 아니고 || 입니다"
00997,0, "LONG 데이타 유형은 사용할 수 없습니다"
00998,0, "이 식은 열의 별명과 함께 지정해야 합니다"
00999,0, "뷰명이 부적합합니다"
01000,0, "최대 열기 커서 수를 초과했습니다"
01001,0, "커서가 부적합합니다"
01002,0, "인출 시퀀스가 틀립니다"
01003,0, "해석된 문이 없습니다"
01004,0, "디폴트 사용자명 사용 불가.  로그온이 허락되지 않습니다"
01005,0, "널 암호가 입력되었습니다 로그온이 허락되지 않습니다. "
01006,0, "바인드 변수가 없습니다"
01007,0, "변수가 선택 리스트에 없습니다"
01008,0, "모든 한계변수가 아닙니다"
01009,0, "필수 파라미터가 없습니다"
01010,0, "OCI 조작이 부적합합니다"
01011,0, "v6 서버와 교신할때 v7 호환성 모드를 사용할 수 없습니다"
01012,0, "로그온되어 있지 않습니다"
01013,0, "현 조작의 취소가 요구되었습니다"
01014,0, "ORACLE의 정지 처리가 진행중입니다"
01015,0, "로그온이 순환적으로 호출되었습니다"
01016,0, "이함수는 인출 이후에만 호출될 수 있습니다"
01017,0, "사용자명/암호가 부적합, 로그온할 수 없습니다"
01018,0, "LONG 데이타 유형의 열이 아닙니다"
01019,0, "사용자쪽의 기억영역을 할당할 수 없습니다"
01020,0, "문맥의 상태가 불명확합니다"
01021,0, "지정한 문맥 크기가 부적합합니다"
01022,0, "이 구성에 데이타베이스 작업이 지원되지 않습니다"
01023,0, "커서 문맥가 없습니다부당한 커서번호)"
01024,0, "OCI 콜의 데이타 유형은 부적합합니다"
01025,0, "UPI 파라미터가 부적합합니다"
01026,0, "바인드 목록에 크기가 2000이상인 다중 버퍼"
01027,0, "데이타 정의에서는 바인드 변수를 사용할 수 없습니다"
01028,0, "내부 투 태스크(two task) 오류"
01029,0, "내부 투 태스크(two task) 오류"
01030,0, "SELECT . . .  INTO 변수가 없습니다"
01031,0, "권한이 불충분합니다"
01032,0, "사용자 번호가 존재하지 않습니다"
01033,0, "ORACLE의 초기화 또는 정지 처리가 진행중입니다"
01034,0, "ORACLE을 사용할 수 없습니다"
01035,0, "ORACLE은 RESTRICTED SESSION 권한을 갖는 사용자만 사용 가능합니다"
01036,0, "잘못된 변수명/번호"
01037,0, "최대 커서 메모리가 초과되었습니다"
01038,0, "데이타베이스 화일 버전 %s에 ORACLE 버전 %s으로 기록할 수 없습니다"
01039,0, "사용되지 않는 오류"
01040,0, "암호에 잘못된 문자가 있습니다 로그온을 할 수 없습니다"
01041,0, "내부오류.  hostdef 확장이 존재하지 않습니다"
01042,0, "개방된 커서와 함께 세션을 분리하는 것은 허용되지 않습니다"
01043,0, "사용자쪽의 기억영역 파괴 [%s], [%s], [%s], [%s]"
01044,0, "버퍼의 크기 %s (한계가 변수 %s)가 최대의 %s를 초과했습니다"
01045,0, "사용자 %s는 CREATE SESSION 권한을 가지고있지 않음; 로그온이 거절되었습니다"
01046,0, "확장할 문맥 영역을 획득할 수 없습니다"
01047,0, "위에 오류는 스키마=%s, 패키지=%s, 프로시저=%s에서 발생된 것입니다"
01048,0, "주어진 컨텍스트에서 지정된 프로시저를 찾을 수 없습니다"
01049,0, "스트림된 RPC에서 이름으로 바인드한것은 지원되지 않습니다"
01050,0, "문맥 영역을 개방하기 위한 영역을 획득할 수 없습니다"
01051,0, "잘못된 지연 rpc 버퍼 포맷"
01053,0, "사용자 기억 영역 주소를 읽을 수 없습니다"
01054,0, "사용자 기억 영역 주소에 기록할 수 없습니다"
01057,0, "내부의 New Upi 인터페이스 오류"
01058,0, "internal New Upi interface error"
01059,0, "바인드 또는 실행전에 구문분석이 필요합니다"
01060,0, "배열 바인드 또는 실행이 허용되지 않습니다"
01070,0, "서버용으로 구버전의 오라클을 사용"
01071,0, "ORACLE을 기동하지 않으면 조작 실행이 불가 합니다"
01072,0, "ORACLE은 기동중이 아닙니다 정지할 수 없습니다. "
01073,0, "연결 오류.  콜(call)의 유형을 인식할 수 없습니다"
01074,0, "ORACLE은 정지되지 않습니다 먼저 로그오프해 주십시오"
01075,0, "이미 로그온되어 있습니다"
01076,0, "단일 프로세스에 대한 복수 로그온은 제공되지 않습니다"
01077,0, "백그라운드 프로세스 초기화 오류입니다"
01078,0, "시스템 파라미터 처리 오류입니다"
01079,0, "ORACLE 데이타베이스가 작성되지 않았음 - 작업이 비정상 종료되었습니다"
01080,0, "ORACLE 정지중 오류가 발생했습니다"
01081,0, "이미 기동중인 ORACLE을 기동하려 했습니다"
01082,0, "'row_locking = always' 기능은 TPS 옵션이 없는 ORACLE에서는 지원되지않습니다"
01083,0, "파라미터 값 \"%s\"는 다른 서버들의 값과 불일치합니다"
01084,0, "OCI 호출에 부적당한 인수가 있습니다"
01085,0, "\"%s. %s. %s\"에 대한 지연 원격 프로시저 호출(rpc)에서 오류 발생"
01086,0, "세이브포인트 '%s' 는 설정되어 있지 않습니다"
01087,0, "현재 ORACLE에 로그온되어 있습니다 기동할 수 없습니다. "
01088,0, "액티브 프로세스가 있기 때문에 ORACLE을 정지할 수 없습니다"
01089,0, "정지 처리(즉시)중입니다 조작은 허가되지 않습니다. "
01090,0, "정지 처리중입니다 연결할 수 없습니다. "
01091,0, "기동중에 오류가 발생했습니다"
01092,0, "오라클 인스턴스 종료 분리가 되었습니다"
01093,0, "ALTER DATABASE CLOSE 문은 연결된 세션이 없는 경우에만 가능합니다"
01094,0, "ALTER DATABASE CLOSE 문이 수행중 입니다 연결은 허용되지 않습니다. "
01095,0, "DML 문이 0개의 행을 처리 했습니다"
01096,0, "프로그램 버전 (%s)과 인스턴스 (%s)가 호환성이 없습니다"
01097,0, "트랜잭션 도중에 SHUTDOWN할 수 없습니다- 먼저 커밋 혹은 롤백하십시오"
01098,0, "Long Insert중에 프로그램 인터페이스 오류"
01099,0, "단일 프로세스 모드로 기동된 데이타베이스는 SHARES 모드로 마운트할 수 없습니다"
01100,0, "데이타베이스가 이미 마운트 되었습니다"
01101,0, "다른 인스턴스로 부터 생성된 데이타베이스가 현재 마운트 되었습니다"
01102,0, "데이타베이스가 EXCLUSIVE 모드로 마운트할 수 없습니다"
01103,0, "제어 화일의 데이타베이스명 '%s'는 '%s'가 아닙니다"
01104,0, "제어 화일의 수(%s)가 %s 와 일치하지 않습니다"
01105,0, "올리기는 다른 인스턴스에 의해 마운트하는 것과 호환성이 없습니다"
01106,0, "내리기를 하기전에 데이타베이스를 디스마운트 합니다"
01107,0, "매체 복구를 위해 데이타베이스를 마운트해야 합니다"
01108,0, "화일 %s가 매체 복구 중에 있습니다"
01109,0, "데이타베이스가 개방되지 않습니다"
01110,0, "데이타 화일 %s: '%s'"
01111,0, "데이타 화일 %s의 이름을 모릅니다- 올바른 화일로 재명명 하십시오. "
01112,0, "매체 복구 처리가 개시되지 않았습니다"
01113,0, "화일 %s가 매체 복구되어야 합니다"
01114,0, "화일 '%s'의 블록쓰기 IO 오류입니다블록 번호 %s). "
01115,0, "화일 '%s'의 블록(블록 번호 %s) 읽기 IO 오류입니다"
01116,0, "데이타베이스 화일 %s의 개방 오류입니다"
01117,0, "추가하는 화일 '%s' 의 블록 크기 %s 는 부적합합니다 제한은 %s 입니다. "
01118,0, "데이타베이스 화일을 더 이상 등록할 수 없습니다 제한 %s 를 초과했습니다. "
01119,0, "데이타베이스 화일 '%s' 의 작성 오류입니다"
01120,0, "온라인 데이타베이스 화일 %s은 삭제할 수 없습니다"
01121,0, "데이타 화일 '%s'를 재명명할 수 없습니다-  화일이 사용중이거나 복구중입니다. "
01122,0, "데이타 화일 %s의 검증 체크에 실패 했습니다"
01123,0, "온라인 백업을 개시할 수 없습니다 매체 복구가 사용 불가로 되어 있습니다. "
01124,0, "데이타 화일 %s을 복구할 수 없음 - 화일이 사용중이거나 복구중입니다"
01125,0, "매체 복구를 사용불가할 수 없음.  화일 %s 가 온라인 백업으로 설정됨. "
01126,0, "데이타베이스는 EXCLUSIVE로 마운트하고 개방하지 말아야 합니다"
01127,0, "데이타베이스명 '%s'가 최대 문자수 %s를 초과했습니다"
01128,0, "온라인 백업을 시작할 수 없음 - 화일 %s가 오프라인입니다"
01129,0, "디폴트 또는 임시 테이블 영역이 존재하지 않습니다"
01130,0, "데이타베이스 화일 버전 %s 는 ORACLE 버전 %s 와 호환되지 않습니다"
01131,0, "DB_FILES 파라미터의 값 %s 가 최대수 %s 를 초과했습니다"
01132,0, "데이타베이스 화일명 '%s' 의 길이가 최대 문자수 %s 를 초과했습니다"
01133,0, "로그 화일명 '%s' 의 길이가 최대 문자수 %s 를 초과했습니다"
01134,0, "데이타베이스가 다른 인스턴스에 의해 배타 모드로 마운트했습니다"
01135,0, "DML/질의로 액세스된 화일 %s 는 오프 라인입니다"
01136,0, "화일 %s의 명시된 크기(%s 블록)가 원래 크기 %s 블록보다 작습니다"
01137,0, "데이타 화일 %s가 오프라인으로 되고 있는 중입니다"
01138,0, "데이타베이스가 이 인스턴스로 열거나 다른 인스턴스에 대해 닫아야 합니다"
01139,0, "RESETLOGS 옵션은 불완전한 데이타베이스의 복구 후에만 유효합니다"
01140,0, "온라인 백업을 종료할 수 없음 - 모든 화일이 오프라인입니다"
01141,0, "데이타 화일 %s의 재명명 오류 - 새로운 화일 '%s' 가 없습니다"
01142,0, "온라인 백업을 종료할 수 없음 - 백업할 수 있는 상태의 화일이  없습니다"
01143,0, "매체 복구를 사용불가하게할 수 없습니다 화일 %s가 매체복구를 필요로 합니다. "
01144,0, "화일크기(%s 블록)가 최대치 %s 블록을 초과합니다"
01145,0, "매체 복구가 사용 가능하지 않으면 즉시 오프라인으로 할 수 없습니다"
01146,0, "온라인 백업을 시작할 수 없습니다 - 화일 %s가 이미 백업중에 있습니다"
01147,0, "SYSTEM 테이블 영역 화일 %s가 오프 라인입니다"
01148,0, "이 작업을 하려면 데이타베이스가 EXCLUSIVE 모드로 마운트해야 합니다"
01149,0, "정지처리 불가 - 화일 %s를 온라인 백업중 입니다"
01150,0, "쓰기 방지를 할수 없음 - 화일 %s를 온라인 백업중 입니다"
01151,0, "블록을 복구하려면 미디어 복구를 사용하고 필요하면 백업을 사용하십시오"
01152,0, "화일 %s가 충분한 이전 백업으로 복구되지 않았습니다 "
01153,0, "비호환 매체 복구가 동작 상태입니다"
01154,0, "데이타베이스는 사용중 - 개방, 클로즈, 마운트, 디스마운트 할 수 없습니다"
01155,0, "데이타베이스는 개방, 클로즈, 마운트 혹은 디스마운트 중 입니다"
01156,0, "진행중인 복구 작업이 화일 액세스를 필요로 할 수 있습니다"
01157,0, "데이타 화일 %s를 식별할 수 없습니다- 화일이 발견되지 않음"
01158,0, "데이타베이스 %s 가 이미 마운트했습니다"
01159,0, "화일이 동일한 데이타베이스의 화일이 아닙니다- 데이타베이스 ID가 잘못됨. "
01160,0, "화일이 %s가 아닙니다"
01161,0, "화일헤더에 있는 데이타베이스명 %s가 주어진 이름 %s 와 일치하지 않습니다"
01162,0, "화일 헤더에 블록 크기 %s가 DB_BLOCK_SIZE(%s)와 일치하지 않습니다"
01163,0, "SIZE 절에 %s (블록)이 지정되었으나 헤더 %s와 일치해야 합니다"
01164,0, "MAXLOGFILES는 %s 를 초과할 수 없습니다"
01165,0, "MAXDATAFILES는 %s 를 초과할 수 없습니다"
01166,0, "화일번호 %s가 %s (%s)보다 큽니다"
01167,0, "두개의 화일들이 같은 화일 그룹번호 이거나 같은 화일입니다"
01168,0, "물리 블록 크기 %s가 다른 멤버들의 크기 %s와 일치하지 않습니다"
01169,0, "DATAFILE 번호 1번이 없습니다"
01170,0, "화일이 존재하지 않습니다 '%s'"
01171,0, "체크포인트 오류 때문에 데이타 화일 %s이 오프라인됩니다"
01172,0, "쓰레드 %s의 복구가 블록 %s(화일 %s의)에서 더이상 진행되지 못합니다"
01173,0, "데이타 DICTIONARY"
01174,0, "DB_FILE %s는 호환성을 위해서 %s가 되어야 합니다"
01175,0, "데이타 DICTIONARY가 인스턴스에서 허용하는 %s 보다 많은 수의 화일을 포함합니다"
01176,0, "데이타 DICTIONARY가 제어 화일에서 허용하는 %s 보다 많은 수의 화일을 포함합니다"
01177,0, "데이타 화일이 DICTIONARY와 일치하지 않습니다- 아마도 오래된 것입니다. "
01178,0, "화일 %s가 마지막 CREATE CONTROLFILE 이전에 생성됐음.  재 생성할 수 없습니다"
01179,0, "화일 %s 가 존재하지 않습니다"
01180,0, "데이타 화일 1을 생성할 수 없습니다"
01181,0, "최후의 RESETLOGS 이전에 생성된 화일 %s를 재생성할 수 없습니다"
01182,0, "데이타베이스 화일 %s를 생성할 수 없음 - 사용중이거나 복구중입니다"
01183,0, "SHARED모드로 데이타베이스를 마운트할 수 없습니다"
01184,0, "로그화일 그룹 %s는 이미 존재합니다"
01185,0, "로그화일 그룹 %s는 부적절합니다"
01186,0, "화일 %s의 검증 테스트에 실패했습니다"
01187,0, "검증 테스트에 실패했기 때문에 화일 %s를 읽을 수 없습니다"
01188,0, "헤더내의 블록 크기 %s가 실제 물리블록 크기 %s와 맞지 않습니다"
01189,0, "이전 화일과 다른 RESETLOGS가 사용되었습니다"
01190,0, "제어 화일 혹은 데이타 화일 %s는 마지막 RESETLOGS 이전의 것입니다"
01191,0, "화일 %s는 이미 오프라인임 - 정상적인 오프라인을 할 수 없습니다"
01192,0, "최소한 하나의 이용 가능한 쓰레드를 가져야합니다"
01193,0, "화일 %s는 복구 시작시 인식된 화일이 아닙니다"
01194,0, "화일 %s가 일관성을 갖기 위해서는 더 많은 복구가 필요로 합니다"
01195,0, "화일 %s의 온라인 백업은 일관성을 갖기위해 더 많은 복구가 필요로 합니다"
01196,0, "매체복구 세션의 실패로 인하여 화일 %s의 일관성이 결여되어 있습니다"
01197,0, "쓰레드 %s는 하나의 로그만을 포함하고 있습니다"
01198,0, "RESETLOGS인 경우 로그화일에 대한 크기를 지정하여야 합니다"
01199,0, "화일 %s는 온라인 백업 모드가 아닙니다"
01200,0, "실제 화일크기 %s는 맞는 크기인 %s 블록보다 작습니다"
01201,0, "헤더내의 화일 크기 %s가 제어화일내의 크기 %s와 일치하지 않습니다"
01202,0, "화일의 구현이 잘못됨 - 작성 시각이 틀립니다"
01203,0, "화일의 구현이 잘못됨 - 작성 SCN이 틀립니다"
01204,0, "화일 번호가 %s (%s가 아님) - 틀린 화일입니다"
01205,0, "데이타 화일이 아님 - 헤더내의 유형 번호가 %s입니다"
01206,0, "화일은 이 데이타베이스의 일부가 아님 - 데이타베이스 ID가 틀립니다"
01207,0, "화일이 제어화일보다 최근의 것임 - 오래된 제어화일입니다"
01208,0, "데이타 화일이 구버전임 - 현 버전을 액세스하지 않았습니다"
01209,0, "데이타 화일이 마지막 RESETLOGS 이전의 것입니다"
01210,0, "데이타 화일의 헤더가 매체 붕괴되었습니다"
01211,0, "버전 6의 데이타 화일이 버전7으로의 변환 화일이 아닙니다"
01212,0, "MAXLOGMEMBERS는 %s를 초과할 수 없습니다"
01213,0, "MAXINSTANCE는 %s를 초과할 수 없습니다"
01214,0, "MAXLOGHISTORY는 %s를 초과할 수 없습니다"
01215,0, "CREATE CONTROLFILE이후의 가용 쓰레드 %s가 빠졌습니다"
01216,0, "CREATE CONTROLFILE이후 쓰레드 %s는 사용불가되어야합니다"
01217,0, "로그화일 멤버가 다른 로그화일 그룹에 속해있습니다"
01218,0, "로그화일 멤버는 동일한 시간때에 만든것이 아닙니다"
01219,0, "데이타베이스가 열지 않았음: 고정 테이블/뷰에 대해서만 조회가 가능합니다"
01220,0, "데이테베이스가 개방 되기전에는, 화일을 기본으로하는 소트가 부적합합니다"
01221,0, "데이타 화일 %s는 백그라운드 프로세스에 대해 동일 화일이 아닙니다"
01222,0, "%s의 MAXINSTANCES는 MAXLOGFILES가 최소 %s이어야함(%s가 아님)"
01223,0, "새로운 데이타베이스명을 부여하기 위해서는 RESETLOGS를 지정하여야 합니다"
01224,0, "헤더 %s내의 그룹번호가 GROUP %s와 맞지 않습니다"
01225,0, "쓰레드 번호 %s가 MAXINSTANCES %s 보다 큽니다"
01226,0, "로그 멤버의 화일헤더가 다른 멤버와 일치하지 않습니다"
01227,0, "로그 %s는 다른 로그와 일치하지 않습니다"
01228,0, "기초 데이테베이스를 설치하려면 SET DATABASE 옵션이 필요합니다"
01229,0, "데이타 화일 %s가 로그와 일치하지 않습니다"
01230,0, "읽기 전용으로 만들수 없습니다- %s 화일이 오프라인입니다"
01231,0, "쓰기 전용으로 만들수 없습니다- %s 화일이 오프라인입니다"
01232,0, "온라인 백업을 수행할 수 없습니다- %s 화일은 읽기 전용입니다"
01233,0, "%s 화일은 읽기 전용입니다- 컨트롤화일 백업을 사용해서 복구할 수 없습니다"
01234,0, "화일 %s의 백업을 종료할 수 없습니다 - 화일을 사용중이거나 복구중입니다"
01235,0, "%s 화일에 대한 END BACKUP은 실패하고 %s에 대해서는 성공했습니다"
01237,0, "데이타화일 %s를 확장할 수 없습니다"
01238,0, "데이타화일 %s를 축소할 수 없습니다"
01239,0, "데이터베이스는 외부 캐시를 사용하기 위해서 ARCHIVELOG 모드로 되어 있어야 합니다"
01240,0, "하나의 명령어에 너무 많은 데이터 화일을 추가합니다"
01241,0, "외부 캐시가 죽었습니다"
01242,0, "데이터 화일이 메디아 실패를 받았습니다: 데이터베이스는 NOARCHIVELOG 모드입니다"
01243,0, "시스템 테이블스페이스 화일이 메디아 실패를 받았습니다"
01244,0, "메디아 복구에 의해서 제어화일에 이름 없는 데이터화일이 추가되었습니다"
01245,0, "오프라인 화일 %s 은 RESETLOGS이 끝나면 없어집니다"
01400,0, "행의 입력으로 필수 열(NOT NULL)에 값이 지정되지 않았습니다"
01401,0, "열에 입력한 값이 너무 큽니다"
01402,0, "뷰의 WITH CHECK OPTION의 조건에 위배 됩니다"
01403,0, "데이타가 없습니다"
01404,0, "ALTER COLUMN은 색인을 너무 크게 만들 수 있습니다"
01405,0, "인출된 열의 값은 NULL입니다"
01406,0, "인출된 열의 값이 절사되었습니다"
01407,0, "입력 필수 열(NOT NULL)은 NULL로 갱신할 수 없습니다"
01408,0, "열 리스트에는 이미 색인이 작성되어 있습니다"
01409,0, "NOSORT 옵션은 사용할 수 없습니다 행이 오름차순으로 되어 있지 않습니다. "
01410,0, "ROWID가 부적합합니다"
01411,0, "표시기내에 열의 길이를 저장할 수 없습니다"
01412,0, "이 데이타 유형에 대해서는 0길이가 허용되지 않습니다"
01413,0, "팩형 십진수 버퍼안의 값이 부적합합니다"
01414,0, "배열을 바인드 할때 배열 길이가 부적합합니다"
01416,0, "두 개의 테이블을 outer-join할 수 없습니다"
01417,0, "하나의 테이블은 하나의 다른 테이블과 outer-join할 수 있습니다"
01418,0, "지정한 색인는 존재하지 않습니다"
01419,0, "datdts: 형식 코드 오류입니다"
01420,0, "datstd: 형식 코드 오류입니다"
01421,0, "datrnd/dattrn: 정도 지정자 오류입니다"
01422,0, "실제 인출은 요구된 것보다 많은 수의 행을 추출합니다"
01423,0, "실제 인출에서 여분의 행을 검사하는 중에 오류가 검출되었습니다"
01424,0, "에스케이프 문자 뒤에 누락 혹은 부당한 문자가 있습니다"
01425,0, "에스케이프 문자는 1자리 문자 스트링이어야 합니다"
01426,0, "수치 오버플로우"
01427,0, "단일 행 부속 질의에 의해 2개 이상의 행이 리턴되었습니다"
01428,0, "인수 '%s'가 범위를 벗어났습니다"
01430,0, "추가하려는 열이 이미 테이블에 존재합니다"
01431,0, "GRANT 명령어 내부 불일치 오류입니다"
01432,0, "삭제할 공개 동의어가 존재하지 않습니다"
01433,0, "작성한 동의어가 이미 정의되어 있습니다"
01434,0, "삭제할 비공개 동의어가 존재하지 않습니다"
01435,0, "사용자가 존재하지 않습니다"
01436,0, "CONNECT BY의 루프가 발생되었습니다"
01437,0, "결합은 CONNECT BY와 함께 지정할 수 없습니다"
01438,0, "지정한 정도를 초과한 값이 열에 지정되었습니다"
01439,0, "데이타 유형을 변경할 열은 비어 있어야 합니다"
01440,0, "정도 또는 자리수를 축소할 열은 비어 있어야 합니다"
01441,0, "길이를 짧게 변경할 열의 값은 NULL이어야 합니다"
01442,0, "변경하고자 하는 열이 이미 NOT NULL입니다"
01443,0, "내부 오류 : 뷰 열의 데이타 유형이 부적합합니다"
01444,0, "내부 오류 : 내부 데이타 유형와 외부 데이타 유형은 부적합합니다"
01445,0, "키-보전 테이블 없이 결합 뷰으로 부터 ROWID를 선택할 수 없습니다"
01446,0, "DISTINCT, GROUP BY 등을 포함하는 뷰로부터 ROWID를 선택할 수 없습니다"
01447,0, "클러스터 열에 ALTER TABLE 문을 사용할 수 없습니다"
01448,0, "데이타 유형을 변경하기 전에 색인을 삭제해야 합니다"
01449,0, "열이 NULL값을 포함하고 있습니다 NOT NULL로 변경할 수 없습니다"
01450,0, "키의 최대 길이(%s)를 초과했습니다"
01451,0, "열이 이미 NULL로 되어 있습니다"
01452,0, "중복 키가 있습니다.  유일한 색인을 작성할 수 없습니다"
01453,0, "SET TRANSACTION 사용시에는 트랜잭션의 최초문장 이어야 합니다"
01454,0, "수치 데이타 유형으로 변환할 수 없습니다"
01455,0, "열의 변환에 의해 정수 데이타 유형이 오버플로우되었습니다"
01456,0, "READ ONLY 트랜잭션은 삽입/삭제/갱신할 수 없습니다"
01457,0, "열의 변환에 의해 DECIMAL 데이타 유형이 오버플로우되었습니다"
01458,0, "가변장 스트링의 지정된 길이가 부적합합니다"
01459,0, "가변장 스트링의 길이가 부적합합니다"
01460,0, "요구된 변환은 실행될 수 없습니다"
01461,0, "LONG  값은  LONG 열에만 입력할 수 있습니다"
01462,0, "2000 문자 이상은 입력할 수 없습니다"
01463,0, "자신에 대한 권한의 허가나 취소는 불가능합니다"
01464,0, "테이블 또는 뷰의 GRANT 오류입니다"
01465,0, "16진수의 지정이 부적합합니다"
01466,0, "테이블 정의가 변경되었습니다 데이타를 읽을 수 없습니다. "
01467,0, "정렬 키가 너무 깁니다"
01468,0, "outer-join된 테이블은 1개만 지정할 수 있습니다"
01469,0, "PRIOR의 뒤에는 열 명을 지정해 주십시오"
01471,0, "개체와 같은 이름의 동의어는 작성할 수 없습니다"
01472,0, "CONNECT BY는 DISTINCT, GROUP BY 를 동반한 뷰에 사용할 수 없습니다"
01473,0, "CONNECT BY 구에 부속 질의를 지정할 수 없습니다"
01474,0, "CONNECT BY 없이 START WITH 나 PRIOR 는 지정할 수 없습니다"
01475,0, "바인드 변수의 데이타 유형 변경을 위해서는 커서를 재구문분석을 해야 합니다"
01476,0, "제수가 0 입니다"
01477,0, "사용자 데이타 영역 기술자가 너무 큽니다"
01478,0, "LONG 열은 배열 바인드에 사용할 수 없습니다"
01479,0, "버퍼내의 마지막 문자가 널(Null)이 아닙니다"
01480,0, "STR 바인드 값에 종료의 널이 없습니다"
01481,0, "숫자 형식 모델이 부적합합니다"
01482,0, "지정된 문자세트는 제공하지 않습니다"
01483,0, "DATE 또는 NUMBER 바인드 변수의 길이가 부적합합니다"
01484,0, "배열은 PL/SQL문 범위에서만 해야 합니다"
01485,0, "실행 바인드 길이가 컴파일 바인드 길이와 다릅니다"
01486,0, "배열요소 크기가 너무 큽니다"
01487,0, "팩형 십진수가 제공된 버퍼에 비해 너무 큽니다"
01488,0, "부적절한 팩형 십진수 입니다"
01489,0, "스트링 연결의 결과가 너무 깁니다"
01490,0, "부적합한 ANALYZE 명령입니다"
01491,0, "CASCADE 옵션이 부적합합니다"
01492,0, "현 트랜잭션이 이미 롤백 세그먼트에 연결되어 있습니다"
01493,0, "명시된 SAMPLE 길이가 부적합합니다"
01494,0, "지정된 SIZE가 부적당합니다"
01495,0, "지정된 연결행 테이블이 없습니다"
01496,0, "지정된 연결행 테이블 형식이 틀립니다"
01497,0, "ANALYZE CLUSTER에 대한 옵션이 잘못되었습니다"
01498,0, "블록 체크 실패 - 트래스 화일을 보십시오"
01499,0, "테이블/색인의 교차 참조 실패 - 트래스 화일을 보십시오"
01500,0, "날짜/시간의 획득 오류입니다"
01501,0, "CREATE DATABASE 문 오류입니다"
01502,0, "색인 '%s. %s'는 직접 로드 상태입니다"
01503,0, "CREATE CONTROLFILE이 실패했습니다"
01504,0, "데이타베이스명 '%s'가 db_name 파라미터 '%s'와 맞지않습니다"
01505,0, "로그 화일 등록 오류입니다"
01506,0, "데이타베이스 명을 올바르게 지정해 주십시오. "
01507,0, "데이타베이스가 마운트하지 않았습니다"
01508,0, "화일 '%s' 의 줄 %s 에 오류.  데이타베이스를 생성할 수 없습니다"
01509,0, "지정한 이름 '%s' 가 실제의 이름 '%s' 와 일치하지 않습니다"
01510,0, "로그 화일 삭제 오류입니다"
01511,0, "로그/데이타 화일의 재명명 오류입니다"
01512,0, "로드 화일 %s의 재명명 오류 - 새로운 화일 %s가 없습니다"
01513,0, "운영 시스템으로 부터 부정확한 현시각이 보내졌습니다"
01514,0, "로그 명세에 오류: 그런 로그가 없습니다"
01515,0, "로그 그룹 %s의 삭제시 오류.  그런 로그가 없습니다"
01516,0, "로그/데이타 화일 '%s' 는 존재하지 않습니다"
01517,0, "로그 멤버: '%s'"
01518,0, "2개 이상의 로그 화일을 CREATE DATABASE 에 지정해 주십시오. "
01519,0, "오류 발생(화일 '%s' 의 줄 %s 부근)"
01520,0, "추가할 데이타 화일의 수(%s)가 최대수 %s 를 초과했습니다"
01521,0, "데이타 화일의 등록중 오류가 발생했습니다"
01522,0, "재명명할 화일 '%s' 가 없습니다"
01523,0, "데이타 화일 '%s' 는 이미 데이타베이스의 일부입니다.  재명명할 수 없습니다"
01524,0, "'%s'로 데이타 화일을 생성할 수 없음 - 화일이 이미 데이타베이스의 부분입니다"
01525,0, "데이타 화일의 재명명중 오류가 발생했습니다"
01526,0, "화일 '%s' 의 열기 오류가 발생했습니다"
01527,0, "화일을 읽는 도중 오류가 발생했습니다"
01528,0, "SQL 문의 처리중 EOF 오류입니다"
01529,0, "화일 '%s' 의 클로즈중 오류가 발생했습니다"
01530,0, "이 인스턴스는 이미 데이타베이스를 마운트했습니다"
01531,0, "이 인스턴스는 이미 데이타베이스를 개방했습니다"
01532,0, "인스턴스가 기동되어 있습니다.  데이타베이스를 생성할 수 없습니다"
01533,0, "화일 '%s' 는 테이블 영역에 속해 있지 않습니다.  재명명할 수 없습니다"
01534,0, "롤백 세그먼트 '%s' 가 존재하지 않습니다"
01535,0, "롤백 세그먼트 '%s' 는 이미 존재합니다"
01536,0, "테이블 영역 '%s' 에 대한 영역 할당량이 초과됐습니다"
01537,0, "데이타 화일 '%s' 는 이미 데이타베이스의 일부입니다 등록할 수 없습니다. "
01538,0, "롤백 세그먼트를 획득할 수 없습니다"
01539,0, "테이블 영역 '%s' 가 온라인이 아닙니다"
01540,0, "테이블 영역 '%s' 가 오프라인이 아닙니다"
01541,0, "SYSTEM 테이블 영역은 오프라인될 수 없습니다 필요하면 중지 하십시오"
01542,0, "테이블 영역 '%s' 가 오프라인입니다.  영역을 할당할 수 없습니다"
01543,0, "테이블 영역 '%s' 는 이미 존재하고 있습니다"
01544,0, "시스템 롤백 세그먼트는 삭제할 수 없습니다"
01545,0, "롤백 세그먼트 '%s' 는 사용할 수 없습니다"
01546,0, "테이블 영역에 액티브 롤백 세그먼트 '%s' 가 있습니다"
01548,0, "액티브 롤백 세그먼트 '%s' 가 존재함, 테이블 영역의 삭제를 종료하십시오. "
01549,0, "테이블 영역이 비어있지 않으므로 INCLUDING CONTENTS를 사용해 주십시오. "
01550,0, "시스템 테이블 영역은 삭제할 수 없습니다"
01551,0, "롤백 세그먼트 확장 오류입니다"
01552,0, "시스템 테이블 영역이 아닌 '%s' 에 시스템 롤백 세그먼트를 사용할 수 없습니다"
01553,0, "MAXEXTENTS는 현재 할당된 %s 엑스텐트 수 이상이어야 합니다"
01554,0, "트랜잭션 슬롯이 없습니다"
01555,0, "스냅샷이 너무 오래 되었습니다(롤백 세그먼트가 너무 작습니다)"
01556,0, "롤백 세그먼트를 위한 MINEXTENTS는 1보다 커야만 합니다"
01557,0, "롤백 세그먼트 엑스텐트는 최저 %s 블록이 필요합니다"
01558,0, "롤백 세그먼트 %s 에 트랜잭션 번호가 없습니다"
01559,0, "롤백 세그먼트의 MAXEXTENTS 는 2 이상입니다"
01560,0, "글로벌 해쉬 테이블의 크기가 %s와 일치하지 않습니다 (%s !=%s)"
01561,0, "지정된 테이블 영역중의 개체가 삭제되지 않았습니다"
01562,0, "롤백 세그먼트 확장 실패입니다 (id = %s)"
01563,0, "키워드 PUBLIC 을 사용해 주십시오"
01564,0, "롤백 세그먼트는 PUBLIC 이 아닙니다"
01565,0, "화일 '%s' 의 식별 오류가 발생했습니다"
01566,0, "DROP LOGFILE에 화일이 2회 이상 지정되었습니다"
01567,0, "로그 %s를 삭제하면 쓰레드 %s에 남는 로그 화일이 2개 미만으로 됩니다"
01568,0, "PUBLIC에 영역 할당량을 설정할 수 없습니다"
01569,0, "시스템 DICTIONARY 테이블에 대한 데이타 화일이 너무 작습니다"
01570,0, "MINEXTENTS는 현재 할당된 %s보다 클 수 없습니다"
01571,0, "로그 레코드 버전 %s 가 ORACLE의 버전 %s 과 호환되지 않습니다"
01572,0, "롤백 세그먼트용 글로벌 해쉬 테이블의 크기 %s가 롤백 세그먼트 번호 %s 에 대해 너무 작음"
01573,0, "인스턴스의 정지 처리가 진행중.  더 이상의 변경은 허용되지 않습니다"
01574,0, "최대 동시 실행 트랜잭션 수를 초과했습니다"
01575,0, "영역 관리 자원의 대기중 시간이 초과되었습니다"
01576,0, "인스턴스 잠금 프로토콜 버전 %s는 ORACLE의 버전 %s 와 호환되지 않습니다"
01577,0, "로그 화일 '%s'는 이미 데이타베이스의 일부입니다 등록이 불가능합니다. "
01578,0, "ORACLE 데이타 블록이 파손되었습니다 (화일 번호 %s, 블록 번호 %s)"
01579,0, "복구중 기록(write) 오류가 발생했습니다"
01580,0, "제어 화일의 백업 화일 %s 를 작성하는 중에 오류가 발생했습니다"
01581,0, "이미 할당된 롤백 세그먼트(%s) 새로운 익스텐트(%s)를 사용하려 시도했습니다"
01582,0, "백업을 하기위해 제어 화일을 열 수 없습니다"
01583,0, "백업될 제어 화일의 블록 크기를 획득할 수 없습니다"
01584,0, "백업될 제어 화일의 화일 크기를 획득할 수 없습니다"
01585,0, "백업 화일 %s 를 인식할 수 없습니다"
01586,0, "백업을 하기위한 수신 화일 %s을 열 수 없습니다"
01587,0, "제어 화일의 백업 화일 복제중 오류가 발생했습니다"
01588,0, "데이타베이스를 열기 위해서는 RESETLOGS 옵션을 사용해야 합니다"
01589,0, "데이타베이스를 열기 위해서는 RESETLOGS/NORESETLOGS 옵션을 사용해야 함"
01590,0, "가용 세그멘트 수(%s)가 최대치인 %s 를 초과합니다"
01591,0, "잠금이 in-doubt 분산 트랜잭션 %s에 주어졌습니다"
01592,0, "버전 6의 롤백 세그먼트(%s)를 Oracle7 포맷으로 변환시 오류 발생"
01593,0, "롤백 세그먼트의 최적크기(%s 블록)가 초기크기 계산(%s 블록)보다 작습니다"
01594,0, "해제될 롤백 세그먼트(%s) 익스텐트(%s)를 연결하려함"
01595,0, "익스텐스(%s)(롤백 세그먼트 (%s)의) 해제시 오류"
01596,0, "%s 파라미터에 시스템을 지정할 수 없습니다"
01597,0, "시스템 롤백 세그먼트를 온라인 혹은 오프라인시킬 수 없습니다"
01598,0, "롤백 세그먼트 '%s'가 온라인이 아닙니다"
01599,0, "롤백 세그먼트(%s)를 획득하는데 실패, 캐쉬 영역이 꽉찼습니다현재(%s)엔트리를 가짐)"
01600,0, "많아야 하나의 \"%s\" (gc_files_to_locks의 \"%s\"절에)"
01601,0, "gc_files_to_locks의 \"%s\"절에 부당한 버켓(bucket) 크기"
01602,0, "gc_files_to_locks에 예정된 것보다 gc_db_locks에 더 많은 잠금임"
01603,0, "gc_files_to_locks의 \"%s\"절에 부당한 그룹크기"
01604,0, "gc_files_to_locks의 \"%s\"절에 부당한 화일 번호 범위"
01605,0, "gc_files_to_locks의 \"%s\"절에 화일 번호 누락"
01606,0, "gc_files_to_lock가 마운트한 다른 인스턴스의 그것과 동일하지 않습니다"
01607,0, "gc_lck_procs (%s)가 다른 인스턴스 (%s)와 같지 않습니다"
01608,0, "롤백 세그먼트 '%s'를 온라인화할 수 없음.  상태는 (%s)"
01609,0, "로그 %s는 쓰레드 %s에 대한 현 로그 - 멤버를 삭제할 수 없습니다"
01610,0, "BACKUP CONTROLFILE 옵션을 이용해서 복구가 끝나야만 합니다"
01611,0, "쓰레드번호 %s는 부적절함 - %s보다 커서는 안됩니다"
01612,0, "쓰레드 %s는 이미 가용되었습니다"
01613,0, "쓰레드 %s는 %s 로그만을 가짐 - 가용화를 위해서는 최소 2개의 로그를 필요로 함"
01614,0, "쓰레드 %s는 사용중임 - 사용가능하게할 수 없습니다"
01615,0, "쓰레드 %s는 마운트됨 - 사용불가하게할 수 없습니다"
01616,0, "쓰레드 %s는 열려 있음 - 사용불가하게할 수 없습니다"
01617,0, "마운트할 수 없음: %s는 정당한 쓰레드 번호가 아님"
01618,0, "쓰레드 %s는 사용가능하지 않았음 - 마운트할 수 없습니다"
01619,0, "쓰레드 %s는 다른 인스턴스에 의해 마운트했습니다"
01620,0, "마운트에 필요한 공용 쓰레드가 없습니다"
01621,0, "데이타베이스가 열려 있으면 현 로그의 멤버를 개명할 수 없습니다"
01622,0, "쓰레드 번호가 지정되어야함 - 디폴트는 없습니다"
01623,0, "로그 %s는 쓰레드 %s에 대한 현 로그임 - 삭제할 수 없습니다"
01624,0, "로그 %s가 쓰레드 %s 복구시 필요합니다"
01625,0, "롤백 세그먼트 '%s'는 이 인스턴스에 속해있지 않습니다"
01626,0, "롤백 세그먼트 번호 '%s'는 더 이상의 트랜잭션을 처리할 수 없습니다"
01627,0, "롤백 세그먼트 번호 '%s'는 온라인이 아닙니다"
01628,0, "롤백 세그먼트 %s에 대한 최대 익스텐스 수 (%s)에 도달했습니다"
01629,0, "테이블 영역 %s에 대한 실행취소의 저장시 최대 익스텐트 수(%s)에 도달했음"
01630,0, "테이블 영역 %s의 임시 세그먼트에 최대 익스텐트 수(%s)가 되었습니다"
01631,0, "최대 익스텐트 수(%s)에 도달 (테이블 %s. %s)"
01632,0, "최대 익스텐트 수(%s)에 도달 (색인 %s. %s)"
01633,0, "이 조작에는 병렬 서버 옵션이 필요합니다"
01634,0, "롤백 세그먼트 번호 '%s'가 오프라인 되려합니다"
01635,0, "지정된 롤백 세그먼트 번호 %s가 가용하지 않습니다"
01636,0, "롤백 세그먼트 '%s'가 이미 온라인 상태입니다"
01637,0, "롤백 세그먼트 '%s'가 다른 인스턴스(수 %s)에 의해 사용됩니다"
01638,0, "%s 파라미터는 ORACLE 버전 %s에서 병렬 마운트를 허용하지 않습니다"
01639,0, "데이타베이스는 잠금 프로세스 없이 병렬로 마운트할 수 없습니다"
01640,0, "활성 트랙잰션으로 테이블 공간을 읽기 전용으로 만들수 없습니다"
01641,0, "테이블스페이스 '%s'은 온라인이 아닙니다 - 데이타 화일을 추가할 수 없습니다"
01642,0, "읽기 전용 '%s' 테이블 공간에 초기 백업이 필요하지 않습니다"
01643,0, "시스템 테이블 공간를 읽기 전용으로 만들 수 없습니다"
01644,0, "'%s' 테이블 공간은 이미 읽기 전용입니다"
01645,0, "읽기 쓰기를 하기위해서 이전에 시도한것이 반만 완성되었습니다"
01646,0, "'%s' 테이블 공간은 읽기 전용입니다- 읽기 쓰기를 할 수 없습니다"
01647,0, "'%s' 테이블 공간은 읽기 전용이어서, 거기에 공간을 할당할 수 없습니다"
01648,0, "로그 %s는 사용불가인 쓰레드 %s의 현재 로그입니다"
01649,0, "백업 컨트롤 화일에 대한 작업이 허용되지 않습니다"
01650,0, "롤백 세그먼트 %s를 %s에 의해 %s 테이블 공간에서 확장할 수 없습니다"
01651,0, "%s로 테이블 공간 %s에 저장 취소 세그먼트를 확장할 수 없습니다"
01652,0, "%s로 테이블 공간 %s에서 임시 세그먼트를 확장할 수 없습니다"
01653,0, "테이블 %s. %s를 %s에 의해 %s 테이블 공간에서 확장할 수 없습니다"
01654,0, "색인 %s. %s를 %s에 의해 %s 테이블 공간에서 확장할 수 없습니다"
01655,0, " 크러스터 %s. %s를 %s에 의해 %s 테이블 공간에서 확장할 수 없습니다"
01656,0, "최대 번호  확장 (%s)가 %s. %s 크러스터에 도달했습니다"
01657,0, "부적당한 SHRINK 옵션 값"
01658,0, "테이블스페이스 %s에 세그먼트에 대한 INITIAL 익스텐트를 작성할 수 없습니다"
01659,0, "테이블스페이스 %s에 %s이상의 MINEXTENTS를 할당할 수 없습니다"
01660,0, "테이블스페이스 '%s' 은 이미 영구적인 것입니다"
01661,0, "테이블스페이스 '%s' 은 이미 임시적인 것입니다"
01662,0, "테이블스페이스 '%s' 은 비어 있지 않아 임시로 만들 수가 없습니다"
01663,0, "테이블스페이스 '%s' 의 내용은 항상 변경합니다"
01664,0, "정렬 세그먼트로 확장된 트랜잭션은 중지 되었습니다"
01665,0, "제어화일은 대기 제어화일이 아닙니다"
01666,0, "제어화일은 대기 제어화일을 위한 것입니다"
01667,0, "리두 로그는 대기 데이터베이스와 상반됩니다"
01668,0, "데이터 화일의 오프라인을 위해서 대기 데이터베이스가 DROP 옵션을 요구합니다"
01669,0, "대기 데이터베이스 제어화일은 데이터화일과 일치하지 않습니다"
01670,0, "대기 데이터베이스 복구에 새로운 데이터화일 %s 가 필요합니다"
01671,0, "제어화일은 백업합니다, 대기 제어화일을 만들 수 없습니다"
01672,0, "제어화일에 화일이 빠졌거나 하나 더 가지고 있습니다"
01673,0, "데이터 화일 %s 은 식별된것이 아닙니다"
01674,0, "데이터 화일 %s 은 현재 화일 대신 오래된 것을 가지고 있습니다"
01676,0, "대기 화일 이름은 '%s'의 변환을 하는데 최대 %s의 길이를 초과했습니다"
01677,0, "대기 화일 이름이 파라미터 변환을 다른 인스턴스와 다르게 했습니다"
01678,0, "파라미터 %s 은 패턴과 교체로 된 두가지 스트링을 가지고 있어야 합니다"
01679,0, "데이터베이스는 EXCLUSIVE로 마운트 되어야 하고 열려 있지 않아야 합니다"
01680,0, "만약 gc_files_to_locks이 사용하고 있으면 gc_db_locks가 영일 수 없습니다"
01700,0, "리스트 내의 사용자명이 중복되었습니다"
01701,0, "클러스터가 부적합합니다"
01702,0, "뷰는 부적합합니다"
01703,0, "키워드 SYNONYM이 없습니다"
01704,0, "스트링이 너무 깁니다"
01705,0, "상관 열에는 외부 결합을 지정할 수 없습니다"
01706,0, "사용자 함수의 결과가 너무 큽니다"
01707,0, "키워드 LIST가 없습니다"
01708,0, "ACCESS 또는 SESSION을 지정해 주십시오"
01709,0, "프로그램이 존재하지 않습니다"
01710,0, "키워드 OF가 없습니다"
01711,0, "중복된 권한이 리스트되어 있습니다"
01712,0, "자신이 소유하지 않은 권한을 허가할 수 없습니다"
01713,0, "그 권한에 대해서는 GRANT OPTION 이 존재하지 않습니다"
01714,0, "사용자 함수의 실행중 오류가 발생했습니다"
01715,0, "클러스터 색인에는 UNIQUE를 사용할 수 없습니다"
01716,0, "클러스터 색인에는 NOSORT를 사용할 수 없습니다"
01717,0, "secta : 액세스 모드 토큰이 부적합합니다"
01718,0, "BY ACCESS | SESSION절은 NOAUDIT에 대해서는 허용되지 않습니다"
01719,0, "외부 결합 운영 (+)는 OR 또는 IN의 연산수를 허용하지 않습니다"
01720,0, "'%s. %s'에 대한 허가(grant) 옵션은 존재하지 않습니다"
01721,0, "트랜잭션에서 USERENV(COMMITSCN)을 2회 이상 불렀습니다"
01722,0, "수치가 부적합합니다"
01723,0, "길이가 0인 열은 지정할 수 없습니다"
01724,0, "부동 소숫점 수치의 정도를 벗어났습니다 (1 to 126)"
01725,0, "USERENV('COMMITSCN')는 여기에서 허용되지 않습니다"
01726,0, "테이블의 지정이 부적합합니다"
01727,0, "수치의 정도 범위(38 자리 이내)를 초과했습니다"
01728,0, "수치의 스케일 범위(-84 에서 127)를 초과했습니다"
01729,0, "데이타베이스 링크명을 지정해 주십시오"
01730,0, "지정한 열명의 수가 부적합합니다"
01731,0, "뷰 정의가 부적합(순환)합니다"
01732,0, "뷰에 대한 데이타 조작이 부적합합니다"
01733,0, "가상 열은 사용할 수 없습니다"
01734,0, "잘못된 파라미터 - EXTENT MIN 값이 EXTENT MAX 보다 큽니다"
01735,0, "부적합한 ALTER TABLE 옵션입니다"
01736,0, "[NOT] SUCCESSFUL 을 지정해 주십시오. "
01737,0, "공유, 배타 모드에서만 테이블을 잠금할 수 있습니다"
01738,0, "키워드 IN 을 지정해 주십시오"
01739,0, "키워드 MODE 를 지정해 주십시오"
01740,0, "이중 인용부를 지정해 주십시오"
01741,0, "길이가 0인 식별자는 부적합합니다"
01742,0, "주석이 정확하게 종료되지 않았습니다"
01743,0, "내부적 불일치 : 사용자 함수 색인이 부적합합니다"
01744,0, "INTO구의 지정이 부적합합니다"
01745,0, "호스트/바인드 변수명이 부적합합니다"
01746,0, "인디케이터 변수는 사용할 수 없습니다"
01747,0, "열명을 올바르게 지정해 주십시오. "
01748,0, "열명 그 자체만 사용할 수 있습니다"
01749,0, "자신의 권한으로는 GRANT/REVOKE 할 수 없습니다"
01750,0, "UPDATE/REFERENCE 는 열에 의해서가 아닌 테이블 전체로부터 REVOKE 될 수 있습니다"
01751,0, "부적당한 덤프 취소 옵션입니다"
01752,0, "뷰으로 부터 정확하게 하나의 키-보전된 테이블 없이 삭제할 수 없습니다"
01753,0, "열 정의가 클러스터 열의 정의와 일치하지 않습니다"
01754,0, "LONG 유형의 열은 테이블에 1 개만 포함될 수 있습니다"
01755,0, "영역 수나 블록 수를 지정해야만 합니다"
01756,0, "단일 인용부를 지정해 주십시오"
01757,0, "개체 수를 지정해야 합니다"
01758,0, "NOT NULL 열을 추가하기 위해서는 테이블이 비어 있어야 합니다"
01759,0, "사용자 함수가 올바르게 정의되지 않았습니다"
01760,0, "함수의 인수가 부적합합니다"
01761,0, "결합문는 유일 테이블에 DML 작업으로 맵 할 수 없습니다"
01762,0, "vopdrv: 뷰의 질의 블록이 FROM 구에 없습니다"
01763,0, "갱신 또는 삭제가 외부 결합 테이블을 포함하고 있습니다"
01764,0, "결합의 새로운 갱신 값은 유일한것을 보증할 수 없습니다"
01765,0, "테이블의 소유자명을 지정할 수 없습니다"
01766,0, "데이타 사전 개체명을 사용할 수 없습니다"
01767,0, "UPDATE . . .  SET 식은 부속 질의이어야 합니다"
01768,0, "수치 열이 너무 깁니다"
01769,0, "CLUSTER 옵션 지정이 중복되었습니다"
01770,0, "CLUSTER 옵션은 사용할 수 없습니다"
01771,0, "클러스터 테이블에 대한 옵션이 부적합합니다"
01772,0, "LEVEL에 대한 값을 지정해야 합니다"
01773,0, "지정한 CREATE TABLE 문에는 열 데이타 유형을 지정할 수 없습니다"
01774,0, "한번 이상 덤프 취소 옵션이 지정되었습니다"
01775,0, "동의어가 순환 고리 유형으로 정의되어 있습니다"
01776,0, "결합 뷰에 의하여 하나 이상의 기본 테이블을 수정할 수 없습니다"
01777,0, "WITH GRANT 옵션은 사용할 수 없습니다"
01778,0, "부속 질의의 내포 레벨의 제한을 초과했습니다"
01779,0, "키-보존된것이 아닌 테이블로 맵한 열을 수정할 수 없습니다"
01780,0, "스트링 상수가 필요합니다"
01781,0, "UNRECOVERABLE은 AS SELECT와 함께 지정해야 합니다"
01782,0, "클러스터 또는 클러스터 테이블에 대해서는 UNRECOVERABLE을 지정할 수 없습니다"
01783,0, "RECOVERABLE 또는 UNRECOVERABLE 중 하나만을 지정할 수 있습니다"
01784,0, "데이타베이스 미디어 복구가 사용불가이면 RECOVERABLE을 지정할 수 없습니다"
01785,0, "ORDER BY 항목은 SELECT 리스트 식의 수라야 합니다"
01786,0, "FOR UPDATE 구는 사용할 수 없습니다"
01787,0, "질의 블록당 1개의 구만 허용됩니다"
01788,0, "CONNECT BY 구를 지정해 주십시오. "
01789,0, "질의의 결과 열의 수가 틀립니다"
01790,0, "대응하는 식과 같은 데이타 유형이어야 합니다"
01791,0, "SELECT 식이 부적합합니다"
01792,0, "테이블, 뷰에 지정 가능한 열의 최대수는 254 입니다"
01793,0, "지정 가능한 색인 열의 최대수는 16 입니다"
01794,0, "지정 가능한 클러스터 열의 최대수는 16 입니다"
01795,0, "리스트에 지정 가능한 식의 최대수는 254 입니다"
01796,0, "연산자의 지정이 부적합합니다"
01797,0, "연산자의 뒤에 ANY 또는 ALL을 지정해 주십시오. "
01798,0, "EXCEPTION 키워드가 누락되었습니다"
01799,0, "열은 부속 질의에 외부결합될 수 없습니다"
01800,0, "날짜 형식 내의 리터럴이 너무 길어서 처리할 수 없습니다"
01801,0, "날짜 형식이 내부 버퍼에 비해 너무 깁니다"
01802,0, "율리우스일의 지정이 범위를 초과했습니다"
01803,0, "날짜/시각의 획득 실패"
01810,0, "형식 코드가 2 번 나타났습니다"
01811,0, "율리우스일에서 년간 통산일의 사용은 금지되어 있습니다"
01812,0, "년은 1 번만 지정할 수 있습니다"
01813,0, "시간은 1 번만 지정할 수 있습니다"
01814,0, "AM/PM 과 A. M. /P. M. 은 혼재할 수 없습니다"
01815,0, "BC/AD 와 B. C. /A. D. 는 혼재할 수 없습니다"
01816,0, "월은 1 번만 지정할 수 있습니다"
01817,0, "요일은 1 번만 지정할 수 있습니다"
01818,0, "'HH24'와 AM/PM은 혼재할 수 없습니다"
01819,0, "부호가 붙은 년과 BC/AD는 혼재할 수 없습니다"
01820,0, "날짜 지정에 포함된 형식 코드가 부적합합니다"
01821,0, "날짜 형식이 부적합합니다"
01830,0, "날짜 형식의 지정에 불필요한 데이타가 포함되어 있습니다"
01831,0, "년과 율리우스일은 혼재할 수 없습니다"
01832,0, "년의 일과 율리우스일은 혼재할 수 없습니다"
01833,0, "월과 율리우스일은 혼재할 수 없습니다"
01834,0, "월의 일과 율리우스일은 혼재할 수 없습니다"
01835,0, "요일과 율리우스일은 혼재할 수 없습니다"
01836,0, "시와 일의 초는 혼재할 수 없습니다"
01837,0, "시의 분과 일의 초는 혼재할 수 없습니다"
01838,0, "분의 초와 일의 초는 혼재할 수 없습니다"
01839,0, "지정된 월에 대한 날짜가 부적합합니다"
01840,0, "입력된 값의 길이가 날짜 형식에 비해 부족합니다"
01841,0, "년은 -4713 과 +4713 사이의 값으로 지정해 주십시오. "
01842,0, "분기는 1 부터 4 사이의 값을 지정해 주십시오. "
01843,0, "지정한 월이 부적합합니다"
01844,0, "주를 올바르게 지정해 주십시오 ( 1 에서 52 사이 )"
01845,0, "주를 올바르게 지정해 주십시오 ( 1 에서 5 사이 )"
01846,0, "지정한 요일이 부적합합니다"
01847,0, "날짜를 올바르게 지정해 주십시오 ( 1 에서 말일까지 )"
01848,0, "날짜를 올바르게 지정해 주십시오 ( 1 에서 365 사이 )"
01849,0, "시간을 올바르게 지정해 주십시오 ( 1 에서 12 사이 )"
01850,0, "시간을 올바르게 지정해 주십시오 ( 0 에서 23 사이 )"
01851,0, "분을 올바르게 지정해 주십시오 ( 0 에서 59 사이 )"
01852,0, "초를 올바르게 지정해 주십시오 ( 0 에서 59 사이 )"
01853,0, "초를 올바르게 지정해 주십시오 ( 0 에서 86399 사이 )"
01854,0, "율리우스 날짜는 1에서 5373484 사이여야 합니다"
01855,0, "AM/A. M.  또는 PM/P. M. 이 필요합니다"
01856,0, "BC/B. C.  또는 AD/A. D. 이 필요합니다"
01857,0, "시간대가 부적합합니다"
01858,0, "수치를 지정해야할 곳에 비수치 문자가 지정되었습니다"
01859,0, "문자를 지정해야할 곳에 비문자가 지정되었습니다"
01860,0, "년의 주는 1 에서 53 사이이어야 합니다"
01861,0, "스트링이 형식 스트링에 맞지 않습니다"
01862,0, "이 형식의 항목에 대한 잘못된 자리수"
01898,0, "Precision 지정자가 너무 많습니다"
01899,0, "잘못된 Precision 지정자입니다"
01900,0, "키워드 LOGFILE을 지정해 주십시오"
01901,0, "키워드 ROLLBACK을 지정해 주십시오"
01902,0, "키워드 SEGMENT를 지정해 주십시오"
01903,0, "키워드 EVENTS를 지정해 주십시오"
01904,0, "키워드 DATAFILE을 지정해 주십시오"
01905,0, "키워드 STORAGE를 지정해 주십시오"
01906,0, "키워드 BACKUP을 지정해 주십시오"
01907,0, "키워드 TABLESPACE를 지정해 주십시오"
01908,0, "키워드 EXISTS를 지정해 주십시오"
01909,0, "키워드 REUSE를 지정해 주십시오"
01910,0, "키워드 TABLES을 지정해 주십시오"
01911,0, "키워드 CONTENTS를 지정해 주십시오"
01912,0, "키워드 ROW를 지정해 주십시오"
01913,0, "키워드 EXCLUSIVE를 지정해 주십시오"
01914,0, "시퀀스 번호에 대한 감사 옵션이 부적합합니다"
01915,0, "뷰에 대한 감사 옵션이 부적합합니다"
01916,0, "키워드 ONLINE, OFFLINE, RESIZE, AUTOEXTEND 또는 END를 지정하십시오"
01917,0, "사용자 또는 롤 '%s'가 존재하지 않습니다"
01918,0, "사용자 '%s'가 존재하지 않습니다"
01919,0, "롤 '%s'가 존재하지 않습니다"
01920,0, "사용자명 '%s'가 다른 사용자나 롤명과 상충됩니다"
01921,0, "롤명 '%s'가 다른 사용자나 롤명과 상충됩니다"
01922,0, "'%s'를 삭제하려면 CASCADE를 지정하여야 합니다"
01923,0, "개체가 다른 사용자에 의해서 잠금 되어 CASCADE가 비정상 종료되었습니다"
01924,0, "롤 '%s'가 허가되지 않았거나 존재하지 않습니다"
01925,0, "가용 롤의 최대치 %s를 초과했습니다"
01926,0, "WITH GRANT OPTION으로 롤을 GRANT할 수 없습니다"
01927,0, "허가하지 않은 권한을 REVOKE할 수 없습니다"
01928,0, "모든 권한에 대하여 GRANT 옵션이 허가되지는 않았습니다"
01929,0, "GRANT할 권한이 없습니다"
01931,0, "%s를 롤에게 허가할 수 없습니다"
01932,0, "롤 '%s'에 대한 ADMIN 옵션이 허가되지 않았습니다"
01933,0, "롤에 대한 권한으로 저장 개체를 생성할 수 없습니다"
01934,0, "순환되는 롤 권한 부여가 감지되었습니다"
01935,0, "누락된 사용자 혹은 롤명"
01936,0, "사용자나 롤을 생성시 소유자를 지정할 수 없습니다"
01937,0, "부적절한 롤명"
01938,0, "CREATE USER에 대한 IDENTIFIED BY가 지정되어야 합니다"
01939,0, "ADMIN OPTION만이 지정될 수 있습니다"
01940,0, "현재 연결되어 있는 사용자를 삭제할 수 없습니다"
01941,0, "키워드 SEQUENCE가 요구됩니다"
01942,0, "IDENTIFIED BY 와 EXTERNALLY는 모두 지정될 수 없습니다"
01943,0, "IDENTIFIED BY가 이미 지정되었습니다"
01944,0, "IDENTIFIED EXTERNALLY가 이미 지정되었습니다"
01945,0, "DEFAULT ROLE[S]가 이미 지정되었습니다"
01946,0, "DEFAULT TABLESPACE가 이미 지정되었습니다"
01947,0, "TEMPORARY TABLESPACE가 이미 지정되었습니다"
01949,0, "ROLE 키워드가 요구합니다"
01950,0, "테이블 영역 '%s'에 대한 권한이 없읍"
01951,0, "ROLE '%s'가 '%s'에 허가되지 않았습니다"
01952,0, "시스템 권한이 '%s'에 허가되지 않았습니다"
01953,0, "명령어가 더 이상 유효하지 않음,ALTER USER를 보내십시오"
01954,0, "CREATE USER에 DEFAULT ROLE절이 유효하지 않습니다"
01955,0, "DEFAULT ROLE '%s'가 사용자에게 허가되지 않았습니다"
01956,0, "OS_ROLES이 사용될시 부적절한 명령어"
01957,0, "키워드 MIN 혹은 MAX 를 지정해 주십시오"
01958,0, "LAYER 옵션을 위한 정수가 필요합니다"
01959,0, "OPCODE 옵션을 위한 정수가 필요합니다"
01960,0, "부적절한 덤프 로그 화일 옵션입니다"
01961,0, "부적절한 덤프 옵션입니다"
01962,0, "화일 번호 혹은 시퀀스 번호를 지정해야 합니다"
01963,0, "블록 번호를 지정해야 합니다"
01964,0, "TIME 옵션을 위한 시간을 지정해야 합니다"
01965,0, "PERIOD 를 지정해야 합니다"
01967,0, "CREATE CONTROLFILE 의 부적절한 옵션입니다"
01968,0, "RESETLOGS 혹은 NORESETLOGS 를 한번만 지정하십시오"
01969,0, "RESETLOGS 혹은 NORESETLOGS 를 지정해야 합니다"
01970,0, "CREATE CONTROLFILE에 대한 데이타베이스 명을 지정해야 합니다"
01971,0, "부적절한 ALTER TRACING 옵션"
01972,0, "ALTER TRACING ENABLE 혹은 DISABLE에 대한 스트링을 지정해야 합니다"
01973,0, "변경 번호 누락"
01974,0, "부적절한 아카이브옵션"
01975,0, "변환 번호 %s에 부적절한 문자"
01976,0, "변경 번호 누락"
01977,0, "쓰레드 번호 누락"
01978,0, "시퀀스 번호 누락"
01979,0, "롤 %s에 대한 암호가 틀리거나 누락되었습니다"
01980,0, "OS ROLE 초기화시 오류"
01981,0, "현 권한취소를 수행하려면 CASCADE CONSTRAINTS가 지정되어야 합니다"
01982,0, "테이블에 대한 부적절한 감사 옵션"
01983,0, "DEFAULT에 대한 부적절한 감사 옵션"
01984,0, "프로시저/패캐지/함수에 대한 부적절한 감사 옵션"
01985,0, "LICENSE_MAX_USERS 파라미터가 초과되어 사용자를 생성할 수 없습니다"
01986,0, "OPTIMIZER_GOAL에 대한 옵션 부적합"
01987,0, "클라이언트 OS 사용자명이 너무 깁니다"
01988,0, "원격 OS 로그온이 허용되지 않습니다"
01989,0, "롤 '%s'는 운영 시스템에 의해 권한되지 않았습니다"
01990,0, "암호 '%s' 화일을 여는데 오류가 발생했습니다"
01991,0, "'%s' 암호 화일이 부적합합니다"
01992,0, "'%s' 암호 화일을 닫는데 오류가 발생했습니다"
01993,0, "'%s' 암호 화일을 쓰는 중에 오류가 발생했습니다"
01994,0, "GRANT 실패: 공용 암호 화일에다 사용자를 추가할 수 없습니다"
01995,0, "'%s' 암호 화일을 읽는 중에 오류가 발생했습니다"
01996,0, "GRANT 실패: '%s' 암호 화일이 꽉 찼습니다"
01997,0, "GRANT 실패: '%s' 사용자는 여기에 없습니다"
01998,0, "REVOKE 실패: SYS 사용자는 항상 SYSOPER 와 SYSDBA를 가지고 있습니다"
01999,0, "암호 화일 모드는 '%s' 에서 '%s'로 바꾸었습니다"
02000,0, "누락된 %s 키워드"
02001,0, "사용자 SYS는 빈리스트 그룹와 함께 색인을 생성하는것을 허락하지 않습니다"
02002,0, "감사 추적 테이블에 기록 중 오류가 발생했습니다"
02003,0, "USERENV 파라미터가 부적합합니다"
02004,0, "보안 위반"
02005,0, "길이(-1)가 부적합합니다"
02006,0, "팩형 10진 형식 스트링이 부적합합니다"
02007,0, "ALLOCATE 또는 DEALLOCATE 옵션을 REBUILD와 같이 사용할 수 없습니다"
02008,0, "숫자가 아닌 열에 대하여 0 이외의 스케일이 지정되었습니다"
02009,0, "화일에 지정된 크기는 0이 아니어야 합니다"
02010,0, "호스트 연결 스트링을 지정해 주십시오"
02011,0, "데이타베이스 링크명이 중복되었습니다"
02012,0, "키워드 USING 을 지정해 주십시오"
02013,0, "키워드 CONNECT 를 지정해 주십시오"
02014,0, "FOR UPDATE 구를 사용해서 선택할 수 없습니다"
02015,0, "원격 테이블에 대하여 FOR UPDATE 구는 사용할 수 없습니다"
02016,0, "원격 데이타베이스에서는 START WITH 로 부속 질의를 사용할 수 없습니다"
02017,0, "정수 값을 지정해 주십시오"
02018,0, "같은 이름의 데이타베이스 링크가 개방, 연결되어 있습니다"
02019,0, "원격 데이타베이스를 찾을 수 없을때 기술적으로 연결하십시오"
02020,0, "너무 많은 데이타베이스 링크들이 사용되고 있습니다"
02021,0, "원격 데이타베이스에 DDL 조작들이 허용되지 않습니다"
02022,0, "원격 문장이 원격 개체를 갖는 최적화 되지않을 뷰를 사용합니다"
02023,0, "원격 데이타베이스는 START WITH, CONNECT BY 술어를 평가할 수 없습니다"
02024,0, "데이타 링크를 찾을 수 없습니다"
02025,0, "SQL 문장에 있는 모든 테이블은 원격 데이타베이스에 있어야만 합니다"
02026,0, "키워드 LINK 를 지정해 주십시오"
02027,0, "LONG 열은 복수 행의 갱신이 불가능합니다"
02028,0, "정확한 행의 번호를 인출 하는것이 지원되지 않습니다"
02029,0, "키워드 FILE 을 지정해 주십시오"
02030,0, "고정 테이블/고정 뷰에서는 선택만 가능합니다"
02031,0, "고정 테이블에 대하여 ROWID 를 지정할 수 없습니다"
02032,0, "클러스터 색인의 작성 이전에 클러스터 테이블을 사용할 수 없습니다"
02033,0, "이미 클러스터 색인이 존재하고 있습니다"
02034,0, "스피드 바인드가 허용되지 않습니다"
02035,0, "부당한 작업묶음의 조합입니다"
02036,0, "자동커서 개방시 묘사할 변수가 너무 많습니다"
02037,0, "초기화되지 않은 스피드 바인드 영역"
02038,0, "배열 유형에 정의가 허용되지 않습니다 "
02039,0, "배열 유형에 값으로 바인드는 허용되지 않습니다 "
02040,0, "원격 데이타베이스는 %s는 두단계 커밋을 지원하지 않습니다"
02041,0, "클라이언트 데이타베이스는 트랜잭션을 시작하지 않습니다"
02042,0, "너무 많은 분산 트랜잭션들"
02043,0, "%s를 실행하기 전에 현재 트랜잭션을 끝내야 합니다"
02044,0, "트랜잭션 관리자 로그인이 거부되었음: 트랜잭션이 진행중입니다"
02045,0, "글로벌 트랜잭션에 관여한 로컬 세션이 너무 많습니다"
02046,0, "분산 트랜잭션이 이미 시작되었습니다"
02047,0, "진행 중에 분산 트랜잭션을 결합할 수 없습니다"
02048,0, "로그잉하지 않고 분산 트랜잭션을 시작하려 했습니다"
02049,0, "시간초과: 분산 트랜잭션이 잠금으로 대기중 입니다"
02050,0, "트랜잭션 %s가 롤백되고, 다른 원격 DB는 불명료한 상태입니다"
02051,0, "동일 트랜잭션내에 다른 세션이 실패했습다"
02052,0, "원격 트랜잭션이 %s에서 실패했습니다"
02053,0, "트랜잭션 %s가 커밋되고, 다른 원격 DB는 불명료한 상태입니다"
02054,0, "트랜잭션 %s이 불명료한 상태입니다"
02055,0, "분산 수정 작업이 실패했음; 롤백이 요구됩니다"
02056,0, "2PC: %s: 잘못된 두 단계 명령어 번호 %s(%s로 부터의)"
02057,0, "2PC: %s: 잘못된 두 단계 복구상태 번호 %s(%s로 부터의)"
02058,0, "ID %s를 가지는 준비된 트랜잭션이 없습니다"
02059,0, "커밋 코맨트의 ORA-2PC-CRASH-TEST-%s"
02060,0, "select for update문에 분산 테이블에 대한 결합이 지정되었습니다"
02061,0, "select for update에 분산 테이블 목록이 지정되었습니다"
02062,0, "분산 복구가 DBID %s를 받았습니다(%s가 기대되었으나)"
02063,0, "%s%s가 선행됨 (%s%s로 부터)"
02064,0, "분산 작업이 지원되지 않습니다"
02065,0, "ALTER SYSTEM에 대한 부당한 옵션"
02066,0, "누락 혹은 부당한 MTS_DISPATCHERS 텍스트"
02067,0, "트랜잭션 혹은 세이브포인트 롤백이 요구됩니다"
02068,0, "%s%s로 부터의 다음의 치명적인 오류가 있습니다"
02069,0, "global_names 파라미터는 이 작업에 TRUE라고 설정해야만 합니다"
02070,0, "데이타베이스 %s%s는 이문맥에서 %s를 지원하지 않습니다"
02071,0, "원격 데이타베이스 %s에 대한 능력을 초기화시 오류"
02072,0, "분산 데이타베이스의 네트워크 프로토콜이서로 맞지 않습니다"
02073,0, "원격 수정에서는 시퀀스번호가 지원되지 않습니다"
02074,0, "분산 트랜잭션에 %s을 할 수 없습니다"
02075,0, "사용되지 않는 오류입니다"
02076,0, "수정된 테이블이나 long 열의 시퀀스가 동일한 노드에 있어야 합니다"
02077,0, "SELECT문에서 long 열의 값을 가지고 올때는 동일한 노드에 있어야 합니다"
02078,0, "ALTER SYSTEM FIXED_DATE에 대한 지정이 잘못됐습니다"
02079,0, "새로운 세션이 분산 트랜잭션의 커밋에 동참할 수 있습니다"
02080,0, "데이타베이스 링크가 사용중입니다"
02081,0, "데이타베이스 링크가 열려있지  않았습니다"
02082,0, "루프백(loopback) 데이타베이스 링크는 연결 수식어를 가져야합니다"
02083,0, "데이타베이스명에 부적절한 문자 '%s'가 있습니다"
02084,0, "데이타베이스명에 요소가 누락되었습니다"
02085,0, "데이타베이스 링크 %s가 %s에 연결됩니다"
02086,0, "데이타베이스 (링크)명이 너무깁니다"
02087,0, "동일 트랜잭션내의 다른 프로세스에 의해 개체가 잠금 되었습니다"
02088,0, "분산 데이타베이스 옵션이 설치되지 않았습니다"
02089,0, "종속 세션에서는 COMMIT이 허용되지 않습니다"
02090,0, "네트워크 오류: callback+passthru"
02091,0, "트랜잭션이 롤백되었습니다"
02092,0, "분산 트랜잭션에 대한 트랜잭션 테이블 슬롯이 부족합니다"
02093,0, "TRANSACTIONS_PER_ROLLBACK_SEGMENT(%s)가 가능한 최대치(%s) 보다 많습니다"
02094,0, "중복 옵션이 설치되지 않았습니다"
02095,0, "지정된 초기화 파라미터를 수정할 수 없습니다"
02096,0, "지정된 초기화 파라미터는 이 옵션으로 수정가능하지 않습니다"
02098,0, "색인-테이블 참조 (:I)를 파싱하는데 오류"
02099,0, "내부 목적으로 사용됨, 출력되지 않아야 합니다"
02100,0, "PCC: 메모리 부족 (할당할 수 없습니다"
02101,0, "PCC: 일치하지 않는 커서 캐쉬(uce/cuc 불일치)"
02102,0, "PCC: 일치하지 않는 커서 캐쉬(이 uce에 대한 cuc 엔트리가 없습니다"
02103,0, "PCC: 일치하지 않는 커서 캐쉬(cuc 참조가 범위를 벗어남)"
02104,0, "PCC: 일치하지 않는 호스트 캐쉬(사용가능한 cuc가 없습니다)"
02105,0, "PCC: 일치하지 않는 커서 캐쉬(캐쉬내에 cuc 엔트리가 없습니다)"
02106,0, "PCC: 일치하지 않는 커서 캐쉬(OraCursor nr이 잘못됐습니다)"
02107,0, "PCC: 프로그램이 수행시 라이브러리에 대해 너무 오래됨: 다시 PCC하십시오"
02108,0, "PCC: 수행시 라이브러리에 유효하지않은 디스크립터가 넘겨졌습니다"
02109,0, "PCC: 일치하지 않는 호스트 캐쉬(sit 참조가 범위를 벗어남)"
02110,0, "PCC: 일치하지 않는 호스트 캐쉬(유효하지 않은 sqi 유형)"
02111,0, "PCC: 힙 일관성 오류"
02112,0, "PCC: SELECT. . INTO가 너무 많은 행을 리턴합니다"
02140,0, "테이블스페이스 이름이 부적합합니다"
02141,0, "OFFLINE 옵션이 부적합합니다"
02142,0, "적절한 ALTER TABLESPACE 옵션을 지정해 주십시오"
02143,0, "STORAGE 옵션이 부적합합니다"
02144,0, "적절한 ALTER CLUSTER 옵션을 지정해 주십시오"
02145,0, "STORAGE 옵션을 지정해 주십시오"
02146,0, "SHARED 옵션이 복수 회 지정되었습니다"
02147,0, "SHARED 와 EXCLUSIVE 는 혼용할 수 없습니다"
02148,0, "EXCLUSIVE 옵션이 복수 회 지정되었습니다"
02155,0, "DEFAULT 테이블 영역 식별자가 부적합합니다"
02156,0, "TEMPORARY의 테이블 영역 식별자가 부적합합니다"
02157,0, "ALTER USER 옵션을 지정해 주십시오"
02158,0, "CREATE INDEX 옵션이 부적합합니다"
02159,0, "설치된 DLM은 릴리즈가능한 잠금 모드를 지원하지 않습니다"
02161,0, "MAXLOGFILES에 대한 값이 부적합합니다"
02162,0, "MAXDATAFILES에 대한 값이 부적합합니다"
02163,0, "FREELIST GROUPS에 대한 값이 부적합합니다"
02164,0, "DATAFILE 구가 2개 이상 지정되었습니다"
02165,0, "CREATE DATABASE 옵션의 지정이 부적합합니다"
02166,0, "ARCHIVELOG 와 NOARCHIVELOG 가 함께 지정되었습니다"
02167,0, "LOGFILE 구가 2 회 이상 지정되었습니다"
02168,0, "FREELISTS에 대한 부당한 값"
02169,0, "FREELISTS 저장영역 옵션은 허용되지 않습니다"
02170,0, "FREELIST GROUPS 저장영역 옵션은 허용되지 않습니다"
02171,0, "MAXLOGHISTORY에 대한 부당한 값"
02172,0, "사용불가 쓰레드에 대한 PUBLIC 키워드는 적합하지 않습니다"
02173,0, "DROP TABLESPACE 옵션이 부적합합니다"
02174,0, "요구되는 쓰레드 번호의 누락"
02175,0, "롤백 세그먼트 명이 부적합합니다"
02176,0, "CREATE ROLLBACK SEGMENT 옵션이 부적합합니다"
02177,0, "요구되는 그룹 번호의 누락"
02178,0, "올바른 구문 : SET TRANSACTION READ { ONLY | WRITE }"
02179,0, "적당한 옵션: ISOLATION LEVEL { SERIALIZABLE | READ COMMITTED }"
02180,0, "CREATE TABLESPACE 옵션이 부적합합니다"
02181,0, "ROLLBACK WORK 옵션이 부적합합니다"
02182,0, "세이브포인트명을 지정해 주십시오"
02183,0, "적당한 옵션: ISOLATION_LEVEL { SERIALIZABLE | READ COMMITTED }"
02184,0, "REVOKE 에서는 자원의 할당량을 지정할 수 없습니다"
02185,0, "COMMIT 뒤에 WORK 이외의 토큰이 지정되었습니다"
02186,0, "테이블 영역의 자원 권한은 다른 권한과 동시에 지정할 수 없습니다"
02187,0, "할당량의 지정이 부적합합니다"
02189,0, "ON 가 필요합니다"
02190,0, "키워드 TABLES를 지정해 주십시오"
02191,0, "올바른 구문: SET TRANSACTION USE ROLLBACK SEGMENT "
02192,0, "PCTINCREASE는 롤백 세그먼트 영역절에서는 허용되지 않습니다"
02194,0, "이벤트 지정 구문 오류 %s (중요치 않은 오류 %s), '%s' 부근에"
02195,0, "%s 개체를 %s 테이블스페이스에서 만들도록 시도합니다"
02196,0, "PERMANENT/TEMPORARY 옵션이 이미 지정되었습니다"
02197,0, "화일 리스트가 이미 지정되어 있습니다"
02198,0, "ONLINE/OFFLINE 옵션이 이미 지정되어 있습니다"
02199,0, "DATAFILE 구를 지정해 주십시오"
02200,0, "WITH GRANT OPTION 은 PUBLIC 에 대하여 사용할 수 없습니다"
02201,0, "시퀀스를 사용할 수 없습니다"
02202,0, "클러스터에서는 더이상의 테이블을 작성할 수 없습니다"
02203,0, "INITIAL 영역 옵션은 허가되지 않습니다"
02204,0, "ALTER, INDEX, REFERENCES 그리고 EXECUTE는 뷰에서 사용할 수 없습니다"
02205,0, "SELECT 와 ALTER 권한만이 시퀀스에 대하여 사용할 수 있습니다"
02206,0, "INITRANS 옵션 지정이 중복되었습니다"
02207,0, "INITRANS 옵션의 값이 부적합합니다"
02208,0, "MAXTRANS 옵션 지정이 중복되었습니다"
02209,0, "MAXTRANS 옵션의 값이 부적합합니다"
02210,0, "ALTER TABLE 옵션을 지정해 주십시오"
02211,0, "PCTFREE 또는 PCTUSED 에 대한 값이 부적합합니다"
02212,0, "PCTFREE 옵션 지정이 중복되었습니다"
02213,0, "PCTUSED 옵션 지정이 중복되었습니다"
02214,0, "BACKUP 옵션 지정이 중복되었습니다"
02215,0, "TABLESPACE 구가 중복되었습니다"
02216,0, "테이블 영역명을 지정해 주십시오"
02217,0, "기억 영역(storage) 옵션 지정이 중복되었습니다"
02218,0, "INITIAL 옵션의 값이 부적합합니다"
02219,0, "NEXT 옵션의 값이 부적합합니다"
02220,0, "MINEXTENTS 옵션의 값이 부적합합니다"
02221,0, "MAXEXTENTS 옵션의 값이 부적합합니다"
02222,0, "PCTINCREASE 옵션의 값이 부적합합니다"
02223,0, "부당한 OPTIMAL 저장 영역 옵션값"
02224,0, "EXECUTE 권한은 테이블에 대해서는 허용되지 않습니다"
02225,0, "프로시저에 대해서는 EXECUTE 권한만이 유효합니다"
02226,0, "부당한 MAXEXTENTS값 (허용 최대치: %s)"
02227,0, "클러스터명이 부적합합니다"
02228,0, "SIZE 지정이 중복되었습니다"
02229,0, "SIZE 옵션의 값이 부적합합니다"
02230,0, "ALTER CLUSTER 옵션이 부적합합니다"
02231,0, "적절한 ALTER DATABASE 옵션을 지정해 주십시오"
02232,0, "MOUNT 모드가 부적합합니다"
02233,0, "CLOSE 모드가 부적합합니다"
02234,0, "이 테이블에 대한 변경은 이미 로그되어 있습니다"
02235,0, "이 테이블은 다른 테이블에 이미 변경을 기록했습니다"
02236,0, "화일명이 부적합합니다"
02237,0, "화일 크기가 부적합합니다"
02238,0, "화일명 리스트의 화일 수가 다릅니다"
02239,0, "이 시퀀스를 참조하는 개체가 있습니다"
02240,0, "OBJNO 혹은 TABNO에 대한 부당한 값"
02241,0, "EXTENTS (FILE BLOCK SIZE , . . . )유형이어야 합니다"
02242,0, "ALTER INDEX 옵션을 지정해 주십시오"
02243,0, "ALTER INDEX 또는 ALTER SNAPSHOT 옵션이 부적합합니다"
02244,0, "ALTER ROLLBACK SEGMENT 옵션이 부적합합니다"
02245,0, "롤백 세그먼트 명이 부적합합니다"
02246,0, "EVENTS 의 텍스트를 지정해 주십시오"
02247,0, "ALTER SESSION 옵션을 지정해 주십시오"
02248,0, "ALTER SESSION 옵션이 부적합합니다"
02249,0, "MAXLOGMEMBERS에 값이 빠졌거나 부당한 값입니다"
02250,0, "적절한 제약명을 지정해 주십시오"
02251,0, "부속 질의는 사용할 수 없습니다"
02252,0, "검사 제약 조건이 올바르지 않습니다"
02253,0, "제약을 지정할 수 없습니다"
02254,0, "DEFAULT 은 사용할 수 없습니다"
02255,0, "못쓰게된 7. 1. 5"
02256,0, "참조하고 있는 열의 숫자, 유형 그리고 크기는 참조 열의 수와 일치해야 합니다"
02257,0, "열의 최대수를 초과했습니다"
02258,0, "NULL, NOT NULL 지정이 중복 또는 혼재되었습니다"
02259,0, "UNIQUE/PRIMARY KEY의 지정이 중복되었습니다"
02260,0, "테이블에는 기본 키를 1 개만 포함시킬 수 있습니다"
02261,0, "유일 키 또는 기본 키가 이미 존재하고 있습니다"
02262,0, "ORA-%05d 발생.  열의 디폴트 값 식의 유형 검사 오류. "
02263,0, "열의 데이타 유형을 지정해 주십시오"
02264,0, "기존의 제약에 사용된 이름입니다"
02265,0, "참조 열의 데이타 유형이 정의되지 않았습니다"
02266,0, "외래 키에 의해 참조되는 유일/기본 키가 테이블에 있습니다"
02267,0, "열의 데이타 유형이 참조 열의 데이타 유형와 일치하지 않습니다"
02268,0, "참조 테이블에 기본 키가 없습니다"
02269,0, "키 열은 LONG 데이타 유형을 취할 수 없습니다"
02270,0, "이 열목록에 대한 유일 혹은 일차 키가 일치하지 않습니다"
02271,0, "제약명이 없습니다"
02272,0, "제약 열은 LONG 데이타 유형을 취할 수 없습니다"
02273,0, "유일/기본 키가 외부 키에 의해 참조되었습니다"
02274,0, "중복된 참조 제약 지정입니다"
02275,0, "참조 제약이 이미 테이블에 존재합니다"
02276,0, "디폴트 유형이 열의 유형과 일치하지 않습니다"
02277,0, "시퀀스명이 부적합합니다"
02278,0, "MAXVALUE/NOMAXVALUE 지정이 중복 또는 혼재되어 있습니다"
02279,0, "MINVALUE/NOMINVALUE 지정이 중복 또는 혼재되어 있습니다"
02280,0, "CYCLE/NOCYCLE 지정이 중복 또는 혼재되어 있습니다"
02281,0, "CACHE/NOCACHE 지정이 중복 또는 혼재되어 있습니다"
02282,0, "ORDER/NOORDER 지정이 중복 또는 혼재되어 있습니다"
02283,0, "개시 시퀀스 번호는 변경할 수 없습니다"
02284,0, "INCREMENT BY 지정이 중복되었습니다"
02285,0, "START WITH 지정이 중복되었습니다"
02286,0, "ALTER SEQUENCE 옵션을 지정해 주십시오"
02287,0, "시퀀스 번호는 이 위치에 사용할 수 없습니다"
02288,0, "OPEN 모드가 부적합합니다"
02289,0, "시퀀스가 존재하지 않습니다"
02290,0, "체크 제약조건(%s. %s)이 위배되었습니다"
02291,0, "무결성 제약조건(%s. %s)이 위배되었습니다- 부모 키가 없습니다"
02292,0, "무결성 제약조건(%s. %s)이 위배되었습니다- 자식 레코드가 발견되었습니다"
02293,0, "(%s. %s)를 사용가능하게 할 수 없습니다 - 잘못된 제약을 점검"
02294,0, "참조 제약을 추가할 수 없음 - 부모 키가 없습니다"
02295,0, "제약에 대한 하나 이상의 사용가능/사용불가 절이 있습니다"
02296,0, "제약 (%s. %s)을 사용가능하게 할 수 없음 - 부합하는 값이 없습니다"
02297,0, "제약 (%s. %s)을 사용불가하게 할 수 없음 - 종속관계가 있습니다"
02298,0, "제약 (%s. %s)을 사용가능하게 할 수 없음 - 부모 키가 없습니다"
02299,0, "제약 (%s. %s)을 사용가능하게 할 수 없음 - 중복 키가 있습니다"
02351,0, "레코드 %s: 거부되었습니다- 테이블 %s, 열 %s에서 오류"
02352,0, "직접 패스 연결은 동기종 간에만 가능합니다"
02353,0, "복수 자리의 문자 오류"
02354,0, "필드 %s에 대한 초기치를 위한 변환 오류가 발생했습니다"
02355,0, "CONSTANT 필드 %s에 변환 오류가 발생했습니다"
02356,0, "데이타베이스에 더 이상 영역이 없음 - 로드를 계속할 수 없습니다"
02357,0, "팩형 십진수 변환 오류"
02358,0, "존 십진수 변환 오류"
02359,0, "데이타 화일의 필드가 지정된 길이를 초과합니다"
02360,0, "논리 레코드의 끝 이전에 열을 찾을 수 없습니다 (TRAILING NULLCOLS사용)"
02361,0, "최초 인클로징 문자를 찾을 수 없습니다"
02362,0, "논리 레코드의 끝 - 두번째 인클로징 문자가 없습니다"
02363,0, "TERMINATED 와 ENCLOSED 가 지정된 필드에 종료 문자가 없습니다"
02364,0, "%s 레코드가 디스카드됨 - 모든 when 구의 조건을 만족하지 않습니다"
02365,0, "%s 색인이 로드되지 못함"
02366,0, "%s 테이블의 다음 색인이 처리되었습니다"
02367,0, "%s 색인이 로드되었습니다"
02368,0, "%s 레코드가 디스카드됨 - 모든 열이 널입니다"
02369,0, "경고 : 가변길이 필드가 잘렸습니다"
02370,0, "%s 레코드 - %s 테이블의 %s 열에 경고 발생"
02371,0, "직접 패스를 위해서는 로더가 %s. %s. %s. %s. %s 버전 이상 이어야 합니다"
02372,0, "상대시작 위치 > 절대필드 마감 위치"
02373,0, "테이블 %s에 대한 입력 문의 구문분석시 오류"
02374,0, "읽기 버퍼 큐에 대한 더 이상의 슬롯이 없습니다"
02376,0, "부당한 혹은 중복된 자원"
02377,0, "자원의 부당한 한계치"
02378,0, "중복된 자원명 %s"
02379,0, "프로화일 %s이 이미 존재합니다"
02380,0, "프로화일 %s이 존재하지 않습니다"
02381,0, "PUBLIC_DEFAULT 프로화일을 삭제할 수 없습니다"
02382,0, "프로화일 %s에 사용자가 할당되어 있어, CASCADE 없이 삭제할 수 없습니다"
02383,0, "부당한 비용요소"
02390,0, "COMPOSITE_LIMIT을 초과했음, 로그오프될 것입니다"
02391,0, "동시 SESSIONS_PER_USER 한계치를 초과했습니다"
02392,0, "CPU 사용에 대한 세션 한계치를 초과했음.  로그오프될 것입니다"
02393,0, "CPU 사용에 대한 호출 한계치를 초과했습니다"
02394,0, "IO 사용에 대한 세션 한계치를 초과했음.  로그오프될 것입니다"
02395,0, "IO 사용에 대한 호출 한계치를 초과했습니다"
02396,0, "최대 유휴(idle) 시간을 초과했음.  다시 연결하십시오"
02397,0, "PRIVATE_SGA 한계치 초과, 로그오프될 것입니다"
02398,0, "프로시저 영역 사용을 초과했습니다"
02399,0, "최대 연결시간을 초과했음.  로그오프될 것입니다"
02401,0, "다른 사용자의 뷰를 EXPLAIN 할 수 없습니다"
02402,0, "PLAN_TABLE이 없습니다"
02403,0, "플랜 테이블이 정확한 유형이 아닙니다"
02404,0, "지정된 플랜 테이블이 없습니다"
02420,0, "스키마에 대한 권한부여 절의 누락"
02421,0, "누락 혹은 부당한 스키마 권한 식별자"
02422,0, "누락 혹은 부당한 스키마 요소"
02423,0, "스키마명이 스키마 권한 식별자와 맞지 않습니다"
02424,0, "잠재적인 순환 뷰 참조 혹은 불명의 참조 테이블"
02425,0, "테이블의 생성실패"
02426,0, "권한 부여 실패"
02427,0, "뷰의 생성실패"
02428,0, "외래키 참조를 추가할 수 없습니다"
02429,0, "유일/일차 키 적용을 위한 색인을 삭제할 수 없습니다"
02430,0, "제약(%s)을 가용화할 수 없음 - 그런 제약이 없습니다"
02431,0, "제약(%s)을 사용불가하게 할 수 없음 - 그런 제약이 없습니다"
02432,0, "일차키를 사용가능하게 할 수 없음 - 테이블에 일차키가 정의되지 않았습니다"
02433,0, "일차키를 사용불가하게 수 없음 - 테이블에 일차키가 정의되지 않았습니다"
02434,0, "유일성(%s)을 사용가능하게 할 수 없음 - 테이블에 일차키가 정의되지 않았습니다"
02435,0, "유일성(%s)을 사용불가하게 수 없음 - 테이블에 일차키가 정의되지 않았습니다"
02436,0, "CHECK 제약에 날짜 또는 시스템 변수가 잘못 지정되었습니다"
02437,0, "(%s. %s)를 사용가능하게 할 수 없습니다 - 잘못된 기본 키입니다"
02438,0, "열 검사제약은 다른 열을 참조할 수 없습니다"
02439,0, "유일/일차 키 제약상에 유일하지 않은 색인이 있습니다"
02440,0, "참조 제약과 함께 create as select는 허용되지 않습니다"
02441,0, "존재하지 않는 일차 키를 삭제할 수 없습니다"
02442,0, "존재하지 않는 유일 키를 삭제할 수 없습니다"
02443,0, "존재하지 않는 제약 - 삭제할 수 없습니다"
02444,0, "참조 제약에서만 기본 테이블을 참조할 수 없습니다"
02445,0, "예외 테이블이 없습니다"
02446,0, "CREATE TABLE . . .  AS SELECT 실패 - 제약 위반 점검"
02450,0, "부당한 해쉬 옵션 - 키워드 IS 누락"
02451,0, "HASHKEYS의 중복지정"
02452,0, "부당한 HASHKEYS 옵션값"
02453,0, "HASH IS의 중복 지정"
02454,0, "블록(%s)당 해쉬 키의 수가 최대치 %s를 초과했습니다"
02455,0, "클러스터키 열의 수는 1 이어야 합니다"
02456,0, "열 지정 HASH IS는 NUMBER(*,0)이어야 합니다"
02457,0, "HASH IS 옵션에 정당한 열을 지정하여야 합니다"
02458,0, "HASH CLUSTER에 대하여 HASHKEYS가 지정되어야 합니다"
02459,0, "해쉬 키 값은 양의 정수이어야 합니다"
02460,0, "해쉬 클러스터에 대한 부적절한 색인 작업입니다"
02461,0, "INDEX 옵션의 부적절한 사용입니다"
02462,0, "INDEX 옵션의 중복지정"
02463,0, "HASH IS 옵션의 중복지정"
02464,0, "클러스터 정의는 HASH와 INDEX 양쪽 다 일수는 없습니다"
02465,0, "HASH IS 옵션의 부적절한 사용"
02466,0, "HASH CLUSTERS를 위해 SIZE 옵션의 변경은 허용되지 않습니다"
02467,0, "식에 참조된 열을 클러스터 정의에서 찾을 수 없습니다"
02468,0, "식에서 상수 또는 시스템 변수가 잘못 지정되었습니다"
02469,0, "해쉬 식은 Oracle 번호를 리턴하지 않습니다"
02470,0, "TO_DATE, USERENV, 또는 SYSDATE가 해쉬 식에서 잘못 사용되었습니다. "
02471,0, "SYSDATE, UID, USER, ROWNUM, 또는 LEVEL이 해쉬 식에서 잘못 사용되었습니다. "
02472,0, "해쉬 식에 PL/SQL 함수를 사용할 수 없습니다"
02473,0, "클러스터 해쉬 식의 값을 구하는 동안 오류 발생"
02474,0, "고정된 해쉬 영역이 (%s) 범위를 사용했는데 허용된 (%s) 최대값을 초과했습니다"
02476,0, "테이블에서 병렬 직접 로드에 의해 색인을 만들수 없습니다"
02477,0, "개체 %s에 병렬 직접 로드를 실행할 수 없습니다"
02478,0, "기초 세그먼트에 합병하는것은 MAXEXTENTS 한계을 초과하는 것입니다"
02479,0, "병렬 로드에다 화일명을 바꾸는 중에 오류가 발생했습니다"
02480,0, "이벤트에 대한 너무 많은 이벤트 클래스가 지정되었습니다"
02481,0, "이벤트에 대한 너무 많은 id 범위가 지정되었습니다"
02482,0, "이벤트 클래스를 지정했으나 이벤트를 주지 않았습니다"
02483,0, "이벤트에 대한 부당한 ID 값을 지정했습니다"
02485,0, "ID 값의 하한치가 상한치보다 큽니다"
02486,0, "화일 %s에서 오류.  init. ora 파라미터인 trace_dest를 확인하십시오"
02487,0, "화일명 %s을 기록시 오류.  init. ora 파라미터인 trace_dest를 검사하십시오"
02489,0, "trace_block_size (%s)가 %s로 나누어져야 합니다"
02490,0, "RESIZE 절에 필요한 화일 크기가 빠졌습니다"
02491,0, "AUTOEXTEND 절에 필요한 ON 또는 OFF 키워드가 빠졌습니다"
02492,0, "NEXT 절에 필요한 화일 블록 증가 크기가 빠졌습니다"
02493,0, "NEXT 절의 화일 증가 크기가 부적당합니다"
02494,0, "MAXSIZE 절의 최대 화일 크기가 부적당하거나 빠졌습니다"
02495,0, "화일 %s의 크기를 조정할 수 없는데, 테이블스페이스 %s가 읽기전용이기 때문입니다"
02700,0, "osnoraenv: ORACLE_SID의 변환시 오류입니다"
02701,0, "osnoraenv: 오라클 이미지명의 변환시 오류입니다"
02702,0, "osnoraenv: orapop 이미지명의 변환시 오류입니다"
02703,0, "osnpopipe: 파이프 생성에 실패했습니다"
02704,0, "osndopop: 포크에 실패했습니다"
02705,0, "osnpol: 통신 채널의 폴링에 실패했습니다"
02706,0, "osnshs: 호스트명이 너무 깁니다"
02707,0, "osnacx: 문맥 영역을 할당할 수 없습니다"
02708,0, "osnrntab: 호스트로의 연결에 실패, ORACLE_SID가 불명입니다"
02709,0, "osnpop: 파이프 생성에 실패했습니다"
02710,0, "osnpop: 포크(fork)에 실패했습니다"
02711,0, "osnpvalid: 검증 채널로의 연결에 실패했습니다"
02712,0, "osnpop: malloc 실패"
02713,0, "osnprd: 메세지 수신에 실패했습니다"
02714,0, "osnpwr: 메세지 송신에 실패했습니다"
02715,0, "osnpgetbrkmsg: 호스트로부터의 메시지가 부정확한 메시지 유형을 갖습니다"
02716,0, "osnpgetdatmsg: 호스트로부터의 메시지가 부정확한 메시지 유형을 갖습니다"
02717,0, "osnpfs: 기록된 바이트 수가 잘못되었습니다"
02718,0, "osnprs: 프로토콜 재설정 오류"
02719,0, "osnfop: 포크(fork)에 실패했습니다"
02720,0, "osnfop: shmat 실패"
02721,0, "osnseminit: 세마포 세트를 생성할 수 없습니다"
02722,0, "osnpui: orapop에 중지메시지를 송신할 수 없습니다"
02723,0, "osnpui: 중지메시지를 송신할 수 없습니다"
02724,0, "osnpbr: orapop에 중지메시지를 송신할 수 없습니다"
02725,0, "osnpbr: 중지메시지를 송신할 수 없습니다"
02726,0, "osnpop: 오라클 수행모듈의 액세스 오류입니다"
02727,0, "osnpop: orapop 수행모듈의 액세스 오류입니다"
02728,0, "osnfop: 오라클 수행모듈의 액세스 오류입니다"
02729,0, "osncon: 드라이버가 osntab내에 없습니다"
02730,0, "osnrnf: 사용자 로그온 디렉토리가 없습니다"
02731,0, "osnrnf: 버퍼의 malloc에 실패했습니다"
02732,0, "osnrnf: 일치하는 데이타베이스 별명을 발견할 수 없습니다"
02733,0, "osnsnf: 데이테베이스 스트링이 너무 깁니다"
02734,0, "osnftt: 공유 메모리의 사용허가를 재설정할 수 없습니다"
02735,0, "osnfpm: 공유 메모리 세그먼트를 생성할 수 없습니다"
02736,0, "osnfpm: 부적절한 공유메모리 번지의 디폴트치입니다"
02737,0, "osnpcl: orapop의 종료를 명령할 수 없습니다"
02738,0, "osnpwrtbrkmsg: 기록된 바이트 수가 잘못되었습니다"
02739,0, "osncon: 호스트 별명이 너무 깁니다"
02750,0, "osnfsmmap: 공유메모리 화일(?/dbs/ftt_. dbf)을 열 수 없습니다"
02751,0, "osnfsmmap: 공유메모리 화일을 배치할 수 없습니다"
02752,0, "osnfsmmap: 부당한 공유메모리 번지입니다"
02753,0, "osnfsmmap: 공유메모리 화일을 닫을 수 없습니다"
02754,0, "osnfsmmap: 공유메모리의 형질을 변경할 수 없습니다"
02755,0, "osnfsmcre: 공유메모리 화일(?/dbs/ftt_. dbf)을 생성할 수 없습니다"
02756,0, "osnfsmnam: 이름 변환에 실패했습니다"
02757,0, "osnfop: fork_and_bind 실패"
02758,0, "내부배열의 할당에 실패했습니다"
02759,0, "요구 디스크립터가 충분하지 않습니다"
02760,0, "클라이언트의 화일 닫기 실패"
02761,0, "취소될 화일 번호가 음수입니다"
02762,0, "취소될 화일 번호가 최대치보다 큽니다"
02763,0, "최소 한건의 요구도 취소할 수 없습니다"
02764,0, "부당한 패키지 모드입니다"
02765,0, "부당한 최대 서버수입니다"
02766,0, "요구 디스크립터의 부당한 최대치입니다"
02767,0, "서버당 하나 이하의 요구 디스크립터가 할당되었습니다"
02768,0, "최대 화일수가 부적절합니다"
02769,0, "SIGTERM에 대한 처리기 지정이 실패했습니다"
02770,0, "전체 블록수가 부적절합니다"
02771,0, "요구 타임아웃 값이 부적절합니다"
02772,0, "서버의 최대 유휴 시간이 부적절합니다"
02773,0, "클라이언트의 최대 대기시간이 부적절합니다"
02774,0, "요구 목록 래치의 타임아웃값이 부적절합니다"
02775,0, "요구 수행 신호가 부적절합니다"
02776,0, "요구 수행 신호값이 최대치를 초과합니다"
02777,0, "로그 디렉토리에 대한 stat실패"
02778,0, "로그 디렉토리에 주어진 이름이 부적합합니다"
02779,0, "코아덤프 디렉토리에 대한 stat실패"
02780,0, "코아덤프 디렉토리에 주어진 이름이 부적합합니다"
02781,0, "시간이 주어지는 플래그에 대한 값이 부적합합니다"
02782,0, "읽기/쓰기 기능이 모두 지정되지 않았습니다"
02783,0, "포스트/대기 기능이 모두 지정되지 않았습니다"
02784,0, "부적절한 공유 메모리 ID가 지정되었습니다"
02785,0, "부적절한 공유 메모리 버퍼크기입니다"
02786,0, "공유 영역에 필요한 크기가 세그먼트 크기보다 큽니다"
02787,0, "세그먼트 목록에 대한 메모리를 할당할 수 없습니다"
02788,0, "async 프로세스 배열내에 커널 프로세스 포인터를 찾을 수 없습니다"
02789,0, "최대 화일 수에 도달했습니다"
02790,0, "화일명이 너무 깁니다"
02791,0, "비동기 I/O에 사용될 화일을 열 수 없습니다"
02792,0, "비동기 I/O에 사용될 화일을 fstat()할 수 없습니다"
02793,0, "비동기 I/O의 닫기 실패"
02794,0, "클라이언트가 공유메모리에 대한 키를 얻을 수 없습니다"
02795,0, "요구 목록이 비었습니다"
02796,0, "수행된 요구가 정확한 상태에 있지 않습니다"
02797,0, "모든 요구에 응답할 수 없습니다"
02798,0, "요구 수가 부적절합니다"
02799,0, "신호 처리기를 대비할 수 없습니다"
02800,0, "요구가 시간 경과되었습니다"
02801,0, "작업이 시간 경과되었습니다"
02802,0, "모든 유휴 서버를 병렬모드에서 사용할 수 없습니다"
02803,0, "현재 시간의 추출에 실패했습니다"
02804,0, "로그 화일명에 대한 메모리 할당에 실패했습니다"
02805,0, "SIGTPA에 대한 처리기를 지정할 수 없습니다"
02806,0, "SIGALRM에 대한 처리기를 지정할 수 없습니다"
02807,0, "I/O 벡터에 대한 메모리 할당에 실패했습니다"
02808,0, "서버가 사용하는 flag array를 위한 메모리 할당에 실패했습니다"
02809,0, "Jump 버퍼가 적절하지 않습니다"
02810,0, "메모리 맵화일에 대한 임시 화일명을 만들수 없습니다"
02811,0, "공유메모리 세그먼트를 첨부할 수 없습니다"
02812,0, "잘못된 첨부 번지입니다"
02813,0, "키를 얻기위한 임시화일명을 만들수 없습니다"
02814,0, "공유 메모리를 얻을 수 없습니다"
02815,0, "공유 메모리를 첨부할 수 없습니다"
02816,0, "프로세스를 죽일 수 없습니다"
02817,0, "읽기실패"
02818,0, "요구된 것보다 적은 수의 블록이 읽혀졌습니다"
02819,0, "쓰기실패"
02820,0, "요구된 수의 블록을 기록할 수 없습니다"
02821,0, "요구된 수의 블록을 읽을 수 없습니다"
02822,0, "부적절한 블록 오프셋"
02823,0, "버퍼가 정열되지 않았습니다"
02824,0, "가용 요구 목록이 비었습니다"
02825,0, "자유롭게 선택할 수 있는 목록에 대한 요구가 해제되지 않았습니다"
02826,0, "부적절한 블록크기 입니다"
02827,0, "부당한 화일번호입니다"
02828,0, "가용 세그먼트 목록이 비었습니다"
02829,0, "적절한 크기의 세그먼트가 없습니다"
02830,0, "세그먼트는 파티션될 수 없음 - 가용 세그먼트가 없습니다"
02831,0, "세그먼트 할당해제 실패 - 세그먼트 목록이 비었습니다"
02832,0, "세그먼트 할당해제 실패 - 세그먼트가 목록에 없습니다"
02833,0, "서버가 화일을 닫을 수 없습니다"
02834,0, "서버가 화일을 열 수 없습니다"
02835,0, "서버가 클라이언트에 신호을 송신할 수 없습니다"
02836,0, "임시 키 화일을 생성할 수 없습니다"
02837,0, "임시 화일을 링크 해제할 수 없습니다"
02838,0, "알람 신호를 위한 신호처리기를 대비할 수 없습니다"
02839,0, "디스크로 블록을 sync하는데 실패했습니다"
02840,0, "클라이언트가 로그 화일을 여는데 실패했습니다"
02841,0, "기동시 서버가 죽었습니다"
02842,0, "클라이언트가 서버를 포크할 수 없습니다"
02843,0, "커널 플래그에 대한 부적절한 값입니다"
02844,0, "열기 허가 플래그에 대한 부적절한 값입니다"
02845,0, "시각 요구 플래그에 대한 부적절한 값입니다"
02846,0, "중지시킬 수 없는 서버입니다"
02847,0, "포스트시 서버가 종료되지 않았습니다"
02848,0, "비동기 I/O 패키지가 가동중이 아닙니다"
02849,0, "오류로 인한 읽기 실패"
02850,0, "화일이 닫혔습니다"
02851,0, "비어있지 않아야할 요구 목록이 비었습니다"
02852,0, "위험 부분에 대한 부적절한 타임아웃 값입니다"
02853,0, "서버 목록 래치 타임아웃 값이 부적절합니다"
02854,0, "요구 버퍼의 수가 부적절합니다"
02855,0, "요구건수가 slaves수 보다 작습니다"
03001,0, "현재에는 구현되어 있지 않은 기능입니다"
03002,0, "이 연산자는 구현되어 있지 않습니다"
03007,0, "이 기능은 폐지되었습니다"
03008,0, "파라미터 COMPATIBLE >= %s 가 %s에 필요합니다"
03100,0, "통신 영역이 할당되지 않음.  메모리가 충분하지 않습니다"
03105,0, "내부 프로토콜 오류"
03106,0, "두 태스크 간의 통신 프로토콜 오류입니다"
03107,0, "oranet 버퍼 언더플로우입니다"
03108,0, "oranet: ORACLE은 이 인터페이스 버전을 지원하지 않습니다"
03109,0, "oranet 버퍼 오버플로우입니다"
03110,0, "oranet: ORACLE은 이 SQL 버전을 지원하지 않습니다"
03111,0, "통신 채널에서 브레이크를 수신했습니다"
03112,0, "단일-태스크로 링크된 서버는 SQL*Net을 사용할 수 없습니다"
03113,0, "통신 채널에 EOF 가 있습니다"
03114,0, "ORACLE에 연결되어 있지 않습니다"
03115,0, "지원되지 않은 네트워크 데이타 유형 또는 표현이 있습니다"
03116,0, "부적당한 버퍼 길이가 변환 루틴으로 전달되었습니다"
03117,0, "2-타스크 보존 영역 오버플로우"
03118,0, "2-타스크 코루틴의 상태가 부적당합니다"
03120,0, "2-타스크 변환 루틴: 정수 오버플로우"
03121,0, "인터페이스 드라이버가 연결되어 있지 않습니다 함수는 실행되지 않습니다. "
03122,0, "사용자측에서 ORACLE측의 윈도우를 클로즈하려 했습니다"
03123,0, "작업이 막힘"
03124,0, "2-타스크 내부 오류"
03125,0, "클라이언트-서버 프로토콜에 위배됩니다"
03126,0, "네트워크 드라이버가 비-블로킹 작업을 지원하지 않습니다"
03127,0, "실행 작업이 종료되기 전에는 새로운 작업을 할 수 없습니다"
03128,0, "연결은 블로킹 모드입니다"
03129,0, "다음 구분이 삽입되도록 요청했습니다"
03130,0, "다음 구분이 인출 되도록 요청한 버퍼입니다"
03131,0, "다음 구분을 위한 버퍼가 잘못 제공되었습니다"
03200,0, "세그먼트 유형 명세가 부적당합니다"
03201,0, "그룹 번호 명세가 부적당합니다"
03202,0, "스캔 한계 명세가 부적당합니다"
03203,0, "동시 갱신은 영역 분석을 불가능하게 합니다"
03230,0, "세그먼트는 %s 블록만을 포함하고 있습니다"
03231,0, "INITIAL 영역이 할당 해제되지 않았습니다"
03274,0, "ALLOCATE EXTENT와 DEALLOCATE UNUSED 옵션들이 지정되었습니다"
03275,0, "이중 DEALLOCATE 옵션으로 명세"
03276,0, "ALLOCATE EXTENT의 중복지정"
03277,0, "부적절한 SIZE의 지정"
03278,0, "ALLOCATE EXTENT 옵션의 중복지정"
03279,0, "부적절한 INSTANCE가 지정되었음"
03280,0, "부적절한 DATAFILE 화일명의 지정"
03281,0, "부적절한 ALLOCATE EXTENT 옵션"
03282,0, "ALLOCATE EXTENT 옵션의 누락"
03283,0, "지정된 데이타 화일 %s이 존재하지 않습니다"
03284,0, "데이타 화일 %s는 테이블스페이스 %s의 멤버가 아닙니다"
03286,0, "HASH CLUSTERS에 대해 ALLOCATE EXTENT가 정당하지 않습니다"
03287,0, "부적절한 FREELIST GROUP의 지정"
03288,0, "FREELIST GROUP과 INSTANCE 파라미터가 함께 지정될 수 없습니다"
03290,0, "부적절한 truncate 명령어 - CLUSTER 혹은 TABLE 키워드의 누락"
03291,0, "부적절한 truncate 옵션 - storage 키워드의 누락"
03292,0, "잘릴 테이블이 클러스터의 일부입니다"
03293,0, "잘릴 클러스터는 HASH CLUSTER입니다"
03296,0, "데이타화일의 크기를 조정할 수 없습니다 - 화일 %s 이 없습니다"
03297,0, "요구된 RESIZE 값보다 큰 %s 데이타 블록이 화일에 포함되어 있습니다"
03298,0, "데이타화일을 줄일 수 없습니다 - 화일 %s는 핫 백업중입니다"
03299,0, "딕셔너리 테이블 %s을 생성할 수 없습니다"
04000,0, "PCTUSED 와 PCTFREE 의 합이 100을 초과할 수 없습니다"
04001,0, "시퀀스 파라미터 %s 는 정수라야 합니다"
04002,0, "INCREMENT 는 0이 아닌 정수라야 합니다"
04003,0, "시퀀스 파라미터 %s가 최대 크기 허용(%s 자리)를 초과했습니다"
04004,0, "MINVALUE 는 MAXVALUE 보다 작아야 합니다"
04005,0, "INCREMENT 는 ( MAXVALUE -  MINVALUE ) 보다 작아야 합니다"
04006,0, "START WITH 에 MINVALUE 보다 작은 값은 지정할 수 없습니다"
04007,0, "MINVALUE 에 현재치보다 큰 값을 지정할 수 없습니다"
04008,0, "START WITH 에 MAXVALUE 보다 큰 값을 지정할 수 없습니다"
04009,0, "MAXVALUE 에 현재치보다 작은 값을 지정할 수 없습니다"
04010,0, "CACHE 에는 1 보다 큰 수치를 지정해야 합니다"
04011,0, "시퀀스 %s 은 %s 와 %s 범위 사이어야 합니다"
04012,0, "지정된 개체는 시퀀스가 아닙니다"
04013,0, "CACHE 에는 1 사이클보다 작은 값을 지정해야 합니다"
04014,0, "CYCLE이 명시하는 MINVALUE가 내림차순 시퀀스입니다"
04015,0, "CYCLE 을 실시하는 오름차순 시퀀스에는 MAXVALUE 를 지정해야 합니다"
04016,0, "시퀀스 %s 은 더 이상 존재하지 않습니다"
04020,0, "개체 %s%s%s%s%s의 잠금 시도중 데드록이 검출되었습니다"
04021,0, "개체 %s%s%s%s%s의 잠금 대기중 시간이 초과됐습니다"
04028,0, "개체 %s%s%s%s%s에 대한 diana를 생성할 수 없습니다"
04029,0, "%s%s%s를 조회하는 중에 ORA-%s 오류가 발생했습니다"
04030,0, "%s바이트 (%s,%s)의 할당 시도중 프로세스 메모리의 부족현상 발생"
04031,0, "%s 바이트의 공유 메모리를 할당할 수 없습니다 (\"%s\",\"%s\",\"%s\")"
04041,0, "패키지 본체의 생성전에 패키지 지정이 먼저 생성되어야 합니다"
04042,0, "프로시저,함수,패키지 혹은 패키지 본체가 존재하지 않습니다"
04043,0, "개체 %s가 존재하지 않습니다"
04044,0, "프로시저, 함수, 패키지는 이곳에서 허용되지 않습니다"
04045,0, "%s. %s의 재 컴파일/재 검증시 오류"
04046,0, "컴파일 결과를 제공하기에는 너무 큽니다"
04050,0, "부적절한 혹은 누락된 프로시저, 함수, 혹은 패키지명입니다"
04051,0, "사용자 %s는 데이타베이스 링크 %s. %s를 사용할 수 없습니다"
04052,0, "원격 개체 %s%s%s%s%s를 찾는 동안 오류발생"
04053,0, "원격 개체 %s%s%s%s%s의 검증시 오류발생"
04054,0, "데이타베이스 링크 '%s'가 존재하지 않습니다"
04060,0, "%s를 수행하기 위한 권한이 부족합니다"
04061,0, "%s의 기존상태가 무효화되었습니다"
04062,0, "%s(%s의)이 변경되었습니다"
04063,0, "%s가 오류를 가집니다"
04064,0, "실행불가, %s가 무효화 되었습니다"
04065,0, "실행불가, %s가 변경 혹은 삭제되었습니다"
04066,0, "실행할수 없는 개체, %s"
04067,0, "실행불가, %s가 존재하지 않습니다"
04068,0, "패키지%s%s%s의 기존 상태가 버려졌습니다"
04070,0, "부적절한 트리거명"
04071,0, "BEFORE 혹은 AFTER 키워드의 누락"
04072,0, "부적절한 트리거유형"
04073,0, "이 트리거유형에 대해서 열 목록은 부당합니다"
04074,0, "부적절한 REFERENCING명"
04075,0, "부적절한 트리거동작"
04076,0, "부적절한 NEW 혹은 OLD지정"
04077,0, "WHEN절은 레이블 레벨의 트리거와 사용될 수 없습니다"
04078,0, "OLD와 NEW값이 같을 수 없습니다"
04079,0, "부당한 트리거 지정"
04080,0, "트리거 '%s'가 존재하지 않습니다"
04081,0, "트리거 '%s'가 이미 존재합나다. "
04082,0, "테이블 레벨 트리거에서 NEW 혹은 OLD 참조는 허용되지 않습니다"
04083,0, "부적절한 트리거 변수 '%*. s'"
04084,0, "행 트리거후에 트리거의 NEW값을 변경할 수 없습니다"
04085,0, "OLD 참조변수의 값을 변경할 수 없습니다"
04086,0, "트리거 설명이 너무 깁니다 트리거 코드에 주석을 옮기십시오"
04087,0, "ROWID 참조 변수의 값을 변경할 수 없습니다"
04088,0, "트리거 '%s. %s'의 수행시 오류"
04089,0, "SYS 소유의 개체에 대한 트리거를 작성할 수 없습니다"
04090,0, "'%s'는 동일 테이블, 이벤트 그리고 트리거 시간을 %s'로 지정하고 있습니다"
04091,0, "테이블 %s. %s가 변화하고 있어서 트리거/함수가 이를 볼 수 없습니다"
04092,0, "트리거 안에 %s를 할 수 없습니다"
04093,0, "LONG유형 열 참조는 트리거에서 허용되지 않습니다"
04094,0, "테이블 %s. %s은 부적합함, 트리거는 그것을 수정할 수 없습니다"
04095,0, "트리거 %s가 다른 테이블에 이미 존재함, 치환할 수 없습니다"
04096,0, "트리거 '%s'는 WHEN 절이 있은데 너무 큽니다 한계치가 2K. "
04097,0, "트리거 삭제 또는 수정을 시도시 DDL 대립이 생겼습니다"
04098,0, "트리거 '%s' 은 부적당하고 재검증에 실패했습니다"
04099,0, "트리거 '%s' 은 적당하지만 컴파일된 폼에 저장되지 않았습니다"
06000,0, "NETASY: 포트 개방 실패"
06001,0, "NETASY: 포트 셋업 실패"
06002,0, "NETASY: 포트 읽기 실패"
06003,0, "NETASY: 포트 쓰기 실패"
06004,0, "NETASY: 대화 화일의 개방 실패"
06005,0, "NETASY: 대화 화일의 읽기 실패"
06006,0, "NETASY: 대화의 수행 실패"
06007,0, "NETASY: 잘못된 대화 유형"
06009,0, "NETASY: 대화 화일명이 너무 깁니다"
06010,0, "NETASY: 대화 화일이 너무 깁니다"
06011,0, "NETASY: 대화가 너무 깁니다"
06017,0, "NETASY: 메시지 수신 실패"
06018,0, "NETASY: 메시지 송신 실패"
06019,0, "NETASY: 부적절한 로그인(연결) 스트링"
06020,0, "NETASY: 초기화 실패"
06021,0, "NETASY: 연결 실패"
06022,0, "NETASY: 채널 개방 실패"
06023,0, "NETASY: 포트 개방 실패"
06024,0, "NETASY: VTM 오류"
06025,0, "NETASY: 환경설정 오류"
06026,0, "NETASY: 포트 close 실패"
06027,0, "NETASY: 채널 close 실패"
06028,0, "NETASY: 로그인 하기위한 초기화를 할 수 없습니다"
06029,0, "NETASY: 포트 할당 실패"
06030,0, "NETDNT: 연결 실패, 인식할 수 없는 노드명입니다"
06031,0, "NETDNT: 연결 실패, 인식할 수 없는 개체명입니다"
06032,0, "NETDNT: 연결 실패, 제어정보의 액세스가 거절되었습니다"
06033,0, "NETDNT: 연결 실패, 상대편이 연결을 거절했습니다"
06034,0, "NETDNT: 연결 실패, 상대편이 예기치않게 종료됐습니다"
06035,0, "NETDNT: 연결 실패, 불충분한 자원입니다"
06036,0, "NETDNT: 연결 실패, 개체로부터의 응답이 없습니다"
06037,0, "NETDNT: 연결 실패, 노드에 도달할 수 없습니다"
06038,0, "NETDNT: 연결 실패, 네트워크 드라이버가 로드되지 않았습니다"
06039,0, "NETDNT: 연결 실패"
06040,0, "NETDNT: 부적절한 로그인 스트링입니다"
06041,0, "NETDNT: 분리 실패"
06042,0, "NETDNT: 메시지 수신 실패"
06043,0, "NETDNT: 메시지 송신 실패"
06044,0, "NETDNT: 연결 실패, 바이트 갯수 할당량을 초과했습니다"
06102,0, "NETTCP: 문맥 영역을 할당할 수 없습니다"
06105,0, "NETTCP: 원격 호스트가 불명입니다"
06106,0, "NETTCP: 소켓 생성 실패"
06107,0, "NETTCP: ORACLE 네트워크 서버가 없습니다"
06108,0, "NETTCP: 호스트에 연결 실패"
06109,0, "NETTCP: 메시지 수신 실패"
06110,0, "NETTCP: 메시지 송신 실패"
06111,0, "NETTCP: 분리하는것이 실패"
06112,0, "NETTCP: 부적절한 버퍼크기입니다"
06113,0, "NETTCP: 연결이 너무 많습니다"
06114,0, "NETTCP: SID 찾기 실패"
06115,0, "NETTCP: 논리적인 ORACLE을 생성할 수 없습니다"
06116,0, "NETTCP: ORASRV 프로세스를 생성할 수 없습니다"
06117,0, "NETTCP: ORASRV를 생성할 수 없음: 할당량을 초과했습니다"
06118,0, "NETTCP: ORASRV와의 교신을 끝낼 수 없습니다"
06119,0, "NETTCP: 가짜 클라이언트의 요구"
06120,0, "NETTCP: 네트워크 드라이버가 로드되지 않았습니다"
06121,0, "NETTCP: 액세스 실패"
06122,0, "NETTCP: 셋업 실패"
06123,0, "NETTCP: KEEPALIVE를 지정할 수 없습니다"
06124,0, "NETTCP: ORASRV 대기시 시간경과"
06125,0, "NETTCP: ORASRV가 예기치않게 종료했습니다"
06126,0, "NETTCP: ORASRV가 네트워크 연결을 열 수 없습니다"
06127,0, "NETTCP: 사용자명을 변경할 수 없습니다"
06128,0, "NETTCP: 우편함을 생성할 수 없습니다"
06129,0, "NETTCP: 소켓의 소유권을 ORASRV로 옮길 수 없습니다"
06130,0, "NETTCP: 호스트의 액세스가 거부되었습니다"
06131,0, "NETTCP: 사용자의 액세스가 거부되었습니다"
06132,0, "NETTCP: 비밀번호가 틀림, 액세스가 거부되었습니다"
06133,0, "NETTCP: 화일이 없습니다"
06134,0, "NETTCP: 화일 액세스 권한이 위반되었습니다"
06135,0, "NETTCP: 연결이 거절됨; 서버가 중지되고 있습니다"
06136,0, "NETTCP: 연결교신중 오류 발생"
06137,0, "NETTCP: 연결교신중 오류 발생"
06138,0, "NETTCP: 연결교신중 오류 발생"
06140,0, "NETTCP: 그런 사용자가 없습니다"
06141,0, "NETTCP: 사용자에 대한 권한이 없습니다"
06142,0, "NETTCP: 사용자 정보의 획득시 오류"
06143,0, "NETTCP: 최대 연결수를 초과했습니다"
06144,0, "NETTCP: SID (데이타베이스)는 사용할 수 없습니다"
06145,0, "NETTCP: ORASRV를 수행시킬 수 없음: 이미지가 설치되지 않았습니다"
06200,0, "TWOTASK: 연결 실패, 우편함을 생성할 수 없습니다"
06201,0, "TWOTASK: 연결 실패, 우편함에 연결할 수 없습니다"
06202,0, "TWOTASK: 연결 실패, 서버 태스크를 만들 수 없습니다"
06203,0, "TWOTASK: 연결 실패, 교신 실패"
06204,0, "TWOTASK: 연결 실패, ORASRV2. COM를 액세스할 수 없습니다"
06205,0, "TWOTASK: 연결 실패, 논리명을 생성할 수 없습니다"
06206,0, "TWOTASK: 메시지 수신 실패"
06207,0, "TWOTASK: 메시지 송신 실패"
06208,0, "TWOTASK: 부적당한 로그인(연결) 스트링"
06209,0, "TWOTASK: 연결 실패, 우편함이 이미 존재하고 있습니다"
06210,0, "TWOTASK: 연결 실패, ORASRV가 예기치 않게 종료되었습니다"
06211,0, "TWOTASK: 연결 실패, ORASRV를 기다리다가 시간 초과 되었습니다"
06212,0, "TWOTASK: 연결 실패, 논리 이름 테이블이 꽉 차있습니다"
06213,0, "TWOTASK: 연결 실패"
06214,0, "TWOTASK: 연결 실패, ORASRV를 생성하기 위해 충분치 않은 할당량 입니다"
06215,0, "TWOTASK:  연결 실패, ORASRV 이미지가 설치가 않되게 보호된 것입니다"
06216,0, "TWOTASK: 연결 실패, ORASRV 이미지 화일을 발견할 수 없습니다"
06250,0, "NETNTT: 송수신 버퍼를 할당할 수 없습니다"
06251,0, "NETNTT: 주소 화일명을 해석할 수 없습니다"
06252,0, "NETNTT: 주소 화일을 열 수 없습니다"
06253,0, "NETNTT: 주소화일에서 인수를 READ 할 수 없습니다"
06254,0, "NETNTT: 큐브로의 연결을 공유할 수 없습니다"
06255,0, "NETNTT: 원격 프로세스의 pid를 READ 할수없습니다"
06256,0, "NETNTT: 원격 FORK 실패"
06257,0, "NETNTT: 섀도(SHADOW) 프로세스에 명령을 송신할 수 없습니다"
06258,0, "NETNTT: 문맥 영역을 할당할 수 없습니다"
06259,0, "NETNTT: 원격 프로세스에서 READ 할수 없습니다"
06260,0, " NETNTT: 원격 프로세스로 WRITE 할수 없습니다"
06261,0, "NETNTT: nrange() 실패"
06262,0, "NETNTT: nfconn() 실패"
06263,0, "NETNTT: pi_connect에 메모리 부족"
06264,0, "NETNTT: 데이타 프로토콜 오류"
06265,0, "NETNTT: break 프로토콜 오류"
06266,0, "NETNTT: 잘못된 쓰기 길이"
06267,0, "NETNTT: 오류 상태"
06268,0, "NETNTT: /etc/oratab을 READ 불가"
06300,0, "IPA: 접속분리 실패"
06301,0, "IPA: Driver context 를 할당할 수 없습니다"
06302,0, "IPA: 원격 호스트에 연결 불가"
06303,0, "IPA: 메세지 전송 오류"
06304,0, "IPA: 메세지 수신 오류"
06305,0, "IPA: 부적절한 메시지 유형"
06306,0, "IPA: 메세지 WRITE 길이 오류"
06307,0, "IPA: 연결 재설정 실패"
06308,0, "IPA: 더 이상 연결 불가"
06309,0, "IPA: 이용 가능한 메세지 큐가 없음"
06310,0, "IPA: 환경 변수가 지정되지 않았습니다"
06311,0, "IPA: 최대 서버수에 도달 했습니다"
06312,0, "IPA: 지정된 서비스명이 부정확합니다"
06313,0, "IPA: 공유 메모리 초기화 실패"
06314,0, "IPA: Event 설정 실패"
06315,0, "IPA: 콘넥트 스트링 오류"
06316,0, "IPA: 데이타베이스 SID 오류"
06317,0, "IPA: 로컬 최대 사용자수 초과"
06318,0, "IPA: 로컬 최대 콘넥션수 초과"
06319,0, "IPA: 원격 최대 사용자수 초과"
06320,0, "IPA: 원격 최대 연결 수 초과"
06321,0, "IPA: 원격편에 도달할 수 없습니다"
06322,0, "IPA: 심각한 공유 메모리 오류"
06323,0, "IPA: 이벤트 오류 발생"
06400,0, "NETCMN: 지정된 기본 호스트 뮨자열이 없습니다"
06401,0, "NETCMN: 부적절한 드라이버 지정자"
06402,0, "NETCMN: 브레이크 메시지 수신시 오류"
06403,0, "NETCMN: 문맥 영역을 할당할 수 없습니다"
06404,0, "NETCMN: 부당한 로그인 (연결) 스트링"
06405,0, "NETCMN: 프로토콜 재설정 오류"
06406,0, "NETCMN: 브레이크 메시지 송신시 오류"
06407,0, "NETCMN: 브레이크 처리환경을 구축할 수 없습니다"
06408,0, "NETCMN: 부정확한 메시지 유형"
06413,0, "연결이 개방되지 않았습니다"
06416,0, "NETCMN: 테스트시 오류"
06419,0, "NETCMN: 서버가 오라클을 기동시킬 수 없습니다"
06420,0, "NETCMN: SID의 찾기 실패"
06421,0, "NETCMN: 읽혀질 데이타에 오류가 발견되었습니다"
06422,0, "NETCMN: 송신 데이타에 오류가 발견되었습니다"
06423,0, "NETCMN: 수신 데이타에 오류가 발견되었습니다"
06430,0, "ssaio: 함수가 잘못된 인수로 요구되었습니다"
06431,0, "ssaio: 부적절한 블록번호"
06432,0, "ssaio: 버퍼가 정열되지 않습니다"
06433,0, "ssaio: lseek 오류, 요구된 블록을 찾을 수 없습니다"
06434,0, "ssaio: 읽기 오류, 데이타베이스 화일로 읽을 수 없습니다"
06435,0, "ssaio: 쓰기 오류, 데이타베이스 화일에 기록할 수 없습니다"
06436,0, "ssaio: 비동기 I/O가 틀린 파라미터로 인하여 실패했습니다"
06437,0, "ssaio: 비동기 쓰기는 데이타베이스 화일에 기록할 수 없습니다"
06438,0, "ssaio: 비동기 읽기는 데이타베이스 화일로 부터 읽을 수 없습니다"
06439,0, "ssaio: 비동기 쓰기가 틀린 바이트 수를 리턴했습니다"
06440,0, "ssaio: 비동기 읽기가 틀린 바이트 수를 리턴했습니다"
06441,0, "ssvwatev: 함수 호출에 잘못된 파라미터가 넘겨졌습니다"
06442,0, "ssvwatev: 예기치 않은 오류로 실패했습니다"
06443,0, "ssvpstev: 함수 호출에 잘못된 파라미터가 넘겨졌습니다"
06444,0, "ssvpstev: 예기치 않은 오류로 실패했습니다"
06445,0, "ssvpstevrg: 함수 호출에 잘못된 파라미터가 넘겨졌습니다"
06446,0, "ssvpstevrg: 예기치 않은 오류로 실패했습니다"
06447,0, "ssvpstp: 함수 호출에 잘못된 파라미터가 넘겨졌습니다"
06448,0, "ssvpstp: 예기치 않은 오류로 실패했습니다"
06449,0, "리스트 IO 혹은 sysvendor가 설치되지 않았습니다"
06500,0, "PL/SQL: 기억 영역 오류입니다"
06501,0, "PL/SQL 프로그램 오류"
06502,0, "PL/SQL: 값(수치) 오류입니다"
06503,0, "PL/SQL: 함수가 값을 리턴하지 못했습니다"
06504,0, "PL/SQL: Result Set 변수 또는 질의의 리턴 유형이 일치하지 않습니다"
06508,0, "PL/SQL: 호출되는 lib 단위를 발견할 수 없습니다"
06509,0, "PL/SQL: 이 패키지(package)에 대한 ICD 벡터가 누락됐습니다"
06510,0, "PL/SQL: 처리되지 않은 user-defined 예외 상황"
06511,0, "PL/SQL: 커서가 이미 열려있습니다"
06512,0, "%s줄 %s에서"
06513,0, "PL/SQL: PL/SQL 테이블의 색인이 호스트 언어 배열의 범위를 벗어남"
06514,0, "PL/SQL: 원격 호출은 서버에 의해서 처리되지 않습니다"
06540,0, "PL/SQL: 컴파일 오류"
06541,0, "PL/SQL: 컴파일 오류 - 컴파일 중지"
06542,0, "PL/SQL: 실행 오류"
06543,0, "PL/SQL: 실행 오류 - 실행 중지"
06544,0, "PL/SQL: 내부 오류, 인수: [%s], [%s], [%s], [%s], [%s], [%s], [%s], [%s]"
06550,0, "줄 %s, 열%s:%s"
06551,0, "PL/SQL: 처리되지 않은 예외상황"
06552,0, "PL/SQL: %s"
06553,0, "PLS-%s: %s"
06554,0, "패키지 DBMS_STANDARD는 PL/SQL을 사용하기 전에 생성되야만 합니다"
06555,0, "이 이름은 현재 사용자 SYS에 의해 사용되기 위해 예약되어 있습니다"
06556,0, "파이프가 비어 있어 unpack_message 요구를 이행할 수 없습니다"
06557,0, "icd 파이프에 대한 파라미터로 NULL 값은 허용되지 않습니다"
06558,0, "dbms_pipe 패키지에 있는 버퍼가 꽉 찼음.  더 이상의 항목이 사용될 수 없습니다"
06559,0, "%s로 잘못된 데이타유형이 요구되었습니다, 실제 데이타유형은 %s 입니다"
06560,0, "위치, %s 가 버퍼 크기 %s 보다 크거나 음수 입니다"
06561,0, "명령문이 DBMS_SQL 패키지에 의해 지원되지 않습니다"
06562,0, "Out 인수의 형이 열의 형과 일치되거나 변수와 바인드되어야 합니다"
06563,0, "기술된 최상위 레벨의 프로시저/펑션이 하위레벨을 포함할 수 없습니다"
06564,0, "개체 %s가 존재하지 않습니다"
06565,0, "저장된 프로시저에서 %s를 실행할 수 없습니다"
06566,0, "행의 수 지정이 부적합합니다"
06567,0, "값의 수 지정이 부적합합니다"
06568,0, "폐기된 ICD 프로시저가 호출되었습니다"
06570,0, "풀 개체 공유가 존재하지 않습니다"
06571,0, "%s 함수는 데이타베이스에 갱신하는것을 보증할 수 없습니다"
06572,0, "%s 함수는 out 인수를 가지고 있습니다"
06573,0, "%s 함수가 패키지 상태를 변경하는데, 여기서는 사용할 수 없습니다"
06574,0, "%s 함수는 패키지 상태를 참조하는데, 원격적으로 실행할 수 없습니다"
06575,0, "패키지 또는 함수 %s 은 부적당한 상태입니다"
06580,0, "해쉬 결합이 큰 행을 메모리에 보관하는 중에 메모리 부족이 일어났습니다"
06600,0, "LU6. 2 Driver: SNA 소프트웨어가 로드되지 않음"
06601,0, "LU6. 2 Driver: 부적절한 데이타베이스 id 스트링임"
06602,0, "LU6. 2 Driver: 문맥 영역 할당시 오류"
06603,0, "LU6. 2 Driver: 메모리 할당시 오류"
06604,0, "LU6. 2 Driver: 원격 LU와 함께 세션을 할당할 수 없음"
06605,0, "LU6. 2 Driver: 예기치 않은 줄 턴어라운드"
06606,0, "LU6. 2 Driver: SNA로 부터의 예기치 않은 응답"
06607,0, "LU6. 2 Driver: 송신상태에서 재설정됨"
06608,0, "LU6. 2 Driver: 수신상태에서 재설정됨"
06610,0, "LU6. 2 Driver: 해제시 실패"
06611,0, "LU6. 2 Driver: 송신 요구오류"
06612,0, "LU6. 2 Driver: 데이타 송신오류"
06613,0, "LU6. 2 Driver: 수신 및 대기오류"
06614,0, "LU6. 2 Driver: 즉시 수신오류"
06615,0, "LU6. 2 Driver: 송신오류"
06616,0, "LU6. 2 Driver: LU로의 첨부에 실패했음"
06617,0, "LU6. 2 Driver: PU로의 첨부에 실패했음"
06618,0, "LU6. 2 Driver: 서브네트워크의 활성화에 실패했음"
06619,0, "LU6. 2 Driver: 활성적인 원격 파트너를 할 수 없습니다"
06620,0, "LU6. 2 Driver: 부적절한 원격 파트너"
06621,0, "LU6. 2 Driver: 할당 오류"
06622,0, "LU6. 2 Driver: SNA에 첨부할 수 없음"
06700,0, "TLI Driver: 호스트로부터의 메시지 유형이 부정확합니다"
06701,0, "TLI Driver: 틀린 수의 바이트가 기록되었습니다"
06702,0, "TLI Driver: 문맥 영역을 할당할 수 없습니다"
06703,0, "TLI Driver: 브레이크 메시지의 송신 실패"
06704,0, "TLI Driver: 브레이크 메시지의 수신 실패"
06705,0, "TLI Driver: 원격 노드가 불명입니다"
06706,0, "TLI Driver: 서비스가 발견되지 않습니다"
06707,0, "TLI Driver: 연결실패"
06708,0, "TLI Driver: 메시지 수신실패"
06709,0, "TLI Driver: 메시지 송신실패"
06710,0, "TLI Driver: 송신 인터럽트 브레이크 메시지 실패"
06711,0, "TLI Driver: 바인드시 오류"
06712,0, "TLI Driver: 인수시 오류"
06713,0, "TLI Driver: 연결시 오류"
06720,0, "TLI Driver: SID 찾기 실패"
06721,0, "TLI Driver: 가 클라이언트 요구"
06722,0, "TLI Driver: 연결설정 실패"
06730,0, "TLI Driver: 크론(clone) 디바이스의 열기 실패"
06731,0, "TLI Driver: t_call을 할당할 수 없습니다"
06732,0, "TLI Driver: t_discon을 할당할 수 없습니다"
06733,0, "TLI Driver: 분리 수신에 실패했습니다"
06734,0, "TLI Driver: 연결할 수 없습니다"
06735,0, "TLI Driver: 잘못된 연결을 닫는데 실패했습니다"
06736,0, "TLI Driver: 서버가 가동중이 아닙니다"
06737,0, "TLI Driver: 연결실패"
06741,0, "TLI Driver: 프로토콜 디바이스를 열 수 없습니다"
06742,0, "TLI Driver: t_bind를 할당할 수 없습니다"
06743,0, "TLI Driver: t_bind를 할당할 수 없습니다"
06744,0, "TLI Driver: 리스너(listener)를 바인드할 수 없습니다"
06745,0, "TLI Driver: 리스너(listener)가 이미 가동중입니다"
06746,0, "TLI Driver: t_call을 할당할 수 없습니다"
06747,0, "TLI Driver: 청취(listen) 오류"
06748,0, "TLI Driver: t_discon을 할당할 수 없습니다"
06749,0, "TLI Driver: 네트워크상에서 옵션이 허용되지 않습니다"
06750,0, "TLI Driver: sync 실패"
06751,0, "TLI Driver: 번지 범위가 다릅니다"
06752,0, "TLI: 시그널 설정시 오류"
06753,0, "TLI Driver: name-to-address를 맹핑하는데 실패했습니다"
06754,0, "TLI Driver: 지역 호스트 번지를 얻을 수 없습니다"
06755,0, "TLI Driver: 이동 마감점을 닫을 수 없습니다"
06756,0, "TLI Driver: oratab을 열 수 없습니다"
06757,0, "TLI Driver: 서버가 틀린 명령을 취했습니다"
06760,0, "TLI Driver: 순차릴리스를 읽는 동안 타임아웃됐습니다"
06761,0, "TLI Driver: 순차릴리스의 송신오류"
06762,0, "TLI Driver: 순차릴리스의 읽기오류"
06763,0, "TLI Driver: 분리 송신오류"
06764,0, "TLI Driver: 분리 읽기오류"
06765,0, "TLI Driver: 순차 릴리즈의 대기오류"
06766,0, "TLI Driver: 릴리스시 닫기실패"
06767,0, "TLI Driver: 릴리즈시 할당실패"
06770,0, "TLI Driver: 버전 송신오류"
06771,0, "TLI Driver: 버전 읽기오류"
06772,0, "TLI Driver: 명령 송신오류"
06773,0, "TLI Driver: 명령 읽기오류"
06774,0, "TLI Driver: 브레이크 모드 송신오류"
06775,0, "TLI Driver: 브레이크 모드 읽기오류"
06776,0, "TLI Driver: 파라미터 송신오류"
06777,0, "TLI Driver: 파라미터 읽기오류"
06778,0, "TLI Driver: ccode 송신오류"
06779,0, "TLI Driver: ccode 읽기오류"
06780,0, "TLI Driver: recv 오류코드 실패"
06781,0, "TLI Driver: 교섭 스트링 읽기오류"
06790,0, "TLI Driver: 폴 실패"
06791,0, "TLI Driver: 폴이 오류 상황을 리턴했습니다"
06792,0, "TLI Driver: 서버가 오라클을 수행할 수 없습니다"
06793,0, "TLI Driver: 서버가 새로운 프로세스를 생성할 수 없습니다"
06794,0, "TLI Driver: 섀도우 프로세스가 프로토콜 정보를 추출할 수 없습니다"
06800,0, "TLI Driver: SQL*Net SPX 클라이언트가 재연결하는 동안 사라졌습니다"
06801,0, "TLI Driver: SPX 서버의 재연결을 위한 리슨이 실패했습니다"
06802,0, "TLI Driver: /etc/netware/yellowpages 화일을 열 수 없습니다"
06803,0, "TLI Driver: IPX 디바이스 화일을 열 수 없습니다"
06804,0, "TLI Driver: 초기화시 IPX 번지를 바인드할 수 없습니다"
06805,0, "TLI Driver: SPX를 위한 데이타그램 SAP 패킷을 송신할 수 없습니다"
06806,0, "TLI Driver: SPX를 위한 프로토콜 초기화를 마감할 수 없습니다"
06807,0, "TLI Driver: 이더네트 디바이스 드라이버 화일을 열 수 없습니다"
06808,0, "TLI Driver: IPX와 이더네트 스트림을 연결할 수 없습니다"
06809,0, "TLI Driver: 초기화시에 IPX 이더네트 SAP를 클리어할 수 없습니다"
06810,0, "TLI Driver: 초기화시에 IPX 이더네트 SAP를 설정할 수 없습니다"
06811,0, "TLI Driver: 초기화시에 IPX 네트워크 번호를 설정할 수 없습니다"
06812,0, "TLI Driver: 이더네트 드라이버의 노드번지를 읽을 수 없습니다"
06813,0, "TLI Driver: 설정된 이더네트 번지가 틀립니다"
06814,0, "TLI Driver: SPX 디바이스 화일을 열 수 없습니다"
06815,0, "TLI Driver: SPX 와 IPX 스트림을 연결할 수 없습니다"
06816,0, "TLI Driver: SPX SAP 번지를 설정할 수 없습니다"
06817,0, "TLI Driver: 노벨 네트워크 번지를 읽을 수 없습니다"
06900,0, "CMX: tns 디렉토리를 읽을 수 없습니다"
06901,0, "CMX: 로컬 어플리케션에 로컬명이 할당되지 않았습니다"
06902,0, "CMX: cmx 서브시스템을 첨부 할 수 없습니다"
06903,0, "CMX: 원격 어플리케션의 트랜스포트 번지를 읽을 수 없습니다"
06904,0, "CMX: 원격 어플리케션이 이용할 수 있는 트랜스포트 번지가 없습니다"
06905,0, "CMX: 연결 오류"
06906,0, "CMX: CMX로 부터 최대 패킷 크기를 결정할 수 없습니다"
06907,0, "CMX: 연결 확인중 오류"
06908,0, "CMX: ORACLE_SID 전송중 오류"
06909,0, "CMX: ORACLE_SID의 인식중 오류"
06910,0, "CMX: 원격 기계에서 오라클 프로세스를 기동시킬수 없습니다"
06911,0, "CMX: t_event가 오류를 리턴"
06912,0, "CMX: datarq에서 쓰기 오류"
06913,0, "CMX: 연결의 재방향 설정중 오류"
06914,0, "CMX: 오라클 기동중 비정상 이벤트 발생"
06915,0, "CMX: datarq에서 미확인 t_event 발생"
06916,0, "CMX: 데이타 읽기(t_datain)에서 오류"
06917,0, "CMX: 데이타 읽기(읽을 문자수 초과)에서 오류"
06918,0, "CMX: 읽기 이벤트 대기중 T_NOEVENT 발생"
06919,0, "CMX: 쓰기 요구(미확인 이벤트)중 오류"
06920,0, "CMX: getbrkmsg의 부적합한 데이타형"
06921,0, "CMX: getdatmsg의 부적합한 데이타형"
06922,0, "CMX: 쓰기 길이 오류"
06923,0, "CMX: 부적합한 브레이크 상태"
06924,0, "CMX: 브레이크 메세지 길이 오류"
06925,0, "CMX: 연결 요구중 단락"
06926,0, "CMX: 데이타 읽기중 T_ERROR 발생"
06927,0, "CMX: 데이타를 모두 쓰기전에 T_DATAIN을 수신"
06928,0, "CMX: ORACLE_SID 오류"
06929,0, "CMX: ORACLE_SID 송신시 오류"
06930,0, "CMX: ORACLE_SID 확인시 오류"
06931,0, "CMX: 서버를 위한 읽기-특성 지정시 오류"
06932,0, "CMX: 로컬 이름에서 오류"
06933,0, "CMX: 첨부중 오류"
06950,0, "오류없음"
06951,0, "운영 시스템 호출 오류"
06952,0, "통신의 상대편에서 'forward-reset' 패킷을 발생시켰습니다 "
06953,0, "가상 메모리 부족"
06954,0, "부적합한 화일명"
06955,0, "데이타베이스 서버의 수가 제한치를 초과 했습니다"
06956,0, "로컬 호스트 이름을 얻는데 실패 했습니다"
06957,0, "현재 이용 가능한 SID가 없습니다"
06958,0, "구성 화일을 액세스 하는데 실패 했습니다"
06959,0, "버퍼 입출력 쿼터가 너무 적습니다"
06960,0, "로그 화일을 엑세스 하는데 실패 했습니다"
06961,0, "이 작업에 대한 권한이 없습니다"
06970,0, "X. 25 Driver: 원격 호스트명을 인지할 수 없습니다"
06971,0, "X. 25 Driver: 데이타 수신시 오류"
06972,0, "X. 25 Driver: 데이타 송신시 오류"
06973,0, "X. 25 Driver: 부적절한 버퍼 크기입니다"
06974,0, "X. 25 Driver: SID 찾기 실패"
06975,0, "X. 25 Driver: 호스트로의 연결에 실패했습니다"
06976,0, "X. 25 Driver: 마감점 생성에 실패했습니다"
06977,0, "X. 25 Driver: X. 25 레벨 2 실패"
06978,0, "X. 25 Driver: 콜백 시도가 너무 많습니다"
06979,0, "X. 25 Driver: 서버가 오라클을 기동시킬 수 없습니다"
07200,0, "slsid: oracle_sid가 설정되지 않았습니다"
07201,0, "slhom: oracle_home이 환경에 설정되어있지 않습니다"
07202,0, "sltln: sltln에 부적절한 파라미터입니다"
07203,0, "sltln: 긴 환경변수를 변환하려 했습니다"
07204,0, "sltln: 출력 버퍼영역의 부족으로 이름의 변환에 실패했습니다"
07205,0, "slgtd: 시간오류 , 시간을 획득할 수 없습니다"
07206,0, "slgtd: gettimeofday 오류, 시간을 획득할 수 없습니다"
07207,0, "sigpidu: 프로세스 ID 스트링이 내부버퍼를 초과할 수 없습니다"
07208,0, "sfwfb: 더티 버퍼를 디스크에 반영하는데 실패했습니다"
07209,0, "sfofi: 화일 크기제한을 초과했습니다"
07210,0, "slcpu: getrusage 오류, cpu 시간을 얻을 수 없습니다"
07211,0, "slgcs: gettimeofday 오류, 벽시계를 얻을 수 없습니다"
07212,0, "slcpu: times 오류, cpu 시간을 얻을 수 없습니다"
07213,0, "slgcs: times 오류, cpu 시간을 얻을 수 없습니다"
07214,0, "slgunm: uname 오류, 시스템 정보를 얻을 수 없습니다"
07215,0, "slsget: getrusage 오류. "
07216,0, "slghst: gethostname 오류, 현 호스트의 이름을 얻을 수 없습니다. "
07217,0, "sltln: 환경 변수의 값을 구할 수 없습니다"
07218,0, "slkhst: 호스트의 작업을 수행할 수 없습니다"
07219,0, "slspool: 스풀러 인수 버퍼를 할당할 수 없습니다"
07220,0, "slspool: 대기 오류"
07221,0, "slspool: exec 오류, 스풀러 프로그램을 시작할 수 없습니다"
07222,0, "slspool: 줄 프린터 스풀러 명령이 오류 종료했습니다"
07223,0, "slspool: fork 오류, 스풀 프로세스를 띄울 수 없습니다"
07224,0, "sfnfy: 화일 크기의 제한을 알 수 없음; 오류번호 = %s"
07225,0, "sldext: 변환 오류, 화일명을 확장할 수 없습니다"
07226,0, "rtneco: 터미널 모드를 얻을 수 없습니다"
07227,0, "rtneco: 반향금지 모드를 얻을 수 없습니다"
07228,0, "rtecho: 터미널을 반향 모드로 복원할 수 없습니다"
07229,0, "slcpuc: CPU 갯수를 얻는데 실패했습니다"
07230,0, "slemcr: fopen 오류, 오류화일을 열 수 없습니다"
07231,0, "slemcc: 부적절한 화일처리, 함수가 잘못된 인수로 요구되었습니다"
07232,0, "slemcc: fclose 오류. "
07233,0, "slemcw: 부적절한 화일처리, 함수가 잘못된 인수로 요구되었습니다"
07234,0, "slemcw: fseek 오류"
07235,0, "slemcw: fwrite 오류"
07236,0, "slemop: open 오류"
07237,0, "slemcl: 부적절한 화일처리, 함수가 잘못된 인수로 요구되었습니다"
07238,0, "slemcl: close 오류"
07239,0, "slemrd: 부적절한 화일처리, 함수가 잘못된 인수로 요구되었습니다"
07240,0, "slemrd: seek 오류"
07241,0, "slemrd: read 오류"
07242,0, "slembfn: 변환 오류, 오류 화일명을 변환할 수 없습니다"
07243,0, "sftget: 제공된 버퍼가 전체 줄을 포함하기에 충분하지 않습니다"
07244,0, "ssfccf: 화일 생성실패, 화일크기 제한치에 도달했습니다. "
07245,0, "sfccf: 최후 블록을 lseek 및 write할 수 없습니다"
07246,0, "sfofi: open 오류: 데이타베이스 화일을 열 수 없습니다"
07247,0, "sfrfb: read 오류: 데이타베이스 화일로부터 요구된 블록을 읽을 수 없습니다"
07248,0, "sfwfb: write 오류: 데이타베이스 블록을 기록할 수 없습니다"
07250,0, "spcre: semget오류, 최초 세마포 세트를 얻을 수 없습니다"
07251,0, "spcre: semget오류, 어떤 세마포도 할당할 수 없습니다"
07252,0, "spcre: semget오류, 세마포를 할당할 수 없습니다"
07253,0, "spdes: semctl오류, 세마포를 할당할 수 없습니다"
07254,0, "spdcr: ?/bin/oracle을 확장하는 동안 변환 오류가 발생했습니다"
07255,0, "spini: 신호 처리기를 구축할 수 없습니다"
07256,0, "sptrap: 예외를 감지하기 위한 신호 처리기를 구축할 수 없습니다"
07257,0, "spdcr: 프로그램명의 확장시 변환오류"
07258,0, "spdcr: 포크 오류, 프로세스를 생성할 수 없습니다"
07259,0, "spdcr: 수행오류, 기동시 분리된 프로세스가 실패했습니다"
07260,0, "spdcr: 대기 오류"
07261,0, "spdde: kill 오류, 프로세스에 신호를 보낼 수 없습니다"
07262,0, "sptpa: sptpa가 부적절한 프로세스 id에서 호출되었습니다"
07263,0, "sptpa: kill 오류"
07264,0, "spwat: semop 오류, 세마포를 줄일 수 없습니다"
07265,0, "sppst: semop 오류, 세마포를 늘릴 수 없습니다"
07266,0, "sppst: 부적절한 프로세스 번호가 sppst로 넘겨졌습니다"
07267,0, "spwat: 부적절한 프로세스 번호"
07268,0, "spgun: getpwuid 오류. "
07269,0, "spdcr: exec후 분리된 프로세스가 죽었습니다"
07270,0, "spalck: setitimer오류, 인터벌 타이머를 설정할 수 없습니다"
07271,0, "spwat: 오라클 프로세스 번호가 부적절합니다"
07272,0, "spwat: 부적절한 세마포 세트 id입니다"
07273,0, "sppst: 부적절한 세마포 id입니다"
07274,0, "spdcr: 액세스 오류, 오라클의 액세스가 거절되었습니다"
07275,0, "프로세스로 시그널을 송신할 수 없습니다"
07276,0, "spdba: /etc/group내에 dba 그룹이 없습니다"
07277,0, "spdde: 부당한 pid가 인수로 넘겨졌습니다"
07278,0, "splon: ops$username이 버퍼길이를 초과했습니다"
07279,0, "spcre: semget오류, 최초의 세마포 세트를 얻을 수 없습니다"
07280,0, "soarch: 화일 대 화일 복사를 위한 임시 버퍼의 malloc에 실패했습니다"
07281,0, "soarch: 인터럽트가 발생했습니다"
07282,0, "soaprd: 스트링 오버플로우"
07283,0, "soaprd: 아카이브 수신지에 대한 볼륨 크기가 부적절합니다"
07284,0, "soaprd: 볼륨크기 지정이 적절하게 종료되지 않았습니다"
07285,0, "soaprd: 디스크 화일에 대해서는 볼륨크기를 지정할 수 없습니다"
07286,0, "soagdi: 디바이스 정보를 획득할 수 없습니다"
07287,0, "soagdi: 로그 아카이브를 할 수 없는 디바이스입니다"
07288,0, "soabfn: 화일명 구성시 스트링 오버플로우입니다"
07289,0, "soafls: 테이프로의 기록에 실패했습니다"
07290,0, "soagdi: 아카이브를 위해 지정된 디렉토리가 없습니다"
07292,0, "soaotp: 로그 화일에 부합되기에는 화일이 너무 작습니다"
07293,0, "soaotp: 현재의 테이프 볼륨을 열 수 없습니다"
07294,0, "soaotp: 테이프 기록을 위한 버퍼를 할당할 수 없습니다"
07295,0, "soaotp: 로그 화일의 상태를 발견할 수 없습니다"
07296,0, "soaotp: lseek 오류, 로그 화일의 시작을 찾을 수 없습니다"
07297,0, "soaotp: read 오류, 헤더 블록을 읽을 수 없습니다"
07298,0, "soacls: 이미 닫힌 화일을 닫으려했습니다"
07299,0, "soacls: 테이프 디바이스의 닫기 실패"
07300,0, "smscre: ?/dbs/sgadef. dbf 화일의 확장시 변환오류입니다"
07301,0, "smscre: sga 생성시 ?/dbs/sgadef@. dbf 화일이 이미 존재합니다"
07302,0, "smscre: ?/dbs/sgadef@. dbf의 생성에 실패했습니다"
07303,0, "smscre: 부당한 데이타베이스 버퍼 크기입니다"
07304,0, "smscre: 부당한 재실행 버퍼 크기입니다"
07305,0, "sms1sg: sga 생성시 ftok 오류"
07306,0, "sms1sg: shmget 오류, 공유메모리 세그먼트를 획득할 수 없습니다"
07307,0, "sms1sg: shmat 오류, sga를 첨부할 수 없습니다"
07308,0, "smscre: ?/dbs/sgadef@. dbf 화일에 기록시 기록오류가 발생했습니다"
07309,0, "smscre: close 오류, ?/dbs/sgadef@. dbf 화일을 닫을 수 없습니다"
07310,0, "smscre: sga를 읽을 수 없습니다"
07311,0, "smsdes: sgadef. dbf 화일명의 이름변환 오류. "
07312,0, "smsdes: 열기 오류, sgadef. dbf 화일을 열 수 없습니다. "
07313,0, "smsdes: 읽기 오류, sgadef. dbf 화일을 읽을 수 없습니다"
07314,0, "smsdes: 공유메모리 파기 시도시 shmctl 오류가 발생했습니다"
07315,0, "smsdes: 닫기 오류, sgadef. dbf 화일을 닫을 수 없습니다"
07316,0, "smsdes: unlink 오류, sgadef. dbf 파기할 수 없습니다"
07317,0, "smsget: sgadef. dbf 화일명의 확장시 변환 오류가 발생했습니다"
07318,0, "smsget: sgadef. dbf 화일의 개방 오류"
07319,0, "smsget: sgadef. dbf 읽기 오류"
07320,0, "smsget: sga의 첨부 시도중 shmat 오류가 발생했습니다"
07321,0, "smsget: shmat 오류, 요구된 번지로 sga를 첨부할 수 없습니다"
07322,0, "smsget: 닫기 오류, sgadef. dbf 화일을 닫을 수 없습니다"
07323,0, "smsfre: shmdt 오류, sga를 지울 수 없습니다"
07324,0, "smpall: pga 할당시 malloc 오류가 발생했습니다"
07325,0, "smsacx: 문맥 영역 할당시 malloc 오류가 발생했습니다"
07326,0, "smsfre: 매핑되지 않은 SGA를 해제하려 했습니다"
07327,0, "smpdal: 매핑되지 않은 PGA를 파기하려 했습니다"
07328,0, "smsmax: 세그먼트에 대한 최대 크기를 추정할 수 없습니다"
07329,0, "smscsg: 너무 많은 공유메모리 세그먼트입니다"
07330,0, "smsnsg: SGA의 고정영역을 할당할 수 없습니다"
07331,0, "smsnsg: SGA의 가변영역을 할당할 수 없습니다"
07332,0, "smsnsg: 재실행 버퍼를 할당할 수 없습니다"
07333,0, "smsnsg: 데이타베이스 버퍼를 할당할 수 없습니다"
07334,0, "smsnsg: 너무 많은 공유메모리 세그먼트입니다"
07335,0, "smsmat: sga 생성시 ftok 오류"
07336,0, "smsmat: shmget 오류, 공유메모리 세그먼트를 얻을 수 없습니다"
07337,0, "smsmat: shmat 오류, sga를 첨부할 수 없습니다"
07338,0, "smscre: sga 화일의 존재여부를 테스트할 수 없습니다"
07339,0, "spcre: 세마포 세트의 최대수를 초과했습니다"
07340,0, "sfccf: fstat 오류, 화일 상태를 획득할 수 없습니다"
07341,0, "sfsrd: 부당한 블록 번호입니다"
07342,0, "sfsrd: lseek 오류, 요구된 블록을 찾을 수 없습니다"
07343,0, "sfsrd: read 오류, 요구된 블록을 찾을 수 없습니다"
07344,0, "sfsrd: 함수가 잘못된 인수로 요구되었습니다"
07347,0, "sfsrd: 용도를 실험에 대한 모의 오류입니다"
07350,0, "sfccf: 논리 블록크기가 부당합니다"
07351,0, "sfccf: malloc 오류, 기록 버퍼를 할당할 수 없습니다"
07352,0, "sfccf: create 오류, 화일을 생성할 수 없습니다"
07353,0, "sfccf: close 오류, 화일을 닫을 수 없습니다"
07354,0, "sfccf: open 오류, 화일을 열 수 없습니다"
07355,0, "sfccf: fstat 오류, 화일 상태를 획득할 수 없습니다"
07356,0, "sfccf: lseek 오류, 화일의 시작위치를 찾을 수 없습니다"
07357,0, "sfccf: 기록 오류, 데이타베이스 헤더블록에 기록할 수 없습니다"
07358,0, "sfccf: 기록 오류, 화일에 기록할 수 없습니다"
07359,0, "sfifi: 부당한 논리 블록크기"
07360,0, "sfifi: stat 오류, 화일에 대한 정보를 얻을 수 없습니다"
07361,0, "sfifi: malloc 오류, 헤더블록에 대한 버퍼를 할당할 수 없습니다"
07362,0, "sfifi: 열기 오류, 화일을 열 수 없습니다"
07363,0, "sfifi: lseek 오류, 화일의 시작위치를 찾을 수 없습니다"
07364,0, "sfifi: 읽기 오류, 헤더블록을 읽을 수 없습니다"
07365,0, "sfifi: 닫기 오류"
07366,0, "sfifi: 유효하지 않은 화일, 화일이 정당한 헤더블록을 가지지 않습니다"
07367,0, "sfifi: 논리블록 크기가 일치하지 않습니다"
07368,0, "sfofi: 열기 오류, 화일을 열 수가 없습니다"
07369,0, "sfcfi: 닫기 오류, 데이타베이스 화일을 닫을 수 없습니다"
07370,0, "sfrfb: 부당한 블록 번호"
07371,0, "sfrfb: lseek 오류, 요구된 블록을 찾을 수 없습니다"
07372,0, "sfrfb: 읽기 오류, 요구된 블록을 데이타베이스 화일에서 읽을 수 없습니다"
07373,0, "sfrfb: 읽기시 잘못된 수의 바이트가 리턴되었습니다"
07374,0, "sfwfb: 부당한 블록 번호"
07375,0, "sfwfb: lseek 오류, 요구된 블록을 찾을 수 없습니다"
07376,0, "sfwfb: 기록 오류, 데이타베이스 블록에 기록할 수 없습니다"
07377,0, "sfwfb: 쓰기시 잘못된 수의 바이트가 리턴되었습니다"
07378,0, "sfcmf: 변환 오류, 화일명을 확장할 수 없습니다"
07379,0, "sfcmf: 새로운 화일이 존재합니다"
07380,0, "sfcmf: 변환 오류, 기존의 화일명을 확장할 수 없습니다"
07381,0, "sfccf: 변환 오류, 화일명을 확장할 수 없습니다"
07382,0, "sfifi: 변환 오류, 화일명을 확장할 수 없습니다"
07383,0, "sfgfs: 함수가 잘못된 인수로 요구되었습니다"
07384,0, "sfgfn: 함수가 잘못된 인수로 요구되었습니다"
07385,0, "sfcfi: 함수가 잘못된 인수로 요구되었습니다"
07386,0, "sfrfb: 함수가 잘못된 인수로 요구되었습니다"
07387,0, "sfwfb: 함수가 잘못된 인수로 요구되었습니다"
07388,0, "sfccf: 재사용이 지정되었으나 화일이 존재하지 않습니다"
07389,0, "sfccf: 열기 오류, 재사용하기 위해 화일을 열 수 없습니다"
07390,0, "sftopn: 변환 오류, 화일명을 변환할 수 없습니다"
07391,0, "sftopn: fopen 오류, 텍스트 화일을 열 수 없습니다"
07392,0, "sftcls: fclose 오류, 텍스트 화일을 닫을 수 없습니다"
07393,0, "sfccf: 화일 불일치, 다른크기의 화일을 재사용하려 했습니다"
07394,0, "sfccf: 화일 불일치, 다른 블록크기의 화일을 재사용하려 했습니다"
07395,0, "sfccf: 부당한 옵션으로 화일이 재사용되었습니다"
07396,0, "sfccf: lseek 오류, 재사용 화일의 시작위치를 찾을 수 없습니다"
07397,0, "sfccf: 읽기 오류, 화일의 헤더블록을 읽을 수 없습니다"
07398,0, "sfccf: 부당한 헤더 정보, 화일이 정당한 데이타베이스 화일이 아닙니다"
07399,0, "sfccf: 화일이 존재합니다"
07400,0, "slemtr: 메시지 화일의 변환명이 너무 깁니다"
07401,0, "sptrap: 사용자의 예외 처리기를 복원할 수 없습니다"
07402,0, "sprst: 사용자의 신호 처리기를 복원할 수 없습니다"
07403,0, "sfanfy: db_writers 파라미터가 정당하지 않습니다"
07404,0, "sfareq: 요구가 종료하기를 기다리는 동안 타임아웃 됐습니다. "
07405,0, "sfcfi: 데이타베이스 기록자중 하나에서 닫기실패"
07406,0, "slbtpd: 부당한 번호입니다"
07407,0, "slbtpd: 부당한 지수입니다"
07408,0, "slbtpd: 팩형 십진수로 변환시 오버플로우"
07409,0, "slpdtb: 잘못된 팩형 십진수"
07410,0, "slpdtb: 제공된 버퍼에 비해 수치가 너무 큽니다"
07411,0, "slgfn: 제공된 버퍼에 비해 패스명이 너무 깁니다"
07412,0, "sfaslv: 비동기 기록 배열 엔트리의 획득오류"
07413,0, "sfcopy: 원천과 수신 논리블록 크기가 일치하지 않습니다"
07414,0, "sfcopy: 메모리 버퍼의 할당실패"
07415,0, "slpath: 메모리 버퍼의 할당실패"
07416,0, "slpath: 패스명의 구성실패; 결과 버퍼 영역이 부족합니다"
07417,0, "sfareq: 하나 이상의 데이타베이스 기록자가 가동중이 아닙니다"
07418,0, "sfareq: 데이타베이스 기록자가 timing 함수내에 오류를 가집니다"
07419,0, "sfareq: 데이타베이스 기록자가 timing 함수내에 오류를 가집니다"
07420,0, "sfccf: 부당한 화일형니다"
07421,0, "sfcopy: 복제시 원본 화일의 읽기에 실패했습니다"
07422,0, "sfcopy: 복제시 수신 화일의 쓰기에 실패했습니다"
07423,0, "sfrfb: 버퍼가 적절하게 정렬(align)되지 않아서 읽기에 실패했습니다"
07424,0, "sfwfb: 버퍼가 적절하게 정렬(align)되지 않아서 쓰기에 실패했습니다"
07425,0, "sdpri: dump 화일 위치 해석시 오류 %s가 발생했습니다"
07426,0, "spstp: dbs 디렉토리의 위치를 찾을 수 없습니다"
07427,0, "spstp: dbs로 디렉토리를 변경할 수 없습니다"
07428,0, "smsgsg: ftok()가 sga에 대한 키의 계산시 오류를 리턴했습니다"
07429,0, "smsgsg: shmget()이 세그먼트를 얻는데 실패했습니다"
07430,0, "smsgsg: 계산된 키와 저장된 키가 일치하지 않습니다"
07431,0, "실패된 포크"
07432,0, "이미 자고 있는 것을 또 다시 수행할 수 없습니다"
07433,0, "sfrnms: 미러쪽 상태 파라미터가 부적당합니다"
07434,0, "sfgmsn: 미러쪽 상태 파라미터가 부적당합니다"
07435,0, "부적당한 파라미터가 함수를 테스트하는데 보내졌습니다"
07440,0, "WMON 프로세스가 오류와 함께 종료되었습니다"
07441,0, "함수 주소는 %s 바이트 경계선에서 정렬되어야 합니다"
07442,0, "함수 주소는 %s 에서 %s 범위에 있어야 합니다"
07443,0, "함수 %s 가 없습니다"
07444,0, "함수 주소 %s 은 읽기가능한 것이 아닙니다"
07445,0, "예외 발견: 코아 덤프 [%s] [%s] [%s] [%s] [%s] [%s]"
07446,0, "sdnfy: 잘못된 '%s'값이 %s 파라미터에 있습니다"
07447,0, "ssarena:  usinit 실패"
07448,0, "ssarena:  공유 영역의 최대수를 초과했습니다"
07449,0, "sc:  usnewlock 실패"
07450,0, "sms1sg: vm_mapmem 오류, 공유메모리를 생성할 수 없습니다"
07451,0, "sms1sg: 공유된 메모리에 틀린 번지가 첨부되었습니다"
07452,0, "sms1sg: SGA 형질 변경에 실패했습니다"
07453,0, "smsmat: vm_mapmem 오류, 공유메모리를 생성할 수 없습니다"
07454,0, "smsmat: 공유된 메모리에 틀린 번지가 첨부되었습니다"
07455,0, "smsmat: SGA 형질 변경에 실패했습니다"
07456,0, "smsmax: 클러스터 크기를 얻을 수 없습니다"
07457,0, "smsdes: sgadef. dbf 화일명의 해석 실패"
07458,0, "smsdes: 닫기 오류, sgadef. dbf를 닫을 수가 없습니다"
07459,0, "smsvmfcre: sgadef. dbf 화일명의 해석 실패"
07460,0, "smsvmfcre: SGA 생성시 sgadef. dbf 화일이 이미 존재합니다"
07461,0, "smsvmfcre: sgadef. dbf 화일의 생성 실패"
07462,0, "smsget: sgadef. dbf 화일명의 해석 오류"
07463,0, "smsget: sgadef@. dbf 화일의 열기 오류"
07464,0, "smsget: SGA 첨부 시도중 vm_mapmem 혹은 vm_allocate 오류. "
07465,0, "smsget: 공유된 메모리에 틀린 번지가 첨부되었습니다"
07466,0, "smsget: SGA의 상속 세그먼트를 변경하는데 실패했습니다"
07467,0, "smsget: 닫기 오류, sgadef. dbf를 닫을 수가 없습니다"
07468,0, "spwat: mset 오류, 세마포를 설정할 수 없습니다"
07469,0, "sppst: mclear 오류, 세마포를 소거할 수 없습니다"
07470,0, "snclget: 클러스터 번호를 얻을 수 없습니다"
07471,0, "snclrd: sgadef. dbf 화일명의 해석 오류"
07472,0, "snclrd: sgadef. dbf 화일의 열기 오류"
07473,0, "snclrd: sgadef. dbf 화일의 읽기 시도중 읽기 오류"
07474,0, "snclrd: 닫기 오류, sgadef. dbf 화일을 닫을 수가 없습니다"
07475,0, "slsget: vm 통계를 얻을 수가 없습니다"
07476,0, "slsget: 메모리의 맵(map) 통계를 얻을 수가 없습니다"
07477,0, "scgcmn: 잠금 관리자가 초기화되지 않았습니다"
07478,0, "scgcmn: 잠금 상태를 얻을 수가 없습니다"
07479,0, "scgcmn: 잠금을 열거나 전환할 수 없습니다"
07480,0, "snchmod: ?/dbs/sgalm. dbf에 대한 허가를 변경할 수 없습니다"
07481,0, "snlmatt: 잠금 관리자 인스턴스에 첨부할 수 없습니다"
07482,0, "snlmini: 잠금 관리자 인스턴스를 생성할 수 없습니다"
07483,0, "snlkget: 잠금을 변환(get)할 수 없습니다"
07484,0, "snlkput: 잠금을 변환(put)할 수 없습니다"
07485,0, "scg_get_inst: 인스턴스 번호 잠금을 열 수 없습니다"
07486,0, "scg_get_inst: 인스턴스 번호 잠금을 변환(get)할 수 없습니다"
07487,0, "scg_init_lm: 잠금 관리자 인스턴스를 생성할 수 없습니다"
07488,0, "scgrcl: 잠금 관리자가 초기화되지 않았습니다"
07489,0, "scgrcl: 잠금 상태를 얻을 수가 없습니다"
07490,0, "scgrcl: 잠금을 변환할 수 없습니다"
07491,0, "scgrcl: 잠금 요구를 취소할 수 없습니다"
07492,0, "scgrcl: 잠금을 닫을 수 없습니다"
07493,0, "scgrcl: 잠금 매니져 오류"
07494,0, "scgcm: 예기치못한 오류"
07495,0, "spwat: lm_wait 실패"
07496,0, "sppst: lm_post 실패"
07497,0, "sdpri: 추적화일 '%s'를 생성할 수 없음; 오류번호 = %s"
07498,0, "spstp: /dev/resched를 열 수 없습니다"
07499,0, "spglk: 재스케줄할 수 없습니다"
07500,0, "scglaa: $cantim 예기치않은 리턴"
07501,0, "scgtoa: $deq 예기치 않은 리턴"
07502,0, "scgcmn: $enq 예기치 않은 리턴"
07503,0, "scgcmn: $setimr 예기치 않은 리턴"
07504,0, "scgcmn: $hiber 예기치 않은 리턴"
07505,0, "scggt:  $enq 부모 잠금에 예기치 않은 리턴"
07506,0, "scgrl:  lockid %s에 $deq라는 예기치 않은 리턴"
07507,0, "scgcm:  예기치 않은 잠금 상태 조건"
07508,0, "scgfal: $deq 모든 예기치 않은 리턴"
07509,0, "scgfal: $deq 부모 잠금에 예상치 못한 리턴"
07510,0, "scgbrm: lockid %s에 넘어온 $getlki가 잘못 되었습니다"
07511,0, "sscggtl: $enq가 마스터 종료 잠금에 대해서 잘못되었습니다"
07512,0, "sscggtl: $enq가 클라이언트 종료 잠금에 대해서 잘못되었습니다"
07513,0, "sscgctl: $deq가 종료 잠금의 취소에서 잘못되었습니다"
07514,0, "scgcan:  잠금을 취소할때 $deq가 잘못되었습니다"
07515,0, "sfccf:  UIC 그룹 <= MAXSYSGROUP - 화일 작업이 허용되지 않습니다"
07516,0, "sfccf:  $open 화일 오류"
07517,0, "sfccf:  존재하는 화일크기가 지정된 화일크기와 일치하지 않습니다"
07518,0, "sfccf:  부적합한 화일 생성 옵션"
07519,0, "sfccf:  화일 소유 그룹 <= MAXSYSGROUP 이므로 REUSE가 허용되지 않습니다"
07520,0, "sfccf:  부적합한 논리 블록 크기"
07521,0, "sfccf:  $create 화일 오류"
07522,0, "sfccf:  새로운 화일이 존재합니다"
07523,0, "sfccf:  $connect 오류"
07524,0, "sfccf:  $write (zero file) 오류"
07525,0, "sfccf:  $close 오류"
07526,0, "sfifi:  부적합한 논리 블록 크기"
07527,0, "sfifi:  UIC 그룹 <= MAXSYSGROUP - 화일 작업이 허용되지 않습니다"
07528,0, "sfifi:  $open  오류"
07529,0, "sfifi:  $close 오류"
07530,0, "sfofi:  $open 오류"
07531,0, "ssfccf:  $DISPLAY 오류"
07532,0, "sfcfi:  $dassgn 오류"
07533,0, "sfifi:  화일 소유 그룹 <= MAXSYSGROUP 이므로 화일을 열 수 없습니다"
07534,0, "scginq: lockid %s에서 $getlki 예기치 않은 리턴"
07535,0, "sfrfb:  부적절한 논리 블록 수"
07536,0, "sfrfb:  $qio(read) 오류"
07537,0, "sfccf:  화일 소유 그룹 <= MAXSYSGROUP 이므로 화일을 생성할 수 없습니다"
07538,0, "sfsgrow:  $qiow 실패"
07539,0, "sfqioini:  $qio 오류"
07540,0, "sfqioast: 비정상적으로 비동기 디스트 I/O에 작업이 완성되었습니다"
07541,0, "sfifi:  길이가 영인 화일을 식별할 수 없습니다"
07542,0, "sfccf:  화일의 최상위 버전외에는 생성-재사용을 할 수 없습니다"
07543,0, "sfrfb:  길이가 영인 화일을 판독할 수 없습니다"
07544,0, "sfqio: 성공적으로 비동기식 I/O가 완성되지 않았습니다"
07545,0, "sfcmf:  $PARSE 실패 (화일명 구문)"
07546,0, "sfcmf:  새로운 화일이 존재합니다"
07547,0, "sfcmf:  $OPEN 실패"
07548,0, "sftopn: 최대 화일수가 이미 열려 있습니다"
07549,0, "sftopn: $OPEN 실패"
07550,0, "sftopn: $CONNECT 실패"
07551,0, "sftcls: $CLOSE 실패"
07552,0, "sftget: $GET 실패"
07553,0, "sfofi: 개방할 화일이 없습니다"
07554,0, "sfcopy: 원천과 수신 논리블록의 크기가 일치해야 합니다"
07555,0, "sfqioast:  부적합한 미결 값"
07556,0, "sfotf:  $create 오류"
07557,0, "ssfctf: 테이프 화일에 지역 블록 크기 지정이 부적합합니다"
07558,0, "ssfctf: $create 오류"
07559,0, "sfdone: 성공적으로 비동기식 I/O가 완성되지 않았습니다"
07560,0, "sltln:  $trnlog 오류"
07561,0, "szprv: $IDTOASC 실패"
07562,0, "sldext: 확장자는 3자 이어야 합니다"
07563,0, "sldext: $PARSE 실패"
07564,0, "sldext: 화일명 또는 확장자에 와일드 카드(wildcard)"
07565,0, "sldext: $SEARCH 실패"
07568,0, "slspool: $OPEN 실패"
07569,0, "slspool: $CLOSE 실패"
07570,0, "szrfc: $IDTOASC 실패"
07571,0, "szrfc: $FIND_HELD 실패"
07572,0, "szrfc: 불 충분한 롤명 버퍼 공간"
07573,0, "slkhst: 호스트 연산을 수행할 수 없습니다"
07574,0, "szrfc:   $GETUAI 실패"
07576,0, "sspexst: 프로세스 %s 번호에 $GETJPIW 실패"
07577,0, "권한 화일에 그런 사용자가 없습니다"
07578,0, "szprv: $FIND_HELD 실패"
07579,0, "spini:  $DCLEXH 실패"
07580,0, "spstp:  $GETJPIW 실패"
07581,0, "spstp:  미확인 프로세스명에서 SID를 얻을 수 없습니다"
07582,0, "spstp:  ORA_SID 가 부적합한 값을 가집니다"
07584,0, "spdcr:  ORA_sid_(proc_)PQL$_item에 대한 부적절한 값입니다"
07585,0, "spdcr:  $PARSE 실패"
07586,0, "spdcr:  $SEARCH 실패"
07587,0, "spdcr:  $CREPRC 실패"
07588,0, "spdcr:  $GETJPIW가 이미지 이름을 얻는데 실패"
07589,0, "spdde:  시스템 id가 설정되지 않았습니다"
07590,0, "spdde:  $DELPRC 실패"
07591,0, "spdde:  $GETJPIW 실패"
07592,0, "sspgprv:  필요한 권한의 획득시 오류"
07593,0, "ssprprv:  권한의 해제시 오류"
07594,0, "spiip:  $GETJPIW 실패"
07595,0, "sppid:  $GETJPIW 실패"
07596,0, "sptpa:  $GETJPIW 실패"
07597,0, "spguns:  $GETJPIW 실패"
07598,0, "spwat:  $SETIMR 실패"
07599,0, "spwat:  $SCHDWK 실패"
07600,0, "spwat:  $GETSYIW 실패"
07601,0, "spguno: $GETJPIW 실패"
07602,0, "spgto: $GETJPIW 실패"
07605,0, "spdba:   $ASCTOID 실패"
07606,0, "spdba:   $CHKPRO 실패"
07607,0, "szaud:   $SNDOPR 실패"
07608,0, "szprv:   $GETUAI 실패"
07609,0, "szprv:   $HASH_PASSWORD 실패"
07610,0, "$GETJPIW가 사용자의 MAC 권한을 검색하는데 실패했습니다"
07612,0, "$GETUAI가 사용자의 해제 레벨을 검색하는데 실패했습니다"
07613,0, "$GETJPIW가 사용자의 프로세스 레이블을 검색하는데 실패했습니다"
07614,0, "$CHANGE_CLASS가 사용자의 프로세스 레이블을 검색하는데 실패했습니다"
07615,0, "$CHANGE_CLASS가 지정된 화일 레이블을 검색하는데 실패했습니다"
07616,0, "$CHANGE_CLASS가 지정된 디바이스 레이블을 검색하는데 실패했습니다"
07617,0, "$FORMAT_CLASS가 이진 레이블을 스트링으로 변환하는데 실패했습니다"
07618,0, "$IDTOASC가 보안 레벨 변환에 실패했습니다"
07619,0, "$IDTOAS가 무결성 레벨 변환에 실패했습니다"
07620,0, "smscre: 부적절한 데이타베이스 블록 크기"
07621,0, "smscre: 부적절한 재실행 블록 크기"
07622,0, "smscre: $CREATE 실패"
07623,0, "smscre: $CRMPSC 실패"
07624,0, "smsdes: $DBGLSC 실패"
07625,0, "smsget: $MGBLSC 실패"
07626,0, "smsget: sga가 이미 맵(map)되었습니다"
07627,0, "smsfre: $CRETVA 실패"
07628,0, "smsfre: sga가 맵(map)되지 않았습니다"
07629,0, "smpall: $EXPREG 실패"
07630,0, "smpdal: $DELTVA 실패"
07631,0, "smcacx: $EXPREG 실패"
07632,0, "smsrcx: $DELTVA 실패"
07633,0, "smsdbp: 부적합한 프로텍션 값입니다"
07634,0, "smsdbp: $CRETVA 실패"
07635,0, "smsdbp: $SETPRT 실패"
07636,0, "smsdbp: $MGBLSC 실패"
07637,0, "smsdbp: sga 생성시 버퍼 보호옵션이 지정되지 않았습니다"
07638,0, "smsget: SGA 패드(pad) 영역이 생성된 SGA에 비해 충분히 크지않습니다"
07639,0, "smscre: SGA 패드(pad) 영역이 충분히 크지않습니다(%s 바이트 필요)"
07640,0, "smsget: SGA가 아직 유효하지 않음.  초기화가 진행중입니다"
07641,0, "smscre: SGA에 시스템 페이지화일을 사용할 수 없습니다"
07642,0, "smprtset: $CMKRNL 실패"
07643,0, "smsalo: 부적절한 SMSVAR"
07645,0, "sszfsl: $CHANGE_CLASS 실패"
07646,0, "sszfck: $CREATE 실패"
07647,0, "sszfck: $OPEN 실패"
07650,0, "sigunc:  $GETJPIW 실패"
07655,0, "slsprom:$TRNLOG  실패"
07656,0, "slsprom:$GETDVI  실패"
07657,0, "slsprom:$ASSIGN  실패"
07658,0, "slsprom:$QIOW 읽기 실패"
07665,0, "ssrexhd: 순환 오류가 발생했습니다%s %s %s %s %s %s"
07670,0, "$IDTOASC가 보안 카테고리 변환에 실패했습니다"
07671,0, "$IDTOASC가 무결성 카테고리 변환에 실패했습니다"
07672,0, "$PARSE_CLASS가 스트링을 이진 레이블로 변환하는데 실패했습니다"
07680,0, "sou2os: 현재 ORACLE로의 다른 호출이 수행되고 있습니다"
07681,0, "sou2os: Oracle을 초기화 할때 오류가 발생했습니다"
07682,0, "sou2os: 커널 디스패치 설정 실패 오류"
07683,0, "sou2os: $SETPRV 재설정 오류"
07684,0, "sou2os: 슈퍼바이져 스택 재설정 오류"
07685,0, "sou2os: 슈퍼바이져 스택 설정 오류"
07700,0, "soarch: 인터럽트를 받았습니다"
07701,0, "soatln: 내부적인 예외 상황: 출력 버퍼가 너무 작습니다"
07702,0, "아카이브내에 인식할 수 없는 디바이스 유형입니다"
07703,0, "아카이브 텍스트내에 오류: 디바이스 유형 다음에 '/'가 있어야 합니다"
07704,0, "아카이브 텍스트내에 오류: 디바이스 이름 다음에 ':'가 있어야 합니다"
07705,0, "sksaprs: 디바이스명 버퍼가 너무 작습니다"
07706,0, "아카이브 텍스트내에 오류: 디스크 화일명을 필요로합니다"
07707,0, "아카이브 텍스트내에 오류: 테이프 레이블명을 필요로합니다"
07708,0, "soaprs: 테이프 레이블 이름 버퍼가 너무 작습니다"
07709,0, "sksaprs: 원격 호스트에 아카이빙이 허용되지 않습니다"
07710,0, "soaprs: 화일 이름 버퍼가 너무 작습니다"
07713,0, "sksamtd: 아카이벌 디바이스를 마운트할 수 없습니다(SYS$MOUNT 실패)"
07715,0, "sksadtd: 아카이벌 디바이스를 디스마운트할 수 없습니다(SYS$DISMNT 실패)"
07716,0, "sksachk: ARCHIVE를 위한 잘못된 디바이스 명시"
07717,0, "sksaalo: 메모리 할당시 오류"
07718,0, "sksafre: 메모리 회수(freeing)시 오류"
07721,0, "scgcm:  시스템 엔큐를 얻기 위한 OS 자원이 충분하지 않습니다"
07740,0, "slemop: 부정확한 처리 크기 (프로그래밍 오류)"
07741,0, "slemop: $OPEN 실패"
07742,0, "slemop: $CONNECT 실패"
07743,0, "slemop: 부정확한 오류 화일 크기"
07744,0, "slemcl: 부정확한 오류 메시지 화일 처리입니다"
07745,0, "slemcl: $CLOSE 실패"
07746,0, "slemrd: 부정확한 오류 메시지 화일 처리입니다"
07747,0, "slemrd: $READ 실패"
07750,0, "slemcr: fopen 실패"
07751,0, "slemcr: malloc 실패"
07753,0, "slemcf: 쓰기가 실패전에 fseek를 시도"
07754,0, "slemcf: fwrite 실패"
07755,0, "slemcf: 읽기가 실패전에 fseek"
07756,0, "slemcf: fread 실패"
07757,0, "slemcc: 부적절한 처리"
07758,0, "slemcw: 부적절한 처리"
07759,0, "slemtr: 부적절한 수신지"
07760,0, "slemtr: $open 실패"
07800,0, "slbtpd: 부적절한 수치"
07801,0, "slbtpd: 부적절한 지수"
07802,0, "slbtpd: 팩형 십진수로 변환시 오버플로우"
07803,0, "slpdtb: 부적절한 팩형 십진수 니블"
07804,0, "slpdtb: 제공된 버퍼에 비해서 수치가 너무 큽니다"
07820,0, "sspscn: SYS$CRELNM 실패"
07821,0, "sspsdn: SYS$DELLNM 실패"
07822,0, "spsscm: SYS$CREMBX 실패"
07823,0, "spssqr: $QIO 실패"
07824,0, "spsain: $SETIMR 실패"
07825,0, "spssck: AST 레이블 에서의 $QIO  실패"
07826,0, "spsscm: SYS$GETDVIW 실패"
07840,0, "sllfop: LIB$GET_VM 실패"
07841,0, "sllfop: SYS$OPEN 실패"
07842,0, "sllfcl: SYS$CLOSE 실패"
07843,0, "sllfcl: LIB$FREE_VM 실패"
07844,0, "sllfop: LIB$GET_VM 실패"
07845,0, "sllfcl: LIB$FREE_VM 실패"
07846,0, "sllfop: %s 바이트의 레코드 버퍼가 %s 바이트의 사용자 버퍼에 비해 너무 큽니다"
07847,0, "sllfop: $CONNECT 실패"
07848,0, "sllfrb: $GET 실패"
07849,0, "sllfsk: $GET 실패"
07850,0, "sllfop: 틀린 옵션"
07860,0, "osnsoi: 인터럽트 처리기를 셋업할때 오류가 발생했습니다"
07861,0, "sfqio:  판독만 되는 화일에다 기록을 할수 없습니다"
07862,0, "sfqio:  화일을 확장할 수 없습니다"
07880,0, "sdopnf: 내부 오류"
08000,0, "세션 시퀀스 리스트의 최대수를 초과했습니다"
08001,0, "세션당 최대 시퀀스의 수를 초과했습니다"
08002,0, "시퀀스 %s. CURRVAL은 이 세션에서는 정의 되어 있지 않습니다"
08003,0, "시퀀스 %s. NEXTVAL 은 내부 한계를 초과했습니다"
08004,0, "시퀀스 %s. NEXTVAL %s %sVALUE 은 사례로 될 수 없습니다"
08005,0, "지정된 행이 존재하지 않습니다"
08006,0, "지정된 행은 더 이상 존재하지 않습니다"
08008,0, "다른 인스턴스가 USE_ROW_ENQUEUES = %s 로 마운트했습니다"
08100,0, "부적합한 색인입니다 진단에 대해서는 추적 화일을 참조하십시오"
08101,0, "색인 키가 존재하지 않습니다 루트 dba %s, dba %s(%s)"
08102,0, "색인 키가 없습니다 obj# %s, dba %s(%s)"
08103,0, "개체가 더이상 존재하지 않습니다"
08175,0, "별개의 트랜잭션 제약이 위배되었습니다 (%s)"
08176,0, "일관된 읽기가 실패; 롤백 데이타를 사용할 수 없습니다"
08177,0, "이 트랜잭션에 대한 직렬화 액세스를 할 수 없습니다"
08200,0, "scggc: 잠금을 여는데 실패했습니다"
08201,0, "scggc: 잠금을 변환하는데 실패했습니다"
08202,0, "scggc: 잠금을 닫는데 실패했습니다"
08203,0, "scgcan: 미결의 변환 요구를 취소하는데 실패했습니다"
08204,0, "scgcm: 예기치 않은 잠금 관리자 리턴 코드입니다"
08205,0, "ora_addr: 환경에 $ORACLE_SID가 설정되지 않았습니다"
08206,0, "ora_addr: 주소 화일 이름을 변환할 수 없습니다"
08207,0, "ora_addr: 주소 화일을 열 수 없습니다"
08208,0, "ora_addr: 주소 화일로부터 읽을 수 없습니다"
08209,0, "scngrs: SCN은 아직 초기화되지 않았습니다"
08210,0, "I/O 오류가 요구되었습니다"
08211,0, "sfgcwd: 현재 작업 디렉토리를 얻을 수 없습니다"
08212,0, "sfphys: 화일 이름을 변환할 수 없습니다"
08213,0, "sfphys: 화일이름을 stat 할 수 없습니다"
08214,0, "sfccf: SID가 너무 깁니다"
08215,0, "sfccf: 유효하지 않은 논리 블록 크기입니다"
08216,0, "sfccf: 화일 이름을 변환할 수 없습니다"
08217,0, "sfccf: 화일을 재사용할 수 없습니다"
08218,0, "sfccf: 화일을 생성할 수 없습니다 화일이 존재합니다"
08219,0, "sfccf: 화일을 만들 수 없습니다"
08220,0, "sfccf: 재사용하기 위한 작성에 실패했습니다"
08221,0, "sfccf: 내부 오류; 잘못된 사용 옵션"
08222,0, "sfccf: 화일을 fstat 할 수 없습니다"
08223,0, "sfccf: 재사용을 위한 작성시 화일 크기가 유효하지 않습니다"
08224,0, "sfccf: 논리 블록 크기가 유효하지 않습니다"
08225,0, "sfccf: 화일을 ftruncate 할 수 없습니다"
08226,0, "sfccf: 지움이 실패했습니다"
08227,0, "sfifi: 화일 이름을 변환할 수 없습니다"
08228,0, "sfifi: 화일명을 stat 할 수 없습니다"
08229,0, "sfifi: 유효하지 않은 논리 블록 크기"
08230,0, "smscre: SGA 할당에 실패했습니다"
08231,0, "smscre: SGA에 첨부할수 없습니다"
08232,0, "smsdes: SGA로부터 분리할 수 없습니다"
08233,0, "smsdes: SGA를 unmap 할 수 없습니다"
08234,0, "smsget: 인스턴스 리스너 주소를 가지고 올 수 없습니다"
08235,0, "smsget: 이 노드에 리스너가 없습니다"
08236,0, "smsget: 리스너와 함께 서브큐브를 공유할 수 없습니다"
08237,0, "smsget: SGA 영역이 아직 생성되지 않았습니다"
08238,0, "smsfre: SGA로부터 분리 할 수 없습니다"
08240,0, "snlmatt: 병렬 서버 이름이 너무 깁니다"
08241,0, "snlmatt: 잠금 관리자에 첨부할 수 없습니다"
08242,0, "snlmdet: 잠금 관리자로부터 분리할 수 없습니다"
08243,0, "soarch: 이름서버를 열 수 없습니다"
08244,0, "soarch: 온라인 로그 화일을 읽기용으로 열 수 없습니다"
08245,0, "soarch: 아카이브 수신 화일을 생성할 수 없습니다"
08246,0, "soarch: 아카이브 수신 화일을 읽기용으로 열 수 없습니다"
08247,0, "soarch: 아카이브 서버에 연결할 수 없습니다"
08248,0, "soarch: 아카이브 서버가 실패"
08249,0, "soarch: 일부를 서버에게 보내는데 실패했습니다"
08250,0, "soarch: ORACLE_PSRV가 정의되지 않았습니다"
08251,0, "soarch: 아카이벌이 중단되었습니다"
08260,0, "ora_addr: 이름서버를 열 수 없습니다"
08261,0, "ora_addr: 이름서버에서 이름을 찾을 수 없습니다"
08262,0, "ora_addr: ORACLE_PSRV 가 정의되지 않았습니다"
08263,0, "ora_addr: 리스너 주소를 해제할 수 없습니다"
08264,0, "ora_addr: 이름서버를 닫을 수 없습니다"
08265,0, "create_ora_addr: 이름서버를 열 수 없습니다"
08266,0, "create_ora_addr: 이름서버에 이름을 등록할 수 없습니다"
08267,0, "destroy_ora_addr: 이름서버를 닫을 수 없습니다"
08268,0, "create_ora_addr: 이름서버를 닫을 수 없습니다"
08269,0, "destroy_ora_addr: 이름을 삭제할 수 없습니다"
08270,0, "soachk: 아카이벌 제어 스트링이 부적합합니다"
08271,0, "soabln: 아카이브 제어 스트링에 대한 버퍼 크기가 충분하지 않습니다"
08272,0, "soarch: 아카이브 제어 스트링에 대한 버퍼 크기가 충분하지 않습니다"
08274,0, "환경 변수를 위한 메모리가 부족합니다"
08275,0, "환경 변수가 설정되지 않았습니다"
08276,0, "이름서버에 pid를 위한 공간이 없습니다"
08277,0, "환경 변수를 설정할 수 없습니다"
08278,0, "CPU 통계를 얻을 수 없습니다"
08279,0, "sfsrd: 읽기 장소를 찾을 수 없습니다"
08281,0, "sfofi: 화일을 열 수 없습니다"
08282,0, "sfcfi: 화일을 닫을 수 없습니다"
08283,0, "sfrfb: 블록 수가 유효하지 않습니다 내부 오류"
08284,0, "sfrfb: 정렬되지 않은 버퍼입니다; 내부 오류"
08285,0, "sfrfb: 읽기 장소를 찾을 수 없습니다"
08286,0, "sfrfb: 읽기 실패"
08287,0, "sfcmf: 대상 화일 이름을 바꿀 수 없습니다"
08288,0, "sfcmf: 소스 화일 이름을 바꿀 수 없습니다"
08289,0, "sfcopy: 화일들이 서로 다른 블록 크기를 가지고 있습니다"
08290,0, "sfcopy: 복사를 위한 버퍼를 malloc 할 수 없습니다"
08291,0, "sfcopy: 복사중에 읽기가 실패했습니다"
08292,0, "sfcopy: 복사중에 쓰기가 실패했습니다"
08293,0, "sfnfy: ulimit 실패"
08294,0, "sfsrd: 블록 수가 잘못되었습니다; 내부 오류"
08295,0, "sfsrd: 읽기가 너무 큽니다"
08296,0, "sfsrd: 읽기 실패"
08297,0, "sfsrd: 읽기가 잘못된 바이트 수를 리턴 했습니다"
08298,0, "sfsync: 기가캐쉬 동기화 실패"
08299,0, "sfsync: 기가캐쉬 화일 동기화 실패"
08300,0, "sfq_clean1: 비동기 I/O 실패"
08301,0, "sfdone: 비동기 I/O 실패"
08302,0, "sfqio: 내부 오류"
08303,0, "sfqio: 비동기 I/O 벡터를 malloc할 수 없습니다"
08304,0, "sfqio: 부적절한 블록 수; 내부 오류"
08305,0, "sfqio: 정렬되지 않은 버퍼; 내부 오류"
08306,0, "sfqio: I/O 제어 플래그를 설정할 수 없습니다"
08307,0, "sfqio: 비동기 I/O 요구를 제안할 수 없습니다"
08308,0, "sllfop: 화일을 열 수 없습니다"
08309,0, "sllfop: 화일을 fstat할 수 없습니다"
08310,0, "sllfop: recsize에 대한 값이 잘못되었습니다"
08311,0, "sllfop: maxrecsize에 대한 값이 잘못되었습니다"
08312,0, "sllfop: 인식할 수 없는 처리 옵션"
08313,0, "sllfop: 버퍼를 할당할 수 없습니다"
08314,0, "sllfcf: 화일을 닫는중 오류 발생"
08315,0, "sllfrb: 화일을 읽는중 오류 발생"
08316,0, "sllfsk: 화일에서 찾는중 오류 발생"
08317,0, "sllfsk: 화일에서 찾는중 오류 발생"
08318,0, "sllfsk: 화일을 읽는중 오류 발생"
08319,0, "sllfsk: 화일을 읽는중 오류 발생"
08320,0, "scnget: scnset 또는 scnfnd 전에 scnget을 호출합니다"
08321,0, "scnmin: NOT IMPLEMENTED YET"
08322,0, "scnmin: 바이어스 잠금을 열기/변환하는데 실패했습니다"
08323,0, "scnmin: 바이어스 잠금을 닫는데 실패했습니다"
08330,0, "프린트는 지원되지 않습니다"
08331,0, "대기 작업이 시간 초과되었습니다"
08332,0, "지정된 롤백 세그먼트 %s를 사용할 수 없습니다"
08340,0, "이 명령어는 nCUBE에서 허용되지 않고 하나의 쓰레드만 사용 되었습니다"
08341,0, "nCUBE에서 이 명령어는 인스턴스 1에서만 실행될 수 있습니다"
08342,0, "sropen: 재실행 서버 연결을 여는데 실패했습니다"
08343,0, "srclose: 재실행 서버 연결을 닫는데 실패했습니다"
08344,0, "srapp: 재실행 데이타를 재실행 서버로 보내는데 실패했습니다"
08360,0, "sfccf: 화일 유형이 유효하지 않습니다"
08361,0, "sfccf: 원시 디바이스에 공간이 없습니다"
08362,0, "scgcm: 잠금 관리자에 메모리가 부족합니다"
08401,0, "부적당한 컴파일러 이름: %s"
08412,0, "WMSGBSIZ에서 오류 발생, WMSGBLK의 크기가 경고 메시지에 비해 작습니다"
08413,0, "%s에서 FORMAT 파라미터에 부적당한 컴파일러 유형이 있습니다"
08414,0, "%s에 오류가 생겼습니다"
08429,0, "디스플레이 유형 데이타로는 부적당한 디지트가 raw 데이타에 있습니다"
08430,0, "raw 데이타에 선행 부호가 누락되었습니다"
08431,0, "픽처에 정의되어 있는 제로들이 raw 데이타에는 없습니다"
08432,0, "raw 데이타에 부적당한 부동 소숫점 데이타가 있습니다"
08433,0, "raw에서 숫자로 변환하는데 부적당한 픽처 유형이 있습니다"
08434,0, "raw 데이타에 부적당한 종결 부호가 있습니다"
08435,0, "SIGN IS LEADING가 명세될때 PICTURE MASK의 주된 신호가 빠졌습니다"
08436,0, "raw 데이타에 부적당한 부호 디지트가 있습니다"
08437,0, "픽처 마스크에 부적당한 픽처 유형이 있습니다"
08440,0, "raw 버퍼는 변환된 데이타를 보관하기에 너무 작습니다"
08441,0, "픽처 마스크에 닫기 괄호가 누락되었습니다"
08443,0, "마스크 옵션의 BLANK WHEN ZERO 절에 구문 오류입니다"
08444,0, "마스크 옵션의 JUSTIFIED 절에 구문 오류입니다"
08445,0, "마스크 옵션의 SIGN 절에 구문 오류입니다"
08446,0, "마스크 옵션의 SYNCHRONIZED 절에 구문 오류입니다"
08447,0, "마스크 옵션의 USAGE 절에 구문 오류입니다"
08448,0, "DECIMAL-POINT 환경 절에 구문 오류"
08449,0, "픽처 마스크에 부적당한 숫자 기호가 있습니다"
08450,0, "픽처 마스크의 CR 지정이 부적당합니다"
08451,0, "픽처 마스크의 DB 지정이 부적당합니다"
08452,0, "픽처 마스크의 E 명세가 지원되지 않습니다"
08453,0, "픽처 마스크에 하나 이상의 V 기호가 지정되었습니다"
08454,0, "픽처 마스크에 하나 이상의 S 기호가 지정되었습니다"
08455,0, "CURRENCY SIGN 환경 절에 구문 오류"
08456,0, "픽처 마스크에는 부호가 없지만 마스크 옵션에 SIGN 절이 있습니다"
08457,0, "SIGN 절의 SEPARATE CHARACTER 옵션에 구문 오류입니다"
08458,0, "부적당한 포맷 파라미터"
08459,0, "부적당한 포맷 파라미터 길이"
08460,0, "환경 파라미터에 부적당한 환경 절"
08462,0, "raw 버퍼에 부적당한 데이타가 있습니다"
08463,0, "십진수를 Oracle 수로 변환하는데 오버플로우가 발생했습니다"
08464,0, "입력 raw 데이타가 42 자리수 이상을 포함하고 있습니다"
08465,0, "입력 마스크는 32 문자보다 많이 포함하고 있습니다"
08466,0, "raw 버퍼 길이 %s는 %s에 대해 너무 짧습니다"
08467,0, "오라클 번호 %s로 변환하는데 오류가 있습니다"
08468,0, "마스크 옵션 %s는 지원되지 않습니다"
08498,0, "경고:픽처 마스크 '%s'는 옵션 'USAGE IS %s'를 무시하고 'USAGE IS DISPLAY'로 간주합니다"
08499,0, "경고: UTL_PG에 의해 픽처 마스크 옵션 '%s'가 무시되었습니다 "
09700,0, "sclin: 최대 대치수에 도달했습니다"
09701,0, "scnfy: 최대 프로세스수를 초과했습니다"
09702,0, "sem_acquire: 래치 세마포를 확보할 수 없습니다"
09703,0, "sem_release: 래치 세마포를 해제할 수 없습니다"
09704,0, "sstascre: 테스트와 세트 페이지의 생성시 ftok 오류"
09705,0, "spcre: 래치 세마포를 초기화할 수 없습니다"
09706,0, "slsget: get_process_stats 오류"
09707,0, "sfccf: ORACLE_SID의 최대길이를 초과했습니다"
09708,0, "soacon: 소켓을 포트로 바인드하는데 실패했습니다"
09709,0, "soacon: 연결을 받아들이는데 실패했습니다"
09710,0, "soarcv: 버퍼 오버플로우"
09711,0, "orasrv: archmon이 이미 연결되었습니다"
09712,0, "orasrv: 로그 아카이버가 이미 연결되었습니다"
09713,0, "soadum: 테이프로 로그를 아카이브할 수 없습니다"
09714,0, "Two Task interface: puname을 획득할 수 없습니다"
09715,0, "orasrv: puname을 획득할 수 없습니다"
09716,0, "kslcll: 인-플럭스 램포트 래치를 고정할 수 없습니다"
09717,0, "osnsui: 사용자 인터럽트 처리기의 최대수를 초과했습니다"
09718,0, "osnsui: 사용자 인터럽트 처리기를 설정할 수 없습니다"
09719,0, "osncui: 잘못된 처리"
09740,0, "slsget: 가상 메모리 영역 통계를 얻을 수 없습니다"
09741,0, "spwat: 포스트 대기시 오류발생"
09742,0, "sppst: 포스트 하는동안 오류발생"
09743,0, "smscre: 공유 메모리를 첨부할 수 없습니다"
09744,0, "smsget: mmap이 오류를 리턴했습니다"
09745,0, "smscre: vm_allocate오류, 공유 메모리를 생성할 수 없습니다"
09746,0, "smscre: 공유 메모리에 틀린 번지가 첨부되었습니다"
09747,0, "pw_detachPorts: pws_detach 서버콜이 실패했습니다"
09748,0, "pws_look_up: fork 실패"
09749,0, "pws_look_up: 포트 찾기 실패"
09750,0, "pw_attachPorts: port_rename 실패"
09751,0, "pw_attachPorts: pws_attach 서버콜 실패"
09752,0, "pw_attachPorts: port_allocate 실패"
09753,0, "spwat: 유효하지 않은 프로세스 번호입니다"
09754,0, "sppst: 부당한 프로세스 번호가 sppst에 넘겨졌습니다"
09755,0, "osngpn: 포트 할당에 실패했습니다"
09756,0, "osnpns: 이름 서버에 포트가 없습니다"
09757,0, "osnipn: 포트 할당에 실패했습니다"
09758,0, "osnipn: 이름 서버에서 포트를 확인할 수 없습니다"
09759,0, "osnsbt: 잘못된 메시지를 수신했습니다"
09760,0, "osnpui: 브레이크 메시지를 송신할 수 없습니다"
09761,0, "pw_destroyPorts: pws_stop_instance 서버콜 실패"
09762,0, "sNeXT_instanceName: 변환실패"
09763,0, "osnmpx: 매치(Mach) 포트의 변경시 송신/수신 오류가 발생했습니다"
09764,0, "osnmop: 오라클 수행 모듈의 액세스 오류입니다"
09765,0, "osnmop: fork 실패"
09766,0, "osnmop: 버퍼 할당 실패"
09767,0, "osnmfs: msg_send로부터 잘못된 리턴코드를 받았습니다"
09768,0, "osnmgetmsg: 메시지를 읽을 수 없습니다"
09769,0, "osnmbr: 브레이크 메시지를 송신할 수 없습니다"
09770,0, "pws_look_up: 변환실패"
09771,0, "osnmwrtbrkmsg: msg_send의 리턴코드가 잘못되었습니다"
09772,0, "osnpmetbrkmsg: 호스트로부터의 메시지가 잘못된 메시지 유형입니다"
09773,0, "osnmgetdatmsg: 호스트로부터의 메시지가 잘못된 메시지 유형입니다"
09774,0, "osnmui: 브레이크 메시지를 송신할 수 없습니다"
09775,0, "osnmrs: 프로토콜 재설정 오류"
09776,0, "pws_look_up: 수행모듈(Oracle helper)의 액세스 오류"
09777,0, "osnpbr: 브레이크 메시지를 보낼 수 없습니다"
09778,0, "snynfyport: notify 포트의 할당에 실패했습니다"
09779,0, "snyGetPort: 포트의 할당에 실패했습니다"
09780,0, "sfifi: 변환오류, 인스턴스명을 확장할 수 없습니다"
09781,0, "sfifi: 콘트롤 화일에 잘못된 인스턴스명이 저장되어 있습니다"
09782,0, "sfifi: 다른 인스턴스가 동일한 데이타베이스로 마운트되었습니다"
09783,0, "sfifi: 다른 인스턴스가 동일한 데이타베이스로 마운트되었는지 판단할 수 없습니다"
09784,0, "sfifi: lseek 오류, 화일의 시작위치를 찾을 수 없습니다"
09785,0, "sfifi: write 오류, 헤더블록을 기록할 수 없습니다"
09786,0, "sllfop: open 오류, 화일을 열 수 없습니다"
09787,0, "sllfop: 인식할 수 없는 처리 옵션, 잘못된 형식입니다"
09788,0, "sllfrb: 화일을 읽을 수 없습니다"
09789,0, "sllfsk: 화일을 읽을 수 없습니다"
09790,0, "sllfcf: 화일을 닫을 수 없습니다"
09791,0, "slembdf: 변환 오류, 오류 화일명을 변환할 수 없습니다"
09792,0, "sllfop: 읽기용의 버퍼를 할당할 수 없습니다"
09793,0, "szguns: 사용자명의 길이가 버퍼보다 큽니다"
09794,0, "szrbuild: 롤명의 길이가 버퍼보다 큽니다"
09795,0, "szrbuild: 롤 구조의 malloc에 실패했습니다"
09796,0, "szrbuild: 롤명의 malloc에 실패했습니다"
09797,0, "O/S MAC 권한의 확보에 실패했습니다"
09798,0, "레이블 비교에 실패했습니다"
09799,0, "화일 레이블의 조회에 실패했습니다"
09800,0, "프로세스 민감도 레이블 검색에 실패했습니다"
09801,0, "연결 상태로 부터 사용자 번호를 가지고 올 수 없습니다"
09802,0, "이진 레이블을 스트링으로 변환하는것데 실패했습니다"
09803,0, "스트링 버퍼의 할당에 실패. "
09804,0, "이진수에서 ORACLE 로의 클래스 변환은 지원하지 않습니다"
09805,0, "카테고리 수에서 스트링으로의 변환은 지원하지 않습니다"
09806,0, "클래스 스트링 버퍼의 할당에 실패했습니다"
09807,0, "스트링에서 이진수로 레이블 변환이 실패했습니다"
09808,0, "사용자 허가를 얻을 수 없습니다"
09809,0, "연결 상태로부터 사용자 그룹 ID를 가지고 올 수 없습니다"
09810,0, "연결 상태로 부터 프로세스 ID를 가지고 올 수 없습니다"
09811,0, "패키지를 초기화할 수 없습니다"
09812,0, "연결 상태로부터 사용자 해제 정보를 가져올 수 없습니다"
09813,0, "디렉토리 상태를 가지고 올 수 없습니다"
09814,0, "화일 이름을 확장할 수 없습니다"
09815,0, "화일 이름 버퍼 오버플로우"
09816,0, "유효한 권한을 지정할 수 없습니다"
09817,0, "감사 화일에다 기록하는것이 실패했습니다"
09818,0, "수치가 너무 큽니다"
09819,0, "수치가 적법한 최대치를 초과합니다"
09820,0, "클래스 스트링에서 수치표현으로의 변환에 실패했습니다"
09821,0, "범주 스트링의 해석에 실패했습니다"
09822,0, "감사 화일 이름을 변역하는데 실패했습니다"
09823,0, "디바이스명이 너무 깁니다"
09824,0, "allowmacaccess 권한을 가용화할 수 없습니다"
09825,0, "allowmacaccess 권한을 사용불가하게 할 수 없습니다"
09826,0, "SCLIN: atomic 래치를 초기화할 수 없습니다"
09827,0, "SCLGT: atomic 래치가 불명의 오류를 리턴했습니다"
09828,0, "SCLFR: atomic 래치가 오류를 리턴했습니다"
09829,0, "pw_createPorts: pws_start_instance 서버 콜이 실패했습니다"
09830,0, "snyAddPort: 원격 프로시저 호출의 수행 실패. "
09831,0, "snyStartThread: 서버 포트 설정 실패. "
09832,0, "infoCallback: 잘못된 메시지 유형. "
09833,0, "addCallback: 잘못된 메시지 유형. "
09834,0, "snyGetPortSet: 포트에 대한 정보를 모을 수 없습니다"
09835,0, "addCallback: callback 포트가 이미 세트내에 있습니다"
09836,0, "addCallback: callback 세트에 포트를 추가할 수 없습니다"
09837,0, "addCallback: callback 링크의 할당을 추가할 수 없습니다"
09838,0, "removeCallback: callback 포트의 제거에 실패했습니다"
09839,0, "removeCallback: callback 포트가 콜백 세트내에 없습니다"
09840,0, "soacon: 이름 변환 실패"
09841,0, "soacon: 이름 변환 실패"
09842,0, "soacon: Archmon이 named 파이프를 생성할 수 없습니다"
09843,0, "soacon: Archmon이 named 파이프를 생성할 수 없습니다"
09844,0, "soacon: Archmon이 named 파이프를 열 수 없습니다"
09845,0, "soacon: Archmon이 named 파이프를 열 수 없습니다"
09846,0, "soacon: ARCH이 named 파이프를 열 수 없습니다"
09847,0, "soacon: ARCH이 named 파이프를 열 수 없습니다"
09848,0, "soawrt: named 파이프에 기록할 수 없습니다"
09849,0, "soarcv: named 파이프에서 읽을 수 없습니다"
09850,0, "soacon: Archmon이 named 파이프를 잠금할 수 없습니다"
09851,0, "soacon: Archmon이 named 파이프를 잠금할 수 없습니다"
09852,0, "sfgcwd: 현 디렉토리의 이름을 얻을 수 없습니다"
09853,0, "snyRemovePort: 요구로부터 잘못된 리턴코드가 발생했습니다"
09854,0, "snyPortInfo: 요구로부터 잘못된 리턴코드가 발생했습니다"
09855,0, "removeCallback: 잘못된 메시지 형식"
09856,0, "smpalo: pga 할당중 vm_allocate 오류"
09857,0, "smprset: pga 프로텍트중 vm_protect 오류"
09870,0, "spini: 최대 개방 화일수의 초기화에 실패했습니다"
09871,0, "TASDEF_NAME: ?/dbs/tasdef@. dbf의 확장시 변환오류 발생"
09872,0, "TASDEF_CREATE: ?/dbs/tasdef@. dbf의 생성시 실패"
09873,0, "TASDEF_OPEN: tasdef@. dbf 화일의 열기 오류"
09874,0, "TASDEF_READ: tasdef@. dbf 화일을 읽을 수 없습니다"
09875,0, "TASDEF_WRITE: ?/dbs/tasdef@. dbf 화일의 기록오류"
09876,0, "TASDEF_CLOSE: ?/dbs/tasdef@. dbf 화일을 닫을 수 없습니다"
09877,0, "sstascre: shmget 오류, 공유메모리 세그먼트를 얻을 수 없습니다"
09878,0, "sstascre/sstasat: shmat오류, tas 기록 페이지를 첨부할 수 없습니다"
09879,0, "sstascre/sstasat: shmat오류, tas 읽기 페이지를 첨부할 수 없습니다"
09880,0, "sstasfre/sstasdel: shmat오류, tas 기록 페이지를 분리할 수 없습니다"
09881,0, "sstasfre/sstasdel: shmat오류, tas 읽기 페이지를 분리할 수 없습니다"
09882,0, "sstasfre/sstasdel: shmat오류, tas shm 페이지를 분리할 수 없습니다"
09883,0, "Two Task interface: /etc/oratab이 존재하지 않습니다"
09884,0, "Two Task interface: SID가 현재 PU와 일치하지 않습니다"
09885,0, "osnTXtt: TXIPC 채널을 생성할 수 없습니다"
09886,0, "osnTXtt: txipc@. trc를 확장하는데 변환오류가 발생했습니다"
09887,0, "osnTXtt: 디버그 채널의 생성/열기에 실패했습니다"
09888,0, "osnTXtt: txipc 채널의 생성 실패"
09889,0, "osnTXtt: 오라클 수행모듈의 액세스 오류"
09890,0, "osnTXtt: malloc실패"
09894,0, "sfwrt: 비동기 기록을 초기화할 수 없습니다"
09895,0, "sfaswr: 함수가 잘못된 인수로 요구되었습니다"
09896,0, "sfaswr: 유효하지 않은 블록번호"
09897,0, "sfaswr: 기록오류, 데이타베이스 블록을 기록할 수 없습니다"
09898,0, "sfalck: setitimer오류, 인터벌 타이머를 지정할 수 없습니다"
09899,0, "sfapol: 쓰기오류, 비동기 기록을 폴할 수 없습니다"
09900,0, "sfapol: 쓰기오류, 비동기 기록을 폴할 수 없습니다"
09901,0, "sfapol: 쓰기오류, 데이타베이스 블록을 기록할 수 없습니다"
09902,0, "sfapol: 틀린 바이트 수로 쓰기에 리턴됐습니다"
09903,0, "sfwrt: 내부 오류"
09904,0, "sfotf: 임시화일 디렉토리명이 너무 깁니다"
09905,0, "sfotf: mktemp() 실패"
09906,0, "sfotf: 임시 정열 화일을 여는데 실패"
09907,0, "sfotf: 임시 정열 화일을 링크해제 하는데 실패"
09908,0, "spwat: gethostname이 오류를 리턴했습니다"
09909,0, "스크래치 버퍼를 malloc하는데 실패했습니다"
09910,0, "사용자에 대한 ORACLE의 암호 화일 엔트리를 찾을 수 없습니다"
09911,0, "사용자 암호가 틀립니다"
09912,0, "이름버퍼를 malloc 하는데 실패했습니다"
09913,0, "더미이름을 malloc 하는데 실패했습니다"
09914,0, "ORACLE 암호 화일을 열 수 없습니다"
09915,0, "암호의 암호화에 실패했습니다"
09916,0, "요구된 암호가 지정되지 않았습니다"
09917,0, "시스템 그룹화일에 DBA 그룹이 존재하지 않습니다"
09918,0, "SQL*Net으로부터 사용자 권한을 얻을 수 없습니다"
09919,0, "전용 서버의 레이블을 지정할 수 없습니다"
09920,0, "연결 상태에서 민감도 레이블을 얻을 수 없습니다"
09921,0, "연결 상태에서 정보 레이블을 얻을 수 없습니다"
09922,0, "프로세스를 띄울 수 없음 - 백그라운드 로그 디렉토리가 적절히 생성되지 않았습니다"
09923,0, "프로세스를 띄울 수 없음 - 사용자 로그 디렉토리가 적절히 생성되지 않았습니다"
09924,0, "프로세스를 띄울 수 없음 - 코아 덤프 디렉토리가 적절히 생성되지 않았습니다"
09925,0, "감사 추적 화일을 생성할 수 없습니다"
09926,0, "서버의 유효한 권한 세트를  설정할 수 없습니다"
09927,0, "서버의 레이블을 지정할 수 없습니다"
09928,0, "서버의 레이블을 복원할 수 없습니다"
09929,0, "2개 레이블의 GLB는 허용되지 않습니다"
09930,0, "2개 레이블의 LUB는 허용되지 않습니다"
09931,0, "ORACLE 암호 화일을 읽기용으로 열 수 없습니다"
09932,0, "ORACLE 암호 화일을 닫는데 실패했습니다"
09933,0, "구 암호 화일의 삭제에 실패했습니다"
09934,0, "현재 암호 화일을 구 암호 화일로 링크하는데 실패했습니다"
09935,0, "현재 암호 화일을  링크해제하는데 실패했습니다"
09936,0, "ORACLE 암호 화일을 쓰기용으로 여는데 실패했습니다"
09937,0, "ORACLE 암호 화일의 모드를 바꾸는데(chmod) 실패했습니다"
09938,0, "신호 처리기를 저장하는데 실패했습니다"
09939,0, "신호 처리기를 재 저장하는데 실패했습니다"
09940,0, "ORACLE 암호 화일 헤더가 손상되었습니다"
09941,0, "화일보다 orapasswd 또는 installer가 더 오래된 버전입니다"
09942,0, "ORACLE 암호 화일 헤더의 기록에 실패했습니다"
09943,0, "암호 리스트 요소를 위한 메모리 할당에 실패했습니다"
09944,0, "암호 항목이 손상되었습니다"
09945,0, "감사 추적 화일을 초기화할 수 없습니다"
09946,0, "버퍼에 비해 화일 이름이 너무 깁니다"
09947,0, "연결 속성 구조에 메모리를 할당 할 수 없습니다"
09948,0, "프로세스 정보 레이블 조회에 실패했습니다"
09949,0, "클라이언트 운영 시스템 권한을 얻을 수 없습니다"
09950,0, "서버 운영 시스템 권한을 얻을 수 없습니다"
09951,0, "화일을 생성할 수 없습니다"
09952,0, "scgcmn: lk_open_convert의 예상치 못한 리턴: 열기 실패"
09953,0, "scggc: 잠금 변환중의 예상치 못한 리턴"
09954,0, "scgcc: 잠금 닫기 콜백에 대한 예기치 않은 리턴 상태"
09955,0, "scgcan:  잠금 취소시의 예기치 않은 리턴 상태"
09956,0, "scgcm:  예기치 않은 잠금 상태 조건"
09957,0, "IMON에게 종료 요구을 보낼 수 없습니다"
09958,0, "IMON: 같은 ORACLE pid를 가진 두개의 프로세스가 활동합니다"
09959,0, "IMON: 프로세스 삭제에 실패했습니다"
09960,0, "종료 신호를 위한 신호 처리기를 설치할 수 없습니다"
09961,0, "종료 신호 처리기를 재저장할 수 없습니다"
09962,0, "scggrc에 lk_group_create 오류가 있습니다"
09963,0, "scggra에 lk_group_attach 오류가 있습니다"
09964,0, "scggrd에 lk_group_detach 오류가 있습니다"
09965,0, "sfsfs: 부적당한 화일 크기"
09966,0, "sfsfs: 읽기/쓰기 모드로 화일을 열 수 없습니다"
09967,0, "sfsfs: 화일을 더 크게 할 수 없습니다"
09968,0, "sfsfs: 화일의 시작을 찾을 수 없습니다"
09969,0, "sfsfs, sfrfs: malloc 오류, 버퍼를 할당할 수 없습니다"
09970,0, "sfsfs: 읽기 오류, 헤더 블록을 읽을 수 없습니다"
09971,0, "sfsfs: 쓰기 오류, 헤더 블록에 쓸 수 없습니다"
09972,0, "sfsfs: 화일을 더 작게 할 수 없습니다"
09973,0, "sfsfs: 닫기 오류"
09974,0, "skxfidini: SDI 채널을 초기화 하는데 오류"
09975,0, "kxfspini: SDI 프로세스를 초기화 하는데 오류"
09976,0, "skxfqdini: 포트를 만드는데 오류"
09977,0, "skxfqhini: 연결 오류"
09978,0, "skxfqhdel: 다른 끝점에서 연결분리시 오류"
09979,0, "skxfqhsnd: 다른 끝점으로 메시지를 송신하는데 오류"
09980,0, "skxfqdrcv: 다른 끝점으로 메시지를 수신하는데 오류"
09981,0, "skxfqdreg: SDI 버퍼 폴에 페이지를 추가하는데 오류"
09982,0, "skxfqddrg: SDI 버퍼 폴로 부터 페이지를 삭제하는데 오류"
09983,0, "skxfidsht: SDI 채널을 기동 종료하는데 오류"
09984,0, "SGA 화일 $ORACLE_HOME/dbs/sgadef$ORACLE_SID. dbf가 존재하지 않습니다"
09985,0, "SGA 정의 화일을 읽을 수 없습니다"
09986,0, "SGA 정의 화일로 부터 잘못된 바이트의 수가 읽혔습니다"
09987,0, "READ-ONLY 모드에서 SGA로 첨부할 수 없습니다"
09988,0, "SGA을 분리하는데 오류"
09989,0, "부적당한 skgmsdef 구조 포인터를 사용할려고 시도합니다"
10000,0, "control file debug event, name 'control_file'"
10001,0, "control file crash event1"
10002,0, "control file crash event2"
10003,0, "control file crash event3"
10004,0, "control file crash event4"
10005,0, "trace latch operations for debugging"
10006,0, "testing - block recovery forced"
10007,0, "log switch debug crash after new log select, thread %s"
10008,0, "log switch debug crash after new log header write, thread %s"
10009,0, "log switch debug crash after old log header write, thread %s"
10010,0, "Begin Transaction"
10011,0, "End   Transaction"
10012,0, "Abort Transaction"
10013,0, "Instance Recovery"
10014,0, "Roll Back to Save Point"
10015,0, "Undo Segment Recovery"
10016,0, "Undo Segment extend"
10017,0, "Undo Segment Wrap"
10018,0, "Data Segment Create"
10019,0, "Data Segment Recovery"
10020,0, "partial link restored to linked list (KSG)"
10021,0, "latch cleanup for state objects (KSS)"
10022,0, "trace ktsgsp"
10023,0, "Create Save Undo Segment"
10024,0, "Write to Save Undo"
10025,0, "Extend Save Undo Segment"
10026,0, "Apply Save Undo"
10027,0, "latch cleanup for enqueue locks (KSQ)"
10028,0, "latch cleanup for enqueue resources (KSQ)"
10029,0, "session logon (KSU)"
10030,0, "session logoff (KSU)"
10031,0, "row source debug event (R*)"
10032,0, "sort end (SOR*)"
10033,0, "sort run (SRD*/SRS*)"
10035,0, "parse SQL statement (OPIPRS)"
10036,0, "create remote row source (QKANET)"
10037,0, "allocate remote row source (QKARWS)"
10038,0, "dump row source tree (QBADRV)"
10039,0, "type checking (OPITCA)"
10040,0, "dirty cache list"
10041,0, "dump undo records skipped"
10042,0, "trap error during undo application"
10043,0, "check consistency of owner/waiter/converter lists in KSQ"
10044,0, "free list undo operations"
10045,0, "free list update operations - ktsrsp, ktsunl"
10046,0, "enable SQL statement timing"
10047,0, "trace switching of sessions"
10048,0, "Undo segment shrink"
10049,0, "protect library cache memory heaps"
10050,0, "sniper trace"
10051,0, "trace OPI calls"
10052,0, "don't clean up obj$"
10053,0, "CBO Enable optimizer trace"
10054,0, "trace UNDO handling in MLS"
10055,0, "trace UNDO handing"
10056,0, "dump analyze stats (kdg)"
10057,0, "suppress file names in error messages"
10058,0, "use table scan cost in tab$. spare1"
10059,0, "simulate error in logfile create/clear"
10060,0, "CBO Enable predicate dump"
10061,0, "disable SMON from cleaning temp segment"
10062,0, "disable usage of OS Roles in osds"
10063,0, "disable usage of DBA and OPER privileges in osds"
10064,0, "thread enable debug crash level %s, thread %s"
10065,0, "limit library cache dump information for state object dump"
10066,0, "simulate failure to verify file"
10067,0, "force redo log checksum errors - block number"
10068,0, "force redo log checksum errors - file number"
10069,0, "Trusted Oracle 테스트 이벤트"
10070,0, "force datafile checksum errors - block number"
10071,0, "force datafile checksum errors - file number"
10072,0, "protect latch recovery memory"
10073,0, "have PMON dump info before latch cleanup"
10074,0, "default trace function mask for kst"
10075,0, "CBO Disable outer-join to regular join conversion"
10076,0, "CBO Enable cartesian product join costing"
10077,0, "CBO Disable view-merging optimization for outer-joins"
10078,0, "CBO Disable constant predicate elimination optimization"
10079,0, "SQL*Net을 거쳐 송신/수신된 데이터를 트래스합니다"
10080,0, "dump a block on a segment list which cannot be exchanged"
10081,0, "segment High Water Mark has been advanced"
10082,0, "free list head block is the same as the last block"
10083,0, "a brand new block has been requested from space management"
10084,0, "free list becomes empty"
10085,0, "free lists have been merged"
10086,0, "oby 소트에서 kko와 qka가 다르면 사용가능한 CBO에 오류가 생깁니다"
10087,0, "손상한 데이터 블록 매체를 회복할 수 없습니다"
10088,0, "CBO Disable new NOT IN optimization"
10089,0, "CBO Disable index sorting"
10090,0, "복구가 충돌하기 전에 다른 이벤트를 부릅니다"
10091,0, "CBO Disable constant predicate merging"
10092,0, "CBO Disable hash join"
10093,0, "CBO Enable force hash joins"
10094,0, "before resizing a data file"
10095,0, "dump debugger commands to trace file"
10096,0, "after the cross instance call when resizing a data file"
10097,0, "after generating redo when resizing a data file"
10098,0, "데이터 화일의 크기를 OS가 증가시킨 후에"
10099,0, "새로운 화일 크기로 화일 헤더가 수정 후에"
10100,0, "데이터 화일의 크기를 OS가 축소 후에"
10101,0, "atomic redo write recovery"
10102,0, "anti-joins을 스위치 오프합니다"
10103,0, "CBO가 해쉬 결합 교체를 사용불가합니다"
10104,0, "해쉬 결합 통계를 덤프한 것을 트래스 화일로 보냅니다"
10105,0, "CBO가 일정한 pred trans와 MPs w WHERE-절을 사용가능하게 합니다"
10106,0, "CBO가 NOT IN에 대한 나중에 서술한 상호관계을 구하는것을 사용할 수 없습니다"
10107,0, "CBO은 항상 비트맵 색인을 사용합니다"
10108,0, "CBO은 비트맵 색인을 사용하지 않습니다"
10109,0, "CBO가 부정 술어를 옮기는데 사용불가합니다"
10110,0, "CBO가 색인 행ID 범위 스캔을 시도합니다"
10111,0, "비트맵 색인 생성 스위치입니다"
10112,0, "비트맵 색인 생성 스위치입니다"
10113,0, "비트맵 색인 생성 스위치입니다"
10114,0, "비트맵 색인 생성 스위치입니다"
10115,0, "CBO 비트맵 최적화는 최고 표현을 사용했습니다"
10116,0, "CBO 비트맵 최적화 스위치입니다"
10117,0, "CBO가 새로운 병렬 비용 모형을 사용불가합니다 "
10118,0, "CBO가 해쉬 결합 비용을 사용가능하게 합니다 "
10145,0, "네트워크 오류를 감사하는 것을 테스트"
10146,0, "오라클 TRACE 수집을 사용가능하게 합니다"
10200,0, "block cleanout"
10201,0, "consistent read undo application"
10202,0, "consistent read block header"
10203,0, "consistent read buffer status"
10204,0, "signal recursive extend"
10205,0, "row cache debugging"
10206,0, "transaction table consistent read"
10207,0, "consistent read transactions' status report"
10208,0, "consistent read loop check"
10209,0, "enable simulated error on control file"
10210,0, "check data block integrity"
10211,0, "check index block integrity"
10212,0, "check cluster integrity"
10213,0, "crash after control file write"
10214,0, "simulate write errors on control file"
10215,0, "simulate read errors on control file"
10216,0, "dump control file header"
10217,0, "debug sequence numbers"
10218,0, "dump uba of applied undo"
10219,0, "monitor multi-pass row locking"
10220,0, "show updates to the transaction table"
10221,0, "show changes done with undo"
10222,0, "row cache"
10223,0, "transaction layer - turn on verification codes"
10224,0, "index block split/delete trace"
10225,0, "free/used extent row cache"
10226,0, "trace CR applications of undo for data operations"
10227,0, "verify (multi-piece) row structure"
10228,0, "trace application of redo by kcocbk"
10229,0, "simulate I/O error against datafiles"
10230,0, "check redo generation by copying before applying"
10231,0, "skip corrupted blocks on _table_scans_"
10232,0, "dump corrupted blocks symbolically when kcbgotten"
10233,0, "색인 작업에서 손상된 블록을 건너 뜁니다"
10234,0, "trigger event after calling kcrapc to do redo N times"
10235,0, "check memory manager internal structures"
10236,0, "library cache manager"
10237,0, "simulate ^C (for testing purposes)"
10238,0, "instantiation manager"
10239,0, "multi-instance library cache manager"
10240,0, "dump dba's of blocks that we wait for"
10241,0, "dump SQL generated for remote execution (OPIX)"
10242,0, "suppress OER 2063 (for testing distrib w/o different error log)"
10243,0, "simulated error for test %s of K2GTAB latch cleanup"
10244,0, "make tranids in error msgs print as 0. 0. 0 (for testing)"
10245,0, "simulate lock conflict error for testing PMON"
10246,0, "print trace of PMON actions to trace file"
10247,0, "Turn on scgcmn tracing.  (VMS ONLY)"
10248,0, "turn on tracing for dispatchers"
10249,0, "turn on tracing for multi-stated servers"
10250,0, "Trace all allocate and free calls to the topmost SGA heap"
10251,0, "check consistency of transaction table and undo block"
10252,0, "simulate write error to data file header"
10253,0, "simulate write error to redo log"
10254,0, "trace cross-instance calls"
10255,0, "pl/sql parse checking"
10256,0, "turn off multi-threaded server load balancing"
10257,0, "trace multi-threaded server load balancing"
10258,0, "force shared servers to be chosen round-robin"
10259,0, "get error message text from remote using explicit call"
10260,0, "Trace calls to SMPRSET (VMS ONLY)"
10261,0, "Limit the size of the PGA heap"
10262,0, "Don't check for memory leaks"
10263,0, "Don't free empty PGA heap extents"
10264,0, "Collect statistics on context area usage (x$ksmcx)"
10265,0, "Keep random system generated output out of error messages"
10266,0, "Trace OSD stack usage"
10267,0, "Inhibit KSEDMP for testing"
10268,0, "Don't do forward coalesce when deleting extents"
10269,0, "Don't do coalesces of free space in SMON"
10270,0, "Debug shared cursors"
10271,0, "distributed transaction after COLLECT"
10272,0, "distributed transaction before PREPARE"
10273,0, "distributed transaction after PREPARE"
10274,0, "distributed transaction before COMMIT"
10275,0, "distributed transaction after COMMIT"
10276,0, "distributed transaction before FORGET"
10277,0, "이벤트가 커서를 공유하는지(안하는지)에 관련이 있습니다 (테스트에 사용되었습니다)"
10281,0, "maximum time to wait for process creation"
10282,0, "Inhibit signalling of other backgrounds when one dies"
10286,0, "Simulate control file open error"
10287,0, "Simulate archiver error"
10288,0, "Do not check block type in ktrget"
10289,0, "Do block dumps to trace file in hex rather than fromatted"
10290,0, "kdnchk - checkvalid event - not for general purpose use. "
10291,0, "die in dtsdrv to test controlfile undo"
10292,0, "dump uet entries on a 1561 from dtsdrv"
10293,0, "dump debugging information when doing block recovery"
10294,0, "사용가능한 PERSISTENT DLM 작업이 non-compliant 시스템에 있습니다"
10300,0, "disable undo compatibility check at database open"
10301,0, "Enable LCK timeout table consistency check"
10320,0, "Enable data layer (kdtgrs) tracing of space management calls"
10352,0, "직접 패스 통계를 보고합니다"
10353,0, "슬롯의 수"
10354,0, "병렬 질의를 위해 직접 읽기 패스를 사용가능하게 합니다"
10355,0, "스캔을 위해 직접 읽기 패스를 사용가능하게 합니다"
10356,0, "직접 읽기를 위해 힌트 사용법을 사용가능하게 합니다"
10357,0, "직접 패스를 위해 디버그 정보를 사용가능하게 합니다"
10374,0, "병렬 질의 서버가 인터럽트 (잠금 값을 확인합니다)"
10375,0, "감아 올린 통계를 위해 검색을 사용가능하게 합니다"
10376,0, "큐 통계 테이블을 사용가능하게 합니다"
10377,0, "turn off load balancing"
10378,0, "force hard process/range affinity"
10379,0, "direct read for rowid range scans (unimplemented)"
10380,0, "kxfp latch cleanup testing event"
10381,0, "kxfp latch cleanup testing event"
10382,0, "parallel query server interrupt (reset)"
10383,0, "auto parallelization testing event"
10384,0, "parallel dataflow scheduler tracing"
10385,0, "parallel table scan range sampling method"
10386,0, "parallel SQL hash and range statistics"
10387,0, "parallel query server interrupt (normal)"
10388,0, "parallel query server interrupt (failure)"
10389,0, "parallel query server interrupt (cleanup)"
10390,0, "Trace parallel query slave execution"
10391,0, "trace rowid range partitioning"
10392,0, "parallel query debugging bits"
10393,0, "print parallel query statistics"
10394,0, "allow parallelization of small tables"
10395,0, "adjust sample size for range table queues"
10396,0, "circumvent range table queues for queries"
10397,0, "suppress verbose parallel coordinator error reporting"
10398,0, "enable timeouts in parallel query threads"
10399,0, "use different internal maximum buffer size"
10400,0, "turn on system state dumps for shutdown debugging"
10500,0, "turn on traces for SMON"
10510,0, "turn off SMON check to offline pending offline rollback segment"
10511,0, "turn off SMON check to cleanup undo dictionary"
10512,0, "turn off SMON check to shrink rollback segments"
10550,0, "signal error during create as select/create index after n rows"
10600,0, "check cursor frame allocation"
10602,0, "cause an access violation (for testing purposes)"
10603,0, "cause an error to occur during truncate (for testing purposes)"
10604,0, "trace parallel create index"
10605,0, "enable parallel create index by default"
10606,0, "trace parallel create index"
10607,0, "색인 행ID 파티션 스캔을 트래스 합니다"
10608,0, "트래스가 비트맵 색인을 만듭니다"
10610,0, "트래스가 색인 pseudo 최적화를 만듭니다"
10666,0, "Do not get database enqueue name"
10667,0, "Cause sppst to check for valid process ids"
10690,0, "Set shadow process core file dump type (Unix only)"
10691,0, "Set background process core file type (Unix only)"
10700,0, "Alter access violation exception handler"
10701,0, "Dump direct loader index keys"
10702,0, "Enable histogram data generation"
10703,0, "Simulate process death during enqueue get"
10704,0, "Print out information about what enqueues are being obtained"
10705,0, "Print Out Tracing information for every I/O done by ODSs"
10706,0, "인스턴스 잠금 조작에 관한 정보를 프린트합니다"
10707,0, "인스턴스 등록을 위한 모의 프로세스를 죽입니다"
10708,0, "skxf 다중 인스턴스 명령어에 대한 트래스 정보를 프린트 합니다"
10709,0, "디폴트로 색인을 작성한 것에 병렬 인스턴스를 사용가능하게 합니다"
10710,0, "비트맵 색인 액세스를 트래스"
10711,0, "비트맵 색인 액세스를 트래스"
10712,0, "비트맵 색인 액세스를 트래스"
10713,0, "비트맵 색인 액세스를 트래스"
10714,0, "비트맵 색인 마이너스를 트래스"
10715,0, "행ID로 비트맵 색인을 변환하는것을 트래스"
10716,0, "비트맵 색인 압축/압축제거를 트래스"
10800,0, "disable Smart Disk scan"
10801,0, "enable Smart Disk trace"
10802,0, "reserved for Smart Disk"
10803,0, "write timing statistics on OPS recovery scan"
10804,0, "ksxb을 위해 비축해 놓은 것입니다"
10805,0, "행 소스 정렬을 위해 비축해 놓은 것입니다"
10900,0, "관리자 범위는 삽입 이벤트 번호 %s에 결점이 있습니다"
10924,0, "들어오기 저장을 구문분석 할때 이벤트 무시에 오류가 있습니다"
10925,0, "이름 켄텍스트를 끊임없이 트래스합니다"
10926,0, "이름 켄텍스트를 끊임없이 트래스합니다"
10927,0, "이름 켄텍스트를 끊임없이 트래스합니다"
10928,0, "이름 켄텍스트를 끊임없이 트래스합니다"
10999,0, "do not get database enqueue name"
12000,0, "스냅샷 로그가 테이블 '%s'에 이미 존재합니다"
12001,0, "로그를 생성할 수 없습니다 테이블 '%s'가 이미 트리거를 갖고 있습니다. "
12002,0, "table '%s'에 스냅샷 로그가 없습니다"
12003,0, "스냅샷 '%s'가 존재하지 않습니다"
12004,0, "REFRESH FAST가 사용될 수 없습니다"
12005,0, "자동 refresh를 과거 시간에 대하여 행할 수 없습니다"
12006,0, "같은 사용자 이름을 갖는 스냅샷이 이미 존재합니다"
12007,0, "스냅샷 재 사용 파라미터들이 일치하지 않습니다"
12008,0, "스냅샷 refresh 패스에 오류가 있습니다"
12009,0, "스냅샷들은 긴 열들을 포함하지 않습니다"
12010,0, "SYS 소유의 테이블에 대해서는 스냅샷 로그를 만들수 없습니다"
12011,0, "작업 %s의 실행에 실패"
12012,0, "작업 %s의 자동 실행중 오류 발생"
12013,0, "갱신 가능한 스냅샷을 충분히 빨리 재그리기를 할 수 있게 간단해야 합니다"
12150,0, "TNS:데이타베이스를 보낼 수 없습니다"
12151,0, "TNS:네트워크 층으로부터 받은 패킷 유형이 틀립니다"
12152,0, "TNS:break 메시지를 보낼 수 없습니다"
12153,0, "TNS:연결되지 않았습니다"
12154,0, "TNS:서비스명를 해석할 수 없습니다"
12155,0, "TNS:NSWMARKER 패킷에 틀린 데이타형을 받았습니다"
12156,0, "TNS:잘못된 상태로 부터 줄을 재 설정하기 위해 시도 했습니다"
12157,0, "TNS:내부 네트워크 통신 오류"
12158,0, "TNS:파라미터 부시스템을 초기화할 수 없습니다"
12159,0, "TNS:추적 화일은 쓸수 없습니다"
12160,0, "TNS:내부오류: 잘못된 오류번호"
12161,0, "TNS:내부오류: 부분적인 데이타를 받았습니다"
12162,0, "TNS:서비스명이 잘못 지정되었습니다"
12163,0, "TNS:연결 기술어가 너무 깁니다"
12196,0, "TNS:TNS로 부터 오류를 받았습니다"
12197,0, "TNS:키워드-값을 분석하는데 오류가 생겼습니다"
12198,0, "TNS:수신으로의 패스를 찾을 수 없습니다"
12200,0, "TNS:메모리를 할당할 수 없습니다"
12201,0, "TNS:연결 버퍼가 너무 작습니다"
12202,0, "TNS:내부 네비게이션 오류"
12203,0, "TNS:수신에 연결할 수 없습니다"
12204,0, "TNS:어플리케이션으로 부터 거절된 데이타를 받았습니다"
12205,0, "TNS:실패한 주소를 받을 수 없습니다"
12206,0, "TNS:TNS 오류를 받았습니다"
12207,0, "TNS:네비게이션을 계속할 수 없습니다"
12208,0, "TNS:TNSNAV. ORA 화일을 발견할 수 없습니다"
12209,0, "TNS:초기화 되지않은 글로벌 변수 입니다"
12210,0, "TNS:네비게이터 데이타를 찾을때 오류가 발생합니다"
12211,0, "TNS:TNSNAV. ORA에 PREFERRED_CMANAGERS 엔트리가 필요함"
12212,0, "TNS:TNSNAV. ORA에  PREFERRED_CMANAGER 바인딩이 불완전합니다"
12213,0, "TNS:TNSNAV. ORA에 PREFERRED_CMANAGERS 바인딩이 불완전 합니다"
12214,0, "TNS:TNSNAV. ORA에  LOCAL_COMMUNITIES 엔트리가 빠졌습니다"
12215,0, "TNS:TNSNAV. ORA에 있는 PREFERRED_NAVIGATORS 주소가 잘못되었습니다"
12216,0, "TNS:TNSNAV. ORA에 있는 PREFERRED_CMANAGER 주소가 잘못되었습니다"
12217,0, "TNS:TNSNAV. ORA내에 PREFERRED_CMANAGERS를 접촉할 수 없습니다"
12218,0, "TNS:받아드리지 않는 네트워크 구성 데이타"
12219,0, "TNS:ADDRESS_LIST에서 공유명이 주소에서 빠졌습니다"
12221,0, "TNS:부적합한 ADDRESS 파라미터"
12222,0, "TNS:그런 포로토콜 어댑터가 없습니다"
12223,0, "TNS:내부 한계 한정이 초과"
12224,0, "TNS:리스너가 없음"
12225,0, "TNS:수신 호스트에 도달할 수 없습니다"
12226,0, "TNS:운영 시스템 자원 할당이 초과되었습니다"
12227,0, "TNS:구문 오류"
12228,0, "TNS:포로토콜 어댑터가 로드될 수 없습니다"
12229,0, "TNS:Interchange는 더이상 여유있은 연결을 가지고 있지 않습니다"
12230,0, "TNS:이 연결을 만드는데 Sever Network 오류가 발생했습니다"
12315,0, "ALTER DATABASE 문장을 위한 데이타베이스 링크형이 부적합합니다"
12316,0, "데이타베이스 링크의 연결 스트링에 구문오류가 있습니다"
12317,0, "데이타베이스(링크명 %s)로의 로그온이 거절되었습니다"
12318,0, "데이타베이스(링크명 %s)가 이미 마운트되었습니다"
12319,0, "데이타베이스(링크명 %s)가 이미 개방되었습니다"
12321,0, "데이타베이스(링크명 %s)가 열지 않았으며 AUTO_MOUNTING=FALSE입니다"
12322,0, "데이타베이스(링크명 %s)를 마운트할 수 없습니다"
12323,0, "데이타베이스(링크명 %s)를 열 수 없습니다"
12324,0, "ROM을 사용할 수 없습니다: 사적소유의 데이타베이스 링크형이기 때문에 입니다. "
12326,0, "데이타베이스 %s가 즉시 닫기를 수행 중: 어떤 작업도 허가되지 않습니다"
12329,0, "데이타베이스 %s가 닫혔음; 어떤 작업도 허가되지 않습니다"
12333,0, "데이타베이스 %s가 마운트되지 않았습니다"
12334,0, "데이타베이스(링크명 %s)가 아직 열려 있습니다"
12335,0, "데이타베이스(링크명 %s)가 열지 않았습니다"
12336,0, "데이타베이스에 로그인할 수 없습니다 (링크명 %s) "
12341,0, "마운트할 수 있는 최대 수가 초과했습니다"
12342,0, "마운트 열기가 OPEN_MOUNTS 파라미터에 지정한 한계치를 초과했습니다"
12345,0, "사용자 %s는 데이타베이스 링크(%s)에 필요한 CREATE SESSION 권한이 없습니다"
12350,0, "삭제될 데이타베이스 링크가 아직도 마운트되었습니다"
12351,0, "원격 개체 참조를 이용하는 원격 개체가 뷰를 만들 수 없습니다"
12352,0, "%s. %s@%s 는 부적절합니다"
12353,0, "2번째 저장된 개체는 원격 개체를 참조할수 없습니다"
12354,0, "DROP될 2번째 개체"
12400,0, "DBLOW는 유효한 운영 시스템 레이블이 아닙니다"
12401,0, "DBHIGH는 유효한 운영 시스템 레이블이 아닙니다"
12402,0, "화일: %s"
12403,0, "화일 레이블이 DB_HIGH(%s)와 동일해야 합니다(%s)"
12404,0, "디바이스 low (%s)는 DBLOW (%s)에 의해 통제됩니다"
12405,0, "디바이스 high (%s)는 DBHIGH (%s)를 통제합니다"
12406,0, "화일들을 테이블스페이스에 추가하기 위해서는 OS내에 DBHIGH (%s)에 있어야 합니다"
12407,0, "뷰의 ROWLABEL 열에 삽입하거나 수정할 수 없습니다"
12408,0, "이전에 존재했던 테이블스페이스가 다른 레이블(%s)에 있습니다"
12409,0, "DBLOW는 DBMS MAC 모드에서 널값을 가질 수 없습니다"
12410,0, "DBHIGH는 DBMS MAC 모드에서 널값을 가질 수 없습니다"
12411,0, "DBHIGH는 DBLOW를 통제합니다"
12412,0, "DBLOW는 %s에 의해 통제됩니다"
12413,0, "DBHIGH는 %s에 의해 통제됩니다"
12414,0, "데이타베이스를 기동시키기 위해서는 DBHIGH (%s) 이어야 합니다"
12415,0, "세션 레이블은 롤 '%s'의 레이블 생성을 통제해야만 합니다"
12416,0, "감사 레이블은 사용자를 통제합니다"
12418,0, "색인 레이블은 테이블과 동일해야 합니다"
12419,0, "열의 레이블은 테이블과 동일해야 합니다"
12420,0, "저장된 개체의 레이블은 참조된 객체 %s를 통제해야 합니다"
12421,0, "허가 권한의 레이블은 개체를 통제해야 합니다"
12422,0, "허가 권한의 레이블은 허가받는 %s를 통제해야 합니다"
12423,0, "제약조건 레이블은 테이블과 같아야 합니다"
12424,0, "개체의 레이블은 테이블 영역을 통제해야 합니다"
12425,0, "테이블의 레이블은 클러스터를 통제해야 합니다"
12426,0, "사용자의 레이블은 디폴트 또는 임시의 테이블 영역을 통제 해야만 합니다"
12427,0, "개체의 레이블은 스키마를 통제해야만 합니다"
12428,0, "불 충분한 MAC 권한"
12429,0, "주석 레이블은 테이블 또는 뷰와 동일 해야 합니다"
12430,0, "트리거의 레이블은 테이블과 동일해야 합니다"
12431,0, "사용자의 레이블은 디폴트 프로화일을 통치해야 합니다"
12432,0, "권한부여의 레벨은 프로시저의 레벨과 같아야 합니다"
12433,0, "디폴트 롤 %s의 레이블은 사용자를 통치해야 합니다"
12434,0, "자식 레코드의 레이블은 부모를 통치 해야만 합니다"
12435,0, "패키지 본체의 레이블은 패키지와 같아야만 합니다"
12436,0, "패키지 몸체는 MAC 권한을 허가하기 위해서 존재해야 합니다"
12437,0, "더낮은 레이블에서 데이타베이스에 기록할 수 없습니다"
12438,0, "모든 행들에서 제약조건을 검증하기 위한 권한이 불충분합니다"
12439,0, "ROWLABEL 열을 수정할 수 없습니다"
12440,0, "데이타베이스는 읽기-호환 모드로 마운트되지 않습니다"
12441,0, "허가는 이미 다른 레이블에서 존재합니다"
12442,0, "디폴트 롤을 수정하기 위해서는 사용자와 같은 레이블에 있어야만 합니다"
12443,0, "다른 레벨에 감사 옵션이 이미 존재합니다"
12444,0, "화일 레이블은 인스턴스 레이블보다 낮습니다"
12445,0, "색인와 행의 레이블이 틀립니다- 추적 화일 참조"
12446,0, "화일 레이블이 인스턴스 레이블보다 상위에 있습니다"
12447,0, "안전성 없는 프로토콜이 사용되어 연결이 거부 되었습니다"
12448,0, "최고 보다 낮은 범위가 부적합한 운영 시스템 레이블이 되었습니다"
12449,0, "최하 보다 높은 범위가 부적합한 운영 시스템 레이블이 되었습니다"
12450,0, "레이블 스트링은 이진 레이블로 변환될 수 없습니다"
12451,0, "이진 OS 레이블은 스트링 레이블로 변환될 수 없습니다"
12452,0, "레이블 형식 스트링은 해석될 수 없습니다 형식 코드를 검사하십시오"
12453,0, "문자 스트링에 인용부호가 누락됐습니다"
12454,0, "제공된 구두점은 명시된 입력 형식과 일치하지 않습니다"
12455,0, "OS 형식은 이 문맥에서 사용될 수 없습니다"
12456,0, "제공된 문자스트링은 지정된 입력 형식과 일치하지 않습니다"
12457,0, "MLSLABEL 바인드 변수에 대한 길이가 잘못됐습니다"
12458,0, "입력 스트링이 이진 레이블로 변환될 수 없습니다"
12459,0, "Trusted Oracle의 테이블에 대한 최대 열수는 253 입니다"
12460,0, "MLS_LABEL_FORMAT 파라미터에 대한 값 %s가 부당합니다"
12461,0, "부적합한 이진 레이블"
12470,0, "프로세스 레이블이 발견될 수 없습니다"
12475,0, "DBLOW (%s) 아래로 로그인 할 수 없습니다"
12476,0, "DBHIGH (%s) 위로 로그인 할 수 없습니다"
12477,0, "DBLOW (%s) 아래로 MLSLABLE을 생성할 수 없습니다"
12478,0, "DBHIGH (%s) 위로 MLSLABLE을 생성할 수 없습니다"
12480,0, "두번째 데이타베이스가 OS MAC와 DBMS MAC 모드 사이에서 변하고 있습니다"
12485,0, "%s에 대한 화일 레이블을 발견할 수 없습니다"
12487,0, "DBHIGH 또는 DBLOW에로의 레이블을 설정하기 위한 권한이 불충분 합니다"
12488,0, "세션 레이블이 %s와 같아야 합니다"
12489,0, "세션을 수정하기 위한 MAC 권한이 불충분 합니다"
12490,0, "사용자 정의(%s) 아래의 세션 레이블에 연결할 수 없습니다"
12491,0, "READ_COMPATIBLE 모드로 마운트할 경우 MAC 모드로 변경할 수 없습니다"
12494,0, "DBLOW 위로 레이블된 두번째 데이타베이스를 마운트할 수 없습니다"
12495,0, "Trusted Oracle은 멀티-쓰레드 서버로 사용할 수 없습니다"
12500,0, "TNS:리스너가 전용 서버 프로세스를 시작하는데 실패했습니다"
12501,0, "TNS:리스너가 프로세스를 생성하는데 실패했습니다"
12502,0, "TNS:리스너가 클라이언트로 부터 CONNECT_DATA을 받지 못했습니다"
12504,0, "TNS:리스너가 CONNECT_DATA 의 SID 를 받지 못했습니다"
12505,0, "TNS:리스너가 연결 설명자로 부터 받은 SID 를 분석할 수 없습니다"
12506,0, "TNS:리스너가 CONNECT_DATA 의 별칭을 받지 못했습니다"
12507,0, "TNS:리스너가 받은 별칭을 분석하지 못했습니다"
12508,0, "TNS:리스너가 받은 명령을 분석하지 못했습니다"
12509,0, "TNS:리스너가 클라이언트를 서비스 핸들러로 리다이렉트 하는데 실패했습니다"
12510,0, "TNS:데이타베이스가 이 SID 의 요구를 핸들하는 데 필요한 자원이 부족합니다"
12511,0, "TNS:서비스 핸들러가 발견되었지만 연결을 허용할 수 없습니다"
12512,0, "TNS:서비스 핸들러가 발견되었지만 리다이렉트 주소에 등록되어 있지 않습니다"
12513,0, "TNS:서비스 핸들러가 발견되었지만 다른 프로토콜이 등록되어 있습니다"
12531,0, "TNS:메모리를 할당할 수 없습니다"
12532,0, "TNS:사용할 수 없는 인수입니다"
12533,0, "TNS:사용할 수 없는 ADDRESS 파라미터입니다"
12534,0, "TNS:지원되지 않는 작동입니다"
12535,0, "TNS:작동이 중단중입니다"
12536,0, "TNS:작동이 블럭 되었습니다"
12537,0, "TNS:연결이 종료되었습니다"
12538,0, "TNS:그런 프로토콜 어댑터는 없습니다"
12539,0, "TNS:버퍼가 어버플로워 혹은 언더플로워되었습니다"
12540,0, "TNS:내부 한계 제한을 넘어섰습니다"
12541,0, "TNS:리스너가 아닙니다"
12542,0, "TNS:이미 사용중인 주소입니다"
12543,0, "TNS:수신지 호스트에 도달할 수 없습니다"
12544,0, "TNS:문맥에 다른 wait/test 함수가 있습니다"
12545,0, "대상 호스트 또는 개체가 존재하지 않아 연결에 실패했습니다"
12546,0, "TNS:허용이 거부되었습니다"
12547,0, "TNS:연결이 끊어졌습니다"
12548,0, "TNS:읽기나 쓰기가 완전치 못합니다"
12549,0, "TNS:OS 자원 분배를 넘었습니다"
12550,0, "TNS:구문 오류"
12551,0, "TNS:키워드가 필요합니다"
12552,0, "TNS:작동이 인터럽트되었습니다"
12555,0, "TNS:허용이 거부되었습니다"
12556,0, "TNS:콜러가 아닙니다"
12557,0, "TNS:프로토콜 어댑터를 로드할 수 없습니다"
12560,0, "TNS:프로토콜 어댑터 오류"
12561,0, "TNS:알 수 없는 오류"
12562,0, "TNS:잘못된 글로벌 핸들"
12564,0, "TNS:연결이 거부되었습니다"
12566,0, "TNS:프로토콜 오류"
12569,0, "TNS:패킷 체크섬 실패"
12570,0, "TNS:패킷 리더 실패"
12571,0, "TNS:패킷 라이터 실패"
12574,0, "TNS:리다리렉션이 무시되었습니다"
12582,0, "TNS:쓸모없는 작동"
12583,0, "TNS:리더가 아닙니다"
12585,0, "TNS:데이타 뒷부분이 짤렸습니다"
12589,0, "TNS:연결을 보내지 못합니다"
12590,0, "TNS:I/O 버퍼가 아닙니다"
12591,0, "TNS:이벤트 신호 실패"
12592,0, "TNS:손상된 패킷"
12593,0, "TNS:등록된 연결이 아닙니다"
12595,0, "TNS:확인되지 않았습니다"
12596,0, "TNS:내부가 일치되지 않았습니다"
12597,0, "TNS:연결 설명자는 이미 사용중입니다"
12598,0, "배너 등록 실패"
12599,0, "TNS:크립토그라픽 체크섬이 일치하지 않습니다"
12616,0, "TNS:이벤트 신호가 아닙니다"
12618,0, "TNS:호환되는 버전이 아닙니다"
12619,0, "TNS:요구된 서비스를 승락할 수 없습니다"
12620,0, "TNS:가능하지 않은 특성을 요구했습니다"
12622,0, "TNS:이벤트 인식이 동일하지 않습니다"
12623,0, "TNS:이 상태에서는 작동이 적절하지 않습니다"
12624,0, "TNS:연결이 이미 등록되어있습니다"
12625,0, "TNS:인수가 필요합니다"
12626,0, "TNS:틀린 이벤트 유형"
12628,0, "TNS:이벤트 콜백이 아닙니다"
12629,0, "TNS:이벤트 테스트가 아닙니다"
12630,0, "TNS:원시 서비스 작업이 지원되지 않습니다"
12631,0, "TNS:이름 검색에 실패"
12632,0, "TNS:롤 인출에 실패"
12633,0, "TNS:공유되는 인증 서비스가 없습니다"
12634,0, "TNS:메모리 할당에 실패했습니다"
12635,0, "TNS:사용가능한 인증 어댑터가 없습니다"
12636,0, "TNS:패킷 송신에 실패했습니다"
12637,0, "TNS:패킷 수신에 실패했습니다"
12638,0, "TNS:신용 검색에 실패했습니다"
12639,0, "TNS:인증 서비스 니고시에이션에 실패했습니다"
12640,0, "TNS:인증 서비스 초기화에 실패했습니다"
12641,0, "TNS:인증 서비스가 초기화하는데 실패했습니다"
12642,0, "TNS:세션 키가 없습니다"
12643,0, "TNS:통신 프로세스가 실패했습니다"
12644,0, "TNS:인증 서비스 초기화에 실패했습니다"
12645,0, "TNS:파라미터가 존재하지 않습니다"
12646,0, "TNS:부울 파라미터에 부적당한 값이 지정되었습니다"
12647,0, "TNS:인증이 필요합니다"
12648,0, "TNS:암호화 또는 데이타 무결성 알고리즘 리스트가 비어 있습니다"
12649,0, "TNS:알 수 없는 암호화 또는 데이타 무결성 알고리즘입니다"
12650,0, "TNS:공통의 암호화 또는 데이타 무결성 알고리즘이 없습니다"
12651,0, "TNS:암호화 또는 데이타 무결성 알고리즘을 승인할 수 없습니다"
12652,0, "TNS:스트링이 잘렸습니다"
12653,0, "TNS:인증 제어 함수가 실패했습니다"
12654,0, "TNS:인증 변환에 실패했습니다"
12655,0, "TNS:암호 검색에 실패했습니다"
12656,0, "TNS:암호 체크섬이 일치하지 않습니다"
12657,0, "TNS:설치된 알고리즘이 없습니다"
12658,0, "TNS:원시 서비스가 필요하지만 TNS 버전이 호환되지 않습니다"
12659,0, "TNS:다른 프로세스로부터 받은 오류"
12699,0, "TNS:원시 서비스 내부 오류"
12700,0, "잘못된 NLS 파라미터 값 (%s)입니다"
12701,0, "알 수 없는 CREATE DATABASE 문자 세트"
12702,0, "부적절한 NLS 파라미터 스트링이 SQL함수에서 사용되었습니다"
12703,0, "이 문자세트 변환은 제공되지 않습니다"
12705,0, "부적당하거나 알려지지 않은 NLS 파라미터가 명시되었습니다"
12706,0, "CREATE DATABASE 문자세트가 허용되지 않습니다"
12707,0, "데이타베이스의 생성시 NLS 파라미터 %s를 획득하는데 오류가 발생했습니다"
12708,0, "데이타베이스의 생성시 NLS 파라미터 %s를 로드하는데 오류가 발생했습니다"
12709,0, "데이타베이스의 생성시 문자 세트를 로드하는데 오류가 발생했습니다"
12800,0, "시스템이 너무 바빠 병렬 질의 수행이 어려울 것 갑습니다"
12801,0, "병렬 질의 서버 %s에 오류신호가 발생했습니다"
12802,0, "파라미터 질의 서버가 연락 담당자와 접촉이 끊겼습니다"
12803,0, "파라미터 질의 서버가 다른 서버와 접촉이 끊겼습니다"
12804,0, "병렬 질의 서버가 죽는것 처럼 나타났습니다"
12805,0, "병렬 질의 서버가 예상치 않게 죽었습니다"
12806,0, "엔큐를 멈취기위해 백그라운드 프로세스를 찾을 수 없습니다"
12807,0, "병렬 질의 메시지를 프로세스 큐가 받을수 없습니다"
12808,0, "%s_INSTANCES를 인스턴스의 수 %s보다 크게 설정할 수 없습니다"
12809,0, "배타 모드로 마운트 되어지면 %s_INSTANCES 설정을 할 수 없습니다"
12810,0, "PARALLEL_MAX_SERVERS는 %s보다 적거나 동일해야 합니다"
12811,0, "PARALLEL_MIN_SERVERS는 PARALLEL_MAX_SERVERS 보다 적거나 똑같아야 합니다 %s"
12812,0, "하나만의 PARALLEL 또는 NOPARALLEL 절이 지정되어야 합니다"
12813,0, "PARALLEL 또는 DEGREE에 대한 값이 0 보다 커야합니다"
12814,0, "하나만의 CACHE 또는 NOCACHE 절이 지정되어야 합니다"
12815,0, "INSTANCES에 대한 값이 0 보다 커야합니다"
12816,0, "병렬은 속성 경로 운영 색인을 만들었습니다"
12817,0, "병렬 질의 옵션이 사용 가능해야 합니다"
12818,0, "PARALLEL 절에 잘못된 옵션"
12819,0, "PARALLEL 절에 옵션이 빠졌습니다"
12820,0, "DEGREE에 대한 값이 잘못되었습니다"
12821,0, "INSTANCES에 대한 값이 잘못되었습니다"
12822,0, "PARALLEL 절에 중복된 옵션"
12823,0, "병행성의 기본 정도가 여기에 지정되지 않았을 것입니다"
12824,0, "INSTANCES DEFAULT가 여기에 지정되지 않았을 것입니다"
12825,0, "여기에 명확한 병행성의 정도가 지정되어야 합니다"
12826,0, "동작을 멈춘 병렬 질의 서버가 제거되었습니다"
12827,0, "사용할 수 있는 병렬 질의 종속이 충분하지 않습니다"
13000,0, "차원 수가 범위를 넘었습니다"
13001,0, "디멘숀에 일치하지 않은 오류"
13002,0, "지정된 레벨이 범위를 넘었습니다"
13003,0, "디멘숀에 대한 지정된 범위가 부적당합니다"
13004,0, "지정된 버퍼 크기는 부적당합니다"
13005,0, "순환 HHCODE 함수 오류"
13006,0, "지정된 셀 수가 부적당합니다"
13007,0, "부적당한 HEX 문자가 발견되었습니다"
13008,0, "지정된 데이터 포맷이 부적당한 구성요소를 가지고 있습니다"
13009,0, "지정된 데이터 스트링이 부적당합니다"
13010,0, "부적당한 인수의 수가 지정되었습니다"
13011,0, "값이 범위를 넘었습니다"
13012,0, "부적당한 윈도우 형태가 지정되었습니다"
13013,0, "지정된 위상이 INTERIOR 또는 BOUNDARY가 아닙니다"
13014,0, "위상 식별자가 1 에서 8 로 지정된 범위 밖으로 지정했습니다"
13015,0, "윈도우 정의가 적당하지 않습니다"
13016,0, "잘못된 파티션 정의"
13017,0, "알 수 없는 라인 파티션 외형입니다"
13018,0, "잘못된 거리 형태"
13100,0, "요청한 프래임이 잘못된 폼으로 되어 있습니다"
13101,0, "파티션 이름 데이터형태는 varchar2 이어야 합니다"
13102,0, "회답 파이프 이름 데이터형태는 varchar2 이어야 합니다"
13103,0, "시간초과로 파이프 %s에서 인식하는데 실패했습니다"
13104,0, "시간초과로 파이프 %s에 회신을 송신하는데 실패했습니다"
13105,0, "파이프 %s에 버퍼가 오버플로우 되었습니다"
13106,0, "파이프 %s에 긍정 응답하는 것이 인터럽트되었습니다"
13107,0, "파이프 %s에 회신하는 것이 인터럽트되었습니다"
13108,0, "공간 테이블 %s을 찾을 수 없습니다"
13109,0, "공간 테이블 %s가 존재합니다"
13110,0, "공간 테이블 %s이 파티션되지 않았습니다"
13111,0, "공간 테이블 %s 에 정의된 파티션 키가 없습니다"
13112,0, "카운트 모드 %s 가 부적당합니다"
13113,0, "오라클 테이블 %s 은 존재하지 않습니다"
13114,0, "테이블스페이스 %s 을 찾을 수 없습니다"
13115,0, "테이블스페이스 %s 은 이미 할당된 것입니다"
13116,0, "테이블스페이스 %s 은 테이블 %s에 할당되지 않았습니다"
13117,0, "파티션 %s 은 찾을 수 없습니다"
13118,0, "파티션 %s 은 오프라인입니다"
13119,0, "소스와 대상 테이블스페이스들은 동일한 것입니다"
13120,0, "SD*POD 은 파이프 %s에 리스닝하지 않습니다"
13121,0, "자식 파티션을 작성하는데 실패했습니다"
13122,0, "자식 파티션 %s을 찾을 수 없습니다"
13123,0, "열 %s 은 이미 정의되었습니다"
13124,0, "열 %s에 대한 열 ID를 결정할 수 없습니다"
13125,0, "파티션 키가 이미 설정되었습니다"
13126,0, "공간 테이블 %s 에 대한 클래스를 결정할 수 없습니다"
13127,0, "대상 파티션을 생성하는데 실패했습니다"
13128,0, "열 %s 에 대한 디멘션을 확인하는데 실패했습니다"
13129,0, "HHCODE 열 %s 이 없습니다"
13130,0, "%s에서 회신이 오기를 기다리는데 시간초과되었습니다"
13131,0, "파이프 %s에 있는 레코드가 너무 큽니다"
13132,0, "%s에서 읽은 파이프가 인터럽트되었습니다"
13133,0, "아카이브 요청이 실패되었습니다"
13134,0, "요청을 복구하는데 실패되었습니다"
13135,0, "오프라인 패스가 중복되었습니다"
13136,0, "널 공통 코그가 생성되었습니다"
13138,0, "개체 %s의 이름을 결정할 수 없습니다"
13139,0, "%s에 대한 열 정의를 얻을 수 없습니다"
13140,0, "부적당한 대상 형태"
13141,0, "부적당한 RANGE 윈도우 정의"
13142,0, "부적당한 PROXIMITY 윈도우 정의"
13143,0, "부적당한 POLYGON 윈도우 정의"
13144,0, "대상 테이블 %s 이 없습니다"
13145,0, "범위 목록을 생성하는데 실패했습니다"
13146,0, "변수 %s을 대체할 테이블을 찾을 수 없습니다"
13147,0, "MBR을 생성하는데 실패했습니다"
13148,0, "SQL 필터를 생성하는데 실패했습니다"
13149,0, "공간 테이블 %s을 위한 다음 시퀀스 번호를 생성하는데 실패했습니다"
13150,0, "예외 레코드를 삽입하는데 실패했습니다"
13152,0, "부적당한 HHCODE 형태"
13197,0, "MDSYS만이 %s 을 수행할 수 있습니다"
13198,0, "오라클 오류 ORA%s 가 있습니다"
19999,0, "skip_row 프로시저가 불리워졌습니다"
20000,0, "%s"
21000,0, "raise_application_error의 %s%s에 대한 수치인수가 범위를 벗어났음, -20000과 -20999 사이에 있어야만 합니다"
23300,0, "%s"
23301,0, "지연 rcp 수신 모드들이 혼용되었습니다"
23302,0, "지연 RPC 동안에 어플리케이션에서 통신 실패가 발생했습니다"
23303,0, "지연 RPC 동안에 어플리케이션에서 일반적인 예외가 일어났습니다"
23304,0, "인수 %s(%s 의, 호출 %s, tid %s)의 지연 rpc가 잘못 만들어졌습니다"
23305,0, "내부 지연 RPC 오류: %s"
23306,0, "스키마 %s는 존재하지 않습니다"
23307,0, "중복 스키마 %s는 이미 존재합니다"
23308,0, "개체 %s. %s는 존재하지 않거나 부적당합니다"
23309,0, "개체 %s. %s(유형 %s의)는 존재합니다"
23310,0, "개체 그룹 %s 은 중지되지 않습니다"
23311,0, "개체 그룹 %s 은 중지되었습니다"
23312,0, "%s에 의해 불러진것이 masterdef가 아닙니다"
23313,0, "개체 그룹 %s 는 %s에서 마스터된것이 아닙니다"
23314,0, "데이타베이스는 %s에 대한 스냅샷이 아닙니다"
23315,0, "복제목록 버전 또는 요청 %s가 버전 %s에서 지원되지 않습니다"
23316,0, "masterdef는 %s입니다"
23317,0, "통신 실패가 일어났습니다"
23318,0, "ddl 실패가 일어났습니다"
23319,0, "파라미터 값 %s이 적당하지 않습니다"
23320,0, "값 %s 와 %s 때문에 요청에 실패했습니다"
23323,0, "파라미터 길이가 지연 RPC 한계를 초과하였습니다"
23324,0, "오류 %s, \"%s\"에서 지연 엔트리를 작성하는 동안 오류 %s가 발생했습니다"
23325,0, "파라미터 유형은 %s가 아닙니다"
23326,0, "시스템이 정지되었습니다"
23327,0, "가져오기되는 지연 rpc 데이타가 데이타베이스의 %s와 일치하지 않습니다"
23328,0, "스냅샷 기본 테이블 \"%s\". \"%s\" 은 마스터 테이블 \"%s\". \"%s\ 과 다릅니다"
23329,0, "ddl에 공급된-사용자가 성공하였지만 스냅샷 \"%s\". \"%s\"가 없습니다"
23330,0, "열 그룹 %s는 이미 존재합니다"
23331,0, "열 그룹 %s는 존재하지 않습니다"
23332,0, "그룹 %s를 사용하고 있습니다; 제거할 수 없습니다"
23333,0, "열 \"%s\"는 이미 열 그룹의 일부입니다"
23334,0, "열 \"%s\" 는 테이블 또는 열 그룹에 존재하지 않습니다"
23335,0, "우선권 그룹 %s는 이미 존재합니다"
23336,0, "우선권 그룹 %s는 존재하지 않습니다"
23337,0, "우선권 또는 값이 우선권 그룹 %s에 있지 않습니다"
23338,0, "우선권 또는 값이 이미 우선권 그룹 %s에 있습니다"
23339,0, "대립 해결 정보가 중복되었습니다"
23340,0, "해결 방법 %s이 잘못되었습니다"
23341,0, "사용자 함수가 요구되었습니다"
23342,0, "파라미터 열 \"%s\"이 부적당합니다"
23343,0, "지정된 대립 해결 정보가 등록되지 않았습니다"
23344,0, "제약조건 (%s. %s)는 존재하지 않습니다"
23345,0, "테이블 \"%s\". \"%s\" 는 통계를 정리하기 위해서 등록하지 않았습니다"
23346,0, "테이블 %s에 대한 기본키가 정의되지 않았습니다"
23347,0, "데이타유형 %s(열 \"%s\"이 있는 테이블 %s)는 지원되지 않았습니다"
23348,0, "%s 프로시저를 복제할 수 없습니다; IN 파라미터만 지원됩니다"
23349,0, "함수에대한 중복 지원을 생성할 수 없습니다"
23350,0, "반복 호출의 최대 수가 초과되었습니다"
23351,0, "파라미터 데이타유형 %s(프로시저 %s에 대한)는 지원되지 않습니다"
23352,0, "지연 트랜잭션에 수신이 중복되었습니다"
23353,0, "지연 RPC 큐는 개체 그룹 %s에 대한 엔트리를 가지고 있습니다"
23354,0, "지연 RPC 실행은 \"%s\"에 대해서 사용불가합니다"
23355,0, "개체 %s. %s 은 존재하지 않거나 마스터 위치가 부적당한 것입니다"
23360,0, "마스터 테이블 \"%s\" 에 대한 하나의 스냅샷만이 생성될 수 있습니다"
23361,0, "스냅샷 \"%s\" 은 마스터 싸이트에 존재하지 않습니다"
23363,0, "마스터와 스냅 싸이트에 스냅 기본 테이블 \"%s\"이 일치하지 않습니다"
23364,0, "중복 옵션은 설치되지 않았습니다"
23365,0, "싸이트 %s 가 존재하지 않습니다"
23366,0, "정수 값 %s 은 1 보다 적습니다"
23367,0, "테이블 %s 은 기본 키를 누락했습니다"
23368,0, "이름 %s 은 널 또는 빈 스트링일 수 없습니다"
23369,0, "\"%s\" 인수의 값이 널일 수는 없습니다"
23370,0, "테이블 %s 와 테이블 %s 들은 동등한 (%s) 외형이 아닙니다"
23371,0, "열 %s 이 테이블 %s에서 알 수 없습니다"
23372,0, "형태 %s 가 테이블 %s 에서 제공되지 않습니다"
23373,0, "개체 그룹 %s 은 존재하지 않습니다"
23374,0, "개체 그룹 %s 은 이미 존재합니다"
23375,0, "기능은 %s에 데이터베이스 버전과 호환되지 않습니다"
23376,0, "노드 %s 은 중복 버전 \"%s\"와 호환되지 않습니다"
23377,0, "missing_rows_oname1 인수에 대한 잘못된 %s 이름입니다"
23378,0, "연결 수식어 \"%s\" 은 개체 그룹 %s에 대해 적당한 것이 아닙니다"
23379,0, "연결 수식어 \"%s\" 은 너무 깁니다"
23380,0, "전파 모드 \"%s\" 은 적당하지 않습니다"
23381,0, "기본 개체 %s. %s@%s 을 위한 생성된 개체는 존재하지 않습니다"
23400,0, "부적당한 스냅샷 \"%s\" 이름입니다"
23401,0, "스냅샷 \"%s\". \"%s\"이 존재하고 있지 않습니다"
23402,0, "지연 txns의해서 충돌되었기 때문에 재생이 중지되었습니다"
23403,0, "재생 그룹 \"%s\". \"%s\"가 이미 존재합니다"
23404,0, "재생 그룹 \"%s\". \"%s\" 가 존재하고 있지 않습니다"
23405,0, "재생 그룹 수 %s가 존재하고 있지 않습니다"
23406,0, "사용자 \"%s\"에 불충분한 권한을 가지고 있습니다"
23407,0, "개체 %s 이름은 \"schema\". \"object\" 또는 \"object\" 처럼 지정해야 합니다"
23409,0, "사용되지 않은 그룹 수를 찾을 수 없습니다"
23410,0, "스냅샷 \"%s\". \"%s\" 는 재생 그룹에 이미 있습니다"
23411,0, "스냅샷 \"%s\". \"%s\"는 재생 그룹 \"%s\". \"%s\"에 없습니다"
23420,0, "간격은 미래에 시간의 값을 구해야 합니다"
23421,0, "일 번호 %s는 일 큐에 있는 일이 아닙니다"
23422,0, "오라클 서버는 자주 사용되지 않는 일 번호을 생성할 수 없습니다"
23423,0, "일 번호 %s는 정수가 아닙니다"
23430,0, "인수 \"%s\" 은 NULL 또는 빈 스트링일 수 없습니다"
23431,0, "잘못된 상태: %s"
23432,0, "마스터 싸이트 %s는 이미 존재합니다"
23433,0, "실행을 잘못된 마스터 싸이트 %s에서 하고 있습니다"
23434,0, "마스터 싸이트 %s 은 개체 그룹으로 알려 지지 않았습니다"
24275,0, "함수 '%s' 파라미터 '%s'는 누락되었거나 또는 부당한 것입니다"
24276,0, "함수 '%s' 출력 '%s'의 최대값이 초과되었습니다"
24300,0, "모드에 잘못된 값이 있습니다"
24301,0, "쓰레드-안전 로그온에 지정된 널 호스트입니다"
24302,0, "다른 쓰레드에 의해 사용하고 있는 곳에 호스트 연결이 있습니다"
24303,0, "호출은 비-지연 링키지를 지원하지 않습니다"
24304,0, "데이터형태는 호출을 허용하지 않습니다"
24305,0, "잘못된 바인드 또는 정의 켄텍스트입니다"
24306,0, "구분을 위한 잘못된 버퍼"
24307,0, "구분을 위한 길이가 부적당합니다"
25000,0, "트리거 WHEN 절에 바인드 변수의 사용이 부적당합니다"
25100,0, "TABLESPACE 옵션은 ALTER INDEX REBUILD와 같이 사용해야만 합니다"
25101,0, "REBUILD 옵션 지정이 중복되었습니다"
25102,0, "PARALLEL 옵션은 ALTER INDEX REBUILD와 같이 사용해야만 합니다"
25103,0, "NOPARALLEL 옵션은 ALTER INDEX REBUILD와 같이 사용해야만 합니다"
25104,0, "UNRECOVERABLE 옵션은 ALTER INDEX REBUILD와 같이 사용해야만 합니다"
25105,0, "RECOVERABLE 옵션은 ALTER INDEX REBUILD와 같이 사용해야만 합니다"
25106,0, "하나의 PARALLEL 또는 NOPARALLEL절 만이 지정되어야 합니다"
25107,0, "TABLESPACE 옵션 지정이 중복되었습니다"
25108,0, "대기 잠금 이름 공간은 %s 문자의 한계 크기를 초과했습니다"
25109,0, "대기 잠금 이름 공간은 잘못된 '%s' 문자를 가지고 있습니다"
25110,0, "NOSORT 은 비트맵 색인과 같이 사용하면 안됩니다"
25111,0, "BITMAP은 클러스터 색인과 같이 사용하면 안됩니다"
25112,0, "비트맵 색인은 하나의 열을 색인합니다"
25113,0, "BITMAP 색인에 대한 DML 작업은 구현되지 않습니다"
