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
///<reference path="ContactPhoneType.ts"/>
var Adaptive;
(function (Adaptive) {
    /**
       @class Adaptive.ContactPhone
       @extends Adaptive.APIBean
       Structure representing the phone data elements of a contact.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    var ContactPhone = (function (_super) {
        __extends(ContactPhone, _super);
        /**
           @method constructor
           Constructor used by implementation to set the contact Phone

           @param {string} phone     Phone number
           @param {Adaptive.ContactPhoneType} phoneType Type of Phone number
           @since v2.0
        */
        function ContactPhone(phone, phoneType) {
            _super.call(this);
            this.phone = phone;
            this.phoneType = phoneType;
        }
        Object.defineProperty(ContactPhone.prototype, "phoneTypeProperty", {
            /**
               @property {Adaptive.ContactPhoneType} phoneType
               The phone number phoneType The 'phoneTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'phoneType'.
            */
            get: function () {
                return this.phoneType;
            },
            set: function (phoneType) {
                this.phoneType = phoneType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactPhone.prototype, "phoneProperty", {
            /**
               @property {string} phone
               The phone number The 'phoneProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'phone'.
            */
            get: function () {
                return this.phone;
            },
            set: function (phone) {
                this.phone = phone;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the phone phoneType

           @return {Adaptive.ContactPhoneType} phoneType
           @since v2.0
        */
        ContactPhone.prototype.getPhoneType = function () {
            return this.phoneType;
        };
        /**
           @method
           Set the phoneType of the phone number

           @param {Adaptive.ContactPhoneType} phoneType Type of Phone number
           @since v2.0
        */
        ContactPhone.prototype.setPhoneType = function (phoneType) {
            this.phoneType = phoneType;
        };
        /**
           @method
           Returns the phone number

           @return {string} phone number
           @since v2.0
        */
        ContactPhone.prototype.getPhone = function () {
            return this.phone;
        };
        /**
           @method
           Set the phone number

           @param {string} phone number
           @since v2.0
        */
        ContactPhone.prototype.setPhone = function (phone) {
            this.phone = phone;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactPhone.
           @return {Adaptive.ContactPhone} Wrapped object instance.
        */
        ContactPhone.toObject = function (object) {
            var result = new ContactPhone(null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.phone = object.phone;
                result.phoneType = Adaptive.ContactPhoneType.toObject(object.phoneType);
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactPhone[].
           @return {Adaptive.ContactPhone[]} Wrapped object array instance.
        */
        ContactPhone.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(ContactPhone.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return ContactPhone;
    })(Adaptive.APIBean);
    Adaptive.ContactPhone = ContactPhone;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=ContactPhone.js.map