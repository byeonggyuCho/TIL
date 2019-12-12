# Making mobile browser conole

## Intro




##  1.구조잡기.
```js
var html = [
//전체 콘솔창 - fixed로 화면하단에 붙인다.
'<div id="bsConsole" style="position:fixed;z-index:999999;background:#eee;bottom:0;left:0;right:0;height:200px">',
  //상단 탭 두 개가 들어갈 박스
  '<div id="bsConsoleTab" style="background:#ccc;height:20px">',
    //두개의 탭
    '<div id="bsConsoleTabConsole" style="font-size:11px;margin:2px 5px;padding:0 5px;float:left;border:1px solid #666">',
       'Console',
    '</div>',
    '<div id="bsConsoleTabElement" style="font-size:11px;margin:2px 5px;padding:0 5px;float:left;border:1px solid #666">',
       'Element',
    '</div>',
  '</div>',
  //탭에 따른 내용이 나올 공간
  '<div id="bsConsoleView" style="font-size:10px;overflow-y:scroll;height:180px">',
    //콘솔용 뷰
    '<div id="bsConsoleViewConsole"></div>',
    //엘리먼트용 뷰
    '<div id="bsConsoleViewElement" style="display:none"></div>',
  '</div>',
'</div>'
]


var temp = document.createElement('div');
var init = function(){
   
  if(!document.getElementById('bsConsole')){
    
        //div를 하나 만들어서 innerHTML을 통해 콘솔뷰를 생성한뒤
        temp.innerHTML = html.join('');
    
        //body에 넣어줌
        document.body.appendChild(temp.childNodes[0]);
    
        //이벤트를 걸어줌
        document.getElementById('bsConsole').onclick = function(e){
            switch(e.target.id){
                //상단바
                case'bsConsoleTab'://접었다 폈다.
                if(e.target.style.height == '200px'){//펴져있으니 접자
                    e.target.style.height == '20px';
                }else{//펴자
                    e.target.style.height == '200px';
                }
                break;
            //Element탭버튼
            case'bsConsoleTabElement'://뷰를 전환하고 html을 뿌려줌
                document.getElementById('bsConsoleViewConsole').style.display = 'none';
                document.getElementById('bsConsoleViewElement').style.display = 'block';
                document.getElementById('bsConsoleTabElement').innerHTML = '<pre>' +
                    ('<html>\n' + document.getElementsByTagName('html')[0].innerHTML + '\n</html>').replace(/[<]/g, '&lt;') +
                    '</pre>';
                break;
            //콘솔탭버튼
            case'bsConsoleTabConsole'://뷰만 전환해줌
                document.getElementById('bsConsoleViewConsole').style.display = 'block';
                document.getElementById('bsConsoleViewElement').style.display = 'none';
            }
        };
    }
}
```


## 기능정의
```js



```


## log함수

```js
var mConsole = (function(){
  var html = [
  '<style>',
  '#bsConsole{position:fixed;z-index:999999;background:#eee;bottom:0;left:0;right:0;height:200px}',
  '#bsConsoleTab{background:#ccc;height:20px}',
  '#bsConsoleTabConsole,#bsConsoleTabElement{font-size:11px;margin:2px 5px;padding:0 5px;float:left;border:1px solid #666}',
  '#bsConsoleView{font-size:10px;overflow-y:scroll;height:180px}',
  '#bsConsoleViewElement{word-break:break-all;word-wrap:break-word}',
  '.bsConsoleItem{font-size:11px;border:1px solid #000;padding:5px;margin:5px;float:left}',
  '</style>',
  '<div id="bsConsole">',
    '<div id="bsConsoleTab">',
      '<div id="bsConsoleTabConsole">Console</div><div id="bsConsoleTabElement">Element</div>',
    '</div>',
    '<div id="bsConsoleView">',
      '<div id="bsConsoleViewConsole"></div><div id="bsConsoleViewElement" style="display:none"></div>',
    '</div>',
  '</div>'],
  temp = document.createElement('div'),
  init = function(){
    if(document.getElementById('bsConsole')) return;
      temp.innerHTML = html.join('');
      document.body.appendChild(temp.childNodes[0]);
    document.body.appendChild(temp.childNodes[0]);
      document.getElementById('bsConsole').onclick = function(e){
      switch(e.target.id){
      case'bsConsoleTab':
        e.target.style.height = e.target.style.height == '200px' ? '20px' : '200px';
        break;
      case'bsConsoleTabElement':
        document.getElementById('bsConsoleViewConsole').style.display = 'none';
        document.getElementById('bsConsoleViewElement').style.display = 'block';
        document.getElementById('bsConsoleViewElement').innerHTML = '<pre>' +
          ('<html>\n' + document.getElementsByTagName('html')[0].innerHTML + '\n</html>').replace(/[<]/g, '&lt;') +
          '</pre>';
        break;
      case'bsConsoleTabConsole':
        document.getElementById('bsConsoleViewConsole').style.display = 'block';
        document.getElementById('bsConsoleViewElement').style.display = 'none';
      }
    }
  };
  return {
    log:function(){
      var a = arguments, i = 0, j = a.length, item, v;
      init();
    item = ['<div style="clear:both">'];
      while(i < j){
        v = a[i++];
        if(v && typeof v == 'object') v = JSON.stringify(v);
        item.push('<div class="bsConsoleItem">' + v + '</div>');
      }
    item.push('</div>');
      temp.innerHTML = item.join('');
      document.getElementById('bsConsoleViewConsole').appendChild(temp.childNodes[0]);
    }
  };
})();

```