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
       @enum {Adaptive.IContactFieldGroup} Adaptive.IContactFieldGroup
       Enumeration IContactFieldGroup
    */
    var IContactFieldGroup = (function () {
        function IContactFieldGroup(value) {
            this.value = value;
        }
        IContactFieldGroup.prototype.toString = function () {
            return this.value;
        };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IContactFieldGroup}
        */
        IContactFieldGroup.toObject = function (object) {
            var retValue = IContactFieldGroup.Unknown;
            if (object != null && object.value != null && IContactFieldGroup.hasOwnProperty(object.value)) {
                retValue = IContactFieldGroup[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IContactFieldGroup} [PersonalInfo='PersonalInfo']
        */
        IContactFieldGroup.PersonalInfo = new IContactFieldGroup("PersonalInfo");
        /**
           @property {Adaptive.IContactFieldGroup} [ProfessionalInfo='ProfessionalInfo']
        */
        IContactFieldGroup.ProfessionalInfo = new IContactFieldGroup("ProfessionalInfo");
        /**
           @property {Adaptive.IContactFieldGroup} [Addresses='Addresses']
        */
        IContactFieldGroup.Addresses = new IContactFieldGroup("Addresses");
        /**
           @property {Adaptive.IContactFieldGroup} [Phones='Phones']
        */
        IContactFieldGroup.Phones = new IContactFieldGroup("Phones");
        /**
           @property {Adaptive.IContactFieldGroup} [Emails='Emails']
        */
        IContactFieldGroup.Emails = new IContactFieldGroup("Emails");
        /**
           @property {Adaptive.IContactFieldGroup} [Websites='Websites']
        */
        IContactFieldGroup.Websites = new IContactFieldGroup("Websites");
        /**
           @property {Adaptive.IContactFieldGroup} [Socials='Socials']
        */
        IContactFieldGroup.Socials = new IContactFieldGroup("Socials");
        /**
           @property {Adaptive.IContactFieldGroup} [Tags='Tags']
        */
        IContactFieldGroup.Tags = new IContactFieldGroup("Tags");
        /**
           @property {Adaptive.IContactFieldGroup} [Unknown='Unknown']
        */
        IContactFieldGroup.Unknown = new IContactFieldGroup("Unknown");
        return IContactFieldGroup;
    })();
    Adaptive.IContactFieldGroup = IContactFieldGroup;
})(Adaptive || (Adaptive = {}));
//# sourceMappingURL=IContactFieldGroup.js.map