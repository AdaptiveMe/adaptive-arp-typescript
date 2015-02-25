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
///<reference path="ServiceSessionAttribute.ts"/>
///<reference path="ServiceSessionCookie.ts"/>
var Adaptive;
(function (Adaptive) {
    /**
       @class Adaptive.ServiceSession
       @extends Adaptive.APIBean
       Represents a session object for HTTP request and responses

       @author Ferran Vila Conesa
       @since v2.0
       @version 1.0
    */
    var ServiceSession = (function (_super) {
        __extends(ServiceSession, _super);
        /**
           @method constructor
           Constructor with fields.

           @param {Adaptive.ServiceSessionCookie[]} cookies    The cookies of the request or response.
           @param {Adaptive.ServiceSessionAttribute[]} attributes Attributes of the request or response.
           @since v2.0
        */
        function ServiceSession(cookies, attributes) {
            _super.call(this);
            this.cookies = cookies;
            this.attributes = attributes;
        }
        Object.defineProperty(ServiceSession.prototype, "attributesProperty", {
            /**
               @property {Adaptive.ServiceSessionAttribute[]} attributes
               The attributes of the request or response. The 'attributesProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'attributes'.
            */
            get: function () {
                return this.attributes;
            },
            set: function (attributes) {
                this.attributes = attributes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceSession.prototype, "cookiesProperty", {
            /**
               @property {Adaptive.ServiceSessionCookie[]} cookies
               The cookies of the request or response. The 'cookiesProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'cookies'.
            */
            get: function () {
                return this.cookies;
            },
            set: function (cookies) {
                this.cookies = cookies;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Gets the attributes of the request or response.

           @return {Adaptive.ServiceSessionAttribute[]} Attributes of the request or response.
           @since v2.0
        */
        ServiceSession.prototype.getAttributes = function () {
            return this.attributes;
        };
        /**
           @method
           Sets the attributes for the request or response.

           @param {Adaptive.ServiceSessionAttribute[]} attributes Attributes of the request or response.
           @since v2.0
        */
        ServiceSession.prototype.setAttributes = function (attributes) {
            this.attributes = attributes;
        };
        /**
           @method
           Returns the cookies of the request or response.

           @return {Adaptive.ServiceSessionCookie[]} The cookies of the request or response.
           @since v2.0
        */
        ServiceSession.prototype.getCookies = function () {
            return this.cookies;
        };
        /**
           @method
           Sets the cookies of the request or response.

           @param {Adaptive.ServiceSessionCookie[]} cookies The cookies of the request or response.
           @since v2.0
        */
        ServiceSession.prototype.setCookies = function (cookies) {
            this.cookies = cookies;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceSession.
           @return {Adaptive.ServiceSession} Wrapped object instance.
        */
        ServiceSession.toObject = function (object) {
            var result = new ServiceSession(null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.cookies = Adaptive.ServiceSessionCookie.toObjectArray(object.cookies);
                result.attributes = Adaptive.ServiceSessionAttribute.toObjectArray(object.attributes);
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceSession[].
           @return {Adaptive.ServiceSession[]} Wrapped object array instance.
        */
        ServiceSession.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(ServiceSession.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return ServiceSession;
    })(Adaptive.APIBean);
    Adaptive.ServiceSession = ServiceSession;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=ServiceSession.js.map