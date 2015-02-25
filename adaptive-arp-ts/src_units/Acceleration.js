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
var Adaptive;
(function (Adaptive) {
    /**
       @class Adaptive.Acceleration
       @extends Adaptive.APIBean
       Structure representing the data of a single acceleration reading.

       @author Carlos Lozano Diez
       @since v2.0
       @version 1.0
    */
    var Acceleration = (function (_super) {
        __extends(Acceleration, _super);
        /**
           @method constructor
           Constructor with fields

           @param {number} x         X Coordinate
           @param {number} y         Y Coordinate
           @param {number} z         Z Coordinate
           @param {number} timestamp Timestamp
           @since v2.0
        */
        function Acceleration(x, y, z, timestamp) {
            _super.call(this);
            this.x = x;
            this.y = y;
            this.z = z;
            this.timestamp = timestamp;
        }
        Object.defineProperty(Acceleration.prototype, "timestampProperty", {
            /**
               @property {number} timestamp
               Timestamp of the acceleration reading. The 'timestampProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'timestamp'.
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
        Object.defineProperty(Acceleration.prototype, "xProperty", {
            /**
               @property {number} x
               X-axis component of the acceleration. The 'xProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'x'.
            */
            get: function () {
                return this.x;
            },
            set: function (x) {
                this.x = x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Acceleration.prototype, "yProperty", {
            /**
               @property {number} y
               Y-axis component of the acceleration. The 'yProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'y'.
            */
            get: function () {
                return this.y;
            },
            set: function (y) {
                this.y = y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Acceleration.prototype, "zProperty", {
            /**
               @property {number} z
               Z-axis component of the acceleration. The 'zProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'z'.
            */
            get: function () {
                return this.z;
            },
            set: function (z) {
                this.z = z;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Timestamp Getter

           @return {number} Timestamp
           @since v2.0
        */
        Acceleration.prototype.getTimestamp = function () {
            return this.timestamp;
        };
        /**
           @method
           Timestamp Setter

           @param {number} timestamp Timestamp
           @since v2.0
        */
        Acceleration.prototype.setTimestamp = function (timestamp) {
            this.timestamp = timestamp;
        };
        /**
           @method
           X Coordinate Getter

           @return {number} X-axis component of the acceleration.
           @since v2.0
        */
        Acceleration.prototype.getX = function () {
            return this.x;
        };
        /**
           @method
           X Coordinate Setter

           @param {number} x X-axis component of the acceleration.
           @since v2.0
        */
        Acceleration.prototype.setX = function (x) {
            this.x = x;
        };
        /**
           @method
           Y Coordinate Getter

           @return {number} Y-axis component of the acceleration.
           @since v2.0
        */
        Acceleration.prototype.getY = function () {
            return this.y;
        };
        /**
           @method
           Y Coordinate Setter

           @param {number} y Y-axis component of the acceleration.
           @since v2.0
        */
        Acceleration.prototype.setY = function (y) {
            this.y = y;
        };
        /**
           @method
           Z Coordinate Getter

           @return {number} Z-axis component of the acceleration.
           @since v2.0
        */
        Acceleration.prototype.getZ = function () {
            return this.z;
        };
        /**
           @method
           Z Coordinate Setter

           @param {number} z Z Coordinate
           @since v2.0
        */
        Acceleration.prototype.setZ = function (z) {
            this.z = z;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Acceleration.
           @return {Adaptive.Acceleration} Wrapped object instance.
        */
        Acceleration.toObject = function (object) {
            var result = new Acceleration(null, null, null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.x = object.x;
                result.y = object.y;
                result.z = object.z;
                result.timestamp = object.timestamp;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Acceleration[].
           @return {Adaptive.Acceleration[]} Wrapped object array instance.
        */
        Acceleration.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(Acceleration.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return Acceleration;
    })(Adaptive.APIBean);
    Adaptive.Acceleration = Acceleration;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=Acceleration.js.map