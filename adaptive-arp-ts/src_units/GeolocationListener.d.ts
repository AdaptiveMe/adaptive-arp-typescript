/// <reference path="BaseListener.d.ts" />
/// <reference path="CommonUtil.d.ts" />
/// <reference path="Geolocation.d.ts" />
/// <reference path="IGeolocationListener.d.ts" />
/// <reference path="IGeolocationListenerError.d.ts" />
/// <reference path="IGeolocationListenerWarning.d.ts" />
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
       Interface for Managing the Geolocation results
       Auto-generated implementation of IGeolocationListener specification.
    */
    /**
       @property {Adaptive.Dictionary} registeredGeolocationListener
       @member Adaptive
       @private
       GeolocationListener control dictionary.
    */
    var registeredGeolocationListener: Dictionary<IGeolocationListener>;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IGeolocationListenerError} error
    */
    function handleGeolocationListenerError(id: number, error: IGeolocationListenerError): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Geolocation} geolocation
    */
    function handleGeolocationListenerResult(id: number, geolocation: Geolocation): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Geolocation} geolocation
       @param {Adaptive.IGeolocationListenerWarning} warning
    */
    function handleGeolocationListenerWarning(id: number, geolocation: Geolocation, warning: IGeolocationListenerWarning): void;
    /**
       @class Adaptive.GeolocationListener
       @extends Adaptive.BaseListener
    */
    class GeolocationListener extends BaseListener implements IGeolocationListener {
        /**
           @private
           @property
        */
        onErrorFunction: (error: IGeolocationListenerError) => void;
        /**
           @private
           @property
        */
        onResultFunction: (geolocation: Geolocation) => void;
        /**
           @private
           @property
        */
        onWarningFunction: (geolocation: Geolocation, warning: IGeolocationListenerWarning) => void;
        /**
           @method constructor
           Constructor with anonymous handler functions for listener.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IGeolocationListenerError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.Geolocation
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.Geolocation, Adaptive.IGeolocationListenerWarning
        */
        constructor(onErrorFunction: (error: IGeolocationListenerError) => void, onResultFunction: (geolocation: Geolocation) => void, onWarningFunction: (geolocation: Geolocation, warning: IGeolocationListenerWarning) => void);
        /**
           @method
           No data received - error condition, not authorized or hardware not available.
           @param {Adaptive.IGeolocationListenerError} error error Type of error encountered during reading.
           @since v2.0
        */
        onError(error: IGeolocationListenerError): void;
        /**
           @method
           Correct data received.
           @param {Adaptive.Geolocation} geolocation geolocation Geolocation Bean
           @since v2.0
        */
        onResult(geolocation: Geolocation): void;
        /**
           @method
           Data received with warning - ie. HighDoP
           @param {Adaptive.Geolocation} geolocation geolocation Geolocation Bean
           @param {Adaptive.IGeolocationListenerWarning} warning warning     Type of warning encountered during reading.
           @since v2.0
        */
        onWarning(geolocation: Geolocation, warning: IGeolocationListenerWarning): void;
    }
}
