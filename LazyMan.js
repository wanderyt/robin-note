LazyMan('Tony');
// Hi I am Tony

LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food


class LazyManClass {
  constructor(name) {
    console.log(`Hi I am ${name}`);
    this.queue = [];
    setTimeout(() => {
      this.next();
    }, 0);
  }
  sleep(ms) {
    const fn = function () {
      console.log(`等待了${ms}秒...`);
      this.next();
    }
    this.queue.push(fn.bind(this));
    return this;
  }
  eat(what) {
    const fn = function () {
      console.log(`I am eating ${what}`);
      this.next();
    }
    this.queue.push(fn.bind(this));
    return this;
  }
  sleepFirst(ms) {
    const fn = function () {
      console.log(`等待了${ms}秒...`);
      this.next();
    }
    this.queue.unshift(fn.bind(this));
    return this;
  }
  next() {
    const fn = this.queue.shift();
    fn && fn();
  }
}

function LazyMan(name) {
  return new LazyManClass(name)
}