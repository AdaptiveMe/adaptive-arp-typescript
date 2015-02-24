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
        @enum {Adaptive.IAdaptiveRPGroup} Adaptive.IAdaptiveRPGroup
        Enumeration IAdaptiveRPGroup
     */
     export class IAdaptiveRPGroup {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IAdaptiveRPGroup} [Application='Application']
          */
          static Application = new IAdaptiveRPGroup("Application");
          /**
             @property {Adaptive.IAdaptiveRPGroup} [Commerce='Commerce']
          */
          static Commerce = new IAdaptiveRPGroup("Commerce");
          /**
             @property {Adaptive.IAdaptiveRPGroup} [Communication='Communication']
          */
          static Communication = new IAdaptiveRPGroup("Communication");
          /**
             @property {Adaptive.IAdaptiveRPGroup} [Data='Data']
          */
          static Data = new IAdaptiveRPGroup("Data");
          /**
             @property {Adaptive.IAdaptiveRPGroup} [Media='Media']
          */
          static Media = new IAdaptiveRPGroup("Media");
          /**
             @property {Adaptive.IAdaptiveRPGroup} [Notification='Notification']
          */
          static Notification = new IAdaptiveRPGroup("Notification");
          /**
             @property {Adaptive.IAdaptiveRPGroup} [PIM='PIM']
          */
          static PIM = new IAdaptiveRPGroup("PIM");
          /**
             @property {Adaptive.IAdaptiveRPGroup} [Reader='Reader']
          */
          static Reader = new IAdaptiveRPGroup("Reader");
          /**
             @property {Adaptive.IAdaptiveRPGroup} [Security='Security']
          */
          static Security = new IAdaptiveRPGroup("Security");
          /**
             @property {Adaptive.IAdaptiveRPGroup} [Sensor='Sensor']
          */
          static Sensor = new IAdaptiveRPGroup("Sensor");
          /**
             @property {Adaptive.IAdaptiveRPGroup} [Social='Social']
          */
          static Social = new IAdaptiveRPGroup("Social");
          /**
             @property {Adaptive.IAdaptiveRPGroup} [System='System']
          */
          static System = new IAdaptiveRPGroup("System");
          /**
             @property {Adaptive.IAdaptiveRPGroup} [UI='UI']
          */
          static UI = new IAdaptiveRPGroup("UI");
          /**
             @property {Adaptive.IAdaptiveRPGroup} [Util='Util']
          */
          static Util = new IAdaptiveRPGroup("Util");
          /**
             @property {Adaptive.IAdaptiveRPGroup} [Kernel='Kernel']
          */
          static Kernel = new IAdaptiveRPGroup("Kernel");
          /**
             @property {Adaptive.IAdaptiveRPGroup} [Unknown='Unknown']
          */
          static Unknown = new IAdaptiveRPGroup("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IAdaptiveRPGroup}
          */
          static toObject(object : any) : IAdaptiveRPGroup {
               var retValue : IAdaptiveRPGroup = IAdaptiveRPGroup.Unknown;
               if (object != null && object.value != null && IAdaptiveRPGroup.hasOwnProperty(object.value)) {
                    retValue = IAdaptiveRPGroup[object.value];
               }
               return retValue;
          }

     }
}
