# Symbol

symbol()함수는 심볼형식의 값을 반봔하는데 이 심볼은 내장 객체의 여러 멤버를 가리키는 정적 프로퍼티와 전역 심볼 레이스트리를 가리키는 정적 메소드를 가진다.

Sybol()로 부터 반환되는 모든 심볼 값은 고유합니다. 심볼 값은 객체 프로퍼티에 대한 식별자로 사용될 수 있습니다. 이것이 심볼 뎅티터 형식을 사용하는 이유입니다. 

심볼 데이터형은 원시 데이터 형의 일종입니다.

    const symbol1 = Symbol();
    const symbol2 = Symbol(42);
    const symbol3 = Symbol('foo');
    
    console.log(typeof symbol1);
    // expected output: "symbol"
    
    console.log(symbol3.toString());
    // expected output: "Symbol(foo)"
    
    console.log(Symbol('foo') === Symbol('foo'));
    // expected output: false

## REF

[https://infoscis.github.io/2018/01/27/ecmascript-6-symbols-and-symbol-properties/](https://infoscis.github.io/2018/01/27/ecmascript-6-symbols-and-symbol-properties/)