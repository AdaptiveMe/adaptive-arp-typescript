/// <reference path="BaseListener.d.ts" />
/// <reference path="CommonUtil.d.ts" />
/// <reference path="ICapabilitiesNet.d.ts" />
/// <reference path="INetworkStatusListener.d.ts" />
/// <reference path="INetworkStatusListenerError.d.ts" />
/// <reference path="INetworkStatusListenerWarning.d.ts" />
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
       Interface for Managing the Network status listener events
       Auto-generated implementation of INetworkStatusListener specification.
    */
    /**
       @property {Adaptive.Dictionary} registeredNetworkStatusListener
       @member Adaptive
       @private
       NetworkStatusListener control dictionary.
    */
    var registeredNetworkStatusListener: Dictionary<INetworkStatusListener>;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.INetworkStatusListenerError} error
    */
    function handleNetworkStatusListenerError(id: number, error: INetworkStatusListenerError): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.ICapabilitiesNet} network
    */
    function handleNetworkStatusListenerResult(id: number, network: ICapabilitiesNet): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.ICapabilitiesNet} network
       @param {Adaptive.INetworkStatusListenerWarning} warning
    */
    function handleNetworkStatusListenerWarning(id: number, network: ICapabilitiesNet, warning: INetworkStatusListenerWarning): void;
    /**
       @class Adaptive.NetworkStatusListener
       @extends Adaptive.BaseListener
    */
    class NetworkStatusListener extends BaseListener implements INetworkStatusListener {
        /**
           @private
           @property
        */
        onErrorFunction: (error: INetworkStatusListenerError) => void;
        /**
           @private
           @property
        */
        onResultFunction: (network: ICapabilitiesNet) => void;
        /**
           @private
           @property
        */
        onWarningFunction: (network: ICapabilitiesNet, warning: INetworkStatusListenerWarning) => void;
        /**
           @method constructor
           Constructor with anonymous handler functions for listener.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.INetworkStatusListenerError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.ICapabilitiesNet
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.ICapabilitiesNet, Adaptive.INetworkStatusListenerWarning
        */
        constructor(onErrorFunction: (error: INetworkStatusListenerError) => void, onResultFunction: (network: ICapabilitiesNet) => void, onWarningFunction: (network: ICapabilitiesNet, warning: INetworkStatusListenerWarning) => void);
        /**
           @method
           No data received - error condition, not authorized or hardware not available.
           @param {Adaptive.INetworkStatusListenerError} error error Type of error encountered during reading.
           @since v2.0
        */
        onError(error: INetworkStatusListenerError): void;
        /**
           @method
           Called when network connection changes somehow.
           @param {Adaptive.ICapabilitiesNet} network network Change to this network.
           @since v2.0
        */
        onResult(network: ICapabilitiesNet): void;
        /**
           @method
           Status received with warning
           @param {Adaptive.ICapabilitiesNet} network network Change to this network.
           @param {Adaptive.INetworkStatusListenerWarning} warning warning Type of warning encountered during reading.
           @since v2.0
        */
        onWarning(network: ICapabilitiesNet, warning: INetworkStatusListenerWarning): void;
    }
}
