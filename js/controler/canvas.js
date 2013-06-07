/**
 * 画布控制器
 * @author yan
 * @module canvas
 * @namespace painter.controler
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
         * 当前鼠标点击状态
         * @property clickStatus
         * @type Bollean
         * @default false
         */
        clickStatus:false,
        
        /**
         * 鼠标移动点的坐标
         * @property startPoint
         * @type Object
         */
        pointList:Object.create(global.painter.model.PointList),
        
        /**
         * 设置开始点 
         * @method getPointList
         * @return {Object} 坐标点列表对象
         */
        getPointList:function(){
            return this.pointList;
        },
        
        /*
         * 检查鼠标状态
         * @method getClickStatus
         * @return {Bollean} 当前鼠标点击状态
         */
        getClickStatus:function(){
           return this.clickStatus; 
        },
        /**
         * 设置鼠标点击状态
         * @method setClickStatus
         * @param {Bollean} status 是否按下鼠标
         * @return {Bollean} status
         */
        setClickStatus:function(status){
            status = status || false;
            this.clickStatus = status;
            return status; 
        },
        
        /**
         * 初始化
         * @method init
         */
        init:function(){
            var
            
                negativeCanvasDom = $('.canvas-negative').get(0),
                negativeCanvas = new global.painter.model.CanvasModel(),
                negativeCanvasContainer = Object.create(global.painter.model.CanvasContainerModel),
                
                currentCanvasDom = $('.canvas-layer').get(0),
                currentCanvas = new global.painter.model.CanvasModel(),
                currentCanvasContainer = Object.create(global.painter.model.CanvasContainerModel),
                
                bufferCanvasDom = $('.canvas-buffer').get(0),
                bufferCanvas = new global.painter.model.CanvasModel(),
                bufferCanvasContainer = Object.create(global.painter.model.CanvasContainerModel),
                
                mouseCanvasDom = $('.canvas-mouse').get(0),
                mouseCanvas = new global.painter.model.CanvasModel(),
                mouseCanvasContainer = Object.create(global.painter.model.CanvasContainerModel);
            
            //初始化当前缓冲画布
            negativeCanvas.init(negativeCanvasDom, "negativeCanvas");
            negativeCanvasContainer.init(negativeCanvas);
            global.painter = global.painter || {};
            global.painter.canvas = global.painter.canvas || {};
            global.painter.canvas.negativeCanvasContainer = negativeCanvasContainer;
                
            //初始化当前画布
            currentCanvas.init(currentCanvasDom, "currentCanvas");
            currentCanvas.autoSave(60000);//1分钟自动保存一次
            currentCanvasContainer.init(currentCanvas);
            global.painter = global.painter || {};
            global.painter.canvas = global.painter.canvas || {};
            global.painter.canvas.currentCanvasContainer = currentCanvasContainer;
            
            //初始化当前缓冲画布
            bufferCanvas.init(bufferCanvasDom, "bufferCanvas");
            bufferCanvasContainer.init(bufferCanvas);
            global.painter = global.painter || {};
            global.painter.canvas = global.painter.canvas || {};
            global.painter.canvas.bufferCanvasContainer = bufferCanvasContainer;
            
            //初始化鼠标画布
            mouseCanvas.init(mouseCanvasDom, "mouseCanvas");
            mouseCanvasContainer.init(mouseCanvas);
            global.painter = global.painter || {};
            global.painter.canvas = global.painter.canvas || {};
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
                bufferCanvas = global.painter.canvas.bufferCanvasContainer.getCanvas(),
                currentCanvas = global.painter.canvas.currentCanvasContainer.getCanvas(),
                offsetLeft = mouseCanvas.getLeft(),
                offsetTop = mouseCanvas.getTop(),
                that = this,
                
                //当前的工具
                currentTool = global.painter.tool.currentToolContainer.getTool();
               
            //绑定鼠标画布图层鼠标移动事件
            $document.delegate('#canvas-mouse', 'mousemove', function(e){
                var
                    point = null,
                    pointList = null,
                    index = "",
                    shape = null,
                    option = null,
                    status = that.getClickStatus(),
                    mouseTool = null,
                    mouse = '',
                    mouseOption = null,
                    mouseShape = null,
                    className = currentTool.getClassName();
                    
                //判断工具是否为图形类
                if(className === "shape"){
                    point = {
                        x:e.pageX - offsetLeft,
                        y:e.pageY - offsetTop
                    };                                
                    mouse = currentTool.getMouse();//获取鼠标名称
                    mouseOption = currentTool.getOption();//获取参数
                    mouseShape = new global.painter.model.mouseModel[mouse]();//创建鼠标对象                            
                    mouseShape.init(mouseOption, point);//初始化鼠标图形
                    //绘制鼠标图形到鼠标层
                    mouseCanvas.clear();
                    mouseCanvas.paint(mouseShape); 
                    
                    
                    //鼠标按下绘制图形操作
                    if(status){     
                        index = currentTool.getName();
                        //添加鼠标坐标
                        pointList = that.getPointList();
                        pointList.add(point);                                                                                               
                        option = currentTool.setPoint(pointList);  
                        
                        shape = new global.painter.model.shapeModel[index]();  
                        shape.init(option); 
                        bufferCanvas.clear();
                        bufferCanvas.paint(shape);  
                    }
                }                                           
            });
            
            //绑定鼠标按下事件
            $document.delegate('#canvas-mouse', 'mousedown', function(e){
                var
                    point = {
                        x:e.pageX - offsetLeft,
                        y:e.pageY - offsetTop
                    },
                    pointList = that.getPointList(),
                    index = '',
                    shape = null,
                    option = null;
                
                that.getPointList().init();//初始化坐标列表    
                that.getPointList().add(point);//添加鼠标坐标
                that.setClickStatus(true);                                
            });
            
            //绑定鼠标弹起事件
            $document.delegate('#canvas-mouse', 'mouseup', function(e){
                var
                    point = {
                        x:e.pageX - offsetLeft,
                        y:e.pageY - offsetTop
                    },
                    pointList = that.getPointList(),
                    index = currentTool.getName(),
                    shape = null,
                    option = null,
                    className = currentTool.getClassName();
                if(className === "shape"){
                    that.getPointList().add(point);//添加鼠标坐标
                    that.setClickStatus(false);//更新鼠标点击状态
                    //绘制图形
                    shape = new global.painter.model.shapeModel[index]()
                    option = currentTool.setPoint(pointList);    
                    shape.init(option); 
                    currentCanvas.paint(shape);
                    
                    bufferCanvas.clear();//清除缓冲画布
                }                    
            });
            
            //绑定鼠标离开
            $document.delegate('#canvas-mouse', 'mouseleave', function(e){
                mouseCanvas.clear();
            });
            
            //绑定鼠标进入
            $document.delegate('#canvas-mouse', 'mouseenter', function(e){
                mouseCanvas.clear();
                //更新当前工具
                currentTool = global.painter.tool.currentToolContainer.getTool();
            });
            
            //绑定鼠标画布图层鼠标移动事件
            document.getElementById('canvas-mouse').addEventListener('touchmove', function(e){
                var
                    point = null,
                    pointList = null,
                    index = "",
                    shape = null,
                    option = null,
                    status = that.getClickStatus(),
                    mouseTool = null,
                    mouse = '',
                    mouseOption = null,
                    mouseShape = null,
                    className = currentTool.getClassName(),
                    touch = e.changedTouches[0];
                
                e.preventDefault();    
                //判断工具是否为图形类
                if(className === "shape"){
                    point = {
                        x:touch.pageX - offsetLeft,
                        y:touch.pageY - offsetTop
                    };                                
                    mouse = currentTool.getMouse();//获取鼠标名称
                    mouseOption = currentTool.getOption();//获取参数
                    mouseShape = new global.painter.model.mouseModel[mouse]();//创建鼠标对象                            
                    mouseShape.init(mouseOption, point);//初始化鼠标图形
                    //绘制鼠标图形到鼠标层
                    mouseCanvas.clear();
                    mouseCanvas.paint(mouseShape); 
                    
                    
                    //鼠标按下绘制图形操作
                    if(status){     
                        index = currentTool.getName();
                        //添加鼠标坐标
                        pointList = that.getPointList();
                        pointList.add(point);                                                                                               
                        option = currentTool.setPoint(pointList);  
                        
                        shape = new global.painter.model.shapeModel[index]();  
                        shape.init(option); 
                        bufferCanvas.clear();
                        bufferCanvas.paint(shape);  
                    }
                }                                           
            }, false);
            
            //绑定鼠标按下事件
            document.getElementById('canvas-mouse').addEventListener('touchstart', function(e){
                var
                    touch = e.touches[0],
                    point = {
                        x:touch.pageX - offsetLeft,
                        y:touch.pageY - offsetTop
                    },
                    pointList = that.getPointList(),
                    index = '',
                    shape = null,
                    option = null;
                
                e.preventDefault();
                that.getPointList().init();//初始化坐标列表    
                that.getPointList().add(point);//添加鼠标坐标
                that.setClickStatus(true);                                
            }, false);
            
            //绑定鼠标弹起事件
            document.getElementById('canvas-mouse').addEventListener('touchend', function(e){
                var
                    touch = e.changedTouches[0],
                    point = {
                        x:touch.pageX - offsetLeft,
                        y:touch.pageY - offsetTop
                    },
                    pointList = that.getPointList(),
                    index = currentTool.getName(),
                    shape = null,
                    option = null,
                    className = currentTool.getClassName();
                    
                e.preventDefault();
                if(className === "shape"){
                    that.getPointList().add(point);//添加鼠标坐标
                    that.setClickStatus(false);//更新鼠标点击状态
                    //绘制图形
                    shape = new global.painter.model.shapeModel[index]()
                    option = currentTool.setPoint(pointList);    
                    shape.init(option); 
                    currentCanvas.paint(shape);
                    
                    bufferCanvas.clear();//清除缓冲画布
                }                    
            }, false);
        }
    };
    
    $(document).ready(function(){
       Canvas.init(); 
    });
}(jQuery, window));