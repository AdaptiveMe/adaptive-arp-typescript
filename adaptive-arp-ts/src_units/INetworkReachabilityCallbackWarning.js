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
       @enum {Adaptive.INetworkReachabilityCallbackWarning} Adaptive.INetworkReachabilityCallbackWarning
       Enumeration INetworkReachabilityCallbackWarning
    */
    var INetworkReachabilityCallbackWarning = (function () {
        function INetworkReachabilityCallbackWarning(value) {
            this.value = value;
        }
        INetworkReachabilityCallbackWarning.prototype.toString = function () {
            return this.value;
        };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.INetworkReachabilityCallbackWarning}
        */
        INetworkReachabilityCallbackWarning.toObject = function (object) {
            var retValue = INetworkReachabilityCallbackWarning.Unknown;
            if (object != null && object.value != null && INetworkReachabilityCallbackWarning.hasOwnProperty(object.value)) {
                retValue = INetworkReachabilityCallbackWarning[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.INetworkReachabilityCallbackWarning} [IncorrectScheme='IncorrectScheme']
        */
        INetworkReachabilityCallbackWarning.IncorrectScheme = new INetworkReachabilityCallbackWarning("IncorrectScheme");
        /**
           @property {Adaptive.INetworkReachabilityCallbackWarning} [NotSecure='NotSecure']
        */
        INetworkReachabilityCallbackWarning.NotSecure = new INetworkReachabilityCallbackWarning("NotSecure");
        /**
           @property {Adaptive.INetworkReachabilityCallbackWarning} [NotTrusted='NotTrusted']
        */
        INetworkReachabilityCallbackWarning.NotTrusted = new INetworkReachabilityCallbackWarning("NotTrusted");
        /**
           @property {Adaptive.INetworkReachabilityCallbackWarning} [Redirected='Redirected']
        */
        INetworkReachabilityCallbackWarning.Redirected = new INetworkReachabilityCallbackWarning("Redirected");
        /**
           @property {Adaptive.INetworkReachabilityCallbackWarning} [NotRegisteredService='NotRegisteredService']
        */
        INetworkReachabilityCallbackWarning.NotRegisteredService = new INetworkReachabilityCallbackWarning("NotRegisteredService");
        /**
           @property {Adaptive.INetworkReachabilityCallbackWarning} [Unknown='Unknown']
        */
        INetworkReachabilityCallbackWarning.Unknown = new INetworkReachabilityCallbackWarning("Unknown");
        return INetworkReachabilityCallbackWarning;
    })();
    Adaptive.INetworkReachabilityCallbackWarning = INetworkReachabilityCallbackWarning;
})(Adaptive || (Adaptive = {}));
//# sourceMappingURL=INetworkReachabilityCallbackWarning.js.map