import { Component } from '@angular/core';
import {
  IonicPage, NavController, NavParams, ToastController, LoadingController, Platform
} from 'ionic-angular';
import {SignupProvider} from "../../providers/signup/go-green-server";
import {AngularFireAuth} from "angularfire2/auth/auth";
import * as firebase from 'firebase'
import {HomePage} from "../home/home";
import {SplashScreen} from "@ionic-native/splash-screen";
import { Storage } from '@ionic/storage';
import {Facebook} from "@ionic-native/facebook";
import {TwitterConnect} from "@ionic-native/twitter-connect";
import {User} from "../../models/user";
import {FCM} from "@ionic-native/fcm";
import {AngularFireDatabase} from "angularfire2/database";

// import { NativeStorage } from '@ionic-native/native-storage';
@IonicPage({
    name : "login"
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  // username : string;
  // password : string;
  public user = {} as User;
  disableButton : boolean = false;
  public dbRef;

  constructor(public navCtrl: NavController,
              public splashScreen: SplashScreen,
              public navParams: NavParams,
              private toast : ToastController,
              private storage : Storage,
              private signIn  : SignupProvider,
              private loadCtrl : LoadingController,
              public afAuth: AngularFireAuth,
              private facebook : Facebook,
              private platform : Platform,
              private twitter : TwitterConnect,
              private afDB: AngularFireDatabase,
              private fcm: FCM,

  ) {
      this.splashScreen.hide();

    this.dbRef = this.afDB.list("users");

    this.platform.ready().then(() => {
      fcm.getToken().then(token => {
        this.user.token = token;
        console.log(token);
      })
    })

  }

  ionViewDidLoad() {
  }

  doLogin()
  {
    console.log(this.user);
    this.afAuth.auth.signInWithEmailAndPassword(this.user.email.trim(), this.user.password.trim()).then((user) => {
      console.log(user);

      console.log(this.afAuth.auth.currentUser.uid);
      this.user.uid = this.afAuth.auth.currentUser.uid;
      this.dbRef.push(this.user).then((snap) => {
        this.user.$key = snap.key;


        this.storage.set("user" , this.user)
          .then(()=>
          {
            this.navCtrl.setRoot(HomePage);
          });
      })
    }).catch((e)=>
    {
      console.log(e)
    });
    console.log(this.user);

    // let loading =  this.loadCtrl.create({
    //   content : "Please wait..."
    // });
    //
    // this.disableButton = true;
    //
    // loading.present();

    // if (formData)
    // {
        // let Model =
        //     {
        //         loginName : formData.value.userNumber,
        //         password : formData.value.password
        //     };
      //
      // try
      // {
      //     this.signIn.login(Model)
      //         .subscribe((res)=>
      //         {
      //         if (res != null)
      //         {
      //             console.log(res);
      //             if (res.loginStatus === "1")
      //             {
      //                 loading.dismiss();
      //                 this.storage.set("username" , res.loginName)
      //                     .then(()=>
      //                     {
      //                         this.storage.set("customerName" , res.customerName)
      //                             .then(()=>
      //                             {
      //                         // this.storage.set("duration" , res.duration)
      //                         //     .then(()=>
      //                         //     {
      //                                 this.storage.set("currencyCode" , res.currencyData.currencyCode.trim())
      //                                     .then(()=>
      //                                     {
      //                                         console.log("currency in login");
      //                                         console.log(res.currencyData.currencyCode.trim());
      //
      //                                         this.storage.set("decimalDigit" , res.currencyData.decimalDigit)
      //                                             .then(()=>
      //                                             {
      //                                                 this.storage.set("exchangeRate" ,res.currencyData.exchangeRate )
      //                                                     .then(()=>
      //                                                     {
      //                                                         this.storage.set
      //                                                         ("isMultiply" , res.currencyData.isMultiply)
      //                                                             .then(()=>
      //                                                             {
      //                                                                 this.afAuth.auth.signInAnonymously()
      //                                                                     .then((res)=>
      //                                                                     {
      //                                                                         console.log("from firebase");
      //                                                                         console.log(res);
      //
      //                                                                         this.navCtrl.setRoot(HomePage , {duration : res.duration });   // Here we gooooo !
      //                                                                     }).catch((e)=>
      //                                                                 {
      //                                                                     loading.dismiss();
      //                                                                     this.toast.create({
      //                                                                         message : "Try Again Later",
      //                                                                         duration : 2000,
      //                                                                         position : "top"
      //                                                                     }).present();
      //                                                                 });
      //
      //                                                             })
      //                                                     })
      //                                             });
      //                                     // })
      //                             });
      //                         });
      //                     });
      //             }
      //             else if (res.loginStatus === "0")
      //             {
      //                 loading.dismiss();
      //                 this.toast.create({
      //                     message : "You are not authenticated",
      //                     duration : 2000,
      //                     position : "top"
      //                 }).present();
      //                 this.disableButton = false;
      //             }
      //         }
      //         } , (err)=>{
      //             loading.dismiss();
      //             console.log(err);
      //
      //             this.toast.create({
      //                 message : "Try again later please",
      //                 duration : 2000,
      //                 position : "top"
      //             }).present();
      //             this.disableButton = false;
      //         });
      // }
      // catch (e)
      // {
      //     loading.dismiss();
      //     console.log(e);
      //
      //     this.toast.create({
      //         message : "Try again later please",
      //         duration : 2000,
      //         position : "top"
      //     }).present();
      //     this.disableButton = false;
      // }
    // }
  }
  goSignup()
  {
    this.navCtrl.setRoot("signup");
  }

    loginGoogle()
    {
        this.disableButton = true;

        let google = new firebase.auth.GoogleAuthProvider();
        this.afAuth.auth.signInWithPopup(google)
            .then((result)=>
            {
                console.log("google info after sign in firebase");
                console.log(result);
                // This gives you a Google Access Token. You can use it to access the Google API.
                // let token = result.credential.accessToken;
                // // The signed-in user info.
                // let user = result.user;
                this.navCtrl.setRoot("home");
            }).catch((error)=>
        {
            this.disableButton = false;
           console.log(error);
        })
    }

  loginFacebook()
  {
    if(this.platform.is('cordova'))
    {
       return this.facebook.login(['email' , 'public_profile'])
         .then((res)=>
         {
           const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
           console.log("facebook login Credential");
           console.log(facebookCredential);
           return firebase.auth().signInWithCredential(facebookCredential);
         })
    }
    else
    {
       return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then((user)=>
        {
          console.log("facebook login");
          console.log(user);
        })
    }

  }

  loginTwitter()
  {
    this.twitter.login().then((response)=>
    {
      const twitterCredential = firebase.auth.TwitterAuthProvider.credential(response.token, response.secret);

      this.afAuth.auth.signInWithCredential(twitterCredential)
        .then(res => {
          console.log("twitter response");
          console.log(res);
        })
        .catch(error => console.log('error', error))
    }, ()=>
    {
      let provider = new firebase.auth.TwitterAuthProvider();

      firebase.auth().signInWithPopup(provider).then(function(result)
      {

        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        let token = result.credential.accessToken;
        let secret = result.credential.secret;

        // The signed-in user info.
        let user = result.user;

        console.log("Twitter result");
        console.log(result);

      }).catch(function(error) {
        console.log(error)
      });
    });

  }
    forgotPassword()
    {
       this.navCtrl.push("forgetPassword");
    }
}
