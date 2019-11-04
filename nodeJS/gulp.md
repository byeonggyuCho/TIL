# Gulp
![](/resource/img/nodeJs/gulp.png)

## 1.Intro

Stream기반의 빌드 자동화 도구.  
프론트엔드 작업을 하며 하게되는 병합 압축등의 웹 리소스 최적화 작업을 손쉽게 할 수 있다.  
GULP를 이용하면 다음의 작업이 손쉽게 해결 가능하다.


**STREAM**  
요청 후 한번에 결과를 받는 것이 아니라 이벤트로 중간중간 전달받는 방식  
pipe에 다라 task가 연결되어 흘러가며 병렬적으로 동시에 여러 task가 수행된다.
node.js 기반의 task 

**CSS**  
- 모든 SCSS를 CSS로 컴파일한다.
- 브라우저 지원을 위해 자동접두사를 추가한다.
- 사용하는 써드파이 모듈/패키지로부터 CSS를 가져온다.
- CSS 병합, 압축(최소화)

**자바스크립트**  
- ES6로 작성된 자바스크립트를 브라우저 지원을 위해 트랜스파일.
- 써드파티 모듈/패키지로부터 자바스크립트를 가져옴
- 자바스크립트 난독화
- HTML별로 인라인해야할 자바스크립트를 가져온다.


**라이브 리로딩**  
- CSS/SCSS가 변경되면 곧장 브라우져는 페이지 로드 없이 화면을 다시 그린다.
- 자바 스크립트가 변경되면 브라우져가 페이지를 다시 로딩한다.
- Twig/HTML 템플릿이 변경되면 브라우져는 페이지를 다시 로딩한다.

**ETC**  
- 웹 사이트를 위해 CriticalCSS를 생성한다.
- 웹 접근성 검사.
- 하나의 소스 이미지로 부터 웹사이트를 위한 다양한 파비콘을 생성한다.
- imagemin을 통해 웹사이트에서 사용하는 이미지를 무손신랍축





## 2.문법


### 2.1 task
```js
gulp.task(name, deps, func)
```

1. name  
타스트의 이름, 이름에 공백이 있으면 안된다.

2. deps  
현재 선언하고 있는 task를 수행하기 전에 실행되어야할 선행 task배열.
두번째 파라미터는 생략이 가능하다.

3. func  
실제 수행할 task의 내용을 정의하는 function


### 2.2 src
```js
gulp.src(files);
gulp.src([
    'src/js/**/*.js'
    '!src/js/config/env.js'
    ]);
```
파일이나 파일의 경로들이 포함된 배열또는 스트링이다.  
와일드카드 형태의 표현이 가능하다.  
경로 앞에 느낌표를 붙이는것은 해당파일을 포함하지 않겠다는 의미이다.  

### 2.3 pipe
```js
gulp.pipe();
```
task들의 결과물들을 function들에게 전달해 줄 수 있다.


```js
gulp.src('src/js/*.js')
    .pipe(striptDebug())
    .pipe(uglify())
    .pipe(concat('script.js'))
    .pipe(gulp.dest('public/dist/js'));
```
위 코드는 다음과 같이 동작한다.

1. 해당 경로의 모든  js파일을 긁어온다.
2. 그 파일들을 sriptDebug에게 파이핑한다.
3. striptDebug는 모든 console.log와 alert를 지운다.
4. 그런 다음 uglify로 파이핑한다.
5. uglify는 js를 압축한다.
6. concat()은 모든 js파일을 하나(script.js)로 병합한다.
7. gulp.dest()는 해당 경로에 output파일을 쓴다.

디버깅 소스제거, 파일 병합의 일련과정을 한번에 실행했다.


### 2.4 defult
```js
gulp.task('default',[])
```
gulp.task('default',[])는 커맨드 라인에 아무런 argument없이 gulp를 실행했을때 실행되는 default task이다.


```
$  gulp task-name
```
만일 특정 타스크를 실핼하고 싶다면 이렇게 하면된다.



      


## 3. SAMPLE
다음 소스는 http://blog.hkwon.me/draw-korean-map-chart-with-geojson/에서 발췌한 소스이다.
지형 데이터 (.shp)파일을 json형식으로 가공하는데 필요한 일련의 작업들을 처리한다.
작업 내용은 다음과 같다.
1. shape 파일 축소
2. geoJSON파일로 변환
3. 행정구역별로 분해
등의 작업을 한번에 할 수 있다.

```js
'use strict';

var fs = require("fs");

var gulp  = require('gulp'),  
    gutil = require('gulp-util'),
    clean = require('gulp-clean'),
    exec  = require('child_process').exec,
    _     = require('lodash'),
    iconv = require('iconv-lite');

var shpPath = {  
    ctprvn : {
        source : 'src/CTPRVN/TL_SCCO_CTPRVN.shp',
        convert : 'src/CTPRVN/TL_SCCO_CTPRVN_CONVERT.shp',
        json : 'dist/ctprvn.json'
    },
    sig : {
        source : 'src/SIG/TL_SCCO_SIG.shp',
        convert : 'src/SIG/TL_SCCO_SIG_CONVERT.shp',
        json : 'dist/sig.json'
    },
    emd : {
        source : 'src/EMD/TL_SCCO_EMD.shp',
        convert : 'src/EMD/TL_SCCO_EMD_CONVERT.shp',
        json : 'dist/emd.json'
    }
}
gulp.task('default', ['convert']);

gulp.task('clean-shp', function() {  
    return gulp.src(['dist/*.json', 'src/**/*_CONVERT.*'])
        .pipe(clean());
});

gulp.task('clean-split', function() {  
    if (!fs.existsSync('dist/sig')){
        fs.mkdirSync('dist/sig');
    }

    if (!fs.existsSync('dist/emd')){
        fs.mkdirSync('dist/emd');
    }

    return gulp.src(['dist/sig/*.json', 'dist/emd/*.json'])
        .pipe(clean());
});

console.log(1)

gulp.task('convert', ['clean-shp'], function() {  
    for (var key in shpPath) {
        console.log('==========');

        mapshaper(key, shpPath[key].source);
    }
});




gulp.task('split', ['clean-split'], function() {  
    
    // 시군구 geojson 생성
    splitGeojson('sig');

    // 동 geojson 생성
    splitGeojson('emd');
});

function mapshaper(key) {  
    var command = 'mapshaper -i '
                + shpPath[key].source
                + ' encoding=euc-kr -simplify weighted 0.5% -o format=shapefile '
                + shpPath[key].convert;

    console.log(command);

    exec(command, function (error, stdout, stderr) {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }

        console.log(stdout);
        console.log(stderr);
        console.log('=> convert size')
        console.log('%s : %d bytes', shpPath[key].source,  fs.statSync(shpPath[key].source).size);
        console.log('%s : %d bytes', shpPath[key].convert, fs.statSync(shpPath[key].convert).size);
        console.log('=>')

        ogr2ogr(key);
    });
}

function ogr2ogr(key) {  
    var command = 'ogr2ogr -f GeoJSON -t_srs epsg:4326 '  //-lco COORDINATE_PRECISION=3
                + shpPath[key].json
                +' '+ shpPath[key].convert;

    console.log(command);

    exec(command, function (error, stdout, stderr) {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }

        console.log(stdout);
        console.log(stderr);
        console.log('=> convert json size')
        console.log('%s : %d bytes', shpPath[key].json, fs.statSync(shpPath[key].json).size);
        console.log('=>')
    });
}

function splitGeojson(type) {  
    console.log("\n *Split geoJSON START* \n");
    console.log(type);

    var fileName = shpPath[type].json;
    //var exception = [ "47940" ];
    var exception = [];

    // 시군구 데이터 sido 별로 자르기
    var contents = fs.readFileSync(fileName);
    var features ={};
    contents = iconv.decode(contents, 'utf-8');

    var jsonContent = JSON.parse(contents);

    for (var key in jsonContent.features) {
        var feature = jsonContent.features[key];
        var subKey, cd, name;

        if (type == 'sig') {
            cd = feature.properties.SIG_CD;
            name = feature.properties.SIG_KOR_NM;
            subKey = feature.properties.SIG_CD.substr(0, 2);
        } else if (type == 'emd') {
            cd = feature.properties.EMD_CD;
            name = feature.properties.EMD_KOR_NM;
            subKey = feature.properties.EMD_CD.substr(0, 5);
        }

        console.log(`feature.properties.cd: ${cd}, feature.properties.name: ${name}`);

        if (features.hasOwnProperty(subKey)) {
            if (!_.has(exception, cd)) {
                features[subKey].push(feature);
            }
        } else {
            features[subKey] = [];

            if (!_.has(exception, cd)) {
                features[subKey].push(feature);
            }
        }
    }

    for (var key in features) {
        var featuresCollection = _.template('{"type": "FeatureCollection", "features": [ \
                <% _.forEach(iterator, function(val, index, list) { %> \
                \n  <%= JSON.stringify(val) %><% \
                if (index < list.length - 1) { \
                %>, <% \
                } \
                }); %> \
            \n]}');

        var jsonStr = featuresCollection({
            'iterator': features[key]
        });

        // split json파일 생성
        fs.writeFileSync("dist/" + type + "/" + key + ".json", jsonStr);
    }

    console.log("\n *EXIT* \n");
}



/*
 "devDependencies": {
    "gulp": "^3.9.1",
    "gulp-clean": "^0.3.2",
    "gulp-exec": "^2.1.3",
    "gulp-util": "^3.0.8",
    "iconv-lite": "^0.4.17",
    "lodash": "^4.17.4"
  }
*/

```

### REF
- [프론트엔드를 위한 gulp](https://github.com/FEDevelopers/tech.description/wiki/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B0%9C%EB%B0%9C%EC%9D%84-%EC%9C%84%ED%95%9C-Gulp)
- [Gulpjs.com](https://gulpjs.com/)
- [Gulp for beginners](https://css-tricks.com/gulp-for-beginners/)