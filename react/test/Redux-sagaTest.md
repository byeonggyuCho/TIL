# Redux-Saga 테스트 코드 작성하기

## saga-test

- redux-saga-test-plan를 이용한 테스트

```js
export function* initializeAddresses() {
  try {
    yield put(loadingActions.start(DEBIT_CARD_ISSUE_SHIPPING));

    const { home, biz }: IUserProfile = yield call(fetchProfile);
    const [isDisableHome, isDisableBiz] = yield all([
      call(check, { code: home.code }),
      call(check, { code: biz.code }),
    ]);

    yield put(debitCardIssueShippingActions.setAddresses({ home, biz }));

    if (isDisableHome && isDisableBiz) {
      yield put(
        debitCardIssueActions.setView({
          selectedAddress: AddressType.ETC,
        })
      );
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(loadingActions.finish(DEBIT_CARD_ISSUE_SHIPPING));
  }
}
```

```js
test("run initializeAddresses initialize disable address and setView", async (done) => {
  // Given
  const homeAddress = { cityCode: "123" };
  const bizAddress = { cityCode: "345" };

  // When
  const { effects } = await expectSaga(initializeAddresses)
    .provide([
      [matchers.call.fn(fetchProfile), { home, biz }],
      [matchers.call.fn(checkAvailableDelivery), true],
    ])
    .put(loadingActions.start("DebitCardIssueShipping"))
    .call.fn(fetchProfile)
    .call.fn(checkAvailableDelivery)
    .call.fn(checkAvailableDelivery)
    .put.actionType("DebitCardIssueShipping/setAddresses")
    .put.actionType("DebitCardIssue/setView")
    .put(loadingActions.finish("DebitCardIssueShipping"))
    .run(false);

  // Then
  expect(effects).toEqual({});
  done();
});
```

## REF

- [ Redux-saga 테스트 코드 작성하기](https://medium.com/@sangboaklee/redux-saga-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%BD%94%EB%93%9C-%EC%9E%91%EC%84%B1%ED%95%98%EA%B8%B0-1fc13f7fd279)

- [saga-handbook](https://mskims.github.io/redux-saga-in-korean/advanced/Testing.html)
