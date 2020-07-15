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
