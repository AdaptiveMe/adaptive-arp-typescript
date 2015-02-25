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
       @class Adaptive.ContactUid
       @extends Adaptive.APIBean
       Structure representing the internal unique identifier data elements of a contact.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    var ContactUid = (function (_super) {
        __extends(ContactUid, _super);
        /**
           @method constructor
           Constructor used by implementation to set the Contact id.

           @param {string} contactId Internal unique contact id.
           @since v2.0
        */
        function ContactUid(contactId) {
            _super.call(this);
            this.contactId = contactId;
        }
        Object.defineProperty(ContactUid.prototype, "contactIdProperty", {
            /**
               @property {string} contactId
               The id of the Contact The 'contactIdProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactId'.
            */
            get: function () {
                return this.contactId;
            },
            set: function (contactId) {
                this.contactId = contactId;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the contact id

           @return {string} Contactid Internal unique contact id.
           @since v2.0
        */
        ContactUid.prototype.getContactId = function () {
            return this.contactId;
        };
        /**
           @method
           Set the id of the Contact

           @param {string} contactId Internal unique contact id.
           @since v2.0
        */
        ContactUid.prototype.setContactId = function (contactId) {
            this.contactId = contactId;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactUid.
           @return {Adaptive.ContactUid} Wrapped object instance.
        */
        ContactUid.toObject = function (object) {
            var result = new ContactUid(null);
            if (object != null) {
                // Assign values to bean fields.
                result.contactId = object.contactId;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactUid[].
           @return {Adaptive.ContactUid[]} Wrapped object array instance.
        */
        ContactUid.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(ContactUid.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return ContactUid;
    })(Adaptive.APIBean);
    Adaptive.ContactUid = ContactUid;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=ContactUid.js.map