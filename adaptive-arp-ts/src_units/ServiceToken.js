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
///<reference path="IServiceMethod.ts"/>
var Adaptive;
(function (Adaptive) {
    /**
       @class Adaptive.ServiceToken
       @extends Adaptive.APIBean
       Object representing a specific service, path, function and invocation method for accessing external services.

       @author Carlos Lozano Diez
       @since v2.0.6
       @version 1.0
    */
    var ServiceToken = (function (_super) {
        __extends(ServiceToken, _super);
        /**
           @method constructor
           Convenience constructor.

           @param {string} serviceName      Name of the configured service.
           @param {string} endpointName     Name of the endpoint configured for the service.
           @param {string} functionName     Name of the function configured for the endpoint.
           @param {Adaptive.IServiceMethod} invocationMethod Method type configured for the function.
           @since v2.0.6
        */
        function ServiceToken(serviceName, endpointName, functionName, invocationMethod) {
            _super.call(this);
            this.serviceName = serviceName;
            this.endpointName = endpointName;
            this.functionName = functionName;
            this.invocationMethod = invocationMethod;
        }
        Object.defineProperty(ServiceToken.prototype, "invocationMethodProperty", {
            /**
               @property {Adaptive.IServiceMethod} invocationMethod
               Http method to be used by the invocation - this is typically GET or POST albeit the platform may support
  other invocation methods. This is also defined per function of each endpoint in the platform's XML file. The 'invocationMethodProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'invocationMethod'.
            */
            get: function () {
                return this.invocationMethod;
            },
            set: function (invocationMethod) {
                this.invocationMethod = invocationMethod;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceToken.prototype, "endpointNameProperty", {
            /**
               @property {string} endpointName
               Name of the endpoint configured in the platform's services XML file. This is a reference to a specific schema,
  host and port combination for a given service. The 'endpointNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'endpointName'.
            */
            get: function () {
                return this.endpointName;
            },
            set: function (endpointName) {
                this.endpointName = endpointName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceToken.prototype, "functionNameProperty", {
            /**
               @property {string} functionName
               Name of the function configured in the platform's services XML file for a specific endpoint. This is a reference
  to a relative path of a function published on a remote service. The 'functionNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'functionName'.
            */
            get: function () {
                return this.functionName;
            },
            set: function (functionName) {
                this.functionName = functionName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceToken.prototype, "serviceNameProperty", {
            /**
               @property {string} serviceName
               Name of the service configured in the platform's services XML file. The 'serviceNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'serviceName'.
            */
            get: function () {
                return this.serviceName;
            },
            set: function (serviceName) {
                this.serviceName = serviceName;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Get token's invocation method type.

           @return {Adaptive.IServiceMethod} Invocation method type.
           @since v2.0.6
        */
        ServiceToken.prototype.getInvocationMethod = function () {
            return this.invocationMethod;
        };
        /**
           @method
           Sets the invocation method type.

           @param {Adaptive.IServiceMethod} invocationMethod Method type.
           @since v2.0.6
        */
        ServiceToken.prototype.setInvocationMethod = function (invocationMethod) {
            this.invocationMethod = invocationMethod;
        };
        /**
           @method
           Get token's endpoint name.

           @return {string} Endpoint name.
           @since v2.0.6
        */
        ServiceToken.prototype.getEndpointName = function () {
            return this.endpointName;
        };
        /**
           @method
           Set the endpoint name.

           @param {string} endpointName Endpoint name.
           @since v2.0.6
        */
        ServiceToken.prototype.setEndpointName = function (endpointName) {
            this.endpointName = endpointName;
        };
        /**
           @method
           Get token's function name.

           @return {string} Function name.
           @since v2.0.6
        */
        ServiceToken.prototype.getFunctionName = function () {
            return this.functionName;
        };
        /**
           @method
           Sets the function name.

           @param {string} functionName Function name.
           @since v2.0.6
        */
        ServiceToken.prototype.setFunctionName = function (functionName) {
            this.functionName = functionName;
        };
        /**
           @method
           Get token's service name.

           @return {string} Service name.
           @since v2.0.6
        */
        ServiceToken.prototype.getServiceName = function () {
            return this.serviceName;
        };
        /**
           @method
           Sets token's service name.

           @param {string} serviceName Service name.
           @since v2.0.6
        */
        ServiceToken.prototype.setServiceName = function (serviceName) {
            this.serviceName = serviceName;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceToken.
           @return {Adaptive.ServiceToken} Wrapped object instance.
        */
        ServiceToken.toObject = function (object) {
            var result = new ServiceToken(null, null, null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.serviceName = object.serviceName;
                result.endpointName = object.endpointName;
                result.functionName = object.functionName;
                result.invocationMethod = Adaptive.IServiceMethod.toObject(object.invocationMethod);
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceToken[].
           @return {Adaptive.ServiceToken[]} Wrapped object array instance.
        */
        ServiceToken.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(ServiceToken.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return ServiceToken;
    })(Adaptive.APIBean);
    Adaptive.ServiceToken = ServiceToken;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=ServiceToken.js.map