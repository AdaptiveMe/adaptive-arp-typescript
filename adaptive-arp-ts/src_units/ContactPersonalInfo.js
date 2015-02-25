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
///<reference path="ContactPersonalInfoTitle.ts"/>
var Adaptive;
(function (Adaptive) {
    /**
       @class Adaptive.ContactPersonalInfo
       @extends Adaptive.APIBean
       Structure representing the personal info data elements of a contact.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    var ContactPersonalInfo = (function (_super) {
        __extends(ContactPersonalInfo, _super);
        /**
           @method constructor
           The Constructor used by the implementation

           @param {string} name       of the Contact
           @param {string} middleName of the Contact
           @param {string} lastName   of the Contact
           @param {Adaptive.ContactPersonalInfoTitle} title      of the Contact
           @since v2.0
        */
        function ContactPersonalInfo(name, middleName, lastName, title) {
            _super.call(this);
            this.name = name;
            this.middleName = middleName;
            this.lastName = lastName;
            this.title = title;
        }
        Object.defineProperty(ContactPersonalInfo.prototype, "titleProperty", {
            /**
               @property {Adaptive.ContactPersonalInfoTitle} title
               The title of the Contact The 'titleProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'title'.
            */
            get: function () {
                return this.title;
            },
            set: function (title) {
                this.title = title;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactPersonalInfo.prototype, "lastNameProperty", {
            /**
               @property {string} lastName
               The last name of the Contact The 'lastNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'lastName'.
            */
            get: function () {
                return this.lastName;
            },
            set: function (lastName) {
                this.lastName = lastName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactPersonalInfo.prototype, "middleNameProperty", {
            /**
               @property {string} middleName
               The middle name of the Contact if it proceeds The 'middleNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'middleName'.
            */
            get: function () {
                return this.middleName;
            },
            set: function (middleName) {
                this.middleName = middleName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactPersonalInfo.prototype, "nameProperty", {
            /**
               @property {string} name
               The name of the Contact The 'nameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'name'.
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
           Returns the title of the Contact

           @return {Adaptive.ContactPersonalInfoTitle} Title
           @since v2.0
        */
        ContactPersonalInfo.prototype.getTitle = function () {
            return this.title;
        };
        /**
           @method
           Set the Title of the Contact

           @param {Adaptive.ContactPersonalInfoTitle} title of the Contact
           @since v2.0
        */
        ContactPersonalInfo.prototype.setTitle = function (title) {
            this.title = title;
        };
        /**
           @method
           Returns the last name of the Contact

           @return {string} lastName
           @since v2.0
        */
        ContactPersonalInfo.prototype.getLastName = function () {
            return this.lastName;
        };
        /**
           @method
           Set the last name of the Contact

           @param {string} lastName of the Contact
           @since v2.0
        */
        ContactPersonalInfo.prototype.setLastName = function (lastName) {
            this.lastName = lastName;
        };
        /**
           @method
           Returns the middle name of the Contact

           @return {string} middelName
           @since v2.0
        */
        ContactPersonalInfo.prototype.getMiddleName = function () {
            return this.middleName;
        };
        /**
           @method
           Set the middle name of the Contact

           @param {string} middleName of the Contact
           @since v2.0
        */
        ContactPersonalInfo.prototype.setMiddleName = function (middleName) {
            this.middleName = middleName;
        };
        /**
           @method
           Returns the name of the Contact

           @return {string} name
           @since v2.0
        */
        ContactPersonalInfo.prototype.getName = function () {
            return this.name;
        };
        /**
           @method
           Set the name of the Contact

           @param {string} name of the Contact
           @since v2.0
        */
        ContactPersonalInfo.prototype.setName = function (name) {
            this.name = name;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactPersonalInfo.
           @return {Adaptive.ContactPersonalInfo} Wrapped object instance.
        */
        ContactPersonalInfo.toObject = function (object) {
            var result = new ContactPersonalInfo(null, null, null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.name = object.name;
                result.middleName = object.middleName;
                result.lastName = object.lastName;
                result.title = Adaptive.ContactPersonalInfoTitle.toObject(object.title);
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactPersonalInfo[].
           @return {Adaptive.ContactPersonalInfo[]} Wrapped object array instance.
        */
        ContactPersonalInfo.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(ContactPersonalInfo.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return ContactPersonalInfo;
    })(Adaptive.APIBean);
    Adaptive.ContactPersonalInfo = ContactPersonalInfo;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=ContactPersonalInfo.js.map