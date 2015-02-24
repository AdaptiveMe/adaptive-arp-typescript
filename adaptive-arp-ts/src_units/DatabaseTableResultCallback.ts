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

///<reference path="BaseCallback.ts"/>
///<reference path="CommonUtil.ts"/>
///<reference path="DatabaseTable.ts"/>
///<reference path="IDatabaseTableResultCallback.ts"/>
///<reference path="IDatabaseTableResultCallbackError.ts"/>
///<reference path="IDatabaseTableResultCallbackWarning.ts"/>

module Adaptive {

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
     export var registeredDatabaseTableResultCallback = new Dictionary<IDatabaseTableResultCallback>([]);


        // DatabaseTableResultCallback global listener handlers.

     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.IDatabaseTableResultCallbackError} error
     */
     export function handleDatabaseTableResultCallbackError(id : number, error : IDatabaseTableResultCallbackError) : void {
          var callback : IDatabaseTableResultCallback = registeredDatabaseTableResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredDatabaseTableResultCallback dictionary.");
          } else {
               registeredDatabaseTableResultCallback.remove(""+id);
               callback.onError(error);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.DatabaseTable} databaseTable
     */
     export function handleDatabaseTableResultCallbackResult(id : number, databaseTable : DatabaseTable) : void {
          var callback : IDatabaseTableResultCallback = registeredDatabaseTableResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredDatabaseTableResultCallback dictionary.");
          } else {
               registeredDatabaseTableResultCallback.remove(""+id);
               callback.onResult(databaseTable);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.DatabaseTable} databaseTable
        @param {Adaptive.IDatabaseTableResultCallbackWarning} warning
     */
     export function handleDatabaseTableResultCallbackWarning(id : number, databaseTable : DatabaseTable, warning : IDatabaseTableResultCallbackWarning) : void {
          var callback : IDatabaseTableResultCallback = registeredDatabaseTableResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredDatabaseTableResultCallback dictionary.");
          } else {
               registeredDatabaseTableResultCallback.remove(""+id);
               callback.onWarning(databaseTable, warning);
          }
     }


     /**
        @class Adaptive.DatabaseTableResultCallback
        @extends Adaptive.BaseCallback
     */
     export class DatabaseTableResultCallback extends BaseCallback implements IDatabaseTableResultCallback {

          /**
             @private
             @property
          */
          onErrorFunction : (error : IDatabaseTableResultCallbackError) => void;
          /**
             @private
             @property
          */
          onResultFunction : (databaseTable : DatabaseTable) => void;
          /**
             @private
             @property
          */
          onWarningFunction : (databaseTable : DatabaseTable, warning : IDatabaseTableResultCallbackWarning) => void;

          /**
             @method constructor
             Constructor with anonymous handler functions for callback.

             @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IDatabaseTableResultCallbackError
             @param {Function} onResultFunction Function receiving parameters of type: Adaptive.DatabaseTable
             @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.DatabaseTable, Adaptive.IDatabaseTableResultCallbackWarning
          */
          constructor(onErrorFunction : (error : IDatabaseTableResultCallbackError) => void, onResultFunction : (databaseTable : DatabaseTable) => void, onWarningFunction : (databaseTable : DatabaseTable, warning : IDatabaseTableResultCallbackWarning) => void) {
               super(++registeredCounter);
               if (onErrorFunction == null) {
                    console.error("ERROR: DatabaseTableResultCallback onErrorFunction is not defined.");
               } else {
                    this.onErrorFunction = onErrorFunction;
               }
               if (onResultFunction == null) {
                    console.error("ERROR: DatabaseTableResultCallback onResultFunction is not defined.");
               } else {
                    this.onResultFunction = onResultFunction;
               }
               if (onWarningFunction == null) {
                    console.error("ERROR: DatabaseTableResultCallback onWarningFunction is not defined.");
               } else {
                    this.onWarningFunction = onWarningFunction;
               }
          }

          /**
             @method
             Result callback for error responses
             @param {Adaptive.IDatabaseTableResultCallbackError} error error Returned error
             @since v2.0
          */
          public onError(error : IDatabaseTableResultCallbackError) : void {
               if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                    console.warn("WARNING: DatabaseTableResultCallback contains a null reference to onErrorFunction.");
               } else {
                    this.onErrorFunction(error);
               }
          }

          /**
             @method
             Result callback for correct responses
             @param {Adaptive.DatabaseTable} databaseTable databaseTable Returns the databaseTable
             @since v2.0
          */
          public onResult(databaseTable : DatabaseTable) : void {
               if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                    console.warn("WARNING: DatabaseTableResultCallback contains a null reference to onResultFunction.");
               } else {
                    this.onResultFunction(databaseTable);
               }
          }

          /**
             @method
             Result callback for warning responses
             @param {Adaptive.DatabaseTable} databaseTable databaseTable Returns the databaseTable
             @param {Adaptive.IDatabaseTableResultCallbackWarning} warning warning       Returned Warning
             @since v2.0
          */
          public onWarning(databaseTable : DatabaseTable, warning : IDatabaseTableResultCallbackWarning) : void {
               if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                    console.warn("WARNING: DatabaseTableResultCallback contains a null reference to onWarningFunction.");
               } else {
                    this.onWarningFunction(databaseTable, warning);
               }
          }

     }
}
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
