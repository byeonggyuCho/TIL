# Gulp
![](/resource/img/nodeJs/gulp.png)

## Intro

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



## 1. 폴더구조
1. src  (soruce)
가공 대상 파일이 들어간다. 아무런 처리를 하지 않은 javascript, 압축하지 않은 css 최적화하지 않은 이미지 등이 될 수 있다.
2. dist (distribution)  
Gulp에 의해 빌드된 파일이 들어가게 된다.

3. gulpfile.js  
gulpfile.js파일은 Gul의 설정이 담겨지게 된다.




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
경로 앞에 `!`(느낌표)를 붙이는것은 해당파일을 포함하지 않겠다는 의미이다.  

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


### 2.5 Gulp Plug-iin
1. gulp-webserver : 웹서버처럼 동작하게 하는 프러려그인.
2. gulp-concat : js 파일 병합을 위한 플러그인
3. gulp-uglify : js 파일 압축을 위한 플러그인
4. gulp-minify-html : html파일 minify를 위한 플러그인
5. gulp-ssas : ssas파일을 컴파일 하기 위한 플러그인
6. gulp-livereload : 웹 브라우저를 리로드하기 위한 플러그인.




      


## 3. SAMPLE
(이곳)[https://programmingsummaries.tistory.com/356?category=700959]에서 발췌한  Gulp 셈플을 추가한다.


```js
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyhtml = require('gulp-minify-html');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');

var src = 'public/src';
var dist = 'public/dist';

var paths = {
	js: src + '/js/*.js',
	scss: src + '/scss/*.scss',
	html: src + '/**/*.html'
};


// 웹서버를 localhost:8000 로 실행한다.
gulp.task('server', function () {
	return gulp.src(dist + '/')
		.pipe(webserver());
});

// 자바스크립트 파일을 하나로 합치고 압축한다.
gulp.task('combine-js', function () {
	return gulp.src(paths.js)
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(gulp.dest(dist + '/js'));
});

// sass 파일을 css 로 컴파일한다.
gulp.task('compile-sass', function () {
	return gulp.src(paths.scss)
		.pipe(sass())
		.pipe(gulp.dest(dist + '/css'));
});

// HTML 파일을 압축한다.
gulp.task('compress-html', function () {
	return gulp.src(paths.html)
		.pipe(minifyhtml())
		.pipe(gulp.dest(dist + '/'));
});

// 파일 변경 감지 및 브라우저 재시작
gulp.task('watch', function () {
	livereload.listen();
	gulp.watch(paths.js, ['combine-js']);
	gulp.watch(paths.scss, ['compile-sass']);
	gulp.watch(paths.html, ['compress-html']);
	gulp.watch(dist + '/**').on('change', livereload.changed);
});

//기본 task 설정
gulp.task('default', [
	'server', 'combine-js', 
	'compile-sass', 'compress-html', 
	'watch' ]);

```


### 후기.
배포자동화를 연습해보기 위해서 빌드자동화 도구를 다뤄보고 싶었다. Grunt는 장황했고 webpack은 너무 복잡하게 느껴졌다. 
나와 같은 개발자들에게 빌드 자동화도구를 캐주얼한 마음으로 연습해 볼 수 있는게 Gulp가 아닐까하는 생각이 든다. 
Gulp의 연관 플러그인으로 빌드 자동화를 연습해보다가 좀더 트랜드하고 디테일한 작업이 필요해졌을때 webpack에 대해 알아보는게 어떨까?

### REF
- [Gulp입문하기](https://programmingsummaries.tistory.com/356?category=700959)
- [Gulp4.0](https://programmingsummaries.tistory.com/387)
- [프론트엔드를 위한 gulp](https://github.com/FEDevelopers/tech.description/wiki/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B0%9C%EB%B0%9C%EC%9D%84-%EC%9C%84%ED%95%9C-Gulp)
- [Gulpjs.com](https://gulpjs.com/)
- [Gulp for beginners](https://css-tricks.com/gulp-for-beginners/)