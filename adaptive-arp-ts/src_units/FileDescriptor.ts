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

///<reference path="APIBean.ts"/>

module Adaptive {

     /**
        @class Adaptive.FileDescriptor
        @extends Adaptive.APIBean
        Implementation of FileDescriptor bean.

        @author Carlos Lozano Diez
        @since 1.0
        @version 1.0
     */
     export class FileDescriptor extends APIBean {

          dateCreated : number;

          get dateCreatedProperty() : number {
               return this.dateCreated;
          }

          set dateCreatedProperty(dateCreated:number) {
               this.dateCreated = dateCreated;
          }

          dateModified : number;

          get dateModifiedProperty() : number {
               return this.dateModified;
          }

          set dateModifiedProperty(dateModified:number) {
               this.dateModified = dateModified;
          }

          name : string;

          get nameProperty() : string {
               return this.name;
          }

          set nameProperty(name:string) {
               this.name = name;
          }

          path : string;

          get pathProperty() : string {
               return this.path;
          }

          set pathProperty(path:string) {
               this.path = path;
          }

          pathAbsolute : string;

          get pathAbsoluteProperty() : string {
               return this.pathAbsolute;
          }

          set pathAbsoluteProperty(pathAbsolute:string) {
               this.pathAbsolute = pathAbsolute;
          }

          size : number;

          get sizeProperty() : number {
               return this.size;
          }

          set sizeProperty(size:number) {
               this.size = size;
          }

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }

          /**
             @method
             Returns the milliseconds passed since 1/1/1970 since the file was created.

             @return {number} Timestamp in milliseconds.
             @since v2.0
          */
          getDateCreated() : number {
               return this.dateCreated;
          }

          /**
             @method
             Sets the creation timestamp in milliseconds. Used internally.

             @param {number} dateCreated Timestamp of file creation or -1 if the file or folder doesn't exist.
          */
          setDateCreated(dateCreated: number) {
               this.dateCreated = dateCreated;
          }

          /**
             @method
             Returns the milliseconds passed since 1/1/1970 since the file was modified.

             @return {number} Timestamp in milliseconds.
             @since v2.0
          */
          getDateModified() : number {
               return this.dateModified;
          }

          /**
             @method
             Sets the file or folder modification timestamp in milliseconds. Used internally.

             @param {number} dateModified Timestamp of file modification or -1 if the file or folder doesn't exist.
          */
          setDateModified(dateModified: number) {
               this.dateModified = dateModified;
          }

          /**
             @method
             Returns the name of the file if the reference is a file or the last path element of the folder.

             @return {string} The name of the file.
             @since v2.0
          */
          getName() : string {
               return this.name;
          }

          /**
             @method
             Sets the name of the file. Used internally.

             @param {string} name Name of the file or last folder path element.
          */
          setName(name: string) {
               this.name = name;
          }

          /**
             @method
             Returns the path element of the file or folder (excluding the last path element if it's a directory).

             @return {string} The path to the file.
             @since v2.0
          */
          getPath() : string {
               return this.path;
          }

          /**
             @method
             Sets the path of the file or folder. Used internally.

             @param {string} path The path element of the file or folder.
          */
          setPath(path: string) {
               this.path = path;
          }

          /**
             @method
             Returns the resolved absolute path elements of the file and/or folders (including the last path element).

             @return {string} The absolute path to the file.
             @since v2.0
          */
          getPathAbsolute() : string {
               return this.pathAbsolute;
          }

          /**
             @method
             Sets the absolute path of the file or folder. Used internally.

             @param {string} pathAbsolute String with the absolute path of file or folder.
          */
          setPathAbsolute(pathAbsolute: string) {
               this.pathAbsolute = pathAbsolute;
          }

          /**
             @method
             Returns the size in bytes of the file or -1 if the reference is a folder.

             @return {number} Size in bytes of file.
             @since v2.0
          */
          getSize() : number {
               return this.size;
          }

          /**
             @method
             Sets the file size in bytes of the file. If the file is a folder, this will be 0. If the file
doesn't exist, this will be -1. Used internally.

             @param {number} size The size in bytes of the file.
          */
          setSize(size: number) {
               this.size = size;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.FileDescriptor.
             @return {Adaptive.FileDescriptor} Wrapped object instance.
          */
          static toObject(object : any) : FileDescriptor {
               var result : FileDescriptor = new FileDescriptor();

               if (object != null ) {
                    // Assign values to bean fields.
                    result.name = object.name;
                    result.path = object.path;
                    result.pathAbsolute = object.pathAbsolute;
                    result.dateCreated = object.dateCreated;
                    result.dateModified = object.dateModified;
                    result.size = object.size;

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.FileDescriptor[].
             @return {Adaptive.FileDescriptor[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : FileDescriptor[] {
               var resultArray : Array<FileDescriptor> = new Array<FileDescriptor>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(FileDescriptor.toObject(object[i]));
                    }
               }
               return resultArray;
          }

     }
}

/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
