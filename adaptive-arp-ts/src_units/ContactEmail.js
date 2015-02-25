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
///<reference path="ContactEmailType.ts"/>
var Adaptive;
(function (Adaptive) {
    /**
       @class Adaptive.ContactEmail
       @extends Adaptive.APIBean
       Structure representing the email data elements of a contact.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    var ContactEmail = (function (_super) {
        __extends(ContactEmail, _super);
        /**
           @method constructor
           Constructor used by the implementation

           @param {Adaptive.ContactEmailType} type    Type of the email
           @param {boolean} primary Is email primary
           @param {string} email   Email of the contact
           @since v2.0
        */
        function ContactEmail(type, primary, email) {
            _super.call(this);
            this.type = type;
            this.primary = primary;
            this.email = email;
        }
        Object.defineProperty(ContactEmail.prototype, "typeProperty", {
            /**
               @property {Adaptive.ContactEmailType} type
               The type of the email The 'typeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'type'.
            */
            get: function () {
                return this.type;
            },
            set: function (type) {
                this.type = type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactEmail.prototype, "emailProperty", {
            /**
               @property {string} email
               Email of the Contact The 'emailProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'email'.
            */
            get: function () {
                return this.email;
            },
            set: function (email) {
                this.email = email;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactEmail.prototype, "primaryProperty", {
            /**
               @property {boolean} primary
               Whether the email is the primary one or not The 'primaryProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'primary'.
            */
            get: function () {
                return this.primary;
            },
            set: function (primary) {
                this.primary = primary;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the type of the email

           @return {Adaptive.ContactEmailType} EmailType
           @since v2.0
        */
        ContactEmail.prototype.getType = function () {
            return this.type;
        };
        /**
           @method
           Set the type of the email

           @param {Adaptive.ContactEmailType} type Type of the email
           @since v2.0
        */
        ContactEmail.prototype.setType = function (type) {
            this.type = type;
        };
        /**
           @method
           Returns the email of the Contact

           @return {string} email
           @since v2.0
        */
        ContactEmail.prototype.getEmail = function () {
            return this.email;
        };
        /**
           @method
           Set the email of the Contact

           @param {string} email Email of the contact
           @since v2.0
        */
        ContactEmail.prototype.setEmail = function (email) {
            this.email = email;
        };
        /**
           @method
           Returns if the email is primary

           @return {boolean} true if the email is primary; false otherwise
           @since v2.0
        */
        ContactEmail.prototype.getPrimary = function () {
            return this.primary;
        };
        /**
           @method
           Set if the email

           @param {boolean} primary true if the email is primary; false otherwise
           @since v2.0
        */
        ContactEmail.prototype.setPrimary = function (primary) {
            this.primary = primary;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactEmail.
           @return {Adaptive.ContactEmail} Wrapped object instance.
        */
        ContactEmail.toObject = function (object) {
            var result = new ContactEmail(null, null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.type = Adaptive.ContactEmailType.toObject(object.type);
                result.primary = object.primary;
                result.email = object.email;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactEmail[].
           @return {Adaptive.ContactEmail[]} Wrapped object array instance.
        */
        ContactEmail.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(ContactEmail.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return ContactEmail;
    })(Adaptive.APIBean);
    Adaptive.ContactEmail = ContactEmail;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=ContactEmail.js.map