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
///<reference path="FileDescriptor.ts"/>
///<reference path="IFileListResultCallback.ts"/>
///<reference path="IFileListResultCallbackError.ts"/>
///<reference path="IFileListResultCallbackWarning.ts"/>
var Adaptive;
(function (Adaptive) {
    /**
       Interface for Managing the File result operations
       Auto-generated implementation of IFileListResultCallback specification.
    */
    /**
       @property {Adaptive.Dictionary} registeredFileListResultCallback
       @member Adaptive
       @private
       FileListResultCallback control dictionary.
    */
    Adaptive.registeredFileListResultCallback = new Adaptive.Dictionary([]);
    // FileListResultCallback global listener handlers.
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IFileListResultCallbackError} error
    */
    function handleFileListResultCallbackError(id, error) {
        var callback = Adaptive.registeredFileListResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredFileListResultCallback dictionary.");
        }
        else {
            Adaptive.registeredFileListResultCallback.remove("" + id);
            callback.onError(error);
        }
    }
    Adaptive.handleFileListResultCallbackError = handleFileListResultCallbackError;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.FileDescriptor[]} files
    */
    function handleFileListResultCallbackResult(id, files) {
        var callback = Adaptive.registeredFileListResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredFileListResultCallback dictionary.");
        }
        else {
            Adaptive.registeredFileListResultCallback.remove("" + id);
            callback.onResult(files);
        }
    }
    Adaptive.handleFileListResultCallbackResult = handleFileListResultCallbackResult;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.FileDescriptor[]} files
       @param {Adaptive.IFileListResultCallbackWarning} warning
    */
    function handleFileListResultCallbackWarning(id, files, warning) {
        var callback = Adaptive.registeredFileListResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredFileListResultCallback dictionary.");
        }
        else {
            Adaptive.registeredFileListResultCallback.remove("" + id);
            callback.onWarning(files, warning);
        }
    }
    Adaptive.handleFileListResultCallbackWarning = handleFileListResultCallbackWarning;
    /**
       @class Adaptive.FileListResultCallback
       @extends Adaptive.BaseCallback
    */
    var FileListResultCallback = (function (_super) {
        __extends(FileListResultCallback, _super);
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IFileListResultCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.FileDescriptor[]
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.FileDescriptor[], Adaptive.IFileListResultCallbackWarning
        */
        function FileListResultCallback(onErrorFunction, onResultFunction, onWarningFunction) {
            _super.call(this, ++Adaptive.registeredCounter);
            if (onErrorFunction == null) {
                console.error("ERROR: FileListResultCallback onErrorFunction is not defined.");
            }
            else {
                this.onErrorFunction = onErrorFunction;
            }
            if (onResultFunction == null) {
                console.error("ERROR: FileListResultCallback onResultFunction is not defined.");
            }
            else {
                this.onResultFunction = onResultFunction;
            }
            if (onWarningFunction == null) {
                console.error("ERROR: FileListResultCallback onWarningFunction is not defined.");
            }
            else {
                this.onWarningFunction = onWarningFunction;
            }
        }
        /**
           @method
           On error result of a file operation.
           @param {Adaptive.IFileListResultCallbackError} error error Error processing the request.
           @since v2.0
        */
        FileListResultCallback.prototype.onError = function (error) {
            if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                console.warn("WARNING: FileListResultCallback contains a null reference to onErrorFunction.");
            }
            else {
                this.onErrorFunction(error);
            }
        };
        /**
           @method
           On correct result of a file operation.
           @param {Adaptive.FileDescriptor[]} files files Array of resulting files/folders.
           @since v2.0
        */
        FileListResultCallback.prototype.onResult = function (files) {
            if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                console.warn("WARNING: FileListResultCallback contains a null reference to onResultFunction.");
            }
            else {
                this.onResultFunction(files);
            }
        };
        /**
           @method
           On partial result of a file operation, containing a warning.
           @param {Adaptive.FileDescriptor[]} files files   Array of resulting files/folders.
           @param {Adaptive.IFileListResultCallbackWarning} warning warning Warning condition encountered.
           @since v2.0
        */
        FileListResultCallback.prototype.onWarning = function (files, warning) {
            if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                console.warn("WARNING: FileListResultCallback contains a null reference to onWarningFunction.");
            }
            else {
                this.onWarningFunction(files, warning);
            }
        };
        return FileListResultCallback;
    })(Adaptive.BaseCallback);
    Adaptive.FileListResultCallback = FileListResultCallback;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=FileListResultCallback.js.map