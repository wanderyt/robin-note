const myPTimeout = (promise, milliseconds) => {
  var timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject({
        _myPTimeout: true
      });
    }, milliseconds);
  });
  return Promise.race([promise, timeoutPromise])
    .then((data) => {
      return data;
    }, (err) => {
      throw new Error('Promise timeout at ', milliseconds);
    });
}