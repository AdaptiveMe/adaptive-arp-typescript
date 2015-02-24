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
///<reference path="FileDescriptor.ts"/>
///<reference path="IFileDataStoreResultCallback.ts"/>
///<reference path="IFileDataStoreResultCallbackError.ts"/>
///<reference path="IFileDataStoreResultCallbackWarning.ts"/>

module Adaptive {

     /**
        Interface for Managing the File store operations callback
        Auto-generated implementation of IFileDataStoreResultCallback specification.
     */

     /**
        @property {Adaptive.Dictionary} registeredFileDataStoreResultCallback
        @member Adaptive
        @private
        FileDataStoreResultCallback control dictionary.
     */
     export var registeredFileDataStoreResultCallback = new Dictionary<IFileDataStoreResultCallback>([]);


        // FileDataStoreResultCallback global listener handlers.

     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.IFileDataStoreResultCallbackError} error
     */
     export function handleFileDataStoreResultCallbackError(id : number, error : IFileDataStoreResultCallbackError) : void {
          var callback : IFileDataStoreResultCallback = registeredFileDataStoreResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredFileDataStoreResultCallback dictionary.");
          } else {
               registeredFileDataStoreResultCallback.remove(""+id);
               callback.onError(error);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.FileDescriptor} file
     */
     export function handleFileDataStoreResultCallbackResult(id : number, file : FileDescriptor) : void {
          var callback : IFileDataStoreResultCallback = registeredFileDataStoreResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredFileDataStoreResultCallback dictionary.");
          } else {
               registeredFileDataStoreResultCallback.remove(""+id);
               callback.onResult(file);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.FileDescriptor} file
        @param {Adaptive.IFileDataStoreResultCallbackWarning} warning
     */
     export function handleFileDataStoreResultCallbackWarning(id : number, file : FileDescriptor, warning : IFileDataStoreResultCallbackWarning) : void {
          var callback : IFileDataStoreResultCallback = registeredFileDataStoreResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredFileDataStoreResultCallback dictionary.");
          } else {
               registeredFileDataStoreResultCallback.remove(""+id);
               callback.onWarning(file, warning);
          }
     }


     /**
        @class Adaptive.FileDataStoreResultCallback
        @extends Adaptive.BaseCallback
     */
     export class FileDataStoreResultCallback extends BaseCallback implements IFileDataStoreResultCallback {

          /**
             @private
             @property
          */
          onErrorFunction : (error : IFileDataStoreResultCallbackError) => void;
          /**
             @private
             @property
          */
          onResultFunction : (file : FileDescriptor) => void;
          /**
             @private
             @property
          */
          onWarningFunction : (file : FileDescriptor, warning : IFileDataStoreResultCallbackWarning) => void;

          /**
             @method constructor
             Constructor with anonymous handler functions for callback.

             @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IFileDataStoreResultCallbackError
             @param {Function} onResultFunction Function receiving parameters of type: Adaptive.FileDescriptor
             @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.FileDescriptor, Adaptive.IFileDataStoreResultCallbackWarning
          */
          constructor(onErrorFunction : (error : IFileDataStoreResultCallbackError) => void, onResultFunction : (file : FileDescriptor) => void, onWarningFunction : (file : FileDescriptor, warning : IFileDataStoreResultCallbackWarning) => void) {
               super(++registeredCounter);
               if (onErrorFunction == null) {
                    console.error("ERROR: FileDataStoreResultCallback onErrorFunction is not defined.");
               } else {
                    this.onErrorFunction = onErrorFunction;
               }
               if (onResultFunction == null) {
                    console.error("ERROR: FileDataStoreResultCallback onResultFunction is not defined.");
               } else {
                    this.onResultFunction = onResultFunction;
               }
               if (onWarningFunction == null) {
                    console.error("ERROR: FileDataStoreResultCallback onWarningFunction is not defined.");
               } else {
                    this.onWarningFunction = onWarningFunction;
               }
          }

          /**
             @method
             Error processing data retrieval/storage operation.
             @param {Adaptive.IFileDataStoreResultCallbackError} error error Error condition encountered.
             @since v2.0
          */
          public onError(error : IFileDataStoreResultCallbackError) : void {
               if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                    console.warn("WARNING: FileDataStoreResultCallback contains a null reference to onErrorFunction.");
               } else {
                    this.onErrorFunction(error);
               }
          }

          /**
             @method
             Result of data storage operation.
             @param {Adaptive.FileDescriptor} file file File reference to stored data.
             @since v2.0
          */
          public onResult(file : FileDescriptor) : void {
               if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                    console.warn("WARNING: FileDataStoreResultCallback contains a null reference to onResultFunction.");
               } else {
                    this.onResultFunction(file);
               }
          }

          /**
             @method
             Result with warning of data retrieval/storage operation.
             @param {Adaptive.FileDescriptor} file file    File being loaded/stored.
             @param {Adaptive.IFileDataStoreResultCallbackWarning} warning warning Warning condition encountered.
             @since v2.0
          */
          public onWarning(file : FileDescriptor, warning : IFileDataStoreResultCallbackWarning) : void {
               if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                    console.warn("WARNING: FileDataStoreResultCallback contains a null reference to onWarningFunction.");
               } else {
                    this.onWarningFunction(file, warning);
               }
          }

     }
}
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
