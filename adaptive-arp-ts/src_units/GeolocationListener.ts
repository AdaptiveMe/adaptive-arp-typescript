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

///<reference path="BaseListener.ts"/>
///<reference path="CommonUtil.ts"/>
///<reference path="Geolocation.ts"/>
///<reference path="IGeolocationListener.ts"/>
///<reference path="IGeolocationListenerError.ts"/>
///<reference path="IGeolocationListenerWarning.ts"/>

module Adaptive {

     /**
        Interface for Managing the Geolocation results
        Auto-generated implementation of IGeolocationListener specification.
     */

     /**
        @property {Adaptive.Dictionary} registeredGeolocationListener
        @member Adaptive
        @private
        GeolocationListener control dictionary.
     */
     export var registeredGeolocationListener = new Dictionary<IGeolocationListener>([]);

        // GeolocationListener global listener handlers.

     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.IGeolocationListenerError} error
     */
     export function handleGeolocationListenerError(id : number, error : IGeolocationListenerError) : void {
          var listener : IGeolocationListener = registeredGeolocationListener[""+id];
          if (typeof listener === 'undefined' || listener == null) {
               console.error("ERROR: No listener with id "+id+" registered in registeredGeolocationListener dictionary.");
          } else {
               listener.onError(error);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.Geolocation} geolocation
     */
     export function handleGeolocationListenerResult(id : number, geolocation : Geolocation) : void {
          var listener : IGeolocationListener = registeredGeolocationListener[""+id];
          if (typeof listener === 'undefined' || listener == null) {
               console.error("ERROR: No listener with id "+id+" registered in registeredGeolocationListener dictionary.");
          } else {
               listener.onResult(geolocation);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.Geolocation} geolocation
        @param {Adaptive.IGeolocationListenerWarning} warning
     */
     export function handleGeolocationListenerWarning(id : number, geolocation : Geolocation, warning : IGeolocationListenerWarning) : void {
          var listener : IGeolocationListener = registeredGeolocationListener[""+id];
          if (typeof listener === 'undefined' || listener == null) {
               console.error("ERROR: No listener with id "+id+" registered in registeredGeolocationListener dictionary.");
          } else {
               listener.onWarning(geolocation, warning);
          }
     }

     /**
        @class Adaptive.GeolocationListener
        @extends Adaptive.BaseListener
     */
     export class GeolocationListener extends BaseListener implements IGeolocationListener {

          /**
             @private
             @property
          */
          onErrorFunction : (error : IGeolocationListenerError) => void;
          /**
             @private
             @property
          */
          onResultFunction : (geolocation : Geolocation) => void;
          /**
             @private
             @property
          */
          onWarningFunction : (geolocation : Geolocation, warning : IGeolocationListenerWarning) => void;

          /**
             @method constructor
             Constructor with anonymous handler functions for listener.

             @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IGeolocationListenerError
             @param {Function} onResultFunction Function receiving parameters of type: Adaptive.Geolocation
             @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.Geolocation, Adaptive.IGeolocationListenerWarning
          */
          constructor(onErrorFunction : (error : IGeolocationListenerError) => void, onResultFunction : (geolocation : Geolocation) => void, onWarningFunction : (geolocation : Geolocation, warning : IGeolocationListenerWarning) => void) {
               super(++registeredCounter);
               if (onErrorFunction == null) {
                    console.error("ERROR: GeolocationListener onErrorFunction is not defined.");
               } else {
                    this.onErrorFunction = onErrorFunction;
               }
               if (onResultFunction == null) {
                    console.error("ERROR: GeolocationListener onResultFunction is not defined.");
               } else {
                    this.onResultFunction = onResultFunction;
               }
               if (onWarningFunction == null) {
                    console.error("ERROR: GeolocationListener onWarningFunction is not defined.");
               } else {
                    this.onWarningFunction = onWarningFunction;
               }
          }

          /**
             @method
             No data received - error condition, not authorized or hardware not available.
             @param {Adaptive.IGeolocationListenerError} error error Type of error encountered during reading.
             @since v2.0
          */
          public onError(error : IGeolocationListenerError) : void {
               if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                    console.warn("WARNING: GeolocationListener contains a null reference to onErrorFunction.");
               } else {
                    this.onErrorFunction(error);
               }
          }

          /**
             @method
             Correct data received.
             @param {Adaptive.Geolocation} geolocation geolocation Geolocation Bean
             @since v2.0
          */
          public onResult(geolocation : Geolocation) : void {
               if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                    console.warn("WARNING: GeolocationListener contains a null reference to onResultFunction.");
               } else {
                    this.onResultFunction(geolocation);
               }
          }

          /**
             @method
             Data received with warning - ie. HighDoP
             @param {Adaptive.Geolocation} geolocation geolocation Geolocation Bean
             @param {Adaptive.IGeolocationListenerWarning} warning warning     Type of warning encountered during reading.
             @since v2.0
          */
          public onWarning(geolocation : Geolocation, warning : IGeolocationListenerWarning) : void {
               if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                    console.warn("WARNING: GeolocationListener contains a null reference to onWarningFunction.");
               } else {
                    this.onWarningFunction(geolocation, warning);
               }
          }

     }
}
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
