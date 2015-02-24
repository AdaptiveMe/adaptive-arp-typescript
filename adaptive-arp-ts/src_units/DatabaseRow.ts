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

module Adaptive {

     /**
        @class Adaptive.DatabaseRow
        @extends Adaptive.APIBean
        Structure representing a row for a data table.

        @author Ferran Vila Conesa
        @since v2.0
        @version 1.0
     */
     export class DatabaseRow extends APIBean {

          /**
             @property {string[]} values
             The values of the row.
          */
          values : Array<string>;

          /**
             @property {string[]} values
             The values of the row. The 'valuesProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'values'.
          */
          get valuesProperty() : Array<string> {
               return this.values;
          }

          set valuesProperty(values:Array<string>) {
               this.values = values;
          }

          /**
             @method constructor
             Constructor for implementation using.

             @param {string[]} values The values of the row
             @since v2.0
          */
          constructor(values: Array<string>) {
               super();
               this.values = values;
          }

          /**
             @method
             Returns the values of the row.

             @return {string[]} The values of the row.
             @since v2.0
          */
          getValues() : Array<string> {
               return this.values;
          }

          /**
             @method
             Sets the values of the row.

             @param {string[]} values The values of the row.
             @since v2.0
          */
          setValues(values: Array<string>) {
               this.values = values;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.DatabaseRow.
             @return {Adaptive.DatabaseRow} Wrapped object instance.
          */
          static toObject(object : any) : DatabaseRow {
               var result : DatabaseRow = new DatabaseRow(null);

               if (object != null ) {
                    // Assign values to bean fields.
                    if (object.values != null) {
                         result.values = new Array<string>();
                         for(var ivalues = 0; ivalues < object.values.length; ivalues++) {
                              var vvalues = object.values[ivalues];
                              result.values.push(vvalues);
                         }
                    }

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.DatabaseRow[].
             @return {Adaptive.DatabaseRow[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : DatabaseRow[] {
               var resultArray : Array<DatabaseRow> = new Array<DatabaseRow>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(DatabaseRow.toObject(object[i]));
                    }
               }
               return resultArray;
          }

     }
}

/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
