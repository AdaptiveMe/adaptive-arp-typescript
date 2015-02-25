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
///<reference path="BaseCommunicationBridge.ts"/>
///<reference path="CommonUtil.ts"/>
///<reference path="IAdaptiveRPGroup.ts"/>
///<reference path="IBaseCommunication.ts"/>
///<reference path="INetworkStatus.ts"/>
///<reference path="INetworkStatusListener.ts"/>
///<reference path="NetworkStatusListener.ts"/>
var Adaptive;
(function (Adaptive) {
    /**
       @class Adaptive.NetworkStatusBridge
       @extends Adaptive.BaseCommunicationBridge
       Interface for Managing the Network status

       @author Carlos Lozano Diez
       @since v2.0
    */
    var NetworkStatusBridge = (function (_super) {
        __extends(NetworkStatusBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function NetworkStatusBridge() {
            _super.call(this);
        }
        /**
           @method
           Add the listener for network status changes of the app

           @param {Adaptive.NetworkStatusListener} listener listener Listener with the result
           @since v2.0
        */
        NetworkStatusBridge.prototype.addNetworkStatusListener = function (listener) {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new Adaptive.APIRequest("INetworkStatus", "addNetworkStatusListener", arParams, listener.getId());
            Adaptive.postRequestListener(apiRequest, listener, Adaptive.registeredNetworkStatusListener);
        };
        /**
           @method
           Un-registers an existing listener from receiving network status events.

           @param {Adaptive.NetworkStatusListener} listener listener Listener with the result
           @since v2.0
        */
        NetworkStatusBridge.prototype.removeNetworkStatusListener = function (listener) {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new Adaptive.APIRequest("INetworkStatus", "removeNetworkStatusListener", arParams, listener.getId());
            Adaptive.postRequestListener(apiRequest, listener, Adaptive.registeredNetworkStatusListener);
        };
        /**
           @method
           Removes all existing listeners from receiving network status events.

           @since v2.0
        */
        NetworkStatusBridge.prototype.removeNetworkStatusListeners = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new Adaptive.APIRequest("INetworkStatus", "removeNetworkStatusListeners", arParams, -1);
            Adaptive.postRequestListener(apiRequest, null, Adaptive.registeredNetworkStatusListener);
        };
        return NetworkStatusBridge;
    })(Adaptive.BaseCommunicationBridge);
    Adaptive.NetworkStatusBridge = NetworkStatusBridge;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=NetworkStatusBridge.js.map