var cnv, context, height, width, items;


$(document).ready(function () {
	cnv = $('#display')[0];
	context = cnv.getContext('2d');
	fullScreenCanvas();
    init();
	window.setInterval(start, 32);
});

$(window).resize(function() {
	fullScreenCanvas();
});

function fullScreenCanvas() {
	"use strict";
	cnv.width = $(document).width();
	cnv.height = $(document).height();
	height = cnv.height;
	width = cnv.width;
}

//////////////////////////////////



function start () {
    //context.clearRect ( 0 , 0 , w, h);
}
