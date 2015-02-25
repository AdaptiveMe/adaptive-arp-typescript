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
       @class Adaptive.EmailAttachmentData
       @extends Adaptive.APIBean
       Structure representing the binary attachment data.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    var EmailAttachmentData = (function (_super) {
        __extends(EmailAttachmentData, _super);
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
        function EmailAttachmentData(data, size, fileName, mimeType, referenceUrl) {
            _super.call(this);
            this.data = data;
            this.size = size;
            this.fileName = fileName;
            this.mimeType = mimeType;
            this.referenceUrl = referenceUrl;
        }
        Object.defineProperty(EmailAttachmentData.prototype, "dataProperty", {
            /**
               @property {number[]} data
               The raw data for the current file attachment (byte array) The 'dataProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'data'.
            */
            get: function () {
                return this.data;
            },
            set: function (data) {
                this.data = data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EmailAttachmentData.prototype, "fileNameProperty", {
            /**
               @property {string} fileName
               The name of the current file attachment The 'fileNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'fileName'.
            */
            get: function () {
                return this.fileName;
            },
            set: function (fileName) {
                this.fileName = fileName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EmailAttachmentData.prototype, "mimeTypeProperty", {
            /**
               @property {string} mimeType
               The mime type of the current attachment The 'mimeTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'mimeType'.
            */
            get: function () {
                return this.mimeType;
            },
            set: function (mimeType) {
                this.mimeType = mimeType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EmailAttachmentData.prototype, "referenceUrlProperty", {
            /**
               @property {string} referenceUrl
               The relative path where the contents for the attachment file could be located. The 'referenceUrlProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'referenceUrl'.
            */
            get: function () {
                return this.referenceUrl;
            },
            set: function (referenceUrl) {
                this.referenceUrl = referenceUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EmailAttachmentData.prototype, "sizeProperty", {
            /**
               @property {number} size
               The data size (in bytes) of the current file attachment The 'sizeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'size'.
            */
            get: function () {
                return this.size;
            },
            set: function (size) {
                this.size = size;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the raw data in byte[]

           @return {number[]} data Octet-binary content of the attachment payload.
           @since v2.0
        */
        EmailAttachmentData.prototype.getData = function () {
            return this.data;
        };
        /**
           @method
           Set the data of the attachment as a byte[]

           @param {number[]} data Sets the octet-binary content of the attachment.
           @since v2.0
        */
        EmailAttachmentData.prototype.setData = function (data) {
            this.data = data;
        };
        /**
           @method
           Returns the filename of the attachment

           @return {string} fileName Name of the attachment.
           @since v2.0
        */
        EmailAttachmentData.prototype.getFileName = function () {
            return this.fileName;
        };
        /**
           @method
           Set the name of the file attachment

           @param {string} fileName Name of the attachment.
           @since v2.0
        */
        EmailAttachmentData.prototype.setFileName = function (fileName) {
            this.fileName = fileName;
        };
        /**
           @method
           Returns the mime type of the attachment

           @return {string} mimeType
           @since v2.0
        */
        EmailAttachmentData.prototype.getMimeType = function () {
            return this.mimeType;
        };
        /**
           @method
           Set the mime type of the attachment

           @param {string} mimeType Mime-type of the attachment.
           @since v2.0
        */
        EmailAttachmentData.prototype.setMimeType = function (mimeType) {
            this.mimeType = mimeType;
        };
        /**
           @method
           Returns the absolute url of the file attachment

           @return {string} referenceUrl Absolute URL of the file attachment for either file:// or http:// access.
           @since v2.0
        */
        EmailAttachmentData.prototype.getReferenceUrl = function () {
            return this.referenceUrl;
        };
        /**
           @method
           Set the absolute url of the attachment

           @param {string} referenceUrl Absolute URL of the file attachment for either file:// or http:// access.
           @since v2.0
        */
        EmailAttachmentData.prototype.setReferenceUrl = function (referenceUrl) {
            this.referenceUrl = referenceUrl;
        };
        /**
           @method
           Returns the size of the attachment as a long

           @return {number} size Length in bytes of the octet-binary content.
           @since v2.0
        */
        EmailAttachmentData.prototype.getSize = function () {
            return this.size;
        };
        /**
           @method
           Set the size of the attachment as a long

           @param {number} size Length in bytes of the octet-binary content ( should be same as data array length.)
           @since v2.0
        */
        EmailAttachmentData.prototype.setSize = function (size) {
            this.size = size;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.EmailAttachmentData.
           @return {Adaptive.EmailAttachmentData} Wrapped object instance.
        */
        EmailAttachmentData.toObject = function (object) {
            var result = new EmailAttachmentData(null, null, null, null, null);
            if (object != null) {
                // Assign values to bean fields.
                if (object.data != null) {
                    result.data = new Array();
                    for (var idata = 0; idata < object.data.length; idata++) {
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
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.EmailAttachmentData[].
           @return {Adaptive.EmailAttachmentData[]} Wrapped object array instance.
        */
        EmailAttachmentData.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(EmailAttachmentData.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return EmailAttachmentData;
    })(Adaptive.APIBean);
    Adaptive.EmailAttachmentData = EmailAttachmentData;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=EmailAttachmentData.js.map