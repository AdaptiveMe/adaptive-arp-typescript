/// <reference path="APIRequest.d.ts" />
/// <reference path="APIResponse.d.ts" />
/// <reference path="IBaseListener.d.ts" />
/// <reference path="IBaseCallback.d.ts" />
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
       @private
       @property {number} registeredCounter
       Global unique id for listeners and callbacks.
    */
    var registeredCounter: number;
    /**
       @private
       @property {string} bridgePath
       Base url used internally to POST and intercept JSON requests by the platform.
    */
    var bridgePath: string;
    /**
       @private
       @property {string} bridgeApiVersion
       The Adaptive Runtime Platform API specification version.
    */
    var bridgeApiVersion: string;
    /**
       @class Adaptive.IDictionary
       @private
       Utility interface for Dictionary type support.
    */
    interface IDictionary<V> {
        add(key: string, value: V): void;
        remove(key: string): void;
        containsKey(key: string): boolean;
        keys(): string[];
        values(): V[];
    }
    /**
       @private
       @class Adaptive.Dictionary
       Utility class for Dictionary type support.
    */
    class Dictionary<V> implements IDictionary<V> {
        _keys: Array<string>;
        _values: Array<V>;
        constructor(init: {
            key: string;
            value: V;
        }[]);
        add(key: string, value: V): void;
        remove(key: string): void;
        removeAll(): void;
        keys(): string[];
        values(): V[];
        containsKey(key: string): boolean;
        toLookup(): IDictionary<V>;
    }
    /**
       @private
       @param {Adaptive.APIRequest} apiRequest the request to be processed.
       @param {Adaptive.IBaseListener} listener to add or remove from the dictionary or null if removing all listeners.
       @param {Adaptive.Dictionary} listenerDictionary dictionary of listeners for the operation.
       @since v2.1.10
       Send request for methods that manage listeners.
    */
    function postRequestListener(apiRequest: APIRequest, listener: IBaseListener, listenerDictionary: Dictionary<IBaseListener>): void;
    function manageRequestListener(apiRequest: APIRequest, listener: IBaseListener, listenerDictionary: Dictionary<IBaseListener>, isError: boolean): void;
    /**
       @private
       @param {Adaptive.APIRequest} apiRequest the request to be processed.
       @param {Adaptive.IBaseCallback} callback to receive responses.
       @param {Adaptive.Dictionary} callbackDictionary dictionary of callbacks for the operation.
       @since v2.1.10
       Send request for methods that use callbacks.
    */
    function postRequestCallback(apiRequest: APIRequest, callback: IBaseCallback, callbackDictionary: Dictionary<IBaseCallback>): void;
    /**
       @private
       @param {Adaptive.APIRequest} apiRequest the request to be processed.
       @return {Adaptive.APIResponse} Response to the request.
       @since v2.1.10
       Send request and receives responses synchronously.
    */
    function postRequest(apiRequest: APIRequest): APIResponse;
}
