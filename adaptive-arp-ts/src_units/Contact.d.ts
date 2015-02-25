/// <reference path="ContactAddress.d.ts" />
/// <reference path="ContactEmail.d.ts" />
/// <reference path="ContactPersonalInfo.d.ts" />
/// <reference path="ContactPhone.d.ts" />
/// <reference path="ContactProfessionalInfo.d.ts" />
/// <reference path="ContactSocial.d.ts" />
/// <reference path="ContactTag.d.ts" />
/// <reference path="ContactUid.d.ts" />
/// <reference path="ContactWebsite.d.ts" />
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
       @class Adaptive.Contact
       @extends Adaptive.ContactUid
       Structure representing the data elements of a contact.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    class Contact extends ContactUid {
        /**
           @property {Adaptive.ContactAddress[]} contactAddresses
           The adresses from the contact
        */
        contactAddresses: Array<ContactAddress>;
        /**
           @property {Adaptive.ContactAddress[]} contactAddresses
           The adresses from the contact The 'contactAddressesProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactAddresses'.
        */
        contactAddressesProperty: Array<ContactAddress>;
        /**
           @property {Adaptive.ContactEmail[]} contactEmails
           The emails from the contact
        */
        contactEmails: Array<ContactEmail>;
        /**
           @property {Adaptive.ContactEmail[]} contactEmails
           The emails from the contact The 'contactEmailsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactEmails'.
        */
        contactEmailsProperty: Array<ContactEmail>;
        /**
           @property {Adaptive.ContactPhone[]} contactPhones
           The phones from the contact
        */
        contactPhones: Array<ContactPhone>;
        /**
           @property {Adaptive.ContactPhone[]} contactPhones
           The phones from the contact The 'contactPhonesProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactPhones'.
        */
        contactPhonesProperty: Array<ContactPhone>;
        /**
           @property {Adaptive.ContactSocial[]} contactSocials
           The social network info from the contact
        */
        contactSocials: Array<ContactSocial>;
        /**
           @property {Adaptive.ContactSocial[]} contactSocials
           The social network info from the contact The 'contactSocialsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactSocials'.
        */
        contactSocialsProperty: Array<ContactSocial>;
        /**
           @property {Adaptive.ContactTag[]} contactTags
           The aditional tags from the contact
        */
        contactTags: Array<ContactTag>;
        /**
           @property {Adaptive.ContactTag[]} contactTags
           The aditional tags from the contact The 'contactTagsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactTags'.
        */
        contactTagsProperty: Array<ContactTag>;
        /**
           @property {Adaptive.ContactWebsite[]} contactWebsites
           The websites from the contact
        */
        contactWebsites: Array<ContactWebsite>;
        /**
           @property {Adaptive.ContactWebsite[]} contactWebsites
           The websites from the contact The 'contactWebsitesProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactWebsites'.
        */
        contactWebsitesProperty: Array<ContactWebsite>;
        /**
           @property {Adaptive.ContactPersonalInfo} personalInfo
           The personal info from the contact
        */
        personalInfo: ContactPersonalInfo;
        /**
           @property {Adaptive.ContactPersonalInfo} personalInfo
           The personal info from the contact The 'personalInfoProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'personalInfo'.
        */
        personalInfoProperty: ContactPersonalInfo;
        /**
           @property {Adaptive.ContactProfessionalInfo} professionalInfo
           The professional info from the contact
        */
        professionalInfo: ContactProfessionalInfo;
        /**
           @property {Adaptive.ContactProfessionalInfo} professionalInfo
           The professional info from the contact The 'professionalInfoProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'professionalInfo'.
        */
        professionalInfoProperty: ContactProfessionalInfo;
        /**
           @method constructor
           Constructor used by implementation to set the Contact.

           @param {string} contactId of the Contact
           @since v2.0
        */
        constructor(contactId: string);
        /**
           @method
           Returns all the addresses of the Contact

           @return {Adaptive.ContactAddress[]} ContactAddress[]
           @since v2.0
        */
        getContactAddresses(): Array<ContactAddress>;
        /**
           @method
           Set the addresses of the Contact

           @param {Adaptive.ContactAddress[]} contactAddresses Addresses of the contact
           @since v2.0
        */
        setContactAddresses(contactAddresses: Array<ContactAddress>): void;
        /**
           @method
           Returns all the emails of the Contact

           @return {Adaptive.ContactEmail[]} ContactEmail[]
           @since v2.0
        */
        getContactEmails(): Array<ContactEmail>;
        /**
           @method
           Set the emails of the Contact

           @param {Adaptive.ContactEmail[]} contactEmails Emails of the contact
           @since v2.0
        */
        setContactEmails(contactEmails: Array<ContactEmail>): void;
        /**
           @method
           Returns all the phones of the Contact

           @return {Adaptive.ContactPhone[]} ContactPhone[]
           @since v2.0
        */
        getContactPhones(): Array<ContactPhone>;
        /**
           @method
           Set the phones of the Contact

           @param {Adaptive.ContactPhone[]} contactPhones Phones of the contact
           @since v2.0
        */
        setContactPhones(contactPhones: Array<ContactPhone>): void;
        /**
           @method
           Returns all the social network info of the Contact

           @return {Adaptive.ContactSocial[]} ContactSocial[]
           @since v2.0
        */
        getContactSocials(): Array<ContactSocial>;
        /**
           @method
           Set the social network info of the Contact

           @param {Adaptive.ContactSocial[]} contactSocials Social Networks of the contact
           @since v2.0
        */
        setContactSocials(contactSocials: Array<ContactSocial>): void;
        /**
           @method
           Returns the additional tags of the Contact

           @return {Adaptive.ContactTag[]} ContactTag[]
           @since v2.0
        */
        getContactTags(): Array<ContactTag>;
        /**
           @method
           Set the additional tags of the Contact

           @param {Adaptive.ContactTag[]} contactTags Tags of the contact
           @since v2.0
        */
        setContactTags(contactTags: Array<ContactTag>): void;
        /**
           @method
           Returns all the websites of the Contact

           @return {Adaptive.ContactWebsite[]} ContactWebsite[]
           @since v2.0
        */
        getContactWebsites(): Array<ContactWebsite>;
        /**
           @method
           Set the websites of the Contact

           @param {Adaptive.ContactWebsite[]} contactWebsites Websites of the contact
           @since v2.0
        */
        setContactWebsites(contactWebsites: Array<ContactWebsite>): void;
        /**
           @method
           Returns the personal info of the Contact

           @return {Adaptive.ContactPersonalInfo} ContactPersonalInfo of the Contact
           @since v2.0
        */
        getPersonalInfo(): ContactPersonalInfo;
        /**
           @method
           Set the personal info of the Contact

           @param {Adaptive.ContactPersonalInfo} personalInfo Personal Information
           @since v2.0
        */
        setPersonalInfo(personalInfo: ContactPersonalInfo): void;
        /**
           @method
           Returns the professional info of the Contact

           @return {Adaptive.ContactProfessionalInfo} Array of personal info
           @since v2.0
        */
        getProfessionalInfo(): ContactProfessionalInfo;
        /**
           @method
           Set the professional info of the Contact

           @param {Adaptive.ContactProfessionalInfo} professionalInfo Professional Information
           @since v2.0
        */
        setProfessionalInfo(professionalInfo: ContactProfessionalInfo): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Contact.
           @return {Adaptive.Contact} Wrapped object instance.
        */
        static toObject(object: any): Contact;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Contact[].
           @return {Adaptive.Contact[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): Contact[];
    }
}
