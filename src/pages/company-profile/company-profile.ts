import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage'
import {StoresProvider} from "../../providers/stores/stores";


@IonicPage({
  name : "company-profile"
})
@Component({
  selector: 'page-company-profile',
  templateUrl: 'company-profile.html',
})
export class CompanyProfilePage
{
  defaultTab : string = 'info';
  
  storeId : number = null;

  // Info tab variables
  storeInfo : any = null;
  imgsUrl = "http://80.241.213.162:5050/Images/Stores/";

  // Offers tab variables
  favoriteIcon: boolean = true;
  noMoreHidden: boolean = true;
  offers : Array<any> = null;
  pageSize : number = 3;
  pageCounter : number = 2;
  offerImgUrl : string = 'http://80.241.213.162:5050/Images/Offers/';

  //Bills tab variables
  loginNumber : any = null;
  storeBills : Array<any> = null;


  constructor(public navCtrl: NavController, public navParams: NavParams , private storage : Storage , private storeService : StoresProvider ) {
  }

  ionViewDidEnter()
  {
    this.storage.get("username")
        .then((res)=> {
            this.loginNumber = res;
        });

    this.storeId =  this.navParams.get("info");
    if (this.storeId !==null)
    {
      this.getStoreInfo(this.storeId);
      this.getOffersByStore(this.storeId , 1);
    }

    if (this.loginNumber !== null && this.storeId !== null)
    {
      this.getStoreBills(this.loginNumber , this.storeId);
    }
  }

  // Info tab functions
  getStoreInfo(id)
  {
    this.storeService.getStoresInfo(id)
        .subscribe((res)=>
        {
          this.storeInfo = res;
        },(err)=>
        {
          console.log(err);
        })
  }

  // Offers tab functions
  getOffersByStore(storeId , pageCounter) {

    this.storeService.getOffersByStore(storeId, pageCounter , this.pageSize)
        .subscribe((res) => {

          if (res.length !== 0)
          {
            console.log(res);
            this.offers = res;
            this.noMoreHidden = true;
          }
          else {
            this.offers = null;
            this.noMoreHidden = false;
          }
        }, (err) => {
          console.log(err);
        })
  }

  doInfinite(infinite)
  {
    this.storeService.getOffersByStore(this.storeId, this.pageCounter , this.pageSize)
        .subscribe((res)=>
        {
          if (res.length !== 0)
          {
            res.forEach((item)=>
            {
              this.offers.push(item);
            });
            this.pageCounter++;
          }
          else
          {
            this.noMore();
          }
        } , (err)=>
        {
          console.log(err)
        } , ()=>
        {
          this.noMoreHidden = true;
          infinite.complete();
        });
  }
  noMore()
  {
    this.noMoreHidden = false;
  }

  //Bills tab functions

  getStoreBills(loginName ,storeId )
  {
    this.storeService.getBillsByStore(loginName ,storeId )
        .subscribe((res)=>
        {
          this.storeBills = res;

        },(err)=>{
          console.log(err)
        })
  }
}
