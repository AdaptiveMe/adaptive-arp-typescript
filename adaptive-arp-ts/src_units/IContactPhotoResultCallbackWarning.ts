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
        @enum {Adaptive.IContactPhotoResultCallbackWarning} Adaptive.IContactPhotoResultCallbackWarning
        Enumeration IContactPhotoResultCallbackWarning
     */
     export class IContactPhotoResultCallbackWarning {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IContactPhotoResultCallbackWarning} [LimitExceeded='LimitExceeded']
          */
          static LimitExceeded = new IContactPhotoResultCallbackWarning("LimitExceeded");
          /**
             @property {Adaptive.IContactPhotoResultCallbackWarning} [NoMatches='NoMatches']
          */
          static NoMatches = new IContactPhotoResultCallbackWarning("NoMatches");
          /**
             @property {Adaptive.IContactPhotoResultCallbackWarning} [Unknown='Unknown']
          */
          static Unknown = new IContactPhotoResultCallbackWarning("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IContactPhotoResultCallbackWarning}
          */
          static toObject(object : any) : IContactPhotoResultCallbackWarning {
               var retValue : IContactPhotoResultCallbackWarning = IContactPhotoResultCallbackWarning.Unknown;
               if (object != null && object.value != null && IContactPhotoResultCallbackWarning.hasOwnProperty(object.value)) {
                    retValue = IContactPhotoResultCallbackWarning[object.value];
               }
               return retValue;
          }

     }
}
