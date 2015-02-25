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
///<reference path="APIRequest.ts"/>
///<reference path="APIResponse.ts"/>
///<reference path="BaseSocialBridge.ts"/>
///<reference path="CommonUtil.ts"/>
///<reference path="IAdaptiveRPGroup.ts"/>
///<reference path="IBaseSocial.ts"/>
///<reference path="IGooglePlus.ts"/>
var Adaptive;
(function (Adaptive) {
    /**
       @class Adaptive.GooglePlusBridge
       @extends Adaptive.BaseSocialBridge
       Interface for Managing the Google Plus operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var GooglePlusBridge = (function (_super) {
        __extends(GooglePlusBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function GooglePlusBridge() {
            _super.call(this);
        }
        return GooglePlusBridge;
    })(Adaptive.BaseSocialBridge);
    Adaptive.GooglePlusBridge = GooglePlusBridge;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=GooglePlusBridge.js.map