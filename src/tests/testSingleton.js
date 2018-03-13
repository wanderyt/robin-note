var {Singleton} = require('./Singleton');

var singleton = new Singleton();
var a = singleton.getInstance();
a.name = 'wanderyt';
var b = singleton.getInstance();

var singleton1 = new Singleton();
var c = singleton1.getInstance();

console.log(a);
console.log(b);
console.log(c);
