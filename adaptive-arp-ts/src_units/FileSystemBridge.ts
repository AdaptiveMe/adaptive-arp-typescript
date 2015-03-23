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
///<reference path="FileDescriptor.ts"/>
///<reference path="IAdaptiveRPGroup.ts"/>
///<reference path="IBaseData.ts"/>
///<reference path="IFileSystem.ts"/>
module Adaptive {

     /**
        @class Adaptive.FileSystemBridge
        @extends Adaptive.BaseDataBridge
        Interface for Managing the File System operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class FileSystemBridge extends BaseDataBridge implements IFileSystem {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }

          /**
             @method
             Creates a new reference to a new or existing location in the filesystem.
This method does not create the actual file in the specified folder.

             @param {Adaptive.FileDescriptor} parent parent Parent directory.
             @param {string} name name   Name of new file or directory.
             @return {Adaptive.FileDescriptor} A reference to a new or existing location in the filesystem.
             @since v2.0
          */
          createFileDescriptor(parent : FileDescriptor, name : string) : FileDescriptor {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(parent));
               arParams.push(JSON.stringify(name));
               var apiRequest : APIRequest = new APIRequest("IFileSystem","createFileDescriptor",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : FileDescriptor = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = FileDescriptor.toObject(JSON.parse(apiResponse.getResponse()));
               }
               return response;
          }

          /**
             @method
             Returns a reference to the cache folder for the current application.
This path must always be writable by the current application.
This path is volatile and may be cleaned by the OS periodically.

             @return {Adaptive.FileDescriptor} Path to the application's cache folder.
             @since v2.0
          */
          getApplicationCacheFolder() : FileDescriptor {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IFileSystem","getApplicationCacheFolder",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : FileDescriptor = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = FileDescriptor.toObject(JSON.parse(apiResponse.getResponse()));
               }
               return response;
          }

          /**
             @method
             Returns a reference to the cloud synchronizable folder for the current application.
This path must always be writable by the current application.

             @return {Adaptive.FileDescriptor} Path to the application's cloud storage folder.
             @since v2.0
          */
          getApplicationCloudFolder() : FileDescriptor {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IFileSystem","getApplicationCloudFolder",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : FileDescriptor = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = FileDescriptor.toObject(JSON.parse(apiResponse.getResponse()));
               }
               return response;
          }

          /**
             @method
             Returns a reference to the documents folder for the current application.
This path must always be writable by the current application.

             @return {Adaptive.FileDescriptor} Path to the application's documents folder.
             @since v2.0
          */
          getApplicationDocumentsFolder() : FileDescriptor {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IFileSystem","getApplicationDocumentsFolder",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : FileDescriptor = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = FileDescriptor.toObject(JSON.parse(apiResponse.getResponse()));
               }
               return response;
          }

          /**
             @method
             Returns a reference to the application installation folder.
This path may or may not be directly readable or writable - it usually contains the app binary and data.

             @return {Adaptive.FileDescriptor} Path to the application folder.
             @since v2.0
          */
          getApplicationFolder() : FileDescriptor {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IFileSystem","getApplicationFolder",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : FileDescriptor = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = FileDescriptor.toObject(JSON.parse(apiResponse.getResponse()));
               }
               return response;
          }

          /**
             @method
             Returns a reference to the protected storage folder for the current application.
This path must always be writable by the current application.

             @return {Adaptive.FileDescriptor} Path to the application's protected storage folder.
             @since v2.0
          */
          getApplicationProtectedFolder() : FileDescriptor {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IFileSystem","getApplicationProtectedFolder",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : FileDescriptor = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = FileDescriptor.toObject(JSON.parse(apiResponse.getResponse()));
               }
               return response;
          }

          /**
             @method
             Returns the file system dependent file separator.

             @return {string} char with the directory/file separator.
             @since v2.0
          */
          getSeparator() : string {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IFileSystem","getSeparator",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : string = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = apiResponse.getResponse();
               }
               return response;
          }

          /**
             @method
             Returns a reference to the external storage folder provided by the OS. This may
be an external SSD card or similar. This type of storage is removable and by
definition, not secure.
This path may or may not be writable by the current application.

             @return {Adaptive.FileDescriptor} Path to the application's documents folder.
             @since v2.0
          */
          getSystemExternalFolder() : FileDescriptor {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IFileSystem","getSystemExternalFolder",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : FileDescriptor = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = FileDescriptor.toObject(JSON.parse(apiResponse.getResponse()));
               }
               return response;
          }
     }
}
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
