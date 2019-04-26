import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover'
import {ProfileProvider} from "../../providers/profile/profile";

import {Storage} from "@ionic/storage";
// import {NativeStorage} from "@ionic-native/native-storage";


@IonicPage({
  name: "profile"
})
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  username : string;
  info : any;

    showChangePassword : boolean = false;
    disableButtons  : boolean = false;
    currentPass : string;
    newPass: string;
    confirmPass: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl: PopoverController ,
              private alertCtrl : AlertController,
              private service :ProfileProvider,
              private storage : Storage
  ) {
  }


  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: myEvent
    });  
  }


  ionViewDidLoad() {
    this.getProfileData();
  }
  openBarcodePage(){
    this.navCtrl.push("barcode");
  }

  getProfileData()
  {
    this.storage.get("username")
        .then((res)=>
        {
           this.username = res;
            this.service.getProfileInfo(this.username)
                .subscribe((res)=>
                {
                    console.log(res);
                    this.info = res;
                } , (err)=>
                {
                    console.log(err)
                });
        });

  }

    showChangePass()
    {
        this.showChangePassword = !this.showChangePassword;
    }

    changePass()
    {
       this.disableButtons = true;

       let model =
           {
               LoginName:this.username,
               CurrentPassword:this.currentPass,
               NewPassword:this.newPass,
               ConfirmPassword:this.confirmPass
           };
       this.service.changePassword(model)
           .subscribe((res)=>
           {
               this.alertCtrl.create({
                  
                   message : res.message,
                   buttons : ["Ok"]
               }).present();
               console.log(res);
               this.disableButtons = false;
               this.showChangePassword = false;
               this.currentPass = "";
               this.newPass  = "";
               this.confirmPass  = "";
           },(err)=>
           {
              console.log(err);
              this.alertCtrl.create({
                  title : "Server Error",
                  message : err,
                  buttons : ["Ok"]
              }).present();
               this.disableButtons = false;
           })
    }
}
