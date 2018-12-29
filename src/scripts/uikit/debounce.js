module.exports = {
  debounce: (func, wait, context = this) => {
    let timeout = null;
    return function (...args) {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => func.apply(context, args), wait);
    }
  }
}