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

///<reference path="BaseListener.ts"/>
///<reference path="CommonUtil.ts"/>
///<reference path="IDeviceOrientationListener.ts"/>
///<reference path="IDeviceOrientationListenerError.ts"/>
///<reference path="IDeviceOrientationListenerWarning.ts"/>
///<reference path="RotationEvent.ts"/>

module Adaptive {

     /**
        Interface for handling device orientation change events.
        Auto-generated implementation of IDeviceOrientationListener specification.
     */

     /**
        @property {Adaptive.Dictionary} registeredDeviceOrientationListener
        @member Adaptive
        @private
        DeviceOrientationListener control dictionary.
     */
     export var registeredDeviceOrientationListener = new Dictionary<IDeviceOrientationListener>([]);

        // DeviceOrientationListener global listener handlers.

     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.IDeviceOrientationListenerError} error
     */
     export function handleDeviceOrientationListenerError(id : number, error : IDeviceOrientationListenerError) : void {
          var listener : IDeviceOrientationListener = registeredDeviceOrientationListener[""+id];
          if (typeof listener === 'undefined' || listener == null) {
               console.error("ERROR: No listener with id "+id+" registered in registeredDeviceOrientationListener dictionary.");
          } else {
               listener.onError(error);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.RotationEvent} rotationEvent
     */
     export function handleDeviceOrientationListenerResult(id : number, rotationEvent : RotationEvent) : void {
          var listener : IDeviceOrientationListener = registeredDeviceOrientationListener[""+id];
          if (typeof listener === 'undefined' || listener == null) {
               console.error("ERROR: No listener with id "+id+" registered in registeredDeviceOrientationListener dictionary.");
          } else {
               listener.onResult(rotationEvent);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.RotationEvent} rotationEvent
        @param {Adaptive.IDeviceOrientationListenerWarning} warning
     */
     export function handleDeviceOrientationListenerWarning(id : number, rotationEvent : RotationEvent, warning : IDeviceOrientationListenerWarning) : void {
          var listener : IDeviceOrientationListener = registeredDeviceOrientationListener[""+id];
          if (typeof listener === 'undefined' || listener == null) {
               console.error("ERROR: No listener with id "+id+" registered in registeredDeviceOrientationListener dictionary.");
          } else {
               listener.onWarning(rotationEvent, warning);
          }
     }

     /**
        @class Adaptive.DeviceOrientationListener
        @extends Adaptive.BaseListener
     */
     export class DeviceOrientationListener extends BaseListener implements IDeviceOrientationListener {

          /**
             @private
             @property
          */
          onErrorFunction : (error : IDeviceOrientationListenerError) => void;
          /**
             @private
             @property
          */
          onResultFunction : (rotationEvent : RotationEvent) => void;
          /**
             @private
             @property
          */
          onWarningFunction : (rotationEvent : RotationEvent, warning : IDeviceOrientationListenerWarning) => void;

          /**
             @method constructor
             Constructor with anonymous handler functions for listener.

             @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IDeviceOrientationListenerError
             @param {Function} onResultFunction Function receiving parameters of type: Adaptive.RotationEvent
             @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.RotationEvent, Adaptive.IDeviceOrientationListenerWarning
          */
          constructor(onErrorFunction : (error : IDeviceOrientationListenerError) => void, onResultFunction : (rotationEvent : RotationEvent) => void, onWarningFunction : (rotationEvent : RotationEvent, warning : IDeviceOrientationListenerWarning) => void) {
               super(++registeredCounter);
               if (onErrorFunction == null) {
                    console.error("ERROR: DeviceOrientationListener onErrorFunction is not defined.");
               } else {
                    this.onErrorFunction = onErrorFunction;
               }
               if (onResultFunction == null) {
                    console.error("ERROR: DeviceOrientationListener onResultFunction is not defined.");
               } else {
                    this.onResultFunction = onResultFunction;
               }
               if (onWarningFunction == null) {
                    console.error("ERROR: DeviceOrientationListener onWarningFunction is not defined.");
               } else {
                    this.onWarningFunction = onWarningFunction;
               }
          }

          /**
             @method
             Although extremely unlikely, this event will be fired if something beyond the control of the
platform impedes the rotation of the device.
             @param {Adaptive.IDeviceOrientationListenerError} error error The error condition... generally unknown as it is unexpected!
             @since v2.0.5
          */
          public onError(error : IDeviceOrientationListenerError) : void {
               if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                    console.warn("WARNING: DeviceOrientationListener contains a null reference to onErrorFunction.");
               } else {
                    this.onErrorFunction(error);
               }
          }

          /**
             @method
             Event fired with the successful start and finish of a rotation.
             @param {Adaptive.RotationEvent} rotationEvent rotationEvent RotationEvent containing origin, destination and state of the event.
             @since v2.0.5
          */
          public onResult(rotationEvent : RotationEvent) : void {
               if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                    console.warn("WARNING: DeviceOrientationListener contains a null reference to onResultFunction.");
               } else {
                    this.onResultFunction(rotationEvent);
               }
          }

          /**
             @method
             Event fired with a warning when the rotation is aborted. In specific, this
event may be fired if the devices vetoes the rotation before rotation is completed.
             @param {Adaptive.RotationEvent} rotationEvent rotationEvent   RotationEvent containing origin, destination and state of the event.
             @param {Adaptive.IDeviceOrientationListenerWarning} warning warning Type of condition that aborted rotation execution.
             @since v2.0.5
          */
          public onWarning(rotationEvent : RotationEvent, warning : IDeviceOrientationListenerWarning) : void {
               if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                    console.warn("WARNING: DeviceOrientationListener contains a null reference to onWarningFunction.");
               } else {
                    this.onWarningFunction(rotationEvent, warning);
               }
          }

     }
}
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
