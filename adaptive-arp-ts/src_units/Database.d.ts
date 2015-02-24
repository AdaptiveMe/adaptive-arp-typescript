/// <reference path="APIBean.d.ts" />
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
       @class Adaptive.Database
       @extends Adaptive.APIBean
       Structure representing a database reference.

       @author Ferran Vila Conesa
       @since v2.0
       @version 1.0
    */
    class Database extends APIBean {
        /**
           @property {boolean} compress
           Indicates if database was created or needs to be created as Compressed.
        */
        compress: boolean;
        /**
           @property {boolean} compress
           Indicates if database was created or needs to be created as Compressed. The 'compressProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'compress'.
        */
        compressProperty: boolean;
        /**
           @property {string} name
           Database Name (name of the .db local file).
        */
        name: string;
        /**
           @property {string} name
           Database Name (name of the .db local file). The 'nameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'name'.
        */
        nameProperty: string;
        /**
           @method constructor
           Constructor using fields.

           @param {string} name     Name of the DatabaseTable.
           @param {boolean} compress Compression enabled.
           @since v2.0
        */
        constructor(name: string, compress: boolean);
        /**
           @method
           Returns if the table is compressed

           @return {boolean} Compression enabled
           @since v2.0
        */
        getCompress(): boolean;
        /**
           @method
           Sets if the table is compressed or not.

           @param {boolean} compress Compression enabled
           @since v2.0
        */
        setCompress(compress: boolean): void;
        /**
           @method
           Returns the name.

           @return {string} The name of the table.
           @since v2.0
        */
        getName(): string;
        /**
           @method
           Sets the name of the table.

           @param {string} name The name of the table.
           @since v2.0
        */
        setName(name: string): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Database.
           @return {Adaptive.Database} Wrapped object instance.
        */
        static toObject(object: any): Database;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Database[].
           @return {Adaptive.Database[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): Database[];
    }
}
