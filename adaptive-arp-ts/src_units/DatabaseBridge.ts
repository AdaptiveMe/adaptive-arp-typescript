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

///<reference path="APIRequest.ts"/>
///<reference path="APIResponse.ts"/>
///<reference path="BaseDataBridge.ts"/>
///<reference path="CommonUtil.ts"/>
///<reference path="Database.ts"/>
///<reference path="DatabaseResultCallback.ts"/>
///<reference path="DatabaseTable.ts"/>
///<reference path="DatabaseTableResultCallback.ts"/>
///<reference path="IAdaptiveRPGroup.ts"/>
///<reference path="IBaseData.ts"/>
///<reference path="IDatabase.ts"/>
///<reference path="IDatabaseResultCallback.ts"/>
///<reference path="IDatabaseTableResultCallback.ts"/>
module Adaptive {

     /**
        @class Adaptive.DatabaseBridge
        @extends Adaptive.BaseDataBridge
        Interface for Managing the Cloud operations

        @author Ferran Vila Conesa
        @since v2.0
     */
     export class DatabaseBridge extends BaseDataBridge implements IDatabase {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }

          /**
             @method
             Creates a database on default path for every platform.

             @param {Adaptive.Database} database database Database object to create
             @param {Adaptive.DatabaseResultCallback} callback callback Asynchronous callback
             @since v2.0
          */
          createDatabase(database : Database, callback : IDatabaseResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(database));
               var apiRequest : APIRequest = new APIRequest("IDatabase","createDatabase",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredDatabaseResultCallback);
          }

          /**
             @method
             Creates a databaseTable inside a database for every platform.

             @param {Adaptive.Database} database database      Database for databaseTable creating.
             @param {Adaptive.DatabaseTable} databaseTable databaseTable DatabaseTable object with the name of the databaseTable inside.
             @param {Adaptive.DatabaseTableResultCallback} callback callback      DatabaseTable callback with the response
             @since v2.0
          */
          createTable(database : Database, databaseTable : DatabaseTable, callback : IDatabaseTableResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(database));
               arParams.push(JSON.stringify(databaseTable));
               var apiRequest : APIRequest = new APIRequest("IDatabase","createTable",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredDatabaseTableResultCallback);
          }

          /**
             @method
             Deletes a database on default path for every platform.

             @param {Adaptive.Database} database database Database object to delete
             @param {Adaptive.DatabaseResultCallback} callback callback Asynchronous callback
             @since v2.0
          */
          deleteDatabase(database : Database, callback : IDatabaseResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(database));
               var apiRequest : APIRequest = new APIRequest("IDatabase","deleteDatabase",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredDatabaseResultCallback);
          }

          /**
             @method
             Deletes a databaseTable inside a database for every platform.

             @param {Adaptive.Database} database database      Database for databaseTable removal.
             @param {Adaptive.DatabaseTable} databaseTable databaseTable DatabaseTable object with the name of the databaseTable inside.
             @param {Adaptive.DatabaseTableResultCallback} callback callback      DatabaseTable callback with the response
             @since v2.0
          */
          deleteTable(database : Database, databaseTable : DatabaseTable, callback : IDatabaseTableResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(database));
               arParams.push(JSON.stringify(databaseTable));
               var apiRequest : APIRequest = new APIRequest("IDatabase","deleteTable",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredDatabaseTableResultCallback);
          }

          /**
             @method
             Executes SQL statement into the given database. The replacements
should be passed as a parameter

             @param {Adaptive.Database} database database     The database object reference.
             @param {string} statement statement    SQL statement.
             @param {string[]} replacements replacements List of SQL statement replacements.
             @param {Adaptive.DatabaseTableResultCallback} callback callback     DatabaseTable callback with the response.
             @since v2.0
          */
          executeSqlStatement(database : Database, statement : string, replacements : Array<string>, callback : IDatabaseTableResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(database));
               arParams.push(JSON.stringify(statement));
               arParams.push(JSON.stringify(replacements));
               var apiRequest : APIRequest = new APIRequest("IDatabase","executeSqlStatement",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredDatabaseTableResultCallback);
          }

          /**
             @method
             Executes SQL transaction (some statements chain) inside given database.

             @param {Adaptive.Database} database database     The database object reference.
             @param {string[]} statements statements   The statements to be executed during transaction.
             @param {boolean} rollbackFlag rollbackFlag Indicates if rollback should be performed when any
                    statement execution fails.
             @param {Adaptive.DatabaseTableResultCallback} callback callback     DatabaseTable callback with the response.
             @since v2.0
          */
          executeSqlTransactions(database : Database, statements : Array<string>, rollbackFlag : boolean, callback : IDatabaseTableResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(database));
               arParams.push(JSON.stringify(statements));
               arParams.push(JSON.stringify(rollbackFlag));
               var apiRequest : APIRequest = new APIRequest("IDatabase","executeSqlTransactions",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredDatabaseTableResultCallback);
          }

          /**
             @method
             Checks if database exists by given database name.

             @param {Adaptive.Database} database database Database Object to check if exists
             @return {boolean} True if exists, false otherwise
             @since v2.0
          */
          existsDatabase(database : Database) : boolean {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(database));
               var apiRequest : APIRequest = new APIRequest("IDatabase","existsDatabase",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : boolean = false;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = JSON.parse(apiResponse.getResponse());
               }
               return response;
          }

          /**
             @method
             Checks if databaseTable exists by given database name.

             @param {Adaptive.Database} database database      Database for databaseTable consulting.
             @param {Adaptive.DatabaseTable} databaseTable databaseTable DatabaseTable object with the name of the databaseTable inside.
             @return {boolean} True if exists, false otherwise
             @since v2.0
          */
          existsTable(database : Database, databaseTable : DatabaseTable) : boolean {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(database));
               arParams.push(JSON.stringify(databaseTable));
               var apiRequest : APIRequest = new APIRequest("IDatabase","existsTable",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : boolean = false;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = JSON.parse(apiResponse.getResponse());
               }
               return response;
          }
     }
}
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
