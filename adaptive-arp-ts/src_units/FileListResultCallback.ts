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
///<reference path="IFileListResultCallback.ts"/>
///<reference path="IFileListResultCallbackError.ts"/>
///<reference path="IFileListResultCallbackWarning.ts"/>

module Adaptive {

     /**
        Interface for Managing the File result operations
        Auto-generated implementation of IFileListResultCallback specification.
     */

     /**
        @property {Adaptive.Dictionary} registeredFileListResultCallback
        @member Adaptive
        @private
        FileListResultCallback control dictionary.
     */
     export var registeredFileListResultCallback = new Dictionary<IFileListResultCallback>([]);


        // FileListResultCallback global listener handlers.

     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.IFileListResultCallbackError} error
     */
     export function handleFileListResultCallbackError(id : number, error : IFileListResultCallbackError) : void {
          var callback : IFileListResultCallback = registeredFileListResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredFileListResultCallback dictionary.");
          } else {
               registeredFileListResultCallback.remove(""+id);
               callback.onError(error);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.FileDescriptor[]} files
     */
     export function handleFileListResultCallbackResult(id : number, files : Array<FileDescriptor>) : void {
          var callback : IFileListResultCallback = registeredFileListResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredFileListResultCallback dictionary.");
          } else {
               registeredFileListResultCallback.remove(""+id);
               callback.onResult(files);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.FileDescriptor[]} files
        @param {Adaptive.IFileListResultCallbackWarning} warning
     */
     export function handleFileListResultCallbackWarning(id : number, files : Array<FileDescriptor>, warning : IFileListResultCallbackWarning) : void {
          var callback : IFileListResultCallback = registeredFileListResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredFileListResultCallback dictionary.");
          } else {
               registeredFileListResultCallback.remove(""+id);
               callback.onWarning(files, warning);
          }
     }


     /**
        @class Adaptive.FileListResultCallback
        @extends Adaptive.BaseCallback
     */
     export class FileListResultCallback extends BaseCallback implements IFileListResultCallback {

          /**
             @private
             @property
          */
          onErrorFunction : (error : IFileListResultCallbackError) => void;
          /**
             @private
             @property
          */
          onResultFunction : (files : Array<FileDescriptor>) => void;
          /**
             @private
             @property
          */
          onWarningFunction : (files : Array<FileDescriptor>, warning : IFileListResultCallbackWarning) => void;

          /**
             @method constructor
             Constructor with anonymous handler functions for callback.

             @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IFileListResultCallbackError
             @param {Function} onResultFunction Function receiving parameters of type: Adaptive.FileDescriptor[]
             @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.FileDescriptor[], Adaptive.IFileListResultCallbackWarning
          */
          constructor(onErrorFunction : (error : IFileListResultCallbackError) => void, onResultFunction : (files : Array<FileDescriptor>) => void, onWarningFunction : (files : Array<FileDescriptor>, warning : IFileListResultCallbackWarning) => void) {
               super(++registeredCounter);
               if (onErrorFunction == null) {
                    console.error("ERROR: FileListResultCallback onErrorFunction is not defined.");
               } else {
                    this.onErrorFunction = onErrorFunction;
               }
               if (onResultFunction == null) {
                    console.error("ERROR: FileListResultCallback onResultFunction is not defined.");
               } else {
                    this.onResultFunction = onResultFunction;
               }
               if (onWarningFunction == null) {
                    console.error("ERROR: FileListResultCallback onWarningFunction is not defined.");
               } else {
                    this.onWarningFunction = onWarningFunction;
               }
          }

          /**
             @method
             On error result of a file operation.
             @param {Adaptive.IFileListResultCallbackError} error error Error processing the request.
             @since v2.0
          */
          public onError(error : IFileListResultCallbackError) : void {
               if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                    console.warn("WARNING: FileListResultCallback contains a null reference to onErrorFunction.");
               } else {
                    this.onErrorFunction(error);
               }
          }

          /**
             @method
             On correct result of a file operation.
             @param {Adaptive.FileDescriptor[]} files files Array of resulting files/folders.
             @since v2.0
          */
          public onResult(files : Array<FileDescriptor>) : void {
               if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                    console.warn("WARNING: FileListResultCallback contains a null reference to onResultFunction.");
               } else {
                    this.onResultFunction(files);
               }
          }

          /**
             @method
             On partial result of a file operation, containing a warning.
             @param {Adaptive.FileDescriptor[]} files files   Array of resulting files/folders.
             @param {Adaptive.IFileListResultCallbackWarning} warning warning Warning condition encountered.
             @since v2.0
          */
          public onWarning(files : Array<FileDescriptor>, warning : IFileListResultCallbackWarning) : void {
               if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                    console.warn("WARNING: FileListResultCallback contains a null reference to onWarningFunction.");
               } else {
                    this.onWarningFunction(files, warning);
               }
          }

     }
}
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
