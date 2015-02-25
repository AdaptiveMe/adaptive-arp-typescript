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
declare module Adaptive {
    /**
       @class Adaptive.AppResourceData
       This class represents a resource provided by the platform from the application's secure payload.

       @author Carlos Lozano Diez
       @since v2.1.3
       @version 1.0
    */
    class AppResourceData {
        /**
           @property {boolean} cooked
           Marker to indicate whether the resource is cooked in some way (compressed, encrypted, etc.) If true, the
implementation must uncompress/unencrypt following the cookedType recipe specified by the payload.
        */
        cooked: boolean;
        /**
           @property {boolean} cooked
           Marker to indicate whether the resource is cooked in some way (compressed, encrypted, etc.) If true, the
implementation must uncompress/unencrypt following the cookedType recipe specified by the payload. The 'cookedProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'cooked'.
        */
        cookedProperty: boolean;
        /**
           @property {number} cookedLength
           This is the length of the payload after cooking. In general, this length indicates the amount
of space saved with regard to the rawLength of the payload.
        */
        cookedLength: number;
        /**
           @property {number} cookedLength
           This is the length of the payload after cooking. In general, this length indicates the amount
of space saved with regard to the rawLength of the payload. The 'cookedLengthProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'cookedLength'.
        */
        cookedLengthProperty: number;
        /**
           @property {string} cookedType
           If the data is cooked, this field should contain the recipe to return the cooked data to its original
uncompressed/unencrypted/etc format.
        */
        cookedType: string;
        /**
           @property {string} cookedType
           If the data is cooked, this field should contain the recipe to return the cooked data to its original
uncompressed/unencrypted/etc format. The 'cookedTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'cookedType'.
        */
        cookedTypeProperty: string;
        /**
           @property {number[]} data
           The payload data of the resource in ready to consume format.
        */
        data: Array<number>;
        /**
           @property {number[]} data
           The payload data of the resource in ready to consume format. The 'dataProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'data'.
        */
        dataProperty: Array<number>;
        /**
           @property {string} id
           The id or path identifier of the resource.
        */
        id: string;
        /**
           @property {string} id
           The id or path identifier of the resource. The 'idProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'id'.
        */
        idProperty: string;
        /**
           @property {number} rawLength
           The raw length of the payload before any cooking occurred. This is equivalent to the size of the resource
after uncompressing and unencrypting.
        */
        rawLength: number;
        /**
           @property {number} rawLength
           The raw length of the payload before any cooking occurred. This is equivalent to the size of the resource
after uncompressing and unencrypting. The 'rawLengthProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'rawLength'.
        */
        rawLengthProperty: number;
        /**
           @property {string} rawType
           The raw type of the payload - this is equivalent to the mimetype of the content.
        */
        rawType: string;
        /**
           @property {string} rawType
           The raw type of the payload - this is equivalent to the mimetype of the content. The 'rawTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'rawType'.
        */
        rawTypeProperty: string;
        /**
           @method constructor
           Convenience constructor.

           @param {string} id           The id or path of the resource retrieved.
           @param {number[]} data         The payload data of the resource (uncooked).
           @param {string} rawType      The raw type/mimetype of the resource.
           @param {number} rawLength    The raw length/original length in bytes of the resource.
           @param {boolean} cooked       True if the resource is cooked.
           @param {string} cookedType   Type of recipe used for cooking.
           @param {number} cookedLength The cooked length in bytes of the resource.
           @since v2.1.3
        */
        constructor(id: string, data: Array<number>, rawType: string, rawLength: number, cooked: boolean, cookedType: string, cookedLength: number);
        /**
           @method
           Attribute to denote whether the payload of the resource is cooked.

           @return {boolean} True if the resource is cooked, false otherwise.
           @since v2.1.3
        */
        getCooked(): boolean;
        /**
           @method
           Attribute to denote whether the payload of the resource is cooked.

           @param {boolean} cooked True if the resource is cooked, false otherwise.
           @since v2.1.3
        */
        setCooked(cooked: boolean): void;
        /**
           @method
           The length in bytes of the payload after cooking.

           @return {number} Length in bytes of cooked payload.
           @since v2.1.3
        */
        getCookedLength(): number;
        /**
           @method
           The length in bytes of the payload after cooking.

           @param {number} cookedLength Length in bytes of cooked payload.
           @since v2.1.3
        */
        setCookedLength(cookedLength: number): void;
        /**
           @method
           If the resource is cooked, this will return the recipe used during cooking.

           @return {string} The cooking recipe to reverse the cooking process.
           @since v2.1.3
        */
        getCookedType(): string;
        /**
           @method
           If the resource is cooked, the type of recipe used during cooking.

           @param {string} cookedType The cooking recipe used during cooking.
           @since v2.1.3
        */
        setCookedType(cookedType: string): void;
        /**
           @method
           Returns the payload of the resource.

           @return {number[]} Binary payload of the resource.
           @since v2.1.3
        */
        getData(): Array<number>;
        /**
           @method
           Sets the payload of the resource.

           @param {number[]} data Binary payload of the resource.
           @since v2.1.3
        */
        setData(data: Array<number>): void;
        /**
           @method
           Gets The id or path identifier of the resource.

           @return {string} id The id or path identifier of the resource.
        */
        getId(): string;
        /**
           @method
           Sets the id or path of the resource.

           @param {string} id The id or path of the resource.
           @since v2.1.3
        */
        setId(id: string): void;
        /**
           @method
           Gets the resource payload's original length.

           @return {number} Original length of the resource in bytes before cooking.
           @since v2.1.3
        */
        getRawLength(): number;
        /**
           @method
           Sets the resource payload's original length.

           @param {number} rawLength Original length of the resource in bytes before cooking.
           @since v2.1.3
        */
        setRawLength(rawLength: number): void;
        /**
           @method
           Gets the resource's raw type or mimetype.

           @return {string} Resource's type or mimetype.
           @since v2.1.3
        */
        getRawType(): string;
        /**
           @method
           Sets the resource's raw type or mimetype.

           @param {string} rawType Resource's type or mimetype.
           @since v2.1.3
        */
        setRawType(rawType: string): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.AppResourceData.
           @return {Adaptive.AppResourceData} Wrapped object instance.
        */
        static toObject(object: any): AppResourceData;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.AppResourceData[].
           @return {Adaptive.AppResourceData[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): AppResourceData[];
    }
}
