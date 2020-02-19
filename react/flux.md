# Flux


![](../resource/img/react/fluxLogo.png)
## intro
한마디로 하면 Flux는 애플이케이션 내의 데이터 흐름을 단방향(single directional data flow)으로 흐룰 수 있도록 도와주는 시스템 아키텍쳐입니다.  
시스템에서 어떠한 Action을 받았을 때 Dispatch가 받은 Actoin들을 통제하여 Store에 있는 데이터를 업데이트합니다. 그리고 변동된 데이터가 있으면 View에 리렌더링합니다.  
View에서는 Action을 Dispatcher에 보내서 Store에 저장된 상태값을 변경합니다.  
Store는 애플리케이션의 모든 데이터를 관리합니다. Dispatcher는 MVC의 Controller를 대체하며 어떠한 Action이 발생했을 때 어떻게 Store가 관리중인 데이터를 변경할지 결정합니다.  
Store가 갱신될때 View도 동시에 갱신됩니다.  

Flux를 이용하면 시스템의 컴포넌트 간 데이터 흐름이 단방향으로 유지됩니다. 데이터는 단방향으로만 흐르고 각각 Store와 View는 직접적인 영향을 주지 않기 때문에 여러개의 Store나 View를 갖는 시스템도 하나의 Store나 View를 갖는 시스템과 갖다고 볼 수 있습니다.

다음은 페이스북 깃허브에서 발췌한 Dispatcher와 Store의 관계에 대한 설명이다.

    Distpatcher와 Store
    Dispatcher는 Flux 아키텍처의 모든 데이터 흐름을 관리하는 중앙 허브다. 이는 본질적으로 Store 내에서 콜백을 등록할 때 사용하는 장소다. 각 Store는 Dispatcher에 등록할 콜백을 제공한다. 이 Dispatcher가 발생시킨 Action에 응답할 때 애플리케이션 내의 모든 Store는 Dispatcher에 등록한 콜백을 통해 Action에 의해 생긴 데이터를 송신한다.

    등록된 콜백을 정해진 순서로 실행하여 Store간의 의존관계를 관리할 수 있으므로 애플리케이션이 커질수록 더욱 중요하다. 선언에 따라 Store는 다른 Store의 갱신이 완료돌때까지 기다린 다음 자기 자신을 갱신한다.

    Store는 애플리케이션의 상태나 논리를 포함한다. Store의 역할은 전통적인 MVC의 Model역할과 비슷하다. 하지만 다수 객체의 상태를 관리하는 MVC와 달리 단일 객체 인스턴스로 관리한다. 또 Backbone 프레임워크의 컬렉션과도 다르다. ORM형식의 객체를 집합으로 관리하기보다 조금 더 단순하게 애플리케이션 내의 한 특정 도메인에 관한 애플리케이션의 상태를 관리한다.


Dispatcher가 중첩되지 않게 처리해야합니다. 즉 어떤 Action을 Dispatcher를 통해 처리하는 동안 다른 Action이 동작하지 않아야합니다.


## 단방향 데이터 흐름이필요한 이유
양방향 데이터 바인딩은 연속적인 갱신이 발생하고 객체 하나의 변경이 다른 객체를 변경하게 되어 실제 필요한 업데이트보다 더 많은 분량을 실행하게 된다. 어플리케이션의 규모가 커지면 데이터의 연속적인 갱신이 되는 상황에서는 사용자 상호작용의 결과가 어떤 변화를 만드는지 예측하는데 어려워진다. 


## 특징
- action이 전파되면 이 action에 영향이 있는 모든 view를 갱신한다. 이 방식은 특히 React의 선언형 프로그래밍 스타일 즉, view가 어떤 방식으로 갱신해야 되는지 일일이 작성하지 않고서도 데이터를 변경할 수 있는 형태에서 편리하다.

- 대형 MVC 어플리케이션에서 종종 나타나는 데이터 간의 의존성과 연쇄적인 갱신은 뒤얽힌 데이터 흐름을 만들고 예측할 수 없는 결과로 이끌게 된다.
## 구성

### Dispatcher
dispatcher는 Flux 어플리케이션의 중앙 허브로 모든 데이터의 흐름을 관리한다. 
 본질적으로 store의 콜백을 등록하는데 쓰이고 action을 store에 배분해주는 간단한 작동 방식이다.  각각의 store를 직접 등록하고 콜백을 제공한다. action creator가 새로운 action이 있다고 dispatcher에게 알려주면 어플리케이션에 있는 모든 store는 해당 action을 앞서 등록한 callback으로 전달 받는다. 

 Store는 다른 store의 업데이트가 끝날 때까지 선언적으로 기다릴 수 있고 끝나는 순서에 따라 스스로 갱신된다.
### Stores
Store는 어플리케이션의 상태와 로직을 포함하고 있다  
Store는 어플리케이션의 상태를 관리한다.  
store는 자신을 dispatcher에 등록하고 callback을 제공한다. 이 callback은 action을 파라미터로 받는다. store의 등록된 callback의 내부에서는 switch문을 사용한 action 타입을 활용해서 action을 해석하고 store 내부 메소드에 적절하게 연결될 수 있는 훅을 제공한다.  
결과적으로 action은 disaptcher를 통해 store의 상태를 갱신한다 .
 store가 업데이트 된 후, 상태가 변경되었다는 이벤트를 중계하는 과정으로 view에게 새로운 상태를 보내주고 view 스스로 업데이트하게 만든다. 


### Views(React 컴포넌트), controller-view


### Actions
dispatcher는 action을 호출해 데이터를 불러오고 store로 전달할 수 있도록 메소드를 제공한다.

## 데이터 흐름

Flux 어플리케이션에서의 데이터는 단방향으로 흐른다:
![](../resource/img/react/flux.png) 
view는 사용자의 상호작용에 응답하기 위해 새로운 action을 만들어 시스템에 전파한다:
![](../resource/img/react/flux2.png)


## 요청 흐름

![](../resource/img/react/flux-diagram.png)


### REF
- [Flux overview-kor](https://haruair.github.io/flux/docs/overview.html)
- [Flux.io](http://facebook.github.io/flux/docs/in-depth-overview)
- [what-the-flux-lets-redux](https://blog.andyet.com/2015/08/06/what-the-flux-lets-redux/)
- [redux-kr](https://lunit.gitbook.io/redux-in-korean/)
- [페이스북이Flux를채택한이유](https://blog.coderifleman.com/2015/06/19/mvc-does-not-scale-use-flux-instead/)
- [Flux와 Redux](https://taegon.kim/archives/5288)
- [FLUX카툰으로이해하기](https://bestalign.github.io/2015/10/06/cartoon-guide-to-flux/)
- [Flux and MVC](https://beomy.tistory.com/44)
- [redux_cartton_korean](http://bestalign.github.io/2015/10/26/cartoon-intro-to-redux/)
- [redux 적용기](https://d2.naver.com/helloworld/1848131)