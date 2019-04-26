import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {StoresProvider} from "../../providers/stores/stores";


@IonicPage({
  name : "single-category"
})
@Component({
  selector: 'page-single-category',
  templateUrl: 'single-category.html',
})
export class SingleCategoryPage {

  catId : number;
  title : string;
  stores : Array<any> = [];
  imgsUrl = "http://80.241.213.162:5050/Images/Stores/";

  constructor(public navCtrl: NavController, public navParams: NavParams , private storeService : StoresProvider) {
  }

  ionViewDidLoad()
  {
    this.catId = this.navParams.get("catId");
    this.title = this.navParams.get("title");

    console.log(this.catId);

    if (this.catId !== null)
    {
      this.getStores(this.catId);
    }
  }

  getStores(id)
  {
    this.storeService.getStoresByCat(id)
        .subscribe((res)=>
        {
          console.log(res);
           this.stores = res;
        },(err)=>
        {
          console.log(err);
        })
  }

  viewStore(info)
  {
    this.navCtrl.push("company-profile" , {info : info})
  }
}
