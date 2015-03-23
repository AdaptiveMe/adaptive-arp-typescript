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

///<reference path="Acceleration.ts"/>
///<reference path="IAccelerationListenerError.ts"/>
///<reference path="IAccelerationListenerWarning.ts"/>
///<reference path="IAdaptiveRPGroup.ts"/>
///<reference path="IBaseListener.ts"/>

module Adaptive {

     /**
        Interface defines the response methods of the acceleration operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IAccelerationListener
     */
     export interface IAccelerationListener extends IBaseListener {
          /**
             @method
             No data received - error condition, not authorized or hardware not available. This will be reported once for the
listener and subsequently, the listener will be deactivated and removed from the internal list of listeners.
             @param error Error fired
             @since v2.0
          */
          onError(error:IAccelerationListenerError);
          /**
             @method
             Correct data received.
             @param acceleration Acceleration received
             @since v2.0
          */
          onResult(acceleration:Acceleration);
          /**
             @method
             Data received with warning - ie. Needs calibration.
             @param acceleration Acceleration received
             @param warning      Warning fired
             @since v2.0
          */
          onWarning(acceleration:Acceleration, warning:IAccelerationListenerWarning);
     }
}

/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
