# Getting Start with MySQL Community Server ZIP Archive on Windows
    It's always easy to use a zip archive than installing a software on your machine. 
    Recently I've got to use MySQL Community Server ZIP Archive (mysql-5.7.17) and faced some problem when setting up the server. 
    I will give you few step by step guidelines for a successful set up so that you won't face the same problems.

## **Step 1**: Extract the zip archive.
Lets say the base directory path is D:\mysql-server

## **Step 2**: Open the command prompt in Administrator Mode and navigate to MySQL base directory.
This is the most important step. MySQL needs access to your registry at the initial execution. If you execute the initial MySQL commands without administrator mode you will get an error message like follows.
Could not create or access the registry key needed for the MySQL application
to log to the Windows EventLog. Run the application with sufficient
privileges once to create the key, add the key manually, or turn off
logging for that application.

## **Step 3**: Enter following commands.
D:\mysql-server> mysqld --initialize  
or  
D:\mysql-server>mysqld --initialize-insecure  

1. Option :  initialize  
     설정 파일(my.ini) 옵션대로 초기화 작업  
2. Option : insecure    
최초 root 접속시 비밀번호를 입력안하고 접속할 권한 부여 - 암호없이 root로 로그인 하도록 하는 옵션


Above first command will create a random password for root user account while second won't.

## **Setp 4**: Enter mysqld in the command prompt.
D:\mysql-server> mysqld
Now your MySQL server is up and running!

    Using command prompt in administrator mode is only for the setting up. You don't want administrator mode in the later sever startups.

    A Note for MySQL Workbench Users:
    I use MySQL Workbench as the IDE. My OS is a 64bit OS and I downloaded 64bit non-install zip version of MySQL Workbench. 
    But it got crashed when i started it. 
    Then i browsed internet and found that 32bit version is the solution. 
    I downloaded MySQL Workbench 32 bit non-install zip and it worked fine.

    


## my.ini settin Guide


```
[mysqldump]
default-character-set = utf8


[client]
default-character-set = utf8


[mysql]
default-character-set = utf8


[mysqld]
character-set-server = utf8
collation-server = utf8_general_ci
init_connect = set collation_connection = utf8_general_ci
init_connect = set names utf8
character-set-client-handshake = FALSE
skip-character-set-client-handshake



basedir = C:\mysql
datadir = C:\mysql\data
port = 3306

```


## register Service
```
 C:\mysql\bin> mysqld --install 
```