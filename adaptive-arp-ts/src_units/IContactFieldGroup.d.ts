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
declare module Adaptive {
    /**
       @enum {Adaptive.IContactFieldGroup} Adaptive.IContactFieldGroup
       Enumeration IContactFieldGroup
    */
    class IContactFieldGroup {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IContactFieldGroup} [PersonalInfo='PersonalInfo']
        */
        static PersonalInfo: IContactFieldGroup;
        /**
           @property {Adaptive.IContactFieldGroup} [ProfessionalInfo='ProfessionalInfo']
        */
        static ProfessionalInfo: IContactFieldGroup;
        /**
           @property {Adaptive.IContactFieldGroup} [Addresses='Addresses']
        */
        static Addresses: IContactFieldGroup;
        /**
           @property {Adaptive.IContactFieldGroup} [Phones='Phones']
        */
        static Phones: IContactFieldGroup;
        /**
           @property {Adaptive.IContactFieldGroup} [Emails='Emails']
        */
        static Emails: IContactFieldGroup;
        /**
           @property {Adaptive.IContactFieldGroup} [Websites='Websites']
        */
        static Websites: IContactFieldGroup;
        /**
           @property {Adaptive.IContactFieldGroup} [Socials='Socials']
        */
        static Socials: IContactFieldGroup;
        /**
           @property {Adaptive.IContactFieldGroup} [Tags='Tags']
        */
        static Tags: IContactFieldGroup;
        /**
           @property {Adaptive.IContactFieldGroup} [Unknown='Unknown']
        */
        static Unknown: IContactFieldGroup;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IContactFieldGroup}
        */
        static toObject(object: any): IContactFieldGroup;
    }
}
