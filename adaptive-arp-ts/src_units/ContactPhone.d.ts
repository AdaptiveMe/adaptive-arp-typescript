/// <reference path="APIBean.d.ts" />
/// <reference path="ContactPhoneType.d.ts" />
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
       @class Adaptive.ContactPhone
       @extends Adaptive.APIBean
       Structure representing the phone data elements of a contact.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    class ContactPhone extends APIBean {
        /**
           @property {Adaptive.ContactPhoneType} phoneType
           The phone number phoneType
        */
        phoneType: ContactPhoneType;
        /**
           @property {Adaptive.ContactPhoneType} phoneType
           The phone number phoneType The 'phoneTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'phoneType'.
        */
        phoneTypeProperty: ContactPhoneType;
        /**
           @property {string} phone
           The phone number
        */
        phone: string;
        /**
           @property {string} phone
           The phone number The 'phoneProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'phone'.
        */
        phoneProperty: string;
        /**
           @method constructor
           Constructor used by implementation to set the contact Phone

           @param {string} phone     Phone number
           @param {Adaptive.ContactPhoneType} phoneType Type of Phone number
           @since v2.0
        */
        constructor(phone: string, phoneType: ContactPhoneType);
        /**
           @method
           Returns the phone phoneType

           @return {Adaptive.ContactPhoneType} phoneType
           @since v2.0
        */
        getPhoneType(): ContactPhoneType;
        /**
           @method
           Set the phoneType of the phone number

           @param {Adaptive.ContactPhoneType} phoneType Type of Phone number
           @since v2.0
        */
        setPhoneType(phoneType: ContactPhoneType): void;
        /**
           @method
           Returns the phone number

           @return {string} phone number
           @since v2.0
        */
        getPhone(): string;
        /**
           @method
           Set the phone number

           @param {string} phone number
           @since v2.0
        */
        setPhone(phone: string): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactPhone.
           @return {Adaptive.ContactPhone} Wrapped object instance.
        */
        static toObject(object: any): ContactPhone;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactPhone[].
           @return {Adaptive.ContactPhone[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): ContactPhone[];
    }
}
