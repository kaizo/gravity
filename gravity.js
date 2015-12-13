var cnv, context, height, width, items;
var numStars = 10, minMass = 10, maxMass = 100, gravConstant = 1, timePerTick = 1;


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


function init () {
    items = [];
    for (var i = numStars; i--;) {
        items.push(createStar());
    }
    items.forEach(displayItem);
}

function displayItem (item) {
    var point = item.position;
    context.fillStyle = 'white';
    context.beginPath();
    context.arc(point.x, point.y, 2, 0, Math.PI*2, true);
    context.closePath();
    context.fill();
}

function createStar () {
    return {
        mass: Math.floor(Math.random() * (maxMass - minMass)) + minMass,
        position: {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height)
        },
        speedVector: {
            x: 0,
            y: 0
        },
        forceVector: {
            x: 0,
            y: 0
        }
    };
}

function getDist (vector) {
    return Math.sqrt(vector.x*vector.x + vector.y*vector.y);
}

function getDistVector (item1, item2) {

    return {
        x:  item2.position.x- item1.position.x,
        y: item2.position.y - item1.position.y
    };
}

function calculateForce (mass1, mass2, dist) {
    return gravConstant * mass1 * mass2 / (dist * dist);
}

function calculcateForceVector (force, dist, distVector) {
    return {
        x: distVector.x * force / dist,
        y: distVector.y * force / dist
    };

}

function calculateForces (item1, item2) {
    if (item1 === item2) {
        return;
    }

    var distVector = getDistVector(item1, item2);
    var dist = getDist(distVector);
    var force = calculateForce(item1.mass, item2.mass, dist);
    item1.forceVector = calculcateForceVector(force, dist, distVector);
}

function applyForce (speed, mass, force) {
    var acceleration = force / mass;
    return speed + acceleration * timePerTick;
}

function calculcateNewPosition (initialPos, speed, mass, force) {
    var acceleration = force / mass;
    return initialPos + speed * timePerTick + 0.5 * acceleration * timePerTick * timePerTick;
}

function applyForces (item) {
    item.position = {
        x: calculcateNewPosition(item.position.x, item.speedVector.x, item.mass, item.forceVector.x),
        y: calculcateNewPosition(item.position.y, item.speedVector.y, item.mass, item.forceVector.y)
    };
    item.speedVector = {
        x: applyForce(item.speedVector.x, item.mass, item.forceVector.x),
        y: applyForce(item.speedVector.y, item.mass, item.forceVector.y)
    }
}

function prepareAndDisplayItem (item) {
    debugger;
    items.forEach(calculateForces.bind(null, item));
    applyForces(item);
    displayItem(item);
}

function start () {
    //context.clearRect ( 0 , 0 , w, h);
    items.forEach(prepareAndDisplayItem);
}
