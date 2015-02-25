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
var Adaptive;
(function (Adaptive) {
    /**
       @class Adaptive.DatabaseColumn
       @extends Adaptive.APIBean
       Structure representing the column specification of a data column.

       @author Ferran Vila Conesa
       @since v2.0
       @version 1.0
    */
    var DatabaseColumn = (function (_super) {
        __extends(DatabaseColumn, _super);
        /**
           @method constructor
           Constructor with fields

           @param {string} name Name of the column
           @since v2.0
        */
        function DatabaseColumn(name) {
            _super.call(this);
            this.name = name;
        }
        Object.defineProperty(DatabaseColumn.prototype, "nameProperty", {
            /**
               @property {string} name
               Name of the column The 'nameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'name'.
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
        /**
           @method
           Returns the name of the column.

           @return {string} The name of the column.
           @since v2.0
        */
        DatabaseColumn.prototype.getName = function () {
            return this.name;
        };
        /**
           @method
           Sets the name of the column.

           @param {string} name The name of the column.
           @since v2.0
        */
        DatabaseColumn.prototype.setName = function (name) {
            this.name = name;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.DatabaseColumn.
           @return {Adaptive.DatabaseColumn} Wrapped object instance.
        */
        DatabaseColumn.toObject = function (object) {
            var result = new DatabaseColumn(null);
            if (object != null) {
                // Assign values to bean fields.
                result.name = object.name;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.DatabaseColumn[].
           @return {Adaptive.DatabaseColumn[]} Wrapped object array instance.
        */
        DatabaseColumn.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(DatabaseColumn.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return DatabaseColumn;
    })(Adaptive.APIBean);
    Adaptive.DatabaseColumn = DatabaseColumn;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=DatabaseColumn.js.map