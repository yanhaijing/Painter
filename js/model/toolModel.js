/**
 * @author yan
 * @module toolModel
 * @main toolModel
 * @namespace painter.model.toolModel
 */

(function($, global){
	"use strict";
	
	var
	   //所有工具超级父类 
	   Tool,
	   //图形工具父类
	   Shape,
	   Line,
	   CurveClosed,
	   Rect,
	   Circle,
	   //椭圆工具类
       Ellipes,
	   //轮廓工具父类
	   Stroke,
	   Pen,
	   CurveClosedStroke,
	   RectStroke,
       CircleStroke,
	   Eraser,
	   FloodFill,
	   EyeDropper,
	   //十字工具类
	   Cross,	   
	   EllipesStroke,
	   //文字类
	   Text,
	   //文字轮廓类
	   TextStroke;
	
	/**
	 * 工具对象
	 * @class Tool
	 * @constructor
	 * @param {Object} option 当前工具参数
	 * @extends painter.model.toolModel.Tool.prototype
	 */
	Tool = function(option){
	    /**
         * 当前工具对应的名称
         * @property name
         * @type String
         * @default 'Tool'
         */
		this.name = 'Tool';
		
		/**
         * 当前工具对应的类名
         * @property className
         * @type String
         * @default 'shape'
         */
		this.className = "shape";
		
		/**
		 * 当前工具对应的鼠标对象
		 * @property mouse
		 * @type String
		 * @default 'Mouse'
		 */
		this.mouse = "Mouse";
		
		/**
         * 当前工具对应的参数
         * @property option
         * @type Object
         * @default {
         *  strokeStyle:'#000',
         *  fillStyle:'#000',
         *  lineWidth:1
         *}
         */
		this.option = {
			strokeStyle:'#000',
			fillStyle:'#000',
			lineWidth:1
		};
		
		//设置参数
		option !== undefined ? $.extend(this.option, option) : 0;
	};
	
	/**
	 * 工具原型
	 * @class Tool.prototype
	 * @static
	 */
	Tool.prototype = {
	    /**
         * 获取类别名字
         * @method getClassName
         * @return {String} 当前的类别名字
         */
	    getClassName:function(){
	       return this.className; 
	    },
	     
		/**
		 * 获取名字
		 * @method getName
		 * @return {String} 当前的名字
		 */
		getName:function(){
			return this.name;	
		},
		
		/**
		 * 设置工具参数对象
		 * @method setOption
		 * @param {Object} option 设置的参数集和
		 * @return {Object} 成功返回设置对象，失败返回null
		 */
		setOption:function(option){
			//检查入口参数是否是对象
			if(typeof option === 'object'){
				$.extend(true, this.option, option);
				return this.getOption();
			} 
			
			return null;
		},
		
		/**
		 * 获取工具参数对象
		 * @method getOption 
		 * @return {Object} 返回当前工具参数对象
		 */
		getOption:function(){
			return $.extend(true, {}, this.option);//放回选项对象的深拷贝
		},
		
		/**
		 * 获取当前工具对应的鼠标
		 * @method getMouse
		 * @param {String} 鼠标的索引
		 */
		getMouse:function(){
		    return this.mouse;
		}
	};
	
	/**
     * 图形类工具超级父类
     * @class Shape
     * @constructor
     * @extends painter.model.toolModel.Shape.prototype
     */
	Shape = function(){
	    /**
         * 名称
         * @property name
         * @type String
         * @default 'Shape' 
         */
	    this.name = "Shape";
	    /**
         * 当前工具对应的鼠标对象
         * @property mouse
         * @type String
         * @default 'Cross'
         */
	    this.mouse = "Cross";
	    
	    /**
	     * 初始化图形类属性面板的参数
	     * @method initAttributes
	     * @return {Object} 当前工具 参数
	     */
	    this.initAttributes = function(){
	        //获取当前属性
            var 
              $attributePanel = $('#tool-shape-attribute-panel'),
              width = $('.width',$attributePanel).eq(0).val(),
              opacity = $('.opacity',$attributePanel).eq(0).val(),
              color = $('#tool-wrap .tool .color').eq(0).val(),
              lineJoin = $(':radio[name="line-join"]',$attributePanel).val(),
              shadowOffsetX = $('.shadow-offsetx',$attributePanel).eq(0).val(),
              shadowOffsetY = $('.shadow-offsety',$attributePanel).eq(0).val(),
              shadowBlur = $('.shadow-blur',$attributePanel).eq(0).val(),
              shadowColor = $('.shadow-color',$attributePanel).eq(0).val(),
              lineCap = $(':radio[name="line-cap"]',$attributePanel).val();       
            
            //设置参数
            return this.setOption({
                lineWidth: width,
                opacity: opacity,
                strokeStyle: color,
                fillStyle:color,
                lineJoin:lineJoin,
                lineCap:lineCap,
                shadowOffsetX:shadowOffsetX,
                shadowOffsetY:shadowOffsetY,
                shadowBlur:shadowBlur,
                shadowColor:shadowColor
            });
	    };
	};
	
	/**
	 * 图形类工具原型
	 * @class Shape.prototype
	 * @static
	 * @extends painter.model.toolModel.Tool
	 */
	Shape.prototype = new Tool();
	/**
	 * 直线工具对象
	 * @class Line
	 * @constructor
	 * @extends painter.model.toolModel.Line.prototype
	 */
	Line = function(){
	    /**
	     * 名称
	     * @property name
	     * @type String
	     * @default 'Line' 
	     */
		this.name = 'Line';
		
		/**
		 * 初始化
		 * @method init 
		 * @return {Bollean} 初始化是否成功
		 */
		this.init = function(){
		    this.initAttributes();//初始化属性面板参数
		};
		
		/**
		 * 设置坐标参数参数
		 * @method setPoint
		 * @param {Object} 参数
		 * @return {Object} 设置完的参数
		 */
		this.setPoint = function(pointList){
		    var 
               startPoint = pointList.getStart(),
               endPoint = pointList.getEnd(),
               startX = startPoint.x,
               startY = startPoint.y,
               endX = endPoint.x,
               endY = endPoint.y;
               
             return this.setOption({
                 startX: startX,
                 startY: startY,
                 endX: endX,
                 endY: endY
             });
		};
	};
	
	/**
	 * 直线工具原型
	 * @class Line.prototype
	 * @static
	 * @extends painter.model.toolModel.Shape
	 */
	Line.prototype = new Shape();
	
	/**
     * 闭合曲线工具对象
     * @class CurveClosed
     * @constructor
     * @extends painter.model.toolModel.CurveClosed.prototype
     */
    CurveClosed = function(){
        /**
         * 名称
         * @property name
         * @type String
         * @default 'CurveClosed' 
         */
        this.name = 'CurveClosed';
        
        /**
         * 初始化
         * @method init 
         * @return {Bollean} 初始化是否成功
         */
        this.init = function(){
            this.initAttributes();//初始化属性面板参数
        };
        
        /**
         * 设置坐标参数参数
         * @method setPoint
         * @param {Object} 参数
         * @return {Object} 设置完的参数
         */
        this.setPoint = function(pointList){
            var 
               list = pointList.getList();
             
             this.option.list = [];//更新当前列表  
             return this.setOption({
                 list:list
             });
        };
    };
    
    /**
     * 闭合曲线工具原型
     * @class CurveClosed.prototype
     * @static
     * @extends painter.model.toolModel.Shape
     */
    CurveClosed.prototype = new Shape();
    
    
	/**
     * 矩形工具对象
     * @class Rect
     * @constructor
     * @extends painter.model.toolModel.Rect.prototype
     */
    Rect = function(){
        /**
         * 名称
         * @property name
         * @type String
         * @default 'Rect' 
         */
        this.name = 'Rect';
        /**
         * 初始化
         * @method init 
         * @return {Bollean} 初始化是否成功
         */
        this.init = function(){
            this.initAttributes();//初始化属性面板参数
        };
        
        /**
         * 设置坐标参数参数
         * @method setPoint
         * @param {Object} 参数
         * @return {Object} 设置完的参数
         */
        this.setPoint = function(pointList){
            var 
               startPoint = pointList.getStart(),
               endPoint = pointList.getEnd(),
               left = startPoint.x,
               top = startPoint.y,
               width = endPoint.x - left,
               height = endPoint.y - top;
               
             return this.setOption({
                 left: left,
                 top: top,
                 width: width,
                 height: height
             });
        };
    };
    
    /**
     * 矩形工具原型
     * @class Rect.prototype
     * @static
     * @extends painter.model.toolModel.Shape
     */
    Rect.prototype = new Shape();      
    
    /**
     * 椭圆工具对象
     * @class Circle
     * @constructor
     * @extends painter.model.toolModel.Circle.prototype
     */
    Circle = function(){
        /**
         * 名称
         * @property name
         * @type String
         * @default 'Circle' 
         */
        this.name = 'Circle';
        
        /**
         * 初始化
         * @method init 
         * @return {Bollean} 初始化是否成功
         */
        this.init = function(){
            this.initAttributes();//初始化属性面板参数
        };
        
        /**
         * 设置坐标参数参数
         * @method setPoint
         * @param {Object} 参数
         * @return {Object} 设置完的参数
         */
        this.setPoint = function(pointList){
            var 
               startPoint = pointList.getStart(),
               endPoint = pointList.getEnd(),
               x = (startPoint.x + endPoint.x) / 2,//计算园中心坐标
               y = (startPoint.y + endPoint.y) / 2,
               radius = Math.abs(Math.sqrt(Math.pow(startPoint.x, 2) + Math.pow(startPoint.y, 2)) - 
                    Math.sqrt(Math.pow(endPoint.x, 2) + Math.pow(endPoint.y, 2))) / 2;
               
             return this.setOption({
                 x:x,
                 y:y,
                 radius:radius
             });
        };
    };
    
    /**
     * 圆工具原型
     * @class Circle.prototype
     * @static
     * @extends painter.model.toolModel.Shape
     */
    Circle.prototype = new Shape();
    
    /**
     * 椭圆工具对象
     * @class Ellipes
     * @constructor
     * @extends painter.model.toolModel.Ellipes.prototype
     */
    Ellipes = function(){
        /**
         * 名称
         * @property name
         * @type String
         * @default 'Ellipes' 
         */
        this.name = 'Ellipes';
        
        /**
         * 初始化
         * @method init 
         * @return {Bollean} 初始化是否成功
         */
        this.init = function(){
            this.initAttributes();//初始化属性面板参数
        };
        
        /**
         * 设置坐标参数参数
         * @method setPoint
         * @param {Object} 参数
         * @return {Object} 设置完的参数
         */
        this.setPoint = function(pointList){
            var
                startPoint = pointList.getStart(),
                endPoint = pointList.getEnd(),
                x = (startPoint.x + endPoint.x) / 2,//计算园中心坐标
                y = (startPoint.y + endPoint.y) / 2,
                width = Math.abs(startPoint.x - endPoint.x),
                height = Math.abs(startPoint.y - endPoint.y);
            return this.setOption({
                x:x,
                y:y,
                width:width,
                height:height
            });
        };
    };
    
    /**
     * 椭圆工具原型
     * @class Ellipes.prototype
     * @static
     * @extends painter.model.toolModel.Shape
     */
    Ellipes.prototype = new Shape();
    
    
    /**
     * 轮廓类工具超级父类
     * @class Stroke
     * @constructor
     * @extends painter.model.toolModel.Stroke.prototype
     */
    Stroke = function(){
        /**
         * 名称
         * @property name
         * @type String
         * @default 'Stroke' 
         */
        this.name = "Stroke";
        /**
         * 当前工具对应的鼠标对象
         * @property mouse
         * @type String
         * @default 'Cross'
         */
        this.mouse = "Cross";
        
        /**
         * 初始化图形类属性面板的参数
         * @method initAttributes
         */
        this.initAttributes = function(){
            //获取当前属性
            var 
              $attributePanel = $('#tool-stroke-attribute-panel'),
              width = $('.width',$attributePanel).eq(0).val(),
              opacity = $('.opacity',$attributePanel).eq(0).val(),
              color = $('#tool-wrap .tool .color').eq(0).val(),              
              shadowOffsetX = $('.shadow-offsetx',$attributePanel).eq(0).val(),
              shadowOffsetY = $('.shadow-offsety',$attributePanel).eq(0).val(),
              shadowBlur = $('.shadow-blur',$attributePanel).eq(0).val(),
              shadowColor = $('.shadow-color',$attributePanel).eq(0).val(),
              lineJoin = $(':radio[name="line-join"]',$attributePanel).val(),
              lineCap = $(':radio[name="line-cap"]',$attributePanel).val();       
            
            //设置参数
            return this.setOption({
                lineWidth: width,
                opacity: opacity,
                strokeStyle: color,
                lineJoin:lineJoin,
                lineCap:lineCap,
                shadowOffsetX:shadowOffsetX,
                shadowOffsetY:shadowOffsetY,
                shadowBlur:shadowBlur,
                shadowColor:shadowColor
            });
        }
    };
    
    /**
     * 轮廓类工具原型
     * @class Stroke.prototype
     * @static
     * @extends painter.model.toolModel.Tool
     */
    Stroke.prototype = new Tool();
    
    /**
     * 铅笔工具对象
     * @class Pen
     * @constructor
     * @extends painter.model.toolModel.Pen.prototype
     */
    Pen = function(){
        /**
         * 名称
         * @property name
         * @type String
         * @default 'Pen' 
         */
        this.name = 'Pen';
        
        /**
         * 工具类对应的鼠标
         * @property mouse
         * @type String
         * @default 'Pen' 
         */
        this.mouse ="Pen";
        
        /**
         * 初始化
         * @method init 
         * @return {Bollean} 初始化是否成功
         */
        this.init = function(){
            //获取当前属性
            this.initAttributes();
        };
        
        /**
         * 设置坐标参数参数
         * @method setPoint
         * @param {Object} 参数
         * @return {Object} 设置完的参数
         */
        this.setPoint = function(pointList){
            var 
               list = pointList.getList();
             
             this.option.list = [];//更新当前列表  
             return this.setOption({
                 list:list
             });
        };
    };
           
    /**
     * 铅笔工具原型
     * @class Pen.prototype
     * @static
     * @extends painter.model.toolModel.Stroke
     */
    Pen.prototype = new Stroke();
    
    /**
     * 闭合曲线工具对象
     * @class CurveClosedStroke
     * @constructor
     * @extends painter.model.toolModel.CurveClosedStroke.prototype
     */
    CurveClosedStroke = function(){
        /**
         * 名称
         * @property name
         * @type String
         * @default 'CurveClosedStroke' 
         */
        this.name = 'CurveClosedStroke';
        
        /**
         * 工具类对应的鼠标
         * @property mouse
         * @type String
         * @default 'Cross' 
         */
        this.mouse = "Cross";
    };
    
    /**
     * 闭合曲线工具原型
     * @class CurveClosedStroke.prototype
     * @static
     * @extends painter.model.toolModel.Pen
     */
    CurveClosedStroke.prototype = new Pen();        
    
    /**
     * 矩形工具对象
     * @class RectStroke
     * @constructor
     * @extends painter.model.toolModel.RectStroke.prototype
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
         * 初始化
         * @method init 
         * @return {Bollean} 初始化是否成功
         */
        this.init = function(){
            //获取当前属性
            this.initAttributes();
        };
        
        /**
         * 设置坐标参数参数
         * @method setPoint
         * @param {Object} 参数
         * @return {Object} 设置完的参数
         */
        this.setPoint = function(pointList){
            var 
               startPoint = pointList.getStart(),
               endPoint = pointList.getEnd(),
               left = startPoint.x,
               top = startPoint.y,
               width = endPoint.x - left,
               height = endPoint.y - top;
               
             return this.setOption({
                 left: left,
                 top: top,
                 width: width,
                 height: height
             });
        };
    };
    
    /**
     * 矩形工具原型
     * @class RectStroke.prototype
     * @static
     * @extends painter.model.toolModel.Stroke
     */
    RectStroke.prototype = new Stroke();    
    
    /**
     * 椭圆工具对象
     * @class CircleStroke
     * @constructor
     * @extends painter.model.toolModel.CircleStroke.prototype
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
         * 初始化
         * @method init 
         * @return {Bollean} 初始化是否成功
         */
        this.init = function(){
            //获取当前属性
            this.initAttributes();
        };
        
        /**
         * 设置坐标参数参数
         * @method setPoint
         * @param {Object} 参数
         * @return {Object} 设置完的参数
         */
        this.setPoint = function(pointList){
            var 
               startPoint = pointList.getStart(),
               endPoint = pointList.getEnd(),
               x = (startPoint.x + endPoint.x) / 2,//计算园中心坐标
               y = (startPoint.y + endPoint.y) / 2,
               radius = Math.abs(Math.sqrt(Math.pow(startPoint.x, 2) + Math.pow(startPoint.y, 2)) - 
                    Math.sqrt(Math.pow(endPoint.x, 2) + Math.pow(endPoint.y, 2))) / 2;
               
             return this.setOption({
                 x:x,
                 y:y,
                 radius:radius
             });
        };
    };
    
    /**
     * 椭圆工具原型
     * @class CircleStroke.prototype
     * @static
     * @extends painter.model.toolModel.Stroke
     */
    CircleStroke.prototype = new Stroke();
    
    /**
     * 十字工具对象
     * @class EllipesStroke
     * @constructor
     * @extends painter.model.toolModel.EllipesStroke.prototype
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
         * 初始化
         * @method init 
         * @return {Bollean} 初始化是否成功
         */
        this.init = function(){
            //获取当前属性
            this.initAttributes();
        };
        
        /**
         * 设置坐标参数参数
         * @method setPoint
         * @param {Object} 参数
         * @return {Object} 设置完的参数
         */
        this.setPoint = function(pointList){
            var
                startPoint = pointList.getStart(),
                endPoint = pointList.getEnd(),
                x = (startPoint.x + endPoint.x) / 2,//计算园中心坐标
                y = (startPoint.y + endPoint.y) / 2,
                width = Math.abs(startPoint.x - endPoint.x),
                height = Math.abs(startPoint.y - endPoint.y);
            return this.setOption({
                x:x,
                y:y,
                width:width,
                height:height
            });
        };      
    };
    
    /**
     * 十字工具原型
     * @class EllipesStroke.prototype
     * @static
     * @extends painter.model.toolModel.Stroke
     */
    EllipesStroke.prototype = new Stroke();
    
    /**
     * 橡皮工具对象
     * @class Eraser
     * @constructor
     * @extends painter.model.toolModel.Eraser.prototype
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
         * 鼠标名称
         * @property mouse
         * @type String
         * @default 'Eraser' 
         */
        this.mouse = "Eraser";
        
        /**
         * 初始化
         * @method init 
         * @return {Bollean} 初始化是否成功
         */
        this.init = function(){
            //获取当前属性
            var 
              $attributePanel = $('#tool-eraser-attribute-panel'),
              width = $('.width',$attributePanel).eq(0).val(),
              opacity = $('.opacity',$attributePanel).eq(0).val(),
              shadowOffsetX = $('.shadow-offsetx',$attributePanel).eq(0).val(),
              shadowOffsetY = $('.shadow-offsety',$attributePanel).eq(0).val(),
              shadowBlur = $('.shadow-blur',$attributePanel).eq(0).val(),
              shadowColor = $('.shadow-color',$attributePanel).eq(0).val(),
              lineJoin = $(':radio[name="line-join"]',$attributePanel).val(),
              lineCap = $(':radio[name="line-cap"]',$attributePanel).val();       
            
            //设置参数
            return this.setOption({
                opacity: opacity,
                lineWidth: width,
                color:'#fff',
                shadowOffsetX:shadowOffsetX,
                shadowOffsetY:shadowOffsetY,
                shadowBlur:shadowBlur,
                shadowColor:shadowColor,
                lineJoin: lineJoin,
                lineCap:lineCap
            });
        };
        
        /**
         * 设置坐标参数参数
         * @method setPoint
         * @param {Object} 参数
         * @return {Object} 设置完的参数
         */
        this.setPoint = function(pointList){
            var 
               list = pointList.getList();
             
             this.option.list = [];//更新当前列表  
             return this.setOption({
                 list:list
             });
        };
    };
    
    /**
     * 橡皮工具原型
     * @class Eraser.prototype
     * @static
     * @extends painter.model.toolModel.Tool
     */
    Eraser.prototype = new Tool();
    
    /**
     * 油漆桶工具对象
     * @class FloodFill
     * @constructor
     * @extends painter.model.toolModel.FloodFill.prototype
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
         * 鼠标名称
         * @property mouse
         * @type String
         * @default 'FloodFill' 
         */
        this.mouse = "FloodFill";
        
        /**
         * 初始化
         * @method init 
         * @return {Bollean} 初始化是否成功
         */
        this.init = function(){
            //获取当前属性
            var 
              $attributePanel = $('#tool-flood-fill-attribute-panel'),
              color = $('#tool-wrap .tool .color').eq(0).val(),
              canvas = global.painter.canvas.currentCanvasContainer.getCanvas(),
              width = canvas.getWidth(),
              height = canvas.getHeight();       
            
            //设置参数
            return this.setOption({
                fillStyle:color,
                width:width,
                height:height
            });
        };
        
        /**
         * 设置坐标参数参数
         * @method setPoint
         * @param {Object} 参数
         * @return {Object} 设置完的参数
         */
        this.setPoint = function(pointList){
            var
                endPoint = pointList.getEnd(),
                x = endPoint.x,
                y = endPoint.y;
            return this.setOption({
                x:x,
                y:y
            });
        };
    };
    
    /**
     * 油漆桶工具原型
     * @class FloodFill.prototype
     * @static
     * @extends painter.model.toolModel.Tool
     */
    FloodFill.prototype = new Tool();
    
    /**
     * 吸管工具对象
     * @class EyeDropper
     * @constructor
     * @extends painter.model.toolModel.EyeDropper.prototype
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
         * 鼠标名称
         * @property mouse
         * @type String
         * @default 'EyeDropper' 
         */
        this.mouse = "EyeDropper";
        
        /**
         * 初始化
         * @method init 
         * @return {Bollean} 初始化是否成功
         */
        this.init = function(){
            //设置参数
            return this.setOption({
                
            });
        };
        
        /**
         * 设置坐标参数参数
         * @method setPoint
         * @param {Object} 参数
         * @return {Object} 设置完的参数
         */
        this.setPoint = function(pointList){
            var
                endPoint = pointList.getEnd(),
                x = endPoint.x,
                y = endPoint.y;
            return this.setOption({
                x:x,
                y:y
            });
        };
    };
    
    /**
     * 吸管工具原型
     * @class FloodFill.prototype
     * @static
     * @extends painter.model.toolModel.Tool
     */
    EyeDropper.prototype = new Tool();
    
    /**
     * 十字工具对象
     * @class Cross
     * @constructor
     * @extends painter.model.toolModel.Cross.prototype
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
         * 初始化
         * @method init 
         * @return {Bollean} 初始化是否成功
         */
        this.init = function(){
            //设置参数
            return this.setOption({
                lineWidth:1,
                strokeStyle:'#000000',
                length:10
            });
        };
        
        /**
         * 设置坐标参数参数
         * @method setPoint
         * @param {Object} 参数
         * @return {Object} 设置完的参数
         */
        this.setPoint = function(pointList){
            var
                endPoint = pointList.getEnd(),
                x = endPoint.x,
                y = endPoint.y;
            return this.setOption({
                x:x,
                y:y
            });
        };
    };
    
    /**
     * 十字工具原型
     * @class Cross.prototype
     * @static
     * @extends painter.model.toolModel.Tool
     */
    Cross.prototype = new Tool();        
        
    
    /**
     * 十字工具对象
     * @class Text
     * @constructor
     * @extends painter.model.toolModel.Text.prototype
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
         * 鼠标名称
         * @property mouse
         * @type String
         * @default 'Text' 
         */
        this.mouse = "Text";
        
        /**
         * 初始化
         * @method init 
         * @return {Bollean} 初始化是否成功
         */
        this.init = function(){
            this.initAttributes();
        };
        
        /**
         * 初始化图形类属性面板的参数
         * @method initAttributes
         */
        this.initAttributes = function(){           
            //获取当前属性
            var 
              $attributePanel = $('#tool-text-attribute-panel'),
              opacity = $('.opacity',$attributePanel).eq(0).val(),
              text = $('.text',$attributePanel).eq(0).val(),
              size = $('.size',$attributePanel).eq(0).val(),
              border = $('.border',$attributePanel).eq(0).val(),
              family = $('.font',$attributePanel).eq(0).val(),
              bold = $('.bold',$attributePanel).eq(0).attr("checked") === "checked" ? "bold" : "",
              italic = $('.italic',$attributePanel).eq(0).attr("checked") === "checked" ? "italic" : "",
              shadowOffsetX = $('.shadow-offsetx',$attributePanel).eq(0).val(),
              shadowOffsetY = $('.shadow-offsety',$attributePanel).eq(0).val(),
              shadowBlur = $('.shadow-blur',$attributePanel).eq(0).val(),
              shadowColor = $('.shadow-color',$attributePanel).eq(0).val(),
              color = $('#tool-wrap .tool .color').eq(0).val();
            //设置参数
            return this.setOption({
                strokeStyle:color,
                opacity:opacity,
                fillStyle:color,
                text:text,
                size:size,
                border:border,
                family:family,
                bold:bold,
                italic:italic,
                shadowOffsetX:shadowOffsetX,
                shadowOffsetY:shadowOffsetY,
                shadowBlur:shadowBlur,
                shadowColor:shadowColor
            });
        };
        
        /**
         * 设置坐标参数参数
         * @method setPoint
         * @param {Object} 参数
         * @return {Object} 设置完的参数
         */
        this.setPoint = function(pointList){
            var
                startPoint = pointList.getStart(),
                endPoint = pointList.getEnd(),
                x = startPoint.x,//计算园中心坐标
                y = startPoint.y,
                textAlign = x <= endPoint.x ? "left" : "right";
            return this.setOption({
                x:x,
                y:y,
                textAlign:textAlign
            });
        };      
    };
    
    /**
     * 十字工具原型
     * @class Text.prototype
     * @static
     * @extends painter.model.toolModel.Tool
     */
    Text.prototype = new Tool();
    
    /**
     * 十字工具对象
     * @class TextStroke
     * @constructor
     * @extends painter.model.toolModel.TextStroke.prototype
     */
    TextStroke = function(){
        /**
         * 名称
         * @property name
         * @type String
         * @default 'line' 
         */
        this.name = 'TextStroke';            
    };
    
    /**
     * 十字工具原型
     * @class TextStroke.prototype
     * @static
     * @extends painter.model.toolModel.Text
     */
    TextStroke.prototype = new Text();
	
	//添加工具到数据层
	global.painter = global.painter || {};
	global.painter.model = global.painter.model || {};
	global.painter.model.toolModel = global.painter.model.toolModel || {};
	global.painter.model.toolModel.Line = Line;
	global.painter.model.toolModel.CurveClosed = CurveClosed;
	global.painter.model.toolModel.Rect = Rect;
	global.painter.model.toolModel.Circle = Circle;
	global.painter.model.toolModel.Pen = Pen;
	global.painter.model.toolModel.CurveClosedStroke = CurveClosedStroke;
	global.painter.model.toolModel.RectStroke = RectStroke;
    global.painter.model.toolModel.CircleStroke = CircleStroke;
	global.painter.model.toolModel.Eraser = Eraser;
	global.painter.model.toolModel.FloodFill = FloodFill;
	global.painter.model.toolModel.EyeDropper = EyeDropper;
	global.painter.model.toolModel.Cross = Cross;
	global.painter.model.toolModel.Ellipes = Ellipes;
	global.painter.model.toolModel.EllipesStroke = EllipesStroke;
	global.painter.model.toolModel.Text = Text;
	global.painter.model.toolModel.TextStroke = TextStroke;
}(jQuery, window));
