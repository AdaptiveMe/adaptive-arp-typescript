/// <reference path="BaseCallback.d.ts" />
/// <reference path="CommonUtil.d.ts" />
/// <reference path="Database.d.ts" />
/// <reference path="IDatabaseResultCallback.d.ts" />
/// <reference path="IDatabaseResultCallbackError.d.ts" />
/// <reference path="IDatabaseResultCallbackWarning.d.ts" />
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
       Interface for Managing the Cloud operations
       Auto-generated implementation of IDatabaseResultCallback specification.
    */
    /**
       @property {Adaptive.Dictionary} registeredDatabaseResultCallback
       @member Adaptive
       @private
       DatabaseResultCallback control dictionary.
    */
    var registeredDatabaseResultCallback: Dictionary<IDatabaseResultCallback>;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IDatabaseResultCallbackError} error
    */
    function handleDatabaseResultCallbackError(id: number, error: IDatabaseResultCallbackError): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Database} database
    */
    function handleDatabaseResultCallbackResult(id: number, database: Database): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Database} database
       @param {Adaptive.IDatabaseResultCallbackWarning} warning
    */
    function handleDatabaseResultCallbackWarning(id: number, database: Database, warning: IDatabaseResultCallbackWarning): void;
    /**
       @class Adaptive.DatabaseResultCallback
       @extends Adaptive.BaseCallback
    */
    class DatabaseResultCallback extends BaseCallback implements IDatabaseResultCallback {
        /**
           @private
           @property
        */
        onErrorFunction: (error: IDatabaseResultCallbackError) => void;
        /**
           @private
           @property
        */
        onResultFunction: (database: Database) => void;
        /**
           @private
           @property
        */
        onWarningFunction: (database: Database, warning: IDatabaseResultCallbackWarning) => void;
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IDatabaseResultCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.Database
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.Database, Adaptive.IDatabaseResultCallbackWarning
        */
        constructor(onErrorFunction: (error: IDatabaseResultCallbackError) => void, onResultFunction: (database: Database) => void, onWarningFunction: (database: Database, warning: IDatabaseResultCallbackWarning) => void);
        /**
           @method
           Result callback for error responses
           @param {Adaptive.IDatabaseResultCallbackError} error error Returned error
           @since v2.0
        */
        onError(error: IDatabaseResultCallbackError): void;
        /**
           @method
           Result callback for correct responses
           @param {Adaptive.Database} database database Returns the database
           @since v2.0
        */
        onResult(database: Database): void;
        /**
           @method
           Result callback for warning responses
           @param {Adaptive.Database} database database Returns the database
           @param {Adaptive.IDatabaseResultCallbackWarning} warning warning  Returned Warning
           @since v2.0
        */
        onWarning(database: Database, warning: IDatabaseResultCallbackWarning): void;
    }
}
