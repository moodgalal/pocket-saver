import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {EntryPage} from '../pages/entry/entry';
import {HomePage} from '../pages/home/home';
import { HttpModule } from '@angular/http';
import {IonicStorageModule} from '@ionic/storage';
import {AngularFireModule} from "angularfire2";
import {AngularFireAuthModule} from 'angularfire2/auth';
import {FIREBASE_CONFIG} from './app.firebase.config';
import { Ionic2RatingModule } from 'ionic2-rating';
import { PopoverComponent } from '../components/popover/popover';
import { GlobalFawateriProvider} from '../providers/global-fawateri/global-fawateri';
import { SignupProvider } from '../providers/signup/go-green-server';
import { BillsProvider } from '../providers/bills/bills';
import { PointsProvider } from '../providers/points/points';
import {Geolocation} from '@ionic-native/geolocation';
import {Camera} from '@ionic-native/camera';
import { MyApp } from './app.component';
import { EditBillProvider } from '../providers/edit-bill/edit-bill';
import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';
import { PdfReaderProvider } from '../providers/pdf-reader/pdf-reader';
import { OffersPageProvider } from '../providers/offers-page/offers-page';
import { ProfileProvider } from '../providers/profile/profile';
import { StoresProvider } from '../providers/stores/stores';
import {Facebook} from "@ionic-native/facebook";
import { TwitterConnect } from '@ionic-native/twitter-connect';
import {AngularFireDatabaseModule} from "angularfire2/database";
import {FCM} from "@ionic-native/fcm";
import {NotificationProvider} from "../providers/notification/notification";

// import { NativeStorage} from '@ionic-native/native-storage'
// import {BarcodeScanner} from '@ionic-native/barcode-scanner';
// import { BackgroundGeolocation } from '@ionic-native/background-geolocation';

@NgModule({
  declarations: [
            MyApp,
            EntryPage,
            HomePage,
            PopoverComponent,
  ],
  imports: [
      BrowserModule,
      IonicModule.forRoot(MyApp),
      IonicStorageModule.forRoot(),
      HttpModule,
      AngularFireModule.initializeApp(FIREBASE_CONFIG),
      AngularFireAuthModule,
    AngularFireDatabaseModule,
      Ionic2RatingModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
      EntryPage,
      HomePage,
      PopoverComponent,
  ],
  providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
      // NativeStorage,
      //   BarcodeScanner,
        Camera,
      // BackgroundGeolocation,
      Geolocation,
        GlobalFawateriProvider,
        BillsProvider,
        PointsProvider,
        SignupProvider,
        EditBillProvider,
    LocationTrackerProvider,
    PdfReaderProvider,
    OffersPageProvider,
    ProfileProvider,
    StoresProvider,
    Facebook,
    TwitterConnect,
    FCM,
    NotificationProvider
  ],
    schemas : [CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA]
})
export class AppModule {}
