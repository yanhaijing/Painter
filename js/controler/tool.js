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
			
			//初始化当前默认工具
			global.painter.tool = global.painter.tool || {};
			global.painter.tool.currentToolContainer = Object.create(global.painter.model.ToolContainerModel);
			global.painter.tool.currentToolContainer.init(new global.painter.model.toolModel.Line());
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
		    
		    this.setCurrentAttributePanel($defaultAttributePanel);//设置所有面板
		    this.openAttributePanel($defaultAttributePanel);//打开当前面板
		},
		
		/**
		 * 打开当前属性面板 
		 * @method openCurrentAttributePanel
		 * @param {$object} [$attributePanel=currentAttributePanel] 腰带开的面版对象
		 */
		openAttributePanel:function($attributePanel){
		    var 
                  $attributePanels = $('.tool-attribute-panel'); 
		    $attributePanel = $attributePanel || this.getCurrentAttributePanel();
		    $attributePanels.dialog('close');
		    $attributePanel.dialog('open');
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
		 * @param {$object} $attributePanel 要设置的属性面板
		 * @return {Bollean} 是否设置成功
		 */
		setCurrentAttributePanel:function($attributePanel){
		    if($attributePanel !== undefined){
		        this.currentOpenAttributePanel = $attributePanel;
		        return true;
		    } 
		    
		    return false;
		},
		/**
		 * 绑定事件
		 * @event bindEvent
		 */
		bindEvent:function(){
			var 
			     $document = $(document),
			     $toolWrap = $('#tool-wrap'),
			     that = this;
			     
			//绑定工具点击事件，所有按钮的点击效果
			$document.delegate('#tool-wrap .tool button', 'click', function(){
			    var 
			         $this = $(this),
			         temp = $this.attr('data-tool-panel'),
			         $toolPanel = $('.tool-panel .' + temp, $toolWrap),//点击要显示面板
			         $currentToolPanel = $('.tool-panel .wrap:visible', $toolWrap),//当前可见工具面板
			         $currentToolAttributePanel = $('#tool-' + temp + '-attribute-panel');//当前属性工具面板			         
			    
			    //为按钮添加点击效果     
			    $('.tool button.active', $toolWrap).removeClass('active');
			    $this.addClass('active');
			    
			    //操作工具面板
			    $currentToolPanel.hide();
			    $toolPanel.show();
			    
			    //操作属性面板
			    that.setCurrentAttributePanel($currentToolAttributePanel);//设置所有面板
                that.openAttributePanel($currentToolAttributePanel);//打开当前面板
			});
		}
	};
	
	$(document).ready(function(){
	    var tool = new Tool();
	    tool.init();
	});
}(jQuery, window));