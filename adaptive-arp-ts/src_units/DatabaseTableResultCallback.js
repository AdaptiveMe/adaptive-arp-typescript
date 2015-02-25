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
///<reference path="DatabaseTable.ts"/>
///<reference path="IDatabaseTableResultCallback.ts"/>
///<reference path="IDatabaseTableResultCallbackError.ts"/>
///<reference path="IDatabaseTableResultCallbackWarning.ts"/>
var Adaptive;
(function (Adaptive) {
    /**
       Interface for Managing the Cloud operations
       Auto-generated implementation of IDatabaseTableResultCallback specification.
    */
    /**
       @property {Adaptive.Dictionary} registeredDatabaseTableResultCallback
       @member Adaptive
       @private
       DatabaseTableResultCallback control dictionary.
    */
    Adaptive.registeredDatabaseTableResultCallback = new Adaptive.Dictionary([]);
    // DatabaseTableResultCallback global listener handlers.
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IDatabaseTableResultCallbackError} error
    */
    function handleDatabaseTableResultCallbackError(id, error) {
        var callback = Adaptive.registeredDatabaseTableResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredDatabaseTableResultCallback dictionary.");
        }
        else {
            Adaptive.registeredDatabaseTableResultCallback.remove("" + id);
            callback.onError(error);
        }
    }
    Adaptive.handleDatabaseTableResultCallbackError = handleDatabaseTableResultCallbackError;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.DatabaseTable} databaseTable
    */
    function handleDatabaseTableResultCallbackResult(id, databaseTable) {
        var callback = Adaptive.registeredDatabaseTableResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredDatabaseTableResultCallback dictionary.");
        }
        else {
            Adaptive.registeredDatabaseTableResultCallback.remove("" + id);
            callback.onResult(databaseTable);
        }
    }
    Adaptive.handleDatabaseTableResultCallbackResult = handleDatabaseTableResultCallbackResult;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.DatabaseTable} databaseTable
       @param {Adaptive.IDatabaseTableResultCallbackWarning} warning
    */
    function handleDatabaseTableResultCallbackWarning(id, databaseTable, warning) {
        var callback = Adaptive.registeredDatabaseTableResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredDatabaseTableResultCallback dictionary.");
        }
        else {
            Adaptive.registeredDatabaseTableResultCallback.remove("" + id);
            callback.onWarning(databaseTable, warning);
        }
    }
    Adaptive.handleDatabaseTableResultCallbackWarning = handleDatabaseTableResultCallbackWarning;
    /**
       @class Adaptive.DatabaseTableResultCallback
       @extends Adaptive.BaseCallback
    */
    var DatabaseTableResultCallback = (function (_super) {
        __extends(DatabaseTableResultCallback, _super);
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IDatabaseTableResultCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.DatabaseTable
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.DatabaseTable, Adaptive.IDatabaseTableResultCallbackWarning
        */
        function DatabaseTableResultCallback(onErrorFunction, onResultFunction, onWarningFunction) {
            _super.call(this, ++Adaptive.registeredCounter);
            if (onErrorFunction == null) {
                console.error("ERROR: DatabaseTableResultCallback onErrorFunction is not defined.");
            }
            else {
                this.onErrorFunction = onErrorFunction;
            }
            if (onResultFunction == null) {
                console.error("ERROR: DatabaseTableResultCallback onResultFunction is not defined.");
            }
            else {
                this.onResultFunction = onResultFunction;
            }
            if (onWarningFunction == null) {
                console.error("ERROR: DatabaseTableResultCallback onWarningFunction is not defined.");
            }
            else {
                this.onWarningFunction = onWarningFunction;
            }
        }
        /**
           @method
           Result callback for error responses
           @param {Adaptive.IDatabaseTableResultCallbackError} error error Returned error
           @since v2.0
        */
        DatabaseTableResultCallback.prototype.onError = function (error) {
            if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                console.warn("WARNING: DatabaseTableResultCallback contains a null reference to onErrorFunction.");
            }
            else {
                this.onErrorFunction(error);
            }
        };
        /**
           @method
           Result callback for correct responses
           @param {Adaptive.DatabaseTable} databaseTable databaseTable Returns the databaseTable
           @since v2.0
        */
        DatabaseTableResultCallback.prototype.onResult = function (databaseTable) {
            if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                console.warn("WARNING: DatabaseTableResultCallback contains a null reference to onResultFunction.");
            }
            else {
                this.onResultFunction(databaseTable);
            }
        };
        /**
           @method
           Result callback for warning responses
           @param {Adaptive.DatabaseTable} databaseTable databaseTable Returns the databaseTable
           @param {Adaptive.IDatabaseTableResultCallbackWarning} warning warning       Returned Warning
           @since v2.0
        */
        DatabaseTableResultCallback.prototype.onWarning = function (databaseTable, warning) {
            if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                console.warn("WARNING: DatabaseTableResultCallback contains a null reference to onWarningFunction.");
            }
            else {
                this.onWarningFunction(databaseTable, warning);
            }
        };
        return DatabaseTableResultCallback;
    })(Adaptive.BaseCallback);
    Adaptive.DatabaseTableResultCallback = DatabaseTableResultCallback;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=DatabaseTableResultCallback.js.map