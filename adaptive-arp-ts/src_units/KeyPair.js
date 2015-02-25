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
       @class Adaptive.KeyPair
       @extends Adaptive.APIBean
       Represents a basic bean to store keyName pair values

       @author Ferran Vila Conesa
       @since v2.0
       @version 1.0
    */
    var KeyPair = (function (_super) {
        __extends(KeyPair, _super);
        /**
           @method constructor
           Constructor using fields

           @param {string} keyName  Key of the element
           @param {string} keyValue Value of the element
           @since v2.0
        */
        function KeyPair(keyName, keyValue) {
            _super.call(this);
            this.keyName = keyName;
            this.keyValue = keyValue;
        }
        Object.defineProperty(KeyPair.prototype, "keyNameProperty", {
            /**
               @property {string} keyName
               Key of the element The 'keyNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'keyName'.
            */
            get: function () {
                return this.keyName;
            },
            set: function (keyName) {
                this.keyName = keyName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyPair.prototype, "keyValueProperty", {
            /**
               @property {string} keyValue
               Value of the element The 'keyValueProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'keyValue'.
            */
            get: function () {
                return this.keyValue;
            },
            set: function (keyValue) {
                this.keyValue = keyValue;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the keyName of the element

           @return {string} Key of the element
           @since v2.0
        */
        KeyPair.prototype.getKeyName = function () {
            return this.keyName;
        };
        /**
           @method
           Sets the keyName of the element

           @param {string} keyName Key of the element
           @since v2.0
        */
        KeyPair.prototype.setKeyName = function (keyName) {
            this.keyName = keyName;
        };
        /**
           @method
           Returns the keyValue of the element

           @return {string} Value of the element
           @since v2.0
        */
        KeyPair.prototype.getKeyValue = function () {
            return this.keyValue;
        };
        /**
           @method
           Sets the keyValue of the element

           @param {string} keyValue Value of the element
           @since v2.0
        */
        KeyPair.prototype.setKeyValue = function (keyValue) {
            this.keyValue = keyValue;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.KeyPair.
           @return {Adaptive.KeyPair} Wrapped object instance.
        */
        KeyPair.toObject = function (object) {
            var result = new KeyPair(null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.keyName = object.keyName;
                result.keyValue = object.keyValue;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.KeyPair[].
           @return {Adaptive.KeyPair[]} Wrapped object array instance.
        */
        KeyPair.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(KeyPair.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return KeyPair;
    })(Adaptive.APIBean);
    Adaptive.KeyPair = KeyPair;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=KeyPair.js.map