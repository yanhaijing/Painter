/**
 * 画布对象
 * @author yan
 * @module canvasModel
 * @namespace painter.model
 */
(function($, global){
    "use strict";
    
    /**
     * 画布对象
     * @class CanvasModel
     * @constructor
     * @extends painter.model.CanvasModel.prototype
     */
    var CanvasModel = function(){
        /**
         * 当前画布对象帮顶的画布元素
         * @property canvas
         * @type {Object}
         * @default null
         */
        this.canvas = null;
        
        /**
         * 当前画布的名称
         * @property name
         * @type String
         * @default "Canvas"
         */
        this.name = "Canvas";
        
        /**
         * 当前画布上的图形对象队列
         * @property shapeList
         * @type Array
         * @default []
         */
        this.shapeList = [];
        
        /**
         * 当前画布的覆盖方式
         * @property convertStatus
         * @type String
         * @default 'source-over'
         */
        this.convertStatus = 'source-over';
        
        /**
         * 当前画布的x轴翻转状态
         * @property flipXStatus
         * @type Bollean
         * @default false
         */
        this.flipXStatus = false;
        
        /**
         * 当前画布的y轴翻转状态
         * @property flipYStatus
         * @type Bollean
         * @default false
         */
        this.flipYStatus = false;
        
        /**
         * 当前画布的宽度
         * @property width
         * @type Number
         * @default 1000
         */
        this.width = 1000;
        
        /**
         * 当前画布的高度
         * @property height
         * @type Number
         * @default 400
         */
        this.height = 400;
        
        /**
         * 当前的画布上下文
         * @property context2D
         * @type Object
         * @default null
         */
        this.context2D = null;
        
        /**
         * 当前画布元素距离页面顶端的高度
         * @property top
         * @type Number
         * @default 0
         */
        this.top = 0;
        
        /**
         * 当前画布元素距离页面左边的宽度
         * @property left
         * @type Number
         * @default 0
         */
        this.left = 0;        
    };
    
    /**
     * 画布对象原型
     * @class CanvasModel.prototype
     * @static
     */
    CanvasModel.prototype = {
        /**
         * 初始化画布类对象
         * @method init
         * @param {Object} canvas 要绑定的画布对象
         */
        init:function(canvas, name){
           this.initCanvas(canvas); //初始化画布对象
           this.initHeight();//初始化画布高度
           this.initWidth();//初始化画布宽度
           this.initLeft();//初始化left
           this.initTop();//初始化top
           this.initContext2D();//初始化上下文对象
           this.initName(name);
           this.load();//载入图形
        },
        
        /**
         * 初始化画布名称
         * @method initName
         * @param {String} name 名称
         */
        initName:function(name){
            this.setName(name);
        },
        
        /**
         * 设置画布名称
         * @method setName
         * @param {String} name 名称
         */
        setName:function(name){
            this.name = name;  
        },
        
        /**
         * 获取画布名称
         * @method getName
         * @return {String} 名称
         */
        getName:function(){
           return this.name; 
        },
        
        /**
         * 初始化画布对象
         * @method initCanvas
         * @param {object} canvas 画布对象
         */
        initCanvas:function(canvas){
           this.setCanvas(canvas);
        },
        
        /**
         * 设置当前画布对象帮顶的画布元素
         * @method setCanvas
         * @param {Object} 设置的对象
         */
        setCanvas:function(canvas){
            if(canvas !== undefined && canvas !== null){
                this.canvas = canvas;
                return true;
            }
            
            return false;
        },
        
        /**
         * 获取当前画布对象帮顶的画布元素
         * @method getCanvas
         * @return (Object) 当前画布对象
         */
        getCanvas:function(){
            return this.canvas;
        },
        
        /**
         * 初始化上下文对象
         * @method initContext2D
         */
        initContext2D:function(){
           this.setContext2D();
        },
        
        /**
         * 获取2d上下文
         * @method getContext2D
         * @return {Object} 画布2D上下文对象
         */
        getContext2D:function(){
            return this.context2D;
        },
        
        /**
         * 设置2d上下文
         * @method setContext2D
         * @param {Object} context2D 要设置的上下文对象，若唯恐默认为当前画布的上下文
         */
        setContext2D:function(context2D){
            context2D = context2D || this.getCanvas().getContext('2d');
            this.context2D = context2D;
        },
        
        /**
         * 清除当前上下文
         * @method clearContext
         * @return {Object} 画图上下文
         */
        clearContext:function(){
            var
                height = this.getHeight(),
                width = this.getWidth(),
                context = this.getContext2D();
            
            context.clearRect(0, 0, width, height);
            
            return context;
        },
        
        /**
         * 初始化left
         * @method initLeft
         */
        initLeft:function(){
            this.updateLeft();
        },
        
        /**
         * 更新top
         * @method updateLeft
         * @return {Number} 返回left值
         */
        updateLeft:function(){
            var
                canvas = this.getCanvas(),
                left = 0;
            function getElementLeft(element){
                var 
                    actuaLeft = element.offsetLeft,
                    current = element.offsetParent;
                    
                while(current !== null){
                    actuaLeft += current.offsetLeft;
                    current = current.offsetParent;
                }
                
                return actuaLeft;
            }
            left = getElementLeft(canvas);
            this.left =left;
            return left;
        },
        
        /**
         * 获取left
         * @method getLeft
         * @return {Number} left值
         */
        getLeft:function(){
            return this.left;
        },
        
        /**
         * 初始化top
         * @method initTop
         */
        initTop:function(){
            this.updateTop();
        },
        
        /**
         * 更新top
         * @method updateTop
         * @return {Number} 返回Top值
         */
        updateTop:function(){
            var
                canvas = this.getCanvas(),
                top = 0;
            function getElementTop(element){
                var 
                    actuaTop = element.offsetTop,
                    current = element.offsetParent;
                    
                while(current !== null){
                    actuaTop += current.offsetTop;
                    current = current.offsetParent;
                }
                
                return actuaTop;
            }
            
            top = getElementTop(canvas);
            this.top =top;
            return top;
        },
        
        /**
         * 获取Top
         * @method getTop
         * @return {Number} Top值
         */
        getTop:function(){
            return this.top;
        },
        
        /**
         * 更新尺寸
         * @method updateSize
         */
        updateSize:function(){
            this.updateHeight();
            this.updateWidth();
            this.repaint();//重绘画布
        },
        
        /**
         * 初始化高度
         * @method initHeight
         */
        initHeight:function(){
            this.updateHeight();  
        },
        
        /**
         * 更新高度,更新画布元素高度为父元素高度，并设置画布类高度
         * @method updateHeight
         * @return {Number} 更新后画布的高度
         */
        updateHeight:function(){
            var 
                canvas = this.getCanvas(),
                $canvas = $(canvas),
                $canvasWrap = $canvas.parent(),
                height = $canvasWrap.height();
                
            $canvas.attr('height', height);
            
            return this.setHeight(height);   
        },
        
        /**
         * 设置当前画布类对象高度
         * @method setHeight
         * @param {Number} [height=600] 要设置的高度
         * @return {Number} 设置的高度
         */
        setHeight:function(height){
           height = height || 600;
           this.height = height;
           return height;
        },
        
        /**
         * 获取当前花布列对象高度
         * @method getHieght
         * @return {Number} 高度
         */
        getHeight:function(){
           return this.height; 
        },
        
        /**
         * 初始化高度
         * @method initWidth
         */
        initWidth:function(){
            this.updateWidth();  
        },
        
        /**
         * 更新高度,从画布元素重新获取高度
         * @method updateWidth
         * @return {Number} 当前画布高度
         */
        updateWidth:function(){
            var 
                canvas = this.getCanvas(),
                $canvas = $(canvas),
                $canvasWrap = $canvas.parent(),
                width = $canvasWrap.width();
                
            $canvas.attr('width', width);
            return this.setWidth(width);
        },
        
        /**
         * 设置当前画布类对象高度
         * @method setWidth
         * @param {Number} [width=600] 要设置的高度
         * @return {Number} 当前画布高度
         */
        setWidth:function(width){
           width = width || 600;
           this.width = width;
           
           return this.width;
        },
        
        /**
         * 获取当前花布列对象高度
         * @method getWidth
         * @return {Number} 高度
         */
        getWidth:function(){
           return this.width; 
        },                
        
        /**
         * 初始化图形队列
         * @method initShapeList
         */
        initShapeList:function(){
           this.clearShapeList(); 
        },
        
        /**
         * 获取图形列表
         * @method getShapeList
         * @return {Array} 返回图形列表的深拷贝
         */
        getShapeList:function(){
           return $.extend(true, [], this.shapeList);
        },
        
        /**
         * 设置图形列表
         * @method setShapeList
         * @param {Array} list 图形列表
         * @return {Array} 图形列表 
         */
        setShapeList:function(list){
            this.clearShapeList();//先清除
            //深拷贝参数
            $.extend(true, this.shapeList, list);
            
            return list;
        },
        
        /**
         * 添加一个图形
         * @method addShape
         * @param {Object} shape 要添加的图形对象
         */
        addShape:function(shape){
            this.shapeList.push(shape);
        },
        
        /**
         * 删除队尾图形
         * @method deleteShape
         */
        deleteShape:function(){
            this.shapeList.pop();
        },
        
        /**
         * 清除图形队列
         * @method clearShapeList
         * 
         */
        clearShapeList:function(){
            this.shapeList = [];
        },
        
        /**
         * 绘制一个图形当当前画布
         * @method paint
         * @param {Object} shape 要绘制的图形
         */
        paint:function(shape){
            this.addShape(shape);
            shape.paint(this.getContext2D());//绘制图像到当前画布
        },
        
        /**
         * 重绘当前画布
         * @method repaint
         */
        repaint:function(){
            var 
                context = null,
                list = this.shapeList,
                len = list.length,
                i = 0;
           context = this.clearContext();//清除当前画布     
           
           for(i; i<len; i=i+1){
               list[i].repaint(context);
           } 
        },
        
        /**
         * 撤销上一步操作
         * @method undo
         */
        undo:function(){
            this.deleteShape();
            this.repaint();
        },
        
        /**
         * 清除画布对象
         * @method clear
         */
        clear:function(){
            this.clearContext();
            this.clearShapeList();
        },
        
        /**
         * 反置图形
         * @method convert
         */
        convert:function(){
            var
                context = this.getContext2D(),
                tempx = context.globalCompositeOperation,
                globalCompositeOperation = (this.convertStatus === "source-over" ? "destination-over" : "source-over");
            this.convertStatus = globalCompositeOperation;
            context.globalCompositeOperation = globalCompositeOperation;
            this.repaint();
            context.globalCompositeOperation = tempx;
        },
        
        /**
         * 存储数据
         * @method save
         */
        save:function(){
            var
                storage = new global.painter.model.StorageModel(),
                tempList = [],
                list = this.shapeList,
                len = list.length,
                i = 0,
                key = this.getName(),
                value = '';
            storage.init();    
            if(storage.getStorage() !== false){
                for(i; i<len; i=i+1){
                    tempList[i] = {
                        name:list[i].getName(),
                        option:list[i].getOption()
                    };
                }
                value = global.JSON.stringify(tempList);
                storage.save(key, value);               
            }                                   
        },
        
        /**
         * 载入数据
         * @method load
         * 
         */
        load:function(){
            var
                storage = new global.painter.model.StorageModel(),
                tempList = [],
                len ,
                i = 0,
                key = this.getName(),
                value,
                list = this.shapeList;
            
            storage.init();    
            if(storage.getStorage() !== false){
                value = storage.load(key) || '[]';
                tempList = global.JSON.parse(value);//转换
                len = tempList.length;
                for(i; i<len; i=i+1){
                    list[i] = new global.painter.model.shapeModel[tempList[i].name]();
                    list[i].init(tempList[i].option);
                }
                
                //重绘
                this.repaint();
            }
        },
        
        /**
         * 自动保存
         * @method autoSave
         * @param {Number} time 多长时间自动保存一次
         */
        autoSave:function(time){
            var that = this;
            global.setInterval(function(){
                that.save();
                $.fn.TorangeNotice({type:'info', content:'自动为您保存图片'});//弹出提示
            }, time);
        },
        
        /**
         * 画布x轴翻转
         * @method flipX
         */
        flipX:function(){
            var
                context = this.getContext2D(),
                width = this.getWidth();
            // 水平“翻转”画布
            context.save();
            if(!this.flipXStatus){
                this.flipXStatus = true;
                context.translate(width, 0);
                context.scale(-1, 1);
            }else{
                this.flipXStatus = false;
            }            
            this.repaint();
            // 画布恢复正常
            context.restore();
        },
        
        /**
         * 画布y轴翻转
         * @method flipX
         */
        flipY:function(){
            var
                context = this.getContext2D(),
                height = this.getHeight();
            // 水平“翻转”画布
            context.save();
            if(!this.flipYStatus){
                this.flipYStatus = true;
                context.translate(0, height);
                context.scale(1, -1);
            }else{
                this.flipYStatus = false;
            } 
            this.repaint();
            // 画布恢复正常
            context.restore();
        }
    };
    
    global.painter = global.painter || {};
    global.painter.model = global.painter.model || {};
    global.painter.model.CanvasModel = CanvasModel;
}(jQuery, window));