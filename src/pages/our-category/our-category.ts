import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {StoresProvider} from "../../providers/stores/stores";


@IonicPage({
  name : "our-category"
})

@Component({
  selector: 'page-our-category',
  templateUrl: 'our-category.html',
})
export class OurCategoryPage {

  cats : Array<any> = [];
   imgsUrl = "http://80.241.213.162:5050/Images/Category/";

  constructor(public navCtrl: NavController, public navParams: NavParams , private service : StoresProvider) {
  }

  ionViewDidLoad()
  {
    this.getCats()
  }

  getCats()
  {
     this.service.getCats()
         .subscribe((res)=>
         {
           this.cats = res;
         },(err)=>
         {
           console.log(err)
         })
  }

  selectCat(id : number , title : string)
  {
      if (id == 1) {
        this.navCtrl.push("bank-branches" , {catId : id});
      } else if (id == 2) {
        this.navCtrl.push("medical-categories" , {catId : id});
      } else {
        this.navCtrl.push("single-category" , {catId : id , title : title});
      }
  }
  goToMedical() {
    this.navCtrl.push("medical-categories");
  }
}
