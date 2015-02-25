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
///<reference path="APIBean.ts"/>
///<reference path="DatabaseColumn.ts"/>
///<reference path="DatabaseRow.ts"/>
var Adaptive;
(function (Adaptive) {
    /**
       @class Adaptive.DatabaseTable
       @extends Adaptive.APIBean
       Represents a data table composed of databaseColumns and databaseRows.

       @author Ferran Vila Conesa
       @since v2.0
       @version 1.0
    */
    var DatabaseTable = (function (_super) {
        __extends(DatabaseTable, _super);
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
        function DatabaseTable(name, columnCount, rowCount, databaseColumns, databaseRows) {
            _super.call(this);
            this.name = name;
            this.columnCount = columnCount;
            this.rowCount = rowCount;
            this.databaseColumns = databaseColumns;
            this.databaseRows = databaseRows;
        }
        Object.defineProperty(DatabaseTable.prototype, "columnCountProperty", {
            /**
               @property {number} columnCount
               Number of databaseColumns. The 'columnCountProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'columnCount'.
            */
            get: function () {
                return this.columnCount;
            },
            set: function (columnCount) {
                this.columnCount = columnCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DatabaseTable.prototype, "databaseColumnsProperty", {
            /**
               @property {Adaptive.DatabaseColumn[]} databaseColumns
               Definition of databaseColumns. The 'databaseColumnsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'databaseColumns'.
            */
            get: function () {
                return this.databaseColumns;
            },
            set: function (databaseColumns) {
                this.databaseColumns = databaseColumns;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DatabaseTable.prototype, "databaseRowsProperty", {
            /**
               @property {Adaptive.DatabaseRow[]} databaseRows
               Rows of the table containing the data. The 'databaseRowsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'databaseRows'.
            */
            get: function () {
                return this.databaseRows;
            },
            set: function (databaseRows) {
                this.databaseRows = databaseRows;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DatabaseTable.prototype, "nameProperty", {
            /**
               @property {string} name
               Name of the table. The 'nameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'name'.
            */
            get: function () {
                return this.name;
            },
            set: function (name) {
                this.name = name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DatabaseTable.prototype, "rowCountProperty", {
            /**
               @property {number} rowCount
               Number of databaseRows. The 'rowCountProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'rowCount'.
            */
            get: function () {
                return this.rowCount;
            },
            set: function (rowCount) {
                this.rowCount = rowCount;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Get the number of databaseColumns

           @return {number} The number of databaseColumns
           @since v2.0
        */
        DatabaseTable.prototype.getColumnCount = function () {
            return this.columnCount;
        };
        /**
           @method
           Sets the number of databaseColumns

           @param {number} columnCount The number of databaseColumns
           @since v2.0
        */
        DatabaseTable.prototype.setColumnCount = function (columnCount) {
            this.columnCount = columnCount;
        };
        /**
           @method
           Get the databaseColumns

           @return {Adaptive.DatabaseColumn[]} The databaseColumns
           @since v2.0
        */
        DatabaseTable.prototype.getDatabaseColumns = function () {
            return this.databaseColumns;
        };
        /**
           @method
           Sets the databaseColumns of the table

           @param {Adaptive.DatabaseColumn[]} databaseColumns The databaseColumns of the table
           @since v2.0
        */
        DatabaseTable.prototype.setDatabaseColumns = function (databaseColumns) {
            this.databaseColumns = databaseColumns;
        };
        /**
           @method
           Get the databaseRows of the table

           @return {Adaptive.DatabaseRow[]} The databaseRows of the table
           @since v2.0
        */
        DatabaseTable.prototype.getDatabaseRows = function () {
            return this.databaseRows;
        };
        /**
           @method
           Sets the databaseRows of the table

           @param {Adaptive.DatabaseRow[]} databaseRows The databaseRows of the table
           @since v2.0
        */
        DatabaseTable.prototype.setDatabaseRows = function (databaseRows) {
            this.databaseRows = databaseRows;
        };
        /**
           @method
           Returns the name of the table

           @return {string} The name of the table
           @since v2.0
        */
        DatabaseTable.prototype.getName = function () {
            return this.name;
        };
        /**
           @method
           Sets the name of the table

           @param {string} name The name of the table
           @since v2.0
        */
        DatabaseTable.prototype.setName = function (name) {
            this.name = name;
        };
        /**
           @method
           Get the number of databaseRows

           @return {number} The number of databaseRows
           @since v2.0
        */
        DatabaseTable.prototype.getRowCount = function () {
            return this.rowCount;
        };
        /**
           @method
           Sets the number of databaseRows

           @param {number} rowCount The number of databaseRows
           @since v2.0
        */
        DatabaseTable.prototype.setRowCount = function (rowCount) {
            this.rowCount = rowCount;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.DatabaseTable.
           @return {Adaptive.DatabaseTable} Wrapped object instance.
        */
        DatabaseTable.toObject = function (object) {
            var result = new DatabaseTable(null, null, null, null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.name = object.name;
                result.columnCount = object.columnCount;
                result.rowCount = object.rowCount;
                result.databaseColumns = Adaptive.DatabaseColumn.toObjectArray(object.databaseColumns);
                result.databaseRows = Adaptive.DatabaseRow.toObjectArray(object.databaseRows);
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.DatabaseTable[].
           @return {Adaptive.DatabaseTable[]} Wrapped object array instance.
        */
        DatabaseTable.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(DatabaseTable.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return DatabaseTable;
    })(Adaptive.APIBean);
    Adaptive.DatabaseTable = DatabaseTable;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=DatabaseTable.js.map