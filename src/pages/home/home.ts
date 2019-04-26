import {Component} from '@angular/core';
import {
     NavController, NavParams, AlertController, LoadingController, ModalController,
    ToastController
} from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover'
import { BillModel } from '../../providers/bills/bill-model';
import { BillsProvider } from '../../providers/bills/bills'
import {AngularFireAuth} from "angularfire2/auth";

import { Storage } from '@ionic/storage';

// import { NativeStorage } from '@ionic-native/native-storage';

// import * as firebase from 'firebase';
// import {LocationTrackerProvider} from "../../providers/location-tracker/location-tracker";
import {SplashScreen} from "@ionic-native/splash-screen";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  bills : Array<BillModel>;
  loading: any;
  username : string;
  duration : number = null;
  pdf : string = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public splashScreen: SplashScreen,
              public popoverCtrl: PopoverController,
              public alertCtrl: AlertController,
              private storage :  Storage,
              public provider:BillsProvider,
              private af : AngularFireAuth,
              private loader : LoadingController,
              private modalCtrl : ModalController,
            //  private tracker  : LocationTrackerProvider,
              private toast : ToastController
  ) {

          this.splashScreen.hide();
  }

  ionViewDidEnter()
  {
      this.loading = this.loader.create({
          content : "Please wait...",
          enableBackdropDismiss : true
      });

      // this.storage.get("username")
      //     .then((res)=>
      //     {
      //         if (res === null)
      //         {
      //             this.alertCtrl.create({
      //                 title : "Something went wrong !",
      //                 message : "Login again please !",
      //                 buttons: [
      //                     {
      //                         text : "Login",
      //                         handler : ()=>
      //                         {
      //                             this.af.auth.signOut()
      //                                 .then(()=>
      //                                 {
      //                                     this.storage.clear()
      //                                         .then(()=>
      //                                         {
      //                                             this.navCtrl.setRoot("login")
      //                                         }) ;
      //                                 })
      //                                 .catch(()=>
      //                                 {
      //                                     this.toast.create({
      //                                         message : "Try Again Later",
      //                                         duration : 2000,
      //                                         position : "top"
      //                                     }).present();
      //                                 });
      //                         }
      //                     }
      //                 ]
      //             }).present()
      //         }
      //         else
      //         {
      //             this.username = res;
      //             console.log("user in home");
      //             console.log(this.username);
      //
      //             this.getBills();
      //
      //         }
      //     }).catch((err)=>
      // {
      //     this.alertCtrl.create({
      //         title : "Something went wrong !",
      //         message : "Login again please !",
      //         buttons: [
      //             {
      //                 text : "Login",
      //                 handler : ()=>
      //                 {
      //                     this.storage.clear()
      //                         .then(()=>
      //                         {
      //                             this.navCtrl.setRoot("login")
      //                         })
      //                 }
      //             }
      //         ]
      //     }).present()
      // })
  }

  /*ionViewCanEnter()
  {
    this.af.authState.subscribe((data) => {
      if (data && data.email && data.uid)
      {
         console.log("in home")
      }
      else
      {
        this.navCtrl.setRoot("login")
      }
    });
  } */

  getBills()
  {
      if(this.username)
      {
          this.provider.getBills(this.username)
              .subscribe((bills) =>
              {
                  console.log(bills);
                  this.bills = bills;
              } , (err)=>
              {
                 console.log(err);
              });
      }
  }
  doRefresh(event)
  {
          this.provider.getBills(this.username)
              .subscribe((bills) =>
              {
                console.log(bills);
                this.bills = bills;
              });
     setTimeout(()=>{event.complete()} , 2000);
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: myEvent
    });
  }

  addBill(){
    this.navCtrl.push("addBill");
  }

  goEdit(bill)
  {
    this.navCtrl.push("editBill" , {billInfo : bill})
  }

  getBillsByDate()
  {
     this.alertCtrl.create({
       title : "Get Bills From:",
         inputs : [
             {
                 name : "dateFrom",
                 type : "date",
                 placeholder : "From"
             },
             {
                 name : "dateTo",
                 type : "date",
                 placeholder : "To"
             }
         ],
         buttons : [
             {
                 text : "Cancel"
             },
             {
                 text : "Find",
                 handler : (data)=>
                 {
                     console.log("from" + data.dateFrom);
                     console.log("to" + data.dateTo);

                     this.loading.present();
                     this.provider.getBillsByDate(this.username , data.dateFrom , data.dateTo)
                         .subscribe(res=>
                         {
                             this.loading.dismiss();
                             if(typeof res == 'string')
                             {
                                 this.alertCtrl.create({
                                     title : "Not Found !",
                                     message : res,
                                     buttons: ["Ok"]
                                 }).present()
                             }
                             else
                             {
                                 this.bills = res;
                             }
                         })
                 }
             }
         ]
     }).present();
  }
  showMap(bill)
  {
     if(bill.latitude !== null && bill.longitude !== null)
     {
         this.modalCtrl.create("map" , {lat : bill.latitude , lng : bill.longitude}).present();
     }

  }
    openBarcodePage()
    {
      this.navCtrl.push("barcode")
    }

    goView(bill)
    {
        this.navCtrl.push("view-fa", {billInfo : bill})
    }
    deleteBill(id)
    {
        console.log("in the begin of the dlete");

       this.alertCtrl.create({
           title :"Confirm",
           message : "Are you sure you want to delete this bill ?",
           buttons : [
               {
                   text : "Cancel",
                   role : "cancel"
               },
               {
                   text : "Delete",
                   handler : ()=>
                   {
                       try
                       {
                           this.loading.present();
                           console.log("deelet id");
                           console.log(id);

                           this.provider.deleteBill(id)
                               .subscribe(()=>
                               {
                                   this.loading.dismiss();
                                   console.log("inside the deelete function");

                                  this.getBills();

                                   this.toast.create({
                                       message : "Bill has been deleted",
                                       duration : 2000,
                                       position : "top"
                                   }).present();
                               })
                       }
                       catch (e)
                       {
                           this.toast.create({
                               message : "Error has been occurred",
                               duration : 2000,
                               position : "top"
                           }).present();
                       }
                   }
               }
           ]
       }).present();
    }

    doFilter()
    {
            this.alertCtrl.create({
                title:"Select Filter",
                inputs : [
                    {
                        type : "radio",
                        label: "Daily",
                        value: "1"
                    },
                    {
                        type : "radio",
                        label: "Weekly",
                        value: "2"
                    },
                    {
                        type : "radio",
                        label: "Monthly",
                        value: "3"
                    },
                    {
                        type : "radio",
                        label: "Quarter",
                        value: "4"
                    },
                    {
                        type : "radio",
                        label: "Yearly",
                        value: "5"
                    },
                ],
                buttons : [
                    {
                        text:"Close",
                    },
                    {
                        text: "Filter",
                        handler : (value)=>{
                           console.log(value)
                        }
                    }
                ]
            }).present()

        }
}
