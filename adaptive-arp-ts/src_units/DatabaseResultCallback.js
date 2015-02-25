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
var __extends = this.__extends || function (d, b) {
    for (var p in b) { if (b.hasOwnProperty(p)) { d[p] = b[p]; } }
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="BaseCallback.ts"/>
///<reference path="CommonUtil.ts"/>
///<reference path="Database.ts"/>
///<reference path="IDatabaseResultCallback.ts"/>
///<reference path="IDatabaseResultCallbackError.ts"/>
///<reference path="IDatabaseResultCallbackWarning.ts"/>
var Adaptive;
(function (Adaptive) {
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
    Adaptive.registeredDatabaseResultCallback = new Adaptive.Dictionary([]);
    // DatabaseResultCallback global listener handlers.
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IDatabaseResultCallbackError} error
    */
    function handleDatabaseResultCallbackError(id, error) {
        var callback = Adaptive.registeredDatabaseResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredDatabaseResultCallback dictionary.");
        }
        else {
            Adaptive.registeredDatabaseResultCallback.remove("" + id);
            callback.onError(error);
        }
    }
    Adaptive.handleDatabaseResultCallbackError = handleDatabaseResultCallbackError;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Database} database
    */
    function handleDatabaseResultCallbackResult(id, database) {
        var callback = Adaptive.registeredDatabaseResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredDatabaseResultCallback dictionary.");
        }
        else {
            Adaptive.registeredDatabaseResultCallback.remove("" + id);
            callback.onResult(database);
        }
    }
    Adaptive.handleDatabaseResultCallbackResult = handleDatabaseResultCallbackResult;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Database} database
       @param {Adaptive.IDatabaseResultCallbackWarning} warning
    */
    function handleDatabaseResultCallbackWarning(id, database, warning) {
        var callback = Adaptive.registeredDatabaseResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredDatabaseResultCallback dictionary.");
        }
        else {
            Adaptive.registeredDatabaseResultCallback.remove("" + id);
            callback.onWarning(database, warning);
        }
    }
    Adaptive.handleDatabaseResultCallbackWarning = handleDatabaseResultCallbackWarning;
    /**
       @class Adaptive.DatabaseResultCallback
       @extends Adaptive.BaseCallback
    */
    var DatabaseResultCallback = (function (_super) {
        __extends(DatabaseResultCallback, _super);
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IDatabaseResultCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.Database
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.Database, Adaptive.IDatabaseResultCallbackWarning
        */
        function DatabaseResultCallback(onErrorFunction, onResultFunction, onWarningFunction) {
            _super.call(this, ++Adaptive.registeredCounter);
            if (onErrorFunction == null) {
                console.error("ERROR: DatabaseResultCallback onErrorFunction is not defined.");
            }
            else {
                this.onErrorFunction = onErrorFunction;
            }
            if (onResultFunction == null) {
                console.error("ERROR: DatabaseResultCallback onResultFunction is not defined.");
            }
            else {
                this.onResultFunction = onResultFunction;
            }
            if (onWarningFunction == null) {
                console.error("ERROR: DatabaseResultCallback onWarningFunction is not defined.");
            }
            else {
                this.onWarningFunction = onWarningFunction;
            }
        }
        /**
           @method
           Result callback for error responses
           @param {Adaptive.IDatabaseResultCallbackError} error error Returned error
           @since v2.0
        */
        DatabaseResultCallback.prototype.onError = function (error) {
            if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                console.warn("WARNING: DatabaseResultCallback contains a null reference to onErrorFunction.");
            }
            else {
                this.onErrorFunction(error);
            }
        };
        /**
           @method
           Result callback for correct responses
           @param {Adaptive.Database} database database Returns the database
           @since v2.0
        */
        DatabaseResultCallback.prototype.onResult = function (database) {
            if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                console.warn("WARNING: DatabaseResultCallback contains a null reference to onResultFunction.");
            }
            else {
                this.onResultFunction(database);
            }
        };
        /**
           @method
           Result callback for warning responses
           @param {Adaptive.Database} database database Returns the database
           @param {Adaptive.IDatabaseResultCallbackWarning} warning warning  Returned Warning
           @since v2.0
        */
        DatabaseResultCallback.prototype.onWarning = function (database, warning) {
            if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                console.warn("WARNING: DatabaseResultCallback contains a null reference to onWarningFunction.");
            }
            else {
                this.onWarningFunction(database, warning);
            }
        };
        return DatabaseResultCallback;
    })(Adaptive.BaseCallback);
    Adaptive.DatabaseResultCallback = DatabaseResultCallback;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=DatabaseResultCallback.js.map