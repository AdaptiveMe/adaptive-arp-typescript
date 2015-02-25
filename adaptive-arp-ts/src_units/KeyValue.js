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
       @class Adaptive.KeyValue
       @extends Adaptive.APIBean
       General key/value holder class.

       @author Carlos Lozano Diez
       @since 2.0.6
       @version 1.0
    */
    var KeyValue = (function (_super) {
        __extends(KeyValue, _super);
        /**
           @method constructor
           Convenience constructor.

           @param {string} keyName Name of the key.
           @param {string} keyData Value of the key.
           @since v2.0.6
        */
        function KeyValue(keyName, keyData) {
            _super.call(this);
            this.keyName = keyName;
            this.keyData = keyData;
        }
        Object.defineProperty(KeyValue.prototype, "keyDataProperty", {
            /**
               @property {string} keyData
               Value of the key. The 'keyDataProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'keyData'.
            */
            get: function () {
                return this.keyData;
            },
            set: function (keyData) {
                this.keyData = keyData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyValue.prototype, "keyNameProperty", {
            /**
               @property {string} keyName
               Name of the key for the value. The 'keyNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'keyName'.
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
        /**
           @method
           Gets the value of the key.

           @return {string} Value of the key.
           @since v2.0.6
        */
        KeyValue.prototype.getKeyData = function () {
            return this.keyData;
        };
        /**
           @method
           Sets the value of the key.

           @param {string} keyData Value of the key.
           @since v2.0.6
        */
        KeyValue.prototype.setKeyData = function (keyData) {
            this.keyData = keyData;
        };
        /**
           @method
           Gets the name of the key.

           @return {string} Key name.
           @since v2.0.6
        */
        KeyValue.prototype.getKeyName = function () {
            return this.keyName;
        };
        /**
           @method
           Sets the name of the key.

           @param {string} keyName Key name.
           @since v2.0.6
        */
        KeyValue.prototype.setKeyName = function (keyName) {
            this.keyName = keyName;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.KeyValue.
           @return {Adaptive.KeyValue} Wrapped object instance.
        */
        KeyValue.toObject = function (object) {
            var result = new KeyValue(null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.keyName = object.keyName;
                result.keyData = object.keyData;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.KeyValue[].
           @return {Adaptive.KeyValue[]} Wrapped object array instance.
        */
        KeyValue.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(KeyValue.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return KeyValue;
    })(Adaptive.APIBean);
    Adaptive.KeyValue = KeyValue;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=KeyValue.js.map