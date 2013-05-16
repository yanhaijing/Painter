/**
 * @author yan
 * @namespace model
 * 
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
        getStart:function(){
            return this.list[0];
        },
        getEnd:function(){
            return this.list[this.list.length - 1];
        },        
        getList:function(){
            return this.list;
        },
        init:function(){
            this.list = [];
            return this.list;   
        }
    };
    
    global.painter = global.painter || {};
    global.painter.model = global.painter.model || {};
    global.painter.model.PointList = PointList;
}(jQuery, window));
