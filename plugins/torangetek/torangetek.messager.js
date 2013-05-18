/*
	提示信息插件
	版权所有：橙译中科信息技术有限公司
	开发者：Xh
	修改者 颜海镜
	
	TorangeNotice:提示插件，在屏幕中央显示滑动消逝信息
	TorangeAlert:弹窗提示插件，类似于alert
	TorangeConfirm：类似于confirm

*/


$.fn.extend({  
	/**
	 *param {string} 提示框类型 error,warning,info,success
	*/
	TorangeNotice:function(setting){
		var 
			//消失速度
			speed=setting._speed||3000,
			doc_height=document.documentElement.clientHeight,
			doc_width=document.documentElement.clientWidth,
			type = setting.type || 'info',
			contentMap = {'error':'错误:',
						  'warning':'警告:',
						  'info':'提示:',
						  'success':'成功:'},
			content = setting.content || '...',
			colorMap = {'error':'rgba(197, 61, 54, 0.8)',
						'warning':'rgba(249, 163, 42, 0.8)',
						'info':'rgba(0, 68, 204, 0.8)',
						'success':'rgba(81, 163, 81, 0.8)'};

		var elem=$("<div></div>");
		elem.html(contentMap[type] + content);
		var cssObj={"position":"absolute","top":0,"left":0,"z-index":1000,"font-size":"22px","max-width":"500px","background-color":colorMap[type],"color":'#ffffff',"border-radius": "5px","-webkit-border-radius": "5px","padding":"20px 25px",
				"box-shadow": "12px 12px 20px #bbb","text-align":"center","opacity":"1"};
		elem.css(cssObj);
		elem.appendTo($("body"));
		elem.css("top",(doc_height-elem.height())/2);
		elem.css("left",(doc_width-elem.width())/2);
		
		elem.animate({
			opacity:'0.2',
			top:'-=50'
		},speed,function(){
			elem.remove();
		})
	},
});
!function( $ ){
	//确认框
	function TorangeConfirm(el,options)
	{
		this.el=$(el);
		this.confirmBtn=undefined;
		this.cancelBtn=undefined;
		this.options={
			"title":"提示",
			"onSuccess":null,
			"para1":"",
			"para2":"",
			"para3":null
			
		};
		this.setOptions(options);
		this.initialize();
	}
	
	$.fn.torangeConfirm=function(options){	
		return new TorangeConfirm(this.get(0),options);
		
	};
	
	TorangeConfirm.prototype={
		setOptions:function(options){
			var o = this.options;
			$.extend(o, options);
		},
		initialize:function(){
			var c='<div class="modal hidden" id="confirm_modal">';
				c+='	<form class="form-horizontal" onsubmit="return false;">';
				c+='<input type="hidden" id="confirm_hidden1"/>';
				c+='		<div class="modal-header">';
				c+='			<button type="button" class="close" data-dismiss="modal">×</button>';
				c+='			<h3>提示</h3>';
				c+='		</div>';
				c+='		<div class="modal-body">';
				c+='			<p>'+this.options.title+'</p>';
				
				c+=' </div>';
				c+='<div class="modal-footer"> '; 
				c+='	<button class="btn btn-primary" id="confirmbox_btn">&nbsp;确定&nbsp;</button>';
				c+='	<button class="btn" id="cancelbox_btn">&nbsp;取消&nbsp;</button>';
				
				c+=' </div>';
				c+='</form>	';
				c+='</div>';
			$(c).appendTo(this.el);
			if(this.confirmBtn==undefined)
				this.confirmBtn=$("#confirmbox_btn");
			if(this.cancelBtn==undefined)
				this.cancelBtn=$("#cancelbox_btn");
			var me=this;
			this.confirmBtn.bind("click",function(){me.confirmDo();});
			this.cancelBtn.bind("click",function(){me.cancelDo();});
			
			$("#confirm_modal").modal({"backdrop":'static','show':true});
		},
		confirmDo:function(){
			$("#confirm_modal").modal("hide");
			this.options.onSuccess(this.options.para1,this.options.para2,this.options.para3);
			this.confirmBtn.unbind("click");
			this.cancelBtn.unbind("click");
			$("#confirm_modal").remove();
		},
		cancelDo:function(){
			$("#confirm_modal").modal("hide");
			this.confirmBtn.unbind("click");
			this.cancelBtn.unbind("click");
			$("#confirm_modal").remove();
		}
	};
	
}( window.jQuery || window.ender );