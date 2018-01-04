var canvas, x, y, len, h, w, collection, bg_img, drop_img;

// canvas = document.getElementById('cvs');
// console.log("asdf canvas=" + canvas);
//
// // ctx = canvas.getContext('2d'),
// x = 0,
// y = 0,
// // number of drops
// len = 1024,
// // optimized for codepen.io in my browser
// h = canvas.height = 320,
// w = canvas.width = 480,
// collection, bg_img, drop_img;

function draw_bg() {
// I hoped to do more with this?
	ctx.drawImage(bg_img, 0, 0, w, h);
}

function draw_frame() {
	// there are ten levels of depth, we need to draw
	// from the furthest back
	for (var i = 0; i < 10; i++) {
		// I thought it would make it more real looking
		// to fade the drops out as they got further back
		ctx.globalAlpha = i / 10;
		// now we can loop over each drop in this level
		// of depth, draw it and shift it down.
		collection[i].forEach(function (drop) {
			// scale width by .6 because it's a stupid image.
			// todo: find proper images
			ctx.drawImage(drop_img, drop.x, drop.y, drop.size * .6, drop.size);
			drop.y += drop.speed;
			// if we hit the limit
			if (drop.y > drop.limit) {
				// return the drop to the top,
				// I noticed it would just result in walls of
				// drops falling from the top so my solution
				// was to allow them to start much higher
				drop.y = Math.random() * (-1 * (h / 2));
				// give it a new x position
				drop.x = random_x();
			}
		});
	}
	// reset alpha for bg_img draw
	ctx.globalAlpha = 1;
}

function random_x() {
	// let some drops drift slightly off screen
	return ( Math.random() * (w + 48) ) - 24;
}

function randomize_drops() {
	// define the collection as a blank object
	collection = {};
	// create len drops, saving them into collection
	for (var i = 0; i < len; i++) {
		// see fn for description
		var drop = random_drop();
		// I like short circuiting.. I know I shouldn't but I do.
		// this says:
		// if( collection.hasOwnProperty(drop.distance) === false ) {
		// collection[drop.distance] = [];
		// }
		typeof collection[drop.distance] === "undefined" && 
		(collection[drop.distance] = []);
		// add the drop to the collection
		collection[drop.distance].push(drop);
	}
}

function random_drop() {
	// create out blank drop object
	var drop = {};
	// give it an x starting point
	drop.x = random_x();
	// give it a y starting point
	// here we can put it in a visible area because
	// the animation has not yet started
	drop.y = Math.random() * h - 32;
	// calculate a distance from 0 to 9
	drop.distance = Math.random() * 10 | 0;
	// use for speed - further back slower you go
	drop.speed = Math.random() * (drop.distance / 2) + 3;
	// slower you go, smaller you are
	//drop.size = (drop.speed + 1) / 16 * 18;
	drop.size = 0.5*(drop.speed + 1) / 16 * 18;

	// smaller you are, sooner you'll hit
	drop.limit = (drop.speed + 1) / 9 * h;
	return drop;
}

function init() {
	canvas = document.getElementById('cvs');
	//	   context = canvas.getContext('2d');
	// canvas = document.getElementById('cvs');
	if (!canvas) {
		// document is not ready yet to make a canvas
		return;
	}
//	console.log("asdf canvas=" + canvas); 

	ctx = canvas.getContext('2d');
	x = 0;
	y = 0;
	   // number of drops
	//		   len = 1024, 
	len = 2048;
	// optimized for codepen.io in my browser
//		   h = canvas.height = $(document).width();
//		   w = canvas.width = $(document).height();
		   h = canvas.height = window.innerHeight || document.documentElement.clientHeight ||document.body.clientHeight;
		   w = canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;	   
//	h = canvas.height = 600,
//	w = canvas.width = 800,	   
  collection, bg_img, drop_img;	   
	   
	bg_img = new Image();
	// found on google images - did a reverse search and it's a magic card graphic?
	// bg_img.src =
	// 'http://media.wizards.com/images/magic/daily/features/feature159_forest.jpg';
	bg_img.src = 'images/danceInTheRain.jpg';

	drop_img = new Image();
	// found on google images. url looks pretty legit - I think I'm ok.
//	drop_img.src = 'http://free.clipartof.com/62-Free-Water-Drop-Clipart-Illustration.png';
	drop_img.src = 'images/rainDrop.png';

	randomize_drops();
	loop();
}
function loop() {
	requestAnimationFrame(loop);
	draw_bg();
	draw_frame();
}
init();