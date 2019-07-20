import React, { useState } from 'react';

export default function Count() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button
        onClick={() => setCount(count + 1)}
        style={{ padding: '5px 20px' }}
      >
        +
      </button>
      <span style={{ padding: 10 }}>{count}</span>
      <button
        onClick={() => setCount(count - 1)}
        style={{ padding: '5px 20px' }}
      >
        -
      </button>
    </div>
  );
}
