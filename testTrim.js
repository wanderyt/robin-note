var testTrim = (str) => {
  return str.replace(/^([\s]*).*/, '').replace(/.*([\s]*)$/, '');
}

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  var result = [];

  var generateNext = (curLeft, curRight, curValue) => {
    if (curLeft === 0 && curRight === 0) {
      result.push(curValue);
    } else if (curLeft === curRight) {
      generateNext(curLeft - 1, curRight, curValue + '(');
    } else if (curLeft === 0) {
      generateNext(0, curRight - 1, curValue + ')');
    } else {
      generateNext(curLeft - 1, curRight, curValue + '(');
      generateNext(curLeft, curRight - 1, curValue + ')');
    }
  }

  generateNext(n - 1, n, '(');

  return result;
};

/**
 * https://leetcode.com/problems/swap-nodes-in-pairs/
 *
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
  let flag = false, newHead, prev = head, prevEnd, headFlag = false;
  if (head && head.next) {
    let cur = head.next;
    while (cur) {
      flag = !flag;
      if (flag) {
        curTmp = cur.next;
        if (prevEnd) {
          prevEnd.next = cur;
        }
        cur.next = prev;
        prev.next = null;
        prevEnd = prev;

        if (!headFlag) {
          newHead = cur;
          headFlag = true;
        }

        cur = curTmp;
      } else {
        prev = cur;
        cur = cur.next;

        if (!cur) {
          prevEnd.next = prev;
        }
      }
    }
  } else {
    newHead = head;
  }

  return newHead;
};

function ListNode(val) {
  this.val = val;
  this.next = null;
}
var first = new ListNode(1);
var second = new ListNode(2);
var third = new ListNode(3);
var fourth = new ListNode(4);
var fifth = new ListNode(5);
first.next = second;
second.next = third;
third.next = fourth;
fourth.next = fifth;


/**
 * https://leetcode.com/problems/reverse-nodes-in-k-group/
 *
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
  let flag = 0, newHead = head, newHeadFlag = false, curHead = head, prevTail, cur = head, index = 0;
  while(cur && index < 20) {
    flag++;
    console.log('cur: ', cur.val);
    console.log('flag: ', flag);
    if (flag === k) {
      let tempTail = cur;
      cur = cur.next;
      tempTail.next = null;

      console.log('reverse head: ', curHead.val);
      let {head: tmpHead, tail} = reverseGroup(curHead);
      console.log('after reverse, head: ', tmpHead.val, ', tail: ', tail.val);
      console.log('prevTail: ', prevTail ? prevTail.val : null);
      if (prevTail) {
        prevTail.next = tmpHead;
      }
      prevTail = tail;

      curHead = cur;
      flag = 0;

      if (!newHeadFlag) {
        newHead = tmpHead;
        newHeadFlag = true;
      }
    } else {
      cur = cur.next;
    }

    if (!cur) {
      prevTail.next = curHead;
    }

    index++;
  }

  return newHead;
};

var reverseGroup = function (head) {
  let newHead = head, cur = head, tail = head;
  if (cur.next) {
    cur = cur.next;
    newHead.next = null;
    while(cur) {
      let next = cur.next;
      cur.next = newHead;
      newHead = cur;
      cur = next;
    }
  }
  return {
    head: newHead,
    tail,
  }
}

function ListNode(val) {
  this.val = val;
  this.next = null;
}
var first = new ListNode(1);
var second = new ListNode(2);
var third = new ListNode(3);
var fourth = new ListNode(4);
var fifth = new ListNode(5);
first.next = second;
second.next = third;
third.next = fourth;
fourth.next = fifth;