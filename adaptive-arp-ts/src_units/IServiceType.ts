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
        @enum {Adaptive.IServiceType} Adaptive.IServiceType
        Enumeration IServiceType
     */
     export class IServiceType {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IServiceType} [OctetBinary='OctetBinary']
          */
          static OctetBinary = new IServiceType("OctetBinary");
          /**
             @property {Adaptive.IServiceType} [RestJson='RestJson']
          */
          static RestJson = new IServiceType("RestJson");
          /**
             @property {Adaptive.IServiceType} [RestXml='RestXml']
          */
          static RestXml = new IServiceType("RestXml");
          /**
             @property {Adaptive.IServiceType} [SoapXml='SoapXml']
          */
          static SoapXml = new IServiceType("SoapXml");
          /**
             @property {Adaptive.IServiceType} [Unknown='Unknown']
          */
          static Unknown = new IServiceType("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IServiceType}
          */
          static toObject(object : any) : IServiceType {
               var retValue : IServiceType = IServiceType.Unknown;
               if (object != null && object.value != null && IServiceType.hasOwnProperty(object.value)) {
                    retValue = IServiceType[object.value];
               }
               return retValue;
          }

     }
}
