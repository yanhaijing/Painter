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
           //帮顶保存按钮事件
           $document.delegate("#nav-file-save", "click", function(e){
                var 
                    currentCanvasDom = global.painter.canvas.currentCanvasContainer.getCanvas().getCanvas(),
                    img = new Image(),
                    win = window.open("", "图片", "height=600,width=800,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no");               
                img.src = currentCanvasDom.toDataURL();
                win.document.write("右键图片图片另存为");
                win.document.write("<img src='" + img.src + "' border=1>");
                global.console.log("保存按钮被点击了");
            });
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
