# environment variable

## 환경변수 셋팅방법

1.  EnvironmentPlugin,

```js
new webpack.EnvironmentPlugin({
  NODE_ENV: "development",
  DEBUG: false,
});
```

2.  Defineplugin

```js
new webpack.DefinePlugin({
  "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
  "process.env.DEBUG": JSON.stringify(process.env.DEBUG),
});
```
