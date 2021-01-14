var DFSClone = (obj) => {
  var newObj = {};
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      console.log('clone item: ', key);
      newObj[key] = DFSClone(obj[key]);
    } else {
      console.log('clone item: ', key);
      newObj[key] = obj[key];
    }
  }
  return newObj;
}


var testObj = {
  name: 'David',
  job: {
    name: 'stubhub',
    title: 'software',
    salary: {
      zone: 'middle',
      level: 'low'
    }
  },
  age: 30,
  career: {
    multiple: true,
    seq: {
      1: 'SAP',
      2: 'ebay',
      3: 'stubhub'
    }
  }
};

DFSClone(testObj);

var BFSClone = (obj) => {
  var newObj = {}, queue = Object.keys(obj).map((key) => [newObj, obj, key]);
  while(queue.length > 0) {
    let [curObj, oriObj, key] = queue.shift();
    if (typeof oriObj[key] !== 'object') {
      console.log('clone item: ', key);
      curObj[key] = oriObj[key];
    } else {
      curObj[key] = {};
      Object.keys(oriObj[key]).map((newKey) => {
        queue.push([curObj[key], oriObj[key], newKey]);
      });
    }
  }
  return newObj;
}