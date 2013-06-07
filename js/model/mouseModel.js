/**
 * 鼠标形状js
 * @author yan
 * @module mouse
 * @namespace painter.model.mouseModel
 */
(function($, global){
    "use strict";
    var
        Mouse,
        Cross,
        Pen,
        Eraser,
        Text,
        FloodFill,
        EyeDropper;
    
    /**
     * 鼠标类
     * @class Mouse
     * @constructor
     * @extends painter.model.mouseModel.Mouse.prototype
     */    
    Mouse = function(){
        /**
         * 鼠标名称
         * @property name
         * @type String
         * @default "Mouse"
         */
        this.name = "Mouse";
        
        /**
         * 参数
         * @property option
         * @type Object
         * @default {}
         */
        this.option = {};
        
        /**
         * 鼠标名称
         * @property mouseShape
         * @type Object
         * @default null
         */
        this.mouseShape = null;
        
        /**
         * 初始化
         * @method init
         * @param {Object} option 参数对象
         * @param {Array} points 点
         */
        this.init = function(option, points){
            var 
                index = 'CircleStroke';
            //设置参数
            this.setOption({
                lineWidth:1,
                strokeStyle:option.strokeStyle,
                radius:Math.ceil(option.lineWidth /2),
                opacity:100                
            });
            this.setPoints(points);//设置点    
            //设置鼠标图形
            this.setMouseShape(new global.painter.model.shapeModel[index]());
            this.initMouseShape();//初始化鼠标图形
            this.setImage();//设置鼠标图片
        };
        
        /**
         * 绘制鼠标图形
         * @method paint
         * @param {Object} context 上下文对象
         */
        this.paint = function(context){
            this.getMouseShape().paint(context);
        };
    };
    
    /**
     * 鼠标类原型
     * @class Mouse.prototype
     * @static
     */
    Mouse.prototype = {        
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
         * 获取鼠标图形对象
         * @method getMouseShape 
         * @return {Object} 返回鼠标图形对象
         */
        getMouseShape:function(){
            return this.mouseShape;
        },
        
        /**
         * 设置鼠标图形对象
         * @method setMouseShape 
         * @param {Object} mouseShape 鼠标图形对象
         */
        setMouseShape:function(mouseShape){
            this.mouseShape = mouseShape;
            return mouseShape;
        },
        
        /**
         * 设置点坐标
         * @method setPoints 
         * @param {Object} points 点坐标对象
         */
        setPoints:function(points){
            this.setOption(points);
        },
        
        /**
         * 初始化鼠标图形对象
         * @method initMouseShape 
         */
        initMouseShape:function(){
            this.getMouseShape().init(this.getOption());
        },
        
        /**
         * 初始化鼠标图片
         * @method setImage 
         */
        setImage:function(){
            var
                $mouseCanvas = $('#canvas-mouse'),
                name = this.getName();
            
            $mouseCanvas.attr("data-mouse", name);
            return true;
        }
    };

    /**
     * 十字类
     * @class Cross
     * @constructor
     * @extends painter.model.mouseModel.Cross.prototype
     */    
    Cross = function(){
        /**
         * 鼠标名称
         * @property name
         * @type String
         * @default "Cross"
         */
        this.name = "Cross";
        
        /**
         * 初始化
         * @method init
         * @param {Object} option 参数对象
         * @param {Array} points 点
         */
        this.init = function(option, points){
            var 
                index = this.getName();
            //设置参数
            this.setOption({
                length:10,
                lineHeight:1,
                opacity:100,
                strokeStyle:option.strokeStyle,
                lineJoin:option.lineJoin,
                lineCap:option.lineCap,
                shadowOffsetX:option.shadowOffsetX,
                shadowOffsetY:option.shadowOffsetY,
                shadowBlur:option.shadowBlur,
                shadowColor:option.shadowColor
            });
            this.setPoints(points);//设置点    
            //设置鼠标图形
            this.setMouseShape(new global.painter.model.shapeModel[index]());
            this.initMouseShape();//初始化鼠标图形
            this.setImage();//设置鼠标图片
        };
        
        /**
         * 绘制鼠标图形
         * @method paint
         * @param {Object} context 上下文对象
         */
        this.paint = function(context){
            this.getMouseShape().paint(context);
        };
    };
    
    /**
     * 十字类原型
     * @class Cross.prototype
     * @static
     * @extends painter.model.mouseModel.Mouse
     */
    Cross.prototype = new Mouse();
    
    /**
     * 铅笔类
     * @class Pen
     * @constructor
     * @extends painter.model.mouseModel.Pen.prototype
     */
    Pen = function(){
        /**
         * 鼠标名称
         * @property name
         * @type String
         * @default "Pen"
         */
        this.name = "Pen";
    };
    
     /**
     * 铅笔类原型
     * @class Pen.prototype
     * @static
     * @extends painter.model.mouseModel.Mouse
     */
    Pen.prototype = new Mouse();
    
    /**
     * 橡皮类
     * @class Eraser
     * @constructor
     * @extends painter.model.mouseModel.Eraser.prototype
     */
    Eraser = function(){
        /**
         * 鼠标名称
         * @property name
         * @type String
         * @default "Eraser"
         */
        this.name = "Eraser";
        
        /**
         * 初始化
         * @method init
         * @param {Object} option 参数对象
         * @param {Array} points 点
         */
        this.init = function(option, points){
            var 
                index = "CircleStroke";
            //设置参数
            this.setOption({
                strokeStyle:'#000',
                opacity:option.opacity,
                radius:Math.ceil(option.lineWidth / 2, 10),
                lineJoin:option.lineJoin,
                lineCap:option.lineCap,
                shadowOffsetX:option.shadowOffsetX,
                shadowOffsetY:option.shadowOffsetY,
                shadowBlur:option.shadowBlur,
                shadowColor:option.shadowColor
            });
            this.setPoints(points);//设置点    
            //设置鼠标图形
            this.setMouseShape(new global.painter.model.shapeModel[index]());
            this.initMouseShape();//初始化鼠标图形
            this.setImage();//设置鼠标图片
        };
        
        /**
         * 绘制鼠标图形
         * @method paint
         * @param {Object} context 上下文对象
         */
        this.paint = function(context){
            this.getMouseShape().paint(context);
        };        
    };
    
    /**
     * 橡皮类原型
     * @class Eraser.prototype
     * @static
     * @extends painter.model.mouseModel.Mouse
     */
    Eraser.prototype = new Mouse();
    
    /**
     * 文本类
     * @class Text
     * @constructor
     * @extends painter.model.mouseModel.Text.prototype
     */
    Text = function(){
        /**
         * 鼠标名称
         * @property name
         * @type String
         * @default "Text"
         */
        this.name = "Text";
        
        /**
         * 初始化
         * @method init
         * @param {Object} option 参数对象
         * @param {Array} points 点
         */
        this.init = function(option, points){
            this.setImage();//设置鼠标图片
        };
        
        /**
         * 绘制鼠标图形
         * @method paint
         * @param {Object} context 上下文对象
         */
        this.paint = function(context){
        };        
    };
    
    /**
     * 文本类原型
     * @class Text.prototype
     * @static
     * @extends painter.model.mouseModel.Mouse
     */
    Text.prototype = new Mouse();
    
    /**
     * 油漆桶类
     * @class FloodFill
     * @constructor
     * @extends painter.model.mouseModel.FloodFill.prototype
     */
    FloodFill = function(){
        /**
         * 鼠标名称
         * @property name
         * @type String
         * @default "FloodFill"
         */
        this.name = "FloodFill";
        
        /**
         * 初始化
         * @method init
         * @param {Object} option 参数对象
         * @param {Array} points 点
         */
        this.init = function(option, points){
            var 
                index = "CircleStroke";
            //设置参数
            this.setOption({
                strokeStyle:'#000',
                opacity:90,
                radius:Math.ceil(option.lineWidth / 2, 10)
            });
            this.setPoints(points);//设置点    
            //设置鼠标图形
            this.setMouseShape(new global.painter.model.shapeModel[index]());
            this.initMouseShape();//初始化鼠标图形
            this.setImage();//设置鼠标图片
        };
        
        /**
         * 绘制鼠标图形
         * @method paint
         * @param {Object} context 上下文对象
         */
        this.paint = function(context){
            this.getMouseShape().paint(context);
        };        
    };
    
    /**
     * 油漆桶类原型
     * @class FloodFill.prototype
     * @static
     * @extends painter.model.mouseModel.Mouse
     */
    FloodFill.prototype = new Mouse();
    
    /**
     * 吸管类
     * @class EyeDropper
     * @constructor
     * @extends painter.model.mouseModel.EyeDropper.prototype
     */
    EyeDropper = function(){
        /**
         * 鼠标名称
         * @property name
         * @type String
         * @default "EyeDropper"
         */
        this.name = "EyeDropper";
        
        /**
         * 绘制鼠标图形
         * @method paint
         * @param {Object} context 上下文对象
         */
        this.init = function(option, points){
            var 
                index = "CircleStroke";
            //设置参数
            this.setOption({
                strokeStyle:'#000',
                opacity:90,
                radius:Math.ceil(option.lineWidth / 2, 10)
            });
            this.setPoints(points);//设置点    
            //设置鼠标图形
            this.setMouseShape(new global.painter.model.shapeModel[index]());
            this.initMouseShape();//初始化鼠标图形
            this.setImage();//设置鼠标图片
        };
        
        /**
         * 绘制鼠标图形
         * @method paint
         * @param {Object} context 上下文对象
         */
        this.paint = function(context){
            this.getMouseShape().paint(context);
        };        
    };
    
    /**
     * 吸管类原型
     * @class EyeDropper.prototype
     * @static
     * @extends painter.model.mouseModel.Mouse
     */
    EyeDropper.prototype = new Mouse();
    
    //添加工具到数据层
    global.painter = global.painter || {};
    global.painter.model = global.painter.model || {};
    global.painter.model.mouseModel = global.painter.model.mouseModel || {};
    global.painter.model.mouseModel.Mouse = Mouse;
    global.painter.model.mouseModel.Cross = Cross;
    global.painter.model.mouseModel.Pen = Pen;
    global.painter.model.mouseModel.Eraser = Eraser;
    global.painter.model.mouseModel.Text = Text;
    global.painter.model.mouseModel.FloodFill = FloodFill;
    global.painter.model.mouseModel.EyeDropper = EyeDropper;
}(jQuery, window));