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
        @enum {Adaptive.IFileDataStoreResultCallbackError} Adaptive.IFileDataStoreResultCallbackError
        Enumeration IFileDataStoreResultCallbackError
     */
     export class IFileDataStoreResultCallbackError {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IFileDataStoreResultCallbackError} [InexistentFile='InexistentFile']
          */
          static InexistentFile = new IFileDataStoreResultCallbackError("InexistentFile");
          /**
             @property {Adaptive.IFileDataStoreResultCallbackError} [InsufficientSpace='InsufficientSpace']
          */
          static InsufficientSpace = new IFileDataStoreResultCallbackError("InsufficientSpace");
          /**
             @property {Adaptive.IFileDataStoreResultCallbackError} [Unauthorized='Unauthorized']
          */
          static Unauthorized = new IFileDataStoreResultCallbackError("Unauthorized");
          /**
             @property {Adaptive.IFileDataStoreResultCallbackError} [Unknown='Unknown']
          */
          static Unknown = new IFileDataStoreResultCallbackError("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IFileDataStoreResultCallbackError}
          */
          static toObject(object : any) : IFileDataStoreResultCallbackError {
               var retValue : IFileDataStoreResultCallbackError = IFileDataStoreResultCallbackError.Unknown;
               if (object != null && object.value != null && IFileDataStoreResultCallbackError.hasOwnProperty(object.value)) {
                    retValue = IFileDataStoreResultCallbackError[object.value];
               }
               return retValue;
          }

     }
}
