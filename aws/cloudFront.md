# Cloud Front

## Access Denied 방지

루트 경로로 접속은 되는데 라우터 경로로 접근했을 경우

`This XML file does not appear to have any style information associated with it. The document tree is shown below.`

```xml
<Error>
    <Code>AccessDenied</Code>
    <Message>Access Denied</Message>
    <RequestId>2647425E4F179B75</RequestId>
    <HostId>iw0ppFKNLG6Jg6p/GtIX7aEukw10QvDzg4wB9pfYZ7IVnuEeEJelEP5MTdt1gsVQjxYiJ5tbQfI=</HostId>
</Error>
```

위 같은 접근에러가 나는 경우 에러 CloudFront에서 에러 핸들링을 처리해주면면된다.  
다시 말해 에러가 날경우 루트로 보내는 리다이렉션을 처리해주면된다

## REF

- [cloudfront로react 배포하기](https://velog.io/@_junukim/CloudFront%EB%A1%9C-React%EC%95%B1-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0-2)
