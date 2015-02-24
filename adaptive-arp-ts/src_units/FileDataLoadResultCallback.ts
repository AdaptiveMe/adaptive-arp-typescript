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
///<reference path="IFileDataLoadResultCallback.ts"/>
///<reference path="IFileDataLoadResultCallbackError.ts"/>
///<reference path="IFileDataLoadResultCallbackWarning.ts"/>

module Adaptive {

     /**
        Interface for Managing the File loading callback responses
        Auto-generated implementation of IFileDataLoadResultCallback specification.
     */

     /**
        @property {Adaptive.Dictionary} registeredFileDataLoadResultCallback
        @member Adaptive
        @private
        FileDataLoadResultCallback control dictionary.
     */
     export var registeredFileDataLoadResultCallback = new Dictionary<IFileDataLoadResultCallback>([]);


        // FileDataLoadResultCallback global listener handlers.

     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.IFileDataLoadResultCallbackError} error
     */
     export function handleFileDataLoadResultCallbackError(id : number, error : IFileDataLoadResultCallbackError) : void {
          var callback : IFileDataLoadResultCallback = registeredFileDataLoadResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredFileDataLoadResultCallback dictionary.");
          } else {
               registeredFileDataLoadResultCallback.remove(""+id);
               callback.onError(error);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {number[]} data
     */
     export function handleFileDataLoadResultCallbackResult(id : number, data : Array<number>) : void {
          var callback : IFileDataLoadResultCallback = registeredFileDataLoadResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredFileDataLoadResultCallback dictionary.");
          } else {
               registeredFileDataLoadResultCallback.remove(""+id);
               callback.onResult(data);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {number[]} data
        @param {Adaptive.IFileDataLoadResultCallbackWarning} warning
     */
     export function handleFileDataLoadResultCallbackWarning(id : number, data : Array<number>, warning : IFileDataLoadResultCallbackWarning) : void {
          var callback : IFileDataLoadResultCallback = registeredFileDataLoadResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredFileDataLoadResultCallback dictionary.");
          } else {
               registeredFileDataLoadResultCallback.remove(""+id);
               callback.onWarning(data, warning);
          }
     }


     /**
        @class Adaptive.FileDataLoadResultCallback
        @extends Adaptive.BaseCallback
     */
     export class FileDataLoadResultCallback extends BaseCallback implements IFileDataLoadResultCallback {

          /**
             @private
             @property
          */
          onErrorFunction : (error : IFileDataLoadResultCallbackError) => void;
          /**
             @private
             @property
          */
          onResultFunction : (data : Array<number>) => void;
          /**
             @private
             @property
          */
          onWarningFunction : (data : Array<number>, warning : IFileDataLoadResultCallbackWarning) => void;

          /**
             @method constructor
             Constructor with anonymous handler functions for callback.

             @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IFileDataLoadResultCallbackError
             @param {Function} onResultFunction Function receiving parameters of type: number[]
             @param {Function} onWarningFunction Function receiving parameters of type: number[], Adaptive.IFileDataLoadResultCallbackWarning
          */
          constructor(onErrorFunction : (error : IFileDataLoadResultCallbackError) => void, onResultFunction : (data : Array<number>) => void, onWarningFunction : (data : Array<number>, warning : IFileDataLoadResultCallbackWarning) => void) {
               super(++registeredCounter);
               if (onErrorFunction == null) {
                    console.error("ERROR: FileDataLoadResultCallback onErrorFunction is not defined.");
               } else {
                    this.onErrorFunction = onErrorFunction;
               }
               if (onResultFunction == null) {
                    console.error("ERROR: FileDataLoadResultCallback onResultFunction is not defined.");
               } else {
                    this.onResultFunction = onResultFunction;
               }
               if (onWarningFunction == null) {
                    console.error("ERROR: FileDataLoadResultCallback onWarningFunction is not defined.");
               } else {
                    this.onWarningFunction = onWarningFunction;
               }
          }

          /**
             @method
             Error processing data retrieval/storage operation.
             @param {Adaptive.IFileDataLoadResultCallbackError} error error Error condition encountered.
             @since v2.0
          */
          public onError(error : IFileDataLoadResultCallbackError) : void {
               if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                    console.warn("WARNING: FileDataLoadResultCallback contains a null reference to onErrorFunction.");
               } else {
                    this.onErrorFunction(error);
               }
          }

          /**
             @method
             Result of data retrieval operation.
             @param {number[]} data data Data loaded.
             @since v2.0
          */
          public onResult(data : Array<number>) : void {
               if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                    console.warn("WARNING: FileDataLoadResultCallback contains a null reference to onResultFunction.");
               } else {
                    this.onResultFunction(data);
               }
          }

          /**
             @method
             Result with warning of data retrieval/storage operation.
             @param {number[]} data data    File being loaded.
             @param {Adaptive.IFileDataLoadResultCallbackWarning} warning warning Warning condition encountered.
             @since v2.0
          */
          public onWarning(data : Array<number>, warning : IFileDataLoadResultCallbackWarning) : void {
               if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                    console.warn("WARNING: FileDataLoadResultCallback contains a null reference to onWarningFunction.");
               } else {
                    this.onWarningFunction(data, warning);
               }
          }

     }
}
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
