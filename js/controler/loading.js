/**
 * @author yan
 */

(function($, global){
    "use strict";
    var load = 1;
    global.console.log("load",load++);
    $(function(){
        $("#loading").fadeOut();
    });           
}(jQuery, window));
