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
///<reference path="IGlobalization.ts"/>
///<reference path="KeyPair.ts"/>
///<reference path="Locale.ts"/>
var Adaptive;
(function (Adaptive) {
    /**
       @class Adaptive.GlobalizationBridge
       @extends Adaptive.BaseApplicationBridge
       Interface for Managing the Globalization results

       @author Francisco Javier Martin Bueno
       @since v2.0
    */
    var GlobalizationBridge = (function (_super) {
        __extends(GlobalizationBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function GlobalizationBridge() {
            _super.call(this);
        }
        /**
           @method
           Returns the default locale of the application defined in the configuration file

           @return {Adaptive.Locale} Default Locale of the application
           @since v2.0
        */
        GlobalizationBridge.prototype.getDefaultLocale = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new Adaptive.APIRequest("IGlobalization", "getDefaultLocale", arParams, -1);
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
           List of supported locales for the application defined in the configuration file

           @return {Adaptive.Locale[]} List of locales
           @since v2.0
        */
        GlobalizationBridge.prototype.getLocaleSupportedDescriptors = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new Adaptive.APIRequest("IGlobalization", "getLocaleSupportedDescriptors", arParams, -1);
            var apiResponse = Adaptive.postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = new Array();
                var responseArray = JSON.parse(apiResponse.getResponse());
                for (var i = 0; i < responseArray.length; i++) {
                    response.push(Adaptive.Locale.toObject(responseArray[i]));
                }
            }
            return response;
        };
        /**
           @method
           Gets the text/message corresponding to the given key and locale.

           @param {string} key key    to match text
           @param {Adaptive.Locale} locale locale The locale object to get localized message, or the locale desciptor ("language" or "language-country" two-letters ISO codes.
           @return {string} Localized text.
           @since v2.0
        */
        GlobalizationBridge.prototype.getResourceLiteral = function (key, locale) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(key));
            arParams.push(JSON.stringify(locale));
            var apiRequest = new Adaptive.APIRequest("IGlobalization", "getResourceLiteral", arParams, -1);
            var apiResponse = Adaptive.postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = apiResponse.getResponse();
            }
            return response;
        };
        /**
           @method
           Gets the full application configured literals (key/message pairs) corresponding to the given locale.

           @param {Adaptive.Locale} locale locale The locale object to get localized message, or the locale desciptor ("language" or "language-country" two-letters ISO codes.
           @return {Adaptive.KeyPair[]} Localized texts in the form of an object.
           @since v2.0
        */
        GlobalizationBridge.prototype.getResourceLiterals = function (locale) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(locale));
            var apiRequest = new Adaptive.APIRequest("IGlobalization", "getResourceLiterals", arParams, -1);
            var apiResponse = Adaptive.postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = new Array();
                var responseArray = JSON.parse(apiResponse.getResponse());
                for (var i = 0; i < responseArray.length; i++) {
                    response.push(Adaptive.KeyPair.toObject(responseArray[i]));
                }
            }
            return response;
        };
        return GlobalizationBridge;
    })(Adaptive.BaseApplicationBridge);
    Adaptive.GlobalizationBridge = GlobalizationBridge;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=GlobalizationBridge.js.map