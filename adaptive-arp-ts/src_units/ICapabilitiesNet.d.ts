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
       @enum {Adaptive.ICapabilitiesNet} Adaptive.ICapabilitiesNet
       Enumeration ICapabilitiesNet
    */
    class ICapabilitiesNet {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.ICapabilitiesNet} [GSM='GSM']
        */
        static GSM: ICapabilitiesNet;
        /**
           @property {Adaptive.ICapabilitiesNet} [GPRS='GPRS']
        */
        static GPRS: ICapabilitiesNet;
        /**
           @property {Adaptive.ICapabilitiesNet} [HSDPA='HSDPA']
        */
        static HSDPA: ICapabilitiesNet;
        /**
           @property {Adaptive.ICapabilitiesNet} [LTE='LTE']
        */
        static LTE: ICapabilitiesNet;
        /**
           @property {Adaptive.ICapabilitiesNet} [WIFI='WIFI']
        */
        static WIFI: ICapabilitiesNet;
        /**
           @property {Adaptive.ICapabilitiesNet} [Ethernet='Ethernet']
        */
        static Ethernet: ICapabilitiesNet;
        /**
           @property {Adaptive.ICapabilitiesNet} [Unavailable='Unavailable']
        */
        static Unavailable: ICapabilitiesNet;
        /**
           @property {Adaptive.ICapabilitiesNet} [Unknown='Unknown']
        */
        static Unknown: ICapabilitiesNet;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ICapabilitiesNet}
        */
        static toObject(object: any): ICapabilitiesNet;
    }
}
