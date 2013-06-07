/**
 * 工具容器对象
 * @author yan
 * @module toolContainerModel
 * @namespace painter.model
 */

(function($, global){
    "use strict";
    
    /**
     * 工具容器对象
     * @class ToolContainerModel
     * @static
     */
    var ToolContainerModel = {
        /**
         * 当前的工具对象
         * @property tool
         * @type Object
         * @default null
         */
        tool:null,
        
        /**
         * 初始化
         * @method init
         * @param {Object} tool 设置的工具对象
         */
        init:function(tool){
            tool.init();//初始化工具
            this.setTool(tool);
        },
        
        /**
         * 设置当前工具
         * @method setTool
         * @param {Object} tool 设置的工具对象
         * @return {Bollean} 是否设置成功
         */
        setTool:function(tool){           
            this.tool = tool;           
            return true;
        },
        
        /**
         * 获取当前工具
         * @method getTool
         * @return {Object} 当前工具对象
         */
        getTool:function(){
            return this.tool;
        }
    };
    
    //添加对象到model模块
    global.painter = global.painter || {};
    global.painter.model = global.painter.model || {};
    global.painter.model.ToolContainerModel = ToolContainerModel; 
}(jQuery, window));