/// <reference path="APIBean.d.ts" />
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
       @class Adaptive.Geolocation
       @extends Adaptive.APIBean
       Structure representing the data a single geolocation reading.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    class Geolocation extends APIBean {
        /**
           @property {number} altitude
           The current device altitude (or Z coordinate). Measured in meters.
        */
        altitude: number;
        /**
           @property {number} altitude
           The current device altitude (or Z coordinate). Measured in meters. The 'altitudeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'altitude'.
        */
        altitudeProperty: number;
        /**
           @property {number} latitude
           The Y coordinate (or latitude). Measured in degrees.
        */
        latitude: number;
        /**
           @property {number} latitude
           The Y coordinate (or latitude). Measured in degrees. The 'latitudeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'latitude'.
        */
        latitudeProperty: number;
        /**
           @property {number} longitude
           The X coordinate (or longitude). Measured in degrees.
        */
        longitude: number;
        /**
           @property {number} longitude
           The X coordinate (or longitude). Measured in degrees. The 'longitudeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'longitude'.
        */
        longitudeProperty: number;
        /**
           @property {number} timestamp
           Timestamp of the geolocation reading.
        */
        timestamp: number;
        /**
           @property {number} timestamp
           Timestamp of the geolocation reading. The 'timestampProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'timestamp'.
        */
        timestampProperty: number;
        /**
           @property {number} xDoP
           Dilution of precision on the X measurement. Measured in meters.
        */
        xDoP: number;
        /**
           @property {number} xDoP
           Dilution of precision on the X measurement. Measured in meters. The 'xDoPProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'xDoP'.
        */
        xDoPProperty: number;
        /**
           @property {number} yDoP
           Dilution of precision on the Y measurement. Measured in meters.
        */
        yDoP: number;
        /**
           @property {number} yDoP
           Dilution of precision on the Y measurement. Measured in meters. The 'yDoPProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'yDoP'.
        */
        yDoPProperty: number;
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
        constructor(latitude: number, longitude: number, altitude: number, xDoP: number, yDoP: number, timestamp: number);
        /**
           @method
           Returns altitude in meters

           @return {number} Altitude of the measurement
           @since v2.0
        */
        getAltitude(): number;
        /**
           @method
           Set altitude in meters

           @param {number} altitude Altitude of the measurement
           @since v2.0
        */
        setAltitude(altitude: number): void;
        /**
           @method
           Returns the latitude in degrees

           @return {number} Latitude of the measurement
           @since v2.0
        */
        getLatitude(): number;
        /**
           @method
           Set the latitude in degrees

           @param {number} latitude Latitude of the measurement
           @since v2.0
        */
        setLatitude(latitude: number): void;
        /**
           @method
           Returns the longitude in degrees

           @return {number} Longitude of the measurement
           @since v2.0
        */
        getLongitude(): number;
        /**
           @method
           Returns the latitude in degrees

           @param {number} longitude Longitude of the measurement
           @since v2.0
        */
        setLongitude(longitude: number): void;
        /**
           @method
           Timestamp Getter

           @return {number} Timestamp
           @since v2.0
        */
        getTimestamp(): number;
        /**
           @method
           Timestamp Setter

           @param {number} timestamp Timestamp
           @since v2.0
        */
        setTimestamp(timestamp: number): void;
        /**
           @method
           Gets Dilution of precision on the X measurement. Measured in meters.

           @return {number} xDoP Dilution of precision on the X measurement. Measured in meters.
        */
        getXDoP(): number;
        /**
           @method
           Sets Dilution of precision on the X measurement. Measured in meters.

           @param {number} xDoP Dilution of precision on the X measurement. Measured in meters.
        */
        setXDoP(xDoP: number): void;
        /**
           @method
           Gets Dilution of precision on the Y measurement. Measured in meters.

           @return {number} yDoP Dilution of precision on the Y measurement. Measured in meters.
        */
        getYDoP(): number;
        /**
           @method
           Sets Dilution of precision on the Y measurement. Measured in meters.

           @param {number} yDoP Dilution of precision on the Y measurement. Measured in meters.
        */
        setYDoP(yDoP: number): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Geolocation.
           @return {Adaptive.Geolocation} Wrapped object instance.
        */
        static toObject(object: any): Geolocation;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Geolocation[].
           @return {Adaptive.Geolocation[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): Geolocation[];
    }
}
