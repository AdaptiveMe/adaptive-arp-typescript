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
       @enum {Adaptive.ContactSocialNetwork} Adaptive.ContactSocialNetwork
       Enumeration ContactSocialNetwork
    */
    var ContactSocialNetwork = (function () {
        function ContactSocialNetwork(value) {
            this.value = value;
        }
        ContactSocialNetwork.prototype.toString = function () {
            return this.value;
        };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ContactSocialNetwork}
        */
        ContactSocialNetwork.toObject = function (object) {
            var retValue = ContactSocialNetwork.Unknown;
            if (object != null && object.value != null && ContactSocialNetwork.hasOwnProperty(object.value)) {
                retValue = ContactSocialNetwork[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.ContactSocialNetwork} [Twitter='Twitter']
        */
        ContactSocialNetwork.Twitter = new ContactSocialNetwork("Twitter");
        /**
           @property {Adaptive.ContactSocialNetwork} [Facebook='Facebook']
        */
        ContactSocialNetwork.Facebook = new ContactSocialNetwork("Facebook");
        /**
           @property {Adaptive.ContactSocialNetwork} [GooglePlus='GooglePlus']
        */
        ContactSocialNetwork.GooglePlus = new ContactSocialNetwork("GooglePlus");
        /**
           @property {Adaptive.ContactSocialNetwork} [LinkedIn='LinkedIn']
        */
        ContactSocialNetwork.LinkedIn = new ContactSocialNetwork("LinkedIn");
        /**
           @property {Adaptive.ContactSocialNetwork} [Flickr='Flickr']
        */
        ContactSocialNetwork.Flickr = new ContactSocialNetwork("Flickr");
        /**
           @property {Adaptive.ContactSocialNetwork} [Unknown='Unknown']
        */
        ContactSocialNetwork.Unknown = new ContactSocialNetwork("Unknown");
        return ContactSocialNetwork;
    })();
    Adaptive.ContactSocialNetwork = ContactSocialNetwork;
})(Adaptive || (Adaptive = {}));
//# sourceMappingURL=ContactSocialNetwork.js.map