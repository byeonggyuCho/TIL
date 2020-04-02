# UseEffect


## intro
단순히 life cycler과 일대일 매칭이되는 hook으로  생각하다가 삽질을 해서 포스팅을 해야겠다는 생각이 들었다.
내가 겪은 문제는 useEffect로 componentDidMount시점의 로직을 작성할때 mount시점에 로직이 실행된다는 점이다.  
예를 들어 초기 랜더링 시점에는 실행되지 않고 update시점에만 실행되는 로직을 어떻게 useEffect를 이용해 구현할것인가? 하는 부분이다.  
이밖에 effect에 대한 개념과 함께 자세히 알아보자.

- componentDidUpdate 와 componentDidMount를 구분해야할 때.
- componentDidUpdate시에만 실행되는 로직이 필요할떄.


## sideEffect란?
React 컴포넌트가 화면에 렌더링된 이후에 비동기로 처리되어야 하는 부수적인 효과들을 흔히 Side Effect라고 일컽습니다. 대표적인 예로 어떤 데이터를 가져오기 위해서 외부 API를 호출하는 경우, 일단 화면에 렌더링할 수 있는 것은 먼저 렌더링하고 실제 데이터는 비동기로 가져오는 것이 권장됩니다. 요청 즉시 1차 렌더링을 함으로써 연동하는 API가 응답이 늦어지거나 응답이 없을 경우에도 영향을 최소화 시킬 수 있어서 사용자 경험 측면에서 유리하기 때문입니다.


## class Component에선?
componentDidMount, componentDidUpdate시점에 사이드 이팩트를 처리.


## cleanUp
왜 마운트 해제시점이 아니라 모든 리렌더링 시점에 실행이 될까?  
이는 componentUnMount가 아니라 effect에 대한 후처리 작업이라는 관점에서 이해하면 된다. 




## ref
- [a-complete-guide-to-useeffect](https://rinae.dev/posts/a-complete-guide-to-useeffect-ko#tldr-too-long-didnt-read---%ec%9a%94%ec%95%bd) 
- [useEffect](https://www.daleseo.com/react-hooks-use-effect/)
- [whatIsDifferentUseEffectAndComponentDidUpdate](https://linguinecode.com/post/react-componentdidupdate-vs-useeffect) 