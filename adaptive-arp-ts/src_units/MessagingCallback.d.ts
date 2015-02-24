/// <reference path="BaseCallback.d.ts" />
/// <reference path="CommonUtil.d.ts" />
/// <reference path="IMessagingCallback.d.ts" />
/// <reference path="IMessagingCallbackError.d.ts" />
/// <reference path="IMessagingCallbackWarning.d.ts" />
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
       Interface for Managing the Messaging responses
       Auto-generated implementation of IMessagingCallback specification.
    */
    /**
       @property {Adaptive.Dictionary} registeredMessagingCallback
       @member Adaptive
       @private
       MessagingCallback control dictionary.
    */
    var registeredMessagingCallback: Dictionary<IMessagingCallback>;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IMessagingCallbackError} error
    */
    function handleMessagingCallbackError(id: number, error: IMessagingCallbackError): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {boolean} success
    */
    function handleMessagingCallbackResult(id: number, success: boolean): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {boolean} success
       @param {Adaptive.IMessagingCallbackWarning} warning
    */
    function handleMessagingCallbackWarning(id: number, success: boolean, warning: IMessagingCallbackWarning): void;
    /**
       @class Adaptive.MessagingCallback
       @extends Adaptive.BaseCallback
    */
    class MessagingCallback extends BaseCallback implements IMessagingCallback {
        /**
           @private
           @property
        */
        onErrorFunction: (error: IMessagingCallbackError) => void;
        /**
           @private
           @property
        */
        onResultFunction: (success: boolean) => void;
        /**
           @private
           @property
        */
        onWarningFunction: (success: boolean, warning: IMessagingCallbackWarning) => void;
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IMessagingCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: boolean
           @param {Function} onWarningFunction Function receiving parameters of type: boolean, Adaptive.IMessagingCallbackWarning
        */
        constructor(onErrorFunction: (error: IMessagingCallbackError) => void, onResultFunction: (success: boolean) => void, onWarningFunction: (success: boolean, warning: IMessagingCallbackWarning) => void);
        /**
           @method
           This method is called on Error
           @param {Adaptive.IMessagingCallbackError} error error returned by the platform
           @since v2.0
        */
        onError(error: IMessagingCallbackError): void;
        /**
           @method
           This method is called on Result
           @param {boolean} success success true if sent;false otherwise
           @since v2.0
        */
        onResult(success: boolean): void;
        /**
           @method
           This method is called on Warning
           @param {boolean} success success true if sent;false otherwise
           @param {Adaptive.IMessagingCallbackWarning} warning warning returned by the platform
           @since v2.0
        */
        onWarning(success: boolean, warning: IMessagingCallbackWarning): void;
    }
}
