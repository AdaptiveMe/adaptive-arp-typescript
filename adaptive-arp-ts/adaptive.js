var __extends = this.__extends || function (d, b) {
    for (var p in b) { if (b.hasOwnProperty(p)) { d[p] = b[p]; } }
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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

    * @version v2.2.12

-------------------------------------------| aut inveniam viam aut faciam |--------------------------------------------
*/
var Adaptive;
(function (Adaptive) {
    /**
       @private
       @property {number} registeredCounter
       Global unique id for listeners and callbacks.
    */
    Adaptive.registeredCounter = 0;
    /**
       @private
       @property {string} bridgePath
       Base url used internally to POST and intercept JSON requests by the platform.
    */
    Adaptive.bridgePath = "https://adaptiveapp";
    /**
       @private
       @property {string} bridgeApiVersion
       The Adaptive Runtime Platform API specification version.
    */
    Adaptive.bridgeApiVersion = "v2.2.12";
    /**
       @private
       @class Adaptive.Dictionary
       Utility class for Dictionary type support.
    */
    var Dictionary = (function () {
        function Dictionary(init) {
            this._keys = new Array();
            this._values = new Array();
            for (var x = 0; x < init.length; x++) {
                this[init[x].key] = init[x].value;
                this._keys.push(init[x].key);
                this._values.push(init[x].value);
            }
        }
        Dictionary.prototype.add = function (key, value) {
            this[key] = value;
            this._keys.push(key);
            this._values.push(value);
        };
        Dictionary.prototype.remove = function (key) {
            var index = this._keys.indexOf(key, 0);
            this._keys.splice(index, 1);
            this._values.splice(index, 1);
            delete this[key];
        };
        Dictionary.prototype.removeAll = function () {
            this._keys = new Array();
            this._values = new Array();
        };
        Dictionary.prototype.keys = function () {
            return this._keys;
        };
        Dictionary.prototype.values = function () {
            return this._values;
        };
        Dictionary.prototype.containsKey = function (key) {
            if (typeof this[key] === "undefined") {
                return false;
            }
            return true;
        };
        Dictionary.prototype.toLookup = function () {
            return this;
        };
        return Dictionary;
    })();
    Adaptive.Dictionary = Dictionary;
    /**
       @private
       @param {Adaptive.APIRequest} apiRequest the request to be processed.
       @param {Adaptive.IBaseListener} listener to add or remove from the dictionary or null if removing all listeners.
       @param {Adaptive.Dictionary} listenerDictionary dictionary of listeners for the operation.
       @since v2.1.10
       Send request for methods that manage listeners.
    */
    function postRequestListener(apiRequest, listener, listenerDictionary) {
        apiRequest.setApiVersion(Adaptive.bridgeApiVersion);
        var apiResponse = new APIResponse("", 200, "");
        // Create and send JSON request.
        var xhr = new XMLHttpRequest();
        xhr.open("POST", Adaptive.bridgePath, false);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        if (apiRequest.getMethodName().indexOf("add") > -1) {
            // Add listener reference to local dictionary.
            listenerDictionary.add("" + listener.getId(), listener);
        }
        if (typeof window['quirksMode'] !== "undefined") {
            xhr.setRequestHeader("Content-Body", JSON.stringify(apiRequest));
            xhr.send();
        }
        else {
            xhr.send(JSON.stringify(apiRequest));
        }
        // Check response.
        if (xhr.status === 200) {
            if (xhr.responseText != null && xhr.responseText !== '') {
                apiResponse = APIResponse.toObject(JSON.parse(xhr.responseText));
                if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    manageRequestListener(apiRequest, listener, listenerDictionary, false);
                }
                else {
                    manageRequestListener(apiRequest, listener, listenerDictionary, true);
                    console.error("ERROR: " + apiResponse.getStatusCode() + " receiving response in '" + apiRequest.getBridgeType() + "." + apiRequest.getMethodName() + "' [" + apiResponse.getStatusMessage() + "].");
                }
            }
            else {
                manageRequestListener(apiRequest, listener, listenerDictionary, true);
                console.error("ERROR: '" + apiRequest.getBridgeType() + "." + apiRequest.getMethodName() + "' incorrect response received.");
            }
        }
        else {
            manageRequestListener(apiRequest, listener, listenerDictionary, true);
            console.error("ERROR: " + xhr.status + " sending '" + apiRequest.getBridgeType() + "." + apiRequest.getMethodName() + "' request.");
        }
    }
    Adaptive.postRequestListener = postRequestListener;
    function manageRequestListener(apiRequest, listener, listenerDictionary, isError) {
        if (apiRequest.getMethodName().indexOf("remove") > -1 && apiRequest.getMethodName().indexOf("Listeners") === -1) {
            listenerDictionary.remove("" + listener.getId());
        }
        else if (apiRequest.getMethodName().indexOf("remove") > -1 && apiRequest.getMethodName().indexOf("Listeners") > -1) {
            listenerDictionary.removeAll();
        }
        else if (isError && apiRequest.getMethodName().indexOf("add") > -1) {
            listenerDictionary.remove("" + listener.getId());
        }
    }
    Adaptive.manageRequestListener = manageRequestListener;
    /**
       @private
       @param {Adaptive.APIRequest} apiRequest the request to be processed.
       @param {Adaptive.IBaseCallback} callback to receive responses.
       @param {Adaptive.Dictionary} callbackDictionary dictionary of callbacks for the operation.
       @since v2.1.10
       Send request for methods that use callbacks.
    */
    function postRequestCallback(apiRequest, callback, callbackDictionary) {
        apiRequest.setApiVersion(Adaptive.bridgeApiVersion);
        var apiResponse = new APIResponse("", 200, "");
        // Create and send JSON request.
        var xhr = new XMLHttpRequest();
        xhr.open("POST", Adaptive.bridgePath, false);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        // Add callback reference to local dictionary.
        callbackDictionary.add("" + callback.getId(), callback);
        if (typeof window['quirksMode'] !== "undefined") {
            xhr.setRequestHeader("Content-Body", JSON.stringify(apiRequest));
            xhr.send();
        }
        else {
            xhr.send(JSON.stringify(apiRequest));
        }
        // Check response.
        if (xhr.status === 200) {
            if (xhr.responseText != null && xhr.responseText !== '') {
                apiResponse = APIResponse.toObject(JSON.parse(xhr.responseText));
                if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                }
                else {
                    // Remove callback reference from local dictionary due to invalid response.
                    callbackDictionary.remove("" + callback.getId());
                    console.error("ERROR: " + apiResponse.getStatusCode() + " receiving response in '" + apiRequest.getBridgeType() + "." + apiRequest.getMethodName() + "' [" + apiResponse.getStatusMessage() + "].");
                }
            }
            else {
                // Remove callback reference from local dictionary due to invalid response.
                callbackDictionary.remove("" + callback.getId());
                console.error("ERROR: '" + apiRequest.getBridgeType() + "." + apiRequest.getMethodName() + "' incorrect response received.");
            }
        }
        else {
            // Unknown error - remove from dictionary.
            callbackDictionary.remove("" + callback.getId());
            console.error("ERROR: " + xhr.status + " sending '" + apiRequest.getBridgeType() + "." + apiRequest.getMethodName() + "' request.");
        }
    }
    Adaptive.postRequestCallback = postRequestCallback;
    /**
       @private
       @param {Adaptive.APIRequest} apiRequest the request to be processed.
       @return {Adaptive.APIResponse} Response to the request.
       @since v2.1.10
       Send request and receives responses synchronously.
    */
    function postRequest(apiRequest) {
        apiRequest.setApiVersion(Adaptive.bridgeApiVersion);
        var apiResponse = new APIResponse("", 200, "");
        // Create and send JSON request.
        var xhr = new XMLHttpRequest();
        xhr.open("POST", Adaptive.bridgePath, false);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        if (typeof window['quirksMode'] !== "undefined") {
            xhr.setRequestHeader("Content-Body", JSON.stringify(apiRequest));
            xhr.send();
        }
        else {
            xhr.send(JSON.stringify(apiRequest));
        }
        // Check response.
        if (xhr.status === 200) {
            if (xhr.responseText != null && xhr.responseText !== '') {
                apiResponse = APIResponse.toObject(JSON.parse(xhr.responseText));
                if (apiResponse != null && apiResponse.getStatusCode() !== 200) {
                    console.error("ERROR: " + apiResponse.getStatusCode() + " receiving response in '" + apiRequest.getBridgeType() + "." + apiRequest.getMethodName() + "' [" + apiResponse.getStatusMessage() + "].");
                }
            }
            else {
                apiResponse = new APIResponse("", 400, "");
                console.error("ERROR: '" + apiRequest.getBridgeType() + "." + apiRequest.getMethodName() + "' incorrect response received.");
            }
        }
        else {
            apiResponse = new APIResponse("", xhr.status, "");
            console.error("ERROR: " + xhr.status + " sending '" + apiRequest.getBridgeType() + "." + apiRequest.getMethodName() + "' request.");
        }
        return apiResponse;
    }
    Adaptive.postRequest = postRequest;
    /**
       @class Adaptive.APIBean
       Structure representing a native response to the HTML5

       @author Carlos Lozano Diez
       @since v2.0
       @version 1.0
    */
    var APIBean = (function () {
        /**
           @method constructor
           Default constructor

           @since v2.0
        */
        function APIBean() {
        }
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.APIBean.
           @return {Adaptive.APIBean} Wrapped object instance.
        */
        APIBean.toObject = function (object) {
            var result = new APIBean();
            if (object != null) {
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.APIBean[].
           @return {Adaptive.APIBean[]} Wrapped object array instance.
        */
        APIBean.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(APIBean.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return APIBean;
    })();
    Adaptive.APIBean = APIBean;
    /**
       @class Adaptive.APIRequest
       Structure representing a HTML5 request to the native API.

       @author Carlos Lozano Diez
       @since v2.0
       @version 1.0
    */
    var APIRequest = (function () {
        /**
           @method constructor
           Constructor with all the parameters

           @param {string} bridgeType Name of the bridge to be invoked.
           @param {string} methodName Name of the method
           @param {string[]} parameters Array of parameters as JSON formatted strings.
           @param {number} asyncId    Id of callback or listener or zero if none for synchronous calls.
           @since v2.0
        */
        function APIRequest(bridgeType, methodName, parameters, asyncId) {
            this.bridgeType = bridgeType;
            this.methodName = methodName;
            this.parameters = parameters;
            this.asyncId = asyncId;
        }
        Object.defineProperty(APIRequest.prototype, "apiVersionProperty", {
            /**
               @property {string} apiVersion
               Identifier of API version of this request. The 'apiVersionProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'apiVersion'.
            */
            get: function () {
                return this.apiVersion;
            },
            set: function (apiVersion) {
                this.apiVersion = apiVersion;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(APIRequest.prototype, "asyncIdProperty", {
            /**
               @property {number} asyncId
               Identifier of callback or listener for async operations. The 'asyncIdProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'asyncId'.
            */
            get: function () {
                return this.asyncId;
            },
            set: function (asyncId) {
                this.asyncId = asyncId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(APIRequest.prototype, "bridgeTypeProperty", {
            /**
               @property {string} bridgeType
               String representing the bridge type to obtain. The 'bridgeTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'bridgeType'.
            */
            get: function () {
                return this.bridgeType;
            },
            set: function (bridgeType) {
                this.bridgeType = bridgeType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(APIRequest.prototype, "methodNameProperty", {
            /**
               @property {string} methodName
               String representing the method name to call. The 'methodNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'methodName'.
            */
            get: function () {
                return this.methodName;
            },
            set: function (methodName) {
                this.methodName = methodName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(APIRequest.prototype, "parametersProperty", {
            /**
               @property {string[]} parameters
               Parameters of the request as JSON formatted strings. The 'parametersProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'parameters'.
            */
            get: function () {
                return this.parameters;
            },
            set: function (parameters) {
                this.parameters = parameters;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the request's API version. This should be the same or higher than the platform managing the
request.

           @return {string} String with the API version of the request.
        */
        APIRequest.prototype.getApiVersion = function () {
            return this.apiVersion;
        };
        /**
           @method
           Sets the request's API version. This should be the same or higher than the platform managing the
request.

           @param {string} apiVersion String with the API version of the request.
        */
        APIRequest.prototype.setApiVersion = function (apiVersion) {
            this.apiVersion = apiVersion;
        };
        /**
           @method
           Returns the callback or listener id assigned to this request OR zero if there is no associated callback or
listener.

           @return {number} long with the unique id of the callback or listener, or zero if there is no associated async event.
        */
        APIRequest.prototype.getAsyncId = function () {
            return this.asyncId;
        };
        /**
           @method
           Sets the callback or listener id to the request.

           @param {number} asyncId The unique id of the callback or listener.
        */
        APIRequest.prototype.setAsyncId = function (asyncId) {
            this.asyncId = asyncId;
        };
        /**
           @method
           Bridge Type Getter

           @return {string} Bridge Type
           @since v2.0
        */
        APIRequest.prototype.getBridgeType = function () {
            return this.bridgeType;
        };
        /**
           @method
           Bridge Type Setter

           @param {string} bridgeType Bridge Type
           @since v2.0
        */
        APIRequest.prototype.setBridgeType = function (bridgeType) {
            this.bridgeType = bridgeType;
        };
        /**
           @method
           Method name Getter

           @return {string} Method name
           @since v2.0
        */
        APIRequest.prototype.getMethodName = function () {
            return this.methodName;
        };
        /**
           @method
           Method name Setter

           @param {string} methodName Method name
           @since v2.0
        */
        APIRequest.prototype.setMethodName = function (methodName) {
            this.methodName = methodName;
        };
        /**
           @method
           Parameters Getter

           @return {string[]} Parameters
           @since v2.0
        */
        APIRequest.prototype.getParameters = function () {
            return this.parameters;
        };
        /**
           @method
           Parameters Setter

           @param {string[]} parameters Parameters, JSON formatted strings of objects.
           @since v2.0
        */
        APIRequest.prototype.setParameters = function (parameters) {
            this.parameters = parameters;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.APIRequest.
           @return {Adaptive.APIRequest} Wrapped object instance.
        */
        APIRequest.toObject = function (object) {
            var result = new APIRequest(null, null, null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.bridgeType = object.bridgeType;
                result.methodName = object.methodName;
                if (object.parameters != null) {
                    result.parameters = new Array();
                    for (var iparameters = 0; iparameters < object.parameters.length; iparameters++) {
                        var vparameters = object.parameters[iparameters];
                        result.parameters.push(vparameters);
                    }
                }
                result.asyncId = object.asyncId;
                result.apiVersion = object.apiVersion;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.APIRequest[].
           @return {Adaptive.APIRequest[]} Wrapped object array instance.
        */
        APIRequest.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(APIRequest.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return APIRequest;
    })();
    Adaptive.APIRequest = APIRequest;
    /**
       @class Adaptive.APIResponse
       Structure representing a JSON response to the HTML5 layer.

       @author Carlos Lozano Diez
       @since v2.0
       @version 1.0
    */
    var APIResponse = (function () {
        /**
           @method constructor
           Constructor with parameters.

           @param {string} response      String representing the JavaScript value or JSON object representation of the response.
           @param {number} statusCode    Status code of the response (200 = OK, others are warning or error conditions).
           @param {string} statusMessage Status message of the response.
        */
        function APIResponse(response, statusCode, statusMessage) {
            this.response = response;
            this.statusCode = statusCode;
            this.statusMessage = statusMessage;
        }
        Object.defineProperty(APIResponse.prototype, "responseProperty", {
            /**
               @property {string} response
               String representing the JavaScript value or JSON object representation of the response. The 'responseProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'response'.
            */
            get: function () {
                return this.response;
            },
            set: function (response) {
                this.response = response;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(APIResponse.prototype, "statusCodeProperty", {
            /**
               @property {number} statusCode
               Status code of the response The 'statusCodeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'statusCode'.
            */
            get: function () {
                return this.statusCode;
            },
            set: function (statusCode) {
                this.statusCode = statusCode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(APIResponse.prototype, "statusMessageProperty", {
            /**
               @property {string} statusMessage
               Status message of the response The 'statusMessageProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'statusMessage'.
            */
            get: function () {
                return this.statusMessage;
            },
            set: function (statusMessage) {
                this.statusMessage = statusMessage;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Response getter

           @return {string} String representing the JavaScript value or JSON object representation of the response.
           @since v2.0
        */
        APIResponse.prototype.getResponse = function () {
            return this.response;
        };
        /**
           @method
           Response setter

           @param {string} response String representing the JavaScript value or JSON object representation of the response.
        */
        APIResponse.prototype.setResponse = function (response) {
            this.response = response;
        };
        /**
           @method
           Status code getter

           @return {number} Status code of the response (200 = OK, others are warning or error conditions).
        */
        APIResponse.prototype.getStatusCode = function () {
            return this.statusCode;
        };
        /**
           @method
           Status code setter

           @param {number} statusCode Status code of the response  (200 = OK, others are warning or error conditions).
        */
        APIResponse.prototype.setStatusCode = function (statusCode) {
            this.statusCode = statusCode;
        };
        /**
           @method
           Status message getter

           @return {string} Status message of the response.
        */
        APIResponse.prototype.getStatusMessage = function () {
            return this.statusMessage;
        };
        /**
           @method
           Status message setter.

           @param {string} statusMessage Status message of the response
        */
        APIResponse.prototype.setStatusMessage = function (statusMessage) {
            this.statusMessage = statusMessage;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.APIResponse.
           @return {Adaptive.APIResponse} Wrapped object instance.
        */
        APIResponse.toObject = function (object) {
            var result = new APIResponse(null, null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.response = object.response;
                result.statusCode = object.statusCode;
                result.statusMessage = object.statusMessage;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.APIResponse[].
           @return {Adaptive.APIResponse[]} Wrapped object array instance.
        */
        APIResponse.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(APIResponse.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return APIResponse;
    })();
    Adaptive.APIResponse = APIResponse;
    /**
       @class Adaptive.AppResourceData
       This class represents a resource provided by the platform from the application's secure payload.

       @author Carlos Lozano Diez
       @since v2.1.3
       @version 1.0
    */
    var AppResourceData = (function () {
        /**
           @method constructor
           Convenience constructor.

           @param {string} id           The id or path of the resource retrieved.
           @param {number[]} data         The payload data of the resource (uncooked).
           @param {string} rawType      The raw type/mimetype of the resource.
           @param {number} rawLength    The raw length/original length in bytes of the resource.
           @param {boolean} cooked       True if the resource is cooked.
           @param {string} cookedType   Type of recipe used for cooking.
           @param {number} cookedLength The cooked length in bytes of the resource.
           @since v2.1.3
        */
        function AppResourceData(id, data, rawType, rawLength, cooked, cookedType, cookedLength) {
            this.id = id;
            this.data = data;
            this.rawType = rawType;
            this.rawLength = rawLength;
            this.cooked = cooked;
            this.cookedType = cookedType;
            this.cookedLength = cookedLength;
        }
        Object.defineProperty(AppResourceData.prototype, "cookedProperty", {
            /**
               @property {boolean} cooked
               Marker to indicate whether the resource is cooked in some way (compressed, encrypted, etc.) If true, the
  implementation must uncompress/unencrypt following the cookedType recipe specified by the payload. The 'cookedProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'cooked'.
            */
            get: function () {
                return this.cooked;
            },
            set: function (cooked) {
                this.cooked = cooked;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppResourceData.prototype, "cookedLengthProperty", {
            /**
               @property {number} cookedLength
               This is the length of the payload after cooking. In general, this length indicates the amount
  of space saved with regard to the rawLength of the payload. The 'cookedLengthProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'cookedLength'.
            */
            get: function () {
                return this.cookedLength;
            },
            set: function (cookedLength) {
                this.cookedLength = cookedLength;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppResourceData.prototype, "cookedTypeProperty", {
            /**
               @property {string} cookedType
               If the data is cooked, this field should contain the recipe to return the cooked data to its original
  uncompressed/unencrypted/etc format. The 'cookedTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'cookedType'.
            */
            get: function () {
                return this.cookedType;
            },
            set: function (cookedType) {
                this.cookedType = cookedType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppResourceData.prototype, "dataProperty", {
            /**
               @property {number[]} data
               The payload data of the resource in ready to consume format. The 'dataProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'data'.
            */
            get: function () {
                return this.data;
            },
            set: function (data) {
                this.data = data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppResourceData.prototype, "idProperty", {
            /**
               @property {string} id
               The id or path identifier of the resource. The 'idProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'id'.
            */
            get: function () {
                return this.id;
            },
            set: function (id) {
                this.id = id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppResourceData.prototype, "rawLengthProperty", {
            /**
               @property {number} rawLength
               The raw length of the payload before any cooking occurred. This is equivalent to the size of the resource
  after uncompressing and unencrypting. The 'rawLengthProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'rawLength'.
            */
            get: function () {
                return this.rawLength;
            },
            set: function (rawLength) {
                this.rawLength = rawLength;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppResourceData.prototype, "rawTypeProperty", {
            /**
               @property {string} rawType
               The raw type of the payload - this is equivalent to the mimetype of the content. The 'rawTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'rawType'.
            */
            get: function () {
                return this.rawType;
            },
            set: function (rawType) {
                this.rawType = rawType;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Attribute to denote whether the payload of the resource is cooked.

           @return {boolean} True if the resource is cooked, false otherwise.
           @since v2.1.3
        */
        AppResourceData.prototype.getCooked = function () {
            return this.cooked;
        };
        /**
           @method
           Attribute to denote whether the payload of the resource is cooked.

           @param {boolean} cooked True if the resource is cooked, false otherwise.
           @since v2.1.3
        */
        AppResourceData.prototype.setCooked = function (cooked) {
            this.cooked = cooked;
        };
        /**
           @method
           The length in bytes of the payload after cooking.

           @return {number} Length in bytes of cooked payload.
           @since v2.1.3
        */
        AppResourceData.prototype.getCookedLength = function () {
            return this.cookedLength;
        };
        /**
           @method
           The length in bytes of the payload after cooking.

           @param {number} cookedLength Length in bytes of cooked payload.
           @since v2.1.3
        */
        AppResourceData.prototype.setCookedLength = function (cookedLength) {
            this.cookedLength = cookedLength;
        };
        /**
           @method
           If the resource is cooked, this will return the recipe used during cooking.

           @return {string} The cooking recipe to reverse the cooking process.
           @since v2.1.3
        */
        AppResourceData.prototype.getCookedType = function () {
            return this.cookedType;
        };
        /**
           @method
           If the resource is cooked, the type of recipe used during cooking.

           @param {string} cookedType The cooking recipe used during cooking.
           @since v2.1.3
        */
        AppResourceData.prototype.setCookedType = function (cookedType) {
            this.cookedType = cookedType;
        };
        /**
           @method
           Returns the payload of the resource.

           @return {number[]} Binary payload of the resource.
           @since v2.1.3
        */
        AppResourceData.prototype.getData = function () {
            return this.data;
        };
        /**
           @method
           Sets the payload of the resource.

           @param {number[]} data Binary payload of the resource.
           @since v2.1.3
        */
        AppResourceData.prototype.setData = function (data) {
            this.data = data;
        };
        /**
           @method
           Gets The id or path identifier of the resource.

           @return {string} id The id or path identifier of the resource.
        */
        AppResourceData.prototype.getId = function () {
            return this.id;
        };
        /**
           @method
           Sets the id or path of the resource.

           @param {string} id The id or path of the resource.
           @since v2.1.3
        */
        AppResourceData.prototype.setId = function (id) {
            this.id = id;
        };
        /**
           @method
           Gets the resource payload's original length.

           @return {number} Original length of the resource in bytes before cooking.
           @since v2.1.3
        */
        AppResourceData.prototype.getRawLength = function () {
            return this.rawLength;
        };
        /**
           @method
           Sets the resource payload's original length.

           @param {number} rawLength Original length of the resource in bytes before cooking.
           @since v2.1.3
        */
        AppResourceData.prototype.setRawLength = function (rawLength) {
            this.rawLength = rawLength;
        };
        /**
           @method
           Gets the resource's raw type or mimetype.

           @return {string} Resource's type or mimetype.
           @since v2.1.3
        */
        AppResourceData.prototype.getRawType = function () {
            return this.rawType;
        };
        /**
           @method
           Sets the resource's raw type or mimetype.

           @param {string} rawType Resource's type or mimetype.
           @since v2.1.3
        */
        AppResourceData.prototype.setRawType = function (rawType) {
            this.rawType = rawType;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.AppResourceData.
           @return {Adaptive.AppResourceData} Wrapped object instance.
        */
        AppResourceData.toObject = function (object) {
            var result = new AppResourceData(null, null, null, null, null, null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.id = object.id;
                if (object.data != null) {
                    result.data = new Array();
                    for (var idata = 0; idata < object.data.length; idata++) {
                        var vdata = object.data[idata];
                        result.data.push(vdata);
                    }
                }
                result.rawType = object.rawType;
                result.rawLength = object.rawLength;
                result.cooked = object.cooked;
                result.cookedType = object.cookedType;
                result.cookedLength = object.cookedLength;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.AppResourceData[].
           @return {Adaptive.AppResourceData[]} Wrapped object array instance.
        */
        AppResourceData.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(AppResourceData.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return AppResourceData;
    })();
    Adaptive.AppResourceData = AppResourceData;
    /**
       @class Adaptive.Acceleration
       @extends Adaptive.APIBean
       Structure representing the data of a single acceleration reading.

       @author Carlos Lozano Diez
       @since v2.0
       @version 1.0
    */
    var Acceleration = (function (_super) {
        __extends(Acceleration, _super);
        /**
           @method constructor
           Constructor with fields

           @param {number} x         X Coordinate
           @param {number} y         Y Coordinate
           @param {number} z         Z Coordinate
           @param {number} timestamp Timestamp
           @since v2.0
        */
        function Acceleration(x, y, z, timestamp) {
            _super.call(this);
            this.x = x;
            this.y = y;
            this.z = z;
            this.timestamp = timestamp;
        }
        Object.defineProperty(Acceleration.prototype, "timestampProperty", {
            /**
               @property {number} timestamp
               Timestamp of the acceleration reading. The 'timestampProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'timestamp'.
            */
            get: function () {
                return this.timestamp;
            },
            set: function (timestamp) {
                this.timestamp = timestamp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Acceleration.prototype, "xProperty", {
            /**
               @property {number} x
               X-axis component of the acceleration. The 'xProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'x'.
            */
            get: function () {
                return this.x;
            },
            set: function (x) {
                this.x = x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Acceleration.prototype, "yProperty", {
            /**
               @property {number} y
               Y-axis component of the acceleration. The 'yProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'y'.
            */
            get: function () {
                return this.y;
            },
            set: function (y) {
                this.y = y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Acceleration.prototype, "zProperty", {
            /**
               @property {number} z
               Z-axis component of the acceleration. The 'zProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'z'.
            */
            get: function () {
                return this.z;
            },
            set: function (z) {
                this.z = z;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Timestamp Getter

           @return {number} Timestamp
           @since v2.0
        */
        Acceleration.prototype.getTimestamp = function () {
            return this.timestamp;
        };
        /**
           @method
           Timestamp Setter

           @param {number} timestamp Timestamp
           @since v2.0
        */
        Acceleration.prototype.setTimestamp = function (timestamp) {
            this.timestamp = timestamp;
        };
        /**
           @method
           X Coordinate Getter

           @return {number} X-axis component of the acceleration.
           @since v2.0
        */
        Acceleration.prototype.getX = function () {
            return this.x;
        };
        /**
           @method
           X Coordinate Setter

           @param {number} x X-axis component of the acceleration.
           @since v2.0
        */
        Acceleration.prototype.setX = function (x) {
            this.x = x;
        };
        /**
           @method
           Y Coordinate Getter

           @return {number} Y-axis component of the acceleration.
           @since v2.0
        */
        Acceleration.prototype.getY = function () {
            return this.y;
        };
        /**
           @method
           Y Coordinate Setter

           @param {number} y Y-axis component of the acceleration.
           @since v2.0
        */
        Acceleration.prototype.setY = function (y) {
            this.y = y;
        };
        /**
           @method
           Z Coordinate Getter

           @return {number} Z-axis component of the acceleration.
           @since v2.0
        */
        Acceleration.prototype.getZ = function () {
            return this.z;
        };
        /**
           @method
           Z Coordinate Setter

           @param {number} z Z Coordinate
           @since v2.0
        */
        Acceleration.prototype.setZ = function (z) {
            this.z = z;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Acceleration.
           @return {Adaptive.Acceleration} Wrapped object instance.
        */
        Acceleration.toObject = function (object) {
            var result = new Acceleration(null, null, null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.x = object.x;
                result.y = object.y;
                result.z = object.z;
                result.timestamp = object.timestamp;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Acceleration[].
           @return {Adaptive.Acceleration[]} Wrapped object array instance.
        */
        Acceleration.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(Acceleration.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return Acceleration;
    })(APIBean);
    Adaptive.Acceleration = Acceleration;
    /**
       @class Adaptive.Button
       @extends Adaptive.APIBean
       Structure representing the a physical or logical button on a device.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    var Button = (function (_super) {
        __extends(Button, _super);
        /**
           @method constructor
           Constructor with fields

           @param {Adaptive.ICapabilitiesButton} type Button type.
           @param {number} timestamp Timestamp of the event
           @since v2.0
        */
        function Button(type, timestamp) {
            _super.call(this);
            this.type = type;
            this.timestamp = timestamp;
        }
        Object.defineProperty(Button.prototype, "typeProperty", {
            /**
               @property {Adaptive.ICapabilitiesButton} type
               Button type The 'typeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'type'.
            */
            get: function () {
                return this.type;
            },
            set: function (type) {
                this.type = type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "timestampProperty", {
            /**
               @property {number} timestamp
               Timestamp of the button event. The 'timestampProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'timestamp'.
            */
            get: function () {
                return this.timestamp;
            },
            set: function (timestamp) {
                this.timestamp = timestamp;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the button type

           @return {Adaptive.ICapabilitiesButton} type Button type.
           @since v2.0
        */
        Button.prototype.getType = function () {
            return this.type;
        };
        /**
           @method
           Setter for the button type

           @param {Adaptive.ICapabilitiesButton} type Button Type
           @since v2.0
        */
        Button.prototype.setType = function (type) {
            this.type = type;
        };
        /**
           @method
           Timestamp Getter

           @return {number} Timestamp
           @since v2.2.1
        */
        Button.prototype.getTimestamp = function () {
            return this.timestamp;
        };
        /**
           @method
           Timestamp Setter

           @param {number} timestamp Timestamp
           @since v2.2.1
        */
        Button.prototype.setTimestamp = function (timestamp) {
            this.timestamp = timestamp;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Button.
           @return {Adaptive.Button} Wrapped object instance.
        */
        Button.toObject = function (object) {
            var result = new Button(null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.type = ICapabilitiesButton.toObject(object.type);
                result.timestamp = object.timestamp;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Button[].
           @return {Adaptive.Button[]} Wrapped object array instance.
        */
        Button.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(Button.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return Button;
    })(APIBean);
    Adaptive.Button = Button;
    /**
       @class Adaptive.ContactAddress
       @extends Adaptive.APIBean
       Structure representing the address data elements of a contact.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    var ContactAddress = (function (_super) {
        __extends(ContactAddress, _super);
        /**
           @method constructor
           Constructor with fields

           @param {string} address Address data.
           @param {Adaptive.ContactAddressType} type    Address type.
           @since v2.0
        */
        function ContactAddress(address, type) {
            _super.call(this);
            this.address = address;
            this.type = type;
        }
        Object.defineProperty(ContactAddress.prototype, "typeProperty", {
            /**
               @property {Adaptive.ContactAddressType} type
               The address type The 'typeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'type'.
            */
            get: function () {
                return this.type;
            },
            set: function (type) {
                this.type = type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactAddress.prototype, "addressProperty", {
            /**
               @property {string} address
               The Contact address The 'addressProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'address'.
            */
            get: function () {
                return this.address;
            },
            set: function (address) {
                this.address = address;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the type of the address

           @return {Adaptive.ContactAddressType} AddressType Address type.
           @since v2.0
        */
        ContactAddress.prototype.getType = function () {
            return this.type;
        };
        /**
           @method
           Set the address type

           @param {Adaptive.ContactAddressType} type Address type.
           @since v2.0
        */
        ContactAddress.prototype.setType = function (type) {
            this.type = type;
        };
        /**
           @method
           Returns the Contact address

           @return {string} address Address data.
           @since v2.0
        */
        ContactAddress.prototype.getAddress = function () {
            return this.address;
        };
        /**
           @method
           Set the address of the Contact

           @param {string} address Address data.
           @since v2.0
        */
        ContactAddress.prototype.setAddress = function (address) {
            this.address = address;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactAddress.
           @return {Adaptive.ContactAddress} Wrapped object instance.
        */
        ContactAddress.toObject = function (object) {
            var result = new ContactAddress(null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.address = object.address;
                result.type = ContactAddressType.toObject(object.type);
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactAddress[].
           @return {Adaptive.ContactAddress[]} Wrapped object array instance.
        */
        ContactAddress.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(ContactAddress.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return ContactAddress;
    })(APIBean);
    Adaptive.ContactAddress = ContactAddress;
    /**
       @class Adaptive.ContactEmail
       @extends Adaptive.APIBean
       Structure representing the email data elements of a contact.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    var ContactEmail = (function (_super) {
        __extends(ContactEmail, _super);
        /**
           @method constructor
           Constructor used by the implementation

           @param {Adaptive.ContactEmailType} type    Type of the email
           @param {boolean} primary Is email primary
           @param {string} email   Email of the contact
           @since v2.0
        */
        function ContactEmail(type, primary, email) {
            _super.call(this);
            this.type = type;
            this.primary = primary;
            this.email = email;
        }
        Object.defineProperty(ContactEmail.prototype, "typeProperty", {
            /**
               @property {Adaptive.ContactEmailType} type
               The type of the email The 'typeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'type'.
            */
            get: function () {
                return this.type;
            },
            set: function (type) {
                this.type = type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactEmail.prototype, "emailProperty", {
            /**
               @property {string} email
               Email of the Contact The 'emailProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'email'.
            */
            get: function () {
                return this.email;
            },
            set: function (email) {
                this.email = email;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactEmail.prototype, "primaryProperty", {
            /**
               @property {boolean} primary
               Whether the email is the primary one or not The 'primaryProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'primary'.
            */
            get: function () {
                return this.primary;
            },
            set: function (primary) {
                this.primary = primary;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the type of the email

           @return {Adaptive.ContactEmailType} EmailType
           @since v2.0
        */
        ContactEmail.prototype.getType = function () {
            return this.type;
        };
        /**
           @method
           Set the type of the email

           @param {Adaptive.ContactEmailType} type Type of the email
           @since v2.0
        */
        ContactEmail.prototype.setType = function (type) {
            this.type = type;
        };
        /**
           @method
           Returns the email of the Contact

           @return {string} email
           @since v2.0
        */
        ContactEmail.prototype.getEmail = function () {
            return this.email;
        };
        /**
           @method
           Set the email of the Contact

           @param {string} email Email of the contact
           @since v2.0
        */
        ContactEmail.prototype.setEmail = function (email) {
            this.email = email;
        };
        /**
           @method
           Returns if the email is primary

           @return {boolean} true if the email is primary; false otherwise
           @since v2.0
        */
        ContactEmail.prototype.getPrimary = function () {
            return this.primary;
        };
        /**
           @method
           Set if the email

           @param {boolean} primary true if the email is primary; false otherwise
           @since v2.0
        */
        ContactEmail.prototype.setPrimary = function (primary) {
            this.primary = primary;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactEmail.
           @return {Adaptive.ContactEmail} Wrapped object instance.
        */
        ContactEmail.toObject = function (object) {
            var result = new ContactEmail(null, null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.type = ContactEmailType.toObject(object.type);
                result.primary = object.primary;
                result.email = object.email;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactEmail[].
           @return {Adaptive.ContactEmail[]} Wrapped object array instance.
        */
        ContactEmail.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(ContactEmail.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return ContactEmail;
    })(APIBean);
    Adaptive.ContactEmail = ContactEmail;
    /**
       @class Adaptive.ContactPersonalInfo
       @extends Adaptive.APIBean
       Structure representing the personal info data elements of a contact.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    var ContactPersonalInfo = (function (_super) {
        __extends(ContactPersonalInfo, _super);
        /**
           @method constructor
           The Constructor used by the implementation

           @param {string} name       of the Contact
           @param {string} middleName of the Contact
           @param {string} lastName   of the Contact
           @param {Adaptive.ContactPersonalInfoTitle} title      of the Contact
           @since v2.0
        */
        function ContactPersonalInfo(name, middleName, lastName, title) {
            _super.call(this);
            this.name = name;
            this.middleName = middleName;
            this.lastName = lastName;
            this.title = title;
        }
        Object.defineProperty(ContactPersonalInfo.prototype, "titleProperty", {
            /**
               @property {Adaptive.ContactPersonalInfoTitle} title
               The title of the Contact The 'titleProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'title'.
            */
            get: function () {
                return this.title;
            },
            set: function (title) {
                this.title = title;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactPersonalInfo.prototype, "lastNameProperty", {
            /**
               @property {string} lastName
               The last name of the Contact The 'lastNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'lastName'.
            */
            get: function () {
                return this.lastName;
            },
            set: function (lastName) {
                this.lastName = lastName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactPersonalInfo.prototype, "middleNameProperty", {
            /**
               @property {string} middleName
               The middle name of the Contact if it proceeds The 'middleNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'middleName'.
            */
            get: function () {
                return this.middleName;
            },
            set: function (middleName) {
                this.middleName = middleName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactPersonalInfo.prototype, "nameProperty", {
            /**
               @property {string} name
               The name of the Contact The 'nameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'name'.
            */
            get: function () {
                return this.name;
            },
            set: function (name) {
                this.name = name;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the title of the Contact

           @return {Adaptive.ContactPersonalInfoTitle} Title
           @since v2.0
        */
        ContactPersonalInfo.prototype.getTitle = function () {
            return this.title;
        };
        /**
           @method
           Set the Title of the Contact

           @param {Adaptive.ContactPersonalInfoTitle} title of the Contact
           @since v2.0
        */
        ContactPersonalInfo.prototype.setTitle = function (title) {
            this.title = title;
        };
        /**
           @method
           Returns the last name of the Contact

           @return {string} lastName
           @since v2.0
        */
        ContactPersonalInfo.prototype.getLastName = function () {
            return this.lastName;
        };
        /**
           @method
           Set the last name of the Contact

           @param {string} lastName of the Contact
           @since v2.0
        */
        ContactPersonalInfo.prototype.setLastName = function (lastName) {
            this.lastName = lastName;
        };
        /**
           @method
           Returns the middle name of the Contact

           @return {string} middelName
           @since v2.0
        */
        ContactPersonalInfo.prototype.getMiddleName = function () {
            return this.middleName;
        };
        /**
           @method
           Set the middle name of the Contact

           @param {string} middleName of the Contact
           @since v2.0
        */
        ContactPersonalInfo.prototype.setMiddleName = function (middleName) {
            this.middleName = middleName;
        };
        /**
           @method
           Returns the name of the Contact

           @return {string} name
           @since v2.0
        */
        ContactPersonalInfo.prototype.getName = function () {
            return this.name;
        };
        /**
           @method
           Set the name of the Contact

           @param {string} name of the Contact
           @since v2.0
        */
        ContactPersonalInfo.prototype.setName = function (name) {
            this.name = name;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactPersonalInfo.
           @return {Adaptive.ContactPersonalInfo} Wrapped object instance.
        */
        ContactPersonalInfo.toObject = function (object) {
            var result = new ContactPersonalInfo(null, null, null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.name = object.name;
                result.middleName = object.middleName;
                result.lastName = object.lastName;
                result.title = ContactPersonalInfoTitle.toObject(object.title);
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactPersonalInfo[].
           @return {Adaptive.ContactPersonalInfo[]} Wrapped object array instance.
        */
        ContactPersonalInfo.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(ContactPersonalInfo.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return ContactPersonalInfo;
    })(APIBean);
    Adaptive.ContactPersonalInfo = ContactPersonalInfo;
    /**
       @class Adaptive.ContactPhone
       @extends Adaptive.APIBean
       Structure representing the phone data elements of a contact.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    var ContactPhone = (function (_super) {
        __extends(ContactPhone, _super);
        /**
           @method constructor
           Constructor used by implementation to set the contact Phone

           @param {string} phone     Phone number
           @param {Adaptive.ContactPhoneType} phoneType Type of Phone number
           @since v2.0
        */
        function ContactPhone(phone, phoneType) {
            _super.call(this);
            this.phone = phone;
            this.phoneType = phoneType;
        }
        Object.defineProperty(ContactPhone.prototype, "phoneTypeProperty", {
            /**
               @property {Adaptive.ContactPhoneType} phoneType
               The phone number phoneType The 'phoneTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'phoneType'.
            */
            get: function () {
                return this.phoneType;
            },
            set: function (phoneType) {
                this.phoneType = phoneType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactPhone.prototype, "phoneProperty", {
            /**
               @property {string} phone
               The phone number The 'phoneProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'phone'.
            */
            get: function () {
                return this.phone;
            },
            set: function (phone) {
                this.phone = phone;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the phone phoneType

           @return {Adaptive.ContactPhoneType} phoneType
           @since v2.0
        */
        ContactPhone.prototype.getPhoneType = function () {
            return this.phoneType;
        };
        /**
           @method
           Set the phoneType of the phone number

           @param {Adaptive.ContactPhoneType} phoneType Type of Phone number
           @since v2.0
        */
        ContactPhone.prototype.setPhoneType = function (phoneType) {
            this.phoneType = phoneType;
        };
        /**
           @method
           Returns the phone number

           @return {string} phone number
           @since v2.0
        */
        ContactPhone.prototype.getPhone = function () {
            return this.phone;
        };
        /**
           @method
           Set the phone number

           @param {string} phone number
           @since v2.0
        */
        ContactPhone.prototype.setPhone = function (phone) {
            this.phone = phone;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactPhone.
           @return {Adaptive.ContactPhone} Wrapped object instance.
        */
        ContactPhone.toObject = function (object) {
            var result = new ContactPhone(null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.phone = object.phone;
                result.phoneType = ContactPhoneType.toObject(object.phoneType);
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactPhone[].
           @return {Adaptive.ContactPhone[]} Wrapped object array instance.
        */
        ContactPhone.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(ContactPhone.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return ContactPhone;
    })(APIBean);
    Adaptive.ContactPhone = ContactPhone;
    /**
       @class Adaptive.ContactProfessionalInfo
       @extends Adaptive.APIBean
       Structure representing the professional info data elements of a contact.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    var ContactProfessionalInfo = (function (_super) {
        __extends(ContactProfessionalInfo, _super);
        /**
           @method constructor
           Constructor used by implementation to set the ContactProfessionalInfo.

           @param {string} jobTitle       The job title
           @param {string} jobDescription The job description
           @param {string} company        The company of the job
           @since v2.0
        */
        function ContactProfessionalInfo(jobTitle, jobDescription, company) {
            _super.call(this);
            this.jobTitle = jobTitle;
            this.jobDescription = jobDescription;
            this.company = company;
        }
        Object.defineProperty(ContactProfessionalInfo.prototype, "companyProperty", {
            /**
               @property {string} company
               The company of the job The 'companyProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'company'.
            */
            get: function () {
                return this.company;
            },
            set: function (company) {
                this.company = company;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactProfessionalInfo.prototype, "jobDescriptionProperty", {
            /**
               @property {string} jobDescription
               The job description The 'jobDescriptionProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'jobDescription'.
            */
            get: function () {
                return this.jobDescription;
            },
            set: function (jobDescription) {
                this.jobDescription = jobDescription;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactProfessionalInfo.prototype, "jobTitleProperty", {
            /**
               @property {string} jobTitle
               The job title The 'jobTitleProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'jobTitle'.
            */
            get: function () {
                return this.jobTitle;
            },
            set: function (jobTitle) {
                this.jobTitle = jobTitle;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the company of the job

           @return {string} company
           @since v2.0
        */
        ContactProfessionalInfo.prototype.getCompany = function () {
            return this.company;
        };
        /**
           @method
           Set the company of the job

           @param {string} company The company of the job
           @since v2.0
        */
        ContactProfessionalInfo.prototype.setCompany = function (company) {
            this.company = company;
        };
        /**
           @method
           Returns the description of the job

           @return {string} description
           @since v2.0
        */
        ContactProfessionalInfo.prototype.getJobDescription = function () {
            return this.jobDescription;
        };
        /**
           @method
           Set the description of the job

           @param {string} jobDescription The job description
           @since v2.0
        */
        ContactProfessionalInfo.prototype.setJobDescription = function (jobDescription) {
            this.jobDescription = jobDescription;
        };
        /**
           @method
           Returns the title of the job

           @return {string} title
           @since v2.0
        */
        ContactProfessionalInfo.prototype.getJobTitle = function () {
            return this.jobTitle;
        };
        /**
           @method
           Set the title of the job

           @param {string} jobTitle The job title
           @since v2.0
        */
        ContactProfessionalInfo.prototype.setJobTitle = function (jobTitle) {
            this.jobTitle = jobTitle;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactProfessionalInfo.
           @return {Adaptive.ContactProfessionalInfo} Wrapped object instance.
        */
        ContactProfessionalInfo.toObject = function (object) {
            var result = new ContactProfessionalInfo(null, null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.company = object.company;
                result.jobTitle = object.jobTitle;
                result.jobDescription = object.jobDescription;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactProfessionalInfo[].
           @return {Adaptive.ContactProfessionalInfo[]} Wrapped object array instance.
        */
        ContactProfessionalInfo.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(ContactProfessionalInfo.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return ContactProfessionalInfo;
    })(APIBean);
    Adaptive.ContactProfessionalInfo = ContactProfessionalInfo;
    /**
       @class Adaptive.ContactSocial
       @extends Adaptive.APIBean
       Structure representing the social data elements of a contact.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    var ContactSocial = (function (_super) {
        __extends(ContactSocial, _super);
        /**
           @method constructor
           Constructor used by the implementation

           @param {Adaptive.ContactSocialNetwork} socialNetwork of the profile
           @param {string} profileUrl    of the user
           @since v2.0
        */
        function ContactSocial(socialNetwork, profileUrl) {
            _super.call(this);
            this.socialNetwork = socialNetwork;
            this.profileUrl = profileUrl;
        }
        Object.defineProperty(ContactSocial.prototype, "socialNetworkProperty", {
            /**
               @property {Adaptive.ContactSocialNetwork} socialNetwork
               The social network The 'socialNetworkProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'socialNetwork'.
            */
            get: function () {
                return this.socialNetwork;
            },
            set: function (socialNetwork) {
                this.socialNetwork = socialNetwork;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactSocial.prototype, "profileUrlProperty", {
            /**
               @property {string} profileUrl
               The profileUrl The 'profileUrlProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'profileUrl'.
            */
            get: function () {
                return this.profileUrl;
            },
            set: function (profileUrl) {
                this.profileUrl = profileUrl;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the social network

           @return {Adaptive.ContactSocialNetwork} socialNetwork
           @since v2.0
        */
        ContactSocial.prototype.getSocialNetwork = function () {
            return this.socialNetwork;
        };
        /**
           @method
           Set the social network

           @param {Adaptive.ContactSocialNetwork} socialNetwork of the profile
           @since v2.0
        */
        ContactSocial.prototype.setSocialNetwork = function (socialNetwork) {
            this.socialNetwork = socialNetwork;
        };
        /**
           @method
           Returns the profile url of the user

           @return {string} profileUrl
           @since v2.0
        */
        ContactSocial.prototype.getProfileUrl = function () {
            return this.profileUrl;
        };
        /**
           @method
           Set the profile url of the iser

           @param {string} profileUrl of the user
           @since v2.0
        */
        ContactSocial.prototype.setProfileUrl = function (profileUrl) {
            this.profileUrl = profileUrl;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactSocial.
           @return {Adaptive.ContactSocial} Wrapped object instance.
        */
        ContactSocial.toObject = function (object) {
            var result = new ContactSocial(null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.socialNetwork = ContactSocialNetwork.toObject(object.socialNetwork);
                result.profileUrl = object.profileUrl;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactSocial[].
           @return {Adaptive.ContactSocial[]} Wrapped object array instance.
        */
        ContactSocial.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(ContactSocial.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return ContactSocial;
    })(APIBean);
    Adaptive.ContactSocial = ContactSocial;
    /**
       @class Adaptive.ContactTag
       @extends Adaptive.APIBean
       Structure representing the assigned tags data elements of a contact.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    var ContactTag = (function (_super) {
        __extends(ContactTag, _super);
        /**
           @method constructor
           Constructor used by the implementation

           @param {string} tagValue Value of the tag
           @param {string} tagName  Name of the tag
           @since v2.0
        */
        function ContactTag(tagName, tagValue) {
            _super.call(this);
            this.tagName = tagName;
            this.tagValue = tagValue;
        }
        Object.defineProperty(ContactTag.prototype, "tagNameProperty", {
            /**
               @property {string} tagName
               The tagName of the Tag The 'tagNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'tagName'.
            */
            get: function () {
                return this.tagName;
            },
            set: function (tagName) {
                this.tagName = tagName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContactTag.prototype, "tagValueProperty", {
            /**
               @property {string} tagValue
               The tagValue of the Tag The 'tagValueProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'tagValue'.
            */
            get: function () {
                return this.tagValue;
            },
            set: function (tagValue) {
                this.tagValue = tagValue;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the tagName of the Tag

           @return {string} tagName
           @since v2.0
        */
        ContactTag.prototype.getTagName = function () {
            return this.tagName;
        };
        /**
           @method
           Set the tagName of the Tag

           @param {string} tagName Name of the tag
           @since v2.0
        */
        ContactTag.prototype.setTagName = function (tagName) {
            this.tagName = tagName;
        };
        /**
           @method
           Returns the tagValue of the Tag

           @return {string} tagValue
           @since v2.0
        */
        ContactTag.prototype.getTagValue = function () {
            return this.tagValue;
        };
        /**
           @method
           Set the tagValue of the Tag

           @param {string} tagValue Value of the tag
           @since v2.0
        */
        ContactTag.prototype.setTagValue = function (tagValue) {
            this.tagValue = tagValue;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactTag.
           @return {Adaptive.ContactTag} Wrapped object instance.
        */
        ContactTag.toObject = function (object) {
            var result = new ContactTag(null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.tagName = object.tagName;
                result.tagValue = object.tagValue;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactTag[].
           @return {Adaptive.ContactTag[]} Wrapped object array instance.
        */
        ContactTag.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(ContactTag.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return ContactTag;
    })(APIBean);
    Adaptive.ContactTag = ContactTag;
    /**
       @class Adaptive.ContactUid
       @extends Adaptive.APIBean
       Structure representing the internal unique identifier data elements of a contact.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    var ContactUid = (function (_super) {
        __extends(ContactUid, _super);
        /**
           @method constructor
           Constructor used by implementation to set the Contact id.

           @param {string} contactId Internal unique contact id.
           @since v2.0
        */
        function ContactUid(contactId) {
            _super.call(this);
            this.contactId = contactId;
        }
        Object.defineProperty(ContactUid.prototype, "contactIdProperty", {
            /**
               @property {string} contactId
               The id of the Contact The 'contactIdProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactId'.
            */
            get: function () {
                return this.contactId;
            },
            set: function (contactId) {
                this.contactId = contactId;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the contact id

           @return {string} Contactid Internal unique contact id.
           @since v2.0
        */
        ContactUid.prototype.getContactId = function () {
            return this.contactId;
        };
        /**
           @method
           Set the id of the Contact

           @param {string} contactId Internal unique contact id.
           @since v2.0
        */
        ContactUid.prototype.setContactId = function (contactId) {
            this.contactId = contactId;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactUid.
           @return {Adaptive.ContactUid} Wrapped object instance.
        */
        ContactUid.toObject = function (object) {
            var result = new ContactUid(null);
            if (object != null) {
                // Assign values to bean fields.
                result.contactId = object.contactId;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactUid[].
           @return {Adaptive.ContactUid[]} Wrapped object array instance.
        */
        ContactUid.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(ContactUid.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return ContactUid;
    })(APIBean);
    Adaptive.ContactUid = ContactUid;
    /**
       @class Adaptive.ContactWebsite
       @extends Adaptive.APIBean
       Structure representing the website data elements of a contact.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    var ContactWebsite = (function (_super) {
        __extends(ContactWebsite, _super);
        /**
           @method constructor
           Constructor used by the implementation

           @param {string} url Url of the website
           @since v2.0
        */
        function ContactWebsite(url) {
            _super.call(this);
            this.url = url;
        }
        Object.defineProperty(ContactWebsite.prototype, "urlProperty", {
            /**
               @property {string} url
               The url of the website The 'urlProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'url'.
            */
            get: function () {
                return this.url;
            },
            set: function (url) {
                this.url = url;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the url of the website

           @return {string} website url
           @since v2.0
        */
        ContactWebsite.prototype.getUrl = function () {
            return this.url;
        };
        /**
           @method
           Set the url of the website

           @param {string} url Url of the website
           @since v2.0
        */
        ContactWebsite.prototype.setUrl = function (url) {
            this.url = url;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactWebsite.
           @return {Adaptive.ContactWebsite} Wrapped object instance.
        */
        ContactWebsite.toObject = function (object) {
            var result = new ContactWebsite(null);
            if (object != null) {
                // Assign values to bean fields.
                result.url = object.url;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactWebsite[].
           @return {Adaptive.ContactWebsite[]} Wrapped object array instance.
        */
        ContactWebsite.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(ContactWebsite.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return ContactWebsite;
    })(APIBean);
    Adaptive.ContactWebsite = ContactWebsite;
    /**
       @class Adaptive.Database
       @extends Adaptive.APIBean
       Structure representing a database reference.

       @author Ferran Vila Conesa
       @since v2.0
       @version 1.0
    */
    var Database = (function (_super) {
        __extends(Database, _super);
        /**
           @method constructor
           Constructor using fields.

           @param {string} name     Name of the DatabaseTable.
           @param {boolean} compress Compression enabled.
           @since v2.0
        */
        function Database(name, compress) {
            _super.call(this);
            this.name = name;
            this.compress = compress;
        }
        Object.defineProperty(Database.prototype, "compressProperty", {
            /**
               @property {boolean} compress
               Indicates if database was created or needs to be created as Compressed. The 'compressProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'compress'.
            */
            get: function () {
                return this.compress;
            },
            set: function (compress) {
                this.compress = compress;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Database.prototype, "nameProperty", {
            /**
               @property {string} name
               Database Name (name of the .db local file). The 'nameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'name'.
            */
            get: function () {
                return this.name;
            },
            set: function (name) {
                this.name = name;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns if the table is compressed

           @return {boolean} Compression enabled
           @since v2.0
        */
        Database.prototype.getCompress = function () {
            return this.compress;
        };
        /**
           @method
           Sets if the table is compressed or not.

           @param {boolean} compress Compression enabled
           @since v2.0
        */
        Database.prototype.setCompress = function (compress) {
            this.compress = compress;
        };
        /**
           @method
           Returns the name.

           @return {string} The name of the table.
           @since v2.0
        */
        Database.prototype.getName = function () {
            return this.name;
        };
        /**
           @method
           Sets the name of the table.

           @param {string} name The name of the table.
           @since v2.0
        */
        Database.prototype.setName = function (name) {
            this.name = name;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Database.
           @return {Adaptive.Database} Wrapped object instance.
        */
        Database.toObject = function (object) {
            var result = new Database(null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.name = object.name;
                result.compress = object.compress;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Database[].
           @return {Adaptive.Database[]} Wrapped object array instance.
        */
        Database.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(Database.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return Database;
    })(APIBean);
    Adaptive.Database = Database;
    /**
       @class Adaptive.DatabaseColumn
       @extends Adaptive.APIBean
       Structure representing the column specification of a data column.

       @author Ferran Vila Conesa
       @since v2.0
       @version 1.0
    */
    var DatabaseColumn = (function (_super) {
        __extends(DatabaseColumn, _super);
        /**
           @method constructor
           Constructor with fields

           @param {string} name Name of the column
           @since v2.0
        */
        function DatabaseColumn(name) {
            _super.call(this);
            this.name = name;
        }
        Object.defineProperty(DatabaseColumn.prototype, "nameProperty", {
            /**
               @property {string} name
               Name of the column The 'nameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'name'.
            */
            get: function () {
                return this.name;
            },
            set: function (name) {
                this.name = name;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the name of the column.

           @return {string} The name of the column.
           @since v2.0
        */
        DatabaseColumn.prototype.getName = function () {
            return this.name;
        };
        /**
           @method
           Sets the name of the column.

           @param {string} name The name of the column.
           @since v2.0
        */
        DatabaseColumn.prototype.setName = function (name) {
            this.name = name;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.DatabaseColumn.
           @return {Adaptive.DatabaseColumn} Wrapped object instance.
        */
        DatabaseColumn.toObject = function (object) {
            var result = new DatabaseColumn(null);
            if (object != null) {
                // Assign values to bean fields.
                result.name = object.name;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.DatabaseColumn[].
           @return {Adaptive.DatabaseColumn[]} Wrapped object array instance.
        */
        DatabaseColumn.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(DatabaseColumn.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return DatabaseColumn;
    })(APIBean);
    Adaptive.DatabaseColumn = DatabaseColumn;
    /**
       @class Adaptive.DatabaseRow
       @extends Adaptive.APIBean
       Structure representing a row for a data table.

       @author Ferran Vila Conesa
       @since v2.0
       @version 1.0
    */
    var DatabaseRow = (function (_super) {
        __extends(DatabaseRow, _super);
        /**
           @method constructor
           Constructor for implementation using.

           @param {string[]} values The values of the row
           @since v2.0
        */
        function DatabaseRow(values) {
            _super.call(this);
            this.values = values;
        }
        Object.defineProperty(DatabaseRow.prototype, "valuesProperty", {
            /**
               @property {string[]} values
               The values of the row. The 'valuesProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'values'.
            */
            get: function () {
                return this.values;
            },
            set: function (values) {
                this.values = values;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the values of the row.

           @return {string[]} The values of the row.
           @since v2.0
        */
        DatabaseRow.prototype.getValues = function () {
            return this.values;
        };
        /**
           @method
           Sets the values of the row.

           @param {string[]} values The values of the row.
           @since v2.0
        */
        DatabaseRow.prototype.setValues = function (values) {
            this.values = values;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.DatabaseRow.
           @return {Adaptive.DatabaseRow} Wrapped object instance.
        */
        DatabaseRow.toObject = function (object) {
            var result = new DatabaseRow(null);
            if (object != null) {
                // Assign values to bean fields.
                if (object.values != null) {
                    result.values = new Array();
                    for (var ivalues = 0; ivalues < object.values.length; ivalues++) {
                        var vvalues = object.values[ivalues];
                        result.values.push(vvalues);
                    }
                }
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.DatabaseRow[].
           @return {Adaptive.DatabaseRow[]} Wrapped object array instance.
        */
        DatabaseRow.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(DatabaseRow.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return DatabaseRow;
    })(APIBean);
    Adaptive.DatabaseRow = DatabaseRow;
    /**
       @class Adaptive.DatabaseTable
       @extends Adaptive.APIBean
       Represents a data table composed of databaseColumns and databaseRows.

       @author Ferran Vila Conesa
       @since v2.0
       @version 1.0
    */
    var DatabaseTable = (function (_super) {
        __extends(DatabaseTable, _super);
        /**
           @method constructor
           Constructor using fields

           @param {string} name            The name of the table
           @param {number} columnCount     The number of databaseColumns
           @param {number} rowCount        The number of databaseRows
           @param {Adaptive.DatabaseColumn[]} databaseColumns The databaseColumns of the table
           @param {Adaptive.DatabaseRow[]} databaseRows    The databaseRows of the table
           @since v2.0
        */
        function DatabaseTable(name, columnCount, rowCount, databaseColumns, databaseRows) {
            _super.call(this);
            this.name = name;
            this.columnCount = columnCount;
            this.rowCount = rowCount;
            this.databaseColumns = databaseColumns;
            this.databaseRows = databaseRows;
        }
        Object.defineProperty(DatabaseTable.prototype, "columnCountProperty", {
            /**
               @property {number} columnCount
               Number of databaseColumns. The 'columnCountProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'columnCount'.
            */
            get: function () {
                return this.columnCount;
            },
            set: function (columnCount) {
                this.columnCount = columnCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DatabaseTable.prototype, "databaseColumnsProperty", {
            /**
               @property {Adaptive.DatabaseColumn[]} databaseColumns
               Definition of databaseColumns. The 'databaseColumnsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'databaseColumns'.
            */
            get: function () {
                return this.databaseColumns;
            },
            set: function (databaseColumns) {
                this.databaseColumns = databaseColumns;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DatabaseTable.prototype, "databaseRowsProperty", {
            /**
               @property {Adaptive.DatabaseRow[]} databaseRows
               Rows of the table containing the data. The 'databaseRowsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'databaseRows'.
            */
            get: function () {
                return this.databaseRows;
            },
            set: function (databaseRows) {
                this.databaseRows = databaseRows;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DatabaseTable.prototype, "nameProperty", {
            /**
               @property {string} name
               Name of the table. The 'nameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'name'.
            */
            get: function () {
                return this.name;
            },
            set: function (name) {
                this.name = name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DatabaseTable.prototype, "rowCountProperty", {
            /**
               @property {number} rowCount
               Number of databaseRows. The 'rowCountProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'rowCount'.
            */
            get: function () {
                return this.rowCount;
            },
            set: function (rowCount) {
                this.rowCount = rowCount;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Get the number of databaseColumns

           @return {number} The number of databaseColumns
           @since v2.0
        */
        DatabaseTable.prototype.getColumnCount = function () {
            return this.columnCount;
        };
        /**
           @method
           Sets the number of databaseColumns

           @param {number} columnCount The number of databaseColumns
           @since v2.0
        */
        DatabaseTable.prototype.setColumnCount = function (columnCount) {
            this.columnCount = columnCount;
        };
        /**
           @method
           Get the databaseColumns

           @return {Adaptive.DatabaseColumn[]} The databaseColumns
           @since v2.0
        */
        DatabaseTable.prototype.getDatabaseColumns = function () {
            return this.databaseColumns;
        };
        /**
           @method
           Sets the databaseColumns of the table

           @param {Adaptive.DatabaseColumn[]} databaseColumns The databaseColumns of the table
           @since v2.0
        */
        DatabaseTable.prototype.setDatabaseColumns = function (databaseColumns) {
            this.databaseColumns = databaseColumns;
        };
        /**
           @method
           Get the databaseRows of the table

           @return {Adaptive.DatabaseRow[]} The databaseRows of the table
           @since v2.0
        */
        DatabaseTable.prototype.getDatabaseRows = function () {
            return this.databaseRows;
        };
        /**
           @method
           Sets the databaseRows of the table

           @param {Adaptive.DatabaseRow[]} databaseRows The databaseRows of the table
           @since v2.0
        */
        DatabaseTable.prototype.setDatabaseRows = function (databaseRows) {
            this.databaseRows = databaseRows;
        };
        /**
           @method
           Returns the name of the table

           @return {string} The name of the table
           @since v2.0
        */
        DatabaseTable.prototype.getName = function () {
            return this.name;
        };
        /**
           @method
           Sets the name of the table

           @param {string} name The name of the table
           @since v2.0
        */
        DatabaseTable.prototype.setName = function (name) {
            this.name = name;
        };
        /**
           @method
           Get the number of databaseRows

           @return {number} The number of databaseRows
           @since v2.0
        */
        DatabaseTable.prototype.getRowCount = function () {
            return this.rowCount;
        };
        /**
           @method
           Sets the number of databaseRows

           @param {number} rowCount The number of databaseRows
           @since v2.0
        */
        DatabaseTable.prototype.setRowCount = function (rowCount) {
            this.rowCount = rowCount;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.DatabaseTable.
           @return {Adaptive.DatabaseTable} Wrapped object instance.
        */
        DatabaseTable.toObject = function (object) {
            var result = new DatabaseTable(null, null, null, null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.name = object.name;
                result.columnCount = object.columnCount;
                result.rowCount = object.rowCount;
                result.databaseColumns = DatabaseColumn.toObjectArray(object.databaseColumns);
                result.databaseRows = DatabaseRow.toObjectArray(object.databaseRows);
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.DatabaseTable[].
           @return {Adaptive.DatabaseTable[]} Wrapped object array instance.
        */
        DatabaseTable.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(DatabaseTable.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return DatabaseTable;
    })(APIBean);
    Adaptive.DatabaseTable = DatabaseTable;
    /**
       @class Adaptive.DeviceInfo
       @extends Adaptive.APIBean
       Structure representing the basic device information.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    var DeviceInfo = (function (_super) {
        __extends(DeviceInfo, _super);
        /**
           @method constructor
           Constructor for the implementation of the platform.

           @param {string} name   or brand of the device.
           @param {string} model  of the device.
           @param {string} vendor of the device.
           @param {string} uuid   unique* identifier (* platform dependent).
           @since v2.0
        */
        function DeviceInfo(name, model, vendor, uuid) {
            _super.call(this);
            this.name = name;
            this.model = model;
            this.vendor = vendor;
            this.uuid = uuid;
        }
        Object.defineProperty(DeviceInfo.prototype, "modelProperty", {
            /**
               @property {string} model
               Model of device - equivalent to device release or version. The 'modelProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'model'.
            */
            get: function () {
                return this.model;
            },
            set: function (model) {
                this.model = model;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceInfo.prototype, "nameProperty", {
            /**
               @property {string} name
               Name of device - equivalent to brand. The 'nameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'name'.
            */
            get: function () {
                return this.name;
            },
            set: function (name) {
                this.name = name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceInfo.prototype, "uuidProperty", {
            /**
               @property {string} uuid
               Device identifier - this may not be unique for a device. It may depend on the platform implementation and may
  be unique for a specific instance of an application on a specific device. The 'uuidProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'uuid'.
            */
            get: function () {
                return this.uuid;
            },
            set: function (uuid) {
                this.uuid = uuid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceInfo.prototype, "vendorProperty", {
            /**
               @property {string} vendor
               Vendor of the device hardware. The 'vendorProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'vendor'.
            */
            get: function () {
                return this.vendor;
            },
            set: function (vendor) {
                this.vendor = vendor;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the model of the device.

           @return {string} String with the model of the device.
           @since v2.0
        */
        DeviceInfo.prototype.getModel = function () {
            return this.model;
        };
        /**
           @method
           Sets Model of device - equivalent to device release or version.

           @param {string} model Model of device - equivalent to device release or version.
        */
        DeviceInfo.prototype.setModel = function (model) {
            this.model = model;
        };
        /**
           @method
           Returns the name of the device.

           @return {string} String with device name.
           @since v2.0
        */
        DeviceInfo.prototype.getName = function () {
            return this.name;
        };
        /**
           @method
           Sets Name of device - equivalent to brand.

           @param {string} name Name of device - equivalent to brand.
        */
        DeviceInfo.prototype.setName = function (name) {
            this.name = name;
        };
        /**
           @method
           Returns the platform dependent UUID of the device.

           @return {string} String with the 128-bit device identifier.
           @since v2.0
        */
        DeviceInfo.prototype.getUuid = function () {
            return this.uuid;
        };
        /**
           @method
           Sets Device identifier - this may not be unique for a device. It may depend on the platform implementation and may
be unique for a specific instance of an application on a specific device.

           @param {string} uuid Device identifier - this may not be unique for a device. It may depend on the platform implementation and may
be unique for a specific instance of an application on a specific device.
        */
        DeviceInfo.prototype.setUuid = function (uuid) {
            this.uuid = uuid;
        };
        /**
           @method
           Returns the vendor of the device.

           @return {string} String with the vendor name.
           @since v2.0
        */
        DeviceInfo.prototype.getVendor = function () {
            return this.vendor;
        };
        /**
           @method
           Sets Vendor of the device hardware.

           @param {string} vendor Vendor of the device hardware.
        */
        DeviceInfo.prototype.setVendor = function (vendor) {
            this.vendor = vendor;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.DeviceInfo.
           @return {Adaptive.DeviceInfo} Wrapped object instance.
        */
        DeviceInfo.toObject = function (object) {
            var result = new DeviceInfo(null, null, null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.name = object.name;
                result.model = object.model;
                result.vendor = object.vendor;
                result.uuid = object.uuid;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.DeviceInfo[].
           @return {Adaptive.DeviceInfo[]} Wrapped object array instance.
        */
        DeviceInfo.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(DeviceInfo.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return DeviceInfo;
    })(APIBean);
    Adaptive.DeviceInfo = DeviceInfo;
    /**
       @class Adaptive.Email
       @extends Adaptive.APIBean
       Structure representing the data elements of an email.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    var Email = (function (_super) {
        __extends(Email, _super);
        /**
           @method constructor
           Constructor used by the implementation

           @param {Adaptive.EmailAddress[]} toRecipients        array of recipients
           @param {Adaptive.EmailAddress[]} ccRecipients        array of cc recipients
           @param {Adaptive.EmailAddress[]} bccRecipients       array of bcc recipients
           @param {Adaptive.EmailAttachmentData[]} emailAttachmentData array of attatchments
           @param {string} messageBody         body of the email
           @param {string} messageBodyMimeType mime type of the body
           @param {string} subject             of the email
           @since v2.0
        */
        function Email(toRecipients, ccRecipients, bccRecipients, emailAttachmentData, messageBody, messageBodyMimeType, subject) {
            _super.call(this);
            this.toRecipients = toRecipients;
            this.ccRecipients = ccRecipients;
            this.bccRecipients = bccRecipients;
            this.emailAttachmentData = emailAttachmentData;
            this.messageBody = messageBody;
            this.messageBodyMimeType = messageBodyMimeType;
            this.subject = subject;
        }
        Object.defineProperty(Email.prototype, "bccRecipientsProperty", {
            /**
               @property {Adaptive.EmailAddress[]} bccRecipients
               Array of Email Blind Carbon Copy recipients The 'bccRecipientsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'bccRecipients'.
            */
            get: function () {
                return this.bccRecipients;
            },
            set: function (bccRecipients) {
                this.bccRecipients = bccRecipients;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Email.prototype, "ccRecipientsProperty", {
            /**
               @property {Adaptive.EmailAddress[]} ccRecipients
               Array of Email Carbon Copy recipients The 'ccRecipientsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'ccRecipients'.
            */
            get: function () {
                return this.ccRecipients;
            },
            set: function (ccRecipients) {
                this.ccRecipients = ccRecipients;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Email.prototype, "emailAttachmentDataProperty", {
            /**
               @property {Adaptive.EmailAttachmentData[]} emailAttachmentData
               Array of attatchments The 'emailAttachmentDataProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'emailAttachmentData'.
            */
            get: function () {
                return this.emailAttachmentData;
            },
            set: function (emailAttachmentData) {
                this.emailAttachmentData = emailAttachmentData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Email.prototype, "messageBodyProperty", {
            /**
               @property {string} messageBody
               Message body The 'messageBodyProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'messageBody'.
            */
            get: function () {
                return this.messageBody;
            },
            set: function (messageBody) {
                this.messageBody = messageBody;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Email.prototype, "messageBodyMimeTypeProperty", {
            /**
               @property {string} messageBodyMimeType
               Message body mime type The 'messageBodyMimeTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'messageBodyMimeType'.
            */
            get: function () {
                return this.messageBodyMimeType;
            },
            set: function (messageBodyMimeType) {
                this.messageBodyMimeType = messageBodyMimeType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Email.prototype, "subjectProperty", {
            /**
               @property {string} subject
               Subject of the email The 'subjectProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'subject'.
            */
            get: function () {
                return this.subject;
            },
            set: function (subject) {
                this.subject = subject;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Email.prototype, "toRecipientsProperty", {
            /**
               @property {Adaptive.EmailAddress[]} toRecipients
               Array of Email recipients The 'toRecipientsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'toRecipients'.
            */
            get: function () {
                return this.toRecipients;
            },
            set: function (toRecipients) {
                this.toRecipients = toRecipients;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the array of recipients

           @return {Adaptive.EmailAddress[]} bccRecipients array of bcc recipients
           @since v2.0
        */
        Email.prototype.getBccRecipients = function () {
            return this.bccRecipients;
        };
        /**
           @method
           Set the array of recipients

           @param {Adaptive.EmailAddress[]} bccRecipients array of bcc recipients
           @since v2.0
        */
        Email.prototype.setBccRecipients = function (bccRecipients) {
            this.bccRecipients = bccRecipients;
        };
        /**
           @method
           Returns the array of recipients

           @return {Adaptive.EmailAddress[]} ccRecipients array of cc recipients
           @since v2.0
        */
        Email.prototype.getCcRecipients = function () {
            return this.ccRecipients;
        };
        /**
           @method
           Set the array of recipients

           @param {Adaptive.EmailAddress[]} ccRecipients array of cc recipients
           @since v2.0
        */
        Email.prototype.setCcRecipients = function (ccRecipients) {
            this.ccRecipients = ccRecipients;
        };
        /**
           @method
           Returns an array of attachments

           @return {Adaptive.EmailAttachmentData[]} emailAttachmentData array with the email attachments
           @since v2.0
        */
        Email.prototype.getEmailAttachmentData = function () {
            return this.emailAttachmentData;
        };
        /**
           @method
           Set the email attachment data array

           @param {Adaptive.EmailAttachmentData[]} emailAttachmentData array of email attatchments
           @since v2.0
        */
        Email.prototype.setEmailAttachmentData = function (emailAttachmentData) {
            this.emailAttachmentData = emailAttachmentData;
        };
        /**
           @method
           Returns the message body of the email

           @return {string} message Body string of the email
           @since v2.0
        */
        Email.prototype.getMessageBody = function () {
            return this.messageBody;
        };
        /**
           @method
           Set the message body of the email

           @param {string} messageBody message body of the email
           @since v2.0
        */
        Email.prototype.setMessageBody = function (messageBody) {
            this.messageBody = messageBody;
        };
        /**
           @method
           Returns the myme type of the message body

           @return {string} mime type string of the message boddy
           @since v2.0
        */
        Email.prototype.getMessageBodyMimeType = function () {
            return this.messageBodyMimeType;
        };
        /**
           @method
           Set the mime type for the message body

           @param {string} messageBodyMimeType type of the body message
           @since v2.0
        */
        Email.prototype.setMessageBodyMimeType = function (messageBodyMimeType) {
            this.messageBodyMimeType = messageBodyMimeType;
        };
        /**
           @method
           Returns the subject of the email

           @return {string} subject string of the email
           @since v2.0
        */
        Email.prototype.getSubject = function () {
            return this.subject;
        };
        /**
           @method
           Set the subject of the email

           @param {string} subject of the email
           @since v2.0
        */
        Email.prototype.setSubject = function (subject) {
            this.subject = subject;
        };
        /**
           @method
           Returns the array of recipients

           @return {Adaptive.EmailAddress[]} toRecipients array of recipients
           @since v2.0
        */
        Email.prototype.getToRecipients = function () {
            return this.toRecipients;
        };
        /**
           @method
           Set the array of recipients

           @param {Adaptive.EmailAddress[]} toRecipients array of recipients
           @since v2.0
        */
        Email.prototype.setToRecipients = function (toRecipients) {
            this.toRecipients = toRecipients;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Email.
           @return {Adaptive.Email} Wrapped object instance.
        */
        Email.toObject = function (object) {
            var result = new Email(null, null, null, null, null, null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.toRecipients = EmailAddress.toObjectArray(object.toRecipients);
                result.ccRecipients = EmailAddress.toObjectArray(object.ccRecipients);
                result.bccRecipients = EmailAddress.toObjectArray(object.bccRecipients);
                result.emailAttachmentData = EmailAttachmentData.toObjectArray(object.emailAttachmentData);
                result.messageBody = object.messageBody;
                result.messageBodyMimeType = object.messageBodyMimeType;
                result.subject = object.subject;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Email[].
           @return {Adaptive.Email[]} Wrapped object array instance.
        */
        Email.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(Email.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return Email;
    })(APIBean);
    Adaptive.Email = Email;
    /**
       @class Adaptive.EmailAddress
       @extends Adaptive.APIBean
       Structure representing the data elements of an email addressee.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    var EmailAddress = (function (_super) {
        __extends(EmailAddress, _super);
        /**
           @method constructor
           Constructor used by implementation

           @param {string} address of the Email
           @since v2.0
        */
        function EmailAddress(address) {
            _super.call(this);
            this.address = address;
        }
        Object.defineProperty(EmailAddress.prototype, "addressProperty", {
            /**
               @property {string} address
               The Email address The 'addressProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'address'.
            */
            get: function () {
                return this.address;
            },
            set: function (address) {
                this.address = address;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the email address

           @return {string} address of the Email
           @since v2.0
        */
        EmailAddress.prototype.getAddress = function () {
            return this.address;
        };
        /**
           @method
           Set the Email address

           @param {string} address of the Email
           @since v2.0
        */
        EmailAddress.prototype.setAddress = function (address) {
            this.address = address;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.EmailAddress.
           @return {Adaptive.EmailAddress} Wrapped object instance.
        */
        EmailAddress.toObject = function (object) {
            var result = new EmailAddress(null);
            if (object != null) {
                // Assign values to bean fields.
                result.address = object.address;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.EmailAddress[].
           @return {Adaptive.EmailAddress[]} Wrapped object array instance.
        */
        EmailAddress.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(EmailAddress.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return EmailAddress;
    })(APIBean);
    Adaptive.EmailAddress = EmailAddress;
    /**
       @class Adaptive.EmailAttachmentData
       @extends Adaptive.APIBean
       Structure representing the binary attachment data.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    var EmailAttachmentData = (function (_super) {
        __extends(EmailAttachmentData, _super);
        /**
           @method constructor
           Constructor with fields

           @param {number[]} data         raw data of the file attachment
           @param {number} size         size of the file attachment
           @param {string} fileName     name of the file attachment
           @param {string} mimeType     mime type of the file attachment
           @param {string} referenceUrl relative url of the file attachment
           @since v2.0
        */
        function EmailAttachmentData(data, size, fileName, mimeType, referenceUrl) {
            _super.call(this);
            this.data = data;
            this.size = size;
            this.fileName = fileName;
            this.mimeType = mimeType;
            this.referenceUrl = referenceUrl;
        }
        Object.defineProperty(EmailAttachmentData.prototype, "dataProperty", {
            /**
               @property {number[]} data
               The raw data for the current file attachment (byte array) The 'dataProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'data'.
            */
            get: function () {
                return this.data;
            },
            set: function (data) {
                this.data = data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EmailAttachmentData.prototype, "fileNameProperty", {
            /**
               @property {string} fileName
               The name of the current file attachment The 'fileNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'fileName'.
            */
            get: function () {
                return this.fileName;
            },
            set: function (fileName) {
                this.fileName = fileName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EmailAttachmentData.prototype, "mimeTypeProperty", {
            /**
               @property {string} mimeType
               The mime type of the current attachment The 'mimeTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'mimeType'.
            */
            get: function () {
                return this.mimeType;
            },
            set: function (mimeType) {
                this.mimeType = mimeType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EmailAttachmentData.prototype, "referenceUrlProperty", {
            /**
               @property {string} referenceUrl
               The relative path where the contents for the attachment file could be located. The 'referenceUrlProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'referenceUrl'.
            */
            get: function () {
                return this.referenceUrl;
            },
            set: function (referenceUrl) {
                this.referenceUrl = referenceUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EmailAttachmentData.prototype, "sizeProperty", {
            /**
               @property {number} size
               The data size (in bytes) of the current file attachment The 'sizeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'size'.
            */
            get: function () {
                return this.size;
            },
            set: function (size) {
                this.size = size;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the raw data in byte[]

           @return {number[]} data Octet-binary content of the attachment payload.
           @since v2.0
        */
        EmailAttachmentData.prototype.getData = function () {
            return this.data;
        };
        /**
           @method
           Set the data of the attachment as a byte[]

           @param {number[]} data Sets the octet-binary content of the attachment.
           @since v2.0
        */
        EmailAttachmentData.prototype.setData = function (data) {
            this.data = data;
        };
        /**
           @method
           Returns the filename of the attachment

           @return {string} fileName Name of the attachment.
           @since v2.0
        */
        EmailAttachmentData.prototype.getFileName = function () {
            return this.fileName;
        };
        /**
           @method
           Set the name of the file attachment

           @param {string} fileName Name of the attachment.
           @since v2.0
        */
        EmailAttachmentData.prototype.setFileName = function (fileName) {
            this.fileName = fileName;
        };
        /**
           @method
           Returns the mime type of the attachment

           @return {string} mimeType
           @since v2.0
        */
        EmailAttachmentData.prototype.getMimeType = function () {
            return this.mimeType;
        };
        /**
           @method
           Set the mime type of the attachment

           @param {string} mimeType Mime-type of the attachment.
           @since v2.0
        */
        EmailAttachmentData.prototype.setMimeType = function (mimeType) {
            this.mimeType = mimeType;
        };
        /**
           @method
           Returns the absolute url of the file attachment

           @return {string} referenceUrl Absolute URL of the file attachment for either file:// or http:// access.
           @since v2.0
        */
        EmailAttachmentData.prototype.getReferenceUrl = function () {
            return this.referenceUrl;
        };
        /**
           @method
           Set the absolute url of the attachment

           @param {string} referenceUrl Absolute URL of the file attachment for either file:// or http:// access.
           @since v2.0
        */
        EmailAttachmentData.prototype.setReferenceUrl = function (referenceUrl) {
            this.referenceUrl = referenceUrl;
        };
        /**
           @method
           Returns the size of the attachment as a long

           @return {number} size Length in bytes of the octet-binary content.
           @since v2.0
        */
        EmailAttachmentData.prototype.getSize = function () {
            return this.size;
        };
        /**
           @method
           Set the size of the attachment as a long

           @param {number} size Length in bytes of the octet-binary content ( should be same as data array length.)
           @since v2.0
        */
        EmailAttachmentData.prototype.setSize = function (size) {
            this.size = size;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.EmailAttachmentData.
           @return {Adaptive.EmailAttachmentData} Wrapped object instance.
        */
        EmailAttachmentData.toObject = function (object) {
            var result = new EmailAttachmentData(null, null, null, null, null);
            if (object != null) {
                // Assign values to bean fields.
                if (object.data != null) {
                    result.data = new Array();
                    for (var idata = 0; idata < object.data.length; idata++) {
                        var vdata = object.data[idata];
                        result.data.push(vdata);
                    }
                }
                result.size = object.size;
                result.fileName = object.fileName;
                result.mimeType = object.mimeType;
                result.referenceUrl = object.referenceUrl;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.EmailAttachmentData[].
           @return {Adaptive.EmailAttachmentData[]} Wrapped object array instance.
        */
        EmailAttachmentData.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(EmailAttachmentData.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return EmailAttachmentData;
    })(APIBean);
    Adaptive.EmailAttachmentData = EmailAttachmentData;
    /**
       @class Adaptive.FileDescriptor
       @extends Adaptive.APIBean
       Implementation of FileDescriptor bean.

       @author Carlos Lozano Diez
       @since 1.0
       @version 1.0
    */
    var FileDescriptor = (function (_super) {
        __extends(FileDescriptor, _super);
        /**
           @method constructor
           Default constructor.
        */
        function FileDescriptor() {
            _super.call(this);
        }
        Object.defineProperty(FileDescriptor.prototype, "dateCreatedProperty", {
            get: function () {
                return this.dateCreated;
            },
            set: function (dateCreated) {
                this.dateCreated = dateCreated;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FileDescriptor.prototype, "dateModifiedProperty", {
            get: function () {
                return this.dateModified;
            },
            set: function (dateModified) {
                this.dateModified = dateModified;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FileDescriptor.prototype, "nameProperty", {
            get: function () {
                return this.name;
            },
            set: function (name) {
                this.name = name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FileDescriptor.prototype, "pathProperty", {
            get: function () {
                return this.path;
            },
            set: function (path) {
                this.path = path;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FileDescriptor.prototype, "pathAbsoluteProperty", {
            get: function () {
                return this.pathAbsolute;
            },
            set: function (pathAbsolute) {
                this.pathAbsolute = pathAbsolute;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FileDescriptor.prototype, "sizeProperty", {
            get: function () {
                return this.size;
            },
            set: function (size) {
                this.size = size;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the milliseconds passed since 1/1/1970 since the file was created.

           @return {number} Timestamp in milliseconds.
           @since v2.0
        */
        FileDescriptor.prototype.getDateCreated = function () {
            return this.dateCreated;
        };
        /**
           @method
           Sets the creation timestamp in milliseconds. Used internally.

           @param {number} dateCreated Timestamp of file creation or -1 if the file or folder doesn't exist.
        */
        FileDescriptor.prototype.setDateCreated = function (dateCreated) {
            this.dateCreated = dateCreated;
        };
        /**
           @method
           Returns the milliseconds passed since 1/1/1970 since the file was modified.

           @return {number} Timestamp in milliseconds.
           @since v2.0
        */
        FileDescriptor.prototype.getDateModified = function () {
            return this.dateModified;
        };
        /**
           @method
           Sets the file or folder modification timestamp in milliseconds. Used internally.

           @param {number} dateModified Timestamp of file modification or -1 if the file or folder doesn't exist.
        */
        FileDescriptor.prototype.setDateModified = function (dateModified) {
            this.dateModified = dateModified;
        };
        /**
           @method
           Returns the name of the file if the reference is a file or the last path element of the folder.

           @return {string} The name of the file.
           @since v2.0
        */
        FileDescriptor.prototype.getName = function () {
            return this.name;
        };
        /**
           @method
           Sets the name of the file. Used internally.

           @param {string} name Name of the file or last folder path element.
        */
        FileDescriptor.prototype.setName = function (name) {
            this.name = name;
        };
        /**
           @method
           Returns the path element of the file or folder (excluding the last path element if it's a directory).

           @return {string} The path to the file.
           @since v2.0
        */
        FileDescriptor.prototype.getPath = function () {
            return this.path;
        };
        /**
           @method
           Sets the path of the file or folder. Used internally.

           @param {string} path The path element of the file or folder.
        */
        FileDescriptor.prototype.setPath = function (path) {
            this.path = path;
        };
        /**
           @method
           Returns the resolved absolute path elements of the file and/or folders (including the last path element).

           @return {string} The absolute path to the file.
           @since v2.0
        */
        FileDescriptor.prototype.getPathAbsolute = function () {
            return this.pathAbsolute;
        };
        /**
           @method
           Sets the absolute path of the file or folder. Used internally.

           @param {string} pathAbsolute String with the absolute path of file or folder.
        */
        FileDescriptor.prototype.setPathAbsolute = function (pathAbsolute) {
            this.pathAbsolute = pathAbsolute;
        };
        /**
           @method
           Returns the size in bytes of the file or -1 if the reference is a folder.

           @return {number} Size in bytes of file.
           @since v2.0
        */
        FileDescriptor.prototype.getSize = function () {
            return this.size;
        };
        /**
           @method
           Sets the file size in bytes of the file. If the file is a folder, this will be 0. If the file
doesn't exist, this will be -1. Used internally.

           @param {number} size The size in bytes of the file.
        */
        FileDescriptor.prototype.setSize = function (size) {
            this.size = size;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.FileDescriptor.
           @return {Adaptive.FileDescriptor} Wrapped object instance.
        */
        FileDescriptor.toObject = function (object) {
            var result = new FileDescriptor();
            if (object != null) {
                // Assign values to bean fields.
                result.name = object.name;
                result.path = object.path;
                result.pathAbsolute = object.pathAbsolute;
                result.dateCreated = object.dateCreated;
                result.dateModified = object.dateModified;
                result.size = object.size;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.FileDescriptor[].
           @return {Adaptive.FileDescriptor[]} Wrapped object array instance.
        */
        FileDescriptor.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(FileDescriptor.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return FileDescriptor;
    })(APIBean);
    Adaptive.FileDescriptor = FileDescriptor;
    /**
       @class Adaptive.Geolocation
       @extends Adaptive.APIBean
       Structure representing the data a single geolocation reading.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    var Geolocation = (function (_super) {
        __extends(Geolocation, _super);
        /**
           @method constructor
           Constructor with parameters

           @param {number} latitude  Latitude of the measurement
           @param {number} longitude Longitude of the measurement
           @param {number} altitude  Altitude of the measurement
           @param {number} xDoP      Dilution of precision on the X measurement
           @param {number} yDoP      Dilution of precision on the Y measurement
           @param {number} timestamp Timestamp of the measurement
           @since v2.0
        */
        function Geolocation(latitude, longitude, altitude, xDoP, yDoP, timestamp) {
            _super.call(this);
            this.latitude = latitude;
            this.longitude = longitude;
            this.altitude = altitude;
            this.xDoP = xDoP;
            this.yDoP = yDoP;
            this.timestamp = timestamp;
        }
        Object.defineProperty(Geolocation.prototype, "altitudeProperty", {
            /**
               @property {number} altitude
               The current device altitude (or Z coordinate). Measured in meters. The 'altitudeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'altitude'.
            */
            get: function () {
                return this.altitude;
            },
            set: function (altitude) {
                this.altitude = altitude;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Geolocation.prototype, "latitudeProperty", {
            /**
               @property {number} latitude
               The Y coordinate (or latitude). Measured in degrees. The 'latitudeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'latitude'.
            */
            get: function () {
                return this.latitude;
            },
            set: function (latitude) {
                this.latitude = latitude;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Geolocation.prototype, "longitudeProperty", {
            /**
               @property {number} longitude
               The X coordinate (or longitude). Measured in degrees. The 'longitudeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'longitude'.
            */
            get: function () {
                return this.longitude;
            },
            set: function (longitude) {
                this.longitude = longitude;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Geolocation.prototype, "timestampProperty", {
            /**
               @property {number} timestamp
               Timestamp of the geolocation reading. The 'timestampProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'timestamp'.
            */
            get: function () {
                return this.timestamp;
            },
            set: function (timestamp) {
                this.timestamp = timestamp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Geolocation.prototype, "xDoPProperty", {
            /**
               @property {number} xDoP
               Dilution of precision on the X measurement. Measured in meters. The 'xDoPProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'xDoP'.
            */
            get: function () {
                return this.xDoP;
            },
            set: function (xDoP) {
                this.xDoP = xDoP;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Geolocation.prototype, "yDoPProperty", {
            /**
               @property {number} yDoP
               Dilution of precision on the Y measurement. Measured in meters. The 'yDoPProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'yDoP'.
            */
            get: function () {
                return this.yDoP;
            },
            set: function (yDoP) {
                this.yDoP = yDoP;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns altitude in meters

           @return {number} Altitude of the measurement
           @since v2.0
        */
        Geolocation.prototype.getAltitude = function () {
            return this.altitude;
        };
        /**
           @method
           Set altitude in meters

           @param {number} altitude Altitude of the measurement
           @since v2.0
        */
        Geolocation.prototype.setAltitude = function (altitude) {
            this.altitude = altitude;
        };
        /**
           @method
           Returns the latitude in degrees

           @return {number} Latitude of the measurement
           @since v2.0
        */
        Geolocation.prototype.getLatitude = function () {
            return this.latitude;
        };
        /**
           @method
           Set the latitude in degrees

           @param {number} latitude Latitude of the measurement
           @since v2.0
        */
        Geolocation.prototype.setLatitude = function (latitude) {
            this.latitude = latitude;
        };
        /**
           @method
           Returns the longitude in degrees

           @return {number} Longitude of the measurement
           @since v2.0
        */
        Geolocation.prototype.getLongitude = function () {
            return this.longitude;
        };
        /**
           @method
           Returns the latitude in degrees

           @param {number} longitude Longitude of the measurement
           @since v2.0
        */
        Geolocation.prototype.setLongitude = function (longitude) {
            this.longitude = longitude;
        };
        /**
           @method
           Timestamp Getter

           @return {number} Timestamp
           @since v2.0
        */
        Geolocation.prototype.getTimestamp = function () {
            return this.timestamp;
        };
        /**
           @method
           Timestamp Setter

           @param {number} timestamp Timestamp
           @since v2.0
        */
        Geolocation.prototype.setTimestamp = function (timestamp) {
            this.timestamp = timestamp;
        };
        /**
           @method
           Gets Dilution of precision on the X measurement. Measured in meters.

           @return {number} xDoP Dilution of precision on the X measurement. Measured in meters.
        */
        Geolocation.prototype.getXDoP = function () {
            return this.xDoP;
        };
        /**
           @method
           Sets Dilution of precision on the X measurement. Measured in meters.

           @param {number} xDoP Dilution of precision on the X measurement. Measured in meters.
        */
        Geolocation.prototype.setXDoP = function (xDoP) {
            this.xDoP = xDoP;
        };
        /**
           @method
           Gets Dilution of precision on the Y measurement. Measured in meters.

           @return {number} yDoP Dilution of precision on the Y measurement. Measured in meters.
        */
        Geolocation.prototype.getYDoP = function () {
            return this.yDoP;
        };
        /**
           @method
           Sets Dilution of precision on the Y measurement. Measured in meters.

           @param {number} yDoP Dilution of precision on the Y measurement. Measured in meters.
        */
        Geolocation.prototype.setYDoP = function (yDoP) {
            this.yDoP = yDoP;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Geolocation.
           @return {Adaptive.Geolocation} Wrapped object instance.
        */
        Geolocation.toObject = function (object) {
            var result = new Geolocation(null, null, null, null, null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.latitude = object.latitude;
                result.longitude = object.longitude;
                result.altitude = object.altitude;
                result.xDoP = object.xDoP;
                result.yDoP = object.yDoP;
                result.timestamp = object.timestamp;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Geolocation[].
           @return {Adaptive.Geolocation[]} Wrapped object array instance.
        */
        Geolocation.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(Geolocation.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return Geolocation;
    })(APIBean);
    Adaptive.Geolocation = Geolocation;
    /**
       @class Adaptive.KeyPair
       @extends Adaptive.APIBean
       Represents a basic bean to store keyName pair values

       @author Ferran Vila Conesa
       @since v2.0
       @version 1.0
    */
    var KeyPair = (function (_super) {
        __extends(KeyPair, _super);
        /**
           @method constructor
           Constructor using fields

           @param {string} keyName  Key of the element
           @param {string} keyValue Value of the element
           @since v2.0
        */
        function KeyPair(keyName, keyValue) {
            _super.call(this);
            this.keyName = keyName;
            this.keyValue = keyValue;
        }
        Object.defineProperty(KeyPair.prototype, "keyNameProperty", {
            /**
               @property {string} keyName
               Key of the element The 'keyNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'keyName'.
            */
            get: function () {
                return this.keyName;
            },
            set: function (keyName) {
                this.keyName = keyName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyPair.prototype, "keyValueProperty", {
            /**
               @property {string} keyValue
               Value of the element The 'keyValueProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'keyValue'.
            */
            get: function () {
                return this.keyValue;
            },
            set: function (keyValue) {
                this.keyValue = keyValue;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the keyName of the element

           @return {string} Key of the element
           @since v2.0
        */
        KeyPair.prototype.getKeyName = function () {
            return this.keyName;
        };
        /**
           @method
           Sets the keyName of the element

           @param {string} keyName Key of the element
           @since v2.0
        */
        KeyPair.prototype.setKeyName = function (keyName) {
            this.keyName = keyName;
        };
        /**
           @method
           Returns the keyValue of the element

           @return {string} Value of the element
           @since v2.0
        */
        KeyPair.prototype.getKeyValue = function () {
            return this.keyValue;
        };
        /**
           @method
           Sets the keyValue of the element

           @param {string} keyValue Value of the element
           @since v2.0
        */
        KeyPair.prototype.setKeyValue = function (keyValue) {
            this.keyValue = keyValue;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.KeyPair.
           @return {Adaptive.KeyPair} Wrapped object instance.
        */
        KeyPair.toObject = function (object) {
            var result = new KeyPair(null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.keyName = object.keyName;
                result.keyValue = object.keyValue;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.KeyPair[].
           @return {Adaptive.KeyPair[]} Wrapped object array instance.
        */
        KeyPair.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(KeyPair.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return KeyPair;
    })(APIBean);
    Adaptive.KeyPair = KeyPair;
    /**
       @class Adaptive.KeyValue
       @extends Adaptive.APIBean
       General key/value holder class.

       @author Carlos Lozano Diez
       @since 2.0.6
       @version 1.0
    */
    var KeyValue = (function (_super) {
        __extends(KeyValue, _super);
        /**
           @method constructor
           Convenience constructor.

           @param {string} keyName Name of the key.
           @param {string} keyData Value of the key.
           @since v2.0.6
        */
        function KeyValue(keyName, keyData) {
            _super.call(this);
            this.keyName = keyName;
            this.keyData = keyData;
        }
        Object.defineProperty(KeyValue.prototype, "keyDataProperty", {
            /**
               @property {string} keyData
               Value of the key. The 'keyDataProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'keyData'.
            */
            get: function () {
                return this.keyData;
            },
            set: function (keyData) {
                this.keyData = keyData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyValue.prototype, "keyNameProperty", {
            /**
               @property {string} keyName
               Name of the key for the value. The 'keyNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'keyName'.
            */
            get: function () {
                return this.keyName;
            },
            set: function (keyName) {
                this.keyName = keyName;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Gets the value of the key.

           @return {string} Value of the key.
           @since v2.0.6
        */
        KeyValue.prototype.getKeyData = function () {
            return this.keyData;
        };
        /**
           @method
           Sets the value of the key.

           @param {string} keyData Value of the key.
           @since v2.0.6
        */
        KeyValue.prototype.setKeyData = function (keyData) {
            this.keyData = keyData;
        };
        /**
           @method
           Gets the name of the key.

           @return {string} Key name.
           @since v2.0.6
        */
        KeyValue.prototype.getKeyName = function () {
            return this.keyName;
        };
        /**
           @method
           Sets the name of the key.

           @param {string} keyName Key name.
           @since v2.0.6
        */
        KeyValue.prototype.setKeyName = function (keyName) {
            this.keyName = keyName;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.KeyValue.
           @return {Adaptive.KeyValue} Wrapped object instance.
        */
        KeyValue.toObject = function (object) {
            var result = new KeyValue(null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.keyName = object.keyName;
                result.keyData = object.keyData;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.KeyValue[].
           @return {Adaptive.KeyValue[]} Wrapped object array instance.
        */
        KeyValue.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(KeyValue.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return KeyValue;
    })(APIBean);
    Adaptive.KeyValue = KeyValue;
    /**
       @class Adaptive.Lifecycle
       @extends Adaptive.APIBean
       Represents a specific application life-cycle stage.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    var Lifecycle = (function (_super) {
        __extends(Lifecycle, _super);
        /**
           @method constructor
           Constructor used by the implementation

           @param {Adaptive.LifecycleState} state of the app
           @param {number} timestamp Timestamp of the event
           @since v2.0
        */
        function Lifecycle(state, timestamp) {
            _super.call(this);
            this.state = state;
            this.timestamp = timestamp;
        }
        Object.defineProperty(Lifecycle.prototype, "stateProperty", {
            /**
               @property {Adaptive.LifecycleState} state
               Represent the state of the app
  <p>
  Possible lifecycle States:
  <p>
  1. Starting    - Before starting.
  2. Started     - Start concluded.
  3. Running     - Accepts user interaction - running in foreground.
  4. Pausing     - Before going to background.
  4.1 PausedIdle - In background, no scheduled background activity (passive).
  4.2 PausedRun  - In background, scheduled background activity (periodic network access, gps access, etc.)
  5. Resuming    - Before going to foreground, followed by Running state.
  6. Stopping    - Before stopping. The 'stateProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'state'.
            */
            get: function () {
                return this.state;
            },
            set: function (state) {
                this.state = state;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Lifecycle.prototype, "timestampProperty", {
            /**
               @property {number} timestamp
               The timestamps in milliseconds when the event was fired. The 'timestampProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'timestamp'.
            */
            get: function () {
                return this.timestamp;
            },
            set: function (timestamp) {
                this.timestamp = timestamp;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the state of the application

           @return {Adaptive.LifecycleState} state of the app
           @since v2.0
        */
        Lifecycle.prototype.getState = function () {
            return this.state;
        };
        /**
           @method
           Set the State of the application

           @param {Adaptive.LifecycleState} state of the app
           @since v2.0
        */
        Lifecycle.prototype.setState = function (state) {
            this.state = state;
        };
        /**
           @method
           Gets the timestamp in milliseconds of the event.

           @return {number} Timestamp of the event.
           @since v2.2.1
        */
        Lifecycle.prototype.getTimestamp = function () {
            return this.timestamp;
        };
        /**
           @method
           Sets the timestamp in milliseconds of the event.

           @param {number} timestamp Timestamp of the event.
           @since v2.2.1
        */
        Lifecycle.prototype.setTimestamp = function (timestamp) {
            this.timestamp = timestamp;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Lifecycle.
           @return {Adaptive.Lifecycle} Wrapped object instance.
        */
        Lifecycle.toObject = function (object) {
            var result = new Lifecycle(null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.state = LifecycleState.toObject(object.state);
                result.timestamp = object.timestamp;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Lifecycle[].
           @return {Adaptive.Lifecycle[]} Wrapped object array instance.
        */
        Lifecycle.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(Lifecycle.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return Lifecycle;
    })(APIBean);
    Adaptive.Lifecycle = Lifecycle;
    /**
       @class Adaptive.Locale
       @extends Adaptive.APIBean
       Represents a specific user or system locate.

       @author Aryslan
       @since v2.0
       @version 1.0
    */
    var Locale = (function (_super) {
        __extends(Locale, _super);
        /**
           @method constructor
           Constructor used by the implementation

           @param {string} country  Country of the Locale
           @param {string} language Language of the Locale
           @since v2.0
        */
        function Locale(language, country) {
            _super.call(this);
            this.language = language;
            this.country = country;
        }
        Object.defineProperty(Locale.prototype, "countryProperty", {
            /**
               @property {string} country
               A valid ISO Country Code. The 'countryProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'country'.
            */
            get: function () {
                return this.country;
            },
            set: function (country) {
                this.country = country;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Locale.prototype, "languageProperty", {
            /**
               @property {string} language
               A valid ISO Language Code. The 'languageProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'language'.
            */
            get: function () {
                return this.language;
            },
            set: function (language) {
                this.language = language;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the country code

           @return {string} country code
           @since v2.0
        */
        Locale.prototype.getCountry = function () {
            return this.country;
        };
        /**
           @method
           Set the country code

           @param {string} country code
           @since v2.0
        */
        Locale.prototype.setCountry = function (country) {
            this.country = country;
        };
        /**
           @method
           Returns the language code

           @return {string} language code
           @since v2.0
        */
        Locale.prototype.getLanguage = function () {
            return this.language;
        };
        /**
           @method
           Set the language code

           @param {string} language code
           @since v2.0
        */
        Locale.prototype.setLanguage = function (language) {
            this.language = language;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Locale.
           @return {Adaptive.Locale} Wrapped object instance.
        */
        Locale.toObject = function (object) {
            var result = new Locale(null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.country = object.country;
                result.language = object.language;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Locale[].
           @return {Adaptive.Locale[]} Wrapped object array instance.
        */
        Locale.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(Locale.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return Locale;
    })(APIBean);
    Adaptive.Locale = Locale;
    /**
       @class Adaptive.NetworkEvent
       @extends Adaptive.APIBean
       Represents a network handover event on the system.

       @author Ferran Vila Conesa
       @since v2.2.1
       @version 1.0
    */
    var NetworkEvent = (function (_super) {
        __extends(NetworkEvent, _super);
        /**
           @method constructor
           Constructor used by the implementation

           @param {Adaptive.ICapabilitiesNet} network   of the app
           @param {number} timestamp Timestamp of the event
           @since v2.2.1
        */
        function NetworkEvent(network, timestamp) {
            _super.call(this);
            this.network = network;
            this.timestamp = timestamp;
        }
        Object.defineProperty(NetworkEvent.prototype, "networkProperty", {
            /**
               @property {Adaptive.ICapabilitiesNet} network
               New type of network of the event The 'networkProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'network'.
            */
            get: function () {
                return this.network;
            },
            set: function (network) {
                this.network = network;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NetworkEvent.prototype, "timestampProperty", {
            /**
               @property {number} timestamp
               The timestamps in milliseconds when the event was fired. The 'timestampProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'timestamp'.
            */
            get: function () {
                return this.timestamp;
            },
            set: function (timestamp) {
                this.timestamp = timestamp;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Network event getter

           @return {Adaptive.ICapabilitiesNet} New network switched
           @since v2.2.1
        */
        NetworkEvent.prototype.getNetwork = function () {
            return this.network;
        };
        /**
           @method
           Network setter

           @param {Adaptive.ICapabilitiesNet} network New network switched
           @since v2.2.1
        */
        NetworkEvent.prototype.setNetwork = function (network) {
            this.network = network;
        };
        /**
           @method
           Returns the timestamp of the event

           @return {number} Timestamp of the event
           @since v2.2.1
        */
        NetworkEvent.prototype.getTimestamp = function () {
            return this.timestamp;
        };
        /**
           @method
           Sets the timestamp of the event

           @param {number} timestamp Timestamp of the event
           @since v2.2.1
        */
        NetworkEvent.prototype.setTimestamp = function (timestamp) {
            this.timestamp = timestamp;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.NetworkEvent.
           @return {Adaptive.NetworkEvent} Wrapped object instance.
        */
        NetworkEvent.toObject = function (object) {
            var result = new NetworkEvent(null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.network = ICapabilitiesNet.toObject(object.network);
                result.timestamp = object.timestamp;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.NetworkEvent[].
           @return {Adaptive.NetworkEvent[]} Wrapped object array instance.
        */
        NetworkEvent.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(NetworkEvent.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return NetworkEvent;
    })(APIBean);
    Adaptive.NetworkEvent = NetworkEvent;
    /**
       @class Adaptive.OSInfo
       @extends Adaptive.APIBean
       Represents the basic information about the operating system.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    var OSInfo = (function (_super) {
        __extends(OSInfo, _super);
        /**
           @method constructor
           Constructor used by implementation to set the OS information.

           @param {Adaptive.IOSType} name    of the OS.
           @param {string} version of the OS.
           @param {string} vendor  of the OS.
           @since v2.0
        */
        function OSInfo(name, version, vendor) {
            _super.call(this);
            this.name = name;
            this.version = version;
            this.vendor = vendor;
        }
        Object.defineProperty(OSInfo.prototype, "nameProperty", {
            /**
               @property {Adaptive.IOSType} name
               The name of the operating system. The 'nameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'name'.
            */
            get: function () {
                return this.name;
            },
            set: function (name) {
                this.name = name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OSInfo.prototype, "vendorProperty", {
            /**
               @property {string} vendor
               The vendor of the operating system. The 'vendorProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'vendor'.
            */
            get: function () {
                return this.vendor;
            },
            set: function (vendor) {
                this.vendor = vendor;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OSInfo.prototype, "versionProperty", {
            /**
               @property {string} version
               The version/identifier of the operating system. The 'versionProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'version'.
            */
            get: function () {
                return this.version;
            },
            set: function (version) {
                this.version = version;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the name of the operating system.

           @return {Adaptive.IOSType} OS name.
           @since v2.0
        */
        OSInfo.prototype.getName = function () {
            return this.name;
        };
        /**
           @method
           Sets The name of the operating system.

           @param {Adaptive.IOSType} name The name of the operating system.
        */
        OSInfo.prototype.setName = function (name) {
            this.name = name;
        };
        /**
           @method
           Returns the vendor of the operating system.

           @return {string} OS vendor.
           @since v2.0
        */
        OSInfo.prototype.getVendor = function () {
            return this.vendor;
        };
        /**
           @method
           Sets The vendor of the operating system.

           @param {string} vendor The vendor of the operating system.
        */
        OSInfo.prototype.setVendor = function (vendor) {
            this.vendor = vendor;
        };
        /**
           @method
           Returns the version of the operating system.

           @return {string} OS version.
           @since v2.0
        */
        OSInfo.prototype.getVersion = function () {
            return this.version;
        };
        /**
           @method
           Sets The version/identifier of the operating system.

           @param {string} version The version/identifier of the operating system.
        */
        OSInfo.prototype.setVersion = function (version) {
            this.version = version;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.OSInfo.
           @return {Adaptive.OSInfo} Wrapped object instance.
        */
        OSInfo.toObject = function (object) {
            var result = new OSInfo(null, null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.name = IOSType.toObject(object.name);
                result.version = object.version;
                result.vendor = object.vendor;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.OSInfo[].
           @return {Adaptive.OSInfo[]} Wrapped object array instance.
        */
        OSInfo.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(OSInfo.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return OSInfo;
    })(APIBean);
    Adaptive.OSInfo = OSInfo;
    /**
       @class Adaptive.RotationEvent
       @extends Adaptive.APIBean
       Object for reporting orientation change events for device and display.

       @author Carlos Lozano Diez
       @since v2.0.5
       @version 1.0
    */
    var RotationEvent = (function (_super) {
        __extends(RotationEvent, _super);
        /**
           @method constructor
           Convenience constructor.

           @param {Adaptive.ICapabilitiesOrientation} origin      Source orientation when the event was fired.
           @param {Adaptive.ICapabilitiesOrientation} destination Destination orientation when the event was fired.
           @param {Adaptive.RotationEventState} state       State of the event (WillBegin, DidFinish).
           @param {number} timestamp   Timestamp in milliseconds when the event was fired.
           @since v2.0.5
        */
        function RotationEvent(origin, destination, state, timestamp) {
            _super.call(this);
            this.origin = origin;
            this.destination = destination;
            this.state = state;
            this.timestamp = timestamp;
        }
        Object.defineProperty(RotationEvent.prototype, "destinationProperty", {
            /**
               @property {Adaptive.ICapabilitiesOrientation} destination
               The orientation we're rotating to. This is the future orientation when the state of the event is
  WillStartRotation. This will be the current orientation when the rotation is finished with the state
  DidFinishRotation. The 'destinationProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'destination'.
            */
            get: function () {
                return this.destination;
            },
            set: function (destination) {
                this.destination = destination;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RotationEvent.prototype, "originProperty", {
            /**
               @property {Adaptive.ICapabilitiesOrientation} origin
               The orientation we're rotating from. This is the current orientation when the state of the event is
  WillStartRotation. This will be the previous orientation when the rotation is finished with the state
  DidFinishRotation. The 'originProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'origin'.
            */
            get: function () {
                return this.origin;
            },
            set: function (origin) {
                this.origin = origin;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RotationEvent.prototype, "stateProperty", {
            /**
               @property {Adaptive.RotationEventState} state
               The state of the event to indicate the start of the rotation and the end of the rotation event. This allows
  for functions to be pre-emptively performed (veto change, re-layout, etc.) before rotation is effected and
  concluded. The 'stateProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'state'.
            */
            get: function () {
                return this.state;
            },
            set: function (state) {
                this.state = state;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RotationEvent.prototype, "timestampProperty", {
            /**
               @property {number} timestamp
               The timestamps in milliseconds when the event was fired. The 'timestampProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'timestamp'.
            */
            get: function () {
                return this.timestamp;
            },
            set: function (timestamp) {
                this.timestamp = timestamp;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Gets the destination orientation of the event.

           @return {Adaptive.ICapabilitiesOrientation} Destination orientation.
           @since v2.0.5
        */
        RotationEvent.prototype.getDestination = function () {
            return this.destination;
        };
        /**
           @method
           Sets the destination orientation of the event.

           @param {Adaptive.ICapabilitiesOrientation} destination Destination orientation.
           @since v2.0.5
        */
        RotationEvent.prototype.setDestination = function (destination) {
            this.destination = destination;
        };
        /**
           @method
           Get the origin orientation of the event.

           @return {Adaptive.ICapabilitiesOrientation} Origin orientation.
           @since v2.0.5
        */
        RotationEvent.prototype.getOrigin = function () {
            return this.origin;
        };
        /**
           @method
           Set the origin orientation of the event.

           @param {Adaptive.ICapabilitiesOrientation} origin Origin orientation
           @since v2.0.5
        */
        RotationEvent.prototype.setOrigin = function (origin) {
            this.origin = origin;
        };
        /**
           @method
           Gets the current state of the event.

           @return {Adaptive.RotationEventState} State of the event.
           @since v2.0.5
        */
        RotationEvent.prototype.getState = function () {
            return this.state;
        };
        /**
           @method
           Sets the current state of the event.

           @param {Adaptive.RotationEventState} state The state of the event.
           @since v2.0.5
        */
        RotationEvent.prototype.setState = function (state) {
            this.state = state;
        };
        /**
           @method
           Gets the timestamp in milliseconds of the event.

           @return {number} Timestamp of the event.
           @since v2.0.5
        */
        RotationEvent.prototype.getTimestamp = function () {
            return this.timestamp;
        };
        /**
           @method
           Sets the timestamp in milliseconds of the event.

           @param {number} timestamp Timestamp of the event.
           @since v2.0.5
        */
        RotationEvent.prototype.setTimestamp = function (timestamp) {
            this.timestamp = timestamp;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.RotationEvent.
           @return {Adaptive.RotationEvent} Wrapped object instance.
        */
        RotationEvent.toObject = function (object) {
            var result = new RotationEvent(null, null, null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.origin = ICapabilitiesOrientation.toObject(object.origin);
                result.destination = ICapabilitiesOrientation.toObject(object.destination);
                result.state = RotationEventState.toObject(object.state);
                result.timestamp = object.timestamp;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.RotationEvent[].
           @return {Adaptive.RotationEvent[]} Wrapped object array instance.
        */
        RotationEvent.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(RotationEvent.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return RotationEvent;
    })(APIBean);
    Adaptive.RotationEvent = RotationEvent;
    /**
       @class Adaptive.SecureKeyPair
       @extends Adaptive.APIBean
       Represents a single secureKey-value pair.

       @author Aryslan
       @since v2.0
       @version 1.0
    */
    var SecureKeyPair = (function (_super) {
        __extends(SecureKeyPair, _super);
        /**
           @method constructor
           Constructor with parameters

           @param {string} secureKey  name of the keypair
           @param {string} secureData value of the keypair
           @since v2.0
        */
        function SecureKeyPair(secureKey, secureData) {
            _super.call(this);
            this.secureKey = secureKey;
            this.secureData = secureData;
        }
        Object.defineProperty(SecureKeyPair.prototype, "secureDataProperty", {
            /**
               @property {string} secureData
               Value of the secured element The 'secureDataProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'secureData'.
            */
            get: function () {
                return this.secureData;
            },
            set: function (secureData) {
                this.secureData = secureData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SecureKeyPair.prototype, "secureKeyProperty", {
            /**
               @property {string} secureKey
               Key of the secured element The 'secureKeyProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'secureKey'.
            */
            get: function () {
                return this.secureKey;
            },
            set: function (secureKey) {
                this.secureKey = secureKey;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the object value

           @return {string} Value.
           @since v2.0
        */
        SecureKeyPair.prototype.getSecureData = function () {
            return this.secureData;
        };
        /**
           @method
           Sets the value for this object

           @param {string} secureData value to set.
           @since v2.0
        */
        SecureKeyPair.prototype.setSecureData = function (secureData) {
            this.secureData = secureData;
        };
        /**
           @method
           Returns the object secureKey name.

           @return {string} Key name.
           @since v2.0
        */
        SecureKeyPair.prototype.getSecureKey = function () {
            return this.secureKey;
        };
        /**
           @method
           Sets the secureKey name for this object.

           @param {string} secureKey Key name.
           @since v2.0
        */
        SecureKeyPair.prototype.setSecureKey = function (secureKey) {
            this.secureKey = secureKey;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.SecureKeyPair.
           @return {Adaptive.SecureKeyPair} Wrapped object instance.
        */
        SecureKeyPair.toObject = function (object) {
            var result = new SecureKeyPair(null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.secureKey = object.secureKey;
                result.secureData = object.secureData;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.SecureKeyPair[].
           @return {Adaptive.SecureKeyPair[]} Wrapped object array instance.
        */
        SecureKeyPair.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(SecureKeyPair.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return SecureKeyPair;
    })(APIBean);
    Adaptive.SecureKeyPair = SecureKeyPair;
    /**
       @class Adaptive.Service
       @extends Adaptive.APIBean
       Represents an instance of a service.

       @author Aryslan
       @since v2.0
       @version 1.0
    */
    var Service = (function (_super) {
        __extends(Service, _super);
        /**
           @method constructor
           Constructor used by the implementation

           @param {Adaptive.ServiceEndpoint[]} serviceEndpoints Endpoints of the service
           @param {string} name             Name of the service
           @since v2.0.6
        */
        function Service(serviceEndpoints, name) {
            _super.call(this);
            this.serviceEndpoints = serviceEndpoints;
            this.name = name;
        }
        Object.defineProperty(Service.prototype, "nameProperty", {
            /**
               @property {string} name
               The service name The 'nameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'name'.
            */
            get: function () {
                return this.name;
            },
            set: function (name) {
                this.name = name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "serviceEndpointsProperty", {
            /**
               @property {Adaptive.ServiceEndpoint[]} serviceEndpoints
               Endpoint of the service The 'serviceEndpointsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'serviceEndpoints'.
            */
            get: function () {
                return this.serviceEndpoints;
            },
            set: function (serviceEndpoints) {
                this.serviceEndpoints = serviceEndpoints;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the name

           @return {string} name
           @since v2.0
        */
        Service.prototype.getName = function () {
            return this.name;
        };
        /**
           @method
           Set the name

           @param {string} name Name of the service
           @since v2.0
        */
        Service.prototype.setName = function (name) {
            this.name = name;
        };
        /**
           @method
           Returns the serviceEndpoints

           @return {Adaptive.ServiceEndpoint[]} serviceEndpoints
           @since v2.0
        */
        Service.prototype.getServiceEndpoints = function () {
            return this.serviceEndpoints;
        };
        /**
           @method
           Set the serviceEndpoints

           @param {Adaptive.ServiceEndpoint[]} serviceEndpoints Endpoint of the service
           @since v2.0
        */
        Service.prototype.setServiceEndpoints = function (serviceEndpoints) {
            this.serviceEndpoints = serviceEndpoints;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Service.
           @return {Adaptive.Service} Wrapped object instance.
        */
        Service.toObject = function (object) {
            var result = new Service(null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.serviceEndpoints = ServiceEndpoint.toObjectArray(object.serviceEndpoints);
                result.name = object.name;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Service[].
           @return {Adaptive.Service[]} Wrapped object array instance.
        */
        Service.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(Service.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return Service;
    })(APIBean);
    Adaptive.Service = Service;
    /**
       @class Adaptive.ServiceEndpoint
       @extends Adaptive.APIBean
       Structure representing a remote or local service access end-point.

       @author Aryslan
       @since v2.0
       @version 1.0
    */
    var ServiceEndpoint = (function (_super) {
        __extends(ServiceEndpoint, _super);
        /**
           @method constructor
           Constructor with parameters

           @param {string} hostURI Remote service hostURI
           @param {Adaptive.ServicePath[]} paths   Remote service Paths
           @since v2.0.6
        */
        function ServiceEndpoint(hostURI, paths) {
            _super.call(this);
            this.hostURI = hostURI;
            this.paths = paths;
        }
        Object.defineProperty(ServiceEndpoint.prototype, "validationTypeProperty", {
            /**
               @property {Adaptive.IServiceCertificateValidation} validationType
               Type of validation to be performed for SSL hosts. The 'validationTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'validationType'.
            */
            get: function () {
                return this.validationType;
            },
            set: function (validationType) {
                this.validationType = validationType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceEndpoint.prototype, "hostURIProperty", {
            /**
               @property {string} hostURI
               The remote service hostURI URI (alias or IP) composed of scheme://hostURI:port (http://hostURI:8080). The 'hostURIProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'hostURI'.
            */
            get: function () {
                return this.hostURI;
            },
            set: function (hostURI) {
                this.hostURI = hostURI;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceEndpoint.prototype, "pathsProperty", {
            /**
               @property {Adaptive.ServicePath[]} paths
               The remote service paths (to be added to the hostURI and port url). The 'pathsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'paths'.
            */
            get: function () {
                return this.paths;
            },
            set: function (paths) {
                this.paths = paths;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Gets the validation type for the certificate of a SSL host.

           @return {Adaptive.IServiceCertificateValidation} Type of validation.
           @since v2.0.6
        */
        ServiceEndpoint.prototype.getValidationType = function () {
            return this.validationType;
        };
        /**
           @method
           Sets the validation type for the certificate of a SSL host.

           @param {Adaptive.IServiceCertificateValidation} validationType Type of validation.
           @since v2.0.6
        */
        ServiceEndpoint.prototype.setValidationType = function (validationType) {
            this.validationType = validationType;
        };
        /**
           @method
           Returns the Remote service hostURI

           @return {string} Remote service hostURI
           @since v2.0
        */
        ServiceEndpoint.prototype.getHostURI = function () {
            return this.hostURI;
        };
        /**
           @method
           Set the Remote service hostURI

           @param {string} hostURI Remote service hostURI
           @since v2.0
        */
        ServiceEndpoint.prototype.setHostURI = function (hostURI) {
            this.hostURI = hostURI;
        };
        /**
           @method
           Returns the Remote service Paths

           @return {Adaptive.ServicePath[]} Remote service Paths
           @since v2.0
        */
        ServiceEndpoint.prototype.getPaths = function () {
            return this.paths;
        };
        /**
           @method
           Set the Remote service Paths

           @param {Adaptive.ServicePath[]} paths Remote service Paths
           @since v2.0
        */
        ServiceEndpoint.prototype.setPaths = function (paths) {
            this.paths = paths;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceEndpoint.
           @return {Adaptive.ServiceEndpoint} Wrapped object instance.
        */
        ServiceEndpoint.toObject = function (object) {
            var result = new ServiceEndpoint(null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.validationType = IServiceCertificateValidation.toObject(object.validationType);
                result.hostURI = object.hostURI;
                result.paths = ServicePath.toObjectArray(object.paths);
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceEndpoint[].
           @return {Adaptive.ServiceEndpoint[]} Wrapped object array instance.
        */
        ServiceEndpoint.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(ServiceEndpoint.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return ServiceEndpoint;
    })(APIBean);
    Adaptive.ServiceEndpoint = ServiceEndpoint;
    /**
       @class Adaptive.ServicePath
       @extends Adaptive.APIBean
       Structure representing a service path for one endpoint

       @author fnva
       @since v2.0.4
       @version 1.0
    */
    var ServicePath = (function (_super) {
        __extends(ServicePath, _super);
        /**
           @method constructor
           Constructor with parameters.

           @param {string} path    The path for the endpoint
           @param {Adaptive.IServiceMethod[]} methods The methods for calling a path
           @param {Adaptive.IServiceType} type    Protocol type.
           @since v2.0.6
        */
        function ServicePath(path, methods, type) {
            _super.call(this);
            this.path = path;
            this.methods = methods;
            this.type = type;
        }
        Object.defineProperty(ServicePath.prototype, "typeProperty", {
            /**
               @property {Adaptive.IServiceType} type
               Service endpoint type. The 'typeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'type'.
            */
            get: function () {
                return this.type;
            },
            set: function (type) {
                this.type = type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServicePath.prototype, "methodsProperty", {
            /**
               @property {Adaptive.IServiceMethod[]} methods
               The methods for calling a path. The 'methodsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'methods'.
            */
            get: function () {
                return this.methods;
            },
            set: function (methods) {
                this.methods = methods;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServicePath.prototype, "pathProperty", {
            /**
               @property {string} path
               The path for the endpoint. The 'pathProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'path'.
            */
            get: function () {
                return this.path;
            },
            set: function (path) {
                this.path = path;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Gets the protocol for the path.

           @return {Adaptive.IServiceType} Type of protocol.
           @since v2.0.6
        */
        ServicePath.prototype.getType = function () {
            return this.type;
        };
        /**
           @method
           Sets the protocol for the path.

           @param {Adaptive.IServiceType} type Type of protocol.
           @since v2.0.6
        */
        ServicePath.prototype.setType = function (type) {
            this.type = type;
        };
        /**
           @method
           Endpoint's path methods setter

           @return {Adaptive.IServiceMethod[]} Endpoint's path methods
           @since v2.0.4
        */
        ServicePath.prototype.getMethods = function () {
            return this.methods;
        };
        /**
           @method
           Endpoint's path methods setter

           @param {Adaptive.IServiceMethod[]} methods Endpoint's path methods
           @since v2.0.4
        */
        ServicePath.prototype.setMethods = function (methods) {
            this.methods = methods;
        };
        /**
           @method
           Endpoint's Path Getter

           @return {string} Endpoint's Path
           @since v2.0.4
        */
        ServicePath.prototype.getPath = function () {
            return this.path;
        };
        /**
           @method
           Endpoint's path setter

           @param {string} path Endpoint's path
           @since v2.0.4
        */
        ServicePath.prototype.setPath = function (path) {
            this.path = path;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServicePath.
           @return {Adaptive.ServicePath} Wrapped object instance.
        */
        ServicePath.toObject = function (object) {
            var result = new ServicePath(null, null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.path = object.path;
                if (object.methods != null) {
                    result.methods = new Array();
                    for (var imethods = 0; imethods < object.methods.length; imethods++) {
                        var vmethods = object.methods[imethods];
                        result.methods.push(IServiceMethod.toObject(vmethods));
                    }
                }
                result.type = IServiceType.toObject(object.type);
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServicePath[].
           @return {Adaptive.ServicePath[]} Wrapped object array instance.
        */
        ServicePath.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(ServicePath.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return ServicePath;
    })(APIBean);
    Adaptive.ServicePath = ServicePath;
    /**
       @class Adaptive.ServiceRequest
       @extends Adaptive.APIBean
       Represents a local or remote service request.

       @author Aryslan
       @since v2.0
       @version 1.0
    */
    var ServiceRequest = (function (_super) {
        __extends(ServiceRequest, _super);
        /**
           @method constructor
           Convenience constructor.

           @param {string} content      Content payload.
           @param {Adaptive.ServiceToken} serviceToken ServiceToken for the request.
           @since v2.0.6
        */
        function ServiceRequest(content, serviceToken) {
            _super.call(this);
            this.content = content;
            this.serviceToken = serviceToken;
        }
        Object.defineProperty(ServiceRequest.prototype, "contentEncodingProperty", {
            /**
               @property {Adaptive.IServiceContentEncoding} contentEncoding
               Encoding of the content - by default assumed to be UTF8. This may be populated by the application, the platform
  populates this field with defaults for the service. The 'contentEncodingProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contentEncoding'.
            */
            get: function () {
                return this.contentEncoding;
            },
            set: function (contentEncoding) {
                this.contentEncoding = contentEncoding;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceRequest.prototype, "bodyParametersProperty", {
            /**
               @property {Adaptive.ServiceRequestParameter[]} bodyParameters
               Body parameters to be included in the body of the request to a service. These may be applied
  during GET/POST operations. No body parameters are included if this array is null or length zero. The 'bodyParametersProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'bodyParameters'.
            */
            get: function () {
                return this.bodyParameters;
            },
            set: function (bodyParameters) {
                this.bodyParameters = bodyParameters;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceRequest.prototype, "contentProperty", {
            /**
               @property {string} content
               Request data content (plain text). This should be populated by the application. The content should be
  in some well-known web format - in specific, binaries submitted should be encoded to base64 and the content
  type should be set respectively by the application. The 'contentProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'content'.
            */
            get: function () {
                return this.content;
            },
            set: function (content) {
                this.content = content;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceRequest.prototype, "contentLengthProperty", {
            /**
               @property {number} contentLength
               The length in bytes of the content. This may be populated by the application, the platform
  calculates this length automatically if a specific contentLength is not specified. The 'contentLengthProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contentLength'.
            */
            get: function () {
                return this.contentLength;
            },
            set: function (contentLength) {
                this.contentLength = contentLength;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceRequest.prototype, "contentTypeProperty", {
            /**
               @property {string} contentType
               The request content type (MIME TYPE). This may be populated by the application, the platform
  populates this field with defaults for the service. The 'contentTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contentType'.
            */
            get: function () {
                return this.contentType;
            },
            set: function (contentType) {
                this.contentType = contentType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceRequest.prototype, "queryParametersProperty", {
            /**
               @property {Adaptive.ServiceRequestParameter[]} queryParameters
               Query string parameters to be appended to the service URL when making the request. These may be applied
  during GET/POST operations. No query parameters are appended if this array is null or length zero. The 'queryParametersProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'queryParameters'.
            */
            get: function () {
                return this.queryParameters;
            },
            set: function (queryParameters) {
                this.queryParameters = queryParameters;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceRequest.prototype, "refererHostProperty", {
            /**
               @property {string} refererHost
               This host indicates the origin host of the request. This, could be useful in case of redirected requests. The 'refererHostProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'refererHost'.
            */
            get: function () {
                return this.refererHost;
            },
            set: function (refererHost) {
                this.refererHost = refererHost;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceRequest.prototype, "serviceHeadersProperty", {
            /**
               @property {Adaptive.ServiceHeader[]} serviceHeaders
               The serviceHeaders array (name,value pairs) to be included in the request. This may be populated by the
  application, the platform populates this field with defaults for the service and the previous headers.
  In specific, the platform maintains request and response state automatically. The 'serviceHeadersProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'serviceHeaders'.
            */
            get: function () {
                return this.serviceHeaders;
            },
            set: function (serviceHeaders) {
                this.serviceHeaders = serviceHeaders;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceRequest.prototype, "serviceSessionProperty", {
            /**
               @property {Adaptive.ServiceSession} serviceSession
               Session attributes and cookies. This may be populated by the application, the platform populates
  this field with defaults for the service and the previous state information. In specific, the platform
  maintains request and response state automatically. The 'serviceSessionProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'serviceSession'.
            */
            get: function () {
                return this.serviceSession;
            },
            set: function (serviceSession) {
                this.serviceSession = serviceSession;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceRequest.prototype, "serviceTokenProperty", {
            /**
               @property {Adaptive.ServiceToken} serviceToken
               Token used for the creation of the request with the destination service, endpoint, function and method
  identifiers. This should not be manipulated by the application directly. The 'serviceTokenProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'serviceToken'.
            */
            get: function () {
                return this.serviceToken;
            },
            set: function (serviceToken) {
                this.serviceToken = serviceToken;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceRequest.prototype, "userAgentProperty", {
            /**
               @property {string} userAgent
               This attribute allows for the default user-agent string to be overridden by the application. The 'userAgentProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'userAgent'.
            */
            get: function () {
                return this.userAgent;
            },
            set: function (userAgent) {
                this.userAgent = userAgent;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the content encoding

           @return {Adaptive.IServiceContentEncoding} contentEncoding
           @since v2.0
        */
        ServiceRequest.prototype.getContentEncoding = function () {
            return this.contentEncoding;
        };
        /**
           @method
           Set the content encoding

           @param {Adaptive.IServiceContentEncoding} contentEncoding Encoding of the binary payload - by default assumed to be UTF8.
           @since v2.0
        */
        ServiceRequest.prototype.setContentEncoding = function (contentEncoding) {
            this.contentEncoding = contentEncoding;
        };
        /**
           @method
           Gets the body parameters of the request.

           @return {Adaptive.ServiceRequestParameter[]} ServiceRequestParameter array or null if none are specified.
           @since v2.0.6
        */
        ServiceRequest.prototype.getBodyParameters = function () {
            return this.bodyParameters;
        };
        /**
           @method
           Sets the body parameters of the request.

           @param {Adaptive.ServiceRequestParameter[]} bodyParameters ServiceRequestParameter array or null if none are specified.
           @since v2.0.6
        */
        ServiceRequest.prototype.setBodyParameters = function (bodyParameters) {
            this.bodyParameters = bodyParameters;
        };
        /**
           @method
           Returns the content

           @return {string} content
           @since v2.0
        */
        ServiceRequest.prototype.getContent = function () {
            return this.content;
        };
        /**
           @method
           Set the content

           @param {string} content Request/Response data content (plain text)
           @since v2.0
        */
        ServiceRequest.prototype.setContent = function (content) {
            this.content = content;
        };
        /**
           @method
           Returns the content length

           @return {number} contentLength
           @since v2.0
        */
        ServiceRequest.prototype.getContentLength = function () {
            return this.contentLength;
        };
        /**
           @method
           Set the content length

           @param {number} contentLength The length in bytes for the Content field.
           @since v2.0
        */
        ServiceRequest.prototype.setContentLength = function (contentLength) {
            this.contentLength = contentLength;
        };
        /**
           @method
           Returns the content type

           @return {string} contentType
           @since v2.0
        */
        ServiceRequest.prototype.getContentType = function () {
            return this.contentType;
        };
        /**
           @method
           Set the content type

           @param {string} contentType The request/response content type (MIME TYPE).
           @since v2.0
        */
        ServiceRequest.prototype.setContentType = function (contentType) {
            this.contentType = contentType;
        };
        /**
           @method
           Gets the query parameters of the request.

           @return {Adaptive.ServiceRequestParameter[]} ServiceRequestParameter array or null if none are specified.
           @since v2.0.6
        */
        ServiceRequest.prototype.getQueryParameters = function () {
            return this.queryParameters;
        };
        /**
           @method
           Sets the query parameters of the request.

           @param {Adaptive.ServiceRequestParameter[]} queryParameters ServiceRequestParameter array or null if none are specified.
           @since v2.0.6
        */
        ServiceRequest.prototype.setQueryParameters = function (queryParameters) {
            this.queryParameters = queryParameters;
        };
        /**
           @method
           Returns the referer host (origin) of the request.

           @return {string} Referer host of the request
           @since v2.1.4
        */
        ServiceRequest.prototype.getRefererHost = function () {
            return this.refererHost;
        };
        /**
           @method
           Sets the value for the referer host of the request.

           @param {string} refererHost Referer host of the request
           @since v2.1.4
        */
        ServiceRequest.prototype.setRefererHost = function (refererHost) {
            this.refererHost = refererHost;
        };
        /**
           @method
           Returns the array of ServiceHeader

           @return {Adaptive.ServiceHeader[]} serviceHeaders
           @since v2.0
        */
        ServiceRequest.prototype.getServiceHeaders = function () {
            return this.serviceHeaders;
        };
        /**
           @method
           Set the array of ServiceHeader

           @param {Adaptive.ServiceHeader[]} serviceHeaders The serviceHeaders array (name,value pairs) to be included on the I/O service request.
           @since v2.0
        */
        ServiceRequest.prototype.setServiceHeaders = function (serviceHeaders) {
            this.serviceHeaders = serviceHeaders;
        };
        /**
           @method
           Getter for service session

           @return {Adaptive.ServiceSession} The element service session
           @since v2.0
        */
        ServiceRequest.prototype.getServiceSession = function () {
            return this.serviceSession;
        };
        /**
           @method
           Setter for service session

           @param {Adaptive.ServiceSession} serviceSession The element service session
           @since v2.0
        */
        ServiceRequest.prototype.setServiceSession = function (serviceSession) {
            this.serviceSession = serviceSession;
        };
        /**
           @method
           Gets the ServiceToken of the request.

           @return {Adaptive.ServiceToken} ServiceToken.
           @since v2.0.6
        */
        ServiceRequest.prototype.getServiceToken = function () {
            return this.serviceToken;
        };
        /**
           @method
           Sets the ServiceToken of the request.

           @param {Adaptive.ServiceToken} serviceToken ServiceToken to be used for the invocation.
           @since v2.0.6
        */
        ServiceRequest.prototype.setServiceToken = function (serviceToken) {
            this.serviceToken = serviceToken;
        };
        /**
           @method
           Gets the overridden user-agent string.

           @return {string} User-agent string.
           @since v2.0.6
        */
        ServiceRequest.prototype.getUserAgent = function () {
            return this.userAgent;
        };
        /**
           @method
           Sets the user-agent to override the default user-agent string.

           @param {string} userAgent User-agent string.
           @since v2.0.6
        */
        ServiceRequest.prototype.setUserAgent = function (userAgent) {
            this.userAgent = userAgent;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceRequest.
           @return {Adaptive.ServiceRequest} Wrapped object instance.
        */
        ServiceRequest.toObject = function (object) {
            var result = new ServiceRequest(null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.userAgent = object.userAgent;
                result.content = object.content;
                result.contentType = object.contentType;
                result.contentEncoding = IServiceContentEncoding.toObject(object.contentEncoding);
                result.contentLength = object.contentLength;
                result.serviceHeaders = ServiceHeader.toObjectArray(object.serviceHeaders);
                result.serviceSession = ServiceSession.toObject(object.serviceSession);
                result.queryParameters = ServiceRequestParameter.toObjectArray(object.queryParameters);
                result.bodyParameters = ServiceRequestParameter.toObjectArray(object.bodyParameters);
                result.serviceToken = ServiceToken.toObject(object.serviceToken);
                result.refererHost = object.refererHost;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceRequest[].
           @return {Adaptive.ServiceRequest[]} Wrapped object array instance.
        */
        ServiceRequest.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(ServiceRequest.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return ServiceRequest;
    })(APIBean);
    Adaptive.ServiceRequest = ServiceRequest;
    /**
       @class Adaptive.ServiceResponse
       @extends Adaptive.APIBean
       Represents a local or remote service response.

       @author Aryslan
       @since v2.0
       @version 1.0
    */
    var ServiceResponse = (function (_super) {
        __extends(ServiceResponse, _super);
        /**
           @method constructor
           Constructor with fields

           @param {string} content         Request/Response data content (plain text).
           @param {string} contentType     The request/response content type (MIME TYPE).
           @param {Adaptive.IServiceContentEncoding} contentEncoding Encoding of the binary payload - by default assumed to be UTF8.
           @param {number} contentLength   The length in bytes for the Content field.
           @param {Adaptive.ServiceHeader[]} serviceHeaders  The serviceHeaders array (name,value pairs) to be included on the I/O service request.
           @param {Adaptive.ServiceSession} serviceSession  Information about the session
           @param {number} statusCode      HTTP Status code of the response.
           @since v2.0
        */
        function ServiceResponse(content, contentType, contentEncoding, contentLength, serviceHeaders, serviceSession, statusCode) {
            _super.call(this);
            this.content = content;
            this.contentType = contentType;
            this.contentEncoding = contentEncoding;
            this.contentLength = contentLength;
            this.serviceHeaders = serviceHeaders;
            this.serviceSession = serviceSession;
            this.statusCode = statusCode;
        }
        Object.defineProperty(ServiceResponse.prototype, "contentEncodingProperty", {
            /**
               @property {Adaptive.IServiceContentEncoding} contentEncoding
               Encoding of the binary payload - by default assumed to be UTF8. The 'contentEncodingProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contentEncoding'.
            */
            get: function () {
                return this.contentEncoding;
            },
            set: function (contentEncoding) {
                this.contentEncoding = contentEncoding;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceResponse.prototype, "contentProperty", {
            /**
               @property {string} content
               Response data content. The content should be in some well-known web format - in specific, binaries returned
  should be encoded in base64. The 'contentProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'content'.
            */
            get: function () {
                return this.content;
            },
            set: function (content) {
                this.content = content;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceResponse.prototype, "contentLengthProperty", {
            /**
               @property {number} contentLength
               The length in bytes for the Content field. The 'contentLengthProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contentLength'.
            */
            get: function () {
                return this.contentLength;
            },
            set: function (contentLength) {
                this.contentLength = contentLength;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceResponse.prototype, "contentTypeProperty", {
            /**
               @property {string} contentType
               The request/response content type (MIME TYPE). The 'contentTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contentType'.
            */
            get: function () {
                return this.contentType;
            },
            set: function (contentType) {
                this.contentType = contentType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceResponse.prototype, "serviceHeadersProperty", {
            /**
               @property {Adaptive.ServiceHeader[]} serviceHeaders
               The serviceHeaders array (name,value pairs) to be included on the I/O service request. The 'serviceHeadersProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'serviceHeaders'.
            */
            get: function () {
                return this.serviceHeaders;
            },
            set: function (serviceHeaders) {
                this.serviceHeaders = serviceHeaders;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceResponse.prototype, "serviceSessionProperty", {
            /**
               @property {Adaptive.ServiceSession} serviceSession
               Information about the session. The 'serviceSessionProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'serviceSession'.
            */
            get: function () {
                return this.serviceSession;
            },
            set: function (serviceSession) {
                this.serviceSession = serviceSession;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceResponse.prototype, "statusCodeProperty", {
            /**
               @property {number} statusCode
               HTTP Status code of the response. With this status code it is possible to perform some actions, redirects, authentication, etc. The 'statusCodeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'statusCode'.
            */
            get: function () {
                return this.statusCode;
            },
            set: function (statusCode) {
                this.statusCode = statusCode;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the content encoding

           @return {Adaptive.IServiceContentEncoding} contentEncoding
           @since v2.0
        */
        ServiceResponse.prototype.getContentEncoding = function () {
            return this.contentEncoding;
        };
        /**
           @method
           Set the content encoding

           @param {Adaptive.IServiceContentEncoding} contentEncoding Encoding of the binary payload - by default assumed to be UTF8.
           @since v2.0
        */
        ServiceResponse.prototype.setContentEncoding = function (contentEncoding) {
            this.contentEncoding = contentEncoding;
        };
        /**
           @method
           Returns the content

           @return {string} content
           @since v2.0
        */
        ServiceResponse.prototype.getContent = function () {
            return this.content;
        };
        /**
           @method
           Set the content

           @param {string} content Request/Response data content (plain text).
           @since v2.0
        */
        ServiceResponse.prototype.setContent = function (content) {
            this.content = content;
        };
        /**
           @method
           Returns the content length

           @return {number} contentLength
           @since v2.0
        */
        ServiceResponse.prototype.getContentLength = function () {
            return this.contentLength;
        };
        /**
           @method
           Set the content length.

           @param {number} contentLength The length in bytes for the Content field.
           @since v2.0
        */
        ServiceResponse.prototype.setContentLength = function (contentLength) {
            this.contentLength = contentLength;
        };
        /**
           @method
           Returns the content type

           @return {string} contentType
           @since v2.0
        */
        ServiceResponse.prototype.getContentType = function () {
            return this.contentType;
        };
        /**
           @method
           Set the content type

           @param {string} contentType The request/response content type (MIME TYPE).
           @since v2.0
        */
        ServiceResponse.prototype.setContentType = function (contentType) {
            this.contentType = contentType;
        };
        /**
           @method
           Returns the array of ServiceHeader

           @return {Adaptive.ServiceHeader[]} serviceHeaders
           @since v2.0
        */
        ServiceResponse.prototype.getServiceHeaders = function () {
            return this.serviceHeaders;
        };
        /**
           @method
           Set the array of ServiceHeader

           @param {Adaptive.ServiceHeader[]} serviceHeaders The serviceHeaders array (name,value pairs) to be included on the I/O service request.
           @since v2.0
        */
        ServiceResponse.prototype.setServiceHeaders = function (serviceHeaders) {
            this.serviceHeaders = serviceHeaders;
        };
        /**
           @method
           Getter for service session

           @return {Adaptive.ServiceSession} The element service session
           @since v2.0
        */
        ServiceResponse.prototype.getServiceSession = function () {
            return this.serviceSession;
        };
        /**
           @method
           Setter for service session

           @param {Adaptive.ServiceSession} serviceSession The element service session
           @since v2.0
        */
        ServiceResponse.prototype.setServiceSession = function (serviceSession) {
            this.serviceSession = serviceSession;
        };
        /**
           @method
           Returns the status code of the response.

           @return {number} HTTP status code
           @since v2.1.4
        */
        ServiceResponse.prototype.getStatusCode = function () {
            return this.statusCode;
        };
        /**
           @method
           Sets the status code of the response

           @param {number} statusCode HTTP status code
           @since v2.1.4
        */
        ServiceResponse.prototype.setStatusCode = function (statusCode) {
            this.statusCode = statusCode;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceResponse.
           @return {Adaptive.ServiceResponse} Wrapped object instance.
        */
        ServiceResponse.toObject = function (object) {
            var result = new ServiceResponse(null, null, null, null, null, null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.content = object.content;
                result.contentType = object.contentType;
                result.contentEncoding = IServiceContentEncoding.toObject(object.contentEncoding);
                result.contentLength = object.contentLength;
                result.serviceHeaders = ServiceHeader.toObjectArray(object.serviceHeaders);
                result.serviceSession = ServiceSession.toObject(object.serviceSession);
                result.statusCode = object.statusCode;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceResponse[].
           @return {Adaptive.ServiceResponse[]} Wrapped object array instance.
        */
        ServiceResponse.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(ServiceResponse.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return ServiceResponse;
    })(APIBean);
    Adaptive.ServiceResponse = ServiceResponse;
    /**
       @class Adaptive.ServiceSession
       @extends Adaptive.APIBean
       Represents a session object for HTTP request and responses

       @author Ferran Vila Conesa
       @since v2.0
       @version 1.0
    */
    var ServiceSession = (function (_super) {
        __extends(ServiceSession, _super);
        /**
           @method constructor
           Constructor with fields.

           @param {Adaptive.ServiceSessionCookie[]} cookies    The cookies of the request or response.
           @param {Adaptive.ServiceSessionAttribute[]} attributes Attributes of the request or response.
           @since v2.0
        */
        function ServiceSession(cookies, attributes) {
            _super.call(this);
            this.cookies = cookies;
            this.attributes = attributes;
        }
        Object.defineProperty(ServiceSession.prototype, "attributesProperty", {
            /**
               @property {Adaptive.ServiceSessionAttribute[]} attributes
               The attributes of the request or response. The 'attributesProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'attributes'.
            */
            get: function () {
                return this.attributes;
            },
            set: function (attributes) {
                this.attributes = attributes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceSession.prototype, "cookiesProperty", {
            /**
               @property {Adaptive.ServiceSessionCookie[]} cookies
               The cookies of the request or response. The 'cookiesProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'cookies'.
            */
            get: function () {
                return this.cookies;
            },
            set: function (cookies) {
                this.cookies = cookies;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Gets the attributes of the request or response.

           @return {Adaptive.ServiceSessionAttribute[]} Attributes of the request or response.
           @since v2.0
        */
        ServiceSession.prototype.getAttributes = function () {
            return this.attributes;
        };
        /**
           @method
           Sets the attributes for the request or response.

           @param {Adaptive.ServiceSessionAttribute[]} attributes Attributes of the request or response.
           @since v2.0
        */
        ServiceSession.prototype.setAttributes = function (attributes) {
            this.attributes = attributes;
        };
        /**
           @method
           Returns the cookies of the request or response.

           @return {Adaptive.ServiceSessionCookie[]} The cookies of the request or response.
           @since v2.0
        */
        ServiceSession.prototype.getCookies = function () {
            return this.cookies;
        };
        /**
           @method
           Sets the cookies of the request or response.

           @param {Adaptive.ServiceSessionCookie[]} cookies The cookies of the request or response.
           @since v2.0
        */
        ServiceSession.prototype.setCookies = function (cookies) {
            this.cookies = cookies;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceSession.
           @return {Adaptive.ServiceSession} Wrapped object instance.
        */
        ServiceSession.toObject = function (object) {
            var result = new ServiceSession(null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.cookies = ServiceSessionCookie.toObjectArray(object.cookies);
                result.attributes = ServiceSessionAttribute.toObjectArray(object.attributes);
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceSession[].
           @return {Adaptive.ServiceSession[]} Wrapped object array instance.
        */
        ServiceSession.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(ServiceSession.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return ServiceSession;
    })(APIBean);
    Adaptive.ServiceSession = ServiceSession;
    /**
       @class Adaptive.ServiceSessionCookie
       @extends Adaptive.APIBean
       Structure representing the cookieValue of a http cookie.

       @author Aryslan
       @since v2.0
       @version 1.0
    */
    var ServiceSessionCookie = (function (_super) {
        __extends(ServiceSessionCookie, _super);
        /**
           @method constructor
           Constructor used by the implementation

           @param {string} cookieName  Name of the cookie
           @param {string} cookieValue Value of the cookie
           @since v2.0
        */
        function ServiceSessionCookie(cookieName, cookieValue) {
            _super.call(this);
            this.cookieName = cookieName;
            this.cookieValue = cookieValue;
        }
        Object.defineProperty(ServiceSessionCookie.prototype, "cookieNameProperty", {
            /**
               @property {string} cookieName
               Name ot the cookie. The 'cookieNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'cookieName'.
            */
            get: function () {
                return this.cookieName;
            },
            set: function (cookieName) {
                this.cookieName = cookieName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceSessionCookie.prototype, "cookieValueProperty", {
            /**
               @property {string} cookieValue
               Value of the ServiceCookie. The 'cookieValueProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'cookieValue'.
            */
            get: function () {
                return this.cookieValue;
            },
            set: function (cookieValue) {
                this.cookieValue = cookieValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceSessionCookie.prototype, "creationProperty", {
            /**
               @property {number} creation
               ServiceCookie creation timestamp in milliseconds. The 'creationProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'creation'.
            */
            get: function () {
                return this.creation;
            },
            set: function (creation) {
                this.creation = creation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceSessionCookie.prototype, "domainProperty", {
            /**
               @property {string} domain
               Domain for which the cookie is valid. The 'domainProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'domain'.
            */
            get: function () {
                return this.domain;
            },
            set: function (domain) {
                this.domain = domain;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceSessionCookie.prototype, "expiryProperty", {
            /**
               @property {number} expiry
               ServiceCookie expiry in milliseconds or -1 for session only. The 'expiryProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'expiry'.
            */
            get: function () {
                return this.expiry;
            },
            set: function (expiry) {
                this.expiry = expiry;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceSessionCookie.prototype, "pathProperty", {
            /**
               @property {string} path
               URI path for which the cookie is valid. The 'pathProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'path'.
            */
            get: function () {
                return this.path;
            },
            set: function (path) {
                this.path = path;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceSessionCookie.prototype, "schemeProperty", {
            /**
               @property {string} scheme
               Scheme of the domain - http/https - for which the cookie is valid. The 'schemeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'scheme'.
            */
            get: function () {
                return this.scheme;
            },
            set: function (scheme) {
                this.scheme = scheme;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceSessionCookie.prototype, "secureProperty", {
            /**
               @property {boolean} secure
               ServiceCookie is secure (https only). The 'secureProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'secure'.
            */
            get: function () {
                return this.secure;
            },
            set: function (secure) {
                this.secure = secure;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns the cookie cookieName

           @return {string} cookieName Name of the cookie
           @since v2.0
        */
        ServiceSessionCookie.prototype.getCookieName = function () {
            return this.cookieName;
        };
        /**
           @method
           Set the cookie cookieName

           @param {string} cookieName Name of the cookie
           @since v2.0
        */
        ServiceSessionCookie.prototype.setCookieName = function (cookieName) {
            this.cookieName = cookieName;
        };
        /**
           @method
           Returns the cookie cookieValue

           @return {string} Value of the cookie
           @since v2.0
        */
        ServiceSessionCookie.prototype.getCookieValue = function () {
            return this.cookieValue;
        };
        /**
           @method
           Set the cookie cookieValue

           @param {string} cookieValue Value of the cookie
           @since v2.0
        */
        ServiceSessionCookie.prototype.setCookieValue = function (cookieValue) {
            this.cookieValue = cookieValue;
        };
        /**
           @method
           Returns the creation date

           @return {number} Creation date of the cookie
           @since v2.0
        */
        ServiceSessionCookie.prototype.getCreation = function () {
            return this.creation;
        };
        /**
           @method
           Sets the creation date

           @param {number} creation Creation date of the cookie
           @since v2.0
        */
        ServiceSessionCookie.prototype.setCreation = function (creation) {
            this.creation = creation;
        };
        /**
           @method
           Returns the domain

           @return {string} domain
           @since v2.0
        */
        ServiceSessionCookie.prototype.getDomain = function () {
            return this.domain;
        };
        /**
           @method
           Set the domain

           @param {string} domain Domain of the cookie
           @since v2.0
        */
        ServiceSessionCookie.prototype.setDomain = function (domain) {
            this.domain = domain;
        };
        /**
           @method
           Returns the expiration date in milis

           @return {number} expiry
           @since v2.0
        */
        ServiceSessionCookie.prototype.getExpiry = function () {
            return this.expiry;
        };
        /**
           @method
           Set the expiration date in milis

           @param {number} expiry Expiration date of the cookie
           @since v2.0
        */
        ServiceSessionCookie.prototype.setExpiry = function (expiry) {
            this.expiry = expiry;
        };
        /**
           @method
           Returns the path

           @return {string} path
           @since v2.0
        */
        ServiceSessionCookie.prototype.getPath = function () {
            return this.path;
        };
        /**
           @method
           Set the path

           @param {string} path Path of the cookie
           @since v2.0
        */
        ServiceSessionCookie.prototype.setPath = function (path) {
            this.path = path;
        };
        /**
           @method
           Returns the scheme

           @return {string} scheme
           @since v2.0
        */
        ServiceSessionCookie.prototype.getScheme = function () {
            return this.scheme;
        };
        /**
           @method
           Set the scheme

           @param {string} scheme Scheme of the cookie
           @since v2.0
        */
        ServiceSessionCookie.prototype.setScheme = function (scheme) {
            this.scheme = scheme;
        };
        /**
           @method
           Returns whether the cookie is secure or not

           @return {boolean} true if the cookie is secure; false otherwise
           @since v2.0
        */
        ServiceSessionCookie.prototype.getSecure = function () {
            return this.secure;
        };
        /**
           @method
           Set whether the cookie is secure or not

           @param {boolean} secure Privacy of the cookie
           @since v2.0
        */
        ServiceSessionCookie.prototype.setSecure = function (secure) {
            this.secure = secure;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceSessionCookie.
           @return {Adaptive.ServiceSessionCookie} Wrapped object instance.
        */
        ServiceSessionCookie.toObject = function (object) {
            var result = new ServiceSessionCookie(null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.cookieName = object.cookieName;
                result.cookieValue = object.cookieValue;
                result.domain = object.domain;
                result.path = object.path;
                result.scheme = object.scheme;
                result.secure = object.secure;
                result.expiry = object.expiry;
                result.creation = object.creation;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceSessionCookie[].
           @return {Adaptive.ServiceSessionCookie[]} Wrapped object array instance.
        */
        ServiceSessionCookie.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(ServiceSessionCookie.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return ServiceSessionCookie;
    })(APIBean);
    Adaptive.ServiceSessionCookie = ServiceSessionCookie;
    /**
       @class Adaptive.ServiceToken
       @extends Adaptive.APIBean
       Object representing a specific service, path, function and invocation method for accessing external services.

       @author Carlos Lozano Diez
       @since v2.0.6
       @version 1.0
    */
    var ServiceToken = (function (_super) {
        __extends(ServiceToken, _super);
        /**
           @method constructor
           Convenience constructor.

           @param {string} serviceName      Name of the configured service.
           @param {string} endpointName     Name of the endpoint configured for the service.
           @param {string} functionName     Name of the function configured for the endpoint.
           @param {Adaptive.IServiceMethod} invocationMethod Method type configured for the function.
           @since v2.0.6
        */
        function ServiceToken(serviceName, endpointName, functionName, invocationMethod) {
            _super.call(this);
            this.serviceName = serviceName;
            this.endpointName = endpointName;
            this.functionName = functionName;
            this.invocationMethod = invocationMethod;
        }
        Object.defineProperty(ServiceToken.prototype, "invocationMethodProperty", {
            /**
               @property {Adaptive.IServiceMethod} invocationMethod
               Http method to be used by the invocation - this is typically GET or POST albeit the platform may support
  other invocation methods. This is also defined per function of each endpoint in the platform's XML file. The 'invocationMethodProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'invocationMethod'.
            */
            get: function () {
                return this.invocationMethod;
            },
            set: function (invocationMethod) {
                this.invocationMethod = invocationMethod;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceToken.prototype, "endpointNameProperty", {
            /**
               @property {string} endpointName
               Name of the endpoint configured in the platform's services XML file. This is a reference to a specific schema,
  host and port combination for a given service. The 'endpointNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'endpointName'.
            */
            get: function () {
                return this.endpointName;
            },
            set: function (endpointName) {
                this.endpointName = endpointName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceToken.prototype, "functionNameProperty", {
            /**
               @property {string} functionName
               Name of the function configured in the platform's services XML file for a specific endpoint. This is a reference
  to a relative path of a function published on a remote service. The 'functionNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'functionName'.
            */
            get: function () {
                return this.functionName;
            },
            set: function (functionName) {
                this.functionName = functionName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceToken.prototype, "serviceNameProperty", {
            /**
               @property {string} serviceName
               Name of the service configured in the platform's services XML file. The 'serviceNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'serviceName'.
            */
            get: function () {
                return this.serviceName;
            },
            set: function (serviceName) {
                this.serviceName = serviceName;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Get token's invocation method type.

           @return {Adaptive.IServiceMethod} Invocation method type.
           @since v2.0.6
        */
        ServiceToken.prototype.getInvocationMethod = function () {
            return this.invocationMethod;
        };
        /**
           @method
           Sets the invocation method type.

           @param {Adaptive.IServiceMethod} invocationMethod Method type.
           @since v2.0.6
        */
        ServiceToken.prototype.setInvocationMethod = function (invocationMethod) {
            this.invocationMethod = invocationMethod;
        };
        /**
           @method
           Get token's endpoint name.

           @return {string} Endpoint name.
           @since v2.0.6
        */
        ServiceToken.prototype.getEndpointName = function () {
            return this.endpointName;
        };
        /**
           @method
           Set the endpoint name.

           @param {string} endpointName Endpoint name.
           @since v2.0.6
        */
        ServiceToken.prototype.setEndpointName = function (endpointName) {
            this.endpointName = endpointName;
        };
        /**
           @method
           Get token's function name.

           @return {string} Function name.
           @since v2.0.6
        */
        ServiceToken.prototype.getFunctionName = function () {
            return this.functionName;
        };
        /**
           @method
           Sets the function name.

           @param {string} functionName Function name.
           @since v2.0.6
        */
        ServiceToken.prototype.setFunctionName = function (functionName) {
            this.functionName = functionName;
        };
        /**
           @method
           Get token's service name.

           @return {string} Service name.
           @since v2.0.6
        */
        ServiceToken.prototype.getServiceName = function () {
            return this.serviceName;
        };
        /**
           @method
           Sets token's service name.

           @param {string} serviceName Service name.
           @since v2.0.6
        */
        ServiceToken.prototype.setServiceName = function (serviceName) {
            this.serviceName = serviceName;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceToken.
           @return {Adaptive.ServiceToken} Wrapped object instance.
        */
        ServiceToken.toObject = function (object) {
            var result = new ServiceToken(null, null, null, null);
            if (object != null) {
                // Assign values to bean fields.
                result.serviceName = object.serviceName;
                result.endpointName = object.endpointName;
                result.functionName = object.functionName;
                result.invocationMethod = IServiceMethod.toObject(object.invocationMethod);
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceToken[].
           @return {Adaptive.ServiceToken[]} Wrapped object array instance.
        */
        ServiceToken.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(ServiceToken.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return ServiceToken;
    })(APIBean);
    Adaptive.ServiceToken = ServiceToken;
    /**
       @class Adaptive.Contact
       @extends Adaptive.ContactUid
       Structure representing the data elements of a contact.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    var Contact = (function (_super) {
        __extends(Contact, _super);
        /**
           @method constructor
           Constructor used by implementation to set the Contact.

           @param {string} contactId of the Contact
           @since v2.0
        */
        function Contact(contactId) {
            _super.call(this, contactId);
        }
        Object.defineProperty(Contact.prototype, "contactAddressesProperty", {
            /**
               @property {Adaptive.ContactAddress[]} contactAddresses
               The adresses from the contact The 'contactAddressesProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactAddresses'.
            */
            get: function () {
                return this.contactAddresses;
            },
            set: function (contactAddresses) {
                this.contactAddresses = contactAddresses;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Contact.prototype, "contactEmailsProperty", {
            /**
               @property {Adaptive.ContactEmail[]} contactEmails
               The emails from the contact The 'contactEmailsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactEmails'.
            */
            get: function () {
                return this.contactEmails;
            },
            set: function (contactEmails) {
                this.contactEmails = contactEmails;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Contact.prototype, "contactPhonesProperty", {
            /**
               @property {Adaptive.ContactPhone[]} contactPhones
               The phones from the contact The 'contactPhonesProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactPhones'.
            */
            get: function () {
                return this.contactPhones;
            },
            set: function (contactPhones) {
                this.contactPhones = contactPhones;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Contact.prototype, "contactSocialsProperty", {
            /**
               @property {Adaptive.ContactSocial[]} contactSocials
               The social network info from the contact The 'contactSocialsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactSocials'.
            */
            get: function () {
                return this.contactSocials;
            },
            set: function (contactSocials) {
                this.contactSocials = contactSocials;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Contact.prototype, "contactTagsProperty", {
            /**
               @property {Adaptive.ContactTag[]} contactTags
               The aditional tags from the contact The 'contactTagsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactTags'.
            */
            get: function () {
                return this.contactTags;
            },
            set: function (contactTags) {
                this.contactTags = contactTags;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Contact.prototype, "contactWebsitesProperty", {
            /**
               @property {Adaptive.ContactWebsite[]} contactWebsites
               The websites from the contact The 'contactWebsitesProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactWebsites'.
            */
            get: function () {
                return this.contactWebsites;
            },
            set: function (contactWebsites) {
                this.contactWebsites = contactWebsites;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Contact.prototype, "personalInfoProperty", {
            /**
               @property {Adaptive.ContactPersonalInfo} personalInfo
               The personal info from the contact The 'personalInfoProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'personalInfo'.
            */
            get: function () {
                return this.personalInfo;
            },
            set: function (personalInfo) {
                this.personalInfo = personalInfo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Contact.prototype, "professionalInfoProperty", {
            /**
               @property {Adaptive.ContactProfessionalInfo} professionalInfo
               The professional info from the contact The 'professionalInfoProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'professionalInfo'.
            */
            get: function () {
                return this.professionalInfo;
            },
            set: function (professionalInfo) {
                this.professionalInfo = professionalInfo;
            },
            enumerable: true,
            configurable: true
        });
        /**
           @method
           Returns all the addresses of the Contact

           @return {Adaptive.ContactAddress[]} ContactAddress[]
           @since v2.0
        */
        Contact.prototype.getContactAddresses = function () {
            return this.contactAddresses;
        };
        /**
           @method
           Set the addresses of the Contact

           @param {Adaptive.ContactAddress[]} contactAddresses Addresses of the contact
           @since v2.0
        */
        Contact.prototype.setContactAddresses = function (contactAddresses) {
            this.contactAddresses = contactAddresses;
        };
        /**
           @method
           Returns all the emails of the Contact

           @return {Adaptive.ContactEmail[]} ContactEmail[]
           @since v2.0
        */
        Contact.prototype.getContactEmails = function () {
            return this.contactEmails;
        };
        /**
           @method
           Set the emails of the Contact

           @param {Adaptive.ContactEmail[]} contactEmails Emails of the contact
           @since v2.0
        */
        Contact.prototype.setContactEmails = function (contactEmails) {
            this.contactEmails = contactEmails;
        };
        /**
           @method
           Returns all the phones of the Contact

           @return {Adaptive.ContactPhone[]} ContactPhone[]
           @since v2.0
        */
        Contact.prototype.getContactPhones = function () {
            return this.contactPhones;
        };
        /**
           @method
           Set the phones of the Contact

           @param {Adaptive.ContactPhone[]} contactPhones Phones of the contact
           @since v2.0
        */
        Contact.prototype.setContactPhones = function (contactPhones) {
            this.contactPhones = contactPhones;
        };
        /**
           @method
           Returns all the social network info of the Contact

           @return {Adaptive.ContactSocial[]} ContactSocial[]
           @since v2.0
        */
        Contact.prototype.getContactSocials = function () {
            return this.contactSocials;
        };
        /**
           @method
           Set the social network info of the Contact

           @param {Adaptive.ContactSocial[]} contactSocials Social Networks of the contact
           @since v2.0
        */
        Contact.prototype.setContactSocials = function (contactSocials) {
            this.contactSocials = contactSocials;
        };
        /**
           @method
           Returns the additional tags of the Contact

           @return {Adaptive.ContactTag[]} ContactTag[]
           @since v2.0
        */
        Contact.prototype.getContactTags = function () {
            return this.contactTags;
        };
        /**
           @method
           Set the additional tags of the Contact

           @param {Adaptive.ContactTag[]} contactTags Tags of the contact
           @since v2.0
        */
        Contact.prototype.setContactTags = function (contactTags) {
            this.contactTags = contactTags;
        };
        /**
           @method
           Returns all the websites of the Contact

           @return {Adaptive.ContactWebsite[]} ContactWebsite[]
           @since v2.0
        */
        Contact.prototype.getContactWebsites = function () {
            return this.contactWebsites;
        };
        /**
           @method
           Set the websites of the Contact

           @param {Adaptive.ContactWebsite[]} contactWebsites Websites of the contact
           @since v2.0
        */
        Contact.prototype.setContactWebsites = function (contactWebsites) {
            this.contactWebsites = contactWebsites;
        };
        /**
           @method
           Returns the personal info of the Contact

           @return {Adaptive.ContactPersonalInfo} ContactPersonalInfo of the Contact
           @since v2.0
        */
        Contact.prototype.getPersonalInfo = function () {
            return this.personalInfo;
        };
        /**
           @method
           Set the personal info of the Contact

           @param {Adaptive.ContactPersonalInfo} personalInfo Personal Information
           @since v2.0
        */
        Contact.prototype.setPersonalInfo = function (personalInfo) {
            this.personalInfo = personalInfo;
        };
        /**
           @method
           Returns the professional info of the Contact

           @return {Adaptive.ContactProfessionalInfo} Array of personal info
           @since v2.0
        */
        Contact.prototype.getProfessionalInfo = function () {
            return this.professionalInfo;
        };
        /**
           @method
           Set the professional info of the Contact

           @param {Adaptive.ContactProfessionalInfo} professionalInfo Professional Information
           @since v2.0
        */
        Contact.prototype.setProfessionalInfo = function (professionalInfo) {
            this.professionalInfo = professionalInfo;
        };
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Contact.
           @return {Adaptive.Contact} Wrapped object instance.
        */
        Contact.toObject = function (object) {
            var result = new Contact(null);
            if (object != null) {
                // Assign values to parent bean fields.
                result.contactId = object.contactId;
                // Assign values to bean fields.
                result.personalInfo = ContactPersonalInfo.toObject(object.personalInfo);
                result.professionalInfo = ContactProfessionalInfo.toObject(object.professionalInfo);
                result.contactAddresses = ContactAddress.toObjectArray(object.contactAddresses);
                result.contactPhones = ContactPhone.toObjectArray(object.contactPhones);
                result.contactEmails = ContactEmail.toObjectArray(object.contactEmails);
                result.contactWebsites = ContactWebsite.toObjectArray(object.contactWebsites);
                result.contactSocials = ContactSocial.toObjectArray(object.contactSocials);
                result.contactTags = ContactTag.toObjectArray(object.contactTags);
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Contact[].
           @return {Adaptive.Contact[]} Wrapped object array instance.
        */
        Contact.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(Contact.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return Contact;
    })(ContactUid);
    Adaptive.Contact = Contact;
    /**
       @class Adaptive.ServiceHeader
       @extends Adaptive.KeyValue
       Structure representing the data of a http request or response header.

       @author Aryslan
       @since v2.0
       @version 1.0
    */
    var ServiceHeader = (function (_super) {
        __extends(ServiceHeader, _super);
        /**
           @method constructor
           Convenience constructor.

           @param {string} keyName Name of the key.
           @param {string} keyData Value of the key.
           @since v2.0.6
        */
        function ServiceHeader(keyName, keyData) {
            _super.call(this, keyName, keyData);
        }
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceHeader.
           @return {Adaptive.ServiceHeader} Wrapped object instance.
        */
        ServiceHeader.toObject = function (object) {
            var result = new ServiceHeader(null, null);
            if (object != null) {
                // Assign values to parent bean fields.
                result.keyName = object.keyName;
                result.keyData = object.keyData;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceHeader[].
           @return {Adaptive.ServiceHeader[]} Wrapped object array instance.
        */
        ServiceHeader.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(ServiceHeader.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return ServiceHeader;
    })(KeyValue);
    Adaptive.ServiceHeader = ServiceHeader;
    /**
       @class Adaptive.ServiceRequestParameter
       @extends Adaptive.KeyValue
       Object representing a request parameter.

       @author Carlos Lozano Diez
       @since 2.0.6
       @version 1.0
    */
    var ServiceRequestParameter = (function (_super) {
        __extends(ServiceRequestParameter, _super);
        /**
           @method constructor
           Convenience constructor.

           @param {string} keyName Name of the key.
           @param {string} keyData Value of the key.
           @since v2.0.6
        */
        function ServiceRequestParameter(keyName, keyData) {
            _super.call(this, keyName, keyData);
        }
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceRequestParameter.
           @return {Adaptive.ServiceRequestParameter} Wrapped object instance.
        */
        ServiceRequestParameter.toObject = function (object) {
            var result = new ServiceRequestParameter(null, null);
            if (object != null) {
                // Assign values to parent bean fields.
                result.keyName = object.keyName;
                result.keyData = object.keyData;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceRequestParameter[].
           @return {Adaptive.ServiceRequestParameter[]} Wrapped object array instance.
        */
        ServiceRequestParameter.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(ServiceRequestParameter.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return ServiceRequestParameter;
    })(KeyValue);
    Adaptive.ServiceRequestParameter = ServiceRequestParameter;
    /**
       @class Adaptive.ServiceSessionAttribute
       @extends Adaptive.KeyValue
       Object representing a service session attribute.

       @author Carlos Lozano Diez
       @since 2.0.6
       @version 1.0
    */
    var ServiceSessionAttribute = (function (_super) {
        __extends(ServiceSessionAttribute, _super);
        /**
           @method constructor
           Convenience constructor.

           @param {string} keyName Name of the key.
           @param {string} keyData Value of the key.
           @since v2.0.6
        */
        function ServiceSessionAttribute(keyName, keyData) {
            _super.call(this, keyName, keyData);
        }
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceSessionAttribute.
           @return {Adaptive.ServiceSessionAttribute} Wrapped object instance.
        */
        ServiceSessionAttribute.toObject = function (object) {
            var result = new ServiceSessionAttribute(null, null);
            if (object != null) {
                // Assign values to parent bean fields.
                result.keyName = object.keyName;
                result.keyData = object.keyData;
            }
            return result;
        };
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceSessionAttribute[].
           @return {Adaptive.ServiceSessionAttribute[]} Wrapped object array instance.
        */
        ServiceSessionAttribute.toObjectArray = function (object) {
            var resultArray = new Array();
            if (object != null) {
                for (var i = 0; i < object.length; i++) {
                    resultArray.push(ServiceSessionAttribute.toObject(object[i]));
                }
            }
            return resultArray;
        };
        return ServiceSessionAttribute;
    })(KeyValue);
    Adaptive.ServiceSessionAttribute = ServiceSessionAttribute;
    /**
       @class Adaptive.BaseListener
    */
    var BaseListener = (function () {
        /**
           @method constructor
           Constructor with listener id.

           @param {number} id  The id of the listener.
        */
        function BaseListener(id) {
            this.id = id;
            this.apiGroup = IAdaptiveRPGroup.Application;
        }
        /**
           @method
           @return {Adaptive.IAdaptiveRPGroup}
           Return the API group for the given interface.
        */
        BaseListener.prototype.getAPIGroup = function () {
            return this.apiGroup;
        };
        /**
           @method
           Return the API version for the given interface.

           @return {string}
           The version of the API.
        */
        BaseListener.prototype.getAPIVersion = function () {
            return Adaptive.bridgeApiVersion;
        };
        /**
           @method
           Return the unique listener identifier. This is used to check if two listeners are the same
in every platform. This id is populated by the Javascript platform
           @return {number}
           Unique Listener identifier
        */
        BaseListener.prototype.getId = function () {
            return this.id;
        };
        return BaseListener;
    })();
    Adaptive.BaseListener = BaseListener;
    /**
       @property {Adaptive.Dictionary} registeredAccelerationListener
       @member Adaptive
       @private
       AccelerationListener control dictionary.
    */
    Adaptive.registeredAccelerationListener = new Dictionary([]);
    // AccelerationListener global listener handlers.
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IAccelerationListenerError} error
    */
    function handleAccelerationListenerError(id, error) {
        var listener = Adaptive.registeredAccelerationListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredAccelerationListener dictionary.");
        }
        else {
            listener.onError(error);
        }
    }
    Adaptive.handleAccelerationListenerError = handleAccelerationListenerError;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Acceleration} acceleration
    */
    function handleAccelerationListenerResult(id, acceleration) {
        var listener = Adaptive.registeredAccelerationListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredAccelerationListener dictionary.");
        }
        else {
            listener.onResult(acceleration);
        }
    }
    Adaptive.handleAccelerationListenerResult = handleAccelerationListenerResult;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Acceleration} acceleration
       @param {Adaptive.IAccelerationListenerWarning} warning
    */
    function handleAccelerationListenerWarning(id, acceleration, warning) {
        var listener = Adaptive.registeredAccelerationListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredAccelerationListener dictionary.");
        }
        else {
            listener.onWarning(acceleration, warning);
        }
    }
    Adaptive.handleAccelerationListenerWarning = handleAccelerationListenerWarning;
    /**
       @class Adaptive.AccelerationListener
       @extends Adaptive.BaseListener
    */
    var AccelerationListener = (function (_super) {
        __extends(AccelerationListener, _super);
        /**
           @method constructor
           Constructor with anonymous handler functions for listener.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IAccelerationListenerError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.Acceleration
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.Acceleration, Adaptive.IAccelerationListenerWarning
        */
        function AccelerationListener(onErrorFunction, onResultFunction, onWarningFunction) {
            _super.call(this, ++Adaptive.registeredCounter);
            if (onErrorFunction == null) {
                console.error("ERROR: AccelerationListener onErrorFunction is not defined.");
            }
            else {
                this.onErrorFunction = onErrorFunction;
            }
            if (onResultFunction == null) {
                console.error("ERROR: AccelerationListener onResultFunction is not defined.");
            }
            else {
                this.onResultFunction = onResultFunction;
            }
            if (onWarningFunction == null) {
                console.error("ERROR: AccelerationListener onWarningFunction is not defined.");
            }
            else {
                this.onWarningFunction = onWarningFunction;
            }
        }
        /**
           @method
           No data received - error condition, not authorized or hardware not available. This will be reported once for the
listener and subsequently, the listener will be deactivated and removed from the internal list of listeners.
           @param {Adaptive.IAccelerationListenerError} error error Error fired
           @since v2.0
        */
        AccelerationListener.prototype.onError = function (error) {
            if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                console.warn("WARNING: AccelerationListener contains a null reference to onErrorFunction.");
            }
            else {
                this.onErrorFunction(error);
            }
        };
        /**
           @method
           Correct data received.
           @param {Adaptive.Acceleration} acceleration acceleration Acceleration received
           @since v2.0
        */
        AccelerationListener.prototype.onResult = function (acceleration) {
            if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                console.warn("WARNING: AccelerationListener contains a null reference to onResultFunction.");
            }
            else {
                this.onResultFunction(acceleration);
            }
        };
        /**
           @method
           Data received with warning - ie. Needs calibration.
           @param {Adaptive.Acceleration} acceleration acceleration Acceleration received
           @param {Adaptive.IAccelerationListenerWarning} warning warning      Warning fired
           @since v2.0
        */
        AccelerationListener.prototype.onWarning = function (acceleration, warning) {
            if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                console.warn("WARNING: AccelerationListener contains a null reference to onWarningFunction.");
            }
            else {
                this.onWarningFunction(acceleration, warning);
            }
        };
        return AccelerationListener;
    })(BaseListener);
    Adaptive.AccelerationListener = AccelerationListener;
    /**
       @property {Adaptive.Dictionary} registeredButtonListener
       @member Adaptive
       @private
       ButtonListener control dictionary.
    */
    Adaptive.registeredButtonListener = new Dictionary([]);
    // ButtonListener global listener handlers.
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IButtonListenerError} error
    */
    function handleButtonListenerError(id, error) {
        var listener = Adaptive.registeredButtonListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredButtonListener dictionary.");
        }
        else {
            listener.onError(error);
        }
    }
    Adaptive.handleButtonListenerError = handleButtonListenerError;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Button} button
    */
    function handleButtonListenerResult(id, button) {
        var listener = Adaptive.registeredButtonListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredButtonListener dictionary.");
        }
        else {
            listener.onResult(button);
        }
    }
    Adaptive.handleButtonListenerResult = handleButtonListenerResult;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Button} button
       @param {Adaptive.IButtonListenerWarning} warning
    */
    function handleButtonListenerWarning(id, button, warning) {
        var listener = Adaptive.registeredButtonListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredButtonListener dictionary.");
        }
        else {
            listener.onWarning(button, warning);
        }
    }
    Adaptive.handleButtonListenerWarning = handleButtonListenerWarning;
    /**
       @class Adaptive.ButtonListener
       @extends Adaptive.BaseListener
    */
    var ButtonListener = (function (_super) {
        __extends(ButtonListener, _super);
        /**
           @method constructor
           Constructor with anonymous handler functions for listener.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IButtonListenerError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.Button
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.Button, Adaptive.IButtonListenerWarning
        */
        function ButtonListener(onErrorFunction, onResultFunction, onWarningFunction) {
            _super.call(this, ++Adaptive.registeredCounter);
            if (onErrorFunction == null) {
                console.error("ERROR: ButtonListener onErrorFunction is not defined.");
            }
            else {
                this.onErrorFunction = onErrorFunction;
            }
            if (onResultFunction == null) {
                console.error("ERROR: ButtonListener onResultFunction is not defined.");
            }
            else {
                this.onResultFunction = onResultFunction;
            }
            if (onWarningFunction == null) {
                console.error("ERROR: ButtonListener onWarningFunction is not defined.");
            }
            else {
                this.onWarningFunction = onWarningFunction;
            }
        }
        /**
           @method
           No data received
           @param {Adaptive.IButtonListenerError} error error occurred
           @since v2.0
        */
        ButtonListener.prototype.onError = function (error) {
            if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                console.warn("WARNING: ButtonListener contains a null reference to onErrorFunction.");
            }
            else {
                this.onErrorFunction(error);
            }
        };
        /**
           @method
           Called on button pressed
           @param {Adaptive.Button} button button pressed
           @since v2.0
        */
        ButtonListener.prototype.onResult = function (button) {
            if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                console.warn("WARNING: ButtonListener contains a null reference to onResultFunction.");
            }
            else {
                this.onResultFunction(button);
            }
        };
        /**
           @method
           Data received with warning
           @param {Adaptive.Button} button button  pressed
           @param {Adaptive.IButtonListenerWarning} warning warning happened
           @since v2.0
        */
        ButtonListener.prototype.onWarning = function (button, warning) {
            if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                console.warn("WARNING: ButtonListener contains a null reference to onWarningFunction.");
            }
            else {
                this.onWarningFunction(button, warning);
            }
        };
        return ButtonListener;
    })(BaseListener);
    Adaptive.ButtonListener = ButtonListener;
    /**
       @property {Adaptive.Dictionary} registeredDeviceOrientationListener
       @member Adaptive
       @private
       DeviceOrientationListener control dictionary.
    */
    Adaptive.registeredDeviceOrientationListener = new Dictionary([]);
    // DeviceOrientationListener global listener handlers.
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IDeviceOrientationListenerError} error
    */
    function handleDeviceOrientationListenerError(id, error) {
        var listener = Adaptive.registeredDeviceOrientationListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredDeviceOrientationListener dictionary.");
        }
        else {
            listener.onError(error);
        }
    }
    Adaptive.handleDeviceOrientationListenerError = handleDeviceOrientationListenerError;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.RotationEvent} rotationEvent
    */
    function handleDeviceOrientationListenerResult(id, rotationEvent) {
        var listener = Adaptive.registeredDeviceOrientationListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredDeviceOrientationListener dictionary.");
        }
        else {
            listener.onResult(rotationEvent);
        }
    }
    Adaptive.handleDeviceOrientationListenerResult = handleDeviceOrientationListenerResult;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.RotationEvent} rotationEvent
       @param {Adaptive.IDeviceOrientationListenerWarning} warning
    */
    function handleDeviceOrientationListenerWarning(id, rotationEvent, warning) {
        var listener = Adaptive.registeredDeviceOrientationListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredDeviceOrientationListener dictionary.");
        }
        else {
            listener.onWarning(rotationEvent, warning);
        }
    }
    Adaptive.handleDeviceOrientationListenerWarning = handleDeviceOrientationListenerWarning;
    /**
       @class Adaptive.DeviceOrientationListener
       @extends Adaptive.BaseListener
    */
    var DeviceOrientationListener = (function (_super) {
        __extends(DeviceOrientationListener, _super);
        /**
           @method constructor
           Constructor with anonymous handler functions for listener.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IDeviceOrientationListenerError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.RotationEvent
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.RotationEvent, Adaptive.IDeviceOrientationListenerWarning
        */
        function DeviceOrientationListener(onErrorFunction, onResultFunction, onWarningFunction) {
            _super.call(this, ++Adaptive.registeredCounter);
            if (onErrorFunction == null) {
                console.error("ERROR: DeviceOrientationListener onErrorFunction is not defined.");
            }
            else {
                this.onErrorFunction = onErrorFunction;
            }
            if (onResultFunction == null) {
                console.error("ERROR: DeviceOrientationListener onResultFunction is not defined.");
            }
            else {
                this.onResultFunction = onResultFunction;
            }
            if (onWarningFunction == null) {
                console.error("ERROR: DeviceOrientationListener onWarningFunction is not defined.");
            }
            else {
                this.onWarningFunction = onWarningFunction;
            }
        }
        /**
           @method
           Although extremely unlikely, this event will be fired if something beyond the control of the
platform impedes the rotation of the device.
           @param {Adaptive.IDeviceOrientationListenerError} error error The error condition... generally unknown as it is unexpected!
           @since v2.0.5
        */
        DeviceOrientationListener.prototype.onError = function (error) {
            if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                console.warn("WARNING: DeviceOrientationListener contains a null reference to onErrorFunction.");
            }
            else {
                this.onErrorFunction(error);
            }
        };
        /**
           @method
           Event fired with the successful start and finish of a rotation.
           @param {Adaptive.RotationEvent} rotationEvent rotationEvent RotationEvent containing origin, destination and state of the event.
           @since v2.0.5
        */
        DeviceOrientationListener.prototype.onResult = function (rotationEvent) {
            if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                console.warn("WARNING: DeviceOrientationListener contains a null reference to onResultFunction.");
            }
            else {
                this.onResultFunction(rotationEvent);
            }
        };
        /**
           @method
           Event fired with a warning when the rotation is aborted. In specific, this
event may be fired if the devices vetoes the rotation before rotation is completed.
           @param {Adaptive.RotationEvent} rotationEvent rotationEvent   RotationEvent containing origin, destination and state of the event.
           @param {Adaptive.IDeviceOrientationListenerWarning} warning warning Type of condition that aborted rotation execution.
           @since v2.0.5
        */
        DeviceOrientationListener.prototype.onWarning = function (rotationEvent, warning) {
            if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                console.warn("WARNING: DeviceOrientationListener contains a null reference to onWarningFunction.");
            }
            else {
                this.onWarningFunction(rotationEvent, warning);
            }
        };
        return DeviceOrientationListener;
    })(BaseListener);
    Adaptive.DeviceOrientationListener = DeviceOrientationListener;
    /**
       @property {Adaptive.Dictionary} registeredDisplayOrientationListener
       @member Adaptive
       @private
       DisplayOrientationListener control dictionary.
    */
    Adaptive.registeredDisplayOrientationListener = new Dictionary([]);
    // DisplayOrientationListener global listener handlers.
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IDisplayOrientationListenerError} error
    */
    function handleDisplayOrientationListenerError(id, error) {
        var listener = Adaptive.registeredDisplayOrientationListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredDisplayOrientationListener dictionary.");
        }
        else {
            listener.onError(error);
        }
    }
    Adaptive.handleDisplayOrientationListenerError = handleDisplayOrientationListenerError;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.RotationEvent} rotationEvent
    */
    function handleDisplayOrientationListenerResult(id, rotationEvent) {
        var listener = Adaptive.registeredDisplayOrientationListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredDisplayOrientationListener dictionary.");
        }
        else {
            listener.onResult(rotationEvent);
        }
    }
    Adaptive.handleDisplayOrientationListenerResult = handleDisplayOrientationListenerResult;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.RotationEvent} rotationEvent
       @param {Adaptive.IDisplayOrientationListenerWarning} warning
    */
    function handleDisplayOrientationListenerWarning(id, rotationEvent, warning) {
        var listener = Adaptive.registeredDisplayOrientationListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredDisplayOrientationListener dictionary.");
        }
        else {
            listener.onWarning(rotationEvent, warning);
        }
    }
    Adaptive.handleDisplayOrientationListenerWarning = handleDisplayOrientationListenerWarning;
    /**
       @class Adaptive.DisplayOrientationListener
       @extends Adaptive.BaseListener
    */
    var DisplayOrientationListener = (function (_super) {
        __extends(DisplayOrientationListener, _super);
        /**
           @method constructor
           Constructor with anonymous handler functions for listener.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IDisplayOrientationListenerError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.RotationEvent
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.RotationEvent, Adaptive.IDisplayOrientationListenerWarning
        */
        function DisplayOrientationListener(onErrorFunction, onResultFunction, onWarningFunction) {
            _super.call(this, ++Adaptive.registeredCounter);
            if (onErrorFunction == null) {
                console.error("ERROR: DisplayOrientationListener onErrorFunction is not defined.");
            }
            else {
                this.onErrorFunction = onErrorFunction;
            }
            if (onResultFunction == null) {
                console.error("ERROR: DisplayOrientationListener onResultFunction is not defined.");
            }
            else {
                this.onResultFunction = onResultFunction;
            }
            if (onWarningFunction == null) {
                console.error("ERROR: DisplayOrientationListener onWarningFunction is not defined.");
            }
            else {
                this.onWarningFunction = onWarningFunction;
            }
        }
        /**
           @method
           Although extremely unlikely, this event will be fired if something beyond the control of the
platform impedes the rotation of the display.
           @param {Adaptive.IDisplayOrientationListenerError} error error The error condition... generally unknown as it is unexpected!
           @since v2.0.5
        */
        DisplayOrientationListener.prototype.onError = function (error) {
            if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                console.warn("WARNING: DisplayOrientationListener contains a null reference to onErrorFunction.");
            }
            else {
                this.onErrorFunction(error);
            }
        };
        /**
           @method
           Event fired with the successful start and finish of a rotation.
           @param {Adaptive.RotationEvent} rotationEvent rotationEvent RotationEvent containing origin, destination and state of the event.
           @since v2.0.5
        */
        DisplayOrientationListener.prototype.onResult = function (rotationEvent) {
            if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                console.warn("WARNING: DisplayOrientationListener contains a null reference to onResultFunction.");
            }
            else {
                this.onResultFunction(rotationEvent);
            }
        };
        /**
           @method
           Event fired with a warning when the rotation is aborted. In specific, this
event may be fired if the application vetoes display rotation before rotation is completed.
           @param {Adaptive.RotationEvent} rotationEvent rotationEvent   RotationEvent containing origin, destination and state of the event.
           @param {Adaptive.IDisplayOrientationListenerWarning} warning warning Type of condition that aborted rotation execution.
           @since v2.0.5
        */
        DisplayOrientationListener.prototype.onWarning = function (rotationEvent, warning) {
            if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                console.warn("WARNING: DisplayOrientationListener contains a null reference to onWarningFunction.");
            }
            else {
                this.onWarningFunction(rotationEvent, warning);
            }
        };
        return DisplayOrientationListener;
    })(BaseListener);
    Adaptive.DisplayOrientationListener = DisplayOrientationListener;
    /**
       @property {Adaptive.Dictionary} registeredGeolocationListener
       @member Adaptive
       @private
       GeolocationListener control dictionary.
    */
    Adaptive.registeredGeolocationListener = new Dictionary([]);
    // GeolocationListener global listener handlers.
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IGeolocationListenerError} error
    */
    function handleGeolocationListenerError(id, error) {
        var listener = Adaptive.registeredGeolocationListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredGeolocationListener dictionary.");
        }
        else {
            listener.onError(error);
        }
    }
    Adaptive.handleGeolocationListenerError = handleGeolocationListenerError;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Geolocation} geolocation
    */
    function handleGeolocationListenerResult(id, geolocation) {
        var listener = Adaptive.registeredGeolocationListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredGeolocationListener dictionary.");
        }
        else {
            listener.onResult(geolocation);
        }
    }
    Adaptive.handleGeolocationListenerResult = handleGeolocationListenerResult;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Geolocation} geolocation
       @param {Adaptive.IGeolocationListenerWarning} warning
    */
    function handleGeolocationListenerWarning(id, geolocation, warning) {
        var listener = Adaptive.registeredGeolocationListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredGeolocationListener dictionary.");
        }
        else {
            listener.onWarning(geolocation, warning);
        }
    }
    Adaptive.handleGeolocationListenerWarning = handleGeolocationListenerWarning;
    /**
       @class Adaptive.GeolocationListener
       @extends Adaptive.BaseListener
    */
    var GeolocationListener = (function (_super) {
        __extends(GeolocationListener, _super);
        /**
           @method constructor
           Constructor with anonymous handler functions for listener.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IGeolocationListenerError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.Geolocation
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.Geolocation, Adaptive.IGeolocationListenerWarning
        */
        function GeolocationListener(onErrorFunction, onResultFunction, onWarningFunction) {
            _super.call(this, ++Adaptive.registeredCounter);
            if (onErrorFunction == null) {
                console.error("ERROR: GeolocationListener onErrorFunction is not defined.");
            }
            else {
                this.onErrorFunction = onErrorFunction;
            }
            if (onResultFunction == null) {
                console.error("ERROR: GeolocationListener onResultFunction is not defined.");
            }
            else {
                this.onResultFunction = onResultFunction;
            }
            if (onWarningFunction == null) {
                console.error("ERROR: GeolocationListener onWarningFunction is not defined.");
            }
            else {
                this.onWarningFunction = onWarningFunction;
            }
        }
        /**
           @method
           No data received - error condition, not authorized or hardware not available.
           @param {Adaptive.IGeolocationListenerError} error error Type of error encountered during reading.
           @since v2.0
        */
        GeolocationListener.prototype.onError = function (error) {
            if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                console.warn("WARNING: GeolocationListener contains a null reference to onErrorFunction.");
            }
            else {
                this.onErrorFunction(error);
            }
        };
        /**
           @method
           Correct data received.
           @param {Adaptive.Geolocation} geolocation geolocation Geolocation Bean
           @since v2.0
        */
        GeolocationListener.prototype.onResult = function (geolocation) {
            if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                console.warn("WARNING: GeolocationListener contains a null reference to onResultFunction.");
            }
            else {
                this.onResultFunction(geolocation);
            }
        };
        /**
           @method
           Data received with warning - ie. HighDoP
           @param {Adaptive.Geolocation} geolocation geolocation Geolocation Bean
           @param {Adaptive.IGeolocationListenerWarning} warning warning     Type of warning encountered during reading.
           @since v2.0
        */
        GeolocationListener.prototype.onWarning = function (geolocation, warning) {
            if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                console.warn("WARNING: GeolocationListener contains a null reference to onWarningFunction.");
            }
            else {
                this.onWarningFunction(geolocation, warning);
            }
        };
        return GeolocationListener;
    })(BaseListener);
    Adaptive.GeolocationListener = GeolocationListener;
    /**
       @property {Adaptive.Dictionary} registeredLifecycleListener
       @member Adaptive
       @private
       LifecycleListener control dictionary.
    */
    Adaptive.registeredLifecycleListener = new Dictionary([]);
    // LifecycleListener global listener handlers.
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.ILifecycleListenerError} error
    */
    function handleLifecycleListenerError(id, error) {
        var listener = Adaptive.registeredLifecycleListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredLifecycleListener dictionary.");
        }
        else {
            listener.onError(error);
        }
    }
    Adaptive.handleLifecycleListenerError = handleLifecycleListenerError;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Lifecycle} lifecycle
    */
    function handleLifecycleListenerResult(id, lifecycle) {
        var listener = Adaptive.registeredLifecycleListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredLifecycleListener dictionary.");
        }
        else {
            listener.onResult(lifecycle);
        }
    }
    Adaptive.handleLifecycleListenerResult = handleLifecycleListenerResult;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Lifecycle} lifecycle
       @param {Adaptive.ILifecycleListenerWarning} warning
    */
    function handleLifecycleListenerWarning(id, lifecycle, warning) {
        var listener = Adaptive.registeredLifecycleListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredLifecycleListener dictionary.");
        }
        else {
            listener.onWarning(lifecycle, warning);
        }
    }
    Adaptive.handleLifecycleListenerWarning = handleLifecycleListenerWarning;
    /**
       @class Adaptive.LifecycleListener
       @extends Adaptive.BaseListener
    */
    var LifecycleListener = (function (_super) {
        __extends(LifecycleListener, _super);
        /**
           @method constructor
           Constructor with anonymous handler functions for listener.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.ILifecycleListenerError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.Lifecycle
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.Lifecycle, Adaptive.ILifecycleListenerWarning
        */
        function LifecycleListener(onErrorFunction, onResultFunction, onWarningFunction) {
            _super.call(this, ++Adaptive.registeredCounter);
            if (onErrorFunction == null) {
                console.error("ERROR: LifecycleListener onErrorFunction is not defined.");
            }
            else {
                this.onErrorFunction = onErrorFunction;
            }
            if (onResultFunction == null) {
                console.error("ERROR: LifecycleListener onResultFunction is not defined.");
            }
            else {
                this.onResultFunction = onResultFunction;
            }
            if (onWarningFunction == null) {
                console.error("ERROR: LifecycleListener onWarningFunction is not defined.");
            }
            else {
                this.onWarningFunction = onWarningFunction;
            }
        }
        /**
           @method
           No data received - error condition, not authorized or hardware not available.
           @param {Adaptive.ILifecycleListenerError} error error Type of error encountered during reading.
           @since v2.0
        */
        LifecycleListener.prototype.onError = function (error) {
            if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                console.warn("WARNING: LifecycleListener contains a null reference to onErrorFunction.");
            }
            else {
                this.onErrorFunction(error);
            }
        };
        /**
           @method
           Called when lifecycle changes somehow.
           @param {Adaptive.Lifecycle} lifecycle lifecycle Lifecycle element
           @since v2.0
        */
        LifecycleListener.prototype.onResult = function (lifecycle) {
            if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                console.warn("WARNING: LifecycleListener contains a null reference to onResultFunction.");
            }
            else {
                this.onResultFunction(lifecycle);
            }
        };
        /**
           @method
           Data received with warning
           @param {Adaptive.Lifecycle} lifecycle lifecycle Lifecycle element
           @param {Adaptive.ILifecycleListenerWarning} warning warning   Type of warning encountered during reading.
           @since v2.0
        */
        LifecycleListener.prototype.onWarning = function (lifecycle, warning) {
            if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                console.warn("WARNING: LifecycleListener contains a null reference to onWarningFunction.");
            }
            else {
                this.onWarningFunction(lifecycle, warning);
            }
        };
        return LifecycleListener;
    })(BaseListener);
    Adaptive.LifecycleListener = LifecycleListener;
    /**
       @property {Adaptive.Dictionary} registeredNetworkStatusListener
       @member Adaptive
       @private
       NetworkStatusListener control dictionary.
    */
    Adaptive.registeredNetworkStatusListener = new Dictionary([]);
    // NetworkStatusListener global listener handlers.
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.INetworkStatusListenerError} error
    */
    function handleNetworkStatusListenerError(id, error) {
        var listener = Adaptive.registeredNetworkStatusListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredNetworkStatusListener dictionary.");
        }
        else {
            listener.onError(error);
        }
    }
    Adaptive.handleNetworkStatusListenerError = handleNetworkStatusListenerError;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.NetworkEvent} networkEvent
    */
    function handleNetworkStatusListenerResult(id, networkEvent) {
        var listener = Adaptive.registeredNetworkStatusListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredNetworkStatusListener dictionary.");
        }
        else {
            listener.onResult(networkEvent);
        }
    }
    Adaptive.handleNetworkStatusListenerResult = handleNetworkStatusListenerResult;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.NetworkEvent} networkEvent
       @param {Adaptive.INetworkStatusListenerWarning} warning
    */
    function handleNetworkStatusListenerWarning(id, networkEvent, warning) {
        var listener = Adaptive.registeredNetworkStatusListener["" + id];
        if (typeof listener === 'undefined' || listener == null) {
            console.error("ERROR: No listener with id " + id + " registered in registeredNetworkStatusListener dictionary.");
        }
        else {
            listener.onWarning(networkEvent, warning);
        }
    }
    Adaptive.handleNetworkStatusListenerWarning = handleNetworkStatusListenerWarning;
    /**
       @class Adaptive.NetworkStatusListener
       @extends Adaptive.BaseListener
    */
    var NetworkStatusListener = (function (_super) {
        __extends(NetworkStatusListener, _super);
        /**
           @method constructor
           Constructor with anonymous handler functions for listener.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.INetworkStatusListenerError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.NetworkEvent
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.NetworkEvent, Adaptive.INetworkStatusListenerWarning
        */
        function NetworkStatusListener(onErrorFunction, onResultFunction, onWarningFunction) {
            _super.call(this, ++Adaptive.registeredCounter);
            if (onErrorFunction == null) {
                console.error("ERROR: NetworkStatusListener onErrorFunction is not defined.");
            }
            else {
                this.onErrorFunction = onErrorFunction;
            }
            if (onResultFunction == null) {
                console.error("ERROR: NetworkStatusListener onResultFunction is not defined.");
            }
            else {
                this.onResultFunction = onResultFunction;
            }
            if (onWarningFunction == null) {
                console.error("ERROR: NetworkStatusListener onWarningFunction is not defined.");
            }
            else {
                this.onWarningFunction = onWarningFunction;
            }
        }
        /**
           @method
           No data received - error condition, not authorized or hardware not available.
           @param {Adaptive.INetworkStatusListenerError} error error Type of error encountered during reading.
           @since v2.0
        */
        NetworkStatusListener.prototype.onError = function (error) {
            if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                console.warn("WARNING: NetworkStatusListener contains a null reference to onErrorFunction.");
            }
            else {
                this.onErrorFunction(error);
            }
        };
        /**
           @method
           Called when network connection changes somehow.
           @param {Adaptive.NetworkEvent} networkEvent networkEvent Change to this network.
           @since v2.0
        */
        NetworkStatusListener.prototype.onResult = function (networkEvent) {
            if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                console.warn("WARNING: NetworkStatusListener contains a null reference to onResultFunction.");
            }
            else {
                this.onResultFunction(networkEvent);
            }
        };
        /**
           @method
           Status received with warning
           @param {Adaptive.NetworkEvent} networkEvent networkEvent Change to this network.
           @param {Adaptive.INetworkStatusListenerWarning} warning warning Type of warning encountered during reading.
           @since v2.0
        */
        NetworkStatusListener.prototype.onWarning = function (networkEvent, warning) {
            if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                console.warn("WARNING: NetworkStatusListener contains a null reference to onWarningFunction.");
            }
            else {
                this.onWarningFunction(networkEvent, warning);
            }
        };
        return NetworkStatusListener;
    })(BaseListener);
    Adaptive.NetworkStatusListener = NetworkStatusListener;
    /**
       @class Adaptive.BaseCallback
    */
    var BaseCallback = (function () {
        /**
           @method constructor
           Constructor with callback id.

           @param {number} id  The id of the callback.
        */
        function BaseCallback(id) {
            this.id = id;
            this.apiGroup = IAdaptiveRPGroup.Application;
        }
        /**
           @method
           @return {number}
           Get the callback id.
        */
        BaseCallback.prototype.getId = function () {
            return this.id;
        };
        /**
           @method
           @return {Adaptive.IAdaptiveRPGroup}
           Return the API group for the given interface.
        */
        BaseCallback.prototype.getAPIGroup = function () {
            return this.apiGroup;
        };
        /**
           @method
           Return the API version for the given interface.

           @return {string}
           The version of the API.
        */
        BaseCallback.prototype.getAPIVersion = function () {
            return Adaptive.bridgeApiVersion;
        };
        return BaseCallback;
    })();
    Adaptive.BaseCallback = BaseCallback;
    /**
       @property {Adaptive.Dictionary} registeredContactPhotoResultCallback
       @member Adaptive
       @private
       ContactPhotoResultCallback control dictionary.
    */
    Adaptive.registeredContactPhotoResultCallback = new Dictionary([]);
    // ContactPhotoResultCallback global listener handlers.
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IContactPhotoResultCallbackError} error
    */
    function handleContactPhotoResultCallbackError(id, error) {
        var callback = Adaptive.registeredContactPhotoResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredContactPhotoResultCallback dictionary.");
        }
        else {
            Adaptive.registeredContactPhotoResultCallback.remove("" + id);
            callback.onError(error);
        }
    }
    Adaptive.handleContactPhotoResultCallbackError = handleContactPhotoResultCallbackError;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {number[]} contactPhoto
    */
    function handleContactPhotoResultCallbackResult(id, contactPhoto) {
        var callback = Adaptive.registeredContactPhotoResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredContactPhotoResultCallback dictionary.");
        }
        else {
            Adaptive.registeredContactPhotoResultCallback.remove("" + id);
            callback.onResult(contactPhoto);
        }
    }
    Adaptive.handleContactPhotoResultCallbackResult = handleContactPhotoResultCallbackResult;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {number[]} contactPhoto
       @param {Adaptive.IContactPhotoResultCallbackWarning} warning
    */
    function handleContactPhotoResultCallbackWarning(id, contactPhoto, warning) {
        var callback = Adaptive.registeredContactPhotoResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredContactPhotoResultCallback dictionary.");
        }
        else {
            Adaptive.registeredContactPhotoResultCallback.remove("" + id);
            callback.onWarning(contactPhoto, warning);
        }
    }
    Adaptive.handleContactPhotoResultCallbackWarning = handleContactPhotoResultCallbackWarning;
    /**
       @class Adaptive.ContactPhotoResultCallback
       @extends Adaptive.BaseCallback
    */
    var ContactPhotoResultCallback = (function (_super) {
        __extends(ContactPhotoResultCallback, _super);
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IContactPhotoResultCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: number[]
           @param {Function} onWarningFunction Function receiving parameters of type: number[], Adaptive.IContactPhotoResultCallbackWarning
        */
        function ContactPhotoResultCallback(onErrorFunction, onResultFunction, onWarningFunction) {
            _super.call(this, ++Adaptive.registeredCounter);
            if (onErrorFunction == null) {
                console.error("ERROR: ContactPhotoResultCallback onErrorFunction is not defined.");
            }
            else {
                this.onErrorFunction = onErrorFunction;
            }
            if (onResultFunction == null) {
                console.error("ERROR: ContactPhotoResultCallback onResultFunction is not defined.");
            }
            else {
                this.onResultFunction = onResultFunction;
            }
            if (onWarningFunction == null) {
                console.error("ERROR: ContactPhotoResultCallback onWarningFunction is not defined.");
            }
            else {
                this.onWarningFunction = onWarningFunction;
            }
        }
        /**
           @method
           This method is called on Error
           @param {Adaptive.IContactPhotoResultCallbackError} error error returned by the platform
           @since v2.0
        */
        ContactPhotoResultCallback.prototype.onError = function (error) {
            if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                console.warn("WARNING: ContactPhotoResultCallback contains a null reference to onErrorFunction.");
            }
            else {
                this.onErrorFunction(error);
            }
        };
        /**
           @method
           This method is called on Result
           @param {number[]} contactPhoto contactPhoto returned by the platform
           @since v2.0
        */
        ContactPhotoResultCallback.prototype.onResult = function (contactPhoto) {
            if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                console.warn("WARNING: ContactPhotoResultCallback contains a null reference to onResultFunction.");
            }
            else {
                this.onResultFunction(contactPhoto);
            }
        };
        /**
           @method
           This method is called on Warning
           @param {number[]} contactPhoto contactPhoto returned by the platform
           @param {Adaptive.IContactPhotoResultCallbackWarning} warning warning      returned by the platform
           @since v2.0
        */
        ContactPhotoResultCallback.prototype.onWarning = function (contactPhoto, warning) {
            if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                console.warn("WARNING: ContactPhotoResultCallback contains a null reference to onWarningFunction.");
            }
            else {
                this.onWarningFunction(contactPhoto, warning);
            }
        };
        return ContactPhotoResultCallback;
    })(BaseCallback);
    Adaptive.ContactPhotoResultCallback = ContactPhotoResultCallback;
    /**
       @property {Adaptive.Dictionary} registeredContactResultCallback
       @member Adaptive
       @private
       ContactResultCallback control dictionary.
    */
    Adaptive.registeredContactResultCallback = new Dictionary([]);
    // ContactResultCallback global listener handlers.
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IContactResultCallbackError} error
    */
    function handleContactResultCallbackError(id, error) {
        var callback = Adaptive.registeredContactResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredContactResultCallback dictionary.");
        }
        else {
            Adaptive.registeredContactResultCallback.remove("" + id);
            callback.onError(error);
        }
    }
    Adaptive.handleContactResultCallbackError = handleContactResultCallbackError;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Contact[]} contacts
    */
    function handleContactResultCallbackResult(id, contacts) {
        var callback = Adaptive.registeredContactResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredContactResultCallback dictionary.");
        }
        else {
            Adaptive.registeredContactResultCallback.remove("" + id);
            callback.onResult(contacts);
        }
    }
    Adaptive.handleContactResultCallbackResult = handleContactResultCallbackResult;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Contact[]} contacts
       @param {Adaptive.IContactResultCallbackWarning} warning
    */
    function handleContactResultCallbackWarning(id, contacts, warning) {
        var callback = Adaptive.registeredContactResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredContactResultCallback dictionary.");
        }
        else {
            Adaptive.registeredContactResultCallback.remove("" + id);
            callback.onWarning(contacts, warning);
        }
    }
    Adaptive.handleContactResultCallbackWarning = handleContactResultCallbackWarning;
    /**
       @class Adaptive.ContactResultCallback
       @extends Adaptive.BaseCallback
    */
    var ContactResultCallback = (function (_super) {
        __extends(ContactResultCallback, _super);
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IContactResultCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.Contact[]
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.Contact[], Adaptive.IContactResultCallbackWarning
        */
        function ContactResultCallback(onErrorFunction, onResultFunction, onWarningFunction) {
            _super.call(this, ++Adaptive.registeredCounter);
            if (onErrorFunction == null) {
                console.error("ERROR: ContactResultCallback onErrorFunction is not defined.");
            }
            else {
                this.onErrorFunction = onErrorFunction;
            }
            if (onResultFunction == null) {
                console.error("ERROR: ContactResultCallback onResultFunction is not defined.");
            }
            else {
                this.onResultFunction = onResultFunction;
            }
            if (onWarningFunction == null) {
                console.error("ERROR: ContactResultCallback onWarningFunction is not defined.");
            }
            else {
                this.onWarningFunction = onWarningFunction;
            }
        }
        /**
           @method
           This method is called on Error
           @param {Adaptive.IContactResultCallbackError} error error returned by the platform
           @since v2.0
        */
        ContactResultCallback.prototype.onError = function (error) {
            if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                console.warn("WARNING: ContactResultCallback contains a null reference to onErrorFunction.");
            }
            else {
                this.onErrorFunction(error);
            }
        };
        /**
           @method
           This method is called on Result
           @param {Adaptive.Contact[]} contacts contacts returned by the platform
           @since v2.0
        */
        ContactResultCallback.prototype.onResult = function (contacts) {
            if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                console.warn("WARNING: ContactResultCallback contains a null reference to onResultFunction.");
            }
            else {
                this.onResultFunction(contacts);
            }
        };
        /**
           @method
           This method is called on Warning
           @param {Adaptive.Contact[]} contacts contacts returned by the platform
           @param {Adaptive.IContactResultCallbackWarning} warning warning  returned by the platform
           @since v2.0
        */
        ContactResultCallback.prototype.onWarning = function (contacts, warning) {
            if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                console.warn("WARNING: ContactResultCallback contains a null reference to onWarningFunction.");
            }
            else {
                this.onWarningFunction(contacts, warning);
            }
        };
        return ContactResultCallback;
    })(BaseCallback);
    Adaptive.ContactResultCallback = ContactResultCallback;
    /**
       @property {Adaptive.Dictionary} registeredDatabaseResultCallback
       @member Adaptive
       @private
       DatabaseResultCallback control dictionary.
    */
    Adaptive.registeredDatabaseResultCallback = new Dictionary([]);
    // DatabaseResultCallback global listener handlers.
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IDatabaseResultCallbackError} error
    */
    function handleDatabaseResultCallbackError(id, error) {
        var callback = Adaptive.registeredDatabaseResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredDatabaseResultCallback dictionary.");
        }
        else {
            Adaptive.registeredDatabaseResultCallback.remove("" + id);
            callback.onError(error);
        }
    }
    Adaptive.handleDatabaseResultCallbackError = handleDatabaseResultCallbackError;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Database} database
    */
    function handleDatabaseResultCallbackResult(id, database) {
        var callback = Adaptive.registeredDatabaseResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredDatabaseResultCallback dictionary.");
        }
        else {
            Adaptive.registeredDatabaseResultCallback.remove("" + id);
            callback.onResult(database);
        }
    }
    Adaptive.handleDatabaseResultCallbackResult = handleDatabaseResultCallbackResult;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Database} database
       @param {Adaptive.IDatabaseResultCallbackWarning} warning
    */
    function handleDatabaseResultCallbackWarning(id, database, warning) {
        var callback = Adaptive.registeredDatabaseResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredDatabaseResultCallback dictionary.");
        }
        else {
            Adaptive.registeredDatabaseResultCallback.remove("" + id);
            callback.onWarning(database, warning);
        }
    }
    Adaptive.handleDatabaseResultCallbackWarning = handleDatabaseResultCallbackWarning;
    /**
       @class Adaptive.DatabaseResultCallback
       @extends Adaptive.BaseCallback
    */
    var DatabaseResultCallback = (function (_super) {
        __extends(DatabaseResultCallback, _super);
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IDatabaseResultCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.Database
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.Database, Adaptive.IDatabaseResultCallbackWarning
        */
        function DatabaseResultCallback(onErrorFunction, onResultFunction, onWarningFunction) {
            _super.call(this, ++Adaptive.registeredCounter);
            if (onErrorFunction == null) {
                console.error("ERROR: DatabaseResultCallback onErrorFunction is not defined.");
            }
            else {
                this.onErrorFunction = onErrorFunction;
            }
            if (onResultFunction == null) {
                console.error("ERROR: DatabaseResultCallback onResultFunction is not defined.");
            }
            else {
                this.onResultFunction = onResultFunction;
            }
            if (onWarningFunction == null) {
                console.error("ERROR: DatabaseResultCallback onWarningFunction is not defined.");
            }
            else {
                this.onWarningFunction = onWarningFunction;
            }
        }
        /**
           @method
           Result callback for error responses
           @param {Adaptive.IDatabaseResultCallbackError} error error Returned error
           @since v2.0
        */
        DatabaseResultCallback.prototype.onError = function (error) {
            if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                console.warn("WARNING: DatabaseResultCallback contains a null reference to onErrorFunction.");
            }
            else {
                this.onErrorFunction(error);
            }
        };
        /**
           @method
           Result callback for correct responses
           @param {Adaptive.Database} database database Returns the database
           @since v2.0
        */
        DatabaseResultCallback.prototype.onResult = function (database) {
            if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                console.warn("WARNING: DatabaseResultCallback contains a null reference to onResultFunction.");
            }
            else {
                this.onResultFunction(database);
            }
        };
        /**
           @method
           Result callback for warning responses
           @param {Adaptive.Database} database database Returns the database
           @param {Adaptive.IDatabaseResultCallbackWarning} warning warning  Returned Warning
           @since v2.0
        */
        DatabaseResultCallback.prototype.onWarning = function (database, warning) {
            if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                console.warn("WARNING: DatabaseResultCallback contains a null reference to onWarningFunction.");
            }
            else {
                this.onWarningFunction(database, warning);
            }
        };
        return DatabaseResultCallback;
    })(BaseCallback);
    Adaptive.DatabaseResultCallback = DatabaseResultCallback;
    /**
       @property {Adaptive.Dictionary} registeredDatabaseTableResultCallback
       @member Adaptive
       @private
       DatabaseTableResultCallback control dictionary.
    */
    Adaptive.registeredDatabaseTableResultCallback = new Dictionary([]);
    // DatabaseTableResultCallback global listener handlers.
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IDatabaseTableResultCallbackError} error
    */
    function handleDatabaseTableResultCallbackError(id, error) {
        var callback = Adaptive.registeredDatabaseTableResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredDatabaseTableResultCallback dictionary.");
        }
        else {
            Adaptive.registeredDatabaseTableResultCallback.remove("" + id);
            callback.onError(error);
        }
    }
    Adaptive.handleDatabaseTableResultCallbackError = handleDatabaseTableResultCallbackError;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.DatabaseTable} databaseTable
    */
    function handleDatabaseTableResultCallbackResult(id, databaseTable) {
        var callback = Adaptive.registeredDatabaseTableResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredDatabaseTableResultCallback dictionary.");
        }
        else {
            Adaptive.registeredDatabaseTableResultCallback.remove("" + id);
            callback.onResult(databaseTable);
        }
    }
    Adaptive.handleDatabaseTableResultCallbackResult = handleDatabaseTableResultCallbackResult;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.DatabaseTable} databaseTable
       @param {Adaptive.IDatabaseTableResultCallbackWarning} warning
    */
    function handleDatabaseTableResultCallbackWarning(id, databaseTable, warning) {
        var callback = Adaptive.registeredDatabaseTableResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredDatabaseTableResultCallback dictionary.");
        }
        else {
            Adaptive.registeredDatabaseTableResultCallback.remove("" + id);
            callback.onWarning(databaseTable, warning);
        }
    }
    Adaptive.handleDatabaseTableResultCallbackWarning = handleDatabaseTableResultCallbackWarning;
    /**
       @class Adaptive.DatabaseTableResultCallback
       @extends Adaptive.BaseCallback
    */
    var DatabaseTableResultCallback = (function (_super) {
        __extends(DatabaseTableResultCallback, _super);
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IDatabaseTableResultCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.DatabaseTable
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.DatabaseTable, Adaptive.IDatabaseTableResultCallbackWarning
        */
        function DatabaseTableResultCallback(onErrorFunction, onResultFunction, onWarningFunction) {
            _super.call(this, ++Adaptive.registeredCounter);
            if (onErrorFunction == null) {
                console.error("ERROR: DatabaseTableResultCallback onErrorFunction is not defined.");
            }
            else {
                this.onErrorFunction = onErrorFunction;
            }
            if (onResultFunction == null) {
                console.error("ERROR: DatabaseTableResultCallback onResultFunction is not defined.");
            }
            else {
                this.onResultFunction = onResultFunction;
            }
            if (onWarningFunction == null) {
                console.error("ERROR: DatabaseTableResultCallback onWarningFunction is not defined.");
            }
            else {
                this.onWarningFunction = onWarningFunction;
            }
        }
        /**
           @method
           Result callback for error responses
           @param {Adaptive.IDatabaseTableResultCallbackError} error error Returned error
           @since v2.0
        */
        DatabaseTableResultCallback.prototype.onError = function (error) {
            if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                console.warn("WARNING: DatabaseTableResultCallback contains a null reference to onErrorFunction.");
            }
            else {
                this.onErrorFunction(error);
            }
        };
        /**
           @method
           Result callback for correct responses
           @param {Adaptive.DatabaseTable} databaseTable databaseTable Returns the databaseTable
           @since v2.0
        */
        DatabaseTableResultCallback.prototype.onResult = function (databaseTable) {
            if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                console.warn("WARNING: DatabaseTableResultCallback contains a null reference to onResultFunction.");
            }
            else {
                this.onResultFunction(databaseTable);
            }
        };
        /**
           @method
           Result callback for warning responses
           @param {Adaptive.DatabaseTable} databaseTable databaseTable Returns the databaseTable
           @param {Adaptive.IDatabaseTableResultCallbackWarning} warning warning       Returned Warning
           @since v2.0
        */
        DatabaseTableResultCallback.prototype.onWarning = function (databaseTable, warning) {
            if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                console.warn("WARNING: DatabaseTableResultCallback contains a null reference to onWarningFunction.");
            }
            else {
                this.onWarningFunction(databaseTable, warning);
            }
        };
        return DatabaseTableResultCallback;
    })(BaseCallback);
    Adaptive.DatabaseTableResultCallback = DatabaseTableResultCallback;
    /**
       @property {Adaptive.Dictionary} registeredFileDataLoadResultCallback
       @member Adaptive
       @private
       FileDataLoadResultCallback control dictionary.
    */
    Adaptive.registeredFileDataLoadResultCallback = new Dictionary([]);
    // FileDataLoadResultCallback global listener handlers.
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IFileDataLoadResultCallbackError} error
    */
    function handleFileDataLoadResultCallbackError(id, error) {
        var callback = Adaptive.registeredFileDataLoadResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredFileDataLoadResultCallback dictionary.");
        }
        else {
            Adaptive.registeredFileDataLoadResultCallback.remove("" + id);
            callback.onError(error);
        }
    }
    Adaptive.handleFileDataLoadResultCallbackError = handleFileDataLoadResultCallbackError;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {number[]} data
    */
    function handleFileDataLoadResultCallbackResult(id, data) {
        var callback = Adaptive.registeredFileDataLoadResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredFileDataLoadResultCallback dictionary.");
        }
        else {
            Adaptive.registeredFileDataLoadResultCallback.remove("" + id);
            callback.onResult(data);
        }
    }
    Adaptive.handleFileDataLoadResultCallbackResult = handleFileDataLoadResultCallbackResult;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {number[]} data
       @param {Adaptive.IFileDataLoadResultCallbackWarning} warning
    */
    function handleFileDataLoadResultCallbackWarning(id, data, warning) {
        var callback = Adaptive.registeredFileDataLoadResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredFileDataLoadResultCallback dictionary.");
        }
        else {
            Adaptive.registeredFileDataLoadResultCallback.remove("" + id);
            callback.onWarning(data, warning);
        }
    }
    Adaptive.handleFileDataLoadResultCallbackWarning = handleFileDataLoadResultCallbackWarning;
    /**
       @class Adaptive.FileDataLoadResultCallback
       @extends Adaptive.BaseCallback
    */
    var FileDataLoadResultCallback = (function (_super) {
        __extends(FileDataLoadResultCallback, _super);
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IFileDataLoadResultCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: number[]
           @param {Function} onWarningFunction Function receiving parameters of type: number[], Adaptive.IFileDataLoadResultCallbackWarning
        */
        function FileDataLoadResultCallback(onErrorFunction, onResultFunction, onWarningFunction) {
            _super.call(this, ++Adaptive.registeredCounter);
            if (onErrorFunction == null) {
                console.error("ERROR: FileDataLoadResultCallback onErrorFunction is not defined.");
            }
            else {
                this.onErrorFunction = onErrorFunction;
            }
            if (onResultFunction == null) {
                console.error("ERROR: FileDataLoadResultCallback onResultFunction is not defined.");
            }
            else {
                this.onResultFunction = onResultFunction;
            }
            if (onWarningFunction == null) {
                console.error("ERROR: FileDataLoadResultCallback onWarningFunction is not defined.");
            }
            else {
                this.onWarningFunction = onWarningFunction;
            }
        }
        /**
           @method
           Error processing data retrieval/storage operation.
           @param {Adaptive.IFileDataLoadResultCallbackError} error error Error condition encountered.
           @since v2.0
        */
        FileDataLoadResultCallback.prototype.onError = function (error) {
            if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                console.warn("WARNING: FileDataLoadResultCallback contains a null reference to onErrorFunction.");
            }
            else {
                this.onErrorFunction(error);
            }
        };
        /**
           @method
           Result of data retrieval operation.
           @param {number[]} data data Data loaded.
           @since v2.0
        */
        FileDataLoadResultCallback.prototype.onResult = function (data) {
            if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                console.warn("WARNING: FileDataLoadResultCallback contains a null reference to onResultFunction.");
            }
            else {
                this.onResultFunction(data);
            }
        };
        /**
           @method
           Result with warning of data retrieval/storage operation.
           @param {number[]} data data    File being loaded.
           @param {Adaptive.IFileDataLoadResultCallbackWarning} warning warning Warning condition encountered.
           @since v2.0
        */
        FileDataLoadResultCallback.prototype.onWarning = function (data, warning) {
            if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                console.warn("WARNING: FileDataLoadResultCallback contains a null reference to onWarningFunction.");
            }
            else {
                this.onWarningFunction(data, warning);
            }
        };
        return FileDataLoadResultCallback;
    })(BaseCallback);
    Adaptive.FileDataLoadResultCallback = FileDataLoadResultCallback;
    /**
       @property {Adaptive.Dictionary} registeredFileDataStoreResultCallback
       @member Adaptive
       @private
       FileDataStoreResultCallback control dictionary.
    */
    Adaptive.registeredFileDataStoreResultCallback = new Dictionary([]);
    // FileDataStoreResultCallback global listener handlers.
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IFileDataStoreResultCallbackError} error
    */
    function handleFileDataStoreResultCallbackError(id, error) {
        var callback = Adaptive.registeredFileDataStoreResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredFileDataStoreResultCallback dictionary.");
        }
        else {
            Adaptive.registeredFileDataStoreResultCallback.remove("" + id);
            callback.onError(error);
        }
    }
    Adaptive.handleFileDataStoreResultCallbackError = handleFileDataStoreResultCallbackError;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.FileDescriptor} file
    */
    function handleFileDataStoreResultCallbackResult(id, file) {
        var callback = Adaptive.registeredFileDataStoreResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredFileDataStoreResultCallback dictionary.");
        }
        else {
            Adaptive.registeredFileDataStoreResultCallback.remove("" + id);
            callback.onResult(file);
        }
    }
    Adaptive.handleFileDataStoreResultCallbackResult = handleFileDataStoreResultCallbackResult;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.FileDescriptor} file
       @param {Adaptive.IFileDataStoreResultCallbackWarning} warning
    */
    function handleFileDataStoreResultCallbackWarning(id, file, warning) {
        var callback = Adaptive.registeredFileDataStoreResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredFileDataStoreResultCallback dictionary.");
        }
        else {
            Adaptive.registeredFileDataStoreResultCallback.remove("" + id);
            callback.onWarning(file, warning);
        }
    }
    Adaptive.handleFileDataStoreResultCallbackWarning = handleFileDataStoreResultCallbackWarning;
    /**
       @class Adaptive.FileDataStoreResultCallback
       @extends Adaptive.BaseCallback
    */
    var FileDataStoreResultCallback = (function (_super) {
        __extends(FileDataStoreResultCallback, _super);
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IFileDataStoreResultCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.FileDescriptor
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.FileDescriptor, Adaptive.IFileDataStoreResultCallbackWarning
        */
        function FileDataStoreResultCallback(onErrorFunction, onResultFunction, onWarningFunction) {
            _super.call(this, ++Adaptive.registeredCounter);
            if (onErrorFunction == null) {
                console.error("ERROR: FileDataStoreResultCallback onErrorFunction is not defined.");
            }
            else {
                this.onErrorFunction = onErrorFunction;
            }
            if (onResultFunction == null) {
                console.error("ERROR: FileDataStoreResultCallback onResultFunction is not defined.");
            }
            else {
                this.onResultFunction = onResultFunction;
            }
            if (onWarningFunction == null) {
                console.error("ERROR: FileDataStoreResultCallback onWarningFunction is not defined.");
            }
            else {
                this.onWarningFunction = onWarningFunction;
            }
        }
        /**
           @method
           Error processing data retrieval/storage operation.
           @param {Adaptive.IFileDataStoreResultCallbackError} error error Error condition encountered.
           @since v2.0
        */
        FileDataStoreResultCallback.prototype.onError = function (error) {
            if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                console.warn("WARNING: FileDataStoreResultCallback contains a null reference to onErrorFunction.");
            }
            else {
                this.onErrorFunction(error);
            }
        };
        /**
           @method
           Result of data storage operation.
           @param {Adaptive.FileDescriptor} file file File reference to stored data.
           @since v2.0
        */
        FileDataStoreResultCallback.prototype.onResult = function (file) {
            if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                console.warn("WARNING: FileDataStoreResultCallback contains a null reference to onResultFunction.");
            }
            else {
                this.onResultFunction(file);
            }
        };
        /**
           @method
           Result with warning of data retrieval/storage operation.
           @param {Adaptive.FileDescriptor} file file    File being loaded/stored.
           @param {Adaptive.IFileDataStoreResultCallbackWarning} warning warning Warning condition encountered.
           @since v2.0
        */
        FileDataStoreResultCallback.prototype.onWarning = function (file, warning) {
            if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                console.warn("WARNING: FileDataStoreResultCallback contains a null reference to onWarningFunction.");
            }
            else {
                this.onWarningFunction(file, warning);
            }
        };
        return FileDataStoreResultCallback;
    })(BaseCallback);
    Adaptive.FileDataStoreResultCallback = FileDataStoreResultCallback;
    /**
       @property {Adaptive.Dictionary} registeredFileListResultCallback
       @member Adaptive
       @private
       FileListResultCallback control dictionary.
    */
    Adaptive.registeredFileListResultCallback = new Dictionary([]);
    // FileListResultCallback global listener handlers.
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IFileListResultCallbackError} error
    */
    function handleFileListResultCallbackError(id, error) {
        var callback = Adaptive.registeredFileListResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredFileListResultCallback dictionary.");
        }
        else {
            Adaptive.registeredFileListResultCallback.remove("" + id);
            callback.onError(error);
        }
    }
    Adaptive.handleFileListResultCallbackError = handleFileListResultCallbackError;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.FileDescriptor[]} files
    */
    function handleFileListResultCallbackResult(id, files) {
        var callback = Adaptive.registeredFileListResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredFileListResultCallback dictionary.");
        }
        else {
            Adaptive.registeredFileListResultCallback.remove("" + id);
            callback.onResult(files);
        }
    }
    Adaptive.handleFileListResultCallbackResult = handleFileListResultCallbackResult;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.FileDescriptor[]} files
       @param {Adaptive.IFileListResultCallbackWarning} warning
    */
    function handleFileListResultCallbackWarning(id, files, warning) {
        var callback = Adaptive.registeredFileListResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredFileListResultCallback dictionary.");
        }
        else {
            Adaptive.registeredFileListResultCallback.remove("" + id);
            callback.onWarning(files, warning);
        }
    }
    Adaptive.handleFileListResultCallbackWarning = handleFileListResultCallbackWarning;
    /**
       @class Adaptive.FileListResultCallback
       @extends Adaptive.BaseCallback
    */
    var FileListResultCallback = (function (_super) {
        __extends(FileListResultCallback, _super);
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IFileListResultCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.FileDescriptor[]
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.FileDescriptor[], Adaptive.IFileListResultCallbackWarning
        */
        function FileListResultCallback(onErrorFunction, onResultFunction, onWarningFunction) {
            _super.call(this, ++Adaptive.registeredCounter);
            if (onErrorFunction == null) {
                console.error("ERROR: FileListResultCallback onErrorFunction is not defined.");
            }
            else {
                this.onErrorFunction = onErrorFunction;
            }
            if (onResultFunction == null) {
                console.error("ERROR: FileListResultCallback onResultFunction is not defined.");
            }
            else {
                this.onResultFunction = onResultFunction;
            }
            if (onWarningFunction == null) {
                console.error("ERROR: FileListResultCallback onWarningFunction is not defined.");
            }
            else {
                this.onWarningFunction = onWarningFunction;
            }
        }
        /**
           @method
           On error result of a file operation.
           @param {Adaptive.IFileListResultCallbackError} error error Error processing the request.
           @since v2.0
        */
        FileListResultCallback.prototype.onError = function (error) {
            if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                console.warn("WARNING: FileListResultCallback contains a null reference to onErrorFunction.");
            }
            else {
                this.onErrorFunction(error);
            }
        };
        /**
           @method
           On correct result of a file operation.
           @param {Adaptive.FileDescriptor[]} files files Array of resulting files/folders.
           @since v2.0
        */
        FileListResultCallback.prototype.onResult = function (files) {
            if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                console.warn("WARNING: FileListResultCallback contains a null reference to onResultFunction.");
            }
            else {
                this.onResultFunction(files);
            }
        };
        /**
           @method
           On partial result of a file operation, containing a warning.
           @param {Adaptive.FileDescriptor[]} files files   Array of resulting files/folders.
           @param {Adaptive.IFileListResultCallbackWarning} warning warning Warning condition encountered.
           @since v2.0
        */
        FileListResultCallback.prototype.onWarning = function (files, warning) {
            if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                console.warn("WARNING: FileListResultCallback contains a null reference to onWarningFunction.");
            }
            else {
                this.onWarningFunction(files, warning);
            }
        };
        return FileListResultCallback;
    })(BaseCallback);
    Adaptive.FileListResultCallback = FileListResultCallback;
    /**
       @property {Adaptive.Dictionary} registeredFileResultCallback
       @member Adaptive
       @private
       FileResultCallback control dictionary.
    */
    Adaptive.registeredFileResultCallback = new Dictionary([]);
    // FileResultCallback global listener handlers.
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IFileResultCallbackError} error
    */
    function handleFileResultCallbackError(id, error) {
        var callback = Adaptive.registeredFileResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredFileResultCallback dictionary.");
        }
        else {
            Adaptive.registeredFileResultCallback.remove("" + id);
            callback.onError(error);
        }
    }
    Adaptive.handleFileResultCallbackError = handleFileResultCallbackError;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.FileDescriptor} storageFile
    */
    function handleFileResultCallbackResult(id, storageFile) {
        var callback = Adaptive.registeredFileResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredFileResultCallback dictionary.");
        }
        else {
            Adaptive.registeredFileResultCallback.remove("" + id);
            callback.onResult(storageFile);
        }
    }
    Adaptive.handleFileResultCallbackResult = handleFileResultCallbackResult;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.FileDescriptor} file
       @param {Adaptive.IFileResultCallbackWarning} warning
    */
    function handleFileResultCallbackWarning(id, file, warning) {
        var callback = Adaptive.registeredFileResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredFileResultCallback dictionary.");
        }
        else {
            Adaptive.registeredFileResultCallback.remove("" + id);
            callback.onWarning(file, warning);
        }
    }
    Adaptive.handleFileResultCallbackWarning = handleFileResultCallbackWarning;
    /**
       @class Adaptive.FileResultCallback
       @extends Adaptive.BaseCallback
    */
    var FileResultCallback = (function (_super) {
        __extends(FileResultCallback, _super);
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IFileResultCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.FileDescriptor
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.FileDescriptor, Adaptive.IFileResultCallbackWarning
        */
        function FileResultCallback(onErrorFunction, onResultFunction, onWarningFunction) {
            _super.call(this, ++Adaptive.registeredCounter);
            if (onErrorFunction == null) {
                console.error("ERROR: FileResultCallback onErrorFunction is not defined.");
            }
            else {
                this.onErrorFunction = onErrorFunction;
            }
            if (onResultFunction == null) {
                console.error("ERROR: FileResultCallback onResultFunction is not defined.");
            }
            else {
                this.onResultFunction = onResultFunction;
            }
            if (onWarningFunction == null) {
                console.error("ERROR: FileResultCallback onWarningFunction is not defined.");
            }
            else {
                this.onWarningFunction = onWarningFunction;
            }
        }
        /**
           @method
           On error result of a file operation.
           @param {Adaptive.IFileResultCallbackError} error error Error processing the request.
           @since v2.0
        */
        FileResultCallback.prototype.onError = function (error) {
            if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                console.warn("WARNING: FileResultCallback contains a null reference to onErrorFunction.");
            }
            else {
                this.onErrorFunction(error);
            }
        };
        /**
           @method
           On correct result of a file operation.
           @param {Adaptive.FileDescriptor} storageFile storageFile Reference to the resulting file.
           @since v2.0
        */
        FileResultCallback.prototype.onResult = function (storageFile) {
            if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                console.warn("WARNING: FileResultCallback contains a null reference to onResultFunction.");
            }
            else {
                this.onResultFunction(storageFile);
            }
        };
        /**
           @method
           On partial result of a file operation, containing a warning.
           @param {Adaptive.FileDescriptor} file file    Reference to the offending file.
           @param {Adaptive.IFileResultCallbackWarning} warning warning Warning processing the request.
           @since v2.0
        */
        FileResultCallback.prototype.onWarning = function (file, warning) {
            if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                console.warn("WARNING: FileResultCallback contains a null reference to onWarningFunction.");
            }
            else {
                this.onWarningFunction(file, warning);
            }
        };
        return FileResultCallback;
    })(BaseCallback);
    Adaptive.FileResultCallback = FileResultCallback;
    /**
       @property {Adaptive.Dictionary} registeredMessagingCallback
       @member Adaptive
       @private
       MessagingCallback control dictionary.
    */
    Adaptive.registeredMessagingCallback = new Dictionary([]);
    // MessagingCallback global listener handlers.
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IMessagingCallbackError} error
    */
    function handleMessagingCallbackError(id, error) {
        var callback = Adaptive.registeredMessagingCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredMessagingCallback dictionary.");
        }
        else {
            Adaptive.registeredMessagingCallback.remove("" + id);
            callback.onError(error);
        }
    }
    Adaptive.handleMessagingCallbackError = handleMessagingCallbackError;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {boolean} success
    */
    function handleMessagingCallbackResult(id, success) {
        var callback = Adaptive.registeredMessagingCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredMessagingCallback dictionary.");
        }
        else {
            Adaptive.registeredMessagingCallback.remove("" + id);
            callback.onResult(success);
        }
    }
    Adaptive.handleMessagingCallbackResult = handleMessagingCallbackResult;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {boolean} success
       @param {Adaptive.IMessagingCallbackWarning} warning
    */
    function handleMessagingCallbackWarning(id, success, warning) {
        var callback = Adaptive.registeredMessagingCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredMessagingCallback dictionary.");
        }
        else {
            Adaptive.registeredMessagingCallback.remove("" + id);
            callback.onWarning(success, warning);
        }
    }
    Adaptive.handleMessagingCallbackWarning = handleMessagingCallbackWarning;
    /**
       @class Adaptive.MessagingCallback
       @extends Adaptive.BaseCallback
    */
    var MessagingCallback = (function (_super) {
        __extends(MessagingCallback, _super);
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IMessagingCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: boolean
           @param {Function} onWarningFunction Function receiving parameters of type: boolean, Adaptive.IMessagingCallbackWarning
        */
        function MessagingCallback(onErrorFunction, onResultFunction, onWarningFunction) {
            _super.call(this, ++Adaptive.registeredCounter);
            if (onErrorFunction == null) {
                console.error("ERROR: MessagingCallback onErrorFunction is not defined.");
            }
            else {
                this.onErrorFunction = onErrorFunction;
            }
            if (onResultFunction == null) {
                console.error("ERROR: MessagingCallback onResultFunction is not defined.");
            }
            else {
                this.onResultFunction = onResultFunction;
            }
            if (onWarningFunction == null) {
                console.error("ERROR: MessagingCallback onWarningFunction is not defined.");
            }
            else {
                this.onWarningFunction = onWarningFunction;
            }
        }
        /**
           @method
           This method is called on Error
           @param {Adaptive.IMessagingCallbackError} error error returned by the platform
           @since v2.0
        */
        MessagingCallback.prototype.onError = function (error) {
            if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                console.warn("WARNING: MessagingCallback contains a null reference to onErrorFunction.");
            }
            else {
                this.onErrorFunction(error);
            }
        };
        /**
           @method
           This method is called on Result
           @param {boolean} success success true if sent;false otherwise
           @since v2.0
        */
        MessagingCallback.prototype.onResult = function (success) {
            if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                console.warn("WARNING: MessagingCallback contains a null reference to onResultFunction.");
            }
            else {
                this.onResultFunction(success);
            }
        };
        /**
           @method
           This method is called on Warning
           @param {boolean} success success true if sent;false otherwise
           @param {Adaptive.IMessagingCallbackWarning} warning warning returned by the platform
           @since v2.0
        */
        MessagingCallback.prototype.onWarning = function (success, warning) {
            if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                console.warn("WARNING: MessagingCallback contains a null reference to onWarningFunction.");
            }
            else {
                this.onWarningFunction(success, warning);
            }
        };
        return MessagingCallback;
    })(BaseCallback);
    Adaptive.MessagingCallback = MessagingCallback;
    /**
       @property {Adaptive.Dictionary} registeredNetworkReachabilityCallback
       @member Adaptive
       @private
       NetworkReachabilityCallback control dictionary.
    */
    Adaptive.registeredNetworkReachabilityCallback = new Dictionary([]);
    // NetworkReachabilityCallback global listener handlers.
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.INetworkReachabilityCallbackError} error
    */
    function handleNetworkReachabilityCallbackError(id, error) {
        var callback = Adaptive.registeredNetworkReachabilityCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredNetworkReachabilityCallback dictionary.");
        }
        else {
            Adaptive.registeredNetworkReachabilityCallback.remove("" + id);
            callback.onError(error);
        }
    }
    Adaptive.handleNetworkReachabilityCallbackError = handleNetworkReachabilityCallbackError;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {boolean} reachable
    */
    function handleNetworkReachabilityCallbackResult(id, reachable) {
        var callback = Adaptive.registeredNetworkReachabilityCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredNetworkReachabilityCallback dictionary.");
        }
        else {
            Adaptive.registeredNetworkReachabilityCallback.remove("" + id);
            callback.onResult(reachable);
        }
    }
    Adaptive.handleNetworkReachabilityCallbackResult = handleNetworkReachabilityCallbackResult;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {boolean} reachable
       @param {Adaptive.INetworkReachabilityCallbackWarning} warning
    */
    function handleNetworkReachabilityCallbackWarning(id, reachable, warning) {
        var callback = Adaptive.registeredNetworkReachabilityCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredNetworkReachabilityCallback dictionary.");
        }
        else {
            Adaptive.registeredNetworkReachabilityCallback.remove("" + id);
            callback.onWarning(reachable, warning);
        }
    }
    Adaptive.handleNetworkReachabilityCallbackWarning = handleNetworkReachabilityCallbackWarning;
    /**
       @class Adaptive.NetworkReachabilityCallback
       @extends Adaptive.BaseCallback
    */
    var NetworkReachabilityCallback = (function (_super) {
        __extends(NetworkReachabilityCallback, _super);
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.INetworkReachabilityCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: boolean
           @param {Function} onWarningFunction Function receiving parameters of type: boolean, Adaptive.INetworkReachabilityCallbackWarning
        */
        function NetworkReachabilityCallback(onErrorFunction, onResultFunction, onWarningFunction) {
            _super.call(this, ++Adaptive.registeredCounter);
            if (onErrorFunction == null) {
                console.error("ERROR: NetworkReachabilityCallback onErrorFunction is not defined.");
            }
            else {
                this.onErrorFunction = onErrorFunction;
            }
            if (onResultFunction == null) {
                console.error("ERROR: NetworkReachabilityCallback onResultFunction is not defined.");
            }
            else {
                this.onResultFunction = onResultFunction;
            }
            if (onWarningFunction == null) {
                console.error("ERROR: NetworkReachabilityCallback onWarningFunction is not defined.");
            }
            else {
                this.onWarningFunction = onWarningFunction;
            }
        }
        /**
           @method
           No data received - error condition, not authorized .
           @param {Adaptive.INetworkReachabilityCallbackError} error error Error value
           @since v2.0
        */
        NetworkReachabilityCallback.prototype.onError = function (error) {
            if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                console.warn("WARNING: NetworkReachabilityCallback contains a null reference to onErrorFunction.");
            }
            else {
                this.onErrorFunction(error);
            }
        };
        /**
           @method
           Correct data received.
           @param {boolean} reachable reachable Indicates if the host is reachable
           @since v2.0
        */
        NetworkReachabilityCallback.prototype.onResult = function (reachable) {
            if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                console.warn("WARNING: NetworkReachabilityCallback contains a null reference to onResultFunction.");
            }
            else {
                this.onResultFunction(reachable);
            }
        };
        /**
           @method
           Data received with warning - ie Found entries with existing key and values have been overriden
           @param {boolean} reachable reachable Indicates if the host is reachable
           @param {Adaptive.INetworkReachabilityCallbackWarning} warning warning   Warning value
           @since v2.0
        */
        NetworkReachabilityCallback.prototype.onWarning = function (reachable, warning) {
            if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                console.warn("WARNING: NetworkReachabilityCallback contains a null reference to onWarningFunction.");
            }
            else {
                this.onWarningFunction(reachable, warning);
            }
        };
        return NetworkReachabilityCallback;
    })(BaseCallback);
    Adaptive.NetworkReachabilityCallback = NetworkReachabilityCallback;
    /**
       @property {Adaptive.Dictionary} registeredSecurityResultCallback
       @member Adaptive
       @private
       SecurityResultCallback control dictionary.
    */
    Adaptive.registeredSecurityResultCallback = new Dictionary([]);
    // SecurityResultCallback global listener handlers.
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.ISecurityResultCallbackError} error
    */
    function handleSecurityResultCallbackError(id, error) {
        var callback = Adaptive.registeredSecurityResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredSecurityResultCallback dictionary.");
        }
        else {
            Adaptive.registeredSecurityResultCallback.remove("" + id);
            callback.onError(error);
        }
    }
    Adaptive.handleSecurityResultCallbackError = handleSecurityResultCallbackError;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.SecureKeyPair[]} keyValues
    */
    function handleSecurityResultCallbackResult(id, keyValues) {
        var callback = Adaptive.registeredSecurityResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredSecurityResultCallback dictionary.");
        }
        else {
            Adaptive.registeredSecurityResultCallback.remove("" + id);
            callback.onResult(keyValues);
        }
    }
    Adaptive.handleSecurityResultCallbackResult = handleSecurityResultCallbackResult;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.SecureKeyPair[]} keyValues
       @param {Adaptive.ISecurityResultCallbackWarning} warning
    */
    function handleSecurityResultCallbackWarning(id, keyValues, warning) {
        var callback = Adaptive.registeredSecurityResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredSecurityResultCallback dictionary.");
        }
        else {
            Adaptive.registeredSecurityResultCallback.remove("" + id);
            callback.onWarning(keyValues, warning);
        }
    }
    Adaptive.handleSecurityResultCallbackWarning = handleSecurityResultCallbackWarning;
    /**
       @class Adaptive.SecurityResultCallback
       @extends Adaptive.BaseCallback
    */
    var SecurityResultCallback = (function (_super) {
        __extends(SecurityResultCallback, _super);
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.ISecurityResultCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.SecureKeyPair[]
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.SecureKeyPair[], Adaptive.ISecurityResultCallbackWarning
        */
        function SecurityResultCallback(onErrorFunction, onResultFunction, onWarningFunction) {
            _super.call(this, ++Adaptive.registeredCounter);
            if (onErrorFunction == null) {
                console.error("ERROR: SecurityResultCallback onErrorFunction is not defined.");
            }
            else {
                this.onErrorFunction = onErrorFunction;
            }
            if (onResultFunction == null) {
                console.error("ERROR: SecurityResultCallback onResultFunction is not defined.");
            }
            else {
                this.onResultFunction = onResultFunction;
            }
            if (onWarningFunction == null) {
                console.error("ERROR: SecurityResultCallback onWarningFunction is not defined.");
            }
            else {
                this.onWarningFunction = onWarningFunction;
            }
        }
        /**
           @method
           No data received - error condition, not authorized .
           @param {Adaptive.ISecurityResultCallbackError} error error Error values
           @since v2.0
        */
        SecurityResultCallback.prototype.onError = function (error) {
            if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                console.warn("WARNING: SecurityResultCallback contains a null reference to onErrorFunction.");
            }
            else {
                this.onErrorFunction(error);
            }
        };
        /**
           @method
           Correct data received.
           @param {Adaptive.SecureKeyPair[]} keyValues keyValues key and values
           @since v2.0
        */
        SecurityResultCallback.prototype.onResult = function (keyValues) {
            if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                console.warn("WARNING: SecurityResultCallback contains a null reference to onResultFunction.");
            }
            else {
                this.onResultFunction(keyValues);
            }
        };
        /**
           @method
           Data received with warning - ie Found entries with existing key and values have been overriden
           @param {Adaptive.SecureKeyPair[]} keyValues keyValues key and values
           @param {Adaptive.ISecurityResultCallbackWarning} warning warning   Warning values
           @since v2.0
        */
        SecurityResultCallback.prototype.onWarning = function (keyValues, warning) {
            if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                console.warn("WARNING: SecurityResultCallback contains a null reference to onWarningFunction.");
            }
            else {
                this.onWarningFunction(keyValues, warning);
            }
        };
        return SecurityResultCallback;
    })(BaseCallback);
    Adaptive.SecurityResultCallback = SecurityResultCallback;
    /**
       @property {Adaptive.Dictionary} registeredServiceResultCallback
       @member Adaptive
       @private
       ServiceResultCallback control dictionary.
    */
    Adaptive.registeredServiceResultCallback = new Dictionary([]);
    // ServiceResultCallback global listener handlers.
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IServiceResultCallbackError} error
    */
    function handleServiceResultCallbackError(id, error) {
        var callback = Adaptive.registeredServiceResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredServiceResultCallback dictionary.");
        }
        else {
            Adaptive.registeredServiceResultCallback.remove("" + id);
            callback.onError(error);
        }
    }
    Adaptive.handleServiceResultCallbackError = handleServiceResultCallbackError;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.ServiceResponse} response
    */
    function handleServiceResultCallbackResult(id, response) {
        var callback = Adaptive.registeredServiceResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredServiceResultCallback dictionary.");
        }
        else {
            Adaptive.registeredServiceResultCallback.remove("" + id);
            callback.onResult(response);
        }
    }
    Adaptive.handleServiceResultCallbackResult = handleServiceResultCallbackResult;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.ServiceResponse} response
       @param {Adaptive.IServiceResultCallbackWarning} warning
    */
    function handleServiceResultCallbackWarning(id, response, warning) {
        var callback = Adaptive.registeredServiceResultCallback["" + id];
        if (typeof callback === 'undefined' || callback == null) {
            console.error("ERROR: No callback with id " + id + " registered in registeredServiceResultCallback dictionary.");
        }
        else {
            Adaptive.registeredServiceResultCallback.remove("" + id);
            callback.onWarning(response, warning);
        }
    }
    Adaptive.handleServiceResultCallbackWarning = handleServiceResultCallbackWarning;
    /**
       @class Adaptive.ServiceResultCallback
       @extends Adaptive.BaseCallback
    */
    var ServiceResultCallback = (function (_super) {
        __extends(ServiceResultCallback, _super);
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IServiceResultCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.ServiceResponse
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.ServiceResponse, Adaptive.IServiceResultCallbackWarning
        */
        function ServiceResultCallback(onErrorFunction, onResultFunction, onWarningFunction) {
            _super.call(this, ++Adaptive.registeredCounter);
            if (onErrorFunction == null) {
                console.error("ERROR: ServiceResultCallback onErrorFunction is not defined.");
            }
            else {
                this.onErrorFunction = onErrorFunction;
            }
            if (onResultFunction == null) {
                console.error("ERROR: ServiceResultCallback onResultFunction is not defined.");
            }
            else {
                this.onResultFunction = onResultFunction;
            }
            if (onWarningFunction == null) {
                console.error("ERROR: ServiceResultCallback onWarningFunction is not defined.");
            }
            else {
                this.onWarningFunction = onWarningFunction;
            }
        }
        /**
           @method
           This method is called on Error
           @param {Adaptive.IServiceResultCallbackError} error error returned by the platform
           @since v2.0
        */
        ServiceResultCallback.prototype.onError = function (error) {
            if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                console.warn("WARNING: ServiceResultCallback contains a null reference to onErrorFunction.");
            }
            else {
                this.onErrorFunction(error);
            }
        };
        /**
           @method
           This method is called on Result
           @param {Adaptive.ServiceResponse} response response data
           @since v2.0
        */
        ServiceResultCallback.prototype.onResult = function (response) {
            if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                console.warn("WARNING: ServiceResultCallback contains a null reference to onResultFunction.");
            }
            else {
                this.onResultFunction(response);
            }
        };
        /**
           @method
           This method is called on Warning
           @param {Adaptive.ServiceResponse} response response data
           @param {Adaptive.IServiceResultCallbackWarning} warning warning  returned by the platform
           @since v2.0
        */
        ServiceResultCallback.prototype.onWarning = function (response, warning) {
            if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                console.warn("WARNING: ServiceResultCallback contains a null reference to onWarningFunction.");
            }
            else {
                this.onWarningFunction(response, warning);
            }
        };
        return ServiceResultCallback;
    })(BaseCallback);
    Adaptive.ServiceResultCallback = ServiceResultCallback;
    /**
       @class Adaptive.BaseApplicationBridge
       Base application for Application purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    var BaseApplicationBridge = (function () {
        /**
           @method constructor
           Default constructor.
        */
        function BaseApplicationBridge() {
            this.apiGroup = IAdaptiveRPGroup.Application;
        }
        /**
           @method
           Return the API group for the given interface.
           @return {Adaptive.IAdaptiveRPGroup}
        */
        BaseApplicationBridge.prototype.getAPIGroup = function () {
            return this.apiGroup;
        };
        /**
           @method
           Return the API version for the given interface.

           @return {string} The version of the API.
        */
        BaseApplicationBridge.prototype.getAPIVersion = function () {
            return Adaptive.bridgeApiVersion;
        };
        return BaseApplicationBridge;
    })();
    Adaptive.BaseApplicationBridge = BaseApplicationBridge;
    /**
       @class Adaptive.BaseCommerceBridge
       Base application for Commerce purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    var BaseCommerceBridge = (function () {
        /**
           @method constructor
           Default constructor.
        */
        function BaseCommerceBridge() {
            this.apiGroup = IAdaptiveRPGroup.Commerce;
        }
        /**
           @method
           Return the API group for the given interface.
           @return {Adaptive.IAdaptiveRPGroup}
        */
        BaseCommerceBridge.prototype.getAPIGroup = function () {
            return this.apiGroup;
        };
        /**
           @method
           Return the API version for the given interface.

           @return {string} The version of the API.
        */
        BaseCommerceBridge.prototype.getAPIVersion = function () {
            return Adaptive.bridgeApiVersion;
        };
        return BaseCommerceBridge;
    })();
    Adaptive.BaseCommerceBridge = BaseCommerceBridge;
    /**
       @class Adaptive.BaseCommunicationBridge
       Base application for Communication purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    var BaseCommunicationBridge = (function () {
        /**
           @method constructor
           Default constructor.
        */
        function BaseCommunicationBridge() {
            this.apiGroup = IAdaptiveRPGroup.Communication;
        }
        /**
           @method
           Return the API group for the given interface.
           @return {Adaptive.IAdaptiveRPGroup}
        */
        BaseCommunicationBridge.prototype.getAPIGroup = function () {
            return this.apiGroup;
        };
        /**
           @method
           Return the API version for the given interface.

           @return {string} The version of the API.
        */
        BaseCommunicationBridge.prototype.getAPIVersion = function () {
            return Adaptive.bridgeApiVersion;
        };
        return BaseCommunicationBridge;
    })();
    Adaptive.BaseCommunicationBridge = BaseCommunicationBridge;
    /**
       @class Adaptive.BaseDataBridge
       Base application for Data purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    var BaseDataBridge = (function () {
        /**
           @method constructor
           Default constructor.
        */
        function BaseDataBridge() {
            this.apiGroup = IAdaptiveRPGroup.Data;
        }
        /**
           @method
           Return the API group for the given interface.
           @return {Adaptive.IAdaptiveRPGroup}
        */
        BaseDataBridge.prototype.getAPIGroup = function () {
            return this.apiGroup;
        };
        /**
           @method
           Return the API version for the given interface.

           @return {string} The version of the API.
        */
        BaseDataBridge.prototype.getAPIVersion = function () {
            return Adaptive.bridgeApiVersion;
        };
        return BaseDataBridge;
    })();
    Adaptive.BaseDataBridge = BaseDataBridge;
    /**
       @class Adaptive.BaseMediaBridge
       Base application for Media purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    var BaseMediaBridge = (function () {
        /**
           @method constructor
           Default constructor.
        */
        function BaseMediaBridge() {
            this.apiGroup = IAdaptiveRPGroup.Media;
        }
        /**
           @method
           Return the API group for the given interface.
           @return {Adaptive.IAdaptiveRPGroup}
        */
        BaseMediaBridge.prototype.getAPIGroup = function () {
            return this.apiGroup;
        };
        /**
           @method
           Return the API version for the given interface.

           @return {string} The version of the API.
        */
        BaseMediaBridge.prototype.getAPIVersion = function () {
            return Adaptive.bridgeApiVersion;
        };
        return BaseMediaBridge;
    })();
    Adaptive.BaseMediaBridge = BaseMediaBridge;
    /**
       @class Adaptive.BaseNotificationBridge
       Base application for Notification purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    var BaseNotificationBridge = (function () {
        /**
           @method constructor
           Default constructor.
        */
        function BaseNotificationBridge() {
            this.apiGroup = IAdaptiveRPGroup.Notification;
        }
        /**
           @method
           Return the API group for the given interface.
           @return {Adaptive.IAdaptiveRPGroup}
        */
        BaseNotificationBridge.prototype.getAPIGroup = function () {
            return this.apiGroup;
        };
        /**
           @method
           Return the API version for the given interface.

           @return {string} The version of the API.
        */
        BaseNotificationBridge.prototype.getAPIVersion = function () {
            return Adaptive.bridgeApiVersion;
        };
        return BaseNotificationBridge;
    })();
    Adaptive.BaseNotificationBridge = BaseNotificationBridge;
    /**
       @class Adaptive.BasePIMBridge
       Base application for PIM purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    var BasePIMBridge = (function () {
        /**
           @method constructor
           Default constructor.
        */
        function BasePIMBridge() {
            this.apiGroup = IAdaptiveRPGroup.PIM;
        }
        /**
           @method
           Return the API group for the given interface.
           @return {Adaptive.IAdaptiveRPGroup}
        */
        BasePIMBridge.prototype.getAPIGroup = function () {
            return this.apiGroup;
        };
        /**
           @method
           Return the API version for the given interface.

           @return {string} The version of the API.
        */
        BasePIMBridge.prototype.getAPIVersion = function () {
            return Adaptive.bridgeApiVersion;
        };
        return BasePIMBridge;
    })();
    Adaptive.BasePIMBridge = BasePIMBridge;
    /**
       @class Adaptive.BaseReaderBridge
       Base application for Reader purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    var BaseReaderBridge = (function () {
        /**
           @method constructor
           Default constructor.
        */
        function BaseReaderBridge() {
            this.apiGroup = IAdaptiveRPGroup.Reader;
        }
        /**
           @method
           Return the API group for the given interface.
           @return {Adaptive.IAdaptiveRPGroup}
        */
        BaseReaderBridge.prototype.getAPIGroup = function () {
            return this.apiGroup;
        };
        /**
           @method
           Return the API version for the given interface.

           @return {string} The version of the API.
        */
        BaseReaderBridge.prototype.getAPIVersion = function () {
            return Adaptive.bridgeApiVersion;
        };
        return BaseReaderBridge;
    })();
    Adaptive.BaseReaderBridge = BaseReaderBridge;
    /**
       @class Adaptive.BaseSecurityBridge
       Base application for Security purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    var BaseSecurityBridge = (function () {
        /**
           @method constructor
           Default constructor.
        */
        function BaseSecurityBridge() {
            this.apiGroup = IAdaptiveRPGroup.Security;
        }
        /**
           @method
           Return the API group for the given interface.
           @return {Adaptive.IAdaptiveRPGroup}
        */
        BaseSecurityBridge.prototype.getAPIGroup = function () {
            return this.apiGroup;
        };
        /**
           @method
           Return the API version for the given interface.

           @return {string} The version of the API.
        */
        BaseSecurityBridge.prototype.getAPIVersion = function () {
            return Adaptive.bridgeApiVersion;
        };
        return BaseSecurityBridge;
    })();
    Adaptive.BaseSecurityBridge = BaseSecurityBridge;
    /**
       @class Adaptive.BaseSensorBridge
       Base application for Sensor purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    var BaseSensorBridge = (function () {
        /**
           @method constructor
           Default constructor.
        */
        function BaseSensorBridge() {
            this.apiGroup = IAdaptiveRPGroup.Sensor;
        }
        /**
           @method
           Return the API group for the given interface.
           @return {Adaptive.IAdaptiveRPGroup}
        */
        BaseSensorBridge.prototype.getAPIGroup = function () {
            return this.apiGroup;
        };
        /**
           @method
           Return the API version for the given interface.

           @return {string} The version of the API.
        */
        BaseSensorBridge.prototype.getAPIVersion = function () {
            return Adaptive.bridgeApiVersion;
        };
        return BaseSensorBridge;
    })();
    Adaptive.BaseSensorBridge = BaseSensorBridge;
    /**
       @class Adaptive.BaseSocialBridge
       Base application for Social purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    var BaseSocialBridge = (function () {
        /**
           @method constructor
           Default constructor.
        */
        function BaseSocialBridge() {
            this.apiGroup = IAdaptiveRPGroup.Social;
        }
        /**
           @method
           Return the API group for the given interface.
           @return {Adaptive.IAdaptiveRPGroup}
        */
        BaseSocialBridge.prototype.getAPIGroup = function () {
            return this.apiGroup;
        };
        /**
           @method
           Return the API version for the given interface.

           @return {string} The version of the API.
        */
        BaseSocialBridge.prototype.getAPIVersion = function () {
            return Adaptive.bridgeApiVersion;
        };
        return BaseSocialBridge;
    })();
    Adaptive.BaseSocialBridge = BaseSocialBridge;
    /**
       @class Adaptive.BaseSystemBridge
       Base application for System purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    var BaseSystemBridge = (function () {
        /**
           @method constructor
           Default constructor.
        */
        function BaseSystemBridge() {
            this.apiGroup = IAdaptiveRPGroup.System;
        }
        /**
           @method
           Return the API group for the given interface.
           @return {Adaptive.IAdaptiveRPGroup}
        */
        BaseSystemBridge.prototype.getAPIGroup = function () {
            return this.apiGroup;
        };
        /**
           @method
           Return the API version for the given interface.

           @return {string} The version of the API.
        */
        BaseSystemBridge.prototype.getAPIVersion = function () {
            return Adaptive.bridgeApiVersion;
        };
        return BaseSystemBridge;
    })();
    Adaptive.BaseSystemBridge = BaseSystemBridge;
    /**
       @class Adaptive.BaseUIBridge
       Base application for UI purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    var BaseUIBridge = (function () {
        /**
           @method constructor
           Default constructor.
        */
        function BaseUIBridge() {
            this.apiGroup = IAdaptiveRPGroup.UI;
        }
        /**
           @method
           Return the API group for the given interface.
           @return {Adaptive.IAdaptiveRPGroup}
        */
        BaseUIBridge.prototype.getAPIGroup = function () {
            return this.apiGroup;
        };
        /**
           @method
           Return the API version for the given interface.

           @return {string} The version of the API.
        */
        BaseUIBridge.prototype.getAPIVersion = function () {
            return Adaptive.bridgeApiVersion;
        };
        return BaseUIBridge;
    })();
    Adaptive.BaseUIBridge = BaseUIBridge;
    /**
       @class Adaptive.BaseUtilBridge
       Base application for Utility purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    var BaseUtilBridge = (function () {
        /**
           @method constructor
           Default constructor.
        */
        function BaseUtilBridge() {
            this.apiGroup = IAdaptiveRPGroup.Util;
        }
        /**
           @method
           Return the API group for the given interface.
           @return {Adaptive.IAdaptiveRPGroup}
        */
        BaseUtilBridge.prototype.getAPIGroup = function () {
            return this.apiGroup;
        };
        /**
           @method
           Return the API version for the given interface.

           @return {string} The version of the API.
        */
        BaseUtilBridge.prototype.getAPIVersion = function () {
            return Adaptive.bridgeApiVersion;
        };
        return BaseUtilBridge;
    })();
    Adaptive.BaseUtilBridge = BaseUtilBridge;
    /**
       @class Adaptive.AnalyticsBridge
       @extends Adaptive.BaseApplicationBridge
       Interface for Analytics purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    var AnalyticsBridge = (function (_super) {
        __extends(AnalyticsBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function AnalyticsBridge() {
            _super.call(this);
        }
        return AnalyticsBridge;
    })(BaseApplicationBridge);
    Adaptive.AnalyticsBridge = AnalyticsBridge;
    /**
       @class Adaptive.GlobalizationBridge
       @extends Adaptive.BaseApplicationBridge
       Interface for Managing the Globalization results

       @author Francisco Javier Martin Bueno
       @since v2.0
    */
    var GlobalizationBridge = (function (_super) {
        __extends(GlobalizationBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function GlobalizationBridge() {
            _super.call(this);
        }
        /**
           @method
           Returns the default locale of the application defined in the configuration file

           @return {Adaptive.Locale} Default Locale of the application
           @since v2.0
        */
        GlobalizationBridge.prototype.getDefaultLocale = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("IGlobalization", "getDefaultLocale", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = Locale.toObject(JSON.parse(apiResponse.getResponse()));
            }
            return response;
        };
        /**
           @method
           List of supported locales for the application defined in the configuration file

           @return {Adaptive.Locale[]} List of locales
           @since v2.0
        */
        GlobalizationBridge.prototype.getLocaleSupportedDescriptors = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("IGlobalization", "getLocaleSupportedDescriptors", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = new Array();
                var responseArray = JSON.parse(apiResponse.getResponse());
                for (var i = 0; i < responseArray.length; i++) {
                    response.push(Locale.toObject(responseArray[i]));
                }
            }
            return response;
        };
        /**
           @method
           Gets the text/message corresponding to the given key and locale.

           @param {string} key key    to match text
           @param {Adaptive.Locale} locale locale The locale object to get localized message, or the locale desciptor ("language" or "language-country" two-letters ISO codes.
           @return {string} Localized text.
           @since v2.0
        */
        GlobalizationBridge.prototype.getResourceLiteral = function (key, locale) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(key));
            arParams.push(JSON.stringify(locale));
            var apiRequest = new APIRequest("IGlobalization", "getResourceLiteral", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = apiResponse.getResponse();
            }
            return response;
        };
        /**
           @method
           Gets the full application configured literals (key/message pairs) corresponding to the given locale.

           @param {Adaptive.Locale} locale locale The locale object to get localized message, or the locale desciptor ("language" or "language-country" two-letters ISO codes.
           @return {Adaptive.KeyPair[]} Localized texts in the form of an object.
           @since v2.0
        */
        GlobalizationBridge.prototype.getResourceLiterals = function (locale) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(locale));
            var apiRequest = new APIRequest("IGlobalization", "getResourceLiterals", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = new Array();
                var responseArray = JSON.parse(apiResponse.getResponse());
                for (var i = 0; i < responseArray.length; i++) {
                    response.push(KeyPair.toObject(responseArray[i]));
                }
            }
            return response;
        };
        return GlobalizationBridge;
    })(BaseApplicationBridge);
    Adaptive.GlobalizationBridge = GlobalizationBridge;
    /**
       @class Adaptive.LifecycleBridge
       @extends Adaptive.BaseApplicationBridge
       Interface for Managing the Lifecycle listeners

       @author Carlos Lozano Diez
       @since v2.0
    */
    var LifecycleBridge = (function (_super) {
        __extends(LifecycleBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function LifecycleBridge() {
            _super.call(this);
        }
        /**
           @method
           Add the listener for the lifecycle of the app

           @param {Adaptive.LifecycleListener} listener listener Lifecycle listener
           @since v2.0
        */
        LifecycleBridge.prototype.addLifecycleListener = function (listener) {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("ILifecycle", "addLifecycleListener", arParams, listener.getId());
            postRequestListener(apiRequest, listener, Adaptive.registeredLifecycleListener);
        };
        /**
           @method
           Whether the application is in background or not

           @return {boolean} true if the application is in background;false otherwise
           @since v2.0
        */
        LifecycleBridge.prototype.isBackground = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("ILifecycle", "isBackground", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = false;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = JSON.parse(apiResponse.getResponse());
            }
            return response;
        };
        /**
           @method
           Un-registers an existing listener from receiving lifecycle events.

           @param {Adaptive.LifecycleListener} listener listener Lifecycle listener
           @since v2.0
        */
        LifecycleBridge.prototype.removeLifecycleListener = function (listener) {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("ILifecycle", "removeLifecycleListener", arParams, listener.getId());
            postRequestListener(apiRequest, listener, Adaptive.registeredLifecycleListener);
        };
        /**
           @method
           Removes all existing listeners from receiving lifecycle events.

           @since v2.0
        */
        LifecycleBridge.prototype.removeLifecycleListeners = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("ILifecycle", "removeLifecycleListeners", arParams, -1);
            postRequestListener(apiRequest, null, Adaptive.registeredLifecycleListener);
        };
        return LifecycleBridge;
    })(BaseApplicationBridge);
    Adaptive.LifecycleBridge = LifecycleBridge;
    /**
       @class Adaptive.ManagementBridge
       @extends Adaptive.BaseApplicationBridge
       Interface for Managing the Management operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var ManagementBridge = (function (_super) {
        __extends(ManagementBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function ManagementBridge() {
            _super.call(this);
        }
        return ManagementBridge;
    })(BaseApplicationBridge);
    Adaptive.ManagementBridge = ManagementBridge;
    /**
       @class Adaptive.PrintingBridge
       @extends Adaptive.BaseApplicationBridge
       Interface for Managing the Printing operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var PrintingBridge = (function (_super) {
        __extends(PrintingBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function PrintingBridge() {
            _super.call(this);
        }
        return PrintingBridge;
    })(BaseApplicationBridge);
    Adaptive.PrintingBridge = PrintingBridge;
    /**
       @class Adaptive.SettingsBridge
       @extends Adaptive.BaseApplicationBridge
       Interface for Managing the Settings operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var SettingsBridge = (function (_super) {
        __extends(SettingsBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function SettingsBridge() {
            _super.call(this);
        }
        return SettingsBridge;
    })(BaseApplicationBridge);
    Adaptive.SettingsBridge = SettingsBridge;
    /**
       @class Adaptive.UpdateBridge
       @extends Adaptive.BaseApplicationBridge
       Interface for Managing the Update operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var UpdateBridge = (function (_super) {
        __extends(UpdateBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function UpdateBridge() {
            _super.call(this);
        }
        return UpdateBridge;
    })(BaseApplicationBridge);
    Adaptive.UpdateBridge = UpdateBridge;
    /**
       @class Adaptive.AdsBridge
       @extends Adaptive.BaseCommerceBridge
       Interface for Advertising purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    var AdsBridge = (function (_super) {
        __extends(AdsBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function AdsBridge() {
            _super.call(this);
        }
        return AdsBridge;
    })(BaseCommerceBridge);
    Adaptive.AdsBridge = AdsBridge;
    /**
       @class Adaptive.StoreBridge
       @extends Adaptive.BaseCommerceBridge
       Interface for Managing the Store operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var StoreBridge = (function (_super) {
        __extends(StoreBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function StoreBridge() {
            _super.call(this);
        }
        return StoreBridge;
    })(BaseCommerceBridge);
    Adaptive.StoreBridge = StoreBridge;
    /**
       @class Adaptive.WalletBridge
       @extends Adaptive.BaseCommerceBridge
       Interface for Managing the Wallet operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var WalletBridge = (function (_super) {
        __extends(WalletBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function WalletBridge() {
            _super.call(this);
        }
        return WalletBridge;
    })(BaseCommerceBridge);
    Adaptive.WalletBridge = WalletBridge;
    /**
       @class Adaptive.BluetoothBridge
       @extends Adaptive.BaseCommunicationBridge
       Interface for Bluetooth purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    var BluetoothBridge = (function (_super) {
        __extends(BluetoothBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function BluetoothBridge() {
            _super.call(this);
        }
        return BluetoothBridge;
    })(BaseCommunicationBridge);
    Adaptive.BluetoothBridge = BluetoothBridge;
    /**
       @class Adaptive.NetworkInfoBridge
       @extends Adaptive.BaseCommunicationBridge
       Interface for Managing the Network information operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var NetworkInfoBridge = (function (_super) {
        __extends(NetworkInfoBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function NetworkInfoBridge() {
            _super.call(this);
        }
        return NetworkInfoBridge;
    })(BaseCommunicationBridge);
    Adaptive.NetworkInfoBridge = NetworkInfoBridge;
    /**
       @class Adaptive.NetworkNamingBridge
       @extends Adaptive.BaseCommunicationBridge
       Interface for Managing the Network naming operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var NetworkNamingBridge = (function (_super) {
        __extends(NetworkNamingBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function NetworkNamingBridge() {
            _super.call(this);
        }
        return NetworkNamingBridge;
    })(BaseCommunicationBridge);
    Adaptive.NetworkNamingBridge = NetworkNamingBridge;
    /**
       @class Adaptive.NetworkReachabilityBridge
       @extends Adaptive.BaseCommunicationBridge
       Interface for Managing the Network reachability operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var NetworkReachabilityBridge = (function (_super) {
        __extends(NetworkReachabilityBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function NetworkReachabilityBridge() {
            _super.call(this);
        }
        /**
           @method
           Whether there is connectivity to a host, via domain name or ip address, or not.

           @param {string} host host     domain name or ip address of host.
           @param {Adaptive.NetworkReachabilityCallback} callback callback Callback called at the end.
           @since v2.0
        */
        NetworkReachabilityBridge.prototype.isNetworkReachable = function (host, callback) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(host));
            var apiRequest = new APIRequest("INetworkReachability", "isNetworkReachable", arParams, callback.getId());
            postRequestCallback(apiRequest, callback, Adaptive.registeredNetworkReachabilityCallback);
        };
        /**
           @method
           Whether there is connectivity to an url of a service or not.

           @param {string} url url      to look for
           @param {Adaptive.NetworkReachabilityCallback} callback callback Callback called at the end
           @since v2.0
        */
        NetworkReachabilityBridge.prototype.isNetworkServiceReachable = function (url, callback) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(url));
            var apiRequest = new APIRequest("INetworkReachability", "isNetworkServiceReachable", arParams, callback.getId());
            postRequestCallback(apiRequest, callback, Adaptive.registeredNetworkReachabilityCallback);
        };
        return NetworkReachabilityBridge;
    })(BaseCommunicationBridge);
    Adaptive.NetworkReachabilityBridge = NetworkReachabilityBridge;
    /**
       @class Adaptive.NetworkStatusBridge
       @extends Adaptive.BaseCommunicationBridge
       Interface for Managing the Network status

       @author Carlos Lozano Diez
       @since v2.0
    */
    var NetworkStatusBridge = (function (_super) {
        __extends(NetworkStatusBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function NetworkStatusBridge() {
            _super.call(this);
        }
        /**
           @method
           Add the listener for network status changes of the app

           @param {Adaptive.NetworkStatusListener} listener listener Listener with the result
           @since v2.0
        */
        NetworkStatusBridge.prototype.addNetworkStatusListener = function (listener) {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("INetworkStatus", "addNetworkStatusListener", arParams, listener.getId());
            postRequestListener(apiRequest, listener, Adaptive.registeredNetworkStatusListener);
        };
        /**
           @method
           Un-registers an existing listener from receiving network status events.

           @param {Adaptive.NetworkStatusListener} listener listener Listener with the result
           @since v2.0
        */
        NetworkStatusBridge.prototype.removeNetworkStatusListener = function (listener) {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("INetworkStatus", "removeNetworkStatusListener", arParams, listener.getId());
            postRequestListener(apiRequest, listener, Adaptive.registeredNetworkStatusListener);
        };
        /**
           @method
           Removes all existing listeners from receiving network status events.

           @since v2.0
        */
        NetworkStatusBridge.prototype.removeNetworkStatusListeners = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("INetworkStatus", "removeNetworkStatusListeners", arParams, -1);
            postRequestListener(apiRequest, null, Adaptive.registeredNetworkStatusListener);
        };
        return NetworkStatusBridge;
    })(BaseCommunicationBridge);
    Adaptive.NetworkStatusBridge = NetworkStatusBridge;
    /**
       @class Adaptive.ServiceBridge
       @extends Adaptive.BaseCommunicationBridge
       Interface for Managing the Services operations

       @author Francisco Javier Martin Bueno
       @since v2.0
    */
    var ServiceBridge = (function (_super) {
        __extends(ServiceBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function ServiceBridge() {
            _super.call(this);
        }
        /**
           @method
           Create a service request for the given ServiceToken. This method creates the request, populating
existing headers and cookies for the same service. The request is populated with all the defaults
for the service being invoked and requires only the request body to be set. Headers and cookies may be
manipulated as needed by the application before submitting the ServiceRequest via invokeService.

           @param {Adaptive.ServiceToken} serviceToken serviceToken ServiceToken to be used for the creation of the request.
           @return {Adaptive.ServiceRequest} ServiceRequest with pre-populated headers, cookies and defaults for the service.
           @since v2.0.6
        */
        ServiceBridge.prototype.getServiceRequest = function (serviceToken) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(serviceToken));
            var apiRequest = new APIRequest("IService", "getServiceRequest", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = ServiceRequest.toObject(JSON.parse(apiResponse.getResponse()));
            }
            return response;
        };
        /**
           @method
           Obtains a ServiceToken for the given parameters to be used for the creation of requests.

           @param {string} serviceName serviceName  Service name.
           @param {string} endpointName endpointName Endpoint name.
           @param {string} functionName functionName Function name.
           @param {Adaptive.IServiceMethod} method method       Method type.
           @return {Adaptive.ServiceToken} ServiceToken to create a service request or null if the given parameter combination is not
configured in the platform's XML service definition file.
           @since v2.0.6
        */
        ServiceBridge.prototype.getServiceToken = function (serviceName, endpointName, functionName, method) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(serviceName));
            arParams.push(JSON.stringify(endpointName));
            arParams.push(JSON.stringify(functionName));
            arParams.push(JSON.stringify(method));
            var apiRequest = new APIRequest("IService", "getServiceToken", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = ServiceToken.toObject(JSON.parse(apiResponse.getResponse()));
            }
            return response;
        };
        /**
           @method
           Obtains a Service token by a concrete uri (http://domain.com/path). This method would be useful when
a service response is a redirect (3XX) and it is necessary to make a request to another host and we
don't know by advance the name of the service.

           @param {string} uri uri Unique Resource Identifier for a Service-Endpoint-Path-Method
           @return {Adaptive.ServiceToken} ServiceToken to create a service request or null if the given parameter is not
configured in the platform's XML service definition file.
           @since v2.1.4
        */
        ServiceBridge.prototype.getServiceTokenByUri = function (uri) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(uri));
            var apiRequest = new APIRequest("IService", "getServiceTokenByUri", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = ServiceToken.toObject(JSON.parse(apiResponse.getResponse()));
            }
            return response;
        };
        /**
           @method
           Returns all the possible service tokens configured in the platform's XML service definition file.

           @return {Adaptive.ServiceToken[]} Array of service tokens configured.
           @since v2.0.6
        */
        ServiceBridge.prototype.getServicesRegistered = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("IService", "getServicesRegistered", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = new Array();
                var responseArray = JSON.parse(apiResponse.getResponse());
                for (var i = 0; i < responseArray.length; i++) {
                    response.push(ServiceToken.toObject(responseArray[i]));
                }
            }
            return response;
        };
        /**
           @method
           Executes the given ServiceRequest and provides responses to the given callback handler.

           @param {Adaptive.ServiceRequest} serviceRequest serviceRequest ServiceRequest with the request body.
           @param {Adaptive.ServiceResultCallback} callback callback       IServiceResultCallback to handle the ServiceResponse.
           @since v2.0.6
        */
        ServiceBridge.prototype.invokeService = function (serviceRequest, callback) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(serviceRequest));
            var apiRequest = new APIRequest("IService", "invokeService", arParams, callback.getId());
            postRequestCallback(apiRequest, callback, Adaptive.registeredServiceResultCallback);
        };
        /**
           @method
           Checks whether a specific service, endpoint, function and method type is configured in the platform's
XML service definition file.

           @param {string} serviceName serviceName  Service name.
           @param {string} endpointName endpointName Endpoint name.
           @param {string} functionName functionName Function name.
           @param {Adaptive.IServiceMethod} method method       Method type.
           @return {boolean} Returns true if the service is configured, false otherwise.
           @since v2.0.6
        */
        ServiceBridge.prototype.isServiceRegistered = function (serviceName, endpointName, functionName, method) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(serviceName));
            arParams.push(JSON.stringify(endpointName));
            arParams.push(JSON.stringify(functionName));
            arParams.push(JSON.stringify(method));
            var apiRequest = new APIRequest("IService", "isServiceRegistered", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = false;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = JSON.parse(apiResponse.getResponse());
            }
            return response;
        };
        return ServiceBridge;
    })(BaseCommunicationBridge);
    Adaptive.ServiceBridge = ServiceBridge;
    /**
       @class Adaptive.SocketBridge
       @extends Adaptive.BaseCommunicationBridge
       Interface for Managing the Socket operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var SocketBridge = (function (_super) {
        __extends(SocketBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function SocketBridge() {
            _super.call(this);
        }
        return SocketBridge;
    })(BaseCommunicationBridge);
    Adaptive.SocketBridge = SocketBridge;
    /**
       @class Adaptive.TelephonyBridge
       @extends Adaptive.BaseCommunicationBridge
       Interface for Managing the Telephony operations

       @author Francisco Javier Martin Bueno
       @since v2.0
    */
    var TelephonyBridge = (function (_super) {
        __extends(TelephonyBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function TelephonyBridge() {
            _super.call(this);
        }
        /**
           @method
           Invoke a phone call

           @param {string} number number to call
           @return {Adaptive.ITelephonyStatus} Status of the call
           @since v2.0
        */
        TelephonyBridge.prototype.call = function (number) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(number));
            var apiRequest = new APIRequest("ITelephony", "call", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = ITelephonyStatus.toObject(JSON.parse(apiResponse.getResponse()));
            }
            return response;
        };
        return TelephonyBridge;
    })(BaseCommunicationBridge);
    Adaptive.TelephonyBridge = TelephonyBridge;
    /**
       @class Adaptive.CloudBridge
       @extends Adaptive.BaseDataBridge
       Interface for Managing the Cloud operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var CloudBridge = (function (_super) {
        __extends(CloudBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function CloudBridge() {
            _super.call(this);
        }
        return CloudBridge;
    })(BaseDataBridge);
    Adaptive.CloudBridge = CloudBridge;
    /**
       @class Adaptive.DataStreamBridge
       @extends Adaptive.BaseDataBridge
       Interface for Managing the DataStream operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var DataStreamBridge = (function (_super) {
        __extends(DataStreamBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function DataStreamBridge() {
            _super.call(this);
        }
        return DataStreamBridge;
    })(BaseDataBridge);
    Adaptive.DataStreamBridge = DataStreamBridge;
    /**
       @class Adaptive.DatabaseBridge
       @extends Adaptive.BaseDataBridge
       Interface for Managing the Cloud operations

       @author Ferran Vila Conesa
       @since v2.0
    */
    var DatabaseBridge = (function (_super) {
        __extends(DatabaseBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function DatabaseBridge() {
            _super.call(this);
        }
        /**
           @method
           Creates a database on default path for every platform.

           @param {Adaptive.Database} database database Database object to create
           @param {Adaptive.DatabaseResultCallback} callback callback Asynchronous callback
           @since v2.0
        */
        DatabaseBridge.prototype.createDatabase = function (database, callback) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(database));
            var apiRequest = new APIRequest("IDatabase", "createDatabase", arParams, callback.getId());
            postRequestCallback(apiRequest, callback, Adaptive.registeredDatabaseResultCallback);
        };
        /**
           @method
           Creates a databaseTable inside a database for every platform.

           @param {Adaptive.Database} database database      Database for databaseTable creating.
           @param {Adaptive.DatabaseTable} databaseTable databaseTable DatabaseTable object with the name of the databaseTable inside.
           @param {Adaptive.DatabaseTableResultCallback} callback callback      DatabaseTable callback with the response
           @since v2.0
        */
        DatabaseBridge.prototype.createTable = function (database, databaseTable, callback) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(database));
            arParams.push(JSON.stringify(databaseTable));
            var apiRequest = new APIRequest("IDatabase", "createTable", arParams, callback.getId());
            postRequestCallback(apiRequest, callback, Adaptive.registeredDatabaseTableResultCallback);
        };
        /**
           @method
           Deletes a database on default path for every platform.

           @param {Adaptive.Database} database database Database object to delete
           @param {Adaptive.DatabaseResultCallback} callback callback Asynchronous callback
           @since v2.0
        */
        DatabaseBridge.prototype.deleteDatabase = function (database, callback) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(database));
            var apiRequest = new APIRequest("IDatabase", "deleteDatabase", arParams, callback.getId());
            postRequestCallback(apiRequest, callback, Adaptive.registeredDatabaseResultCallback);
        };
        /**
           @method
           Deletes a databaseTable inside a database for every platform.

           @param {Adaptive.Database} database database      Database for databaseTable removal.
           @param {Adaptive.DatabaseTable} databaseTable databaseTable DatabaseTable object with the name of the databaseTable inside.
           @param {Adaptive.DatabaseTableResultCallback} callback callback      DatabaseTable callback with the response
           @since v2.0
        */
        DatabaseBridge.prototype.deleteTable = function (database, databaseTable, callback) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(database));
            arParams.push(JSON.stringify(databaseTable));
            var apiRequest = new APIRequest("IDatabase", "deleteTable", arParams, callback.getId());
            postRequestCallback(apiRequest, callback, Adaptive.registeredDatabaseTableResultCallback);
        };
        /**
           @method
           Executes SQL statement into the given database. The replacements
should be passed as a parameter

           @param {Adaptive.Database} database database     The database object reference.
           @param {string} statement statement    SQL statement.
           @param {string[]} replacements replacements List of SQL statement replacements.
           @param {Adaptive.DatabaseTableResultCallback} callback callback     DatabaseTable callback with the response.
           @since v2.0
        */
        DatabaseBridge.prototype.executeSqlStatement = function (database, statement, replacements, callback) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(database));
            arParams.push(JSON.stringify(statement));
            arParams.push(JSON.stringify(replacements));
            var apiRequest = new APIRequest("IDatabase", "executeSqlStatement", arParams, callback.getId());
            postRequestCallback(apiRequest, callback, Adaptive.registeredDatabaseTableResultCallback);
        };
        /**
           @method
           Executes SQL transaction (some statements chain) inside given database.

           @param {Adaptive.Database} database database     The database object reference.
           @param {string[]} statements statements   The statements to be executed during transaction.
           @param {boolean} rollbackFlag rollbackFlag Indicates if rollback should be performed when any
                  statement execution fails.
           @param {Adaptive.DatabaseTableResultCallback} callback callback     DatabaseTable callback with the response.
           @since v2.0
        */
        DatabaseBridge.prototype.executeSqlTransactions = function (database, statements, rollbackFlag, callback) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(database));
            arParams.push(JSON.stringify(statements));
            arParams.push(JSON.stringify(rollbackFlag));
            var apiRequest = new APIRequest("IDatabase", "executeSqlTransactions", arParams, callback.getId());
            postRequestCallback(apiRequest, callback, Adaptive.registeredDatabaseTableResultCallback);
        };
        /**
           @method
           Checks if database exists by given database name.

           @param {Adaptive.Database} database database Database Object to check if exists
           @return {boolean} True if exists, false otherwise
           @since v2.0
        */
        DatabaseBridge.prototype.existsDatabase = function (database) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(database));
            var apiRequest = new APIRequest("IDatabase", "existsDatabase", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = false;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = JSON.parse(apiResponse.getResponse());
            }
            return response;
        };
        /**
           @method
           Checks if databaseTable exists by given database name.

           @param {Adaptive.Database} database database      Database for databaseTable consulting.
           @param {Adaptive.DatabaseTable} databaseTable databaseTable DatabaseTable object with the name of the databaseTable inside.
           @return {boolean} True if exists, false otherwise
           @since v2.0
        */
        DatabaseBridge.prototype.existsTable = function (database, databaseTable) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(database));
            arParams.push(JSON.stringify(databaseTable));
            var apiRequest = new APIRequest("IDatabase", "existsTable", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = false;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = JSON.parse(apiResponse.getResponse());
            }
            return response;
        };
        return DatabaseBridge;
    })(BaseDataBridge);
    Adaptive.DatabaseBridge = DatabaseBridge;
    /**
       @class Adaptive.FileBridge
       @extends Adaptive.BaseDataBridge
       Interface for Managing the File operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var FileBridge = (function (_super) {
        __extends(FileBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function FileBridge() {
            _super.call(this);
        }
        /**
           @method
           Determine whether the current file/folder can be read from.

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @return {boolean} True if the folder/file is readable, false otherwise.
           @since v2.0
        */
        FileBridge.prototype.canRead = function (descriptor) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(descriptor));
            var apiRequest = new APIRequest("IFile", "canRead", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = false;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = JSON.parse(apiResponse.getResponse());
            }
            return response;
        };
        /**
           @method
           Determine whether the current file/folder can be written to.

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @return {boolean} True if the folder/file is writable, false otherwise.
           @since v2.0
        */
        FileBridge.prototype.canWrite = function (descriptor) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(descriptor));
            var apiRequest = new APIRequest("IFile", "canWrite", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = false;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = JSON.parse(apiResponse.getResponse());
            }
            return response;
        };
        /**
           @method
           Creates a file with the specified name.

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @param {Adaptive.FileResultCallback} callback callback   Result of the operation.
           @since v2.0
        */
        FileBridge.prototype.create = function (descriptor, callback) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(descriptor));
            var apiRequest = new APIRequest("IFile", "create", arParams, callback.getId());
            postRequestCallback(apiRequest, callback, Adaptive.registeredFileResultCallback);
        };
        /**
           @method
           Deletes the given file or path. If the file is a directory and contains files and or subdirectories, these will be
deleted if the cascade parameter is set to true.

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @param {boolean} cascade cascade    Whether to delete sub-files and sub-folders.
           @return {boolean} True if files (and sub-files and folders) whether deleted.
           @since v2.0
        */
        FileBridge.prototype.delete = function (descriptor, cascade) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(descriptor));
            arParams.push(JSON.stringify(cascade));
            var apiRequest = new APIRequest("IFile", "delete", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = false;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = JSON.parse(apiResponse.getResponse());
            }
            return response;
        };
        /**
           @method
           Check whether the file/path exists.

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @return {boolean} True if the file exists in the filesystem, false otherwise.
           @since v2.0
        */
        FileBridge.prototype.exists = function (descriptor) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(descriptor));
            var apiRequest = new APIRequest("IFile", "exists", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = false;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = JSON.parse(apiResponse.getResponse());
            }
            return response;
        };
        /**
           @method
           Loads the content of the file.

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @param {Adaptive.FileDataLoadResultCallback} callback callback   Result of the operation.
           @since v2.0
        */
        FileBridge.prototype.getContent = function (descriptor, callback) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(descriptor));
            var apiRequest = new APIRequest("IFile", "getContent", arParams, callback.getId());
            postRequestCallback(apiRequest, callback, Adaptive.registeredFileDataLoadResultCallback);
        };
        /**
           @method
           Returns the file storage type of the file

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @return {Adaptive.IFileSystemStorageType} Storage Type file
           @since v2.0
        */
        FileBridge.prototype.getFileStorageType = function (descriptor) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(descriptor));
            var apiRequest = new APIRequest("IFile", "getFileStorageType", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = IFileSystemStorageType.toObject(JSON.parse(apiResponse.getResponse()));
            }
            return response;
        };
        /**
           @method
           Returns the file type

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @return {Adaptive.IFileSystemType} Returns the file type of the file
           @since v2.0
        */
        FileBridge.prototype.getFileType = function (descriptor) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(descriptor));
            var apiRequest = new APIRequest("IFile", "getFileType", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = IFileSystemType.toObject(JSON.parse(apiResponse.getResponse()));
            }
            return response;
        };
        /**
           @method
           Returns the security type of the file

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @return {Adaptive.IFileSystemSecurity} Security Level of the file
           @since v2.0
        */
        FileBridge.prototype.getSecurityType = function (descriptor) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(descriptor));
            var apiRequest = new APIRequest("IFile", "getSecurityType", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = IFileSystemSecurity.toObject(JSON.parse(apiResponse.getResponse()));
            }
            return response;
        };
        /**
           @method
           Check whether this is a path of a file.

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @return {boolean} true if this is a path to a folder/directory, false if this is a path to a file.
           @since v2.0
        */
        FileBridge.prototype.isDirectory = function (descriptor) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(descriptor));
            var apiRequest = new APIRequest("IFile", "isDirectory", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = false;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = JSON.parse(apiResponse.getResponse());
            }
            return response;
        };
        /**
           @method
           List all the files contained within this file/path reference. If the reference is a file, it will not yield
any results.

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @param {Adaptive.FileListResultCallback} callback callback   Result of operation.
           @since v2.0
        */
        FileBridge.prototype.listFiles = function (descriptor, callback) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(descriptor));
            var apiRequest = new APIRequest("IFile", "listFiles", arParams, callback.getId());
            postRequestCallback(apiRequest, callback, Adaptive.registeredFileListResultCallback);
        };
        /**
           @method
           List all the files matching the speficied regex filter within this file/path reference. If the reference
is a file, it will not yield any results.

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @param {string} regex regex      Filter (eg. *.jpg, *.png, Fil*) name string.
           @param {Adaptive.FileListResultCallback} callback callback   Result of operation.
           @since v2.0
        */
        FileBridge.prototype.listFilesForRegex = function (descriptor, regex, callback) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(descriptor));
            arParams.push(JSON.stringify(regex));
            var apiRequest = new APIRequest("IFile", "listFilesForRegex", arParams, callback.getId());
            postRequestCallback(apiRequest, callback, Adaptive.registeredFileListResultCallback);
        };
        /**
           @method
           Creates the parent path (or paths, if recursive) to the given file/path if it doesn't already exist.

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @param {boolean} recursive recursive  Whether to create all parent path elements.
           @return {boolean} True if the path was created, false otherwise (or it exists already).
           @since v2.0
        */
        FileBridge.prototype.mkDir = function (descriptor, recursive) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(descriptor));
            arParams.push(JSON.stringify(recursive));
            var apiRequest = new APIRequest("IFile", "mkDir", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = false;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = JSON.parse(apiResponse.getResponse());
            }
            return response;
        };
        /**
           @method
           Moves the current file to the given file destination, optionally overwriting and creating the path to the
new destination file.

           @param {Adaptive.FileDescriptor} source source      File descriptor of file or folder used for operation as source.
           @param {Adaptive.FileDescriptor} destination destination File descriptor of file or folder used for operation as destination.
           @param {boolean} createPath createPath  True to create the path if it does not already exist.
           @param {boolean} overwrite overwrite   True to create the path if it does not already exist.
           @param {Adaptive.FileResultCallback} callback callback    Result of the operation.
           @since v2.0
        */
        FileBridge.prototype.move = function (source, destination, createPath, overwrite, callback) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(source));
            arParams.push(JSON.stringify(destination));
            arParams.push(JSON.stringify(createPath));
            arParams.push(JSON.stringify(overwrite));
            var apiRequest = new APIRequest("IFile", "move", arParams, callback.getId());
            postRequestCallback(apiRequest, callback, Adaptive.registeredFileResultCallback);
        };
        /**
           @method
           Sets the content of the file.

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @param {number[]} content content    Binary content to store in the file.
           @param {Adaptive.FileDataStoreResultCallback} callback callback   Result of the operation.
           @since v2.0
        */
        FileBridge.prototype.setContent = function (descriptor, content, callback) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(descriptor));
            arParams.push(JSON.stringify(content));
            var apiRequest = new APIRequest("IFile", "setContent", arParams, callback.getId());
            postRequestCallback(apiRequest, callback, Adaptive.registeredFileDataStoreResultCallback);
        };
        return FileBridge;
    })(BaseDataBridge);
    Adaptive.FileBridge = FileBridge;
    /**
       @class Adaptive.FileSystemBridge
       @extends Adaptive.BaseDataBridge
       Interface for Managing the File System operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var FileSystemBridge = (function (_super) {
        __extends(FileSystemBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function FileSystemBridge() {
            _super.call(this);
        }
        /**
           @method
           Creates a new reference to a new or existing location in the filesystem.
This method does not create the actual file in the specified folder.

           @param {Adaptive.FileDescriptor} parent parent Parent directory.
           @param {string} name name   Name of new file or directory.
           @return {Adaptive.FileDescriptor} A reference to a new or existing location in the filesystem.
           @since v2.0
        */
        FileSystemBridge.prototype.createFileDescriptor = function (parent, name) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(parent));
            arParams.push(JSON.stringify(name));
            var apiRequest = new APIRequest("IFileSystem", "createFileDescriptor", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = FileDescriptor.toObject(JSON.parse(apiResponse.getResponse()));
            }
            return response;
        };
        /**
           @method
           Returns a reference to the cache folder for the current application.
This path must always be writable by the current application.
This path is volatile and may be cleaned by the OS periodically.

           @return {Adaptive.FileDescriptor} Path to the application's cache folder.
           @since v2.0
        */
        FileSystemBridge.prototype.getApplicationCacheFolder = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("IFileSystem", "getApplicationCacheFolder", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = FileDescriptor.toObject(JSON.parse(apiResponse.getResponse()));
            }
            return response;
        };
        /**
           @method
           Returns a reference to the cloud synchronizable folder for the current application.
This path must always be writable by the current application.

           @return {Adaptive.FileDescriptor} Path to the application's cloud storage folder.
           @since v2.0
        */
        FileSystemBridge.prototype.getApplicationCloudFolder = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("IFileSystem", "getApplicationCloudFolder", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = FileDescriptor.toObject(JSON.parse(apiResponse.getResponse()));
            }
            return response;
        };
        /**
           @method
           Returns a reference to the documents folder for the current application.
This path must always be writable by the current application.

           @return {Adaptive.FileDescriptor} Path to the application's documents folder.
           @since v2.0
        */
        FileSystemBridge.prototype.getApplicationDocumentsFolder = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("IFileSystem", "getApplicationDocumentsFolder", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = FileDescriptor.toObject(JSON.parse(apiResponse.getResponse()));
            }
            return response;
        };
        /**
           @method
           Returns a reference to the application installation folder.
This path may or may not be directly readable or writable - it usually contains the app binary and data.

           @return {Adaptive.FileDescriptor} Path to the application folder.
           @since v2.0
        */
        FileSystemBridge.prototype.getApplicationFolder = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("IFileSystem", "getApplicationFolder", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = FileDescriptor.toObject(JSON.parse(apiResponse.getResponse()));
            }
            return response;
        };
        /**
           @method
           Returns a reference to the protected storage folder for the current application.
This path must always be writable by the current application.

           @return {Adaptive.FileDescriptor} Path to the application's protected storage folder.
           @since v2.0
        */
        FileSystemBridge.prototype.getApplicationProtectedFolder = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("IFileSystem", "getApplicationProtectedFolder", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = FileDescriptor.toObject(JSON.parse(apiResponse.getResponse()));
            }
            return response;
        };
        /**
           @method
           Returns the file system dependent file separator.

           @return {string} char with the directory/file separator.
           @since v2.0
        */
        FileSystemBridge.prototype.getSeparator = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("IFileSystem", "getSeparator", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = apiResponse.getResponse();
            }
            return response;
        };
        /**
           @method
           Returns a reference to the external storage folder provided by the OS. This may
be an external SSD card or similar. This type of storage is removable and by
definition, not secure.
This path may or may not be writable by the current application.

           @return {Adaptive.FileDescriptor} Path to the application's documents folder.
           @since v2.0
        */
        FileSystemBridge.prototype.getSystemExternalFolder = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("IFileSystem", "getSystemExternalFolder", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = FileDescriptor.toObject(JSON.parse(apiResponse.getResponse()));
            }
            return response;
        };
        return FileSystemBridge;
    })(BaseDataBridge);
    Adaptive.FileSystemBridge = FileSystemBridge;
    /**
       @class Adaptive.InternalStorageBridge
       @extends Adaptive.BaseDataBridge
       Interface for Managing the Internal Storage operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var InternalStorageBridge = (function (_super) {
        __extends(InternalStorageBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function InternalStorageBridge() {
            _super.call(this);
        }
        return InternalStorageBridge;
    })(BaseDataBridge);
    Adaptive.InternalStorageBridge = InternalStorageBridge;
    /**
       @class Adaptive.XMLBridge
       @extends Adaptive.BaseDataBridge
       Interface for Managing the XML operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var XMLBridge = (function (_super) {
        __extends(XMLBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function XMLBridge() {
            _super.call(this);
        }
        return XMLBridge;
    })(BaseDataBridge);
    Adaptive.XMLBridge = XMLBridge;
    /**
       @class Adaptive.AudioBridge
       @extends Adaptive.BaseMediaBridge
       Interface for Audio purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    var AudioBridge = (function (_super) {
        __extends(AudioBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function AudioBridge() {
            _super.call(this);
        }
        return AudioBridge;
    })(BaseMediaBridge);
    Adaptive.AudioBridge = AudioBridge;
    /**
       @class Adaptive.CameraBridge
       @extends Adaptive.BaseMediaBridge
       Interface for Managing the camera operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var CameraBridge = (function (_super) {
        __extends(CameraBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function CameraBridge() {
            _super.call(this);
        }
        return CameraBridge;
    })(BaseMediaBridge);
    Adaptive.CameraBridge = CameraBridge;
    /**
       @class Adaptive.ImagingBridge
       @extends Adaptive.BaseMediaBridge
       Interface for Managing the Imaging operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var ImagingBridge = (function (_super) {
        __extends(ImagingBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function ImagingBridge() {
            _super.call(this);
        }
        return ImagingBridge;
    })(BaseMediaBridge);
    Adaptive.ImagingBridge = ImagingBridge;
    /**
       @class Adaptive.VideoBridge
       @extends Adaptive.BaseMediaBridge
       Interface for Managing the Video operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var VideoBridge = (function (_super) {
        __extends(VideoBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function VideoBridge() {
            _super.call(this);
        }
        /**
           @method
           Play url video stream

           @param {string} url url of the video
           @since v2.0
        */
        VideoBridge.prototype.playStream = function (url) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(url));
            var apiRequest = new APIRequest("IVideo", "playStream", arParams, -1 /* = synchronous call */);
            postRequest(apiRequest);
        };
        return VideoBridge;
    })(BaseMediaBridge);
    Adaptive.VideoBridge = VideoBridge;
    /**
       @class Adaptive.AlarmBridge
       @extends Adaptive.BaseNotificationBridge
       Interface for Alarm purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    var AlarmBridge = (function (_super) {
        __extends(AlarmBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function AlarmBridge() {
            _super.call(this);
        }
        return AlarmBridge;
    })(BaseNotificationBridge);
    Adaptive.AlarmBridge = AlarmBridge;
    /**
       @class Adaptive.NotificationBridge
       @extends Adaptive.BaseNotificationBridge
       Interface for Managing the Notification operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var NotificationBridge = (function (_super) {
        __extends(NotificationBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function NotificationBridge() {
            _super.call(this);
        }
        return NotificationBridge;
    })(BaseNotificationBridge);
    Adaptive.NotificationBridge = NotificationBridge;
    /**
       @class Adaptive.NotificationLocalBridge
       @extends Adaptive.BaseNotificationBridge
       Interface for Managing the Local Notifications operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var NotificationLocalBridge = (function (_super) {
        __extends(NotificationLocalBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function NotificationLocalBridge() {
            _super.call(this);
        }
        return NotificationLocalBridge;
    })(BaseNotificationBridge);
    Adaptive.NotificationLocalBridge = NotificationLocalBridge;
    /**
       @class Adaptive.VibrationBridge
       @extends Adaptive.BaseNotificationBridge
       Interface for Managing the Vibration operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var VibrationBridge = (function (_super) {
        __extends(VibrationBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function VibrationBridge() {
            _super.call(this);
        }
        return VibrationBridge;
    })(BaseNotificationBridge);
    Adaptive.VibrationBridge = VibrationBridge;
    /**
       @class Adaptive.CalendarBridge
       @extends Adaptive.BasePIMBridge
       Interface for Managing the Calendar operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var CalendarBridge = (function (_super) {
        __extends(CalendarBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function CalendarBridge() {
            _super.call(this);
        }
        return CalendarBridge;
    })(BasePIMBridge);
    Adaptive.CalendarBridge = CalendarBridge;
    /**
       @class Adaptive.ContactBridge
       @extends Adaptive.BasePIMBridge
       Interface for Managing the Contact operations

       @author Francisco Javier Martin Bueno
       @since v2.0
    */
    var ContactBridge = (function (_super) {
        __extends(ContactBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function ContactBridge() {
            _super.call(this);
        }
        /**
           @method
           Get all the details of a contact according to its id

           @param {Adaptive.ContactUid} contact contact  id to search for
           @param {Adaptive.ContactResultCallback} callback callback called for return
           @since v2.0
        */
        ContactBridge.prototype.getContact = function (contact, callback) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(contact));
            var apiRequest = new APIRequest("IContact", "getContact", arParams, callback.getId());
            postRequestCallback(apiRequest, callback, Adaptive.registeredContactResultCallback);
        };
        /**
           @method
           Get the contact photo

           @param {Adaptive.ContactUid} contact contact  id to search for
           @param {Adaptive.ContactPhotoResultCallback} callback callback called for return
           @since v2.0
        */
        ContactBridge.prototype.getContactPhoto = function (contact, callback) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(contact));
            var apiRequest = new APIRequest("IContact", "getContactPhoto", arParams, callback.getId());
            postRequestCallback(apiRequest, callback, Adaptive.registeredContactPhotoResultCallback);
        };
        /**
           @method
           Get all contacts

           @param {Adaptive.ContactResultCallback} callback callback called for return
           @since v2.0
        */
        ContactBridge.prototype.getContacts = function (callback) {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("IContact", "getContacts", arParams, callback.getId());
            postRequestCallback(apiRequest, callback, Adaptive.registeredContactResultCallback);
        };
        /**
           @method
           Get marked fields of all contacts

           @param {Adaptive.ContactResultCallback} callback callback called for return
           @param {Adaptive.IContactFieldGroup[]} fields fields   to get for each Contact
           @since v2.0
        */
        ContactBridge.prototype.getContactsForFields = function (callback, fields) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(fields));
            var apiRequest = new APIRequest("IContact", "getContactsForFields", arParams, callback.getId());
            postRequestCallback(apiRequest, callback, Adaptive.registeredContactResultCallback);
        };
        /**
           @method
           Get marked fields of all contacts according to a filter

           @param {Adaptive.ContactResultCallback} callback callback called for return
           @param {Adaptive.IContactFieldGroup[]} fields fields   to get for each Contact
           @param {Adaptive.IContactFilter[]} filter filter   to search for
           @since v2.0
        */
        ContactBridge.prototype.getContactsWithFilter = function (callback, fields, filter) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(fields));
            arParams.push(JSON.stringify(filter));
            var apiRequest = new APIRequest("IContact", "getContactsWithFilter", arParams, callback.getId());
            postRequestCallback(apiRequest, callback, Adaptive.registeredContactResultCallback);
        };
        /**
           @method
           Search contacts according to a term and send it to the callback

           @param {string} term term     string to search
           @param {Adaptive.ContactResultCallback} callback callback called for return
           @since v2.0
        */
        ContactBridge.prototype.searchContacts = function (term, callback) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(term));
            var apiRequest = new APIRequest("IContact", "searchContacts", arParams, callback.getId());
            postRequestCallback(apiRequest, callback, Adaptive.registeredContactResultCallback);
        };
        /**
           @method
           Search contacts according to a term with a filter and send it to the callback

           @param {string} term term     string to search
           @param {Adaptive.ContactResultCallback} callback callback called for return
           @param {Adaptive.IContactFilter[]} filter filter   to search for
           @since v2.0
        */
        ContactBridge.prototype.searchContactsWithFilter = function (term, callback, filter) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(term));
            arParams.push(JSON.stringify(filter));
            var apiRequest = new APIRequest("IContact", "searchContactsWithFilter", arParams, callback.getId());
            postRequestCallback(apiRequest, callback, Adaptive.registeredContactResultCallback);
        };
        /**
           @method
           Set the contact photo

           @param {Adaptive.ContactUid} contact contact  id to assign the photo
           @param {number[]} pngImage pngImage photo as byte array
           @return {boolean} true if set is successful;false otherwise
           @since v2.0
        */
        ContactBridge.prototype.setContactPhoto = function (contact, pngImage) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(contact));
            arParams.push(JSON.stringify(pngImage));
            var apiRequest = new APIRequest("IContact", "setContactPhoto", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = false;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = JSON.parse(apiResponse.getResponse());
            }
            return response;
        };
        return ContactBridge;
    })(BasePIMBridge);
    Adaptive.ContactBridge = ContactBridge;
    /**
       @class Adaptive.MailBridge
       @extends Adaptive.BasePIMBridge
       Interface for Managing the Mail operations

       @author Francisco Javier Martin Bueno
       @since v2.0
    */
    var MailBridge = (function (_super) {
        __extends(MailBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function MailBridge() {
            _super.call(this);
        }
        /**
           @method
           Send an Email

           @param {Adaptive.Email} data data     Payload of the email
           @param {Adaptive.MessagingCallback} callback callback Result callback of the operation
           @since v2.0
        */
        MailBridge.prototype.sendEmail = function (data, callback) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(data));
            var apiRequest = new APIRequest("IMail", "sendEmail", arParams, callback.getId());
            postRequestCallback(apiRequest, callback, Adaptive.registeredMessagingCallback);
        };
        return MailBridge;
    })(BasePIMBridge);
    Adaptive.MailBridge = MailBridge;
    /**
       @class Adaptive.MessagingBridge
       @extends Adaptive.BasePIMBridge
       Interface for Managing the Messaging operations

       @author Francisco Javier Martin Bueno
       @since v2.0
    */
    var MessagingBridge = (function (_super) {
        __extends(MessagingBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function MessagingBridge() {
            _super.call(this);
        }
        /**
           @method
           Send text SMS

           @param {string} number number   to send
           @param {string} text text     to send
           @param {Adaptive.MessagingCallback} callback callback with the result
           @since v2.0
        */
        MessagingBridge.prototype.sendSMS = function (number, text, callback) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(number));
            arParams.push(JSON.stringify(text));
            var apiRequest = new APIRequest("IMessaging", "sendSMS", arParams, callback.getId());
            postRequestCallback(apiRequest, callback, Adaptive.registeredMessagingCallback);
        };
        return MessagingBridge;
    })(BasePIMBridge);
    Adaptive.MessagingBridge = MessagingBridge;
    /**
       @class Adaptive.BarcodeBridge
       @extends Adaptive.BaseReaderBridge
       Interface for Barcode Reading purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    var BarcodeBridge = (function (_super) {
        __extends(BarcodeBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function BarcodeBridge() {
            _super.call(this);
        }
        return BarcodeBridge;
    })(BaseReaderBridge);
    Adaptive.BarcodeBridge = BarcodeBridge;
    /**
       @class Adaptive.NFCBridge
       @extends Adaptive.BaseReaderBridge
       Interface for Managing the NFC operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var NFCBridge = (function (_super) {
        __extends(NFCBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function NFCBridge() {
            _super.call(this);
        }
        return NFCBridge;
    })(BaseReaderBridge);
    Adaptive.NFCBridge = NFCBridge;
    /**
       @class Adaptive.OCRBridge
       @extends Adaptive.BaseReaderBridge
       Interface for Managing the OCR operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var OCRBridge = (function (_super) {
        __extends(OCRBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function OCRBridge() {
            _super.call(this);
        }
        return OCRBridge;
    })(BaseReaderBridge);
    Adaptive.OCRBridge = OCRBridge;
    /**
       @class Adaptive.QRCodeBridge
       @extends Adaptive.BaseReaderBridge
       Interface for Managing the QR Code operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var QRCodeBridge = (function (_super) {
        __extends(QRCodeBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function QRCodeBridge() {
            _super.call(this);
        }
        return QRCodeBridge;
    })(BaseReaderBridge);
    Adaptive.QRCodeBridge = QRCodeBridge;
    /**
       @class Adaptive.OAuthBridge
       @extends Adaptive.BaseSecurityBridge
       Interface for Managing the OAuth operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var OAuthBridge = (function (_super) {
        __extends(OAuthBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function OAuthBridge() {
            _super.call(this);
        }
        return OAuthBridge;
    })(BaseSecurityBridge);
    Adaptive.OAuthBridge = OAuthBridge;
    /**
       @class Adaptive.OpenIdBridge
       @extends Adaptive.BaseSecurityBridge
       Interface for Managing the OpenID operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var OpenIdBridge = (function (_super) {
        __extends(OpenIdBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function OpenIdBridge() {
            _super.call(this);
        }
        return OpenIdBridge;
    })(BaseSecurityBridge);
    Adaptive.OpenIdBridge = OpenIdBridge;
    /**
       @class Adaptive.SecurityBridge
       @extends Adaptive.BaseSecurityBridge
       Interface for Managing the Security operations

       @author Aryslan
       @since v2.0
    */
    var SecurityBridge = (function (_super) {
        __extends(SecurityBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function SecurityBridge() {
            _super.call(this);
        }
        /**
           @method
           Deletes from the device internal storage the entry/entries containing the specified key names.

           @param {string[]} keys keys             Array with the key names to delete.
           @param {string} publicAccessName publicAccessName The name of the shared internal storage object (if needed).
           @param {Adaptive.SecurityResultCallback} callback callback         callback to be executed upon function result.
           @since v2.0
        */
        SecurityBridge.prototype.deleteSecureKeyValuePairs = function (keys, publicAccessName, callback) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(keys));
            arParams.push(JSON.stringify(publicAccessName));
            var apiRequest = new APIRequest("ISecurity", "deleteSecureKeyValuePairs", arParams, callback.getId());
            postRequestCallback(apiRequest, callback, Adaptive.registeredSecurityResultCallback);
        };
        /**
           @method
           Retrieves from the device internal storage the entry/entries containing the specified key names.

           @param {string[]} keys keys             Array with the key names to retrieve.
           @param {string} publicAccessName publicAccessName The name of the shared internal storage object (if needed).
           @param {Adaptive.SecurityResultCallback} callback callback         callback to be executed upon function result.
           @since v2.0
        */
        SecurityBridge.prototype.getSecureKeyValuePairs = function (keys, publicAccessName, callback) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(keys));
            arParams.push(JSON.stringify(publicAccessName));
            var apiRequest = new APIRequest("ISecurity", "getSecureKeyValuePairs", arParams, callback.getId());
            postRequestCallback(apiRequest, callback, Adaptive.registeredSecurityResultCallback);
        };
        /**
           @method
           Returns if the device has been modified in anyhow

           @return {boolean} true if the device has been modified; false otherwise
           @since v2.0
        */
        SecurityBridge.prototype.isDeviceModified = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("ISecurity", "isDeviceModified", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = false;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = JSON.parse(apiResponse.getResponse());
            }
            return response;
        };
        /**
           @method
           Stores in the device internal storage the specified item/s.

           @param {Adaptive.SecureKeyPair[]} keyValues keyValues        Array containing the items to store on the device internal memory.
           @param {string} publicAccessName publicAccessName The name of the shared internal storage object (if needed).
           @param {Adaptive.SecurityResultCallback} callback callback         callback to be executed upon function result.
           @since v2.0
        */
        SecurityBridge.prototype.setSecureKeyValuePairs = function (keyValues, publicAccessName, callback) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(keyValues));
            arParams.push(JSON.stringify(publicAccessName));
            var apiRequest = new APIRequest("ISecurity", "setSecureKeyValuePairs", arParams, callback.getId());
            postRequestCallback(apiRequest, callback, Adaptive.registeredSecurityResultCallback);
        };
        return SecurityBridge;
    })(BaseSecurityBridge);
    Adaptive.SecurityBridge = SecurityBridge;
    /**
       @class Adaptive.AccelerationBridge
       @extends Adaptive.BaseSensorBridge
       Interface defining methods about the acceleration sensor

       @author Carlos Lozano Diez
       @since v2.0
    */
    var AccelerationBridge = (function (_super) {
        __extends(AccelerationBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function AccelerationBridge() {
            _super.call(this);
        }
        /**
           @method
           Register a new listener that will receive acceleration events.

           @param {Adaptive.AccelerationListener} listener listener to be registered.
           @since v2.0
        */
        AccelerationBridge.prototype.addAccelerationListener = function (listener) {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("IAcceleration", "addAccelerationListener", arParams, listener.getId());
            postRequestListener(apiRequest, listener, Adaptive.registeredAccelerationListener);
        };
        /**
           @method
           De-registers an existing listener from receiving acceleration events.

           @param {Adaptive.AccelerationListener} listener listener to be registered.
           @since v2.0
        */
        AccelerationBridge.prototype.removeAccelerationListener = function (listener) {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("IAcceleration", "removeAccelerationListener", arParams, listener.getId());
            postRequestListener(apiRequest, listener, Adaptive.registeredAccelerationListener);
        };
        /**
           @method
           Removed all existing listeners from receiving acceleration events.

           @since v2.0
        */
        AccelerationBridge.prototype.removeAccelerationListeners = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("IAcceleration", "removeAccelerationListeners", arParams, -1);
            postRequestListener(apiRequest, null, Adaptive.registeredAccelerationListener);
        };
        return AccelerationBridge;
    })(BaseSensorBridge);
    Adaptive.AccelerationBridge = AccelerationBridge;
    /**
       @class Adaptive.AmbientLightBridge
       @extends Adaptive.BaseSensorBridge
       Interface for managinf the Ambient Light

       @author Carlos Lozano Diez
       @since v2.0
    */
    var AmbientLightBridge = (function (_super) {
        __extends(AmbientLightBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function AmbientLightBridge() {
            _super.call(this);
        }
        return AmbientLightBridge;
    })(BaseSensorBridge);
    Adaptive.AmbientLightBridge = AmbientLightBridge;
    /**
       @class Adaptive.BarometerBridge
       @extends Adaptive.BaseSensorBridge
       Interface for Barometer management purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    var BarometerBridge = (function (_super) {
        __extends(BarometerBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function BarometerBridge() {
            _super.call(this);
        }
        return BarometerBridge;
    })(BaseSensorBridge);
    Adaptive.BarometerBridge = BarometerBridge;
    /**
       @class Adaptive.GeolocationBridge
       @extends Adaptive.BaseSensorBridge
       Interface for Managing the Geolocation operations

       @author Francisco Javier Martin Bueno
       @since v2.0
    */
    var GeolocationBridge = (function (_super) {
        __extends(GeolocationBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function GeolocationBridge() {
            _super.call(this);
        }
        /**
           @method
           Register a new listener that will receive geolocation events.

           @param {Adaptive.GeolocationListener} listener listener to be registered.
           @since v2.0
        */
        GeolocationBridge.prototype.addGeolocationListener = function (listener) {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("IGeolocation", "addGeolocationListener", arParams, listener.getId());
            postRequestListener(apiRequest, listener, Adaptive.registeredGeolocationListener);
        };
        /**
           @method
           De-registers an existing listener from receiving geolocation events.

           @param {Adaptive.GeolocationListener} listener listener to be registered.
           @since v2.0
        */
        GeolocationBridge.prototype.removeGeolocationListener = function (listener) {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("IGeolocation", "removeGeolocationListener", arParams, listener.getId());
            postRequestListener(apiRequest, listener, Adaptive.registeredGeolocationListener);
        };
        /**
           @method
           Removed all existing listeners from receiving geolocation events.

           @since v2.0
        */
        GeolocationBridge.prototype.removeGeolocationListeners = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("IGeolocation", "removeGeolocationListeners", arParams, -1);
            postRequestListener(apiRequest, null, Adaptive.registeredGeolocationListener);
        };
        return GeolocationBridge;
    })(BaseSensorBridge);
    Adaptive.GeolocationBridge = GeolocationBridge;
    /**
       @class Adaptive.GyroscopeBridge
       @extends Adaptive.BaseSensorBridge
       Interface for Managing the Giroscope operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var GyroscopeBridge = (function (_super) {
        __extends(GyroscopeBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function GyroscopeBridge() {
            _super.call(this);
        }
        return GyroscopeBridge;
    })(BaseSensorBridge);
    Adaptive.GyroscopeBridge = GyroscopeBridge;
    /**
       @class Adaptive.MagnetometerBridge
       @extends Adaptive.BaseSensorBridge
       Interface for Managing the Magnetometer operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var MagnetometerBridge = (function (_super) {
        __extends(MagnetometerBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function MagnetometerBridge() {
            _super.call(this);
        }
        return MagnetometerBridge;
    })(BaseSensorBridge);
    Adaptive.MagnetometerBridge = MagnetometerBridge;
    /**
       @class Adaptive.ProximityBridge
       @extends Adaptive.BaseSensorBridge
       Interface for Managing the Proximity operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var ProximityBridge = (function (_super) {
        __extends(ProximityBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function ProximityBridge() {
            _super.call(this);
        }
        return ProximityBridge;
    })(BaseSensorBridge);
    Adaptive.ProximityBridge = ProximityBridge;
    /**
       @class Adaptive.FacebookBridge
       @extends Adaptive.BaseSocialBridge
       Interface for Managing the Facebook operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var FacebookBridge = (function (_super) {
        __extends(FacebookBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function FacebookBridge() {
            _super.call(this);
        }
        return FacebookBridge;
    })(BaseSocialBridge);
    Adaptive.FacebookBridge = FacebookBridge;
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
    })(BaseSocialBridge);
    Adaptive.GooglePlusBridge = GooglePlusBridge;
    /**
       @class Adaptive.LinkedInBridge
       @extends Adaptive.BaseSocialBridge
       Interface for Managing the Linkedin operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var LinkedInBridge = (function (_super) {
        __extends(LinkedInBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function LinkedInBridge() {
            _super.call(this);
        }
        return LinkedInBridge;
    })(BaseSocialBridge);
    Adaptive.LinkedInBridge = LinkedInBridge;
    /**
       @class Adaptive.RSSBridge
       @extends Adaptive.BaseSocialBridge
       Interface for Managing the RSS operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var RSSBridge = (function (_super) {
        __extends(RSSBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function RSSBridge() {
            _super.call(this);
        }
        return RSSBridge;
    })(BaseSocialBridge);
    Adaptive.RSSBridge = RSSBridge;
    /**
       @class Adaptive.TwitterBridge
       @extends Adaptive.BaseSocialBridge
       Interface for Managing the Twitter operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var TwitterBridge = (function (_super) {
        __extends(TwitterBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function TwitterBridge() {
            _super.call(this);
        }
        return TwitterBridge;
    })(BaseSocialBridge);
    Adaptive.TwitterBridge = TwitterBridge;
    /**
       @class Adaptive.CapabilitiesBridge
       @extends Adaptive.BaseSystemBridge
       Interface for testing the Capabilities operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var CapabilitiesBridge = (function (_super) {
        __extends(CapabilitiesBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function CapabilitiesBridge() {
            _super.call(this);
        }
        /**
           @method
           Obtains the default orientation of the device/display. If no default orientation is available on
the platform, this method will return the current orientation. To capture device or display orientation
changes please use the IDevice and IDisplay functions and listeners API respectively.

           @return {Adaptive.ICapabilitiesOrientation} The default orientation for the device/display.
           @since v2.0.5
        */
        CapabilitiesBridge.prototype.getOrientationDefault = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("ICapabilities", "getOrientationDefault", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = ICapabilitiesOrientation.toObject(JSON.parse(apiResponse.getResponse()));
            }
            return response;
        };
        /**
           @method
           Provides the device/display orientations supported by the platform. A platform will usually
support at least one orientation. This is usually PortaitUp.

           @return {Adaptive.ICapabilitiesOrientation[]} The orientations supported by the device/display of the platform.
           @since v2.0.5
        */
        CapabilitiesBridge.prototype.getOrientationsSupported = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("ICapabilities", "getOrientationsSupported", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = new Array();
                var responseArray = JSON.parse(apiResponse.getResponse());
                for (var i = 0; i < responseArray.length; i++) {
                    response.push(ICapabilitiesOrientation.toObject(responseArray[i]));
                }
            }
            return response;
        };
        /**
           @method
           Determines whether a specific hardware button is supported for interaction.

           @param {Adaptive.ICapabilitiesButton} type type Type of feature to check.
           @return {boolean} true is supported, false otherwise.
           @since v2.0
        */
        CapabilitiesBridge.prototype.hasButtonSupport = function (type) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(type));
            var apiRequest = new APIRequest("ICapabilities", "hasButtonSupport", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = false;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = JSON.parse(apiResponse.getResponse());
            }
            return response;
        };
        /**
           @method
           Determines whether a specific Communication capability is supported by
the device.

           @param {Adaptive.ICapabilitiesCommunication} type type Type of feature to check.
           @return {boolean} true if supported, false otherwise.
           @since v2.0
        */
        CapabilitiesBridge.prototype.hasCommunicationSupport = function (type) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(type));
            var apiRequest = new APIRequest("ICapabilities", "hasCommunicationSupport", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = false;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = JSON.parse(apiResponse.getResponse());
            }
            return response;
        };
        /**
           @method
           Determines whether a specific Data capability is supported by the device.

           @param {Adaptive.ICapabilitiesData} type type Type of feature to check.
           @return {boolean} true if supported, false otherwise.
           @since v2.0
        */
        CapabilitiesBridge.prototype.hasDataSupport = function (type) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(type));
            var apiRequest = new APIRequest("ICapabilities", "hasDataSupport", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = false;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = JSON.parse(apiResponse.getResponse());
            }
            return response;
        };
        /**
           @method
           Determines whether a specific Media capability is supported by the
device.

           @param {Adaptive.ICapabilitiesMedia} type type Type of feature to check.
           @return {boolean} true if supported, false otherwise.
           @since v2.0
        */
        CapabilitiesBridge.prototype.hasMediaSupport = function (type) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(type));
            var apiRequest = new APIRequest("ICapabilities", "hasMediaSupport", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = false;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = JSON.parse(apiResponse.getResponse());
            }
            return response;
        };
        /**
           @method
           Determines whether a specific Net capability is supported by the device.

           @param {Adaptive.ICapabilitiesNet} type type Type of feature to check.
           @return {boolean} true if supported, false otherwise.
           @since v2.0
        */
        CapabilitiesBridge.prototype.hasNetSupport = function (type) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(type));
            var apiRequest = new APIRequest("ICapabilities", "hasNetSupport", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = false;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = JSON.parse(apiResponse.getResponse());
            }
            return response;
        };
        /**
           @method
           Determines whether a specific Notification capability is supported by the
device.

           @param {Adaptive.ICapabilitiesNotification} type type Type of feature to check.
           @return {boolean} true if supported, false otherwise.
           @since v2.0
        */
        CapabilitiesBridge.prototype.hasNotificationSupport = function (type) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(type));
            var apiRequest = new APIRequest("ICapabilities", "hasNotificationSupport", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = false;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = JSON.parse(apiResponse.getResponse());
            }
            return response;
        };
        /**
           @method
           Determines whether the device/display supports a given orientation.

           @param {Adaptive.ICapabilitiesOrientation} orientation orientation Orientation type.
           @return {boolean} True if the given orientation is supported, false otherwise.
           @since v2.0.5
        */
        CapabilitiesBridge.prototype.hasOrientationSupport = function (orientation) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(orientation));
            var apiRequest = new APIRequest("ICapabilities", "hasOrientationSupport", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = false;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = JSON.parse(apiResponse.getResponse());
            }
            return response;
        };
        /**
           @method
           Determines whether a specific Sensor capability is supported by the
device.

           @param {Adaptive.ICapabilitiesSensor} type type Type of feature to check.
           @return {boolean} true if supported, false otherwise.
           @since v2.0
        */
        CapabilitiesBridge.prototype.hasSensorSupport = function (type) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(type));
            var apiRequest = new APIRequest("ICapabilities", "hasSensorSupport", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = false;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = JSON.parse(apiResponse.getResponse());
            }
            return response;
        };
        return CapabilitiesBridge;
    })(BaseSystemBridge);
    Adaptive.CapabilitiesBridge = CapabilitiesBridge;
    /**
       @class Adaptive.DeviceBridge
       @extends Adaptive.BaseSystemBridge
       Interface for Managing the Device operations

       @author Francisco Javier Martin Bueno
       @since v2.0
    */
    var DeviceBridge = (function (_super) {
        __extends(DeviceBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function DeviceBridge() {
            _super.call(this);
        }
        /**
           @method
           Register a new listener that will receive button events.

           @param {Adaptive.ButtonListener} listener listener to be registered.
           @since v2.0
        */
        DeviceBridge.prototype.addButtonListener = function (listener) {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("IDevice", "addButtonListener", arParams, listener.getId());
            postRequestListener(apiRequest, listener, Adaptive.registeredButtonListener);
        };
        /**
           @method
           Add a listener to start receiving device orientation change events.

           @param {Adaptive.DeviceOrientationListener} listener listener Listener to add to receive orientation change events.
           @since v2.0.5
        */
        DeviceBridge.prototype.addDeviceOrientationListener = function (listener) {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("IDevice", "addDeviceOrientationListener", arParams, listener.getId());
            postRequestListener(apiRequest, listener, Adaptive.registeredDeviceOrientationListener);
        };
        /**
           @method
           Returns the device information for the current device executing the runtime.

           @return {Adaptive.DeviceInfo} DeviceInfo for the current device.
           @since v2.0
        */
        DeviceBridge.prototype.getDeviceInfo = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("IDevice", "getDeviceInfo", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = DeviceInfo.toObject(JSON.parse(apiResponse.getResponse()));
            }
            return response;
        };
        /**
           @method
           Gets the current Locale for the device.

           @return {Adaptive.Locale} The current Locale information.
           @since v2.0
        */
        DeviceBridge.prototype.getLocaleCurrent = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("IDevice", "getLocaleCurrent", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = Locale.toObject(JSON.parse(apiResponse.getResponse()));
            }
            return response;
        };
        /**
           @method
           Returns the current orientation of the device. Please note that this may be different from the orientation
of the display. For display orientation, use the IDisplay APIs.

           @return {Adaptive.ICapabilitiesOrientation} The current orientation of the device.
           @since v2.0.5
        */
        DeviceBridge.prototype.getOrientationCurrent = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("IDevice", "getOrientationCurrent", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = ICapabilitiesOrientation.toObject(JSON.parse(apiResponse.getResponse()));
            }
            return response;
        };
        /**
           @method
           De-registers an existing listener from receiving button events.

           @param {Adaptive.ButtonListener} listener listener to be removed.
           @since v2.0
        */
        DeviceBridge.prototype.removeButtonListener = function (listener) {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("IDevice", "removeButtonListener", arParams, listener.getId());
            postRequestListener(apiRequest, listener, Adaptive.registeredButtonListener);
        };
        /**
           @method
           Removed all existing listeners from receiving button events.

           @since v2.0
        */
        DeviceBridge.prototype.removeButtonListeners = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("IDevice", "removeButtonListeners", arParams, -1);
            postRequestListener(apiRequest, null, Adaptive.registeredButtonListener);
        };
        /**
           @method
           Remove a listener to stop receiving device orientation change events.

           @param {Adaptive.DeviceOrientationListener} listener listener Listener to remove from receiving orientation change events.
           @since v2.0.5
        */
        DeviceBridge.prototype.removeDeviceOrientationListener = function (listener) {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("IDevice", "removeDeviceOrientationListener", arParams, listener.getId());
            postRequestListener(apiRequest, listener, Adaptive.registeredDeviceOrientationListener);
        };
        /**
           @method
           Remove all listeners receiving device orientation events.

           @since v2.0.5
        */
        DeviceBridge.prototype.removeDeviceOrientationListeners = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("IDevice", "removeDeviceOrientationListeners", arParams, -1);
            postRequestListener(apiRequest, null, Adaptive.registeredDeviceOrientationListener);
        };
        return DeviceBridge;
    })(BaseSystemBridge);
    Adaptive.DeviceBridge = DeviceBridge;
    /**
       @class Adaptive.DisplayBridge
       @extends Adaptive.BaseSystemBridge
       Interface for Managing the Display operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var DisplayBridge = (function (_super) {
        __extends(DisplayBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function DisplayBridge() {
            _super.call(this);
        }
        /**
           @method
           Add a listener to start receiving display orientation change events.

           @param {Adaptive.DisplayOrientationListener} listener listener Listener to add to receive orientation change events.
           @since v2.0.5
        */
        DisplayBridge.prototype.addDisplayOrientationListener = function (listener) {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("IDisplay", "addDisplayOrientationListener", arParams, listener.getId());
            postRequestListener(apiRequest, listener, Adaptive.registeredDisplayOrientationListener);
        };
        /**
           @method
           Returns the current orientation of the display. Please note that this may be different from the orientation
of the device. For device orientation, use the IDevice APIs.

           @return {Adaptive.ICapabilitiesOrientation} The current orientation of the display.
           @since v2.0.5
        */
        DisplayBridge.prototype.getOrientationCurrent = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("IDisplay", "getOrientationCurrent", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = ICapabilitiesOrientation.toObject(JSON.parse(apiResponse.getResponse()));
            }
            return response;
        };
        /**
           @method
           Remove a listener to stop receiving display orientation change events.

           @param {Adaptive.DisplayOrientationListener} listener listener Listener to remove from receiving orientation change events.
           @since v2.0.5
        */
        DisplayBridge.prototype.removeDisplayOrientationListener = function (listener) {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("IDisplay", "removeDisplayOrientationListener", arParams, listener.getId());
            postRequestListener(apiRequest, listener, Adaptive.registeredDisplayOrientationListener);
        };
        /**
           @method
           Remove all listeners receiving display orientation events.

           @since v2.0.5
        */
        DisplayBridge.prototype.removeDisplayOrientationListeners = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("IDisplay", "removeDisplayOrientationListeners", arParams, -1);
            postRequestListener(apiRequest, null, Adaptive.registeredDisplayOrientationListener);
        };
        return DisplayBridge;
    })(BaseSystemBridge);
    Adaptive.DisplayBridge = DisplayBridge;
    /**
       @class Adaptive.OSBridge
       @extends Adaptive.BaseSystemBridge
       Interface for Managing the OS operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var OSBridge = (function (_super) {
        __extends(OSBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function OSBridge() {
            _super.call(this);
        }
        /**
           @method
           Returns the OSInfo for the current operating system.

           @return {Adaptive.OSInfo} OSInfo with name, version and vendor of the OS.
           @since v2.0
        */
        OSBridge.prototype.getOSInfo = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("IOS", "getOSInfo", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = null;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = OSInfo.toObject(JSON.parse(apiResponse.getResponse()));
            }
            return response;
        };
        return OSBridge;
    })(BaseSystemBridge);
    Adaptive.OSBridge = OSBridge;
    /**
       @class Adaptive.RuntimeBridge
       @extends Adaptive.BaseSystemBridge
       Interface for Managing the Runtime operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var RuntimeBridge = (function (_super) {
        __extends(RuntimeBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function RuntimeBridge() {
            _super.call(this);
        }
        /**
           @method
           Dismiss the current Application

           @since v2.0
        */
        RuntimeBridge.prototype.dismissApplication = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("IRuntime", "dismissApplication", arParams, -1 /* = synchronous call */);
            postRequest(apiRequest);
        };
        /**
           @method
           Whether the application dismiss the splash screen successfully or not

           @return {boolean} true if the application has dismissed the splash screen;false otherwise
           @since v2.0
        */
        RuntimeBridge.prototype.dismissSplashScreen = function () {
            // Create and populate API request.
            var arParams = [];
            var apiRequest = new APIRequest("IRuntime", "dismissSplashScreen", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = false;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = JSON.parse(apiResponse.getResponse());
            }
            return response;
        };
        return RuntimeBridge;
    })(BaseSystemBridge);
    Adaptive.RuntimeBridge = RuntimeBridge;
    /**
       @class Adaptive.BrowserBridge
       @extends Adaptive.BaseUIBridge
       Interface for Managing the browser operations

       @author Francisco Javier Martin Bueno
       @since v2.0
    */
    var BrowserBridge = (function (_super) {
        __extends(BrowserBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function BrowserBridge() {
            _super.call(this);
        }
        /**
           @method
           Method for opening a URL like a link in the native default browser

           @param {string} url url Url to open
           @return {boolean} The result of the operation
           @since v2.0
        */
        BrowserBridge.prototype.openExtenalBrowser = function (url) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(url));
            var apiRequest = new APIRequest("IBrowser", "openExtenalBrowser", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = false;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = JSON.parse(apiResponse.getResponse());
            }
            return response;
        };
        /**
           @method
           Method for opening a browser embedded into the application

           @param {string} url url            Url to open
           @param {string} title title          Title of the Navigation bar
           @param {string} backButtonText backButtonText Title of the Back button bar
           @return {boolean} The result of the operation
           @since v2.0
        */
        BrowserBridge.prototype.openInternalBrowser = function (url, title, backButtonText) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(url));
            arParams.push(JSON.stringify(title));
            arParams.push(JSON.stringify(backButtonText));
            var apiRequest = new APIRequest("IBrowser", "openInternalBrowser", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = false;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = JSON.parse(apiResponse.getResponse());
            }
            return response;
        };
        /**
           @method
           Method for opening a browser embedded into the application in a modal window

           @param {string} url url            Url to open
           @param {string} title title          Title of the Navigation bar
           @param {string} backButtonText backButtonText Title of the Back button bar
           @return {boolean} The result of the operation
           @since v2.0
        */
        BrowserBridge.prototype.openInternalBrowserModal = function (url, title, backButtonText) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(url));
            arParams.push(JSON.stringify(title));
            arParams.push(JSON.stringify(backButtonText));
            var apiRequest = new APIRequest("IBrowser", "openInternalBrowserModal", arParams, -1 /* = synchronous call */);
            var apiResponse = postRequest(apiRequest);
            // Prepare response.
            var response = false;
            // Check response.
            if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                response = JSON.parse(apiResponse.getResponse());
            }
            return response;
        };
        return BrowserBridge;
    })(BaseUIBridge);
    Adaptive.BrowserBridge = BrowserBridge;
    /**
       @class Adaptive.DesktopBridge
       @extends Adaptive.BaseUIBridge
       Interface for Managing the Desktop operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var DesktopBridge = (function (_super) {
        __extends(DesktopBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function DesktopBridge() {
            _super.call(this);
        }
        return DesktopBridge;
    })(BaseUIBridge);
    Adaptive.DesktopBridge = DesktopBridge;
    /**
       @class Adaptive.MapBridge
       @extends Adaptive.BaseUIBridge
       Interface for Managing the Map operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var MapBridge = (function (_super) {
        __extends(MapBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function MapBridge() {
            _super.call(this);
        }
        return MapBridge;
    })(BaseUIBridge);
    Adaptive.MapBridge = MapBridge;
    /**
       @class Adaptive.UIBridge
       @extends Adaptive.BaseUIBridge
       Interface for Managing the UI operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var UIBridge = (function (_super) {
        __extends(UIBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function UIBridge() {
            _super.call(this);
        }
        return UIBridge;
    })(BaseUIBridge);
    Adaptive.UIBridge = UIBridge;
    /**
       @class Adaptive.CompressionBridge
       @extends Adaptive.BaseUtilBridge
       Interface for Managing the Compression operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var CompressionBridge = (function (_super) {
        __extends(CompressionBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function CompressionBridge() {
            _super.call(this);
        }
        return CompressionBridge;
    })(BaseUtilBridge);
    Adaptive.CompressionBridge = CompressionBridge;
    /**
       @class Adaptive.ConcurrentBridge
       @extends Adaptive.BaseUtilBridge
       Interface for Managing the Concurrent operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var ConcurrentBridge = (function (_super) {
        __extends(ConcurrentBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function ConcurrentBridge() {
            _super.call(this);
        }
        return ConcurrentBridge;
    })(BaseUtilBridge);
    Adaptive.ConcurrentBridge = ConcurrentBridge;
    /**
       @class Adaptive.CryptoBridge
       @extends Adaptive.BaseUtilBridge
       Interface for Managing the Cloud operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var CryptoBridge = (function (_super) {
        __extends(CryptoBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function CryptoBridge() {
            _super.call(this);
        }
        return CryptoBridge;
    })(BaseUtilBridge);
    Adaptive.CryptoBridge = CryptoBridge;
    /**
       @class Adaptive.LoggingBridge
       @extends Adaptive.BaseUtilBridge
       Interface for Managing the Logging operations

       @author Ferran Vila Conesa
       @since v2.0
    */
    var LoggingBridge = (function (_super) {
        __extends(LoggingBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function LoggingBridge() {
            _super.call(this);
        }
        /**
           Logs the given message, with the given log level if specified, to the standard platform/environment.

           @param level   Log level
           @param message Message to be logged
           @since v2.0
        */
        LoggingBridge.prototype.logLevelMessage = function (level, message) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(level));
            arParams.push(JSON.stringify(message));
            var apiRequest = new APIRequest("ILogging", "logLevelMessage", arParams, -1 /* = synchronous call */);
            postRequest(apiRequest);
        };
        /**
           Logs the given message, with the given log level if specified, to the standard platform/environment.

           @param level    Log level
           @param category Category/tag name to identify/filter the log.
           @param message  Message to be logged
           @since v2.0
        */
        LoggingBridge.prototype.logLevelCategoryMessage = function (level, category, message) {
            // Create and populate API request.
            var arParams = [];
            arParams.push(JSON.stringify(level));
            arParams.push(JSON.stringify(category));
            arParams.push(JSON.stringify(message));
            var apiRequest = new APIRequest("ILogging", "logLevelCategoryMessage", arParams, -1 /* = synchronous call */);
            postRequest(apiRequest);
        };
        return LoggingBridge;
    })(BaseUtilBridge);
    Adaptive.LoggingBridge = LoggingBridge;
    /**
       @class Adaptive.TimerBridge
       @extends Adaptive.BaseUtilBridge
       Interface for Managing the Timer operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    var TimerBridge = (function (_super) {
        __extends(TimerBridge, _super);
        /**
           @method constructor
           Default constructor.
        */
        function TimerBridge() {
            _super.call(this);
        }
        return TimerBridge;
    })(BaseUtilBridge);
    Adaptive.TimerBridge = TimerBridge;
    /**
       @class Adaptive.AppRegistryBridge
       Interface to retrieve auto-registered service implementation references.

       @author Carlos Lozano Diez
       @since v2.0
    */
    var AppRegistryBridge = (function () {
        function AppRegistryBridge() {
        }
        /**
           @static
           @singleton
           @method
           Singleton instance of AppRegistry.
           @return {Adaptive.AppRegistryBridge}
        */
        AppRegistryBridge.getInstance = function () {
            if (AppRegistryBridge.instance === null) {
                AppRegistryBridge.instance = new AppRegistryBridge();
            }
            return AppRegistryBridge.instance;
        };
        /**
           @method
           Obtain a reference to the IAcceleration bridge.

           @return {Adaptive.AccelerationBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getAccelerationBridge = function () {
            if (AppRegistryBridge.instanceAcceleration === null) {
                AppRegistryBridge.instanceAcceleration = new AccelerationBridge();
            }
            return AppRegistryBridge.instanceAcceleration;
        };
        /**
           @method
           Obtain a reference to the IAds bridge.

           @return {Adaptive.AdsBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getAdsBridge = function () {
            if (AppRegistryBridge.instanceAds === null) {
                AppRegistryBridge.instanceAds = new AdsBridge();
            }
            return AppRegistryBridge.instanceAds;
        };
        /**
           @method
           Obtain a reference to the IAlarm bridge.

           @return {Adaptive.AlarmBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getAlarmBridge = function () {
            if (AppRegistryBridge.instanceAlarm === null) {
                AppRegistryBridge.instanceAlarm = new AlarmBridge();
            }
            return AppRegistryBridge.instanceAlarm;
        };
        /**
           @method
           Obtain a reference to the IAmbientLight bridge.

           @return {Adaptive.AmbientLightBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getAmbientLightBridge = function () {
            if (AppRegistryBridge.instanceAmbientLight === null) {
                AppRegistryBridge.instanceAmbientLight = new AmbientLightBridge();
            }
            return AppRegistryBridge.instanceAmbientLight;
        };
        /**
           @method
           Obtain a reference to the IAnalytics bridge.

           @return {Adaptive.AnalyticsBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getAnalyticsBridge = function () {
            if (AppRegistryBridge.instanceAnalytics === null) {
                AppRegistryBridge.instanceAnalytics = new AnalyticsBridge();
            }
            return AppRegistryBridge.instanceAnalytics;
        };
        /**
           @method
           Obtain a reference to the IAudio bridge.

           @return {Adaptive.AudioBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getAudioBridge = function () {
            if (AppRegistryBridge.instanceAudio === null) {
                AppRegistryBridge.instanceAudio = new AudioBridge();
            }
            return AppRegistryBridge.instanceAudio;
        };
        /**
           @method
           Obtain a reference to the IBarcode bridge.

           @return {Adaptive.BarcodeBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getBarcodeBridge = function () {
            if (AppRegistryBridge.instanceBarcode === null) {
                AppRegistryBridge.instanceBarcode = new BarcodeBridge();
            }
            return AppRegistryBridge.instanceBarcode;
        };
        /**
           @method
           Obtain a reference to the IBarometer bridge.

           @return {Adaptive.BarometerBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getBarometerBridge = function () {
            if (AppRegistryBridge.instanceBarometer === null) {
                AppRegistryBridge.instanceBarometer = new BarometerBridge();
            }
            return AppRegistryBridge.instanceBarometer;
        };
        /**
           @method
           Obtain a reference to the IBluetooth bridge.

           @return {Adaptive.BluetoothBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getBluetoothBridge = function () {
            if (AppRegistryBridge.instanceBluetooth === null) {
                AppRegistryBridge.instanceBluetooth = new BluetoothBridge();
            }
            return AppRegistryBridge.instanceBluetooth;
        };
        /**
           @method
           Obtain a reference to the IBrowser bridge.

           @return {Adaptive.BrowserBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getBrowserBridge = function () {
            if (AppRegistryBridge.instanceBrowser === null) {
                AppRegistryBridge.instanceBrowser = new BrowserBridge();
            }
            return AppRegistryBridge.instanceBrowser;
        };
        /**
           @method
           Obtain a reference to the ICalendar bridge.

           @return {Adaptive.CalendarBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getCalendarBridge = function () {
            if (AppRegistryBridge.instanceCalendar === null) {
                AppRegistryBridge.instanceCalendar = new CalendarBridge();
            }
            return AppRegistryBridge.instanceCalendar;
        };
        /**
           @method
           Obtain a reference to the ICamera bridge.

           @return {Adaptive.CameraBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getCameraBridge = function () {
            if (AppRegistryBridge.instanceCamera === null) {
                AppRegistryBridge.instanceCamera = new CameraBridge();
            }
            return AppRegistryBridge.instanceCamera;
        };
        /**
           @method
           Obtain a reference to the ICapabilities bridge.

           @return {Adaptive.CapabilitiesBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getCapabilitiesBridge = function () {
            if (AppRegistryBridge.instanceCapabilities === null) {
                AppRegistryBridge.instanceCapabilities = new CapabilitiesBridge();
            }
            return AppRegistryBridge.instanceCapabilities;
        };
        /**
           @method
           Obtain a reference to the ICloud bridge.

           @return {Adaptive.CloudBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getCloudBridge = function () {
            if (AppRegistryBridge.instanceCloud === null) {
                AppRegistryBridge.instanceCloud = new CloudBridge();
            }
            return AppRegistryBridge.instanceCloud;
        };
        /**
           @method
           Obtain a reference to the ICompression bridge.

           @return {Adaptive.CompressionBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getCompressionBridge = function () {
            if (AppRegistryBridge.instanceCompression === null) {
                AppRegistryBridge.instanceCompression = new CompressionBridge();
            }
            return AppRegistryBridge.instanceCompression;
        };
        /**
           @method
           Obtain a reference to the IConcurrent bridge.

           @return {Adaptive.ConcurrentBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getConcurrentBridge = function () {
            if (AppRegistryBridge.instanceConcurrent === null) {
                AppRegistryBridge.instanceConcurrent = new ConcurrentBridge();
            }
            return AppRegistryBridge.instanceConcurrent;
        };
        /**
           @method
           Obtain a reference to the IContact bridge.

           @return {Adaptive.ContactBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getContactBridge = function () {
            if (AppRegistryBridge.instanceContact === null) {
                AppRegistryBridge.instanceContact = new ContactBridge();
            }
            return AppRegistryBridge.instanceContact;
        };
        /**
           @method
           Obtain a reference to the ICrypto bridge.

           @return {Adaptive.CryptoBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getCryptoBridge = function () {
            if (AppRegistryBridge.instanceCrypto === null) {
                AppRegistryBridge.instanceCrypto = new CryptoBridge();
            }
            return AppRegistryBridge.instanceCrypto;
        };
        /**
           @method
           Obtain a reference to the IDataStream bridge.

           @return {Adaptive.DataStreamBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getDataStreamBridge = function () {
            if (AppRegistryBridge.instanceDataStream === null) {
                AppRegistryBridge.instanceDataStream = new DataStreamBridge();
            }
            return AppRegistryBridge.instanceDataStream;
        };
        /**
           @method
           Obtain a reference to the IDatabase bridge.

           @return {Adaptive.DatabaseBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getDatabaseBridge = function () {
            if (AppRegistryBridge.instanceDatabase === null) {
                AppRegistryBridge.instanceDatabase = new DatabaseBridge();
            }
            return AppRegistryBridge.instanceDatabase;
        };
        /**
           @method
           Obtain a reference to the IDesktop bridge.

           @return {Adaptive.DesktopBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getDesktopBridge = function () {
            if (AppRegistryBridge.instanceDesktop === null) {
                AppRegistryBridge.instanceDesktop = new DesktopBridge();
            }
            return AppRegistryBridge.instanceDesktop;
        };
        /**
           @method
           Obtain a reference to the IDevice bridge.

           @return {Adaptive.DeviceBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getDeviceBridge = function () {
            if (AppRegistryBridge.instanceDevice === null) {
                AppRegistryBridge.instanceDevice = new DeviceBridge();
            }
            return AppRegistryBridge.instanceDevice;
        };
        /**
           @method
           Obtain a reference to the IDisplay bridge.

           @return {Adaptive.DisplayBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getDisplayBridge = function () {
            if (AppRegistryBridge.instanceDisplay === null) {
                AppRegistryBridge.instanceDisplay = new DisplayBridge();
            }
            return AppRegistryBridge.instanceDisplay;
        };
        /**
           @method
           Obtain a reference to the IFacebook bridge.

           @return {Adaptive.FacebookBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getFacebookBridge = function () {
            if (AppRegistryBridge.instanceFacebook === null) {
                AppRegistryBridge.instanceFacebook = new FacebookBridge();
            }
            return AppRegistryBridge.instanceFacebook;
        };
        /**
           @method
           Obtain a reference to the IFile bridge.

           @return {Adaptive.FileBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getFileBridge = function () {
            if (AppRegistryBridge.instanceFile === null) {
                AppRegistryBridge.instanceFile = new FileBridge();
            }
            return AppRegistryBridge.instanceFile;
        };
        /**
           @method
           Obtain a reference to the IFileSystem bridge.

           @return {Adaptive.FileSystemBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getFileSystemBridge = function () {
            if (AppRegistryBridge.instanceFileSystem === null) {
                AppRegistryBridge.instanceFileSystem = new FileSystemBridge();
            }
            return AppRegistryBridge.instanceFileSystem;
        };
        /**
           @method
           Obtain a reference to the IGeolocation bridge.

           @return {Adaptive.GeolocationBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getGeolocationBridge = function () {
            if (AppRegistryBridge.instanceGeolocation === null) {
                AppRegistryBridge.instanceGeolocation = new GeolocationBridge();
            }
            return AppRegistryBridge.instanceGeolocation;
        };
        /**
           @method
           Obtain a reference to the IGlobalization bridge.

           @return {Adaptive.GlobalizationBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getGlobalizationBridge = function () {
            if (AppRegistryBridge.instanceGlobalization === null) {
                AppRegistryBridge.instanceGlobalization = new GlobalizationBridge();
            }
            return AppRegistryBridge.instanceGlobalization;
        };
        /**
           @method
           Obtain a reference to the IGooglePlus bridge.

           @return {Adaptive.GooglePlusBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getGooglePlusBridge = function () {
            if (AppRegistryBridge.instanceGooglePlus === null) {
                AppRegistryBridge.instanceGooglePlus = new GooglePlusBridge();
            }
            return AppRegistryBridge.instanceGooglePlus;
        };
        /**
           @method
           Obtain a reference to the IGyroscope bridge.

           @return {Adaptive.GyroscopeBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getGyroscopeBridge = function () {
            if (AppRegistryBridge.instanceGyroscope === null) {
                AppRegistryBridge.instanceGyroscope = new GyroscopeBridge();
            }
            return AppRegistryBridge.instanceGyroscope;
        };
        /**
           @method
           Obtain a reference to the IImaging bridge.

           @return {Adaptive.ImagingBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getImagingBridge = function () {
            if (AppRegistryBridge.instanceImaging === null) {
                AppRegistryBridge.instanceImaging = new ImagingBridge();
            }
            return AppRegistryBridge.instanceImaging;
        };
        /**
           @method
           Obtain a reference to the IInternalStorage bridge.

           @return {Adaptive.InternalStorageBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getInternalStorageBridge = function () {
            if (AppRegistryBridge.instanceInternalStorage === null) {
                AppRegistryBridge.instanceInternalStorage = new InternalStorageBridge();
            }
            return AppRegistryBridge.instanceInternalStorage;
        };
        /**
           @method
           Obtain a reference to the ILifecycle bridge.

           @return {Adaptive.LifecycleBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getLifecycleBridge = function () {
            if (AppRegistryBridge.instanceLifecycle === null) {
                AppRegistryBridge.instanceLifecycle = new LifecycleBridge();
            }
            return AppRegistryBridge.instanceLifecycle;
        };
        /**
           @method
           Obtain a reference to the ILinkedIn bridge.

           @return {Adaptive.LinkedInBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getLinkedInBridge = function () {
            if (AppRegistryBridge.instanceLinkedIn === null) {
                AppRegistryBridge.instanceLinkedIn = new LinkedInBridge();
            }
            return AppRegistryBridge.instanceLinkedIn;
        };
        /**
           @method
           Obtain a reference to the ILogging bridge.

           @return {Adaptive.LoggingBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getLoggingBridge = function () {
            if (AppRegistryBridge.instanceLogging === null) {
                AppRegistryBridge.instanceLogging = new LoggingBridge();
            }
            return AppRegistryBridge.instanceLogging;
        };
        /**
           @method
           Obtain a reference to the IMagnetometer bridge.

           @return {Adaptive.MagnetometerBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getMagnetometerBridge = function () {
            if (AppRegistryBridge.instanceMagnetometer === null) {
                AppRegistryBridge.instanceMagnetometer = new MagnetometerBridge();
            }
            return AppRegistryBridge.instanceMagnetometer;
        };
        /**
           @method
           Obtain a reference to the IMail bridge.

           @return {Adaptive.MailBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getMailBridge = function () {
            if (AppRegistryBridge.instanceMail === null) {
                AppRegistryBridge.instanceMail = new MailBridge();
            }
            return AppRegistryBridge.instanceMail;
        };
        /**
           @method
           Obtain a reference to the IManagement bridge.

           @return {Adaptive.ManagementBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getManagementBridge = function () {
            if (AppRegistryBridge.instanceManagement === null) {
                AppRegistryBridge.instanceManagement = new ManagementBridge();
            }
            return AppRegistryBridge.instanceManagement;
        };
        /**
           @method
           Obtain a reference to the IMap bridge.

           @return {Adaptive.MapBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getMapBridge = function () {
            if (AppRegistryBridge.instanceMap === null) {
                AppRegistryBridge.instanceMap = new MapBridge();
            }
            return AppRegistryBridge.instanceMap;
        };
        /**
           @method
           Obtain a reference to the IMessaging bridge.

           @return {Adaptive.MessagingBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getMessagingBridge = function () {
            if (AppRegistryBridge.instanceMessaging === null) {
                AppRegistryBridge.instanceMessaging = new MessagingBridge();
            }
            return AppRegistryBridge.instanceMessaging;
        };
        /**
           @method
           Obtain a reference to the INFC bridge.

           @return {Adaptive.NFCBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getNFCBridge = function () {
            if (AppRegistryBridge.instanceNFC === null) {
                AppRegistryBridge.instanceNFC = new NFCBridge();
            }
            return AppRegistryBridge.instanceNFC;
        };
        /**
           @method
           Obtain a reference to the INetworkInfo bridge.

           @return {Adaptive.NetworkInfoBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getNetworkInfoBridge = function () {
            if (AppRegistryBridge.instanceNetworkInfo === null) {
                AppRegistryBridge.instanceNetworkInfo = new NetworkInfoBridge();
            }
            return AppRegistryBridge.instanceNetworkInfo;
        };
        /**
           @method
           Obtain a reference to the INetworkNaming bridge.

           @return {Adaptive.NetworkNamingBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getNetworkNamingBridge = function () {
            if (AppRegistryBridge.instanceNetworkNaming === null) {
                AppRegistryBridge.instanceNetworkNaming = new NetworkNamingBridge();
            }
            return AppRegistryBridge.instanceNetworkNaming;
        };
        /**
           @method
           Obtain a reference to the INetworkReachability bridge.

           @return {Adaptive.NetworkReachabilityBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getNetworkReachabilityBridge = function () {
            if (AppRegistryBridge.instanceNetworkReachability === null) {
                AppRegistryBridge.instanceNetworkReachability = new NetworkReachabilityBridge();
            }
            return AppRegistryBridge.instanceNetworkReachability;
        };
        /**
           @method
           Obtain a reference to the INetworkStatus bridge.

           @return {Adaptive.NetworkStatusBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getNetworkStatusBridge = function () {
            if (AppRegistryBridge.instanceNetworkStatus === null) {
                AppRegistryBridge.instanceNetworkStatus = new NetworkStatusBridge();
            }
            return AppRegistryBridge.instanceNetworkStatus;
        };
        /**
           @method
           Obtain a reference to the INotification bridge.

           @return {Adaptive.NotificationBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getNotificationBridge = function () {
            if (AppRegistryBridge.instanceNotification === null) {
                AppRegistryBridge.instanceNotification = new NotificationBridge();
            }
            return AppRegistryBridge.instanceNotification;
        };
        /**
           @method
           Obtain a reference to the INotificationLocal bridge.

           @return {Adaptive.NotificationLocalBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getNotificationLocalBridge = function () {
            if (AppRegistryBridge.instanceNotificationLocal === null) {
                AppRegistryBridge.instanceNotificationLocal = new NotificationLocalBridge();
            }
            return AppRegistryBridge.instanceNotificationLocal;
        };
        /**
           @method
           Obtain a reference to the IOAuth bridge.

           @return {Adaptive.OAuthBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getOAuthBridge = function () {
            if (AppRegistryBridge.instanceOAuth === null) {
                AppRegistryBridge.instanceOAuth = new OAuthBridge();
            }
            return AppRegistryBridge.instanceOAuth;
        };
        /**
           @method
           Obtain a reference to the IOCR bridge.

           @return {Adaptive.OCRBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getOCRBridge = function () {
            if (AppRegistryBridge.instanceOCR === null) {
                AppRegistryBridge.instanceOCR = new OCRBridge();
            }
            return AppRegistryBridge.instanceOCR;
        };
        /**
           @method
           Obtain a reference to the IOS bridge.

           @return {Adaptive.OSBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getOSBridge = function () {
            if (AppRegistryBridge.instanceOS === null) {
                AppRegistryBridge.instanceOS = new OSBridge();
            }
            return AppRegistryBridge.instanceOS;
        };
        /**
           @method
           Obtain a reference to the IOpenId bridge.

           @return {Adaptive.OpenIdBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getOpenIdBridge = function () {
            if (AppRegistryBridge.instanceOpenId === null) {
                AppRegistryBridge.instanceOpenId = new OpenIdBridge();
            }
            return AppRegistryBridge.instanceOpenId;
        };
        /**
           @method
           Obtain a reference to the IPrinting bridge.

           @return {Adaptive.PrintingBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getPrintingBridge = function () {
            if (AppRegistryBridge.instancePrinting === null) {
                AppRegistryBridge.instancePrinting = new PrintingBridge();
            }
            return AppRegistryBridge.instancePrinting;
        };
        /**
           @method
           Obtain a reference to the IProximity bridge.

           @return {Adaptive.ProximityBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getProximityBridge = function () {
            if (AppRegistryBridge.instanceProximity === null) {
                AppRegistryBridge.instanceProximity = new ProximityBridge();
            }
            return AppRegistryBridge.instanceProximity;
        };
        /**
           @method
           Obtain a reference to the IQRCode bridge.

           @return {Adaptive.QRCodeBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getQRCodeBridge = function () {
            if (AppRegistryBridge.instanceQRCode === null) {
                AppRegistryBridge.instanceQRCode = new QRCodeBridge();
            }
            return AppRegistryBridge.instanceQRCode;
        };
        /**
           @method
           Obtain a reference to the IRSS bridge.

           @return {Adaptive.RSSBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getRSSBridge = function () {
            if (AppRegistryBridge.instanceRSS === null) {
                AppRegistryBridge.instanceRSS = new RSSBridge();
            }
            return AppRegistryBridge.instanceRSS;
        };
        /**
           @method
           Obtain a reference to the IRuntime bridge.

           @return {Adaptive.RuntimeBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getRuntimeBridge = function () {
            if (AppRegistryBridge.instanceRuntime === null) {
                AppRegistryBridge.instanceRuntime = new RuntimeBridge();
            }
            return AppRegistryBridge.instanceRuntime;
        };
        /**
           @method
           Obtain a reference to the ISecurity bridge.

           @return {Adaptive.SecurityBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getSecurityBridge = function () {
            if (AppRegistryBridge.instanceSecurity === null) {
                AppRegistryBridge.instanceSecurity = new SecurityBridge();
            }
            return AppRegistryBridge.instanceSecurity;
        };
        /**
           @method
           Obtain a reference to the IService bridge.

           @return {Adaptive.ServiceBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getServiceBridge = function () {
            if (AppRegistryBridge.instanceService === null) {
                AppRegistryBridge.instanceService = new ServiceBridge();
            }
            return AppRegistryBridge.instanceService;
        };
        /**
           @method
           Obtain a reference to the ISettings bridge.

           @return {Adaptive.SettingsBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getSettingsBridge = function () {
            if (AppRegistryBridge.instanceSettings === null) {
                AppRegistryBridge.instanceSettings = new SettingsBridge();
            }
            return AppRegistryBridge.instanceSettings;
        };
        /**
           @method
           Obtain a reference to the ISocket bridge.

           @return {Adaptive.SocketBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getSocketBridge = function () {
            if (AppRegistryBridge.instanceSocket === null) {
                AppRegistryBridge.instanceSocket = new SocketBridge();
            }
            return AppRegistryBridge.instanceSocket;
        };
        /**
           @method
           Obtain a reference to the IStore bridge.

           @return {Adaptive.StoreBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getStoreBridge = function () {
            if (AppRegistryBridge.instanceStore === null) {
                AppRegistryBridge.instanceStore = new StoreBridge();
            }
            return AppRegistryBridge.instanceStore;
        };
        /**
           @method
           Obtain a reference to the ITelephony bridge.

           @return {Adaptive.TelephonyBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getTelephonyBridge = function () {
            if (AppRegistryBridge.instanceTelephony === null) {
                AppRegistryBridge.instanceTelephony = new TelephonyBridge();
            }
            return AppRegistryBridge.instanceTelephony;
        };
        /**
           @method
           Obtain a reference to the ITimer bridge.

           @return {Adaptive.TimerBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getTimerBridge = function () {
            if (AppRegistryBridge.instanceTimer === null) {
                AppRegistryBridge.instanceTimer = new TimerBridge();
            }
            return AppRegistryBridge.instanceTimer;
        };
        /**
           @method
           Obtain a reference to the ITwitter bridge.

           @return {Adaptive.TwitterBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getTwitterBridge = function () {
            if (AppRegistryBridge.instanceTwitter === null) {
                AppRegistryBridge.instanceTwitter = new TwitterBridge();
            }
            return AppRegistryBridge.instanceTwitter;
        };
        /**
           @method
           Obtain a reference to the IUI bridge.

           @return {Adaptive.UIBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getUIBridge = function () {
            if (AppRegistryBridge.instanceUI === null) {
                AppRegistryBridge.instanceUI = new UIBridge();
            }
            return AppRegistryBridge.instanceUI;
        };
        /**
           @method
           Obtain a reference to the IUpdate bridge.

           @return {Adaptive.UpdateBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getUpdateBridge = function () {
            if (AppRegistryBridge.instanceUpdate === null) {
                AppRegistryBridge.instanceUpdate = new UpdateBridge();
            }
            return AppRegistryBridge.instanceUpdate;
        };
        /**
           @method
           Obtain a reference to the IVibration bridge.

           @return {Adaptive.VibrationBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getVibrationBridge = function () {
            if (AppRegistryBridge.instanceVibration === null) {
                AppRegistryBridge.instanceVibration = new VibrationBridge();
            }
            return AppRegistryBridge.instanceVibration;
        };
        /**
           @method
           Obtain a reference to the IVideo bridge.

           @return {Adaptive.VideoBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getVideoBridge = function () {
            if (AppRegistryBridge.instanceVideo === null) {
                AppRegistryBridge.instanceVideo = new VideoBridge();
            }
            return AppRegistryBridge.instanceVideo;
        };
        /**
           @method
           Obtain a reference to the IWallet bridge.

           @return {Adaptive.WalletBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getWalletBridge = function () {
            if (AppRegistryBridge.instanceWallet === null) {
                AppRegistryBridge.instanceWallet = new WalletBridge();
            }
            return AppRegistryBridge.instanceWallet;
        };
        /**
           @method
           Obtain a reference to the IXML bridge.

           @return {Adaptive.XMLBridge} bridge instance.
        */
        AppRegistryBridge.prototype.getXMLBridge = function () {
            if (AppRegistryBridge.instanceXML === null) {
                AppRegistryBridge.instanceXML = new XMLBridge();
            }
            return AppRegistryBridge.instanceXML;
        };
        /**
           @method
           Return the API version for the given interface.

           @return {string} The version of the API.
        */
        AppRegistryBridge.prototype.getAPIVersion = function () {
            return Adaptive.bridgeApiVersion;
        };
        /**
           @private
           @static
           @property {Adaptive.AppRegistryBridge} instance
           Singleton instance of AppRegistry.
        */
        AppRegistryBridge.instance = null;
        /**
           @private
           @property {Adaptive.IAcceleration} instanceAcceleration
        */
        AppRegistryBridge.instanceAcceleration = null;
        /**
           @private
           @property {Adaptive.IAds} instanceAds
        */
        AppRegistryBridge.instanceAds = null;
        /**
           @private
           @property {Adaptive.IAlarm} instanceAlarm
        */
        AppRegistryBridge.instanceAlarm = null;
        /**
           @private
           @property {Adaptive.IAmbientLight} instanceAmbientLight
        */
        AppRegistryBridge.instanceAmbientLight = null;
        /**
           @private
           @property {Adaptive.IAnalytics} instanceAnalytics
        */
        AppRegistryBridge.instanceAnalytics = null;
        /**
           @private
           @property {Adaptive.IAudio} instanceAudio
        */
        AppRegistryBridge.instanceAudio = null;
        /**
           @private
           @property {Adaptive.IBarcode} instanceBarcode
        */
        AppRegistryBridge.instanceBarcode = null;
        /**
           @private
           @property {Adaptive.IBarometer} instanceBarometer
        */
        AppRegistryBridge.instanceBarometer = null;
        /**
           @private
           @property {Adaptive.IBluetooth} instanceBluetooth
        */
        AppRegistryBridge.instanceBluetooth = null;
        /**
           @private
           @property {Adaptive.IBrowser} instanceBrowser
        */
        AppRegistryBridge.instanceBrowser = null;
        /**
           @private
           @property {Adaptive.ICalendar} instanceCalendar
        */
        AppRegistryBridge.instanceCalendar = null;
        /**
           @private
           @property {Adaptive.ICamera} instanceCamera
        */
        AppRegistryBridge.instanceCamera = null;
        /**
           @private
           @property {Adaptive.ICapabilities} instanceCapabilities
        */
        AppRegistryBridge.instanceCapabilities = null;
        /**
           @private
           @property {Adaptive.ICloud} instanceCloud
        */
        AppRegistryBridge.instanceCloud = null;
        /**
           @private
           @property {Adaptive.ICompression} instanceCompression
        */
        AppRegistryBridge.instanceCompression = null;
        /**
           @private
           @property {Adaptive.IConcurrent} instanceConcurrent
        */
        AppRegistryBridge.instanceConcurrent = null;
        /**
           @private
           @property {Adaptive.IContact} instanceContact
        */
        AppRegistryBridge.instanceContact = null;
        /**
           @private
           @property {Adaptive.ICrypto} instanceCrypto
        */
        AppRegistryBridge.instanceCrypto = null;
        /**
           @private
           @property {Adaptive.IDataStream} instanceDataStream
        */
        AppRegistryBridge.instanceDataStream = null;
        /**
           @private
           @property {Adaptive.IDatabase} instanceDatabase
        */
        AppRegistryBridge.instanceDatabase = null;
        /**
           @private
           @property {Adaptive.IDesktop} instanceDesktop
        */
        AppRegistryBridge.instanceDesktop = null;
        /**
           @private
           @property {Adaptive.IDevice} instanceDevice
        */
        AppRegistryBridge.instanceDevice = null;
        /**
           @private
           @property {Adaptive.IDisplay} instanceDisplay
        */
        AppRegistryBridge.instanceDisplay = null;
        /**
           @private
           @property {Adaptive.IFacebook} instanceFacebook
        */
        AppRegistryBridge.instanceFacebook = null;
        /**
           @private
           @property {Adaptive.IFile} instanceFile
        */
        AppRegistryBridge.instanceFile = null;
        /**
           @private
           @property {Adaptive.IFileSystem} instanceFileSystem
        */
        AppRegistryBridge.instanceFileSystem = null;
        /**
           @private
           @property {Adaptive.IGeolocation} instanceGeolocation
        */
        AppRegistryBridge.instanceGeolocation = null;
        /**
           @private
           @property {Adaptive.IGlobalization} instanceGlobalization
        */
        AppRegistryBridge.instanceGlobalization = null;
        /**
           @private
           @property {Adaptive.IGooglePlus} instanceGooglePlus
        */
        AppRegistryBridge.instanceGooglePlus = null;
        /**
           @private
           @property {Adaptive.IGyroscope} instanceGyroscope
        */
        AppRegistryBridge.instanceGyroscope = null;
        /**
           @private
           @property {Adaptive.IImaging} instanceImaging
        */
        AppRegistryBridge.instanceImaging = null;
        /**
           @private
           @property {Adaptive.IInternalStorage} instanceInternalStorage
        */
        AppRegistryBridge.instanceInternalStorage = null;
        /**
           @private
           @property {Adaptive.ILifecycle} instanceLifecycle
        */
        AppRegistryBridge.instanceLifecycle = null;
        /**
           @private
           @property {Adaptive.ILinkedIn} instanceLinkedIn
        */
        AppRegistryBridge.instanceLinkedIn = null;
        /**
           @private
           @property {Adaptive.ILogging} instanceLogging
        */
        AppRegistryBridge.instanceLogging = null;
        /**
           @private
           @property {Adaptive.IMagnetometer} instanceMagnetometer
        */
        AppRegistryBridge.instanceMagnetometer = null;
        /**
           @private
           @property {Adaptive.IMail} instanceMail
        */
        AppRegistryBridge.instanceMail = null;
        /**
           @private
           @property {Adaptive.IManagement} instanceManagement
        */
        AppRegistryBridge.instanceManagement = null;
        /**
           @private
           @property {Adaptive.IMap} instanceMap
        */
        AppRegistryBridge.instanceMap = null;
        /**
           @private
           @property {Adaptive.IMessaging} instanceMessaging
        */
        AppRegistryBridge.instanceMessaging = null;
        /**
           @private
           @property {Adaptive.INFC} instanceNFC
        */
        AppRegistryBridge.instanceNFC = null;
        /**
           @private
           @property {Adaptive.INetworkInfo} instanceNetworkInfo
        */
        AppRegistryBridge.instanceNetworkInfo = null;
        /**
           @private
           @property {Adaptive.INetworkNaming} instanceNetworkNaming
        */
        AppRegistryBridge.instanceNetworkNaming = null;
        /**
           @private
           @property {Adaptive.INetworkReachability} instanceNetworkReachability
        */
        AppRegistryBridge.instanceNetworkReachability = null;
        /**
           @private
           @property {Adaptive.INetworkStatus} instanceNetworkStatus
        */
        AppRegistryBridge.instanceNetworkStatus = null;
        /**
           @private
           @property {Adaptive.INotification} instanceNotification
        */
        AppRegistryBridge.instanceNotification = null;
        /**
           @private
           @property {Adaptive.INotificationLocal} instanceNotificationLocal
        */
        AppRegistryBridge.instanceNotificationLocal = null;
        /**
           @private
           @property {Adaptive.IOAuth} instanceOAuth
        */
        AppRegistryBridge.instanceOAuth = null;
        /**
           @private
           @property {Adaptive.IOCR} instanceOCR
        */
        AppRegistryBridge.instanceOCR = null;
        /**
           @private
           @property {Adaptive.IOS} instanceOS
        */
        AppRegistryBridge.instanceOS = null;
        /**
           @private
           @property {Adaptive.IOpenId} instanceOpenId
        */
        AppRegistryBridge.instanceOpenId = null;
        /**
           @private
           @property {Adaptive.IPrinting} instancePrinting
        */
        AppRegistryBridge.instancePrinting = null;
        /**
           @private
           @property {Adaptive.IProximity} instanceProximity
        */
        AppRegistryBridge.instanceProximity = null;
        /**
           @private
           @property {Adaptive.IQRCode} instanceQRCode
        */
        AppRegistryBridge.instanceQRCode = null;
        /**
           @private
           @property {Adaptive.IRSS} instanceRSS
        */
        AppRegistryBridge.instanceRSS = null;
        /**
           @private
           @property {Adaptive.IRuntime} instanceRuntime
        */
        AppRegistryBridge.instanceRuntime = null;
        /**
           @private
           @property {Adaptive.ISecurity} instanceSecurity
        */
        AppRegistryBridge.instanceSecurity = null;
        /**
           @private
           @property {Adaptive.IService} instanceService
        */
        AppRegistryBridge.instanceService = null;
        /**
           @private
           @property {Adaptive.ISettings} instanceSettings
        */
        AppRegistryBridge.instanceSettings = null;
        /**
           @private
           @property {Adaptive.ISocket} instanceSocket
        */
        AppRegistryBridge.instanceSocket = null;
        /**
           @private
           @property {Adaptive.IStore} instanceStore
        */
        AppRegistryBridge.instanceStore = null;
        /**
           @private
           @property {Adaptive.ITelephony} instanceTelephony
        */
        AppRegistryBridge.instanceTelephony = null;
        /**
           @private
           @property {Adaptive.ITimer} instanceTimer
        */
        AppRegistryBridge.instanceTimer = null;
        /**
           @private
           @property {Adaptive.ITwitter} instanceTwitter
        */
        AppRegistryBridge.instanceTwitter = null;
        /**
           @private
           @property {Adaptive.IUI} instanceUI
        */
        AppRegistryBridge.instanceUI = null;
        /**
           @private
           @property {Adaptive.IUpdate} instanceUpdate
        */
        AppRegistryBridge.instanceUpdate = null;
        /**
           @private
           @property {Adaptive.IVibration} instanceVibration
        */
        AppRegistryBridge.instanceVibration = null;
        /**
           @private
           @property {Adaptive.IVideo} instanceVideo
        */
        AppRegistryBridge.instanceVideo = null;
        /**
           @private
           @property {Adaptive.IWallet} instanceWallet
        */
        AppRegistryBridge.instanceWallet = null;
        /**
           @private
           @property {Adaptive.IXML} instanceXML
        */
        AppRegistryBridge.instanceXML = null;
        return AppRegistryBridge;
    })();
    Adaptive.AppRegistryBridge = AppRegistryBridge;
    /**
       @enum {Adaptive.ContactAddressType} Adaptive.ContactAddressType
       Enumeration ContactAddressType
    */
    var ContactAddressType = (function () {
        function ContactAddressType(value) {
            this.value = value;
        }
        ContactAddressType.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ContactAddressType}
        */
        ContactAddressType.toObject = function (object) {
            var retValue = ContactAddressType.Unknown;
            if (object != null && object.value != null && ContactAddressType.hasOwnProperty(object.value)) {
                retValue = ContactAddressType[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.ContactAddressType} [Home='Home']
        */
        ContactAddressType.Home = new ContactAddressType("Home");
        /**
           @property {Adaptive.ContactAddressType} [Work='Work']
        */
        ContactAddressType.Work = new ContactAddressType("Work");
        /**
           @property {Adaptive.ContactAddressType} [Other='Other']
        */
        ContactAddressType.Other = new ContactAddressType("Other");
        /**
           @property {Adaptive.ContactAddressType} [Unknown='Unknown']
        */
        ContactAddressType.Unknown = new ContactAddressType("Unknown");
        return ContactAddressType;
    })();
    Adaptive.ContactAddressType = ContactAddressType;
    /**
       @enum {Adaptive.ContactEmailType} Adaptive.ContactEmailType
       Enumeration ContactEmailType
    */
    var ContactEmailType = (function () {
        function ContactEmailType(value) {
            this.value = value;
        }
        ContactEmailType.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ContactEmailType}
        */
        ContactEmailType.toObject = function (object) {
            var retValue = ContactEmailType.Unknown;
            if (object != null && object.value != null && ContactEmailType.hasOwnProperty(object.value)) {
                retValue = ContactEmailType[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.ContactEmailType} [Personal='Personal']
        */
        ContactEmailType.Personal = new ContactEmailType("Personal");
        /**
           @property {Adaptive.ContactEmailType} [Work='Work']
        */
        ContactEmailType.Work = new ContactEmailType("Work");
        /**
           @property {Adaptive.ContactEmailType} [Other='Other']
        */
        ContactEmailType.Other = new ContactEmailType("Other");
        /**
           @property {Adaptive.ContactEmailType} [Unknown='Unknown']
        */
        ContactEmailType.Unknown = new ContactEmailType("Unknown");
        return ContactEmailType;
    })();
    Adaptive.ContactEmailType = ContactEmailType;
    /**
       @enum {Adaptive.ContactPersonalInfoTitle} Adaptive.ContactPersonalInfoTitle
       Enumeration ContactPersonalInfoTitle
    */
    var ContactPersonalInfoTitle = (function () {
        function ContactPersonalInfoTitle(value) {
            this.value = value;
        }
        ContactPersonalInfoTitle.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ContactPersonalInfoTitle}
        */
        ContactPersonalInfoTitle.toObject = function (object) {
            var retValue = ContactPersonalInfoTitle.Unknown;
            if (object != null && object.value != null && ContactPersonalInfoTitle.hasOwnProperty(object.value)) {
                retValue = ContactPersonalInfoTitle[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.ContactPersonalInfoTitle} [Mr='Mr']
        */
        ContactPersonalInfoTitle.Mr = new ContactPersonalInfoTitle("Mr");
        /**
           @property {Adaptive.ContactPersonalInfoTitle} [Mrs='Mrs']
        */
        ContactPersonalInfoTitle.Mrs = new ContactPersonalInfoTitle("Mrs");
        /**
           @property {Adaptive.ContactPersonalInfoTitle} [Ms='Ms']
        */
        ContactPersonalInfoTitle.Ms = new ContactPersonalInfoTitle("Ms");
        /**
           @property {Adaptive.ContactPersonalInfoTitle} [Dr='Dr']
        */
        ContactPersonalInfoTitle.Dr = new ContactPersonalInfoTitle("Dr");
        /**
           @property {Adaptive.ContactPersonalInfoTitle} [Unknown='Unknown']
        */
        ContactPersonalInfoTitle.Unknown = new ContactPersonalInfoTitle("Unknown");
        return ContactPersonalInfoTitle;
    })();
    Adaptive.ContactPersonalInfoTitle = ContactPersonalInfoTitle;
    /**
       @enum {Adaptive.ContactPhoneType} Adaptive.ContactPhoneType
       Enumeration ContactPhoneType
    */
    var ContactPhoneType = (function () {
        function ContactPhoneType(value) {
            this.value = value;
        }
        ContactPhoneType.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ContactPhoneType}
        */
        ContactPhoneType.toObject = function (object) {
            var retValue = ContactPhoneType.Unknown;
            if (object != null && object.value != null && ContactPhoneType.hasOwnProperty(object.value)) {
                retValue = ContactPhoneType[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.ContactPhoneType} [Mobile='Mobile']
        */
        ContactPhoneType.Mobile = new ContactPhoneType("Mobile");
        /**
           @property {Adaptive.ContactPhoneType} [Work='Work']
        */
        ContactPhoneType.Work = new ContactPhoneType("Work");
        /**
           @property {Adaptive.ContactPhoneType} [Home='Home']
        */
        ContactPhoneType.Home = new ContactPhoneType("Home");
        /**
           @property {Adaptive.ContactPhoneType} [Main='Main']
        */
        ContactPhoneType.Main = new ContactPhoneType("Main");
        /**
           @property {Adaptive.ContactPhoneType} [HomeFax='HomeFax']
        */
        ContactPhoneType.HomeFax = new ContactPhoneType("HomeFax");
        /**
           @property {Adaptive.ContactPhoneType} [WorkFax='WorkFax']
        */
        ContactPhoneType.WorkFax = new ContactPhoneType("WorkFax");
        /**
           @property {Adaptive.ContactPhoneType} [Other='Other']
        */
        ContactPhoneType.Other = new ContactPhoneType("Other");
        /**
           @property {Adaptive.ContactPhoneType} [Unknown='Unknown']
        */
        ContactPhoneType.Unknown = new ContactPhoneType("Unknown");
        return ContactPhoneType;
    })();
    Adaptive.ContactPhoneType = ContactPhoneType;
    /**
       @enum {Adaptive.ContactSocialNetwork} Adaptive.ContactSocialNetwork
       Enumeration ContactSocialNetwork
    */
    var ContactSocialNetwork = (function () {
        function ContactSocialNetwork(value) {
            this.value = value;
        }
        ContactSocialNetwork.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ContactSocialNetwork}
        */
        ContactSocialNetwork.toObject = function (object) {
            var retValue = ContactSocialNetwork.Unknown;
            if (object != null && object.value != null && ContactSocialNetwork.hasOwnProperty(object.value)) {
                retValue = ContactSocialNetwork[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.ContactSocialNetwork} [Twitter='Twitter']
        */
        ContactSocialNetwork.Twitter = new ContactSocialNetwork("Twitter");
        /**
           @property {Adaptive.ContactSocialNetwork} [Facebook='Facebook']
        */
        ContactSocialNetwork.Facebook = new ContactSocialNetwork("Facebook");
        /**
           @property {Adaptive.ContactSocialNetwork} [GooglePlus='GooglePlus']
        */
        ContactSocialNetwork.GooglePlus = new ContactSocialNetwork("GooglePlus");
        /**
           @property {Adaptive.ContactSocialNetwork} [LinkedIn='LinkedIn']
        */
        ContactSocialNetwork.LinkedIn = new ContactSocialNetwork("LinkedIn");
        /**
           @property {Adaptive.ContactSocialNetwork} [Flickr='Flickr']
        */
        ContactSocialNetwork.Flickr = new ContactSocialNetwork("Flickr");
        /**
           @property {Adaptive.ContactSocialNetwork} [Unknown='Unknown']
        */
        ContactSocialNetwork.Unknown = new ContactSocialNetwork("Unknown");
        return ContactSocialNetwork;
    })();
    Adaptive.ContactSocialNetwork = ContactSocialNetwork;
    /**
       @enum {Adaptive.IAccelerationListenerError} Adaptive.IAccelerationListenerError
       Enumeration IAccelerationListenerError
    */
    var IAccelerationListenerError = (function () {
        function IAccelerationListenerError(value) {
            this.value = value;
        }
        IAccelerationListenerError.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IAccelerationListenerError}
        */
        IAccelerationListenerError.toObject = function (object) {
            var retValue = IAccelerationListenerError.Unknown;
            if (object != null && object.value != null && IAccelerationListenerError.hasOwnProperty(object.value)) {
                retValue = IAccelerationListenerError[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IAccelerationListenerError} [Unauthorized='Unauthorized']
        */
        IAccelerationListenerError.Unauthorized = new IAccelerationListenerError("Unauthorized");
        /**
           @property {Adaptive.IAccelerationListenerError} [Unavailable='Unavailable']
        */
        IAccelerationListenerError.Unavailable = new IAccelerationListenerError("Unavailable");
        /**
           @property {Adaptive.IAccelerationListenerError} [Unknown='Unknown']
        */
        IAccelerationListenerError.Unknown = new IAccelerationListenerError("Unknown");
        return IAccelerationListenerError;
    })();
    Adaptive.IAccelerationListenerError = IAccelerationListenerError;
    /**
       @enum {Adaptive.IAccelerationListenerWarning} Adaptive.IAccelerationListenerWarning
       Enumeration IAccelerationListenerWarning
    */
    var IAccelerationListenerWarning = (function () {
        function IAccelerationListenerWarning(value) {
            this.value = value;
        }
        IAccelerationListenerWarning.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IAccelerationListenerWarning}
        */
        IAccelerationListenerWarning.toObject = function (object) {
            var retValue = IAccelerationListenerWarning.Unknown;
            if (object != null && object.value != null && IAccelerationListenerWarning.hasOwnProperty(object.value)) {
                retValue = IAccelerationListenerWarning[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IAccelerationListenerWarning} [NeedsCalibration='NeedsCalibration']
        */
        IAccelerationListenerWarning.NeedsCalibration = new IAccelerationListenerWarning("NeedsCalibration");
        /**
           @property {Adaptive.IAccelerationListenerWarning} [Stale='Stale']
        */
        IAccelerationListenerWarning.Stale = new IAccelerationListenerWarning("Stale");
        /**
           @property {Adaptive.IAccelerationListenerWarning} [Unknown='Unknown']
        */
        IAccelerationListenerWarning.Unknown = new IAccelerationListenerWarning("Unknown");
        return IAccelerationListenerWarning;
    })();
    Adaptive.IAccelerationListenerWarning = IAccelerationListenerWarning;
    /**
       @enum {Adaptive.IAdaptiveRPGroup} Adaptive.IAdaptiveRPGroup
       Enumeration IAdaptiveRPGroup
    */
    var IAdaptiveRPGroup = (function () {
        function IAdaptiveRPGroup(value) {
            this.value = value;
        }
        IAdaptiveRPGroup.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IAdaptiveRPGroup}
        */
        IAdaptiveRPGroup.toObject = function (object) {
            var retValue = IAdaptiveRPGroup.Unknown;
            if (object != null && object.value != null && IAdaptiveRPGroup.hasOwnProperty(object.value)) {
                retValue = IAdaptiveRPGroup[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IAdaptiveRPGroup} [Application='Application']
        */
        IAdaptiveRPGroup.Application = new IAdaptiveRPGroup("Application");
        /**
           @property {Adaptive.IAdaptiveRPGroup} [Commerce='Commerce']
        */
        IAdaptiveRPGroup.Commerce = new IAdaptiveRPGroup("Commerce");
        /**
           @property {Adaptive.IAdaptiveRPGroup} [Communication='Communication']
        */
        IAdaptiveRPGroup.Communication = new IAdaptiveRPGroup("Communication");
        /**
           @property {Adaptive.IAdaptiveRPGroup} [Data='Data']
        */
        IAdaptiveRPGroup.Data = new IAdaptiveRPGroup("Data");
        /**
           @property {Adaptive.IAdaptiveRPGroup} [Media='Media']
        */
        IAdaptiveRPGroup.Media = new IAdaptiveRPGroup("Media");
        /**
           @property {Adaptive.IAdaptiveRPGroup} [Notification='Notification']
        */
        IAdaptiveRPGroup.Notification = new IAdaptiveRPGroup("Notification");
        /**
           @property {Adaptive.IAdaptiveRPGroup} [PIM='PIM']
        */
        IAdaptiveRPGroup.PIM = new IAdaptiveRPGroup("PIM");
        /**
           @property {Adaptive.IAdaptiveRPGroup} [Reader='Reader']
        */
        IAdaptiveRPGroup.Reader = new IAdaptiveRPGroup("Reader");
        /**
           @property {Adaptive.IAdaptiveRPGroup} [Security='Security']
        */
        IAdaptiveRPGroup.Security = new IAdaptiveRPGroup("Security");
        /**
           @property {Adaptive.IAdaptiveRPGroup} [Sensor='Sensor']
        */
        IAdaptiveRPGroup.Sensor = new IAdaptiveRPGroup("Sensor");
        /**
           @property {Adaptive.IAdaptiveRPGroup} [Social='Social']
        */
        IAdaptiveRPGroup.Social = new IAdaptiveRPGroup("Social");
        /**
           @property {Adaptive.IAdaptiveRPGroup} [System='System']
        */
        IAdaptiveRPGroup.System = new IAdaptiveRPGroup("System");
        /**
           @property {Adaptive.IAdaptiveRPGroup} [UI='UI']
        */
        IAdaptiveRPGroup.UI = new IAdaptiveRPGroup("UI");
        /**
           @property {Adaptive.IAdaptiveRPGroup} [Util='Util']
        */
        IAdaptiveRPGroup.Util = new IAdaptiveRPGroup("Util");
        /**
           @property {Adaptive.IAdaptiveRPGroup} [Kernel='Kernel']
        */
        IAdaptiveRPGroup.Kernel = new IAdaptiveRPGroup("Kernel");
        /**
           @property {Adaptive.IAdaptiveRPGroup} [Unknown='Unknown']
        */
        IAdaptiveRPGroup.Unknown = new IAdaptiveRPGroup("Unknown");
        return IAdaptiveRPGroup;
    })();
    Adaptive.IAdaptiveRPGroup = IAdaptiveRPGroup;
    /**
       @enum {Adaptive.IButtonListenerError} Adaptive.IButtonListenerError
       Enumeration IButtonListenerError
    */
    var IButtonListenerError = (function () {
        function IButtonListenerError(value) {
            this.value = value;
        }
        IButtonListenerError.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IButtonListenerError}
        */
        IButtonListenerError.toObject = function (object) {
            var retValue = IButtonListenerError.Unknown;
            if (object != null && object.value != null && IButtonListenerError.hasOwnProperty(object.value)) {
                retValue = IButtonListenerError[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IButtonListenerError} [NotPresent='NotPresent']
        */
        IButtonListenerError.NotPresent = new IButtonListenerError("NotPresent");
        /**
           @property {Adaptive.IButtonListenerError} [Unknown='Unknown']
        */
        IButtonListenerError.Unknown = new IButtonListenerError("Unknown");
        return IButtonListenerError;
    })();
    Adaptive.IButtonListenerError = IButtonListenerError;
    /**
       @enum {Adaptive.IButtonListenerWarning} Adaptive.IButtonListenerWarning
       Enumeration IButtonListenerWarning
    */
    var IButtonListenerWarning = (function () {
        function IButtonListenerWarning(value) {
            this.value = value;
        }
        IButtonListenerWarning.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IButtonListenerWarning}
        */
        IButtonListenerWarning.toObject = function (object) {
            var retValue = IButtonListenerWarning.Unknown;
            if (object != null && object.value != null && IButtonListenerWarning.hasOwnProperty(object.value)) {
                retValue = IButtonListenerWarning[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IButtonListenerWarning} [NotImplemented='NotImplemented']
        */
        IButtonListenerWarning.NotImplemented = new IButtonListenerWarning("NotImplemented");
        /**
           @property {Adaptive.IButtonListenerWarning} [Unknown='Unknown']
        */
        IButtonListenerWarning.Unknown = new IButtonListenerWarning("Unknown");
        return IButtonListenerWarning;
    })();
    Adaptive.IButtonListenerWarning = IButtonListenerWarning;
    /**
       @enum {Adaptive.ICapabilitiesButton} Adaptive.ICapabilitiesButton
       Enumeration ICapabilitiesButton
    */
    var ICapabilitiesButton = (function () {
        function ICapabilitiesButton(value) {
            this.value = value;
        }
        ICapabilitiesButton.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ICapabilitiesButton}
        */
        ICapabilitiesButton.toObject = function (object) {
            var retValue = ICapabilitiesButton.Unknown;
            if (object != null && object.value != null && ICapabilitiesButton.hasOwnProperty(object.value)) {
                retValue = ICapabilitiesButton[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.ICapabilitiesButton} [HomeButton='HomeButton']
        */
        ICapabilitiesButton.HomeButton = new ICapabilitiesButton("HomeButton");
        /**
           @property {Adaptive.ICapabilitiesButton} [BackButton='BackButton']
        */
        ICapabilitiesButton.BackButton = new ICapabilitiesButton("BackButton");
        /**
           @property {Adaptive.ICapabilitiesButton} [OptionButton='OptionButton']
        */
        ICapabilitiesButton.OptionButton = new ICapabilitiesButton("OptionButton");
        /**
           @property {Adaptive.ICapabilitiesButton} [Unknown='Unknown']
        */
        ICapabilitiesButton.Unknown = new ICapabilitiesButton("Unknown");
        return ICapabilitiesButton;
    })();
    Adaptive.ICapabilitiesButton = ICapabilitiesButton;
    /**
       @enum {Adaptive.ICapabilitiesCommunication} Adaptive.ICapabilitiesCommunication
       Enumeration ICapabilitiesCommunication
    */
    var ICapabilitiesCommunication = (function () {
        function ICapabilitiesCommunication(value) {
            this.value = value;
        }
        ICapabilitiesCommunication.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ICapabilitiesCommunication}
        */
        ICapabilitiesCommunication.toObject = function (object) {
            var retValue = ICapabilitiesCommunication.Unknown;
            if (object != null && object.value != null && ICapabilitiesCommunication.hasOwnProperty(object.value)) {
                retValue = ICapabilitiesCommunication[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.ICapabilitiesCommunication} [Calendar='Calendar']
        */
        ICapabilitiesCommunication.Calendar = new ICapabilitiesCommunication("Calendar");
        /**
           @property {Adaptive.ICapabilitiesCommunication} [Contact='Contact']
        */
        ICapabilitiesCommunication.Contact = new ICapabilitiesCommunication("Contact");
        /**
           @property {Adaptive.ICapabilitiesCommunication} [Mail='Mail']
        */
        ICapabilitiesCommunication.Mail = new ICapabilitiesCommunication("Mail");
        /**
           @property {Adaptive.ICapabilitiesCommunication} [Messaging='Messaging']
        */
        ICapabilitiesCommunication.Messaging = new ICapabilitiesCommunication("Messaging");
        /**
           @property {Adaptive.ICapabilitiesCommunication} [Telephony='Telephony']
        */
        ICapabilitiesCommunication.Telephony = new ICapabilitiesCommunication("Telephony");
        /**
           @property {Adaptive.ICapabilitiesCommunication} [Unknown='Unknown']
        */
        ICapabilitiesCommunication.Unknown = new ICapabilitiesCommunication("Unknown");
        return ICapabilitiesCommunication;
    })();
    Adaptive.ICapabilitiesCommunication = ICapabilitiesCommunication;
    /**
       @enum {Adaptive.ICapabilitiesData} Adaptive.ICapabilitiesData
       Enumeration ICapabilitiesData
    */
    var ICapabilitiesData = (function () {
        function ICapabilitiesData(value) {
            this.value = value;
        }
        ICapabilitiesData.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ICapabilitiesData}
        */
        ICapabilitiesData.toObject = function (object) {
            var retValue = ICapabilitiesData.Unknown;
            if (object != null && object.value != null && ICapabilitiesData.hasOwnProperty(object.value)) {
                retValue = ICapabilitiesData[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.ICapabilitiesData} [Database='Database']
        */
        ICapabilitiesData.Database = new ICapabilitiesData("Database");
        /**
           @property {Adaptive.ICapabilitiesData} [File='File']
        */
        ICapabilitiesData.File = new ICapabilitiesData("File");
        /**
           @property {Adaptive.ICapabilitiesData} [Cloud='Cloud']
        */
        ICapabilitiesData.Cloud = new ICapabilitiesData("Cloud");
        /**
           @property {Adaptive.ICapabilitiesData} [Unknown='Unknown']
        */
        ICapabilitiesData.Unknown = new ICapabilitiesData("Unknown");
        return ICapabilitiesData;
    })();
    Adaptive.ICapabilitiesData = ICapabilitiesData;
    /**
       @enum {Adaptive.ICapabilitiesMedia} Adaptive.ICapabilitiesMedia
       Enumeration ICapabilitiesMedia
    */
    var ICapabilitiesMedia = (function () {
        function ICapabilitiesMedia(value) {
            this.value = value;
        }
        ICapabilitiesMedia.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ICapabilitiesMedia}
        */
        ICapabilitiesMedia.toObject = function (object) {
            var retValue = ICapabilitiesMedia.Unknown;
            if (object != null && object.value != null && ICapabilitiesMedia.hasOwnProperty(object.value)) {
                retValue = ICapabilitiesMedia[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.ICapabilitiesMedia} [AudioPlayback='AudioPlayback']
        */
        ICapabilitiesMedia.AudioPlayback = new ICapabilitiesMedia("AudioPlayback");
        /**
           @property {Adaptive.ICapabilitiesMedia} [AudioRecording='AudioRecording']
        */
        ICapabilitiesMedia.AudioRecording = new ICapabilitiesMedia("AudioRecording");
        /**
           @property {Adaptive.ICapabilitiesMedia} [Camera='Camera']
        */
        ICapabilitiesMedia.Camera = new ICapabilitiesMedia("Camera");
        /**
           @property {Adaptive.ICapabilitiesMedia} [VideoPlayback='VideoPlayback']
        */
        ICapabilitiesMedia.VideoPlayback = new ICapabilitiesMedia("VideoPlayback");
        /**
           @property {Adaptive.ICapabilitiesMedia} [VideoRecording='VideoRecording']
        */
        ICapabilitiesMedia.VideoRecording = new ICapabilitiesMedia("VideoRecording");
        /**
           @property {Adaptive.ICapabilitiesMedia} [Unknown='Unknown']
        */
        ICapabilitiesMedia.Unknown = new ICapabilitiesMedia("Unknown");
        return ICapabilitiesMedia;
    })();
    Adaptive.ICapabilitiesMedia = ICapabilitiesMedia;
    /**
       @enum {Adaptive.ICapabilitiesNet} Adaptive.ICapabilitiesNet
       Enumeration ICapabilitiesNet
    */
    var ICapabilitiesNet = (function () {
        function ICapabilitiesNet(value) {
            this.value = value;
        }
        ICapabilitiesNet.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ICapabilitiesNet}
        */
        ICapabilitiesNet.toObject = function (object) {
            var retValue = ICapabilitiesNet.Unknown;
            if (object != null && object.value != null && ICapabilitiesNet.hasOwnProperty(object.value)) {
                retValue = ICapabilitiesNet[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.ICapabilitiesNet} [GSM='GSM']
        */
        ICapabilitiesNet.GSM = new ICapabilitiesNet("GSM");
        /**
           @property {Adaptive.ICapabilitiesNet} [GPRS='GPRS']
        */
        ICapabilitiesNet.GPRS = new ICapabilitiesNet("GPRS");
        /**
           @property {Adaptive.ICapabilitiesNet} [HSDPA='HSDPA']
        */
        ICapabilitiesNet.HSDPA = new ICapabilitiesNet("HSDPA");
        /**
           @property {Adaptive.ICapabilitiesNet} [LTE='LTE']
        */
        ICapabilitiesNet.LTE = new ICapabilitiesNet("LTE");
        /**
           @property {Adaptive.ICapabilitiesNet} [WIFI='WIFI']
        */
        ICapabilitiesNet.WIFI = new ICapabilitiesNet("WIFI");
        /**
           @property {Adaptive.ICapabilitiesNet} [Ethernet='Ethernet']
        */
        ICapabilitiesNet.Ethernet = new ICapabilitiesNet("Ethernet");
        /**
           @property {Adaptive.ICapabilitiesNet} [Unavailable='Unavailable']
        */
        ICapabilitiesNet.Unavailable = new ICapabilitiesNet("Unavailable");
        /**
           @property {Adaptive.ICapabilitiesNet} [Unknown='Unknown']
        */
        ICapabilitiesNet.Unknown = new ICapabilitiesNet("Unknown");
        return ICapabilitiesNet;
    })();
    Adaptive.ICapabilitiesNet = ICapabilitiesNet;
    /**
       @enum {Adaptive.ICapabilitiesNotification} Adaptive.ICapabilitiesNotification
       Enumeration ICapabilitiesNotification
    */
    var ICapabilitiesNotification = (function () {
        function ICapabilitiesNotification(value) {
            this.value = value;
        }
        ICapabilitiesNotification.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ICapabilitiesNotification}
        */
        ICapabilitiesNotification.toObject = function (object) {
            var retValue = ICapabilitiesNotification.Unknown;
            if (object != null && object.value != null && ICapabilitiesNotification.hasOwnProperty(object.value)) {
                retValue = ICapabilitiesNotification[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.ICapabilitiesNotification} [Alarm='Alarm']
        */
        ICapabilitiesNotification.Alarm = new ICapabilitiesNotification("Alarm");
        /**
           @property {Adaptive.ICapabilitiesNotification} [LocalNotification='LocalNotification']
        */
        ICapabilitiesNotification.LocalNotification = new ICapabilitiesNotification("LocalNotification");
        /**
           @property {Adaptive.ICapabilitiesNotification} [RemoteNotification='RemoteNotification']
        */
        ICapabilitiesNotification.RemoteNotification = new ICapabilitiesNotification("RemoteNotification");
        /**
           @property {Adaptive.ICapabilitiesNotification} [Vibration='Vibration']
        */
        ICapabilitiesNotification.Vibration = new ICapabilitiesNotification("Vibration");
        /**
           @property {Adaptive.ICapabilitiesNotification} [Unknown='Unknown']
        */
        ICapabilitiesNotification.Unknown = new ICapabilitiesNotification("Unknown");
        return ICapabilitiesNotification;
    })();
    Adaptive.ICapabilitiesNotification = ICapabilitiesNotification;
    /**
       @enum {Adaptive.ICapabilitiesOrientation} Adaptive.ICapabilitiesOrientation
       Enumeration ICapabilitiesOrientation
    */
    var ICapabilitiesOrientation = (function () {
        function ICapabilitiesOrientation(value) {
            this.value = value;
        }
        ICapabilitiesOrientation.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ICapabilitiesOrientation}
        */
        ICapabilitiesOrientation.toObject = function (object) {
            var retValue = ICapabilitiesOrientation.Unknown;
            if (object != null && object.value != null && ICapabilitiesOrientation.hasOwnProperty(object.value)) {
                retValue = ICapabilitiesOrientation[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.ICapabilitiesOrientation} [PortraitUp='PortraitUp']
        */
        ICapabilitiesOrientation.PortraitUp = new ICapabilitiesOrientation("PortraitUp");
        /**
           @property {Adaptive.ICapabilitiesOrientation} [PortraitDown='PortraitDown']
        */
        ICapabilitiesOrientation.PortraitDown = new ICapabilitiesOrientation("PortraitDown");
        /**
           @property {Adaptive.ICapabilitiesOrientation} [LandscapeLeft='LandscapeLeft']
        */
        ICapabilitiesOrientation.LandscapeLeft = new ICapabilitiesOrientation("LandscapeLeft");
        /**
           @property {Adaptive.ICapabilitiesOrientation} [LandscapeRight='LandscapeRight']
        */
        ICapabilitiesOrientation.LandscapeRight = new ICapabilitiesOrientation("LandscapeRight");
        /**
           @property {Adaptive.ICapabilitiesOrientation} [Unknown='Unknown']
        */
        ICapabilitiesOrientation.Unknown = new ICapabilitiesOrientation("Unknown");
        return ICapabilitiesOrientation;
    })();
    Adaptive.ICapabilitiesOrientation = ICapabilitiesOrientation;
    /**
       @enum {Adaptive.ICapabilitiesSensor} Adaptive.ICapabilitiesSensor
       Enumeration ICapabilitiesSensor
    */
    var ICapabilitiesSensor = (function () {
        function ICapabilitiesSensor(value) {
            this.value = value;
        }
        ICapabilitiesSensor.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ICapabilitiesSensor}
        */
        ICapabilitiesSensor.toObject = function (object) {
            var retValue = ICapabilitiesSensor.Unknown;
            if (object != null && object.value != null && ICapabilitiesSensor.hasOwnProperty(object.value)) {
                retValue = ICapabilitiesSensor[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.ICapabilitiesSensor} [Accelerometer='Accelerometer']
        */
        ICapabilitiesSensor.Accelerometer = new ICapabilitiesSensor("Accelerometer");
        /**
           @property {Adaptive.ICapabilitiesSensor} [AmbientLight='AmbientLight']
        */
        ICapabilitiesSensor.AmbientLight = new ICapabilitiesSensor("AmbientLight");
        /**
           @property {Adaptive.ICapabilitiesSensor} [Barometer='Barometer']
        */
        ICapabilitiesSensor.Barometer = new ICapabilitiesSensor("Barometer");
        /**
           @property {Adaptive.ICapabilitiesSensor} [Geolocation='Geolocation']
        */
        ICapabilitiesSensor.Geolocation = new ICapabilitiesSensor("Geolocation");
        /**
           @property {Adaptive.ICapabilitiesSensor} [Gyroscope='Gyroscope']
        */
        ICapabilitiesSensor.Gyroscope = new ICapabilitiesSensor("Gyroscope");
        /**
           @property {Adaptive.ICapabilitiesSensor} [Magnetometer='Magnetometer']
        */
        ICapabilitiesSensor.Magnetometer = new ICapabilitiesSensor("Magnetometer");
        /**
           @property {Adaptive.ICapabilitiesSensor} [Proximity='Proximity']
        */
        ICapabilitiesSensor.Proximity = new ICapabilitiesSensor("Proximity");
        /**
           @property {Adaptive.ICapabilitiesSensor} [Unknown='Unknown']
        */
        ICapabilitiesSensor.Unknown = new ICapabilitiesSensor("Unknown");
        return ICapabilitiesSensor;
    })();
    Adaptive.ICapabilitiesSensor = ICapabilitiesSensor;
    /**
       @enum {Adaptive.IContactFieldGroup} Adaptive.IContactFieldGroup
       Enumeration IContactFieldGroup
    */
    var IContactFieldGroup = (function () {
        function IContactFieldGroup(value) {
            this.value = value;
        }
        IContactFieldGroup.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IContactFieldGroup}
        */
        IContactFieldGroup.toObject = function (object) {
            var retValue = IContactFieldGroup.Unknown;
            if (object != null && object.value != null && IContactFieldGroup.hasOwnProperty(object.value)) {
                retValue = IContactFieldGroup[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IContactFieldGroup} [PersonalInfo='PersonalInfo']
        */
        IContactFieldGroup.PersonalInfo = new IContactFieldGroup("PersonalInfo");
        /**
           @property {Adaptive.IContactFieldGroup} [ProfessionalInfo='ProfessionalInfo']
        */
        IContactFieldGroup.ProfessionalInfo = new IContactFieldGroup("ProfessionalInfo");
        /**
           @property {Adaptive.IContactFieldGroup} [Addresses='Addresses']
        */
        IContactFieldGroup.Addresses = new IContactFieldGroup("Addresses");
        /**
           @property {Adaptive.IContactFieldGroup} [Phones='Phones']
        */
        IContactFieldGroup.Phones = new IContactFieldGroup("Phones");
        /**
           @property {Adaptive.IContactFieldGroup} [Emails='Emails']
        */
        IContactFieldGroup.Emails = new IContactFieldGroup("Emails");
        /**
           @property {Adaptive.IContactFieldGroup} [Websites='Websites']
        */
        IContactFieldGroup.Websites = new IContactFieldGroup("Websites");
        /**
           @property {Adaptive.IContactFieldGroup} [Socials='Socials']
        */
        IContactFieldGroup.Socials = new IContactFieldGroup("Socials");
        /**
           @property {Adaptive.IContactFieldGroup} [Tags='Tags']
        */
        IContactFieldGroup.Tags = new IContactFieldGroup("Tags");
        /**
           @property {Adaptive.IContactFieldGroup} [Unknown='Unknown']
        */
        IContactFieldGroup.Unknown = new IContactFieldGroup("Unknown");
        return IContactFieldGroup;
    })();
    Adaptive.IContactFieldGroup = IContactFieldGroup;
    /**
       @enum {Adaptive.IContactFilter} Adaptive.IContactFilter
       Enumeration IContactFilter
    */
    var IContactFilter = (function () {
        function IContactFilter(value) {
            this.value = value;
        }
        IContactFilter.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IContactFilter}
        */
        IContactFilter.toObject = function (object) {
            var retValue = IContactFilter.Unknown;
            if (object != null && object.value != null && IContactFilter.hasOwnProperty(object.value)) {
                retValue = IContactFilter[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IContactFilter} [HasPhone='HasPhone']
        */
        IContactFilter.HasPhone = new IContactFilter("HasPhone");
        /**
           @property {Adaptive.IContactFilter} [HasEmail='HasEmail']
        */
        IContactFilter.HasEmail = new IContactFilter("HasEmail");
        /**
           @property {Adaptive.IContactFilter} [HasAddress='HasAddress']
        */
        IContactFilter.HasAddress = new IContactFilter("HasAddress");
        /**
           @property {Adaptive.IContactFilter} [Unknown='Unknown']
        */
        IContactFilter.Unknown = new IContactFilter("Unknown");
        return IContactFilter;
    })();
    Adaptive.IContactFilter = IContactFilter;
    /**
       @enum {Adaptive.IContactPhotoResultCallbackError} Adaptive.IContactPhotoResultCallbackError
       Enumeration IContactPhotoResultCallbackError
    */
    var IContactPhotoResultCallbackError = (function () {
        function IContactPhotoResultCallbackError(value) {
            this.value = value;
        }
        IContactPhotoResultCallbackError.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IContactPhotoResultCallbackError}
        */
        IContactPhotoResultCallbackError.toObject = function (object) {
            var retValue = IContactPhotoResultCallbackError.Unknown;
            if (object != null && object.value != null && IContactPhotoResultCallbackError.hasOwnProperty(object.value)) {
                retValue = IContactPhotoResultCallbackError[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IContactPhotoResultCallbackError} [NoPermission='NoPermission']
        */
        IContactPhotoResultCallbackError.NoPermission = new IContactPhotoResultCallbackError("NoPermission");
        /**
           @property {Adaptive.IContactPhotoResultCallbackError} [WrongParams='WrongParams']
        */
        IContactPhotoResultCallbackError.WrongParams = new IContactPhotoResultCallbackError("WrongParams");
        /**
           @property {Adaptive.IContactPhotoResultCallbackError} [NoPhoto='NoPhoto']
        */
        IContactPhotoResultCallbackError.NoPhoto = new IContactPhotoResultCallbackError("NoPhoto");
        /**
           @property {Adaptive.IContactPhotoResultCallbackError} [Unknown='Unknown']
        */
        IContactPhotoResultCallbackError.Unknown = new IContactPhotoResultCallbackError("Unknown");
        return IContactPhotoResultCallbackError;
    })();
    Adaptive.IContactPhotoResultCallbackError = IContactPhotoResultCallbackError;
    /**
       @enum {Adaptive.IContactPhotoResultCallbackWarning} Adaptive.IContactPhotoResultCallbackWarning
       Enumeration IContactPhotoResultCallbackWarning
    */
    var IContactPhotoResultCallbackWarning = (function () {
        function IContactPhotoResultCallbackWarning(value) {
            this.value = value;
        }
        IContactPhotoResultCallbackWarning.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IContactPhotoResultCallbackWarning}
        */
        IContactPhotoResultCallbackWarning.toObject = function (object) {
            var retValue = IContactPhotoResultCallbackWarning.Unknown;
            if (object != null && object.value != null && IContactPhotoResultCallbackWarning.hasOwnProperty(object.value)) {
                retValue = IContactPhotoResultCallbackWarning[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IContactPhotoResultCallbackWarning} [LimitExceeded='LimitExceeded']
        */
        IContactPhotoResultCallbackWarning.LimitExceeded = new IContactPhotoResultCallbackWarning("LimitExceeded");
        /**
           @property {Adaptive.IContactPhotoResultCallbackWarning} [NoMatches='NoMatches']
        */
        IContactPhotoResultCallbackWarning.NoMatches = new IContactPhotoResultCallbackWarning("NoMatches");
        /**
           @property {Adaptive.IContactPhotoResultCallbackWarning} [Unknown='Unknown']
        */
        IContactPhotoResultCallbackWarning.Unknown = new IContactPhotoResultCallbackWarning("Unknown");
        return IContactPhotoResultCallbackWarning;
    })();
    Adaptive.IContactPhotoResultCallbackWarning = IContactPhotoResultCallbackWarning;
    /**
       @enum {Adaptive.IContactResultCallbackError} Adaptive.IContactResultCallbackError
       Enumeration IContactResultCallbackError
    */
    var IContactResultCallbackError = (function () {
        function IContactResultCallbackError(value) {
            this.value = value;
        }
        IContactResultCallbackError.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IContactResultCallbackError}
        */
        IContactResultCallbackError.toObject = function (object) {
            var retValue = IContactResultCallbackError.Unknown;
            if (object != null && object.value != null && IContactResultCallbackError.hasOwnProperty(object.value)) {
                retValue = IContactResultCallbackError[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IContactResultCallbackError} [NoPermission='NoPermission']
        */
        IContactResultCallbackError.NoPermission = new IContactResultCallbackError("NoPermission");
        /**
           @property {Adaptive.IContactResultCallbackError} [WrongParams='WrongParams']
        */
        IContactResultCallbackError.WrongParams = new IContactResultCallbackError("WrongParams");
        /**
           @property {Adaptive.IContactResultCallbackError} [Unknown='Unknown']
        */
        IContactResultCallbackError.Unknown = new IContactResultCallbackError("Unknown");
        return IContactResultCallbackError;
    })();
    Adaptive.IContactResultCallbackError = IContactResultCallbackError;
    /**
       @enum {Adaptive.IContactResultCallbackWarning} Adaptive.IContactResultCallbackWarning
       Enumeration IContactResultCallbackWarning
    */
    var IContactResultCallbackWarning = (function () {
        function IContactResultCallbackWarning(value) {
            this.value = value;
        }
        IContactResultCallbackWarning.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IContactResultCallbackWarning}
        */
        IContactResultCallbackWarning.toObject = function (object) {
            var retValue = IContactResultCallbackWarning.Unknown;
            if (object != null && object.value != null && IContactResultCallbackWarning.hasOwnProperty(object.value)) {
                retValue = IContactResultCallbackWarning[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IContactResultCallbackWarning} [LimitExceeded='LimitExceeded']
        */
        IContactResultCallbackWarning.LimitExceeded = new IContactResultCallbackWarning("LimitExceeded");
        /**
           @property {Adaptive.IContactResultCallbackWarning} [NoMatches='NoMatches']
        */
        IContactResultCallbackWarning.NoMatches = new IContactResultCallbackWarning("NoMatches");
        /**
           @property {Adaptive.IContactResultCallbackWarning} [Unknown='Unknown']
        */
        IContactResultCallbackWarning.Unknown = new IContactResultCallbackWarning("Unknown");
        return IContactResultCallbackWarning;
    })();
    Adaptive.IContactResultCallbackWarning = IContactResultCallbackWarning;
    /**
       @enum {Adaptive.IDatabaseResultCallbackError} Adaptive.IDatabaseResultCallbackError
       Enumeration IDatabaseResultCallbackError
    */
    var IDatabaseResultCallbackError = (function () {
        function IDatabaseResultCallbackError(value) {
            this.value = value;
        }
        IDatabaseResultCallbackError.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IDatabaseResultCallbackError}
        */
        IDatabaseResultCallbackError.toObject = function (object) {
            var retValue = IDatabaseResultCallbackError.Unknown;
            if (object != null && object.value != null && IDatabaseResultCallbackError.hasOwnProperty(object.value)) {
                retValue = IDatabaseResultCallbackError[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IDatabaseResultCallbackError} [NoSpace='NoSpace']
        */
        IDatabaseResultCallbackError.NoSpace = new IDatabaseResultCallbackError("NoSpace");
        /**
           @property {Adaptive.IDatabaseResultCallbackError} [SqlException='SqlException']
        */
        IDatabaseResultCallbackError.SqlException = new IDatabaseResultCallbackError("SqlException");
        /**
           @property {Adaptive.IDatabaseResultCallbackError} [NotDeleted='NotDeleted']
        */
        IDatabaseResultCallbackError.NotDeleted = new IDatabaseResultCallbackError("NotDeleted");
        /**
           @property {Adaptive.IDatabaseResultCallbackError} [Unknown='Unknown']
        */
        IDatabaseResultCallbackError.Unknown = new IDatabaseResultCallbackError("Unknown");
        return IDatabaseResultCallbackError;
    })();
    Adaptive.IDatabaseResultCallbackError = IDatabaseResultCallbackError;
    /**
       @enum {Adaptive.IDatabaseResultCallbackWarning} Adaptive.IDatabaseResultCallbackWarning
       Enumeration IDatabaseResultCallbackWarning
    */
    var IDatabaseResultCallbackWarning = (function () {
        function IDatabaseResultCallbackWarning(value) {
            this.value = value;
        }
        IDatabaseResultCallbackWarning.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IDatabaseResultCallbackWarning}
        */
        IDatabaseResultCallbackWarning.toObject = function (object) {
            var retValue = IDatabaseResultCallbackWarning.Unknown;
            if (object != null && object.value != null && IDatabaseResultCallbackWarning.hasOwnProperty(object.value)) {
                retValue = IDatabaseResultCallbackWarning[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IDatabaseResultCallbackWarning} [DatabaseExists='DatabaseExists']
        */
        IDatabaseResultCallbackWarning.DatabaseExists = new IDatabaseResultCallbackWarning("DatabaseExists");
        /**
           @property {Adaptive.IDatabaseResultCallbackWarning} [IsOpen='IsOpen']
        */
        IDatabaseResultCallbackWarning.IsOpen = new IDatabaseResultCallbackWarning("IsOpen");
        /**
           @property {Adaptive.IDatabaseResultCallbackWarning} [Unknown='Unknown']
        */
        IDatabaseResultCallbackWarning.Unknown = new IDatabaseResultCallbackWarning("Unknown");
        return IDatabaseResultCallbackWarning;
    })();
    Adaptive.IDatabaseResultCallbackWarning = IDatabaseResultCallbackWarning;
    /**
       @enum {Adaptive.IDatabaseTableResultCallbackError} Adaptive.IDatabaseTableResultCallbackError
       Enumeration IDatabaseTableResultCallbackError
    */
    var IDatabaseTableResultCallbackError = (function () {
        function IDatabaseTableResultCallbackError(value) {
            this.value = value;
        }
        IDatabaseTableResultCallbackError.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IDatabaseTableResultCallbackError}
        */
        IDatabaseTableResultCallbackError.toObject = function (object) {
            var retValue = IDatabaseTableResultCallbackError.Unknown;
            if (object != null && object.value != null && IDatabaseTableResultCallbackError.hasOwnProperty(object.value)) {
                retValue = IDatabaseTableResultCallbackError[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IDatabaseTableResultCallbackError} [NoSpace='NoSpace']
        */
        IDatabaseTableResultCallbackError.NoSpace = new IDatabaseTableResultCallbackError("NoSpace");
        /**
           @property {Adaptive.IDatabaseTableResultCallbackError} [ReadOnlyTable='ReadOnlyTable']
        */
        IDatabaseTableResultCallbackError.ReadOnlyTable = new IDatabaseTableResultCallbackError("ReadOnlyTable");
        /**
           @property {Adaptive.IDatabaseTableResultCallbackError} [SqlException='SqlException']
        */
        IDatabaseTableResultCallbackError.SqlException = new IDatabaseTableResultCallbackError("SqlException");
        /**
           @property {Adaptive.IDatabaseTableResultCallbackError} [DatabaseNotFound='DatabaseNotFound']
        */
        IDatabaseTableResultCallbackError.DatabaseNotFound = new IDatabaseTableResultCallbackError("DatabaseNotFound");
        /**
           @property {Adaptive.IDatabaseTableResultCallbackError} [NoTableFound='NoTableFound']
        */
        IDatabaseTableResultCallbackError.NoTableFound = new IDatabaseTableResultCallbackError("NoTableFound");
        /**
           @property {Adaptive.IDatabaseTableResultCallbackError} [Unknown='Unknown']
        */
        IDatabaseTableResultCallbackError.Unknown = new IDatabaseTableResultCallbackError("Unknown");
        return IDatabaseTableResultCallbackError;
    })();
    Adaptive.IDatabaseTableResultCallbackError = IDatabaseTableResultCallbackError;
    /**
       @enum {Adaptive.IDatabaseTableResultCallbackWarning} Adaptive.IDatabaseTableResultCallbackWarning
       Enumeration IDatabaseTableResultCallbackWarning
    */
    var IDatabaseTableResultCallbackWarning = (function () {
        function IDatabaseTableResultCallbackWarning(value) {
            this.value = value;
        }
        IDatabaseTableResultCallbackWarning.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IDatabaseTableResultCallbackWarning}
        */
        IDatabaseTableResultCallbackWarning.toObject = function (object) {
            var retValue = IDatabaseTableResultCallbackWarning.Unknown;
            if (object != null && object.value != null && IDatabaseTableResultCallbackWarning.hasOwnProperty(object.value)) {
                retValue = IDatabaseTableResultCallbackWarning[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IDatabaseTableResultCallbackWarning} [TableExists='TableExists']
        */
        IDatabaseTableResultCallbackWarning.TableExists = new IDatabaseTableResultCallbackWarning("TableExists");
        /**
           @property {Adaptive.IDatabaseTableResultCallbackWarning} [TableLocked='TableLocked']
        */
        IDatabaseTableResultCallbackWarning.TableLocked = new IDatabaseTableResultCallbackWarning("TableLocked");
        /**
           @property {Adaptive.IDatabaseTableResultCallbackWarning} [NoResults='NoResults']
        */
        IDatabaseTableResultCallbackWarning.NoResults = new IDatabaseTableResultCallbackWarning("NoResults");
        /**
           @property {Adaptive.IDatabaseTableResultCallbackWarning} [Unknown='Unknown']
        */
        IDatabaseTableResultCallbackWarning.Unknown = new IDatabaseTableResultCallbackWarning("Unknown");
        return IDatabaseTableResultCallbackWarning;
    })();
    Adaptive.IDatabaseTableResultCallbackWarning = IDatabaseTableResultCallbackWarning;
    /**
       @enum {Adaptive.IDeviceOrientationListenerError} Adaptive.IDeviceOrientationListenerError
       Enumeration IDeviceOrientationListenerError
    */
    var IDeviceOrientationListenerError = (function () {
        function IDeviceOrientationListenerError(value) {
            this.value = value;
        }
        IDeviceOrientationListenerError.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IDeviceOrientationListenerError}
        */
        IDeviceOrientationListenerError.toObject = function (object) {
            var retValue = IDeviceOrientationListenerError.Unknown;
            if (object != null && object.value != null && IDeviceOrientationListenerError.hasOwnProperty(object.value)) {
                retValue = IDeviceOrientationListenerError[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IDeviceOrientationListenerError} [Unknown='Unknown']
        */
        IDeviceOrientationListenerError.Unknown = new IDeviceOrientationListenerError("Unknown");
        return IDeviceOrientationListenerError;
    })();
    Adaptive.IDeviceOrientationListenerError = IDeviceOrientationListenerError;
    /**
       @enum {Adaptive.IDeviceOrientationListenerWarning} Adaptive.IDeviceOrientationListenerWarning
       Enumeration IDeviceOrientationListenerWarning
    */
    var IDeviceOrientationListenerWarning = (function () {
        function IDeviceOrientationListenerWarning(value) {
            this.value = value;
        }
        IDeviceOrientationListenerWarning.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IDeviceOrientationListenerWarning}
        */
        IDeviceOrientationListenerWarning.toObject = function (object) {
            var retValue = IDeviceOrientationListenerWarning.Unknown;
            if (object != null && object.value != null && IDeviceOrientationListenerWarning.hasOwnProperty(object.value)) {
                retValue = IDeviceOrientationListenerWarning[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IDeviceOrientationListenerWarning} [Unknown='Unknown']
        */
        IDeviceOrientationListenerWarning.Unknown = new IDeviceOrientationListenerWarning("Unknown");
        return IDeviceOrientationListenerWarning;
    })();
    Adaptive.IDeviceOrientationListenerWarning = IDeviceOrientationListenerWarning;
    /**
       @enum {Adaptive.IDisplayOrientationListenerError} Adaptive.IDisplayOrientationListenerError
       Enumeration IDisplayOrientationListenerError
    */
    var IDisplayOrientationListenerError = (function () {
        function IDisplayOrientationListenerError(value) {
            this.value = value;
        }
        IDisplayOrientationListenerError.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IDisplayOrientationListenerError}
        */
        IDisplayOrientationListenerError.toObject = function (object) {
            var retValue = IDisplayOrientationListenerError.Unknown;
            if (object != null && object.value != null && IDisplayOrientationListenerError.hasOwnProperty(object.value)) {
                retValue = IDisplayOrientationListenerError[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IDisplayOrientationListenerError} [Unknown='Unknown']
        */
        IDisplayOrientationListenerError.Unknown = new IDisplayOrientationListenerError("Unknown");
        return IDisplayOrientationListenerError;
    })();
    Adaptive.IDisplayOrientationListenerError = IDisplayOrientationListenerError;
    /**
       @enum {Adaptive.IDisplayOrientationListenerWarning} Adaptive.IDisplayOrientationListenerWarning
       Enumeration IDisplayOrientationListenerWarning
    */
    var IDisplayOrientationListenerWarning = (function () {
        function IDisplayOrientationListenerWarning(value) {
            this.value = value;
        }
        IDisplayOrientationListenerWarning.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IDisplayOrientationListenerWarning}
        */
        IDisplayOrientationListenerWarning.toObject = function (object) {
            var retValue = IDisplayOrientationListenerWarning.Unknown;
            if (object != null && object.value != null && IDisplayOrientationListenerWarning.hasOwnProperty(object.value)) {
                retValue = IDisplayOrientationListenerWarning[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IDisplayOrientationListenerWarning} [ApplicationVetoed='ApplicationVetoed']
        */
        IDisplayOrientationListenerWarning.ApplicationVetoed = new IDisplayOrientationListenerWarning("ApplicationVetoed");
        /**
           @property {Adaptive.IDisplayOrientationListenerWarning} [Unknown='Unknown']
        */
        IDisplayOrientationListenerWarning.Unknown = new IDisplayOrientationListenerWarning("Unknown");
        return IDisplayOrientationListenerWarning;
    })();
    Adaptive.IDisplayOrientationListenerWarning = IDisplayOrientationListenerWarning;
    /**
       @enum {Adaptive.IFileDataLoadResultCallbackError} Adaptive.IFileDataLoadResultCallbackError
       Enumeration IFileDataLoadResultCallbackError
    */
    var IFileDataLoadResultCallbackError = (function () {
        function IFileDataLoadResultCallbackError(value) {
            this.value = value;
        }
        IFileDataLoadResultCallbackError.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IFileDataLoadResultCallbackError}
        */
        IFileDataLoadResultCallbackError.toObject = function (object) {
            var retValue = IFileDataLoadResultCallbackError.Unknown;
            if (object != null && object.value != null && IFileDataLoadResultCallbackError.hasOwnProperty(object.value)) {
                retValue = IFileDataLoadResultCallbackError[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IFileDataLoadResultCallbackError} [InexistentFile='InexistentFile']
        */
        IFileDataLoadResultCallbackError.InexistentFile = new IFileDataLoadResultCallbackError("InexistentFile");
        /**
           @property {Adaptive.IFileDataLoadResultCallbackError} [InsufficientSpace='InsufficientSpace']
        */
        IFileDataLoadResultCallbackError.InsufficientSpace = new IFileDataLoadResultCallbackError("InsufficientSpace");
        /**
           @property {Adaptive.IFileDataLoadResultCallbackError} [Unauthorized='Unauthorized']
        */
        IFileDataLoadResultCallbackError.Unauthorized = new IFileDataLoadResultCallbackError("Unauthorized");
        /**
           @property {Adaptive.IFileDataLoadResultCallbackError} [Unknown='Unknown']
        */
        IFileDataLoadResultCallbackError.Unknown = new IFileDataLoadResultCallbackError("Unknown");
        return IFileDataLoadResultCallbackError;
    })();
    Adaptive.IFileDataLoadResultCallbackError = IFileDataLoadResultCallbackError;
    /**
       @enum {Adaptive.IFileDataLoadResultCallbackWarning} Adaptive.IFileDataLoadResultCallbackWarning
       Enumeration IFileDataLoadResultCallbackWarning
    */
    var IFileDataLoadResultCallbackWarning = (function () {
        function IFileDataLoadResultCallbackWarning(value) {
            this.value = value;
        }
        IFileDataLoadResultCallbackWarning.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IFileDataLoadResultCallbackWarning}
        */
        IFileDataLoadResultCallbackWarning.toObject = function (object) {
            var retValue = IFileDataLoadResultCallbackWarning.Unknown;
            if (object != null && object.value != null && IFileDataLoadResultCallbackWarning.hasOwnProperty(object.value)) {
                retValue = IFileDataLoadResultCallbackWarning[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IFileDataLoadResultCallbackWarning} [ExceedMaximumSize='ExceedMaximumSize']
        */
        IFileDataLoadResultCallbackWarning.ExceedMaximumSize = new IFileDataLoadResultCallbackWarning("ExceedMaximumSize");
        /**
           @property {Adaptive.IFileDataLoadResultCallbackWarning} [Unknown='Unknown']
        */
        IFileDataLoadResultCallbackWarning.Unknown = new IFileDataLoadResultCallbackWarning("Unknown");
        return IFileDataLoadResultCallbackWarning;
    })();
    Adaptive.IFileDataLoadResultCallbackWarning = IFileDataLoadResultCallbackWarning;
    /**
       @enum {Adaptive.IFileDataStoreResultCallbackError} Adaptive.IFileDataStoreResultCallbackError
       Enumeration IFileDataStoreResultCallbackError
    */
    var IFileDataStoreResultCallbackError = (function () {
        function IFileDataStoreResultCallbackError(value) {
            this.value = value;
        }
        IFileDataStoreResultCallbackError.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IFileDataStoreResultCallbackError}
        */
        IFileDataStoreResultCallbackError.toObject = function (object) {
            var retValue = IFileDataStoreResultCallbackError.Unknown;
            if (object != null && object.value != null && IFileDataStoreResultCallbackError.hasOwnProperty(object.value)) {
                retValue = IFileDataStoreResultCallbackError[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IFileDataStoreResultCallbackError} [InexistentFile='InexistentFile']
        */
        IFileDataStoreResultCallbackError.InexistentFile = new IFileDataStoreResultCallbackError("InexistentFile");
        /**
           @property {Adaptive.IFileDataStoreResultCallbackError} [InsufficientSpace='InsufficientSpace']
        */
        IFileDataStoreResultCallbackError.InsufficientSpace = new IFileDataStoreResultCallbackError("InsufficientSpace");
        /**
           @property {Adaptive.IFileDataStoreResultCallbackError} [Unauthorized='Unauthorized']
        */
        IFileDataStoreResultCallbackError.Unauthorized = new IFileDataStoreResultCallbackError("Unauthorized");
        /**
           @property {Adaptive.IFileDataStoreResultCallbackError} [Unknown='Unknown']
        */
        IFileDataStoreResultCallbackError.Unknown = new IFileDataStoreResultCallbackError("Unknown");
        return IFileDataStoreResultCallbackError;
    })();
    Adaptive.IFileDataStoreResultCallbackError = IFileDataStoreResultCallbackError;
    /**
       @enum {Adaptive.IFileDataStoreResultCallbackWarning} Adaptive.IFileDataStoreResultCallbackWarning
       Enumeration IFileDataStoreResultCallbackWarning
    */
    var IFileDataStoreResultCallbackWarning = (function () {
        function IFileDataStoreResultCallbackWarning(value) {
            this.value = value;
        }
        IFileDataStoreResultCallbackWarning.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IFileDataStoreResultCallbackWarning}
        */
        IFileDataStoreResultCallbackWarning.toObject = function (object) {
            var retValue = IFileDataStoreResultCallbackWarning.Unknown;
            if (object != null && object.value != null && IFileDataStoreResultCallbackWarning.hasOwnProperty(object.value)) {
                retValue = IFileDataStoreResultCallbackWarning[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IFileDataStoreResultCallbackWarning} [ExceedMaximumSize='ExceedMaximumSize']
        */
        IFileDataStoreResultCallbackWarning.ExceedMaximumSize = new IFileDataStoreResultCallbackWarning("ExceedMaximumSize");
        /**
           @property {Adaptive.IFileDataStoreResultCallbackWarning} [Unknown='Unknown']
        */
        IFileDataStoreResultCallbackWarning.Unknown = new IFileDataStoreResultCallbackWarning("Unknown");
        return IFileDataStoreResultCallbackWarning;
    })();
    Adaptive.IFileDataStoreResultCallbackWarning = IFileDataStoreResultCallbackWarning;
    /**
       @enum {Adaptive.IFileListResultCallbackError} Adaptive.IFileListResultCallbackError
       Enumeration IFileListResultCallbackError
    */
    var IFileListResultCallbackError = (function () {
        function IFileListResultCallbackError(value) {
            this.value = value;
        }
        IFileListResultCallbackError.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IFileListResultCallbackError}
        */
        IFileListResultCallbackError.toObject = function (object) {
            var retValue = IFileListResultCallbackError.Unknown;
            if (object != null && object.value != null && IFileListResultCallbackError.hasOwnProperty(object.value)) {
                retValue = IFileListResultCallbackError[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IFileListResultCallbackError} [InexistentFile='InexistentFile']
        */
        IFileListResultCallbackError.InexistentFile = new IFileListResultCallbackError("InexistentFile");
        /**
           @property {Adaptive.IFileListResultCallbackError} [Unauthorized='Unauthorized']
        */
        IFileListResultCallbackError.Unauthorized = new IFileListResultCallbackError("Unauthorized");
        /**
           @property {Adaptive.IFileListResultCallbackError} [Unknown='Unknown']
        */
        IFileListResultCallbackError.Unknown = new IFileListResultCallbackError("Unknown");
        return IFileListResultCallbackError;
    })();
    Adaptive.IFileListResultCallbackError = IFileListResultCallbackError;
    /**
       @enum {Adaptive.IFileListResultCallbackWarning} Adaptive.IFileListResultCallbackWarning
       Enumeration IFileListResultCallbackWarning
    */
    var IFileListResultCallbackWarning = (function () {
        function IFileListResultCallbackWarning(value) {
            this.value = value;
        }
        IFileListResultCallbackWarning.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IFileListResultCallbackWarning}
        */
        IFileListResultCallbackWarning.toObject = function (object) {
            var retValue = IFileListResultCallbackWarning.Unknown;
            if (object != null && object.value != null && IFileListResultCallbackWarning.hasOwnProperty(object.value)) {
                retValue = IFileListResultCallbackWarning[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IFileListResultCallbackWarning} [PartialResult='PartialResult']
        */
        IFileListResultCallbackWarning.PartialResult = new IFileListResultCallbackWarning("PartialResult");
        /**
           @property {Adaptive.IFileListResultCallbackWarning} [Unknown='Unknown']
        */
        IFileListResultCallbackWarning.Unknown = new IFileListResultCallbackWarning("Unknown");
        return IFileListResultCallbackWarning;
    })();
    Adaptive.IFileListResultCallbackWarning = IFileListResultCallbackWarning;
    /**
       @enum {Adaptive.IFileResultCallbackError} Adaptive.IFileResultCallbackError
       Enumeration IFileResultCallbackError
    */
    var IFileResultCallbackError = (function () {
        function IFileResultCallbackError(value) {
            this.value = value;
        }
        IFileResultCallbackError.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IFileResultCallbackError}
        */
        IFileResultCallbackError.toObject = function (object) {
            var retValue = IFileResultCallbackError.Unknown;
            if (object != null && object.value != null && IFileResultCallbackError.hasOwnProperty(object.value)) {
                retValue = IFileResultCallbackError[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IFileResultCallbackError} [FileExists='FileExists']
        */
        IFileResultCallbackError.FileExists = new IFileResultCallbackError("FileExists");
        /**
           @property {Adaptive.IFileResultCallbackError} [SourceInexistent='SourceInexistent']
        */
        IFileResultCallbackError.SourceInexistent = new IFileResultCallbackError("SourceInexistent");
        /**
           @property {Adaptive.IFileResultCallbackError} [DestionationExists='DestionationExists']
        */
        IFileResultCallbackError.DestionationExists = new IFileResultCallbackError("DestionationExists");
        /**
           @property {Adaptive.IFileResultCallbackError} [InsufficientSpace='InsufficientSpace']
        */
        IFileResultCallbackError.InsufficientSpace = new IFileResultCallbackError("InsufficientSpace");
        /**
           @property {Adaptive.IFileResultCallbackError} [Unauthorized='Unauthorized']
        */
        IFileResultCallbackError.Unauthorized = new IFileResultCallbackError("Unauthorized");
        /**
           @property {Adaptive.IFileResultCallbackError} [Unknown='Unknown']
        */
        IFileResultCallbackError.Unknown = new IFileResultCallbackError("Unknown");
        return IFileResultCallbackError;
    })();
    Adaptive.IFileResultCallbackError = IFileResultCallbackError;
    /**
       @enum {Adaptive.IFileResultCallbackWarning} Adaptive.IFileResultCallbackWarning
       Enumeration IFileResultCallbackWarning
    */
    var IFileResultCallbackWarning = (function () {
        function IFileResultCallbackWarning(value) {
            this.value = value;
        }
        IFileResultCallbackWarning.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IFileResultCallbackWarning}
        */
        IFileResultCallbackWarning.toObject = function (object) {
            var retValue = IFileResultCallbackWarning.Unknown;
            if (object != null && object.value != null && IFileResultCallbackWarning.hasOwnProperty(object.value)) {
                retValue = IFileResultCallbackWarning[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IFileResultCallbackWarning} [SourceNotDeleted='SourceNotDeleted']
        */
        IFileResultCallbackWarning.SourceNotDeleted = new IFileResultCallbackWarning("SourceNotDeleted");
        /**
           @property {Adaptive.IFileResultCallbackWarning} [RootDirectory='RootDirectory']
        */
        IFileResultCallbackWarning.RootDirectory = new IFileResultCallbackWarning("RootDirectory");
        /**
           @property {Adaptive.IFileResultCallbackWarning} [Unknown='Unknown']
        */
        IFileResultCallbackWarning.Unknown = new IFileResultCallbackWarning("Unknown");
        return IFileResultCallbackWarning;
    })();
    Adaptive.IFileResultCallbackWarning = IFileResultCallbackWarning;
    /**
       @enum {Adaptive.IFileSystemSecurity} Adaptive.IFileSystemSecurity
       Enumeration IFileSystemSecurity
    */
    var IFileSystemSecurity = (function () {
        function IFileSystemSecurity(value) {
            this.value = value;
        }
        IFileSystemSecurity.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IFileSystemSecurity}
        */
        IFileSystemSecurity.toObject = function (object) {
            var retValue = IFileSystemSecurity.Unknown;
            if (object != null && object.value != null && IFileSystemSecurity.hasOwnProperty(object.value)) {
                retValue = IFileSystemSecurity[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IFileSystemSecurity} [Default='Default']
        */
        IFileSystemSecurity.Default = new IFileSystemSecurity("Default");
        /**
           @property {Adaptive.IFileSystemSecurity} [Protected='Protected']
        */
        IFileSystemSecurity.Protected = new IFileSystemSecurity("Protected");
        /**
           @property {Adaptive.IFileSystemSecurity} [Encrypted='Encrypted']
        */
        IFileSystemSecurity.Encrypted = new IFileSystemSecurity("Encrypted");
        /**
           @property {Adaptive.IFileSystemSecurity} [Unknown='Unknown']
        */
        IFileSystemSecurity.Unknown = new IFileSystemSecurity("Unknown");
        return IFileSystemSecurity;
    })();
    Adaptive.IFileSystemSecurity = IFileSystemSecurity;
    /**
       @enum {Adaptive.IFileSystemStorageType} Adaptive.IFileSystemStorageType
       Enumeration IFileSystemStorageType
    */
    var IFileSystemStorageType = (function () {
        function IFileSystemStorageType(value) {
            this.value = value;
        }
        IFileSystemStorageType.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IFileSystemStorageType}
        */
        IFileSystemStorageType.toObject = function (object) {
            var retValue = IFileSystemStorageType.Unknown;
            if (object != null && object.value != null && IFileSystemStorageType.hasOwnProperty(object.value)) {
                retValue = IFileSystemStorageType[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IFileSystemStorageType} [Application='Application']
        */
        IFileSystemStorageType.Application = new IFileSystemStorageType("Application");
        /**
           @property {Adaptive.IFileSystemStorageType} [Document='Document']
        */
        IFileSystemStorageType.Document = new IFileSystemStorageType("Document");
        /**
           @property {Adaptive.IFileSystemStorageType} [Cloud='Cloud']
        */
        IFileSystemStorageType.Cloud = new IFileSystemStorageType("Cloud");
        /**
           @property {Adaptive.IFileSystemStorageType} [Protected='Protected']
        */
        IFileSystemStorageType.Protected = new IFileSystemStorageType("Protected");
        /**
           @property {Adaptive.IFileSystemStorageType} [Cache='Cache']
        */
        IFileSystemStorageType.Cache = new IFileSystemStorageType("Cache");
        /**
           @property {Adaptive.IFileSystemStorageType} [External='External']
        */
        IFileSystemStorageType.External = new IFileSystemStorageType("External");
        /**
           @property {Adaptive.IFileSystemStorageType} [Unknown='Unknown']
        */
        IFileSystemStorageType.Unknown = new IFileSystemStorageType("Unknown");
        return IFileSystemStorageType;
    })();
    Adaptive.IFileSystemStorageType = IFileSystemStorageType;
    /**
       @enum {Adaptive.IFileSystemType} Adaptive.IFileSystemType
       Enumeration IFileSystemType
    */
    var IFileSystemType = (function () {
        function IFileSystemType(value) {
            this.value = value;
        }
        IFileSystemType.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IFileSystemType}
        */
        IFileSystemType.toObject = function (object) {
            var retValue = IFileSystemType.Unknown;
            if (object != null && object.value != null && IFileSystemType.hasOwnProperty(object.value)) {
                retValue = IFileSystemType[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IFileSystemType} [Directory='Directory']
        */
        IFileSystemType.Directory = new IFileSystemType("Directory");
        /**
           @property {Adaptive.IFileSystemType} [File='File']
        */
        IFileSystemType.File = new IFileSystemType("File");
        /**
           @property {Adaptive.IFileSystemType} [Unknown='Unknown']
        */
        IFileSystemType.Unknown = new IFileSystemType("Unknown");
        return IFileSystemType;
    })();
    Adaptive.IFileSystemType = IFileSystemType;
    /**
       @enum {Adaptive.IGeolocationListenerError} Adaptive.IGeolocationListenerError
       Enumeration IGeolocationListenerError
    */
    var IGeolocationListenerError = (function () {
        function IGeolocationListenerError(value) {
            this.value = value;
        }
        IGeolocationListenerError.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IGeolocationListenerError}
        */
        IGeolocationListenerError.toObject = function (object) {
            var retValue = IGeolocationListenerError.Unknown;
            if (object != null && object.value != null && IGeolocationListenerError.hasOwnProperty(object.value)) {
                retValue = IGeolocationListenerError[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IGeolocationListenerError} [Disabled='Disabled']
        */
        IGeolocationListenerError.Disabled = new IGeolocationListenerError("Disabled");
        /**
           @property {Adaptive.IGeolocationListenerError} [RestrictedAccess='RestrictedAccess']
        */
        IGeolocationListenerError.RestrictedAccess = new IGeolocationListenerError("RestrictedAccess");
        /**
           @property {Adaptive.IGeolocationListenerError} [DeniedAccess='DeniedAccess']
        */
        IGeolocationListenerError.DeniedAccess = new IGeolocationListenerError("DeniedAccess");
        /**
           @property {Adaptive.IGeolocationListenerError} [StatusNotDetermined='StatusNotDetermined']
        */
        IGeolocationListenerError.StatusNotDetermined = new IGeolocationListenerError("StatusNotDetermined");
        /**
           @property {Adaptive.IGeolocationListenerError} [Unknown='Unknown']
        */
        IGeolocationListenerError.Unknown = new IGeolocationListenerError("Unknown");
        return IGeolocationListenerError;
    })();
    Adaptive.IGeolocationListenerError = IGeolocationListenerError;
    /**
       @enum {Adaptive.IGeolocationListenerWarning} Adaptive.IGeolocationListenerWarning
       Enumeration IGeolocationListenerWarning
    */
    var IGeolocationListenerWarning = (function () {
        function IGeolocationListenerWarning(value) {
            this.value = value;
        }
        IGeolocationListenerWarning.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IGeolocationListenerWarning}
        */
        IGeolocationListenerWarning.toObject = function (object) {
            var retValue = IGeolocationListenerWarning.Unknown;
            if (object != null && object.value != null && IGeolocationListenerWarning.hasOwnProperty(object.value)) {
                retValue = IGeolocationListenerWarning[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IGeolocationListenerWarning} [HighDoP='HighDoP']
        */
        IGeolocationListenerWarning.HighDoP = new IGeolocationListenerWarning("HighDoP");
        /**
           @property {Adaptive.IGeolocationListenerWarning} [StaleData='StaleData']
        */
        IGeolocationListenerWarning.StaleData = new IGeolocationListenerWarning("StaleData");
        /**
           @property {Adaptive.IGeolocationListenerWarning} [Unknown='Unknown']
        */
        IGeolocationListenerWarning.Unknown = new IGeolocationListenerWarning("Unknown");
        return IGeolocationListenerWarning;
    })();
    Adaptive.IGeolocationListenerWarning = IGeolocationListenerWarning;
    /**
       @enum {Adaptive.ILifecycleListenerError} Adaptive.ILifecycleListenerError
       Enumeration ILifecycleListenerError
    */
    var ILifecycleListenerError = (function () {
        function ILifecycleListenerError(value) {
            this.value = value;
        }
        ILifecycleListenerError.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ILifecycleListenerError}
        */
        ILifecycleListenerError.toObject = function (object) {
            var retValue = ILifecycleListenerError.Unknown;
            if (object != null && object.value != null && ILifecycleListenerError.hasOwnProperty(object.value)) {
                retValue = ILifecycleListenerError[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.ILifecycleListenerError} [Runtime='Runtime']
        */
        ILifecycleListenerError.Runtime = new ILifecycleListenerError("Runtime");
        /**
           @property {Adaptive.ILifecycleListenerError} [Implementation='Implementation']
        */
        ILifecycleListenerError.Implementation = new ILifecycleListenerError("Implementation");
        /**
           @property {Adaptive.ILifecycleListenerError} [Killed='Killed']
        */
        ILifecycleListenerError.Killed = new ILifecycleListenerError("Killed");
        /**
           @property {Adaptive.ILifecycleListenerError} [Unknown='Unknown']
        */
        ILifecycleListenerError.Unknown = new ILifecycleListenerError("Unknown");
        return ILifecycleListenerError;
    })();
    Adaptive.ILifecycleListenerError = ILifecycleListenerError;
    /**
       @enum {Adaptive.ILifecycleListenerWarning} Adaptive.ILifecycleListenerWarning
       Enumeration ILifecycleListenerWarning
    */
    var ILifecycleListenerWarning = (function () {
        function ILifecycleListenerWarning(value) {
            this.value = value;
        }
        ILifecycleListenerWarning.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ILifecycleListenerWarning}
        */
        ILifecycleListenerWarning.toObject = function (object) {
            var retValue = ILifecycleListenerWarning.Unknown;
            if (object != null && object.value != null && ILifecycleListenerWarning.hasOwnProperty(object.value)) {
                retValue = ILifecycleListenerWarning[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.ILifecycleListenerWarning} [MemoryLow='MemoryLow']
        */
        ILifecycleListenerWarning.MemoryLow = new ILifecycleListenerWarning("MemoryLow");
        /**
           @property {Adaptive.ILifecycleListenerWarning} [BatteryLow='BatteryLow']
        */
        ILifecycleListenerWarning.BatteryLow = new ILifecycleListenerWarning("BatteryLow");
        /**
           @property {Adaptive.ILifecycleListenerWarning} [Unknown='Unknown']
        */
        ILifecycleListenerWarning.Unknown = new ILifecycleListenerWarning("Unknown");
        return ILifecycleListenerWarning;
    })();
    Adaptive.ILifecycleListenerWarning = ILifecycleListenerWarning;
    /**
       @enum {Adaptive.ILoggingLogLevel} Adaptive.ILoggingLogLevel
       Enumeration ILoggingLogLevel
    */
    var ILoggingLogLevel = (function () {
        function ILoggingLogLevel(value) {
            this.value = value;
        }
        ILoggingLogLevel.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ILoggingLogLevel}
        */
        ILoggingLogLevel.toObject = function (object) {
            var retValue = ILoggingLogLevel.Unknown;
            if (object != null && object.value != null && ILoggingLogLevel.hasOwnProperty(object.value)) {
                retValue = ILoggingLogLevel[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.ILoggingLogLevel} [Debug='Debug']
        */
        ILoggingLogLevel.Debug = new ILoggingLogLevel("Debug");
        /**
           @property {Adaptive.ILoggingLogLevel} [Warn='Warn']
        */
        ILoggingLogLevel.Warn = new ILoggingLogLevel("Warn");
        /**
           @property {Adaptive.ILoggingLogLevel} [Error='Error']
        */
        ILoggingLogLevel.Error = new ILoggingLogLevel("Error");
        /**
           @property {Adaptive.ILoggingLogLevel} [Info='Info']
        */
        ILoggingLogLevel.Info = new ILoggingLogLevel("Info");
        /**
           @property {Adaptive.ILoggingLogLevel} [Unknown='Unknown']
        */
        ILoggingLogLevel.Unknown = new ILoggingLogLevel("Unknown");
        return ILoggingLogLevel;
    })();
    Adaptive.ILoggingLogLevel = ILoggingLogLevel;
    /**
       @enum {Adaptive.IMessagingCallbackError} Adaptive.IMessagingCallbackError
       Enumeration IMessagingCallbackError
    */
    var IMessagingCallbackError = (function () {
        function IMessagingCallbackError(value) {
            this.value = value;
        }
        IMessagingCallbackError.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IMessagingCallbackError}
        */
        IMessagingCallbackError.toObject = function (object) {
            var retValue = IMessagingCallbackError.Unknown;
            if (object != null && object.value != null && IMessagingCallbackError.hasOwnProperty(object.value)) {
                retValue = IMessagingCallbackError[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IMessagingCallbackError} [SIMNotPresent='SIMNotPresent']
        */
        IMessagingCallbackError.SIMNotPresent = new IMessagingCallbackError("SIMNotPresent");
        /**
           @property {Adaptive.IMessagingCallbackError} [EmailAccountNotFound='EmailAccountNotFound']
        */
        IMessagingCallbackError.EmailAccountNotFound = new IMessagingCallbackError("EmailAccountNotFound");
        /**
           @property {Adaptive.IMessagingCallbackError} [NotSent='NotSent']
        */
        IMessagingCallbackError.NotSent = new IMessagingCallbackError("NotSent");
        /**
           @property {Adaptive.IMessagingCallbackError} [WrongParams='WrongParams']
        */
        IMessagingCallbackError.WrongParams = new IMessagingCallbackError("WrongParams");
        /**
           @property {Adaptive.IMessagingCallbackError} [NotSupported='NotSupported']
        */
        IMessagingCallbackError.NotSupported = new IMessagingCallbackError("NotSupported");
        /**
           @property {Adaptive.IMessagingCallbackError} [Unknown='Unknown']
        */
        IMessagingCallbackError.Unknown = new IMessagingCallbackError("Unknown");
        return IMessagingCallbackError;
    })();
    Adaptive.IMessagingCallbackError = IMessagingCallbackError;
    /**
       @enum {Adaptive.IMessagingCallbackWarning} Adaptive.IMessagingCallbackWarning
       Enumeration IMessagingCallbackWarning
    */
    var IMessagingCallbackWarning = (function () {
        function IMessagingCallbackWarning(value) {
            this.value = value;
        }
        IMessagingCallbackWarning.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IMessagingCallbackWarning}
        */
        IMessagingCallbackWarning.toObject = function (object) {
            var retValue = IMessagingCallbackWarning.Unknown;
            if (object != null && object.value != null && IMessagingCallbackWarning.hasOwnProperty(object.value)) {
                retValue = IMessagingCallbackWarning[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IMessagingCallbackWarning} [UnableToSentAll='UnableToSentAll']
        */
        IMessagingCallbackWarning.UnableToSentAll = new IMessagingCallbackWarning("UnableToSentAll");
        /**
           @property {Adaptive.IMessagingCallbackWarning} [UnableToFetchAttachment='UnableToFetchAttachment']
        */
        IMessagingCallbackWarning.UnableToFetchAttachment = new IMessagingCallbackWarning("UnableToFetchAttachment");
        /**
           @property {Adaptive.IMessagingCallbackWarning} [Unknown='Unknown']
        */
        IMessagingCallbackWarning.Unknown = new IMessagingCallbackWarning("Unknown");
        return IMessagingCallbackWarning;
    })();
    Adaptive.IMessagingCallbackWarning = IMessagingCallbackWarning;
    /**
       @enum {Adaptive.INetworkReachabilityCallbackError} Adaptive.INetworkReachabilityCallbackError
       Enumeration INetworkReachabilityCallbackError
    */
    var INetworkReachabilityCallbackError = (function () {
        function INetworkReachabilityCallbackError(value) {
            this.value = value;
        }
        INetworkReachabilityCallbackError.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.INetworkReachabilityCallbackError}
        */
        INetworkReachabilityCallbackError.toObject = function (object) {
            var retValue = INetworkReachabilityCallbackError.Unknown;
            if (object != null && object.value != null && INetworkReachabilityCallbackError.hasOwnProperty(object.value)) {
                retValue = INetworkReachabilityCallbackError[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.INetworkReachabilityCallbackError} [Forbidden='Forbidden']
        */
        INetworkReachabilityCallbackError.Forbidden = new INetworkReachabilityCallbackError("Forbidden");
        /**
           @property {Adaptive.INetworkReachabilityCallbackError} [NotFound='NotFound']
        */
        INetworkReachabilityCallbackError.NotFound = new INetworkReachabilityCallbackError("NotFound");
        /**
           @property {Adaptive.INetworkReachabilityCallbackError} [MethodNotAllowed='MethodNotAllowed']
        */
        INetworkReachabilityCallbackError.MethodNotAllowed = new INetworkReachabilityCallbackError("MethodNotAllowed");
        /**
           @property {Adaptive.INetworkReachabilityCallbackError} [NotAllowed='NotAllowed']
        */
        INetworkReachabilityCallbackError.NotAllowed = new INetworkReachabilityCallbackError("NotAllowed");
        /**
           @property {Adaptive.INetworkReachabilityCallbackError} [NotAuthenticated='NotAuthenticated']
        */
        INetworkReachabilityCallbackError.NotAuthenticated = new INetworkReachabilityCallbackError("NotAuthenticated");
        /**
           @property {Adaptive.INetworkReachabilityCallbackError} [TimeOut='TimeOut']
        */
        INetworkReachabilityCallbackError.TimeOut = new INetworkReachabilityCallbackError("TimeOut");
        /**
           @property {Adaptive.INetworkReachabilityCallbackError} [NoResponse='NoResponse']
        */
        INetworkReachabilityCallbackError.NoResponse = new INetworkReachabilityCallbackError("NoResponse");
        /**
           @property {Adaptive.INetworkReachabilityCallbackError} [Unreachable='Unreachable']
        */
        INetworkReachabilityCallbackError.Unreachable = new INetworkReachabilityCallbackError("Unreachable");
        /**
           @property {Adaptive.INetworkReachabilityCallbackError} [WrongParams='WrongParams']
        */
        INetworkReachabilityCallbackError.WrongParams = new INetworkReachabilityCallbackError("WrongParams");
        /**
           @property {Adaptive.INetworkReachabilityCallbackError} [MalformedUrl='MalformedUrl']
        */
        INetworkReachabilityCallbackError.MalformedUrl = new INetworkReachabilityCallbackError("MalformedUrl");
        /**
           @property {Adaptive.INetworkReachabilityCallbackError} [DomainUnresolvable='DomainUnresolvable']
        */
        INetworkReachabilityCallbackError.DomainUnresolvable = new INetworkReachabilityCallbackError("DomainUnresolvable");
        /**
           @property {Adaptive.INetworkReachabilityCallbackError} [Unknown='Unknown']
        */
        INetworkReachabilityCallbackError.Unknown = new INetworkReachabilityCallbackError("Unknown");
        return INetworkReachabilityCallbackError;
    })();
    Adaptive.INetworkReachabilityCallbackError = INetworkReachabilityCallbackError;
    /**
       @enum {Adaptive.INetworkReachabilityCallbackWarning} Adaptive.INetworkReachabilityCallbackWarning
       Enumeration INetworkReachabilityCallbackWarning
    */
    var INetworkReachabilityCallbackWarning = (function () {
        function INetworkReachabilityCallbackWarning(value) {
            this.value = value;
        }
        INetworkReachabilityCallbackWarning.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.INetworkReachabilityCallbackWarning}
        */
        INetworkReachabilityCallbackWarning.toObject = function (object) {
            var retValue = INetworkReachabilityCallbackWarning.Unknown;
            if (object != null && object.value != null && INetworkReachabilityCallbackWarning.hasOwnProperty(object.value)) {
                retValue = INetworkReachabilityCallbackWarning[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.INetworkReachabilityCallbackWarning} [IncorrectScheme='IncorrectScheme']
        */
        INetworkReachabilityCallbackWarning.IncorrectScheme = new INetworkReachabilityCallbackWarning("IncorrectScheme");
        /**
           @property {Adaptive.INetworkReachabilityCallbackWarning} [NotSecure='NotSecure']
        */
        INetworkReachabilityCallbackWarning.NotSecure = new INetworkReachabilityCallbackWarning("NotSecure");
        /**
           @property {Adaptive.INetworkReachabilityCallbackWarning} [NotTrusted='NotTrusted']
        */
        INetworkReachabilityCallbackWarning.NotTrusted = new INetworkReachabilityCallbackWarning("NotTrusted");
        /**
           @property {Adaptive.INetworkReachabilityCallbackWarning} [Redirected='Redirected']
        */
        INetworkReachabilityCallbackWarning.Redirected = new INetworkReachabilityCallbackWarning("Redirected");
        /**
           @property {Adaptive.INetworkReachabilityCallbackWarning} [NotRegisteredService='NotRegisteredService']
        */
        INetworkReachabilityCallbackWarning.NotRegisteredService = new INetworkReachabilityCallbackWarning("NotRegisteredService");
        /**
           @property {Adaptive.INetworkReachabilityCallbackWarning} [Unknown='Unknown']
        */
        INetworkReachabilityCallbackWarning.Unknown = new INetworkReachabilityCallbackWarning("Unknown");
        return INetworkReachabilityCallbackWarning;
    })();
    Adaptive.INetworkReachabilityCallbackWarning = INetworkReachabilityCallbackWarning;
    /**
       @enum {Adaptive.INetworkStatusListenerError} Adaptive.INetworkStatusListenerError
       Enumeration INetworkStatusListenerError
    */
    var INetworkStatusListenerError = (function () {
        function INetworkStatusListenerError(value) {
            this.value = value;
        }
        INetworkStatusListenerError.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.INetworkStatusListenerError}
        */
        INetworkStatusListenerError.toObject = function (object) {
            var retValue = INetworkStatusListenerError.Unknown;
            if (object != null && object.value != null && INetworkStatusListenerError.hasOwnProperty(object.value)) {
                retValue = INetworkStatusListenerError[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.INetworkStatusListenerError} [NoPermission='NoPermission']
        */
        INetworkStatusListenerError.NoPermission = new INetworkStatusListenerError("NoPermission");
        /**
           @property {Adaptive.INetworkStatusListenerError} [Unreachable='Unreachable']
        */
        INetworkStatusListenerError.Unreachable = new INetworkStatusListenerError("Unreachable");
        /**
           @property {Adaptive.INetworkStatusListenerError} [Unknown='Unknown']
        */
        INetworkStatusListenerError.Unknown = new INetworkStatusListenerError("Unknown");
        return INetworkStatusListenerError;
    })();
    Adaptive.INetworkStatusListenerError = INetworkStatusListenerError;
    /**
       @enum {Adaptive.INetworkStatusListenerWarning} Adaptive.INetworkStatusListenerWarning
       Enumeration INetworkStatusListenerWarning
    */
    var INetworkStatusListenerWarning = (function () {
        function INetworkStatusListenerWarning(value) {
            this.value = value;
        }
        INetworkStatusListenerWarning.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.INetworkStatusListenerWarning}
        */
        INetworkStatusListenerWarning.toObject = function (object) {
            var retValue = INetworkStatusListenerWarning.Unknown;
            if (object != null && object.value != null && INetworkStatusListenerWarning.hasOwnProperty(object.value)) {
                retValue = INetworkStatusListenerWarning[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.INetworkStatusListenerWarning} [IpAddressNotAssigned='IpAddressNotAssigned']
        */
        INetworkStatusListenerWarning.IpAddressNotAssigned = new INetworkStatusListenerWarning("IpAddressNotAssigned");
        /**
           @property {Adaptive.INetworkStatusListenerWarning} [IpAddressChanged='IpAddressChanged']
        */
        INetworkStatusListenerWarning.IpAddressChanged = new INetworkStatusListenerWarning("IpAddressChanged");
        /**
           @property {Adaptive.INetworkStatusListenerWarning} [Unknown='Unknown']
        */
        INetworkStatusListenerWarning.Unknown = new INetworkStatusListenerWarning("Unknown");
        return INetworkStatusListenerWarning;
    })();
    Adaptive.INetworkStatusListenerWarning = INetworkStatusListenerWarning;
    /**
       @enum {Adaptive.IOSType} Adaptive.IOSType
       Enumeration IOSType
    */
    var IOSType = (function () {
        function IOSType(value) {
            this.value = value;
        }
        IOSType.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IOSType}
        */
        IOSType.toObject = function (object) {
            var retValue = IOSType.Unknown;
            if (object != null && object.value != null && IOSType.hasOwnProperty(object.value)) {
                retValue = IOSType[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IOSType} [iOS='iOS']
        */
        IOSType.iOS = new IOSType("iOS");
        /**
           @property {Adaptive.IOSType} [OSX='OSX']
        */
        IOSType.OSX = new IOSType("OSX");
        /**
           @property {Adaptive.IOSType} [Windows='Windows']
        */
        IOSType.Windows = new IOSType("Windows");
        /**
           @property {Adaptive.IOSType} [WindowsPhone='WindowsPhone']
        */
        IOSType.WindowsPhone = new IOSType("WindowsPhone");
        /**
           @property {Adaptive.IOSType} [Android='Android']
        */
        IOSType.Android = new IOSType("Android");
        /**
           @property {Adaptive.IOSType} [Linux='Linux']
        */
        IOSType.Linux = new IOSType("Linux");
        /**
           @property {Adaptive.IOSType} [Blackberry='Blackberry']
        */
        IOSType.Blackberry = new IOSType("Blackberry");
        /**
           @property {Adaptive.IOSType} [Tizen='Tizen']
        */
        IOSType.Tizen = new IOSType("Tizen");
        /**
           @property {Adaptive.IOSType} [FirefoxOS='FirefoxOS']
        */
        IOSType.FirefoxOS = new IOSType("FirefoxOS");
        /**
           @property {Adaptive.IOSType} [Chromium='Chromium']
        */
        IOSType.Chromium = new IOSType("Chromium");
        /**
           @property {Adaptive.IOSType} [Unspecified='Unspecified']
        */
        IOSType.Unspecified = new IOSType("Unspecified");
        /**
           @property {Adaptive.IOSType} [Unknown='Unknown']
        */
        IOSType.Unknown = new IOSType("Unknown");
        return IOSType;
    })();
    Adaptive.IOSType = IOSType;
    /**
       @enum {Adaptive.ISecurityResultCallbackError} Adaptive.ISecurityResultCallbackError
       Enumeration ISecurityResultCallbackError
    */
    var ISecurityResultCallbackError = (function () {
        function ISecurityResultCallbackError(value) {
            this.value = value;
        }
        ISecurityResultCallbackError.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ISecurityResultCallbackError}
        */
        ISecurityResultCallbackError.toObject = function (object) {
            var retValue = ISecurityResultCallbackError.Unknown;
            if (object != null && object.value != null && ISecurityResultCallbackError.hasOwnProperty(object.value)) {
                retValue = ISecurityResultCallbackError[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.ISecurityResultCallbackError} [NoPermission='NoPermission']
        */
        ISecurityResultCallbackError.NoPermission = new ISecurityResultCallbackError("NoPermission");
        /**
           @property {Adaptive.ISecurityResultCallbackError} [NoMatchesFound='NoMatchesFound']
        */
        ISecurityResultCallbackError.NoMatchesFound = new ISecurityResultCallbackError("NoMatchesFound");
        /**
           @property {Adaptive.ISecurityResultCallbackError} [Unknown='Unknown']
        */
        ISecurityResultCallbackError.Unknown = new ISecurityResultCallbackError("Unknown");
        return ISecurityResultCallbackError;
    })();
    Adaptive.ISecurityResultCallbackError = ISecurityResultCallbackError;
    /**
       @enum {Adaptive.ISecurityResultCallbackWarning} Adaptive.ISecurityResultCallbackWarning
       Enumeration ISecurityResultCallbackWarning
    */
    var ISecurityResultCallbackWarning = (function () {
        function ISecurityResultCallbackWarning(value) {
            this.value = value;
        }
        ISecurityResultCallbackWarning.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ISecurityResultCallbackWarning}
        */
        ISecurityResultCallbackWarning.toObject = function (object) {
            var retValue = ISecurityResultCallbackWarning.Unknown;
            if (object != null && object.value != null && ISecurityResultCallbackWarning.hasOwnProperty(object.value)) {
                retValue = ISecurityResultCallbackWarning[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.ISecurityResultCallbackWarning} [EntryOverride='EntryOverride']
        */
        ISecurityResultCallbackWarning.EntryOverride = new ISecurityResultCallbackWarning("EntryOverride");
        /**
           @property {Adaptive.ISecurityResultCallbackWarning} [Unknown='Unknown']
        */
        ISecurityResultCallbackWarning.Unknown = new ISecurityResultCallbackWarning("Unknown");
        return ISecurityResultCallbackWarning;
    })();
    Adaptive.ISecurityResultCallbackWarning = ISecurityResultCallbackWarning;
    /**
       @enum {Adaptive.IServiceCertificateValidation} Adaptive.IServiceCertificateValidation
       Enumeration IServiceCertificateValidation
    */
    var IServiceCertificateValidation = (function () {
        function IServiceCertificateValidation(value) {
            this.value = value;
        }
        IServiceCertificateValidation.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IServiceCertificateValidation}
        */
        IServiceCertificateValidation.toObject = function (object) {
            var retValue = IServiceCertificateValidation.Unknown;
            if (object != null && object.value != null && IServiceCertificateValidation.hasOwnProperty(object.value)) {
                retValue = IServiceCertificateValidation[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IServiceCertificateValidation} [None='None']
        */
        IServiceCertificateValidation.None = new IServiceCertificateValidation("None");
        /**
           @property {Adaptive.IServiceCertificateValidation} [Normal='Normal']
        */
        IServiceCertificateValidation.Normal = new IServiceCertificateValidation("Normal");
        /**
           @property {Adaptive.IServiceCertificateValidation} [Extended='Extended']
        */
        IServiceCertificateValidation.Extended = new IServiceCertificateValidation("Extended");
        /**
           @property {Adaptive.IServiceCertificateValidation} [Extreme='Extreme']
        */
        IServiceCertificateValidation.Extreme = new IServiceCertificateValidation("Extreme");
        /**
           @property {Adaptive.IServiceCertificateValidation} [Unknown='Unknown']
        */
        IServiceCertificateValidation.Unknown = new IServiceCertificateValidation("Unknown");
        return IServiceCertificateValidation;
    })();
    Adaptive.IServiceCertificateValidation = IServiceCertificateValidation;
    /**
       @enum {Adaptive.IServiceContentEncoding} Adaptive.IServiceContentEncoding
       Enumeration IServiceContentEncoding
    */
    var IServiceContentEncoding = (function () {
        function IServiceContentEncoding(value) {
            this.value = value;
        }
        IServiceContentEncoding.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IServiceContentEncoding}
        */
        IServiceContentEncoding.toObject = function (object) {
            var retValue = IServiceContentEncoding.Unknown;
            if (object != null && object.value != null && IServiceContentEncoding.hasOwnProperty(object.value)) {
                retValue = IServiceContentEncoding[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IServiceContentEncoding} [Ascii='Ascii']
        */
        IServiceContentEncoding.Ascii = new IServiceContentEncoding("Ascii");
        /**
           @property {Adaptive.IServiceContentEncoding} [Utf8='Utf8']
        */
        IServiceContentEncoding.Utf8 = new IServiceContentEncoding("Utf8");
        /**
           @property {Adaptive.IServiceContentEncoding} [IsoLatin1='IsoLatin1']
        */
        IServiceContentEncoding.IsoLatin1 = new IServiceContentEncoding("IsoLatin1");
        /**
           @property {Adaptive.IServiceContentEncoding} [Unicode='Unicode']
        */
        IServiceContentEncoding.Unicode = new IServiceContentEncoding("Unicode");
        /**
           @property {Adaptive.IServiceContentEncoding} [Unknown='Unknown']
        */
        IServiceContentEncoding.Unknown = new IServiceContentEncoding("Unknown");
        return IServiceContentEncoding;
    })();
    Adaptive.IServiceContentEncoding = IServiceContentEncoding;
    /**
       @enum {Adaptive.IServiceMethod} Adaptive.IServiceMethod
       Enumeration IServiceMethod
    */
    var IServiceMethod = (function () {
        function IServiceMethod(value) {
            this.value = value;
        }
        IServiceMethod.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IServiceMethod}
        */
        IServiceMethod.toObject = function (object) {
            var retValue = IServiceMethod.Unknown;
            if (object != null && object.value != null && IServiceMethod.hasOwnProperty(object.value)) {
                retValue = IServiceMethod[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IServiceMethod} [Post='Post']
        */
        IServiceMethod.Post = new IServiceMethod("Post");
        /**
           @property {Adaptive.IServiceMethod} [Get='Get']
        */
        IServiceMethod.Get = new IServiceMethod("Get");
        /**
           @property {Adaptive.IServiceMethod} [Head='Head']
        */
        IServiceMethod.Head = new IServiceMethod("Head");
        /**
           @property {Adaptive.IServiceMethod} [Unknown='Unknown']
        */
        IServiceMethod.Unknown = new IServiceMethod("Unknown");
        return IServiceMethod;
    })();
    Adaptive.IServiceMethod = IServiceMethod;
    /**
       @enum {Adaptive.IServiceType} Adaptive.IServiceType
       Enumeration IServiceType
    */
    var IServiceType = (function () {
        function IServiceType(value) {
            this.value = value;
        }
        IServiceType.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IServiceType}
        */
        IServiceType.toObject = function (object) {
            var retValue = IServiceType.Unknown;
            if (object != null && object.value != null && IServiceType.hasOwnProperty(object.value)) {
                retValue = IServiceType[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IServiceType} [OctetBinary='OctetBinary']
        */
        IServiceType.OctetBinary = new IServiceType("OctetBinary");
        /**
           @property {Adaptive.IServiceType} [RestJson='RestJson']
        */
        IServiceType.RestJson = new IServiceType("RestJson");
        /**
           @property {Adaptive.IServiceType} [RestXml='RestXml']
        */
        IServiceType.RestXml = new IServiceType("RestXml");
        /**
           @property {Adaptive.IServiceType} [SoapXml='SoapXml']
        */
        IServiceType.SoapXml = new IServiceType("SoapXml");
        /**
           @property {Adaptive.IServiceType} [Unknown='Unknown']
        */
        IServiceType.Unknown = new IServiceType("Unknown");
        return IServiceType;
    })();
    Adaptive.IServiceType = IServiceType;
    /**
       @enum {Adaptive.IServiceResultCallbackError} Adaptive.IServiceResultCallbackError
       Enumeration IServiceResultCallbackError
    */
    var IServiceResultCallbackError = (function () {
        function IServiceResultCallbackError(value) {
            this.value = value;
        }
        IServiceResultCallbackError.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IServiceResultCallbackError}
        */
        IServiceResultCallbackError.toObject = function (object) {
            var retValue = IServiceResultCallbackError.Unknown;
            if (object != null && object.value != null && IServiceResultCallbackError.hasOwnProperty(object.value)) {
                retValue = IServiceResultCallbackError[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IServiceResultCallbackError} [TimeOut='TimeOut']
        */
        IServiceResultCallbackError.TimeOut = new IServiceResultCallbackError("TimeOut");
        /**
           @property {Adaptive.IServiceResultCallbackError} [NoResponse='NoResponse']
        */
        IServiceResultCallbackError.NoResponse = new IServiceResultCallbackError("NoResponse");
        /**
           @property {Adaptive.IServiceResultCallbackError} [Unreachable='Unreachable']
        */
        IServiceResultCallbackError.Unreachable = new IServiceResultCallbackError("Unreachable");
        /**
           @property {Adaptive.IServiceResultCallbackError} [MalformedUrl='MalformedUrl']
        */
        IServiceResultCallbackError.MalformedUrl = new IServiceResultCallbackError("MalformedUrl");
        /**
           @property {Adaptive.IServiceResultCallbackError} [NotRegisteredService='NotRegisteredService']
        */
        IServiceResultCallbackError.NotRegisteredService = new IServiceResultCallbackError("NotRegisteredService");
        /**
           @property {Adaptive.IServiceResultCallbackError} [Unknown='Unknown']
        */
        IServiceResultCallbackError.Unknown = new IServiceResultCallbackError("Unknown");
        return IServiceResultCallbackError;
    })();
    Adaptive.IServiceResultCallbackError = IServiceResultCallbackError;
    /**
       @enum {Adaptive.IServiceResultCallbackWarning} Adaptive.IServiceResultCallbackWarning
       Enumeration IServiceResultCallbackWarning
    */
    var IServiceResultCallbackWarning = (function () {
        function IServiceResultCallbackWarning(value) {
            this.value = value;
        }
        IServiceResultCallbackWarning.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IServiceResultCallbackWarning}
        */
        IServiceResultCallbackWarning.toObject = function (object) {
            var retValue = IServiceResultCallbackWarning.Unknown;
            if (object != null && object.value != null && IServiceResultCallbackWarning.hasOwnProperty(object.value)) {
                retValue = IServiceResultCallbackWarning[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [CertificateUntrusted='CertificateUntrusted']
        */
        IServiceResultCallbackWarning.CertificateUntrusted = new IServiceResultCallbackWarning("CertificateUntrusted");
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [NotSecure='NotSecure']
        */
        IServiceResultCallbackWarning.NotSecure = new IServiceResultCallbackWarning("NotSecure");
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [Redirected='Redirected']
        */
        IServiceResultCallbackWarning.Redirected = new IServiceResultCallbackWarning("Redirected");
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [WrongParams='WrongParams']
        */
        IServiceResultCallbackWarning.WrongParams = new IServiceResultCallbackWarning("WrongParams");
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [Forbidden='Forbidden']
        */
        IServiceResultCallbackWarning.Forbidden = new IServiceResultCallbackWarning("Forbidden");
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [NotFound='NotFound']
        */
        IServiceResultCallbackWarning.NotFound = new IServiceResultCallbackWarning("NotFound");
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [MethodNotAllowed='MethodNotAllowed']
        */
        IServiceResultCallbackWarning.MethodNotAllowed = new IServiceResultCallbackWarning("MethodNotAllowed");
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [NotAllowed='NotAllowed']
        */
        IServiceResultCallbackWarning.NotAllowed = new IServiceResultCallbackWarning("NotAllowed");
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [NotAuthenticated='NotAuthenticated']
        */
        IServiceResultCallbackWarning.NotAuthenticated = new IServiceResultCallbackWarning("NotAuthenticated");
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [PaymentRequired='PaymentRequired']
        */
        IServiceResultCallbackWarning.PaymentRequired = new IServiceResultCallbackWarning("PaymentRequired");
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [ServerError='ServerError']
        */
        IServiceResultCallbackWarning.ServerError = new IServiceResultCallbackWarning("ServerError");
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [Unknown='Unknown']
        */
        IServiceResultCallbackWarning.Unknown = new IServiceResultCallbackWarning("Unknown");
        return IServiceResultCallbackWarning;
    })();
    Adaptive.IServiceResultCallbackWarning = IServiceResultCallbackWarning;
    /**
       @enum {Adaptive.ITelephonyStatus} Adaptive.ITelephonyStatus
       Enumeration ITelephonyStatus
    */
    var ITelephonyStatus = (function () {
        function ITelephonyStatus(value) {
            this.value = value;
        }
        ITelephonyStatus.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ITelephonyStatus}
        */
        ITelephonyStatus.toObject = function (object) {
            var retValue = ITelephonyStatus.Unknown;
            if (object != null && object.value != null && ITelephonyStatus.hasOwnProperty(object.value)) {
                retValue = ITelephonyStatus[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.ITelephonyStatus} [Dialing='Dialing']
        */
        ITelephonyStatus.Dialing = new ITelephonyStatus("Dialing");
        /**
           @property {Adaptive.ITelephonyStatus} [Failed='Failed']
        */
        ITelephonyStatus.Failed = new ITelephonyStatus("Failed");
        /**
           @property {Adaptive.ITelephonyStatus} [Unknown='Unknown']
        */
        ITelephonyStatus.Unknown = new ITelephonyStatus("Unknown");
        return ITelephonyStatus;
    })();
    Adaptive.ITelephonyStatus = ITelephonyStatus;
    /**
       @enum {Adaptive.LifecycleState} Adaptive.LifecycleState
       Enumeration LifecycleState
    */
    var LifecycleState = (function () {
        function LifecycleState(value) {
            this.value = value;
        }
        LifecycleState.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.LifecycleState}
        */
        LifecycleState.toObject = function (object) {
            var retValue = LifecycleState.Unknown;
            if (object != null && object.value != null && LifecycleState.hasOwnProperty(object.value)) {
                retValue = LifecycleState[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.LifecycleState} [Starting='Starting']
        */
        LifecycleState.Starting = new LifecycleState("Starting");
        /**
           @property {Adaptive.LifecycleState} [Started='Started']
        */
        LifecycleState.Started = new LifecycleState("Started");
        /**
           @property {Adaptive.LifecycleState} [Running='Running']
        */
        LifecycleState.Running = new LifecycleState("Running");
        /**
           @property {Adaptive.LifecycleState} [Pausing='Pausing']
        */
        LifecycleState.Pausing = new LifecycleState("Pausing");
        /**
           @property {Adaptive.LifecycleState} [PausedIdle='PausedIdle']
        */
        LifecycleState.PausedIdle = new LifecycleState("PausedIdle");
        /**
           @property {Adaptive.LifecycleState} [PausedRun='PausedRun']
        */
        LifecycleState.PausedRun = new LifecycleState("PausedRun");
        /**
           @property {Adaptive.LifecycleState} [Resuming='Resuming']
        */
        LifecycleState.Resuming = new LifecycleState("Resuming");
        /**
           @property {Adaptive.LifecycleState} [Stopping='Stopping']
        */
        LifecycleState.Stopping = new LifecycleState("Stopping");
        /**
           @property {Adaptive.LifecycleState} [Unknown='Unknown']
        */
        LifecycleState.Unknown = new LifecycleState("Unknown");
        return LifecycleState;
    })();
    Adaptive.LifecycleState = LifecycleState;
    /**
       @enum {Adaptive.RotationEventState} Adaptive.RotationEventState
       Enumeration RotationEventState
    */
    var RotationEventState = (function () {
        function RotationEventState(value) {
            this.value = value;
        }
        RotationEventState.prototype.toString = function () { return this.value; };
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.RotationEventState}
        */
        RotationEventState.toObject = function (object) {
            var retValue = RotationEventState.Unknown;
            if (object != null && object.value != null && RotationEventState.hasOwnProperty(object.value)) {
                retValue = RotationEventState[object.value];
            }
            return retValue;
        };
        /**
           @property {Adaptive.RotationEventState} [WillStartRotation='WillStartRotation']
        */
        RotationEventState.WillStartRotation = new RotationEventState("WillStartRotation");
        /**
           @property {Adaptive.RotationEventState} [IsRotating='IsRotating']
        */
        RotationEventState.IsRotating = new RotationEventState("IsRotating");
        /**
           @property {Adaptive.RotationEventState} [DidFinishRotation='DidFinishRotation']
        */
        RotationEventState.DidFinishRotation = new RotationEventState("DidFinishRotation");
        /**
           @property {Adaptive.RotationEventState} [Unknown='Unknown']
        */
        RotationEventState.Unknown = new RotationEventState("Unknown");
        return RotationEventState;
    })();
    Adaptive.RotationEventState = RotationEventState;
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=Adaptive.js.map