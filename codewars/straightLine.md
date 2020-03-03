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



var isStraightLine = (...arg) => {

    const [p1, p2, ...rest] = arg;

    // 포멧 검증
    const isDot = (arr) => {
        const [x, y] = arr;

        return isNaN(x) ? false
            : isNaN(y) ? false
            : true
    }

    // 직선 방정식 반환
    const getEquation = (A, B) => {
        const [Ax, Ay] = A;
        const [Bx, By] = B;
        const slop = (By - Ay) / (Bx - Ax);
        const Y_intercept = slop*Ax - Ay;       // y 절편

        return (x) => slop*x + Y_intercept;
    }

    const equation = getEquation(p1,p2)


    return arg.every((dot) => {

        const [dx, dy] = dot;

        return isDot(dot)
            ? dy === equation(dx)
            : false
    })
}


/*
 TestCase 

case1) 직선
case2) 곡선
case3) 입력기준 미달
case3) 음수
case4) 같은 점 전달
*/
test('직선: (0,0) (1,1) (2,2)', function () {
    expect(isStraightLine([0,0], [1,1], [2,2])).toBe(true);
  })

test('곡선: (0,0) (1,1) (2,4), (3,9)', function () {
    expect(isStraightLine([0,0], [1,1], [2,4], [3,9])).toBe(false);
})

test('입력기준 미달: (0,0) (1) (2,4)', function () {
    expect(isStraightLine([0,0], [1], [2,4])).toBe(false);
})

test('점에 문자 전달: (0,0) ("a","b") (2,4)', function () {
    expect(isStraightLine([0,0], ["a","b"], [2,4])).toBe(false);
})

test('음수: (0,0) (-1,-1) (-2,-2)', function () {
    expect(isStraightLine([0,0], [-1,-1], [-2,-2])).toBe(true);
  })
```