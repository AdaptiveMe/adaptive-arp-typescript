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
///<reference path="ServiceSessionAttribute.ts"/>
///<reference path="ServiceSessionCookie.ts"/>

module Adaptive {

     /**
        @class Adaptive.ServiceSession
        @extends Adaptive.APIBean
        Represents a session object for HTTP request and responses

        @author Ferran Vila Conesa
        @since v2.0
        @version 1.0
     */
     export class ServiceSession extends APIBean {

          /**
             @property {Adaptive.ServiceSessionAttribute[]} attributes
             The attributes of the request or response.
          */
          attributes : Array<ServiceSessionAttribute>;

          /**
             @property {Adaptive.ServiceSessionAttribute[]} attributes
             The attributes of the request or response. The 'attributesProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'attributes'.
          */
          get attributesProperty() : Array<ServiceSessionAttribute> {
               return this.attributes;
          }

          set attributesProperty(attributes:Array<ServiceSessionAttribute>) {
               this.attributes = attributes;
          }

          /**
             @property {Adaptive.ServiceSessionCookie[]} cookies
             The cookies of the request or response.
          */
          cookies : Array<ServiceSessionCookie>;

          /**
             @property {Adaptive.ServiceSessionCookie[]} cookies
             The cookies of the request or response. The 'cookiesProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'cookies'.
          */
          get cookiesProperty() : Array<ServiceSessionCookie> {
               return this.cookies;
          }

          set cookiesProperty(cookies:Array<ServiceSessionCookie>) {
               this.cookies = cookies;
          }

          /**
             @method constructor
             Constructor with fields.

             @param {Adaptive.ServiceSessionCookie[]} cookies    The cookies of the request or response.
             @param {Adaptive.ServiceSessionAttribute[]} attributes Attributes of the request or response.
             @since v2.0
          */
          constructor(cookies: Array<ServiceSessionCookie>, attributes: Array<ServiceSessionAttribute>) {
               super();
               this.cookies = cookies;
               this.attributes = attributes;
          }

          /**
             @method
             Gets the attributes of the request or response.

             @return {Adaptive.ServiceSessionAttribute[]} Attributes of the request or response.
             @since v2.0
          */
          getAttributes() : Array<ServiceSessionAttribute> {
               return this.attributes;
          }

          /**
             @method
             Sets the attributes for the request or response.

             @param {Adaptive.ServiceSessionAttribute[]} attributes Attributes of the request or response.
             @since v2.0
          */
          setAttributes(attributes: Array<ServiceSessionAttribute>) {
               this.attributes = attributes;
          }

          /**
             @method
             Returns the cookies of the request or response.

             @return {Adaptive.ServiceSessionCookie[]} The cookies of the request or response.
             @since v2.0
          */
          getCookies() : Array<ServiceSessionCookie> {
               return this.cookies;
          }

          /**
             @method
             Sets the cookies of the request or response.

             @param {Adaptive.ServiceSessionCookie[]} cookies The cookies of the request or response.
             @since v2.0
          */
          setCookies(cookies: Array<ServiceSessionCookie>) {
               this.cookies = cookies;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ServiceSession.
             @return {Adaptive.ServiceSession} Wrapped object instance.
          */
          static toObject(object : any) : ServiceSession {
               var result : ServiceSession = new ServiceSession(null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.cookies = ServiceSessionCookie.toObjectArray(object.cookies);
                    result.attributes = ServiceSessionAttribute.toObjectArray(object.attributes);

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ServiceSession[].
             @return {Adaptive.ServiceSession[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : ServiceSession[] {
               var resultArray : Array<ServiceSession> = new Array<ServiceSession>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(ServiceSession.toObject(object[i]));
                    }
               }
               return resultArray;
          }

     }
}

/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
