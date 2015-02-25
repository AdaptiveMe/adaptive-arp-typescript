/// <reference path="APIRequest.d.ts" />
/// <reference path="APIResponse.d.ts" />
/// <reference path="BaseSecurityBridge.d.ts" />
/// <reference path="CommonUtil.d.ts" />
/// <reference path="IAdaptiveRPGroup.d.ts" />
/// <reference path="IBaseSecurity.d.ts" />
/// <reference path="ISecurity.d.ts" />
/// <reference path="ISecurityResultCallback.d.ts" />
/// <reference path="SecureKeyPair.d.ts" />
/// <reference path="SecurityResultCallback.d.ts" />
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
       @class Adaptive.SecurityBridge
       @extends Adaptive.BaseSecurityBridge
       Interface for Managing the Security operations

       @author Aryslan
       @since v2.0
    */
    class SecurityBridge extends BaseSecurityBridge implements ISecurity {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Deletes from the device internal storage the entry/entries containing the specified key names.

           @param {string[]} keys keys             Array with the key names to delete.
           @param {string} publicAccessName publicAccessName The name of the shared internal storage object (if needed).
           @param {Adaptive.SecurityResultCallback} callback callback         callback to be executed upon function result.
           @since v2.0
        */
        deleteSecureKeyValuePairs(keys: Array<string>, publicAccessName: string, callback: ISecurityResultCallback): void;
        /**
           @method
           Retrieves from the device internal storage the entry/entries containing the specified key names.

           @param {string[]} keys keys             Array with the key names to retrieve.
           @param {string} publicAccessName publicAccessName The name of the shared internal storage object (if needed).
           @param {Adaptive.SecurityResultCallback} callback callback         callback to be executed upon function result.
           @since v2.0
        */
        getSecureKeyValuePairs(keys: Array<string>, publicAccessName: string, callback: ISecurityResultCallback): void;
        /**
           @method
           Returns if the device has been modified in anyhow

           @return {boolean} true if the device has been modified; false otherwise
           @since v2.0
        */
        isDeviceModified(): boolean;
        /**
           @method
           Stores in the device internal storage the specified item/s.

           @param {Adaptive.SecureKeyPair[]} keyValues keyValues        Array containing the items to store on the device internal memory.
           @param {string} publicAccessName publicAccessName The name of the shared internal storage object (if needed).
           @param {Adaptive.SecurityResultCallback} callback callback         callback to be executed upon function result.
           @since v2.0
        */
        setSecureKeyValuePairs(keyValues: Array<SecureKeyPair>, publicAccessName: string, callback: ISecurityResultCallback): void;
    }
}
