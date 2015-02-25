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
var __extends = this.__extends || function (d, b) {
    for (var p in b) { if (b.hasOwnProperty(p)) { d[p] = b[p]; } }
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
var Adaptive;
(function (Adaptive) {
    /**
       @class Adaptive.ContactBridge
       @extends Adaptive.BasePIMBridge
       Interface for Managing the Contact operations

       @author Francisco Javier Martin Bueno
       @since v2.0
    */
    var ContactBridge = (function (_super) {
        __extends(ContactBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function ContactBridge() {
            _super.call(this);
        }
        /**
           @method
           Get all the details of a contact according to its id

           @param {Adaptive.ContactUid} contact contact  id to search for
           @param {Adaptive.ContactResultCallback} callback callback called for return
           @since v2.0
        */
        ContactBridge.prototype.getContact = function (contact, callback) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(contact));
            var apiRequest = new Adaptive.APIRequest("IContact", "getContact", arParams, callback.getId());
            Adaptive.postRequestCallback(apiRequest, callback, Adaptive.registeredContactResultCallback);
        };
        /**
           @method
           Get the contact photo

           @param {Adaptive.ContactUid} contact contact  id to search for
           @param {Adaptive.ContactPhotoResultCallback} callback callback called for return
           @since v2.0
        */
        ContactBridge.prototype.getContactPhoto = function (contact, callback) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(contact));
            var apiRequest = new Adaptive.APIRequest("IContact", "getContactPhoto", arParams, callback.getId());
            Adaptive.postRequestCallback(apiRequest, callback, Adaptive.registeredContactPhotoResultCallback);
        };
        /**
           @method
           Get all contacts

           @param {Adaptive.ContactResultCallback} callback callback called for return
           @since v2.0
        */
        ContactBridge.prototype.getContacts = function (callback) {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new Adaptive.APIRequest("IContact", "getContacts", arParams, callback.getId());
            Adaptive.postRequestCallback(apiRequest, callback, Adaptive.registeredContactResultCallback);
        };
        /**
           @method
           Get marked fields of all contacts

           @param {Adaptive.ContactResultCallback} callback callback called for return
           @param {Adaptive.IContactFieldGroup[]} fields fields   to get for each Contact
           @since v2.0
        */
        ContactBridge.prototype.getContactsForFields = function (callback, fields) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(fields));
            var apiRequest = new Adaptive.APIRequest("IContact", "getContactsForFields", arParams, callback.getId());
            Adaptive.postRequestCallback(apiRequest, callback, Adaptive.registeredContactResultCallback);
        };
        /**
           @method
           Get marked fields of all contacts according to a filter

           @param {Adaptive.ContactResultCallback} callback callback called for return
           @param {Adaptive.IContactFieldGroup[]} fields fields   to get for each Contact
           @param {Adaptive.IContactFilter[]} filter filter   to search for
           @since v2.0
        */
        ContactBridge.prototype.getContactsWithFilter = function (callback, fields, filter) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(fields));
            arParams.push(JSON.stringify(filter));
            var apiRequest = new Adaptive.APIRequest("IContact", "getContactsWithFilter", arParams, callback.getId());
            Adaptive.postRequestCallback(apiRequest, callback, Adaptive.registeredContactResultCallback);
        };
        /**
           @method
           Search contacts according to a term and send it to the callback

           @param {string} term term     string to search
           @param {Adaptive.ContactResultCallback} callback callback called for return
           @since v2.0
        */
        ContactBridge.prototype.searchContacts = function (term, callback) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(term));
            var apiRequest = new Adaptive.APIRequest("IContact", "searchContacts", arParams, callback.getId());
            Adaptive.postRequestCallback(apiRequest, callback, Adaptive.registeredContactResultCallback);
        };
        /**
           @method
           Search contacts according to a term with a filter and send it to the callback

           @param {string} term term     string to search
           @param {Adaptive.ContactResultCallback} callback callback called for return
           @param {Adaptive.IContactFilter[]} filter filter   to search for
           @since v2.0
        */
        ContactBridge.prototype.searchContactsWithFilter = function (term, callback, filter) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(term));
            arParams.push(JSON.stringify(filter));
            var apiRequest = new Adaptive.APIRequest("IContact", "searchContactsWithFilter", arParams, callback.getId());
            Adaptive.postRequestCallback(apiRequest, callback, Adaptive.registeredContactResultCallback);
        };
        /**
           @method
           Set the contact photo

           @param {Adaptive.ContactUid} contact contact  id to assign the photo
           @param {number[]} pngImage pngImage photo as byte array
           @return {boolean} true if set is successful;false otherwise
           @since v2.0
        */
        ContactBridge.prototype.setContactPhoto = function (contact, pngImage) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(contact));
            arParams.push(JSON.stringify(pngImage));
            var apiRequest = new Adaptive.APIRequest("IContact", "setContactPhoto", arParams, -1);
            var apiResponse = Adaptive.postRequest(apiRequest);
            // Prepare response.
            var response = false;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = JSON.parse(apiResponse.getResponse());
            }
            return response;
        };
        return ContactBridge;
    })(Adaptive.BasePIMBridge);
    Adaptive.ContactBridge = ContactBridge;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=ContactBridge.js.map