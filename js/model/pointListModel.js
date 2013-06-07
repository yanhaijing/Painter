/**
 * @author yan
 * @module pointListModel
 * @namespace painter.model
 */

(function($, global){
    "use strict";
    
    /**
     * 点列表对象
     * @class PointList
     * @static
     */
    var PointList = {
        /**
         * 点列表
         * @property list
         * @type Array
         * @default []
         */
        list:[],
        
        /**
         * 添加点
         * @method add
         * @param {Object} 添加的点
         * @return {Array} 点列表
         */
        add:function(point){
            this.list.push(point);
            return this.list;
        },
        
        /**
         * 获取开始节点
         * @method getStart
         * @return {Object} 第一个点对象
         */
        getStart:function(){
            return this.list[0];
        },
        
        /**
         * 获取结束节点
         * @method getEnd
         * @return {Object} 第最后一个点对象
         */
        getEnd:function(){
            return this.list[this.list.length - 1];
        },
        
        /**
         * 获取结束节点
         * @method getList
         * @return {Array} 点列表
         */        
        getList:function(){
            return this.list;
        },
        
        /**
         * 初始化
         * @method init
         */
        init:function(){
            this.list = [];
            return this.list;   
        }
    };
    
    global.painter = global.painter || {};
    global.painter.model = global.painter.model || {};
    global.painter.model.PointList = PointList;
}(jQuery, window));
