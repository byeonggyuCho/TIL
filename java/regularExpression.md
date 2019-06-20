# Regular expression


## Regular expression flags
- g: 전역검색(Global)
- i: 대소문자 구분없이 검색
- m: 다중행검색
- u: 유니코드; 패턴을 유니코드패턴의 나열로 취급
- y: 'sticky'검색을 수행한다.



##  CHARCTER CLASSES
특정 셋의 문자와 일치

- . : 줄바꿈을 제외한 모든 문자와 일치
- /s/S : 줄 바꿈을 포함하여 모든 문자를 일치.
- \w : 모든 단어 문자 (영숫자 및 밑줄)와 일치. [A-Za-z0-9_] 와 동일
- \W : 단어 문자가 아닌 문자 (영숫자 및 밑줄)와 일치 [^ A-Za-z0-9_] 
- \d : 임의의 숫자 (0-9)와 일치 [0-9]와 동일
- \D : 숫자가 아닌 문자와 일치 [^0-9]와 동일
- \s : 공백 문자(공백, 탭, 줄바꿈)와 일치
- \S : 공백 문자(공백, 탭, 줄바꿈)가 아닌 문자와 일치
와 동일



## ANCHORS
문자가 아닌 문자열 내의 위치

- ^ : it assert Start position or 역치
- $ : it assert End position
- \b : 	공백, 구두점 또는 문자열의 시작/끝과 같은 단어 경계 위치를 찾음
문자가 아닌 위치와 일치
- \B : 단어 경계다 아닌 위치와 일치 문자가 아닌 위치와 일치


## ESCAPED CHARACTERS
일부 문자는 정규 표현식에서 특별한 의미를 지니며 이스케이프해야 합니다.

- 	\t : TAB 문자(char code 9)와 일치
-   \n : LINE FEED 문자(char code 10)와 일치
- 	\v : VERTICAL TAB 문자(char code 11)와 일치
-   \f : FORM FEED 문자(char code 12)와 일치
-  	\r : CARRIAGE RETURN 문자(char code 13)와 일치
-   \0 : NULL 문자(char code 0)와 일치


## QUANTIFIERS & ALTERNATION
Quantifiers는 선행하는 토큰이 일정 횟수 일치해야 함
기본적으로 최대한 많은 문자와 일치
Alternation는 하나의 순서 또는 다른 것과 부합하는 boolean OR과 같은 역할을 함


- \* : Matches between zero to unlimited times
- \+ : Matches between one and unlimited times
- ? : 0 또는 1번 발생
- {m} : 선행 표현식이  m번 발생
- {m,} : 선행 하위식이 m번 이상 발생
- {m,n} : 선행 하위식이 m번이상 n번 이하 발생
- \ : 표현식에서 후속 메타 문자를 리터럴로 처리
- | : or



## GROUPS & LOOKAROUND
그룹을 사용하면 일련의 토큰을 결합하여 함께 작동할 수 있음
캡쳐 그룹은 역 참조로 참조되고 결과에서 별도로 엑서스 할 수 있음
둘러보기를 사용하면 그룹을 결과에 포함하지 않고 일치시킬 수 있음

- (ABC) : 	여러 토큰을 그룹화하고 하위 문자열을 추출하거나 역참조를 사용하는 캡처드룹을 만듬
- \1 : 이전 캡쳐 그룹의 결과와 일치. 예를 들어 \1 은 첫번째, \3은 세번째 캡쳐 그룹과 일치
- (?:ABC) : 캡쳐 그룹을 만들지 않고 여러 토큰을 그룹화 함
- (?=ABC) : 그룹을 주 표현식 다음에 일치시키지 않고 결과에 포함
- (?!ABC) : 주 표현식 뒤에 일치 할 수 없는 그룹을 지정
(일치하는 경우 결과가 무시)
- (?<=ABC) : 결과에 포함시키지 않고 주 표현식 앞에 그룹을 일치
JavaScript는 지원 안됨
- (?<!ABC) : 주 표현식 앞에 일치시킬 수 없는 그룹을 지정
(일치하는 경우 결과가 무시)
JavaScript는 지원 안됨

## SUBSTITUTION
이 토큰은 대체 문자열에서 일치 항목의 다른 부분을 삽입하는데 사용

- $& : 일치하는 텍스트를 삽입
- $1 : 지정된 캡처 그룹의 결과를 삽입 (ex. $3은 세번째 캡처 그룹을 삽입)
- $` : 일치하는 원본 문자열의 일부를 삽입
- $’ : 일치하는 문자열 다음에 오는 부분을 삽입
- $$ : 달러 문자($)를 삽입
- \n : 대체 문자열에는 \n, \t, \x09, \u0009 와 같은 JS 문자열 형식과 호환되는 이스케이프 된 문자가 지원됨 



## 패턴 일치여부

## 문자열 치환하기



## 자주 사용되는 자바 패턴 체크

```  java 
/**
 * 비밀번호 정규식 패턴
 */
public class RegularExpression {


// 영문, 숫자, 특수문자
public static final String pattern1 = "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!%*#?&])[A-Za-z[0-9]$@$!%*#?&]{8,20}$"; 
// 영문, 숫자
public static final String pattern2 = "^[A-Za-z[0-9]]{10,20}$"; 
//영문,  특수문자
public static final String pattern3 = "^[[0-9]$@$!%*#?&]{10,20}$"; 
// 특수문자, 숫자
public static final String pattern4 = "^[[A-Za-z]$@$!%*#?&]{10,20}$";
// 같은 문자, 숫자
public static final String pattern5 = "(\\w)\\1\\1\\1";

Matcher match;


/**
* 비밀번호 정규식 체크
*/
public boolean pwdRegularExpressionChk(String newPwd, String oldPwd, String userId) {

    boolean chk = false;


    // 특수문자, 영문, 숫자 조합 (8~10 자리)
    match = Pattern.compile(pattern1).matcher(newPwd);

    if(match.find()) {
        chk = true;
    }


    // 영문, 숫자 (10~20 자리)
    match = Pattern.compile(pattern2).matcher(newPwd);

    if(match.find()) {
        chk = true;
    }


    // 영문, 특수문자 (10~20 자리)
    match = Pattern.compile(pattern3).matcher(newPwd);

    if(match.find()) {
        chk = true;
    }


    // 특수문자, 숫자 (10~20 자리)
    match = Pattern.compile(pattern4).matcher(newPwd);

    if(match.find()) {
        chk = true;
    }


    if(chk) {
        // 연속문자 4자리
        if(samePwd(newPwd)) {
            return false;
        }

        // 같은문자 4자리
        if(continuousPwd(newPwd)) {
            return false;
        }


        // 이전 아이디 4자리
        if(newPwd.equals(oldPwd)) {
            return false;
        }


        // 아이디와 동일 문자 4자리
        if(sameId(newPwd, userId)) {
            return false;
        }

    }


    return true;
    }


    /**
    * 같은 문자, 숫자 4자리 체크
    */
    public boolean samePwd(String pwd) {

        match = Pattern.compile(pattern5).matcher(pwd);
        return match.find() ? true : false;
    }


    /**
    * 연속 문자, 숫자 4자리 체크
    */
    public boolean continuousPwd(String pwd) {

        int o = 0;
        int d = 0;
        int p = 0;
        int n = 0;
        int limit = 4;

        for(int i=0; i<pwd.length(); i++) {

            char tempVal = pwd.charAt(i);
            if(i > 0 && (p = o - tempVal) > -2 && (n = p == d ? n + 1 :0) > limit -3){
                return true;
            }

            d = p;
            o = tempVal;
        }


        return false;
    }


    /**
    * 아이디와 동일 문자 4자리 체크
    */
    public boolean sameId(String pwd, String id) {

        for(int i=0; i<pwd.length()-3; i++) {

            if(id.contains(pwd.substring(i, i+4))) {
                return true;
            }
        }

        return false;
    }

}
```