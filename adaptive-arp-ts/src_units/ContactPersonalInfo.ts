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
///<reference path="ContactPersonalInfoTitle.ts"/>

module Adaptive {

     /**
        @class Adaptive.ContactPersonalInfo
        @extends Adaptive.APIBean
        Structure representing the personal info data elements of a contact.

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     export class ContactPersonalInfo extends APIBean {

          /**
             @property {Adaptive.ContactPersonalInfoTitle} title
             The title of the Contact
          */
          title : ContactPersonalInfoTitle;

          /**
             @property {Adaptive.ContactPersonalInfoTitle} title
             The title of the Contact The 'titleProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'title'.
          */
          get titleProperty() : ContactPersonalInfoTitle {
               return this.title;
          }

          set titleProperty(title:ContactPersonalInfoTitle) {
               this.title = title;
          }

          /**
             @property {string} lastName
             The last name of the Contact
          */
          lastName : string;

          /**
             @property {string} lastName
             The last name of the Contact The 'lastNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'lastName'.
          */
          get lastNameProperty() : string {
               return this.lastName;
          }

          set lastNameProperty(lastName:string) {
               this.lastName = lastName;
          }

          /**
             @property {string} middleName
             The middle name of the Contact if it proceeds
          */
          middleName : string;

          /**
             @property {string} middleName
             The middle name of the Contact if it proceeds The 'middleNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'middleName'.
          */
          get middleNameProperty() : string {
               return this.middleName;
          }

          set middleNameProperty(middleName:string) {
               this.middleName = middleName;
          }

          /**
             @property {string} name
             The name of the Contact
          */
          name : string;

          /**
             @property {string} name
             The name of the Contact The 'nameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'name'.
          */
          get nameProperty() : string {
               return this.name;
          }

          set nameProperty(name:string) {
               this.name = name;
          }

          /**
             @method constructor
             The Constructor used by the implementation

             @param {string} name       of the Contact
             @param {string} middleName of the Contact
             @param {string} lastName   of the Contact
             @param {Adaptive.ContactPersonalInfoTitle} title      of the Contact
             @since v2.0
          */
          constructor(name: string, middleName: string, lastName: string, title: ContactPersonalInfoTitle) {
               super();
               this.name = name;
               this.middleName = middleName;
               this.lastName = lastName;
               this.title = title;
          }

          /**
             @method
             Returns the title of the Contact

             @return {Adaptive.ContactPersonalInfoTitle} Title
             @since v2.0
          */
          getTitle() : ContactPersonalInfoTitle {
               return this.title;
          }

          /**
             @method
             Set the Title of the Contact

             @param {Adaptive.ContactPersonalInfoTitle} title of the Contact
             @since v2.0
          */
          setTitle(title: ContactPersonalInfoTitle) {
               this.title = title;
          }

          /**
             @method
             Returns the last name of the Contact

             @return {string} lastName
             @since v2.0
          */
          getLastName() : string {
               return this.lastName;
          }

          /**
             @method
             Set the last name of the Contact

             @param {string} lastName of the Contact
             @since v2.0
          */
          setLastName(lastName: string) {
               this.lastName = lastName;
          }

          /**
             @method
             Returns the middle name of the Contact

             @return {string} middelName
             @since v2.0
          */
          getMiddleName() : string {
               return this.middleName;
          }

          /**
             @method
             Set the middle name of the Contact

             @param {string} middleName of the Contact
             @since v2.0
          */
          setMiddleName(middleName: string) {
               this.middleName = middleName;
          }

          /**
             @method
             Returns the name of the Contact

             @return {string} name
             @since v2.0
          */
          getName() : string {
               return this.name;
          }

          /**
             @method
             Set the name of the Contact

             @param {string} name of the Contact
             @since v2.0
          */
          setName(name: string) {
               this.name = name;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ContactPersonalInfo.
             @return {Adaptive.ContactPersonalInfo} Wrapped object instance.
          */
          static toObject(object : any) : ContactPersonalInfo {
               var result : ContactPersonalInfo = new ContactPersonalInfo(null, null, null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.name = object.name;
                    result.middleName = object.middleName;
                    result.lastName = object.lastName;
                    result.title = ContactPersonalInfoTitle.toObject(object.title);

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ContactPersonalInfo[].
             @return {Adaptive.ContactPersonalInfo[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : ContactPersonalInfo[] {
               var resultArray : Array<ContactPersonalInfo> = new Array<ContactPersonalInfo>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(ContactPersonalInfo.toObject(object[i]));
                    }
               }
               return resultArray;
          }

     }
}

/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
