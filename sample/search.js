/**
 * Created by meathill on 2017/7/13.
 */

function binary(num, arr) {
  function search(left, right) {
    if (left > right) {
      return -1;
    }
    if (right - left <= 1) {
      return num > left ? right : left;
    }
    let mid = right + left >> 1;
    if (num <= arr[mid]) {
      return search(left, mid);
    } else {
      return search(mid + 1, right);
    }
  }

  return search(0, arr.length - 1);
}

module.exports = {
  binary: binary
};