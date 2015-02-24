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

module Adaptive {

     /**
        @enum {Adaptive.ICapabilitiesSensor} Adaptive.ICapabilitiesSensor
        Enumeration ICapabilitiesSensor
     */
     export class ICapabilitiesSensor {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.ICapabilitiesSensor} [Accelerometer='Accelerometer']
          */
          static Accelerometer = new ICapabilitiesSensor("Accelerometer");
          /**
             @property {Adaptive.ICapabilitiesSensor} [AmbientLight='AmbientLight']
          */
          static AmbientLight = new ICapabilitiesSensor("AmbientLight");
          /**
             @property {Adaptive.ICapabilitiesSensor} [Barometer='Barometer']
          */
          static Barometer = new ICapabilitiesSensor("Barometer");
          /**
             @property {Adaptive.ICapabilitiesSensor} [Geolocation='Geolocation']
          */
          static Geolocation = new ICapabilitiesSensor("Geolocation");
          /**
             @property {Adaptive.ICapabilitiesSensor} [Gyroscope='Gyroscope']
          */
          static Gyroscope = new ICapabilitiesSensor("Gyroscope");
          /**
             @property {Adaptive.ICapabilitiesSensor} [Magnetometer='Magnetometer']
          */
          static Magnetometer = new ICapabilitiesSensor("Magnetometer");
          /**
             @property {Adaptive.ICapabilitiesSensor} [Proximity='Proximity']
          */
          static Proximity = new ICapabilitiesSensor("Proximity");
          /**
             @property {Adaptive.ICapabilitiesSensor} [Unknown='Unknown']
          */
          static Unknown = new ICapabilitiesSensor("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.ICapabilitiesSensor}
          */
          static toObject(object : any) : ICapabilitiesSensor {
               var retValue : ICapabilitiesSensor = ICapabilitiesSensor.Unknown;
               if (object != null && object.value != null && ICapabilitiesSensor.hasOwnProperty(object.value)) {
                    retValue = ICapabilitiesSensor[object.value];
               }
               return retValue;
          }

     }
}
