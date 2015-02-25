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
///<reference path="APIRequest.ts"/>
///<reference path="APIResponse.ts"/>
///<reference path="BaseCommunicationBridge.ts"/>
///<reference path="CommonUtil.ts"/>
///<reference path="IAdaptiveRPGroup.ts"/>
///<reference path="IBaseCommunication.ts"/>
///<reference path="IService.ts"/>
///<reference path="IServiceMethod.ts"/>
///<reference path="IServiceResultCallback.ts"/>
///<reference path="ServiceRequest.ts"/>
///<reference path="ServiceResultCallback.ts"/>
///<reference path="ServiceToken.ts"/>
var Adaptive;
(function (Adaptive) {
    /**
       @class Adaptive.ServiceBridge
       @extends Adaptive.BaseCommunicationBridge
       Interface for Managing the Services operations

       @author Francisco Javier Martin Bueno
       @since v2.0
    */
    var ServiceBridge = (function (_super) {
        __extends(ServiceBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function ServiceBridge() {
            _super.call(this);
        }
        /**
           @method
           Create a service request for the given ServiceToken. This method creates the request, populating
existing headers and cookies for the same service. The request is populated with all the defaults
for the service being invoked and requires only the request body to be set. Headers and cookies may be
manipulated as needed by the application before submitting the ServiceRequest via invokeService.

           @param {Adaptive.ServiceToken} serviceToken serviceToken ServiceToken to be used for the creation of the request.
           @return {Adaptive.ServiceRequest} ServiceRequest with pre-populated headers, cookies and defaults for the service.
           @since v2.0.6
        */
        ServiceBridge.prototype.getServiceRequest = function (serviceToken) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(serviceToken));
            var apiRequest = new Adaptive.APIRequest("IService", "getServiceRequest", arParams, -1);
            var apiResponse = Adaptive.postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = Adaptive.ServiceRequest.toObject(JSON.parse(apiResponse.getResponse()));
            }
            return response;
        };
        /**
           @method
           Obtains a ServiceToken for the given parameters to be used for the creation of requests.

           @param {string} serviceName serviceName  Service name.
           @param {string} endpointName endpointName Endpoint name.
           @param {string} functionName functionName Function name.
           @param {Adaptive.IServiceMethod} method method       Method type.
           @return {Adaptive.ServiceToken} ServiceToken to create a service request or null if the given parameter combination is not
configured in the platform's XML service definition file.
           @since v2.0.6
        */
        ServiceBridge.prototype.getServiceToken = function (serviceName, endpointName, functionName, method) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(serviceName));
            arParams.push(JSON.stringify(endpointName));
            arParams.push(JSON.stringify(functionName));
            arParams.push(JSON.stringify(method));
            var apiRequest = new Adaptive.APIRequest("IService", "getServiceToken", arParams, -1);
            var apiResponse = Adaptive.postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = Adaptive.ServiceToken.toObject(JSON.parse(apiResponse.getResponse()));
            }
            return response;
        };
        /**
           @method
           Obtains a Service token by a concrete uri (http://domain.com/path). This method would be useful when
a service response is a redirect (3XX) and it is necessary to make a request to another host and we
don't know by advance the name of the service.

           @param {string} uri uri Unique Resource Identifier for a Service-Endpoint-Path-Method
           @return {Adaptive.ServiceToken} ServiceToken to create a service request or null if the given parameter is not
configured in the platform's XML service definition file.
           @since v2.1.4
        */
        ServiceBridge.prototype.getServiceTokenByUri = function (uri) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(uri));
            var apiRequest = new Adaptive.APIRequest("IService", "getServiceTokenByUri", arParams, -1);
            var apiResponse = Adaptive.postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = Adaptive.ServiceToken.toObject(JSON.parse(apiResponse.getResponse()));
            }
            return response;
        };
        /**
           @method
           Returns all the possible service tokens configured in the platform's XML service definition file.

           @return {Adaptive.ServiceToken[]} Array of service tokens configured.
           @since v2.0.6
        */
        ServiceBridge.prototype.getServicesRegistered = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new Adaptive.APIRequest("IService", "getServicesRegistered", arParams, -1);
            var apiResponse = Adaptive.postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = new Array();
                var responseArray = JSON.parse(apiResponse.getResponse());
                for (var i = 0; i < responseArray.length; i++) {
                    response.push(Adaptive.ServiceToken.toObject(responseArray[i]));
                }
            }
            return response;
        };
        /**
           @method
           Executes the given ServiceRequest and provides responses to the given callback handler.

           @param {Adaptive.ServiceRequest} serviceRequest serviceRequest ServiceRequest with the request body.
           @param {Adaptive.ServiceResultCallback} callback callback       IServiceResultCallback to handle the ServiceResponse.
           @since v2.0.6
        */
        ServiceBridge.prototype.invokeService = function (serviceRequest, callback) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(serviceRequest));
            var apiRequest = new Adaptive.APIRequest("IService", "invokeService", arParams, callback.getId());
            Adaptive.postRequestCallback(apiRequest, callback, Adaptive.registeredServiceResultCallback);
        };
        /**
           @method
           Checks whether a specific service, endpoint, function and method type is configured in the platform's
XML service definition file.

           @param {string} serviceName serviceName  Service name.
           @param {string} endpointName endpointName Endpoint name.
           @param {string} functionName functionName Function name.
           @param {Adaptive.IServiceMethod} method method       Method type.
           @return {boolean} Returns true if the service is configured, false otherwise.
           @since v2.0.6
        */
        ServiceBridge.prototype.isServiceRegistered = function (serviceName, endpointName, functionName, method) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(serviceName));
            arParams.push(JSON.stringify(endpointName));
            arParams.push(JSON.stringify(functionName));
            arParams.push(JSON.stringify(method));
            var apiRequest = new Adaptive.APIRequest("IService", "isServiceRegistered", arParams, -1);
            var apiResponse = Adaptive.postRequest(apiRequest);
            // Prepare response.
            var response = false;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = JSON.parse(apiResponse.getResponse());
            }
            return response;
        };
        return ServiceBridge;
    })(Adaptive.BaseCommunicationBridge);
    Adaptive.ServiceBridge = ServiceBridge;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=ServiceBridge.js.map