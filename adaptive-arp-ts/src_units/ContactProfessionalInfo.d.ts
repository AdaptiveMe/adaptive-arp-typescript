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
       @class Adaptive.ContactProfessionalInfo
       @extends Adaptive.APIBean
       Structure representing the professional info data elements of a contact.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    class ContactProfessionalInfo extends APIBean {
        /**
           @property {string} company
           The company of the job
        */
        company: string;
        /**
           @property {string} company
           The company of the job The 'companyProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'company'.
        */
        companyProperty: string;
        /**
           @property {string} jobDescription
           The job description
        */
        jobDescription: string;
        /**
           @property {string} jobDescription
           The job description The 'jobDescriptionProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'jobDescription'.
        */
        jobDescriptionProperty: string;
        /**
           @property {string} jobTitle
           The job title
        */
        jobTitle: string;
        /**
           @property {string} jobTitle
           The job title The 'jobTitleProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'jobTitle'.
        */
        jobTitleProperty: string;
        /**
           @method constructor
           Constructor used by implementation to set the ContactProfessionalInfo.

           @param {string} jobTitle       The job title
           @param {string} jobDescription The job description
           @param {string} company        The company of the job
           @since v2.0
        */
        constructor(jobTitle: string, jobDescription: string, company: string);
        /**
           @method
           Returns the company of the job

           @return {string} company
           @since v2.0
        */
        getCompany(): string;
        /**
           @method
           Set the company of the job

           @param {string} company The company of the job
           @since v2.0
        */
        setCompany(company: string): void;
        /**
           @method
           Returns the description of the job

           @return {string} description
           @since v2.0
        */
        getJobDescription(): string;
        /**
           @method
           Set the description of the job

           @param {string} jobDescription The job description
           @since v2.0
        */
        setJobDescription(jobDescription: string): void;
        /**
           @method
           Returns the title of the job

           @return {string} title
           @since v2.0
        */
        getJobTitle(): string;
        /**
           @method
           Set the title of the job

           @param {string} jobTitle The job title
           @since v2.0
        */
        setJobTitle(jobTitle: string): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactProfessionalInfo.
           @return {Adaptive.ContactProfessionalInfo} Wrapped object instance.
        */
        static toObject(object: any): ContactProfessionalInfo;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactProfessionalInfo[].
           @return {Adaptive.ContactProfessionalInfo[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): ContactProfessionalInfo[];
    }
}
