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
///<reference path="IDisplayOrientationListener.ts"/>
///<reference path="IDisplayOrientationListenerError.ts"/>
///<reference path="IDisplayOrientationListenerWarning.ts"/>
///<reference path="RotationEvent.ts"/>
var Adaptive;
(function (Adaptive) {
    /**
       Interface for handling display orientation change events.
       Auto-generated implementation of IDisplayOrientationListener specification.
    */
    /**
       @property {Adaptive.Dictionary} registeredDisplayOrientationListener
       @member Adaptive
       @private
       DisplayOrientationListener control dictionary.
    */
    Adaptive.registeredDisplayOrientationListener = new Adaptive.Dictionary([]);
    // DisplayOrientationListener global listener handlers.
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IDisplayOrientationListenerError} error
    */
    function handleDisplayOrientationListenerError(id, error) {
        var listener = Adaptive.registeredDisplayOrientationListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredDisplayOrientationListener dictionary.");
        }
        else {
            listener.onError(error);
        }
    }
    Adaptive.handleDisplayOrientationListenerError = handleDisplayOrientationListenerError;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.RotationEvent} rotationEvent
    */
    function handleDisplayOrientationListenerResult(id, rotationEvent) {
        var listener = Adaptive.registeredDisplayOrientationListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredDisplayOrientationListener dictionary.");
        }
        else {
            listener.onResult(rotationEvent);
        }
    }
    Adaptive.handleDisplayOrientationListenerResult = handleDisplayOrientationListenerResult;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.RotationEvent} rotationEvent
       @param {Adaptive.IDisplayOrientationListenerWarning} warning
    */
    function handleDisplayOrientationListenerWarning(id, rotationEvent, warning) {
        var listener = Adaptive.registeredDisplayOrientationListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredDisplayOrientationListener dictionary.");
        }
        else {
            listener.onWarning(rotationEvent, warning);
        }
    }
    Adaptive.handleDisplayOrientationListenerWarning = handleDisplayOrientationListenerWarning;
    /**
       @class Adaptive.DisplayOrientationListener
       @extends Adaptive.BaseListener
    */
    var DisplayOrientationListener = (function (_super) {
        __extends(DisplayOrientationListener, _super);
        /**
           @method constructor
           Constructor with anonymous handler functions for listener.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IDisplayOrientationListenerError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.RotationEvent
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.RotationEvent, Adaptive.IDisplayOrientationListenerWarning
        */
        function DisplayOrientationListener(onErrorFunction, onResultFunction, onWarningFunction) {
            _super.call(this, ++Adaptive.registeredCounter);
            if (onErrorFunction == null) {
                console.error("ERROR: DisplayOrientationListener onErrorFunction is not defined.");
            }
            else {
                this.onErrorFunction = onErrorFunction;
            }
            if (onResultFunction == null) {
                console.error("ERROR: DisplayOrientationListener onResultFunction is not defined.");
            }
            else {
                this.onResultFunction = onResultFunction;
            }
            if (onWarningFunction == null) {
                console.error("ERROR: DisplayOrientationListener onWarningFunction is not defined.");
            }
            else {
                this.onWarningFunction = onWarningFunction;
            }
        }
        /**
           @method
           Although extremely unlikely, this event will be fired if something beyond the control of the
platform impedes the rotation of the display.
           @param {Adaptive.IDisplayOrientationListenerError} error error The error condition... generally unknown as it is unexpected!
           @since v2.0.5
        */
        DisplayOrientationListener.prototype.onError = function (error) {
            if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                console.warn("WARNING: DisplayOrientationListener contains a null reference to onErrorFunction.");
            }
            else {
                this.onErrorFunction(error);
            }
        };
        /**
           @method
           Event fired with the successful start and finish of a rotation.
           @param {Adaptive.RotationEvent} rotationEvent rotationEvent RotationEvent containing origin, destination and state of the event.
           @since v2.0.5
        */
        DisplayOrientationListener.prototype.onResult = function (rotationEvent) {
            if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                console.warn("WARNING: DisplayOrientationListener contains a null reference to onResultFunction.");
            }
            else {
                this.onResultFunction(rotationEvent);
            }
        };
        /**
           @method
           Event fired with a warning when the rotation is aborted. In specific, this
event may be fired if the application vetoes display rotation before rotation is completed.
           @param {Adaptive.RotationEvent} rotationEvent rotationEvent   RotationEvent containing origin, destination and state of the event.
           @param {Adaptive.IDisplayOrientationListenerWarning} warning warning Type of condition that aborted rotation execution.
           @since v2.0.5
        */
        DisplayOrientationListener.prototype.onWarning = function (rotationEvent, warning) {
            if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                console.warn("WARNING: DisplayOrientationListener contains a null reference to onWarningFunction.");
            }
            else {
                this.onWarningFunction(rotationEvent, warning);
            }
        };
        return DisplayOrientationListener;
    })(Adaptive.BaseListener);
    Adaptive.DisplayOrientationListener = DisplayOrientationListener;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=DisplayOrientationListener.js.map