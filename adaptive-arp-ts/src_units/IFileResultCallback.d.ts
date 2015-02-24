/// <reference path="FileDescriptor.d.ts" />
/// <reference path="IAdaptiveRPGroup.d.ts" />
/// <reference path="IBaseCallback.d.ts" />
/// <reference path="IFileResultCallbackError.d.ts" />
/// <reference path="IFileResultCallbackWarning.d.ts" />
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
declare module Adaptive {
    /**
       Interface for Managing the File operations callback

       @author Carlos Lozano Diez
       @since v2.0
       @version 1.0
    */
    /**
       @class Adaptive.IFileResultCallback
    */
    interface IFileResultCallback extends IBaseCallback {
        /**
           @method
           On error result of a file operation.
           @param error Error processing the request.
           @since v2.0
        */
        onError(error: IFileResultCallbackError): any;
        /**
           @method
           On correct result of a file operation.
           @param storageFile Reference to the resulting file.
           @since v2.0
        */
        onResult(storageFile: FileDescriptor): any;
        /**
           @method
           On partial result of a file operation, containing a warning.
           @param file    Reference to the offending file.
           @param warning Warning processing the request.
           @since v2.0
        */
        onWarning(file: FileDescriptor, warning: IFileResultCallbackWarning): any;
    }
}
