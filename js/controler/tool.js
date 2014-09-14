/**
 * 工具模块
 * @author yan
 * @module tool
 * @namespace painter.controler
 */

(function($, global){
	"use strict";

	var Tool;

	/**
	 * 工具类
	 * @class Tool
	 * @constructor
	 * @extends painter.controler.Tool.prototype
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
			this.initColor();

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
		          $toolWrap = $("#tool-wrap"),
		          $at = $("footer"),
		          $attributePanels = $('.tool-attribute-panel', $toolWrap),
		          $defaultAttributePanel = $attributePanels.filter('#tool-shape-attribute-panel');

		    $attributePanels.dialog({position: {my: "right bottom", at: "right bottom", of: $at}, autoOpen: false});//初始化所有属性面板

		    this.setCurrentAttributePanel($defaultAttributePanel);//设置所有面板
		    this.openAttributePanel($defaultAttributePanel);//打开当前面板
		},

		/**
		 * 初始化颜色工具
		 * @method initColor
		 */
		initColor:function(){
		    var
		      $color = $("#tool-wrap .tool .color").eq(0);

	        $color.spectrum({
                color: "#000",
                flat: false,
                showInput: true,
                showInitial: true,
                showAlpha: true,
                localStorageKey: "spectrum",
                showSelectionPalette: true,
                clickoutFiresChange: true,
                className: "spectrum-color",
                preferredFormat: "rgb",
                showPalette: true,
                palette: [
                    ['black', 'white', 'blanchedalmond',
                    'rgb(255, 128, 0);', 'hsv 100 70 50'],
                    ['red', 'yellow', 'green', 'blue', 'violet']
                ]
            });
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

			//绑定工具栏按钮点击事件，所有按钮的点击效果
			$document.delegate('#tool-wrap .tool button', 'click', function(){
			    var
			         $this = $(this),
			         temp = $this.attr('data-tool-panel'),
			         $toolPanel = $('.tool-panel .' + temp, $toolWrap),//点击要显示面板
			         $currentToolPanel = $('.tool-panel .wrap:visible', $toolWrap),//当前可见工具面板
			         $currentToolAttributePanel = $('#tool-' + temp + '-attribute-panel'),
			         currentTool = $this.attr('data-current-tool');//当前属性工具面板

			    //为按钮添加点击效果
			    $('.tool button.active', $toolWrap).removeClass('active');
			    $this.addClass('active');

			    //操作工具面板
			    $currentToolPanel.hide();
			    $toolPanel.show();

			    //操作属性面板
			    that.setCurrentAttributePanel($currentToolAttributePanel);//设置所有面板
                that.openAttributePanel($currentToolAttributePanel);//打开当前面板

                //新建工具类，更新当前工具类
                //初始化当前默认工具
                global.painter.tool.currentToolContainer.init(new global.painter.model.toolModel[currentTool]());
			});

			//工具面板按钮点击事件
			$document.delegate("#tool-wrap .tool-panel .wrap > button", 'click', function(e){
			    var
			         $this = $(this),
			         dataTool = $this.attr('data-tool'),
			         dataToolClass = $this.attr('data-tool-class'),
			         $tool = $("#tool-wrap .tool button[data-tool-panel='" + dataTool + "']");

		         $tool.attr('data-current-tool', dataToolClass);//更新按钮点击事件
		         $tool.trigger('click');//触发点击事件
			});

			//绑定颜色更改事件
			$document.delegate("#tool-wrap .color", "change", function(e){
			    var
			         color = $(this).val(),
			         currentTool = global.painter.tool.currentToolContainer.getTool();

			     currentTool.setOption({
			         fillStyle:color,
			         strokeStyle:color
			     });
			});

			//绑定属性面板属性更改事件
			$document.delegate('.tool-attribute-panel input[type!="checkbox"][type!="radio"],.tool-attribute-panel select', "change", function(e){
			    var
			         $this = $(this),
			         attr = $this.attr('data-attr'),
			         value = $this.val(),
			         currentTool = global.painter.tool.currentToolContainer.getTool(),
			         option = {},
			         $info = $this.next("span");

			    //更新当前工具对象参数
			    option[attr] = value;
			    currentTool.setOption(option);

			    //更新提示
			    $info.html(value);
			});
			//绑定属性面板复选框属性更改事件
			$document.delegate('.tool-attribute-panel :checkbox', "change", function(e){
                var
                     $this = $(this),
                     attr = $this.attr('data-attr'),
                     value = $this.val(),
                     checked = $this.prop("checked"),
                     currentTool = global.painter.tool.currentToolContainer.getTool(),
                     option = {};

                //更新当前工具对象参数
                option[attr] = checked === true ? value : "";//获取数据
                currentTool.setOption(option);

                window.console.log(checked);
            });
            //绑定属性面板单选框属性更改事件
            $document.delegate('.tool-attribute-panel :radio', "change", function(e){
                var
                     $this = $(this),
                     attr = $this.attr('data-attr'),
                     value = $this.val(),
                     currentTool = global.painter.tool.currentToolContainer.getTool(),
                     option = {};

                //更新当前工具对象参数
                option[attr] = value;//获取数据
                currentTool.setOption(option);
            });
		}
	};

	$(document).ready(function(){
	    var tool = new Tool();
	    tool.init();
	});
}(jQuery, window));