# Lazy Parsing

## Intro
브라우저는 스크립트 태그를 만나면 내부 로직이 모두 파싱되어 메모리에 적재되고 실행되지 않으면 모든 동작을 정지시킵니다.  이때 스크립트 로직을 로딩한후 파싱을 할때 지연이 발생하게되는데 이 스크립트로직이 불필요한 경우에 파싱을 하기 위한 패턴을 소개합니다.  

브라우저에서 지원하는 DOM API가 없는 경우 외부 라이브러리를 사용하는 상황으로 예를 들어보겠습니다.


```html
<html>
<head>
 
<script id="sizzle" type="text/sizzle">
  //여기에 시즐코드를 둔다!
</script>
 
<script>
function Select( $selector ){
  if( document.querySelectAll ){
    Select = function Select($selector ){
      return document.querySelectAll( $selector );
    };
  }else{
    var scriptElm = document.createElement( 'script' );
    document.getElementsByTagName('head')[0].appendChild( scriptElm );
    scriptElm.text = document.getElementById( "sizzle" ).text;

    Select = function Select( $selector ){
      return sizzle( $selector );
    };
  }
  return Select( $selector );
}
 
var aa = Select( '#id' );

```

위 로직에서는 자바스크립트가 최초로 파싱될 시점에는 sizzle을 포함하지 않습니다. 필요한 경우에만 파싱을하도록 되어있습니다.


## QnA
- 코드에서 sizzle 스크립트에 처음부터 로딩되어있는데 왜 이런 작업을 해주는지..?