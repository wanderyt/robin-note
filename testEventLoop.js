var log = console.log;

var promiseA = new Promise((resolve) => {
  log('promiseA');
  resolve();
}).then(() => {
  log('promiseA - then')
}).then(() => {
  log('promiseA - then - then')
});

var promiseB = new Promise((resolve) => {
  log('promiseB');
  resolve();
}).then(() => {
  log('promiseB - then')
}).then(() => {
  log('promiseB - then - then')
});

var throttle = function (fn, timeFrame) {
  let previous = new Date();
  return (...args) => {
    let now = new Date();
    if (now - previous >= timeFrame) {
      fn(...args);
      previous = now;
    }
  }
}

var throttledFn = throttle(() => {
  console.log('I am executed...');
}, 1000);

var start = new Date();
var end = new Date();
while (end - start < 5000) {
  throttledFn();
  end = new Date();
}