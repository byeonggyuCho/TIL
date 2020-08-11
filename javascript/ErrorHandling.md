# Error Handling

## intro

에러 핸들링을 어떻게 해야하는가?  
언제 try catch를 묶어야하는가?  
어떻게 해야 error추적이 용이하며 쉬운가?  
javascript에 최적화된 error 핸들링이란?

```js
class Exception extends Error {
  constructor(message) {
    this.message = message;
  }
}

class NoCrnException extends Exception {}
class InvalidRequestException extends Exception {}

const foo = (param) => {
  try {
    throw new InvalidRequestException("no...param...");
  } catch (e) {
    if (e instanceof NoCrnException) {
      console.log("No Crn~~~");
    } else if (e instanceof InvalidRequestException) {
      console.log(e.message);
    }
  }
};

foo();
```
