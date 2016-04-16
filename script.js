var g = null;
var FPS = 10;

var update = function () {

};

window.onload = function () {
    g = document.getElementById('target').getContext('2d');
    setInterval(update, 1000 / FPS);
};
