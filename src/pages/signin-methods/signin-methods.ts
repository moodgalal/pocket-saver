import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
//import * as firebase from 'firebase';

@IonicPage({
  name:"signInMethods"
})

@Component({
  selector: 'page-signin-methods',
  templateUrl: 'signin-methods.html',
})
export class SigninMethodsPage {


  error : any;
  
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public af: AngularFireAuth,
        
  ) {
    this.af.authState.subscribe(auth => {
      if(auth) {
        this.navCtrl.setRoot("home");
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninMethodsPage');
  }




 // loginFacebook()
 // {
 //   this.facebook.login(['email']).then((res)=>
 //   {
 //       console.log("facebook info before sign in firebase");
 //       console.log(res);
 //      const fc = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
 //      this.af.auth.signInWithCredential(fc).then((fb)=>
 //      {
 //          console.log("facebook info after sign in firebase");
 //          console.log(fb);
 //          this.navCtrl.setRoot("home");
 //      }).catch(error=>
 //      {
 //          this.error = error;
 //      })
 //   }).catch(error=>
 //   {
 //       this.error = error;
 //   })
 // }

  emailLogin()
  {
    this.navCtrl.push("email_login");
  }
  goSignup(){
    this.navCtrl.setRoot("signup");
  }
}
