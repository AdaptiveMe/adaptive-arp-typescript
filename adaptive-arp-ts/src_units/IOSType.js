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
       @enum {Adaptive.IOSType} Adaptive.IOSType
       Enumeration IOSType
    */
    var IOSType = (function () {
        function IOSType(value) {
            this.value = value;
        }
        IOSType.prototype.toString = function () {
            return this.value;
        };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IOSType}
        */
        IOSType.toObject = function (object) {
            var retValue = IOSType.Unknown;
            if (object != null && object.value != null && IOSType.hasOwnProperty(object.value)) {
                retValue = IOSType[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IOSType} [iOS='iOS']
        */
        IOSType.iOS = new IOSType("iOS");
        /**
           @property {Adaptive.IOSType} [OSX='OSX']
        */
        IOSType.OSX = new IOSType("OSX");
        /**
           @property {Adaptive.IOSType} [Windows='Windows']
        */
        IOSType.Windows = new IOSType("Windows");
        /**
           @property {Adaptive.IOSType} [WindowsPhone='WindowsPhone']
        */
        IOSType.WindowsPhone = new IOSType("WindowsPhone");
        /**
           @property {Adaptive.IOSType} [Android='Android']
        */
        IOSType.Android = new IOSType("Android");
        /**
           @property {Adaptive.IOSType} [Linux='Linux']
        */
        IOSType.Linux = new IOSType("Linux");
        /**
           @property {Adaptive.IOSType} [Blackberry='Blackberry']
        */
        IOSType.Blackberry = new IOSType("Blackberry");
        /**
           @property {Adaptive.IOSType} [Tizen='Tizen']
        */
        IOSType.Tizen = new IOSType("Tizen");
        /**
           @property {Adaptive.IOSType} [FirefoxOS='FirefoxOS']
        */
        IOSType.FirefoxOS = new IOSType("FirefoxOS");
        /**
           @property {Adaptive.IOSType} [Chromium='Chromium']
        */
        IOSType.Chromium = new IOSType("Chromium");
        /**
           @property {Adaptive.IOSType} [Unspecified='Unspecified']
        */
        IOSType.Unspecified = new IOSType("Unspecified");
        /**
           @property {Adaptive.IOSType} [Unknown='Unknown']
        */
        IOSType.Unknown = new IOSType("Unknown");
        return IOSType;
    })();
    Adaptive.IOSType = IOSType;
})(Adaptive || (Adaptive = {}));
//# sourceMappingURL=IOSType.js.map