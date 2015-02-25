/// <reference path="IServiceMethod.d.ts" />
/// <reference path="IServiceType.d.ts" />
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
       @class Adaptive.ServicePath
       Structure representing a service path for one endpoint

       @author fnva
       @since v2.0.4
       @version 1.0
    */
    class ServicePath {
        /**
           @property {Adaptive.IServiceType} type
           Service endpoint type.
        */
        type: IServiceType;
        /**
           @property {Adaptive.IServiceType} type
           Service endpoint type. The 'typeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'type'.
        */
        typeProperty: IServiceType;
        /**
           @property {Adaptive.IServiceMethod[]} methods
           The methods for calling a path.
        */
        methods: Array<IServiceMethod>;
        /**
           @property {Adaptive.IServiceMethod[]} methods
           The methods for calling a path. The 'methodsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'methods'.
        */
        methodsProperty: Array<IServiceMethod>;
        /**
           @property {string} path
           The path for the endpoint.
        */
        path: string;
        /**
           @property {string} path
           The path for the endpoint. The 'pathProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'path'.
        */
        pathProperty: string;
        /**
           @method constructor
           Constructor with parameters.

           @param {string} path    The path for the endpoint
           @param {Adaptive.IServiceMethod[]} methods The methods for calling a path
           @param {Adaptive.IServiceType} type    Protocol type.
           @since v2.0.6
        */
        constructor(path: string, methods: Array<IServiceMethod>, type: IServiceType);
        /**
           @method
           Gets the protocol for the path.

           @return {Adaptive.IServiceType} Type of protocol.
           @since v2.0.6
        */
        getType(): IServiceType;
        /**
           @method
           Sets the protocol for the path.

           @param {Adaptive.IServiceType} type Type of protocol.
           @since v2.0.6
        */
        setType(type: IServiceType): void;
        /**
           @method
           Endpoint's path methods setter

           @return {Adaptive.IServiceMethod[]} Endpoint's path methods
           @since v2.0.4
        */
        getMethods(): Array<IServiceMethod>;
        /**
           @method
           Endpoint's path methods setter

           @param {Adaptive.IServiceMethod[]} methods Endpoint's path methods
           @since v2.0.4
        */
        setMethods(methods: Array<IServiceMethod>): void;
        /**
           @method
           Endpoint's Path Getter

           @return {string} Endpoint's Path
           @since v2.0.4
        */
        getPath(): string;
        /**
           @method
           Endpoint's path setter

           @param {string} path Endpoint's path
           @since v2.0.4
        */
        setPath(path: string): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServicePath.
           @return {Adaptive.ServicePath} Wrapped object instance.
        */
        static toObject(object: any): ServicePath;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServicePath[].
           @return {Adaptive.ServicePath[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): ServicePath[];
    }
}
