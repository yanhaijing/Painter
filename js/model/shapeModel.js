/**
 * @author yan
 * @namespace shap
 */

(function($, global){
    /**
     * Shap 构造函数
     * @class Shap
     * @constructor
     * @extends Shap.prototype
     */
	var Shap = function(){
	};
	
	/**
	 * Shap 原型
	 * @class Shap.prototype
	 * @static
	 */
	
	Shap.prototype = {
	    /**
	     * 清除图形
	     * @method clear
	     */
	    clear:function(){
	        
	    },
	    /**
	     * 绘制图形
	     * @method paint
	     */
	    paint:function(){
	        
	    }
	};
	
	//添加变量
	global.painter = global.painter || {};
	global.painter.shap = global.painter.shap || {};
	global.painter.shap.Shap = global.painter.shap.Shap || Shap;
}(jQuery, window));
