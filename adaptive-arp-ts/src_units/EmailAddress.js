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
var Adaptive;
(function (Adaptive) {
    /**
       @class Adaptive.EmailAddress
       @extends Adaptive.APIBean
       Structure representing the data elements of an email addressee.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    var EmailAddress = (function (_super) {
        __extends(EmailAddress, _super);
        /**
           @method constructor
           Constructor used by implementation

           @param {string} address of the Email
           @since v2.0
        */
        function EmailAddress(address) {
            _super.call(this);
            this.address = address;
        }
        Object.defineProperty(EmailAddress.prototype, "addressProperty", {
            /**
               @property {string} address
               The Email address The 'addressProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'address'.
            */
            get: function () {
                return this.address;
            },
            set: function (address) {
                this.address = address;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the email address

           @return {string} address of the Email
           @since v2.0
        */
        EmailAddress.prototype.getAddress = function () {
            return this.address;
        };
        /**
           @method
           Set the Email address

           @param {string} address of the Email
           @since v2.0
        */
        EmailAddress.prototype.setAddress = function (address) {
            this.address = address;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.EmailAddress.
           @return {Adaptive.EmailAddress} Wrapped object instance.
        */
        EmailAddress.toObject = function (object) {
            var result = new EmailAddress(null);
            if (object != null) {
                // Assign values to bean fields.
                result.address = object.address;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.EmailAddress[].
           @return {Adaptive.EmailAddress[]} Wrapped object array instance.
        */
        EmailAddress.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(EmailAddress.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return EmailAddress;
    })(Adaptive.APIBean);
    Adaptive.EmailAddress = EmailAddress;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=EmailAddress.js.map