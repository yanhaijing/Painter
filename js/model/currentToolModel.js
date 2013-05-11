/**
 * 工具栏数据
 * @author yan
 * @namespace model
 * @module currentToolModel
 */

(function($, global){
    "use strict";
    
    /**
     * 工具栏数据对象
     * @class CurrentToolModel
     * @static
     */
    var CurrentToolModel = {
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
        setCurrentTool:function(tool){
            tool = tool || new window.painter.model.toolModel.Line();
            tool.init();
            
            this.currentTool = tool;
            
            return true;
        },
        
        /**
         * 获取当前工具
         * @method getCurrentTool
         * @return {Object} 当前工具对象
         */
        getCurrentTool:function(){
            return this.currentTool;
        }
    };
    
    //初始化当前工具
    CurrentToolModel.init();
    
    //添加对象到model模块
    window.painter = window.painter || {};
    window.painter.model = window.painter.model || {};
    window.painter.model.CurrentToolModel = CurrentToolModel; 
}(jQuery, window));