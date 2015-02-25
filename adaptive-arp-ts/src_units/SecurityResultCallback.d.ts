/// <reference path="BaseCallback.d.ts" />
/// <reference path="CommonUtil.d.ts" />
/// <reference path="ISecurityResultCallback.d.ts" />
/// <reference path="ISecurityResultCallbackError.d.ts" />
/// <reference path="ISecurityResultCallbackWarning.d.ts" />
/// <reference path="SecureKeyPair.d.ts" />
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
       Interface for Managing the Security result callback
       Auto-generated implementation of ISecurityResultCallback specification.
    */
    /**
       @property {Adaptive.Dictionary} registeredSecurityResultCallback
       @member Adaptive
       @private
       SecurityResultCallback control dictionary.
    */
    var registeredSecurityResultCallback: Dictionary<ISecurityResultCallback>;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.ISecurityResultCallbackError} error
    */
    function handleSecurityResultCallbackError(id: number, error: ISecurityResultCallbackError): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.SecureKeyPair[]} keyValues
    */
    function handleSecurityResultCallbackResult(id: number, keyValues: Array<SecureKeyPair>): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.SecureKeyPair[]} keyValues
       @param {Adaptive.ISecurityResultCallbackWarning} warning
    */
    function handleSecurityResultCallbackWarning(id: number, keyValues: Array<SecureKeyPair>, warning: ISecurityResultCallbackWarning): void;
    /**
       @class Adaptive.SecurityResultCallback
       @extends Adaptive.BaseCallback
    */
    class SecurityResultCallback extends BaseCallback implements ISecurityResultCallback {
        /**
           @private
           @property
        */
        onErrorFunction: (error: ISecurityResultCallbackError) => void;
        /**
           @private
           @property
        */
        onResultFunction: (keyValues: Array<SecureKeyPair>) => void;
        /**
           @private
           @property
        */
        onWarningFunction: (keyValues: Array<SecureKeyPair>, warning: ISecurityResultCallbackWarning) => void;
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.ISecurityResultCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.SecureKeyPair[]
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.SecureKeyPair[], Adaptive.ISecurityResultCallbackWarning
        */
        constructor(onErrorFunction: (error: ISecurityResultCallbackError) => void, onResultFunction: (keyValues: Array<SecureKeyPair>) => void, onWarningFunction: (keyValues: Array<SecureKeyPair>, warning: ISecurityResultCallbackWarning) => void);
        /**
           @method
           No data received - error condition, not authorized .
           @param {Adaptive.ISecurityResultCallbackError} error error Error values
           @since v2.0
        */
        onError(error: ISecurityResultCallbackError): void;
        /**
           @method
           Correct data received.
           @param {Adaptive.SecureKeyPair[]} keyValues keyValues key and values
           @since v2.0
        */
        onResult(keyValues: Array<SecureKeyPair>): void;
        /**
           @method
           Data received with warning - ie Found entries with existing key and values have been overriden
           @param {Adaptive.SecureKeyPair[]} keyValues keyValues key and values
           @param {Adaptive.ISecurityResultCallbackWarning} warning warning   Warning values
           @since v2.0
        */
        onWarning(keyValues: Array<SecureKeyPair>, warning: ISecurityResultCallbackWarning): void;
    }
}
