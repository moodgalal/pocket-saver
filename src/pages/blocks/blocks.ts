import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, LoadingController} from 'ionic-angular';
import {SignupProvider} from "../../providers/signup/go-green-server";
import {AngularFireAuth} from "angularfire2/auth/auth";
import {HomePage} from "../home/home";

import { Storage } from '@ionic/storage';

// import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage({    
  name:"blocks"
})
@Component({
  selector: 'page-blocks',
  templateUrl: 'blocks.html',
})
export class BlocksPage {

  blocks : Array<any>;
  MobileModel : any = null;
  selected : number = null;
  cityCode : number;
  username : string;
    loading;
    disableButtons : boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private server : SignupProvider,
              private storage : Storage ,
              private toast : ToastController,
              public af: AngularFireAuth,
              private loadCtrl : LoadingController,
  ) {

  }

  ionViewDidEnter() {
      this.loading =  this.loadCtrl.create({
          content : "Please wait..."
      });

    this.MobileModel = this.navParams.get("model");

    if(this.MobileModel != null)
    {
        this.username = this.MobileModel.loginName;
      this.selected = this.MobileModel.BlockCode;
      this.cityCode = this.MobileModel.CityCode;
      this.getBlocks(this.cityCode);
    }


  }

  getBlocks(cityCode)
  {
    this.server.getBlocks(cityCode).subscribe((res)=>{
      console.log("blocks");
      console.log(res);
      this.blocks = res;
    })
  }

  select(blockCode)
  {
      this.disableButtons = true;
      this.loading.present();
    this.MobileModel.BlockCode = blockCode;

    this.server.signUp(this.MobileModel)
        .subscribe((res)=>
          {
            console.log("after signup");
            console.log(res);

              console.log("login name");
              console.log(this.MobileModel.loginName);

                   let Model =
                       {
                         loginName : this.MobileModel.loginName,
                         password : this.MobileModel.loginPassword
                       };

                     console.log("login before");
                     console.log(Model);

                   try
                   {
                     this.server.login(Model)
                         .subscribe((res)=>
                         {
                           if (res != null)
                           {
                               console.log("login response");
                             console.log(res);
                             
                             if (res.loginStatus === "1")
                             {
                               this.storage.set("username" , res.loginName)
                                   .then(()=>
                                   {
                                     // this.storage.setItem("duration" , res.duration)
                                     //     .then(()=>
                                     //     {
                                           this.storage.set("currencyCode" , res.currencyData.currencyCode.trim())
                                               .then(()=>
                                               {
                                                 console.log("currency in login");
                                                 console.log(res.currencyData.currencyCode.trim());

                                                 this.storage.set("decimalDigit" , res.currencyData.decimalDigit)
                                                     .then(()=>
                                                     {
                                                       this.storage.set("exchangeRate" ,res.currencyData.exchangeRate )
                                                           .then(()=>
                                                           {
                                                             this.storage.set("isMultiply" , res.currencyData.isMultiply)
                                                                 .then(()=>
                                                                 {
                                                                     this.af.auth.signInAnonymously()
                                                                         .then((res)=> {
                                                                             this.loading.dismiss();

                                                                             console.log("from firebase");
                                                                             console.log(res);

                                                                             this.navCtrl.setRoot(HomePage, {duration: res.duration});   // Here we gooooo !
                                                                         }).catch(()=>
                                                                     {
                                                                         this.loading.dismiss();
                                                                         this.toast.create({
                                                                             message : "Try Again Later",
                                                                             duration : 2000,
                                                                             position : "top"
                                                                         }).present();
                                                                     })
                                                                 })
                                                           })
                                                     });
                                               // })
                                         });
                                   });
                             }
                           }
                           else
                           {
                               this.loading.dismiss();
                             this.toast.create({
                               message : "You are not authenticated",
                               duration : 2000,
                               position : "top"
                             }).present();
                               this.disableButtons = false;
                           }
                         } , (err)=>{
                             this.loading.dismiss();
                             console.log(err);

                             this.toast.create({
                                 message : "Try again later please",
                                 duration : 2000,
                                 position : "top"
                             }).present();
                             this.disableButtons = false;
                         });
                   }
                   catch (e)
                   {
                       this.loading.dismiss();
                     console.log(e);

                     this.toast.create({
                       message : "Try again later please",
                       duration : 2000,
                       position : "top"
                     }).present();
                       this.disableButtons = false;

                   }

          });
  }

}
