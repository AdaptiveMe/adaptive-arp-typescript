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

module Adaptive {

     /**
        @class Adaptive.AppResourceData
        This class represents a resource provided by the platform from the application's secure payload.

        @author Carlos Lozano Diez
        @since v2.1.3
        @version 1.0
     */
     export class AppResourceData {

          /**
             @property {boolean} cooked
             Marker to indicate whether the resource is cooked in some way (compressed, encrypted, etc.) If true, the
implementation must uncompress/unencrypt following the cookedType recipe specified by the payload.
          */
          cooked : boolean;

          /**
             @property {boolean} cooked
             Marker to indicate whether the resource is cooked in some way (compressed, encrypted, etc.) If true, the
implementation must uncompress/unencrypt following the cookedType recipe specified by the payload. The 'cookedProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'cooked'.
          */
          get cookedProperty() : boolean {
               return this.cooked;
          }

          set cookedProperty(cooked:boolean) {
               this.cooked = cooked;
          }

          /**
             @property {number} cookedLength
             This is the length of the payload after cooking. In general, this length indicates the amount
of space saved with regard to the rawLength of the payload.
          */
          cookedLength : number;

          /**
             @property {number} cookedLength
             This is the length of the payload after cooking. In general, this length indicates the amount
of space saved with regard to the rawLength of the payload. The 'cookedLengthProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'cookedLength'.
          */
          get cookedLengthProperty() : number {
               return this.cookedLength;
          }

          set cookedLengthProperty(cookedLength:number) {
               this.cookedLength = cookedLength;
          }

          /**
             @property {string} cookedType
             If the data is cooked, this field should contain the recipe to return the cooked data to its original
uncompressed/unencrypted/etc format.
          */
          cookedType : string;

          /**
             @property {string} cookedType
             If the data is cooked, this field should contain the recipe to return the cooked data to its original
uncompressed/unencrypted/etc format. The 'cookedTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'cookedType'.
          */
          get cookedTypeProperty() : string {
               return this.cookedType;
          }

          set cookedTypeProperty(cookedType:string) {
               this.cookedType = cookedType;
          }

          /**
             @property {number[]} data
             The payload data of the resource in ready to consume format.
          */
          data : Array<number>;

          /**
             @property {number[]} data
             The payload data of the resource in ready to consume format. The 'dataProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'data'.
          */
          get dataProperty() : Array<number> {
               return this.data;
          }

          set dataProperty(data:Array<number>) {
               this.data = data;
          }

          /**
             @property {string} id
             The id or path identifier of the resource.
          */
          id : string;

          /**
             @property {string} id
             The id or path identifier of the resource. The 'idProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'id'.
          */
          get idProperty() : string {
               return this.id;
          }

          set idProperty(id:string) {
               this.id = id;
          }

          /**
             @property {number} rawLength
             The raw length of the payload before any cooking occurred. This is equivalent to the size of the resource
after uncompressing and unencrypting.
          */
          rawLength : number;

          /**
             @property {number} rawLength
             The raw length of the payload before any cooking occurred. This is equivalent to the size of the resource
after uncompressing and unencrypting. The 'rawLengthProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'rawLength'.
          */
          get rawLengthProperty() : number {
               return this.rawLength;
          }

          set rawLengthProperty(rawLength:number) {
               this.rawLength = rawLength;
          }

          /**
             @property {string} rawType
             The raw type of the payload - this is equivalent to the mimetype of the content.
          */
          rawType : string;

          /**
             @property {string} rawType
             The raw type of the payload - this is equivalent to the mimetype of the content. The 'rawTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'rawType'.
          */
          get rawTypeProperty() : string {
               return this.rawType;
          }

          set rawTypeProperty(rawType:string) {
               this.rawType = rawType;
          }

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
          constructor(id: string, data: Array<number>, rawType: string, rawLength: number, cooked: boolean, cookedType: string, cookedLength: number) {
               this.id = id;
               this.data = data;
               this.rawType = rawType;
               this.rawLength = rawLength;
               this.cooked = cooked;
               this.cookedType = cookedType;
               this.cookedLength = cookedLength;
          }

          /**
             @method
             Attribute to denote whether the payload of the resource is cooked.

             @return {boolean} True if the resource is cooked, false otherwise.
             @since v2.1.3
          */
          getCooked() : boolean {
               return this.cooked;
          }

          /**
             @method
             Attribute to denote whether the payload of the resource is cooked.

             @param {boolean} cooked True if the resource is cooked, false otherwise.
             @since v2.1.3
          */
          setCooked(cooked: boolean) {
               this.cooked = cooked;
          }

          /**
             @method
             The length in bytes of the payload after cooking.

             @return {number} Length in bytes of cooked payload.
             @since v2.1.3
          */
          getCookedLength() : number {
               return this.cookedLength;
          }

          /**
             @method
             The length in bytes of the payload after cooking.

             @param {number} cookedLength Length in bytes of cooked payload.
             @since v2.1.3
          */
          setCookedLength(cookedLength: number) {
               this.cookedLength = cookedLength;
          }

          /**
             @method
             If the resource is cooked, this will return the recipe used during cooking.

             @return {string} The cooking recipe to reverse the cooking process.
             @since v2.1.3
          */
          getCookedType() : string {
               return this.cookedType;
          }

          /**
             @method
             If the resource is cooked, the type of recipe used during cooking.

             @param {string} cookedType The cooking recipe used during cooking.
             @since v2.1.3
          */
          setCookedType(cookedType: string) {
               this.cookedType = cookedType;
          }

          /**
             @method
             Returns the payload of the resource.

             @return {number[]} Binary payload of the resource.
             @since v2.1.3
          */
          getData() : Array<number> {
               return this.data;
          }

          /**
             @method
             Sets the payload of the resource.

             @param {number[]} data Binary payload of the resource.
             @since v2.1.3
          */
          setData(data: Array<number>) {
               this.data = data;
          }

          /**
             @method
             Gets The id or path identifier of the resource.

             @return {string} id The id or path identifier of the resource.
          */
          getId() : string {
               return this.id;
          }

          /**
             @method
             Sets the id or path of the resource.

             @param {string} id The id or path of the resource.
             @since v2.1.3
          */
          setId(id: string) {
               this.id = id;
          }

          /**
             @method
             Gets the resource payload's original length.

             @return {number} Original length of the resource in bytes before cooking.
             @since v2.1.3
          */
          getRawLength() : number {
               return this.rawLength;
          }

          /**
             @method
             Sets the resource payload's original length.

             @param {number} rawLength Original length of the resource in bytes before cooking.
             @since v2.1.3
          */
          setRawLength(rawLength: number) {
               this.rawLength = rawLength;
          }

          /**
             @method
             Gets the resource's raw type or mimetype.

             @return {string} Resource's type or mimetype.
             @since v2.1.3
          */
          getRawType() : string {
               return this.rawType;
          }

          /**
             @method
             Sets the resource's raw type or mimetype.

             @param {string} rawType Resource's type or mimetype.
             @since v2.1.3
          */
          setRawType(rawType: string) {
               this.rawType = rawType;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.AppResourceData.
             @return {Adaptive.AppResourceData} Wrapped object instance.
          */
          static toObject(object : any) : AppResourceData {
               var result : AppResourceData = new AppResourceData(null, null, null, null, null, null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.id = object.id;
                    if (object.data != null) {
                         result.data = new Array<number>();
                         for(var idata = 0; idata < object.data.length; idata++) {
                              var vdata = object.data[idata];
                              result.data.push(vdata);
                         }
                    }
                    result.rawType = object.rawType;
                    result.rawLength = object.rawLength;
                    result.cooked = object.cooked;
                    result.cookedType = object.cookedType;
                    result.cookedLength = object.cookedLength;

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.AppResourceData[].
             @return {Adaptive.AppResourceData[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : AppResourceData[] {
               var resultArray : Array<AppResourceData> = new Array<AppResourceData>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(AppResourceData.toObject(object[i]));
                    }
               }
               return resultArray;
          }

     }
}

/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
