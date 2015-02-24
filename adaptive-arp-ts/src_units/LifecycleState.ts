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
        @enum {Adaptive.LifecycleState} Adaptive.LifecycleState
        Enumeration LifecycleState
     */
     export class LifecycleState {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.LifecycleState} [Starting='Starting']
          */
          static Starting = new LifecycleState("Starting");
          /**
             @property {Adaptive.LifecycleState} [Started='Started']
          */
          static Started = new LifecycleState("Started");
          /**
             @property {Adaptive.LifecycleState} [Running='Running']
          */
          static Running = new LifecycleState("Running");
          /**
             @property {Adaptive.LifecycleState} [Pausing='Pausing']
          */
          static Pausing = new LifecycleState("Pausing");
          /**
             @property {Adaptive.LifecycleState} [PausedIdle='PausedIdle']
          */
          static PausedIdle = new LifecycleState("PausedIdle");
          /**
             @property {Adaptive.LifecycleState} [PausedRun='PausedRun']
          */
          static PausedRun = new LifecycleState("PausedRun");
          /**
             @property {Adaptive.LifecycleState} [Resuming='Resuming']
          */
          static Resuming = new LifecycleState("Resuming");
          /**
             @property {Adaptive.LifecycleState} [Stopping='Stopping']
          */
          static Stopping = new LifecycleState("Stopping");
          /**
             @property {Adaptive.LifecycleState} [Unknown='Unknown']
          */
          static Unknown = new LifecycleState("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.LifecycleState}
          */
          static toObject(object : any) : LifecycleState {
               var retValue : LifecycleState = LifecycleState.Unknown;
               if (object != null && object.value != null && LifecycleState.hasOwnProperty(object.value)) {
                    retValue = LifecycleState[object.value];
               }
               return retValue;
          }

     }
}
