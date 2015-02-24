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
module Adaptive {

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
}
/**
------------------------------------| Engineered with ♥ in Barcelona, Catalonia |--------------------------------------
*/
