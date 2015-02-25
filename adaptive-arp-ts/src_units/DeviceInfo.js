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
       @class Adaptive.DeviceInfo
       @extends Adaptive.APIBean
       Structure representing the basic device information.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    var DeviceInfo = (function (_super) {
        __extends(DeviceInfo, _super);
        /**
           @method constructor
           Constructor for the implementation of the platform.

           @param {string} name   or brand of the device.
           @param {string} model  of the device.
           @param {string} vendor of the device.
           @param {string} uuid   unique* identifier (* platform dependent).
           @since v2.0
        */
        function DeviceInfo(name, model, vendor, uuid) {
            _super.call(this);
            this.name = name;
            this.model = model;
            this.vendor = vendor;
            this.uuid = uuid;
        }
        Object.defineProperty(DeviceInfo.prototype, "modelProperty", {
            /**
               @property {string} model
               Model of device - equivalent to device release or version. The 'modelProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'model'.
            */
            get: function () {
                return this.model;
            },
            set: function (model) {
                this.model = model;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceInfo.prototype, "nameProperty", {
            /**
               @property {string} name
               Name of device - equivalent to brand. The 'nameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'name'.
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
        Object.defineProperty(DeviceInfo.prototype, "uuidProperty", {
            /**
               @property {string} uuid
               Device identifier - this may not be unique for a device. It may depend on the platform implementation and may
  be unique for a specific instance of an application on a specific device. The 'uuidProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'uuid'.
            */
            get: function () {
                return this.uuid;
            },
            set: function (uuid) {
                this.uuid = uuid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceInfo.prototype, "vendorProperty", {
            /**
               @property {string} vendor
               Vendor of the device hardware. The 'vendorProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'vendor'.
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
        /**
           @method
           Returns the model of the device.

           @return {string} String with the model of the device.
           @since v2.0
        */
        DeviceInfo.prototype.getModel = function () {
            return this.model;
        };
        /**
           @method
           Sets Model of device - equivalent to device release or version.

           @param {string} model Model of device - equivalent to device release or version.
        */
        DeviceInfo.prototype.setModel = function (model) {
            this.model = model;
        };
        /**
           @method
           Returns the name of the device.

           @return {string} String with device name.
           @since v2.0
        */
        DeviceInfo.prototype.getName = function () {
            return this.name;
        };
        /**
           @method
           Sets Name of device - equivalent to brand.

           @param {string} name Name of device - equivalent to brand.
        */
        DeviceInfo.prototype.setName = function (name) {
            this.name = name;
        };
        /**
           @method
           Returns the platform dependent UUID of the device.

           @return {string} String with the 128-bit device identifier.
           @since v2.0
        */
        DeviceInfo.prototype.getUuid = function () {
            return this.uuid;
        };
        /**
           @method
           Sets Device identifier - this may not be unique for a device. It may depend on the platform implementation and may
be unique for a specific instance of an application on a specific device.

           @param {string} uuid Device identifier - this may not be unique for a device. It may depend on the platform implementation and may
be unique for a specific instance of an application on a specific device.
        */
        DeviceInfo.prototype.setUuid = function (uuid) {
            this.uuid = uuid;
        };
        /**
           @method
           Returns the vendor of the device.

           @return {string} String with the vendor name.
           @since v2.0
        */
        DeviceInfo.prototype.getVendor = function () {
            return this.vendor;
        };
        /**
           @method
           Sets Vendor of the device hardware.

           @param {string} vendor Vendor of the device hardware.
        */
        DeviceInfo.prototype.setVendor = function (vendor) {
            this.vendor = vendor;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.DeviceInfo.
           @return {Adaptive.DeviceInfo} Wrapped object instance.
        */
        DeviceInfo.toObject = function (object) {
            var result = new DeviceInfo(null, null, null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.name = object.name;
                result.model = object.model;
                result.vendor = object.vendor;
                result.uuid = object.uuid;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.DeviceInfo[].
           @return {Adaptive.DeviceInfo[]} Wrapped object array instance.
        */
        DeviceInfo.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(DeviceInfo.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return DeviceInfo;
    })(Adaptive.APIBean);
    Adaptive.DeviceInfo = DeviceInfo;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=DeviceInfo.js.map