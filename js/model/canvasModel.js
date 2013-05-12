/**
 * 画布对象
 * @author yan
 * @namespace model
 * @module canvasModel
 */
(function($, global){
    "use strict";
    
    /**
     * 画布对象
     * @class Canvas
     * @constructor
     * @extends Canvas.prorotype
     */
    var Canvas = function(){
        /**
         * 当前画布对象帮顶的画布元素
         * @property canvas
         * @type {Object}
         * @default null
         */
        this.canvas = null;
        
        /**
         * 当前画布上的图形对象队列
         * @property shapeList
         * @type Array
         * @default []
         */
        this.shapeList = [];
        
        /**
         * 当前画布的宽度
         * @property width
         * @type Number
         * @default 0
         */
        this.width = 0;
        
        /**
         * 当前画布的高度
         * @property height
         * @type Number
         * @default 0
         */
        this.height = 0;
        
        /**
         * 当前的画布上下文
         * @property context2D
         * @type Object
         * @default null
         */
        this.context2D = null;
    };
    
    /**
     * 画布对象原型
     * @class Canvas.prorotype
     * @strict
     */
    Canvas.prototype = {
        /**
         * 初始化画布类对象
         * @method init
         * @param {Object} canvas 要绑定的画布对象
         */
        init:function(canvas){
           this.initCanvas(canvas); //初始化画布对象
           this.initContext2D();//初始化上下文对象
           this.initHeight();//初始化画布高度
           this.initWidth();//初始化画布宽度
        },
        /**
         * 初始化画布对象
         * @method initCanvas
         * @param {object} canvas 画布对象
         */
        initCanvas:function(canvas){
           this.setCanvas(canvas);
        },
        /**
         * 设置当前画布对象帮顶的画布元素
         * @method setCanvas
         * @param {Object} 设置的对象
         */
        setCanvas:function(canvas){
            if(canvas !== undefined && canvas !== null){
                this.canvas = canvas;
                return true;
            }
            
            return false;
        },
        
        /**
         * 获取当前画布对象帮顶的画布元素
         * @method getCanvas
         * @return (Object) 当前画布对象
         */
        getCanvas:function(){
            return this.canvas;
        },
        
        /**
         * 初始化上下文对象
         * @method initContext2D
         */
        initContext2D:function(){
           this.setContext2D();
        },
        /**
         * 获取2d上下文
         * @method getContext2D
         * @rerurn {Object} 画布2D上下文对象
         */
        getContext2D:function(){
            return this.context2D;
        },
        
        /**
         * 设置2d上下文
         * @method setContext2D
         * @param {Object} context2D 要设置的上下文对象，若唯恐默认为当前画布的上下文
         */
        setContext2D:function(context2D){
            context2D = context2D || this.getCanvas().getContext('2d');
            this.context2D = context2D;
        },
        
        /**
         * 清除当前上下文
         * @method clearContext
         */
        clearContext:function(){
            var
                height = this.getHeight(),
                width = this.getWidht(),
                context = this.getContext2D();
            
            context.clearRect(0, 0, width, height);
        },
        
        /**
         * 初始化高度
         * @method initHeight
         */
        initHeight:function(){
            this.updateHeight();  
        },
        /**
         * 更新高度,从画布元素重新获取高度
         * @method updateHeight
         */
        updateHeight:function(){
          this.height = $(this.getCanvas()).height();
        },
        /**
         * 设置当前画布类对象高度
         * @method setHeight
         * @param {Number} [height=600] 要设置的高度
         */
        setHeight:function(height){
           height = height || 600;
           this.height = height;
        },
        /**
         * 获取当前花布列对象高度
         * @method getHieght
         * @return {Number} 高度
         */
        getHeight:function(){
           return this.height; 
        },
        
        /**
         * 初始化高度
         * @method initWidth
         */
        initWidth:function(){
            this.updateWidth();  
        },
        /**
         * 更新高度,从画布元素重新获取高度
         * @method updateWidth
         */
        updateWidth:function(){
          this.width = $(this.getCanvas()).width();
        },
        /**
         * 设置当前画布类对象高度
         * @method setWidth
         * @param {Number} [width=600] 要设置的高度
         */
        setWidth:function(width){
           width = width || 600;
           this.width = width;
        },
        /**
         * 获取当前花布列对象高度
         * @method getWidth
         * @return {Number} 高度
         */
        getWidth:function(){
           return this.width; 
        },
        
        /**
         * 绘制一个图形当当前画布
         * @method paint
         * @param {Object} shape 要绘制的图形
         */
        paint:function(shape){
            this.addShape(shape);
            shape.paint(this.getContext2D());//绘制图像到当前画布
        },
        
        /**
         * 重绘当前画布
         * @method repaint
         */
        repaint:function(){
            var 
                context = this.getContext2d(),
                list = this.shapeList,
                len = list.length,
                i = 0;
           this.clearContext();//清除当前画布     
           for(i; i<len; i=i+1){
               list[i].paint(context);
           } 
        },
        
        /**
         * 撤销上一步操作
         * @method undo
         */
        undo:function(){
            this.deleteShape();
            this.repaint();
        },
        
        /**
         * 清除画布对象
         * @method clear
         */
        clear:function(){
            this.clearContext();
            this.clearShapeList();
        },
        
        /**
         * 初始化图形队列
         * @method initShapeList
         */
        initShapeList:function(){
           this.clearShapeList(); 
        },
        
        /**
         * 添加一个图形
         * @method addShape
         * @param {Object} shape 要添加的图形对象
         */
        addShape:function(shape){
            this.shapeList.push(shape);
        },
        /**
         * 删除队尾图形
         * @method deleteShape
         */
        deleteShape:function(){
            this.shapeList.pop();
        },
        /**
         * 清除图形队列
         * @method clearShapeList
         * 
         */
        clearShapeList:function(){
            this.shapeList = [];
        }
    };
}(jQuery, window));