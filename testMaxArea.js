/**
 * https://leetcode.com/problems/container-with-most-water
 *
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height = []) {
  let [l, r] = [0, height.length - 1];
  let maxArea = 0;
  while(l < r) {
    let curArea = Math.min(height[l], height[r]) * (r - l);
    if (curArea > maxArea) {
      maxArea = curArea;
    }

    if (height[l] > height[r]) {
      r--;
    } else {
      l++;
    }
  }
  return maxArea;
};

/**
 * https://leetcode.com/problems/3sum-closest/
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums = [], target = 0) {

};

var twoSumNormal = function (nums = [], target = 0) {
  var start = performance.now();
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        var end = performance.now();
        console.log('performance : ', end - start);
        return [nums[i], nums[j]];
      }
    }
  }

  return null;
}

var twoSumMap = function (nums = [], target = 0) {
  var start = performance.now();
  var map = new Map();
  for (const num in nums) {
    map.set(nums[num], num);
  }

  for (let i = 0; i < nums.length; i++) {
    if (map.has(target - nums[i])) {
      var end = performance.now();
      console.log('performance : ', end - start);
      return [nums[i], target - nums[i]];
    }
  }
  return null;
}


/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
  let mapping = {
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['p', 'q', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z'],
  };

  let intersection = (arr1, arr2) => {
    let result = [];
    for (let i = 0; i < arr1.length; i++) {
      result = result.concat(arr2.slice().map((item) => arr1[i] + item));
    }
    console.log(arr1, ' + ', arr2, ': ', result);
    return result;
  }

  let digitsArr = digits.split('');
  let result = mapping[digitsArr[0]];
  for (let i = 1; i < digitsArr.length; i++) {
    console.log('arr1: ', result, ', arr2: ', mapping[digitsArr[i]]);
    result = intersection(result, mapping[digitsArr[i]]);
  }

  return result;
};


/**
 * https://leetcode.com/problems/remove-nth-node-from-end-of-list/
 *
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  let length = 1, cur = head;
  while (cur.next) {
    length++;
    cur = cur.next;
  }

  if (length === n) {
    return head.next;
  } else {
    let cur = head;
    for (let i = 1; i < length - n; i++) {
      cur = cur.next;
    }

    let newNext = cur.next.next;
    cur.next = newNext;
    return head;
  }
};

