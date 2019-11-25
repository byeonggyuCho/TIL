# Build Process with nodejs


## Intro
빌드 테스트 배포등을 통합할 수 있는 방법을 제공한다.  
시나리오는 다음과 같다.

1. 로컬환경에서 형상관리서버로 Commit 한다.
2. 형상관리서버를 Hooking한 CI서버에서 Master branch에 변화가 생겼을때 빌드를 한다.
3. 빌드 과정은 다음과 같다.
	- test
	- uglify
	- minify
4. 빌드가 성공적으로 끝나면 빌드 산출물을 웹서버로 배포한다.
5. 배포 후 웹서버 재기동.




### 1. 플러그인 설치하기.
1. Jenkins> Jenkins관리 > 플러그인 관리 > 설치가능 탭
2. 필터에서 `nodejs`검색

### 2. 플러그인 설정
1. Jenkins > Jenkins관리 > Global Tool Configuration
2. NodeJS
	- 설치할 버전 선택
3. Save


### 3. Job 설정.
1. Jenkins > `target Project` > 구성
2. `빌드 환경` 탭으로 이동
3. `Provide Node & npm bin/folder to PATH` 옵션 체크
4. `Build`탭으로 이동
5. Bild > Add build step > Execute shell
```shell
cd ${WORKSPACE}/src/main/webpack
npm install
npm run build
```




## ETC

### CI(Continuous Integration) Server
- Jenkins

- 빌드 산출물을 배포할 웹서버는 어디에 등록하는지..?
- 빌드 옵션은 어디에 넣는지?

### CI서버에 환경변수 등록하기.



### REF
- https://velog.io/@vies00/React-Hooks
- https://velog.io/@velopert/series/redux-or-mobx


