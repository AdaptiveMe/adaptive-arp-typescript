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
///<reference path="IServiceContentEncoding.ts"/>
///<reference path="ServiceHeader.ts"/>
///<reference path="ServiceRequestParameter.ts"/>
///<reference path="ServiceSession.ts"/>
///<reference path="ServiceToken.ts"/>
var Adaptive;
(function (Adaptive) {
    /**
       @class Adaptive.ServiceRequest
       @extends Adaptive.APIBean
       Represents a local or remote service request.

       @author Aryslan
       @since v2.0
       @version 1.0
    */
    var ServiceRequest = (function (_super) {
        __extends(ServiceRequest, _super);
        /**
           @method constructor
           Convenience constructor.

           @param {string} content      Content payload.
           @param {Adaptive.ServiceToken} serviceToken ServiceToken for the request.
           @since v2.0.6
        */
        function ServiceRequest(content, serviceToken) {
            _super.call(this);
            this.content = content;
            this.serviceToken = serviceToken;
        }
        Object.defineProperty(ServiceRequest.prototype, "contentEncodingProperty", {
            /**
               @property {Adaptive.IServiceContentEncoding} contentEncoding
               Encoding of the content - by default assumed to be UTF8. This may be populated by the application, the platform
  populates this field with defaults for the service. The 'contentEncodingProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contentEncoding'.
            */
            get: function () {
                return this.contentEncoding;
            },
            set: function (contentEncoding) {
                this.contentEncoding = contentEncoding;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceRequest.prototype, "bodyParametersProperty", {
            /**
               @property {Adaptive.ServiceRequestParameter[]} bodyParameters
               Body parameters to be included in the body of the request to a service. These may be applied
  during GET/POST operations. No body parameters are included if this array is null or length zero. The 'bodyParametersProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'bodyParameters'.
            */
            get: function () {
                return this.bodyParameters;
            },
            set: function (bodyParameters) {
                this.bodyParameters = bodyParameters;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceRequest.prototype, "contentProperty", {
            /**
               @property {string} content
               Request data content (plain text). This should be populated by the application. The content should be
  in some well-known web format - in specific, binaries submitted should be encoded to base64 and the content
  type should be set respectively by the application. The 'contentProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'content'.
            */
            get: function () {
                return this.content;
            },
            set: function (content) {
                this.content = content;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceRequest.prototype, "contentLengthProperty", {
            /**
               @property {number} contentLength
               The length in bytes of the content. This may be populated by the application, the platform
  calculates this length automatically if a specific contentLength is not specified. The 'contentLengthProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contentLength'.
            */
            get: function () {
                return this.contentLength;
            },
            set: function (contentLength) {
                this.contentLength = contentLength;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceRequest.prototype, "contentTypeProperty", {
            /**
               @property {string} contentType
               The request content type (MIME TYPE). This may be populated by the application, the platform
  populates this field with defaults for the service. The 'contentTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contentType'.
            */
            get: function () {
                return this.contentType;
            },
            set: function (contentType) {
                this.contentType = contentType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceRequest.prototype, "queryParametersProperty", {
            /**
               @property {Adaptive.ServiceRequestParameter[]} queryParameters
               Query string parameters to be appended to the service URL when making the request. These may be applied
  during GET/POST operations. No query parameters are appended if this array is null or length zero. The 'queryParametersProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'queryParameters'.
            */
            get: function () {
                return this.queryParameters;
            },
            set: function (queryParameters) {
                this.queryParameters = queryParameters;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceRequest.prototype, "refererHostProperty", {
            /**
               @property {string} refererHost
               This host indicates the origin host of the request. This, could be useful in case of redirected requests. The 'refererHostProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'refererHost'.
            */
            get: function () {
                return this.refererHost;
            },
            set: function (refererHost) {
                this.refererHost = refererHost;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceRequest.prototype, "serviceHeadersProperty", {
            /**
               @property {Adaptive.ServiceHeader[]} serviceHeaders
               The serviceHeaders array (name,value pairs) to be included in the request. This may be populated by the
  application, the platform populates this field with defaults for the service and the previous headers.
  In specific, the platform maintains request and response state automatically. The 'serviceHeadersProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'serviceHeaders'.
            */
            get: function () {
                return this.serviceHeaders;
            },
            set: function (serviceHeaders) {
                this.serviceHeaders = serviceHeaders;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceRequest.prototype, "serviceSessionProperty", {
            /**
               @property {Adaptive.ServiceSession} serviceSession
               Session attributes and cookies. This may be populated by the application, the platform populates
  this field with defaults for the service and the previous state information. In specific, the platform
  maintains request and response state automatically. The 'serviceSessionProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'serviceSession'.
            */
            get: function () {
                return this.serviceSession;
            },
            set: function (serviceSession) {
                this.serviceSession = serviceSession;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceRequest.prototype, "serviceTokenProperty", {
            /**
               @property {Adaptive.ServiceToken} serviceToken
               Token used for the creation of the request with the destination service, endpoint, function and method
  identifiers. This should not be manipulated by the application directly. The 'serviceTokenProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'serviceToken'.
            */
            get: function () {
                return this.serviceToken;
            },
            set: function (serviceToken) {
                this.serviceToken = serviceToken;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceRequest.prototype, "userAgentProperty", {
            /**
               @property {string} userAgent
               This attribute allows for the default user-agent string to be overridden by the application. The 'userAgentProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'userAgent'.
            */
            get: function () {
                return this.userAgent;
            },
            set: function (userAgent) {
                this.userAgent = userAgent;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the content encoding

           @return {Adaptive.IServiceContentEncoding} contentEncoding
           @since v2.0
        */
        ServiceRequest.prototype.getContentEncoding = function () {
            return this.contentEncoding;
        };
        /**
           @method
           Set the content encoding

           @param {Adaptive.IServiceContentEncoding} contentEncoding Encoding of the binary payload - by default assumed to be UTF8.
           @since v2.0
        */
        ServiceRequest.prototype.setContentEncoding = function (contentEncoding) {
            this.contentEncoding = contentEncoding;
        };
        /**
           @method
           Gets the body parameters of the request.

           @return {Adaptive.ServiceRequestParameter[]} ServiceRequestParameter array or null if none are specified.
           @since v2.0.6
        */
        ServiceRequest.prototype.getBodyParameters = function () {
            return this.bodyParameters;
        };
        /**
           @method
           Sets the body parameters of the request.

           @param {Adaptive.ServiceRequestParameter[]} bodyParameters ServiceRequestParameter array or null if none are specified.
           @since v2.0.6
        */
        ServiceRequest.prototype.setBodyParameters = function (bodyParameters) {
            this.bodyParameters = bodyParameters;
        };
        /**
           @method
           Returns the content

           @return {string} content
           @since v2.0
        */
        ServiceRequest.prototype.getContent = function () {
            return this.content;
        };
        /**
           @method
           Set the content

           @param {string} content Request/Response data content (plain text)
           @since v2.0
        */
        ServiceRequest.prototype.setContent = function (content) {
            this.content = content;
        };
        /**
           @method
           Returns the content length

           @return {number} contentLength
           @since v2.0
        */
        ServiceRequest.prototype.getContentLength = function () {
            return this.contentLength;
        };
        /**
           @method
           Set the content length

           @param {number} contentLength The length in bytes for the Content field.
           @since v2.0
        */
        ServiceRequest.prototype.setContentLength = function (contentLength) {
            this.contentLength = contentLength;
        };
        /**
           @method
           Returns the content type

           @return {string} contentType
           @since v2.0
        */
        ServiceRequest.prototype.getContentType = function () {
            return this.contentType;
        };
        /**
           @method
           Set the content type

           @param {string} contentType The request/response content type (MIME TYPE).
           @since v2.0
        */
        ServiceRequest.prototype.setContentType = function (contentType) {
            this.contentType = contentType;
        };
        /**
           @method
           Gets the query parameters of the request.

           @return {Adaptive.ServiceRequestParameter[]} ServiceRequestParameter array or null if none are specified.
           @since v2.0.6
        */
        ServiceRequest.prototype.getQueryParameters = function () {
            return this.queryParameters;
        };
        /**
           @method
           Sets the query parameters of the request.

           @param {Adaptive.ServiceRequestParameter[]} queryParameters ServiceRequestParameter array or null if none are specified.
           @since v2.0.6
        */
        ServiceRequest.prototype.setQueryParameters = function (queryParameters) {
            this.queryParameters = queryParameters;
        };
        /**
           @method
           Returns the referer host (origin) of the request.

           @return {string} Referer host of the request
           @since v2.1.4
        */
        ServiceRequest.prototype.getRefererHost = function () {
            return this.refererHost;
        };
        /**
           @method
           Sets the value for the referer host of the request.

           @param {string} refererHost Referer host of the request
           @since v2.1.4
        */
        ServiceRequest.prototype.setRefererHost = function (refererHost) {
            this.refererHost = refererHost;
        };
        /**
           @method
           Returns the array of ServiceHeader

           @return {Adaptive.ServiceHeader[]} serviceHeaders
           @since v2.0
        */
        ServiceRequest.prototype.getServiceHeaders = function () {
            return this.serviceHeaders;
        };
        /**
           @method
           Set the array of ServiceHeader

           @param {Adaptive.ServiceHeader[]} serviceHeaders The serviceHeaders array (name,value pairs) to be included on the I/O service request.
           @since v2.0
        */
        ServiceRequest.prototype.setServiceHeaders = function (serviceHeaders) {
            this.serviceHeaders = serviceHeaders;
        };
        /**
           @method
           Getter for service session

           @return {Adaptive.ServiceSession} The element service session
           @since v2.0
        */
        ServiceRequest.prototype.getServiceSession = function () {
            return this.serviceSession;
        };
        /**
           @method
           Setter for service session

           @param {Adaptive.ServiceSession} serviceSession The element service session
           @since v2.0
        */
        ServiceRequest.prototype.setServiceSession = function (serviceSession) {
            this.serviceSession = serviceSession;
        };
        /**
           @method
           Gets the ServiceToken of the request.

           @return {Adaptive.ServiceToken} ServiceToken.
           @since v2.0.6
        */
        ServiceRequest.prototype.getServiceToken = function () {
            return this.serviceToken;
        };
        /**
           @method
           Sets the ServiceToken of the request.

           @param {Adaptive.ServiceToken} serviceToken ServiceToken to be used for the invocation.
           @since v2.0.6
        */
        ServiceRequest.prototype.setServiceToken = function (serviceToken) {
            this.serviceToken = serviceToken;
        };
        /**
           @method
           Gets the overridden user-agent string.

           @return {string} User-agent string.
           @since v2.0.6
        */
        ServiceRequest.prototype.getUserAgent = function () {
            return this.userAgent;
        };
        /**
           @method
           Sets the user-agent to override the default user-agent string.

           @param {string} userAgent User-agent string.
           @since v2.0.6
        */
        ServiceRequest.prototype.setUserAgent = function (userAgent) {
            this.userAgent = userAgent;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceRequest.
           @return {Adaptive.ServiceRequest} Wrapped object instance.
        */
        ServiceRequest.toObject = function (object) {
            var result = new ServiceRequest(null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.userAgent = object.userAgent;
                result.content = object.content;
                result.contentType = object.contentType;
                result.contentEncoding = Adaptive.IServiceContentEncoding.toObject(object.contentEncoding);
                result.contentLength = object.contentLength;
                result.serviceHeaders = Adaptive.ServiceHeader.toObjectArray(object.serviceHeaders);
                result.serviceSession = Adaptive.ServiceSession.toObject(object.serviceSession);
                result.queryParameters = Adaptive.ServiceRequestParameter.toObjectArray(object.queryParameters);
                result.bodyParameters = Adaptive.ServiceRequestParameter.toObjectArray(object.bodyParameters);
                result.serviceToken = Adaptive.ServiceToken.toObject(object.serviceToken);
                result.refererHost = object.refererHost;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceRequest[].
           @return {Adaptive.ServiceRequest[]} Wrapped object array instance.
        */
        ServiceRequest.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(ServiceRequest.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return ServiceRequest;
    })(Adaptive.APIBean);
    Adaptive.ServiceRequest = ServiceRequest;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=ServiceRequest.js.map