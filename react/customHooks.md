
```jsx
import React, { useState, useEffect } from 'react';

function useChangeInput({ initialValue, onChange = () => {} }) {
  const [value, setValue] = useState('');

  const handleChange = value => {
    setValue(value);
    onChange(value);
  };

  useEffect(() => {
    setValue(initialValue);
    return () => {
      setValue('');
    };
  }, [initialValue]);
  
   
  return {
    value, 
    handleChange, 
  };
}

// 커스텀 훅을 사용할 컴포넌트
function SampleInput() {
  const {
    value,
    handleChange,
  } = useChangeInput({  // custom hook을 호출해서 상태 관리에 필요한 값을 가져온다
    initialValue: '',
  });

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
    />
  );
}
```