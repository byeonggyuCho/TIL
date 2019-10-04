# mybatis

## 1. 상황
mapper Interface를 찾지 못해서 serviceImple에 Injection이 안되는 상황.<br/>


## 2. 원인
mybatis관련 database-context.xml에서  MapperScannerConfigurer 빈의 MapperScan범위(basePackage) 설정이 누락되어있었음.

![](/resource/img/dwyt0603_1.png)


## 3. 해결
basePackage에 mapper interface경로 추가.  



## 4. 참고
- 스프링 빈 생성 순서
- 스프링 의존성 주입 과정
- sqlSessionFactroy빈 생성 과정.
- MapperScan 어노테이션
- org.mybatis.spring.mapper.MapperScannerConfigurer

![](/resource/img/dwyt0603_2.png)