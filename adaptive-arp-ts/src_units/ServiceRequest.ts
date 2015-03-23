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
///<reference path="IServiceContentEncoding.ts"/>
///<reference path="ServiceHeader.ts"/>
///<reference path="ServiceRequestParameter.ts"/>
///<reference path="ServiceSession.ts"/>
///<reference path="ServiceToken.ts"/>

module Adaptive {

     /**
        @class Adaptive.ServiceRequest
        @extends Adaptive.APIBean
        Represents a local or remote service request.

        @author Aryslan
        @since v2.0
        @version 1.0
     */
     export class ServiceRequest extends APIBean {

          /**
             @property {Adaptive.IServiceContentEncoding} contentEncoding
             Encoding of the content - by default assumed to be UTF8. This may be populated by the application, the platform
populates this field with defaults for the service.
          */
          contentEncoding : IServiceContentEncoding;

          /**
             @property {Adaptive.IServiceContentEncoding} contentEncoding
             Encoding of the content - by default assumed to be UTF8. This may be populated by the application, the platform
populates this field with defaults for the service. The 'contentEncodingProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contentEncoding'.
          */
          get contentEncodingProperty() : IServiceContentEncoding {
               return this.contentEncoding;
          }

          set contentEncodingProperty(contentEncoding:IServiceContentEncoding) {
               this.contentEncoding = contentEncoding;
          }

          /**
             @property {Adaptive.ServiceRequestParameter[]} bodyParameters
             Body parameters to be included in the body of the request to a service. These may be applied
during GET/POST operations. No body parameters are included if this array is null or length zero.
          */
          bodyParameters : Array<ServiceRequestParameter>;

          /**
             @property {Adaptive.ServiceRequestParameter[]} bodyParameters
             Body parameters to be included in the body of the request to a service. These may be applied
during GET/POST operations. No body parameters are included if this array is null or length zero. The 'bodyParametersProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'bodyParameters'.
          */
          get bodyParametersProperty() : Array<ServiceRequestParameter> {
               return this.bodyParameters;
          }

          set bodyParametersProperty(bodyParameters:Array<ServiceRequestParameter>) {
               this.bodyParameters = bodyParameters;
          }

          /**
             @property {string} content
             Request data content (plain text). This should be populated by the application. The content should be
in some well-known web format - in specific, binaries submitted should be encoded to base64 and the content
type should be set respectively by the application.
          */
          content : string;

          /**
             @property {string} content
             Request data content (plain text). This should be populated by the application. The content should be
in some well-known web format - in specific, binaries submitted should be encoded to base64 and the content
type should be set respectively by the application. The 'contentProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'content'.
          */
          get contentProperty() : string {
               return this.content;
          }

          set contentProperty(content:string) {
               this.content = content;
          }

          /**
             @property {number} contentLength
             The length in bytes of the content. This may be populated by the application, the platform
calculates this length automatically if a specific contentLength is not specified.
          */
          contentLength : number;

          /**
             @property {number} contentLength
             The length in bytes of the content. This may be populated by the application, the platform
calculates this length automatically if a specific contentLength is not specified. The 'contentLengthProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contentLength'.
          */
          get contentLengthProperty() : number {
               return this.contentLength;
          }

          set contentLengthProperty(contentLength:number) {
               this.contentLength = contentLength;
          }

          /**
             @property {string} contentType
             The request content type (MIME TYPE). This may be populated by the application, the platform
populates this field with defaults for the service.
          */
          contentType : string;

          /**
             @property {string} contentType
             The request content type (MIME TYPE). This may be populated by the application, the platform
populates this field with defaults for the service. The 'contentTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contentType'.
          */
          get contentTypeProperty() : string {
               return this.contentType;
          }

          set contentTypeProperty(contentType:string) {
               this.contentType = contentType;
          }

          /**
             @property {Adaptive.ServiceRequestParameter[]} queryParameters
             Query string parameters to be appended to the service URL when making the request. These may be applied
during GET/POST operations. No query parameters are appended if this array is null or length zero.
          */
          queryParameters : Array<ServiceRequestParameter>;

          /**
             @property {Adaptive.ServiceRequestParameter[]} queryParameters
             Query string parameters to be appended to the service URL when making the request. These may be applied
during GET/POST operations. No query parameters are appended if this array is null or length zero. The 'queryParametersProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'queryParameters'.
          */
          get queryParametersProperty() : Array<ServiceRequestParameter> {
               return this.queryParameters;
          }

          set queryParametersProperty(queryParameters:Array<ServiceRequestParameter>) {
               this.queryParameters = queryParameters;
          }

          /**
             @property {string} refererHost
             This host indicates the origin host of the request. This, could be useful in case of redirected requests.
          */
          refererHost : string;

          /**
             @property {string} refererHost
             This host indicates the origin host of the request. This, could be useful in case of redirected requests. The 'refererHostProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'refererHost'.
          */
          get refererHostProperty() : string {
               return this.refererHost;
          }

          set refererHostProperty(refererHost:string) {
               this.refererHost = refererHost;
          }

          /**
             @property {Adaptive.ServiceHeader[]} serviceHeaders
             The serviceHeaders array (name,value pairs) to be included in the request. This may be populated by the
application, the platform populates this field with defaults for the service and the previous headers.
In specific, the platform maintains request and response state automatically.
          */
          serviceHeaders : Array<ServiceHeader>;

          /**
             @property {Adaptive.ServiceHeader[]} serviceHeaders
             The serviceHeaders array (name,value pairs) to be included in the request. This may be populated by the
application, the platform populates this field with defaults for the service and the previous headers.
In specific, the platform maintains request and response state automatically. The 'serviceHeadersProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'serviceHeaders'.
          */
          get serviceHeadersProperty() : Array<ServiceHeader> {
               return this.serviceHeaders;
          }

          set serviceHeadersProperty(serviceHeaders:Array<ServiceHeader>) {
               this.serviceHeaders = serviceHeaders;
          }

          /**
             @property {Adaptive.ServiceSession} serviceSession
             Session attributes and cookies. This may be populated by the application, the platform populates
this field with defaults for the service and the previous state information. In specific, the platform
maintains request and response state automatically.
          */
          serviceSession : ServiceSession;

          /**
             @property {Adaptive.ServiceSession} serviceSession
             Session attributes and cookies. This may be populated by the application, the platform populates
this field with defaults for the service and the previous state information. In specific, the platform
maintains request and response state automatically. The 'serviceSessionProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'serviceSession'.
          */
          get serviceSessionProperty() : ServiceSession {
               return this.serviceSession;
          }

          set serviceSessionProperty(serviceSession:ServiceSession) {
               this.serviceSession = serviceSession;
          }

          /**
             @property {Adaptive.ServiceToken} serviceToken
             Token used for the creation of the request with the destination service, endpoint, function and method
identifiers. This should not be manipulated by the application directly.
          */
          serviceToken : ServiceToken;

          /**
             @property {Adaptive.ServiceToken} serviceToken
             Token used for the creation of the request with the destination service, endpoint, function and method
identifiers. This should not be manipulated by the application directly. The 'serviceTokenProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'serviceToken'.
          */
          get serviceTokenProperty() : ServiceToken {
               return this.serviceToken;
          }

          set serviceTokenProperty(serviceToken:ServiceToken) {
               this.serviceToken = serviceToken;
          }

          /**
             @property {string} userAgent
             This attribute allows for the default user-agent string to be overridden by the application.
          */
          userAgent : string;

          /**
             @property {string} userAgent
             This attribute allows for the default user-agent string to be overridden by the application. The 'userAgentProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'userAgent'.
          */
          get userAgentProperty() : string {
               return this.userAgent;
          }

          set userAgentProperty(userAgent:string) {
               this.userAgent = userAgent;
          }

          /**
             @method constructor
             Convenience constructor.

             @param {string} content      Content payload.
             @param {Adaptive.ServiceToken} serviceToken ServiceToken for the request.
             @since v2.0.6
          */
          constructor(content: string, serviceToken: ServiceToken) {
               super();
               this.content = content;
               this.serviceToken = serviceToken;
          }

          /**
             @method
             Returns the content encoding

             @return {Adaptive.IServiceContentEncoding} contentEncoding
             @since v2.0
          */
          getContentEncoding() : IServiceContentEncoding {
               return this.contentEncoding;
          }

          /**
             @method
             Set the content encoding

             @param {Adaptive.IServiceContentEncoding} contentEncoding Encoding of the binary payload - by default assumed to be UTF8.
             @since v2.0
          */
          setContentEncoding(contentEncoding: IServiceContentEncoding) {
               this.contentEncoding = contentEncoding;
          }

          /**
             @method
             Gets the body parameters of the request.

             @return {Adaptive.ServiceRequestParameter[]} ServiceRequestParameter array or null if none are specified.
             @since v2.0.6
          */
          getBodyParameters() : Array<ServiceRequestParameter> {
               return this.bodyParameters;
          }

          /**
             @method
             Sets the body parameters of the request.

             @param {Adaptive.ServiceRequestParameter[]} bodyParameters ServiceRequestParameter array or null if none are specified.
             @since v2.0.6
          */
          setBodyParameters(bodyParameters: Array<ServiceRequestParameter>) {
               this.bodyParameters = bodyParameters;
          }

          /**
             @method
             Returns the content

             @return {string} content
             @since v2.0
          */
          getContent() : string {
               return this.content;
          }

          /**
             @method
             Set the content

             @param {string} content Request/Response data content (plain text)
             @since v2.0
          */
          setContent(content: string) {
               this.content = content;
          }

          /**
             @method
             Returns the content length

             @return {number} contentLength
             @since v2.0
          */
          getContentLength() : number {
               return this.contentLength;
          }

          /**
             @method
             Set the content length

             @param {number} contentLength The length in bytes for the Content field.
             @since v2.0
          */
          setContentLength(contentLength: number) {
               this.contentLength = contentLength;
          }

          /**
             @method
             Returns the content type

             @return {string} contentType
             @since v2.0
          */
          getContentType() : string {
               return this.contentType;
          }

          /**
             @method
             Set the content type

             @param {string} contentType The request/response content type (MIME TYPE).
             @since v2.0
          */
          setContentType(contentType: string) {
               this.contentType = contentType;
          }

          /**
             @method
             Gets the query parameters of the request.

             @return {Adaptive.ServiceRequestParameter[]} ServiceRequestParameter array or null if none are specified.
             @since v2.0.6
          */
          getQueryParameters() : Array<ServiceRequestParameter> {
               return this.queryParameters;
          }

          /**
             @method
             Sets the query parameters of the request.

             @param {Adaptive.ServiceRequestParameter[]} queryParameters ServiceRequestParameter array or null if none are specified.
             @since v2.0.6
          */
          setQueryParameters(queryParameters: Array<ServiceRequestParameter>) {
               this.queryParameters = queryParameters;
          }

          /**
             @method
             Returns the referer host (origin) of the request.

             @return {string} Referer host of the request
             @since v2.1.4
          */
          getRefererHost() : string {
               return this.refererHost;
          }

          /**
             @method
             Sets the value for the referer host of the request.

             @param {string} refererHost Referer host of the request
             @since v2.1.4
          */
          setRefererHost(refererHost: string) {
               this.refererHost = refererHost;
          }

          /**
             @method
             Returns the array of ServiceHeader

             @return {Adaptive.ServiceHeader[]} serviceHeaders
             @since v2.0
          */
          getServiceHeaders() : Array<ServiceHeader> {
               return this.serviceHeaders;
          }

          /**
             @method
             Set the array of ServiceHeader

             @param {Adaptive.ServiceHeader[]} serviceHeaders The serviceHeaders array (name,value pairs) to be included on the I/O service request.
             @since v2.0
          */
          setServiceHeaders(serviceHeaders: Array<ServiceHeader>) {
               this.serviceHeaders = serviceHeaders;
          }

          /**
             @method
             Getter for service session

             @return {Adaptive.ServiceSession} The element service session
             @since v2.0
          */
          getServiceSession() : ServiceSession {
               return this.serviceSession;
          }

          /**
             @method
             Setter for service session

             @param {Adaptive.ServiceSession} serviceSession The element service session
             @since v2.0
          */
          setServiceSession(serviceSession: ServiceSession) {
               this.serviceSession = serviceSession;
          }

          /**
             @method
             Gets the ServiceToken of the request.

             @return {Adaptive.ServiceToken} ServiceToken.
             @since v2.0.6
          */
          getServiceToken() : ServiceToken {
               return this.serviceToken;
          }

          /**
             @method
             Sets the ServiceToken of the request.

             @param {Adaptive.ServiceToken} serviceToken ServiceToken to be used for the invocation.
             @since v2.0.6
          */
          setServiceToken(serviceToken: ServiceToken) {
               this.serviceToken = serviceToken;
          }

          /**
             @method
             Gets the overridden user-agent string.

             @return {string} User-agent string.
             @since v2.0.6
          */
          getUserAgent() : string {
               return this.userAgent;
          }

          /**
             @method
             Sets the user-agent to override the default user-agent string.

             @param {string} userAgent User-agent string.
             @since v2.0.6
          */
          setUserAgent(userAgent: string) {
               this.userAgent = userAgent;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ServiceRequest.
             @return {Adaptive.ServiceRequest} Wrapped object instance.
          */
          static toObject(object : any) : ServiceRequest {
               var result : ServiceRequest = new ServiceRequest(null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.userAgent = object.userAgent;
                    result.content = object.content;
                    result.contentType = object.contentType;
                    result.contentEncoding = IServiceContentEncoding.toObject(object.contentEncoding);
                    result.contentLength = object.contentLength;
                    result.serviceHeaders = ServiceHeader.toObjectArray(object.serviceHeaders);
                    result.serviceSession = ServiceSession.toObject(object.serviceSession);
                    result.queryParameters = ServiceRequestParameter.toObjectArray(object.queryParameters);
                    result.bodyParameters = ServiceRequestParameter.toObjectArray(object.bodyParameters);
                    result.serviceToken = ServiceToken.toObject(object.serviceToken);
                    result.refererHost = object.refererHost;

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ServiceRequest[].
             @return {Adaptive.ServiceRequest[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : ServiceRequest[] {
               var resultArray : Array<ServiceRequest> = new Array<ServiceRequest>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(ServiceRequest.toObject(object[i]));
                    }
               }
               return resultArray;
          }

     }
}

/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
