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
///<reference path="APIBean.ts"/>
///<reference path="ContactSocialNetwork.ts"/>
var Adaptive;
(function (Adaptive) {
    /**
       @class Adaptive.ContactSocial
       @extends Adaptive.APIBean
       Structure representing the social data elements of a contact.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    var ContactSocial = (function (_super) {
        __extends(ContactSocial, _super);
        /**
           @method constructor
           Constructor used by the implementation

           @param {Adaptive.ContactSocialNetwork} socialNetwork of the profile
           @param {string} profileUrl    of the user
           @since v2.0
        */
        function ContactSocial(socialNetwork, profileUrl) {
            _super.call(this);
            this.socialNetwork = socialNetwork;
            this.profileUrl = profileUrl;
        }
        Object.defineProperty(ContactSocial.prototype, "socialNetworkProperty", {
            /**
               @property {Adaptive.ContactSocialNetwork} socialNetwork
               The social network The 'socialNetworkProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'socialNetwork'.
            */
            get: function () {
                return this.socialNetwork;
            },
            set: function (socialNetwork) {
                this.socialNetwork = socialNetwork;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactSocial.prototype, "profileUrlProperty", {
            /**
               @property {string} profileUrl
               The profileUrl The 'profileUrlProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'profileUrl'.
            */
            get: function () {
                return this.profileUrl;
            },
            set: function (profileUrl) {
                this.profileUrl = profileUrl;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the social network

           @return {Adaptive.ContactSocialNetwork} socialNetwork
           @since v2.0
        */
        ContactSocial.prototype.getSocialNetwork = function () {
            return this.socialNetwork;
        };
        /**
           @method
           Set the social network

           @param {Adaptive.ContactSocialNetwork} socialNetwork of the profile
           @since v2.0
        */
        ContactSocial.prototype.setSocialNetwork = function (socialNetwork) {
            this.socialNetwork = socialNetwork;
        };
        /**
           @method
           Returns the profile url of the user

           @return {string} profileUrl
           @since v2.0
        */
        ContactSocial.prototype.getProfileUrl = function () {
            return this.profileUrl;
        };
        /**
           @method
           Set the profile url of the iser

           @param {string} profileUrl of the user
           @since v2.0
        */
        ContactSocial.prototype.setProfileUrl = function (profileUrl) {
            this.profileUrl = profileUrl;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactSocial.
           @return {Adaptive.ContactSocial} Wrapped object instance.
        */
        ContactSocial.toObject = function (object) {
            var result = new ContactSocial(null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.socialNetwork = Adaptive.ContactSocialNetwork.toObject(object.socialNetwork);
                result.profileUrl = object.profileUrl;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactSocial[].
           @return {Adaptive.ContactSocial[]} Wrapped object array instance.
        */
        ContactSocial.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(ContactSocial.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return ContactSocial;
    })(Adaptive.APIBean);
    Adaptive.ContactSocial = ContactSocial;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=ContactSocial.js.map