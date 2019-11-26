# Build Process with nodejs


## Intro
CI(Continuous Integration) Server를 이용해 
빌드 테스트 배포등을 통합할 수 있다.  
시나리오는 다음과 같다.

1. 로컬환경에서 형상관리서버로 Commit 한다.
2. 형상관리서버를 Hooking한 CI서버에서 Master branch에 변화가 생겼을때 빌드를 한다.
3. 빌드 과정은 다음과 같다.
	- test
	- uglify
	- minify
4. 빌드가 성공적으로 끝나면 빌드 산출물을 웹서버로 배포한다.
5. 배포 후 웹서버 재기동.


## Build Setting


### 1. 플러그인 설치하기.
CI서버에서 빌드를 하기위한 플러그인을 설치한다.  

1. Jenkins> Jenkins관리 > 플러그인 관리 > 설치가능 탭
2. 필터에서 `nodejs`검색

### 2. 플러그인 설정
1. Jenkins > Jenkins관리 > Global Tool Configuration
2. NodeJS
	- 설치할 버전 선택
3. `Save`버튼 클릭.


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



## Deploy Setting
웹 서버로 헤로쿠를 사용한다. 헤로쿠에서는 젠킨스처럼 Build 프로세스를 만들 수 있는 기능을 제공한다. 빌드 및 테스트를 두 군데 가능하지만 이 글에서는 Jekins에서 빌드 및 테스트를 한뒤에 빌드 산출물을 헤로쿠서버에 배포하는 설정을 다루기로 한다.  



### Source Code Management

![](/resource/img/jenkins/Jenkins_SourceCodeManagement2.png)  


우리는 2개의 깃허브 레포지토리를 등록해야하는데 
소스데이터를 pull할 형상관리서버(github)의 레포지토리와 빌드 산출물을 push할 웹 서버(heroku)레포지토리를 등록해야한다.  

등록 방법은 간단하다.
`Repository URL`에 레포지토리의 경로를 넣어준 뒤 
Credentials에서 레포지토리에 대한 인증방법을 입력해주면 끝이다.
깃허브의 경우 계정과 아이디를 입력하면 되지만 헤로쿠의 경우 살짝 복잡하다.  

Heroku의 경우 `SSH key`가 필요한데 키를 얻기 위해선 몇가지 설치가 필요하다. 

우선 피씨에 SSH키를 생성은 터미널에서 헤로쿠서버에 로그인한뒤 keys커맨드를 통해 확인할 수 있다.
```
> heroku login
> heroku keys --long
```
을 입력해서 로그인을 하자. (Heroku CI를 설치해야한다.)

이렇게 얻은 키를 젠킨스에서 헤로쿠의 credential을 등록하면 된다.

윈도우 사용자는 몇가지 작업이 더 남았다. 우선 SSH key가 등록된 시스템의 사용자가 젠킨스 서버에 로그인해야한다.
그 다음 `Window Services`에 들어가서 `Jenkins`서비스를 찾아서 `Jenkins Properties`에 들어간다.

`Log On`탭으로 이동해서 
`This account`항목에 윈도우 사용자 이름을 입력한다.
이 작업은 나중에 헤로쿠 레포지토리에서 `advance`버튼을 눌러서 특정 워크플로우에 접근할 때 구분을 하기 위함이다. 
그 다음 우리는 빌드를 테스트를 해야한다. 



### Post-build Actions

![](/resource/img/jenkins/Jenkins_postActionBuild.png)  
Post-bild Actions는 빌드가 끝난 뒤에 이뤄지는 작업을 하는 곳인데 이곳에서 헤로쿠에 푸쉬를 하며 된다.

헤로쿠에 배포하기 위해 `Add Post build Action`을 클릭한뒤 `Git Publisher`를 클릭한다.

1. 빌드가 실패할 경우를 대비하기 위해 `Push Only if Build Succeeds`를 체크한다. 

2. `Bransh`항목에서 타겟 레포지토리를 등록해준다.
3. `Target remote name`이란 항목은 `Source Code ManageMent`에 등록한 이름을 넣어주면 된다.







## ETC

- 빌드 옵션은 어디에 넣는지?
- CI서버에 환경변수 등록하기.



### REF
- [Setting up jenkins to deploy heroku](https://lankydan.dev/2017/06/11/setting-up-jenkins-to-deploy-to-heroku)
- [Automating our Heroku deployments from Jenkins](https://www.paulfurley.com/automating-heroku-deployments-from-jenkins/)
- [Create An SSH Key](https://installfest.railsbridge.org/installfest/create_an_ssh_key#generate-key)
- [How to generate and Add SSH key](https://devcenter.heroku.com/articles/keys#adding-keys-to-heroku)
- [Setting up jenkins to deploy heroku](https://dzone.com/articles/setting-up-jenkins-to-deploy-to-heroku)
- https://velog.io/@vies00/React-Hooks
- https://velog.io/@velopert/series/redux-or-mobx


