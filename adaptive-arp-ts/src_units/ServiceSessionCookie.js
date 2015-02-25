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
var __extends = this.__extends || function (d, b) {
    for (var p in b) { if (b.hasOwnProperty(p)) { d[p] = b[p]; } }
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="APIBean.ts"/>
var Adaptive;
(function (Adaptive) {
    /**
       @class Adaptive.ServiceSessionCookie
       @extends Adaptive.APIBean
       Structure representing the cookieValue of a http cookie.

       @author Aryslan
       @since v2.0
       @version 1.0
    */
    var ServiceSessionCookie = (function (_super) {
        __extends(ServiceSessionCookie, _super);
        /**
           @method constructor
           Constructor used by the implementation

           @param {string} cookieName  Name of the cookie
           @param {string} cookieValue Value of the cookie
           @since v2.0
        */
        function ServiceSessionCookie(cookieName, cookieValue) {
            _super.call(this);
            this.cookieName = cookieName;
            this.cookieValue = cookieValue;
        }
        Object.defineProperty(ServiceSessionCookie.prototype, "cookieNameProperty", {
            /**
               @property {string} cookieName
               Name ot the cookie. The 'cookieNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'cookieName'.
            */
            get: function () {
                return this.cookieName;
            },
            set: function (cookieName) {
                this.cookieName = cookieName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceSessionCookie.prototype, "cookieValueProperty", {
            /**
               @property {string} cookieValue
               Value of the ServiceCookie. The 'cookieValueProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'cookieValue'.
            */
            get: function () {
                return this.cookieValue;
            },
            set: function (cookieValue) {
                this.cookieValue = cookieValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceSessionCookie.prototype, "creationProperty", {
            /**
               @property {number} creation
               ServiceCookie creation timestamp in milliseconds. The 'creationProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'creation'.
            */
            get: function () {
                return this.creation;
            },
            set: function (creation) {
                this.creation = creation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceSessionCookie.prototype, "domainProperty", {
            /**
               @property {string} domain
               Domain for which the cookie is valid. The 'domainProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'domain'.
            */
            get: function () {
                return this.domain;
            },
            set: function (domain) {
                this.domain = domain;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceSessionCookie.prototype, "expiryProperty", {
            /**
               @property {number} expiry
               ServiceCookie expiry in milliseconds or -1 for session only. The 'expiryProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'expiry'.
            */
            get: function () {
                return this.expiry;
            },
            set: function (expiry) {
                this.expiry = expiry;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceSessionCookie.prototype, "pathProperty", {
            /**
               @property {string} path
               URI path for which the cookie is valid. The 'pathProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'path'.
            */
            get: function () {
                return this.path;
            },
            set: function (path) {
                this.path = path;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceSessionCookie.prototype, "schemeProperty", {
            /**
               @property {string} scheme
               Scheme of the domain - http/https - for which the cookie is valid. The 'schemeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'scheme'.
            */
            get: function () {
                return this.scheme;
            },
            set: function (scheme) {
                this.scheme = scheme;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceSessionCookie.prototype, "secureProperty", {
            /**
               @property {boolean} secure
               ServiceCookie is secure (https only). The 'secureProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'secure'.
            */
            get: function () {
                return this.secure;
            },
            set: function (secure) {
                this.secure = secure;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the cookie cookieName

           @return {string} cookieName Name of the cookie
           @since v2.0
        */
        ServiceSessionCookie.prototype.getCookieName = function () {
            return this.cookieName;
        };
        /**
           @method
           Set the cookie cookieName

           @param {string} cookieName Name of the cookie
           @since v2.0
        */
        ServiceSessionCookie.prototype.setCookieName = function (cookieName) {
            this.cookieName = cookieName;
        };
        /**
           @method
           Returns the cookie cookieValue

           @return {string} Value of the cookie
           @since v2.0
        */
        ServiceSessionCookie.prototype.getCookieValue = function () {
            return this.cookieValue;
        };
        /**
           @method
           Set the cookie cookieValue

           @param {string} cookieValue Value of the cookie
           @since v2.0
        */
        ServiceSessionCookie.prototype.setCookieValue = function (cookieValue) {
            this.cookieValue = cookieValue;
        };
        /**
           @method
           Returns the creation date

           @return {number} Creation date of the cookie
           @since v2.0
        */
        ServiceSessionCookie.prototype.getCreation = function () {
            return this.creation;
        };
        /**
           @method
           Sets the creation date

           @param {number} creation Creation date of the cookie
           @since v2.0
        */
        ServiceSessionCookie.prototype.setCreation = function (creation) {
            this.creation = creation;
        };
        /**
           @method
           Returns the domain

           @return {string} domain
           @since v2.0
        */
        ServiceSessionCookie.prototype.getDomain = function () {
            return this.domain;
        };
        /**
           @method
           Set the domain

           @param {string} domain Domain of the cookie
           @since v2.0
        */
        ServiceSessionCookie.prototype.setDomain = function (domain) {
            this.domain = domain;
        };
        /**
           @method
           Returns the expiration date in milis

           @return {number} expiry
           @since v2.0
        */
        ServiceSessionCookie.prototype.getExpiry = function () {
            return this.expiry;
        };
        /**
           @method
           Set the expiration date in milis

           @param {number} expiry Expiration date of the cookie
           @since v2.0
        */
        ServiceSessionCookie.prototype.setExpiry = function (expiry) {
            this.expiry = expiry;
        };
        /**
           @method
           Returns the path

           @return {string} path
           @since v2.0
        */
        ServiceSessionCookie.prototype.getPath = function () {
            return this.path;
        };
        /**
           @method
           Set the path

           @param {string} path Path of the cookie
           @since v2.0
        */
        ServiceSessionCookie.prototype.setPath = function (path) {
            this.path = path;
        };
        /**
           @method
           Returns the scheme

           @return {string} scheme
           @since v2.0
        */
        ServiceSessionCookie.prototype.getScheme = function () {
            return this.scheme;
        };
        /**
           @method
           Set the scheme

           @param {string} scheme Scheme of the cookie
           @since v2.0
        */
        ServiceSessionCookie.prototype.setScheme = function (scheme) {
            this.scheme = scheme;
        };
        /**
           @method
           Returns whether the cookie is secure or not

           @return {boolean} true if the cookie is secure; false otherwise
           @since v2.0
        */
        ServiceSessionCookie.prototype.getSecure = function () {
            return this.secure;
        };
        /**
           @method
           Set whether the cookie is secure or not

           @param {boolean} secure Privacy of the cookie
           @since v2.0
        */
        ServiceSessionCookie.prototype.setSecure = function (secure) {
            this.secure = secure;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceSessionCookie.
           @return {Adaptive.ServiceSessionCookie} Wrapped object instance.
        */
        ServiceSessionCookie.toObject = function (object) {
            var result = new ServiceSessionCookie(null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.cookieName = object.cookieName;
                result.cookieValue = object.cookieValue;
                result.domain = object.domain;
                result.path = object.path;
                result.scheme = object.scheme;
                result.secure = object.secure;
                result.expiry = object.expiry;
                result.creation = object.creation;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceSessionCookie[].
           @return {Adaptive.ServiceSessionCookie[]} Wrapped object array instance.
        */
        ServiceSessionCookie.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(ServiceSessionCookie.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return ServiceSessionCookie;
    })(Adaptive.APIBean);
    Adaptive.ServiceSessionCookie = ServiceSessionCookie;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=ServiceSessionCookie.js.map