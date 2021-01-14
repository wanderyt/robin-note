var rotate = (arr, k) => {
  let length = arr.length;
  if (k > length) {
    k = k % length;
  }
  for (let i = 0; i < k; i++) {
    let item = arr.pop();
    arr.unshift(item);
  }
  return arr;
}

var moveZero = (arr) => {
  let left = arr.length;
  for (let index = 0; index < left;) {
    if (arr[index] === 0) {
      arr.splice(index, 1);
      arr.splice(arr.length, 0, 0);
      left--;
    } else {
      index++;
    }
  }

  return arr;
}

var add = (...nums) => {
  let addFunc = (...args) => {
    return add(...nums, ...args);
  }

  addFunc.valueOf = function() {
    return nums.reduce((acc, item) => acc + item, 0);
  }

  return addFunc;
}