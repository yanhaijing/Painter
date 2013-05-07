/**
 * @author Administrator
 * @namespace shape
 */

(function($, global){
	"use strict";
	
	var Shape = function(){
		this.name = 'shape';
	};
	
	Shape.prototype = {
		getName:function(){
			return this.name;
		}
	};
	
	global.painter = global.painter || {};
	global.painter.shape = global.painter.shape || {};
	global.painter.shape.Shape = global.painter.shape.Shape || Shape;
}(jQuery, window));

(function($, global){
	"use strict";
	
	var Line = function(context, startX, startY, endX, endY, strokeStyle){
		this.name = 'line';
		this.context = context;
		this.startX = startX;
		this.startY = startY;
		this.endX = endX;
		this.endY = endY;
		this.strokeStyle = strokeStyle;
		
		this.paint = function(){
			//this.$context.line(0,0,10,10);
			this.context.beginPath();
			this.context.moveTo(this.startX,this.startY);
			this.context.lineTo(this.endX,this.endY);
			this.context.strokeStyle = this.strokeStyle;
			this.context.stroke();
		};
	};
	
	Line.prototype = new global.painter.shape.Shape();
	
	global.painter = global.painter || {};
	global.painter.shape = global.painter.shape || {};
	global.painter.shape.Line = global.painter.shape.Line || Line;
}(jQuery, window));