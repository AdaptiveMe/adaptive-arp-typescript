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
var Adaptive;
(function (Adaptive) {
    /**
       @enum {Adaptive.ICapabilitiesOrientation} Adaptive.ICapabilitiesOrientation
       Enumeration ICapabilitiesOrientation
    */
    var ICapabilitiesOrientation = (function () {
        function ICapabilitiesOrientation(value) {
            this.value = value;
        }
        ICapabilitiesOrientation.prototype.toString = function () {
            return this.value;
        };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ICapabilitiesOrientation}
        */
        ICapabilitiesOrientation.toObject = function (object) {
            var retValue = ICapabilitiesOrientation.Unknown;
            if (object != null && object.value != null && ICapabilitiesOrientation.hasOwnProperty(object.value)) {
                retValue = ICapabilitiesOrientation[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.ICapabilitiesOrientation} [PortraitUp='PortraitUp']
        */
        ICapabilitiesOrientation.PortraitUp = new ICapabilitiesOrientation("PortraitUp");
        /**
           @property {Adaptive.ICapabilitiesOrientation} [PortraitDown='PortraitDown']
        */
        ICapabilitiesOrientation.PortraitDown = new ICapabilitiesOrientation("PortraitDown");
        /**
           @property {Adaptive.ICapabilitiesOrientation} [LandscapeLeft='LandscapeLeft']
        */
        ICapabilitiesOrientation.LandscapeLeft = new ICapabilitiesOrientation("LandscapeLeft");
        /**
           @property {Adaptive.ICapabilitiesOrientation} [LandscapeRight='LandscapeRight']
        */
        ICapabilitiesOrientation.LandscapeRight = new ICapabilitiesOrientation("LandscapeRight");
        /**
           @property {Adaptive.ICapabilitiesOrientation} [Unknown='Unknown']
        */
        ICapabilitiesOrientation.Unknown = new ICapabilitiesOrientation("Unknown");
        return ICapabilitiesOrientation;
    })();
    Adaptive.ICapabilitiesOrientation = ICapabilitiesOrientation;
})(Adaptive || (Adaptive = {}));
//# sourceMappingURL=ICapabilitiesOrientation.js.map