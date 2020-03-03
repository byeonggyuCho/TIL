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

    const validDay = [0, 1, 2, 3, 4, 5, 6];
    const validHour = [23, 0, 1, 2, 3];
    const holliday = 6;

    const yesterday = day < 1 ? 6 : day - 1;

    // 근무시작요일
    const workDay = hourOfDay < 4 ? yesterday : day;


    if (!validDay.includes(day)) {
        return false;
    } else if (!validHour.includes(hourOfDay)) {
        return false;
    } else if (workDay === holliday) {
        return false;
    } else {
        return true
    }
}


/*
 TestCase 작성

 - 월 화 목 금 토 => 23 ~ 3
 - 수 => 22 ~ 3
 - 운행시간 외 시간 입력시 (ex. isServiceTime(0, 4))
 - 요일 0미만 또는 6초과를 입력시
 - 시간 0미만 또는 23초과를 입력시
*/

  
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