/**
 * 主页js
 * @module index
 * @namespace painter.controler
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
         
         /**
          * 帮顶事件
          * @event bindEvent
          */
         bindEvent:function(){
             var
                $document = $(document),
                fileResult = null,
                imageResult = null;
             
             //帮顶关闭事件
             $(window).bind("beforeunload", function(e){
                 return "图片尚未导出，您确定离开吗？";
             });
             $(window).unload(function(e){
                 $("#nav-file-save").trigger('click');//触发撤销按钮事件
             });
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
                    mouseCanvas = canvas.mouseCanvasContainer.getCanvas(),
                    negativeCanvas = global.painter.canvas.negativeCanvasContainer.getCanvas();
                 //更新各个画布   
                 currentCanvas.updateSize();
                 bufferCanvas.updateSize();
                 mouseCanvas.updateSize();
                 negativeCanvas.updateSize();
             });
             
             //=================================================
             //帮顶导入底片模态框事件
             
             //文件输入框改变事件
             $document.delegate("#negative-modal-file", "change", function(e){
                 var
                    files = e.target.files,
                    reader = new FileReader();
                 
                 reader.readAsDataURL(files[0]);
                 
                 reader.onload = function(){
                     var
                     
                         $negativeModal = $("#negative-modal"),
                         $view = $("#negative-modal-view", $negativeModal);
                     fileResult = reader.result;
                     $view.attr("src", reader.result);
                     
                     $view.bind("load", function(){
                         var
                         
                             $negativeModal = $("#negative-modal"),
                             $width = $("#negative-modal-width", $negativeModal),
                             $height = $("#negative-modal-height", $negativeModal);
                         $width.val($(this).width());
                         $height.val($(this).height());
                     });                     
                 }; 
             });
             
             //确定事件
             $document.delegate("#negative-modal-ok", "click", function(e){
                 var
                    negativeCanvas = global.painter.canvas.negativeCanvasContainer.getCanvas(),
                    image = new global.painter.model.shapeModel.ImageShape(),
                    $negativeModal = $("#negative-modal"),
                    x = $("#negative-modal-x", $negativeModal).val(),
                    y = $("#negative-modal-y", $negativeModal).val(),
                    width = $("#negative-modal-width", $negativeModal).val(),
                    height = $("#negative-modal-height", $negativeModal).val();                 
                 
                 image.init({
                     x:x,
                     y:y,
                     width:width,
                     height:height,
                     src: fileResult
                 });
                 
                 negativeCanvas.paint(image);  
             });
             
              //=================================================
             //帮顶导入图片模态框事件
             
             //文件输入框改变事件
             $document.delegate("#image-modal-file", "change", function(e){
                 var
                    files = e.target.files,
                    reader = new FileReader();
                 
                 reader.readAsDataURL(files[0]);
                 
                 reader.onload = function(){
                     var
                     
                         $imageModal = $("#image-modal"),
                         $view = $("#image-modal-view", $imageModal);
                     imageResult = reader.result;
                     $view.attr("src", reader.result);
                     
                     $view.bind("load", function(){
                         var
                         
                             $imageModal = $("#image-modal"),
                             $width = $("#image-modal-width", $imageModal),
                             $height = $("#image-modal-height", $imageModal);
                         $width.val($(this).width());
                         $height.val($(this).height());
                     });                     
                 };                
             });
             
             //确定事件
             $document.delegate("#image-modal-ok", "click", function(e){
                 var
                    currentCanvas = global.painter.canvas.currentCanvasContainer.getCanvas(),
                    image = new global.painter.model.shapeModel.ImageShape(),
                    $imageModal = $("#image-modal"),
                    x = $("#image-modal-x", $imageModal).val(),
                    y = $("#image-modal-y", $imageModal).val(),
                    width = $("#image-modal-width", $imageModal).val(),
                    height = $("#image-modal-height", $imageModal).val();                 
                 
                 image.init({
                     x:x,
                     y:y,
                     width:width,
                     height:height,
                     src: imageResult
                 });
                 
                 currentCanvas.paint(image);                   
             });
         }
    };
    
    $(document).ready(function(){
        Index.init();
    });
}(jQuery, window));
