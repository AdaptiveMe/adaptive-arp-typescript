/// <reference path="BaseCallback.d.ts" />
/// <reference path="CommonUtil.d.ts" />
/// <reference path="FileDescriptor.d.ts" />
/// <reference path="IFileDataStoreResultCallback.d.ts" />
/// <reference path="IFileDataStoreResultCallbackError.d.ts" />
/// <reference path="IFileDataStoreResultCallbackWarning.d.ts" />
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
       Interface for Managing the File store operations callback
       Auto-generated implementation of IFileDataStoreResultCallback specification.
    */
    /**
       @property {Adaptive.Dictionary} registeredFileDataStoreResultCallback
       @member Adaptive
       @private
       FileDataStoreResultCallback control dictionary.
    */
    var registeredFileDataStoreResultCallback: Dictionary<IFileDataStoreResultCallback>;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IFileDataStoreResultCallbackError} error
    */
    function handleFileDataStoreResultCallbackError(id: number, error: IFileDataStoreResultCallbackError): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.FileDescriptor} file
    */
    function handleFileDataStoreResultCallbackResult(id: number, file: FileDescriptor): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.FileDescriptor} file
       @param {Adaptive.IFileDataStoreResultCallbackWarning} warning
    */
    function handleFileDataStoreResultCallbackWarning(id: number, file: FileDescriptor, warning: IFileDataStoreResultCallbackWarning): void;
    /**
       @class Adaptive.FileDataStoreResultCallback
       @extends Adaptive.BaseCallback
    */
    class FileDataStoreResultCallback extends BaseCallback implements IFileDataStoreResultCallback {
        /**
           @private
           @property
        */
        onErrorFunction: (error: IFileDataStoreResultCallbackError) => void;
        /**
           @private
           @property
        */
        onResultFunction: (file: FileDescriptor) => void;
        /**
           @private
           @property
        */
        onWarningFunction: (file: FileDescriptor, warning: IFileDataStoreResultCallbackWarning) => void;
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IFileDataStoreResultCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.FileDescriptor
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.FileDescriptor, Adaptive.IFileDataStoreResultCallbackWarning
        */
        constructor(onErrorFunction: (error: IFileDataStoreResultCallbackError) => void, onResultFunction: (file: FileDescriptor) => void, onWarningFunction: (file: FileDescriptor, warning: IFileDataStoreResultCallbackWarning) => void);
        /**
           @method
           Error processing data retrieval/storage operation.
           @param {Adaptive.IFileDataStoreResultCallbackError} error error Error condition encountered.
           @since v2.0
        */
        onError(error: IFileDataStoreResultCallbackError): void;
        /**
           @method
           Result of data storage operation.
           @param {Adaptive.FileDescriptor} file file File reference to stored data.
           @since v2.0
        */
        onResult(file: FileDescriptor): void;
        /**
           @method
           Result with warning of data retrieval/storage operation.
           @param {Adaptive.FileDescriptor} file file    File being loaded/stored.
           @param {Adaptive.IFileDataStoreResultCallbackWarning} warning warning Warning condition encountered.
           @since v2.0
        */
        onWarning(file: FileDescriptor, warning: IFileDataStoreResultCallbackWarning): void;
    }
}
