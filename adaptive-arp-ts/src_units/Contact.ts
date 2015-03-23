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

///<reference path="ContactAddress.ts"/>
///<reference path="ContactEmail.ts"/>
///<reference path="ContactPersonalInfo.ts"/>
///<reference path="ContactPhone.ts"/>
///<reference path="ContactProfessionalInfo.ts"/>
///<reference path="ContactSocial.ts"/>
///<reference path="ContactTag.ts"/>
///<reference path="ContactUid.ts"/>
///<reference path="ContactWebsite.ts"/>

module Adaptive {

     /**
        @class Adaptive.Contact
        @extends Adaptive.ContactUid
        Structure representing the data elements of a contact.

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     export class Contact extends ContactUid {

          /**
             @property {Adaptive.ContactAddress[]} contactAddresses
             The adresses from the contact
          */
          contactAddresses : Array<ContactAddress>;

          /**
             @property {Adaptive.ContactAddress[]} contactAddresses
             The adresses from the contact The 'contactAddressesProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactAddresses'.
          */
          get contactAddressesProperty() : Array<ContactAddress> {
               return this.contactAddresses;
          }

          set contactAddressesProperty(contactAddresses:Array<ContactAddress>) {
               this.contactAddresses = contactAddresses;
          }

          /**
             @property {Adaptive.ContactEmail[]} contactEmails
             The emails from the contact
          */
          contactEmails : Array<ContactEmail>;

          /**
             @property {Adaptive.ContactEmail[]} contactEmails
             The emails from the contact The 'contactEmailsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactEmails'.
          */
          get contactEmailsProperty() : Array<ContactEmail> {
               return this.contactEmails;
          }

          set contactEmailsProperty(contactEmails:Array<ContactEmail>) {
               this.contactEmails = contactEmails;
          }

          /**
             @property {Adaptive.ContactPhone[]} contactPhones
             The phones from the contact
          */
          contactPhones : Array<ContactPhone>;

          /**
             @property {Adaptive.ContactPhone[]} contactPhones
             The phones from the contact The 'contactPhonesProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactPhones'.
          */
          get contactPhonesProperty() : Array<ContactPhone> {
               return this.contactPhones;
          }

          set contactPhonesProperty(contactPhones:Array<ContactPhone>) {
               this.contactPhones = contactPhones;
          }

          /**
             @property {Adaptive.ContactSocial[]} contactSocials
             The social network info from the contact
          */
          contactSocials : Array<ContactSocial>;

          /**
             @property {Adaptive.ContactSocial[]} contactSocials
             The social network info from the contact The 'contactSocialsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactSocials'.
          */
          get contactSocialsProperty() : Array<ContactSocial> {
               return this.contactSocials;
          }

          set contactSocialsProperty(contactSocials:Array<ContactSocial>) {
               this.contactSocials = contactSocials;
          }

          /**
             @property {Adaptive.ContactTag[]} contactTags
             The aditional tags from the contact
          */
          contactTags : Array<ContactTag>;

          /**
             @property {Adaptive.ContactTag[]} contactTags
             The aditional tags from the contact The 'contactTagsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactTags'.
          */
          get contactTagsProperty() : Array<ContactTag> {
               return this.contactTags;
          }

          set contactTagsProperty(contactTags:Array<ContactTag>) {
               this.contactTags = contactTags;
          }

          /**
             @property {Adaptive.ContactWebsite[]} contactWebsites
             The websites from the contact
          */
          contactWebsites : Array<ContactWebsite>;

          /**
             @property {Adaptive.ContactWebsite[]} contactWebsites
             The websites from the contact The 'contactWebsitesProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactWebsites'.
          */
          get contactWebsitesProperty() : Array<ContactWebsite> {
               return this.contactWebsites;
          }

          set contactWebsitesProperty(contactWebsites:Array<ContactWebsite>) {
               this.contactWebsites = contactWebsites;
          }

          /**
             @property {Adaptive.ContactPersonalInfo} personalInfo
             The personal info from the contact
          */
          personalInfo : ContactPersonalInfo;

          /**
             @property {Adaptive.ContactPersonalInfo} personalInfo
             The personal info from the contact The 'personalInfoProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'personalInfo'.
          */
          get personalInfoProperty() : ContactPersonalInfo {
               return this.personalInfo;
          }

          set personalInfoProperty(personalInfo:ContactPersonalInfo) {
               this.personalInfo = personalInfo;
          }

          /**
             @property {Adaptive.ContactProfessionalInfo} professionalInfo
             The professional info from the contact
          */
          professionalInfo : ContactProfessionalInfo;

          /**
             @property {Adaptive.ContactProfessionalInfo} professionalInfo
             The professional info from the contact The 'professionalInfoProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'professionalInfo'.
          */
          get professionalInfoProperty() : ContactProfessionalInfo {
               return this.professionalInfo;
          }

          set professionalInfoProperty(professionalInfo:ContactProfessionalInfo) {
               this.professionalInfo = professionalInfo;
          }

          /**
             @method constructor
             Constructor used by implementation to set the Contact.

             @param {string} contactId of the Contact
             @since v2.0
          */
          constructor(contactId: string) {
               super(contactId);
          }

          /**
             @method
             Returns all the addresses of the Contact

             @return {Adaptive.ContactAddress[]} ContactAddress[]
             @since v2.0
          */
          getContactAddresses() : Array<ContactAddress> {
               return this.contactAddresses;
          }

          /**
             @method
             Set the addresses of the Contact

             @param {Adaptive.ContactAddress[]} contactAddresses Addresses of the contact
             @since v2.0
          */
          setContactAddresses(contactAddresses: Array<ContactAddress>) {
               this.contactAddresses = contactAddresses;
          }

          /**
             @method
             Returns all the emails of the Contact

             @return {Adaptive.ContactEmail[]} ContactEmail[]
             @since v2.0
          */
          getContactEmails() : Array<ContactEmail> {
               return this.contactEmails;
          }

          /**
             @method
             Set the emails of the Contact

             @param {Adaptive.ContactEmail[]} contactEmails Emails of the contact
             @since v2.0
          */
          setContactEmails(contactEmails: Array<ContactEmail>) {
               this.contactEmails = contactEmails;
          }

          /**
             @method
             Returns all the phones of the Contact

             @return {Adaptive.ContactPhone[]} ContactPhone[]
             @since v2.0
          */
          getContactPhones() : Array<ContactPhone> {
               return this.contactPhones;
          }

          /**
             @method
             Set the phones of the Contact

             @param {Adaptive.ContactPhone[]} contactPhones Phones of the contact
             @since v2.0
          */
          setContactPhones(contactPhones: Array<ContactPhone>) {
               this.contactPhones = contactPhones;
          }

          /**
             @method
             Returns all the social network info of the Contact

             @return {Adaptive.ContactSocial[]} ContactSocial[]
             @since v2.0
          */
          getContactSocials() : Array<ContactSocial> {
               return this.contactSocials;
          }

          /**
             @method
             Set the social network info of the Contact

             @param {Adaptive.ContactSocial[]} contactSocials Social Networks of the contact
             @since v2.0
          */
          setContactSocials(contactSocials: Array<ContactSocial>) {
               this.contactSocials = contactSocials;
          }

          /**
             @method
             Returns the additional tags of the Contact

             @return {Adaptive.ContactTag[]} ContactTag[]
             @since v2.0
          */
          getContactTags() : Array<ContactTag> {
               return this.contactTags;
          }

          /**
             @method
             Set the additional tags of the Contact

             @param {Adaptive.ContactTag[]} contactTags Tags of the contact
             @since v2.0
          */
          setContactTags(contactTags: Array<ContactTag>) {
               this.contactTags = contactTags;
          }

          /**
             @method
             Returns all the websites of the Contact

             @return {Adaptive.ContactWebsite[]} ContactWebsite[]
             @since v2.0
          */
          getContactWebsites() : Array<ContactWebsite> {
               return this.contactWebsites;
          }

          /**
             @method
             Set the websites of the Contact

             @param {Adaptive.ContactWebsite[]} contactWebsites Websites of the contact
             @since v2.0
          */
          setContactWebsites(contactWebsites: Array<ContactWebsite>) {
               this.contactWebsites = contactWebsites;
          }

          /**
             @method
             Returns the personal info of the Contact

             @return {Adaptive.ContactPersonalInfo} ContactPersonalInfo of the Contact
             @since v2.0
          */
          getPersonalInfo() : ContactPersonalInfo {
               return this.personalInfo;
          }

          /**
             @method
             Set the personal info of the Contact

             @param {Adaptive.ContactPersonalInfo} personalInfo Personal Information
             @since v2.0
          */
          setPersonalInfo(personalInfo: ContactPersonalInfo) {
               this.personalInfo = personalInfo;
          }

          /**
             @method
             Returns the professional info of the Contact

             @return {Adaptive.ContactProfessionalInfo} Array of personal info
             @since v2.0
          */
          getProfessionalInfo() : ContactProfessionalInfo {
               return this.professionalInfo;
          }

          /**
             @method
             Set the professional info of the Contact

             @param {Adaptive.ContactProfessionalInfo} professionalInfo Professional Information
             @since v2.0
          */
          setProfessionalInfo(professionalInfo: ContactProfessionalInfo) {
               this.professionalInfo = professionalInfo;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.Contact.
             @return {Adaptive.Contact} Wrapped object instance.
          */
          static toObject(object : any) : Contact {
               var result : Contact = new Contact(null);

               if (object != null ) {
                    // Assign values to parent bean fields.
                    result.contactId = object.contactId;

                    // Assign values to bean fields.
                    result.personalInfo = ContactPersonalInfo.toObject(object.personalInfo);
                    result.professionalInfo = ContactProfessionalInfo.toObject(object.professionalInfo);
                    result.contactAddresses = ContactAddress.toObjectArray(object.contactAddresses);
                    result.contactPhones = ContactPhone.toObjectArray(object.contactPhones);
                    result.contactEmails = ContactEmail.toObjectArray(object.contactEmails);
                    result.contactWebsites = ContactWebsite.toObjectArray(object.contactWebsites);
                    result.contactSocials = ContactSocial.toObjectArray(object.contactSocials);
                    result.contactTags = ContactTag.toObjectArray(object.contactTags);

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.Contact[].
             @return {Adaptive.Contact[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : Contact[] {
               var resultArray : Array<Contact> = new Array<Contact>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(Contact.toObject(object[i]));
                    }
               }
               return resultArray;
          }

     }
}

/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
