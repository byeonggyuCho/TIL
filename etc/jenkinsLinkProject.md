
# 형상관리 서버와 CI서버 연동하기.

## Intro
형상관리 서버(git)과 CI서버(jenkins)를 연결하는 방법에 대해 설명한다.


## 1.GitHub에서 Credential 생성

1.  Setting > Developer settings > Personal access tokens로 이동
2. `Generate new token`메뉴 선택.
3. 토큰이 접근할 수 있는 범위 설정
	- `Select scopes` 옵션에서 `repo`와 `admin:repo_hook`을 체크한다.
4. 선택이 끝나면 문자열로 된 토큰이 생성된다.

## 2.Jenkins에서 Gitgub Credential추가
Github와 jenkins를 연결하기 위해서 앞단계에서 생성한 Credential을 추가해야한다.  

![](/resource/img/jenkins/jenkins_addCredential.png)

![](/resource/img/jenkins/jenkins_addCredential2.png)


1. Jenkins> Manage Jenkins(Jenkins 관리) > Configure System(시스템 설정)으로 이동
2. GitHub 계정을 설정하는 부분으로 이동한다.
3. 각 옵션에 다음과 같이 입력한다.
	- Name : GitHub연결설정을 구별할 이름.
	- API URL : Https://api.github.com
	- Credential 부분에서 Add버튼 누른다.
4. `Jenkins Credential Provider: Jenkins`팝업에서 다음과 같이 입력한다.
	- Kind : Select Text
	- Secret : (GitHub에서 생성한 credential)
5. `Add`버튼을 눌러 팝업을 닫는다.
5. `Test connection`버튼을 눌러서 연결을 테스트한다.


## 3. Jenkins 프로젝트 생성 및 설정.

![](/resource/img/jenkins/jenkins_sourceCodeManagement.png)

1. setting(구성) > Source Code Management(소스코드 관리)으로 이동.
2. 각 부분에 다음과 같이 입력한다.
- Repository URL : (gitHub Repositroy URL)
3. Credentials 우측의 `Add`버튼을 눌러서  repositroy에 연결할 연결 정보를 입력한다.
- Jenkins > credentials로 이동
- kind `Username with password` 선택
- Username : githubId
- Password : github Password

## 4. 빌드 트리거 설정
Jenkins에서 빌드를 시작하는 조건을 설정하는 구간이다.  
![](/resource/img/jenkins/jenkins_buildTrigger.png)

1. `Build Triggers(빌드 유발)`로 이동한다.
2. `GitHub hook trigger for GItScm polling`메뉴를 선택하면 gitHub에 코드가 푸쉬할 때 마다 webHook 메세지를 Jenkins에게 보내게된다. Jenkins는 WebHook의 메세지를 받을때마다 빌드를 한다.


## 5. GitHub에서 WebHook설정
Jenkins쪽에서 받을 WebHook 메세지를 준비를 해줬으니 Github에서는 코드를 푸쉬할때마다 메세지를 보내도록 설정해야한다.

![](/resource/img/jenkins/jenkins_webhookSetting.png)

1. GitHub > repository > Settings > Webhooks 로 이동
2. Webhooks 메뉴에서 `Add webhook`클릭.
3. 각 항목에 다음을 참고하여 입력
- Payload URL : ${jenkinsServer}/git-webhook
- What events would you like trigger webhook?  
이벤트 조건 설정
- `Active`:  체크








## REF 
- [Jenkins와 gitHub연동](https://bcho.tistory.com/m/1237)
