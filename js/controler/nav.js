/**
 * 导航栏js
 * @author 颜海镜
 * @namespace controler
 * @module nav
 */
(function($, global){
    "use strict";
    
    /**
     * 导航类
     * @class Nav
     * @static 
     */
    var Nav = {
       /**
        * 初始化
        * @method init 
        */
       init:function(){
           this.bindEvent();
       },
       
       /**
        * 帮顶事件
        * @event bindEvent 
        */
       bindEvent:function(){          
           var $document = $(document);
           
            //帮顶撤销按钮事件
            $document.delegate("#nav-edit-undo", "click", function(e){
                var currentCanvas = global.painter.canvas.currentCanvasContainer.getCanvas();
                currentCanvas.undo();//撤销上一部
                global.console.log("撤销按钮被电击了");
            });
            
            //帮顶清空按钮事件
            $document.delegate("#nav-edit-clear", "click", function(e){
                var currentCanvas = global.painter.canvas.currentCanvasContainer.getCanvas();
                currentCanvas.clear();//撤销上一部
                global.console.log("清空按钮被点击了");
            });
       }
    };
    
    $(document).ready(function(){
       Nav.init();//初始化导航栏 
    });
}(jQuery, window));
