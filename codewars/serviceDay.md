```js

const test = (title, testCode) => {
    try {
      console.log(`\u001b[32m Test Case : \u001b[0m ${title} `)
      testCode();
    } catch (error) {
      console.error(`${title} ${error}`);
    }
  }
  
  const expect = (result) => {
    return {
      toBe: function (expected) {
        if (result !== expected) {
          throw new Error(result + ' is not equal to ' + expected);
        } else {
          console.info('Success')
        }
      }
    }
  }




const isServiceTime = (day, hourOfDay) => {

    const businessDays = [0, 1, 2, 3, 4, 5];
    const defaultBusinessHours = [23, 0, 1, 2, 3];    
    const wednesdayBusinessHours = [22, 23, 0, 1, 2, 3]; 
    const Wednesday = 2;

    const yesterday = day < 1 ? 6 : day - 1;
    // 근무시작일
    const businessDay = hourOfDay < 4 ? yesterday : day;

    // 근무요일의 영업시간
    const businessHours = businessDay === Wednesday 
                            ? wednesdayBusinessHours
                            : defaultBusinessHours

    return businessDays.includes(businessDay) 
            && businessHours.includes(hourOfDay)
}


/*
 TestCase 작성

 - 월 화 목 금 토 => 23 ~ 3
 - 수 => 22 ~ 3
 - 운행시간 외 시간 입력시 (ex. isServiceTime(0, 4))
 - 요일 0미만 또는 6초과를 입력시
 - 시간 0미만 또는 23초과를 입력시
*/

  test('일요일 23시', function () {
    expect(isServiceTime(6, 23)).toBe(false);
  })
  
  test('월요일 23시', function () {
    expect(isServiceTime(0, 23)).toBe(true);
  })
  
  test('월요일 0시', function () {
    expect(isServiceTime(0, 0)).toBe(false);
  })
  
  test('월요일 11시', function () {
    expect(isServiceTime(0, 11)).toBe(false);
  })
  
  test('수요일 23시', function () {
    expect(isServiceTime(2, 23)).toBe(true);
  })
  
  test('수요일 22시', function () {
    expect(isServiceTime(2, 22)).toBe(true);
  })
  
  test('-1요일 0시', function () {
    expect(isServiceTime(-1, 0)).toBe(false);
  })
  
  test('7요일 23시', function () {
    expect(isServiceTime(7, 23)).toBe(false);
  })
  
  test('월요일 -1시', function () {
    expect(isServiceTime(0, -1)).toBe(false);
  })
  
  test('월요일 25시', function () {
    expect(isServiceTime(0, 25)).toBe(false);
  })
```