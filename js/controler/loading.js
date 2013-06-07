/**
 * @author yan
 * @module loading
 * @namespace painter.controler
 */

(function($, global){
    "use strict";
    var load = 1;
    
    //载入成功后执行
    $(function(){
        $(function(){
            //载入完成，检测环境
            var
                $loading = $("#loading"),
                $load = $(".load", $loading),
                $check = $(".check", $loading),
                $checkResult = $(".check-result", $loading),
                checkCanvas = false,
                $checkCanvas = $(".check-canvas", $checkResult),
                $checkCanvasSpan = $("span", $checkCanvas),
                checkCanvasText = false,
                $checkCanvasText = $(".check-canvas-text", $checkResult),
                $checkCanvasTextSpan = $("span", $checkCanvasText),
                checkRange = false,
                $checkRange = $(".check-range", $checkResult),
                $checkRangeSpan = $("span", $checkRange),
                $select = $(".select", $checkResult),
                $sorry = $(".sorry", $checkResult),
                result = false;
                
            $load.hide();
            $check.show();
            $checkResult.show();
            
            //检查功能
            if(Modernizr.canvas === true){
                checkCanvas = true;
                $checkCanvasSpan.removeClass("unsupport").addClass("support");
            }
            if(Modernizr.canvastext){
                checkCanvasText = true;
                $checkCanvasTextSpan.removeClass("unsupport").addClass("support");
            }
            if(Modernizr.inputtypes.range){
                checkRange = true;
                $checkRangeSpan.removeClass("unsupport").addClass("support");
            }
            
            //全部通过检测自动跳转
            if(checkCanvas && checkCanvasText && checkRange){
                $loading.fadeOut();
            }
            
            //主要功能通过检测
            if(checkCanvas){
                $select.show();
                $("button", $select).click(function(){
                    $loading.fadeOut();
                });
            }else{
                $sorry.show();
            }
        });        
    });           
}(jQuery, window));
