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
        @class Adaptive.DeviceInfo
        @extends Adaptive.APIBean
        Structure representing the basic device information.

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     export class DeviceInfo extends APIBean {

          /**
             @property {string} model
             Model of device - equivalent to device release or version.
          */
          model : string;

          /**
             @property {string} model
             Model of device - equivalent to device release or version. The 'modelProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'model'.
          */
          get modelProperty() : string {
               return this.model;
          }

          set modelProperty(model:string) {
               this.model = model;
          }

          /**
             @property {string} name
             Name of device - equivalent to brand.
          */
          name : string;

          /**
             @property {string} name
             Name of device - equivalent to brand. The 'nameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'name'.
          */
          get nameProperty() : string {
               return this.name;
          }

          set nameProperty(name:string) {
               this.name = name;
          }

          /**
             @property {string} uuid
             Device identifier - this may not be unique for a device. It may depend on the platform implementation and may
be unique for a specific instance of an application on a specific device.
          */
          uuid : string;

          /**
             @property {string} uuid
             Device identifier - this may not be unique for a device. It may depend on the platform implementation and may
be unique for a specific instance of an application on a specific device. The 'uuidProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'uuid'.
          */
          get uuidProperty() : string {
               return this.uuid;
          }

          set uuidProperty(uuid:string) {
               this.uuid = uuid;
          }

          /**
             @property {string} vendor
             Vendor of the device hardware.
          */
          vendor : string;

          /**
             @property {string} vendor
             Vendor of the device hardware. The 'vendorProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'vendor'.
          */
          get vendorProperty() : string {
               return this.vendor;
          }

          set vendorProperty(vendor:string) {
               this.vendor = vendor;
          }

          /**
             @method constructor
             Constructor for the implementation of the platform.

             @param {string} name   or brand of the device.
             @param {string} model  of the device.
             @param {string} vendor of the device.
             @param {string} uuid   unique* identifier (* platform dependent).
             @since v2.0
          */
          constructor(name: string, model: string, vendor: string, uuid: string) {
               super();
               this.name = name;
               this.model = model;
               this.vendor = vendor;
               this.uuid = uuid;
          }

          /**
             @method
             Returns the model of the device.

             @return {string} String with the model of the device.
             @since v2.0
          */
          getModel() : string {
               return this.model;
          }

          /**
             @method
             Sets Model of device - equivalent to device release or version.

             @param {string} model Model of device - equivalent to device release or version.
          */
          setModel(model: string) {
               this.model = model;
          }

          /**
             @method
             Returns the name of the device.

             @return {string} String with device name.
             @since v2.0
          */
          getName() : string {
               return this.name;
          }

          /**
             @method
             Sets Name of device - equivalent to brand.

             @param {string} name Name of device - equivalent to brand.
          */
          setName(name: string) {
               this.name = name;
          }

          /**
             @method
             Returns the platform dependent UUID of the device.

             @return {string} String with the 128-bit device identifier.
             @since v2.0
          */
          getUuid() : string {
               return this.uuid;
          }

          /**
             @method
             Sets Device identifier - this may not be unique for a device. It may depend on the platform implementation and may
be unique for a specific instance of an application on a specific device.

             @param {string} uuid Device identifier - this may not be unique for a device. It may depend on the platform implementation and may
be unique for a specific instance of an application on a specific device.
          */
          setUuid(uuid: string) {
               this.uuid = uuid;
          }

          /**
             @method
             Returns the vendor of the device.

             @return {string} String with the vendor name.
             @since v2.0
          */
          getVendor() : string {
               return this.vendor;
          }

          /**
             @method
             Sets Vendor of the device hardware.

             @param {string} vendor Vendor of the device hardware.
          */
          setVendor(vendor: string) {
               this.vendor = vendor;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.DeviceInfo.
             @return {Adaptive.DeviceInfo} Wrapped object instance.
          */
          static toObject(object : any) : DeviceInfo {
               var result : DeviceInfo = new DeviceInfo(null, null, null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.name = object.name;
                    result.model = object.model;
                    result.vendor = object.vendor;
                    result.uuid = object.uuid;

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.DeviceInfo[].
             @return {Adaptive.DeviceInfo[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : DeviceInfo[] {
               var resultArray : Array<DeviceInfo> = new Array<DeviceInfo>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(DeviceInfo.toObject(object[i]));
                    }
               }
               return resultArray;
          }

     }
}

/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
