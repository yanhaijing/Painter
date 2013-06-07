/**
 * 画布容器对象
 * @author yan
 * @module canvasContainerModel
 * @namespace painter.model
 */
(function($, global){
    "use strict";
    
    /**
     * 画布容器对象
     * @class CanvasContainerModel
     * @static
     */
    var CanvasContainerModel = {
        /**
         * 画布对象
         * @property canvas
         * @type Object
         * @default null
         */
        canvas:null,
        
        /**
         * 初始化
         * @method init
         */
        init:function(canvas){
            this.setCanvas(canvas);
        },
        
        /**
         * 设置当前画布容器的画布对象
         * @method setCanvas
         * @param {Object} canvas 帮顶的画布对象
         * @return {Bollean} 是否设置成功
         */
        setCanvas:function(canvas){    
            this.canvas = canvas;       
            return true;
        },
        
        /**
         * 获取当前画布容器的画布对象
         * @method getCanvas
         * @return {Object} 当前画布对象
         */
        getCanvas:function(){
            return this.canvas;
        }
    };    
    
    //添加对象到model模块
    global.painter = global.painter || {};
    global.painter.model = global.painter.model || {};
    global.painter.model.CanvasContainerModel = CanvasContainerModel;
}(jQuery, window));