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
       @class Adaptive.SecureKeyPair
       @extends Adaptive.APIBean
       Represents a single secureKey-value pair.

       @author Aryslan
       @since v2.0
       @version 1.0
    */
    var SecureKeyPair = (function (_super) {
        __extends(SecureKeyPair, _super);
        /**
           @method constructor
           Constructor with parameters

           @param {string} secureKey  name of the keypair
           @param {string} secureData value of the keypair
           @since v2.0
        */
        function SecureKeyPair(secureKey, secureData) {
            _super.call(this);
            this.secureKey = secureKey;
            this.secureData = secureData;
        }
        Object.defineProperty(SecureKeyPair.prototype, "secureDataProperty", {
            /**
               @property {string} secureData
               Value of the secured element The 'secureDataProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'secureData'.
            */
            get: function () {
                return this.secureData;
            },
            set: function (secureData) {
                this.secureData = secureData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SecureKeyPair.prototype, "secureKeyProperty", {
            /**
               @property {string} secureKey
               Key of the secured element The 'secureKeyProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'secureKey'.
            */
            get: function () {
                return this.secureKey;
            },
            set: function (secureKey) {
                this.secureKey = secureKey;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the object value

           @return {string} Value.
           @since v2.0
        */
        SecureKeyPair.prototype.getSecureData = function () {
            return this.secureData;
        };
        /**
           @method
           Sets the value for this object

           @param {string} secureData value to set.
           @since v2.0
        */
        SecureKeyPair.prototype.setSecureData = function (secureData) {
            this.secureData = secureData;
        };
        /**
           @method
           Returns the object secureKey name.

           @return {string} Key name.
           @since v2.0
        */
        SecureKeyPair.prototype.getSecureKey = function () {
            return this.secureKey;
        };
        /**
           @method
           Sets the secureKey name for this object.

           @param {string} secureKey Key name.
           @since v2.0
        */
        SecureKeyPair.prototype.setSecureKey = function (secureKey) {
            this.secureKey = secureKey;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.SecureKeyPair.
           @return {Adaptive.SecureKeyPair} Wrapped object instance.
        */
        SecureKeyPair.toObject = function (object) {
            var result = new SecureKeyPair(null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.secureKey = object.secureKey;
                result.secureData = object.secureData;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.SecureKeyPair[].
           @return {Adaptive.SecureKeyPair[]} Wrapped object array instance.
        */
        SecureKeyPair.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(SecureKeyPair.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return SecureKeyPair;
    })(Adaptive.APIBean);
    Adaptive.SecureKeyPair = SecureKeyPair;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=SecureKeyPair.js.map