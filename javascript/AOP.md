# Aspect-oriented programming with JavaScript

## Info 

aspect.js 라이브러리를 이용한 AOP구현.  
BookCollection.getNameByISBN호출 이후에 로그를 남기는 시나리오.

## 연관주제
- proxy



```js
class BookCollection extends Collection {
    ...
    getNameByISBN(isbn) {
        return this.get({
            isbn: isbn
        }, {
            cache: true,
            onSuccess: 'name'
            onFail: null,
            log: {
                message: 'Retrieving Book {} - {} has been succeed',
                params: ['isbn', 'name'],
                level: 'info'
            },
            ...
        });
    }
    ...
}

```



```js
class LoggerAspect {
    ...
    @afterMethod({
        methodNamePattern: /^getNameByISBN$/,
        classNamePattern: /^BookCollection$/
    })
    afterGetNameByISBN(meta) {
        let result = meta.method.result;
        Logger.info(`Retrieving ${result.isbn} - ${result.name} has been succeed`);
    }
    ...
}

@Wove
class BookCollection {
    ...
    getNameByISBN(id, article) {
        return this.get({
            isbn: isbn
        }, {
            cache: true,
            onSuccess: 'name'
            onFail: null
        });
    }
    ...
}

```
`BookCollection`은 데이터를 가져오는데 집중하고, 로그는 완벽히 분리된 클래스에서 수행한다.



```js
class CacheAspect {
    ...
    @beforeMethod({
        methodNamePattern: /^get.*/,
        classNamePattern: /^[Book|User]Collection$/
    })
    beforeGet(meta, args) {
        let key = `${meta.name}:${args.join()}`;
        let method = meta.method;
        method.proceed = true;
        if (this.cache.hasOwnProperty(key)) {
            method.result = this.cache[key];
            method.proceed = false;
        }
    }
    ...
}

@Wove
class BookCollection {
    ...
    getNameByISBN(id, article) {
        return this.get({
            isbn: isbn
        }, {
            onSuccess: 'name'
            onFail: null
        });
    }
    ...
}

```
캐쉬처리에 대한 예제.


### REF
- https://meetup.toast.com/posts/109
- https://github.com/mgechev/aspect.js