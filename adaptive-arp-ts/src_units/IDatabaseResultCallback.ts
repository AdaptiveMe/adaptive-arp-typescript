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

///<reference path="Database.ts"/>
///<reference path="IAdaptiveRPGroup.ts"/>
///<reference path="IBaseCallback.ts"/>
///<reference path="IDatabaseResultCallbackError.ts"/>
///<reference path="IDatabaseResultCallbackWarning.ts"/>

module Adaptive {

     /**
        Interface for Managing the Cloud operations

        @author Ferran Vila Conesa
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IDatabaseResultCallback
     */
     export interface IDatabaseResultCallback extends IBaseCallback {
          /**
             @method
             Result callback for error responses
             @param error Returned error
             @since v2.0
          */
          onError(error:IDatabaseResultCallbackError);
          /**
             @method
             Result callback for correct responses
             @param database Returns the database
             @since v2.0
          */
          onResult(database:Database);
          /**
             @method
             Result callback for warning responses
             @param database Returns the database
             @param warning  Returned Warning
             @since v2.0
          */
          onWarning(database:Database, warning:IDatabaseResultCallbackWarning);
     }
}

/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
