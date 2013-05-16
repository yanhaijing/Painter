/**
 * 鼠标形状js
 * @author yan
 * @namespace model
 * @module mouse
 */
(function($, global){
    "use strict";
    var
        Mouse,
        Cross,
        Eraser;
    
    /**
     * 鼠标类
     * @class Mouse
     * @constructor
     * @extends Mouse.prorotype
     */    
    Mouse = function(){
        this.name = "Mouse";
        this.option = {};
        this.mouseShape = null;
    };
    
    /**
     * 鼠标类
     * @class Mouse
     * @constructor
     * @extends Mouse.prorotype
     */
    Mouse.prototype = {        
        /**
         * 获取名字
         * @method getName
         * @return {String} 当前的名字
         */
        getName:function(){
            return this.name;   
        },
        
        /**
         * 设置工具参数对象
         * @method setOption
         * @param {Object} option 设置的参数集和
         * @return {Object} 成功返回设置对象，失败返回null
         */
        setOption:function(option){
            //检查入口参数是否是对象
            if(typeof option === 'object'){
                $.extend(true, this.option, option);
                return this.getOption();
            } 
            
            return null;
        },
        
        /**
         * 获取工具参数对象
         * @method getOption 
         * @return {Object} 返回当前工具参数对象
         */
        getOption:function(){
            return $.extend(true, {}, this.option);//放回选项对象的深拷贝
        },
        
        getMouseShape:function(){
            return this.mouseShape;
        },
        setMouseShape:function(mouseShape){
            this.mouseShape = mouseShape;
            return mouseShape;
        },
        setPoints:function(points){
            this.setOption(points);
        },
        initMouseShape:function(){
            this.getMouseShape().init(this.getOption());
        }
    };
    
    Cross = function(){
        this.name = "Cross";
        this.init = function(option, points){
            var 
                index = this.getName();
            //设置参数
            this.setOption({
                length:10,
                lineHeight:1,
                strokeStyle:'#000'
            });
            this.setPoints(points);//设置点    
            //设置鼠标图形
            this.setMouseShape(new global.painter.model.shapeModel[index]());
            this.initMouseShape();//初始化鼠标图形
        };
        
        this.paint = function(context){
            this.getMouseShape().paint(context);
        };
    };
    
    Cross.prototype = new Mouse();
    
    Eraser = function(){
        this.name = "Eraser";
        this.init = function(option, points){
            var 
                index = "CircleStroke";
            //设置参数
            this.setOption({
                strokeStyle:'#000',
                opacity:50,
                radius:parseInt(option.lineWidth, 10) + 2
            });
            this.setPoints(points);//设置点    
            //设置鼠标图形
            this.setMouseShape(new global.painter.model.shapeModel[index]());
            this.initMouseShape();//初始化鼠标图形
        };
        
        this.paint = function(context){
            this.getMouseShape().paint(context);
        };
    };
    
    Eraser.prototype = new Mouse();
    
    //添加工具到数据层
    global.painter = global.painter || {};
    global.painter.model = global.painter.model || {};
    global.painter.model.mouseModel = global.painter.model.mouseModel || {};
    global.painter.model.mouseModel.Cross = Cross;
    global.painter.model.mouseModel.Eraser = Eraser;
}(jQuery, window));

