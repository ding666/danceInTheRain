function showLog(str, obj) {
	console.log(str);
	if (obj !== undefined) {
		console.log (obj);
	}
}

var A = [3,7,8,5, 2, 1, 9, 5 ,4];

function quickSort (A, lo, hi) {
//	showLog("asdf 1, lo=", lo);
//	showLog("hi=", hi);
	if ( lo < hi) {
//		showLog("before partition lo=", lo);
//		showLog("hi=", hi);
		var p = partition (A, lo, hi);
		quickSort(A, lo, p-1);
		quickSort(A, p+1, hi);
	}
}

function partition (A, lo, hi) {
	showLog("\nlo=", lo);
	showLog("hi=", hi);
	showLog("Before partition A=", A);
	var pivot = A[hi];
	var i = lo;
	for (j = lo; j < hi ; j++) {
		if (A[j] <= pivot) {
			var tmp = A[i];
			A[i]= A[j];
			A[j] = tmp;
			i++;
		} 
	} 
	var tmp = A[i];
	A[i] = A[hi];
	A[hi]= tmp;
	showLog("After partition, A=", A);
	showLog("i=", i);
	return i;
}

//A=[2,3];
var lo = 0;
quickSort(A, lo, A.length-1);
showLog("result = ", A);

