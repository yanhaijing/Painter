/**
 * @author yan
 * @module shapeModel
 * @namespace painter.model.shapeModel
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
        Circle = null,
        //椭圆类
        Ellipes,
        //轮廓类工具超级父类
        Stroke,
        Pen = null,
        CurveClosedStroke,
        RectStroke = null,
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
     * @extends painter.model.shapeModel.Shape.prototype
     */
	Shape = function(){
	    /**
	     * 名称
	     * @property name
	     * @type String
	     * @default Shape 
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
			this.option = {};//初始化为空
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
	 * @extends painter.model.shapeModel.FillStroke.prototype
	 */
	FillStroke = function(){
	    /**
         * 名称
         * @property name
         * @type String
         * @default FillStroke
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
     * @class FillStroke.prototype
     * @static
     * @extends painter.model.shapeModel.Shape
     */
	FillStroke.prototype = new Shape();
	
	/**
	 * 直线对象
	 * @class Line
	 * @constructor
	 * @extends painter.model.shapeModel.Line.protorype 
	 */
	Line = function(){
	    /**
         * 名称
         * @property name
         * @type String
         * @default Line
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
	 * @extends painter.model.shapeModel.FillStroke
	 */
	Line.prototype = new FillStroke();
	
	/**
     * 闭合曲线对象
     * @class CurveClosed
     * @constructor
     * @extends painter.model.shapeModel.CurveClosed.prototype 
     */
    CurveClosed = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default CurveClosed
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
     * @extends painter.model.shapeModel.FillStroke
     */
    CurveClosed.prototype = new FillStroke();
    
	/**
	 * 矩形对象
	 * @class Rect
	 * @constructor
	 * @extends painter.model.shapeModel.Rect.prototype 
	 */
	Rect = function(){
	   /**
         * 名称
         * @property name
         * @type String
         * @default Rect
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
     * @extends painter.model.shapeModel.FillStroke
     */
    Rect.prototype = new FillStroke();
    
    /**
     * 椭圆对象
     * @class Circle
     * @constructor
     * @extends painter.model.shapeModel.Circle.prototype 
     */
    Circle = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default Circle
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
     * @extends painter.model.shapeModel.FillStroke
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
     * @extends painter.model.shapeModel.Ellipes.prototype 
     */
    Ellipes = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default Ellipes
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
     * @extends painter.model.shapeModel.FillStroke
     */
    Ellipes.prototype = new FillStroke();
    
    /**
     * 轮廓类图形超级父类
     * @class Stroke
     * @constructor
     * @extends painter.model.shapeModel.Stroke.prototype
     */
    Stroke = function(){
        /**
         * 名称
         * @property name
         * @type String
         * @default Stroke
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
     * @class Stroke.prototype
     * @static
     * @extends painter.model.shapeModel.Shape
     */
    Stroke.prototype = new Shape();
    
    /**
     * 铅笔对象
     * @class Pen
     * @constructor
     * @extends painter.model.shapeModel.Pen.prototype 
     */
    Pen = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default Pen
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
     * @extends painter.model.shapeModel.Stroke
     */
    Pen.prototype = new Stroke();
    
    /**
     * 铅笔对象
     * @class CurveClosedStroke
     * @constructor
     * @extends painter.model.shapeModel.CurveClosedStroke.prototype 
     */
    CurveClosedStroke = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default "CurveClosedStroke"
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
     * @extends painter.model.shapeModel.Stroke
     */
    CurveClosedStroke.prototype = new Stroke();    
    
    /**
     * 矩形对象
     * @class RectStroke
     * @constructor
     * @extends painter.model.shapeModel.RectStroke.prototype 
     */
    RectStroke = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default 'RectStroke'
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
     * @extends painter.model.shapeModel.Stroke
     */
    RectStroke.prototype = new Stroke();      
    
    /**
     * 椭圆对象
     * @class CircleStroke
     * @constructor
     * @extends painter.model.shapeModel.CircleStroke.prototype 
     */
    CircleStroke = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default 'CircleStroke'
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
     * @extends painter.model.shapeModel.Stroke
     */
    CircleStroke.prototype = new Stroke();
    
    /**
     * 椭圆类对象
     * @class EllipesStroke
     * @constructor
     * @extends painter.model.shapeModel.EllipesStroke.prototype 
     */
    EllipesStroke = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default 'EllipesStroke'
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
     * @extends painter.model.shapeModel.Stroke
     */
    EllipesStroke.prototype = new Stroke();
    
    /**
     * 橡皮类对象
     * @class Eraser
     * @constructor
     * @extends painter.model.shapeModel.Eraser.prototype 
     */
    Eraser = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default 'Eraser'
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
     * 橡皮类原型
     * @class Eraser.prototype
     * @static 
     * @extends painter.model.shapeModel.Shape
     */
    Eraser.prototype = new Shape();
    
    /**
     * 油漆桶对象
     * @class FloodFill
     * @constructor
     * @extends painter.model.shapeModel.FloodFill.prototype 
     */
    FloodFill = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default 'FloodFill'
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
               color = option.fillStyle,
               start = color.indexOf("(") + 1,
               temp = color.slice(start, -1),
               temps = temp.split(","),
               colorObj = {
                   r:parseInt(temps[0], 10),
                   g:parseInt(temps[1], 10),
                   b:parseInt(temps[2], 10),
                   a:Math.ceil((temps[3]||1) * 255)
               },             
               x = option.x,
               y = option.y,               
               width = option.width,
               height = option.height,
               imageData = context.getImageData(0, 0, width, height),
               datas = imageData.data,
               index = (width * y + x) * 4,
               r = datas[index],
               g = datas[index + 1],
               b = datas[index + 2],
               a = datas[index + 3] / 255,
               sourceColor = "rgba(".concat(r, ",", g, ",", b, ",", a, ")");
            
            function flood(x, y, width, height, datas, sourceColor, desColor, desColorObj){
                var
                    index = (width * y + x) * 4,
                    r = datas[index],
                    g = datas[index + 1],
                    b = datas[index + 2],
                    a = datas[index + 3] / 255,
                    color = "rgba(".concat(r, ",", g, ",", b, ",", a, ")");
                
                //如果当前像素颜色和  目的颜色相等，返回
                if(color === desColor){
                    return 1;
                }
                
                //如果颜色和元颜色一样,递归
                if(color === sourceColor){
                    //颜色一样替换颜色为目的颜色
                    datas[index] = desColorObj.r;
                    datas[index + 1] = desColorObj.g;
                    datas[index + 2] = desColorObj.b;
                    datas[index + 3] = desColorObj.a;
                    
                    //递归
                    if(x > 0){
                        flood(x - 1, y, width, height, datas, sourceColor, desColor, desColorObj);
                    }
                    if(x < width){
                        flood(x + 1, y, width, height, datas, sourceColor, desColor, desColorObj);
                    }
                    if(y > 0){
                        flood(x, y-1, width, height, datas, sourceColor, desColor, desColorObj);
                    }
                    if(y < height){
                        flood(x, y+1, width, height, datas, sourceColor, desColor, desColorObj);
                    }
                }
                
                return 0;
            }
            
            try{
                flood(x, y, width, height, datas, sourceColor, color, colorObj);
            }catch(ex){
                global.console.log(ex.message);
            }
                       
            context.save();//保存上下文信息            
            
            //绘制         
            context.putImageData(imageData, 0, 0);
            
            //回复上下文
            context.restore();
        };
    };
    
    /**
     * 油漆桶对象原型
     * @class FloodFill.prototype
     * @static 
     * @extends painter.model.shapeModel.Shape
     */
    FloodFill.prototype = new Shape();
    
    /**
     * 吸管对象
     * @class EyeDropper
     * @constructor
     * @extends painter.model.shapeModel.EyeDropper.prototype 
     */
    EyeDropper = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default 'EyeDropper'
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
        
        /**
         * 重绘
         * @method repaint
         */  
        this.repaint = function(){
            //do nothing
        }; 
    };
    
    /**
     * 吸管对象原型
     * @class EyeDropper.prototype
     * @static 
     * @extends painter.model.shapeModel.Shape
     */
    EyeDropper.prototype = new Shape();
    
    /**
     * 十字类对象
     * @class Cross
     * @constructor
     * @extends painter.model.shapeModel.Cross.prototype 
     */
    Cross = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default 'Cross'
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
     * @extends painter.model.shapeModel.Shape
     */
    Cross.prototype = new Shape();                
    
    /**
     * 文本类对象
     * @class Text
     * @constructor
     * @extends painter.model.shapeModel.Text.prototype 
     */
    Text = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default 'Text'
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
     * 文本类原型
     * @class Text.prototype
     * @static 
     * @extends painter.model.shapeModel.Shape
     */
    Text.prototype = new Shape();
    
    /**
     * 文本轮廓类对象
     * @class TextStroke
     * @constructor
     * @extends painter.model.shapeModel.TextStroke.prototype 
     */
    TextStroke = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default 'TextStroke'
         */
        this.name = 'TextStroke';
        
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
     * 文本轮廓类原型
     * @class TextStroke.prototype
     * @static 
     * @extends painter.model.shapeModel.Text
     */
    TextStroke.prototype = new Text();
    
    /**
     * 图像类对象
     * @class ImageShape
     * @constructor
     * @extends painter.model.shapeModel.ImageShape.prototype 
     */
    ImageShape = function(){
       /**
         * 名称
         * @property 'ImageShape'
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
               src = option.src,
               width = option.width,
               height = option.height,
               image = new Image(),
               that = this;
            
            image.src = src;
            
            image.onload = function(){
                context.save();//保存上下文信息            
            
                //设置属性
                that.setAttributes(context); 
                
                //绘制图形      
                context.drawImage(image, x, y, width, height);          
                context.restore();//回复上下文
            };            
        };   
    };
        
    /**
     * 图像类原型
     * @class ImageShape.prototype
     * @static 
     * @extends painter.model.shapeModel.Shape
     */
    ImageShape.prototype = new Shape();
	
	//添加变量
	global.painter = global.painter || {};
	global.painter.model = global.painter.model || {};
	global.painter.model.shapeModel = global.painter.model.shapeModel || {};
	global.painter.model.shapeModel.Line = Line;
	global.painter.model.shapeModel.CurveClosed = CurveClosed;
	global.painter.model.shapeModel.Rect = Rect;
	global.painter.model.shapeModel.Circle = Circle;
	global.painter.model.shapeModel.Pen = Pen;
	global.painter.model.shapeModel.CurveClosedStroke = CurveClosedStroke;
	global.painter.model.shapeModel.RectStroke = RectStroke;
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