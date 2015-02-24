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
        @class Adaptive.KeyPair
        @extends Adaptive.APIBean
        Represents a basic bean to store keyName pair values

        @author Ferran Vila Conesa
        @since v2.0
        @version 1.0
     */
     export class KeyPair extends APIBean {

          /**
             @property {string} keyName
             Key of the element
          */
          keyName : string;

          /**
             @property {string} keyName
             Key of the element The 'keyNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'keyName'.
          */
          get keyNameProperty() : string {
               return this.keyName;
          }

          set keyNameProperty(keyName:string) {
               this.keyName = keyName;
          }

          /**
             @property {string} keyValue
             Value of the element
          */
          keyValue : string;

          /**
             @property {string} keyValue
             Value of the element The 'keyValueProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'keyValue'.
          */
          get keyValueProperty() : string {
               return this.keyValue;
          }

          set keyValueProperty(keyValue:string) {
               this.keyValue = keyValue;
          }

          /**
             @method constructor
             Constructor using fields

             @param {string} keyName  Key of the element
             @param {string} keyValue Value of the element
             @since v2.0
          */
          constructor(keyName: string, keyValue: string) {
               super();
               this.keyName = keyName;
               this.keyValue = keyValue;
          }

          /**
             @method
             Returns the keyName of the element

             @return {string} Key of the element
             @since v2.0
          */
          getKeyName() : string {
               return this.keyName;
          }

          /**
             @method
             Sets the keyName of the element

             @param {string} keyName Key of the element
             @since v2.0
          */
          setKeyName(keyName: string) {
               this.keyName = keyName;
          }

          /**
             @method
             Returns the keyValue of the element

             @return {string} Value of the element
             @since v2.0
          */
          getKeyValue() : string {
               return this.keyValue;
          }

          /**
             @method
             Sets the keyValue of the element

             @param {string} keyValue Value of the element
             @since v2.0
          */
          setKeyValue(keyValue: string) {
               this.keyValue = keyValue;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.KeyPair.
             @return {Adaptive.KeyPair} Wrapped object instance.
          */
          static toObject(object : any) : KeyPair {
               var result : KeyPair = new KeyPair(null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.keyName = object.keyName;
                    result.keyValue = object.keyValue;

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.KeyPair[].
             @return {Adaptive.KeyPair[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : KeyPair[] {
               var resultArray : Array<KeyPair> = new Array<KeyPair>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(KeyPair.toObject(object[i]));
                    }
               }
               return resultArray;
          }

     }
}

/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
