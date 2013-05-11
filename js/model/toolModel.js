/**
 * @author yan
 * @module tool
 */

(function($, global){
	"use strict";
	
	var Tool,Line;
	
	/**
	 * 工具对象
	 * @class Tool
	 * @constructor
	 * @param {Object} option 当前工具参数
	 * @extend Tool.prototype
	 */
	Tool = function(option){
		this.name = 'tool';
		this.option = {
			strokeStyle:'#000',
			fillStyle:'#000',
			lineWidth:1
		};
		
		//设置参数
		option !== undefined ? $.extend(this.option, option) : 0;
	};
	
	/**
	 * 工具原型
	 * @class Tool.prototype
	 * @strict
	 */
	Tool.prototype = {		
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
		 * @return {Bollean} 是否设置成功
		 */
		setOption:function(option){
			//检查入口参数是否是对象
			if(typeof option === 'object'){
				$.extend(this.option, option);
				return true;
			} 
			
			return false;
		},
		
		/**
		 * 获取工具参数对象
		 * @method getOption 
		 * @return {Object} 返回当前工具参数对象
		 */
		getOption:function(){
			return this.option;
		}
	};
	
	/**
	 * 工具对象
	 * @class Line
	 * @constructor
	 * @extend Line.prototype
	 */
	Line = function(){
	    /**
	     * 名称
	     * @property name
	     * @type String
	     * @defult 'line' 
	     */
		this.name = 'line';
		
		/**
		 * 初始化
		 * @method init 
		 * @return {Bollean} 初始化是否成功
		 */
		this.init = function(){
		    //获取当前属性
		    var 
		      $attributePanel = $('#tool-shape-attribute-panel'),
		      width = $('.width',$attributePanel).eq(0).val(),
		      opacity = $('.opacity',$attributePanel).eq(0).val(),
		      color = $('#tool-wrap .tool .color').eq(0).val();	      
			
			//设置参数
			return this.setOption({
                lineWidth: width,
                opacity: opacity,
                strokeStyle: color
            });
		};
	};
	
	/**
	 * 直线工具原型
	 * @class Line.prototype
	 * @strict
	 */
	Line.prototype = new Tool();
	
	//添加工具到数据层
	window.painter = window.painter || {};
	window.painter.model = window.painter.model || {};
	window.painter.model.toolModel = window.painter.model.toolModel || {};
	window.painter.model.toolModel.Line = Line;
}(jQuery, window));
