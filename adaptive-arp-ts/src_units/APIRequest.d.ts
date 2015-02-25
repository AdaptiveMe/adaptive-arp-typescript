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
       @class Adaptive.APIRequest
       Structure representing a HTML5 request to the native API.

       @author Carlos Lozano Diez
       @since v2.0
       @version 1.0
    */
    class APIRequest {
        /**
           @property {string} apiVersion
           Identifier of API version of this request.
        */
        apiVersion: string;
        /**
           @property {string} apiVersion
           Identifier of API version of this request. The 'apiVersionProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'apiVersion'.
        */
        apiVersionProperty: string;
        /**
           @property {number} asyncId
           Identifier of callback or listener for async operations.
        */
        asyncId: number;
        /**
           @property {number} asyncId
           Identifier of callback or listener for async operations. The 'asyncIdProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'asyncId'.
        */
        asyncIdProperty: number;
        /**
           @property {string} bridgeType
           String representing the bridge type to obtain.
        */
        bridgeType: string;
        /**
           @property {string} bridgeType
           String representing the bridge type to obtain. The 'bridgeTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'bridgeType'.
        */
        bridgeTypeProperty: string;
        /**
           @property {string} methodName
           String representing the method name to call.
        */
        methodName: string;
        /**
           @property {string} methodName
           String representing the method name to call. The 'methodNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'methodName'.
        */
        methodNameProperty: string;
        /**
           @property {string[]} parameters
           Parameters of the request as JSON formatted strings.
        */
        parameters: Array<string>;
        /**
           @property {string[]} parameters
           Parameters of the request as JSON formatted strings. The 'parametersProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'parameters'.
        */
        parametersProperty: Array<string>;
        /**
           @method constructor
           Constructor with all the parameters

           @param {string} bridgeType Name of the bridge to be invoked.
           @param {string} methodName Name of the method
           @param {string[]} parameters Array of parameters as JSON formatted strings.
           @param {number} asyncId    Id of callback or listener or zero if none for synchronous calls.
           @since v2.0
        */
        constructor(bridgeType: string, methodName: string, parameters: Array<string>, asyncId: number);
        /**
           @method
           Returns the request's API version. This should be the same or higher than the platform managing the
request.

           @return {string} String with the API version of the request.
        */
        getApiVersion(): string;
        /**
           @method
           Sets the request's API version. This should be the same or higher than the platform managing the
request.

           @param {string} apiVersion String with the API version of the request.
        */
        setApiVersion(apiVersion: string): void;
        /**
           @method
           Returns the callback or listener id assigned to this request OR zero if there is no associated callback or
listener.

           @return {number} long with the unique id of the callback or listener, or zero if there is no associated async event.
        */
        getAsyncId(): number;
        /**
           @method
           Sets the callback or listener id to the request.

           @param {number} asyncId The unique id of the callback or listener.
        */
        setAsyncId(asyncId: number): void;
        /**
           @method
           Bridge Type Getter

           @return {string} Bridge Type
           @since v2.0
        */
        getBridgeType(): string;
        /**
           @method
           Bridge Type Setter

           @param {string} bridgeType Bridge Type
           @since v2.0
        */
        setBridgeType(bridgeType: string): void;
        /**
           @method
           Method name Getter

           @return {string} Method name
           @since v2.0
        */
        getMethodName(): string;
        /**
           @method
           Method name Setter

           @param {string} methodName Method name
           @since v2.0
        */
        setMethodName(methodName: string): void;
        /**
           @method
           Parameters Getter

           @return {string[]} Parameters
           @since v2.0
        */
        getParameters(): Array<string>;
        /**
           @method
           Parameters Setter

           @param {string[]} parameters Parameters, JSON formatted strings of objects.
           @since v2.0
        */
        setParameters(parameters: Array<string>): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.APIRequest.
           @return {Adaptive.APIRequest} Wrapped object instance.
        */
        static toObject(object: any): APIRequest;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.APIRequest[].
           @return {Adaptive.APIRequest[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): APIRequest[];
    }
}
