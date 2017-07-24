//1-1。时间复杂度，O(nlogn),因为JS自带的排序为快速排序，时间复杂度为O(nlogn)
function Judge(arr, t, k) {
	var sum = 0;
	arr.sort(function(a, b) {
		return a - b;
	})
	arr.slice(0, k);
	for (let i = 0; i < k; i++) {
		sum += arr[i];
	}
	if (sum <= t) {
		return true;
	} else {
		return false;
	}
}

//测试
var arr = [3, 45, 6, 8, 44, 21, 69, 42, 13];
Judge(arr, 10, 3) //false
Judge(arr, 20, 3) //true
Judge(arr, 20, 4) //false
Judge(arr, 60, 4) //true

//1-2.换成自实现改进版的插入排序，时间复杂度同样为O(nlogn)
function Judge_1(arr, t, k) {
	var sum = 0;

	function find(num, arr) {
		function binarySearch(left, right) {
			if (num > arr[right]) {
				return right + 1;
			}
			if (left > right) {
				return -1;
			}
			if (right - left <= 1) {
				return num > arr[left] ? right : left;
			}
			let mid = right + left >> 1;
			if (num <= arr[mid]) {
				return binarySearch(left, mid);
			} else {
				return binarySearch(mid + 1, right);
			}
		}

		return binarySearch(0, arr.length - 1);
	}
	for (let i = 1, len = arr.length; i < len; i++) {
		let index = find(arr[i], arr.slice(0, i));
		//console.log(index);
		let x = arr.splice(i, 1);
		arr.splice(index, 0, x[0]);
		//console.log(arr)
	}

	arr.slice(0, k);
	for (let i = 0; i < k; i++) {
		sum += arr[i];
	}
	if (sum <= t) {
		return true;
	} else {
		return false;
	}
}

//2-2 二分查找
function binarySearch(num, arr) {
	var low = 0,
		high = arr.length - 1,
		mid, element;
	while (low <= high) {
		mid = Math.floor((low + high) / 2);
		element = arr[mid];
		if (element < num) {
			low = mid + 1;
		} else if (element > num) {
			high = mid - 1;
		} else {
			//计算左端
			var x = mid + 1;
			while (arr[mid] == arr[x]) {
				x++;
			}
			var r = x - 1;

			//计算右端
			var y = mid - 1;
			while (arr[mid] == arr[y]) {
				y--;
			}
			var l = y + 1;

			//返回对象
			return {
				left: l,
				right: r
			}
		}
	}
	return {
		left: -1,
		right: -1
	};

}

//测试
var arr = [1, 2, 3, 4, 4, 5, 6, 6, 6, 6, 7, 7, 8];
for (let i = 0; i < 13; i++) {
	let res = binarySearch(i, arr);
	console.log(res.left, res.right)
}
/*结果：
-1 -1
0 0
1 1
2 2
3 4
5 5
6 9
10 11
12 12
-1 -1
-1 -1
-1 -1
-1 -1
*/

//3 快速排序，时间复杂度O(nlogn)
function paritition(arr, low, high) {

	/*三值取中法*/
	var m = low + (high - low) / 2;
	if (arr[low] > arr[high]) {
		swap(arr, low, high);
	}
	if (arr[m] > arr[high]) {
		swap(arr, low, high);
	}
	if (arr[m] > arr[low]) {
		swap(arr, m, low);
	}

	let pivot = arr[low];
	while (low < high) {
		//双向扫描
		while (low < high && arr[high] > pivot) {
			--high;
		}
		//只是记录值的位置
		arr[low] = arr[high];
		while (low < high && arr[low] <= pivot) {
			++low;
		}
		arr[high] = arr[low];
	}
	arr[low] = pivot;
	return low;
}

function quickSort(arr, low, high) {
	if (low < high) {
		let pivot = paritition(arr, low, high);
		quickSort(arr, low, pivot - 1);
		quickSort(arr, pivot + 1, high);
	}
	return arr;
}

//测试
var arr = [3, 45, 6, 8, 44, 21, 69, 42, 13]；
quickSort(arr, 0, 8);                        //[ 3, 6, 8, 13, 21, 42, 44, 45, 69 ]
var arr = [91,80,76,62,54,42,35,26,19,5,1]
quickSort2(arr,0,10)                         //[ 1, 5, 19, 26, 35, 42, 54, 62, 76, 80, 91 ]
