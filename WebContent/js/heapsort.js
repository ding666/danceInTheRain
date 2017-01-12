function iParent(i) {
	return Math.floor((i-1)/2);
}
function iLeftChild(i) {
	return 2*i;
}
function iRightChild(i) {
	return 2*i+1;
}

function heapify(a, count) {
	var start = iParent(count-1);
	while (start >= 0) {
		siftDown(a, start, count-1);
		start--;
	}
}

function siftDown(a, start, end) {
	var root = start;
	while (iLeftChild(root) <= end) {
		var child = iLeftChild(root);
		var swap = root;
		if (a[swap] < a[child]) {
			swap = child;
		}
		if (child+1 <= end && a[swap] < a[child+1]) {
			swap = child +1;
		}
		if (swap == root) {
			return;
		} else{
			var tmp=a[root];
			a[root] = a[swap];
			a[swap]=tmp;
			root = swap;
		}
	}
}

function heapSort(a, count) {
	var end = count - 1;
	while (end > 0) {
		console.log("before swap and shiftDown a=");
		console.log(a);
		var tmp=a[end];
		a[end] = a[0];
		a[0] = tmp;
		end--;
		siftDown(a, 0, end);
		console.log("end=" + end);
		console.log(a);
	}
}

var a=[6,5,3,1,8,7,2,4];
heapify(a,a.length);
heapSort(a, a.length);
console.log(a);
