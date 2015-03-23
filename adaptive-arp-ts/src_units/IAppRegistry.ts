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

///<reference path="IAcceleration.ts"/>
///<reference path="IAds.ts"/>
///<reference path="IAlarm.ts"/>
///<reference path="IAmbientLight.ts"/>
///<reference path="IAnalytics.ts"/>
///<reference path="IAudio.ts"/>
///<reference path="IBarcode.ts"/>
///<reference path="IBarometer.ts"/>
///<reference path="IBluetooth.ts"/>
///<reference path="IBrowser.ts"/>
///<reference path="ICalendar.ts"/>
///<reference path="ICamera.ts"/>
///<reference path="ICapabilities.ts"/>
///<reference path="ICloud.ts"/>
///<reference path="ICompression.ts"/>
///<reference path="IConcurrent.ts"/>
///<reference path="IContact.ts"/>
///<reference path="ICrypto.ts"/>
///<reference path="IDataStream.ts"/>
///<reference path="IDatabase.ts"/>
///<reference path="IDesktop.ts"/>
///<reference path="IDevice.ts"/>
///<reference path="IDisplay.ts"/>
///<reference path="IFacebook.ts"/>
///<reference path="IFile.ts"/>
///<reference path="IFileSystem.ts"/>
///<reference path="IGeolocation.ts"/>
///<reference path="IGlobalization.ts"/>
///<reference path="IGooglePlus.ts"/>
///<reference path="IGyroscope.ts"/>
///<reference path="IImaging.ts"/>
///<reference path="IInternalStorage.ts"/>
///<reference path="ILifecycle.ts"/>
///<reference path="ILinkedIn.ts"/>
///<reference path="ILogging.ts"/>
///<reference path="IMagnetometer.ts"/>
///<reference path="IMail.ts"/>
///<reference path="IManagement.ts"/>
///<reference path="IMap.ts"/>
///<reference path="IMessaging.ts"/>
///<reference path="INFC.ts"/>
///<reference path="INetworkInfo.ts"/>
///<reference path="INetworkNaming.ts"/>
///<reference path="INetworkReachability.ts"/>
///<reference path="INetworkStatus.ts"/>
///<reference path="INotification.ts"/>
///<reference path="INotificationLocal.ts"/>
///<reference path="IOAuth.ts"/>
///<reference path="IOCR.ts"/>
///<reference path="IOS.ts"/>
///<reference path="IOpenId.ts"/>
///<reference path="IPrinting.ts"/>
///<reference path="IProximity.ts"/>
///<reference path="IQRCode.ts"/>
///<reference path="IRSS.ts"/>
///<reference path="IRuntime.ts"/>
///<reference path="ISecurity.ts"/>
///<reference path="IService.ts"/>
///<reference path="ISettings.ts"/>
///<reference path="ISocket.ts"/>
///<reference path="IStore.ts"/>
///<reference path="ITelephony.ts"/>
///<reference path="ITimer.ts"/>
///<reference path="ITwitter.ts"/>
///<reference path="IUI.ts"/>
///<reference path="IUpdate.ts"/>
///<reference path="IVibration.ts"/>
///<reference path="IVideo.ts"/>
///<reference path="IWallet.ts"/>
///<reference path="IXML.ts"/>

module Adaptive {

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
}

/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
