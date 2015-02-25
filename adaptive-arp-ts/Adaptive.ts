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
module Adaptive {

     /**
        @private
        @property {number} registeredCounter
        Global unique id for listeners and callbacks.
     */
     export var registeredCounter : number = 0;

     /**
        @private
        @property {string} bridgePath
        Base url used internally to POST and intercept JSON requests by the platform.
     */
     export var bridgePath : string = "https://adaptiveapp";

     /**
        @private
        @property {string} bridgeApiVersion
        The Adaptive Runtime Platform API specification version.
     */
     export var bridgeApiVersion : string = "v2.2.0";

     /**
        @class Adaptive.IDictionary
        @private
        Utility interface for Dictionary type support.
     */
     export interface IDictionary<V> {
          add(key: string, value: V): void;
          remove(key: string): void;
          containsKey(key: string): boolean;
          keys(): string[];
          values(): V[];
     }

     /**
        @private
        @class Adaptive.Dictionary
        Utility class for Dictionary type support.
     */
     export class Dictionary<V> implements IDictionary<V>{
     
         _keys: Array<string> = new Array<string>();
         _values: Array<V> = new Array<V>();
     
         constructor(init: { key: string; value: V; }[]) {
     
             for (var x = 0; x < init.length; x++) {
                 this[init[x].key] = init[x].value;
                 this._keys.push(init[x].key);
                 this._values.push(init[x].value);
             }
         }
     
         add(key: string, value: V) {
             this[key] = value;
             this._keys.push(key);
             this._values.push(value);
         }
     
         remove(key: string) {
             var index = this._keys.indexOf(key, 0);
             this._keys.splice(index, 1);
             this._values.splice(index, 1);
     
             delete this[key];
         }
     
         removeAll() {
             this._keys = new Array<string>();
             this._values = new Array<V>();
         }
     
         keys(): string[] {
             return this._keys;
         }
     
         values(): V[] {
             return this._values;
         }
     
         containsKey(key: string) {
             if (typeof this[key] === "undefined") {
                 return false;
             }
     
             return true;
         }
     
         toLookup(): IDictionary<V> {
             return this;
         }
     }

     /**
        @private
        @param {Adaptive.APIRequest} apiRequest the request to be processed.
        @param {Adaptive.IBaseListener} listener to add or remove from the dictionary or null if removing all listeners.
        @param {Adaptive.Dictionary} listenerDictionary dictionary of listeners for the operation.
        @since v2.1.10
        Send request for methods that manage listeners.
     */
     export function postRequestListener(apiRequest : APIRequest, listener: IBaseListener, listenerDictionary: Dictionary<IBaseListener>) : void {
        apiRequest.setApiVersion(bridgeApiVersion);
        var apiResponse : APIResponse = new APIResponse("", 200, "")
         
        // Create and send JSON request.
        var xhr = new XMLHttpRequest();
        xhr.open("POST", bridgePath, false);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        if (apiRequest.getMethodName().indexOf("add") > -1) {
            // Add listener reference to local dictionary.
            listenerDictionary.add("" + listener.getId(), listener);
        }

        xhr.send(JSON.stringify(apiRequest));
        // Check response.
        if (xhr.status === 200 ) {
            if (xhr.responseText != null && xhr.responseText !== '') {
                apiResponse = APIResponse.toObject(JSON.parse(xhr.responseText));
                if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    manageRequestListener(apiRequest, listener, listenerDictionary, false);
                } else {
                    manageRequestListener(apiRequest, listener, listenerDictionary, true);
                    console.error("ERROR: "+apiResponse.getStatusCode()+" receiving response in '"+apiRequest.getBridgeType()+"."+apiRequest.getMethodName()+"' ["+apiResponse.getStatusMessage()+"].");
                }
            } else {
                manageRequestListener(apiRequest, listener, listenerDictionary, true);
                console.error("ERROR: '"+apiRequest.getBridgeType()+"."+apiRequest.getMethodName()+"' incorrect response received.");
            }
        } else {
            manageRequestListener(apiRequest, listener, listenerDictionary, true);
            console.error("ERROR: "+xhr.status+" sending '"+apiRequest.getBridgeType()+"."+apiRequest.getMethodName()+"' request.");
        }

    }

    export function manageRequestListener(apiRequest : APIRequest, listener: IBaseListener, listenerDictionary: Dictionary<IBaseListener>, isError: boolean) : void {
        if (apiRequest.getMethodName().indexOf("remove") > -1 && apiRequest.getMethodName().indexOf("Listeners") === -1) {
            listenerDictionary.remove(""+listener.getId());
        } else if (apiRequest.getMethodName().indexOf("remove") > -1 && apiRequest.getMethodName().indexOf("Listeners") > -1) {
            listenerDictionary.removeAll();
        } else if (isError && apiRequest.getMethodName().indexOf("add") > -1) {
            listenerDictionary.remove("" + listener.getId());
        }
    }

     /**
        @private
        @param {Adaptive.APIRequest} apiRequest the request to be processed.
        @param {Adaptive.IBaseCallback} callback to receive responses.
        @param {Adaptive.Dictionary} callbackDictionary dictionary of callbacks for the operation.
        @since v2.1.10
        Send request for methods that use callbacks.
     */
     export function postRequestCallback(apiRequest : APIRequest, callback: IBaseCallback, callbackDictionary: Dictionary<IBaseCallback>) : void {
        apiRequest.setApiVersion(bridgeApiVersion);
        var apiResponse : APIResponse = new APIResponse("", 200, "");
        // Create and send JSON request.
        var xhr = new XMLHttpRequest();
        xhr.open("POST", bridgePath, false);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        // Add callback reference to local dictionary.
        callbackDictionary.add(""+callback.getId(), callback);
        xhr.send(JSON.stringify(apiRequest));
        // Check response.
        if (xhr.status === 200 ) {
            if (xhr.responseText != null && xhr.responseText !== '') {
                apiResponse = APIResponse.toObject(JSON.parse(xhr.responseText));
                if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                } else {
                    // Remove callback reference from local dictionary due to invalid response.
                    callbackDictionary.remove(""+callback.getId());
                    console.error("ERROR: "+apiResponse.getStatusCode()+" receiving response in '"+apiRequest.getBridgeType()+"."+apiRequest.getMethodName()+"' ["+apiResponse.getStatusMessage()+"].");
                }
            } else {
                // Remove callback reference from local dictionary due to invalid response.
                callbackDictionary.remove(""+callback.getId());
                console.error("ERROR: '"+apiRequest.getBridgeType()+"."+apiRequest.getMethodName()+"' incorrect response received.");
            }
        } else {
            // Unknown error - remove from dictionary.
            callbackDictionary.remove(""+callback.getId());
            console.error("ERROR: "+xhr.status+" sending '"+apiRequest.getBridgeType()+"."+apiRequest.getMethodName()+"' request.");
        }
    }

     /**
        @private
        @param {Adaptive.APIRequest} apiRequest the request to be processed.
        @return {Adaptive.APIResponse} Response to the request.
        @since v2.1.10
        Send request and receives responses synchronously.
     */
     export function postRequest(apiRequest : APIRequest) : APIResponse {
        apiRequest.setApiVersion(bridgeApiVersion);
        var apiResponse : APIResponse = new APIResponse("", 200, "");
        // Create and send JSON request.
        var xhr = new XMLHttpRequest();
        xhr.open("POST", bridgePath, false);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(apiRequest));
        // Check response.
        if (xhr.status === 200 ) {
            if (xhr.responseText != null && xhr.responseText !== '') {
                apiResponse = APIResponse.toObject(JSON.parse(xhr.responseText));
                if (apiResponse != null && apiResponse.getStatusCode() !== 200) {
                    console.error("ERROR: "+apiResponse.getStatusCode()+" receiving response in '"+apiRequest.getBridgeType()+"."+apiRequest.getMethodName()+"' ["+apiResponse.getStatusMessage()+"].");
                }
            } else {
                apiResponse = new APIResponse("", 400, "");
                console.error("ERROR: '"+apiRequest.getBridgeType()+"."+apiRequest.getMethodName()+"' incorrect response received.");
            }
        } else {
            apiResponse = new APIResponse("", xhr.status, "");
            console.error("ERROR: "+xhr.status+" sending '"+apiRequest.getBridgeType()+"."+apiRequest.getMethodName()+"' request.");
        }
        return apiResponse;
    }

     /**
        This is a marker interface for bridge classes that invoke delegates.

        @author Carlos Lozano Diez
        @since 1.0
        @version 1.0
     */
     /**
        @class Adaptive.APIBridge
     */
     export interface APIBridge {
          /**
             @method
             Invokes the given method specified in the API request object.
             @param request APIRequest object containing method name and parameters.
             @return {Adaptive.APIResponse} Object with JSON response or a zero length string is the response is asynchronous.
             @since v2.0
          */
          invoke(request:APIRequest) : APIResponse;
     }
     /**
        Master interface for all the Groups and Types of Interfaces os the Project

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IAdaptiveRP
     */
     export interface IAdaptiveRP {
          /**
             @method
             Method that returns the API group of the implementation
             @return {Adaptive.IAdaptiveRPGroup} API Group name.
             @since v2.0
          */
          getAPIGroup() : IAdaptiveRPGroup;
          /**
             @method
             Method that returns the API version of the implementation.
             @return {string} API Version string.
             @since v2.0
          */
          getAPIVersion() : string;
     }
     /**
        @class Adaptive.IAppContext
     */
     /**
        @class Adaptive.IAppContextWebview
     */
     /**
        Interface to retrieve auto-registered service implementation references.

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IAppRegistry
     */
     export interface IAppRegistry {
          /**
             @abstract
             Returns a reference to the registered AccelerationBridge.

             @return {Adaptive.AccelerationBridge} reference or null if a bridge of this type is not registered.
          */
          getAccelerationBridge() : IAcceleration;

          /**
             @abstract
             Returns a reference to the registered AdsBridge.

             @return {Adaptive.AdsBridge} reference or null if a bridge of this type is not registered.
          */
          getAdsBridge() : IAds;

          /**
             @abstract
             Returns a reference to the registered AlarmBridge.

             @return {Adaptive.AlarmBridge} reference or null if a bridge of this type is not registered.
          */
          getAlarmBridge() : IAlarm;

          /**
             @abstract
             Returns a reference to the registered AmbientLightBridge.

             @return {Adaptive.AmbientLightBridge} reference or null if a bridge of this type is not registered.
          */
          getAmbientLightBridge() : IAmbientLight;

          /**
             @abstract
             Returns a reference to the registered AnalyticsBridge.

             @return {Adaptive.AnalyticsBridge} reference or null if a bridge of this type is not registered.
          */
          getAnalyticsBridge() : IAnalytics;

          /**
             @abstract
             Returns a reference to the registered AudioBridge.

             @return {Adaptive.AudioBridge} reference or null if a bridge of this type is not registered.
          */
          getAudioBridge() : IAudio;

          /**
             @abstract
             Returns a reference to the registered BarcodeBridge.

             @return {Adaptive.BarcodeBridge} reference or null if a bridge of this type is not registered.
          */
          getBarcodeBridge() : IBarcode;

          /**
             @abstract
             Returns a reference to the registered BarometerBridge.

             @return {Adaptive.BarometerBridge} reference or null if a bridge of this type is not registered.
          */
          getBarometerBridge() : IBarometer;

          /**
             @abstract
             Returns a reference to the registered BluetoothBridge.

             @return {Adaptive.BluetoothBridge} reference or null if a bridge of this type is not registered.
          */
          getBluetoothBridge() : IBluetooth;

          /**
             @abstract
             Returns a reference to the registered BrowserBridge.

             @return {Adaptive.BrowserBridge} reference or null if a bridge of this type is not registered.
          */
          getBrowserBridge() : IBrowser;

          /**
             @abstract
             Returns a reference to the registered CalendarBridge.

             @return {Adaptive.CalendarBridge} reference or null if a bridge of this type is not registered.
          */
          getCalendarBridge() : ICalendar;

          /**
             @abstract
             Returns a reference to the registered CameraBridge.

             @return {Adaptive.CameraBridge} reference or null if a bridge of this type is not registered.
          */
          getCameraBridge() : ICamera;

          /**
             @abstract
             Returns a reference to the registered CapabilitiesBridge.

             @return {Adaptive.CapabilitiesBridge} reference or null if a bridge of this type is not registered.
          */
          getCapabilitiesBridge() : ICapabilities;

          /**
             @abstract
             Returns a reference to the registered CloudBridge.

             @return {Adaptive.CloudBridge} reference or null if a bridge of this type is not registered.
          */
          getCloudBridge() : ICloud;

          /**
             @abstract
             Returns a reference to the registered CompressionBridge.

             @return {Adaptive.CompressionBridge} reference or null if a bridge of this type is not registered.
          */
          getCompressionBridge() : ICompression;

          /**
             @abstract
             Returns a reference to the registered ConcurrentBridge.

             @return {Adaptive.ConcurrentBridge} reference or null if a bridge of this type is not registered.
          */
          getConcurrentBridge() : IConcurrent;

          /**
             @abstract
             Returns a reference to the registered ContactBridge.

             @return {Adaptive.ContactBridge} reference or null if a bridge of this type is not registered.
          */
          getContactBridge() : IContact;

          /**
             @abstract
             Returns a reference to the registered CryptoBridge.

             @return {Adaptive.CryptoBridge} reference or null if a bridge of this type is not registered.
          */
          getCryptoBridge() : ICrypto;

          /**
             @abstract
             Returns a reference to the registered DataStreamBridge.

             @return {Adaptive.DataStreamBridge} reference or null if a bridge of this type is not registered.
          */
          getDataStreamBridge() : IDataStream;

          /**
             @abstract
             Returns a reference to the registered DatabaseBridge.

             @return {Adaptive.DatabaseBridge} reference or null if a bridge of this type is not registered.
          */
          getDatabaseBridge() : IDatabase;

          /**
             @abstract
             Returns a reference to the registered DesktopBridge.

             @return {Adaptive.DesktopBridge} reference or null if a bridge of this type is not registered.
          */
          getDesktopBridge() : IDesktop;

          /**
             @abstract
             Returns a reference to the registered DeviceBridge.

             @return {Adaptive.DeviceBridge} reference or null if a bridge of this type is not registered.
          */
          getDeviceBridge() : IDevice;

          /**
             @abstract
             Returns a reference to the registered DisplayBridge.

             @return {Adaptive.DisplayBridge} reference or null if a bridge of this type is not registered.
          */
          getDisplayBridge() : IDisplay;

          /**
             @abstract
             Returns a reference to the registered FacebookBridge.

             @return {Adaptive.FacebookBridge} reference or null if a bridge of this type is not registered.
          */
          getFacebookBridge() : IFacebook;

          /**
             @abstract
             Returns a reference to the registered FileBridge.

             @return {Adaptive.FileBridge} reference or null if a bridge of this type is not registered.
          */
          getFileBridge() : IFile;

          /**
             @abstract
             Returns a reference to the registered FileSystemBridge.

             @return {Adaptive.FileSystemBridge} reference or null if a bridge of this type is not registered.
          */
          getFileSystemBridge() : IFileSystem;

          /**
             @abstract
             Returns a reference to the registered GeolocationBridge.

             @return {Adaptive.GeolocationBridge} reference or null if a bridge of this type is not registered.
          */
          getGeolocationBridge() : IGeolocation;

          /**
             @abstract
             Returns a reference to the registered GlobalizationBridge.

             @return {Adaptive.GlobalizationBridge} reference or null if a bridge of this type is not registered.
          */
          getGlobalizationBridge() : IGlobalization;

          /**
             @abstract
             Returns a reference to the registered GooglePlusBridge.

             @return {Adaptive.GooglePlusBridge} reference or null if a bridge of this type is not registered.
          */
          getGooglePlusBridge() : IGooglePlus;

          /**
             @abstract
             Returns a reference to the registered GyroscopeBridge.

             @return {Adaptive.GyroscopeBridge} reference or null if a bridge of this type is not registered.
          */
          getGyroscopeBridge() : IGyroscope;

          /**
             @abstract
             Returns a reference to the registered ImagingBridge.

             @return {Adaptive.ImagingBridge} reference or null if a bridge of this type is not registered.
          */
          getImagingBridge() : IImaging;

          /**
             @abstract
             Returns a reference to the registered InternalStorageBridge.

             @return {Adaptive.InternalStorageBridge} reference or null if a bridge of this type is not registered.
          */
          getInternalStorageBridge() : IInternalStorage;

          /**
             @abstract
             Returns a reference to the registered LifecycleBridge.

             @return {Adaptive.LifecycleBridge} reference or null if a bridge of this type is not registered.
          */
          getLifecycleBridge() : ILifecycle;

          /**
             @abstract
             Returns a reference to the registered LinkedInBridge.

             @return {Adaptive.LinkedInBridge} reference or null if a bridge of this type is not registered.
          */
          getLinkedInBridge() : ILinkedIn;

          /**
             @abstract
             Returns a reference to the registered LoggingBridge.

             @return {Adaptive.LoggingBridge} reference or null if a bridge of this type is not registered.
          */
          getLoggingBridge() : ILogging;

          /**
             @abstract
             Returns a reference to the registered MagnetometerBridge.

             @return {Adaptive.MagnetometerBridge} reference or null if a bridge of this type is not registered.
          */
          getMagnetometerBridge() : IMagnetometer;

          /**
             @abstract
             Returns a reference to the registered MailBridge.

             @return {Adaptive.MailBridge} reference or null if a bridge of this type is not registered.
          */
          getMailBridge() : IMail;

          /**
             @abstract
             Returns a reference to the registered ManagementBridge.

             @return {Adaptive.ManagementBridge} reference or null if a bridge of this type is not registered.
          */
          getManagementBridge() : IManagement;

          /**
             @abstract
             Returns a reference to the registered MapBridge.

             @return {Adaptive.MapBridge} reference or null if a bridge of this type is not registered.
          */
          getMapBridge() : IMap;

          /**
             @abstract
             Returns a reference to the registered MessagingBridge.

             @return {Adaptive.MessagingBridge} reference or null if a bridge of this type is not registered.
          */
          getMessagingBridge() : IMessaging;

          /**
             @abstract
             Returns a reference to the registered NFCBridge.

             @return {Adaptive.NFCBridge} reference or null if a bridge of this type is not registered.
          */
          getNFCBridge() : INFC;

          /**
             @abstract
             Returns a reference to the registered NetworkInfoBridge.

             @return {Adaptive.NetworkInfoBridge} reference or null if a bridge of this type is not registered.
          */
          getNetworkInfoBridge() : INetworkInfo;

          /**
             @abstract
             Returns a reference to the registered NetworkNamingBridge.

             @return {Adaptive.NetworkNamingBridge} reference or null if a bridge of this type is not registered.
          */
          getNetworkNamingBridge() : INetworkNaming;

          /**
             @abstract
             Returns a reference to the registered NetworkReachabilityBridge.

             @return {Adaptive.NetworkReachabilityBridge} reference or null if a bridge of this type is not registered.
          */
          getNetworkReachabilityBridge() : INetworkReachability;

          /**
             @abstract
             Returns a reference to the registered NetworkStatusBridge.

             @return {Adaptive.NetworkStatusBridge} reference or null if a bridge of this type is not registered.
          */
          getNetworkStatusBridge() : INetworkStatus;

          /**
             @abstract
             Returns a reference to the registered NotificationBridge.

             @return {Adaptive.NotificationBridge} reference or null if a bridge of this type is not registered.
          */
          getNotificationBridge() : INotification;

          /**
             @abstract
             Returns a reference to the registered NotificationLocalBridge.

             @return {Adaptive.NotificationLocalBridge} reference or null if a bridge of this type is not registered.
          */
          getNotificationLocalBridge() : INotificationLocal;

          /**
             @abstract
             Returns a reference to the registered OAuthBridge.

             @return {Adaptive.OAuthBridge} reference or null if a bridge of this type is not registered.
          */
          getOAuthBridge() : IOAuth;

          /**
             @abstract
             Returns a reference to the registered OCRBridge.

             @return {Adaptive.OCRBridge} reference or null if a bridge of this type is not registered.
          */
          getOCRBridge() : IOCR;

          /**
             @abstract
             Returns a reference to the registered OSBridge.

             @return {Adaptive.OSBridge} reference or null if a bridge of this type is not registered.
          */
          getOSBridge() : IOS;

          /**
             @abstract
             Returns a reference to the registered OpenIdBridge.

             @return {Adaptive.OpenIdBridge} reference or null if a bridge of this type is not registered.
          */
          getOpenIdBridge() : IOpenId;

          /**
             @abstract
             Returns a reference to the registered PrintingBridge.

             @return {Adaptive.PrintingBridge} reference or null if a bridge of this type is not registered.
          */
          getPrintingBridge() : IPrinting;

          /**
             @abstract
             Returns a reference to the registered ProximityBridge.

             @return {Adaptive.ProximityBridge} reference or null if a bridge of this type is not registered.
          */
          getProximityBridge() : IProximity;

          /**
             @abstract
             Returns a reference to the registered QRCodeBridge.

             @return {Adaptive.QRCodeBridge} reference or null if a bridge of this type is not registered.
          */
          getQRCodeBridge() : IQRCode;

          /**
             @abstract
             Returns a reference to the registered RSSBridge.

             @return {Adaptive.RSSBridge} reference or null if a bridge of this type is not registered.
          */
          getRSSBridge() : IRSS;

          /**
             @abstract
             Returns a reference to the registered RuntimeBridge.

             @return {Adaptive.RuntimeBridge} reference or null if a bridge of this type is not registered.
          */
          getRuntimeBridge() : IRuntime;

          /**
             @abstract
             Returns a reference to the registered SecurityBridge.

             @return {Adaptive.SecurityBridge} reference or null if a bridge of this type is not registered.
          */
          getSecurityBridge() : ISecurity;

          /**
             @abstract
             Returns a reference to the registered ServiceBridge.

             @return {Adaptive.ServiceBridge} reference or null if a bridge of this type is not registered.
          */
          getServiceBridge() : IService;

          /**
             @abstract
             Returns a reference to the registered SettingsBridge.

             @return {Adaptive.SettingsBridge} reference or null if a bridge of this type is not registered.
          */
          getSettingsBridge() : ISettings;

          /**
             @abstract
             Returns a reference to the registered SocketBridge.

             @return {Adaptive.SocketBridge} reference or null if a bridge of this type is not registered.
          */
          getSocketBridge() : ISocket;

          /**
             @abstract
             Returns a reference to the registered StoreBridge.

             @return {Adaptive.StoreBridge} reference or null if a bridge of this type is not registered.
          */
          getStoreBridge() : IStore;

          /**
             @abstract
             Returns a reference to the registered TelephonyBridge.

             @return {Adaptive.TelephonyBridge} reference or null if a bridge of this type is not registered.
          */
          getTelephonyBridge() : ITelephony;

          /**
             @abstract
             Returns a reference to the registered TimerBridge.

             @return {Adaptive.TimerBridge} reference or null if a bridge of this type is not registered.
          */
          getTimerBridge() : ITimer;

          /**
             @abstract
             Returns a reference to the registered TwitterBridge.

             @return {Adaptive.TwitterBridge} reference or null if a bridge of this type is not registered.
          */
          getTwitterBridge() : ITwitter;

          /**
             @abstract
             Returns a reference to the registered UIBridge.

             @return {Adaptive.UIBridge} reference or null if a bridge of this type is not registered.
          */
          getUIBridge() : IUI;

          /**
             @abstract
             Returns a reference to the registered UpdateBridge.

             @return {Adaptive.UpdateBridge} reference or null if a bridge of this type is not registered.
          */
          getUpdateBridge() : IUpdate;

          /**
             @abstract
             Returns a reference to the registered VibrationBridge.

             @return {Adaptive.VibrationBridge} reference or null if a bridge of this type is not registered.
          */
          getVibrationBridge() : IVibration;

          /**
             @abstract
             Returns a reference to the registered VideoBridge.

             @return {Adaptive.VideoBridge} reference or null if a bridge of this type is not registered.
          */
          getVideoBridge() : IVideo;

          /**
             @abstract
             Returns a reference to the registered WalletBridge.

             @return {Adaptive.WalletBridge} reference or null if a bridge of this type is not registered.
          */
          getWalletBridge() : IWallet;

          /**
             @abstract
             Returns a reference to the registered XMLBridge.

             @return {Adaptive.XMLBridge} reference or null if a bridge of this type is not registered.
          */
          getXMLBridge() : IXML;

          /**
             @method
             Return the API version for the given interface.

             @return {string} The version of the API.
          */
          getAPIVersion() : string;
     }
     /**
        The IAppResourceManager is the interface that must be followed for the implementation of secure resource
reading from the application data container. Implementations of this class should provide the logic
to read data from the application container (that may be compressed and encrypted in different formats)
and return the uncompressed data in each case. Implementation specifics may vary between platforms but
the ResourceData and formats returned must be coherent between platforms.

        @author Carlos Lozano Diez
        @since v2.1.3
        @version 1.0
     */
     /**
        @class Adaptive.IAppResourceManager
     */
     export interface IAppResourceManager {
          /**
             @method
             Retrieve a configuration resource from the secure application data container.
             @param id The id or relative path of the configuration resource to be retrieved.
             @return {Adaptive.AppResourceData} ResourceData with the configuration resource payload.
             @since v2.1.3
          */
          retrieveConfigResource(id:string) : AppResourceData;
          /**
             @method
             Retrieve a web resource from the secure application data container.
             @param id The id or relative path of the web resource to be retrieved.
             @return {Adaptive.AppResourceData} ResourceData with the web resource payload.
             @since v2.1.3
          */
          retrieveWebResource(id:string) : AppResourceData;
     }
     /**
        Base application for Application purposes

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IBaseApplication
     */
     export interface IBaseApplication extends IAdaptiveRP {
     }
     /**
        Base application for Callback purposes

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IBaseCallback
     */
     export interface IBaseCallback extends IAdaptiveRP {

          /**
             @abstract
             Retrieve unique id of callback/listener.

             @return {number} Callback/listener unique id.
          */
          getId() : number;

     }
     /**
        Base application for Commerce purposes

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IBaseCommerce
     */
     export interface IBaseCommerce extends IAdaptiveRP {
     }
     /**
        Base application for Communication purposes

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IBaseCommunication
     */
     export interface IBaseCommunication extends IAdaptiveRP {
     }
     /**
        Base application for Data purposes

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IBaseData
     */
     export interface IBaseData extends IAdaptiveRP {
     }
     /**
        Base application for Listener purposes

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IBaseListener
     */
     export interface IBaseListener extends IAdaptiveRP {

          /**
             @abstract
             Retrieve unique id of callback/listener.

             @return {number} Callback/listener unique id.
          */
          getId() : number;

          /**
             @method
             Return the unique listener identifier. This is used to check if two listeners are the same
in every platform. This id is populated by the Javascript platform
             @return {number} Unique Listener identifier
          */
          getId() : number;
     }
     /**
        Base application for Media purposes

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IBaseMedia
     */
     export interface IBaseMedia extends IAdaptiveRP {
     }
     /**
        Base application for Notification purposes

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IBaseNotification
     */
     export interface IBaseNotification extends IAdaptiveRP {
     }
     /**
        Base application for PIM purposes

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IBasePIM
     */
     export interface IBasePIM extends IAdaptiveRP {
     }
     /**
        Base application for Reader purposes

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IBaseReader
     */
     export interface IBaseReader extends IAdaptiveRP {
     }
     /**
        Base application for Security purposes

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IBaseSecurity
     */
     export interface IBaseSecurity extends IAdaptiveRP {
     }
     /**
        Base application for Sensor purposes

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IBaseSensor
     */
     export interface IBaseSensor extends IAdaptiveRP {
     }
     /**
        Base application for Social purposes

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IBaseSocial
     */
     export interface IBaseSocial extends IAdaptiveRP {
     }
     /**
        Base application for System purposes

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IBaseSystem
     */
     export interface IBaseSystem extends IAdaptiveRP {
     }
     /**
        Base application for UI purposes

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IBaseUI
     */
     export interface IBaseUI extends IAdaptiveRP {
     }
     /**
        Base application for Utility purposes

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IBaseUtil
     */
     export interface IBaseUtil extends IAdaptiveRP {
     }
     /**
        Interface for Analytics purposes

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IAnalytics
     */
     export interface IAnalytics extends IBaseApplication {
     }
     /**
        Interface for Managing the Globalization results

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IGlobalization
     */
     export interface IGlobalization extends IBaseApplication {
          /**
             @method
             Returns the default locale of the application defined in the configuration file
             @return {Adaptive.Locale} Default Locale of the application
             @since v2.0
          */
          getDefaultLocale() : Locale;
          /**
             @method
             List of supported locales for the application defined in the configuration file
             @return {Adaptive.Locale[]} List of locales
             @since v2.0
          */
          getLocaleSupportedDescriptors() : Array<Locale>;
          /**
             @method
             Gets the text/message corresponding to the given key and locale.
             @param key    to match text
             @param locale The locale object to get localized message, or the locale desciptor ("language" or "language-country" two-letters ISO codes.
             @return {string} Localized text.
             @since v2.0
          */
          getResourceLiteral(key:string, locale:Locale) : string;
          /**
             @method
             Gets the full application configured literals (key/message pairs) corresponding to the given locale.
             @param locale The locale object to get localized message, or the locale desciptor ("language" or "language-country" two-letters ISO codes.
             @return {Adaptive.KeyPair[]} Localized texts in the form of an object.
             @since v2.0
          */
          getResourceLiterals(locale:Locale) : Array<KeyPair>;
     }
     /**
        Interface for Managing the Lifecycle listeners

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.ILifecycle
     */
     export interface ILifecycle extends IBaseApplication {
          /**
             @method
             Add the listener for the lifecycle of the app
             @param listener Lifecycle listener
             @since v2.0
          */
          addLifecycleListener(listener:ILifecycleListener);
          /**
             @method
             Whether the application is in background or not
             @return {boolean} true if the application is in background;false otherwise
             @since v2.0
          */
          isBackground() : boolean;
          /**
             @method
             Un-registers an existing listener from receiving lifecycle events.
             @param listener Lifecycle listener
             @since v2.0
          */
          removeLifecycleListener(listener:ILifecycleListener);
          /**
             @method
             Removes all existing listeners from receiving lifecycle events.
             @since v2.0
          */
          removeLifecycleListeners();
     }
     /**
        Interface for Managing the Management operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IManagement
     */
     export interface IManagement extends IBaseApplication {
     }
     /**
        Interface for Managing the Printing operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IPrinting
     */
     export interface IPrinting extends IBaseApplication {
     }
     /**
        Interface for Managing the Settings operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.ISettings
     */
     export interface ISettings extends IBaseApplication {
     }
     /**
        Interface for Managing the Update operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IUpdate
     */
     export interface IUpdate extends IBaseApplication {
     }
     /**
        Interface for Managing the Contact operations

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IContactPhotoResultCallback
     */
     export interface IContactPhotoResultCallback extends IBaseCallback {
          /**
             @method
             This method is called on Error
             @param error returned by the platform
             @since v2.0
          */
          onError(error:IContactPhotoResultCallbackError);
          /**
             @method
             This method is called on Result
             @param contactPhoto returned by the platform
             @since v2.0
          */
          onResult(contactPhoto:Array<number>);
          /**
             @method
             This method is called on Warning
             @param contactPhoto returned by the platform
             @param warning      returned by the platform
             @since v2.0
          */
          onWarning(contactPhoto:Array<number>, warning:IContactPhotoResultCallbackWarning);
     }
     /**
        Interface for Managing the Contact operations

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IContactResultCallback
     */
     export interface IContactResultCallback extends IBaseCallback {
          /**
             @method
             This method is called on Error
             @param error returned by the platform
             @since v2.0
          */
          onError(error:IContactResultCallbackError);
          /**
             @method
             This method is called on Result
             @param contacts returned by the platform
             @since v2.0
          */
          onResult(contacts:Array<Contact>);
          /**
             @method
             This method is called on Warning
             @param contacts returned by the platform
             @param warning  returned by the platform
             @since v2.0
          */
          onWarning(contacts:Array<Contact>, warning:IContactResultCallbackWarning);
     }
     /**
        Interface for Managing the Cloud operations

        @author Ferran Vila Conesa
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IDatabaseResultCallback
     */
     export interface IDatabaseResultCallback extends IBaseCallback {
          /**
             @method
             Result callback for error responses
             @param error Returned error
             @since v2.0
          */
          onError(error:IDatabaseResultCallbackError);
          /**
             @method
             Result callback for correct responses
             @param database Returns the database
             @since v2.0
          */
          onResult(database:Database);
          /**
             @method
             Result callback for warning responses
             @param database Returns the database
             @param warning  Returned Warning
             @since v2.0
          */
          onWarning(database:Database, warning:IDatabaseResultCallbackWarning);
     }
     /**
        Interface for Managing the Cloud operations

        @author Ferran Vila Conesa
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IDatabaseTableResultCallback
     */
     export interface IDatabaseTableResultCallback extends IBaseCallback {
          /**
             @method
             Result callback for error responses
             @param error Returned error
             @since v2.0
          */
          onError(error:IDatabaseTableResultCallbackError);
          /**
             @method
             Result callback for correct responses
             @param databaseTable Returns the databaseTable
             @since v2.0
          */
          onResult(databaseTable:DatabaseTable);
          /**
             @method
             Result callback for warning responses
             @param databaseTable Returns the databaseTable
             @param warning       Returned Warning
             @since v2.0
          */
          onWarning(databaseTable:DatabaseTable, warning:IDatabaseTableResultCallbackWarning);
     }
     /**
        Interface for Managing the File loading callback responses

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IFileDataLoadResultCallback
     */
     export interface IFileDataLoadResultCallback extends IBaseCallback {
          /**
             @method
             Error processing data retrieval/storage operation.
             @param error Error condition encountered.
             @since v2.0
          */
          onError(error:IFileDataLoadResultCallbackError);
          /**
             @method
             Result of data retrieval operation.
             @param data Data loaded.
             @since v2.0
          */
          onResult(data:Array<number>);
          /**
             @method
             Result with warning of data retrieval/storage operation.
             @param data    File being loaded.
             @param warning Warning condition encountered.
             @since v2.0
          */
          onWarning(data:Array<number>, warning:IFileDataLoadResultCallbackWarning);
     }
     /**
        Interface for Managing the File store operations callback

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IFileDataStoreResultCallback
     */
     export interface IFileDataStoreResultCallback extends IBaseCallback {
          /**
             @method
             Error processing data retrieval/storage operation.
             @param error Error condition encountered.
             @since v2.0
          */
          onError(error:IFileDataStoreResultCallbackError);
          /**
             @method
             Result of data storage operation.
             @param file File reference to stored data.
             @since v2.0
          */
          onResult(file:FileDescriptor);
          /**
             @method
             Result with warning of data retrieval/storage operation.
             @param file    File being loaded/stored.
             @param warning Warning condition encountered.
             @since v2.0
          */
          onWarning(file:FileDescriptor, warning:IFileDataStoreResultCallbackWarning);
     }
     /**
        Interface for Managing the File result operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IFileListResultCallback
     */
     export interface IFileListResultCallback extends IBaseCallback {
          /**
             @method
             On error result of a file operation.
             @param error Error processing the request.
             @since v2.0
          */
          onError(error:IFileListResultCallbackError);
          /**
             @method
             On correct result of a file operation.
             @param files Array of resulting files/folders.
             @since v2.0
          */
          onResult(files:Array<FileDescriptor>);
          /**
             @method
             On partial result of a file operation, containing a warning.
             @param files   Array of resulting files/folders.
             @param warning Warning condition encountered.
             @since v2.0
          */
          onWarning(files:Array<FileDescriptor>, warning:IFileListResultCallbackWarning);
     }
     /**
        Interface for Managing the File operations callback

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IFileResultCallback
     */
     export interface IFileResultCallback extends IBaseCallback {
          /**
             @method
             On error result of a file operation.
             @param error Error processing the request.
             @since v2.0
          */
          onError(error:IFileResultCallbackError);
          /**
             @method
             On correct result of a file operation.
             @param storageFile Reference to the resulting file.
             @since v2.0
          */
          onResult(storageFile:FileDescriptor);
          /**
             @method
             On partial result of a file operation, containing a warning.
             @param file    Reference to the offending file.
             @param warning Warning processing the request.
             @since v2.0
          */
          onWarning(file:FileDescriptor, warning:IFileResultCallbackWarning);
     }
     /**
        Interface for Managing the Messaging responses

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IMessagingCallback
     */
     export interface IMessagingCallback extends IBaseCallback {
          /**
             @method
             This method is called on Error
             @param error returned by the platform
             @since v2.0
          */
          onError(error:IMessagingCallbackError);
          /**
             @method
             This method is called on Result
             @param success true if sent;false otherwise
             @since v2.0
          */
          onResult(success:boolean);
          /**
             @method
             This method is called on Warning
             @param success true if sent;false otherwise
             @param warning returned by the platform
             @since v2.0
          */
          onWarning(success:boolean, warning:IMessagingCallbackWarning);
     }
     /**
        Interface for Managing the Network reachability callback result

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.INetworkReachabilityCallback
     */
     export interface INetworkReachabilityCallback extends IBaseCallback {
          /**
             @method
             No data received - error condition, not authorized .
             @param error Error value
             @since v2.0
          */
          onError(error:INetworkReachabilityCallbackError);
          /**
             @method
             Correct data received.
             @param reachable Indicates if the host is reachable
             @since v2.0
          */
          onResult(reachable:boolean);
          /**
             @method
             Data received with warning - ie Found entries with existing key and values have been overriden
             @param reachable Indicates if the host is reachable
             @param warning   Warning value
             @since v2.0
          */
          onWarning(reachable:boolean, warning:INetworkReachabilityCallbackWarning);
     }
     /**
        Interface for Managing the Security result callback

        @author Aryslan
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.ISecurityResultCallback
     */
     export interface ISecurityResultCallback extends IBaseCallback {
          /**
             @method
             No data received - error condition, not authorized .
             @param error Error values
             @since v2.0
          */
          onError(error:ISecurityResultCallbackError);
          /**
             @method
             Correct data received.
             @param keyValues key and values
             @since v2.0
          */
          onResult(keyValues:Array<SecureKeyPair>);
          /**
             @method
             Data received with warning - ie Found entries with existing key and values have been overriden
             @param keyValues key and values
             @param warning   Warning values
             @since v2.0
          */
          onWarning(keyValues:Array<SecureKeyPair>, warning:ISecurityResultCallbackWarning);
     }
     /**
        Interface for Managing the Services operations

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IServiceResultCallback
     */
     export interface IServiceResultCallback extends IBaseCallback {
          /**
             @method
             This method is called on Error
             @param error returned by the platform
             @since v2.0
          */
          onError(error:IServiceResultCallbackError);
          /**
             @method
             This method is called on Result
             @param response data
             @since v2.0
          */
          onResult(response:ServiceResponse);
          /**
             @method
             This method is called on Warning
             @param response data
             @param warning  returned by the platform
             @since v2.0
          */
          onWarning(response:ServiceResponse, warning:IServiceResultCallbackWarning);
     }
     /**
        Interface for Advertising purposes

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IAds
     */
     export interface IAds extends IBaseCommerce {
     }
     /**
        Interface for Managing the Store operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IStore
     */
     export interface IStore extends IBaseCommerce {
     }
     /**
        Interface for Managing the Wallet operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IWallet
     */
     export interface IWallet extends IBaseCommerce {
     }
     /**
        Interface for Bluetooth purposes

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IBluetooth
     */
     export interface IBluetooth extends IBaseCommunication {
     }
     /**
        Interface for Managing the Network information operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.INetworkInfo
     */
     export interface INetworkInfo extends IBaseCommunication {
     }
     /**
        Interface for Managing the Network naming operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.INetworkNaming
     */
     export interface INetworkNaming extends IBaseCommunication {
     }
     /**
        Interface for Managing the Network reachability operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.INetworkReachability
     */
     export interface INetworkReachability extends IBaseCommunication {
          /**
             @method
             Whether there is connectivity to a host, via domain name or ip address, or not.
             @param host     domain name or ip address of host.
             @param callback Callback called at the end.
             @since v2.0
          */
          isNetworkReachable(host:string, callback:INetworkReachabilityCallback);
          /**
             @method
             Whether there is connectivity to an url of a service or not.
             @param url      to look for
             @param callback Callback called at the end
             @since v2.0
          */
          isNetworkServiceReachable(url:string, callback:INetworkReachabilityCallback);
     }
     /**
        Interface for Managing the Network status

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.INetworkStatus
     */
     export interface INetworkStatus extends IBaseCommunication {
          /**
             @method
             Add the listener for network status changes of the app
             @param listener Listener with the result
             @since v2.0
          */
          addNetworkStatusListener(listener:INetworkStatusListener);
          /**
             @method
             Un-registers an existing listener from receiving network status events.
             @param listener Listener with the result
             @since v2.0
          */
          removeNetworkStatusListener(listener:INetworkStatusListener);
          /**
             @method
             Removes all existing listeners from receiving network status events.
             @since v2.0
          */
          removeNetworkStatusListeners();
     }
     /**
        Interface for Managing the Services operations

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IService
     */
     export interface IService extends IBaseCommunication {
          /**
             @method
             Create a service request for the given ServiceToken. This method creates the request, populating
existing headers and cookies for the same service. The request is populated with all the defaults
for the service being invoked and requires only the request body to be set. Headers and cookies may be
manipulated as needed by the application before submitting the ServiceRequest via invokeService.
             @param serviceToken ServiceToken to be used for the creation of the request.
             @return {Adaptive.ServiceRequest} ServiceRequest with pre-populated headers, cookies and defaults for the service.
             @since v2.0.6
          */
          getServiceRequest(serviceToken:ServiceToken) : ServiceRequest;
          /**
             @method
             Obtains a Service token by a concrete uri (http://domain.com/path). This method would be useful when
a service response is a redirect (3XX) and it is necessary to make a request to another host and we
don't know by advance the name of the service.
             @param uri Unique Resource Identifier for a Service-Endpoint-Path-Method
             @return {Adaptive.ServiceToken} ServiceToken to create a service request or null if the given parameter is not
configured in the platform's XML service definition file.
             @since v2.1.4
          */
          getServiceTokenByUri(uri:string) : ServiceToken;
          /**
             @method
             Obtains a ServiceToken for the given parameters to be used for the creation of requests.
             @param serviceName  Service name.
             @param endpointName Endpoint name.
             @param functionName Function name.
             @param method       Method type.
             @return {Adaptive.ServiceToken} ServiceToken to create a service request or null if the given parameter combination is not
configured in the platform's XML service definition file.
             @since v2.0.6
          */
          getServiceToken(serviceName:string, endpointName:string, functionName:string, method:IServiceMethod) : ServiceToken;
          /**
             @method
             Returns all the possible service tokens configured in the platform's XML service definition file.
             @return {Adaptive.ServiceToken[]} Array of service tokens configured.
             @since v2.0.6
          */
          getServicesRegistered() : Array<ServiceToken>;
          /**
             @method
             Executes the given ServiceRequest and provides responses to the given callback handler.
             @param serviceRequest ServiceRequest with the request body.
             @param callback       IServiceResultCallback to handle the ServiceResponse.
             @since v2.0.6
          */
          invokeService(serviceRequest:ServiceRequest, callback:IServiceResultCallback);
          /**
             @method
             Checks whether a specific service, endpoint, function and method type is configured in the platform's
XML service definition file.
             @param serviceName  Service name.
             @param endpointName Endpoint name.
             @param functionName Function name.
             @param method       Method type.
             @return {boolean} Returns true if the service is configured, false otherwise.
             @since v2.0.6
          */
          isServiceRegistered(serviceName:string, endpointName:string, functionName:string, method:IServiceMethod) : boolean;
     }
     /**
        Interface for Managing the Socket operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.ISocket
     */
     export interface ISocket extends IBaseCommunication {
     }
     /**
        Interface for Managing the Telephony operations

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.ITelephony
     */
     export interface ITelephony extends IBaseCommunication {
          /**
             @method
             Invoke a phone call
             @param number to call
             @return {Adaptive.ITelephonyStatus} Status of the call
             @since v2.0
          */
          call(number:string) : ITelephonyStatus;
     }
     /**
        Interface for Managing the Cloud operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.ICloud
     */
     export interface ICloud extends IBaseData {
     }
     /**
        Interface for Managing the DataStream operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IDataStream
     */
     export interface IDataStream extends IBaseData {
     }
     /**
        Interface for Managing the Cloud operations

        @author Ferran Vila Conesa
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IDatabase
     */
     export interface IDatabase extends IBaseData {
          /**
             @method
             Creates a database on default path for every platform.
             @param callback Asynchronous callback
             @param database Database object to create
             @since v2.0
          */
          createDatabase(database:Database, callback:IDatabaseResultCallback);
          /**
             @method
             Creates a databaseTable inside a database for every platform.
             @param database      Database for databaseTable creating.
             @param databaseTable DatabaseTable object with the name of the databaseTable inside.
             @param callback      DatabaseTable callback with the response
             @since v2.0
          */
          createTable(database:Database, databaseTable:DatabaseTable, callback:IDatabaseTableResultCallback);
          /**
             @method
             Deletes a database on default path for every platform.
             @param database Database object to delete
             @param callback Asynchronous callback
             @since v2.0
          */
          deleteDatabase(database:Database, callback:IDatabaseResultCallback);
          /**
             @method
             Deletes a databaseTable inside a database for every platform.
             @param database      Database for databaseTable removal.
             @param databaseTable DatabaseTable object with the name of the databaseTable inside.
             @param callback      DatabaseTable callback with the response
             @since v2.0
          */
          deleteTable(database:Database, databaseTable:DatabaseTable, callback:IDatabaseTableResultCallback);
          /**
             @method
             Executes SQL statement into the given database. The replacements
should be passed as a parameter
             @param database     The database object reference.
             @param statement    SQL statement.
             @param replacements List of SQL statement replacements.
             @param callback     DatabaseTable callback with the response.
             @since v2.0
          */
          executeSqlStatement(database:Database, statement:string, replacements:Array<string>, callback:IDatabaseTableResultCallback);
          /**
             @method
             Executes SQL transaction (some statements chain) inside given database.
             @param database     The database object reference.
             @param statements   The statements to be executed during transaction.
             @param rollbackFlag Indicates if rollback should be performed when any
                    statement execution fails.
             @param callback     DatabaseTable callback with the response.
             @since v2.0
          */
          executeSqlTransactions(database:Database, statements:Array<string>, rollbackFlag:boolean, callback:IDatabaseTableResultCallback);
          /**
             @method
             Checks if database exists by given database name.
             @param database Database Object to check if exists
             @return {boolean} True if exists, false otherwise
             @since v2.0
          */
          existsDatabase(database:Database) : boolean;
          /**
             @method
             Checks if databaseTable exists by given database name.
             @param database      Database for databaseTable consulting.
             @param databaseTable DatabaseTable object with the name of the databaseTable inside.
             @return {boolean} True if exists, false otherwise
             @since v2.0
          */
          existsTable(database:Database, databaseTable:DatabaseTable) : boolean;
     }
     /**
        Interface for Managing the File operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IFile
     */
     export interface IFile extends IBaseData {
          /**
             @method
             Determine whether the current file/folder can be read from.
             @param descriptor File descriptor of file or folder used for operation.
             @return {boolean} True if the folder/file is readable, false otherwise.
             @since v2.0
          */
          canRead(descriptor:FileDescriptor) : boolean;
          /**
             @method
             Determine whether the current file/folder can be written to.
             @param descriptor File descriptor of file or folder used for operation.
             @return {boolean} True if the folder/file is writable, false otherwise.
             @since v2.0
          */
          canWrite(descriptor:FileDescriptor) : boolean;
          /**
             @method
             Creates a file with the specified name.
             @param descriptor File descriptor of file or folder used for operation.
             @param callback   Result of the operation.
             @since v2.0
          */
          create(descriptor:FileDescriptor, callback:IFileResultCallback);
          /**
             @method
             Deletes the given file or path. If the file is a directory and contains files and or subdirectories, these will be
deleted if the cascade parameter is set to true.
             @param descriptor File descriptor of file or folder used for operation.
             @param cascade    Whether to delete sub-files and sub-folders.
             @return {boolean} True if files (and sub-files and folders) whether deleted.
             @since v2.0
          */
          delete(descriptor:FileDescriptor, cascade:boolean) : boolean;
          /**
             @method
             Check whether the file/path exists.
             @param descriptor File descriptor of file or folder used for operation.
             @return {boolean} True if the file exists in the filesystem, false otherwise.
             @since v2.0
          */
          exists(descriptor:FileDescriptor) : boolean;
          /**
             @method
             Loads the content of the file.
             @param descriptor File descriptor of file or folder used for operation.
             @param callback   Result of the operation.
             @since v2.0
          */
          getContent(descriptor:FileDescriptor, callback:IFileDataLoadResultCallback);
          /**
             @method
             Returns the file storage type of the file
             @param descriptor File descriptor of file or folder used for operation.
             @return {Adaptive.IFileSystemStorageType} Storage Type file
             @since v2.0
          */
          getFileStorageType(descriptor:FileDescriptor) : IFileSystemStorageType;
          /**
             @method
             Returns the file type
             @param descriptor File descriptor of file or folder used for operation.
             @return {Adaptive.IFileSystemType} Returns the file type of the file
             @since v2.0
          */
          getFileType(descriptor:FileDescriptor) : IFileSystemType;
          /**
             @method
             Returns the security type of the file
             @param descriptor File descriptor of file or folder used for operation.
             @return {Adaptive.IFileSystemSecurity} Security Level of the file
             @since v2.0
          */
          getSecurityType(descriptor:FileDescriptor) : IFileSystemSecurity;
          /**
             @method
             Check whether this is a path of a file.
             @param descriptor File descriptor of file or folder used for operation.
             @return {boolean} true if this is a path to a folder/directory, false if this is a path to a file.
             @since v2.0
          */
          isDirectory(descriptor:FileDescriptor) : boolean;
          /**
             @method
             List all the files matching the speficied regex filter within this file/path reference. If the reference
is a file, it will not yield any results.
             @param descriptor File descriptor of file or folder used for operation.
             @param regex      Filter (eg. *.jpg, *.png, Fil*) name string.
             @param callback   Result of operation.
             @since v2.0
          */
          listFilesForRegex(descriptor:FileDescriptor, regex:string, callback:IFileListResultCallback);
          /**
             @method
             List all the files contained within this file/path reference. If the reference is a file, it will not yield
any results.
             @param descriptor File descriptor of file or folder used for operation.
             @param callback   Result of operation.
             @since v2.0
          */
          listFiles(descriptor:FileDescriptor, callback:IFileListResultCallback);
          /**
             @method
             Creates the parent path (or paths, if recursive) to the given file/path if it doesn't already exist.
             @param descriptor File descriptor of file or folder used for operation.
             @param recursive  Whether to create all parent path elements.
             @return {boolean} True if the path was created, false otherwise (or it exists already).
             @since v2.0
          */
          mkDir(descriptor:FileDescriptor, recursive:boolean) : boolean;
          /**
             @method
             Moves the current file to the given file destination, optionally overwriting and creating the path to the
new destination file.
             @param source      File descriptor of file or folder used for operation as source.
             @param destination File descriptor of file or folder used for operation as destination.
             @param createPath  True to create the path if it does not already exist.
             @param callback    Result of the operation.
             @param overwrite   True to create the path if it does not already exist.
             @since v2.0
          */
          move(source:FileDescriptor, destination:FileDescriptor, createPath:boolean, overwrite:boolean, callback:IFileResultCallback);
          /**
             @method
             Sets the content of the file.
             @param descriptor File descriptor of file or folder used for operation.
             @param content    Binary content to store in the file.
             @param callback   Result of the operation.
             @since v2.0
          */
          setContent(descriptor:FileDescriptor, content:Array<number>, callback:IFileDataStoreResultCallback);
     }
     /**
        Interface for Managing the File System operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IFileSystem
     */
     export interface IFileSystem extends IBaseData {
          /**
             @method
             Creates a new reference to a new or existing location in the filesystem.
This method does not create the actual file in the specified folder.
             @param parent Parent directory.
             @param name   Name of new file or directory.
             @return {Adaptive.FileDescriptor} A reference to a new or existing location in the filesystem.
             @since v2.0
          */
          createFileDescriptor(parent:FileDescriptor, name:string) : FileDescriptor;
          /**
             @method
             Returns a reference to the cache folder for the current application.
This path must always be writable by the current application.
This path is volatile and may be cleaned by the OS periodically.
             @return {Adaptive.FileDescriptor} Path to the application's cache folder.
             @since v2.0
          */
          getApplicationCacheFolder() : FileDescriptor;
          /**
             @method
             Returns a reference to the cloud synchronizable folder for the current application.
This path must always be writable by the current application.
             @return {Adaptive.FileDescriptor} Path to the application's cloud storage folder.
             @since v2.0
          */
          getApplicationCloudFolder() : FileDescriptor;
          /**
             @method
             Returns a reference to the documents folder for the current application.
This path must always be writable by the current application.
             @return {Adaptive.FileDescriptor} Path to the application's documents folder.
             @since v2.0
          */
          getApplicationDocumentsFolder() : FileDescriptor;
          /**
             @method
             Returns a reference to the application installation folder.
This path may or may not be directly readable or writable - it usually contains the app binary and data.
             @return {Adaptive.FileDescriptor} Path to the application folder.
             @since v2.0
          */
          getApplicationFolder() : FileDescriptor;
          /**
             @method
             Returns a reference to the protected storage folder for the current application.
This path must always be writable by the current application.
             @return {Adaptive.FileDescriptor} Path to the application's protected storage folder.
             @since v2.0
          */
          getApplicationProtectedFolder() : FileDescriptor;
          /**
             @method
             Returns the file system dependent file separator.
             @return {string} char with the directory/file separator.
             @since v2.0
          */
          getSeparator() : string;
          /**
             @method
             Returns a reference to the external storage folder provided by the OS. This may
be an external SSD card or similar. This type of storage is removable and by
definition, not secure.
This path may or may not be writable by the current application.
             @return {Adaptive.FileDescriptor} Path to the application's documents folder.
             @since v2.0
          */
          getSystemExternalFolder() : FileDescriptor;
     }
     /**
        Interface for Managing the Internal Storage operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IInternalStorage
     */
     export interface IInternalStorage extends IBaseData {
     }
     /**
        Interface for Managing the XML operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IXML
     */
     export interface IXML extends IBaseData {
     }
     /**
        Interface defines the response methods of the acceleration operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IAccelerationListener
     */
     export interface IAccelerationListener extends IBaseListener {
          /**
             @method
             No data received - error condition, not authorized or hardware not available. This will be reported once for the
listener and subsequently, the listener will be deactivated and removed from the internal list of listeners.
             @param error Error fired
             @since v2.0
          */
          onError(error:IAccelerationListenerError);
          /**
             @method
             Correct data received.
             @param acceleration Acceleration received
             @since v2.0
          */
          onResult(acceleration:Acceleration);
          /**
             @method
             Data received with warning - ie. Needs calibration.
             @param acceleration Acceleration received
             @param warning      Warning fired
             @since v2.0
          */
          onWarning(acceleration:Acceleration, warning:IAccelerationListenerWarning);
     }
     /**
        Interface for Managing the button  operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IButtonListener
     */
     export interface IButtonListener extends IBaseListener {
          /**
             @method
             No data received
             @param error occurred
             @since v2.0
          */
          onError(error:IButtonListenerError);
          /**
             @method
             Called on button pressed
             @param button pressed
             @since v2.0
          */
          onResult(button:Button);
          /**
             @method
             Data received with warning
             @param button  pressed
             @param warning happened
             @since v2.0
          */
          onWarning(button:Button, warning:IButtonListenerWarning);
     }
     /**
        Interface for handling device orientation change events.

        @author Carlos Lozano Diez
        @since v2.0.5
        @version 1.0
     */
     /**
        @class Adaptive.IDeviceOrientationListener
     */
     export interface IDeviceOrientationListener extends IBaseListener {
          /**
             @method
             Although extremely unlikely, this event will be fired if something beyond the control of the
platform impedes the rotation of the device.
             @param error The error condition... generally unknown as it is unexpected!
             @since v2.0.5
          */
          onError(error:IDeviceOrientationListenerError);
          /**
             @method
             Event fired with the successful start and finish of a rotation.
             @param rotationEvent RotationEvent containing origin, destination and state of the event.
             @since v2.0.5
          */
          onResult(rotationEvent:RotationEvent);
          /**
             @method
             Event fired with a warning when the rotation is aborted. In specific, this
event may be fired if the devices vetoes the rotation before rotation is completed.
             @param rotationEvent   RotationEvent containing origin, destination and state of the event.
             @param warning Type of condition that aborted rotation execution.
             @since v2.0.5
          */
          onWarning(rotationEvent:RotationEvent, warning:IDeviceOrientationListenerWarning);
     }
     /**
        Interface for handling display orientation change events.

        @author Carlos Lozano Diez
        @since v2.0.5
        @version 1.0
     */
     /**
        @class Adaptive.IDisplayOrientationListener
     */
     export interface IDisplayOrientationListener extends IBaseListener {
          /**
             @method
             Although extremely unlikely, this event will be fired if something beyond the control of the
platform impedes the rotation of the display.
             @param error The error condition... generally unknown as it is unexpected!
             @since v2.0.5
          */
          onError(error:IDisplayOrientationListenerError);
          /**
             @method
             Event fired with the successful start and finish of a rotation.
             @param rotationEvent RotationEvent containing origin, destination and state of the event.
             @since v2.0.5
          */
          onResult(rotationEvent:RotationEvent);
          /**
             @method
             Event fired with a warning when the rotation is aborted. In specific, this
event may be fired if the application vetoes display rotation before rotation is completed.
             @param rotationEvent   RotationEvent containing origin, destination and state of the event.
             @param warning Type of condition that aborted rotation execution.
             @since v2.0.5
          */
          onWarning(rotationEvent:RotationEvent, warning:IDisplayOrientationListenerWarning);
     }
     /**
        Interface for Managing the Geolocation results

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IGeolocationListener
     */
     export interface IGeolocationListener extends IBaseListener {
          /**
             @method
             No data received - error condition, not authorized or hardware not available.
             @param error Type of error encountered during reading.
             @since v2.0
          */
          onError(error:IGeolocationListenerError);
          /**
             @method
             Correct data received.
             @param geolocation Geolocation Bean
             @since v2.0
          */
          onResult(geolocation:Geolocation);
          /**
             @method
             Data received with warning - ie. HighDoP
             @param geolocation Geolocation Bean
             @param warning     Type of warning encountered during reading.
             @since v2.0
          */
          onWarning(geolocation:Geolocation, warning:IGeolocationListenerWarning);
     }
     /**
        Interface for Managing the Lifecycle listeners

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.ILifecycleListener
     */
     export interface ILifecycleListener extends IBaseListener {
          /**
             @method
             No data received - error condition, not authorized or hardware not available.
             @param error Type of error encountered during reading.
             @since v2.0
          */
          onError(error:ILifecycleListenerError);
          /**
             @method
             Called when lifecycle changes somehow.
             @param lifecycle Lifecycle element
             @since v2.0
          */
          onResult(lifecycle:Lifecycle);
          /**
             @method
             Data received with warning
             @param lifecycle Lifecycle element
             @param warning   Type of warning encountered during reading.
             @since v2.0
          */
          onWarning(lifecycle:Lifecycle, warning:ILifecycleListenerWarning);
     }
     /**
        Interface for Managing the Network status listener events

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.INetworkStatusListener
     */
     export interface INetworkStatusListener extends IBaseListener {
          /**
             @method
             No data received - error condition, not authorized or hardware not available.
             @param error Type of error encountered during reading.
             @since v2.0
          */
          onError(error:INetworkStatusListenerError);
          /**
             @method
             Called when network connection changes somehow.
             @param network Change to this network.
             @since v2.0
          */
          onResult(network:ICapabilitiesNet);
          /**
             @method
             Status received with warning
             @param network Change to this network.
             @param warning Type of warning encountered during reading.
             @since v2.0
          */
          onWarning(network:ICapabilitiesNet, warning:INetworkStatusListenerWarning);
     }
     /**
        Interface for Audio purposes

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IAudio
     */
     export interface IAudio extends IBaseMedia {
     }
     /**
        Interface for Managing the camera operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.ICamera
     */
     export interface ICamera extends IBaseMedia {
     }
     /**
        Interface for Managing the Imaging operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IImaging
     */
     export interface IImaging extends IBaseMedia {
     }
     /**
        Interface for Managing the Video operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IVideo
     */
     export interface IVideo extends IBaseMedia {
          /**
             @method
             Play url video stream
             @param url of the video
             @since v2.0
          */
          playStream(url:string);
     }
     /**
        Interface for Alarm purposes

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IAlarm
     */
     export interface IAlarm extends IBaseNotification {
     }
     /**
        Interface for Managing the Notification operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.INotification
     */
     export interface INotification extends IBaseNotification {
     }
     /**
        Interface for Managing the Local Notifications operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.INotificationLocal
     */
     export interface INotificationLocal extends IBaseNotification {
     }
     /**
        Interface for Managing the Vibration operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IVibration
     */
     export interface IVibration extends IBaseNotification {
     }
     /**
        Interface for Managing the Calendar operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.ICalendar
     */
     export interface ICalendar extends IBasePIM {
     }
     /**
        Interface for Managing the Contact operations

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IContact
     */
     export interface IContact extends IBasePIM {
          /**
             @method
             Get the contact photo
             @param contact  id to search for
             @param callback called for return
             @since v2.0
          */
          getContactPhoto(contact:ContactUid, callback:IContactPhotoResultCallback);
          /**
             @method
             Get all the details of a contact according to its id
             @param contact  id to search for
             @param callback called for return
             @since v2.0
          */
          getContact(contact:ContactUid, callback:IContactResultCallback);
          /**
             @method
             Get marked fields of all contacts
             @param callback called for return
             @param fields   to get for each Contact
             @since v2.0
          */
          getContactsForFields(callback:IContactResultCallback, fields:Array<IContactFieldGroup>);
          /**
             @method
             Get marked fields of all contacts according to a filter
             @param callback called for return
             @param fields   to get for each Contact
             @param filter   to search for
             @since v2.0
          */
          getContactsWithFilter(callback:IContactResultCallback, fields:Array<IContactFieldGroup>, filter:Array<IContactFilter>);
          /**
             @method
             Get all contacts
             @param callback called for return
             @since v2.0
          */
          getContacts(callback:IContactResultCallback);
          /**
             @method
             Search contacts according to a term with a filter and send it to the callback
             @param term     string to search
             @param callback called for return
             @param filter   to search for
             @since v2.0
          */
          searchContactsWithFilter(term:string, callback:IContactResultCallback, filter:Array<IContactFilter>);
          /**
             @method
             Search contacts according to a term and send it to the callback
             @param term     string to search
             @param callback called for return
             @since v2.0
          */
          searchContacts(term:string, callback:IContactResultCallback);
          /**
             @method
             Set the contact photo
             @param contact  id to assign the photo
             @param pngImage photo as byte array
             @return {boolean} true if set is successful;false otherwise
             @since v2.0
          */
          setContactPhoto(contact:ContactUid, pngImage:Array<number>) : boolean;
     }
     /**
        Interface for Managing the Mail operations

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IMail
     */
     export interface IMail extends IBasePIM {
          /**
             @method
             Send an Email
             @param data     Payload of the email
             @param callback Result callback of the operation
             @since v2.0
          */
          sendEmail(data:Email, callback:IMessagingCallback);
     }
     /**
        Interface for Managing the Messaging operations

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IMessaging
     */
     export interface IMessaging extends IBasePIM {
          /**
             @method
             Send text SMS
             @param number   to send
             @param text     to send
             @param callback with the result
             @since v2.0
          */
          sendSMS(number:string, text:string, callback:IMessagingCallback);
     }
     /**
        Interface for Barcode Reading purposes

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IBarcode
     */
     export interface IBarcode extends IBaseReader {
     }
     /**
        Interface for Managing the NFC operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.INFC
     */
     export interface INFC extends IBaseReader {
     }
     /**
        Interface for Managing the OCR operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IOCR
     */
     export interface IOCR extends IBaseReader {
     }
     /**
        Interface for Managing the QR Code operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IQRCode
     */
     export interface IQRCode extends IBaseReader {
     }
     /**
        Interface for Managing the OAuth operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IOAuth
     */
     export interface IOAuth extends IBaseSecurity {
     }
     /**
        Interface for Managing the OpenID operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IOpenId
     */
     export interface IOpenId extends IBaseSecurity {
     }
     /**
        Interface for Managing the Security operations

        @author Aryslan
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.ISecurity
     */
     export interface ISecurity extends IBaseSecurity {
          /**
             @method
             Deletes from the device internal storage the entry/entries containing the specified key names.
             @param keys             Array with the key names to delete.
             @param publicAccessName The name of the shared internal storage object (if needed).
             @param callback         callback to be executed upon function result.
             @since v2.0
          */
          deleteSecureKeyValuePairs(keys:Array<string>, publicAccessName:string, callback:ISecurityResultCallback);
          /**
             @method
             Retrieves from the device internal storage the entry/entries containing the specified key names.
             @param keys             Array with the key names to retrieve.
             @param publicAccessName The name of the shared internal storage object (if needed).
             @param callback         callback to be executed upon function result.
             @since v2.0
          */
          getSecureKeyValuePairs(keys:Array<string>, publicAccessName:string, callback:ISecurityResultCallback);
          /**
             @method
             Returns if the device has been modified in anyhow
             @return {boolean} true if the device has been modified; false otherwise
             @since v2.0
          */
          isDeviceModified() : boolean;
          /**
             @method
             Stores in the device internal storage the specified item/s.
             @param keyValues        Array containing the items to store on the device internal memory.
             @param publicAccessName The name of the shared internal storage object (if needed).
             @param callback         callback to be executed upon function result.
             @since v2.0
          */
          setSecureKeyValuePairs(keyValues:Array<SecureKeyPair>, publicAccessName:string, callback:ISecurityResultCallback);
     }
     /**
        Interface defining methods about the acceleration sensor

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IAcceleration
     */
     export interface IAcceleration extends IBaseSensor {
          /**
             @method
             Register a new listener that will receive acceleration events.
             @param listener to be registered.
             @since v2.0
          */
          addAccelerationListener(listener:IAccelerationListener);
          /**
             @method
             De-registers an existing listener from receiving acceleration events.
             @param listener to be registered.
             @since v2.0
          */
          removeAccelerationListener(listener:IAccelerationListener);
          /**
             @method
             Removed all existing listeners from receiving acceleration events.
             @since v2.0
          */
          removeAccelerationListeners();
     }
     /**
        Interface for managinf the Ambient Light

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IAmbientLight
     */
     export interface IAmbientLight extends IBaseSensor {
     }
     /**
        Interface for Barometer management purposes

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IBarometer
     */
     export interface IBarometer extends IBaseSensor {
     }
     /**
        Interface for Managing the Geolocation operations

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IGeolocation
     */
     export interface IGeolocation extends IBaseSensor {
          /**
             @method
             Register a new listener that will receive geolocation events.
             @param listener to be registered.
             @since v2.0
          */
          addGeolocationListener(listener:IGeolocationListener);
          /**
             @method
             De-registers an existing listener from receiving geolocation events.
             @param listener to be registered.
             @since v2.0
          */
          removeGeolocationListener(listener:IGeolocationListener);
          /**
             @method
             Removed all existing listeners from receiving geolocation events.
             @since v2.0
          */
          removeGeolocationListeners();
     }
     /**
        Interface for Managing the Giroscope operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IGyroscope
     */
     export interface IGyroscope extends IBaseSensor {
     }
     /**
        Interface for Managing the Magnetometer operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IMagnetometer
     */
     export interface IMagnetometer extends IBaseSensor {
     }
     /**
        Interface for Managing the Proximity operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IProximity
     */
     export interface IProximity extends IBaseSensor {
     }
     /**
        Interface for Managing the Facebook operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IFacebook
     */
     export interface IFacebook extends IBaseSocial {
     }
     /**
        Interface for Managing the Google Plus operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IGooglePlus
     */
     export interface IGooglePlus extends IBaseSocial {
     }
     /**
        Interface for Managing the Linkedin operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.ILinkedIn
     */
     export interface ILinkedIn extends IBaseSocial {
     }
     /**
        Interface for Managing the RSS operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IRSS
     */
     export interface IRSS extends IBaseSocial {
     }
     /**
        Interface for Managing the Twitter operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.ITwitter
     */
     export interface ITwitter extends IBaseSocial {
     }
     /**
        Interface for testing the Capabilities operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.ICapabilities
     */
     export interface ICapabilities extends IBaseSystem {
          /**
             @method
             Obtains the default orientation of the device/display. If no default orientation is available on
the platform, this method will return the current orientation. To capture device or display orientation
changes please use the IDevice and IDisplay functions and listeners API respectively.
             @return {Adaptive.ICapabilitiesOrientation} The default orientation for the device/display.
             @since v2.0.5
          */
          getOrientationDefault() : ICapabilitiesOrientation;
          /**
             @method
             Provides the device/display orientations supported by the platform. A platform will usually
support at least one orientation. This is usually PortaitUp.
             @return {Adaptive.ICapabilitiesOrientation[]} The orientations supported by the device/display of the platform.
             @since v2.0.5
          */
          getOrientationsSupported() : Array<ICapabilitiesOrientation>;
          /**
             @method
             Determines whether a specific hardware button is supported for interaction.
             @param type Type of feature to check.
             @return {boolean} true is supported, false otherwise.
             @since v2.0
          */
          hasButtonSupport(type:ICapabilitiesButton) : boolean;
          /**
             @method
             Determines whether a specific Communication capability is supported by
the device.
             @param type Type of feature to check.
             @return {boolean} true if supported, false otherwise.
             @since v2.0
          */
          hasCommunicationSupport(type:ICapabilitiesCommunication) : boolean;
          /**
             @method
             Determines whether a specific Data capability is supported by the device.
             @param type Type of feature to check.
             @return {boolean} true if supported, false otherwise.
             @since v2.0
          */
          hasDataSupport(type:ICapabilitiesData) : boolean;
          /**
             @method
             Determines whether a specific Media capability is supported by the
device.
             @param type Type of feature to check.
             @return {boolean} true if supported, false otherwise.
             @since v2.0
          */
          hasMediaSupport(type:ICapabilitiesMedia) : boolean;
          /**
             @method
             Determines whether a specific Net capability is supported by the device.
             @param type Type of feature to check.
             @return {boolean} true if supported, false otherwise.
             @since v2.0
          */
          hasNetSupport(type:ICapabilitiesNet) : boolean;
          /**
             @method
             Determines whether a specific Notification capability is supported by the
device.
             @param type Type of feature to check.
             @return {boolean} true if supported, false otherwise.
             @since v2.0
          */
          hasNotificationSupport(type:ICapabilitiesNotification) : boolean;
          /**
             @method
             Determines whether the device/display supports a given orientation.
             @param orientation Orientation type.
             @return {boolean} True if the given orientation is supported, false otherwise.
             @since v2.0.5
          */
          hasOrientationSupport(orientation:ICapabilitiesOrientation) : boolean;
          /**
             @method
             Determines whether a specific Sensor capability is supported by the
device.
             @param type Type of feature to check.
             @return {boolean} true if supported, false otherwise.
             @since v2.0
          */
          hasSensorSupport(type:ICapabilitiesSensor) : boolean;
     }
     /**
        Interface for Managing the Device operations

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IDevice
     */
     export interface IDevice extends IBaseSystem {
          /**
             @method
             Register a new listener that will receive button events.
             @param listener to be registered.
             @since v2.0
          */
          addButtonListener(listener:IButtonListener);
          /**
             @method
             Add a listener to start receiving device orientation change events.
             @param listener Listener to add to receive orientation change events.
             @since v2.0.5
          */
          addDeviceOrientationListener(listener:IDeviceOrientationListener);
          /**
             @method
             Returns the device information for the current device executing the runtime.
             @return {Adaptive.DeviceInfo} DeviceInfo for the current device.
             @since v2.0
          */
          getDeviceInfo() : DeviceInfo;
          /**
             @method
             Gets the current Locale for the device.
             @return {Adaptive.Locale} The current Locale information.
             @since v2.0
          */
          getLocaleCurrent() : Locale;
          /**
             @method
             Returns the current orientation of the device. Please note that this may be different from the orientation
of the display. For display orientation, use the IDisplay APIs.
             @return {Adaptive.ICapabilitiesOrientation} The current orientation of the device.
             @since v2.0.5
          */
          getOrientationCurrent() : ICapabilitiesOrientation;
          /**
             @method
             De-registers an existing listener from receiving button events.
             @param listener to be removed.
             @since v2.0
          */
          removeButtonListener(listener:IButtonListener);
          /**
             @method
             Removed all existing listeners from receiving button events.
             @since v2.0
          */
          removeButtonListeners();
          /**
             @method
             Remove a listener to stop receiving device orientation change events.
             @param listener Listener to remove from receiving orientation change events.
             @since v2.0.5
          */
          removeDeviceOrientationListener(listener:IDeviceOrientationListener);
          /**
             @method
             Remove all listeners receiving device orientation events.
             @since v2.0.5
          */
          removeDeviceOrientationListeners();
     }
     /**
        Interface for Managing the Display operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IDisplay
     */
     export interface IDisplay extends IBaseSystem {
          /**
             @method
             Add a listener to start receiving display orientation change events.
             @param listener Listener to add to receive orientation change events.
             @since v2.0.5
          */
          addDisplayOrientationListener(listener:IDisplayOrientationListener);
          /**
             @method
             Returns the current orientation of the display. Please note that this may be different from the orientation
of the device. For device orientation, use the IDevice APIs.
             @return {Adaptive.ICapabilitiesOrientation} The current orientation of the display.
             @since v2.0.5
          */
          getOrientationCurrent() : ICapabilitiesOrientation;
          /**
             @method
             Remove a listener to stop receiving display orientation change events.
             @param listener Listener to remove from receiving orientation change events.
             @since v2.0.5
          */
          removeDisplayOrientationListener(listener:IDisplayOrientationListener);
          /**
             @method
             Remove all listeners receiving display orientation events.
             @since v2.0.5
          */
          removeDisplayOrientationListeners();
     }
     /**
        Interface for Managing the OS operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IOS
     */
     export interface IOS extends IBaseSystem {
          /**
             @method
             Returns the OSInfo for the current operating system.
             @return {Adaptive.OSInfo} OSInfo with name, version and vendor of the OS.
             @since v2.0
          */
          getOSInfo() : OSInfo;
     }
     /**
        Interface for Managing the Runtime operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IRuntime
     */
     export interface IRuntime extends IBaseSystem {
          /**
             @method
             Dismiss the current Application
             @since v2.0
          */
          dismissApplication();
          /**
             @method
             Whether the application dismiss the splash screen successfully or not
             @return {boolean} true if the application has dismissed the splash screen;false otherwise
             @since v2.0
          */
          dismissSplashScreen() : boolean;
     }
     /**
        Interface for Managing the browser operations

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IBrowser
     */
     export interface IBrowser extends IBaseUI {
          /**
             @method
             Method for opening a URL like a link in the native default browser
             @param url Url to open
             @return {boolean} The result of the operation
             @since v2.0
          */
          openExtenalBrowser(url:string) : boolean;
          /**
             @method
             Method for opening a browser embedded into the application in a modal window
             @param url            Url to open
             @param title          Title of the Navigation bar
             @param backButtonText Title of the Back button bar
             @return {boolean} The result of the operation
             @since v2.0
          */
          openInternalBrowserModal(url:string, title:string, backButtonText:string) : boolean;
          /**
             @method
             Method for opening a browser embedded into the application
             @param url            Url to open
             @param title          Title of the Navigation bar
             @param backButtonText Title of the Back button bar
             @return {boolean} The result of the operation
             @since v2.0
          */
          openInternalBrowser(url:string, title:string, backButtonText:string) : boolean;
     }
     /**
        Interface for Managing the Desktop operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IDesktop
     */
     export interface IDesktop extends IBaseUI {
     }
     /**
        Interface for Managing the Map operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IMap
     */
     export interface IMap extends IBaseUI {
     }
     /**
        Interface for Managing the UI operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IUI
     */
     export interface IUI extends IBaseUI {
     }
     /**
        Interface for Managing the Compression operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.ICompression
     */
     export interface ICompression extends IBaseUtil {
     }
     /**
        Interface for Managing the Concurrent operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.IConcurrent
     */
     export interface IConcurrent extends IBaseUtil {
     }
     /**
        Interface for Managing the Cloud operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.ICrypto
     */
     export interface ICrypto extends IBaseUtil {
     }
     /**
        Interface for Managing the Logging operations

        @author Ferran Vila Conesa
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.ILogging
     */
     export interface ILogging extends IBaseUtil {
          /**
             Logs the given message, with the given log level if specified, to the standard platform/environment.
             @param level    Log level
             @param category Category/tag name to identify/filter the log.
             @param message  Message to be logged
             @since v2.0
          */
          logLevelCategoryMessage(level:ILoggingLogLevel, category:string, message:string);
          /**
             Logs the given message, with the given log level if specified, to the standard platform/environment.
             @param level   Log level
             @param message Message to be logged
             @since v2.0
          */
          logLevelMessage(level:ILoggingLogLevel, message:string);
     }
     /**
        Interface for Managing the Timer operations

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     /**
        @class Adaptive.ITimer
     */
     export interface ITimer extends IBaseUtil {
     }
     /**
        @class Adaptive.APIBean
        Structure representing a native response to the HTML5

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     export class APIBean {
          /**
             @method constructor
             Default constructor

             @since v2.0
          */
          constructor() {
          }
          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.APIBean.
             @return {Adaptive.APIBean} Wrapped object instance.
          */
          static toObject(object : any) : APIBean {
               var result : APIBean = new APIBean();

               if (object != null ) {
               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.APIBean[].
             @return {Adaptive.APIBean[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : APIBean[] {
               var resultArray : Array<APIBean> = new Array<APIBean>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(APIBean.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.APIRequest
        Structure representing a HTML5 request to the native API.

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     export class APIRequest {
          /**
             @property {string} apiVersion
             Identifier of API version of this request.
          */
          apiVersion : string;

          /**
             @property {string} apiVersion
             Identifier of API version of this request. The 'apiVersionProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'apiVersion'.
          */
          get apiVersionProperty() : string {
               return this.apiVersion;
          }

          set apiVersionProperty(apiVersion:string) {
               this.apiVersion = apiVersion;
          }

          /**
             @property {number} asyncId
             Identifier of callback or listener for async operations.
          */
          asyncId : number;

          /**
             @property {number} asyncId
             Identifier of callback or listener for async operations. The 'asyncIdProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'asyncId'.
          */
          get asyncIdProperty() : number {
               return this.asyncId;
          }

          set asyncIdProperty(asyncId:number) {
               this.asyncId = asyncId;
          }

          /**
             @property {string} bridgeType
             String representing the bridge type to obtain.
          */
          bridgeType : string;

          /**
             @property {string} bridgeType
             String representing the bridge type to obtain. The 'bridgeTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'bridgeType'.
          */
          get bridgeTypeProperty() : string {
               return this.bridgeType;
          }

          set bridgeTypeProperty(bridgeType:string) {
               this.bridgeType = bridgeType;
          }

          /**
             @property {string} methodName
             String representing the method name to call.
          */
          methodName : string;

          /**
             @property {string} methodName
             String representing the method name to call. The 'methodNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'methodName'.
          */
          get methodNameProperty() : string {
               return this.methodName;
          }

          set methodNameProperty(methodName:string) {
               this.methodName = methodName;
          }

          /**
             @property {string[]} parameters
             Parameters of the request as JSON formatted strings.
          */
          parameters : Array<string>;

          /**
             @property {string[]} parameters
             Parameters of the request as JSON formatted strings. The 'parametersProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'parameters'.
          */
          get parametersProperty() : Array<string> {
               return this.parameters;
          }

          set parametersProperty(parameters:Array<string>) {
               this.parameters = parameters;
          }

          /**
             @method constructor
             Constructor with all the parameters

             @param {string} bridgeType Name of the bridge to be invoked.
             @param {string} methodName Name of the method
             @param {string[]} parameters Array of parameters as JSON formatted strings.
             @param {number} asyncId    Id of callback or listener or zero if none for synchronous calls.
             @since v2.0
          */
          constructor(bridgeType: string, methodName: string, parameters: Array<string>, asyncId: number) {
               this.bridgeType = bridgeType;
               this.methodName = methodName;
               this.parameters = parameters;
               this.asyncId = asyncId;
          }
          /**
             @method
             Returns the request's API version. This should be the same or higher than the platform managing the
request.

             @return {string} String with the API version of the request.
          */
          getApiVersion() : string {
               return this.apiVersion;
          }

          /**
             @method
             Sets the request's API version. This should be the same or higher than the platform managing the
request.

             @param {string} apiVersion String with the API version of the request.
          */
          setApiVersion(apiVersion: string) {
               this.apiVersion = apiVersion;
          }

          /**
             @method
             Returns the callback or listener id assigned to this request OR zero if there is no associated callback or
listener.

             @return {number} long with the unique id of the callback or listener, or zero if there is no associated async event.
          */
          getAsyncId() : number {
               return this.asyncId;
          }

          /**
             @method
             Sets the callback or listener id to the request.

             @param {number} asyncId The unique id of the callback or listener.
          */
          setAsyncId(asyncId: number) {
               this.asyncId = asyncId;
          }

          /**
             @method
             Bridge Type Getter

             @return {string} Bridge Type
             @since v2.0
          */
          getBridgeType() : string {
               return this.bridgeType;
          }

          /**
             @method
             Bridge Type Setter

             @param {string} bridgeType Bridge Type
             @since v2.0
          */
          setBridgeType(bridgeType: string) {
               this.bridgeType = bridgeType;
          }

          /**
             @method
             Method name Getter

             @return {string} Method name
             @since v2.0
          */
          getMethodName() : string {
               return this.methodName;
          }

          /**
             @method
             Method name Setter

             @param {string} methodName Method name
             @since v2.0
          */
          setMethodName(methodName: string) {
               this.methodName = methodName;
          }

          /**
             @method
             Parameters Getter

             @return {string[]} Parameters
             @since v2.0
          */
          getParameters() : Array<string> {
               return this.parameters;
          }

          /**
             @method
             Parameters Setter

             @param {string[]} parameters Parameters, JSON formatted strings of objects.
             @since v2.0
          */
          setParameters(parameters: Array<string>) {
               this.parameters = parameters;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.APIRequest.
             @return {Adaptive.APIRequest} Wrapped object instance.
          */
          static toObject(object : any) : APIRequest {
               var result : APIRequest = new APIRequest(null, null, null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.bridgeType = object.bridgeType;
                    result.methodName = object.methodName;
                    if (object.parameters != null) {
                         result.parameters = new Array<string>();
                         for(var iparameters = 0; iparameters < object.parameters.length; iparameters++) {
                              var vparameters = object.parameters[iparameters];
                              result.parameters.push(vparameters);
                         }
                    }
                    result.asyncId = object.asyncId;
                    result.apiVersion = object.apiVersion;

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.APIRequest[].
             @return {Adaptive.APIRequest[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : APIRequest[] {
               var resultArray : Array<APIRequest> = new Array<APIRequest>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(APIRequest.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.APIResponse
        Structure representing a JSON response to the HTML5 layer.

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     export class APIResponse {
          /**
             @property {string} response
             String representing the JavaScript value or JSON object representation of the response.
          */
          response : string;

          /**
             @property {string} response
             String representing the JavaScript value or JSON object representation of the response. The 'responseProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'response'.
          */
          get responseProperty() : string {
               return this.response;
          }

          set responseProperty(response:string) {
               this.response = response;
          }

          /**
             @property {number} statusCode
             Status code of the response
          */
          statusCode : number;

          /**
             @property {number} statusCode
             Status code of the response The 'statusCodeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'statusCode'.
          */
          get statusCodeProperty() : number {
               return this.statusCode;
          }

          set statusCodeProperty(statusCode:number) {
               this.statusCode = statusCode;
          }

          /**
             @property {string} statusMessage
             Status message of the response
          */
          statusMessage : string;

          /**
             @property {string} statusMessage
             Status message of the response The 'statusMessageProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'statusMessage'.
          */
          get statusMessageProperty() : string {
               return this.statusMessage;
          }

          set statusMessageProperty(statusMessage:string) {
               this.statusMessage = statusMessage;
          }

          /**
             @method constructor
             Constructor with parameters.

             @param {string} response      String representing the JavaScript value or JSON object representation of the response.
             @param {number} statusCode    Status code of the response (200 = OK, others are warning or error conditions).
             @param {string} statusMessage Status message of the response.
          */
          constructor(response: string, statusCode: number, statusMessage: string) {
               this.response = response;
               this.statusCode = statusCode;
               this.statusMessage = statusMessage;
          }
          /**
             @method
             Response getter

             @return {string} String representing the JavaScript value or JSON object representation of the response.
             @since v2.0
          */
          getResponse() : string {
               return this.response;
          }

          /**
             @method
             Response setter

             @param {string} response String representing the JavaScript value or JSON object representation of the response.
          */
          setResponse(response: string) {
               this.response = response;
          }

          /**
             @method
             Status code getter

             @return {number} Status code of the response (200 = OK, others are warning or error conditions).
          */
          getStatusCode() : number {
               return this.statusCode;
          }

          /**
             @method
             Status code setter

             @param {number} statusCode Status code of the response  (200 = OK, others are warning or error conditions).
          */
          setStatusCode(statusCode: number) {
               this.statusCode = statusCode;
          }

          /**
             @method
             Status message getter

             @return {string} Status message of the response.
          */
          getStatusMessage() : string {
               return this.statusMessage;
          }

          /**
             @method
             Status message setter.

             @param {string} statusMessage Status message of the response
          */
          setStatusMessage(statusMessage: string) {
               this.statusMessage = statusMessage;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.APIResponse.
             @return {Adaptive.APIResponse} Wrapped object instance.
          */
          static toObject(object : any) : APIResponse {
               var result : APIResponse = new APIResponse(null, null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.response = object.response;
                    result.statusCode = object.statusCode;
                    result.statusMessage = object.statusMessage;

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.APIResponse[].
             @return {Adaptive.APIResponse[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : APIResponse[] {
               var resultArray : Array<APIResponse> = new Array<APIResponse>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(APIResponse.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.AppResourceData
        This class represents a resource provided by the platform from the application's secure payload.

        @author Carlos Lozano Diez
        @since v2.1.3
        @version 1.0
     */
     export class AppResourceData {
          /**
             @property {boolean} cooked
             Marker to indicate whether the resource is cooked in some way (compressed, encrypted, etc.) If true, the
implementation must uncompress/unencrypt following the cookedType recipe specified by the payload.
          */
          cooked : boolean;

          /**
             @property {boolean} cooked
             Marker to indicate whether the resource is cooked in some way (compressed, encrypted, etc.) If true, the
implementation must uncompress/unencrypt following the cookedType recipe specified by the payload. The 'cookedProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'cooked'.
          */
          get cookedProperty() : boolean {
               return this.cooked;
          }

          set cookedProperty(cooked:boolean) {
               this.cooked = cooked;
          }

          /**
             @property {number} cookedLength
             This is the length of the payload after cooking. In general, this length indicates the amount
of space saved with regard to the rawLength of the payload.
          */
          cookedLength : number;

          /**
             @property {number} cookedLength
             This is the length of the payload after cooking. In general, this length indicates the amount
of space saved with regard to the rawLength of the payload. The 'cookedLengthProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'cookedLength'.
          */
          get cookedLengthProperty() : number {
               return this.cookedLength;
          }

          set cookedLengthProperty(cookedLength:number) {
               this.cookedLength = cookedLength;
          }

          /**
             @property {string} cookedType
             If the data is cooked, this field should contain the recipe to return the cooked data to its original
uncompressed/unencrypted/etc format.
          */
          cookedType : string;

          /**
             @property {string} cookedType
             If the data is cooked, this field should contain the recipe to return the cooked data to its original
uncompressed/unencrypted/etc format. The 'cookedTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'cookedType'.
          */
          get cookedTypeProperty() : string {
               return this.cookedType;
          }

          set cookedTypeProperty(cookedType:string) {
               this.cookedType = cookedType;
          }

          /**
             @property {number[]} data
             The payload data of the resource in ready to consume format.
          */
          data : Array<number>;

          /**
             @property {number[]} data
             The payload data of the resource in ready to consume format. The 'dataProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'data'.
          */
          get dataProperty() : Array<number> {
               return this.data;
          }

          set dataProperty(data:Array<number>) {
               this.data = data;
          }

          /**
             @property {string} id
             The id or path identifier of the resource.
          */
          id : string;

          /**
             @property {string} id
             The id or path identifier of the resource. The 'idProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'id'.
          */
          get idProperty() : string {
               return this.id;
          }

          set idProperty(id:string) {
               this.id = id;
          }

          /**
             @property {number} rawLength
             The raw length of the payload before any cooking occurred. This is equivalent to the size of the resource
after uncompressing and unencrypting.
          */
          rawLength : number;

          /**
             @property {number} rawLength
             The raw length of the payload before any cooking occurred. This is equivalent to the size of the resource
after uncompressing and unencrypting. The 'rawLengthProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'rawLength'.
          */
          get rawLengthProperty() : number {
               return this.rawLength;
          }

          set rawLengthProperty(rawLength:number) {
               this.rawLength = rawLength;
          }

          /**
             @property {string} rawType
             The raw type of the payload - this is equivalent to the mimetype of the content.
          */
          rawType : string;

          /**
             @property {string} rawType
             The raw type of the payload - this is equivalent to the mimetype of the content. The 'rawTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'rawType'.
          */
          get rawTypeProperty() : string {
               return this.rawType;
          }

          set rawTypeProperty(rawType:string) {
               this.rawType = rawType;
          }

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
          constructor(id: string, data: Array<number>, rawType: string, rawLength: number, cooked: boolean, cookedType: string, cookedLength: number) {
               this.id = id;
               this.data = data;
               this.rawType = rawType;
               this.rawLength = rawLength;
               this.cooked = cooked;
               this.cookedType = cookedType;
               this.cookedLength = cookedLength;
          }
          /**
             @method
             Attribute to denote whether the payload of the resource is cooked.

             @return {boolean} True if the resource is cooked, false otherwise.
             @since v2.1.3
          */
          getCooked() : boolean {
               return this.cooked;
          }

          /**
             @method
             Attribute to denote whether the payload of the resource is cooked.

             @param {boolean} cooked True if the resource is cooked, false otherwise.
             @since v2.1.3
          */
          setCooked(cooked: boolean) {
               this.cooked = cooked;
          }

          /**
             @method
             The length in bytes of the payload after cooking.

             @return {number} Length in bytes of cooked payload.
             @since v2.1.3
          */
          getCookedLength() : number {
               return this.cookedLength;
          }

          /**
             @method
             The length in bytes of the payload after cooking.

             @param {number} cookedLength Length in bytes of cooked payload.
             @since v2.1.3
          */
          setCookedLength(cookedLength: number) {
               this.cookedLength = cookedLength;
          }

          /**
             @method
             If the resource is cooked, this will return the recipe used during cooking.

             @return {string} The cooking recipe to reverse the cooking process.
             @since v2.1.3
          */
          getCookedType() : string {
               return this.cookedType;
          }

          /**
             @method
             If the resource is cooked, the type of recipe used during cooking.

             @param {string} cookedType The cooking recipe used during cooking.
             @since v2.1.3
          */
          setCookedType(cookedType: string) {
               this.cookedType = cookedType;
          }

          /**
             @method
             Returns the payload of the resource.

             @return {number[]} Binary payload of the resource.
             @since v2.1.3
          */
          getData() : Array<number> {
               return this.data;
          }

          /**
             @method
             Sets the payload of the resource.

             @param {number[]} data Binary payload of the resource.
             @since v2.1.3
          */
          setData(data: Array<number>) {
               this.data = data;
          }

          /**
             @method
             Gets The id or path identifier of the resource.

             @return {string} id The id or path identifier of the resource.
          */
          getId() : string {
               return this.id;
          }

          /**
             @method
             Sets the id or path of the resource.

             @param {string} id The id or path of the resource.
             @since v2.1.3
          */
          setId(id: string) {
               this.id = id;
          }

          /**
             @method
             Gets the resource payload's original length.

             @return {number} Original length of the resource in bytes before cooking.
             @since v2.1.3
          */
          getRawLength() : number {
               return this.rawLength;
          }

          /**
             @method
             Sets the resource payload's original length.

             @param {number} rawLength Original length of the resource in bytes before cooking.
             @since v2.1.3
          */
          setRawLength(rawLength: number) {
               this.rawLength = rawLength;
          }

          /**
             @method
             Gets the resource's raw type or mimetype.

             @return {string} Resource's type or mimetype.
             @since v2.1.3
          */
          getRawType() : string {
               return this.rawType;
          }

          /**
             @method
             Sets the resource's raw type or mimetype.

             @param {string} rawType Resource's type or mimetype.
             @since v2.1.3
          */
          setRawType(rawType: string) {
               this.rawType = rawType;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.AppResourceData.
             @return {Adaptive.AppResourceData} Wrapped object instance.
          */
          static toObject(object : any) : AppResourceData {
               var result : AppResourceData = new AppResourceData(null, null, null, null, null, null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.id = object.id;
                    if (object.data != null) {
                         result.data = new Array<number>();
                         for(var idata = 0; idata < object.data.length; idata++) {
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
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.AppResourceData[].
             @return {Adaptive.AppResourceData[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : AppResourceData[] {
               var resultArray : Array<AppResourceData> = new Array<AppResourceData>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(AppResourceData.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.Service
        Represents an instance of a service.

        @author Aryslan
        @since v2.0
        @version 1.0
     */
     export class Service {
          /**
             @property {string} name
             The service name
          */
          name : string;

          /**
             @property {string} name
             The service name The 'nameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'name'.
          */
          get nameProperty() : string {
               return this.name;
          }

          set nameProperty(name:string) {
               this.name = name;
          }

          /**
             @property {Adaptive.ServiceEndpoint[]} serviceEndpoints
             Endpoint of the service
          */
          serviceEndpoints : Array<ServiceEndpoint>;

          /**
             @property {Adaptive.ServiceEndpoint[]} serviceEndpoints
             Endpoint of the service The 'serviceEndpointsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'serviceEndpoints'.
          */
          get serviceEndpointsProperty() : Array<ServiceEndpoint> {
               return this.serviceEndpoints;
          }

          set serviceEndpointsProperty(serviceEndpoints:Array<ServiceEndpoint>) {
               this.serviceEndpoints = serviceEndpoints;
          }

          /**
             @method constructor
             Constructor used by the implementation

             @param {Adaptive.ServiceEndpoint[]} serviceEndpoints Endpoints of the service
             @param {string} name             Name of the service
             @since v2.0.6
          */
          constructor(serviceEndpoints: Array<ServiceEndpoint>, name: string) {
               this.serviceEndpoints = serviceEndpoints;
               this.name = name;
          }
          /**
             @method
             Returns the name

             @return {string} name
             @since v2.0
          */
          getName() : string {
               return this.name;
          }

          /**
             @method
             Set the name

             @param {string} name Name of the service
             @since v2.0
          */
          setName(name: string) {
               this.name = name;
          }

          /**
             @method
             Returns the serviceEndpoints

             @return {Adaptive.ServiceEndpoint[]} serviceEndpoints
             @since v2.0
          */
          getServiceEndpoints() : Array<ServiceEndpoint> {
               return this.serviceEndpoints;
          }

          /**
             @method
             Set the serviceEndpoints

             @param {Adaptive.ServiceEndpoint[]} serviceEndpoints Endpoint of the service
             @since v2.0
          */
          setServiceEndpoints(serviceEndpoints: Array<ServiceEndpoint>) {
               this.serviceEndpoints = serviceEndpoints;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.Service.
             @return {Adaptive.Service} Wrapped object instance.
          */
          static toObject(object : any) : Service {
               var result : Service = new Service(null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.serviceEndpoints = ServiceEndpoint.toObjectArray(object.serviceEndpoints);
                    result.name = object.name;

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.Service[].
             @return {Adaptive.Service[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : Service[] {
               var resultArray : Array<Service> = new Array<Service>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(Service.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.ServiceEndpoint
        Structure representing a remote or local service access end-point.

        @author Aryslan
        @since v2.0
        @version 1.0
     */
     export class ServiceEndpoint {
          /**
             @property {Adaptive.IServiceCertificateValidation} validationType
             Type of validation to be performed for SSL hosts.
          */
          validationType : IServiceCertificateValidation;

          /**
             @property {Adaptive.IServiceCertificateValidation} validationType
             Type of validation to be performed for SSL hosts. The 'validationTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'validationType'.
          */
          get validationTypeProperty() : IServiceCertificateValidation {
               return this.validationType;
          }

          set validationTypeProperty(validationType:IServiceCertificateValidation) {
               this.validationType = validationType;
          }

          /**
             @property {string} hostURI
             The remote service hostURI URI (alias or IP) composed of scheme://hostURI:port (http://hostURI:8080).
          */
          hostURI : string;

          /**
             @property {string} hostURI
             The remote service hostURI URI (alias or IP) composed of scheme://hostURI:port (http://hostURI:8080). The 'hostURIProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'hostURI'.
          */
          get hostURIProperty() : string {
               return this.hostURI;
          }

          set hostURIProperty(hostURI:string) {
               this.hostURI = hostURI;
          }

          /**
             @property {Adaptive.ServicePath[]} paths
             The remote service paths (to be added to the hostURI and port url).
          */
          paths : Array<ServicePath>;

          /**
             @property {Adaptive.ServicePath[]} paths
             The remote service paths (to be added to the hostURI and port url). The 'pathsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'paths'.
          */
          get pathsProperty() : Array<ServicePath> {
               return this.paths;
          }

          set pathsProperty(paths:Array<ServicePath>) {
               this.paths = paths;
          }

          /**
             @method constructor
             Constructor with parameters

             @param {string} hostURI Remote service hostURI
             @param {Adaptive.ServicePath[]} paths   Remote service Paths
             @since v2.0.6
          */
          constructor(hostURI: string, paths: Array<ServicePath>) {
               this.hostURI = hostURI;
               this.paths = paths;
          }
          /**
             @method
             Gets the validation type for the certificate of a SSL host.

             @return {Adaptive.IServiceCertificateValidation} Type of validation.
             @since v2.0.6
          */
          getValidationType() : IServiceCertificateValidation {
               return this.validationType;
          }

          /**
             @method
             Sets the validation type for the certificate of a SSL host.

             @param {Adaptive.IServiceCertificateValidation} validationType Type of validation.
             @since v2.0.6
          */
          setValidationType(validationType: IServiceCertificateValidation) {
               this.validationType = validationType;
          }

          /**
             @method
             Returns the Remote service hostURI

             @return {string} Remote service hostURI
             @since v2.0
          */
          getHostURI() : string {
               return this.hostURI;
          }

          /**
             @method
             Set the Remote service hostURI

             @param {string} hostURI Remote service hostURI
             @since v2.0
          */
          setHostURI(hostURI: string) {
               this.hostURI = hostURI;
          }

          /**
             @method
             Returns the Remote service Paths

             @return {Adaptive.ServicePath[]} Remote service Paths
             @since v2.0
          */
          getPaths() : Array<ServicePath> {
               return this.paths;
          }

          /**
             @method
             Set the Remote service Paths

             @param {Adaptive.ServicePath[]} paths Remote service Paths
             @since v2.0
          */
          setPaths(paths: Array<ServicePath>) {
               this.paths = paths;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ServiceEndpoint.
             @return {Adaptive.ServiceEndpoint} Wrapped object instance.
          */
          static toObject(object : any) : ServiceEndpoint {
               var result : ServiceEndpoint = new ServiceEndpoint(null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.validationType = IServiceCertificateValidation.toObject(object.validationType);
                    result.hostURI = object.hostURI;
                    result.paths = ServicePath.toObjectArray(object.paths);

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ServiceEndpoint[].
             @return {Adaptive.ServiceEndpoint[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : ServiceEndpoint[] {
               var resultArray : Array<ServiceEndpoint> = new Array<ServiceEndpoint>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(ServiceEndpoint.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.ServicePath
        Structure representing a service path for one endpoint

        @author fnva
        @since v2.0.4
        @version 1.0
     */
     export class ServicePath {
          /**
             @property {Adaptive.IServiceType} type
             Service endpoint type.
          */
          type : IServiceType;

          /**
             @property {Adaptive.IServiceType} type
             Service endpoint type. The 'typeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'type'.
          */
          get typeProperty() : IServiceType {
               return this.type;
          }

          set typeProperty(type:IServiceType) {
               this.type = type;
          }

          /**
             @property {Adaptive.IServiceMethod[]} methods
             The methods for calling a path.
          */
          methods : Array<IServiceMethod>;

          /**
             @property {Adaptive.IServiceMethod[]} methods
             The methods for calling a path. The 'methodsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'methods'.
          */
          get methodsProperty() : Array<IServiceMethod> {
               return this.methods;
          }

          set methodsProperty(methods:Array<IServiceMethod>) {
               this.methods = methods;
          }

          /**
             @property {string} path
             The path for the endpoint.
          */
          path : string;

          /**
             @property {string} path
             The path for the endpoint. The 'pathProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'path'.
          */
          get pathProperty() : string {
               return this.path;
          }

          set pathProperty(path:string) {
               this.path = path;
          }

          /**
             @method constructor
             Constructor with parameters.

             @param {string} path    The path for the endpoint
             @param {Adaptive.IServiceMethod[]} methods The methods for calling a path
             @param {Adaptive.IServiceType} type    Protocol type.
             @since v2.0.6
          */
          constructor(path: string, methods: Array<IServiceMethod>, type: IServiceType) {
               this.path = path;
               this.methods = methods;
               this.type = type;
          }
          /**
             @method
             Gets the protocol for the path.

             @return {Adaptive.IServiceType} Type of protocol.
             @since v2.0.6
          */
          getType() : IServiceType {
               return this.type;
          }

          /**
             @method
             Sets the protocol for the path.

             @param {Adaptive.IServiceType} type Type of protocol.
             @since v2.0.6
          */
          setType(type: IServiceType) {
               this.type = type;
          }

          /**
             @method
             Endpoint's path methods setter

             @return {Adaptive.IServiceMethod[]} Endpoint's path methods
             @since v2.0.4
          */
          getMethods() : Array<IServiceMethod> {
               return this.methods;
          }

          /**
             @method
             Endpoint's path methods setter

             @param {Adaptive.IServiceMethod[]} methods Endpoint's path methods
             @since v2.0.4
          */
          setMethods(methods: Array<IServiceMethod>) {
               this.methods = methods;
          }

          /**
             @method
             Endpoint's Path Getter

             @return {string} Endpoint's Path
             @since v2.0.4
          */
          getPath() : string {
               return this.path;
          }

          /**
             @method
             Endpoint's path setter

             @param {string} path Endpoint's path
             @since v2.0.4
          */
          setPath(path: string) {
               this.path = path;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ServicePath.
             @return {Adaptive.ServicePath} Wrapped object instance.
          */
          static toObject(object : any) : ServicePath {
               var result : ServicePath = new ServicePath(null, null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.path = object.path;
                    if (object.methods != null) {
                         result.methods = new Array<IServiceMethod>();
                         for(var imethods = 0; imethods < object.methods.length; imethods++) {
                              var vmethods = object.methods[imethods];
                              result.methods.push(IServiceMethod.toObject(vmethods));
                         }
                    }
                    result.type = IServiceType.toObject(object.type);

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ServicePath[].
             @return {Adaptive.ServicePath[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : ServicePath[] {
               var resultArray : Array<ServicePath> = new Array<ServicePath>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(ServicePath.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.Acceleration
        @extends Adaptive.APIBean
        Structure representing the data of a single acceleration reading.

        @author Carlos Lozano Diez
        @since v2.0
        @version 1.0
     */
     export class Acceleration extends APIBean {
          /**
             @property {number} timestamp
             Timestamp of the acceleration reading.
          */
          timestamp : number;

          /**
             @property {number} timestamp
             Timestamp of the acceleration reading. The 'timestampProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'timestamp'.
          */
          get timestampProperty() : number {
               return this.timestamp;
          }

          set timestampProperty(timestamp:number) {
               this.timestamp = timestamp;
          }

          /**
             @property {number} x
             X-axis component of the acceleration.
          */
          x : number;

          /**
             @property {number} x
             X-axis component of the acceleration. The 'xProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'x'.
          */
          get xProperty() : number {
               return this.x;
          }

          set xProperty(x:number) {
               this.x = x;
          }

          /**
             @property {number} y
             Y-axis component of the acceleration.
          */
          y : number;

          /**
             @property {number} y
             Y-axis component of the acceleration. The 'yProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'y'.
          */
          get yProperty() : number {
               return this.y;
          }

          set yProperty(y:number) {
               this.y = y;
          }

          /**
             @property {number} z
             Z-axis component of the acceleration.
          */
          z : number;

          /**
             @property {number} z
             Z-axis component of the acceleration. The 'zProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'z'.
          */
          get zProperty() : number {
               return this.z;
          }

          set zProperty(z:number) {
               this.z = z;
          }

          /**
             @method constructor
             Constructor with fields

             @param {number} x         X Coordinate
             @param {number} y         Y Coordinate
             @param {number} z         Z Coordinate
             @param {number} timestamp Timestamp
             @since v2.0
          */
          constructor(x: number, y: number, z: number, timestamp: number) {
               super();
               this.x = x;
               this.y = y;
               this.z = z;
               this.timestamp = timestamp;
          }
          /**
             @method
             Timestamp Getter

             @return {number} Timestamp
             @since v2.0
          */
          getTimestamp() : number {
               return this.timestamp;
          }

          /**
             @method
             Timestamp Setter

             @param {number} timestamp Timestamp
             @since v2.0
          */
          setTimestamp(timestamp: number) {
               this.timestamp = timestamp;
          }

          /**
             @method
             X Coordinate Getter

             @return {number} X-axis component of the acceleration.
             @since v2.0
          */
          getX() : number {
               return this.x;
          }

          /**
             @method
             X Coordinate Setter

             @param {number} x X-axis component of the acceleration.
             @since v2.0
          */
          setX(x: number) {
               this.x = x;
          }

          /**
             @method
             Y Coordinate Getter

             @return {number} Y-axis component of the acceleration.
             @since v2.0
          */
          getY() : number {
               return this.y;
          }

          /**
             @method
             Y Coordinate Setter

             @param {number} y Y-axis component of the acceleration.
             @since v2.0
          */
          setY(y: number) {
               this.y = y;
          }

          /**
             @method
             Z Coordinate Getter

             @return {number} Z-axis component of the acceleration.
             @since v2.0
          */
          getZ() : number {
               return this.z;
          }

          /**
             @method
             Z Coordinate Setter

             @param {number} z Z Coordinate
             @since v2.0
          */
          setZ(z: number) {
               this.z = z;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.Acceleration.
             @return {Adaptive.Acceleration} Wrapped object instance.
          */
          static toObject(object : any) : Acceleration {
               var result : Acceleration = new Acceleration(null, null, null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.x = object.x;
                    result.y = object.y;
                    result.z = object.z;
                    result.timestamp = object.timestamp;

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.Acceleration[].
             @return {Adaptive.Acceleration[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : Acceleration[] {
               var resultArray : Array<Acceleration> = new Array<Acceleration>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(Acceleration.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.Button
        @extends Adaptive.APIBean
        Structure representing the a physical or logical button on a device.

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     export class Button extends APIBean {
          /**
             @property {Adaptive.ICapabilitiesButton} type
             Button type
          */
          type : ICapabilitiesButton;

          /**
             @property {Adaptive.ICapabilitiesButton} type
             Button type The 'typeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'type'.
          */
          get typeProperty() : ICapabilitiesButton {
               return this.type;
          }

          set typeProperty(type:ICapabilitiesButton) {
               this.type = type;
          }

          /**
             @method constructor
             Constructor with fields

             @param {Adaptive.ICapabilitiesButton} type Button type.
             @since v2.0
          */
          constructor(type: ICapabilitiesButton) {
               super();
               this.type = type;
          }
          /**
             @method
             Returns the button type

             @return {Adaptive.ICapabilitiesButton} type Button type.
             @since v2.0
          */
          getType() : ICapabilitiesButton {
               return this.type;
          }

          /**
             @method
             Setter for the button type

             @param {Adaptive.ICapabilitiesButton} type Button Type
             @since v2.0
          */
          setType(type: ICapabilitiesButton) {
               this.type = type;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.Button.
             @return {Adaptive.Button} Wrapped object instance.
          */
          static toObject(object : any) : Button {
               var result : Button = new Button(null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.type = ICapabilitiesButton.toObject(object.type);

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.Button[].
             @return {Adaptive.Button[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : Button[] {
               var resultArray : Array<Button> = new Array<Button>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(Button.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.ContactAddress
        @extends Adaptive.APIBean
        Structure representing the address data elements of a contact.

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     export class ContactAddress extends APIBean {
          /**
             @property {Adaptive.ContactAddressType} type
             The address type
          */
          type : ContactAddressType;

          /**
             @property {Adaptive.ContactAddressType} type
             The address type The 'typeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'type'.
          */
          get typeProperty() : ContactAddressType {
               return this.type;
          }

          set typeProperty(type:ContactAddressType) {
               this.type = type;
          }

          /**
             @property {string} address
             The Contact address
          */
          address : string;

          /**
             @property {string} address
             The Contact address The 'addressProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'address'.
          */
          get addressProperty() : string {
               return this.address;
          }

          set addressProperty(address:string) {
               this.address = address;
          }

          /**
             @method constructor
             Constructor with fields

             @param {string} address Address data.
             @param {Adaptive.ContactAddressType} type    Address type.
             @since v2.0
          */
          constructor(address: string, type: ContactAddressType) {
               super();
               this.address = address;
               this.type = type;
          }
          /**
             @method
             Returns the type of the address

             @return {Adaptive.ContactAddressType} AddressType Address type.
             @since v2.0
          */
          getType() : ContactAddressType {
               return this.type;
          }

          /**
             @method
             Set the address type

             @param {Adaptive.ContactAddressType} type Address type.
             @since v2.0
          */
          setType(type: ContactAddressType) {
               this.type = type;
          }

          /**
             @method
             Returns the Contact address

             @return {string} address Address data.
             @since v2.0
          */
          getAddress() : string {
               return this.address;
          }

          /**
             @method
             Set the address of the Contact

             @param {string} address Address data.
             @since v2.0
          */
          setAddress(address: string) {
               this.address = address;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ContactAddress.
             @return {Adaptive.ContactAddress} Wrapped object instance.
          */
          static toObject(object : any) : ContactAddress {
               var result : ContactAddress = new ContactAddress(null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.address = object.address;
                    result.type = ContactAddressType.toObject(object.type);

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ContactAddress[].
             @return {Adaptive.ContactAddress[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : ContactAddress[] {
               var resultArray : Array<ContactAddress> = new Array<ContactAddress>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(ContactAddress.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.ContactEmail
        @extends Adaptive.APIBean
        Structure representing the email data elements of a contact.

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     export class ContactEmail extends APIBean {
          /**
             @property {Adaptive.ContactEmailType} type
             The type of the email
          */
          type : ContactEmailType;

          /**
             @property {Adaptive.ContactEmailType} type
             The type of the email The 'typeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'type'.
          */
          get typeProperty() : ContactEmailType {
               return this.type;
          }

          set typeProperty(type:ContactEmailType) {
               this.type = type;
          }

          /**
             @property {string} email
             Email of the Contact
          */
          email : string;

          /**
             @property {string} email
             Email of the Contact The 'emailProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'email'.
          */
          get emailProperty() : string {
               return this.email;
          }

          set emailProperty(email:string) {
               this.email = email;
          }

          /**
             @property {boolean} primary
             Whether the email is the primary one or not
          */
          primary : boolean;

          /**
             @property {boolean} primary
             Whether the email is the primary one or not The 'primaryProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'primary'.
          */
          get primaryProperty() : boolean {
               return this.primary;
          }

          set primaryProperty(primary:boolean) {
               this.primary = primary;
          }

          /**
             @method constructor
             Constructor used by the implementation

             @param {Adaptive.ContactEmailType} type    Type of the email
             @param {boolean} primary Is email primary
             @param {string} email   Email of the contact
             @since v2.0
          */
          constructor(type: ContactEmailType, primary: boolean, email: string) {
               super();
               this.type = type;
               this.primary = primary;
               this.email = email;
          }
          /**
             @method
             Returns the type of the email

             @return {Adaptive.ContactEmailType} EmailType
             @since v2.0
          */
          getType() : ContactEmailType {
               return this.type;
          }

          /**
             @method
             Set the type of the email

             @param {Adaptive.ContactEmailType} type Type of the email
             @since v2.0
          */
          setType(type: ContactEmailType) {
               this.type = type;
          }

          /**
             @method
             Returns the email of the Contact

             @return {string} email
             @since v2.0
          */
          getEmail() : string {
               return this.email;
          }

          /**
             @method
             Set the email of the Contact

             @param {string} email Email of the contact
             @since v2.0
          */
          setEmail(email: string) {
               this.email = email;
          }

          /**
             @method
             Returns if the email is primary

             @return {boolean} true if the email is primary; false otherwise
             @since v2.0
          */
          getPrimary() : boolean {
               return this.primary;
          }

          /**
             @method
             Set if the email

             @param {boolean} primary true if the email is primary; false otherwise
             @since v2.0
          */
          setPrimary(primary: boolean) {
               this.primary = primary;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ContactEmail.
             @return {Adaptive.ContactEmail} Wrapped object instance.
          */
          static toObject(object : any) : ContactEmail {
               var result : ContactEmail = new ContactEmail(null, null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.type = ContactEmailType.toObject(object.type);
                    result.primary = object.primary;
                    result.email = object.email;

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ContactEmail[].
             @return {Adaptive.ContactEmail[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : ContactEmail[] {
               var resultArray : Array<ContactEmail> = new Array<ContactEmail>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(ContactEmail.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.ContactPersonalInfo
        @extends Adaptive.APIBean
        Structure representing the personal info data elements of a contact.

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     export class ContactPersonalInfo extends APIBean {
          /**
             @property {Adaptive.ContactPersonalInfoTitle} title
             The title of the Contact
          */
          title : ContactPersonalInfoTitle;

          /**
             @property {Adaptive.ContactPersonalInfoTitle} title
             The title of the Contact The 'titleProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'title'.
          */
          get titleProperty() : ContactPersonalInfoTitle {
               return this.title;
          }

          set titleProperty(title:ContactPersonalInfoTitle) {
               this.title = title;
          }

          /**
             @property {string} lastName
             The last name of the Contact
          */
          lastName : string;

          /**
             @property {string} lastName
             The last name of the Contact The 'lastNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'lastName'.
          */
          get lastNameProperty() : string {
               return this.lastName;
          }

          set lastNameProperty(lastName:string) {
               this.lastName = lastName;
          }

          /**
             @property {string} middleName
             The middle name of the Contact if it proceeds
          */
          middleName : string;

          /**
             @property {string} middleName
             The middle name of the Contact if it proceeds The 'middleNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'middleName'.
          */
          get middleNameProperty() : string {
               return this.middleName;
          }

          set middleNameProperty(middleName:string) {
               this.middleName = middleName;
          }

          /**
             @property {string} name
             The name of the Contact
          */
          name : string;

          /**
             @property {string} name
             The name of the Contact The 'nameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'name'.
          */
          get nameProperty() : string {
               return this.name;
          }

          set nameProperty(name:string) {
               this.name = name;
          }

          /**
             @method constructor
             The Constructor used by the implementation

             @param {string} name       of the Contact
             @param {string} middleName of the Contact
             @param {string} lastName   of the Contact
             @param {Adaptive.ContactPersonalInfoTitle} title      of the Contact
             @since v2.0
          */
          constructor(name: string, middleName: string, lastName: string, title: ContactPersonalInfoTitle) {
               super();
               this.name = name;
               this.middleName = middleName;
               this.lastName = lastName;
               this.title = title;
          }
          /**
             @method
             Returns the title of the Contact

             @return {Adaptive.ContactPersonalInfoTitle} Title
             @since v2.0
          */
          getTitle() : ContactPersonalInfoTitle {
               return this.title;
          }

          /**
             @method
             Set the Title of the Contact

             @param {Adaptive.ContactPersonalInfoTitle} title of the Contact
             @since v2.0
          */
          setTitle(title: ContactPersonalInfoTitle) {
               this.title = title;
          }

          /**
             @method
             Returns the last name of the Contact

             @return {string} lastName
             @since v2.0
          */
          getLastName() : string {
               return this.lastName;
          }

          /**
             @method
             Set the last name of the Contact

             @param {string} lastName of the Contact
             @since v2.0
          */
          setLastName(lastName: string) {
               this.lastName = lastName;
          }

          /**
             @method
             Returns the middle name of the Contact

             @return {string} middelName
             @since v2.0
          */
          getMiddleName() : string {
               return this.middleName;
          }

          /**
             @method
             Set the middle name of the Contact

             @param {string} middleName of the Contact
             @since v2.0
          */
          setMiddleName(middleName: string) {
               this.middleName = middleName;
          }

          /**
             @method
             Returns the name of the Contact

             @return {string} name
             @since v2.0
          */
          getName() : string {
               return this.name;
          }

          /**
             @method
             Set the name of the Contact

             @param {string} name of the Contact
             @since v2.0
          */
          setName(name: string) {
               this.name = name;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ContactPersonalInfo.
             @return {Adaptive.ContactPersonalInfo} Wrapped object instance.
          */
          static toObject(object : any) : ContactPersonalInfo {
               var result : ContactPersonalInfo = new ContactPersonalInfo(null, null, null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.name = object.name;
                    result.middleName = object.middleName;
                    result.lastName = object.lastName;
                    result.title = ContactPersonalInfoTitle.toObject(object.title);

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ContactPersonalInfo[].
             @return {Adaptive.ContactPersonalInfo[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : ContactPersonalInfo[] {
               var resultArray : Array<ContactPersonalInfo> = new Array<ContactPersonalInfo>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(ContactPersonalInfo.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.ContactPhone
        @extends Adaptive.APIBean
        Structure representing the phone data elements of a contact.

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     export class ContactPhone extends APIBean {
          /**
             @property {Adaptive.ContactPhoneType} phoneType
             The phone number phoneType
          */
          phoneType : ContactPhoneType;

          /**
             @property {Adaptive.ContactPhoneType} phoneType
             The phone number phoneType The 'phoneTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'phoneType'.
          */
          get phoneTypeProperty() : ContactPhoneType {
               return this.phoneType;
          }

          set phoneTypeProperty(phoneType:ContactPhoneType) {
               this.phoneType = phoneType;
          }

          /**
             @property {string} phone
             The phone number
          */
          phone : string;

          /**
             @property {string} phone
             The phone number The 'phoneProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'phone'.
          */
          get phoneProperty() : string {
               return this.phone;
          }

          set phoneProperty(phone:string) {
               this.phone = phone;
          }

          /**
             @method constructor
             Constructor used by implementation to set the contact Phone

             @param {string} phone     Phone number
             @param {Adaptive.ContactPhoneType} phoneType Type of Phone number
             @since v2.0
          */
          constructor(phone: string, phoneType: ContactPhoneType) {
               super();
               this.phone = phone;
               this.phoneType = phoneType;
          }
          /**
             @method
             Returns the phone phoneType

             @return {Adaptive.ContactPhoneType} phoneType
             @since v2.0
          */
          getPhoneType() : ContactPhoneType {
               return this.phoneType;
          }

          /**
             @method
             Set the phoneType of the phone number

             @param {Adaptive.ContactPhoneType} phoneType Type of Phone number
             @since v2.0
          */
          setPhoneType(phoneType: ContactPhoneType) {
               this.phoneType = phoneType;
          }

          /**
             @method
             Returns the phone number

             @return {string} phone number
             @since v2.0
          */
          getPhone() : string {
               return this.phone;
          }

          /**
             @method
             Set the phone number

             @param {string} phone number
             @since v2.0
          */
          setPhone(phone: string) {
               this.phone = phone;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ContactPhone.
             @return {Adaptive.ContactPhone} Wrapped object instance.
          */
          static toObject(object : any) : ContactPhone {
               var result : ContactPhone = new ContactPhone(null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.phone = object.phone;
                    result.phoneType = ContactPhoneType.toObject(object.phoneType);

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ContactPhone[].
             @return {Adaptive.ContactPhone[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : ContactPhone[] {
               var resultArray : Array<ContactPhone> = new Array<ContactPhone>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(ContactPhone.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.ContactProfessionalInfo
        @extends Adaptive.APIBean
        Structure representing the professional info data elements of a contact.

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     export class ContactProfessionalInfo extends APIBean {
          /**
             @property {string} company
             The company of the job
          */
          company : string;

          /**
             @property {string} company
             The company of the job The 'companyProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'company'.
          */
          get companyProperty() : string {
               return this.company;
          }

          set companyProperty(company:string) {
               this.company = company;
          }

          /**
             @property {string} jobDescription
             The job description
          */
          jobDescription : string;

          /**
             @property {string} jobDescription
             The job description The 'jobDescriptionProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'jobDescription'.
          */
          get jobDescriptionProperty() : string {
               return this.jobDescription;
          }

          set jobDescriptionProperty(jobDescription:string) {
               this.jobDescription = jobDescription;
          }

          /**
             @property {string} jobTitle
             The job title
          */
          jobTitle : string;

          /**
             @property {string} jobTitle
             The job title The 'jobTitleProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'jobTitle'.
          */
          get jobTitleProperty() : string {
               return this.jobTitle;
          }

          set jobTitleProperty(jobTitle:string) {
               this.jobTitle = jobTitle;
          }

          /**
             @method constructor
             Constructor used by implementation to set the ContactProfessionalInfo.

             @param {string} jobTitle       The job title
             @param {string} jobDescription The job description
             @param {string} company        The company of the job
             @since v2.0
          */
          constructor(jobTitle: string, jobDescription: string, company: string) {
               super();
               this.jobTitle = jobTitle;
               this.jobDescription = jobDescription;
               this.company = company;
          }
          /**
             @method
             Returns the company of the job

             @return {string} company
             @since v2.0
          */
          getCompany() : string {
               return this.company;
          }

          /**
             @method
             Set the company of the job

             @param {string} company The company of the job
             @since v2.0
          */
          setCompany(company: string) {
               this.company = company;
          }

          /**
             @method
             Returns the description of the job

             @return {string} description
             @since v2.0
          */
          getJobDescription() : string {
               return this.jobDescription;
          }

          /**
             @method
             Set the description of the job

             @param {string} jobDescription The job description
             @since v2.0
          */
          setJobDescription(jobDescription: string) {
               this.jobDescription = jobDescription;
          }

          /**
             @method
             Returns the title of the job

             @return {string} title
             @since v2.0
          */
          getJobTitle() : string {
               return this.jobTitle;
          }

          /**
             @method
             Set the title of the job

             @param {string} jobTitle The job title
             @since v2.0
          */
          setJobTitle(jobTitle: string) {
               this.jobTitle = jobTitle;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ContactProfessionalInfo.
             @return {Adaptive.ContactProfessionalInfo} Wrapped object instance.
          */
          static toObject(object : any) : ContactProfessionalInfo {
               var result : ContactProfessionalInfo = new ContactProfessionalInfo(null, null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.company = object.company;
                    result.jobTitle = object.jobTitle;
                    result.jobDescription = object.jobDescription;

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ContactProfessionalInfo[].
             @return {Adaptive.ContactProfessionalInfo[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : ContactProfessionalInfo[] {
               var resultArray : Array<ContactProfessionalInfo> = new Array<ContactProfessionalInfo>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(ContactProfessionalInfo.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.ContactSocial
        @extends Adaptive.APIBean
        Structure representing the social data elements of a contact.

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     export class ContactSocial extends APIBean {
          /**
             @property {Adaptive.ContactSocialNetwork} socialNetwork
             The social network
          */
          socialNetwork : ContactSocialNetwork;

          /**
             @property {Adaptive.ContactSocialNetwork} socialNetwork
             The social network The 'socialNetworkProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'socialNetwork'.
          */
          get socialNetworkProperty() : ContactSocialNetwork {
               return this.socialNetwork;
          }

          set socialNetworkProperty(socialNetwork:ContactSocialNetwork) {
               this.socialNetwork = socialNetwork;
          }

          /**
             @property {string} profileUrl
             The profileUrl
          */
          profileUrl : string;

          /**
             @property {string} profileUrl
             The profileUrl The 'profileUrlProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'profileUrl'.
          */
          get profileUrlProperty() : string {
               return this.profileUrl;
          }

          set profileUrlProperty(profileUrl:string) {
               this.profileUrl = profileUrl;
          }

          /**
             @method constructor
             Constructor used by the implementation

             @param {Adaptive.ContactSocialNetwork} socialNetwork of the profile
             @param {string} profileUrl    of the user
             @since v2.0
          */
          constructor(socialNetwork: ContactSocialNetwork, profileUrl: string) {
               super();
               this.socialNetwork = socialNetwork;
               this.profileUrl = profileUrl;
          }
          /**
             @method
             Returns the social network

             @return {Adaptive.ContactSocialNetwork} socialNetwork
             @since v2.0
          */
          getSocialNetwork() : ContactSocialNetwork {
               return this.socialNetwork;
          }

          /**
             @method
             Set the social network

             @param {Adaptive.ContactSocialNetwork} socialNetwork of the profile
             @since v2.0
          */
          setSocialNetwork(socialNetwork: ContactSocialNetwork) {
               this.socialNetwork = socialNetwork;
          }

          /**
             @method
             Returns the profile url of the user

             @return {string} profileUrl
             @since v2.0
          */
          getProfileUrl() : string {
               return this.profileUrl;
          }

          /**
             @method
             Set the profile url of the iser

             @param {string} profileUrl of the user
             @since v2.0
          */
          setProfileUrl(profileUrl: string) {
               this.profileUrl = profileUrl;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ContactSocial.
             @return {Adaptive.ContactSocial} Wrapped object instance.
          */
          static toObject(object : any) : ContactSocial {
               var result : ContactSocial = new ContactSocial(null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.socialNetwork = ContactSocialNetwork.toObject(object.socialNetwork);
                    result.profileUrl = object.profileUrl;

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ContactSocial[].
             @return {Adaptive.ContactSocial[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : ContactSocial[] {
               var resultArray : Array<ContactSocial> = new Array<ContactSocial>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(ContactSocial.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.ContactTag
        @extends Adaptive.APIBean
        Structure representing the assigned tags data elements of a contact.

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     export class ContactTag extends APIBean {
          /**
             @property {string} tagName
             The tagName of the Tag
          */
          tagName : string;

          /**
             @property {string} tagName
             The tagName of the Tag The 'tagNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'tagName'.
          */
          get tagNameProperty() : string {
               return this.tagName;
          }

          set tagNameProperty(tagName:string) {
               this.tagName = tagName;
          }

          /**
             @property {string} tagValue
             The tagValue of the Tag
          */
          tagValue : string;

          /**
             @property {string} tagValue
             The tagValue of the Tag The 'tagValueProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'tagValue'.
          */
          get tagValueProperty() : string {
               return this.tagValue;
          }

          set tagValueProperty(tagValue:string) {
               this.tagValue = tagValue;
          }

          /**
             @method constructor
             Constructor used by the implementation

             @param {string} tagValue Value of the tag
             @param {string} tagName  Name of the tag
             @since v2.0
          */
          constructor(tagName: string, tagValue: string) {
               super();
               this.tagName = tagName;
               this.tagValue = tagValue;
          }
          /**
             @method
             Returns the tagName of the Tag

             @return {string} tagName
             @since v2.0
          */
          getTagName() : string {
               return this.tagName;
          }

          /**
             @method
             Set the tagName of the Tag

             @param {string} tagName Name of the tag
             @since v2.0
          */
          setTagName(tagName: string) {
               this.tagName = tagName;
          }

          /**
             @method
             Returns the tagValue of the Tag

             @return {string} tagValue
             @since v2.0
          */
          getTagValue() : string {
               return this.tagValue;
          }

          /**
             @method
             Set the tagValue of the Tag

             @param {string} tagValue Value of the tag
             @since v2.0
          */
          setTagValue(tagValue: string) {
               this.tagValue = tagValue;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ContactTag.
             @return {Adaptive.ContactTag} Wrapped object instance.
          */
          static toObject(object : any) : ContactTag {
               var result : ContactTag = new ContactTag(null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.tagName = object.tagName;
                    result.tagValue = object.tagValue;

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ContactTag[].
             @return {Adaptive.ContactTag[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : ContactTag[] {
               var resultArray : Array<ContactTag> = new Array<ContactTag>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(ContactTag.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.ContactUid
        @extends Adaptive.APIBean
        Structure representing the internal unique identifier data elements of a contact.

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     export class ContactUid extends APIBean {
          /**
             @property {string} contactId
             The id of the Contact
          */
          contactId : string;

          /**
             @property {string} contactId
             The id of the Contact The 'contactIdProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactId'.
          */
          get contactIdProperty() : string {
               return this.contactId;
          }

          set contactIdProperty(contactId:string) {
               this.contactId = contactId;
          }

          /**
             @method constructor
             Constructor used by implementation to set the Contact id.

             @param {string} contactId Internal unique contact id.
             @since v2.0
          */
          constructor(contactId: string) {
               super();
               this.contactId = contactId;
          }
          /**
             @method
             Returns the contact id

             @return {string} Contactid Internal unique contact id.
             @since v2.0
          */
          getContactId() : string {
               return this.contactId;
          }

          /**
             @method
             Set the id of the Contact

             @param {string} contactId Internal unique contact id.
             @since v2.0
          */
          setContactId(contactId: string) {
               this.contactId = contactId;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ContactUid.
             @return {Adaptive.ContactUid} Wrapped object instance.
          */
          static toObject(object : any) : ContactUid {
               var result : ContactUid = new ContactUid(null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.contactId = object.contactId;

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ContactUid[].
             @return {Adaptive.ContactUid[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : ContactUid[] {
               var resultArray : Array<ContactUid> = new Array<ContactUid>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(ContactUid.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.ContactWebsite
        @extends Adaptive.APIBean
        Structure representing the website data elements of a contact.

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     export class ContactWebsite extends APIBean {
          /**
             @property {string} url
             The url of the website
          */
          url : string;

          /**
             @property {string} url
             The url of the website The 'urlProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'url'.
          */
          get urlProperty() : string {
               return this.url;
          }

          set urlProperty(url:string) {
               this.url = url;
          }

          /**
             @method constructor
             Constructor used by the implementation

             @param {string} url Url of the website
             @since v2.0
          */
          constructor(url: string) {
               super();
               this.url = url;
          }
          /**
             @method
             Returns the url of the website

             @return {string} website url
             @since v2.0
          */
          getUrl() : string {
               return this.url;
          }

          /**
             @method
             Set the url of the website

             @param {string} url Url of the website
             @since v2.0
          */
          setUrl(url: string) {
               this.url = url;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ContactWebsite.
             @return {Adaptive.ContactWebsite} Wrapped object instance.
          */
          static toObject(object : any) : ContactWebsite {
               var result : ContactWebsite = new ContactWebsite(null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.url = object.url;

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ContactWebsite[].
             @return {Adaptive.ContactWebsite[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : ContactWebsite[] {
               var resultArray : Array<ContactWebsite> = new Array<ContactWebsite>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(ContactWebsite.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.Database
        @extends Adaptive.APIBean
        Structure representing a database reference.

        @author Ferran Vila Conesa
        @since v2.0
        @version 1.0
     */
     export class Database extends APIBean {
          /**
             @property {boolean} compress
             Indicates if database was created or needs to be created as Compressed.
          */
          compress : boolean;

          /**
             @property {boolean} compress
             Indicates if database was created or needs to be created as Compressed. The 'compressProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'compress'.
          */
          get compressProperty() : boolean {
               return this.compress;
          }

          set compressProperty(compress:boolean) {
               this.compress = compress;
          }

          /**
             @property {string} name
             Database Name (name of the .db local file).
          */
          name : string;

          /**
             @property {string} name
             Database Name (name of the .db local file). The 'nameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'name'.
          */
          get nameProperty() : string {
               return this.name;
          }

          set nameProperty(name:string) {
               this.name = name;
          }

          /**
             @method constructor
             Constructor using fields.

             @param {string} name     Name of the DatabaseTable.
             @param {boolean} compress Compression enabled.
             @since v2.0
          */
          constructor(name: string, compress: boolean) {
               super();
               this.name = name;
               this.compress = compress;
          }
          /**
             @method
             Returns if the table is compressed

             @return {boolean} Compression enabled
             @since v2.0
          */
          getCompress() : boolean {
               return this.compress;
          }

          /**
             @method
             Sets if the table is compressed or not.

             @param {boolean} compress Compression enabled
             @since v2.0
          */
          setCompress(compress: boolean) {
               this.compress = compress;
          }

          /**
             @method
             Returns the name.

             @return {string} The name of the table.
             @since v2.0
          */
          getName() : string {
               return this.name;
          }

          /**
             @method
             Sets the name of the table.

             @param {string} name The name of the table.
             @since v2.0
          */
          setName(name: string) {
               this.name = name;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.Database.
             @return {Adaptive.Database} Wrapped object instance.
          */
          static toObject(object : any) : Database {
               var result : Database = new Database(null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.name = object.name;
                    result.compress = object.compress;

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.Database[].
             @return {Adaptive.Database[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : Database[] {
               var resultArray : Array<Database> = new Array<Database>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(Database.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.DatabaseColumn
        @extends Adaptive.APIBean
        Structure representing the column specification of a data column.

        @author Ferran Vila Conesa
        @since v2.0
        @version 1.0
     */
     export class DatabaseColumn extends APIBean {
          /**
             @property {string} name
             Name of the column
          */
          name : string;

          /**
             @property {string} name
             Name of the column The 'nameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'name'.
          */
          get nameProperty() : string {
               return this.name;
          }

          set nameProperty(name:string) {
               this.name = name;
          }

          /**
             @method constructor
             Constructor with fields

             @param {string} name Name of the column
             @since v2.0
          */
          constructor(name: string) {
               super();
               this.name = name;
          }
          /**
             @method
             Returns the name of the column.

             @return {string} The name of the column.
             @since v2.0
          */
          getName() : string {
               return this.name;
          }

          /**
             @method
             Sets the name of the column.

             @param {string} name The name of the column.
             @since v2.0
          */
          setName(name: string) {
               this.name = name;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.DatabaseColumn.
             @return {Adaptive.DatabaseColumn} Wrapped object instance.
          */
          static toObject(object : any) : DatabaseColumn {
               var result : DatabaseColumn = new DatabaseColumn(null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.name = object.name;

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.DatabaseColumn[].
             @return {Adaptive.DatabaseColumn[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : DatabaseColumn[] {
               var resultArray : Array<DatabaseColumn> = new Array<DatabaseColumn>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(DatabaseColumn.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
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
     /**
        @class Adaptive.DatabaseTable
        @extends Adaptive.APIBean
        Represents a data table composed of databaseColumns and databaseRows.

        @author Ferran Vila Conesa
        @since v2.0
        @version 1.0
     */
     export class DatabaseTable extends APIBean {
          /**
             @property {number} columnCount
             Number of databaseColumns.
          */
          columnCount : number;

          /**
             @property {number} columnCount
             Number of databaseColumns. The 'columnCountProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'columnCount'.
          */
          get columnCountProperty() : number {
               return this.columnCount;
          }

          set columnCountProperty(columnCount:number) {
               this.columnCount = columnCount;
          }

          /**
             @property {Adaptive.DatabaseColumn[]} databaseColumns
             Definition of databaseColumns.
          */
          databaseColumns : Array<DatabaseColumn>;

          /**
             @property {Adaptive.DatabaseColumn[]} databaseColumns
             Definition of databaseColumns. The 'databaseColumnsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'databaseColumns'.
          */
          get databaseColumnsProperty() : Array<DatabaseColumn> {
               return this.databaseColumns;
          }

          set databaseColumnsProperty(databaseColumns:Array<DatabaseColumn>) {
               this.databaseColumns = databaseColumns;
          }

          /**
             @property {Adaptive.DatabaseRow[]} databaseRows
             Rows of the table containing the data.
          */
          databaseRows : Array<DatabaseRow>;

          /**
             @property {Adaptive.DatabaseRow[]} databaseRows
             Rows of the table containing the data. The 'databaseRowsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'databaseRows'.
          */
          get databaseRowsProperty() : Array<DatabaseRow> {
               return this.databaseRows;
          }

          set databaseRowsProperty(databaseRows:Array<DatabaseRow>) {
               this.databaseRows = databaseRows;
          }

          /**
             @property {string} name
             Name of the table.
          */
          name : string;

          /**
             @property {string} name
             Name of the table. The 'nameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'name'.
          */
          get nameProperty() : string {
               return this.name;
          }

          set nameProperty(name:string) {
               this.name = name;
          }

          /**
             @property {number} rowCount
             Number of databaseRows.
          */
          rowCount : number;

          /**
             @property {number} rowCount
             Number of databaseRows. The 'rowCountProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'rowCount'.
          */
          get rowCountProperty() : number {
               return this.rowCount;
          }

          set rowCountProperty(rowCount:number) {
               this.rowCount = rowCount;
          }

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
          constructor(name: string, columnCount: number, rowCount: number, databaseColumns: Array<DatabaseColumn>, databaseRows: Array<DatabaseRow>) {
               super();
               this.name = name;
               this.columnCount = columnCount;
               this.rowCount = rowCount;
               this.databaseColumns = databaseColumns;
               this.databaseRows = databaseRows;
          }
          /**
             @method
             Get the number of databaseColumns

             @return {number} The number of databaseColumns
             @since v2.0
          */
          getColumnCount() : number {
               return this.columnCount;
          }

          /**
             @method
             Sets the number of databaseColumns

             @param {number} columnCount The number of databaseColumns
             @since v2.0
          */
          setColumnCount(columnCount: number) {
               this.columnCount = columnCount;
          }

          /**
             @method
             Get the databaseColumns

             @return {Adaptive.DatabaseColumn[]} The databaseColumns
             @since v2.0
          */
          getDatabaseColumns() : Array<DatabaseColumn> {
               return this.databaseColumns;
          }

          /**
             @method
             Sets the databaseColumns of the table

             @param {Adaptive.DatabaseColumn[]} databaseColumns The databaseColumns of the table
             @since v2.0
          */
          setDatabaseColumns(databaseColumns: Array<DatabaseColumn>) {
               this.databaseColumns = databaseColumns;
          }

          /**
             @method
             Get the databaseRows of the table

             @return {Adaptive.DatabaseRow[]} The databaseRows of the table
             @since v2.0
          */
          getDatabaseRows() : Array<DatabaseRow> {
               return this.databaseRows;
          }

          /**
             @method
             Sets the databaseRows of the table

             @param {Adaptive.DatabaseRow[]} databaseRows The databaseRows of the table
             @since v2.0
          */
          setDatabaseRows(databaseRows: Array<DatabaseRow>) {
               this.databaseRows = databaseRows;
          }

          /**
             @method
             Returns the name of the table

             @return {string} The name of the table
             @since v2.0
          */
          getName() : string {
               return this.name;
          }

          /**
             @method
             Sets the name of the table

             @param {string} name The name of the table
             @since v2.0
          */
          setName(name: string) {
               this.name = name;
          }

          /**
             @method
             Get the number of databaseRows

             @return {number} The number of databaseRows
             @since v2.0
          */
          getRowCount() : number {
               return this.rowCount;
          }

          /**
             @method
             Sets the number of databaseRows

             @param {number} rowCount The number of databaseRows
             @since v2.0
          */
          setRowCount(rowCount: number) {
               this.rowCount = rowCount;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.DatabaseTable.
             @return {Adaptive.DatabaseTable} Wrapped object instance.
          */
          static toObject(object : any) : DatabaseTable {
               var result : DatabaseTable = new DatabaseTable(null, null, null, null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.name = object.name;
                    result.columnCount = object.columnCount;
                    result.rowCount = object.rowCount;
                    result.databaseColumns = DatabaseColumn.toObjectArray(object.databaseColumns);
                    result.databaseRows = DatabaseRow.toObjectArray(object.databaseRows);

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.DatabaseTable[].
             @return {Adaptive.DatabaseTable[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : DatabaseTable[] {
               var resultArray : Array<DatabaseTable> = new Array<DatabaseTable>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(DatabaseTable.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.DeviceInfo
        @extends Adaptive.APIBean
        Structure representing the basic device information.

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     export class DeviceInfo extends APIBean {
          /**
             @property {string} model
             Model of device - equivalent to device release or version.
          */
          model : string;

          /**
             @property {string} model
             Model of device - equivalent to device release or version. The 'modelProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'model'.
          */
          get modelProperty() : string {
               return this.model;
          }

          set modelProperty(model:string) {
               this.model = model;
          }

          /**
             @property {string} name
             Name of device - equivalent to brand.
          */
          name : string;

          /**
             @property {string} name
             Name of device - equivalent to brand. The 'nameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'name'.
          */
          get nameProperty() : string {
               return this.name;
          }

          set nameProperty(name:string) {
               this.name = name;
          }

          /**
             @property {string} uuid
             Device identifier - this may not be unique for a device. It may depend on the platform implementation and may
be unique for a specific instance of an application on a specific device.
          */
          uuid : string;

          /**
             @property {string} uuid
             Device identifier - this may not be unique for a device. It may depend on the platform implementation and may
be unique for a specific instance of an application on a specific device. The 'uuidProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'uuid'.
          */
          get uuidProperty() : string {
               return this.uuid;
          }

          set uuidProperty(uuid:string) {
               this.uuid = uuid;
          }

          /**
             @property {string} vendor
             Vendor of the device hardware.
          */
          vendor : string;

          /**
             @property {string} vendor
             Vendor of the device hardware. The 'vendorProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'vendor'.
          */
          get vendorProperty() : string {
               return this.vendor;
          }

          set vendorProperty(vendor:string) {
               this.vendor = vendor;
          }

          /**
             @method constructor
             Constructor for the implementation of the platform.

             @param {string} name   or brand of the device.
             @param {string} model  of the device.
             @param {string} vendor of the device.
             @param {string} uuid   unique* identifier (* platform dependent).
             @since v2.0
          */
          constructor(name: string, model: string, vendor: string, uuid: string) {
               super();
               this.name = name;
               this.model = model;
               this.vendor = vendor;
               this.uuid = uuid;
          }
          /**
             @method
             Returns the model of the device.

             @return {string} String with the model of the device.
             @since v2.0
          */
          getModel() : string {
               return this.model;
          }

          /**
             @method
             Sets Model of device - equivalent to device release or version.

             @param {string} model Model of device - equivalent to device release or version.
          */
          setModel(model: string) {
               this.model = model;
          }

          /**
             @method
             Returns the name of the device.

             @return {string} String with device name.
             @since v2.0
          */
          getName() : string {
               return this.name;
          }

          /**
             @method
             Sets Name of device - equivalent to brand.

             @param {string} name Name of device - equivalent to brand.
          */
          setName(name: string) {
               this.name = name;
          }

          /**
             @method
             Returns the platform dependent UUID of the device.

             @return {string} String with the 128-bit device identifier.
             @since v2.0
          */
          getUuid() : string {
               return this.uuid;
          }

          /**
             @method
             Sets Device identifier - this may not be unique for a device. It may depend on the platform implementation and may
be unique for a specific instance of an application on a specific device.

             @param {string} uuid Device identifier - this may not be unique for a device. It may depend on the platform implementation and may
be unique for a specific instance of an application on a specific device.
          */
          setUuid(uuid: string) {
               this.uuid = uuid;
          }

          /**
             @method
             Returns the vendor of the device.

             @return {string} String with the vendor name.
             @since v2.0
          */
          getVendor() : string {
               return this.vendor;
          }

          /**
             @method
             Sets Vendor of the device hardware.

             @param {string} vendor Vendor of the device hardware.
          */
          setVendor(vendor: string) {
               this.vendor = vendor;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.DeviceInfo.
             @return {Adaptive.DeviceInfo} Wrapped object instance.
          */
          static toObject(object : any) : DeviceInfo {
               var result : DeviceInfo = new DeviceInfo(null, null, null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.name = object.name;
                    result.model = object.model;
                    result.vendor = object.vendor;
                    result.uuid = object.uuid;

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.DeviceInfo[].
             @return {Adaptive.DeviceInfo[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : DeviceInfo[] {
               var resultArray : Array<DeviceInfo> = new Array<DeviceInfo>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(DeviceInfo.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.Email
        @extends Adaptive.APIBean
        Structure representing the data elements of an email.

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     export class Email extends APIBean {
          /**
             @property {Adaptive.EmailAddress[]} bccRecipients
             Array of Email Blind Carbon Copy recipients
          */
          bccRecipients : Array<EmailAddress>;

          /**
             @property {Adaptive.EmailAddress[]} bccRecipients
             Array of Email Blind Carbon Copy recipients The 'bccRecipientsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'bccRecipients'.
          */
          get bccRecipientsProperty() : Array<EmailAddress> {
               return this.bccRecipients;
          }

          set bccRecipientsProperty(bccRecipients:Array<EmailAddress>) {
               this.bccRecipients = bccRecipients;
          }

          /**
             @property {Adaptive.EmailAddress[]} ccRecipients
             Array of Email Carbon Copy recipients
          */
          ccRecipients : Array<EmailAddress>;

          /**
             @property {Adaptive.EmailAddress[]} ccRecipients
             Array of Email Carbon Copy recipients The 'ccRecipientsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'ccRecipients'.
          */
          get ccRecipientsProperty() : Array<EmailAddress> {
               return this.ccRecipients;
          }

          set ccRecipientsProperty(ccRecipients:Array<EmailAddress>) {
               this.ccRecipients = ccRecipients;
          }

          /**
             @property {Adaptive.EmailAttachmentData[]} emailAttachmentData
             Array of attatchments
          */
          emailAttachmentData : Array<EmailAttachmentData>;

          /**
             @property {Adaptive.EmailAttachmentData[]} emailAttachmentData
             Array of attatchments The 'emailAttachmentDataProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'emailAttachmentData'.
          */
          get emailAttachmentDataProperty() : Array<EmailAttachmentData> {
               return this.emailAttachmentData;
          }

          set emailAttachmentDataProperty(emailAttachmentData:Array<EmailAttachmentData>) {
               this.emailAttachmentData = emailAttachmentData;
          }

          /**
             @property {string} messageBody
             Message body
          */
          messageBody : string;

          /**
             @property {string} messageBody
             Message body The 'messageBodyProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'messageBody'.
          */
          get messageBodyProperty() : string {
               return this.messageBody;
          }

          set messageBodyProperty(messageBody:string) {
               this.messageBody = messageBody;
          }

          /**
             @property {string} messageBodyMimeType
             Message body mime type
          */
          messageBodyMimeType : string;

          /**
             @property {string} messageBodyMimeType
             Message body mime type The 'messageBodyMimeTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'messageBodyMimeType'.
          */
          get messageBodyMimeTypeProperty() : string {
               return this.messageBodyMimeType;
          }

          set messageBodyMimeTypeProperty(messageBodyMimeType:string) {
               this.messageBodyMimeType = messageBodyMimeType;
          }

          /**
             @property {string} subject
             Subject of the email
          */
          subject : string;

          /**
             @property {string} subject
             Subject of the email The 'subjectProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'subject'.
          */
          get subjectProperty() : string {
               return this.subject;
          }

          set subjectProperty(subject:string) {
               this.subject = subject;
          }

          /**
             @property {Adaptive.EmailAddress[]} toRecipients
             Array of Email recipients
          */
          toRecipients : Array<EmailAddress>;

          /**
             @property {Adaptive.EmailAddress[]} toRecipients
             Array of Email recipients The 'toRecipientsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'toRecipients'.
          */
          get toRecipientsProperty() : Array<EmailAddress> {
               return this.toRecipients;
          }

          set toRecipientsProperty(toRecipients:Array<EmailAddress>) {
               this.toRecipients = toRecipients;
          }

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
          constructor(toRecipients: Array<EmailAddress>, ccRecipients: Array<EmailAddress>, bccRecipients: Array<EmailAddress>, emailAttachmentData: Array<EmailAttachmentData>, messageBody: string, messageBodyMimeType: string, subject: string) {
               super();
               this.toRecipients = toRecipients;
               this.ccRecipients = ccRecipients;
               this.bccRecipients = bccRecipients;
               this.emailAttachmentData = emailAttachmentData;
               this.messageBody = messageBody;
               this.messageBodyMimeType = messageBodyMimeType;
               this.subject = subject;
          }
          /**
             @method
             Returns the array of recipients

             @return {Adaptive.EmailAddress[]} bccRecipients array of bcc recipients
             @since v2.0
          */
          getBccRecipients() : Array<EmailAddress> {
               return this.bccRecipients;
          }

          /**
             @method
             Set the array of recipients

             @param {Adaptive.EmailAddress[]} bccRecipients array of bcc recipients
             @since v2.0
          */
          setBccRecipients(bccRecipients: Array<EmailAddress>) {
               this.bccRecipients = bccRecipients;
          }

          /**
             @method
             Returns the array of recipients

             @return {Adaptive.EmailAddress[]} ccRecipients array of cc recipients
             @since v2.0
          */
          getCcRecipients() : Array<EmailAddress> {
               return this.ccRecipients;
          }

          /**
             @method
             Set the array of recipients

             @param {Adaptive.EmailAddress[]} ccRecipients array of cc recipients
             @since v2.0
          */
          setCcRecipients(ccRecipients: Array<EmailAddress>) {
               this.ccRecipients = ccRecipients;
          }

          /**
             @method
             Returns an array of attachments

             @return {Adaptive.EmailAttachmentData[]} emailAttachmentData array with the email attachments
             @since v2.0
          */
          getEmailAttachmentData() : Array<EmailAttachmentData> {
               return this.emailAttachmentData;
          }

          /**
             @method
             Set the email attachment data array

             @param {Adaptive.EmailAttachmentData[]} emailAttachmentData array of email attatchments
             @since v2.0
          */
          setEmailAttachmentData(emailAttachmentData: Array<EmailAttachmentData>) {
               this.emailAttachmentData = emailAttachmentData;
          }

          /**
             @method
             Returns the message body of the email

             @return {string} message Body string of the email
             @since v2.0
          */
          getMessageBody() : string {
               return this.messageBody;
          }

          /**
             @method
             Set the message body of the email

             @param {string} messageBody message body of the email
             @since v2.0
          */
          setMessageBody(messageBody: string) {
               this.messageBody = messageBody;
          }

          /**
             @method
             Returns the myme type of the message body

             @return {string} mime type string of the message boddy
             @since v2.0
          */
          getMessageBodyMimeType() : string {
               return this.messageBodyMimeType;
          }

          /**
             @method
             Set the mime type for the message body

             @param {string} messageBodyMimeType type of the body message
             @since v2.0
          */
          setMessageBodyMimeType(messageBodyMimeType: string) {
               this.messageBodyMimeType = messageBodyMimeType;
          }

          /**
             @method
             Returns the subject of the email

             @return {string} subject string of the email
             @since v2.0
          */
          getSubject() : string {
               return this.subject;
          }

          /**
             @method
             Set the subject of the email

             @param {string} subject of the email
             @since v2.0
          */
          setSubject(subject: string) {
               this.subject = subject;
          }

          /**
             @method
             Returns the array of recipients

             @return {Adaptive.EmailAddress[]} toRecipients array of recipients
             @since v2.0
          */
          getToRecipients() : Array<EmailAddress> {
               return this.toRecipients;
          }

          /**
             @method
             Set the array of recipients

             @param {Adaptive.EmailAddress[]} toRecipients array of recipients
             @since v2.0
          */
          setToRecipients(toRecipients: Array<EmailAddress>) {
               this.toRecipients = toRecipients;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.Email.
             @return {Adaptive.Email} Wrapped object instance.
          */
          static toObject(object : any) : Email {
               var result : Email = new Email(null, null, null, null, null, null, null);

               if (object != null ) {
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
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.Email[].
             @return {Adaptive.Email[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : Email[] {
               var resultArray : Array<Email> = new Array<Email>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(Email.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.EmailAddress
        @extends Adaptive.APIBean
        Structure representing the data elements of an email addressee.

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     export class EmailAddress extends APIBean {
          /**
             @property {string} address
             The Email address
          */
          address : string;

          /**
             @property {string} address
             The Email address The 'addressProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'address'.
          */
          get addressProperty() : string {
               return this.address;
          }

          set addressProperty(address:string) {
               this.address = address;
          }

          /**
             @method constructor
             Constructor used by implementation

             @param {string} address of the Email
             @since v2.0
          */
          constructor(address: string) {
               super();
               this.address = address;
          }
          /**
             @method
             Returns the email address

             @return {string} address of the Email
             @since v2.0
          */
          getAddress() : string {
               return this.address;
          }

          /**
             @method
             Set the Email address

             @param {string} address of the Email
             @since v2.0
          */
          setAddress(address: string) {
               this.address = address;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.EmailAddress.
             @return {Adaptive.EmailAddress} Wrapped object instance.
          */
          static toObject(object : any) : EmailAddress {
               var result : EmailAddress = new EmailAddress(null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.address = object.address;

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.EmailAddress[].
             @return {Adaptive.EmailAddress[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : EmailAddress[] {
               var resultArray : Array<EmailAddress> = new Array<EmailAddress>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(EmailAddress.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.EmailAttachmentData
        @extends Adaptive.APIBean
        Structure representing the binary attachment data.

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     export class EmailAttachmentData extends APIBean {
          /**
             @property {number[]} data
             The raw data for the current file attachment (byte array)
          */
          data : Array<number>;

          /**
             @property {number[]} data
             The raw data for the current file attachment (byte array) The 'dataProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'data'.
          */
          get dataProperty() : Array<number> {
               return this.data;
          }

          set dataProperty(data:Array<number>) {
               this.data = data;
          }

          /**
             @property {string} fileName
             The name of the current file attachment
          */
          fileName : string;

          /**
             @property {string} fileName
             The name of the current file attachment The 'fileNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'fileName'.
          */
          get fileNameProperty() : string {
               return this.fileName;
          }

          set fileNameProperty(fileName:string) {
               this.fileName = fileName;
          }

          /**
             @property {string} mimeType
             The mime type of the current attachment
          */
          mimeType : string;

          /**
             @property {string} mimeType
             The mime type of the current attachment The 'mimeTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'mimeType'.
          */
          get mimeTypeProperty() : string {
               return this.mimeType;
          }

          set mimeTypeProperty(mimeType:string) {
               this.mimeType = mimeType;
          }

          /**
             @property {string} referenceUrl
             The relative path where the contents for the attachment file could be located.
          */
          referenceUrl : string;

          /**
             @property {string} referenceUrl
             The relative path where the contents for the attachment file could be located. The 'referenceUrlProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'referenceUrl'.
          */
          get referenceUrlProperty() : string {
               return this.referenceUrl;
          }

          set referenceUrlProperty(referenceUrl:string) {
               this.referenceUrl = referenceUrl;
          }

          /**
             @property {number} size
             The data size (in bytes) of the current file attachment
          */
          size : number;

          /**
             @property {number} size
             The data size (in bytes) of the current file attachment The 'sizeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'size'.
          */
          get sizeProperty() : number {
               return this.size;
          }

          set sizeProperty(size:number) {
               this.size = size;
          }

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
          constructor(data: Array<number>, size: number, fileName: string, mimeType: string, referenceUrl: string) {
               super();
               this.data = data;
               this.size = size;
               this.fileName = fileName;
               this.mimeType = mimeType;
               this.referenceUrl = referenceUrl;
          }
          /**
             @method
             Returns the raw data in byte[]

             @return {number[]} data Octet-binary content of the attachment payload.
             @since v2.0
          */
          getData() : Array<number> {
               return this.data;
          }

          /**
             @method
             Set the data of the attachment as a byte[]

             @param {number[]} data Sets the octet-binary content of the attachment.
             @since v2.0
          */
          setData(data: Array<number>) {
               this.data = data;
          }

          /**
             @method
             Returns the filename of the attachment

             @return {string} fileName Name of the attachment.
             @since v2.0
          */
          getFileName() : string {
               return this.fileName;
          }

          /**
             @method
             Set the name of the file attachment

             @param {string} fileName Name of the attachment.
             @since v2.0
          */
          setFileName(fileName: string) {
               this.fileName = fileName;
          }

          /**
             @method
             Returns the mime type of the attachment

             @return {string} mimeType
             @since v2.0
          */
          getMimeType() : string {
               return this.mimeType;
          }

          /**
             @method
             Set the mime type of the attachment

             @param {string} mimeType Mime-type of the attachment.
             @since v2.0
          */
          setMimeType(mimeType: string) {
               this.mimeType = mimeType;
          }

          /**
             @method
             Returns the absolute url of the file attachment

             @return {string} referenceUrl Absolute URL of the file attachment for either file:// or http:// access.
             @since v2.0
          */
          getReferenceUrl() : string {
               return this.referenceUrl;
          }

          /**
             @method
             Set the absolute url of the attachment

             @param {string} referenceUrl Absolute URL of the file attachment for either file:// or http:// access.
             @since v2.0
          */
          setReferenceUrl(referenceUrl: string) {
               this.referenceUrl = referenceUrl;
          }

          /**
             @method
             Returns the size of the attachment as a long

             @return {number} size Length in bytes of the octet-binary content.
             @since v2.0
          */
          getSize() : number {
               return this.size;
          }

          /**
             @method
             Set the size of the attachment as a long

             @param {number} size Length in bytes of the octet-binary content ( should be same as data array length.)
             @since v2.0
          */
          setSize(size: number) {
               this.size = size;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.EmailAttachmentData.
             @return {Adaptive.EmailAttachmentData} Wrapped object instance.
          */
          static toObject(object : any) : EmailAttachmentData {
               var result : EmailAttachmentData = new EmailAttachmentData(null, null, null, null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    if (object.data != null) {
                         result.data = new Array<number>();
                         for(var idata = 0; idata < object.data.length; idata++) {
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
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.EmailAttachmentData[].
             @return {Adaptive.EmailAttachmentData[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : EmailAttachmentData[] {
               var resultArray : Array<EmailAttachmentData> = new Array<EmailAttachmentData>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(EmailAttachmentData.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.FileDescriptor
        @extends Adaptive.APIBean
        Implementation of FileDescriptor bean.

        @author Carlos Lozano Diez
        @since 1.0
        @version 1.0
     */
     export class FileDescriptor extends APIBean {
          dateCreated : number;

          get dateCreatedProperty() : number {
               return this.dateCreated;
          }

          set dateCreatedProperty(dateCreated:number) {
               this.dateCreated = dateCreated;
          }

          dateModified : number;

          get dateModifiedProperty() : number {
               return this.dateModified;
          }

          set dateModifiedProperty(dateModified:number) {
               this.dateModified = dateModified;
          }

          name : string;

          get nameProperty() : string {
               return this.name;
          }

          set nameProperty(name:string) {
               this.name = name;
          }

          path : string;

          get pathProperty() : string {
               return this.path;
          }

          set pathProperty(path:string) {
               this.path = path;
          }

          pathAbsolute : string;

          get pathAbsoluteProperty() : string {
               return this.pathAbsolute;
          }

          set pathAbsoluteProperty(pathAbsolute:string) {
               this.pathAbsolute = pathAbsolute;
          }

          size : number;

          get sizeProperty() : number {
               return this.size;
          }

          set sizeProperty(size:number) {
               this.size = size;
          }

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
          /**
             @method
             Returns the milliseconds passed since 1/1/1970 since the file was created.

             @return {number} Timestamp in milliseconds.
             @since v2.0
          */
          getDateCreated() : number {
               return this.dateCreated;
          }

          /**
             @method
             Sets the creation timestamp in milliseconds. Used internally.

             @param {number} dateCreated Timestamp of file creation or -1 if the file or folder doesn't exist.
          */
          setDateCreated(dateCreated: number) {
               this.dateCreated = dateCreated;
          }

          /**
             @method
             Returns the milliseconds passed since 1/1/1970 since the file was modified.

             @return {number} Timestamp in milliseconds.
             @since v2.0
          */
          getDateModified() : number {
               return this.dateModified;
          }

          /**
             @method
             Sets the file or folder modification timestamp in milliseconds. Used internally.

             @param {number} dateModified Timestamp of file modification or -1 if the file or folder doesn't exist.
          */
          setDateModified(dateModified: number) {
               this.dateModified = dateModified;
          }

          /**
             @method
             Returns the name of the file if the reference is a file or the last path element of the folder.

             @return {string} The name of the file.
             @since v2.0
          */
          getName() : string {
               return this.name;
          }

          /**
             @method
             Sets the name of the file. Used internally.

             @param {string} name Name of the file or last folder path element.
          */
          setName(name: string) {
               this.name = name;
          }

          /**
             @method
             Returns the path element of the file or folder (excluding the last path element if it's a directory).

             @return {string} The path to the file.
             @since v2.0
          */
          getPath() : string {
               return this.path;
          }

          /**
             @method
             Sets the path of the file or folder. Used internally.

             @param {string} path The path element of the file or folder.
          */
          setPath(path: string) {
               this.path = path;
          }

          /**
             @method
             Returns the resolved absolute path elements of the file and/or folders (including the last path element).

             @return {string} The absolute path to the file.
             @since v2.0
          */
          getPathAbsolute() : string {
               return this.pathAbsolute;
          }

          /**
             @method
             Sets the absolute path of the file or folder. Used internally.

             @param {string} pathAbsolute String with the absolute path of file or folder.
          */
          setPathAbsolute(pathAbsolute: string) {
               this.pathAbsolute = pathAbsolute;
          }

          /**
             @method
             Returns the size in bytes of the file or -1 if the reference is a folder.

             @return {number} Size in bytes of file.
             @since v2.0
          */
          getSize() : number {
               return this.size;
          }

          /**
             @method
             Sets the file size in bytes of the file. If the file is a folder, this will be 0. If the file
doesn't exist, this will be -1. Used internally.

             @param {number} size The size in bytes of the file.
          */
          setSize(size: number) {
               this.size = size;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.FileDescriptor.
             @return {Adaptive.FileDescriptor} Wrapped object instance.
          */
          static toObject(object : any) : FileDescriptor {
               var result : FileDescriptor = new FileDescriptor();

               if (object != null ) {
                    // Assign values to bean fields.
                    result.name = object.name;
                    result.path = object.path;
                    result.pathAbsolute = object.pathAbsolute;
                    result.dateCreated = object.dateCreated;
                    result.dateModified = object.dateModified;
                    result.size = object.size;

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.FileDescriptor[].
             @return {Adaptive.FileDescriptor[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : FileDescriptor[] {
               var resultArray : Array<FileDescriptor> = new Array<FileDescriptor>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(FileDescriptor.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.Geolocation
        @extends Adaptive.APIBean
        Structure representing the data a single geolocation reading.

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     export class Geolocation extends APIBean {
          /**
             @property {number} altitude
             The current device altitude (or Z coordinate). Measured in meters.
          */
          altitude : number;

          /**
             @property {number} altitude
             The current device altitude (or Z coordinate). Measured in meters. The 'altitudeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'altitude'.
          */
          get altitudeProperty() : number {
               return this.altitude;
          }

          set altitudeProperty(altitude:number) {
               this.altitude = altitude;
          }

          /**
             @property {number} latitude
             The Y coordinate (or latitude). Measured in degrees.
          */
          latitude : number;

          /**
             @property {number} latitude
             The Y coordinate (or latitude). Measured in degrees. The 'latitudeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'latitude'.
          */
          get latitudeProperty() : number {
               return this.latitude;
          }

          set latitudeProperty(latitude:number) {
               this.latitude = latitude;
          }

          /**
             @property {number} longitude
             The X coordinate (or longitude). Measured in degrees.
          */
          longitude : number;

          /**
             @property {number} longitude
             The X coordinate (or longitude). Measured in degrees. The 'longitudeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'longitude'.
          */
          get longitudeProperty() : number {
               return this.longitude;
          }

          set longitudeProperty(longitude:number) {
               this.longitude = longitude;
          }

          /**
             @property {number} timestamp
             Timestamp of the geolocation reading.
          */
          timestamp : number;

          /**
             @property {number} timestamp
             Timestamp of the geolocation reading. The 'timestampProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'timestamp'.
          */
          get timestampProperty() : number {
               return this.timestamp;
          }

          set timestampProperty(timestamp:number) {
               this.timestamp = timestamp;
          }

          /**
             @property {number} xDoP
             Dilution of precision on the X measurement. Measured in meters.
          */
          xDoP : number;

          /**
             @property {number} xDoP
             Dilution of precision on the X measurement. Measured in meters. The 'xDoPProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'xDoP'.
          */
          get xDoPProperty() : number {
               return this.xDoP;
          }

          set xDoPProperty(xDoP:number) {
               this.xDoP = xDoP;
          }

          /**
             @property {number} yDoP
             Dilution of precision on the Y measurement. Measured in meters.
          */
          yDoP : number;

          /**
             @property {number} yDoP
             Dilution of precision on the Y measurement. Measured in meters. The 'yDoPProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'yDoP'.
          */
          get yDoPProperty() : number {
               return this.yDoP;
          }

          set yDoPProperty(yDoP:number) {
               this.yDoP = yDoP;
          }

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
          constructor(latitude: number, longitude: number, altitude: number, xDoP: number, yDoP: number, timestamp: number) {
               super();
               this.latitude = latitude;
               this.longitude = longitude;
               this.altitude = altitude;
               this.xDoP = xDoP;
               this.yDoP = yDoP;
               this.timestamp = timestamp;
          }
          /**
             @method
             Returns altitude in meters

             @return {number} Altitude of the measurement
             @since v2.0
          */
          getAltitude() : number {
               return this.altitude;
          }

          /**
             @method
             Set altitude in meters

             @param {number} altitude Altitude of the measurement
             @since v2.0
          */
          setAltitude(altitude: number) {
               this.altitude = altitude;
          }

          /**
             @method
             Returns the latitude in degrees

             @return {number} Latitude of the measurement
             @since v2.0
          */
          getLatitude() : number {
               return this.latitude;
          }

          /**
             @method
             Set the latitude in degrees

             @param {number} latitude Latitude of the measurement
             @since v2.0
          */
          setLatitude(latitude: number) {
               this.latitude = latitude;
          }

          /**
             @method
             Returns the longitude in degrees

             @return {number} Longitude of the measurement
             @since v2.0
          */
          getLongitude() : number {
               return this.longitude;
          }

          /**
             @method
             Returns the latitude in degrees

             @param {number} longitude Longitude of the measurement
             @since v2.0
          */
          setLongitude(longitude: number) {
               this.longitude = longitude;
          }

          /**
             @method
             Timestamp Getter

             @return {number} Timestamp
             @since v2.0
          */
          getTimestamp() : number {
               return this.timestamp;
          }

          /**
             @method
             Timestamp Setter

             @param {number} timestamp Timestamp
             @since v2.0
          */
          setTimestamp(timestamp: number) {
               this.timestamp = timestamp;
          }

          /**
             @method
             Gets Dilution of precision on the X measurement. Measured in meters.

             @return {number} xDoP Dilution of precision on the X measurement. Measured in meters.
          */
          getXDoP() : number {
               return this.xDoP;
          }

          /**
             @method
             Sets Dilution of precision on the X measurement. Measured in meters.

             @param {number} xDoP Dilution of precision on the X measurement. Measured in meters.
          */
          setXDoP(xDoP: number) {
               this.xDoP = xDoP;
          }

          /**
             @method
             Gets Dilution of precision on the Y measurement. Measured in meters.

             @return {number} yDoP Dilution of precision on the Y measurement. Measured in meters.
          */
          getYDoP() : number {
               return this.yDoP;
          }

          /**
             @method
             Sets Dilution of precision on the Y measurement. Measured in meters.

             @param {number} yDoP Dilution of precision on the Y measurement. Measured in meters.
          */
          setYDoP(yDoP: number) {
               this.yDoP = yDoP;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.Geolocation.
             @return {Adaptive.Geolocation} Wrapped object instance.
          */
          static toObject(object : any) : Geolocation {
               var result : Geolocation = new Geolocation(null, null, null, null, null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.latitude = object.latitude;
                    result.longitude = object.longitude;
                    result.altitude = object.altitude;
                    result.xDoP = object.xDoP;
                    result.yDoP = object.yDoP;
                    result.timestamp = object.timestamp;

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.Geolocation[].
             @return {Adaptive.Geolocation[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : Geolocation[] {
               var resultArray : Array<Geolocation> = new Array<Geolocation>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(Geolocation.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.KeyPair
        @extends Adaptive.APIBean
        Represents a basic bean to store keyName pair values

        @author Ferran Vila Conesa
        @since v2.0
        @version 1.0
     */
     export class KeyPair extends APIBean {
          /**
             @property {string} keyName
             Key of the element
          */
          keyName : string;

          /**
             @property {string} keyName
             Key of the element The 'keyNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'keyName'.
          */
          get keyNameProperty() : string {
               return this.keyName;
          }

          set keyNameProperty(keyName:string) {
               this.keyName = keyName;
          }

          /**
             @property {string} keyValue
             Value of the element
          */
          keyValue : string;

          /**
             @property {string} keyValue
             Value of the element The 'keyValueProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'keyValue'.
          */
          get keyValueProperty() : string {
               return this.keyValue;
          }

          set keyValueProperty(keyValue:string) {
               this.keyValue = keyValue;
          }

          /**
             @method constructor
             Constructor using fields

             @param {string} keyName  Key of the element
             @param {string} keyValue Value of the element
             @since v2.0
          */
          constructor(keyName: string, keyValue: string) {
               super();
               this.keyName = keyName;
               this.keyValue = keyValue;
          }
          /**
             @method
             Returns the keyName of the element

             @return {string} Key of the element
             @since v2.0
          */
          getKeyName() : string {
               return this.keyName;
          }

          /**
             @method
             Sets the keyName of the element

             @param {string} keyName Key of the element
             @since v2.0
          */
          setKeyName(keyName: string) {
               this.keyName = keyName;
          }

          /**
             @method
             Returns the keyValue of the element

             @return {string} Value of the element
             @since v2.0
          */
          getKeyValue() : string {
               return this.keyValue;
          }

          /**
             @method
             Sets the keyValue of the element

             @param {string} keyValue Value of the element
             @since v2.0
          */
          setKeyValue(keyValue: string) {
               this.keyValue = keyValue;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.KeyPair.
             @return {Adaptive.KeyPair} Wrapped object instance.
          */
          static toObject(object : any) : KeyPair {
               var result : KeyPair = new KeyPair(null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.keyName = object.keyName;
                    result.keyValue = object.keyValue;

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.KeyPair[].
             @return {Adaptive.KeyPair[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : KeyPair[] {
               var resultArray : Array<KeyPair> = new Array<KeyPair>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(KeyPair.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.KeyValue
        @extends Adaptive.APIBean
        General key/value holder class.

        @author Carlos Lozano Diez
        @since 2.0.6
        @version 1.0
     */
     export class KeyValue extends APIBean {
          /**
             @property {string} keyData
             Value of the key.
          */
          keyData : string;

          /**
             @property {string} keyData
             Value of the key. The 'keyDataProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'keyData'.
          */
          get keyDataProperty() : string {
               return this.keyData;
          }

          set keyDataProperty(keyData:string) {
               this.keyData = keyData;
          }

          /**
             @property {string} keyName
             Name of the key for the value.
          */
          keyName : string;

          /**
             @property {string} keyName
             Name of the key for the value. The 'keyNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'keyName'.
          */
          get keyNameProperty() : string {
               return this.keyName;
          }

          set keyNameProperty(keyName:string) {
               this.keyName = keyName;
          }

          /**
             @method constructor
             Convenience constructor.

             @param {string} keyName Name of the key.
             @param {string} keyData Value of the key.
             @since v2.0.6
          */
          constructor(keyName: string, keyData: string) {
               super();
               this.keyName = keyName;
               this.keyData = keyData;
          }
          /**
             @method
             Gets the value of the key.

             @return {string} Value of the key.
             @since v2.0.6
          */
          getKeyData() : string {
               return this.keyData;
          }

          /**
             @method
             Sets the value of the key.

             @param {string} keyData Value of the key.
             @since v2.0.6
          */
          setKeyData(keyData: string) {
               this.keyData = keyData;
          }

          /**
             @method
             Gets the name of the key.

             @return {string} Key name.
             @since v2.0.6
          */
          getKeyName() : string {
               return this.keyName;
          }

          /**
             @method
             Sets the name of the key.

             @param {string} keyName Key name.
             @since v2.0.6
          */
          setKeyName(keyName: string) {
               this.keyName = keyName;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.KeyValue.
             @return {Adaptive.KeyValue} Wrapped object instance.
          */
          static toObject(object : any) : KeyValue {
               var result : KeyValue = new KeyValue(null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.keyName = object.keyName;
                    result.keyData = object.keyData;

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.KeyValue[].
             @return {Adaptive.KeyValue[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : KeyValue[] {
               var resultArray : Array<KeyValue> = new Array<KeyValue>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(KeyValue.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.Lifecycle
        @extends Adaptive.APIBean
        Represents a specific application life-cycle stage.

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     export class Lifecycle extends APIBean {
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
6. Stopping    - Before stopping.
          */
          state : LifecycleState;

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
          get stateProperty() : LifecycleState {
               return this.state;
          }

          set stateProperty(state:LifecycleState) {
               this.state = state;
          }

          /**
             @method constructor
             Constructor used by the implementation

             @param {Adaptive.LifecycleState} state of the app
             @since v2.0
          */
          constructor(state: LifecycleState) {
               super();
               this.state = state;
          }
          /**
             @method
             Returns the state of the application

             @return {Adaptive.LifecycleState} state of the app
             @since v2.0
          */
          getState() : LifecycleState {
               return this.state;
          }

          /**
             @method
             Set the State of the application

             @param {Adaptive.LifecycleState} state of the app
             @since v2.0
          */
          setState(state: LifecycleState) {
               this.state = state;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.Lifecycle.
             @return {Adaptive.Lifecycle} Wrapped object instance.
          */
          static toObject(object : any) : Lifecycle {
               var result : Lifecycle = new Lifecycle(null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.state = LifecycleState.toObject(object.state);

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.Lifecycle[].
             @return {Adaptive.Lifecycle[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : Lifecycle[] {
               var resultArray : Array<Lifecycle> = new Array<Lifecycle>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(Lifecycle.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.Locale
        @extends Adaptive.APIBean
        Represents a specific user or system locate.

        @author Aryslan
        @since v2.0
        @version 1.0
     */
     export class Locale extends APIBean {
          /**
             @property {string} country
             A valid ISO Country Code.
          */
          country : string;

          /**
             @property {string} country
             A valid ISO Country Code. The 'countryProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'country'.
          */
          get countryProperty() : string {
               return this.country;
          }

          set countryProperty(country:string) {
               this.country = country;
          }

          /**
             @property {string} language
             A valid ISO Language Code.
          */
          language : string;

          /**
             @property {string} language
             A valid ISO Language Code. The 'languageProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'language'.
          */
          get languageProperty() : string {
               return this.language;
          }

          set languageProperty(language:string) {
               this.language = language;
          }

          /**
             @method constructor
             Constructor used by the implementation

             @param {string} country  Country of the Locale
             @param {string} language Language of the Locale
             @since v2.0
          */
          constructor(language: string, country: string) {
               super();
               this.language = language;
               this.country = country;
          }
          /**
             @method
             Returns the country code

             @return {string} country code
             @since v2.0
          */
          getCountry() : string {
               return this.country;
          }

          /**
             @method
             Set the country code

             @param {string} country code
             @since v2.0
          */
          setCountry(country: string) {
               this.country = country;
          }

          /**
             @method
             Returns the language code

             @return {string} language code
             @since v2.0
          */
          getLanguage() : string {
               return this.language;
          }

          /**
             @method
             Set the language code

             @param {string} language code
             @since v2.0
          */
          setLanguage(language: string) {
               this.language = language;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.Locale.
             @return {Adaptive.Locale} Wrapped object instance.
          */
          static toObject(object : any) : Locale {
               var result : Locale = new Locale(null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.country = object.country;
                    result.language = object.language;

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.Locale[].
             @return {Adaptive.Locale[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : Locale[] {
               var resultArray : Array<Locale> = new Array<Locale>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(Locale.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.OSInfo
        @extends Adaptive.APIBean
        Represents the basic information about the operating system.

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     export class OSInfo extends APIBean {
          /**
             @property {Adaptive.IOSType} name
             The name of the operating system.
          */
          name : IOSType;

          /**
             @property {Adaptive.IOSType} name
             The name of the operating system. The 'nameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'name'.
          */
          get nameProperty() : IOSType {
               return this.name;
          }

          set nameProperty(name:IOSType) {
               this.name = name;
          }

          /**
             @property {string} vendor
             The vendor of the operating system.
          */
          vendor : string;

          /**
             @property {string} vendor
             The vendor of the operating system. The 'vendorProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'vendor'.
          */
          get vendorProperty() : string {
               return this.vendor;
          }

          set vendorProperty(vendor:string) {
               this.vendor = vendor;
          }

          /**
             @property {string} version
             The version/identifier of the operating system.
          */
          version : string;

          /**
             @property {string} version
             The version/identifier of the operating system. The 'versionProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'version'.
          */
          get versionProperty() : string {
               return this.version;
          }

          set versionProperty(version:string) {
               this.version = version;
          }

          /**
             @method constructor
             Constructor used by implementation to set the OS information.

             @param {Adaptive.IOSType} name    of the OS.
             @param {string} version of the OS.
             @param {string} vendor  of the OS.
             @since v2.0
          */
          constructor(name: IOSType, version: string, vendor: string) {
               super();
               this.name = name;
               this.version = version;
               this.vendor = vendor;
          }
          /**
             @method
             Returns the name of the operating system.

             @return {Adaptive.IOSType} OS name.
             @since v2.0
          */
          getName() : IOSType {
               return this.name;
          }

          /**
             @method
             Sets The name of the operating system.

             @param {Adaptive.IOSType} name The name of the operating system.
          */
          setName(name: IOSType) {
               this.name = name;
          }

          /**
             @method
             Returns the vendor of the operating system.

             @return {string} OS vendor.
             @since v2.0
          */
          getVendor() : string {
               return this.vendor;
          }

          /**
             @method
             Sets The vendor of the operating system.

             @param {string} vendor The vendor of the operating system.
          */
          setVendor(vendor: string) {
               this.vendor = vendor;
          }

          /**
             @method
             Returns the version of the operating system.

             @return {string} OS version.
             @since v2.0
          */
          getVersion() : string {
               return this.version;
          }

          /**
             @method
             Sets The version/identifier of the operating system.

             @param {string} version The version/identifier of the operating system.
          */
          setVersion(version: string) {
               this.version = version;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.OSInfo.
             @return {Adaptive.OSInfo} Wrapped object instance.
          */
          static toObject(object : any) : OSInfo {
               var result : OSInfo = new OSInfo(null, null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.name = IOSType.toObject(object.name);
                    result.version = object.version;
                    result.vendor = object.vendor;

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.OSInfo[].
             @return {Adaptive.OSInfo[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : OSInfo[] {
               var resultArray : Array<OSInfo> = new Array<OSInfo>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(OSInfo.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.RotationEvent
        @extends Adaptive.APIBean
        Object for reporting orientation change events for device and display.

        @author Carlos Lozano Diez
        @since v2.0.5
        @version 1.0
     */
     export class RotationEvent extends APIBean {
          /**
             @property {Adaptive.ICapabilitiesOrientation} destination
             The orientation we're rotating to. This is the future orientation when the state of the event is
WillStartRotation. This will be the current orientation when the rotation is finished with the state
DidFinishRotation.
          */
          destination : ICapabilitiesOrientation;

          /**
             @property {Adaptive.ICapabilitiesOrientation} destination
             The orientation we're rotating to. This is the future orientation when the state of the event is
WillStartRotation. This will be the current orientation when the rotation is finished with the state
DidFinishRotation. The 'destinationProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'destination'.
          */
          get destinationProperty() : ICapabilitiesOrientation {
               return this.destination;
          }

          set destinationProperty(destination:ICapabilitiesOrientation) {
               this.destination = destination;
          }

          /**
             @property {Adaptive.ICapabilitiesOrientation} origin
             The orientation we're rotating from. This is the current orientation when the state of the event is
WillStartRotation. This will be the previous orientation when the rotation is finished with the state
DidFinishRotation.
          */
          origin : ICapabilitiesOrientation;

          /**
             @property {Adaptive.ICapabilitiesOrientation} origin
             The orientation we're rotating from. This is the current orientation when the state of the event is
WillStartRotation. This will be the previous orientation when the rotation is finished with the state
DidFinishRotation. The 'originProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'origin'.
          */
          get originProperty() : ICapabilitiesOrientation {
               return this.origin;
          }

          set originProperty(origin:ICapabilitiesOrientation) {
               this.origin = origin;
          }

          /**
             @property {Adaptive.RotationEventState} state
             The state of the event to indicate the start of the rotation and the end of the rotation event. This allows
for functions to be pre-emptively performed (veto change, re-layout, etc.) before rotation is effected and
concluded.
          */
          state : RotationEventState;

          /**
             @property {Adaptive.RotationEventState} state
             The state of the event to indicate the start of the rotation and the end of the rotation event. This allows
for functions to be pre-emptively performed (veto change, re-layout, etc.) before rotation is effected and
concluded. The 'stateProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'state'.
          */
          get stateProperty() : RotationEventState {
               return this.state;
          }

          set stateProperty(state:RotationEventState) {
               this.state = state;
          }

          /**
             @property {number} timestamp
             The timestamps in milliseconds when the event was fired.
          */
          timestamp : number;

          /**
             @property {number} timestamp
             The timestamps in milliseconds when the event was fired. The 'timestampProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'timestamp'.
          */
          get timestampProperty() : number {
               return this.timestamp;
          }

          set timestampProperty(timestamp:number) {
               this.timestamp = timestamp;
          }

          /**
             @method constructor
             Convenience constructor.

             @param {Adaptive.ICapabilitiesOrientation} origin      Source orientation when the event was fired.
             @param {Adaptive.ICapabilitiesOrientation} destination Destination orientation when the event was fired.
             @param {Adaptive.RotationEventState} state       State of the event (WillBegin, DidFinish).
             @param {number} timestamp   Timestamp in milliseconds when the event was fired.
             @since v2.0.5
          */
          constructor(origin: ICapabilitiesOrientation, destination: ICapabilitiesOrientation, state: RotationEventState, timestamp: number) {
               super();
               this.origin = origin;
               this.destination = destination;
               this.state = state;
               this.timestamp = timestamp;
          }
          /**
             @method
             Gets the destination orientation of the event.

             @return {Adaptive.ICapabilitiesOrientation} Destination orientation.
             @since v2.0.5
          */
          getDestination() : ICapabilitiesOrientation {
               return this.destination;
          }

          /**
             @method
             Sets the destination orientation of the event.

             @param {Adaptive.ICapabilitiesOrientation} destination Destination orientation.
             @since v2.0.5
          */
          setDestination(destination: ICapabilitiesOrientation) {
               this.destination = destination;
          }

          /**
             @method
             Get the origin orientation of the event.

             @return {Adaptive.ICapabilitiesOrientation} Origin orientation.
             @since v2.0.5
          */
          getOrigin() : ICapabilitiesOrientation {
               return this.origin;
          }

          /**
             @method
             Set the origin orientation of the event.

             @param {Adaptive.ICapabilitiesOrientation} origin Origin orientation
             @since v2.0.5
          */
          setOrigin(origin: ICapabilitiesOrientation) {
               this.origin = origin;
          }

          /**
             @method
             Gets the current state of the event.

             @return {Adaptive.RotationEventState} State of the event.
             @since v2.0.5
          */
          getState() : RotationEventState {
               return this.state;
          }

          /**
             @method
             Sets the current state of the event.

             @param {Adaptive.RotationEventState} state The state of the event.
             @since v2.0.5
          */
          setState(state: RotationEventState) {
               this.state = state;
          }

          /**
             @method
             Gets the timestamp in milliseconds of the event.

             @return {number} Timestamp of the event.
             @since v2.0.5
          */
          getTimestamp() : number {
               return this.timestamp;
          }

          /**
             @method
             Sets the timestamp in milliseconds of the event.

             @param {number} timestamp Timestamp of the event.
             @since v2.0.5
          */
          setTimestamp(timestamp: number) {
               this.timestamp = timestamp;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.RotationEvent.
             @return {Adaptive.RotationEvent} Wrapped object instance.
          */
          static toObject(object : any) : RotationEvent {
               var result : RotationEvent = new RotationEvent(null, null, null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.origin = ICapabilitiesOrientation.toObject(object.origin);
                    result.destination = ICapabilitiesOrientation.toObject(object.destination);
                    result.state = RotationEventState.toObject(object.state);
                    result.timestamp = object.timestamp;

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.RotationEvent[].
             @return {Adaptive.RotationEvent[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : RotationEvent[] {
               var resultArray : Array<RotationEvent> = new Array<RotationEvent>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(RotationEvent.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.SecureKeyPair
        @extends Adaptive.APIBean
        Represents a single secureKey-value pair.

        @author Aryslan
        @since v2.0
        @version 1.0
     */
     export class SecureKeyPair extends APIBean {
          /**
             @property {string} secureData
             Value of the secured element
          */
          secureData : string;

          /**
             @property {string} secureData
             Value of the secured element The 'secureDataProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'secureData'.
          */
          get secureDataProperty() : string {
               return this.secureData;
          }

          set secureDataProperty(secureData:string) {
               this.secureData = secureData;
          }

          /**
             @property {string} secureKey
             Key of the secured element
          */
          secureKey : string;

          /**
             @property {string} secureKey
             Key of the secured element The 'secureKeyProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'secureKey'.
          */
          get secureKeyProperty() : string {
               return this.secureKey;
          }

          set secureKeyProperty(secureKey:string) {
               this.secureKey = secureKey;
          }

          /**
             @method constructor
             Constructor with parameters

             @param {string} secureKey  name of the keypair
             @param {string} secureData value of the keypair
             @since v2.0
          */
          constructor(secureKey: string, secureData: string) {
               super();
               this.secureKey = secureKey;
               this.secureData = secureData;
          }
          /**
             @method
             Returns the object value

             @return {string} Value.
             @since v2.0
          */
          getSecureData() : string {
               return this.secureData;
          }

          /**
             @method
             Sets the value for this object

             @param {string} secureData value to set.
             @since v2.0
          */
          setSecureData(secureData: string) {
               this.secureData = secureData;
          }

          /**
             @method
             Returns the object secureKey name.

             @return {string} Key name.
             @since v2.0
          */
          getSecureKey() : string {
               return this.secureKey;
          }

          /**
             @method
             Sets the secureKey name for this object.

             @param {string} secureKey Key name.
             @since v2.0
          */
          setSecureKey(secureKey: string) {
               this.secureKey = secureKey;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.SecureKeyPair.
             @return {Adaptive.SecureKeyPair} Wrapped object instance.
          */
          static toObject(object : any) : SecureKeyPair {
               var result : SecureKeyPair = new SecureKeyPair(null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.secureKey = object.secureKey;
                    result.secureData = object.secureData;

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.SecureKeyPair[].
             @return {Adaptive.SecureKeyPair[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : SecureKeyPair[] {
               var resultArray : Array<SecureKeyPair> = new Array<SecureKeyPair>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(SecureKeyPair.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.ServiceRequest
        @extends Adaptive.APIBean
        Represents a local or remote service request.

        @author Aryslan
        @since v2.0
        @version 1.0
     */
     export class ServiceRequest extends APIBean {
          /**
             @property {Adaptive.IServiceContentEncoding} contentEncoding
             Encoding of the content - by default assumed to be UTF8. This may be populated by the application, the platform
populates this field with defaults for the service.
          */
          contentEncoding : IServiceContentEncoding;

          /**
             @property {Adaptive.IServiceContentEncoding} contentEncoding
             Encoding of the content - by default assumed to be UTF8. This may be populated by the application, the platform
populates this field with defaults for the service. The 'contentEncodingProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contentEncoding'.
          */
          get contentEncodingProperty() : IServiceContentEncoding {
               return this.contentEncoding;
          }

          set contentEncodingProperty(contentEncoding:IServiceContentEncoding) {
               this.contentEncoding = contentEncoding;
          }

          /**
             @property {Adaptive.ServiceRequestParameter[]} bodyParameters
             Body parameters to be included in the body of the request to a service. These may be applied
during GET/POST operations. No body parameters are included if this array is null or length zero.
          */
          bodyParameters : Array<ServiceRequestParameter>;

          /**
             @property {Adaptive.ServiceRequestParameter[]} bodyParameters
             Body parameters to be included in the body of the request to a service. These may be applied
during GET/POST operations. No body parameters are included if this array is null or length zero. The 'bodyParametersProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'bodyParameters'.
          */
          get bodyParametersProperty() : Array<ServiceRequestParameter> {
               return this.bodyParameters;
          }

          set bodyParametersProperty(bodyParameters:Array<ServiceRequestParameter>) {
               this.bodyParameters = bodyParameters;
          }

          /**
             @property {string} content
             Request data content (plain text). This should be populated by the application. The content should be
in some well-known web format - in specific, binaries submitted should be encoded to base64 and the content
type should be set respectively by the application.
          */
          content : string;

          /**
             @property {string} content
             Request data content (plain text). This should be populated by the application. The content should be
in some well-known web format - in specific, binaries submitted should be encoded to base64 and the content
type should be set respectively by the application. The 'contentProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'content'.
          */
          get contentProperty() : string {
               return this.content;
          }

          set contentProperty(content:string) {
               this.content = content;
          }

          /**
             @property {number} contentLength
             The length in bytes of the content. This may be populated by the application, the platform
calculates this length automatically if a specific contentLength is not specified.
          */
          contentLength : number;

          /**
             @property {number} contentLength
             The length in bytes of the content. This may be populated by the application, the platform
calculates this length automatically if a specific contentLength is not specified. The 'contentLengthProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contentLength'.
          */
          get contentLengthProperty() : number {
               return this.contentLength;
          }

          set contentLengthProperty(contentLength:number) {
               this.contentLength = contentLength;
          }

          /**
             @property {string} contentType
             The request content type (MIME TYPE). This may be populated by the application, the platform
populates this field with defaults for the service.
          */
          contentType : string;

          /**
             @property {string} contentType
             The request content type (MIME TYPE). This may be populated by the application, the platform
populates this field with defaults for the service. The 'contentTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contentType'.
          */
          get contentTypeProperty() : string {
               return this.contentType;
          }

          set contentTypeProperty(contentType:string) {
               this.contentType = contentType;
          }

          /**
             @property {Adaptive.ServiceRequestParameter[]} queryParameters
             Query string parameters to be appended to the service URL when making the request. These may be applied
during GET/POST operations. No query parameters are appended if this array is null or length zero.
          */
          queryParameters : Array<ServiceRequestParameter>;

          /**
             @property {Adaptive.ServiceRequestParameter[]} queryParameters
             Query string parameters to be appended to the service URL when making the request. These may be applied
during GET/POST operations. No query parameters are appended if this array is null or length zero. The 'queryParametersProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'queryParameters'.
          */
          get queryParametersProperty() : Array<ServiceRequestParameter> {
               return this.queryParameters;
          }

          set queryParametersProperty(queryParameters:Array<ServiceRequestParameter>) {
               this.queryParameters = queryParameters;
          }

          /**
             @property {string} refererHost
             This host indicates the origin host of the request. This, could be useful in case of redirected requests.
          */
          refererHost : string;

          /**
             @property {string} refererHost
             This host indicates the origin host of the request. This, could be useful in case of redirected requests. The 'refererHostProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'refererHost'.
          */
          get refererHostProperty() : string {
               return this.refererHost;
          }

          set refererHostProperty(refererHost:string) {
               this.refererHost = refererHost;
          }

          /**
             @property {Adaptive.ServiceHeader[]} serviceHeaders
             The serviceHeaders array (name,value pairs) to be included in the request. This may be populated by the
application, the platform populates this field with defaults for the service and the previous headers.
In specific, the platform maintains request and response state automatically.
          */
          serviceHeaders : Array<ServiceHeader>;

          /**
             @property {Adaptive.ServiceHeader[]} serviceHeaders
             The serviceHeaders array (name,value pairs) to be included in the request. This may be populated by the
application, the platform populates this field with defaults for the service and the previous headers.
In specific, the platform maintains request and response state automatically. The 'serviceHeadersProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'serviceHeaders'.
          */
          get serviceHeadersProperty() : Array<ServiceHeader> {
               return this.serviceHeaders;
          }

          set serviceHeadersProperty(serviceHeaders:Array<ServiceHeader>) {
               this.serviceHeaders = serviceHeaders;
          }

          /**
             @property {Adaptive.ServiceSession} serviceSession
             Session attributes and cookies. This may be populated by the application, the platform populates
this field with defaults for the service and the previous state information. In specific, the platform
maintains request and response state automatically.
          */
          serviceSession : ServiceSession;

          /**
             @property {Adaptive.ServiceSession} serviceSession
             Session attributes and cookies. This may be populated by the application, the platform populates
this field with defaults for the service and the previous state information. In specific, the platform
maintains request and response state automatically. The 'serviceSessionProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'serviceSession'.
          */
          get serviceSessionProperty() : ServiceSession {
               return this.serviceSession;
          }

          set serviceSessionProperty(serviceSession:ServiceSession) {
               this.serviceSession = serviceSession;
          }

          /**
             @property {Adaptive.ServiceToken} serviceToken
             Token used for the creation of the request with the destination service, endpoint, function and method
identifiers. This should not be manipulated by the application directly.
          */
          serviceToken : ServiceToken;

          /**
             @property {Adaptive.ServiceToken} serviceToken
             Token used for the creation of the request with the destination service, endpoint, function and method
identifiers. This should not be manipulated by the application directly. The 'serviceTokenProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'serviceToken'.
          */
          get serviceTokenProperty() : ServiceToken {
               return this.serviceToken;
          }

          set serviceTokenProperty(serviceToken:ServiceToken) {
               this.serviceToken = serviceToken;
          }

          /**
             @property {string} userAgent
             This attribute allows for the default user-agent string to be overridden by the application.
          */
          userAgent : string;

          /**
             @property {string} userAgent
             This attribute allows for the default user-agent string to be overridden by the application. The 'userAgentProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'userAgent'.
          */
          get userAgentProperty() : string {
               return this.userAgent;
          }

          set userAgentProperty(userAgent:string) {
               this.userAgent = userAgent;
          }

          /**
             @method constructor
             Convenience constructor.

             @param {string} content      Content payload.
             @param {Adaptive.ServiceToken} serviceToken ServiceToken for the request.
             @since v2.0.6
          */
          constructor(content: string, serviceToken: ServiceToken) {
               super();
               this.content = content;
               this.serviceToken = serviceToken;
          }
          /**
             @method
             Returns the content encoding

             @return {Adaptive.IServiceContentEncoding} contentEncoding
             @since v2.0
          */
          getContentEncoding() : IServiceContentEncoding {
               return this.contentEncoding;
          }

          /**
             @method
             Set the content encoding

             @param {Adaptive.IServiceContentEncoding} contentEncoding Encoding of the binary payload - by default assumed to be UTF8.
             @since v2.0
          */
          setContentEncoding(contentEncoding: IServiceContentEncoding) {
               this.contentEncoding = contentEncoding;
          }

          /**
             @method
             Gets the body parameters of the request.

             @return {Adaptive.ServiceRequestParameter[]} ServiceRequestParameter array or null if none are specified.
             @since v2.0.6
          */
          getBodyParameters() : Array<ServiceRequestParameter> {
               return this.bodyParameters;
          }

          /**
             @method
             Sets the body parameters of the request.

             @param {Adaptive.ServiceRequestParameter[]} bodyParameters ServiceRequestParameter array or null if none are specified.
             @since v2.0.6
          */
          setBodyParameters(bodyParameters: Array<ServiceRequestParameter>) {
               this.bodyParameters = bodyParameters;
          }

          /**
             @method
             Returns the content

             @return {string} content
             @since v2.0
          */
          getContent() : string {
               return this.content;
          }

          /**
             @method
             Set the content

             @param {string} content Request/Response data content (plain text)
             @since v2.0
          */
          setContent(content: string) {
               this.content = content;
          }

          /**
             @method
             Returns the content length

             @return {number} contentLength
             @since v2.0
          */
          getContentLength() : number {
               return this.contentLength;
          }

          /**
             @method
             Set the content length

             @param {number} contentLength The length in bytes for the Content field.
             @since v2.0
          */
          setContentLength(contentLength: number) {
               this.contentLength = contentLength;
          }

          /**
             @method
             Returns the content type

             @return {string} contentType
             @since v2.0
          */
          getContentType() : string {
               return this.contentType;
          }

          /**
             @method
             Set the content type

             @param {string} contentType The request/response content type (MIME TYPE).
             @since v2.0
          */
          setContentType(contentType: string) {
               this.contentType = contentType;
          }

          /**
             @method
             Gets the query parameters of the request.

             @return {Adaptive.ServiceRequestParameter[]} ServiceRequestParameter array or null if none are specified.
             @since v2.0.6
          */
          getQueryParameters() : Array<ServiceRequestParameter> {
               return this.queryParameters;
          }

          /**
             @method
             Sets the query parameters of the request.

             @param {Adaptive.ServiceRequestParameter[]} queryParameters ServiceRequestParameter array or null if none are specified.
             @since v2.0.6
          */
          setQueryParameters(queryParameters: Array<ServiceRequestParameter>) {
               this.queryParameters = queryParameters;
          }

          /**
             @method
             Returns the referer host (origin) of the request.

             @return {string} Referer host of the request
             @since v2.1.4
          */
          getRefererHost() : string {
               return this.refererHost;
          }

          /**
             @method
             Sets the value for the referer host of the request.

             @param {string} refererHost Referer host of the request
             @since v2.1.4
          */
          setRefererHost(refererHost: string) {
               this.refererHost = refererHost;
          }

          /**
             @method
             Returns the array of ServiceHeader

             @return {Adaptive.ServiceHeader[]} serviceHeaders
             @since v2.0
          */
          getServiceHeaders() : Array<ServiceHeader> {
               return this.serviceHeaders;
          }

          /**
             @method
             Set the array of ServiceHeader

             @param {Adaptive.ServiceHeader[]} serviceHeaders The serviceHeaders array (name,value pairs) to be included on the I/O service request.
             @since v2.0
          */
          setServiceHeaders(serviceHeaders: Array<ServiceHeader>) {
               this.serviceHeaders = serviceHeaders;
          }

          /**
             @method
             Getter for service session

             @return {Adaptive.ServiceSession} The element service session
             @since v2.0
          */
          getServiceSession() : ServiceSession {
               return this.serviceSession;
          }

          /**
             @method
             Setter for service session

             @param {Adaptive.ServiceSession} serviceSession The element service session
             @since v2.0
          */
          setServiceSession(serviceSession: ServiceSession) {
               this.serviceSession = serviceSession;
          }

          /**
             @method
             Gets the ServiceToken of the request.

             @return {Adaptive.ServiceToken} ServiceToken.
             @since v2.0.6
          */
          getServiceToken() : ServiceToken {
               return this.serviceToken;
          }

          /**
             @method
             Sets the ServiceToken of the request.

             @param {Adaptive.ServiceToken} serviceToken ServiceToken to be used for the invocation.
             @since v2.0.6
          */
          setServiceToken(serviceToken: ServiceToken) {
               this.serviceToken = serviceToken;
          }

          /**
             @method
             Gets the overridden user-agent string.

             @return {string} User-agent string.
             @since v2.0.6
          */
          getUserAgent() : string {
               return this.userAgent;
          }

          /**
             @method
             Sets the user-agent to override the default user-agent string.

             @param {string} userAgent User-agent string.
             @since v2.0.6
          */
          setUserAgent(userAgent: string) {
               this.userAgent = userAgent;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ServiceRequest.
             @return {Adaptive.ServiceRequest} Wrapped object instance.
          */
          static toObject(object : any) : ServiceRequest {
               var result : ServiceRequest = new ServiceRequest(null, null);

               if (object != null ) {
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
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ServiceRequest[].
             @return {Adaptive.ServiceRequest[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : ServiceRequest[] {
               var resultArray : Array<ServiceRequest> = new Array<ServiceRequest>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(ServiceRequest.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.ServiceResponse
        @extends Adaptive.APIBean
        Represents a local or remote service response.

        @author Aryslan
        @since v2.0
        @version 1.0
     */
     export class ServiceResponse extends APIBean {
          /**
             @property {Adaptive.IServiceContentEncoding} contentEncoding
             Encoding of the binary payload - by default assumed to be UTF8.
          */
          contentEncoding : IServiceContentEncoding;

          /**
             @property {Adaptive.IServiceContentEncoding} contentEncoding
             Encoding of the binary payload - by default assumed to be UTF8. The 'contentEncodingProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contentEncoding'.
          */
          get contentEncodingProperty() : IServiceContentEncoding {
               return this.contentEncoding;
          }

          set contentEncodingProperty(contentEncoding:IServiceContentEncoding) {
               this.contentEncoding = contentEncoding;
          }

          /**
             @property {string} content
             Response data content. The content should be in some well-known web format - in specific, binaries returned
should be encoded in base64.
          */
          content : string;

          /**
             @property {string} content
             Response data content. The content should be in some well-known web format - in specific, binaries returned
should be encoded in base64. The 'contentProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'content'.
          */
          get contentProperty() : string {
               return this.content;
          }

          set contentProperty(content:string) {
               this.content = content;
          }

          /**
             @property {number} contentLength
             The length in bytes for the Content field.
          */
          contentLength : number;

          /**
             @property {number} contentLength
             The length in bytes for the Content field. The 'contentLengthProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contentLength'.
          */
          get contentLengthProperty() : number {
               return this.contentLength;
          }

          set contentLengthProperty(contentLength:number) {
               this.contentLength = contentLength;
          }

          /**
             @property {string} contentType
             The request/response content type (MIME TYPE).
          */
          contentType : string;

          /**
             @property {string} contentType
             The request/response content type (MIME TYPE). The 'contentTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contentType'.
          */
          get contentTypeProperty() : string {
               return this.contentType;
          }

          set contentTypeProperty(contentType:string) {
               this.contentType = contentType;
          }

          /**
             @property {Adaptive.ServiceHeader[]} serviceHeaders
             The serviceHeaders array (name,value pairs) to be included on the I/O service request.
          */
          serviceHeaders : Array<ServiceHeader>;

          /**
             @property {Adaptive.ServiceHeader[]} serviceHeaders
             The serviceHeaders array (name,value pairs) to be included on the I/O service request. The 'serviceHeadersProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'serviceHeaders'.
          */
          get serviceHeadersProperty() : Array<ServiceHeader> {
               return this.serviceHeaders;
          }

          set serviceHeadersProperty(serviceHeaders:Array<ServiceHeader>) {
               this.serviceHeaders = serviceHeaders;
          }

          /**
             @property {Adaptive.ServiceSession} serviceSession
             Information about the session.
          */
          serviceSession : ServiceSession;

          /**
             @property {Adaptive.ServiceSession} serviceSession
             Information about the session. The 'serviceSessionProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'serviceSession'.
          */
          get serviceSessionProperty() : ServiceSession {
               return this.serviceSession;
          }

          set serviceSessionProperty(serviceSession:ServiceSession) {
               this.serviceSession = serviceSession;
          }

          /**
             @property {number} statusCode
             HTTP Status code of the response. With this status code it is possible to perform some actions, redirects, authentication, etc.
          */
          statusCode : number;

          /**
             @property {number} statusCode
             HTTP Status code of the response. With this status code it is possible to perform some actions, redirects, authentication, etc. The 'statusCodeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'statusCode'.
          */
          get statusCodeProperty() : number {
               return this.statusCode;
          }

          set statusCodeProperty(statusCode:number) {
               this.statusCode = statusCode;
          }

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
          constructor(content: string, contentType: string, contentEncoding: IServiceContentEncoding, contentLength: number, serviceHeaders: Array<ServiceHeader>, serviceSession: ServiceSession, statusCode: number) {
               super();
               this.content = content;
               this.contentType = contentType;
               this.contentEncoding = contentEncoding;
               this.contentLength = contentLength;
               this.serviceHeaders = serviceHeaders;
               this.serviceSession = serviceSession;
               this.statusCode = statusCode;
          }
          /**
             @method
             Returns the content encoding

             @return {Adaptive.IServiceContentEncoding} contentEncoding
             @since v2.0
          */
          getContentEncoding() : IServiceContentEncoding {
               return this.contentEncoding;
          }

          /**
             @method
             Set the content encoding

             @param {Adaptive.IServiceContentEncoding} contentEncoding Encoding of the binary payload - by default assumed to be UTF8.
             @since v2.0
          */
          setContentEncoding(contentEncoding: IServiceContentEncoding) {
               this.contentEncoding = contentEncoding;
          }

          /**
             @method
             Returns the content

             @return {string} content
             @since v2.0
          */
          getContent() : string {
               return this.content;
          }

          /**
             @method
             Set the content

             @param {string} content Request/Response data content (plain text).
             @since v2.0
          */
          setContent(content: string) {
               this.content = content;
          }

          /**
             @method
             Returns the content length

             @return {number} contentLength
             @since v2.0
          */
          getContentLength() : number {
               return this.contentLength;
          }

          /**
             @method
             Set the content length.

             @param {number} contentLength The length in bytes for the Content field.
             @since v2.0
          */
          setContentLength(contentLength: number) {
               this.contentLength = contentLength;
          }

          /**
             @method
             Returns the content type

             @return {string} contentType
             @since v2.0
          */
          getContentType() : string {
               return this.contentType;
          }

          /**
             @method
             Set the content type

             @param {string} contentType The request/response content type (MIME TYPE).
             @since v2.0
          */
          setContentType(contentType: string) {
               this.contentType = contentType;
          }

          /**
             @method
             Returns the array of ServiceHeader

             @return {Adaptive.ServiceHeader[]} serviceHeaders
             @since v2.0
          */
          getServiceHeaders() : Array<ServiceHeader> {
               return this.serviceHeaders;
          }

          /**
             @method
             Set the array of ServiceHeader

             @param {Adaptive.ServiceHeader[]} serviceHeaders The serviceHeaders array (name,value pairs) to be included on the I/O service request.
             @since v2.0
          */
          setServiceHeaders(serviceHeaders: Array<ServiceHeader>) {
               this.serviceHeaders = serviceHeaders;
          }

          /**
             @method
             Getter for service session

             @return {Adaptive.ServiceSession} The element service session
             @since v2.0
          */
          getServiceSession() : ServiceSession {
               return this.serviceSession;
          }

          /**
             @method
             Setter for service session

             @param {Adaptive.ServiceSession} serviceSession The element service session
             @since v2.0
          */
          setServiceSession(serviceSession: ServiceSession) {
               this.serviceSession = serviceSession;
          }

          /**
             @method
             Returns the status code of the response.

             @return {number} HTTP status code
             @since v2.1.4
          */
          getStatusCode() : number {
               return this.statusCode;
          }

          /**
             @method
             Sets the status code of the response

             @param {number} statusCode HTTP status code
             @since v2.1.4
          */
          setStatusCode(statusCode: number) {
               this.statusCode = statusCode;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ServiceResponse.
             @return {Adaptive.ServiceResponse} Wrapped object instance.
          */
          static toObject(object : any) : ServiceResponse {
               var result : ServiceResponse = new ServiceResponse(null, null, null, null, null, null, null);

               if (object != null ) {
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
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ServiceResponse[].
             @return {Adaptive.ServiceResponse[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : ServiceResponse[] {
               var resultArray : Array<ServiceResponse> = new Array<ServiceResponse>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(ServiceResponse.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.ServiceSession
        @extends Adaptive.APIBean
        Represents a session object for HTTP request and responses

        @author Ferran Vila Conesa
        @since v2.0
        @version 1.0
     */
     export class ServiceSession extends APIBean {
          /**
             @property {Adaptive.ServiceSessionAttribute[]} attributes
             The attributes of the request or response.
          */
          attributes : Array<ServiceSessionAttribute>;

          /**
             @property {Adaptive.ServiceSessionAttribute[]} attributes
             The attributes of the request or response. The 'attributesProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'attributes'.
          */
          get attributesProperty() : Array<ServiceSessionAttribute> {
               return this.attributes;
          }

          set attributesProperty(attributes:Array<ServiceSessionAttribute>) {
               this.attributes = attributes;
          }

          /**
             @property {Adaptive.ServiceSessionCookie[]} cookies
             The cookies of the request or response.
          */
          cookies : Array<ServiceSessionCookie>;

          /**
             @property {Adaptive.ServiceSessionCookie[]} cookies
             The cookies of the request or response. The 'cookiesProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'cookies'.
          */
          get cookiesProperty() : Array<ServiceSessionCookie> {
               return this.cookies;
          }

          set cookiesProperty(cookies:Array<ServiceSessionCookie>) {
               this.cookies = cookies;
          }

          /**
             @method constructor
             Constructor with fields.

             @param {Adaptive.ServiceSessionCookie[]} cookies    The cookies of the request or response.
             @param {Adaptive.ServiceSessionAttribute[]} attributes Attributes of the request or response.
             @since v2.0
          */
          constructor(cookies: Array<ServiceSessionCookie>, attributes: Array<ServiceSessionAttribute>) {
               super();
               this.cookies = cookies;
               this.attributes = attributes;
          }
          /**
             @method
             Gets the attributes of the request or response.

             @return {Adaptive.ServiceSessionAttribute[]} Attributes of the request or response.
             @since v2.0
          */
          getAttributes() : Array<ServiceSessionAttribute> {
               return this.attributes;
          }

          /**
             @method
             Sets the attributes for the request or response.

             @param {Adaptive.ServiceSessionAttribute[]} attributes Attributes of the request or response.
             @since v2.0
          */
          setAttributes(attributes: Array<ServiceSessionAttribute>) {
               this.attributes = attributes;
          }

          /**
             @method
             Returns the cookies of the request or response.

             @return {Adaptive.ServiceSessionCookie[]} The cookies of the request or response.
             @since v2.0
          */
          getCookies() : Array<ServiceSessionCookie> {
               return this.cookies;
          }

          /**
             @method
             Sets the cookies of the request or response.

             @param {Adaptive.ServiceSessionCookie[]} cookies The cookies of the request or response.
             @since v2.0
          */
          setCookies(cookies: Array<ServiceSessionCookie>) {
               this.cookies = cookies;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ServiceSession.
             @return {Adaptive.ServiceSession} Wrapped object instance.
          */
          static toObject(object : any) : ServiceSession {
               var result : ServiceSession = new ServiceSession(null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.cookies = ServiceSessionCookie.toObjectArray(object.cookies);
                    result.attributes = ServiceSessionAttribute.toObjectArray(object.attributes);

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ServiceSession[].
             @return {Adaptive.ServiceSession[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : ServiceSession[] {
               var resultArray : Array<ServiceSession> = new Array<ServiceSession>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(ServiceSession.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.ServiceSessionCookie
        @extends Adaptive.APIBean
        Structure representing the cookieValue of a http cookie.

        @author Aryslan
        @since v2.0
        @version 1.0
     */
     export class ServiceSessionCookie extends APIBean {
          /**
             @property {string} cookieName
             Name ot the cookie.
          */
          cookieName : string;

          /**
             @property {string} cookieName
             Name ot the cookie. The 'cookieNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'cookieName'.
          */
          get cookieNameProperty() : string {
               return this.cookieName;
          }

          set cookieNameProperty(cookieName:string) {
               this.cookieName = cookieName;
          }

          /**
             @property {string} cookieValue
             Value of the ServiceCookie.
          */
          cookieValue : string;

          /**
             @property {string} cookieValue
             Value of the ServiceCookie. The 'cookieValueProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'cookieValue'.
          */
          get cookieValueProperty() : string {
               return this.cookieValue;
          }

          set cookieValueProperty(cookieValue:string) {
               this.cookieValue = cookieValue;
          }

          /**
             @property {number} creation
             ServiceCookie creation timestamp in milliseconds.
          */
          creation : number;

          /**
             @property {number} creation
             ServiceCookie creation timestamp in milliseconds. The 'creationProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'creation'.
          */
          get creationProperty() : number {
               return this.creation;
          }

          set creationProperty(creation:number) {
               this.creation = creation;
          }

          /**
             @property {string} domain
             Domain for which the cookie is valid.
          */
          domain : string;

          /**
             @property {string} domain
             Domain for which the cookie is valid. The 'domainProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'domain'.
          */
          get domainProperty() : string {
               return this.domain;
          }

          set domainProperty(domain:string) {
               this.domain = domain;
          }

          /**
             @property {number} expiry
             ServiceCookie expiry in milliseconds or -1 for session only.
          */
          expiry : number;

          /**
             @property {number} expiry
             ServiceCookie expiry in milliseconds or -1 for session only. The 'expiryProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'expiry'.
          */
          get expiryProperty() : number {
               return this.expiry;
          }

          set expiryProperty(expiry:number) {
               this.expiry = expiry;
          }

          /**
             @property {string} path
             URI path for which the cookie is valid.
          */
          path : string;

          /**
             @property {string} path
             URI path for which the cookie is valid. The 'pathProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'path'.
          */
          get pathProperty() : string {
               return this.path;
          }

          set pathProperty(path:string) {
               this.path = path;
          }

          /**
             @property {string} scheme
             Scheme of the domain - http/https - for which the cookie is valid.
          */
          scheme : string;

          /**
             @property {string} scheme
             Scheme of the domain - http/https - for which the cookie is valid. The 'schemeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'scheme'.
          */
          get schemeProperty() : string {
               return this.scheme;
          }

          set schemeProperty(scheme:string) {
               this.scheme = scheme;
          }

          /**
             @property {boolean} secure
             ServiceCookie is secure (https only).
          */
          secure : boolean;

          /**
             @property {boolean} secure
             ServiceCookie is secure (https only). The 'secureProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'secure'.
          */
          get secureProperty() : boolean {
               return this.secure;
          }

          set secureProperty(secure:boolean) {
               this.secure = secure;
          }

          /**
             @method constructor
             Constructor used by the implementation

             @param {string} cookieName  Name of the cookie
             @param {string} cookieValue Value of the cookie
             @since v2.0
          */
          constructor(cookieName: string, cookieValue: string) {
               super();
               this.cookieName = cookieName;
               this.cookieValue = cookieValue;
          }
          /**
             @method
             Returns the cookie cookieName

             @return {string} cookieName Name of the cookie
             @since v2.0
          */
          getCookieName() : string {
               return this.cookieName;
          }

          /**
             @method
             Set the cookie cookieName

             @param {string} cookieName Name of the cookie
             @since v2.0
          */
          setCookieName(cookieName: string) {
               this.cookieName = cookieName;
          }

          /**
             @method
             Returns the cookie cookieValue

             @return {string} Value of the cookie
             @since v2.0
          */
          getCookieValue() : string {
               return this.cookieValue;
          }

          /**
             @method
             Set the cookie cookieValue

             @param {string} cookieValue Value of the cookie
             @since v2.0
          */
          setCookieValue(cookieValue: string) {
               this.cookieValue = cookieValue;
          }

          /**
             @method
             Returns the creation date

             @return {number} Creation date of the cookie
             @since v2.0
          */
          getCreation() : number {
               return this.creation;
          }

          /**
             @method
             Sets the creation date

             @param {number} creation Creation date of the cookie
             @since v2.0
          */
          setCreation(creation: number) {
               this.creation = creation;
          }

          /**
             @method
             Returns the domain

             @return {string} domain
             @since v2.0
          */
          getDomain() : string {
               return this.domain;
          }

          /**
             @method
             Set the domain

             @param {string} domain Domain of the cookie
             @since v2.0
          */
          setDomain(domain: string) {
               this.domain = domain;
          }

          /**
             @method
             Returns the expiration date in milis

             @return {number} expiry
             @since v2.0
          */
          getExpiry() : number {
               return this.expiry;
          }

          /**
             @method
             Set the expiration date in milis

             @param {number} expiry Expiration date of the cookie
             @since v2.0
          */
          setExpiry(expiry: number) {
               this.expiry = expiry;
          }

          /**
             @method
             Returns the path

             @return {string} path
             @since v2.0
          */
          getPath() : string {
               return this.path;
          }

          /**
             @method
             Set the path

             @param {string} path Path of the cookie
             @since v2.0
          */
          setPath(path: string) {
               this.path = path;
          }

          /**
             @method
             Returns the scheme

             @return {string} scheme
             @since v2.0
          */
          getScheme() : string {
               return this.scheme;
          }

          /**
             @method
             Set the scheme

             @param {string} scheme Scheme of the cookie
             @since v2.0
          */
          setScheme(scheme: string) {
               this.scheme = scheme;
          }

          /**
             @method
             Returns whether the cookie is secure or not

             @return {boolean} true if the cookie is secure; false otherwise
             @since v2.0
          */
          getSecure() : boolean {
               return this.secure;
          }

          /**
             @method
             Set whether the cookie is secure or not

             @param {boolean} secure Privacy of the cookie
             @since v2.0
          */
          setSecure(secure: boolean) {
               this.secure = secure;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ServiceSessionCookie.
             @return {Adaptive.ServiceSessionCookie} Wrapped object instance.
          */
          static toObject(object : any) : ServiceSessionCookie {
               var result : ServiceSessionCookie = new ServiceSessionCookie(null, null);

               if (object != null ) {
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
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ServiceSessionCookie[].
             @return {Adaptive.ServiceSessionCookie[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : ServiceSessionCookie[] {
               var resultArray : Array<ServiceSessionCookie> = new Array<ServiceSessionCookie>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(ServiceSessionCookie.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.ServiceToken
        @extends Adaptive.APIBean
        Object representing a specific service, path, function and invocation method for accessing external services.

        @author Carlos Lozano Diez
        @since v2.0.6
        @version 1.0
     */
     export class ServiceToken extends APIBean {
          /**
             @property {Adaptive.IServiceMethod} invocationMethod
             Http method to be used by the invocation - this is typically GET or POST albeit the platform may support
other invocation methods. This is also defined per function of each endpoint in the platform's XML file.
          */
          invocationMethod : IServiceMethod;

          /**
             @property {Adaptive.IServiceMethod} invocationMethod
             Http method to be used by the invocation - this is typically GET or POST albeit the platform may support
other invocation methods. This is also defined per function of each endpoint in the platform's XML file. The 'invocationMethodProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'invocationMethod'.
          */
          get invocationMethodProperty() : IServiceMethod {
               return this.invocationMethod;
          }

          set invocationMethodProperty(invocationMethod:IServiceMethod) {
               this.invocationMethod = invocationMethod;
          }

          /**
             @property {string} endpointName
             Name of the endpoint configured in the platform's services XML file. This is a reference to a specific schema,
host and port combination for a given service.
          */
          endpointName : string;

          /**
             @property {string} endpointName
             Name of the endpoint configured in the platform's services XML file. This is a reference to a specific schema,
host and port combination for a given service. The 'endpointNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'endpointName'.
          */
          get endpointNameProperty() : string {
               return this.endpointName;
          }

          set endpointNameProperty(endpointName:string) {
               this.endpointName = endpointName;
          }

          /**
             @property {string} functionName
             Name of the function configured in the platform's services XML file for a specific endpoint. This is a reference
to a relative path of a function published on a remote service.
          */
          functionName : string;

          /**
             @property {string} functionName
             Name of the function configured in the platform's services XML file for a specific endpoint. This is a reference
to a relative path of a function published on a remote service. The 'functionNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'functionName'.
          */
          get functionNameProperty() : string {
               return this.functionName;
          }

          set functionNameProperty(functionName:string) {
               this.functionName = functionName;
          }

          /**
             @property {string} serviceName
             Name of the service configured in the platform's services XML file.
          */
          serviceName : string;

          /**
             @property {string} serviceName
             Name of the service configured in the platform's services XML file. The 'serviceNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'serviceName'.
          */
          get serviceNameProperty() : string {
               return this.serviceName;
          }

          set serviceNameProperty(serviceName:string) {
               this.serviceName = serviceName;
          }

          /**
             @method constructor
             Convenience constructor.

             @param {string} serviceName      Name of the configured service.
             @param {string} endpointName     Name of the endpoint configured for the service.
             @param {string} functionName     Name of the function configured for the endpoint.
             @param {Adaptive.IServiceMethod} invocationMethod Method type configured for the function.
             @since v2.0.6
          */
          constructor(serviceName: string, endpointName: string, functionName: string, invocationMethod: IServiceMethod) {
               super();
               this.serviceName = serviceName;
               this.endpointName = endpointName;
               this.functionName = functionName;
               this.invocationMethod = invocationMethod;
          }
          /**
             @method
             Get token's invocation method type.

             @return {Adaptive.IServiceMethod} Invocation method type.
             @since v2.0.6
          */
          getInvocationMethod() : IServiceMethod {
               return this.invocationMethod;
          }

          /**
             @method
             Sets the invocation method type.

             @param {Adaptive.IServiceMethod} invocationMethod Method type.
             @since v2.0.6
          */
          setInvocationMethod(invocationMethod: IServiceMethod) {
               this.invocationMethod = invocationMethod;
          }

          /**
             @method
             Get token's endpoint name.

             @return {string} Endpoint name.
             @since v2.0.6
          */
          getEndpointName() : string {
               return this.endpointName;
          }

          /**
             @method
             Set the endpoint name.

             @param {string} endpointName Endpoint name.
             @since v2.0.6
          */
          setEndpointName(endpointName: string) {
               this.endpointName = endpointName;
          }

          /**
             @method
             Get token's function name.

             @return {string} Function name.
             @since v2.0.6
          */
          getFunctionName() : string {
               return this.functionName;
          }

          /**
             @method
             Sets the function name.

             @param {string} functionName Function name.
             @since v2.0.6
          */
          setFunctionName(functionName: string) {
               this.functionName = functionName;
          }

          /**
             @method
             Get token's service name.

             @return {string} Service name.
             @since v2.0.6
          */
          getServiceName() : string {
               return this.serviceName;
          }

          /**
             @method
             Sets token's service name.

             @param {string} serviceName Service name.
             @since v2.0.6
          */
          setServiceName(serviceName: string) {
               this.serviceName = serviceName;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ServiceToken.
             @return {Adaptive.ServiceToken} Wrapped object instance.
          */
          static toObject(object : any) : ServiceToken {
               var result : ServiceToken = new ServiceToken(null, null, null, null);

               if (object != null ) {
                    // Assign values to bean fields.
                    result.serviceName = object.serviceName;
                    result.endpointName = object.endpointName;
                    result.functionName = object.functionName;
                    result.invocationMethod = IServiceMethod.toObject(object.invocationMethod);

               }
               return result;
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.ServiceToken[].
             @return {Adaptive.ServiceToken[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : ServiceToken[] {
               var resultArray : Array<ServiceToken> = new Array<ServiceToken>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(ServiceToken.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.Contact
        @extends Adaptive.ContactUid
        Structure representing the data elements of a contact.

        @author Francisco Javier Martin Bueno
        @since v2.0
        @version 1.0
     */
     export class Contact extends ContactUid {
          /**
             @property {Adaptive.ContactAddress[]} contactAddresses
             The adresses from the contact
          */
          contactAddresses : Array<ContactAddress>;

          /**
             @property {Adaptive.ContactAddress[]} contactAddresses
             The adresses from the contact The 'contactAddressesProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactAddresses'.
          */
          get contactAddressesProperty() : Array<ContactAddress> {
               return this.contactAddresses;
          }

          set contactAddressesProperty(contactAddresses:Array<ContactAddress>) {
               this.contactAddresses = contactAddresses;
          }

          /**
             @property {Adaptive.ContactEmail[]} contactEmails
             The emails from the contact
          */
          contactEmails : Array<ContactEmail>;

          /**
             @property {Adaptive.ContactEmail[]} contactEmails
             The emails from the contact The 'contactEmailsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactEmails'.
          */
          get contactEmailsProperty() : Array<ContactEmail> {
               return this.contactEmails;
          }

          set contactEmailsProperty(contactEmails:Array<ContactEmail>) {
               this.contactEmails = contactEmails;
          }

          /**
             @property {Adaptive.ContactPhone[]} contactPhones
             The phones from the contact
          */
          contactPhones : Array<ContactPhone>;

          /**
             @property {Adaptive.ContactPhone[]} contactPhones
             The phones from the contact The 'contactPhonesProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactPhones'.
          */
          get contactPhonesProperty() : Array<ContactPhone> {
               return this.contactPhones;
          }

          set contactPhonesProperty(contactPhones:Array<ContactPhone>) {
               this.contactPhones = contactPhones;
          }

          /**
             @property {Adaptive.ContactSocial[]} contactSocials
             The social network info from the contact
          */
          contactSocials : Array<ContactSocial>;

          /**
             @property {Adaptive.ContactSocial[]} contactSocials
             The social network info from the contact The 'contactSocialsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactSocials'.
          */
          get contactSocialsProperty() : Array<ContactSocial> {
               return this.contactSocials;
          }

          set contactSocialsProperty(contactSocials:Array<ContactSocial>) {
               this.contactSocials = contactSocials;
          }

          /**
             @property {Adaptive.ContactTag[]} contactTags
             The aditional tags from the contact
          */
          contactTags : Array<ContactTag>;

          /**
             @property {Adaptive.ContactTag[]} contactTags
             The aditional tags from the contact The 'contactTagsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactTags'.
          */
          get contactTagsProperty() : Array<ContactTag> {
               return this.contactTags;
          }

          set contactTagsProperty(contactTags:Array<ContactTag>) {
               this.contactTags = contactTags;
          }

          /**
             @property {Adaptive.ContactWebsite[]} contactWebsites
             The websites from the contact
          */
          contactWebsites : Array<ContactWebsite>;

          /**
             @property {Adaptive.ContactWebsite[]} contactWebsites
             The websites from the contact The 'contactWebsitesProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactWebsites'.
          */
          get contactWebsitesProperty() : Array<ContactWebsite> {
               return this.contactWebsites;
          }

          set contactWebsitesProperty(contactWebsites:Array<ContactWebsite>) {
               this.contactWebsites = contactWebsites;
          }

          /**
             @property {Adaptive.ContactPersonalInfo} personalInfo
             The personal info from the contact
          */
          personalInfo : ContactPersonalInfo;

          /**
             @property {Adaptive.ContactPersonalInfo} personalInfo
             The personal info from the contact The 'personalInfoProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'personalInfo'.
          */
          get personalInfoProperty() : ContactPersonalInfo {
               return this.personalInfo;
          }

          set personalInfoProperty(personalInfo:ContactPersonalInfo) {
               this.personalInfo = personalInfo;
          }

          /**
             @property {Adaptive.ContactProfessionalInfo} professionalInfo
             The professional info from the contact
          */
          professionalInfo : ContactProfessionalInfo;

          /**
             @property {Adaptive.ContactProfessionalInfo} professionalInfo
             The professional info from the contact The 'professionalInfoProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'professionalInfo'.
          */
          get professionalInfoProperty() : ContactProfessionalInfo {
               return this.professionalInfo;
          }

          set professionalInfoProperty(professionalInfo:ContactProfessionalInfo) {
               this.professionalInfo = professionalInfo;
          }

          /**
             @method constructor
             Constructor used by implementation to set the Contact.

             @param {string} contactId of the Contact
             @since v2.0
          */
          constructor(contactId: string) {
               super(contactId);
          }
          /**
             @method
             Returns all the addresses of the Contact

             @return {Adaptive.ContactAddress[]} ContactAddress[]
             @since v2.0
          */
          getContactAddresses() : Array<ContactAddress> {
               return this.contactAddresses;
          }

          /**
             @method
             Set the addresses of the Contact

             @param {Adaptive.ContactAddress[]} contactAddresses Addresses of the contact
             @since v2.0
          */
          setContactAddresses(contactAddresses: Array<ContactAddress>) {
               this.contactAddresses = contactAddresses;
          }

          /**
             @method
             Returns all the emails of the Contact

             @return {Adaptive.ContactEmail[]} ContactEmail[]
             @since v2.0
          */
          getContactEmails() : Array<ContactEmail> {
               return this.contactEmails;
          }

          /**
             @method
             Set the emails of the Contact

             @param {Adaptive.ContactEmail[]} contactEmails Emails of the contact
             @since v2.0
          */
          setContactEmails(contactEmails: Array<ContactEmail>) {
               this.contactEmails = contactEmails;
          }

          /**
             @method
             Returns all the phones of the Contact

             @return {Adaptive.ContactPhone[]} ContactPhone[]
             @since v2.0
          */
          getContactPhones() : Array<ContactPhone> {
               return this.contactPhones;
          }

          /**
             @method
             Set the phones of the Contact

             @param {Adaptive.ContactPhone[]} contactPhones Phones of the contact
             @since v2.0
          */
          setContactPhones(contactPhones: Array<ContactPhone>) {
               this.contactPhones = contactPhones;
          }

          /**
             @method
             Returns all the social network info of the Contact

             @return {Adaptive.ContactSocial[]} ContactSocial[]
             @since v2.0
          */
          getContactSocials() : Array<ContactSocial> {
               return this.contactSocials;
          }

          /**
             @method
             Set the social network info of the Contact

             @param {Adaptive.ContactSocial[]} contactSocials Social Networks of the contact
             @since v2.0
          */
          setContactSocials(contactSocials: Array<ContactSocial>) {
               this.contactSocials = contactSocials;
          }

          /**
             @method
             Returns the additional tags of the Contact

             @return {Adaptive.ContactTag[]} ContactTag[]
             @since v2.0
          */
          getContactTags() : Array<ContactTag> {
               return this.contactTags;
          }

          /**
             @method
             Set the additional tags of the Contact

             @param {Adaptive.ContactTag[]} contactTags Tags of the contact
             @since v2.0
          */
          setContactTags(contactTags: Array<ContactTag>) {
               this.contactTags = contactTags;
          }

          /**
             @method
             Returns all the websites of the Contact

             @return {Adaptive.ContactWebsite[]} ContactWebsite[]
             @since v2.0
          */
          getContactWebsites() : Array<ContactWebsite> {
               return this.contactWebsites;
          }

          /**
             @method
             Set the websites of the Contact

             @param {Adaptive.ContactWebsite[]} contactWebsites Websites of the contact
             @since v2.0
          */
          setContactWebsites(contactWebsites: Array<ContactWebsite>) {
               this.contactWebsites = contactWebsites;
          }

          /**
             @method
             Returns the personal info of the Contact

             @return {Adaptive.ContactPersonalInfo} ContactPersonalInfo of the Contact
             @since v2.0
          */
          getPersonalInfo() : ContactPersonalInfo {
               return this.personalInfo;
          }

          /**
             @method
             Set the personal info of the Contact

             @param {Adaptive.ContactPersonalInfo} personalInfo Personal Information
             @since v2.0
          */
          setPersonalInfo(personalInfo: ContactPersonalInfo) {
               this.personalInfo = personalInfo;
          }

          /**
             @method
             Returns the professional info of the Contact

             @return {Adaptive.ContactProfessionalInfo} Array of personal info
             @since v2.0
          */
          getProfessionalInfo() : ContactProfessionalInfo {
               return this.professionalInfo;
          }

          /**
             @method
             Set the professional info of the Contact

             @param {Adaptive.ContactProfessionalInfo} professionalInfo Professional Information
             @since v2.0
          */
          setProfessionalInfo(professionalInfo: ContactProfessionalInfo) {
               this.professionalInfo = professionalInfo;
          }

          /**
             @method
             @static
             Convert JSON parsed object to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.Contact.
             @return {Adaptive.Contact} Wrapped object instance.
          */
          static toObject(object : any) : Contact {
               var result : Contact = new Contact(null);

               if (object != null ) {
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
          }

          /**
             @method
             @static
             Convert JSON parsed object array to typed equivalent.
             @param {Object} object JSON parsed structure of type Adaptive.Contact[].
             @return {Adaptive.Contact[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : Contact[] {
               var resultArray : Array<Contact> = new Array<Contact>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(Contact.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
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
     /**
        @class Adaptive.ServiceRequestParameter
        @extends Adaptive.KeyValue
        Object representing a request parameter.

        @author Carlos Lozano Diez
        @since 2.0.6
        @version 1.0
     */
     export class ServiceRequestParameter extends KeyValue {
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
             @param {Object} object JSON parsed structure of type Adaptive.ServiceRequestParameter.
             @return {Adaptive.ServiceRequestParameter} Wrapped object instance.
          */
          static toObject(object : any) : ServiceRequestParameter {
               var result : ServiceRequestParameter = new ServiceRequestParameter(null, null);

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
             @param {Object} object JSON parsed structure of type Adaptive.ServiceRequestParameter[].
             @return {Adaptive.ServiceRequestParameter[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : ServiceRequestParameter[] {
               var resultArray : Array<ServiceRequestParameter> = new Array<ServiceRequestParameter>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(ServiceRequestParameter.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.ServiceSessionAttribute
        @extends Adaptive.KeyValue
        Object representing a service session attribute.

        @author Carlos Lozano Diez
        @since 2.0.6
        @version 1.0
     */
     export class ServiceSessionAttribute extends KeyValue {
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
             @param {Object} object JSON parsed structure of type Adaptive.ServiceSessionAttribute.
             @return {Adaptive.ServiceSessionAttribute} Wrapped object instance.
          */
          static toObject(object : any) : ServiceSessionAttribute {
               var result : ServiceSessionAttribute = new ServiceSessionAttribute(null, null);

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
             @param {Object} object JSON parsed structure of type Adaptive.ServiceSessionAttribute[].
             @return {Adaptive.ServiceSessionAttribute[]} Wrapped object array instance.
          */
          static toObjectArray(object : any) : ServiceSessionAttribute[] {
               var resultArray : Array<ServiceSessionAttribute> = new Array<ServiceSessionAttribute>();
               if (object != null) {
                    for (var i = 0; i < object.length; i++) {
                         resultArray.push(ServiceSessionAttribute.toObject(object[i]));
                    }
               }
               return resultArray;
          }
     }
     /**
        @class Adaptive.BaseListener
     */
     export class BaseListener implements IBaseListener {

          /**
             @property {number}
             Unique id of listener.
          */
          id : number;

          /**
             @property {Adaptive.IAdaptiveRPGroup}
             Group of API.
          */
          apiGroup : IAdaptiveRPGroup;

          /**
             @method constructor
             Constructor with listener id.

             @param {number} id  The id of the listener.
          */
          constructor(id : number) {
               this.id = id;
               this.apiGroup = IAdaptiveRPGroup.Application;
          }

          /**
             @method
             @return {Adaptive.IAdaptiveRPGroup}
             Return the API group for the given interface.
          */
          getAPIGroup() : IAdaptiveRPGroup {
               return this.apiGroup;
          }

          /**
             @method
             Return the API version for the given interface.

             @return {string}
             The version of the API.
          */
          getAPIVersion() : string {
               return "v2.2.0"
          }

          /**
             @method
             Return the unique listener identifier. This is used to check if two listeners are the same
in every platform. This id is populated by the Javascript platform
             @return {number} 
             Unique Listener identifier
          */
          public getId() : number {
               return this.id;
          }

     }

     /**
        @property {Adaptive.Dictionary} registeredAccelerationListener
        @member Adaptive
        @private
        AccelerationListener control dictionary.
     */
     export var registeredAccelerationListener = new Dictionary<IAccelerationListener>([]);

        // AccelerationListener global listener handlers.

     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.IAccelerationListenerError} error
     */
     export function handleAccelerationListenerError(id : number, error : IAccelerationListenerError) : void {
          var listener : IAccelerationListener = registeredAccelerationListener[""+id];
          if (typeof listener === 'undefined' || listener == null) {
               console.error("ERROR: No listener with id "+id+" registered in registeredAccelerationListener dictionary.");
          } else {
               listener.onError(error);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.Acceleration} acceleration
     */
     export function handleAccelerationListenerResult(id : number, acceleration : Acceleration) : void {
          var listener : IAccelerationListener = registeredAccelerationListener[""+id];
          if (typeof listener === 'undefined' || listener == null) {
               console.error("ERROR: No listener with id "+id+" registered in registeredAccelerationListener dictionary.");
          } else {
               listener.onResult(acceleration);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.Acceleration} acceleration
        @param {Adaptive.IAccelerationListenerWarning} warning
     */
     export function handleAccelerationListenerWarning(id : number, acceleration : Acceleration, warning : IAccelerationListenerWarning) : void {
          var listener : IAccelerationListener = registeredAccelerationListener[""+id];
          if (typeof listener === 'undefined' || listener == null) {
               console.error("ERROR: No listener with id "+id+" registered in registeredAccelerationListener dictionary.");
          } else {
               listener.onWarning(acceleration, warning);
          }
     }

     /**
        @class Adaptive.AccelerationListener
        @extends Adaptive.BaseListener
     */
     export class AccelerationListener extends BaseListener implements IAccelerationListener {

          /**
             @private
             @property
          */
          onErrorFunction : (error : IAccelerationListenerError) => void;
          /**
             @private
             @property
          */
          onResultFunction : (acceleration : Acceleration) => void;
          /**
             @private
             @property
          */
          onWarningFunction : (acceleration : Acceleration, warning : IAccelerationListenerWarning) => void;

          /**
             @method constructor
             Constructor with anonymous handler functions for listener.

             @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IAccelerationListenerError
             @param {Function} onResultFunction Function receiving parameters of type: Adaptive.Acceleration
             @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.Acceleration, Adaptive.IAccelerationListenerWarning
          */
          constructor(onErrorFunction : (error : IAccelerationListenerError) => void, onResultFunction : (acceleration : Acceleration) => void, onWarningFunction : (acceleration : Acceleration, warning : IAccelerationListenerWarning) => void) {
               super(++registeredCounter);
               if (onErrorFunction == null) {
                    console.error("ERROR: AccelerationListener onErrorFunction is not defined.");
               } else {
                    this.onErrorFunction = onErrorFunction;
               }
               if (onResultFunction == null) {
                    console.error("ERROR: AccelerationListener onResultFunction is not defined.");
               } else {
                    this.onResultFunction = onResultFunction;
               }
               if (onWarningFunction == null) {
                    console.error("ERROR: AccelerationListener onWarningFunction is not defined.");
               } else {
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
          public onError(error : IAccelerationListenerError) : void {
               if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                    console.warn("WARNING: AccelerationListener contains a null reference to onErrorFunction.");
               } else {
                    this.onErrorFunction(error);
               }
          }

          /**
             @method
             Correct data received.
             @param {Adaptive.Acceleration} acceleration acceleration Acceleration received
             @since v2.0
          */
          public onResult(acceleration : Acceleration) : void {
               if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                    console.warn("WARNING: AccelerationListener contains a null reference to onResultFunction.");
               } else {
                    this.onResultFunction(acceleration);
               }
          }

          /**
             @method
             Data received with warning - ie. Needs calibration.
             @param {Adaptive.Acceleration} acceleration acceleration Acceleration received
             @param {Adaptive.IAccelerationListenerWarning} warning warning      Warning fired
             @since v2.0
          */
          public onWarning(acceleration : Acceleration, warning : IAccelerationListenerWarning) : void {
               if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                    console.warn("WARNING: AccelerationListener contains a null reference to onWarningFunction.");
               } else {
                    this.onWarningFunction(acceleration, warning);
               }
          }

     }

     /**
        @property {Adaptive.Dictionary} registeredButtonListener
        @member Adaptive
        @private
        ButtonListener control dictionary.
     */
     export var registeredButtonListener = new Dictionary<IButtonListener>([]);

        // ButtonListener global listener handlers.

     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.IButtonListenerError} error
     */
     export function handleButtonListenerError(id : number, error : IButtonListenerError) : void {
          var listener : IButtonListener = registeredButtonListener[""+id];
          if (typeof listener === 'undefined' || listener == null) {
               console.error("ERROR: No listener with id "+id+" registered in registeredButtonListener dictionary.");
          } else {
               listener.onError(error);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.Button} button
     */
     export function handleButtonListenerResult(id : number, button : Button) : void {
          var listener : IButtonListener = registeredButtonListener[""+id];
          if (typeof listener === 'undefined' || listener == null) {
               console.error("ERROR: No listener with id "+id+" registered in registeredButtonListener dictionary.");
          } else {
               listener.onResult(button);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.Button} button
        @param {Adaptive.IButtonListenerWarning} warning
     */
     export function handleButtonListenerWarning(id : number, button : Button, warning : IButtonListenerWarning) : void {
          var listener : IButtonListener = registeredButtonListener[""+id];
          if (typeof listener === 'undefined' || listener == null) {
               console.error("ERROR: No listener with id "+id+" registered in registeredButtonListener dictionary.");
          } else {
               listener.onWarning(button, warning);
          }
     }

     /**
        @class Adaptive.ButtonListener
        @extends Adaptive.BaseListener
     */
     export class ButtonListener extends BaseListener implements IButtonListener {

          /**
             @private
             @property
          */
          onErrorFunction : (error : IButtonListenerError) => void;
          /**
             @private
             @property
          */
          onResultFunction : (button : Button) => void;
          /**
             @private
             @property
          */
          onWarningFunction : (button : Button, warning : IButtonListenerWarning) => void;

          /**
             @method constructor
             Constructor with anonymous handler functions for listener.

             @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IButtonListenerError
             @param {Function} onResultFunction Function receiving parameters of type: Adaptive.Button
             @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.Button, Adaptive.IButtonListenerWarning
          */
          constructor(onErrorFunction : (error : IButtonListenerError) => void, onResultFunction : (button : Button) => void, onWarningFunction : (button : Button, warning : IButtonListenerWarning) => void) {
               super(++registeredCounter);
               if (onErrorFunction == null) {
                    console.error("ERROR: ButtonListener onErrorFunction is not defined.");
               } else {
                    this.onErrorFunction = onErrorFunction;
               }
               if (onResultFunction == null) {
                    console.error("ERROR: ButtonListener onResultFunction is not defined.");
               } else {
                    this.onResultFunction = onResultFunction;
               }
               if (onWarningFunction == null) {
                    console.error("ERROR: ButtonListener onWarningFunction is not defined.");
               } else {
                    this.onWarningFunction = onWarningFunction;
               }
          }

          /**
             @method
             No data received
             @param {Adaptive.IButtonListenerError} error error occurred
             @since v2.0
          */
          public onError(error : IButtonListenerError) : void {
               if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                    console.warn("WARNING: ButtonListener contains a null reference to onErrorFunction.");
               } else {
                    this.onErrorFunction(error);
               }
          }

          /**
             @method
             Called on button pressed
             @param {Adaptive.Button} button button pressed
             @since v2.0
          */
          public onResult(button : Button) : void {
               if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                    console.warn("WARNING: ButtonListener contains a null reference to onResultFunction.");
               } else {
                    this.onResultFunction(button);
               }
          }

          /**
             @method
             Data received with warning
             @param {Adaptive.Button} button button  pressed
             @param {Adaptive.IButtonListenerWarning} warning warning happened
             @since v2.0
          */
          public onWarning(button : Button, warning : IButtonListenerWarning) : void {
               if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                    console.warn("WARNING: ButtonListener contains a null reference to onWarningFunction.");
               } else {
                    this.onWarningFunction(button, warning);
               }
          }

     }

     /**
        @property {Adaptive.Dictionary} registeredDeviceOrientationListener
        @member Adaptive
        @private
        DeviceOrientationListener control dictionary.
     */
     export var registeredDeviceOrientationListener = new Dictionary<IDeviceOrientationListener>([]);

        // DeviceOrientationListener global listener handlers.

     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.IDeviceOrientationListenerError} error
     */
     export function handleDeviceOrientationListenerError(id : number, error : IDeviceOrientationListenerError) : void {
          var listener : IDeviceOrientationListener = registeredDeviceOrientationListener[""+id];
          if (typeof listener === 'undefined' || listener == null) {
               console.error("ERROR: No listener with id "+id+" registered in registeredDeviceOrientationListener dictionary.");
          } else {
               listener.onError(error);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.RotationEvent} rotationEvent
     */
     export function handleDeviceOrientationListenerResult(id : number, rotationEvent : RotationEvent) : void {
          var listener : IDeviceOrientationListener = registeredDeviceOrientationListener[""+id];
          if (typeof listener === 'undefined' || listener == null) {
               console.error("ERROR: No listener with id "+id+" registered in registeredDeviceOrientationListener dictionary.");
          } else {
               listener.onResult(rotationEvent);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.RotationEvent} rotationEvent
        @param {Adaptive.IDeviceOrientationListenerWarning} warning
     */
     export function handleDeviceOrientationListenerWarning(id : number, rotationEvent : RotationEvent, warning : IDeviceOrientationListenerWarning) : void {
          var listener : IDeviceOrientationListener = registeredDeviceOrientationListener[""+id];
          if (typeof listener === 'undefined' || listener == null) {
               console.error("ERROR: No listener with id "+id+" registered in registeredDeviceOrientationListener dictionary.");
          } else {
               listener.onWarning(rotationEvent, warning);
          }
     }

     /**
        @class Adaptive.DeviceOrientationListener
        @extends Adaptive.BaseListener
     */
     export class DeviceOrientationListener extends BaseListener implements IDeviceOrientationListener {

          /**
             @private
             @property
          */
          onErrorFunction : (error : IDeviceOrientationListenerError) => void;
          /**
             @private
             @property
          */
          onResultFunction : (rotationEvent : RotationEvent) => void;
          /**
             @private
             @property
          */
          onWarningFunction : (rotationEvent : RotationEvent, warning : IDeviceOrientationListenerWarning) => void;

          /**
             @method constructor
             Constructor with anonymous handler functions for listener.

             @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IDeviceOrientationListenerError
             @param {Function} onResultFunction Function receiving parameters of type: Adaptive.RotationEvent
             @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.RotationEvent, Adaptive.IDeviceOrientationListenerWarning
          */
          constructor(onErrorFunction : (error : IDeviceOrientationListenerError) => void, onResultFunction : (rotationEvent : RotationEvent) => void, onWarningFunction : (rotationEvent : RotationEvent, warning : IDeviceOrientationListenerWarning) => void) {
               super(++registeredCounter);
               if (onErrorFunction == null) {
                    console.error("ERROR: DeviceOrientationListener onErrorFunction is not defined.");
               } else {
                    this.onErrorFunction = onErrorFunction;
               }
               if (onResultFunction == null) {
                    console.error("ERROR: DeviceOrientationListener onResultFunction is not defined.");
               } else {
                    this.onResultFunction = onResultFunction;
               }
               if (onWarningFunction == null) {
                    console.error("ERROR: DeviceOrientationListener onWarningFunction is not defined.");
               } else {
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
          public onError(error : IDeviceOrientationListenerError) : void {
               if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                    console.warn("WARNING: DeviceOrientationListener contains a null reference to onErrorFunction.");
               } else {
                    this.onErrorFunction(error);
               }
          }

          /**
             @method
             Event fired with the successful start and finish of a rotation.
             @param {Adaptive.RotationEvent} rotationEvent rotationEvent RotationEvent containing origin, destination and state of the event.
             @since v2.0.5
          */
          public onResult(rotationEvent : RotationEvent) : void {
               if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                    console.warn("WARNING: DeviceOrientationListener contains a null reference to onResultFunction.");
               } else {
                    this.onResultFunction(rotationEvent);
               }
          }

          /**
             @method
             Event fired with a warning when the rotation is aborted. In specific, this
event may be fired if the devices vetoes the rotation before rotation is completed.
             @param {Adaptive.RotationEvent} rotationEvent rotationEvent   RotationEvent containing origin, destination and state of the event.
             @param {Adaptive.IDeviceOrientationListenerWarning} warning warning Type of condition that aborted rotation execution.
             @since v2.0.5
          */
          public onWarning(rotationEvent : RotationEvent, warning : IDeviceOrientationListenerWarning) : void {
               if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                    console.warn("WARNING: DeviceOrientationListener contains a null reference to onWarningFunction.");
               } else {
                    this.onWarningFunction(rotationEvent, warning);
               }
          }

     }

     /**
        @property {Adaptive.Dictionary} registeredDisplayOrientationListener
        @member Adaptive
        @private
        DisplayOrientationListener control dictionary.
     */
     export var registeredDisplayOrientationListener = new Dictionary<IDisplayOrientationListener>([]);

        // DisplayOrientationListener global listener handlers.

     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.IDisplayOrientationListenerError} error
     */
     export function handleDisplayOrientationListenerError(id : number, error : IDisplayOrientationListenerError) : void {
          var listener : IDisplayOrientationListener = registeredDisplayOrientationListener[""+id];
          if (typeof listener === 'undefined' || listener == null) {
               console.error("ERROR: No listener with id "+id+" registered in registeredDisplayOrientationListener dictionary.");
          } else {
               listener.onError(error);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.RotationEvent} rotationEvent
     */
     export function handleDisplayOrientationListenerResult(id : number, rotationEvent : RotationEvent) : void {
          var listener : IDisplayOrientationListener = registeredDisplayOrientationListener[""+id];
          if (typeof listener === 'undefined' || listener == null) {
               console.error("ERROR: No listener with id "+id+" registered in registeredDisplayOrientationListener dictionary.");
          } else {
               listener.onResult(rotationEvent);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.RotationEvent} rotationEvent
        @param {Adaptive.IDisplayOrientationListenerWarning} warning
     */
     export function handleDisplayOrientationListenerWarning(id : number, rotationEvent : RotationEvent, warning : IDisplayOrientationListenerWarning) : void {
          var listener : IDisplayOrientationListener = registeredDisplayOrientationListener[""+id];
          if (typeof listener === 'undefined' || listener == null) {
               console.error("ERROR: No listener with id "+id+" registered in registeredDisplayOrientationListener dictionary.");
          } else {
               listener.onWarning(rotationEvent, warning);
          }
     }

     /**
        @class Adaptive.DisplayOrientationListener
        @extends Adaptive.BaseListener
     */
     export class DisplayOrientationListener extends BaseListener implements IDisplayOrientationListener {

          /**
             @private
             @property
          */
          onErrorFunction : (error : IDisplayOrientationListenerError) => void;
          /**
             @private
             @property
          */
          onResultFunction : (rotationEvent : RotationEvent) => void;
          /**
             @private
             @property
          */
          onWarningFunction : (rotationEvent : RotationEvent, warning : IDisplayOrientationListenerWarning) => void;

          /**
             @method constructor
             Constructor with anonymous handler functions for listener.

             @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IDisplayOrientationListenerError
             @param {Function} onResultFunction Function receiving parameters of type: Adaptive.RotationEvent
             @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.RotationEvent, Adaptive.IDisplayOrientationListenerWarning
          */
          constructor(onErrorFunction : (error : IDisplayOrientationListenerError) => void, onResultFunction : (rotationEvent : RotationEvent) => void, onWarningFunction : (rotationEvent : RotationEvent, warning : IDisplayOrientationListenerWarning) => void) {
               super(++registeredCounter);
               if (onErrorFunction == null) {
                    console.error("ERROR: DisplayOrientationListener onErrorFunction is not defined.");
               } else {
                    this.onErrorFunction = onErrorFunction;
               }
               if (onResultFunction == null) {
                    console.error("ERROR: DisplayOrientationListener onResultFunction is not defined.");
               } else {
                    this.onResultFunction = onResultFunction;
               }
               if (onWarningFunction == null) {
                    console.error("ERROR: DisplayOrientationListener onWarningFunction is not defined.");
               } else {
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
          public onError(error : IDisplayOrientationListenerError) : void {
               if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                    console.warn("WARNING: DisplayOrientationListener contains a null reference to onErrorFunction.");
               } else {
                    this.onErrorFunction(error);
               }
          }

          /**
             @method
             Event fired with the successful start and finish of a rotation.
             @param {Adaptive.RotationEvent} rotationEvent rotationEvent RotationEvent containing origin, destination and state of the event.
             @since v2.0.5
          */
          public onResult(rotationEvent : RotationEvent) : void {
               if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                    console.warn("WARNING: DisplayOrientationListener contains a null reference to onResultFunction.");
               } else {
                    this.onResultFunction(rotationEvent);
               }
          }

          /**
             @method
             Event fired with a warning when the rotation is aborted. In specific, this
event may be fired if the application vetoes display rotation before rotation is completed.
             @param {Adaptive.RotationEvent} rotationEvent rotationEvent   RotationEvent containing origin, destination and state of the event.
             @param {Adaptive.IDisplayOrientationListenerWarning} warning warning Type of condition that aborted rotation execution.
             @since v2.0.5
          */
          public onWarning(rotationEvent : RotationEvent, warning : IDisplayOrientationListenerWarning) : void {
               if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                    console.warn("WARNING: DisplayOrientationListener contains a null reference to onWarningFunction.");
               } else {
                    this.onWarningFunction(rotationEvent, warning);
               }
          }

     }

     /**
        @property {Adaptive.Dictionary} registeredGeolocationListener
        @member Adaptive
        @private
        GeolocationListener control dictionary.
     */
     export var registeredGeolocationListener = new Dictionary<IGeolocationListener>([]);

        // GeolocationListener global listener handlers.

     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.IGeolocationListenerError} error
     */
     export function handleGeolocationListenerError(id : number, error : IGeolocationListenerError) : void {
          var listener : IGeolocationListener = registeredGeolocationListener[""+id];
          if (typeof listener === 'undefined' || listener == null) {
               console.error("ERROR: No listener with id "+id+" registered in registeredGeolocationListener dictionary.");
          } else {
               listener.onError(error);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.Geolocation} geolocation
     */
     export function handleGeolocationListenerResult(id : number, geolocation : Geolocation) : void {
          var listener : IGeolocationListener = registeredGeolocationListener[""+id];
          if (typeof listener === 'undefined' || listener == null) {
               console.error("ERROR: No listener with id "+id+" registered in registeredGeolocationListener dictionary.");
          } else {
               listener.onResult(geolocation);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.Geolocation} geolocation
        @param {Adaptive.IGeolocationListenerWarning} warning
     */
     export function handleGeolocationListenerWarning(id : number, geolocation : Geolocation, warning : IGeolocationListenerWarning) : void {
          var listener : IGeolocationListener = registeredGeolocationListener[""+id];
          if (typeof listener === 'undefined' || listener == null) {
               console.error("ERROR: No listener with id "+id+" registered in registeredGeolocationListener dictionary.");
          } else {
               listener.onWarning(geolocation, warning);
          }
     }

     /**
        @class Adaptive.GeolocationListener
        @extends Adaptive.BaseListener
     */
     export class GeolocationListener extends BaseListener implements IGeolocationListener {

          /**
             @private
             @property
          */
          onErrorFunction : (error : IGeolocationListenerError) => void;
          /**
             @private
             @property
          */
          onResultFunction : (geolocation : Geolocation) => void;
          /**
             @private
             @property
          */
          onWarningFunction : (geolocation : Geolocation, warning : IGeolocationListenerWarning) => void;

          /**
             @method constructor
             Constructor with anonymous handler functions for listener.

             @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IGeolocationListenerError
             @param {Function} onResultFunction Function receiving parameters of type: Adaptive.Geolocation
             @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.Geolocation, Adaptive.IGeolocationListenerWarning
          */
          constructor(onErrorFunction : (error : IGeolocationListenerError) => void, onResultFunction : (geolocation : Geolocation) => void, onWarningFunction : (geolocation : Geolocation, warning : IGeolocationListenerWarning) => void) {
               super(++registeredCounter);
               if (onErrorFunction == null) {
                    console.error("ERROR: GeolocationListener onErrorFunction is not defined.");
               } else {
                    this.onErrorFunction = onErrorFunction;
               }
               if (onResultFunction == null) {
                    console.error("ERROR: GeolocationListener onResultFunction is not defined.");
               } else {
                    this.onResultFunction = onResultFunction;
               }
               if (onWarningFunction == null) {
                    console.error("ERROR: GeolocationListener onWarningFunction is not defined.");
               } else {
                    this.onWarningFunction = onWarningFunction;
               }
          }

          /**
             @method
             No data received - error condition, not authorized or hardware not available.
             @param {Adaptive.IGeolocationListenerError} error error Type of error encountered during reading.
             @since v2.0
          */
          public onError(error : IGeolocationListenerError) : void {
               if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                    console.warn("WARNING: GeolocationListener contains a null reference to onErrorFunction.");
               } else {
                    this.onErrorFunction(error);
               }
          }

          /**
             @method
             Correct data received.
             @param {Adaptive.Geolocation} geolocation geolocation Geolocation Bean
             @since v2.0
          */
          public onResult(geolocation : Geolocation) : void {
               if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                    console.warn("WARNING: GeolocationListener contains a null reference to onResultFunction.");
               } else {
                    this.onResultFunction(geolocation);
               }
          }

          /**
             @method
             Data received with warning - ie. HighDoP
             @param {Adaptive.Geolocation} geolocation geolocation Geolocation Bean
             @param {Adaptive.IGeolocationListenerWarning} warning warning     Type of warning encountered during reading.
             @since v2.0
          */
          public onWarning(geolocation : Geolocation, warning : IGeolocationListenerWarning) : void {
               if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                    console.warn("WARNING: GeolocationListener contains a null reference to onWarningFunction.");
               } else {
                    this.onWarningFunction(geolocation, warning);
               }
          }

     }

     /**
        @property {Adaptive.Dictionary} registeredLifecycleListener
        @member Adaptive
        @private
        LifecycleListener control dictionary.
     */
     export var registeredLifecycleListener = new Dictionary<ILifecycleListener>([]);

        // LifecycleListener global listener handlers.

     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.ILifecycleListenerError} error
     */
     export function handleLifecycleListenerError(id : number, error : ILifecycleListenerError) : void {
          var listener : ILifecycleListener = registeredLifecycleListener[""+id];
          if (typeof listener === 'undefined' || listener == null) {
               console.error("ERROR: No listener with id "+id+" registered in registeredLifecycleListener dictionary.");
          } else {
               listener.onError(error);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.Lifecycle} lifecycle
     */
     export function handleLifecycleListenerResult(id : number, lifecycle : Lifecycle) : void {
          var listener : ILifecycleListener = registeredLifecycleListener[""+id];
          if (typeof listener === 'undefined' || listener == null) {
               console.error("ERROR: No listener with id "+id+" registered in registeredLifecycleListener dictionary.");
          } else {
               listener.onResult(lifecycle);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.Lifecycle} lifecycle
        @param {Adaptive.ILifecycleListenerWarning} warning
     */
     export function handleLifecycleListenerWarning(id : number, lifecycle : Lifecycle, warning : ILifecycleListenerWarning) : void {
          var listener : ILifecycleListener = registeredLifecycleListener[""+id];
          if (typeof listener === 'undefined' || listener == null) {
               console.error("ERROR: No listener with id "+id+" registered in registeredLifecycleListener dictionary.");
          } else {
               listener.onWarning(lifecycle, warning);
          }
     }

     /**
        @class Adaptive.LifecycleListener
        @extends Adaptive.BaseListener
     */
     export class LifecycleListener extends BaseListener implements ILifecycleListener {

          /**
             @private
             @property
          */
          onErrorFunction : (error : ILifecycleListenerError) => void;
          /**
             @private
             @property
          */
          onResultFunction : (lifecycle : Lifecycle) => void;
          /**
             @private
             @property
          */
          onWarningFunction : (lifecycle : Lifecycle, warning : ILifecycleListenerWarning) => void;

          /**
             @method constructor
             Constructor with anonymous handler functions for listener.

             @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.ILifecycleListenerError
             @param {Function} onResultFunction Function receiving parameters of type: Adaptive.Lifecycle
             @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.Lifecycle, Adaptive.ILifecycleListenerWarning
          */
          constructor(onErrorFunction : (error : ILifecycleListenerError) => void, onResultFunction : (lifecycle : Lifecycle) => void, onWarningFunction : (lifecycle : Lifecycle, warning : ILifecycleListenerWarning) => void) {
               super(++registeredCounter);
               if (onErrorFunction == null) {
                    console.error("ERROR: LifecycleListener onErrorFunction is not defined.");
               } else {
                    this.onErrorFunction = onErrorFunction;
               }
               if (onResultFunction == null) {
                    console.error("ERROR: LifecycleListener onResultFunction is not defined.");
               } else {
                    this.onResultFunction = onResultFunction;
               }
               if (onWarningFunction == null) {
                    console.error("ERROR: LifecycleListener onWarningFunction is not defined.");
               } else {
                    this.onWarningFunction = onWarningFunction;
               }
          }

          /**
             @method
             No data received - error condition, not authorized or hardware not available.
             @param {Adaptive.ILifecycleListenerError} error error Type of error encountered during reading.
             @since v2.0
          */
          public onError(error : ILifecycleListenerError) : void {
               if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                    console.warn("WARNING: LifecycleListener contains a null reference to onErrorFunction.");
               } else {
                    this.onErrorFunction(error);
               }
          }

          /**
             @method
             Called when lifecycle changes somehow.
             @param {Adaptive.Lifecycle} lifecycle lifecycle Lifecycle element
             @since v2.0
          */
          public onResult(lifecycle : Lifecycle) : void {
               if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                    console.warn("WARNING: LifecycleListener contains a null reference to onResultFunction.");
               } else {
                    this.onResultFunction(lifecycle);
               }
          }

          /**
             @method
             Data received with warning
             @param {Adaptive.Lifecycle} lifecycle lifecycle Lifecycle element
             @param {Adaptive.ILifecycleListenerWarning} warning warning   Type of warning encountered during reading.
             @since v2.0
          */
          public onWarning(lifecycle : Lifecycle, warning : ILifecycleListenerWarning) : void {
               if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                    console.warn("WARNING: LifecycleListener contains a null reference to onWarningFunction.");
               } else {
                    this.onWarningFunction(lifecycle, warning);
               }
          }

     }

     /**
        @property {Adaptive.Dictionary} registeredNetworkStatusListener
        @member Adaptive
        @private
        NetworkStatusListener control dictionary.
     */
     export var registeredNetworkStatusListener = new Dictionary<INetworkStatusListener>([]);

        // NetworkStatusListener global listener handlers.

     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.INetworkStatusListenerError} error
     */
     export function handleNetworkStatusListenerError(id : number, error : INetworkStatusListenerError) : void {
          var listener : INetworkStatusListener = registeredNetworkStatusListener[""+id];
          if (typeof listener === 'undefined' || listener == null) {
               console.error("ERROR: No listener with id "+id+" registered in registeredNetworkStatusListener dictionary.");
          } else {
               listener.onError(error);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.ICapabilitiesNet} network
     */
     export function handleNetworkStatusListenerResult(id : number, network : ICapabilitiesNet) : void {
          var listener : INetworkStatusListener = registeredNetworkStatusListener[""+id];
          if (typeof listener === 'undefined' || listener == null) {
               console.error("ERROR: No listener with id "+id+" registered in registeredNetworkStatusListener dictionary.");
          } else {
               listener.onResult(network);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.ICapabilitiesNet} network
        @param {Adaptive.INetworkStatusListenerWarning} warning
     */
     export function handleNetworkStatusListenerWarning(id : number, network : ICapabilitiesNet, warning : INetworkStatusListenerWarning) : void {
          var listener : INetworkStatusListener = registeredNetworkStatusListener[""+id];
          if (typeof listener === 'undefined' || listener == null) {
               console.error("ERROR: No listener with id "+id+" registered in registeredNetworkStatusListener dictionary.");
          } else {
               listener.onWarning(network, warning);
          }
     }

     /**
        @class Adaptive.NetworkStatusListener
        @extends Adaptive.BaseListener
     */
     export class NetworkStatusListener extends BaseListener implements INetworkStatusListener {

          /**
             @private
             @property
          */
          onErrorFunction : (error : INetworkStatusListenerError) => void;
          /**
             @private
             @property
          */
          onResultFunction : (network : ICapabilitiesNet) => void;
          /**
             @private
             @property
          */
          onWarningFunction : (network : ICapabilitiesNet, warning : INetworkStatusListenerWarning) => void;

          /**
             @method constructor
             Constructor with anonymous handler functions for listener.

             @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.INetworkStatusListenerError
             @param {Function} onResultFunction Function receiving parameters of type: Adaptive.ICapabilitiesNet
             @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.ICapabilitiesNet, Adaptive.INetworkStatusListenerWarning
          */
          constructor(onErrorFunction : (error : INetworkStatusListenerError) => void, onResultFunction : (network : ICapabilitiesNet) => void, onWarningFunction : (network : ICapabilitiesNet, warning : INetworkStatusListenerWarning) => void) {
               super(++registeredCounter);
               if (onErrorFunction == null) {
                    console.error("ERROR: NetworkStatusListener onErrorFunction is not defined.");
               } else {
                    this.onErrorFunction = onErrorFunction;
               }
               if (onResultFunction == null) {
                    console.error("ERROR: NetworkStatusListener onResultFunction is not defined.");
               } else {
                    this.onResultFunction = onResultFunction;
               }
               if (onWarningFunction == null) {
                    console.error("ERROR: NetworkStatusListener onWarningFunction is not defined.");
               } else {
                    this.onWarningFunction = onWarningFunction;
               }
          }

          /**
             @method
             No data received - error condition, not authorized or hardware not available.
             @param {Adaptive.INetworkStatusListenerError} error error Type of error encountered during reading.
             @since v2.0
          */
          public onError(error : INetworkStatusListenerError) : void {
               if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                    console.warn("WARNING: NetworkStatusListener contains a null reference to onErrorFunction.");
               } else {
                    this.onErrorFunction(error);
               }
          }

          /**
             @method
             Called when network connection changes somehow.
             @param {Adaptive.ICapabilitiesNet} network network Change to this network.
             @since v2.0
          */
          public onResult(network : ICapabilitiesNet) : void {
               if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                    console.warn("WARNING: NetworkStatusListener contains a null reference to onResultFunction.");
               } else {
                    this.onResultFunction(network);
               }
          }

          /**
             @method
             Status received with warning
             @param {Adaptive.ICapabilitiesNet} network network Change to this network.
             @param {Adaptive.INetworkStatusListenerWarning} warning warning Type of warning encountered during reading.
             @since v2.0
          */
          public onWarning(network : ICapabilitiesNet, warning : INetworkStatusListenerWarning) : void {
               if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                    console.warn("WARNING: NetworkStatusListener contains a null reference to onWarningFunction.");
               } else {
                    this.onWarningFunction(network, warning);
               }
          }

     }

     /**
        @class Adaptive.BaseCallback
     */
     export class BaseCallback implements IBaseCallback {

          /**
             @property {number}
             Unique id of callback.
          */
          id : number;

          /**
             @property {Adaptive.IAdaptiveRPGroup}
             Group of API.
          */
          apiGroup : IAdaptiveRPGroup;

          /**
             @method constructor
             Constructor with callback id.

             @param {number} id  The id of the callback.
          */
          constructor(id : number) {
               this.id = id;
               this.apiGroup = IAdaptiveRPGroup.Application;
          }

          /**
             @method
             @return {number}
             Get the callback id.
          */
          getId() : number {
               return this.id;
          }

          /**
             @method
             @return {Adaptive.IAdaptiveRPGroup}
             Return the API group for the given interface.
          */
          getAPIGroup() : IAdaptiveRPGroup {
               return this.apiGroup;
          }

          /**
             @method
             Return the API version for the given interface.

             @return {string}
             The version of the API.
          */
          getAPIVersion() : string {
               return "v2.2.0"
          }

     }


     /**
        @property {Adaptive.Dictionary} registeredContactPhotoResultCallback
        @member Adaptive
        @private
        ContactPhotoResultCallback control dictionary.
     */
     export var registeredContactPhotoResultCallback = new Dictionary<IContactPhotoResultCallback>([]);


        // ContactPhotoResultCallback global listener handlers.

     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.IContactPhotoResultCallbackError} error
     */
     export function handleContactPhotoResultCallbackError(id : number, error : IContactPhotoResultCallbackError) : void {
          var callback : IContactPhotoResultCallback = registeredContactPhotoResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredContactPhotoResultCallback dictionary.");
          } else {
               registeredContactPhotoResultCallback.remove(""+id);
               callback.onError(error);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {number[]} contactPhoto
     */
     export function handleContactPhotoResultCallbackResult(id : number, contactPhoto : Array<number>) : void {
          var callback : IContactPhotoResultCallback = registeredContactPhotoResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredContactPhotoResultCallback dictionary.");
          } else {
               registeredContactPhotoResultCallback.remove(""+id);
               callback.onResult(contactPhoto);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {number[]} contactPhoto
        @param {Adaptive.IContactPhotoResultCallbackWarning} warning
     */
     export function handleContactPhotoResultCallbackWarning(id : number, contactPhoto : Array<number>, warning : IContactPhotoResultCallbackWarning) : void {
          var callback : IContactPhotoResultCallback = registeredContactPhotoResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredContactPhotoResultCallback dictionary.");
          } else {
               registeredContactPhotoResultCallback.remove(""+id);
               callback.onWarning(contactPhoto, warning);
          }
     }


     /**
        @class Adaptive.ContactPhotoResultCallback
        @extends Adaptive.BaseCallback
     */
     export class ContactPhotoResultCallback extends BaseCallback implements IContactPhotoResultCallback {

          /**
             @private
             @property
          */
          onErrorFunction : (error : IContactPhotoResultCallbackError) => void;
          /**
             @private
             @property
          */
          onResultFunction : (contactPhoto : Array<number>) => void;
          /**
             @private
             @property
          */
          onWarningFunction : (contactPhoto : Array<number>, warning : IContactPhotoResultCallbackWarning) => void;

          /**
             @method constructor
             Constructor with anonymous handler functions for callback.

             @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IContactPhotoResultCallbackError
             @param {Function} onResultFunction Function receiving parameters of type: number[]
             @param {Function} onWarningFunction Function receiving parameters of type: number[], Adaptive.IContactPhotoResultCallbackWarning
          */
          constructor(onErrorFunction : (error : IContactPhotoResultCallbackError) => void, onResultFunction : (contactPhoto : Array<number>) => void, onWarningFunction : (contactPhoto : Array<number>, warning : IContactPhotoResultCallbackWarning) => void) {
               super(++registeredCounter);
               if (onErrorFunction == null) {
                    console.error("ERROR: ContactPhotoResultCallback onErrorFunction is not defined.");
               } else {
                    this.onErrorFunction = onErrorFunction;
               }
               if (onResultFunction == null) {
                    console.error("ERROR: ContactPhotoResultCallback onResultFunction is not defined.");
               } else {
                    this.onResultFunction = onResultFunction;
               }
               if (onWarningFunction == null) {
                    console.error("ERROR: ContactPhotoResultCallback onWarningFunction is not defined.");
               } else {
                    this.onWarningFunction = onWarningFunction;
               }
          }

          /**
             @method
             This method is called on Error
             @param {Adaptive.IContactPhotoResultCallbackError} error error returned by the platform
             @since v2.0
          */
          public onError(error : IContactPhotoResultCallbackError) : void {
               if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                    console.warn("WARNING: ContactPhotoResultCallback contains a null reference to onErrorFunction.");
               } else {
                    this.onErrorFunction(error);
               }
          }

          /**
             @method
             This method is called on Result
             @param {number[]} contactPhoto contactPhoto returned by the platform
             @since v2.0
          */
          public onResult(contactPhoto : Array<number>) : void {
               if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                    console.warn("WARNING: ContactPhotoResultCallback contains a null reference to onResultFunction.");
               } else {
                    this.onResultFunction(contactPhoto);
               }
          }

          /**
             @method
             This method is called on Warning
             @param {number[]} contactPhoto contactPhoto returned by the platform
             @param {Adaptive.IContactPhotoResultCallbackWarning} warning warning      returned by the platform
             @since v2.0
          */
          public onWarning(contactPhoto : Array<number>, warning : IContactPhotoResultCallbackWarning) : void {
               if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                    console.warn("WARNING: ContactPhotoResultCallback contains a null reference to onWarningFunction.");
               } else {
                    this.onWarningFunction(contactPhoto, warning);
               }
          }

     }


     /**
        @property {Adaptive.Dictionary} registeredContactResultCallback
        @member Adaptive
        @private
        ContactResultCallback control dictionary.
     */
     export var registeredContactResultCallback = new Dictionary<IContactResultCallback>([]);


        // ContactResultCallback global listener handlers.

     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.IContactResultCallbackError} error
     */
     export function handleContactResultCallbackError(id : number, error : IContactResultCallbackError) : void {
          var callback : IContactResultCallback = registeredContactResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredContactResultCallback dictionary.");
          } else {
               registeredContactResultCallback.remove(""+id);
               callback.onError(error);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.Contact[]} contacts
     */
     export function handleContactResultCallbackResult(id : number, contacts : Array<Contact>) : void {
          var callback : IContactResultCallback = registeredContactResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredContactResultCallback dictionary.");
          } else {
               registeredContactResultCallback.remove(""+id);
               callback.onResult(contacts);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.Contact[]} contacts
        @param {Adaptive.IContactResultCallbackWarning} warning
     */
     export function handleContactResultCallbackWarning(id : number, contacts : Array<Contact>, warning : IContactResultCallbackWarning) : void {
          var callback : IContactResultCallback = registeredContactResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredContactResultCallback dictionary.");
          } else {
               registeredContactResultCallback.remove(""+id);
               callback.onWarning(contacts, warning);
          }
     }


     /**
        @class Adaptive.ContactResultCallback
        @extends Adaptive.BaseCallback
     */
     export class ContactResultCallback extends BaseCallback implements IContactResultCallback {

          /**
             @private
             @property
          */
          onErrorFunction : (error : IContactResultCallbackError) => void;
          /**
             @private
             @property
          */
          onResultFunction : (contacts : Array<Contact>) => void;
          /**
             @private
             @property
          */
          onWarningFunction : (contacts : Array<Contact>, warning : IContactResultCallbackWarning) => void;

          /**
             @method constructor
             Constructor with anonymous handler functions for callback.

             @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IContactResultCallbackError
             @param {Function} onResultFunction Function receiving parameters of type: Adaptive.Contact[]
             @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.Contact[], Adaptive.IContactResultCallbackWarning
          */
          constructor(onErrorFunction : (error : IContactResultCallbackError) => void, onResultFunction : (contacts : Array<Contact>) => void, onWarningFunction : (contacts : Array<Contact>, warning : IContactResultCallbackWarning) => void) {
               super(++registeredCounter);
               if (onErrorFunction == null) {
                    console.error("ERROR: ContactResultCallback onErrorFunction is not defined.");
               } else {
                    this.onErrorFunction = onErrorFunction;
               }
               if (onResultFunction == null) {
                    console.error("ERROR: ContactResultCallback onResultFunction is not defined.");
               } else {
                    this.onResultFunction = onResultFunction;
               }
               if (onWarningFunction == null) {
                    console.error("ERROR: ContactResultCallback onWarningFunction is not defined.");
               } else {
                    this.onWarningFunction = onWarningFunction;
               }
          }

          /**
             @method
             This method is called on Error
             @param {Adaptive.IContactResultCallbackError} error error returned by the platform
             @since v2.0
          */
          public onError(error : IContactResultCallbackError) : void {
               if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                    console.warn("WARNING: ContactResultCallback contains a null reference to onErrorFunction.");
               } else {
                    this.onErrorFunction(error);
               }
          }

          /**
             @method
             This method is called on Result
             @param {Adaptive.Contact[]} contacts contacts returned by the platform
             @since v2.0
          */
          public onResult(contacts : Array<Contact>) : void {
               if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                    console.warn("WARNING: ContactResultCallback contains a null reference to onResultFunction.");
               } else {
                    this.onResultFunction(contacts);
               }
          }

          /**
             @method
             This method is called on Warning
             @param {Adaptive.Contact[]} contacts contacts returned by the platform
             @param {Adaptive.IContactResultCallbackWarning} warning warning  returned by the platform
             @since v2.0
          */
          public onWarning(contacts : Array<Contact>, warning : IContactResultCallbackWarning) : void {
               if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                    console.warn("WARNING: ContactResultCallback contains a null reference to onWarningFunction.");
               } else {
                    this.onWarningFunction(contacts, warning);
               }
          }

     }


     /**
        @property {Adaptive.Dictionary} registeredDatabaseResultCallback
        @member Adaptive
        @private
        DatabaseResultCallback control dictionary.
     */
     export var registeredDatabaseResultCallback = new Dictionary<IDatabaseResultCallback>([]);


        // DatabaseResultCallback global listener handlers.

     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.IDatabaseResultCallbackError} error
     */
     export function handleDatabaseResultCallbackError(id : number, error : IDatabaseResultCallbackError) : void {
          var callback : IDatabaseResultCallback = registeredDatabaseResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredDatabaseResultCallback dictionary.");
          } else {
               registeredDatabaseResultCallback.remove(""+id);
               callback.onError(error);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.Database} database
     */
     export function handleDatabaseResultCallbackResult(id : number, database : Database) : void {
          var callback : IDatabaseResultCallback = registeredDatabaseResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredDatabaseResultCallback dictionary.");
          } else {
               registeredDatabaseResultCallback.remove(""+id);
               callback.onResult(database);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.Database} database
        @param {Adaptive.IDatabaseResultCallbackWarning} warning
     */
     export function handleDatabaseResultCallbackWarning(id : number, database : Database, warning : IDatabaseResultCallbackWarning) : void {
          var callback : IDatabaseResultCallback = registeredDatabaseResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredDatabaseResultCallback dictionary.");
          } else {
               registeredDatabaseResultCallback.remove(""+id);
               callback.onWarning(database, warning);
          }
     }


     /**
        @class Adaptive.DatabaseResultCallback
        @extends Adaptive.BaseCallback
     */
     export class DatabaseResultCallback extends BaseCallback implements IDatabaseResultCallback {

          /**
             @private
             @property
          */
          onErrorFunction : (error : IDatabaseResultCallbackError) => void;
          /**
             @private
             @property
          */
          onResultFunction : (database : Database) => void;
          /**
             @private
             @property
          */
          onWarningFunction : (database : Database, warning : IDatabaseResultCallbackWarning) => void;

          /**
             @method constructor
             Constructor with anonymous handler functions for callback.

             @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IDatabaseResultCallbackError
             @param {Function} onResultFunction Function receiving parameters of type: Adaptive.Database
             @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.Database, Adaptive.IDatabaseResultCallbackWarning
          */
          constructor(onErrorFunction : (error : IDatabaseResultCallbackError) => void, onResultFunction : (database : Database) => void, onWarningFunction : (database : Database, warning : IDatabaseResultCallbackWarning) => void) {
               super(++registeredCounter);
               if (onErrorFunction == null) {
                    console.error("ERROR: DatabaseResultCallback onErrorFunction is not defined.");
               } else {
                    this.onErrorFunction = onErrorFunction;
               }
               if (onResultFunction == null) {
                    console.error("ERROR: DatabaseResultCallback onResultFunction is not defined.");
               } else {
                    this.onResultFunction = onResultFunction;
               }
               if (onWarningFunction == null) {
                    console.error("ERROR: DatabaseResultCallback onWarningFunction is not defined.");
               } else {
                    this.onWarningFunction = onWarningFunction;
               }
          }

          /**
             @method
             Result callback for error responses
             @param {Adaptive.IDatabaseResultCallbackError} error error Returned error
             @since v2.0
          */
          public onError(error : IDatabaseResultCallbackError) : void {
               if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                    console.warn("WARNING: DatabaseResultCallback contains a null reference to onErrorFunction.");
               } else {
                    this.onErrorFunction(error);
               }
          }

          /**
             @method
             Result callback for correct responses
             @param {Adaptive.Database} database database Returns the database
             @since v2.0
          */
          public onResult(database : Database) : void {
               if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                    console.warn("WARNING: DatabaseResultCallback contains a null reference to onResultFunction.");
               } else {
                    this.onResultFunction(database);
               }
          }

          /**
             @method
             Result callback for warning responses
             @param {Adaptive.Database} database database Returns the database
             @param {Adaptive.IDatabaseResultCallbackWarning} warning warning  Returned Warning
             @since v2.0
          */
          public onWarning(database : Database, warning : IDatabaseResultCallbackWarning) : void {
               if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                    console.warn("WARNING: DatabaseResultCallback contains a null reference to onWarningFunction.");
               } else {
                    this.onWarningFunction(database, warning);
               }
          }

     }


     /**
        @property {Adaptive.Dictionary} registeredDatabaseTableResultCallback
        @member Adaptive
        @private
        DatabaseTableResultCallback control dictionary.
     */
     export var registeredDatabaseTableResultCallback = new Dictionary<IDatabaseTableResultCallback>([]);


        // DatabaseTableResultCallback global listener handlers.

     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.IDatabaseTableResultCallbackError} error
     */
     export function handleDatabaseTableResultCallbackError(id : number, error : IDatabaseTableResultCallbackError) : void {
          var callback : IDatabaseTableResultCallback = registeredDatabaseTableResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredDatabaseTableResultCallback dictionary.");
          } else {
               registeredDatabaseTableResultCallback.remove(""+id);
               callback.onError(error);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.DatabaseTable} databaseTable
     */
     export function handleDatabaseTableResultCallbackResult(id : number, databaseTable : DatabaseTable) : void {
          var callback : IDatabaseTableResultCallback = registeredDatabaseTableResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredDatabaseTableResultCallback dictionary.");
          } else {
               registeredDatabaseTableResultCallback.remove(""+id);
               callback.onResult(databaseTable);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.DatabaseTable} databaseTable
        @param {Adaptive.IDatabaseTableResultCallbackWarning} warning
     */
     export function handleDatabaseTableResultCallbackWarning(id : number, databaseTable : DatabaseTable, warning : IDatabaseTableResultCallbackWarning) : void {
          var callback : IDatabaseTableResultCallback = registeredDatabaseTableResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredDatabaseTableResultCallback dictionary.");
          } else {
               registeredDatabaseTableResultCallback.remove(""+id);
               callback.onWarning(databaseTable, warning);
          }
     }


     /**
        @class Adaptive.DatabaseTableResultCallback
        @extends Adaptive.BaseCallback
     */
     export class DatabaseTableResultCallback extends BaseCallback implements IDatabaseTableResultCallback {

          /**
             @private
             @property
          */
          onErrorFunction : (error : IDatabaseTableResultCallbackError) => void;
          /**
             @private
             @property
          */
          onResultFunction : (databaseTable : DatabaseTable) => void;
          /**
             @private
             @property
          */
          onWarningFunction : (databaseTable : DatabaseTable, warning : IDatabaseTableResultCallbackWarning) => void;

          /**
             @method constructor
             Constructor with anonymous handler functions for callback.

             @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IDatabaseTableResultCallbackError
             @param {Function} onResultFunction Function receiving parameters of type: Adaptive.DatabaseTable
             @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.DatabaseTable, Adaptive.IDatabaseTableResultCallbackWarning
          */
          constructor(onErrorFunction : (error : IDatabaseTableResultCallbackError) => void, onResultFunction : (databaseTable : DatabaseTable) => void, onWarningFunction : (databaseTable : DatabaseTable, warning : IDatabaseTableResultCallbackWarning) => void) {
               super(++registeredCounter);
               if (onErrorFunction == null) {
                    console.error("ERROR: DatabaseTableResultCallback onErrorFunction is not defined.");
               } else {
                    this.onErrorFunction = onErrorFunction;
               }
               if (onResultFunction == null) {
                    console.error("ERROR: DatabaseTableResultCallback onResultFunction is not defined.");
               } else {
                    this.onResultFunction = onResultFunction;
               }
               if (onWarningFunction == null) {
                    console.error("ERROR: DatabaseTableResultCallback onWarningFunction is not defined.");
               } else {
                    this.onWarningFunction = onWarningFunction;
               }
          }

          /**
             @method
             Result callback for error responses
             @param {Adaptive.IDatabaseTableResultCallbackError} error error Returned error
             @since v2.0
          */
          public onError(error : IDatabaseTableResultCallbackError) : void {
               if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                    console.warn("WARNING: DatabaseTableResultCallback contains a null reference to onErrorFunction.");
               } else {
                    this.onErrorFunction(error);
               }
          }

          /**
             @method
             Result callback for correct responses
             @param {Adaptive.DatabaseTable} databaseTable databaseTable Returns the databaseTable
             @since v2.0
          */
          public onResult(databaseTable : DatabaseTable) : void {
               if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                    console.warn("WARNING: DatabaseTableResultCallback contains a null reference to onResultFunction.");
               } else {
                    this.onResultFunction(databaseTable);
               }
          }

          /**
             @method
             Result callback for warning responses
             @param {Adaptive.DatabaseTable} databaseTable databaseTable Returns the databaseTable
             @param {Adaptive.IDatabaseTableResultCallbackWarning} warning warning       Returned Warning
             @since v2.0
          */
          public onWarning(databaseTable : DatabaseTable, warning : IDatabaseTableResultCallbackWarning) : void {
               if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                    console.warn("WARNING: DatabaseTableResultCallback contains a null reference to onWarningFunction.");
               } else {
                    this.onWarningFunction(databaseTable, warning);
               }
          }

     }


     /**
        @property {Adaptive.Dictionary} registeredFileDataLoadResultCallback
        @member Adaptive
        @private
        FileDataLoadResultCallback control dictionary.
     */
     export var registeredFileDataLoadResultCallback = new Dictionary<IFileDataLoadResultCallback>([]);


        // FileDataLoadResultCallback global listener handlers.

     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.IFileDataLoadResultCallbackError} error
     */
     export function handleFileDataLoadResultCallbackError(id : number, error : IFileDataLoadResultCallbackError) : void {
          var callback : IFileDataLoadResultCallback = registeredFileDataLoadResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredFileDataLoadResultCallback dictionary.");
          } else {
               registeredFileDataLoadResultCallback.remove(""+id);
               callback.onError(error);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {number[]} data
     */
     export function handleFileDataLoadResultCallbackResult(id : number, data : Array<number>) : void {
          var callback : IFileDataLoadResultCallback = registeredFileDataLoadResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredFileDataLoadResultCallback dictionary.");
          } else {
               registeredFileDataLoadResultCallback.remove(""+id);
               callback.onResult(data);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {number[]} data
        @param {Adaptive.IFileDataLoadResultCallbackWarning} warning
     */
     export function handleFileDataLoadResultCallbackWarning(id : number, data : Array<number>, warning : IFileDataLoadResultCallbackWarning) : void {
          var callback : IFileDataLoadResultCallback = registeredFileDataLoadResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredFileDataLoadResultCallback dictionary.");
          } else {
               registeredFileDataLoadResultCallback.remove(""+id);
               callback.onWarning(data, warning);
          }
     }


     /**
        @class Adaptive.FileDataLoadResultCallback
        @extends Adaptive.BaseCallback
     */
     export class FileDataLoadResultCallback extends BaseCallback implements IFileDataLoadResultCallback {

          /**
             @private
             @property
          */
          onErrorFunction : (error : IFileDataLoadResultCallbackError) => void;
          /**
             @private
             @property
          */
          onResultFunction : (data : Array<number>) => void;
          /**
             @private
             @property
          */
          onWarningFunction : (data : Array<number>, warning : IFileDataLoadResultCallbackWarning) => void;

          /**
             @method constructor
             Constructor with anonymous handler functions for callback.

             @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IFileDataLoadResultCallbackError
             @param {Function} onResultFunction Function receiving parameters of type: number[]
             @param {Function} onWarningFunction Function receiving parameters of type: number[], Adaptive.IFileDataLoadResultCallbackWarning
          */
          constructor(onErrorFunction : (error : IFileDataLoadResultCallbackError) => void, onResultFunction : (data : Array<number>) => void, onWarningFunction : (data : Array<number>, warning : IFileDataLoadResultCallbackWarning) => void) {
               super(++registeredCounter);
               if (onErrorFunction == null) {
                    console.error("ERROR: FileDataLoadResultCallback onErrorFunction is not defined.");
               } else {
                    this.onErrorFunction = onErrorFunction;
               }
               if (onResultFunction == null) {
                    console.error("ERROR: FileDataLoadResultCallback onResultFunction is not defined.");
               } else {
                    this.onResultFunction = onResultFunction;
               }
               if (onWarningFunction == null) {
                    console.error("ERROR: FileDataLoadResultCallback onWarningFunction is not defined.");
               } else {
                    this.onWarningFunction = onWarningFunction;
               }
          }

          /**
             @method
             Error processing data retrieval/storage operation.
             @param {Adaptive.IFileDataLoadResultCallbackError} error error Error condition encountered.
             @since v2.0
          */
          public onError(error : IFileDataLoadResultCallbackError) : void {
               if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                    console.warn("WARNING: FileDataLoadResultCallback contains a null reference to onErrorFunction.");
               } else {
                    this.onErrorFunction(error);
               }
          }

          /**
             @method
             Result of data retrieval operation.
             @param {number[]} data data Data loaded.
             @since v2.0
          */
          public onResult(data : Array<number>) : void {
               if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                    console.warn("WARNING: FileDataLoadResultCallback contains a null reference to onResultFunction.");
               } else {
                    this.onResultFunction(data);
               }
          }

          /**
             @method
             Result with warning of data retrieval/storage operation.
             @param {number[]} data data    File being loaded.
             @param {Adaptive.IFileDataLoadResultCallbackWarning} warning warning Warning condition encountered.
             @since v2.0
          */
          public onWarning(data : Array<number>, warning : IFileDataLoadResultCallbackWarning) : void {
               if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                    console.warn("WARNING: FileDataLoadResultCallback contains a null reference to onWarningFunction.");
               } else {
                    this.onWarningFunction(data, warning);
               }
          }

     }


     /**
        @property {Adaptive.Dictionary} registeredFileDataStoreResultCallback
        @member Adaptive
        @private
        FileDataStoreResultCallback control dictionary.
     */
     export var registeredFileDataStoreResultCallback = new Dictionary<IFileDataStoreResultCallback>([]);


        // FileDataStoreResultCallback global listener handlers.

     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.IFileDataStoreResultCallbackError} error
     */
     export function handleFileDataStoreResultCallbackError(id : number, error : IFileDataStoreResultCallbackError) : void {
          var callback : IFileDataStoreResultCallback = registeredFileDataStoreResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredFileDataStoreResultCallback dictionary.");
          } else {
               registeredFileDataStoreResultCallback.remove(""+id);
               callback.onError(error);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.FileDescriptor} file
     */
     export function handleFileDataStoreResultCallbackResult(id : number, file : FileDescriptor) : void {
          var callback : IFileDataStoreResultCallback = registeredFileDataStoreResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredFileDataStoreResultCallback dictionary.");
          } else {
               registeredFileDataStoreResultCallback.remove(""+id);
               callback.onResult(file);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.FileDescriptor} file
        @param {Adaptive.IFileDataStoreResultCallbackWarning} warning
     */
     export function handleFileDataStoreResultCallbackWarning(id : number, file : FileDescriptor, warning : IFileDataStoreResultCallbackWarning) : void {
          var callback : IFileDataStoreResultCallback = registeredFileDataStoreResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredFileDataStoreResultCallback dictionary.");
          } else {
               registeredFileDataStoreResultCallback.remove(""+id);
               callback.onWarning(file, warning);
          }
     }


     /**
        @class Adaptive.FileDataStoreResultCallback
        @extends Adaptive.BaseCallback
     */
     export class FileDataStoreResultCallback extends BaseCallback implements IFileDataStoreResultCallback {

          /**
             @private
             @property
          */
          onErrorFunction : (error : IFileDataStoreResultCallbackError) => void;
          /**
             @private
             @property
          */
          onResultFunction : (file : FileDescriptor) => void;
          /**
             @private
             @property
          */
          onWarningFunction : (file : FileDescriptor, warning : IFileDataStoreResultCallbackWarning) => void;

          /**
             @method constructor
             Constructor with anonymous handler functions for callback.

             @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IFileDataStoreResultCallbackError
             @param {Function} onResultFunction Function receiving parameters of type: Adaptive.FileDescriptor
             @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.FileDescriptor, Adaptive.IFileDataStoreResultCallbackWarning
          */
          constructor(onErrorFunction : (error : IFileDataStoreResultCallbackError) => void, onResultFunction : (file : FileDescriptor) => void, onWarningFunction : (file : FileDescriptor, warning : IFileDataStoreResultCallbackWarning) => void) {
               super(++registeredCounter);
               if (onErrorFunction == null) {
                    console.error("ERROR: FileDataStoreResultCallback onErrorFunction is not defined.");
               } else {
                    this.onErrorFunction = onErrorFunction;
               }
               if (onResultFunction == null) {
                    console.error("ERROR: FileDataStoreResultCallback onResultFunction is not defined.");
               } else {
                    this.onResultFunction = onResultFunction;
               }
               if (onWarningFunction == null) {
                    console.error("ERROR: FileDataStoreResultCallback onWarningFunction is not defined.");
               } else {
                    this.onWarningFunction = onWarningFunction;
               }
          }

          /**
             @method
             Error processing data retrieval/storage operation.
             @param {Adaptive.IFileDataStoreResultCallbackError} error error Error condition encountered.
             @since v2.0
          */
          public onError(error : IFileDataStoreResultCallbackError) : void {
               if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                    console.warn("WARNING: FileDataStoreResultCallback contains a null reference to onErrorFunction.");
               } else {
                    this.onErrorFunction(error);
               }
          }

          /**
             @method
             Result of data storage operation.
             @param {Adaptive.FileDescriptor} file file File reference to stored data.
             @since v2.0
          */
          public onResult(file : FileDescriptor) : void {
               if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                    console.warn("WARNING: FileDataStoreResultCallback contains a null reference to onResultFunction.");
               } else {
                    this.onResultFunction(file);
               }
          }

          /**
             @method
             Result with warning of data retrieval/storage operation.
             @param {Adaptive.FileDescriptor} file file    File being loaded/stored.
             @param {Adaptive.IFileDataStoreResultCallbackWarning} warning warning Warning condition encountered.
             @since v2.0
          */
          public onWarning(file : FileDescriptor, warning : IFileDataStoreResultCallbackWarning) : void {
               if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                    console.warn("WARNING: FileDataStoreResultCallback contains a null reference to onWarningFunction.");
               } else {
                    this.onWarningFunction(file, warning);
               }
          }

     }


     /**
        @property {Adaptive.Dictionary} registeredFileListResultCallback
        @member Adaptive
        @private
        FileListResultCallback control dictionary.
     */
     export var registeredFileListResultCallback = new Dictionary<IFileListResultCallback>([]);


        // FileListResultCallback global listener handlers.

     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.IFileListResultCallbackError} error
     */
     export function handleFileListResultCallbackError(id : number, error : IFileListResultCallbackError) : void {
          var callback : IFileListResultCallback = registeredFileListResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredFileListResultCallback dictionary.");
          } else {
               registeredFileListResultCallback.remove(""+id);
               callback.onError(error);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.FileDescriptor[]} files
     */
     export function handleFileListResultCallbackResult(id : number, files : Array<FileDescriptor>) : void {
          var callback : IFileListResultCallback = registeredFileListResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredFileListResultCallback dictionary.");
          } else {
               registeredFileListResultCallback.remove(""+id);
               callback.onResult(files);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.FileDescriptor[]} files
        @param {Adaptive.IFileListResultCallbackWarning} warning
     */
     export function handleFileListResultCallbackWarning(id : number, files : Array<FileDescriptor>, warning : IFileListResultCallbackWarning) : void {
          var callback : IFileListResultCallback = registeredFileListResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredFileListResultCallback dictionary.");
          } else {
               registeredFileListResultCallback.remove(""+id);
               callback.onWarning(files, warning);
          }
     }


     /**
        @class Adaptive.FileListResultCallback
        @extends Adaptive.BaseCallback
     */
     export class FileListResultCallback extends BaseCallback implements IFileListResultCallback {

          /**
             @private
             @property
          */
          onErrorFunction : (error : IFileListResultCallbackError) => void;
          /**
             @private
             @property
          */
          onResultFunction : (files : Array<FileDescriptor>) => void;
          /**
             @private
             @property
          */
          onWarningFunction : (files : Array<FileDescriptor>, warning : IFileListResultCallbackWarning) => void;

          /**
             @method constructor
             Constructor with anonymous handler functions for callback.

             @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IFileListResultCallbackError
             @param {Function} onResultFunction Function receiving parameters of type: Adaptive.FileDescriptor[]
             @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.FileDescriptor[], Adaptive.IFileListResultCallbackWarning
          */
          constructor(onErrorFunction : (error : IFileListResultCallbackError) => void, onResultFunction : (files : Array<FileDescriptor>) => void, onWarningFunction : (files : Array<FileDescriptor>, warning : IFileListResultCallbackWarning) => void) {
               super(++registeredCounter);
               if (onErrorFunction == null) {
                    console.error("ERROR: FileListResultCallback onErrorFunction is not defined.");
               } else {
                    this.onErrorFunction = onErrorFunction;
               }
               if (onResultFunction == null) {
                    console.error("ERROR: FileListResultCallback onResultFunction is not defined.");
               } else {
                    this.onResultFunction = onResultFunction;
               }
               if (onWarningFunction == null) {
                    console.error("ERROR: FileListResultCallback onWarningFunction is not defined.");
               } else {
                    this.onWarningFunction = onWarningFunction;
               }
          }

          /**
             @method
             On error result of a file operation.
             @param {Adaptive.IFileListResultCallbackError} error error Error processing the request.
             @since v2.0
          */
          public onError(error : IFileListResultCallbackError) : void {
               if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                    console.warn("WARNING: FileListResultCallback contains a null reference to onErrorFunction.");
               } else {
                    this.onErrorFunction(error);
               }
          }

          /**
             @method
             On correct result of a file operation.
             @param {Adaptive.FileDescriptor[]} files files Array of resulting files/folders.
             @since v2.0
          */
          public onResult(files : Array<FileDescriptor>) : void {
               if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                    console.warn("WARNING: FileListResultCallback contains a null reference to onResultFunction.");
               } else {
                    this.onResultFunction(files);
               }
          }

          /**
             @method
             On partial result of a file operation, containing a warning.
             @param {Adaptive.FileDescriptor[]} files files   Array of resulting files/folders.
             @param {Adaptive.IFileListResultCallbackWarning} warning warning Warning condition encountered.
             @since v2.0
          */
          public onWarning(files : Array<FileDescriptor>, warning : IFileListResultCallbackWarning) : void {
               if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                    console.warn("WARNING: FileListResultCallback contains a null reference to onWarningFunction.");
               } else {
                    this.onWarningFunction(files, warning);
               }
          }

     }


     /**
        @property {Adaptive.Dictionary} registeredFileResultCallback
        @member Adaptive
        @private
        FileResultCallback control dictionary.
     */
     export var registeredFileResultCallback = new Dictionary<IFileResultCallback>([]);


        // FileResultCallback global listener handlers.

     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.IFileResultCallbackError} error
     */
     export function handleFileResultCallbackError(id : number, error : IFileResultCallbackError) : void {
          var callback : IFileResultCallback = registeredFileResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredFileResultCallback dictionary.");
          } else {
               registeredFileResultCallback.remove(""+id);
               callback.onError(error);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.FileDescriptor} storageFile
     */
     export function handleFileResultCallbackResult(id : number, storageFile : FileDescriptor) : void {
          var callback : IFileResultCallback = registeredFileResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredFileResultCallback dictionary.");
          } else {
               registeredFileResultCallback.remove(""+id);
               callback.onResult(storageFile);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.FileDescriptor} file
        @param {Adaptive.IFileResultCallbackWarning} warning
     */
     export function handleFileResultCallbackWarning(id : number, file : FileDescriptor, warning : IFileResultCallbackWarning) : void {
          var callback : IFileResultCallback = registeredFileResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredFileResultCallback dictionary.");
          } else {
               registeredFileResultCallback.remove(""+id);
               callback.onWarning(file, warning);
          }
     }


     /**
        @class Adaptive.FileResultCallback
        @extends Adaptive.BaseCallback
     */
     export class FileResultCallback extends BaseCallback implements IFileResultCallback {

          /**
             @private
             @property
          */
          onErrorFunction : (error : IFileResultCallbackError) => void;
          /**
             @private
             @property
          */
          onResultFunction : (storageFile : FileDescriptor) => void;
          /**
             @private
             @property
          */
          onWarningFunction : (file : FileDescriptor, warning : IFileResultCallbackWarning) => void;

          /**
             @method constructor
             Constructor with anonymous handler functions for callback.

             @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IFileResultCallbackError
             @param {Function} onResultFunction Function receiving parameters of type: Adaptive.FileDescriptor
             @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.FileDescriptor, Adaptive.IFileResultCallbackWarning
          */
          constructor(onErrorFunction : (error : IFileResultCallbackError) => void, onResultFunction : (storageFile : FileDescriptor) => void, onWarningFunction : (file : FileDescriptor, warning : IFileResultCallbackWarning) => void) {
               super(++registeredCounter);
               if (onErrorFunction == null) {
                    console.error("ERROR: FileResultCallback onErrorFunction is not defined.");
               } else {
                    this.onErrorFunction = onErrorFunction;
               }
               if (onResultFunction == null) {
                    console.error("ERROR: FileResultCallback onResultFunction is not defined.");
               } else {
                    this.onResultFunction = onResultFunction;
               }
               if (onWarningFunction == null) {
                    console.error("ERROR: FileResultCallback onWarningFunction is not defined.");
               } else {
                    this.onWarningFunction = onWarningFunction;
               }
          }

          /**
             @method
             On error result of a file operation.
             @param {Adaptive.IFileResultCallbackError} error error Error processing the request.
             @since v2.0
          */
          public onError(error : IFileResultCallbackError) : void {
               if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                    console.warn("WARNING: FileResultCallback contains a null reference to onErrorFunction.");
               } else {
                    this.onErrorFunction(error);
               }
          }

          /**
             @method
             On correct result of a file operation.
             @param {Adaptive.FileDescriptor} storageFile storageFile Reference to the resulting file.
             @since v2.0
          */
          public onResult(storageFile : FileDescriptor) : void {
               if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                    console.warn("WARNING: FileResultCallback contains a null reference to onResultFunction.");
               } else {
                    this.onResultFunction(storageFile);
               }
          }

          /**
             @method
             On partial result of a file operation, containing a warning.
             @param {Adaptive.FileDescriptor} file file    Reference to the offending file.
             @param {Adaptive.IFileResultCallbackWarning} warning warning Warning processing the request.
             @since v2.0
          */
          public onWarning(file : FileDescriptor, warning : IFileResultCallbackWarning) : void {
               if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                    console.warn("WARNING: FileResultCallback contains a null reference to onWarningFunction.");
               } else {
                    this.onWarningFunction(file, warning);
               }
          }

     }


     /**
        @property {Adaptive.Dictionary} registeredMessagingCallback
        @member Adaptive
        @private
        MessagingCallback control dictionary.
     */
     export var registeredMessagingCallback = new Dictionary<IMessagingCallback>([]);


        // MessagingCallback global listener handlers.

     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.IMessagingCallbackError} error
     */
     export function handleMessagingCallbackError(id : number, error : IMessagingCallbackError) : void {
          var callback : IMessagingCallback = registeredMessagingCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredMessagingCallback dictionary.");
          } else {
               registeredMessagingCallback.remove(""+id);
               callback.onError(error);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {boolean} success
     */
     export function handleMessagingCallbackResult(id : number, success : boolean) : void {
          var callback : IMessagingCallback = registeredMessagingCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredMessagingCallback dictionary.");
          } else {
               registeredMessagingCallback.remove(""+id);
               callback.onResult(success);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {boolean} success
        @param {Adaptive.IMessagingCallbackWarning} warning
     */
     export function handleMessagingCallbackWarning(id : number, success : boolean, warning : IMessagingCallbackWarning) : void {
          var callback : IMessagingCallback = registeredMessagingCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredMessagingCallback dictionary.");
          } else {
               registeredMessagingCallback.remove(""+id);
               callback.onWarning(success, warning);
          }
     }


     /**
        @class Adaptive.MessagingCallback
        @extends Adaptive.BaseCallback
     */
     export class MessagingCallback extends BaseCallback implements IMessagingCallback {

          /**
             @private
             @property
          */
          onErrorFunction : (error : IMessagingCallbackError) => void;
          /**
             @private
             @property
          */
          onResultFunction : (success : boolean) => void;
          /**
             @private
             @property
          */
          onWarningFunction : (success : boolean, warning : IMessagingCallbackWarning) => void;

          /**
             @method constructor
             Constructor with anonymous handler functions for callback.

             @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IMessagingCallbackError
             @param {Function} onResultFunction Function receiving parameters of type: boolean
             @param {Function} onWarningFunction Function receiving parameters of type: boolean, Adaptive.IMessagingCallbackWarning
          */
          constructor(onErrorFunction : (error : IMessagingCallbackError) => void, onResultFunction : (success : boolean) => void, onWarningFunction : (success : boolean, warning : IMessagingCallbackWarning) => void) {
               super(++registeredCounter);
               if (onErrorFunction == null) {
                    console.error("ERROR: MessagingCallback onErrorFunction is not defined.");
               } else {
                    this.onErrorFunction = onErrorFunction;
               }
               if (onResultFunction == null) {
                    console.error("ERROR: MessagingCallback onResultFunction is not defined.");
               } else {
                    this.onResultFunction = onResultFunction;
               }
               if (onWarningFunction == null) {
                    console.error("ERROR: MessagingCallback onWarningFunction is not defined.");
               } else {
                    this.onWarningFunction = onWarningFunction;
               }
          }

          /**
             @method
             This method is called on Error
             @param {Adaptive.IMessagingCallbackError} error error returned by the platform
             @since v2.0
          */
          public onError(error : IMessagingCallbackError) : void {
               if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                    console.warn("WARNING: MessagingCallback contains a null reference to onErrorFunction.");
               } else {
                    this.onErrorFunction(error);
               }
          }

          /**
             @method
             This method is called on Result
             @param {boolean} success success true if sent;false otherwise
             @since v2.0
          */
          public onResult(success : boolean) : void {
               if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                    console.warn("WARNING: MessagingCallback contains a null reference to onResultFunction.");
               } else {
                    this.onResultFunction(success);
               }
          }

          /**
             @method
             This method is called on Warning
             @param {boolean} success success true if sent;false otherwise
             @param {Adaptive.IMessagingCallbackWarning} warning warning returned by the platform
             @since v2.0
          */
          public onWarning(success : boolean, warning : IMessagingCallbackWarning) : void {
               if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                    console.warn("WARNING: MessagingCallback contains a null reference to onWarningFunction.");
               } else {
                    this.onWarningFunction(success, warning);
               }
          }

     }


     /**
        @property {Adaptive.Dictionary} registeredNetworkReachabilityCallback
        @member Adaptive
        @private
        NetworkReachabilityCallback control dictionary.
     */
     export var registeredNetworkReachabilityCallback = new Dictionary<INetworkReachabilityCallback>([]);


        // NetworkReachabilityCallback global listener handlers.

     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.INetworkReachabilityCallbackError} error
     */
     export function handleNetworkReachabilityCallbackError(id : number, error : INetworkReachabilityCallbackError) : void {
          var callback : INetworkReachabilityCallback = registeredNetworkReachabilityCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredNetworkReachabilityCallback dictionary.");
          } else {
               registeredNetworkReachabilityCallback.remove(""+id);
               callback.onError(error);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {boolean} reachable
     */
     export function handleNetworkReachabilityCallbackResult(id : number, reachable : boolean) : void {
          var callback : INetworkReachabilityCallback = registeredNetworkReachabilityCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredNetworkReachabilityCallback dictionary.");
          } else {
               registeredNetworkReachabilityCallback.remove(""+id);
               callback.onResult(reachable);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {boolean} reachable
        @param {Adaptive.INetworkReachabilityCallbackWarning} warning
     */
     export function handleNetworkReachabilityCallbackWarning(id : number, reachable : boolean, warning : INetworkReachabilityCallbackWarning) : void {
          var callback : INetworkReachabilityCallback = registeredNetworkReachabilityCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredNetworkReachabilityCallback dictionary.");
          } else {
               registeredNetworkReachabilityCallback.remove(""+id);
               callback.onWarning(reachable, warning);
          }
     }


     /**
        @class Adaptive.NetworkReachabilityCallback
        @extends Adaptive.BaseCallback
     */
     export class NetworkReachabilityCallback extends BaseCallback implements INetworkReachabilityCallback {

          /**
             @private
             @property
          */
          onErrorFunction : (error : INetworkReachabilityCallbackError) => void;
          /**
             @private
             @property
          */
          onResultFunction : (reachable : boolean) => void;
          /**
             @private
             @property
          */
          onWarningFunction : (reachable : boolean, warning : INetworkReachabilityCallbackWarning) => void;

          /**
             @method constructor
             Constructor with anonymous handler functions for callback.

             @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.INetworkReachabilityCallbackError
             @param {Function} onResultFunction Function receiving parameters of type: boolean
             @param {Function} onWarningFunction Function receiving parameters of type: boolean, Adaptive.INetworkReachabilityCallbackWarning
          */
          constructor(onErrorFunction : (error : INetworkReachabilityCallbackError) => void, onResultFunction : (reachable : boolean) => void, onWarningFunction : (reachable : boolean, warning : INetworkReachabilityCallbackWarning) => void) {
               super(++registeredCounter);
               if (onErrorFunction == null) {
                    console.error("ERROR: NetworkReachabilityCallback onErrorFunction is not defined.");
               } else {
                    this.onErrorFunction = onErrorFunction;
               }
               if (onResultFunction == null) {
                    console.error("ERROR: NetworkReachabilityCallback onResultFunction is not defined.");
               } else {
                    this.onResultFunction = onResultFunction;
               }
               if (onWarningFunction == null) {
                    console.error("ERROR: NetworkReachabilityCallback onWarningFunction is not defined.");
               } else {
                    this.onWarningFunction = onWarningFunction;
               }
          }

          /**
             @method
             No data received - error condition, not authorized .
             @param {Adaptive.INetworkReachabilityCallbackError} error error Error value
             @since v2.0
          */
          public onError(error : INetworkReachabilityCallbackError) : void {
               if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                    console.warn("WARNING: NetworkReachabilityCallback contains a null reference to onErrorFunction.");
               } else {
                    this.onErrorFunction(error);
               }
          }

          /**
             @method
             Correct data received.
             @param {boolean} reachable reachable Indicates if the host is reachable
             @since v2.0
          */
          public onResult(reachable : boolean) : void {
               if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                    console.warn("WARNING: NetworkReachabilityCallback contains a null reference to onResultFunction.");
               } else {
                    this.onResultFunction(reachable);
               }
          }

          /**
             @method
             Data received with warning - ie Found entries with existing key and values have been overriden
             @param {boolean} reachable reachable Indicates if the host is reachable
             @param {Adaptive.INetworkReachabilityCallbackWarning} warning warning   Warning value
             @since v2.0
          */
          public onWarning(reachable : boolean, warning : INetworkReachabilityCallbackWarning) : void {
               if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                    console.warn("WARNING: NetworkReachabilityCallback contains a null reference to onWarningFunction.");
               } else {
                    this.onWarningFunction(reachable, warning);
               }
          }

     }


     /**
        @property {Adaptive.Dictionary} registeredSecurityResultCallback
        @member Adaptive
        @private
        SecurityResultCallback control dictionary.
     */
     export var registeredSecurityResultCallback = new Dictionary<ISecurityResultCallback>([]);


        // SecurityResultCallback global listener handlers.

     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.ISecurityResultCallbackError} error
     */
     export function handleSecurityResultCallbackError(id : number, error : ISecurityResultCallbackError) : void {
          var callback : ISecurityResultCallback = registeredSecurityResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredSecurityResultCallback dictionary.");
          } else {
               registeredSecurityResultCallback.remove(""+id);
               callback.onError(error);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.SecureKeyPair[]} keyValues
     */
     export function handleSecurityResultCallbackResult(id : number, keyValues : Array<SecureKeyPair>) : void {
          var callback : ISecurityResultCallback = registeredSecurityResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredSecurityResultCallback dictionary.");
          } else {
               registeredSecurityResultCallback.remove(""+id);
               callback.onResult(keyValues);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.SecureKeyPair[]} keyValues
        @param {Adaptive.ISecurityResultCallbackWarning} warning
     */
     export function handleSecurityResultCallbackWarning(id : number, keyValues : Array<SecureKeyPair>, warning : ISecurityResultCallbackWarning) : void {
          var callback : ISecurityResultCallback = registeredSecurityResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredSecurityResultCallback dictionary.");
          } else {
               registeredSecurityResultCallback.remove(""+id);
               callback.onWarning(keyValues, warning);
          }
     }


     /**
        @class Adaptive.SecurityResultCallback
        @extends Adaptive.BaseCallback
     */
     export class SecurityResultCallback extends BaseCallback implements ISecurityResultCallback {

          /**
             @private
             @property
          */
          onErrorFunction : (error : ISecurityResultCallbackError) => void;
          /**
             @private
             @property
          */
          onResultFunction : (keyValues : Array<SecureKeyPair>) => void;
          /**
             @private
             @property
          */
          onWarningFunction : (keyValues : Array<SecureKeyPair>, warning : ISecurityResultCallbackWarning) => void;

          /**
             @method constructor
             Constructor with anonymous handler functions for callback.

             @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.ISecurityResultCallbackError
             @param {Function} onResultFunction Function receiving parameters of type: Adaptive.SecureKeyPair[]
             @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.SecureKeyPair[], Adaptive.ISecurityResultCallbackWarning
          */
          constructor(onErrorFunction : (error : ISecurityResultCallbackError) => void, onResultFunction : (keyValues : Array<SecureKeyPair>) => void, onWarningFunction : (keyValues : Array<SecureKeyPair>, warning : ISecurityResultCallbackWarning) => void) {
               super(++registeredCounter);
               if (onErrorFunction == null) {
                    console.error("ERROR: SecurityResultCallback onErrorFunction is not defined.");
               } else {
                    this.onErrorFunction = onErrorFunction;
               }
               if (onResultFunction == null) {
                    console.error("ERROR: SecurityResultCallback onResultFunction is not defined.");
               } else {
                    this.onResultFunction = onResultFunction;
               }
               if (onWarningFunction == null) {
                    console.error("ERROR: SecurityResultCallback onWarningFunction is not defined.");
               } else {
                    this.onWarningFunction = onWarningFunction;
               }
          }

          /**
             @method
             No data received - error condition, not authorized .
             @param {Adaptive.ISecurityResultCallbackError} error error Error values
             @since v2.0
          */
          public onError(error : ISecurityResultCallbackError) : void {
               if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                    console.warn("WARNING: SecurityResultCallback contains a null reference to onErrorFunction.");
               } else {
                    this.onErrorFunction(error);
               }
          }

          /**
             @method
             Correct data received.
             @param {Adaptive.SecureKeyPair[]} keyValues keyValues key and values
             @since v2.0
          */
          public onResult(keyValues : Array<SecureKeyPair>) : void {
               if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                    console.warn("WARNING: SecurityResultCallback contains a null reference to onResultFunction.");
               } else {
                    this.onResultFunction(keyValues);
               }
          }

          /**
             @method
             Data received with warning - ie Found entries with existing key and values have been overriden
             @param {Adaptive.SecureKeyPair[]} keyValues keyValues key and values
             @param {Adaptive.ISecurityResultCallbackWarning} warning warning   Warning values
             @since v2.0
          */
          public onWarning(keyValues : Array<SecureKeyPair>, warning : ISecurityResultCallbackWarning) : void {
               if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                    console.warn("WARNING: SecurityResultCallback contains a null reference to onWarningFunction.");
               } else {
                    this.onWarningFunction(keyValues, warning);
               }
          }

     }


     /**
        @property {Adaptive.Dictionary} registeredServiceResultCallback
        @member Adaptive
        @private
        ServiceResultCallback control dictionary.
     */
     export var registeredServiceResultCallback = new Dictionary<IServiceResultCallback>([]);


        // ServiceResultCallback global listener handlers.

     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.IServiceResultCallbackError} error
     */
     export function handleServiceResultCallbackError(id : number, error : IServiceResultCallbackError) : void {
          var callback : IServiceResultCallback = registeredServiceResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredServiceResultCallback dictionary.");
          } else {
               registeredServiceResultCallback.remove(""+id);
               callback.onError(error);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.ServiceResponse} response
     */
     export function handleServiceResultCallbackResult(id : number, response : ServiceResponse) : void {
          var callback : IServiceResultCallback = registeredServiceResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredServiceResultCallback dictionary.");
          } else {
               registeredServiceResultCallback.remove(""+id);
               callback.onResult(response);
          }
     }
     /**
        @method
        @private
        @member Adaptive
        @param {number} id
        @param {Adaptive.ServiceResponse} response
        @param {Adaptive.IServiceResultCallbackWarning} warning
     */
     export function handleServiceResultCallbackWarning(id : number, response : ServiceResponse, warning : IServiceResultCallbackWarning) : void {
          var callback : IServiceResultCallback = registeredServiceResultCallback[""+id];
          if (typeof callback === 'undefined' || callback == null) {
               console.error("ERROR: No callback with id "+id+" registered in registeredServiceResultCallback dictionary.");
          } else {
               registeredServiceResultCallback.remove(""+id);
               callback.onWarning(response, warning);
          }
     }


     /**
        @class Adaptive.ServiceResultCallback
        @extends Adaptive.BaseCallback
     */
     export class ServiceResultCallback extends BaseCallback implements IServiceResultCallback {

          /**
             @private
             @property
          */
          onErrorFunction : (error : IServiceResultCallbackError) => void;
          /**
             @private
             @property
          */
          onResultFunction : (response : ServiceResponse) => void;
          /**
             @private
             @property
          */
          onWarningFunction : (response : ServiceResponse, warning : IServiceResultCallbackWarning) => void;

          /**
             @method constructor
             Constructor with anonymous handler functions for callback.

             @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IServiceResultCallbackError
             @param {Function} onResultFunction Function receiving parameters of type: Adaptive.ServiceResponse
             @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.ServiceResponse, Adaptive.IServiceResultCallbackWarning
          */
          constructor(onErrorFunction : (error : IServiceResultCallbackError) => void, onResultFunction : (response : ServiceResponse) => void, onWarningFunction : (response : ServiceResponse, warning : IServiceResultCallbackWarning) => void) {
               super(++registeredCounter);
               if (onErrorFunction == null) {
                    console.error("ERROR: ServiceResultCallback onErrorFunction is not defined.");
               } else {
                    this.onErrorFunction = onErrorFunction;
               }
               if (onResultFunction == null) {
                    console.error("ERROR: ServiceResultCallback onResultFunction is not defined.");
               } else {
                    this.onResultFunction = onResultFunction;
               }
               if (onWarningFunction == null) {
                    console.error("ERROR: ServiceResultCallback onWarningFunction is not defined.");
               } else {
                    this.onWarningFunction = onWarningFunction;
               }
          }

          /**
             @method
             This method is called on Error
             @param {Adaptive.IServiceResultCallbackError} error error returned by the platform
             @since v2.0
          */
          public onError(error : IServiceResultCallbackError) : void {
               if (typeof this.onErrorFunction === 'undefined' || this.onErrorFunction == null) {
                    console.warn("WARNING: ServiceResultCallback contains a null reference to onErrorFunction.");
               } else {
                    this.onErrorFunction(error);
               }
          }

          /**
             @method
             This method is called on Result
             @param {Adaptive.ServiceResponse} response response data
             @since v2.0
          */
          public onResult(response : ServiceResponse) : void {
               if (typeof this.onResultFunction === 'undefined' || this.onResultFunction == null) {
                    console.warn("WARNING: ServiceResultCallback contains a null reference to onResultFunction.");
               } else {
                    this.onResultFunction(response);
               }
          }

          /**
             @method
             This method is called on Warning
             @param {Adaptive.ServiceResponse} response response data
             @param {Adaptive.IServiceResultCallbackWarning} warning warning  returned by the platform
             @since v2.0
          */
          public onWarning(response : ServiceResponse, warning : IServiceResultCallbackWarning) : void {
               if (typeof this.onWarningFunction === 'undefined' || this.onWarningFunction == null) {
                    console.warn("WARNING: ServiceResultCallback contains a null reference to onWarningFunction.");
               } else {
                    this.onWarningFunction(response, warning);
               }
          }

     }

     /**
        @class Adaptive.BaseApplicationBridge
        Base application for Application purposes

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class BaseApplicationBridge implements IBaseApplication {

          /**
             @property {Adaptive.IAdaptiveRPGroup} apiGroup
             Group of API.
          */
          apiGroup : IAdaptiveRPGroup;

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               this.apiGroup = IAdaptiveRPGroup.Application;
          }

          /**
             @method
             Return the API group for the given interface.
             @return {Adaptive.IAdaptiveRPGroup}
          */
          getAPIGroup() : IAdaptiveRPGroup {
               return this.apiGroup;
          }

          /**
             @method
             Return the API version for the given interface.

             @return {string} The version of the API.
          */
          getAPIVersion() : string {
               return "v2.2.0"
          }
     }

     /**
        @class Adaptive.BaseCommerceBridge
        Base application for Commerce purposes

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class BaseCommerceBridge implements IBaseCommerce {

          /**
             @property {Adaptive.IAdaptiveRPGroup} apiGroup
             Group of API.
          */
          apiGroup : IAdaptiveRPGroup;

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               this.apiGroup = IAdaptiveRPGroup.Commerce;
          }

          /**
             @method
             Return the API group for the given interface.
             @return {Adaptive.IAdaptiveRPGroup}
          */
          getAPIGroup() : IAdaptiveRPGroup {
               return this.apiGroup;
          }

          /**
             @method
             Return the API version for the given interface.

             @return {string} The version of the API.
          */
          getAPIVersion() : string {
               return "v2.2.0"
          }
     }

     /**
        @class Adaptive.BaseCommunicationBridge
        Base application for Communication purposes

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class BaseCommunicationBridge implements IBaseCommunication {

          /**
             @property {Adaptive.IAdaptiveRPGroup} apiGroup
             Group of API.
          */
          apiGroup : IAdaptiveRPGroup;

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               this.apiGroup = IAdaptiveRPGroup.Communication;
          }

          /**
             @method
             Return the API group for the given interface.
             @return {Adaptive.IAdaptiveRPGroup}
          */
          getAPIGroup() : IAdaptiveRPGroup {
               return this.apiGroup;
          }

          /**
             @method
             Return the API version for the given interface.

             @return {string} The version of the API.
          */
          getAPIVersion() : string {
               return "v2.2.0"
          }
     }

     /**
        @class Adaptive.BaseDataBridge
        Base application for Data purposes

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class BaseDataBridge implements IBaseData {

          /**
             @property {Adaptive.IAdaptiveRPGroup} apiGroup
             Group of API.
          */
          apiGroup : IAdaptiveRPGroup;

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               this.apiGroup = IAdaptiveRPGroup.Data;
          }

          /**
             @method
             Return the API group for the given interface.
             @return {Adaptive.IAdaptiveRPGroup}
          */
          getAPIGroup() : IAdaptiveRPGroup {
               return this.apiGroup;
          }

          /**
             @method
             Return the API version for the given interface.

             @return {string} The version of the API.
          */
          getAPIVersion() : string {
               return "v2.2.0"
          }
     }

     /**
        @class Adaptive.BaseMediaBridge
        Base application for Media purposes

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class BaseMediaBridge implements IBaseMedia {

          /**
             @property {Adaptive.IAdaptiveRPGroup} apiGroup
             Group of API.
          */
          apiGroup : IAdaptiveRPGroup;

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               this.apiGroup = IAdaptiveRPGroup.Media;
          }

          /**
             @method
             Return the API group for the given interface.
             @return {Adaptive.IAdaptiveRPGroup}
          */
          getAPIGroup() : IAdaptiveRPGroup {
               return this.apiGroup;
          }

          /**
             @method
             Return the API version for the given interface.

             @return {string} The version of the API.
          */
          getAPIVersion() : string {
               return "v2.2.0"
          }
     }

     /**
        @class Adaptive.BaseNotificationBridge
        Base application for Notification purposes

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class BaseNotificationBridge implements IBaseNotification {

          /**
             @property {Adaptive.IAdaptiveRPGroup} apiGroup
             Group of API.
          */
          apiGroup : IAdaptiveRPGroup;

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               this.apiGroup = IAdaptiveRPGroup.Notification;
          }

          /**
             @method
             Return the API group for the given interface.
             @return {Adaptive.IAdaptiveRPGroup}
          */
          getAPIGroup() : IAdaptiveRPGroup {
               return this.apiGroup;
          }

          /**
             @method
             Return the API version for the given interface.

             @return {string} The version of the API.
          */
          getAPIVersion() : string {
               return "v2.2.0"
          }
     }

     /**
        @class Adaptive.BasePIMBridge
        Base application for PIM purposes

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class BasePIMBridge implements IBasePIM {

          /**
             @property {Adaptive.IAdaptiveRPGroup} apiGroup
             Group of API.
          */
          apiGroup : IAdaptiveRPGroup;

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               this.apiGroup = IAdaptiveRPGroup.PIM;
          }

          /**
             @method
             Return the API group for the given interface.
             @return {Adaptive.IAdaptiveRPGroup}
          */
          getAPIGroup() : IAdaptiveRPGroup {
               return this.apiGroup;
          }

          /**
             @method
             Return the API version for the given interface.

             @return {string} The version of the API.
          */
          getAPIVersion() : string {
               return "v2.2.0"
          }
     }

     /**
        @class Adaptive.BaseReaderBridge
        Base application for Reader purposes

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class BaseReaderBridge implements IBaseReader {

          /**
             @property {Adaptive.IAdaptiveRPGroup} apiGroup
             Group of API.
          */
          apiGroup : IAdaptiveRPGroup;

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               this.apiGroup = IAdaptiveRPGroup.Reader;
          }

          /**
             @method
             Return the API group for the given interface.
             @return {Adaptive.IAdaptiveRPGroup}
          */
          getAPIGroup() : IAdaptiveRPGroup {
               return this.apiGroup;
          }

          /**
             @method
             Return the API version for the given interface.

             @return {string} The version of the API.
          */
          getAPIVersion() : string {
               return "v2.2.0"
          }
     }

     /**
        @class Adaptive.BaseSecurityBridge
        Base application for Security purposes

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class BaseSecurityBridge implements IBaseSecurity {

          /**
             @property {Adaptive.IAdaptiveRPGroup} apiGroup
             Group of API.
          */
          apiGroup : IAdaptiveRPGroup;

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               this.apiGroup = IAdaptiveRPGroup.Security;
          }

          /**
             @method
             Return the API group for the given interface.
             @return {Adaptive.IAdaptiveRPGroup}
          */
          getAPIGroup() : IAdaptiveRPGroup {
               return this.apiGroup;
          }

          /**
             @method
             Return the API version for the given interface.

             @return {string} The version of the API.
          */
          getAPIVersion() : string {
               return "v2.2.0"
          }
     }

     /**
        @class Adaptive.BaseSensorBridge
        Base application for Sensor purposes

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class BaseSensorBridge implements IBaseSensor {

          /**
             @property {Adaptive.IAdaptiveRPGroup} apiGroup
             Group of API.
          */
          apiGroup : IAdaptiveRPGroup;

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               this.apiGroup = IAdaptiveRPGroup.Sensor;
          }

          /**
             @method
             Return the API group for the given interface.
             @return {Adaptive.IAdaptiveRPGroup}
          */
          getAPIGroup() : IAdaptiveRPGroup {
               return this.apiGroup;
          }

          /**
             @method
             Return the API version for the given interface.

             @return {string} The version of the API.
          */
          getAPIVersion() : string {
               return "v2.2.0"
          }
     }

     /**
        @class Adaptive.BaseSocialBridge
        Base application for Social purposes

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class BaseSocialBridge implements IBaseSocial {

          /**
             @property {Adaptive.IAdaptiveRPGroup} apiGroup
             Group of API.
          */
          apiGroup : IAdaptiveRPGroup;

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               this.apiGroup = IAdaptiveRPGroup.Social;
          }

          /**
             @method
             Return the API group for the given interface.
             @return {Adaptive.IAdaptiveRPGroup}
          */
          getAPIGroup() : IAdaptiveRPGroup {
               return this.apiGroup;
          }

          /**
             @method
             Return the API version for the given interface.

             @return {string} The version of the API.
          */
          getAPIVersion() : string {
               return "v2.2.0"
          }
     }

     /**
        @class Adaptive.BaseSystemBridge
        Base application for System purposes

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class BaseSystemBridge implements IBaseSystem {

          /**
             @property {Adaptive.IAdaptiveRPGroup} apiGroup
             Group of API.
          */
          apiGroup : IAdaptiveRPGroup;

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               this.apiGroup = IAdaptiveRPGroup.System;
          }

          /**
             @method
             Return the API group for the given interface.
             @return {Adaptive.IAdaptiveRPGroup}
          */
          getAPIGroup() : IAdaptiveRPGroup {
               return this.apiGroup;
          }

          /**
             @method
             Return the API version for the given interface.

             @return {string} The version of the API.
          */
          getAPIVersion() : string {
               return "v2.2.0"
          }
     }

     /**
        @class Adaptive.BaseUIBridge
        Base application for UI purposes

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class BaseUIBridge implements IBaseUI {

          /**
             @property {Adaptive.IAdaptiveRPGroup} apiGroup
             Group of API.
          */
          apiGroup : IAdaptiveRPGroup;

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               this.apiGroup = IAdaptiveRPGroup.UI;
          }

          /**
             @method
             Return the API group for the given interface.
             @return {Adaptive.IAdaptiveRPGroup}
          */
          getAPIGroup() : IAdaptiveRPGroup {
               return this.apiGroup;
          }

          /**
             @method
             Return the API version for the given interface.

             @return {string} The version of the API.
          */
          getAPIVersion() : string {
               return "v2.2.0"
          }
     }

     /**
        @class Adaptive.BaseUtilBridge
        Base application for Utility purposes

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class BaseUtilBridge implements IBaseUtil {

          /**
             @property {Adaptive.IAdaptiveRPGroup} apiGroup
             Group of API.
          */
          apiGroup : IAdaptiveRPGroup;

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               this.apiGroup = IAdaptiveRPGroup.Util;
          }

          /**
             @method
             Return the API group for the given interface.
             @return {Adaptive.IAdaptiveRPGroup}
          */
          getAPIGroup() : IAdaptiveRPGroup {
               return this.apiGroup;
          }

          /**
             @method
             Return the API version for the given interface.

             @return {string} The version of the API.
          */
          getAPIVersion() : string {
               return "v2.2.0"
          }
     }

     /**
        @class Adaptive.AnalyticsBridge
        @extends Adaptive.BaseApplicationBridge
        Interface for Analytics purposes

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class AnalyticsBridge extends BaseApplicationBridge implements IAnalytics {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.GlobalizationBridge
        @extends Adaptive.BaseApplicationBridge
        Interface for Managing the Globalization results

        @author Francisco Javier Martin Bueno
        @since v2.0
     */
     export class GlobalizationBridge extends BaseApplicationBridge implements IGlobalization {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }

          /**
             @method
             Returns the default locale of the application defined in the configuration file

             @return {Adaptive.Locale} Default Locale of the application
             @since v2.0
          */
          getDefaultLocale() : Locale {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IGlobalization","getDefaultLocale",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : Locale = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = Locale.toObject(JSON.parse(apiResponse.getResponse()));
               }
               return response;
          }

          /**
             @method
             List of supported locales for the application defined in the configuration file

             @return {Adaptive.Locale[]} List of locales
             @since v2.0
          */
          getLocaleSupportedDescriptors() : Array<Locale> {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IGlobalization","getLocaleSupportedDescriptors",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : Array<Locale> = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = new Array<Locale>();
                    var responseArray : [any] = JSON.parse(apiResponse.getResponse());
                    for(var i = 0;i < responseArray.length; i++) {
                         response.push(Locale.toObject(responseArray[i]));
                    }
               }
               return response;
          }

          /**
             @method
             Gets the text/message corresponding to the given key and locale.

             @param {string} key key    to match text
             @param {Adaptive.Locale} locale locale The locale object to get localized message, or the locale desciptor ("language" or "language-country" two-letters ISO codes.
             @return {string} Localized text.
             @since v2.0
          */
          getResourceLiteral(key : string, locale : Locale) : string {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(key));
               arParams.push(JSON.stringify(locale));
               var apiRequest : APIRequest = new APIRequest("IGlobalization","getResourceLiteral",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : string = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = apiResponse.getResponse();
               }
               return response;
          }

          /**
             @method
             Gets the full application configured literals (key/message pairs) corresponding to the given locale.

             @param {Adaptive.Locale} locale locale The locale object to get localized message, or the locale desciptor ("language" or "language-country" two-letters ISO codes.
             @return {Adaptive.KeyPair[]} Localized texts in the form of an object.
             @since v2.0
          */
          getResourceLiterals(locale : Locale) : Array<KeyPair> {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(locale));
               var apiRequest : APIRequest = new APIRequest("IGlobalization","getResourceLiterals",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : Array<KeyPair> = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = new Array<KeyPair>();
                    var responseArray : [any] = JSON.parse(apiResponse.getResponse());
                    for(var i = 0;i < responseArray.length; i++) {
                         response.push(KeyPair.toObject(responseArray[i]));
                    }
               }
               return response;
          }
     }

     /**
        @class Adaptive.LifecycleBridge
        @extends Adaptive.BaseApplicationBridge
        Interface for Managing the Lifecycle listeners

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class LifecycleBridge extends BaseApplicationBridge implements ILifecycle {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }

          /**
             @method
             Add the listener for the lifecycle of the app

             @param {Adaptive.LifecycleListener} listener listener Lifecycle listener
             @since v2.0
          */
          addLifecycleListener(listener : ILifecycleListener) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("ILifecycle","addLifecycleListener",arParams, listener.getId());
               postRequestListener(apiRequest, listener, registeredLifecycleListener);
          }

          /**
             @method
             Whether the application is in background or not

             @return {boolean} true if the application is in background;false otherwise
             @since v2.0
          */
          isBackground() : boolean {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("ILifecycle","isBackground",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : boolean = false;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = JSON.parse(apiResponse.getResponse());
               }
               return response;
          }

          /**
             @method
             Un-registers an existing listener from receiving lifecycle events.

             @param {Adaptive.LifecycleListener} listener listener Lifecycle listener
             @since v2.0
          */
          removeLifecycleListener(listener : ILifecycleListener) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("ILifecycle","removeLifecycleListener",arParams, listener.getId());
               postRequestListener(apiRequest, listener, registeredLifecycleListener);
          }

          /**
             @method
             Removes all existing listeners from receiving lifecycle events.

             @since v2.0
          */
          removeLifecycleListeners() : void {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("ILifecycle","removeLifecycleListeners",arParams, -1);
               postRequestListener(apiRequest, null, registeredLifecycleListener);
          }
     }

     /**
        @class Adaptive.ManagementBridge
        @extends Adaptive.BaseApplicationBridge
        Interface for Managing the Management operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class ManagementBridge extends BaseApplicationBridge implements IManagement {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.PrintingBridge
        @extends Adaptive.BaseApplicationBridge
        Interface for Managing the Printing operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class PrintingBridge extends BaseApplicationBridge implements IPrinting {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.SettingsBridge
        @extends Adaptive.BaseApplicationBridge
        Interface for Managing the Settings operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class SettingsBridge extends BaseApplicationBridge implements ISettings {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.UpdateBridge
        @extends Adaptive.BaseApplicationBridge
        Interface for Managing the Update operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class UpdateBridge extends BaseApplicationBridge implements IUpdate {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.AdsBridge
        @extends Adaptive.BaseCommerceBridge
        Interface for Advertising purposes

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class AdsBridge extends BaseCommerceBridge implements IAds {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.StoreBridge
        @extends Adaptive.BaseCommerceBridge
        Interface for Managing the Store operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class StoreBridge extends BaseCommerceBridge implements IStore {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.WalletBridge
        @extends Adaptive.BaseCommerceBridge
        Interface for Managing the Wallet operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class WalletBridge extends BaseCommerceBridge implements IWallet {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.BluetoothBridge
        @extends Adaptive.BaseCommunicationBridge
        Interface for Bluetooth purposes

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class BluetoothBridge extends BaseCommunicationBridge implements IBluetooth {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.NetworkInfoBridge
        @extends Adaptive.BaseCommunicationBridge
        Interface for Managing the Network information operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class NetworkInfoBridge extends BaseCommunicationBridge implements INetworkInfo {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.NetworkNamingBridge
        @extends Adaptive.BaseCommunicationBridge
        Interface for Managing the Network naming operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class NetworkNamingBridge extends BaseCommunicationBridge implements INetworkNaming {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.NetworkReachabilityBridge
        @extends Adaptive.BaseCommunicationBridge
        Interface for Managing the Network reachability operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class NetworkReachabilityBridge extends BaseCommunicationBridge implements INetworkReachability {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }

          /**
             @method
             Whether there is connectivity to a host, via domain name or ip address, or not.

             @param {string} host host     domain name or ip address of host.
             @param {Adaptive.NetworkReachabilityCallback} callback callback Callback called at the end.
             @since v2.0
          */
          isNetworkReachable(host : string, callback : INetworkReachabilityCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(host));
               var apiRequest : APIRequest = new APIRequest("INetworkReachability","isNetworkReachable",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredNetworkReachabilityCallback);
          }

          /**
             @method
             Whether there is connectivity to an url of a service or not.

             @param {string} url url      to look for
             @param {Adaptive.NetworkReachabilityCallback} callback callback Callback called at the end
             @since v2.0
          */
          isNetworkServiceReachable(url : string, callback : INetworkReachabilityCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(url));
               var apiRequest : APIRequest = new APIRequest("INetworkReachability","isNetworkServiceReachable",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredNetworkReachabilityCallback);
          }
     }

     /**
        @class Adaptive.NetworkStatusBridge
        @extends Adaptive.BaseCommunicationBridge
        Interface for Managing the Network status

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class NetworkStatusBridge extends BaseCommunicationBridge implements INetworkStatus {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }

          /**
             @method
             Add the listener for network status changes of the app

             @param {Adaptive.NetworkStatusListener} listener listener Listener with the result
             @since v2.0
          */
          addNetworkStatusListener(listener : INetworkStatusListener) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("INetworkStatus","addNetworkStatusListener",arParams, listener.getId());
               postRequestListener(apiRequest, listener, registeredNetworkStatusListener);
          }

          /**
             @method
             Un-registers an existing listener from receiving network status events.

             @param {Adaptive.NetworkStatusListener} listener listener Listener with the result
             @since v2.0
          */
          removeNetworkStatusListener(listener : INetworkStatusListener) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("INetworkStatus","removeNetworkStatusListener",arParams, listener.getId());
               postRequestListener(apiRequest, listener, registeredNetworkStatusListener);
          }

          /**
             @method
             Removes all existing listeners from receiving network status events.

             @since v2.0
          */
          removeNetworkStatusListeners() : void {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("INetworkStatus","removeNetworkStatusListeners",arParams, -1);
               postRequestListener(apiRequest, null, registeredNetworkStatusListener);
          }
     }

     /**
        @class Adaptive.ServiceBridge
        @extends Adaptive.BaseCommunicationBridge
        Interface for Managing the Services operations

        @author Francisco Javier Martin Bueno
        @since v2.0
     */
     export class ServiceBridge extends BaseCommunicationBridge implements IService {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
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
          getServiceRequest(serviceToken : ServiceToken) : ServiceRequest {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(serviceToken));
               var apiRequest : APIRequest = new APIRequest("IService","getServiceRequest",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : ServiceRequest = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = ServiceRequest.toObject(JSON.parse(apiResponse.getResponse()));
               }
               return response;
          }

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
          getServiceToken(serviceName : string, endpointName : string, functionName : string, method : IServiceMethod) : ServiceToken {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(serviceName));
               arParams.push(JSON.stringify(endpointName));
               arParams.push(JSON.stringify(functionName));
               arParams.push(JSON.stringify(method));
               var apiRequest : APIRequest = new APIRequest("IService","getServiceToken",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : ServiceToken = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = ServiceToken.toObject(JSON.parse(apiResponse.getResponse()));
               }
               return response;
          }

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
          getServiceTokenByUri(uri : string) : ServiceToken {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(uri));
               var apiRequest : APIRequest = new APIRequest("IService","getServiceTokenByUri",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : ServiceToken = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = ServiceToken.toObject(JSON.parse(apiResponse.getResponse()));
               }
               return response;
          }

          /**
             @method
             Returns all the possible service tokens configured in the platform's XML service definition file.

             @return {Adaptive.ServiceToken[]} Array of service tokens configured.
             @since v2.0.6
          */
          getServicesRegistered() : Array<ServiceToken> {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IService","getServicesRegistered",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : Array<ServiceToken> = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = new Array<ServiceToken>();
                    var responseArray : [any] = JSON.parse(apiResponse.getResponse());
                    for(var i = 0;i < responseArray.length; i++) {
                         response.push(ServiceToken.toObject(responseArray[i]));
                    }
               }
               return response;
          }

          /**
             @method
             Executes the given ServiceRequest and provides responses to the given callback handler.

             @param {Adaptive.ServiceRequest} serviceRequest serviceRequest ServiceRequest with the request body.
             @param {Adaptive.ServiceResultCallback} callback callback       IServiceResultCallback to handle the ServiceResponse.
             @since v2.0.6
          */
          invokeService(serviceRequest : ServiceRequest, callback : IServiceResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(serviceRequest));
               var apiRequest : APIRequest = new APIRequest("IService","invokeService",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredServiceResultCallback);
          }

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
          isServiceRegistered(serviceName : string, endpointName : string, functionName : string, method : IServiceMethod) : boolean {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(serviceName));
               arParams.push(JSON.stringify(endpointName));
               arParams.push(JSON.stringify(functionName));
               arParams.push(JSON.stringify(method));
               var apiRequest : APIRequest = new APIRequest("IService","isServiceRegistered",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : boolean = false;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = JSON.parse(apiResponse.getResponse());
               }
               return response;
          }
     }

     /**
        @class Adaptive.SocketBridge
        @extends Adaptive.BaseCommunicationBridge
        Interface for Managing the Socket operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class SocketBridge extends BaseCommunicationBridge implements ISocket {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.TelephonyBridge
        @extends Adaptive.BaseCommunicationBridge
        Interface for Managing the Telephony operations

        @author Francisco Javier Martin Bueno
        @since v2.0
     */
     export class TelephonyBridge extends BaseCommunicationBridge implements ITelephony {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }

          /**
             @method
             Invoke a phone call

             @param {string} number number to call
             @return {Adaptive.ITelephonyStatus} Status of the call
             @since v2.0
          */
          call(number : string) : ITelephonyStatus {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(number));
               var apiRequest : APIRequest = new APIRequest("ITelephony","call",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : ITelephonyStatus = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = ITelephonyStatus.toObject(JSON.parse(apiResponse.getResponse()));
               }
               return response;
          }
     }

     /**
        @class Adaptive.CloudBridge
        @extends Adaptive.BaseDataBridge
        Interface for Managing the Cloud operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class CloudBridge extends BaseDataBridge implements ICloud {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.DataStreamBridge
        @extends Adaptive.BaseDataBridge
        Interface for Managing the DataStream operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class DataStreamBridge extends BaseDataBridge implements IDataStream {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.DatabaseBridge
        @extends Adaptive.BaseDataBridge
        Interface for Managing the Cloud operations

        @author Ferran Vila Conesa
        @since v2.0
     */
     export class DatabaseBridge extends BaseDataBridge implements IDatabase {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }

          /**
             @method
             Creates a database on default path for every platform.

             @param {Adaptive.Database} database database Database object to create
             @param {Adaptive.DatabaseResultCallback} callback callback Asynchronous callback
             @since v2.0
          */
          createDatabase(database : Database, callback : IDatabaseResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(database));
               var apiRequest : APIRequest = new APIRequest("IDatabase","createDatabase",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredDatabaseResultCallback);
          }

          /**
             @method
             Creates a databaseTable inside a database for every platform.

             @param {Adaptive.Database} database database      Database for databaseTable creating.
             @param {Adaptive.DatabaseTable} databaseTable databaseTable DatabaseTable object with the name of the databaseTable inside.
             @param {Adaptive.DatabaseTableResultCallback} callback callback      DatabaseTable callback with the response
             @since v2.0
          */
          createTable(database : Database, databaseTable : DatabaseTable, callback : IDatabaseTableResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(database));
               arParams.push(JSON.stringify(databaseTable));
               var apiRequest : APIRequest = new APIRequest("IDatabase","createTable",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredDatabaseTableResultCallback);
          }

          /**
             @method
             Deletes a database on default path for every platform.

             @param {Adaptive.Database} database database Database object to delete
             @param {Adaptive.DatabaseResultCallback} callback callback Asynchronous callback
             @since v2.0
          */
          deleteDatabase(database : Database, callback : IDatabaseResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(database));
               var apiRequest : APIRequest = new APIRequest("IDatabase","deleteDatabase",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredDatabaseResultCallback);
          }

          /**
             @method
             Deletes a databaseTable inside a database for every platform.

             @param {Adaptive.Database} database database      Database for databaseTable removal.
             @param {Adaptive.DatabaseTable} databaseTable databaseTable DatabaseTable object with the name of the databaseTable inside.
             @param {Adaptive.DatabaseTableResultCallback} callback callback      DatabaseTable callback with the response
             @since v2.0
          */
          deleteTable(database : Database, databaseTable : DatabaseTable, callback : IDatabaseTableResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(database));
               arParams.push(JSON.stringify(databaseTable));
               var apiRequest : APIRequest = new APIRequest("IDatabase","deleteTable",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredDatabaseTableResultCallback);
          }

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
          executeSqlStatement(database : Database, statement : string, replacements : Array<string>, callback : IDatabaseTableResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(database));
               arParams.push(JSON.stringify(statement));
               arParams.push(JSON.stringify(replacements));
               var apiRequest : APIRequest = new APIRequest("IDatabase","executeSqlStatement",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredDatabaseTableResultCallback);
          }

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
          executeSqlTransactions(database : Database, statements : Array<string>, rollbackFlag : boolean, callback : IDatabaseTableResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(database));
               arParams.push(JSON.stringify(statements));
               arParams.push(JSON.stringify(rollbackFlag));
               var apiRequest : APIRequest = new APIRequest("IDatabase","executeSqlTransactions",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredDatabaseTableResultCallback);
          }

          /**
             @method
             Checks if database exists by given database name.

             @param {Adaptive.Database} database database Database Object to check if exists
             @return {boolean} True if exists, false otherwise
             @since v2.0
          */
          existsDatabase(database : Database) : boolean {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(database));
               var apiRequest : APIRequest = new APIRequest("IDatabase","existsDatabase",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : boolean = false;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = JSON.parse(apiResponse.getResponse());
               }
               return response;
          }

          /**
             @method
             Checks if databaseTable exists by given database name.

             @param {Adaptive.Database} database database      Database for databaseTable consulting.
             @param {Adaptive.DatabaseTable} databaseTable databaseTable DatabaseTable object with the name of the databaseTable inside.
             @return {boolean} True if exists, false otherwise
             @since v2.0
          */
          existsTable(database : Database, databaseTable : DatabaseTable) : boolean {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(database));
               arParams.push(JSON.stringify(databaseTable));
               var apiRequest : APIRequest = new APIRequest("IDatabase","existsTable",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : boolean = false;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = JSON.parse(apiResponse.getResponse());
               }
               return response;
          }
     }

     /**
        @class Adaptive.FileBridge
        @extends Adaptive.BaseDataBridge
        Interface for Managing the File operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class FileBridge extends BaseDataBridge implements IFile {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }

          /**
             @method
             Determine whether the current file/folder can be read from.

             @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
             @return {boolean} True if the folder/file is readable, false otherwise.
             @since v2.0
          */
          canRead(descriptor : FileDescriptor) : boolean {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(descriptor));
               var apiRequest : APIRequest = new APIRequest("IFile","canRead",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : boolean = false;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = JSON.parse(apiResponse.getResponse());
               }
               return response;
          }

          /**
             @method
             Determine whether the current file/folder can be written to.

             @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
             @return {boolean} True if the folder/file is writable, false otherwise.
             @since v2.0
          */
          canWrite(descriptor : FileDescriptor) : boolean {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(descriptor));
               var apiRequest : APIRequest = new APIRequest("IFile","canWrite",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : boolean = false;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = JSON.parse(apiResponse.getResponse());
               }
               return response;
          }

          /**
             @method
             Creates a file with the specified name.

             @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
             @param {Adaptive.FileResultCallback} callback callback   Result of the operation.
             @since v2.0
          */
          create(descriptor : FileDescriptor, callback : IFileResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(descriptor));
               var apiRequest : APIRequest = new APIRequest("IFile","create",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredFileResultCallback);
          }

          /**
             @method
             Deletes the given file or path. If the file is a directory and contains files and or subdirectories, these will be
deleted if the cascade parameter is set to true.

             @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
             @param {boolean} cascade cascade    Whether to delete sub-files and sub-folders.
             @return {boolean} True if files (and sub-files and folders) whether deleted.
             @since v2.0
          */
          delete(descriptor : FileDescriptor, cascade : boolean) : boolean {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(descriptor));
               arParams.push(JSON.stringify(cascade));
               var apiRequest : APIRequest = new APIRequest("IFile","delete",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : boolean = false;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = JSON.parse(apiResponse.getResponse());
               }
               return response;
          }

          /**
             @method
             Check whether the file/path exists.

             @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
             @return {boolean} True if the file exists in the filesystem, false otherwise.
             @since v2.0
          */
          exists(descriptor : FileDescriptor) : boolean {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(descriptor));
               var apiRequest : APIRequest = new APIRequest("IFile","exists",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : boolean = false;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = JSON.parse(apiResponse.getResponse());
               }
               return response;
          }

          /**
             @method
             Loads the content of the file.

             @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
             @param {Adaptive.FileDataLoadResultCallback} callback callback   Result of the operation.
             @since v2.0
          */
          getContent(descriptor : FileDescriptor, callback : IFileDataLoadResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(descriptor));
               var apiRequest : APIRequest = new APIRequest("IFile","getContent",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredFileDataLoadResultCallback);
          }

          /**
             @method
             Returns the file storage type of the file

             @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
             @return {Adaptive.IFileSystemStorageType} Storage Type file
             @since v2.0
          */
          getFileStorageType(descriptor : FileDescriptor) : IFileSystemStorageType {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(descriptor));
               var apiRequest : APIRequest = new APIRequest("IFile","getFileStorageType",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : IFileSystemStorageType = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = IFileSystemStorageType.toObject(JSON.parse(apiResponse.getResponse()));
               }
               return response;
          }

          /**
             @method
             Returns the file type

             @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
             @return {Adaptive.IFileSystemType} Returns the file type of the file
             @since v2.0
          */
          getFileType(descriptor : FileDescriptor) : IFileSystemType {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(descriptor));
               var apiRequest : APIRequest = new APIRequest("IFile","getFileType",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : IFileSystemType = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = IFileSystemType.toObject(JSON.parse(apiResponse.getResponse()));
               }
               return response;
          }

          /**
             @method
             Returns the security type of the file

             @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
             @return {Adaptive.IFileSystemSecurity} Security Level of the file
             @since v2.0
          */
          getSecurityType(descriptor : FileDescriptor) : IFileSystemSecurity {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(descriptor));
               var apiRequest : APIRequest = new APIRequest("IFile","getSecurityType",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : IFileSystemSecurity = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = IFileSystemSecurity.toObject(JSON.parse(apiResponse.getResponse()));
               }
               return response;
          }

          /**
             @method
             Check whether this is a path of a file.

             @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
             @return {boolean} true if this is a path to a folder/directory, false if this is a path to a file.
             @since v2.0
          */
          isDirectory(descriptor : FileDescriptor) : boolean {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(descriptor));
               var apiRequest : APIRequest = new APIRequest("IFile","isDirectory",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : boolean = false;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = JSON.parse(apiResponse.getResponse());
               }
               return response;
          }

          /**
             @method
             List all the files contained within this file/path reference. If the reference is a file, it will not yield
any results.

             @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
             @param {Adaptive.FileListResultCallback} callback callback   Result of operation.
             @since v2.0
          */
          listFiles(descriptor : FileDescriptor, callback : IFileListResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(descriptor));
               var apiRequest : APIRequest = new APIRequest("IFile","listFiles",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredFileListResultCallback);
          }

          /**
             @method
             List all the files matching the speficied regex filter within this file/path reference. If the reference
is a file, it will not yield any results.

             @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
             @param {string} regex regex      Filter (eg. *.jpg, *.png, Fil*) name string.
             @param {Adaptive.FileListResultCallback} callback callback   Result of operation.
             @since v2.0
          */
          listFilesForRegex(descriptor : FileDescriptor, regex : string, callback : IFileListResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(descriptor));
               arParams.push(JSON.stringify(regex));
               var apiRequest : APIRequest = new APIRequest("IFile","listFilesForRegex",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredFileListResultCallback);
          }

          /**
             @method
             Creates the parent path (or paths, if recursive) to the given file/path if it doesn't already exist.

             @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
             @param {boolean} recursive recursive  Whether to create all parent path elements.
             @return {boolean} True if the path was created, false otherwise (or it exists already).
             @since v2.0
          */
          mkDir(descriptor : FileDescriptor, recursive : boolean) : boolean {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(descriptor));
               arParams.push(JSON.stringify(recursive));
               var apiRequest : APIRequest = new APIRequest("IFile","mkDir",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : boolean = false;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = JSON.parse(apiResponse.getResponse());
               }
               return response;
          }

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
          move(source : FileDescriptor, destination : FileDescriptor, createPath : boolean, overwrite : boolean, callback : IFileResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(source));
               arParams.push(JSON.stringify(destination));
               arParams.push(JSON.stringify(createPath));
               arParams.push(JSON.stringify(overwrite));
               var apiRequest : APIRequest = new APIRequest("IFile","move",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredFileResultCallback);
          }

          /**
             @method
             Sets the content of the file.

             @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
             @param {number[]} content content    Binary content to store in the file.
             @param {Adaptive.FileDataStoreResultCallback} callback callback   Result of the operation.
             @since v2.0
          */
          setContent(descriptor : FileDescriptor, content : Array<number>, callback : IFileDataStoreResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(descriptor));
               arParams.push(JSON.stringify(content));
               var apiRequest : APIRequest = new APIRequest("IFile","setContent",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredFileDataStoreResultCallback);
          }
     }

     /**
        @class Adaptive.FileSystemBridge
        @extends Adaptive.BaseDataBridge
        Interface for Managing the File System operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class FileSystemBridge extends BaseDataBridge implements IFileSystem {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
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
          createFileDescriptor(parent : FileDescriptor, name : string) : FileDescriptor {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(parent));
               arParams.push(JSON.stringify(name));
               var apiRequest : APIRequest = new APIRequest("IFileSystem","createFileDescriptor",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : FileDescriptor = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = FileDescriptor.toObject(JSON.parse(apiResponse.getResponse()));
               }
               return response;
          }

          /**
             @method
             Returns a reference to the cache folder for the current application.
This path must always be writable by the current application.
This path is volatile and may be cleaned by the OS periodically.

             @return {Adaptive.FileDescriptor} Path to the application's cache folder.
             @since v2.0
          */
          getApplicationCacheFolder() : FileDescriptor {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IFileSystem","getApplicationCacheFolder",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : FileDescriptor = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = FileDescriptor.toObject(JSON.parse(apiResponse.getResponse()));
               }
               return response;
          }

          /**
             @method
             Returns a reference to the cloud synchronizable folder for the current application.
This path must always be writable by the current application.

             @return {Adaptive.FileDescriptor} Path to the application's cloud storage folder.
             @since v2.0
          */
          getApplicationCloudFolder() : FileDescriptor {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IFileSystem","getApplicationCloudFolder",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : FileDescriptor = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = FileDescriptor.toObject(JSON.parse(apiResponse.getResponse()));
               }
               return response;
          }

          /**
             @method
             Returns a reference to the documents folder for the current application.
This path must always be writable by the current application.

             @return {Adaptive.FileDescriptor} Path to the application's documents folder.
             @since v2.0
          */
          getApplicationDocumentsFolder() : FileDescriptor {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IFileSystem","getApplicationDocumentsFolder",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : FileDescriptor = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = FileDescriptor.toObject(JSON.parse(apiResponse.getResponse()));
               }
               return response;
          }

          /**
             @method
             Returns a reference to the application installation folder.
This path may or may not be directly readable or writable - it usually contains the app binary and data.

             @return {Adaptive.FileDescriptor} Path to the application folder.
             @since v2.0
          */
          getApplicationFolder() : FileDescriptor {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IFileSystem","getApplicationFolder",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : FileDescriptor = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = FileDescriptor.toObject(JSON.parse(apiResponse.getResponse()));
               }
               return response;
          }

          /**
             @method
             Returns a reference to the protected storage folder for the current application.
This path must always be writable by the current application.

             @return {Adaptive.FileDescriptor} Path to the application's protected storage folder.
             @since v2.0
          */
          getApplicationProtectedFolder() : FileDescriptor {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IFileSystem","getApplicationProtectedFolder",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : FileDescriptor = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = FileDescriptor.toObject(JSON.parse(apiResponse.getResponse()));
               }
               return response;
          }

          /**
             @method
             Returns the file system dependent file separator.

             @return {string} char with the directory/file separator.
             @since v2.0
          */
          getSeparator() : string {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IFileSystem","getSeparator",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : string = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = apiResponse.getResponse();
               }
               return response;
          }

          /**
             @method
             Returns a reference to the external storage folder provided by the OS. This may
be an external SSD card or similar. This type of storage is removable and by
definition, not secure.
This path may or may not be writable by the current application.

             @return {Adaptive.FileDescriptor} Path to the application's documents folder.
             @since v2.0
          */
          getSystemExternalFolder() : FileDescriptor {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IFileSystem","getSystemExternalFolder",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : FileDescriptor = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = FileDescriptor.toObject(JSON.parse(apiResponse.getResponse()));
               }
               return response;
          }
     }

     /**
        @class Adaptive.InternalStorageBridge
        @extends Adaptive.BaseDataBridge
        Interface for Managing the Internal Storage operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class InternalStorageBridge extends BaseDataBridge implements IInternalStorage {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.XMLBridge
        @extends Adaptive.BaseDataBridge
        Interface for Managing the XML operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class XMLBridge extends BaseDataBridge implements IXML {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.AudioBridge
        @extends Adaptive.BaseMediaBridge
        Interface for Audio purposes

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class AudioBridge extends BaseMediaBridge implements IAudio {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.CameraBridge
        @extends Adaptive.BaseMediaBridge
        Interface for Managing the camera operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class CameraBridge extends BaseMediaBridge implements ICamera {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.ImagingBridge
        @extends Adaptive.BaseMediaBridge
        Interface for Managing the Imaging operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class ImagingBridge extends BaseMediaBridge implements IImaging {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.VideoBridge
        @extends Adaptive.BaseMediaBridge
        Interface for Managing the Video operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class VideoBridge extends BaseMediaBridge implements IVideo {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }

          /**
             @method
             Play url video stream

             @param {string} url url of the video
             @since v2.0
          */
          playStream(url : string) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(url));
               var apiRequest : APIRequest = new APIRequest("IVideo","playStream",arParams, -1 /* = synchronous call */);
               postRequest(apiRequest);
          }
     }

     /**
        @class Adaptive.AlarmBridge
        @extends Adaptive.BaseNotificationBridge
        Interface for Alarm purposes

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class AlarmBridge extends BaseNotificationBridge implements IAlarm {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.NotificationBridge
        @extends Adaptive.BaseNotificationBridge
        Interface for Managing the Notification operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class NotificationBridge extends BaseNotificationBridge implements INotification {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.NotificationLocalBridge
        @extends Adaptive.BaseNotificationBridge
        Interface for Managing the Local Notifications operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class NotificationLocalBridge extends BaseNotificationBridge implements INotificationLocal {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.VibrationBridge
        @extends Adaptive.BaseNotificationBridge
        Interface for Managing the Vibration operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class VibrationBridge extends BaseNotificationBridge implements IVibration {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.CalendarBridge
        @extends Adaptive.BasePIMBridge
        Interface for Managing the Calendar operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class CalendarBridge extends BasePIMBridge implements ICalendar {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.ContactBridge
        @extends Adaptive.BasePIMBridge
        Interface for Managing the Contact operations

        @author Francisco Javier Martin Bueno
        @since v2.0
     */
     export class ContactBridge extends BasePIMBridge implements IContact {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }

          /**
             @method
             Get all the details of a contact according to its id

             @param {Adaptive.ContactUid} contact contact  id to search for
             @param {Adaptive.ContactResultCallback} callback callback called for return
             @since v2.0
          */
          getContact(contact : ContactUid, callback : IContactResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(contact));
               var apiRequest : APIRequest = new APIRequest("IContact","getContact",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredContactResultCallback);
          }

          /**
             @method
             Get the contact photo

             @param {Adaptive.ContactUid} contact contact  id to search for
             @param {Adaptive.ContactPhotoResultCallback} callback callback called for return
             @since v2.0
          */
          getContactPhoto(contact : ContactUid, callback : IContactPhotoResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(contact));
               var apiRequest : APIRequest = new APIRequest("IContact","getContactPhoto",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredContactPhotoResultCallback);
          }

          /**
             @method
             Get all contacts

             @param {Adaptive.ContactResultCallback} callback callback called for return
             @since v2.0
          */
          getContacts(callback : IContactResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IContact","getContacts",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredContactResultCallback);
          }

          /**
             @method
             Get marked fields of all contacts

             @param {Adaptive.ContactResultCallback} callback callback called for return
             @param {Adaptive.IContactFieldGroup[]} fields fields   to get for each Contact
             @since v2.0
          */
          getContactsForFields(callback : IContactResultCallback, fields : Array<IContactFieldGroup>) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(fields));
               var apiRequest : APIRequest = new APIRequest("IContact","getContactsForFields",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredContactResultCallback);
          }

          /**
             @method
             Get marked fields of all contacts according to a filter

             @param {Adaptive.ContactResultCallback} callback callback called for return
             @param {Adaptive.IContactFieldGroup[]} fields fields   to get for each Contact
             @param {Adaptive.IContactFilter[]} filter filter   to search for
             @since v2.0
          */
          getContactsWithFilter(callback : IContactResultCallback, fields : Array<IContactFieldGroup>, filter : Array<IContactFilter>) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(fields));
               arParams.push(JSON.stringify(filter));
               var apiRequest : APIRequest = new APIRequest("IContact","getContactsWithFilter",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredContactResultCallback);
          }

          /**
             @method
             Search contacts according to a term and send it to the callback

             @param {string} term term     string to search
             @param {Adaptive.ContactResultCallback} callback callback called for return
             @since v2.0
          */
          searchContacts(term : string, callback : IContactResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(term));
               var apiRequest : APIRequest = new APIRequest("IContact","searchContacts",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredContactResultCallback);
          }

          /**
             @method
             Search contacts according to a term with a filter and send it to the callback

             @param {string} term term     string to search
             @param {Adaptive.ContactResultCallback} callback callback called for return
             @param {Adaptive.IContactFilter[]} filter filter   to search for
             @since v2.0
          */
          searchContactsWithFilter(term : string, callback : IContactResultCallback, filter : Array<IContactFilter>) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(term));
               arParams.push(JSON.stringify(filter));
               var apiRequest : APIRequest = new APIRequest("IContact","searchContactsWithFilter",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredContactResultCallback);
          }

          /**
             @method
             Set the contact photo

             @param {Adaptive.ContactUid} contact contact  id to assign the photo
             @param {number[]} pngImage pngImage photo as byte array
             @return {boolean} true if set is successful;false otherwise
             @since v2.0
          */
          setContactPhoto(contact : ContactUid, pngImage : Array<number>) : boolean {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(contact));
               arParams.push(JSON.stringify(pngImage));
               var apiRequest : APIRequest = new APIRequest("IContact","setContactPhoto",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : boolean = false;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = JSON.parse(apiResponse.getResponse());
               }
               return response;
          }
     }

     /**
        @class Adaptive.MailBridge
        @extends Adaptive.BasePIMBridge
        Interface for Managing the Mail operations

        @author Francisco Javier Martin Bueno
        @since v2.0
     */
     export class MailBridge extends BasePIMBridge implements IMail {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }

          /**
             @method
             Send an Email

             @param {Adaptive.Email} data data     Payload of the email
             @param {Adaptive.MessagingCallback} callback callback Result callback of the operation
             @since v2.0
          */
          sendEmail(data : Email, callback : IMessagingCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(data));
               var apiRequest : APIRequest = new APIRequest("IMail","sendEmail",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredMessagingCallback);
          }
     }

     /**
        @class Adaptive.MessagingBridge
        @extends Adaptive.BasePIMBridge
        Interface for Managing the Messaging operations

        @author Francisco Javier Martin Bueno
        @since v2.0
     */
     export class MessagingBridge extends BasePIMBridge implements IMessaging {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }

          /**
             @method
             Send text SMS

             @param {string} number number   to send
             @param {string} text text     to send
             @param {Adaptive.MessagingCallback} callback callback with the result
             @since v2.0
          */
          sendSMS(number : string, text : string, callback : IMessagingCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(number));
               arParams.push(JSON.stringify(text));
               var apiRequest : APIRequest = new APIRequest("IMessaging","sendSMS",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredMessagingCallback);
          }
     }

     /**
        @class Adaptive.BarcodeBridge
        @extends Adaptive.BaseReaderBridge
        Interface for Barcode Reading purposes

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class BarcodeBridge extends BaseReaderBridge implements IBarcode {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.NFCBridge
        @extends Adaptive.BaseReaderBridge
        Interface for Managing the NFC operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class NFCBridge extends BaseReaderBridge implements INFC {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.OCRBridge
        @extends Adaptive.BaseReaderBridge
        Interface for Managing the OCR operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class OCRBridge extends BaseReaderBridge implements IOCR {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.QRCodeBridge
        @extends Adaptive.BaseReaderBridge
        Interface for Managing the QR Code operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class QRCodeBridge extends BaseReaderBridge implements IQRCode {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.OAuthBridge
        @extends Adaptive.BaseSecurityBridge
        Interface for Managing the OAuth operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class OAuthBridge extends BaseSecurityBridge implements IOAuth {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.OpenIdBridge
        @extends Adaptive.BaseSecurityBridge
        Interface for Managing the OpenID operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class OpenIdBridge extends BaseSecurityBridge implements IOpenId {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.SecurityBridge
        @extends Adaptive.BaseSecurityBridge
        Interface for Managing the Security operations

        @author Aryslan
        @since v2.0
     */
     export class SecurityBridge extends BaseSecurityBridge implements ISecurity {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }

          /**
             @method
             Deletes from the device internal storage the entry/entries containing the specified key names.

             @param {string[]} keys keys             Array with the key names to delete.
             @param {string} publicAccessName publicAccessName The name of the shared internal storage object (if needed).
             @param {Adaptive.SecurityResultCallback} callback callback         callback to be executed upon function result.
             @since v2.0
          */
          deleteSecureKeyValuePairs(keys : Array<string>, publicAccessName : string, callback : ISecurityResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(keys));
               arParams.push(JSON.stringify(publicAccessName));
               var apiRequest : APIRequest = new APIRequest("ISecurity","deleteSecureKeyValuePairs",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredSecurityResultCallback);
          }

          /**
             @method
             Retrieves from the device internal storage the entry/entries containing the specified key names.

             @param {string[]} keys keys             Array with the key names to retrieve.
             @param {string} publicAccessName publicAccessName The name of the shared internal storage object (if needed).
             @param {Adaptive.SecurityResultCallback} callback callback         callback to be executed upon function result.
             @since v2.0
          */
          getSecureKeyValuePairs(keys : Array<string>, publicAccessName : string, callback : ISecurityResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(keys));
               arParams.push(JSON.stringify(publicAccessName));
               var apiRequest : APIRequest = new APIRequest("ISecurity","getSecureKeyValuePairs",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredSecurityResultCallback);
          }

          /**
             @method
             Returns if the device has been modified in anyhow

             @return {boolean} true if the device has been modified; false otherwise
             @since v2.0
          */
          isDeviceModified() : boolean {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("ISecurity","isDeviceModified",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : boolean = false;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = JSON.parse(apiResponse.getResponse());
               }
               return response;
          }

          /**
             @method
             Stores in the device internal storage the specified item/s.

             @param {Adaptive.SecureKeyPair[]} keyValues keyValues        Array containing the items to store on the device internal memory.
             @param {string} publicAccessName publicAccessName The name of the shared internal storage object (if needed).
             @param {Adaptive.SecurityResultCallback} callback callback         callback to be executed upon function result.
             @since v2.0
          */
          setSecureKeyValuePairs(keyValues : Array<SecureKeyPair>, publicAccessName : string, callback : ISecurityResultCallback) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(keyValues));
               arParams.push(JSON.stringify(publicAccessName));
               var apiRequest : APIRequest = new APIRequest("ISecurity","setSecureKeyValuePairs",arParams, callback.getId());
               postRequestCallback(apiRequest, callback, registeredSecurityResultCallback);
          }
     }

     /**
        @class Adaptive.AccelerationBridge
        @extends Adaptive.BaseSensorBridge
        Interface defining methods about the acceleration sensor

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class AccelerationBridge extends BaseSensorBridge implements IAcceleration {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }

          /**
             @method
             Register a new listener that will receive acceleration events.

             @param {Adaptive.AccelerationListener} listener listener to be registered.
             @since v2.0
          */
          addAccelerationListener(listener : IAccelerationListener) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IAcceleration","addAccelerationListener",arParams, listener.getId());
               postRequestListener(apiRequest, listener, registeredAccelerationListener);
          }

          /**
             @method
             De-registers an existing listener from receiving acceleration events.

             @param {Adaptive.AccelerationListener} listener listener to be registered.
             @since v2.0
          */
          removeAccelerationListener(listener : IAccelerationListener) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IAcceleration","removeAccelerationListener",arParams, listener.getId());
               postRequestListener(apiRequest, listener, registeredAccelerationListener);
          }

          /**
             @method
             Removed all existing listeners from receiving acceleration events.

             @since v2.0
          */
          removeAccelerationListeners() : void {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IAcceleration","removeAccelerationListeners",arParams, -1);
               postRequestListener(apiRequest, null, registeredAccelerationListener);
          }
     }

     /**
        @class Adaptive.AmbientLightBridge
        @extends Adaptive.BaseSensorBridge
        Interface for managinf the Ambient Light

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class AmbientLightBridge extends BaseSensorBridge implements IAmbientLight {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.BarometerBridge
        @extends Adaptive.BaseSensorBridge
        Interface for Barometer management purposes

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class BarometerBridge extends BaseSensorBridge implements IBarometer {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.GeolocationBridge
        @extends Adaptive.BaseSensorBridge
        Interface for Managing the Geolocation operations

        @author Francisco Javier Martin Bueno
        @since v2.0
     */
     export class GeolocationBridge extends BaseSensorBridge implements IGeolocation {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }

          /**
             @method
             Register a new listener that will receive geolocation events.

             @param {Adaptive.GeolocationListener} listener listener to be registered.
             @since v2.0
          */
          addGeolocationListener(listener : IGeolocationListener) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IGeolocation","addGeolocationListener",arParams, listener.getId());
               postRequestListener(apiRequest, listener, registeredGeolocationListener);
          }

          /**
             @method
             De-registers an existing listener from receiving geolocation events.

             @param {Adaptive.GeolocationListener} listener listener to be registered.
             @since v2.0
          */
          removeGeolocationListener(listener : IGeolocationListener) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IGeolocation","removeGeolocationListener",arParams, listener.getId());
               postRequestListener(apiRequest, listener, registeredGeolocationListener);
          }

          /**
             @method
             Removed all existing listeners from receiving geolocation events.

             @since v2.0
          */
          removeGeolocationListeners() : void {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IGeolocation","removeGeolocationListeners",arParams, -1);
               postRequestListener(apiRequest, null, registeredGeolocationListener);
          }
     }

     /**
        @class Adaptive.GyroscopeBridge
        @extends Adaptive.BaseSensorBridge
        Interface for Managing the Giroscope operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class GyroscopeBridge extends BaseSensorBridge implements IGyroscope {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.MagnetometerBridge
        @extends Adaptive.BaseSensorBridge
        Interface for Managing the Magnetometer operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class MagnetometerBridge extends BaseSensorBridge implements IMagnetometer {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.ProximityBridge
        @extends Adaptive.BaseSensorBridge
        Interface for Managing the Proximity operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class ProximityBridge extends BaseSensorBridge implements IProximity {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.FacebookBridge
        @extends Adaptive.BaseSocialBridge
        Interface for Managing the Facebook operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class FacebookBridge extends BaseSocialBridge implements IFacebook {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.GooglePlusBridge
        @extends Adaptive.BaseSocialBridge
        Interface for Managing the Google Plus operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class GooglePlusBridge extends BaseSocialBridge implements IGooglePlus {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.LinkedInBridge
        @extends Adaptive.BaseSocialBridge
        Interface for Managing the Linkedin operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class LinkedInBridge extends BaseSocialBridge implements ILinkedIn {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.RSSBridge
        @extends Adaptive.BaseSocialBridge
        Interface for Managing the RSS operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class RSSBridge extends BaseSocialBridge implements IRSS {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.TwitterBridge
        @extends Adaptive.BaseSocialBridge
        Interface for Managing the Twitter operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class TwitterBridge extends BaseSocialBridge implements ITwitter {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.CapabilitiesBridge
        @extends Adaptive.BaseSystemBridge
        Interface for testing the Capabilities operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class CapabilitiesBridge extends BaseSystemBridge implements ICapabilities {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }

          /**
             @method
             Obtains the default orientation of the device/display. If no default orientation is available on
the platform, this method will return the current orientation. To capture device or display orientation
changes please use the IDevice and IDisplay functions and listeners API respectively.

             @return {Adaptive.ICapabilitiesOrientation} The default orientation for the device/display.
             @since v2.0.5
          */
          getOrientationDefault() : ICapabilitiesOrientation {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("ICapabilities","getOrientationDefault",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : ICapabilitiesOrientation = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = ICapabilitiesOrientation.toObject(JSON.parse(apiResponse.getResponse()));
               }
               return response;
          }

          /**
             @method
             Provides the device/display orientations supported by the platform. A platform will usually
support at least one orientation. This is usually PortaitUp.

             @return {Adaptive.ICapabilitiesOrientation[]} The orientations supported by the device/display of the platform.
             @since v2.0.5
          */
          getOrientationsSupported() : Array<ICapabilitiesOrientation> {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("ICapabilities","getOrientationsSupported",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : Array<ICapabilitiesOrientation> = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = new Array<ICapabilitiesOrientation>();
                    var responseArray : [any] = JSON.parse(apiResponse.getResponse());
                    for(var i = 0;i < responseArray.length; i++) {
                         response.push(ICapabilitiesOrientation.toObject(responseArray[i]));
                    }
               }
               return response;
          }

          /**
             @method
             Determines whether a specific hardware button is supported for interaction.

             @param {Adaptive.ICapabilitiesButton} type type Type of feature to check.
             @return {boolean} true is supported, false otherwise.
             @since v2.0
          */
          hasButtonSupport(type : ICapabilitiesButton) : boolean {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(type));
               var apiRequest : APIRequest = new APIRequest("ICapabilities","hasButtonSupport",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : boolean = false;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = JSON.parse(apiResponse.getResponse());
               }
               return response;
          }

          /**
             @method
             Determines whether a specific Communication capability is supported by
the device.

             @param {Adaptive.ICapabilitiesCommunication} type type Type of feature to check.
             @return {boolean} true if supported, false otherwise.
             @since v2.0
          */
          hasCommunicationSupport(type : ICapabilitiesCommunication) : boolean {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(type));
               var apiRequest : APIRequest = new APIRequest("ICapabilities","hasCommunicationSupport",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : boolean = false;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = JSON.parse(apiResponse.getResponse());
               }
               return response;
          }

          /**
             @method
             Determines whether a specific Data capability is supported by the device.

             @param {Adaptive.ICapabilitiesData} type type Type of feature to check.
             @return {boolean} true if supported, false otherwise.
             @since v2.0
          */
          hasDataSupport(type : ICapabilitiesData) : boolean {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(type));
               var apiRequest : APIRequest = new APIRequest("ICapabilities","hasDataSupport",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : boolean = false;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = JSON.parse(apiResponse.getResponse());
               }
               return response;
          }

          /**
             @method
             Determines whether a specific Media capability is supported by the
device.

             @param {Adaptive.ICapabilitiesMedia} type type Type of feature to check.
             @return {boolean} true if supported, false otherwise.
             @since v2.0
          */
          hasMediaSupport(type : ICapabilitiesMedia) : boolean {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(type));
               var apiRequest : APIRequest = new APIRequest("ICapabilities","hasMediaSupport",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : boolean = false;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = JSON.parse(apiResponse.getResponse());
               }
               return response;
          }

          /**
             @method
             Determines whether a specific Net capability is supported by the device.

             @param {Adaptive.ICapabilitiesNet} type type Type of feature to check.
             @return {boolean} true if supported, false otherwise.
             @since v2.0
          */
          hasNetSupport(type : ICapabilitiesNet) : boolean {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(type));
               var apiRequest : APIRequest = new APIRequest("ICapabilities","hasNetSupport",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : boolean = false;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = JSON.parse(apiResponse.getResponse());
               }
               return response;
          }

          /**
             @method
             Determines whether a specific Notification capability is supported by the
device.

             @param {Adaptive.ICapabilitiesNotification} type type Type of feature to check.
             @return {boolean} true if supported, false otherwise.
             @since v2.0
          */
          hasNotificationSupport(type : ICapabilitiesNotification) : boolean {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(type));
               var apiRequest : APIRequest = new APIRequest("ICapabilities","hasNotificationSupport",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : boolean = false;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = JSON.parse(apiResponse.getResponse());
               }
               return response;
          }

          /**
             @method
             Determines whether the device/display supports a given orientation.

             @param {Adaptive.ICapabilitiesOrientation} orientation orientation Orientation type.
             @return {boolean} True if the given orientation is supported, false otherwise.
             @since v2.0.5
          */
          hasOrientationSupport(orientation : ICapabilitiesOrientation) : boolean {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(orientation));
               var apiRequest : APIRequest = new APIRequest("ICapabilities","hasOrientationSupport",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : boolean = false;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = JSON.parse(apiResponse.getResponse());
               }
               return response;
          }

          /**
             @method
             Determines whether a specific Sensor capability is supported by the
device.

             @param {Adaptive.ICapabilitiesSensor} type type Type of feature to check.
             @return {boolean} true if supported, false otherwise.
             @since v2.0
          */
          hasSensorSupport(type : ICapabilitiesSensor) : boolean {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(type));
               var apiRequest : APIRequest = new APIRequest("ICapabilities","hasSensorSupport",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : boolean = false;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = JSON.parse(apiResponse.getResponse());
               }
               return response;
          }
     }

     /**
        @class Adaptive.DeviceBridge
        @extends Adaptive.BaseSystemBridge
        Interface for Managing the Device operations

        @author Francisco Javier Martin Bueno
        @since v2.0
     */
     export class DeviceBridge extends BaseSystemBridge implements IDevice {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }

          /**
             @method
             Register a new listener that will receive button events.

             @param {Adaptive.ButtonListener} listener listener to be registered.
             @since v2.0
          */
          addButtonListener(listener : IButtonListener) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IDevice","addButtonListener",arParams, listener.getId());
               postRequestListener(apiRequest, listener, registeredButtonListener);
          }

          /**
             @method
             Add a listener to start receiving device orientation change events.

             @param {Adaptive.DeviceOrientationListener} listener listener Listener to add to receive orientation change events.
             @since v2.0.5
          */
          addDeviceOrientationListener(listener : IDeviceOrientationListener) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IDevice","addDeviceOrientationListener",arParams, listener.getId());
               postRequestListener(apiRequest, listener, registeredDeviceOrientationListener);
          }

          /**
             @method
             Returns the device information for the current device executing the runtime.

             @return {Adaptive.DeviceInfo} DeviceInfo for the current device.
             @since v2.0
          */
          getDeviceInfo() : DeviceInfo {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IDevice","getDeviceInfo",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : DeviceInfo = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = DeviceInfo.toObject(JSON.parse(apiResponse.getResponse()));
               }
               return response;
          }

          /**
             @method
             Gets the current Locale for the device.

             @return {Adaptive.Locale} The current Locale information.
             @since v2.0
          */
          getLocaleCurrent() : Locale {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IDevice","getLocaleCurrent",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : Locale = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = Locale.toObject(JSON.parse(apiResponse.getResponse()));
               }
               return response;
          }

          /**
             @method
             Returns the current orientation of the device. Please note that this may be different from the orientation
of the display. For display orientation, use the IDisplay APIs.

             @return {Adaptive.ICapabilitiesOrientation} The current orientation of the device.
             @since v2.0.5
          */
          getOrientationCurrent() : ICapabilitiesOrientation {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IDevice","getOrientationCurrent",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : ICapabilitiesOrientation = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = ICapabilitiesOrientation.toObject(JSON.parse(apiResponse.getResponse()));
               }
               return response;
          }

          /**
             @method
             De-registers an existing listener from receiving button events.

             @param {Adaptive.ButtonListener} listener listener to be removed.
             @since v2.0
          */
          removeButtonListener(listener : IButtonListener) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IDevice","removeButtonListener",arParams, listener.getId());
               postRequestListener(apiRequest, listener, registeredButtonListener);
          }

          /**
             @method
             Removed all existing listeners from receiving button events.

             @since v2.0
          */
          removeButtonListeners() : void {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IDevice","removeButtonListeners",arParams, -1);
               postRequestListener(apiRequest, null, registeredButtonListener);
          }

          /**
             @method
             Remove a listener to stop receiving device orientation change events.

             @param {Adaptive.DeviceOrientationListener} listener listener Listener to remove from receiving orientation change events.
             @since v2.0.5
          */
          removeDeviceOrientationListener(listener : IDeviceOrientationListener) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IDevice","removeDeviceOrientationListener",arParams, listener.getId());
               postRequestListener(apiRequest, listener, registeredDeviceOrientationListener);
          }

          /**
             @method
             Remove all listeners receiving device orientation events.

             @since v2.0.5
          */
          removeDeviceOrientationListeners() : void {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IDevice","removeDeviceOrientationListeners",arParams, -1);
               postRequestListener(apiRequest, null, registeredDeviceOrientationListener);
          }
     }

     /**
        @class Adaptive.DisplayBridge
        @extends Adaptive.BaseSystemBridge
        Interface for Managing the Display operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class DisplayBridge extends BaseSystemBridge implements IDisplay {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }

          /**
             @method
             Add a listener to start receiving display orientation change events.

             @param {Adaptive.DisplayOrientationListener} listener listener Listener to add to receive orientation change events.
             @since v2.0.5
          */
          addDisplayOrientationListener(listener : IDisplayOrientationListener) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IDisplay","addDisplayOrientationListener",arParams, listener.getId());
               postRequestListener(apiRequest, listener, registeredDisplayOrientationListener);
          }

          /**
             @method
             Returns the current orientation of the display. Please note that this may be different from the orientation
of the device. For device orientation, use the IDevice APIs.

             @return {Adaptive.ICapabilitiesOrientation} The current orientation of the display.
             @since v2.0.5
          */
          getOrientationCurrent() : ICapabilitiesOrientation {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IDisplay","getOrientationCurrent",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : ICapabilitiesOrientation = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = ICapabilitiesOrientation.toObject(JSON.parse(apiResponse.getResponse()));
               }
               return response;
          }

          /**
             @method
             Remove a listener to stop receiving display orientation change events.

             @param {Adaptive.DisplayOrientationListener} listener listener Listener to remove from receiving orientation change events.
             @since v2.0.5
          */
          removeDisplayOrientationListener(listener : IDisplayOrientationListener) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IDisplay","removeDisplayOrientationListener",arParams, listener.getId());
               postRequestListener(apiRequest, listener, registeredDisplayOrientationListener);
          }

          /**
             @method
             Remove all listeners receiving display orientation events.

             @since v2.0.5
          */
          removeDisplayOrientationListeners() : void {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IDisplay","removeDisplayOrientationListeners",arParams, -1);
               postRequestListener(apiRequest, null, registeredDisplayOrientationListener);
          }
     }

     /**
        @class Adaptive.OSBridge
        @extends Adaptive.BaseSystemBridge
        Interface for Managing the OS operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class OSBridge extends BaseSystemBridge implements IOS {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }

          /**
             @method
             Returns the OSInfo for the current operating system.

             @return {Adaptive.OSInfo} OSInfo with name, version and vendor of the OS.
             @since v2.0
          */
          getOSInfo() : OSInfo {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IOS","getOSInfo",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : OSInfo = null;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = OSInfo.toObject(JSON.parse(apiResponse.getResponse()));
               }
               return response;
          }
     }

     /**
        @class Adaptive.RuntimeBridge
        @extends Adaptive.BaseSystemBridge
        Interface for Managing the Runtime operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class RuntimeBridge extends BaseSystemBridge implements IRuntime {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }

          /**
             @method
             Dismiss the current Application

             @since v2.0
          */
          dismissApplication() : void {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IRuntime","dismissApplication",arParams, -1 /* = synchronous call */);
               postRequest(apiRequest);
          }

          /**
             @method
             Whether the application dismiss the splash screen successfully or not

             @return {boolean} true if the application has dismissed the splash screen;false otherwise
             @since v2.0
          */
          dismissSplashScreen() : boolean {
               // Create and populate API request.
               var arParams : string[] = [];
               var apiRequest : APIRequest = new APIRequest("IRuntime","dismissSplashScreen",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : boolean = false;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = JSON.parse(apiResponse.getResponse());
               }
               return response;
          }
     }

     /**
        @class Adaptive.BrowserBridge
        @extends Adaptive.BaseUIBridge
        Interface for Managing the browser operations

        @author Francisco Javier Martin Bueno
        @since v2.0
     */
     export class BrowserBridge extends BaseUIBridge implements IBrowser {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }

          /**
             @method
             Method for opening a URL like a link in the native default browser

             @param {string} url url Url to open
             @return {boolean} The result of the operation
             @since v2.0
          */
          openExtenalBrowser(url : string) : boolean {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(url));
               var apiRequest : APIRequest = new APIRequest("IBrowser","openExtenalBrowser",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : boolean = false;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = JSON.parse(apiResponse.getResponse());
               }
               return response;
          }

          /**
             @method
             Method for opening a browser embedded into the application

             @param {string} url url            Url to open
             @param {string} title title          Title of the Navigation bar
             @param {string} backButtonText backButtonText Title of the Back button bar
             @return {boolean} The result of the operation
             @since v2.0
          */
          openInternalBrowser(url : string, title : string, backButtonText : string) : boolean {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(url));
               arParams.push(JSON.stringify(title));
               arParams.push(JSON.stringify(backButtonText));
               var apiRequest : APIRequest = new APIRequest("IBrowser","openInternalBrowser",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : boolean = false;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = JSON.parse(apiResponse.getResponse());
               }
               return response;
          }

          /**
             @method
             Method for opening a browser embedded into the application in a modal window

             @param {string} url url            Url to open
             @param {string} title title          Title of the Navigation bar
             @param {string} backButtonText backButtonText Title of the Back button bar
             @return {boolean} The result of the operation
             @since v2.0
          */
          openInternalBrowserModal(url : string, title : string, backButtonText : string) : boolean {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(url));
               arParams.push(JSON.stringify(title));
               arParams.push(JSON.stringify(backButtonText));
               var apiRequest : APIRequest = new APIRequest("IBrowser","openInternalBrowserModal",arParams, -1 /* = synchronous call */);
               var apiResponse = postRequest(apiRequest);
               // Prepare response.
               var response : boolean = false;
               // Check response.
               if (apiResponse != null && apiResponse.getStatusCode() === 200) {
                    response = JSON.parse(apiResponse.getResponse());
               }
               return response;
          }
     }

     /**
        @class Adaptive.DesktopBridge
        @extends Adaptive.BaseUIBridge
        Interface for Managing the Desktop operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class DesktopBridge extends BaseUIBridge implements IDesktop {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.MapBridge
        @extends Adaptive.BaseUIBridge
        Interface for Managing the Map operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class MapBridge extends BaseUIBridge implements IMap {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.UIBridge
        @extends Adaptive.BaseUIBridge
        Interface for Managing the UI operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class UIBridge extends BaseUIBridge implements IUI {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.CompressionBridge
        @extends Adaptive.BaseUtilBridge
        Interface for Managing the Compression operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class CompressionBridge extends BaseUtilBridge implements ICompression {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.ConcurrentBridge
        @extends Adaptive.BaseUtilBridge
        Interface for Managing the Concurrent operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class ConcurrentBridge extends BaseUtilBridge implements IConcurrent {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.CryptoBridge
        @extends Adaptive.BaseUtilBridge
        Interface for Managing the Cloud operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class CryptoBridge extends BaseUtilBridge implements ICrypto {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.LoggingBridge
        @extends Adaptive.BaseUtilBridge
        Interface for Managing the Logging operations

        @author Ferran Vila Conesa
        @since v2.0
     */
     export class LoggingBridge extends BaseUtilBridge implements ILogging {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }

          /**
             Logs the given message, with the given log level if specified, to the standard platform/environment.

             @param level   Log level
             @param message Message to be logged
             @since v2.0
          */
          logLevelMessage(level : ILoggingLogLevel, message : string) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(level));
               arParams.push(JSON.stringify(message));
               var apiRequest : APIRequest = new APIRequest("ILogging","logLevelMessage",arParams, -1 /* = synchronous call */);
               postRequest(apiRequest);
          }

          /**
             Logs the given message, with the given log level if specified, to the standard platform/environment.

             @param level    Log level
             @param category Category/tag name to identify/filter the log.
             @param message  Message to be logged
             @since v2.0
          */
          logLevelCategoryMessage(level : ILoggingLogLevel, category : string, message : string) : void {
               // Create and populate API request.
               var arParams : string[] = [];
               arParams.push(JSON.stringify(level));
               arParams.push(JSON.stringify(category));
               arParams.push(JSON.stringify(message));
               var apiRequest : APIRequest = new APIRequest("ILogging","logLevelCategoryMessage",arParams, -1 /* = synchronous call */);
               postRequest(apiRequest);
          }
     }

     /**
        @class Adaptive.TimerBridge
        @extends Adaptive.BaseUtilBridge
        Interface for Managing the Timer operations

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class TimerBridge extends BaseUtilBridge implements ITimer {

          /**
             @method constructor
             Default constructor.
          */
          constructor() {
               super();
          }
     }

     /**
        @class Adaptive.AppRegistryBridge
        Interface to retrieve auto-registered service implementation references.

        @author Carlos Lozano Diez
        @since v2.0
     */
     export class AppRegistryBridge implements IAppRegistry {

          /**
             @private
             @static
             @property {Adaptive.AppRegistryBridge} instance
             Singleton instance of AppRegistry.
          */
          private static instance : IAppRegistry = null;

          /**
             @static
             @singleton
             @method
             Singleton instance of AppRegistry.
             @return {Adaptive.AppRegistryBridge}
          */
          public static getInstance() : IAppRegistry {
               if (AppRegistryBridge.instance === null) {
                    AppRegistryBridge.instance = new AppRegistryBridge();
               }
               return AppRegistryBridge.instance;
          }

          /**
             @private
             @property {Adaptive.IAcceleration} instanceAcceleration
          */
          private static instanceAcceleration : IAcceleration = null;
          /**
             @private
             @property {Adaptive.IAds} instanceAds
          */
          private static instanceAds : IAds = null;
          /**
             @private
             @property {Adaptive.IAlarm} instanceAlarm
          */
          private static instanceAlarm : IAlarm = null;
          /**
             @private
             @property {Adaptive.IAmbientLight} instanceAmbientLight
          */
          private static instanceAmbientLight : IAmbientLight = null;
          /**
             @private
             @property {Adaptive.IAnalytics} instanceAnalytics
          */
          private static instanceAnalytics : IAnalytics = null;
          /**
             @private
             @property {Adaptive.IAudio} instanceAudio
          */
          private static instanceAudio : IAudio = null;
          /**
             @private
             @property {Adaptive.IBarcode} instanceBarcode
          */
          private static instanceBarcode : IBarcode = null;
          /**
             @private
             @property {Adaptive.IBarometer} instanceBarometer
          */
          private static instanceBarometer : IBarometer = null;
          /**
             @private
             @property {Adaptive.IBluetooth} instanceBluetooth
          */
          private static instanceBluetooth : IBluetooth = null;
          /**
             @private
             @property {Adaptive.IBrowser} instanceBrowser
          */
          private static instanceBrowser : IBrowser = null;
          /**
             @private
             @property {Adaptive.ICalendar} instanceCalendar
          */
          private static instanceCalendar : ICalendar = null;
          /**
             @private
             @property {Adaptive.ICamera} instanceCamera
          */
          private static instanceCamera : ICamera = null;
          /**
             @private
             @property {Adaptive.ICapabilities} instanceCapabilities
          */
          private static instanceCapabilities : ICapabilities = null;
          /**
             @private
             @property {Adaptive.ICloud} instanceCloud
          */
          private static instanceCloud : ICloud = null;
          /**
             @private
             @property {Adaptive.ICompression} instanceCompression
          */
          private static instanceCompression : ICompression = null;
          /**
             @private
             @property {Adaptive.IConcurrent} instanceConcurrent
          */
          private static instanceConcurrent : IConcurrent = null;
          /**
             @private
             @property {Adaptive.IContact} instanceContact
          */
          private static instanceContact : IContact = null;
          /**
             @private
             @property {Adaptive.ICrypto} instanceCrypto
          */
          private static instanceCrypto : ICrypto = null;
          /**
             @private
             @property {Adaptive.IDataStream} instanceDataStream
          */
          private static instanceDataStream : IDataStream = null;
          /**
             @private
             @property {Adaptive.IDatabase} instanceDatabase
          */
          private static instanceDatabase : IDatabase = null;
          /**
             @private
             @property {Adaptive.IDesktop} instanceDesktop
          */
          private static instanceDesktop : IDesktop = null;
          /**
             @private
             @property {Adaptive.IDevice} instanceDevice
          */
          private static instanceDevice : IDevice = null;
          /**
             @private
             @property {Adaptive.IDisplay} instanceDisplay
          */
          private static instanceDisplay : IDisplay = null;
          /**
             @private
             @property {Adaptive.IFacebook} instanceFacebook
          */
          private static instanceFacebook : IFacebook = null;
          /**
             @private
             @property {Adaptive.IFile} instanceFile
          */
          private static instanceFile : IFile = null;
          /**
             @private
             @property {Adaptive.IFileSystem} instanceFileSystem
          */
          private static instanceFileSystem : IFileSystem = null;
          /**
             @private
             @property {Adaptive.IGeolocation} instanceGeolocation
          */
          private static instanceGeolocation : IGeolocation = null;
          /**
             @private
             @property {Adaptive.IGlobalization} instanceGlobalization
          */
          private static instanceGlobalization : IGlobalization = null;
          /**
             @private
             @property {Adaptive.IGooglePlus} instanceGooglePlus
          */
          private static instanceGooglePlus : IGooglePlus = null;
          /**
             @private
             @property {Adaptive.IGyroscope} instanceGyroscope
          */
          private static instanceGyroscope : IGyroscope = null;
          /**
             @private
             @property {Adaptive.IImaging} instanceImaging
          */
          private static instanceImaging : IImaging = null;
          /**
             @private
             @property {Adaptive.IInternalStorage} instanceInternalStorage
          */
          private static instanceInternalStorage : IInternalStorage = null;
          /**
             @private
             @property {Adaptive.ILifecycle} instanceLifecycle
          */
          private static instanceLifecycle : ILifecycle = null;
          /**
             @private
             @property {Adaptive.ILinkedIn} instanceLinkedIn
          */
          private static instanceLinkedIn : ILinkedIn = null;
          /**
             @private
             @property {Adaptive.ILogging} instanceLogging
          */
          private static instanceLogging : ILogging = null;
          /**
             @private
             @property {Adaptive.IMagnetometer} instanceMagnetometer
          */
          private static instanceMagnetometer : IMagnetometer = null;
          /**
             @private
             @property {Adaptive.IMail} instanceMail
          */
          private static instanceMail : IMail = null;
          /**
             @private
             @property {Adaptive.IManagement} instanceManagement
          */
          private static instanceManagement : IManagement = null;
          /**
             @private
             @property {Adaptive.IMap} instanceMap
          */
          private static instanceMap : IMap = null;
          /**
             @private
             @property {Adaptive.IMessaging} instanceMessaging
          */
          private static instanceMessaging : IMessaging = null;
          /**
             @private
             @property {Adaptive.INFC} instanceNFC
          */
          private static instanceNFC : INFC = null;
          /**
             @private
             @property {Adaptive.INetworkInfo} instanceNetworkInfo
          */
          private static instanceNetworkInfo : INetworkInfo = null;
          /**
             @private
             @property {Adaptive.INetworkNaming} instanceNetworkNaming
          */
          private static instanceNetworkNaming : INetworkNaming = null;
          /**
             @private
             @property {Adaptive.INetworkReachability} instanceNetworkReachability
          */
          private static instanceNetworkReachability : INetworkReachability = null;
          /**
             @private
             @property {Adaptive.INetworkStatus} instanceNetworkStatus
          */
          private static instanceNetworkStatus : INetworkStatus = null;
          /**
             @private
             @property {Adaptive.INotification} instanceNotification
          */
          private static instanceNotification : INotification = null;
          /**
             @private
             @property {Adaptive.INotificationLocal} instanceNotificationLocal
          */
          private static instanceNotificationLocal : INotificationLocal = null;
          /**
             @private
             @property {Adaptive.IOAuth} instanceOAuth
          */
          private static instanceOAuth : IOAuth = null;
          /**
             @private
             @property {Adaptive.IOCR} instanceOCR
          */
          private static instanceOCR : IOCR = null;
          /**
             @private
             @property {Adaptive.IOS} instanceOS
          */
          private static instanceOS : IOS = null;
          /**
             @private
             @property {Adaptive.IOpenId} instanceOpenId
          */
          private static instanceOpenId : IOpenId = null;
          /**
             @private
             @property {Adaptive.IPrinting} instancePrinting
          */
          private static instancePrinting : IPrinting = null;
          /**
             @private
             @property {Adaptive.IProximity} instanceProximity
          */
          private static instanceProximity : IProximity = null;
          /**
             @private
             @property {Adaptive.IQRCode} instanceQRCode
          */
          private static instanceQRCode : IQRCode = null;
          /**
             @private
             @property {Adaptive.IRSS} instanceRSS
          */
          private static instanceRSS : IRSS = null;
          /**
             @private
             @property {Adaptive.IRuntime} instanceRuntime
          */
          private static instanceRuntime : IRuntime = null;
          /**
             @private
             @property {Adaptive.ISecurity} instanceSecurity
          */
          private static instanceSecurity : ISecurity = null;
          /**
             @private
             @property {Adaptive.IService} instanceService
          */
          private static instanceService : IService = null;
          /**
             @private
             @property {Adaptive.ISettings} instanceSettings
          */
          private static instanceSettings : ISettings = null;
          /**
             @private
             @property {Adaptive.ISocket} instanceSocket
          */
          private static instanceSocket : ISocket = null;
          /**
             @private
             @property {Adaptive.IStore} instanceStore
          */
          private static instanceStore : IStore = null;
          /**
             @private
             @property {Adaptive.ITelephony} instanceTelephony
          */
          private static instanceTelephony : ITelephony = null;
          /**
             @private
             @property {Adaptive.ITimer} instanceTimer
          */
          private static instanceTimer : ITimer = null;
          /**
             @private
             @property {Adaptive.ITwitter} instanceTwitter
          */
          private static instanceTwitter : ITwitter = null;
          /**
             @private
             @property {Adaptive.IUI} instanceUI
          */
          private static instanceUI : IUI = null;
          /**
             @private
             @property {Adaptive.IUpdate} instanceUpdate
          */
          private static instanceUpdate : IUpdate = null;
          /**
             @private
             @property {Adaptive.IVibration} instanceVibration
          */
          private static instanceVibration : IVibration = null;
          /**
             @private
             @property {Adaptive.IVideo} instanceVideo
          */
          private static instanceVideo : IVideo = null;
          /**
             @private
             @property {Adaptive.IWallet} instanceWallet
          */
          private static instanceWallet : IWallet = null;
          /**
             @private
             @property {Adaptive.IXML} instanceXML
          */
          private static instanceXML : IXML = null;

          /**
             @method
             Obtain a reference to the IAcceleration bridge.

             @return {Adaptive.AccelerationBridge} bridge instance.
          */
          public getAccelerationBridge() : IAcceleration {
               if (AppRegistryBridge.instanceAcceleration === null) {
                    AppRegistryBridge.instanceAcceleration= new AccelerationBridge();
               }
               return AppRegistryBridge.instanceAcceleration;
          }

          /**
             @method
             Obtain a reference to the IAds bridge.

             @return {Adaptive.AdsBridge} bridge instance.
          */
          public getAdsBridge() : IAds {
               if (AppRegistryBridge.instanceAds === null) {
                    AppRegistryBridge.instanceAds= new AdsBridge();
               }
               return AppRegistryBridge.instanceAds;
          }

          /**
             @method
             Obtain a reference to the IAlarm bridge.

             @return {Adaptive.AlarmBridge} bridge instance.
          */
          public getAlarmBridge() : IAlarm {
               if (AppRegistryBridge.instanceAlarm === null) {
                    AppRegistryBridge.instanceAlarm= new AlarmBridge();
               }
               return AppRegistryBridge.instanceAlarm;
          }

          /**
             @method
             Obtain a reference to the IAmbientLight bridge.

             @return {Adaptive.AmbientLightBridge} bridge instance.
          */
          public getAmbientLightBridge() : IAmbientLight {
               if (AppRegistryBridge.instanceAmbientLight === null) {
                    AppRegistryBridge.instanceAmbientLight= new AmbientLightBridge();
               }
               return AppRegistryBridge.instanceAmbientLight;
          }

          /**
             @method
             Obtain a reference to the IAnalytics bridge.

             @return {Adaptive.AnalyticsBridge} bridge instance.
          */
          public getAnalyticsBridge() : IAnalytics {
               if (AppRegistryBridge.instanceAnalytics === null) {
                    AppRegistryBridge.instanceAnalytics= new AnalyticsBridge();
               }
               return AppRegistryBridge.instanceAnalytics;
          }

          /**
             @method
             Obtain a reference to the IAudio bridge.

             @return {Adaptive.AudioBridge} bridge instance.
          */
          public getAudioBridge() : IAudio {
               if (AppRegistryBridge.instanceAudio === null) {
                    AppRegistryBridge.instanceAudio= new AudioBridge();
               }
               return AppRegistryBridge.instanceAudio;
          }

          /**
             @method
             Obtain a reference to the IBarcode bridge.

             @return {Adaptive.BarcodeBridge} bridge instance.
          */
          public getBarcodeBridge() : IBarcode {
               if (AppRegistryBridge.instanceBarcode === null) {
                    AppRegistryBridge.instanceBarcode= new BarcodeBridge();
               }
               return AppRegistryBridge.instanceBarcode;
          }

          /**
             @method
             Obtain a reference to the IBarometer bridge.

             @return {Adaptive.BarometerBridge} bridge instance.
          */
          public getBarometerBridge() : IBarometer {
               if (AppRegistryBridge.instanceBarometer === null) {
                    AppRegistryBridge.instanceBarometer= new BarometerBridge();
               }
               return AppRegistryBridge.instanceBarometer;
          }

          /**
             @method
             Obtain a reference to the IBluetooth bridge.

             @return {Adaptive.BluetoothBridge} bridge instance.
          */
          public getBluetoothBridge() : IBluetooth {
               if (AppRegistryBridge.instanceBluetooth === null) {
                    AppRegistryBridge.instanceBluetooth= new BluetoothBridge();
               }
               return AppRegistryBridge.instanceBluetooth;
          }

          /**
             @method
             Obtain a reference to the IBrowser bridge.

             @return {Adaptive.BrowserBridge} bridge instance.
          */
          public getBrowserBridge() : IBrowser {
               if (AppRegistryBridge.instanceBrowser === null) {
                    AppRegistryBridge.instanceBrowser= new BrowserBridge();
               }
               return AppRegistryBridge.instanceBrowser;
          }

          /**
             @method
             Obtain a reference to the ICalendar bridge.

             @return {Adaptive.CalendarBridge} bridge instance.
          */
          public getCalendarBridge() : ICalendar {
               if (AppRegistryBridge.instanceCalendar === null) {
                    AppRegistryBridge.instanceCalendar= new CalendarBridge();
               }
               return AppRegistryBridge.instanceCalendar;
          }

          /**
             @method
             Obtain a reference to the ICamera bridge.

             @return {Adaptive.CameraBridge} bridge instance.
          */
          public getCameraBridge() : ICamera {
               if (AppRegistryBridge.instanceCamera === null) {
                    AppRegistryBridge.instanceCamera= new CameraBridge();
               }
               return AppRegistryBridge.instanceCamera;
          }

          /**
             @method
             Obtain a reference to the ICapabilities bridge.

             @return {Adaptive.CapabilitiesBridge} bridge instance.
          */
          public getCapabilitiesBridge() : ICapabilities {
               if (AppRegistryBridge.instanceCapabilities === null) {
                    AppRegistryBridge.instanceCapabilities= new CapabilitiesBridge();
               }
               return AppRegistryBridge.instanceCapabilities;
          }

          /**
             @method
             Obtain a reference to the ICloud bridge.

             @return {Adaptive.CloudBridge} bridge instance.
          */
          public getCloudBridge() : ICloud {
               if (AppRegistryBridge.instanceCloud === null) {
                    AppRegistryBridge.instanceCloud= new CloudBridge();
               }
               return AppRegistryBridge.instanceCloud;
          }

          /**
             @method
             Obtain a reference to the ICompression bridge.

             @return {Adaptive.CompressionBridge} bridge instance.
          */
          public getCompressionBridge() : ICompression {
               if (AppRegistryBridge.instanceCompression === null) {
                    AppRegistryBridge.instanceCompression= new CompressionBridge();
               }
               return AppRegistryBridge.instanceCompression;
          }

          /**
             @method
             Obtain a reference to the IConcurrent bridge.

             @return {Adaptive.ConcurrentBridge} bridge instance.
          */
          public getConcurrentBridge() : IConcurrent {
               if (AppRegistryBridge.instanceConcurrent === null) {
                    AppRegistryBridge.instanceConcurrent= new ConcurrentBridge();
               }
               return AppRegistryBridge.instanceConcurrent;
          }

          /**
             @method
             Obtain a reference to the IContact bridge.

             @return {Adaptive.ContactBridge} bridge instance.
          */
          public getContactBridge() : IContact {
               if (AppRegistryBridge.instanceContact === null) {
                    AppRegistryBridge.instanceContact= new ContactBridge();
               }
               return AppRegistryBridge.instanceContact;
          }

          /**
             @method
             Obtain a reference to the ICrypto bridge.

             @return {Adaptive.CryptoBridge} bridge instance.
          */
          public getCryptoBridge() : ICrypto {
               if (AppRegistryBridge.instanceCrypto === null) {
                    AppRegistryBridge.instanceCrypto= new CryptoBridge();
               }
               return AppRegistryBridge.instanceCrypto;
          }

          /**
             @method
             Obtain a reference to the IDataStream bridge.

             @return {Adaptive.DataStreamBridge} bridge instance.
          */
          public getDataStreamBridge() : IDataStream {
               if (AppRegistryBridge.instanceDataStream === null) {
                    AppRegistryBridge.instanceDataStream= new DataStreamBridge();
               }
               return AppRegistryBridge.instanceDataStream;
          }

          /**
             @method
             Obtain a reference to the IDatabase bridge.

             @return {Adaptive.DatabaseBridge} bridge instance.
          */
          public getDatabaseBridge() : IDatabase {
               if (AppRegistryBridge.instanceDatabase === null) {
                    AppRegistryBridge.instanceDatabase= new DatabaseBridge();
               }
               return AppRegistryBridge.instanceDatabase;
          }

          /**
             @method
             Obtain a reference to the IDesktop bridge.

             @return {Adaptive.DesktopBridge} bridge instance.
          */
          public getDesktopBridge() : IDesktop {
               if (AppRegistryBridge.instanceDesktop === null) {
                    AppRegistryBridge.instanceDesktop= new DesktopBridge();
               }
               return AppRegistryBridge.instanceDesktop;
          }

          /**
             @method
             Obtain a reference to the IDevice bridge.

             @return {Adaptive.DeviceBridge} bridge instance.
          */
          public getDeviceBridge() : IDevice {
               if (AppRegistryBridge.instanceDevice === null) {
                    AppRegistryBridge.instanceDevice= new DeviceBridge();
               }
               return AppRegistryBridge.instanceDevice;
          }

          /**
             @method
             Obtain a reference to the IDisplay bridge.

             @return {Adaptive.DisplayBridge} bridge instance.
          */
          public getDisplayBridge() : IDisplay {
               if (AppRegistryBridge.instanceDisplay === null) {
                    AppRegistryBridge.instanceDisplay= new DisplayBridge();
               }
               return AppRegistryBridge.instanceDisplay;
          }

          /**
             @method
             Obtain a reference to the IFacebook bridge.

             @return {Adaptive.FacebookBridge} bridge instance.
          */
          public getFacebookBridge() : IFacebook {
               if (AppRegistryBridge.instanceFacebook === null) {
                    AppRegistryBridge.instanceFacebook= new FacebookBridge();
               }
               return AppRegistryBridge.instanceFacebook;
          }

          /**
             @method
             Obtain a reference to the IFile bridge.

             @return {Adaptive.FileBridge} bridge instance.
          */
          public getFileBridge() : IFile {
               if (AppRegistryBridge.instanceFile === null) {
                    AppRegistryBridge.instanceFile= new FileBridge();
               }
               return AppRegistryBridge.instanceFile;
          }

          /**
             @method
             Obtain a reference to the IFileSystem bridge.

             @return {Adaptive.FileSystemBridge} bridge instance.
          */
          public getFileSystemBridge() : IFileSystem {
               if (AppRegistryBridge.instanceFileSystem === null) {
                    AppRegistryBridge.instanceFileSystem= new FileSystemBridge();
               }
               return AppRegistryBridge.instanceFileSystem;
          }

          /**
             @method
             Obtain a reference to the IGeolocation bridge.

             @return {Adaptive.GeolocationBridge} bridge instance.
          */
          public getGeolocationBridge() : IGeolocation {
               if (AppRegistryBridge.instanceGeolocation === null) {
                    AppRegistryBridge.instanceGeolocation= new GeolocationBridge();
               }
               return AppRegistryBridge.instanceGeolocation;
          }

          /**
             @method
             Obtain a reference to the IGlobalization bridge.

             @return {Adaptive.GlobalizationBridge} bridge instance.
          */
          public getGlobalizationBridge() : IGlobalization {
               if (AppRegistryBridge.instanceGlobalization === null) {
                    AppRegistryBridge.instanceGlobalization= new GlobalizationBridge();
               }
               return AppRegistryBridge.instanceGlobalization;
          }

          /**
             @method
             Obtain a reference to the IGooglePlus bridge.

             @return {Adaptive.GooglePlusBridge} bridge instance.
          */
          public getGooglePlusBridge() : IGooglePlus {
               if (AppRegistryBridge.instanceGooglePlus === null) {
                    AppRegistryBridge.instanceGooglePlus= new GooglePlusBridge();
               }
               return AppRegistryBridge.instanceGooglePlus;
          }

          /**
             @method
             Obtain a reference to the IGyroscope bridge.

             @return {Adaptive.GyroscopeBridge} bridge instance.
          */
          public getGyroscopeBridge() : IGyroscope {
               if (AppRegistryBridge.instanceGyroscope === null) {
                    AppRegistryBridge.instanceGyroscope= new GyroscopeBridge();
               }
               return AppRegistryBridge.instanceGyroscope;
          }

          /**
             @method
             Obtain a reference to the IImaging bridge.

             @return {Adaptive.ImagingBridge} bridge instance.
          */
          public getImagingBridge() : IImaging {
               if (AppRegistryBridge.instanceImaging === null) {
                    AppRegistryBridge.instanceImaging= new ImagingBridge();
               }
               return AppRegistryBridge.instanceImaging;
          }

          /**
             @method
             Obtain a reference to the IInternalStorage bridge.

             @return {Adaptive.InternalStorageBridge} bridge instance.
          */
          public getInternalStorageBridge() : IInternalStorage {
               if (AppRegistryBridge.instanceInternalStorage === null) {
                    AppRegistryBridge.instanceInternalStorage= new InternalStorageBridge();
               }
               return AppRegistryBridge.instanceInternalStorage;
          }

          /**
             @method
             Obtain a reference to the ILifecycle bridge.

             @return {Adaptive.LifecycleBridge} bridge instance.
          */
          public getLifecycleBridge() : ILifecycle {
               if (AppRegistryBridge.instanceLifecycle === null) {
                    AppRegistryBridge.instanceLifecycle= new LifecycleBridge();
               }
               return AppRegistryBridge.instanceLifecycle;
          }

          /**
             @method
             Obtain a reference to the ILinkedIn bridge.

             @return {Adaptive.LinkedInBridge} bridge instance.
          */
          public getLinkedInBridge() : ILinkedIn {
               if (AppRegistryBridge.instanceLinkedIn === null) {
                    AppRegistryBridge.instanceLinkedIn= new LinkedInBridge();
               }
               return AppRegistryBridge.instanceLinkedIn;
          }

          /**
             @method
             Obtain a reference to the ILogging bridge.

             @return {Adaptive.LoggingBridge} bridge instance.
          */
          public getLoggingBridge() : ILogging {
               if (AppRegistryBridge.instanceLogging === null) {
                    AppRegistryBridge.instanceLogging= new LoggingBridge();
               }
               return AppRegistryBridge.instanceLogging;
          }

          /**
             @method
             Obtain a reference to the IMagnetometer bridge.

             @return {Adaptive.MagnetometerBridge} bridge instance.
          */
          public getMagnetometerBridge() : IMagnetometer {
               if (AppRegistryBridge.instanceMagnetometer === null) {
                    AppRegistryBridge.instanceMagnetometer= new MagnetometerBridge();
               }
               return AppRegistryBridge.instanceMagnetometer;
          }

          /**
             @method
             Obtain a reference to the IMail bridge.

             @return {Adaptive.MailBridge} bridge instance.
          */
          public getMailBridge() : IMail {
               if (AppRegistryBridge.instanceMail === null) {
                    AppRegistryBridge.instanceMail= new MailBridge();
               }
               return AppRegistryBridge.instanceMail;
          }

          /**
             @method
             Obtain a reference to the IManagement bridge.

             @return {Adaptive.ManagementBridge} bridge instance.
          */
          public getManagementBridge() : IManagement {
               if (AppRegistryBridge.instanceManagement === null) {
                    AppRegistryBridge.instanceManagement= new ManagementBridge();
               }
               return AppRegistryBridge.instanceManagement;
          }

          /**
             @method
             Obtain a reference to the IMap bridge.

             @return {Adaptive.MapBridge} bridge instance.
          */
          public getMapBridge() : IMap {
               if (AppRegistryBridge.instanceMap === null) {
                    AppRegistryBridge.instanceMap= new MapBridge();
               }
               return AppRegistryBridge.instanceMap;
          }

          /**
             @method
             Obtain a reference to the IMessaging bridge.

             @return {Adaptive.MessagingBridge} bridge instance.
          */
          public getMessagingBridge() : IMessaging {
               if (AppRegistryBridge.instanceMessaging === null) {
                    AppRegistryBridge.instanceMessaging= new MessagingBridge();
               }
               return AppRegistryBridge.instanceMessaging;
          }

          /**
             @method
             Obtain a reference to the INFC bridge.

             @return {Adaptive.NFCBridge} bridge instance.
          */
          public getNFCBridge() : INFC {
               if (AppRegistryBridge.instanceNFC === null) {
                    AppRegistryBridge.instanceNFC= new NFCBridge();
               }
               return AppRegistryBridge.instanceNFC;
          }

          /**
             @method
             Obtain a reference to the INetworkInfo bridge.

             @return {Adaptive.NetworkInfoBridge} bridge instance.
          */
          public getNetworkInfoBridge() : INetworkInfo {
               if (AppRegistryBridge.instanceNetworkInfo === null) {
                    AppRegistryBridge.instanceNetworkInfo= new NetworkInfoBridge();
               }
               return AppRegistryBridge.instanceNetworkInfo;
          }

          /**
             @method
             Obtain a reference to the INetworkNaming bridge.

             @return {Adaptive.NetworkNamingBridge} bridge instance.
          */
          public getNetworkNamingBridge() : INetworkNaming {
               if (AppRegistryBridge.instanceNetworkNaming === null) {
                    AppRegistryBridge.instanceNetworkNaming= new NetworkNamingBridge();
               }
               return AppRegistryBridge.instanceNetworkNaming;
          }

          /**
             @method
             Obtain a reference to the INetworkReachability bridge.

             @return {Adaptive.NetworkReachabilityBridge} bridge instance.
          */
          public getNetworkReachabilityBridge() : INetworkReachability {
               if (AppRegistryBridge.instanceNetworkReachability === null) {
                    AppRegistryBridge.instanceNetworkReachability= new NetworkReachabilityBridge();
               }
               return AppRegistryBridge.instanceNetworkReachability;
          }

          /**
             @method
             Obtain a reference to the INetworkStatus bridge.

             @return {Adaptive.NetworkStatusBridge} bridge instance.
          */
          public getNetworkStatusBridge() : INetworkStatus {
               if (AppRegistryBridge.instanceNetworkStatus === null) {
                    AppRegistryBridge.instanceNetworkStatus= new NetworkStatusBridge();
               }
               return AppRegistryBridge.instanceNetworkStatus;
          }

          /**
             @method
             Obtain a reference to the INotification bridge.

             @return {Adaptive.NotificationBridge} bridge instance.
          */
          public getNotificationBridge() : INotification {
               if (AppRegistryBridge.instanceNotification === null) {
                    AppRegistryBridge.instanceNotification= new NotificationBridge();
               }
               return AppRegistryBridge.instanceNotification;
          }

          /**
             @method
             Obtain a reference to the INotificationLocal bridge.

             @return {Adaptive.NotificationLocalBridge} bridge instance.
          */
          public getNotificationLocalBridge() : INotificationLocal {
               if (AppRegistryBridge.instanceNotificationLocal === null) {
                    AppRegistryBridge.instanceNotificationLocal= new NotificationLocalBridge();
               }
               return AppRegistryBridge.instanceNotificationLocal;
          }

          /**
             @method
             Obtain a reference to the IOAuth bridge.

             @return {Adaptive.OAuthBridge} bridge instance.
          */
          public getOAuthBridge() : IOAuth {
               if (AppRegistryBridge.instanceOAuth === null) {
                    AppRegistryBridge.instanceOAuth= new OAuthBridge();
               }
               return AppRegistryBridge.instanceOAuth;
          }

          /**
             @method
             Obtain a reference to the IOCR bridge.

             @return {Adaptive.OCRBridge} bridge instance.
          */
          public getOCRBridge() : IOCR {
               if (AppRegistryBridge.instanceOCR === null) {
                    AppRegistryBridge.instanceOCR= new OCRBridge();
               }
               return AppRegistryBridge.instanceOCR;
          }

          /**
             @method
             Obtain a reference to the IOS bridge.

             @return {Adaptive.OSBridge} bridge instance.
          */
          public getOSBridge() : IOS {
               if (AppRegistryBridge.instanceOS === null) {
                    AppRegistryBridge.instanceOS= new OSBridge();
               }
               return AppRegistryBridge.instanceOS;
          }

          /**
             @method
             Obtain a reference to the IOpenId bridge.

             @return {Adaptive.OpenIdBridge} bridge instance.
          */
          public getOpenIdBridge() : IOpenId {
               if (AppRegistryBridge.instanceOpenId === null) {
                    AppRegistryBridge.instanceOpenId= new OpenIdBridge();
               }
               return AppRegistryBridge.instanceOpenId;
          }

          /**
             @method
             Obtain a reference to the IPrinting bridge.

             @return {Adaptive.PrintingBridge} bridge instance.
          */
          public getPrintingBridge() : IPrinting {
               if (AppRegistryBridge.instancePrinting === null) {
                    AppRegistryBridge.instancePrinting= new PrintingBridge();
               }
               return AppRegistryBridge.instancePrinting;
          }

          /**
             @method
             Obtain a reference to the IProximity bridge.

             @return {Adaptive.ProximityBridge} bridge instance.
          */
          public getProximityBridge() : IProximity {
               if (AppRegistryBridge.instanceProximity === null) {
                    AppRegistryBridge.instanceProximity= new ProximityBridge();
               }
               return AppRegistryBridge.instanceProximity;
          }

          /**
             @method
             Obtain a reference to the IQRCode bridge.

             @return {Adaptive.QRCodeBridge} bridge instance.
          */
          public getQRCodeBridge() : IQRCode {
               if (AppRegistryBridge.instanceQRCode === null) {
                    AppRegistryBridge.instanceQRCode= new QRCodeBridge();
               }
               return AppRegistryBridge.instanceQRCode;
          }

          /**
             @method
             Obtain a reference to the IRSS bridge.

             @return {Adaptive.RSSBridge} bridge instance.
          */
          public getRSSBridge() : IRSS {
               if (AppRegistryBridge.instanceRSS === null) {
                    AppRegistryBridge.instanceRSS= new RSSBridge();
               }
               return AppRegistryBridge.instanceRSS;
          }

          /**
             @method
             Obtain a reference to the IRuntime bridge.

             @return {Adaptive.RuntimeBridge} bridge instance.
          */
          public getRuntimeBridge() : IRuntime {
               if (AppRegistryBridge.instanceRuntime === null) {
                    AppRegistryBridge.instanceRuntime= new RuntimeBridge();
               }
               return AppRegistryBridge.instanceRuntime;
          }

          /**
             @method
             Obtain a reference to the ISecurity bridge.

             @return {Adaptive.SecurityBridge} bridge instance.
          */
          public getSecurityBridge() : ISecurity {
               if (AppRegistryBridge.instanceSecurity === null) {
                    AppRegistryBridge.instanceSecurity= new SecurityBridge();
               }
               return AppRegistryBridge.instanceSecurity;
          }

          /**
             @method
             Obtain a reference to the IService bridge.

             @return {Adaptive.ServiceBridge} bridge instance.
          */
          public getServiceBridge() : IService {
               if (AppRegistryBridge.instanceService === null) {
                    AppRegistryBridge.instanceService= new ServiceBridge();
               }
               return AppRegistryBridge.instanceService;
          }

          /**
             @method
             Obtain a reference to the ISettings bridge.

             @return {Adaptive.SettingsBridge} bridge instance.
          */
          public getSettingsBridge() : ISettings {
               if (AppRegistryBridge.instanceSettings === null) {
                    AppRegistryBridge.instanceSettings= new SettingsBridge();
               }
               return AppRegistryBridge.instanceSettings;
          }

          /**
             @method
             Obtain a reference to the ISocket bridge.

             @return {Adaptive.SocketBridge} bridge instance.
          */
          public getSocketBridge() : ISocket {
               if (AppRegistryBridge.instanceSocket === null) {
                    AppRegistryBridge.instanceSocket= new SocketBridge();
               }
               return AppRegistryBridge.instanceSocket;
          }

          /**
             @method
             Obtain a reference to the IStore bridge.

             @return {Adaptive.StoreBridge} bridge instance.
          */
          public getStoreBridge() : IStore {
               if (AppRegistryBridge.instanceStore === null) {
                    AppRegistryBridge.instanceStore= new StoreBridge();
               }
               return AppRegistryBridge.instanceStore;
          }

          /**
             @method
             Obtain a reference to the ITelephony bridge.

             @return {Adaptive.TelephonyBridge} bridge instance.
          */
          public getTelephonyBridge() : ITelephony {
               if (AppRegistryBridge.instanceTelephony === null) {
                    AppRegistryBridge.instanceTelephony= new TelephonyBridge();
               }
               return AppRegistryBridge.instanceTelephony;
          }

          /**
             @method
             Obtain a reference to the ITimer bridge.

             @return {Adaptive.TimerBridge} bridge instance.
          */
          public getTimerBridge() : ITimer {
               if (AppRegistryBridge.instanceTimer === null) {
                    AppRegistryBridge.instanceTimer= new TimerBridge();
               }
               return AppRegistryBridge.instanceTimer;
          }

          /**
             @method
             Obtain a reference to the ITwitter bridge.

             @return {Adaptive.TwitterBridge} bridge instance.
          */
          public getTwitterBridge() : ITwitter {
               if (AppRegistryBridge.instanceTwitter === null) {
                    AppRegistryBridge.instanceTwitter= new TwitterBridge();
               }
               return AppRegistryBridge.instanceTwitter;
          }

          /**
             @method
             Obtain a reference to the IUI bridge.

             @return {Adaptive.UIBridge} bridge instance.
          */
          public getUIBridge() : IUI {
               if (AppRegistryBridge.instanceUI === null) {
                    AppRegistryBridge.instanceUI= new UIBridge();
               }
               return AppRegistryBridge.instanceUI;
          }

          /**
             @method
             Obtain a reference to the IUpdate bridge.

             @return {Adaptive.UpdateBridge} bridge instance.
          */
          public getUpdateBridge() : IUpdate {
               if (AppRegistryBridge.instanceUpdate === null) {
                    AppRegistryBridge.instanceUpdate= new UpdateBridge();
               }
               return AppRegistryBridge.instanceUpdate;
          }

          /**
             @method
             Obtain a reference to the IVibration bridge.

             @return {Adaptive.VibrationBridge} bridge instance.
          */
          public getVibrationBridge() : IVibration {
               if (AppRegistryBridge.instanceVibration === null) {
                    AppRegistryBridge.instanceVibration= new VibrationBridge();
               }
               return AppRegistryBridge.instanceVibration;
          }

          /**
             @method
             Obtain a reference to the IVideo bridge.

             @return {Adaptive.VideoBridge} bridge instance.
          */
          public getVideoBridge() : IVideo {
               if (AppRegistryBridge.instanceVideo === null) {
                    AppRegistryBridge.instanceVideo= new VideoBridge();
               }
               return AppRegistryBridge.instanceVideo;
          }

          /**
             @method
             Obtain a reference to the IWallet bridge.

             @return {Adaptive.WalletBridge} bridge instance.
          */
          public getWalletBridge() : IWallet {
               if (AppRegistryBridge.instanceWallet === null) {
                    AppRegistryBridge.instanceWallet= new WalletBridge();
               }
               return AppRegistryBridge.instanceWallet;
          }

          /**
             @method
             Obtain a reference to the IXML bridge.

             @return {Adaptive.XMLBridge} bridge instance.
          */
          public getXMLBridge() : IXML {
               if (AppRegistryBridge.instanceXML === null) {
                    AppRegistryBridge.instanceXML= new XMLBridge();
               }
               return AppRegistryBridge.instanceXML;
          }

          /**
             @method
             Return the API version for the given interface.

             @return {string} The version of the API.
          */
          public getAPIVersion() : string {
               return "v2.2.0"
          }
     }
     /**
        @enum {Adaptive.ContactAddressType} Adaptive.ContactAddressType
        Enumeration ContactAddressType
     */
     export class ContactAddressType {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.ContactAddressType} [Home='Home']
          */
          static Home = new ContactAddressType("Home");
          /**
             @property {Adaptive.ContactAddressType} [Work='Work']
          */
          static Work = new ContactAddressType("Work");
          /**
             @property {Adaptive.ContactAddressType} [Other='Other']
          */
          static Other = new ContactAddressType("Other");
          /**
             @property {Adaptive.ContactAddressType} [Unknown='Unknown']
          */
          static Unknown = new ContactAddressType("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.ContactAddressType}
          */
          static toObject(object : any) : ContactAddressType {
               var retValue : ContactAddressType = ContactAddressType.Unknown;
               if (object != null && object.value != null && ContactAddressType.hasOwnProperty(object.value)) {
                    retValue = ContactAddressType[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.ContactEmailType} Adaptive.ContactEmailType
        Enumeration ContactEmailType
     */
     export class ContactEmailType {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.ContactEmailType} [Personal='Personal']
          */
          static Personal = new ContactEmailType("Personal");
          /**
             @property {Adaptive.ContactEmailType} [Work='Work']
          */
          static Work = new ContactEmailType("Work");
          /**
             @property {Adaptive.ContactEmailType} [Other='Other']
          */
          static Other = new ContactEmailType("Other");
          /**
             @property {Adaptive.ContactEmailType} [Unknown='Unknown']
          */
          static Unknown = new ContactEmailType("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.ContactEmailType}
          */
          static toObject(object : any) : ContactEmailType {
               var retValue : ContactEmailType = ContactEmailType.Unknown;
               if (object != null && object.value != null && ContactEmailType.hasOwnProperty(object.value)) {
                    retValue = ContactEmailType[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.ContactPersonalInfoTitle} Adaptive.ContactPersonalInfoTitle
        Enumeration ContactPersonalInfoTitle
     */
     export class ContactPersonalInfoTitle {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.ContactPersonalInfoTitle} [Mr='Mr']
          */
          static Mr = new ContactPersonalInfoTitle("Mr");
          /**
             @property {Adaptive.ContactPersonalInfoTitle} [Mrs='Mrs']
          */
          static Mrs = new ContactPersonalInfoTitle("Mrs");
          /**
             @property {Adaptive.ContactPersonalInfoTitle} [Ms='Ms']
          */
          static Ms = new ContactPersonalInfoTitle("Ms");
          /**
             @property {Adaptive.ContactPersonalInfoTitle} [Dr='Dr']
          */
          static Dr = new ContactPersonalInfoTitle("Dr");
          /**
             @property {Adaptive.ContactPersonalInfoTitle} [Unknown='Unknown']
          */
          static Unknown = new ContactPersonalInfoTitle("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.ContactPersonalInfoTitle}
          */
          static toObject(object : any) : ContactPersonalInfoTitle {
               var retValue : ContactPersonalInfoTitle = ContactPersonalInfoTitle.Unknown;
               if (object != null && object.value != null && ContactPersonalInfoTitle.hasOwnProperty(object.value)) {
                    retValue = ContactPersonalInfoTitle[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.ContactPhoneType} Adaptive.ContactPhoneType
        Enumeration ContactPhoneType
     */
     export class ContactPhoneType {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.ContactPhoneType} [Mobile='Mobile']
          */
          static Mobile = new ContactPhoneType("Mobile");
          /**
             @property {Adaptive.ContactPhoneType} [Work='Work']
          */
          static Work = new ContactPhoneType("Work");
          /**
             @property {Adaptive.ContactPhoneType} [Home='Home']
          */
          static Home = new ContactPhoneType("Home");
          /**
             @property {Adaptive.ContactPhoneType} [Main='Main']
          */
          static Main = new ContactPhoneType("Main");
          /**
             @property {Adaptive.ContactPhoneType} [HomeFax='HomeFax']
          */
          static HomeFax = new ContactPhoneType("HomeFax");
          /**
             @property {Adaptive.ContactPhoneType} [WorkFax='WorkFax']
          */
          static WorkFax = new ContactPhoneType("WorkFax");
          /**
             @property {Adaptive.ContactPhoneType} [Other='Other']
          */
          static Other = new ContactPhoneType("Other");
          /**
             @property {Adaptive.ContactPhoneType} [Unknown='Unknown']
          */
          static Unknown = new ContactPhoneType("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.ContactPhoneType}
          */
          static toObject(object : any) : ContactPhoneType {
               var retValue : ContactPhoneType = ContactPhoneType.Unknown;
               if (object != null && object.value != null && ContactPhoneType.hasOwnProperty(object.value)) {
                    retValue = ContactPhoneType[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.ContactSocialNetwork} Adaptive.ContactSocialNetwork
        Enumeration ContactSocialNetwork
     */
     export class ContactSocialNetwork {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.ContactSocialNetwork} [Twitter='Twitter']
          */
          static Twitter = new ContactSocialNetwork("Twitter");
          /**
             @property {Adaptive.ContactSocialNetwork} [Facebook='Facebook']
          */
          static Facebook = new ContactSocialNetwork("Facebook");
          /**
             @property {Adaptive.ContactSocialNetwork} [GooglePlus='GooglePlus']
          */
          static GooglePlus = new ContactSocialNetwork("GooglePlus");
          /**
             @property {Adaptive.ContactSocialNetwork} [LinkedIn='LinkedIn']
          */
          static LinkedIn = new ContactSocialNetwork("LinkedIn");
          /**
             @property {Adaptive.ContactSocialNetwork} [Flickr='Flickr']
          */
          static Flickr = new ContactSocialNetwork("Flickr");
          /**
             @property {Adaptive.ContactSocialNetwork} [Unknown='Unknown']
          */
          static Unknown = new ContactSocialNetwork("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.ContactSocialNetwork}
          */
          static toObject(object : any) : ContactSocialNetwork {
               var retValue : ContactSocialNetwork = ContactSocialNetwork.Unknown;
               if (object != null && object.value != null && ContactSocialNetwork.hasOwnProperty(object.value)) {
                    retValue = ContactSocialNetwork[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IAccelerationListenerError} Adaptive.IAccelerationListenerError
        Enumeration IAccelerationListenerError
     */
     export class IAccelerationListenerError {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IAccelerationListenerError} [Unauthorized='Unauthorized']
          */
          static Unauthorized = new IAccelerationListenerError("Unauthorized");
          /**
             @property {Adaptive.IAccelerationListenerError} [Unavailable='Unavailable']
          */
          static Unavailable = new IAccelerationListenerError("Unavailable");
          /**
             @property {Adaptive.IAccelerationListenerError} [Unknown='Unknown']
          */
          static Unknown = new IAccelerationListenerError("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IAccelerationListenerError}
          */
          static toObject(object : any) : IAccelerationListenerError {
               var retValue : IAccelerationListenerError = IAccelerationListenerError.Unknown;
               if (object != null && object.value != null && IAccelerationListenerError.hasOwnProperty(object.value)) {
                    retValue = IAccelerationListenerError[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IAccelerationListenerWarning} Adaptive.IAccelerationListenerWarning
        Enumeration IAccelerationListenerWarning
     */
     export class IAccelerationListenerWarning {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IAccelerationListenerWarning} [NeedsCalibration='NeedsCalibration']
          */
          static NeedsCalibration = new IAccelerationListenerWarning("NeedsCalibration");
          /**
             @property {Adaptive.IAccelerationListenerWarning} [Stale='Stale']
          */
          static Stale = new IAccelerationListenerWarning("Stale");
          /**
             @property {Adaptive.IAccelerationListenerWarning} [Unknown='Unknown']
          */
          static Unknown = new IAccelerationListenerWarning("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IAccelerationListenerWarning}
          */
          static toObject(object : any) : IAccelerationListenerWarning {
               var retValue : IAccelerationListenerWarning = IAccelerationListenerWarning.Unknown;
               if (object != null && object.value != null && IAccelerationListenerWarning.hasOwnProperty(object.value)) {
                    retValue = IAccelerationListenerWarning[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IAdaptiveRPGroup} Adaptive.IAdaptiveRPGroup
        Enumeration IAdaptiveRPGroup
     */
     export class IAdaptiveRPGroup {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IAdaptiveRPGroup} [Application='Application']
          */
          static Application = new IAdaptiveRPGroup("Application");
          /**
             @property {Adaptive.IAdaptiveRPGroup} [Commerce='Commerce']
          */
          static Commerce = new IAdaptiveRPGroup("Commerce");
          /**
             @property {Adaptive.IAdaptiveRPGroup} [Communication='Communication']
          */
          static Communication = new IAdaptiveRPGroup("Communication");
          /**
             @property {Adaptive.IAdaptiveRPGroup} [Data='Data']
          */
          static Data = new IAdaptiveRPGroup("Data");
          /**
             @property {Adaptive.IAdaptiveRPGroup} [Media='Media']
          */
          static Media = new IAdaptiveRPGroup("Media");
          /**
             @property {Adaptive.IAdaptiveRPGroup} [Notification='Notification']
          */
          static Notification = new IAdaptiveRPGroup("Notification");
          /**
             @property {Adaptive.IAdaptiveRPGroup} [PIM='PIM']
          */
          static PIM = new IAdaptiveRPGroup("PIM");
          /**
             @property {Adaptive.IAdaptiveRPGroup} [Reader='Reader']
          */
          static Reader = new IAdaptiveRPGroup("Reader");
          /**
             @property {Adaptive.IAdaptiveRPGroup} [Security='Security']
          */
          static Security = new IAdaptiveRPGroup("Security");
          /**
             @property {Adaptive.IAdaptiveRPGroup} [Sensor='Sensor']
          */
          static Sensor = new IAdaptiveRPGroup("Sensor");
          /**
             @property {Adaptive.IAdaptiveRPGroup} [Social='Social']
          */
          static Social = new IAdaptiveRPGroup("Social");
          /**
             @property {Adaptive.IAdaptiveRPGroup} [System='System']
          */
          static System = new IAdaptiveRPGroup("System");
          /**
             @property {Adaptive.IAdaptiveRPGroup} [UI='UI']
          */
          static UI = new IAdaptiveRPGroup("UI");
          /**
             @property {Adaptive.IAdaptiveRPGroup} [Util='Util']
          */
          static Util = new IAdaptiveRPGroup("Util");
          /**
             @property {Adaptive.IAdaptiveRPGroup} [Kernel='Kernel']
          */
          static Kernel = new IAdaptiveRPGroup("Kernel");
          /**
             @property {Adaptive.IAdaptiveRPGroup} [Unknown='Unknown']
          */
          static Unknown = new IAdaptiveRPGroup("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IAdaptiveRPGroup}
          */
          static toObject(object : any) : IAdaptiveRPGroup {
               var retValue : IAdaptiveRPGroup = IAdaptiveRPGroup.Unknown;
               if (object != null && object.value != null && IAdaptiveRPGroup.hasOwnProperty(object.value)) {
                    retValue = IAdaptiveRPGroup[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IButtonListenerError} Adaptive.IButtonListenerError
        Enumeration IButtonListenerError
     */
     export class IButtonListenerError {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IButtonListenerError} [NotPresent='NotPresent']
          */
          static NotPresent = new IButtonListenerError("NotPresent");
          /**
             @property {Adaptive.IButtonListenerError} [Unknown='Unknown']
          */
          static Unknown = new IButtonListenerError("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IButtonListenerError}
          */
          static toObject(object : any) : IButtonListenerError {
               var retValue : IButtonListenerError = IButtonListenerError.Unknown;
               if (object != null && object.value != null && IButtonListenerError.hasOwnProperty(object.value)) {
                    retValue = IButtonListenerError[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IButtonListenerWarning} Adaptive.IButtonListenerWarning
        Enumeration IButtonListenerWarning
     */
     export class IButtonListenerWarning {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IButtonListenerWarning} [NotImplemented='NotImplemented']
          */
          static NotImplemented = new IButtonListenerWarning("NotImplemented");
          /**
             @property {Adaptive.IButtonListenerWarning} [Unknown='Unknown']
          */
          static Unknown = new IButtonListenerWarning("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IButtonListenerWarning}
          */
          static toObject(object : any) : IButtonListenerWarning {
               var retValue : IButtonListenerWarning = IButtonListenerWarning.Unknown;
               if (object != null && object.value != null && IButtonListenerWarning.hasOwnProperty(object.value)) {
                    retValue = IButtonListenerWarning[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.ICapabilitiesButton} Adaptive.ICapabilitiesButton
        Enumeration ICapabilitiesButton
     */
     export class ICapabilitiesButton {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.ICapabilitiesButton} [HomeButton='HomeButton']
          */
          static HomeButton = new ICapabilitiesButton("HomeButton");
          /**
             @property {Adaptive.ICapabilitiesButton} [BackButton='BackButton']
          */
          static BackButton = new ICapabilitiesButton("BackButton");
          /**
             @property {Adaptive.ICapabilitiesButton} [OptionButton='OptionButton']
          */
          static OptionButton = new ICapabilitiesButton("OptionButton");
          /**
             @property {Adaptive.ICapabilitiesButton} [Unknown='Unknown']
          */
          static Unknown = new ICapabilitiesButton("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.ICapabilitiesButton}
          */
          static toObject(object : any) : ICapabilitiesButton {
               var retValue : ICapabilitiesButton = ICapabilitiesButton.Unknown;
               if (object != null && object.value != null && ICapabilitiesButton.hasOwnProperty(object.value)) {
                    retValue = ICapabilitiesButton[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.ICapabilitiesCommunication} Adaptive.ICapabilitiesCommunication
        Enumeration ICapabilitiesCommunication
     */
     export class ICapabilitiesCommunication {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.ICapabilitiesCommunication} [Calendar='Calendar']
          */
          static Calendar = new ICapabilitiesCommunication("Calendar");
          /**
             @property {Adaptive.ICapabilitiesCommunication} [Contact='Contact']
          */
          static Contact = new ICapabilitiesCommunication("Contact");
          /**
             @property {Adaptive.ICapabilitiesCommunication} [Mail='Mail']
          */
          static Mail = new ICapabilitiesCommunication("Mail");
          /**
             @property {Adaptive.ICapabilitiesCommunication} [Messaging='Messaging']
          */
          static Messaging = new ICapabilitiesCommunication("Messaging");
          /**
             @property {Adaptive.ICapabilitiesCommunication} [Telephony='Telephony']
          */
          static Telephony = new ICapabilitiesCommunication("Telephony");
          /**
             @property {Adaptive.ICapabilitiesCommunication} [Unknown='Unknown']
          */
          static Unknown = new ICapabilitiesCommunication("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.ICapabilitiesCommunication}
          */
          static toObject(object : any) : ICapabilitiesCommunication {
               var retValue : ICapabilitiesCommunication = ICapabilitiesCommunication.Unknown;
               if (object != null && object.value != null && ICapabilitiesCommunication.hasOwnProperty(object.value)) {
                    retValue = ICapabilitiesCommunication[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.ICapabilitiesData} Adaptive.ICapabilitiesData
        Enumeration ICapabilitiesData
     */
     export class ICapabilitiesData {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.ICapabilitiesData} [Database='Database']
          */
          static Database = new ICapabilitiesData("Database");
          /**
             @property {Adaptive.ICapabilitiesData} [File='File']
          */
          static File = new ICapabilitiesData("File");
          /**
             @property {Adaptive.ICapabilitiesData} [Cloud='Cloud']
          */
          static Cloud = new ICapabilitiesData("Cloud");
          /**
             @property {Adaptive.ICapabilitiesData} [Unknown='Unknown']
          */
          static Unknown = new ICapabilitiesData("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.ICapabilitiesData}
          */
          static toObject(object : any) : ICapabilitiesData {
               var retValue : ICapabilitiesData = ICapabilitiesData.Unknown;
               if (object != null && object.value != null && ICapabilitiesData.hasOwnProperty(object.value)) {
                    retValue = ICapabilitiesData[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.ICapabilitiesMedia} Adaptive.ICapabilitiesMedia
        Enumeration ICapabilitiesMedia
     */
     export class ICapabilitiesMedia {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.ICapabilitiesMedia} [AudioPlayback='AudioPlayback']
          */
          static AudioPlayback = new ICapabilitiesMedia("AudioPlayback");
          /**
             @property {Adaptive.ICapabilitiesMedia} [AudioRecording='AudioRecording']
          */
          static AudioRecording = new ICapabilitiesMedia("AudioRecording");
          /**
             @property {Adaptive.ICapabilitiesMedia} [Camera='Camera']
          */
          static Camera = new ICapabilitiesMedia("Camera");
          /**
             @property {Adaptive.ICapabilitiesMedia} [VideoPlayback='VideoPlayback']
          */
          static VideoPlayback = new ICapabilitiesMedia("VideoPlayback");
          /**
             @property {Adaptive.ICapabilitiesMedia} [VideoRecording='VideoRecording']
          */
          static VideoRecording = new ICapabilitiesMedia("VideoRecording");
          /**
             @property {Adaptive.ICapabilitiesMedia} [Unknown='Unknown']
          */
          static Unknown = new ICapabilitiesMedia("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.ICapabilitiesMedia}
          */
          static toObject(object : any) : ICapabilitiesMedia {
               var retValue : ICapabilitiesMedia = ICapabilitiesMedia.Unknown;
               if (object != null && object.value != null && ICapabilitiesMedia.hasOwnProperty(object.value)) {
                    retValue = ICapabilitiesMedia[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.ICapabilitiesNet} Adaptive.ICapabilitiesNet
        Enumeration ICapabilitiesNet
     */
     export class ICapabilitiesNet {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.ICapabilitiesNet} [GSM='GSM']
          */
          static GSM = new ICapabilitiesNet("GSM");
          /**
             @property {Adaptive.ICapabilitiesNet} [GPRS='GPRS']
          */
          static GPRS = new ICapabilitiesNet("GPRS");
          /**
             @property {Adaptive.ICapabilitiesNet} [HSDPA='HSDPA']
          */
          static HSDPA = new ICapabilitiesNet("HSDPA");
          /**
             @property {Adaptive.ICapabilitiesNet} [LTE='LTE']
          */
          static LTE = new ICapabilitiesNet("LTE");
          /**
             @property {Adaptive.ICapabilitiesNet} [WIFI='WIFI']
          */
          static WIFI = new ICapabilitiesNet("WIFI");
          /**
             @property {Adaptive.ICapabilitiesNet} [Ethernet='Ethernet']
          */
          static Ethernet = new ICapabilitiesNet("Ethernet");
          /**
             @property {Adaptive.ICapabilitiesNet} [Unavailable='Unavailable']
          */
          static Unavailable = new ICapabilitiesNet("Unavailable");
          /**
             @property {Adaptive.ICapabilitiesNet} [Unknown='Unknown']
          */
          static Unknown = new ICapabilitiesNet("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.ICapabilitiesNet}
          */
          static toObject(object : any) : ICapabilitiesNet {
               var retValue : ICapabilitiesNet = ICapabilitiesNet.Unknown;
               if (object != null && object.value != null && ICapabilitiesNet.hasOwnProperty(object.value)) {
                    retValue = ICapabilitiesNet[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.ICapabilitiesNotification} Adaptive.ICapabilitiesNotification
        Enumeration ICapabilitiesNotification
     */
     export class ICapabilitiesNotification {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.ICapabilitiesNotification} [Alarm='Alarm']
          */
          static Alarm = new ICapabilitiesNotification("Alarm");
          /**
             @property {Adaptive.ICapabilitiesNotification} [LocalNotification='LocalNotification']
          */
          static LocalNotification = new ICapabilitiesNotification("LocalNotification");
          /**
             @property {Adaptive.ICapabilitiesNotification} [RemoteNotification='RemoteNotification']
          */
          static RemoteNotification = new ICapabilitiesNotification("RemoteNotification");
          /**
             @property {Adaptive.ICapabilitiesNotification} [Vibration='Vibration']
          */
          static Vibration = new ICapabilitiesNotification("Vibration");
          /**
             @property {Adaptive.ICapabilitiesNotification} [Unknown='Unknown']
          */
          static Unknown = new ICapabilitiesNotification("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.ICapabilitiesNotification}
          */
          static toObject(object : any) : ICapabilitiesNotification {
               var retValue : ICapabilitiesNotification = ICapabilitiesNotification.Unknown;
               if (object != null && object.value != null && ICapabilitiesNotification.hasOwnProperty(object.value)) {
                    retValue = ICapabilitiesNotification[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.ICapabilitiesOrientation} Adaptive.ICapabilitiesOrientation
        Enumeration ICapabilitiesOrientation
     */
     export class ICapabilitiesOrientation {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.ICapabilitiesOrientation} [PortraitUp='PortraitUp']
          */
          static PortraitUp = new ICapabilitiesOrientation("PortraitUp");
          /**
             @property {Adaptive.ICapabilitiesOrientation} [PortraitDown='PortraitDown']
          */
          static PortraitDown = new ICapabilitiesOrientation("PortraitDown");
          /**
             @property {Adaptive.ICapabilitiesOrientation} [LandscapeLeft='LandscapeLeft']
          */
          static LandscapeLeft = new ICapabilitiesOrientation("LandscapeLeft");
          /**
             @property {Adaptive.ICapabilitiesOrientation} [LandscapeRight='LandscapeRight']
          */
          static LandscapeRight = new ICapabilitiesOrientation("LandscapeRight");
          /**
             @property {Adaptive.ICapabilitiesOrientation} [Unknown='Unknown']
          */
          static Unknown = new ICapabilitiesOrientation("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.ICapabilitiesOrientation}
          */
          static toObject(object : any) : ICapabilitiesOrientation {
               var retValue : ICapabilitiesOrientation = ICapabilitiesOrientation.Unknown;
               if (object != null && object.value != null && ICapabilitiesOrientation.hasOwnProperty(object.value)) {
                    retValue = ICapabilitiesOrientation[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.ICapabilitiesSensor} Adaptive.ICapabilitiesSensor
        Enumeration ICapabilitiesSensor
     */
     export class ICapabilitiesSensor {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.ICapabilitiesSensor} [Accelerometer='Accelerometer']
          */
          static Accelerometer = new ICapabilitiesSensor("Accelerometer");
          /**
             @property {Adaptive.ICapabilitiesSensor} [AmbientLight='AmbientLight']
          */
          static AmbientLight = new ICapabilitiesSensor("AmbientLight");
          /**
             @property {Adaptive.ICapabilitiesSensor} [Barometer='Barometer']
          */
          static Barometer = new ICapabilitiesSensor("Barometer");
          /**
             @property {Adaptive.ICapabilitiesSensor} [Geolocation='Geolocation']
          */
          static Geolocation = new ICapabilitiesSensor("Geolocation");
          /**
             @property {Adaptive.ICapabilitiesSensor} [Gyroscope='Gyroscope']
          */
          static Gyroscope = new ICapabilitiesSensor("Gyroscope");
          /**
             @property {Adaptive.ICapabilitiesSensor} [Magnetometer='Magnetometer']
          */
          static Magnetometer = new ICapabilitiesSensor("Magnetometer");
          /**
             @property {Adaptive.ICapabilitiesSensor} [Proximity='Proximity']
          */
          static Proximity = new ICapabilitiesSensor("Proximity");
          /**
             @property {Adaptive.ICapabilitiesSensor} [Unknown='Unknown']
          */
          static Unknown = new ICapabilitiesSensor("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.ICapabilitiesSensor}
          */
          static toObject(object : any) : ICapabilitiesSensor {
               var retValue : ICapabilitiesSensor = ICapabilitiesSensor.Unknown;
               if (object != null && object.value != null && ICapabilitiesSensor.hasOwnProperty(object.value)) {
                    retValue = ICapabilitiesSensor[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IContactFieldGroup} Adaptive.IContactFieldGroup
        Enumeration IContactFieldGroup
     */
     export class IContactFieldGroup {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IContactFieldGroup} [PersonalInfo='PersonalInfo']
          */
          static PersonalInfo = new IContactFieldGroup("PersonalInfo");
          /**
             @property {Adaptive.IContactFieldGroup} [ProfessionalInfo='ProfessionalInfo']
          */
          static ProfessionalInfo = new IContactFieldGroup("ProfessionalInfo");
          /**
             @property {Adaptive.IContactFieldGroup} [Addresses='Addresses']
          */
          static Addresses = new IContactFieldGroup("Addresses");
          /**
             @property {Adaptive.IContactFieldGroup} [Phones='Phones']
          */
          static Phones = new IContactFieldGroup("Phones");
          /**
             @property {Adaptive.IContactFieldGroup} [Emails='Emails']
          */
          static Emails = new IContactFieldGroup("Emails");
          /**
             @property {Adaptive.IContactFieldGroup} [Websites='Websites']
          */
          static Websites = new IContactFieldGroup("Websites");
          /**
             @property {Adaptive.IContactFieldGroup} [Socials='Socials']
          */
          static Socials = new IContactFieldGroup("Socials");
          /**
             @property {Adaptive.IContactFieldGroup} [Tags='Tags']
          */
          static Tags = new IContactFieldGroup("Tags");
          /**
             @property {Adaptive.IContactFieldGroup} [Unknown='Unknown']
          */
          static Unknown = new IContactFieldGroup("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IContactFieldGroup}
          */
          static toObject(object : any) : IContactFieldGroup {
               var retValue : IContactFieldGroup = IContactFieldGroup.Unknown;
               if (object != null && object.value != null && IContactFieldGroup.hasOwnProperty(object.value)) {
                    retValue = IContactFieldGroup[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IContactFilter} Adaptive.IContactFilter
        Enumeration IContactFilter
     */
     export class IContactFilter {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IContactFilter} [HasPhone='HasPhone']
          */
          static HasPhone = new IContactFilter("HasPhone");
          /**
             @property {Adaptive.IContactFilter} [HasEmail='HasEmail']
          */
          static HasEmail = new IContactFilter("HasEmail");
          /**
             @property {Adaptive.IContactFilter} [HasAddress='HasAddress']
          */
          static HasAddress = new IContactFilter("HasAddress");
          /**
             @property {Adaptive.IContactFilter} [Unknown='Unknown']
          */
          static Unknown = new IContactFilter("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IContactFilter}
          */
          static toObject(object : any) : IContactFilter {
               var retValue : IContactFilter = IContactFilter.Unknown;
               if (object != null && object.value != null && IContactFilter.hasOwnProperty(object.value)) {
                    retValue = IContactFilter[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IContactPhotoResultCallbackError} Adaptive.IContactPhotoResultCallbackError
        Enumeration IContactPhotoResultCallbackError
     */
     export class IContactPhotoResultCallbackError {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IContactPhotoResultCallbackError} [NoPermission='NoPermission']
          */
          static NoPermission = new IContactPhotoResultCallbackError("NoPermission");
          /**
             @property {Adaptive.IContactPhotoResultCallbackError} [WrongParams='WrongParams']
          */
          static WrongParams = new IContactPhotoResultCallbackError("WrongParams");
          /**
             @property {Adaptive.IContactPhotoResultCallbackError} [NoPhoto='NoPhoto']
          */
          static NoPhoto = new IContactPhotoResultCallbackError("NoPhoto");
          /**
             @property {Adaptive.IContactPhotoResultCallbackError} [Unknown='Unknown']
          */
          static Unknown = new IContactPhotoResultCallbackError("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IContactPhotoResultCallbackError}
          */
          static toObject(object : any) : IContactPhotoResultCallbackError {
               var retValue : IContactPhotoResultCallbackError = IContactPhotoResultCallbackError.Unknown;
               if (object != null && object.value != null && IContactPhotoResultCallbackError.hasOwnProperty(object.value)) {
                    retValue = IContactPhotoResultCallbackError[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IContactPhotoResultCallbackWarning} Adaptive.IContactPhotoResultCallbackWarning
        Enumeration IContactPhotoResultCallbackWarning
     */
     export class IContactPhotoResultCallbackWarning {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IContactPhotoResultCallbackWarning} [LimitExceeded='LimitExceeded']
          */
          static LimitExceeded = new IContactPhotoResultCallbackWarning("LimitExceeded");
          /**
             @property {Adaptive.IContactPhotoResultCallbackWarning} [NoMatches='NoMatches']
          */
          static NoMatches = new IContactPhotoResultCallbackWarning("NoMatches");
          /**
             @property {Adaptive.IContactPhotoResultCallbackWarning} [Unknown='Unknown']
          */
          static Unknown = new IContactPhotoResultCallbackWarning("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IContactPhotoResultCallbackWarning}
          */
          static toObject(object : any) : IContactPhotoResultCallbackWarning {
               var retValue : IContactPhotoResultCallbackWarning = IContactPhotoResultCallbackWarning.Unknown;
               if (object != null && object.value != null && IContactPhotoResultCallbackWarning.hasOwnProperty(object.value)) {
                    retValue = IContactPhotoResultCallbackWarning[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IContactResultCallbackError} Adaptive.IContactResultCallbackError
        Enumeration IContactResultCallbackError
     */
     export class IContactResultCallbackError {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IContactResultCallbackError} [NoPermission='NoPermission']
          */
          static NoPermission = new IContactResultCallbackError("NoPermission");
          /**
             @property {Adaptive.IContactResultCallbackError} [WrongParams='WrongParams']
          */
          static WrongParams = new IContactResultCallbackError("WrongParams");
          /**
             @property {Adaptive.IContactResultCallbackError} [Unknown='Unknown']
          */
          static Unknown = new IContactResultCallbackError("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IContactResultCallbackError}
          */
          static toObject(object : any) : IContactResultCallbackError {
               var retValue : IContactResultCallbackError = IContactResultCallbackError.Unknown;
               if (object != null && object.value != null && IContactResultCallbackError.hasOwnProperty(object.value)) {
                    retValue = IContactResultCallbackError[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IContactResultCallbackWarning} Adaptive.IContactResultCallbackWarning
        Enumeration IContactResultCallbackWarning
     */
     export class IContactResultCallbackWarning {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IContactResultCallbackWarning} [LimitExceeded='LimitExceeded']
          */
          static LimitExceeded = new IContactResultCallbackWarning("LimitExceeded");
          /**
             @property {Adaptive.IContactResultCallbackWarning} [NoMatches='NoMatches']
          */
          static NoMatches = new IContactResultCallbackWarning("NoMatches");
          /**
             @property {Adaptive.IContactResultCallbackWarning} [Unknown='Unknown']
          */
          static Unknown = new IContactResultCallbackWarning("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IContactResultCallbackWarning}
          */
          static toObject(object : any) : IContactResultCallbackWarning {
               var retValue : IContactResultCallbackWarning = IContactResultCallbackWarning.Unknown;
               if (object != null && object.value != null && IContactResultCallbackWarning.hasOwnProperty(object.value)) {
                    retValue = IContactResultCallbackWarning[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IDatabaseResultCallbackError} Adaptive.IDatabaseResultCallbackError
        Enumeration IDatabaseResultCallbackError
     */
     export class IDatabaseResultCallbackError {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IDatabaseResultCallbackError} [NoSpace='NoSpace']
          */
          static NoSpace = new IDatabaseResultCallbackError("NoSpace");
          /**
             @property {Adaptive.IDatabaseResultCallbackError} [SqlException='SqlException']
          */
          static SqlException = new IDatabaseResultCallbackError("SqlException");
          /**
             @property {Adaptive.IDatabaseResultCallbackError} [NotDeleted='NotDeleted']
          */
          static NotDeleted = new IDatabaseResultCallbackError("NotDeleted");
          /**
             @property {Adaptive.IDatabaseResultCallbackError} [Unknown='Unknown']
          */
          static Unknown = new IDatabaseResultCallbackError("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IDatabaseResultCallbackError}
          */
          static toObject(object : any) : IDatabaseResultCallbackError {
               var retValue : IDatabaseResultCallbackError = IDatabaseResultCallbackError.Unknown;
               if (object != null && object.value != null && IDatabaseResultCallbackError.hasOwnProperty(object.value)) {
                    retValue = IDatabaseResultCallbackError[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IDatabaseResultCallbackWarning} Adaptive.IDatabaseResultCallbackWarning
        Enumeration IDatabaseResultCallbackWarning
     */
     export class IDatabaseResultCallbackWarning {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IDatabaseResultCallbackWarning} [DatabaseExists='DatabaseExists']
          */
          static DatabaseExists = new IDatabaseResultCallbackWarning("DatabaseExists");
          /**
             @property {Adaptive.IDatabaseResultCallbackWarning} [IsOpen='IsOpen']
          */
          static IsOpen = new IDatabaseResultCallbackWarning("IsOpen");
          /**
             @property {Adaptive.IDatabaseResultCallbackWarning} [Unknown='Unknown']
          */
          static Unknown = new IDatabaseResultCallbackWarning("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IDatabaseResultCallbackWarning}
          */
          static toObject(object : any) : IDatabaseResultCallbackWarning {
               var retValue : IDatabaseResultCallbackWarning = IDatabaseResultCallbackWarning.Unknown;
               if (object != null && object.value != null && IDatabaseResultCallbackWarning.hasOwnProperty(object.value)) {
                    retValue = IDatabaseResultCallbackWarning[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IDatabaseTableResultCallbackError} Adaptive.IDatabaseTableResultCallbackError
        Enumeration IDatabaseTableResultCallbackError
     */
     export class IDatabaseTableResultCallbackError {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IDatabaseTableResultCallbackError} [NoSpace='NoSpace']
          */
          static NoSpace = new IDatabaseTableResultCallbackError("NoSpace");
          /**
             @property {Adaptive.IDatabaseTableResultCallbackError} [ReadOnlyTable='ReadOnlyTable']
          */
          static ReadOnlyTable = new IDatabaseTableResultCallbackError("ReadOnlyTable");
          /**
             @property {Adaptive.IDatabaseTableResultCallbackError} [SqlException='SqlException']
          */
          static SqlException = new IDatabaseTableResultCallbackError("SqlException");
          /**
             @property {Adaptive.IDatabaseTableResultCallbackError} [DatabaseNotFound='DatabaseNotFound']
          */
          static DatabaseNotFound = new IDatabaseTableResultCallbackError("DatabaseNotFound");
          /**
             @property {Adaptive.IDatabaseTableResultCallbackError} [NoTableFound='NoTableFound']
          */
          static NoTableFound = new IDatabaseTableResultCallbackError("NoTableFound");
          /**
             @property {Adaptive.IDatabaseTableResultCallbackError} [Unknown='Unknown']
          */
          static Unknown = new IDatabaseTableResultCallbackError("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IDatabaseTableResultCallbackError}
          */
          static toObject(object : any) : IDatabaseTableResultCallbackError {
               var retValue : IDatabaseTableResultCallbackError = IDatabaseTableResultCallbackError.Unknown;
               if (object != null && object.value != null && IDatabaseTableResultCallbackError.hasOwnProperty(object.value)) {
                    retValue = IDatabaseTableResultCallbackError[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IDatabaseTableResultCallbackWarning} Adaptive.IDatabaseTableResultCallbackWarning
        Enumeration IDatabaseTableResultCallbackWarning
     */
     export class IDatabaseTableResultCallbackWarning {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IDatabaseTableResultCallbackWarning} [TableExists='TableExists']
          */
          static TableExists = new IDatabaseTableResultCallbackWarning("TableExists");
          /**
             @property {Adaptive.IDatabaseTableResultCallbackWarning} [TableLocked='TableLocked']
          */
          static TableLocked = new IDatabaseTableResultCallbackWarning("TableLocked");
          /**
             @property {Adaptive.IDatabaseTableResultCallbackWarning} [NoResults='NoResults']
          */
          static NoResults = new IDatabaseTableResultCallbackWarning("NoResults");
          /**
             @property {Adaptive.IDatabaseTableResultCallbackWarning} [Unknown='Unknown']
          */
          static Unknown = new IDatabaseTableResultCallbackWarning("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IDatabaseTableResultCallbackWarning}
          */
          static toObject(object : any) : IDatabaseTableResultCallbackWarning {
               var retValue : IDatabaseTableResultCallbackWarning = IDatabaseTableResultCallbackWarning.Unknown;
               if (object != null && object.value != null && IDatabaseTableResultCallbackWarning.hasOwnProperty(object.value)) {
                    retValue = IDatabaseTableResultCallbackWarning[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IDeviceOrientationListenerError} Adaptive.IDeviceOrientationListenerError
        Enumeration IDeviceOrientationListenerError
     */
     export class IDeviceOrientationListenerError {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IDeviceOrientationListenerError} [Unknown='Unknown']
          */
          static Unknown = new IDeviceOrientationListenerError("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IDeviceOrientationListenerError}
          */
          static toObject(object : any) : IDeviceOrientationListenerError {
               var retValue : IDeviceOrientationListenerError = IDeviceOrientationListenerError.Unknown;
               if (object != null && object.value != null && IDeviceOrientationListenerError.hasOwnProperty(object.value)) {
                    retValue = IDeviceOrientationListenerError[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IDeviceOrientationListenerWarning} Adaptive.IDeviceOrientationListenerWarning
        Enumeration IDeviceOrientationListenerWarning
     */
     export class IDeviceOrientationListenerWarning {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IDeviceOrientationListenerWarning} [Unknown='Unknown']
          */
          static Unknown = new IDeviceOrientationListenerWarning("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IDeviceOrientationListenerWarning}
          */
          static toObject(object : any) : IDeviceOrientationListenerWarning {
               var retValue : IDeviceOrientationListenerWarning = IDeviceOrientationListenerWarning.Unknown;
               if (object != null && object.value != null && IDeviceOrientationListenerWarning.hasOwnProperty(object.value)) {
                    retValue = IDeviceOrientationListenerWarning[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IDisplayOrientationListenerError} Adaptive.IDisplayOrientationListenerError
        Enumeration IDisplayOrientationListenerError
     */
     export class IDisplayOrientationListenerError {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IDisplayOrientationListenerError} [Unknown='Unknown']
          */
          static Unknown = new IDisplayOrientationListenerError("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IDisplayOrientationListenerError}
          */
          static toObject(object : any) : IDisplayOrientationListenerError {
               var retValue : IDisplayOrientationListenerError = IDisplayOrientationListenerError.Unknown;
               if (object != null && object.value != null && IDisplayOrientationListenerError.hasOwnProperty(object.value)) {
                    retValue = IDisplayOrientationListenerError[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IDisplayOrientationListenerWarning} Adaptive.IDisplayOrientationListenerWarning
        Enumeration IDisplayOrientationListenerWarning
     */
     export class IDisplayOrientationListenerWarning {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IDisplayOrientationListenerWarning} [ApplicationVetoed='ApplicationVetoed']
          */
          static ApplicationVetoed = new IDisplayOrientationListenerWarning("ApplicationVetoed");
          /**
             @property {Adaptive.IDisplayOrientationListenerWarning} [Unknown='Unknown']
          */
          static Unknown = new IDisplayOrientationListenerWarning("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IDisplayOrientationListenerWarning}
          */
          static toObject(object : any) : IDisplayOrientationListenerWarning {
               var retValue : IDisplayOrientationListenerWarning = IDisplayOrientationListenerWarning.Unknown;
               if (object != null && object.value != null && IDisplayOrientationListenerWarning.hasOwnProperty(object.value)) {
                    retValue = IDisplayOrientationListenerWarning[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IFileDataLoadResultCallbackError} Adaptive.IFileDataLoadResultCallbackError
        Enumeration IFileDataLoadResultCallbackError
     */
     export class IFileDataLoadResultCallbackError {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IFileDataLoadResultCallbackError} [InexistentFile='InexistentFile']
          */
          static InexistentFile = new IFileDataLoadResultCallbackError("InexistentFile");
          /**
             @property {Adaptive.IFileDataLoadResultCallbackError} [InsufficientSpace='InsufficientSpace']
          */
          static InsufficientSpace = new IFileDataLoadResultCallbackError("InsufficientSpace");
          /**
             @property {Adaptive.IFileDataLoadResultCallbackError} [Unauthorized='Unauthorized']
          */
          static Unauthorized = new IFileDataLoadResultCallbackError("Unauthorized");
          /**
             @property {Adaptive.IFileDataLoadResultCallbackError} [Unknown='Unknown']
          */
          static Unknown = new IFileDataLoadResultCallbackError("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IFileDataLoadResultCallbackError}
          */
          static toObject(object : any) : IFileDataLoadResultCallbackError {
               var retValue : IFileDataLoadResultCallbackError = IFileDataLoadResultCallbackError.Unknown;
               if (object != null && object.value != null && IFileDataLoadResultCallbackError.hasOwnProperty(object.value)) {
                    retValue = IFileDataLoadResultCallbackError[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IFileDataLoadResultCallbackWarning} Adaptive.IFileDataLoadResultCallbackWarning
        Enumeration IFileDataLoadResultCallbackWarning
     */
     export class IFileDataLoadResultCallbackWarning {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IFileDataLoadResultCallbackWarning} [ExceedMaximumSize='ExceedMaximumSize']
          */
          static ExceedMaximumSize = new IFileDataLoadResultCallbackWarning("ExceedMaximumSize");
          /**
             @property {Adaptive.IFileDataLoadResultCallbackWarning} [Unknown='Unknown']
          */
          static Unknown = new IFileDataLoadResultCallbackWarning("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IFileDataLoadResultCallbackWarning}
          */
          static toObject(object : any) : IFileDataLoadResultCallbackWarning {
               var retValue : IFileDataLoadResultCallbackWarning = IFileDataLoadResultCallbackWarning.Unknown;
               if (object != null && object.value != null && IFileDataLoadResultCallbackWarning.hasOwnProperty(object.value)) {
                    retValue = IFileDataLoadResultCallbackWarning[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IFileDataStoreResultCallbackError} Adaptive.IFileDataStoreResultCallbackError
        Enumeration IFileDataStoreResultCallbackError
     */
     export class IFileDataStoreResultCallbackError {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IFileDataStoreResultCallbackError} [InexistentFile='InexistentFile']
          */
          static InexistentFile = new IFileDataStoreResultCallbackError("InexistentFile");
          /**
             @property {Adaptive.IFileDataStoreResultCallbackError} [InsufficientSpace='InsufficientSpace']
          */
          static InsufficientSpace = new IFileDataStoreResultCallbackError("InsufficientSpace");
          /**
             @property {Adaptive.IFileDataStoreResultCallbackError} [Unauthorized='Unauthorized']
          */
          static Unauthorized = new IFileDataStoreResultCallbackError("Unauthorized");
          /**
             @property {Adaptive.IFileDataStoreResultCallbackError} [Unknown='Unknown']
          */
          static Unknown = new IFileDataStoreResultCallbackError("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IFileDataStoreResultCallbackError}
          */
          static toObject(object : any) : IFileDataStoreResultCallbackError {
               var retValue : IFileDataStoreResultCallbackError = IFileDataStoreResultCallbackError.Unknown;
               if (object != null && object.value != null && IFileDataStoreResultCallbackError.hasOwnProperty(object.value)) {
                    retValue = IFileDataStoreResultCallbackError[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IFileDataStoreResultCallbackWarning} Adaptive.IFileDataStoreResultCallbackWarning
        Enumeration IFileDataStoreResultCallbackWarning
     */
     export class IFileDataStoreResultCallbackWarning {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IFileDataStoreResultCallbackWarning} [ExceedMaximumSize='ExceedMaximumSize']
          */
          static ExceedMaximumSize = new IFileDataStoreResultCallbackWarning("ExceedMaximumSize");
          /**
             @property {Adaptive.IFileDataStoreResultCallbackWarning} [Unknown='Unknown']
          */
          static Unknown = new IFileDataStoreResultCallbackWarning("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IFileDataStoreResultCallbackWarning}
          */
          static toObject(object : any) : IFileDataStoreResultCallbackWarning {
               var retValue : IFileDataStoreResultCallbackWarning = IFileDataStoreResultCallbackWarning.Unknown;
               if (object != null && object.value != null && IFileDataStoreResultCallbackWarning.hasOwnProperty(object.value)) {
                    retValue = IFileDataStoreResultCallbackWarning[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IFileListResultCallbackError} Adaptive.IFileListResultCallbackError
        Enumeration IFileListResultCallbackError
     */
     export class IFileListResultCallbackError {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IFileListResultCallbackError} [InexistentFile='InexistentFile']
          */
          static InexistentFile = new IFileListResultCallbackError("InexistentFile");
          /**
             @property {Adaptive.IFileListResultCallbackError} [Unauthorized='Unauthorized']
          */
          static Unauthorized = new IFileListResultCallbackError("Unauthorized");
          /**
             @property {Adaptive.IFileListResultCallbackError} [Unknown='Unknown']
          */
          static Unknown = new IFileListResultCallbackError("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IFileListResultCallbackError}
          */
          static toObject(object : any) : IFileListResultCallbackError {
               var retValue : IFileListResultCallbackError = IFileListResultCallbackError.Unknown;
               if (object != null && object.value != null && IFileListResultCallbackError.hasOwnProperty(object.value)) {
                    retValue = IFileListResultCallbackError[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IFileListResultCallbackWarning} Adaptive.IFileListResultCallbackWarning
        Enumeration IFileListResultCallbackWarning
     */
     export class IFileListResultCallbackWarning {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IFileListResultCallbackWarning} [PartialResult='PartialResult']
          */
          static PartialResult = new IFileListResultCallbackWarning("PartialResult");
          /**
             @property {Adaptive.IFileListResultCallbackWarning} [Unknown='Unknown']
          */
          static Unknown = new IFileListResultCallbackWarning("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IFileListResultCallbackWarning}
          */
          static toObject(object : any) : IFileListResultCallbackWarning {
               var retValue : IFileListResultCallbackWarning = IFileListResultCallbackWarning.Unknown;
               if (object != null && object.value != null && IFileListResultCallbackWarning.hasOwnProperty(object.value)) {
                    retValue = IFileListResultCallbackWarning[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IFileResultCallbackError} Adaptive.IFileResultCallbackError
        Enumeration IFileResultCallbackError
     */
     export class IFileResultCallbackError {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IFileResultCallbackError} [FileExists='FileExists']
          */
          static FileExists = new IFileResultCallbackError("FileExists");
          /**
             @property {Adaptive.IFileResultCallbackError} [SourceInexistent='SourceInexistent']
          */
          static SourceInexistent = new IFileResultCallbackError("SourceInexistent");
          /**
             @property {Adaptive.IFileResultCallbackError} [DestionationExists='DestionationExists']
          */
          static DestionationExists = new IFileResultCallbackError("DestionationExists");
          /**
             @property {Adaptive.IFileResultCallbackError} [InsufficientSpace='InsufficientSpace']
          */
          static InsufficientSpace = new IFileResultCallbackError("InsufficientSpace");
          /**
             @property {Adaptive.IFileResultCallbackError} [Unauthorized='Unauthorized']
          */
          static Unauthorized = new IFileResultCallbackError("Unauthorized");
          /**
             @property {Adaptive.IFileResultCallbackError} [Unknown='Unknown']
          */
          static Unknown = new IFileResultCallbackError("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IFileResultCallbackError}
          */
          static toObject(object : any) : IFileResultCallbackError {
               var retValue : IFileResultCallbackError = IFileResultCallbackError.Unknown;
               if (object != null && object.value != null && IFileResultCallbackError.hasOwnProperty(object.value)) {
                    retValue = IFileResultCallbackError[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IFileResultCallbackWarning} Adaptive.IFileResultCallbackWarning
        Enumeration IFileResultCallbackWarning
     */
     export class IFileResultCallbackWarning {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IFileResultCallbackWarning} [SourceNotDeleted='SourceNotDeleted']
          */
          static SourceNotDeleted = new IFileResultCallbackWarning("SourceNotDeleted");
          /**
             @property {Adaptive.IFileResultCallbackWarning} [RootDirectory='RootDirectory']
          */
          static RootDirectory = new IFileResultCallbackWarning("RootDirectory");
          /**
             @property {Adaptive.IFileResultCallbackWarning} [Unknown='Unknown']
          */
          static Unknown = new IFileResultCallbackWarning("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IFileResultCallbackWarning}
          */
          static toObject(object : any) : IFileResultCallbackWarning {
               var retValue : IFileResultCallbackWarning = IFileResultCallbackWarning.Unknown;
               if (object != null && object.value != null && IFileResultCallbackWarning.hasOwnProperty(object.value)) {
                    retValue = IFileResultCallbackWarning[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IFileSystemSecurity} Adaptive.IFileSystemSecurity
        Enumeration IFileSystemSecurity
     */
     export class IFileSystemSecurity {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IFileSystemSecurity} [Default='Default']
          */
          static Default = new IFileSystemSecurity("Default");
          /**
             @property {Adaptive.IFileSystemSecurity} [Protected='Protected']
          */
          static Protected = new IFileSystemSecurity("Protected");
          /**
             @property {Adaptive.IFileSystemSecurity} [Encrypted='Encrypted']
          */
          static Encrypted = new IFileSystemSecurity("Encrypted");
          /**
             @property {Adaptive.IFileSystemSecurity} [Unknown='Unknown']
          */
          static Unknown = new IFileSystemSecurity("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IFileSystemSecurity}
          */
          static toObject(object : any) : IFileSystemSecurity {
               var retValue : IFileSystemSecurity = IFileSystemSecurity.Unknown;
               if (object != null && object.value != null && IFileSystemSecurity.hasOwnProperty(object.value)) {
                    retValue = IFileSystemSecurity[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IFileSystemStorageType} Adaptive.IFileSystemStorageType
        Enumeration IFileSystemStorageType
     */
     export class IFileSystemStorageType {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IFileSystemStorageType} [Application='Application']
          */
          static Application = new IFileSystemStorageType("Application");
          /**
             @property {Adaptive.IFileSystemStorageType} [Document='Document']
          */
          static Document = new IFileSystemStorageType("Document");
          /**
             @property {Adaptive.IFileSystemStorageType} [Cloud='Cloud']
          */
          static Cloud = new IFileSystemStorageType("Cloud");
          /**
             @property {Adaptive.IFileSystemStorageType} [Protected='Protected']
          */
          static Protected = new IFileSystemStorageType("Protected");
          /**
             @property {Adaptive.IFileSystemStorageType} [Cache='Cache']
          */
          static Cache = new IFileSystemStorageType("Cache");
          /**
             @property {Adaptive.IFileSystemStorageType} [External='External']
          */
          static External = new IFileSystemStorageType("External");
          /**
             @property {Adaptive.IFileSystemStorageType} [Unknown='Unknown']
          */
          static Unknown = new IFileSystemStorageType("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IFileSystemStorageType}
          */
          static toObject(object : any) : IFileSystemStorageType {
               var retValue : IFileSystemStorageType = IFileSystemStorageType.Unknown;
               if (object != null && object.value != null && IFileSystemStorageType.hasOwnProperty(object.value)) {
                    retValue = IFileSystemStorageType[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IFileSystemType} Adaptive.IFileSystemType
        Enumeration IFileSystemType
     */
     export class IFileSystemType {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IFileSystemType} [Directory='Directory']
          */
          static Directory = new IFileSystemType("Directory");
          /**
             @property {Adaptive.IFileSystemType} [File='File']
          */
          static File = new IFileSystemType("File");
          /**
             @property {Adaptive.IFileSystemType} [Unknown='Unknown']
          */
          static Unknown = new IFileSystemType("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IFileSystemType}
          */
          static toObject(object : any) : IFileSystemType {
               var retValue : IFileSystemType = IFileSystemType.Unknown;
               if (object != null && object.value != null && IFileSystemType.hasOwnProperty(object.value)) {
                    retValue = IFileSystemType[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IGeolocationListenerError} Adaptive.IGeolocationListenerError
        Enumeration IGeolocationListenerError
     */
     export class IGeolocationListenerError {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IGeolocationListenerError} [Disabled='Disabled']
          */
          static Disabled = new IGeolocationListenerError("Disabled");
          /**
             @property {Adaptive.IGeolocationListenerError} [RestrictedAccess='RestrictedAccess']
          */
          static RestrictedAccess = new IGeolocationListenerError("RestrictedAccess");
          /**
             @property {Adaptive.IGeolocationListenerError} [DeniedAccess='DeniedAccess']
          */
          static DeniedAccess = new IGeolocationListenerError("DeniedAccess");
          /**
             @property {Adaptive.IGeolocationListenerError} [StatusNotDetermined='StatusNotDetermined']
          */
          static StatusNotDetermined = new IGeolocationListenerError("StatusNotDetermined");
          /**
             @property {Adaptive.IGeolocationListenerError} [Unknown='Unknown']
          */
          static Unknown = new IGeolocationListenerError("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IGeolocationListenerError}
          */
          static toObject(object : any) : IGeolocationListenerError {
               var retValue : IGeolocationListenerError = IGeolocationListenerError.Unknown;
               if (object != null && object.value != null && IGeolocationListenerError.hasOwnProperty(object.value)) {
                    retValue = IGeolocationListenerError[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IGeolocationListenerWarning} Adaptive.IGeolocationListenerWarning
        Enumeration IGeolocationListenerWarning
     */
     export class IGeolocationListenerWarning {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IGeolocationListenerWarning} [HighDoP='HighDoP']
          */
          static HighDoP = new IGeolocationListenerWarning("HighDoP");
          /**
             @property {Adaptive.IGeolocationListenerWarning} [StaleData='StaleData']
          */
          static StaleData = new IGeolocationListenerWarning("StaleData");
          /**
             @property {Adaptive.IGeolocationListenerWarning} [Unknown='Unknown']
          */
          static Unknown = new IGeolocationListenerWarning("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IGeolocationListenerWarning}
          */
          static toObject(object : any) : IGeolocationListenerWarning {
               var retValue : IGeolocationListenerWarning = IGeolocationListenerWarning.Unknown;
               if (object != null && object.value != null && IGeolocationListenerWarning.hasOwnProperty(object.value)) {
                    retValue = IGeolocationListenerWarning[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.ILifecycleListenerError} Adaptive.ILifecycleListenerError
        Enumeration ILifecycleListenerError
     */
     export class ILifecycleListenerError {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.ILifecycleListenerError} [Runtime='Runtime']
          */
          static Runtime = new ILifecycleListenerError("Runtime");
          /**
             @property {Adaptive.ILifecycleListenerError} [Implementation='Implementation']
          */
          static Implementation = new ILifecycleListenerError("Implementation");
          /**
             @property {Adaptive.ILifecycleListenerError} [Killed='Killed']
          */
          static Killed = new ILifecycleListenerError("Killed");
          /**
             @property {Adaptive.ILifecycleListenerError} [Unknown='Unknown']
          */
          static Unknown = new ILifecycleListenerError("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.ILifecycleListenerError}
          */
          static toObject(object : any) : ILifecycleListenerError {
               var retValue : ILifecycleListenerError = ILifecycleListenerError.Unknown;
               if (object != null && object.value != null && ILifecycleListenerError.hasOwnProperty(object.value)) {
                    retValue = ILifecycleListenerError[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.ILifecycleListenerWarning} Adaptive.ILifecycleListenerWarning
        Enumeration ILifecycleListenerWarning
     */
     export class ILifecycleListenerWarning {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.ILifecycleListenerWarning} [MemoryLow='MemoryLow']
          */
          static MemoryLow = new ILifecycleListenerWarning("MemoryLow");
          /**
             @property {Adaptive.ILifecycleListenerWarning} [BatteryLow='BatteryLow']
          */
          static BatteryLow = new ILifecycleListenerWarning("BatteryLow");
          /**
             @property {Adaptive.ILifecycleListenerWarning} [Unknown='Unknown']
          */
          static Unknown = new ILifecycleListenerWarning("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.ILifecycleListenerWarning}
          */
          static toObject(object : any) : ILifecycleListenerWarning {
               var retValue : ILifecycleListenerWarning = ILifecycleListenerWarning.Unknown;
               if (object != null && object.value != null && ILifecycleListenerWarning.hasOwnProperty(object.value)) {
                    retValue = ILifecycleListenerWarning[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.ILoggingLogLevel} Adaptive.ILoggingLogLevel
        Enumeration ILoggingLogLevel
     */
     export class ILoggingLogLevel {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.ILoggingLogLevel} [Debug='Debug']
          */
          static Debug = new ILoggingLogLevel("Debug");
          /**
             @property {Adaptive.ILoggingLogLevel} [Warn='Warn']
          */
          static Warn = new ILoggingLogLevel("Warn");
          /**
             @property {Adaptive.ILoggingLogLevel} [Error='Error']
          */
          static Error = new ILoggingLogLevel("Error");
          /**
             @property {Adaptive.ILoggingLogLevel} [Info='Info']
          */
          static Info = new ILoggingLogLevel("Info");
          /**
             @property {Adaptive.ILoggingLogLevel} [Unknown='Unknown']
          */
          static Unknown = new ILoggingLogLevel("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.ILoggingLogLevel}
          */
          static toObject(object : any) : ILoggingLogLevel {
               var retValue : ILoggingLogLevel = ILoggingLogLevel.Unknown;
               if (object != null && object.value != null && ILoggingLogLevel.hasOwnProperty(object.value)) {
                    retValue = ILoggingLogLevel[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IMessagingCallbackError} Adaptive.IMessagingCallbackError
        Enumeration IMessagingCallbackError
     */
     export class IMessagingCallbackError {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IMessagingCallbackError} [SIMNotPresent='SIMNotPresent']
          */
          static SIMNotPresent = new IMessagingCallbackError("SIMNotPresent");
          /**
             @property {Adaptive.IMessagingCallbackError} [EmailAccountNotFound='EmailAccountNotFound']
          */
          static EmailAccountNotFound = new IMessagingCallbackError("EmailAccountNotFound");
          /**
             @property {Adaptive.IMessagingCallbackError} [NotSent='NotSent']
          */
          static NotSent = new IMessagingCallbackError("NotSent");
          /**
             @property {Adaptive.IMessagingCallbackError} [WrongParams='WrongParams']
          */
          static WrongParams = new IMessagingCallbackError("WrongParams");
          /**
             @property {Adaptive.IMessagingCallbackError} [NotSupported='NotSupported']
          */
          static NotSupported = new IMessagingCallbackError("NotSupported");
          /**
             @property {Adaptive.IMessagingCallbackError} [Unknown='Unknown']
          */
          static Unknown = new IMessagingCallbackError("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IMessagingCallbackError}
          */
          static toObject(object : any) : IMessagingCallbackError {
               var retValue : IMessagingCallbackError = IMessagingCallbackError.Unknown;
               if (object != null && object.value != null && IMessagingCallbackError.hasOwnProperty(object.value)) {
                    retValue = IMessagingCallbackError[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IMessagingCallbackWarning} Adaptive.IMessagingCallbackWarning
        Enumeration IMessagingCallbackWarning
     */
     export class IMessagingCallbackWarning {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IMessagingCallbackWarning} [UnableToSentAll='UnableToSentAll']
          */
          static UnableToSentAll = new IMessagingCallbackWarning("UnableToSentAll");
          /**
             @property {Adaptive.IMessagingCallbackWarning} [UnableToFetchAttachment='UnableToFetchAttachment']
          */
          static UnableToFetchAttachment = new IMessagingCallbackWarning("UnableToFetchAttachment");
          /**
             @property {Adaptive.IMessagingCallbackWarning} [Unknown='Unknown']
          */
          static Unknown = new IMessagingCallbackWarning("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IMessagingCallbackWarning}
          */
          static toObject(object : any) : IMessagingCallbackWarning {
               var retValue : IMessagingCallbackWarning = IMessagingCallbackWarning.Unknown;
               if (object != null && object.value != null && IMessagingCallbackWarning.hasOwnProperty(object.value)) {
                    retValue = IMessagingCallbackWarning[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.INetworkReachabilityCallbackError} Adaptive.INetworkReachabilityCallbackError
        Enumeration INetworkReachabilityCallbackError
     */
     export class INetworkReachabilityCallbackError {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.INetworkReachabilityCallbackError} [Forbidden='Forbidden']
          */
          static Forbidden = new INetworkReachabilityCallbackError("Forbidden");
          /**
             @property {Adaptive.INetworkReachabilityCallbackError} [NotFound='NotFound']
          */
          static NotFound = new INetworkReachabilityCallbackError("NotFound");
          /**
             @property {Adaptive.INetworkReachabilityCallbackError} [MethodNotAllowed='MethodNotAllowed']
          */
          static MethodNotAllowed = new INetworkReachabilityCallbackError("MethodNotAllowed");
          /**
             @property {Adaptive.INetworkReachabilityCallbackError} [NotAllowed='NotAllowed']
          */
          static NotAllowed = new INetworkReachabilityCallbackError("NotAllowed");
          /**
             @property {Adaptive.INetworkReachabilityCallbackError} [NotAuthenticated='NotAuthenticated']
          */
          static NotAuthenticated = new INetworkReachabilityCallbackError("NotAuthenticated");
          /**
             @property {Adaptive.INetworkReachabilityCallbackError} [TimeOut='TimeOut']
          */
          static TimeOut = new INetworkReachabilityCallbackError("TimeOut");
          /**
             @property {Adaptive.INetworkReachabilityCallbackError} [NoResponse='NoResponse']
          */
          static NoResponse = new INetworkReachabilityCallbackError("NoResponse");
          /**
             @property {Adaptive.INetworkReachabilityCallbackError} [Unreachable='Unreachable']
          */
          static Unreachable = new INetworkReachabilityCallbackError("Unreachable");
          /**
             @property {Adaptive.INetworkReachabilityCallbackError} [WrongParams='WrongParams']
          */
          static WrongParams = new INetworkReachabilityCallbackError("WrongParams");
          /**
             @property {Adaptive.INetworkReachabilityCallbackError} [MalformedUrl='MalformedUrl']
          */
          static MalformedUrl = new INetworkReachabilityCallbackError("MalformedUrl");
          /**
             @property {Adaptive.INetworkReachabilityCallbackError} [DomainUnresolvable='DomainUnresolvable']
          */
          static DomainUnresolvable = new INetworkReachabilityCallbackError("DomainUnresolvable");
          /**
             @property {Adaptive.INetworkReachabilityCallbackError} [Unknown='Unknown']
          */
          static Unknown = new INetworkReachabilityCallbackError("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.INetworkReachabilityCallbackError}
          */
          static toObject(object : any) : INetworkReachabilityCallbackError {
               var retValue : INetworkReachabilityCallbackError = INetworkReachabilityCallbackError.Unknown;
               if (object != null && object.value != null && INetworkReachabilityCallbackError.hasOwnProperty(object.value)) {
                    retValue = INetworkReachabilityCallbackError[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.INetworkReachabilityCallbackWarning} Adaptive.INetworkReachabilityCallbackWarning
        Enumeration INetworkReachabilityCallbackWarning
     */
     export class INetworkReachabilityCallbackWarning {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.INetworkReachabilityCallbackWarning} [IncorrectScheme='IncorrectScheme']
          */
          static IncorrectScheme = new INetworkReachabilityCallbackWarning("IncorrectScheme");
          /**
             @property {Adaptive.INetworkReachabilityCallbackWarning} [NotSecure='NotSecure']
          */
          static NotSecure = new INetworkReachabilityCallbackWarning("NotSecure");
          /**
             @property {Adaptive.INetworkReachabilityCallbackWarning} [NotTrusted='NotTrusted']
          */
          static NotTrusted = new INetworkReachabilityCallbackWarning("NotTrusted");
          /**
             @property {Adaptive.INetworkReachabilityCallbackWarning} [Redirected='Redirected']
          */
          static Redirected = new INetworkReachabilityCallbackWarning("Redirected");
          /**
             @property {Adaptive.INetworkReachabilityCallbackWarning} [NotRegisteredService='NotRegisteredService']
          */
          static NotRegisteredService = new INetworkReachabilityCallbackWarning("NotRegisteredService");
          /**
             @property {Adaptive.INetworkReachabilityCallbackWarning} [Unknown='Unknown']
          */
          static Unknown = new INetworkReachabilityCallbackWarning("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.INetworkReachabilityCallbackWarning}
          */
          static toObject(object : any) : INetworkReachabilityCallbackWarning {
               var retValue : INetworkReachabilityCallbackWarning = INetworkReachabilityCallbackWarning.Unknown;
               if (object != null && object.value != null && INetworkReachabilityCallbackWarning.hasOwnProperty(object.value)) {
                    retValue = INetworkReachabilityCallbackWarning[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.INetworkStatusListenerError} Adaptive.INetworkStatusListenerError
        Enumeration INetworkStatusListenerError
     */
     export class INetworkStatusListenerError {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.INetworkStatusListenerError} [NoPermission='NoPermission']
          */
          static NoPermission = new INetworkStatusListenerError("NoPermission");
          /**
             @property {Adaptive.INetworkStatusListenerError} [Unreachable='Unreachable']
          */
          static Unreachable = new INetworkStatusListenerError("Unreachable");
          /**
             @property {Adaptive.INetworkStatusListenerError} [Unknown='Unknown']
          */
          static Unknown = new INetworkStatusListenerError("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.INetworkStatusListenerError}
          */
          static toObject(object : any) : INetworkStatusListenerError {
               var retValue : INetworkStatusListenerError = INetworkStatusListenerError.Unknown;
               if (object != null && object.value != null && INetworkStatusListenerError.hasOwnProperty(object.value)) {
                    retValue = INetworkStatusListenerError[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.INetworkStatusListenerWarning} Adaptive.INetworkStatusListenerWarning
        Enumeration INetworkStatusListenerWarning
     */
     export class INetworkStatusListenerWarning {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.INetworkStatusListenerWarning} [IpAddressNotAssigned='IpAddressNotAssigned']
          */
          static IpAddressNotAssigned = new INetworkStatusListenerWarning("IpAddressNotAssigned");
          /**
             @property {Adaptive.INetworkStatusListenerWarning} [IpAddressChanged='IpAddressChanged']
          */
          static IpAddressChanged = new INetworkStatusListenerWarning("IpAddressChanged");
          /**
             @property {Adaptive.INetworkStatusListenerWarning} [Unknown='Unknown']
          */
          static Unknown = new INetworkStatusListenerWarning("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.INetworkStatusListenerWarning}
          */
          static toObject(object : any) : INetworkStatusListenerWarning {
               var retValue : INetworkStatusListenerWarning = INetworkStatusListenerWarning.Unknown;
               if (object != null && object.value != null && INetworkStatusListenerWarning.hasOwnProperty(object.value)) {
                    retValue = INetworkStatusListenerWarning[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IOSType} Adaptive.IOSType
        Enumeration IOSType
     */
     export class IOSType {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IOSType} [iOS='iOS']
          */
          static iOS = new IOSType("iOS");
          /**
             @property {Adaptive.IOSType} [OSX='OSX']
          */
          static OSX = new IOSType("OSX");
          /**
             @property {Adaptive.IOSType} [Windows='Windows']
          */
          static Windows = new IOSType("Windows");
          /**
             @property {Adaptive.IOSType} [WindowsPhone='WindowsPhone']
          */
          static WindowsPhone = new IOSType("WindowsPhone");
          /**
             @property {Adaptive.IOSType} [Android='Android']
          */
          static Android = new IOSType("Android");
          /**
             @property {Adaptive.IOSType} [Linux='Linux']
          */
          static Linux = new IOSType("Linux");
          /**
             @property {Adaptive.IOSType} [Blackberry='Blackberry']
          */
          static Blackberry = new IOSType("Blackberry");
          /**
             @property {Adaptive.IOSType} [Tizen='Tizen']
          */
          static Tizen = new IOSType("Tizen");
          /**
             @property {Adaptive.IOSType} [FirefoxOS='FirefoxOS']
          */
          static FirefoxOS = new IOSType("FirefoxOS");
          /**
             @property {Adaptive.IOSType} [Chromium='Chromium']
          */
          static Chromium = new IOSType("Chromium");
          /**
             @property {Adaptive.IOSType} [Unspecified='Unspecified']
          */
          static Unspecified = new IOSType("Unspecified");
          /**
             @property {Adaptive.IOSType} [Unknown='Unknown']
          */
          static Unknown = new IOSType("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IOSType}
          */
          static toObject(object : any) : IOSType {
               var retValue : IOSType = IOSType.Unknown;
               if (object != null && object.value != null && IOSType.hasOwnProperty(object.value)) {
                    retValue = IOSType[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.ISecurityResultCallbackError} Adaptive.ISecurityResultCallbackError
        Enumeration ISecurityResultCallbackError
     */
     export class ISecurityResultCallbackError {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.ISecurityResultCallbackError} [NoPermission='NoPermission']
          */
          static NoPermission = new ISecurityResultCallbackError("NoPermission");
          /**
             @property {Adaptive.ISecurityResultCallbackError} [NoMatchesFound='NoMatchesFound']
          */
          static NoMatchesFound = new ISecurityResultCallbackError("NoMatchesFound");
          /**
             @property {Adaptive.ISecurityResultCallbackError} [Unknown='Unknown']
          */
          static Unknown = new ISecurityResultCallbackError("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.ISecurityResultCallbackError}
          */
          static toObject(object : any) : ISecurityResultCallbackError {
               var retValue : ISecurityResultCallbackError = ISecurityResultCallbackError.Unknown;
               if (object != null && object.value != null && ISecurityResultCallbackError.hasOwnProperty(object.value)) {
                    retValue = ISecurityResultCallbackError[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.ISecurityResultCallbackWarning} Adaptive.ISecurityResultCallbackWarning
        Enumeration ISecurityResultCallbackWarning
     */
     export class ISecurityResultCallbackWarning {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.ISecurityResultCallbackWarning} [EntryOverride='EntryOverride']
          */
          static EntryOverride = new ISecurityResultCallbackWarning("EntryOverride");
          /**
             @property {Adaptive.ISecurityResultCallbackWarning} [Unknown='Unknown']
          */
          static Unknown = new ISecurityResultCallbackWarning("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.ISecurityResultCallbackWarning}
          */
          static toObject(object : any) : ISecurityResultCallbackWarning {
               var retValue : ISecurityResultCallbackWarning = ISecurityResultCallbackWarning.Unknown;
               if (object != null && object.value != null && ISecurityResultCallbackWarning.hasOwnProperty(object.value)) {
                    retValue = ISecurityResultCallbackWarning[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IServiceCertificateValidation} Adaptive.IServiceCertificateValidation
        Enumeration IServiceCertificateValidation
     */
     export class IServiceCertificateValidation {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IServiceCertificateValidation} [None='None']
          */
          static None = new IServiceCertificateValidation("None");
          /**
             @property {Adaptive.IServiceCertificateValidation} [Normal='Normal']
          */
          static Normal = new IServiceCertificateValidation("Normal");
          /**
             @property {Adaptive.IServiceCertificateValidation} [Extended='Extended']
          */
          static Extended = new IServiceCertificateValidation("Extended");
          /**
             @property {Adaptive.IServiceCertificateValidation} [Extreme='Extreme']
          */
          static Extreme = new IServiceCertificateValidation("Extreme");
          /**
             @property {Adaptive.IServiceCertificateValidation} [Unknown='Unknown']
          */
          static Unknown = new IServiceCertificateValidation("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IServiceCertificateValidation}
          */
          static toObject(object : any) : IServiceCertificateValidation {
               var retValue : IServiceCertificateValidation = IServiceCertificateValidation.Unknown;
               if (object != null && object.value != null && IServiceCertificateValidation.hasOwnProperty(object.value)) {
                    retValue = IServiceCertificateValidation[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IServiceContentEncoding} Adaptive.IServiceContentEncoding
        Enumeration IServiceContentEncoding
     */
     export class IServiceContentEncoding {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IServiceContentEncoding} [Ascii='Ascii']
          */
          static Ascii = new IServiceContentEncoding("Ascii");
          /**
             @property {Adaptive.IServiceContentEncoding} [Utf8='Utf8']
          */
          static Utf8 = new IServiceContentEncoding("Utf8");
          /**
             @property {Adaptive.IServiceContentEncoding} [IsoLatin1='IsoLatin1']
          */
          static IsoLatin1 = new IServiceContentEncoding("IsoLatin1");
          /**
             @property {Adaptive.IServiceContentEncoding} [Unicode='Unicode']
          */
          static Unicode = new IServiceContentEncoding("Unicode");
          /**
             @property {Adaptive.IServiceContentEncoding} [Unknown='Unknown']
          */
          static Unknown = new IServiceContentEncoding("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IServiceContentEncoding}
          */
          static toObject(object : any) : IServiceContentEncoding {
               var retValue : IServiceContentEncoding = IServiceContentEncoding.Unknown;
               if (object != null && object.value != null && IServiceContentEncoding.hasOwnProperty(object.value)) {
                    retValue = IServiceContentEncoding[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IServiceMethod} Adaptive.IServiceMethod
        Enumeration IServiceMethod
     */
     export class IServiceMethod {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IServiceMethod} [Post='Post']
          */
          static Post = new IServiceMethod("Post");
          /**
             @property {Adaptive.IServiceMethod} [Get='Get']
          */
          static Get = new IServiceMethod("Get");
          /**
             @property {Adaptive.IServiceMethod} [Head='Head']
          */
          static Head = new IServiceMethod("Head");
          /**
             @property {Adaptive.IServiceMethod} [Unknown='Unknown']
          */
          static Unknown = new IServiceMethod("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IServiceMethod}
          */
          static toObject(object : any) : IServiceMethod {
               var retValue : IServiceMethod = IServiceMethod.Unknown;
               if (object != null && object.value != null && IServiceMethod.hasOwnProperty(object.value)) {
                    retValue = IServiceMethod[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IServiceType} Adaptive.IServiceType
        Enumeration IServiceType
     */
     export class IServiceType {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IServiceType} [OctetBinary='OctetBinary']
          */
          static OctetBinary = new IServiceType("OctetBinary");
          /**
             @property {Adaptive.IServiceType} [RestJson='RestJson']
          */
          static RestJson = new IServiceType("RestJson");
          /**
             @property {Adaptive.IServiceType} [RestXml='RestXml']
          */
          static RestXml = new IServiceType("RestXml");
          /**
             @property {Adaptive.IServiceType} [SoapXml='SoapXml']
          */
          static SoapXml = new IServiceType("SoapXml");
          /**
             @property {Adaptive.IServiceType} [Unknown='Unknown']
          */
          static Unknown = new IServiceType("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IServiceType}
          */
          static toObject(object : any) : IServiceType {
               var retValue : IServiceType = IServiceType.Unknown;
               if (object != null && object.value != null && IServiceType.hasOwnProperty(object.value)) {
                    retValue = IServiceType[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IServiceResultCallbackError} Adaptive.IServiceResultCallbackError
        Enumeration IServiceResultCallbackError
     */
     export class IServiceResultCallbackError {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IServiceResultCallbackError} [TimeOut='TimeOut']
          */
          static TimeOut = new IServiceResultCallbackError("TimeOut");
          /**
             @property {Adaptive.IServiceResultCallbackError} [NoResponse='NoResponse']
          */
          static NoResponse = new IServiceResultCallbackError("NoResponse");
          /**
             @property {Adaptive.IServiceResultCallbackError} [Unreachable='Unreachable']
          */
          static Unreachable = new IServiceResultCallbackError("Unreachable");
          /**
             @property {Adaptive.IServiceResultCallbackError} [MalformedUrl='MalformedUrl']
          */
          static MalformedUrl = new IServiceResultCallbackError("MalformedUrl");
          /**
             @property {Adaptive.IServiceResultCallbackError} [NotRegisteredService='NotRegisteredService']
          */
          static NotRegisteredService = new IServiceResultCallbackError("NotRegisteredService");
          /**
             @property {Adaptive.IServiceResultCallbackError} [Unknown='Unknown']
          */
          static Unknown = new IServiceResultCallbackError("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IServiceResultCallbackError}
          */
          static toObject(object : any) : IServiceResultCallbackError {
               var retValue : IServiceResultCallbackError = IServiceResultCallbackError.Unknown;
               if (object != null && object.value != null && IServiceResultCallbackError.hasOwnProperty(object.value)) {
                    retValue = IServiceResultCallbackError[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.IServiceResultCallbackWarning} Adaptive.IServiceResultCallbackWarning
        Enumeration IServiceResultCallbackWarning
     */
     export class IServiceResultCallbackWarning {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.IServiceResultCallbackWarning} [CertificateUntrusted='CertificateUntrusted']
          */
          static CertificateUntrusted = new IServiceResultCallbackWarning("CertificateUntrusted");
          /**
             @property {Adaptive.IServiceResultCallbackWarning} [NotSecure='NotSecure']
          */
          static NotSecure = new IServiceResultCallbackWarning("NotSecure");
          /**
             @property {Adaptive.IServiceResultCallbackWarning} [Redirected='Redirected']
          */
          static Redirected = new IServiceResultCallbackWarning("Redirected");
          /**
             @property {Adaptive.IServiceResultCallbackWarning} [WrongParams='WrongParams']
          */
          static WrongParams = new IServiceResultCallbackWarning("WrongParams");
          /**
             @property {Adaptive.IServiceResultCallbackWarning} [Forbidden='Forbidden']
          */
          static Forbidden = new IServiceResultCallbackWarning("Forbidden");
          /**
             @property {Adaptive.IServiceResultCallbackWarning} [NotFound='NotFound']
          */
          static NotFound = new IServiceResultCallbackWarning("NotFound");
          /**
             @property {Adaptive.IServiceResultCallbackWarning} [MethodNotAllowed='MethodNotAllowed']
          */
          static MethodNotAllowed = new IServiceResultCallbackWarning("MethodNotAllowed");
          /**
             @property {Adaptive.IServiceResultCallbackWarning} [NotAllowed='NotAllowed']
          */
          static NotAllowed = new IServiceResultCallbackWarning("NotAllowed");
          /**
             @property {Adaptive.IServiceResultCallbackWarning} [NotAuthenticated='NotAuthenticated']
          */
          static NotAuthenticated = new IServiceResultCallbackWarning("NotAuthenticated");
          /**
             @property {Adaptive.IServiceResultCallbackWarning} [PaymentRequired='PaymentRequired']
          */
          static PaymentRequired = new IServiceResultCallbackWarning("PaymentRequired");
          /**
             @property {Adaptive.IServiceResultCallbackWarning} [ServerError='ServerError']
          */
          static ServerError = new IServiceResultCallbackWarning("ServerError");
          /**
             @property {Adaptive.IServiceResultCallbackWarning} [Unknown='Unknown']
          */
          static Unknown = new IServiceResultCallbackWarning("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.IServiceResultCallbackWarning}
          */
          static toObject(object : any) : IServiceResultCallbackWarning {
               var retValue : IServiceResultCallbackWarning = IServiceResultCallbackWarning.Unknown;
               if (object != null && object.value != null && IServiceResultCallbackWarning.hasOwnProperty(object.value)) {
                    retValue = IServiceResultCallbackWarning[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.ITelephonyStatus} Adaptive.ITelephonyStatus
        Enumeration ITelephonyStatus
     */
     export class ITelephonyStatus {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.ITelephonyStatus} [Dialing='Dialing']
          */
          static Dialing = new ITelephonyStatus("Dialing");
          /**
             @property {Adaptive.ITelephonyStatus} [Failed='Failed']
          */
          static Failed = new ITelephonyStatus("Failed");
          /**
             @property {Adaptive.ITelephonyStatus} [Unknown='Unknown']
          */
          static Unknown = new ITelephonyStatus("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.ITelephonyStatus}
          */
          static toObject(object : any) : ITelephonyStatus {
               var retValue : ITelephonyStatus = ITelephonyStatus.Unknown;
               if (object != null && object.value != null && ITelephonyStatus.hasOwnProperty(object.value)) {
                    retValue = ITelephonyStatus[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.LifecycleState} Adaptive.LifecycleState
        Enumeration LifecycleState
     */
     export class LifecycleState {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.LifecycleState} [Starting='Starting']
          */
          static Starting = new LifecycleState("Starting");
          /**
             @property {Adaptive.LifecycleState} [Started='Started']
          */
          static Started = new LifecycleState("Started");
          /**
             @property {Adaptive.LifecycleState} [Running='Running']
          */
          static Running = new LifecycleState("Running");
          /**
             @property {Adaptive.LifecycleState} [Pausing='Pausing']
          */
          static Pausing = new LifecycleState("Pausing");
          /**
             @property {Adaptive.LifecycleState} [PausedIdle='PausedIdle']
          */
          static PausedIdle = new LifecycleState("PausedIdle");
          /**
             @property {Adaptive.LifecycleState} [PausedRun='PausedRun']
          */
          static PausedRun = new LifecycleState("PausedRun");
          /**
             @property {Adaptive.LifecycleState} [Resuming='Resuming']
          */
          static Resuming = new LifecycleState("Resuming");
          /**
             @property {Adaptive.LifecycleState} [Stopping='Stopping']
          */
          static Stopping = new LifecycleState("Stopping");
          /**
             @property {Adaptive.LifecycleState} [Unknown='Unknown']
          */
          static Unknown = new LifecycleState("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.LifecycleState}
          */
          static toObject(object : any) : LifecycleState {
               var retValue : LifecycleState = LifecycleState.Unknown;
               if (object != null && object.value != null && LifecycleState.hasOwnProperty(object.value)) {
                    retValue = LifecycleState[object.value];
               }
               return retValue;
          }

     }
     /**
        @enum {Adaptive.RotationEventState} Adaptive.RotationEventState
        Enumeration RotationEventState
     */
     export class RotationEventState {

          constructor(public value:string){}
          toString(){return this.value;}

          /**
             @property {Adaptive.RotationEventState} [WillStartRotation='WillStartRotation']
          */
          static WillStartRotation = new RotationEventState("WillStartRotation");
          /**
             @property {Adaptive.RotationEventState} [IsRotating='IsRotating']
          */
          static IsRotating = new RotationEventState("IsRotating");
          /**
             @property {Adaptive.RotationEventState} [DidFinishRotation='DidFinishRotation']
          */
          static DidFinishRotation = new RotationEventState("DidFinishRotation");
          /**
             @property {Adaptive.RotationEventState} [Unknown='Unknown']
          */
          static Unknown = new RotationEventState("Unknown");

          /**
             @method
             @static
             Convert JSON parsed object to enumeration.
             @return {Adaptive.RotationEventState}
          */
          static toObject(object : any) : RotationEventState {
               var retValue : RotationEventState = RotationEventState.Unknown;
               if (object != null && object.value != null && RotationEventState.hasOwnProperty(object.value)) {
                    retValue = RotationEventState[object.value];
               }
               return retValue;
          }

     }

}
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
