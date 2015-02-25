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
var __extends = this.__extends || function (d, b) {
    for (var p in b) { if (b.hasOwnProperty(p)) { d[p] = b[p]; } }
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="APIBean.ts"/>
///<reference path="ICapabilitiesOrientation.ts"/>
///<reference path="RotationEventState.ts"/>
var Adaptive;
(function (Adaptive) {
    /**
       @class Adaptive.RotationEvent
       @extends Adaptive.APIBean
       Object for reporting orientation change events for device and display.

       @author Carlos Lozano Diez
       @since v2.0.5
       @version 1.0
    */
    var RotationEvent = (function (_super) {
        __extends(RotationEvent, _super);
        /**
           @method constructor
           Convenience constructor.

           @param {Adaptive.ICapabilitiesOrientation} origin      Source orientation when the event was fired.
           @param {Adaptive.ICapabilitiesOrientation} destination Destination orientation when the event was fired.
           @param {Adaptive.RotationEventState} state       State of the event (WillBegin, DidFinish).
           @param {number} timestamp   Timestamp in milliseconds when the event was fired.
           @since v2.0.5
        */
        function RotationEvent(origin, destination, state, timestamp) {
            _super.call(this);
            this.origin = origin;
            this.destination = destination;
            this.state = state;
            this.timestamp = timestamp;
        }
        Object.defineProperty(RotationEvent.prototype, "destinationProperty", {
            /**
               @property {Adaptive.ICapabilitiesOrientation} destination
               The orientation we're rotating to. This is the future orientation when the state of the event is
  WillStartRotation. This will be the current orientation when the rotation is finished with the state
  DidFinishRotation. The 'destinationProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'destination'.
            */
            get: function () {
                return this.destination;
            },
            set: function (destination) {
                this.destination = destination;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RotationEvent.prototype, "originProperty", {
            /**
               @property {Adaptive.ICapabilitiesOrientation} origin
               The orientation we're rotating from. This is the current orientation when the state of the event is
  WillStartRotation. This will be the previous orientation when the rotation is finished with the state
  DidFinishRotation. The 'originProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'origin'.
            */
            get: function () {
                return this.origin;
            },
            set: function (origin) {
                this.origin = origin;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RotationEvent.prototype, "stateProperty", {
            /**
               @property {Adaptive.RotationEventState} state
               The state of the event to indicate the start of the rotation and the end of the rotation event. This allows
  for functions to be pre-emptively performed (veto change, re-layout, etc.) before rotation is effected and
  concluded. The 'stateProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'state'.
            */
            get: function () {
                return this.state;
            },
            set: function (state) {
                this.state = state;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RotationEvent.prototype, "timestampProperty", {
            /**
               @property {number} timestamp
               The timestamps in milliseconds when the event was fired. The 'timestampProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'timestamp'.
            */
            get: function () {
                return this.timestamp;
            },
            set: function (timestamp) {
                this.timestamp = timestamp;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Gets the destination orientation of the event.

           @return {Adaptive.ICapabilitiesOrientation} Destination orientation.
           @since v2.0.5
        */
        RotationEvent.prototype.getDestination = function () {
            return this.destination;
        };
        /**
           @method
           Sets the destination orientation of the event.

           @param {Adaptive.ICapabilitiesOrientation} destination Destination orientation.
           @since v2.0.5
        */
        RotationEvent.prototype.setDestination = function (destination) {
            this.destination = destination;
        };
        /**
           @method
           Get the origin orientation of the event.

           @return {Adaptive.ICapabilitiesOrientation} Origin orientation.
           @since v2.0.5
        */
        RotationEvent.prototype.getOrigin = function () {
            return this.origin;
        };
        /**
           @method
           Set the origin orientation of the event.

           @param {Adaptive.ICapabilitiesOrientation} origin Origin orientation
           @since v2.0.5
        */
        RotationEvent.prototype.setOrigin = function (origin) {
            this.origin = origin;
        };
        /**
           @method
           Gets the current state of the event.

           @return {Adaptive.RotationEventState} State of the event.
           @since v2.0.5
        */
        RotationEvent.prototype.getState = function () {
            return this.state;
        };
        /**
           @method
           Sets the current state of the event.

           @param {Adaptive.RotationEventState} state The state of the event.
           @since v2.0.5
        */
        RotationEvent.prototype.setState = function (state) {
            this.state = state;
        };
        /**
           @method
           Gets the timestamp in milliseconds of the event.

           @return {number} Timestamp of the event.
           @since v2.0.5
        */
        RotationEvent.prototype.getTimestamp = function () {
            return this.timestamp;
        };
        /**
           @method
           Sets the timestamp in milliseconds of the event.

           @param {number} timestamp Timestamp of the event.
           @since v2.0.5
        */
        RotationEvent.prototype.setTimestamp = function (timestamp) {
            this.timestamp = timestamp;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.RotationEvent.
           @return {Adaptive.RotationEvent} Wrapped object instance.
        */
        RotationEvent.toObject = function (object) {
            var result = new RotationEvent(null, null, null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.origin = Adaptive.ICapabilitiesOrientation.toObject(object.origin);
                result.destination = Adaptive.ICapabilitiesOrientation.toObject(object.destination);
                result.state = Adaptive.RotationEventState.toObject(object.state);
                result.timestamp = object.timestamp;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.RotationEvent[].
           @return {Adaptive.RotationEvent[]} Wrapped object array instance.
        */
        RotationEvent.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(RotationEvent.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return RotationEvent;
    })(Adaptive.APIBean);
    Adaptive.RotationEvent = RotationEvent;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=RotationEvent.js.map