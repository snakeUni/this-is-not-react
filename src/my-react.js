const React = (function() {
  function useState(initialValue) {
    let value = initialValue;
    const setValue = newValue => {
      value = newValue;
    };
    return [value, setValue];
  }
  return { useState };
})();
