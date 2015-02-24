/// <reference path="APIRequest.d.ts" />
/// <reference path="APIResponse.d.ts" />
/// <reference path="BaseSystemBridge.d.ts" />
/// <reference path="ButtonListener.d.ts" />
/// <reference path="CommonUtil.d.ts" />
/// <reference path="DeviceInfo.d.ts" />
/// <reference path="DeviceOrientationListener.d.ts" />
/// <reference path="IAdaptiveRPGroup.d.ts" />
/// <reference path="IBaseSystem.d.ts" />
/// <reference path="IButtonListener.d.ts" />
/// <reference path="ICapabilitiesOrientation.d.ts" />
/// <reference path="IDevice.d.ts" />
/// <reference path="IDeviceOrientationListener.d.ts" />
/// <reference path="Locale.d.ts" />
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
       @class Adaptive.DeviceBridge
       @extends Adaptive.BaseSystemBridge
       Interface for Managing the Device operations

       @author Francisco Javier Martin Bueno
       @since v2.0
    */
    class DeviceBridge extends BaseSystemBridge implements IDevice {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Register a new listener that will receive button events.

           @param {Adaptive.ButtonListener} listener listener to be registered.
           @since v2.0
        */
        addButtonListener(listener: IButtonListener): void;
        /**
           @method
           Add a listener to start receiving device orientation change events.

           @param {Adaptive.DeviceOrientationListener} listener listener Listener to add to receive orientation change events.
           @since v2.0.5
        */
        addDeviceOrientationListener(listener: IDeviceOrientationListener): void;
        /**
           @method
           Returns the device information for the current device executing the runtime.

           @return {Adaptive.DeviceInfo} DeviceInfo for the current device.
           @since v2.0
        */
        getDeviceInfo(): DeviceInfo;
        /**
           @method
           Gets the current Locale for the device.

           @return {Adaptive.Locale} The current Locale information.
           @since v2.0
        */
        getLocaleCurrent(): Locale;
        /**
           @method
           Returns the current orientation of the device. Please note that this may be different from the orientation
of the display. For display orientation, use the IDisplay APIs.

           @return {Adaptive.ICapabilitiesOrientation} The current orientation of the device.
           @since v2.0.5
        */
        getOrientationCurrent(): ICapabilitiesOrientation;
        /**
           @method
           De-registers an existing listener from receiving button events.

           @param {Adaptive.ButtonListener} listener listener to be removed.
           @since v2.0
        */
        removeButtonListener(listener: IButtonListener): void;
        /**
           @method
           Removed all existing listeners from receiving button events.

           @since v2.0
        */
        removeButtonListeners(): void;
        /**
           @method
           Remove a listener to stop receiving device orientation change events.

           @param {Adaptive.DeviceOrientationListener} listener listener Listener to remove from receiving orientation change events.
           @since v2.0.5
        */
        removeDeviceOrientationListener(listener: IDeviceOrientationListener): void;
        /**
           @method
           Remove all listeners receiving device orientation events.

           @since v2.0.5
        */
        removeDeviceOrientationListeners(): void;
    }
}
