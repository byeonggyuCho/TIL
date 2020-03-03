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



const compress = (str) => {

    let result = str[0];
    let target = str[0];
    let count = 0;
    for (c of str){
        if(target === c){
            ++count;
        }else{
            target = c;
            result += count + c;
            count = 1
        }
    }

    result += count

    return result;
}

const decompress = (str) => {

    // 문자열타입 숫자
    const isStrNumber = (str) => isNaN(parseInt(str)) === false

    // 갯수만큼 덫붙여서 출력
    const repaetString = (str, count) => {

        count =  parseInt(count);
        const targetChar = str;
        let result = "";
    
        for (let i =0; i<count; i++) {
            result += targetChar
        }
    
        return result;
    }

    let count = "";
    let result = "";
    let target = str[0];

    for (c of str) {

        if(isStrNumber(c)){
            count += c;
        }else{
            result += repaetString(target,count)
            count = "";
            target = c;
        }
    }
    result += repaetString(target,count)

    return result
}



/**
 * case1) 압출 풀기
 * case2) 압축 하기
*/
test('comp: AAAABBBCC', function () {
    expect(compress("AAAABBBCC")).toBe("A4B3C2");
})

test('comp: DDAEWSSQEE', function () {
    expect(compress("DDAEWSSQEE")).toBe("D2A1E1W1S2Q1E2");
})

test('decomp: A4B3C2', function () {
    expect(decompress("A4B3C2")).toBe("AAAABBBCC");
})

test('decomp: D2A1E1W1S2Q1E2', function () {
    expect(decompress("D2A1E1W1S2Q1E2")).toBe("DDAEWSSQEE");
})
/*
test('repeatString', function () {
    expect(repaetString('A','5')).toBe("AAAAA");
})


test('isStrNumber - "A"', function () {
    expect(isStrNumber('A')).toBe(false);
})

test('isStrNumber - "5"', function () {
    expect(isStrNumber('5')).toBe(true);
})
*/
```