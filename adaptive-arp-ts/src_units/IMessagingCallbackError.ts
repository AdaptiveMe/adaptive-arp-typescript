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
        @enum {Adaptive.IMessagingCallbackError} Adaptive.IMessagingCallbackError
        Enumeration IMessagingCallbackError
     */
     export class IMessagingCallbackError {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IMessagingCallbackError} [SIMNotPresent='SIMNotPresent']
          */
          static SIMNotPresent = new IMessagingCallbackError("SIMNotPresent");
          /**
             @property {Adaptive.IMessagingCallbackError} [EmailAccountNotFound='EmailAccountNotFound']
          */
          static EmailAccountNotFound = new IMessagingCallbackError("EmailAccountNotFound");
          /**
             @property {Adaptive.IMessagingCallbackError} [NotSent='NotSent']
          */
          static NotSent = new IMessagingCallbackError("NotSent");
          /**
             @property {Adaptive.IMessagingCallbackError} [WrongParams='WrongParams']
          */
          static WrongParams = new IMessagingCallbackError("WrongParams");
          /**
             @property {Adaptive.IMessagingCallbackError} [NotSupported='NotSupported']
          */
          static NotSupported = new IMessagingCallbackError("NotSupported");
          /**
             @property {Adaptive.IMessagingCallbackError} [Unknown='Unknown']
          */
          static Unknown = new IMessagingCallbackError("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IMessagingCallbackError}
          */
          static toObject(object : any) : IMessagingCallbackError {
               var retValue : IMessagingCallbackError = IMessagingCallbackError.Unknown;
               if (object != null && object.value != null && IMessagingCallbackError.hasOwnProperty(object.value)) {
                    retValue = IMessagingCallbackError[object.value];
               }
               return retValue;
          }

     }
}
