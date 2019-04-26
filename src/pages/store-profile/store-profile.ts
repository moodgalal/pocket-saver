import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage({
  name : "store-profile"
})

@Component({
  selector: 'page-store-profile',
  templateUrl: 'store-profile.html',
})
export class StoreProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoreProfilePage');
  }

}
