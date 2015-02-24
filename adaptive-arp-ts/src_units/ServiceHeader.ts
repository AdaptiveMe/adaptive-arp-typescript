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

///<reference path="KeyValue.ts"/>

module Adaptive {

     /**
        @class Adaptive.ServiceHeader
        @extends Adaptive.KeyValue
        Structure representing the data of a http request or response header.

        @author Aryslan
        @since v2.0
        @version 1.0
     */
     export class ServiceHeader extends KeyValue {

          /**
             @method constructor
             Convenience constructor.

             @param {string} keyName Name of the key.
             @param {string} keyData Value of the key.
             @since v2.0.6
          */
          constructor(keyName: string, keyData: string) {
               super(keyName, keyData);
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ServiceHeader.
             @return {Adaptive.ServiceHeader} Wrapped object instance.
          */
          static toObject(object : any) : ServiceHeader {
               var result : ServiceHeader = new ServiceHeader(null, null);

               if (object != null ) {
                    // Assign values to parent bean fields.
                    result.keyName = object.keyName;
                    result.keyData = object.keyData;

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ServiceHeader[].
             @return {Adaptive.ServiceHeader[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : ServiceHeader[] {
               var resultArray : Array<ServiceHeader> = new Array<ServiceHeader>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(ServiceHeader.toObject(object[i]));
                    }
               }
               return resultArray;
          }

     }
}

/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
