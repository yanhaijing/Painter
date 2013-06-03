/**
 * @author yan
 * @namespace shape
 */

(function($, global){
    "use strict";
    var
        //图形类所有图形的超级父类
        Shape = null,
        //填充+轮廓类图形父类
        FillStroke,
        Line = null,
        CurveClosed,
        Rect = null,
        RectRound = null,
        Circle = null,
        //椭圆类
        Ellipes,
        //轮廓类工具超级父类
        Stroke,
        Pen = null,
        CurveClosedStroke,
        RectStroke = null,
        RectRoundStroke = null,
        CircleStroke = null,
        Eraser,
        FloodFill,
        EyeDropper,
        //十字类
        Cross,
        
        //椭圆类
        EllipesStroke,
        //文字类
        Text,
        //文本轮廓类
        TextStroke,
        
        //图像
        ImageShape;
        
        
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
	     * @default {} 
	     */
	    this.option = {};
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
            $.extend(true, this.option, option);
            
            return this.option;
        },
        
        /**
         * 获取工具参数对象
         * @method getOption 
         * @return {Object} 返回当前工具参数对象
         */       
        getOption:function(){
            return this.option;
        },
        
        /**
         * 重绘图形方法
         * @method repaint
         * @param {Object} context 要绘制到的上下文
         */
         repaint:function(context){
            this.paint(context);
         },
         
         /**
         * 设置填充轮廓类图形的属性
         * @method setAttributes
         * @param {Object} context 设置的上下文
         */
        setAttributes:function(context){
            //nothing
        }
	};
	
	/**
	 * 填充轮廓类图形超级父类
	 * @class FillStroke
	 * @constructor
	 * @extends FillStroke.prototype
	 */
	FillStroke = function(){
	    /**
         * 名称
         * @property name
         * @type String
         * @default Shape
         */
	    this.name = "FillStroke";
	    
	    /**
	     * 设置填充轮廓类图形的属性
	     * @method setAttributes
	     * @param {Object} context 设置的上下文
	     */
	    this.setAttributes = function(context){
	        var 
               option = this.getOption();
               
           //设置直线属性
            context.strokeStyle = option.strokeStyle;
            context.fillStyle = option.fillStyle;
            context.lineWidth = option.lineWidth;
            context.globalAlpha = option.opacity / 100;
            context.lineJoin = option.lineJoin;
            context.lineCap = option.lineCap;
            context.shadowOffsetX = option.shadowOffsetX;
            context.shadowOffsetY = option.shadowOffsetY;
            context.shadowBlur = option.shadowBlur;
            context.shadowColor = option.shadowColor;
	    }
	};
	/**
     * 填充轮廓类图形超级父类原型
     * @class FillStroke
     * @static
     * @extends Shape
     */
	FillStroke.prototype = new Shape();
	
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
	        
	        context.save();//保存上下文信
	        
	        //设置直线属性
            this.setAttributes(context);
	        
	        
	        //描述直线
	        context.beginPath();
            context.moveTo(option.startX, option.startY);
            context.lineTo(option.endX, option.endY);
                                   
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
	Line.prototype = new FillStroke();
	
	/**
     * 闭合曲线对象
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
            this.setAttributes(context);           
            
            //绘制
            context.beginPath();
            
            context.moveTo(start.x, start.y);
            for(i; i<len; i=i+1){
               context.lineTo(list[i].x, list[i].y); 
            }
            context.closePath();
            context.fill();
            context.stroke();
            context.restore();//回复上下文
        };
    };
    
    /**
     * 闭合曲线对象原型
     * @class CurveClosed.prototype
     * @static 
     */
    CurveClosed.prototype = new FillStroke();
    
	/**
	 * 矩形对象
	 * @class Rect
	 * @constructor
	 * @extends Rect.prorotype 
	 */
	Rect = function(){
	   /**
         * 名称
         * @property name
         * @type String
         * @default Shape
         */
        this.name = 'Rect';
        
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
            this.setAttributes(context);           
            
            //绘制
            context.fillRect(option.left, option.top, option.width, option.height);
            context.strokeRect(option.left, option.top, option.width, option.height);
            context.restore();//回复上下文
        };
	};
	
	/**
     * 矩形对象原型
     * @class Rect.prototype
     * @static 
     */
    Rect.prototype = new FillStroke();
    
    /**
     * 圆角矩形对象
     * @class RectRound
     * @constructor
     * @extends RectRound.prorotype 
     */
    RectRound = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default Shape
         */
        this.name = 'RectRound';
    };
    
    /**
     * 矩形对象原型
     * @class RectRound.prototype
     * @static 
     */
    RectRound.prototype = new Rect();
    
    /**
     * 椭圆对象
     * @class Circle
     * @constructor
     * @extends Circle.prorotype 
     */
    Circle = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default Shape
         */
        this.name = 'Circle';
        
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
            this.setAttributes(context);           
            
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
     * @class Circle.prototype
     * @static 
     */
    Circle.prototype = new FillStroke();
    
    //绘制椭圆方法
    function EllipesDraw(context, x, y, width, height){
       var k = (width/0.75)/2,
           w = width/2,
           h = height/2;
       context.beginPath();
       context.moveTo(x, y-h);
       context.bezierCurveTo(x+k, y-h, x+k, y+h, x, y+h);
       context.bezierCurveTo(x-k, y+h, x-k, y-h, x, y-h);
       context.closePath();
       return context;
    }
    /**
     * 椭圆类对象
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
               option = this.getOption(),
               x = option.x,
               y = option.y,
               width = option.width,
               height = option.height;
            
            context.save();//保存上下文信息            
            
            //设置属性
            this.setAttributes(context); 
            
            //描述图形
            EllipesDraw(context, x, y, width, height);        
            
            //绘制  
            context.fill();
            context.stroke();          
            context.restore();//回复上下文
        };   
    };
        
    /**
     * 椭圆类原型
     * @class Ellipes.prototype
     * @static 
     */
    Ellipes.prototype = new FillStroke();
    
    /**
     * 轮廓类图形超级父类
     * @class Stroke
     * @constructor
     * @extends Stroke.prototype
     */
    Stroke = function(){
        /**
         * 名称
         * @property name
         * @type String
         * @default Shape
         */
        this.name = "Stroke";
        
        /**
         * 设置填充轮廓类图形的属性
         * @method setAttributes
         * @param {Object} context 设置的上下文
         */
        this.setAttributes = function(context){
            var 
               option = this.getOption();
               
           //设置直线属性
            context.strokeStyle = option.strokeStyle;
            context.lineWidth = option.lineWidth;
            context.globalAlpha = option.opacity / 100;
            context.lineJoin = option.lineJoin;
            context.lineCap = option.lineCap;
            context.shadowOffsetX = option.shadowOffsetX;
            context.shadowOffsetY = option.shadowOffsetY;
            context.shadowBlur = option.shadowBlur;
            context.shadowColor = option.shadowColor;
        }
    };
    /**
     * 轮廓类图形超级父类原型
     * @class Stroke
     * @static
     * @extends Shape
     */
    Stroke.prototype = new Shape();
    
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
            this.setAttributes(context);           
            
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
     * @extends Stroke
     */
    Pen.prototype = new Stroke();
    
    /**
     * 铅笔对象
     * @class CurveClosedStroke
     * @constructor
     * @extends CurveClosedStroke.prorotype 
     */
    CurveClosedStroke = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default Shape
         */
        this.name = 'CurveClosedStroke';
        
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
            this.setAttributes(context);            
            
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
     * @class CurveClosedStroke.prototype
     * @static 
     */
    CurveClosedStroke.prototype = new Stroke();    
    
    /**
     * 矩形对象
     * @class RectStroke
     * @constructor
     * @extends RectStroke.prorotype 
     */
    RectStroke = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default Shape
         */
        this.name = 'RectStroke';
        
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
            this.setAttributes(context);           
            
            //绘制
            context.strokeRect(option.left, option.top, option.width, option.height);
            context.restore();//回复上下文
        };
    };
    
    /**
     * 矩形对象原型
     * @class RectStroke.prototype
     * @static 
     */
    RectStroke.prototype = new Stroke();
    
    /**
     * 圆角矩形对象
     * @class RectRoundStroke
     * @constructor
     * @extends RectRoundStroke.prorotype 
     */
    RectRoundStroke = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default Shape
         */
        this.name = 'RectRoundStroke';
    };
    
    /**
     * 矩形对象原型
     * @class RectRoundStroke.prototype
     * @static 
     */
    RectRoundStroke.prototype = new RectStroke();
    
    /**
     * 椭圆对象
     * @class CircleStroke
     * @constructor
     * @extends CircleStroke.prorotype 
     */
    CircleStroke = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default Shape
         */
        this.name = 'CircleStroke';
        
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
            this.setAttributes(context);            
            
            //绘制
            context.beginPath();
            context.arc(option.x, option.y, option.radius, 0, Math.PI * 2, true);
            context.closePath();
            context.stroke();
            context.restore();//回复上下文
        };
    };
    
    /**
     * 圆形对象原型
     * @class CircleStroke.prototype
     * @static 
     */
    CircleStroke.prototype = new Stroke();
    
    /**
     * 椭圆类对象
     * @class EllipesStroke
     * @constructor
     * @extends EllipesStroke.prorotype 
     */
    EllipesStroke = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default Shape
         */
        this.name = 'EllipesStroke';
        
        /**
         * 绘制矩形图形
         * @method paint
         * @param {Object} context 绘图上下文 
         */
        this.paint = function(context){
           var 
               option = this.getOption(),
               x = option.x,
               y = option.y,
               width = option.width,
               height = option.height;
            
            context.save();//保存上下文信息            
            
            //设置属性
            this.setAttributes(context); 
            
            //描述图形
            EllipesDraw(context, x, y, width, height);       
            
            //绘制  
            context.stroke();          
            context.restore();//回复上下文
        };   
    };
        
    /**
     * 椭圆类原型
     * @class EllipesStroke.prototype
     * @static 
     */
    EllipesStroke.prototype = new Stroke();
    
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
            context.shadowOffsetX = option.shadowOffsetX;
            context.shadowOffsetY = option.shadowOffsetY;
            context.shadowBlur = option.shadowBlur;
            context.shadowColor = option.shadowColor;
            context.lineJoin = option.lineJoin;
            context.lineCap = option.lineCap;
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
        this.name = 'FloodFill';        
        
        /**
         * 绘制矩形图形
         * @method paint
         * @param {Object} context 绘图上下文 
         */
        this.paint = function(context){
            var 
               option = this.getOption(),
               width = option.width,
               height = option.height;
            
            context.save();//保存上下文信息            
            
            //设置属性
            context.fillStyle = option.fillStyle;
            context.globalAlpha = option.opacity / 100;          
            
            //绘制
            context.fillRect(0,0,width,height);
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
               $color = $('#tool-wrap .tool .color').eq(0),
               datas = context.getImageData(option.x, option.y, 1,1).data,
               r = datas[0],
               g = datas[1],
               b = datas[2],
               a = datas[3] / 255,
               color = "rgba(".concat(r, ",", g, ",", b, ",", a, ")");
               
            $color.spectrum("set", color);
        };  
        this.repaint = function(){
            //do nothing
        } 
    };
    
    /**
     * 铅笔对象原型
     * @class EyeDropper.prototype
     * @static 
     */
    EyeDropper.prototype = new Shape();
    
    /**
     * 十字类对象
     * @class Cross
     * @constructor
     * @extends Cross.prorotype 
     */
    Cross = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default Shape
         */
        this.name = 'Cross';
        
        /**
         * 绘制矩形图形
         * @method paint
         * @param {Object} context 绘图上下文 
         */
        this.paint = function(context){
           var 
               option = this.getOption(),
               x = option.x,
               y = option.y,
               len = option.length,
               line1StartX = x - len,
               line1StartY = y,
               line1EndX = x + len,
               line1EndY = y,
               line2StartX = x,
               line2StartY = y - len,
               line2EndX = x,
               line2EndY = y + len;
            
            context.save();//保存上下文信息            
            
            //设置属性
            context.strokeStyle = option.strokeStyle;
            context.lineWidth = option.lineWidth;
            context.shadowOffsetX = option.shadowOffsetX;
            context.shadowOffsetY = option.shadowOffsetY;
            context.shadowBlur = option.shadowBlur;
            context.shadowColor = option.shadowColor;
            context.lineJoin = option.lineJoin;
            context.lineCap = option.lineCap;
            context.globalAlpha = option.opacity / 100; 
            
            //描述图形
            context.beginPath();
            context.moveTo(line1StartX, line1StartY); 
            context.lineTo(line1EndX, line1EndY);
            context.moveTo(line2StartX, line2StartY); 
            context.lineTo(line2EndX, line2EndY);
            context.closePath();        
            
            //绘制  
            context.stroke();          
            context.restore();//回复上下文
        };   
    };
    
    /**
     * 十字类原型
     * @class Cross.prototype
     * @static 
     */
    Cross.prototype = new Shape();                
    
    /**
     * 椭圆类对象
     * @class Text
     * @constructor
     * @extends Text.prorotype 
     */
    Text = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default Shape
         */
        this.name = 'Text';
        
        /**
         * 设置填充轮廓类图形的属性
         * @method setAttributes
         * @param {Object} context 设置的上下文
         */
        this.setAttributes = function(context){
            var 
               option = this.getOption();
               
           //设置直线属性
            context.shadowOffsetX = option.shadowOffsetX;
            context.shadowOffsetY = option.shadowOffsetY;
            context.shadowBlur = option.shadowBlur;
            context.shadowColor = option.shadowColor;
            context.strokeStyle = option.strokeStyle;
            context.fillStyle = option.fillStyle;
            context.globalAlpha = option.opacity / 100;
            context.font = option.italic + " " + option.bold + " " + option.size + "px " + option.family;
            context.lineWidth = option.border;
            context.textAlign = option.textAlign;
        };
        
        /**
         * 绘制矩形图形
         * @method paint
         * @param {Object} context 绘图上下文 
         */
        this.paint = function(context){
           var 
               option = this.getOption(),
               x = option.x,
               y = option.y,
               text = option.text;
            
            context.save();//保存上下文信息            
            
            //设置属性
            this.setAttributes(context);  
            
            //绘制图形
            context.fillText(text, x, y);       
            context.strokeText(text, x, y);          
            context.restore();//回复上下文
        };   
    };
        
    /**
     * 椭圆类原型
     * @class Text.prototype
     * @static 
     */
    Text.prototype = new Shape();
    
    /**
     * 椭圆类对象
     * @class TextStroke
     * @constructor
     * @extends TextStroke.prorotype 
     */
    TextStroke = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default Shape
         */
        this.name = 'Text';
        
        /**
         * 绘制矩形图形
         * @method paint
         * @param {Object} context 绘图上下文 
         */
        this.paint = function(context){
           var 
               option = this.getOption(),
               x = option.x,
               y = option.y,
               text = option.text;
            
            context.save();//保存上下文信息            
            
            //设置属性
            this.setAttributes(context); 
            
            //绘制图形      
            context.strokeText(text, x, y);          
            context.restore();//回复上下文
        };   
    };
        
    /**
     * 椭圆类原型
     * @class TextStroke.prototype
     * @static 
     */
    TextStroke.prototype = new Text();
    
    /**
     * 图像类对象
     * @class ImageShape
     * @constructor
     * @extends ImageShape.prorotype 
     */
    ImageShape = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default Shape
         */
        this.name = 'ImageShape';        
        
        /**
         * 绘制矩形图形
         * @method paint
         * @param {Object} context 绘图上下文 
         */
        this.paint = function(context){
           var 
               option = this.getOption(),
               x = option.x,
               y = option.y,
               image = option.image;
            
            context.save();//保存上下文信息            
            
            //设置属性
            this.setAttributes(context); 
            
            //绘制图形      
            context.drawImage(image, x, y);          
            context.restore();//回复上下文
        };   
    };
        
    /**
     * 图像类原型
     * @class ImageShape.prototype
     * @static 
     */
    ImageShape.prototype = new Shape();
	
	//添加变量
	global.painter = global.painter || {};
	global.painter.model = global.painter.model || {};
	global.painter.model.shapeModel = global.painter.model.shapeModel || {};
	global.painter.model.shapeModel.Line = Line;
	global.painter.model.shapeModel.CurveClosed = CurveClosed;
	global.painter.model.shapeModel.Rect = Rect;
	global.painter.model.shapeModel.RectRound = RectRound;
	global.painter.model.shapeModel.Circle = Circle;
	global.painter.model.shapeModel.Pen = Pen;
	global.painter.model.shapeModel.CurveClosedStroke = CurveClosedStroke;
	global.painter.model.shapeModel.RectStroke = RectStroke;
    global.painter.model.shapeModel.RectRoundStroke = RectRoundStroke;
    global.painter.model.shapeModel.CircleStroke = CircleStroke;
	global.painter.model.shapeModel.Eraser = Eraser;
	global.painter.model.shapeModel.FloodFill = FloodFill;
	global.painter.model.shapeModel.EyeDropper = EyeDropper;
	global.painter.model.shapeModel.Cross = Cross;
	global.painter.model.shapeModel.Ellipes = Ellipes;
	global.painter.model.shapeModel.EllipesStroke = EllipesStroke;
	global.painter.model.shapeModel.Text = Text;
	global.painter.model.shapeModel.TextStroke = TextStroke;
	global.painter.model.shapeModel.ImageShape = ImageShape;
}(jQuery, window));