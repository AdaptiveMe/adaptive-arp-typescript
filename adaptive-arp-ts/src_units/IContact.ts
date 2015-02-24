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

///<reference path="ContactUid.ts"/>
///<reference path="IAdaptiveRPGroup.ts"/>
///<reference path="IBasePIM.ts"/>
///<reference path="IContactFieldGroup.ts"/>
///<reference path="IContactFilter.ts"/>
///<reference path="IContactPhotoResultCallback.ts"/>
///<reference path="IContactResultCallback.ts"/>

module Adaptive {

     /**
        Interface for Managing the Contact operations

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IContact
     */
     export interface IContact extends IBasePIM {
          /**
             @method
             Get the contact photo
             @param contact  id to search for
             @param callback called for return
             @since v2.0
          */
          getContactPhoto(contact:ContactUid, callback:IContactPhotoResultCallback);
          /**
             @method
             Get all the details of a contact according to its id
             @param contact  id to search for
             @param callback called for return
             @since v2.0
          */
          getContact(contact:ContactUid, callback:IContactResultCallback);
          /**
             @method
             Get marked fields of all contacts
             @param callback called for return
             @param fields   to get for each Contact
             @since v2.0
          */
          getContactsForFields(callback:IContactResultCallback, fields:Array<IContactFieldGroup>);
          /**
             @method
             Get marked fields of all contacts according to a filter
             @param callback called for return
             @param fields   to get for each Contact
             @param filter   to search for
             @since v2.0
          */
          getContactsWithFilter(callback:IContactResultCallback, fields:Array<IContactFieldGroup>, filter:Array<IContactFilter>);
          /**
             @method
             Get all contacts
             @param callback called for return
             @since v2.0
          */
          getContacts(callback:IContactResultCallback);
          /**
             @method
             Search contacts according to a term with a filter and send it to the callback
             @param term     string to search
             @param callback called for return
             @param filter   to search for
             @since v2.0
          */
          searchContactsWithFilter(term:string, callback:IContactResultCallback, filter:Array<IContactFilter>);
          /**
             @method
             Search contacts according to a term and send it to the callback
             @param term     string to search
             @param callback called for return
             @since v2.0
          */
          searchContacts(term:string, callback:IContactResultCallback);
          /**
             @method
             Set the contact photo
             @param contact  id to assign the photo
             @param pngImage photo as byte array
             @return {boolean} true if set is successful;false otherwise
             @since v2.0
          */
          setContactPhoto(contact:ContactUid, pngImage:Array<number>) : boolean;
     }
}

/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
