/// <reference path="BaseListener.d.ts" />
/// <reference path="CommonUtil.d.ts" />
/// <reference path="ILifecycleListener.d.ts" />
/// <reference path="ILifecycleListenerError.d.ts" />
/// <reference path="ILifecycleListenerWarning.d.ts" />
/// <reference path="Lifecycle.d.ts" />
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
       Interface for Managing the Lifecycle listeners
       Auto-generated implementation of ILifecycleListener specification.
    */
    /**
       @property {Adaptive.Dictionary} registeredLifecycleListener
       @member Adaptive
       @private
       LifecycleListener control dictionary.
    */
    var registeredLifecycleListener: Dictionary<ILifecycleListener>;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.ILifecycleListenerError} error
    */
    function handleLifecycleListenerError(id: number, error: ILifecycleListenerError): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Lifecycle} lifecycle
    */
    function handleLifecycleListenerResult(id: number, lifecycle: Lifecycle): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Lifecycle} lifecycle
       @param {Adaptive.ILifecycleListenerWarning} warning
    */
    function handleLifecycleListenerWarning(id: number, lifecycle: Lifecycle, warning: ILifecycleListenerWarning): void;
    /**
       @class Adaptive.LifecycleListener
       @extends Adaptive.BaseListener
    */
    class LifecycleListener extends BaseListener implements ILifecycleListener {
        /**
           @private
           @property
        */
        onErrorFunction: (error: ILifecycleListenerError) => void;
        /**
           @private
           @property
        */
        onResultFunction: (lifecycle: Lifecycle) => void;
        /**
           @private
           @property
        */
        onWarningFunction: (lifecycle: Lifecycle, warning: ILifecycleListenerWarning) => void;
        /**
           @method constructor
           Constructor with anonymous handler functions for listener.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.ILifecycleListenerError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.Lifecycle
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.Lifecycle, Adaptive.ILifecycleListenerWarning
        */
        constructor(onErrorFunction: (error: ILifecycleListenerError) => void, onResultFunction: (lifecycle: Lifecycle) => void, onWarningFunction: (lifecycle: Lifecycle, warning: ILifecycleListenerWarning) => void);
        /**
           @method
           No data received - error condition, not authorized or hardware not available.
           @param {Adaptive.ILifecycleListenerError} error error Type of error encountered during reading.
           @since v2.0
        */
        onError(error: ILifecycleListenerError): void;
        /**
           @method
           Called when lifecycle changes somehow.
           @param {Adaptive.Lifecycle} lifecycle lifecycle Lifecycle element
           @since v2.0
        */
        onResult(lifecycle: Lifecycle): void;
        /**
           @method
           Data received with warning
           @param {Adaptive.Lifecycle} lifecycle lifecycle Lifecycle element
           @param {Adaptive.ILifecycleListenerWarning} warning warning   Type of warning encountered during reading.
           @since v2.0
        */
        onWarning(lifecycle: Lifecycle, warning: ILifecycleListenerWarning): void;
    }
}
