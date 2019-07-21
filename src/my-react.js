const React = (function() {
  const hooks = [];
  const deps = [];
  let idx = 0;
  // useState 实现
  function useState(initialValue) {
    let value = hooks[idx] || initialValue;
    const setValue = newValue => {
      hooks[idx] = newValue;
    };
    idx++;
    return [value, setValue];
  }
  // useEffect
  function useEffect(callback, dep) {
    const oldDep = deps[idx];
    let hasChanged = true;
    if (oldDep) {
      hasChanged = dep.some((d, i) => !Object.is(d, oldDep[i]));
    }
    if (hasChanged) callback();
    deps[idx] = dep;
  }

  function render(Component) {
    const result = Component();
    result.render();
    idx = 0;
    return result;
  }

  return { useState, useEffect, render };
})();

function Component() {
  const [count, setCount] = React.useState(0);
  return {
    render: () => console.log('render count', count),
    click: () => setCount(count + 1)
  };
}
