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
         * @property $canvas
         * @type {$object}
         * @default null
         */
        this.$canvas = null;
        
        /**
         * 当前画布上的图形对象队列
         * @property shapeList
         * @type Array
         * @default []
         */
        this.shapeList = [];
    };
    
    /**
     * 画布对象原型
     * @class Canvas.prorotype
     * @strict
     */
    Canvas.prototype = {
        /**
         * 设置当前画布对象帮顶的画布元素
         * @method setCanvas
         * @param {$object} 设置的对象
         */
        setCanvas:function($canvas){
            if($canvas !== undefined && $canvas !== null){
                this.$canvas = $canvas;
                return true;
            }
            
            return false;
        },
        
        /**
         * 获取2d上下文
         * @method getContext2d
         * @rerurn {Object} 画布2D上下文对象
         */
        getContext2D:function(){
            return this.$canvas.getContext('2d');
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
           this.clear();//清除当前画布     
           for(i; i<len; i=i+1){
               list[i].paint(context);
           } 
        },
        
        /**
         * 清除当前画布
         * @method clear
         */
        clear:function(){
            
        }
    };
}(jQuery, window));