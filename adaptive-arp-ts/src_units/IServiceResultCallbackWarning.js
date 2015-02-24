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
       @enum {Adaptive.IServiceResultCallbackWarning} Adaptive.IServiceResultCallbackWarning
       Enumeration IServiceResultCallbackWarning
    */
    var IServiceResultCallbackWarning = (function () {
        function IServiceResultCallbackWarning(value) {
            this.value = value;
        }
        IServiceResultCallbackWarning.prototype.toString = function () {
            return this.value;
        };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IServiceResultCallbackWarning}
        */
        IServiceResultCallbackWarning.toObject = function (object) {
            var retValue = IServiceResultCallbackWarning.Unknown;
            if (object != null && object.value != null && IServiceResultCallbackWarning.hasOwnProperty(object.value)) {
                retValue = IServiceResultCallbackWarning[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [CertificateUntrusted='CertificateUntrusted']
        */
        IServiceResultCallbackWarning.CertificateUntrusted = new IServiceResultCallbackWarning("CertificateUntrusted");
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [NotSecure='NotSecure']
        */
        IServiceResultCallbackWarning.NotSecure = new IServiceResultCallbackWarning("NotSecure");
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [Redirected='Redirected']
        */
        IServiceResultCallbackWarning.Redirected = new IServiceResultCallbackWarning("Redirected");
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [WrongParams='WrongParams']
        */
        IServiceResultCallbackWarning.WrongParams = new IServiceResultCallbackWarning("WrongParams");
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [Forbidden='Forbidden']
        */
        IServiceResultCallbackWarning.Forbidden = new IServiceResultCallbackWarning("Forbidden");
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [NotFound='NotFound']
        */
        IServiceResultCallbackWarning.NotFound = new IServiceResultCallbackWarning("NotFound");
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [MethodNotAllowed='MethodNotAllowed']
        */
        IServiceResultCallbackWarning.MethodNotAllowed = new IServiceResultCallbackWarning("MethodNotAllowed");
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [NotAllowed='NotAllowed']
        */
        IServiceResultCallbackWarning.NotAllowed = new IServiceResultCallbackWarning("NotAllowed");
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [NotAuthenticated='NotAuthenticated']
        */
        IServiceResultCallbackWarning.NotAuthenticated = new IServiceResultCallbackWarning("NotAuthenticated");
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [PaymentRequired='PaymentRequired']
        */
        IServiceResultCallbackWarning.PaymentRequired = new IServiceResultCallbackWarning("PaymentRequired");
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [ServerError='ServerError']
        */
        IServiceResultCallbackWarning.ServerError = new IServiceResultCallbackWarning("ServerError");
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [Unknown='Unknown']
        */
        IServiceResultCallbackWarning.Unknown = new IServiceResultCallbackWarning("Unknown");
        return IServiceResultCallbackWarning;
    })();
    Adaptive.IServiceResultCallbackWarning = IServiceResultCallbackWarning;
})(Adaptive || (Adaptive = {}));
//# sourceMappingURL=IServiceResultCallbackWarning.js.map