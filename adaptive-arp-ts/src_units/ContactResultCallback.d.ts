/// <reference path="BaseCallback.d.ts" />
/// <reference path="CommonUtil.d.ts" />
/// <reference path="Contact.d.ts" />
/// <reference path="IContactResultCallback.d.ts" />
/// <reference path="IContactResultCallbackError.d.ts" />
/// <reference path="IContactResultCallbackWarning.d.ts" />
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
       Interface for Managing the Contact operations
       Auto-generated implementation of IContactResultCallback specification.
    */
    /**
       @property {Adaptive.Dictionary} registeredContactResultCallback
       @member Adaptive
       @private
       ContactResultCallback control dictionary.
    */
    var registeredContactResultCallback: Dictionary<IContactResultCallback>;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IContactResultCallbackError} error
    */
    function handleContactResultCallbackError(id: number, error: IContactResultCallbackError): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Contact[]} contacts
    */
    function handleContactResultCallbackResult(id: number, contacts: Array<Contact>): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Contact[]} contacts
       @param {Adaptive.IContactResultCallbackWarning} warning
    */
    function handleContactResultCallbackWarning(id: number, contacts: Array<Contact>, warning: IContactResultCallbackWarning): void;
    /**
       @class Adaptive.ContactResultCallback
       @extends Adaptive.BaseCallback
    */
    class ContactResultCallback extends BaseCallback implements IContactResultCallback {
        /**
           @private
           @property
        */
        onErrorFunction: (error: IContactResultCallbackError) => void;
        /**
           @private
           @property
        */
        onResultFunction: (contacts: Array<Contact>) => void;
        /**
           @private
           @property
        */
        onWarningFunction: (contacts: Array<Contact>, warning: IContactResultCallbackWarning) => void;
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IContactResultCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.Contact[]
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.Contact[], Adaptive.IContactResultCallbackWarning
        */
        constructor(onErrorFunction: (error: IContactResultCallbackError) => void, onResultFunction: (contacts: Array<Contact>) => void, onWarningFunction: (contacts: Array<Contact>, warning: IContactResultCallbackWarning) => void);
        /**
           @method
           This method is called on Error
           @param {Adaptive.IContactResultCallbackError} error error returned by the platform
           @since v2.0
        */
        onError(error: IContactResultCallbackError): void;
        /**
           @method
           This method is called on Result
           @param {Adaptive.Contact[]} contacts contacts returned by the platform
           @since v2.0
        */
        onResult(contacts: Array<Contact>): void;
        /**
           @method
           This method is called on Warning
           @param {Adaptive.Contact[]} contacts contacts returned by the platform
           @param {Adaptive.IContactResultCallbackWarning} warning warning  returned by the platform
           @since v2.0
        */
        onWarning(contacts: Array<Contact>, warning: IContactResultCallbackWarning): void;
    }
}
