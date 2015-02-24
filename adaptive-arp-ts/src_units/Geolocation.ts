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

///<reference path="APIBean.ts"/>

module Adaptive {

     /**
        @class Adaptive.Geolocation
        @extends Adaptive.APIBean
        Structure representing the data a single geolocation reading.

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     export class Geolocation extends APIBean {

          /**
             @property {number} altitude
             The current device altitude (or Z coordinate). Measured in meters.
          */
          altitude : number;

          /**
             @property {number} altitude
             The current device altitude (or Z coordinate). Measured in meters. The 'altitudeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'altitude'.
          */
          get altitudeProperty() : number {
               return this.altitude;
          }

          set altitudeProperty(altitude:number) {
               this.altitude = altitude;
          }

          /**
             @property {number} latitude
             The Y coordinate (or latitude). Measured in degrees.
          */
          latitude : number;

          /**
             @property {number} latitude
             The Y coordinate (or latitude). Measured in degrees. The 'latitudeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'latitude'.
          */
          get latitudeProperty() : number {
               return this.latitude;
          }

          set latitudeProperty(latitude:number) {
               this.latitude = latitude;
          }

          /**
             @property {number} longitude
             The X coordinate (or longitude). Measured in degrees.
          */
          longitude : number;

          /**
             @property {number} longitude
             The X coordinate (or longitude). Measured in degrees. The 'longitudeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'longitude'.
          */
          get longitudeProperty() : number {
               return this.longitude;
          }

          set longitudeProperty(longitude:number) {
               this.longitude = longitude;
          }

          /**
             @property {number} timestamp
             Timestamp of the geolocation reading.
          */
          timestamp : number;

          /**
             @property {number} timestamp
             Timestamp of the geolocation reading. The 'timestampProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'timestamp'.
          */
          get timestampProperty() : number {
               return this.timestamp;
          }

          set timestampProperty(timestamp:number) {
               this.timestamp = timestamp;
          }

          /**
             @property {number} xDoP
             Dilution of precision on the X measurement. Measured in meters.
          */
          xDoP : number;

          /**
             @property {number} xDoP
             Dilution of precision on the X measurement. Measured in meters. The 'xDoPProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'xDoP'.
          */
          get xDoPProperty() : number {
               return this.xDoP;
          }

          set xDoPProperty(xDoP:number) {
               this.xDoP = xDoP;
          }

          /**
             @property {number} yDoP
             Dilution of precision on the Y measurement. Measured in meters.
          */
          yDoP : number;

          /**
             @property {number} yDoP
             Dilution of precision on the Y measurement. Measured in meters. The 'yDoPProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'yDoP'.
          */
          get yDoPProperty() : number {
               return this.yDoP;
          }

          set yDoPProperty(yDoP:number) {
               this.yDoP = yDoP;
          }

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
          constructor(latitude: number, longitude: number, altitude: number, xDoP: number, yDoP: number, timestamp: number) {
               super();
               this.latitude = latitude;
               this.longitude = longitude;
               this.altitude = altitude;
               this.xDoP = xDoP;
               this.yDoP = yDoP;
               this.timestamp = timestamp;
          }

          /**
             @method
             Returns altitude in meters

             @return {number} Altitude of the measurement
             @since v2.0
          */
          getAltitude() : number {
               return this.altitude;
          }

          /**
             @method
             Set altitude in meters

             @param {number} altitude Altitude of the measurement
             @since v2.0
          */
          setAltitude(altitude: number) {
               this.altitude = altitude;
          }

          /**
             @method
             Returns the latitude in degrees

             @return {number} Latitude of the measurement
             @since v2.0
          */
          getLatitude() : number {
               return this.latitude;
          }

          /**
             @method
             Set the latitude in degrees

             @param {number} latitude Latitude of the measurement
             @since v2.0
          */
          setLatitude(latitude: number) {
               this.latitude = latitude;
          }

          /**
             @method
             Returns the longitude in degrees

             @return {number} Longitude of the measurement
             @since v2.0
          */
          getLongitude() : number {
               return this.longitude;
          }

          /**
             @method
             Returns the latitude in degrees

             @param {number} longitude Longitude of the measurement
             @since v2.0
          */
          setLongitude(longitude: number) {
               this.longitude = longitude;
          }

          /**
             @method
             Timestamp Getter

             @return {number} Timestamp
             @since v2.0
          */
          getTimestamp() : number {
               return this.timestamp;
          }

          /**
             @method
             Timestamp Setter

             @param {number} timestamp Timestamp
             @since v2.0
          */
          setTimestamp(timestamp: number) {
               this.timestamp = timestamp;
          }

          /**
             @method
             Gets Dilution of precision on the X measurement. Measured in meters.

             @return {number} xDoP Dilution of precision on the X measurement. Measured in meters.
          */
          getXDoP() : number {
               return this.xDoP;
          }

          /**
             @method
             Sets Dilution of precision on the X measurement. Measured in meters.

             @param {number} xDoP Dilution of precision on the X measurement. Measured in meters.
          */
          setXDoP(xDoP: number) {
               this.xDoP = xDoP;
          }

          /**
             @method
             Gets Dilution of precision on the Y measurement. Measured in meters.

             @return {number} yDoP Dilution of precision on the Y measurement. Measured in meters.
          */
          getYDoP() : number {
               return this.yDoP;
          }

          /**
             @method
             Sets Dilution of precision on the Y measurement. Measured in meters.

             @param {number} yDoP Dilution of precision on the Y measurement. Measured in meters.
          */
          setYDoP(yDoP: number) {
               this.yDoP = yDoP;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.Geolocation.
             @return {Adaptive.Geolocation} Wrapped object instance.
          */
          static toObject(object : any) : Geolocation {
               var result : Geolocation = new Geolocation(null, null, null, null, null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.latitude = object.latitude;
                    result.longitude = object.longitude;
                    result.altitude = object.altitude;
                    result.xDoP = object.xDoP;
                    result.yDoP = object.yDoP;
                    result.timestamp = object.timestamp;

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.Geolocation[].
             @return {Adaptive.Geolocation[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : Geolocation[] {
               var resultArray : Array<Geolocation> = new Array<Geolocation>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(Geolocation.toObject(object[i]));
                    }
               }
               return resultArray;
          }

     }
}

/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
