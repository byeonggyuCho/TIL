# Toast Grid

## 셀병합 코드

- rowspan 적용방법
- 각 row에 개별적인 class지정방법
- 각 row별 column에 class지정 방법
- `_extradata`속성 참고

```js

const gridData = [
	 {
        name: 'Beautiful Lies',
        artist: 'Birdy',
        release: '2016.03.26',
        type: 'Deluxe',
        genre: 'Pop'
      },
      {
        name: 'X',
        artist: 'Ed Sheeran',
        release: '2014.06.24',
        type: 'Deluxe',
        genre: 'Pop',
        _attributes: {
          disabled: true // A current row is disabled
        }
      },
      {
        name: 'Moves Like Jagger',
        release: '2011.08.08',
        artist: 'Maroon5',
        type: 'Single',
        genre: 'Pop,Rock',
        _attributes: {
          checkDisabled: true // A checkbox is disabled only
        }
      },
      {
        name: 'A Head Full Of Dreams',
        artist: 'Coldplay',
        release: '2015.12.04',
        type: 'Deluxe',
        genre: 'Rock',
        _attributes: {
          checked: true, // A checkbox is already checked while rendering
          className: { // Add class name on a row
            row: ['red']
          }
        }
      },
      {
        name: '19',
        artist: 'Adele',
        release: '2008.01.27',
        type: 'EP',
        genre: 'Pop,R&B',
        _attributes: {
          rowSpan: { // Merge rows
            artist: 3,
            genre: 2
          }
        }
      },
      {
        name: '21',
        artist: 'Adele',
        release: '2011.01.21',
        type: 'Deluxe',
        genre: 'Pop,R&B'
      },
      {
        name: '25',
        artist: 'Adele',
        release: '2015.11.20',
        type: 'EP',
        genre: 'Pop',
        _attributes: {
          className: { // Add class name on each columns
            column: {
              type: ['blue'],
              genre: ['blue']
            }
          }
        }
      }
    ];

 const grid = new tui.Grid({
    el: document.getElementById('grid'),
    data: gridData,
    scrollX: false,
    scrollY: false,
    columns: [
      {
        header: 'Name',
        name: 'name'
      },
      {
        header: 'Artist',
        name: 'artist'
      },
      {
        header: 'Type',
        name: 'type'
      },
      {
        header: 'Release',
        name: 'release'
      },
      {
        header: 'Genre',
        name: 'genre'
      }
    ]
  });
}
```

```js
var sample = [
  {
    approval_id: "1",
    price: "10000/9000",
    payment_date: "2020년 7월 24일",
    receipt: "보기",
    rowKey: 0,
    sortKey: 0,
    uniqueKey: "@dataKey1595722321395-0",
    _attributes: {
      rowNum: 1,
      checked: false,
      disabled: false,
      checkDisabled: false,
      className: {
        row: [],
        column: {},
      },
    },
    _disabledPriority: {},
    rowSpanMap: {},
    _relationListItemMap: {},
  },
  {
    approval_id: "2",
    price: "10000/9000",
    payment_date: "2020년 7월 24일",
    receipt: "보기",
    rowKey: 1,
    sortKey: 1,
    uniqueKey: "@dataKey1595722321395-1",
    _attributes: {
      rowNum: 2,
      checked: false,
      disabled: false,
      checkDisabled: false,
      className: {
        row: [],
        column: {},
      },
    },
    _disabledPriority: {},
    rowSpanMap: {},
    _relationListItemMap: {},
  },
  {
    approval_id: "3",
    price: "10000/9000",
    payment_date: "2020년 7월 24일",
    receipt: "보기",
    rowKey: 2,
    sortKey: 2,
    uniqueKey: "@dataKey1595722321395-2",
    _attributes: {
      rowNum: 3,
      checked: false,
      disabled: false,
      checkDisabled: false,
      className: {
        row: [],
        column: {},
      },
    },
    _disabledPriority: {},
    rowSpanMap: {},
    _relationListItemMap: {},
  },
  {
    approval_id: "4",
    price: "10000",
    payment_date: "2020년 7월 24일",
    receipt: "보기",
    rowKey: 3,
    sortKey: 3,
    uniqueKey: "@dataKey1595722321395-3",
    _attributes: {
      rowNum: 4,
      checked: false,
      disabled: false,
      checkDisabled: false,
      className: {
        row: [],
        column: {},
      },
    },
    _disabledPriority: {},
    rowSpanMap: {},
    _relationListItemMap: {},
  },
  {
    approval_id: "5",
    price: "10000/9000",
    payment_date: "2020년 7월 24일",
    receipt: "보기",
    rowKey: 4,
    sortKey: 4,
    uniqueKey: "@dataKey1595722321395-4",
    _attributes: {
      rowNum: 5,
      checked: false,
      disabled: false,
      checkDisabled: false,
      className: {
        row: [],
        column: {},
      },
    },
    _disabledPriority: {},
    rowSpanMap: {},
    _relationListItemMap: {},
  },
  {
    approval_id: "6",
    price: "10000",
    payment_date: "2020년 7월 24일",
    receipt: "보기",
    rowKey: 5,
    sortKey: 5,
    uniqueKey: "@dataKey1595722321395-5",
    _attributes: {
      rowNum: 6,
      checked: false,
      disabled: false,
      checkDisabled: false,
      className: {
        row: [],
        column: {},
      },
    },
    _disabledPriority: {},
    rowSpanMap: {},
    _relationListItemMap: {},
  },
  {
    approval_id: "7",
    price: "10000/9000",
    payment_date: "2020년 7월 24일",
    receipt: "보기",
    rowKey: 6,
    sortKey: 6,
    uniqueKey: "@dataKey1595722321395-6",
    _attributes: {
      rowNum: 7,
      checked: false,
      disabled: false,
      checkDisabled: false,
      className: {
        row: [],
        column: {},
      },
    },
    _disabledPriority: {},
    rowSpanMap: {},
    _relationListItemMap: {},
  },
  {
    approval_id: "8",
    price: "10000/9000",
    payment_date: "2020년 7월 24일",
    receipt: "보기",
    rowKey: 7,
    sortKey: 7,
    uniqueKey: "@dataKey1595722321395-7",
    _attributes: {
      rowNum: 8,
      checked: false,
      disabled: false,
      checkDisabled: false,
      className: {
        row: [],
        column: {},
      },
    },
    _disabledPriority: {},
    rowSpanMap: {},
    _relationListItemMap: {},
  },
  {
    approval_id: "9",
    price: "50000",
    payment_date: "2020년 7월 24일",
    receipt: "보기",
    rowKey: 8,
    sortKey: 8,
    uniqueKey: "@dataKey1595722321395-8",
    _attributes: {
      rowNum: 9,
      checked: false,
      disabled: false,
      checkDisabled: false,
      className: {
        row: [],
        column: {},
      },
    },
    _disabledPriority: {},
    rowSpanMap: {},
    _relationListItemMap: {},
  },
  {
    approval_id: "10",
    price: "10000/9000",
    payment_date: "2020년 7월 24일",
    receipt: "보기",
    rowKey: 9,
    sortKey: 9,
    uniqueKey: "@dataKey1595722321395-9",
    _attributes: {
      rowNum: 10,
      checked: false,
      disabled: false,
      checkDisabled: false,
      className: {
        row: [],
        column: {},
      },
    },
    _disabledPriority: {},
    rowSpanMap: {},
    _relationListItemMap: {},
  },
];
```
