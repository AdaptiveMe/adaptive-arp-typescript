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

    * @version v2.2.8

-------------------------------------------| aut inveniam viam aut faciam |--------------------------------------------
*/
declare module Adaptive {
    /**
       @private
       @property {number} registeredCounter
       Global unique id for listeners and callbacks.
    */
    var registeredCounter: number;
    /**
       @private
       @property {string} bridgePath
       Base url used internally to POST and intercept JSON requests by the platform.
    */
    var bridgePath: string;
    /**
       @private
       @property {string} bridgeApiVersion
       The Adaptive Runtime Platform API specification version.
    */
    var bridgeApiVersion: string;
    /**
       @class Adaptive.IDictionary
       @private
       Utility interface for Dictionary type support.
    */
    interface IDictionary<V> {
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
    class Dictionary<V> implements IDictionary<V> {
        _keys: Array<string>;
        _values: Array<V>;
        constructor(init: {
            key: string;
            value: V;
        }[]);
        add(key: string, value: V): void;
        remove(key: string): void;
        removeAll(): void;
        keys(): string[];
        values(): V[];
        containsKey(key: string): boolean;
        toLookup(): IDictionary<V>;
    }
    /**
       @private
       @param {Adaptive.APIRequest} apiRequest the request to be processed.
       @param {Adaptive.IBaseListener} listener to add or remove from the dictionary or null if removing all listeners.
       @param {Adaptive.Dictionary} listenerDictionary dictionary of listeners for the operation.
       @since v2.1.10
       Send request for methods that manage listeners.
    */
    function postRequestListener(apiRequest: APIRequest, listener: IBaseListener, listenerDictionary: Dictionary<IBaseListener>): void;
    function manageRequestListener(apiRequest: APIRequest, listener: IBaseListener, listenerDictionary: Dictionary<IBaseListener>, isError: boolean): void;
    /**
       @private
       @param {Adaptive.APIRequest} apiRequest the request to be processed.
       @param {Adaptive.IBaseCallback} callback to receive responses.
       @param {Adaptive.Dictionary} callbackDictionary dictionary of callbacks for the operation.
       @since v2.1.10
       Send request for methods that use callbacks.
    */
    function postRequestCallback(apiRequest: APIRequest, callback: IBaseCallback, callbackDictionary: Dictionary<IBaseCallback>): void;
    /**
       @private
       @param {Adaptive.APIRequest} apiRequest the request to be processed.
       @return {Adaptive.APIResponse} Response to the request.
       @since v2.1.10
       Send request and receives responses synchronously.
    */
    function postRequest(apiRequest: APIRequest): APIResponse;
    /**
       This is a marker interface for bridge classes that invoke delegates.

       @author Carlos Lozano Diez
       @since 1.0
       @version 1.0
    */
    /**
       @class Adaptive.APIBridge
    */
    interface APIBridge {
        /**
           @method
           Invokes the given method specified in the API request object.
           @param request APIRequest object containing method name and parameters.
           @return {Adaptive.APIResponse} Object with JSON response or a zero length string is the response is asynchronous.
           @since v2.0
        */
        invoke(request: APIRequest): APIResponse;
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
    interface IAdaptiveRP {
        /**
           @method
           Method that returns the API group of the implementation
           @return {Adaptive.IAdaptiveRPGroup} API Group name.
           @since v2.0
        */
        getAPIGroup(): IAdaptiveRPGroup;
        /**
           @method
           Method that returns the API version of the implementation.
           @return {string} API Version string.
           @since v2.0
        */
        getAPIVersion(): string;
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
    interface IAppRegistry {
        /**
           @abstract
           Returns a reference to the registered AccelerationBridge.

           @return {Adaptive.AccelerationBridge} reference or null if a bridge of this type is not registered.
        */
        getAccelerationBridge(): IAcceleration;
        /**
           @abstract
           Returns a reference to the registered AdsBridge.

           @return {Adaptive.AdsBridge} reference or null if a bridge of this type is not registered.
        */
        getAdsBridge(): IAds;
        /**
           @abstract
           Returns a reference to the registered AlarmBridge.

           @return {Adaptive.AlarmBridge} reference or null if a bridge of this type is not registered.
        */
        getAlarmBridge(): IAlarm;
        /**
           @abstract
           Returns a reference to the registered AmbientLightBridge.

           @return {Adaptive.AmbientLightBridge} reference or null if a bridge of this type is not registered.
        */
        getAmbientLightBridge(): IAmbientLight;
        /**
           @abstract
           Returns a reference to the registered AnalyticsBridge.

           @return {Adaptive.AnalyticsBridge} reference or null if a bridge of this type is not registered.
        */
        getAnalyticsBridge(): IAnalytics;
        /**
           @abstract
           Returns a reference to the registered AudioBridge.

           @return {Adaptive.AudioBridge} reference or null if a bridge of this type is not registered.
        */
        getAudioBridge(): IAudio;
        /**
           @abstract
           Returns a reference to the registered BarcodeBridge.

           @return {Adaptive.BarcodeBridge} reference or null if a bridge of this type is not registered.
        */
        getBarcodeBridge(): IBarcode;
        /**
           @abstract
           Returns a reference to the registered BarometerBridge.

           @return {Adaptive.BarometerBridge} reference or null if a bridge of this type is not registered.
        */
        getBarometerBridge(): IBarometer;
        /**
           @abstract
           Returns a reference to the registered BluetoothBridge.

           @return {Adaptive.BluetoothBridge} reference or null if a bridge of this type is not registered.
        */
        getBluetoothBridge(): IBluetooth;
        /**
           @abstract
           Returns a reference to the registered BrowserBridge.

           @return {Adaptive.BrowserBridge} reference or null if a bridge of this type is not registered.
        */
        getBrowserBridge(): IBrowser;
        /**
           @abstract
           Returns a reference to the registered CalendarBridge.

           @return {Adaptive.CalendarBridge} reference or null if a bridge of this type is not registered.
        */
        getCalendarBridge(): ICalendar;
        /**
           @abstract
           Returns a reference to the registered CameraBridge.

           @return {Adaptive.CameraBridge} reference or null if a bridge of this type is not registered.
        */
        getCameraBridge(): ICamera;
        /**
           @abstract
           Returns a reference to the registered CapabilitiesBridge.

           @return {Adaptive.CapabilitiesBridge} reference or null if a bridge of this type is not registered.
        */
        getCapabilitiesBridge(): ICapabilities;
        /**
           @abstract
           Returns a reference to the registered CloudBridge.

           @return {Adaptive.CloudBridge} reference or null if a bridge of this type is not registered.
        */
        getCloudBridge(): ICloud;
        /**
           @abstract
           Returns a reference to the registered CompressionBridge.

           @return {Adaptive.CompressionBridge} reference or null if a bridge of this type is not registered.
        */
        getCompressionBridge(): ICompression;
        /**
           @abstract
           Returns a reference to the registered ConcurrentBridge.

           @return {Adaptive.ConcurrentBridge} reference or null if a bridge of this type is not registered.
        */
        getConcurrentBridge(): IConcurrent;
        /**
           @abstract
           Returns a reference to the registered ContactBridge.

           @return {Adaptive.ContactBridge} reference or null if a bridge of this type is not registered.
        */
        getContactBridge(): IContact;
        /**
           @abstract
           Returns a reference to the registered CryptoBridge.

           @return {Adaptive.CryptoBridge} reference or null if a bridge of this type is not registered.
        */
        getCryptoBridge(): ICrypto;
        /**
           @abstract
           Returns a reference to the registered DataStreamBridge.

           @return {Adaptive.DataStreamBridge} reference or null if a bridge of this type is not registered.
        */
        getDataStreamBridge(): IDataStream;
        /**
           @abstract
           Returns a reference to the registered DatabaseBridge.

           @return {Adaptive.DatabaseBridge} reference or null if a bridge of this type is not registered.
        */
        getDatabaseBridge(): IDatabase;
        /**
           @abstract
           Returns a reference to the registered DesktopBridge.

           @return {Adaptive.DesktopBridge} reference or null if a bridge of this type is not registered.
        */
        getDesktopBridge(): IDesktop;
        /**
           @abstract
           Returns a reference to the registered DeviceBridge.

           @return {Adaptive.DeviceBridge} reference or null if a bridge of this type is not registered.
        */
        getDeviceBridge(): IDevice;
        /**
           @abstract
           Returns a reference to the registered DisplayBridge.

           @return {Adaptive.DisplayBridge} reference or null if a bridge of this type is not registered.
        */
        getDisplayBridge(): IDisplay;
        /**
           @abstract
           Returns a reference to the registered FacebookBridge.

           @return {Adaptive.FacebookBridge} reference or null if a bridge of this type is not registered.
        */
        getFacebookBridge(): IFacebook;
        /**
           @abstract
           Returns a reference to the registered FileBridge.

           @return {Adaptive.FileBridge} reference or null if a bridge of this type is not registered.
        */
        getFileBridge(): IFile;
        /**
           @abstract
           Returns a reference to the registered FileSystemBridge.

           @return {Adaptive.FileSystemBridge} reference or null if a bridge of this type is not registered.
        */
        getFileSystemBridge(): IFileSystem;
        /**
           @abstract
           Returns a reference to the registered GeolocationBridge.

           @return {Adaptive.GeolocationBridge} reference or null if a bridge of this type is not registered.
        */
        getGeolocationBridge(): IGeolocation;
        /**
           @abstract
           Returns a reference to the registered GlobalizationBridge.

           @return {Adaptive.GlobalizationBridge} reference or null if a bridge of this type is not registered.
        */
        getGlobalizationBridge(): IGlobalization;
        /**
           @abstract
           Returns a reference to the registered GooglePlusBridge.

           @return {Adaptive.GooglePlusBridge} reference or null if a bridge of this type is not registered.
        */
        getGooglePlusBridge(): IGooglePlus;
        /**
           @abstract
           Returns a reference to the registered GyroscopeBridge.

           @return {Adaptive.GyroscopeBridge} reference or null if a bridge of this type is not registered.
        */
        getGyroscopeBridge(): IGyroscope;
        /**
           @abstract
           Returns a reference to the registered ImagingBridge.

           @return {Adaptive.ImagingBridge} reference or null if a bridge of this type is not registered.
        */
        getImagingBridge(): IImaging;
        /**
           @abstract
           Returns a reference to the registered InternalStorageBridge.

           @return {Adaptive.InternalStorageBridge} reference or null if a bridge of this type is not registered.
        */
        getInternalStorageBridge(): IInternalStorage;
        /**
           @abstract
           Returns a reference to the registered LifecycleBridge.

           @return {Adaptive.LifecycleBridge} reference or null if a bridge of this type is not registered.
        */
        getLifecycleBridge(): ILifecycle;
        /**
           @abstract
           Returns a reference to the registered LinkedInBridge.

           @return {Adaptive.LinkedInBridge} reference or null if a bridge of this type is not registered.
        */
        getLinkedInBridge(): ILinkedIn;
        /**
           @abstract
           Returns a reference to the registered LoggingBridge.

           @return {Adaptive.LoggingBridge} reference or null if a bridge of this type is not registered.
        */
        getLoggingBridge(): ILogging;
        /**
           @abstract
           Returns a reference to the registered MagnetometerBridge.

           @return {Adaptive.MagnetometerBridge} reference or null if a bridge of this type is not registered.
        */
        getMagnetometerBridge(): IMagnetometer;
        /**
           @abstract
           Returns a reference to the registered MailBridge.

           @return {Adaptive.MailBridge} reference or null if a bridge of this type is not registered.
        */
        getMailBridge(): IMail;
        /**
           @abstract
           Returns a reference to the registered ManagementBridge.

           @return {Adaptive.ManagementBridge} reference or null if a bridge of this type is not registered.
        */
        getManagementBridge(): IManagement;
        /**
           @abstract
           Returns a reference to the registered MapBridge.

           @return {Adaptive.MapBridge} reference or null if a bridge of this type is not registered.
        */
        getMapBridge(): IMap;
        /**
           @abstract
           Returns a reference to the registered MessagingBridge.

           @return {Adaptive.MessagingBridge} reference or null if a bridge of this type is not registered.
        */
        getMessagingBridge(): IMessaging;
        /**
           @abstract
           Returns a reference to the registered NFCBridge.

           @return {Adaptive.NFCBridge} reference or null if a bridge of this type is not registered.
        */
        getNFCBridge(): INFC;
        /**
           @abstract
           Returns a reference to the registered NetworkInfoBridge.

           @return {Adaptive.NetworkInfoBridge} reference or null if a bridge of this type is not registered.
        */
        getNetworkInfoBridge(): INetworkInfo;
        /**
           @abstract
           Returns a reference to the registered NetworkNamingBridge.

           @return {Adaptive.NetworkNamingBridge} reference or null if a bridge of this type is not registered.
        */
        getNetworkNamingBridge(): INetworkNaming;
        /**
           @abstract
           Returns a reference to the registered NetworkReachabilityBridge.

           @return {Adaptive.NetworkReachabilityBridge} reference or null if a bridge of this type is not registered.
        */
        getNetworkReachabilityBridge(): INetworkReachability;
        /**
           @abstract
           Returns a reference to the registered NetworkStatusBridge.

           @return {Adaptive.NetworkStatusBridge} reference or null if a bridge of this type is not registered.
        */
        getNetworkStatusBridge(): INetworkStatus;
        /**
           @abstract
           Returns a reference to the registered NotificationBridge.

           @return {Adaptive.NotificationBridge} reference or null if a bridge of this type is not registered.
        */
        getNotificationBridge(): INotification;
        /**
           @abstract
           Returns a reference to the registered NotificationLocalBridge.

           @return {Adaptive.NotificationLocalBridge} reference or null if a bridge of this type is not registered.
        */
        getNotificationLocalBridge(): INotificationLocal;
        /**
           @abstract
           Returns a reference to the registered OAuthBridge.

           @return {Adaptive.OAuthBridge} reference or null if a bridge of this type is not registered.
        */
        getOAuthBridge(): IOAuth;
        /**
           @abstract
           Returns a reference to the registered OCRBridge.

           @return {Adaptive.OCRBridge} reference or null if a bridge of this type is not registered.
        */
        getOCRBridge(): IOCR;
        /**
           @abstract
           Returns a reference to the registered OSBridge.

           @return {Adaptive.OSBridge} reference or null if a bridge of this type is not registered.
        */
        getOSBridge(): IOS;
        /**
           @abstract
           Returns a reference to the registered OpenIdBridge.

           @return {Adaptive.OpenIdBridge} reference or null if a bridge of this type is not registered.
        */
        getOpenIdBridge(): IOpenId;
        /**
           @abstract
           Returns a reference to the registered PrintingBridge.

           @return {Adaptive.PrintingBridge} reference or null if a bridge of this type is not registered.
        */
        getPrintingBridge(): IPrinting;
        /**
           @abstract
           Returns a reference to the registered ProximityBridge.

           @return {Adaptive.ProximityBridge} reference or null if a bridge of this type is not registered.
        */
        getProximityBridge(): IProximity;
        /**
           @abstract
           Returns a reference to the registered QRCodeBridge.

           @return {Adaptive.QRCodeBridge} reference or null if a bridge of this type is not registered.
        */
        getQRCodeBridge(): IQRCode;
        /**
           @abstract
           Returns a reference to the registered RSSBridge.

           @return {Adaptive.RSSBridge} reference or null if a bridge of this type is not registered.
        */
        getRSSBridge(): IRSS;
        /**
           @abstract
           Returns a reference to the registered RuntimeBridge.

           @return {Adaptive.RuntimeBridge} reference or null if a bridge of this type is not registered.
        */
        getRuntimeBridge(): IRuntime;
        /**
           @abstract
           Returns a reference to the registered SecurityBridge.

           @return {Adaptive.SecurityBridge} reference or null if a bridge of this type is not registered.
        */
        getSecurityBridge(): ISecurity;
        /**
           @abstract
           Returns a reference to the registered ServiceBridge.

           @return {Adaptive.ServiceBridge} reference or null if a bridge of this type is not registered.
        */
        getServiceBridge(): IService;
        /**
           @abstract
           Returns a reference to the registered SettingsBridge.

           @return {Adaptive.SettingsBridge} reference or null if a bridge of this type is not registered.
        */
        getSettingsBridge(): ISettings;
        /**
           @abstract
           Returns a reference to the registered SocketBridge.

           @return {Adaptive.SocketBridge} reference or null if a bridge of this type is not registered.
        */
        getSocketBridge(): ISocket;
        /**
           @abstract
           Returns a reference to the registered StoreBridge.

           @return {Adaptive.StoreBridge} reference or null if a bridge of this type is not registered.
        */
        getStoreBridge(): IStore;
        /**
           @abstract
           Returns a reference to the registered TelephonyBridge.

           @return {Adaptive.TelephonyBridge} reference or null if a bridge of this type is not registered.
        */
        getTelephonyBridge(): ITelephony;
        /**
           @abstract
           Returns a reference to the registered TimerBridge.

           @return {Adaptive.TimerBridge} reference or null if a bridge of this type is not registered.
        */
        getTimerBridge(): ITimer;
        /**
           @abstract
           Returns a reference to the registered TwitterBridge.

           @return {Adaptive.TwitterBridge} reference or null if a bridge of this type is not registered.
        */
        getTwitterBridge(): ITwitter;
        /**
           @abstract
           Returns a reference to the registered UIBridge.

           @return {Adaptive.UIBridge} reference or null if a bridge of this type is not registered.
        */
        getUIBridge(): IUI;
        /**
           @abstract
           Returns a reference to the registered UpdateBridge.

           @return {Adaptive.UpdateBridge} reference or null if a bridge of this type is not registered.
        */
        getUpdateBridge(): IUpdate;
        /**
           @abstract
           Returns a reference to the registered VibrationBridge.

           @return {Adaptive.VibrationBridge} reference or null if a bridge of this type is not registered.
        */
        getVibrationBridge(): IVibration;
        /**
           @abstract
           Returns a reference to the registered VideoBridge.

           @return {Adaptive.VideoBridge} reference or null if a bridge of this type is not registered.
        */
        getVideoBridge(): IVideo;
        /**
           @abstract
           Returns a reference to the registered WalletBridge.

           @return {Adaptive.WalletBridge} reference or null if a bridge of this type is not registered.
        */
        getWalletBridge(): IWallet;
        /**
           @abstract
           Returns a reference to the registered XMLBridge.

           @return {Adaptive.XMLBridge} reference or null if a bridge of this type is not registered.
        */
        getXMLBridge(): IXML;
        /**
           @method
           Return the API version for the given interface.

           @return {string} The version of the API.
        */
        getAPIVersion(): string;
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
    interface IAppResourceManager {
        /**
           @method
           Retrieve a configuration resource from the secure application data container.
           @param id The id or relative path of the configuration resource to be retrieved.
           @return {Adaptive.AppResourceData} ResourceData with the configuration resource payload.
           @since v2.1.3
        */
        retrieveConfigResource(id: string): AppResourceData;
        /**
           @method
           Retrieve a web resource from the secure application data container.
           @param id The id or relative path of the web resource to be retrieved.
           @return {Adaptive.AppResourceData} ResourceData with the web resource payload.
           @since v2.1.3
        */
        retrieveWebResource(id: string): AppResourceData;
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
    interface IBaseApplication extends IAdaptiveRP {
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
    interface IBaseCallback extends IAdaptiveRP {
        /**
           @abstract
           Retrieve unique id of callback/listener.

           @return {number} Callback/listener unique id.
        */
        getId(): number;
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
    interface IBaseCommerce extends IAdaptiveRP {
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
    interface IBaseCommunication extends IAdaptiveRP {
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
    interface IBaseData extends IAdaptiveRP {
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
    interface IBaseListener extends IAdaptiveRP {
        /**
           @abstract
           Retrieve unique id of callback/listener.

           @return {number} Callback/listener unique id.
        */
        getId(): number;
        /**
           @method
           Return the unique listener identifier. This is used to check if two listeners are the same
in every platform. This id is populated by the Javascript platform
           @return {number} Unique Listener identifier
        */
        getId(): number;
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
    interface IBaseMedia extends IAdaptiveRP {
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
    interface IBaseNotification extends IAdaptiveRP {
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
    interface IBasePIM extends IAdaptiveRP {
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
    interface IBaseReader extends IAdaptiveRP {
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
    interface IBaseSecurity extends IAdaptiveRP {
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
    interface IBaseSensor extends IAdaptiveRP {
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
    interface IBaseSocial extends IAdaptiveRP {
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
    interface IBaseSystem extends IAdaptiveRP {
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
    interface IBaseUI extends IAdaptiveRP {
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
    interface IBaseUtil extends IAdaptiveRP {
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
    interface IAnalytics extends IBaseApplication {
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
    interface IGlobalization extends IBaseApplication {
        /**
           @method
           Returns the default locale of the application defined in the configuration file
           @return {Adaptive.Locale} Default Locale of the application
           @since v2.0
        */
        getDefaultLocale(): Locale;
        /**
           @method
           List of supported locales for the application defined in the configuration file
           @return {Adaptive.Locale[]} List of locales
           @since v2.0
        */
        getLocaleSupportedDescriptors(): Array<Locale>;
        /**
           @method
           Gets the text/message corresponding to the given key and locale.
           @param key    to match text
           @param locale The locale object to get localized message, or the locale desciptor ("language" or "language-country" two-letters ISO codes.
           @return {string} Localized text.
           @since v2.0
        */
        getResourceLiteral(key: string, locale: Locale): string;
        /**
           @method
           Gets the full application configured literals (key/message pairs) corresponding to the given locale.
           @param locale The locale object to get localized message, or the locale desciptor ("language" or "language-country" two-letters ISO codes.
           @return {Adaptive.KeyPair[]} Localized texts in the form of an object.
           @since v2.0
        */
        getResourceLiterals(locale: Locale): Array<KeyPair>;
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
    interface ILifecycle extends IBaseApplication {
        /**
           @method
           Add the listener for the lifecycle of the app
           @param listener Lifecycle listener
           @since v2.0
        */
        addLifecycleListener(listener: ILifecycleListener): any;
        /**
           @method
           Whether the application is in background or not
           @return {boolean} true if the application is in background;false otherwise
           @since v2.0
        */
        isBackground(): boolean;
        /**
           @method
           Un-registers an existing listener from receiving lifecycle events.
           @param listener Lifecycle listener
           @since v2.0
        */
        removeLifecycleListener(listener: ILifecycleListener): any;
        /**
           @method
           Removes all existing listeners from receiving lifecycle events.
           @since v2.0
        */
        removeLifecycleListeners(): any;
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
    interface IManagement extends IBaseApplication {
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
    interface IPrinting extends IBaseApplication {
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
    interface ISettings extends IBaseApplication {
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
    interface IUpdate extends IBaseApplication {
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
    interface IContactPhotoResultCallback extends IBaseCallback {
        /**
           @method
           This method is called on Error
           @param error returned by the platform
           @since v2.0
        */
        onError(error: IContactPhotoResultCallbackError): any;
        /**
           @method
           This method is called on Result
           @param contactPhoto returned by the platform
           @since v2.0
        */
        onResult(contactPhoto: Array<number>): any;
        /**
           @method
           This method is called on Warning
           @param contactPhoto returned by the platform
           @param warning      returned by the platform
           @since v2.0
        */
        onWarning(contactPhoto: Array<number>, warning: IContactPhotoResultCallbackWarning): any;
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
    interface IContactResultCallback extends IBaseCallback {
        /**
           @method
           This method is called on Error
           @param error returned by the platform
           @since v2.0
        */
        onError(error: IContactResultCallbackError): any;
        /**
           @method
           This method is called on Result
           @param contacts returned by the platform
           @since v2.0
        */
        onResult(contacts: Array<Contact>): any;
        /**
           @method
           This method is called on Warning
           @param contacts returned by the platform
           @param warning  returned by the platform
           @since v2.0
        */
        onWarning(contacts: Array<Contact>, warning: IContactResultCallbackWarning): any;
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
    interface IDatabaseResultCallback extends IBaseCallback {
        /**
           @method
           Result callback for error responses
           @param error Returned error
           @since v2.0
        */
        onError(error: IDatabaseResultCallbackError): any;
        /**
           @method
           Result callback for correct responses
           @param database Returns the database
           @since v2.0
        */
        onResult(database: Database): any;
        /**
           @method
           Result callback for warning responses
           @param database Returns the database
           @param warning  Returned Warning
           @since v2.0
        */
        onWarning(database: Database, warning: IDatabaseResultCallbackWarning): any;
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
    interface IDatabaseTableResultCallback extends IBaseCallback {
        /**
           @method
           Result callback for error responses
           @param error Returned error
           @since v2.0
        */
        onError(error: IDatabaseTableResultCallbackError): any;
        /**
           @method
           Result callback for correct responses
           @param databaseTable Returns the databaseTable
           @since v2.0
        */
        onResult(databaseTable: DatabaseTable): any;
        /**
           @method
           Result callback for warning responses
           @param databaseTable Returns the databaseTable
           @param warning       Returned Warning
           @since v2.0
        */
        onWarning(databaseTable: DatabaseTable, warning: IDatabaseTableResultCallbackWarning): any;
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
    interface IFileDataLoadResultCallback extends IBaseCallback {
        /**
           @method
           Error processing data retrieval/storage operation.
           @param error Error condition encountered.
           @since v2.0
        */
        onError(error: IFileDataLoadResultCallbackError): any;
        /**
           @method
           Result of data retrieval operation.
           @param data Data loaded.
           @since v2.0
        */
        onResult(data: Array<number>): any;
        /**
           @method
           Result with warning of data retrieval/storage operation.
           @param data    File being loaded.
           @param warning Warning condition encountered.
           @since v2.0
        */
        onWarning(data: Array<number>, warning: IFileDataLoadResultCallbackWarning): any;
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
    interface IFileDataStoreResultCallback extends IBaseCallback {
        /**
           @method
           Error processing data retrieval/storage operation.
           @param error Error condition encountered.
           @since v2.0
        */
        onError(error: IFileDataStoreResultCallbackError): any;
        /**
           @method
           Result of data storage operation.
           @param file File reference to stored data.
           @since v2.0
        */
        onResult(file: FileDescriptor): any;
        /**
           @method
           Result with warning of data retrieval/storage operation.
           @param file    File being loaded/stored.
           @param warning Warning condition encountered.
           @since v2.0
        */
        onWarning(file: FileDescriptor, warning: IFileDataStoreResultCallbackWarning): any;
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
    interface IFileListResultCallback extends IBaseCallback {
        /**
           @method
           On error result of a file operation.
           @param error Error processing the request.
           @since v2.0
        */
        onError(error: IFileListResultCallbackError): any;
        /**
           @method
           On correct result of a file operation.
           @param files Array of resulting files/folders.
           @since v2.0
        */
        onResult(files: Array<FileDescriptor>): any;
        /**
           @method
           On partial result of a file operation, containing a warning.
           @param files   Array of resulting files/folders.
           @param warning Warning condition encountered.
           @since v2.0
        */
        onWarning(files: Array<FileDescriptor>, warning: IFileListResultCallbackWarning): any;
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
    interface IFileResultCallback extends IBaseCallback {
        /**
           @method
           On error result of a file operation.
           @param error Error processing the request.
           @since v2.0
        */
        onError(error: IFileResultCallbackError): any;
        /**
           @method
           On correct result of a file operation.
           @param storageFile Reference to the resulting file.
           @since v2.0
        */
        onResult(storageFile: FileDescriptor): any;
        /**
           @method
           On partial result of a file operation, containing a warning.
           @param file    Reference to the offending file.
           @param warning Warning processing the request.
           @since v2.0
        */
        onWarning(file: FileDescriptor, warning: IFileResultCallbackWarning): any;
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
    interface IMessagingCallback extends IBaseCallback {
        /**
           @method
           This method is called on Error
           @param error returned by the platform
           @since v2.0
        */
        onError(error: IMessagingCallbackError): any;
        /**
           @method
           This method is called on Result
           @param success true if sent;false otherwise
           @since v2.0
        */
        onResult(success: boolean): any;
        /**
           @method
           This method is called on Warning
           @param success true if sent;false otherwise
           @param warning returned by the platform
           @since v2.0
        */
        onWarning(success: boolean, warning: IMessagingCallbackWarning): any;
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
    interface INetworkReachabilityCallback extends IBaseCallback {
        /**
           @method
           No data received - error condition, not authorized .
           @param error Error value
           @since v2.0
        */
        onError(error: INetworkReachabilityCallbackError): any;
        /**
           @method
           Correct data received.
           @param reachable Indicates if the host is reachable
           @since v2.0
        */
        onResult(reachable: boolean): any;
        /**
           @method
           Data received with warning - ie Found entries with existing key and values have been overriden
           @param reachable Indicates if the host is reachable
           @param warning   Warning value
           @since v2.0
        */
        onWarning(reachable: boolean, warning: INetworkReachabilityCallbackWarning): any;
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
    interface ISecurityResultCallback extends IBaseCallback {
        /**
           @method
           No data received - error condition, not authorized .
           @param error Error values
           @since v2.0
        */
        onError(error: ISecurityResultCallbackError): any;
        /**
           @method
           Correct data received.
           @param keyValues key and values
           @since v2.0
        */
        onResult(keyValues: Array<SecureKeyPair>): any;
        /**
           @method
           Data received with warning - ie Found entries with existing key and values have been overriden
           @param keyValues key and values
           @param warning   Warning values
           @since v2.0
        */
        onWarning(keyValues: Array<SecureKeyPair>, warning: ISecurityResultCallbackWarning): any;
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
    interface IServiceResultCallback extends IBaseCallback {
        /**
           @method
           This method is called on Error
           @param error returned by the platform
           @since v2.0
        */
        onError(error: IServiceResultCallbackError): any;
        /**
           @method
           This method is called on Result
           @param response data
           @since v2.0
        */
        onResult(response: ServiceResponse): any;
        /**
           @method
           This method is called on Warning
           @param response data
           @param warning  returned by the platform
           @since v2.0
        */
        onWarning(response: ServiceResponse, warning: IServiceResultCallbackWarning): any;
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
    interface IAds extends IBaseCommerce {
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
    interface IStore extends IBaseCommerce {
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
    interface IWallet extends IBaseCommerce {
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
    interface IBluetooth extends IBaseCommunication {
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
    interface INetworkInfo extends IBaseCommunication {
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
    interface INetworkNaming extends IBaseCommunication {
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
    interface INetworkReachability extends IBaseCommunication {
        /**
           @method
           Whether there is connectivity to a host, via domain name or ip address, or not.
           @param host     domain name or ip address of host.
           @param callback Callback called at the end.
           @since v2.0
        */
        isNetworkReachable(host: string, callback: INetworkReachabilityCallback): any;
        /**
           @method
           Whether there is connectivity to an url of a service or not.
           @param url      to look for
           @param callback Callback called at the end
           @since v2.0
        */
        isNetworkServiceReachable(url: string, callback: INetworkReachabilityCallback): any;
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
    interface INetworkStatus extends IBaseCommunication {
        /**
           @method
           Add the listener for network status changes of the app
           @param listener Listener with the result
           @since v2.0
        */
        addNetworkStatusListener(listener: INetworkStatusListener): any;
        /**
           @method
           Un-registers an existing listener from receiving network status events.
           @param listener Listener with the result
           @since v2.0
        */
        removeNetworkStatusListener(listener: INetworkStatusListener): any;
        /**
           @method
           Removes all existing listeners from receiving network status events.
           @since v2.0
        */
        removeNetworkStatusListeners(): any;
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
    interface IService extends IBaseCommunication {
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
        getServiceRequest(serviceToken: ServiceToken): ServiceRequest;
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
        getServiceTokenByUri(uri: string): ServiceToken;
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
        getServiceToken(serviceName: string, endpointName: string, functionName: string, method: IServiceMethod): ServiceToken;
        /**
           @method
           Returns all the possible service tokens configured in the platform's XML service definition file.
           @return {Adaptive.ServiceToken[]} Array of service tokens configured.
           @since v2.0.6
        */
        getServicesRegistered(): Array<ServiceToken>;
        /**
           @method
           Executes the given ServiceRequest and provides responses to the given callback handler.
           @param serviceRequest ServiceRequest with the request body.
           @param callback       IServiceResultCallback to handle the ServiceResponse.
           @since v2.0.6
        */
        invokeService(serviceRequest: ServiceRequest, callback: IServiceResultCallback): any;
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
        isServiceRegistered(serviceName: string, endpointName: string, functionName: string, method: IServiceMethod): boolean;
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
    interface ISocket extends IBaseCommunication {
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
    interface ITelephony extends IBaseCommunication {
        /**
           @method
           Invoke a phone call
           @param number to call
           @return {Adaptive.ITelephonyStatus} Status of the call
           @since v2.0
        */
        call(number: string): ITelephonyStatus;
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
    interface ICloud extends IBaseData {
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
    interface IDataStream extends IBaseData {
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
    interface IDatabase extends IBaseData {
        /**
           @method
           Creates a database on default path for every platform.
           @param callback Asynchronous callback
           @param database Database object to create
           @since v2.0
        */
        createDatabase(database: Database, callback: IDatabaseResultCallback): any;
        /**
           @method
           Creates a databaseTable inside a database for every platform.
           @param database      Database for databaseTable creating.
           @param databaseTable DatabaseTable object with the name of the databaseTable inside.
           @param callback      DatabaseTable callback with the response
           @since v2.0
        */
        createTable(database: Database, databaseTable: DatabaseTable, callback: IDatabaseTableResultCallback): any;
        /**
           @method
           Deletes a database on default path for every platform.
           @param database Database object to delete
           @param callback Asynchronous callback
           @since v2.0
        */
        deleteDatabase(database: Database, callback: IDatabaseResultCallback): any;
        /**
           @method
           Deletes a databaseTable inside a database for every platform.
           @param database      Database for databaseTable removal.
           @param databaseTable DatabaseTable object with the name of the databaseTable inside.
           @param callback      DatabaseTable callback with the response
           @since v2.0
        */
        deleteTable(database: Database, databaseTable: DatabaseTable, callback: IDatabaseTableResultCallback): any;
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
        executeSqlStatement(database: Database, statement: string, replacements: Array<string>, callback: IDatabaseTableResultCallback): any;
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
        executeSqlTransactions(database: Database, statements: Array<string>, rollbackFlag: boolean, callback: IDatabaseTableResultCallback): any;
        /**
           @method
           Checks if database exists by given database name.
           @param database Database Object to check if exists
           @return {boolean} True if exists, false otherwise
           @since v2.0
        */
        existsDatabase(database: Database): boolean;
        /**
           @method
           Checks if databaseTable exists by given database name.
           @param database      Database for databaseTable consulting.
           @param databaseTable DatabaseTable object with the name of the databaseTable inside.
           @return {boolean} True if exists, false otherwise
           @since v2.0
        */
        existsTable(database: Database, databaseTable: DatabaseTable): boolean;
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
    interface IFile extends IBaseData {
        /**
           @method
           Determine whether the current file/folder can be read from.
           @param descriptor File descriptor of file or folder used for operation.
           @return {boolean} True if the folder/file is readable, false otherwise.
           @since v2.0
        */
        canRead(descriptor: FileDescriptor): boolean;
        /**
           @method
           Determine whether the current file/folder can be written to.
           @param descriptor File descriptor of file or folder used for operation.
           @return {boolean} True if the folder/file is writable, false otherwise.
           @since v2.0
        */
        canWrite(descriptor: FileDescriptor): boolean;
        /**
           @method
           Creates a file with the specified name.
           @param descriptor File descriptor of file or folder used for operation.
           @param callback   Result of the operation.
           @since v2.0
        */
        create(descriptor: FileDescriptor, callback: IFileResultCallback): any;
        /**
           @method
           Deletes the given file or path. If the file is a directory and contains files and or subdirectories, these will be
deleted if the cascade parameter is set to true.
           @param descriptor File descriptor of file or folder used for operation.
           @param cascade    Whether to delete sub-files and sub-folders.
           @return {boolean} True if files (and sub-files and folders) whether deleted.
           @since v2.0
        */
        delete(descriptor: FileDescriptor, cascade: boolean): boolean;
        /**
           @method
           Check whether the file/path exists.
           @param descriptor File descriptor of file or folder used for operation.
           @return {boolean} True if the file exists in the filesystem, false otherwise.
           @since v2.0
        */
        exists(descriptor: FileDescriptor): boolean;
        /**
           @method
           Loads the content of the file.
           @param descriptor File descriptor of file or folder used for operation.
           @param callback   Result of the operation.
           @since v2.0
        */
        getContent(descriptor: FileDescriptor, callback: IFileDataLoadResultCallback): any;
        /**
           @method
           Returns the file storage type of the file
           @param descriptor File descriptor of file or folder used for operation.
           @return {Adaptive.IFileSystemStorageType} Storage Type file
           @since v2.0
        */
        getFileStorageType(descriptor: FileDescriptor): IFileSystemStorageType;
        /**
           @method
           Returns the file type
           @param descriptor File descriptor of file or folder used for operation.
           @return {Adaptive.IFileSystemType} Returns the file type of the file
           @since v2.0
        */
        getFileType(descriptor: FileDescriptor): IFileSystemType;
        /**
           @method
           Returns the security type of the file
           @param descriptor File descriptor of file or folder used for operation.
           @return {Adaptive.IFileSystemSecurity} Security Level of the file
           @since v2.0
        */
        getSecurityType(descriptor: FileDescriptor): IFileSystemSecurity;
        /**
           @method
           Check whether this is a path of a file.
           @param descriptor File descriptor of file or folder used for operation.
           @return {boolean} true if this is a path to a folder/directory, false if this is a path to a file.
           @since v2.0
        */
        isDirectory(descriptor: FileDescriptor): boolean;
        /**
           @method
           List all the files matching the speficied regex filter within this file/path reference. If the reference
is a file, it will not yield any results.
           @param descriptor File descriptor of file or folder used for operation.
           @param regex      Filter (eg. *.jpg, *.png, Fil*) name string.
           @param callback   Result of operation.
           @since v2.0
        */
        listFilesForRegex(descriptor: FileDescriptor, regex: string, callback: IFileListResultCallback): any;
        /**
           @method
           List all the files contained within this file/path reference. If the reference is a file, it will not yield
any results.
           @param descriptor File descriptor of file or folder used for operation.
           @param callback   Result of operation.
           @since v2.0
        */
        listFiles(descriptor: FileDescriptor, callback: IFileListResultCallback): any;
        /**
           @method
           Creates the parent path (or paths, if recursive) to the given file/path if it doesn't already exist.
           @param descriptor File descriptor of file or folder used for operation.
           @param recursive  Whether to create all parent path elements.
           @return {boolean} True if the path was created, false otherwise (or it exists already).
           @since v2.0
        */
        mkDir(descriptor: FileDescriptor, recursive: boolean): boolean;
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
        move(source: FileDescriptor, destination: FileDescriptor, createPath: boolean, overwrite: boolean, callback: IFileResultCallback): any;
        /**
           @method
           Sets the content of the file.
           @param descriptor File descriptor of file or folder used for operation.
           @param content    Binary content to store in the file.
           @param callback   Result of the operation.
           @since v2.0
        */
        setContent(descriptor: FileDescriptor, content: Array<number>, callback: IFileDataStoreResultCallback): any;
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
    interface IFileSystem extends IBaseData {
        /**
           @method
           Creates a new reference to a new or existing location in the filesystem.
This method does not create the actual file in the specified folder.
           @param parent Parent directory.
           @param name   Name of new file or directory.
           @return {Adaptive.FileDescriptor} A reference to a new or existing location in the filesystem.
           @since v2.0
        */
        createFileDescriptor(parent: FileDescriptor, name: string): FileDescriptor;
        /**
           @method
           Returns a reference to the cache folder for the current application.
This path must always be writable by the current application.
This path is volatile and may be cleaned by the OS periodically.
           @return {Adaptive.FileDescriptor} Path to the application's cache folder.
           @since v2.0
        */
        getApplicationCacheFolder(): FileDescriptor;
        /**
           @method
           Returns a reference to the cloud synchronizable folder for the current application.
This path must always be writable by the current application.
           @return {Adaptive.FileDescriptor} Path to the application's cloud storage folder.
           @since v2.0
        */
        getApplicationCloudFolder(): FileDescriptor;
        /**
           @method
           Returns a reference to the documents folder for the current application.
This path must always be writable by the current application.
           @return {Adaptive.FileDescriptor} Path to the application's documents folder.
           @since v2.0
        */
        getApplicationDocumentsFolder(): FileDescriptor;
        /**
           @method
           Returns a reference to the application installation folder.
This path may or may not be directly readable or writable - it usually contains the app binary and data.
           @return {Adaptive.FileDescriptor} Path to the application folder.
           @since v2.0
        */
        getApplicationFolder(): FileDescriptor;
        /**
           @method
           Returns a reference to the protected storage folder for the current application.
This path must always be writable by the current application.
           @return {Adaptive.FileDescriptor} Path to the application's protected storage folder.
           @since v2.0
        */
        getApplicationProtectedFolder(): FileDescriptor;
        /**
           @method
           Returns the file system dependent file separator.
           @return {string} char with the directory/file separator.
           @since v2.0
        */
        getSeparator(): string;
        /**
           @method
           Returns a reference to the external storage folder provided by the OS. This may
be an external SSD card or similar. This type of storage is removable and by
definition, not secure.
This path may or may not be writable by the current application.
           @return {Adaptive.FileDescriptor} Path to the application's documents folder.
           @since v2.0
        */
        getSystemExternalFolder(): FileDescriptor;
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
    interface IInternalStorage extends IBaseData {
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
    interface IXML extends IBaseData {
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
    interface IAccelerationListener extends IBaseListener {
        /**
           @method
           No data received - error condition, not authorized or hardware not available. This will be reported once for the
listener and subsequently, the listener will be deactivated and removed from the internal list of listeners.
           @param error Error fired
           @since v2.0
        */
        onError(error: IAccelerationListenerError): any;
        /**
           @method
           Correct data received.
           @param acceleration Acceleration received
           @since v2.0
        */
        onResult(acceleration: Acceleration): any;
        /**
           @method
           Data received with warning - ie. Needs calibration.
           @param acceleration Acceleration received
           @param warning      Warning fired
           @since v2.0
        */
        onWarning(acceleration: Acceleration, warning: IAccelerationListenerWarning): any;
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
    interface IButtonListener extends IBaseListener {
        /**
           @method
           No data received
           @param error occurred
           @since v2.0
        */
        onError(error: IButtonListenerError): any;
        /**
           @method
           Called on button pressed
           @param button pressed
           @since v2.0
        */
        onResult(button: Button): any;
        /**
           @method
           Data received with warning
           @param button  pressed
           @param warning happened
           @since v2.0
        */
        onWarning(button: Button, warning: IButtonListenerWarning): any;
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
    interface IDeviceOrientationListener extends IBaseListener {
        /**
           @method
           Although extremely unlikely, this event will be fired if something beyond the control of the
platform impedes the rotation of the device.
           @param error The error condition... generally unknown as it is unexpected!
           @since v2.0.5
        */
        onError(error: IDeviceOrientationListenerError): any;
        /**
           @method
           Event fired with the successful start and finish of a rotation.
           @param rotationEvent RotationEvent containing origin, destination and state of the event.
           @since v2.0.5
        */
        onResult(rotationEvent: RotationEvent): any;
        /**
           @method
           Event fired with a warning when the rotation is aborted. In specific, this
event may be fired if the devices vetoes the rotation before rotation is completed.
           @param rotationEvent   RotationEvent containing origin, destination and state of the event.
           @param warning Type of condition that aborted rotation execution.
           @since v2.0.5
        */
        onWarning(rotationEvent: RotationEvent, warning: IDeviceOrientationListenerWarning): any;
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
    interface IDisplayOrientationListener extends IBaseListener {
        /**
           @method
           Although extremely unlikely, this event will be fired if something beyond the control of the
platform impedes the rotation of the display.
           @param error The error condition... generally unknown as it is unexpected!
           @since v2.0.5
        */
        onError(error: IDisplayOrientationListenerError): any;
        /**
           @method
           Event fired with the successful start and finish of a rotation.
           @param rotationEvent RotationEvent containing origin, destination and state of the event.
           @since v2.0.5
        */
        onResult(rotationEvent: RotationEvent): any;
        /**
           @method
           Event fired with a warning when the rotation is aborted. In specific, this
event may be fired if the application vetoes display rotation before rotation is completed.
           @param rotationEvent   RotationEvent containing origin, destination and state of the event.
           @param warning Type of condition that aborted rotation execution.
           @since v2.0.5
        */
        onWarning(rotationEvent: RotationEvent, warning: IDisplayOrientationListenerWarning): any;
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
    interface IGeolocationListener extends IBaseListener {
        /**
           @method
           No data received - error condition, not authorized or hardware not available.
           @param error Type of error encountered during reading.
           @since v2.0
        */
        onError(error: IGeolocationListenerError): any;
        /**
           @method
           Correct data received.
           @param geolocation Geolocation Bean
           @since v2.0
        */
        onResult(geolocation: Geolocation): any;
        /**
           @method
           Data received with warning - ie. HighDoP
           @param geolocation Geolocation Bean
           @param warning     Type of warning encountered during reading.
           @since v2.0
        */
        onWarning(geolocation: Geolocation, warning: IGeolocationListenerWarning): any;
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
    interface ILifecycleListener extends IBaseListener {
        /**
           @method
           No data received - error condition, not authorized or hardware not available.
           @param error Type of error encountered during reading.
           @since v2.0
        */
        onError(error: ILifecycleListenerError): any;
        /**
           @method
           Called when lifecycle changes somehow.
           @param lifecycle Lifecycle element
           @since v2.0
        */
        onResult(lifecycle: Lifecycle): any;
        /**
           @method
           Data received with warning
           @param lifecycle Lifecycle element
           @param warning   Type of warning encountered during reading.
           @since v2.0
        */
        onWarning(lifecycle: Lifecycle, warning: ILifecycleListenerWarning): any;
    }
    /**
       Interface for Managing the Network status listener networkEvents

       @author Carlos Lozano Diez
       @since v2.0
       @version 1.0
    */
    /**
       @class Adaptive.INetworkStatusListener
    */
    interface INetworkStatusListener extends IBaseListener {
        /**
           @method
           No data received - error condition, not authorized or hardware not available.
           @param error Type of error encountered during reading.
           @since v2.0
        */
        onError(error: INetworkStatusListenerError): any;
        /**
           @method
           Called when network connection changes somehow.
           @param networkEvent Change to this network.
           @since v2.0
        */
        onResult(networkEvent: NetworkEvent): any;
        /**
           @method
           Status received with warning
           @param networkEvent Change to this network.
           @param warning Type of warning encountered during reading.
           @since v2.0
        */
        onWarning(networkEvent: NetworkEvent, warning: INetworkStatusListenerWarning): any;
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
    interface IAudio extends IBaseMedia {
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
    interface ICamera extends IBaseMedia {
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
    interface IImaging extends IBaseMedia {
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
    interface IVideo extends IBaseMedia {
        /**
           @method
           Play url video stream
           @param url of the video
           @since v2.0
        */
        playStream(url: string): any;
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
    interface IAlarm extends IBaseNotification {
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
    interface INotification extends IBaseNotification {
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
    interface INotificationLocal extends IBaseNotification {
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
    interface IVibration extends IBaseNotification {
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
    interface ICalendar extends IBasePIM {
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
    interface IContact extends IBasePIM {
        /**
           @method
           Get the contact photo
           @param contact  id to search for
           @param callback called for return
           @since v2.0
        */
        getContactPhoto(contact: ContactUid, callback: IContactPhotoResultCallback): any;
        /**
           @method
           Get all the details of a contact according to its id
           @param contact  id to search for
           @param callback called for return
           @since v2.0
        */
        getContact(contact: ContactUid, callback: IContactResultCallback): any;
        /**
           @method
           Get marked fields of all contacts
           @param callback called for return
           @param fields   to get for each Contact
           @since v2.0
        */
        getContactsForFields(callback: IContactResultCallback, fields: Array<IContactFieldGroup>): any;
        /**
           @method
           Get marked fields of all contacts according to a filter
           @param callback called for return
           @param fields   to get for each Contact
           @param filter   to search for
           @since v2.0
        */
        getContactsWithFilter(callback: IContactResultCallback, fields: Array<IContactFieldGroup>, filter: Array<IContactFilter>): any;
        /**
           @method
           Get all contacts
           @param callback called for return
           @since v2.0
        */
        getContacts(callback: IContactResultCallback): any;
        /**
           @method
           Search contacts according to a term with a filter and send it to the callback
           @param term     string to search
           @param callback called for return
           @param filter   to search for
           @since v2.0
        */
        searchContactsWithFilter(term: string, callback: IContactResultCallback, filter: Array<IContactFilter>): any;
        /**
           @method
           Search contacts according to a term and send it to the callback
           @param term     string to search
           @param callback called for return
           @since v2.0
        */
        searchContacts(term: string, callback: IContactResultCallback): any;
        /**
           @method
           Set the contact photo
           @param contact  id to assign the photo
           @param pngImage photo as byte array
           @return {boolean} true if set is successful;false otherwise
           @since v2.0
        */
        setContactPhoto(contact: ContactUid, pngImage: Array<number>): boolean;
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
    interface IMail extends IBasePIM {
        /**
           @method
           Send an Email
           @param data     Payload of the email
           @param callback Result callback of the operation
           @since v2.0
        */
        sendEmail(data: Email, callback: IMessagingCallback): any;
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
    interface IMessaging extends IBasePIM {
        /**
           @method
           Send text SMS
           @param number   to send
           @param text     to send
           @param callback with the result
           @since v2.0
        */
        sendSMS(number: string, text: string, callback: IMessagingCallback): any;
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
    interface IBarcode extends IBaseReader {
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
    interface INFC extends IBaseReader {
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
    interface IOCR extends IBaseReader {
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
    interface IQRCode extends IBaseReader {
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
    interface IOAuth extends IBaseSecurity {
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
    interface IOpenId extends IBaseSecurity {
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
    interface ISecurity extends IBaseSecurity {
        /**
           @method
           Deletes from the device internal storage the entry/entries containing the specified key names.
           @param keys             Array with the key names to delete.
           @param publicAccessName The name of the shared internal storage object (if needed).
           @param callback         callback to be executed upon function result.
           @since v2.0
        */
        deleteSecureKeyValuePairs(keys: Array<string>, publicAccessName: string, callback: ISecurityResultCallback): any;
        /**
           @method
           Retrieves from the device internal storage the entry/entries containing the specified key names.
           @param keys             Array with the key names to retrieve.
           @param publicAccessName The name of the shared internal storage object (if needed).
           @param callback         callback to be executed upon function result.
           @since v2.0
        */
        getSecureKeyValuePairs(keys: Array<string>, publicAccessName: string, callback: ISecurityResultCallback): any;
        /**
           @method
           Returns if the device has been modified in anyhow
           @return {boolean} true if the device has been modified; false otherwise
           @since v2.0
        */
        isDeviceModified(): boolean;
        /**
           @method
           Stores in the device internal storage the specified item/s.
           @param keyValues        Array containing the items to store on the device internal memory.
           @param publicAccessName The name of the shared internal storage object (if needed).
           @param callback         callback to be executed upon function result.
           @since v2.0
        */
        setSecureKeyValuePairs(keyValues: Array<SecureKeyPair>, publicAccessName: string, callback: ISecurityResultCallback): any;
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
    interface IAcceleration extends IBaseSensor {
        /**
           @method
           Register a new listener that will receive acceleration events.
           @param listener to be registered.
           @since v2.0
        */
        addAccelerationListener(listener: IAccelerationListener): any;
        /**
           @method
           De-registers an existing listener from receiving acceleration events.
           @param listener to be registered.
           @since v2.0
        */
        removeAccelerationListener(listener: IAccelerationListener): any;
        /**
           @method
           Removed all existing listeners from receiving acceleration events.
           @since v2.0
        */
        removeAccelerationListeners(): any;
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
    interface IAmbientLight extends IBaseSensor {
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
    interface IBarometer extends IBaseSensor {
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
    interface IGeolocation extends IBaseSensor {
        /**
           @method
           Register a new listener that will receive geolocation events.
           @param listener to be registered.
           @since v2.0
        */
        addGeolocationListener(listener: IGeolocationListener): any;
        /**
           @method
           De-registers an existing listener from receiving geolocation events.
           @param listener to be registered.
           @since v2.0
        */
        removeGeolocationListener(listener: IGeolocationListener): any;
        /**
           @method
           Removed all existing listeners from receiving geolocation events.
           @since v2.0
        */
        removeGeolocationListeners(): any;
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
    interface IGyroscope extends IBaseSensor {
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
    interface IMagnetometer extends IBaseSensor {
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
    interface IProximity extends IBaseSensor {
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
    interface IFacebook extends IBaseSocial {
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
    interface IGooglePlus extends IBaseSocial {
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
    interface ILinkedIn extends IBaseSocial {
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
    interface IRSS extends IBaseSocial {
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
    interface ITwitter extends IBaseSocial {
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
    interface ICapabilities extends IBaseSystem {
        /**
           @method
           Obtains the default orientation of the device/display. If no default orientation is available on
the platform, this method will return the current orientation. To capture device or display orientation
changes please use the IDevice and IDisplay functions and listeners API respectively.
           @return {Adaptive.ICapabilitiesOrientation} The default orientation for the device/display.
           @since v2.0.5
        */
        getOrientationDefault(): ICapabilitiesOrientation;
        /**
           @method
           Provides the device/display orientations supported by the platform. A platform will usually
support at least one orientation. This is usually PortaitUp.
           @return {Adaptive.ICapabilitiesOrientation[]} The orientations supported by the device/display of the platform.
           @since v2.0.5
        */
        getOrientationsSupported(): Array<ICapabilitiesOrientation>;
        /**
           @method
           Determines whether a specific hardware button is supported for interaction.
           @param type Type of feature to check.
           @return {boolean} true is supported, false otherwise.
           @since v2.0
        */
        hasButtonSupport(type: ICapabilitiesButton): boolean;
        /**
           @method
           Determines whether a specific Communication capability is supported by
the device.
           @param type Type of feature to check.
           @return {boolean} true if supported, false otherwise.
           @since v2.0
        */
        hasCommunicationSupport(type: ICapabilitiesCommunication): boolean;
        /**
           @method
           Determines whether a specific Data capability is supported by the device.
           @param type Type of feature to check.
           @return {boolean} true if supported, false otherwise.
           @since v2.0
        */
        hasDataSupport(type: ICapabilitiesData): boolean;
        /**
           @method
           Determines whether a specific Media capability is supported by the
device.
           @param type Type of feature to check.
           @return {boolean} true if supported, false otherwise.
           @since v2.0
        */
        hasMediaSupport(type: ICapabilitiesMedia): boolean;
        /**
           @method
           Determines whether a specific Net capability is supported by the device.
           @param type Type of feature to check.
           @return {boolean} true if supported, false otherwise.
           @since v2.0
        */
        hasNetSupport(type: ICapabilitiesNet): boolean;
        /**
           @method
           Determines whether a specific Notification capability is supported by the
device.
           @param type Type of feature to check.
           @return {boolean} true if supported, false otherwise.
           @since v2.0
        */
        hasNotificationSupport(type: ICapabilitiesNotification): boolean;
        /**
           @method
           Determines whether the device/display supports a given orientation.
           @param orientation Orientation type.
           @return {boolean} True if the given orientation is supported, false otherwise.
           @since v2.0.5
        */
        hasOrientationSupport(orientation: ICapabilitiesOrientation): boolean;
        /**
           @method
           Determines whether a specific Sensor capability is supported by the
device.
           @param type Type of feature to check.
           @return {boolean} true if supported, false otherwise.
           @since v2.0
        */
        hasSensorSupport(type: ICapabilitiesSensor): boolean;
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
    interface IDevice extends IBaseSystem {
        /**
           @method
           Register a new listener that will receive button events.
           @param listener to be registered.
           @since v2.0
        */
        addButtonListener(listener: IButtonListener): any;
        /**
           @method
           Add a listener to start receiving device orientation change events.
           @param listener Listener to add to receive orientation change events.
           @since v2.0.5
        */
        addDeviceOrientationListener(listener: IDeviceOrientationListener): any;
        /**
           @method
           Returns the device information for the current device executing the runtime.
           @return {Adaptive.DeviceInfo} DeviceInfo for the current device.
           @since v2.0
        */
        getDeviceInfo(): DeviceInfo;
        /**
           @method
           Gets the current Locale for the device.
           @return {Adaptive.Locale} The current Locale information.
           @since v2.0
        */
        getLocaleCurrent(): Locale;
        /**
           @method
           Returns the current orientation of the device. Please note that this may be different from the orientation
of the display. For display orientation, use the IDisplay APIs.
           @return {Adaptive.ICapabilitiesOrientation} The current orientation of the device.
           @since v2.0.5
        */
        getOrientationCurrent(): ICapabilitiesOrientation;
        /**
           @method
           De-registers an existing listener from receiving button events.
           @param listener to be removed.
           @since v2.0
        */
        removeButtonListener(listener: IButtonListener): any;
        /**
           @method
           Removed all existing listeners from receiving button events.
           @since v2.0
        */
        removeButtonListeners(): any;
        /**
           @method
           Remove a listener to stop receiving device orientation change events.
           @param listener Listener to remove from receiving orientation change events.
           @since v2.0.5
        */
        removeDeviceOrientationListener(listener: IDeviceOrientationListener): any;
        /**
           @method
           Remove all listeners receiving device orientation events.
           @since v2.0.5
        */
        removeDeviceOrientationListeners(): any;
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
    interface IDisplay extends IBaseSystem {
        /**
           @method
           Add a listener to start receiving display orientation change events.
           @param listener Listener to add to receive orientation change events.
           @since v2.0.5
        */
        addDisplayOrientationListener(listener: IDisplayOrientationListener): any;
        /**
           @method
           Returns the current orientation of the display. Please note that this may be different from the orientation
of the device. For device orientation, use the IDevice APIs.
           @return {Adaptive.ICapabilitiesOrientation} The current orientation of the display.
           @since v2.0.5
        */
        getOrientationCurrent(): ICapabilitiesOrientation;
        /**
           @method
           Remove a listener to stop receiving display orientation change events.
           @param listener Listener to remove from receiving orientation change events.
           @since v2.0.5
        */
        removeDisplayOrientationListener(listener: IDisplayOrientationListener): any;
        /**
           @method
           Remove all listeners receiving display orientation events.
           @since v2.0.5
        */
        removeDisplayOrientationListeners(): any;
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
    interface IOS extends IBaseSystem {
        /**
           @method
           Returns the OSInfo for the current operating system.
           @return {Adaptive.OSInfo} OSInfo with name, version and vendor of the OS.
           @since v2.0
        */
        getOSInfo(): OSInfo;
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
    interface IRuntime extends IBaseSystem {
        /**
           @method
           Dismiss the current Application
           @since v2.0
        */
        dismissApplication(): any;
        /**
           @method
           Whether the application dismiss the splash screen successfully or not
           @return {boolean} true if the application has dismissed the splash screen;false otherwise
           @since v2.0
        */
        dismissSplashScreen(): boolean;
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
    /**
       Interface for Managing the Desktop operations

       @author Carlos Lozano Diez
       @since v2.0
       @version 1.0
    */
    /**
       @class Adaptive.IDesktop
    */
    interface IDesktop extends IBaseUI {
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
    interface IMap extends IBaseUI {
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
    interface IUI extends IBaseUI {
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
    interface ICompression extends IBaseUtil {
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
    interface IConcurrent extends IBaseUtil {
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
    interface ICrypto extends IBaseUtil {
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
    interface ILogging extends IBaseUtil {
        /**
           Logs the given message, with the given log level if specified, to the standard platform/environment.
           @param level    Log level
           @param category Category/tag name to identify/filter the log.
           @param message  Message to be logged
           @since v2.0
        */
        logLevelCategoryMessage(level: ILoggingLogLevel, category: string, message: string): any;
        /**
           Logs the given message, with the given log level if specified, to the standard platform/environment.
           @param level   Log level
           @param message Message to be logged
           @since v2.0
        */
        logLevelMessage(level: ILoggingLogLevel, message: string): any;
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
    interface ITimer extends IBaseUtil {
    }
    /**
       @class Adaptive.APIBean
       Structure representing a native response to the HTML5

       @author Carlos Lozano Diez
       @since v2.0
       @version 1.0
    */
    class APIBean {
        /**
           @method constructor
           Default constructor

           @since v2.0
        */
        constructor();
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.APIBean.
           @return {Adaptive.APIBean} Wrapped object instance.
        */
        static toObject(object: any): APIBean;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.APIBean[].
           @return {Adaptive.APIBean[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): APIBean[];
    }
    /**
       @class Adaptive.APIRequest
       Structure representing a HTML5 request to the native API.

       @author Carlos Lozano Diez
       @since v2.0
       @version 1.0
    */
    class APIRequest {
        /**
           @property {string} apiVersion
           Identifier of API version of this request.
        */
        apiVersion: string;
        /**
           @property {string} apiVersion
           Identifier of API version of this request. The 'apiVersionProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'apiVersion'.
        */
        apiVersionProperty: string;
        /**
           @property {number} asyncId
           Identifier of callback or listener for async operations.
        */
        asyncId: number;
        /**
           @property {number} asyncId
           Identifier of callback or listener for async operations. The 'asyncIdProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'asyncId'.
        */
        asyncIdProperty: number;
        /**
           @property {string} bridgeType
           String representing the bridge type to obtain.
        */
        bridgeType: string;
        /**
           @property {string} bridgeType
           String representing the bridge type to obtain. The 'bridgeTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'bridgeType'.
        */
        bridgeTypeProperty: string;
        /**
           @property {string} methodName
           String representing the method name to call.
        */
        methodName: string;
        /**
           @property {string} methodName
           String representing the method name to call. The 'methodNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'methodName'.
        */
        methodNameProperty: string;
        /**
           @property {string[]} parameters
           Parameters of the request as JSON formatted strings.
        */
        parameters: Array<string>;
        /**
           @property {string[]} parameters
           Parameters of the request as JSON formatted strings. The 'parametersProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'parameters'.
        */
        parametersProperty: Array<string>;
        /**
           @method constructor
           Constructor with all the parameters

           @param {string} bridgeType Name of the bridge to be invoked.
           @param {string} methodName Name of the method
           @param {string[]} parameters Array of parameters as JSON formatted strings.
           @param {number} asyncId    Id of callback or listener or zero if none for synchronous calls.
           @since v2.0
        */
        constructor(bridgeType: string, methodName: string, parameters: Array<string>, asyncId: number);
        /**
           @method
           Returns the request's API version. This should be the same or higher than the platform managing the
request.

           @return {string} String with the API version of the request.
        */
        getApiVersion(): string;
        /**
           @method
           Sets the request's API version. This should be the same or higher than the platform managing the
request.

           @param {string} apiVersion String with the API version of the request.
        */
        setApiVersion(apiVersion: string): void;
        /**
           @method
           Returns the callback or listener id assigned to this request OR zero if there is no associated callback or
listener.

           @return {number} long with the unique id of the callback or listener, or zero if there is no associated async event.
        */
        getAsyncId(): number;
        /**
           @method
           Sets the callback or listener id to the request.

           @param {number} asyncId The unique id of the callback or listener.
        */
        setAsyncId(asyncId: number): void;
        /**
           @method
           Bridge Type Getter

           @return {string} Bridge Type
           @since v2.0
        */
        getBridgeType(): string;
        /**
           @method
           Bridge Type Setter

           @param {string} bridgeType Bridge Type
           @since v2.0
        */
        setBridgeType(bridgeType: string): void;
        /**
           @method
           Method name Getter

           @return {string} Method name
           @since v2.0
        */
        getMethodName(): string;
        /**
           @method
           Method name Setter

           @param {string} methodName Method name
           @since v2.0
        */
        setMethodName(methodName: string): void;
        /**
           @method
           Parameters Getter

           @return {string[]} Parameters
           @since v2.0
        */
        getParameters(): Array<string>;
        /**
           @method
           Parameters Setter

           @param {string[]} parameters Parameters, JSON formatted strings of objects.
           @since v2.0
        */
        setParameters(parameters: Array<string>): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.APIRequest.
           @return {Adaptive.APIRequest} Wrapped object instance.
        */
        static toObject(object: any): APIRequest;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.APIRequest[].
           @return {Adaptive.APIRequest[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): APIRequest[];
    }
    /**
       @class Adaptive.APIResponse
       Structure representing a JSON response to the HTML5 layer.

       @author Carlos Lozano Diez
       @since v2.0
       @version 1.0
    */
    class APIResponse {
        /**
           @property {string} response
           String representing the JavaScript value or JSON object representation of the response.
        */
        response: string;
        /**
           @property {string} response
           String representing the JavaScript value or JSON object representation of the response. The 'responseProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'response'.
        */
        responseProperty: string;
        /**
           @property {number} statusCode
           Status code of the response
        */
        statusCode: number;
        /**
           @property {number} statusCode
           Status code of the response The 'statusCodeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'statusCode'.
        */
        statusCodeProperty: number;
        /**
           @property {string} statusMessage
           Status message of the response
        */
        statusMessage: string;
        /**
           @property {string} statusMessage
           Status message of the response The 'statusMessageProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'statusMessage'.
        */
        statusMessageProperty: string;
        /**
           @method constructor
           Constructor with parameters.

           @param {string} response      String representing the JavaScript value or JSON object representation of the response.
           @param {number} statusCode    Status code of the response (200 = OK, others are warning or error conditions).
           @param {string} statusMessage Status message of the response.
        */
        constructor(response: string, statusCode: number, statusMessage: string);
        /**
           @method
           Response getter

           @return {string} String representing the JavaScript value or JSON object representation of the response.
           @since v2.0
        */
        getResponse(): string;
        /**
           @method
           Response setter

           @param {string} response String representing the JavaScript value or JSON object representation of the response.
        */
        setResponse(response: string): void;
        /**
           @method
           Status code getter

           @return {number} Status code of the response (200 = OK, others are warning or error conditions).
        */
        getStatusCode(): number;
        /**
           @method
           Status code setter

           @param {number} statusCode Status code of the response  (200 = OK, others are warning or error conditions).
        */
        setStatusCode(statusCode: number): void;
        /**
           @method
           Status message getter

           @return {string} Status message of the response.
        */
        getStatusMessage(): string;
        /**
           @method
           Status message setter.

           @param {string} statusMessage Status message of the response
        */
        setStatusMessage(statusMessage: string): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.APIResponse.
           @return {Adaptive.APIResponse} Wrapped object instance.
        */
        static toObject(object: any): APIResponse;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.APIResponse[].
           @return {Adaptive.APIResponse[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): APIResponse[];
    }
    /**
       @class Adaptive.AppResourceData
       This class represents a resource provided by the platform from the application's secure payload.

       @author Carlos Lozano Diez
       @since v2.1.3
       @version 1.0
    */
    class AppResourceData {
        /**
           @property {boolean} cooked
           Marker to indicate whether the resource is cooked in some way (compressed, encrypted, etc.) If true, the
implementation must uncompress/unencrypt following the cookedType recipe specified by the payload.
        */
        cooked: boolean;
        /**
           @property {boolean} cooked
           Marker to indicate whether the resource is cooked in some way (compressed, encrypted, etc.) If true, the
implementation must uncompress/unencrypt following the cookedType recipe specified by the payload. The 'cookedProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'cooked'.
        */
        cookedProperty: boolean;
        /**
           @property {number} cookedLength
           This is the length of the payload after cooking. In general, this length indicates the amount
of space saved with regard to the rawLength of the payload.
        */
        cookedLength: number;
        /**
           @property {number} cookedLength
           This is the length of the payload after cooking. In general, this length indicates the amount
of space saved with regard to the rawLength of the payload. The 'cookedLengthProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'cookedLength'.
        */
        cookedLengthProperty: number;
        /**
           @property {string} cookedType
           If the data is cooked, this field should contain the recipe to return the cooked data to its original
uncompressed/unencrypted/etc format.
        */
        cookedType: string;
        /**
           @property {string} cookedType
           If the data is cooked, this field should contain the recipe to return the cooked data to its original
uncompressed/unencrypted/etc format. The 'cookedTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'cookedType'.
        */
        cookedTypeProperty: string;
        /**
           @property {number[]} data
           The payload data of the resource in ready to consume format.
        */
        data: Array<number>;
        /**
           @property {number[]} data
           The payload data of the resource in ready to consume format. The 'dataProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'data'.
        */
        dataProperty: Array<number>;
        /**
           @property {string} id
           The id or path identifier of the resource.
        */
        id: string;
        /**
           @property {string} id
           The id or path identifier of the resource. The 'idProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'id'.
        */
        idProperty: string;
        /**
           @property {number} rawLength
           The raw length of the payload before any cooking occurred. This is equivalent to the size of the resource
after uncompressing and unencrypting.
        */
        rawLength: number;
        /**
           @property {number} rawLength
           The raw length of the payload before any cooking occurred. This is equivalent to the size of the resource
after uncompressing and unencrypting. The 'rawLengthProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'rawLength'.
        */
        rawLengthProperty: number;
        /**
           @property {string} rawType
           The raw type of the payload - this is equivalent to the mimetype of the content.
        */
        rawType: string;
        /**
           @property {string} rawType
           The raw type of the payload - this is equivalent to the mimetype of the content. The 'rawTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'rawType'.
        */
        rawTypeProperty: string;
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
        constructor(id: string, data: Array<number>, rawType: string, rawLength: number, cooked: boolean, cookedType: string, cookedLength: number);
        /**
           @method
           Attribute to denote whether the payload of the resource is cooked.

           @return {boolean} True if the resource is cooked, false otherwise.
           @since v2.1.3
        */
        getCooked(): boolean;
        /**
           @method
           Attribute to denote whether the payload of the resource is cooked.

           @param {boolean} cooked True if the resource is cooked, false otherwise.
           @since v2.1.3
        */
        setCooked(cooked: boolean): void;
        /**
           @method
           The length in bytes of the payload after cooking.

           @return {number} Length in bytes of cooked payload.
           @since v2.1.3
        */
        getCookedLength(): number;
        /**
           @method
           The length in bytes of the payload after cooking.

           @param {number} cookedLength Length in bytes of cooked payload.
           @since v2.1.3
        */
        setCookedLength(cookedLength: number): void;
        /**
           @method
           If the resource is cooked, this will return the recipe used during cooking.

           @return {string} The cooking recipe to reverse the cooking process.
           @since v2.1.3
        */
        getCookedType(): string;
        /**
           @method
           If the resource is cooked, the type of recipe used during cooking.

           @param {string} cookedType The cooking recipe used during cooking.
           @since v2.1.3
        */
        setCookedType(cookedType: string): void;
        /**
           @method
           Returns the payload of the resource.

           @return {number[]} Binary payload of the resource.
           @since v2.1.3
        */
        getData(): Array<number>;
        /**
           @method
           Sets the payload of the resource.

           @param {number[]} data Binary payload of the resource.
           @since v2.1.3
        */
        setData(data: Array<number>): void;
        /**
           @method
           Gets The id or path identifier of the resource.

           @return {string} id The id or path identifier of the resource.
        */
        getId(): string;
        /**
           @method
           Sets the id or path of the resource.

           @param {string} id The id or path of the resource.
           @since v2.1.3
        */
        setId(id: string): void;
        /**
           @method
           Gets the resource payload's original length.

           @return {number} Original length of the resource in bytes before cooking.
           @since v2.1.3
        */
        getRawLength(): number;
        /**
           @method
           Sets the resource payload's original length.

           @param {number} rawLength Original length of the resource in bytes before cooking.
           @since v2.1.3
        */
        setRawLength(rawLength: number): void;
        /**
           @method
           Gets the resource's raw type or mimetype.

           @return {string} Resource's type or mimetype.
           @since v2.1.3
        */
        getRawType(): string;
        /**
           @method
           Sets the resource's raw type or mimetype.

           @param {string} rawType Resource's type or mimetype.
           @since v2.1.3
        */
        setRawType(rawType: string): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.AppResourceData.
           @return {Adaptive.AppResourceData} Wrapped object instance.
        */
        static toObject(object: any): AppResourceData;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.AppResourceData[].
           @return {Adaptive.AppResourceData[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): AppResourceData[];
    }
    /**
       @class Adaptive.Service
       Represents an instance of a service.

       @author Aryslan
       @since v2.0
       @version 1.0
    */
    class Service {
        /**
           @property {string} name
           The service name
        */
        name: string;
        /**
           @property {string} name
           The service name The 'nameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'name'.
        */
        nameProperty: string;
        /**
           @property {Adaptive.ServiceEndpoint[]} serviceEndpoints
           Endpoint of the service
        */
        serviceEndpoints: Array<ServiceEndpoint>;
        /**
           @property {Adaptive.ServiceEndpoint[]} serviceEndpoints
           Endpoint of the service The 'serviceEndpointsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'serviceEndpoints'.
        */
        serviceEndpointsProperty: Array<ServiceEndpoint>;
        /**
           @method constructor
           Constructor used by the implementation

           @param {Adaptive.ServiceEndpoint[]} serviceEndpoints Endpoints of the service
           @param {string} name             Name of the service
           @since v2.0.6
        */
        constructor(serviceEndpoints: Array<ServiceEndpoint>, name: string);
        /**
           @method
           Returns the name

           @return {string} name
           @since v2.0
        */
        getName(): string;
        /**
           @method
           Set the name

           @param {string} name Name of the service
           @since v2.0
        */
        setName(name: string): void;
        /**
           @method
           Returns the serviceEndpoints

           @return {Adaptive.ServiceEndpoint[]} serviceEndpoints
           @since v2.0
        */
        getServiceEndpoints(): Array<ServiceEndpoint>;
        /**
           @method
           Set the serviceEndpoints

           @param {Adaptive.ServiceEndpoint[]} serviceEndpoints Endpoint of the service
           @since v2.0
        */
        setServiceEndpoints(serviceEndpoints: Array<ServiceEndpoint>): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Service.
           @return {Adaptive.Service} Wrapped object instance.
        */
        static toObject(object: any): Service;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Service[].
           @return {Adaptive.Service[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): Service[];
    }
    /**
       @class Adaptive.ServiceEndpoint
       Structure representing a remote or local service access end-point.

       @author Aryslan
       @since v2.0
       @version 1.0
    */
    class ServiceEndpoint {
        /**
           @property {Adaptive.IServiceCertificateValidation} validationType
           Type of validation to be performed for SSL hosts.
        */
        validationType: IServiceCertificateValidation;
        /**
           @property {Adaptive.IServiceCertificateValidation} validationType
           Type of validation to be performed for SSL hosts. The 'validationTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'validationType'.
        */
        validationTypeProperty: IServiceCertificateValidation;
        /**
           @property {string} hostURI
           The remote service hostURI URI (alias or IP) composed of scheme://hostURI:port (http://hostURI:8080).
        */
        hostURI: string;
        /**
           @property {string} hostURI
           The remote service hostURI URI (alias or IP) composed of scheme://hostURI:port (http://hostURI:8080). The 'hostURIProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'hostURI'.
        */
        hostURIProperty: string;
        /**
           @property {Adaptive.ServicePath[]} paths
           The remote service paths (to be added to the hostURI and port url).
        */
        paths: Array<ServicePath>;
        /**
           @property {Adaptive.ServicePath[]} paths
           The remote service paths (to be added to the hostURI and port url). The 'pathsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'paths'.
        */
        pathsProperty: Array<ServicePath>;
        /**
           @method constructor
           Constructor with parameters

           @param {string} hostURI Remote service hostURI
           @param {Adaptive.ServicePath[]} paths   Remote service Paths
           @since v2.0.6
        */
        constructor(hostURI: string, paths: Array<ServicePath>);
        /**
           @method
           Gets the validation type for the certificate of a SSL host.

           @return {Adaptive.IServiceCertificateValidation} Type of validation.
           @since v2.0.6
        */
        getValidationType(): IServiceCertificateValidation;
        /**
           @method
           Sets the validation type for the certificate of a SSL host.

           @param {Adaptive.IServiceCertificateValidation} validationType Type of validation.
           @since v2.0.6
        */
        setValidationType(validationType: IServiceCertificateValidation): void;
        /**
           @method
           Returns the Remote service hostURI

           @return {string} Remote service hostURI
           @since v2.0
        */
        getHostURI(): string;
        /**
           @method
           Set the Remote service hostURI

           @param {string} hostURI Remote service hostURI
           @since v2.0
        */
        setHostURI(hostURI: string): void;
        /**
           @method
           Returns the Remote service Paths

           @return {Adaptive.ServicePath[]} Remote service Paths
           @since v2.0
        */
        getPaths(): Array<ServicePath>;
        /**
           @method
           Set the Remote service Paths

           @param {Adaptive.ServicePath[]} paths Remote service Paths
           @since v2.0
        */
        setPaths(paths: Array<ServicePath>): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceEndpoint.
           @return {Adaptive.ServiceEndpoint} Wrapped object instance.
        */
        static toObject(object: any): ServiceEndpoint;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceEndpoint[].
           @return {Adaptive.ServiceEndpoint[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): ServiceEndpoint[];
    }
    /**
       @class Adaptive.ServicePath
       Structure representing a service path for one endpoint

       @author fnva
       @since v2.0.4
       @version 1.0
    */
    class ServicePath {
        /**
           @property {Adaptive.IServiceType} type
           Service endpoint type.
        */
        type: IServiceType;
        /**
           @property {Adaptive.IServiceType} type
           Service endpoint type. The 'typeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'type'.
        */
        typeProperty: IServiceType;
        /**
           @property {Adaptive.IServiceMethod[]} methods
           The methods for calling a path.
        */
        methods: Array<IServiceMethod>;
        /**
           @property {Adaptive.IServiceMethod[]} methods
           The methods for calling a path. The 'methodsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'methods'.
        */
        methodsProperty: Array<IServiceMethod>;
        /**
           @property {string} path
           The path for the endpoint.
        */
        path: string;
        /**
           @property {string} path
           The path for the endpoint. The 'pathProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'path'.
        */
        pathProperty: string;
        /**
           @method constructor
           Constructor with parameters.

           @param {string} path    The path for the endpoint
           @param {Adaptive.IServiceMethod[]} methods The methods for calling a path
           @param {Adaptive.IServiceType} type    Protocol type.
           @since v2.0.6
        */
        constructor(path: string, methods: Array<IServiceMethod>, type: IServiceType);
        /**
           @method
           Gets the protocol for the path.

           @return {Adaptive.IServiceType} Type of protocol.
           @since v2.0.6
        */
        getType(): IServiceType;
        /**
           @method
           Sets the protocol for the path.

           @param {Adaptive.IServiceType} type Type of protocol.
           @since v2.0.6
        */
        setType(type: IServiceType): void;
        /**
           @method
           Endpoint's path methods setter

           @return {Adaptive.IServiceMethod[]} Endpoint's path methods
           @since v2.0.4
        */
        getMethods(): Array<IServiceMethod>;
        /**
           @method
           Endpoint's path methods setter

           @param {Adaptive.IServiceMethod[]} methods Endpoint's path methods
           @since v2.0.4
        */
        setMethods(methods: Array<IServiceMethod>): void;
        /**
           @method
           Endpoint's Path Getter

           @return {string} Endpoint's Path
           @since v2.0.4
        */
        getPath(): string;
        /**
           @method
           Endpoint's path setter

           @param {string} path Endpoint's path
           @since v2.0.4
        */
        setPath(path: string): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServicePath.
           @return {Adaptive.ServicePath} Wrapped object instance.
        */
        static toObject(object: any): ServicePath;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServicePath[].
           @return {Adaptive.ServicePath[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): ServicePath[];
    }
    /**
       @class Adaptive.Acceleration
       @extends Adaptive.APIBean
       Structure representing the data of a single acceleration reading.

       @author Carlos Lozano Diez
       @since v2.0
       @version 1.0
    */
    class Acceleration extends APIBean {
        /**
           @property {number} timestamp
           Timestamp of the acceleration reading.
        */
        timestamp: number;
        /**
           @property {number} timestamp
           Timestamp of the acceleration reading. The 'timestampProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'timestamp'.
        */
        timestampProperty: number;
        /**
           @property {number} x
           X-axis component of the acceleration.
        */
        x: number;
        /**
           @property {number} x
           X-axis component of the acceleration. The 'xProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'x'.
        */
        xProperty: number;
        /**
           @property {number} y
           Y-axis component of the acceleration.
        */
        y: number;
        /**
           @property {number} y
           Y-axis component of the acceleration. The 'yProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'y'.
        */
        yProperty: number;
        /**
           @property {number} z
           Z-axis component of the acceleration.
        */
        z: number;
        /**
           @property {number} z
           Z-axis component of the acceleration. The 'zProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'z'.
        */
        zProperty: number;
        /**
           @method constructor
           Constructor with fields

           @param {number} x         X Coordinate
           @param {number} y         Y Coordinate
           @param {number} z         Z Coordinate
           @param {number} timestamp Timestamp
           @since v2.0
        */
        constructor(x: number, y: number, z: number, timestamp: number);
        /**
           @method
           Timestamp Getter

           @return {number} Timestamp
           @since v2.0
        */
        getTimestamp(): number;
        /**
           @method
           Timestamp Setter

           @param {number} timestamp Timestamp
           @since v2.0
        */
        setTimestamp(timestamp: number): void;
        /**
           @method
           X Coordinate Getter

           @return {number} X-axis component of the acceleration.
           @since v2.0
        */
        getX(): number;
        /**
           @method
           X Coordinate Setter

           @param {number} x X-axis component of the acceleration.
           @since v2.0
        */
        setX(x: number): void;
        /**
           @method
           Y Coordinate Getter

           @return {number} Y-axis component of the acceleration.
           @since v2.0
        */
        getY(): number;
        /**
           @method
           Y Coordinate Setter

           @param {number} y Y-axis component of the acceleration.
           @since v2.0
        */
        setY(y: number): void;
        /**
           @method
           Z Coordinate Getter

           @return {number} Z-axis component of the acceleration.
           @since v2.0
        */
        getZ(): number;
        /**
           @method
           Z Coordinate Setter

           @param {number} z Z Coordinate
           @since v2.0
        */
        setZ(z: number): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Acceleration.
           @return {Adaptive.Acceleration} Wrapped object instance.
        */
        static toObject(object: any): Acceleration;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Acceleration[].
           @return {Adaptive.Acceleration[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): Acceleration[];
    }
    /**
       @class Adaptive.Button
       @extends Adaptive.APIBean
       Structure representing the a physical or logical button on a device.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    class Button extends APIBean {
        /**
           @property {Adaptive.ICapabilitiesButton} type
           Button type
        */
        type: ICapabilitiesButton;
        /**
           @property {Adaptive.ICapabilitiesButton} type
           Button type The 'typeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'type'.
        */
        typeProperty: ICapabilitiesButton;
        /**
           @property {number} timestamp
           Timestamp of the button event.
        */
        timestamp: number;
        /**
           @property {number} timestamp
           Timestamp of the button event. The 'timestampProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'timestamp'.
        */
        timestampProperty: number;
        /**
           @method constructor
           Constructor with fields

           @param {Adaptive.ICapabilitiesButton} type Button type.
           @param {number} timestamp Timestamp of the event
           @since v2.0
        */
        constructor(type: ICapabilitiesButton, timestamp: number);
        /**
           @method
           Returns the button type

           @return {Adaptive.ICapabilitiesButton} type Button type.
           @since v2.0
        */
        getType(): ICapabilitiesButton;
        /**
           @method
           Setter for the button type

           @param {Adaptive.ICapabilitiesButton} type Button Type
           @since v2.0
        */
        setType(type: ICapabilitiesButton): void;
        /**
           @method
           Timestamp Getter

           @return {number} Timestamp
           @since v2.2.1
        */
        getTimestamp(): number;
        /**
           @method
           Timestamp Setter

           @param {number} timestamp Timestamp
           @since v2.2.1
        */
        setTimestamp(timestamp: number): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Button.
           @return {Adaptive.Button} Wrapped object instance.
        */
        static toObject(object: any): Button;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Button[].
           @return {Adaptive.Button[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): Button[];
    }
    /**
       @class Adaptive.ContactAddress
       @extends Adaptive.APIBean
       Structure representing the address data elements of a contact.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    class ContactAddress extends APIBean {
        /**
           @property {Adaptive.ContactAddressType} type
           The address type
        */
        type: ContactAddressType;
        /**
           @property {Adaptive.ContactAddressType} type
           The address type The 'typeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'type'.
        */
        typeProperty: ContactAddressType;
        /**
           @property {string} address
           The Contact address
        */
        address: string;
        /**
           @property {string} address
           The Contact address The 'addressProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'address'.
        */
        addressProperty: string;
        /**
           @method constructor
           Constructor with fields

           @param {string} address Address data.
           @param {Adaptive.ContactAddressType} type    Address type.
           @since v2.0
        */
        constructor(address: string, type: ContactAddressType);
        /**
           @method
           Returns the type of the address

           @return {Adaptive.ContactAddressType} AddressType Address type.
           @since v2.0
        */
        getType(): ContactAddressType;
        /**
           @method
           Set the address type

           @param {Adaptive.ContactAddressType} type Address type.
           @since v2.0
        */
        setType(type: ContactAddressType): void;
        /**
           @method
           Returns the Contact address

           @return {string} address Address data.
           @since v2.0
        */
        getAddress(): string;
        /**
           @method
           Set the address of the Contact

           @param {string} address Address data.
           @since v2.0
        */
        setAddress(address: string): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactAddress.
           @return {Adaptive.ContactAddress} Wrapped object instance.
        */
        static toObject(object: any): ContactAddress;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactAddress[].
           @return {Adaptive.ContactAddress[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): ContactAddress[];
    }
    /**
       @class Adaptive.ContactEmail
       @extends Adaptive.APIBean
       Structure representing the email data elements of a contact.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    class ContactEmail extends APIBean {
        /**
           @property {Adaptive.ContactEmailType} type
           The type of the email
        */
        type: ContactEmailType;
        /**
           @property {Adaptive.ContactEmailType} type
           The type of the email The 'typeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'type'.
        */
        typeProperty: ContactEmailType;
        /**
           @property {string} email
           Email of the Contact
        */
        email: string;
        /**
           @property {string} email
           Email of the Contact The 'emailProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'email'.
        */
        emailProperty: string;
        /**
           @property {boolean} primary
           Whether the email is the primary one or not
        */
        primary: boolean;
        /**
           @property {boolean} primary
           Whether the email is the primary one or not The 'primaryProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'primary'.
        */
        primaryProperty: boolean;
        /**
           @method constructor
           Constructor used by the implementation

           @param {Adaptive.ContactEmailType} type    Type of the email
           @param {boolean} primary Is email primary
           @param {string} email   Email of the contact
           @since v2.0
        */
        constructor(type: ContactEmailType, primary: boolean, email: string);
        /**
           @method
           Returns the type of the email

           @return {Adaptive.ContactEmailType} EmailType
           @since v2.0
        */
        getType(): ContactEmailType;
        /**
           @method
           Set the type of the email

           @param {Adaptive.ContactEmailType} type Type of the email
           @since v2.0
        */
        setType(type: ContactEmailType): void;
        /**
           @method
           Returns the email of the Contact

           @return {string} email
           @since v2.0
        */
        getEmail(): string;
        /**
           @method
           Set the email of the Contact

           @param {string} email Email of the contact
           @since v2.0
        */
        setEmail(email: string): void;
        /**
           @method
           Returns if the email is primary

           @return {boolean} true if the email is primary; false otherwise
           @since v2.0
        */
        getPrimary(): boolean;
        /**
           @method
           Set if the email

           @param {boolean} primary true if the email is primary; false otherwise
           @since v2.0
        */
        setPrimary(primary: boolean): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactEmail.
           @return {Adaptive.ContactEmail} Wrapped object instance.
        */
        static toObject(object: any): ContactEmail;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactEmail[].
           @return {Adaptive.ContactEmail[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): ContactEmail[];
    }
    /**
       @class Adaptive.ContactPersonalInfo
       @extends Adaptive.APIBean
       Structure representing the personal info data elements of a contact.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    class ContactPersonalInfo extends APIBean {
        /**
           @property {Adaptive.ContactPersonalInfoTitle} title
           The title of the Contact
        */
        title: ContactPersonalInfoTitle;
        /**
           @property {Adaptive.ContactPersonalInfoTitle} title
           The title of the Contact The 'titleProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'title'.
        */
        titleProperty: ContactPersonalInfoTitle;
        /**
           @property {string} lastName
           The last name of the Contact
        */
        lastName: string;
        /**
           @property {string} lastName
           The last name of the Contact The 'lastNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'lastName'.
        */
        lastNameProperty: string;
        /**
           @property {string} middleName
           The middle name of the Contact if it proceeds
        */
        middleName: string;
        /**
           @property {string} middleName
           The middle name of the Contact if it proceeds The 'middleNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'middleName'.
        */
        middleNameProperty: string;
        /**
           @property {string} name
           The name of the Contact
        */
        name: string;
        /**
           @property {string} name
           The name of the Contact The 'nameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'name'.
        */
        nameProperty: string;
        /**
           @method constructor
           The Constructor used by the implementation

           @param {string} name       of the Contact
           @param {string} middleName of the Contact
           @param {string} lastName   of the Contact
           @param {Adaptive.ContactPersonalInfoTitle} title      of the Contact
           @since v2.0
        */
        constructor(name: string, middleName: string, lastName: string, title: ContactPersonalInfoTitle);
        /**
           @method
           Returns the title of the Contact

           @return {Adaptive.ContactPersonalInfoTitle} Title
           @since v2.0
        */
        getTitle(): ContactPersonalInfoTitle;
        /**
           @method
           Set the Title of the Contact

           @param {Adaptive.ContactPersonalInfoTitle} title of the Contact
           @since v2.0
        */
        setTitle(title: ContactPersonalInfoTitle): void;
        /**
           @method
           Returns the last name of the Contact

           @return {string} lastName
           @since v2.0
        */
        getLastName(): string;
        /**
           @method
           Set the last name of the Contact

           @param {string} lastName of the Contact
           @since v2.0
        */
        setLastName(lastName: string): void;
        /**
           @method
           Returns the middle name of the Contact

           @return {string} middelName
           @since v2.0
        */
        getMiddleName(): string;
        /**
           @method
           Set the middle name of the Contact

           @param {string} middleName of the Contact
           @since v2.0
        */
        setMiddleName(middleName: string): void;
        /**
           @method
           Returns the name of the Contact

           @return {string} name
           @since v2.0
        */
        getName(): string;
        /**
           @method
           Set the name of the Contact

           @param {string} name of the Contact
           @since v2.0
        */
        setName(name: string): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactPersonalInfo.
           @return {Adaptive.ContactPersonalInfo} Wrapped object instance.
        */
        static toObject(object: any): ContactPersonalInfo;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactPersonalInfo[].
           @return {Adaptive.ContactPersonalInfo[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): ContactPersonalInfo[];
    }
    /**
       @class Adaptive.ContactPhone
       @extends Adaptive.APIBean
       Structure representing the phone data elements of a contact.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    class ContactPhone extends APIBean {
        /**
           @property {Adaptive.ContactPhoneType} phoneType
           The phone number phoneType
        */
        phoneType: ContactPhoneType;
        /**
           @property {Adaptive.ContactPhoneType} phoneType
           The phone number phoneType The 'phoneTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'phoneType'.
        */
        phoneTypeProperty: ContactPhoneType;
        /**
           @property {string} phone
           The phone number
        */
        phone: string;
        /**
           @property {string} phone
           The phone number The 'phoneProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'phone'.
        */
        phoneProperty: string;
        /**
           @method constructor
           Constructor used by implementation to set the contact Phone

           @param {string} phone     Phone number
           @param {Adaptive.ContactPhoneType} phoneType Type of Phone number
           @since v2.0
        */
        constructor(phone: string, phoneType: ContactPhoneType);
        /**
           @method
           Returns the phone phoneType

           @return {Adaptive.ContactPhoneType} phoneType
           @since v2.0
        */
        getPhoneType(): ContactPhoneType;
        /**
           @method
           Set the phoneType of the phone number

           @param {Adaptive.ContactPhoneType} phoneType Type of Phone number
           @since v2.0
        */
        setPhoneType(phoneType: ContactPhoneType): void;
        /**
           @method
           Returns the phone number

           @return {string} phone number
           @since v2.0
        */
        getPhone(): string;
        /**
           @method
           Set the phone number

           @param {string} phone number
           @since v2.0
        */
        setPhone(phone: string): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactPhone.
           @return {Adaptive.ContactPhone} Wrapped object instance.
        */
        static toObject(object: any): ContactPhone;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactPhone[].
           @return {Adaptive.ContactPhone[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): ContactPhone[];
    }
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
    /**
       @class Adaptive.ContactSocial
       @extends Adaptive.APIBean
       Structure representing the social data elements of a contact.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    class ContactSocial extends APIBean {
        /**
           @property {Adaptive.ContactSocialNetwork} socialNetwork
           The social network
        */
        socialNetwork: ContactSocialNetwork;
        /**
           @property {Adaptive.ContactSocialNetwork} socialNetwork
           The social network The 'socialNetworkProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'socialNetwork'.
        */
        socialNetworkProperty: ContactSocialNetwork;
        /**
           @property {string} profileUrl
           The profileUrl
        */
        profileUrl: string;
        /**
           @property {string} profileUrl
           The profileUrl The 'profileUrlProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'profileUrl'.
        */
        profileUrlProperty: string;
        /**
           @method constructor
           Constructor used by the implementation

           @param {Adaptive.ContactSocialNetwork} socialNetwork of the profile
           @param {string} profileUrl    of the user
           @since v2.0
        */
        constructor(socialNetwork: ContactSocialNetwork, profileUrl: string);
        /**
           @method
           Returns the social network

           @return {Adaptive.ContactSocialNetwork} socialNetwork
           @since v2.0
        */
        getSocialNetwork(): ContactSocialNetwork;
        /**
           @method
           Set the social network

           @param {Adaptive.ContactSocialNetwork} socialNetwork of the profile
           @since v2.0
        */
        setSocialNetwork(socialNetwork: ContactSocialNetwork): void;
        /**
           @method
           Returns the profile url of the user

           @return {string} profileUrl
           @since v2.0
        */
        getProfileUrl(): string;
        /**
           @method
           Set the profile url of the iser

           @param {string} profileUrl of the user
           @since v2.0
        */
        setProfileUrl(profileUrl: string): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactSocial.
           @return {Adaptive.ContactSocial} Wrapped object instance.
        */
        static toObject(object: any): ContactSocial;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactSocial[].
           @return {Adaptive.ContactSocial[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): ContactSocial[];
    }
    /**
       @class Adaptive.ContactTag
       @extends Adaptive.APIBean
       Structure representing the assigned tags data elements of a contact.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    class ContactTag extends APIBean {
        /**
           @property {string} tagName
           The tagName of the Tag
        */
        tagName: string;
        /**
           @property {string} tagName
           The tagName of the Tag The 'tagNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'tagName'.
        */
        tagNameProperty: string;
        /**
           @property {string} tagValue
           The tagValue of the Tag
        */
        tagValue: string;
        /**
           @property {string} tagValue
           The tagValue of the Tag The 'tagValueProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'tagValue'.
        */
        tagValueProperty: string;
        /**
           @method constructor
           Constructor used by the implementation

           @param {string} tagValue Value of the tag
           @param {string} tagName  Name of the tag
           @since v2.0
        */
        constructor(tagName: string, tagValue: string);
        /**
           @method
           Returns the tagName of the Tag

           @return {string} tagName
           @since v2.0
        */
        getTagName(): string;
        /**
           @method
           Set the tagName of the Tag

           @param {string} tagName Name of the tag
           @since v2.0
        */
        setTagName(tagName: string): void;
        /**
           @method
           Returns the tagValue of the Tag

           @return {string} tagValue
           @since v2.0
        */
        getTagValue(): string;
        /**
           @method
           Set the tagValue of the Tag

           @param {string} tagValue Value of the tag
           @since v2.0
        */
        setTagValue(tagValue: string): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactTag.
           @return {Adaptive.ContactTag} Wrapped object instance.
        */
        static toObject(object: any): ContactTag;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactTag[].
           @return {Adaptive.ContactTag[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): ContactTag[];
    }
    /**
       @class Adaptive.ContactUid
       @extends Adaptive.APIBean
       Structure representing the internal unique identifier data elements of a contact.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    class ContactUid extends APIBean {
        /**
           @property {string} contactId
           The id of the Contact
        */
        contactId: string;
        /**
           @property {string} contactId
           The id of the Contact The 'contactIdProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactId'.
        */
        contactIdProperty: string;
        /**
           @method constructor
           Constructor used by implementation to set the Contact id.

           @param {string} contactId Internal unique contact id.
           @since v2.0
        */
        constructor(contactId: string);
        /**
           @method
           Returns the contact id

           @return {string} Contactid Internal unique contact id.
           @since v2.0
        */
        getContactId(): string;
        /**
           @method
           Set the id of the Contact

           @param {string} contactId Internal unique contact id.
           @since v2.0
        */
        setContactId(contactId: string): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactUid.
           @return {Adaptive.ContactUid} Wrapped object instance.
        */
        static toObject(object: any): ContactUid;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactUid[].
           @return {Adaptive.ContactUid[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): ContactUid[];
    }
    /**
       @class Adaptive.ContactWebsite
       @extends Adaptive.APIBean
       Structure representing the website data elements of a contact.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    class ContactWebsite extends APIBean {
        /**
           @property {string} url
           The url of the website
        */
        url: string;
        /**
           @property {string} url
           The url of the website The 'urlProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'url'.
        */
        urlProperty: string;
        /**
           @method constructor
           Constructor used by the implementation

           @param {string} url Url of the website
           @since v2.0
        */
        constructor(url: string);
        /**
           @method
           Returns the url of the website

           @return {string} website url
           @since v2.0
        */
        getUrl(): string;
        /**
           @method
           Set the url of the website

           @param {string} url Url of the website
           @since v2.0
        */
        setUrl(url: string): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactWebsite.
           @return {Adaptive.ContactWebsite} Wrapped object instance.
        */
        static toObject(object: any): ContactWebsite;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ContactWebsite[].
           @return {Adaptive.ContactWebsite[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): ContactWebsite[];
    }
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
    /**
       @class Adaptive.DatabaseColumn
       @extends Adaptive.APIBean
       Structure representing the column specification of a data column.

       @author Ferran Vila Conesa
       @since v2.0
       @version 1.0
    */
    class DatabaseColumn extends APIBean {
        /**
           @property {string} name
           Name of the column
        */
        name: string;
        /**
           @property {string} name
           Name of the column The 'nameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'name'.
        */
        nameProperty: string;
        /**
           @method constructor
           Constructor with fields

           @param {string} name Name of the column
           @since v2.0
        */
        constructor(name: string);
        /**
           @method
           Returns the name of the column.

           @return {string} The name of the column.
           @since v2.0
        */
        getName(): string;
        /**
           @method
           Sets the name of the column.

           @param {string} name The name of the column.
           @since v2.0
        */
        setName(name: string): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.DatabaseColumn.
           @return {Adaptive.DatabaseColumn} Wrapped object instance.
        */
        static toObject(object: any): DatabaseColumn;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.DatabaseColumn[].
           @return {Adaptive.DatabaseColumn[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): DatabaseColumn[];
    }
    /**
       @class Adaptive.DatabaseRow
       @extends Adaptive.APIBean
       Structure representing a row for a data table.

       @author Ferran Vila Conesa
       @since v2.0
       @version 1.0
    */
    class DatabaseRow extends APIBean {
        /**
           @property {string[]} values
           The values of the row.
        */
        values: Array<string>;
        /**
           @property {string[]} values
           The values of the row. The 'valuesProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'values'.
        */
        valuesProperty: Array<string>;
        /**
           @method constructor
           Constructor for implementation using.

           @param {string[]} values The values of the row
           @since v2.0
        */
        constructor(values: Array<string>);
        /**
           @method
           Returns the values of the row.

           @return {string[]} The values of the row.
           @since v2.0
        */
        getValues(): Array<string>;
        /**
           @method
           Sets the values of the row.

           @param {string[]} values The values of the row.
           @since v2.0
        */
        setValues(values: Array<string>): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.DatabaseRow.
           @return {Adaptive.DatabaseRow} Wrapped object instance.
        */
        static toObject(object: any): DatabaseRow;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.DatabaseRow[].
           @return {Adaptive.DatabaseRow[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): DatabaseRow[];
    }
    /**
       @class Adaptive.DatabaseTable
       @extends Adaptive.APIBean
       Represents a data table composed of databaseColumns and databaseRows.

       @author Ferran Vila Conesa
       @since v2.0
       @version 1.0
    */
    class DatabaseTable extends APIBean {
        /**
           @property {number} columnCount
           Number of databaseColumns.
        */
        columnCount: number;
        /**
           @property {number} columnCount
           Number of databaseColumns. The 'columnCountProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'columnCount'.
        */
        columnCountProperty: number;
        /**
           @property {Adaptive.DatabaseColumn[]} databaseColumns
           Definition of databaseColumns.
        */
        databaseColumns: Array<DatabaseColumn>;
        /**
           @property {Adaptive.DatabaseColumn[]} databaseColumns
           Definition of databaseColumns. The 'databaseColumnsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'databaseColumns'.
        */
        databaseColumnsProperty: Array<DatabaseColumn>;
        /**
           @property {Adaptive.DatabaseRow[]} databaseRows
           Rows of the table containing the data.
        */
        databaseRows: Array<DatabaseRow>;
        /**
           @property {Adaptive.DatabaseRow[]} databaseRows
           Rows of the table containing the data. The 'databaseRowsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'databaseRows'.
        */
        databaseRowsProperty: Array<DatabaseRow>;
        /**
           @property {string} name
           Name of the table.
        */
        name: string;
        /**
           @property {string} name
           Name of the table. The 'nameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'name'.
        */
        nameProperty: string;
        /**
           @property {number} rowCount
           Number of databaseRows.
        */
        rowCount: number;
        /**
           @property {number} rowCount
           Number of databaseRows. The 'rowCountProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'rowCount'.
        */
        rowCountProperty: number;
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
        constructor(name: string, columnCount: number, rowCount: number, databaseColumns: Array<DatabaseColumn>, databaseRows: Array<DatabaseRow>);
        /**
           @method
           Get the number of databaseColumns

           @return {number} The number of databaseColumns
           @since v2.0
        */
        getColumnCount(): number;
        /**
           @method
           Sets the number of databaseColumns

           @param {number} columnCount The number of databaseColumns
           @since v2.0
        */
        setColumnCount(columnCount: number): void;
        /**
           @method
           Get the databaseColumns

           @return {Adaptive.DatabaseColumn[]} The databaseColumns
           @since v2.0
        */
        getDatabaseColumns(): Array<DatabaseColumn>;
        /**
           @method
           Sets the databaseColumns of the table

           @param {Adaptive.DatabaseColumn[]} databaseColumns The databaseColumns of the table
           @since v2.0
        */
        setDatabaseColumns(databaseColumns: Array<DatabaseColumn>): void;
        /**
           @method
           Get the databaseRows of the table

           @return {Adaptive.DatabaseRow[]} The databaseRows of the table
           @since v2.0
        */
        getDatabaseRows(): Array<DatabaseRow>;
        /**
           @method
           Sets the databaseRows of the table

           @param {Adaptive.DatabaseRow[]} databaseRows The databaseRows of the table
           @since v2.0
        */
        setDatabaseRows(databaseRows: Array<DatabaseRow>): void;
        /**
           @method
           Returns the name of the table

           @return {string} The name of the table
           @since v2.0
        */
        getName(): string;
        /**
           @method
           Sets the name of the table

           @param {string} name The name of the table
           @since v2.0
        */
        setName(name: string): void;
        /**
           @method
           Get the number of databaseRows

           @return {number} The number of databaseRows
           @since v2.0
        */
        getRowCount(): number;
        /**
           @method
           Sets the number of databaseRows

           @param {number} rowCount The number of databaseRows
           @since v2.0
        */
        setRowCount(rowCount: number): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.DatabaseTable.
           @return {Adaptive.DatabaseTable} Wrapped object instance.
        */
        static toObject(object: any): DatabaseTable;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.DatabaseTable[].
           @return {Adaptive.DatabaseTable[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): DatabaseTable[];
    }
    /**
       @class Adaptive.DeviceInfo
       @extends Adaptive.APIBean
       Structure representing the basic device information.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    class DeviceInfo extends APIBean {
        /**
           @property {string} model
           Model of device - equivalent to device release or version.
        */
        model: string;
        /**
           @property {string} model
           Model of device - equivalent to device release or version. The 'modelProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'model'.
        */
        modelProperty: string;
        /**
           @property {string} name
           Name of device - equivalent to brand.
        */
        name: string;
        /**
           @property {string} name
           Name of device - equivalent to brand. The 'nameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'name'.
        */
        nameProperty: string;
        /**
           @property {string} uuid
           Device identifier - this may not be unique for a device. It may depend on the platform implementation and may
be unique for a specific instance of an application on a specific device.
        */
        uuid: string;
        /**
           @property {string} uuid
           Device identifier - this may not be unique for a device. It may depend on the platform implementation and may
be unique for a specific instance of an application on a specific device. The 'uuidProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'uuid'.
        */
        uuidProperty: string;
        /**
           @property {string} vendor
           Vendor of the device hardware.
        */
        vendor: string;
        /**
           @property {string} vendor
           Vendor of the device hardware. The 'vendorProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'vendor'.
        */
        vendorProperty: string;
        /**
           @method constructor
           Constructor for the implementation of the platform.

           @param {string} name   or brand of the device.
           @param {string} model  of the device.
           @param {string} vendor of the device.
           @param {string} uuid   unique* identifier (* platform dependent).
           @since v2.0
        */
        constructor(name: string, model: string, vendor: string, uuid: string);
        /**
           @method
           Returns the model of the device.

           @return {string} String with the model of the device.
           @since v2.0
        */
        getModel(): string;
        /**
           @method
           Sets Model of device - equivalent to device release or version.

           @param {string} model Model of device - equivalent to device release or version.
        */
        setModel(model: string): void;
        /**
           @method
           Returns the name of the device.

           @return {string} String with device name.
           @since v2.0
        */
        getName(): string;
        /**
           @method
           Sets Name of device - equivalent to brand.

           @param {string} name Name of device - equivalent to brand.
        */
        setName(name: string): void;
        /**
           @method
           Returns the platform dependent UUID of the device.

           @return {string} String with the 128-bit device identifier.
           @since v2.0
        */
        getUuid(): string;
        /**
           @method
           Sets Device identifier - this may not be unique for a device. It may depend on the platform implementation and may
be unique for a specific instance of an application on a specific device.

           @param {string} uuid Device identifier - this may not be unique for a device. It may depend on the platform implementation and may
be unique for a specific instance of an application on a specific device.
        */
        setUuid(uuid: string): void;
        /**
           @method
           Returns the vendor of the device.

           @return {string} String with the vendor name.
           @since v2.0
        */
        getVendor(): string;
        /**
           @method
           Sets Vendor of the device hardware.

           @param {string} vendor Vendor of the device hardware.
        */
        setVendor(vendor: string): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.DeviceInfo.
           @return {Adaptive.DeviceInfo} Wrapped object instance.
        */
        static toObject(object: any): DeviceInfo;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.DeviceInfo[].
           @return {Adaptive.DeviceInfo[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): DeviceInfo[];
    }
    /**
       @class Adaptive.Email
       @extends Adaptive.APIBean
       Structure representing the data elements of an email.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    class Email extends APIBean {
        /**
           @property {Adaptive.EmailAddress[]} bccRecipients
           Array of Email Blind Carbon Copy recipients
        */
        bccRecipients: Array<EmailAddress>;
        /**
           @property {Adaptive.EmailAddress[]} bccRecipients
           Array of Email Blind Carbon Copy recipients The 'bccRecipientsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'bccRecipients'.
        */
        bccRecipientsProperty: Array<EmailAddress>;
        /**
           @property {Adaptive.EmailAddress[]} ccRecipients
           Array of Email Carbon Copy recipients
        */
        ccRecipients: Array<EmailAddress>;
        /**
           @property {Adaptive.EmailAddress[]} ccRecipients
           Array of Email Carbon Copy recipients The 'ccRecipientsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'ccRecipients'.
        */
        ccRecipientsProperty: Array<EmailAddress>;
        /**
           @property {Adaptive.EmailAttachmentData[]} emailAttachmentData
           Array of attatchments
        */
        emailAttachmentData: Array<EmailAttachmentData>;
        /**
           @property {Adaptive.EmailAttachmentData[]} emailAttachmentData
           Array of attatchments The 'emailAttachmentDataProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'emailAttachmentData'.
        */
        emailAttachmentDataProperty: Array<EmailAttachmentData>;
        /**
           @property {string} messageBody
           Message body
        */
        messageBody: string;
        /**
           @property {string} messageBody
           Message body The 'messageBodyProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'messageBody'.
        */
        messageBodyProperty: string;
        /**
           @property {string} messageBodyMimeType
           Message body mime type
        */
        messageBodyMimeType: string;
        /**
           @property {string} messageBodyMimeType
           Message body mime type The 'messageBodyMimeTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'messageBodyMimeType'.
        */
        messageBodyMimeTypeProperty: string;
        /**
           @property {string} subject
           Subject of the email
        */
        subject: string;
        /**
           @property {string} subject
           Subject of the email The 'subjectProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'subject'.
        */
        subjectProperty: string;
        /**
           @property {Adaptive.EmailAddress[]} toRecipients
           Array of Email recipients
        */
        toRecipients: Array<EmailAddress>;
        /**
           @property {Adaptive.EmailAddress[]} toRecipients
           Array of Email recipients The 'toRecipientsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'toRecipients'.
        */
        toRecipientsProperty: Array<EmailAddress>;
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
        constructor(toRecipients: Array<EmailAddress>, ccRecipients: Array<EmailAddress>, bccRecipients: Array<EmailAddress>, emailAttachmentData: Array<EmailAttachmentData>, messageBody: string, messageBodyMimeType: string, subject: string);
        /**
           @method
           Returns the array of recipients

           @return {Adaptive.EmailAddress[]} bccRecipients array of bcc recipients
           @since v2.0
        */
        getBccRecipients(): Array<EmailAddress>;
        /**
           @method
           Set the array of recipients

           @param {Adaptive.EmailAddress[]} bccRecipients array of bcc recipients
           @since v2.0
        */
        setBccRecipients(bccRecipients: Array<EmailAddress>): void;
        /**
           @method
           Returns the array of recipients

           @return {Adaptive.EmailAddress[]} ccRecipients array of cc recipients
           @since v2.0
        */
        getCcRecipients(): Array<EmailAddress>;
        /**
           @method
           Set the array of recipients

           @param {Adaptive.EmailAddress[]} ccRecipients array of cc recipients
           @since v2.0
        */
        setCcRecipients(ccRecipients: Array<EmailAddress>): void;
        /**
           @method
           Returns an array of attachments

           @return {Adaptive.EmailAttachmentData[]} emailAttachmentData array with the email attachments
           @since v2.0
        */
        getEmailAttachmentData(): Array<EmailAttachmentData>;
        /**
           @method
           Set the email attachment data array

           @param {Adaptive.EmailAttachmentData[]} emailAttachmentData array of email attatchments
           @since v2.0
        */
        setEmailAttachmentData(emailAttachmentData: Array<EmailAttachmentData>): void;
        /**
           @method
           Returns the message body of the email

           @return {string} message Body string of the email
           @since v2.0
        */
        getMessageBody(): string;
        /**
           @method
           Set the message body of the email

           @param {string} messageBody message body of the email
           @since v2.0
        */
        setMessageBody(messageBody: string): void;
        /**
           @method
           Returns the myme type of the message body

           @return {string} mime type string of the message boddy
           @since v2.0
        */
        getMessageBodyMimeType(): string;
        /**
           @method
           Set the mime type for the message body

           @param {string} messageBodyMimeType type of the body message
           @since v2.0
        */
        setMessageBodyMimeType(messageBodyMimeType: string): void;
        /**
           @method
           Returns the subject of the email

           @return {string} subject string of the email
           @since v2.0
        */
        getSubject(): string;
        /**
           @method
           Set the subject of the email

           @param {string} subject of the email
           @since v2.0
        */
        setSubject(subject: string): void;
        /**
           @method
           Returns the array of recipients

           @return {Adaptive.EmailAddress[]} toRecipients array of recipients
           @since v2.0
        */
        getToRecipients(): Array<EmailAddress>;
        /**
           @method
           Set the array of recipients

           @param {Adaptive.EmailAddress[]} toRecipients array of recipients
           @since v2.0
        */
        setToRecipients(toRecipients: Array<EmailAddress>): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Email.
           @return {Adaptive.Email} Wrapped object instance.
        */
        static toObject(object: any): Email;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Email[].
           @return {Adaptive.Email[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): Email[];
    }
    /**
       @class Adaptive.EmailAddress
       @extends Adaptive.APIBean
       Structure representing the data elements of an email addressee.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    class EmailAddress extends APIBean {
        /**
           @property {string} address
           The Email address
        */
        address: string;
        /**
           @property {string} address
           The Email address The 'addressProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'address'.
        */
        addressProperty: string;
        /**
           @method constructor
           Constructor used by implementation

           @param {string} address of the Email
           @since v2.0
        */
        constructor(address: string);
        /**
           @method
           Returns the email address

           @return {string} address of the Email
           @since v2.0
        */
        getAddress(): string;
        /**
           @method
           Set the Email address

           @param {string} address of the Email
           @since v2.0
        */
        setAddress(address: string): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.EmailAddress.
           @return {Adaptive.EmailAddress} Wrapped object instance.
        */
        static toObject(object: any): EmailAddress;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.EmailAddress[].
           @return {Adaptive.EmailAddress[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): EmailAddress[];
    }
    /**
       @class Adaptive.EmailAttachmentData
       @extends Adaptive.APIBean
       Structure representing the binary attachment data.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    class EmailAttachmentData extends APIBean {
        /**
           @property {number[]} data
           The raw data for the current file attachment (byte array)
        */
        data: Array<number>;
        /**
           @property {number[]} data
           The raw data for the current file attachment (byte array) The 'dataProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'data'.
        */
        dataProperty: Array<number>;
        /**
           @property {string} fileName
           The name of the current file attachment
        */
        fileName: string;
        /**
           @property {string} fileName
           The name of the current file attachment The 'fileNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'fileName'.
        */
        fileNameProperty: string;
        /**
           @property {string} mimeType
           The mime type of the current attachment
        */
        mimeType: string;
        /**
           @property {string} mimeType
           The mime type of the current attachment The 'mimeTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'mimeType'.
        */
        mimeTypeProperty: string;
        /**
           @property {string} referenceUrl
           The relative path where the contents for the attachment file could be located.
        */
        referenceUrl: string;
        /**
           @property {string} referenceUrl
           The relative path where the contents for the attachment file could be located. The 'referenceUrlProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'referenceUrl'.
        */
        referenceUrlProperty: string;
        /**
           @property {number} size
           The data size (in bytes) of the current file attachment
        */
        size: number;
        /**
           @property {number} size
           The data size (in bytes) of the current file attachment The 'sizeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'size'.
        */
        sizeProperty: number;
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
        constructor(data: Array<number>, size: number, fileName: string, mimeType: string, referenceUrl: string);
        /**
           @method
           Returns the raw data in byte[]

           @return {number[]} data Octet-binary content of the attachment payload.
           @since v2.0
        */
        getData(): Array<number>;
        /**
           @method
           Set the data of the attachment as a byte[]

           @param {number[]} data Sets the octet-binary content of the attachment.
           @since v2.0
        */
        setData(data: Array<number>): void;
        /**
           @method
           Returns the filename of the attachment

           @return {string} fileName Name of the attachment.
           @since v2.0
        */
        getFileName(): string;
        /**
           @method
           Set the name of the file attachment

           @param {string} fileName Name of the attachment.
           @since v2.0
        */
        setFileName(fileName: string): void;
        /**
           @method
           Returns the mime type of the attachment

           @return {string} mimeType
           @since v2.0
        */
        getMimeType(): string;
        /**
           @method
           Set the mime type of the attachment

           @param {string} mimeType Mime-type of the attachment.
           @since v2.0
        */
        setMimeType(mimeType: string): void;
        /**
           @method
           Returns the absolute url of the file attachment

           @return {string} referenceUrl Absolute URL of the file attachment for either file:// or http:// access.
           @since v2.0
        */
        getReferenceUrl(): string;
        /**
           @method
           Set the absolute url of the attachment

           @param {string} referenceUrl Absolute URL of the file attachment for either file:// or http:// access.
           @since v2.0
        */
        setReferenceUrl(referenceUrl: string): void;
        /**
           @method
           Returns the size of the attachment as a long

           @return {number} size Length in bytes of the octet-binary content.
           @since v2.0
        */
        getSize(): number;
        /**
           @method
           Set the size of the attachment as a long

           @param {number} size Length in bytes of the octet-binary content ( should be same as data array length.)
           @since v2.0
        */
        setSize(size: number): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.EmailAttachmentData.
           @return {Adaptive.EmailAttachmentData} Wrapped object instance.
        */
        static toObject(object: any): EmailAttachmentData;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.EmailAttachmentData[].
           @return {Adaptive.EmailAttachmentData[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): EmailAttachmentData[];
    }
    /**
       @class Adaptive.FileDescriptor
       @extends Adaptive.APIBean
       Implementation of FileDescriptor bean.

       @author Carlos Lozano Diez
       @since 1.0
       @version 1.0
    */
    class FileDescriptor extends APIBean {
        dateCreated: number;
        dateCreatedProperty: number;
        dateModified: number;
        dateModifiedProperty: number;
        name: string;
        nameProperty: string;
        path: string;
        pathProperty: string;
        pathAbsolute: string;
        pathAbsoluteProperty: string;
        size: number;
        sizeProperty: number;
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Returns the milliseconds passed since 1/1/1970 since the file was created.

           @return {number} Timestamp in milliseconds.
           @since v2.0
        */
        getDateCreated(): number;
        /**
           @method
           Sets the creation timestamp in milliseconds. Used internally.

           @param {number} dateCreated Timestamp of file creation or -1 if the file or folder doesn't exist.
        */
        setDateCreated(dateCreated: number): void;
        /**
           @method
           Returns the milliseconds passed since 1/1/1970 since the file was modified.

           @return {number} Timestamp in milliseconds.
           @since v2.0
        */
        getDateModified(): number;
        /**
           @method
           Sets the file or folder modification timestamp in milliseconds. Used internally.

           @param {number} dateModified Timestamp of file modification or -1 if the file or folder doesn't exist.
        */
        setDateModified(dateModified: number): void;
        /**
           @method
           Returns the name of the file if the reference is a file or the last path element of the folder.

           @return {string} The name of the file.
           @since v2.0
        */
        getName(): string;
        /**
           @method
           Sets the name of the file. Used internally.

           @param {string} name Name of the file or last folder path element.
        */
        setName(name: string): void;
        /**
           @method
           Returns the path element of the file or folder (excluding the last path element if it's a directory).

           @return {string} The path to the file.
           @since v2.0
        */
        getPath(): string;
        /**
           @method
           Sets the path of the file or folder. Used internally.

           @param {string} path The path element of the file or folder.
        */
        setPath(path: string): void;
        /**
           @method
           Returns the resolved absolute path elements of the file and/or folders (including the last path element).

           @return {string} The absolute path to the file.
           @since v2.0
        */
        getPathAbsolute(): string;
        /**
           @method
           Sets the absolute path of the file or folder. Used internally.

           @param {string} pathAbsolute String with the absolute path of file or folder.
        */
        setPathAbsolute(pathAbsolute: string): void;
        /**
           @method
           Returns the size in bytes of the file or -1 if the reference is a folder.

           @return {number} Size in bytes of file.
           @since v2.0
        */
        getSize(): number;
        /**
           @method
           Sets the file size in bytes of the file. If the file is a folder, this will be 0. If the file
doesn't exist, this will be -1. Used internally.

           @param {number} size The size in bytes of the file.
        */
        setSize(size: number): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.FileDescriptor.
           @return {Adaptive.FileDescriptor} Wrapped object instance.
        */
        static toObject(object: any): FileDescriptor;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.FileDescriptor[].
           @return {Adaptive.FileDescriptor[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): FileDescriptor[];
    }
    /**
       @class Adaptive.Geolocation
       @extends Adaptive.APIBean
       Structure representing the data a single geolocation reading.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    class Geolocation extends APIBean {
        /**
           @property {number} altitude
           The current device altitude (or Z coordinate). Measured in meters.
        */
        altitude: number;
        /**
           @property {number} altitude
           The current device altitude (or Z coordinate). Measured in meters. The 'altitudeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'altitude'.
        */
        altitudeProperty: number;
        /**
           @property {number} latitude
           The Y coordinate (or latitude). Measured in degrees.
        */
        latitude: number;
        /**
           @property {number} latitude
           The Y coordinate (or latitude). Measured in degrees. The 'latitudeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'latitude'.
        */
        latitudeProperty: number;
        /**
           @property {number} longitude
           The X coordinate (or longitude). Measured in degrees.
        */
        longitude: number;
        /**
           @property {number} longitude
           The X coordinate (or longitude). Measured in degrees. The 'longitudeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'longitude'.
        */
        longitudeProperty: number;
        /**
           @property {number} timestamp
           Timestamp of the geolocation reading.
        */
        timestamp: number;
        /**
           @property {number} timestamp
           Timestamp of the geolocation reading. The 'timestampProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'timestamp'.
        */
        timestampProperty: number;
        /**
           @property {number} xDoP
           Dilution of precision on the X measurement. Measured in meters.
        */
        xDoP: number;
        /**
           @property {number} xDoP
           Dilution of precision on the X measurement. Measured in meters. The 'xDoPProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'xDoP'.
        */
        xDoPProperty: number;
        /**
           @property {number} yDoP
           Dilution of precision on the Y measurement. Measured in meters.
        */
        yDoP: number;
        /**
           @property {number} yDoP
           Dilution of precision on the Y measurement. Measured in meters. The 'yDoPProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'yDoP'.
        */
        yDoPProperty: number;
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
        constructor(latitude: number, longitude: number, altitude: number, xDoP: number, yDoP: number, timestamp: number);
        /**
           @method
           Returns altitude in meters

           @return {number} Altitude of the measurement
           @since v2.0
        */
        getAltitude(): number;
        /**
           @method
           Set altitude in meters

           @param {number} altitude Altitude of the measurement
           @since v2.0
        */
        setAltitude(altitude: number): void;
        /**
           @method
           Returns the latitude in degrees

           @return {number} Latitude of the measurement
           @since v2.0
        */
        getLatitude(): number;
        /**
           @method
           Set the latitude in degrees

           @param {number} latitude Latitude of the measurement
           @since v2.0
        */
        setLatitude(latitude: number): void;
        /**
           @method
           Returns the longitude in degrees

           @return {number} Longitude of the measurement
           @since v2.0
        */
        getLongitude(): number;
        /**
           @method
           Returns the latitude in degrees

           @param {number} longitude Longitude of the measurement
           @since v2.0
        */
        setLongitude(longitude: number): void;
        /**
           @method
           Timestamp Getter

           @return {number} Timestamp
           @since v2.0
        */
        getTimestamp(): number;
        /**
           @method
           Timestamp Setter

           @param {number} timestamp Timestamp
           @since v2.0
        */
        setTimestamp(timestamp: number): void;
        /**
           @method
           Gets Dilution of precision on the X measurement. Measured in meters.

           @return {number} xDoP Dilution of precision on the X measurement. Measured in meters.
        */
        getXDoP(): number;
        /**
           @method
           Sets Dilution of precision on the X measurement. Measured in meters.

           @param {number} xDoP Dilution of precision on the X measurement. Measured in meters.
        */
        setXDoP(xDoP: number): void;
        /**
           @method
           Gets Dilution of precision on the Y measurement. Measured in meters.

           @return {number} yDoP Dilution of precision on the Y measurement. Measured in meters.
        */
        getYDoP(): number;
        /**
           @method
           Sets Dilution of precision on the Y measurement. Measured in meters.

           @param {number} yDoP Dilution of precision on the Y measurement. Measured in meters.
        */
        setYDoP(yDoP: number): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Geolocation.
           @return {Adaptive.Geolocation} Wrapped object instance.
        */
        static toObject(object: any): Geolocation;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Geolocation[].
           @return {Adaptive.Geolocation[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): Geolocation[];
    }
    /**
       @class Adaptive.KeyPair
       @extends Adaptive.APIBean
       Represents a basic bean to store keyName pair values

       @author Ferran Vila Conesa
       @since v2.0
       @version 1.0
    */
    class KeyPair extends APIBean {
        /**
           @property {string} keyName
           Key of the element
        */
        keyName: string;
        /**
           @property {string} keyName
           Key of the element The 'keyNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'keyName'.
        */
        keyNameProperty: string;
        /**
           @property {string} keyValue
           Value of the element
        */
        keyValue: string;
        /**
           @property {string} keyValue
           Value of the element The 'keyValueProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'keyValue'.
        */
        keyValueProperty: string;
        /**
           @method constructor
           Constructor using fields

           @param {string} keyName  Key of the element
           @param {string} keyValue Value of the element
           @since v2.0
        */
        constructor(keyName: string, keyValue: string);
        /**
           @method
           Returns the keyName of the element

           @return {string} Key of the element
           @since v2.0
        */
        getKeyName(): string;
        /**
           @method
           Sets the keyName of the element

           @param {string} keyName Key of the element
           @since v2.0
        */
        setKeyName(keyName: string): void;
        /**
           @method
           Returns the keyValue of the element

           @return {string} Value of the element
           @since v2.0
        */
        getKeyValue(): string;
        /**
           @method
           Sets the keyValue of the element

           @param {string} keyValue Value of the element
           @since v2.0
        */
        setKeyValue(keyValue: string): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.KeyPair.
           @return {Adaptive.KeyPair} Wrapped object instance.
        */
        static toObject(object: any): KeyPair;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.KeyPair[].
           @return {Adaptive.KeyPair[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): KeyPair[];
    }
    /**
       @class Adaptive.KeyValue
       @extends Adaptive.APIBean
       General key/value holder class.

       @author Carlos Lozano Diez
       @since 2.0.6
       @version 1.0
    */
    class KeyValue extends APIBean {
        /**
           @property {string} keyData
           Value of the key.
        */
        keyData: string;
        /**
           @property {string} keyData
           Value of the key. The 'keyDataProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'keyData'.
        */
        keyDataProperty: string;
        /**
           @property {string} keyName
           Name of the key for the value.
        */
        keyName: string;
        /**
           @property {string} keyName
           Name of the key for the value. The 'keyNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'keyName'.
        */
        keyNameProperty: string;
        /**
           @method constructor
           Convenience constructor.

           @param {string} keyName Name of the key.
           @param {string} keyData Value of the key.
           @since v2.0.6
        */
        constructor(keyName: string, keyData: string);
        /**
           @method
           Gets the value of the key.

           @return {string} Value of the key.
           @since v2.0.6
        */
        getKeyData(): string;
        /**
           @method
           Sets the value of the key.

           @param {string} keyData Value of the key.
           @since v2.0.6
        */
        setKeyData(keyData: string): void;
        /**
           @method
           Gets the name of the key.

           @return {string} Key name.
           @since v2.0.6
        */
        getKeyName(): string;
        /**
           @method
           Sets the name of the key.

           @param {string} keyName Key name.
           @since v2.0.6
        */
        setKeyName(keyName: string): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.KeyValue.
           @return {Adaptive.KeyValue} Wrapped object instance.
        */
        static toObject(object: any): KeyValue;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.KeyValue[].
           @return {Adaptive.KeyValue[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): KeyValue[];
    }
    /**
       @class Adaptive.Lifecycle
       @extends Adaptive.APIBean
       Represents a specific application life-cycle stage.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    class Lifecycle extends APIBean {
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
        state: LifecycleState;
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
        stateProperty: LifecycleState;
        /**
           @property {number} timestamp
           The timestamps in milliseconds when the event was fired.
        */
        timestamp: number;
        /**
           @property {number} timestamp
           The timestamps in milliseconds when the event was fired. The 'timestampProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'timestamp'.
        */
        timestampProperty: number;
        /**
           @method constructor
           Constructor used by the implementation

           @param {Adaptive.LifecycleState} state of the app
           @param {number} timestamp Timestamp of the event
           @since v2.0
        */
        constructor(state: LifecycleState, timestamp: number);
        /**
           @method
           Returns the state of the application

           @return {Adaptive.LifecycleState} state of the app
           @since v2.0
        */
        getState(): LifecycleState;
        /**
           @method
           Set the State of the application

           @param {Adaptive.LifecycleState} state of the app
           @since v2.0
        */
        setState(state: LifecycleState): void;
        /**
           @method
           Gets the timestamp in milliseconds of the event.

           @return {number} Timestamp of the event.
           @since v2.2.1
        */
        getTimestamp(): number;
        /**
           @method
           Sets the timestamp in milliseconds of the event.

           @param {number} timestamp Timestamp of the event.
           @since v2.2.1
        */
        setTimestamp(timestamp: number): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Lifecycle.
           @return {Adaptive.Lifecycle} Wrapped object instance.
        */
        static toObject(object: any): Lifecycle;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Lifecycle[].
           @return {Adaptive.Lifecycle[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): Lifecycle[];
    }
    /**
       @class Adaptive.Locale
       @extends Adaptive.APIBean
       Represents a specific user or system locate.

       @author Aryslan
       @since v2.0
       @version 1.0
    */
    class Locale extends APIBean {
        /**
           @property {string} country
           A valid ISO Country Code.
        */
        country: string;
        /**
           @property {string} country
           A valid ISO Country Code. The 'countryProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'country'.
        */
        countryProperty: string;
        /**
           @property {string} language
           A valid ISO Language Code.
        */
        language: string;
        /**
           @property {string} language
           A valid ISO Language Code. The 'languageProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'language'.
        */
        languageProperty: string;
        /**
           @method constructor
           Constructor used by the implementation

           @param {string} country  Country of the Locale
           @param {string} language Language of the Locale
           @since v2.0
        */
        constructor(language: string, country: string);
        /**
           @method
           Returns the country code

           @return {string} country code
           @since v2.0
        */
        getCountry(): string;
        /**
           @method
           Set the country code

           @param {string} country code
           @since v2.0
        */
        setCountry(country: string): void;
        /**
           @method
           Returns the language code

           @return {string} language code
           @since v2.0
        */
        getLanguage(): string;
        /**
           @method
           Set the language code

           @param {string} language code
           @since v2.0
        */
        setLanguage(language: string): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Locale.
           @return {Adaptive.Locale} Wrapped object instance.
        */
        static toObject(object: any): Locale;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Locale[].
           @return {Adaptive.Locale[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): Locale[];
    }
    /**
       @class Adaptive.NetworkEvent
       @extends Adaptive.APIBean
       Represents a network handover event on the system.

       @author Ferran Vila Conesa
       @since v2.2.1
       @version 1.0
    */
    class NetworkEvent extends APIBean {
        /**
           @property {Adaptive.ICapabilitiesNet} network
           New type of network of the event
        */
        network: ICapabilitiesNet;
        /**
           @property {Adaptive.ICapabilitiesNet} network
           New type of network of the event The 'networkProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'network'.
        */
        networkProperty: ICapabilitiesNet;
        /**
           @property {number} timestamp
           The timestamps in milliseconds when the event was fired.
        */
        timestamp: number;
        /**
           @property {number} timestamp
           The timestamps in milliseconds when the event was fired. The 'timestampProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'timestamp'.
        */
        timestampProperty: number;
        /**
           @method constructor
           Constructor used by the implementation

           @param {Adaptive.ICapabilitiesNet} network   of the app
           @param {number} timestamp Timestamp of the event
           @since v2.2.1
        */
        constructor(network: ICapabilitiesNet, timestamp: number);
        /**
           @method
           Network event getter

           @return {Adaptive.ICapabilitiesNet} New network switched
           @since v2.2.1
        */
        getNetwork(): ICapabilitiesNet;
        /**
           @method
           Network setter

           @param {Adaptive.ICapabilitiesNet} network New network switched
           @since v2.2.1
        */
        setNetwork(network: ICapabilitiesNet): void;
        /**
           @method
           Returns the timestamp of the event

           @return {number} Timestamp of the event
           @since v2.2.1
        */
        getTimestamp(): number;
        /**
           @method
           Sets the timestamp of the event

           @param {number} timestamp Timestamp of the event
           @since v2.2.1
        */
        setTimestamp(timestamp: number): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.NetworkEvent.
           @return {Adaptive.NetworkEvent} Wrapped object instance.
        */
        static toObject(object: any): NetworkEvent;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.NetworkEvent[].
           @return {Adaptive.NetworkEvent[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): NetworkEvent[];
    }
    /**
       @class Adaptive.OSInfo
       @extends Adaptive.APIBean
       Represents the basic information about the operating system.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    class OSInfo extends APIBean {
        /**
           @property {Adaptive.IOSType} name
           The name of the operating system.
        */
        name: IOSType;
        /**
           @property {Adaptive.IOSType} name
           The name of the operating system. The 'nameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'name'.
        */
        nameProperty: IOSType;
        /**
           @property {string} vendor
           The vendor of the operating system.
        */
        vendor: string;
        /**
           @property {string} vendor
           The vendor of the operating system. The 'vendorProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'vendor'.
        */
        vendorProperty: string;
        /**
           @property {string} version
           The version/identifier of the operating system.
        */
        version: string;
        /**
           @property {string} version
           The version/identifier of the operating system. The 'versionProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'version'.
        */
        versionProperty: string;
        /**
           @method constructor
           Constructor used by implementation to set the OS information.

           @param {Adaptive.IOSType} name    of the OS.
           @param {string} version of the OS.
           @param {string} vendor  of the OS.
           @since v2.0
        */
        constructor(name: IOSType, version: string, vendor: string);
        /**
           @method
           Returns the name of the operating system.

           @return {Adaptive.IOSType} OS name.
           @since v2.0
        */
        getName(): IOSType;
        /**
           @method
           Sets The name of the operating system.

           @param {Adaptive.IOSType} name The name of the operating system.
        */
        setName(name: IOSType): void;
        /**
           @method
           Returns the vendor of the operating system.

           @return {string} OS vendor.
           @since v2.0
        */
        getVendor(): string;
        /**
           @method
           Sets The vendor of the operating system.

           @param {string} vendor The vendor of the operating system.
        */
        setVendor(vendor: string): void;
        /**
           @method
           Returns the version of the operating system.

           @return {string} OS version.
           @since v2.0
        */
        getVersion(): string;
        /**
           @method
           Sets The version/identifier of the operating system.

           @param {string} version The version/identifier of the operating system.
        */
        setVersion(version: string): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.OSInfo.
           @return {Adaptive.OSInfo} Wrapped object instance.
        */
        static toObject(object: any): OSInfo;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.OSInfo[].
           @return {Adaptive.OSInfo[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): OSInfo[];
    }
    /**
       @class Adaptive.RotationEvent
       @extends Adaptive.APIBean
       Object for reporting orientation change events for device and display.

       @author Carlos Lozano Diez
       @since v2.0.5
       @version 1.0
    */
    class RotationEvent extends APIBean {
        /**
           @property {Adaptive.ICapabilitiesOrientation} destination
           The orientation we're rotating to. This is the future orientation when the state of the event is
WillStartRotation. This will be the current orientation when the rotation is finished with the state
DidFinishRotation.
        */
        destination: ICapabilitiesOrientation;
        /**
           @property {Adaptive.ICapabilitiesOrientation} destination
           The orientation we're rotating to. This is the future orientation when the state of the event is
WillStartRotation. This will be the current orientation when the rotation is finished with the state
DidFinishRotation. The 'destinationProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'destination'.
        */
        destinationProperty: ICapabilitiesOrientation;
        /**
           @property {Adaptive.ICapabilitiesOrientation} origin
           The orientation we're rotating from. This is the current orientation when the state of the event is
WillStartRotation. This will be the previous orientation when the rotation is finished with the state
DidFinishRotation.
        */
        origin: ICapabilitiesOrientation;
        /**
           @property {Adaptive.ICapabilitiesOrientation} origin
           The orientation we're rotating from. This is the current orientation when the state of the event is
WillStartRotation. This will be the previous orientation when the rotation is finished with the state
DidFinishRotation. The 'originProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'origin'.
        */
        originProperty: ICapabilitiesOrientation;
        /**
           @property {Adaptive.RotationEventState} state
           The state of the event to indicate the start of the rotation and the end of the rotation event. This allows
for functions to be pre-emptively performed (veto change, re-layout, etc.) before rotation is effected and
concluded.
        */
        state: RotationEventState;
        /**
           @property {Adaptive.RotationEventState} state
           The state of the event to indicate the start of the rotation and the end of the rotation event. This allows
for functions to be pre-emptively performed (veto change, re-layout, etc.) before rotation is effected and
concluded. The 'stateProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'state'.
        */
        stateProperty: RotationEventState;
        /**
           @property {number} timestamp
           The timestamps in milliseconds when the event was fired.
        */
        timestamp: number;
        /**
           @property {number} timestamp
           The timestamps in milliseconds when the event was fired. The 'timestampProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'timestamp'.
        */
        timestampProperty: number;
        /**
           @method constructor
           Convenience constructor.

           @param {Adaptive.ICapabilitiesOrientation} origin      Source orientation when the event was fired.
           @param {Adaptive.ICapabilitiesOrientation} destination Destination orientation when the event was fired.
           @param {Adaptive.RotationEventState} state       State of the event (WillBegin, DidFinish).
           @param {number} timestamp   Timestamp in milliseconds when the event was fired.
           @since v2.0.5
        */
        constructor(origin: ICapabilitiesOrientation, destination: ICapabilitiesOrientation, state: RotationEventState, timestamp: number);
        /**
           @method
           Gets the destination orientation of the event.

           @return {Adaptive.ICapabilitiesOrientation} Destination orientation.
           @since v2.0.5
        */
        getDestination(): ICapabilitiesOrientation;
        /**
           @method
           Sets the destination orientation of the event.

           @param {Adaptive.ICapabilitiesOrientation} destination Destination orientation.
           @since v2.0.5
        */
        setDestination(destination: ICapabilitiesOrientation): void;
        /**
           @method
           Get the origin orientation of the event.

           @return {Adaptive.ICapabilitiesOrientation} Origin orientation.
           @since v2.0.5
        */
        getOrigin(): ICapabilitiesOrientation;
        /**
           @method
           Set the origin orientation of the event.

           @param {Adaptive.ICapabilitiesOrientation} origin Origin orientation
           @since v2.0.5
        */
        setOrigin(origin: ICapabilitiesOrientation): void;
        /**
           @method
           Gets the current state of the event.

           @return {Adaptive.RotationEventState} State of the event.
           @since v2.0.5
        */
        getState(): RotationEventState;
        /**
           @method
           Sets the current state of the event.

           @param {Adaptive.RotationEventState} state The state of the event.
           @since v2.0.5
        */
        setState(state: RotationEventState): void;
        /**
           @method
           Gets the timestamp in milliseconds of the event.

           @return {number} Timestamp of the event.
           @since v2.0.5
        */
        getTimestamp(): number;
        /**
           @method
           Sets the timestamp in milliseconds of the event.

           @param {number} timestamp Timestamp of the event.
           @since v2.0.5
        */
        setTimestamp(timestamp: number): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.RotationEvent.
           @return {Adaptive.RotationEvent} Wrapped object instance.
        */
        static toObject(object: any): RotationEvent;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.RotationEvent[].
           @return {Adaptive.RotationEvent[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): RotationEvent[];
    }
    /**
       @class Adaptive.SecureKeyPair
       @extends Adaptive.APIBean
       Represents a single secureKey-value pair.

       @author Aryslan
       @since v2.0
       @version 1.0
    */
    class SecureKeyPair extends APIBean {
        /**
           @property {string} secureData
           Value of the secured element
        */
        secureData: string;
        /**
           @property {string} secureData
           Value of the secured element The 'secureDataProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'secureData'.
        */
        secureDataProperty: string;
        /**
           @property {string} secureKey
           Key of the secured element
        */
        secureKey: string;
        /**
           @property {string} secureKey
           Key of the secured element The 'secureKeyProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'secureKey'.
        */
        secureKeyProperty: string;
        /**
           @method constructor
           Constructor with parameters

           @param {string} secureKey  name of the keypair
           @param {string} secureData value of the keypair
           @since v2.0
        */
        constructor(secureKey: string, secureData: string);
        /**
           @method
           Returns the object value

           @return {string} Value.
           @since v2.0
        */
        getSecureData(): string;
        /**
           @method
           Sets the value for this object

           @param {string} secureData value to set.
           @since v2.0
        */
        setSecureData(secureData: string): void;
        /**
           @method
           Returns the object secureKey name.

           @return {string} Key name.
           @since v2.0
        */
        getSecureKey(): string;
        /**
           @method
           Sets the secureKey name for this object.

           @param {string} secureKey Key name.
           @since v2.0
        */
        setSecureKey(secureKey: string): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.SecureKeyPair.
           @return {Adaptive.SecureKeyPair} Wrapped object instance.
        */
        static toObject(object: any): SecureKeyPair;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.SecureKeyPair[].
           @return {Adaptive.SecureKeyPair[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): SecureKeyPair[];
    }
    /**
       @class Adaptive.ServiceRequest
       @extends Adaptive.APIBean
       Represents a local or remote service request.

       @author Aryslan
       @since v2.0
       @version 1.0
    */
    class ServiceRequest extends APIBean {
        /**
           @property {Adaptive.IServiceContentEncoding} contentEncoding
           Encoding of the content - by default assumed to be UTF8. This may be populated by the application, the platform
populates this field with defaults for the service.
        */
        contentEncoding: IServiceContentEncoding;
        /**
           @property {Adaptive.IServiceContentEncoding} contentEncoding
           Encoding of the content - by default assumed to be UTF8. This may be populated by the application, the platform
populates this field with defaults for the service. The 'contentEncodingProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contentEncoding'.
        */
        contentEncodingProperty: IServiceContentEncoding;
        /**
           @property {Adaptive.ServiceRequestParameter[]} bodyParameters
           Body parameters to be included in the body of the request to a service. These may be applied
during GET/POST operations. No body parameters are included if this array is null or length zero.
        */
        bodyParameters: Array<ServiceRequestParameter>;
        /**
           @property {Adaptive.ServiceRequestParameter[]} bodyParameters
           Body parameters to be included in the body of the request to a service. These may be applied
during GET/POST operations. No body parameters are included if this array is null or length zero. The 'bodyParametersProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'bodyParameters'.
        */
        bodyParametersProperty: Array<ServiceRequestParameter>;
        /**
           @property {string} content
           Request data content (plain text). This should be populated by the application. The content should be
in some well-known web format - in specific, binaries submitted should be encoded to base64 and the content
type should be set respectively by the application.
        */
        content: string;
        /**
           @property {string} content
           Request data content (plain text). This should be populated by the application. The content should be
in some well-known web format - in specific, binaries submitted should be encoded to base64 and the content
type should be set respectively by the application. The 'contentProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'content'.
        */
        contentProperty: string;
        /**
           @property {number} contentLength
           The length in bytes of the content. This may be populated by the application, the platform
calculates this length automatically if a specific contentLength is not specified.
        */
        contentLength: number;
        /**
           @property {number} contentLength
           The length in bytes of the content. This may be populated by the application, the platform
calculates this length automatically if a specific contentLength is not specified. The 'contentLengthProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contentLength'.
        */
        contentLengthProperty: number;
        /**
           @property {string} contentType
           The request content type (MIME TYPE). This may be populated by the application, the platform
populates this field with defaults for the service.
        */
        contentType: string;
        /**
           @property {string} contentType
           The request content type (MIME TYPE). This may be populated by the application, the platform
populates this field with defaults for the service. The 'contentTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contentType'.
        */
        contentTypeProperty: string;
        /**
           @property {Adaptive.ServiceRequestParameter[]} queryParameters
           Query string parameters to be appended to the service URL when making the request. These may be applied
during GET/POST operations. No query parameters are appended if this array is null or length zero.
        */
        queryParameters: Array<ServiceRequestParameter>;
        /**
           @property {Adaptive.ServiceRequestParameter[]} queryParameters
           Query string parameters to be appended to the service URL when making the request. These may be applied
during GET/POST operations. No query parameters are appended if this array is null or length zero. The 'queryParametersProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'queryParameters'.
        */
        queryParametersProperty: Array<ServiceRequestParameter>;
        /**
           @property {string} refererHost
           This host indicates the origin host of the request. This, could be useful in case of redirected requests.
        */
        refererHost: string;
        /**
           @property {string} refererHost
           This host indicates the origin host of the request. This, could be useful in case of redirected requests. The 'refererHostProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'refererHost'.
        */
        refererHostProperty: string;
        /**
           @property {Adaptive.ServiceHeader[]} serviceHeaders
           The serviceHeaders array (name,value pairs) to be included in the request. This may be populated by the
application, the platform populates this field with defaults for the service and the previous headers.
In specific, the platform maintains request and response state automatically.
        */
        serviceHeaders: Array<ServiceHeader>;
        /**
           @property {Adaptive.ServiceHeader[]} serviceHeaders
           The serviceHeaders array (name,value pairs) to be included in the request. This may be populated by the
application, the platform populates this field with defaults for the service and the previous headers.
In specific, the platform maintains request and response state automatically. The 'serviceHeadersProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'serviceHeaders'.
        */
        serviceHeadersProperty: Array<ServiceHeader>;
        /**
           @property {Adaptive.ServiceSession} serviceSession
           Session attributes and cookies. This may be populated by the application, the platform populates
this field with defaults for the service and the previous state information. In specific, the platform
maintains request and response state automatically.
        */
        serviceSession: ServiceSession;
        /**
           @property {Adaptive.ServiceSession} serviceSession
           Session attributes and cookies. This may be populated by the application, the platform populates
this field with defaults for the service and the previous state information. In specific, the platform
maintains request and response state automatically. The 'serviceSessionProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'serviceSession'.
        */
        serviceSessionProperty: ServiceSession;
        /**
           @property {Adaptive.ServiceToken} serviceToken
           Token used for the creation of the request with the destination service, endpoint, function and method
identifiers. This should not be manipulated by the application directly.
        */
        serviceToken: ServiceToken;
        /**
           @property {Adaptive.ServiceToken} serviceToken
           Token used for the creation of the request with the destination service, endpoint, function and method
identifiers. This should not be manipulated by the application directly. The 'serviceTokenProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'serviceToken'.
        */
        serviceTokenProperty: ServiceToken;
        /**
           @property {string} userAgent
           This attribute allows for the default user-agent string to be overridden by the application.
        */
        userAgent: string;
        /**
           @property {string} userAgent
           This attribute allows for the default user-agent string to be overridden by the application. The 'userAgentProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'userAgent'.
        */
        userAgentProperty: string;
        /**
           @method constructor
           Convenience constructor.

           @param {string} content      Content payload.
           @param {Adaptive.ServiceToken} serviceToken ServiceToken for the request.
           @since v2.0.6
        */
        constructor(content: string, serviceToken: ServiceToken);
        /**
           @method
           Returns the content encoding

           @return {Adaptive.IServiceContentEncoding} contentEncoding
           @since v2.0
        */
        getContentEncoding(): IServiceContentEncoding;
        /**
           @method
           Set the content encoding

           @param {Adaptive.IServiceContentEncoding} contentEncoding Encoding of the binary payload - by default assumed to be UTF8.
           @since v2.0
        */
        setContentEncoding(contentEncoding: IServiceContentEncoding): void;
        /**
           @method
           Gets the body parameters of the request.

           @return {Adaptive.ServiceRequestParameter[]} ServiceRequestParameter array or null if none are specified.
           @since v2.0.6
        */
        getBodyParameters(): Array<ServiceRequestParameter>;
        /**
           @method
           Sets the body parameters of the request.

           @param {Adaptive.ServiceRequestParameter[]} bodyParameters ServiceRequestParameter array or null if none are specified.
           @since v2.0.6
        */
        setBodyParameters(bodyParameters: Array<ServiceRequestParameter>): void;
        /**
           @method
           Returns the content

           @return {string} content
           @since v2.0
        */
        getContent(): string;
        /**
           @method
           Set the content

           @param {string} content Request/Response data content (plain text)
           @since v2.0
        */
        setContent(content: string): void;
        /**
           @method
           Returns the content length

           @return {number} contentLength
           @since v2.0
        */
        getContentLength(): number;
        /**
           @method
           Set the content length

           @param {number} contentLength The length in bytes for the Content field.
           @since v2.0
        */
        setContentLength(contentLength: number): void;
        /**
           @method
           Returns the content type

           @return {string} contentType
           @since v2.0
        */
        getContentType(): string;
        /**
           @method
           Set the content type

           @param {string} contentType The request/response content type (MIME TYPE).
           @since v2.0
        */
        setContentType(contentType: string): void;
        /**
           @method
           Gets the query parameters of the request.

           @return {Adaptive.ServiceRequestParameter[]} ServiceRequestParameter array or null if none are specified.
           @since v2.0.6
        */
        getQueryParameters(): Array<ServiceRequestParameter>;
        /**
           @method
           Sets the query parameters of the request.

           @param {Adaptive.ServiceRequestParameter[]} queryParameters ServiceRequestParameter array or null if none are specified.
           @since v2.0.6
        */
        setQueryParameters(queryParameters: Array<ServiceRequestParameter>): void;
        /**
           @method
           Returns the referer host (origin) of the request.

           @return {string} Referer host of the request
           @since v2.1.4
        */
        getRefererHost(): string;
        /**
           @method
           Sets the value for the referer host of the request.

           @param {string} refererHost Referer host of the request
           @since v2.1.4
        */
        setRefererHost(refererHost: string): void;
        /**
           @method
           Returns the array of ServiceHeader

           @return {Adaptive.ServiceHeader[]} serviceHeaders
           @since v2.0
        */
        getServiceHeaders(): Array<ServiceHeader>;
        /**
           @method
           Set the array of ServiceHeader

           @param {Adaptive.ServiceHeader[]} serviceHeaders The serviceHeaders array (name,value pairs) to be included on the I/O service request.
           @since v2.0
        */
        setServiceHeaders(serviceHeaders: Array<ServiceHeader>): void;
        /**
           @method
           Getter for service session

           @return {Adaptive.ServiceSession} The element service session
           @since v2.0
        */
        getServiceSession(): ServiceSession;
        /**
           @method
           Setter for service session

           @param {Adaptive.ServiceSession} serviceSession The element service session
           @since v2.0
        */
        setServiceSession(serviceSession: ServiceSession): void;
        /**
           @method
           Gets the ServiceToken of the request.

           @return {Adaptive.ServiceToken} ServiceToken.
           @since v2.0.6
        */
        getServiceToken(): ServiceToken;
        /**
           @method
           Sets the ServiceToken of the request.

           @param {Adaptive.ServiceToken} serviceToken ServiceToken to be used for the invocation.
           @since v2.0.6
        */
        setServiceToken(serviceToken: ServiceToken): void;
        /**
           @method
           Gets the overridden user-agent string.

           @return {string} User-agent string.
           @since v2.0.6
        */
        getUserAgent(): string;
        /**
           @method
           Sets the user-agent to override the default user-agent string.

           @param {string} userAgent User-agent string.
           @since v2.0.6
        */
        setUserAgent(userAgent: string): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceRequest.
           @return {Adaptive.ServiceRequest} Wrapped object instance.
        */
        static toObject(object: any): ServiceRequest;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceRequest[].
           @return {Adaptive.ServiceRequest[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): ServiceRequest[];
    }
    /**
       @class Adaptive.ServiceResponse
       @extends Adaptive.APIBean
       Represents a local or remote service response.

       @author Aryslan
       @since v2.0
       @version 1.0
    */
    class ServiceResponse extends APIBean {
        /**
           @property {Adaptive.IServiceContentEncoding} contentEncoding
           Encoding of the binary payload - by default assumed to be UTF8.
        */
        contentEncoding: IServiceContentEncoding;
        /**
           @property {Adaptive.IServiceContentEncoding} contentEncoding
           Encoding of the binary payload - by default assumed to be UTF8. The 'contentEncodingProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contentEncoding'.
        */
        contentEncodingProperty: IServiceContentEncoding;
        /**
           @property {string} content
           Response data content. The content should be in some well-known web format - in specific, binaries returned
should be encoded in base64.
        */
        content: string;
        /**
           @property {string} content
           Response data content. The content should be in some well-known web format - in specific, binaries returned
should be encoded in base64. The 'contentProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'content'.
        */
        contentProperty: string;
        /**
           @property {number} contentLength
           The length in bytes for the Content field.
        */
        contentLength: number;
        /**
           @property {number} contentLength
           The length in bytes for the Content field. The 'contentLengthProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contentLength'.
        */
        contentLengthProperty: number;
        /**
           @property {string} contentType
           The request/response content type (MIME TYPE).
        */
        contentType: string;
        /**
           @property {string} contentType
           The request/response content type (MIME TYPE). The 'contentTypeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contentType'.
        */
        contentTypeProperty: string;
        /**
           @property {Adaptive.ServiceHeader[]} serviceHeaders
           The serviceHeaders array (name,value pairs) to be included on the I/O service request.
        */
        serviceHeaders: Array<ServiceHeader>;
        /**
           @property {Adaptive.ServiceHeader[]} serviceHeaders
           The serviceHeaders array (name,value pairs) to be included on the I/O service request. The 'serviceHeadersProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'serviceHeaders'.
        */
        serviceHeadersProperty: Array<ServiceHeader>;
        /**
           @property {Adaptive.ServiceSession} serviceSession
           Information about the session.
        */
        serviceSession: ServiceSession;
        /**
           @property {Adaptive.ServiceSession} serviceSession
           Information about the session. The 'serviceSessionProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'serviceSession'.
        */
        serviceSessionProperty: ServiceSession;
        /**
           @property {number} statusCode
           HTTP Status code of the response. With this status code it is possible to perform some actions, redirects, authentication, etc.
        */
        statusCode: number;
        /**
           @property {number} statusCode
           HTTP Status code of the response. With this status code it is possible to perform some actions, redirects, authentication, etc. The 'statusCodeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'statusCode'.
        */
        statusCodeProperty: number;
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
        constructor(content: string, contentType: string, contentEncoding: IServiceContentEncoding, contentLength: number, serviceHeaders: Array<ServiceHeader>, serviceSession: ServiceSession, statusCode: number);
        /**
           @method
           Returns the content encoding

           @return {Adaptive.IServiceContentEncoding} contentEncoding
           @since v2.0
        */
        getContentEncoding(): IServiceContentEncoding;
        /**
           @method
           Set the content encoding

           @param {Adaptive.IServiceContentEncoding} contentEncoding Encoding of the binary payload - by default assumed to be UTF8.
           @since v2.0
        */
        setContentEncoding(contentEncoding: IServiceContentEncoding): void;
        /**
           @method
           Returns the content

           @return {string} content
           @since v2.0
        */
        getContent(): string;
        /**
           @method
           Set the content

           @param {string} content Request/Response data content (plain text).
           @since v2.0
        */
        setContent(content: string): void;
        /**
           @method
           Returns the content length

           @return {number} contentLength
           @since v2.0
        */
        getContentLength(): number;
        /**
           @method
           Set the content length.

           @param {number} contentLength The length in bytes for the Content field.
           @since v2.0
        */
        setContentLength(contentLength: number): void;
        /**
           @method
           Returns the content type

           @return {string} contentType
           @since v2.0
        */
        getContentType(): string;
        /**
           @method
           Set the content type

           @param {string} contentType The request/response content type (MIME TYPE).
           @since v2.0
        */
        setContentType(contentType: string): void;
        /**
           @method
           Returns the array of ServiceHeader

           @return {Adaptive.ServiceHeader[]} serviceHeaders
           @since v2.0
        */
        getServiceHeaders(): Array<ServiceHeader>;
        /**
           @method
           Set the array of ServiceHeader

           @param {Adaptive.ServiceHeader[]} serviceHeaders The serviceHeaders array (name,value pairs) to be included on the I/O service request.
           @since v2.0
        */
        setServiceHeaders(serviceHeaders: Array<ServiceHeader>): void;
        /**
           @method
           Getter for service session

           @return {Adaptive.ServiceSession} The element service session
           @since v2.0
        */
        getServiceSession(): ServiceSession;
        /**
           @method
           Setter for service session

           @param {Adaptive.ServiceSession} serviceSession The element service session
           @since v2.0
        */
        setServiceSession(serviceSession: ServiceSession): void;
        /**
           @method
           Returns the status code of the response.

           @return {number} HTTP status code
           @since v2.1.4
        */
        getStatusCode(): number;
        /**
           @method
           Sets the status code of the response

           @param {number} statusCode HTTP status code
           @since v2.1.4
        */
        setStatusCode(statusCode: number): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceResponse.
           @return {Adaptive.ServiceResponse} Wrapped object instance.
        */
        static toObject(object: any): ServiceResponse;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceResponse[].
           @return {Adaptive.ServiceResponse[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): ServiceResponse[];
    }
    /**
       @class Adaptive.ServiceSession
       @extends Adaptive.APIBean
       Represents a session object for HTTP request and responses

       @author Ferran Vila Conesa
       @since v2.0
       @version 1.0
    */
    class ServiceSession extends APIBean {
        /**
           @property {Adaptive.ServiceSessionAttribute[]} attributes
           The attributes of the request or response.
        */
        attributes: Array<ServiceSessionAttribute>;
        /**
           @property {Adaptive.ServiceSessionAttribute[]} attributes
           The attributes of the request or response. The 'attributesProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'attributes'.
        */
        attributesProperty: Array<ServiceSessionAttribute>;
        /**
           @property {Adaptive.ServiceSessionCookie[]} cookies
           The cookies of the request or response.
        */
        cookies: Array<ServiceSessionCookie>;
        /**
           @property {Adaptive.ServiceSessionCookie[]} cookies
           The cookies of the request or response. The 'cookiesProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'cookies'.
        */
        cookiesProperty: Array<ServiceSessionCookie>;
        /**
           @method constructor
           Constructor with fields.

           @param {Adaptive.ServiceSessionCookie[]} cookies    The cookies of the request or response.
           @param {Adaptive.ServiceSessionAttribute[]} attributes Attributes of the request or response.
           @since v2.0
        */
        constructor(cookies: Array<ServiceSessionCookie>, attributes: Array<ServiceSessionAttribute>);
        /**
           @method
           Gets the attributes of the request or response.

           @return {Adaptive.ServiceSessionAttribute[]} Attributes of the request or response.
           @since v2.0
        */
        getAttributes(): Array<ServiceSessionAttribute>;
        /**
           @method
           Sets the attributes for the request or response.

           @param {Adaptive.ServiceSessionAttribute[]} attributes Attributes of the request or response.
           @since v2.0
        */
        setAttributes(attributes: Array<ServiceSessionAttribute>): void;
        /**
           @method
           Returns the cookies of the request or response.

           @return {Adaptive.ServiceSessionCookie[]} The cookies of the request or response.
           @since v2.0
        */
        getCookies(): Array<ServiceSessionCookie>;
        /**
           @method
           Sets the cookies of the request or response.

           @param {Adaptive.ServiceSessionCookie[]} cookies The cookies of the request or response.
           @since v2.0
        */
        setCookies(cookies: Array<ServiceSessionCookie>): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceSession.
           @return {Adaptive.ServiceSession} Wrapped object instance.
        */
        static toObject(object: any): ServiceSession;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceSession[].
           @return {Adaptive.ServiceSession[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): ServiceSession[];
    }
    /**
       @class Adaptive.ServiceSessionCookie
       @extends Adaptive.APIBean
       Structure representing the cookieValue of a http cookie.

       @author Aryslan
       @since v2.0
       @version 1.0
    */
    class ServiceSessionCookie extends APIBean {
        /**
           @property {string} cookieName
           Name ot the cookie.
        */
        cookieName: string;
        /**
           @property {string} cookieName
           Name ot the cookie. The 'cookieNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'cookieName'.
        */
        cookieNameProperty: string;
        /**
           @property {string} cookieValue
           Value of the ServiceCookie.
        */
        cookieValue: string;
        /**
           @property {string} cookieValue
           Value of the ServiceCookie. The 'cookieValueProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'cookieValue'.
        */
        cookieValueProperty: string;
        /**
           @property {number} creation
           ServiceCookie creation timestamp in milliseconds.
        */
        creation: number;
        /**
           @property {number} creation
           ServiceCookie creation timestamp in milliseconds. The 'creationProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'creation'.
        */
        creationProperty: number;
        /**
           @property {string} domain
           Domain for which the cookie is valid.
        */
        domain: string;
        /**
           @property {string} domain
           Domain for which the cookie is valid. The 'domainProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'domain'.
        */
        domainProperty: string;
        /**
           @property {number} expiry
           ServiceCookie expiry in milliseconds or -1 for session only.
        */
        expiry: number;
        /**
           @property {number} expiry
           ServiceCookie expiry in milliseconds or -1 for session only. The 'expiryProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'expiry'.
        */
        expiryProperty: number;
        /**
           @property {string} path
           URI path for which the cookie is valid.
        */
        path: string;
        /**
           @property {string} path
           URI path for which the cookie is valid. The 'pathProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'path'.
        */
        pathProperty: string;
        /**
           @property {string} scheme
           Scheme of the domain - http/https - for which the cookie is valid.
        */
        scheme: string;
        /**
           @property {string} scheme
           Scheme of the domain - http/https - for which the cookie is valid. The 'schemeProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'scheme'.
        */
        schemeProperty: string;
        /**
           @property {boolean} secure
           ServiceCookie is secure (https only).
        */
        secure: boolean;
        /**
           @property {boolean} secure
           ServiceCookie is secure (https only). The 'secureProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'secure'.
        */
        secureProperty: boolean;
        /**
           @method constructor
           Constructor used by the implementation

           @param {string} cookieName  Name of the cookie
           @param {string} cookieValue Value of the cookie
           @since v2.0
        */
        constructor(cookieName: string, cookieValue: string);
        /**
           @method
           Returns the cookie cookieName

           @return {string} cookieName Name of the cookie
           @since v2.0
        */
        getCookieName(): string;
        /**
           @method
           Set the cookie cookieName

           @param {string} cookieName Name of the cookie
           @since v2.0
        */
        setCookieName(cookieName: string): void;
        /**
           @method
           Returns the cookie cookieValue

           @return {string} Value of the cookie
           @since v2.0
        */
        getCookieValue(): string;
        /**
           @method
           Set the cookie cookieValue

           @param {string} cookieValue Value of the cookie
           @since v2.0
        */
        setCookieValue(cookieValue: string): void;
        /**
           @method
           Returns the creation date

           @return {number} Creation date of the cookie
           @since v2.0
        */
        getCreation(): number;
        /**
           @method
           Sets the creation date

           @param {number} creation Creation date of the cookie
           @since v2.0
        */
        setCreation(creation: number): void;
        /**
           @method
           Returns the domain

           @return {string} domain
           @since v2.0
        */
        getDomain(): string;
        /**
           @method
           Set the domain

           @param {string} domain Domain of the cookie
           @since v2.0
        */
        setDomain(domain: string): void;
        /**
           @method
           Returns the expiration date in milis

           @return {number} expiry
           @since v2.0
        */
        getExpiry(): number;
        /**
           @method
           Set the expiration date in milis

           @param {number} expiry Expiration date of the cookie
           @since v2.0
        */
        setExpiry(expiry: number): void;
        /**
           @method
           Returns the path

           @return {string} path
           @since v2.0
        */
        getPath(): string;
        /**
           @method
           Set the path

           @param {string} path Path of the cookie
           @since v2.0
        */
        setPath(path: string): void;
        /**
           @method
           Returns the scheme

           @return {string} scheme
           @since v2.0
        */
        getScheme(): string;
        /**
           @method
           Set the scheme

           @param {string} scheme Scheme of the cookie
           @since v2.0
        */
        setScheme(scheme: string): void;
        /**
           @method
           Returns whether the cookie is secure or not

           @return {boolean} true if the cookie is secure; false otherwise
           @since v2.0
        */
        getSecure(): boolean;
        /**
           @method
           Set whether the cookie is secure or not

           @param {boolean} secure Privacy of the cookie
           @since v2.0
        */
        setSecure(secure: boolean): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceSessionCookie.
           @return {Adaptive.ServiceSessionCookie} Wrapped object instance.
        */
        static toObject(object: any): ServiceSessionCookie;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceSessionCookie[].
           @return {Adaptive.ServiceSessionCookie[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): ServiceSessionCookie[];
    }
    /**
       @class Adaptive.ServiceToken
       @extends Adaptive.APIBean
       Object representing a specific service, path, function and invocation method for accessing external services.

       @author Carlos Lozano Diez
       @since v2.0.6
       @version 1.0
    */
    class ServiceToken extends APIBean {
        /**
           @property {Adaptive.IServiceMethod} invocationMethod
           Http method to be used by the invocation - this is typically GET or POST albeit the platform may support
other invocation methods. This is also defined per function of each endpoint in the platform's XML file.
        */
        invocationMethod: IServiceMethod;
        /**
           @property {Adaptive.IServiceMethod} invocationMethod
           Http method to be used by the invocation - this is typically GET or POST albeit the platform may support
other invocation methods. This is also defined per function of each endpoint in the platform's XML file. The 'invocationMethodProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'invocationMethod'.
        */
        invocationMethodProperty: IServiceMethod;
        /**
           @property {string} endpointName
           Name of the endpoint configured in the platform's services XML file. This is a reference to a specific schema,
host and port combination for a given service.
        */
        endpointName: string;
        /**
           @property {string} endpointName
           Name of the endpoint configured in the platform's services XML file. This is a reference to a specific schema,
host and port combination for a given service. The 'endpointNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'endpointName'.
        */
        endpointNameProperty: string;
        /**
           @property {string} functionName
           Name of the function configured in the platform's services XML file for a specific endpoint. This is a reference
to a relative path of a function published on a remote service.
        */
        functionName: string;
        /**
           @property {string} functionName
           Name of the function configured in the platform's services XML file for a specific endpoint. This is a reference
to a relative path of a function published on a remote service. The 'functionNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'functionName'.
        */
        functionNameProperty: string;
        /**
           @property {string} serviceName
           Name of the service configured in the platform's services XML file.
        */
        serviceName: string;
        /**
           @property {string} serviceName
           Name of the service configured in the platform's services XML file. The 'serviceNameProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'serviceName'.
        */
        serviceNameProperty: string;
        /**
           @method constructor
           Convenience constructor.

           @param {string} serviceName      Name of the configured service.
           @param {string} endpointName     Name of the endpoint configured for the service.
           @param {string} functionName     Name of the function configured for the endpoint.
           @param {Adaptive.IServiceMethod} invocationMethod Method type configured for the function.
           @since v2.0.6
        */
        constructor(serviceName: string, endpointName: string, functionName: string, invocationMethod: IServiceMethod);
        /**
           @method
           Get token's invocation method type.

           @return {Adaptive.IServiceMethod} Invocation method type.
           @since v2.0.6
        */
        getInvocationMethod(): IServiceMethod;
        /**
           @method
           Sets the invocation method type.

           @param {Adaptive.IServiceMethod} invocationMethod Method type.
           @since v2.0.6
        */
        setInvocationMethod(invocationMethod: IServiceMethod): void;
        /**
           @method
           Get token's endpoint name.

           @return {string} Endpoint name.
           @since v2.0.6
        */
        getEndpointName(): string;
        /**
           @method
           Set the endpoint name.

           @param {string} endpointName Endpoint name.
           @since v2.0.6
        */
        setEndpointName(endpointName: string): void;
        /**
           @method
           Get token's function name.

           @return {string} Function name.
           @since v2.0.6
        */
        getFunctionName(): string;
        /**
           @method
           Sets the function name.

           @param {string} functionName Function name.
           @since v2.0.6
        */
        setFunctionName(functionName: string): void;
        /**
           @method
           Get token's service name.

           @return {string} Service name.
           @since v2.0.6
        */
        getServiceName(): string;
        /**
           @method
           Sets token's service name.

           @param {string} serviceName Service name.
           @since v2.0.6
        */
        setServiceName(serviceName: string): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceToken.
           @return {Adaptive.ServiceToken} Wrapped object instance.
        */
        static toObject(object: any): ServiceToken;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceToken[].
           @return {Adaptive.ServiceToken[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): ServiceToken[];
    }
    /**
       @class Adaptive.Contact
       @extends Adaptive.ContactUid
       Structure representing the data elements of a contact.

       @author Francisco Javier Martin Bueno
       @since v2.0
       @version 1.0
    */
    class Contact extends ContactUid {
        /**
           @property {Adaptive.ContactAddress[]} contactAddresses
           The adresses from the contact
        */
        contactAddresses: Array<ContactAddress>;
        /**
           @property {Adaptive.ContactAddress[]} contactAddresses
           The adresses from the contact The 'contactAddressesProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactAddresses'.
        */
        contactAddressesProperty: Array<ContactAddress>;
        /**
           @property {Adaptive.ContactEmail[]} contactEmails
           The emails from the contact
        */
        contactEmails: Array<ContactEmail>;
        /**
           @property {Adaptive.ContactEmail[]} contactEmails
           The emails from the contact The 'contactEmailsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactEmails'.
        */
        contactEmailsProperty: Array<ContactEmail>;
        /**
           @property {Adaptive.ContactPhone[]} contactPhones
           The phones from the contact
        */
        contactPhones: Array<ContactPhone>;
        /**
           @property {Adaptive.ContactPhone[]} contactPhones
           The phones from the contact The 'contactPhonesProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactPhones'.
        */
        contactPhonesProperty: Array<ContactPhone>;
        /**
           @property {Adaptive.ContactSocial[]} contactSocials
           The social network info from the contact
        */
        contactSocials: Array<ContactSocial>;
        /**
           @property {Adaptive.ContactSocial[]} contactSocials
           The social network info from the contact The 'contactSocialsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactSocials'.
        */
        contactSocialsProperty: Array<ContactSocial>;
        /**
           @property {Adaptive.ContactTag[]} contactTags
           The aditional tags from the contact
        */
        contactTags: Array<ContactTag>;
        /**
           @property {Adaptive.ContactTag[]} contactTags
           The aditional tags from the contact The 'contactTagsProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactTags'.
        */
        contactTagsProperty: Array<ContactTag>;
        /**
           @property {Adaptive.ContactWebsite[]} contactWebsites
           The websites from the contact
        */
        contactWebsites: Array<ContactWebsite>;
        /**
           @property {Adaptive.ContactWebsite[]} contactWebsites
           The websites from the contact The 'contactWebsitesProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'contactWebsites'.
        */
        contactWebsitesProperty: Array<ContactWebsite>;
        /**
           @property {Adaptive.ContactPersonalInfo} personalInfo
           The personal info from the contact
        */
        personalInfo: ContactPersonalInfo;
        /**
           @property {Adaptive.ContactPersonalInfo} personalInfo
           The personal info from the contact The 'personalInfoProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'personalInfo'.
        */
        personalInfoProperty: ContactPersonalInfo;
        /**
           @property {Adaptive.ContactProfessionalInfo} professionalInfo
           The professional info from the contact
        */
        professionalInfo: ContactProfessionalInfo;
        /**
           @property {Adaptive.ContactProfessionalInfo} professionalInfo
           The professional info from the contact The 'professionalInfoProperty' is registered with the ECMAScript 5 Object.defineProperty() for the class field 'professionalInfo'.
        */
        professionalInfoProperty: ContactProfessionalInfo;
        /**
           @method constructor
           Constructor used by implementation to set the Contact.

           @param {string} contactId of the Contact
           @since v2.0
        */
        constructor(contactId: string);
        /**
           @method
           Returns all the addresses of the Contact

           @return {Adaptive.ContactAddress[]} ContactAddress[]
           @since v2.0
        */
        getContactAddresses(): Array<ContactAddress>;
        /**
           @method
           Set the addresses of the Contact

           @param {Adaptive.ContactAddress[]} contactAddresses Addresses of the contact
           @since v2.0
        */
        setContactAddresses(contactAddresses: Array<ContactAddress>): void;
        /**
           @method
           Returns all the emails of the Contact

           @return {Adaptive.ContactEmail[]} ContactEmail[]
           @since v2.0
        */
        getContactEmails(): Array<ContactEmail>;
        /**
           @method
           Set the emails of the Contact

           @param {Adaptive.ContactEmail[]} contactEmails Emails of the contact
           @since v2.0
        */
        setContactEmails(contactEmails: Array<ContactEmail>): void;
        /**
           @method
           Returns all the phones of the Contact

           @return {Adaptive.ContactPhone[]} ContactPhone[]
           @since v2.0
        */
        getContactPhones(): Array<ContactPhone>;
        /**
           @method
           Set the phones of the Contact

           @param {Adaptive.ContactPhone[]} contactPhones Phones of the contact
           @since v2.0
        */
        setContactPhones(contactPhones: Array<ContactPhone>): void;
        /**
           @method
           Returns all the social network info of the Contact

           @return {Adaptive.ContactSocial[]} ContactSocial[]
           @since v2.0
        */
        getContactSocials(): Array<ContactSocial>;
        /**
           @method
           Set the social network info of the Contact

           @param {Adaptive.ContactSocial[]} contactSocials Social Networks of the contact
           @since v2.0
        */
        setContactSocials(contactSocials: Array<ContactSocial>): void;
        /**
           @method
           Returns the additional tags of the Contact

           @return {Adaptive.ContactTag[]} ContactTag[]
           @since v2.0
        */
        getContactTags(): Array<ContactTag>;
        /**
           @method
           Set the additional tags of the Contact

           @param {Adaptive.ContactTag[]} contactTags Tags of the contact
           @since v2.0
        */
        setContactTags(contactTags: Array<ContactTag>): void;
        /**
           @method
           Returns all the websites of the Contact

           @return {Adaptive.ContactWebsite[]} ContactWebsite[]
           @since v2.0
        */
        getContactWebsites(): Array<ContactWebsite>;
        /**
           @method
           Set the websites of the Contact

           @param {Adaptive.ContactWebsite[]} contactWebsites Websites of the contact
           @since v2.0
        */
        setContactWebsites(contactWebsites: Array<ContactWebsite>): void;
        /**
           @method
           Returns the personal info of the Contact

           @return {Adaptive.ContactPersonalInfo} ContactPersonalInfo of the Contact
           @since v2.0
        */
        getPersonalInfo(): ContactPersonalInfo;
        /**
           @method
           Set the personal info of the Contact

           @param {Adaptive.ContactPersonalInfo} personalInfo Personal Information
           @since v2.0
        */
        setPersonalInfo(personalInfo: ContactPersonalInfo): void;
        /**
           @method
           Returns the professional info of the Contact

           @return {Adaptive.ContactProfessionalInfo} Array of personal info
           @since v2.0
        */
        getProfessionalInfo(): ContactProfessionalInfo;
        /**
           @method
           Set the professional info of the Contact

           @param {Adaptive.ContactProfessionalInfo} professionalInfo Professional Information
           @since v2.0
        */
        setProfessionalInfo(professionalInfo: ContactProfessionalInfo): void;
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Contact.
           @return {Adaptive.Contact} Wrapped object instance.
        */
        static toObject(object: any): Contact;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.Contact[].
           @return {Adaptive.Contact[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): Contact[];
    }
    /**
       @class Adaptive.ServiceHeader
       @extends Adaptive.KeyValue
       Structure representing the data of a http request or response header.

       @author Aryslan
       @since v2.0
       @version 1.0
    */
    class ServiceHeader extends KeyValue {
        /**
           @method constructor
           Convenience constructor.

           @param {string} keyName Name of the key.
           @param {string} keyData Value of the key.
           @since v2.0.6
        */
        constructor(keyName: string, keyData: string);
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceHeader.
           @return {Adaptive.ServiceHeader} Wrapped object instance.
        */
        static toObject(object: any): ServiceHeader;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceHeader[].
           @return {Adaptive.ServiceHeader[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): ServiceHeader[];
    }
    /**
       @class Adaptive.ServiceRequestParameter
       @extends Adaptive.KeyValue
       Object representing a request parameter.

       @author Carlos Lozano Diez
       @since 2.0.6
       @version 1.0
    */
    class ServiceRequestParameter extends KeyValue {
        /**
           @method constructor
           Convenience constructor.

           @param {string} keyName Name of the key.
           @param {string} keyData Value of the key.
           @since v2.0.6
        */
        constructor(keyName: string, keyData: string);
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceRequestParameter.
           @return {Adaptive.ServiceRequestParameter} Wrapped object instance.
        */
        static toObject(object: any): ServiceRequestParameter;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceRequestParameter[].
           @return {Adaptive.ServiceRequestParameter[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): ServiceRequestParameter[];
    }
    /**
       @class Adaptive.ServiceSessionAttribute
       @extends Adaptive.KeyValue
       Object representing a service session attribute.

       @author Carlos Lozano Diez
       @since 2.0.6
       @version 1.0
    */
    class ServiceSessionAttribute extends KeyValue {
        /**
           @method constructor
           Convenience constructor.

           @param {string} keyName Name of the key.
           @param {string} keyData Value of the key.
           @since v2.0.6
        */
        constructor(keyName: string, keyData: string);
        /**
           @method
           @static
           Convert JSON parsed object to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceSessionAttribute.
           @return {Adaptive.ServiceSessionAttribute} Wrapped object instance.
        */
        static toObject(object: any): ServiceSessionAttribute;
        /**
           @method
           @static
           Convert JSON parsed object array to typed equivalent.
           @param {Object} object JSON parsed structure of type Adaptive.ServiceSessionAttribute[].
           @return {Adaptive.ServiceSessionAttribute[]} Wrapped object array instance.
        */
        static toObjectArray(object: any): ServiceSessionAttribute[];
    }
    /**
       @class Adaptive.BaseListener
    */
    class BaseListener implements IBaseListener {
        /**
           @property {number}
           Unique id of listener.
        */
        id: number;
        /**
           @property {Adaptive.IAdaptiveRPGroup}
           Group of API.
        */
        apiGroup: IAdaptiveRPGroup;
        /**
           @method constructor
           Constructor with listener id.

           @param {number} id  The id of the listener.
        */
        constructor(id: number);
        /**
           @method
           @return {Adaptive.IAdaptiveRPGroup}
           Return the API group for the given interface.
        */
        getAPIGroup(): IAdaptiveRPGroup;
        /**
           @method
           Return the API version for the given interface.

           @return {string}
           The version of the API.
        */
        getAPIVersion(): string;
        /**
           @method
           Return the unique listener identifier. This is used to check if two listeners are the same
in every platform. This id is populated by the Javascript platform
           @return {number}
           Unique Listener identifier
        */
        getId(): number;
    }
    /**
       @property {Adaptive.Dictionary} registeredAccelerationListener
       @member Adaptive
       @private
       AccelerationListener control dictionary.
    */
    var registeredAccelerationListener: Dictionary<IAccelerationListener>;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IAccelerationListenerError} error
    */
    function handleAccelerationListenerError(id: number, error: IAccelerationListenerError): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Acceleration} acceleration
    */
    function handleAccelerationListenerResult(id: number, acceleration: Acceleration): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Acceleration} acceleration
       @param {Adaptive.IAccelerationListenerWarning} warning
    */
    function handleAccelerationListenerWarning(id: number, acceleration: Acceleration, warning: IAccelerationListenerWarning): void;
    /**
       @class Adaptive.AccelerationListener
       @extends Adaptive.BaseListener
    */
    class AccelerationListener extends BaseListener implements IAccelerationListener {
        /**
           @private
           @property
        */
        onErrorFunction: (error: IAccelerationListenerError) => void;
        /**
           @private
           @property
        */
        onResultFunction: (acceleration: Acceleration) => void;
        /**
           @private
           @property
        */
        onWarningFunction: (acceleration: Acceleration, warning: IAccelerationListenerWarning) => void;
        /**
           @method constructor
           Constructor with anonymous handler functions for listener.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IAccelerationListenerError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.Acceleration
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.Acceleration, Adaptive.IAccelerationListenerWarning
        */
        constructor(onErrorFunction: (error: IAccelerationListenerError) => void, onResultFunction: (acceleration: Acceleration) => void, onWarningFunction: (acceleration: Acceleration, warning: IAccelerationListenerWarning) => void);
        /**
           @method
           No data received - error condition, not authorized or hardware not available. This will be reported once for the
listener and subsequently, the listener will be deactivated and removed from the internal list of listeners.
           @param {Adaptive.IAccelerationListenerError} error error Error fired
           @since v2.0
        */
        onError(error: IAccelerationListenerError): void;
        /**
           @method
           Correct data received.
           @param {Adaptive.Acceleration} acceleration acceleration Acceleration received
           @since v2.0
        */
        onResult(acceleration: Acceleration): void;
        /**
           @method
           Data received with warning - ie. Needs calibration.
           @param {Adaptive.Acceleration} acceleration acceleration Acceleration received
           @param {Adaptive.IAccelerationListenerWarning} warning warning      Warning fired
           @since v2.0
        */
        onWarning(acceleration: Acceleration, warning: IAccelerationListenerWarning): void;
    }
    /**
       @property {Adaptive.Dictionary} registeredButtonListener
       @member Adaptive
       @private
       ButtonListener control dictionary.
    */
    var registeredButtonListener: Dictionary<IButtonListener>;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IButtonListenerError} error
    */
    function handleButtonListenerError(id: number, error: IButtonListenerError): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Button} button
    */
    function handleButtonListenerResult(id: number, button: Button): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Button} button
       @param {Adaptive.IButtonListenerWarning} warning
    */
    function handleButtonListenerWarning(id: number, button: Button, warning: IButtonListenerWarning): void;
    /**
       @class Adaptive.ButtonListener
       @extends Adaptive.BaseListener
    */
    class ButtonListener extends BaseListener implements IButtonListener {
        /**
           @private
           @property
        */
        onErrorFunction: (error: IButtonListenerError) => void;
        /**
           @private
           @property
        */
        onResultFunction: (button: Button) => void;
        /**
           @private
           @property
        */
        onWarningFunction: (button: Button, warning: IButtonListenerWarning) => void;
        /**
           @method constructor
           Constructor with anonymous handler functions for listener.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IButtonListenerError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.Button
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.Button, Adaptive.IButtonListenerWarning
        */
        constructor(onErrorFunction: (error: IButtonListenerError) => void, onResultFunction: (button: Button) => void, onWarningFunction: (button: Button, warning: IButtonListenerWarning) => void);
        /**
           @method
           No data received
           @param {Adaptive.IButtonListenerError} error error occurred
           @since v2.0
        */
        onError(error: IButtonListenerError): void;
        /**
           @method
           Called on button pressed
           @param {Adaptive.Button} button button pressed
           @since v2.0
        */
        onResult(button: Button): void;
        /**
           @method
           Data received with warning
           @param {Adaptive.Button} button button  pressed
           @param {Adaptive.IButtonListenerWarning} warning warning happened
           @since v2.0
        */
        onWarning(button: Button, warning: IButtonListenerWarning): void;
    }
    /**
       @property {Adaptive.Dictionary} registeredDeviceOrientationListener
       @member Adaptive
       @private
       DeviceOrientationListener control dictionary.
    */
    var registeredDeviceOrientationListener: Dictionary<IDeviceOrientationListener>;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IDeviceOrientationListenerError} error
    */
    function handleDeviceOrientationListenerError(id: number, error: IDeviceOrientationListenerError): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.RotationEvent} rotationEvent
    */
    function handleDeviceOrientationListenerResult(id: number, rotationEvent: RotationEvent): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.RotationEvent} rotationEvent
       @param {Adaptive.IDeviceOrientationListenerWarning} warning
    */
    function handleDeviceOrientationListenerWarning(id: number, rotationEvent: RotationEvent, warning: IDeviceOrientationListenerWarning): void;
    /**
       @class Adaptive.DeviceOrientationListener
       @extends Adaptive.BaseListener
    */
    class DeviceOrientationListener extends BaseListener implements IDeviceOrientationListener {
        /**
           @private
           @property
        */
        onErrorFunction: (error: IDeviceOrientationListenerError) => void;
        /**
           @private
           @property
        */
        onResultFunction: (rotationEvent: RotationEvent) => void;
        /**
           @private
           @property
        */
        onWarningFunction: (rotationEvent: RotationEvent, warning: IDeviceOrientationListenerWarning) => void;
        /**
           @method constructor
           Constructor with anonymous handler functions for listener.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IDeviceOrientationListenerError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.RotationEvent
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.RotationEvent, Adaptive.IDeviceOrientationListenerWarning
        */
        constructor(onErrorFunction: (error: IDeviceOrientationListenerError) => void, onResultFunction: (rotationEvent: RotationEvent) => void, onWarningFunction: (rotationEvent: RotationEvent, warning: IDeviceOrientationListenerWarning) => void);
        /**
           @method
           Although extremely unlikely, this event will be fired if something beyond the control of the
platform impedes the rotation of the device.
           @param {Adaptive.IDeviceOrientationListenerError} error error The error condition... generally unknown as it is unexpected!
           @since v2.0.5
        */
        onError(error: IDeviceOrientationListenerError): void;
        /**
           @method
           Event fired with the successful start and finish of a rotation.
           @param {Adaptive.RotationEvent} rotationEvent rotationEvent RotationEvent containing origin, destination and state of the event.
           @since v2.0.5
        */
        onResult(rotationEvent: RotationEvent): void;
        /**
           @method
           Event fired with a warning when the rotation is aborted. In specific, this
event may be fired if the devices vetoes the rotation before rotation is completed.
           @param {Adaptive.RotationEvent} rotationEvent rotationEvent   RotationEvent containing origin, destination and state of the event.
           @param {Adaptive.IDeviceOrientationListenerWarning} warning warning Type of condition that aborted rotation execution.
           @since v2.0.5
        */
        onWarning(rotationEvent: RotationEvent, warning: IDeviceOrientationListenerWarning): void;
    }
    /**
       @property {Adaptive.Dictionary} registeredDisplayOrientationListener
       @member Adaptive
       @private
       DisplayOrientationListener control dictionary.
    */
    var registeredDisplayOrientationListener: Dictionary<IDisplayOrientationListener>;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IDisplayOrientationListenerError} error
    */
    function handleDisplayOrientationListenerError(id: number, error: IDisplayOrientationListenerError): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.RotationEvent} rotationEvent
    */
    function handleDisplayOrientationListenerResult(id: number, rotationEvent: RotationEvent): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.RotationEvent} rotationEvent
       @param {Adaptive.IDisplayOrientationListenerWarning} warning
    */
    function handleDisplayOrientationListenerWarning(id: number, rotationEvent: RotationEvent, warning: IDisplayOrientationListenerWarning): void;
    /**
       @class Adaptive.DisplayOrientationListener
       @extends Adaptive.BaseListener
    */
    class DisplayOrientationListener extends BaseListener implements IDisplayOrientationListener {
        /**
           @private
           @property
        */
        onErrorFunction: (error: IDisplayOrientationListenerError) => void;
        /**
           @private
           @property
        */
        onResultFunction: (rotationEvent: RotationEvent) => void;
        /**
           @private
           @property
        */
        onWarningFunction: (rotationEvent: RotationEvent, warning: IDisplayOrientationListenerWarning) => void;
        /**
           @method constructor
           Constructor with anonymous handler functions for listener.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IDisplayOrientationListenerError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.RotationEvent
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.RotationEvent, Adaptive.IDisplayOrientationListenerWarning
        */
        constructor(onErrorFunction: (error: IDisplayOrientationListenerError) => void, onResultFunction: (rotationEvent: RotationEvent) => void, onWarningFunction: (rotationEvent: RotationEvent, warning: IDisplayOrientationListenerWarning) => void);
        /**
           @method
           Although extremely unlikely, this event will be fired if something beyond the control of the
platform impedes the rotation of the display.
           @param {Adaptive.IDisplayOrientationListenerError} error error The error condition... generally unknown as it is unexpected!
           @since v2.0.5
        */
        onError(error: IDisplayOrientationListenerError): void;
        /**
           @method
           Event fired with the successful start and finish of a rotation.
           @param {Adaptive.RotationEvent} rotationEvent rotationEvent RotationEvent containing origin, destination and state of the event.
           @since v2.0.5
        */
        onResult(rotationEvent: RotationEvent): void;
        /**
           @method
           Event fired with a warning when the rotation is aborted. In specific, this
event may be fired if the application vetoes display rotation before rotation is completed.
           @param {Adaptive.RotationEvent} rotationEvent rotationEvent   RotationEvent containing origin, destination and state of the event.
           @param {Adaptive.IDisplayOrientationListenerWarning} warning warning Type of condition that aborted rotation execution.
           @since v2.0.5
        */
        onWarning(rotationEvent: RotationEvent, warning: IDisplayOrientationListenerWarning): void;
    }
    /**
       @property {Adaptive.Dictionary} registeredGeolocationListener
       @member Adaptive
       @private
       GeolocationListener control dictionary.
    */
    var registeredGeolocationListener: Dictionary<IGeolocationListener>;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IGeolocationListenerError} error
    */
    function handleGeolocationListenerError(id: number, error: IGeolocationListenerError): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Geolocation} geolocation
    */
    function handleGeolocationListenerResult(id: number, geolocation: Geolocation): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Geolocation} geolocation
       @param {Adaptive.IGeolocationListenerWarning} warning
    */
    function handleGeolocationListenerWarning(id: number, geolocation: Geolocation, warning: IGeolocationListenerWarning): void;
    /**
       @class Adaptive.GeolocationListener
       @extends Adaptive.BaseListener
    */
    class GeolocationListener extends BaseListener implements IGeolocationListener {
        /**
           @private
           @property
        */
        onErrorFunction: (error: IGeolocationListenerError) => void;
        /**
           @private
           @property
        */
        onResultFunction: (geolocation: Geolocation) => void;
        /**
           @private
           @property
        */
        onWarningFunction: (geolocation: Geolocation, warning: IGeolocationListenerWarning) => void;
        /**
           @method constructor
           Constructor with anonymous handler functions for listener.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IGeolocationListenerError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.Geolocation
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.Geolocation, Adaptive.IGeolocationListenerWarning
        */
        constructor(onErrorFunction: (error: IGeolocationListenerError) => void, onResultFunction: (geolocation: Geolocation) => void, onWarningFunction: (geolocation: Geolocation, warning: IGeolocationListenerWarning) => void);
        /**
           @method
           No data received - error condition, not authorized or hardware not available.
           @param {Adaptive.IGeolocationListenerError} error error Type of error encountered during reading.
           @since v2.0
        */
        onError(error: IGeolocationListenerError): void;
        /**
           @method
           Correct data received.
           @param {Adaptive.Geolocation} geolocation geolocation Geolocation Bean
           @since v2.0
        */
        onResult(geolocation: Geolocation): void;
        /**
           @method
           Data received with warning - ie. HighDoP
           @param {Adaptive.Geolocation} geolocation geolocation Geolocation Bean
           @param {Adaptive.IGeolocationListenerWarning} warning warning     Type of warning encountered during reading.
           @since v2.0
        */
        onWarning(geolocation: Geolocation, warning: IGeolocationListenerWarning): void;
    }
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
    /**
       @property {Adaptive.Dictionary} registeredNetworkStatusListener
       @member Adaptive
       @private
       NetworkStatusListener control dictionary.
    */
    var registeredNetworkStatusListener: Dictionary<INetworkStatusListener>;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.INetworkStatusListenerError} error
    */
    function handleNetworkStatusListenerError(id: number, error: INetworkStatusListenerError): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.NetworkEvent} networkEvent
    */
    function handleNetworkStatusListenerResult(id: number, networkEvent: NetworkEvent): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.NetworkEvent} networkEvent
       @param {Adaptive.INetworkStatusListenerWarning} warning
    */
    function handleNetworkStatusListenerWarning(id: number, networkEvent: NetworkEvent, warning: INetworkStatusListenerWarning): void;
    /**
       @class Adaptive.NetworkStatusListener
       @extends Adaptive.BaseListener
    */
    class NetworkStatusListener extends BaseListener implements INetworkStatusListener {
        /**
           @private
           @property
        */
        onErrorFunction: (error: INetworkStatusListenerError) => void;
        /**
           @private
           @property
        */
        onResultFunction: (networkEvent: NetworkEvent) => void;
        /**
           @private
           @property
        */
        onWarningFunction: (networkEvent: NetworkEvent, warning: INetworkStatusListenerWarning) => void;
        /**
           @method constructor
           Constructor with anonymous handler functions for listener.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.INetworkStatusListenerError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.NetworkEvent
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.NetworkEvent, Adaptive.INetworkStatusListenerWarning
        */
        constructor(onErrorFunction: (error: INetworkStatusListenerError) => void, onResultFunction: (networkEvent: NetworkEvent) => void, onWarningFunction: (networkEvent: NetworkEvent, warning: INetworkStatusListenerWarning) => void);
        /**
           @method
           No data received - error condition, not authorized or hardware not available.
           @param {Adaptive.INetworkStatusListenerError} error error Type of error encountered during reading.
           @since v2.0
        */
        onError(error: INetworkStatusListenerError): void;
        /**
           @method
           Called when network connection changes somehow.
           @param {Adaptive.NetworkEvent} networkEvent networkEvent Change to this network.
           @since v2.0
        */
        onResult(networkEvent: NetworkEvent): void;
        /**
           @method
           Status received with warning
           @param {Adaptive.NetworkEvent} networkEvent networkEvent Change to this network.
           @param {Adaptive.INetworkStatusListenerWarning} warning warning Type of warning encountered during reading.
           @since v2.0
        */
        onWarning(networkEvent: NetworkEvent, warning: INetworkStatusListenerWarning): void;
    }
    /**
       @class Adaptive.BaseCallback
    */
    class BaseCallback implements IBaseCallback {
        /**
           @property {number}
           Unique id of callback.
        */
        id: number;
        /**
           @property {Adaptive.IAdaptiveRPGroup}
           Group of API.
        */
        apiGroup: IAdaptiveRPGroup;
        /**
           @method constructor
           Constructor with callback id.

           @param {number} id  The id of the callback.
        */
        constructor(id: number);
        /**
           @method
           @return {number}
           Get the callback id.
        */
        getId(): number;
        /**
           @method
           @return {Adaptive.IAdaptiveRPGroup}
           Return the API group for the given interface.
        */
        getAPIGroup(): IAdaptiveRPGroup;
        /**
           @method
           Return the API version for the given interface.

           @return {string}
           The version of the API.
        */
        getAPIVersion(): string;
    }
    /**
       @property {Adaptive.Dictionary} registeredContactPhotoResultCallback
       @member Adaptive
       @private
       ContactPhotoResultCallback control dictionary.
    */
    var registeredContactPhotoResultCallback: Dictionary<IContactPhotoResultCallback>;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IContactPhotoResultCallbackError} error
    */
    function handleContactPhotoResultCallbackError(id: number, error: IContactPhotoResultCallbackError): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {number[]} contactPhoto
    */
    function handleContactPhotoResultCallbackResult(id: number, contactPhoto: Array<number>): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {number[]} contactPhoto
       @param {Adaptive.IContactPhotoResultCallbackWarning} warning
    */
    function handleContactPhotoResultCallbackWarning(id: number, contactPhoto: Array<number>, warning: IContactPhotoResultCallbackWarning): void;
    /**
       @class Adaptive.ContactPhotoResultCallback
       @extends Adaptive.BaseCallback
    */
    class ContactPhotoResultCallback extends BaseCallback implements IContactPhotoResultCallback {
        /**
           @private
           @property
        */
        onErrorFunction: (error: IContactPhotoResultCallbackError) => void;
        /**
           @private
           @property
        */
        onResultFunction: (contactPhoto: Array<number>) => void;
        /**
           @private
           @property
        */
        onWarningFunction: (contactPhoto: Array<number>, warning: IContactPhotoResultCallbackWarning) => void;
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IContactPhotoResultCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: number[]
           @param {Function} onWarningFunction Function receiving parameters of type: number[], Adaptive.IContactPhotoResultCallbackWarning
        */
        constructor(onErrorFunction: (error: IContactPhotoResultCallbackError) => void, onResultFunction: (contactPhoto: Array<number>) => void, onWarningFunction: (contactPhoto: Array<number>, warning: IContactPhotoResultCallbackWarning) => void);
        /**
           @method
           This method is called on Error
           @param {Adaptive.IContactPhotoResultCallbackError} error error returned by the platform
           @since v2.0
        */
        onError(error: IContactPhotoResultCallbackError): void;
        /**
           @method
           This method is called on Result
           @param {number[]} contactPhoto contactPhoto returned by the platform
           @since v2.0
        */
        onResult(contactPhoto: Array<number>): void;
        /**
           @method
           This method is called on Warning
           @param {number[]} contactPhoto contactPhoto returned by the platform
           @param {Adaptive.IContactPhotoResultCallbackWarning} warning warning      returned by the platform
           @since v2.0
        */
        onWarning(contactPhoto: Array<number>, warning: IContactPhotoResultCallbackWarning): void;
    }
    /**
       @property {Adaptive.Dictionary} registeredContactResultCallback
       @member Adaptive
       @private
       ContactResultCallback control dictionary.
    */
    var registeredContactResultCallback: Dictionary<IContactResultCallback>;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IContactResultCallbackError} error
    */
    function handleContactResultCallbackError(id: number, error: IContactResultCallbackError): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Contact[]} contacts
    */
    function handleContactResultCallbackResult(id: number, contacts: Array<Contact>): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Contact[]} contacts
       @param {Adaptive.IContactResultCallbackWarning} warning
    */
    function handleContactResultCallbackWarning(id: number, contacts: Array<Contact>, warning: IContactResultCallbackWarning): void;
    /**
       @class Adaptive.ContactResultCallback
       @extends Adaptive.BaseCallback
    */
    class ContactResultCallback extends BaseCallback implements IContactResultCallback {
        /**
           @private
           @property
        */
        onErrorFunction: (error: IContactResultCallbackError) => void;
        /**
           @private
           @property
        */
        onResultFunction: (contacts: Array<Contact>) => void;
        /**
           @private
           @property
        */
        onWarningFunction: (contacts: Array<Contact>, warning: IContactResultCallbackWarning) => void;
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IContactResultCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.Contact[]
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.Contact[], Adaptive.IContactResultCallbackWarning
        */
        constructor(onErrorFunction: (error: IContactResultCallbackError) => void, onResultFunction: (contacts: Array<Contact>) => void, onWarningFunction: (contacts: Array<Contact>, warning: IContactResultCallbackWarning) => void);
        /**
           @method
           This method is called on Error
           @param {Adaptive.IContactResultCallbackError} error error returned by the platform
           @since v2.0
        */
        onError(error: IContactResultCallbackError): void;
        /**
           @method
           This method is called on Result
           @param {Adaptive.Contact[]} contacts contacts returned by the platform
           @since v2.0
        */
        onResult(contacts: Array<Contact>): void;
        /**
           @method
           This method is called on Warning
           @param {Adaptive.Contact[]} contacts contacts returned by the platform
           @param {Adaptive.IContactResultCallbackWarning} warning warning  returned by the platform
           @since v2.0
        */
        onWarning(contacts: Array<Contact>, warning: IContactResultCallbackWarning): void;
    }
    /**
       @property {Adaptive.Dictionary} registeredDatabaseResultCallback
       @member Adaptive
       @private
       DatabaseResultCallback control dictionary.
    */
    var registeredDatabaseResultCallback: Dictionary<IDatabaseResultCallback>;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IDatabaseResultCallbackError} error
    */
    function handleDatabaseResultCallbackError(id: number, error: IDatabaseResultCallbackError): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Database} database
    */
    function handleDatabaseResultCallbackResult(id: number, database: Database): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.Database} database
       @param {Adaptive.IDatabaseResultCallbackWarning} warning
    */
    function handleDatabaseResultCallbackWarning(id: number, database: Database, warning: IDatabaseResultCallbackWarning): void;
    /**
       @class Adaptive.DatabaseResultCallback
       @extends Adaptive.BaseCallback
    */
    class DatabaseResultCallback extends BaseCallback implements IDatabaseResultCallback {
        /**
           @private
           @property
        */
        onErrorFunction: (error: IDatabaseResultCallbackError) => void;
        /**
           @private
           @property
        */
        onResultFunction: (database: Database) => void;
        /**
           @private
           @property
        */
        onWarningFunction: (database: Database, warning: IDatabaseResultCallbackWarning) => void;
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IDatabaseResultCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.Database
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.Database, Adaptive.IDatabaseResultCallbackWarning
        */
        constructor(onErrorFunction: (error: IDatabaseResultCallbackError) => void, onResultFunction: (database: Database) => void, onWarningFunction: (database: Database, warning: IDatabaseResultCallbackWarning) => void);
        /**
           @method
           Result callback for error responses
           @param {Adaptive.IDatabaseResultCallbackError} error error Returned error
           @since v2.0
        */
        onError(error: IDatabaseResultCallbackError): void;
        /**
           @method
           Result callback for correct responses
           @param {Adaptive.Database} database database Returns the database
           @since v2.0
        */
        onResult(database: Database): void;
        /**
           @method
           Result callback for warning responses
           @param {Adaptive.Database} database database Returns the database
           @param {Adaptive.IDatabaseResultCallbackWarning} warning warning  Returned Warning
           @since v2.0
        */
        onWarning(database: Database, warning: IDatabaseResultCallbackWarning): void;
    }
    /**
       @property {Adaptive.Dictionary} registeredDatabaseTableResultCallback
       @member Adaptive
       @private
       DatabaseTableResultCallback control dictionary.
    */
    var registeredDatabaseTableResultCallback: Dictionary<IDatabaseTableResultCallback>;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IDatabaseTableResultCallbackError} error
    */
    function handleDatabaseTableResultCallbackError(id: number, error: IDatabaseTableResultCallbackError): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.DatabaseTable} databaseTable
    */
    function handleDatabaseTableResultCallbackResult(id: number, databaseTable: DatabaseTable): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.DatabaseTable} databaseTable
       @param {Adaptive.IDatabaseTableResultCallbackWarning} warning
    */
    function handleDatabaseTableResultCallbackWarning(id: number, databaseTable: DatabaseTable, warning: IDatabaseTableResultCallbackWarning): void;
    /**
       @class Adaptive.DatabaseTableResultCallback
       @extends Adaptive.BaseCallback
    */
    class DatabaseTableResultCallback extends BaseCallback implements IDatabaseTableResultCallback {
        /**
           @private
           @property
        */
        onErrorFunction: (error: IDatabaseTableResultCallbackError) => void;
        /**
           @private
           @property
        */
        onResultFunction: (databaseTable: DatabaseTable) => void;
        /**
           @private
           @property
        */
        onWarningFunction: (databaseTable: DatabaseTable, warning: IDatabaseTableResultCallbackWarning) => void;
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IDatabaseTableResultCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.DatabaseTable
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.DatabaseTable, Adaptive.IDatabaseTableResultCallbackWarning
        */
        constructor(onErrorFunction: (error: IDatabaseTableResultCallbackError) => void, onResultFunction: (databaseTable: DatabaseTable) => void, onWarningFunction: (databaseTable: DatabaseTable, warning: IDatabaseTableResultCallbackWarning) => void);
        /**
           @method
           Result callback for error responses
           @param {Adaptive.IDatabaseTableResultCallbackError} error error Returned error
           @since v2.0
        */
        onError(error: IDatabaseTableResultCallbackError): void;
        /**
           @method
           Result callback for correct responses
           @param {Adaptive.DatabaseTable} databaseTable databaseTable Returns the databaseTable
           @since v2.0
        */
        onResult(databaseTable: DatabaseTable): void;
        /**
           @method
           Result callback for warning responses
           @param {Adaptive.DatabaseTable} databaseTable databaseTable Returns the databaseTable
           @param {Adaptive.IDatabaseTableResultCallbackWarning} warning warning       Returned Warning
           @since v2.0
        */
        onWarning(databaseTable: DatabaseTable, warning: IDatabaseTableResultCallbackWarning): void;
    }
    /**
       @property {Adaptive.Dictionary} registeredFileDataLoadResultCallback
       @member Adaptive
       @private
       FileDataLoadResultCallback control dictionary.
    */
    var registeredFileDataLoadResultCallback: Dictionary<IFileDataLoadResultCallback>;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IFileDataLoadResultCallbackError} error
    */
    function handleFileDataLoadResultCallbackError(id: number, error: IFileDataLoadResultCallbackError): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {number[]} data
    */
    function handleFileDataLoadResultCallbackResult(id: number, data: Array<number>): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {number[]} data
       @param {Adaptive.IFileDataLoadResultCallbackWarning} warning
    */
    function handleFileDataLoadResultCallbackWarning(id: number, data: Array<number>, warning: IFileDataLoadResultCallbackWarning): void;
    /**
       @class Adaptive.FileDataLoadResultCallback
       @extends Adaptive.BaseCallback
    */
    class FileDataLoadResultCallback extends BaseCallback implements IFileDataLoadResultCallback {
        /**
           @private
           @property
        */
        onErrorFunction: (error: IFileDataLoadResultCallbackError) => void;
        /**
           @private
           @property
        */
        onResultFunction: (data: Array<number>) => void;
        /**
           @private
           @property
        */
        onWarningFunction: (data: Array<number>, warning: IFileDataLoadResultCallbackWarning) => void;
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IFileDataLoadResultCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: number[]
           @param {Function} onWarningFunction Function receiving parameters of type: number[], Adaptive.IFileDataLoadResultCallbackWarning
        */
        constructor(onErrorFunction: (error: IFileDataLoadResultCallbackError) => void, onResultFunction: (data: Array<number>) => void, onWarningFunction: (data: Array<number>, warning: IFileDataLoadResultCallbackWarning) => void);
        /**
           @method
           Error processing data retrieval/storage operation.
           @param {Adaptive.IFileDataLoadResultCallbackError} error error Error condition encountered.
           @since v2.0
        */
        onError(error: IFileDataLoadResultCallbackError): void;
        /**
           @method
           Result of data retrieval operation.
           @param {number[]} data data Data loaded.
           @since v2.0
        */
        onResult(data: Array<number>): void;
        /**
           @method
           Result with warning of data retrieval/storage operation.
           @param {number[]} data data    File being loaded.
           @param {Adaptive.IFileDataLoadResultCallbackWarning} warning warning Warning condition encountered.
           @since v2.0
        */
        onWarning(data: Array<number>, warning: IFileDataLoadResultCallbackWarning): void;
    }
    /**
       @property {Adaptive.Dictionary} registeredFileDataStoreResultCallback
       @member Adaptive
       @private
       FileDataStoreResultCallback control dictionary.
    */
    var registeredFileDataStoreResultCallback: Dictionary<IFileDataStoreResultCallback>;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IFileDataStoreResultCallbackError} error
    */
    function handleFileDataStoreResultCallbackError(id: number, error: IFileDataStoreResultCallbackError): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.FileDescriptor} file
    */
    function handleFileDataStoreResultCallbackResult(id: number, file: FileDescriptor): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.FileDescriptor} file
       @param {Adaptive.IFileDataStoreResultCallbackWarning} warning
    */
    function handleFileDataStoreResultCallbackWarning(id: number, file: FileDescriptor, warning: IFileDataStoreResultCallbackWarning): void;
    /**
       @class Adaptive.FileDataStoreResultCallback
       @extends Adaptive.BaseCallback
    */
    class FileDataStoreResultCallback extends BaseCallback implements IFileDataStoreResultCallback {
        /**
           @private
           @property
        */
        onErrorFunction: (error: IFileDataStoreResultCallbackError) => void;
        /**
           @private
           @property
        */
        onResultFunction: (file: FileDescriptor) => void;
        /**
           @private
           @property
        */
        onWarningFunction: (file: FileDescriptor, warning: IFileDataStoreResultCallbackWarning) => void;
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IFileDataStoreResultCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.FileDescriptor
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.FileDescriptor, Adaptive.IFileDataStoreResultCallbackWarning
        */
        constructor(onErrorFunction: (error: IFileDataStoreResultCallbackError) => void, onResultFunction: (file: FileDescriptor) => void, onWarningFunction: (file: FileDescriptor, warning: IFileDataStoreResultCallbackWarning) => void);
        /**
           @method
           Error processing data retrieval/storage operation.
           @param {Adaptive.IFileDataStoreResultCallbackError} error error Error condition encountered.
           @since v2.0
        */
        onError(error: IFileDataStoreResultCallbackError): void;
        /**
           @method
           Result of data storage operation.
           @param {Adaptive.FileDescriptor} file file File reference to stored data.
           @since v2.0
        */
        onResult(file: FileDescriptor): void;
        /**
           @method
           Result with warning of data retrieval/storage operation.
           @param {Adaptive.FileDescriptor} file file    File being loaded/stored.
           @param {Adaptive.IFileDataStoreResultCallbackWarning} warning warning Warning condition encountered.
           @since v2.0
        */
        onWarning(file: FileDescriptor, warning: IFileDataStoreResultCallbackWarning): void;
    }
    /**
       @property {Adaptive.Dictionary} registeredFileListResultCallback
       @member Adaptive
       @private
       FileListResultCallback control dictionary.
    */
    var registeredFileListResultCallback: Dictionary<IFileListResultCallback>;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IFileListResultCallbackError} error
    */
    function handleFileListResultCallbackError(id: number, error: IFileListResultCallbackError): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.FileDescriptor[]} files
    */
    function handleFileListResultCallbackResult(id: number, files: Array<FileDescriptor>): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.FileDescriptor[]} files
       @param {Adaptive.IFileListResultCallbackWarning} warning
    */
    function handleFileListResultCallbackWarning(id: number, files: Array<FileDescriptor>, warning: IFileListResultCallbackWarning): void;
    /**
       @class Adaptive.FileListResultCallback
       @extends Adaptive.BaseCallback
    */
    class FileListResultCallback extends BaseCallback implements IFileListResultCallback {
        /**
           @private
           @property
        */
        onErrorFunction: (error: IFileListResultCallbackError) => void;
        /**
           @private
           @property
        */
        onResultFunction: (files: Array<FileDescriptor>) => void;
        /**
           @private
           @property
        */
        onWarningFunction: (files: Array<FileDescriptor>, warning: IFileListResultCallbackWarning) => void;
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IFileListResultCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.FileDescriptor[]
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.FileDescriptor[], Adaptive.IFileListResultCallbackWarning
        */
        constructor(onErrorFunction: (error: IFileListResultCallbackError) => void, onResultFunction: (files: Array<FileDescriptor>) => void, onWarningFunction: (files: Array<FileDescriptor>, warning: IFileListResultCallbackWarning) => void);
        /**
           @method
           On error result of a file operation.
           @param {Adaptive.IFileListResultCallbackError} error error Error processing the request.
           @since v2.0
        */
        onError(error: IFileListResultCallbackError): void;
        /**
           @method
           On correct result of a file operation.
           @param {Adaptive.FileDescriptor[]} files files Array of resulting files/folders.
           @since v2.0
        */
        onResult(files: Array<FileDescriptor>): void;
        /**
           @method
           On partial result of a file operation, containing a warning.
           @param {Adaptive.FileDescriptor[]} files files   Array of resulting files/folders.
           @param {Adaptive.IFileListResultCallbackWarning} warning warning Warning condition encountered.
           @since v2.0
        */
        onWarning(files: Array<FileDescriptor>, warning: IFileListResultCallbackWarning): void;
    }
    /**
       @property {Adaptive.Dictionary} registeredFileResultCallback
       @member Adaptive
       @private
       FileResultCallback control dictionary.
    */
    var registeredFileResultCallback: Dictionary<IFileResultCallback>;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IFileResultCallbackError} error
    */
    function handleFileResultCallbackError(id: number, error: IFileResultCallbackError): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.FileDescriptor} storageFile
    */
    function handleFileResultCallbackResult(id: number, storageFile: FileDescriptor): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.FileDescriptor} file
       @param {Adaptive.IFileResultCallbackWarning} warning
    */
    function handleFileResultCallbackWarning(id: number, file: FileDescriptor, warning: IFileResultCallbackWarning): void;
    /**
       @class Adaptive.FileResultCallback
       @extends Adaptive.BaseCallback
    */
    class FileResultCallback extends BaseCallback implements IFileResultCallback {
        /**
           @private
           @property
        */
        onErrorFunction: (error: IFileResultCallbackError) => void;
        /**
           @private
           @property
        */
        onResultFunction: (storageFile: FileDescriptor) => void;
        /**
           @private
           @property
        */
        onWarningFunction: (file: FileDescriptor, warning: IFileResultCallbackWarning) => void;
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IFileResultCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.FileDescriptor
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.FileDescriptor, Adaptive.IFileResultCallbackWarning
        */
        constructor(onErrorFunction: (error: IFileResultCallbackError) => void, onResultFunction: (storageFile: FileDescriptor) => void, onWarningFunction: (file: FileDescriptor, warning: IFileResultCallbackWarning) => void);
        /**
           @method
           On error result of a file operation.
           @param {Adaptive.IFileResultCallbackError} error error Error processing the request.
           @since v2.0
        */
        onError(error: IFileResultCallbackError): void;
        /**
           @method
           On correct result of a file operation.
           @param {Adaptive.FileDescriptor} storageFile storageFile Reference to the resulting file.
           @since v2.0
        */
        onResult(storageFile: FileDescriptor): void;
        /**
           @method
           On partial result of a file operation, containing a warning.
           @param {Adaptive.FileDescriptor} file file    Reference to the offending file.
           @param {Adaptive.IFileResultCallbackWarning} warning warning Warning processing the request.
           @since v2.0
        */
        onWarning(file: FileDescriptor, warning: IFileResultCallbackWarning): void;
    }
    /**
       @property {Adaptive.Dictionary} registeredMessagingCallback
       @member Adaptive
       @private
       MessagingCallback control dictionary.
    */
    var registeredMessagingCallback: Dictionary<IMessagingCallback>;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IMessagingCallbackError} error
    */
    function handleMessagingCallbackError(id: number, error: IMessagingCallbackError): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {boolean} success
    */
    function handleMessagingCallbackResult(id: number, success: boolean): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {boolean} success
       @param {Adaptive.IMessagingCallbackWarning} warning
    */
    function handleMessagingCallbackWarning(id: number, success: boolean, warning: IMessagingCallbackWarning): void;
    /**
       @class Adaptive.MessagingCallback
       @extends Adaptive.BaseCallback
    */
    class MessagingCallback extends BaseCallback implements IMessagingCallback {
        /**
           @private
           @property
        */
        onErrorFunction: (error: IMessagingCallbackError) => void;
        /**
           @private
           @property
        */
        onResultFunction: (success: boolean) => void;
        /**
           @private
           @property
        */
        onWarningFunction: (success: boolean, warning: IMessagingCallbackWarning) => void;
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IMessagingCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: boolean
           @param {Function} onWarningFunction Function receiving parameters of type: boolean, Adaptive.IMessagingCallbackWarning
        */
        constructor(onErrorFunction: (error: IMessagingCallbackError) => void, onResultFunction: (success: boolean) => void, onWarningFunction: (success: boolean, warning: IMessagingCallbackWarning) => void);
        /**
           @method
           This method is called on Error
           @param {Adaptive.IMessagingCallbackError} error error returned by the platform
           @since v2.0
        */
        onError(error: IMessagingCallbackError): void;
        /**
           @method
           This method is called on Result
           @param {boolean} success success true if sent;false otherwise
           @since v2.0
        */
        onResult(success: boolean): void;
        /**
           @method
           This method is called on Warning
           @param {boolean} success success true if sent;false otherwise
           @param {Adaptive.IMessagingCallbackWarning} warning warning returned by the platform
           @since v2.0
        */
        onWarning(success: boolean, warning: IMessagingCallbackWarning): void;
    }
    /**
       @property {Adaptive.Dictionary} registeredNetworkReachabilityCallback
       @member Adaptive
       @private
       NetworkReachabilityCallback control dictionary.
    */
    var registeredNetworkReachabilityCallback: Dictionary<INetworkReachabilityCallback>;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.INetworkReachabilityCallbackError} error
    */
    function handleNetworkReachabilityCallbackError(id: number, error: INetworkReachabilityCallbackError): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {boolean} reachable
    */
    function handleNetworkReachabilityCallbackResult(id: number, reachable: boolean): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {boolean} reachable
       @param {Adaptive.INetworkReachabilityCallbackWarning} warning
    */
    function handleNetworkReachabilityCallbackWarning(id: number, reachable: boolean, warning: INetworkReachabilityCallbackWarning): void;
    /**
       @class Adaptive.NetworkReachabilityCallback
       @extends Adaptive.BaseCallback
    */
    class NetworkReachabilityCallback extends BaseCallback implements INetworkReachabilityCallback {
        /**
           @private
           @property
        */
        onErrorFunction: (error: INetworkReachabilityCallbackError) => void;
        /**
           @private
           @property
        */
        onResultFunction: (reachable: boolean) => void;
        /**
           @private
           @property
        */
        onWarningFunction: (reachable: boolean, warning: INetworkReachabilityCallbackWarning) => void;
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.INetworkReachabilityCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: boolean
           @param {Function} onWarningFunction Function receiving parameters of type: boolean, Adaptive.INetworkReachabilityCallbackWarning
        */
        constructor(onErrorFunction: (error: INetworkReachabilityCallbackError) => void, onResultFunction: (reachable: boolean) => void, onWarningFunction: (reachable: boolean, warning: INetworkReachabilityCallbackWarning) => void);
        /**
           @method
           No data received - error condition, not authorized .
           @param {Adaptive.INetworkReachabilityCallbackError} error error Error value
           @since v2.0
        */
        onError(error: INetworkReachabilityCallbackError): void;
        /**
           @method
           Correct data received.
           @param {boolean} reachable reachable Indicates if the host is reachable
           @since v2.0
        */
        onResult(reachable: boolean): void;
        /**
           @method
           Data received with warning - ie Found entries with existing key and values have been overriden
           @param {boolean} reachable reachable Indicates if the host is reachable
           @param {Adaptive.INetworkReachabilityCallbackWarning} warning warning   Warning value
           @since v2.0
        */
        onWarning(reachable: boolean, warning: INetworkReachabilityCallbackWarning): void;
    }
    /**
       @property {Adaptive.Dictionary} registeredSecurityResultCallback
       @member Adaptive
       @private
       SecurityResultCallback control dictionary.
    */
    var registeredSecurityResultCallback: Dictionary<ISecurityResultCallback>;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.ISecurityResultCallbackError} error
    */
    function handleSecurityResultCallbackError(id: number, error: ISecurityResultCallbackError): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.SecureKeyPair[]} keyValues
    */
    function handleSecurityResultCallbackResult(id: number, keyValues: Array<SecureKeyPair>): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.SecureKeyPair[]} keyValues
       @param {Adaptive.ISecurityResultCallbackWarning} warning
    */
    function handleSecurityResultCallbackWarning(id: number, keyValues: Array<SecureKeyPair>, warning: ISecurityResultCallbackWarning): void;
    /**
       @class Adaptive.SecurityResultCallback
       @extends Adaptive.BaseCallback
    */
    class SecurityResultCallback extends BaseCallback implements ISecurityResultCallback {
        /**
           @private
           @property
        */
        onErrorFunction: (error: ISecurityResultCallbackError) => void;
        /**
           @private
           @property
        */
        onResultFunction: (keyValues: Array<SecureKeyPair>) => void;
        /**
           @private
           @property
        */
        onWarningFunction: (keyValues: Array<SecureKeyPair>, warning: ISecurityResultCallbackWarning) => void;
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.ISecurityResultCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.SecureKeyPair[]
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.SecureKeyPair[], Adaptive.ISecurityResultCallbackWarning
        */
        constructor(onErrorFunction: (error: ISecurityResultCallbackError) => void, onResultFunction: (keyValues: Array<SecureKeyPair>) => void, onWarningFunction: (keyValues: Array<SecureKeyPair>, warning: ISecurityResultCallbackWarning) => void);
        /**
           @method
           No data received - error condition, not authorized .
           @param {Adaptive.ISecurityResultCallbackError} error error Error values
           @since v2.0
        */
        onError(error: ISecurityResultCallbackError): void;
        /**
           @method
           Correct data received.
           @param {Adaptive.SecureKeyPair[]} keyValues keyValues key and values
           @since v2.0
        */
        onResult(keyValues: Array<SecureKeyPair>): void;
        /**
           @method
           Data received with warning - ie Found entries with existing key and values have been overriden
           @param {Adaptive.SecureKeyPair[]} keyValues keyValues key and values
           @param {Adaptive.ISecurityResultCallbackWarning} warning warning   Warning values
           @since v2.0
        */
        onWarning(keyValues: Array<SecureKeyPair>, warning: ISecurityResultCallbackWarning): void;
    }
    /**
       @property {Adaptive.Dictionary} registeredServiceResultCallback
       @member Adaptive
       @private
       ServiceResultCallback control dictionary.
    */
    var registeredServiceResultCallback: Dictionary<IServiceResultCallback>;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.IServiceResultCallbackError} error
    */
    function handleServiceResultCallbackError(id: number, error: IServiceResultCallbackError): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.ServiceResponse} response
    */
    function handleServiceResultCallbackResult(id: number, response: ServiceResponse): void;
    /**
       @method
       @private
       @member Adaptive
       @param {number} id
       @param {Adaptive.ServiceResponse} response
       @param {Adaptive.IServiceResultCallbackWarning} warning
    */
    function handleServiceResultCallbackWarning(id: number, response: ServiceResponse, warning: IServiceResultCallbackWarning): void;
    /**
       @class Adaptive.ServiceResultCallback
       @extends Adaptive.BaseCallback
    */
    class ServiceResultCallback extends BaseCallback implements IServiceResultCallback {
        /**
           @private
           @property
        */
        onErrorFunction: (error: IServiceResultCallbackError) => void;
        /**
           @private
           @property
        */
        onResultFunction: (response: ServiceResponse) => void;
        /**
           @private
           @property
        */
        onWarningFunction: (response: ServiceResponse, warning: IServiceResultCallbackWarning) => void;
        /**
           @method constructor
           Constructor with anonymous handler functions for callback.

           @param {Function} onErrorFunction Function receiving parameters of type: Adaptive.IServiceResultCallbackError
           @param {Function} onResultFunction Function receiving parameters of type: Adaptive.ServiceResponse
           @param {Function} onWarningFunction Function receiving parameters of type: Adaptive.ServiceResponse, Adaptive.IServiceResultCallbackWarning
        */
        constructor(onErrorFunction: (error: IServiceResultCallbackError) => void, onResultFunction: (response: ServiceResponse) => void, onWarningFunction: (response: ServiceResponse, warning: IServiceResultCallbackWarning) => void);
        /**
           @method
           This method is called on Error
           @param {Adaptive.IServiceResultCallbackError} error error returned by the platform
           @since v2.0
        */
        onError(error: IServiceResultCallbackError): void;
        /**
           @method
           This method is called on Result
           @param {Adaptive.ServiceResponse} response response data
           @since v2.0
        */
        onResult(response: ServiceResponse): void;
        /**
           @method
           This method is called on Warning
           @param {Adaptive.ServiceResponse} response response data
           @param {Adaptive.IServiceResultCallbackWarning} warning warning  returned by the platform
           @since v2.0
        */
        onWarning(response: ServiceResponse, warning: IServiceResultCallbackWarning): void;
    }
    /**
       @class Adaptive.BaseApplicationBridge
       Base application for Application purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    class BaseApplicationBridge implements IBaseApplication {
        /**
           @property {Adaptive.IAdaptiveRPGroup} apiGroup
           Group of API.
        */
        apiGroup: IAdaptiveRPGroup;
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Return the API group for the given interface.
           @return {Adaptive.IAdaptiveRPGroup}
        */
        getAPIGroup(): IAdaptiveRPGroup;
        /**
           @method
           Return the API version for the given interface.

           @return {string} The version of the API.
        */
        getAPIVersion(): string;
    }
    /**
       @class Adaptive.BaseCommerceBridge
       Base application for Commerce purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    class BaseCommerceBridge implements IBaseCommerce {
        /**
           @property {Adaptive.IAdaptiveRPGroup} apiGroup
           Group of API.
        */
        apiGroup: IAdaptiveRPGroup;
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Return the API group for the given interface.
           @return {Adaptive.IAdaptiveRPGroup}
        */
        getAPIGroup(): IAdaptiveRPGroup;
        /**
           @method
           Return the API version for the given interface.

           @return {string} The version of the API.
        */
        getAPIVersion(): string;
    }
    /**
       @class Adaptive.BaseCommunicationBridge
       Base application for Communication purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    class BaseCommunicationBridge implements IBaseCommunication {
        /**
           @property {Adaptive.IAdaptiveRPGroup} apiGroup
           Group of API.
        */
        apiGroup: IAdaptiveRPGroup;
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Return the API group for the given interface.
           @return {Adaptive.IAdaptiveRPGroup}
        */
        getAPIGroup(): IAdaptiveRPGroup;
        /**
           @method
           Return the API version for the given interface.

           @return {string} The version of the API.
        */
        getAPIVersion(): string;
    }
    /**
       @class Adaptive.BaseDataBridge
       Base application for Data purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    class BaseDataBridge implements IBaseData {
        /**
           @property {Adaptive.IAdaptiveRPGroup} apiGroup
           Group of API.
        */
        apiGroup: IAdaptiveRPGroup;
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Return the API group for the given interface.
           @return {Adaptive.IAdaptiveRPGroup}
        */
        getAPIGroup(): IAdaptiveRPGroup;
        /**
           @method
           Return the API version for the given interface.

           @return {string} The version of the API.
        */
        getAPIVersion(): string;
    }
    /**
       @class Adaptive.BaseMediaBridge
       Base application for Media purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    class BaseMediaBridge implements IBaseMedia {
        /**
           @property {Adaptive.IAdaptiveRPGroup} apiGroup
           Group of API.
        */
        apiGroup: IAdaptiveRPGroup;
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Return the API group for the given interface.
           @return {Adaptive.IAdaptiveRPGroup}
        */
        getAPIGroup(): IAdaptiveRPGroup;
        /**
           @method
           Return the API version for the given interface.

           @return {string} The version of the API.
        */
        getAPIVersion(): string;
    }
    /**
       @class Adaptive.BaseNotificationBridge
       Base application for Notification purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    class BaseNotificationBridge implements IBaseNotification {
        /**
           @property {Adaptive.IAdaptiveRPGroup} apiGroup
           Group of API.
        */
        apiGroup: IAdaptiveRPGroup;
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Return the API group for the given interface.
           @return {Adaptive.IAdaptiveRPGroup}
        */
        getAPIGroup(): IAdaptiveRPGroup;
        /**
           @method
           Return the API version for the given interface.

           @return {string} The version of the API.
        */
        getAPIVersion(): string;
    }
    /**
       @class Adaptive.BasePIMBridge
       Base application for PIM purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    class BasePIMBridge implements IBasePIM {
        /**
           @property {Adaptive.IAdaptiveRPGroup} apiGroup
           Group of API.
        */
        apiGroup: IAdaptiveRPGroup;
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Return the API group for the given interface.
           @return {Adaptive.IAdaptiveRPGroup}
        */
        getAPIGroup(): IAdaptiveRPGroup;
        /**
           @method
           Return the API version for the given interface.

           @return {string} The version of the API.
        */
        getAPIVersion(): string;
    }
    /**
       @class Adaptive.BaseReaderBridge
       Base application for Reader purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    class BaseReaderBridge implements IBaseReader {
        /**
           @property {Adaptive.IAdaptiveRPGroup} apiGroup
           Group of API.
        */
        apiGroup: IAdaptiveRPGroup;
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Return the API group for the given interface.
           @return {Adaptive.IAdaptiveRPGroup}
        */
        getAPIGroup(): IAdaptiveRPGroup;
        /**
           @method
           Return the API version for the given interface.

           @return {string} The version of the API.
        */
        getAPIVersion(): string;
    }
    /**
       @class Adaptive.BaseSecurityBridge
       Base application for Security purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    class BaseSecurityBridge implements IBaseSecurity {
        /**
           @property {Adaptive.IAdaptiveRPGroup} apiGroup
           Group of API.
        */
        apiGroup: IAdaptiveRPGroup;
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Return the API group for the given interface.
           @return {Adaptive.IAdaptiveRPGroup}
        */
        getAPIGroup(): IAdaptiveRPGroup;
        /**
           @method
           Return the API version for the given interface.

           @return {string} The version of the API.
        */
        getAPIVersion(): string;
    }
    /**
       @class Adaptive.BaseSensorBridge
       Base application for Sensor purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    class BaseSensorBridge implements IBaseSensor {
        /**
           @property {Adaptive.IAdaptiveRPGroup} apiGroup
           Group of API.
        */
        apiGroup: IAdaptiveRPGroup;
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Return the API group for the given interface.
           @return {Adaptive.IAdaptiveRPGroup}
        */
        getAPIGroup(): IAdaptiveRPGroup;
        /**
           @method
           Return the API version for the given interface.

           @return {string} The version of the API.
        */
        getAPIVersion(): string;
    }
    /**
       @class Adaptive.BaseSocialBridge
       Base application for Social purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    class BaseSocialBridge implements IBaseSocial {
        /**
           @property {Adaptive.IAdaptiveRPGroup} apiGroup
           Group of API.
        */
        apiGroup: IAdaptiveRPGroup;
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Return the API group for the given interface.
           @return {Adaptive.IAdaptiveRPGroup}
        */
        getAPIGroup(): IAdaptiveRPGroup;
        /**
           @method
           Return the API version for the given interface.

           @return {string} The version of the API.
        */
        getAPIVersion(): string;
    }
    /**
       @class Adaptive.BaseSystemBridge
       Base application for System purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    class BaseSystemBridge implements IBaseSystem {
        /**
           @property {Adaptive.IAdaptiveRPGroup} apiGroup
           Group of API.
        */
        apiGroup: IAdaptiveRPGroup;
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Return the API group for the given interface.
           @return {Adaptive.IAdaptiveRPGroup}
        */
        getAPIGroup(): IAdaptiveRPGroup;
        /**
           @method
           Return the API version for the given interface.

           @return {string} The version of the API.
        */
        getAPIVersion(): string;
    }
    /**
       @class Adaptive.BaseUIBridge
       Base application for UI purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    class BaseUIBridge implements IBaseUI {
        /**
           @property {Adaptive.IAdaptiveRPGroup} apiGroup
           Group of API.
        */
        apiGroup: IAdaptiveRPGroup;
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Return the API group for the given interface.
           @return {Adaptive.IAdaptiveRPGroup}
        */
        getAPIGroup(): IAdaptiveRPGroup;
        /**
           @method
           Return the API version for the given interface.

           @return {string} The version of the API.
        */
        getAPIVersion(): string;
    }
    /**
       @class Adaptive.BaseUtilBridge
       Base application for Utility purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    class BaseUtilBridge implements IBaseUtil {
        /**
           @property {Adaptive.IAdaptiveRPGroup} apiGroup
           Group of API.
        */
        apiGroup: IAdaptiveRPGroup;
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Return the API group for the given interface.
           @return {Adaptive.IAdaptiveRPGroup}
        */
        getAPIGroup(): IAdaptiveRPGroup;
        /**
           @method
           Return the API version for the given interface.

           @return {string} The version of the API.
        */
        getAPIVersion(): string;
    }
    /**
       @class Adaptive.AnalyticsBridge
       @extends Adaptive.BaseApplicationBridge
       Interface for Analytics purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    class AnalyticsBridge extends BaseApplicationBridge implements IAnalytics {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.GlobalizationBridge
       @extends Adaptive.BaseApplicationBridge
       Interface for Managing the Globalization results

       @author Francisco Javier Martin Bueno
       @since v2.0
    */
    class GlobalizationBridge extends BaseApplicationBridge implements IGlobalization {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Returns the default locale of the application defined in the configuration file

           @return {Adaptive.Locale} Default Locale of the application
           @since v2.0
        */
        getDefaultLocale(): Locale;
        /**
           @method
           List of supported locales for the application defined in the configuration file

           @return {Adaptive.Locale[]} List of locales
           @since v2.0
        */
        getLocaleSupportedDescriptors(): Array<Locale>;
        /**
           @method
           Gets the text/message corresponding to the given key and locale.

           @param {string} key key    to match text
           @param {Adaptive.Locale} locale locale The locale object to get localized message, or the locale desciptor ("language" or "language-country" two-letters ISO codes.
           @return {string} Localized text.
           @since v2.0
        */
        getResourceLiteral(key: string, locale: Locale): string;
        /**
           @method
           Gets the full application configured literals (key/message pairs) corresponding to the given locale.

           @param {Adaptive.Locale} locale locale The locale object to get localized message, or the locale desciptor ("language" or "language-country" two-letters ISO codes.
           @return {Adaptive.KeyPair[]} Localized texts in the form of an object.
           @since v2.0
        */
        getResourceLiterals(locale: Locale): Array<KeyPair>;
    }
    /**
       @class Adaptive.LifecycleBridge
       @extends Adaptive.BaseApplicationBridge
       Interface for Managing the Lifecycle listeners

       @author Carlos Lozano Diez
       @since v2.0
    */
    class LifecycleBridge extends BaseApplicationBridge implements ILifecycle {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Add the listener for the lifecycle of the app

           @param {Adaptive.LifecycleListener} listener listener Lifecycle listener
           @since v2.0
        */
        addLifecycleListener(listener: ILifecycleListener): void;
        /**
           @method
           Whether the application is in background or not

           @return {boolean} true if the application is in background;false otherwise
           @since v2.0
        */
        isBackground(): boolean;
        /**
           @method
           Un-registers an existing listener from receiving lifecycle events.

           @param {Adaptive.LifecycleListener} listener listener Lifecycle listener
           @since v2.0
        */
        removeLifecycleListener(listener: ILifecycleListener): void;
        /**
           @method
           Removes all existing listeners from receiving lifecycle events.

           @since v2.0
        */
        removeLifecycleListeners(): void;
    }
    /**
       @class Adaptive.ManagementBridge
       @extends Adaptive.BaseApplicationBridge
       Interface for Managing the Management operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class ManagementBridge extends BaseApplicationBridge implements IManagement {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.PrintingBridge
       @extends Adaptive.BaseApplicationBridge
       Interface for Managing the Printing operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class PrintingBridge extends BaseApplicationBridge implements IPrinting {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.SettingsBridge
       @extends Adaptive.BaseApplicationBridge
       Interface for Managing the Settings operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class SettingsBridge extends BaseApplicationBridge implements ISettings {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.UpdateBridge
       @extends Adaptive.BaseApplicationBridge
       Interface for Managing the Update operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class UpdateBridge extends BaseApplicationBridge implements IUpdate {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.AdsBridge
       @extends Adaptive.BaseCommerceBridge
       Interface for Advertising purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    class AdsBridge extends BaseCommerceBridge implements IAds {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.StoreBridge
       @extends Adaptive.BaseCommerceBridge
       Interface for Managing the Store operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class StoreBridge extends BaseCommerceBridge implements IStore {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.WalletBridge
       @extends Adaptive.BaseCommerceBridge
       Interface for Managing the Wallet operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class WalletBridge extends BaseCommerceBridge implements IWallet {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.BluetoothBridge
       @extends Adaptive.BaseCommunicationBridge
       Interface for Bluetooth purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    class BluetoothBridge extends BaseCommunicationBridge implements IBluetooth {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.NetworkInfoBridge
       @extends Adaptive.BaseCommunicationBridge
       Interface for Managing the Network information operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class NetworkInfoBridge extends BaseCommunicationBridge implements INetworkInfo {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.NetworkNamingBridge
       @extends Adaptive.BaseCommunicationBridge
       Interface for Managing the Network naming operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class NetworkNamingBridge extends BaseCommunicationBridge implements INetworkNaming {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.NetworkReachabilityBridge
       @extends Adaptive.BaseCommunicationBridge
       Interface for Managing the Network reachability operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class NetworkReachabilityBridge extends BaseCommunicationBridge implements INetworkReachability {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Whether there is connectivity to a host, via domain name or ip address, or not.

           @param {string} host host     domain name or ip address of host.
           @param {Adaptive.NetworkReachabilityCallback} callback callback Callback called at the end.
           @since v2.0
        */
        isNetworkReachable(host: string, callback: INetworkReachabilityCallback): void;
        /**
           @method
           Whether there is connectivity to an url of a service or not.

           @param {string} url url      to look for
           @param {Adaptive.NetworkReachabilityCallback} callback callback Callback called at the end
           @since v2.0
        */
        isNetworkServiceReachable(url: string, callback: INetworkReachabilityCallback): void;
    }
    /**
       @class Adaptive.NetworkStatusBridge
       @extends Adaptive.BaseCommunicationBridge
       Interface for Managing the Network status

       @author Carlos Lozano Diez
       @since v2.0
    */
    class NetworkStatusBridge extends BaseCommunicationBridge implements INetworkStatus {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Add the listener for network status changes of the app

           @param {Adaptive.NetworkStatusListener} listener listener Listener with the result
           @since v2.0
        */
        addNetworkStatusListener(listener: INetworkStatusListener): void;
        /**
           @method
           Un-registers an existing listener from receiving network status events.

           @param {Adaptive.NetworkStatusListener} listener listener Listener with the result
           @since v2.0
        */
        removeNetworkStatusListener(listener: INetworkStatusListener): void;
        /**
           @method
           Removes all existing listeners from receiving network status events.

           @since v2.0
        */
        removeNetworkStatusListeners(): void;
    }
    /**
       @class Adaptive.ServiceBridge
       @extends Adaptive.BaseCommunicationBridge
       Interface for Managing the Services operations

       @author Francisco Javier Martin Bueno
       @since v2.0
    */
    class ServiceBridge extends BaseCommunicationBridge implements IService {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
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
        getServiceRequest(serviceToken: ServiceToken): ServiceRequest;
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
        getServiceToken(serviceName: string, endpointName: string, functionName: string, method: IServiceMethod): ServiceToken;
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
        getServiceTokenByUri(uri: string): ServiceToken;
        /**
           @method
           Returns all the possible service tokens configured in the platform's XML service definition file.

           @return {Adaptive.ServiceToken[]} Array of service tokens configured.
           @since v2.0.6
        */
        getServicesRegistered(): Array<ServiceToken>;
        /**
           @method
           Executes the given ServiceRequest and provides responses to the given callback handler.

           @param {Adaptive.ServiceRequest} serviceRequest serviceRequest ServiceRequest with the request body.
           @param {Adaptive.ServiceResultCallback} callback callback       IServiceResultCallback to handle the ServiceResponse.
           @since v2.0.6
        */
        invokeService(serviceRequest: ServiceRequest, callback: IServiceResultCallback): void;
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
        isServiceRegistered(serviceName: string, endpointName: string, functionName: string, method: IServiceMethod): boolean;
    }
    /**
       @class Adaptive.SocketBridge
       @extends Adaptive.BaseCommunicationBridge
       Interface for Managing the Socket operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class SocketBridge extends BaseCommunicationBridge implements ISocket {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.TelephonyBridge
       @extends Adaptive.BaseCommunicationBridge
       Interface for Managing the Telephony operations

       @author Francisco Javier Martin Bueno
       @since v2.0
    */
    class TelephonyBridge extends BaseCommunicationBridge implements ITelephony {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Invoke a phone call

           @param {string} number number to call
           @return {Adaptive.ITelephonyStatus} Status of the call
           @since v2.0
        */
        call(number: string): ITelephonyStatus;
    }
    /**
       @class Adaptive.CloudBridge
       @extends Adaptive.BaseDataBridge
       Interface for Managing the Cloud operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class CloudBridge extends BaseDataBridge implements ICloud {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.DataStreamBridge
       @extends Adaptive.BaseDataBridge
       Interface for Managing the DataStream operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class DataStreamBridge extends BaseDataBridge implements IDataStream {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.DatabaseBridge
       @extends Adaptive.BaseDataBridge
       Interface for Managing the Cloud operations

       @author Ferran Vila Conesa
       @since v2.0
    */
    class DatabaseBridge extends BaseDataBridge implements IDatabase {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Creates a database on default path for every platform.

           @param {Adaptive.Database} database database Database object to create
           @param {Adaptive.DatabaseResultCallback} callback callback Asynchronous callback
           @since v2.0
        */
        createDatabase(database: Database, callback: IDatabaseResultCallback): void;
        /**
           @method
           Creates a databaseTable inside a database for every platform.

           @param {Adaptive.Database} database database      Database for databaseTable creating.
           @param {Adaptive.DatabaseTable} databaseTable databaseTable DatabaseTable object with the name of the databaseTable inside.
           @param {Adaptive.DatabaseTableResultCallback} callback callback      DatabaseTable callback with the response
           @since v2.0
        */
        createTable(database: Database, databaseTable: DatabaseTable, callback: IDatabaseTableResultCallback): void;
        /**
           @method
           Deletes a database on default path for every platform.

           @param {Adaptive.Database} database database Database object to delete
           @param {Adaptive.DatabaseResultCallback} callback callback Asynchronous callback
           @since v2.0
        */
        deleteDatabase(database: Database, callback: IDatabaseResultCallback): void;
        /**
           @method
           Deletes a databaseTable inside a database for every platform.

           @param {Adaptive.Database} database database      Database for databaseTable removal.
           @param {Adaptive.DatabaseTable} databaseTable databaseTable DatabaseTable object with the name of the databaseTable inside.
           @param {Adaptive.DatabaseTableResultCallback} callback callback      DatabaseTable callback with the response
           @since v2.0
        */
        deleteTable(database: Database, databaseTable: DatabaseTable, callback: IDatabaseTableResultCallback): void;
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
        executeSqlStatement(database: Database, statement: string, replacements: Array<string>, callback: IDatabaseTableResultCallback): void;
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
        executeSqlTransactions(database: Database, statements: Array<string>, rollbackFlag: boolean, callback: IDatabaseTableResultCallback): void;
        /**
           @method
           Checks if database exists by given database name.

           @param {Adaptive.Database} database database Database Object to check if exists
           @return {boolean} True if exists, false otherwise
           @since v2.0
        */
        existsDatabase(database: Database): boolean;
        /**
           @method
           Checks if databaseTable exists by given database name.

           @param {Adaptive.Database} database database      Database for databaseTable consulting.
           @param {Adaptive.DatabaseTable} databaseTable databaseTable DatabaseTable object with the name of the databaseTable inside.
           @return {boolean} True if exists, false otherwise
           @since v2.0
        */
        existsTable(database: Database, databaseTable: DatabaseTable): boolean;
    }
    /**
       @class Adaptive.FileBridge
       @extends Adaptive.BaseDataBridge
       Interface for Managing the File operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class FileBridge extends BaseDataBridge implements IFile {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Determine whether the current file/folder can be read from.

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @return {boolean} True if the folder/file is readable, false otherwise.
           @since v2.0
        */
        canRead(descriptor: FileDescriptor): boolean;
        /**
           @method
           Determine whether the current file/folder can be written to.

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @return {boolean} True if the folder/file is writable, false otherwise.
           @since v2.0
        */
        canWrite(descriptor: FileDescriptor): boolean;
        /**
           @method
           Creates a file with the specified name.

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @param {Adaptive.FileResultCallback} callback callback   Result of the operation.
           @since v2.0
        */
        create(descriptor: FileDescriptor, callback: IFileResultCallback): void;
        /**
           @method
           Deletes the given file or path. If the file is a directory and contains files and or subdirectories, these will be
deleted if the cascade parameter is set to true.

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @param {boolean} cascade cascade    Whether to delete sub-files and sub-folders.
           @return {boolean} True if files (and sub-files and folders) whether deleted.
           @since v2.0
        */
        delete(descriptor: FileDescriptor, cascade: boolean): boolean;
        /**
           @method
           Check whether the file/path exists.

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @return {boolean} True if the file exists in the filesystem, false otherwise.
           @since v2.0
        */
        exists(descriptor: FileDescriptor): boolean;
        /**
           @method
           Loads the content of the file.

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @param {Adaptive.FileDataLoadResultCallback} callback callback   Result of the operation.
           @since v2.0
        */
        getContent(descriptor: FileDescriptor, callback: IFileDataLoadResultCallback): void;
        /**
           @method
           Returns the file storage type of the file

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @return {Adaptive.IFileSystemStorageType} Storage Type file
           @since v2.0
        */
        getFileStorageType(descriptor: FileDescriptor): IFileSystemStorageType;
        /**
           @method
           Returns the file type

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @return {Adaptive.IFileSystemType} Returns the file type of the file
           @since v2.0
        */
        getFileType(descriptor: FileDescriptor): IFileSystemType;
        /**
           @method
           Returns the security type of the file

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @return {Adaptive.IFileSystemSecurity} Security Level of the file
           @since v2.0
        */
        getSecurityType(descriptor: FileDescriptor): IFileSystemSecurity;
        /**
           @method
           Check whether this is a path of a file.

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @return {boolean} true if this is a path to a folder/directory, false if this is a path to a file.
           @since v2.0
        */
        isDirectory(descriptor: FileDescriptor): boolean;
        /**
           @method
           List all the files contained within this file/path reference. If the reference is a file, it will not yield
any results.

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @param {Adaptive.FileListResultCallback} callback callback   Result of operation.
           @since v2.0
        */
        listFiles(descriptor: FileDescriptor, callback: IFileListResultCallback): void;
        /**
           @method
           List all the files matching the speficied regex filter within this file/path reference. If the reference
is a file, it will not yield any results.

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @param {string} regex regex      Filter (eg. *.jpg, *.png, Fil*) name string.
           @param {Adaptive.FileListResultCallback} callback callback   Result of operation.
           @since v2.0
        */
        listFilesForRegex(descriptor: FileDescriptor, regex: string, callback: IFileListResultCallback): void;
        /**
           @method
           Creates the parent path (or paths, if recursive) to the given file/path if it doesn't already exist.

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @param {boolean} recursive recursive  Whether to create all parent path elements.
           @return {boolean} True if the path was created, false otherwise (or it exists already).
           @since v2.0
        */
        mkDir(descriptor: FileDescriptor, recursive: boolean): boolean;
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
        move(source: FileDescriptor, destination: FileDescriptor, createPath: boolean, overwrite: boolean, callback: IFileResultCallback): void;
        /**
           @method
           Sets the content of the file.

           @param {Adaptive.FileDescriptor} descriptor descriptor File descriptor of file or folder used for operation.
           @param {number[]} content content    Binary content to store in the file.
           @param {Adaptive.FileDataStoreResultCallback} callback callback   Result of the operation.
           @since v2.0
        */
        setContent(descriptor: FileDescriptor, content: Array<number>, callback: IFileDataStoreResultCallback): void;
    }
    /**
       @class Adaptive.FileSystemBridge
       @extends Adaptive.BaseDataBridge
       Interface for Managing the File System operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class FileSystemBridge extends BaseDataBridge implements IFileSystem {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Creates a new reference to a new or existing location in the filesystem.
This method does not create the actual file in the specified folder.

           @param {Adaptive.FileDescriptor} parent parent Parent directory.
           @param {string} name name   Name of new file or directory.
           @return {Adaptive.FileDescriptor} A reference to a new or existing location in the filesystem.
           @since v2.0
        */
        createFileDescriptor(parent: FileDescriptor, name: string): FileDescriptor;
        /**
           @method
           Returns a reference to the cache folder for the current application.
This path must always be writable by the current application.
This path is volatile and may be cleaned by the OS periodically.

           @return {Adaptive.FileDescriptor} Path to the application's cache folder.
           @since v2.0
        */
        getApplicationCacheFolder(): FileDescriptor;
        /**
           @method
           Returns a reference to the cloud synchronizable folder for the current application.
This path must always be writable by the current application.

           @return {Adaptive.FileDescriptor} Path to the application's cloud storage folder.
           @since v2.0
        */
        getApplicationCloudFolder(): FileDescriptor;
        /**
           @method
           Returns a reference to the documents folder for the current application.
This path must always be writable by the current application.

           @return {Adaptive.FileDescriptor} Path to the application's documents folder.
           @since v2.0
        */
        getApplicationDocumentsFolder(): FileDescriptor;
        /**
           @method
           Returns a reference to the application installation folder.
This path may or may not be directly readable or writable - it usually contains the app binary and data.

           @return {Adaptive.FileDescriptor} Path to the application folder.
           @since v2.0
        */
        getApplicationFolder(): FileDescriptor;
        /**
           @method
           Returns a reference to the protected storage folder for the current application.
This path must always be writable by the current application.

           @return {Adaptive.FileDescriptor} Path to the application's protected storage folder.
           @since v2.0
        */
        getApplicationProtectedFolder(): FileDescriptor;
        /**
           @method
           Returns the file system dependent file separator.

           @return {string} char with the directory/file separator.
           @since v2.0
        */
        getSeparator(): string;
        /**
           @method
           Returns a reference to the external storage folder provided by the OS. This may
be an external SSD card or similar. This type of storage is removable and by
definition, not secure.
This path may or may not be writable by the current application.

           @return {Adaptive.FileDescriptor} Path to the application's documents folder.
           @since v2.0
        */
        getSystemExternalFolder(): FileDescriptor;
    }
    /**
       @class Adaptive.InternalStorageBridge
       @extends Adaptive.BaseDataBridge
       Interface for Managing the Internal Storage operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class InternalStorageBridge extends BaseDataBridge implements IInternalStorage {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.XMLBridge
       @extends Adaptive.BaseDataBridge
       Interface for Managing the XML operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class XMLBridge extends BaseDataBridge implements IXML {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.AudioBridge
       @extends Adaptive.BaseMediaBridge
       Interface for Audio purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    class AudioBridge extends BaseMediaBridge implements IAudio {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.CameraBridge
       @extends Adaptive.BaseMediaBridge
       Interface for Managing the camera operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class CameraBridge extends BaseMediaBridge implements ICamera {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.ImagingBridge
       @extends Adaptive.BaseMediaBridge
       Interface for Managing the Imaging operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class ImagingBridge extends BaseMediaBridge implements IImaging {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.VideoBridge
       @extends Adaptive.BaseMediaBridge
       Interface for Managing the Video operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class VideoBridge extends BaseMediaBridge implements IVideo {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Play url video stream

           @param {string} url url of the video
           @since v2.0
        */
        playStream(url: string): void;
    }
    /**
       @class Adaptive.AlarmBridge
       @extends Adaptive.BaseNotificationBridge
       Interface for Alarm purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    class AlarmBridge extends BaseNotificationBridge implements IAlarm {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.NotificationBridge
       @extends Adaptive.BaseNotificationBridge
       Interface for Managing the Notification operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class NotificationBridge extends BaseNotificationBridge implements INotification {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.NotificationLocalBridge
       @extends Adaptive.BaseNotificationBridge
       Interface for Managing the Local Notifications operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class NotificationLocalBridge extends BaseNotificationBridge implements INotificationLocal {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.VibrationBridge
       @extends Adaptive.BaseNotificationBridge
       Interface for Managing the Vibration operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class VibrationBridge extends BaseNotificationBridge implements IVibration {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.CalendarBridge
       @extends Adaptive.BasePIMBridge
       Interface for Managing the Calendar operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class CalendarBridge extends BasePIMBridge implements ICalendar {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.ContactBridge
       @extends Adaptive.BasePIMBridge
       Interface for Managing the Contact operations

       @author Francisco Javier Martin Bueno
       @since v2.0
    */
    class ContactBridge extends BasePIMBridge implements IContact {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Get all the details of a contact according to its id

           @param {Adaptive.ContactUid} contact contact  id to search for
           @param {Adaptive.ContactResultCallback} callback callback called for return
           @since v2.0
        */
        getContact(contact: ContactUid, callback: IContactResultCallback): void;
        /**
           @method
           Get the contact photo

           @param {Adaptive.ContactUid} contact contact  id to search for
           @param {Adaptive.ContactPhotoResultCallback} callback callback called for return
           @since v2.0
        */
        getContactPhoto(contact: ContactUid, callback: IContactPhotoResultCallback): void;
        /**
           @method
           Get all contacts

           @param {Adaptive.ContactResultCallback} callback callback called for return
           @since v2.0
        */
        getContacts(callback: IContactResultCallback): void;
        /**
           @method
           Get marked fields of all contacts

           @param {Adaptive.ContactResultCallback} callback callback called for return
           @param {Adaptive.IContactFieldGroup[]} fields fields   to get for each Contact
           @since v2.0
        */
        getContactsForFields(callback: IContactResultCallback, fields: Array<IContactFieldGroup>): void;
        /**
           @method
           Get marked fields of all contacts according to a filter

           @param {Adaptive.ContactResultCallback} callback callback called for return
           @param {Adaptive.IContactFieldGroup[]} fields fields   to get for each Contact
           @param {Adaptive.IContactFilter[]} filter filter   to search for
           @since v2.0
        */
        getContactsWithFilter(callback: IContactResultCallback, fields: Array<IContactFieldGroup>, filter: Array<IContactFilter>): void;
        /**
           @method
           Search contacts according to a term and send it to the callback

           @param {string} term term     string to search
           @param {Adaptive.ContactResultCallback} callback callback called for return
           @since v2.0
        */
        searchContacts(term: string, callback: IContactResultCallback): void;
        /**
           @method
           Search contacts according to a term with a filter and send it to the callback

           @param {string} term term     string to search
           @param {Adaptive.ContactResultCallback} callback callback called for return
           @param {Adaptive.IContactFilter[]} filter filter   to search for
           @since v2.0
        */
        searchContactsWithFilter(term: string, callback: IContactResultCallback, filter: Array<IContactFilter>): void;
        /**
           @method
           Set the contact photo

           @param {Adaptive.ContactUid} contact contact  id to assign the photo
           @param {number[]} pngImage pngImage photo as byte array
           @return {boolean} true if set is successful;false otherwise
           @since v2.0
        */
        setContactPhoto(contact: ContactUid, pngImage: Array<number>): boolean;
    }
    /**
       @class Adaptive.MailBridge
       @extends Adaptive.BasePIMBridge
       Interface for Managing the Mail operations

       @author Francisco Javier Martin Bueno
       @since v2.0
    */
    class MailBridge extends BasePIMBridge implements IMail {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Send an Email

           @param {Adaptive.Email} data data     Payload of the email
           @param {Adaptive.MessagingCallback} callback callback Result callback of the operation
           @since v2.0
        */
        sendEmail(data: Email, callback: IMessagingCallback): void;
    }
    /**
       @class Adaptive.MessagingBridge
       @extends Adaptive.BasePIMBridge
       Interface for Managing the Messaging operations

       @author Francisco Javier Martin Bueno
       @since v2.0
    */
    class MessagingBridge extends BasePIMBridge implements IMessaging {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Send text SMS

           @param {string} number number   to send
           @param {string} text text     to send
           @param {Adaptive.MessagingCallback} callback callback with the result
           @since v2.0
        */
        sendSMS(number: string, text: string, callback: IMessagingCallback): void;
    }
    /**
       @class Adaptive.BarcodeBridge
       @extends Adaptive.BaseReaderBridge
       Interface for Barcode Reading purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    class BarcodeBridge extends BaseReaderBridge implements IBarcode {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.NFCBridge
       @extends Adaptive.BaseReaderBridge
       Interface for Managing the NFC operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class NFCBridge extends BaseReaderBridge implements INFC {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.OCRBridge
       @extends Adaptive.BaseReaderBridge
       Interface for Managing the OCR operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class OCRBridge extends BaseReaderBridge implements IOCR {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.QRCodeBridge
       @extends Adaptive.BaseReaderBridge
       Interface for Managing the QR Code operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class QRCodeBridge extends BaseReaderBridge implements IQRCode {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.OAuthBridge
       @extends Adaptive.BaseSecurityBridge
       Interface for Managing the OAuth operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class OAuthBridge extends BaseSecurityBridge implements IOAuth {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.OpenIdBridge
       @extends Adaptive.BaseSecurityBridge
       Interface for Managing the OpenID operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class OpenIdBridge extends BaseSecurityBridge implements IOpenId {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.SecurityBridge
       @extends Adaptive.BaseSecurityBridge
       Interface for Managing the Security operations

       @author Aryslan
       @since v2.0
    */
    class SecurityBridge extends BaseSecurityBridge implements ISecurity {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Deletes from the device internal storage the entry/entries containing the specified key names.

           @param {string[]} keys keys             Array with the key names to delete.
           @param {string} publicAccessName publicAccessName The name of the shared internal storage object (if needed).
           @param {Adaptive.SecurityResultCallback} callback callback         callback to be executed upon function result.
           @since v2.0
        */
        deleteSecureKeyValuePairs(keys: Array<string>, publicAccessName: string, callback: ISecurityResultCallback): void;
        /**
           @method
           Retrieves from the device internal storage the entry/entries containing the specified key names.

           @param {string[]} keys keys             Array with the key names to retrieve.
           @param {string} publicAccessName publicAccessName The name of the shared internal storage object (if needed).
           @param {Adaptive.SecurityResultCallback} callback callback         callback to be executed upon function result.
           @since v2.0
        */
        getSecureKeyValuePairs(keys: Array<string>, publicAccessName: string, callback: ISecurityResultCallback): void;
        /**
           @method
           Returns if the device has been modified in anyhow

           @return {boolean} true if the device has been modified; false otherwise
           @since v2.0
        */
        isDeviceModified(): boolean;
        /**
           @method
           Stores in the device internal storage the specified item/s.

           @param {Adaptive.SecureKeyPair[]} keyValues keyValues        Array containing the items to store on the device internal memory.
           @param {string} publicAccessName publicAccessName The name of the shared internal storage object (if needed).
           @param {Adaptive.SecurityResultCallback} callback callback         callback to be executed upon function result.
           @since v2.0
        */
        setSecureKeyValuePairs(keyValues: Array<SecureKeyPair>, publicAccessName: string, callback: ISecurityResultCallback): void;
    }
    /**
       @class Adaptive.AccelerationBridge
       @extends Adaptive.BaseSensorBridge
       Interface defining methods about the acceleration sensor

       @author Carlos Lozano Diez
       @since v2.0
    */
    class AccelerationBridge extends BaseSensorBridge implements IAcceleration {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Register a new listener that will receive acceleration events.

           @param {Adaptive.AccelerationListener} listener listener to be registered.
           @since v2.0
        */
        addAccelerationListener(listener: IAccelerationListener): void;
        /**
           @method
           De-registers an existing listener from receiving acceleration events.

           @param {Adaptive.AccelerationListener} listener listener to be registered.
           @since v2.0
        */
        removeAccelerationListener(listener: IAccelerationListener): void;
        /**
           @method
           Removed all existing listeners from receiving acceleration events.

           @since v2.0
        */
        removeAccelerationListeners(): void;
    }
    /**
       @class Adaptive.AmbientLightBridge
       @extends Adaptive.BaseSensorBridge
       Interface for managinf the Ambient Light

       @author Carlos Lozano Diez
       @since v2.0
    */
    class AmbientLightBridge extends BaseSensorBridge implements IAmbientLight {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.BarometerBridge
       @extends Adaptive.BaseSensorBridge
       Interface for Barometer management purposes

       @author Carlos Lozano Diez
       @since v2.0
    */
    class BarometerBridge extends BaseSensorBridge implements IBarometer {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.GeolocationBridge
       @extends Adaptive.BaseSensorBridge
       Interface for Managing the Geolocation operations

       @author Francisco Javier Martin Bueno
       @since v2.0
    */
    class GeolocationBridge extends BaseSensorBridge implements IGeolocation {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Register a new listener that will receive geolocation events.

           @param {Adaptive.GeolocationListener} listener listener to be registered.
           @since v2.0
        */
        addGeolocationListener(listener: IGeolocationListener): void;
        /**
           @method
           De-registers an existing listener from receiving geolocation events.

           @param {Adaptive.GeolocationListener} listener listener to be registered.
           @since v2.0
        */
        removeGeolocationListener(listener: IGeolocationListener): void;
        /**
           @method
           Removed all existing listeners from receiving geolocation events.

           @since v2.0
        */
        removeGeolocationListeners(): void;
    }
    /**
       @class Adaptive.GyroscopeBridge
       @extends Adaptive.BaseSensorBridge
       Interface for Managing the Giroscope operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class GyroscopeBridge extends BaseSensorBridge implements IGyroscope {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.MagnetometerBridge
       @extends Adaptive.BaseSensorBridge
       Interface for Managing the Magnetometer operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class MagnetometerBridge extends BaseSensorBridge implements IMagnetometer {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.ProximityBridge
       @extends Adaptive.BaseSensorBridge
       Interface for Managing the Proximity operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class ProximityBridge extends BaseSensorBridge implements IProximity {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.FacebookBridge
       @extends Adaptive.BaseSocialBridge
       Interface for Managing the Facebook operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class FacebookBridge extends BaseSocialBridge implements IFacebook {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.GooglePlusBridge
       @extends Adaptive.BaseSocialBridge
       Interface for Managing the Google Plus operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class GooglePlusBridge extends BaseSocialBridge implements IGooglePlus {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.LinkedInBridge
       @extends Adaptive.BaseSocialBridge
       Interface for Managing the Linkedin operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class LinkedInBridge extends BaseSocialBridge implements ILinkedIn {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.RSSBridge
       @extends Adaptive.BaseSocialBridge
       Interface for Managing the RSS operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class RSSBridge extends BaseSocialBridge implements IRSS {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.TwitterBridge
       @extends Adaptive.BaseSocialBridge
       Interface for Managing the Twitter operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class TwitterBridge extends BaseSocialBridge implements ITwitter {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.CapabilitiesBridge
       @extends Adaptive.BaseSystemBridge
       Interface for testing the Capabilities operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class CapabilitiesBridge extends BaseSystemBridge implements ICapabilities {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Obtains the default orientation of the device/display. If no default orientation is available on
the platform, this method will return the current orientation. To capture device or display orientation
changes please use the IDevice and IDisplay functions and listeners API respectively.

           @return {Adaptive.ICapabilitiesOrientation} The default orientation for the device/display.
           @since v2.0.5
        */
        getOrientationDefault(): ICapabilitiesOrientation;
        /**
           @method
           Provides the device/display orientations supported by the platform. A platform will usually
support at least one orientation. This is usually PortaitUp.

           @return {Adaptive.ICapabilitiesOrientation[]} The orientations supported by the device/display of the platform.
           @since v2.0.5
        */
        getOrientationsSupported(): Array<ICapabilitiesOrientation>;
        /**
           @method
           Determines whether a specific hardware button is supported for interaction.

           @param {Adaptive.ICapabilitiesButton} type type Type of feature to check.
           @return {boolean} true is supported, false otherwise.
           @since v2.0
        */
        hasButtonSupport(type: ICapabilitiesButton): boolean;
        /**
           @method
           Determines whether a specific Communication capability is supported by
the device.

           @param {Adaptive.ICapabilitiesCommunication} type type Type of feature to check.
           @return {boolean} true if supported, false otherwise.
           @since v2.0
        */
        hasCommunicationSupport(type: ICapabilitiesCommunication): boolean;
        /**
           @method
           Determines whether a specific Data capability is supported by the device.

           @param {Adaptive.ICapabilitiesData} type type Type of feature to check.
           @return {boolean} true if supported, false otherwise.
           @since v2.0
        */
        hasDataSupport(type: ICapabilitiesData): boolean;
        /**
           @method
           Determines whether a specific Media capability is supported by the
device.

           @param {Adaptive.ICapabilitiesMedia} type type Type of feature to check.
           @return {boolean} true if supported, false otherwise.
           @since v2.0
        */
        hasMediaSupport(type: ICapabilitiesMedia): boolean;
        /**
           @method
           Determines whether a specific Net capability is supported by the device.

           @param {Adaptive.ICapabilitiesNet} type type Type of feature to check.
           @return {boolean} true if supported, false otherwise.
           @since v2.0
        */
        hasNetSupport(type: ICapabilitiesNet): boolean;
        /**
           @method
           Determines whether a specific Notification capability is supported by the
device.

           @param {Adaptive.ICapabilitiesNotification} type type Type of feature to check.
           @return {boolean} true if supported, false otherwise.
           @since v2.0
        */
        hasNotificationSupport(type: ICapabilitiesNotification): boolean;
        /**
           @method
           Determines whether the device/display supports a given orientation.

           @param {Adaptive.ICapabilitiesOrientation} orientation orientation Orientation type.
           @return {boolean} True if the given orientation is supported, false otherwise.
           @since v2.0.5
        */
        hasOrientationSupport(orientation: ICapabilitiesOrientation): boolean;
        /**
           @method
           Determines whether a specific Sensor capability is supported by the
device.

           @param {Adaptive.ICapabilitiesSensor} type type Type of feature to check.
           @return {boolean} true if supported, false otherwise.
           @since v2.0
        */
        hasSensorSupport(type: ICapabilitiesSensor): boolean;
    }
    /**
       @class Adaptive.DeviceBridge
       @extends Adaptive.BaseSystemBridge
       Interface for Managing the Device operations

       @author Francisco Javier Martin Bueno
       @since v2.0
    */
    class DeviceBridge extends BaseSystemBridge implements IDevice {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Register a new listener that will receive button events.

           @param {Adaptive.ButtonListener} listener listener to be registered.
           @since v2.0
        */
        addButtonListener(listener: IButtonListener): void;
        /**
           @method
           Add a listener to start receiving device orientation change events.

           @param {Adaptive.DeviceOrientationListener} listener listener Listener to add to receive orientation change events.
           @since v2.0.5
        */
        addDeviceOrientationListener(listener: IDeviceOrientationListener): void;
        /**
           @method
           Returns the device information for the current device executing the runtime.

           @return {Adaptive.DeviceInfo} DeviceInfo for the current device.
           @since v2.0
        */
        getDeviceInfo(): DeviceInfo;
        /**
           @method
           Gets the current Locale for the device.

           @return {Adaptive.Locale} The current Locale information.
           @since v2.0
        */
        getLocaleCurrent(): Locale;
        /**
           @method
           Returns the current orientation of the device. Please note that this may be different from the orientation
of the display. For display orientation, use the IDisplay APIs.

           @return {Adaptive.ICapabilitiesOrientation} The current orientation of the device.
           @since v2.0.5
        */
        getOrientationCurrent(): ICapabilitiesOrientation;
        /**
           @method
           De-registers an existing listener from receiving button events.

           @param {Adaptive.ButtonListener} listener listener to be removed.
           @since v2.0
        */
        removeButtonListener(listener: IButtonListener): void;
        /**
           @method
           Removed all existing listeners from receiving button events.

           @since v2.0
        */
        removeButtonListeners(): void;
        /**
           @method
           Remove a listener to stop receiving device orientation change events.

           @param {Adaptive.DeviceOrientationListener} listener listener Listener to remove from receiving orientation change events.
           @since v2.0.5
        */
        removeDeviceOrientationListener(listener: IDeviceOrientationListener): void;
        /**
           @method
           Remove all listeners receiving device orientation events.

           @since v2.0.5
        */
        removeDeviceOrientationListeners(): void;
    }
    /**
       @class Adaptive.DisplayBridge
       @extends Adaptive.BaseSystemBridge
       Interface for Managing the Display operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class DisplayBridge extends BaseSystemBridge implements IDisplay {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Add a listener to start receiving display orientation change events.

           @param {Adaptive.DisplayOrientationListener} listener listener Listener to add to receive orientation change events.
           @since v2.0.5
        */
        addDisplayOrientationListener(listener: IDisplayOrientationListener): void;
        /**
           @method
           Returns the current orientation of the display. Please note that this may be different from the orientation
of the device. For device orientation, use the IDevice APIs.

           @return {Adaptive.ICapabilitiesOrientation} The current orientation of the display.
           @since v2.0.5
        */
        getOrientationCurrent(): ICapabilitiesOrientation;
        /**
           @method
           Remove a listener to stop receiving display orientation change events.

           @param {Adaptive.DisplayOrientationListener} listener listener Listener to remove from receiving orientation change events.
           @since v2.0.5
        */
        removeDisplayOrientationListener(listener: IDisplayOrientationListener): void;
        /**
           @method
           Remove all listeners receiving display orientation events.

           @since v2.0.5
        */
        removeDisplayOrientationListeners(): void;
    }
    /**
       @class Adaptive.OSBridge
       @extends Adaptive.BaseSystemBridge
       Interface for Managing the OS operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class OSBridge extends BaseSystemBridge implements IOS {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Returns the OSInfo for the current operating system.

           @return {Adaptive.OSInfo} OSInfo with name, version and vendor of the OS.
           @since v2.0
        */
        getOSInfo(): OSInfo;
    }
    /**
       @class Adaptive.RuntimeBridge
       @extends Adaptive.BaseSystemBridge
       Interface for Managing the Runtime operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class RuntimeBridge extends BaseSystemBridge implements IRuntime {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Dismiss the current Application

           @since v2.0
        */
        dismissApplication(): void;
        /**
           @method
           Whether the application dismiss the splash screen successfully or not

           @return {boolean} true if the application has dismissed the splash screen;false otherwise
           @since v2.0
        */
        dismissSplashScreen(): boolean;
    }
    /**
       @class Adaptive.BrowserBridge
       @extends Adaptive.BaseUIBridge
       Interface for Managing the browser operations

       @author Francisco Javier Martin Bueno
       @since v2.0
    */
    class BrowserBridge extends BaseUIBridge implements IBrowser {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           @method
           Method for opening a URL like a link in the native default browser

           @param {string} url url Url to open
           @return {boolean} The result of the operation
           @since v2.0
        */
        openExtenalBrowser(url: string): boolean;
        /**
           @method
           Method for opening a browser embedded into the application

           @param {string} url url            Url to open
           @param {string} title title          Title of the Navigation bar
           @param {string} backButtonText backButtonText Title of the Back button bar
           @return {boolean} The result of the operation
           @since v2.0
        */
        openInternalBrowser(url: string, title: string, backButtonText: string): boolean;
        /**
           @method
           Method for opening a browser embedded into the application in a modal window

           @param {string} url url            Url to open
           @param {string} title title          Title of the Navigation bar
           @param {string} backButtonText backButtonText Title of the Back button bar
           @return {boolean} The result of the operation
           @since v2.0
        */
        openInternalBrowserModal(url: string, title: string, backButtonText: string): boolean;
    }
    /**
       @class Adaptive.DesktopBridge
       @extends Adaptive.BaseUIBridge
       Interface for Managing the Desktop operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class DesktopBridge extends BaseUIBridge implements IDesktop {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.MapBridge
       @extends Adaptive.BaseUIBridge
       Interface for Managing the Map operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class MapBridge extends BaseUIBridge implements IMap {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.UIBridge
       @extends Adaptive.BaseUIBridge
       Interface for Managing the UI operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class UIBridge extends BaseUIBridge implements IUI {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.CompressionBridge
       @extends Adaptive.BaseUtilBridge
       Interface for Managing the Compression operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class CompressionBridge extends BaseUtilBridge implements ICompression {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.ConcurrentBridge
       @extends Adaptive.BaseUtilBridge
       Interface for Managing the Concurrent operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class ConcurrentBridge extends BaseUtilBridge implements IConcurrent {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.CryptoBridge
       @extends Adaptive.BaseUtilBridge
       Interface for Managing the Cloud operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class CryptoBridge extends BaseUtilBridge implements ICrypto {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.LoggingBridge
       @extends Adaptive.BaseUtilBridge
       Interface for Managing the Logging operations

       @author Ferran Vila Conesa
       @since v2.0
    */
    class LoggingBridge extends BaseUtilBridge implements ILogging {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
        /**
           Logs the given message, with the given log level if specified, to the standard platform/environment.

           @param level   Log level
           @param message Message to be logged
           @since v2.0
        */
        logLevelMessage(level: ILoggingLogLevel, message: string): void;
        /**
           Logs the given message, with the given log level if specified, to the standard platform/environment.

           @param level    Log level
           @param category Category/tag name to identify/filter the log.
           @param message  Message to be logged
           @since v2.0
        */
        logLevelCategoryMessage(level: ILoggingLogLevel, category: string, message: string): void;
    }
    /**
       @class Adaptive.TimerBridge
       @extends Adaptive.BaseUtilBridge
       Interface for Managing the Timer operations

       @author Carlos Lozano Diez
       @since v2.0
    */
    class TimerBridge extends BaseUtilBridge implements ITimer {
        /**
           @method constructor
           Default constructor.
        */
        constructor();
    }
    /**
       @class Adaptive.AppRegistryBridge
       Interface to retrieve auto-registered service implementation references.

       @author Carlos Lozano Diez
       @since v2.0
    */
    class AppRegistryBridge implements IAppRegistry {
        /**
           @private
           @static
           @property {Adaptive.AppRegistryBridge} instance
           Singleton instance of AppRegistry.
        */
        private static instance;
        /**
           @static
           @singleton
           @method
           Singleton instance of AppRegistry.
           @return {Adaptive.AppRegistryBridge}
        */
        static getInstance(): IAppRegistry;
        /**
           @private
           @property {Adaptive.IAcceleration} instanceAcceleration
        */
        private static instanceAcceleration;
        /**
           @private
           @property {Adaptive.IAds} instanceAds
        */
        private static instanceAds;
        /**
           @private
           @property {Adaptive.IAlarm} instanceAlarm
        */
        private static instanceAlarm;
        /**
           @private
           @property {Adaptive.IAmbientLight} instanceAmbientLight
        */
        private static instanceAmbientLight;
        /**
           @private
           @property {Adaptive.IAnalytics} instanceAnalytics
        */
        private static instanceAnalytics;
        /**
           @private
           @property {Adaptive.IAudio} instanceAudio
        */
        private static instanceAudio;
        /**
           @private
           @property {Adaptive.IBarcode} instanceBarcode
        */
        private static instanceBarcode;
        /**
           @private
           @property {Adaptive.IBarometer} instanceBarometer
        */
        private static instanceBarometer;
        /**
           @private
           @property {Adaptive.IBluetooth} instanceBluetooth
        */
        private static instanceBluetooth;
        /**
           @private
           @property {Adaptive.IBrowser} instanceBrowser
        */
        private static instanceBrowser;
        /**
           @private
           @property {Adaptive.ICalendar} instanceCalendar
        */
        private static instanceCalendar;
        /**
           @private
           @property {Adaptive.ICamera} instanceCamera
        */
        private static instanceCamera;
        /**
           @private
           @property {Adaptive.ICapabilities} instanceCapabilities
        */
        private static instanceCapabilities;
        /**
           @private
           @property {Adaptive.ICloud} instanceCloud
        */
        private static instanceCloud;
        /**
           @private
           @property {Adaptive.ICompression} instanceCompression
        */
        private static instanceCompression;
        /**
           @private
           @property {Adaptive.IConcurrent} instanceConcurrent
        */
        private static instanceConcurrent;
        /**
           @private
           @property {Adaptive.IContact} instanceContact
        */
        private static instanceContact;
        /**
           @private
           @property {Adaptive.ICrypto} instanceCrypto
        */
        private static instanceCrypto;
        /**
           @private
           @property {Adaptive.IDataStream} instanceDataStream
        */
        private static instanceDataStream;
        /**
           @private
           @property {Adaptive.IDatabase} instanceDatabase
        */
        private static instanceDatabase;
        /**
           @private
           @property {Adaptive.IDesktop} instanceDesktop
        */
        private static instanceDesktop;
        /**
           @private
           @property {Adaptive.IDevice} instanceDevice
        */
        private static instanceDevice;
        /**
           @private
           @property {Adaptive.IDisplay} instanceDisplay
        */
        private static instanceDisplay;
        /**
           @private
           @property {Adaptive.IFacebook} instanceFacebook
        */
        private static instanceFacebook;
        /**
           @private
           @property {Adaptive.IFile} instanceFile
        */
        private static instanceFile;
        /**
           @private
           @property {Adaptive.IFileSystem} instanceFileSystem
        */
        private static instanceFileSystem;
        /**
           @private
           @property {Adaptive.IGeolocation} instanceGeolocation
        */
        private static instanceGeolocation;
        /**
           @private
           @property {Adaptive.IGlobalization} instanceGlobalization
        */
        private static instanceGlobalization;
        /**
           @private
           @property {Adaptive.IGooglePlus} instanceGooglePlus
        */
        private static instanceGooglePlus;
        /**
           @private
           @property {Adaptive.IGyroscope} instanceGyroscope
        */
        private static instanceGyroscope;
        /**
           @private
           @property {Adaptive.IImaging} instanceImaging
        */
        private static instanceImaging;
        /**
           @private
           @property {Adaptive.IInternalStorage} instanceInternalStorage
        */
        private static instanceInternalStorage;
        /**
           @private
           @property {Adaptive.ILifecycle} instanceLifecycle
        */
        private static instanceLifecycle;
        /**
           @private
           @property {Adaptive.ILinkedIn} instanceLinkedIn
        */
        private static instanceLinkedIn;
        /**
           @private
           @property {Adaptive.ILogging} instanceLogging
        */
        private static instanceLogging;
        /**
           @private
           @property {Adaptive.IMagnetometer} instanceMagnetometer
        */
        private static instanceMagnetometer;
        /**
           @private
           @property {Adaptive.IMail} instanceMail
        */
        private static instanceMail;
        /**
           @private
           @property {Adaptive.IManagement} instanceManagement
        */
        private static instanceManagement;
        /**
           @private
           @property {Adaptive.IMap} instanceMap
        */
        private static instanceMap;
        /**
           @private
           @property {Adaptive.IMessaging} instanceMessaging
        */
        private static instanceMessaging;
        /**
           @private
           @property {Adaptive.INFC} instanceNFC
        */
        private static instanceNFC;
        /**
           @private
           @property {Adaptive.INetworkInfo} instanceNetworkInfo
        */
        private static instanceNetworkInfo;
        /**
           @private
           @property {Adaptive.INetworkNaming} instanceNetworkNaming
        */
        private static instanceNetworkNaming;
        /**
           @private
           @property {Adaptive.INetworkReachability} instanceNetworkReachability
        */
        private static instanceNetworkReachability;
        /**
           @private
           @property {Adaptive.INetworkStatus} instanceNetworkStatus
        */
        private static instanceNetworkStatus;
        /**
           @private
           @property {Adaptive.INotification} instanceNotification
        */
        private static instanceNotification;
        /**
           @private
           @property {Adaptive.INotificationLocal} instanceNotificationLocal
        */
        private static instanceNotificationLocal;
        /**
           @private
           @property {Adaptive.IOAuth} instanceOAuth
        */
        private static instanceOAuth;
        /**
           @private
           @property {Adaptive.IOCR} instanceOCR
        */
        private static instanceOCR;
        /**
           @private
           @property {Adaptive.IOS} instanceOS
        */
        private static instanceOS;
        /**
           @private
           @property {Adaptive.IOpenId} instanceOpenId
        */
        private static instanceOpenId;
        /**
           @private
           @property {Adaptive.IPrinting} instancePrinting
        */
        private static instancePrinting;
        /**
           @private
           @property {Adaptive.IProximity} instanceProximity
        */
        private static instanceProximity;
        /**
           @private
           @property {Adaptive.IQRCode} instanceQRCode
        */
        private static instanceQRCode;
        /**
           @private
           @property {Adaptive.IRSS} instanceRSS
        */
        private static instanceRSS;
        /**
           @private
           @property {Adaptive.IRuntime} instanceRuntime
        */
        private static instanceRuntime;
        /**
           @private
           @property {Adaptive.ISecurity} instanceSecurity
        */
        private static instanceSecurity;
        /**
           @private
           @property {Adaptive.IService} instanceService
        */
        private static instanceService;
        /**
           @private
           @property {Adaptive.ISettings} instanceSettings
        */
        private static instanceSettings;
        /**
           @private
           @property {Adaptive.ISocket} instanceSocket
        */
        private static instanceSocket;
        /**
           @private
           @property {Adaptive.IStore} instanceStore
        */
        private static instanceStore;
        /**
           @private
           @property {Adaptive.ITelephony} instanceTelephony
        */
        private static instanceTelephony;
        /**
           @private
           @property {Adaptive.ITimer} instanceTimer
        */
        private static instanceTimer;
        /**
           @private
           @property {Adaptive.ITwitter} instanceTwitter
        */
        private static instanceTwitter;
        /**
           @private
           @property {Adaptive.IUI} instanceUI
        */
        private static instanceUI;
        /**
           @private
           @property {Adaptive.IUpdate} instanceUpdate
        */
        private static instanceUpdate;
        /**
           @private
           @property {Adaptive.IVibration} instanceVibration
        */
        private static instanceVibration;
        /**
           @private
           @property {Adaptive.IVideo} instanceVideo
        */
        private static instanceVideo;
        /**
           @private
           @property {Adaptive.IWallet} instanceWallet
        */
        private static instanceWallet;
        /**
           @private
           @property {Adaptive.IXML} instanceXML
        */
        private static instanceXML;
        /**
           @method
           Obtain a reference to the IAcceleration bridge.

           @return {Adaptive.AccelerationBridge} bridge instance.
        */
        getAccelerationBridge(): IAcceleration;
        /**
           @method
           Obtain a reference to the IAds bridge.

           @return {Adaptive.AdsBridge} bridge instance.
        */
        getAdsBridge(): IAds;
        /**
           @method
           Obtain a reference to the IAlarm bridge.

           @return {Adaptive.AlarmBridge} bridge instance.
        */
        getAlarmBridge(): IAlarm;
        /**
           @method
           Obtain a reference to the IAmbientLight bridge.

           @return {Adaptive.AmbientLightBridge} bridge instance.
        */
        getAmbientLightBridge(): IAmbientLight;
        /**
           @method
           Obtain a reference to the IAnalytics bridge.

           @return {Adaptive.AnalyticsBridge} bridge instance.
        */
        getAnalyticsBridge(): IAnalytics;
        /**
           @method
           Obtain a reference to the IAudio bridge.

           @return {Adaptive.AudioBridge} bridge instance.
        */
        getAudioBridge(): IAudio;
        /**
           @method
           Obtain a reference to the IBarcode bridge.

           @return {Adaptive.BarcodeBridge} bridge instance.
        */
        getBarcodeBridge(): IBarcode;
        /**
           @method
           Obtain a reference to the IBarometer bridge.

           @return {Adaptive.BarometerBridge} bridge instance.
        */
        getBarometerBridge(): IBarometer;
        /**
           @method
           Obtain a reference to the IBluetooth bridge.

           @return {Adaptive.BluetoothBridge} bridge instance.
        */
        getBluetoothBridge(): IBluetooth;
        /**
           @method
           Obtain a reference to the IBrowser bridge.

           @return {Adaptive.BrowserBridge} bridge instance.
        */
        getBrowserBridge(): IBrowser;
        /**
           @method
           Obtain a reference to the ICalendar bridge.

           @return {Adaptive.CalendarBridge} bridge instance.
        */
        getCalendarBridge(): ICalendar;
        /**
           @method
           Obtain a reference to the ICamera bridge.

           @return {Adaptive.CameraBridge} bridge instance.
        */
        getCameraBridge(): ICamera;
        /**
           @method
           Obtain a reference to the ICapabilities bridge.

           @return {Adaptive.CapabilitiesBridge} bridge instance.
        */
        getCapabilitiesBridge(): ICapabilities;
        /**
           @method
           Obtain a reference to the ICloud bridge.

           @return {Adaptive.CloudBridge} bridge instance.
        */
        getCloudBridge(): ICloud;
        /**
           @method
           Obtain a reference to the ICompression bridge.

           @return {Adaptive.CompressionBridge} bridge instance.
        */
        getCompressionBridge(): ICompression;
        /**
           @method
           Obtain a reference to the IConcurrent bridge.

           @return {Adaptive.ConcurrentBridge} bridge instance.
        */
        getConcurrentBridge(): IConcurrent;
        /**
           @method
           Obtain a reference to the IContact bridge.

           @return {Adaptive.ContactBridge} bridge instance.
        */
        getContactBridge(): IContact;
        /**
           @method
           Obtain a reference to the ICrypto bridge.

           @return {Adaptive.CryptoBridge} bridge instance.
        */
        getCryptoBridge(): ICrypto;
        /**
           @method
           Obtain a reference to the IDataStream bridge.

           @return {Adaptive.DataStreamBridge} bridge instance.
        */
        getDataStreamBridge(): IDataStream;
        /**
           @method
           Obtain a reference to the IDatabase bridge.

           @return {Adaptive.DatabaseBridge} bridge instance.
        */
        getDatabaseBridge(): IDatabase;
        /**
           @method
           Obtain a reference to the IDesktop bridge.

           @return {Adaptive.DesktopBridge} bridge instance.
        */
        getDesktopBridge(): IDesktop;
        /**
           @method
           Obtain a reference to the IDevice bridge.

           @return {Adaptive.DeviceBridge} bridge instance.
        */
        getDeviceBridge(): IDevice;
        /**
           @method
           Obtain a reference to the IDisplay bridge.

           @return {Adaptive.DisplayBridge} bridge instance.
        */
        getDisplayBridge(): IDisplay;
        /**
           @method
           Obtain a reference to the IFacebook bridge.

           @return {Adaptive.FacebookBridge} bridge instance.
        */
        getFacebookBridge(): IFacebook;
        /**
           @method
           Obtain a reference to the IFile bridge.

           @return {Adaptive.FileBridge} bridge instance.
        */
        getFileBridge(): IFile;
        /**
           @method
           Obtain a reference to the IFileSystem bridge.

           @return {Adaptive.FileSystemBridge} bridge instance.
        */
        getFileSystemBridge(): IFileSystem;
        /**
           @method
           Obtain a reference to the IGeolocation bridge.

           @return {Adaptive.GeolocationBridge} bridge instance.
        */
        getGeolocationBridge(): IGeolocation;
        /**
           @method
           Obtain a reference to the IGlobalization bridge.

           @return {Adaptive.GlobalizationBridge} bridge instance.
        */
        getGlobalizationBridge(): IGlobalization;
        /**
           @method
           Obtain a reference to the IGooglePlus bridge.

           @return {Adaptive.GooglePlusBridge} bridge instance.
        */
        getGooglePlusBridge(): IGooglePlus;
        /**
           @method
           Obtain a reference to the IGyroscope bridge.

           @return {Adaptive.GyroscopeBridge} bridge instance.
        */
        getGyroscopeBridge(): IGyroscope;
        /**
           @method
           Obtain a reference to the IImaging bridge.

           @return {Adaptive.ImagingBridge} bridge instance.
        */
        getImagingBridge(): IImaging;
        /**
           @method
           Obtain a reference to the IInternalStorage bridge.

           @return {Adaptive.InternalStorageBridge} bridge instance.
        */
        getInternalStorageBridge(): IInternalStorage;
        /**
           @method
           Obtain a reference to the ILifecycle bridge.

           @return {Adaptive.LifecycleBridge} bridge instance.
        */
        getLifecycleBridge(): ILifecycle;
        /**
           @method
           Obtain a reference to the ILinkedIn bridge.

           @return {Adaptive.LinkedInBridge} bridge instance.
        */
        getLinkedInBridge(): ILinkedIn;
        /**
           @method
           Obtain a reference to the ILogging bridge.

           @return {Adaptive.LoggingBridge} bridge instance.
        */
        getLoggingBridge(): ILogging;
        /**
           @method
           Obtain a reference to the IMagnetometer bridge.

           @return {Adaptive.MagnetometerBridge} bridge instance.
        */
        getMagnetometerBridge(): IMagnetometer;
        /**
           @method
           Obtain a reference to the IMail bridge.

           @return {Adaptive.MailBridge} bridge instance.
        */
        getMailBridge(): IMail;
        /**
           @method
           Obtain a reference to the IManagement bridge.

           @return {Adaptive.ManagementBridge} bridge instance.
        */
        getManagementBridge(): IManagement;
        /**
           @method
           Obtain a reference to the IMap bridge.

           @return {Adaptive.MapBridge} bridge instance.
        */
        getMapBridge(): IMap;
        /**
           @method
           Obtain a reference to the IMessaging bridge.

           @return {Adaptive.MessagingBridge} bridge instance.
        */
        getMessagingBridge(): IMessaging;
        /**
           @method
           Obtain a reference to the INFC bridge.

           @return {Adaptive.NFCBridge} bridge instance.
        */
        getNFCBridge(): INFC;
        /**
           @method
           Obtain a reference to the INetworkInfo bridge.

           @return {Adaptive.NetworkInfoBridge} bridge instance.
        */
        getNetworkInfoBridge(): INetworkInfo;
        /**
           @method
           Obtain a reference to the INetworkNaming bridge.

           @return {Adaptive.NetworkNamingBridge} bridge instance.
        */
        getNetworkNamingBridge(): INetworkNaming;
        /**
           @method
           Obtain a reference to the INetworkReachability bridge.

           @return {Adaptive.NetworkReachabilityBridge} bridge instance.
        */
        getNetworkReachabilityBridge(): INetworkReachability;
        /**
           @method
           Obtain a reference to the INetworkStatus bridge.

           @return {Adaptive.NetworkStatusBridge} bridge instance.
        */
        getNetworkStatusBridge(): INetworkStatus;
        /**
           @method
           Obtain a reference to the INotification bridge.

           @return {Adaptive.NotificationBridge} bridge instance.
        */
        getNotificationBridge(): INotification;
        /**
           @method
           Obtain a reference to the INotificationLocal bridge.

           @return {Adaptive.NotificationLocalBridge} bridge instance.
        */
        getNotificationLocalBridge(): INotificationLocal;
        /**
           @method
           Obtain a reference to the IOAuth bridge.

           @return {Adaptive.OAuthBridge} bridge instance.
        */
        getOAuthBridge(): IOAuth;
        /**
           @method
           Obtain a reference to the IOCR bridge.

           @return {Adaptive.OCRBridge} bridge instance.
        */
        getOCRBridge(): IOCR;
        /**
           @method
           Obtain a reference to the IOS bridge.

           @return {Adaptive.OSBridge} bridge instance.
        */
        getOSBridge(): IOS;
        /**
           @method
           Obtain a reference to the IOpenId bridge.

           @return {Adaptive.OpenIdBridge} bridge instance.
        */
        getOpenIdBridge(): IOpenId;
        /**
           @method
           Obtain a reference to the IPrinting bridge.

           @return {Adaptive.PrintingBridge} bridge instance.
        */
        getPrintingBridge(): IPrinting;
        /**
           @method
           Obtain a reference to the IProximity bridge.

           @return {Adaptive.ProximityBridge} bridge instance.
        */
        getProximityBridge(): IProximity;
        /**
           @method
           Obtain a reference to the IQRCode bridge.

           @return {Adaptive.QRCodeBridge} bridge instance.
        */
        getQRCodeBridge(): IQRCode;
        /**
           @method
           Obtain a reference to the IRSS bridge.

           @return {Adaptive.RSSBridge} bridge instance.
        */
        getRSSBridge(): IRSS;
        /**
           @method
           Obtain a reference to the IRuntime bridge.

           @return {Adaptive.RuntimeBridge} bridge instance.
        */
        getRuntimeBridge(): IRuntime;
        /**
           @method
           Obtain a reference to the ISecurity bridge.

           @return {Adaptive.SecurityBridge} bridge instance.
        */
        getSecurityBridge(): ISecurity;
        /**
           @method
           Obtain a reference to the IService bridge.

           @return {Adaptive.ServiceBridge} bridge instance.
        */
        getServiceBridge(): IService;
        /**
           @method
           Obtain a reference to the ISettings bridge.

           @return {Adaptive.SettingsBridge} bridge instance.
        */
        getSettingsBridge(): ISettings;
        /**
           @method
           Obtain a reference to the ISocket bridge.

           @return {Adaptive.SocketBridge} bridge instance.
        */
        getSocketBridge(): ISocket;
        /**
           @method
           Obtain a reference to the IStore bridge.

           @return {Adaptive.StoreBridge} bridge instance.
        */
        getStoreBridge(): IStore;
        /**
           @method
           Obtain a reference to the ITelephony bridge.

           @return {Adaptive.TelephonyBridge} bridge instance.
        */
        getTelephonyBridge(): ITelephony;
        /**
           @method
           Obtain a reference to the ITimer bridge.

           @return {Adaptive.TimerBridge} bridge instance.
        */
        getTimerBridge(): ITimer;
        /**
           @method
           Obtain a reference to the ITwitter bridge.

           @return {Adaptive.TwitterBridge} bridge instance.
        */
        getTwitterBridge(): ITwitter;
        /**
           @method
           Obtain a reference to the IUI bridge.

           @return {Adaptive.UIBridge} bridge instance.
        */
        getUIBridge(): IUI;
        /**
           @method
           Obtain a reference to the IUpdate bridge.

           @return {Adaptive.UpdateBridge} bridge instance.
        */
        getUpdateBridge(): IUpdate;
        /**
           @method
           Obtain a reference to the IVibration bridge.

           @return {Adaptive.VibrationBridge} bridge instance.
        */
        getVibrationBridge(): IVibration;
        /**
           @method
           Obtain a reference to the IVideo bridge.

           @return {Adaptive.VideoBridge} bridge instance.
        */
        getVideoBridge(): IVideo;
        /**
           @method
           Obtain a reference to the IWallet bridge.

           @return {Adaptive.WalletBridge} bridge instance.
        */
        getWalletBridge(): IWallet;
        /**
           @method
           Obtain a reference to the IXML bridge.

           @return {Adaptive.XMLBridge} bridge instance.
        */
        getXMLBridge(): IXML;
        /**
           @method
           Return the API version for the given interface.

           @return {string} The version of the API.
        */
        getAPIVersion(): string;
    }
    /**
       @enum {Adaptive.ContactAddressType} Adaptive.ContactAddressType
       Enumeration ContactAddressType
    */
    class ContactAddressType {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.ContactAddressType} [Home='Home']
        */
        static Home: ContactAddressType;
        /**
           @property {Adaptive.ContactAddressType} [Work='Work']
        */
        static Work: ContactAddressType;
        /**
           @property {Adaptive.ContactAddressType} [Other='Other']
        */
        static Other: ContactAddressType;
        /**
           @property {Adaptive.ContactAddressType} [Unknown='Unknown']
        */
        static Unknown: ContactAddressType;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ContactAddressType}
        */
        static toObject(object: any): ContactAddressType;
    }
    /**
       @enum {Adaptive.ContactEmailType} Adaptive.ContactEmailType
       Enumeration ContactEmailType
    */
    class ContactEmailType {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.ContactEmailType} [Personal='Personal']
        */
        static Personal: ContactEmailType;
        /**
           @property {Adaptive.ContactEmailType} [Work='Work']
        */
        static Work: ContactEmailType;
        /**
           @property {Adaptive.ContactEmailType} [Other='Other']
        */
        static Other: ContactEmailType;
        /**
           @property {Adaptive.ContactEmailType} [Unknown='Unknown']
        */
        static Unknown: ContactEmailType;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ContactEmailType}
        */
        static toObject(object: any): ContactEmailType;
    }
    /**
       @enum {Adaptive.ContactPersonalInfoTitle} Adaptive.ContactPersonalInfoTitle
       Enumeration ContactPersonalInfoTitle
    */
    class ContactPersonalInfoTitle {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.ContactPersonalInfoTitle} [Mr='Mr']
        */
        static Mr: ContactPersonalInfoTitle;
        /**
           @property {Adaptive.ContactPersonalInfoTitle} [Mrs='Mrs']
        */
        static Mrs: ContactPersonalInfoTitle;
        /**
           @property {Adaptive.ContactPersonalInfoTitle} [Ms='Ms']
        */
        static Ms: ContactPersonalInfoTitle;
        /**
           @property {Adaptive.ContactPersonalInfoTitle} [Dr='Dr']
        */
        static Dr: ContactPersonalInfoTitle;
        /**
           @property {Adaptive.ContactPersonalInfoTitle} [Unknown='Unknown']
        */
        static Unknown: ContactPersonalInfoTitle;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ContactPersonalInfoTitle}
        */
        static toObject(object: any): ContactPersonalInfoTitle;
    }
    /**
       @enum {Adaptive.ContactPhoneType} Adaptive.ContactPhoneType
       Enumeration ContactPhoneType
    */
    class ContactPhoneType {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.ContactPhoneType} [Mobile='Mobile']
        */
        static Mobile: ContactPhoneType;
        /**
           @property {Adaptive.ContactPhoneType} [Work='Work']
        */
        static Work: ContactPhoneType;
        /**
           @property {Adaptive.ContactPhoneType} [Home='Home']
        */
        static Home: ContactPhoneType;
        /**
           @property {Adaptive.ContactPhoneType} [Main='Main']
        */
        static Main: ContactPhoneType;
        /**
           @property {Adaptive.ContactPhoneType} [HomeFax='HomeFax']
        */
        static HomeFax: ContactPhoneType;
        /**
           @property {Adaptive.ContactPhoneType} [WorkFax='WorkFax']
        */
        static WorkFax: ContactPhoneType;
        /**
           @property {Adaptive.ContactPhoneType} [Other='Other']
        */
        static Other: ContactPhoneType;
        /**
           @property {Adaptive.ContactPhoneType} [Unknown='Unknown']
        */
        static Unknown: ContactPhoneType;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ContactPhoneType}
        */
        static toObject(object: any): ContactPhoneType;
    }
    /**
       @enum {Adaptive.ContactSocialNetwork} Adaptive.ContactSocialNetwork
       Enumeration ContactSocialNetwork
    */
    class ContactSocialNetwork {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.ContactSocialNetwork} [Twitter='Twitter']
        */
        static Twitter: ContactSocialNetwork;
        /**
           @property {Adaptive.ContactSocialNetwork} [Facebook='Facebook']
        */
        static Facebook: ContactSocialNetwork;
        /**
           @property {Adaptive.ContactSocialNetwork} [GooglePlus='GooglePlus']
        */
        static GooglePlus: ContactSocialNetwork;
        /**
           @property {Adaptive.ContactSocialNetwork} [LinkedIn='LinkedIn']
        */
        static LinkedIn: ContactSocialNetwork;
        /**
           @property {Adaptive.ContactSocialNetwork} [Flickr='Flickr']
        */
        static Flickr: ContactSocialNetwork;
        /**
           @property {Adaptive.ContactSocialNetwork} [Unknown='Unknown']
        */
        static Unknown: ContactSocialNetwork;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ContactSocialNetwork}
        */
        static toObject(object: any): ContactSocialNetwork;
    }
    /**
       @enum {Adaptive.IAccelerationListenerError} Adaptive.IAccelerationListenerError
       Enumeration IAccelerationListenerError
    */
    class IAccelerationListenerError {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IAccelerationListenerError} [Unauthorized='Unauthorized']
        */
        static Unauthorized: IAccelerationListenerError;
        /**
           @property {Adaptive.IAccelerationListenerError} [Unavailable='Unavailable']
        */
        static Unavailable: IAccelerationListenerError;
        /**
           @property {Adaptive.IAccelerationListenerError} [Unknown='Unknown']
        */
        static Unknown: IAccelerationListenerError;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IAccelerationListenerError}
        */
        static toObject(object: any): IAccelerationListenerError;
    }
    /**
       @enum {Adaptive.IAccelerationListenerWarning} Adaptive.IAccelerationListenerWarning
       Enumeration IAccelerationListenerWarning
    */
    class IAccelerationListenerWarning {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IAccelerationListenerWarning} [NeedsCalibration='NeedsCalibration']
        */
        static NeedsCalibration: IAccelerationListenerWarning;
        /**
           @property {Adaptive.IAccelerationListenerWarning} [Stale='Stale']
        */
        static Stale: IAccelerationListenerWarning;
        /**
           @property {Adaptive.IAccelerationListenerWarning} [Unknown='Unknown']
        */
        static Unknown: IAccelerationListenerWarning;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IAccelerationListenerWarning}
        */
        static toObject(object: any): IAccelerationListenerWarning;
    }
    /**
       @enum {Adaptive.IAdaptiveRPGroup} Adaptive.IAdaptiveRPGroup
       Enumeration IAdaptiveRPGroup
    */
    class IAdaptiveRPGroup {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IAdaptiveRPGroup} [Application='Application']
        */
        static Application: IAdaptiveRPGroup;
        /**
           @property {Adaptive.IAdaptiveRPGroup} [Commerce='Commerce']
        */
        static Commerce: IAdaptiveRPGroup;
        /**
           @property {Adaptive.IAdaptiveRPGroup} [Communication='Communication']
        */
        static Communication: IAdaptiveRPGroup;
        /**
           @property {Adaptive.IAdaptiveRPGroup} [Data='Data']
        */
        static Data: IAdaptiveRPGroup;
        /**
           @property {Adaptive.IAdaptiveRPGroup} [Media='Media']
        */
        static Media: IAdaptiveRPGroup;
        /**
           @property {Adaptive.IAdaptiveRPGroup} [Notification='Notification']
        */
        static Notification: IAdaptiveRPGroup;
        /**
           @property {Adaptive.IAdaptiveRPGroup} [PIM='PIM']
        */
        static PIM: IAdaptiveRPGroup;
        /**
           @property {Adaptive.IAdaptiveRPGroup} [Reader='Reader']
        */
        static Reader: IAdaptiveRPGroup;
        /**
           @property {Adaptive.IAdaptiveRPGroup} [Security='Security']
        */
        static Security: IAdaptiveRPGroup;
        /**
           @property {Adaptive.IAdaptiveRPGroup} [Sensor='Sensor']
        */
        static Sensor: IAdaptiveRPGroup;
        /**
           @property {Adaptive.IAdaptiveRPGroup} [Social='Social']
        */
        static Social: IAdaptiveRPGroup;
        /**
           @property {Adaptive.IAdaptiveRPGroup} [System='System']
        */
        static System: IAdaptiveRPGroup;
        /**
           @property {Adaptive.IAdaptiveRPGroup} [UI='UI']
        */
        static UI: IAdaptiveRPGroup;
        /**
           @property {Adaptive.IAdaptiveRPGroup} [Util='Util']
        */
        static Util: IAdaptiveRPGroup;
        /**
           @property {Adaptive.IAdaptiveRPGroup} [Kernel='Kernel']
        */
        static Kernel: IAdaptiveRPGroup;
        /**
           @property {Adaptive.IAdaptiveRPGroup} [Unknown='Unknown']
        */
        static Unknown: IAdaptiveRPGroup;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IAdaptiveRPGroup}
        */
        static toObject(object: any): IAdaptiveRPGroup;
    }
    /**
       @enum {Adaptive.IButtonListenerError} Adaptive.IButtonListenerError
       Enumeration IButtonListenerError
    */
    class IButtonListenerError {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IButtonListenerError} [NotPresent='NotPresent']
        */
        static NotPresent: IButtonListenerError;
        /**
           @property {Adaptive.IButtonListenerError} [Unknown='Unknown']
        */
        static Unknown: IButtonListenerError;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IButtonListenerError}
        */
        static toObject(object: any): IButtonListenerError;
    }
    /**
       @enum {Adaptive.IButtonListenerWarning} Adaptive.IButtonListenerWarning
       Enumeration IButtonListenerWarning
    */
    class IButtonListenerWarning {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IButtonListenerWarning} [NotImplemented='NotImplemented']
        */
        static NotImplemented: IButtonListenerWarning;
        /**
           @property {Adaptive.IButtonListenerWarning} [Unknown='Unknown']
        */
        static Unknown: IButtonListenerWarning;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IButtonListenerWarning}
        */
        static toObject(object: any): IButtonListenerWarning;
    }
    /**
       @enum {Adaptive.ICapabilitiesButton} Adaptive.ICapabilitiesButton
       Enumeration ICapabilitiesButton
    */
    class ICapabilitiesButton {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.ICapabilitiesButton} [HomeButton='HomeButton']
        */
        static HomeButton: ICapabilitiesButton;
        /**
           @property {Adaptive.ICapabilitiesButton} [BackButton='BackButton']
        */
        static BackButton: ICapabilitiesButton;
        /**
           @property {Adaptive.ICapabilitiesButton} [OptionButton='OptionButton']
        */
        static OptionButton: ICapabilitiesButton;
        /**
           @property {Adaptive.ICapabilitiesButton} [Unknown='Unknown']
        */
        static Unknown: ICapabilitiesButton;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ICapabilitiesButton}
        */
        static toObject(object: any): ICapabilitiesButton;
    }
    /**
       @enum {Adaptive.ICapabilitiesCommunication} Adaptive.ICapabilitiesCommunication
       Enumeration ICapabilitiesCommunication
    */
    class ICapabilitiesCommunication {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.ICapabilitiesCommunication} [Calendar='Calendar']
        */
        static Calendar: ICapabilitiesCommunication;
        /**
           @property {Adaptive.ICapabilitiesCommunication} [Contact='Contact']
        */
        static Contact: ICapabilitiesCommunication;
        /**
           @property {Adaptive.ICapabilitiesCommunication} [Mail='Mail']
        */
        static Mail: ICapabilitiesCommunication;
        /**
           @property {Adaptive.ICapabilitiesCommunication} [Messaging='Messaging']
        */
        static Messaging: ICapabilitiesCommunication;
        /**
           @property {Adaptive.ICapabilitiesCommunication} [Telephony='Telephony']
        */
        static Telephony: ICapabilitiesCommunication;
        /**
           @property {Adaptive.ICapabilitiesCommunication} [Unknown='Unknown']
        */
        static Unknown: ICapabilitiesCommunication;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ICapabilitiesCommunication}
        */
        static toObject(object: any): ICapabilitiesCommunication;
    }
    /**
       @enum {Adaptive.ICapabilitiesData} Adaptive.ICapabilitiesData
       Enumeration ICapabilitiesData
    */
    class ICapabilitiesData {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.ICapabilitiesData} [Database='Database']
        */
        static Database: ICapabilitiesData;
        /**
           @property {Adaptive.ICapabilitiesData} [File='File']
        */
        static File: ICapabilitiesData;
        /**
           @property {Adaptive.ICapabilitiesData} [Cloud='Cloud']
        */
        static Cloud: ICapabilitiesData;
        /**
           @property {Adaptive.ICapabilitiesData} [Unknown='Unknown']
        */
        static Unknown: ICapabilitiesData;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ICapabilitiesData}
        */
        static toObject(object: any): ICapabilitiesData;
    }
    /**
       @enum {Adaptive.ICapabilitiesMedia} Adaptive.ICapabilitiesMedia
       Enumeration ICapabilitiesMedia
    */
    class ICapabilitiesMedia {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.ICapabilitiesMedia} [AudioPlayback='AudioPlayback']
        */
        static AudioPlayback: ICapabilitiesMedia;
        /**
           @property {Adaptive.ICapabilitiesMedia} [AudioRecording='AudioRecording']
        */
        static AudioRecording: ICapabilitiesMedia;
        /**
           @property {Adaptive.ICapabilitiesMedia} [Camera='Camera']
        */
        static Camera: ICapabilitiesMedia;
        /**
           @property {Adaptive.ICapabilitiesMedia} [VideoPlayback='VideoPlayback']
        */
        static VideoPlayback: ICapabilitiesMedia;
        /**
           @property {Adaptive.ICapabilitiesMedia} [VideoRecording='VideoRecording']
        */
        static VideoRecording: ICapabilitiesMedia;
        /**
           @property {Adaptive.ICapabilitiesMedia} [Unknown='Unknown']
        */
        static Unknown: ICapabilitiesMedia;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ICapabilitiesMedia}
        */
        static toObject(object: any): ICapabilitiesMedia;
    }
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
    /**
       @enum {Adaptive.ICapabilitiesNotification} Adaptive.ICapabilitiesNotification
       Enumeration ICapabilitiesNotification
    */
    class ICapabilitiesNotification {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.ICapabilitiesNotification} [Alarm='Alarm']
        */
        static Alarm: ICapabilitiesNotification;
        /**
           @property {Adaptive.ICapabilitiesNotification} [LocalNotification='LocalNotification']
        */
        static LocalNotification: ICapabilitiesNotification;
        /**
           @property {Adaptive.ICapabilitiesNotification} [RemoteNotification='RemoteNotification']
        */
        static RemoteNotification: ICapabilitiesNotification;
        /**
           @property {Adaptive.ICapabilitiesNotification} [Vibration='Vibration']
        */
        static Vibration: ICapabilitiesNotification;
        /**
           @property {Adaptive.ICapabilitiesNotification} [Unknown='Unknown']
        */
        static Unknown: ICapabilitiesNotification;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ICapabilitiesNotification}
        */
        static toObject(object: any): ICapabilitiesNotification;
    }
    /**
       @enum {Adaptive.ICapabilitiesOrientation} Adaptive.ICapabilitiesOrientation
       Enumeration ICapabilitiesOrientation
    */
    class ICapabilitiesOrientation {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.ICapabilitiesOrientation} [PortraitUp='PortraitUp']
        */
        static PortraitUp: ICapabilitiesOrientation;
        /**
           @property {Adaptive.ICapabilitiesOrientation} [PortraitDown='PortraitDown']
        */
        static PortraitDown: ICapabilitiesOrientation;
        /**
           @property {Adaptive.ICapabilitiesOrientation} [LandscapeLeft='LandscapeLeft']
        */
        static LandscapeLeft: ICapabilitiesOrientation;
        /**
           @property {Adaptive.ICapabilitiesOrientation} [LandscapeRight='LandscapeRight']
        */
        static LandscapeRight: ICapabilitiesOrientation;
        /**
           @property {Adaptive.ICapabilitiesOrientation} [Unknown='Unknown']
        */
        static Unknown: ICapabilitiesOrientation;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ICapabilitiesOrientation}
        */
        static toObject(object: any): ICapabilitiesOrientation;
    }
    /**
       @enum {Adaptive.ICapabilitiesSensor} Adaptive.ICapabilitiesSensor
       Enumeration ICapabilitiesSensor
    */
    class ICapabilitiesSensor {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.ICapabilitiesSensor} [Accelerometer='Accelerometer']
        */
        static Accelerometer: ICapabilitiesSensor;
        /**
           @property {Adaptive.ICapabilitiesSensor} [AmbientLight='AmbientLight']
        */
        static AmbientLight: ICapabilitiesSensor;
        /**
           @property {Adaptive.ICapabilitiesSensor} [Barometer='Barometer']
        */
        static Barometer: ICapabilitiesSensor;
        /**
           @property {Adaptive.ICapabilitiesSensor} [Geolocation='Geolocation']
        */
        static Geolocation: ICapabilitiesSensor;
        /**
           @property {Adaptive.ICapabilitiesSensor} [Gyroscope='Gyroscope']
        */
        static Gyroscope: ICapabilitiesSensor;
        /**
           @property {Adaptive.ICapabilitiesSensor} [Magnetometer='Magnetometer']
        */
        static Magnetometer: ICapabilitiesSensor;
        /**
           @property {Adaptive.ICapabilitiesSensor} [Proximity='Proximity']
        */
        static Proximity: ICapabilitiesSensor;
        /**
           @property {Adaptive.ICapabilitiesSensor} [Unknown='Unknown']
        */
        static Unknown: ICapabilitiesSensor;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ICapabilitiesSensor}
        */
        static toObject(object: any): ICapabilitiesSensor;
    }
    /**
       @enum {Adaptive.IContactFieldGroup} Adaptive.IContactFieldGroup
       Enumeration IContactFieldGroup
    */
    class IContactFieldGroup {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IContactFieldGroup} [PersonalInfo='PersonalInfo']
        */
        static PersonalInfo: IContactFieldGroup;
        /**
           @property {Adaptive.IContactFieldGroup} [ProfessionalInfo='ProfessionalInfo']
        */
        static ProfessionalInfo: IContactFieldGroup;
        /**
           @property {Adaptive.IContactFieldGroup} [Addresses='Addresses']
        */
        static Addresses: IContactFieldGroup;
        /**
           @property {Adaptive.IContactFieldGroup} [Phones='Phones']
        */
        static Phones: IContactFieldGroup;
        /**
           @property {Adaptive.IContactFieldGroup} [Emails='Emails']
        */
        static Emails: IContactFieldGroup;
        /**
           @property {Adaptive.IContactFieldGroup} [Websites='Websites']
        */
        static Websites: IContactFieldGroup;
        /**
           @property {Adaptive.IContactFieldGroup} [Socials='Socials']
        */
        static Socials: IContactFieldGroup;
        /**
           @property {Adaptive.IContactFieldGroup} [Tags='Tags']
        */
        static Tags: IContactFieldGroup;
        /**
           @property {Adaptive.IContactFieldGroup} [Unknown='Unknown']
        */
        static Unknown: IContactFieldGroup;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IContactFieldGroup}
        */
        static toObject(object: any): IContactFieldGroup;
    }
    /**
       @enum {Adaptive.IContactFilter} Adaptive.IContactFilter
       Enumeration IContactFilter
    */
    class IContactFilter {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IContactFilter} [HasPhone='HasPhone']
        */
        static HasPhone: IContactFilter;
        /**
           @property {Adaptive.IContactFilter} [HasEmail='HasEmail']
        */
        static HasEmail: IContactFilter;
        /**
           @property {Adaptive.IContactFilter} [HasAddress='HasAddress']
        */
        static HasAddress: IContactFilter;
        /**
           @property {Adaptive.IContactFilter} [Unknown='Unknown']
        */
        static Unknown: IContactFilter;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IContactFilter}
        */
        static toObject(object: any): IContactFilter;
    }
    /**
       @enum {Adaptive.IContactPhotoResultCallbackError} Adaptive.IContactPhotoResultCallbackError
       Enumeration IContactPhotoResultCallbackError
    */
    class IContactPhotoResultCallbackError {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IContactPhotoResultCallbackError} [NoPermission='NoPermission']
        */
        static NoPermission: IContactPhotoResultCallbackError;
        /**
           @property {Adaptive.IContactPhotoResultCallbackError} [WrongParams='WrongParams']
        */
        static WrongParams: IContactPhotoResultCallbackError;
        /**
           @property {Adaptive.IContactPhotoResultCallbackError} [NoPhoto='NoPhoto']
        */
        static NoPhoto: IContactPhotoResultCallbackError;
        /**
           @property {Adaptive.IContactPhotoResultCallbackError} [Unknown='Unknown']
        */
        static Unknown: IContactPhotoResultCallbackError;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IContactPhotoResultCallbackError}
        */
        static toObject(object: any): IContactPhotoResultCallbackError;
    }
    /**
       @enum {Adaptive.IContactPhotoResultCallbackWarning} Adaptive.IContactPhotoResultCallbackWarning
       Enumeration IContactPhotoResultCallbackWarning
    */
    class IContactPhotoResultCallbackWarning {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IContactPhotoResultCallbackWarning} [LimitExceeded='LimitExceeded']
        */
        static LimitExceeded: IContactPhotoResultCallbackWarning;
        /**
           @property {Adaptive.IContactPhotoResultCallbackWarning} [NoMatches='NoMatches']
        */
        static NoMatches: IContactPhotoResultCallbackWarning;
        /**
           @property {Adaptive.IContactPhotoResultCallbackWarning} [Unknown='Unknown']
        */
        static Unknown: IContactPhotoResultCallbackWarning;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IContactPhotoResultCallbackWarning}
        */
        static toObject(object: any): IContactPhotoResultCallbackWarning;
    }
    /**
       @enum {Adaptive.IContactResultCallbackError} Adaptive.IContactResultCallbackError
       Enumeration IContactResultCallbackError
    */
    class IContactResultCallbackError {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IContactResultCallbackError} [NoPermission='NoPermission']
        */
        static NoPermission: IContactResultCallbackError;
        /**
           @property {Adaptive.IContactResultCallbackError} [WrongParams='WrongParams']
        */
        static WrongParams: IContactResultCallbackError;
        /**
           @property {Adaptive.IContactResultCallbackError} [Unknown='Unknown']
        */
        static Unknown: IContactResultCallbackError;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IContactResultCallbackError}
        */
        static toObject(object: any): IContactResultCallbackError;
    }
    /**
       @enum {Adaptive.IContactResultCallbackWarning} Adaptive.IContactResultCallbackWarning
       Enumeration IContactResultCallbackWarning
    */
    class IContactResultCallbackWarning {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IContactResultCallbackWarning} [LimitExceeded='LimitExceeded']
        */
        static LimitExceeded: IContactResultCallbackWarning;
        /**
           @property {Adaptive.IContactResultCallbackWarning} [NoMatches='NoMatches']
        */
        static NoMatches: IContactResultCallbackWarning;
        /**
           @property {Adaptive.IContactResultCallbackWarning} [Unknown='Unknown']
        */
        static Unknown: IContactResultCallbackWarning;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IContactResultCallbackWarning}
        */
        static toObject(object: any): IContactResultCallbackWarning;
    }
    /**
       @enum {Adaptive.IDatabaseResultCallbackError} Adaptive.IDatabaseResultCallbackError
       Enumeration IDatabaseResultCallbackError
    */
    class IDatabaseResultCallbackError {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IDatabaseResultCallbackError} [NoSpace='NoSpace']
        */
        static NoSpace: IDatabaseResultCallbackError;
        /**
           @property {Adaptive.IDatabaseResultCallbackError} [SqlException='SqlException']
        */
        static SqlException: IDatabaseResultCallbackError;
        /**
           @property {Adaptive.IDatabaseResultCallbackError} [NotDeleted='NotDeleted']
        */
        static NotDeleted: IDatabaseResultCallbackError;
        /**
           @property {Adaptive.IDatabaseResultCallbackError} [Unknown='Unknown']
        */
        static Unknown: IDatabaseResultCallbackError;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IDatabaseResultCallbackError}
        */
        static toObject(object: any): IDatabaseResultCallbackError;
    }
    /**
       @enum {Adaptive.IDatabaseResultCallbackWarning} Adaptive.IDatabaseResultCallbackWarning
       Enumeration IDatabaseResultCallbackWarning
    */
    class IDatabaseResultCallbackWarning {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IDatabaseResultCallbackWarning} [DatabaseExists='DatabaseExists']
        */
        static DatabaseExists: IDatabaseResultCallbackWarning;
        /**
           @property {Adaptive.IDatabaseResultCallbackWarning} [IsOpen='IsOpen']
        */
        static IsOpen: IDatabaseResultCallbackWarning;
        /**
           @property {Adaptive.IDatabaseResultCallbackWarning} [Unknown='Unknown']
        */
        static Unknown: IDatabaseResultCallbackWarning;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IDatabaseResultCallbackWarning}
        */
        static toObject(object: any): IDatabaseResultCallbackWarning;
    }
    /**
       @enum {Adaptive.IDatabaseTableResultCallbackError} Adaptive.IDatabaseTableResultCallbackError
       Enumeration IDatabaseTableResultCallbackError
    */
    class IDatabaseTableResultCallbackError {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IDatabaseTableResultCallbackError} [NoSpace='NoSpace']
        */
        static NoSpace: IDatabaseTableResultCallbackError;
        /**
           @property {Adaptive.IDatabaseTableResultCallbackError} [ReadOnlyTable='ReadOnlyTable']
        */
        static ReadOnlyTable: IDatabaseTableResultCallbackError;
        /**
           @property {Adaptive.IDatabaseTableResultCallbackError} [SqlException='SqlException']
        */
        static SqlException: IDatabaseTableResultCallbackError;
        /**
           @property {Adaptive.IDatabaseTableResultCallbackError} [DatabaseNotFound='DatabaseNotFound']
        */
        static DatabaseNotFound: IDatabaseTableResultCallbackError;
        /**
           @property {Adaptive.IDatabaseTableResultCallbackError} [NoTableFound='NoTableFound']
        */
        static NoTableFound: IDatabaseTableResultCallbackError;
        /**
           @property {Adaptive.IDatabaseTableResultCallbackError} [Unknown='Unknown']
        */
        static Unknown: IDatabaseTableResultCallbackError;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IDatabaseTableResultCallbackError}
        */
        static toObject(object: any): IDatabaseTableResultCallbackError;
    }
    /**
       @enum {Adaptive.IDatabaseTableResultCallbackWarning} Adaptive.IDatabaseTableResultCallbackWarning
       Enumeration IDatabaseTableResultCallbackWarning
    */
    class IDatabaseTableResultCallbackWarning {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IDatabaseTableResultCallbackWarning} [TableExists='TableExists']
        */
        static TableExists: IDatabaseTableResultCallbackWarning;
        /**
           @property {Adaptive.IDatabaseTableResultCallbackWarning} [TableLocked='TableLocked']
        */
        static TableLocked: IDatabaseTableResultCallbackWarning;
        /**
           @property {Adaptive.IDatabaseTableResultCallbackWarning} [NoResults='NoResults']
        */
        static NoResults: IDatabaseTableResultCallbackWarning;
        /**
           @property {Adaptive.IDatabaseTableResultCallbackWarning} [Unknown='Unknown']
        */
        static Unknown: IDatabaseTableResultCallbackWarning;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IDatabaseTableResultCallbackWarning}
        */
        static toObject(object: any): IDatabaseTableResultCallbackWarning;
    }
    /**
       @enum {Adaptive.IDeviceOrientationListenerError} Adaptive.IDeviceOrientationListenerError
       Enumeration IDeviceOrientationListenerError
    */
    class IDeviceOrientationListenerError {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IDeviceOrientationListenerError} [Unknown='Unknown']
        */
        static Unknown: IDeviceOrientationListenerError;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IDeviceOrientationListenerError}
        */
        static toObject(object: any): IDeviceOrientationListenerError;
    }
    /**
       @enum {Adaptive.IDeviceOrientationListenerWarning} Adaptive.IDeviceOrientationListenerWarning
       Enumeration IDeviceOrientationListenerWarning
    */
    class IDeviceOrientationListenerWarning {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IDeviceOrientationListenerWarning} [Unknown='Unknown']
        */
        static Unknown: IDeviceOrientationListenerWarning;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IDeviceOrientationListenerWarning}
        */
        static toObject(object: any): IDeviceOrientationListenerWarning;
    }
    /**
       @enum {Adaptive.IDisplayOrientationListenerError} Adaptive.IDisplayOrientationListenerError
       Enumeration IDisplayOrientationListenerError
    */
    class IDisplayOrientationListenerError {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IDisplayOrientationListenerError} [Unknown='Unknown']
        */
        static Unknown: IDisplayOrientationListenerError;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IDisplayOrientationListenerError}
        */
        static toObject(object: any): IDisplayOrientationListenerError;
    }
    /**
       @enum {Adaptive.IDisplayOrientationListenerWarning} Adaptive.IDisplayOrientationListenerWarning
       Enumeration IDisplayOrientationListenerWarning
    */
    class IDisplayOrientationListenerWarning {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IDisplayOrientationListenerWarning} [ApplicationVetoed='ApplicationVetoed']
        */
        static ApplicationVetoed: IDisplayOrientationListenerWarning;
        /**
           @property {Adaptive.IDisplayOrientationListenerWarning} [Unknown='Unknown']
        */
        static Unknown: IDisplayOrientationListenerWarning;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IDisplayOrientationListenerWarning}
        */
        static toObject(object: any): IDisplayOrientationListenerWarning;
    }
    /**
       @enum {Adaptive.IFileDataLoadResultCallbackError} Adaptive.IFileDataLoadResultCallbackError
       Enumeration IFileDataLoadResultCallbackError
    */
    class IFileDataLoadResultCallbackError {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IFileDataLoadResultCallbackError} [InexistentFile='InexistentFile']
        */
        static InexistentFile: IFileDataLoadResultCallbackError;
        /**
           @property {Adaptive.IFileDataLoadResultCallbackError} [InsufficientSpace='InsufficientSpace']
        */
        static InsufficientSpace: IFileDataLoadResultCallbackError;
        /**
           @property {Adaptive.IFileDataLoadResultCallbackError} [Unauthorized='Unauthorized']
        */
        static Unauthorized: IFileDataLoadResultCallbackError;
        /**
           @property {Adaptive.IFileDataLoadResultCallbackError} [Unknown='Unknown']
        */
        static Unknown: IFileDataLoadResultCallbackError;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IFileDataLoadResultCallbackError}
        */
        static toObject(object: any): IFileDataLoadResultCallbackError;
    }
    /**
       @enum {Adaptive.IFileDataLoadResultCallbackWarning} Adaptive.IFileDataLoadResultCallbackWarning
       Enumeration IFileDataLoadResultCallbackWarning
    */
    class IFileDataLoadResultCallbackWarning {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IFileDataLoadResultCallbackWarning} [ExceedMaximumSize='ExceedMaximumSize']
        */
        static ExceedMaximumSize: IFileDataLoadResultCallbackWarning;
        /**
           @property {Adaptive.IFileDataLoadResultCallbackWarning} [Unknown='Unknown']
        */
        static Unknown: IFileDataLoadResultCallbackWarning;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IFileDataLoadResultCallbackWarning}
        */
        static toObject(object: any): IFileDataLoadResultCallbackWarning;
    }
    /**
       @enum {Adaptive.IFileDataStoreResultCallbackError} Adaptive.IFileDataStoreResultCallbackError
       Enumeration IFileDataStoreResultCallbackError
    */
    class IFileDataStoreResultCallbackError {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IFileDataStoreResultCallbackError} [InexistentFile='InexistentFile']
        */
        static InexistentFile: IFileDataStoreResultCallbackError;
        /**
           @property {Adaptive.IFileDataStoreResultCallbackError} [InsufficientSpace='InsufficientSpace']
        */
        static InsufficientSpace: IFileDataStoreResultCallbackError;
        /**
           @property {Adaptive.IFileDataStoreResultCallbackError} [Unauthorized='Unauthorized']
        */
        static Unauthorized: IFileDataStoreResultCallbackError;
        /**
           @property {Adaptive.IFileDataStoreResultCallbackError} [Unknown='Unknown']
        */
        static Unknown: IFileDataStoreResultCallbackError;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IFileDataStoreResultCallbackError}
        */
        static toObject(object: any): IFileDataStoreResultCallbackError;
    }
    /**
       @enum {Adaptive.IFileDataStoreResultCallbackWarning} Adaptive.IFileDataStoreResultCallbackWarning
       Enumeration IFileDataStoreResultCallbackWarning
    */
    class IFileDataStoreResultCallbackWarning {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IFileDataStoreResultCallbackWarning} [ExceedMaximumSize='ExceedMaximumSize']
        */
        static ExceedMaximumSize: IFileDataStoreResultCallbackWarning;
        /**
           @property {Adaptive.IFileDataStoreResultCallbackWarning} [Unknown='Unknown']
        */
        static Unknown: IFileDataStoreResultCallbackWarning;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IFileDataStoreResultCallbackWarning}
        */
        static toObject(object: any): IFileDataStoreResultCallbackWarning;
    }
    /**
       @enum {Adaptive.IFileListResultCallbackError} Adaptive.IFileListResultCallbackError
       Enumeration IFileListResultCallbackError
    */
    class IFileListResultCallbackError {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IFileListResultCallbackError} [InexistentFile='InexistentFile']
        */
        static InexistentFile: IFileListResultCallbackError;
        /**
           @property {Adaptive.IFileListResultCallbackError} [Unauthorized='Unauthorized']
        */
        static Unauthorized: IFileListResultCallbackError;
        /**
           @property {Adaptive.IFileListResultCallbackError} [Unknown='Unknown']
        */
        static Unknown: IFileListResultCallbackError;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IFileListResultCallbackError}
        */
        static toObject(object: any): IFileListResultCallbackError;
    }
    /**
       @enum {Adaptive.IFileListResultCallbackWarning} Adaptive.IFileListResultCallbackWarning
       Enumeration IFileListResultCallbackWarning
    */
    class IFileListResultCallbackWarning {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IFileListResultCallbackWarning} [PartialResult='PartialResult']
        */
        static PartialResult: IFileListResultCallbackWarning;
        /**
           @property {Adaptive.IFileListResultCallbackWarning} [Unknown='Unknown']
        */
        static Unknown: IFileListResultCallbackWarning;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IFileListResultCallbackWarning}
        */
        static toObject(object: any): IFileListResultCallbackWarning;
    }
    /**
       @enum {Adaptive.IFileResultCallbackError} Adaptive.IFileResultCallbackError
       Enumeration IFileResultCallbackError
    */
    class IFileResultCallbackError {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IFileResultCallbackError} [FileExists='FileExists']
        */
        static FileExists: IFileResultCallbackError;
        /**
           @property {Adaptive.IFileResultCallbackError} [SourceInexistent='SourceInexistent']
        */
        static SourceInexistent: IFileResultCallbackError;
        /**
           @property {Adaptive.IFileResultCallbackError} [DestionationExists='DestionationExists']
        */
        static DestionationExists: IFileResultCallbackError;
        /**
           @property {Adaptive.IFileResultCallbackError} [InsufficientSpace='InsufficientSpace']
        */
        static InsufficientSpace: IFileResultCallbackError;
        /**
           @property {Adaptive.IFileResultCallbackError} [Unauthorized='Unauthorized']
        */
        static Unauthorized: IFileResultCallbackError;
        /**
           @property {Adaptive.IFileResultCallbackError} [Unknown='Unknown']
        */
        static Unknown: IFileResultCallbackError;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IFileResultCallbackError}
        */
        static toObject(object: any): IFileResultCallbackError;
    }
    /**
       @enum {Adaptive.IFileResultCallbackWarning} Adaptive.IFileResultCallbackWarning
       Enumeration IFileResultCallbackWarning
    */
    class IFileResultCallbackWarning {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IFileResultCallbackWarning} [SourceNotDeleted='SourceNotDeleted']
        */
        static SourceNotDeleted: IFileResultCallbackWarning;
        /**
           @property {Adaptive.IFileResultCallbackWarning} [RootDirectory='RootDirectory']
        */
        static RootDirectory: IFileResultCallbackWarning;
        /**
           @property {Adaptive.IFileResultCallbackWarning} [Unknown='Unknown']
        */
        static Unknown: IFileResultCallbackWarning;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IFileResultCallbackWarning}
        */
        static toObject(object: any): IFileResultCallbackWarning;
    }
    /**
       @enum {Adaptive.IFileSystemSecurity} Adaptive.IFileSystemSecurity
       Enumeration IFileSystemSecurity
    */
    class IFileSystemSecurity {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IFileSystemSecurity} [Default='Default']
        */
        static Default: IFileSystemSecurity;
        /**
           @property {Adaptive.IFileSystemSecurity} [Protected='Protected']
        */
        static Protected: IFileSystemSecurity;
        /**
           @property {Adaptive.IFileSystemSecurity} [Encrypted='Encrypted']
        */
        static Encrypted: IFileSystemSecurity;
        /**
           @property {Adaptive.IFileSystemSecurity} [Unknown='Unknown']
        */
        static Unknown: IFileSystemSecurity;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IFileSystemSecurity}
        */
        static toObject(object: any): IFileSystemSecurity;
    }
    /**
       @enum {Adaptive.IFileSystemStorageType} Adaptive.IFileSystemStorageType
       Enumeration IFileSystemStorageType
    */
    class IFileSystemStorageType {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IFileSystemStorageType} [Application='Application']
        */
        static Application: IFileSystemStorageType;
        /**
           @property {Adaptive.IFileSystemStorageType} [Document='Document']
        */
        static Document: IFileSystemStorageType;
        /**
           @property {Adaptive.IFileSystemStorageType} [Cloud='Cloud']
        */
        static Cloud: IFileSystemStorageType;
        /**
           @property {Adaptive.IFileSystemStorageType} [Protected='Protected']
        */
        static Protected: IFileSystemStorageType;
        /**
           @property {Adaptive.IFileSystemStorageType} [Cache='Cache']
        */
        static Cache: IFileSystemStorageType;
        /**
           @property {Adaptive.IFileSystemStorageType} [External='External']
        */
        static External: IFileSystemStorageType;
        /**
           @property {Adaptive.IFileSystemStorageType} [Unknown='Unknown']
        */
        static Unknown: IFileSystemStorageType;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IFileSystemStorageType}
        */
        static toObject(object: any): IFileSystemStorageType;
    }
    /**
       @enum {Adaptive.IFileSystemType} Adaptive.IFileSystemType
       Enumeration IFileSystemType
    */
    class IFileSystemType {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IFileSystemType} [Directory='Directory']
        */
        static Directory: IFileSystemType;
        /**
           @property {Adaptive.IFileSystemType} [File='File']
        */
        static File: IFileSystemType;
        /**
           @property {Adaptive.IFileSystemType} [Unknown='Unknown']
        */
        static Unknown: IFileSystemType;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IFileSystemType}
        */
        static toObject(object: any): IFileSystemType;
    }
    /**
       @enum {Adaptive.IGeolocationListenerError} Adaptive.IGeolocationListenerError
       Enumeration IGeolocationListenerError
    */
    class IGeolocationListenerError {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IGeolocationListenerError} [Disabled='Disabled']
        */
        static Disabled: IGeolocationListenerError;
        /**
           @property {Adaptive.IGeolocationListenerError} [RestrictedAccess='RestrictedAccess']
        */
        static RestrictedAccess: IGeolocationListenerError;
        /**
           @property {Adaptive.IGeolocationListenerError} [DeniedAccess='DeniedAccess']
        */
        static DeniedAccess: IGeolocationListenerError;
        /**
           @property {Adaptive.IGeolocationListenerError} [StatusNotDetermined='StatusNotDetermined']
        */
        static StatusNotDetermined: IGeolocationListenerError;
        /**
           @property {Adaptive.IGeolocationListenerError} [Unknown='Unknown']
        */
        static Unknown: IGeolocationListenerError;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IGeolocationListenerError}
        */
        static toObject(object: any): IGeolocationListenerError;
    }
    /**
       @enum {Adaptive.IGeolocationListenerWarning} Adaptive.IGeolocationListenerWarning
       Enumeration IGeolocationListenerWarning
    */
    class IGeolocationListenerWarning {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IGeolocationListenerWarning} [HighDoP='HighDoP']
        */
        static HighDoP: IGeolocationListenerWarning;
        /**
           @property {Adaptive.IGeolocationListenerWarning} [StaleData='StaleData']
        */
        static StaleData: IGeolocationListenerWarning;
        /**
           @property {Adaptive.IGeolocationListenerWarning} [Unknown='Unknown']
        */
        static Unknown: IGeolocationListenerWarning;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IGeolocationListenerWarning}
        */
        static toObject(object: any): IGeolocationListenerWarning;
    }
    /**
       @enum {Adaptive.ILifecycleListenerError} Adaptive.ILifecycleListenerError
       Enumeration ILifecycleListenerError
    */
    class ILifecycleListenerError {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.ILifecycleListenerError} [Runtime='Runtime']
        */
        static Runtime: ILifecycleListenerError;
        /**
           @property {Adaptive.ILifecycleListenerError} [Implementation='Implementation']
        */
        static Implementation: ILifecycleListenerError;
        /**
           @property {Adaptive.ILifecycleListenerError} [Killed='Killed']
        */
        static Killed: ILifecycleListenerError;
        /**
           @property {Adaptive.ILifecycleListenerError} [Unknown='Unknown']
        */
        static Unknown: ILifecycleListenerError;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ILifecycleListenerError}
        */
        static toObject(object: any): ILifecycleListenerError;
    }
    /**
       @enum {Adaptive.ILifecycleListenerWarning} Adaptive.ILifecycleListenerWarning
       Enumeration ILifecycleListenerWarning
    */
    class ILifecycleListenerWarning {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.ILifecycleListenerWarning} [MemoryLow='MemoryLow']
        */
        static MemoryLow: ILifecycleListenerWarning;
        /**
           @property {Adaptive.ILifecycleListenerWarning} [BatteryLow='BatteryLow']
        */
        static BatteryLow: ILifecycleListenerWarning;
        /**
           @property {Adaptive.ILifecycleListenerWarning} [Unknown='Unknown']
        */
        static Unknown: ILifecycleListenerWarning;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ILifecycleListenerWarning}
        */
        static toObject(object: any): ILifecycleListenerWarning;
    }
    /**
       @enum {Adaptive.ILoggingLogLevel} Adaptive.ILoggingLogLevel
       Enumeration ILoggingLogLevel
    */
    class ILoggingLogLevel {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.ILoggingLogLevel} [Debug='Debug']
        */
        static Debug: ILoggingLogLevel;
        /**
           @property {Adaptive.ILoggingLogLevel} [Warn='Warn']
        */
        static Warn: ILoggingLogLevel;
        /**
           @property {Adaptive.ILoggingLogLevel} [Error='Error']
        */
        static Error: ILoggingLogLevel;
        /**
           @property {Adaptive.ILoggingLogLevel} [Info='Info']
        */
        static Info: ILoggingLogLevel;
        /**
           @property {Adaptive.ILoggingLogLevel} [Unknown='Unknown']
        */
        static Unknown: ILoggingLogLevel;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ILoggingLogLevel}
        */
        static toObject(object: any): ILoggingLogLevel;
    }
    /**
       @enum {Adaptive.IMessagingCallbackError} Adaptive.IMessagingCallbackError
       Enumeration IMessagingCallbackError
    */
    class IMessagingCallbackError {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IMessagingCallbackError} [SIMNotPresent='SIMNotPresent']
        */
        static SIMNotPresent: IMessagingCallbackError;
        /**
           @property {Adaptive.IMessagingCallbackError} [EmailAccountNotFound='EmailAccountNotFound']
        */
        static EmailAccountNotFound: IMessagingCallbackError;
        /**
           @property {Adaptive.IMessagingCallbackError} [NotSent='NotSent']
        */
        static NotSent: IMessagingCallbackError;
        /**
           @property {Adaptive.IMessagingCallbackError} [WrongParams='WrongParams']
        */
        static WrongParams: IMessagingCallbackError;
        /**
           @property {Adaptive.IMessagingCallbackError} [NotSupported='NotSupported']
        */
        static NotSupported: IMessagingCallbackError;
        /**
           @property {Adaptive.IMessagingCallbackError} [Unknown='Unknown']
        */
        static Unknown: IMessagingCallbackError;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IMessagingCallbackError}
        */
        static toObject(object: any): IMessagingCallbackError;
    }
    /**
       @enum {Adaptive.IMessagingCallbackWarning} Adaptive.IMessagingCallbackWarning
       Enumeration IMessagingCallbackWarning
    */
    class IMessagingCallbackWarning {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IMessagingCallbackWarning} [UnableToSentAll='UnableToSentAll']
        */
        static UnableToSentAll: IMessagingCallbackWarning;
        /**
           @property {Adaptive.IMessagingCallbackWarning} [UnableToFetchAttachment='UnableToFetchAttachment']
        */
        static UnableToFetchAttachment: IMessagingCallbackWarning;
        /**
           @property {Adaptive.IMessagingCallbackWarning} [Unknown='Unknown']
        */
        static Unknown: IMessagingCallbackWarning;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IMessagingCallbackWarning}
        */
        static toObject(object: any): IMessagingCallbackWarning;
    }
    /**
       @enum {Adaptive.INetworkReachabilityCallbackError} Adaptive.INetworkReachabilityCallbackError
       Enumeration INetworkReachabilityCallbackError
    */
    class INetworkReachabilityCallbackError {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.INetworkReachabilityCallbackError} [Forbidden='Forbidden']
        */
        static Forbidden: INetworkReachabilityCallbackError;
        /**
           @property {Adaptive.INetworkReachabilityCallbackError} [NotFound='NotFound']
        */
        static NotFound: INetworkReachabilityCallbackError;
        /**
           @property {Adaptive.INetworkReachabilityCallbackError} [MethodNotAllowed='MethodNotAllowed']
        */
        static MethodNotAllowed: INetworkReachabilityCallbackError;
        /**
           @property {Adaptive.INetworkReachabilityCallbackError} [NotAllowed='NotAllowed']
        */
        static NotAllowed: INetworkReachabilityCallbackError;
        /**
           @property {Adaptive.INetworkReachabilityCallbackError} [NotAuthenticated='NotAuthenticated']
        */
        static NotAuthenticated: INetworkReachabilityCallbackError;
        /**
           @property {Adaptive.INetworkReachabilityCallbackError} [TimeOut='TimeOut']
        */
        static TimeOut: INetworkReachabilityCallbackError;
        /**
           @property {Adaptive.INetworkReachabilityCallbackError} [NoResponse='NoResponse']
        */
        static NoResponse: INetworkReachabilityCallbackError;
        /**
           @property {Adaptive.INetworkReachabilityCallbackError} [Unreachable='Unreachable']
        */
        static Unreachable: INetworkReachabilityCallbackError;
        /**
           @property {Adaptive.INetworkReachabilityCallbackError} [WrongParams='WrongParams']
        */
        static WrongParams: INetworkReachabilityCallbackError;
        /**
           @property {Adaptive.INetworkReachabilityCallbackError} [MalformedUrl='MalformedUrl']
        */
        static MalformedUrl: INetworkReachabilityCallbackError;
        /**
           @property {Adaptive.INetworkReachabilityCallbackError} [DomainUnresolvable='DomainUnresolvable']
        */
        static DomainUnresolvable: INetworkReachabilityCallbackError;
        /**
           @property {Adaptive.INetworkReachabilityCallbackError} [Unknown='Unknown']
        */
        static Unknown: INetworkReachabilityCallbackError;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.INetworkReachabilityCallbackError}
        */
        static toObject(object: any): INetworkReachabilityCallbackError;
    }
    /**
       @enum {Adaptive.INetworkReachabilityCallbackWarning} Adaptive.INetworkReachabilityCallbackWarning
       Enumeration INetworkReachabilityCallbackWarning
    */
    class INetworkReachabilityCallbackWarning {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.INetworkReachabilityCallbackWarning} [IncorrectScheme='IncorrectScheme']
        */
        static IncorrectScheme: INetworkReachabilityCallbackWarning;
        /**
           @property {Adaptive.INetworkReachabilityCallbackWarning} [NotSecure='NotSecure']
        */
        static NotSecure: INetworkReachabilityCallbackWarning;
        /**
           @property {Adaptive.INetworkReachabilityCallbackWarning} [NotTrusted='NotTrusted']
        */
        static NotTrusted: INetworkReachabilityCallbackWarning;
        /**
           @property {Adaptive.INetworkReachabilityCallbackWarning} [Redirected='Redirected']
        */
        static Redirected: INetworkReachabilityCallbackWarning;
        /**
           @property {Adaptive.INetworkReachabilityCallbackWarning} [NotRegisteredService='NotRegisteredService']
        */
        static NotRegisteredService: INetworkReachabilityCallbackWarning;
        /**
           @property {Adaptive.INetworkReachabilityCallbackWarning} [Unknown='Unknown']
        */
        static Unknown: INetworkReachabilityCallbackWarning;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.INetworkReachabilityCallbackWarning}
        */
        static toObject(object: any): INetworkReachabilityCallbackWarning;
    }
    /**
       @enum {Adaptive.INetworkStatusListenerError} Adaptive.INetworkStatusListenerError
       Enumeration INetworkStatusListenerError
    */
    class INetworkStatusListenerError {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.INetworkStatusListenerError} [NoPermission='NoPermission']
        */
        static NoPermission: INetworkStatusListenerError;
        /**
           @property {Adaptive.INetworkStatusListenerError} [Unreachable='Unreachable']
        */
        static Unreachable: INetworkStatusListenerError;
        /**
           @property {Adaptive.INetworkStatusListenerError} [Unknown='Unknown']
        */
        static Unknown: INetworkStatusListenerError;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.INetworkStatusListenerError}
        */
        static toObject(object: any): INetworkStatusListenerError;
    }
    /**
       @enum {Adaptive.INetworkStatusListenerWarning} Adaptive.INetworkStatusListenerWarning
       Enumeration INetworkStatusListenerWarning
    */
    class INetworkStatusListenerWarning {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.INetworkStatusListenerWarning} [IpAddressNotAssigned='IpAddressNotAssigned']
        */
        static IpAddressNotAssigned: INetworkStatusListenerWarning;
        /**
           @property {Adaptive.INetworkStatusListenerWarning} [IpAddressChanged='IpAddressChanged']
        */
        static IpAddressChanged: INetworkStatusListenerWarning;
        /**
           @property {Adaptive.INetworkStatusListenerWarning} [Unknown='Unknown']
        */
        static Unknown: INetworkStatusListenerWarning;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.INetworkStatusListenerWarning}
        */
        static toObject(object: any): INetworkStatusListenerWarning;
    }
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
    /**
       @enum {Adaptive.ISecurityResultCallbackError} Adaptive.ISecurityResultCallbackError
       Enumeration ISecurityResultCallbackError
    */
    class ISecurityResultCallbackError {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.ISecurityResultCallbackError} [NoPermission='NoPermission']
        */
        static NoPermission: ISecurityResultCallbackError;
        /**
           @property {Adaptive.ISecurityResultCallbackError} [NoMatchesFound='NoMatchesFound']
        */
        static NoMatchesFound: ISecurityResultCallbackError;
        /**
           @property {Adaptive.ISecurityResultCallbackError} [Unknown='Unknown']
        */
        static Unknown: ISecurityResultCallbackError;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ISecurityResultCallbackError}
        */
        static toObject(object: any): ISecurityResultCallbackError;
    }
    /**
       @enum {Adaptive.ISecurityResultCallbackWarning} Adaptive.ISecurityResultCallbackWarning
       Enumeration ISecurityResultCallbackWarning
    */
    class ISecurityResultCallbackWarning {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.ISecurityResultCallbackWarning} [EntryOverride='EntryOverride']
        */
        static EntryOverride: ISecurityResultCallbackWarning;
        /**
           @property {Adaptive.ISecurityResultCallbackWarning} [Unknown='Unknown']
        */
        static Unknown: ISecurityResultCallbackWarning;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ISecurityResultCallbackWarning}
        */
        static toObject(object: any): ISecurityResultCallbackWarning;
    }
    /**
       @enum {Adaptive.IServiceCertificateValidation} Adaptive.IServiceCertificateValidation
       Enumeration IServiceCertificateValidation
    */
    class IServiceCertificateValidation {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IServiceCertificateValidation} [None='None']
        */
        static None: IServiceCertificateValidation;
        /**
           @property {Adaptive.IServiceCertificateValidation} [Normal='Normal']
        */
        static Normal: IServiceCertificateValidation;
        /**
           @property {Adaptive.IServiceCertificateValidation} [Extended='Extended']
        */
        static Extended: IServiceCertificateValidation;
        /**
           @property {Adaptive.IServiceCertificateValidation} [Extreme='Extreme']
        */
        static Extreme: IServiceCertificateValidation;
        /**
           @property {Adaptive.IServiceCertificateValidation} [Unknown='Unknown']
        */
        static Unknown: IServiceCertificateValidation;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IServiceCertificateValidation}
        */
        static toObject(object: any): IServiceCertificateValidation;
    }
    /**
       @enum {Adaptive.IServiceContentEncoding} Adaptive.IServiceContentEncoding
       Enumeration IServiceContentEncoding
    */
    class IServiceContentEncoding {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IServiceContentEncoding} [Ascii='Ascii']
        */
        static Ascii: IServiceContentEncoding;
        /**
           @property {Adaptive.IServiceContentEncoding} [Utf8='Utf8']
        */
        static Utf8: IServiceContentEncoding;
        /**
           @property {Adaptive.IServiceContentEncoding} [IsoLatin1='IsoLatin1']
        */
        static IsoLatin1: IServiceContentEncoding;
        /**
           @property {Adaptive.IServiceContentEncoding} [Unicode='Unicode']
        */
        static Unicode: IServiceContentEncoding;
        /**
           @property {Adaptive.IServiceContentEncoding} [Unknown='Unknown']
        */
        static Unknown: IServiceContentEncoding;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IServiceContentEncoding}
        */
        static toObject(object: any): IServiceContentEncoding;
    }
    /**
       @enum {Adaptive.IServiceMethod} Adaptive.IServiceMethod
       Enumeration IServiceMethod
    */
    class IServiceMethod {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IServiceMethod} [Post='Post']
        */
        static Post: IServiceMethod;
        /**
           @property {Adaptive.IServiceMethod} [Get='Get']
        */
        static Get: IServiceMethod;
        /**
           @property {Adaptive.IServiceMethod} [Head='Head']
        */
        static Head: IServiceMethod;
        /**
           @property {Adaptive.IServiceMethod} [Unknown='Unknown']
        */
        static Unknown: IServiceMethod;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IServiceMethod}
        */
        static toObject(object: any): IServiceMethod;
    }
    /**
       @enum {Adaptive.IServiceType} Adaptive.IServiceType
       Enumeration IServiceType
    */
    class IServiceType {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IServiceType} [OctetBinary='OctetBinary']
        */
        static OctetBinary: IServiceType;
        /**
           @property {Adaptive.IServiceType} [RestJson='RestJson']
        */
        static RestJson: IServiceType;
        /**
           @property {Adaptive.IServiceType} [RestXml='RestXml']
        */
        static RestXml: IServiceType;
        /**
           @property {Adaptive.IServiceType} [SoapXml='SoapXml']
        */
        static SoapXml: IServiceType;
        /**
           @property {Adaptive.IServiceType} [Unknown='Unknown']
        */
        static Unknown: IServiceType;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IServiceType}
        */
        static toObject(object: any): IServiceType;
    }
    /**
       @enum {Adaptive.IServiceResultCallbackError} Adaptive.IServiceResultCallbackError
       Enumeration IServiceResultCallbackError
    */
    class IServiceResultCallbackError {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IServiceResultCallbackError} [TimeOut='TimeOut']
        */
        static TimeOut: IServiceResultCallbackError;
        /**
           @property {Adaptive.IServiceResultCallbackError} [NoResponse='NoResponse']
        */
        static NoResponse: IServiceResultCallbackError;
        /**
           @property {Adaptive.IServiceResultCallbackError} [Unreachable='Unreachable']
        */
        static Unreachable: IServiceResultCallbackError;
        /**
           @property {Adaptive.IServiceResultCallbackError} [MalformedUrl='MalformedUrl']
        */
        static MalformedUrl: IServiceResultCallbackError;
        /**
           @property {Adaptive.IServiceResultCallbackError} [NotRegisteredService='NotRegisteredService']
        */
        static NotRegisteredService: IServiceResultCallbackError;
        /**
           @property {Adaptive.IServiceResultCallbackError} [Unknown='Unknown']
        */
        static Unknown: IServiceResultCallbackError;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IServiceResultCallbackError}
        */
        static toObject(object: any): IServiceResultCallbackError;
    }
    /**
       @enum {Adaptive.IServiceResultCallbackWarning} Adaptive.IServiceResultCallbackWarning
       Enumeration IServiceResultCallbackWarning
    */
    class IServiceResultCallbackWarning {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [CertificateUntrusted='CertificateUntrusted']
        */
        static CertificateUntrusted: IServiceResultCallbackWarning;
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [NotSecure='NotSecure']
        */
        static NotSecure: IServiceResultCallbackWarning;
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [Redirected='Redirected']
        */
        static Redirected: IServiceResultCallbackWarning;
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [WrongParams='WrongParams']
        */
        static WrongParams: IServiceResultCallbackWarning;
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [Forbidden='Forbidden']
        */
        static Forbidden: IServiceResultCallbackWarning;
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [NotFound='NotFound']
        */
        static NotFound: IServiceResultCallbackWarning;
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [MethodNotAllowed='MethodNotAllowed']
        */
        static MethodNotAllowed: IServiceResultCallbackWarning;
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [NotAllowed='NotAllowed']
        */
        static NotAllowed: IServiceResultCallbackWarning;
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [NotAuthenticated='NotAuthenticated']
        */
        static NotAuthenticated: IServiceResultCallbackWarning;
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [PaymentRequired='PaymentRequired']
        */
        static PaymentRequired: IServiceResultCallbackWarning;
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [ServerError='ServerError']
        */
        static ServerError: IServiceResultCallbackWarning;
        /**
           @property {Adaptive.IServiceResultCallbackWarning} [Unknown='Unknown']
        */
        static Unknown: IServiceResultCallbackWarning;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.IServiceResultCallbackWarning}
        */
        static toObject(object: any): IServiceResultCallbackWarning;
    }
    /**
       @enum {Adaptive.ITelephonyStatus} Adaptive.ITelephonyStatus
       Enumeration ITelephonyStatus
    */
    class ITelephonyStatus {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.ITelephonyStatus} [Dialing='Dialing']
        */
        static Dialing: ITelephonyStatus;
        /**
           @property {Adaptive.ITelephonyStatus} [Failed='Failed']
        */
        static Failed: ITelephonyStatus;
        /**
           @property {Adaptive.ITelephonyStatus} [Unknown='Unknown']
        */
        static Unknown: ITelephonyStatus;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.ITelephonyStatus}
        */
        static toObject(object: any): ITelephonyStatus;
    }
    /**
       @enum {Adaptive.LifecycleState} Adaptive.LifecycleState
       Enumeration LifecycleState
    */
    class LifecycleState {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.LifecycleState} [Starting='Starting']
        */
        static Starting: LifecycleState;
        /**
           @property {Adaptive.LifecycleState} [Started='Started']
        */
        static Started: LifecycleState;
        /**
           @property {Adaptive.LifecycleState} [Running='Running']
        */
        static Running: LifecycleState;
        /**
           @property {Adaptive.LifecycleState} [Pausing='Pausing']
        */
        static Pausing: LifecycleState;
        /**
           @property {Adaptive.LifecycleState} [PausedIdle='PausedIdle']
        */
        static PausedIdle: LifecycleState;
        /**
           @property {Adaptive.LifecycleState} [PausedRun='PausedRun']
        */
        static PausedRun: LifecycleState;
        /**
           @property {Adaptive.LifecycleState} [Resuming='Resuming']
        */
        static Resuming: LifecycleState;
        /**
           @property {Adaptive.LifecycleState} [Stopping='Stopping']
        */
        static Stopping: LifecycleState;
        /**
           @property {Adaptive.LifecycleState} [Unknown='Unknown']
        */
        static Unknown: LifecycleState;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.LifecycleState}
        */
        static toObject(object: any): LifecycleState;
    }
    /**
       @enum {Adaptive.RotationEventState} Adaptive.RotationEventState
       Enumeration RotationEventState
    */
    class RotationEventState {
        value: string;
        constructor(value: string);
        toString(): string;
        /**
           @property {Adaptive.RotationEventState} [WillStartRotation='WillStartRotation']
        */
        static WillStartRotation: RotationEventState;
        /**
           @property {Adaptive.RotationEventState} [IsRotating='IsRotating']
        */
        static IsRotating: RotationEventState;
        /**
           @property {Adaptive.RotationEventState} [DidFinishRotation='DidFinishRotation']
        */
        static DidFinishRotation: RotationEventState;
        /**
           @property {Adaptive.RotationEventState} [Unknown='Unknown']
        */
        static Unknown: RotationEventState;
        /**
           @method
           @static
           Convert JSON parsed object to enumeration.
           @return {Adaptive.RotationEventState}
        */
        static toObject(object: any): RotationEventState;
    }
}
