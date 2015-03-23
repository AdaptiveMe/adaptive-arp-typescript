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

///<reference path="APIRequest.ts"/>
///<reference path="APIResponse.ts"/>
///<reference path="BasePIMBridge.ts"/>
///<reference path="CommonUtil.ts"/>
///<reference path="ContactPhotoResultCallback.ts"/>
///<reference path="ContactResultCallback.ts"/>
///<reference path="ContactUid.ts"/>
///<reference path="IAdaptiveRPGroup.ts"/>
///<reference path="IBasePIM.ts"/>
///<reference path="IContact.ts"/>
///<reference path="IContactFieldGroup.ts"/>
///<reference path="IContactFilter.ts"/>
///<reference path="IContactPhotoResultCallback.ts"/>
///<reference path="IContactResultCallback.ts"/>
module Adaptive {

     /**
        @class Adaptive.ContactBridge
        @extends Adaptive.BasePIMBridge
        Interface for Managing the Contact operations

        @author Francisco Javier Martin Bueno
        @since v2.0
     */
     export class ContactBridge extends BasePIMBridge implements IContact {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }

          /**
             @method
             Get all the details of a contact according to its id

             @param {Adaptive.ContactUid} contact contact  id to search for
             @param {Adaptive.ContactResultCallback} callback callback called for return
             @since v2.0
          */
          getContact(contact : ContactUid, callback : IContactResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(contact));
               var apiRequest : APIRequest = new APIRequest("IContact","getContact",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredContactResultCallback);
          }

          /**
             @method
             Get the contact photo

             @param {Adaptive.ContactUid} contact contact  id to search for
             @param {Adaptive.ContactPhotoResultCallback} callback callback called for return
             @since v2.0
          */
          getContactPhoto(contact : ContactUid, callback : IContactPhotoResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(contact));
               var apiRequest : APIRequest = new APIRequest("IContact","getContactPhoto",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredContactPhotoResultCallback);
          }

          /**
             @method
             Get all contacts

             @param {Adaptive.ContactResultCallback} callback callback called for return
             @since v2.0
          */
          getContacts(callback : IContactResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IContact","getContacts",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredContactResultCallback);
          }

          /**
             @method
             Get marked fields of all contacts

             @param {Adaptive.ContactResultCallback} callback callback called for return
             @param {Adaptive.IContactFieldGroup[]} fields fields   to get for each Contact
             @since v2.0
          */
          getContactsForFields(callback : IContactResultCallback, fields : Array<IContactFieldGroup>) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(fields));
               var apiRequest : APIRequest = new APIRequest("IContact","getContactsForFields",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredContactResultCallback);
          }

          /**
             @method
             Get marked fields of all contacts according to a filter

             @param {Adaptive.ContactResultCallback} callback callback called for return
             @param {Adaptive.IContactFieldGroup[]} fields fields   to get for each Contact
             @param {Adaptive.IContactFilter[]} filter filter   to search for
             @since v2.0
          */
          getContactsWithFilter(callback : IContactResultCallback, fields : Array<IContactFieldGroup>, filter : Array<IContactFilter>) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(fields));
               arParams.push(JSON.stringify(filter));
               var apiRequest : APIRequest = new APIRequest("IContact","getContactsWithFilter",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredContactResultCallback);
          }

          /**
             @method
             Search contacts according to a term and send it to the callback

             @param {string} term term     string to search
             @param {Adaptive.ContactResultCallback} callback callback called for return
             @since v2.0
          */
          searchContacts(term : string, callback : IContactResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(term));
               var apiRequest : APIRequest = new APIRequest("IContact","searchContacts",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredContactResultCallback);
          }

          /**
             @method
             Search contacts according to a term with a filter and send it to the callback

             @param {string} term term     string to search
             @param {Adaptive.ContactResultCallback} callback callback called for return
             @param {Adaptive.IContactFilter[]} filter filter   to search for
             @since v2.0
          */
          searchContactsWithFilter(term : string, callback : IContactResultCallback, filter : Array<IContactFilter>) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(term));
               arParams.push(JSON.stringify(filter));
               var apiRequest : APIRequest = new APIRequest("IContact","searchContactsWithFilter",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredContactResultCallback);
          }

          /**
             @method
             Set the contact photo

             @param {Adaptive.ContactUid} contact contact  id to assign the photo
             @param {number[]} pngImage pngImage photo as byte array
             @return {boolean} true if set is successful;false otherwise
             @since v2.0
          */
          setContactPhoto(contact : ContactUid, pngImage : Array<number>) : boolean {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(contact));
               arParams.push(JSON.stringify(pngImage));
               var apiRequest : APIRequest = new APIRequest("IContact","setContactPhoto",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : boolean = false;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = JSON.parse(apiResponse.getResponse());
               }
               return response;
          }
     }
}
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
