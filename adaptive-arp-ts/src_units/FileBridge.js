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
var __extends = this.__extends || function (d, b) {
    for (var p in b) { if (b.hasOwnProperty(p)) { d[p] = b[p]; } }
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="APIRequest.ts"/>
///<reference path="APIResponse.ts"/>
///<reference path="BaseDataBridge.ts"/>
///<reference path="CommonUtil.ts"/>
///<reference path="FileDataLoadResultCallback.ts"/>
///<reference path="FileDataStoreResultCallback.ts"/>
///<reference path="FileDescriptor.ts"/>
///<reference path="FileListResultCallback.ts"/>
///<reference path="FileResultCallback.ts"/>
///<reference path="IAdaptiveRPGroup.ts"/>
///<reference path="IBaseData.ts"/>
///<reference path="IFile.ts"/>
///<reference path="IFileDataLoadResultCallback.ts"/>
///<reference path="IFileDataStoreResultCallback.ts"/>
///<reference path="IFileListResultCallback.ts"/>
///<reference path="IFileResultCallback.ts"/>
///<reference path="IFileSystemSecurity.ts"/>
///<reference path="IFileSystemStorageType.ts"/>
///<reference path="IFileSystemType.ts"/>
var Adaptive;
(function (Adaptive) {
    /**
       @class Adaptive.FileBridge
       @extends Adaptive.BaseDataBridge
       Interface for Managing the File operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var FileBridge = (function (_super) {
        __extends(FileBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function FileBridge() {
            _super.call(this);
        }
        /**
           @method
           Determine whether the current file/folder can be read from.

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @return {boolean} True if the folder/file is readable, false otherwise.
           @since v2.0
        */
        FileBridge.prototype.canRead = function (descriptor) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(descriptor));
            var apiRequest = new Adaptive.APIRequest("IFile", "canRead", arParams, -1);
            var apiResponse = Adaptive.postRequest(apiRequest);
            // Prepare response.
            var response = false;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = JSON.parse(apiResponse.getResponse());
            }
            return response;
        };
        /**
           @method
           Determine whether the current file/folder can be written to.

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @return {boolean} True if the folder/file is writable, false otherwise.
           @since v2.0
        */
        FileBridge.prototype.canWrite = function (descriptor) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(descriptor));
            var apiRequest = new Adaptive.APIRequest("IFile", "canWrite", arParams, -1);
            var apiResponse = Adaptive.postRequest(apiRequest);
            // Prepare response.
            var response = false;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = JSON.parse(apiResponse.getResponse());
            }
            return response;
        };
        /**
           @method
           Creates a file with the specified name.

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @param {Adaptive.FileResultCallback} callback callback   Result of the operation.
           @since v2.0
        */
        FileBridge.prototype.create = function (descriptor, callback) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(descriptor));
            var apiRequest = new Adaptive.APIRequest("IFile", "create", arParams, callback.getId());
            Adaptive.postRequestCallback(apiRequest, callback, Adaptive.registeredFileResultCallback);
        };
        /**
           @method
           Deletes the given file or path. If the file is a directory and contains files and or subdirectories, these will be
deleted if the cascade parameter is set to true.

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @param {boolean} cascade cascade    Whether to delete sub-files and sub-folders.
           @return {boolean} True if files (and sub-files and folders) whether deleted.
           @since v2.0
        */
        FileBridge.prototype.delete = function (descriptor, cascade) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(descriptor));
            arParams.push(JSON.stringify(cascade));
            var apiRequest = new Adaptive.APIRequest("IFile", "delete", arParams, -1);
            var apiResponse = Adaptive.postRequest(apiRequest);
            // Prepare response.
            var response = false;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = JSON.parse(apiResponse.getResponse());
            }
            return response;
        };
        /**
           @method
           Check whether the file/path exists.

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @return {boolean} True if the file exists in the filesystem, false otherwise.
           @since v2.0
        */
        FileBridge.prototype.exists = function (descriptor) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(descriptor));
            var apiRequest = new Adaptive.APIRequest("IFile", "exists", arParams, -1);
            var apiResponse = Adaptive.postRequest(apiRequest);
            // Prepare response.
            var response = false;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = JSON.parse(apiResponse.getResponse());
            }
            return response;
        };
        /**
           @method
           Loads the content of the file.

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @param {Adaptive.FileDataLoadResultCallback} callback callback   Result of the operation.
           @since v2.0
        */
        FileBridge.prototype.getContent = function (descriptor, callback) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(descriptor));
            var apiRequest = new Adaptive.APIRequest("IFile", "getContent", arParams, callback.getId());
            Adaptive.postRequestCallback(apiRequest, callback, Adaptive.registeredFileDataLoadResultCallback);
        };
        /**
           @method
           Returns the file storage type of the file

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @return {Adaptive.IFileSystemStorageType} Storage Type file
           @since v2.0
        */
        FileBridge.prototype.getFileStorageType = function (descriptor) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(descriptor));
            var apiRequest = new Adaptive.APIRequest("IFile", "getFileStorageType", arParams, -1);
            var apiResponse = Adaptive.postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = Adaptive.IFileSystemStorageType.toObject(JSON.parse(apiResponse.getResponse()));
            }
            return response;
        };
        /**
           @method
           Returns the file type

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @return {Adaptive.IFileSystemType} Returns the file type of the file
           @since v2.0
        */
        FileBridge.prototype.getFileType = function (descriptor) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(descriptor));
            var apiRequest = new Adaptive.APIRequest("IFile", "getFileType", arParams, -1);
            var apiResponse = Adaptive.postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = Adaptive.IFileSystemType.toObject(JSON.parse(apiResponse.getResponse()));
            }
            return response;
        };
        /**
           @method
           Returns the security type of the file

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @return {Adaptive.IFileSystemSecurity} Security Level of the file
           @since v2.0
        */
        FileBridge.prototype.getSecurityType = function (descriptor) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(descriptor));
            var apiRequest = new Adaptive.APIRequest("IFile", "getSecurityType", arParams, -1);
            var apiResponse = Adaptive.postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = Adaptive.IFileSystemSecurity.toObject(JSON.parse(apiResponse.getResponse()));
            }
            return response;
        };
        /**
           @method
           Check whether this is a path of a file.

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @return {boolean} true if this is a path to a folder/directory, false if this is a path to a file.
           @since v2.0
        */
        FileBridge.prototype.isDirectory = function (descriptor) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(descriptor));
            var apiRequest = new Adaptive.APIRequest("IFile", "isDirectory", arParams, -1);
            var apiResponse = Adaptive.postRequest(apiRequest);
            // Prepare response.
            var response = false;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = JSON.parse(apiResponse.getResponse());
            }
            return response;
        };
        /**
           @method
           List all the files contained within this file/path reference. If the reference is a file, it will not yield
any results.

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @param {Adaptive.FileListResultCallback} callback callback   Result of operation.
           @since v2.0
        */
        FileBridge.prototype.listFiles = function (descriptor, callback) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(descriptor));
            var apiRequest = new Adaptive.APIRequest("IFile", "listFiles", arParams, callback.getId());
            Adaptive.postRequestCallback(apiRequest, callback, Adaptive.registeredFileListResultCallback);
        };
        /**
           @method
           List all the files matching the speficied regex filter within this file/path reference. If the reference
is a file, it will not yield any results.

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @param {string} regex regex      Filter (eg. *.jpg, *.png, Fil*) name string.
           @param {Adaptive.FileListResultCallback} callback callback   Result of operation.
           @since v2.0
        */
        FileBridge.prototype.listFilesForRegex = function (descriptor, regex, callback) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(descriptor));
            arParams.push(JSON.stringify(regex));
            var apiRequest = new Adaptive.APIRequest("IFile", "listFilesForRegex", arParams, callback.getId());
            Adaptive.postRequestCallback(apiRequest, callback, Adaptive.registeredFileListResultCallback);
        };
        /**
           @method
           Creates the parent path (or paths, if recursive) to the given file/path if it doesn't already exist.

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @param {boolean} recursive recursive  Whether to create all parent path elements.
           @return {boolean} True if the path was created, false otherwise (or it exists already).
           @since v2.0
        */
        FileBridge.prototype.mkDir = function (descriptor, recursive) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(descriptor));
            arParams.push(JSON.stringify(recursive));
            var apiRequest = new Adaptive.APIRequest("IFile", "mkDir", arParams, -1);
            var apiResponse = Adaptive.postRequest(apiRequest);
            // Prepare response.
            var response = false;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = JSON.parse(apiResponse.getResponse());
            }
            return response;
        };
        /**
           @method
           Moves the current file to the given file destination, optionally overwriting and creating the path to the
new destination file.

           @param {Adaptive.FileDescriptor} source source      File descriptor of file or folder used for operation as source.
           @param {Adaptive.FileDescriptor} destination destination File descriptor of file or folder used for operation as destination.
           @param {boolean} createPath createPath  True to create the path if it does not already exist.
           @param {boolean} overwrite overwrite   True to create the path if it does not already exist.
           @param {Adaptive.FileResultCallback} callback callback    Result of the operation.
           @since v2.0
        */
        FileBridge.prototype.move = function (source, destination, createPath, overwrite, callback) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(source));
            arParams.push(JSON.stringify(destination));
            arParams.push(JSON.stringify(createPath));
            arParams.push(JSON.stringify(overwrite));
            var apiRequest = new Adaptive.APIRequest("IFile", "move", arParams, callback.getId());
            Adaptive.postRequestCallback(apiRequest, callback, Adaptive.registeredFileResultCallback);
        };
        /**
           @method
           Sets the content of the file.

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @param {number[]} content content    Binary content to store in the file.
           @param {Adaptive.FileDataStoreResultCallback} callback callback   Result of the operation.
           @since v2.0
        */
        FileBridge.prototype.setContent = function (descriptor, content, callback) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(descriptor));
            arParams.push(JSON.stringify(content));
            var apiRequest = new Adaptive.APIRequest("IFile", "setContent", arParams, callback.getId());
            Adaptive.postRequestCallback(apiRequest, callback, Adaptive.registeredFileDataStoreResultCallback);
        };
        return FileBridge;
    })(Adaptive.BaseDataBridge);
    Adaptive.FileBridge = FileBridge;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=FileBridge.js.map