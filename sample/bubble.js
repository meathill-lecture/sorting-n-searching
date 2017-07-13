/**
 * Created by meathill on 2017/7/13.
 */

const _ = require('underscore');
const { bubble } = require('./sort');

let arr = _.range(20);
arr = _.shuffle(arr);
console.log(arr);

arr = bubble(arr);
console.log(arr);