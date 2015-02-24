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
///<reference path="IOSType.ts"/>

module Adaptive {

     /**
        @class Adaptive.OSInfo
        @extends Adaptive.APIBean
        Represents the basic information about the operating system.

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     export class OSInfo extends APIBean {

          /**
             @property {Adaptive.IOSType} name
             The name of the operating system.
          */
          name : IOSType;

          /**
             @property {Adaptive.IOSType} name
             The name of the operating system. The 'nameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'name'.
          */
          get nameProperty() : IOSType {
               return this.name;
          }

          set nameProperty(name:IOSType) {
               this.name = name;
          }

          /**
             @property {string} vendor
             The vendor of the operating system.
          */
          vendor : string;

          /**
             @property {string} vendor
             The vendor of the operating system. The 'vendorProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'vendor'.
          */
          get vendorProperty() : string {
               return this.vendor;
          }

          set vendorProperty(vendor:string) {
               this.vendor = vendor;
          }

          /**
             @property {string} version
             The version/identifier of the operating system.
          */
          version : string;

          /**
             @property {string} version
             The version/identifier of the operating system. The 'versionProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'version'.
          */
          get versionProperty() : string {
               return this.version;
          }

          set versionProperty(version:string) {
               this.version = version;
          }

          /**
             @method constructor
             Constructor used by implementation to set the OS information.

             @param {Adaptive.IOSType} name    of the OS.
             @param {string} version of the OS.
             @param {string} vendor  of the OS.
             @since v2.0
          */
          constructor(name: IOSType, version: string, vendor: string) {
               super();
               this.name = name;
               this.version = version;
               this.vendor = vendor;
          }

          /**
             @method
             Returns the name of the operating system.

             @return {Adaptive.IOSType} OS name.
             @since v2.0
          */
          getName() : IOSType {
               return this.name;
          }

          /**
             @method
             Sets The name of the operating system.

             @param {Adaptive.IOSType} name The name of the operating system.
          */
          setName(name: IOSType) {
               this.name = name;
          }

          /**
             @method
             Returns the vendor of the operating system.

             @return {string} OS vendor.
             @since v2.0
          */
          getVendor() : string {
               return this.vendor;
          }

          /**
             @method
             Sets The vendor of the operating system.

             @param {string} vendor The vendor of the operating system.
          */
          setVendor(vendor: string) {
               this.vendor = vendor;
          }

          /**
             @method
             Returns the version of the operating system.

             @return {string} OS version.
             @since v2.0
          */
          getVersion() : string {
               return this.version;
          }

          /**
             @method
             Sets The version/identifier of the operating system.

             @param {string} version The version/identifier of the operating system.
          */
          setVersion(version: string) {
               this.version = version;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.OSInfo.
             @return {Adaptive.OSInfo} Wrapped object instance.
          */
          static toObject(object : any) : OSInfo {
               var result : OSInfo = new OSInfo(null, null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.name = IOSType.toObject(object.name);
                    result.version = object.version;
                    result.vendor = object.vendor;

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.OSInfo[].
             @return {Adaptive.OSInfo[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : OSInfo[] {
               var resultArray : Array<OSInfo> = new Array<OSInfo>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(OSInfo.toObject(object[i]));
                    }
               }
               return resultArray;
          }

     }
}

/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
