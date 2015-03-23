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

///<reference path="APIRequest.ts"/>
///<reference path="APIResponse.ts"/>
///<reference path="IBaseListener.ts"/>
///<reference path="IBaseCallback.ts"/>
module Adaptive {

     /**
        @private
        @property {number} registeredCounter
        Global unique id for listeners and callbacks.
     */
     export var registeredCounter : number = 0;

     /**
        @private
        @property {string} bridgePath
        Base url used internally to POST and intercept JSON requests by the platform.
     */
     export var bridgePath : string = "https://adaptiveapp";

     /**
        @private
        @property {string} bridgeApiVersion
        The Adaptive Runtime Platform API specification version.
     */
     export var bridgeApiVersion : string = "v2.2.0";

     /**
        @class Adaptive.IDictionary
        @private
        Utility interface for Dictionary type support.
     */
     export interface IDictionary<V> {
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
     export class Dictionary<V> implements IDictionary<V>{
     
         _keys: Array<string> = new Array<string>();
         _values: Array<V> = new Array<V>();
     
         constructor(init: { key: string; value: V; }[]) {
     
             for (var x = 0; x < init.length; x++) {
                 this[init[x].key] = init[x].value;
                 this._keys.push(init[x].key);
                 this._values.push(init[x].value);
             }
         }
     
         add(key: string, value: V) {
             this[key] = value;
             this._keys.push(key);
             this._values.push(value);
         }
     
         remove(key: string) {
             var index = this._keys.indexOf(key, 0);
             this._keys.splice(index, 1);
             this._values.splice(index, 1);
     
             delete this[key];
         }
     
         removeAll() {
             this._keys = new Array<string>();
             this._values = new Array<V>();
         }
     
         keys(): string[] {
             return this._keys;
         }
     
         values(): V[] {
             return this._values;
         }
     
         containsKey(key: string) {
             if (typeof this[key] === "undefined") {
                 return false;
             }
     
             return true;
         }
     
         toLookup(): IDictionary<V> {
             return this;
         }
     }

     /**
        @private
        @param {Adaptive.APIRequest} apiRequest the request to be processed.
        @param {Adaptive.IBaseListener} listener to add or remove from the dictionary or null if removing all listeners.
        @param {Adaptive.Dictionary} listenerDictionary dictionary of listeners for the operation.
        @since v2.1.10
        Send request for methods that manage listeners.
     */
     export function postRequestListener(apiRequest : APIRequest, listener: IBaseListener, listenerDictionary: Dictionary<IBaseListener>) : void {
        apiRequest.setApiVersion(bridgeApiVersion);
        var apiResponse : APIResponse = new APIResponse("", 200, "")
         
        // Create and send JSON request.
        var xhr = new XMLHttpRequest();
        xhr.open("POST", bridgePath, false);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        if (apiRequest.getMethodName().indexOf("add") > -1) {
            // Add listener reference to local dictionary.
            listenerDictionary.add("" + listener.getId(), listener);
        }

        xhr.send(JSON.stringify(apiRequest));
        // Check response.
        if (xhr.status === 200 ) {
            if (xhr.responseText != null && xhr.responseText !== '') {
                apiResponse = APIResponse.toObject(JSON.parse(xhr.responseText));
                if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    manageRequestListener(apiRequest, listener, listenerDictionary, false);
                } else {
                    manageRequestListener(apiRequest, listener, listenerDictionary, true);
                    console.error("ERROR: "+apiResponse.getStatusCode()+" receiving response in '"+apiRequest.getBridgeType()+"."+apiRequest.getMethodName()+"' ["+apiResponse.getStatusMessage()+"].");
                }
            } else {
                manageRequestListener(apiRequest, listener, listenerDictionary, true);
                console.error("ERROR: '"+apiRequest.getBridgeType()+"."+apiRequest.getMethodName()+"' incorrect response received.");
            }
        } else {
            manageRequestListener(apiRequest, listener, listenerDictionary, true);
            console.error("ERROR: "+xhr.status+" sending '"+apiRequest.getBridgeType()+"."+apiRequest.getMethodName()+"' request.");
        }

    }

    export function manageRequestListener(apiRequest : APIRequest, listener: IBaseListener, listenerDictionary: Dictionary<IBaseListener>, isError: boolean) : void {
        if (apiRequest.getMethodName().indexOf("remove") > -1 && apiRequest.getMethodName().indexOf("Listeners") === -1) {
            listenerDictionary.remove(""+listener.getId());
        } else if (apiRequest.getMethodName().indexOf("remove") > -1 && apiRequest.getMethodName().indexOf("Listeners") > -1) {
            listenerDictionary.removeAll();
        } else if (isError && apiRequest.getMethodName().indexOf("add") > -1) {
            listenerDictionary.remove("" + listener.getId());
        }
    }

     /**
        @private
        @param {Adaptive.APIRequest} apiRequest the request to be processed.
        @param {Adaptive.IBaseCallback} callback to receive responses.
        @param {Adaptive.Dictionary} callbackDictionary dictionary of callbacks for the operation.
        @since v2.1.10
        Send request for methods that use callbacks.
     */
     export function postRequestCallback(apiRequest : APIRequest, callback: IBaseCallback, callbackDictionary: Dictionary<IBaseCallback>) : void {
        apiRequest.setApiVersion(bridgeApiVersion);
        var apiResponse : APIResponse = new APIResponse("", 200, "");
        // Create and send JSON request.
        var xhr = new XMLHttpRequest();
        xhr.open("POST", bridgePath, false);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        // Add callback reference to local dictionary.
        callbackDictionary.add(""+callback.getId(), callback);
        xhr.send(JSON.stringify(apiRequest));
        // Check response.
        if (xhr.status === 200 ) {
            if (xhr.responseText != null && xhr.responseText !== '') {
                apiResponse = APIResponse.toObject(JSON.parse(xhr.responseText));
                if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                } else {
                    // Remove callback reference from local dictionary due to invalid response.
                    callbackDictionary.remove(""+callback.getId());
                    console.error("ERROR: "+apiResponse.getStatusCode()+" receiving response in '"+apiRequest.getBridgeType()+"."+apiRequest.getMethodName()+"' ["+apiResponse.getStatusMessage()+"].");
                }
            } else {
                // Remove callback reference from local dictionary due to invalid response.
                callbackDictionary.remove(""+callback.getId());
                console.error("ERROR: '"+apiRequest.getBridgeType()+"."+apiRequest.getMethodName()+"' incorrect response received.");
            }
        } else {
            // Unknown error - remove from dictionary.
            callbackDictionary.remove(""+callback.getId());
            console.error("ERROR: "+xhr.status+" sending '"+apiRequest.getBridgeType()+"."+apiRequest.getMethodName()+"' request.");
        }
    }

     /**
        @private
        @param {Adaptive.APIRequest} apiRequest the request to be processed.
        @return {Adaptive.APIResponse} Response to the request.
        @since v2.1.10
        Send request and receives responses synchronously.
     */
     export function postRequest(apiRequest : APIRequest) : APIResponse {
        apiRequest.setApiVersion(bridgeApiVersion);
        var apiResponse : APIResponse = new APIResponse("", 200, "");
        // Create and send JSON request.
        var xhr = new XMLHttpRequest();
        xhr.open("POST", bridgePath, false);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(apiRequest));
        // Check response.
        if (xhr.status === 200 ) {
            if (xhr.responseText != null && xhr.responseText !== '') {
                apiResponse = APIResponse.toObject(JSON.parse(xhr.responseText));
                if (apiResponse != null && apiResponse.getStatusCode() !== 200) {
                    console.error("ERROR: "+apiResponse.getStatusCode()+" receiving response in '"+apiRequest.getBridgeType()+"."+apiRequest.getMethodName()+"' ["+apiResponse.getStatusMessage()+"].");
                }
            } else {
                apiResponse = new APIResponse("", 400, "");
                console.error("ERROR: '"+apiRequest.getBridgeType()+"."+apiRequest.getMethodName()+"' incorrect response received.");
            }
        } else {
            apiResponse = new APIResponse("", xhr.status, "");
            console.error("ERROR: "+xhr.status+" sending '"+apiRequest.getBridgeType()+"."+apiRequest.getMethodName()+"' request.");
        }
        return apiResponse;
    }

}
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/

