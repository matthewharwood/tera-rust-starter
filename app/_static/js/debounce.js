function debounce(func, wait) {
  let timer;

  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

export {debounce}
