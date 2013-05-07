context = document.getElementById('canvas').getContext("2d");

context.strokeStyle = "#111";
context.strokeRect(0, 0, 600, 400);
context = canvas.getContext("2d");
$('#canvas').mousedown(function(e) {
	var mouseX = e.pageX - this.offsetLeft;
	var mouseY = e.pageY - this.offsetTop;
	paint = true;
	addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
	redraw();
});

$('#canvas').mousemove(function(e) {
	if (paint) {//是不是按下了鼠标
		addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
		redraw();
	}
});

$('#canvas').mouseup(function(e) {
	paint = false;
});
$('#canvas').mouseleave(function(e) {
	paint = false;
});

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

var colorPurple = "#cb3594";
var curColor = colorPurple;
var clickColor = new Array();
var curSize = 1;
var clickSize = [];
var curTool = 'pen';
function addClick(x, y, dragging) {
	clickX.push(x);
	clickY.push(y);
	clickDrag.push(dragging);
	clickSize.push(curSize);
	
	if (curTool == "eraser") {
		clickColor.push("white");
	} else {
		clickColor.push(curColor);
	}  

}

function redraw() {
	context.lineJoin = "round";
	for (var i = 0; i < clickX.length; i++) {
		context.beginPath();
		if (clickDrag[i] && i) {
			context.moveTo(clickX[i - 1], clickY[i - 1]);
		} else {
			context.moveTo(clickX[i] - 1, clickY[i]);
		}
		context.lineTo(clickX[i], clickY[i]);
		context.closePath();
		context.strokeStyle = clickColor[i];
		context.lineWidth = clickSize[i];
		context.stroke();
	}
}

$('#color').change(function(e) {
	curColor = $(this).attr('value');
});
$('#size').change(function(e) {
	curSize = $(this).attr('value');
}); 
$('input[name="tools"]').change(function(e) {
	curTool = $(this).attr('value');
});