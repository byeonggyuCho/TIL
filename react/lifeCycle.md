# LifeCycle

![](../resource/img/react/react_lifeCycle2.png)


## 1.Initialization
컴포넌트의 초기 상태값(state)및 props를 세팅할 준비를 합니다.

## 2.Mounting
컴포넌트가 브라우저 DOM에 mount될 준비가 되었습니다.  
이 단계에서 `componentWillMount`와 `componentDidMount`를 사용할 수 있습니다.  

## 3.Updating
새로운 props를 보내거나 state를 업데이트하여 component를 두가지 방법으로 update할 수 있습니다.  
이 단계에서는 `shouldComponentUpdate`,`componentWillUpdate`, `componentDidUPdate`를 사용할 수 있습니다.  

## 4.Unmounting
브라우저 DOM에서 컴포넌트가 필요하지 않을때 mount를 해제시킵니다. 
이 단계에서는 `componentWillUnmount`를 사용할 수 있습니다.  


## Life cycle method

### componentWillMount
렌더링 되기전에 실행됩니다.  

### compoenentDidMount
첫 렌더링 후에 실행됩니다. 이 단계에서 모든 비동기요청 및 DOM 또는 State의 update, event listener가 설정되어야 합니다.  

### shouldCompnentUpdate
컴포넌트의 업데이트 여부를 결정합니다. 기본적으로 return 값은 true입니다.  
state또는 pops가 업데이트 된 후에 컴포넌트를 render할 필요가 없을 경우 false를 반환할 수 있습니다.  
컴포넌트가 새로운 props를 받으면서 생기는 re-render를 막을 수 있습니다.

### compoenentWillUpdate 
shouldCompnentUpdate에서 true가 반환되었을 때 state & props의 변화를 확인하고 re-rendering되기 전에 실행합니다.

### compenentDidUpdate
주로 props나 state 변경에 대한 response로 DOM을 업데이트할 떄 사용됩니다.  

### componentWillUnmount
네트워크 요청을 취소하거나 컴포넌트와 관련된 모든 이벤트 리스너를 제거하는데 사용합니다. 