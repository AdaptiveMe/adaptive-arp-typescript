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
///<reference path="ISecurityResultCallback.ts"/>
///<reference path="ISecurityResultCallbackError.ts"/>
///<reference path="ISecurityResultCallbackWarning.ts"/>
///<reference path="SecureKeyPair.ts"/>

module Adaptive {

     /**
        Interface for Managing the Security result callback
        Auto-generated implementation of ISecurityResultCallback specification.
     */

     /**
        @property {Adaptive.Dictionary} registeredSecurityResultCallback
        @member Adaptive
        @private
        SecurityResultCallback control dictionary.
     */
     export var registeredSecurityResultCallback = new Dictionary<ISecurityResultCallback>([]);


        // SecurityResultCallback global listener handlers.

     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.ISecurityResultCallbackError} error
     */
     export function handleSecurityResultCallbackError(id : number, error : ISecurityResultCallbackError) : void {
          var callback : ISecurityResultCallback = registeredSecurityResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredSecurityResultCallback dictionary.");
          } else {
               registeredSecurityResultCallback.remove(""+id);
               callback.onError(error);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.SecureKeyPair[]} keyValues
     */
     export function handleSecurityResultCallbackResult(id : number, keyValues : Array<SecureKeyPair>) : void {
          var callback : ISecurityResultCallback = registeredSecurityResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredSecurityResultCallback dictionary.");
          } else {
               registeredSecurityResultCallback.remove(""+id);
               callback.onResult(keyValues);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.SecureKeyPair[]} keyValues
        @param {Adaptive.ISecurityResultCallbackWarning} warning
     */
     export function handleSecurityResultCallbackWarning(id : number, keyValues : Array<SecureKeyPair>, warning : ISecurityResultCallbackWarning) : void {
          var callback : ISecurityResultCallback = registeredSecurityResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredSecurityResultCallback dictionary.");
          } else {
               registeredSecurityResultCallback.remove(""+id);
               callback.onWarning(keyValues, warning);
          }
     }


     /**
        @class Adaptive.SecurityResultCallback
        @extends Adaptive.BaseCallback
     */
     export class SecurityResultCallback extends BaseCallback implements ISecurityResultCallback {

          /**
             @private
             @property
          */
          onErrorFunction : (error : ISecurityResultCallbackError) => void;
          /**
             @private
             @property
          */
          onResultFunction : (keyValues : Array<SecureKeyPair>) => void;
          /**
             @private
             @property
          */
          onWarningFunction : (keyValues : Array<SecureKeyPair>, warning : ISecurityResultCallbackWarning) => void;

          /**
             @method constructor
             Constructor with anonymous handler functions for callback.

             @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.ISecurityResultCallbackError
             @param {Function} onResultFunction Function receiving parameters of type: Adaptive.SecureKeyPair[]
             @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.SecureKeyPair[], Adaptive.ISecurityResultCallbackWarning
          */
          constructor(onErrorFunction : (error : ISecurityResultCallbackError) => void, onResultFunction : (keyValues : Array<SecureKeyPair>) => void, onWarningFunction : (keyValues : Array<SecureKeyPair>, warning : ISecurityResultCallbackWarning) => void) {
               super(++registeredCounter);
               if (onErrorFunction == null) {
                    console.error("ERROR: SecurityResultCallback onErrorFunction is not defined.");
               } else {
                    this.onErrorFunction = onErrorFunction;
               }
               if (onResultFunction == null) {
                    console.error("ERROR: SecurityResultCallback onResultFunction is not defined.");
               } else {
                    this.onResultFunction = onResultFunction;
               }
               if (onWarningFunction == null) {
                    console.error("ERROR: SecurityResultCallback onWarningFunction is not defined.");
               } else {
                    this.onWarningFunction = onWarningFunction;
               }
          }

          /**
             @method
             No data received - error condition, not authorized .
             @param {Adaptive.ISecurityResultCallbackError} error error Error values
             @since v2.0
          */
          public onError(error : ISecurityResultCallbackError) : void {
               if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                    console.warn("WARNING: SecurityResultCallback contains a null reference to onErrorFunction.");
               } else {
                    this.onErrorFunction(error);
               }
          }

          /**
             @method
             Correct data received.
             @param {Adaptive.SecureKeyPair[]} keyValues keyValues key and values
             @since v2.0
          */
          public onResult(keyValues : Array<SecureKeyPair>) : void {
               if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                    console.warn("WARNING: SecurityResultCallback contains a null reference to onResultFunction.");
               } else {
                    this.onResultFunction(keyValues);
               }
          }

          /**
             @method
             Data received with warning - ie Found entries with existing key and values have been overriden
             @param {Adaptive.SecureKeyPair[]} keyValues keyValues key and values
             @param {Adaptive.ISecurityResultCallbackWarning} warning warning   Warning values
             @since v2.0
          */
          public onWarning(keyValues : Array<SecureKeyPair>, warning : ISecurityResultCallbackWarning) : void {
               if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                    console.warn("WARNING: SecurityResultCallback contains a null reference to onWarningFunction.");
               } else {
                    this.onWarningFunction(keyValues, warning);
               }
          }

     }
}
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
