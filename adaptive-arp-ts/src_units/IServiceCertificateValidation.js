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
       @enum {Adaptive.IServiceCertificateValidation} Adaptive.IServiceCertificateValidation
       Enumeration IServiceCertificateValidation
    */
    var IServiceCertificateValidation = (function () {
        function IServiceCertificateValidation(value) {
            this.value = value;
        }
        IServiceCertificateValidation.prototype.toString = function () {
            return this.value;
        };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IServiceCertificateValidation}
        */
        IServiceCertificateValidation.toObject = function (object) {
            var retValue = IServiceCertificateValidation.Unknown;
            if (object != null && object.value != null && IServiceCertificateValidation.hasOwnProperty(object.value)) {
                retValue = IServiceCertificateValidation[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IServiceCertificateValidation} [None='None']
        */
        IServiceCertificateValidation.None = new IServiceCertificateValidation("None");
        /**
           @property {Adaptive.IServiceCertificateValidation} [Normal='Normal']
        */
        IServiceCertificateValidation.Normal = new IServiceCertificateValidation("Normal");
        /**
           @property {Adaptive.IServiceCertificateValidation} [Extended='Extended']
        */
        IServiceCertificateValidation.Extended = new IServiceCertificateValidation("Extended");
        /**
           @property {Adaptive.IServiceCertificateValidation} [Extreme='Extreme']
        */
        IServiceCertificateValidation.Extreme = new IServiceCertificateValidation("Extreme");
        /**
           @property {Adaptive.IServiceCertificateValidation} [Unknown='Unknown']
        */
        IServiceCertificateValidation.Unknown = new IServiceCertificateValidation("Unknown");
        return IServiceCertificateValidation;
    })();
    Adaptive.IServiceCertificateValidation = IServiceCertificateValidation;
})(Adaptive || (Adaptive = {}));
//# sourceMappingURL=IServiceCertificateValidation.js.map