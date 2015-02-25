/// <reference path="APIRequest.d.ts" />
/// <reference path="APIResponse.d.ts" />
/// <reference path="BaseDataBridge.d.ts" />
/// <reference path="CommonUtil.d.ts" />
/// <reference path="Database.d.ts" />
/// <reference path="DatabaseResultCallback.d.ts" />
/// <reference path="DatabaseTable.d.ts" />
/// <reference path="DatabaseTableResultCallback.d.ts" />
/// <reference path="IAdaptiveRPGroup.d.ts" />
/// <reference path="IBaseData.d.ts" />
/// <reference path="IDatabase.d.ts" />
/// <reference path="IDatabaseResultCallback.d.ts" />
/// <reference path="IDatabaseTableResultCallback.d.ts" />
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
       @class Adaptive.DatabaseBridge
       @extends Adaptive.BaseDataBridge
       Interface for Managing the Cloud operations

       @author Ferran Vila Conesa
       @since v2.0
    */
    class DatabaseBridge extends BaseDataBridge implements IDatabase {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Creates a database on default path for every platform.

           @param {Adaptive.Database} database database Database object to create
           @param {Adaptive.DatabaseResultCallback} callback callback Asynchronous callback
           @since v2.0
        */
        createDatabase(database: Database, callback: IDatabaseResultCallback): void;
        /**
           @method
           Creates a databaseTable inside a database for every platform.

           @param {Adaptive.Database} database database      Database for databaseTable creating.
           @param {Adaptive.DatabaseTable} databaseTable databaseTable DatabaseTable object with the name of the databaseTable inside.
           @param {Adaptive.DatabaseTableResultCallback} callback callback      DatabaseTable callback with the response
           @since v2.0
        */
        createTable(database: Database, databaseTable: DatabaseTable, callback: IDatabaseTableResultCallback): void;
        /**
           @method
           Deletes a database on default path for every platform.

           @param {Adaptive.Database} database database Database object to delete
           @param {Adaptive.DatabaseResultCallback} callback callback Asynchronous callback
           @since v2.0
        */
        deleteDatabase(database: Database, callback: IDatabaseResultCallback): void;
        /**
           @method
           Deletes a databaseTable inside a database for every platform.

           @param {Adaptive.Database} database database      Database for databaseTable removal.
           @param {Adaptive.DatabaseTable} databaseTable databaseTable DatabaseTable object with the name of the databaseTable inside.
           @param {Adaptive.DatabaseTableResultCallback} callback callback      DatabaseTable callback with the response
           @since v2.0
        */
        deleteTable(database: Database, databaseTable: DatabaseTable, callback: IDatabaseTableResultCallback): void;
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
        executeSqlStatement(database: Database, statement: string, replacements: Array<string>, callback: IDatabaseTableResultCallback): void;
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
        executeSqlTransactions(database: Database, statements: Array<string>, rollbackFlag: boolean, callback: IDatabaseTableResultCallback): void;
        /**
           @method
           Checks if database exists by given database name.

           @param {Adaptive.Database} database database Database Object to check if exists
           @return {boolean} True if exists, false otherwise
           @since v2.0
        */
        existsDatabase(database: Database): boolean;
        /**
           @method
           Checks if databaseTable exists by given database name.

           @param {Adaptive.Database} database database      Database for databaseTable consulting.
           @param {Adaptive.DatabaseTable} databaseTable databaseTable DatabaseTable object with the name of the databaseTable inside.
           @return {boolean} True if exists, false otherwise
           @since v2.0
        */
        existsTable(database: Database, databaseTable: DatabaseTable): boolean;
    }
}
