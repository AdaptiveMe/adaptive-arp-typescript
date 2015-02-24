/// <reference path="APIBean.d.ts" />
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
       @class Adaptive.SecureKeyPair
       @extends Adaptive.APIBean
       Represents a single secureKey-value pair.

       @author Aryslan
       @since v2.0
       @version 1.0
    */
    class SecureKeyPair extends APIBean {
        /**
           @property {string} secureData
           Value of the secured element
        */
        secureData: string;
        /**
           @property {string} secureData
           Value of the secured element The 'secureDataProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'secureData'.
        */
        secureDataProperty: string;
        /**
           @property {string} secureKey
           Key of the secured element
        */
        secureKey: string;
        /**
           @property {string} secureKey
           Key of the secured element The 'secureKeyProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'secureKey'.
        */
        secureKeyProperty: string;
        /**
           @method constructor
           Constructor with parameters

           @param {string} secureKey  name of the keypair
           @param {string} secureData value of the keypair
           @since v2.0
        */
        constructor(secureKey: string, secureData: string);
        /**
           @method
           Returns the object value

           @return {string} Value.
           @since v2.0
        */
        getSecureData(): string;
        /**
           @method
           Sets the value for this object

           @param {string} secureData value to set.
           @since v2.0
        */
        setSecureData(secureData: string): void;
        /**
           @method
           Returns the object secureKey name.

           @return {string} Key name.
           @since v2.0
        */
        getSecureKey(): string;
        /**
           @method
           Sets the secureKey name for this object.

           @param {string} secureKey Key name.
           @since v2.0
        */
        setSecureKey(secureKey: string): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.SecureKeyPair.
           @return {Adaptive.SecureKeyPair} Wrapped object instance.
        */
        static toObject(object: any): SecureKeyPair;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.SecureKeyPair[].
           @return {Adaptive.SecureKeyPair[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): SecureKeyPair[];
    }
}
