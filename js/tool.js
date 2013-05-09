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
			color:'#ffffff',
			width:1
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
		 * 初始化当前对象
		 * @method init
		 * @param {Object} option 初始化的参数
		 * @return {Bollean} 是否初始化成功
		 */
		init:function(option){
			if(typeof option === 'object'){
				$.extend(true, this.option, option);
				
				return true;
			}
			
			return false;
		},
		
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
		this.name = 'line';
	};
	
	/**
	 * 直线工具原型
	 * @class Line.prototype
	 * @strict
	 */
	Line.prototype = new Tool();
	
}(jQuery, window));
