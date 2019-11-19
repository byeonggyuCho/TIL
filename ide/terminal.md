# Window console Emulater

## 1. CMDER

### 특징
- 탭 기능 지원
- Cmd, powershell, gitbash, subsystem Windows Subsystem for Linux 지원

### Keyboard shortcuts

#### Tab manipulation
- `Ctrl + `\` : 작업표시줄 토글
- `Win + Alt + p` : Preferences (Or right click on title bar)
- `Ctrl + t` : 새 탭 열기
- `Ctrl + w` : 탭 닫기
- `Shift + Alt + number` : 빠른 새탭 열기
    1. CMD
    2. PowerShell
- `Alt + Enter` : 전체화면

#### Shell
- `Ctrl + Alt + u` : 상위 디렉토리로 이동
- `End, Home, Ctrl` : 윈도우즈처럼 텍스트 이동
- `Ctrl + r` : 히스토리 검색
- `Shift + mouse` : 버퍼에서 택스트 선택 및 복사.
- `Right click / Ctrl + Shift + v` : 텍스트 붙여넣기


### 마우스 우측 메뉴 등록
1. 관리자 권한 cmd실행
2. cmder 설치경로 이동 
3. `.\cmder.exe /REGISTER ALL` 콘솔창에 입력


### 한글 셋팅
1. 셋팅창 팝업(Win+Alt+p)
2. Main console font은 `굴림`, Font charset을 `Hangul`로 수정
3. StarttUp->Environment에서 다음과 같이 입력
    set Lang=ko_KR.UTF-8
    chcp utf-8

### Windows Subsystem for Linux(WSL 추가)

### Cmder포터블용 셀 사용자 설정



## 2.ConEmu

### 특징
- 탭 지원
- cmder의 모태
- 키워드 하이라이팅


## Ref
- [How to use cmder](https://webdir.tistory.com/548)
- [https://cmder.net/](https://cmder.net/)
- [ConEmu](https://conemu.github.io/)
- [감성프로그래밍](https://programmingsummaries.tistory.com/352)