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
       @class Adaptive.ContactWebsite
       @extends Adaptive.APIBean
       Structure representing the website data elements of a contact.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    class ContactWebsite extends APIBean {
        /**
           @property {string} url
           The url of the website
        */
        url: string;
        /**
           @property {string} url
           The url of the website The 'urlProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'url'.
        */
        urlProperty: string;
        /**
           @method constructor
           Constructor used by the implementation

           @param {string} url Url of the website
           @since v2.0
        */
        constructor(url: string);
        /**
           @method
           Returns the url of the website

           @return {string} website url
           @since v2.0
        */
        getUrl(): string;
        /**
           @method
           Set the url of the website

           @param {string} url Url of the website
           @since v2.0
        */
        setUrl(url: string): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactWebsite.
           @return {Adaptive.ContactWebsite} Wrapped object instance.
        */
        static toObject(object: any): ContactWebsite;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactWebsite[].
           @return {Adaptive.ContactWebsite[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): ContactWebsite[];
    }
}
