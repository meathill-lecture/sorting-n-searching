<!--
title: sorting and searching
description: A tutorial for JavaScript sorting and searching
-->

### JavaScript 面试攻略

排序与搜索
=======

#### [@meathill](https://weibo.com/meathill/)

<!-- page -->

{{> author}}

<!-- page -->

## 教学目标

1. 了解常见排序算法
2. 了解算法复杂度的计算
3. 学会解算法题

<!-- page -->

## 课程大纲

1. 用冒泡排序热身吧
2. 然后试一下插入排序
3. 接着是堆排序
4. 再来是归并排序
5. 最后看一看快排
6. 变量类型转换
7. 来做几道算法题
8. 课后作业

<!-- page -->

## 用冒泡排序热身吧

<!-- page -->

## 冒泡排序

> 冒泡排序是一种简单的排序算法。它重复地走访过要排序的数列，一次比较两个元素，如果他们的顺序错误就把他们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端。

<!-- section -->

1. 假设有一个长度为 N 的数组 `arr`，需要降序排列
2. 先比较 `arr[0]` 与 `arr[1]`，如果 `arr[0] < arr[1]` 就交换它们的位置
3. 再比较 `arr[1]` 与 `arr[2]`，如果 `arr[1] < arr[2]` 就交换它们的位置
4. 重复2~3，直至对比完所有元素，此时最小值应该处于数组最后
5. 重复2~4，不过每次（第M次）只需要比较到 `arr[N-M]` 即可
6. 最后数组完成降序排序

<!-- section -->

完成后的代码如下：

```javascript
let arr = ['待', '排', '序', '数', '组', ...];

for (let i = 0, len = arr.length - 1; i < len; i++) {
  for (let j = 0, jlen = len - i; j < jlen; j++) {
    if (arr[j] < arr[j + 1]) {
      let tmp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = tmp;
    }
  }
}
```

<!-- page -->

跑几个例子试一下：

`./sample/bubble.js`

<!-- page -->

从[代码](#/5/2)中我们可以知道，冒泡排序第1次对比了 N-1 次，第2次对比 N - 2 次....

所以是一个等差数列相加：

```
(N - 1) + (N -2) + .... + 2 + 1
  = (N - 1) / 2 * N
  = (N^2 - N) / 2
```

**于是，冒泡排序的时间复杂度记为：O(n<sup>2</sup>)**。

同时，它的空间复杂度为：S(1)。

<!-- page -->

**时间复杂度**与**空间复杂度**是我们评价一个算法的主要指标，大部分的优化都试图降低这两个复杂度。

通常来说，很少有同时降低时间复杂度与空间复杂度的算法。

大部分优化都是时间换空间或者空间换时间。

<!-- page -->

## 其它排序方法

<!-- page -->

## 插入排序

> 假设数组是有序的，那么只需要扫描数组，找到比要插入的数大/小的位置，插入新值，即可。

> 没有有序数组，那就构建有序数组，即可。

<!-- section -->

1. 一个数组 arr，需要升序排列
2. 数组第一个值视为已排序，用 `arr[1]` 与之比较，如果 `arr[0] > arr[1]`，就把 `arr[1]` 插入 `arr[0]` 的前面
3. 此时可以视作前两个值已排序，用 `arr[2]` 与它们比较，如果有比 `arr[2]` 大的，就把 `arr[2]` 插到它前面
4. 重复2~3，直至循环到最后一个数字

<!-- section -->

JavaScript 表示如下：

```javascript
for (let i = 1, len = arr.length; i < len; i++) {
  for (let j = 0, jlen = i; j < jlen; j++) {
    if (arr[i] < arr[j]) {
      arr = arr.splice(j, 0, arr[i]);
      break;
    }
  }
}
```

<!-- section -->

从 `break` 可以看出，插入排序的时间复杂度并不稳定。

* 最好情况，本身是降序数组，改为升序，每次只扫描一个数，结果运算 N - 1 次
* 最差情况，本身是升序数组，每次都要全扫描，结果运算 (N^2 - N)/2 次，和冒泡一样

不过，因为一直在原有数组上操作，所以其空间复杂度是 O(1)。

<!-- section -->

很多排序算法都有 **最好情况** 和 **最差情况**，这也是我们挑选算法和做优化时必须注意的。

<!-- page -->

## 改造插入排序！

既然数组部分有序，对于有序的部分，其实不用扫描这么麻烦。

我们可以用**“二分查找法”**来找到插入的位置。

<!-- page -->

## 二分查找法

对于一段长度为 N 的有序数组 arr，要查找最合适插入 M 的位置

1. 先对比 `arr[N / 2]`
2. 如果 `M < arr[N / 2]` 则继续对比 `arr[N / 4]`；否则，对比 `arr[N * 3 / 4]`
3. 重复2，直到下一次要对比的集合中只有个1个元素
4. 对比最后的元素，确定位置

<!-- section -->

二分查找法是最简单的检索方法。它的算法复杂度是 O(logN)。

它的 JavaScript 实现如下：

```javascript
function find(num, arr) {
  function binarySearch(left, right) {
    if (left > right) {
      return -1;
    }
    if (right - left <= 1) {
      return num > left ? right : left;
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
```

<!-- section -->

用 Debug 看一下效果：

`./sample/insert.js`

<!-- section -->

使用二分查找法改造插入排序之后，变为：

```javascript
for (let i = 1, len = arr.length; i < len; i++) {
  let index = find(arr[i], arr.slice(0, i));
  arr.splice(index, 0, arr[i]);
  arr.splice(i, 1);
}
```

<!-- section -->

改造之后的“二分查找插入排序”的时间复杂度就变成：

N * logN = O(NlogN)

它不再有最好情况和最坏情况。

其空间复杂度不变。

<!-- page -->

> 注意：我们所有的复杂度，都仅仅建立在算法之上，**没有包含数组本身的操作！**所以，今天我们说的复杂度和实际复杂度会有出入。

> 具体的出入大小，需要看运行环境的实现。

<!-- page -->

## 堆排序

> 堆排序是利用“堆”这种数据结构的特性进行排序的算法。

堆可以视作一棵完全二叉树，它满足：

1. 任何节点最多有两个子节点（二叉树）
2. 除了最底层意外，每一层都是满的（二叉树）
3. 任意节点，它的值总是大于/小于它父节点的值（堆）
4. 把它用一维数组表示，任意节点 i 的左节点位置是2i+1，右节点是 2i+2

<!-- page -->

如果有了堆，那么对其排序是很简单的：

1. 取出根节点（最大/最小）
2. 把最后一个节点放到根节点的位置上
3. 调整顺序，使其恢复堆的状态
4. 重复这个过程，直至完成排序

<!-- section -->

构造堆

```javascript
function maxHeapify(arr, index, heapSize) {
  let max = index;
  let left = index * 2 + 1;
  let right = index * 2 + 2;

  let big = right < heapSize && arr[right] > arr[left] ? right : left;

  if (big < heapSize && arr[index] < arr[big]) {
    max = big;
  }

  if (max !== index) {
    swap(arr, max, index);
    maxHeapify(arr, index, heapSize);
  }
}

// 从最后一个父节点开始遍历，将其转化为“最大堆”
for (let i = arr.length >> 1; i >= 0; i--) {
  maxHeapify(arr, i, arr.length);
}
```

<!-- section -->

排序

```javascript
for (let i = arr.length - 1; i > 0; i--) {
  swap(0, i);
  maxHeapify(arr, 0, i - 1);
}
```

<!-- section -->

### 堆排序的时间复杂度

因为构建堆和排序是分开的，所以可以分开计算，然后相加。

#### 构建堆：

1. 从 N/2 处开始构建
2. 每个节点最大计算次数是：（总深度 - 节点深度） * 2
2. 每个节点最小计算次数是：2
3. （偷懒省去证明过程）所以时间复杂度是 O(N)

<!-- section -->

#### 排序：

1. 每次从上到下调整，实际上是 logN
2. 共计 N - 1 次，故为 （N - 1）logN

#### 合并：

(N - 1)logN + N ≈ NlogN

<!-- section -->

很明显，堆排序的时间复杂度是 O(1)。

<!-- page -->

## 堆排序带来的启示

1. 合理构建数据结构可以改进算法
2. 时间复杂度计算中，加法和乘法差距巨大

<!-- page -->

## 归并排序

<!-- page -->

## 快速排序

<!-- page -->

## 现实中的排序

<!-- page -->

### 比较与运算符顺序

<!-- page -->

### `Array.prototype.sort()`

<!-- page -->

### 排序的稳定性

<!-- page-->

## 总结

* 时间复杂度
* 空间复杂度
* 最好情况与最坏情况
* 排序稳定性
* 运算符的方向

<!-- section -->

> 我认为排序算法不用背，尤其作为前端，但是理解这些概念非常重要。时不时的写一个排序，锻炼一下动手能力也是很重要的。

> 肉山

<!-- page -->

Q&A

<!-- page -->

工具书：

* [表达式与运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators)

<!-- page -->

参考阅读：

* [深入了解javascript的sort方法](http://www.zhouhua.info/2015/06/18/quicksort/)
* [冒泡排序](https://zh.wikipedia.org/zh/冒泡排序)
* [插入排序](https://zh.wikipedia.org/wiki/插入排序)
* [堆排序](https://zh.wikipedia.org/wiki/堆排序)
* [快速排序](https://zh.wikipedia.org/zh/快速排序)
* [系统性学习与碎片化学习](http://blog.meathill.com/tech/systemic-vs-fragmentization.html)