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
///<reference path="IFileResultCallback.ts"/>
///<reference path="IFileResultCallbackError.ts"/>
///<reference path="IFileResultCallbackWarning.ts"/>

module Adaptive {

     /**
        Interface for Managing the File operations callback
        Auto-generated implementation of IFileResultCallback specification.
     */

     /**
        @property {Adaptive.Dictionary} registeredFileResultCallback
        @member Adaptive
        @private
        FileResultCallback control dictionary.
     */
     export var registeredFileResultCallback = new Dictionary<IFileResultCallback>([]);


        // FileResultCallback global listener handlers.

     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.IFileResultCallbackError} error
     */
     export function handleFileResultCallbackError(id : number, error : IFileResultCallbackError) : void {
          var callback : IFileResultCallback = registeredFileResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredFileResultCallback dictionary.");
          } else {
               registeredFileResultCallback.remove(""+id);
               callback.onError(error);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.FileDescriptor} storageFile
     */
     export function handleFileResultCallbackResult(id : number, storageFile : FileDescriptor) : void {
          var callback : IFileResultCallback = registeredFileResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredFileResultCallback dictionary.");
          } else {
               registeredFileResultCallback.remove(""+id);
               callback.onResult(storageFile);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.FileDescriptor} file
        @param {Adaptive.IFileResultCallbackWarning} warning
     */
     export function handleFileResultCallbackWarning(id : number, file : FileDescriptor, warning : IFileResultCallbackWarning) : void {
          var callback : IFileResultCallback = registeredFileResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredFileResultCallback dictionary.");
          } else {
               registeredFileResultCallback.remove(""+id);
               callback.onWarning(file, warning);
          }
     }


     /**
        @class Adaptive.FileResultCallback
        @extends Adaptive.BaseCallback
     */
     export class FileResultCallback extends BaseCallback implements IFileResultCallback {

          /**
             @private
             @property
          */
          onErrorFunction : (error : IFileResultCallbackError) => void;
          /**
             @private
             @property
          */
          onResultFunction : (storageFile : FileDescriptor) => void;
          /**
             @private
             @property
          */
          onWarningFunction : (file : FileDescriptor, warning : IFileResultCallbackWarning) => void;

          /**
             @method constructor
             Constructor with anonymous handler functions for callback.

             @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IFileResultCallbackError
             @param {Function} onResultFunction Function receiving parameters of type: Adaptive.FileDescriptor
             @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.FileDescriptor, Adaptive.IFileResultCallbackWarning
          */
          constructor(onErrorFunction : (error : IFileResultCallbackError) => void, onResultFunction : (storageFile : FileDescriptor) => void, onWarningFunction : (file : FileDescriptor, warning : IFileResultCallbackWarning) => void) {
               super(++registeredCounter);
               if (onErrorFunction == null) {
                    console.error("ERROR: FileResultCallback onErrorFunction is not defined.");
               } else {
                    this.onErrorFunction = onErrorFunction;
               }
               if (onResultFunction == null) {
                    console.error("ERROR: FileResultCallback onResultFunction is not defined.");
               } else {
                    this.onResultFunction = onResultFunction;
               }
               if (onWarningFunction == null) {
                    console.error("ERROR: FileResultCallback onWarningFunction is not defined.");
               } else {
                    this.onWarningFunction = onWarningFunction;
               }
          }

          /**
             @method
             On error result of a file operation.
             @param {Adaptive.IFileResultCallbackError} error error Error processing the request.
             @since v2.0
          */
          public onError(error : IFileResultCallbackError) : void {
               if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                    console.warn("WARNING: FileResultCallback contains a null reference to onErrorFunction.");
               } else {
                    this.onErrorFunction(error);
               }
          }

          /**
             @method
             On correct result of a file operation.
             @param {Adaptive.FileDescriptor} storageFile storageFile Reference to the resulting file.
             @since v2.0
          */
          public onResult(storageFile : FileDescriptor) : void {
               if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                    console.warn("WARNING: FileResultCallback contains a null reference to onResultFunction.");
               } else {
                    this.onResultFunction(storageFile);
               }
          }

          /**
             @method
             On partial result of a file operation, containing a warning.
             @param {Adaptive.FileDescriptor} file file    Reference to the offending file.
             @param {Adaptive.IFileResultCallbackWarning} warning warning Warning processing the request.
             @since v2.0
          */
          public onWarning(file : FileDescriptor, warning : IFileResultCallbackWarning) : void {
               if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                    console.warn("WARNING: FileResultCallback contains a null reference to onWarningFunction.");
               } else {
                    this.onWarningFunction(file, warning);
               }
          }

     }
}
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
