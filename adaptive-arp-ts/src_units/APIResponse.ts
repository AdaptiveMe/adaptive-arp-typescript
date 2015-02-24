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
        @class Adaptive.APIResponse
        Structure representing a JSON response to the HTML5 layer.

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     export class APIResponse {

          /**
             @property {string} response
             String representing the JavaScript value or JSON object representation of the response.
          */
          response : string;

          /**
             @property {string} response
             String representing the JavaScript value or JSON object representation of the response. The 'responseProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'response'.
          */
          get responseProperty() : string {
               return this.response;
          }

          set responseProperty(response:string) {
               this.response = response;
          }

          /**
             @property {number} statusCode
             Status code of the response
          */
          statusCode : number;

          /**
             @property {number} statusCode
             Status code of the response The 'statusCodeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'statusCode'.
          */
          get statusCodeProperty() : number {
               return this.statusCode;
          }

          set statusCodeProperty(statusCode:number) {
               this.statusCode = statusCode;
          }

          /**
             @property {string} statusMessage
             Status message of the response
          */
          statusMessage : string;

          /**
             @property {string} statusMessage
             Status message of the response The 'statusMessageProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'statusMessage'.
          */
          get statusMessageProperty() : string {
               return this.statusMessage;
          }

          set statusMessageProperty(statusMessage:string) {
               this.statusMessage = statusMessage;
          }

          /**
             @method constructor
             Constructor with parameters.

             @param {string} response      String representing the JavaScript value or JSON object representation of the response.
             @param {number} statusCode    Status code of the response (200 = OK, others are warning or error conditions).
             @param {string} statusMessage Status message of the response.
          */
          constructor(response: string, statusCode: number, statusMessage: string) {
               this.response = response;
               this.statusCode = statusCode;
               this.statusMessage = statusMessage;
          }

          /**
             @method
             Response getter

             @return {string} String representing the JavaScript value or JSON object representation of the response.
             @since v2.0
          */
          getResponse() : string {
               return this.response;
          }

          /**
             @method
             Response setter

             @param {string} response String representing the JavaScript value or JSON object representation of the response.
          */
          setResponse(response: string) {
               this.response = response;
          }

          /**
             @method
             Status code getter

             @return {number} Status code of the response (200 = OK, others are warning or error conditions).
          */
          getStatusCode() : number {
               return this.statusCode;
          }

          /**
             @method
             Status code setter

             @param {number} statusCode Status code of the response  (200 = OK, others are warning or error conditions).
          */
          setStatusCode(statusCode: number) {
               this.statusCode = statusCode;
          }

          /**
             @method
             Status message getter

             @return {string} Status message of the response.
          */
          getStatusMessage() : string {
               return this.statusMessage;
          }

          /**
             @method
             Status message setter.

             @param {string} statusMessage Status message of the response
          */
          setStatusMessage(statusMessage: string) {
               this.statusMessage = statusMessage;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.APIResponse.
             @return {Adaptive.APIResponse} Wrapped object instance.
          */
          static toObject(object : any) : APIResponse {
               var result : APIResponse = new APIResponse(null, null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.response = object.response;
                    result.statusCode = object.statusCode;
                    result.statusMessage = object.statusMessage;

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.APIResponse[].
             @return {Adaptive.APIResponse[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : APIResponse[] {
               var resultArray : Array<APIResponse> = new Array<APIResponse>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(APIResponse.toObject(object[i]));
                    }
               }
               return resultArray;
          }

     }
}

/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
