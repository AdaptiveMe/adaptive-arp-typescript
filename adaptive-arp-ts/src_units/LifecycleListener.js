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
///<reference path="BaseListener.ts"/>
///<reference path="CommonUtil.ts"/>
///<reference path="ILifecycleListener.ts"/>
///<reference path="ILifecycleListenerError.ts"/>
///<reference path="ILifecycleListenerWarning.ts"/>
///<reference path="Lifecycle.ts"/>
var Adaptive;
(function (Adaptive) {
    /**
       Interface for Managing the Lifecycle listeners
       Auto-generated implementation of ILifecycleListener specification.
    */
    /**
       @property {Adaptive.Dictionary} registeredLifecycleListener
       @member Adaptive
       @private
       LifecycleListener control dictionary.
    */
    Adaptive.registeredLifecycleListener = new Adaptive.Dictionary([]);
    // LifecycleListener global listener handlers.
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.ILifecycleListenerError} error
    */
    function handleLifecycleListenerError(id, error) {
        var listener = Adaptive.registeredLifecycleListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredLifecycleListener dictionary.");
        }
        else {
            listener.onError(error);
        }
    }
    Adaptive.handleLifecycleListenerError = handleLifecycleListenerError;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Lifecycle} lifecycle
    */
    function handleLifecycleListenerResult(id, lifecycle) {
        var listener = Adaptive.registeredLifecycleListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredLifecycleListener dictionary.");
        }
        else {
            listener.onResult(lifecycle);
        }
    }
    Adaptive.handleLifecycleListenerResult = handleLifecycleListenerResult;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Lifecycle} lifecycle
       @param {Adaptive.ILifecycleListenerWarning} warning
    */
    function handleLifecycleListenerWarning(id, lifecycle, warning) {
        var listener = Adaptive.registeredLifecycleListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredLifecycleListener dictionary.");
        }
        else {
            listener.onWarning(lifecycle, warning);
        }
    }
    Adaptive.handleLifecycleListenerWarning = handleLifecycleListenerWarning;
    /**
       @class Adaptive.LifecycleListener
       @extends Adaptive.BaseListener
    */
    var LifecycleListener = (function (_super) {
        __extends(LifecycleListener, _super);
        /**
           @method constructor
           Constructor with anonymous handler functions for listener.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.ILifecycleListenerError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.Lifecycle
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.Lifecycle, Adaptive.ILifecycleListenerWarning
        */
        function LifecycleListener(onErrorFunction, onResultFunction, onWarningFunction) {
            _super.call(this, ++Adaptive.registeredCounter);
            if (onErrorFunction == null) {
                console.error("ERROR: LifecycleListener onErrorFunction is not defined.");
            }
            else {
                this.onErrorFunction = onErrorFunction;
            }
            if (onResultFunction == null) {
                console.error("ERROR: LifecycleListener onResultFunction is not defined.");
            }
            else {
                this.onResultFunction = onResultFunction;
            }
            if (onWarningFunction == null) {
                console.error("ERROR: LifecycleListener onWarningFunction is not defined.");
            }
            else {
                this.onWarningFunction = onWarningFunction;
            }
        }
        /**
           @method
           No data received - error condition, not authorized or hardware not available.
           @param {Adaptive.ILifecycleListenerError} error error Type of error encountered during reading.
           @since v2.0
        */
        LifecycleListener.prototype.onError = function (error) {
            if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                console.warn("WARNING: LifecycleListener contains a null reference to onErrorFunction.");
            }
            else {
                this.onErrorFunction(error);
            }
        };
        /**
           @method
           Called when lifecycle changes somehow.
           @param {Adaptive.Lifecycle} lifecycle lifecycle Lifecycle element
           @since v2.0
        */
        LifecycleListener.prototype.onResult = function (lifecycle) {
            if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                console.warn("WARNING: LifecycleListener contains a null reference to onResultFunction.");
            }
            else {
                this.onResultFunction(lifecycle);
            }
        };
        /**
           @method
           Data received with warning
           @param {Adaptive.Lifecycle} lifecycle lifecycle Lifecycle element
           @param {Adaptive.ILifecycleListenerWarning} warning warning   Type of warning encountered during reading.
           @since v2.0
        */
        LifecycleListener.prototype.onWarning = function (lifecycle, warning) {
            if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                console.warn("WARNING: LifecycleListener contains a null reference to onWarningFunction.");
            }
            else {
                this.onWarningFunction(lifecycle, warning);
            }
        };
        return LifecycleListener;
    })(Adaptive.BaseListener);
    Adaptive.LifecycleListener = LifecycleListener;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=LifecycleListener.js.map