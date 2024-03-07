/**
 * 图片转换
 * @author jahentao
 * @module pictureTransform
 * @namespace painter.controler
 */
(function($, global) {
    "use strict";

    var PictureTransform, Command;

    /**
     * 图片变换的命令
     */
    Command = {
        name: "命令名嘛",
        type: 0, // 目前图片变换支持几种，1是左右翻转，2是上下翻转，3是水平+垂直翻转
		// 1+2=3，而这1和2代表的变换正是3，希望能以一种可累加/累乘的方式扩展命令，
		// 初步设想，矩阵变换，累乘的方式来表示命令，比较好；目前用type指代仅有的需求

        /**
         * 命令执行的具体指令
         */
        do: function (e) {

        },
		
		/**
		 * 命令间累加的函数
		 */
		combine: function(command) {
			return command.type | this.type;
		}
    };

    /**
     * 图片转换类
     */
    PictureTransform = function() {

        this.commandList = [];
        this.commadType = 0;

        /**
         * 初始化
         * @method init
         */
        this.init = function(){
            this.commandList = [];
        };

        /**
         * 添加图形变换命令
         * @param command
         */
        this.addCommand = function (command) {
            // this.commandList.push(command); // 命令队列若有相同操作重复会有Bug！
            this.commadType |= command.type;
        };

        this.clear = function() {
            this.commandList = [];
            this.commadType = 0;
        };

        /**
         * 执行所有变换，
		 * 或者采取先累加所有命令，再执行的方式
         */
        this.transform = function(context, option) {
            var i = 0,
                // sumType = 0,
				x = option.x, y = option.y, 
				width = option.width, height = option.height;
//             for (i=0 ; i<this.commandList.length; i++) {
//                 this.commandList[i].do();
//             }
// 			for (i=0 ; i<this.commandList.length; i++) {
// 				sumType += this.commandList[i].type;
// 			}
			
			switch(this.commadType) {
				case 1: //左右翻转
					context.translate(Number(x) * 2 + Number(width), 0);
					context.scale(-1, 1);
					break;
				case 2: //上下翻转
					context.translate(0, Number(height) + Number(y) * 2);
					context.scale(1, -1);
					break;
				case 3: //左右+上下翻转
                    context.translate(Number(x) * 2 + Number(width), Number(height) + Number(y) * 2);
                    context.scale(-1, -1);
					break;
				default: break;
			}

            this.clear();
        };
    };

    global.pictureTransform = new PictureTransform();

}(jQuery, window));