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
///<reference path="BaseUIBridge.ts"/>
///<reference path="CommonUtil.ts"/>
///<reference path="IAdaptiveRPGroup.ts"/>
///<reference path="IBaseUI.ts"/>
///<reference path="IBrowser.ts"/>
var Adaptive;
(function (Adaptive) {
    /**
       @class Adaptive.BrowserBridge
       @extends Adaptive.BaseUIBridge
       Interface for Managing the browser operations

       @author Francisco Javier Martin Bueno
       @since v2.0
    */
    var BrowserBridge = (function (_super) {
        __extends(BrowserBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function BrowserBridge() {
            _super.call(this);
        }
        /**
           @method
           Method for opening a URL like a link in the native default browser

           @param {string} url url Url to open
           @return {boolean} The result of the operation
           @since v2.0
        */
        BrowserBridge.prototype.openExtenalBrowser = function (url) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(url));
            var apiRequest = new Adaptive.APIRequest("IBrowser", "openExtenalBrowser", arParams, -1);
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
           Method for opening a browser embedded into the application

           @param {string} url url            Url to open
           @param {string} title title          Title of the Navigation bar
           @param {string} backButtonText backButtonText Title of the Back button bar
           @return {boolean} The result of the operation
           @since v2.0
        */
        BrowserBridge.prototype.openInternalBrowser = function (url, title, backButtonText) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(url));
            arParams.push(JSON.stringify(title));
            arParams.push(JSON.stringify(backButtonText));
            var apiRequest = new Adaptive.APIRequest("IBrowser", "openInternalBrowser", arParams, -1);
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
           Method for opening a browser embedded into the application in a modal window

           @param {string} url url            Url to open
           @param {string} title title          Title of the Navigation bar
           @param {string} backButtonText backButtonText Title of the Back button bar
           @return {boolean} The result of the operation
           @since v2.0
        */
        BrowserBridge.prototype.openInternalBrowserModal = function (url, title, backButtonText) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(url));
            arParams.push(JSON.stringify(title));
            arParams.push(JSON.stringify(backButtonText));
            var apiRequest = new Adaptive.APIRequest("IBrowser", "openInternalBrowserModal", arParams, -1);
            var apiResponse = Adaptive.postRequest(apiRequest);
            // Prepare response.
            var response = false;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = JSON.parse(apiResponse.getResponse());
            }
            return response;
        };
        return BrowserBridge;
    })(Adaptive.BaseUIBridge);
    Adaptive.BrowserBridge = BrowserBridge;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=BrowserBridge.js.map