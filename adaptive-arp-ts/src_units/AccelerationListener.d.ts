/// <reference path="Acceleration.d.ts" />
/// <reference path="BaseListener.d.ts" />
/// <reference path="CommonUtil.d.ts" />
/// <reference path="IAccelerationListener.d.ts" />
/// <reference path="IAccelerationListenerError.d.ts" />
/// <reference path="IAccelerationListenerWarning.d.ts" />
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
declare module Adaptive {
    /**
       Interface defines the response methods of the acceleration operations
       Auto-generated implementation of IAccelerationListener specification.
    */
    /**
       @property {Adaptive.Dictionary} registeredAccelerationListener
       @member Adaptive
       @private
       AccelerationListener control dictionary.
    */
    var registeredAccelerationListener: Dictionary<IAccelerationListener>;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IAccelerationListenerError} error
    */
    function handleAccelerationListenerError(id: number, error: IAccelerationListenerError): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Acceleration} acceleration
    */
    function handleAccelerationListenerResult(id: number, acceleration: Acceleration): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Acceleration} acceleration
       @param {Adaptive.IAccelerationListenerWarning} warning
    */
    function handleAccelerationListenerWarning(id: number, acceleration: Acceleration, warning: IAccelerationListenerWarning): void;
    /**
       @class Adaptive.AccelerationListener
       @extends Adaptive.BaseListener
    */
    class AccelerationListener extends BaseListener implements IAccelerationListener {
        /**
           @private
           @property
        */
        onErrorFunction: (error: IAccelerationListenerError) => void;
        /**
           @private
           @property
        */
        onResultFunction: (acceleration: Acceleration) => void;
        /**
           @private
           @property
        */
        onWarningFunction: (acceleration: Acceleration, warning: IAccelerationListenerWarning) => void;
        /**
           @method constructor
           Constructor with anonymous handler functions for listener.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IAccelerationListenerError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.Acceleration
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.Acceleration, Adaptive.IAccelerationListenerWarning
        */
        constructor(onErrorFunction: (error: IAccelerationListenerError) => void, onResultFunction: (acceleration: Acceleration) => void, onWarningFunction: (acceleration: Acceleration, warning: IAccelerationListenerWarning) => void);
        /**
           @method
           No data received - error condition, not authorized or hardware not available. This will be reported once for the
listener and subsequently, the listener will be deactivated and removed from the internal list of listeners.
           @param {Adaptive.IAccelerationListenerError} error error Error fired
           @since v2.0
        */
        onError(error: IAccelerationListenerError): void;
        /**
           @method
           Correct data received.
           @param {Adaptive.Acceleration} acceleration acceleration Acceleration received
           @since v2.0
        */
        onResult(acceleration: Acceleration): void;
        /**
           @method
           Data received with warning - ie. Needs calibration.
           @param {Adaptive.Acceleration} acceleration acceleration Acceleration received
           @param {Adaptive.IAccelerationListenerWarning} warning warning      Warning fired
           @since v2.0
        */
        onWarning(acceleration: Acceleration, warning: IAccelerationListenerWarning): void;
    }
}
