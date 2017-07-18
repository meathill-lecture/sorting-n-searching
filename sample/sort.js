/**
 * Created by meathill on 2017/7/13.
 */

let all = module.exports = {};
all.bubble = function bubble(arr) {
  for (let i = 0, len = arr.length - 1; i < len; i++) {
    for (let j = 0, jlen = len - i; j < jlen; j++) {
      if (arr[j] < arr[j + 1]) {
        let tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    }
  }
  return arr;
};