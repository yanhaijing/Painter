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
	Tool = function(){
	    /**
	     * 当前打开的工具属性面板
	     * @property currentOpenAttributePanel
	     * @type $object
	     * @default null
	     */
	    this.currentOpenAttributePanel = null;
	};
	
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
			
			this.initAttributePanel();
		},
		
		/**
		 * 初始化工具属性面板
		 * @method initAttributePanel 
		 */
		initAttributePanel:function(){
		    var 
		          $attributePanels = $('.tool-attribute-panel'),
		          $defaultAttributePanel = $attributePanels.filter('#tool-shape-attribute-panel');  
		            
		    $attributePanels.dialog({position:'right bottom', autoOpen: false});//初始化所有属性面板
		    $defaultAttributePanel.dialog("open");//代开默认面板
		},
		
		/**
		 * 获取当前工具属性面板对象
		 * @method getCurrentAttributePanel 
		 * @return $object 当前属性面板对象
		 */
		getCurrentAttributePanel:function(){
		    return this.currentOpenAttributePanel;
		},
		
		/**
		 *  设置当前工具属性面板对象
		 * @method setCurrentAttributePanel 
		 */
		/**
		 * 绑定事件
		 * @event bindEvent
		 */
		bindEvent:function(){
			var 
			     $document = $(document),
			     $toolWrap = $('#tool-wrap');
			     
			//绑定工具点击事件，所有按钮的点击效果
			$document.delegate('#tool-wrap .tool button', 'click', function(){
			    var 
			         $this = $(this),
			         temp = $this.attr('data-tool-panel'),
			         $toolPanel = $('.tool-panel .' + temp, $toolWrap),
			         $currentToolPanel = $('.tool-panel .wrap:visible', $toolWrap);
			    
			    //为按钮添加点击效果     
			    $('.tool button.active', $toolWrap).removeClass('active');
			    $this.addClass('active');
			    
			    //操作工具面板
			    $currentToolPanel.hide();
			    $toolPanel.show();
			});
		}
	};
	
	$(document).ready(function(){
	    var tool = new Tool();
	    tool.init();
	});
}(jQuery, window));
