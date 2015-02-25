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
       @class Adaptive.ContactTag
       @extends Adaptive.APIBean
       Structure representing the assigned tags data elements of a contact.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    var ContactTag = (function (_super) {
        __extends(ContactTag, _super);
        /**
           @method constructor
           Constructor used by the implementation

           @param {string} tagValue Value of the tag
           @param {string} tagName  Name of the tag
           @since v2.0
        */
        function ContactTag(tagName, tagValue) {
            _super.call(this);
            this.tagName = tagName;
            this.tagValue = tagValue;
        }
        Object.defineProperty(ContactTag.prototype, "tagNameProperty", {
            /**
               @property {string} tagName
               The tagName of the Tag The 'tagNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'tagName'.
            */
            get: function () {
                return this.tagName;
            },
            set: function (tagName) {
                this.tagName = tagName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactTag.prototype, "tagValueProperty", {
            /**
               @property {string} tagValue
               The tagValue of the Tag The 'tagValueProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'tagValue'.
            */
            get: function () {
                return this.tagValue;
            },
            set: function (tagValue) {
                this.tagValue = tagValue;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the tagName of the Tag

           @return {string} tagName
           @since v2.0
        */
        ContactTag.prototype.getTagName = function () {
            return this.tagName;
        };
        /**
           @method
           Set the tagName of the Tag

           @param {string} tagName Name of the tag
           @since v2.0
        */
        ContactTag.prototype.setTagName = function (tagName) {
            this.tagName = tagName;
        };
        /**
           @method
           Returns the tagValue of the Tag

           @return {string} tagValue
           @since v2.0
        */
        ContactTag.prototype.getTagValue = function () {
            return this.tagValue;
        };
        /**
           @method
           Set the tagValue of the Tag

           @param {string} tagValue Value of the tag
           @since v2.0
        */
        ContactTag.prototype.setTagValue = function (tagValue) {
            this.tagValue = tagValue;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactTag.
           @return {Adaptive.ContactTag} Wrapped object instance.
        */
        ContactTag.toObject = function (object) {
            var result = new ContactTag(null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.tagName = object.tagName;
                result.tagValue = object.tagValue;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactTag[].
           @return {Adaptive.ContactTag[]} Wrapped object array instance.
        */
        ContactTag.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(ContactTag.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return ContactTag;
    })(Adaptive.APIBean);
    Adaptive.ContactTag = ContactTag;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=ContactTag.js.map