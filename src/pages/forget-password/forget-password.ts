import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController} from 'ionic-angular';
import {SignupProvider} from "../../providers/signup/go-green-server";


@IonicPage({
  name : "forgetPassword"
})
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {

  email : string = "";
  loader;
  disableButtons : boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl : ViewController,
              private sendPass  : SignupProvider,
              private alertCtrl : AlertController,
              private loadCtrl : LoadingController

  ) {
  }

  ionViewDidLoad() {
     this.loader = this.loadCtrl.create({
      content : "Please wait..."
    });
  }

  sendEmail()
  {
    this.disableButtons = true;
     this.alertCtrl.create({
       title : "Confirm Message",
       message : "Are you sure this is your email and you want to proceed?",
       buttons : [
         {
           text : "No"
         },
         {
           text : "Send",
           handler : ()=>
           {
             this.loader.present();
             try
             {
               console.log("before sending server");
               console.log(this.email);

               this.sendPass.retrievePass(this.email.trim())
                   .subscribe((res)=>
                   {
                     this.loader.dismiss();
                     this.disableButtons = false;
                     if (res.isExist)
                     {
                       this.alertCtrl.create({
                         title : "Message",
                         message  : "We sent you your last password to your email , please check your inbox",
                         buttons : [{
                           text : "Ok",
                           handler : ()=>
                           {
                             this.navCtrl.pop();
                           }
                         }]
                       }).present()
                     }
                     else
                     {
                       this.alertCtrl.create({
                         title : "Error !",
                         message  : "Please put the email you signed up with !",
                         buttons : ["Ok"]
                       }).present();
                       this.disableButtons = false;
                     }

                   } , ()=>
                   {
                     this.loader.dismiss();

                     this.alertCtrl.create({
                       title : "Server Error",
                       message  : "Please try again Later !",
                       buttons : ["Ok"]
                     }).present();
                     this.disableButtons = false;
                   })
             }
             catch (e)
             {
               this.loader.dismiss();

               this.alertCtrl.create({
                 title : "Error",
                 message  : "Please try again Later !",
                 buttons : ["Ok"]
               }).present();
               this.disableButtons = false;
             }
           }
         }
       ]
     }).present()
  }
}
