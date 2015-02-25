/// <reference path="FileDescriptor.d.ts" />
/// <reference path="IAdaptiveRPGroup.d.ts" />
/// <reference path="IBaseData.d.ts" />
/// <reference path="IFileDataLoadResultCallback.d.ts" />
/// <reference path="IFileDataStoreResultCallback.d.ts" />
/// <reference path="IFileListResultCallback.d.ts" />
/// <reference path="IFileResultCallback.d.ts" />
/// <reference path="IFileSystemSecurity.d.ts" />
/// <reference path="IFileSystemStorageType.d.ts" />
/// <reference path="IFileSystemType.d.ts" />
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
       Interface for Managing the File operations

       @author Carlos Lozano Diez
       @since v2.0
       @version 1.0
    */
    /**
       @class Adaptive.IFile
    */
    interface IFile extends IBaseData {
        /**
           @method
           Determine whether the current file/folder can be read from.
           @param descriptor File descriptor of file or folder used for operation.
           @return {boolean} True if the folder/file is readable, false otherwise.
           @since v2.0
        */
        canRead(descriptor: FileDescriptor): boolean;
        /**
           @method
           Determine whether the current file/folder can be written to.
           @param descriptor File descriptor of file or folder used for operation.
           @return {boolean} True if the folder/file is writable, false otherwise.
           @since v2.0
        */
        canWrite(descriptor: FileDescriptor): boolean;
        /**
           @method
           Creates a file with the specified name.
           @param descriptor File descriptor of file or folder used for operation.
           @param callback   Result of the operation.
           @since v2.0
        */
        create(descriptor: FileDescriptor, callback: IFileResultCallback): any;
        /**
           @method
           Deletes the given file or path. If the file is a directory and contains files and or subdirectories, these will be
deleted if the cascade parameter is set to true.
           @param descriptor File descriptor of file or folder used for operation.
           @param cascade    Whether to delete sub-files and sub-folders.
           @return {boolean} True if files (and sub-files and folders) whether deleted.
           @since v2.0
        */
        delete(descriptor: FileDescriptor, cascade: boolean): boolean;
        /**
           @method
           Check whether the file/path exists.
           @param descriptor File descriptor of file or folder used for operation.
           @return {boolean} True if the file exists in the filesystem, false otherwise.
           @since v2.0
        */
        exists(descriptor: FileDescriptor): boolean;
        /**
           @method
           Loads the content of the file.
           @param descriptor File descriptor of file or folder used for operation.
           @param callback   Result of the operation.
           @since v2.0
        */
        getContent(descriptor: FileDescriptor, callback: IFileDataLoadResultCallback): any;
        /**
           @method
           Returns the file storage type of the file
           @param descriptor File descriptor of file or folder used for operation.
           @return {Adaptive.IFileSystemStorageType} Storage Type file
           @since v2.0
        */
        getFileStorageType(descriptor: FileDescriptor): IFileSystemStorageType;
        /**
           @method
           Returns the file type
           @param descriptor File descriptor of file or folder used for operation.
           @return {Adaptive.IFileSystemType} Returns the file type of the file
           @since v2.0
        */
        getFileType(descriptor: FileDescriptor): IFileSystemType;
        /**
           @method
           Returns the security type of the file
           @param descriptor File descriptor of file or folder used for operation.
           @return {Adaptive.IFileSystemSecurity} Security Level of the file
           @since v2.0
        */
        getSecurityType(descriptor: FileDescriptor): IFileSystemSecurity;
        /**
           @method
           Check whether this is a path of a file.
           @param descriptor File descriptor of file or folder used for operation.
           @return {boolean} true if this is a path to a folder/directory, false if this is a path to a file.
           @since v2.0
        */
        isDirectory(descriptor: FileDescriptor): boolean;
        /**
           @method
           List all the files matching the speficied regex filter within this file/path reference. If the reference
is a file, it will not yield any results.
           @param descriptor File descriptor of file or folder used for operation.
           @param regex      Filter (eg. *.jpg, *.png, Fil*) name string.
           @param callback   Result of operation.
           @since v2.0
        */
        listFilesForRegex(descriptor: FileDescriptor, regex: string, callback: IFileListResultCallback): any;
        /**
           @method
           List all the files contained within this file/path reference. If the reference is a file, it will not yield
any results.
           @param descriptor File descriptor of file or folder used for operation.
           @param callback   Result of operation.
           @since v2.0
        */
        listFiles(descriptor: FileDescriptor, callback: IFileListResultCallback): any;
        /**
           @method
           Creates the parent path (or paths, if recursive) to the given file/path if it doesn't already exist.
           @param descriptor File descriptor of file or folder used for operation.
           @param recursive  Whether to create all parent path elements.
           @return {boolean} True if the path was created, false otherwise (or it exists already).
           @since v2.0
        */
        mkDir(descriptor: FileDescriptor, recursive: boolean): boolean;
        /**
           @method
           Moves the current file to the given file destination, optionally overwriting and creating the path to the
new destination file.
           @param source      File descriptor of file or folder used for operation as source.
           @param destination File descriptor of file or folder used for operation as destination.
           @param createPath  True to create the path if it does not already exist.
           @param callback    Result of the operation.
           @param overwrite   True to create the path if it does not already exist.
           @since v2.0
        */
        move(source: FileDescriptor, destination: FileDescriptor, createPath: boolean, overwrite: boolean, callback: IFileResultCallback): any;
        /**
           @method
           Sets the content of the file.
           @param descriptor File descriptor of file or folder used for operation.
           @param content    Binary content to store in the file.
           @param callback   Result of the operation.
           @since v2.0
        */
        setContent(descriptor: FileDescriptor, content: Array<number>, callback: IFileDataStoreResultCallback): any;
    }
}
