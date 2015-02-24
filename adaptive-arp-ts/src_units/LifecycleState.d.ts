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
declare module Adaptive {
    /**
       @enum {Adaptive.LifecycleState} Adaptive.LifecycleState
       Enumeration LifecycleState
    */
    class LifecycleState {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.LifecycleState} [Starting='Starting']
        */
        static Starting: LifecycleState;
        /**
           @property {Adaptive.LifecycleState} [Started='Started']
        */
        static Started: LifecycleState;
        /**
           @property {Adaptive.LifecycleState} [Running='Running']
        */
        static Running: LifecycleState;
        /**
           @property {Adaptive.LifecycleState} [Pausing='Pausing']
        */
        static Pausing: LifecycleState;
        /**
           @property {Adaptive.LifecycleState} [PausedIdle='PausedIdle']
        */
        static PausedIdle: LifecycleState;
        /**
           @property {Adaptive.LifecycleState} [PausedRun='PausedRun']
        */
        static PausedRun: LifecycleState;
        /**
           @property {Adaptive.LifecycleState} [Resuming='Resuming']
        */
        static Resuming: LifecycleState;
        /**
           @property {Adaptive.LifecycleState} [Stopping='Stopping']
        */
        static Stopping: LifecycleState;
        /**
           @property {Adaptive.LifecycleState} [Unknown='Unknown']
        */
        static Unknown: LifecycleState;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.LifecycleState}
        */
        static toObject(object: any): LifecycleState;
    }
}
