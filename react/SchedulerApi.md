# Scheduler API

## TODO

## intro
별도로 설정하지 않아도 React는 업데이트 우선순위를 설정한다. 그러나 보다 자세하게 스케줄링을 제어해야 한다면 Scheduler API의 사용을 고려할 수 있다. 하지만 관련된 API가 모두 완성된 상태가 아니므로 아직은 신중하게 사용해야 한다.

## When?
다음과 같은 경우에는 Scheduler API를 사용할 필요가 없다.
- react-dom 이벤트 핸들러를 사용하고 있다면 Scheduler API를 사용할 필요가 없다.
- 이벤트에 응답하기 위해 React를 사용할 때에는 Scheduler API를 사용할 필요가 없다. state 변화를 큐에 넣을 때 적절한 우선순위가 지정된다.


## 우선순위가 낮은 작업의 스케줄링 - scheduler.scheduleCallback() 함수

## 우선순위가 높은 작업의 스케줄링 - ReactDOM.flushSync() 함수