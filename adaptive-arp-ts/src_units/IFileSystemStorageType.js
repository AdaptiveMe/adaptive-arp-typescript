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
       @enum {Adaptive.IFileSystemStorageType} Adaptive.IFileSystemStorageType
       Enumeration IFileSystemStorageType
    */
    var IFileSystemStorageType = (function () {
        function IFileSystemStorageType(value) {
            this.value = value;
        }
        IFileSystemStorageType.prototype.toString = function () {
            return this.value;
        };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IFileSystemStorageType}
        */
        IFileSystemStorageType.toObject = function (object) {
            var retValue = IFileSystemStorageType.Unknown;
            if (object != null && object.value != null && IFileSystemStorageType.hasOwnProperty(object.value)) {
                retValue = IFileSystemStorageType[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IFileSystemStorageType} [Application='Application']
        */
        IFileSystemStorageType.Application = new IFileSystemStorageType("Application");
        /**
           @property {Adaptive.IFileSystemStorageType} [Document='Document']
        */
        IFileSystemStorageType.Document = new IFileSystemStorageType("Document");
        /**
           @property {Adaptive.IFileSystemStorageType} [Cloud='Cloud']
        */
        IFileSystemStorageType.Cloud = new IFileSystemStorageType("Cloud");
        /**
           @property {Adaptive.IFileSystemStorageType} [Protected='Protected']
        */
        IFileSystemStorageType.Protected = new IFileSystemStorageType("Protected");
        /**
           @property {Adaptive.IFileSystemStorageType} [Cache='Cache']
        */
        IFileSystemStorageType.Cache = new IFileSystemStorageType("Cache");
        /**
           @property {Adaptive.IFileSystemStorageType} [External='External']
        */
        IFileSystemStorageType.External = new IFileSystemStorageType("External");
        /**
           @property {Adaptive.IFileSystemStorageType} [Unknown='Unknown']
        */
        IFileSystemStorageType.Unknown = new IFileSystemStorageType("Unknown");
        return IFileSystemStorageType;
    })();
    Adaptive.IFileSystemStorageType = IFileSystemStorageType;
})(Adaptive || (Adaptive = {}));
//# sourceMappingURL=IFileSystemStorageType.js.map