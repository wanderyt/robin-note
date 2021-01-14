var sortPoker = (arr = []) => {
  let result = [];
  while(arr.length > 0) {
    let length = arr.length;
    let item;
    if (length % 2 === 0) {
      item = arr.pop();
    } else {
      item = arr.shift();
    }

    result.unshift(item);
  }
}