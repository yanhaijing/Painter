/**
 * @author admin
 */

context = canvas.getContext("2d");
$('#canvas').mousedown(function(e){  
	var mouseX = e.pageX - this.offsetLeft;  
	var mouseY = e.pageY - this.offsetTop;  
	paint = true;  
	addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);  
	redraw();  
}); 

$('#canvas').mousemove(function(e){  
	if(paint){//是不是按下了鼠标  
		addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);  
		redraw();  
	}  
}); 

$('#canvas').mouseup(function(e){  
	paint = false;  
});

$('#canvas').mouseleave(function(e){  
	paint = false;  
});

var clickX = new Array();  
var clickY = new Array();  
var clickDrag = new Array();  
var paint;  
function addClick(x, y, dragging)  
{  
	clickX.push(x);  
	clickY.push(y);  
	clickDrag.push(dragging);  
} 

function redraw(){  
	canvas.width = canvas.width; // Clears the canvas  
	context.strokeStyle = "#df4b26";  
	context.lineJoin = "round";  
	context.lineWidth = 5;  
	for(var i=0; i < clickX.length; i++)  
	{  
		context.beginPath();  
		if(clickDrag[i] && i){//当是拖动而且i!=0时，从上一个点开始画线。  
			context.moveTo(clickX[i-1], clickY[i-1]);  
		}else{  
			context.moveTo(clickX[i]-1, clickY[i]);  
		}  
		context.lineTo(clickX[i], clickY[i]);  
		context.closePath();  
		context.stroke();  
　	}  
}  