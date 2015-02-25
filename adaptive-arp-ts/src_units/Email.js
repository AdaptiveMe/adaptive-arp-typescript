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
///<reference path="EmailAddress.ts"/>
///<reference path="EmailAttachmentData.ts"/>
var Adaptive;
(function (Adaptive) {
    /**
       @class Adaptive.Email
       @extends Adaptive.APIBean
       Structure representing the data elements of an email.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    var Email = (function (_super) {
        __extends(Email, _super);
        /**
           @method constructor
           Constructor used by the implementation

           @param {Adaptive.EmailAddress[]} toRecipients        array of recipients
           @param {Adaptive.EmailAddress[]} ccRecipients        array of cc recipients
           @param {Adaptive.EmailAddress[]} bccRecipients       array of bcc recipients
           @param {Adaptive.EmailAttachmentData[]} emailAttachmentData array of attatchments
           @param {string} messageBody         body of the email
           @param {string} messageBodyMimeType mime type of the body
           @param {string} subject             of the email
           @since v2.0
        */
        function Email(toRecipients, ccRecipients, bccRecipients, emailAttachmentData, messageBody, messageBodyMimeType, subject) {
            _super.call(this);
            this.toRecipients = toRecipients;
            this.ccRecipients = ccRecipients;
            this.bccRecipients = bccRecipients;
            this.emailAttachmentData = emailAttachmentData;
            this.messageBody = messageBody;
            this.messageBodyMimeType = messageBodyMimeType;
            this.subject = subject;
        }
        Object.defineProperty(Email.prototype, "bccRecipientsProperty", {
            /**
               @property {Adaptive.EmailAddress[]} bccRecipients
               Array of Email Blind Carbon Copy recipients The 'bccRecipientsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'bccRecipients'.
            */
            get: function () {
                return this.bccRecipients;
            },
            set: function (bccRecipients) {
                this.bccRecipients = bccRecipients;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Email.prototype, "ccRecipientsProperty", {
            /**
               @property {Adaptive.EmailAddress[]} ccRecipients
               Array of Email Carbon Copy recipients The 'ccRecipientsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'ccRecipients'.
            */
            get: function () {
                return this.ccRecipients;
            },
            set: function (ccRecipients) {
                this.ccRecipients = ccRecipients;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Email.prototype, "emailAttachmentDataProperty", {
            /**
               @property {Adaptive.EmailAttachmentData[]} emailAttachmentData
               Array of attatchments The 'emailAttachmentDataProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'emailAttachmentData'.
            */
            get: function () {
                return this.emailAttachmentData;
            },
            set: function (emailAttachmentData) {
                this.emailAttachmentData = emailAttachmentData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Email.prototype, "messageBodyProperty", {
            /**
               @property {string} messageBody
               Message body The 'messageBodyProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'messageBody'.
            */
            get: function () {
                return this.messageBody;
            },
            set: function (messageBody) {
                this.messageBody = messageBody;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Email.prototype, "messageBodyMimeTypeProperty", {
            /**
               @property {string} messageBodyMimeType
               Message body mime type The 'messageBodyMimeTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'messageBodyMimeType'.
            */
            get: function () {
                return this.messageBodyMimeType;
            },
            set: function (messageBodyMimeType) {
                this.messageBodyMimeType = messageBodyMimeType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Email.prototype, "subjectProperty", {
            /**
               @property {string} subject
               Subject of the email The 'subjectProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'subject'.
            */
            get: function () {
                return this.subject;
            },
            set: function (subject) {
                this.subject = subject;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Email.prototype, "toRecipientsProperty", {
            /**
               @property {Adaptive.EmailAddress[]} toRecipients
               Array of Email recipients The 'toRecipientsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'toRecipients'.
            */
            get: function () {
                return this.toRecipients;
            },
            set: function (toRecipients) {
                this.toRecipients = toRecipients;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the array of recipients

           @return {Adaptive.EmailAddress[]} bccRecipients array of bcc recipients
           @since v2.0
        */
        Email.prototype.getBccRecipients = function () {
            return this.bccRecipients;
        };
        /**
           @method
           Set the array of recipients

           @param {Adaptive.EmailAddress[]} bccRecipients array of bcc recipients
           @since v2.0
        */
        Email.prototype.setBccRecipients = function (bccRecipients) {
            this.bccRecipients = bccRecipients;
        };
        /**
           @method
           Returns the array of recipients

           @return {Adaptive.EmailAddress[]} ccRecipients array of cc recipients
           @since v2.0
        */
        Email.prototype.getCcRecipients = function () {
            return this.ccRecipients;
        };
        /**
           @method
           Set the array of recipients

           @param {Adaptive.EmailAddress[]} ccRecipients array of cc recipients
           @since v2.0
        */
        Email.prototype.setCcRecipients = function (ccRecipients) {
            this.ccRecipients = ccRecipients;
        };
        /**
           @method
           Returns an array of attachments

           @return {Adaptive.EmailAttachmentData[]} emailAttachmentData array with the email attachments
           @since v2.0
        */
        Email.prototype.getEmailAttachmentData = function () {
            return this.emailAttachmentData;
        };
        /**
           @method
           Set the email attachment data array

           @param {Adaptive.EmailAttachmentData[]} emailAttachmentData array of email attatchments
           @since v2.0
        */
        Email.prototype.setEmailAttachmentData = function (emailAttachmentData) {
            this.emailAttachmentData = emailAttachmentData;
        };
        /**
           @method
           Returns the message body of the email

           @return {string} message Body string of the email
           @since v2.0
        */
        Email.prototype.getMessageBody = function () {
            return this.messageBody;
        };
        /**
           @method
           Set the message body of the email

           @param {string} messageBody message body of the email
           @since v2.0
        */
        Email.prototype.setMessageBody = function (messageBody) {
            this.messageBody = messageBody;
        };
        /**
           @method
           Returns the myme type of the message body

           @return {string} mime type string of the message boddy
           @since v2.0
        */
        Email.prototype.getMessageBodyMimeType = function () {
            return this.messageBodyMimeType;
        };
        /**
           @method
           Set the mime type for the message body

           @param {string} messageBodyMimeType type of the body message
           @since v2.0
        */
        Email.prototype.setMessageBodyMimeType = function (messageBodyMimeType) {
            this.messageBodyMimeType = messageBodyMimeType;
        };
        /**
           @method
           Returns the subject of the email

           @return {string} subject string of the email
           @since v2.0
        */
        Email.prototype.getSubject = function () {
            return this.subject;
        };
        /**
           @method
           Set the subject of the email

           @param {string} subject of the email
           @since v2.0
        */
        Email.prototype.setSubject = function (subject) {
            this.subject = subject;
        };
        /**
           @method
           Returns the array of recipients

           @return {Adaptive.EmailAddress[]} toRecipients array of recipients
           @since v2.0
        */
        Email.prototype.getToRecipients = function () {
            return this.toRecipients;
        };
        /**
           @method
           Set the array of recipients

           @param {Adaptive.EmailAddress[]} toRecipients array of recipients
           @since v2.0
        */
        Email.prototype.setToRecipients = function (toRecipients) {
            this.toRecipients = toRecipients;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Email.
           @return {Adaptive.Email} Wrapped object instance.
        */
        Email.toObject = function (object) {
            var result = new Email(null, null, null, null, null, null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.toRecipients = Adaptive.EmailAddress.toObjectArray(object.toRecipients);
                result.ccRecipients = Adaptive.EmailAddress.toObjectArray(object.ccRecipients);
                result.bccRecipients = Adaptive.EmailAddress.toObjectArray(object.bccRecipients);
                result.emailAttachmentData = Adaptive.EmailAttachmentData.toObjectArray(object.emailAttachmentData);
                result.messageBody = object.messageBody;
                result.messageBodyMimeType = object.messageBodyMimeType;
                result.subject = object.subject;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Email[].
           @return {Adaptive.Email[]} Wrapped object array instance.
        */
        Email.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(Email.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return Email;
    })(Adaptive.APIBean);
    Adaptive.Email = Email;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=Email.js.map