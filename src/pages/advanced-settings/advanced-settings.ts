import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController} from 'ionic-angular';
import {EditBillProvider} from "../../providers/edit-bill/edit-bill";


@IonicPage({
  name : "advanced-settings"
})
@Component({
  selector: 'page-advanced-settings',
  templateUrl: 'advanced-settings.html',
})
export class AdvancedSettingsPage {

    basicInfo : any;
   // advancedInfo : any;
    comments : string = "";
  storeTypeId : number = null;
  storeNameId : number;
    storeTypeName : string = " ";
  storeName : string = " ";
    showAddStoreFlag = false;
    showCurrencyFlag = true;

  addedStoreName : string = null;
  addedStoreAddress : string = null;

  currencyCode : string = "";
    decimalDigit : any;
    isMultiply : boolean;
    rate : any = null;

  storeTypes : Array<any> = [];
  storeNames : Array<any> = [];
  currency : Array<any> = [];
  loading;

  disableButtons : boolean = false;
  options : any =
      {
         title : "Select an option"
      };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl : AlertController,
              private editProvider : EditBillProvider,
              private toast : ToastController,
              private loader : LoadingController
              
  ) {
  }

  ionViewWillLoad()
  {
      this.loading = this.loader.create({
          content : "Please wait...",
          enableBackdropDismiss : true
      });

      this.basicInfo = this.navParams.get("info");

      console.log("info in  advanced");
      console.log(this.basicInfo);

    if(this.basicInfo)
    {
            this.currencyCode = this.basicInfo.currencyCode;
            console.log("currency code in  advanced");
            console.log(this.currencyCode);

            this.storeTypeId = this.basicInfo.storeCatTypeID;
            this.storeName =  this.basicInfo.storeName;
            this.storeNameId = this.basicInfo.storeID;
            this.isMultiply = this.basicInfo.isMultiply;
            this.rate = this.basicInfo.exchangeRate;
             this.comments = this.basicInfo.trxComments
    }
      this.getStoreTypes();
    this.getStoreNames();
      this.getCurrency();

  }

  addStore()
  {
      this.disableButtons = true;
      this.loading.present();
    let model =
        {
          StoreCatTypeID : this.storeTypeId,
          StoreName   : this.addedStoreName,
          StoreLocation : this.addedStoreAddress,
          StoreKey  : "KEY"
        };

        this.editProvider.addStore(model)
            .subscribe((res)=>
            {
                this.loading.dismiss();

              console.log("added store info");    // I need here thee added store id
              console.log(res);
              this.toast.create({
                message: "New Store Added !",
                duration : 2000,
                position : "top"
              }).present();

                this.showAddStoreFlag = false;
                this.addedStoreName = "";
                this.addedStoreAddress = "";
                this.storeName = this.addedStoreName;
                this.disableButtons = false;
              this.getStoreNames();
            } , (err)=>
            {
                // this.loading.dismiss();

                this.alertCtrl.create({
                    title : "Server error",
                    message: "Try again later please !",
                    buttons : ["Ok"]
                }).present();
                console.log(err);
            })
  }

  showAddStore()
  {
     if (this.storeTypeId === null)
     {
       this.alertCtrl.create({
         title : "Warning !",
         message : "Please select a store type first !",
         buttons : ["Ok"]
       }).present();
         this.showAddStoreFlag = false;
     }
     else
     {
       this.showAddStoreFlag = !this.showAddStoreFlag;
     }
  }

  getStoreTypes()
  {
    try
    {
      this.editProvider.getStoreTypes()
          .subscribe((res)=>
          {
            console.log("stores types");
            console.log(res);

            this.storeTypes = res;
              for(let i=0; i<this.storeTypes.length; i++)
              {
                  if (this.storeTypeId == this.storeTypes[i].storeCatTypeID)
                  {
                      this.storeTypeName = this.storeTypes[i].storeCatTypeName;
                      break;
                  }
              }
          })
    }
    catch (e)
    {
      console.log(e)
    }
  }

  getStoreNames()
  {
    if (this.storeTypeId !== null)
    {
        try
        {
            if (this.storeTypeId !== null)
            {
                this.editProvider.getStoreNames(this.storeTypeId)
                    .subscribe((res)=>
                    {
                        console.log("stores names");
                        console.log(res);

                        this.storeNames = res;

                    })
            }

        }
        catch (e)
        {
            console.log(e)
        }
    }
  }

    setCurrency()
    {
        this.showCurrencyFlag = this.currencyCode === this.basicInfo.currencyCode;
    }

  getCurrency()
  {
    try
    {
        this.editProvider.getCurrencies()
            .subscribe((res)=>
            {
                console.log("currency");
                console.log(res);

                this.currency = res;
            })
    }
    catch (e)
    {
        console.log(e)
    }
  }

    updateAdvanced()
    {
        this.disableButtons = true;

       if ( this.currencyCode !== this.basicInfo.currencyCode && this.rate === null)
       {
           this.alertCtrl.create({
               title : "Warning !",
               message : "Please set the the currency rate first !",
               buttons : ["Ok"]
           }).present();

           this.disableButtons = false;
       }
       else
       {
           this.loading.present();

           for(let i=0; i<this.currency.length; i++)
           {
               if(this.currencyCode == this.currency[i].currencyCode)
               {
                   this.decimalDigit = this.currency[i].decimalDigit;
                   break;
               }
           }

           for(let i=0; i<this.storeNames.length; i++)
           {
               if(this.storeNameId == this.storeNames[i].storeID)
               {
                   this.storeName = this.storeNames[i].storeName;
                   break;
               }
           }

           let model =
               {
                   TrxID: this.basicInfo.trxID,
                   DecimalDigit: this.decimalDigit,
                   ExchangeRate: this.rate,
                   IsMultiply: this.isMultiply,
                   CurrencyCode: this.currencyCode,
                   TrxComments: this.comments,
                   StoreCatTypeID : this.storeTypeId,
                   StoreName : this.storeName,
                   StoreLocation : this.basicInfo.storeLocation,
                   StoreID : this.storeNameId,
                   SubCategoryID : this.basicInfo.subCategoryID,
                   CategoryID :  this.basicInfo.categoryID
               };
           console.log("updated model");
           console.log(model);
           try
           {
               this.editProvider.editAdvanced(model)
                   .subscribe(()=>
                   {
                       this.loading.dismiss();

                       console.log("updated model after success");
                       console.log(model);

                       this.toast.create({
                           message: "Bill Updated !",
                           duration : 3000,
                           position : "top"
                       }).present();
                        this.disableButtons = false;
                       this.navCtrl.popToRoot();
                   } , (err)=>
                   {
                       this.loading.dismiss();

                       this.alertCtrl.create({
                           title : "Server error",
                           message: "Try again later please !",
                           buttons : ["Ok"]
                       }).present();

                       this.disableButtons = false;
                       console.log(err);
                   });
           }
           catch (e)
           {
               this.loading.dismiss();

               this.alertCtrl.create({
                   title : "Server error",
                   message: "Try again later please !",
                   buttons : ["Ok"]
               }).present();

               this.disableButtons = false;
               console.log(e);
           }
       }
    }

}