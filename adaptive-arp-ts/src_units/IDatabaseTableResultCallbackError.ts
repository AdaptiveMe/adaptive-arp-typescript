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
        @enum {Adaptive.IDatabaseTableResultCallbackError} Adaptive.IDatabaseTableResultCallbackError
        Enumeration IDatabaseTableResultCallbackError
     */
     export class IDatabaseTableResultCallbackError {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IDatabaseTableResultCallbackError} [NoSpace='NoSpace']
          */
          static NoSpace = new IDatabaseTableResultCallbackError("NoSpace");
          /**
             @property {Adaptive.IDatabaseTableResultCallbackError} [ReadOnlyTable='ReadOnlyTable']
          */
          static ReadOnlyTable = new IDatabaseTableResultCallbackError("ReadOnlyTable");
          /**
             @property {Adaptive.IDatabaseTableResultCallbackError} [SqlException='SqlException']
          */
          static SqlException = new IDatabaseTableResultCallbackError("SqlException");
          /**
             @property {Adaptive.IDatabaseTableResultCallbackError} [DatabaseNotFound='DatabaseNotFound']
          */
          static DatabaseNotFound = new IDatabaseTableResultCallbackError("DatabaseNotFound");
          /**
             @property {Adaptive.IDatabaseTableResultCallbackError} [NoTableFound='NoTableFound']
          */
          static NoTableFound = new IDatabaseTableResultCallbackError("NoTableFound");
          /**
             @property {Adaptive.IDatabaseTableResultCallbackError} [Unknown='Unknown']
          */
          static Unknown = new IDatabaseTableResultCallbackError("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IDatabaseTableResultCallbackError}
          */
          static toObject(object : any) : IDatabaseTableResultCallbackError {
               var retValue : IDatabaseTableResultCallbackError = IDatabaseTableResultCallbackError.Unknown;
               if (object != null && object.value != null && IDatabaseTableResultCallbackError.hasOwnProperty(object.value)) {
                    retValue = IDatabaseTableResultCallbackError[object.value];
               }
               return retValue;
          }

     }
}
