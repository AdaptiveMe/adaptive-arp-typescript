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
///<reference path="IContactPhotoResultCallback.ts"/>
///<reference path="IContactPhotoResultCallbackError.ts"/>
///<reference path="IContactPhotoResultCallbackWarning.ts"/>

module Adaptive {

     /**
        Interface for Managing the Contact operations
        Auto-generated implementation of IContactPhotoResultCallback specification.
     */

     /**
        @property {Adaptive.Dictionary} registeredContactPhotoResultCallback
        @member Adaptive
        @private
        ContactPhotoResultCallback control dictionary.
     */
     export var registeredContactPhotoResultCallback = new Dictionary<IContactPhotoResultCallback>([]);


        // ContactPhotoResultCallback global listener handlers.

     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.IContactPhotoResultCallbackError} error
     */
     export function handleContactPhotoResultCallbackError(id : number, error : IContactPhotoResultCallbackError) : void {
          var callback : IContactPhotoResultCallback = registeredContactPhotoResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredContactPhotoResultCallback dictionary.");
          } else {
               registeredContactPhotoResultCallback.remove(""+id);
               callback.onError(error);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {number[]} contactPhoto
     */
     export function handleContactPhotoResultCallbackResult(id : number, contactPhoto : Array<number>) : void {
          var callback : IContactPhotoResultCallback = registeredContactPhotoResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredContactPhotoResultCallback dictionary.");
          } else {
               registeredContactPhotoResultCallback.remove(""+id);
               callback.onResult(contactPhoto);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {number[]} contactPhoto
        @param {Adaptive.IContactPhotoResultCallbackWarning} warning
     */
     export function handleContactPhotoResultCallbackWarning(id : number, contactPhoto : Array<number>, warning : IContactPhotoResultCallbackWarning) : void {
          var callback : IContactPhotoResultCallback = registeredContactPhotoResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredContactPhotoResultCallback dictionary.");
          } else {
               registeredContactPhotoResultCallback.remove(""+id);
               callback.onWarning(contactPhoto, warning);
          }
     }


     /**
        @class Adaptive.ContactPhotoResultCallback
        @extends Adaptive.BaseCallback
     */
     export class ContactPhotoResultCallback extends BaseCallback implements IContactPhotoResultCallback {

          /**
             @private
             @property
          */
          onErrorFunction : (error : IContactPhotoResultCallbackError) => void;
          /**
             @private
             @property
          */
          onResultFunction : (contactPhoto : Array<number>) => void;
          /**
             @private
             @property
          */
          onWarningFunction : (contactPhoto : Array<number>, warning : IContactPhotoResultCallbackWarning) => void;

          /**
             @method constructor
             Constructor with anonymous handler functions for callback.

             @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IContactPhotoResultCallbackError
             @param {Function} onResultFunction Function receiving parameters of type: number[]
             @param {Function} onWarningFunction Function receiving parameters of type: number[], Adaptive.IContactPhotoResultCallbackWarning
          */
          constructor(onErrorFunction : (error : IContactPhotoResultCallbackError) => void, onResultFunction : (contactPhoto : Array<number>) => void, onWarningFunction : (contactPhoto : Array<number>, warning : IContactPhotoResultCallbackWarning) => void) {
               super(++registeredCounter);
               if (onErrorFunction == null) {
                    console.error("ERROR: ContactPhotoResultCallback onErrorFunction is not defined.");
               } else {
                    this.onErrorFunction = onErrorFunction;
               }
               if (onResultFunction == null) {
                    console.error("ERROR: ContactPhotoResultCallback onResultFunction is not defined.");
               } else {
                    this.onResultFunction = onResultFunction;
               }
               if (onWarningFunction == null) {
                    console.error("ERROR: ContactPhotoResultCallback onWarningFunction is not defined.");
               } else {
                    this.onWarningFunction = onWarningFunction;
               }
          }

          /**
             @method
             This method is called on Error
             @param {Adaptive.IContactPhotoResultCallbackError} error error returned by the platform
             @since v2.0
          */
          public onError(error : IContactPhotoResultCallbackError) : void {
               if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                    console.warn("WARNING: ContactPhotoResultCallback contains a null reference to onErrorFunction.");
               } else {
                    this.onErrorFunction(error);
               }
          }

          /**
             @method
             This method is called on Result
             @param {number[]} contactPhoto contactPhoto returned by the platform
             @since v2.0
          */
          public onResult(contactPhoto : Array<number>) : void {
               if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                    console.warn("WARNING: ContactPhotoResultCallback contains a null reference to onResultFunction.");
               } else {
                    this.onResultFunction(contactPhoto);
               }
          }

          /**
             @method
             This method is called on Warning
             @param {number[]} contactPhoto contactPhoto returned by the platform
             @param {Adaptive.IContactPhotoResultCallbackWarning} warning warning      returned by the platform
             @since v2.0
          */
          public onWarning(contactPhoto : Array<number>, warning : IContactPhotoResultCallbackWarning) : void {
               if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                    console.warn("WARNING: ContactPhotoResultCallback contains a null reference to onWarningFunction.");
               } else {
                    this.onWarningFunction(contactPhoto, warning);
               }
          }

     }
}
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
