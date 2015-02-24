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

///<reference path="APIBean.ts"/>
///<reference path="ICapabilitiesButton.ts"/>

module Adaptive {

     /**
        @class Adaptive.Button
        @extends Adaptive.APIBean
        Structure representing the a physical or logical button on a device.

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     export class Button extends APIBean {

          /**
             @property {Adaptive.ICapabilitiesButton} type
             Button type
          */
          type : ICapabilitiesButton;

          /**
             @property {Adaptive.ICapabilitiesButton} type
             Button type The 'typeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'type'.
          */
          get typeProperty() : ICapabilitiesButton {
               return this.type;
          }

          set typeProperty(type:ICapabilitiesButton) {
               this.type = type;
          }

          /**
             @method constructor
             Constructor with fields

             @param {Adaptive.ICapabilitiesButton} type Button type.
             @since v2.0
          */
          constructor(type: ICapabilitiesButton) {
               super();
               this.type = type;
          }

          /**
             @method
             Returns the button type

             @return {Adaptive.ICapabilitiesButton} type Button type.
             @since v2.0
          */
          getType() : ICapabilitiesButton {
               return this.type;
          }

          /**
             @method
             Setter for the button type

             @param {Adaptive.ICapabilitiesButton} type Button Type
             @since v2.0
          */
          setType(type: ICapabilitiesButton) {
               this.type = type;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.Button.
             @return {Adaptive.Button} Wrapped object instance.
          */
          static toObject(object : any) : Button {
               var result : Button = new Button(null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.type = ICapabilitiesButton.toObject(object.type);

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.Button[].
             @return {Adaptive.Button[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : Button[] {
               var resultArray : Array<Button> = new Array<Button>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(Button.toObject(object[i]));
                    }
               }
               return resultArray;
          }

     }
}

/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
