/// <reference path="APIBean.d.ts" />
/// <reference path="IServiceMethod.d.ts" />
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
       @class Adaptive.ServiceToken
       @extends Adaptive.APIBean
       Object representing a specific service, path, function and invocation method for accessing external services.

       @author Carlos Lozano Diez
       @since v2.0.6
       @version 1.0
    */
    class ServiceToken extends APIBean {
        /**
           @property {Adaptive.IServiceMethod} invocationMethod
           Http method to be used by the invocation - this is typically GET or POST albeit the platform may support
other invocation methods. This is also defined per function of each endpoint in the platform's XML file.
        */
        invocationMethod: IServiceMethod;
        /**
           @property {Adaptive.IServiceMethod} invocationMethod
           Http method to be used by the invocation - this is typically GET or POST albeit the platform may support
other invocation methods. This is also defined per function of each endpoint in the platform's XML file. The 'invocationMethodProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'invocationMethod'.
        */
        invocationMethodProperty: IServiceMethod;
        /**
           @property {string} endpointName
           Name of the endpoint configured in the platform's services XML file. This is a reference to a specific schema,
host and port combination for a given service.
        */
        endpointName: string;
        /**
           @property {string} endpointName
           Name of the endpoint configured in the platform's services XML file. This is a reference to a specific schema,
host and port combination for a given service. The 'endpointNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'endpointName'.
        */
        endpointNameProperty: string;
        /**
           @property {string} functionName
           Name of the function configured in the platform's services XML file for a specific endpoint. This is a reference
to a relative path of a function published on a remote service.
        */
        functionName: string;
        /**
           @property {string} functionName
           Name of the function configured in the platform's services XML file for a specific endpoint. This is a reference
to a relative path of a function published on a remote service. The 'functionNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'functionName'.
        */
        functionNameProperty: string;
        /**
           @property {string} serviceName
           Name of the service configured in the platform's services XML file.
        */
        serviceName: string;
        /**
           @property {string} serviceName
           Name of the service configured in the platform's services XML file. The 'serviceNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'serviceName'.
        */
        serviceNameProperty: string;
        /**
           @method constructor
           Convenience constructor.

           @param {string} serviceName      Name of the configured service.
           @param {string} endpointName     Name of the endpoint configured for the service.
           @param {string} functionName     Name of the function configured for the endpoint.
           @param {Adaptive.IServiceMethod} invocationMethod Method type configured for the function.
           @since v2.0.6
        */
        constructor(serviceName: string, endpointName: string, functionName: string, invocationMethod: IServiceMethod);
        /**
           @method
           Get token's invocation method type.

           @return {Adaptive.IServiceMethod} Invocation method type.
           @since v2.0.6
        */
        getInvocationMethod(): IServiceMethod;
        /**
           @method
           Sets the invocation method type.

           @param {Adaptive.IServiceMethod} invocationMethod Method type.
           @since v2.0.6
        */
        setInvocationMethod(invocationMethod: IServiceMethod): void;
        /**
           @method
           Get token's endpoint name.

           @return {string} Endpoint name.
           @since v2.0.6
        */
        getEndpointName(): string;
        /**
           @method
           Set the endpoint name.

           @param {string} endpointName Endpoint name.
           @since v2.0.6
        */
        setEndpointName(endpointName: string): void;
        /**
           @method
           Get token's function name.

           @return {string} Function name.
           @since v2.0.6
        */
        getFunctionName(): string;
        /**
           @method
           Sets the function name.

           @param {string} functionName Function name.
           @since v2.0.6
        */
        setFunctionName(functionName: string): void;
        /**
           @method
           Get token's service name.

           @return {string} Service name.
           @since v2.0.6
        */
        getServiceName(): string;
        /**
           @method
           Sets token's service name.

           @param {string} serviceName Service name.
           @since v2.0.6
        */
        setServiceName(serviceName: string): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceToken.
           @return {Adaptive.ServiceToken} Wrapped object instance.
        */
        static toObject(object: any): ServiceToken;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceToken[].
           @return {Adaptive.ServiceToken[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): ServiceToken[];
    }
}
