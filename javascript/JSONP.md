# JSONP

## TODO

## TL;DR
- JSONP란 CORS가 활성화 되기 이전의 데이터 요청 방법으로, 다른 도메인으로부터 데이터를 가져오기 위해 사용하는 방법입니다.
- SOP(Same-Origin Policy) 정책으로 인해 생기는 이슈를 Cross-domain issue라고 하는데 JSONP는 이 이슈를 우회해서 데이터 공유를 가능하다.

## Intro
JSONP는 여러 보안상 이슈로 인하여 W3C에서는 2009년 채택된 CORS 방식의 HTTP 통신을 권장하고 있습니다. 이제는 거의 사용되지 않는 기술이지만 이번 스터디 예제에서 나온 Github 파서 예제를 공부하면서 나온 JSONP 통신에 대한 내용을 요약하였습니다.