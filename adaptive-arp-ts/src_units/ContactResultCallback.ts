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
///<reference path="Contact.ts"/>
///<reference path="IContactResultCallback.ts"/>
///<reference path="IContactResultCallbackError.ts"/>
///<reference path="IContactResultCallbackWarning.ts"/>

module Adaptive {

     /**
        Interface for Managing the Contact operations
        Auto-generated implementation of IContactResultCallback specification.
     */

     /**
        @property {Adaptive.Dictionary} registeredContactResultCallback
        @member Adaptive
        @private
        ContactResultCallback control dictionary.
     */
     export var registeredContactResultCallback = new Dictionary<IContactResultCallback>([]);


        // ContactResultCallback global listener handlers.

     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.IContactResultCallbackError} error
     */
     export function handleContactResultCallbackError(id : number, error : IContactResultCallbackError) : void {
          var callback : IContactResultCallback = registeredContactResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredContactResultCallback dictionary.");
          } else {
               registeredContactResultCallback.remove(""+id);
               callback.onError(error);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.Contact[]} contacts
     */
     export function handleContactResultCallbackResult(id : number, contacts : Array<Contact>) : void {
          var callback : IContactResultCallback = registeredContactResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredContactResultCallback dictionary.");
          } else {
               registeredContactResultCallback.remove(""+id);
               callback.onResult(contacts);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.Contact[]} contacts
        @param {Adaptive.IContactResultCallbackWarning} warning
     */
     export function handleContactResultCallbackWarning(id : number, contacts : Array<Contact>, warning : IContactResultCallbackWarning) : void {
          var callback : IContactResultCallback = registeredContactResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredContactResultCallback dictionary.");
          } else {
               registeredContactResultCallback.remove(""+id);
               callback.onWarning(contacts, warning);
          }
     }


     /**
        @class Adaptive.ContactResultCallback
        @extends Adaptive.BaseCallback
     */
     export class ContactResultCallback extends BaseCallback implements IContactResultCallback {

          /**
             @private
             @property
          */
          onErrorFunction : (error : IContactResultCallbackError) => void;
          /**
             @private
             @property
          */
          onResultFunction : (contacts : Array<Contact>) => void;
          /**
             @private
             @property
          */
          onWarningFunction : (contacts : Array<Contact>, warning : IContactResultCallbackWarning) => void;

          /**
             @method constructor
             Constructor with anonymous handler functions for callback.

             @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IContactResultCallbackError
             @param {Function} onResultFunction Function receiving parameters of type: Adaptive.Contact[]
             @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.Contact[], Adaptive.IContactResultCallbackWarning
          */
          constructor(onErrorFunction : (error : IContactResultCallbackError) => void, onResultFunction : (contacts : Array<Contact>) => void, onWarningFunction : (contacts : Array<Contact>, warning : IContactResultCallbackWarning) => void) {
               super(++registeredCounter);
               if (onErrorFunction == null) {
                    console.error("ERROR: ContactResultCallback onErrorFunction is not defined.");
               } else {
                    this.onErrorFunction = onErrorFunction;
               }
               if (onResultFunction == null) {
                    console.error("ERROR: ContactResultCallback onResultFunction is not defined.");
               } else {
                    this.onResultFunction = onResultFunction;
               }
               if (onWarningFunction == null) {
                    console.error("ERROR: ContactResultCallback onWarningFunction is not defined.");
               } else {
                    this.onWarningFunction = onWarningFunction;
               }
          }

          /**
             @method
             This method is called on Error
             @param {Adaptive.IContactResultCallbackError} error error returned by the platform
             @since v2.0
          */
          public onError(error : IContactResultCallbackError) : void {
               if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                    console.warn("WARNING: ContactResultCallback contains a null reference to onErrorFunction.");
               } else {
                    this.onErrorFunction(error);
               }
          }

          /**
             @method
             This method is called on Result
             @param {Adaptive.Contact[]} contacts contacts returned by the platform
             @since v2.0
          */
          public onResult(contacts : Array<Contact>) : void {
               if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                    console.warn("WARNING: ContactResultCallback contains a null reference to onResultFunction.");
               } else {
                    this.onResultFunction(contacts);
               }
          }

          /**
             @method
             This method is called on Warning
             @param {Adaptive.Contact[]} contacts contacts returned by the platform
             @param {Adaptive.IContactResultCallbackWarning} warning warning  returned by the platform
             @since v2.0
          */
          public onWarning(contacts : Array<Contact>, warning : IContactResultCallbackWarning) : void {
               if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                    console.warn("WARNING: ContactResultCallback contains a null reference to onWarningFunction.");
               } else {
                    this.onWarningFunction(contacts, warning);
               }
          }

     }
}
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
