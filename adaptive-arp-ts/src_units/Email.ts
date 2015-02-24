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
///<reference path="EmailAddress.ts"/>
///<reference path="EmailAttachmentData.ts"/>

module Adaptive {

     /**
        @class Adaptive.Email
        @extends Adaptive.APIBean
        Structure representing the data elements of an email.

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     export class Email extends APIBean {

          /**
             @property {Adaptive.EmailAddress[]} bccRecipients
             Array of Email Blind Carbon Copy recipients
          */
          bccRecipients : Array<EmailAddress>;

          /**
             @property {Adaptive.EmailAddress[]} bccRecipients
             Array of Email Blind Carbon Copy recipients The 'bccRecipientsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'bccRecipients'.
          */
          get bccRecipientsProperty() : Array<EmailAddress> {
               return this.bccRecipients;
          }

          set bccRecipientsProperty(bccRecipients:Array<EmailAddress>) {
               this.bccRecipients = bccRecipients;
          }

          /**
             @property {Adaptive.EmailAddress[]} ccRecipients
             Array of Email Carbon Copy recipients
          */
          ccRecipients : Array<EmailAddress>;

          /**
             @property {Adaptive.EmailAddress[]} ccRecipients
             Array of Email Carbon Copy recipients The 'ccRecipientsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'ccRecipients'.
          */
          get ccRecipientsProperty() : Array<EmailAddress> {
               return this.ccRecipients;
          }

          set ccRecipientsProperty(ccRecipients:Array<EmailAddress>) {
               this.ccRecipients = ccRecipients;
          }

          /**
             @property {Adaptive.EmailAttachmentData[]} emailAttachmentData
             Array of attatchments
          */
          emailAttachmentData : Array<EmailAttachmentData>;

          /**
             @property {Adaptive.EmailAttachmentData[]} emailAttachmentData
             Array of attatchments The 'emailAttachmentDataProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'emailAttachmentData'.
          */
          get emailAttachmentDataProperty() : Array<EmailAttachmentData> {
               return this.emailAttachmentData;
          }

          set emailAttachmentDataProperty(emailAttachmentData:Array<EmailAttachmentData>) {
               this.emailAttachmentData = emailAttachmentData;
          }

          /**
             @property {string} messageBody
             Message body
          */
          messageBody : string;

          /**
             @property {string} messageBody
             Message body The 'messageBodyProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'messageBody'.
          */
          get messageBodyProperty() : string {
               return this.messageBody;
          }

          set messageBodyProperty(messageBody:string) {
               this.messageBody = messageBody;
          }

          /**
             @property {string} messageBodyMimeType
             Message body mime type
          */
          messageBodyMimeType : string;

          /**
             @property {string} messageBodyMimeType
             Message body mime type The 'messageBodyMimeTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'messageBodyMimeType'.
          */
          get messageBodyMimeTypeProperty() : string {
               return this.messageBodyMimeType;
          }

          set messageBodyMimeTypeProperty(messageBodyMimeType:string) {
               this.messageBodyMimeType = messageBodyMimeType;
          }

          /**
             @property {string} subject
             Subject of the email
          */
          subject : string;

          /**
             @property {string} subject
             Subject of the email The 'subjectProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'subject'.
          */
          get subjectProperty() : string {
               return this.subject;
          }

          set subjectProperty(subject:string) {
               this.subject = subject;
          }

          /**
             @property {Adaptive.EmailAddress[]} toRecipients
             Array of Email recipients
          */
          toRecipients : Array<EmailAddress>;

          /**
             @property {Adaptive.EmailAddress[]} toRecipients
             Array of Email recipients The 'toRecipientsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'toRecipients'.
          */
          get toRecipientsProperty() : Array<EmailAddress> {
               return this.toRecipients;
          }

          set toRecipientsProperty(toRecipients:Array<EmailAddress>) {
               this.toRecipients = toRecipients;
          }

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
          constructor(toRecipients: Array<EmailAddress>, ccRecipients: Array<EmailAddress>, bccRecipients: Array<EmailAddress>, emailAttachmentData: Array<EmailAttachmentData>, messageBody: string, messageBodyMimeType: string, subject: string) {
               super();
               this.toRecipients = toRecipients;
               this.ccRecipients = ccRecipients;
               this.bccRecipients = bccRecipients;
               this.emailAttachmentData = emailAttachmentData;
               this.messageBody = messageBody;
               this.messageBodyMimeType = messageBodyMimeType;
               this.subject = subject;
          }

          /**
             @method
             Returns the array of recipients

             @return {Adaptive.EmailAddress[]} bccRecipients array of bcc recipients
             @since v2.0
          */
          getBccRecipients() : Array<EmailAddress> {
               return this.bccRecipients;
          }

          /**
             @method
             Set the array of recipients

             @param {Adaptive.EmailAddress[]} bccRecipients array of bcc recipients
             @since v2.0
          */
          setBccRecipients(bccRecipients: Array<EmailAddress>) {
               this.bccRecipients = bccRecipients;
          }

          /**
             @method
             Returns the array of recipients

             @return {Adaptive.EmailAddress[]} ccRecipients array of cc recipients
             @since v2.0
          */
          getCcRecipients() : Array<EmailAddress> {
               return this.ccRecipients;
          }

          /**
             @method
             Set the array of recipients

             @param {Adaptive.EmailAddress[]} ccRecipients array of cc recipients
             @since v2.0
          */
          setCcRecipients(ccRecipients: Array<EmailAddress>) {
               this.ccRecipients = ccRecipients;
          }

          /**
             @method
             Returns an array of attachments

             @return {Adaptive.EmailAttachmentData[]} emailAttachmentData array with the email attachments
             @since v2.0
          */
          getEmailAttachmentData() : Array<EmailAttachmentData> {
               return this.emailAttachmentData;
          }

          /**
             @method
             Set the email attachment data array

             @param {Adaptive.EmailAttachmentData[]} emailAttachmentData array of email attatchments
             @since v2.0
          */
          setEmailAttachmentData(emailAttachmentData: Array<EmailAttachmentData>) {
               this.emailAttachmentData = emailAttachmentData;
          }

          /**
             @method
             Returns the message body of the email

             @return {string} message Body string of the email
             @since v2.0
          */
          getMessageBody() : string {
               return this.messageBody;
          }

          /**
             @method
             Set the message body of the email

             @param {string} messageBody message body of the email
             @since v2.0
          */
          setMessageBody(messageBody: string) {
               this.messageBody = messageBody;
          }

          /**
             @method
             Returns the myme type of the message body

             @return {string} mime type string of the message boddy
             @since v2.0
          */
          getMessageBodyMimeType() : string {
               return this.messageBodyMimeType;
          }

          /**
             @method
             Set the mime type for the message body

             @param {string} messageBodyMimeType type of the body message
             @since v2.0
          */
          setMessageBodyMimeType(messageBodyMimeType: string) {
               this.messageBodyMimeType = messageBodyMimeType;
          }

          /**
             @method
             Returns the subject of the email

             @return {string} subject string of the email
             @since v2.0
          */
          getSubject() : string {
               return this.subject;
          }

          /**
             @method
             Set the subject of the email

             @param {string} subject of the email
             @since v2.0
          */
          setSubject(subject: string) {
               this.subject = subject;
          }

          /**
             @method
             Returns the array of recipients

             @return {Adaptive.EmailAddress[]} toRecipients array of recipients
             @since v2.0
          */
          getToRecipients() : Array<EmailAddress> {
               return this.toRecipients;
          }

          /**
             @method
             Set the array of recipients

             @param {Adaptive.EmailAddress[]} toRecipients array of recipients
             @since v2.0
          */
          setToRecipients(toRecipients: Array<EmailAddress>) {
               this.toRecipients = toRecipients;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.Email.
             @return {Adaptive.Email} Wrapped object instance.
          */
          static toObject(object : any) : Email {
               var result : Email = new Email(null, null, null, null, null, null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.toRecipients = EmailAddress.toObjectArray(object.toRecipients);
                    result.ccRecipients = EmailAddress.toObjectArray(object.ccRecipients);
                    result.bccRecipients = EmailAddress.toObjectArray(object.bccRecipients);
                    result.emailAttachmentData = EmailAttachmentData.toObjectArray(object.emailAttachmentData);
                    result.messageBody = object.messageBody;
                    result.messageBodyMimeType = object.messageBodyMimeType;
                    result.subject = object.subject;

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.Email[].
             @return {Adaptive.Email[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : Email[] {
               var resultArray : Array<Email> = new Array<Email>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(Email.toObject(object[i]));
                    }
               }
               return resultArray;
          }

     }
}

/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
