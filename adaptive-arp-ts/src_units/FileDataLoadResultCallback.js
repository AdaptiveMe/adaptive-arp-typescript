/**
--| ADAPTIVE RUNTIME PLATFORM |----------------------------------------------------------------------------------------

(C) Copyright 2013-2015 Carlos Lozano Diez t/a Adaptive.me <http://adaptive.me>.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the
License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 . Unless required by appli-
-cable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,  WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the  License  for the specific language governing
permissions and limitations under the License.

Original author:

    * Carlos Lozano Diez
            <http://github.com/carloslozano>
            <http://twitter.com/adaptivecoder>
            <mailto:carlos@adaptive.me>

Contributors:

    * Ferran Vila Conesa
             <http://github.com/fnva>
             <http://twitter.com/ferran_vila>
             <mailto:ferran.vila.conesa@gmail.com>

    * See source code files for contributors.

Release:

    * @version v2.2.0

-------------------------------------------| aut inveniam viam aut faciam |--------------------------------------------
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) { if (b.hasOwnProperty(p)) { d[p] = b[p]; } }
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="BaseCallback.ts"/>
///<reference path="CommonUtil.ts"/>
///<reference path="IFileDataLoadResultCallback.ts"/>
///<reference path="IFileDataLoadResultCallbackError.ts"/>
///<reference path="IFileDataLoadResultCallbackWarning.ts"/>
var Adaptive;
(function (Adaptive) {
    /**
       Interface for Managing the File loading callback responses
       Auto-generated implementation of IFileDataLoadResultCallback specification.
    */
    /**
       @property {Adaptive.Dictionary} registeredFileDataLoadResultCallback
       @member Adaptive
       @private
       FileDataLoadResultCallback control dictionary.
    */
    Adaptive.registeredFileDataLoadResultCallback = new Adaptive.Dictionary([]);
    // FileDataLoadResultCallback global listener handlers.
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IFileDataLoadResultCallbackError} error
    */
    function handleFileDataLoadResultCallbackError(id, error) {
        var callback = Adaptive.registeredFileDataLoadResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredFileDataLoadResultCallback dictionary.");
        }
        else {
            Adaptive.registeredFileDataLoadResultCallback.remove("" + id);
            callback.onError(error);
        }
    }
    Adaptive.handleFileDataLoadResultCallbackError = handleFileDataLoadResultCallbackError;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {number[]} data
    */
    function handleFileDataLoadResultCallbackResult(id, data) {
        var callback = Adaptive.registeredFileDataLoadResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredFileDataLoadResultCallback dictionary.");
        }
        else {
            Adaptive.registeredFileDataLoadResultCallback.remove("" + id);
            callback.onResult(data);
        }
    }
    Adaptive.handleFileDataLoadResultCallbackResult = handleFileDataLoadResultCallbackResult;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {number[]} data
       @param {Adaptive.IFileDataLoadResultCallbackWarning} warning
    */
    function handleFileDataLoadResultCallbackWarning(id, data, warning) {
        var callback = Adaptive.registeredFileDataLoadResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredFileDataLoadResultCallback dictionary.");
        }
        else {
            Adaptive.registeredFileDataLoadResultCallback.remove("" + id);
            callback.onWarning(data, warning);
        }
    }
    Adaptive.handleFileDataLoadResultCallbackWarning = handleFileDataLoadResultCallbackWarning;
    /**
       @class Adaptive.FileDataLoadResultCallback
       @extends Adaptive.BaseCallback
    */
    var FileDataLoadResultCallback = (function (_super) {
        __extends(FileDataLoadResultCallback, _super);
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IFileDataLoadResultCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: number[]
           @param {Function} onWarningFunction Function receiving parameters of type: number[], Adaptive.IFileDataLoadResultCallbackWarning
        */
        function FileDataLoadResultCallback(onErrorFunction, onResultFunction, onWarningFunction) {
            _super.call(this, ++Adaptive.registeredCounter);
            if (onErrorFunction == null) {
                console.error("ERROR: FileDataLoadResultCallback onErrorFunction is not defined.");
            }
            else {
                this.onErrorFunction = onErrorFunction;
            }
            if (onResultFunction == null) {
                console.error("ERROR: FileDataLoadResultCallback onResultFunction is not defined.");
            }
            else {
                this.onResultFunction = onResultFunction;
            }
            if (onWarningFunction == null) {
                console.error("ERROR: FileDataLoadResultCallback onWarningFunction is not defined.");
            }
            else {
                this.onWarningFunction = onWarningFunction;
            }
        }
        /**
           @method
           Error processing data retrieval/storage operation.
           @param {Adaptive.IFileDataLoadResultCallbackError} error error Error condition encountered.
           @since v2.0
        */
        FileDataLoadResultCallback.prototype.onError = function (error) {
            if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                console.warn("WARNING: FileDataLoadResultCallback contains a null reference to onErrorFunction.");
            }
            else {
                this.onErrorFunction(error);
            }
        };
        /**
           @method
           Result of data retrieval operation.
           @param {number[]} data data Data loaded.
           @since v2.0
        */
        FileDataLoadResultCallback.prototype.onResult = function (data) {
            if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                console.warn("WARNING: FileDataLoadResultCallback contains a null reference to onResultFunction.");
            }
            else {
                this.onResultFunction(data);
            }
        };
        /**
           @method
           Result with warning of data retrieval/storage operation.
           @param {number[]} data data    File being loaded.
           @param {Adaptive.IFileDataLoadResultCallbackWarning} warning warning Warning condition encountered.
           @since v2.0
        */
        FileDataLoadResultCallback.prototype.onWarning = function (data, warning) {
            if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                console.warn("WARNING: FileDataLoadResultCallback contains a null reference to onWarningFunction.");
            }
            else {
                this.onWarningFunction(data, warning);
            }
        };
        return FileDataLoadResultCallback;
    })(Adaptive.BaseCallback);
    Adaptive.FileDataLoadResultCallback = FileDataLoadResultCallback;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=FileDataLoadResultCallback.js.map