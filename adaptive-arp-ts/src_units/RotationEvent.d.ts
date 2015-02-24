/// <reference path="APIBean.d.ts" />
/// <reference path="ICapabilitiesOrientation.d.ts" />
/// <reference path="RotationEventState.d.ts" />
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
       @class Adaptive.RotationEvent
       @extends Adaptive.APIBean
       Object for reporting orientation change events for device and display.

       @author Carlos Lozano Diez
       @since v2.0.5
       @version 1.0
    */
    class RotationEvent extends APIBean {
        /**
           @property {Adaptive.ICapabilitiesOrientation} destination
           The orientation we're rotating to. This is the future orientation when the state of the event is
WillStartRotation. This will be the current orientation when the rotation is finished with the state
DidFinishRotation.
        */
        destination: ICapabilitiesOrientation;
        /**
           @property {Adaptive.ICapabilitiesOrientation} destination
           The orientation we're rotating to. This is the future orientation when the state of the event is
WillStartRotation. This will be the current orientation when the rotation is finished with the state
DidFinishRotation. The 'destinationProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'destination'.
        */
        destinationProperty: ICapabilitiesOrientation;
        /**
           @property {Adaptive.ICapabilitiesOrientation} origin
           The orientation we're rotating from. This is the current orientation when the state of the event is
WillStartRotation. This will be the previous orientation when the rotation is finished with the state
DidFinishRotation.
        */
        origin: ICapabilitiesOrientation;
        /**
           @property {Adaptive.ICapabilitiesOrientation} origin
           The orientation we're rotating from. This is the current orientation when the state of the event is
WillStartRotation. This will be the previous orientation when the rotation is finished with the state
DidFinishRotation. The 'originProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'origin'.
        */
        originProperty: ICapabilitiesOrientation;
        /**
           @property {Adaptive.RotationEventState} state
           The state of the event to indicate the start of the rotation and the end of the rotation event. This allows
for functions to be pre-emptively performed (veto change, re-layout, etc.) before rotation is effected and
concluded.
        */
        state: RotationEventState;
        /**
           @property {Adaptive.RotationEventState} state
           The state of the event to indicate the start of the rotation and the end of the rotation event. This allows
for functions to be pre-emptively performed (veto change, re-layout, etc.) before rotation is effected and
concluded. The 'stateProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'state'.
        */
        stateProperty: RotationEventState;
        /**
           @property {number} timestamp
           The timestamps in milliseconds when the event was fired.
        */
        timestamp: number;
        /**
           @property {number} timestamp
           The timestamps in milliseconds when the event was fired. The 'timestampProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'timestamp'.
        */
        timestampProperty: number;
        /**
           @method constructor
           Convenience constructor.

           @param {Adaptive.ICapabilitiesOrientation} origin      Source orientation when the event was fired.
           @param {Adaptive.ICapabilitiesOrientation} destination Destination orientation when the event was fired.
           @param {Adaptive.RotationEventState} state       State of the event (WillBegin, DidFinish).
           @param {number} timestamp   Timestamp in milliseconds when the event was fired.
           @since v2.0.5
        */
        constructor(origin: ICapabilitiesOrientation, destination: ICapabilitiesOrientation, state: RotationEventState, timestamp: number);
        /**
           @method
           Gets the destination orientation of the event.

           @return {Adaptive.ICapabilitiesOrientation} Destination orientation.
           @since v2.0.5
        */
        getDestination(): ICapabilitiesOrientation;
        /**
           @method
           Sets the destination orientation of the event.

           @param {Adaptive.ICapabilitiesOrientation} destination Destination orientation.
           @since v2.0.5
        */
        setDestination(destination: ICapabilitiesOrientation): void;
        /**
           @method
           Get the origin orientation of the event.

           @return {Adaptive.ICapabilitiesOrientation} Origin orientation.
           @since v2.0.5
        */
        getOrigin(): ICapabilitiesOrientation;
        /**
           @method
           Set the origin orientation of the event.

           @param {Adaptive.ICapabilitiesOrientation} origin Origin orientation
           @since v2.0.5
        */
        setOrigin(origin: ICapabilitiesOrientation): void;
        /**
           @method
           Gets the current state of the event.

           @return {Adaptive.RotationEventState} State of the event.
           @since v2.0.5
        */
        getState(): RotationEventState;
        /**
           @method
           Sets the current state of the event.

           @param {Adaptive.RotationEventState} state The state of the event.
           @since v2.0.5
        */
        setState(state: RotationEventState): void;
        /**
           @method
           Gets the timestamp in milliseconds of the event.

           @return {number} Timestamp of the event.
           @since v2.0.5
        */
        getTimestamp(): number;
        /**
           @method
           Sets the timestamp in milliseconds of the event.

           @param {number} timestamp Timestamp of the event.
           @since v2.0.5
        */
        setTimestamp(timestamp: number): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.RotationEvent.
           @return {Adaptive.RotationEvent} Wrapped object instance.
        */
        static toObject(object: any): RotationEvent;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.RotationEvent[].
           @return {Adaptive.RotationEvent[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): RotationEvent[];
    }
}
