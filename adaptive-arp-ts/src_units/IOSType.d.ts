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
       @enum {Adaptive.IOSType} Adaptive.IOSType
       Enumeration IOSType
    */
    class IOSType {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IOSType} [iOS='iOS']
        */
        static iOS: IOSType;
        /**
           @property {Adaptive.IOSType} [OSX='OSX']
        */
        static OSX: IOSType;
        /**
           @property {Adaptive.IOSType} [Windows='Windows']
        */
        static Windows: IOSType;
        /**
           @property {Adaptive.IOSType} [WindowsPhone='WindowsPhone']
        */
        static WindowsPhone: IOSType;
        /**
           @property {Adaptive.IOSType} [Android='Android']
        */
        static Android: IOSType;
        /**
           @property {Adaptive.IOSType} [Linux='Linux']
        */
        static Linux: IOSType;
        /**
           @property {Adaptive.IOSType} [Blackberry='Blackberry']
        */
        static Blackberry: IOSType;
        /**
           @property {Adaptive.IOSType} [Tizen='Tizen']
        */
        static Tizen: IOSType;
        /**
           @property {Adaptive.IOSType} [FirefoxOS='FirefoxOS']
        */
        static FirefoxOS: IOSType;
        /**
           @property {Adaptive.IOSType} [Chromium='Chromium']
        */
        static Chromium: IOSType;
        /**
           @property {Adaptive.IOSType} [Unspecified='Unspecified']
        */
        static Unspecified: IOSType;
        /**
           @property {Adaptive.IOSType} [Unknown='Unknown']
        */
        static Unknown: IOSType;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IOSType}
        */
        static toObject(object: any): IOSType;
    }
}
