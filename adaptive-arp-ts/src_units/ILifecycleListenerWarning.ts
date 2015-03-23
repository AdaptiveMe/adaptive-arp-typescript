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
        @enum {Adaptive.ILifecycleListenerWarning} Adaptive.ILifecycleListenerWarning
        Enumeration ILifecycleListenerWarning
     */
     export class ILifecycleListenerWarning {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.ILifecycleListenerWarning} [MemoryLow='MemoryLow']
          */
          static MemoryLow = new ILifecycleListenerWarning("MemoryLow");
          /**
             @property {Adaptive.ILifecycleListenerWarning} [BatteryLow='BatteryLow']
          */
          static BatteryLow = new ILifecycleListenerWarning("BatteryLow");
          /**
             @property {Adaptive.ILifecycleListenerWarning} [Unknown='Unknown']
          */
          static Unknown = new ILifecycleListenerWarning("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.ILifecycleListenerWarning}
          */
          static toObject(object : any) : ILifecycleListenerWarning {
               var retValue : ILifecycleListenerWarning = ILifecycleListenerWarning.Unknown;
               if (object != null && object.value != null && ILifecycleListenerWarning.hasOwnProperty(object.value)) {
                    retValue = ILifecycleListenerWarning[object.value];
               }
               return retValue;
          }

     }
}
