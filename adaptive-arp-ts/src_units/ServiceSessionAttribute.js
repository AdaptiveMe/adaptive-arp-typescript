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
var __extends = this.__extends || function (d, b) {
    for (var p in b) { if (b.hasOwnProperty(p)) { d[p] = b[p]; } }
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="KeyValue.ts"/>
var Adaptive;
(function (Adaptive) {
    /**
       @class Adaptive.ServiceSessionAttribute
       @extends Adaptive.KeyValue
       Object representing a service session attribute.

       @author Carlos Lozano Diez
       @since 2.0.6
       @version 1.0
    */
    var ServiceSessionAttribute = (function (_super) {
        __extends(ServiceSessionAttribute, _super);
        /**
           @method constructor
           Convenience constructor.

           @param {string} keyName Name of the key.
           @param {string} keyData Value of the key.
           @since v2.0.6
        */
        function ServiceSessionAttribute(keyName, keyData) {
            _super.call(this, keyName, keyData);
        }
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceSessionAttribute.
           @return {Adaptive.ServiceSessionAttribute} Wrapped object instance.
        */
        ServiceSessionAttribute.toObject = function (object) {
            var result = new ServiceSessionAttribute(null, null);
            if (object != null) {
                // Assign values to parent bean fields.
                result.keyName = object.keyName;
                result.keyData = object.keyData;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceSessionAttribute[].
           @return {Adaptive.ServiceSessionAttribute[]} Wrapped object array instance.
        */
        ServiceSessionAttribute.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(ServiceSessionAttribute.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return ServiceSessionAttribute;
    })(Adaptive.KeyValue);
    Adaptive.ServiceSessionAttribute = ServiceSessionAttribute;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=ServiceSessionAttribute.js.map