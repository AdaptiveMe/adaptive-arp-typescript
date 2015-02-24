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
       @class Adaptive.EmailAddress
       @extends Adaptive.APIBean
       Structure representing the data elements of an email addressee.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    class EmailAddress extends APIBean {
        /**
           @property {string} address
           The Email address
        */
        address: string;
        /**
           @property {string} address
           The Email address The 'addressProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'address'.
        */
        addressProperty: string;
        /**
           @method constructor
           Constructor used by implementation

           @param {string} address of the Email
           @since v2.0
        */
        constructor(address: string);
        /**
           @method
           Returns the email address

           @return {string} address of the Email
           @since v2.0
        */
        getAddress(): string;
        /**
           @method
           Set the Email address

           @param {string} address of the Email
           @since v2.0
        */
        setAddress(address: string): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.EmailAddress.
           @return {Adaptive.EmailAddress} Wrapped object instance.
        */
        static toObject(object: any): EmailAddress;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.EmailAddress[].
           @return {Adaptive.EmailAddress[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): EmailAddress[];
    }
}
