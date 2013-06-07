/**
 * 本地存储类
 * @author yan
 * @module storageModel
 * @main storageModel
 * @namespace painter.model
 */
(function($, global){
    "use strict";
    
    /**
    * 本地存储类
    * @class StorageModel
    * @constructor
    * @extends painter.model.StorageModel.prototype
    */
    var StorageModel = function(){
        /**
         * 浏览器寸处对象
         * @property storage
         * @type Object
         * @default null
         */
        this.storage = null;    
    };
    
    /**
    * 本地存储类原型对象
    * @class StorageModel.prototype
    * @static
    */    
    StorageModel.prototype = {
        /**
         * 初始化
         * @method init 
         */
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
        
        /**
         * 获取本地存储对象
         * @method getStorage
         * @return {Object} 本地存储对象
         */
        getStorage:function(){
            return this.storage;
        },
        
        /**
         * 存储对象
         * @method save
         * @param {String} key 存的键
         * @param {String} value 要存的值
         * @return {Bollean} 存储是否成功
         */
        save:function(key, value){
            var
                storage = this.storage,
                list = false;
            if(storage !== false){
                list = storage.setItem(key, value);
            }
            return list;
        },
        
        /**
         * 载入值
         * @method getStorage
         * @param {String} key 要去得的键
         * @return {Bollean|String} 获取成功返回兼职，失败返回false
         */
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
