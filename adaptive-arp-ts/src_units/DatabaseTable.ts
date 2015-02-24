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

///<reference path="APIBean.ts"/>
///<reference path="DatabaseColumn.ts"/>
///<reference path="DatabaseRow.ts"/>

module Adaptive {

     /**
        @class Adaptive.DatabaseTable
        @extends Adaptive.APIBean
        Represents a data table composed of databaseColumns and databaseRows.

        @author Ferran Vila Conesa
        @since v2.0
        @version 1.0
     */
     export class DatabaseTable extends APIBean {

          /**
             @property {number} columnCount
             Number of databaseColumns.
          */
          columnCount : number;

          /**
             @property {number} columnCount
             Number of databaseColumns. The 'columnCountProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'columnCount'.
          */
          get columnCountProperty() : number {
               return this.columnCount;
          }

          set columnCountProperty(columnCount:number) {
               this.columnCount = columnCount;
          }

          /**
             @property {Adaptive.DatabaseColumn[]} databaseColumns
             Definition of databaseColumns.
          */
          databaseColumns : Array<DatabaseColumn>;

          /**
             @property {Adaptive.DatabaseColumn[]} databaseColumns
             Definition of databaseColumns. The 'databaseColumnsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'databaseColumns'.
          */
          get databaseColumnsProperty() : Array<DatabaseColumn> {
               return this.databaseColumns;
          }

          set databaseColumnsProperty(databaseColumns:Array<DatabaseColumn>) {
               this.databaseColumns = databaseColumns;
          }

          /**
             @property {Adaptive.DatabaseRow[]} databaseRows
             Rows of the table containing the data.
          */
          databaseRows : Array<DatabaseRow>;

          /**
             @property {Adaptive.DatabaseRow[]} databaseRows
             Rows of the table containing the data. The 'databaseRowsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'databaseRows'.
          */
          get databaseRowsProperty() : Array<DatabaseRow> {
               return this.databaseRows;
          }

          set databaseRowsProperty(databaseRows:Array<DatabaseRow>) {
               this.databaseRows = databaseRows;
          }

          /**
             @property {string} name
             Name of the table.
          */
          name : string;

          /**
             @property {string} name
             Name of the table. The 'nameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'name'.
          */
          get nameProperty() : string {
               return this.name;
          }

          set nameProperty(name:string) {
               this.name = name;
          }

          /**
             @property {number} rowCount
             Number of databaseRows.
          */
          rowCount : number;

          /**
             @property {number} rowCount
             Number of databaseRows. The 'rowCountProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'rowCount'.
          */
          get rowCountProperty() : number {
               return this.rowCount;
          }

          set rowCountProperty(rowCount:number) {
               this.rowCount = rowCount;
          }

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
          constructor(name: string, columnCount: number, rowCount: number, databaseColumns: Array<DatabaseColumn>, databaseRows: Array<DatabaseRow>) {
               super();
               this.name = name;
               this.columnCount = columnCount;
               this.rowCount = rowCount;
               this.databaseColumns = databaseColumns;
               this.databaseRows = databaseRows;
          }

          /**
             @method
             Get the number of databaseColumns

             @return {number} The number of databaseColumns
             @since v2.0
          */
          getColumnCount() : number {
               return this.columnCount;
          }

          /**
             @method
             Sets the number of databaseColumns

             @param {number} columnCount The number of databaseColumns
             @since v2.0
          */
          setColumnCount(columnCount: number) {
               this.columnCount = columnCount;
          }

          /**
             @method
             Get the databaseColumns

             @return {Adaptive.DatabaseColumn[]} The databaseColumns
             @since v2.0
          */
          getDatabaseColumns() : Array<DatabaseColumn> {
               return this.databaseColumns;
          }

          /**
             @method
             Sets the databaseColumns of the table

             @param {Adaptive.DatabaseColumn[]} databaseColumns The databaseColumns of the table
             @since v2.0
          */
          setDatabaseColumns(databaseColumns: Array<DatabaseColumn>) {
               this.databaseColumns = databaseColumns;
          }

          /**
             @method
             Get the databaseRows of the table

             @return {Adaptive.DatabaseRow[]} The databaseRows of the table
             @since v2.0
          */
          getDatabaseRows() : Array<DatabaseRow> {
               return this.databaseRows;
          }

          /**
             @method
             Sets the databaseRows of the table

             @param {Adaptive.DatabaseRow[]} databaseRows The databaseRows of the table
             @since v2.0
          */
          setDatabaseRows(databaseRows: Array<DatabaseRow>) {
               this.databaseRows = databaseRows;
          }

          /**
             @method
             Returns the name of the table

             @return {string} The name of the table
             @since v2.0
          */
          getName() : string {
               return this.name;
          }

          /**
             @method
             Sets the name of the table

             @param {string} name The name of the table
             @since v2.0
          */
          setName(name: string) {
               this.name = name;
          }

          /**
             @method
             Get the number of databaseRows

             @return {number} The number of databaseRows
             @since v2.0
          */
          getRowCount() : number {
               return this.rowCount;
          }

          /**
             @method
             Sets the number of databaseRows

             @param {number} rowCount The number of databaseRows
             @since v2.0
          */
          setRowCount(rowCount: number) {
               this.rowCount = rowCount;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.DatabaseTable.
             @return {Adaptive.DatabaseTable} Wrapped object instance.
          */
          static toObject(object : any) : DatabaseTable {
               var result : DatabaseTable = new DatabaseTable(null, null, null, null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.name = object.name;
                    result.columnCount = object.columnCount;
                    result.rowCount = object.rowCount;
                    result.databaseColumns = DatabaseColumn.toObjectArray(object.databaseColumns);
                    result.databaseRows = DatabaseRow.toObjectArray(object.databaseRows);

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.DatabaseTable[].
             @return {Adaptive.DatabaseTable[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : DatabaseTable[] {
               var resultArray : Array<DatabaseTable> = new Array<DatabaseTable>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(DatabaseTable.toObject(object[i]));
                    }
               }
               return resultArray;
          }

     }
}

/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
