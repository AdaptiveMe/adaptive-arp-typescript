/// <reference path="BaseCallback.d.ts" />
/// <reference path="CommonUtil.d.ts" />
/// <reference path="IServiceResultCallback.d.ts" />
/// <reference path="IServiceResultCallbackError.d.ts" />
/// <reference path="IServiceResultCallbackWarning.d.ts" />
/// <reference path="ServiceResponse.d.ts" />
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
       Interface for Managing the Services operations
       Auto-generated implementation of IServiceResultCallback specification.
    */
    /**
       @property {Adaptive.Dictionary} registeredServiceResultCallback
       @member Adaptive
       @private
       ServiceResultCallback control dictionary.
    */
    var registeredServiceResultCallback: Dictionary<IServiceResultCallback>;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IServiceResultCallbackError} error
    */
    function handleServiceResultCallbackError(id: number, error: IServiceResultCallbackError): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.ServiceResponse} response
    */
    function handleServiceResultCallbackResult(id: number, response: ServiceResponse): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.ServiceResponse} response
       @param {Adaptive.IServiceResultCallbackWarning} warning
    */
    function handleServiceResultCallbackWarning(id: number, response: ServiceResponse, warning: IServiceResultCallbackWarning): void;
    /**
       @class Adaptive.ServiceResultCallback
       @extends Adaptive.BaseCallback
    */
    class ServiceResultCallback extends BaseCallback implements IServiceResultCallback {
        /**
           @private
           @property
        */
        onErrorFunction: (error: IServiceResultCallbackError) => void;
        /**
           @private
           @property
        */
        onResultFunction: (response: ServiceResponse) => void;
        /**
           @private
           @property
        */
        onWarningFunction: (response: ServiceResponse, warning: IServiceResultCallbackWarning) => void;
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IServiceResultCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.ServiceResponse
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.ServiceResponse, Adaptive.IServiceResultCallbackWarning
        */
        constructor(onErrorFunction: (error: IServiceResultCallbackError) => void, onResultFunction: (response: ServiceResponse) => void, onWarningFunction: (response: ServiceResponse, warning: IServiceResultCallbackWarning) => void);
        /**
           @method
           This method is called on Error
           @param {Adaptive.IServiceResultCallbackError} error error returned by the platform
           @since v2.0
        */
        onError(error: IServiceResultCallbackError): void;
        /**
           @method
           This method is called on Result
           @param {Adaptive.ServiceResponse} response response data
           @since v2.0
        */
        onResult(response: ServiceResponse): void;
        /**
           @method
           This method is called on Warning
           @param {Adaptive.ServiceResponse} response response data
           @param {Adaptive.IServiceResultCallbackWarning} warning warning  returned by the platform
           @since v2.0
        */
        onWarning(response: ServiceResponse, warning: IServiceResultCallbackWarning): void;
    }
}
