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

///<reference path="APIRequest.ts"/>
///<reference path="APIResponse.ts"/>
///<reference path="BaseApplicationBridge.ts"/>
///<reference path="CommonUtil.ts"/>
///<reference path="IAdaptiveRPGroup.ts"/>
///<reference path="IBaseApplication.ts"/>
///<reference path="IGlobalization.ts"/>
///<reference path="KeyPair.ts"/>
///<reference path="Locale.ts"/>
module Adaptive {

     /**
        @class Adaptive.GlobalizationBridge
        @extends Adaptive.BaseApplicationBridge
        Interface for Managing the Globalization results

        @author Francisco Javier Martin Bueno
        @since v2.0
     */
     export class GlobalizationBridge extends BaseApplicationBridge implements IGlobalization {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }

          /**
             @method
             Returns the default locale of the application defined in the configuration file

             @return {Adaptive.Locale} Default Locale of the application
             @since v2.0
          */
          getDefaultLocale() : Locale {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IGlobalization","getDefaultLocale",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : Locale = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = Locale.toObject(JSON.parse(apiResponse.getResponse()));
               }
               return response;
          }

          /**
             @method
             List of supported locales for the application defined in the configuration file

             @return {Adaptive.Locale[]} List of locales
             @since v2.0
          */
          getLocaleSupportedDescriptors() : Array<Locale> {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IGlobalization","getLocaleSupportedDescriptors",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : Array<Locale> = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = new Array<Locale>();
                    var responseArray : [any] = JSON.parse(apiResponse.getResponse());
                    for(var i = 0;i < responseArray.length; i++) {
                         response.push(Locale.toObject(responseArray[i]));
                    }
               }
               return response;
          }

          /**
             @method
             Gets the text/message corresponding to the given key and locale.

             @param {string} key key    to match text
             @param {Adaptive.Locale} locale locale The locale object to get localized message, or the locale desciptor ("language" or "language-country" two-letters ISO codes.
             @return {string} Localized text.
             @since v2.0
          */
          getResourceLiteral(key : string, locale : Locale) : string {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(key));
               arParams.push(JSON.stringify(locale));
               var apiRequest : APIRequest = new APIRequest("IGlobalization","getResourceLiteral",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : string = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = apiResponse.getResponse();
               }
               return response;
          }

          /**
             @method
             Gets the full application configured literals (key/message pairs) corresponding to the given locale.

             @param {Adaptive.Locale} locale locale The locale object to get localized message, or the locale desciptor ("language" or "language-country" two-letters ISO codes.
             @return {Adaptive.KeyPair[]} Localized texts in the form of an object.
             @since v2.0
          */
          getResourceLiterals(locale : Locale) : Array<KeyPair> {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(locale));
               var apiRequest : APIRequest = new APIRequest("IGlobalization","getResourceLiterals",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : Array<KeyPair> = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = new Array<KeyPair>();
                    var responseArray : [any] = JSON.parse(apiResponse.getResponse());
                    for(var i = 0;i < responseArray.length; i++) {
                         response.push(KeyPair.toObject(responseArray[i]));
                    }
               }
               return response;
          }
     }
}
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
