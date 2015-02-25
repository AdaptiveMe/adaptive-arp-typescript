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
var Adaptive;
(function (Adaptive) {
    /**
       @class Adaptive.APIRequest
       Structure representing a HTML5 request to the native API.

       @author Carlos Lozano Diez
       @since v2.0
       @version 1.0
    */
    var APIRequest = (function () {
        /**
           @method constructor
           Constructor with all the parameters

           @param {string} bridgeType Name of the bridge to be invoked.
           @param {string} methodName Name of the method
           @param {string[]} parameters Array of parameters as JSON formatted strings.
           @param {number} asyncId    Id of callback or listener or zero if none for synchronous calls.
           @since v2.0
        */
        function APIRequest(bridgeType, methodName, parameters, asyncId) {
            this.bridgeType = bridgeType;
            this.methodName = methodName;
            this.parameters = parameters;
            this.asyncId = asyncId;
        }
        Object.defineProperty(APIRequest.prototype, "apiVersionProperty", {
            /**
               @property {string} apiVersion
               Identifier of API version of this request. The 'apiVersionProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'apiVersion'.
            */
            get: function () {
                return this.apiVersion;
            },
            set: function (apiVersion) {
                this.apiVersion = apiVersion;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(APIRequest.prototype, "asyncIdProperty", {
            /**
               @property {number} asyncId
               Identifier of callback or listener for async operations. The 'asyncIdProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'asyncId'.
            */
            get: function () {
                return this.asyncId;
            },
            set: function (asyncId) {
                this.asyncId = asyncId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(APIRequest.prototype, "bridgeTypeProperty", {
            /**
               @property {string} bridgeType
               String representing the bridge type to obtain. The 'bridgeTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'bridgeType'.
            */
            get: function () {
                return this.bridgeType;
            },
            set: function (bridgeType) {
                this.bridgeType = bridgeType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(APIRequest.prototype, "methodNameProperty", {
            /**
               @property {string} methodName
               String representing the method name to call. The 'methodNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'methodName'.
            */
            get: function () {
                return this.methodName;
            },
            set: function (methodName) {
                this.methodName = methodName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(APIRequest.prototype, "parametersProperty", {
            /**
               @property {string[]} parameters
               Parameters of the request as JSON formatted strings. The 'parametersProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'parameters'.
            */
            get: function () {
                return this.parameters;
            },
            set: function (parameters) {
                this.parameters = parameters;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the request's API version. This should be the same or higher than the platform managing the
request.

           @return {string} String with the API version of the request.
        */
        APIRequest.prototype.getApiVersion = function () {
            return this.apiVersion;
        };
        /**
           @method
           Sets the request's API version. This should be the same or higher than the platform managing the
request.

           @param {string} apiVersion String with the API version of the request.
        */
        APIRequest.prototype.setApiVersion = function (apiVersion) {
            this.apiVersion = apiVersion;
        };
        /**
           @method
           Returns the callback or listener id assigned to this request OR zero if there is no associated callback or
listener.

           @return {number} long with the unique id of the callback or listener, or zero if there is no associated async event.
        */
        APIRequest.prototype.getAsyncId = function () {
            return this.asyncId;
        };
        /**
           @method
           Sets the callback or listener id to the request.

           @param {number} asyncId The unique id of the callback or listener.
        */
        APIRequest.prototype.setAsyncId = function (asyncId) {
            this.asyncId = asyncId;
        };
        /**
           @method
           Bridge Type Getter

           @return {string} Bridge Type
           @since v2.0
        */
        APIRequest.prototype.getBridgeType = function () {
            return this.bridgeType;
        };
        /**
           @method
           Bridge Type Setter

           @param {string} bridgeType Bridge Type
           @since v2.0
        */
        APIRequest.prototype.setBridgeType = function (bridgeType) {
            this.bridgeType = bridgeType;
        };
        /**
           @method
           Method name Getter

           @return {string} Method name
           @since v2.0
        */
        APIRequest.prototype.getMethodName = function () {
            return this.methodName;
        };
        /**
           @method
           Method name Setter

           @param {string} methodName Method name
           @since v2.0
        */
        APIRequest.prototype.setMethodName = function (methodName) {
            this.methodName = methodName;
        };
        /**
           @method
           Parameters Getter

           @return {string[]} Parameters
           @since v2.0
        */
        APIRequest.prototype.getParameters = function () {
            return this.parameters;
        };
        /**
           @method
           Parameters Setter

           @param {string[]} parameters Parameters, JSON formatted strings of objects.
           @since v2.0
        */
        APIRequest.prototype.setParameters = function (parameters) {
            this.parameters = parameters;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.APIRequest.
           @return {Adaptive.APIRequest} Wrapped object instance.
        */
        APIRequest.toObject = function (object) {
            var result = new APIRequest(null, null, null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.bridgeType = object.bridgeType;
                result.methodName = object.methodName;
                if (object.parameters != null) {
                    result.parameters = new Array();
                    for (var iparameters = 0; iparameters < object.parameters.length; iparameters++) {
                        var vparameters = object.parameters[iparameters];
                        result.parameters.push(vparameters);
                    }
                }
                result.asyncId = object.asyncId;
                result.apiVersion = object.apiVersion;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.APIRequest[].
           @return {Adaptive.APIRequest[]} Wrapped object array instance.
        */
        APIRequest.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(APIRequest.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return APIRequest;
    })();
    Adaptive.APIRequest = APIRequest;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=APIRequest.js.map