/// <reference path="FileDescriptor.d.ts" />
/// <reference path="IAdaptiveRPGroup.d.ts" />
/// <reference path="IBaseData.d.ts" />
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
       Interface for Managing the File System operations

       @author Carlos Lozano Diez
       @since v2.0
       @version 1.0
    */
    /**
       @class Adaptive.IFileSystem
    */
    interface IFileSystem extends IBaseData {
        /**
           @method
           Creates a new reference to a new or existing location in the filesystem.
This method does not create the actual file in the specified folder.
           @param parent Parent directory.
           @param name   Name of new file or directory.
           @return {Adaptive.FileDescriptor} A reference to a new or existing location in the filesystem.
           @since v2.0
        */
        createFileDescriptor(parent: FileDescriptor, name: string): FileDescriptor;
        /**
           @method
           Returns a reference to the cache folder for the current application.
This path must always be writable by the current application.
This path is volatile and may be cleaned by the OS periodically.
           @return {Adaptive.FileDescriptor} Path to the application's cache folder.
           @since v2.0
        */
        getApplicationCacheFolder(): FileDescriptor;
        /**
           @method
           Returns a reference to the cloud synchronizable folder for the current application.
This path must always be writable by the current application.
           @return {Adaptive.FileDescriptor} Path to the application's cloud storage folder.
           @since v2.0
        */
        getApplicationCloudFolder(): FileDescriptor;
        /**
           @method
           Returns a reference to the documents folder for the current application.
This path must always be writable by the current application.
           @return {Adaptive.FileDescriptor} Path to the application's documents folder.
           @since v2.0
        */
        getApplicationDocumentsFolder(): FileDescriptor;
        /**
           @method
           Returns a reference to the application installation folder.
This path may or may not be directly readable or writable - it usually contains the app binary and data.
           @return {Adaptive.FileDescriptor} Path to the application folder.
           @since v2.0
        */
        getApplicationFolder(): FileDescriptor;
        /**
           @method
           Returns a reference to the protected storage folder for the current application.
This path must always be writable by the current application.
           @return {Adaptive.FileDescriptor} Path to the application's protected storage folder.
           @since v2.0
        */
        getApplicationProtectedFolder(): FileDescriptor;
        /**
           @method
           Returns the file system dependent file separator.
           @return {string} char with the directory/file separator.
           @since v2.0
        */
        getSeparator(): string;
        /**
           @method
           Returns a reference to the external storage folder provided by the OS. This may
be an external SSD card or similar. This type of storage is removable and by
definition, not secure.
This path may or may not be writable by the current application.
           @return {Adaptive.FileDescriptor} Path to the application's documents folder.
           @since v2.0
        */
        getSystemExternalFolder(): FileDescriptor;
    }
}
