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
       @class Adaptive.Geolocation
       @extends Adaptive.APIBean
       Structure representing the data a single geolocation reading.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    var Geolocation = (function (_super) {
        __extends(Geolocation, _super);
        /**
           @method constructor
           Constructor with parameters

           @param {number} latitude  Latitude of the measurement
           @param {number} longitude Longitude of the measurement
           @param {number} altitude  Altitude of the measurement
           @param {number} xDoP      Dilution of precision on the X measurement
           @param {number} yDoP      Dilution of precision on the Y measurement
           @param {number} timestamp Timestamp of the measurement
           @since v2.0
        */
        function Geolocation(latitude, longitude, altitude, xDoP, yDoP, timestamp) {
            _super.call(this);
            this.latitude = latitude;
            this.longitude = longitude;
            this.altitude = altitude;
            this.xDoP = xDoP;
            this.yDoP = yDoP;
            this.timestamp = timestamp;
        }
        Object.defineProperty(Geolocation.prototype, "altitudeProperty", {
            /**
               @property {number} altitude
               The current device altitude (or Z coordinate). Measured in meters. The 'altitudeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'altitude'.
            */
            get: function () {
                return this.altitude;
            },
            set: function (altitude) {
                this.altitude = altitude;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Geolocation.prototype, "latitudeProperty", {
            /**
               @property {number} latitude
               The Y coordinate (or latitude). Measured in degrees. The 'latitudeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'latitude'.
            */
            get: function () {
                return this.latitude;
            },
            set: function (latitude) {
                this.latitude = latitude;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Geolocation.prototype, "longitudeProperty", {
            /**
               @property {number} longitude
               The X coordinate (or longitude). Measured in degrees. The 'longitudeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'longitude'.
            */
            get: function () {
                return this.longitude;
            },
            set: function (longitude) {
                this.longitude = longitude;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Geolocation.prototype, "timestampProperty", {
            /**
               @property {number} timestamp
               Timestamp of the geolocation reading. The 'timestampProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'timestamp'.
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
        Object.defineProperty(Geolocation.prototype, "xDoPProperty", {
            /**
               @property {number} xDoP
               Dilution of precision on the X measurement. Measured in meters. The 'xDoPProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'xDoP'.
            */
            get: function () {
                return this.xDoP;
            },
            set: function (xDoP) {
                this.xDoP = xDoP;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Geolocation.prototype, "yDoPProperty", {
            /**
               @property {number} yDoP
               Dilution of precision on the Y measurement. Measured in meters. The 'yDoPProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'yDoP'.
            */
            get: function () {
                return this.yDoP;
            },
            set: function (yDoP) {
                this.yDoP = yDoP;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns altitude in meters

           @return {number} Altitude of the measurement
           @since v2.0
        */
        Geolocation.prototype.getAltitude = function () {
            return this.altitude;
        };
        /**
           @method
           Set altitude in meters

           @param {number} altitude Altitude of the measurement
           @since v2.0
        */
        Geolocation.prototype.setAltitude = function (altitude) {
            this.altitude = altitude;
        };
        /**
           @method
           Returns the latitude in degrees

           @return {number} Latitude of the measurement
           @since v2.0
        */
        Geolocation.prototype.getLatitude = function () {
            return this.latitude;
        };
        /**
           @method
           Set the latitude in degrees

           @param {number} latitude Latitude of the measurement
           @since v2.0
        */
        Geolocation.prototype.setLatitude = function (latitude) {
            this.latitude = latitude;
        };
        /**
           @method
           Returns the longitude in degrees

           @return {number} Longitude of the measurement
           @since v2.0
        */
        Geolocation.prototype.getLongitude = function () {
            return this.longitude;
        };
        /**
           @method
           Returns the latitude in degrees

           @param {number} longitude Longitude of the measurement
           @since v2.0
        */
        Geolocation.prototype.setLongitude = function (longitude) {
            this.longitude = longitude;
        };
        /**
           @method
           Timestamp Getter

           @return {number} Timestamp
           @since v2.0
        */
        Geolocation.prototype.getTimestamp = function () {
            return this.timestamp;
        };
        /**
           @method
           Timestamp Setter

           @param {number} timestamp Timestamp
           @since v2.0
        */
        Geolocation.prototype.setTimestamp = function (timestamp) {
            this.timestamp = timestamp;
        };
        /**
           @method
           Gets Dilution of precision on the X measurement. Measured in meters.

           @return {number} xDoP Dilution of precision on the X measurement. Measured in meters.
        */
        Geolocation.prototype.getXDoP = function () {
            return this.xDoP;
        };
        /**
           @method
           Sets Dilution of precision on the X measurement. Measured in meters.

           @param {number} xDoP Dilution of precision on the X measurement. Measured in meters.
        */
        Geolocation.prototype.setXDoP = function (xDoP) {
            this.xDoP = xDoP;
        };
        /**
           @method
           Gets Dilution of precision on the Y measurement. Measured in meters.

           @return {number} yDoP Dilution of precision on the Y measurement. Measured in meters.
        */
        Geolocation.prototype.getYDoP = function () {
            return this.yDoP;
        };
        /**
           @method
           Sets Dilution of precision on the Y measurement. Measured in meters.

           @param {number} yDoP Dilution of precision on the Y measurement. Measured in meters.
        */
        Geolocation.prototype.setYDoP = function (yDoP) {
            this.yDoP = yDoP;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Geolocation.
           @return {Adaptive.Geolocation} Wrapped object instance.
        */
        Geolocation.toObject = function (object) {
            var result = new Geolocation(null, null, null, null, null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.latitude = object.latitude;
                result.longitude = object.longitude;
                result.altitude = object.altitude;
                result.xDoP = object.xDoP;
                result.yDoP = object.yDoP;
                result.timestamp = object.timestamp;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Geolocation[].
           @return {Adaptive.Geolocation[]} Wrapped object array instance.
        */
        Geolocation.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(Geolocation.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return Geolocation;
    })(Adaptive.APIBean);
    Adaptive.Geolocation = Geolocation;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=Geolocation.js.map