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
       @class Adaptive.Locale
       @extends Adaptive.APIBean
       Represents a specific user or system locate.

       @author Aryslan
       @since v2.0
       @version 1.0
    */
    class Locale extends APIBean {
        /**
           @property {string} country
           A valid ISO Country Code.
        */
        country: string;
        /**
           @property {string} country
           A valid ISO Country Code. The 'countryProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'country'.
        */
        countryProperty: string;
        /**
           @property {string} language
           A valid ISO Language Code.
        */
        language: string;
        /**
           @property {string} language
           A valid ISO Language Code. The 'languageProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'language'.
        */
        languageProperty: string;
        /**
           @method constructor
           Constructor used by the implementation

           @param {string} country  Country of the Locale
           @param {string} language Language of the Locale
           @since v2.0
        */
        constructor(language: string, country: string);
        /**
           @method
           Returns the country code

           @return {string} country code
           @since v2.0
        */
        getCountry(): string;
        /**
           @method
           Set the country code

           @param {string} country code
           @since v2.0
        */
        setCountry(country: string): void;
        /**
           @method
           Returns the language code

           @return {string} language code
           @since v2.0
        */
        getLanguage(): string;
        /**
           @method
           Set the language code

           @param {string} language code
           @since v2.0
        */
        setLanguage(language: string): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Locale.
           @return {Adaptive.Locale} Wrapped object instance.
        */
        static toObject(object: any): Locale;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Locale[].
           @return {Adaptive.Locale[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): Locale[];
    }
}
