import { Component } from '@angular/core';
import {
  IonicPage, NavController, NavParams, AlertController, ToastController,
  LoadingController
} from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover'
import {EditBillProvider} from "../../providers/edit-bill/edit-bill";

import {Storage} from "@ionic/storage";

// import {NativeStorage} from "@ionic-native/native-storage";

// import {Geolocation} from '@ionic-native/geolocation';
// import {BarcodeScanner} from '@ionic-native/barcode-scanner';
// import {Camera , CameraOptions} from '@ionic-native/camera';

@IonicPage({
   name : "addBill"
})
@Component({
  selector: 'page-add-bill',
  templateUrl: 'add-bill.html',
})
export class AddBillPage {


  selectedCatId : any = null;
  selectedCatName = " ";
  selectedSubCatId;
  selectedSubCatName = " " ;
  trxAmt;
  decimalAmt;
  categories = [];
  subCategories = [];
  currencyCode : string;
  username : string;
  billInfo;
  addCat : string = null;
  addSubCat : string = null;
  showAddCat = false;
  showAddSubCat = false;
  load;
  stopSpinCat :boolean = false;
  stopSpinSubCat :boolean  = true;
  rate : number = null;
  isMultiply : boolean = null;
  disableButtons : boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl: PopoverController,
              private editProvider : EditBillProvider,
              private storage : Storage,
              private alertCtrl : AlertController,
              private toast : ToastController,
              // private geo : Geolocation,
              // private barcodeScanner : BarcodeScanner,
              // private camera : Camera,
              // private modalCtrl : ModalController,
              private loader : LoadingController
  ) {}

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: myEvent
    });
  }

  openBarcodePage(){
    this.navCtrl.push("barcode");
  }
  ionViewDidLoad()
  {
      this.getCat();

      this.load =  this.loader.create({
        content : "Please wait",
        enableBackdropDismiss : true
      });

      this.storage.get("currencyCode")
          .then((res)=>
          {
            this.currencyCode = res;
          });

  }

  getCat()
  {
    this.storage.get("username")
        .then(user =>
        {
          if (user)
          {
            this.username = user;
            this.editProvider.getCat(user)
                .subscribe(res =>
                {
                  this.stopSpinCat = true; // stop the spinner

                  console.log("cat");
                  console.log(res);
                  if(typeof res == 'string')
                  {
                    this.alertCtrl.create({
                      title: "Not Found !",
                      message: res,
                      buttons: ["Ok"]
                    }).present();
                  }
                  else
                  {
                    this.categories = res;
                  }
                })
          }
        })
  }
  getSubCat(catId , catName)
  {
    this.stopSpinSubCat = false; // start sub cat spinner

    this.selectedCatId = catId;
    this.selectedCatName = catName;
    if (this.username)
    {
      this.editProvider.getSubCat(this.username ,catId)
          .subscribe((res)=>
          {
            this.stopSpinSubCat = true; // stop the spinner
            console.log("sub_cat");
            console.log(res);

            if(typeof res == 'string')
            {
              this.alertCtrl.create({
                title: "Not Found !",
                message: res,
                buttons: ["Ok"]
              }).present()
            }
            else
            {
              this.subCategories = res;
            }
          })
    }
  }

  selectSubCat(subCatId ,subCatName )
  {
    this.selectedSubCatId = subCatId;
    this.selectedSubCatName = subCatName;
  }
  add()
  {
    this.disableButtons = true;
    this.load.present();

    // DecimalDigit :this.billInfo.DecimalDigit,
    // ExchangeRate: this.billInfo.ExchangeRateFrom,
    // IsMultiply: this.billInfo.IsMultiplyFrom,
    // TrxComments : this.billInfo.TrxComments,

    let model =
        {
          loginName : this.username,
          currencyCode : this.currencyCode,
          trxAMT : this.trxAmt,
          categoryID : this.selectedCatId,
          subCategoryID : this.selectedSubCatId,
          isMultiply : false,
          exchangeRate : 1
        };

    console.log(model);
    this.editProvider.addBill(model)
        .subscribe((res)=>
        {
          this.load.dismiss();
          
          this.toast.create({
            message : "Bill Has been added",
            duration : 3000,
            position : "top"
          }).present()
              .then(()=>
              {
                this.disableButtons = false;
              });

          this.navCtrl.pop()
        } , (err)=>
        {
          this.toast.create({
            message : "Try Again Later Please",
            duration : 3000,
            position : "top"
          }).present()
              .then(()=>
              {
                this.disableButtons = false;
              });
          console.log(err);
        })
  }

  getAmounts(amount : number)
  {
    this.trxAmt = Math.floor(amount);
    this.decimalAmt = amount - this.trxAmt;
  }

  addCatFun()
  {
    this.disableButtons = true;

    this.load.present();

    if (this.addCat.trim() !== null)
    {
      let model =
          {
            CategoryName : this.addCat,
            loginName : this.username
          };
      console.log("cat model");
      console.log(model);
      this.editProvider.addCat(model , this.username)
          .subscribe((res)=>
          {
            this.load.dismiss();

            console.log("after cat add");
            console.log(res);
            this.selectedCatId = res.categoryID;
            this.getCat();
            this.selectedCatName = this.addCat;
            this.toast.create({
              message : "Category Has been added",
              duration : 2000,
              position : "top"
            }).present()
                .then(()=>
                {
                  this.disableButtons = false;

                });

            this.showAddCat = false;
            this.addCat = "";
          } , (err)=>
          {
            this.toast.create({
              message : "Try Again Later Please",
              duration : 3000,
              position : "top"
            }).present().then(()=>
            {
              this.disableButtons = false;

            });
            console.log(err);
          });
    }
  }

  addSubCatFun()
  {
    this.disableButtons = true;

    this.load.present();

    if (this.addSubCat.trim() !== null)
    {
      let model =
          {
            CategoryID : this.selectedCatId,
            SubCategoryName : this.addSubCat,
            LoginName : this.username
          };
      console.log("sub cat model");
      console.log(model);

      this.editProvider.addSubCat(model)
          .subscribe((res)=>
          {
            this.load.dismiss();

            console.log("after subcat add");
            console.log(res);
            this.selectedSubCatId = res.subCategoryID;

            this.getSubCat(this.selectedCatId , this.selectedCatName);
            this.selectedSubCatName = this.addSubCat;
            this.toast.create({
              message : "SubCategory Has been added",
              duration : 2000,
              position : "top"
            }).present().then(()=>
            {
              this.disableButtons = false;
            });
            this.showAddSubCat = false;
            this.addSubCat = "";
          } , (err)=>
          {
            this.toast.create({
              message : "Try Again Later Please",
              duration : 3000,
              position : "top"
            }).present().then(()=>
            {
              this.disableButtons = false;
            });
            console.log(err);
          })
    }
  }

//   getPosition()
//   {
//     this.load.present();
//     console.log("position function");
//
//     this.geo.getCurrentPosition()
//         .then((res)=>
//         {
//           console.log("long"+res.coords.longitude);
//           console.log("lat"+res.coords.latitude);
//
//           let model =
//               {
//                 loginName: this.username,
//                 // TrxID : this.billInfo.trxID,
//                 Latitude  :res.coords.latitude ,
//                 Longitude  : res.coords.longitude
//               };
//
//           this.editProvider.billLocation(model)
//               .subscribe((res)=>
//               {
//                 this.load.dismiss();
//
//                 console.log("location function");
//                 console.log(res);
//                 this.toast.create({
//                   message: "Location has been updated !",
//                   duration : 2000,
//                   position : "top"
//                 }).present()
//               });
//         }).catch((error)=>
//     {
//       this.load.dismiss();
//       this.alertCtrl.create({
//         title: "Try again later !",
//         message: error,
//         buttons: ["Ok"]
//       }).present()
//     })
//   }
//
//   scanBarcode()
//   {
//     this.barcodeScanner.scan()
//         .then((barcodeData) =>
//         {
//           console.log("barcodeData");
//           console.log(barcodeData);
//
//           this.load.present();
//
//           this.editProvider.billBarcode(barcodeData , 11)
//               .subscribe(()=>
//               {
//                 this.load.dismiss();
//
//                 this.toast.create({
//                   message: "Barcode sent !",
//                   duration : 2000,
//                   position : "top"
//                 }).present()
//               });
//
//         }, (err) =>
//         {
//           this.load.dismiss();
//
//           this.alertCtrl.create({
//             title: "Try again later !",
//             message: err,
//             buttons: ["Ok"]
//           }).present()
//         });
//   }
//
//   takePic()
//   {
//     const options: CameraOptions =
//         {
//           quality: 100,
//           destinationType: this.camera.DestinationType.DATA_URL,
//           encodingType: this.camera.EncodingType.JPEG,
//           mediaType: this.camera.MediaType.PICTURE
//         };
//     this.camera.getPicture(options).then((imageData) => {
//
//       this.load.present();
//
//       let base64Image = 'data:image/jpeg;base64,' + imageData;
//       this.modalCtrl.create("cameraModal" , {img : base64Image}).present()
//           .then(()=>
//           {
//             this.load.dismiss();
//           });
//     }, (err) =>
//     {
//       this.alertCtrl.create({
//         title: "Try again later !",
//         message: err,
//         buttons: ["Ok"]
//       }).present()
//     });
//   }
 }
