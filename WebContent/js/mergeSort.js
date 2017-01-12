/* Merge sort */

function showLog(str, obj) {
	console.log(str);
	if (obj) {
		showLog (obj);
	}
}
var a = [14,33,27,10,35,19,42,44, 27];
// var a = [14,33,27,10];

function mergeSort (arr) {
	var length = arr.length;
//	console.log(length);

	if (length == 1	)
		return arr;
	
	var l1 = arr.slice(0,length/2);
	var l2 = arr.slice(length/2,length);
	console.log(l1);
	console.log(l2);
	var mergeResult = merge(mergeSort(l1), mergeSort(l2));
	showLog("mergeResult=", mergeResult);
	return mergeResult;
	
//	showLog("before merge");
//	showLog("l1=", l1);
//	showLog("l2=", l2);
//	return merge(l1,l2);
//	
}

function merge(a, b) {
	showLog("inside merge");
	console.log(a);
	console.log(b);
	var c = [];
	while (a.length && b.length ) {
		if (a[0] <= b[0]) {
			c.push(a.shift());
		} else {
			c.push(b.shift());
		}
	}
	while(a.length) {
		c.push(a.shift());
	}
	while(b.length) {
		c.push(b.shift());
	}

	console.log(c);
	console.log("*****");
	
	return c;
}

var d=mergeSort(a);
//var d = merge([27], [10])
console.log(d);

