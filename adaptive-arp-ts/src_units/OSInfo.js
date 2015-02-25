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
///<reference path="IOSType.ts"/>
var Adaptive;
(function (Adaptive) {
    /**
       @class Adaptive.OSInfo
       @extends Adaptive.APIBean
       Represents the basic information about the operating system.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    var OSInfo = (function (_super) {
        __extends(OSInfo, _super);
        /**
           @method constructor
           Constructor used by implementation to set the OS information.

           @param {Adaptive.IOSType} name    of the OS.
           @param {string} version of the OS.
           @param {string} vendor  of the OS.
           @since v2.0
        */
        function OSInfo(name, version, vendor) {
            _super.call(this);
            this.name = name;
            this.version = version;
            this.vendor = vendor;
        }
        Object.defineProperty(OSInfo.prototype, "nameProperty", {
            /**
               @property {Adaptive.IOSType} name
               The name of the operating system. The 'nameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'name'.
            */
            get: function () {
                return this.name;
            },
            set: function (name) {
                this.name = name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OSInfo.prototype, "vendorProperty", {
            /**
               @property {string} vendor
               The vendor of the operating system. The 'vendorProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'vendor'.
            */
            get: function () {
                return this.vendor;
            },
            set: function (vendor) {
                this.vendor = vendor;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OSInfo.prototype, "versionProperty", {
            /**
               @property {string} version
               The version/identifier of the operating system. The 'versionProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'version'.
            */
            get: function () {
                return this.version;
            },
            set: function (version) {
                this.version = version;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the name of the operating system.

           @return {Adaptive.IOSType} OS name.
           @since v2.0
        */
        OSInfo.prototype.getName = function () {
            return this.name;
        };
        /**
           @method
           Sets The name of the operating system.

           @param {Adaptive.IOSType} name The name of the operating system.
        */
        OSInfo.prototype.setName = function (name) {
            this.name = name;
        };
        /**
           @method
           Returns the vendor of the operating system.

           @return {string} OS vendor.
           @since v2.0
        */
        OSInfo.prototype.getVendor = function () {
            return this.vendor;
        };
        /**
           @method
           Sets The vendor of the operating system.

           @param {string} vendor The vendor of the operating system.
        */
        OSInfo.prototype.setVendor = function (vendor) {
            this.vendor = vendor;
        };
        /**
           @method
           Returns the version of the operating system.

           @return {string} OS version.
           @since v2.0
        */
        OSInfo.prototype.getVersion = function () {
            return this.version;
        };
        /**
           @method
           Sets The version/identifier of the operating system.

           @param {string} version The version/identifier of the operating system.
        */
        OSInfo.prototype.setVersion = function (version) {
            this.version = version;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.OSInfo.
           @return {Adaptive.OSInfo} Wrapped object instance.
        */
        OSInfo.toObject = function (object) {
            var result = new OSInfo(null, null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.name = Adaptive.IOSType.toObject(object.name);
                result.version = object.version;
                result.vendor = object.vendor;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.OSInfo[].
           @return {Adaptive.OSInfo[]} Wrapped object array instance.
        */
        OSInfo.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(OSInfo.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return OSInfo;
    })(Adaptive.APIBean);
    Adaptive.OSInfo = OSInfo;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=OSInfo.js.map