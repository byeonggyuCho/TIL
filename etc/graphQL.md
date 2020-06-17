# GragpQL

## intro
- 유연함.



## 왜 쓰게 됐을까?
### 1. 모바일 사용의 증가로 인한 효율적인 데이터 로딩의 필요성
모바일 사용, 저전력 장치, 그리고 느린 네트워크 환경의 증가 등이 Facebook이 GraphQL을 개발하고자 하는 최초의 동기이었습니다. GraphQL은 네트워크 상에서 전송되어야 하는 데이터의 양을 최소화하고, 이에 따라 앞서 언급한 조건 하에 작동하는 어플리케이션의 퍼포먼스를 대체적으로 향상시켜줍니다.


### 2. 다양한 프론트엔드 프레임워크와 플랫폼의 등장
클라이언트 어플리케이션을 작동시키는 프레임워크와 플랫폼들이 다양해짐에 따라, 각각의 요구 사항들을 모두 충족시키는 하나의 API를 만들고 유지한다는 것이 어려워졌습니다. GraphQL을 사용하면, 각 클라이언트는 필요한 데이터에만 정확하게 접근하는 것이 가능해집니다.

### 3. 


## 장점
- 서버와 클라이언트와의 종속성을 낮춤.
- 데이터 통신 비용 절감
    - 원하는 특정 정보를 조회할 수 있음.
- API 도큐먼트를 직접 쓰지 않아도 됨
    -  API를 정의하는 스키마를 기반으로 자동 생성 될 수 있다는 것 입니다.
- API를 설계하지 않아도 됨
-  overfetching 과 underfetching 해결
- 프로덕트 생산성 향상


## 단점
- 파일요청 등을 다룰 때에는 복잡합니다. 



## GraphQL and RESTful
1. GraphQL
- 서로 다른 모양의 다양한 요청들에 대해 응담할 수 있어야할 때
- 대부분 요청이 CRUD에 해당할때

2. REST
- HTTP와 HTTPs에 대한 캐싱을 잘 사용하고 싶을때
- 파일 전ㅅ송등 단순한 텍스트로 처리되지 않는 요청들이 있을 때
- 요청의 구조가 정해져 있을때


## N+1 쿼리문제
사용자 리스트와 사용자별 팔로워를 조회하려고 할때 사용자의 수 별로 팔로워를 조회하는 요청을 보내야한다.  
이런 문제를 GraghQL을 통해해결 가능하다. 


## 특정 데이트를 요청할때
테이블의 모든 필드가 아닌 특정 필드만 필요할 때, 콕찝어서 요청할 수 있다.  
즉 사용자 테이블에 이름, 나이, 성별, 주소 등이 있다고 할때 사용자의 이름 목록만 조회할 수 있다.  


## 셈플
이 처럼 개발자가 Endpoint를 직접 선언할 수 있다.  
이로 인해  overfetching 과 underfetching문제를 해결할 수 있다. 

```json
{
  user(id: 3500401) {
    id,
    name,
    isViewerFriend,
    profilePicture(size: 50)  {
      uri,
      width,
      height
    }
  }
}
```


```json

{
  "user" : {
    "id": 3500401,
    "name": "Jing Chen",
    "isViewerFriend": true,
    "profilePicture": {
      "uri": "http://someurl.cdn/pic.jpg",
      "width": 50,
      "height": 50
    }
  }
}
```


## ref
- [왜 쓸까](https://www.slideshare.net/Kivol/graphql-in-action-rest)
- [GraghQL이란](https://jonnung.dev/graphql/2019/07/23/graphql-getting-started/)
- [GraphQL 개념잡기](https://tech.kakao.com/2019/08/01/graphql-basic/)
- [GraphQL과 Relay: 웹 애플리케이션 개발의 미래](https://blog.sapzil.org/2015/05/15/graphql-and-relay/)
- [React와 Apollo, Parcel 기반 서비스 개발](https://d2.naver.com/helloworld/2838729)
- [GraphQL을 쓰는 이유](https://analogcoding.tistory.com/174)
- [GraphQL이 REST보다 나은점](https://velog.io/@cadenzah/graphql-02-better-rest)
- [GrapghQL과 REST API](https://www.holaxprogramming.com/2018/01/20/graphql-vs-restful-api/)
- [Thinking of GraghQL](https://blog.cometkim.kr/posts/thinking-in-graphql-ko/)
- [graghQL](https://dkant.net/2019/07/01/01-graphql/)