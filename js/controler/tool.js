/**
 * 工具模块
 * @author yan
 * @namespace controls
 */

(function($, global){
	"use strict";
	
	var Tool;
	
	/**
	 * 工具类
	 * @class Tool
	 * @constructor
	 * @extends Tool.prorotype
	 */
	Tool = function(){};
	
	/**
	 * 工具类原型
	 * @class Tool.prototype
	 * @static
	 */
	Tool.prototype = {
		/**
		 * 初始化
		 * @method init
		 */
		init:function(){
			//绑定事件
			this.bindEvent();
		},
		
		/**
		 * 绑定事件
		 * @event bindEvent
		 */
		bindEvent:function(){
			var $document = $(document);
		}
	};
}(jQuery, window));
