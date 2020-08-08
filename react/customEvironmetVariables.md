# Adding Custom Environment Variables

## intro

## dotenv

.env 파일로 환경설정을 하게 해주는 패키지다.

## REACT에서 process.env에 환경변수 추가하기

```js
 new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          PAYPLE_URL: JSON.stringify(process.env.PAYPLE_URL),
        },

      }),

```

`DefinePlugin`플러그인에 추가하면 된다.

## Creact React App에서는 REACT_APP을 붙여야한다.

### Example

.env

```
REACT_APP_NODE_ENV=development
REACT_APP_PROXY_HOST=localhost
REACT_APP_PROXY_PROTOCOL=http
REACT_APP_PROXY_PORT=4000
```

```js
process.env.NODE_ENV = product;
```

## ref

- [(CRA) Adding Custom Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
