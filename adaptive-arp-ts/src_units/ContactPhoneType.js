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
var Adaptive;
(function (Adaptive) {
    /**
       @enum {Adaptive.ContactPhoneType} Adaptive.ContactPhoneType
       Enumeration ContactPhoneType
    */
    var ContactPhoneType = (function () {
        function ContactPhoneType(value) {
            this.value = value;
        }
        ContactPhoneType.prototype.toString = function () {
            return this.value;
        };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ContactPhoneType}
        */
        ContactPhoneType.toObject = function (object) {
            var retValue = ContactPhoneType.Unknown;
            if (object != null && object.value != null && ContactPhoneType.hasOwnProperty(object.value)) {
                retValue = ContactPhoneType[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.ContactPhoneType} [Mobile='Mobile']
        */
        ContactPhoneType.Mobile = new ContactPhoneType("Mobile");
        /**
           @property {Adaptive.ContactPhoneType} [Work='Work']
        */
        ContactPhoneType.Work = new ContactPhoneType("Work");
        /**
           @property {Adaptive.ContactPhoneType} [Home='Home']
        */
        ContactPhoneType.Home = new ContactPhoneType("Home");
        /**
           @property {Adaptive.ContactPhoneType} [Main='Main']
        */
        ContactPhoneType.Main = new ContactPhoneType("Main");
        /**
           @property {Adaptive.ContactPhoneType} [HomeFax='HomeFax']
        */
        ContactPhoneType.HomeFax = new ContactPhoneType("HomeFax");
        /**
           @property {Adaptive.ContactPhoneType} [WorkFax='WorkFax']
        */
        ContactPhoneType.WorkFax = new ContactPhoneType("WorkFax");
        /**
           @property {Adaptive.ContactPhoneType} [Other='Other']
        */
        ContactPhoneType.Other = new ContactPhoneType("Other");
        /**
           @property {Adaptive.ContactPhoneType} [Unknown='Unknown']
        */
        ContactPhoneType.Unknown = new ContactPhoneType("Unknown");
        return ContactPhoneType;
    })();
    Adaptive.ContactPhoneType = ContactPhoneType;
})(Adaptive || (Adaptive = {}));
//# sourceMappingURL=ContactPhoneType.js.map