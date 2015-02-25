/// <reference path="IServiceCertificateValidation.d.ts" />
/// <reference path="ServicePath.d.ts" />
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
       @class Adaptive.ServiceEndpoint
       Structure representing a remote or local service access end-point.

       @author Aryslan
       @since v2.0
       @version 1.0
    */
    class ServiceEndpoint {
        /**
           @property {Adaptive.IServiceCertificateValidation} validationType
           Type of validation to be performed for SSL hosts.
        */
        validationType: IServiceCertificateValidation;
        /**
           @property {Adaptive.IServiceCertificateValidation} validationType
           Type of validation to be performed for SSL hosts. The 'validationTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'validationType'.
        */
        validationTypeProperty: IServiceCertificateValidation;
        /**
           @property {string} hostURI
           The remote service hostURI URI (alias or IP) composed of scheme://hostURI:port (http://hostURI:8080).
        */
        hostURI: string;
        /**
           @property {string} hostURI
           The remote service hostURI URI (alias or IP) composed of scheme://hostURI:port (http://hostURI:8080). The 'hostURIProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'hostURI'.
        */
        hostURIProperty: string;
        /**
           @property {Adaptive.ServicePath[]} paths
           The remote service paths (to be added to the hostURI and port url).
        */
        paths: Array<ServicePath>;
        /**
           @property {Adaptive.ServicePath[]} paths
           The remote service paths (to be added to the hostURI and port url). The 'pathsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'paths'.
        */
        pathsProperty: Array<ServicePath>;
        /**
           @method constructor
           Constructor with parameters

           @param {string} hostURI Remote service hostURI
           @param {Adaptive.ServicePath[]} paths   Remote service Paths
           @since v2.0.6
        */
        constructor(hostURI: string, paths: Array<ServicePath>);
        /**
           @method
           Gets the validation type for the certificate of a SSL host.

           @return {Adaptive.IServiceCertificateValidation} Type of validation.
           @since v2.0.6
        */
        getValidationType(): IServiceCertificateValidation;
        /**
           @method
           Sets the validation type for the certificate of a SSL host.

           @param {Adaptive.IServiceCertificateValidation} validationType Type of validation.
           @since v2.0.6
        */
        setValidationType(validationType: IServiceCertificateValidation): void;
        /**
           @method
           Returns the Remote service hostURI

           @return {string} Remote service hostURI
           @since v2.0
        */
        getHostURI(): string;
        /**
           @method
           Set the Remote service hostURI

           @param {string} hostURI Remote service hostURI
           @since v2.0
        */
        setHostURI(hostURI: string): void;
        /**
           @method
           Returns the Remote service Paths

           @return {Adaptive.ServicePath[]} Remote service Paths
           @since v2.0
        */
        getPaths(): Array<ServicePath>;
        /**
           @method
           Set the Remote service Paths

           @param {Adaptive.ServicePath[]} paths Remote service Paths
           @since v2.0
        */
        setPaths(paths: Array<ServicePath>): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceEndpoint.
           @return {Adaptive.ServiceEndpoint} Wrapped object instance.
        */
        static toObject(object: any): ServiceEndpoint;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceEndpoint[].
           @return {Adaptive.ServiceEndpoint[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): ServiceEndpoint[];
    }
}
