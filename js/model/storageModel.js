/**
 * 本地存储类
 * @author yan
 * @namespace model
 * @module Storage
 */
(function($, global){
    "use strict";
    
    var StorageModel = function(){
        this.storage = null;    
    };
        
    StorageModel.prototype = {
        init:function(){
            function getLocalStorage(){
                var result = false;
                if(typeof global.localStorage === 'object'){
                    result = localStorage;
                }else if(typeof global.globalStorage === 'object'){
                    result = global.globalStorage;
                }
                
                return result;
            }
            
            this.storage = getLocalStorage();
        },
        
        getStorage:function(){
            return this.storage;
        },
        
        save:function(key, value){
            var
                storage = this.storage,
                list = false;
            if(storage !== false){
                list = storage.setItem(key, value);
            }
            return list;
        },
        
        load:function(key){
            var
                storage = this.storage,
                result = false;
            if(storage !== false){                
                result = storage.getItem(key);
            }
            
            return result;
        }
    };
    
    global.painter = global.painter || {};
    global.painter.model = global.painter.model || {};
    global.painter.model.StorageModel = StorageModel;
}(jQuery, window));
