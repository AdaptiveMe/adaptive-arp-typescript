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
        @enum {Adaptive.IServiceResultCallbackError} Adaptive.IServiceResultCallbackError
        Enumeration IServiceResultCallbackError
     */
     export class IServiceResultCallbackError {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IServiceResultCallbackError} [TimeOut='TimeOut']
          */
          static TimeOut = new IServiceResultCallbackError("TimeOut");
          /**
             @property {Adaptive.IServiceResultCallbackError} [NoResponse='NoResponse']
          */
          static NoResponse = new IServiceResultCallbackError("NoResponse");
          /**
             @property {Adaptive.IServiceResultCallbackError} [Unreachable='Unreachable']
          */
          static Unreachable = new IServiceResultCallbackError("Unreachable");
          /**
             @property {Adaptive.IServiceResultCallbackError} [MalformedUrl='MalformedUrl']
          */
          static MalformedUrl = new IServiceResultCallbackError("MalformedUrl");
          /**
             @property {Adaptive.IServiceResultCallbackError} [NotRegisteredService='NotRegisteredService']
          */
          static NotRegisteredService = new IServiceResultCallbackError("NotRegisteredService");
          /**
             @property {Adaptive.IServiceResultCallbackError} [Unknown='Unknown']
          */
          static Unknown = new IServiceResultCallbackError("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IServiceResultCallbackError}
          */
          static toObject(object : any) : IServiceResultCallbackError {
               var retValue : IServiceResultCallbackError = IServiceResultCallbackError.Unknown;
               if (object != null && object.value != null && IServiceResultCallbackError.hasOwnProperty(object.value)) {
                    retValue = IServiceResultCallbackError[object.value];
               }
               return retValue;
          }

     }
}
