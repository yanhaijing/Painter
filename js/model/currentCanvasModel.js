/**
 * 当前的画布
 * @author yan
 * @namespace model
 * @module currentCanvasModel
 */
(function($, global){
    "use strict";
    
    /**
     * 工具栏数据对象
     * @class CurrentToolModel
     * @static
     */
    var CurrentCanvasModel = {
        /**
         * 当前的工具对象
         * @property currentTool
         * @type Object
         * @default null
         */
        currentTool:null,
        
        /**
         * 初始化
         * @method init
         */
        init:function(){
            this.setCurrentTool();
        },
        
        /**
         * 设置当前工具
         * @method setCurrentTool
         * @param {Object} tool 设置的工具对象
         * @return {Bollean} 是否设置成功
         */
        setCurrentCanvas:function(tool){           
            return true;
        },
        
        /**
         * 获取当前工具
         * @method getCurrentTool
         * @return {Object} 当前工具对象
         */
        getCurrentCanvas:function(){
            return this.currentTool;
        }
    };
    
    //初始化当前工具
    CurrentCanvasModel.init();
    
    //添加对象到model模块
    global.painter = global.painter || {};
    global.painter.model = global.painter.model || {};
    global.painter.model.CurrentCanvasModel = CurrentCanvasModel;
}(jQuery, window));