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

///<reference path="APIBean.ts"/>

module Adaptive {

     /**
        @class Adaptive.ContactUid
        @extends Adaptive.APIBean
        Structure representing the internal unique identifier data elements of a contact.

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     export class ContactUid extends APIBean {

          /**
             @property {string} contactId
             The id of the Contact
          */
          contactId : string;

          /**
             @property {string} contactId
             The id of the Contact The 'contactIdProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactId'.
          */
          get contactIdProperty() : string {
               return this.contactId;
          }

          set contactIdProperty(contactId:string) {
               this.contactId = contactId;
          }

          /**
             @method constructor
             Constructor used by implementation to set the Contact id.

             @param {string} contactId Internal unique contact id.
             @since v2.0
          */
          constructor(contactId: string) {
               super();
               this.contactId = contactId;
          }

          /**
             @method
             Returns the contact id

             @return {string} Contactid Internal unique contact id.
             @since v2.0
          */
          getContactId() : string {
               return this.contactId;
          }

          /**
             @method
             Set the id of the Contact

             @param {string} contactId Internal unique contact id.
             @since v2.0
          */
          setContactId(contactId: string) {
               this.contactId = contactId;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ContactUid.
             @return {Adaptive.ContactUid} Wrapped object instance.
          */
          static toObject(object : any) : ContactUid {
               var result : ContactUid = new ContactUid(null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.contactId = object.contactId;

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ContactUid[].
             @return {Adaptive.ContactUid[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : ContactUid[] {
               var resultArray : Array<ContactUid> = new Array<ContactUid>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(ContactUid.toObject(object[i]));
                    }
               }
               return resultArray;
          }

     }
}

/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
