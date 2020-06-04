# Data Fetch

## TODO

```jsx

// React Cache for simple data fetching (not final API)
import {unstable_createResource} from 'react-cache';

// Tell React Cache how to fetch your data
const TodoResource = unstable_createResource(fetchTodo);

function Todo(props) {  
  // Suspends until the data is in the cache
  const todo = TodoResource.read(props.id);
  return <li>{todo.title}</li>;
}

function App() {  
  return (
    // Same Suspense component you already use for code splitting
    // would be able to handle data fetching too.
    <React.Suspense fallback={<Spinner />}>
      <ul>
        {/* Siblings fetch in parallel */}
        <Todo id="1" />
        <Todo id="2" />
      </ul>
    </React.Suspense>
  );
}
```


## REF
- [The One with Suspense for Data Fetching](https://reactjs.org/blog/2018/11/27/react-16-roadmap.html#react-16x-mid-2019-the-one-with-suspense-for-data-fetching)