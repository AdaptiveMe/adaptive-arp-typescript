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

///<reference path="BaseListener.ts"/>
///<reference path="Button.ts"/>
///<reference path="CommonUtil.ts"/>
///<reference path="IButtonListener.ts"/>
///<reference path="IButtonListenerError.ts"/>
///<reference path="IButtonListenerWarning.ts"/>

module Adaptive {

     /**
        Interface for Managing the button  operations
        Auto-generated implementation of IButtonListener specification.
     */

     /**
        @property {Adaptive.Dictionary} registeredButtonListener
        @member Adaptive
        @private
        ButtonListener control dictionary.
     */
     export var registeredButtonListener = new Dictionary<IButtonListener>([]);

        // ButtonListener global listener handlers.

     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.IButtonListenerError} error
     */
     export function handleButtonListenerError(id : number, error : IButtonListenerError) : void {
          var listener : IButtonListener = registeredButtonListener[""+id];
          if (typeof listener === 'undefined' || listener == null) {
               console.error("ERROR: No listener with id "+id+" registered in registeredButtonListener dictionary.");
          } else {
               listener.onError(error);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.Button} button
     */
     export function handleButtonListenerResult(id : number, button : Button) : void {
          var listener : IButtonListener = registeredButtonListener[""+id];
          if (typeof listener === 'undefined' || listener == null) {
               console.error("ERROR: No listener with id "+id+" registered in registeredButtonListener dictionary.");
          } else {
               listener.onResult(button);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.Button} button
        @param {Adaptive.IButtonListenerWarning} warning
     */
     export function handleButtonListenerWarning(id : number, button : Button, warning : IButtonListenerWarning) : void {
          var listener : IButtonListener = registeredButtonListener[""+id];
          if (typeof listener === 'undefined' || listener == null) {
               console.error("ERROR: No listener with id "+id+" registered in registeredButtonListener dictionary.");
          } else {
               listener.onWarning(button, warning);
          }
     }

     /**
        @class Adaptive.ButtonListener
        @extends Adaptive.BaseListener
     */
     export class ButtonListener extends BaseListener implements IButtonListener {

          /**
             @private
             @property
          */
          onErrorFunction : (error : IButtonListenerError) => void;
          /**
             @private
             @property
          */
          onResultFunction : (button : Button) => void;
          /**
             @private
             @property
          */
          onWarningFunction : (button : Button, warning : IButtonListenerWarning) => void;

          /**
             @method constructor
             Constructor with anonymous handler functions for listener.

             @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IButtonListenerError
             @param {Function} onResultFunction Function receiving parameters of type: Adaptive.Button
             @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.Button, Adaptive.IButtonListenerWarning
          */
          constructor(onErrorFunction : (error : IButtonListenerError) => void, onResultFunction : (button : Button) => void, onWarningFunction : (button : Button, warning : IButtonListenerWarning) => void) {
               super(++registeredCounter);
               if (onErrorFunction == null) {
                    console.error("ERROR: ButtonListener onErrorFunction is not defined.");
               } else {
                    this.onErrorFunction = onErrorFunction;
               }
               if (onResultFunction == null) {
                    console.error("ERROR: ButtonListener onResultFunction is not defined.");
               } else {
                    this.onResultFunction = onResultFunction;
               }
               if (onWarningFunction == null) {
                    console.error("ERROR: ButtonListener onWarningFunction is not defined.");
               } else {
                    this.onWarningFunction = onWarningFunction;
               }
          }

          /**
             @method
             No data received
             @param {Adaptive.IButtonListenerError} error error occurred
             @since v2.0
          */
          public onError(error : IButtonListenerError) : void {
               if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                    console.warn("WARNING: ButtonListener contains a null reference to onErrorFunction.");
               } else {
                    this.onErrorFunction(error);
               }
          }

          /**
             @method
             Called on button pressed
             @param {Adaptive.Button} button button pressed
             @since v2.0
          */
          public onResult(button : Button) : void {
               if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                    console.warn("WARNING: ButtonListener contains a null reference to onResultFunction.");
               } else {
                    this.onResultFunction(button);
               }
          }

          /**
             @method
             Data received with warning
             @param {Adaptive.Button} button button  pressed
             @param {Adaptive.IButtonListenerWarning} warning warning happened
             @since v2.0
          */
          public onWarning(button : Button, warning : IButtonListenerWarning) : void {
               if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                    console.warn("WARNING: ButtonListener contains a null reference to onWarningFunction.");
               } else {
                    this.onWarningFunction(button, warning);
               }
          }

     }
}
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
