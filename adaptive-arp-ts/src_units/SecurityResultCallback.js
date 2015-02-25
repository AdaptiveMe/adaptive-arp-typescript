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
///<reference path="ISecurityResultCallback.ts"/>
///<reference path="ISecurityResultCallbackError.ts"/>
///<reference path="ISecurityResultCallbackWarning.ts"/>
///<reference path="SecureKeyPair.ts"/>
var Adaptive;
(function (Adaptive) {
    /**
       Interface for Managing the Security result callback
       Auto-generated implementation of ISecurityResultCallback specification.
    */
    /**
       @property {Adaptive.Dictionary} registeredSecurityResultCallback
       @member Adaptive
       @private
       SecurityResultCallback control dictionary.
    */
    Adaptive.registeredSecurityResultCallback = new Adaptive.Dictionary([]);
    // SecurityResultCallback global listener handlers.
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.ISecurityResultCallbackError} error
    */
    function handleSecurityResultCallbackError(id, error) {
        var callback = Adaptive.registeredSecurityResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredSecurityResultCallback dictionary.");
        }
        else {
            Adaptive.registeredSecurityResultCallback.remove("" + id);
            callback.onError(error);
        }
    }
    Adaptive.handleSecurityResultCallbackError = handleSecurityResultCallbackError;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.SecureKeyPair[]} keyValues
    */
    function handleSecurityResultCallbackResult(id, keyValues) {
        var callback = Adaptive.registeredSecurityResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredSecurityResultCallback dictionary.");
        }
        else {
            Adaptive.registeredSecurityResultCallback.remove("" + id);
            callback.onResult(keyValues);
        }
    }
    Adaptive.handleSecurityResultCallbackResult = handleSecurityResultCallbackResult;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.SecureKeyPair[]} keyValues
       @param {Adaptive.ISecurityResultCallbackWarning} warning
    */
    function handleSecurityResultCallbackWarning(id, keyValues, warning) {
        var callback = Adaptive.registeredSecurityResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredSecurityResultCallback dictionary.");
        }
        else {
            Adaptive.registeredSecurityResultCallback.remove("" + id);
            callback.onWarning(keyValues, warning);
        }
    }
    Adaptive.handleSecurityResultCallbackWarning = handleSecurityResultCallbackWarning;
    /**
       @class Adaptive.SecurityResultCallback
       @extends Adaptive.BaseCallback
    */
    var SecurityResultCallback = (function (_super) {
        __extends(SecurityResultCallback, _super);
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.ISecurityResultCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.SecureKeyPair[]
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.SecureKeyPair[], Adaptive.ISecurityResultCallbackWarning
        */
        function SecurityResultCallback(onErrorFunction, onResultFunction, onWarningFunction) {
            _super.call(this, ++Adaptive.registeredCounter);
            if (onErrorFunction == null) {
                console.error("ERROR: SecurityResultCallback onErrorFunction is not defined.");
            }
            else {
                this.onErrorFunction = onErrorFunction;
            }
            if (onResultFunction == null) {
                console.error("ERROR: SecurityResultCallback onResultFunction is not defined.");
            }
            else {
                this.onResultFunction = onResultFunction;
            }
            if (onWarningFunction == null) {
                console.error("ERROR: SecurityResultCallback onWarningFunction is not defined.");
            }
            else {
                this.onWarningFunction = onWarningFunction;
            }
        }
        /**
           @method
           No data received - error condition, not authorized .
           @param {Adaptive.ISecurityResultCallbackError} error error Error values
           @since v2.0
        */
        SecurityResultCallback.prototype.onError = function (error) {
            if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                console.warn("WARNING: SecurityResultCallback contains a null reference to onErrorFunction.");
            }
            else {
                this.onErrorFunction(error);
            }
        };
        /**
           @method
           Correct data received.
           @param {Adaptive.SecureKeyPair[]} keyValues keyValues key and values
           @since v2.0
        */
        SecurityResultCallback.prototype.onResult = function (keyValues) {
            if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                console.warn("WARNING: SecurityResultCallback contains a null reference to onResultFunction.");
            }
            else {
                this.onResultFunction(keyValues);
            }
        };
        /**
           @method
           Data received with warning - ie Found entries with existing key and values have been overriden
           @param {Adaptive.SecureKeyPair[]} keyValues keyValues key and values
           @param {Adaptive.ISecurityResultCallbackWarning} warning warning   Warning values
           @since v2.0
        */
        SecurityResultCallback.prototype.onWarning = function (keyValues, warning) {
            if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                console.warn("WARNING: SecurityResultCallback contains a null reference to onWarningFunction.");
            }
            else {
                this.onWarningFunction(keyValues, warning);
            }
        };
        return SecurityResultCallback;
    })(Adaptive.BaseCallback);
    Adaptive.SecurityResultCallback = SecurityResultCallback;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=SecurityResultCallback.js.map