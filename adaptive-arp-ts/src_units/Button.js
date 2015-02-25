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
///<reference path="APIBean.ts"/>
///<reference path="ICapabilitiesButton.ts"/>
var Adaptive;
(function (Adaptive) {
    /**
       @class Adaptive.Button
       @extends Adaptive.APIBean
       Structure representing the a physical or logical button on a device.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    var Button = (function (_super) {
        __extends(Button, _super);
        /**
           @method constructor
           Constructor with fields

           @param {Adaptive.ICapabilitiesButton} type Button type.
           @since v2.0
        */
        function Button(type) {
            _super.call(this);
            this.type = type;
        }
        Object.defineProperty(Button.prototype, "typeProperty", {
            /**
               @property {Adaptive.ICapabilitiesButton} type
               Button type The 'typeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'type'.
            */
            get: function () {
                return this.type;
            },
            set: function (type) {
                this.type = type;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the button type

           @return {Adaptive.ICapabilitiesButton} type Button type.
           @since v2.0
        */
        Button.prototype.getType = function () {
            return this.type;
        };
        /**
           @method
           Setter for the button type

           @param {Adaptive.ICapabilitiesButton} type Button Type
           @since v2.0
        */
        Button.prototype.setType = function (type) {
            this.type = type;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Button.
           @return {Adaptive.Button} Wrapped object instance.
        */
        Button.toObject = function (object) {
            var result = new Button(null);
            if (object != null) {
                // Assign values to bean fields.
                result.type = Adaptive.ICapabilitiesButton.toObject(object.type);
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Button[].
           @return {Adaptive.Button[]} Wrapped object array instance.
        */
        Button.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(Button.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return Button;
    })(Adaptive.APIBean);
    Adaptive.Button = Button;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=Button.js.map