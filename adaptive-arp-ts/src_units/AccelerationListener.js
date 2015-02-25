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
///<reference path="Acceleration.ts"/>
///<reference path="BaseListener.ts"/>
///<reference path="CommonUtil.ts"/>
///<reference path="IAccelerationListener.ts"/>
///<reference path="IAccelerationListenerError.ts"/>
///<reference path="IAccelerationListenerWarning.ts"/>
var Adaptive;
(function (Adaptive) {
    /**
       Interface defines the response methods of the acceleration operations
       Auto-generated implementation of IAccelerationListener specification.
    */
    /**
       @property {Adaptive.Dictionary} registeredAccelerationListener
       @member Adaptive
       @private
       AccelerationListener control dictionary.
    */
    Adaptive.registeredAccelerationListener = new Adaptive.Dictionary([]);
    // AccelerationListener global listener handlers.
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IAccelerationListenerError} error
    */
    function handleAccelerationListenerError(id, error) {
        var listener = Adaptive.registeredAccelerationListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredAccelerationListener dictionary.");
        }
        else {
            listener.onError(error);
        }
    }
    Adaptive.handleAccelerationListenerError = handleAccelerationListenerError;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Acceleration} acceleration
    */
    function handleAccelerationListenerResult(id, acceleration) {
        var listener = Adaptive.registeredAccelerationListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredAccelerationListener dictionary.");
        }
        else {
            listener.onResult(acceleration);
        }
    }
    Adaptive.handleAccelerationListenerResult = handleAccelerationListenerResult;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Acceleration} acceleration
       @param {Adaptive.IAccelerationListenerWarning} warning
    */
    function handleAccelerationListenerWarning(id, acceleration, warning) {
        var listener = Adaptive.registeredAccelerationListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredAccelerationListener dictionary.");
        }
        else {
            listener.onWarning(acceleration, warning);
        }
    }
    Adaptive.handleAccelerationListenerWarning = handleAccelerationListenerWarning;
    /**
       @class Adaptive.AccelerationListener
       @extends Adaptive.BaseListener
    */
    var AccelerationListener = (function (_super) {
        __extends(AccelerationListener, _super);
        /**
           @method constructor
           Constructor with anonymous handler functions for listener.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IAccelerationListenerError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.Acceleration
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.Acceleration, Adaptive.IAccelerationListenerWarning
        */
        function AccelerationListener(onErrorFunction, onResultFunction, onWarningFunction) {
            _super.call(this, ++Adaptive.registeredCounter);
            if (onErrorFunction == null) {
                console.error("ERROR: AccelerationListener onErrorFunction is not defined.");
            }
            else {
                this.onErrorFunction = onErrorFunction;
            }
            if (onResultFunction == null) {
                console.error("ERROR: AccelerationListener onResultFunction is not defined.");
            }
            else {
                this.onResultFunction = onResultFunction;
            }
            if (onWarningFunction == null) {
                console.error("ERROR: AccelerationListener onWarningFunction is not defined.");
            }
            else {
                this.onWarningFunction = onWarningFunction;
            }
        }
        /**
           @method
           No data received - error condition, not authorized or hardware not available. This will be reported once for the
listener and subsequently, the listener will be deactivated and removed from the internal list of listeners.
           @param {Adaptive.IAccelerationListenerError} error error Error fired
           @since v2.0
        */
        AccelerationListener.prototype.onError = function (error) {
            if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                console.warn("WARNING: AccelerationListener contains a null reference to onErrorFunction.");
            }
            else {
                this.onErrorFunction(error);
            }
        };
        /**
           @method
           Correct data received.
           @param {Adaptive.Acceleration} acceleration acceleration Acceleration received
           @since v2.0
        */
        AccelerationListener.prototype.onResult = function (acceleration) {
            if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                console.warn("WARNING: AccelerationListener contains a null reference to onResultFunction.");
            }
            else {
                this.onResultFunction(acceleration);
            }
        };
        /**
           @method
           Data received with warning - ie. Needs calibration.
           @param {Adaptive.Acceleration} acceleration acceleration Acceleration received
           @param {Adaptive.IAccelerationListenerWarning} warning warning      Warning fired
           @since v2.0
        */
        AccelerationListener.prototype.onWarning = function (acceleration, warning) {
            if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                console.warn("WARNING: AccelerationListener contains a null reference to onWarningFunction.");
            }
            else {
                this.onWarningFunction(acceleration, warning);
            }
        };
        return AccelerationListener;
    })(Adaptive.BaseListener);
    Adaptive.AccelerationListener = AccelerationListener;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=AccelerationListener.js.map