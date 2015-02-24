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
       @enum {Adaptive.ContactEmailType} Adaptive.ContactEmailType
       Enumeration ContactEmailType
    */
    var ContactEmailType = (function () {
        function ContactEmailType(value) {
            this.value = value;
        }
        ContactEmailType.prototype.toString = function () {
            return this.value;
        };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ContactEmailType}
        */
        ContactEmailType.toObject = function (object) {
            var retValue = ContactEmailType.Unknown;
            if (object != null && object.value != null && ContactEmailType.hasOwnProperty(object.value)) {
                retValue = ContactEmailType[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.ContactEmailType} [Personal='Personal']
        */
        ContactEmailType.Personal = new ContactEmailType("Personal");
        /**
           @property {Adaptive.ContactEmailType} [Work='Work']
        */
        ContactEmailType.Work = new ContactEmailType("Work");
        /**
           @property {Adaptive.ContactEmailType} [Other='Other']
        */
        ContactEmailType.Other = new ContactEmailType("Other");
        /**
           @property {Adaptive.ContactEmailType} [Unknown='Unknown']
        */
        ContactEmailType.Unknown = new ContactEmailType("Unknown");
        return ContactEmailType;
    })();
    Adaptive.ContactEmailType = ContactEmailType;
})(Adaptive || (Adaptive = {}));
//# sourceMappingURL=ContactEmailType.js.map