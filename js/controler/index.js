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
                $document = $(document),
                fileResult = null;
             
             //绑定撤销键盘事件ctrl+z   
             $document.bind("keydown", function(e){
                if(e.ctrlKey && e.keyCode === 90){
                    //撤销事件
                    $("#nav-edit-undo").trigger('click');//触发撤销按钮事件
                    e.preventDefault();//阻止默认事件
                }         
             });
             //帮顶保存键盘事件ctrl+s
             $document.bind("keydown", function(e){
                if(e.ctrlKey && e.keyCode === 83){
                    //撤销事件
                    $("#nav-file-save").trigger('click');//触发撤销按钮事件
                    e.preventDefault();//阻止默认事件
                }         
             });
             
             //帮顶清楚事件
             $document.bind("keydown", function(e){
                if(e.ctrlKey && e.keyCode === 68){
                    //撤销事件
                    $("#nav-edit-clear").trigger('click');//触发撤销按钮事件
                    e.preventDefault();//阻止默认事件
                }         
             });
             
             //帮顶导出事件
             $document.bind("keydown", function(e){
                if(e.ctrlKey && e.keyCode === 69){
                    //撤销事件
                    $("#nav-file-export").trigger('click');//触发撤销按钮事件
                    e.preventDefault();//阻止默认事件
                }         
             }); 
             //帮顶倒置事件
             $document.bind("keydown", function(e){
                if(e.ctrlKey && e.keyCode === 82){
                    //撤销事件
                    $("#nav-edit-convert").trigger('click');//触发撤销按钮事件
                    e.preventDefault();//阻止默认事件
                }         
             });
             
             //帮顶水平翻转快捷键事件
             $document.bind("keydown", function(e){
                if(e.ctrlKey && e.keyCode === 72){
                    //撤销事件
                    $("#nav-edit-flipx").trigger('click');//触发撤销按钮事件
                    e.preventDefault();//阻止默认事件
                }         
             });
             //帮顶垂直翻转反转事件
             $document.bind("keydown", function(e){
                if(e.ctrlKey && e.keyCode === 86){
                    //撤销事件
                    $("#nav-edit-flipy").trigger('click');//触发撤销按钮事件
                    e.preventDefault();//阻止默认事件
                }         
             });
             
             //绑定窗口大小改变事件
             $(global).bind("resize", function(e){
                 var 
                    canvas = global.painter.canvas,
                    currentCanvas = canvas.currentCanvasContainer.getCanvas(),
                    bufferCanvas = canvas.bufferCanvasContainer.getCanvas(),
                    mouseCanvas = canvas.mouseCanvasContainer.getCanvas();
                 //更新各个画布   
                 currentCanvas.updateSize();
                 bufferCanvas.updateSize();
                 mouseCanvas.updateSize();
             });
             
             //=================================================
             //帮顶导入底片模态框事件
             
             //文件输入框改变事件
             $document.delegate("#negative-modal-file", "change", function(e){
                 var
                    files = e.target.files,
                    reader = new FileReader(),
                    $view = $("#negative-modal-view"),
                    url = createObjectURL(files[0]);
                 
                 function createObjectURL(blob){
                     if(window.URL){
                         return window.URL.createObjectURL(blob);
                     }else if(window.webkitURL){
                         return window.webkitURL.createObjectURL(blob);
                     }else{
                         return null;
                     }
                 }
                 
                 fileResult = url;
                 $view.attr("src", url);
             });
             
             //确定事件
             $document.delegate("#negative-modal-ok", "click", function(e){
                 var
                    $negativeCanvas = $("#image-negative");
                
                 $negativeCanvas.attr("src", fileResult);    
             });
         }
    };
    
    $(document).ready(function(){
        Index.init();
    });
}(jQuery, window));
