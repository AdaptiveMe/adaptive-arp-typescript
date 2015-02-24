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
///<reference path="BaseSystemBridge.ts"/>
///<reference path="CommonUtil.ts"/>
///<reference path="DisplayOrientationListener.ts"/>
///<reference path="IAdaptiveRPGroup.ts"/>
///<reference path="IBaseSystem.ts"/>
///<reference path="ICapabilitiesOrientation.ts"/>
///<reference path="IDisplay.ts"/>
///<reference path="IDisplayOrientationListener.ts"/>
module Adaptive {

     /**
        @class Adaptive.DisplayBridge
        @extends Adaptive.BaseSystemBridge
        Interface for Managing the Display operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class DisplayBridge extends BaseSystemBridge implements IDisplay {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }

          /**
             @method
             Add a listener to start receiving display orientation change events.

             @param {Adaptive.DisplayOrientationListener} listener listener Listener to add to receive orientation change events.
             @since v2.0.5
          */
          addDisplayOrientationListener(listener : IDisplayOrientationListener) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IDisplay","addDisplayOrientationListener",arParams, listener.getId());
               postRequestListener(apiRequest, listener, registeredDisplayOrientationListener);
          }

          /**
             @method
             Returns the current orientation of the display. Please note that this may be different from the orientation
of the device. For device orientation, use the IDevice APIs.

             @return {Adaptive.ICapabilitiesOrientation} The current orientation of the display.
             @since v2.0.5
          */
          getOrientationCurrent() : ICapabilitiesOrientation {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IDisplay","getOrientationCurrent",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : ICapabilitiesOrientation = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = ICapabilitiesOrientation.toObject(JSON.parse(apiResponse.getResponse()));
               }
               return response;
          }

          /**
             @method
             Remove a listener to stop receiving display orientation change events.

             @param {Adaptive.DisplayOrientationListener} listener listener Listener to remove from receiving orientation change events.
             @since v2.0.5
          */
          removeDisplayOrientationListener(listener : IDisplayOrientationListener) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IDisplay","removeDisplayOrientationListener",arParams, listener.getId());
               postRequestListener(apiRequest, listener, registeredDisplayOrientationListener);
          }

          /**
             @method
             Remove all listeners receiving display orientation events.

             @since v2.0.5
          */
          removeDisplayOrientationListeners() : void {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IDisplay","removeDisplayOrientationListeners",arParams, -1);
               postRequestListener(apiRequest, null, registeredDisplayOrientationListener);
          }
     }
}
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
