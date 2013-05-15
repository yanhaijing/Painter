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
        RoundRectangle = null,
        Ellipes = null,
        Pen = null,
        CurveClosed,
        Eraser,
        FloodFill,
        EyeDropper;
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
            context.globalAlpha = option.opacity / 100;
            
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
            context.globalAlpha = option.opacity / 100;  
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
    
    /**
     * 椭圆对象
     * @class Ellipes
     * @constructor
     * @extends Ellipes.prorotype 
     */
    Ellipes = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default Shape
         */
        this.name = 'Ellipes';
        
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
            context.globalAlpha = option.opacity / 100;           
            
            //绘制
            context.beginPath();
            context.arc(option.x, option.y, option.radius, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();
            context.stroke();
            context.restore();//回复上下文
        };
    };
    
    /**
     * 圆形对象原型
     * @class Ellipes.prototype
     * @static 
     */
    Ellipes.prototype = new Shape();
    
    /**
     * 铅笔对象
     * @class Pen
     * @constructor
     * @extends Pen.prorotype 
     */
    Pen = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default Shape
         */
        this.name = 'Pen';
        
        /**
         * 绘制矩形图形
         * @method paint
         * @param {Object} context 绘图上下文 
         */
        this.paint = function(context){
            var 
               option = this.getOption(),
               list = option.list,
               start = list[0],
               len = list.length,
               i = 0;
            
            context.save();//保存上下文信息            
            
            //设置属性
            context.strokeStyle = option.strokeStyle;
            context.lineWidth = option.lineWidth;
            context.globalAlpha = option.opacity / 100;           
            
            //绘制
            context.beginPath();
            
            context.moveTo(start.x, start.y);
            for(i; i<len; i=i+1){
               context.lineTo(list[i].x, list[i].y); 
            }
            context.stroke();
            context.restore();//回复上下文
        };
    };
    
    /**
     * 铅笔对象原型
     * @class Pen.prototype
     * @static 
     */
    Pen.prototype = new Shape();
    
    /**
     * 铅笔对象
     * @class CurveClosed
     * @constructor
     * @extends CurveClosed.prorotype 
     */
    CurveClosed = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default Shape
         */
        this.name = 'CurveClosed';
        
        /**
         * 绘制矩形图形
         * @method paint
         * @param {Object} context 绘图上下文 
         */
        this.paint = function(context){
            var 
               option = this.getOption(),
               list = option.list,
               start = list[0],
               len = list.length,
               i = 0;
            
            context.save();//保存上下文信息            
            
            //设置属性
            context.strokeStyle = option.strokeStyle;
            context.lineWidth = option.lineWidth;
            context.globalAlpha = option.opacity / 100;           
            
            //绘制
            context.beginPath();
            
            context.moveTo(start.x, start.y);
            for(i; i<len; i=i+1){
               context.lineTo(list[i].x, list[i].y); 
            }
            context.closePath();
            context.stroke();
            context.restore();//回复上下文
        };
    };
    
    /**
     * 铅笔对象原型
     * @class CurveClosed.prototype
     * @static 
     */
    CurveClosed.prototype = new Shape();
    
    /**
     * 铅笔对象
     * @class CurveClosed
     * @constructor
     * @extends CurveClosed.prorotype 
     */
    Eraser = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default Shape
         */
        this.name = 'Eraser';
        
        /**
         * 绘制矩形图形
         * @method paint
         * @param {Object} context 绘图上下文 
         */
        this.paint = function(context){
            var 
               option = this.getOption(),
               list = option.list,
               start = list[0],
               len = list.length,
               i = 0;
            
            context.save();//保存上下文信息            
            
            //设置属性
            context.strokeStyle = option.color;
            context.lineWidth = option.lineWidth;          
            
            //绘制
            context.beginPath();
            
            context.moveTo(start.x, start.y);
            for(i; i<len; i=i+1){
               context.lineTo(list[i].x, list[i].y); 
            }
            context.stroke();
            context.restore();//回复上下文
        };
    };
    
    /**
     * 铅笔对象原型
     * @class Eraser.prototype
     * @static 
     */
    Eraser.prototype = new Shape();
    
        /**
     * 铅笔对象
     * @class FloodFill
     * @constructor
     * @extends FloodFill.prorotype 
     */
    FloodFill = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default Shape
         */
        this.name = 'Eraser';
        
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
            context.fillStyle = option.fillStyle;          
            
            //绘制
            context.fillRect(0,0,1000,400);
            context.restore();//回复上下文
        };
    };
    
    /**
     * 铅笔对象原型
     * @class FloodFill.prototype
     * @static 
     */
    FloodFill.prototype = new Shape();
    
            /**
     * 铅笔对象
     * @class EyeDropper
     * @constructor
     * @extends EyeDropper.prorotype 
     */
    EyeDropper = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default Shape
         */
        this.name = 'EyeDropper';
        
        /**
         * 绘制矩形图形
         * @method paint
         * @param {Object} context 绘图上下文 
         */
        this.paint = function(context){
            var 
               option = this.getOption(),
               $color = $('#tool-wrap .tool .color'),
               lists;
               
            lists = context.getImageData(option.x, option.y, 10,10);
            
            global.console.log(lists);
        };   
    };
    
    /**
     * 铅笔对象原型
     * @class EyeDropper.prototype
     * @static 
     */
    EyeDropper.prototype = new Shape();
	
	//添加变量
	global.painter = global.painter || {};
	global.painter.model = global.painter.model || {};
	global.painter.model.shapeModel = global.painter.model.shapeModel || {};
	global.painter.model.shapeModel.Shape = Shape;
	global.painter.model.shapeModel.Line = Line;
	global.painter.model.shapeModel.Rectangle = Rectangle;
	global.painter.model.shapeModel.RoundRectangle = RoundRectangle;
	global.painter.model.shapeModel.Ellipes = Ellipes;
	global.painter.model.shapeModel.Pen = Pen;
	global.painter.model.shapeModel.CurveClosed = CurveClosed;
	global.painter.model.shapeModel.Eraser = Eraser;
	global.painter.model.shapeModel.FloodFill = FloodFill;
	global.painter.model.shapeModel.EyeDropper = EyeDropper;
}(jQuery, window));