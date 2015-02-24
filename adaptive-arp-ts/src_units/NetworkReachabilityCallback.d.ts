/// <reference path="BaseCallback.d.ts" />
/// <reference path="CommonUtil.d.ts" />
/// <reference path="INetworkReachabilityCallback.d.ts" />
/// <reference path="INetworkReachabilityCallbackError.d.ts" />
/// <reference path="INetworkReachabilityCallbackWarning.d.ts" />
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
       Interface for Managing the Network reachability callback result
       Auto-generated implementation of INetworkReachabilityCallback specification.
    */
    /**
       @property {Adaptive.Dictionary} registeredNetworkReachabilityCallback
       @member Adaptive
       @private
       NetworkReachabilityCallback control dictionary.
    */
    var registeredNetworkReachabilityCallback: Dictionary<INetworkReachabilityCallback>;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.INetworkReachabilityCallbackError} error
    */
    function handleNetworkReachabilityCallbackError(id: number, error: INetworkReachabilityCallbackError): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {boolean} reachable
    */
    function handleNetworkReachabilityCallbackResult(id: number, reachable: boolean): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {boolean} reachable
       @param {Adaptive.INetworkReachabilityCallbackWarning} warning
    */
    function handleNetworkReachabilityCallbackWarning(id: number, reachable: boolean, warning: INetworkReachabilityCallbackWarning): void;
    /**
       @class Adaptive.NetworkReachabilityCallback
       @extends Adaptive.BaseCallback
    */
    class NetworkReachabilityCallback extends BaseCallback implements INetworkReachabilityCallback {
        /**
           @private
           @property
        */
        onErrorFunction: (error: INetworkReachabilityCallbackError) => void;
        /**
           @private
           @property
        */
        onResultFunction: (reachable: boolean) => void;
        /**
           @private
           @property
        */
        onWarningFunction: (reachable: boolean, warning: INetworkReachabilityCallbackWarning) => void;
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.INetworkReachabilityCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: boolean
           @param {Function} onWarningFunction Function receiving parameters of type: boolean, Adaptive.INetworkReachabilityCallbackWarning
        */
        constructor(onErrorFunction: (error: INetworkReachabilityCallbackError) => void, onResultFunction: (reachable: boolean) => void, onWarningFunction: (reachable: boolean, warning: INetworkReachabilityCallbackWarning) => void);
        /**
           @method
           No data received - error condition, not authorized .
           @param {Adaptive.INetworkReachabilityCallbackError} error error Error value
           @since v2.0
        */
        onError(error: INetworkReachabilityCallbackError): void;
        /**
           @method
           Correct data received.
           @param {boolean} reachable reachable Indicates if the host is reachable
           @since v2.0
        */
        onResult(reachable: boolean): void;
        /**
           @method
           Data received with warning - ie Found entries with existing key and values have been overriden
           @param {boolean} reachable reachable Indicates if the host is reachable
           @param {Adaptive.INetworkReachabilityCallbackWarning} warning warning   Warning value
           @since v2.0
        */
        onWarning(reachable: boolean, warning: INetworkReachabilityCallbackWarning): void;
    }
}
