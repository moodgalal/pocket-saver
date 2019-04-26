import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController} from 'ionic-angular';
import {EditBillProvider} from "../../providers/edit-bill/edit-bill";

@IonicPage({
  name : "cameraModal"
})
@Component({
  selector: 'page-camera-modal',
  templateUrl: 'camera-modal.html',
})
export class CameraModalPage {

  image = "";
   id : any;
   loading;
    disableButtons : boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl : ViewController,
              private editProvider : EditBillProvider,
              private toast : ToastController,
              private loader : LoadingController
  ) {
  }

  ionViewDidLoad()
  {
    this.image = this.navParams.get("img");
    this.id =  this.navParams.get("id");

     this.loading = this.loader.create({
      content : "Please wait...",
      enableBackdropDismiss : true
    });
  }

  dismiss()
  {
    this.viewCtrl.dismiss()
        .then(()=>
        {
            this.loading.dismiss();
        });
  }

  save()
  {
    try
    {
        this.disableButtons = true;

      this.loading.present();
       if (this.image !== null && this.id !== null)
       {
           console.log("trx id");
         console.log(this.id);

           let model =
               {
                  Code : this.image
               };
         this.editProvider.billImage(model, this.id)
             .subscribe(()=>
             {
               this.loading.dismiss();

               this.toast.create({
                 message: "Image Uploaded !",
                 duration : 3000,
                 position : "top"
               }).present();

                 this.viewCtrl.dismiss();

             } , (err)=>
             {
               console.log(err);
               this.loading.dismiss();

               this.toast.create({
                 message: "Try again later !",
                   duration : 2000,
                   position : "top"
               }).present().then(()=>{
                   this.disableButtons = false;
               });
             })
       }
    }
    catch (e)
    {
      this.loading.dismiss();

      this.toast.create({
        message: "something went wrong !",
        duration : 2000,
        position : "top"
      }).present().then(()=>{
          this.disableButtons = false;
      });

      console.log(e);
    }
  }
}
