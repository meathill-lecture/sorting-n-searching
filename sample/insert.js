/**
 * Created by meathill on 2017/7/13.
 */

const _ = require('underscore');
const {binary} = require('./search');

let arr = _.range(20);
let num = Math.random() * 20 >> 0;
console.log(arr, num);
arr.splice(num, 1);
console.log(arr);
let index = binary(num, arr);
console.log(index, num);