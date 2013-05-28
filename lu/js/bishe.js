window.onload = function(){
	//取得<canvas>和绘图上下文
	canvas = document.getElementById("drawingCanvas");
	context = canvas.getContext("2d");
	//添加用于实现绘图操作的事件处理程序
	canvas.onmousedown = startDrawing;
	canvas.onmouseup = stopDrawing;
	canvas.onmouseout = stopDrawing;
	canvas.onmousemove = draw;
};

	function changeColor(color){
		//重新设置当前绘图要使用的颜色
		context.strokeStyle = color;	
	}
	var isDrawing = false;
	function startDrawing(e){
		//开始绘图了
		isDrawing = true;
		//创建新路径（使用当前设置好的描边颜色和线条粗细）
		context.beginPath();
		
		//把画笔放在鼠标放前位置
		context.moveTo(e.pageX - canvas.offsetLeft,e.pageY - canvas.offsetTop)
	}
function draw(e){
		if(isDrawing == true){
		//找到鼠标的新位置
		var x = e.pageX - canvas.offsetLeft;
		var y = e.pageY - canvas.offsetTop;
		
		//画一条到新位置的直线
		context.lineTo(x,y);
		context.strokeStyle=color;
		context.stroke();
		}
	}
	$('#color').change(function(e) {
	curColor = $(this).attr('value');
	var isDrawing = false;
	function stopDrawing(){
		isDrawing = false;
	}
	
	function clearCanvas(){
		context.clearRect(0,0,canvas.width,canvas.height);
	}
	
	function saveCanvas(){
		var imageCopy = document.getElementById("saveImageCopy");
		imageCopy.src = canvas.toDataURL();
		
	}
	