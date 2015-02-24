/// <reference path="BaseListener.d.ts" />
/// <reference path="Button.d.ts" />
/// <reference path="CommonUtil.d.ts" />
/// <reference path="IButtonListener.d.ts" />
/// <reference path="IButtonListenerError.d.ts" />
/// <reference path="IButtonListenerWarning.d.ts" />
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
       Interface for Managing the button  operations
       Auto-generated implementation of IButtonListener specification.
    */
    /**
       @property {Adaptive.Dictionary} registeredButtonListener
       @member Adaptive
       @private
       ButtonListener control dictionary.
    */
    var registeredButtonListener: Dictionary<IButtonListener>;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IButtonListenerError} error
    */
    function handleButtonListenerError(id: number, error: IButtonListenerError): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Button} button
    */
    function handleButtonListenerResult(id: number, button: Button): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Button} button
       @param {Adaptive.IButtonListenerWarning} warning
    */
    function handleButtonListenerWarning(id: number, button: Button, warning: IButtonListenerWarning): void;
    /**
       @class Adaptive.ButtonListener
       @extends Adaptive.BaseListener
    */
    class ButtonListener extends BaseListener implements IButtonListener {
        /**
           @private
           @property
        */
        onErrorFunction: (error: IButtonListenerError) => void;
        /**
           @private
           @property
        */
        onResultFunction: (button: Button) => void;
        /**
           @private
           @property
        */
        onWarningFunction: (button: Button, warning: IButtonListenerWarning) => void;
        /**
           @method constructor
           Constructor with anonymous handler functions for listener.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IButtonListenerError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.Button
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.Button, Adaptive.IButtonListenerWarning
        */
        constructor(onErrorFunction: (error: IButtonListenerError) => void, onResultFunction: (button: Button) => void, onWarningFunction: (button: Button, warning: IButtonListenerWarning) => void);
        /**
           @method
           No data received
           @param {Adaptive.IButtonListenerError} error error occurred
           @since v2.0
        */
        onError(error: IButtonListenerError): void;
        /**
           @method
           Called on button pressed
           @param {Adaptive.Button} button button pressed
           @since v2.0
        */
        onResult(button: Button): void;
        /**
           @method
           Data received with warning
           @param {Adaptive.Button} button button  pressed
           @param {Adaptive.IButtonListenerWarning} warning warning happened
           @since v2.0
        */
        onWarning(button: Button, warning: IButtonListenerWarning): void;
    }
}
