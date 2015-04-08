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

    * @version v2.2.8

-------------------------------------------| aut inveniam viam aut faciam |--------------------------------------------
*/

///<reference path="BaseListener.ts"/>
///<reference path="CommonUtil.ts"/>
///<reference path="INetworkStatusListener.ts"/>
///<reference path="INetworkStatusListenerError.ts"/>
///<reference path="INetworkStatusListenerWarning.ts"/>
///<reference path="NetworkEvent.ts"/>

module Adaptive {

     /**
        Interface for Managing the Network status listener networkEvents
        Auto-generated implementation of INetworkStatusListener specification.
     */

     /**
        @property {Adaptive.Dictionary} registeredNetworkStatusListener
        @member Adaptive
        @private
        NetworkStatusListener control dictionary.
     */
     export var registeredNetworkStatusListener = new Dictionary<INetworkStatusListener>([]);

        // NetworkStatusListener global listener handlers.

     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.INetworkStatusListenerError} error
     */
     export function handleNetworkStatusListenerError(id : number, error : INetworkStatusListenerError) : void {
          var listener : INetworkStatusListener = registeredNetworkStatusListener[""+id];
          if (typeof listener === 'undefined' || listener == null) {
               console.error("ERROR: No listener with id "+id+" registered in registeredNetworkStatusListener dictionary.");
          } else {
               listener.onError(error);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.NetworkEvent} networkEvent
     */
     export function handleNetworkStatusListenerResult(id : number, networkEvent : NetworkEvent) : void {
          var listener : INetworkStatusListener = registeredNetworkStatusListener[""+id];
          if (typeof listener === 'undefined' || listener == null) {
               console.error("ERROR: No listener with id "+id+" registered in registeredNetworkStatusListener dictionary.");
          } else {
               listener.onResult(networkEvent);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.NetworkEvent} networkEvent
        @param {Adaptive.INetworkStatusListenerWarning} warning
     */
     export function handleNetworkStatusListenerWarning(id : number, networkEvent : NetworkEvent, warning : INetworkStatusListenerWarning) : void {
          var listener : INetworkStatusListener = registeredNetworkStatusListener[""+id];
          if (typeof listener === 'undefined' || listener == null) {
               console.error("ERROR: No listener with id "+id+" registered in registeredNetworkStatusListener dictionary.");
          } else {
               listener.onWarning(networkEvent, warning);
          }
     }

     /**
        @class Adaptive.NetworkStatusListener
        @extends Adaptive.BaseListener
     */
     export class NetworkStatusListener extends BaseListener implements INetworkStatusListener {

          /**
             @private
             @property
          */
          onErrorFunction : (error : INetworkStatusListenerError) => void;
          /**
             @private
             @property
          */
          onResultFunction : (networkEvent : NetworkEvent) => void;
          /**
             @private
             @property
          */
          onWarningFunction : (networkEvent : NetworkEvent, warning : INetworkStatusListenerWarning) => void;

          /**
             @method constructor
             Constructor with anonymous handler functions for listener.

             @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.INetworkStatusListenerError
             @param {Function} onResultFunction Function receiving parameters of type: Adaptive.NetworkEvent
             @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.NetworkEvent, Adaptive.INetworkStatusListenerWarning
          */
          constructor(onErrorFunction : (error : INetworkStatusListenerError) => void, onResultFunction : (networkEvent : NetworkEvent) => void, onWarningFunction : (networkEvent : NetworkEvent, warning : INetworkStatusListenerWarning) => void) {
               super(++registeredCounter);
               if (onErrorFunction == null) {
                    console.error("ERROR: NetworkStatusListener onErrorFunction is not defined.");
               } else {
                    this.onErrorFunction = onErrorFunction;
               }
               if (onResultFunction == null) {
                    console.error("ERROR: NetworkStatusListener onResultFunction is not defined.");
               } else {
                    this.onResultFunction = onResultFunction;
               }
               if (onWarningFunction == null) {
                    console.error("ERROR: NetworkStatusListener onWarningFunction is not defined.");
               } else {
                    this.onWarningFunction = onWarningFunction;
               }
          }

          /**
             @method
             No data received - error condition, not authorized or hardware not available.
             @param {Adaptive.INetworkStatusListenerError} error error Type of error encountered during reading.
             @since v2.0
          */
          public onError(error : INetworkStatusListenerError) : void {
               if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                    console.warn("WARNING: NetworkStatusListener contains a null reference to onErrorFunction.");
               } else {
                    this.onErrorFunction(error);
               }
          }

          /**
             @method
             Called when network connection changes somehow.
             @param {Adaptive.NetworkEvent} networkEvent networkEvent Change to this network.
             @since v2.0
          */
          public onResult(networkEvent : NetworkEvent) : void {
               if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                    console.warn("WARNING: NetworkStatusListener contains a null reference to onResultFunction.");
               } else {
                    this.onResultFunction(networkEvent);
               }
          }

          /**
             @method
             Status received with warning
             @param {Adaptive.NetworkEvent} networkEvent networkEvent Change to this network.
             @param {Adaptive.INetworkStatusListenerWarning} warning warning Type of warning encountered during reading.
             @since v2.0
          */
          public onWarning(networkEvent : NetworkEvent, warning : INetworkStatusListenerWarning) : void {
               if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                    console.warn("WARNING: NetworkStatusListener contains a null reference to onWarningFunction.");
               } else {
                    this.onWarningFunction(networkEvent, warning);
               }
          }

     }
}
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
