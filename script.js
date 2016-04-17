var g = null;
var FPS = 10;
var RES_X = 640;
var RES_Y = 480;

var update = function () {

};

window.onload = function () {
    var canvas = document.getElementById('target');
    canvas.width = RES_X;
    canvas.height = RES_Y;
    g = canvas.getContext('2d');
    setInterval(update, 1000 / FPS);
};
