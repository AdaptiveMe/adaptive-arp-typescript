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

///<reference path="BaseCallback.ts"/>
///<reference path="CommonUtil.ts"/>
///<reference path="IMessagingCallback.ts"/>
///<reference path="IMessagingCallbackError.ts"/>
///<reference path="IMessagingCallbackWarning.ts"/>

module Adaptive {

     /**
        Interface for Managing the Messaging responses
        Auto-generated implementation of IMessagingCallback specification.
     */

     /**
        @property {Adaptive.Dictionary} registeredMessagingCallback
        @member Adaptive
        @private
        MessagingCallback control dictionary.
     */
     export var registeredMessagingCallback = new Dictionary<IMessagingCallback>([]);


        // MessagingCallback global listener handlers.

     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.IMessagingCallbackError} error
     */
     export function handleMessagingCallbackError(id : number, error : IMessagingCallbackError) : void {
          var callback : IMessagingCallback = registeredMessagingCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredMessagingCallback dictionary.");
          } else {
               registeredMessagingCallback.remove(""+id);
               callback.onError(error);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {boolean} success
     */
     export function handleMessagingCallbackResult(id : number, success : boolean) : void {
          var callback : IMessagingCallback = registeredMessagingCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredMessagingCallback dictionary.");
          } else {
               registeredMessagingCallback.remove(""+id);
               callback.onResult(success);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {boolean} success
        @param {Adaptive.IMessagingCallbackWarning} warning
     */
     export function handleMessagingCallbackWarning(id : number, success : boolean, warning : IMessagingCallbackWarning) : void {
          var callback : IMessagingCallback = registeredMessagingCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredMessagingCallback dictionary.");
          } else {
               registeredMessagingCallback.remove(""+id);
               callback.onWarning(success, warning);
          }
     }


     /**
        @class Adaptive.MessagingCallback
        @extends Adaptive.BaseCallback
     */
     export class MessagingCallback extends BaseCallback implements IMessagingCallback {

          /**
             @private
             @property
          */
          onErrorFunction : (error : IMessagingCallbackError) => void;
          /**
             @private
             @property
          */
          onResultFunction : (success : boolean) => void;
          /**
             @private
             @property
          */
          onWarningFunction : (success : boolean, warning : IMessagingCallbackWarning) => void;

          /**
             @method constructor
             Constructor with anonymous handler functions for callback.

             @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IMessagingCallbackError
             @param {Function} onResultFunction Function receiving parameters of type: boolean
             @param {Function} onWarningFunction Function receiving parameters of type: boolean, Adaptive.IMessagingCallbackWarning
          */
          constructor(onErrorFunction : (error : IMessagingCallbackError) => void, onResultFunction : (success : boolean) => void, onWarningFunction : (success : boolean, warning : IMessagingCallbackWarning) => void) {
               super(++registeredCounter);
               if (onErrorFunction == null) {
                    console.error("ERROR: MessagingCallback onErrorFunction is not defined.");
               } else {
                    this.onErrorFunction = onErrorFunction;
               }
               if (onResultFunction == null) {
                    console.error("ERROR: MessagingCallback onResultFunction is not defined.");
               } else {
                    this.onResultFunction = onResultFunction;
               }
               if (onWarningFunction == null) {
                    console.error("ERROR: MessagingCallback onWarningFunction is not defined.");
               } else {
                    this.onWarningFunction = onWarningFunction;
               }
          }

          /**
             @method
             This method is called on Error
             @param {Adaptive.IMessagingCallbackError} error error returned by the platform
             @since v2.0
          */
          public onError(error : IMessagingCallbackError) : void {
               if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                    console.warn("WARNING: MessagingCallback contains a null reference to onErrorFunction.");
               } else {
                    this.onErrorFunction(error);
               }
          }

          /**
             @method
             This method is called on Result
             @param {boolean} success success true if sent;false otherwise
             @since v2.0
          */
          public onResult(success : boolean) : void {
               if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                    console.warn("WARNING: MessagingCallback contains a null reference to onResultFunction.");
               } else {
                    this.onResultFunction(success);
               }
          }

          /**
             @method
             This method is called on Warning
             @param {boolean} success success true if sent;false otherwise
             @param {Adaptive.IMessagingCallbackWarning} warning warning returned by the platform
             @since v2.0
          */
          public onWarning(success : boolean, warning : IMessagingCallbackWarning) : void {
               if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                    console.warn("WARNING: MessagingCallback contains a null reference to onWarningFunction.");
               } else {
                    this.onWarningFunction(success, warning);
               }
          }

     }
}
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
