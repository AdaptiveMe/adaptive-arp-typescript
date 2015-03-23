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

module Adaptive {

     /**
        @enum {Adaptive.IFileSystemStorageType} Adaptive.IFileSystemStorageType
        Enumeration IFileSystemStorageType
     */
     export class IFileSystemStorageType {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IFileSystemStorageType} [Application='Application']
          */
          static Application = new IFileSystemStorageType("Application");
          /**
             @property {Adaptive.IFileSystemStorageType} [Document='Document']
          */
          static Document = new IFileSystemStorageType("Document");
          /**
             @property {Adaptive.IFileSystemStorageType} [Cloud='Cloud']
          */
          static Cloud = new IFileSystemStorageType("Cloud");
          /**
             @property {Adaptive.IFileSystemStorageType} [Protected='Protected']
          */
          static Protected = new IFileSystemStorageType("Protected");
          /**
             @property {Adaptive.IFileSystemStorageType} [Cache='Cache']
          */
          static Cache = new IFileSystemStorageType("Cache");
          /**
             @property {Adaptive.IFileSystemStorageType} [External='External']
          */
          static External = new IFileSystemStorageType("External");
          /**
             @property {Adaptive.IFileSystemStorageType} [Unknown='Unknown']
          */
          static Unknown = new IFileSystemStorageType("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IFileSystemStorageType}
          */
          static toObject(object : any) : IFileSystemStorageType {
               var retValue : IFileSystemStorageType = IFileSystemStorageType.Unknown;
               if (object != null && object.value != null && IFileSystemStorageType.hasOwnProperty(object.value)) {
                    retValue = IFileSystemStorageType[object.value];
               }
               return retValue;
          }

     }
}
