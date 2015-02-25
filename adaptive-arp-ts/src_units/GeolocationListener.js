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
///<reference path="Geolocation.ts"/>
///<reference path="IGeolocationListener.ts"/>
///<reference path="IGeolocationListenerError.ts"/>
///<reference path="IGeolocationListenerWarning.ts"/>
var Adaptive;
(function (Adaptive) {
    /**
       Interface for Managing the Geolocation results
       Auto-generated implementation of IGeolocationListener specification.
    */
    /**
       @property {Adaptive.Dictionary} registeredGeolocationListener
       @member Adaptive
       @private
       GeolocationListener control dictionary.
    */
    Adaptive.registeredGeolocationListener = new Adaptive.Dictionary([]);
    // GeolocationListener global listener handlers.
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IGeolocationListenerError} error
    */
    function handleGeolocationListenerError(id, error) {
        var listener = Adaptive.registeredGeolocationListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredGeolocationListener dictionary.");
        }
        else {
            listener.onError(error);
        }
    }
    Adaptive.handleGeolocationListenerError = handleGeolocationListenerError;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Geolocation} geolocation
    */
    function handleGeolocationListenerResult(id, geolocation) {
        var listener = Adaptive.registeredGeolocationListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredGeolocationListener dictionary.");
        }
        else {
            listener.onResult(geolocation);
        }
    }
    Adaptive.handleGeolocationListenerResult = handleGeolocationListenerResult;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Geolocation} geolocation
       @param {Adaptive.IGeolocationListenerWarning} warning
    */
    function handleGeolocationListenerWarning(id, geolocation, warning) {
        var listener = Adaptive.registeredGeolocationListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredGeolocationListener dictionary.");
        }
        else {
            listener.onWarning(geolocation, warning);
        }
    }
    Adaptive.handleGeolocationListenerWarning = handleGeolocationListenerWarning;
    /**
       @class Adaptive.GeolocationListener
       @extends Adaptive.BaseListener
    */
    var GeolocationListener = (function (_super) {
        __extends(GeolocationListener, _super);
        /**
           @method constructor
           Constructor with anonymous handler functions for listener.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IGeolocationListenerError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.Geolocation
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.Geolocation, Adaptive.IGeolocationListenerWarning
        */
        function GeolocationListener(onErrorFunction, onResultFunction, onWarningFunction) {
            _super.call(this, ++Adaptive.registeredCounter);
            if (onErrorFunction == null) {
                console.error("ERROR: GeolocationListener onErrorFunction is not defined.");
            }
            else {
                this.onErrorFunction = onErrorFunction;
            }
            if (onResultFunction == null) {
                console.error("ERROR: GeolocationListener onResultFunction is not defined.");
            }
            else {
                this.onResultFunction = onResultFunction;
            }
            if (onWarningFunction == null) {
                console.error("ERROR: GeolocationListener onWarningFunction is not defined.");
            }
            else {
                this.onWarningFunction = onWarningFunction;
            }
        }
        /**
           @method
           No data received - error condition, not authorized or hardware not available.
           @param {Adaptive.IGeolocationListenerError} error error Type of error encountered during reading.
           @since v2.0
        */
        GeolocationListener.prototype.onError = function (error) {
            if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                console.warn("WARNING: GeolocationListener contains a null reference to onErrorFunction.");
            }
            else {
                this.onErrorFunction(error);
            }
        };
        /**
           @method
           Correct data received.
           @param {Adaptive.Geolocation} geolocation geolocation Geolocation Bean
           @since v2.0
        */
        GeolocationListener.prototype.onResult = function (geolocation) {
            if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                console.warn("WARNING: GeolocationListener contains a null reference to onResultFunction.");
            }
            else {
                this.onResultFunction(geolocation);
            }
        };
        /**
           @method
           Data received with warning - ie. HighDoP
           @param {Adaptive.Geolocation} geolocation geolocation Geolocation Bean
           @param {Adaptive.IGeolocationListenerWarning} warning warning     Type of warning encountered during reading.
           @since v2.0
        */
        GeolocationListener.prototype.onWarning = function (geolocation, warning) {
            if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                console.warn("WARNING: GeolocationListener contains a null reference to onWarningFunction.");
            }
            else {
                this.onWarningFunction(geolocation, warning);
            }
        };
        return GeolocationListener;
    })(Adaptive.BaseListener);
    Adaptive.GeolocationListener = GeolocationListener;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=GeolocationListener.js.map