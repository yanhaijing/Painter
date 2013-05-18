/**
 * 主页js
 * @namespace controler
 * @module index
 */
(function($, global){
    "use strict";
    
    /**
     * 主页
     * @class Index
     * @static 
     */
    var Index = {
        /**
         * 初始化
         * @method init 
         */  
         init:function(){
             this.bindEvent();
         },
         
         bindEvent:function(){
         }
    };
    
    $(document).ready(function(){
        Index.init();
    })
}(jQuery, window));
