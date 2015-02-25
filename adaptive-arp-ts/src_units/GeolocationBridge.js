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
///<reference path="APIRequest.ts"/>
///<reference path="APIResponse.ts"/>
///<reference path="BaseSensorBridge.ts"/>
///<reference path="CommonUtil.ts"/>
///<reference path="GeolocationListener.ts"/>
///<reference path="IAdaptiveRPGroup.ts"/>
///<reference path="IBaseSensor.ts"/>
///<reference path="IGeolocation.ts"/>
///<reference path="IGeolocationListener.ts"/>
var Adaptive;
(function (Adaptive) {
    /**
       @class Adaptive.GeolocationBridge
       @extends Adaptive.BaseSensorBridge
       Interface for Managing the Geolocation operations

       @author Francisco Javier Martin Bueno
       @since v2.0
    */
    var GeolocationBridge = (function (_super) {
        __extends(GeolocationBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function GeolocationBridge() {
            _super.call(this);
        }
        /**
           @method
           Register a new listener that will receive geolocation events.

           @param {Adaptive.GeolocationListener} listener listener to be registered.
           @since v2.0
        */
        GeolocationBridge.prototype.addGeolocationListener = function (listener) {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new Adaptive.APIRequest("IGeolocation", "addGeolocationListener", arParams, listener.getId());
            Adaptive.postRequestListener(apiRequest, listener, Adaptive.registeredGeolocationListener);
        };
        /**
           @method
           De-registers an existing listener from receiving geolocation events.

           @param {Adaptive.GeolocationListener} listener listener to be registered.
           @since v2.0
        */
        GeolocationBridge.prototype.removeGeolocationListener = function (listener) {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new Adaptive.APIRequest("IGeolocation", "removeGeolocationListener", arParams, listener.getId());
            Adaptive.postRequestListener(apiRequest, listener, Adaptive.registeredGeolocationListener);
        };
        /**
           @method
           Removed all existing listeners from receiving geolocation events.

           @since v2.0
        */
        GeolocationBridge.prototype.removeGeolocationListeners = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new Adaptive.APIRequest("IGeolocation", "removeGeolocationListeners", arParams, -1);
            Adaptive.postRequestListener(apiRequest, null, Adaptive.registeredGeolocationListener);
        };
        return GeolocationBridge;
    })(Adaptive.BaseSensorBridge);
    Adaptive.GeolocationBridge = GeolocationBridge;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=GeolocationBridge.js.map