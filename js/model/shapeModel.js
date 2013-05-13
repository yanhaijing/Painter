/**
 * @author yan
 * @namespace shape
 */

(function($, global){
    "use strict";
    var
        Shape = null,
        ImageObject = null,
        Line = null,
        Rectangle = null,
        RoundRectangle = null;
    /**
     * Shape 构造函数
     * @class Shape
     * @constructor
     * @extends Shape.prototype
     */
	Shape = function(){
	    /**
	     * 名称
	     * @property name
	     * @type String
	     * @default Shapee 
	     */
	    this.name = 'Shape';
	    
	    /**
	     * 图形参数
	     * @property option
	     * @type Object
	     * @default null 
	     */
	    this.option = null;
	};
	
	/**
	 * Shape 原型
	 * @class Shape.prototype
	 * @static
	 */
	
	Shape.prototype = {	   
	    /**
	     * 初始化对象
	     * @method init
	     * @param {Object} option 参数
	     */ 
	     init:function(option){
	         this.initOption(option);
	     },
        /**
         * 获取名称
         * @method getName
         * @return {String} 当前对象的名称 
         */
        getName:function(){
            return this.name;
        },
        
        /**
         * 初始化当前参数为传递参数
         * @method initOption
         * @param {Object} option 参数
         */
        initOption:function(option){
            this.setOption(option);
        },
        /**
         * 设置工具参数对象
         * @method setOption
         * @param {Object} option 设置的参数集和
         * @return {Bollean} 是否设置成功
         */
        setOption:function(option){
            this.option = option;
        },
        
        /**
         * 获取工具参数对象
         * @method getOption 
         * @return {Object} 返回当前工具参数对象
         */
        getOption:function(){
            return this.option;
        }
	};
	
	ImageObject = function(){
	    this.name = 'image';
	};
	
	ImageObject.prototype = new Shape();
	
	/**
	 * 直线对象
	 * @class Line
	 * @constructor
	 * @extends Line.protorype 
	 */
	Line = function(){
	    /**
         * 名称
         * @property name
         * @type String
         * @default Shape
         */
	    this.name = 'Line';
	    
	    /**
	     * 绘制图形
	     * @method paint
	     * @param {Object} context 绘图上下文 
	     */
	    this.paint = function(context){
	        var 
	           option = this.getOption();
	        
	        context.save();//保存上下文信息
	        context.beginPath();
	        
	        //描述直线
            context.moveTo(option.startX, option.startY);
            context.lineTo(option.endX, option.endY);
            
            //设置直线属性
            context.strokeStyle = option.strokeStyle;
            context.lineWidth = option.lineWidth;
            context.globalAlaph = option.opacity / 100;
            
            //绘制直线
            context.closePath();
            context.stroke();
            context.restore();//回复上下文
	    };
	};
	
	/**
	 * 直线对象原型
	 * @class Line.prototype
	 * @static 
	 */
	Line.prototype = new Shape();
	
	/**
	 * 矩形对象
	 * @class Rectangle
	 * @constructor
	 * @extends Rectangle.prorotype 
	 */
	Rectangle = function(){
	   /**
         * 名称
         * @property name
         * @type String
         * @default Shape
         */
        this.name = 'Rectangle';
        
        /**
         * 绘制矩形图形
         * @method paint
         * @param {Object} context 绘图上下文 
         */
        this.paint = function(context){
            var 
               option = this.getOption();
            
            context.save();//保存上下文信息            
            
            //设置属性
            context.strokeStyle = option.strokeStyle;
            context.fillStyle = option.fillStyle;
            context.lineWidth = option.lineWidth;
            context.globalAlaph = option.opacity / 100;  
            context.lineJoin = option.lineJoin;          
            
            //绘制
            context.fillRect(option.left, option.top, option.width, option.height);
            context.strokeRect(option.left, option.top, option.width, option.height);
            context.restore();//回复上下文
        };
	};
	
	/**
     * 矩形对象原型
     * @class Rectangle.prototype
     * @static 
     */
    Rectangle.prototype = new Shape();
    
    /**
     * 圆角矩形对象
     * @class RoundRectangle
     * @constructor
     * @extends RoundRectangle.prorotype 
     */
    RoundRectangle = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default Shape
         */
        this.name = 'RoundRectangle';
    };
    
    /**
     * 矩形对象原型
     * @class RoundRectangle.prototype
     * @static 
     */
    RoundRectangle.prototype = new Rectangle();
	
	//添加变量
	global.painter = global.painter || {};
	global.painter.model = global.painter.model || {};
	global.painter.model.shapeModel = global.painter.model.shapeModel || {};
	global.painter.model.shapeModel.Shape = Shape;
	global.painter.model.shapeModel.Line = Line;
	global.painter.model.shapeModel.Rectangle = Rectangle;
	global.painter.model.shapeModel.RoundRectangle = RoundRectangle;
}(jQuery, window));