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
module Adaptive {

     /**
        @class Adaptive.FileBridge
        @extends Adaptive.BaseDataBridge
        Interface for Managing the File operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class FileBridge extends BaseDataBridge implements IFile {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }

          /**
             @method
             Determine whether the current file/folder can be read from.

             @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
             @return {boolean} True if the folder/file is readable, false otherwise.
             @since v2.0
          */
          canRead(descriptor : FileDescriptor) : boolean {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(descriptor));
               var apiRequest : APIRequest = new APIRequest("IFile","canRead",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : boolean = false;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = JSON.parse(apiResponse.getResponse());
               }
               return response;
          }

          /**
             @method
             Determine whether the current file/folder can be written to.

             @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
             @return {boolean} True if the folder/file is writable, false otherwise.
             @since v2.0
          */
          canWrite(descriptor : FileDescriptor) : boolean {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(descriptor));
               var apiRequest : APIRequest = new APIRequest("IFile","canWrite",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : boolean = false;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = JSON.parse(apiResponse.getResponse());
               }
               return response;
          }

          /**
             @method
             Creates a file with the specified name.

             @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
             @param {Adaptive.FileResultCallback} callback callback   Result of the operation.
             @since v2.0
          */
          create(descriptor : FileDescriptor, callback : IFileResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(descriptor));
               var apiRequest : APIRequest = new APIRequest("IFile","create",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredFileResultCallback);
          }

          /**
             @method
             Deletes the given file or path. If the file is a directory and contains files and or subdirectories, these will be
deleted if the cascade parameter is set to true.

             @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
             @param {boolean} cascade cascade    Whether to delete sub-files and sub-folders.
             @return {boolean} True if files (and sub-files and folders) whether deleted.
             @since v2.0
          */
          delete(descriptor : FileDescriptor, cascade : boolean) : boolean {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(descriptor));
               arParams.push(JSON.stringify(cascade));
               var apiRequest : APIRequest = new APIRequest("IFile","delete",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : boolean = false;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = JSON.parse(apiResponse.getResponse());
               }
               return response;
          }

          /**
             @method
             Check whether the file/path exists.

             @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
             @return {boolean} True if the file exists in the filesystem, false otherwise.
             @since v2.0
          */
          exists(descriptor : FileDescriptor) : boolean {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(descriptor));
               var apiRequest : APIRequest = new APIRequest("IFile","exists",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : boolean = false;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = JSON.parse(apiResponse.getResponse());
               }
               return response;
          }

          /**
             @method
             Loads the content of the file.

             @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
             @param {Adaptive.FileDataLoadResultCallback} callback callback   Result of the operation.
             @since v2.0
          */
          getContent(descriptor : FileDescriptor, callback : IFileDataLoadResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(descriptor));
               var apiRequest : APIRequest = new APIRequest("IFile","getContent",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredFileDataLoadResultCallback);
          }

          /**
             @method
             Returns the file storage type of the file

             @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
             @return {Adaptive.IFileSystemStorageType} Storage Type file
             @since v2.0
          */
          getFileStorageType(descriptor : FileDescriptor) : IFileSystemStorageType {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(descriptor));
               var apiRequest : APIRequest = new APIRequest("IFile","getFileStorageType",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : IFileSystemStorageType = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = IFileSystemStorageType.toObject(JSON.parse(apiResponse.getResponse()));
               }
               return response;
          }

          /**
             @method
             Returns the file type

             @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
             @return {Adaptive.IFileSystemType} Returns the file type of the file
             @since v2.0
          */
          getFileType(descriptor : FileDescriptor) : IFileSystemType {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(descriptor));
               var apiRequest : APIRequest = new APIRequest("IFile","getFileType",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : IFileSystemType = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = IFileSystemType.toObject(JSON.parse(apiResponse.getResponse()));
               }
               return response;
          }

          /**
             @method
             Returns the security type of the file

             @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
             @return {Adaptive.IFileSystemSecurity} Security Level of the file
             @since v2.0
          */
          getSecurityType(descriptor : FileDescriptor) : IFileSystemSecurity {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(descriptor));
               var apiRequest : APIRequest = new APIRequest("IFile","getSecurityType",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : IFileSystemSecurity = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = IFileSystemSecurity.toObject(JSON.parse(apiResponse.getResponse()));
               }
               return response;
          }

          /**
             @method
             Check whether this is a path of a file.

             @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
             @return {boolean} true if this is a path to a folder/directory, false if this is a path to a file.
             @since v2.0
          */
          isDirectory(descriptor : FileDescriptor) : boolean {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(descriptor));
               var apiRequest : APIRequest = new APIRequest("IFile","isDirectory",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : boolean = false;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = JSON.parse(apiResponse.getResponse());
               }
               return response;
          }

          /**
             @method
             List all the files contained within this file/path reference. If the reference is a file, it will not yield
any results.

             @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
             @param {Adaptive.FileListResultCallback} callback callback   Result of operation.
             @since v2.0
          */
          listFiles(descriptor : FileDescriptor, callback : IFileListResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(descriptor));
               var apiRequest : APIRequest = new APIRequest("IFile","listFiles",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredFileListResultCallback);
          }

          /**
             @method
             List all the files matching the speficied regex filter within this file/path reference. If the reference
is a file, it will not yield any results.

             @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
             @param {string} regex regex      Filter (eg. *.jpg, *.png, Fil*) name string.
             @param {Adaptive.FileListResultCallback} callback callback   Result of operation.
             @since v2.0
          */
          listFilesForRegex(descriptor : FileDescriptor, regex : string, callback : IFileListResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(descriptor));
               arParams.push(JSON.stringify(regex));
               var apiRequest : APIRequest = new APIRequest("IFile","listFilesForRegex",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredFileListResultCallback);
          }

          /**
             @method
             Creates the parent path (or paths, if recursive) to the given file/path if it doesn't already exist.

             @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
             @param {boolean} recursive recursive  Whether to create all parent path elements.
             @return {boolean} True if the path was created, false otherwise (or it exists already).
             @since v2.0
          */
          mkDir(descriptor : FileDescriptor, recursive : boolean) : boolean {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(descriptor));
               arParams.push(JSON.stringify(recursive));
               var apiRequest : APIRequest = new APIRequest("IFile","mkDir",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : boolean = false;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = JSON.parse(apiResponse.getResponse());
               }
               return response;
          }

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
          move(source : FileDescriptor, destination : FileDescriptor, createPath : boolean, overwrite : boolean, callback : IFileResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(source));
               arParams.push(JSON.stringify(destination));
               arParams.push(JSON.stringify(createPath));
               arParams.push(JSON.stringify(overwrite));
               var apiRequest : APIRequest = new APIRequest("IFile","move",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredFileResultCallback);
          }

          /**
             @method
             Sets the content of the file.

             @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
             @param {number[]} content content    Binary content to store in the file.
             @param {Adaptive.FileDataStoreResultCallback} callback callback   Result of the operation.
             @since v2.0
          */
          setContent(descriptor : FileDescriptor, content : Array<number>, callback : IFileDataStoreResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(descriptor));
               arParams.push(JSON.stringify(content));
               var apiRequest : APIRequest = new APIRequest("IFile","setContent",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredFileDataStoreResultCallback);
          }
     }
}
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
