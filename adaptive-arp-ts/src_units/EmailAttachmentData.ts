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
        @class Adaptive.EmailAttachmentData
        @extends Adaptive.APIBean
        Structure representing the binary attachment data.

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     export class EmailAttachmentData extends APIBean {

          /**
             @property {number[]} data
             The raw data for the current file attachment (byte array)
          */
          data : Array<number>;

          /**
             @property {number[]} data
             The raw data for the current file attachment (byte array) The 'dataProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'data'.
          */
          get dataProperty() : Array<number> {
               return this.data;
          }

          set dataProperty(data:Array<number>) {
               this.data = data;
          }

          /**
             @property {string} fileName
             The name of the current file attachment
          */
          fileName : string;

          /**
             @property {string} fileName
             The name of the current file attachment The 'fileNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'fileName'.
          */
          get fileNameProperty() : string {
               return this.fileName;
          }

          set fileNameProperty(fileName:string) {
               this.fileName = fileName;
          }

          /**
             @property {string} mimeType
             The mime type of the current attachment
          */
          mimeType : string;

          /**
             @property {string} mimeType
             The mime type of the current attachment The 'mimeTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'mimeType'.
          */
          get mimeTypeProperty() : string {
               return this.mimeType;
          }

          set mimeTypeProperty(mimeType:string) {
               this.mimeType = mimeType;
          }

          /**
             @property {string} referenceUrl
             The relative path where the contents for the attachment file could be located.
          */
          referenceUrl : string;

          /**
             @property {string} referenceUrl
             The relative path where the contents for the attachment file could be located. The 'referenceUrlProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'referenceUrl'.
          */
          get referenceUrlProperty() : string {
               return this.referenceUrl;
          }

          set referenceUrlProperty(referenceUrl:string) {
               this.referenceUrl = referenceUrl;
          }

          /**
             @property {number} size
             The data size (in bytes) of the current file attachment
          */
          size : number;

          /**
             @property {number} size
             The data size (in bytes) of the current file attachment The 'sizeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'size'.
          */
          get sizeProperty() : number {
               return this.size;
          }

          set sizeProperty(size:number) {
               this.size = size;
          }

          /**
             @method constructor
             Constructor with fields

             @param {number[]} data         raw data of the file attachment
             @param {number} size         size of the file attachment
             @param {string} fileName     name of the file attachment
             @param {string} mimeType     mime type of the file attachment
             @param {string} referenceUrl relative url of the file attachment
             @since v2.0
          */
          constructor(data: Array<number>, size: number, fileName: string, mimeType: string, referenceUrl: string) {
               super();
               this.data = data;
               this.size = size;
               this.fileName = fileName;
               this.mimeType = mimeType;
               this.referenceUrl = referenceUrl;
          }

          /**
             @method
             Returns the raw data in byte[]

             @return {number[]} data Octet-binary content of the attachment payload.
             @since v2.0
          */
          getData() : Array<number> {
               return this.data;
          }

          /**
             @method
             Set the data of the attachment as a byte[]

             @param {number[]} data Sets the octet-binary content of the attachment.
             @since v2.0
          */
          setData(data: Array<number>) {
               this.data = data;
          }

          /**
             @method
             Returns the filename of the attachment

             @return {string} fileName Name of the attachment.
             @since v2.0
          */
          getFileName() : string {
               return this.fileName;
          }

          /**
             @method
             Set the name of the file attachment

             @param {string} fileName Name of the attachment.
             @since v2.0
          */
          setFileName(fileName: string) {
               this.fileName = fileName;
          }

          /**
             @method
             Returns the mime type of the attachment

             @return {string} mimeType
             @since v2.0
          */
          getMimeType() : string {
               return this.mimeType;
          }

          /**
             @method
             Set the mime type of the attachment

             @param {string} mimeType Mime-type of the attachment.
             @since v2.0
          */
          setMimeType(mimeType: string) {
               this.mimeType = mimeType;
          }

          /**
             @method
             Returns the absolute url of the file attachment

             @return {string} referenceUrl Absolute URL of the file attachment for either file:// or http:// access.
             @since v2.0
          */
          getReferenceUrl() : string {
               return this.referenceUrl;
          }

          /**
             @method
             Set the absolute url of the attachment

             @param {string} referenceUrl Absolute URL of the file attachment for either file:// or http:// access.
             @since v2.0
          */
          setReferenceUrl(referenceUrl: string) {
               this.referenceUrl = referenceUrl;
          }

          /**
             @method
             Returns the size of the attachment as a long

             @return {number} size Length in bytes of the octet-binary content.
             @since v2.0
          */
          getSize() : number {
               return this.size;
          }

          /**
             @method
             Set the size of the attachment as a long

             @param {number} size Length in bytes of the octet-binary content ( should be same as data array length.)
             @since v2.0
          */
          setSize(size: number) {
               this.size = size;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.EmailAttachmentData.
             @return {Adaptive.EmailAttachmentData} Wrapped object instance.
          */
          static toObject(object : any) : EmailAttachmentData {
               var result : EmailAttachmentData = new EmailAttachmentData(null, null, null, null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    if (object.data != null) {
                         result.data = new Array<number>();
                         for(var idata = 0; idata < object.data.length; idata++) {
                              var vdata = object.data[idata];
                              result.data.push(vdata);
                         }
                    }
                    result.size = object.size;
                    result.fileName = object.fileName;
                    result.mimeType = object.mimeType;
                    result.referenceUrl = object.referenceUrl;

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.EmailAttachmentData[].
             @return {Adaptive.EmailAttachmentData[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : EmailAttachmentData[] {
               var resultArray : Array<EmailAttachmentData> = new Array<EmailAttachmentData>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(EmailAttachmentData.toObject(object[i]));
                    }
               }
               return resultArray;
          }

     }
}

/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
