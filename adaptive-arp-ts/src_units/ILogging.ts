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

    * @version v2.2.15

-------------------------------------------| aut inveniam viam aut faciam |--------------------------------------------
*/

///<reference path="IAdaptiveRPGroup.ts"/>
///<reference path="IBaseUtil.ts"/>
///<reference path="ILoggingLogLevel.ts"/>

module Adaptive {

     /**
        Interface for Managing the Logging operations

        @author Ferran Vila Conesa
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.ILogging
     */
     export interface ILogging extends IBaseUtil {
          /**
             Logs the given message, with the given log level if specified, to the standard platform/environment.
             @param level    Log level
             @param category Category/tag name to identify/filter the log.
             @param message  Message to be logged
             @since v2.0
          */
          logLevelCategoryMessage(level:ILoggingLogLevel, category:string, message:string);
          /**
             Logs the given message, with the given log level if specified, to the standard platform/environment.
             @param level   Log level
             @param message Message to be logged
             @since v2.0
          */
          logLevelMessage(level:ILoggingLogLevel, message:string);
     }
}

/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
