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
///<reference path="IServiceResultCallback.ts"/>
///<reference path="IServiceResultCallbackError.ts"/>
///<reference path="IServiceResultCallbackWarning.ts"/>
///<reference path="ServiceResponse.ts"/>
var Adaptive;
(function (Adaptive) {
    /**
       Interface for Managing the Services operations
       Auto-generated implementation of IServiceResultCallback specification.
    */
    /**
       @property {Adaptive.Dictionary} registeredServiceResultCallback
       @member Adaptive
       @private
       ServiceResultCallback control dictionary.
    */
    Adaptive.registeredServiceResultCallback = new Adaptive.Dictionary([]);
    // ServiceResultCallback global listener handlers.
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IServiceResultCallbackError} error
    */
    function handleServiceResultCallbackError(id, error) {
        var callback = Adaptive.registeredServiceResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredServiceResultCallback dictionary.");
        }
        else {
            Adaptive.registeredServiceResultCallback.remove("" + id);
            callback.onError(error);
        }
    }
    Adaptive.handleServiceResultCallbackError = handleServiceResultCallbackError;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.ServiceResponse} response
    */
    function handleServiceResultCallbackResult(id, response) {
        var callback = Adaptive.registeredServiceResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredServiceResultCallback dictionary.");
        }
        else {
            Adaptive.registeredServiceResultCallback.remove("" + id);
            callback.onResult(response);
        }
    }
    Adaptive.handleServiceResultCallbackResult = handleServiceResultCallbackResult;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.ServiceResponse} response
       @param {Adaptive.IServiceResultCallbackWarning} warning
    */
    function handleServiceResultCallbackWarning(id, response, warning) {
        var callback = Adaptive.registeredServiceResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredServiceResultCallback dictionary.");
        }
        else {
            Adaptive.registeredServiceResultCallback.remove("" + id);
            callback.onWarning(response, warning);
        }
    }
    Adaptive.handleServiceResultCallbackWarning = handleServiceResultCallbackWarning;
    /**
       @class Adaptive.ServiceResultCallback
       @extends Adaptive.BaseCallback
    */
    var ServiceResultCallback = (function (_super) {
        __extends(ServiceResultCallback, _super);
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IServiceResultCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.ServiceResponse
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.ServiceResponse, Adaptive.IServiceResultCallbackWarning
        */
        function ServiceResultCallback(onErrorFunction, onResultFunction, onWarningFunction) {
            _super.call(this, ++Adaptive.registeredCounter);
            if (onErrorFunction == null) {
                console.error("ERROR: ServiceResultCallback onErrorFunction is not defined.");
            }
            else {
                this.onErrorFunction = onErrorFunction;
            }
            if (onResultFunction == null) {
                console.error("ERROR: ServiceResultCallback onResultFunction is not defined.");
            }
            else {
                this.onResultFunction = onResultFunction;
            }
            if (onWarningFunction == null) {
                console.error("ERROR: ServiceResultCallback onWarningFunction is not defined.");
            }
            else {
                this.onWarningFunction = onWarningFunction;
            }
        }
        /**
           @method
           This method is called on Error
           @param {Adaptive.IServiceResultCallbackError} error error returned by the platform
           @since v2.0
        */
        ServiceResultCallback.prototype.onError = function (error) {
            if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                console.warn("WARNING: ServiceResultCallback contains a null reference to onErrorFunction.");
            }
            else {
                this.onErrorFunction(error);
            }
        };
        /**
           @method
           This method is called on Result
           @param {Adaptive.ServiceResponse} response response data
           @since v2.0
        */
        ServiceResultCallback.prototype.onResult = function (response) {
            if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                console.warn("WARNING: ServiceResultCallback contains a null reference to onResultFunction.");
            }
            else {
                this.onResultFunction(response);
            }
        };
        /**
           @method
           This method is called on Warning
           @param {Adaptive.ServiceResponse} response response data
           @param {Adaptive.IServiceResultCallbackWarning} warning warning  returned by the platform
           @since v2.0
        */
        ServiceResultCallback.prototype.onWarning = function (response, warning) {
            if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                console.warn("WARNING: ServiceResultCallback contains a null reference to onWarningFunction.");
            }
            else {
                this.onWarningFunction(response, warning);
            }
        };
        return ServiceResultCallback;
    })(Adaptive.BaseCallback);
    Adaptive.ServiceResultCallback = ServiceResultCallback;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=ServiceResultCallback.js.map