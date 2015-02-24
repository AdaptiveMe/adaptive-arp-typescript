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
       @enum {Adaptive.IServiceContentEncoding} Adaptive.IServiceContentEncoding
       Enumeration IServiceContentEncoding
    */
    var IServiceContentEncoding = (function () {
        function IServiceContentEncoding(value) {
            this.value = value;
        }
        IServiceContentEncoding.prototype.toString = function () {
            return this.value;
        };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IServiceContentEncoding}
        */
        IServiceContentEncoding.toObject = function (object) {
            var retValue = IServiceContentEncoding.Unknown;
            if (object != null && object.value != null && IServiceContentEncoding.hasOwnProperty(object.value)) {
                retValue = IServiceContentEncoding[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IServiceContentEncoding} [Ascii='Ascii']
        */
        IServiceContentEncoding.Ascii = new IServiceContentEncoding("Ascii");
        /**
           @property {Adaptive.IServiceContentEncoding} [Utf8='Utf8']
        */
        IServiceContentEncoding.Utf8 = new IServiceContentEncoding("Utf8");
        /**
           @property {Adaptive.IServiceContentEncoding} [IsoLatin1='IsoLatin1']
        */
        IServiceContentEncoding.IsoLatin1 = new IServiceContentEncoding("IsoLatin1");
        /**
           @property {Adaptive.IServiceContentEncoding} [Unicode='Unicode']
        */
        IServiceContentEncoding.Unicode = new IServiceContentEncoding("Unicode");
        /**
           @property {Adaptive.IServiceContentEncoding} [Unknown='Unknown']
        */
        IServiceContentEncoding.Unknown = new IServiceContentEncoding("Unknown");
        return IServiceContentEncoding;
    })();
    Adaptive.IServiceContentEncoding = IServiceContentEncoding;
})(Adaptive || (Adaptive = {}));
//# sourceMappingURL=IServiceContentEncoding.js.map