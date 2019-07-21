import './styles.css';
import { createElement, render } from './utils';

const React = (() => {
  let hooks = [];
  let idx = 0;
  function workLoop() {
    idx = 0;
    render(hooks)();
    setTimeout(workLoop, 300);
  }
  setTimeout(workLoop, 300);
  function useState(initVal) {
    let state = hooks[idx] || initVal;
    let _idx = idx;
    let setState = newVal => {
      hooks[_idx] = newVal;
    };
    idx++;
    return [state, setState];
  }
  function useRef(val) {
    return useState({ current: val })[0];
  }
  function useEffect(cb, depArray) {
    const oldDeps = hooks[idx];
    let hasChanged = true;
    if (oldDeps) {
      hasChanged = depArray.some((dep, i) => !Object.is(dep, oldDeps[i]));
    }
    if (hasChanged) cb();
    hooks[idx] = depArray;
  }
  return {
    useState,
    render: render(hooks),
    useEffect,
    useRef,
    createElement
  };
})();

function Component() {
  const [count, setCount] = React.useState(1);
  const list = useDogs(count);
  return (
    <main>
      <h1>
        {' '}
        This is <i>Not</i> React{' '}
      </h1>
      <button onClick={() => setCount(count + 1)}>Click me!!!! {count}</button>
      {list.map(item => (
        <img src={item} />
      ))}
    </main>
  );
}

function useDogs(count) {
  const [list, setList] = React.useState([]);
  React.useEffect(() => {
    fetch('https://dogceo.netlify.com/.netlify/functions/pics?count=' + count)
      .then(x => x.json())
      .then(x => setList(x));
  }, [count]);
  return list;
}

// var app = React.render(Component);
// app.click();
// var app = React.render(Component);
// app.type("Vue");
// var app = React.render(Component);

const rootElement = document.getElementById('root');
React.render(<Component />, rootElement);
