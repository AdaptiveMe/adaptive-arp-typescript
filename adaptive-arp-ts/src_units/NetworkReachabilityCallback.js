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
///<reference path="INetworkReachabilityCallback.ts"/>
///<reference path="INetworkReachabilityCallbackError.ts"/>
///<reference path="INetworkReachabilityCallbackWarning.ts"/>
var Adaptive;
(function (Adaptive) {
    /**
       Interface for Managing the Network reachability callback result
       Auto-generated implementation of INetworkReachabilityCallback specification.
    */
    /**
       @property {Adaptive.Dictionary} registeredNetworkReachabilityCallback
       @member Adaptive
       @private
       NetworkReachabilityCallback control dictionary.
    */
    Adaptive.registeredNetworkReachabilityCallback = new Adaptive.Dictionary([]);
    // NetworkReachabilityCallback global listener handlers.
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.INetworkReachabilityCallbackError} error
    */
    function handleNetworkReachabilityCallbackError(id, error) {
        var callback = Adaptive.registeredNetworkReachabilityCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredNetworkReachabilityCallback dictionary.");
        }
        else {
            Adaptive.registeredNetworkReachabilityCallback.remove("" + id);
            callback.onError(error);
        }
    }
    Adaptive.handleNetworkReachabilityCallbackError = handleNetworkReachabilityCallbackError;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {boolean} reachable
    */
    function handleNetworkReachabilityCallbackResult(id, reachable) {
        var callback = Adaptive.registeredNetworkReachabilityCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredNetworkReachabilityCallback dictionary.");
        }
        else {
            Adaptive.registeredNetworkReachabilityCallback.remove("" + id);
            callback.onResult(reachable);
        }
    }
    Adaptive.handleNetworkReachabilityCallbackResult = handleNetworkReachabilityCallbackResult;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {boolean} reachable
       @param {Adaptive.INetworkReachabilityCallbackWarning} warning
    */
    function handleNetworkReachabilityCallbackWarning(id, reachable, warning) {
        var callback = Adaptive.registeredNetworkReachabilityCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredNetworkReachabilityCallback dictionary.");
        }
        else {
            Adaptive.registeredNetworkReachabilityCallback.remove("" + id);
            callback.onWarning(reachable, warning);
        }
    }
    Adaptive.handleNetworkReachabilityCallbackWarning = handleNetworkReachabilityCallbackWarning;
    /**
       @class Adaptive.NetworkReachabilityCallback
       @extends Adaptive.BaseCallback
    */
    var NetworkReachabilityCallback = (function (_super) {
        __extends(NetworkReachabilityCallback, _super);
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.INetworkReachabilityCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: boolean
           @param {Function} onWarningFunction Function receiving parameters of type: boolean, Adaptive.INetworkReachabilityCallbackWarning
        */
        function NetworkReachabilityCallback(onErrorFunction, onResultFunction, onWarningFunction) {
            _super.call(this, ++Adaptive.registeredCounter);
            if (onErrorFunction == null) {
                console.error("ERROR: NetworkReachabilityCallback onErrorFunction is not defined.");
            }
            else {
                this.onErrorFunction = onErrorFunction;
            }
            if (onResultFunction == null) {
                console.error("ERROR: NetworkReachabilityCallback onResultFunction is not defined.");
            }
            else {
                this.onResultFunction = onResultFunction;
            }
            if (onWarningFunction == null) {
                console.error("ERROR: NetworkReachabilityCallback onWarningFunction is not defined.");
            }
            else {
                this.onWarningFunction = onWarningFunction;
            }
        }
        /**
           @method
           No data received - error condition, not authorized .
           @param {Adaptive.INetworkReachabilityCallbackError} error error Error value
           @since v2.0
        */
        NetworkReachabilityCallback.prototype.onError = function (error) {
            if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                console.warn("WARNING: NetworkReachabilityCallback contains a null reference to onErrorFunction.");
            }
            else {
                this.onErrorFunction(error);
            }
        };
        /**
           @method
           Correct data received.
           @param {boolean} reachable reachable Indicates if the host is reachable
           @since v2.0
        */
        NetworkReachabilityCallback.prototype.onResult = function (reachable) {
            if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                console.warn("WARNING: NetworkReachabilityCallback contains a null reference to onResultFunction.");
            }
            else {
                this.onResultFunction(reachable);
            }
        };
        /**
           @method
           Data received with warning - ie Found entries with existing key and values have been overriden
           @param {boolean} reachable reachable Indicates if the host is reachable
           @param {Adaptive.INetworkReachabilityCallbackWarning} warning warning   Warning value
           @since v2.0
        */
        NetworkReachabilityCallback.prototype.onWarning = function (reachable, warning) {
            if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                console.warn("WARNING: NetworkReachabilityCallback contains a null reference to onWarningFunction.");
            }
            else {
                this.onWarningFunction(reachable, warning);
            }
        };
        return NetworkReachabilityCallback;
    })(Adaptive.BaseCallback);
    Adaptive.NetworkReachabilityCallback = NetworkReachabilityCallback;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=NetworkReachabilityCallback.js.map