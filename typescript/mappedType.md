# Mapped Type

## intro
Mapped Type의 가장 일반적인 예는 `Readonly`와 `Partial`입니다. 

```ts
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
}
type Partial<T> = {
    [P in keyof T]?: T[P];
}

type PersonPartial = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;
```
구문을 자세히 살펴보면 for...in과 유사하게 동작합니다.

1. 변수타입 P는 각 프로퍼티에 차례대로 바인딩 됩니다.
2. 문자열 리터럴 유니온이 반환되는 `keyof T`는 반복할 프로퍼티의 이름을 포함합니다.
3. 우측의 `T[P]`는 매핑할 타입이 됩니다. 이 경우는 기존의 타입을 유지한다고 이해하면 됩니다.  


다른 예를 들어보겠습니다.  
입력받은 타입의 모든 속성에  null을 입력 가능하도록 하는 mapped Type입니다. 
```ts
type Nullable<T> = { [P in keyof T]: T[P] | null}

let p1 : Nullable<Person> = new Person();
p1.name = null; // good
```
모든 프로퍼티의 타입에 null타입을 유니온 타입으로 추가하여 이제 null이 가능해졌습니다.  

mapped type에서 새로운 프로퍼티를 추가하기 전에 기존의 프로퍼티를 복사한다.
예를 들어 Person.name이 읽이 전용인 경우 Partial<Person>.name이 읽기 전용이면서 선택적 값이 된다.



```ts
type Proxy<T> = {
    get(): T;
    set(value: T): void;
}
type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>;
}
function proxify<T>(o: T): Proxify<T> {
   // ... proxies 감싸기 ...
}
let proxyProps = proxify(props);

```


## mapped types추론
언래핑에 대한 것.
```ts
function unproxify<T>(t: Proxify<T>): T {
    let result = {} as T;
    for (const k in t) {
        result[k] = t[k].get();
    }
    return result;
}

let originalProps = unproxify(proxyProps);
```