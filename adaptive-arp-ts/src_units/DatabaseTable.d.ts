/// <reference path="APIBean.d.ts" />
/// <reference path="DatabaseColumn.d.ts" />
/// <reference path="DatabaseRow.d.ts" />
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
       @class Adaptive.DatabaseTable
       @extends Adaptive.APIBean
       Represents a data table composed of databaseColumns and databaseRows.

       @author Ferran Vila Conesa
       @since v2.0
       @version 1.0
    */
    class DatabaseTable extends APIBean {
        /**
           @property {number} columnCount
           Number of databaseColumns.
        */
        columnCount: number;
        /**
           @property {number} columnCount
           Number of databaseColumns. The 'columnCountProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'columnCount'.
        */
        columnCountProperty: number;
        /**
           @property {Adaptive.DatabaseColumn[]} databaseColumns
           Definition of databaseColumns.
        */
        databaseColumns: Array<DatabaseColumn>;
        /**
           @property {Adaptive.DatabaseColumn[]} databaseColumns
           Definition of databaseColumns. The 'databaseColumnsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'databaseColumns'.
        */
        databaseColumnsProperty: Array<DatabaseColumn>;
        /**
           @property {Adaptive.DatabaseRow[]} databaseRows
           Rows of the table containing the data.
        */
        databaseRows: Array<DatabaseRow>;
        /**
           @property {Adaptive.DatabaseRow[]} databaseRows
           Rows of the table containing the data. The 'databaseRowsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'databaseRows'.
        */
        databaseRowsProperty: Array<DatabaseRow>;
        /**
           @property {string} name
           Name of the table.
        */
        name: string;
        /**
           @property {string} name
           Name of the table. The 'nameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'name'.
        */
        nameProperty: string;
        /**
           @property {number} rowCount
           Number of databaseRows.
        */
        rowCount: number;
        /**
           @property {number} rowCount
           Number of databaseRows. The 'rowCountProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'rowCount'.
        */
        rowCountProperty: number;
        /**
           @method constructor
           Constructor using fields

           @param {string} name            The name of the table
           @param {number} columnCount     The number of databaseColumns
           @param {number} rowCount        The number of databaseRows
           @param {Adaptive.DatabaseColumn[]} databaseColumns The databaseColumns of the table
           @param {Adaptive.DatabaseRow[]} databaseRows    The databaseRows of the table
           @since v2.0
        */
        constructor(name: string, columnCount: number, rowCount: number, databaseColumns: Array<DatabaseColumn>, databaseRows: Array<DatabaseRow>);
        /**
           @method
           Get the number of databaseColumns

           @return {number} The number of databaseColumns
           @since v2.0
        */
        getColumnCount(): number;
        /**
           @method
           Sets the number of databaseColumns

           @param {number} columnCount The number of databaseColumns
           @since v2.0
        */
        setColumnCount(columnCount: number): void;
        /**
           @method
           Get the databaseColumns

           @return {Adaptive.DatabaseColumn[]} The databaseColumns
           @since v2.0
        */
        getDatabaseColumns(): Array<DatabaseColumn>;
        /**
           @method
           Sets the databaseColumns of the table

           @param {Adaptive.DatabaseColumn[]} databaseColumns The databaseColumns of the table
           @since v2.0
        */
        setDatabaseColumns(databaseColumns: Array<DatabaseColumn>): void;
        /**
           @method
           Get the databaseRows of the table

           @return {Adaptive.DatabaseRow[]} The databaseRows of the table
           @since v2.0
        */
        getDatabaseRows(): Array<DatabaseRow>;
        /**
           @method
           Sets the databaseRows of the table

           @param {Adaptive.DatabaseRow[]} databaseRows The databaseRows of the table
           @since v2.0
        */
        setDatabaseRows(databaseRows: Array<DatabaseRow>): void;
        /**
           @method
           Returns the name of the table

           @return {string} The name of the table
           @since v2.0
        */
        getName(): string;
        /**
           @method
           Sets the name of the table

           @param {string} name The name of the table
           @since v2.0
        */
        setName(name: string): void;
        /**
           @method
           Get the number of databaseRows

           @return {number} The number of databaseRows
           @since v2.0
        */
        getRowCount(): number;
        /**
           @method
           Sets the number of databaseRows

           @param {number} rowCount The number of databaseRows
           @since v2.0
        */
        setRowCount(rowCount: number): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.DatabaseTable.
           @return {Adaptive.DatabaseTable} Wrapped object instance.
        */
        static toObject(object: any): DatabaseTable;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.DatabaseTable[].
           @return {Adaptive.DatabaseTable[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): DatabaseTable[];
    }
}
