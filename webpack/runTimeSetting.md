1. 난독화
2. 코드분할
3. 아축
4. 캐싱

## optimization

```js
    optimization: {
       minimize: true/false, //UglifyJsPlugin을 계승
       minimizer: [], //TerserWebpackPlugin 추가 예정
       splitChunks: {}, //CommonsChunkPlugin을 계승
       concatenateModules: true,
       //ModuleConcatenationPlugin을 계승
  }
```

## 코드 분리

- https://velog.io/@lllen/Webpack-z1tdfqep
