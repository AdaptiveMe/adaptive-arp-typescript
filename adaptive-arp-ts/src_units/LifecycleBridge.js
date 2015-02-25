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
///<reference path="BaseApplicationBridge.ts"/>
///<reference path="CommonUtil.ts"/>
///<reference path="IAdaptiveRPGroup.ts"/>
///<reference path="IBaseApplication.ts"/>
///<reference path="ILifecycle.ts"/>
///<reference path="ILifecycleListener.ts"/>
///<reference path="LifecycleListener.ts"/>
var Adaptive;
(function (Adaptive) {
    /**
       @class Adaptive.LifecycleBridge
       @extends Adaptive.BaseApplicationBridge
       Interface for Managing the Lifecycle listeners

       @author Carlos Lozano Diez
       @since v2.0
    */
    var LifecycleBridge = (function (_super) {
        __extends(LifecycleBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function LifecycleBridge() {
            _super.call(this);
        }
        /**
           @method
           Add the listener for the lifecycle of the app

           @param {Adaptive.LifecycleListener} listener listener Lifecycle listener
           @since v2.0
        */
        LifecycleBridge.prototype.addLifecycleListener = function (listener) {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new Adaptive.APIRequest("ILifecycle", "addLifecycleListener", arParams, listener.getId());
            Adaptive.postRequestListener(apiRequest, listener, Adaptive.registeredLifecycleListener);
        };
        /**
           @method
           Whether the application is in background or not

           @return {boolean} true if the application is in background;false otherwise
           @since v2.0
        */
        LifecycleBridge.prototype.isBackground = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new Adaptive.APIRequest("ILifecycle", "isBackground", arParams, -1);
            var apiResponse = Adaptive.postRequest(apiRequest);
            // Prepare response.
            var response = false;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = JSON.parse(apiResponse.getResponse());
            }
            return response;
        };
        /**
           @method
           Un-registers an existing listener from receiving lifecycle events.

           @param {Adaptive.LifecycleListener} listener listener Lifecycle listener
           @since v2.0
        */
        LifecycleBridge.prototype.removeLifecycleListener = function (listener) {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new Adaptive.APIRequest("ILifecycle", "removeLifecycleListener", arParams, listener.getId());
            Adaptive.postRequestListener(apiRequest, listener, Adaptive.registeredLifecycleListener);
        };
        /**
           @method
           Removes all existing listeners from receiving lifecycle events.

           @since v2.0
        */
        LifecycleBridge.prototype.removeLifecycleListeners = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new Adaptive.APIRequest("ILifecycle", "removeLifecycleListeners", arParams, -1);
            Adaptive.postRequestListener(apiRequest, null, Adaptive.registeredLifecycleListener);
        };
        return LifecycleBridge;
    })(Adaptive.BaseApplicationBridge);
    Adaptive.LifecycleBridge = LifecycleBridge;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=LifecycleBridge.js.map