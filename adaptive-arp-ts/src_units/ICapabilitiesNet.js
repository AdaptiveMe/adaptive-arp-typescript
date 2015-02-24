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
       @enum {Adaptive.ICapabilitiesNet} Adaptive.ICapabilitiesNet
       Enumeration ICapabilitiesNet
    */
    var ICapabilitiesNet = (function () {
        function ICapabilitiesNet(value) {
            this.value = value;
        }
        ICapabilitiesNet.prototype.toString = function () {
            return this.value;
        };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ICapabilitiesNet}
        */
        ICapabilitiesNet.toObject = function (object) {
            var retValue = ICapabilitiesNet.Unknown;
            if (object != null && object.value != null && ICapabilitiesNet.hasOwnProperty(object.value)) {
                retValue = ICapabilitiesNet[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.ICapabilitiesNet} [GSM='GSM']
        */
        ICapabilitiesNet.GSM = new ICapabilitiesNet("GSM");
        /**
           @property {Adaptive.ICapabilitiesNet} [GPRS='GPRS']
        */
        ICapabilitiesNet.GPRS = new ICapabilitiesNet("GPRS");
        /**
           @property {Adaptive.ICapabilitiesNet} [HSDPA='HSDPA']
        */
        ICapabilitiesNet.HSDPA = new ICapabilitiesNet("HSDPA");
        /**
           @property {Adaptive.ICapabilitiesNet} [LTE='LTE']
        */
        ICapabilitiesNet.LTE = new ICapabilitiesNet("LTE");
        /**
           @property {Adaptive.ICapabilitiesNet} [WIFI='WIFI']
        */
        ICapabilitiesNet.WIFI = new ICapabilitiesNet("WIFI");
        /**
           @property {Adaptive.ICapabilitiesNet} [Ethernet='Ethernet']
        */
        ICapabilitiesNet.Ethernet = new ICapabilitiesNet("Ethernet");
        /**
           @property {Adaptive.ICapabilitiesNet} [Unavailable='Unavailable']
        */
        ICapabilitiesNet.Unavailable = new ICapabilitiesNet("Unavailable");
        /**
           @property {Adaptive.ICapabilitiesNet} [Unknown='Unknown']
        */
        ICapabilitiesNet.Unknown = new ICapabilitiesNet("Unknown");
        return ICapabilitiesNet;
    })();
    Adaptive.ICapabilitiesNet = ICapabilitiesNet;
})(Adaptive || (Adaptive = {}));
//# sourceMappingURL=ICapabilitiesNet.js.map