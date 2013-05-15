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
             var 
                $document = $(document);
            //绑定全局键盘事件
            $document.bind('keydown', function(e){
                
            });
         }
    };
}(jQuery, window));
