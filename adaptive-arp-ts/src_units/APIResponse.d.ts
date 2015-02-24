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
       @class Adaptive.APIResponse
       Structure representing a JSON response to the HTML5 layer.

       @author Carlos Lozano Diez
       @since v2.0
       @version 1.0
    */
    class APIResponse {
        /**
           @property {string} response
           String representing the JavaScript value or JSON object representation of the response.
        */
        response: string;
        /**
           @property {string} response
           String representing the JavaScript value or JSON object representation of the response. The 'responseProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'response'.
        */
        responseProperty: string;
        /**
           @property {number} statusCode
           Status code of the response
        */
        statusCode: number;
        /**
           @property {number} statusCode
           Status code of the response The 'statusCodeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'statusCode'.
        */
        statusCodeProperty: number;
        /**
           @property {string} statusMessage
           Status message of the response
        */
        statusMessage: string;
        /**
           @property {string} statusMessage
           Status message of the response The 'statusMessageProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'statusMessage'.
        */
        statusMessageProperty: string;
        /**
           @method constructor
           Constructor with parameters.

           @param {string} response      String representing the JavaScript value or JSON object representation of the response.
           @param {number} statusCode    Status code of the response (200 = OK, others are warning or error conditions).
           @param {string} statusMessage Status message of the response.
        */
        constructor(response: string, statusCode: number, statusMessage: string);
        /**
           @method
           Response getter

           @return {string} String representing the JavaScript value or JSON object representation of the response.
           @since v2.0
        */
        getResponse(): string;
        /**
           @method
           Response setter

           @param {string} response String representing the JavaScript value or JSON object representation of the response.
        */
        setResponse(response: string): void;
        /**
           @method
           Status code getter

           @return {number} Status code of the response (200 = OK, others are warning or error conditions).
        */
        getStatusCode(): number;
        /**
           @method
           Status code setter

           @param {number} statusCode Status code of the response  (200 = OK, others are warning or error conditions).
        */
        setStatusCode(statusCode: number): void;
        /**
           @method
           Status message getter

           @return {string} Status message of the response.
        */
        getStatusMessage(): string;
        /**
           @method
           Status message setter.

           @param {string} statusMessage Status message of the response
        */
        setStatusMessage(statusMessage: string): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.APIResponse.
           @return {Adaptive.APIResponse} Wrapped object instance.
        */
        static toObject(object: any): APIResponse;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.APIResponse[].
           @return {Adaptive.APIResponse[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): APIResponse[];
    }
}
