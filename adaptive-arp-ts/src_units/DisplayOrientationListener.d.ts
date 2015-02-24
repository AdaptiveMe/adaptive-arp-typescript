/// <reference path="BaseListener.d.ts" />
/// <reference path="CommonUtil.d.ts" />
/// <reference path="IDisplayOrientationListener.d.ts" />
/// <reference path="IDisplayOrientationListenerError.d.ts" />
/// <reference path="IDisplayOrientationListenerWarning.d.ts" />
/// <reference path="RotationEvent.d.ts" />
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
       Interface for handling display orientation change events.
       Auto-generated implementation of IDisplayOrientationListener specification.
    */
    /**
       @property {Adaptive.Dictionary} registeredDisplayOrientationListener
       @member Adaptive
       @private
       DisplayOrientationListener control dictionary.
    */
    var registeredDisplayOrientationListener: Dictionary<IDisplayOrientationListener>;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IDisplayOrientationListenerError} error
    */
    function handleDisplayOrientationListenerError(id: number, error: IDisplayOrientationListenerError): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.RotationEvent} rotationEvent
    */
    function handleDisplayOrientationListenerResult(id: number, rotationEvent: RotationEvent): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.RotationEvent} rotationEvent
       @param {Adaptive.IDisplayOrientationListenerWarning} warning
    */
    function handleDisplayOrientationListenerWarning(id: number, rotationEvent: RotationEvent, warning: IDisplayOrientationListenerWarning): void;
    /**
       @class Adaptive.DisplayOrientationListener
       @extends Adaptive.BaseListener
    */
    class DisplayOrientationListener extends BaseListener implements IDisplayOrientationListener {
        /**
           @private
           @property
        */
        onErrorFunction: (error: IDisplayOrientationListenerError) => void;
        /**
           @private
           @property
        */
        onResultFunction: (rotationEvent: RotationEvent) => void;
        /**
           @private
           @property
        */
        onWarningFunction: (rotationEvent: RotationEvent, warning: IDisplayOrientationListenerWarning) => void;
        /**
           @method constructor
           Constructor with anonymous handler functions for listener.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IDisplayOrientationListenerError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.RotationEvent
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.RotationEvent, Adaptive.IDisplayOrientationListenerWarning
        */
        constructor(onErrorFunction: (error: IDisplayOrientationListenerError) => void, onResultFunction: (rotationEvent: RotationEvent) => void, onWarningFunction: (rotationEvent: RotationEvent, warning: IDisplayOrientationListenerWarning) => void);
        /**
           @method
           Although extremely unlikely, this event will be fired if something beyond the control of the
platform impedes the rotation of the display.
           @param {Adaptive.IDisplayOrientationListenerError} error error The error condition... generally unknown as it is unexpected!
           @since v2.0.5
        */
        onError(error: IDisplayOrientationListenerError): void;
        /**
           @method
           Event fired with the successful start and finish of a rotation.
           @param {Adaptive.RotationEvent} rotationEvent rotationEvent RotationEvent containing origin, destination and state of the event.
           @since v2.0.5
        */
        onResult(rotationEvent: RotationEvent): void;
        /**
           @method
           Event fired with a warning when the rotation is aborted. In specific, this
event may be fired if the application vetoes display rotation before rotation is completed.
           @param {Adaptive.RotationEvent} rotationEvent rotationEvent   RotationEvent containing origin, destination and state of the event.
           @param {Adaptive.IDisplayOrientationListenerWarning} warning warning Type of condition that aborted rotation execution.
           @since v2.0.5
        */
        onWarning(rotationEvent: RotationEvent, warning: IDisplayOrientationListenerWarning): void;
    }
}
