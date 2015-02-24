/// <reference path="IAdaptiveRPGroup.d.ts" />
/// <reference path="IBaseUI.d.ts" />
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
declare module Adaptive {
    /**
       Interface for Managing the browser operations

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    /**
       @class Adaptive.IBrowser
    */
    interface IBrowser extends IBaseUI {
        /**
           @method
           Method for opening a URL like a link in the native default browser
           @param url Url to open
           @return {boolean} The result of the operation
           @since v2.0
        */
        openExtenalBrowser(url: string): boolean;
        /**
           @method
           Method for opening a browser embedded into the application in a modal window
           @param url            Url to open
           @param title          Title of the Navigation bar
           @param backButtonText Title of the Back button bar
           @return {boolean} The result of the operation
           @since v2.0
        */
        openInternalBrowserModal(url: string, title: string, backButtonText: string): boolean;
        /**
           @method
           Method for opening a browser embedded into the application
           @param url            Url to open
           @param title          Title of the Navigation bar
           @param backButtonText Title of the Back button bar
           @return {boolean} The result of the operation
           @since v2.0
        */
        openInternalBrowser(url: string, title: string, backButtonText: string): boolean;
    }
}
