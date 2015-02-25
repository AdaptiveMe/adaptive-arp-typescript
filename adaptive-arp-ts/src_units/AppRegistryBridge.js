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
///<reference path="AccelerationBridge.ts"/>
///<reference path="AdsBridge.ts"/>
///<reference path="AlarmBridge.ts"/>
///<reference path="AmbientLightBridge.ts"/>
///<reference path="AnalyticsBridge.ts"/>
///<reference path="AudioBridge.ts"/>
///<reference path="BarcodeBridge.ts"/>
///<reference path="BarometerBridge.ts"/>
///<reference path="BluetoothBridge.ts"/>
///<reference path="BrowserBridge.ts"/>
///<reference path="CalendarBridge.ts"/>
///<reference path="CameraBridge.ts"/>
///<reference path="CapabilitiesBridge.ts"/>
///<reference path="CloudBridge.ts"/>
///<reference path="CommonUtil.ts"/>
///<reference path="CompressionBridge.ts"/>
///<reference path="ConcurrentBridge.ts"/>
///<reference path="ContactBridge.ts"/>
///<reference path="CryptoBridge.ts"/>
///<reference path="DataStreamBridge.ts"/>
///<reference path="DatabaseBridge.ts"/>
///<reference path="DesktopBridge.ts"/>
///<reference path="DeviceBridge.ts"/>
///<reference path="DisplayBridge.ts"/>
///<reference path="FacebookBridge.ts"/>
///<reference path="FileBridge.ts"/>
///<reference path="FileSystemBridge.ts"/>
///<reference path="GeolocationBridge.ts"/>
///<reference path="GlobalizationBridge.ts"/>
///<reference path="GooglePlusBridge.ts"/>
///<reference path="GyroscopeBridge.ts"/>
///<reference path="IAcceleration.ts"/>
///<reference path="IAdaptiveRPGroup.ts"/>
///<reference path="IAds.ts"/>
///<reference path="IAlarm.ts"/>
///<reference path="IAmbientLight.ts"/>
///<reference path="IAnalytics.ts"/>
///<reference path="IAppRegistry.ts"/>
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
///<reference path="ImagingBridge.ts"/>
///<reference path="InternalStorageBridge.ts"/>
///<reference path="LifecycleBridge.ts"/>
///<reference path="LinkedInBridge.ts"/>
///<reference path="LoggingBridge.ts"/>
///<reference path="MagnetometerBridge.ts"/>
///<reference path="MailBridge.ts"/>
///<reference path="ManagementBridge.ts"/>
///<reference path="MapBridge.ts"/>
///<reference path="MessagingBridge.ts"/>
///<reference path="NFCBridge.ts"/>
///<reference path="NetworkInfoBridge.ts"/>
///<reference path="NetworkNamingBridge.ts"/>
///<reference path="NetworkReachabilityBridge.ts"/>
///<reference path="NetworkStatusBridge.ts"/>
///<reference path="NotificationBridge.ts"/>
///<reference path="NotificationLocalBridge.ts"/>
///<reference path="OAuthBridge.ts"/>
///<reference path="OCRBridge.ts"/>
///<reference path="OSBridge.ts"/>
///<reference path="OpenIdBridge.ts"/>
///<reference path="PrintingBridge.ts"/>
///<reference path="ProximityBridge.ts"/>
///<reference path="QRCodeBridge.ts"/>
///<reference path="RSSBridge.ts"/>
///<reference path="RuntimeBridge.ts"/>
///<reference path="SecurityBridge.ts"/>
///<reference path="ServiceBridge.ts"/>
///<reference path="SettingsBridge.ts"/>
///<reference path="SocketBridge.ts"/>
///<reference path="StoreBridge.ts"/>
///<reference path="TelephonyBridge.ts"/>
///<reference path="TimerBridge.ts"/>
///<reference path="TwitterBridge.ts"/>
///<reference path="UIBridge.ts"/>
///<reference path="UpdateBridge.ts"/>
///<reference path="VibrationBridge.ts"/>
///<reference path="VideoBridge.ts"/>
///<reference path="WalletBridge.ts"/>
///<reference path="XMLBridge.ts"/>
var Adaptive;
(function (Adaptive) {
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
                AppRegistryBridge.instanceAcceleration = new Adaptive.AccelerationBridge();
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
                AppRegistryBridge.instanceAds = new Adaptive.AdsBridge();
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
                AppRegistryBridge.instanceAlarm = new Adaptive.AlarmBridge();
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
                AppRegistryBridge.instanceAmbientLight = new Adaptive.AmbientLightBridge();
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
                AppRegistryBridge.instanceAnalytics = new Adaptive.AnalyticsBridge();
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
                AppRegistryBridge.instanceAudio = new Adaptive.AudioBridge();
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
                AppRegistryBridge.instanceBarcode = new Adaptive.BarcodeBridge();
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
                AppRegistryBridge.instanceBarometer = new Adaptive.BarometerBridge();
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
                AppRegistryBridge.instanceBluetooth = new Adaptive.BluetoothBridge();
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
                AppRegistryBridge.instanceBrowser = new Adaptive.BrowserBridge();
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
                AppRegistryBridge.instanceCalendar = new Adaptive.CalendarBridge();
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
                AppRegistryBridge.instanceCamera = new Adaptive.CameraBridge();
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
                AppRegistryBridge.instanceCapabilities = new Adaptive.CapabilitiesBridge();
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
                AppRegistryBridge.instanceCloud = new Adaptive.CloudBridge();
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
                AppRegistryBridge.instanceCompression = new Adaptive.CompressionBridge();
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
                AppRegistryBridge.instanceConcurrent = new Adaptive.ConcurrentBridge();
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
                AppRegistryBridge.instanceContact = new Adaptive.ContactBridge();
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
                AppRegistryBridge.instanceCrypto = new Adaptive.CryptoBridge();
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
                AppRegistryBridge.instanceDataStream = new Adaptive.DataStreamBridge();
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
                AppRegistryBridge.instanceDatabase = new Adaptive.DatabaseBridge();
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
                AppRegistryBridge.instanceDesktop = new Adaptive.DesktopBridge();
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
                AppRegistryBridge.instanceDevice = new Adaptive.DeviceBridge();
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
                AppRegistryBridge.instanceDisplay = new Adaptive.DisplayBridge();
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
                AppRegistryBridge.instanceFacebook = new Adaptive.FacebookBridge();
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
                AppRegistryBridge.instanceFile = new Adaptive.FileBridge();
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
                AppRegistryBridge.instanceFileSystem = new Adaptive.FileSystemBridge();
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
                AppRegistryBridge.instanceGeolocation = new Adaptive.GeolocationBridge();
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
                AppRegistryBridge.instanceGlobalization = new Adaptive.GlobalizationBridge();
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
                AppRegistryBridge.instanceGooglePlus = new Adaptive.GooglePlusBridge();
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
                AppRegistryBridge.instanceGyroscope = new Adaptive.GyroscopeBridge();
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
                AppRegistryBridge.instanceImaging = new Adaptive.ImagingBridge();
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
                AppRegistryBridge.instanceInternalStorage = new Adaptive.InternalStorageBridge();
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
                AppRegistryBridge.instanceLifecycle = new Adaptive.LifecycleBridge();
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
                AppRegistryBridge.instanceLinkedIn = new Adaptive.LinkedInBridge();
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
                AppRegistryBridge.instanceLogging = new Adaptive.LoggingBridge();
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
                AppRegistryBridge.instanceMagnetometer = new Adaptive.MagnetometerBridge();
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
                AppRegistryBridge.instanceMail = new Adaptive.MailBridge();
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
                AppRegistryBridge.instanceManagement = new Adaptive.ManagementBridge();
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
                AppRegistryBridge.instanceMap = new Adaptive.MapBridge();
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
                AppRegistryBridge.instanceMessaging = new Adaptive.MessagingBridge();
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
                AppRegistryBridge.instanceNFC = new Adaptive.NFCBridge();
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
                AppRegistryBridge.instanceNetworkInfo = new Adaptive.NetworkInfoBridge();
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
                AppRegistryBridge.instanceNetworkNaming = new Adaptive.NetworkNamingBridge();
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
                AppRegistryBridge.instanceNetworkReachability = new Adaptive.NetworkReachabilityBridge();
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
                AppRegistryBridge.instanceNetworkStatus = new Adaptive.NetworkStatusBridge();
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
                AppRegistryBridge.instanceNotification = new Adaptive.NotificationBridge();
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
                AppRegistryBridge.instanceNotificationLocal = new Adaptive.NotificationLocalBridge();
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
                AppRegistryBridge.instanceOAuth = new Adaptive.OAuthBridge();
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
                AppRegistryBridge.instanceOCR = new Adaptive.OCRBridge();
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
                AppRegistryBridge.instanceOS = new Adaptive.OSBridge();
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
                AppRegistryBridge.instanceOpenId = new Adaptive.OpenIdBridge();
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
                AppRegistryBridge.instancePrinting = new Adaptive.PrintingBridge();
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
                AppRegistryBridge.instanceProximity = new Adaptive.ProximityBridge();
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
                AppRegistryBridge.instanceQRCode = new Adaptive.QRCodeBridge();
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
                AppRegistryBridge.instanceRSS = new Adaptive.RSSBridge();
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
                AppRegistryBridge.instanceRuntime = new Adaptive.RuntimeBridge();
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
                AppRegistryBridge.instanceSecurity = new Adaptive.SecurityBridge();
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
                AppRegistryBridge.instanceService = new Adaptive.ServiceBridge();
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
                AppRegistryBridge.instanceSettings = new Adaptive.SettingsBridge();
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
                AppRegistryBridge.instanceSocket = new Adaptive.SocketBridge();
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
                AppRegistryBridge.instanceStore = new Adaptive.StoreBridge();
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
                AppRegistryBridge.instanceTelephony = new Adaptive.TelephonyBridge();
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
                AppRegistryBridge.instanceTimer = new Adaptive.TimerBridge();
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
                AppRegistryBridge.instanceTwitter = new Adaptive.TwitterBridge();
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
                AppRegistryBridge.instanceUI = new Adaptive.UIBridge();
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
                AppRegistryBridge.instanceUpdate = new Adaptive.UpdateBridge();
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
                AppRegistryBridge.instanceVibration = new Adaptive.VibrationBridge();
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
                AppRegistryBridge.instanceVideo = new Adaptive.VideoBridge();
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
                AppRegistryBridge.instanceWallet = new Adaptive.WalletBridge();
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
                AppRegistryBridge.instanceXML = new Adaptive.XMLBridge();
            }
            return AppRegistryBridge.instanceXML;
        };
        /**
           @method
           Return the API version for the given interface.

           @return {string} The version of the API.
        */
        AppRegistryBridge.prototype.getAPIVersion = function () {
            return "v2.2.0";
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
})(Adaptive || (Adaptive = {}));
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
//# sourceMappingURL=AppRegistryBridge.js.map