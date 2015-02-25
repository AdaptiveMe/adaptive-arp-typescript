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
///<reference path="Button.ts"/>
///<reference path="CommonUtil.ts"/>
///<reference path="IButtonListener.ts"/>
///<reference path="IButtonListenerError.ts"/>
///<reference path="IButtonListenerWarning.ts"/>
var Adaptive;
(function (Adaptive) {
    /**
       Interface for Managing the button  operations
       Auto-generated implementation of IButtonListener specification.
    */
    /**
       @property {Adaptive.Dictionary} registeredButtonListener
       @member Adaptive
       @private
       ButtonListener control dictionary.
    */
    Adaptive.registeredButtonListener = new Adaptive.Dictionary([]);
    // ButtonListener global listener handlers.
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IButtonListenerError} error
    */
    function handleButtonListenerError(id, error) {
        var listener = Adaptive.registeredButtonListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredButtonListener dictionary.");
        }
        else {
            listener.onError(error);
        }
    }
    Adaptive.handleButtonListenerError = handleButtonListenerError;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Button} button
    */
    function handleButtonListenerResult(id, button) {
        var listener = Adaptive.registeredButtonListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredButtonListener dictionary.");
        }
        else {
            listener.onResult(button);
        }
    }
    Adaptive.handleButtonListenerResult = handleButtonListenerResult;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Button} button
       @param {Adaptive.IButtonListenerWarning} warning
    */
    function handleButtonListenerWarning(id, button, warning) {
        var listener = Adaptive.registeredButtonListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredButtonListener dictionary.");
        }
        else {
            listener.onWarning(button, warning);
        }
    }
    Adaptive.handleButtonListenerWarning = handleButtonListenerWarning;
    /**
       @class Adaptive.ButtonListener
       @extends Adaptive.BaseListener
    */
    var ButtonListener = (function (_super) {
        __extends(ButtonListener, _super);
        /**
           @method constructor
           Constructor with anonymous handler functions for listener.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IButtonListenerError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.Button
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.Button, Adaptive.IButtonListenerWarning
        */
        function ButtonListener(onErrorFunction, onResultFunction, onWarningFunction) {
            _super.call(this, ++Adaptive.registeredCounter);
            if (onErrorFunction == null) {
                console.error("ERROR: ButtonListener onErrorFunction is not defined.");
            }
            else {
                this.onErrorFunction = onErrorFunction;
            }
            if (onResultFunction == null) {
                console.error("ERROR: ButtonListener onResultFunction is not defined.");
            }
            else {
                this.onResultFunction = onResultFunction;
            }
            if (onWarningFunction == null) {
                console.error("ERROR: ButtonListener onWarningFunction is not defined.");
            }
            else {
                this.onWarningFunction = onWarningFunction;
            }
        }
        /**
           @method
           No data received
           @param {Adaptive.IButtonListenerError} error error occurred
           @since v2.0
        */
        ButtonListener.prototype.onError = function (error) {
            if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                console.warn("WARNING: ButtonListener contains a null reference to onErrorFunction.");
            }
            else {
                this.onErrorFunction(error);
            }
        };
        /**
           @method
           Called on button pressed
           @param {Adaptive.Button} button button pressed
           @since v2.0
        */
        ButtonListener.prototype.onResult = function (button) {
            if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                console.warn("WARNING: ButtonListener contains a null reference to onResultFunction.");
            }
            else {
                this.onResultFunction(button);
            }
        };
        /**
           @method
           Data received with warning
           @param {Adaptive.Button} button button  pressed
           @param {Adaptive.IButtonListenerWarning} warning warning happened
           @since v2.0
        */
        ButtonListener.prototype.onWarning = function (button, warning) {
            if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                console.warn("WARNING: ButtonListener contains a null reference to onWarningFunction.");
            }
            else {
                this.onWarningFunction(button, warning);
            }
        };
        return ButtonListener;
    })(Adaptive.BaseListener);
    Adaptive.ButtonListener = ButtonListener;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=ButtonListener.js.map