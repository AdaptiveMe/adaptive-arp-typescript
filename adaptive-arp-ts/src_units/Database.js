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
       @class Adaptive.Database
       @extends Adaptive.APIBean
       Structure representing a database reference.

       @author Ferran Vila Conesa
       @since v2.0
       @version 1.0
    */
    var Database = (function (_super) {
        __extends(Database, _super);
        /**
           @method constructor
           Constructor using fields.

           @param {string} name     Name of the DatabaseTable.
           @param {boolean} compress Compression enabled.
           @since v2.0
        */
        function Database(name, compress) {
            _super.call(this);
            this.name = name;
            this.compress = compress;
        }
        Object.defineProperty(Database.prototype, "compressProperty", {
            /**
               @property {boolean} compress
               Indicates if database was created or needs to be created as Compressed. The 'compressProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'compress'.
            */
            get: function () {
                return this.compress;
            },
            set: function (compress) {
                this.compress = compress;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Database.prototype, "nameProperty", {
            /**
               @property {string} name
               Database Name (name of the .db local file). The 'nameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'name'.
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
           Returns if the table is compressed

           @return {boolean} Compression enabled
           @since v2.0
        */
        Database.prototype.getCompress = function () {
            return this.compress;
        };
        /**
           @method
           Sets if the table is compressed or not.

           @param {boolean} compress Compression enabled
           @since v2.0
        */
        Database.prototype.setCompress = function (compress) {
            this.compress = compress;
        };
        /**
           @method
           Returns the name.

           @return {string} The name of the table.
           @since v2.0
        */
        Database.prototype.getName = function () {
            return this.name;
        };
        /**
           @method
           Sets the name of the table.

           @param {string} name The name of the table.
           @since v2.0
        */
        Database.prototype.setName = function (name) {
            this.name = name;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Database.
           @return {Adaptive.Database} Wrapped object instance.
        */
        Database.toObject = function (object) {
            var result = new Database(null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.name = object.name;
                result.compress = object.compress;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Database[].
           @return {Adaptive.Database[]} Wrapped object array instance.
        */
        Database.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(Database.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return Database;
    })(Adaptive.APIBean);
    Adaptive.Database = Database;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=Database.js.map