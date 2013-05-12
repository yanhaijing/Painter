/**
 * 画布控制器
 * @author yan
 * @namespace controler
 * @module canvas
 */

(function($, global){
    "use strict";
    
    /**
     * 画布类
     * @class Canvas
     * @static
     */
    var Canvas = {
        /**
         * 初始化
         * @method init
         */
        init:function(){
            var
                currentCanvasDom = $('.canvas-layer').get(0),
                currentCanvas = new global.painter.model.CanvasModel(),
                currentCanvasContainer = Object.create(global.painter.model.CanvasContainerModel),
                bufferCanvasDom = $('.canvas-buffer').get(0),
                bufferCanvas = new global.painter.model.CanvasModel(),
                bufferCanvasContainer = Object.create(global.painter.model.CanvasContainerModel),
                mouseCanvasDom = $('.canvas-mouse').get(0),
                mouseCanvas = new global.painter.model.CanvasModel(),
                mouseCanvasContainer = Object.create(global.painter.model.CanvasContainerModel);
                
            //初始化当前画布
            currentCanvas.init(currentCanvasDom);
            currentCanvasContainer.init(currentCanvas);
            global.painter = global.painter || {};
            global.painter.canvas = global.painter || {};
            global.painter.canvas.currentCanvasContainer = currentCanvasContainer;
            
            //初始化当前缓冲画布
            bufferCanvas.init(bufferCanvasDom);
            bufferCanvasContainer.init(bufferCanvas);
            global.painter = global.painter || {};
            global.painter.canvas = global.painter || {};
            global.painter.canvas.bufferCanvasContainer = bufferCanvasContainer;
            
            //初始化鼠标画布
            mouseCanvas.init(mouseCanvasDom);
            mouseCanvasContainer.init(mouseCanvas);
            global.painter = global.painter || {};
            global.painter.canvas = global.painter || {};
            global.painter.canvas.mouseCanvasContainer = mouseCanvasContainer;
            
            this.bindEvent();//版定事件
        },
        
        /**
         * 帮顶事件
         * @method bindEvent
         */
        bindEvent:function(){
            var
                $document = $(document),
                mouseCanvas = global.painter.canvas.mouseCanvasContainer.getCanvas(),
                offsetLeft = mouseCanvas.getLeft(),
                offsetTop = mouseCanvas.getTop();
                
            //绑定鼠标画布图层鼠标移动事件
            $document.delegate('#canvas-mouse', 'mousemove', function(){
                
            });
            
            //绑定鼠标点击事件
            $document.delegate('#canvas-mouse', 'click', function(e){
                
            });
        }
    };
    
    $(document).ready(function(){
       Canvas.init(); 
    });
}(jQuery, window));
