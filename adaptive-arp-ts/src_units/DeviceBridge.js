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
///<reference path="BaseSystemBridge.ts"/>
///<reference path="ButtonListener.ts"/>
///<reference path="CommonUtil.ts"/>
///<reference path="DeviceInfo.ts"/>
///<reference path="DeviceOrientationListener.ts"/>
///<reference path="IAdaptiveRPGroup.ts"/>
///<reference path="IBaseSystem.ts"/>
///<reference path="IButtonListener.ts"/>
///<reference path="ICapabilitiesOrientation.ts"/>
///<reference path="IDevice.ts"/>
///<reference path="IDeviceOrientationListener.ts"/>
///<reference path="Locale.ts"/>
var Adaptive;
(function (Adaptive) {
    /**
       @class Adaptive.DeviceBridge
       @extends Adaptive.BaseSystemBridge
       Interface for Managing the Device operations

       @author Francisco Javier Martin Bueno
       @since v2.0
    */
    var DeviceBridge = (function (_super) {
        __extends(DeviceBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function DeviceBridge() {
            _super.call(this);
        }
        /**
           @method
           Register a new listener that will receive button events.

           @param {Adaptive.ButtonListener} listener listener to be registered.
           @since v2.0
        */
        DeviceBridge.prototype.addButtonListener = function (listener) {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new Adaptive.APIRequest("IDevice", "addButtonListener", arParams, listener.getId());
            Adaptive.postRequestListener(apiRequest, listener, Adaptive.registeredButtonListener);
        };
        /**
           @method
           Add a listener to start receiving device orientation change events.

           @param {Adaptive.DeviceOrientationListener} listener listener Listener to add to receive orientation change events.
           @since v2.0.5
        */
        DeviceBridge.prototype.addDeviceOrientationListener = function (listener) {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new Adaptive.APIRequest("IDevice", "addDeviceOrientationListener", arParams, listener.getId());
            Adaptive.postRequestListener(apiRequest, listener, Adaptive.registeredDeviceOrientationListener);
        };
        /**
           @method
           Returns the device information for the current device executing the runtime.

           @return {Adaptive.DeviceInfo} DeviceInfo for the current device.
           @since v2.0
        */
        DeviceBridge.prototype.getDeviceInfo = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new Adaptive.APIRequest("IDevice", "getDeviceInfo", arParams, -1);
            var apiResponse = Adaptive.postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = Adaptive.DeviceInfo.toObject(JSON.parse(apiResponse.getResponse()));
            }
            return response;
        };
        /**
           @method
           Gets the current Locale for the device.

           @return {Adaptive.Locale} The current Locale information.
           @since v2.0
        */
        DeviceBridge.prototype.getLocaleCurrent = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new Adaptive.APIRequest("IDevice", "getLocaleCurrent", arParams, -1);
            var apiResponse = Adaptive.postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = Adaptive.Locale.toObject(JSON.parse(apiResponse.getResponse()));
            }
            return response;
        };
        /**
           @method
           Returns the current orientation of the device. Please note that this may be different from the orientation
of the display. For display orientation, use the IDisplay APIs.

           @return {Adaptive.ICapabilitiesOrientation} The current orientation of the device.
           @since v2.0.5
        */
        DeviceBridge.prototype.getOrientationCurrent = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new Adaptive.APIRequest("IDevice", "getOrientationCurrent", arParams, -1);
            var apiResponse = Adaptive.postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = Adaptive.ICapabilitiesOrientation.toObject(JSON.parse(apiResponse.getResponse()));
            }
            return response;
        };
        /**
           @method
           De-registers an existing listener from receiving button events.

           @param {Adaptive.ButtonListener} listener listener to be removed.
           @since v2.0
        */
        DeviceBridge.prototype.removeButtonListener = function (listener) {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new Adaptive.APIRequest("IDevice", "removeButtonListener", arParams, listener.getId());
            Adaptive.postRequestListener(apiRequest, listener, Adaptive.registeredButtonListener);
        };
        /**
           @method
           Removed all existing listeners from receiving button events.

           @since v2.0
        */
        DeviceBridge.prototype.removeButtonListeners = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new Adaptive.APIRequest("IDevice", "removeButtonListeners", arParams, -1);
            Adaptive.postRequestListener(apiRequest, null, Adaptive.registeredButtonListener);
        };
        /**
           @method
           Remove a listener to stop receiving device orientation change events.

           @param {Adaptive.DeviceOrientationListener} listener listener Listener to remove from receiving orientation change events.
           @since v2.0.5
        */
        DeviceBridge.prototype.removeDeviceOrientationListener = function (listener) {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new Adaptive.APIRequest("IDevice", "removeDeviceOrientationListener", arParams, listener.getId());
            Adaptive.postRequestListener(apiRequest, listener, Adaptive.registeredDeviceOrientationListener);
        };
        /**
           @method
           Remove all listeners receiving device orientation events.

           @since v2.0.5
        */
        DeviceBridge.prototype.removeDeviceOrientationListeners = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new Adaptive.APIRequest("IDevice", "removeDeviceOrientationListeners", arParams, -1);
            Adaptive.postRequestListener(apiRequest, null, Adaptive.registeredDeviceOrientationListener);
        };
        return DeviceBridge;
    })(Adaptive.BaseSystemBridge);
    Adaptive.DeviceBridge = DeviceBridge;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=DeviceBridge.js.map