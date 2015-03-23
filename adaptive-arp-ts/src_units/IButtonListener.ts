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

///<reference path="Button.ts"/>
///<reference path="IAdaptiveRPGroup.ts"/>
///<reference path="IBaseListener.ts"/>
///<reference path="IButtonListenerError.ts"/>
///<reference path="IButtonListenerWarning.ts"/>

module Adaptive {

     /**
        Interface for Managing the button  operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IButtonListener
     */
     export interface IButtonListener extends IBaseListener {
          /**
             @method
             No data received
             @param error occurred
             @since v2.0
          */
          onError(error:IButtonListenerError);
          /**
             @method
             Called on button pressed
             @param button pressed
             @since v2.0
          */
          onResult(button:Button);
          /**
             @method
             Data received with warning
             @param button  pressed
             @param warning happened
             @since v2.0
          */
          onWarning(button:Button, warning:IButtonListenerWarning);
     }
}

/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
