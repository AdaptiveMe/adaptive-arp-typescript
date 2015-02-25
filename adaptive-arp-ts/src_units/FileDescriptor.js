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
       @class Adaptive.FileDescriptor
       @extends Adaptive.APIBean
       Implementation of FileDescriptor bean.

       @author Carlos Lozano Diez
       @since 1.0
       @version 1.0
    */
    var FileDescriptor = (function (_super) {
        __extends(FileDescriptor, _super);
        /**
           @method constructor
           Default constructor.
        */
        function FileDescriptor() {
            _super.call(this);
        }
        Object.defineProperty(FileDescriptor.prototype, "dateCreatedProperty", {
            get: function () {
                return this.dateCreated;
            },
            set: function (dateCreated) {
                this.dateCreated = dateCreated;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FileDescriptor.prototype, "dateModifiedProperty", {
            get: function () {
                return this.dateModified;
            },
            set: function (dateModified) {
                this.dateModified = dateModified;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FileDescriptor.prototype, "nameProperty", {
            get: function () {
                return this.name;
            },
            set: function (name) {
                this.name = name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FileDescriptor.prototype, "pathProperty", {
            get: function () {
                return this.path;
            },
            set: function (path) {
                this.path = path;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FileDescriptor.prototype, "pathAbsoluteProperty", {
            get: function () {
                return this.pathAbsolute;
            },
            set: function (pathAbsolute) {
                this.pathAbsolute = pathAbsolute;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FileDescriptor.prototype, "sizeProperty", {
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
           Returns the milliseconds passed since 1/1/1970 since the file was created.

           @return {number} Timestamp in milliseconds.
           @since v2.0
        */
        FileDescriptor.prototype.getDateCreated = function () {
            return this.dateCreated;
        };
        /**
           @method
           Sets the creation timestamp in milliseconds. Used internally.

           @param {number} dateCreated Timestamp of file creation or -1 if the file or folder doesn't exist.
        */
        FileDescriptor.prototype.setDateCreated = function (dateCreated) {
            this.dateCreated = dateCreated;
        };
        /**
           @method
           Returns the milliseconds passed since 1/1/1970 since the file was modified.

           @return {number} Timestamp in milliseconds.
           @since v2.0
        */
        FileDescriptor.prototype.getDateModified = function () {
            return this.dateModified;
        };
        /**
           @method
           Sets the file or folder modification timestamp in milliseconds. Used internally.

           @param {number} dateModified Timestamp of file modification or -1 if the file or folder doesn't exist.
        */
        FileDescriptor.prototype.setDateModified = function (dateModified) {
            this.dateModified = dateModified;
        };
        /**
           @method
           Returns the name of the file if the reference is a file or the last path element of the folder.

           @return {string} The name of the file.
           @since v2.0
        */
        FileDescriptor.prototype.getName = function () {
            return this.name;
        };
        /**
           @method
           Sets the name of the file. Used internally.

           @param {string} name Name of the file or last folder path element.
        */
        FileDescriptor.prototype.setName = function (name) {
            this.name = name;
        };
        /**
           @method
           Returns the path element of the file or folder (excluding the last path element if it's a directory).

           @return {string} The path to the file.
           @since v2.0
        */
        FileDescriptor.prototype.getPath = function () {
            return this.path;
        };
        /**
           @method
           Sets the path of the file or folder. Used internally.

           @param {string} path The path element of the file or folder.
        */
        FileDescriptor.prototype.setPath = function (path) {
            this.path = path;
        };
        /**
           @method
           Returns the resolved absolute path elements of the file and/or folders (including the last path element).

           @return {string} The absolute path to the file.
           @since v2.0
        */
        FileDescriptor.prototype.getPathAbsolute = function () {
            return this.pathAbsolute;
        };
        /**
           @method
           Sets the absolute path of the file or folder. Used internally.

           @param {string} pathAbsolute String with the absolute path of file or folder.
        */
        FileDescriptor.prototype.setPathAbsolute = function (pathAbsolute) {
            this.pathAbsolute = pathAbsolute;
        };
        /**
           @method
           Returns the size in bytes of the file or -1 if the reference is a folder.

           @return {number} Size in bytes of file.
           @since v2.0
        */
        FileDescriptor.prototype.getSize = function () {
            return this.size;
        };
        /**
           @method
           Sets the file size in bytes of the file. If the file is a folder, this will be 0. If the file
doesn't exist, this will be -1. Used internally.

           @param {number} size The size in bytes of the file.
        */
        FileDescriptor.prototype.setSize = function (size) {
            this.size = size;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.FileDescriptor.
           @return {Adaptive.FileDescriptor} Wrapped object instance.
        */
        FileDescriptor.toObject = function (object) {
            var result = new FileDescriptor();
            if (object != null) {
                // Assign values to bean fields.
                result.name = object.name;
                result.path = object.path;
                result.pathAbsolute = object.pathAbsolute;
                result.dateCreated = object.dateCreated;
                result.dateModified = object.dateModified;
                result.size = object.size;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.FileDescriptor[].
           @return {Adaptive.FileDescriptor[]} Wrapped object array instance.
        */
        FileDescriptor.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(FileDescriptor.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return FileDescriptor;
    })(Adaptive.APIBean);
    Adaptive.FileDescriptor = FileDescriptor;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=FileDescriptor.js.map