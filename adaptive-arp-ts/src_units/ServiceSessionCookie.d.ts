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
       @class Adaptive.ServiceSessionCookie
       @extends Adaptive.APIBean
       Structure representing the cookieValue of a http cookie.

       @author Aryslan
       @since v2.0
       @version 1.0
    */
    class ServiceSessionCookie extends APIBean {
        /**
           @property {string} cookieName
           Name ot the cookie.
        */
        cookieName: string;
        /**
           @property {string} cookieName
           Name ot the cookie. The 'cookieNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'cookieName'.
        */
        cookieNameProperty: string;
        /**
           @property {string} cookieValue
           Value of the ServiceCookie.
        */
        cookieValue: string;
        /**
           @property {string} cookieValue
           Value of the ServiceCookie. The 'cookieValueProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'cookieValue'.
        */
        cookieValueProperty: string;
        /**
           @property {number} creation
           ServiceCookie creation timestamp in milliseconds.
        */
        creation: number;
        /**
           @property {number} creation
           ServiceCookie creation timestamp in milliseconds. The 'creationProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'creation'.
        */
        creationProperty: number;
        /**
           @property {string} domain
           Domain for which the cookie is valid.
        */
        domain: string;
        /**
           @property {string} domain
           Domain for which the cookie is valid. The 'domainProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'domain'.
        */
        domainProperty: string;
        /**
           @property {number} expiry
           ServiceCookie expiry in milliseconds or -1 for session only.
        */
        expiry: number;
        /**
           @property {number} expiry
           ServiceCookie expiry in milliseconds or -1 for session only. The 'expiryProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'expiry'.
        */
        expiryProperty: number;
        /**
           @property {string} path
           URI path for which the cookie is valid.
        */
        path: string;
        /**
           @property {string} path
           URI path for which the cookie is valid. The 'pathProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'path'.
        */
        pathProperty: string;
        /**
           @property {string} scheme
           Scheme of the domain - http/https - for which the cookie is valid.
        */
        scheme: string;
        /**
           @property {string} scheme
           Scheme of the domain - http/https - for which the cookie is valid. The 'schemeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'scheme'.
        */
        schemeProperty: string;
        /**
           @property {boolean} secure
           ServiceCookie is secure (https only).
        */
        secure: boolean;
        /**
           @property {boolean} secure
           ServiceCookie is secure (https only). The 'secureProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'secure'.
        */
        secureProperty: boolean;
        /**
           @method constructor
           Constructor used by the implementation

           @param {string} cookieName  Name of the cookie
           @param {string} cookieValue Value of the cookie
           @since v2.0
        */
        constructor(cookieName: string, cookieValue: string);
        /**
           @method
           Returns the cookie cookieName

           @return {string} cookieName Name of the cookie
           @since v2.0
        */
        getCookieName(): string;
        /**
           @method
           Set the cookie cookieName

           @param {string} cookieName Name of the cookie
           @since v2.0
        */
        setCookieName(cookieName: string): void;
        /**
           @method
           Returns the cookie cookieValue

           @return {string} Value of the cookie
           @since v2.0
        */
        getCookieValue(): string;
        /**
           @method
           Set the cookie cookieValue

           @param {string} cookieValue Value of the cookie
           @since v2.0
        */
        setCookieValue(cookieValue: string): void;
        /**
           @method
           Returns the creation date

           @return {number} Creation date of the cookie
           @since v2.0
        */
        getCreation(): number;
        /**
           @method
           Sets the creation date

           @param {number} creation Creation date of the cookie
           @since v2.0
        */
        setCreation(creation: number): void;
        /**
           @method
           Returns the domain

           @return {string} domain
           @since v2.0
        */
        getDomain(): string;
        /**
           @method
           Set the domain

           @param {string} domain Domain of the cookie
           @since v2.0
        */
        setDomain(domain: string): void;
        /**
           @method
           Returns the expiration date in milis

           @return {number} expiry
           @since v2.0
        */
        getExpiry(): number;
        /**
           @method
           Set the expiration date in milis

           @param {number} expiry Expiration date of the cookie
           @since v2.0
        */
        setExpiry(expiry: number): void;
        /**
           @method
           Returns the path

           @return {string} path
           @since v2.0
        */
        getPath(): string;
        /**
           @method
           Set the path

           @param {string} path Path of the cookie
           @since v2.0
        */
        setPath(path: string): void;
        /**
           @method
           Returns the scheme

           @return {string} scheme
           @since v2.0
        */
        getScheme(): string;
        /**
           @method
           Set the scheme

           @param {string} scheme Scheme of the cookie
           @since v2.0
        */
        setScheme(scheme: string): void;
        /**
           @method
           Returns whether the cookie is secure or not

           @return {boolean} true if the cookie is secure; false otherwise
           @since v2.0
        */
        getSecure(): boolean;
        /**
           @method
           Set whether the cookie is secure or not

           @param {boolean} secure Privacy of the cookie
           @since v2.0
        */
        setSecure(secure: boolean): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceSessionCookie.
           @return {Adaptive.ServiceSessionCookie} Wrapped object instance.
        */
        static toObject(object: any): ServiceSessionCookie;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceSessionCookie[].
           @return {Adaptive.ServiceSessionCookie[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): ServiceSessionCookie[];
    }
}
